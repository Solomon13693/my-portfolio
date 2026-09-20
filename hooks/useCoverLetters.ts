'use client'

import { useCallback, useSyncExternalStore } from 'react'
import {
  createLocalStorageDraftStore,
  buildDefaultCoverLetterState,
  COVER_LETTER_STATE_VERSION,
  migrateCoverLetterState,
  createId,
} from '@/lib'
import type { CoverLetterState, SavedCoverLetter } from '@/types'

const store = createLocalStorageDraftStore<CoverLetterState>({
  // New key so early visitors who got seeded template copy start blank.
  key: 'cv-lab-cover-letters-v3',
  currentVersion: COVER_LETTER_STATE_VERSION,
  buildDefault: buildDefaultCoverLetterState,
  migrate: migrateCoverLetterState,
})

const SERVER_SNAPSHOT = buildDefaultCoverLetterState()
function getServerSnapshot() {
  return SERVER_SNAPSHOT
}

export function useCoverLetters() {
  const state = useSyncExternalStore(store.subscribe, store.load, getServerSnapshot)

  const updateState = useCallback((updater: (prev: CoverLetterState) => CoverLetterState) => {
    const next = updater(store.load())
    store.save({ ...next, version: COVER_LETTER_STATE_VERSION })
  }, [])

  const updateTemplate = useCallback((body: string) => {
    updateState((prev) => ({ ...prev, template: { ...prev.template, body } }))
  }, [updateState])

  const saveLetter = useCallback(
    (letter: Omit<SavedCoverLetter, 'createdAt' | 'updatedAt' | 'id'> & { id?: string }) => {
      const prev = store.load()
      const now = new Date().toISOString()

      if (letter.id) {
        const exists = prev.letters.some((l) => l.id === letter.id)
        if (exists) {
          const letters = prev.letters.map((l) =>
            l.id === letter.id ? { ...l, ...letter, id: letter.id as string, updatedAt: now } : l
          )
          store.save({ ...prev, letters, version: COVER_LETTER_STATE_VERSION })
          return
        }
      }

      const saved: SavedCoverLetter = { ...letter, id: letter.id ?? createId('letter'), createdAt: now, updatedAt: now }
      store.save({ ...prev, letters: [saved, ...prev.letters], version: COVER_LETTER_STATE_VERSION })
    },
    []
  )

  const deleteLetter = useCallback((id: string) => {
    const prev = store.load()
    store.save({ ...prev, letters: prev.letters.filter((l) => l.id !== id), version: COVER_LETTER_STATE_VERSION })
  }, [])

  return { state, updateState, updateTemplate, saveLetter, deleteLetter }
}

export default useCoverLetters
