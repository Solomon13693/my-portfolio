"use client";

import { useEffect, useRef, useState } from "react";
import { useResumeDraft } from "@/hooks";

export function DraftStatus() {
  const { draft } = useResumeDraft();
  const [status, setStatus] = useState<"saving" | "saved">("saved");
  const prevUpdatedAt = useRef(draft.updatedAt);

  useEffect(() => {
    if (prevUpdatedAt.current === draft.updatedAt) return;
    prevUpdatedAt.current = draft.updatedAt;
    setStatus("saving");
    const timer = setTimeout(() => setStatus("saved"), 700);
    return () => clearTimeout(timer);
  }, [draft.updatedAt]);

  return (
    <span
      className="font-mono text-xs tracking-wider text-muted-foreground uppercase"
      title="Draft is kept in this browser. Download JSON to continue on another device."
    >
      {status === "saving" ? "Saving…" : "Saved locally"}
    </span>
  );
}

export default DraftStatus;
