"use client";

import Image from "next/image";
import Link from "next/link";
import { SendHorizontal } from "lucide-react";
import Button from "@/components/ui/Button";
import InternalLink from "@/components/ui/InternalLink";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTranslations } from "@/lib/i18n/useTranslations";

export default function Header() {
  const { locale, setLocale, t } = useTranslations();

  return (
    <header className="site-header header-surface">
      <div className="site-header-inner">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2"
            aria-label="Go to homepage"
          >
            <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-[var(--radius-xs)] md:h-5 md:w-5">
              <Image
                src="/images/profile-photo.png"
                alt={t.header.name}
                fill
                className="object-cover"
                sizes="(max-width: 767px) 32px, 20px"
              />
            </div>

            <div className="flex min-w-0 flex-col leading-none md:flex-row md:items-center md:gap-2">
              <span className="text-title-3 text-caps text-[var(--color-foreground-primary)]">
                {t.header.name}
              </span>

              <span className="text-title-3 text-caps text-[var(--color-foreground-secondary)]">
                {t.header.role}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4 md:gap-8">
            <a href="#contacts" aria-label={t.header.cta} className="md:hidden">
              <Button
                variant="primary"
                size="s"
                buttonStyle="only-icon"
                ariaLabel={t.header.cta}
              >
                <SendHorizontal size={16} />
              </Button>
            </a>

            <a href="#contacts" className="hidden md:block">
              <Button variant="primary" size="s" buttonStyle="default">
                {t.header.cta}
              </Button>
            </a>

            <div className="hidden md:flex md:items-center md:gap-1">
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

            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}