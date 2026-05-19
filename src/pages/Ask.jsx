import { useEffect, useState } from 'react'
import { Container, Eyebrow } from '../components/ui/Primitives.jsx'
import ChatPanel from '../components/chat/ChatPanel.jsx'
import { chatApi } from '../lib/chatApi.js'
import { Doc, Sparkle } from '../components/icons/Icons.jsx'

const STARTERS = [
  'Which millet has the highest calcium content?',
  'Best pearl millet varieties for Rajasthan in kharif?',
  'How is finger millet processed industrially?',
  'Compare nutrition of ragi, rice and wheat.',
  'What are the recommended POPs for sorghum in Maharashtra?',
  'Health benefits of foxtail millet for diabetics?',
]

export default function Ask() {
  const [health, setHealth] = useState(null)
  const [docs, setDocs] = useState({ count: 0, totalChunks: 0, docs: [] })
  const [err, setErr] = useState(null)

  useEffect(() => {
    chatApi.health().then(setHealth).catch(() => {
      setErr('The AI service is offline. Check that the backend is deployed and the VITE_API_BASE env var points to it.')
    })
    chatApi.listDocuments().then(setDocs).catch(() => {})
  }, [])

  return (
    <section className="bg-paper-50 min-h-[calc(100dvh-110px)]">
      <Container className="py-8 lg:py-10">
        <header className="mb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <Eyebrow tone="forest">Conversational reference</Eyebrow>
            <h1 className="mt-3 font-display text-4xl lg:text-5xl text-ink tracking-tight2 text-balance">
              Ask the <span className="italic text-forest-700">Millet Vista AI</span>
            </h1>
            <p className="mt-3 text-stone-600 max-w-2xl text-pretty">
              A grounded chatbot trained on the same ICAR, IIMR, FSSAI and GoI publications that anchor this portal. Every answer cites its sources.
            </p>
          </div>
          {health && (
            <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-stone-500 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-forest-700">
                <span className="w-1.5 h-1.5 rounded-full bg-forest-700" /> online
              </span>
              <span>·</span>
              <span>{health.chunks} chunks · {health.docs} PDFs</span>
              <span>·</span>
              <span className="tabular">{health.models?.chat}</span>
            </div>
          )}
        </header>

        {err ? (
          <div className="rounded-2xl border border-clay-200 bg-clay-50 text-clay-700 p-6">
            <div className="text-2xs uppercase tracking-eyebrow text-clay-700 font-semibold">Backend offline</div>
            <p className="mt-2 text-sm">{err}</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">
            <div className="bg-paper rounded-3xl border border-stone-200 shadow-card overflow-hidden min-h-[640px] flex">
              <ChatPanel starters={STARTERS} title="Millet Vista AI" />
            </div>

            <aside className="hidden lg:flex flex-col gap-4 sticky top-24">
              <div className="rounded-2xl border border-stone-200 bg-paper p-5">
                <div className="text-2xs uppercase tracking-eyebrow text-forest-700 font-semibold flex items-center gap-2">
                  <Sparkle className="w-3.5 h-3.5" /> Try asking
                </div>
                <ul className="mt-3 space-y-2 text-[13px]">
                  {STARTERS.map((s) => (
                    <li key={s} className="text-stone-700 leading-snug border-l-2 border-millet-400 pl-3">{s}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-paper p-5">
                <div className="text-2xs uppercase tracking-eyebrow text-forest-700 font-semibold flex items-center gap-2">
                  <Doc className="w-3.5 h-3.5" /> Knowledge base
                </div>
                {docs.docs.length === 0 ? (
                  <p className="mt-3 text-sm text-stone-600">No documents have been indexed yet. Open the backend admin page and upload PDFs.</p>
                ) : (
                  <>
                    <p className="mt-3 text-sm text-stone-600">
                      <span className="font-semibold text-ink tabular">{docs.count}</span> PDFs · <span className="tabular">{docs.totalChunks}</span> searchable chunks
                    </p>
                    <ul className="mt-3 space-y-1 text-[12.5px] text-stone-700 max-h-72 overflow-y-auto pr-1">
                      {docs.docs.slice(0, 20).map((d, i) => (
                        <li key={d.id} className="flex items-baseline gap-2 leading-snug py-0.5">
                          <span className="text-[10px] text-millet-500 tabular shrink-0 w-4">{String(i + 1).padStart(2, '0')}</span>
                          <span className="truncate" title={d.name}>{d.name}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="rounded-2xl border border-stone-200 bg-paper-50 p-5">
                <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">Editorial standard</div>
                <ul className="mt-3 space-y-2 text-[12.5px] text-stone-600">
                  <li>Answers grounded only in uploaded sources.</li>
                  <li>Inline numeric citations [1][2] link back to source cards.</li>
                  <li>If unsure, the assistant says so — it doesn't guess.</li>
                </ul>
              </div>
            </aside>
          </div>
        )}
      </Container>
    </section>
  )
}
