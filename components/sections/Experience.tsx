'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, CodeXml } from 'lucide-react'
import { IconTile, TechBadge } from '@/components/reusable'
import { EXPERIENCE, type ExperiencePosition } from '@/data'
import { EASE_OUT } from '@/lib'
import { Reveal } from '../motion'

function PositionAccordion({ position, showRail }: { position: ExperiencePosition; showRail: boolean }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="group relative pt-5">
      {showRail && (
        <>
          <div className="absolute top-0 left-3 h-full w-px bg-line" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-0 left-3 hidden size-4 bg-background group-last:flex"
            aria-hidden="true">
            <span className="size-full -translate-y-2.25 rounded-bl-sm border-b border-l border-line" />
          </div>
        </>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="-mx-2 flex w-full cursor-pointer items-start gap-3 rounded-md px-2 py-2 text-left hover:bg-muted/50">
        <IconTile>
          <CodeXml aria-hidden="true" />
        </IconTile>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-medium">{position.title}</h4>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="mt-0.5 shrink-0 text-muted-foreground">
              <ChevronDown className="size-4" aria-hidden="true" />
            </motion.span>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 font-mono text-xs text-muted-foreground">
            <span>{position.period}</span>
            {position.duration && (
              <>
                <span aria-hidden="true">·</span>
                <span>{position.duration}</span>
              </>
            )}
            {position.current && (
              <>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative flex size-1.5" aria-hidden="true">
                    <span className="absolute inline-flex size-1.5 animate-ping rounded-full bg-foreground/50" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-foreground" />
                  </span>
                  Current
                </span>
              </>
            )}
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="overflow-hidden" >
            <div className="pt-2 pl-9">
              <p className="max-w-2xl text-sm text-muted-foreground">{position.summary}</p>

              <ul className="mt-3 flex flex-wrap gap-1.5">
                {position.tools.map((tool) => (
                  <li key={tool}>
                    <TechBadge name={tool} />
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Experience() {
  return (
    <div className="border-b border-line">
      <div className="container py-10 sm:py-16">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Experience</p>
        <div className="mt-3 h-px w-10 bg-foreground" aria-hidden="true" />

        <div className="mt-10 border-t border-line sm:mt-12">
          {EXPERIENCE.map((entry, index) => (
            <Reveal key={entry.company} delay={index * 0.08} y={20}>
              <div className="border-b border-line py-5">
                <div className="flex items-center gap-3">
                  {entry.logo ? (
                    <Image
                      src={entry.logo}
                      alt={`${entry.company} logo`}
                      width={24}
                      height={24}
                      className="size-6 shrink-0 rounded-full border border-line object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex size-6 shrink-0 items-center justify-center rounded-full border border-line bg-muted font-mono text-[0.6rem] text-muted-foreground">
                      {entry.company[0]}
                    </span>
                  )}
                  <h3 className="text-lg font-medium tracking-tight">{entry.company}</h3>
                </div>

                <div className="mt-0 pl-3">
                  {entry.positions.map((position) => (
                    <PositionAccordion
                      key={`${position.title}-${position.period}`}
                      position={position}
                      showRail={entry.positions.length > 1}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Experience
