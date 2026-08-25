import type { Metadata } from 'next'
import { ROUTES } from './routes'
import { SITE_NAME } from './nav'

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
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

export const SEO_DESCRIPTION =
  'Solomon Adeoye is a software developer in Lagos, Nigeria, building with React, Next.js, and Laravel.'

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
      "I'm Solomon. I build full-stack web products — booking platforms, wallets, and the dashboards behind them.",
  },
  [ROUTES.work]: {
    title: `Work — ${SITE_NAME}`,
    description:
      "A few of the products Solomon has helped build and ship — booking platforms, dashboards, and the APIs behind them.",
  },
  [ROUTES.contact]: {
    title: `Contact — ${SITE_NAME}`,
    description:
      "Get in touch with Solomon Adeoye about a project, a role, or just to say hi.",
  },
}

export function getPageMetadata(path: string): Metadata {

  const seo = PAGE_SEO[path] ?? PAGE_SEO[ROUTES.home]
  const canonical = path === ROUTES.home ? SITE_URL : `${SITE_URL}${path}`

  return {
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
