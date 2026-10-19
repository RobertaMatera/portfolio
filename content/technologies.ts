import type { IconName } from "@/components/ui/Icon/Icon";

export interface Technology {
  /** Product name; never translated. */
  name: string;
  icon: IconName;
}

/** Core stack, in the order shown in the hero. */
export const technologies: Technology[] = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Angular", icon: "angular" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Java", icon: "java" },
  { name: "Spring Boot", icon: "spring" },
  { name: "Sass", icon: "sass" },
  { name: "Figma", icon: "figma" },
];
