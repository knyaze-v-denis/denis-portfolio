import Image from "next/image";
import InViewClass from "@/components/motion/InViewClass";
import Reveal from "@/components/motion/Reveal";
import ExternalLink from "@/components/ui/ExternalLink";

const contactLinks = [
  {
    label: "knyaze.v.denis@yandex.ru",
    href: "mailto:knyaze.v.denis@yandex.ru",
  },
  {
    label: "t.me/knyaze_v_denis",
    href: "https://t.me/knyaze_v_denis",
  },
];

export default function HeroSection() {
  return (
    <InViewClass as="section" className="section-frame hero-shell" threshold={0.2}>
      <div className="flex items-start gap-[var(--space-4)]">
        <Reveal variant="image" threshold={0.01}>
          <div className="relative h-[10rem] w-[10rem] flex-shrink-0 overflow-hidden rounded-[var(--radius-sm)]">
            <Image
              src="/images/profile-photo.png"
              alt="Denis Knyazev"
              fill
              sizes="160px"
              priority
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="flex h-[10rem] flex-1 flex-col justify-between">
          <div className="flex flex-col gap-[var(--space-1)]">
            <Reveal variant="title" delay={0}>
              <h1 className="text-title-2 text-caps tracking-[-0.01em]">
                Denis Knyazev
              </h1>
            </Reveal>

            <Reveal variant="title" delay={75}>
              <p className="text-title-2 text-caps text-[var(--color-foreground-primary)]">
                Product Designer
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-[var(--space-1)]">
            {contactLinks.map((link, index) => (
              <Reveal key={link.label} variant="body" delay={150 + index * 75}>
                <ExternalLink href={link.href} variant="secondary">
                  {link.label}
                </ExternalLink>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Reveal variant="title" delay={225}>
        <p className="max-w-[40rem] text-large-title tracking-[-0.02em] text-[var(--color-foreground-primary)]">
          I&apos;m a passionate designer with five years of experience in the
          field. I specialize in creating user-centered designs that are both
          beautiful and functional. I&apos;m excited to continue growing as a
          designer and make a positive impact on the world.
        </p>
      </Reveal>
    </InViewClass>
  );
}