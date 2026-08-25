import { ProjectsGrid } from '@/components/sections'
import { Reveal } from '@/components/motion'
import { Intro } from './sections'

export function WorkView() {
  return (
    <div className="w-full">
      <Intro />

      <Reveal>
        <ProjectsGrid />
      </Reveal>
    </div>
  )
}

export default WorkView
