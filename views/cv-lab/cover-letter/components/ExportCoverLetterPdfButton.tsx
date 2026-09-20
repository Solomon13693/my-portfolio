'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import Button from '@/components/ui/button'
import { useCoverLetters, useResumeDraft } from '@/hooks'
import { downloadBlob, ensurePdfFontsRegistered } from '@/lib'
import type { CoverLetterPlaceholderValues } from '@/types'

interface ExportCoverLetterPdfButtonProps {
  body: string
  placeholders: CoverLetterPlaceholderValues
  iconOnly?: boolean
}

export function ExportCoverLetterPdfButton({ body, placeholders, iconOnly }: ExportCoverLetterPdfButtonProps) {
  const { draft } = useResumeDraft()
  const { state } = useCoverLetters()
  const [loading, setLoading] = useState(false)

  const theme = state.matchResumeTheme ? draft.theme : state.theme

  const handleExport = async () => {
    setLoading(true)
    try {
      await ensurePdfFontsRegistered(theme)
      const [{ pdf }, { default: CoverLetterDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('@/views/cv-lab/pdf/CoverLetterDocument'),
      ])

      const blob = await pdf(
        <CoverLetterDocument body={body} profile={draft.profile} theme={theme} placeholders={placeholders} />
      ).toBlob()
      const name = [placeholders.company, placeholders.role].filter(Boolean).join('-') || 'cover-letter'
      downloadBlob(blob, `${name.replace(/\s+/g, '-').toLowerCase()}.pdf`)
    } catch (error) {
      console.error('Failed to export cover letter PDF', error)
      window.alert('Something went wrong exporting the PDF. Check the console for details.')
    } finally {
      setLoading(false)
    }
  }

  if (iconOnly) {
    return (
      <Button size="sm" variant="light" isIconOnly loading={loading} onClick={handleExport} aria-label="Export cover letter PDF">
        <Download className="size-4" aria-hidden="true" />
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      variant="bordered"
      className="rounded-none"
      loading={loading}
      onClick={handleExport}
      startContent={<Download className="size-3.5" aria-hidden="true" />}
    >
      Export PDF
    </Button>
  )
}

export default ExportCoverLetterPdfButton
