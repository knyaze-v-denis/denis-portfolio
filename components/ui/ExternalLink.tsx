import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ExternalLinkVariant = "primary" | "secondary";

type ExternalLinkProps = {
  children: React.ReactNode;
  href?: string;
  variant?: ExternalLinkVariant;
  className?: string;
};

export default function ExternalLink({
  children,
  href = "#",
  variant = "primary",
  className,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "ui-external-link",
        `ui-external-link--${variant}`,
        className
      )}
    >
      <span>{children}</span>
      <ArrowUpRight size={16} />
    </a>
  );
}