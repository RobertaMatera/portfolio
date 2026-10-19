import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/** Inline link to another site, opened in a new tab (announced to screen readers). */
export default function ExternalLink({ href, children, className }: ExternalLinkProps) {
  const t = useTranslations("Common");

  return (
    <a
      href={href}
      className={className ? `text-link ${className}` : "text-link"}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <span className="visually-hidden"> ({t("newTab")})</span>
    </a>
  );
}
