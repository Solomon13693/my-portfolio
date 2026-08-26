export interface ProjectLink {
  label: string
  href: string
}

export interface CaseStudySection {
  heading: string
  paragraphs: string[]
}

export type ProjectMediaItem =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; poster?: string; alt: string }
  | { type: 'youtube'; id: string; alt: string }

export interface Project {
  slug: string
  title: string
  tagline: string
  tag: string
  company: string
  period: string

  duration?: string
  current?: boolean
  status: string
  role: string[]
  summary: string
  description: string
  stack: string[]
  links: ProjectLink[]
  sections: CaseStudySection[]

  youtubeIds?: string[]
  /** How screenshots sit in the case-study carousel. Mobile app shots use `contain`. */
  mediaFit?: 'cover' | 'contain'
}
