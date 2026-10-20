// Contact form rules, shared by the server action and the form's input limits.

export const contactLimits = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
} as const;

export type ContactField = keyof typeof contactLimits;
export type ContactFieldError = "required" | "invalid" | "tooLong";

export interface ContactValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactErrors = Partial<Record<ContactField, ContactFieldError>>;

const required: readonly ContactField[] = ["name", "email", "message"];

// Deliberately loose: one "@", something on each side, a dot in the domain.
// The real check is whether the reply arrives.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function readContactValues(formData: FormData): ContactValues {
  const text = (key: ContactField) => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  return { name: text("name"), email: text("email"), subject: text("subject"), message: text("message") };
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of Object.keys(contactLimits) as ContactField[]) {
    const value = values[field];
    if (!value) {
      if (required.includes(field)) errors[field] = "required";
    } else if (value.length > contactLimits[field]) {
      errors[field] = "tooLong";
    }
  }
  if (!errors.email && values.email && !EMAIL_PATTERN.test(values.email)) errors.email = "invalid";
  return errors;
}
