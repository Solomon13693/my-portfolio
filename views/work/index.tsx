import { ProjectsGrid } from '@/components/sections'
import { Reveal } from '@/components/motion'
import { PROJECTS } from '@/data'
import { getProjectCover } from '@/lib/project-media'
import { Intro } from './sections'

export function WorkView() {
  const covers = Object.fromEntries(PROJECTS.map((project) => [project.slug, getProjectCover(project.slug)]))

  return (
    <div className="w-full">
      <Intro />

      <Reveal>
        <ProjectsGrid covers={covers} />
      </Reveal>
    </div>
  )
}

export default WorkView
