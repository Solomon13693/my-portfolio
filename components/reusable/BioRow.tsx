import type { ReactNode } from 'react'
import { IconTile } from './IconTile'
import { CopyButton } from './CopyButton'

interface BioRowProps {
  icon: ReactNode
  children: ReactNode
  copyValue?: string
  copyLabel?: string
  fullWidth?: boolean
}

export function BioRow({ icon, children, copyValue, copyLabel, fullWidth }: BioRowProps) {
  return (
    <div className={`group flex items-center gap-4 font-mono text-sm ${fullWidth ? 'sm:col-span-2' : ''}`}>
      <IconTile>{icon}</IconTile>
      <p className="flex-1 text-balance">{children}</p>
      {copyValue && <CopyButton value={copyValue} label={copyLabel} />}
    </div>
  )
}

export default BioRow
