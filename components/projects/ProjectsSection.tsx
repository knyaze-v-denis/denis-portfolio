"use client";

import Reveal from "@/components/motion/Reveal";
import ContentSection from "@/components/sections/ContentSection";
import ProjectCard, {
  type ProjectCardProps,
} from "@/components/projects/ProjectCard";
import { useTranslations } from "@/lib/i18n/useTranslations";

type ProjectsSectionProps = {
  projects?: ProjectCardProps[];
};

export default function ProjectsSection({
  projects = [],
}: ProjectsSectionProps) {
  const { t, locale } = useTranslations();

  const fallbackProjects = t.projects.items.map((project) => ({
    title: project.title,
    description: project.description,
    cover: project.cover,
    href: project.href,
    tags: project.tags,
  }));

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  return (
    <ContentSection label={t.sections.projects}>
      <div className="section-content">
        {displayProjects.map((project, index) => (
          <Reveal
            key={`${locale}-${project.href}-${index}`}
            variant="card"
            delay={index * 80}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              cover={project.cover}
              href={project.href}
              tags={project.tags}
            />
          </Reveal>
        ))}
      </div>
    </ContentSection>
  );
}