import { getTranslations } from "next-intl/server";

import { socialLinks, type SocialNetwork } from "@/content/profile";
import type { Locale } from "@/i18n/routing";

// Filled brand marks, unlike the stroke icons in Icon.
const brandPaths: Record<SocialNetwork, string> = {
  github:
    "M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z",
  email: "M2 5h20v14H2zm2 2v.5l8 5.5 8-5.5V7zm16 3-8 5.5L4 10v7h16z",
  whatsapp:
    "M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.2 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.6c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.4.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.8.9c.3.1.4.2.5.3.1.2.1.8-.1 1.4z",
  linkedin:
    "M4.5 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3 9h3.1v12H3zm5.5 0h3v1.7c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.1 2.4 4.1 5.4V21h-3.1v-5.8c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V21H8.5z",
};

interface SocialRailProps {
  locale: Locale;
}

/** Fixed column of profile links at the bottom left (tablet and desktop). */
export default async function SocialRail({ locale }: SocialRailProps) {
  const t = await getTranslations({ locale, namespace: "Footer" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  return (
    <aside className="social-rail" aria-label={t("linksLabel")}>
      <ul>
        {socialLinks.map((link) => {
          const name = link.network === "email" ? t("email") : link.label;
          return (
            <li key={link.network}>
              <a
                href={link.href}
                aria-label={link.external ? `${name} (${tCommon("newTab")})` : name}
                {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d={brandPaths[link.network]} />
                </svg>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
