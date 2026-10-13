import type { MetadataRoute } from "next";

import { LOCALES } from "@/shared/i18n/config";
import { LOCALIZED_SLUGS, RouteKey } from "@/shared/i18n/routing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: RouteKey[] = ["home", "projects", "techStack", "resume"];
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of LOCALES) {
      const slug = LOCALIZED_SLUGS[route][locale];
      const path = slug ? `/${locale}/${slug}` : `/${locale}`;
      entries.push({
        url: `${siteUrl}${path}`,
        lastModified: now,
        changeFrequency: route === "home" ? "monthly" : "yearly",
        priority: route === "home" ? 1 : 0.7,
        alternates: {
          languages: {
            it: `${siteUrl}/${LOCALIZED_SLUGS[route].it ? `it/${LOCALIZED_SLUGS[route].it}` : "it"}`,
            en: `${siteUrl}/${LOCALIZED_SLUGS[route].en ? `en/${LOCALIZED_SLUGS[route].en}` : "en"}`,
            de: `${siteUrl}/${LOCALIZED_SLUGS[route].de ? `de/${LOCALIZED_SLUGS[route].de}` : "de"}`,
            "x-default": `${siteUrl}/it`,
          },
        },
      });
    }
  }

  return entries;
}
