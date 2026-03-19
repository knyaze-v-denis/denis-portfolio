"use client";

import { ReactNode } from "react";
import InViewClass from "@/components/motion/InViewClass";
import Reveal from "@/components/motion/Reveal";
import { useTranslations } from "@/lib/i18n/useTranslations";

type ContentSectionProps = {
  id?: string;
  label: string;
  children: ReactNode;
};

export default function ContentSection({
  id,
  label,
  children,
}: ContentSectionProps) {
  const { locale } = useTranslations();

  return (
    <InViewClass
      as="section"
      id={id}
      className="section-frame"
      threshold={0.2}
    >
      {/* ВОТ ЭТОТ КОНТЕЙНЕР ДОЛЖЕН БЫТЬ */}
      <div className="section-shell">

        <Reveal key={`${locale}-title`} variant="title">
          <h2 className="text-title-3 text-caps text-[var(--color-foreground-secondary)]">
            {label}
          </h2>
        </Reveal>

        <div className="section-content">
          {children}
        </div>

      </div>
    </InViewClass>
  );
}