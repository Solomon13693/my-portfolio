import { ProjectsGrid, Reveal } from '@/components'
import { Intro } from './sections'

export function WorkView() {
  return (
    <div className="w-full">
      <Reveal y={0}>
        <Intro />
      </Reveal>

      <Reveal>
        <ProjectsGrid />
      </Reveal>
    </div>
  )
}

export default WorkView
