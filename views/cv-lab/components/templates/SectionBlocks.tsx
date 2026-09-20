'use client'

import type { ReactNode } from 'react'
import type {
 ListResumeSection,
 ResumeDraft,
 ResumeLayoutStyle,
 ResumeSection,
 ResumeTheme,
 TagsResumeSection,
 TextResumeSection,
 TimelineResumeSection,
 TimelineRole,
} from '@/types'
import { groupTagsByCategory } from './shared'
import { formatDisplayUrl } from '@/lib'

function IconMail() {
 return (
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-2.5" aria-hidden>
 <path d="M2 5h20v14H2z" />
 <path d="M2 5l10 8 10-8" />
 </svg>
 )
}
function IconPhone() {
 return (
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-2.5" aria-hidden>
 <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8.1 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.9 2.2z" />
 </svg>
 )
}
function IconPin() {
 return (
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-2.5" aria-hidden>
 <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
 <circle cx="12" cy="10" r="3" />
 </svg>
 )
}
function IconLink() {
 return (
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-2.5" aria-hidden>
 <path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1 1" />
 <path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1-1" />
 </svg>
 )
}

function IconBadge({ children }: { children: ReactNode }) {
 return (
 <span className="inline-flex size-[18px] shrink-0 items-center justify-center rounded-full border border-[#3a3a3a] text-[#3a3a3a]">
 {children}
 </span>
 )
}

function formatLinkDisplay(url: string) {
 return formatDisplayUrl(url)
}

function styleOf(theme: ResumeTheme): ResumeLayoutStyle {
 return theme.layoutStyle ?? 'banded'
}

function SectionHeading({ children, theme }: { children: ReactNode; theme: ResumeTheme }) {
 const style = styleOf(theme)

 if (style === 'banded') {
 return (
 <div
 className="mb-2.5 mt-3.5 flex items-center justify-center px-3 py-[7px]"
 style={{ background: theme.accentColor || '#ececec' }}
 >
 <span
 className="text-[0.95rem] leading-none font-bold"
 style={{ color: theme.headingColor, fontFamily: 'var(--cv-heading-font)' }}
 >
 {children}
 </span>
 </div>
 )
 }

 if (style === 'left-rule') {
 return (
 <h2
 className="mb-2 mt-3 border-l-4 pl-2.5 text-[0.95rem] font-bold tracking-wide"
 style={{ borderColor: theme.accentColor, color: theme.headingColor, fontFamily: 'var(--cv-heading-font)' }}
 >
 {children}
 </h2>
 )
 }

 if (style === 'minimal' || style === 'editorial') {
 return (
 <h2
 className="mb-3 mt-4 border-b pb-1 text-xs font-medium tracking-[0.2em] uppercase"
 style={{ borderColor: theme.accentColor, color: theme.headingColor, fontFamily: 'var(--cv-heading-font)' }}
 >
 {children}
 </h2>
 )
 }

 if (style === 'dense') {
 return (
 <h2
 className="mb-1.5 mt-2 border-b pb-0.5 text-[0.7rem] font-bold tracking-widest uppercase"
 style={{ borderColor: theme.accentColor, color: theme.headingColor }}
 >
 {children}
 </h2>
 )
 }

 if (style === 'banner' || style === 'ats') {
 return (
 <h2
 className="mb-2 mt-3 text-[0.75rem] font-bold tracking-[0.14em] uppercase"
 style={{
 color: theme.headingColor,
 borderBottom: `1px solid ${theme.headingColor}`,
 paddingBottom: 3,
 fontFamily: 'var(--cv-heading-font)',
 }}
 >
 {children}
 </h2>
 )
 }

 if (style === 'timeline') {
 return (
 <h2
 className="mb-3 mt-3 text-[0.85rem] font-bold"
 style={{
 color: theme.headingColor,
 borderBottom: `2px solid ${theme.accentColor}`,
 paddingBottom: 4,
 fontFamily: 'var(--cv-heading-font)',
 }}
 >
 {children}
 </h2>
 )
 }

 if (style === 'creative') {
 return (
 <h2
 className="mb-2 mt-3 text-lg font-bold italic"
 style={{ color: theme.headingColor, fontFamily: 'var(--cv-heading-font)' }}
 >
 {children}
 </h2>
 )
 }

 // sidebar / compact uppercase labels
 return (
 <h2
 className="mb-1.5 mt-2 border-b pb-1 text-[0.65rem] font-bold tracking-[0.14em] uppercase"
 style={{ color: theme.headingColor, borderColor: `${theme.headingColor}33`, fontFamily: 'var(--cv-heading-font)' }}
 >
 {children}
 </h2>
 )
}

