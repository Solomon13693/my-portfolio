"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import Button from "@/components/ui/button";
import { useResumeDraft } from "@/hooks";
import { downloadBlob, ensurePdfFontsRegistered } from "@/lib";

export function ExportResumePdfButton() {
  const { draft } = useResumeDraft();
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      await ensurePdfFontsRegistered(draft.theme);
      const [{ pdf }, { ResumeDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/views/cv-lab/pdf/ResumeDocument"),
      ]);

      const blob = await pdf(<ResumeDocument draft={draft} />).toBlob();
      downloadBlob(
        blob,
        `${draft.profile.name.replace(/\s+/g, "-").toLowerCase() || "resume"}.pdf`,
      );
    } catch (error) {
      console.error("Failed to export resume PDF", error);
      window.alert(
        "Something went wrong exporting the PDF. Check the console for details.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      className="rounded-none"
      loading={loading}
      onClick={handleExport}
      startContent={<Download className="size-3.5" aria-hidden="true" />}
    >
      Export PDF
    </Button>
  );
}

export default ExportResumePdfButton;
