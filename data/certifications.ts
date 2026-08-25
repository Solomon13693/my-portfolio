export interface CertificationEntry {
  title: string
  issuer: string
  date: string
  href?: string
}

export const CERTIFICATIONS: CertificationEntry[] = [
  {
    title: 'React Native — The Practical Guide',
    issuer: 'Academind · Udemy',
    date: 'Jul 2026',
    href: 'https://www.udemy.com/certificate/UC-ed8e86ef-156a-4167-86bf-fce5bf9198e3/',
  },
  {
    title: 'PHP Master Class',
    issuer: 'Devahray',
    date: '2022',
  },
  {
    title: 'Web Design / Web Development',
    issuer: 'Kyel House Intern Program',
    date: '2021',
  },
  {
    title: 'Graphic Design',
    issuer: 'Mentis Design Academy',
    date: '2020',
  },
]
