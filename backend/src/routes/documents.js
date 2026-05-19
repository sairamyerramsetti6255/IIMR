import { Router } from 'express'
import { requireAdmin } from '../middleware/auth.js'
import { asyncRoute } from '../middleware/errorHandler.js'
import { vectorStore } from '../lib/vectorStore.js'
import { deleteDocument } from '../services/ingest.js'

export const documentsRouter = Router()

// Public — lets the chat UI show "answered from N docs"
documentsRouter.get('/', (_req, res) => {
  const docs = vectorStore.listDocs().map((d) => ({
    id: d.id,
    name: d.name,
    title: d.title || null,
    author: d.author || null,
    bytes: d.bytes,
    pages: d.pages,
    chunks: d.chunks,
    addedAt: d.addedAt,
  }))
  res.json({
    count: docs.length,
    totalChunks: vectorStore.size(),
    docs,
  })
})

documentsRouter.delete(
  '/:id',
  requireAdmin,
  asyncRoute(async (req, res) => {
    const removed = await deleteDocument(req.params.id)
    if (!removed) return res.status(404).json({ error: 'not_found' })
    res.json({ ok: true, removed: req.params.id })
  }),
)