function RoleBody({ role, theme }: { role: TimelineRole; theme: ResumeTheme }) {
 const dense = styleOf(theme) === 'dense'
 return (
 <>
 {role.tools.length > 0 ? (
 <p className={dense ? 'mb-1 text-[0.9em]' : 'mb-2'} style={{ color: theme.bodyColor }}>
 <b style={{ color: theme.headingColor }}>Technologies:</b> {role.tools.join(', ')}
 </p>
 ) : null}
 <ul className={`m-0 list-disc pl-5 ${dense ? 'space-y-0.5' : 'space-y-1.5'}`} style={{ color: theme.bodyColor }}>
 {role.bullets.filter(Boolean).map((bullet, i) => (
 <li key={i} className="leading-relaxed">
 {bullet}
 </li>
 ))}
 </ul>
 </>
 )
}

function TimelineBlock({ section, theme }: { section: TimelineResumeSection; theme: ResumeTheme }) {
 const entries = section.entries.filter((e) => e.visible && e.roles.some((r) => r.visible))
 if (!entries.length) return null
 const style = styleOf(theme)
 const useRail = style === 'timeline' || theme.showTimelineRail
 const entryGap = style === 'dense' ? 'space-y-2' : 'space-y-4'

 return (
 <section className="mb-1">
 <SectionHeading theme={theme}>{section.title}</SectionHeading>
 <div className={useRail ? `relative ${entryGap} border-l-2 pl-4` : entryGap} style={useRail ? { borderColor: theme.accentColor } : undefined}>
 {entries.map((entry) => {
 const roles = entry.roles.filter((r) => r.visible)
 const multi = roles.length > 1

 if (!multi) {
 const role = roles[0]
 if (!role) return null
 return (
 <div key={entry.id} className="relative">
 {useRail ? (
 <span
 className="absolute -left-[21px] top-1.5 size-2.5 rounded-full border-2 bg-white"
 style={{ borderColor: theme.accentColor }}
 />
 ) : null}
 <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
 <span className="text-[1.05em] font-bold" style={{ color: theme.headingColor }}>
 {entry.organization}
 </span>
 <span className="shrink-0 text-[0.95em] font-bold" style={{ color: style === 'timeline' ? theme.accentColor : theme.headingColor }}>
 {role.period}
 </span>
 </div>
 <p className="mb-1.5 italic" style={{ color: theme.mutedColor }}>
 {role.title}
 </p>
 <RoleBody role={role} theme={theme} />
 </div>
 )
 }

 return (
 <div key={entry.id} className="relative">
 {useRail ? (
 <span
 className="absolute -left-[21px] top-1.5 size-2.5 rounded-full border-2 bg-white"
 style={{ borderColor: theme.accentColor }}
 />
 ) : null}
 <p className="text-[1.05em] font-bold" style={{ color: theme.headingColor }}>
 {entry.organization}
 </p>
 {roles.map((role) => (
 <div key={role.id} className="mt-2.5">
 <div className="flex flex-wrap items-baseline justify-between gap-x-3">
 <p className="italic" style={{ color: theme.mutedColor }}>
 {role.title}
 </p>
 <span className="shrink-0 text-[0.95em] font-bold" style={{ color: theme.headingColor }}>
 {role.period}
 </span>
 </div>
 <RoleBody role={role} theme={theme} />
 </div>
 ))}
 </div>
 )
 })}
 </div>
 </section>
 )
}

