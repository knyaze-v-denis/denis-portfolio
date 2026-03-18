import { cn } from "@/lib/utils";

type TagProps = {
  label: string;
  className?: string;
};

export default function Tag({ label, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center rounded-full px-3 text-sm leading-none",
        "bg-[var(--tag-background)] text-[var(--tag-foreground)]",
        className
      )}
    >
      {label}
    </span>
  );
}