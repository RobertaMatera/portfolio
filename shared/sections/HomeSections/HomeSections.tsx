import Link from "next/link";

import { Locale } from "@/shared/i18n/config";
import { Dictionary } from "@/shared/i18n/dictionaries/types";
import { localizedPath } from "@/shared/i18n/routing";

type HomeSectionsProps = {
  locale: Locale;
  dict: Dictionary;
};

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/RobertaMatera" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/roberta-matera/" },
  { label: "Email", href: "mailto:materaroberta11@gmail.com" },
];

export default function HomeSections({ locale, dict }: HomeSectionsProps) {
  const { sections } = dict;

  return (
    <>
      <section id="about" className="section-block" aria-labelledby="about-title">
        <div className="section-block__header">
          <p className="section-block__eyebrow">{sections.about.eyebrow}</p>
          <h2 id="about-title">{sections.about.title}</h2>
        </div>
        <div className="section-block__content section-block__content--narrow">
          {sections.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section id="skills" className="section-block" aria-labelledby="skills-title">
        <div className="section-block__header">
          <p className="section-block__eyebrow">{sections.skills.eyebrow}</p>
          <h2 id="skills-title">{sections.skills.title}</h2>
        </div>
        <div className="skills-grid">
          {sections.skills.groups.map((group) => (
            <article key={group.title} className="skills-card">
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={`${group.title}-${item}`}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="section-block" aria-labelledby="experience-title">
        <div className="section-block__header">
          <p className="section-block__eyebrow">{sections.experience.eyebrow}</p>
          <h2 id="experience-title">{sections.experience.title}</h2>
        </div>
        <div className="timeline">
          {sections.experience.items.map((item) => (
            <article key={`${item.company}-${item.period}`} className="timeline__item">
              <header className="timeline__header">
                <h3>{item.role}</h3>
                <p className="timeline__meta">
                  {item.company} · {item.location}
                </p>
                <p className="timeline__period">{item.period}</p>
              </header>
              <ul>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section-block" aria-labelledby="projects-title">
        <div className="section-block__header">
          <p className="section-block__eyebrow">{sections.projects.eyebrow}</p>
          <h2 id="projects-title">{sections.projects.title}</h2>
        </div>
        <div className="projects-grid">
          {sections.projects.items.map((project) => (
            <article key={project.name} className="project-card">
              <header>
                <h3>{project.name}</h3>
                <p className="project-card__context">{project.context}</p>
              </header>
              <p className="project-card__summary">{project.summary}</p>
              <ul>
                {project.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <div className="project-card__stack">
                {project.stack.map((tech) => (
                  <span key={`${project.name}-${tech}`}>{tech}</span>
                ))}
              </div>
              <div className="project-card__footer">
                {project.confidential ? (
                  <p className="project-card__confidential">{sections.projects.confidentialNote}</p>
                ) : null}
                {project.links.map((link) => (
                  <a
                    key={`${project.name}-${link.label}`}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card__link"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="education" className="section-block" aria-labelledby="education-title">
        <div className="section-block__header">
          <p className="section-block__eyebrow">{sections.education.eyebrow}</p>
          <h2 id="education-title">{sections.education.title}</h2>
        </div>
        <div className="education-grid">
          {sections.education.items.map((item) => (
            <article key={`${item.title}-${item.period}`} className="education-card">
              <h3>{item.title}</h3>
              <p className="education-card__meta">{item.institution}</p>
              <p className="education-card__meta">{item.period}</p>
              <p className="education-card__status">{item.status}</p>
              <p>{item.notes}</p>
            </article>
          ))}
        </div>
        <div className="education-certifications">
          <h3>{sections.education.certificationsTitle}</h3>
          <ul>
            {sections.education.certifications.map((item) => (
              <li key={item.name}>
                <span>{item.name}</span>
                <strong>{item.status}</strong>
              </li>
            ))}
          </ul>
          <p className="education-certifications__languages">
            <strong>{sections.education.languagesTitle}:</strong> {sections.education.languages.join(" · ")}
          </p>
        </div>
      </section>

      <section id="contact" className="section-block section-block--contact" aria-labelledby="contact-title">
        <div className="section-block__header">
          <p className="section-block__eyebrow">{sections.contact.eyebrow}</p>
          <h2 id="contact-title">{sections.contact.title}</h2>
        </div>
        <div className="contact-card">
          <p>{sections.contact.text}</p>
          <div className="contact-card__actions">
            <a href="mailto:materaroberta11@gmail.com" className="btn btn--cta">
              {sections.contact.primaryAction}
            </a>
            <Link href={localizedPath(locale, "resume")} className="btn btn--outline">
              {sections.contact.resumeAction}
            </Link>
          </div>
          <ul className="contact-card__socials">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
