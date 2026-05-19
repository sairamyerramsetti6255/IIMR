import 'dotenv/config'
import http from 'node:http'
import { createApp } from './src/app.js'
import { env } from './src/config/env.js'
import { logger } from './src/lib/logger.js'
import { vectorStore } from './src/lib/vectorStore.js'

async function main() {
  await vectorStore.load()
  logger.info(
    { docs: vectorStore.listDocs().length, chunks: vectorStore.size() },
    'vector store ready'
  )

  const app = createApp()
  const server = http.createServer(app)

  server.listen(env.PORT, () => {
    logger.info(
      { port: env.PORT, env: env.NODE_ENV, dataDir: env.DATA_DIR },
      `Millet Vista RAG listening`
    )
  })

  const shutdown = (signal) => {
    logger.info({ signal }, 'shutting down…')
    server.close(() => process.exit(0))
    setTimeout(() => process.exit(1), 10_000).unref()
  }
  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('unhandledRejection', (err) => logger.error({ err }, 'unhandledRejection'))
  process.on('uncaughtException', (err) => logger.error({ err }, 'uncaughtException'))
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('fatal startup error:', err)
  process.exit(1)
})
