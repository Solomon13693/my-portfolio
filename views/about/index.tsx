import { ServicesGrid, Experience, Education, Certifications, TechStack } from '@/components/sections'
import { Reveal } from '@/components/motion'
import { Intro, Bio } from './sections'

export function AboutView() {
  return (
    <div className="w-full">
      <Intro />

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
        <Certifications />
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
