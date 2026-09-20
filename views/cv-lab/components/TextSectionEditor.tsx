"use client";

import { TextArea } from "@/components/ui/form";
import type { TextResumeSection } from "@/types";
import { AiImproveButton } from "./AiImproveButton";

export function TextSectionEditor({
  section,
  onChange,
}: {
  section: TextResumeSection;
  onChange: (section: TextResumeSection) => void;
}) {
  return (
    <div className="border border-line p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          {section.title}
        </p>
        {section.id === "summary" ? (
          <AiImproveButton
            action="generate-summary"
            label="Generate"
            payload={{}}
            includeDraft
            onResult={(text) => onChange({ ...section, content: text })}
          />
        ) : null}
      </div>
      <TextArea
        name={`${section.id}-content`}
        radius="none"
        className="mt-2 min-h-28"
        formGroupClass="mb-0"
        fullWidth
        value={section.content}
        onChange={(e) => onChange({ ...section, content: e.target.value })}
      />
      <div className="mt-2">
        <AiImproveButton
          action="improve"
          label="Improve writing"
          payload={{ text: section.content, context: section.title }}
          onResult={(text) => onChange({ ...section, content: text })}
          disabled={!section.content.trim()}
        />
      </div>
    </div>
  );
}

export default TextSectionEditor;
