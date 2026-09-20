import { PageHeader } from '@/components/sections'

export function Intro() {
  return (
    <PageHeader
      eyebrow="Get in touch"
      title="Contact"
      description="Hiring for booking, payments, or logistics products? Or a collaboration on web, mobile, or full-stack? I'm in Lagos (UTC+1) and open to remote. A short note about the problem is enough."
      sidebarLabels={['Email', 'Connect', 'Message']}
    />
  )
}

export default Intro