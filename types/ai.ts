export type AiProviderId = 'anthropic' | 'openai'

export type AiActionId = 'improve' | 'generate-summary' | 'grammar-check' | 'draft-cover-letter' | 'translate'

export interface AiSettings {
  version: number
  providerId: AiProviderId
  model: string
  /** User-provided key (localStorage only). Required for AI features. */
  apiKey: string
}
