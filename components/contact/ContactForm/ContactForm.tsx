"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";

import { sendContactMessage, type ContactState } from "@/lib/contact/actions";
import { contactLimits, type ContactField, type ContactFieldError } from "@/lib/contact/validation";

export interface ContactFormCopy {
  formLabel: string;
  labels: Record<ContactField, string>;
  optional: string;
  submit: string;
  sending: string;
  trap: string;
  success: string;
  invalid: string;
  /** Includes a link to Roberta's email address. */
  error: ReactNode;
  /** Error text per field and error type, already translated. */
  errors: Record<ContactField, Partial<Record<ContactFieldError, string>>>;
}

interface ContactFormProps {
  locale: string;
  copy: ContactFormCopy;
}

const initialState: ContactState = { status: "idle" };
const fields: readonly ContactField[] = ["name", "email", "subject", "message"];

/**
 * Contact form posting to a server action. It works without JavaScript; with
 * it, errors appear inline, focus moves to the first problem, and the result
 * is announced to screen readers.
 */
export default function ContactForm({ locale, copy }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.status === "invalid") {
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
    } else if (state.status === "success" || state.status === "error") {
      statusRef.current?.focus();
    }
  }, [state]);

  const errorFor = (field: ContactField) => {
    const code = state.errors?.[field];
    return code ? copy.errors[field][code] : undefined;
  };

  const statusText = { idle: "", invalid: copy.invalid, success: copy.success, error: copy.error }[state.status];

  return (
    <form
      ref={formRef}
      className="contact-form"
      action={formAction}
      aria-label={copy.formLabel}
      // Server-side messages are translated; the browser's built-in ones are not.
      noValidate
      onSubmit={(event) => {
        if (pending) event.preventDefault();
      }}
      // Starts the clock for the too-fast spam check when someone begins typing.
      onFocus={() => {
        const input = startedAtRef.current;
        if (input && !input.value) input.value = String(Date.now());
      }}
    >
      <input type="hidden" name="locale" value={locale} />
      <input ref={startedAtRef} type="hidden" name="startedAt" />

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div className="contact-form__trap" aria-hidden="true">
        <label>
          {copy.trap}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {fields.map((field) => {
        const id = `contact-${field}`;
        const error = errorFor(field);
        const Control = field === "message" ? "textarea" : "input";
        return (
          <div key={field} className="contact-form__field">
            <label htmlFor={id}>
              {copy.labels[field]}
              {field === "subject" && <span className="contact-form__optional"> ({copy.optional})</span>}
            </label>
            <Control
              id={id}
              name={field}
              // Keeps what was typed when the server sends the form back.
              defaultValue={state.values?.[field]}
              maxLength={contactLimits[field]}
              required={field !== "subject"}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${id}-error` : undefined}
              {...(field === "message"
                ? { rows: 4 }
                : {
                    type: field === "email" ? "email" : "text",
                    autoComplete: { name: "name", email: "email", subject: "off" }[field],
                  })}
            />
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

      <p
        ref={statusRef}
        className={`contact-form__status contact-form__status--${state.status}`}
        role={state.status === "error" || state.status === "invalid" ? "alert" : "status"}
        tabIndex={-1}
        hidden={state.status === "idle"}
      >
        {statusText}
      </p>
    </form>
  );
}
