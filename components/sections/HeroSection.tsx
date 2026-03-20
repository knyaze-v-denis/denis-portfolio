"use client";

import Image from "next/image";
import InViewClass from "@/components/motion/InViewClass";
import Reveal from "@/components/motion/Reveal";
import ExternalLink from "@/components/ui/ExternalLink";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { HomepageHeroContact } from "@/sanity/lib/mappers";

type HeroSectionProps = {
  imageSrc?: string;
  role?: string;
  contacts?: HomepageHeroContact[];
  about?: string;
};

export default function HeroSection({
  imageSrc,
  role,
  contacts,
  about,
}: HeroSectionProps) {
  const { t, locale } = useTranslations();

  const resolvedContacts =
    contacts && contacts.length > 0
      ? contacts
      : [
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
      key={`hero-${locale}`}
      as="section"
      className="section-frame hero-section"
      threshold={0.2}
    >
      <div className="hero-shell">
        <div className="hero-section__top">
          <Reveal variant="image">
            <div className="hero-section__photo">
              <Image
                src={imageSrc || "/images/profile-photo.png"}
                alt={t.hero.name}
                fill
                sizes="160px"
                className="hero-section__photo-image"
              />
            </div>
          </Reveal>

          <div className="hero-section__side">
            <Reveal variant="title" delay={40}>
              <div className="hero-section__heading">
                <h1 className="hero-section__name text-title-2-caps">
                  {t.hero.name}
                </h1>
                <p className="hero-section__role text-title-2-caps">
                  {role || t.hero.role}
                </p>
              </div>
            </Reveal>

            <Reveal variant="body" delay={80}>
              <div className="hero-section__links">
                {resolvedContacts.map((link, index) => (
                  <ExternalLink
                    key={`${link.label}-${index}`}
                    href={link.href}
                    variant="secondary"
                  >
                    {link.label}
                  </ExternalLink>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal variant="title" delay={120}>
          <p className="hero-section__about text-large-title">
            {about || t.hero.about}
          </p>
        </Reveal>
      </div>
    </InViewClass>
  );
}