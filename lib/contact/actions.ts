"use server";

import { profile } from "@/content/profile";
import { routing } from "@/i18n/routing";

import { readContactValues, validateContact, type ContactErrors, type ContactValues } from "./validation";

export interface ContactState {
  status: "idle" | "invalid" | "success" | "error";
  errors?: ContactErrors;
  /** Echoed back after a failed attempt so the form keeps what was typed. */
  values?: ContactValues;
}

// A person needs a few seconds to fill in a valid message; bots post at once.
const MIN_FILL_MS = 2000;

/**
 * Validates the contact form and emails it to Roberta through Resend's API.
 * The API key stays on the server (RESEND_API_KEY, no NEXT_PUBLIC_ prefix).
 */
export async function sendContactMessage(_previous: ContactState, formData: FormData): Promise<ContactState> {
  // Spam traps get a normal success so bots have nothing to adapt to.
  // 1. A hidden field people never see.
  const trap = formData.get("website");
  if (typeof trap === "string" && trap !== "") return { status: "success" };

  // Validation comes before the timer, so a person who submits an empty form
  // quickly sees their errors rather than a false success.
  const values = readContactValues(formData);
  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors, values };

  // 2. A complete message sent faster than anyone could type it.
  const startedAt = Number(formData.get("startedAt"));
  if (startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS) return { status: "success" };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set.");
    return { status: "error", values };
  }

  const locale = formData.get("locale");
  const language = typeof locale === "string" && routing.locales.some((code) => code === locale) ? locale : "unknown";
  // Line breaks in a header would let a sender add headers of their own.
  const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO ?? profile.email],
        reply_to: values.email,
        subject: oneLine(`Portfolio · ${values.subject || `Message from ${values.name}`}`),
        // Plain text only, so nothing the sender types can be rendered as HTML.
        text: [
          `Name: ${values.name}`,
          `Email: ${values.email}`,
          `Subject: ${values.subject || "-"}`,
          `Page language: ${language}`,
          "",
          values.message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(`Contact form: Resend answered ${response.status}.`, await response.text());
      return { status: "error", values };
    }
  } catch (error) {
    console.error("Contact form: could not reach Resend.", error);
    return { status: "error", values };
  }

  return { status: "success" };
}
