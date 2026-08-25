'use client'

import { createContext, useCallback, useContext, useSyncExternalStore, type ReactNode } from 'react'

export type SiteTheme = 'light' | 'dark'

const STORAGE_KEY = 'portfolio-theme'
const CHANGE_EVENT = 'portfolio-theme-change'
const SYSTEM_QUERY = '(prefers-color-scheme: dark)'


function getSnapshot(): SiteTheme {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia(SYSTEM_QUERY).matches ? 'dark' : 'light'
}

// Server (and the very first client render, before hydration) has no localStorage —
// always 'light' here. This is the sanctioned way to read an external store that
// legitimately differs between server and client without a hydration mismatch;
// the inline script in RootLayout has already set the real class before paint.
function getServerSnapshot(): SiteTheme {
  return 'light'
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback)
  
  const media = window.matchMedia(SYSTEM_QUERY)
  const onSystemChange = () => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored !== 'dark' && stored !== 'light') {
      document.documentElement.classList.toggle('dark', media.matches)
    }
    callback()
  }
  media.addEventListener('change', onSystemChange)

  return () => {
    window.removeEventListener(CHANGE_EVENT, callback)
    media.removeEventListener('change', onSystemChange)
  }
}

type SiteThemeContextValue = {
  theme: SiteTheme
  isDark: boolean
  toggleTheme: () => void
}

const SiteThemeContext = createContext<SiteThemeContextValue | null>(null)

export function SiteThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleTheme = useCallback(() => {
    const next: SiteTheme = getSnapshot() === 'light' ? 'dark' : 'light'
    window.localStorage.setItem(STORAGE_KEY, next)
    document.documentElement.classList.toggle('dark', next === 'dark')
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }, [])

  return (
    <SiteThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme }}>
      {children}
    </SiteThemeContext.Provider>
  )
}

export function useSiteTheme() {
  const ctx = useContext(SiteThemeContext)
  if (!ctx) throw new Error('useSiteTheme must be used within a SiteThemeProvider')
  return ctx
}
