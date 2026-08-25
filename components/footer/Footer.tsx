import { PROFILE } from '@/data'
import { Logo, SocialLinks } from '../reusable'
import { BackToTopButton } from './BackToTopButton'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="container flex flex-col items-center gap-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">

        <div className="flex flex-col items-center gap-2 sm:items-start">
          <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
            © {year} {PROFILE.name} · {PROFILE.location}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <SocialLinks />

          <span aria-hidden="true" className="hidden h-5 w-px bg-line sm:block" />

          <BackToTopButton />
        </div>

      </div>
    </footer>
  )
}

export default Footer
