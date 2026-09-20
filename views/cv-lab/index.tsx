'use client'

import { useState } from 'react'
import { cn } from '@/lib'
import {
  DraftStatus,
  ResumeJsonBackupControls,
  ExportResumePdfButton,
  ProfileForm,
  SectionsManager,
  SectionsEditor,
  ResumePreview,
  TemplateGallery,
  DesignPanel,
  AiSettingsMenu,
  TranslateResumeButton,
} from './components'

type LabTab = 'content' | 'customize' | 'ai'

export function CvLabView() {
  const [tab, setTab] = useState<LabTab>('content')

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mt-4 flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
        <div className="flex gap-5">
          {([
            ['content', 'Content'],
            ['customize', 'Customize'],
            ['ai', 'AI Tools'],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                'cursor-pointer border-b-2 pb-3 -mb-3 font-mono text-xs tracking-wider uppercase transition-colors',
                tab === id ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 pb-1">
          <DraftStatus />
          <ResumeJsonBackupControls />
          <ExportResumePdfButton />
        </div>
      </div>

      <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 gap-6 overflow-y-auto lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:overflow-hidden xl:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] 2xl:gap-8">
        <aside className="min-h-0 space-y-4 overflow-y-auto overscroll-contain pr-2 pb-4 [scrollbar-gutter:stable]">
          {tab === 'content' ? (
            <>
              <p className="text-sm text-muted-foreground">
                Drafts stay in this browser. Use <span className="text-foreground">Download JSON</span> to keep a copy, then{' '}
                <span className="text-foreground">Load JSON</span> later to continue editing.
              </p>
              <ProfileForm />
              <SectionsEditor />
              <details open className="border border-line p-3">
                <summary className="cursor-pointer font-mono text-xs tracking-wider text-muted-foreground uppercase">
                  Manage sections
                </summary>
                <div className="mt-3">
                  <SectionsManager />
                </div>
              </details>
            </>
          ) : null}
          {tab === 'customize' ? (
            <>
              <TemplateGallery />
              <DesignPanel />
            </>
          ) : null}
          {tab === 'ai' ? (
            <div className="space-y-4">
              <AiSettingsMenu />
              <TranslateResumeButton />
              <p className="text-sm text-muted-foreground">
                Paste your Anthropic or OpenAI key above, then use the sparkle buttons on summary and experience bullets in Content to improve writing.
              </p>
            </div>
          ) : null}
        </aside>

        <div className="min-h-0 min-w-0 overflow-y-auto overscroll-contain pb-4 [scrollbar-gutter:stable]">
          <ResumePreview />
        </div>
      </div>
    </div>
  )
}

export default CvLabView
