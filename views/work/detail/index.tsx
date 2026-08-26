import { Reveal } from '@/components/motion'
import type { Project, ProjectMediaItem } from '@/types'
import { Header, ProjectMeta, Media, Overview, CaseStudySections } from './sections'

interface WorkDetailViewProps {
  project: Project
  media: ProjectMediaItem[]
}

export function WorkDetailView({ project, media }: WorkDetailViewProps) {
  return (
    <div className="w-full">
      <Header project={project} />

      <Reveal>
        <ProjectMeta project={project} />
      </Reveal>

      <Reveal>
        <Media project={project} media={media} />
      </Reveal>

      <Reveal>
        <Overview project={project} />
      </Reveal>

      <Reveal>
        <CaseStudySections project={project} />
      </Reveal>
    </div>
  )
}

export default WorkDetailView
