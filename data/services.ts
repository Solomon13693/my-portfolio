export interface Service {
  title: string
  description: string
}

export const SERVICES: Service[] = [
  {
    title: 'Frontend Development',
    description:
      'Building modern, responsive, and accessible web interfaces with React, Next.js, and other frontend technologies from landing pages and dashboards to complex, interactive applications.',
  },

  {
    title: 'Mobile Development',
    description:
      'Building cross-platform mobile applications with React Native, creating smooth, reliable experiences that work across iOS and Android while sharing a maintainable codebase.',
  },

  {
    title: 'Backend Development',
    description:
      'Designing and building reliable backend systems, APIs, authentication, database integrations, business logic, and third-party service integrations using Laravel, Node.js, and other backend technologies.',
  },

  {
    title: 'Full-Stack Development',
    description:
      'Taking products and features from idea to production across the entire stack connecting interfaces, APIs, databases, services, and infrastructure into complete, maintainable software.',
  },

  {
    title: 'API & System Integration',
    description:
      'Building and integrating APIs and third-party services to connect different systems, automate workflows, process data, and create seamless experiences across web and mobile applications.',
  },

  {
    title: 'Product Development',
    description:
      'Turning product requirements and ideas into practical software solutions, from planning and implementation to testing, deployment, maintenance, and continuous improvement after launch.',
  },
]