import { getTemplatePreset } from '@/data'
import type {
  ResumeDraft,
  ResumeSection,
  TextResumeSection,
  TimelineResumeSection,
  ListResumeSection,
  TagsResumeSection,
} from '@/types'

export const RESUME_DRAFT_VERSION = 3

export function slugify(...parts: string[]): string {
  return parts
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function buildSummarySection(): TextResumeSection {
  return {
    id: 'summary',
    title: 'Summary',
    layout: 'text',
    visible: true,
    region: 'main',
    content: '',
  }
}

function buildExperienceSection(): TimelineResumeSection {
  return {
    id: 'experience',
    title: 'Experience',
    layout: 'timeline',
    visible: true,
    region: 'main',
    entries: [],
  }
}

function buildEducationSection(): TimelineResumeSection {
  return {
    id: 'education',
    title: 'Education',
    layout: 'timeline',
    visible: true,
    region: 'sidebar',
    entries: [],
  }
}

function buildCertificationsSection(): ListResumeSection {
  return {
    id: 'certifications',
    title: 'Certifications',
    layout: 'list',
    visible: true,
    region: 'sidebar',
    entries: [],
  }
}

function buildSkillsSection(): TagsResumeSection {
  return {
    id: 'skills',
    title: 'Skills',
    layout: 'tags',
    visible: true,
    region: 'sidebar',
    entries: [],
  }
}

export function buildDefaultSections(): ResumeSection[] {
  return [buildSummarySection(), buildExperienceSection(), buildEducationSection(), buildCertificationsSection(), buildSkillsSection()]
}

export function buildDefaultResumeDraft(): ResumeDraft {
  const preset = getTemplatePreset('classic-ink')
  return {
    version: RESUME_DRAFT_VERSION,
    updatedAt: new Date().toISOString(),
    skeletonId: preset.skeletonId,
    templatePresetId: preset.id,
    theme: { ...preset.theme },
    profile: {
      name: '',
      headline: '',
      email: '',
      phone: '',
      location: '',
      links: [],
    },
    sections: buildDefaultSections(),
  }
}
