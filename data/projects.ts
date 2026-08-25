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
}

export const PROJECTS: Project[] = [
  {
    slug: 'klone-admin-dashboard',
    title: 'Klone Admin Dashboard',
    tagline: 'The operations layer behind every booking.',
    tag: 'Booking platform',
    company: 'Klone',
    period: 'Nov 2024 – Present',
    duration: '1y 9m',
    current: true,
    status: 'In production',
    role: ['Frontend Development'],
    summary:
      'The core admin dashboard and booking system — real-time availability checks, Google Maps and Calendar integrations, and role-based access control.',
    description:
      'Developer and maintain the core admin dashboard and booking system — real-time availability checks, Google Maps and Calendar API integrations, and role-based access control with NextAuth.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Google Maps API', 'Google Calendar API', 'Git'],
    links: [],
    sections: [
      {
        heading: 'The brief',
        paragraphs: [
          "Klone's booking platform needed an operations layer that non-technical staff could run day to day — checking availability, managing reservations, and controlling who could see or change what, without touching the database directly.",
          "Availability had to stay accurate across overlapping bookings in real time, and access needed to be scoped by role, so a merchant could manage their own listings without ever seeing another merchant's data.",
        ],
      },
      {
        heading: 'The build',
        paragraphs: [
          'I treated the dashboard as the source of truth for staff rather than a bolt-on admin panel — every screen mirrors a real operational task, from checking a slot to approving a booking, with calendars and availability grids built to be read at a glance.',
          "It's built in Next.js and TypeScript, with Google Maps and Google Calendar API integrations for location and scheduling, and NextAuth handling role-based access control end to end.",
        ],
      },
      {
        heading: 'The hard part',
        paragraphs: [
          'Real-time availability meant guarding against race conditions when two staff members act on the same slot at once, and keeping the Calendar API in sync without ever double-booking.',
          'Building the tool an operations team uses every day is a different discipline from a customer-facing feature — every rough edge gets reported back almost immediately.',
        ],
      },
      {
        heading: 'Where it stands now',
        paragraphs: [
          'Live and in daily use by the Klone team, with features shipping alongside the customer and merchant mobile apps as the booking flow keeps evolving — deeper partner reporting and a hardened real-time layer are next.',
        ],
      },
    ],
  },
  {
    slug: 'klone-mobile-apps',
    title: 'Klone Customer & Merchant Apps',
    tagline: 'Two apps, one booking flow.',
    tag: 'Mobile booking apps',
    company: 'Klone',
    period: 'Nov 2024 – Present',
    duration: '1y 9m',
    current: true,
    status: 'In production',
    role: ['Mobile App Development'],
    summary:
      'Customer and merchant React Native apps — booking flows, real-time availability, and account management.',
    description:
      'Build and maintain the customer and merchant React Native apps — booking flows, real-time availability, and account management, alongside Google Sign-In and native device integrations.',
    stack: ['React Native', 'TypeScript', 'React Navigation', 'TanStack Query', 'Zustand'],
    links: [],
    sections: [
      {
        heading: 'The brief',
        paragraphs: [
          'Klone runs on two sides of the same booking flow — customers reserving a slot, and merchants managing it — so the mobile experience needed two apps that stay in sync with the same backend.',
          'Both needed real-time availability, account management, and native sign-in, without duplicating logic or drifting out of sync as the booking system evolved.',
        ],
      },
      {
        heading: 'The build',
        paragraphs: [
          'I approached the customer and merchant apps as one product with two entry points, sharing patterns for data fetching and state wherever the flows overlapped — booking stays short on the customer side, while the merchant side surfaces the operational detail a customer never needs.',
          'Built with React Native and TypeScript, React Navigation for flow control, TanStack Query for server state, and Zustand for local state.',
        ],
      },
      {
        heading: 'The hard part',
        paragraphs: [
          "Keeping both apps' booking state consistent with the web dashboard in real time, especially around Google Sign-In and native device permissions across platforms.",
          'Sharing data-fetching patterns across two apps early paid off every time the booking API changed underneath them.',
        ],
      },
      {
        heading: 'Where it stands now',
        paragraphs: [
          'Both apps are live and actively maintained, with releases shipping alongside the admin dashboard — next up is extending the native integrations and tightening sync between the customer and merchant views of the same booking.',
        ],
      },
    ],
  },
  {
    slug: 'run-wallet-and-dashboards',
    title: 'Wallet System & Partner Dashboards',
    tagline: 'Payments and visibility for delivery partners.',
    tag: 'Fintech · dashboards',
    company: 'RUN Technologies/Deliverys',
    period: 'Sep 2022 – Oct 2024',
    duration: '2y 1m',
    status: 'Shipped',
    role: ['Full Stack Development'],
    summary: 'A secure wallet system for user payments, plus real-time business dashboards for partners.',
    description:
      'Built RESTful APIs for mobile and web, architected a secure wallet system for user payments, and created real-time business dashboards for partners.',
    stack: ['React', 'Vue.js', 'JavaScript', 'PHP', 'Laravel', 'MySQL', 'Firebase', 'Google Maps API', 'Git'],
    links: [],
    sections: [
      {
        heading: 'The brief',
        paragraphs: [
          'RUN Technologies/Deliverys needed a way for users to hold and move funds inside the platform, and for delivery partners to see their own business performance without asking someone else to pull the numbers.',
          'Payments had to be secure and auditable, while partner dashboards needed real-time business data pulled from the same systems powering the mobile and web apps.',
        ],
      },
      {
        heading: 'The build',
        paragraphs: [
          "I split the work along its natural seam — a secure wallet core on one side, reporting surfaces on the other — so each could be hardened and iterated on independently, with partner dashboards prioritizing the numbers a partner checks daily over a dense, do-everything interface.",
          'Built RESTful APIs in PHP and Laravel with MySQL, React and Vue.js on the frontend depending on the surface, Firebase for real-time pieces, and the Google Maps API for location-aware features.',
        ],
      },
      {
        heading: 'The hard part',
        paragraphs: [
          'Getting a payments system to a state where partners trusted the numbers meant treating every wallet operation as auditable from day one, not bolted on after the fact.',
          "Financial systems reward boring, well-tested code far more than clever code — a lesson that's shaped how I approach anything handling money since.",
        ],
      },
      {
        heading: 'Where it stands now',
        paragraphs: [
          "Shipped and used in production throughout my time at RUN Technologies. My role concluded in October 2024; the wallet and dashboards continue running in production for the company's partners.",
        ],
      },
    ],
  },
  {
    slug: 'e-timetable-system',
    title: 'E-Timetable System',
    tagline: 'Paper schedules, replaced.',
    tag: 'Campus scheduling',
    company: 'Ogun State Institute of Technology',
    period: '2024',
    status: 'Shipped',
    role: ['Frontend Development', 'Student Volunteer'],
    summary: 'A responsive E-Timetable system, replacing paper schedules with dynamic, department-level updates.',
    description:
      'Built a responsive E-Timetable system with a small team, replacing paper schedules with dynamic, department-level updates for students and staff.',
    stack: ['React', 'Next.js', 'Tailwind CSS'],
    links: [],
    sections: [
      {
        heading: 'The brief',
        paragraphs: [
          'Ogun State Institute of Technology ran its class schedules on paper, updated by hand whenever a class moved — slow for staff, and easy to miss for students.',
          'The school needed a system department staff could update directly, that students could check without hunting down a printed notice on a board.',
        ],
      },
      {
        heading: 'The build',
        paragraphs: [
          'As a small volunteer team, we scoped this to the smallest system that actually replaced the paper process, not a full timetabling engine with every feature a university might eventually want — the interface mirrors how a printed timetable already reads, familiar to students on day one.',
          'Built as a small, focused frontend with React, Next.js, and Tailwind CSS.',
        ],
      },
      {
        heading: 'The hard part',
        paragraphs: [
          "Getting department-level updates to actually replace the paper process meant designing for staff who weren't necessarily comfortable adopting a new tool.",
          'Small, well-scoped student projects are a good place to practice shipping something real people actually use, not just a class assignment.',
        ],
      },
      {
        heading: 'Where it stands now',
        paragraphs: [
          'Shipped to the department in 2024 as a working replacement for the paper timetable. The project wrapped with the volunteer term; any further rollout would sit with the department\'s own team.',
        ],
      },
    ],
  },
]
