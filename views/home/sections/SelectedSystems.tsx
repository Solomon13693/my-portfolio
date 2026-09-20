import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion'
import { TechBadge } from '@/components/reusable'
import { ProjectChanges, ProjectOwnershipFooter } from '@/components/sections'
import { getFeaturedProjects } from '@/data'
import { ROUTES } from '@/constants'

export function SelectedSystems() {
  const featured = getFeaturedProjects()

  return (
    <div className="border-b border-line">
      <div className="border-b border-line">
        <div className="container flex flex-wrap items-end justify-between gap-3 py-3">
          <h2 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">In production</h2>
          <Link
            href={ROUTES.work}
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            All projects
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="container divide-y divide-line py-2 sm:py-4">
        {featured.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.1} y={18}>
            <article className="grid gap-6 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
              <div>
                <p className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-muted-foreground uppercase">
                  {project.current ? (
                    <span className="relative flex size-1.5" aria-hidden="true">
                      <span className="absolute inline-flex size-1.5 animate-ping rounded-full bg-foreground/40" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-foreground" />
                    </span>
                  ) : (
                    <span className="size-1.5 rounded-full bg-muted-foreground/50" aria-hidden="true" />
                  )}
                  {project.status} · {project.tag}
                </p>
                <h3 className="mt-2 text-2xl font-medium tracking-tight sm:text-3xl">
                  <Link href={`/work/${project.slug}`} className="hover:underline underline-offset-4">
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  {project.company}
                </p>
                <p className="mt-4 max-w-xl text-muted-foreground">{project.summary}</p>

                {project.related.length > 0 && (
                  <p className="mt-4 font-mono text-xs text-muted-foreground">
                    Also in this tenure:{' '}
                    {project.related.map((related, i) => (
                      <span key={related.slug}>
                        {i > 0 && ' · '}
                        <Link href={`/work/${related.slug}`} className="hover:text-foreground hover:underline underline-offset-2">
                          {related.title}
                        </Link>
                      </span>
                    ))}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                  <Link
                    href={`/work/${project.slug}`}
                    className="group inline-flex items-center gap-2 font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground"
                  >
                    Case study
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                  {project.links.slice(0, 3).map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground"
                    >
                      {link.label}
                      <ArrowUpRight
                        className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Highlights</p>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/90 sm:text-[0.95rem]">
                    {project.highlights.map((item) => (
                      <li key={item} className="border-l-2 border-line pl-4">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.changes && (
                  <div>
                    <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Before / after</p>
                    <div className="mt-4">
                      <ProjectChanges changes={project.changes} />
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {project.stack.slice(0, 8).map((tool) => (
                    <TechBadge key={tool} name={tool} />
                  ))}
                </div>

                <ProjectOwnershipFooter project={project} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export default SelectedSystems
