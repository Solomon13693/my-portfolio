import { Reveal } from '@/components/motion'
import { ProjectChanges, ProjectOwnershipFooter } from '@/components/sections'
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

      {project.changes && (
        <Reveal>
          <div className="border-b border-line">
            <div className="container space-y-6 py-10 sm:py-14">
              <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Before / after</p>
              <ProjectChanges changes={project.changes} />
              <ProjectOwnershipFooter project={project} stackLimit={10} />
            </div>
          </div>
        </Reveal>
      )}

      <Reveal>
        <CaseStudySections project={project} />
      </Reveal>
    </div>
  )
}

export default WorkDetailView
