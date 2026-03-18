import { cn } from "@/lib/utils";

export type ProjectTagVariant = "primary" | "secondary";

type ProjectTagProps = {
  children: React.ReactNode;
  variant?: ProjectTagVariant;
  className?: string;
};

export default function ProjectTag({
  children,
  variant = "secondary",
  className,
}: ProjectTagProps) {
  return (
    <span
      className={cn(
        "ui-project-tag",
        `ui-project-tag--${variant}`,
        className
      )}
    >
      {children}
    </span>
  );
}