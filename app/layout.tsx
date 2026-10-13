import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, Montserrat } from "next/font/google";
import "./globals.scss";
import { DEFAULT_LOCALE, isLocale } from "@/shared/i18n/config";

const headingFont = Montserrat({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700"],
  display: "swap",
  adjustFontFallback: true,
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Roberta Matera | Software Developer",
    template: "%s | Roberta Matera",
  },
  description:
    "Portfolio of Roberta Matera, Frontend Software Engineer with enterprise experience in modern web platforms.",
  icons: {
    icon: "/images/icons/logoBg.png",
    shortcut: "/images/icons/logoBg.png",
    apple: "/images/icons/logoBg.png",
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestLocale = (await headers()).get("x-locale");
  const lang = requestLocale && isLocale(requestLocale) ? requestLocale : DEFAULT_LOCALE;

  const setThemeScript = `
    (function () {
      try {
        var key = "theme-preference";
        var root = document.documentElement;
        var stored = localStorage.getItem(key);
        var isStoredTheme = stored === "light" || stored === "dark";
        var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = isStoredTheme ? stored : (systemDark ? "dark" : "light");
        root.setAttribute("data-theme", theme);
        root.style.colorScheme = theme;
      } catch (e) {}
    })();
  `;

  return (
    <html
      lang={lang}
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: setThemeScript }} />
      </head>
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}
