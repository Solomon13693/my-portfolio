'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '@/data'
import type { Project } from '@/types'
import { EASE_OUT, periodRecencyMs } from '@/lib'
import { Reveal } from '../motion'

const MotionLink = motion.create(Link)

/** Company groups that share one CV employment tenure. */
const COMPANY_GROUPS: Array<{ company: string; period: string; slugs: string[] }> = [
  {
    company: 'Klone',
    period: 'Nov 2024 – Present',
    slugs: ['klone', 'klone-customer'],
  },
  {
    company: 'RUN Technologies / Deliverys',
    period: '2025',
    slugs: ['run-delivery', 'run-web'],
  },
]

interface ProjectsGridProps {
  covers?: Record<string, string | null>
}

function ProjectCard({
  project,
  cover,
  index,
}: {
  project: Project
  cover: string | null | undefined
  index: number
}) {
  const contain = project.mediaFit === 'contain'

  return (
    <Reveal delay={index * 0.06} y={20} className="h-full">
      <MotionLink
        href={`/work/${project.slug}`}
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        className="group block h-full border border-dashed border-line p-6 transition-colors hover:border-foreground/40 hover:bg-muted/40"
      >
        <div className="relative aspect-video overflow-hidden border border-line bg-muted">
          {cover ? (
            <Image
              src={cover}
              alt={`${project.title} preview`}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              priority={index === 0}
              className={
                contain
                  ? 'object-contain object-top'
                  : 'object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]'
              }
            />
          ) : (
            <>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center font-bold text-7xl select-none"
                style={{ WebkitTextStroke: '1px var(--line)', color: 'transparent' }}
              >
                {project.title[0]}
              </span>
              <span className="absolute right-3 bottom-3 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                Screenshot soon
              </span>
            </>
          )}
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
          {project.company}
        </p>
      </MotionLink>
    </Reveal>
  )
}

function projectsByRecency(): Project[] {
  const groupedSlugs = new Set(COMPANY_GROUPS.flatMap((g) => g.slugs))
  const clusters: Project[][] = [
    ...COMPANY_GROUPS.map((group) =>
      group.slugs
        .map((slug) => PROJECTS.find((p) => p.slug === slug))
        .filter((p): p is Project => Boolean(p)),
    ).filter((projects) => projects.length > 0),
    ...PROJECTS.filter((p) => !groupedSlugs.has(p.slug)).map((p) => [p]),
  ]

  clusters.sort((a, b) => {
    const timeA = Math.max(...a.map((p) => periodRecencyMs(p.period)))
    const timeB = Math.max(...b.map((p) => periodRecencyMs(p.period)))
    return timeB - timeA
  })

  return clusters.flat()
}

export function ProjectsGrid({ covers = {} }: ProjectsGridProps) {
  const projects = projectsByRecency()

  return (
    <div className="container space-y-14 py-10 sm:space-y-16 sm:py-16">
      <div>
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">In production</p>
        <div className="mt-3 h-px w-10 bg-foreground" aria-hidden="true" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            cover={covers[project.slug]}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectsGrid
