"use client";

import Image from "next/image";
import InViewClass from "@/components/motion/InViewClass";
import Reveal from "@/components/motion/Reveal";
import ExternalLink from "@/components/ui/ExternalLink";
import { useTranslations } from "@/lib/i18n/useTranslations";

export default function HeroSection() {
  const { t, locale } = useTranslations();

  const contactLinks = [
    {
      label: "knyaze.v.denis@yandex.ru",
      href: "mailto:knyaze.v.denis@yandex.ru",
    },
    {
      label: "t.me/knyaze_v_denis",
      href: "https://t.me/knyaze_v_denis",
    },
  ];

  return (
    <InViewClass
      key={locale}
      as="section"
      className="section-frame hero-shell"
      threshold={0.2}
    >
      <div className="flex flex-col gap-[var(--space-4)] md:flex-row md:items-start">
        <Reveal
            variant="image"
            threshold={0.01}
            className="inline-block w-fit self-start"
            >
            <div className="relative h-[10rem] w-[10rem] flex-shrink-0 overflow-hidden rounded-[var(--radius-sm)]">
              <Image
                src="/images/profile-photo.png"
                alt={t.hero.name}
                fill
                sizes="160px"
                priority
                className="object-cover"
              />
            </div>
          </Reveal>

        <div className="flex flex-col gap-[var(--space-10)] md:min-h-[10rem] md:flex-1 md:justify-between md:gap-0">
          <div className="flex flex-col gap-[var(--space-1)]">
            <Reveal key={`${locale}-hero-name`} variant="title">
              <h1 className="text-title-2 text-caps tracking-[-0.01em]">
                {t.hero.name}
              </h1>
            </Reveal>

            <Reveal key={`${locale}-hero-role`} variant="title" delay={75}>
              <p className="text-title-2 text-caps text-[var(--color-foreground-primary)]">
                {t.hero.role}
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-[var(--space-1)]">
            {contactLinks.map((link, index) => (
              <Reveal key={link.label} variant="body" delay={150 + index * 75}>
                <ExternalLink href={link.href} variant="secondary">
                  {link.label}
                </ExternalLink>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Reveal key={`${locale}-hero-about`} variant="title" delay={225}>
        <p className="max-w-[40rem] text-large-title tracking-[-0.02em] text-[var(--color-foreground-primary)]">
          {t.hero.about}
        </p>
      </Reveal>
    </InViewClass>
  );
}