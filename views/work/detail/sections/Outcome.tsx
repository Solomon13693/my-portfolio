import type { Project } from '@/data'

interface OutcomeProps {
  project: Project
}

export function Outcome({ project }: OutcomeProps) {
  const stats = [
    { value: project.period, label: 'timeline' },
    { value: String(project.stack.length), label: 'tools & integrations' },
  ]

  return (
    <div className="border-b border-line bg-muted/40">

      <div className="container py-10 sm:py-16">

        <span className="inline-flex items-center gap-1.5 border border-line bg-background px-3 py-1 font-mono text-xs tracking-wider text-muted-foreground uppercase">
          {project.current && (
            <span className="relative flex size-1.5" aria-hidden="true">
              <span className="absolute inline-flex size-1.5 animate-ping rounded-full bg-foreground/50" />
              <span className="relative inline-flex size-1.5 rounded-full bg-foreground" />
            </span>
          )}
          {project.status}
        </span>

        <dl className="mt-8 grid grid-cols-2 gap-8 sm:w-fit sm:gap-16">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-2xl font-bold tracking-tight tabular-nums sm:text-3xl">{stat.value}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>

      </div>
      
    </div>
  )
}

export default Outcome
