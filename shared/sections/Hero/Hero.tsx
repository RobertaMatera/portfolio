import Image from "next/image";
import Link from "next/link";

import { CV_DOWNLOAD_PATH } from "@/shared/content/portfolioData";
import { Locale } from "@/shared/i18n/config";
import { Dictionary } from "@/shared/i18n/dictionaries/types";
import { localizedPath } from "@/shared/i18n/routing";

type HeroProps = {
  locale: Locale;
  dict: Dictionary;
};

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/RobertaMatera" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/roberta-matera/" },
  { label: "Email", href: "mailto:materaroberta11@gmail.com" },
];

export default function Hero({ locale, dict }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="hero">
      <div className="hero__grid">

        <p className="hero__eyebrow">{dict.hero.eyebrow}</p>

        <h1 id="hero-title" className="hero__title">
          {dict.hero.title}
        </h1>

        <div className="hero__visual">
          <Image
            src="/images/hero_pic.png"
            alt="Roberta Matera portrait"
            width={420}
            height={560}
            className="hero__portrait"
            priority
          />
        </div>

        <p className="hero__description">{dict.hero.description}</p>

        <div className="hero__actions">
          <Link href={localizedPath(locale, "projects")} className="btn btn--cta">
            {dict.hero.actions.primary}
          </Link>
          <a
            href="mailto:materaroberta11@gmail.com"
            className="btn btn--surface"
          >
            {dict.hero.actions.secondary}
          </a>
          <a
            href={CV_DOWNLOAD_PATH}
            download
            className="btn btn--outline"
          >
            {dict.hero.actions.tertiary}
          </a>
        </div>
        <ul className="hero__socials" aria-label={dict.a11y.socialLinks}>
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}