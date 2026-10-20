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

/** Every section on the home page in order, including ones not in the dock. */
const pageOrder = ["top", "about", "what", "experience", "work", "references", "contact"] as const;

/** The section after `id`, for the next-section arrows; undefined for the last one. */
export function nextSectionId(id: string): string | undefined {
  const index = pageOrder.findIndex((section) => section === id);
  return index >= 0 ? pageOrder[index + 1] : undefined;
}
