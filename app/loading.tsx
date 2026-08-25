export default function Loading() {
  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex size-30 items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-line" aria-hidden="true" />
          <span
            className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-foreground"
            aria-hidden="true"
          />
          <span className="font-mono text-xs font-medium tracking-wider uppercase" aria-hidden="true">
            SA
          </span>
        </div>

        <p className="font-mono text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
          Solomon Adeoye
        </p>
      </div>
    </div>
  )
}
