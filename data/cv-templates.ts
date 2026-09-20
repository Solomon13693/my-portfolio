import type {
  ResumeSkeletonId,
  ResumeTemplatePresetId,
  ResumeTheme,
} from "@/types";

export interface CvTemplatePreset {
  id: ResumeTemplatePresetId;
  label: string;
  description: string;
  skeletonId: ResumeSkeletonId;
  theme: ResumeTheme;
  swatch: { bg: string; accent: string; text: string };
  featured?: boolean;
}

function theme(
  partial: Partial<ResumeTheme> &
    Pick<
      ResumeTheme,
      | "headingColor"
      | "bodyColor"
      | "accentColor"
      | "mutedColor"
      | "layoutStyle"
    >,
): ResumeTheme {
  return {
    headingFontId: "helvetica",
    bodyFontId: "helvetica",
    fontSize: "md",
    lineHeight: "normal",
    sectionGap: "md",
    density: "comfortable",
    pageSize: "A4",
    headingStyle: "title",
    showTimelineRail: false,
    showAccentBar: false,
    ...partial,
  };
}

/**
 * Two featured looks for now (polished):
 * 1. Classic Ink / matches the FlowCV PDF the user shared
 * 2. Modern Slate / compact fixed sidebar
 * Other presets stay available for Design overrides / migrations.
 */
