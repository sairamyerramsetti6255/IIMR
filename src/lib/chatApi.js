/**
 * Browser client for the Millet Vista RAG backend.
 *
 * Configure the base URL via Vite env var:
 *   VITE_API_BASE=https://millet-vista-rag.onrender.com
 *
 * Falls back to '' (same origin) for local dev when the backend is
 * proxied or mounted on the same host.
 */
const API_BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '')

export const chatApi = {
  baseUrl: API_BASE,

  async health() {
    const r = await fetch(`${API_BASE}/api/health`, { headers: { accept: 'application/json' } })
    if (!r.ok) throw new Error(`health failed: ${r.status}`)
    return r.json()
  },

  async listDocuments() {
    const r = await fetch(`${API_BASE}/api/documents`, { headers: { accept: 'application/json' } })
    if (!r.ok) throw new Error(`documents failed: ${r.status}`)
    return r.json()
  },

  /**
   * Stream a chat answer. Calls `onEvent` for every SSE event:
   *   { type: 'sources', sources }
   *   { type: 'delta',   text }
   *   { type: 'done' }
   *   { type: 'error',   message }
   *
   * Returns an object with `cancel()` to abort the stream.
   */
  streamChat({ question, history = [], onEvent, signal }) {
    const controller = signal ? null : new AbortController()
    const abortSignal = signal || controller.signal

    const run = async () => {
      let res
      try {
        res = await fetch(`${API_BASE}/api/chat`, {
          method: 'POST',
          headers: { 'content-type': 'application/json', accept: 'text/event-stream' },
          body: JSON.stringify({ question, history }),
          signal: abortSignal,
        })
      } catch (err) {
        if (err.name === 'AbortError') return
        onEvent?.({ type: 'error', message: 'Cannot reach the AI service. Is the backend running?' })
        return
      }

      if (!res.ok) {
        let msg = `Request failed (${res.status})`
        try {
          const j = await res.json()
          msg = j.message || msg
        } catch {}
        onEvent?.({ type: 'error', message: msg })
        return
      }
      if (!res.body) {
        onEvent?.({ type: 'error', message: 'Streaming not supported by this browser.' })
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let buffer = ''

      try {
        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })

          // Parse SSE frames separated by blank lines
          let sep
          while ((sep = buffer.indexOf('\n\n')) !== -1) {
            const frame = buffer.slice(0, sep)
            buffer = buffer.slice(sep + 2)
            const evt = parseFrame(frame)
            if (evt) onEvent?.(evt)
          }
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          onEvent?.({ type: 'error', message: err.message || 'stream error' })
        }
      }
    }

    run()
    return { cancel: () => controller?.abort() }
  },
}

function parseFrame(frame) {
  // Ignore comment lines (heartbeats start with ':')
  if (!frame || frame.startsWith(':')) return null
  let event = 'message'
  let data = ''
  for (const line of frame.split('\n')) {
    if (line.startsWith('event:')) event = line.slice(6).trim()
    else if (line.startsWith('data:')) data += (data ? '\n' : '') + line.slice(5).trim()
  }
  if (!data) return null
  try {
    const payload = JSON.parse(data)
    return { type: event, ...payload }
  } catch {
    return { type: event, raw: data }
  }
}
