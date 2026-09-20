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

export interface ProjectChanges {
  before: string[]
  after: string[]
}

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
  /** Short ownership line for footers, e.g. "full-stack · dashboard + API" */
  roleLine?: string
  summary: string
  description: string
  stack: string[]
  links: ProjectLink[]
  sections: CaseStudySection[]
  /** Before / after lines for the case study */
  changes?: ProjectChanges

  youtubeIds?: string[]
  /** How screenshots sit in the case-study carousel. Mobile app shots use `contain`. */
  mediaFit?: 'cover' | 'contain'
  /** Preferred cover filename inside `/img/work/[slug]/` */
  coverFile?: string
}
