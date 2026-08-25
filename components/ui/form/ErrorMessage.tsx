'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE_OUT } from '@/lib'

interface ErrorMessageProps {
  error?: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => (
  <AnimatePresence initial={false}>
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -4, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0, y: -4, height: 0 }}
        transition={{ duration: 0.2, ease: EASE_OUT }}
        className="mt-1.5 text-xs text-red-500"
      >
        {error}
      </motion.p>
    )}
  </AnimatePresence>
)

export default ErrorMessage
