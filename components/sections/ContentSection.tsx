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
    <section id={id} className={cn("section-frame section-shell", className)}>
      <SectionLabel>{label}</SectionLabel>
      <div className={cn("section-content", contentClassName)}>{children}</div>
    </section>
  );
}