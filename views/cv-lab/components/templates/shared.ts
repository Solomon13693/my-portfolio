import type { ResumeDraft, ResumeSection, SectionRegion, TimelineResumeSection, TagsResumeSection } from '@/types'

export function visibleSections(draft: ResumeDraft, region?: SectionRegion): ResumeSection[] {
  return draft.sections.filter((s) => s.visible && (region ? s.region === region : true))
}

export function groupTagsByCategory(section: TagsResumeSection): [string, string[]][] {
  const groups = new Map<string, string[]>()
  for (const tag of section.entries.filter((e) => e.visible)) {
    const key = tag.group?.trim() || 'Skills'
    const list = groups.get(key) ?? []
    list.push(tag.label)
    groups.set(key, list)
  }
  return Array.from(groups.entries())
}

export function isTimelineSection(section: ResumeSection): section is TimelineResumeSection {
  return section.layout === 'timeline'
}

export { createId as newId } from '@/lib'
