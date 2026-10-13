import Link from "next/link";

import { DEFAULT_LOCALE, Locale, isLocale } from "@/shared/i18n/config";
import { getDictionary } from "@/shared/i18n/getDictionary";
import { localizedPath } from "@/shared/i18n/routing";

type LocaleNotFoundProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleNotFound({ params }: LocaleNotFoundProps) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? (locale as Locale) : DEFAULT_LOCALE;
  const dict = await getDictionary(resolvedLocale);

  return (
    <main id="main-content" className="page-main">
      <section className="resume-page__card" aria-labelledby="not-found-title">
        <p className="resume-page__eyebrow">404</p>
        <h1 id="not-found-title">{dict.pages.notFound.heading}</h1>
        <p>{dict.pages.notFound.body}</p>
        <Link href={localizedPath(resolvedLocale, "home")} className="btn btn--cta">
          {dict.pages.notFound.backHome}
        </Link>
      </section>
    </main>
  );
}
