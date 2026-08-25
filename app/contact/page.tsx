import type { Metadata } from 'next'
import ContactView from '@/views/contact'
import { ROUTES, getPageMetadata } from '@/constants'

export const metadata: Metadata = getPageMetadata(ROUTES.contact)

export default function ContactPage() {
  return <ContactView />
}
