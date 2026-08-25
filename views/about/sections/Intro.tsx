import { PageHeader } from '@/components/sections'
import { ABOUT } from '@/data'

export function Intro() {
  return (
    <PageHeader
      eyebrow="About me"
      title="About"
      description={ABOUT.headline}
      sidebarLabels={['Frontend', 'Mobile', 'Backend']}
    />
  )
}

export default Intro