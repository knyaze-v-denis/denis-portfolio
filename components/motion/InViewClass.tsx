"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type InViewClassProps = {
  children?: React.ReactNode;
  className?: string;
  revealedClassName?: string;
  threshold?: number;
  as?: "div" | "section";
  id?: string;
};

export default function InViewClass({
  children,
  className,
  revealedClassName = "is-in-view",
  threshold = 0.2,
  as = "div",
  id,
}: InViewClassProps) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || revealed) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.requestAnimationFrame(() => {
        setRevealed(true);
      });

      return () => window.cancelAnimationFrame(frame);
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
      id={id}
      ref={ref as never}
      className={cn(className, revealed && revealedClassName)}
    >
      {children}
    </Component>
  );
}