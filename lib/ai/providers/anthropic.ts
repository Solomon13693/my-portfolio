import type { AiCompletionRequest, AiCompletionResult, AiProviderAdapter } from '../types'

const DEFAULT_MODEL = 'claude-sonnet-4-5'

function resolveKey(request: AiCompletionRequest): string {
  return request.apiKey?.trim() || ''
}

export const anthropicProvider: AiProviderAdapter = {
  id: 'anthropic',
  label: 'Anthropic',
  isConfigured() {
    return Boolean(process.env.ANTHROPIC_API_KEY)
  },
  async complete(request: AiCompletionRequest): Promise<AiCompletionResult> {
    const apiKey = resolveKey(request)
    if (!apiKey) throw Object.assign(new Error('Missing Anthropic API key'), { code: 'not_configured' })

    const model = request.model || DEFAULT_MODEL
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: request.maxTokens ?? 4096,
        system: request.system,
        messages: [{ role: 'user', content: request.prompt }],
      }),
    })

    if (res.status === 401) throw Object.assign(new Error('Invalid Anthropic API key'), { code: 'auth' })
    if (res.status === 429) throw Object.assign(new Error('Anthropic rate limit hit'), { code: 'rate_limit' })
    if (!res.ok) {
      const body = await res.text()
      throw Object.assign(new Error(body || 'Anthropic error'), { code: 'upstream' })
    }

    const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> }
    const text = (data.content ?? [])
      .filter((block) => block.type === 'text' && block.text)
      .map((block) => block.text!)
      .join('\n')
    return { text }
  },
  async *stream(request: AiCompletionRequest): AsyncIterable<string> {
    const apiKey = resolveKey(request)
    if (!apiKey) throw Object.assign(new Error('Missing Anthropic API key'), { code: 'not_configured' })

    const model = request.model || DEFAULT_MODEL
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: request.maxTokens ?? 4096,
        stream: true,
        system: request.system,
        messages: [{ role: 'user', content: request.prompt }],
      }),
    })

    if (res.status === 401) throw Object.assign(new Error('Invalid Anthropic API key'), { code: 'auth' })
    if (!res.ok || !res.body) {
      throw Object.assign(new Error('Anthropic stream failed'), { code: 'upstream' })
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed.startsWith('data:')) continue
        const payload = trimmed.slice(5).trim()
        if (!payload || payload === '[DONE]') continue
        try {
          const json = JSON.parse(payload) as {
            type?: string
            delta?: { type?: string; text?: string }
          }
          if (json.type === 'content_block_delta' && json.delta?.type === 'text_delta' && json.delta.text) {
            yield json.delta.text
          }
        } catch {
          // ignore partial JSON
        }
      }
    }
  },
}
