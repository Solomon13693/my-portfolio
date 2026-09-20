"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import Button from "@/components/ui/button";
import { useAiAction, useAiSettings, useResumeDraft } from "@/hooks";
import type { AiActionId } from "@/types";
import { cn } from "@/lib";

export function AiImproveButton({
  action,
  payload,
  onResult,
  label = "AI",
  iconOnly = false,
  disabled = false,
  className,
  includeDraft = false,
}: {
  action: AiActionId;
  payload: Record<string, unknown>;
  onResult: (text: string) => void;
  label?: string;
  iconOnly?: boolean;
  disabled?: boolean;
  className?: string;
  includeDraft?: boolean;
}) {
  const { draft } = useResumeDraft();
  const { settings } = useAiSettings();
  const { run, status, error, configured } = useAiAction();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleClick = async () => {
    setLocalError(null);
    try {
      const text = await run(action, payload, {
        providerId: settings.providerId,
        model: settings.model,
        draft:
          includeDraft || action === "generate-summary" ? draft : undefined,
      });
      if (text.trim()) onResult(text.trim());
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "AI request failed");
    }
  };

  const isDisabled = disabled || !configured || status === "loading";

  return (
    <div className={cn("inline-flex flex-col items-start gap-1", className)}>
      <Button
        size="sm"
        variant="light"
        className="rounded-none"
        isDisabled={isDisabled}
        loading={status === "loading"}
        onClick={handleClick}
        startContent={<Sparkles className="size-3.5" />}
        aria-label={label}
      >
        {iconOnly ? null : label}
      </Button>
      {(localError || error) && (
        <span className="max-w-[16rem] text-[10px] text-red-500">
          {localError || error}
        </span>
      )}
      {!configured && !iconOnly && (
        <span className="text-[10px] text-muted-foreground">
          Add an AI API key to enable
        </span>
      )}
    </div>
  );
}

export default AiImproveButton;
