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
  siteSettingsQuery,
} from "@/sanity/lib/queries";
import {
  mapSanityNavigationToProjectNavigation,
  mapSanityProjectToHero,
  mapSanityProjectToSections,
  mapSanitySiteSettingsToSiteSettingsData,
} from "@/sanity/lib/mappers";
import { cookies } from "next/headers";
import type { Locale } from "@/lib/i18n/types";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type SanityProjectMetadata = {
  title?: string;
  shortDescription?: string;
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

  return {};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("locale")?.value;
  const locale: Locale = localeCookie === "ru" ? "ru" : "en";

  const [project, navigationItems, siteSettingsDocument] = await Promise.all([
    client.fetch(projectBySlugQuery, { slug }),
    client.fetch(projectNavigationItemsQuery),
    client.fetch(siteSettingsQuery),
  ]);

  const siteSettings = siteSettingsDocument
    ? mapSanitySiteSettingsToSiteSettingsData(siteSettingsDocument, locale)
    : null;

  if (!project) {
    return (
      <div className="site-root">
        <Header
          personName={siteSettings?.personName}
          personRole={siteSettings?.personRole}
          personPhotoSrc={siteSettings?.personPhotoSrc}
        />

        <PageLayout>
          <div className="section-frame">
            <div className="project-section__inner">
              <h1 className="project-section__title">Project not found</h1>
            </div>
          </div>
        </PageLayout>

        <Footer
          showAside={siteSettings?.footer.showAside}
          asideText={siteSettings?.footer.asideText}
          asideLinkLabel={siteSettings?.footer.asideLinkLabel}
          asideLinkHref={siteSettings?.footer.asideLinkHref}
        />
      </div>
    );
  }

  const heroData = mapSanityProjectToHero(project, locale);
  const sections = mapSanityProjectToSections(project, locale);
  const navigation = mapSanityNavigationToProjectNavigation(
    navigationItems ?? [],
    slug,
    locale
  );

  return (
    <div className="site-root">
      <Header
        personName={siteSettings?.personName}
        personRole={siteSettings?.personRole}
        personPhotoSrc={siteSettings?.personPhotoSrc}
      />

      <PageLayout>
        <ProjectPageContent
          slug={slug}
          heroData={heroData}
          sections={sections}
          navigation={navigation}
          locale={locale}
        />
      </PageLayout>

      <Footer
        showAside={siteSettings?.footer.showAside}
        asideText={siteSettings?.footer.asideText}
        asideLinkLabel={siteSettings?.footer.asideLinkLabel}
        asideLinkHref={siteSettings?.footer.asideLinkHref}
      />
    </div>
  );
}