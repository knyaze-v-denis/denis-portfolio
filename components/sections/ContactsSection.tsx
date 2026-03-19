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

  if (variant === "internal") {
    return (
      <InViewClass
        as="section"
        id="contacts"
        className="section-frame"
        threshold={0.2}
      >
        <div className="section-shell">
          <Reveal key={`${locale}-contacts-title`} variant="title">
            <h2 className="text-large-title text-[var(--color-foreground-primary)]">
              {t.contacts.title}
            </h2>
          </Reveal>

          <StaggerReveal
            key={`${locale}-contacts-buttons`}
            variant="tag"
            step={75}
            threshold={0.2}
            className="flex flex-wrap gap-[var(--space-4)]"
            itemAs="span"
          >
            {t.contacts.buttons.map((contact) => (
              <a key={contact.label} href={contact.href}>
                <Button
                  variant={contact.variant}
                  size="m"
                  buttonStyle="default"
                >
                  {contact.label}
                </Button>
              </a>
            ))}
          </StaggerReveal>
        </div>
      </InViewClass>
    );
  }

  return (
    <ContentSection id="contacts" label={t.sections.contacts}>
      <Reveal key={`${locale}-contacts-title`} variant="title">
        <h2 className="text-large-title text-[var(--color-foreground-primary)]">
          {t.contacts.title}
        </h2>
      </Reveal>

      <StaggerReveal
        key={`${locale}-contacts-buttons`}
        variant="tag"
        step={75}
        threshold={0.2}
        className="flex flex-wrap gap-[var(--space-4)]"
        itemAs="span"
      >
        {t.contacts.buttons.map((contact) => (
          <a key={contact.label} href={contact.href}>
            <Button variant={contact.variant} size="m" buttonStyle="default">
              {contact.label}
            </Button>
          </a>
        ))}
      </StaggerReveal>
    </ContentSection>
  );
}