"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";

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
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;

    const ripple = document.createElement("span");
    ripple.className = "ui-button__ripple";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;

    button.appendChild(ripple);

    ripple.addEventListener(
      "animationend",
      () => {
        ripple.remove();
      },
      { once: true }
    );
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={ariaLabel}
      onPointerDown={handlePointerDown}
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