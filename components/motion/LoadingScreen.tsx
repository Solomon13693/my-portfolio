'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const SIZE = 120
const RADIUS = 52
const CENTER = SIZE / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const STORAGE_KEY = 'portfolio-splash-seen'

function subscribe() {
  return () => {}
}

// Server (and the very first client render, before hydration) can't read
// sessionStorage/matchMedia — always false there, same rationale as
// useSiteTheme. The real value only exists client-side, post-hydration.
function getServerSnapshot() {
  return false
}

function getSnapshot() {
  if (sessionStorage.getItem(STORAGE_KEY)) return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function LoadingScreen() {
  const shouldPlayNow = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const [hasLatched, setHasLatched] = useState(false)
  if (shouldPlayNow && !hasLatched) {
    setHasLatched(true)
  }

  const [dismissed, setDismissed] = useState(false)
  const visible = hasLatched && !dismissed

  useEffect(() => {
    if (!hasLatched) return
    sessionStorage.setItem(STORAGE_KEY, '1')
    const timer = setTimeout(() => setDismissed(true), 1500)
    return () => clearTimeout(timer)
  }, [hasLatched])

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-200 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }} >
          <motion.div
            className="flex flex-col items-center gap-5"
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.3 } }}>
            <div className="relative flex size-30 items-center justify-center">
              <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 size-full -rotate-90">
                <circle cx={CENTER} cy={CENTER} r={RADIUS} strokeWidth={1} fill="none" className="stroke-line" />

                <motion.circle
                  cx={CENTER}
                  cy={CENTER}
                  r={RADIUS}
                  strokeWidth={1}
                  fill="none"
                  strokeLinecap="round"
                  className="stroke-foreground"
                  strokeDasharray={CIRCUMFERENCE}
                  initial={{ strokeDashoffset: CIRCUMFERENCE }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
                />
              </svg>

              <motion.span
                className="font-mono text-xs font-medium tracking-wider uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                aria-hidden="true">
                SA
              </motion.span>

            </div>

            <motion.p
              className="font-mono text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}>
              Solomon Adeoye
            </motion.p>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
