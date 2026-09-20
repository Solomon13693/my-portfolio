const MONTH_INDEX: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
}

function parseMonthYear(token: string, now: Date): Date | null {
  const raw = token.trim()
  if (!raw) return null

  const lower = raw.toLowerCase()
  if (lower === 'present' || lower === 'now' || lower === 'current') {
    return new Date(now.getFullYear(), now.getMonth(), 1)
  }

  const monthYear = raw.match(/^([A-Za-z]+)\s+(\d{4})$/)
  if (monthYear) {
    const month = MONTH_INDEX[monthYear[1].toLowerCase()]
    const year = Number(monthYear[2])
    if (month == null || Number.isNaN(year)) return null
    return new Date(year, month, 1)
  }

  const yearOnly = raw.match(/^(\d{4})$/)
  if (yearOnly) {
    return new Date(Number(yearOnly[1]), 0, 1)
  }

  return null
}

/** Newest-first sort key from a period like "Jun 2026" or "Nov 2024 – Present". */
export function periodRecencyMs(period: string, now: Date = new Date()): number {
  const start = period.split(/\s*[–—−-]\s*/)[0]?.trim() ?? ''
  if (/^\d{4}$/.test(start)) {
    return new Date(Number(start), 5, 1).getTime()
  }
  return parseMonthYear(start, now)?.getTime() ?? 0
}

/** Format a tenure like "1y 10m" or "9m" from a period string such as "Nov 2024 – Present". */
export function formatPeriodDuration(period: string, now: Date = new Date()): string | null {
  const parts = period.split(/\s*[–—−-]\s*/)
  if (parts.length !== 2) return null

  const start = parseMonthYear(parts[0], now)
  const end = parseMonthYear(parts[1], now)
  if (!start || !end) return null

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())

  if (months < 0) return null
  if (months === 0) months = 1

  const years = Math.floor(months / 12)
  const rem = months % 12

  if (years === 0) return `${rem}m`
  if (rem === 0) return `${years}y`
  return `${years}y ${rem}m`
}
