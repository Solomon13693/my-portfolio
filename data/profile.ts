export const PROFILE = {
  name: 'Solomon Adeoye',
  tagline: 'Software Developer.',
  role: { label: 'Frontend Developer', company: 'Klone' },
  location: 'Lagos, Nigeria',
  timezone: 'Africa/Lagos',
  email: 'adeoyesolomon2693@gmail.com',
  phone: '+234 706 662 5389',
  linkedin: 'https://www.linkedin.com/in/adeoye-solomon-094650219/',
  github: 'https://github.com/solomon13693',
  githubUsername: 'solomon13693',
  githubJoinedYear: 2021,
  instagram: 'https://www.instagram.com/adeoye__solomon/',
} as const

export const SOCIALS = [
  {
    label: 'LinkedIn',
    href: PROFILE.linkedin,
    Icon: require('lucide-react').Linkedin,
  },
  {
    label: 'GitHub',
    href: PROFILE.github,
    Icon: require('lucide-react').Github,
  },
  {
    label: 'Instagram',
    href: PROFILE.instagram,
    Icon: require('lucide-react').Instagram,
  },
] as const