"use client";

import InViewClass from "@/components/motion/InViewClass";
import Reveal from "@/components/motion/Reveal";
import StaggerReveal from "@/components/motion/StaggerReveal";
import ContentSection from "@/components/sections/ContentSection";
import Button from "@/components/ui/Button";
import { useTranslations } from "@/lib/i18n/useTranslations";

type ContactsSectionProps = {
  variant?: "home" | "internal";
};

export default function ContactsSection({
  variant = "home",
}: ContactsSectionProps) {
  const { t, locale } = useTranslations();

  const actions = (
    <StaggerReveal
      as="div"
      className="contacts-section__actions"
      step={60}
      itemAs="div"
    >
      {t.contacts.buttons.map((contact) => (
        <Button
          key={contact.label}
          href={contact.href}
          variant={contact.variant}
          size="m"
        >
          {contact.label}
        </Button>
      ))}
    </StaggerReveal>
  );

  if (variant === "internal") {
    return (
      <InViewClass
        key={`contacts-internal-${locale}`}
        as="section"
        className="section-frame contacts-section contacts-section--grow"
        threshold={0.2}
      >
        <div className="section-shell contacts-section__shell">
          <div className="contacts-section__content">
            <Reveal variant="title">
              <h2 className="contacts-section__title text-large-title">
                {t.contacts.title}
              </h2>
            </Reveal>

            {actions}
          </div>
        </div>
      </InViewClass>
    );
  }

  return (
    <ContentSection label={t.sections.contacts}>
      <div className="contacts-section__content">
        <Reveal variant="title">
          <h2 className="contacts-section__title text-large-title">
            {t.contacts.title}
          </h2>
        </Reveal>

        {actions}
      </div>
    </ContentSection>
  );
}