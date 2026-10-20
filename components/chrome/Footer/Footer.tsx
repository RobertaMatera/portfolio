import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { profile, socialLinks } from "@/content/profile";
import type { Locale } from "@/i18n/routing";

interface FooterProps {
  locale: Locale;
}

/** Site footer: logo badge, contact and profile links, copyright line. */
export default async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: "Footer" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });
  // Pages are generated at build time, so this is the year of the last deploy.
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap site-footer__row">
        <div className="site-footer__brand">
          <span className="site-footer__logo">
            {/* The name beside it says who this is; the logo is decoration. */}
            <Image src={profile.logo.src} width={profile.logo.width} height={profile.logo.height} alt="" />
          </span>
          <p>
            <strong>{profile.name}</strong>
            <small>{tCommon("role")}</small>
          </p>
        </div>

        <ul className="site-footer__links" aria-label={t("linksLabel")}>
          {socialLinks.map((link) => (
            <li key={link.network}>
              {link.external ? (
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <span className="visually-hidden"> ({tCommon("newTab")})</span>
                </a>
              ) : (
                <a href={link.href}>{link.network === "email" ? t("email") : link.label}</a>
              )}
            </li>
          ))}
        </ul>

        <p>
          © {year} · {t("madeIn")}
        </p>
      </div>
    </footer>
  );
}
