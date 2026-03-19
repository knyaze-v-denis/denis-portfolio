"use client";

import Reveal from "@/components/motion/Reveal";
import ContentSection from "@/components/sections/ContentSection";
import TimelineItem from "@/components/timeline/TimelineItem";
import { useTranslations } from "@/lib/i18n/useTranslations";

export default function WorkExperienceSection() {
  const { t } = useTranslations();

  return (
    <ContentSection label={t.sections.workExperience}>
      <div className="ui-timeline-list">
        {t.workExperience.items.map((item, index) => (
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