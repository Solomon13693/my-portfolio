import { TechBadge } from '@/components/reusable'
import { STACK } from '@/data'
import { Reveal } from '../motion'

export function TechStack() {
  return (
    <div className="border-b border-line">
      <div className="container py-10 sm:py-16">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Stack</p>
        <div className="mt-3 h-px w-10 bg-foreground" aria-hidden="true" />

        <div className="mt-10 border-t border-line sm:mt-16">
          {STACK.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.06} y={16}>
              <div
                className="grid items-start gap-y-2 border-b border-line py-6 sm:grid-cols-[10rem_1fr] sm:gap-4"
              >
                <p className="text-sm">
                  <span className="mr-1.5 font-mono text-muted-foreground/80 select-none" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {category.label}
                </p>

                <ul className="flex flex-wrap gap-1.5">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      <TechBadge name={item.name} href={item.href} />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TechStack
