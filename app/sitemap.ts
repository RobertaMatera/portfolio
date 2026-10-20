import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { languageAlternates, localeUrl } from "@/lib/site";

// One entry per locale, each listing all language versions, so search
// engines can pair them even without crawling the hreflang tags.
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = languageAlternates();

  return routing.locales.map((locale) => ({
    url: localeUrl(locale),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
