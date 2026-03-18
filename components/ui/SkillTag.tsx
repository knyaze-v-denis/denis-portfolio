import { cn } from "@/lib/utils";

type SkillTagProps = {
  label: string;
  className?: string;
};

export default function SkillTag({ label, className }: SkillTagProps) {
  return <span className={cn("ui-skill-tag", className)}>{label}</span>;
}