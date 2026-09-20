import { DEFAULT_COVER_LETTER_TEMPLATE_BODY, DEFAULT_COVER_LETTER_HIRING_MANAGER_FALLBACK, getTemplatePreset } from '@/data'
import type { CoverLetterState } from '@/types'

export const COVER_LETTER_STATE_VERSION = 2

export function buildDefaultCoverLetterState(): CoverLetterState {
  const preset = getTemplatePreset('classic-ink')
  return {
    version: COVER_LETTER_STATE_VERSION,
    template: { id: 'default', body: DEFAULT_COVER_LETTER_TEMPLATE_BODY },
    letters: [],
    matchResumeTheme: true,
    presetId: 'classic-ink',
    theme: { ...preset.theme },
  }
}

export function applyPlaceholders(body: string, values: Record<string, string | undefined>): string {
  return body.replace(/\{\{(\w+)\}\}/g, (match, token: string) => {
    const value = values[token]
    if (value && value.trim()) return value.trim()
    if (token === 'hiringManager') return DEFAULT_COVER_LETTER_HIRING_MANAGER_FALLBACK
    return match
  })
}

interface V1CoverLetterState {
  version?: number
  template?: CoverLetterState['template']
  letters?: CoverLetterState['letters']
}

export function migrateCoverLetterState(raw: unknown, fromVersion: number): CoverLetterState {
  if (fromVersion === 1 && raw && typeof raw === 'object') {
    const v1 = raw as V1CoverLetterState
    const base = buildDefaultCoverLetterState()
    return {
      ...base,
      template: v1.template ?? base.template,
      letters: v1.letters ?? [],
    }
  }
  console.warn(`cv-lab: unrecognized cover letter version ${fromVersion}, resetting`)
  return buildDefaultCoverLetterState()
}

export function normalizeImportedCoverLetterState(raw: unknown): CoverLetterState {
  if (!raw || typeof raw !== 'object') throw new Error('Invalid cover letter backup')
  const parsed = raw as { version?: number; template?: unknown; letters?: unknown }
  const version = typeof parsed.version === 'number' ? parsed.version : 0

  if (version === COVER_LETTER_STATE_VERSION && parsed.template && Array.isArray(parsed.letters)) {
    return parsed as CoverLetterState
  }
  if (version === 1 || version === 0) return migrateCoverLetterState(parsed, version === 0 ? 1 : version)

  throw new Error('Invalid cover letter backup')
}

/** Shared greeting / recipient fallback for preview + PDF. */
export function coverLetterGreeting(hiringManager?: string): string {
  const trimmed = hiringManager?.trim()
  return trimmed || DEFAULT_COVER_LETTER_HIRING_MANAGER_FALLBACK
}
