import type { Metadata } from "next";
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
import { homepageQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import {
  mapSanityHomepageToHomepageData,
  mapSanitySiteSettingsToSiteSettingsData,
} from "@/sanity/lib/mappers";
import { cookies } from "next/headers";
import type { Locale } from "@/lib/i18n/types";

type SanityHomepageMetadata = {
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

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("locale")?.value;
  const locale: Locale = localeCookie === "en" ? "en" : "ru";

  const [homepageDocument, siteSettingsDocument] = await Promise.all([
    client.fetch<SanityHomepageMetadata | null>(homepageQuery),
    client.fetch<SanitySiteSettingsMetadata | null>(siteSettingsQuery),
  ]);

  const title =
    pickLocaleValue(homepageDocument?.seoTitle, locale) ??
    pickLocaleValue(siteSettingsDocument?.seoTitle, locale) ??
    "Denis Knyazev — Product Designer";

  const description =
    pickLocaleValue(homepageDocument?.seoDescription, locale) ??
    pickLocaleValue(siteSettingsDocument?.seoDescription, locale) ??
    "Product designer focused on UX, interfaces and scalable systems.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("locale")?.value;
  const locale: Locale = localeCookie === "en" ? "en" : "ru";

  const [homepageDocument, siteSettingsDocument] = await Promise.all([
    client.fetch(homepageQuery),
    client.fetch(siteSettingsQuery),
  ]);

  const homepage = homepageDocument
    ? mapSanityHomepageToHomepageData(homepageDocument, locale)
    : null;

  const siteSettings = siteSettingsDocument
    ? mapSanitySiteSettingsToSiteSettingsData(siteSettingsDocument, locale)
    : null;

  const sectionMap: Record<string, React.ReactNode> = {
    skills: <SkillsSection skillGroups={homepage?.skills} />,
    projects: <ProjectsSection projects={homepage?.homepageProjects} />,
    workExperience: (
      <WorkExperienceSection items={homepage?.workExperience} />
    ),
    education: <EducationSection items={homepage?.education} />,
  };

  const middleSections =
    homepage?.middleSectionsOrder?.filter((sectionKey) => sectionMap[sectionKey]) ??
    ["skills", "projects", "workExperience", "education"];

  return (
    <div className="site-root">
      <Header
        personName={siteSettings?.personName}
        personRole={siteSettings?.personRole}
        personPhotoSrc={siteSettings?.personPhotoSrc}
      />

      <PageLayout>
        <HeroSection
          imageSrc={siteSettings?.personPhotoSrc}
          role={siteSettings?.personRole}
          contacts={homepage?.hero.contacts}
          about={homepage?.hero.about}
        />
        <SectionDivider />

        {middleSections.map((sectionKey) => (
          <div key={sectionKey}>
            {sectionMap[sectionKey]}
            <SectionDivider />
          </div>
        ))}

        <ContactsSection
          title={siteSettings?.contacts.title}
          buttons={siteSettings?.contacts.buttons}
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