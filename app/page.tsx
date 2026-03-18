import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageLayout from "@/components/layout/PageLayout";
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
        <div className="section-divider" />

        <SkillsSection />
        <div className="section-divider" />

        <ProjectsSection />
        <div className="section-divider" />

        <WorkExperienceSection />
        <div className="section-divider" />

        <EducationSection />
        <div className="section-divider" />

        <ContactsSection />
      </PageLayout>

      <Footer />
    </>
  );
}