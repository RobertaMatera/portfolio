import Link from "next/link";

import { HERO_ACTIONS, HERO_CONTENT } from "./hero.constants";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero">
      <div className="hero__grid">
        <div className="hero__content">
          <p className="hero__eyebrow">{HERO_CONTENT.eyebrow}</p>

          <div className="hero__text">
            <h1 id="hero-title" className="hero__title">
              {HERO_CONTENT.title}
            </h1>
            <p className="hero__description">{HERO_CONTENT.description}</p>
          </div>

          <div className="hero__actions">
            <Link
              href={HERO_ACTIONS.primary.href}
              className="btn btn--cta"
            >
              {HERO_ACTIONS.primary.label}
            </Link>
            <a
              href={HERO_ACTIONS.secondary.href}
              className="btn btn--surface"
            >
              {HERO_ACTIONS.secondary.label}
            </a>
            <a
              href={HERO_ACTIONS.tertiary.href}
              download
              className="btn btn--outline"
            >
              {HERO_ACTIONS.tertiary.label}
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__blob" />
          <div className="hero__placeholder">
            <span>
              {HERO_CONTENT.placeholderLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}