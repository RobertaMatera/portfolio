import { getTranslations } from "next-intl/server";

import JsonLd from "@/components/seo/JsonLd/JsonLd";
import Carousel from "@/components/ui/Carousel/Carousel";
import Eyebrow from "@/components/ui/Eyebrow/Eyebrow";
import Section from "@/components/ui/Section/Section";
import ProjectCard from "@/components/work/ProjectCard/ProjectCard";
import ProjectDialog from "@/components/work/ProjectDialog/ProjectDialog";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { stringList } from "@/lib/messages";
import { buildWorksGraph } from "@/lib/structured-data";

interface WorkProps {
  locale: Locale;
}

/** "Selected work": project carousel, case study dialogs and their structured data. */
export default async function Work({ locale }: WorkProps) {
  const t = await getTranslations({ locale, namespace: "Work" });
  const total = projects.length;

  const worksGraph = buildWorksGraph(
    locale,
    projects
      .filter((project) => project.kind !== "upcoming")
      .map((project) => ({
        id: project.id,
        name: t(`projects.${project.id}.title`),
        description: t(`projects.${project.id}.description`),
        keywords:
          project.kind === "code"
            ? [...project.stack]
            : stringList(t.raw(`projects.${project.id}.tags`), `Work.projects.${project.id}.tags`),
        year: "year" in project ? project.year : undefined,
        image: project.kind === "caseStudy" ? project.images[0].src : undefined,
        code:
          project.kind === "code"
            ? { repository: project.repository, languages: project.programmingLanguages }
            : undefined,
      })),
  );

  return (
    <Section id="work" labelledBy="work-title">
      <JsonLd data={worksGraph} />
      <Eyebrow>{t("eyebrow")}</Eyebrow>
      <h2 id="work-title">{t("title")}</h2>

      <Carousel
        label={t("carousel.label")}
        roleDescription={t("carousel.roleDescription")}
        slideRoleDescription={t("carousel.slideRoleDescription")}
        previousLabel={t("carousel.previous")}
        nextLabel={t("carousel.next")}
        slides={projects.map((project, index) => ({
          key: project.id,
          position: t("carousel.slide", { number: index + 1, total }),
          goToLabel: t("carousel.goTo", { number: index + 1, title: t(`projects.${project.id}.title`) }),
          content: <ProjectCard locale={locale} project={project} />,
        }))}
      />

      {/* Outside the carousel so clicks and focus inside them do not move it. */}
      {projects.map(
        (project) => project.kind === "caseStudy" && <ProjectDialog key={project.id} locale={locale} project={project} />,
      )}
    </Section>
  );
}
