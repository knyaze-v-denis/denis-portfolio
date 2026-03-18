import { cn } from "@/lib/utils";

type TagProps = {
  label: string;
  className?: string;
};

export default function Tag({ label, className }: TagProps) {
  return (
    <span
      className={cn(
        "surface-tag-secondary inline-flex h-8 items-center rounded-full px-3",
        "text-button-small",
        className
      )}
    >
      {label}
    </span>
  );
}