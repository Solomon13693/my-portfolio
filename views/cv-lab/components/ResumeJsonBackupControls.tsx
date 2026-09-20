"use client";

import { useResumeDraft } from "@/hooks";
import { normalizeImportedResumeDraft, RESUME_DRAFT_VERSION } from "@/lib";
import { JsonBackupControls } from "./JsonBackupControls";

/** Resume-specific wrapper around the shared JSON backup control. */
export function ResumeJsonBackupControls() {
  const { draft, updateDraft } = useResumeDraft();
  const filename = `${draft.profile.name.replace(/\s+/g, "-").toLowerCase() || "resume"}-draft.json`;

  return (
    <JsonBackupControls
      value={draft}
      filename={filename}
      onImport={(parsed) => {
        try {
          const normalized = normalizeImportedResumeDraft(parsed);
          updateDraft(() => ({ ...normalized, version: RESUME_DRAFT_VERSION }));
        } catch {
          window.alert(
            "That file doesn't look like a valid resume draft export.",
          );
        }
      }}
    />
  );
}

export default ResumeJsonBackupControls;
