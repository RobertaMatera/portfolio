import { getTranslations } from "next-intl/server";

import ReferenceCard from "@/components/references/ReferenceCard/ReferenceCard";
import ReferenceDialog from "@/components/references/ReferenceDialog/ReferenceDialog";
import Eyebrow from "@/components/ui/Eyebrow/Eyebrow";
import Section from "@/components/ui/Section/Section";
import { references } from "@/content/references";
import type { Locale } from "@/i18n/routing";

interface ReferencesProps {
  locale: Locale;
}

/** Testimonials: four quote cards, each opening the full reference. */
export default async function References({ locale }: ReferencesProps) {
  const t = await getTranslations({ locale, namespace: "References" });

  return (
    <Section id="references" labelledBy="references-title" alt>
      <Eyebrow>{t("eyebrow")}</Eyebrow>
      <h2 id="references-title">{t("title")}</h2>

      <ul className="references">
        {references.map((reference) => (
          <ReferenceCard key={reference.id} locale={locale} reference={reference} />
        ))}
      </ul>

      {references.map((reference) => (
        <ReferenceDialog key={reference.id} locale={locale} reference={reference} />
      ))}
    </Section>
  );
}
