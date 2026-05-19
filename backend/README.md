# Millet Vista — RAG Backend

A production-grade Node.js service that powers the **Ask AI** chatbot in the
Millet Vista React app. It ingests PDFs (ICAR, IIMR, FSSAI, GoI publications),
embeds them with **Gemini `text-embedding-004`**, stores them in an on-disk
vector index, and streams citation-grounded answers via Gemini chat models.

```
┌────────────────────┐   POST /api/upload   ┌──────────────────────┐
│  Admin upload page │ ───────────────────▶ │  PDF → chunks →      │
│   (/admin)         │                      │  Gemini embeddings   │
└────────────────────┘                      │  → vectors.json      │
                                            └──────────┬───────────┘
                                                       │
┌────────────────────┐   POST /api/chat (SSE) ┌────────▼───────────┐
│  React /ask page   │ ◀──── streamed ──────  │  RAG: search       │
│  + floating widget │                        │  → Gemini answer   │
└────────────────────┘                        └────────────────────┘
```

## Features

- **Single-file vector index** (`data/vectors.json`) — atomic writes, debounced
  persistence, cosine similarity search. Suitable for ~tens of thousands of
  chunks; swap for pgvector if you outgrow it.
- **Smart text chunker** — recursive-character splitter (paragraph → sentence →
  word → char) with overlap.
- **Streamed answers** over **Server-Sent Events** — feels like ChatGPT.
- **Citation discipline** baked into the system prompt: the model must cite
  every claim with `[1] [2] …` indices that the UI turns into clickable chips.
- **Admin-protected** ingest / delete via a long random `ADMIN_TOKEN`.
- **Production hardening**: helmet, CORS, compression, rate-limit, request
  logs, structured JSON logs, graceful shutdown, health check.
- **Render-ready** — one-click `render.yaml` blueprint with persistent disk.

## Quick start (local)

```bash
cd backend
cp .env.example .env
# edit .env — at minimum set GEMINI_API_KEY and ADMIN_TOKEN
npm install
npm run dev
```

- Health:    http://localhost:8080/api/health
- Admin UI:  http://localhost:8080/admin
- API root:  http://localhost:8080/

## Ingest your PDFs (one-time, local)

We deploy on Render's **free tier**, which doesn't allow persistent disks. To
get around that we pre-build the vector index locally and commit it to git:

```bash
cd backend
npm install                            # only first time
npm run ingest:local                   # reads ../IIMR/*.pdf, writes data/vectors.json
```

The script chunks each PDF, calls Gemini for embeddings, and saves the result
to `backend/data/vectors.json`. Commit and push it:

```bash
git add backend/data/vectors.json
git commit -m "ingest: refresh vector index"
git push
```

Render auto-redeploys and the chatbot is instantly grounded in your PDFs.
To **add or update** PDFs later, drop new ones in `IIMR/`, re-run
`npm run ingest:local`, and push.

You can also ingest specific files or folders:

```bash
npm run ingest:local -- ../some-other-folder
npm run ingest:local -- ./paper1.pdf ./paper2.pdf
```

## Deploy to Render (free tier)

1. Push this repo to GitHub (you already did).
2. Render → **+ New → Blueprint** → select your repo.
3. In the **Blueprint Path** field type: `backend/render.yaml`
4. Click **Apply**. Render creates one **free** web service — no payment.
5. Open the service → **Environment** tab → fill in 3 secrets:
   - `GEMINI_API_KEY` — from <https://aistudio.google.com/apikey>
   - `ADMIN_TOKEN` — run `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
     (still required by the admin endpoints even though they no-op writes on free tier)
   - `CORS_ORIGIN` — your frontend origin, or `*` to allow all
6. Wait for deploy (~2 min). Visit `https://YOUR-SERVICE.onrender.com/api/health`
   — should show your committed chunk count.
7. In the React app set `VITE_API_BASE=https://YOUR-SERVICE.onrender.com` and
   redeploy. The chat widget and `/ask` page start answering.

> ℹ️ Free-tier limits: the service sleeps after 15 min of inactivity and
> cold-starts in ~30 s. Uploading via `/admin` succeeds but the files **won't
> persist across restarts** — that's why we ingest locally and commit
> `vectors.json`. If you outgrow the free tier, switch `plan: free` →
> `plan: starter` in `render.yaml` and add a `disk:` block (see git history).

## Environment variables

| Variable             | Default                 | Description |
| -------------------- | ----------------------- | ----------- |
| `GEMINI_API_KEY`     | **required**            | Google AI Studio API key |
| `ADMIN_TOKEN`        | **required**            | Bearer token gating `/api/upload` and delete |
| `GEMINI_CHAT_MODEL`  | `gemini-1.5-flash`      | Chat model. Bump to `gemini-1.5-pro` for higher quality |
| `GEMINI_EMBED_MODEL` | `text-embedding-004`    | Embedding model |
| `PORT`               | `8080`                  | HTTP port |
| `DATA_DIR`           | `./data`                | Where PDFs and `vectors.json` live. On Render → `/var/data` |
| `CORS_ORIGIN`        | `*`                     | Comma-separated allowed origins |
| `TOP_K`              | `6`                     | Number of chunks pulled per query |
| `CHUNK_SIZE`         | `1100`                  | Chars per chunk |
| `CHUNK_OVERLAP`      | `180`                   | Chunk overlap |

## HTTP API

| Method | Path                       | Auth   | Description |
| ------ | -------------------------- | ------ | ----------- |
| GET    | `/api/health`              | public | status, model names, chunk count |
| GET    | `/api/documents`           | public | list ingested PDFs |
| POST   | `/api/upload`              | admin  | multipart `files` (max 10, 25 MB each) |
| DELETE | `/api/documents/:id`       | admin  | remove a doc + its chunks |
| POST   | `/api/chat`                | public | streamed RAG answer (SSE) — body `{ question, history? }` |
| POST   | `/api/chat/sync`           | public | non-streaming variant — returns `{ answer, sources }` |

Admin auth: send either `Authorization: Bearer <token>` or `x-admin-token: <token>`.

## Project layout

```
backend/
├── server.js               # entry — loads env, boots app, graceful shutdown
├── render.yaml             # one-click Render blueprint
├── public/                 # admin upload UI + API landing
└── src/
    ├── app.js              # Express app, middleware, routes
    ├── config/env.js       # validated env config
    ├── lib/
    │   ├── gemini.js       # Gemini SDK wrappers (embed + chat stream)
    │   ├── pdf.js          # PDF text extraction (pdf-parse)
    │   ├── chunker.js      # recursive char splitter w/ overlap
    │   ├── vectorStore.js  # in-memory store + JSON persistence + search
    │   └── logger.js       # tiny structured logger
    ├── services/
    │   ├── ingest.js       # parse → chunk → embed → store
    │   └── chat.js         # RAG: search → build prompt → stream answer
    ├── routes/
    │   ├── health.js
    │   ├── upload.js
    │   ├── documents.js
    │   └── chat.js
    └── middleware/
        ├── auth.js         # admin token check
        └── errorHandler.js # JSON errors, async wrapper
```

## Notes & limits

- Only digital (text-embedded) PDFs work. Scanned-image PDFs need OCR first
  (e.g. via `tesseract` or Adobe) before uploading.
- The vector index is loaded entirely into memory at boot. For a typical IIMR
  corpus (~30 PDFs × ~100 pages) this is ~10 MB — trivial. For huge corpora,
  swap `vectorStore.js` for a real vector DB.
- Gemini free tier has rate limits; the chat endpoint is rate-limited at
  30 req/min per IP by default.
