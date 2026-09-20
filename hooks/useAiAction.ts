"use client";

import { useCallback, useState } from "react";
import { useAiSettings } from "@/hooks/useAiSettings";
import type { AiActionId, AiProviderId } from "@/types";

type Status = "idle" | "loading" | "error";

export function useAiAction() {
  const { settings } = useAiSettings();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const configured = Boolean(settings.apiKey?.trim());

  const run = useCallback(
    async (
      action: AiActionId,
      payload: Record<string, unknown>,
      opts?: {
        providerId?: AiProviderId;
        model?: string;
        onChunk?: (chunk: string) => void;
        draft?: unknown;
      },
    ): Promise<string> => {
      const apiKey = settings.apiKey?.trim() ?? "";
      if (!apiKey) {
        setStatus("error");
        setError("Add your API key in AI Tools");
        throw new Error("Add your API key in AI Tools");
      }

      setStatus("loading");
      setError(null);

      const res = await fetch("/api/cv-lab/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          providerId: opts?.providerId ?? settings.providerId,
          model: opts?.model ?? settings.model,
          apiKey,
          payload,
          draft: opts?.draft,
        }),
      });

      if (res.status === 400) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
          code?: string;
        };
        setStatus("error");
        setError(data.error ?? "AI request failed");
        throw new Error(data.error ?? "AI request failed");
      }

      if (res.status === 401) {
        setStatus("error");
        setError("Invalid API key / check AI Tools");
        throw new Error("Invalid API key");
      }

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setStatus("error");
        setError(data.error ?? "AI request failed");
        throw new Error(data.error ?? "AI request failed");
      }

      const contentType = res.headers.get("content-type") ?? "";
      if (
        contentType.includes("text/plain") ||
        contentType.includes("text/event-stream")
      ) {
        const reader = res.body?.getReader();
        if (!reader) {
          setStatus("idle");
          return "";
        }
        const decoder = new TextDecoder();
        let full = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          full += chunk;
          opts?.onChunk?.(chunk);
        }
        setStatus("idle");
        return full;
      }

      const data = (await res.json()) as { text?: string };
      setStatus("idle");
      return data.text ?? "";
    },
    [settings.apiKey, settings.providerId, settings.model],
  );

  return { run, status, error, configured };
}

export default useAiAction;