export const CV_TEMPLATE_PRESETS: CvTemplatePreset[] = [
  {
    id: "classic-ink",
    label: "Classic Ink",
    description: "FlowCV-style · centered header · gray section bars",
    skeletonId: "single-column",
    featured: true,
    theme: theme({
      layoutStyle: "banded",
      headingColor: "#16233c",
      bodyColor: "#1c1c1c",
      accentColor: "#ececec",
      mutedColor: "#333333",
      headingStyle: "title",
      pageSize: "Letter",
      headingFontId: "helvetica",
      bodyFontId: "helvetica",
      fontSize: "md",
      lineHeight: "relaxed",
      sectionGap: "lg",
      density: "spacious",
    }),
    swatch: { bg: "#ffffff", accent: "#ececec", text: "#16233c" },
  },
  {
    id: "modern-slate",
    label: "Modern Slate",
    description: "Narrow fixed sidebar · clean main column",
    skeletonId: "sidebar-left",
    featured: true,
    theme: theme({
      layoutStyle: "sidebar",
      headingColor: "#111827",
      bodyColor: "#374151",
      accentColor: "#f3f4f6",
      mutedColor: "#6b7280",
      headingFontId: "inter",
      bodyFontId: "inter",
      headingStyle: "uppercase",
      fontSize: "md",
      lineHeight: "relaxed",
      sectionGap: "md",
      density: "comfortable",
    }),
    swatch: { bg: "#f3f4f6", accent: "#111827", text: "#111827" },
  },
  {
    id: "classic-navy",
    label: "Classic Navy",
    description: "Left-aligned · thick navy side rule",
    skeletonId: "single-column",
    theme: theme({
      layoutStyle: "left-rule",
      headingColor: "#1e3a5f",
      bodyColor: "#334155",
      accentColor: "#1e3a5f",
      mutedColor: "#64748b",
      headingFontId: "merriweather",
      bodyFontId: "source-sans",
      headingStyle: "title",
    }),
    swatch: { bg: "#ffffff", accent: "#1e3a5f", text: "#1e3a5f" },
  },
  {
    id: "minimal-light",
    label: "Minimal Light",
    description: "Sparse · thin hairlines · airy gaps",
    skeletonId: "single-column",
    theme: theme({
      layoutStyle: "minimal",
      headingColor: "#171717",
      bodyColor: "#525252",
      accentColor: "#e5e5e5",
      mutedColor: "#a3a3a3",
      density: "spacious",
      sectionGap: "lg",
      fontSize: "md",
      headingStyle: "title",
      headingFontId: "inter",
      bodyFontId: "inter",
    }),
    swatch: { bg: "#fafafa", accent: "#e5e5e5", text: "#171717" },
  },
  {
    id: "minimal-serif",
    label: "Minimal Serif",
    description: "Editorial serif · oversized name",
    skeletonId: "single-column",
    theme: theme({
      layoutStyle: "editorial",
      headingColor: "#1c1917",
      bodyColor: "#44403c",
      accentColor: "#d6d3d1",
      mutedColor: "#78716c",
      headingFontId: "playfair",
      bodyFontId: "georgia",
      headingStyle: "title",
      lineHeight: "relaxed",
      density: "spacious",
    }),
    swatch: { bg: "#ffffff", accent: "#d6d3d1", text: "#1c1917" },
  },
  {
    id: "modern-forest",
    label: "Modern Forest",
    description: "Green tinted left sidebar",
    skeletonId: "sidebar-left",
    theme: theme({
      layoutStyle: "sidebar",
      headingColor: "#14532d",
      bodyColor: "#3f3f46",
      accentColor: "#d1fae5",
      mutedColor: "#6b7280",
      headingFontId: "lato",
      bodyFontId: "lato",
      headingStyle: "uppercase",
    }),
    swatch: { bg: "#ecfdf5", accent: "#14532d", text: "#14532d" },
  },
  {
    id: "modern-right",
    label: "Modern Right",
    description: "Slate sidebar on the right",
    skeletonId: "sidebar-right",
    theme: theme({
      layoutStyle: "sidebar",
      headingColor: "#0f172a",
      bodyColor: "#334155",
      accentColor: "#e2e8f0",
      mutedColor: "#64748b",
      headingFontId: "roboto",
      bodyFontId: "roboto",
      headingStyle: "uppercase",
    }),
    swatch: { bg: "#e2e8f0", accent: "#0f172a", text: "#0f172a" },
  },
  {
    id: "compact-pro",
    label: "Compact Pro",
    description: "Dense · tight rows · max content",
    skeletonId: "single-column",
    theme: theme({
      layoutStyle: "dense",
      headingColor: "#18181b",
      bodyColor: "#3f3f46",
      accentColor: "#a1a1aa",
      mutedColor: "#71717a",
      density: "compact",
      fontSize: "sm",
      lineHeight: "tight",
      sectionGap: "sm",
      headingFontId: "open-sans",
      bodyFontId: "open-sans",
      headingStyle: "uppercase",
    }),
    swatch: { bg: "#ffffff", accent: "#a1a1aa", text: "#18181b" },
  },
  {
    id: "executive-bar",
    label: "Executive Bar",
    description: "Full-bleed dark name banner",
    skeletonId: "single-column",
    theme: theme({
      layoutStyle: "banner",
      headingColor: "#0c0a09",
      bodyColor: "#44403c",
      accentColor: "#1c1917",
      mutedColor: "#78716c",
      showAccentBar: true,
      headingFontId: "helvetica",
      bodyFontId: "helvetica",
      headingStyle: "uppercase",
      density: "spacious",
      sectionGap: "lg",
    }),
    swatch: { bg: "#ffffff", accent: "#1c1917", text: "#0c0a09" },
  },
  {
    id: "timeline-accent",
    label: "Timeline Accent",
    description: "Blue vertical timeline rail",
    skeletonId: "single-column",
    theme: theme({
      layoutStyle: "timeline",
      headingColor: "#1e293b",
      bodyColor: "#475569",
      accentColor: "#2563eb",
      mutedColor: "#94a3b8",
      showTimelineRail: true,
      headingFontId: "inter",
      bodyFontId: "inter",
      headingStyle: "underline",
    }),
    swatch: { bg: "#ffffff", accent: "#2563eb", text: "#1e293b" },
  },
  {
    id: "creative-coral",
    label: "Creative Coral",
    description: "Warm titles · left sidebar splash",
    skeletonId: "sidebar-left",
    theme: theme({
      layoutStyle: "creative",
      headingColor: "#9a3412",
      bodyColor: "#44403c",
      accentColor: "#ffedd5",
      mutedColor: "#a8a29e",
      headingFontId: "playfair",
      bodyFontId: "lato",
      headingStyle: "title",
    }),
    swatch: { bg: "#ffedd5", accent: "#9a3412", text: "#9a3412" },
  },
  {
    id: "ats-simple",
    label: "ATS Simple",
    description: "Plain uppercase · zero decoration",
    skeletonId: "single-column",
    theme: theme({
      layoutStyle: "ats",
      headingColor: "#000000",
      bodyColor: "#000000",
      accentColor: "#000000",
      mutedColor: "#525252",
      headingFontId: "helvetica",
      bodyFontId: "helvetica",
      headingStyle: "uppercase",
      density: "comfortable",
    }),
    swatch: { bg: "#ffffff", accent: "#000000", text: "#000000" },
  },
];

export const CV_TEMPLATE_PRESET_MAP = Object.fromEntries(
  CV_TEMPLATE_PRESETS.map((p) => [p.id, p]),
) as Record<ResumeTemplatePresetId, CvTemplatePreset>;

export const FEATURED_TEMPLATE_PRESETS = CV_TEMPLATE_PRESETS.filter(
  (p) => p.featured,
);

export const COVER_LETTER_PRESET_IDS = ["classic-ink", "modern-slate"] as const;

export function getTemplatePreset(
  id: ResumeTemplatePresetId,
): CvTemplatePreset {
  return CV_TEMPLATE_PRESET_MAP[id] ?? CV_TEMPLATE_PRESET_MAP["classic-ink"];
}
