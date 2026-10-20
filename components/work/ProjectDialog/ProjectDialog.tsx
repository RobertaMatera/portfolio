import { getTranslations } from "next-intl/server";

import Dialog from "@/components/ui/Dialog/Dialog";
import ZoomImage from "@/components/work/ZoomImage/ZoomImage";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { stringList, stringRecord } from "@/lib/messages";

interface ProjectDialogProps {
  locale: Locale;
  project: Extract<Project, { kind: "caseStudy" }>;
}

export const projectDialogId = (id: string) => `project-${id}`;

/** Full case study: drawings beside the story, constraints and tools. */
export default async function ProjectDialog({ locale, project }: ProjectDialogProps) {
  const t = await getTranslations({ locale, namespace: "Work" });
  const dialogId = projectDialogId(project.id);
  const headingId = `${dialogId}-heading`;
  const detail = `projects.${project.id}.detail` as const;
  const paragraphs = stringList(t.raw(`${detail}.body`), `Work.${detail}.body`);
  const imageAlts = stringRecord(t.raw(`${detail}.images`), `Work.${detail}.images`);
  const altFor = (key: string) => {
    const alt = imageAlts[key];
    if (!alt) throw new Error(`Missing alt text "Work.${detail}.images.${key}".`);
    return alt;
  };

  return (
    <Dialog id={dialogId} labelledBy={headingId} closeLabel={t("close")} className="project-dialog">
      <div className="project-dialog__panel">
        <div className="project-dialog__text">
          <p className="project-dialog__meta">{t(`${detail}.meta`)}</p>
          <h3 id={headingId}>{t(`${detail}.heading`)}</h3>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <aside className="project-dialog__callout">
            <h4>{t(`${detail}.callout.title`)}</h4>
            <p>{t(`${detail}.callout.body`)}</p>
          </aside>
          <ul className="project-dialog__tools" aria-label={t("toolsLabel")}>
            {project.tools.map((tool) => (
              <li key={tool}>{t(`tools.${tool}`)}</li>
            ))}
          </ul>
        </div>

        <div className="project-dialog__gallery">
          {project.images.map((image) => (
            <ZoomImage
              key={image.key}
              id={`${dialogId}-${image.key}`}
              image={image}
              alt={altFor(image.key)}
              enlargeLabel={t("enlarge")}
              closeLabel={t("close")}
            />
          ))}
        </div>
      </div>
    </Dialog>
  );
}
