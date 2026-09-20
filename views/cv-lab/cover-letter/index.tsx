"use client";

import { useState } from "react";
import { useCoverLetters, useResumeDraft } from "@/hooks";
import { applyPlaceholders, cn } from "@/lib";
import {
  CV_TEMPLATE_PRESETS,
  COVER_LETTER_PRESET_IDS,
  getTemplatePreset,
} from "@/data";
import type {
  CoverLetterPlaceholderValues,
  CoverLetterPresetId,
  SavedCoverLetter,
} from "@/types";
import { Input, TextArea, Select } from "@/components/ui/form";
import {
  TemplateEditor,
  PlaceholderForm,
  CoverLetterPreview,
  SavedLettersList,
  ResumeReferencePanel,
  ExportCoverLetterPdfButton,
  CoverLetterJsonBackupControls,
} from "./components";

const EMPTY_PLACEHOLDERS: CoverLetterPlaceholderValues = {
  company: "",
  role: "",
  hiringManager: "",
  jobPostingUrl: "",
};

type LabTab = "content" | "customize";

export function CoverLetterView() {
  const { draft } = useResumeDraft();
  const { state, saveLetter, updateState } = useCoverLetters();
  const [tab, setTab] = useState<LabTab>("content");

  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [label, setLabel] = useState("");
  const [placeholders, setPlaceholders] =
    useState<CoverLetterPlaceholderValues>(EMPTY_PLACEHOLDERS);
  const [jobDescription, setJobDescription] = useState("");
  const [body, setBody] = useState(() =>
    applyPlaceholders(state.template.body, {
      ...EMPTY_PLACEHOLDERS,
      senderName: draft.profile.name,
    }),
  );

  const applyToLetter = () => {
    setBody(
      applyPlaceholders(state.template.body, {
        ...placeholders,
        senderName: draft.profile.name,
      }),
    );
  };

  const handleSave = () => {
    saveLetter({
      id: editingId,
      label:
        label ||
        [placeholders.company, placeholders.role].filter(Boolean).join(" / ") ||
        "Untitled letter",
      placeholders,
      body,
    });
  };

  const loadLetter = (letter: SavedCoverLetter) => {
    setEditingId(letter.id);
    setLabel(letter.label);
    setPlaceholders(letter.placeholders);
    setBody(letter.body);
  };

  const duplicateLetter = (letter: SavedCoverLetter) => {
    setEditingId(undefined);
    setLabel(`${letter.label} (copy)`);
    setPlaceholders(letter.placeholders);
    setBody(letter.body);
  };

  const startNewLetter = () => {
    setEditingId(undefined);
    setLabel("");
    setPlaceholders(EMPTY_PLACEHOLDERS);
    setJobDescription("");
    setBody(
      applyPlaceholders(state.template.body, {
        ...EMPTY_PLACEHOLDERS,
        senderName: draft.profile.name,
      }),
    );
  };

  const applyCoverPreset = (id: CoverLetterPresetId) => {
    const preset = getTemplatePreset(id);
    updateState((prev) => ({
      ...prev,
      presetId: id,
      theme: { ...preset.theme },
      matchResumeTheme: false,
    }));
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mt-4 flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
        <div className="flex gap-5">
          {(
            [
              ["content", "Content"],
              ["customize", "Customize"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "cursor-pointer border-b-2 pb-3 -mb-3 font-mono text-xs tracking-wider uppercase transition-colors",
                tab === id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 pb-1">
          <CoverLetterJsonBackupControls />
        </div>
      </div>

      <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 gap-6 overflow-y-auto lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:overflow-hidden xl:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] 2xl:gap-8">
        <div className="min-h-0 space-y-6 overflow-y-auto overscroll-contain pr-2 pb-4 [scrollbar-gutter:stable]">
          {tab === "content" ? (
            <>
              <p className="text-sm text-muted-foreground">
                Letters stay in this browser. Use{" "}
                <span className="text-foreground">Download JSON</span> to keep a
                copy, then <span className="text-foreground">Load JSON</span>{" "}
                later to continue editing.
              </p>
              <PlaceholderForm
                values={placeholders}
                onChange={setPlaceholders}
                onApply={applyToLetter}
              />
              <div>
                <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                  Job description
                </p>
                <TextArea
                  name="job-description"
                  radius="none"
                  className="mt-2 min-h-28"
                  formGroupClass="mb-0"
                  fullWidth
                  placeholder="Paste the job posting for AI Draft…"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <TemplateEditor />
              <ResumeReferencePanel />
              <div>
                <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                  Saved letters
                </p>
                <div className="mt-3">
                  <SavedLettersList
                    onLoad={loadLetter}
                    onDuplicate={duplicateLetter}
                    activeId={editingId}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={state.matchResumeTheme}
                  onChange={(e) =>
                    updateState((prev) => ({
                      ...prev,
                      matchResumeTheme: e.target.checked,
                    }))
                  }
                />
                Match resume theme
              </label>

              <div>
                <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                  Cover letter templates
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {COVER_LETTER_PRESET_IDS.map((id) => {
                    const preset = CV_TEMPLATE_PRESETS.find((p) => p.id === id);
                    if (!preset) return null;
                    const selected =
                      state.presetId === id && !state.matchResumeTheme;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => applyCoverPreset(id)}
                        className={cn(
                          "border p-3 text-left cursor-pointer",
                          selected
                            ? "border-foreground"
                            : "border-line hover:border-foreground/40",
                        )}
                      >
                        <div
                          className="mb-2 h-8"
                          style={{ background: preset.swatch.accent }}
                        />
                        <p className="text-sm font-medium">{preset.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {!state.matchResumeTheme ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Select
                    label="Heading font"
                    name="cl-heading-font"
                    radius="none"
                    value={state.theme.headingFontId}
                    onChange={(e) =>
                      updateState((prev) => ({
                        ...prev,
                        theme: {
                          ...prev.theme,
                          headingFontId: e.target
                            .value as typeof prev.theme.headingFontId,
                        },
                      }))
                    }
                  >
                    <option value="helvetica">Helvetica</option>
                    <option value="inter">Inter</option>
                    <option value="merriweather">Merriweather</option>
                    <option value="georgia">Georgia</option>
                  </Select>
                  <Input
                    label="Accent color"
                    name="cl-accent"
                    radius="none"
                    value={state.theme.accentColor}
                    onChange={(e) =>
                      updateState((prev) => ({
                        ...prev,
                        theme: { ...prev.theme, accentColor: e.target.value },
                      }))
                    }
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div className="min-h-0 min-w-0 overflow-y-auto overscroll-contain pb-4 [scrollbar-gutter:stable]">
          <CoverLetterPreview
            body={body}
            onChange={setBody}
            onSave={handleSave}
            label={label}
            onLabelChange={setLabel}
            placeholders={placeholders}
            jobDescription={jobDescription}
          />
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={startNewLetter}
              className="font-mono text-xs tracking-wider text-muted-foreground uppercase underline underline-offset-4 hover:text-foreground cursor-pointer"
            >
              Start new letter
            </button>
            <ExportCoverLetterPdfButton
              body={body}
              placeholders={placeholders}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoverLetterView;
