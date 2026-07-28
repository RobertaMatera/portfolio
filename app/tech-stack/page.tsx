import { HERO_SKILLS } from "@/shared/sections/TechStack/techStack.constants";

export default function TechStackPage() {
  return (
    <main>
      <h1>Tech Stack</h1>

      {HERO_SKILLS.map((group) => (
        <section key={group.category}>
          <h2>{group.category}</h2>
          <ul>
            {group.items.map((item) => (
              <li key={`${group.category}-${item}`}>
                <span>[icon]</span> <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <form action="/">
        <button type="submit">Back to home page</button>
      </form>
    </main>
  );
}
