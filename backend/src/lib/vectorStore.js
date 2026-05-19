/**
 * In-memory vector store with JSON disk persistence.
 *
 * Suitable for tens of thousands of chunks (which is plenty for an IIMR
 * PDF corpus). For larger workloads, swap this module out for pgvector
 * or Pinecone — the interface is intentionally small.
 *
 * On-disk format (data/vectors.json):
 *   {
 *     version: 1,
 *     model: "text-embedding-004",
 *     dim: 768,
 *     docs:    [{ id, name, bytes, pages, chunks, addedAt, ... }],
 *     chunks:  [{ id, docId, text, embedding: number[], meta }]
 *   }
 */
import fs from 'node:fs/promises'
import fssync from 'node:fs'
import path from 'node:path'
import { env } from '../config/env.js'
import { logger } from './logger.js'

const VERSION = 1

class VectorStore {
  constructor() {
    this.docs = new Map()       // docId -> doc record
    this.chunks = []            // { id, docId, text, embedding: Float32Array, meta }
    this.dim = null
    this._saveTimer = null
  }

  size() { return this.chunks.length }
  listDocs() { return Array.from(this.docs.values()).sort((a, b) => b.addedAt - a.addedAt) }
  getDoc(id) { return this.docs.get(id) || null }

  async load() {
    // Best-effort directory creation — on Render's free tier the FS is read-only,
    // and that's fine because we only READ the pre-built vectors.json baked
    // into the repo. Writes (uploads) will fail with a clear error later.
    try { await fs.mkdir(env.PDF_DIR, { recursive: true }) } catch (err) {
      logger.warn({ err: err.message, dir: env.PDF_DIR }, 'pdf dir is read-only — uploads disabled')
      this.readOnly = true
    }
    if (!fssync.existsSync(env.INDEX_FILE)) {
      logger.info({ path: env.INDEX_FILE }, 'no vector index yet — starting fresh')
      return
    }
    const raw = await fs.readFile(env.INDEX_FILE, 'utf8')
    const parsed = JSON.parse(raw)
    if (parsed.version !== VERSION) {
      logger.warn({ found: parsed.version, want: VERSION }, 'index version mismatch — ignoring')
      return
    }
    this.dim = parsed.dim ?? null
    for (const d of parsed.docs || []) this.docs.set(d.id, d)
    this.chunks = (parsed.chunks || []).map((c) => ({
      ...c,
      embedding: new Float32Array(c.embedding),
    }))
    logger.info(
      { docs: this.docs.size, chunks: this.chunks.length, dim: this.dim, readOnly: !!this.readOnly },
      'vector index loaded'
    )
  }

  async save() {
    if (this.readOnly) {
      // Silently no-op so we don't crash a free-tier deployment. The CLI
      // ingester explicitly clears readOnly before running.
      return
    }
    const payload = {
      version: VERSION,
      model: env.GEMINI_EMBED_MODEL,
      dim: this.dim,
      docs: Array.from(this.docs.values()),
      chunks: this.chunks.map((c) => ({
        ...c,
        embedding: Array.from(c.embedding),
      })),
    }
    const tmp = env.INDEX_FILE + '.tmp'
    await fs.mkdir(path.dirname(env.INDEX_FILE), { recursive: true })
    await fs.writeFile(tmp, JSON.stringify(payload))
    await fs.rename(tmp, env.INDEX_FILE)
    logger.debug({ chunks: this.chunks.length }, 'vector index saved')
  }

  /** Debounced persistence so a flurry of additions doesn't thrash the disk. */
  scheduleSave(ms = 800) {
    clearTimeout(this._saveTimer)
    this._saveTimer = setTimeout(() => this.save().catch((err) => logger.error({ err }, 'save failed')), ms)
  }

  /**
   * Add one document and its chunk embeddings atomically. Returns the doc record.
   */
  addDocument(doc, chunkPayloads) {
    if (chunkPayloads.length && !this.dim) this.dim = chunkPayloads[0].embedding.length
    for (const cp of chunkPayloads) {
      if (cp.embedding.length !== this.dim) {
        throw new Error(`embedding dim mismatch: got ${cp.embedding.length}, expected ${this.dim}`)
      }
    }
    const record = { ...doc, chunks: chunkPayloads.length, addedAt: Date.now() }
    this.docs.set(record.id, record)
    for (let i = 0; i < chunkPayloads.length; i++) {
      const c = chunkPayloads[i]
      this.chunks.push({
        id: `${record.id}::${i}`,
        docId: record.id,
        text: c.text,
        embedding: c.embedding instanceof Float32Array ? c.embedding : new Float32Array(c.embedding),
        meta: { index: i, total: chunkPayloads.length },
      })
    }
    this.scheduleSave()
    return record
  }

  removeDocument(docId) {
    const existed = this.docs.delete(docId)
    if (!existed) return false
    this.chunks = this.chunks.filter((c) => c.docId !== docId)
    this.scheduleSave(50)
    return true
  }

  /**
   * Cosine similarity search. Returns top-k chunks with score and doc info.
   */
  search(queryEmbedding, k = env.TOP_K) {
    if (!(queryEmbedding instanceof Float32Array)) {
      queryEmbedding = new Float32Array(queryEmbedding)
    }
    if (this.chunks.length === 0) return []
    if (queryEmbedding.length !== this.dim) {
      throw new Error(`query dim ${queryEmbedding.length} != index dim ${this.dim}`)
    }

    const qNorm = norm(queryEmbedding)
    if (qNorm === 0) return []

    const scored = new Array(this.chunks.length)
    for (let i = 0; i < this.chunks.length; i++) {
      const c = this.chunks[i]
      const dn = norm(c.embedding) * qNorm || 1
      scored[i] = { idx: i, score: dot(queryEmbedding, c.embedding) / dn }
    }
    scored.sort((a, b) => b.score - a.score)
    const top = scored.slice(0, k).map(({ idx, score }) => {
      const c = this.chunks[idx]
      const d = this.docs.get(c.docId)
      return {
        score,
        text: c.text,
        chunkIndex: c.meta.index,
        chunkTotal: c.meta.total,
        doc: d ? { id: d.id, name: d.name, pages: d.pages } : { id: c.docId, name: 'unknown' },
      }
    })
    return top
  }
}

function dot(a, b) {
  let s = 0
  for (let i = 0; i < a.length; i++) s += a[i] * b[i]
  return s
}
function norm(a) {
  let s = 0
  for (let i = 0; i < a.length; i++) s += a[i] * a[i]
  return Math.sqrt(s)
}

export const vectorStore = new VectorStore()
