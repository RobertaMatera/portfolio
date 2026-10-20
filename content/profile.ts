// Facts about Roberta that do not change between languages.
// Translated wording (job title, topics, …) lives in messages/*.json.

import type { Locale } from "@/i18n/routing";

export type SocialNetwork = "github" | "linkedin" | "whatsapp" | "email";

export interface SocialLink {
  network: SocialNetwork;
  /** Brand or channel name shown as link text; not translated. */
  label: string;
  href: string;
  external: boolean;
}

export interface CvFile {
  href: string;
  /** Name the browser saves the file as. */
  fileName: string;
  /** ISO 639-1 code of the language the CV is written in. */
  language: string;
  sizeKb: number;
}

export interface School {
  name: string;
  url: string;
}

export const profile = {
  name: "Roberta Matera",
  givenName: "Roberta",
  familyName: "Matera",
  email: "materaroberta.ch@gmail.com",
  phone: "+41 77 477 39 24",
  location: { city: "Bern", countryCode: "CH" },
  /** ISO 639-1 codes of the languages Roberta speaks. */
  languages: ["it", "en", "de"],
  portrait: { src: "/images/hero/portrait.webp", width: 560, height: 693 },
  logo: { src: "/images/brand/logo.webp", width: 220, height: 216 },
  /** CVs in English and German. Italian visitors get the English one. */
  cv: {
    en: {
      href: "/files/roberta-matera-cv-en.pdf",
      fileName: "Roberta_Matera_CV_EN.pdf",
      language: "en",
      sizeKb: 355,
    },
    de: {
      href: "/files/roberta-matera-cv-de.pdf",
      fileName: "Roberta_Matera_CV_DE.pdf",
      language: "de",
      sizeKb: 373,
    },
  } satisfies Record<string, CvFile>,
  alumniOf: [
    { name: "Politecnico di Bari", url: "https://www.poliba.it/en/" },
    { name: "Università Telematica Pegaso", url: "https://www.unipegaso.it/" },
  ] satisfies School[],
} as const;

/** The CV offered on each language's pages. */
export const cvForLocale = {
  en: profile.cv.en,
  it: profile.cv.en,
  de: profile.cv.de,
} satisfies Record<Locale, CvFile>;

export const socialLinks: SocialLink[] = [
  { network: "github", label: "GitHub", href: "https://github.com/RobertaMatera", external: true },
  { network: "email", label: "Email", href: `mailto:${profile.email}`, external: false },
  { network: "whatsapp", label: "WhatsApp", href: "https://wa.me/41774773924", external: true },
  {
    network: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/roberta-matera/",
    external: true,
  },
];
