/**
 * RAG chat orchestration.
 *
 *   embed(query) → topK chunks → build a strict, citation-aware prompt
 *   → stream the Gemini answer back to the client over SSE.
 *
 * The system prompt enforces:
 *   • Use ONLY the provided context for facts.
 *   • Inline numeric citations like [1], [2] mapping to the sources list.
 *   • Honestly say "I don't know" when context is insufficient.
 */
import { embedOne, streamAnswer } from '../lib/gemini.js'
import { vectorStore } from '../lib/vectorStore.js'
import { env } from '../config/env.js'

const SYSTEM_INSTRUCTION = `You are Millet Vista AI — an expert research assistant for the Millet Vista knowledge portal.

Your role
- You answer questions about millets, agronomy, nutrition, processing, government policy
  and related topics using ONLY the source excerpts that the user message provides
  under the "Context" heading.
- The excerpts come from official ICAR, IIMR, FSSAI and Government of India publications
  that the operator uploaded to this system.

Hard rules
1. Treat the "Context" as your ONLY source of truth for facts, numbers, varieties,
   states, dates, schemes and recommendations. Do not invent or speculate beyond it.
2. After every factual claim, cite the source(s) it came from using bracket numbers
   that match the numbered list in the user message, e.g. "Finger millet contains
   344 mg of calcium per 100 g [2][5]." Use multiple citations when claims are
   reinforced by several sources.
3. If the context does not contain enough information to answer confidently, say:
   "The uploaded sources don't cover this specifically." Then suggest a related
   question the user could ask, OR offer the closest tangential information you
   DO find in the context (clearly framed as related, not direct).
4. NEVER fabricate citation numbers. Only use numbers that appear in the Context.
5. Be precise with numbers and units. Preserve original units from the source.
6. Prefer concise, well-structured answers. Use short paragraphs and bullet lists
   when a comparison or step-list helps clarity.
7. Quote short verbatim phrases (≤15 words) when they convey official wording
   particularly well; surround them with quote marks.

Style
- Friendly, professional, neutral. No marketing tone.
- Use Markdown for formatting (headers ##, lists -, bold **, tables when comparing).
- Default to English; if the user writes in Hindi or another Indian language, mirror it.`

function formatContext(hits) {
  // Numbered, deduplicated by doc+chunk index so citations are stable.
  return hits
    .map((h, i) => {
      const tag = `[${i + 1}] ${h.doc?.name || 'Source'} — page ~${chunkToPage(h)}`
      const clean = h.text.replace(/\s+/g, ' ').trim()
      return `${tag}\n${clean}`
    })
    .join('\n\n---\n\n')
}

// Rough page estimate based on chunk position within the doc.
function chunkToPage(hit) {
  if (!hit.doc?.pages || !hit.chunkTotal) return '?'
  const pct = (hit.chunkIndex + 0.5) / hit.chunkTotal
  return Math.max(1, Math.round(pct * hit.doc.pages))
}

/**
 * High-level RAG call. Yields events shaped as:
 *   { type: 'sources', sources: [...] }
 *   { type: 'delta',   text: '...' }
 *   { type: 'done' }
 *
 * The caller (route) is responsible for turning these into SSE frames.
 */
export async function* answerStream({ question, history = [] }) {
  const trimmed = String(question || '').trim()
  if (!trimmed) {
    yield { type: 'error', message: 'Empty question' }
    return
  }
  if (trimmed.length > 4000) {
    yield { type: 'error', message: 'Question is too long (max 4000 chars)' }
    return
  }

  if (vectorStore.size() === 0) {
    yield { type: 'sources', sources: [] }
    yield {
      type: 'delta',
      text: "I don't have any source documents yet. Ask the administrator to upload PDFs on the admin page, then try again.",
    }
    yield { type: 'done' }
    return
  }

  const queryEmbedding = await embedOne(trimmed, 'RETRIEVAL_QUERY')
  const hits = vectorStore.search(queryEmbedding, env.TOP_K)

  // Deduplicate near-identical adjacent chunks from the same doc.
  const seen = new Set()
  const dedup = []
  for (const h of hits) {
    const key = `${h.doc?.id || 'x'}:${h.chunkIndex}`
    if (seen.has(key)) continue
    seen.add(key)
    dedup.push(h)
  }

  const sources = dedup.map((h, i) => ({
    index: i + 1,
    score: Number(h.score.toFixed(3)),
    name: h.doc?.name || 'Source',
    docId: h.doc?.id,
    page: chunkToPage(h),
    excerpt: h.text.length > 280 ? h.text.slice(0, 280).trim() + '…' : h.text,
  }))

  yield { type: 'sources', sources }

  const userPrompt = [
    `Question:\n${trimmed}`,
    '',
    'Context (use ONLY these excerpts; cite with bracket numbers):',
    formatContext(dedup),
    '',
    'Answer (concise, well-structured Markdown with inline [n] citations):',
  ].join('\n')

  try {
    for await (const piece of streamAnswer({
      systemInstruction: SYSTEM_INSTRUCTION,
      history: history.slice(-8), // cap chat history
      userPrompt,
    })) {
      yield { type: 'delta', text: piece }
    }
    yield { type: 'done' }
  } catch (err) {
    yield { type: 'error', message: err?.message || 'Model error' }
  }
}
