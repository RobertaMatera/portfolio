import type { IconName } from "@/components/ui/Icon/Icon";

/** Icon background tints from the mockup, one per card. */
export type ServiceTint = "green" | "sun" | "coral" | "sky";

// Wording lives in messages/*.json under "Services.items.<id>".
export const services = [
  { id: "design", icon: "pen", tint: "green" },
  { id: "frontend", icon: "code", tint: "sun" },
  { id: "fullStack", icon: "server", tint: "coral" },
  { id: "analysis", icon: "chart", tint: "sky" },
] as const satisfies readonly { id: string; icon: IconName; tint: ServiceTint }[];
