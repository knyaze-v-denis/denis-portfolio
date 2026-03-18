import ContentSection from "@/components/sections/ContentSection";
import ProjectCard, {
  type ProjectCardProps,
} from "@/components/projects/ProjectCard";

const projects: ProjectCardProps[] = [
  {
    title: "Portfolio Website",
    description:
      "Design and development of a personal portfolio showcasing projects, experiments and design process.",
    cover: "/images/project-cover.png",
    href: "/projects/portfolio",
    tags: [
      { label: "Project", variant: "primary" },
      { label: "UX/UI", variant: "secondary" },
      { label: "Next.js", variant: "secondary" },
    ],
  },
  {
    title: "Fitness App Concept",
    description:
      "Concept exploration of a fitness ecosystem combining training tracking, nutrition and community features.",
    cover: "/images/project-cover.png",
    href: "/projects/fitness-app",
    tags: [
      { label: "Project", variant: "primary" },
      { label: "Product Design", variant: "secondary" },
    ],
  },
];

export default function ProjectsSection() {
  return (
    <ContentSection label="Projects & experiments">
      <div className="flex flex-col gap-[var(--space-6)]">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </ContentSection>
  );
}