"use client";

import Reveal from "@/components/motion/Reveal";
import ExternalLink from "@/components/ui/ExternalLink";
import InternalLink from "@/components/ui/InternalLink";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTranslations } from "@/lib/i18n/useTranslations";

export default function Footer() {
  const { t, locale, setLocale } = useTranslations();

  return (
    <footer
      key={locale}
      className="site-footer border-t border-[var(--color-border)]"
    >
      <div className="site-footer-inner">
        <div className="hidden min-h-16 items-center md:flex">
          <Reveal key={`${locale}-footer-copy`} variant="body">
            <p className="text-title-3 text-[var(--color-foreground-tertiary)]">
              {t.footer.copyright}
            </p>
          </Reveal>

          <div className="ml-auto flex items-center gap-[0.375rem]">
            <Reveal key={`${locale}-footer-designed`} variant="body" delay={75}>
              <span className="text-title-3 text-[var(--color-foreground-tertiary)]">
                {t.footer.designedBy}
              </span>
            </Reveal>

            <Reveal key={`${locale}-footer-author`} variant="body" delay={150}>
              <ExternalLink variant="secondary" href={t.footer.authorHref}>
                {t.footer.author}
              </ExternalLink>
            </Reveal>
          </div>
        </div>

        <div className="flex flex-col gap-6 py-5 md:hidden">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setLocale("ru")}>
                <InternalLink state={locale === "ru" ? "active" : "inactive"}>
                  {t.header.localeRu}
                </InternalLink>
              </button>

              <span className="text-link text-[var(--color-foreground-tertiary)]">
                /
              </span>

              <button type="button" onClick={() => setLocale("en")}>
                <InternalLink state={locale === "en" ? "active" : "inactive"}>
                  {t.header.localeEn}
                </InternalLink>
              </button>
            </div>

            <ThemeToggle />
          </div>

          <div className="flex items-center gap-[0.375rem]">
            <Reveal key={`${locale}-footer-designed-mobile`} variant="body">
              <span className="text-title-3 text-[var(--color-foreground-tertiary)]">
                {t.footer.designedBy}
              </span>
            </Reveal>

            <Reveal
              key={`${locale}-footer-author-mobile`}
              variant="body"
              delay={75}
            >
              <ExternalLink variant="secondary" href={t.footer.authorHref}>
                {t.footer.author}
              </ExternalLink>
            </Reveal>
          </div>

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