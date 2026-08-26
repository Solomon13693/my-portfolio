import { readdirSync } from 'node:fs'
import { extname, join } from 'node:path'
import type { ProjectMediaItem } from '@/types'

const MEDIA_ROOT = join(process.cwd(), 'public', 'img', 'work')

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'])
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.mov'])

function humanize(filename: string): string {
  const withoutExt = filename.slice(0, -extname(filename).length)
  const cleaned = withoutExt.replace(/^\d+[-_]?/, '').replace(/[-_]+/g, ' ').trim()
  return cleaned || `Screenshot ${withoutExt}`
}


export function getProjectMedia(slug: string): ProjectMediaItem[] {
  let files: string[]

  try {
    files = readdirSync(join(MEDIA_ROOT, slug))
  } catch {
    return []
  }

  return files
    .filter((file) => !file.startsWith('.'))
    .sort((a, b) => a.localeCompare(b))
    .flatMap((file): ProjectMediaItem[] => {
      const ext = extname(file).toLowerCase()
      const src = `/img/work/${slug}/${file}`
      const alt = humanize(file)

      if (IMAGE_EXTENSIONS.has(ext)) return [{ type: 'image', src, alt }]
      if (VIDEO_EXTENSIONS.has(ext)) return [{ type: 'video', src, alt }]
      return []
    })
}

export function getProjectCover(slug: string): string | null {
  const image = getProjectMedia(slug).find((item) => item.type === 'image')
  return image?.src ?? null
}
