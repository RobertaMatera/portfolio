import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("NotFound");
  // Don't inherit the home page's canonical/hreflang: this URL is not the home page.
  return { title: t("title"), alternates: null };
}

// Styled in step 3 together with the shared Button component.
export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main id="content" tabIndex={-1} className="wrap not-found">
      <h1>{t("title")}</h1>
      <p>{t("body")}</p>
      <Link href="/">{t("backHome")}</Link>
    </main>
  );
}
