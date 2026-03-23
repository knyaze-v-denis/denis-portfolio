import ProjectCard, {
  type ProjectCardProps,
} from '@/components/projects/ProjectCard'
import InViewClass from '@/components/motion/InViewClass'
import Reveal from '@/components/motion/Reveal'

type NotFoundRecommendationsSectionProps = {
  locale: string
  title?: string
  projects?: ProjectCardProps[]
}

export default function NotFoundRecommendationsSection({
  locale,
  title,
  projects = [],
}: NotFoundRecommendationsSectionProps) {
  const resolvedTitle =
    title ??
    (locale === 'ru'
      ? 'Посмотрите мои проекты'
      : 'Take a look at my projects')

  return (
    <InViewClass as="section" className="section-frame">
      <div className="section-shell">
        <div className="not-found-recommendations">
          <Reveal variant="body" as="div">
            <h2 className="not-found-recommendations__title text-title-3">
              {resolvedTitle}
            </h2>
          </Reveal>

          <div className="not-found-recommendations__list">
            {projects.map((project, index) => (
              <Reveal
                key={project?.href ?? `${project?.title}-${index}`}
                variant="body"
                as="div"
                delay={index * 75}
              >
                <ProjectCard {...project} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </InViewClass>
  )
}
