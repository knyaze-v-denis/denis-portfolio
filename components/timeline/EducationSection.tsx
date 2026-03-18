import ContentSection from "@/components/sections/ContentSection";
import TimelineItem from "@/components/timeline/TimelineItem";

const educationItems = [
  {
    title: "University / School Name",
    subtitle: "Interaction Design",
    meta: "Bachelor Degree • 2018 — 2022",
  },
  {
    title: "Course Platform",
    subtitle: "Product Design Course",
    meta: "Certificate • 2023",
  },
];

export default function EducationSection() {
  return (
    <ContentSection label="Education">
      <div className="ui-timeline-list">
        {educationItems.map((item) => (
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