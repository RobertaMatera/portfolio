import { getTranslations, setRequestLocale } from "next-intl/server";

import Footer from "@/components/chrome/Footer/Footer";
import RevealOnScroll from "@/components/chrome/RevealOnScroll/RevealOnScroll";
import ScrollTracker from "@/components/chrome/ScrollTracker/ScrollTracker";
import SocialRail from "@/components/chrome/SocialRail/SocialRail";
import Veils from "@/components/chrome/Veils/Veils";
import TopBar from "@/components/chrome/TopBar/TopBar";
import About from "@/components/sections/About/About";
import Contact from "@/components/sections/Contact/Contact";
import Experience from "@/components/sections/Experience/Experience";
import Hero from "@/components/sections/Hero/Hero";
import References from "@/components/sections/References/References";
import Services from "@/components/sections/Services/Services";
import Work from "@/components/sections/Work/Work";
import JsonLd from "@/components/seo/JsonLd/JsonLd";
import { sections } from "@/content/navigation";
import type { Locale } from "@/i18n/routing";
import { buildSiteGraph } from "@/lib/structured-data";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  // The layout has already rejected unknown locales.
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const tMeta = await getTranslations({ locale, namespace: "Metadata" });
  const tPerson = await getTranslations({ locale, namespace: "Person" });
  const tNav = await getTranslations({ locale, namespace: "Nav" });

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
        <Experience locale={locale} />
        <Work locale={locale} />
        <References locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />

      {/* Decoration and scroll effects; only the social rail is exposed to assistive tech. */}
      <Veils />
      <SocialRail locale={locale} />
      <ScrollTracker stops={sections.map((section) => ({ id: section.id, label: tNav(section.id) }))} />
      <RevealOnScroll />
    </>
  );
}
