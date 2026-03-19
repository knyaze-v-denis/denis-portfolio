"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import InViewClass from "@/components/motion/InViewClass";
import Reveal from "@/components/motion/Reveal";
import { useTranslations } from "@/lib/i18n/useTranslations";
import {
  getProjectNavigationData,
} from "@/lib/projects/project-navigation";
import type { DemoProjectSlug } from "@/lib/projects/demo-project";

type ProjectNavigationProps = {
  slug: DemoProjectSlug;
};

type NavigationButtonProps = {
  direction: "previous" | "next";
  href: string;
  title: string;
};

function createRipple(
  event: React.PointerEvent<HTMLAnchorElement>
) {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();

  const ripple = document.createElement("span");
  ripple.className = "project-nav-button__ripple";

  const size = Math.max(rect.width, rect.height);
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left}px`;
  ripple.style.top = `${event.clientY - rect.top}px`;

  button.appendChild(ripple);

  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
}

function NavigationButton({
  direction,
  href,
  title,
}: NavigationButtonProps) {
  const { t } = useTranslations();

  const isPrevious = direction === "previous";

  return (
    <Link
      href={href}
      className={`project-nav-button project-nav-button--${direction}`}
      onPointerDown={createRipple}
    >
      {isPrevious && (
        <ChevronLeft className="project-nav-button__icon" size={24} />
      )}

      <span className="project-nav-button__content project-nav-button__content--desktop">
        <span className="project-nav-button__label">
          {isPrevious
            ? t.projectNavigation.previousProject
            : t.projectNavigation.nextProject}
        </span>

        <span className="project-nav-button__title">{title}</span>
      </span>

      <span className="project-nav-button__content project-nav-button__content--mobile">
        <span className="project-nav-button__mobile-text">
          {isPrevious ? t.projectNavigation.back : t.projectNavigation.forward}
        </span>
      </span>

      {!isPrevious && (
        <ChevronRight className="project-nav-button__icon" size={24} />
      )}
    </Link>
  );
}

export default function ProjectNavigation({
  slug,
}: ProjectNavigationProps) {
  const { t, locale } = useTranslations();

  const navigation = getProjectNavigationData(slug, t);

  return (
    <InViewClass
      key={`${locale}-project-navigation`}
      as="section"
      className="section-frame project-navigation"
      threshold={0.2}
    >
      <div className="project-navigation__inner">
        <div className="project-navigation__grid">
          {navigation.previous ? (
            <Reveal key={`${locale}-previous`} variant="card">
              <NavigationButton
                direction="previous"
                href={`/projects/${navigation.previous.slug}`}
                title={navigation.previous.title}
              />
            </Reveal>
          ) : (
            <div
              className="project-nav-button-placeholder"
              aria-hidden="true"
            />
          )}

          {navigation.next ? (
            <Reveal key={`${locale}-next`} variant="card" delay={75}>
              <NavigationButton
                direction="next"
                href={`/projects/${navigation.next.slug}`}
                title={navigation.next.title}
              />
            </Reveal>
          ) : (
            <div
              className="project-nav-button-placeholder"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </InViewClass>
  );
}