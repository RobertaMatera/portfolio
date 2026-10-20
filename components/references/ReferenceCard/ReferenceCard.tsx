import { getTranslations } from "next-intl/server";

import DialogTrigger from "@/components/ui/DialogTrigger/DialogTrigger";
import ExternalLink from "@/components/ui/ExternalLink/ExternalLink";
import { aboutLinks } from "@/content/about";
import { translatedFrom, type references } from "@/content/references";
import type { Locale } from "@/i18n/routing";

interface ReferenceCardProps {
  locale: Locale;
  reference: (typeof references)[number];
}

export const referenceDialogId = (id: string) => `reference-${id}`;

/** Short quote with its author; the full text opens in a dialog. */
export default async function ReferenceCard({ locale, reference }: ReferenceCardProps) {
  const t = await getTranslations({ locale, namespace: "References" });
  const item = `items.${reference.id}` as const;
  const source = translatedFrom(reference, locale);

  return (
    <li className={`reference reference--${reference.accent}`}>
      <figure>
        <blockquote>
          <p>{t(`${item}.short`)}</p>
        </blockquote>
        <figcaption>
          <span className="reference__name">
            <ExternalLink href={reference.url}>{reference.name}</ExternalLink>
            {"linkedInRecommendation" in reference && (
              <span className="reference__badge">
                <span aria-hidden="true">in</span> LinkedIn
                <span className="visually-hidden"> ({t("linkedInBadge")})</span>
              </span>
            )}
          </span>
          <small>
            {t.rich(`${item}.role`, {
              poliba: (chunks) => <ExternalLink href={aboutLinks.poliba[locale]}>{chunks}</ExternalLink>,
            })}
            {source && ` · ${t("translatedFrom", { language: source })}`}
          </small>
        </figcaption>
      </figure>

      <DialogTrigger dialogId={referenceDialogId(reference.id)} className="reference__more">
        {t("readMore")}
        <span className="visually-hidden">: {reference.name}</span>
        <span aria-hidden="true"> →</span>
      </DialogTrigger>
    </li>
  );
}
