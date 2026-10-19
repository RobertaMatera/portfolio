"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

import Icon from "@/components/ui/Icon/Icon";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export interface LanguageOption {
  locale: Locale;
  /** The language's own name ("Deutsch"), so speakers recognise it. */
  name: string;
}

interface LanguageMenuProps {
  current: Locale;
  label: string;
  options: LanguageOption[];
}

/** Disclosure button that reveals links to the page in the other languages. */
export default function LanguageMenu({ current, label, options }: LanguageMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  const links = () => Array.from(rootRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);

  // While open: close on a click or tap outside, and on Escape from anywhere.
  // Escape is handled on the document because Safari doesn't focus buttons
  // on click, so focus may not be inside the menu.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      // Return focus to the toggle only if it was inside the menu.
      if (rootRef.current?.contains(document.activeElement)) buttonRef.current?.focus();
      setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const items = links();
    const index = items.indexOf(document.activeElement as HTMLAnchorElement);

    if (!open) {
      setOpen(true);
      // Wait for the list to become visible before moving focus into it.
      requestAnimationFrame(() => items[event.key === "ArrowUp" ? items.length - 1 : 0]?.focus());
      return;
    }

    const step = event.key === "ArrowDown" ? 1 : -1;
    const next = index === -1 ? (step === 1 ? 0 : items.length - 1) : (index + step + items.length) % items.length;
    items[next]?.focus();
  };

  return (
    <div
      ref={rootRef}
      className={open ? "language-menu is-open" : "language-menu"}
      onKeyDown={onKeyDown}
      // Tabbing out of the menu closes it, so it never hides content unseen.
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className="language-menu__toggle"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name="globe" />
        {/* Accessible name "Language EN" contains the visible text, so voice
            control users can say "click EN". */}
        <span className="visually-hidden">{label}</span>
        <span className="language-menu__code">{current.toUpperCase()}</span>
        <Icon name="chevronDown" className="language-menu__chevron" />
      </button>

      <ul id={listId} className="language-menu__list">
        {options.map((option) => (
          <li key={option.locale}>
            <Link
              href="/"
              locale={option.locale}
              hrefLang={option.locale}
              lang={option.locale}
              prefetch={false}
              className="language-menu__link"
              aria-current={option.locale === current ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {option.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
