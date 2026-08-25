'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn, Poppins500, EASE_OUT } from '@/lib'

interface LogoProps {
  href?: string
  className?: string
}

const MotionLink = motion.create(Link)

export function Logo({ href = '/', className }: LogoProps) {
  return (
    <MotionLink
      href={href}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.25, ease: EASE_OUT }}
      className={cn(
        Poppins500.className,
        'inline-block w-fit text-xl font-semibold tracking-tight whitespace-nowrap sm:text-2xl md:text-3xl',
        className
      )}
    >
      Solomon
    </MotionLink>
  )
}

export default Logo
