import { Metadata } from "next";
import { notFound } from "next/navigation";

import HomeSections from "@/shared/sections/HomeSections/HomeSections";
import Hero from "@/shared/sections/Hero/Hero";
import { DEFAULT_LOCALE, LOCALES, Locale, isLocale } from "@/shared/i18n/config";
import { getDictionary } from "@/shared/i18n/getDictionary";
import { buildLocalizedMetadata } from "@/shared/i18n/metadata";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  const dict = await getDictionary(locale);
  return buildLocalizedMetadata({
    locale,
    siteUrl,
    route: "home",
    title: dict.meta.homeTitle,
    description: dict.meta.siteDescription,
  });
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? (locale as Locale) : DEFAULT_LOCALE;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(resolvedLocale);

  return (
    <main id="main-content" className="page-main">
      <Hero locale={resolvedLocale} dict={dict} />
      <HomeSections locale={resolvedLocale} dict={dict} />
    </main>
  );
}
