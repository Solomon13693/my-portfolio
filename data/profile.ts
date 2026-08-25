import { SiGithub, SiInstagram } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa6'

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
    Icon: FaLinkedin,
  },
  {
    label: 'GitHub',
    href: PROFILE.github,
    Icon: SiGithub,
  },
  {
    label: 'Instagram',
    href: PROFILE.instagram,
    Icon: SiInstagram,
  },
] as const

