import { ArrowUpRight, BadgeCheck } from 'lucide-react'
import { IconTile } from '@/components/reusable'
import { CERTIFICATIONS } from '@/data'
import { cn } from '@/lib'
import { Reveal } from '../motion'

export function Certifications() {
  return (
    <div className="border-b border-line">
      <div className="container py-10 sm:py-16">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Certifications</p>
        <div className="mt-3 h-px w-10 bg-foreground" aria-hidden="true" />

        <div className="mt-8 sm:mt-10">
          {CERTIFICATIONS.map((entry, index) => {
            const content = (
              <>
                <IconTile>
                  <BadgeCheck aria-hidden="true" />
                </IconTile>

                <div className="min-w-0 flex-1">
                  <h3 className="font-medium">{entry.title}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 font-mono text-xs text-muted-foreground">
                    <span>{entry.issuer}</span>
                    <span aria-hidden="true">·</span>
                    <span>{entry.date}</span>
                  </div>
                </div>

                {entry.href && (
                  <ArrowUpRight
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                )}
              </>
            )

            return (
              <Reveal key={`${entry.issuer}-${entry.title}`} delay={index * 0.05} y={16}>
                <div
                  className={cn(
                    'group relative border-line py-4',
                    index === CERTIFICATIONS.length - 1 ? 'border-none' : 'border-b'
                  )}
                >
                  <div className="absolute top-0 left-3 h-full w-px bg-line" aria-hidden="true" />
                  <div
                    className="pointer-events-none absolute bottom-0 left-3 flex size-4 bg-background"
                    aria-hidden="true"
                  >
                    <span className="size-full -translate-y-2.25 rounded-bl-sm border-b border-l border-line" />
                  </div>

                  {entry.href ? (
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative -mx-2 flex items-start gap-3 rounded-md px-2 py-1 transition-colors hover:bg-muted/50"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="relative -mx-2 flex items-start gap-3 rounded-md px-2 py-1 transition-colors hover:bg-muted/50">
                      {content}
                    </div>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Certifications
