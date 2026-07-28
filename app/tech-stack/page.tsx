import { HERO_SKILLS } from "@/shared/sections/TechStack/techStack.constants";

export default function TechStackPage() {
  return (
    <main className="page-main tech-stack-page">
      <h1>Tech Stack</h1>
      <p className="tech-stack-page__intro">
        Skills and technologies grouped by area, with placeholder icons that can
        be replaced with real assets.
      </p>

      <div className="tech-stack-page__grid">
        {HERO_SKILLS.map((group) => (
          <section key={group.category} className="tech-stack-page__category glass-card">
          <h2>{group.category}</h2>
          <ul className="tech-stack-page__list">
            {group.items.map((item) => (
              <li key={`${group.category}-${item}`} className="tech-stack-page__item">
                <span className="tech-stack-page__placeholder">[icon]</span>{" "}
                <span>{item}</span>
              </li>
            ))}
          </ul>
          </section>
        ))}
      </div>

      <form action="/">
        <button type="submit" className="btn btn--outline">
          Back to home page
        </button>
      </form>
    </main>
  );
}
