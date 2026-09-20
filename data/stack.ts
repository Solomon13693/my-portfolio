export interface StackItem {
  name: string
  href?: string
}

export interface StackCategory {
  id: string
  label: string
  items: StackItem[]
}

/**
 * Skills for the site: domain rows + mix of tools and capability tags,
 * shaped around what Solomon actually ships (booking, payments, logistics).
 */
export const STACK: StackCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    items: [
      { name: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { name: 'TypeScript', href: 'https://www.typescriptlang.org' },
      { name: 'PHP', href: 'https://www.php.net' },
    ],
  },
  {
    id: 'web-mobile',
    label: 'Web & mobile',
    items: [
      { name: 'React', href: 'https://react.dev' },
      { name: 'Next.js', href: 'https://nextjs.org' },
      { name: 'Vue.js', href: 'https://vuejs.org' },
      { name: 'React Native', href: 'https://reactnative.dev' },
      { name: 'Expo', href: 'https://expo.dev' },
      { name: 'React Navigation', href: 'https://reactnavigation.org' },
      { name: 'NativeWind', href: 'https://www.nativewind.dev' },
      { name: 'TanStack Query', href: 'https://tanstack.com/query' },
      { name: 'Redux Toolkit', href: 'https://redux-toolkit.js.org' },
      { name: 'Zustand', href: 'https://zustand-demo.pmnd.rs' },
      { name: 'React Hook Form', href: 'https://react-hook-form.com' },
      { name: 'Tailwind CSS', href: 'https://tailwindcss.com' },
    ],
  },
  {
    id: 'backend-data',
    label: 'Backend & data',
    items: [
      { name: 'Node.js', href: 'https://nodejs.org' },
      { name: 'NestJS', href: 'https://nestjs.com' },
      { name: 'Express.js', href: 'https://expressjs.com' },
      { name: 'Laravel', href: 'https://laravel.com' },
      { name: 'REST APIs' },
      { name: 'MySQL', href: 'https://www.mysql.com' },
      { name: 'MongoDB', href: 'https://www.mongodb.com' },
      { name: 'PostgreSQL', href: 'https://www.postgresql.org' },
      { name: 'Redis', href: 'https://redis.io' },
      { name: 'BullMQ', href: 'https://bullmq.io' },
      { name: 'Socket.IO', href: 'https://socket.io' },
      { name: 'Webhooks · HMAC signing' },
    ],
  },
  {
    id: 'payments',
    label: 'Payments & merchants',
    items: [
      { name: 'Paystack', href: 'https://paystack.com' },
      { name: 'Stripe', href: 'https://stripe.com' },
      { name: 'Monnify', href: 'https://monnify.com' },
      { name: 'Wallet checkout' },
      { name: 'Merchant dashboards' },
      { name: 'Card & bank rails' },
      { name: 'Refunds & reconciliation' },
      { name: 'Partner API onboarding' },
    ],
  },
  {
    id: 'booking-logistics',
    label: 'Booking & logistics',
    items: [
      { name: 'Reservation flows' },
      { name: 'QR ticketing' },
      { name: 'Quote & dispatch' },
      { name: 'Rider assignment' },
      { name: 'Live GPS tracking' },
      { name: 'Bulk order upload' },
      { name: 'Ops dashboards' },
      { name: 'Google Maps API', href: 'https://developers.google.com/maps' },
      { name: 'Google Calendar API', href: 'https://developers.google.com/calendar' },
    ],
  },
  {
    id: 'realtime',
    label: 'Realtime & messaging',
    items: [
      { name: 'Socket.IO', href: 'https://socket.io' },
      { name: 'WebSockets' },
      { name: 'Firebase Cloud Messaging', href: 'https://firebase.google.com/docs/cloud-messaging' },
      { name: 'OneSignal', href: 'https://onesignal.com' },
      { name: 'Pusher', href: 'https://pusher.com' },
      { name: 'WhatsApp Cloud API', href: 'https://developers.facebook.com/docs/whatsapp' },
      { name: 'Telegram Bot API', href: 'https://core.telegram.org/bots/api' },
      { name: 'In-app chat' },
    ],
  },
  {
    id: 'product',
    label: 'Product & analytics',
    items: [
      { name: 'Firebase', href: 'https://firebase.google.com' },
      { name: 'Mixpanel', href: 'https://mixpanel.com' },
      { name: 'Google Sign-In', href: 'https://developers.google.com/identity' },
      { name: 'Zoom API', href: 'https://developers.zoom.us' },
      { name: 'Framer Motion', href: 'https://www.framer.com/motion/' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & infra',
    items: [
      { name: 'Git', href: 'https://git-scm.com' },
      { name: 'GitHub', href: 'https://github.com' },
      { name: 'Docker', href: 'https://www.docker.com' },
      { name: 'Vercel', href: 'https://vercel.com' },
      { name: 'Netlify', href: 'https://netlify.com' },
      { name: 'Jira', href: 'https://www.atlassian.com/software/jira' },
      { name: 'Slack', href: 'https://slack.com' },
      { name: 'Claude Code', href: 'https://claude.ai/code' },
    ],
  },
]
