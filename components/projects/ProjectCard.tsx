"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import ProjectTag, {
  type ProjectTagVariant,
} from "@/components/projects/ProjectTag";

export type ProjectCardTag = {
  label: string;
  variant?: ProjectTagVariant;
};

export type ProjectCardProps = {
  title: string;
  description: string;
  cover: string;
  href: string;
  tags: ProjectCardTag[];
};

export default function ProjectCard({
  title,
  description,
  cover,
  href,
  tags,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);

  const params = useParams<{ locale?: string }>();
  const pathname = usePathname();
  const localeFromParams =
    params?.locale === "en" ? "en" : params?.locale === "ru" ? "ru" : null;
  const localeFromPathname =
    pathname?.startsWith("/en") ? "en" : pathname?.startsWith("/ru") ? "ru" : null;
  const locale = localeFromParams ?? localeFromPathname ?? "ru";
  const isAlreadyLocalized = /^\/(ru|en)(\/|$)/.test(href);
  const localizedHref =
    href.startsWith("/") && !isAlreadyLocalized ? `/${locale}${href}` : href;

  function handlePointerDown(event: React.PointerEvent<HTMLAnchorElement>) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;

    const ripple = document.createElement("span");
    ripple.className = "ui-button__ripple";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    card.appendChild(ripple);

    ripple.addEventListener(
      "animationend",
      () => {
        ripple.remove();
      },
      { once: true }
    );
  }

  return (
    <Link
      ref={cardRef}
      href={localizedHref}
      onPointerDown={handlePointerDown}
      className="ui-project-card"
    >
      <div className="ui-project-card__inner">
        <div className="ui-project-card__cover">
          <Image
            src={cover}
            alt={title}
            fill
            sizes="240px"
            className="ui-project-card__image"
          />
        </div>

        <div className="ui-project-card__content">
          <div className="ui-project-card__top">
            <h3 className="ui-project-card__title">{title}</h3>

            <div className="ui-project-card__tags">
              {tags?.map((tag) => (
                <ProjectTag key={`${title}-${tag.label}`} variant={tag.variant}>
                  {tag.label}
                </ProjectTag>
              ))}
            </div>
          </div>

          <p className="ui-project-card__description">{description}</p>
        </div>
      </div>
    </Link>
  );
}