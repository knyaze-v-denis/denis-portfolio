"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import InViewClass from "@/components/motion/InViewClass";
import Reveal from "@/components/motion/Reveal";
import { useTranslations } from "@/lib/i18n/useTranslations";

type NavigationItem = {
  title: string;
  href: string;
};

type ProjectNavigationProps = {
  previous: NavigationItem | null;
  next: NavigationItem | null;
};

type NavigationButtonProps = {
  direction: "previous" | "next";
  href: string;
  title: string;
};

function createRipple(event: React.PointerEvent<HTMLAnchorElement>) {
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
      className="project-nav-button"
      onPointerDown={createRipple}
    >
      {isPrevious ? (
        <ChevronLeft className="project-nav-button__icon" size={24} />
      ) : null}

      <div className="project-nav-button__content project-nav-button__content--desktop">
        <span className="project-nav-button__label">
          {isPrevious
            ? t.projectNavigation.previousProject
            : t.projectNavigation.nextProject}
        </span>
        <span className="project-nav-button__title">{title}</span>
      </div>

      <div className="project-nav-button__content project-nav-button__content--mobile">
        <span className="project-nav-button__mobile-text">
          {isPrevious ? t.projectNavigation.back : t.projectNavigation.forward}
        </span>
      </div>

      {!isPrevious ? (
        <ChevronRight className="project-nav-button__icon" size={24} />
      ) : null}
    </Link>
  );
}

export default function ProjectNavigation({
  previous,
  next,
}: ProjectNavigationProps) {
  const { locale } = useTranslations();

  return (
    <InViewClass
      key={`project-navigation-${locale}`}
      as="section"
      className="section-frame project-navigation"
      threshold={0.2}
    >
      <div className="project-navigation__inner">
        <div className="project-navigation__grid">
          {previous ? (
            <Reveal variant="card">
              <NavigationButton
                direction="previous"
                href={previous.href}
                title={previous.title}
              />
            </Reveal>
          ) : (
            <div className="project-nav-button-placeholder" />
          )}

          {next ? (
            <Reveal variant="card" delay={60}>
              <NavigationButton
                direction="next"
                href={next.href}
                title={next.title}
              />
            </Reveal>
          ) : (
            <div className="project-nav-button-placeholder" />
          )}
        </div>
      </div>
    </InViewClass>
  );
}