import type { Metadata } from 'next'
import AboutView from '@/views/about'
import { ROUTES, getPageMetadata } from '@/constants'

export const metadata: Metadata = getPageMetadata(ROUTES.about)

export default function AboutPage() {
  return <AboutView />
}
