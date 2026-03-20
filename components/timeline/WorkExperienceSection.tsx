"use client";

import Reveal from "@/components/motion/Reveal";
import ContentSection from "@/components/sections/ContentSection";
import TimelineItem from "@/components/timeline/TimelineItem";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { HomepageTimelineItem } from "@/sanity/lib/mappers";

type WorkExperienceSectionProps = {
  items?: HomepageTimelineItem[];
};

export default function WorkExperienceSection({
  items,
}: WorkExperienceSectionProps) {
  const { t, locale } = useTranslations();

  const fallbackItems: HomepageTimelineItem[] = t.workExperience.items;

  const displayItems =
    items && items.length > 0 ? items : fallbackItems;

  const itemsKey = displayItems
    .map((item) => `${item.title}:${item.lines.join("|")}`)
    .join("__");

  return (
    <ContentSection label={t.sections.workExperience}>
      <div key={`work-${locale}-${itemsKey}`} className="section-content">
        {displayItems.map((item, index) => (
          <Reveal
            key={`${locale}-${item.title}-${item.lines.join("|")}-${index}`}
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