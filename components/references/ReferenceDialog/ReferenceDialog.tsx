import { getTranslations } from "next-intl/server";

import Button from "@/components/ui/Button/Button";
import Dialog from "@/components/ui/Dialog/Dialog";
import ExternalLink from "@/components/ui/ExternalLink/ExternalLink";
import { referenceDialogId } from "@/components/references/ReferenceCard/ReferenceCard";
import { translatedFrom, type references } from "@/content/references";
import type { Locale } from "@/i18n/routing";

interface ReferenceDialogProps {
  locale: Locale;
  reference: (typeof references)[number];
}

/** The full reference, with where to read or request the original. */
export default async function ReferenceDialog({ locale, reference }: ReferenceDialogProps) {
  const t = await getTranslations({ locale, namespace: "References" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });
  const item = `items.${reference.id}` as const;
  const source = translatedFrom(reference, locale);

  return (
    <Dialog
      id={referenceDialogId(reference.id)}
      label={t("dialogLabel", { name: reference.name })}
      closeLabel={tCommon("close")}
      className="reference-dialog"
    >
      <figure className="reference-dialog__panel">
        <blockquote>
          <p>{t(`${item}.full`)}</p>
        </blockquote>
        {source && <p className="reference-dialog__note">{t("translatedFrom", { language: source })}</p>}
        <figcaption>
          <ExternalLink href={reference.url}>{reference.name}</ExternalLink>
          <small>{t(`${item}.detail`)}</small>
        </figcaption>
        {"linkedInRecommendation" in reference ? (
          <Button
            variant="secondary"
            glyph="external"
            href={reference.linkedInRecommendation}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("viewOnLinkedIn")}
            <span className="visually-hidden"> ({tCommon("newTab")})</span>
          </Button>
        ) : (
          <p className="reference-dialog__letter">{t("letterOnRequest")}</p>
        )}
      </figure>
    </Dialog>
  );
}
