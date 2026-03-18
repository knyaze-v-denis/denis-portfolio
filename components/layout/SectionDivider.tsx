import InViewClass from "@/components/motion/InViewClass";

export default function SectionDivider() {
  return (
    <InViewClass className="section-divider" threshold={0.2}>
      <span className="section-divider-right" />
    </InViewClass>
  );
}