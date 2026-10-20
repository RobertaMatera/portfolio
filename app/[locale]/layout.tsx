import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { profile } from "@/content/profile";
import { routing } from "@/i18n/routing";
import { languageAlternates, localeUrl, ogLocales, siteUrl } from "@/lib/site";

import "../globals.scss";

// Self-hosted at build time: no request to Google and no layout shift.
// Both are variable fonts, so every weight the design uses ships in one file.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2d5a27",
  viewportFit: "cover",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t("title");
  const description = t("description");
  const url = localeUrl(locale);

  return {
    metadataBase: new URL(siteUrl),
    // Child pages (e.g. the 404) get "<page> | Roberta Matera".
    title: { default: title, template: `%s | ${profile.name}` },
    description,
    applicationName: profile.name,
    authors: [{ name: profile.name, url }],
    creator: profile.name,
    alternates: {
      canonical: url,
      languages: languageAlternates(),
    },
    openGraph: {
      type: "profile",
      firstName: profile.givenName,
      lastName: profile.familyName,
      siteName: profile.name,
      url,
      title,
      description,
      locale: ogLocales[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      // og:image comes from the colocated opengraph-image.tsx.
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    // A phone number in the copy should not become a tap-to-call link
    // unless it is marked up as one.
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for every page under this layout.
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Common" });

  return (
    // data-scroll-behavior: Next.js turns smooth scrolling off during route
    // changes (e.g. switching language) and keeps it for in-page anchors.
    <html lang={locale} className={`${manrope.variable} ${fraunces.variable}`} data-scroll-behavior="smooth">
      <body>
        {/* Gives client components (e.g. the locale-aware Link) the current
            locale. messages={null} keeps translations out of the client
            bundle: client components receive their text as props instead. */}
        <NextIntlClientProvider messages={null}>
          <a className="skip-link" href="#content">
            {t("skipToContent")}
          </a>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
