import { routing, type Locale } from "@/i18n/routing";

/**
 * Absolute origin used for canonical URLs, hreflang, the sitemap and
 * structured data. Set NEXT_PUBLIC_SITE_URL in production; on Vercel the
 * production domain is picked up automatically as a fallback.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

/** Absolute URL of a locale's home page, e.g. https://example.com/de */
export function localeUrl(locale: Locale): string {
  return `${siteUrl}/${locale}`;
}

/** hreflang map for every locale plus x-default (the default locale). */
export function languageAlternates(): Record<Locale | "x-default", string> {
  const entries = routing.locales.map((locale) => [locale, localeUrl(locale)] as const);
  return {
    ...(Object.fromEntries(entries) as Record<Locale, string>),
    "x-default": localeUrl(routing.defaultLocale),
  };
}

/**
 * Open Graph locales. English copy uses British spelling and the German copy
 * Swiss spelling, so the regions match the content rather than a default.
 */
export const ogLocales: Record<Locale, string> = {
  en: "en_GB",
  it: "it_IT",
  de: "de_CH",
};
