import Reveal from "@/components/motion/Reveal";
import ExternalLink from "@/components/ui/ExternalLink";

export default function Footer() {
  return (
    <footer className="site-footer border-t border-[var(--color-border)]">
      <div className="site-footer-inner">
        <div className="flex min-h-16 items-center">
          <Reveal variant="body">
            <p className="text-title-3 text-[var(--color-foreground-tertiary)]">
              ©2026. All rights reserved
            </p>
          </Reveal>

          <div className="ml-auto flex items-center gap-[0.375rem]">
            <Reveal variant="body" delay={75}>
              <span className="text-title-3 text-[var(--color-foreground-tertiary)]">
                Designed by
              </span>
            </Reveal>

            <Reveal variant="body" delay={150}>
              <ExternalLink
                variant="secondary"
                href="https://t.me/knyaze_v_denis"
              >
                Denis Knyazev
              </ExternalLink>
            </Reveal>
          </div>
        </div>
      </div>
    </footer>
  );
}