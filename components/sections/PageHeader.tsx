import { RotatingBadge } from './RotatingBadge'

interface PageHeaderProps {
  eyebrow: string
  title: string
  description?: string
  sidebarLabels?: string[]
}

export function PageHeader({ eyebrow, title, description, sidebarLabels }: PageHeaderProps) {
  return (
    <div className="relative border-b border-line">
      {sidebarLabels && sidebarLabels.length > 0 && (
        <div aria-hidden="true" className="absolute top-28 left-6 hidden w-8 flex-col gap-10 md:left-12 lg:flex">
          {sidebarLabels.map((label) => (
            <span
              key={label}
              className="font-mono text-xs tracking-widest text-muted-foreground uppercase"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              {label}
            </span>
          ))}
        </div>
      )}

      <div className="container py-10 sm:py-16">
        <div className={sidebarLabels && sidebarLabels.length > 0 ? 'lg:pl-14' : undefined}>
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{eyebrow}</p>
              <div className="mt-3 h-px w-10 bg-foreground" aria-hidden="true" />
            </div>
            <RotatingBadge />
          </div>

          <div className="relative isolate mt-10 sm:mt-16">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 -left-2 -z-10 hidden font-bold text-[10rem] leading-none select-none sm:-top-10 sm:block sm:text-[14rem]"
              style={{ WebkitTextStroke: '1px var(--line)', color: 'transparent' }}>
              {title[0]}
            </span>

            <h1 className="text-4xl font-medium tracking-tight sm:text-6xl">{title}</h1>
            {description && <p className="mt-6 max-w-xl text-muted-foreground">{description}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageHeader
