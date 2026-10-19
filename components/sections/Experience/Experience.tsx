import { getTranslations } from "next-intl/server";
import { Fragment } from "react";

import Eyebrow from "@/components/ui/Eyebrow/Eyebrow";
import ExternalLink from "@/components/ui/ExternalLink/ExternalLink";
import Section from "@/components/ui/Section/Section";
import { experience, localize } from "@/content/experience";
import type { Locale } from "@/i18n/routing";

interface ExperienceProps {
  locale: Locale;
}

/** Zig-zag timeline of jobs and degrees, most recent first. */
export default async function Experience({ locale }: ExperienceProps) {
  const t = await getTranslations({ locale, namespace: "Experience" });

  return (
    <Section id="experience" labelledBy="experience-title" alt>
      <Eyebrow>{t("eyebrow")}</Eyebrow>
      <h2 id="experience-title">{t("title")}</h2>

      <ol className="timeline">
        {experience.map((entry) => {
          const title = t(`entries.${entry.id}.title`);

          return (
            <li key={entry.id} className="timeline__item">
              {/* First in the source so screen readers hear the period before
                  the role, as phones show it; desktop moves it beside the card. */}
              <p className="timeline__date">
                <time dateTime={String(entry.start)}>{entry.start}</time>
                {" – "}
                <time dateTime={String(entry.end)}>{entry.end}</time>
              </p>

              <div className="timeline__card">
                {entry.kind === "education" && <span className="timeline__tag">{t("education")}</span>}
                <h3>
                  {"titleUrl" in entry ? (
                    <ExternalLink href={localize<string>(entry.titleUrl, locale)}>{title}</ExternalLink>
                  ) : (
                    title
                  )}
                </h3>
                <p className="timeline__org">
                  {entry.organisations.map((org, index) => (
                    <Fragment key={index}>
                      {index > 0 && " · "}
                      <ExternalLink href={localize<string>(org.url, locale)}>
                        {localize<string>(org.name, locale)}
                      </ExternalLink>
                    </Fragment>
                  ))}
                  {"hasNote" in entry && ` · ${t(`entries.${entry.id}.note`)}`}
                </p>
                <p>{t(`entries.${entry.id}.body`)}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
