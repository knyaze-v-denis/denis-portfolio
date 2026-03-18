import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  className,
}: ButtonProps) {
  const variantClassName =
    variant === "primary"
      ? "bg-[var(--button-primary-background)] text-[var(--button-primary-foreground)]"
      : "bg-[var(--button-secondary-background)] text-[var(--button-secondary-foreground)]";

  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors",
        variantClassName,
        className
      )}
    >
      {children}
    </button>
  );
}