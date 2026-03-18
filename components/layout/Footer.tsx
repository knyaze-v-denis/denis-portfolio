import ExternalLink from "@/components/ui/ExternalLink";

export default function Footer() {
  return (
    <footer className="site-footer border-t border-[var(--color-border)]">
      <div className="site-footer-inner">
        <div className="flex min-h-16 items-center">
          <p className="text-title-3 text-[var(--color-foreground-tertiary)]">
            ©2026. All rights reserved
          </p>

          <div className="ml-auto flex items-center gap-[0.375rem]">
            <span className="text-title-3 text-[var(--color-foreground-tertiary)]">
              Designed by
            </span>

            <ExternalLink variant="secondary" href="#">
              Denis Knyazev
            </ExternalLink>
          </div>
        </div>
      </div>
    </footer>
  );
}