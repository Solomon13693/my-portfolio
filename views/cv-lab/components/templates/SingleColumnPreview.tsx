'use client'

import type { ResumeDraft } from '@/types'
import { visibleSections } from './shared'
import { ProfileHeader, renderSection } from './SectionBlocks'

export function SingleColumnPreview({ draft }: { draft: ResumeDraft }) {
  const sections = visibleSections(draft)
  return (
    <div>
      <ProfileHeader draft={draft} theme={draft.theme} />
      {sections.map((section) => renderSection(section, draft.theme))}
    </div>
  )
}

export default SingleColumnPreview
