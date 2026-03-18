type TimelineItemProps = {
  title: string;
  lines: string[];
  secondaryLines?: number[];
};

export default function TimelineItem({
  title,
  lines,
  secondaryLines = [],
}: TimelineItemProps) {
  return (
    <article className="ui-timeline-item">
      <div className="ui-timeline-item__title">{title}</div>

      <div className="ui-timeline-item__content">
        {lines.map((line, index) => (
          <p
            key={index}
            className={
              secondaryLines.includes(index)
                ? "ui-timeline-item__secondary"
                : "ui-timeline-item__primary"
            }
          >
            {line}
          </p>
        ))}
      </div>
    </article>
  );
}