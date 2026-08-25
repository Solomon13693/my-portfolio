'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import { cn, EASE_OUT } from '@/lib'

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard access can fail (permissions, insecure context) — fail silently, no crash.
    }
  }

  return (
    <motion.button
      type="button"
      onClick={onCopy}
      aria-label="Copy"
      whileTap={{ scale: 0.85 }}
      className={cn(
        'inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground',
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? 'check' : 'copy'}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="flex"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

export default CopyButton
