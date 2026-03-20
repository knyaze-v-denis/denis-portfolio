"use client";

import Reveal from "@/components/motion/Reveal";
import ContentSection from "@/components/sections/ContentSection";
import TimelineItem from "@/components/timeline/TimelineItem";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { HomepageTimelineItem } from "@/sanity/lib/mappers";

type EducationSectionProps = {
  items?: HomepageTimelineItem[];
};

export default function EducationSection({
  items,
}: EducationSectionProps) {
  const { t } = useTranslations();

  const fallbackItems: HomepageTimelineItem[] = t.education.items;

  const displayItems =
    items && items.length > 0 ? items : fallbackItems;

  return (
    <ContentSection label={t.sections.education}>
      <div className="section-content">
        {displayItems.map((item, index) => (
          <Reveal
            key={`${item.title}-${index}`}
            variant="body"
            delay={index * 60}
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