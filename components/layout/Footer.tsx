export default function Footer() {
  return (
    <footer className="mt-[var(--space-20)] border-t border-[var(--color-border)]">
      <div className="page-shell">
        <div className="flex min-h-16 items-center justify-between gap-4 py-4">
          <p className="text-body text-[var(--color-foreground-tertiary)]">
            ©2026. All rights reserved
          </p>

          <p className="text-body text-[var(--color-foreground-tertiary)]">
            Designed by Denis Knyazev ↗
          </p>
        </div>
      </div>
    </footer>
  );
}