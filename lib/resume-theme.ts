import type { CSSProperties } from 'react'
import type { ResumeTheme } from '@/types'
import { CV_FONTS } from '@/data'

export const FONT_SIZE_PX: Record<ResumeTheme['fontSize'], number> = {
  sm: 9.5,
  md: 10.5,
  lg: 11.5,
}

/** Larger sizes for on-screen paper preview (PDF keeps FONT_SIZE_PX). */
export const PREVIEW_FONT_SIZE_PX: Record<ResumeTheme['fontSize'], number> = {
  sm: 12.5,
  md: 14,
  lg: 15.5,
}

export const LINE_HEIGHT_VALUE: Record<ResumeTheme['lineHeight'], number> = {
  tight: 1.3,
  normal: 1.5,
  relaxed: 1.7,
}

export const SECTION_GAP_PX: Record<ResumeTheme['sectionGap'], number> = {
  sm: 14,
  md: 22,
  lg: 30,
}

export const DENSITY_PADDING: Record<ResumeTheme['density'], number> = {
  compact: 32,
  comfortable: 44,
  spacious: 56,
}

export function themeToCssVars(theme: ResumeTheme): CSSProperties {
  const heading = CV_FONTS[theme.headingFontId]
  const body = CV_FONTS[theme.bodyFontId]
  return {
    ['--cv-heading-font' as string]: heading.cssFamily,
    ['--cv-body-font' as string]: body.cssFamily,
    ['--cv-heading-color' as string]: theme.headingColor,
    ['--cv-body-color' as string]: theme.bodyColor,
    ['--cv-accent-color' as string]: theme.accentColor,
    ['--cv-muted-color' as string]: theme.mutedColor,
    ['--cv-font-size' as string]: `${FONT_SIZE_PX[theme.fontSize]}px`,
    ['--cv-line-height' as string]: String(LINE_HEIGHT_VALUE[theme.lineHeight]),
    ['--cv-section-gap' as string]: `${SECTION_GAP_PX[theme.sectionGap]}px`,
    ['--cv-page-padding' as string]: `${DENSITY_PADDING[theme.density]}px`,
  }
}

export function googleFontUrlsForTheme(theme: ResumeTheme): string[] {
  const urls = new Set<string>()
  for (const id of [theme.headingFontId, theme.bodyFontId]) {
    const url = CV_FONTS[id].googleCssUrl
    if (url) urls.add(url)
  }
  return Array.from(urls)
}

export function pdfFontFamily(fontId: ResumeTheme['headingFontId'], weight: 'regular' | 'bold' = 'regular'): string {
  const def = CV_FONTS[fontId]
  if (def.pdfBuiltIn) {
    if (weight === 'bold') {
      if (def.pdfBuiltIn === 'Helvetica') return 'Helvetica-Bold'
      if (def.pdfBuiltIn === 'Times-Roman') return 'Times-Bold'
      return 'Courier-Bold'
    }
    return def.pdfBuiltIn
  }
  return weight === 'bold' ? `CvFont-${fontId}-Bold` : `CvFont-${fontId}`
}

let registeredFonts = new Set<string>()

export async function ensurePdfFontsRegistered(theme: ResumeTheme): Promise<void> {
  const { Font } = await import('@react-pdf/renderer')
  for (const id of [theme.headingFontId, theme.bodyFontId]) {
    const def = CV_FONTS[id]
    if (def.pdfBuiltIn || !def.pdfRegularUrl) continue
    if (registeredFonts.has(id)) continue
    const fonts: { src: string; fontWeight: number }[] = [{ src: def.pdfRegularUrl, fontWeight: 400 }]
    if (def.pdfBoldUrl) fonts.push({ src: def.pdfBoldUrl, fontWeight: 700 })
    Font.register({
      family: `CvFont-${id}`,
      fonts: fonts.map((f) => ({ src: f.src, fontWeight: f.fontWeight })),
    })
    if (def.pdfBoldUrl) {
      Font.register({
        family: `CvFont-${id}-Bold`,
        src: def.pdfBoldUrl,
      })
    }
    registeredFonts.add(id)
  }
}
