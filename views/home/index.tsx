import { Suspense } from 'react'
import { Experience, TechStack } from '@/components/sections'
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
      <Overview />
      <Hello />
      <TechStack />
      <Experience limit={2} />
      <Suspense fallback={<GitHubFallback />}>
        <GitHubContributions />
      </Suspense>
    </div>
  )
}

export default HomeView
