import { logger } from '../lib/logger.js'
import { env } from '../config/env.js'

export function notFound(req, res) {
  res.status(404).json({ error: 'not_found', path: req.path })
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  const status = err.status || err.statusCode || 500
  const payload = {
    error: err.code || (status >= 500 ? 'internal_error' : 'request_error'),
    message: err.expose === false && status >= 500
      ? 'Something went wrong on the server'
      : err.message || 'Request failed',
  }
  if (env.NODE_ENV !== 'production' && err.stack) payload.stack = err.stack
  logger.error({ err, status, path: req.path, method: req.method }, 'request failed')
  res.status(status).json(payload)
}

// Tiny helper to wrap async route handlers.
export const asyncRoute = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)
