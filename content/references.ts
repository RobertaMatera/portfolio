// People who wrote references, in display order. Quotes and roles live in
// messages/*.json under "References.items.<id>".
import type { Locale } from "@/i18n/routing";

export type ReferenceAccent = "lime" | "coral" | "sun" | "green";

export interface Reference {
  id: string;
  /** Person or company name, shown as written in every language. */
  name: string;
  /** Profile of the person or company. */
  url: string;
  accent: ReferenceAccent;
  /** Language the reference was written in. */
  originalLanguage: Locale;
  /**
   * The site quotes the author's own words in `originalLanguage`, and the
   * other languages translate that. Without it, only an English version of
   * the reference exists, and the other languages translate the English.
   */
  verbatim?: true;
  /** Public recommendation, when there is one; otherwise a signed letter. */
  linkedInRecommendation?: string;
}

/**
 * Which language a quote shown in `locale` was translated from, or null when
 * the page shows the author's own words.
 */
export function translatedFrom(reference: Reference, locale: Locale): Locale | null {
  if (reference.verbatim) return locale === reference.originalLanguage ? null : reference.originalLanguage;
  // Only an English version exists: English is shown as is (noting the
  // original language), every other language is translated from it.
  if (locale !== "en") return "en";
  return reference.originalLanguage === "en" ? null : reference.originalLanguage;
}

export const references = [
  {
    id: "solotti",
    name: "Alice Solotti",
    url: "https://www.linkedin.com/in/alice-solotti-4480a6a9/",
    accent: "lime",
    originalLanguage: "en",
    verbatim: true,
  },
  {
    id: "f1",
    name: "F1 Consulting & Services",
    url: "https://www.linkedin.com/company/f1-consulting-services/",
    accent: "coral",
    originalLanguage: "en",
    verbatim: true,
  },
  {
    id: "casasola",
    name: "Stefano Casasola",
    url: "https://www.linkedin.com/in/stefanocasasola/",
    accent: "sun",
    originalLanguage: "it",
    verbatim: true,
    linkedInRecommendation: "https://www.linkedin.com/in/roberta-matera/details/recommendations/",
  },
  {
    id: "perfido",
    name: "Prof. Arch. Paolo Perfido",
    url: "https://www.linkedin.com/in/paolo-perfido-b3247036/",
    accent: "green",
    originalLanguage: "it",
  },
] as const satisfies readonly Reference[];
