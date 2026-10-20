import { getTranslations } from "next-intl/server";

import Eyebrow from "@/components/ui/Eyebrow/Eyebrow";
import Icon from "@/components/ui/Icon/Icon";
import Section from "@/components/ui/Section/Section";
import { services } from "@/content/services";
import type { Locale } from "@/i18n/routing";

interface ServicesProps {
  locale: Locale;
}

/** "What I do": four service cards. */
export default async function Services({ locale }: ServicesProps) {
  const t = await getTranslations({ locale, namespace: "Services" });

  return (
    <Section id="what" labelledBy="what-title">
      <Eyebrow>{t("eyebrow")}</Eyebrow>
      <h2 id="what-title">{t("title")}</h2>

      <ul className="services">
        {services.map((service) => (
          <li key={service.id} className="service-card">
            <span className={`service-card__icon service-card__icon--${service.tint}`}>
              <Icon name={service.icon} />
            </span>
            <h3>{t(`items.${service.id}.title`)}</h3>
            <p>{t(`items.${service.id}.body`)}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
