import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import WorkDetailView from '@/views/work/detail'
import { PROJECTS } from '@/data'
import type { ProjectMediaItem } from '@/types'
import { SITE_NAME, SITE_URL } from '@/constants'
import { getProjectMedia } from '@/lib/project-media'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)

  if (!project) return {}

  const title = `${project.title} — ${SITE_NAME}`
  const canonical = `${SITE_URL}/work/${project.slug}`

  return {
    title: { absolute: title },
    description: project.summary,
    alternates: { canonical },
    openGraph: {
      title,
      description: project.summary,
      url: canonical,
      siteName: SITE_NAME,
      type: 'article',
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)

  if (!project) notFound()

  const media: ProjectMediaItem[] = [
    ...getProjectMedia(project.slug),
    ...(project.youtubeIds ?? []).map(
      (id): ProjectMediaItem => ({ type: 'youtube', id, alt: `${project.title} — video` })
    ),
  ]

  return <WorkDetailView project={project} media={media} />
}
