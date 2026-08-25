'use client'

import { motion } from 'framer-motion'
import { SERVICES } from '@/data'
import { EASE_OUT } from '@/lib'
import { Reveal } from '../motion'

export function ServicesGrid() {
  return (
    <div className="border-b border-line">
      
      <div className="container py-10 sm:py-16">

        <div>
          <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Services</p>
          <div className="mt-3 h-px w-10 bg-foreground" aria-hidden="true" />
        </div>

        <div className="mt-10 grid gap-10 border-t border-line pt-8 sm:mt-16 sm:grid-cols-3 sm:gap-8">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08} y={20}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: EASE_OUT }}>
                <h3 className="text-lg font-medium tracking-tight">{service.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{service.description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

      </div>

    </div>
  )
}

export default ServicesGrid
