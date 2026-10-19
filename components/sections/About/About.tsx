import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import Eyebrow from "@/components/ui/Eyebrow/Eyebrow";
import ExternalLink from "@/components/ui/ExternalLink/ExternalLink";
import Icon from "@/components/ui/Icon/Icon";
import Section from "@/components/ui/Section/Section";
import { aboutFacts, aboutLinks, aboutTags, architecturePrinciples } from "@/content/about";
import type { Locale } from "@/i18n/routing";

interface AboutProps {
  locale: Locale;
}

export default async function About({ locale }: AboutProps) {
  const t = await getTranslations({ locale, namespace: "About" });

  const links = {
    poliba: (chunks: ReactNode) => <ExternalLink href={aboutLinks.poliba[locale]}>{chunks}</ExternalLink>,
    pegaso: (chunks: ReactNode) => <ExternalLink href={aboutLinks.pegaso[locale]}>{chunks}</ExternalLink>,
  };

  return (
    <Section id="about" labelledBy="about-title" alt className="about">
      <div className="about__intro">
        <div className="about__text">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="about-title">{t("title")}</h2>
          <p className="lead">{t.rich("story", links)}</p>
          <p className="lead">{t.rich("today", links)}</p>

          <ul className="about__tags" aria-label={t("tagsLabel")}>
            {aboutTags.map((tag) => (
              <li key={tag.id}>
                <Icon name={tag.icon} />
                {t(`tags.${tag.id}`)}
              </li>
            ))}
          </ul>
        </div>

        <ul className="about__facts" aria-label={t("factsLabel")}>
          {aboutFacts.map((fact) => (
            <li key={fact} className="about__fact">
              <span className="about__fact-value">{t(`facts.${fact}.value`)}</span>
              <span className="about__fact-label">{t(`facts.${fact}.label`)}</span>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="about__principles-title">{t("principlesTitle")}</h3>
      <ol className="about__principles">
        {architecturePrinciples.map((principle) => (
          <li key={principle} className="about__principle">
            <h4>{t(`principles.${principle}.title`)}</h4>
            <p>{t(`principles.${principle}.body`)}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
