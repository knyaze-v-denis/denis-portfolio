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
import { projectsQuery } from "@/sanity/lib/queries";
import { mapSanityProjectsToCards } from "@/sanity/lib/mappers";

export default async function HomePage() {
  const projects = await client.fetch(projectsQuery);
  const projectCards = mapSanityProjectsToCards(projects ?? []);

  return (
    <div className="site-root">
      <Header />

      <PageLayout>
        <HeroSection />
        <SectionDivider />

        <SkillsSection />
        <SectionDivider />

        <ProjectsSection projects={projectCards} />
        <SectionDivider />

        <WorkExperienceSection />
        <SectionDivider />

        <EducationSection />
        <SectionDivider />

        <ContactsSection />
      </PageLayout>

      <Footer />
    </div>
  );
}