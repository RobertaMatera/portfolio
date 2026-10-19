import { getTranslations, setRequestLocale } from "next-intl/server";

import TopBar from "@/components/chrome/TopBar/TopBar";
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

  // Sections are added to <main> in mockup order from step 4 onwards.
  return (
    <>
      <JsonLd data={siteGraph} />
      <TopBar locale={locale} />
      <main id="content" tabIndex={-1} />
    </>
  );
}
