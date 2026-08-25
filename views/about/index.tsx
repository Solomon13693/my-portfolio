import { ServicesGrid, Experience, Education, TechStack, Reveal } from '@/components'
import { Intro, Bio } from './sections'

export function AboutView() {
  return (
    <div className="w-full">

      <Reveal y={0}>
        <Intro />
      </Reveal>

      <Reveal>
        <Bio />
      </Reveal>

      <Reveal>
        <Experience />
      </Reveal>

      <Reveal>
        <Education />
      </Reveal>

      <Reveal>
        <TechStack />
      </Reveal>

      <Reveal>
        <ServicesGrid />
      </Reveal>

    </div>
  )
}

export default AboutView
