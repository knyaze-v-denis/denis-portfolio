"use client";

import SectionDivider from "@/components/layout/SectionDivider";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectNavigation from "@/components/projects/ProjectNavigation";
import ProjectSection from "@/components/projects/ProjectSection";
import ContactsSection from "@/components/sections/ContactsSection";
import {
  getDemoProjectHero,
  type DemoProjectSlug,
} from "@/lib/projects/demo-project";
import { getDemoProjectSections } from "@/lib/projects/demo-project-content";
import { useTranslations } from "@/lib/i18n/useTranslations";

type ProjectPageContentProps = {
  slug: string;
};

export default function ProjectPageContent({
  slug,
}: ProjectPageContentProps) {
  const { t, locale } = useTranslations();

  const safeSlug: DemoProjectSlug =
    slug === "fitness-app"
      ? "fitness-app"
      : slug === "analytics-dashboard"
        ? "analytics-dashboard"
        : "portfolio";

  const heroData = getDemoProjectHero(safeSlug, t);
  const sections = getDemoProjectSections(safeSlug, locale);

  return (
    <>
      <ProjectHero {...heroData} />
      <SectionDivider />

      {sections.map((section, index) => (
        <div key={`${locale}-${section.id}`}>
          <ProjectSection section={section} />
          {index < sections.length - 1 && <SectionDivider />}
        </div>
      ))}

      <ProjectNavigation slug={safeSlug} />
      <SectionDivider />
      <ContactsSection variant="internal" />
    </>
  );
}