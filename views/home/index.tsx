import { Suspense } from 'react'
import { TechStack } from '@/components/sections'
import { Reveal } from '@/components/motion'
import { IntroBanner, Hero, Overview, Hello, GitHubContributions } from './sections'

function GitHubFallback() {
  return (
    <div className="border-b border-line">
      <div className="container py-6 sm:py-10">
        <div className="h-40 rounded-md bg-muted" aria-hidden="true" />
      </div>
    </div>
  )
}

export function HomeView() {
  return (
    <div className="w-full">
      <IntroBanner />
      <Hero />

      <Reveal>
        <Overview />
      </Reveal>

      <Reveal>
        <Hello />
      </Reveal>

      <Suspense fallback={<GitHubFallback />}>
        <GitHubContributions />
      </Suspense>

      <Reveal>
        <TechStack />
      </Reveal>
    </div>
  )
}

export default HomeView
