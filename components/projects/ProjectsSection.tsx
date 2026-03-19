"use client";

import Reveal from "@/components/motion/Reveal";
import ContentSection from "@/components/sections/ContentSection";
import ProjectCard from "@/components/projects/ProjectCard";
import { useTranslations } from "@/lib/i18n/useTranslations";

export default function ProjectsSection() {
  const { t } = useTranslations();

  return (
    <ContentSection label={t.sections.projects}>
      <div className="flex flex-col gap-[var(--space-6)]">
        {t.projects.items.map((project) => (
          <Reveal key={project.title} variant="card">
            <ProjectCard {...project} />
          </Reveal>
        ))}
      </div>
    </ContentSection>
  );
}