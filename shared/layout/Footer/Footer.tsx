import Image from "next/image";
import Link from "next/link";

import { Locale } from "@/shared/i18n/config";
import { Dictionary } from "@/shared/i18n/dictionaries/types";
import { localizedPath } from "@/shared/i18n/routing";
import { CV_DOWNLOAD_PATH } from "@/shared/content/portfolioData";

type FooterProps = {
  locale: Locale;
  dict: Dictionary;
};

type FooterColumnData = {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
};

function FooterColumn({ title, links }: FooterColumnData) {
  return (
    <section className="footer__column" aria-label={title}>
      <p className="footer__column-title">{title}</p>
      <ul className="footer__list">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.href}
                className="footer__list-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className="footer__list-link">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Footer({ locale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const footerColumns: FooterColumnData[] = [
    {
      title: dict.footer.siteColumn.title,
      links: dict.footer.siteColumn.links.map((link) => ({
        label: link.label,
        href: localizedPath(locale, link.route),
      })),
    },
    {
      title: dict.footer.socialColumn.title,
      links: dict.footer.socialColumn.links,
    },
    {
      title: dict.footer.resourcesColumn.title,
      links: dict.footer.resourcesColumn.links.map((link) => ({
        label: link.label,
        href: link.route === "resume" ? CV_DOWNLOAD_PATH : localizedPath(locale, link.route),
        external: link.route === "resume",
      })),
    },
  ];

  return (
    <footer className="footer">
      <div className="footer__inner">
        <section className="footer__cta" aria-labelledby="footer-cta-title">
          <Image
            src="/images/icons/logo.png"
            alt="Roberta Matera logo"
            width={80}
            height={80}
            className="footer__cta-icon"
          />
          <div className="footer__cta-content">
            <p id="footer-cta-title" className="footer__cta-text">
              {dict.footer.cta.text}
            </p>
            <a href="mailto:materaroberta11@gmail.com" className="btn btn--outline footer__cta-button">
              {dict.footer.cta.button}
            </a>
          </div>
        </section>

        <div className="footer__columns">
          {footerColumns.map((col) => (
            <FooterColumn key={col.title} {...col} />
          ))}
        </div>
      </div>

      <div className="footer__meta">
        <p className="footer__copyright">
          © {currentYear} Roberta Matera. {dict.footer.copyrightSuffix}
        </p>
      </div>
    </footer>
  );
}
