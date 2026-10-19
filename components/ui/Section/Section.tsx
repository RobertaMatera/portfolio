import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  /** Id of the section's heading, used as its accessible name. */
  labelledBy: string;
  /** Alternate (pale green) background. */
  alt?: boolean;
  className?: string;
  children: ReactNode;
}

/** A home page section: shared spacing, background and content width. */
export default function Section({ id, labelledBy, alt = false, className, children }: SectionProps) {
  const classes = ["section", alt && "section--alt", className].filter(Boolean).join(" ");

  return (
    <section id={id} className={classes} aria-labelledby={labelledBy}>
      <div className="wrap">{children}</div>
    </section>
  );
}
