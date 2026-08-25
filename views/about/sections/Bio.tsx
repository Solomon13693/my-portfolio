import Image from 'next/image'
import { ABOUT, STATS, PROFILE } from '@/data'
import { Reveal } from '@/components/motion'

export function Bio() {
  return (
    <div className="border-b border-line">

      <div className="container grid gap-10 py-10 sm:py-16 md:grid-cols-[0.85fr_1.15fr] md:gap-16">

        <figure className="min-w-0">
          <Image src="/img/solomon.jpeg" alt={PROFILE.name} width={480} height={480} className="aspect-3/4 w-full border border-line object-cover" />
          <figcaption className="mt-3 font-mono text-xs text-muted-foreground">
            {PROFILE.name} · {PROFILE.location}
          </figcaption>
        </figure>

        <div>
          
          <p className="max-w-2xl text-muted-foreground leading-7">
            {ABOUT.body}
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-8 border-t border-line pt-8">
            {STATS.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.1} y={14}>
                <div>
                  <dt className="text-2xl font-bold tracking-tight tabular-nums sm:text-3xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
          
        </div>

      </div>
      
    </div>
  )
}

export default Bio
