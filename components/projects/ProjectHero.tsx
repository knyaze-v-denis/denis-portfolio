"use client";

import Image from "next/image";
import InViewClass from "@/components/motion/InViewClass";
import Reveal from "@/components/motion/Reveal";
import ExternalLink from "@/components/ui/ExternalLink";
import { useTranslations } from "@/lib/i18n/useTranslations";

export type ProjectHeroFieldKey =
  | "client"
  | "domain"
  | "timeline"
  | "role"
  | "links";

export type ProjectHeroLink = {
  label: string;
  href: string;
};

export type ProjectHeroField = {
  key: ProjectHeroFieldKey;
  value?: string;
  links?: ProjectHeroLink[];
};

export type ProjectHeroProps = {
  title: string;
  cover: string;
  description: string;
  fields: ProjectHeroField[];
};

export default function ProjectHero({
  title,
  cover,
  description,
  fields,
}: ProjectHeroProps) {
  const { t, locale } = useTranslations();

  const fieldLabels: Record<ProjectHeroFieldKey, string> = {
    client: t.projectHero.client,
    domain: t.projectHero.domain,
    timeline: t.projectHero.timeline,
    role: t.projectHero.role,
    links: t.projectHero.links,
  };

  return (
    <InViewClass
      key={locale}
      as="section"
      className="section-frame project-hero"
      threshold={0.2}
    >
      <div className="project-hero__inner">
        <Reveal variant="image" threshold={0.01}>
          <div className="project-hero__cover">
            <Image
              src={cover}
              alt={title}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 640px"
              className="project-hero__cover-image"
            />
          </div>
        </Reveal>

        <div className="project-hero__info">
          <Reveal key={`${locale}-project-title`} variant="title" delay={75}>
            <h1 className="project-hero__title">{title}</h1>
          </Reveal>

          <div className="project-hero__info-content">
            <div className="project-hero__fields">
              {fields.map((field, index) => (
                <Reveal
                  key={`${locale}-${field.key}`}
                  variant="body"
                  delay={150 + index * 75}
                >
                  <div className="project-hero__field">
                    <div className="project-hero__field-label">
                      {fieldLabels[field.key]}
                    </div>

                    <div className="project-hero__field-value">
                      {field.value && <span>{field.value}</span>}

                      {field.links && (
                        <div className="project-hero__links">
                          {field.links.map((link) => (
                            <ExternalLink
                              key={link.href}
                              href={link.href}
                              variant="primary"
                            >
                              {link.label}
                            </ExternalLink>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal
              key={`${locale}-project-description`}
              variant="body"
              delay={300}
            >
              <p className="project-hero__description">{description}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </InViewClass>
  );
}