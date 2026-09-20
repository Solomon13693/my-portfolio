import type { Project } from '@/types'

interface ProjectChangesProps {
  changes: NonNullable<Project['changes']>
}

export function ProjectChanges({ changes }: ProjectChangesProps) {
  return (
    <div className="space-y-3 font-mono text-xs leading-relaxed sm:text-sm">
      <ul className="space-y-1.5 text-muted-foreground">
        {changes.before.map((line) => (
          <li key={line} className="flex gap-2">
            <span className="shrink-0 text-muted-foreground/70" aria-hidden="true">
              −
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <ul className="space-y-1.5 text-foreground/90">
        {changes.after.map((line) => (
          <li key={line} className="flex gap-2">
            <span className="shrink-0 text-foreground" aria-hidden="true">
              +
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface ProjectOwnershipFooterProps {
  project: Project
  stackLimit?: number
}

export function ProjectOwnershipFooter({ project, stackLimit = 8 }: ProjectOwnershipFooterProps) {
  const site = project.links[0]
  const stack = project.stack.slice(0, stackLimit).map((s) => s.toLowerCase()).join(' · ')
  const role = project.roleLine ?? project.role.map((r) => r.toLowerCase()).join(' · ')

  return (
    <p className="font-mono text-[0.7rem] leading-relaxed tracking-wide text-muted-foreground uppercase sm:text-xs">
      <span>role: {role}</span>
      <span className="mx-2 text-muted-foreground/40" aria-hidden="true">
        ·
      </span>
      <span>stack: {stack}</span>
      {site && (
        <>
          <span className="mx-2 text-muted-foreground/40" aria-hidden="true">
            ·
          </span>
          <span>
            site:{' '}
            <a
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:text-foreground hover:underline"
            >
              {site.label}
            </a>
          </span>
        </>
      )}
    </p>
  )
}
