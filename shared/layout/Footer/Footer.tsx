import Image from "next/image";
import Link from "next/link";

import { FOOTER_COLUMNS, FOOTER_CTA, FOOTER_DECOR } from "./constFooter";
import { FooterColumnData } from "./footer.types";

function FooterColumn({ title, links }: FooterColumnData) {
  return (
    <section className="footer__column" aria-label={title}>
      <p className="footer__column-title">{title}</p>
      <ul className="footer__list">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="footer__list-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* ── CTA ── */}
        <section className="footer__cta" aria-labelledby="footer-cta-title">
          <Image
            src={FOOTER_CTA.iconSrc}
            alt=""
            width={80}
            height={80}
            aria-hidden
            className="footer__cta-icon"
          />
          <div className="footer__cta-content">
              <p id="footer-cta-title" className="footer__cta-text">
                {FOOTER_CTA.text}
              </p>
              <a href={FOOTER_CTA.button.href} className="btn btn--outline footer__cta-button">
                {FOOTER_CTA.button.label}
              </a>
          </div>
        </section>

        {/* ── Nav columns ── */}
        <div className="footer__columns">
          {FOOTER_COLUMNS.map((col) => (
            <FooterColumn key={col.title} {...col} />
          ))}
        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div className="footer__meta">
        <p className="footer__copyright">
          © {currentYear} Roberta Matera. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

