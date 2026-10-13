import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/shared/layout/Footer/Footer";
import Navbar from "@/shared/layout/Navbar/Navbar";
import { LOCALES, isLocale } from "@/shared/i18n/config";
import { getDictionary } from "@/shared/i18n/getDictionary";
import { buildLocalizedMetadata } from "@/shared/i18n/metadata";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  const dict = await getDictionary(locale);
  const localized = buildLocalizedMetadata({
    locale,
    siteUrl,
    route: "home",
    title: dict.meta.siteTitle,
    description: dict.meta.siteDescription,
  });

  return {
    ...localized,
    keywords: dict.meta.siteKeywords,
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <div className="page-shell">
      <a className="skip-link" href="#main-content">
        {dict.a11y.skipToMain}
      </a>
      <Navbar locale={locale} dict={dict} />
      {children}
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
