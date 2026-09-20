'use client'

import { useResumeDraft } from '@/hooks'
import { CopyButton } from '@/components/reusable'

export function ResumeReferencePanel() {
  const { draft } = useResumeDraft()

  const summary = draft.sections.find((s) => s.layout === 'text' && s.id === 'summary')
  const summaryText = summary && summary.layout === 'text' ? summary.content : ''

  const bullets = draft.sections
    .filter((s) => s.layout === 'timeline')
    .flatMap((s) => (s.layout === 'timeline' ? s.entries : []))
    .flatMap((entry) => entry.roles.filter((r) => r.visible).flatMap((role) => role.bullets.filter(Boolean)))

  return (
    <div className="max-h-64 overflow-y-auto border border-line p-3">
      <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Resume reference</p>
      <p className="mt-1 text-xs text-muted-foreground">Copy accomplishments into the letter by hand.</p>

      {summaryText ? (
        <div className="group mt-3 flex items-start justify-between gap-2">
          <p className="text-xs text-muted-foreground">{summaryText}</p>
          <CopyButton value={summaryText} label="summary" />
        </div>
      ) : null}

      <div className="mt-2 space-y-2">
        {bullets.map((bullet, i) => (
          <div key={i} className="group flex items-start justify-between gap-2">
            <p className="text-xs text-muted-foreground">{bullet}</p>
            <CopyButton value={bullet} label="bullet" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResumeReferencePanel
