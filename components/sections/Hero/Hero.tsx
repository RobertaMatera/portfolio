import Image from "next/image";
import { getTranslations } from "next-intl/server";

import Button from "@/components/ui/Button/Button";
import Eyebrow from "@/components/ui/Eyebrow/Eyebrow";
import Icon from "@/components/ui/Icon/Icon";
import { profile } from "@/content/profile";
import { technologies } from "@/content/technologies";
import type { Locale } from "@/i18n/routing";

interface HeroProps {
  locale: Locale;
}

export default async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale, namespace: "Hero" });
  const cvLanguage = new Intl.DisplayNames([locale], { type: "language" }).of(profile.cv.language) ?? "";

  return (
    // id="top": the dock's Home link and the logo pill scroll here.
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__inner">
        <div className="hero__text">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 id="hero-title" className="hero__title">
            {t.rich("title", { em: (chunks) => <em>{chunks}</em> })}
          </h1>
          <p className="lead">{t("intro")}</p>

          <div className="hero__actions">
            <Button href="#work" glyph="external">
              {t("viewProjects")}
            </Button>
            <Button
              href={profile.cv.href}
              variant="secondary"
              glyph="download"
              download={profile.cv.fileName}
              hrefLang={profile.cv.language}
              type="application/pdf"
            >
              {t("downloadCv")}
              {/* Says what the link delivers before it downloads (WCAG 2.4.4). */}
              <span className="visually-hidden">
                {` (${t("cvFileInfo", { language: cvLanguage, size: profile.cv.sizeKb })})`}
              </span>
            </Button>
          </div>

          <ul className="hero__stack" aria-label={t("stackLabel")}>
            {technologies.map((tech) => (
              <li key={tech.name} className="tech-pill">
                <Icon name={tech.icon} />
                {tech.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__portrait">
          <Image
            src={profile.portrait.src}
            width={profile.portrait.width}
            height={profile.portrait.height}
            alt={t("portraitAlt")}
            sizes="(max-width: 760px) 320px, 420px"
            // The portrait is the largest element above the fold on desktop.
            preload
          />
        </div>
      </div>
    </section>
  );
}
