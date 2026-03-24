import type { Image } from "sanity";
import type { ProjectHeroProps } from "@/components/projects/ProjectHero";
import type { ProjectContentSection } from "@/lib/projects/types";
import type { ProjectCardProps } from "@/components/projects/ProjectCard";
import { urlForImage } from "./image";

type SanityProjectLink = {
  label?: LocalizedValue<string> | string;
  href?: string;
};

type SanityImageBlock = {
  _type: "imageBlock";
  alt?: LocalizedValue<string> | string;
  caption?: LocalizedValue<string> | string;
  image?: Image & {
    asset?: {
      _ref?: string;
    };
  };
};

type SanityBlock =
  | { _type: "blockTitle"; text?: LocalizedValue<string> | string }
  | { _type: "textBlock"; text?: LocalizedValue<string> | string }
  | {
      _type: "listBlock";
      items?: LocalizedValue<string[]> | string[];
    }
  | {
      _type: "quoteBlock";
      title?: LocalizedValue<string> | string;
      text?: LocalizedValue<string> | string;
    }
  | SanityImageBlock;

type SanityProjectSection = {
  title?: LocalizedValue<string> | string;
  blocks?: SanityBlock[];
};

type SanityProject = {
  title?: LocalizedValue<string> | string;
  slug?: string;
  coverImage?: Image;
  shortDescription?: LocalizedValue<string> | string;
  heroDescription?: LocalizedValue<string> | string;
  client?: LocalizedValue<string> | string;
  domain?: LocalizedValue<string> | string;
  timeline?: LocalizedValue<string> | string;
  role?: LocalizedValue<string> | string;
  tags?: LocalizedValue<string[]> | string[];
  links?: SanityProjectLink[];
  sections?: SanityProjectSection[];
};

export type SanityNavigationItem = {
  title?: LocalizedValue<string> | string;
  slug?: string;
};

export type ProjectNavigationItem = {
  title: string;
  href: string;
};

export type ProjectNavigationData = {
  previous: ProjectNavigationItem | null;
  next: ProjectNavigationItem | null;
};

export type HomepageHeroContact = {
  label: string;
  href: string;
};

export type HomepageSkillGroup = {
  title: string;
  showTitle: boolean;
  items: string[];
};

export type HomepageTimelineItem = {
  title: string;
  lines: string[];
  secondaryLines: number[];
};

export type HomepageContactButton = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type HomepageData = {
  hero: {
    contacts: HomepageHeroContact[];
    about: string;
  };
  skills: HomepageSkillGroup[];
  workExperience: HomepageTimelineItem[];
  education: HomepageTimelineItem[];
  contacts: {
    title: string;
    buttons: HomepageContactButton[];
  };
  middleSectionsOrder: string[];
  homepageProjects: ProjectCardProps[];
};

export type SiteSettingsData = {
  personName: string;
  personRole: string;
  personPhotoSrc: string;
  seoTitle: string;
  seoDescription: string;
  contacts: {
    title: string;
    buttons: HomepageContactButton[];
  };
  footer: {
    showAside: boolean;
    asideText: string;
    asideLinkLabel: string;
    asideLinkHref: string;
  };
  notFound: {
    title: string;
    message: string;
    buttonLabel: string;
    projectsTitle: string;
    experimentsTitle: string;
  };
};


type LocalizedValue<T = string> = {
  ru?: T;
  en?: T;
};

type SanityHomepageContactLink = {
  label?: LocalizedValue<string> | string;
  href?: string;
  variant?: string;
};

type SanityHomepageSkillGroup = {
  kind?: string;
  title?: LocalizedValue<string> | string;
  showTitle?: boolean;
  items?: LocalizedValue<string[]> | string[];
};

type SanityWorkExperienceItem = {
  company?: LocalizedValue<string> | string;
  position?: LocalizedValue<string> | string;
  period?: LocalizedValue<string> | string;
};

type SanityEducationItem = {
  institution?: LocalizedValue<string> | string;
  program?: LocalizedValue<string> | string;
  educationType?: LocalizedValue<string> | string;
  customEducationType?: LocalizedValue<string> | string;
  period?: LocalizedValue<string> | string;
};

type SanityHomepageProject = {
  title?: LocalizedValue<string> | string;
  slug?: string;
  shortDescription?: LocalizedValue<string> | string;
  tags?: LocalizedValue<string[]> | string[];
  coverImage?: Image;
};

type SanityHomepage = {
  heroContacts?: SanityHomepageContactLink[];
  heroAbout?: LocalizedValue<string> | string;
  skillGroups?: SanityHomepageSkillGroup[];
  workExperienceItems?: SanityWorkExperienceItem[];
  educationItems?: SanityEducationItem[];
  middleSectionsOrder?: string[];
  homepageProjects?: SanityHomepageProject[];
};

