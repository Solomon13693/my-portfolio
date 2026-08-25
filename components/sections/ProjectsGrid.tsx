'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '@/data'
import { EASE_OUT } from '@/lib'
import { Reveal } from '../motion'

const MotionLink = motion.create(Link)

export function ProjectsGrid() {
  return (
    <div className="container py-10 sm:py-16">

      <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
        Selected work
      </p>

      <div className="mt-3 h-px w-10 bg-foreground" aria-hidden="true" />

      <div className="mt-10 grid gap-8 sm:mt-16 sm:grid-cols-2">

        {PROJECTS.map((project, index) => (

          <Reveal key={project.slug} delay={index * 0.08} y={20} className="h-full">

            <MotionLink href={`/work/${project.slug}`} whileHover={{ y: -6 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.3, ease: EASE_OUT }} className="group block h-full border border-dashed border-line p-6 transition-colors hover:border-foreground/40 hover:bg-muted/40">

              <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden border border-line bg-muted">

                <span aria-hidden="true" className="pointer-events-none font-bold text-7xl select-none" style={{ WebkitTextStroke: '1px var(--line)', color: 'transparent' }}>
                  {project.title[0]}
                </span>

                <span className="absolute right-3 bottom-3 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                  Screenshot soon
                </span>

              </div>

              <div className="mt-4 flex items-start justify-between gap-4">

                <div className="min-w-0">
                  <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{project.tag}</p>
                  <h3 className="mt-1 text-lg font-medium tracking-tight">{project.title}</h3>
                </div>

                <ArrowUpRight
                  className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  aria-hidden="true"
                />

              </div>

              <p className="mt-3 font-mono text-xs text-muted-foreground">
                {project.company} · {project.period}
              </p>

            </MotionLink>

          </Reveal>

        ))}

      </div>

    </div>
  )
}

export default ProjectsGrid
