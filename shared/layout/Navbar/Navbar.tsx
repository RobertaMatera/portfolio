"use client";

import Link from "next/link";
import Image from "next/image";

import { useNavbar } from "./useNavbar";
import { LanguageCode } from "./navbar.types";

export default function Navbar() {
  const { items: navItems, languages, isLangOpen, setIsLangOpen } = useNavbar();

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link href="/" className="navbar__brand">
          <Image
            src="/images/icons/logoBg.png"
            alt="Roberta Matera Logo"
            width={48}
            height={48}
            className="navbar__logo"
          />
          <div className="navbar__title">
            <span className="navbar__name">Roberta Matera</span>
            <span className="navbar__role">Full Stack Developer</span>
          </div>
        </Link>

        <div className="navbar__menu">
          <ul className="navbar__list">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href ?? "/"} className="navbar__link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar__lang">
            <button
              type="button"
              className="btn btn--surface navbar__lang-toggle"
              onClick={() => setIsLangOpen((lang) => !lang)}
            >
              {LanguageCode.EN.toUpperCase()}
            </button>

            {isLangOpen && (
              <ul className="navbar__dropdown">
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      type="button"
                      onClick={() => {
                        console.log("selected:", lang.code);
                        setIsLangOpen(false);
                      }}
                      className="navbar__dropdown-button"
                    >
                      {lang.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}