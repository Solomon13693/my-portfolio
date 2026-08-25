import { PageHeader } from '@/components'

export function Intro() {
  return (
    <PageHeader
      eyebrow="Selected work"
      title="Work"
      description="A selection of software I've built across web, mobile, frontend, backend, and APIs."
      sidebarLabels={['Web apps', 'Mobile apps', 'Backend']}
    />
  )
}

export default Intro
