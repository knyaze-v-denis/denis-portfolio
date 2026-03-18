import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
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
    <main className="min-h-screen py-10">
      <Container>
        <div className="surface-card p-8 md:p-10">
          <div className="space-y-10">
            <section className="space-y-5">
              <SectionLabel>System Preview</SectionLabel>

              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-[-0.03em]">
                  Denis Portfolio
                </h1>
                <p className="max-w-2xl text-base leading-7 text-[var(--muted-foreground)]">
                  This screen is a technical preview of the design foundation:
                  container, card surface, section label, tags and buttons.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button>Get in touch</Button>
                <Button variant="secondary">Behance</Button>
                <Button variant="secondary">Telegram</Button>
              </div>
            </section>

            <div className="section-divider" />

            <section className="space-y-5">
              <SectionLabel>Hard Skills</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {hardSkills.map((skill) => (
                  <Tag key={skill} label={skill} />
                ))}
              </div>
            </section>

            <section className="space-y-5">
              <SectionLabel>Soft Skills</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <Tag key={skill} label={skill} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}