type SanitySiteSettings = {
  personName?: LocalizedValue<string> | string;
  personRole?: LocalizedValue<string> | string;
  personPhoto?: Image;
  seoTitle?: LocalizedValue<string> | string;
  seoDescription?: LocalizedValue<string> | string;
  contactsTitle?: LocalizedValue<string> | string;
  contactsButtons?: SanityHomepageContactLink[];
  showFooterAside?: boolean;
  footerAsideText?: LocalizedValue<string> | string;
  footerAsideLinkLabel?: LocalizedValue<string> | string;
  footerAsideLinkHref?: string;
  notFoundTitle?: LocalizedValue<string> | string;
  notFoundMessage?: LocalizedValue<string> | string;
  notFoundButtonLabel?: LocalizedValue<string> | string;
  notFoundProjectsTitle?: LocalizedValue<string> | string;
  notFoundExperimentsTitle?: LocalizedValue<string> | string;
};

function pickLocaleValue<T = string>(
  field: LocalizedValue<T> | T | undefined,
  locale: "ru" | "en"
): T | undefined {
  if (!field) return undefined;
  if (typeof field !== "object") return field;
  const localizedField = field as LocalizedValue<T>;
  return localizedField[locale] ?? localizedField.en ?? localizedField.ru;
}

function getSkillGroupLabel(
  kind: string | undefined,
  customTitle: string | undefined,
  locale: "ru" | "en"
) {
  if (kind === "custom") {
    return customTitle || (locale === "ru" ? "Своя группа" : "Custom");
  }

  const dictionary: Record<"ru" | "en", Record<string, string>> = {
    ru: {
      "hard-skills": "Хард скиллы",
      "soft-skills": "Софт скиллы",
      languages: "Языки",
      "tools-stack": "Инструменты / стек",
    },
    en: {
      "hard-skills": "Hard Skills",
      "soft-skills": "Soft Skills",
      languages: "Languages",
      "tools-stack": "Tools / Stack",
    },
  };

  return (
    dictionary[locale][kind ?? ""] ||
    customTitle ||
    (locale === "ru" ? "Своя группа" : "Custom")
  );
}

function getEducationTypeLabel(
  educationType: LocalizedValue<string> | string | undefined,
  customEducationType: LocalizedValue<string> | string | undefined,
  locale: "ru" | "en"
) {
  const resolvedEducationType = pickLocaleValue(educationType, locale);
  const resolvedCustomEducationType = pickLocaleValue(
    customEducationType,
    locale
  );

  if (resolvedEducationType === "custom") {
    return resolvedCustomEducationType || "";
  }

  const dictionary: Record<"ru" | "en", Record<string, string>> = {
    ru: {
      "incomplete-higher": "Неоконченное высшее",
      higher: "Высшее образование",
      "professional-development": "Повышение квалификации",
      course: "Курс",
      "secondary-vocational": "Среднее профессиональное образование",
    },
    en: {
      "incomplete-higher": "Incomplete higher education",
      higher: "Higher education",
      "professional-development": "Professional development",
      course: "Course",
      "secondary-vocational": "Secondary vocational education",
    },
  };

  return dictionary[locale][resolvedEducationType ?? ""] || "";
}

export function mapSanityProjectToHero(
  project: SanityProject,
  locale: "ru" | "en"
): ProjectHeroProps {
  const cover = project.coverImage
    ? urlForImage(project.coverImage).width(1600).url()
    : "/images/project-cover.png";

  const fields: ProjectHeroProps["fields"] = [];

  const client = pickLocaleValue(project.client, locale);
  if (client) {
    fields.push({ key: "client", value: client });
  }

  const domain = pickLocaleValue(project.domain, locale);
  if (domain) {
    fields.push({ key: "domain", value: domain });
  }

  const timeline = pickLocaleValue(project.timeline, locale);
  if (timeline) {
    fields.push({ key: "timeline", value: timeline });
  }

  const role = pickLocaleValue(project.role, locale);
  if (role) {
    fields.push({ key: "role", value: role });
  }

  const validLinks =
    project.links?.filter(
      (link): link is { label: LocalizedValue<string> | string; href: string } =>
        Boolean(link?.label && link?.href)
    ) ?? [];

  if (validLinks.length > 0) {
    fields.push({
      key: "links",
      links: validLinks.map((link) => ({
        label: pickLocaleValue(link.label, locale) ?? "",
        href: link.href,
      })),
    });
  }

  return {
    title: pickLocaleValue(project.title, locale) ?? "Untitled project",
    cover,
    description: pickLocaleValue(project.heroDescription, locale) ?? "",
    fields,
  };
}

