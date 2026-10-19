import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";

// Placeholder until step 2 adds the shared site URL helper and hreflang alternates.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    changeFrequency: "monthly",
    priority: 1,
  }));
}