function TextBlock({ section, theme }: { section: TextResumeSection; theme: ResumeTheme }) {
 if (!section.content.trim()) return null
 const banded = styleOf(theme) === 'banded'
 return (
 <section>
 <SectionHeading theme={theme}>{section.title}</SectionHeading>
 <p
 className="mb-1.5 whitespace-pre-wrap"
 style={{ color: theme.bodyColor, textAlign: banded ? 'justify' : undefined, hyphens: banded ? 'auto' : undefined }}
 >
 {section.content}
 </p>
 </section>
 )
}

function ListBlock({ section, theme }: { section: ListResumeSection; theme: ResumeTheme }) {
 const entries = section.entries.filter((e) => e.visible)
 if (!entries.length) return null
 return (
 <section>
 <SectionHeading theme={theme}>{section.title}</SectionHeading>
 <div className="space-y-1.5">
 {entries.map((entry) => (
 <div key={entry.id} className="mb-1.5">
 <div className="flex flex-wrap items-baseline justify-between gap-x-3">
 <span className="font-bold" style={{ color: theme.headingColor }}>
 {entry.title}
 </span>
 {entry.meta ? (
 <span className="shrink-0 text-[0.95em]" style={{ color: theme.mutedColor }}>
 {entry.meta}
 </span>
 ) : null}
 </div>
 {entry.subtitle ? (
 <p className="italic" style={{ color: theme.mutedColor }}>
 {entry.subtitle}
 </p>
 ) : null}
 {entry.description ? <p style={{ color: theme.bodyColor }}>{entry.description}</p> : null}
 </div>
 ))}
 </div>
 </section>
 )
}

function TagsBlock({ section, theme }: { section: TagsResumeSection; theme: ResumeTheme }) {
 const groups = groupTagsByCategory(section)
 if (!groups.length) return null
 const style = styleOf(theme)

 if (style === 'creative') {
 return (
 <section>
 <SectionHeading theme={theme}>{section.title}</SectionHeading>
 <div className="flex flex-wrap gap-1.5">
 {section.entries
 .filter((e) => e.visible)
 .map((e) => (
 <span
 key={e.id}
 className="border px-2 py-0.5 text-xs"
 style={{ borderColor: theme.headingColor, color: theme.headingColor }}
 >
 {e.label}
 </span>
 ))}
 </div>
 </section>
 )
 }

 return (
 <section>
 <SectionHeading theme={theme}>{section.title}</SectionHeading>
 <div>
 {groups.map(([category, names]) => (
 <p key={category} className="mb-1" style={{ color: theme.bodyColor }}>
 <b style={{ color: theme.headingColor }}>{category}:</b> {names.join(', ')}
 </p>
 ))}
 </div>
 </section>
 )
}

export function renderSection(section: ResumeSection, theme: ResumeTheme) {
 if (section.layout === 'text') return <TextBlock key={section.id} section={section} theme={theme} />
 if (section.layout === 'timeline') return <TimelineBlock key={section.id} section={section} theme={theme} />
 if (section.layout === 'list') return <ListBlock key={section.id} section={section} theme={theme} />
 return <TagsBlock key={section.id} section={section} theme={theme} />
}

