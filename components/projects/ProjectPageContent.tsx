import SectionDivider from "@/components/layout/SectionDivider";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectNavigation from "@/components/projects/ProjectNavigation";
import ProjectSection from "@/components/projects/ProjectSection";
import ContactsSection from "@/components/sections/ContactsSection";
import type { DemoProjectSlug } from "@/lib/projects/demo-project";
import type { ProjectContentSection } from "@/lib/projects/types";
import type { ProjectHeroProps } from "@/components/projects/ProjectHero";

type ProjectPageContentProps = {
  slug: string;
  heroData: ProjectHeroProps;
  sections: ProjectContentSection[];
  navigationSlug: DemoProjectSlug;
  locale: string;
};

export default function ProjectPageContent({
  heroData,
  sections = [],
  navigationSlug,
  locale,
}: ProjectPageContentProps) {
  return (
    <>
      <ProjectHero {...heroData} />
      <SectionDivider />

      {sections.length > 0 &&
        sections.map((section, index) => (
          <div key={`${locale}-${section.id}`}>
            <ProjectSection section={section} />
            {index < sections.length - 1 && <SectionDivider />}
          </div>
        ))}

      <ProjectNavigation slug={navigationSlug} />
      <SectionDivider />
      <ContactsSection variant="internal" />
    </>
  );
}