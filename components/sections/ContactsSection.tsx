"use client";

import Link from "next/link";
import InViewClass from "@/components/motion/InViewClass";
import Reveal from "@/components/motion/Reveal";
import StaggerReveal from "@/components/motion/StaggerReveal";
import ContentSection from "@/components/sections/ContentSection";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { HomepageContactButton } from "@/sanity/lib/mappers";

type ContactsSectionProps = {
  variant?: "home" | "internal";
  title?: string;
  buttons?: HomepageContactButton[];
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function ContactsSection({
  variant = "home",
  title,
  buttons,
}: ContactsSectionProps) {
  const { t, locale } = useTranslations();

  const resolvedTitle = title || t.contacts.title;
  const resolvedButtons =
    buttons && buttons.length > 0 ? buttons : t.contacts.buttons;

  const actions = (
    <StaggerReveal className="contacts-section__actions" step={60} itemAs="div">
      {resolvedButtons.map((contact) => (
        <Link
          key={contact.label}
          href={contact.href}
          className={[
            "ui-button",
            `ui-button--${contact.variant}`,
            "ui-button--m",
            "ui-button--default",
          ].join(" ")}
          target={isExternalHref(contact.href) ? "_blank" : undefined}
          rel={isExternalHref(contact.href) ? "noreferrer noopener" : undefined}
        >
          {contact.label}
        </Link>
      ))}
    </StaggerReveal>
  );

  if (variant === "internal") {
    return (
      <InViewClass
        key={`contacts-internal-${locale}`}
        as="section"
        id="contacts"
        className="section-frame contacts-section contacts-section--grow"
        threshold={0.2}
      >
        <div className="section-shell contacts-section__shell">
          <div className="contacts-section__content">
            <Reveal variant="title">
              <h2 className="contacts-section__title text-large-title">
                {resolvedTitle}
              </h2>
            </Reveal>

            {actions}
          </div>
        </div>
      </InViewClass>
    );
  }

  return (
    <div id="contacts">
      <ContentSection label={t.sections.contacts}>
        <div className="contacts-section__content">
          <Reveal variant="title">
            <h2 className="contacts-section__title text-large-title">
              {resolvedTitle}
            </h2>
          </Reveal>

          {actions}
        </div>
      </ContentSection>
    </div>
  );
}