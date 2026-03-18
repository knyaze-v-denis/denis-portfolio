import ContentSection from "@/components/sections/ContentSection";
import TimelineItem from "@/components/timeline/TimelineItem";

const workItems = [
  {
    title: "Company Name 1",
    lines: ["Senior Product Designer", "2023 — Present"],
    secondaryLines: [1],
  },
  {
    title: "Company Name 2",
    lines: ["UX/UI Designer", "2021 — 2023"],
    secondaryLines: [1],
  },
  {
    title: "Company Name 3",
    lines: ["Junior Designer", "2019 — 2021"],
    secondaryLines: [1],
  },
];

export default function WorkExperienceSection() {
  return (
    <ContentSection label="Work Experience">
      <div className="ui-timeline-list">
        {workItems.map((item) => (
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