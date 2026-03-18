type ContactLink = {
  label: string;
  href: string;
};

const contactLinks: ContactLink[] = [
  { label: "example@mail.com ↗", href: "#" },
  { label: "t.me/username ↗", href: "#" },
];

export default function HeroSection() {
  return (
    <section className="flex flex-col gap-[var(--space-10)]">
      <div className="grid gap-[var(--space-8)] md:grid-cols-[240px_1fr] md:items-start">
        <div className="overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-border)]">
          <div className="aspect-[4/4] w-full bg-[linear-gradient(135deg,rgba(11,12,14,0.14),rgba(11,12,14,0.04))]" />
        </div>

        <div className="flex flex-col gap-[var(--space-8)]">
          <div className="flex flex-col gap-[var(--space-3)]">
            <h1 className="text-large-title text-caps tracking-[-0.02em]">
              First Name Last Name
            </h1>
            <p className="text-large-title text-caps text-[var(--color-foreground-primary)]">
              Position
            </p>
          </div>

          <div className="flex flex-col gap-[var(--space-2)]">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-link text-[var(--color-foreground-primary)] transition-opacity hover:opacity-70"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className="text-[40px] leading-[1.2] font-medium tracking-[-0.03em] text-[var(--color-foreground-primary)]">
        I&apos;m a passionate designer with five years of experience in the
        field. I specialize in creating user-centered designs that are both
        beautiful and functional. I&apos;m excited to continue growing as a
        designer and make a positive impact on the world.
      </p>
    </section>
  );
}