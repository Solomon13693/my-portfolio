const RADIUS = 34
const SIZE = 96
const CENTER = SIZE / 2

interface RotatingBadgeProps {
  text?: string
  inverted?: boolean
}

export function RotatingBadge({ text = 'SOLOMON ADEOYE • FULL STACK • ', inverted = false }: RotatingBadgeProps) {
  return (
    <div aria-hidden="true" className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>

      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full animate-[spin_16s_linear_infinite]" aria-hidden="true">

        <defs>
          <path
            id="rotating-badge-path"
            d={`M ${CENTER - RADIUS},${CENTER} a ${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a ${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`}
          />
        </defs>

        <text className={inverted ? 'fill-background/70' : 'fill-muted-foreground'} fontSize="6.5" letterSpacing="1.5">
          <textPath href="#rotating-badge-path">{text}</textPath>
        </text>

      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={
            inverted
              ? 'flex size-9 items-center justify-center rounded-full border border-background/30 bg-foreground font-mono text-[10px] font-medium'
              : 'flex size-9 items-center justify-center rounded-full border border-line bg-background font-mono text-[10px] font-medium'
          }
          style={{ WebkitTextStroke: inverted ? '0.5px var(--background)' : '0.5px var(--foreground)', color: 'transparent' }}>
          SA
        </div>
      </div>
      
    </div>
  )
}

export default RotatingBadge
