import Image from "next/image";
import Button from "@/components/ui/Button";
import InternalLink from "@/components/ui/InternalLink";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Header() {
  return (
    <header className="site-header header-surface">
      <div className="site-header-inner">
        <div className="flex h-14 items-center">
          <div className="flex min-w-0 items-center gap-2">
            <div className="relative h-5 w-5 flex-shrink-0 overflow-hidden rounded-[var(--radius-xs)]">
              <Image
                src="/images/profile-photo.png"
                alt="Denis Knyazev"
                fill
                className="object-cover"
                sizes="20px"
              />
            </div>

            <div className="flex min-w-0 items-center gap-2">
              <span className="text-title-3 text-caps text-[var(--color-foreground-primary)]">
                Denis Knyazev
              </span>

              <span className="text-title-3 text-caps text-[var(--color-foreground-secondary)]">
                Product Designer
              </span>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-8">
            <a href="#contacts">
              <Button variant="primary" size="s" buttonStyle="default">
                Get in touch
              </Button>
            </a>

            <div className="flex items-center gap-1">
              <InternalLink state="inactive" href="#ru">
                Py
              </InternalLink>

              <span className="text-link text-[var(--color-foreground-tertiary)]">
                /
              </span>

              <InternalLink state="active" href="#en">
                En
              </InternalLink>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}