"use client";

import { Reorder, useDragControls } from "framer-motion";
import { Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { DragHandle } from "@/components/reusable";
import { Input, Select } from "@/components/ui/form";
import Button from "@/components/ui/button";
import { useResumeDraft } from "@/hooks";
import { cn } from "@/lib";
import { newId } from "./templates/shared";
import type { ResumeSection, SectionLayout, SectionRegion } from "@/types";

const SECTION_PRESETS: {
  label: string;
  title: string;
  layout: SectionLayout;
  region: SectionRegion;
}[] = [
  {
    label: "Experience",
    title: "Experience",
    layout: "timeline",
    region: "main",
  },
  {
    label: "Education",
    title: "Education",
    layout: "timeline",
    region: "sidebar",
  },
  { label: "Skills", title: "Skills", layout: "tags", region: "sidebar" },
  {
    label: "Certifications",
    title: "Certifications",
    layout: "list",
    region: "sidebar",
  },
  { label: "Summary", title: "Summary", layout: "text", region: "main" },
  {
    label: "Publications",
    title: "Publications",
    layout: "list",
    region: "main",
  },
  { label: "Languages", title: "Languages", layout: "tags", region: "sidebar" },
  { label: "Awards", title: "Awards", layout: "list", region: "sidebar" },
  {
    label: "Volunteer",
    title: "Volunteer Work",
    layout: "timeline",
    region: "main",
  },
  {
    label: "References",
    title: "References",
    layout: "list",
    region: "sidebar",
  },
  { label: "Custom text", title: "Custom", layout: "text", region: "main" },
];

function createSection(
  preset: (typeof SECTION_PRESETS)[number],
): ResumeSection {
  const base = {
    id: newId("section"),
    title: preset.title,
    visible: true,
    region: preset.region,
  };
  if (preset.layout === "text") return { ...base, layout: "text", content: "" };
  if (preset.layout === "timeline")
    return { ...base, layout: "timeline", entries: [] };
  if (preset.layout === "list") return { ...base, layout: "list", entries: [] };
  return { ...base, layout: "tags", entries: [] };
}

function SectionRow({
  section,
  onChange,
  onRemove,
  hasSidebar,
}: {
  section: ResumeSection;
  onChange: (section: ResumeSection) => void;
  onRemove: () => void;
  hasSidebar: boolean;
}) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={section}
      dragListener={false}
      dragControls={dragControls}
      className={cn(
        "border border-line bg-background",
        !section.visible && "opacity-50",
      )}
    >
      <div className="flex items-start gap-2 p-3">
        <DragHandle
          onPointerDown={(e) => dragControls.start(e)}
          className="mt-2.5"
        />
        <div className="min-w-0 flex-1 space-y-2">
          <Input
            name="section-title"
            radius="none"
            formGroupClass="mb-0"
            fullWidth
            value={section.title}
            onChange={(e) => onChange({ ...section, title: e.target.value })}
          />
          <div className="flex flex-wrap items-center gap-2">
            {hasSidebar ? (
              <Select
                name="region"
                radius="none"
                formGroupClass="mb-0 w-32"
                value={section.region}
                onChange={(e) =>
                  onChange({
                    ...section,
                    region: e.target.value as SectionRegion,
                  })
                }
              >
                <option value="main">Main</option>
                <option value="sidebar">Sidebar</option>
              </Select>
            ) : (
              <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                {section.region === "sidebar"
                  ? "Sidebar → shown in column"
                  : "Main"}
              </span>
            )}
            <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              {section.layout}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1 pt-1">
          <button
            type="button"
            onClick={() => onChange({ ...section, visible: !section.visible })}
            className="cursor-pointer p-1.5 text-muted-foreground hover:text-foreground"
            aria-label={section.visible ? "Hide section" : "Show section"}
          >
            {section.visible ? (
              <Eye className="size-4" />
            ) : (
              <EyeOff className="size-4" />
            )}
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="cursor-pointer p-1.5 text-muted-foreground hover:text-foreground"
            aria-label="Remove section"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
    </Reorder.Item>
  );
}

export function SectionsManager() {
  const { draft, updateDraft } = useResumeDraft();
  const setSections = (sections: ResumeSection[]) =>
    updateDraft((prev) => ({ ...prev, sections }));
  const hasSidebar =
    draft.skeletonId === "sidebar-left" || draft.skeletonId === "sidebar-right";

  return (
    <div>
      <p className="text-xs text-muted-foreground">
        Drag to reorder.{" "}
        {hasSidebar
          ? "Place sections in Main or Sidebar."
          : "Using a single-column template / all sections appear in order."}
      </p>

      <Reorder.Group
        axis="y"
        values={draft.sections}
        onReorder={setSections}
        className="mt-3 space-y-2"
      >
        {draft.sections.map((section) => (
          <SectionRow
            key={section.id}
            section={section}
            hasSidebar={hasSidebar}
            onChange={(next) =>
              setSections(
                draft.sections.map((s) => (s.id === section.id ? next : s)),
              )
            }
            onRemove={() =>
              setSections(draft.sections.filter((s) => s.id !== section.id))
            }
          />
        ))}
      </Reorder.Group>

      <p className="mt-4 font-mono text-xs tracking-wider text-muted-foreground uppercase">
        Add section
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {SECTION_PRESETS.map((preset) => (
          <Button
            key={preset.label}
            size="sm"
            variant="bordered"
            className="justify-start rounded-none"
            onClick={() =>
              setSections([...draft.sections, createSection(preset)])
            }
            startContent={<Plus className="size-3.5" />}
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default SectionsManager;
