"use client";

import { SunMoon } from "lucide-react";
import { useState } from "react";

type ThemeMode = "light" | "dark";

type DocumentWithTransition = Document & {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>;
  };
};

function getCurrentTheme(): ThemeMode {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(getCurrentTheme);

  function applyTheme(nextTheme: ThemeMode) {
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    sessionStorage.setItem("theme", nextTheme);
  }

  function toggleTheme(event: React.MouseEvent<HTMLButtonElement>) {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";

    const supportsTransition =
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      typeof (document as DocumentWithTransition).startViewTransition ===
        "function";

    if (!supportsTransition) {
      applyTheme(nextTheme);
      setTheme(nextTheme);
      return;
    }

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    document.documentElement.style.setProperty("--theme-toggle-x", `${x}px`);
    document.documentElement.style.setProperty("--theme-toggle-y", `${y}px`);

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.style.setProperty(
      "--theme-toggle-end-radius",
      `${endRadius}px`
    );

    const transition = (document as DocumentWithTransition).startViewTransition!(
      () => {
        applyTheme(nextTheme);
        setTheme(nextTheme);
      }
    );

    transition.ready.catch(() => {
      applyTheme(nextTheme);
      setTheme(nextTheme);
    });
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="ui-theme-toggle"
      onClick={toggleTheme}
    >
      <SunMoon size={20} />
    </button>
  );
}