import SectionDivider from "@/components/layout/SectionDivider";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectNavigation from "@/components/projects/ProjectNavigation";
import ProjectSection from "@/components/projects/ProjectSection";
import ContactsSection from "@/components/sections/ContactsSection";
import type { ProjectContentSection } from "@/lib/projects/types";
import type { ProjectHeroProps } from "@/components/projects/ProjectHero";
import type { ProjectNavigationData } from "@/sanity/lib/mappers";
import type { HomepageContactButton } from "@/sanity/lib/mappers";

type ProjectPageContentProps = {
  slug: string;
  heroData: ProjectHeroProps;
  sections: ProjectContentSection[];
  navigation: ProjectNavigationData;
  contactsTitle?: string;
  contactsButtons?: HomepageContactButton[];
  locale: string;
};

export default function ProjectPageContent({
  heroData,
  sections = [],
  navigation,
  contactsTitle,
  contactsButtons,
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

      <ProjectNavigation
        previous={navigation.previous}
        next={navigation.next}
      />
      <SectionDivider />
      <ContactsSection
        variant="internal"
        title={contactsTitle}
        buttons={contactsButtons}
      />
    </>
  );
}