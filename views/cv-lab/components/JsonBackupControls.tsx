"use client";

import { useRef, type ChangeEvent, type ReactNode } from "react";
import { Download, Upload } from "lucide-react";
import Button from "@/components/ui/button";
import { downloadJson } from "@/lib";

interface JsonBackupControlsProps<T> {
  value: T;
  filename: string;
  onImport: (parsed: unknown) => void;
  exportTitle?: string;
  importTitle?: string;
  exportLabel?: string;
  importLabel?: string;
  /** Optional trailing content (e.g. Export PDF). */
  endContent?: ReactNode;
}

export function JsonBackupControls<T>({
  value,
  filename,
  onImport,
  exportTitle = "Download JSON so you can keep editing later",
  importTitle = "Load a previously downloaded JSON to continue editing",
  exportLabel = "Download JSON",
  importLabel = "Load JSON",
  endContent,
}: JsonBackupControlsProps<T>) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => downloadJson(value, filename);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    try {
      const text = await file.text();
      onImport(JSON.parse(text));
    } catch {
      window.alert("That file doesn't look like a valid JSON backup.");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        size="sm"
        variant="bordered"
        className="rounded-none"
        onClick={handleExport}
        startContent={<Download className="size-3.5" aria-hidden="true" />}
        title={exportTitle}
      >
        {exportLabel}
      </Button>
      <Button
        size="sm"
        variant="bordered"
        className="rounded-none"
        onClick={() => fileInputRef.current?.click()}
        startContent={<Upload className="size-3.5" aria-hidden="true" />}
        title={importTitle}
      >
        {importLabel}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={handleFileChange}
      />
      {endContent}
    </div>
  );
}

export default JsonBackupControls;
