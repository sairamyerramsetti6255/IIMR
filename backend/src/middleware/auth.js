import crypto from 'node:crypto'
import { env } from '../config/env.js'

/**
 * Constant-time admin-token check. Accepts either an
 *   Authorization: Bearer <token>
 * header OR an `x-admin-token: <token>` header (handy for browser fetch).
 */
export function requireAdmin(req, res, next) {
  const header = req.get('authorization') || ''
  const bearer = header.toLowerCase().startsWith('bearer ') ? header.slice(7).trim() : ''
  const xtoken = req.get('x-admin-token')?.trim() || ''
  const got = bearer || xtoken

  if (!got || !safeEquals(got, env.ADMIN_TOKEN)) {
    return res.status(401).json({ error: 'unauthorized', message: 'Admin token missing or invalid' })
  }
  next()
}

function safeEquals(a, b) {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) {
    // still do a compare to keep timing constant
    crypto.timingSafeEqual(ab, ab)
    return false
  }
  return crypto.timingSafeEqual(ab, bb)
}
