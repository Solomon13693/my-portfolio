"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/form";
import Button from "@/components/ui/button";
import { useResumeDraft } from "@/hooks";
import type { TagEntry, TagsResumeSection } from "@/types";
import { newId } from "./templates/shared";
import { AiImproveButton } from "./AiImproveButton";

export function TagsSectionEditor({
  section,
  onChange,
}: {
  section: TagsResumeSection;
  onChange: (section: TagsResumeSection) => void;
}) {
  const { draft } = useResumeDraft();
  const [label, setLabel] = useState("");
  const [group, setGroup] = useState("");

  const setEntries = (entries: TagEntry[]) => onChange({ ...section, entries });

  const addTag = () => {
    const trimmed = label.trim();
    if (!trimmed) return;
    setEntries([
      ...section.entries,
      {
        id: newId("tag"),
        label: trimmed,
        group: group.trim() || undefined,
        visible: true,
      },
    ]);
    setLabel("");
  };

  const experienceContext = draft.sections
    .filter((s) => s.layout === "timeline")
    .flatMap((s) => (s.layout === "timeline" ? s.entries : []))
    .map(
      (e) =>
        `${e.organization}: ${e.roles.map((r) => `${r.title} / ${r.bullets.join("; ")}`).join(" | ")}`,
    )
    .join("\n");

  const groups = Array.from(
    new Set(section.entries.map((e) => e.group).filter(Boolean)),
  ) as string[];

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          {section.title}
        </p>
        <AiImproveButton
          action="improve"
          label="Suggest from experience"
          disabled={!experienceContext.trim()}
          payload={{
            text: `Experience:\n${experienceContext || "(none yet)"}\n\nSuggest 8–12 relevant skill names as a comma-separated list. Return ONLY the list.`,
            context: "skills",
          }}
          onResult={(text) => {
            const names = text
              .split(/[,\n]/)
              .map((s) => s.trim())
              .filter(Boolean);
            if (!names.length) return;
            setEntries([
              ...section.entries,
              ...names.map((name) => ({
                id: newId("tag"),
                label: name,
                group: "Suggested",
                visible: true,
              })),
            ]);
          }}
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {section.entries.map((entry) => (
          <span
            key={entry.id}
            className={`inline-flex items-center gap-1 border px-2 py-1 text-xs ${entry.visible ? "border-line" : "border-line opacity-40"}`}
          >
            {entry.label}
            {entry.group ? (
              <span className="text-muted-foreground">· {entry.group}</span>
            ) : null}
            <button
              type="button"
              onClick={() =>
                setEntries(
                  section.entries.map((e) =>
                    e.id === entry.id ? { ...e, visible: !e.visible } : e,
                  ),
                )
              }
              className="cursor-pointer text-muted-foreground hover:text-foreground"
              aria-label="Toggle visibility"
            >
              ·
            </button>
            <button
              type="button"
              onClick={() =>
                setEntries(section.entries.filter((e) => e.id !== entry.id))
              }
              className="cursor-pointer text-muted-foreground hover:text-foreground"
              aria-label={`Remove ${entry.label}`}
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <Input
          name="tag-label"
          radius="none"
          placeholder="Skill / tag"
          formGroupClass="mb-0"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
        />
        <Input
          name="tag-group"
          radius="none"
          placeholder="Group (optional)"
          formGroupClass="mb-0"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          list="tag-groups"
        />
        <datalist id="tag-groups">
          {groups.map((g) => (
            <option key={g} value={g} />
          ))}
        </datalist>
        <Button
          size="sm"
          variant="bordered"
          className="rounded-none"
          onClick={addTag}
        >
          Add tag
        </Button>
      </div>
    </div>
  );
}

export default TagsSectionEditor;
