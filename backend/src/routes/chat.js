import { Router } from 'express'
import { asyncRoute } from '../middleware/errorHandler.js'
import { answerStream } from '../services/chat.js'

export const chatRouter = Router()

/**
 * POST /api/chat       — Server-Sent Events streaming endpoint.
 * Body: { question: string, history?: [{role:'user'|'assistant', text:string}] }
 *
 * Emits frames like:
 *   event: sources\ndata: {...}\n\n
 *   event: delta\ndata: {"text":"..."}\n\n
 *   event: done\ndata: {}\n\n
 *   event: error\ndata: {"message":"..."}\n\n
 */
chatRouter.post(
  '/',
  asyncRoute(async (req, res) => {
    const { question, history } = req.body || {}
    if (typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ error: 'bad_request', message: 'question is required' })
    }

    res.status(200)
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache, no-transform')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('X-Accel-Buffering', 'no') // disable nginx buffering on Render
    res.flushHeaders?.()

    const send = (type, data) => {
      res.write(`event: ${type}\n`)
      res.write(`data: ${JSON.stringify(data)}\n\n`)
    }

    // Heartbeat every 15s — keeps proxies / Render from killing the connection
    const heartbeat = setInterval(() => res.write(': ping\n\n'), 15_000)

    req.on('close', () => clearInterval(heartbeat))

    try {
      for await (const evt of answerStream({
        question,
        history: Array.isArray(history) ? history : [],
      })) {
        if (evt.type === 'delta')        send('delta', { text: evt.text })
        else if (evt.type === 'sources') send('sources', { sources: evt.sources })
        else if (evt.type === 'done')    send('done', {})
        else if (evt.type === 'error')   send('error', { message: evt.message })
      }
    } catch (err) {
      send('error', { message: err?.message || 'stream failed' })
    } finally {
      clearInterval(heartbeat)
      res.end()
    }
  }),
)

/** Convenience non-streaming variant for simple clients & tests. */
chatRouter.post(
  '/sync',
  asyncRoute(async (req, res) => {
    const { question, history } = req.body || {}
    if (typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ error: 'bad_request', message: 'question is required' })
    }

    let sources = []
    let answer = ''
    for await (const evt of answerStream({
      question,
      history: Array.isArray(history) ? history : [],
    })) {
      if (evt.type === 'sources') sources = evt.sources
      if (evt.type === 'delta') answer += evt.text
      if (evt.type === 'error') {
        return res.status(502).json({ error: 'model_error', message: evt.message })
      }
    }
    res.json({ answer, sources })
  }),
)
