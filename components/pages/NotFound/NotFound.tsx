import Image from "next/image";
import { getTranslations } from "next-intl/server";

import Button from "@/components/ui/Button/Button";
import Eyebrow from "@/components/ui/Eyebrow/Eyebrow";
import { profile } from "@/content/profile";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main id="content" tabIndex={-1} className="not-found">
      <div className="wrap not-found__inner">
        <Image className="not-found__logo" src={profile.logo.src} width={88} height={86} alt="" />
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
