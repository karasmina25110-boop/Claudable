/**
 * Groq Model Definitions
 * Groq provides fast LLM inference with free tier API access
 */

export type GroqModelDefinition = {
  id: string;
  name: string;
  description?: string;
  contextWindow?: number;
  supportsImages?: boolean;
};

export const GROQ_MODEL_DEFINITIONS: GroqModelDefinition[] = [
  {
    id: 'llama-3.3-70b-versatile',
    name: 'Llama 3.3 70B',
    description: 'Most capable Llama model for complex tasks',
    contextWindow: 128000,
    supportsImages: false,
  },
  {
    id: 'llama-3.1-8b-instant',
    name: 'Llama 3.1 8B',
    description: 'Fast and efficient for simple tasks',
    contextWindow: 128000,
    supportsImages: false,
  },
  {
    id: 'llama-3.2-90b-vision-preview',
    name: 'Llama 3.2 90B Vision',
    description: 'Multimodal model with vision capabilities',
    contextWindow: 128000,
    supportsImages: true,
  },
  {
    id: 'mixtral-8x7b-32768',
    name: 'Mixtral 8x7B',
    description: 'Mixture of experts model by Mistral',
    contextWindow: 32768,
    supportsImages: false,
  },
  {
    id: 'gemma2-9b-it',
    name: 'Gemma 2 9B',
    description: 'Google Gemma 2 instruction-tuned',
    contextWindow: 8192,
    supportsImages: false,
  },
  {
    id: 'deepseek-r1-distill-llama-70b',
    name: 'DeepSeek R1 Llama 70B',
    description: 'DeepSeek reasoning model distilled to Llama',
    contextWindow: 128000,
    supportsImages: false,
  },
];

export const GROQ_DEFAULT_MODEL = 'llama-3.3-70b-versatile';

const MODEL_ID_MAP = GROQ_MODEL_DEFINITIONS.reduce<Record<string, string>>((acc, model) => {
  acc[model.id.toLowerCase()] = model.id;
  acc[model.name.toLowerCase()] = model.id;
  // Add aliases
  if (model.id.includes('llama-3.3')) {
    acc['llama3.3'] = model.id;
    acc['llama-3.3'] = model.id;
  }
  if (model.id.includes('llama-3.1')) {
    acc['llama3.1'] = model.id;
    acc['llama-3.1'] = model.id;
  }
  if (model.id.includes('llama-3.2')) {
    acc['llama3.2-vision'] = model.id;
    acc['llama-3.2-vision'] = model.id;
  }
  if (model.id.includes('mixtral')) {
    acc['mixtral'] = model.id;
  }
  if (model.id.includes('gemma')) {
    acc['gemma'] = model.id;
    acc['gemma2'] = model.id;
  }
  if (model.id.includes('deepseek')) {
    acc['deepseek'] = model.id;
    acc['deepseek-r1'] = model.id;
  }
  return acc;
}, {});

const MODEL_DISPLAY_NAMES = GROQ_MODEL_DEFINITIONS.reduce<Record<string, string>>((acc, model) => {
  acc[model.id] = model.name;
  return acc;
}, {});

export function normalizeGroqModelId(modelId?: string | null): string {
  if (!modelId) {
    return GROQ_DEFAULT_MODEL;
  }
  const normalized = modelId.trim().toLowerCase();
  return MODEL_ID_MAP[normalized] ?? GROQ_DEFAULT_MODEL;
}

export function getGroqModelDisplayName(modelId?: string | null): string {
  const normalized = normalizeGroqModelId(modelId);
  return MODEL_DISPLAY_NAMES[normalized] ?? normalized;
}

export function getGroqModelDefinition(modelId?: string | null): GroqModelDefinition | undefined {
  const normalized = normalizeGroqModelId(modelId);
  return GROQ_MODEL_DEFINITIONS.find(m => m.id === normalized);
}
