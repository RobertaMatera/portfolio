import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Order matters: it drives the language menu and hreflang output.
  locales: ["en", "it", "de"],
  // English reaches the widest audience of recruiters in Switzerland and abroad.
  defaultLocale: "en",
  // Every page lives under /en, /it or /de, so each language has its own
  // crawlable URL instead of swapping text on the client like the mockup does.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