export function ProfileHeader({ draft, theme }: { draft: ResumeDraft; theme: ResumeTheme }) {
 const style = styleOf(theme)
 const primary = [
 draft.profile.email ? { icon: <IconMail />, text: draft.profile.email } : null,
 draft.profile.phone ? { icon: <IconPhone />, text: draft.profile.phone } : null,
 draft.profile.location ? { icon: <IconPin />, text: draft.profile.location } : null,
 ].filter(Boolean) as { icon: ReactNode; text: string }[]

 const links = draft.profile.links
 .filter((l) => l.url.trim())
 .map((l) => ({ icon: <IconLink />, text: formatLinkDisplay(l.url) }))

 const contactFlat = [...primary.map((p) => p.text), ...links.map((l) => l.text)]

 // Banner: dark full-bleed header
 if (style === 'banner') {
 return (
 <header className="-mx-[var(--cv-page-padding)] mb-5 px-[var(--cv-page-padding)] py-6" style={{ background: theme.accentColor }}>
 <h1
 className="m-0 text-2xl font-bold tracking-tight text-white sm:text-3xl"
 style={{ fontFamily: 'var(--cv-heading-font)' }}
 >
 {draft.profile.name}
 </h1>
 {draft.profile.headline ? <p className="mt-1 text-sm text-white/80">{draft.profile.headline}</p> : null}
 <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/70">
 {contactFlat.map((c) => (
 <span key={c}>{c}</span>
 ))}
 </p>
 </header>
 )
 }

 // Editorial: huge serif name, left aligned
 if (style === 'editorial') {
 return (
 <header className="mb-6">
 <h1
 className="m-0 text-3xl font-normal tracking-tight sm:text-4xl"
 style={{ color: theme.headingColor, fontFamily: 'var(--cv-heading-font)' }}
 >
 {draft.profile.name}
 </h1>
 {draft.profile.headline ? (
 <p className="mt-2 text-sm tracking-wide uppercase" style={{ color: theme.mutedColor }}>
 {draft.profile.headline}
 </p>
 ) : null}
 <p className="mt-3 text-sm" style={{ color: theme.mutedColor }}>
 {contactFlat.join(' · ')}
 </p>
 <div className="mt-4 h-px w-24" style={{ background: theme.headingColor }} />
 </header>
 )
 }

 // Left-rule / minimal / dense / ats / timeline / creative: left-aligned
 if (style !== 'banded') {
 return (
 <header className={`mb-3 ${style === 'dense' ? 'mb-2' : ''}`}>
 <h1
 className={`m-0 font-bold ${style === 'dense' ? 'text-xl' : 'text-2xl sm:text-[1.75rem]'}`}
 style={{ color: theme.headingColor, fontFamily: 'var(--cv-heading-font)' }}
 >
 {draft.profile.name}
 </h1>
 {draft.profile.headline ? (
 <p className={`mt-0.5 ${style === 'ats' ? '' : 'italic'}`} style={{ color: theme.mutedColor }}>
 {draft.profile.headline}
 </p>
 ) : null}
 <p className={`mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm ${style === 'dense' ? 'text-xs' : ''}`} style={{ color: theme.mutedColor }}>
 {contactFlat.map((c) => (
 <span key={c}>{c}</span>
 ))}
 </p>
 {style === 'left-rule' ? <div className="mt-3 h-0.5 w-full" style={{ background: theme.accentColor }} /> : null}
 {style === 'ats' ? <hr className="mt-2 border-0 border-t border-black" /> : null}
 {style === 'minimal' ? <div className="mt-4 h-px w-full" style={{ background: theme.accentColor }} /> : null}
 </header>
 )
 }

 // Banded (Classic Ink / FlowCV): centered name + icon contact rows
 return (
 <header className="mb-2 text-center">
 <h1
 className="m-0 text-[1.85rem] font-bold tracking-wide sm:text-[2.05rem]"
 style={{ color: theme.headingColor, fontFamily: 'var(--cv-heading-font)' }}
 >
 {draft.profile.name}
 </h1>
 {draft.profile.headline ? (
 <p className="m-0 mt-1 text-[1.05rem]" style={{ color: theme.mutedColor }}>
 {draft.profile.headline}
 </p>
 ) : null}
 {primary.length > 0 ? (
 <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
 {primary.map((item) => (
 <span key={item.text} className="inline-flex items-center gap-1.5 text-[0.88rem]" style={{ color: theme.bodyColor }}>
 <IconBadge>{item.icon}</IconBadge>
 <span className="break-all">{item.text}</span>
 </span>
 ))}
 </div>
 ) : null}
 {links.length > 0 ? (
 <div className="mt-1.5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
 {links.map((item) => (
 <span key={item.text} className="inline-flex items-center gap-1.5 text-[0.88rem]" style={{ color: theme.bodyColor }}>
 <IconBadge>{item.icon}</IconBadge>
 <span className="break-all">{item.text}</span>
 </span>
 ))}
 </div>
 ) : null}
 <hr className="mt-3 mb-1 border-0 border-t border-[#d9d9d9]" />
 </header>
 )
}
