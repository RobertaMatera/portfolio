import { setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  // The layout has already rejected unknown locales.
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  // Sections are added here, in mockup order, from step 3 onwards.
  return <main id="content" tabIndex={-1} />;
}
