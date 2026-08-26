export type ExperienceEmployment = 'full-time' | 'contract' | 'internship'

export interface ExperiencePosition {
  title: string;
  period: string;
  duration?: string;
  current?: boolean;
  employment: ExperienceEmployment;
  summary: string;
  tools: string[];
}

export interface ExperienceCompany {
  company: string;
  logo?: string;
  positions: ExperiencePosition[];
}

export const EXPERIENCE: ExperienceCompany[] = [
  {
    company: 'Trovo',
    positions: [
      {
        title: 'Full Stack Developer',
        period: 'May 2026 – Present',
        duration: '4m',
        current: true,
        employment: 'full-time',
        summary:
          'Built and maintain Trovo’s VTU platform end to end — the customer site and wallet dashboard, the Laravel API behind cheapest-route data, airtime, and bills, and the WhatsApp and Telegram bots that run the same purchase flow in chat.',
        tools: [
          'Next.js',
          'TypeScript',
          'Tailwind CSS',
          'Laravel',
          'TanStack Query',
          'Monnify',
          'WhatsApp Cloud API',
          'Telegram Bot API',
          'Git',
        ],
      },
    ],
  },

  {
    company: 'Buddie-X',
    positions: [
      {
        title: 'Full Stack Developer',
        period: 'May 2025 – Nov 2025',
        duration: '7m',
        employment: 'contract',
        summary:
          'Built and maintained Buddie-X’s mentorship marketplace end to end — the public web app, mentor and mentee dashboards, and the Laravel API behind discovery, 1:1 booking, sessions, community, payments, and payouts.',
        tools: [
          'React',
          'TypeScript',
          'Vite',
          'Tailwind CSS',
          'TanStack Query',
          'Redux Toolkit',
          'Laravel',
          'Stripe',
          'Firebase',
          'Pusher',
          'Git',
        ],
      },
    ],
  },

  {
    company: 'Klone',
    positions: [
      {
        title: 'Mobile App Developer',
        period: 'Oct 2025 – Present',
        duration: '10m',
        current: true,
        employment: 'full-time',
        summary:
          'Develop and maintain Klone’s customer and business React Native applications, building booking and reservation flows, real-time communication with WebSockets, push notifications with OneSignal, product analytics with Mixpanel, account management, and native integrations across iOS and Android.',
        tools: [
          'React Native',
          'TypeScript',
          'React Navigation',
          'TanStack Query',
          'Zustand',
          'WebSocket',
          'OneSignal',
          'Mixpanel',
          'Google Sign-In',
          'Git',
        ],
      },
      {
        title: 'Frontend Developer',
        period: 'Nov 2024 – Present',
        duration: '1y 9m',
        current: true,
        employment: 'full-time',
        summary:
          'Develop and maintain Klone’s web platform, including the core admin dashboard and booking system with real-time availability, role-based access control, and Google Maps and Calendar integrations supporting customer and business operations.',
        tools: [
          'Next.js',
          'TypeScript',
          'Tailwind CSS',
          'NextAuth',
          'TanStack Query',
          'Google Maps API',
          'Google Calendar API',
          'Git',
        ],
      },
    ],
  },

  {
    company: 'Spout Payment',
    positions: [
      {
        title: 'Frontend Developer',
        period: 'Jul 2025 – Mar 2026',
        duration: '9m',
        employment: 'full-time',
        summary:
          'Developed payment infrastructure and business-facing products for a fintech platform, building the payment gateway, B2B dashboard, transaction workflows, and developer documentation to support merchant and API integrations.',
        tools: [
          'Next.js',
          'React',
          'TypeScript',
          'Tailwind CSS',
          'REST APIs',
          'Git',
        ],
      },
    ],
  },

  {
    company: 'RUN Technologies/Deliverys',
    positions: [
      {
        title: 'Full Stack Developer',
        period: 'Oct 2025 – Present',
        duration: '10m',
        current: true,
        employment: 'full-time',
        summary:
          'Modernized and expanded the company’s technology platform across new codebases and infrastructure, building Next.js and NestJS applications spanning logistics, news, AI-powered products, real-time chat and calls, live tracking, and partner platforms.',
        tools: [
          'Next.js',
          'React',
          'TypeScript',
          'NestJS',
          'MongoDB',
          'Redis',
          'Socket.IO',
          'AI',
          'Firebase',
          'Google Maps API',
          'Docker',
          'Git',
        ],
      },
      {
        title: 'Full Stack Developer',
        period: 'Sep 2022 – Oct 2024',
        duration: '2y 1m',
        employment: 'full-time',
        summary:
          'Built and maintained the original logistics platform using Laravel and React, developing REST APIs, wallet and payment functionality, trip management, authentication, and business dashboards for delivery operations.',
        tools: [
          'React',
          'JavaScript',
          'PHP',
          'Laravel',
          'MySQL',
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
        title: 'Frontend Intern',
        period: 'Jun 2021 – Sep 2021',
        duration: '3m',
        employment: 'internship',
        summary:
          'Developed responsive web interfaces using HTML, CSS, JavaScript, and Bootstrap, translating designs into cross-browser compatible experiences while contributing to debugging, version control, and Agile development workflows.',
        tools: [
          'HTML5',
          'CSS3',
          'JavaScript',
          'Bootstrap',
          'Photoshop',
          'Illustrator',
          'Git',
        ],
      },
    ],
  },
];
