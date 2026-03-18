import Reveal from "@/components/motion/Reveal";
import ContentSection from "@/components/sections/ContentSection";
import TimelineItem from "@/components/timeline/TimelineItem";

const workItems = [
  {
    title: "SimpleOne • ITG Corporation",
    lines: ["Продуктовый дизайнер", "Октябрь 2025 — сейчас"],
    secondaryLines: [1],
  },
  {
    title: "Матрикс",
    lines: ["Ведущий продуктовый дизайнер", "Июнь 2024 — Июнь 2025"],
    secondaryLines: [1],
  },
  {
    title: "LockBox",
    lines: ["UX/UI дизайнер", "Февраль 2023 — Май 2024"],
    secondaryLines: [1],
  },
  {
    title: "Университет ИТМО",
    lines: ["Графический дизайнер", "Сентябрь 2021 — Сентябрь 2022"],
    secondaryLines: [1],
  },
];

export default function WorkExperienceSection() {
  return (
    <ContentSection label="Work Experience">
      <div className="ui-timeline-list">
        {workItems.map((item, index) => (
          <Reveal key={`${item.title}-${item.lines[0]}`} variant="card" delay={index * 75}>
            <TimelineItem
              title={item.title}
              lines={item.lines}
              secondaryLines={item.secondaryLines}
            />
          </Reveal>
        ))}
      </div>
    </ContentSection>
  );
}