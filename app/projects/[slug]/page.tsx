import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageLayout from "@/components/layout/PageLayout";
import ProjectPageContent from "@/components/projects/ProjectPageContent";
import { client } from "@/sanity/lib/client";
import {
  projectBySlugQuery,
  projectMetadataBySlugQuery,
  projectNavigationItemsQuery,
} from "@/sanity/lib/queries";
import {
  mapSanityNavigationToProjectNavigation,
  mapSanityProjectToHero,
  mapSanityProjectToSections,
} from "@/sanity/lib/mappers";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type SanityProjectMetadata = {
  title?: string;
  shortDescription?: string;
};

const fallbackMetadata: Record<string, Metadata> = {
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

  const project = await client.fetch<SanityProjectMetadata | null>(
    projectMetadataBySlugQuery,
    { slug }
  );

  if (project?.title) {
    return {
      title: project.title,
      description: project.shortDescription ?? "",
    };
  }

  return fallbackMetadata[slug] ?? {};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const [project, navigationItems] = await Promise.all([
    client.fetch(projectBySlugQuery, { slug }),
    client.fetch(projectNavigationItemsQuery),
  ]);

  if (!project) {
    return (
      <div className="site-root">
        <Header />

        <PageLayout>
          <div className="section-frame">
            <div className="project-section__inner">
              <h1 className="project-section__title">Project not found</h1>
            </div>
          </div>
        </PageLayout>

        <Footer />
      </div>
    );
  }

  const heroData = mapSanityProjectToHero(project);
  const sections = mapSanityProjectToSections(project);
  const navigation = mapSanityNavigationToProjectNavigation(
    navigationItems ?? [],
    slug
  );

  return (
    <div className="site-root">
      <Header />

      <PageLayout>
        <ProjectPageContent
          slug={slug}
          heroData={heroData}
          sections={sections}
          navigation={navigation}
          locale="en"
        />
      </PageLayout>

      <Footer />
    </div>
  );
}