"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useResumeDraft } from "@/hooks";
import { cn } from "@/lib";
import { TextSectionEditor } from "./TextSectionEditor";
import { TimelineSectionEditor } from "./TimelineSectionEditor";
import { ListSectionEditor } from "./ListSectionEditor";
import { TagsSectionEditor } from "./TagsSectionEditor";
import type { ResumeSection } from "@/types";

function AccordionSection({
  section,
  open,
  onToggle,
  children,
}: {
  section: ResumeSection;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-line bg-background">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left hover:bg-muted/40"
      >
        <span className="font-medium">{section.title}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? (
        <div className="border-t border-line px-4 py-4">{children}</div>
      ) : null}
    </div>
  );
}

export function SectionsEditor() {
  const { draft, updateDraft } = useResumeDraft();
  const visible = draft.sections.filter((s) => s.visible);
  const [openId, setOpenId] = useState<string | null>(visible[0]?.id ?? null);

  const updateSection = (section: ResumeSection) => {
    updateDraft((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === section.id ? section : s)),
    }));
  };

  return (
    <div className="space-y-2">
      {visible.map((section) => {
        const open = openId === section.id;
        let body: React.ReactNode = null;
        if (section.layout === "text")
          body = (
            <TextSectionEditor section={section} onChange={updateSection} />
          );
        else if (section.layout === "timeline")
          body = (
            <TimelineSectionEditor section={section} onChange={updateSection} />
          );
        else if (section.layout === "list")
          body = (
            <ListSectionEditor section={section} onChange={updateSection} />
          );
        else
          body = (
            <TagsSectionEditor section={section} onChange={updateSection} />
          );

        return (
          <AccordionSection
            key={section.id}
            section={section}
            open={open}
            onToggle={() => setOpenId(open ? null : section.id)}
          >
            {body}
          </AccordionSection>
        );
      })}
    </div>
  );
}

export default SectionsEditor;
