'use client'

import { useCallback, useSyncExternalStore } from 'react'
import { createLocalStorageDraftStore } from '@/lib'
import type { AiSettings } from '@/types'

const buildDefault = (): AiSettings => ({
  version: 1,
  providerId: 'anthropic',
  model: 'claude-sonnet-4-5',
  apiKey: '',
})

const store = createLocalStorageDraftStore<AiSettings>({
  key: 'cv-lab-ai-settings',
  currentVersion: 1,
  buildDefault,
})

const SERVER_SNAPSHOT = buildDefault()
function getServerSnapshot() {
  return SERVER_SNAPSHOT
}

export function useAiSettings() {
  const settings = useSyncExternalStore(store.subscribe, store.load, getServerSnapshot)

  const updateSettings = useCallback((patch: Partial<AiSettings>) => {
    const prev = store.load()
    store.save({ ...prev, ...patch, version: 1 })
  }, [])

  return { settings, updateSettings }
}

export default useAiSettings
