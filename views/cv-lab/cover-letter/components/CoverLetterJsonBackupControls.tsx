'use client'

import { useCoverLetters } from '@/hooks'
import { normalizeImportedCoverLetterState, COVER_LETTER_STATE_VERSION } from '@/lib'
import { JsonBackupControls } from '@/views/cv-lab/components/JsonBackupControls'

export function CoverLetterJsonBackupControls() {
  const { state, updateState } = useCoverLetters()

  return (
    <JsonBackupControls
      value={state}
      filename="cover-letters-backup.json"
      onImport={(parsed) => {
        try {
          const normalized = normalizeImportedCoverLetterState(parsed)
          updateState(() => ({ ...normalized, version: COVER_LETTER_STATE_VERSION }))
        } catch {
          window.alert("That file doesn't look like a valid cover letter backup.")
        }
      }}
    />
  )
}

export default CoverLetterJsonBackupControls
