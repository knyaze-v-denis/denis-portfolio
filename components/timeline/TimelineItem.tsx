type TimelineItemProps = {
  title: string;
  subtitle: string;
  meta: string;
};

export default function TimelineItem({
  title,
  subtitle,
  meta,
}: TimelineItemProps) {
  return (
    <article className="ui-timeline-item">
      <div className="ui-timeline-item__title">{title}</div>

      <div className="ui-timeline-item__content">
        <p className="ui-timeline-item__subtitle">{subtitle}</p>
        <p className="ui-timeline-item__meta">{meta}</p>
      </div>
    </article>
  );
}