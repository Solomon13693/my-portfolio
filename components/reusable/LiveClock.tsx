'use client'

import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  const id = setInterval(callback, 1_000)
  return () => clearInterval(id)
}

function formatTime(timeZone: string) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(new Date())
}

// Server has no notion of "now" worth trusting for display — render a stable
// placeholder there and let the client fill in the real time after mount.
function getServerSnapshot() {
  return '--:--:--'
}

export function LiveClock({ timeZone }: { timeZone: string }) {
  const time = useSyncExternalStore(subscribe, () => formatTime(timeZone), getServerSnapshot)
  return <span className="tabular-nums">{time}</span>
}

export default LiveClock
