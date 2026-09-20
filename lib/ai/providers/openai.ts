import type {
  AiCompletionRequest,
  AiCompletionResult,
  AiProviderAdapter,
} from "../types";

/**
 * OpenAI adapter / uses the Chat Completions HTTP API.
 * Verify against current OpenAI docs if the SDK shape drifts.
 */
function resolveKey(request: AiCompletionRequest): string {
  return request.apiKey?.trim() || "";
}

export const openaiProvider: AiProviderAdapter = {
  id: "openai",
  label: "OpenAI",
  isConfigured() {
    return Boolean(process.env.OPENAI_API_KEY);
  },
  async complete(request: AiCompletionRequest): Promise<AiCompletionResult> {
    const apiKey = resolveKey(request);
    if (!apiKey)
      throw Object.assign(new Error("Missing OpenAI API key"), {
        code: "not_configured",
      });

    const model = request.model || "gpt-4.1-mini";
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: request.maxTokens ?? 4096,
        messages: [
          ...(request.system
            ? [{ role: "system", content: request.system }]
            : []),
          { role: "user", content: request.prompt },
        ],
      }),
    });

    if (res.status === 401)
      throw Object.assign(new Error("Invalid OpenAI API key"), {
        code: "auth",
      });
    if (res.status === 429)
      throw Object.assign(new Error("OpenAI rate limit hit"), {
        code: "rate_limit",
      });
    if (!res.ok) {
      const body = await res.text();
      throw Object.assign(new Error(body || "OpenAI error"), {
        code: "upstream",
      });
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return { text: data.choices?.[0]?.message?.content ?? "" };
  },
  async *stream(request: AiCompletionRequest): AsyncIterable<string> {
    const apiKey = resolveKey(request);
    if (!apiKey)
      throw Object.assign(new Error("Missing OpenAI API key"), {
        code: "not_configured",
      });

    const model = request.model || "gpt-4.1-mini";
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        stream: true,
        max_tokens: request.maxTokens ?? 4096,
        messages: [
          ...(request.system
            ? [{ role: "system", content: request.system }]
            : []),
          { role: "user", content: request.prompt },
        ],
      }),
    });

    if (res.status === 401)
      throw Object.assign(new Error("Invalid OpenAI API key"), {
        code: "auth",
      });
    if (!res.ok || !res.body) {
      throw Object.assign(new Error("OpenAI stream failed"), {
        code: "upstream",
      });
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice(5).trim();
        if (payload === "[DONE]") return;
        try {
          const json = JSON.parse(payload) as {
            choices?: Array<{ delta?: { content?: string } }>;
          };
          const chunk = json.choices?.[0]?.delta?.content;
          if (chunk) yield chunk;
        } catch {
          // ignore partial JSON
        }
      }
    }
  },
};
