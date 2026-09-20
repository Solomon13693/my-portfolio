export type ExperienceEmployment = 'full-time' | 'contract' | 'internship'

export interface ExperienceRelatedProject {
  slug: string
  label: string
}

export interface ExperiencePosition {
  title: string
  period: string
  current?: boolean
  employment: ExperienceEmployment
  summary: string
  tools: string[]
}

export interface ExperienceCompany {
  company: string
  logo?: string
  relatedProjects?: ExperienceRelatedProject[]
  positions: ExperiencePosition[]
}

/** Sourced from `file/resume.html`. Keep in sync when the CV is updated. */
export const EXPERIENCE: ExperienceCompany[] = [
  {
    company: 'Klone',
    relatedProjects: [
      { slug: 'klone', label: 'Klone' },
      { slug: 'klone-customer', label: 'Klone Customer' },
    ],
    positions: [
      {
        title: 'Software Engineer',
        period: 'Nov 2024 – Present',
        current: true,
        employment: 'full-time',
        summary:
          'Multi-platform booking and reservation product serving 3,000+ users across customer, vendor, and admin surfaces. Build and maintain customer and vendor React Native apps (iOS/Android) plus customer, vendor, and admin web apps for booking, payments, ticketing, and scheduling. Ship end-to-end reservation flows: search, listings, provider profiles, checkout, account management, and QR-based ticketing. Implement auth, realtime messaging, and push notifications across web and mobile; integrate Google Maps, Google Calendar, OneSignal, and Mixpanel for discovery, scheduling, notifications, and product analytics.',
        tools: [
          'React Native',
          'React',
          'Next.js',
          'TypeScript',
          'Tailwind CSS',
          'React Navigation',
          'TanStack Query',
          'Redux',
          'WebSockets',
          'OneSignal',
          'Mixpanel',
          'Google Maps API',
          'Google Calendar API',
        ],
      },
    ],
  },

  {
    company: 'Spout Payment',
    positions: [
      {
        title: 'Frontend Developer (Remote)',
        period: 'Jul 2025 – Mar 2026',
        employment: 'full-time',
        summary:
          'Payment technology platform serving 20,000+ merchants and users. Built merchant dashboard and payment UI for transaction tracking, account management, and live payment operations. Shipped frontend payment and merchant workflows against REST APIs; improved merchant and partner onboarding with clearer API integration flows and developer-facing documentation.',
        tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
      },
    ],
  },

  {
    company: 'RUN Technologies / Deliverys',
    relatedProjects: [
      { slug: 'run-delivery', label: 'Run Delivery' },
      { slug: 'run-web', label: 'rundeliverys.com' },
    ],
    positions: [
      {
        title: 'Engineering Lead (Contract)',
        period: 'Sep 2022 – May 2025',
        employment: 'contract',
        summary:
          'Led engineering for a logistics platform that moved fragmented, manual operations into a centralized system for orders, merchants, riders, payments, and realtime deliveries. Scaled the platform to 150× order volume, 37× customer growth, and 18× rider-network growth (2022–2025), supporting millions of fulfilled orders across two markets. Designed and shipped core logistics: order management, quotations, wallet checkout, rider assignment, and delivery management, with realtime rider tracking (Socket.IO, Redis, Firebase). Modernized backends from Laravel toward Node.js/NestJS while building React/Next.js dashboards; engineered card and wallet payment flows, REST APIs, auth, and partner webhooks.',
        tools: [
          'React',
          'Next.js',
          'TypeScript',
          'JavaScript',
          'PHP',
          'Laravel',
          'NestJS',
          'Node.js',
          'MySQL',
          'MongoDB',
          'Redis',
          'Socket.IO',
          'Docker',
          'Firebase',
          'Google Maps API',
          'Git',
        ],
      },
    ],
  },

  {
    company: 'GreenMouse Tech',
    positions: [
      {
        title: 'Frontend Developer (Internship)',
        period: 'Jun 2021 – Sep 2021',
        employment: 'internship',
        summary:
          'Built responsive web interfaces with HTML5, CSS3, JavaScript, and Bootstrap. Debugged frontend issues in a collaborative engineering team using Git and Agile rituals.',
        tools: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Git'],
      },
    ],
  },
]
