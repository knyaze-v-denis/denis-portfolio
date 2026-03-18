import Image from "next/image";
import Link from "next/link";
import ProjectTag, { type ProjectTagVariant } from "@/components/projects/ProjectTag";

export type ProjectCardTag = {
  label: string;
  variant?: ProjectTagVariant;
};

export type ProjectCardProps = {
  title: string;
  description: string;
  image: string;
  href: string;
  tags: ProjectCardTag[];
};

export default function ProjectCard({
  title,
  description,
  image,
  href,
  tags,
}: ProjectCardProps) {
  return (
    <Link href={href} className="ui-project-card">
      <div className="ui-project-card__inner">
        <div className="ui-project-card__cover">
          <Image
            src={image}
            alt={title}
            fill
            className="ui-project-card__image"
            sizes="240px"
          />
        </div>

        <div className="ui-project-card__content">
          <div className="ui-project-card__top">
            <h3 className="ui-project-card__title">{title}</h3>

            <div className="ui-project-card__tags">
              {tags.map((tag) => (
                <ProjectTag key={`${title}-${tag.label}`} variant={tag.variant}>
                  {tag.label}
                </ProjectTag>
              ))}
            </div>
          </div>

          <p className="ui-project-card__description">{description}</p>
        </div>
      </div>
    </Link>
  );
}