import type { Project } from '@/types'

interface OverviewProps {
  project: Project
}

export function Overview({ project }: OverviewProps) {
  return (
    <div className="border-b border-line">
      <div className="container space-y-4 py-10 sm:py-16">
        <p className="max-w-7xl text-xl sm:text-2xl md:text-3xl leading-tight font-medium text-balance lg:text-4xl">
          {project.description}
        </p>
        <p className="max-w-2xl text-muted-foreground">{project.summary}</p>
      </div>
    </div>
  )
}

export default Overview
