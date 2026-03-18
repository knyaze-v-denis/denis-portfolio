import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "m" | "s";
export type ButtonStyle = "default" | "only-icon";

type ButtonProps = {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  buttonStyle?: ButtonStyle;
  className?: string;
  ariaLabel?: string;
};

export default function Button({
  children,
  variant = "primary",
  size = "m",
  buttonStyle = "default",
  className,
  ariaLabel,
}: ButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cn(
        "ui-button",
        `ui-button--${variant}`,
        `ui-button--${size}`,
        `ui-button--${buttonStyle}`,
        className
      )}
    >
      {children}
    </button>
  );
}