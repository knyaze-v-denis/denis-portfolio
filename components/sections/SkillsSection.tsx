"use client";

import Reveal from "@/components/motion/Reveal";
import StaggerReveal from "@/components/motion/StaggerReveal";
import ContentSection from "@/components/sections/ContentSection";
import SkillTag from "@/components/ui/SkillTag";
import { useTranslations } from "@/lib/i18n/useTranslations";

export default function SkillsSection() {
  const { t } = useTranslations();

  const skillGroups = [
    {
      title: t.skills.groups.hard,
      items: t.skills.items.hard,
    },
    {
      title: t.skills.groups.soft,
      items: t.skills.items.soft,
    },
    {
      title: t.skills.groups.languages,
      items: t.skills.items.languages,
    },
  ];

  return (
    <ContentSection label={t.sections.skills}>
      {skillGroups.map((group) => (
        <div key={group.title} className="skills-group">
          <Reveal variant="body">
            <h3 className="text-title-3 text-[var(--color-foreground-tertiary)]">
              {group.title}
            </h3>
          </Reveal>

          <StaggerReveal
            variant="tag"
            step={75}
            threshold={0.2}
            className="flex flex-wrap gap-[0.75rem]"
            itemAs="span"
          >
            {group.items.map((item) => (
              <SkillTag key={item} label={item} />
            ))}
          </StaggerReveal>
        </div>
      ))}
    </ContentSection>
  );
}