'use client'

import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  const id = setInterval(callback, 60_000)
  return () => clearInterval(id)
}

function computeGreeting(timeZone: string) {
  const hour = Number(
    new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', hour12: false }).format(new Date())
  )
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

// Server has no notion of "now" worth trusting — render a neutral placeholder
// there and let the client fill in the real greeting after mount.
function getServerSnapshot() {
  return 'Hello'
}

export function Greeting({ timeZone }: { timeZone: string }) {
  const greeting = useSyncExternalStore(subscribe, () => computeGreeting(timeZone), getServerSnapshot)
  return <span>{greeting}</span>
}

export default Greeting
