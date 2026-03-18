import Image from "next/image";
import ExternalLink from "@/components/ui/ExternalLink";

const contactLinks = [
  {
    label: "example@mail.com",
    href: "#",
  },
  {
    label: "t.me/username",
    href: "#",
  },
];

export default function HeroSection() {
  return (
    <section className="section-frame hero-shell">
      <div className="flex items-start gap-[var(--space-4)]">
        <div className="relative h-[10rem] w-[10rem] flex-shrink-0 overflow-hidden rounded-[var(--radius-sm)]">
          <Image
            src="/images/profile-photo.png"
            alt="First Name Last Name"
            fill
            className="object-cover"
            sizes="160px"
            priority
          />
        </div>

        <div className="flex h-[10rem] flex-1 flex-col justify-between">
          <div className="flex flex-col gap-[var(--space-1)]">
            <h1 className="text-title-2 text-caps tracking-[-0.01em]">
              FIRST NAME LAST NAME
            </h1>

            <p className="text-title-2 text-caps text-[var(--color-foreground-primary)]">
              POSITION
            </p>
          </div>

          <div className="flex flex-col gap-[var(--space-1)]">
            {contactLinks.map((link) => (
              <ExternalLink
                key={link.label}
                href={link.href}
                variant="secondary"
              >
                {link.label}
              </ExternalLink>
            ))}
          </div>
        </div>
      </div>

      <p className="max-w-[40rem] text-large-title tracking-[-0.02em] text-[var(--color-foreground-primary)]">
        I&apos;m a passionate designer with five years of experience in the
        field. I specialize in creating user-centered designs that are both
        beautiful and functional. I&apos;m excited to continue growing as a
        designer and make a positive impact on the world.
      </p>
    </section>
  );
}