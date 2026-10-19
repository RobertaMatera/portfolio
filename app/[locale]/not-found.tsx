import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import NotFound from "@/components/pages/NotFound/NotFound";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("NotFound");
  // Don't inherit the home page's canonical/hreflang: this URL is not the home page.
  return { title: t("title"), alternates: null };
}

export default function LocaleNotFound() {
  return <NotFound />;
}
