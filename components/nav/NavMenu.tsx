'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV_LINKS } from '@/constants'
import { cn, EASE_OUT } from '@/lib'
import { PROFILE } from '@/data'
import { Logo, SocialLinks } from '../reusable'

const DESTINATIONS = [{ id: 'home', label: 'Home', href: '/', description: 'Start here' }, ...NAV_LINKS]

const EASE = EASE_OUT

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close on navigation — adjusting state during render (React's documented
  // pattern for resetting state when a prop changes) rather than in an effect.
  const [lastPathname, setLastPathname] = useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setIsOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>

      <motion.button type="button" onClick={() => setIsOpen(true)} aria-label="Open menu" aria-expanded={isOpen} whileTap={{ scale: 0.9 }} className="flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer">
        Menu
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <motion.path d="M1 4h14" animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 5 : 0 }} style={{ originX: '8px', originY: '4px' }} transition={{ duration: 0.25, ease: EASE }} />
          <motion.path d="M1 10h9" animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -5 : 0, x: isOpen ? 1.5 : 0 }} style={{ originX: '5.5px', originY: '10px' }} transition={{ duration: 0.25, ease: EASE }} />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-100 overflow-y-auto bg-background"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}>
            <div className="container flex min-h-svh flex-col py-10">

              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05, ease: EASE }}>
                <Logo />
                <motion.button type="button" onClick={() => setIsOpen(false)} aria-label="Close menu" whileTap={{ scale: 0.9 }} className="font-mono text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Close
                </motion.button>
              </motion.div>

              <div className="flex w-full flex-1 flex-col justify-center">

                <motion.p
                  className="font-mono text-xs tracking-wider text-muted-foreground uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}>
                  Index · {DESTINATIONS.length} destinations
                </motion.p>

                <nav aria-label="All pages" className="mt-6 flex flex-col">
                  {DESTINATIONS.map((item, index) => {
                    const active = pathname === item.href
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.12 + index * 0.06, ease: EASE }}>
                        <Link href={item.href} className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-3 border-b border-line py-4">

                          <span className="font-mono text-xs text-muted-foreground">
                            {String(index).padStart(2, '0')}
                          </span>

                          <motion.span
                            whileHover={{ x: 8 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className={cn(
                              'w-fit text-3xl font-medium tracking-tight uppercase transition-colors text-muted-foreground',
                              active ? 'text-foreground' : 'group-hover:text-foreground'
                            )}>
                            {item.label}
                          </motion.span>

                          <span className="col-span-2 text-sm text-muted-foreground">{item.description}
                          </span>

                        </Link>
                      </motion.div>
                    )
                  })}

                </nav>

              </div>

              <motion.div
                className="flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 + DESTINATIONS.length * 0.06, ease: EASE }}>

                <div className="flex flex-col gap-2 font-mono text-sm text-muted-foreground">
                  <a href={`mailto:${PROFILE.email}`} className="w-fit transition-colors hover:text-foreground">
                    {PROFILE.email}
                  </a>
                  <a href={`tel:${PROFILE.phone.replace(/\s/g, '')}`} className="w-fit transition-colors hover:text-foreground">
                    {PROFILE.phone}
                  </a>
                </div>

                <SocialLinks />
              </motion.div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
      
    </>
  )
}

export default NavMenu
