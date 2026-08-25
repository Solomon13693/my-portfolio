'use client'

import { useState, useTransition } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { GitHubContributionsResponse } from '@/services'
import { PROFILE } from '@/data'
import { EASE_OUT } from '@/lib'
import { GitHubGraph } from './GitHubGraph'

const CURRENT_YEAR = new Date().getFullYear()

const EARLIEST_YEAR_SHOWN = 2023
const YEARS = Array.from(
  { length: CURRENT_YEAR - EARLIEST_YEAR_SHOWN + 1 },
  (_, i) => CURRENT_YEAR - i
)

interface GitHubYearPickerProps {
  initialData: GitHubContributionsResponse
}

export function GitHubYearPicker({ initialData }: GitHubYearPickerProps) {
  const [data, setData] = useState(initialData)
  const [selected, setSelected] = useState<string>(String(CURRENT_YEAR))
  const [isPending, startTransition] = useTransition()

  const onChange = (value: string) => {
    setSelected(value)
    startTransition(async () => {
      const res = await fetch(`/api/github-contributions?year=${value}`)
      if (!res.ok) return
      const json: GitHubContributionsResponse = await res.json()
      setData(json)
    })
  }

  const total = data.total?.lastYear ?? 0

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          GitHub contributions
        </p>

        <div className="flex items-center justify-between gap-3 sm:justify-normal">

          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="overflow-hidden font-mono text-xs whitespace-nowrap text-foreground hover:underline">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={selected}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="inline-block"
              >
                {total} in {selected}
              </motion.span>
            </AnimatePresence>
          </a>

          <select value={selected} onChange={(e) => onChange(e.target.value)} aria-label="Select year" className="border border-line bg-background px-2 py-1 font-mono text-xs text-foreground outline-none transition-colors hover:border-foreground/30" >
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

        </div>

      </div>

      <motion.div
        animate={{ opacity: isPending ? 0.5 : 1 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        className="mt-6"
      >
        <GitHubGraph data={data} />
      </motion.div>

    </div>
  )
}

export default GitHubYearPicker
