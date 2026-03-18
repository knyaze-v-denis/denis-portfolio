import { cn } from "@/lib/utils";

export type InternalLinkState = "active" | "inactive";

type InternalLinkProps = {
  children: React.ReactNode;
  href?: string;
  state?: InternalLinkState;
  className?: string;
};

export default function InternalLink({
  children,
  href = "#",
  state = "inactive",
  className,
}: InternalLinkProps) {
  return (
    <a
      href={href}
      aria-current={state === "active" ? "page" : undefined}
      className={cn(
        "ui-internal-link",
        `ui-internal-link--${state}`,
        className
      )}
    >
      {children}
    </a>
  );
}