import type { Metadata } from 'next'
import { CV_LAB_SHELL_CLASS } from '@/lib'
import { ROUTES, getPageMetadata } from '@/constants'
import { NavTabs } from '@/views/cv-lab/components/NavTabs'

export const metadata: Metadata = getPageMetadata(ROUTES.cvLab)

export default function CvLabLayout({ children }: LayoutProps<'/cv-lab'>) {
  return (
    <div
      className={`${CV_LAB_SHELL_CLASS} flex flex-col pt-4 sm:pt-5 lg:h-[calc(100dvh-var(--header-height))] lg:overflow-hidden`}
    >
      <NavTabs />
      <div className="flex min-h-0 flex-1 flex-col pb-4">{children}</div>
    </div>
  )
}
