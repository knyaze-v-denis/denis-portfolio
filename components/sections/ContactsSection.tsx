"use client";

import Reveal from "@/components/motion/Reveal";
import StaggerReveal from "@/components/motion/StaggerReveal";
import ContentSection from "@/components/sections/ContentSection";
import Button from "@/components/ui/Button";
import { useTranslations } from "@/lib/i18n/useTranslations";

export default function ContactsSection() {
  const { t, locale } = useTranslations();

  return (
    <ContentSection key={locale} id="contacts" label={t.sections.contacts}>
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