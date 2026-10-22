import { getTranslations } from "next-intl/server";

import DialogTrigger from "@/components/ui/DialogTrigger/DialogTrigger";
import Icon from "@/components/ui/Icon/Icon";
import ProjectArt from "@/components/work/ProjectArt/ProjectArt";
import { projectDialogId } from "@/components/work/ProjectDialog/ProjectDialog";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { stringList } from "@/lib/messages";

interface ProjectCardProps {
  locale: Locale;
  project: Project;
}

/** Carousel card: illustration, summary, tags and the project's main action. */
export default async function ProjectCard({ locale, project }: ProjectCardProps) {
  const t = await getTranslations({ locale, namespace: "Work" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });
  const copy = `projects.${project.id}` as const;
  // Code projects list their stack; the others have translated topic tags.
  const tags =
    project.kind === "code"
      ? project.stack
      : stringList(t.raw(`projects.${project.id}.tags`), `Work.projects.${project.id}.tags`);

  const modifier = { code: "code", caseStudy: "case-study", upcoming: "upcoming" }[project.kind];

  return (
    <article className={`project-card project-card--${modifier}`} id={`work-${project.id}`} aria-labelledby={`work-${project.id}-title`}>
      <div className="project-card__art">
        <ProjectArt
          project={project.id}
          label={t(`${copy}.art.alt`)}
          lines={[t(`${copy}.art.line1`), t(`${copy}.art.line2`)]}
        />
        {project.kind === "caseStudy" && (
          <span className="project-card__zoom" aria-hidden="true">
            <Icon name="expand" />
          </span>
        )}
      </div>

      <div className="project-card__body">
        <h3 id={`work-${project.id}-title`}>{t(`${copy}.title`)}</h3>
        <p>{t(`${copy}.description`)}</p>
        <ul className="project-card__tags" aria-label={t("tagsLabel")}>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        {project.kind === "code" && (
          <div className="project-card__actions">
            <a className="project-card__action" href={project.repository} target="_blank" rel="noopener noreferrer">
              {t("viewCode")}
              <span aria-hidden="true"> ↗</span>
              <span className="visually-hidden"> ({tCommon("newTab")})</span>
            </a>
            {project.demoUrl ? (
              <a className="project-card__action" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                {t("liveDemo")}
                <span aria-hidden="true"> ↗</span>
                <span className="visually-hidden"> ({tCommon("newTab")})</span>
              </a>
            ) : (
              <span className="project-card__soon">{t("liveSoon")}</span>
            )}
          </div>
        )}
        {project.kind === "caseStudy" && (
          <div className="project-card__actions">
            <DialogTrigger dialogId={projectDialogId(project.id)} className="project-card__action">
              {t("openProject")}
              <Icon name="expand" />
            </DialogTrigger>
          </div>
        )}
      </div>
    </article>
  );
}
