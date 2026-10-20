"use server";

import { profile } from "@/content/profile";
import { routing } from "@/i18n/routing";

import { readContactValues, TRAP_FIELD, validateContact, type ContactErrors, type ContactValues } from "./validation";

export interface ContactState {
  status: "idle" | "invalid" | "success" | "error";
  errors?: ContactErrors;
  /** Echoed back after a failed attempt so the form keeps what was typed. */
  values?: ContactValues;
}

/**
 * Validates the contact form and emails it to Roberta through Resend's API.
 * The API key stays on the server (RESEND_API_KEY, no NEXT_PUBLIC_ prefix).
 * Every outcome other than success is logged, so the reason for a missing
 * email shows up in the server logs (Vercel → Logs).
 */
export async function sendContactMessage(_previous: ContactState, formData: FormData): Promise<ContactState> {
  // A hidden field people never see. Bots that fill it get a normal success
  // so they have nothing to adapt to; the drop is logged, never silent.
  const trap = formData.get(TRAP_FIELD);
  if (typeof trap === "string" && trap !== "") {
    console.warn("Contact form: spam trap field was filled; message dropped.");
    return { status: "success" };
  }

  const values = readContactValues(formData);
  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors, values };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set, so the message was not sent.");
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
        subject: oneLine(`Portfolio · ${values.subject}`),
        // Plain text only, so nothing the sender types can be rendered as HTML.
        text: [
          `Name: ${values.name}`,
          `Email: ${values.email}`,
          `Subject: ${values.subject}`,
          `Page language: ${language}`,
          "",
          values.message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      // Resend explains refusals in the body, e.g. a test sender used with a
      // recipient other than the account owner, or an unverified domain.
      console.error(`Contact form: Resend refused the message (${response.status}).`, await response.text());
      return { status: "error", values };
    }
  } catch (error) {
    console.error("Contact form: could not reach Resend.", error);
    return { status: "error", values };
  }

  return { status: "success" };
}
