'use client'

import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import { EASE_OUT } from '@/lib'
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiTanstack,
  SiHtml5,
  SiTailwindcss,
  SiBootstrap,
  SiExpo,
  SiNodedotjs,
  SiExpress,
  SiPhp,
  SiLaravel,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiGooglemaps,
  SiGooglecalendar,
  SiZoom,
  SiGit,
  SiGithub,
  SiJira,
  SiVercel,
  SiNetlify,
  SiClaude,
} from 'react-icons/si'
import { FaCss3Alt, FaSlack } from 'react-icons/fa6'
import { DiPhotoshop, DiIllustrator } from 'react-icons/di'

const TECH_ICONS: Record<string, IconType> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  HTML5: SiHtml5,
  CSS3: FaCss3Alt,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'Vue.js': SiVuedotjs,
  'TanStack Query': SiTanstack,
  'Tailwind CSS': SiTailwindcss,
  Bootstrap: SiBootstrap,
  'React Native': SiReact,
  Expo: SiExpo,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  PHP: SiPhp,
  Laravel: SiLaravel,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Firebase: SiFirebase,
  'Google Maps API': SiGooglemaps,
  'Google Calendar API': SiGooglecalendar,
  'Zoom API': SiZoom,
  Photoshop: DiPhotoshop,
  Illustrator: DiIllustrator,
  Git: SiGit,
  GitHub: SiGithub,
  Jira: SiJira,
  Slack: FaSlack,
  Vercel: SiVercel,
  Netlify: SiNetlify,
  'Claude Code': SiClaude,
}

interface TechBadgeProps {
  name: string
  href?: string
}

export function TechBadge({ name, href }: TechBadgeProps) {
  const Icon = TECH_ICONS[name]
  const className =
    'flex h-6 items-center gap-1.5 rounded-full border border-line bg-muted px-2 font-mono text-xs text-foreground transition-colors'

  const content = (
    <>
      {Icon && <Icon className="size-3.5 shrink-0 text-muted-foreground/80" aria-hidden="true" />}
      {name}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.06, y: -1 }}
        whileTap={{ scale: 0.94 }}
        transition={{ duration: 0.2, ease: EASE_OUT }}
        className={`${className} hover:border-foreground/30`}
      >
        {content}
      </motion.a>
    )
  }

  return <span className={className}>{content}</span>
}

export default TechBadge