export function mapSanityProjectToSections(
  project: SanityProject,
  locale: "ru" | "en"
): ProjectContentSection[] {
  const sections = project.sections ?? [];

  return sections.map((section, sectionIndex) => {
    const blocks = section.blocks ?? [];
    const mappedBlocks: ProjectContentSection["blocks"] = [];

    for (const block of blocks) {
      switch (block._type) {
        case "blockTitle": {
          const text = pickLocaleValue(block.text, locale);
          if (text) {
            mappedBlocks.push({
              type: "blockTitle",
              text,
            });
          }
          break;
        }

        case "textBlock": {
          const text = pickLocaleValue(block.text, locale);
          if (text) {
            mappedBlocks.push({
              type: "text",
              text,
            });
          }
          break;
        }

        case "listBlock":
          mappedBlocks.push({
            type: "list",
            items: pickLocaleValue(block.items, locale) ?? [],
          });
          break;

        case "quoteBlock": {
          const title = pickLocaleValue(block.title, locale);
          const text = pickLocaleValue(block.text, locale);

          if (text) {
            mappedBlocks.push({
              type: "quote",
              title,
              text,
            });
          }
          break;
        }

        case "imageBlock": {
          const image = block.image;
          const imageUrl = image ? urlForImage(image).width(1600).url() : null;
          const ref = image?.asset?._ref;

          if (!imageUrl || !ref) {
            break;
          }

          const dimensionsMatch = ref.match(/-(\d+)x(\d+)-/);
          const width = dimensionsMatch ? Number(dimensionsMatch[1]) : 1600;
          const height = dimensionsMatch ? Number(dimensionsMatch[2]) : 900;

          mappedBlocks.push({
            type: "image",
            src: imageUrl,
            alt: pickLocaleValue(block.alt, locale) ?? "",
            caption: pickLocaleValue(block.caption, locale),
            width,
            height,
          });
          break;
        }

        default:
          break;
      }
    }

    return {
      id: `section-${sectionIndex + 1}`,
      title:
        pickLocaleValue(section.title, locale) ??
        `Section ${sectionIndex + 1}`,
      blocks: mappedBlocks,
    };
  });
}

export function mapSanityProjectsToCards(
  projects: SanityProject[],
  locale: "ru" | "en" = "en"
): ProjectCardProps[] {
  return (projects ?? []).map((project) => {
    const cover = project.coverImage
      ? urlForImage(project.coverImage).width(1200).url()
      : "/images/project-cover.png";

    const rawTags = pickLocaleValue(project.tags, locale) ?? [];

    const tags: ProjectCardProps["tags"] = rawTags.map((tag, index) => ({
      label: tag,
      variant: index === 0 ? "primary" : "secondary",
    }));

    return {
      title: pickLocaleValue(project.title, locale) ?? "Untitled project",
      description: pickLocaleValue(project.shortDescription, locale) ?? "",
      cover,
      href: `/projects/${project.slug ?? ""}`,
      tags,
    };
  });
}

