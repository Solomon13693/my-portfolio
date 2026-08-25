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
    institution: 'Ogun State Institute of Technology (OGITECH)',
    program: 'Higher National Diploma (HND) — Software & Web Development',
    period: '2025 – Present',
  },
  {
    institution: 'Ogun State Institute of Technology (OGITECH)',
    program: 'National Diploma (ND) — Computer Science',
    period: '2022 – 2024',
  },
];
