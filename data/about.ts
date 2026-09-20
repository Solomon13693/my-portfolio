export const ABOUT = {
  eyebrow: 'Who I am',

  headline:
    "I'm Solomon. I ship production web, mobile, and backend systems across fintech, logistics, and booking.",

  /** Short niche line for banners */
  focus: 'Software Engineer · Web · Mobile · Full-Stack · Payments · Logistics · Booking',

  /** Focus bullets under About / Hello */
  focusAreas: [
    'Booking & reservations · web and React Native',
    'Payments · wallets · merchant dashboards',
    'Logistics · quote, dispatch, and live tracking',
    'Realtime · Socket.IO, push, and chat bots',
    'TypeScript · React / Next.js · NestJS · Laravel',
  ],

  body: 'Software Engineer with 4+ years shipping production products across React / React Native, Next.js, NestJS, and Laravel, including REST APIs, auth, wallets, and payment rails. Have shipped booking and reservation workflows, payment systems, and realtime features used by thousands of active users, and led engineering for a logistics platform through multi-year growth. Take features from requirements through development, testing, and production release.',
}

/** Proof stats for About + home. Numbers from `file/resume.html`. */
export const STATS = [
  { value: '4+', label: 'years shipping production software' },
  { value: '3k+', label: 'users on Klone booking platforms' },
  { value: '20k+', label: 'merchants & users on Spout Payment' },
  { value: '150×', label: 'order volume growth at RUN / Deliverys' },
] as const
