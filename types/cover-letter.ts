import type { ResumeTheme, ResumeTemplatePresetId } from './resume'

export interface CoverLetterPlaceholderValues {
  company: string
  role: string
  hiringManager?: string
  jobPostingUrl?: string
}

export interface CoverLetterTemplate {
  id: string
  body: string
}

export interface SavedCoverLetter {
  id: string
  label: string
  createdAt: string
  updatedAt: string
  placeholders: CoverLetterPlaceholderValues
  body: string
}

export type CoverLetterPresetId =
  | 'classic-ink'
  | 'classic-navy'
  | 'minimal-light'
  | 'modern-slate'
  | 'executive-bar'
  | 'ats-simple'

export interface CoverLetterState {
  version: number
  template: CoverLetterTemplate
  letters: SavedCoverLetter[]
  matchResumeTheme: boolean
  presetId: CoverLetterPresetId
  theme: ResumeTheme
  /** Used when matching resume theme for accent-only templates */
  resumePresetHint?: ResumeTemplatePresetId
}
