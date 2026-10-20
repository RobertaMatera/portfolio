import type { ReactNode } from "react";

// Stroke icons from docs/mockup.html, drawn on a 24×24 grid.
const paths = {
  home: <path d="M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  layers: <path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5" />,
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </>
  ),
  building: <path d="M4 20V9l8-5 8 5v11zM9 20v-6h6v6" />,
  pen: <path d="M4 20l1-4L16 5l3 3L8 19zM14 7l3 3" />,
  code: <path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14" />,
  server: <path d="M4 5h16v5H4zM4 14h16v5H4zM8 7.5h.01M8 16.5h.01" />,
  chart: <path d="M4 20V4M4 20h16M8 16v-5M13 16V8M18 16v-9" />,
  // Technology marks (simplified line versions, not official logos)
  react: (
    <>
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.6" />
    </>
  ),
  nextjs: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 16V8l6.5 9M16 8v4" />
    </>
  ),
  angular: <path d="M12 2l9 3-1.5 13L12 22l-7.5-4L3 5zM8.5 16L12 7l3.5 9M9.7 13h4.6" />,
  typescript: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7 10h5M9.5 10v7M17 10.5c-.6-.5-3.5-.8-3.5.8 0 2 3.8 1.2 3.8 3.2 0 1.6-3 1.5-3.8.7" />
    </>
  ),
  java: (
    <path d="M5 11h11v4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4zM16 12h1.5a2 2 0 0 1 0 4H16M9 3c-1 1.5 1.5 2.5 0 4M13 3c-1 1.5 1.5 2.5 0 4M5 21.5h12" />
  ),
  spring: <path d="M20 4C10 4 5 9 5 15c0 3 2 5 5 5 6 0 10-6 10-16zM5 21c3-6 7-9 11-11" />,
  sass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M16 9c-1-2-6-1.5-6 .7 0 2.3 6 1.3 6 4 0 2.5-5.5 3-7.2.5" />
    </>
  ),
  figma: (
    <path d="M9 3h3v6H9a3 3 0 0 1 0-6zM12 3h3a3 3 0 0 1 0 6h-3zM9 9h3v6H9a3 3 0 0 1 0-6zM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM9 15h3v3a3 3 0 1 1-3-3z" />
  ),
  chevronDown: <path d="M6 9l6 6 6-6" />,
  chevronLeft: <path d="M15 5l-7 7 7 7" />,
  chevronRight: <path d="M9 5l7 7-7 7" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  expand: <path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" />,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof paths;

interface IconProps {
  name: IconName;
  className?: string;
}

/** Decorative icon: always paired with visible text or an accessible name on its control. */
export default function Icon({ name, className }: IconProps) {
  return (
    <svg
      className={className ? `icon ${className}` : "icon"}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
