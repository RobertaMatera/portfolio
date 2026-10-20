import type { IconName } from "@/components/ui/Icon/Icon";
import type { Locale } from "@/i18n/routing";

// Structure of the About section. Wording lives in messages/*.json under
// "About", keyed by the ids below.

export const aboutTags = [
  { id: "location", icon: "pin" },
  { id: "architecture", icon: "building" },
  { id: "designSystems", icon: "layers" },
  { id: "fullStack", icon: "server" },
  { id: "languages", icon: "globe" },
] as const satisfies readonly { id: string; icon: IconName }[];

export const aboutFacts = ["years", "errors", "languages", "profile"] as const;

export const architecturePrinciples = ["systems", "movement", "constraints", "collaboration"] as const;

/** Links inside the About paragraphs; the university site has an English version. */
export const aboutLinks = {
  poliba: { en: "https://www.poliba.it/en/", it: "https://www.poliba.it/", de: "https://www.poliba.it/en/" },
  pegaso: {
    en: "https://www.unipegaso.it/lauree-triennali/informatica-per-le-aziende-digitali",
    it: "https://www.unipegaso.it/lauree-triennali/informatica-per-le-aziende-digitali",
    de: "https://www.unipegaso.it/lauree-triennali/informatica-per-le-aziende-digitali",
  },
} satisfies Record<string, Record<Locale, string>>;
