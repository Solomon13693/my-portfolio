'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Check, ChevronDown, Link2, Share2, type LucideIcon } from 'lucide-react'
import type { IconType } from 'react-icons'
import { FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa6'
import { SiX } from 'react-icons/si'
import type { Project } from '@/data'
import { EASE_OUT } from '@/lib'

interface HeaderProps {
  project: Project
}

const MotionLink = motion.create(Link)

export function Header({ project }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  // Only ever read after `open` becomes true (a user click), so a server/client
  // mismatch here never reaches the DOM — safe without an effect.
  const [canNativeShare] = useState(() => typeof navigator !== 'undefined' && Boolean(navigator.share))
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const shareText = `${project.title} — ${project.tagline}`

  const socialLinks: { label: string; icon: LucideIcon | IconType; getUrl: (url: string) => string }[] = [
    {
      label: 'Share on X',
      icon: SiX,
      getUrl: (url) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      label: 'Share on LinkedIn',
      icon: FaLinkedin,
      getUrl: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: 'Share on WhatsApp',
      icon: FaWhatsapp,
      getUrl: (url) => `https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`,
    },
    {
      label: 'Share on Facebook',
      icon: FaFacebook,
      getUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
  ]

  const onCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard access can fail (permissions, insecure context) — fail silently, no crash.
    }
    setOpen(false)
  }

  const onSocialShare = (getUrl: (url: string) => string) => {
    window.open(getUrl(window.location.href), '_blank', 'noopener,noreferrer')
    setOpen(false)
  }

  const onNativeShare = async () => {
    try {
      await navigator.share({ title: project.title, text: project.tagline, url: window.location.href })
    } catch {
      // User cancelled the native share sheet — nothing to do.
    }
    setOpen(false)
  }

  return (
    <div className="border-b border-line">
      <div className="container flex items-center justify-between py-4">
        <MotionLink
          href="/work"
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Work
        </MotionLink>

        <div className="relative" ref={menuRef}>
          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? 'check' : 'share'}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.15, ease: EASE_OUT }}
                className="flex items-center gap-1.5"
              >
                {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Share2 className="size-3.5" aria-hidden="true" />}
                {copied ? 'Copied' : 'Share'}
              </motion.span>
            </AnimatePresence>
            <ChevronDown className={`size-3 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
          </motion.button>

          <AnimatePresence>
            {open && (
              <motion.div
                role="menu"
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.15, ease: EASE_OUT }}
                className="absolute top-full right-0 z-20 mt-2 w-52 border border-line bg-background py-1 shadow-lg"
              >
                <button
                  role="menuitem"
                  type="button"
                  onClick={onCopyLink}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Link2 className="size-3.5 shrink-0" aria-hidden="true" />
                  Copy link
                </button>

                {socialLinks.map(({ label, icon: Icon, getUrl }) => (
                  <button
                    key={label}
                    role="menuitem"
                    type="button"
                    onClick={() => onSocialShare(getUrl)}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                    {label}
                  </button>
                ))}

                {canNativeShare && (
                  <button
                    role="menuitem"
                    type="button"
                    onClick={onNativeShare}
                    className="flex w-full items-center gap-2.5 border-t border-line px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Share2 className="size-3.5 shrink-0" aria-hidden="true" />
                    More options
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="container pt-6 pb-10 sm:pt-10 sm:pb-16">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          {project.status} · {project.tag}
        </p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight sm:text-6xl">{project.title}</h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">{project.tagline}</p>

        <p className="mt-6 flex flex-wrap items-center gap-x-2 font-mono text-sm text-muted-foreground">
          <span>{project.company}</span>
          <span aria-hidden="true">·</span>
          <span>{project.period}</span>
          {project.current && (
            <>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5 text-foreground">
                <span className="relative flex size-1.5" aria-hidden="true">
                  <span className="absolute inline-flex size-1.5 animate-ping rounded-full bg-foreground/50" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-foreground" />
                </span>
                Current
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default Header
