type SectionLabelProps = {
  children: React.ReactNode;
};

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-[12px] uppercase tracking-[0.08em] text-black/45">
      [ {children} ]
    </p>
  );
}