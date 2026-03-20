import type { Image } from "sanity";
import type { ProjectHeroProps } from "@/components/projects/ProjectHero";
import type { ProjectContentSection } from "@/lib/projects/types";
import type { ProjectCardProps } from "@/components/projects/ProjectCard";
import { urlForImage } from "./image";

type SanityProjectLink = {
  label?: string;
  href?: string;
};

type SanityImageBlock = {
  _type: "imageBlock";
  alt?: string;
  caption?: string;
  image?: Image & {
    asset?: {
      _ref?: string;
    };
  };
};

type SanityBlock =
  | { _type: "blockTitle"; text?: string }
  | { _type: "textBlock"; text?: string }
  | { _type: "listBlock"; items?: string[] }
  | { _type: "quoteBlock"; title?: string; text?: string }
  | SanityImageBlock;

type SanityProjectSection = {
  title?: string;
  blocks?: SanityBlock[];
};

type SanityProject = {
  title?: string;
  slug?: string;
  coverImage?: Image;
  shortDescription?: string;
  heroDescription?: string;
  client?: string;
  domain?: string;
  timeline?: string;
  role?: string;
  tags?: string[];
  links?: SanityProjectLink[];
  sections?: SanityProjectSection[];
};

export type SanityNavigationItem = {
  title?: string;
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
    imageSrc: string;
    role: string;
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

type SanityHomepageContactLink = {
  label?: string;
  href?: string;
  variant?: string;
};

type SanityHomepageSkillGroup = {
  kind?: string;
  title?: string;
  showTitle?: boolean;
  items?: string[];
};

type SanityWorkExperienceItem = {
  company?: string;
  position?: string;
  period?: string;
};

type SanityEducationItem = {
  institution?: string;
  program?: string;
  educationType?: string;
  customEducationType?: string;
  period?: string;
};

type SanityHomepageProject = {
  title?: string;
  slug?: string;
  shortDescription?: string;
  tags?: string[];
  coverImage?: Image;
};

type SanityHomepage = {
  heroImage?: Image;
  heroRole?: string;
  heroContacts?: SanityHomepageContactLink[];
  heroAbout?: string;
  skillGroups?: SanityHomepageSkillGroup[];
  workExperienceItems?: SanityWorkExperienceItem[];
  educationItems?: SanityEducationItem[];
  contactsTitle?: string;
  contactsButtons?: SanityHomepageContactLink[];
  middleSectionsOrder?: string[];
  homepageProjects?: SanityHomepageProject[];
};

function getSkillGroupLabel(kind?: string, customTitle?: string) {
  if (kind === "custom") {
    return customTitle || "Custom";
  }

  const dictionary: Record<string, string> = {
    "hard-skills": "Hard Skills",
    "soft-skills": "Soft Skills",
    languages: "Languages",
    "tools-stack": "Tools / Stack",
  };

  return dictionary[kind ?? ""] || customTitle || "Custom";
}

function getEducationTypeLabel(
  educationType?: string,
  customEducationType?: string
) {
  if (educationType === "custom") {
    return customEducationType || "";
  }

  const dictionary: Record<string, string> = {
    "incomplete-higher": "Incomplete higher education",
    higher: "Higher education",
    "professional-development": "Professional development",
    course: "Course",
    "secondary-vocational": "Secondary vocational education",
  };

  return dictionary[educationType ?? ""] || "";
}

export function mapSanityProjectToHero(
  project: SanityProject
): ProjectHeroProps {
  const cover = project.coverImage
    ? urlForImage(project.coverImage).width(1600).url()
    : "/images/project-cover.png";

  const fields: ProjectHeroProps["fields"] = [];

  if (project.client) {
    fields.push({ key: "client", value: project.client });
  }

  if (project.domain) {
    fields.push({ key: "domain", value: project.domain });
  }

  if (project.timeline) {
    fields.push({ key: "timeline", value: project.timeline });
  }

  if (project.role) {
    fields.push({ key: "role", value: project.role });
  }

  const validLinks =
    project.links?.filter(
      (link): link is { label: string; href: string } =>
        Boolean(link?.label && link?.href)
    ) ?? [];

  if (validLinks.length > 0) {
    fields.push({
      key: "links",
      links: validLinks.map((link) => ({
        label: link.label,
        href: link.href,
      })),
    });
  }

  return {
    title: project.title ?? "Untitled project",
    cover,
    description: project.heroDescription ?? "",
    fields,
  };
}

export function mapSanityProjectToSections(
  project: SanityProject
): ProjectContentSection[] {
  const sections = project.sections ?? [];

  return sections.map((section, sectionIndex) => {
    const blocks = section.blocks ?? [];
    const mappedBlocks: ProjectContentSection["blocks"] = [];

    for (const block of blocks) {
      switch (block._type) {
        case "blockTitle":
          if (block.text) {
            mappedBlocks.push({
              type: "blockTitle",
              text: block.text,
            });
          }
          break;

        case "textBlock":
          if (block.text) {
            mappedBlocks.push({
              type: "text",
              text: block.text,
            });
          }
          break;

        case "listBlock":
          mappedBlocks.push({
            type: "list",
            items: block.items ?? [],
          });
          break;

        case "quoteBlock":
          if (block.title && block.text) {
            mappedBlocks.push({
              type: "quote",
              title: block.title,
              text: block.text,
            });
          }
          break;

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
            alt: block.alt ?? "",
            caption: block.caption,
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
      title: section.title ?? `Section ${sectionIndex + 1}`,
      blocks: mappedBlocks,
    };
  });
}

export function mapSanityProjectsToCards(
  projects: SanityProject[]
): ProjectCardProps[] {
  return (projects ?? []).map((project) => {
    const cover = project.coverImage
      ? urlForImage(project.coverImage).width(1200).url()
      : "/images/project-cover.png";

    const rawTags = project.tags ?? [];

    const tags: ProjectCardProps["tags"] = rawTags.map((tag, index) => ({
      label: tag,
      variant: index === 0 ? "primary" : "secondary",
    }));

    return {
      title: project.title ?? "Untitled project",
      description: project.shortDescription ?? "",
      cover,
      href: `/projects/${project.slug ?? ""}`,
      tags,
    };
  });
}

export function mapSanityNavigationToProjectNavigation(
  items: SanityNavigationItem[],
  currentSlug: string
): ProjectNavigationData {
  const normalizedItems = (items ?? [])
    .filter(
      (item): item is { title: string; slug: string } =>
        Boolean(item?.title && item?.slug)
    )
    .map((item) => ({
      title: item.title,
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
  homepage: SanityHomepage
): HomepageData {
  const heroImageSrc = homepage.heroImage
    ? urlForImage(homepage.heroImage).width(1200).url()
    : "/images/profile-photo.png";

  const heroContacts =
    homepage.heroContacts?.filter(
      (item): item is { label: string; href: string } =>
        Boolean(item?.label && item?.href)
    ) ?? [];

  const skills = (homepage.skillGroups ?? [])
    .map((group) => ({
      title: getSkillGroupLabel(group.kind, group.title),
      showTitle: group.showTitle ?? true,
      items: group.items ?? [],
    }))
    .filter((group) => group.items.length > 0);

  const workExperience = (homepage.workExperienceItems ?? [])
    .filter((item) => Boolean(item.company && item.position))
    .map((item) => {
      const lines = [item.position ?? ""];
      const secondaryLines: number[] = [];

      if (item.period) {
        lines.push(item.period);
        secondaryLines.push(lines.length - 1);
      }

      return {
        title: item.company ?? "",
        lines,
        secondaryLines,
      };
    });

  const education = (homepage.educationItems ?? [])
    .filter((item) => Boolean(item.institution && item.program))
    .map((item) => {
      const lines = [item.program ?? ""];
      const secondaryLines: number[] = [];

      const educationTypeLabel = getEducationTypeLabel(
        item.educationType,
        item.customEducationType
      );

      if (educationTypeLabel) {
        lines.push(educationTypeLabel);
        secondaryLines.push(lines.length - 1);
      }

      if (item.period) {
        lines.push(item.period);
        secondaryLines.push(lines.length - 1);
      }

      return {
        title: item.institution ?? "",
        lines,
        secondaryLines,
      };
    });

  const contactsButtons: HomepageContactButton[] = (
  homepage.contactsButtons?.filter(
    (item): item is { label: string; href: string; variant?: string } =>
      Boolean(item?.label && item?.href)
    ) ?? []
  ).map((item) => ({
    label: item.label,
    href: item.href,
    variant: item.variant === "primary" ? "primary" : "secondary",
  }));

  const homepageProjects = mapSanityProjectsToCards(
    homepage.homepageProjects ?? []
  );

  return {
    hero: {
      imageSrc: heroImageSrc,
      role: homepage.heroRole ?? "",
      contacts: heroContacts,
      about: homepage.heroAbout ?? "",
    },
    skills,
    workExperience,
    education,
    contacts: {
      title: homepage.contactsTitle ?? "",
      buttons: contactsButtons,
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