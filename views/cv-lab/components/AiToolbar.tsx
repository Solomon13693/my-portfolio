"use client";

import { useState } from "react";
import { Languages } from "lucide-react";
import Button from "@/components/ui/button";
import { Input, Select, TextArea } from "@/components/ui/form";
import { useAiAction, useAiSettings, useResumeDraft } from "@/hooks";
import type { AiProviderId, TextResumeSection } from "@/types";

export function AiSettingsMenu() {
  const { settings, updateSettings } = useAiSettings();
  const [showKey, setShowKey] = useState(false);
  const keyLabel =
    settings.providerId === "openai" ? "OpenAI API key" : "Anthropic API key";
  const keyHint =
    settings.providerId === "openai"
      ? "Get a key at platform.openai.com"
      : "Get a key at console.anthropic.com";

  return (
    <div className="space-y-3 border border-line p-3">
      <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
        AI provider
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Select
          name="provider"
          radius="none"
          formGroupClass="mb-0"
          inputSize="sm"
          value={settings.providerId}
          onChange={(e) => {
            const providerId = e.target.value as AiProviderId;
            updateSettings({
              providerId,
              model:
                providerId === "openai" ? "gpt-4.1-mini" : "claude-sonnet-4-5",
            });
          }}
        >
          <option value="anthropic">Anthropic</option>
          <option value="openai">OpenAI</option>
        </Select>
        <Input
          name="model"
          radius="none"
          inputSize="sm"
          formGroupClass="mb-0 w-44"
          value={settings.model}
          onChange={(e) => updateSettings({ model: e.target.value })}
          placeholder="Model id"
        />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between gap-2">
          <label
            htmlFor="cv-lab-api-key"
            className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase"
          >
            {keyLabel}
          </label>
          <button
            type="button"
            className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase underline underline-offset-2 hover:text-foreground cursor-pointer"
            onClick={() => setShowKey((v) => !v)}
          >
            {showKey ? "Hide" : "Show"}
          </button>
        </div>
        <Input
          id="cv-lab-api-key"
          name="api-key"
          type={showKey ? "text" : "password"}
          autoComplete="off"
          radius="none"
          inputSize="sm"
          formGroupClass="mb-0"
          fullWidth
          value={settings.apiKey ?? ""}
          onChange={(e) => updateSettings({ apiKey: e.target.value })}
          placeholder="sk-…"
        />
        <p className="mt-1.5 text-[11px] text-muted-foreground">
          Stored only in this browser. {keyHint}. Required for Generate,
          Improve, Translate, and AI Draft.
        </p>
      </div>
    </div>
  );
}

export function TranslateResumeButton() {
  const { draft, updateDraft } = useResumeDraft();
  const { settings } = useAiSettings();
  const { run, status, configured } = useAiAction();
  const [language, setLanguage] = useState("French");
  const [preview, setPreview] = useState<string | null>(null);

  const handleTranslate = async () => {
    const summary = draft.sections.find(
      (s): s is TextResumeSection => s.layout === "text",
    );
    const text = JSON.stringify(
      {
        summary: summary?.content,
        experience: draft.sections
          .filter((s) => s.layout === "timeline")
          .flatMap((s) => (s.layout === "timeline" ? s.entries : [])),
      },
      null,
      2,
    );
    setPreview("");
    const result = await run(
      "translate",
      { text, targetLanguage: language },
      {
        providerId: settings.providerId,
        model: settings.model,
        onChunk: (chunk) => setPreview((prev) => (prev ?? "") + chunk),
      },
    );
    setPreview(result);
  };

  const applyPreview = () => {
    if (!preview) return;
    try {
      const parsed = JSON.parse(preview) as { summary?: string };
      if (parsed.summary) {
        updateDraft((prev) => ({
          ...prev,
          sections: prev.sections.map((s) =>
            s.layout === "text" && s.id === "summary"
              ? { ...s, content: parsed.summary! }
              : s,
          ),
        }));
      }
    } catch {
      const summarySection = draft.sections.find((s) => s.layout === "text");
      if (summarySection && summarySection.layout === "text") {
        updateDraft((prev) => ({
          ...prev,
          sections: prev.sections.map((s) =>
            s.id === summarySection.id && s.layout === "text"
              ? { ...s, content: preview }
              : s,
          ),
        }));
      }
    }
    setPreview(null);
  };

  return (
    <div className="space-y-2 border border-line p-3">
      <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
        Translate
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Input
          name="lang"
          radius="none"
          formGroupClass="mb-0 w-36"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        <Button
          size="sm"
          variant="bordered"
          className="rounded-none"
          isDisabled={!configured || status === "loading"}
          loading={status === "loading"}
          onClick={handleTranslate}
          startContent={<Languages className="size-3.5" />}
        >
          Translate
        </Button>
      </div>
      {!configured ? (
        <p className="text-[11px] text-muted-foreground">
          Add your API key above to translate.
        </p>
      ) : null}
      {preview ? (
        <div className="space-y-2">
          <TextArea
            name="translate-preview"
            radius="none"
            className="min-h-32"
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
          />
          <div className="flex gap-2">
            <Button size="sm" className="rounded-none" onClick={applyPreview}>
              Apply
            </Button>
            <Button
              size="sm"
              variant="light"
              className="rounded-none"
              onClick={() => setPreview(null)}
            >
              Discard
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AiSettingsMenu;
