import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export default function robots(): MetadataRoute.Robots {
  const host = siteUrl && siteUrl.startsWith("http") ? siteUrl : undefined;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: host ? `${host}/sitemap.xml` : undefined,
    host,
  };
}
