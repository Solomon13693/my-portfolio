import { PageHeader } from '@/components'

export function Intro() {
  return (
    <PageHeader
      eyebrow="Selected work"
      title="Work"
      description="A few of the products I've helped build and ship."
      sidebarLabels={['Web apps', 'Dashboards', 'APIs']}
    />
  )
}

export default Intro
