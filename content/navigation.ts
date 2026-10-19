import type { IconName } from "@/components/ui/Icon/Icon";

// Page sections in scroll order. `id` is the section's element id
// ("top" scrolls to the start of the page) and the message key in "Nav".
export const sections = [
  { id: "top", icon: "home" },
  { id: "about", icon: "user" },
  { id: "what", icon: "layers" },
  { id: "experience", icon: "briefcase" },
  { id: "work", icon: "grid" },
  { id: "contact", icon: "mail" },
] as const satisfies readonly { id: string; icon: IconName }[];

export type SectionId = (typeof sections)[number]["id"];
