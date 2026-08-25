/**
 * Real, dated entries only — sourced directly from the Education and
 * Certifications & Courses sections of Solomon's CV
 * (Adeoye_Solomon_Oluwatobi_FlowCV_Resume_2026-08-01.pdf). Nothing invented.
 */
export interface EducationEntry {
  institution: string
  program: string
  period: string
}

export const EDUCATION: EducationEntry[] = [
  {
    institution: 'Ogun State Institute of Technology',
    program: 'National Diploma — Computer Science',
    period: 'Sep 2022 – Oct 2024',
  },
  {
    institution: 'Devahray',
    program: 'PHP Master Class',
    period: '2022',
  },
  {
    institution: 'Kyel House Intern Program',
    program: 'Web Designing / Web Development',
    period: '2021',
  },
  {
    institution: 'Mentis Design Academy',
    program: 'Graphic Design',
    period: '2020',
  },
]
