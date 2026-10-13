import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CV_DOWNLOAD_PATH } from "@/shared/content/portfolioData";
import { DEFAULT_LOCALE, LOCALES, Locale, isLocale } from "@/shared/i18n/config";
import { getDictionary } from "@/shared/i18n/getDictionary";
import { buildLocalizedMetadata } from "@/shared/i18n/metadata";
import { LOCALIZED_SLUGS, localizedPath, routeKeyFromSlug } from "@/shared/i18n/routing";

type LocalizedPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

export async function generateStaticParams() {
  const routes = ["techStack", "resume", "projects"] as const;
  return LOCALES.flatMap((locale) =>
    routes.map((route) => ({
      locale,
      slug: LOCALIZED_SLUGS[route][locale],
    })),
  );
}

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  const route = routeKeyFromSlug(locale, slug);
  if (!route || route === "home") {
    return {};
  }

  const dict = await getDictionary(locale);
  const data =
    route === "techStack"
      ? dict.pages.techStack
      : route === "resume"
        ? dict.pages.resume
        : dict.pages.projects;

  return buildLocalizedMetadata({
    locale,
    siteUrl,
    route,
    title: data.title,
    description: data.description,
  });
}

export default async function LocalizedPage({ params }: LocalizedPageProps) {
  const { locale, slug } = await params;
  const resolvedLocale = isLocale(locale) ? (locale as Locale) : DEFAULT_LOCALE;

  if (!isLocale(locale)) {
    notFound();
  }

  const route = routeKeyFromSlug(resolvedLocale, slug);
  if (!route || route === "home") {
    notFound();
  }

  const dict = await getDictionary(resolvedLocale);

  if (route === "techStack") {
    return (
      <main id="main-content" className="page-main tech-stack-page">
        <Link href={localizedPath(resolvedLocale, "home")} className="btn btn--outline tech-stack-page__back">
          {dict.pages.techStack.backToHome}
        </Link>

        <div className="tech-stack-page__header">
          <Image
            src="/images/branch.png"
            alt=""
            width={120}
            height={180}
            aria-hidden
            className="tech-stack-page__header-ornament"
          />
          <p className="tech-stack-page__eyebrow flex gap-1">
            <Image src="/images/icons/leaf_icon.png" alt="" width={30} height={10} aria-hidden />
            {dict.pages.techStack.eyebrow}
          </p>
          <h1>{dict.pages.techStack.heading}</h1>
          <p className="tech-stack-page__intro">{dict.pages.techStack.intro}</p>
        </div>

        <div className="tech-stack-page__grid">
          {dict.pages.techStack.groups.map((group) => (
            <section key={group.category} className="tech-stack-page__category">
              <div className="tech-stack-page__category-header">
                <h2>{group.category}</h2>
                <span className="tech-stack-page__category-count">{group.items.length}</span>
              </div>

              <div className="tech-stack-page__chips">
                {group.items.map((item) => (
                  <span key={`${group.category}-${item}`} className="tech-stack-page__chip">
                    {item}
                  </span>
                ))}
              </div>

              {group.illustrationSrc ? (
                <div className="tech-stack-page__illustration">
                  <Image
                    src={group.illustrationSrc}
                    alt={group.illustrationAlt ?? `${group.category} decorative image`}
                    width={220}
                    height={130}
                    className="tech-stack-page__illustration-image"
                  />
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </main>
    );
  }

  if (route === "resume") {
    return (
      <main id="main-content" className="page-main resume-page">
        <section aria-labelledby="resume-title" className="resume-page__card">
          <p className="resume-page__eyebrow">{dict.pages.resume.eyebrow}</p>
          <h1 id="resume-title">{dict.pages.resume.heading}</h1>
          <p>{dict.pages.resume.body}</p>
          <div className="resume-page__actions">
            <a href={CV_DOWNLOAD_PATH} download className="btn btn--cta">
              {dict.pages.resume.download}
            </a>
            <a href={CV_DOWNLOAD_PATH} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
              {dict.pages.resume.view}
            </a>
            <Link href={`${localizedPath(resolvedLocale, "home")}#contact`} className="btn btn--surface">
              {dict.pages.resume.contact}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main id="main-content" className="page-main projects-page">
      <section className="section-block" aria-labelledby="projects-page-title">
        <div className="section-block__header">
          <p className="section-block__eyebrow">{dict.pages.projects.eyebrow}</p>
          <h1 id="projects-page-title">{dict.pages.projects.heading}</h1>
          <p>{dict.pages.projects.intro}</p>
          <Link href={localizedPath(resolvedLocale, "home")} className="btn btn--outline">
            {dict.pages.projects.backToHome}
          </Link>
        </div>
        <div className="projects-grid">
          {dict.sections.projects.items.map((project) => (
            <article key={project.name} className="project-card">
              <header>
                <h2>{project.name}</h2>
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
                  <p className="project-card__confidential">{dict.sections.projects.confidentialNote}</p>
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
    </main>
  );
}
