import { getTemplatePreset } from "@/data";
import {
  buildDefaultResumeDraft,
  RESUME_DRAFT_VERSION,
  slugify,
} from "./resume-defaults";
import type {
  ResumeDraft,
  ResumeProfile,
  ResumeProfileLink,
  ResumeSection,
  ResumeTemplatePresetId,
  TimelineEntry,
  TimelineRole,
  TextResumeSection,
  TimelineResumeSection,
  ListResumeSection,
  TagsResumeSection,
} from "@/types";

/** Snapshot of the v1 draft shape / kept only for migration. */
interface V1ResumeDraft {
  version?: number;
  updatedAt?: string;
  templateId?: "classic" | "modern" | "minimal";
  profile?: {
    name?: string;
    headline?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  summary?: string;
  experience?: Array<{
    id?: string;
    company?: string;
    logo?: string;
    positions?: Array<{
      id?: string;
      title?: string;
      period?: string;
      duration?: string;
      current?: boolean;
      employment?: string;
      bullets?: string[];
      tools?: string[];
      visible?: boolean;
    }>;
  }>;
  education?: Array<{
    id?: string;
    institution?: string;
    program?: string;
    period?: string;
    visible?: boolean;
  }>;
  certifications?: Array<{
    id?: string;
    title?: string;
    issuer?: string;
    date?: string;
    href?: string;
    visible?: boolean;
  }>;
  skills?: Array<{
    id?: string;
    name?: string;
    category?: string;
    level?: string;
  }>;
  sectionOrder?: Array<{ key?: string; visible?: boolean }>;
}

const TEMPLATE_TO_PRESET: Record<string, ResumeTemplatePresetId> = {
  classic: "classic-ink",
  modern: "modern-slate",
  minimal: "minimal-light",
};

function migrateV1(raw: V1ResumeDraft): ResumeDraft {
  const presetId =
    TEMPLATE_TO_PRESET[raw.templateId ?? "classic"] ?? "classic-ink";
  const preset = getTemplatePreset(presetId);

  const links: ResumeProfileLink[] = [];
  if (raw.profile?.linkedin)
    links.push({
      id: "linkedin",
      label: "LinkedIn",
      url: raw.profile.linkedin,
    });
  if (raw.profile?.github)
    links.push({ id: "github", label: "GitHub", url: raw.profile.github });
  if (raw.profile?.website)
    links.push({ id: "website", label: "Website", url: raw.profile.website });

  const profile: ResumeProfile = {
    name: raw.profile?.name ?? "",
    headline: raw.profile?.headline ?? "",
    email: raw.profile?.email ?? "",
    phone: raw.profile?.phone ?? "",
    location: raw.profile?.location ?? "",
    links,
  };

  const order = raw.sectionOrder?.length
    ? raw.sectionOrder
    : [
        { key: "summary", visible: true },
        { key: "experience", visible: true },
        { key: "education", visible: true },
        { key: "certifications", visible: true },
        { key: "skills", visible: true },
      ];

  const sections: ResumeSection[] = [];

  for (const item of order) {
    const key = item.key;
    const visible = item.visible !== false;

    if (key === "summary") {
      const section: TextResumeSection = {
        id: "summary",
        title: "Summary",
        layout: "text",
        visible,
        region: "main",
        content: raw.summary ?? "",
      };
      sections.push(section);
      continue;
    }

    if (key === "experience") {
      const entries: TimelineEntry[] = (raw.experience ?? []).map((company) => {
        const org = company.company ?? "Company";
        return {
          id: company.id ?? slugify(org),
          organization: org,
          logo: company.logo,
          visible: true,
          roles: (company.positions ?? []).map((position): TimelineRole => {
            const employment =
              position.employment && position.employment !== "full-time"
                ? position.employment
                : undefined;
            return {
              id:
                position.id ??
                slugify(org, position.title ?? "role", position.period ?? ""),
              title: position.title ?? "Role",
              period: position.period ?? "",
              duration: position.duration,
              current: position.current,
              bullets: position.bullets ?? [],
              tools: position.tools ?? [],
              visible: position.visible !== false,
            };
          }),
        };
      });
      const section: TimelineResumeSection = {
        id: "experience",
        title: "Experience",
        layout: "timeline",
        visible,
        region: "main",
        entries,
      };
      sections.push(section);
      continue;
    }

    if (key === "education") {
      const section: TimelineResumeSection = {
        id: "education",
        title: "Education",
        layout: "timeline",
        visible,
        region: "sidebar",
        entries: (raw.education ?? []).map((entry) => ({
          id: entry.id ?? slugify(entry.institution ?? "", entry.program ?? ""),
          organization: entry.institution ?? "",
          visible: entry.visible !== false,
          roles: [
            {
              id: slugify(entry.institution ?? "", entry.program ?? "", "role"),
              title: entry.program ?? "",
              period: entry.period ?? "",
              bullets: [],
              tools: [],
              visible: true,
            },
          ],
        })),
      };
      sections.push(section);
      continue;
    }

    if (key === "certifications") {
      const section: ListResumeSection = {
        id: "certifications",
        title: "Certifications",
        layout: "list",
        visible,
        region: "sidebar",
        entries: (raw.certifications ?? []).map((entry) => ({
          id: entry.id ?? slugify(entry.title ?? "", entry.issuer ?? ""),
          title: entry.title ?? "",
          subtitle: entry.issuer,
          meta: entry.date,
          href: entry.href,
          visible: entry.visible !== false,
        })),
      };
      sections.push(section);
      continue;
    }

    if (key === "skills") {
      const section: TagsResumeSection = {
        id: "skills",
        title: "Skills",
        layout: "tags",
        visible,
        region: "sidebar",
        entries: (raw.skills ?? []).map((skill) => ({
          id: skill.id ?? slugify(skill.category ?? "", skill.name ?? ""),
          label: skill.name ?? "",
          group: skill.category,
          level: typeof skill.level === "string" ? skill.level : undefined,
          visible: true,
        })),
      };
      sections.push(section);
    }
  }

  return {
    version: RESUME_DRAFT_VERSION,
    updatedAt: new Date().toISOString(),
    skeletonId: preset.skeletonId,
    templatePresetId: preset.id,
    theme: { ...preset.theme },
    profile,
    sections,
  };
}

export function migrateResumeDraft(
  raw: unknown,
  fromVersion: number,
): ResumeDraft {
  if (fromVersion === 1 && raw && typeof raw === "object") {
    return migrateV1(raw as V1ResumeDraft);
  }

  // v2 → v3: ensure layoutStyle exists from the selected preset
  if (fromVersion === 2 && raw && typeof raw === "object") {
    const draft = raw as ResumeDraft;
    const preset = getTemplatePreset(draft.templatePresetId ?? "classic-ink");
    return {
      ...draft,
      version: RESUME_DRAFT_VERSION,
      skeletonId: draft.skeletonId ?? preset.skeletonId,
      templatePresetId: draft.templatePresetId ?? preset.id,
      theme: {
        ...preset.theme,
        ...draft.theme,
        layoutStyle: draft.theme?.layoutStyle ?? preset.theme.layoutStyle,
      },
      updatedAt: new Date().toISOString(),
    };
  }

  console.warn(
    `cv-lab: unrecognized resume draft version ${fromVersion}, resetting to defaults`,
  );
  return buildDefaultResumeDraft();
}

export function normalizeImportedResumeDraft(raw: unknown): ResumeDraft {
  if (!raw || typeof raw !== "object") throw new Error("Invalid resume draft");
  const parsed = raw as {
    version?: number;
    profile?: unknown;
    sections?: unknown;
    sectionOrder?: unknown;
    templatePresetId?: ResumeDraft["templatePresetId"];
  };
  const version = typeof parsed.version === "number" ? parsed.version : 0;

  if (
    version === RESUME_DRAFT_VERSION &&
    parsed.profile &&
    Array.isArray(parsed.sections)
  ) {
    const draft = parsed as ResumeDraft;
    if (!draft.theme?.layoutStyle) {
      const preset = getTemplatePreset(draft.templatePresetId ?? "classic-ink");
      return {
        ...draft,
        theme: {
          ...preset.theme,
          ...draft.theme,
          layoutStyle: preset.theme.layoutStyle,
        },
      };
    }
    return draft;
  }

  if (version === 2) return migrateResumeDraft(parsed, 2);
  if (version === 1 || parsed.sectionOrder)
    return migrateResumeDraft(parsed, 1);

  throw new Error("Invalid resume draft");
}
