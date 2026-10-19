import { getTranslations, setRequestLocale } from "next-intl/server";

import TopBar from "@/components/chrome/TopBar/TopBar";
import About from "@/components/sections/About/About";
import Hero from "@/components/sections/Hero/Hero";
import Services from "@/components/sections/Services/Services";
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

  // Sections in mockup order.
  return (
    <>
      <JsonLd data={siteGraph} />
      <TopBar locale={locale} />
      <main id="content" tabIndex={-1}>
        <Hero locale={locale} />
        <About locale={locale} />
        <Services locale={locale} />
      </main>
    </>
  );
}
