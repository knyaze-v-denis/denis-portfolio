"use client";

import Reveal from "@/components/motion/Reveal";
import StaggerReveal from "@/components/motion/StaggerReveal";
import ContentSection from "@/components/sections/ContentSection";
import SkillTag from "@/components/ui/SkillTag";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { HomepageSkillGroup } from "@/sanity/lib/mappers";

type SkillsSectionProps = {
  skillGroups?: HomepageSkillGroup[];
};

export default function SkillsSection({
  skillGroups,
}: SkillsSectionProps) {
  const { t, locale } = useTranslations();

  const fallbackGroups: HomepageSkillGroup[] = [
    {
      title: t.skills.groups.hard,
      showTitle: true,
      items: t.skills.items.hard,
    },
    {
      title: t.skills.groups.soft,
      showTitle: true,
      items: t.skills.items.soft,
    },
    {
      title: t.skills.groups.languages,
      showTitle: true,
      items: t.skills.items.languages,
    },
  ];

  const groups =
    skillGroups && skillGroups.length > 0 ? skillGroups : fallbackGroups;

  const visibleGroups = groups.filter((group) => group.items.length > 0);

  const groupsKey = visibleGroups
    .map((group) => `${group.title}:${group.items.join("|")}`)
    .join("__");

  return (
    <ContentSection label={t.sections.skills}>
      <div
        key={`skills-${locale}-${groupsKey}`}
        className="section-content skills-section__content"
      >
        {visibleGroups.map((group, groupIndex) => (
          <div
            key={`${locale}-${group.title}-${group.items.join("|")}-${groupIndex}`}
            className="skills-group"
          >
            {group.showTitle ? (
              <Reveal variant="body" delay={groupIndex * 40}>
                <h3 className="skills-group__title text-title-3">
                  {group.title}
                </h3>
              </Reveal>
            ) : null}

            <StaggerReveal
              key={`${locale}-${group.title}-${group.items.join("|")}`}
              className="skills-group__items"
              itemAs="div"
              step={40}
            >
              {group.items.map((item) => (
                <SkillTag key={`${locale}-${group.title}-${item}`} label={item} />
              ))}
            </StaggerReveal>
          </div>
        ))}
      </div>
    </ContentSection>
  );
}