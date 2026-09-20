"use client";

import { FEATURED_TEMPLATE_PRESETS, CV_TEMPLATE_PRESETS } from "@/data";
import { cn } from "@/lib";
import { useResumeDraft } from "@/hooks";
import type { ResumeTemplatePresetId } from "@/types";

export function TemplateGallery() {
  const { draft, updateDraft } = useResumeDraft();

  const applyPreset = (id: ResumeTemplatePresetId) => {
    const preset = CV_TEMPLATE_PRESETS.find((p) => p.id === id);
    if (!preset) return;
    updateDraft((prev) => ({
      ...prev,
      templatePresetId: preset.id,
      skeletonId: preset.skeletonId,
      theme: { ...preset.theme },
    }));
  };

  return (
    <div>
      <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
        Templates
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Two polished looks for now / tweak fonts & colors below.
      </p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {FEATURED_TEMPLATE_PRESETS.map((preset) => {
          const selected = draft.templatePresetId === preset.id;
          const isSidebar = preset.skeletonId.startsWith("sidebar");
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.id)}
              className={cn(
                "flex flex-col gap-2 border p-3 text-left transition-colors cursor-pointer",
                selected
                  ? "border-foreground"
                  : "border-line hover:border-foreground/40",
              )}
            >
              <div className="flex h-20 overflow-hidden border border-black/5 bg-white">
                {isSidebar ? (
                  <>
                    <div
                      className="w-[28%] shrink-0 p-2"
                      style={{ background: preset.swatch.accent }}
                    >
                      <div
                        className="mb-1.5 h-1.5 w-full"
                        style={{ background: preset.swatch.text }}
                      />
                      <div className="space-y-1">
                        <div className="h-1 w-full bg-black/15" />
                        <div className="h-1 w-4/5 bg-black/10" />
                        <div className="h-1 w-full bg-black/10" />
                      </div>
                    </div>
                    <div
                      className="flex flex-1 flex-col gap-1.5 p-2.5"
                      style={{ background: preset.swatch.bg }}
                    >
                      <div
                        className="h-2 w-1/2"
                        style={{ background: preset.swatch.text }}
                      />
                      <div
                        className="h-1.5 w-full rounded-sm"
                        style={{ background: preset.swatch.accent }}
                      />
                      <div className="h-1 w-full bg-neutral-300" />
                      <div className="h-1 w-5/6 bg-neutral-300" />
                      <div className="h-1 w-full bg-neutral-300" />
                    </div>
                  </>
                ) : (
                  <div
                    className="flex w-full flex-col items-center gap-1.5 p-2.5"
                    style={{ background: preset.swatch.bg }}
                  >
                    <div
                      className="h-2.5 w-2/3"
                      style={{ background: preset.swatch.text }}
                    />
                    <div className="h-1 w-1/2 bg-neutral-400" />
                    <div
                      className="mt-1 h-2 w-full rounded-sm"
                      style={{ background: preset.swatch.accent }}
                    />
                    <div className="h-1 w-full bg-neutral-300" />
                    <div className="h-1 w-5/6 bg-neutral-300" />
                    <div
                      className="mt-1 h-2 w-full rounded-sm"
                      style={{ background: preset.swatch.accent }}
                    />
                    <div className="h-1 w-full bg-neutral-300" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{preset.label}</p>
                <p className="text-[11px] text-muted-foreground">
                  {preset.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TemplateGallery;
