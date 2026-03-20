import type { Image } from "sanity";
import type { ProjectHeroProps } from "@/components/projects/ProjectHero";
import type { ProjectContentSection } from "@/lib/projects/types";
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
  coverImage?: Image;
  heroDescription?: string;
  client?: string;
  domain?: string;
  timeline?: string;
  role?: string;
  links?: SanityProjectLink[];
  sections?: SanityProjectSection[];
};

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