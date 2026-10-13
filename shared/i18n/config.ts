export const LOCALES = ["it", "en", "de"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "it";

/**
 * German translation register policy.
 * Change this single value to switch tone globally in DE copy.
 */
export const DE_REGISTER: "formal" | "informal" = "formal";

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}
