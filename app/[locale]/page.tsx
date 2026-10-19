import { getTranslations, setRequestLocale } from "next-intl/server";

import JsonLd from "@/components/seo/JsonLd/JsonLd";
import type { Locale } from "@/i18n/routing";
import { buildSiteGraph } from "@/lib/structured-data";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  // The layout has already rejected unknown locales.
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const tMeta = await getTranslations({ locale, namespace: "Metadata" });
  const tPerson = await getTranslations({ locale, namespace: "Person" });

  const siteGraph = buildSiteGraph(locale, {
    jobTitle: tPerson("jobTitle"),
    description: tMeta("description"),
    topics: [
      tPerson("topics.frontend"),
      tPerson("topics.uxui"),
      tPerson("topics.designSystems"),
      tPerson("topics.architecture"),
    ],
  });

  // Sections are added here, in mockup order, from step 3 onwards.
  return (
    <>
      <JsonLd data={siteGraph} />
      <main id="content" tabIndex={-1} />
    </>
  );
}
