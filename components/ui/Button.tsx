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
      ? "surface-button-primary"
      : "surface-button-secondary";

  return (
    <button
      className={cn(
        "text-button inline-flex h-11 items-center justify-center rounded-full px-5 transition-colors",
        variantClassName,
        className
      )}
    >
      {children}
    </button>
  );
}