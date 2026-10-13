import { DEFAULT_LOCALE, Locale } from "./config";

export const LOCALIZED_SLUGS = {
  home: {
    it: "",
    en: "",
    de: "",
  },
  projects: {
    it: "progetti",
    en: "projects",
    de: "projekte",
  },
  techStack: {
    it: "stack-tecnologico",
    en: "tech-stack",
    de: "technologie-stack",
  },
  resume: {
    it: "curriculum",
    en: "resume",
    de: "lebenslauf",
  },
} as const;

export type RouteKey = keyof typeof LOCALIZED_SLUGS;

export const SECTION_IDS = ["about", "skills", "experience", "projects", "education", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export function localizedPath(locale: Locale, route: RouteKey): string {
  const slug = LOCALIZED_SLUGS[route][locale];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

export function localizedSectionPath(locale: Locale, section: SectionId): string {
  return `${localizedPath(locale, "home")}#${section}`;
}

export function routeKeyFromSlug(locale: Locale, slug: string): RouteKey | null {
  const entries = Object.entries(LOCALIZED_SLUGS) as [RouteKey, Record<Locale, string>][];
  const hit = entries.find(([, mapping]) => mapping[locale] === slug);
  return hit?.[0] ?? null;
}

export function toDefaultLocalePath(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `/${DEFAULT_LOCALE}${normalized === "/" ? "" : normalized}`;
}
