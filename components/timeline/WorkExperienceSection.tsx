import ContentSection from "@/components/sections/ContentSection";
import TimelineItem from "@/components/timeline/TimelineItem";

const workItems = [
  {
    title: "Company Name 1",
    subtitle: "Senior Product Designer",
    meta: "2023 — Present",
  },
  {
    title: "Company Name 2",
    subtitle: "UX/UI Designer",
    meta: "2021 — 2023",
  },
  {
    title: "Company Name 3",
    subtitle: "Junior Designer",
    meta: "2019 — 2021",
  },
];

export default function WorkExperienceSection() {
  return (
    <ContentSection label="Work Experience">
      <div className="ui-timeline-list">
        {workItems.map((item) => (
          <TimelineItem
            key={`${item.title}-${item.meta}`}
            title={item.title}
            subtitle={item.subtitle}
            meta={item.meta}
          />
        ))}
      </div>
    </ContentSection>
  );
}