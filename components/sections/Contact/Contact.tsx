import { getTranslations } from "next-intl/server";

import ContactForm, { type ContactFormCopy } from "@/components/contact/ContactForm/ContactForm";
import Eyebrow from "@/components/ui/Eyebrow/Eyebrow";
import Icon from "@/components/ui/Icon/Icon";
import Section from "@/components/ui/Section/Section";
import { profile, socialLinks } from "@/content/profile";
import type { Locale } from "@/i18n/routing";
import { contactRules, type ContactField } from "@/lib/contact/validation";

interface ContactProps {
  locale: Locale;
}

/** Contact: direct channels on the left, the message form on the right. */
export default async function Contact({ locale }: ContactProps) {
  const t = await getTranslations({ locale, namespace: "Contact" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });
  const whatsapp = socialLinks.find((link) => link.network === "whatsapp");

  // Every field gets the full set of messages; "invalid" only ever applies to email.
  const fieldErrors = (field: ContactField, required: string) => ({
    required,
    invalid: t("form.errors.emailInvalid"),
    tooShort: t("form.errors.tooShort", { min: contactRules[field].min }),
    tooLong: t("form.errors.tooLong", { max: contactRules[field].max }),
  });
  const copy: ContactFormCopy = {
    formLabel: t("form.label"),
    labels: {
      name: t("form.name"),
      email: t("form.email"),
      subject: t("form.subject"),
      message: t("form.message"),
    },
    submit: t("form.submit"),
    sending: t("form.sending"),
    trap: t("form.trap"),
    success: t("form.success"),
    invalid: t("form.invalid"),
    error: t.rich("form.error", {
      email: () => <a href={`mailto:${profile.email}`}>{profile.email}</a>,
    }),
    errors: {
      name: fieldErrors("name", t("form.errors.nameRequired")),
      email: fieldErrors("email", t("form.errors.emailRequired")),
      subject: fieldErrors("subject", t("form.errors.subjectRequired")),
      message: fieldErrors("message", t("form.errors.messageRequired", { min: contactRules.message.min })),
    },
  };

  return (
    <Section id="contact" labelledBy="contact-title" className="contact">
      <div className="contact__layout">
        <div>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="contact-title">{t("title")}</h2>
          <p className="lead">{t("lead")}</p>

          <ul className="contact__channels" aria-label={t("channelsLabel")}>
            <li>
              <a href={`mailto:${profile.email}`}>
                <Icon name="mail" />
                {profile.email}
              </a>
            </li>
            {whatsapp && (
              <li>
                <a href={whatsapp.href} target="_blank" rel="noopener noreferrer">
                  <Icon name="phone" />
                  {profile.phone}
                  <span className="visually-hidden">
                    {" "}
                    {t("whatsapp")} ({tCommon("newTab")})
                  </span>
                </a>
              </li>
            )}
          </ul>
        </div>

        <ContactForm locale={locale} copy={copy} />
      </div>
    </Section>
  );
}
