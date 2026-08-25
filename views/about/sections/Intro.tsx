import { PageHeader } from '@/components'
import { ABOUT } from '@/data'

export function Intro() {
  return (
    <PageHeader
      eyebrow="About us"
      title="About"
      description={ABOUT.headline}
      sidebarLabels={['Frontend', 'Backend', 'Full stack']}
    />
  )
}

export default Intro