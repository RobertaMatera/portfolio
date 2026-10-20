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

/** Politecnico di Bari's page for the architecture degree (Italian only). */
export const POLIBA_ARCHITECTURE_URL =
  "https://orientami.poliba.it/architettura-corso-di-laurea-magistrale-a-ciclo-unico-poliba/";

/** Links inside the About paragraphs, per language. */
export const aboutLinks = {
  poliba: { en: POLIBA_ARCHITECTURE_URL, it: POLIBA_ARCHITECTURE_URL, de: POLIBA_ARCHITECTURE_URL },
  pegaso: {
    en: "https://www.unipegaso.it/lauree-triennali/informatica-per-le-aziende-digitali",
    it: "https://www.unipegaso.it/lauree-triennali/informatica-per-le-aziende-digitali",
    de: "https://www.unipegaso.it/lauree-triennali/informatica-per-le-aziende-digitali",
  },
} satisfies Record<string, Record<Locale, string>>;
