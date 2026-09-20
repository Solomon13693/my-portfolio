export type SectionLayout = "text" | "timeline" | "list" | "tags";
export type SectionRegion = "main" | "sidebar";

export type ResumeSkeletonId =
  "single-column" | "sidebar-left" | "sidebar-right";

export type ResumeFontSize = "sm" | "md" | "lg";
export type ResumeLineHeight = "tight" | "normal" | "relaxed";
export type ResumeSectionGap = "sm" | "md" | "lg";
export type ResumeDensity = "compact" | "comfortable" | "spacious";
export type ResumePageSize = "A4" | "Letter";
export type ResumeHeadingStyle = "uppercase" | "title" | "underline";

/** Controls structural look / each template maps to a distinct style. */
export type ResumeLayoutStyle =
  | "banded"
  | "left-rule" // left-aligned navy with thick left accent rule
  | "minimal" // sparse hairlines, airy
  | "editorial" // large serif name, asymmetric elegance
  | "dense" // compact, tight meta rows
  | "banner" // full-bleed dark name banner
  | "timeline" // vertical rail + dots on experience
  | "creative" // bold color titles, no bars
  | "ats" // plain uppercase, zero decoration
  | "sidebar"; // used inside sidebar skeletons

export type ResumeTemplatePresetId =
  | "classic-ink"
  | "classic-navy"
  | "minimal-light"
  | "minimal-serif"
  | "modern-slate"
  | "modern-forest"
  | "modern-right"
  | "compact-pro"
  | "executive-bar"
  | "timeline-accent"
  | "creative-coral"
  | "ats-simple";

export type ResumeFontId =
  | "helvetica"
  | "times"
  | "inter"
  | "roboto"
  | "source-sans"
  | "lato"
  | "open-sans"
  | "georgia"
  | "merriweather"
  | "playfair";

export interface ResumeTheme {
  headingFontId: ResumeFontId;
  bodyFontId: ResumeFontId;
  fontSize: ResumeFontSize;
  lineHeight: ResumeLineHeight;
  sectionGap: ResumeSectionGap;
  headingColor: string;
  bodyColor: string;
  accentColor: string;
  mutedColor: string;
  density: ResumeDensity;
  pageSize: ResumePageSize;
  headingStyle: ResumeHeadingStyle;
  layoutStyle: ResumeLayoutStyle;
  /** Extra visual flag for templates that show an accent rail on timelines */
  showTimelineRail?: boolean;
  /** Extra visual flag for templates with a top accent bar */
  showAccentBar?: boolean;
}

export interface TimelineRole {
  id: string;
  title: string;
  period: string;
  duration?: string;
  current?: boolean;
  bullets: string[];
  tools: string[];
  visible: boolean;
}

export interface TimelineEntry {
  id: string;
  organization: string;
  logo?: string;
  roles: TimelineRole[];
  visible: boolean;
}

export interface ListEntry {
  id: string;
  title: string;
  subtitle?: string;
  meta?: string;
  description?: string;
  href?: string;
  visible: boolean;
}

export interface TagEntry {
  id: string;
  label: string;
  group?: string;
  level?: string;
  visible: boolean;
}

interface ResumeSectionBase {
  id: string;
  title: string;
  visible: boolean;
  region: SectionRegion;
}

export interface TextResumeSection extends ResumeSectionBase {
  layout: "text";
  content: string;
}

export interface TimelineResumeSection extends ResumeSectionBase {
  layout: "timeline";
  entries: TimelineEntry[];
}

export interface ListResumeSection extends ResumeSectionBase {
  layout: "list";
  entries: ListEntry[];
}

export interface TagsResumeSection extends ResumeSectionBase {
  layout: "tags";
  entries: TagEntry[];
}

export type ResumeSection =
  | TextResumeSection
  | TimelineResumeSection
  | ListResumeSection
  | TagsResumeSection;

export interface ResumeProfileLink {
  id: string;
  label: string;
  url: string;
}

export interface ResumeProfile {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  links: ResumeProfileLink[];
}

export interface ResumeDraft {
  version: number;
  updatedAt: string;
  skeletonId: ResumeSkeletonId;
  templatePresetId: ResumeTemplatePresetId;
  theme: ResumeTheme;
  profile: ResumeProfile;
  sections: ResumeSection[];
}
