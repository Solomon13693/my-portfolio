import { JOURNEY } from '@/data'
import { Reveal } from '@/components/motion'

export function Journey() {
  return (
    <div className="border-b border-line">

      <div className="container py-6 sm:py-10">

        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">The journey</p>

        <div className="mt-6 border-t border-line">
          {JOURNEY.map((entry, index) => (
            <Reveal key={`${entry.period}-${entry.label}`} delay={index * 0.06} y={16}>
              <div className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-line py-4 sm:grid-cols-[10rem_1fr] sm:gap-10">

                <p className="font-mono text-xs text-muted-foreground sm:text-sm">{entry.period}</p>

                <p className="text-sm font-medium tracking-tight sm:text-base">{entry.label}</p>

              </div>
            </Reveal>
          ))}
        </div>

      </div>

    </div>
  )
}

export default Journey
