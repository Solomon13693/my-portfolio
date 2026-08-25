'use client'

import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ArrowUp } from 'lucide-react'
import { EASE_OUT } from '@/lib'

gsap.registerPlugin(ScrollToPlugin)

function scrollToTop() {
  gsap.to(window, { duration: 1, scrollTo: 0, ease: 'power3.inOut' })
}

export function BackToTopButton() {
  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      initial="rest"
      whileHover="hover"
      animate="rest"
      whileTap={{ scale: 0.88 }}
      className="flex size-9 items-center justify-center overflow-hidden rounded-md border border-line text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground cursor-pointer">
      <motion.span
        variants={{ rest: { y: 0 }, hover: { y: -3 } }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        className="flex">
        <ArrowUp className="size-4" />
      </motion.span>
    </motion.button>
  )
}

export default BackToTopButton
