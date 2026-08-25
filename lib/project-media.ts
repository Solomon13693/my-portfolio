import { readdirSync } from 'node:fs'
import { extname, join } from 'node:path'
import type { ProjectMediaItem } from '@/data'

const MEDIA_ROOT = join(process.cwd(), 'public', 'img', 'work')

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'])
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.mov'])

function humanize(filename: string): string {
  return filename
    .slice(0, -extname(filename).length)
    .replace(/^\d+[-_]?/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
}

/**
 * Drop image/video files into `public/img/work/<slug>/` and they show up in
 * the project's carousel automatically — no data file edits needed. Prefix
 * filenames with a number (01-hero.png, 02-flow.png) to control order.
 */
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
