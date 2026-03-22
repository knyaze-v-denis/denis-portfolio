import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import type { Locale } from "@/lib/i18n/types";
import { SITE_URL, SUPPORTED_LOCALES } from "../../../layout";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

type SanityProjectMetadata = {
  seoTitle?: { ru?: string; en?: string } | string;
  seoDescription?: { ru?: string; en?: string } | string;
};

type SanitySiteSettingsMetadata = {
  seoTitle?: { ru?: string; en?: string } | string;
  seoDescription?: { ru?: string; en?: string } | string;
};

function pickLocaleValue(
  field: { ru?: string; en?: string } | string | undefined,
  locale: Locale
) {
  if (!field) return undefined;
  if (typeof field === "string") return field;
  return field[locale] ?? field.ru ?? field.en;
}

function resolveLocale(localeFromRoute: string): Locale {
  if ((SUPPORTED_LOCALES as readonly string[]).includes(localeFromRoute)) {
    return localeFromRoute as Locale;
  }

  notFound();
}

function getLocalePrefix(locale: Locale) {
  return `/${locale}`;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug, locale: localeFromRoute } = await params;
  const locale = resolveLocale(localeFromRoute);

  const [project, siteSettingsDocument] = await Promise.all([
    client.fetch<SanityProjectMetadata | null>(projectMetadataBySlugQuery, {
      slug,
    }),
    client.fetch<SanitySiteSettingsMetadata | null>(siteSettingsQuery),
  ]);

  const title =
    pickLocaleValue(project?.seoTitle, locale) ??
    pickLocaleValue(siteSettingsDocument?.seoTitle, locale) ??
    "Denis Knyazev — Product Designer";

  const description =
    pickLocaleValue(project?.seoDescription, locale) ??
    pickLocaleValue(siteSettingsDocument?.seoDescription, locale) ??
    "Product designer focused on UX, interfaces and scalable systems.";

  const ogImageUrl = `${SITE_URL}${getLocalePrefix(locale)}/projects/${slug}/opengraph-image`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug, locale: localeFromRoute } = await params;
  const locale = resolveLocale(localeFromRoute);

  const [project, navigationItems, siteSettingsDocument] = await Promise.all([
    client.fetch(projectBySlugQuery, { slug }),
    client.fetch(projectNavigationItemsQuery),
    client.fetch(siteSettingsQuery),
  ]);

  const siteSettings = siteSettingsDocument
    ? mapSanitySiteSettingsToSiteSettingsData(siteSettingsDocument, locale)
    : null;

  if (!project) {
    notFound();
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
          contactsTitle={siteSettings?.contacts.title}
          contactsButtons={siteSettings?.contacts.buttons}
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