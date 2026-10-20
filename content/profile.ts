// Facts about Roberta that do not change between languages.
// Translated wording (job title, topics, …) lives in messages/*.json.

export type SocialNetwork = "github" | "linkedin" | "whatsapp" | "email";

export interface SocialLink {
  network: SocialNetwork;
  /** Brand or channel name shown as link text; not translated. */
  label: string;
  href: string;
  external: boolean;
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
  /** One CV for now, written in Italian; add per-locale files here later. */
  cv: {
    href: "/files/roberta-matera-cv.pdf",
    fileName: "Roberta-Matera-CV.pdf",
    language: "it",
    sizeKb: 105,
  },
  alumniOf: [
    { name: "Politecnico di Bari", url: "https://www.poliba.it/en/" },
    { name: "Università Telematica Pegaso", url: "https://www.unipegaso.it/" },
  ] satisfies School[],
} as const;

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
