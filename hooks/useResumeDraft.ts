'use client'

import { useCallback, useSyncExternalStore } from 'react'
import { createLocalStorageDraftStore, buildDefaultResumeDraft, RESUME_DRAFT_VERSION, migrateResumeDraft } from '@/lib'
import type { ResumeDraft } from '@/types'

const store = createLocalStorageDraftStore<ResumeDraft>({
  // New key so early visitors who got seeded portfolio data start blank.
  key: 'cv-lab-resume-draft-v4',
  currentVersion: RESUME_DRAFT_VERSION,
  buildDefault: buildDefaultResumeDraft,
  migrate: migrateResumeDraft,
})

const SERVER_SNAPSHOT = buildDefaultResumeDraft()
function getServerSnapshot() {
  return SERVER_SNAPSHOT
}

export function useResumeDraft() {
  const draft = useSyncExternalStore(store.subscribe, store.load, getServerSnapshot)

  const updateDraft = useCallback((updater: (prev: ResumeDraft) => ResumeDraft) => {
    const next = updater(store.load())
    store.save({ ...next, updatedAt: new Date().toISOString(), version: RESUME_DRAFT_VERSION })
  }, [])

  const resetToDefaults = useCallback(() => {
    store.save(buildDefaultResumeDraft())
  }, [])

  return { draft, updateDraft, resetToDefaults }
}

export default useResumeDraft
