import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ChatPanel from './ChatPanel.jsx'
import { ChatBubble, Close } from '../icons/Icons.jsx'

const STARTERS = [
  'Which millet has the highest calcium?',
  'Best pearl millet varieties for Rajasthan?',
  'How is finger millet processed industrially?',
  'Compare nutrition: ragi vs rice vs wheat.',
]

const HIDE_ON_PATHS = ['/ask']

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close on route change
  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (HIDE_ON_PATHS.includes(pathname)) return null

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close AI chat' : 'Open AI chat'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`mv-chat-fab ${open ? 'is-open' : ''}`}
      >
        {open ? <Close className="w-5 h-5" /> : <ChatBubble className="w-5 h-5" />}
        {!open && <span className="mv-chat-fab__label">Ask AI</span>}
      </button>

      {open && (
        <>
          <div className="mv-chat-backdrop md:hidden" onClick={() => setOpen(false)} />
          <div className="mv-chat-popup" role="dialog" aria-label="Millet Vista AI chat">
            <ChatPanel
              compact
              title="Millet Vista AI"
              starters={STARTERS}
              onClose={() => setOpen(false)}
            />
          </div>
        </>
      )}
    </>
  )
}
