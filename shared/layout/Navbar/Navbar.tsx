import Link from "next/link";
import Image from "next/image";

import { Dictionary } from "@/shared/i18n/dictionaries/types";
import { Locale } from "@/shared/i18n/config";
import { localizedPath, localizedSectionPath } from "@/shared/i18n/routing";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LocaleSwitcher from "./LocaleSwitcher";

type NavbarProps = {
  locale: Locale;
  dict: Dictionary;
};

export default function Navbar({ locale, dict }: NavbarProps) {
  return (
    <nav className="navbar" aria-label={dict.a11y.primaryNavigation}>
      <div className="navbar__inner">
        <Link href={localizedPath(locale, "home")} className="navbar__brand">
          <Image
            src="/images/icons/logoBg.png"
            alt="Roberta Matera Logo"
            width={48}
            height={48}
            className="navbar__logo"
          />
          <div className="navbar__title">
            <span className="navbar__name">{dict.nav.name}</span>
            <span className="navbar__role">{dict.nav.role}</span>
          </div>
        </Link>

        <div className="navbar__controls">
          <ul className="navbar__list">
            {dict.nav.items.map((item) => (
              <li key={item.section}>
                <Link href={localizedSectionPath(locale, item.section)} className="navbar__link">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={localizedPath(locale, "resume")} className="navbar__link">
                {dict.nav.resumeLabel}
              </Link>
            </li>
          </ul>
          <LocaleSwitcher
            locale={locale}
            label={dict.nav.languageLabel}
            chooseLanguageLabel={dict.languageSwitcher.chooseLanguage}
            localeLabels={dict.languageSwitcher.locales}
          />
          <ThemeToggle labels={dict.theme} />
        </div>
      </div>
    </nav>
  );
}