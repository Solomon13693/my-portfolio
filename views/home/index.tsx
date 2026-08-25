import { TechStack, Reveal } from '@/components'
import { IntroBanner, Hero, Overview, Hello, GitHubContributions, Journey } from './sections'

export function HomeView() {
  return (
    <div className="w-full">

      <Reveal y={0}>
        <IntroBanner />
      </Reveal>

      <Reveal>
        <Hero />
      </Reveal>

      <Reveal>
        <Overview />
      </Reveal>

      <Reveal>
        <Hello />
      </Reveal>

      <Reveal>
        <GitHubContributions />
      </Reveal>

      <Reveal>
        <Journey />
      </Reveal>

      <Reveal>
        <TechStack />
      </Reveal>

    </div>
  )
}

export default HomeView
