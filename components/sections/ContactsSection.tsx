import Reveal from "@/components/motion/Reveal";
import StaggerReveal from "@/components/motion/StaggerReveal";
import ContentSection from "@/components/sections/ContentSection";
import Button from "@/components/ui/Button";

const contacts = [
  {
    label: "Telegram",
    href: "https://t.me/knyaze_v_denis",
    variant: "primary" as const,
  },
  {
    label: "E-mail",
    href: "mailto:knyaze.v.denis@yandex.ru",
    variant: "secondary" as const,
  },
  {
    label: "Behance",
    href: "#",
    variant: "secondary" as const,
  },
  {
    label: "Download CV",
    href: "#",
    variant: "secondary" as const,
  },
];

export default function ContactsSection() {
  return (
    <ContentSection id="contacts" label="Contacts">
      <Reveal variant="title">
        <h2 className="text-large-title text-[var(--color-foreground-primary)]">
          Let’s work together or just say hello.
        </h2>
      </Reveal>

      <StaggerReveal
        variant="tag"
        step={75}
        threshold={0.2}
        className="flex flex-wrap gap-[var(--space-4)]"
        itemAs="span"
      >
        {contacts.map((contact) => (
          <a key={contact.label} href={contact.href}>
            <Button variant={contact.variant} size="m" buttonStyle="default">
              {contact.label}
            </Button>
          </a>
        ))}
      </StaggerReveal>
    </ContentSection>
  );
}