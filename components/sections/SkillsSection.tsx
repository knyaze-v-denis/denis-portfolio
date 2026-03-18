import ContentSection from "@/components/sections/ContentSection";
import SkillTag from "@/components/ui/SkillTag";

const skillGroups = [
  {
    title: "Hard Skills",
    items: [
      "UX Design",
      "UI Design",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Research",
      "Figma",
      "User Flows",
      "Information Architecture",
      "Usability Testing",
    ],
  },
  {
    title: "Soft Skills",
    items: [
      "Communication",
      "Presentation",
      "Teamwork",
      "Problem Solving",
      "Critical Thinking",
      "Collaboration",
    ],
  },
  {
    title: "Languages",
    items: ["Russian", "English", "Finnish"],
  },
];

export default function SkillsSection() {
  return (
    <ContentSection label="Skills">
      {skillGroups.map((group) => (
        <div key={group.title} className="skills-group">
          <h3 className="text-title-3 text-[var(--color-foreground-tertiary)]">
            {group.title}
          </h3>

          <div className="flex flex-wrap gap-[0.75rem]">
            {group.items.map((item) => (
              <SkillTag key={item} label={item} />
            ))}
          </div>
        </div>
      ))}
    </ContentSection>
  );
}