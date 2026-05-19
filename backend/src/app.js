import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

import { env } from './config/env.js'
import { logger } from './lib/logger.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

import { healthRouter } from './routes/health.js'
import { uploadRouter } from './routes/upload.js'
import { documentsRouter } from './routes/documents.js'
import { chatRouter } from './routes/chat.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicDir = path.resolve(__dirname, '..', 'public')

export function createApp() {
  const app = express()
  app.disable('x-powered-by')
  app.set('trust proxy', 1) // Render sits behind a proxy

  app.use(
    helmet({
      contentSecurityPolicy: false, // we serve a self-contained UI w/ CDN scripts
      crossOriginEmbedderPolicy: false,
    }),
  )
  app.use(compression())

  const corsOrigin = env.CORS_ORIGIN.length === 1 && env.CORS_ORIGIN[0] === '*'
    ? true
    : env.CORS_ORIGIN
  app.use(cors({ origin: corsOrigin, credentials: false }))

  app.use(express.json({ limit: '1mb' }))
  app.use(express.urlencoded({ extended: true, limit: '1mb' }))

  // request log — concise in production, dev-friendly otherwise
  app.use(
    morgan(env.NODE_ENV === 'production' ? 'tiny' : 'dev', {
      stream: { write: (line) => logger.info(line.trim()) },
      skip: (req) => req.path === '/api/health',
    }),
  )

  // Public rate limit — protects chat from abuse.
  const chatLimiter = rateLimit({
    windowMs: 60_000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'rate_limited', message: 'Slow down — try again in a minute.' },
  })

  // Stricter limit on upload — admin token still required.
  const uploadLimiter = rateLimit({
    windowMs: 60_000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
  })

  app.use('/api/health', healthRouter)
  app.use('/api/chat', chatLimiter, chatRouter)
  app.use('/api/upload', uploadLimiter, uploadRouter)
  app.use('/api/documents', documentsRouter)

  // ── Static UI ─────────────────────────────────────────────────────────
  app.use(
    express.static(publicDir, {
      maxAge: env.NODE_ENV === 'production' ? '1h' : 0,
      etag: true,
    }),
  )
  app.get('/admin', (_req, res) => res.sendFile(path.join(publicDir, 'admin.html')))
  app.get('/', (_req, res) => res.sendFile(path.join(publicDir, 'index.html')))

  app.use(notFound)
  app.use(errorHandler)

  return app
}
