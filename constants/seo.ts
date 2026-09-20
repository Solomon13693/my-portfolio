import type { Metadata } from "next";
import { ROUTES } from "./routes";
import { SITE_NAME } from "./nav";

function resolveSiteUrl(): string {
  if (process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const SEO_TITLE = `${SITE_NAME} / Software Engineer`;

export const SEO_DESCRIPTION =
  "Solomon Adeoye is a software engineer in Lagos, Nigeria. Web, mobile, and full-stack across fintech, logistics, and booking.";

export interface PageSeo {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeo> = {
  [ROUTES.home]: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
  },

  [ROUTES.about]: {
    title: `About / ${SITE_NAME}`,
    description:
      "I'm Solomon, a software engineer who ships production web, mobile, and backend systems across fintech, logistics, and booking.",
  },

  [ROUTES.work]: {
    title: `Projects / ${SITE_NAME}`,
    description:
      "Explore software products and applications Solomon has built, contributed to, and shipped across web, mobile, and backend systems.",
  },

  [ROUTES.contact]: {
    title: `Contact / ${SITE_NAME}`,
    description:
      'Hiring for booking, payments, or logistics products? Reach Solomon Adeoye in Lagos (UTC+1), open to remote.',
  },

  [ROUTES.cvLab]: {
    title: `CV Lab / ${SITE_NAME}`,
    description:
      "Build and customize a professional resume and cover letter in the browser. Free resume builder with live preview and PDF export.",
  },

  [ROUTES.cvLabCoverLetter]: {
    title: `Cover Letter / CV Lab / ${SITE_NAME}`,
    description:
      "Write and export a tailored cover letter alongside your resume in CV Lab.",
  },
};

/** @deprecated Prefer getPageMetadata for public pages. Kept for unlock redirect page. */
export function getPrivateToolMetadata(title: string): Metadata {
  return {
    title: { absolute: title },
    robots: { index: false, follow: false },
  };
}

export function getPageMetadata(path: string): Metadata {
  const seo = PAGE_SEO[path] ?? PAGE_SEO[ROUTES.home];
  const canonical = path === ROUTES.home ? SITE_URL : `${SITE_URL}${path}`;

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
      type: "website",
    },
  };
}
