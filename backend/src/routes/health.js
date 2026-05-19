import { Router } from 'express'
import { vectorStore } from '../lib/vectorStore.js'
import { env } from '../config/env.js'

export const healthRouter = Router()

healthRouter.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: Math.round(process.uptime()),
    docs: vectorStore.listDocs().length,
    chunks: vectorStore.size(),
    models: {
      chat: env.GEMINI_CHAT_MODEL,
      embed: env.GEMINI_EMBED_MODEL,
    },
    env: env.NODE_ENV,
  })
})
