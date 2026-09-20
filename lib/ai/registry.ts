import type { AiProviderAdapter, AiProviderId } from './types'
import { anthropicProvider } from './providers/anthropic'
import { openaiProvider } from './providers/openai'

export const AI_PROVIDERS: Record<AiProviderId, AiProviderAdapter> = {
  anthropic: anthropicProvider,
  openai: openaiProvider,
}

export function getProvider(id: AiProviderId): AiProviderAdapter | undefined {
  return AI_PROVIDERS[id]
}
