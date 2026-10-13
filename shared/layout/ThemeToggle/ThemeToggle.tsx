"use client";

import { useState } from "react";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "theme-preference";

type ThemeToggleLabels = {
  light: string;
  dark: string;
  switchToLight: string;
  switchToDark: string;
};

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const rootTheme = document.documentElement.getAttribute("data-theme");
  if (rootTheme === "light" || rootTheme === "dark") {
    return rootTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle({ labels }: { labels: ThemeToggleLabels }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const setDocumentTheme = (nextTheme: Theme) => {
    const root = document.documentElement;
    root.setAttribute("data-theme", nextTheme);
    root.style.colorScheme = nextTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  };

  const handleToggle = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setDocumentTheme(nextTheme);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleToggle}
      aria-label={theme === "dark" ? labels.switchToLight : labels.switchToDark}
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? labels.switchToLight : labels.switchToDark}
    >
      <span className="theme-toggle__icon" aria-hidden suppressHydrationWarning>
        {theme === "dark" ? "☀" : "☾"}
      </span>
    </button>
  );
}
