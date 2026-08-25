'use client'

import { motion } from 'framer-motion'
import { SiGithub, SiInstagram } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa6'
import { cn, EASE_OUT } from '@/lib'
import { PROFILE } from '@/data'

const SOCIALS = [
  { label: 'GitHub', href: PROFILE.github, Icon: SiGithub },
  { label: 'LinkedIn', href: PROFILE.linkedin, Icon: FaLinkedin },
  { label: 'Instagram', href: PROFILE.instagram, Icon: SiInstagram },
]

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {SOCIALS.map(({ label, href, Icon }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="flex size-9 items-center justify-center rounded-md border border-line text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          <Icon className="size-4" />
        </motion.a>
      ))}
    </div>
  )
}

export default SocialLinks
