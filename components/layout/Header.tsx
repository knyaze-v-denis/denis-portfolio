import Button from "@/components/ui/Button";

export default function Header() {
  return (
    <header className="header-surface">
      <div className="page-shell">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 rounded-[6px] bg-[var(--color-foreground-primary)]/10" />
            <div className="flex items-center gap-2">
              <span className="text-title-3 text-caps">First Name Last Name</span>
              <span className="text-title-3 text-[var(--color-foreground-secondary)]">
                Position
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button className="h-10 px-4 text-button-small">Get in touch</Button>

            <div className="flex items-center gap-2 text-title-3 text-[var(--color-foreground-secondary)]">
              <span className="text-[var(--color-foreground-primary)]">Py</span>
              <span>/</span>
              <span>En</span>
            </div>

            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full surface-button-secondary"
              aria-label="Toggle theme"
            >
              <span className="text-title-3">◐</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}