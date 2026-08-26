import type { MetadataRoute } from 'next'
import { ROUTES, SITE_URL } from '@/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(ROUTES).map((path) => ({
    url: path === ROUTES.home ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: new Date(),
  }))
}
