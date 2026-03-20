import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageLayout from "@/components/layout/PageLayout";
import SectionDivider from "@/components/layout/SectionDivider";
import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import WorkExperienceSection from "@/components/timeline/WorkExperienceSection";
import EducationSection from "@/components/timeline/EducationSection";
import ContactsSection from "@/components/sections/ContactsSection";
import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";
import { mapSanityHomepageToHomepageData } from "@/sanity/lib/mappers";

export default async function HomePage() {
  const homepageDocument = await client.fetch(homepageQuery);
  const homepage = homepageDocument
    ? mapSanityHomepageToHomepageData(homepageDocument)
    : null;

  const sectionMap: Record<string, React.ReactNode> = {
    skills: <SkillsSection skillGroups={homepage?.skills} />,
    projects: <ProjectsSection projects={homepage?.homepageProjects} />,
    workExperience: (
      <WorkExperienceSection items={homepage?.workExperience} />
    ),
    education: <EducationSection items={homepage?.education} />,
  };

  const middleSections =
    homepage?.middleSectionsOrder?.filter((sectionKey) => sectionMap[sectionKey]) ??
    ["skills", "projects", "workExperience", "education"];

  return (
    <div className="site-root">
      <Header />

      <PageLayout>
        <HeroSection
          imageSrc={homepage?.hero.imageSrc}
          role={homepage?.hero.role}
          contacts={homepage?.hero.contacts}
          about={homepage?.hero.about}
        />
        <SectionDivider />

        {middleSections.map((sectionKey) => (
          <div key={sectionKey}>
            {sectionMap[sectionKey]}
            <SectionDivider />
          </div>
        ))}

        <ContactsSection
          title={homepage?.contacts.title}
          buttons={homepage?.contacts.buttons}
        />
      </PageLayout>

      <Footer />
    </div>
  );
}