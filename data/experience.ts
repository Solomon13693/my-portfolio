export interface ExperiencePosition {
  title: string
  period: string
  duration?: string
  current?: boolean
  summary: string
  tools: string[]
}

export interface ExperienceCompany {
  company: string
  logo?: string
  positions: ExperiencePosition[]
}

export const EXPERIENCE: ExperienceCompany[] = [
  {
    company: 'Klone',
    positions: [
      {
        title: 'Frontend Developer',
        period: 'Nov 2024 – Present',
        duration: '1y 9m',
        current: true,
        summary:
          'Developer and maintain the core admin dashboard and booking system — real-time availability checks, Google Maps and Calendar API integrations, and role-based access control with NextAuth.',
        tools: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Google Maps API', 'Google Calendar API', 'Git'],
      },
      {
        title: 'Mobile App Developer',
        period: 'Nov 2024 – Present',
        duration: '1y 9m',
        current: true,
        summary:
          'Build and maintain the customer and merchant React Native apps — booking flows, real-time availability, and account management, alongside Google Sign-In and native device integrations.',
        tools: ['React Native', 'TypeScript', 'React Navigation', 'TanStack Query', 'Zustand'],
      },
    ],
  },
  {
    company: 'RUN Technologies/Deliverys',
    positions: [
      {
        title: 'Full Stack Developer',
        period: 'Sep 2022 – Oct 2024',
        duration: '2y 1m',
        summary:
          'Built RESTful APIs for mobile and web, architected a secure wallet system for user payments, and created real-time business dashboards for partners.',
        tools: ['React', 'Vue.js', 'JavaScript', 'PHP', 'Laravel', 'MySQL', 'Firebase', 'Google Maps API', 'Git'],
      },
    ],
  },
  {
    company: 'Ogun State Institute of Technology',
    positions: [
      {
        title: 'Frontend Developer (Student Volunteer)',
        period: '2024',
        summary:
          'Built a responsive E-Timetable system with a small team, replacing paper schedules with dynamic, department-level updates for students and staff.',
        tools: ['React', 'Next.js', 'Tailwind CSS'],
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
        summary:
          'Built responsive, accessible interfaces and debugged cross-browser issues, while picking up Git and Agile workflows.',
        tools: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Photoshop', 'Illustrator', 'Git'],
      },
    ],
  },
]
