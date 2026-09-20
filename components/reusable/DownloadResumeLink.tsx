import { Download } from 'lucide-react'
import { PROFILE } from '@/data'
import { cn } from '@/lib'

interface DownloadResumeLinkProps {
  className?: string
  variant?: 'inline' | 'button'
  showIcon?: boolean
}

export function DownloadResumeLink({
  className,
  variant = 'inline',
  showIcon = true,
}: DownloadResumeLinkProps) {
  return (
    <a
      href={PROFILE.resumePdf}
      download={PROFILE.resumeFilename}
      className={cn(
        'inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase transition-colors',
        variant === 'button'
          ? 'min-h-11 border border-line px-4 hover:border-foreground/30 hover:text-foreground'
          : 'hover:text-foreground',
        className,
      )}
    >
      {showIcon ? <Download className="size-3.5" aria-hidden="true" /> : null}
      Download CV
    </a>
  )
}

export default DownloadResumeLink
