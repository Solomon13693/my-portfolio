import { PageHeader } from '@/components'

export function Intro() {
  return (
    <PageHeader
      eyebrow="Get in touch"
      title="Contact"
      description="Have a project in mind, a role to fill, or just want to say hi? Send a message below."
      sidebarLabels={['Email', 'Call', 'Message']}
    />
  )
}

export default Intro
