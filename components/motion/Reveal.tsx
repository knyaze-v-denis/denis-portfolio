"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type RevealVariant = "image" | "title" | "body" | "card" | "tag";

type RevealProps = {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  threshold?: number;
  className?: string;
  as?: "div" | "span";
};

export default function Reveal({
  children,
  variant = "body",
  delay = 0,
  threshold = 0.2,
  className,
  as = "div",
}: RevealProps) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || revealed) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.requestAnimationFrame(() => setRevealed(true));
      return () => window.cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        setRevealed(true);
        observer.disconnect();
      },
      { threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [revealed, threshold]);

  const Component = as;

  return (
    <Component
      ref={ref as never}
      className={cn(
        "ui-reveal",
        `ui-reveal--${variant}`,
        revealed && "is-revealed",
        className
      )}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}