type SectionLabelProps = {
  children: React.ReactNode;
};

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-title-3 text-caps tracking-[0.08em] text-[var(--color-foreground-secondary)]">
      [ {children} ]
    </p>
  );
}