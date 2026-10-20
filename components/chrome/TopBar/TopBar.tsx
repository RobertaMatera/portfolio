import Image from "next/image";
import { getTranslations } from "next-intl/server";

import Dock from "@/components/chrome/Dock/Dock";
import LanguageMenu from "@/components/chrome/LanguageMenu/LanguageMenu";
import { sections } from "@/content/navigation";
import { profile } from "@/content/profile";
import { routing, type Locale } from "@/i18n/routing";

interface TopBarProps {
  locale: Locale;
}

/** Fixed header: logo pill, section dock and language menu. */
export default async function TopBar({ locale }: TopBarProps) {
  const t = await getTranslations({ locale, namespace: "Nav" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });
  const tLanguage = await getTranslations({ locale, namespace: "LanguageMenu" });

  return (
    <header className="top-bar">
      <a className="top-bar__brand" href="#top">
        <Image
          className="top-bar__logo"
          src={profile.logo.src}
          width={profile.logo.width}
          height={profile.logo.height}
          // The link text names the destination; the logo adds nothing for screen readers.
          alt=""
        />
        <span className="top-bar__brand-text">
          {profile.name}
          <small>{tCommon("role")}</small>
        </span>
      </a>

      <Dock
        label={t("label")}
        items={sections.map((section) => ({ id: section.id, icon: section.icon, label: t(section.id) }))}
      />

      <LanguageMenu
        current={locale}
        label={tLanguage("label")}
        options={routing.locales.map((option) => ({ locale: option, name: tLanguage(`names.${option}`) }))}
      />
    </header>
  );
}
