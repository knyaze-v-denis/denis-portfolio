"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import InViewClass from "@/components/motion/InViewClass";
import Reveal from "@/components/motion/Reveal";
import type {
  ProjectContentBlock,
  ProjectContentSection,
} from "@/lib/projects/types";
import { useTranslations } from "@/lib/i18n/useTranslations";

type ProjectSectionProps = {
  section: ProjectContentSection;
};

type LightboxImage = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
} | null;

function ProjectContentBlockRenderer({
  block,
  index,
  onImageClick,
}: {
  block: ProjectContentBlock;
  index: number;
  onImageClick: (image: {
    src: string;
    alt: string;
    caption?: string;
    width: number;
    height: number;
  }) => void;
}) {
  const handleImageClick = () => {
    if (block.type !== "image") return;
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      onImageClick({
        src: block.src,
        alt: block.alt,
        caption: block.caption,
        width: block.width,
        height: block.height,
      });
    }
  };

  switch (block.type) {
    case "blockTitle":
      return (
        <Reveal
          key={`block-title-${index}`}
          variant="title"
          delay={index * 75}
        >
          <h3 className="project-block-title">{block.text}</h3>
        </Reveal>
      );

    case "text":
      return (
        <Reveal key={`text-${index}`} variant="body" delay={index * 75}>
          <p className="project-text-block">{block.text}</p>
        </Reveal>
      );

    case "list":
      return (
        <Reveal key={`list-${index}`} variant="body" delay={index * 75}>
          <ul className="project-list-block">
            {block.items.map((item, itemIndex) => (
              <li key={`${item}-${itemIndex}`}>{item}</li>
            ))}
          </ul>
        </Reveal>
      );

    case "image":
      return (
        <Reveal key={`image-${index}`} variant="image" delay={index * 75}>
          <figure
            className="project-image-block"
            onClick={handleImageClick}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (
                (event.key === "Enter" || event.key === " ") &&
                typeof window !== "undefined" &&
                window.innerWidth >= 768
              ) {
                event.preventDefault();
                handleImageClick();
              }
            }}
          >
            <div className="project-image-block__media">
              <Image
                src={block.src}
                alt={block.alt}
                width={block.width}
                height={block.height}
                sizes="(max-width: 767px) calc(100vw - 16px), 720px"
                className="project-image-block__image"
              />
            </div>

            {block.caption ? (
              <figcaption className="project-image-block__caption">
                {block.caption}
              </figcaption>
            ) : null}
          </figure>
        </Reveal>
      );

    case "quote":
      if (!block.text) return null;

      return (
        <Reveal key={`quote-${index}`} variant="body" delay={index * 75}>
          <div className="project-quote-block">
            <div className="project-quote-block__inner">
              {block.title ? (
                <h4 className="project-quote-block__title">{block.title}</h4>
              ) : null}
              <p className="project-quote-block__text">{block.text}</p>
            </div>
          </div>
        </Reveal>
      );

    default:
      return null;
  }
}

export default function ProjectSection({ section }: ProjectSectionProps) {
  const { locale } = useTranslations();
  const [lightboxImage, setLightboxImage] = useState<LightboxImage>(null);

  useEffect(() => {
    if (!lightboxImage) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxImage(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxImage]);

  return (
    <>
      <InViewClass
        key={`${locale}-${section.id}`}
        as="section"
        className="section-frame project-section"
        threshold={0.2}
      >
        <div className="project-section__inner">
          <Reveal key={`${locale}-${section.id}-title`} variant="title">
            <h2 className="project-section__title">{section.title}</h2>
          </Reveal>

          <div className="project-section__content">
            {section.blocks.map((block, index) => (
              <ProjectContentBlockRenderer
                key={`${section.id}-${index}`}
                block={block}
                index={index}
                onImageClick={setLightboxImage}
              />
            ))}
          </div>
        </div>
      </InViewClass>

      {lightboxImage ? (
        <div
          className="project-image-lightbox"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="project-image-lightbox__content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="project-image-lightbox__close"
              onClick={() => setLightboxImage(null)}
              aria-label="Close image preview"
            >
              <X size={24} />
            </button>

            <div className="project-image-lightbox__image-frame">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                width={lightboxImage.width}
                height={lightboxImage.height}
                className="project-image-lightbox__image"
              />
            </div>

            {lightboxImage.caption ? (
              <div className="project-image-lightbox__caption">
                {lightboxImage.caption}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}