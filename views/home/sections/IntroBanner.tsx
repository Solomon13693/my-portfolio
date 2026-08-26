import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ROUTES } from '@/constants'
import { cn } from '@/lib'

const RIBBON_A = ['React', 'Next.js', 'TypeScript']
const RIBBON_B = [
  'JavaScript',
  'Typescript',
  'React JS',
  'Next JS',
  'React Native',
  'PHP',
  'Tailwind CSS',
  'REST APIs',
  'GraphQL',
  'MySQL',
  'PostgreSQL',
  'MongoDB',
  'Redis',
]

interface RibbonProps {
  items: string[]
  tone: 'strong' | 'soft'
}

function Ribbon({ items, tone }: RibbonProps) {
  const track = [...items, ...items, ...items]

  return (
    <div
      className={cn(
        'flex w-max items-center gap-8 border-y py-5 whitespace-nowrap',
        tone === 'strong'
          ? 'border-background/20 bg-foreground text-background'
          : 'border-line bg-muted text-foreground'
      )}>
      {track.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center gap-8 font-mono text-xs tracking-widest uppercase">
          {item}
          <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-current opacity-50" />
        </span>
      ))}
    </div>
  )
}

export function IntroBanner() {
  return (
    <div className="relative isolate overflow-hidden border-b border-line bg-background text-foreground">
      <div className="container relative z-10 pt-10 pb-40 sm:pt-16 sm:pb-52">
        <div className="flex items-center gap-8 sm:pt-12">
          <div aria-hidden="true" className="hidden flex-col gap-10 lg:flex">
            {['Frontend', 'Backend', 'Full stack'].map((label) => (
              <span
                key={label}
                className="font-mono text-xs tracking-widest text-muted-foreground uppercase"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                {label}
              </span>
            ))}
          </div>

          <div className="relative isolate">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -left-2 -z-10 hidden font-bold text-[12rem] leading-none select-none sm:block sm:text-[24rem]"
              style={{ WebkitTextStroke: '1px var(--line)', color: 'transparent' }}>
              S
            </span>

            <h2 className="text-4xl leading-[1.2] tracking-tight sm:text-6xl">
              <span className="text-muted-foreground">Software Developer.</span>
            </h2>

            <h2 className="mt-3 text-4xl leading-[1.2] tracking-tight sm:mt-4 sm:text-6xl">
              Frontend, Backend,
            </h2>

            <h2 className="mt-3 text-4xl leading-[1.2] tracking-tight sm:mt-4 sm:text-6xl">Mobile app.</h2>

            <Link
              href={ROUTES.work}
              className="group mt-8 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground">
              See my work
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
        <div className="relative h-full">
          <div className="absolute inset-y-0 right-0 w-[26%] overflow-hidden">
            <div className="absolute top-[-12%] left-[10%] right-0 w-[360%]">
              <div className="origin-top-left rotate-45">
                <Ribbon items={RIBBON_A} tone="strong" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 overflow-hidden sm:h-80 lg:h-96">
        <div className="absolute -bottom-1/2 -left-1/4 w-[200%] sm:bottom-0 sm:left-[-10%] sm:w-[220%]">
          <div className="origin-bottom-left -rotate-6 sm:rotate-[-8deg]">
            <Ribbon items={RIBBON_B} tone="soft" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntroBanner
