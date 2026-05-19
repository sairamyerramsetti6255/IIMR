#!/usr/bin/env node
/**
 * Local CLI ingester.
 *
 *   npm run ingest:local                       # ingests every PDF in IIMR/
 *   npm run ingest:local -- path/to/dir        # ingests every PDF in that dir
 *   npm run ingest:local -- file1.pdf file2.pdf
 *
 * Produces (or updates) backend/data/vectors.json. Commit that file to git
 * so the deployed backend can serve answers immediately on boot — no need
 * for a persistent disk on Render.
 *
 * Requires GEMINI_API_KEY in .env (or in the shell env).
 */
import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { vectorStore } from '../src/lib/vectorStore.js'
import { ingestPdf } from '../src/services/ingest.js'
import { env } from '../src/config/env.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..', '..')

const c = {
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  dim:  (s) => `\x1b[2m${s}\x1b[0m`,
  ok:   (s) => `\x1b[32m${s}\x1b[0m`,
  warn: (s) => `\x1b[33m${s}\x1b[0m`,
  err:  (s) => `\x1b[31m${s}\x1b[0m`,
}

async function expandArgs(args) {
  if (args.length === 0) {
    const dir = path.join(repoRoot, 'IIMR')
    if (!(await exists(dir))) {
      console.error(c.err(`Default folder not found: ${dir}`))
      console.error('  Pass an explicit folder or files, e.g.: npm run ingest:local -- ./some/dir')
      process.exit(1)
    }
    return collectPdfs(dir)
  }

  const out = []
  for (const raw of args) {
    const p = path.resolve(raw)
    const stat = await fs.stat(p).catch(() => null)
    if (!stat) { console.warn(c.warn(`skip (missing): ${p}`)); continue }
    if (stat.isDirectory()) out.push(...await collectPdfs(p))
    else if (p.toLowerCase().endsWith('.pdf')) out.push(p)
    else console.warn(c.warn(`skip (not a pdf): ${p}`))
  }
  return out
}

async function collectPdfs(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const out = []
  for (const e of entries) {
    if (e.isFile() && e.name.toLowerCase().endsWith('.pdf')) {
      out.push(path.join(dir, e.name))
    }
  }
  return out.sort()
}

async function exists(p) { return fs.access(p).then(() => true).catch(() => false) }

function fmt(n) { return Intl.NumberFormat('en-US').format(n) }
function pad(s, n) { return String(s).padEnd(n) }

async function main() {
  const args = process.argv.slice(2)
  console.log()
  console.log(c.bold('▍ Millet Vista — local PDF ingester'))
  console.log(c.dim(`  index file: ${path.relative(repoRoot, env.INDEX_FILE)}`))
  console.log(c.dim(`  embed model: ${env.GEMINI_EMBED_MODEL}`))
  console.log()

  await vectorStore.load()
  console.log(c.dim(`  pre-existing: ${fmt(vectorStore.size())} chunks across ${vectorStore.listDocs().length} docs`))
  console.log()

  const files = await expandArgs(args)
  if (files.length === 0) {
    console.log(c.warn('No PDFs found. Nothing to do.'))
    return
  }
  console.log(c.bold(`Found ${files.length} PDF${files.length === 1 ? '' : 's'} to ingest:`))
  for (const f of files) console.log('  · ' + path.relative(repoRoot, f))
  console.log()

  let ok = 0, dup = 0, fail = 0
  const t0 = Date.now()

  for (let i = 0; i < files.length; i++) {
    const filepath = files[i]
    const name = path.basename(filepath)
    process.stdout.write(`[${pad(`${i + 1}/${files.length}`, 5)}] ${pad(name, 60).slice(0, 60)} … `)
    try {
      const buffer = await fs.readFile(filepath)
      const t = Date.now()
      const r = await ingestPdf({ buffer, originalName: name })
      const ms = Date.now() - t
      if (r.status === 'ok') {
        process.stdout.write(c.ok(`ok  ${r.doc.chunks} chunks · ${ms}ms`) + '\n')
        ok++
      } else if (r.status === 'duplicate') {
        process.stdout.write(c.dim('dup (skipped)') + '\n')
        dup++
      } else {
        process.stdout.write(c.warn(r.reason || r.status) + '\n')
      }
    } catch (err) {
      process.stdout.write(c.err('FAIL ' + (err?.message || err)) + '\n')
      fail++
    }
  }

  // Final force-save (ingestPdf already saves, but just to be safe)
  await vectorStore.save()

  const totalMs = Date.now() - t0
  console.log()
  console.log(c.bold('────────────────────────────────────────────'))
  console.log(`  new      : ${c.ok(ok)}`)
  console.log(`  duplicate: ${c.dim(dup)}`)
  console.log(`  failed   : ${fail > 0 ? c.err(fail) : 0}`)
  console.log(`  total    : ${fmt(vectorStore.size())} chunks · ${vectorStore.listDocs().length} docs`)
  console.log(`  elapsed  : ${Math.round(totalMs / 1000)} s`)
  console.log()
  console.log(c.bold('Next step:'))
  console.log(c.dim('  git add backend/data/vectors.json'))
  console.log(c.dim('  git commit -m "ingest: refresh vector index"'))
  console.log(c.dim('  git push'))
  console.log()
}

main().catch((err) => {
  console.error()
  console.error(c.err('Fatal error: ') + (err?.message || err))
  if (err?.stack) console.error(c.dim(err.stack))
  process.exit(1)
})
