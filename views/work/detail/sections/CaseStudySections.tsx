'use client'

import { motion } from 'framer-motion'
import { Compass, Flag, Hammer, Layers, Zap, type LucideIcon } from 'lucide-react'
import { IconTile } from '@/components/reusable'
import type { Project } from '@/types'
import { EASE_OUT } from '@/lib'

const SECTION_ICONS: Record<string, LucideIcon> = {
  'The brief': Compass,
  'The build': Hammer,
  'The hard part': Zap,
  'Where it stands now': Flag,
}

interface CaseStudySectionsProps {
  project: Project
}

export function CaseStudySections({ project }: CaseStudySectionsProps) {
  return (
    <div className="border-b border-line">
      <div className="container py-10 sm:py-16">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Breakdown</p>
        <div className="mt-3 h-px w-10 bg-foreground" aria-hidden="true" />

        <div className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2">
          {project.sections.map((section, index) => {
            const Icon = SECTION_ICONS[section.heading] ?? Layers

            return (
              <motion.div
                key={section.heading}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="relative overflow-hidden border border-line p-6 transition-colors hover:border-foreground/40"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-3 right-3 font-bold text-6xl leading-none select-none"
                  style={{ WebkitTextStroke: '1px var(--line)', color: 'transparent' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="relative flex items-center gap-3">
                  <IconTile>
                    <Icon aria-hidden="true" />
                  </IconTile>
                  <h3 className="font-medium">{section.heading}</h3>
                </div>

                <div className="relative mt-3 flex flex-col gap-3 text-sm text-muted-foreground">
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CaseStudySections
