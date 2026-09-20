import type { Metadata } from 'next'
import CoverLetterView from '@/views/cv-lab/cover-letter'
import { ROUTES, getPageMetadata } from '@/constants'

export const metadata: Metadata = getPageMetadata(ROUTES.cvLabCoverLetter)

export default function CoverLetterPage() {
  return <CoverLetterView />
}
