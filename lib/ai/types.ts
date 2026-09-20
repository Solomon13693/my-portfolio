import type { AiProviderId } from '@/types'

export type { AiProviderId }
export type AiEffort = 'low' | 'medium' | 'high'

export interface AiCompletionRequest {
  system?: string
  prompt: string
  maxTokens?: number
  effort?: AiEffort
  model?: string
  /** Bring-your-own-key from the client; never logged. */
  apiKey?: string
}

export interface AiCompletionResult {
  text: string
}

export interface AiProviderError {
  code: 'auth' | 'rate_limit' | 'upstream' | 'not_configured'
  message: string
}

export interface AiProviderAdapter {
  id: AiProviderId
  label: string
  isConfigured(): boolean
  complete(request: AiCompletionRequest): Promise<AiCompletionResult>
  stream(request: AiCompletionRequest): AsyncIterable<string>
}
