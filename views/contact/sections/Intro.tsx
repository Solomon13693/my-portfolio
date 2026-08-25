import { PageHeader } from '@/components'

export function Intro() {
  return (
    <PageHeader
      eyebrow="Get in touch"
      title="Contact"
      description="Have a project in mind, an opportunity to discuss, or just want to connect? I’d love to hear from you."
      sidebarLabels={['Email', 'Connect', 'Message']}
    />
  )
}

export default Intro