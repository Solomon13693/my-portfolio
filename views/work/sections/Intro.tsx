import { PageHeader } from '@/components/sections'

export function Intro() {
  return (
    <PageHeader
      eyebrow="In production"
      title="Projects"
      description="Booking, payments, logistics — shipped on web, mobile, and backend."
      sidebarLabels={['Web apps', 'Mobile apps', 'Backend']}
    />
  )
}

export default Intro
