import ContentSection from "@/components/sections/ContentSection";
import TimelineItem from "@/components/timeline/TimelineItem";

const educationItems = [
  {
    title: "University Name",
    lines: [
      "Interaction Design",
      "Bachelor Degree",
      "2018 — 2022",
    ],
    secondaryLines: [1, 2],
  },
  {
    title: "Course Platform",
    lines: [
      "Product Design Course",
      "Certificate",
      "2023",
    ],
    secondaryLines: [1, 2],
  },
];

export default function EducationSection() {
  return (
    <ContentSection label="Education">
      <div className="ui-timeline-list">
        {educationItems.map((item) => (
          <TimelineItem
            key={`${item.title}-${item.lines[0]}`}
            title={item.title}
            lines={item.lines}
            secondaryLines={item.secondaryLines}
          />
        ))}
      </div>
    </ContentSection>
  );
}