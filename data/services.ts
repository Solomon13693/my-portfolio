export interface Service {
  title: string
  description: string
}

export const SERVICES: Service[] = [
  {
    title: 'Frontend Development',
    description:
      "Building interfaces in React and Next.js — from admin dashboards to the booking and wallet flows end users touch directly.",
  },
  {
    title: 'Backend Development',
    description:
      'Laravel and PHP APIs behind the frontend — auth, payments, and the partner-facing endpoints that keep both sides in sync.',
  },
  {
    title: 'Full-Stack Delivery',
    description:
      'Taking a feature from product requirement to shipped release, and staying on to support what ships.',
  },
]