export function mapSanityNavigationToProjectNavigation(
  items: SanityNavigationItem[],
  currentSlug: string,
  locale: "ru" | "en" = "en"
): ProjectNavigationData {
  const normalizedItems = (items ?? [])
    .filter(
      (item): item is { title: LocalizedValue<string> | string; slug: string } =>
        Boolean(item?.title && item?.slug)
    )
    .map((item) => ({
      title: pickLocaleValue(item.title, locale) ?? "Untitled project",
      slug: item.slug,
    }));

  const currentIndex = normalizedItems.findIndex(
    (item) => item.slug === currentSlug
  );

  if (currentIndex === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  const previous =
    currentIndex > 0
      ? {
          title: normalizedItems[currentIndex - 1].title,
          href: `/projects/${normalizedItems[currentIndex - 1].slug}`,
        }
      : null;

  const next =
    currentIndex < normalizedItems.length - 1
      ? {
          title: normalizedItems[currentIndex + 1].title,
          href: `/projects/${normalizedItems[currentIndex + 1].slug}`,
        }
      : null;

  return {
    previous,
    next,
  };
}

export function mapSanityHomepageToHomepageData(
  homepage: SanityHomepage,
  locale: "ru" | "en"
): HomepageData {
  const heroContacts =
    homepage.heroContacts
      ?.filter(
        (item): item is {
          label: LocalizedValue<string> | string;
          href: string;
        } => Boolean(item?.label && item?.href)
      )
      .map((item) => ({
        label: pickLocaleValue(item.label, locale) ?? "",
        href: item.href,
      })) ?? [];

  const skills = (homepage.skillGroups ?? [])
    .map((group) => ({
      title: getSkillGroupLabel(
        group.kind,
        pickLocaleValue(group.title, locale),
        locale
      ),
      showTitle: group.showTitle ?? true,
      items: pickLocaleValue(group.items, locale) ?? [],
    }))
    .filter((group) => group.items.length > 0);

  const workExperience = (homepage.workExperienceItems ?? [])
    .filter((item) => Boolean(item.company && item.position))
    .map((item) => {
      const company = pickLocaleValue(item.company, locale);
      const position = pickLocaleValue(item.position, locale);
      const period = pickLocaleValue(item.period, locale);
      const lines = [position ?? ""];
      const secondaryLines: number[] = [];

      if (period) {
        lines.push(period);
        secondaryLines.push(lines.length - 1);
      }

      return {
        title: company ?? "",
        lines,
        secondaryLines,
      };
    });

  const education = (homepage.educationItems ?? [])
    .filter((item) => Boolean(item.institution && item.program))
    .map((item) => {
      const institution = pickLocaleValue(item.institution, locale);
      const program = pickLocaleValue(item.program, locale);
      const period = pickLocaleValue(item.period, locale);
      const lines = [program ?? ""];
      const secondaryLines: number[] = [];

      const educationTypeLabel = getEducationTypeLabel(
        item.educationType,
        item.customEducationType,
        locale
      );

      if (educationTypeLabel) {
        lines.push(educationTypeLabel);
        secondaryLines.push(lines.length - 1);
      }

      if (period) {
        lines.push(period);
        secondaryLines.push(lines.length - 1);
      }

      return {
        title: institution ?? "",
        lines,
        secondaryLines,
      };
    });

  const homepageProjects = mapSanityProjectsToCards(
    homepage.homepageProjects ?? [],
    locale
  );

  return {
    hero: {
      contacts: heroContacts,
      about: pickLocaleValue(homepage.heroAbout, locale) ?? "",
    },
    skills,
    workExperience,
    education,
    contacts: {
      title: "",
      buttons: [],
    },
    middleSectionsOrder:
      homepage.middleSectionsOrder ?? [
        "skills",
        "projects",
        "workExperience",
        "education",
      ],
    homepageProjects,
  };
}

export function mapSanitySiteSettingsToSiteSettingsData(
  settings: SanitySiteSettings,
  locale: "ru" | "en"
): SiteSettingsData {
  const personPhotoSrc = settings.personPhoto
    ? urlForImage(settings.personPhoto).width(1200).url()
    : "/images/profile-photo.png";

  const contactsButtons: HomepageContactButton[] = (
    settings.contactsButtons?.filter(
      (item): item is {
        label: LocalizedValue<string> | string;
        href: string;
        variant?: string;
      } => Boolean(item?.label && item?.href)
    ) ?? []
  ).map((item) => ({
    label: pickLocaleValue(item.label, locale) ?? "",
    href: item.href,
    variant: item.variant === "primary" ? "primary" : "secondary",
  }));

  return {
    personName:
      pickLocaleValue(settings.personName, locale) ?? "Denis Knyazev",
    personRole:
      pickLocaleValue(settings.personRole, locale) ?? "Product Designer",
    personPhotoSrc,
    seoTitle:
      pickLocaleValue(settings.seoTitle, locale) ??
      "Denis Knyazev — Product Designer",
    seoDescription:
      pickLocaleValue(settings.seoDescription, locale) ??
      "Product designer focused on UX, interfaces and scalable systems.",
    contacts: {
      title: pickLocaleValue(settings.contactsTitle, locale) ?? "",
      buttons: contactsButtons,
    },
    footer: {
      showAside: settings.showFooterAside ?? false,
      asideText: pickLocaleValue(settings.footerAsideText, locale) ?? "",
      asideLinkLabel:
        pickLocaleValue(settings.footerAsideLinkLabel, locale) ?? "",
      asideLinkHref: settings.footerAsideLinkHref ?? "",
    },
    notFound: {
      title:
        pickLocaleValue(settings.notFoundTitle, locale) ??
        (locale === "ru" ? "СТРАНИЦА НЕ НАЙДЕНА" : "PAGE NOT FOUND"),
      message:
        pickLocaleValue(settings.notFoundMessage, locale) ??
        (locale === "ru"
          ? "Похоже, что эта страница не существует или ссылка устарела."
          : "It appears that this page does not exist or the link is outdated."),
      buttonLabel:
        pickLocaleValue(settings.notFoundButtonLabel, locale) ??
        (locale === "ru" ? "Главная" : "Home"),
      projectsTitle:
        pickLocaleValue(settings.notFoundProjectsTitle, locale) ??
        (locale === "ru"
          ? "Посмотрите мои проекты"
          : "Take a look at my projects"),
      experimentsTitle:
        pickLocaleValue(settings.notFoundExperimentsTitle, locale) ?? "",
    },
  };
}