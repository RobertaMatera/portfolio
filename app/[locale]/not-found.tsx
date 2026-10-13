import Link from "next/link";
import { headers } from "next/headers";

import { DEFAULT_LOCALE, isLocale } from "@/shared/i18n/config";
import { getDictionary } from "@/shared/i18n/getDictionary";
import { localizedPath } from "@/shared/i18n/routing";

export default async function LocaleNotFound() {
  const localeHeader = (await headers()).get("x-locale");
  const resolvedLocale = localeHeader && isLocale(localeHeader) ? localeHeader : DEFAULT_LOCALE;
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
