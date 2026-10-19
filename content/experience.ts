import type { Locale } from "@/i18n/routing";

/** A value that is the same in every language, or differs per locale. */
export type Localized<T> = T | Record<Locale, T>;

export function localize<T>(value: Localized<T>, locale: Locale): T {
  return typeof value === "object" && value !== null && locale in value
    ? (value as Record<Locale, T>)[locale]
    : (value as T);
}

export interface Organisation {
  /** Company names are proper nouns; universities have localized names. */
  name: Localized<string>;
  url: Localized<string>;
}

export interface ExperienceEntry {
  /** Key under "Experience.entries" in messages/*.json (title, body, note). */
  id: string;
  kind: "work" | "education";
  start: number;
  end: number;
  /** Degree entries link their title to the programme page. */
  titleUrl?: Localized<string>;
  organisations: readonly Organisation[];
  /** Whether messages include a short note after the organisation names. */
  hasNote?: true;
}

const poliba: Organisation = {
  name: { en: "Polytechnic of Bari", it: "Politecnico di Bari", de: "Polytechnikum Bari" },
  url: { en: "https://www.poliba.it/en/", it: "https://www.poliba.it/", de: "https://www.poliba.it/en/" },
};

/** Most recent first. `as const` keeps ids literal, so message keys are type-checked. */
export const experience = [
  {
    id: "f1",
    kind: "work",
    start: 2025,
    end: 2026,
    organisations: [{ name: "F1 Consulting", url: "https://f1consultingservices.it/" }],
    hasNote: true,
  },
  {
    id: "pegaso",
    kind: "education",
    start: 2024,
    end: 2026,
    titleUrl: "https://www.unipegaso.it/lauree-triennali/informatica-per-le-aziende-digitali",
    organisations: [
      {
        name: { en: "Pegaso Digital University", it: "Università Pegaso", de: "Pegaso Digital University" },
        url: "https://www.unipegaso.it/",
      },
    ],
  },
  {
    id: "almaviva",
    kind: "work",
    start: 2023,
    end: 2025,
    organisations: [
      { name: "Almaviva Digitaltech", url: "https://distrettoinformatica.it/associati/almaviva-digitaltec/" },
    ],
  },
  {
    id: "nexum",
    kind: "work",
    start: 2022,
    end: 2023,
    organisations: [
      { name: "NexumAI", url: "https://nexum-ai.com/en" },
      { name: "Fides", url: "https://www.fidesgroup.com/it" },
    ],
  },
  {
    id: "architecture",
    kind: "education",
    start: 2008,
    end: 2017,
    titleUrl: poliba.url,
    organisations: [poliba],
  },
] as const satisfies readonly ExperienceEntry[];
