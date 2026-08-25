'use client'

import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib'
import type { GitHubContributionsResponse } from '@/services'

const CELL = 12
const GAP = 2
const PITCH = CELL + GAP
const LABEL_ROW_HEIGHT = 20

const LEVEL_FILL: Record<number, string> = {
  0: 'var(--gh-level-0)',
  1: 'var(--gh-level-1)',
  2: 'var(--gh-level-2)',
  3: 'var(--gh-level-3)',
  4: 'var(--gh-level-4)',
}

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

interface TooltipState {
  x: number
  y: number
  label: string
}

export function GitHubGraph({ data }: { data: GitHubContributionsResponse }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const inView = useInView(containerRef, { once: true, margin: '-40px' })

  const days = data.contributions
  if (!days.length) return null

  const firstDay = new Date(`${days[0].date}T00:00:00Z`).getUTCDay()

  type Cell = { date: string; count: number; level: number } | null
  const weeks: Cell[][] = []
  let currentWeek: Cell[] = new Array(firstDay).fill(null)

  for (const day of days) {
    currentWeek.push(day)
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }
  if (currentWeek.length) {
    while (currentWeek.length < 7) currentWeek.push(null)
    weeks.push(currentWeek)
  }

  const monthLabels: { x: number; label: string }[] = []
  let lastMonth = -1
  weeks.forEach((week, weekIndex) => {
    const firstRealDay = week.find((d) => d !== null)
    if (!firstRealDay) return
    const month = new Date(`${firstRealDay.date}T00:00:00Z`).getUTCMonth()
    if (month !== lastMonth) {
      monthLabels.push({ x: weekIndex * PITCH, label: MONTH_NAMES[month] })
      lastMonth = month
    }
  })

  const width = weeks.length * PITCH
  const height = LABEL_ROW_HEIGHT + 7 * PITCH

  const showTooltip = (e: React.MouseEvent<SVGRectElement>, day: NonNullable<Cell>) => {
    const container = containerRef.current
    if (!container) return
    const cellRect = e.currentTarget.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const dateLabel = new Date(`${day.date}T00:00:00Z`).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    setTooltip({
      x: cellRect.left - containerRect.left + cellRect.width / 2,
      y: cellRect.top - containerRect.top,
      label: `${day.count} contribution${day.count === 1 ? '' : 's'} on ${dateLabel}`,
    })
  }

  return (
    <div ref={containerRef} className="relative">
      {tooltip && (
        <div
          role="tooltip"
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md bg-foreground px-2 py-1 text-xs whitespace-nowrap text-background"
          style={{ left: tooltip.x, top: tooltip.y - 6 }}>
          {tooltip.label}
        </div>
      )}

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full"
          style={{ minWidth: width }}
          role="img"
          aria-labelledby="github-graph-title">
          <title id="github-graph-title">GitHub contributions graph</title>
          <g className="fill-muted-foreground" fontSize="10">
            {monthLabels.map((m) => (
              <text key={m.x} x={m.x} y={12}>
                {m.label}
              </text>
            ))}
          </g>
          {weeks.map((week, weekIndex) =>
            week.map((day, dayIndex) => {
              if (!day) return null
              const x = weekIndex * PITCH
              const y = LABEL_ROW_HEIGHT + dayIndex * PITCH
              const delay = (weekIndex * 7 + dayIndex) * 3
              return (
                <rect
                  key={day.date}
                  x={x}
                  y={y}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  ry={2}
                  fill={LEVEL_FILL[day.level] ?? LEVEL_FILL[0]}
                  onMouseEnter={(e) => showTooltip(e, day)}
                  onMouseLeave={() => setTooltip(null)}
                  className={cn(
                    'origin-[var(--cx)_var(--cy)] scale-0 opacity-0 transition-[opacity,transform] duration-300 ease-out hover:scale-110!',
                    inView && 'scale-100 opacity-100'
                  )}
                  style={{
                    ['--cx' as string]: `${x + CELL / 2}px`,
                    ['--cy' as string]: `${y + CELL / 2}px`,
                    transitionDelay: inView ? `${delay}ms` : '0ms',
                  }}
                />
              )
            })
          )}
        </svg>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-xs text-muted-foreground">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span
            key={level}
            aria-hidden="true"
            className="inline-block size-2.5 rounded-xs"
            style={{ backgroundColor: LEVEL_FILL[level] }}
          />
        ))}
        <span>More</span>
      </div>
      
    </div>
  )
}

export default GitHubGraph
