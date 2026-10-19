import { profile, socialLinks } from "@/content/profile";
import { technologies } from "@/content/technologies";
import type { Locale } from "@/i18n/routing";

import { localeUrl, siteUrl } from "./site";

// Minimal schema.org shapes for what the site publishes. Typed by hand to
// avoid a dependency for a handful of objects.
type JsonLdValue = string | number | boolean | JsonLdNode | JsonLdValue[];

export interface JsonLdNode {
  "@type": string;
  "@id"?: string;
  [property: string]: JsonLdValue | undefined;
}

export interface JsonLdDocument {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
}

export const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

interface PersonCopy {
  jobTitle: string;
  description: string;
  /** Translated subject areas, merged with the technology names. */
  topics: string[];
}

export function buildSiteGraph(locale: Locale, copy: PersonCopy): JsonLdDocument {
  const url = localeUrl(locale);

  const person: JsonLdNode = {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    givenName: profile.givenName,
    familyName: profile.familyName,
    jobTitle: copy.jobTitle,
    description: copy.description,
    url,
    image: `${siteUrl}${profile.portrait.src}`,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location.city,
      addressCountry: profile.location.countryCode,
    },
    knowsLanguage: [...profile.languages],
    knowsAbout: [...copy.topics, ...technologies.map((tech) => tech.name)],
    alumniOf: profile.alumniOf.map((school) => ({
      "@type": "CollegeOrUniversity",
      name: school.name,
      url: school.url,
    })),
    sameAs: socialLinks
      .filter((link) => link.network === "github" || link.network === "linkedin")
      .map((link) => link.href),
  };

  const website: JsonLdNode = {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: profile.name,
    inLanguage: locale,
    author: { "@type": "Person", "@id": personId },
  };

  return { "@context": "https://schema.org", "@graph": [person, website] };
}
