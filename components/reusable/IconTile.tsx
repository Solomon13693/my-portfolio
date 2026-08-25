import type { ReactNode } from 'react'

export function IconTile({ children }: { children: ReactNode }) {
  return (
    <div className="flex size-6 shrink-0 items-center justify-center rounded-md border border-line bg-muted text-muted-foreground [&_svg]:size-3.5" aria-hidden="true">
      {children}
    </div>
  )
}

export default IconTile
