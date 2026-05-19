/**
 * Tiny structured logger — emits one JSON object per line in production
 * (Render captures these into searchable logs) and a friendly format in dev.
 */
import { env } from '../config/env.js'

const isProd = env.NODE_ENV === 'production'
const LEVELS = { trace: 10, debug: 20, info: 30, warn: 40, error: 50 }
const minLevel = LEVELS[process.env.LOG_LEVEL] ?? LEVELS.info

function write(level, payload) {
  if (LEVELS[level] < minLevel) return
  const base = { time: new Date().toISOString(), level }
  const entry = typeof payload === 'string' ? { ...base, msg: payload } : { ...base, ...payload }

  if (isProd) {
    process.stdout.write(JSON.stringify(entry, errReplacer) + '\n')
  } else {
    const { msg, ...rest } = entry
    const colour = level === 'error' ? '\x1b[31m' : level === 'warn' ? '\x1b[33m' : '\x1b[36m'
    const reset = '\x1b[0m'
    const restStr = Object.keys(rest).length > 2 ? ' ' + JSON.stringify(rest, errReplacer) : ''
    process.stdout.write(`${colour}${level.toUpperCase()}${reset} ${msg ?? ''}${restStr}\n`)
  }
}

function errReplacer(_k, v) {
  if (v instanceof Error) {
    return { name: v.name, message: v.message, stack: v.stack, ...v }
  }
  return v
}

function curry(level) {
  return (payload, msg) =>
    write(level, typeof payload === 'string' ? payload : msg ? { ...payload, msg } : payload)
}

export const logger = {
  trace: curry('trace'),
  debug: curry('debug'),
  info: curry('info'),
  warn: curry('warn'),
  error: curry('error'),
}
