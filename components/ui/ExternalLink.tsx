import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ExternalLinkVariant = "primary" | "secondary";

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: ExternalLinkVariant;
  className?: string;
};

export default function ExternalLink({
  href,
  children,
  variant = "primary",
  className,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "ui-external-link",
        `ui-external-link--${variant}`,
        className
      )}
    >
      {children}
      <ArrowUpRight size={16} className="ui-external-link__icon" />
    </a>
  );
}