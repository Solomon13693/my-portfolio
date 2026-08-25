'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RotatingBadge, SpinningLink } from '@/components'

gsap.registerPlugin(ScrollTrigger)

const RIBBON_A = ['React', 'Next.js', 'TypeScript']
const RIBBON_B = ['JavaScript', 'Typescript', 'React JS', 'Next JS', 'React Native', 'PHP', 'Tailwind CSS', 'REST APIs', 'GraphQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis']

interface RibbonProps {
  items: string[]
  tone: 'strong' | 'soft'
  direction?: 'left' | 'right'
  speed?: number
}

function Ribbon({ items, tone, direction = 'left', speed = 28 }: RibbonProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const track = [...items, ...items, ...items]

  useGSAP(
    () => {
      if (!trackRef.current) return

      // Content is tripled, so a shift of exactly one third of the track's
      // width lines back up with the start — the loop point is invisible.
      if (direction === 'left') {
        gsap.to(trackRef.current, { xPercent: -33.333, duration: speed, ease: 'none', repeat: -1 })
      } else {
        gsap.fromTo(
          trackRef.current,
          { xPercent: -33.333 },
          { xPercent: 0, duration: speed, ease: 'none', repeat: -1 }
        )
      }
    },
    { scope: trackRef }
  )

  return (
    <div
      ref={trackRef}
      className={
        tone === 'strong'
          ? 'flex w-fit items-center gap-8 border-y border-background/20 bg-foreground py-5 whitespace-nowrap text-background'
          : 'flex w-fit items-center gap-8 border-y border-line bg-muted py-5 whitespace-nowrap text-foreground'
      }>
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
  const sectionRef = useRef<HTMLDivElement>(null)
  const topRibbonRef = useRef<HTMLDivElement>(null)
  const bottomRibbonRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const scrollTrigger = {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      }

      if (topRibbonRef.current) {
        gsap.to(topRibbonRef.current, { y: -120, ease: 'none', scrollTrigger })
      }
      if (bottomRibbonRef.current) {
        gsap.to(bottomRibbonRef.current, { y: 80, ease: 'none', scrollTrigger })
      }
    },
    { scope: sectionRef }
  )

  return (
    <div ref={sectionRef} className="relative isolate overflow-hidden border-b border-line bg-background text-foreground ">

      <div className="container relative z-10 pt-10 pb-40 sm:pt-16 sm:pb-52">


        <div className="flex justify-start">
          <RotatingBadge text="SOLOMON ADEOYE • BUILD & SHIP • " />
        </div>

        <div className="mt-6 flex items-center gap-8 sm:pt-12">

          <div aria-hidden="true" className="hidden flex-col gap-10 lg:flex">
            {['Frontend', 'Backend', 'Full stack'].map((label) => (
              <span key={label} className="font-mono text-xs tracking-widest text-muted-foreground uppercase"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                {label}
              </span>
            ))}
          </div>

          <div className="relative isolate">

            <span aria-hidden="true" className="pointer-events-none absolute -top-16 -left-2 -z-10 hidden font-bold text-[12rem] leading-none select-none sm:block sm:text-[24rem]" style={{ WebkitTextStroke: '1px var(--line)', color: 'transparent' }}>
              S
            </span>

            <h2 className="text-4xl leading-[1.2] tracking-tight sm:text-6xl">
              Full Stack {' '}<span className="text-muted-foreground">Software Engineer.</span>
            </h2>

            <h2 className="mt-3 text-4xl leading-[1.2] tracking-tight sm:mt-4 sm:text-6xl">
              Frontend, Backend, Mobile app.
            </h2>

            <h2 className="mt-3 text-4xl leading-[1.2] tracking-tight sm:mt-4 sm:text-6xl">&More.</h2>

          </div>

        </div>

      </div>

      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <div className="relative h-full">
          <div className="absolute inset-y-0 right-0 w-[26%] overflow-hidden">
            <div ref={topRibbonRef} className="absolute top-[-12%] left-[10%] right-0 w-[360%]">
              <div className="origin-top-left rotate-45">
                <Ribbon items={RIBBON_A} tone="strong" direction="left" speed={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 overflow-hidden sm:h-80 lg:h-96">
        <div ref={bottomRibbonRef} className="absolute -bottom-1/2 -left-1/4 w-[200%] sm:bottom-0 sm:left-[-10%] sm:w-[220%]">
          <div className="origin-bottom-left -rotate-6 sm:rotate-[-8deg]">
            <Ribbon items={RIBBON_B} tone="soft" direction="right" speed={42} />
          </div>
        </div>
      </div>

      <div className="absolute right-6 bottom-20 z-10 sm:right-12 sm:bottom-8">
        <SpinningLink href="/work" text="SEE MY WORK • VIEW PROJECTS • " />
      </div>

    </div>
  )
}

export default IntroBanner
