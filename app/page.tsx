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

export default function HomePage() {
  return (
    <div className="site-root">
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
    </div>
  );
}