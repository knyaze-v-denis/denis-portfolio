import ContentSection from "@/components/sections/ContentSection";
import Button from "@/components/ui/Button";

const contacts = [
  {
    label: "Email me",
    href: "mailto:mail@example.com",
    variant: "primary" as const,
  },
  {
    label: "Telegram",
    href: "https://t.me/username",
    variant: "secondary" as const,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/username",
    variant: "secondary" as const,
  },
  {
    label: "GitHub",
    href: "https://github.com/username",
    variant: "secondary" as const,
  },
];

export default function ContactsSection() {
  return (
    <ContentSection label="Contacts">
      <h2 className="text-large-title text-[var(--color-foreground-primary)]">
        Let’s work together or just say hello.
      </h2>

      <div className="flex flex-wrap gap-[var(--space-4)]">
        {contacts.map((contact) => (
          <a key={contact.label} href={contact.href}>
            <Button variant={contact.variant} size="m" buttonStyle="default">
              {contact.label}
            </Button>
          </a>
        ))}
      </div>
    </ContentSection>
  );
}