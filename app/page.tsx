import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageLayout from "@/components/layout/PageLayout";
import SectionDivider from "@/components/layout/SectionDivider";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ContactsSection from "@/components/sections/ContactsSection";
import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import EducationSection from "@/components/timeline/EducationSection";
import WorkExperienceSection from "@/components/timeline/WorkExperienceSection";

export default function Home() {
  return (
    <>
      <Header />

      <PageLayout>
        <HeroSection />
        <SectionDivider />

        <SkillsSection />
        <SectionDivider />

        <ProjectsSection />
        <SectionDivider />

        <WorkExperienceSection />
        <SectionDivider />

        <EducationSection />
        <SectionDivider />

        <ContactsSection />
      </PageLayout>

      <Footer />
    </>
  );
}