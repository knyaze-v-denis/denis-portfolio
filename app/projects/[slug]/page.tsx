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
    openGraph: {
      images: [
        {
          url: "/og/portfolio-og.jpg",
          width: 1200,
          height: 630,
          alt: "Portfolio Website project preview",
        },
      ],
    },
    twitter: {
      images: ["/og/portfolio-og.jpg"],
    },
  },

  "fitness-app": {
    title: "Fitness App Concept",
    description:
      "Concept of a fitness ecosystem combining workout tracking, nutrition and social features.",
    openGraph: {
      images: [
        {
          url: "/og/fitness-og.jpg",
          width: 1200,
          height: 630,
          alt: "Fitness App Concept project preview",
        },
      ],
    },
    twitter: {
      images: ["/og/fitness-og.jpg"],
    },
  },

  "analytics-dashboard": {
    title: "Analytics Dashboard",
    description:
      "Concept of a modular analytics dashboard for product teams with flexible metrics and widgets.",
    openGraph: {
      images: [
        {
          url: "/og/analytics-og.jpg",
          width: 1200,
          height: 630,
          alt: "Analytics Dashboard project preview",
        },
      ],
    },
    twitter: {
      images: ["/og/analytics-og.jpg"],
    },
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