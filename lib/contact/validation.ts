// Contact form rules, shared by the server action and the form, so visitors
// see the same errors before sending that the server would return.

export const contactRules = {
  name: { min: 2, max: 100 },
  email: { min: 6, max: 254 },
  subject: { min: 3, max: 150 },
  message: { min: 20, max: 5000 },
} as const;

export type ContactField = keyof typeof contactRules;
export type ContactFieldError = "required" | "invalid" | "tooShort" | "tooLong";

/**
 * Hidden spam-trap field. The name is deliberately meaningless: browsers and
 * password managers autofill fields called "website", "url" or "company",
 * which made real messages look like spam.
 */
export const TRAP_FIELD = "contact_reference_code";

export const contactFields = Object.keys(contactRules) as ContactField[];

export interface ContactValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactErrors = Partial<Record<ContactField, ContactFieldError>>;

// One "@", no spaces, a dot in the domain and a top-level domain of at least
// two letters. Strict enough to catch typos; the real check is the reply.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[a-z]{2,}$/i;

export function readContactValues(formData: FormData): ContactValues {
  const text = (key: ContactField) => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  return { name: text("name"), email: text("email"), subject: text("subject"), message: text("message") };
}

/** The first problem with one field, or undefined when it is fine. */
export function validateField(field: ContactField, rawValue: string): ContactFieldError | undefined {
  const value = rawValue.trim();
  const { min, max } = contactRules[field];
  if (!value) return "required";
  if (value.length > max) return "tooLong";
  if (field === "email") return EMAIL_PATTERN.test(value) ? undefined : "invalid";
  if (value.length < min) return "tooShort";
  return undefined;
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of contactFields) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}
