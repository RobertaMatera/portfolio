"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { Locale, LOCALES } from "@/shared/i18n/config";
import { LOCALIZED_SLUGS, routeKeyFromSlug } from "@/shared/i18n/routing";

type LocaleSwitcherProps = {
  locale: Locale;
  label: string;
  chooseLanguageLabel: string;
  localeLabels: { locale: Locale; label: string }[];
};

const LOCALE_FLAGS: Record<Locale, string> = {
  it: "🇮🇹",
  en: "🇬🇧",
  de: "🇩🇪",
};

function getTargetPath(currentPathname: string, currentLocale: Locale, targetLocale: Locale) {
  const segments = currentPathname.split("/").filter(Boolean);
  const hasLocalePrefix = segments.length > 0 && LOCALES.includes(segments[0] as Locale);
  const slug = hasLocalePrefix ? segments[1] ?? "" : "";

  if (!slug) {
    return `/${targetLocale}`;
  }

  const routeKey = routeKeyFromSlug(currentLocale, slug);
  if (!routeKey) {
    return `/${targetLocale}`;
  }

  const targetSlug = LOCALIZED_SLUGS[routeKey][targetLocale];
  return targetSlug ? `/${targetLocale}/${targetSlug}` : `/${targetLocale}`;
}

export default function LocaleSwitcher({
  locale,
  label,
  chooseLanguageLabel,
  localeLabels,
}: LocaleSwitcherProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash ?? "");
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) {
        return;
      }

      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const links = useMemo(() => {
    return localeLabels.map((entry) => {
      const base = getTargetPath(pathname, locale, entry.locale);
      return {
        ...entry,
        href: hash ? `${base}${hash}` : base,
      };
    });
  }, [hash, locale, localeLabels, pathname]);

  const currentLocale = localeLabels.find((entry) => entry.locale === locale) ?? localeLabels[0];

  return (
    <div className="language-switcher" ref={rootRef}>
      <button
        type="button"
        className="language-switcher__trigger"
        aria-label={label}
        aria-expanded={isOpen}
        aria-controls="language-menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="language-switcher__flag" aria-hidden>
          {LOCALE_FLAGS[currentLocale.locale]}
        </span>
        <span className="language-switcher__code">{currentLocale.locale.toUpperCase()}</span>
        <span className="language-switcher__caret" aria-hidden>
          ▾
        </span>
      </button>

      <ul
        id="language-menu"
        className={`language-switcher__list ${isOpen ? "is-open" : ""}`}
        aria-label={chooseLanguageLabel}
      >
        {links.map((entry) => (
          <li key={entry.locale}>
            <Link
              href={entry.href}
              hrefLang={entry.locale}
              lang={entry.locale}
              aria-current={entry.locale === locale ? "page" : undefined}
              onClick={() => setIsOpen(false)}
            >
              <span className="language-switcher__flag" aria-hidden>
                {LOCALE_FLAGS[entry.locale]}
              </span>
              <span>{entry.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
