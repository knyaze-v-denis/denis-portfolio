import Reveal from "@/components/motion/Reveal";
import ContentSection from "@/components/sections/ContentSection";
import TimelineItem from "@/components/timeline/TimelineItem";

const educationItems = [
  {
    title: "МБИ им. А. Собчака",
    lines: [
      "Бизнес-информатика",
      "Неоконченное высшее",
      "2024 — 2029",
    ],
    secondaryLines: [1, 2],
  },
  {
    title: "Университет ИТМО",
    lines: [
      "Бизнес-информатика",
      "Неоконченное высшее",
      "2020 — 2023",
    ],
    secondaryLines: [1, 2],
  },
  {
    title: "Яндекс Практикум",
    lines: [
      "UX-исследования для дизайнеров",
      "Повышение квалификации",
      "2026",
    ],
    secondaryLines: [1, 2],
  },
  {
    title: "Женя Арутюнов",
    lines: [
      "Как дизайнить кодом",
      "2025",
    ],
    secondaryLines: [1],
  },
];

export default function EducationSection() {
  return (
    <ContentSection label="Образование">
      <div className="ui-timeline-list">
        {educationItems.map((item, index) => (
          <Reveal
            key={`${item.title}-${item.lines[0]}`}
            variant="card"
            delay={index * 75}
          >
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