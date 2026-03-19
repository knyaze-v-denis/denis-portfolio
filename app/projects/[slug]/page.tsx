import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageLayout from "@/components/layout/PageLayout";
import ProjectPageContent from "@/components/projects/ProjectPageContent";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const projectMetadata: Record<string, Metadata> = {
  portfolio: {
    title: "Portfolio Website",
    description:
      "Design and development of a personal portfolio website showcasing product design work and case studies.",
  },

  "fitness-app": {
    title: "Fitness App Concept",
    description:
      "Concept of a fitness ecosystem combining workout tracking, nutrition and social features.",
  },

  "analytics-dashboard": {
    title: "Analytics Dashboard",
    description:
      "Concept of a modular analytics dashboard for product teams with flexible metrics and widgets.",
    },
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  return projectMetadata[slug] ?? {};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  return (
    <>
      <Header />

      <PageLayout>
        <ProjectPageContent slug={slug} />
      </PageLayout>

      <Footer />
    </>
  );
}