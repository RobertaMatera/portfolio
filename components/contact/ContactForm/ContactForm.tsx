"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

import { sendContactMessage, type ContactState } from "@/lib/contact/actions";
import {
  contactFields,
  contactRules,
  readContactValues,
  TRAP_FIELD,
  validateContact,
  validateField,
  type ContactErrors,
  type ContactField,
  type ContactFieldError,
} from "@/lib/contact/validation";

export interface ContactFormCopy {
  formLabel: string;
  labels: Record<ContactField, string>;
  submit: string;
  sending: string;
  trap: string;
  success: string;
  invalid: string;
  /** Includes a link to Roberta's email address. */
  error: ReactNode;
  /** Error text per field and error type, already translated. */
  errors: Record<ContactField, Record<ContactFieldError, string>>;
}

interface ContactFormProps {
  locale: string;
  copy: ContactFormCopy;
}

const initialState: ContactState = { status: "idle" };

/** How long the success message stays before fading out. */
const SUCCESS_VISIBLE_MS = 5000;
/** Length of the fade-out, matching .contact-form__status in the stylesheet. */
const FADE_MS = 400;

/**
 * Contact form posting to a server action. Fields are checked when you leave
 * them and again before sending, with the same rules the server applies; it
 * still works without JavaScript, with the server's messages instead.
 */
export default function ContactForm({ locale, copy }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  // Errors found in the browser. `null` means "checked and fine", which hides
  // an older server error for that field once it has been corrected.
  const [clientErrors, setClientErrors] = useState<Partial<Record<ContactField, ContactFieldError | null>>>({});
  const [messageLength, setMessageLength] = useState(0);
  // The success message fades out, then hides; both are tracked per result.
  const [fading, setFading] = useState<ContactState | null>(null);
  const [dismissed, setDismissed] = useState<ContactState | null>(null);
  const [hovered, setHovered] = useState(false);

  const errors: ContactErrors = { ...state.errors };
  for (const field of contactFields) {
    const clientError = clientErrors[field];
    if (clientError === null) delete errors[field];
    else if (clientError) errors[field] = clientError;
  }

  // Move focus to whatever needs attention after the server answers.
  useEffect(() => {
    if (state.status === "invalid") {
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
    } else if (state.status === "error") {
      statusRef.current?.focus();
    }
  }, [state]);

  // Success fades out after a while, but waits while the pointer rests on it.
  useEffect(() => {
    if (state.status !== "success" || dismissed === state || hovered) return;
    const fade = window.setTimeout(() => setFading(state), SUCCESS_VISIBLE_MS);
    const hide = window.setTimeout(() => setDismissed(state), SUCCESS_VISIBLE_MS + FADE_MS);
    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(hide);
    };
  }, [state, dismissed, hovered]);

  const checkField = (field: ContactField, value: string) =>
    setClientErrors((previous) => ({ ...previous, [field]: validateField(field, value) ?? null }));

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (pending) {
      event.preventDefault();
      return;
    }
    // Same rules as the server: stop here and point at the first problem.
    const found = validateContact(readContactValues(new FormData(event.currentTarget)));
    const next = Object.fromEntries(contactFields.map((field) => [field, found[field] ?? null]));
    setClientErrors(next);
    const firstInvalid = contactFields.find((field) => found[field]);
    if (firstInvalid) {
      event.preventDefault();
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    // Valid: let the server's answer decide what is shown next.
    setClientErrors({});
    setMessageLength(0);
  };

  const showStatus = state.status !== "idle" && dismissed !== state;
  const statusText = { idle: "", invalid: copy.invalid, success: copy.success, error: copy.error }[state.status];

  return (
    <form
      ref={formRef}
      className="contact-form"
      action={formAction}
      aria-label={copy.formLabel}
      // Messages are shown in the page's language; the browser's built-in
      // ones would follow the browser's language instead.
      noValidate
      onSubmit={onSubmit}
    >
      <input type="hidden" name="locale" value={locale} />

      {/* Spam trap: hidden from people and assistive tech, ignored by password
          managers, tempting to bots. */}
      <div className="contact-form__trap" aria-hidden="true">
        <label>
          {copy.trap}
          <input
            type="text"
            name={TRAP_FIELD}
            tabIndex={-1}
            autoComplete="off"
            data-1p-ignore=""
            data-lpignore="true"
            data-bwignore=""
            data-form-type="other"
          />
        </label>
      </div>

      {contactFields.map((field) => {
        const id = `contact-${field}`;
        const code = errors[field];
        const error = code ? copy.errors[field][code] : undefined;
        const Control = field === "message" ? "textarea" : "input";
        return (
          <div key={field} className="contact-form__field">
            <label htmlFor={id}>{copy.labels[field]}</label>
            <Control
              id={id}
              name={field}
              // Keeps what was typed when the server sends the form back.
              defaultValue={state.values?.[field]}
              maxLength={contactRules[field].max}
              required
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${id}-error` : undefined}
              onBlur={(event) => {
                // Only judge a field once something has been typed in it, or
                // once it already shows an error. The message waits for
                // "Send", so a half-written one isn't flagged as too short.
                const typed = field !== "message" && event.currentTarget.value.trim();
                if (typed || clientErrors[field] !== undefined || code) {
                  checkField(field, event.currentTarget.value);
                }
              }}
              onChange={(event) => {
                if (field === "message") setMessageLength(event.currentTarget.value.trim().length);
                // Clear an error as soon as the text is fixed.
                if (code) checkField(field, event.currentTarget.value);
              }}
              {...(field === "message"
                ? { rows: 5 }
                : {
                    type: field === "email" ? "email" : "text",
                    autoComplete: { name: "name", email: "email", subject: "off" }[field],
                  })}
            />
            {field === "message" && (
              <p className={code ? "contact-form__counter is-invalid" : "contact-form__counter"} aria-hidden="true">
                {messageLength} / {contactRules.message.max}
              </p>
            )}
            {error && (
              <p id={`${id}-error`} className="contact-form__error">
                {error}
              </p>
            )}
          </div>
        );
      })}

      <button type="submit" className="contact-form__submit" aria-disabled={pending || undefined}>
        {pending ? copy.sending : copy.submit}
        {!pending && <span aria-hidden="true">↗</span>}
      </button>

      {/* Always in the page so screen readers announce changes to it. */}
      <div role={state.status === "error" || state.status === "invalid" ? "alert" : "status"}>
        {showStatus && (
          <p
            ref={statusRef}
            className={[
              "contact-form__status",
              `contact-form__status--${state.status}`,
              fading === state && "is-fading",
            ]
              .filter(Boolean)
              .join(" ")}
            tabIndex={-1}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
          >
            {statusText}
          </p>
        )}
      </div>
    </form>
  );
}
