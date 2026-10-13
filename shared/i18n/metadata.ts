import { Metadata } from "next";

import { Locale } from "./config";
import { LOCALIZED_SLUGS, RouteKey } from "./routing";

type BuildLocalizedMetadataOptions = {
  locale: Locale;
  siteUrl: string;
  title: string;
  description: string;
  route: RouteKey;
};

export function buildAlternatesLanguages(siteUrl: string, route: RouteKey) {
  return {
    it: `${siteUrl}/it${LOCALIZED_SLUGS[route].it ? `/${LOCALIZED_SLUGS[route].it}` : ""}`,
    en: `${siteUrl}/en${LOCALIZED_SLUGS[route].en ? `/${LOCALIZED_SLUGS[route].en}` : ""}`,
    de: `${siteUrl}/de${LOCALIZED_SLUGS[route].de ? `/${LOCALIZED_SLUGS[route].de}` : ""}`,
    "x-default": `${siteUrl}/it`,
  };
}

export function buildLocalizedMetadata({
  locale,
  siteUrl,
  title,
  description,
  route,
}: BuildLocalizedMetadataOptions): Metadata {
  const localeTag = locale === "it" ? "it_IT" : locale === "de" ? "de_DE" : "en_US";
  const alternates = buildAlternatesLanguages(siteUrl, route);
  const canonical = alternates[locale];

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: localeTag,
      alternateLocale: ["it_IT", "en_US", "de_DE"].filter((value) => value !== localeTag),
      type: "website",
      images: [{ url: "/images/icons/logoBg.png", width: 512, height: 512, alt: "Roberta Matera logo" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/icons/logoBg.png"],
    },
  };
}
