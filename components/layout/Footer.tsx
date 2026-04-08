"use client";

import Reveal from "@/components/motion/Reveal";
import ExternalLink from "@/components/ui/ExternalLink";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTranslations } from "@/lib/i18n/useTranslations";

type FooterProps = {
  showAside?: boolean;
  asideText?: string;
  asideLinkLabel?: string;
  asideLinkHref?: string;
};

export default function Footer({
  showAside,
  asideText,
  asideLinkLabel,
  asideLinkHref,
}: FooterProps) {
  const { t, locale } = useTranslations();

  const resolvedShowAside = showAside ?? true;
  const resolvedAsideText = asideText || t.footer.designedBy;
  const resolvedAsideLinkLabel = asideLinkLabel || t.footer.author;
  const resolvedAsideLinkHref = asideLinkHref || t.footer.authorHref;

  return (
    <footer
      key={locale}
      className="site-footer border-t border-[var(--color-border)]"
    >
      <div className="site-footer-inner">
        <div className="hidden min-h-14 items-center md:flex">
          <Reveal key={`${locale}-footer-copy`} variant="body">
            <p className="text-title-3 text-[var(--color-foreground-tertiary)]">
              {t.footer.copyright}
            </p>
          </Reveal>

          {resolvedShowAside ? (
            <div className="ml-auto flex items-center gap-[0.375rem]">
              {resolvedAsideText ? (
                <Reveal key={`${locale}-footer-designed`} variant="body" delay={75}>
                  <span className="text-title-3 text-[var(--color-foreground-tertiary)]">
                    {resolvedAsideText}
                  </span>
                </Reveal>
              ) : null}

              {resolvedAsideLinkLabel && resolvedAsideLinkHref ? (
                <Reveal key={`${locale}-footer-author`} variant="body" delay={150}>
                  <ExternalLink variant="secondary" href={resolvedAsideLinkHref}>
                    {resolvedAsideLinkLabel}
                  </ExternalLink>
                </Reveal>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-6 py-5 md:hidden">
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>

          {resolvedShowAside ? (
            <div className="flex items-center gap-[0.375rem]">
              {resolvedAsideText ? (
                <Reveal key={`${locale}-footer-designed-mobile`} variant="body">
                  <span className="text-title-3 text-[var(--color-foreground-tertiary)]">
                    {resolvedAsideText}
                  </span>
                </Reveal>
              ) : null}

              {resolvedAsideLinkLabel && resolvedAsideLinkHref ? (
                <Reveal
                  key={`${locale}-footer-author-mobile`}
                  variant="body"
                  delay={75}
                >
                  <ExternalLink variant="secondary" href={resolvedAsideLinkHref}>
                    {resolvedAsideLinkLabel}
                  </ExternalLink>
                </Reveal>
              ) : null}
            </div>
          ) : null}

          <Reveal key={`${locale}-footer-copy-mobile`} variant="body" delay={150}>
            <p className="text-title-3 text-[var(--color-foreground-tertiary)]">
              {t.footer.copyright}
            </p>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}