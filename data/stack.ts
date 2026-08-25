export interface StackItem {
  name: string
  href: string
}

export interface StackCategory {
  id: string
  label: string
  items: StackItem[]
}

export const STACK: StackCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    items: [
      { name: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { name: 'TypeScript', href: 'https://www.typescriptlang.org' },
      { name: 'HTML5', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      { name: 'CSS3', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'React', href: 'https://react.dev' },
      { name: 'Next.js', href: 'https://nextjs.org' },
      { name: 'Vue.js', href: 'https://vuejs.org' },
      { name: 'TanStack Query', href: 'https://tanstack.com/query' },
      { name: 'Zustand', href: 'https://zustand-demo.pmnd.rs' },
      { name: 'Tailwind CSS', href: 'https://tailwindcss.com' },
      { name: 'Bootstrap', href: 'https://getbootstrap.com' },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    items: [
      { name: 'React Native', href: 'https://reactnative.dev' },
      { name: 'Expo', href: 'https://expo.dev' },
      { name: 'React Navigation', href: 'https://reactnavigation.org' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: [
      { name: 'Node.js', href: 'https://nodejs.org' },
      { name: 'Express.js', href: 'https://expressjs.com' },
      { name: 'PHP', href: 'https://www.php.net' },
      { name: 'Laravel', href: 'https://laravel.com' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    items: [
      { name: 'MySQL', href: 'https://www.mysql.com' },
      { name: 'MongoDB', href: 'https://www.mongodb.com' },
    ],
  },
  {
    id: 'integrations',
    label: 'Integrations',
    items: [
      { name: 'Firebase', href: 'https://firebase.google.com' },
      { name: 'Google Maps API', href: 'https://developers.google.com/maps' },
      { name: 'Google Calendar API', href: 'https://developers.google.com/calendar' },
      { name: 'Zoom API', href: 'https://developers.zoom.us' },
    ],
  },
  {
    id: 'design',
    label: 'Design',
    items: [
      { name: 'Photoshop', href: 'https://www.adobe.com/products/photoshop.html' },
      { name: 'Illustrator', href: 'https://www.adobe.com/products/illustrator.html' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & DevOps',
    items: [
      { name: 'Git', href: 'https://git-scm.com' },
      { name: 'GitHub', href: 'https://github.com' },
      { name: 'Jira', href: 'https://www.atlassian.com/software/jira' },
      { name: 'Slack', href: 'https://slack.com' },
      { name: 'Vercel', href: 'https://vercel.com' },
      { name: 'Netlify', href: 'https://www.netlify.com' },
    ],
  },
  {
    id: 'ai',
    label: 'AI Tools',
    items: [{ name: 'Claude Code', href: 'https://claude.ai/code' }],
  },
]
