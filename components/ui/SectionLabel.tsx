type SectionLabelProps = {
  children: React.ReactNode;
};

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-title-3 text-caps text-[var(--color-foreground-secondary)] tracking-[0.08em]">
      [ {children} ]
    </p>
  );
}