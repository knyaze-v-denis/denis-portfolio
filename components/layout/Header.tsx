"use client";

import type { PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { SendHorizontal } from "lucide-react";
import InternalLink from "@/components/ui/InternalLink";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { usePathname } from "next/navigation";

type HeaderProps = {
  personName?: string;
  personRole?: string;
  personPhotoSrc?: string;
};

function handleButtonRipple(event: PointerEvent<HTMLAnchorElement>) {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();

  const ripple = document.createElement("span");
  ripple.className = "ui-button__ripple";

  const size = Math.max(rect.width, rect.height) * 1.2;
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  button.appendChild(ripple);

  window.setTimeout(() => {
    ripple.remove();
  }, 500);
}

export default function Header({
  personName,
  personRole,
  personPhotoSrc,
}: HeaderProps) {
  const { locale, setLocale, t } = useTranslations();
  const pathname = usePathname();

  const handleContactsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const el = document.getElementById("contacts");

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", `${pathname}#contacts`);
      return;
    }

    window.location.assign("/#contacts");
  };

  const resolvedName = personName ?? t.header.name;
  const resolvedRole = personRole ?? t.header.role;
  const resolvedPhotoSrc = personPhotoSrc ?? "/images/profile-photo.png";

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
                src={resolvedPhotoSrc}
                alt={`${resolvedName} profile photo`}
                fill
                className="object-cover"
                sizes="(max-width: 767px) 32px, 20px"
              />
            </div>

            <div className="flex min-w-0 flex-col leading-none md:flex-row md:items-center md:gap-2">
              <span className="text-title-3 text-caps text-[var(--color-foreground-primary)]">
                {resolvedName}
              </span>

              <span className="text-title-3 text-caps text-[var(--color-foreground-secondary)]">
                {resolvedRole}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4 md:gap-8">
            <Link
              href="/#contacts"
              onClick={handleContactsClick}
              onPointerDown={handleButtonRipple}
              aria-label={t.header.cta}
              className="ui-button ui-button--primary ui-button--s ui-button--only-icon ui-button--default !inline-flex md:!hidden"
            >
              <SendHorizontal size={16} />
            </Link>

            <Link
              href="/#contacts"
              onClick={handleContactsClick}
              onPointerDown={handleButtonRipple}
              aria-label={t.header.cta}
              className="ui-button ui-button--primary ui-button--s ui-button--default !hidden md:!inline-flex"
            >
              {t.header.cta}
            </Link>

            <div className="hidden md:flex md:items-center md:gap-1">
              <button type="button" onClick={() => setLocale("ru")} className="cursor-pointer">
                <InternalLink state={locale === "ru" ? "active" : "inactive"}>
                  {t.header.localeRu}
                </InternalLink>
              </button>

              <span className="text-link text-[var(--color-foreground-tertiary)]">
                /
              </span>

              <button type="button" onClick={() => setLocale("en")} className="cursor-pointer">
                <InternalLink state={locale === "en" ? "active" : "inactive"}>
                  {t.header.localeEn}
                </InternalLink>
              </button>
            </div>

            <div className="hidden h-5 items-center md:flex">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}