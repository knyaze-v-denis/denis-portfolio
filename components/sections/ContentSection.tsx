import InViewClass from "@/components/motion/InViewClass";
import Reveal from "@/components/motion/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

type ContentSectionProps = {
  id?: string;
  label: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export default function ContentSection({
  id,
  label,
  children,
  className,
  contentClassName,
}: ContentSectionProps) {
  return (
    <InViewClass
      as="section"
      id={id}
      className={cn("section-frame section-shell", className)}
      threshold={0.2}
    >
      <Reveal variant="body">
        <SectionLabel>{label}</SectionLabel>
      </Reveal>

      <div className={cn("section-content", contentClassName)}>{children}</div>
    </InViewClass>
  );
}