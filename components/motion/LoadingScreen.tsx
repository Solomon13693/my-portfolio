'use client'

import { useEffect } from 'react'
import { SPLASH_DONE_CLASS, SPLASH_DURATION_MS } from '@/lib/site-boot'

export function LoadingScreen() {
  useEffect(() => {
    const root = document.documentElement
    if (root.classList.contains(SPLASH_DONE_CLASS)) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(
      () => root.classList.add(SPLASH_DONE_CLASS),
      reduce ? 0 : SPLASH_DURATION_MS
    )

    return () => window.clearTimeout(timer)
  }, [])

  return null
}

export default LoadingScreen
