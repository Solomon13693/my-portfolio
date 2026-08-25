'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useSiteTheme } from '@/hooks'
import { cn } from '@/lib'

export function ThemeToggleButton({ className }: { className?: string }) {
  const { toggleTheme } = useSiteTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const animatingRef = useRef(false)

  const handleClick = () => {
    const button = buttonRef.current
    const overlay = overlayRef.current
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isDark = document.documentElement.classList.contains('dark')

    if (animatingRef.current || prefersReducedMotion || !button || !overlay) {
      toggleTheme()
      return
    }

    const rect = button.getBoundingClientRect()
    const originX = rect.left + rect.width / 2
    const originY = rect.top + rect.height / 2
    const maxRadius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY)
    )

    const willBeDark = !isDark
    document.documentElement.classList.toggle('dark', willBeDark)
    const targetBg = getComputedStyle(document.documentElement).getPropertyValue('--background').trim()
    document.documentElement.classList.toggle('dark', !willBeDark)

    animatingRef.current = true
    overlay.style.display = 'block'
    overlay.style.backgroundColor = targetBg
    overlay.style.clipPath = `circle(0px at ${originX}px ${originY}px)`

    const state = { radius: 0 }
    const setClip = () => {
      overlay.style.clipPath = `circle(${state.radius}px at ${originX}px ${originY}px)`
    }

    gsap
      .timeline({
        onComplete: () => {
          overlay.style.display = 'none'
          animatingRef.current = false
        },
      })
      .to(state, {
        radius: maxRadius,
        duration: 0.55,
        ease: 'power3.inOut',
        onUpdate: setClip,
        onComplete: toggleTheme,
      })
      .to(state, {
        radius: 0,
        duration: 0.5,
        ease: 'power3.inOut',
        onUpdate: setClip,
      })
  }

  return (
    <>
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        aria-label="Toggle theme"
        whileTap={{ scale: 0.85 }}
        className={cn(
          'inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer',
          className
        )}>

        <span className="relative inline-flex size-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 dark:hidden"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 3v1" />
            <path d="M12 20v1" />
            <path d="M3 12h1" />
            <path d="M20 12h1" />
            <path d="m18.364 5.636-.707.707" />
            <path d="m6.343 17.657-.707.707" />
            <path d="m5.636 5.636.707.707" />
            <path d="m17.657 17.657.707.707" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute inset-0 size-4 hidden dark:block"
            aria-hidden="true"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </span>

      </motion.button>

      <div ref={overlayRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-300 hidden" />
    </>
  )
}

export default ThemeToggleButton
