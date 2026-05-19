import { useEffect, useMemo, useRef, useState } from 'react'
import { chatApi } from '../../lib/chatApi.js'
import { renderMarkdown } from '../../lib/markdown.js'
import { ArrowRight, Close, Doc, Search } from '../icons/Icons.jsx'

/**
 * Re-usable chatbot core. Renders a transcript + composer and streams
 * answers from the backend. Used by both the full /ask page and the
 * floating widget.
 *
 * Props
 *   compact:   bool       – smaller paddings for the widget popup
 *   starters:  string[]   – starter prompts shown in the empty state
 *   onClose?:  () => void – render a close button in the header
 *   title?:    string     – header label
 */
export default function ChatPanel({
  compact = false,
  starters = [],
  onClose,
  title = 'Millet Vista AI',
}) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const cancelRef = useRef(null)
  const transcriptRef = useRef(null)
  const taRef = useRef(null)

  // Auto-scroll on every new chunk
  useEffect(() => {
    const el = transcriptRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages, streaming])

  // Auto-grow textarea
  useEffect(() => {
    const ta = taRef.current
    if (!ta) return
    ta.style.height = '0px'
    ta.style.height = Math.min(180, ta.scrollHeight) + 'px'
  }, [input])

  const send = (text) => {
    const q = (text ?? input).trim()
    if (!q || streaming) return

    const history = messages.map((m) => ({ role: m.role, text: m.text }))
    const userMsg = { role: 'user', text: q, id: cryptoId() }
    const assistantMsg = {
      role: 'assistant',
      text: '',
      sources: [],
      streaming: true,
      id: cryptoId(),
    }
    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput('')
    setStreaming(true)

    const update = (mut) => {
      setMessages((prev) => {
        const next = prev.slice()
        const idx = next.findIndex((m) => m.id === assistantMsg.id)
        if (idx === -1) return prev
        next[idx] = mut(next[idx])
        return next
      })
    }

    cancelRef.current = chatApi.streamChat({
      question: q,
      history,
      onEvent: (evt) => {
        if (evt.type === 'sources') {
          update((m) => ({ ...m, sources: evt.sources || [] }))
        } else if (evt.type === 'delta') {
          update((m) => ({ ...m, text: m.text + (evt.text || '') }))
        } else if (evt.type === 'done') {
          update((m) => ({ ...m, streaming: false }))
          setStreaming(false)
        } else if (evt.type === 'error') {
          update((m) => ({
            ...m,
            streaming: false,
            error: evt.message || 'Something went wrong',
          }))
          setStreaming(false)
        }
      },
    })
  }

  const stop = () => {
    cancelRef.current?.cancel?.()
    setStreaming(false)
    setMessages((prev) => prev.map((m) => ({ ...m, streaming: false })))
  }

  const reset = () => {
    stop()
    setMessages([])
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  // Click-to-scroll for citation chips
  const onTranscriptClick = (e) => {
    const t = e.target
    if (t.matches?.('.cite[data-cite]')) {
      const n = t.getAttribute('data-cite')
      const card = transcriptRef.current?.querySelector(
        `[data-source-card="${t.closest('.msg')?.dataset.id}-${n}"]`
      )
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' })
        card.classList.add('flash')
        setTimeout(() => card.classList.remove('flash'), 1200)
      }
    }
  }

  return (
    <div className={`mv-chat ${compact ? 'mv-chat--compact' : ''}`}>
      <header className="mv-chat__header">
        <div className="flex items-center gap-2">
          <span className="mv-chat__dot" aria-hidden />
          <span className="font-display text-[15px] text-ink leading-none">{title}</span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-stone-500 font-semibold ml-2 hidden sm:inline">
            powered by Gemini
          </span>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button onClick={reset} className="mv-chat__iconbtn" title="New conversation" aria-label="New conversation">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v6m0 0H6m6 0l-3.5 3.5A6 6 0 1014 18" />
              </svg>
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="mv-chat__iconbtn" aria-label="Close chat">
              <Close className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      <div className="mv-chat__transcript" ref={transcriptRef} onClick={onTranscriptClick}>
        {messages.length === 0 ? (
          <Empty starters={starters} onPick={(t) => send(t)} compact={compact} />
        ) : (
          messages.map((m) => <Message key={m.id} message={m} />)
        )}
      </div>

      <div className="mv-chat__composer">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send()
          }}
        >
          <textarea
            ref={taRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask anything about millets, nutrition, varieties, processing…"
            rows={1}
            aria-label="Ask the millet AI"
          />
          {streaming ? (
            <button type="button" onClick={stop} className="mv-chat__send is-stop" aria-label="Stop">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
            </button>
          ) : (
            <button type="submit" disabled={!input.trim()} className="mv-chat__send" aria-label="Send">
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </form>
        <div className="mv-chat__hint">
          Answers are grounded in uploaded ICAR / IIMR / FSSAI PDFs. Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for a new line.
        </div>
      </div>
    </div>
  )
}

function Empty({ starters, onPick, compact }) {
  return (
    <div className="mv-chat__empty">
      <div className="mv-chat__empty-badge">Grounded in 30+ official PDFs</div>
      <h2 className="font-display text-[clamp(22px,3vw,32px)] leading-tight text-ink mt-3 mb-2">
        Ask <em className="italic text-forest-700">anything</em> about millets.
      </h2>
      <p className="text-stone-600 text-[14px] max-w-md mx-auto">
        I draw on the same ICAR, IIMR, FSSAI and Government of India publications that power this site. Every answer cites its sources.
      </p>
      {starters.length > 0 && (
        <div className={`mv-chat__starters ${compact ? 'is-stack' : ''}`}>
          {starters.map((s) => (
            <button key={s} onClick={() => onPick(s)}>{s}</button>
          ))}
        </div>
      )}
    </div>
  )
}

function Message({ message }) {
  const isUser = message.role === 'user'
  const html = useMemo(
    () => (isUser ? null : renderMarkdown(message.text || '')),
    [isUser, message.text]
  )

  return (
    <article className={`msg ${isUser ? 'msg--user' : 'msg--assistant'}`} data-id={message.id}>
      <div className="msg__role">
        <span className="msg__av">{isUser ? 'You' : 'MV'}</span>
        <span>{isUser ? 'You' : 'Millet Vista AI'}</span>
      </div>

      {isUser ? (
        <div className="msg__body msg__body--user">{message.text}</div>
      ) : (
        <div className="msg__body">
          {message.text ? (
            <div className="prose-chat" dangerouslySetInnerHTML={{ __html: html }} />
          ) : message.streaming ? (
            <Typing />
          ) : null}
          {message.error && <div className="msg__error">{message.error}</div>}

          {message.sources?.length > 0 && (
            <div className="msg__sources">
              <div className="msg__sources-label">Sources</div>
              <ol>
                {message.sources.map((s) => (
                  <li key={s.index} data-source-card={`${message.id}-${s.index}`}>
                    <span className="n">{s.index}</span>
                    <div>
                      <div>
                        <span className="src-name">{s.name}</span>{' '}
                        <span className="src-meta">· page ~{s.page} · score {s.score}</span>
                      </div>
                      <div className="src-excerpt">"{s.excerpt}"</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </article>
  )
}

function Typing() {
  return (
    <div className="mv-chat__typing" aria-label="Thinking">
      <span /><span /><span />
    </div>
  )
}

function cryptoId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'm-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}
