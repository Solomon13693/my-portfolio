import { NextRequest, NextResponse } from "next/server";
import { getProvider, buildPromptForAction } from "@/lib/ai";
import { AI_PAYLOAD_MAX_CHARS, estimatePayloadChars } from "@/lib";
import type { AiActionId, AiProviderId, ResumeDraft } from "@/types";

const ACTIONS: AiActionId[] = [
  "improve",
  "generate-summary",
  "grammar-check",
  "draft-cover-letter",
  "translate",
];

function isAction(value: unknown): value is AiActionId {
  return typeof value === "string" && (ACTIONS as string[]).includes(value);
}

function isProvider(value: unknown): value is AiProviderId {
  return value === "anthropic" || value === "openai";
}

function clientError(message: string, code: string, status: number) {
  return NextResponse.json({ error: message, code }, { status });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return clientError("Invalid request", "bad_request", 400);
  }

  if (!body || typeof body !== "object") {
    return clientError("Invalid request", "bad_request", 400);
  }

  const payloadBody = body as Record<string, unknown>;
  const action = payloadBody.action;
  const providerId = payloadBody.providerId;
  const model =
    typeof payloadBody.model === "string" ? payloadBody.model : undefined;
  const apiKey =
    typeof payloadBody.apiKey === "string" ? payloadBody.apiKey.trim() : "";
  const payload = (
    payloadBody.payload && typeof payloadBody.payload === "object"
      ? payloadBody.payload
      : {}
  ) as Record<string, unknown>;
  const draft = payloadBody.draft as ResumeDraft | undefined;

  if (!isAction(action)) {
    return clientError("Unknown action", "bad_request", 400);
  }
  if (!isProvider(providerId)) {
    return clientError("Unknown provider", "bad_request", 400);
  }

  // Public BYOK only / never fall back to server env keys (would burn host quota).
  if (!apiKey) {
    return clientError(
      "Add your API key in AI Tools to use AI features",
      "not_configured",
      400,
    );
  }

  if (estimatePayloadChars({ payload, draft, action }) > AI_PAYLOAD_MAX_CHARS) {
    return clientError(
      "Request too large / shorten the resume or job description",
      "payload_too_large",
      413,
    );
  }

  const provider = getProvider(providerId);
  if (!provider) {
    return clientError("Unknown provider", "bad_request", 400);
  }

  let built: ReturnType<typeof buildPromptForAction>;
  try {
    const draftFromPayload =
      (payload.draft as ResumeDraft | undefined) ?? draft;
    built = buildPromptForAction(action, payload, draftFromPayload);
  } catch (error) {
    return clientError(
      error instanceof Error ? error.message : "Bad payload",
      "bad_request",
      400,
    );
  }

  const completionOpts = {
    system: built.system,
    prompt: built.prompt,
    model,
    effort: built.effort,
    apiKey,
  };

  try {
    if (built.stream) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of provider.stream(completionOpts)) {
              controller.enqueue(encoder.encode(chunk));
            }
            controller.close();
          } catch (error) {
            const message =
              error instanceof Error ? error.message : "AI provider error";
            controller.enqueue(encoder.encode(`\n[Error: ${message}]`));
            controller.close();
          }
        },
      });
      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
      });
    }

    const result = await provider.complete(completionOpts);
    return NextResponse.json({ text: result.text });
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? String((error as { code: string }).code)
        : "upstream";
    const status =
      code === "auth"
        ? 401
        : code === "rate_limit"
          ? 429
          : code === "not_configured"
            ? 400
            : 502;
    const safeMessage =
      code === "auth"
        ? "Invalid API key / check AI Tools"
        : code === "rate_limit"
          ? "Provider rate limit hit / try again shortly"
          : code === "not_configured"
            ? "Add your API key in AI Tools"
            : "AI request failed";
    // Log details server-side only; never echo upstream bodies to the client.
    console.error(
      "[cv-lab/ai]",
      code,
      error instanceof Error ? error.message : error,
    );
    return clientError(safeMessage, code, status);
  }
}
