"use client";

import type { PointerEvent } from "react";

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

function handleButtonRipple(event: PointerEvent<HTMLAnchorElement>) {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();

  const ripple = document.createElement("span");
  ripple.className = "ui-button__ripple";

  const size = Math.max(rect.width, rect.height) * 1.2;
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  button.appendChild(ripple);

  window.setTimeout(() => {
    ripple.remove();
  }, 500);
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
        <a
          key={contact.label}
          href={contact.href}
          onPointerDown={handleButtonRipple}
          className={[
            "ui-button",
            `ui-button--${contact.variant}`,
            "ui-button--m",
            "ui-button--default",
          ].join(" ")}
          target={
            contact.href.startsWith("http://") || contact.href.startsWith("https://")
              ? "_blank"
              : undefined
          }
          rel={
            contact.href.startsWith("http://") || contact.href.startsWith("https://")
              ? "noreferrer noopener"
              : undefined
          }
        >
          {contact.label}
        </a>
      ))}
    </StaggerReveal>
  );

  const content = (
    <div className="section-content contacts-section__content">
      <Reveal variant="title">
        <h2 className="contacts-section__title text-large-title">
          {resolvedTitle}
        </h2>
      </Reveal>

      {actions}
    </div>
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
          {content}
        </div>
      </InViewClass>
    );
  }

  return (
    <div id="contacts">
      <ContentSection label={t.sections.contacts}>
        {content}
      </ContentSection>
    </div>
  );
}