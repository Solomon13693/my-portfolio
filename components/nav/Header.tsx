'use client'

import { motion } from 'framer-motion'
import { PROFILE } from '@/data'
import { EASE_OUT } from '@/lib'
import { Logo } from '../reusable'
import { ThemeToggleButton } from './ThemeToggleButton'
import { NavMenu } from './NavMenu'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background">

      <div className="container relative flex h-(--header-height) items-center gap-2">

        <div className="hidden items-center gap-2 sm:flex">

          <motion.a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" whileHover={{ y: -1 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2, ease: EASE_OUT }} className="font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground">
            LinkedIn
          </motion.a>

          <span aria-hidden="true" className="size-1 rounded-full bg-line" />

          <motion.a href={PROFILE.github} target="_blank" rel="noopener noreferrer" whileHover={{ y: -1 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2, ease: EASE_OUT }} className="font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground">
            GitHub
          </motion.a>

        </div>

        <div className="absolute top-1/2 sm:left-1/2 sm:-translate-x-1/2 -translate-y-1/2">
          <Logo />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <NavMenu />
          <div className="mx-2 h-5 w-px bg-line" aria-hidden="true" />
          <ThemeToggleButton />
        </div>

      </div>

    </header>
  )
}

export default Header
