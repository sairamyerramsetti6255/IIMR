import { Router } from 'express'
import multer from 'multer'
import { requireAdmin } from '../middleware/auth.js'
import { asyncRoute } from '../middleware/errorHandler.js'
import { ingestPdf } from '../services/ingest.js'
import { logger } from '../lib/logger.js'

export const uploadRouter = Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024,   // 25 MB per file
    files: 10,
  },
  fileFilter: (_req, file, cb) => {
    const ok = file.mimetype === 'application/pdf' ||
               file.originalname.toLowerCase().endsWith('.pdf')
    cb(ok ? null : new Error('Only PDF files are accepted'), ok)
  },
})

uploadRouter.post(
  '/',
  requireAdmin,
  upload.array('files', 10),
  asyncRoute(async (req, res) => {
    const files = req.files || []
    if (files.length === 0) {
      return res.status(400).json({ error: 'no_files', message: 'No files attached (field name: "files")' })
    }

    const results = []
    for (const f of files) {
      try {
        const out = await ingestPdf({ buffer: f.buffer, originalName: f.originalname })
        results.push({ file: f.originalname, ...out })
      } catch (err) {
        logger.error({ err, file: f.originalname }, 'ingest failed')
        results.push({
          file: f.originalname,
          status: 'error',
          message: err?.message || 'Ingest failed',
        })
      }
    }

    const summary = {
      attempted: files.length,
      ok: results.filter((r) => r.status === 'ok').length,
      duplicate: results.filter((r) => r.status === 'duplicate').length,
      failed: results.filter((r) => r.status === 'error').length,
    }
    res.json({ summary, results })
  }),
)
