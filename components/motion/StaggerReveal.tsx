"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type StaggerRevealProps = {
  children: React.ReactNode[];
  variant?: "tag";
  step?: number;
  threshold?: number;
  className?: string;
  itemAs?: "span" | "div";
};

export default function StaggerReveal({
  children,
  variant = "tag",
  step = 75,
  threshold = 0.2,
  className,
  itemAs = "span",
}: StaggerRevealProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || started) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.requestAnimationFrame(() => {
        setRevealedCount(children.length);
        setStarted(true);
      });

      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        setStarted(true);
        observer.disconnect();
      },
      { threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [children.length, started, threshold]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const timers: number[] = [];

    const revealNext = () => {
      index += 1;
      setRevealedCount(index);

      if (index < children.length) {
        const id = window.setTimeout(revealNext, step);
        timers.push(id);
      }
    };

    const first = window.setTimeout(revealNext, 0);
    timers.push(first);

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [started, children.length, step]);

  const Item = itemAs;

  return (
    <div ref={containerRef} className={className}>
      {children.map((child, index) => (
        <Item
          key={index}
          className={cn(
            "ui-reveal",
            `ui-reveal--${variant}`,
            index < revealedCount && "is-revealed"
          )}
        >
          {child}
        </Item>
      ))}
    </div>
  );
}