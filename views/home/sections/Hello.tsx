import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion'
import { ROUTES } from '@/constants'
import { ABOUT, PROFESSIONAL_SUMMARY, STATS } from '@/data'

export function Hello() {
  return (
    <div className="border-b border-line">
      <div className="border-b border-line">
        <div className="container py-3">
          <h2 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{ABOUT.eyebrow}</h2>
        </div>
      </div>

      <div className="container space-y-8 py-8 sm:py-12">
        <p className="max-w-4xl text-3xl leading-tight font-medium text-balance sm:text-4xl">{ABOUT.headline}</p>

        <p className="max-w-4xl text-muted-foreground">{PROFESSIONAL_SUMMARY}</p>

        <ul className="max-w-4xl space-y-2 text-sm text-foreground/90 sm:text-[0.95rem]">
          {ABOUT.focusAreas.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-muted-foreground" aria-hidden="true">
                ·
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <dl className="grid max-w-5xl grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4 sm:gap-8">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08} y={12}>
              <div>
                <dt className="text-2xl font-bold tracking-tight tabular-nums sm:text-3xl">{stat.value}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <Link
          href={ROUTES.about}
          className="group inline-flex min-h-11 items-center gap-2 font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          About me
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

export default Hello
