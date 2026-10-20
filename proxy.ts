import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

import { routing, type Locale } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/** next-intl's default cookie, set once a visitor picks another language. */
const LOCALE_COOKIE = "NEXT_LOCALE";

// First-visit language by country (ISO 3166-1 alpha-2), as reported by the
// host. Everywhere else gets English.
const countryLocales: Record<string, Locale> = {
  IT: "it",
  SM: "it", // San Marino
  VA: "it", // Vatican City
  DE: "de",
  AT: "de",
  LI: "de", // Liechtenstein
};

// Switzerland has several official languages, so there the browser decides
// between Italian and German, defaulting to German (Bern).
const MULTILINGUAL_COUNTRIES = new Set(["CH"]);

function countryOf(request: NextRequest): string | undefined {
  // Set by Vercel (and Cloudflare) at the edge; absent in local development.
  return (request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry") ?? undefined)?.toUpperCase();
}

function browserPrefers(request: NextRequest, candidates: readonly Locale[]): Locale | undefined {
  const accepted = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase());
  return accepted.map((language) => candidates.find((locale) => locale === language)).find(Boolean);
}

function localeForCountry(request: NextRequest, country: string): Locale {
  if (MULTILINGUAL_COUNTRIES.has(country)) return browserPrefers(request, ["de", "it"]) ?? "de";
  return countryLocales[country] ?? routing.defaultLocale;
}

/**
 * Locale routing via next-intl. URLs without a locale ("/") are redirected:
 * 1. to the language the visitor picked before (next-intl's locale cookie);
 * 2. otherwise by country: Italy → it, German-speaking countries → de,
 *    Switzerland → browser language (it/de), anywhere else → en;
 * 3. without a country (e.g. local development), by browser language.
 */
export default function proxy(request: NextRequest) {
  const hasLocalePrefix = routing.locales.some(
    (locale) => request.nextUrl.pathname === `/${locale}` || request.nextUrl.pathname.startsWith(`/${locale}/`),
  );
  const hasChosenLocale = request.cookies.has(LOCALE_COOKIE);
  const country = countryOf(request);

  if (hasLocalePrefix || hasChosenLocale || !country) return intlMiddleware(request);

  // next-intl falls back to the Accept-Language header when there is no
  // cookie, so presenting the country's locale there routes the visitor to it.
  const headers = new Headers(request.headers);
  headers.set("accept-language", localeForCountry(request, country));
  return intlMiddleware(new NextRequest(request, { headers }));
}

export const config = {
  // Skip API routes, Next.js internals, Vercel internals and files with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
