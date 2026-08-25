'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Images } from 'lucide-react'
import type { Project, ProjectMediaItem } from '@/data'
import { EASE_OUT } from '@/lib'

interface MediaProps {
  project: Project
  media: ProjectMediaItem[]
}

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: '0%', opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? '-100%' : '100%', opacity: 0 }),
}

const slideTransition = {
  x: { type: 'spring' as const, stiffness: 320, damping: 34, mass: 0.9 },
  opacity: { duration: 0.25 },
}

function Slide({ item }: { item: ProjectMediaItem }) {
  if (item.type === 'image') {
    return <Image src={item.src} alt={item.alt} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
  }

  if (item.type === 'video') {
    return (
      <video
        src={item.src}
        poster={item.poster}
        controls
        playsInline
        className="size-full object-cover"
        aria-label={item.alt}
      />
    )
  }

  return (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${item.id}`}
      title={item.alt}
      className="absolute inset-0 size-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  )
}

export function Media({ project, media }: MediaProps) {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0])

  const goTo = (next: number, dir: number) => {
    const wrapped = (next + media.length) % media.length
    setSlide([wrapped, dir])
  }

  if (media.length === 0) {
    return (
      <div className="border-b border-line">
        <div className="container py-10 sm:py-16">
          <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden border border-line bg-muted">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-70"
              style={{ backgroundImage: 'radial-gradient(var(--line) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
            />
            <div className="relative flex flex-col items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full border border-line bg-background text-muted-foreground">
                <Images className="size-5" aria-hidden="true" />
              </div>
              <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Screenshots coming soon</p>
            </div>
          </div>

          <p className="mt-3 font-mono text-xs text-muted-foreground">
            {project.title} · {project.tagline}
          </p>
        </div>
      </div>
    )
  }

  const item = media[index]

  return (
    <div className="border-b border-line">
      <div className="container py-10 sm:py-16">
        <div
          className="relative flex aspect-video w-full items-center justify-center overflow-hidden border border-line bg-muted outline-none"
          tabIndex={media.length > 1 ? 0 : undefined}
          onKeyDown={(e) => {
            if (media.length <= 1) return
            if (e.key === 'ArrowRight') goTo(index + 1, 1)
            if (e.key === 'ArrowLeft') goTo(index - 1, -1)
          }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              drag={media.length > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) goTo(index + 1, 1)
                else if (info.offset.x > 80) goTo(index - 1, -1)
              }}
              className="absolute inset-0"
            >
              <Slide item={item} />
            </motion.div>
          </AnimatePresence>

          {media.length > 1 && (
            <>
              <motion.button
                type="button"
                aria-label="Previous slide"
                onClick={() => goTo(index - 1, -1)}
                whileHover={{ scale: 1.08, x: -1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="absolute top-1/2 left-3 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                <ArrowLeft className="size-3.5" aria-hidden="true" />
              </motion.button>
              <motion.button
                type="button"
                aria-label="Next slide"
                onClick={() => goTo(index + 1, 1)}
                whileHover={{ scale: 1.08, x: 1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="absolute top-1/2 right-3 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </motion.button>
            </>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted-foreground">{item.alt}</p>

          {media.length > 1 && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {media.map((slide, i) => (
                  <motion.button
                    key={slide.alt + i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => goTo(i, i > index ? 1 : -1)}
                    whileHover={{ scale: 1.4 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.15, ease: EASE_OUT }}
                    className={`size-1.5 rounded-full transition-colors ${i === index ? 'bg-foreground' : 'bg-line hover:bg-muted-foreground'}`}
                  />
                ))}
              </div>
              <p className="font-mono text-xs text-muted-foreground tabular-nums">
                {index + 1} / {media.length}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Media
