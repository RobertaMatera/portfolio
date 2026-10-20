import type { ComponentProps, ReactNode } from "react";

import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary";

// Arrow glyphs are visual only; screen readers would announce them
// ("north east arrow"), so they are kept out of the text.
const glyphs = {
  external: "↗",
  download: "↓",
  forward: "→",
} as const;

interface BaseProps {
  variant?: Variant;
  glyph?: keyof typeof glyphs;
  className?: string;
  children: ReactNode;
}

type AnchorRest = { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">;
type ButtonRest = { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export type ButtonProps = BaseProps & (AnchorRest | ButtonRest);

function isAnchor(rest: AnchorRest | ButtonRest): rest is AnchorRest {
  return typeof rest.href === "string";
}

/** Renders a <button>, or a link styled as one when `href` is given. */
export default function Button({ variant = "primary", glyph, className, children, ...rest }: ButtonProps) {
  const classes = ["btn", `btn--${variant}`, className].filter(Boolean).join(" ");
  const content = (
    <>
      {children}
      {glyph && (
        <span className="btn__glyph" aria-hidden="true">
          {glyphs[glyph]}
        </span>
      )}
    </>
  );

  if (!isAnchor(rest)) {
    const { type = "button", ...buttonProps } = rest;
    return (
      <button type={type} className={classes} {...buttonProps}>
        {content}
      </button>
    );
  }

  const { href, ...anchorProps } = rest;

  // Internal routes go through the locale-aware Link; hashes, files and
  // other sites are plain anchors.
  if (href.startsWith("/") && !href.startsWith("/files/")) {
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...anchorProps}>
      {content}
    </a>
  );
}
