import type { Metadata } from 'next'
import { ROUTES } from './routes'
import { SITE_NAME } from './nav'

function resolveSiteUrl(): string {
  if (process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/$/, '')
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'http://localhost:3000'
}

export const SITE_URL = resolveSiteUrl()

export const SEO_TITLE = `${SITE_NAME} — Software Developer`

export const SEO_DESCRIPTION = 'Solomon Adeoye is a software developer in Lagos, Nigeria.'

export interface PageSeo {
  title: string
  description: string
}

export const PAGE_SEO: Record<string, PageSeo> = {
  [ROUTES.home]: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
  },

  [ROUTES.about]: {
    title: `About — ${SITE_NAME}`,
    description:
      "I'm Solomon, a software developer who builds modern web and mobile applications, APIs, and digital products.",
  },

  [ROUTES.work]: {
    title: `Work — ${SITE_NAME}`,
    description:
      "Explore software products and applications Solomon has built, contributed to, and shipped across web, mobile, and backend systems.",
  },

  [ROUTES.contact]: {
    title: `Contact — ${SITE_NAME}`,
    description:
      "Get in touch with Solomon Adeoye about a project, collaboration, software development opportunity, or just to say hi.",
  },
};

export function getPageMetadata(path: string): Metadata {

  const seo = PAGE_SEO[path] ?? PAGE_SEO[ROUTES.home]
  const canonical = path === ROUTES.home ? SITE_URL : `${SITE_URL}${path}`

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
    },
  }
}
