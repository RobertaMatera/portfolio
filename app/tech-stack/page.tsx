import Image from "next/image";
import Link from "next/link";

import { HERO_SKILLS } from "@/shared/sections/TechStack/techStack.constants";

export default function TechStackPage() {
  return (
    <main className="page-main tech-stack-page">
      <Link href="/" className="btn btn--outline tech-stack-page__back">
        ← Back to home
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
          <Image
            src="/images/icons/leaf_icon.png"
            alt="leaf icon"
            width={30}
            height={10}
            aria-hidden
          />
          Tech Stack
        </p>
        <h1>Tech Stack</h1>
        <p className="tech-stack-page__intro">
          Comprehensive collection of skills and technologies organized by expertise area.
        </p>
      </div>

      <div className="tech-stack-page__grid">
        {HERO_SKILLS.map((group) => (
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
