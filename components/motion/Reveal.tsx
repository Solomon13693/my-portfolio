import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

export function Reveal({ children, delay = 0, y = 32, className }: RevealProps) {
  const style: CSSProperties | undefined = delay ? { animationDelay: `${delay}s` } : undefined

  return (
    <div className={cn(y === 0 ? 'reveal-fade' : 'reveal-up', className)} style={style}>
      {children}
    </div>
  )
}

export default Reveal
