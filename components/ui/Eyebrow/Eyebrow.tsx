import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/** Small uppercase kicker above a section heading, with a lime rule. */
export default function Eyebrow({ children, className }: EyebrowProps) {
  return <p className={className ? `eyebrow ${className}` : "eyebrow"}>{children}</p>;
}
