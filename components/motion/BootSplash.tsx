const SIZE = 120
const RADIUS = 52
const CENTER = SIZE / 2

export function BootSplash() {
  return (
    <div
      id="boot-splash"
      className="boot-splash"
      role="status"
      aria-live="polite"
      aria-label="Loading">
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex size-30 items-center justify-center">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 size-full -rotate-90">
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              strokeWidth={1}
              fill="none"
              className="stroke-line"
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              strokeWidth={1}
              fill="none"
              strokeLinecap="round"
              className="boot-splash-ring stroke-foreground"
            />
          </svg>

          <span className="boot-splash-mark font-mono text-xs font-medium tracking-wider uppercase">
            SA
          </span>
        </div>

        <p className="boot-splash-name font-mono text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
          Solomon Adeoye
        </p>
      </div>
    </div>
  )
}

export default BootSplash
