import { getTranslations } from "next-intl/server";

import Button from "@/components/ui/Button/Button";
import CatTable from "@/components/ui/CatTable/CatTable";
import Eyebrow from "@/components/ui/Eyebrow/Eyebrow";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main id="content" tabIndex={-1} className="not-found">
      <div className="wrap not-found__inner">
        {/* The cat has pushed this page off the table. */}
        <CatTable />
        <Eyebrow>404</Eyebrow>
        <h1>{t("title")}</h1>
        <p className="not-found__body">{t("body")}</p>
        <Button href="/" glyph="forward">
          {t("backHome")}
        </Button>
      </div>
    </main>
  );
}
