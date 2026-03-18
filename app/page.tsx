import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <>
      <Header />

      <PageLayout>
        <HeroSection />
      </PageLayout>

      <Footer />
    </>
  );
}