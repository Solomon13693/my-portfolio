'use client'

import type { ResumeDraft } from '@/types'
import { visibleSections } from './shared'
import { ProfileHeader, renderSection } from './SectionBlocks'

export function SidebarPreview({ draft, side }: { draft: ResumeDraft; side: 'left' | 'right' }) {
  const main = visibleSections(draft, 'main')
  const sidebar = visibleSections(draft, 'sidebar')
  const theme = draft.theme

  const sidebarEl = (
    <aside
      className="w-[48%] min-w-[340px] shrink-0 space-y-5 overflow-x-hidden p-5 sm:p-6 md:p-7"
      style={{
        background: theme.accentColor,
        color: theme.bodyColor,
        lineHeight: 1.55,
      }}
    >
      <div>
        <h1
          className="text-[1.25rem] leading-snug font-bold break-words sm:text-[1.35rem]"
          style={{ color: theme.headingColor, fontFamily: 'var(--cv-heading-font)' }}
        >
          {draft.profile.name}
        </h1>
        {draft.profile.headline ? (
          <p className="mt-1.5 text-[0.9rem] leading-relaxed" style={{ color: theme.mutedColor }}>
            {draft.profile.headline}
          </p>
        ) : null}
        <div className="mt-4 space-y-1.5 break-words text-[0.82rem] leading-relaxed" style={{ color: theme.mutedColor }}>
          {draft.profile.email ? <p className="break-all">{draft.profile.email}</p> : null}
          {draft.profile.phone ? <p>{draft.profile.phone}</p> : null}
          {draft.profile.location ? <p>{draft.profile.location}</p> : null}
          {draft.profile.links.map((link) => (
            <p key={link.id} className="break-all">
              {link.url || link.label}
            </p>
          ))}
        </div>
      </div>
      <div className="space-y-5 text-[0.9rem] leading-relaxed [&_h2]:mb-2 [&_h2]:mt-0 [&_h2]:text-[0.72rem] [&_section]:mt-0 [&_ul]:space-y-1 [&_p]:mb-1.5">
        {sidebar.map((section) => renderSection(section, theme))}
      </div>
    </aside>
  )

  const mainEl = (
    <div className="min-w-0 flex-1 space-y-1 p-6 sm:p-7" style={{ lineHeight: 1.55 }}>
      {side === 'right' ? <ProfileHeader draft={draft} theme={theme} /> : null}
      {main.map((section) => renderSection(section, theme))}
    </div>
  )

  return (
    <div className="flex min-h-[calc(100dvh-10rem)] w-full flex-row">
      {side === 'left' ? (
        <>
          {sidebarEl}
          {mainEl}
        </>
      ) : (
        <>
          {mainEl}
          {sidebarEl}
        </>
      )}
    </div>
  )
}

export default SidebarPreview
