'use client'

import { createContext, useCallback, useContext, useSyncExternalStore, type ReactNode } from 'react'
import { THEME_STORAGE_KEY } from '@/lib/site-boot'

export type SiteTheme = 'light' | 'dark'

const CHANGE_EVENT = 'portfolio-theme-change'
const SYSTEM_QUERY = '(prefers-color-scheme: dark)'

export function applyThemeClass(theme: SiteTheme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

function getSnapshot(): SiteTheme {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia(SYSTEM_QUERY).matches ? 'dark' : 'light'
}

function getServerSnapshot(): SiteTheme {
  return 'light'
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback)

  const media = window.matchMedia(SYSTEM_QUERY)
  const onSystemChange = () => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored !== 'dark' && stored !== 'light') {
      applyThemeClass(media.matches ? 'dark' : 'light')
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
    window.localStorage.setItem(THEME_STORAGE_KEY, next)
    applyThemeClass(next)
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
