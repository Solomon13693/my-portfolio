import { GraduationCap } from 'lucide-react'
import { IconTile } from '@/components/reusable'
import { EDUCATION } from '@/data'
import { cn } from '@/lib'
import { Reveal } from '../motion'

export function Education() {
  return (
    <div className="border-b border-line">
      <div className="container py-10 sm:py-16">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Education</p>
        <div className="mt-3 h-px w-10 bg-foreground" aria-hidden="true" />

        <div className="mt-10 sm:mt-16">
          {EDUCATION.map((entry, index) => (
            <Reveal key={`${entry.institution}-${entry.program}`} delay={index * 0.08} y={16}>
              <div
                className={cn(
                  'group relative border-line py-4',
                  index === EDUCATION.length - 1 ? 'border-none' : 'border-b'
                )}
              >
                <div className="absolute top-0 left-3 h-full w-px bg-line" aria-hidden="true" />
                <div
                  className="pointer-events-none absolute bottom-0 left-3 flex size-4 bg-background"
                  aria-hidden="true"
                >
                  <span className="size-full -translate-y-2.25 rounded-bl-sm border-b border-l border-line" />
                </div>

                <div className="relative -mx-2 flex items-start gap-3 rounded-md px-2 py-1 transition-colors hover:bg-muted/50">
                  <IconTile>
                    <GraduationCap aria-hidden="true" />
                  </IconTile>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium">{entry.program}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 font-mono text-xs text-muted-foreground">
                      <span>{entry.institution}</span>
                      <span aria-hidden="true">·</span>
                      <span>{entry.period}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Education
