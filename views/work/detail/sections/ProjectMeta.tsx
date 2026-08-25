'use client'

import { motion } from 'framer-motion'
import { Activity, ArrowUpRight, Link2, User, Wrench } from 'lucide-react'
import { TechBadge } from '@/components'
import { IconTile } from '@/components/reusable'
import { PROFILE, STACK, type Project } from '@/data'
import { EASE_OUT } from '@/lib'

const STACK_HREFS = new Map(STACK.flatMap((category) => category.items.map((item) => [item.name, item.href])))

interface ProjectMetaProps {
  project: Project
}

export function ProjectMeta({ project }: ProjectMetaProps) {
  return (
    <div className="border-b border-line bg-muted/40">
      <div className="container grid gap-4 py-10 sm:grid-cols-2 sm:py-16 lg:grid-cols-4">
        <div className="border border-line bg-background p-5 sm:p-6">
          <div className="flex items-center gap-2.5">
            <IconTile>
              <Activity aria-hidden="true" />
            </IconTile>
            <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Status</p>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <span className="inline-flex w-fit items-center gap-1.5 font-mono text-xs tracking-wider uppercase">
              {project.current && (
                <span className="relative flex size-1.5" aria-hidden="true">
                  <span className="absolute inline-flex size-1.5 animate-ping rounded-full bg-foreground/50" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-foreground" />
                </span>
              )}
              {project.status}
            </span>
            <p className="text-sm font-medium tracking-tight sm:text-base">{project.period}</p>
            {project.duration && (
              <p className="font-mono text-xs text-muted-foreground">{project.duration} on this build</p>
            )}
          </div>
        </div>

        <div className="border border-line bg-background p-5 sm:p-6">
          <div className="flex items-center gap-2.5">
            <IconTile>
              <User aria-hidden="true" />
            </IconTile>
            <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Role</p>
          </div>
          <ul className="mt-4 flex flex-col gap-1.5">
            {project.role.map((role) => (
              <li key={role} className="text-sm font-medium tracking-tight sm:text-base">
                {role}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-line bg-background p-5 sm:p-6">
          <div className="flex items-center gap-2.5">
            <IconTile>
              <Wrench aria-hidden="true" />
            </IconTile>
            <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Built with</p>
          </div>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((tool) => (
              <li key={tool}>
                <TechBadge name={tool} href={STACK_HREFS.get(tool)} />
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-line bg-background p-5 sm:p-6">
          <div className="flex items-center gap-2.5">
            <IconTile>
              <Link2 aria-hidden="true" />
            </IconTile>
            <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Links</p>
          </div>
          {project.links.length > 0 ? (
            <ul className="mt-4 flex flex-col gap-1.5">
              {project.links.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    className="group inline-flex items-center gap-1.5 text-sm font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground sm:text-base"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </motion.a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">Private project — reach out for a walkthrough.</p>
              <motion.a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="group inline-flex w-fit items-center gap-1.5 text-sm font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground"
              >
                More on GitHub
                <ArrowUpRight
                  className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </motion.a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectMeta
