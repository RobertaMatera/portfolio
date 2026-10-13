"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { Locale } from "@/shared/i18n/config";
import { Dictionary } from "@/shared/i18n/dictionaries/types";
import { SECTION_IDS, localizedPath, localizedSectionPath } from "@/shared/i18n/routing";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LocaleSwitcher from "./LocaleSwitcher";

type NavbarProps = {
  locale: Locale;
  dict: Dictionary;
};

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  );
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const pathname = usePathname();
  const homePath = localizedPath(locale, "home");
  const resumePath = localizedPath(locale, "resume");
  const isHomeRoute = pathname === homePath;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const previousScrollY = useRef(0);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  const navItems = useMemo(
    () =>
      dict.nav.items.map((item) => ({
        ...item,
        href: localizedSectionPath(locale, item.section),
      })),
    [dict.nav.items, locale],
  );

  useEffect(() => {
    const body = document.body;
    if (isMobileMenuOpen) {
      body.classList.add("nav-lock");
      return () => body.classList.remove("nav-lock");
    }
    body.classList.remove("nav-lock");
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 12);

      if (currentY < 24) {
        setIsHidden(false);
        previousScrollY.current = currentY;
        return;
      }

      if (currentY > previousScrollY.current + 6) {
        setIsHidden(true);
      } else if (currentY < previousScrollY.current - 6) {
        setIsHidden(false);
      }

      previousScrollY.current = currentY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHomeRoute) {
      return;
    }

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (section): section is HTMLElement => Boolean(section),
    );

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHomeRoute, pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen || !menuPanelRef.current) {
      return;
    }

    const panel = menuPanelRef.current;
    const focusables = getFocusableElements(panel);
    focusables[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const interactiveElements = getFocusableElements(panel);
      const first = interactiveElements[0];
      const last = interactiveElements[interactiveElements.length - 1];

      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`navbar ${isScrolled ? "is-scrolled" : ""} ${isHidden ? "is-hidden" : ""}`}
      aria-label={dict.a11y.primaryNavigation}
    >
      <div className="navbar__inner">
        <Link href={homePath} className="navbar__brand">
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

        <button
          type="button"
          className="navbar__menu-toggle"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="navbar-panel"
          aria-label={isMobileMenuOpen ? dict.nav.closeMenuLabel : dict.nav.openMenuLabel}
        >
          <span aria-hidden>{isMobileMenuOpen ? "✕" : "☰"}</span>
        </button>

        <div
          id="navbar-panel"
          ref={menuPanelRef}
          className={`navbar__controls ${isMobileMenuOpen ? "is-open" : ""}`}
        >
          <ul className="navbar__list">
            {navItems.map((item) => {
              const isActive = isHomeRoute && activeSection === item.section;
              return (
                <li key={item.section}>
                  <Link
                    href={item.href}
                    className={`navbar__link ${isActive ? "is-active" : ""}`}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href={resumePath}
                className={`navbar__link ${pathname === resumePath ? "is-active" : ""}`}
                aria-current={pathname === resumePath ? "page" : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {dict.nav.resumeLabel}
              </Link>
            </li>
          </ul>
          <div className="navbar__tools">
            <LocaleSwitcher
              locale={locale}
              label={dict.nav.languageLabel}
              chooseLanguageLabel={dict.languageSwitcher.chooseLanguage}
              localeLabels={dict.languageSwitcher.locales}
            />
            <ThemeToggle labels={dict.theme} />
          </div>
        </div>
      </div>
      <button
        type="button"
        className={`navbar__backdrop ${isMobileMenuOpen ? "is-open" : ""}`}
        aria-hidden={!isMobileMenuOpen}
        tabIndex={-1}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
}
