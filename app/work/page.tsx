import type { Metadata } from 'next'
import { WorkView } from '@/views'
import { ROUTES, getPageMetadata } from '@/constants'

export const metadata: Metadata = getPageMetadata(ROUTES.work)

export default function WorkPage() {
  return <WorkView />
}
