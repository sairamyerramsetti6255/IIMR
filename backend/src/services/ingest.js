/**
 * Full ingest pipeline:
 *   1. Save raw PDF to data/pdfs/<docId>.pdf      (so we can re-process later)
 *   2. Extract text from the PDF
 *   3. Chunk the text into ~CHUNK_SIZE pieces
 *   4. Embed every chunk in batches (Gemini batchEmbedContents)
 *   5. Atomically register the document + chunks in the vector store
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { env } from '../config/env.js'
import { logger } from '../lib/logger.js'
import { extractPdf } from '../lib/pdf.js'
import { chunkText } from '../lib/chunker.js'
import { embedBatch } from '../lib/gemini.js'
import { vectorStore } from '../lib/vectorStore.js'

function makeDocId(buffer, originalName) {
  const h = crypto.createHash('sha1').update(buffer).digest('hex').slice(0, 12)
  const slug = originalName.toLowerCase().replace(/\.pdf$/, '').replace(/[^a-z0-9]+/g, '-').slice(0, 60)
  return `${slug || 'doc'}-${h}`
}

export async function ingestPdf({ buffer, originalName }) {
  const t0 = Date.now()
  const docId = makeDocId(buffer, originalName)

  if (vectorStore.getDoc(docId)) {
    return { status: 'duplicate', docId, reason: 'A document with identical content already exists.' }
  }

  const parsed = await extractPdf(buffer, originalName)
  logger.info({ docId, pages: parsed.numPages, bytes: parsed.bytes }, 'pdf parsed')

  const chunks = chunkText(parsed.text, {
    chunkSize: env.CHUNK_SIZE,
    overlap: env.CHUNK_OVERLAP,
  })
  if (chunks.length === 0) {
    throw new Error(`No usable text chunks produced from "${originalName}"`)
  }
  logger.info({ docId, chunks: chunks.length }, 'chunked')

  // Persist raw file first so we can recover even if embedding fails mid-way.
  // On read-only filesystems (free tier) this is skipped.
  try {
    await fs.mkdir(env.PDF_DIR, { recursive: true })
    const pdfPath = path.join(env.PDF_DIR, `${docId}.pdf`)
    await fs.writeFile(pdfPath, buffer)
  } catch (err) {
    logger.warn({ err: err.message }, 'skipping raw pdf save (read-only fs)')
  }

  // Embed
  const embeddings = await embedBatch(chunks, 'RETRIEVAL_DOCUMENT')
  if (embeddings.length !== chunks.length) {
    throw new Error(`Embedding count ${embeddings.length} != chunk count ${chunks.length}`)
  }

  const chunkPayloads = chunks.map((text, i) => ({ text, embedding: embeddings[i] }))
  const record = vectorStore.addDocument(
    {
      id: docId,
      name: originalName,
      bytes: parsed.bytes,
      pages: parsed.numPages,
      title: parsed.info?.Title || null,
      author: parsed.info?.Author || null,
    },
    chunkPayloads,
  )
  // Force an immediate save after a successful ingest.
  await vectorStore.save()

  const ms = Date.now() - t0
  logger.info({ docId, ms, chunks: record.chunks }, 'ingest complete')
  return { status: 'ok', doc: record, ms }
}

export async function deleteDocument(docId) {
  const removed = vectorStore.removeDocument(docId)
  const pdfPath = path.join(env.PDF_DIR, `${docId}.pdf`)
  await fs.rm(pdfPath, { force: true })
  await vectorStore.save()
  return removed
}
