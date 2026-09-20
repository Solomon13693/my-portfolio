import type { ResumeTheme } from '@/types'

/** Trigger a browser download for a Blob. */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function downloadJson(data: unknown, filename: string) {
  downloadBlob(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }), filename)
}

/** Host + path for resume contact links (preview + PDF). */
export function formatDisplayUrl(url: string): string {
  try {
    const u = new URL(url.startsWith('http') ? url : `https://${url}`)
    return `${u.host}${u.pathname}`.replace(/\/$/, '')
  } catch {
    return url
  }
}

export function pdfPageSize(size: ResumeTheme['pageSize']): 'A4' | 'LETTER' {
  return size === 'Letter' ? 'LETTER' : 'A4'
}

/** Stable client-side ids for draft entries. */
export function createId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

/** Soft max payload size for AI proxy (~150KB of UTF-8). */
export const AI_PAYLOAD_MAX_CHARS = 150_000

export function estimatePayloadChars(value: unknown): number {
  try {
    return JSON.stringify(value).length
  } catch {
    return Number.MAX_SAFE_INTEGER
  }
}
