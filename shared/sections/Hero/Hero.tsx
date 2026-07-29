import Image from "next/image";

import { HERO_ACTIONS, HERO_CONTENT } from "./hero.constants";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero">
      <div className="hero__grid">

        <p className="hero__eyebrow">{HERO_CONTENT.eyebrow}</p>

        <h1 id="hero-title" className="hero__title">
          {HERO_CONTENT.title}
        </h1>

        <div className="hero__visual">
          <Image
            src={HERO_CONTENT.src}
            alt={HERO_CONTENT.altLabel}
            width={420}
            height={560}
            aria-hidden
            className="hero__portrait"
            priority
          />
        </div>

        <p className="hero__description">{HERO_CONTENT.description}</p>

        <div className="hero__actions">
          {/* View projects CTA intentionally disabled for now */}
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
    </section>
  );
}