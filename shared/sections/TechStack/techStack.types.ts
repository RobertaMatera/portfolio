export type HeroSkillCategory = {
  id: "core-skills" | "ui-ux-design" | "backend-tools" | "ai-tools" | "languages";
  category: string;
  items: string[];
  illustrationSrc?: string;
  illustrationAlt?: string;
};
