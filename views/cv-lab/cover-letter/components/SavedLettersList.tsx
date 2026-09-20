'use client'

import { Trash2, Copy as CopyIcon } from 'lucide-react'
import { cn } from '@/lib'
import { useCoverLetters } from '@/hooks'
import type { SavedCoverLetter } from '@/types'
import { ExportCoverLetterPdfButton } from './ExportCoverLetterPdfButton'

interface SavedLettersListProps {
  onLoad: (letter: SavedCoverLetter) => void
  onDuplicate: (letter: SavedCoverLetter) => void
  activeId?: string
}

export function SavedLettersList({ onLoad, onDuplicate, activeId }: SavedLettersListProps) {
  const { state, deleteLetter } = useCoverLetters()

  if (state.letters.length === 0) {
    return <p className="text-sm text-muted-foreground">No saved letters yet.</p>
  }

  return (
    <div className="space-y-2">
      {state.letters.map((letter) => (
        <div key={letter.id} className={cn('flex items-center justify-between gap-3 border border-line p-3', activeId === letter.id && 'border-foreground')}>
          <button type="button" onClick={() => onLoad(letter)} className="min-w-0 flex-1 cursor-pointer text-left">
            <p className="truncate text-sm font-medium">{letter.label || 'Untitled letter'}</p>
            <p className="text-xs text-muted-foreground">{new Date(letter.updatedAt).toLocaleDateString()}</p>
          </button>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onDuplicate(letter)}
              aria-label="Duplicate as new"
              className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <CopyIcon className="size-4" />
            </button>
            <ExportCoverLetterPdfButton body={letter.body} placeholders={letter.placeholders} iconOnly />
            <button
              type="button"
              onClick={() => deleteLetter(letter.id)}
              aria-label="Delete letter"
              className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SavedLettersList
