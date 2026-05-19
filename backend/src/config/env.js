import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..', '..')

function requireEnv(name) {
  const val = process.env[name]
  if (!val || !val.trim()) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return val.trim()
}

function num(name, fallback) {
  const raw = process.env[name]
  if (raw == null || raw === '') return fallback
  const n = Number(raw)
  if (!Number.isFinite(n)) throw new Error(`Env ${name} must be a number`)
  return n
}

function resolveDataDir() {
  const raw = process.env.DATA_DIR || './data'
  return path.isAbsolute(raw) ? raw : path.resolve(projectRoot, raw)
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: num('PORT', 8080),

  GEMINI_API_KEY: requireEnv('GEMINI_API_KEY'),
  ADMIN_TOKEN: requireEnv('ADMIN_TOKEN'),

  GEMINI_CHAT_MODEL: process.env.GEMINI_CHAT_MODEL || 'gemini-1.5-flash',
  GEMINI_EMBED_MODEL: process.env.GEMINI_EMBED_MODEL || 'text-embedding-004',

  DATA_DIR: resolveDataDir(),
  get PDF_DIR() { return path.join(this.DATA_DIR, 'pdfs') },
  get INDEX_FILE() { return path.join(this.DATA_DIR, 'vectors.json') },

  CORS_ORIGIN: (process.env.CORS_ORIGIN || '*')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),

  TOP_K: num('TOP_K', 6),
  CHUNK_SIZE: num('CHUNK_SIZE', 1100),
  CHUNK_OVERLAP: num('CHUNK_OVERLAP', 180),

  PROJECT_ROOT: projectRoot,
}
