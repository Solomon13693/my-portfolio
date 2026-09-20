'use client'

import { useEffect, useMemo, useState } from 'react'
import { Input, TextArea } from '@/components/ui/form'
import Button from '@/components/ui/button'
import { useAiAction, useAiSettings, useCoverLetters, useResumeDraft } from '@/hooks'
import { CV_FONTS } from '@/data'
import { coverLetterGreeting, formatDisplayUrl } from '@/lib'

interface CoverLetterPreviewProps {
 body: string
 onChange: (value: string) => void
 onSave: () => void
 label: string
 onLabelChange: (value: string) => void
 placeholders: { company: string; role: string; hiringManager?: string }
 jobDescription: string
}

/** Cover letters always use high-contrast ink on white / never site theme tokens. */
const INK = '#1c1c1c'
const NAVY = '#16233c'
const META = '#333333'
const PLACEHOLDER = '#7a7a7a'

export function CoverLetterPreview({
 body,
 onChange,
 onSave,
 label,
 onLabelChange,
 placeholders,
 jobDescription,
}: CoverLetterPreviewProps) {
 const { draft } = useResumeDraft()
 const { state } = useCoverLetters()
 const { settings } = useAiSettings()
 const { run, status, configured } = useAiAction()
 const [aiError, setAiError] = useState<string | null>(null)

 const theme = state.matchResumeTheme ? draft.theme : state.theme
 const headingFont = (CV_FONTS[theme.headingFontId] ?? CV_FONTS.helvetica).cssFamily
 const bodyFont = (CV_FONTS[theme.bodyFontId] ?? CV_FONTS.helvetica).cssFamily
 const fontUrls = useMemo(
 () =>
 [theme.headingFontId, theme.bodyFontId]
 .map((id) => CV_FONTS[id]?.googleCssUrl)
 .filter((url): url is string => Boolean(url)),
 [theme.headingFontId, theme.bodyFontId]
 )

 useEffect(() => {
 for (const url of fontUrls) {
 const id = `cv-font-cl-${btoa(url).replace(/=+/g, '')}`
 if (document.getElementById(id)) continue
 const link = document.createElement('link')
 link.id = id
 link.rel = 'stylesheet'
 link.href = url
 document.head.appendChild(link)
 }
 }, [fontUrls])

 const handleAiDraft = async () => {
 setAiError(null)
 let accumulated = ''
 try {
 const full = await run(
 'draft-cover-letter',
 {
 jobDescription,
 company: placeholders.company,
 role: placeholders.role,
 hiringManager: placeholders.hiringManager,
 },
 {
 providerId: settings.providerId,
 model: settings.model,
 draft,
 onChunk: (chunk) => {
 accumulated += chunk
 onChange(accumulated)
 },
 }
 )
 onChange(full || accumulated)
 } catch (err) {
 setAiError(err instanceof Error ? err.message : 'AI draft failed')
 }
 }

 const row1 = [draft.profile.email, draft.profile.phone, draft.profile.location].filter(Boolean)
 const row2 = draft.profile.links.filter((l) => l.url).map((l) => formatDisplayUrl(l.url))

 const greeting = coverLetterGreeting(placeholders.hiringManager)
 const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
 const headingColor = theme.headingColor && theme.headingColor !== '#f5f5f5' ? theme.headingColor : NAVY

 return (
 <div className="w-full">
 <div className="w-full border border-line bg-neutral-200/70 p-2 sm:p-3" style={{ colorScheme: 'light' }}>
 <div
 className="w-full bg-white shadow-md"
 style={{
 color: INK,
 fontFamily: bodyFont,
 fontSize: 15,
 lineHeight: 1.55,
 minHeight: 'calc(100vh - 10rem)',
 padding: 'clamp(1.25rem, 2.5vw, 2rem)',
 }}
 >
 <div className="text-center">
 <h1 className="m-0 text-[1.75rem] font-bold sm:text-[2rem]" style={{ color: headingColor, fontFamily: headingFont }}>
 {draft.profile.name}
 </h1>
 {row1.length > 0 ? (
 <p className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[0.85rem]" style={{ color: META }}>
 {row1.map((part, i) => (
 <span key={String(part)} className="inline-flex items-center">
 {i > 0 ? <span className="mx-2 text-neutral-400">|</span> : null}
 {part}
 </span>
 ))}
 </p>
 ) : null}
 {row2.length > 0 ? (
 <p className="mt-1 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[0.85rem]" style={{ color: META }}>
 {row2.map((part, i) => (
 <span key={String(part)} className="inline-flex items-center break-all">
 {i > 0 ? <span className="mx-2 text-neutral-400">|</span> : null}
 {part}
 </span>
 ))}
 </p>
 ) : null}
 </div>

 <p className="mt-8 mb-4" style={{ color: META }}>
 {today}
 </p>

 <div className="mb-4" style={{ color: PLACEHOLDER }}>
 <p>{placeholders.hiringManager?.trim() || '[Hiring Manager Name]'}</p>
 <p>{placeholders.company?.trim() || '[Company Name]'}</p>
 </div>

 <p className="mb-4" style={{ color: INK }}>
 Dear {greeting},
 </p>

 <TextArea
 name="cover-letter-body"
 radius="none"
 className="min-h-[26rem] border-none bg-transparent p-0 text-[15px] leading-[1.55] text-[#1c1c1c] caret-[#1c1c1c] placeholder:text-[#7a7a7a] focus:ring-0 focus:border-transparent"
 fullWidth
 value={body}
 onChange={(e) => onChange(e.target.value)}
 placeholder="Cover letter body…"
 style={{ color: INK, WebkitTextFillColor: INK }}
 />

 <div className="mt-8" style={{ color: INK }}>
 Sincerely,
 <br />
 {draft.profile.name}
 </div>
 </div>
 </div>

 <div className="mt-3 flex flex-wrap items-end gap-2">
 <Input name="letter-label" label="Label" radius="none" inputSize="sm" value={label} onChange={(e) => onLabelChange(e.target.value)} formGroupClass="mb-0" />
 <Button size="sm" className="rounded-none" onClick={onSave}>
 Save letter
 </Button>
 <Button
 size="sm"
 variant="bordered"
 className="rounded-none"
 isDisabled={!configured || status === 'loading' || !jobDescription.trim()}
 loading={status === 'loading'}
 onClick={handleAiDraft}
 >
 AI Draft
 </Button>
 </div>
 {aiError ? <p className="mt-1 text-xs text-red-500">{aiError}</p> : null}
 {!configured ? (
 <p className="mt-1 text-xs text-muted-foreground">Add your API key under Resume → AI Tools to enable AI Draft.</p>
 ) : null}
 </div>
 )
}

export default CoverLetterPreview
