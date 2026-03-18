import { SunMoon } from "lucide-react";

export default function ThemeToggle() {
  return (
    <button type="button" aria-label="Toggle theme" className="ui-theme-toggle">
      <SunMoon size={20} />
    </button>
  );
}