import PageLayout from "@/components/layout/PageLayout";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import Tag from "@/components/ui/Tag";

const hardSkills = [
  "UX Design",
  "UI Design",
  "Wireframing",
  "Prototyping",
  "Design Systems",
  "Research",
];

const softSkills = [
  "Communication",
  "Presentation",
  "Teamwork",
  "Problem Solving",
];

export default function Home() {
  return (
    <PageLayout>
      <div className="surface-card p-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-8)]">
          <section className="flex flex-col gap-[var(--space-6)]">
            <SectionLabel>System Preview</SectionLabel>

            <div className="flex flex-col gap-[var(--space-4)]">
              <h1 className="text-large-title">Denis Portfolio</h1>
              <p className="text-body max-w-[560px] text-[var(--color-foreground-secondary)]">
                This screen is a technical preview of the design foundation:
                container, card surface, section label, tags and buttons.
              </p>
            </div>

            <div className="flex flex-wrap gap-[var(--space-3)]">
              <Button>Get in touch</Button>
              <Button variant="secondary">Behance</Button>
              <Button variant="secondary">Telegram</Button>
            </div>
          </section>

          <div className="section-divider" />

          <section className="flex flex-col gap-[var(--space-4)]">
            <SectionLabel>Hard Skills</SectionLabel>
            <div className="flex flex-wrap gap-[var(--space-2)]">
              {hardSkills.map((skill) => (
                <Tag key={skill} label={skill} />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-[var(--space-4)]">
            <SectionLabel>Soft Skills</SectionLabel>
            <div className="flex flex-wrap gap-[var(--space-2)]">
              {softSkills.map((skill) => (
                <Tag key={skill} label={skill} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}