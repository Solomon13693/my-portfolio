import type { Project } from '@/types'
import { periodRecencyMs } from '@/lib/format-period-duration'
import { PROJECTS } from './projects'

/**
 * Homepage selected systems: one card per employer tenure from the CV,
 * with sibling products linked as related case studies.
 */
export interface FeaturedWorkEntry {
  /** Primary case study shown on the homepage */
  slug: string
  /** Extra case studies under the same CV employment */
  relatedSlugs?: string[]
  highlights: string[]
}

export const FEATURED_WORK: FeaturedWorkEntry[] = [
  {
    slug: 'run-delivery',
    relatedSlugs: ['run-web'],
    highlights: [
      'Merchant dashboard + public business API on the same NestJS dispatch as riders',
      'Quote, wallet debit, and order write commit together; fails closed on insufficient balance',
      'HMAC-signed webhooks with BullMQ retries, dead-letter, and outbox recovery',
      'Live tracking over Socket.IO and FCM; ops assignment with radius and mode filters',
    ],
  },
  {
    slug: 'klone',
    relatedSlugs: ['klone-customer'],
    highlights: [
      'Web booking path: search, listings, provider pages, checkout, QR tickets, maps',
      'Customer React Native app alongside admin and business web surfaces',
      'Realtime messaging, OneSignal push, Mixpanel analytics across platforms',
      '3,000+ users across customer, vendor, and administrative products',
    ],
  },
]

export type FeaturedProject = Project & {
  highlights: string[]
  related: Project[]
}

export function getFeaturedProjects(): FeaturedProject[] {
  return FEATURED_WORK.map((entry) => {
    const project = PROJECTS.find((p) => p.slug === entry.slug)
    if (!project) throw new Error(`Featured work slug missing in PROJECTS: ${entry.slug}`)
    const related = (entry.relatedSlugs ?? [])
      .map((slug) => PROJECTS.find((p) => p.slug === slug))
      .filter((p): p is Project => Boolean(p))
    return { ...project, highlights: entry.highlights, related }
  }).sort((a, b) => periodRecencyMs(b.period) - periodRecencyMs(a.period))
}
