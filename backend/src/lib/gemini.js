/**
 * Gemini client — embeddings + chat generation (streaming and non-streaming).
 *
 * We use the official @google/generative-ai SDK. All keys are read from env.
 * Embeddings are batched (Gemini supports up to ~100 texts per batch).
 */
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai'
import { env } from '../config/env.js'
import { logger } from './logger.js'

const client = new GoogleGenerativeAI(env.GEMINI_API_KEY)
const embedModel = client.getGenerativeModel({ model: env.GEMINI_EMBED_MODEL })

const SAFETY_SETTINGS = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT,        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,       threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
]

/**
 * Embed an array of strings. Returns array of Float32Array embeddings.
 * `taskType` is the Gemini hint: "RETRIEVAL_DOCUMENT" for indexed chunks,
 * "RETRIEVAL_QUERY" for user queries.
 */
export async function embedBatch(texts, taskType = 'RETRIEVAL_DOCUMENT') {
  if (!Array.isArray(texts) || texts.length === 0) return []

  const BATCH = 90
  const out = []
  for (let i = 0; i < texts.length; i += BATCH) {
    const slice = texts.slice(i, i + BATCH)
    const requests = slice.map((text) => ({
      content: { role: 'user', parts: [{ text }] },
      taskType,
    }))

    let attempt = 0
    while (true) {
      try {
        const { embeddings } = await embedModel.batchEmbedContents({ requests })
        for (const e of embeddings) out.push(new Float32Array(e.values))
        break
      } catch (err) {
        attempt += 1
        if (attempt >= 4) throw err
        const wait = 600 * 2 ** (attempt - 1)
        logger.warn({ err: err?.message, attempt, wait }, 'embed batch failed, retrying')
        await new Promise((r) => setTimeout(r, wait))
      }
    }
  }
  return out
}

export async function embedOne(text, taskType = 'RETRIEVAL_QUERY') {
  const [v] = await embedBatch([text], taskType)
  return v
}

/**
 * Build the chat-model instance lazily so model selection respects env.
 */
function chatModel(systemInstruction) {
  return client.getGenerativeModel({
    model: env.GEMINI_CHAT_MODEL,
    systemInstruction,
    safetySettings: SAFETY_SETTINGS,
    generationConfig: {
      temperature: 0.25,
      topP: 0.9,
      maxOutputTokens: 1536,
    },
  })
}

/**
 * Stream a RAG answer. `history` is an array of {role, text} representing
 * prior turns. The async iterable yields raw text chunks.
 */
export async function* streamAnswer({ systemInstruction, history, userPrompt }) {
  const model = chatModel(systemInstruction)

  const contents = [
    ...history.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.text }],
    })),
    { role: 'user', parts: [{ text: userPrompt }] },
  ]

  const result = await model.generateContentStream({ contents })
  for await (const chunk of result.stream) {
    const text = chunk.text?.() ?? ''
    if (text) yield text
  }
}

/** Non-streaming variant — used for cheap status checks. */
export async function answer({ systemInstruction, history, userPrompt }) {
  let out = ''
  for await (const piece of streamAnswer({ systemInstruction, history, userPrompt })) {
    out += piece
  }
  return out
}
