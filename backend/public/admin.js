// Tiny admin SPA — handles token, multi-file upload with progress, and doc list.
const $ = (q) => document.querySelector(q)

const TOKEN_KEY = 'mv-admin-token'
let TOKEN = localStorage.getItem(TOKEN_KEY) || ''

function toast(msg, kind = '') {
  const el = document.createElement('div')
  el.className = 'toast ' + kind
  el.textContent = msg
  document.getElementById('toast-host').appendChild(el)
  setTimeout(() => el.remove(), 3500)
}

function fmtBytes(n) {
  if (!n) return '–'
  if (n < 1024) return n + ' B'
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB'
  return (n / 1024 / 1024).toFixed(1) + ' MB'
}
function fmtDate(ts) {
  if (!ts) return '–'
  return new Date(ts).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

async function checkToken() {
  const r = await fetch('/api/documents')
  if (!r.ok) throw new Error('Cannot reach API')
  // Verify the token by hitting an admin endpoint (try delete on a fake id — expect 404, not 401).
  const probe = await fetch('/api/documents/__probe__', {
    method: 'DELETE',
    headers: { 'x-admin-token': TOKEN },
  })
  if (probe.status === 401) throw new Error('Invalid admin token')
  return true
}

async function refreshDocs() {
  const r = await fetch('/api/documents')
  const data = await r.json()
  $('#doc-count').textContent = `(${data.count} · ${data.totalChunks} chunks)`
  const body = $('#doc-body')
  if (!data.docs.length) {
    body.innerHTML = '<tr><td colspan="6" style="color:var(--stone-500);padding:14px 8px">No documents yet.</td></tr>'
    return
  }
  body.innerHTML = data.docs.map((d) => `
    <tr>
      <td class="col-name">${escapeHtml(d.name)}${d.title ? `<div class="col-meta">${escapeHtml(d.title)}</div>` : ''}</td>
      <td>${d.pages ?? '–'}</td>
      <td>${d.chunks}</td>
      <td>${fmtBytes(d.bytes)}</td>
      <td class="col-meta">${fmtDate(d.addedAt)}</td>
      <td><button class="btn danger" data-id="${d.id}">Delete</button></td>
    </tr>`).join('')

  body.querySelectorAll('button[data-id]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!confirm(`Remove "${btn.closest('tr').querySelector('.col-name').textContent}"?`)) return
      const id = btn.getAttribute('data-id')
      const r = await fetch('/api/documents/' + encodeURIComponent(id), {
        method: 'DELETE',
        headers: { 'x-admin-token': TOKEN },
      })
      if (r.ok) { toast('Deleted'); refreshDocs() } else { toast('Delete failed', 'error') }
    })
  })
}

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])) }

function unlockUI() {
  $('#auth-card').style.display = 'none'
  $('#upload-card').style.display = 'block'
  $('#docs-card').style.display = 'block'
  refreshDocs().catch((e) => toast(e.message, 'error'))
}

$('#save-token').addEventListener('click', async () => {
  TOKEN = $('#token').value.trim()
  if (!TOKEN) { $('#auth-msg').textContent = 'Token is required'; return }
  try {
    $('#auth-msg').textContent = 'Verifying…'
    await checkToken()
    localStorage.setItem(TOKEN_KEY, TOKEN)
    unlockUI()
    toast('Unlocked')
  } catch (e) {
    $('#auth-msg').textContent = e.message
    toast(e.message, 'error')
  }
})

// Auto-unlock if a token is already stored
if (TOKEN) {
  checkToken().then(() => unlockUI()).catch(() => { /* show auth card */ })
}

// ── Uploads ────────────────────────────────────────────────────────────
const drop = $('#drop')
const picker = $('#picker')
const ul = $('#ul')

;['dragenter', 'dragover'].forEach((ev) =>
  drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('dragover') })
)
;['dragleave', 'drop'].forEach((ev) =>
  drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('dragover') })
)
drop.addEventListener('drop', (e) => {
  const files = [...(e.dataTransfer?.files || [])].filter((f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))
  if (files.length) uploadFiles(files)
})
picker.addEventListener('change', () => {
  const files = [...picker.files]
  if (files.length) uploadFiles(files)
  picker.value = ''
})

async function uploadFiles(files) {
  // Append placeholder rows
  const rows = files.map((f) => addRow(f))

  // Send as one multipart request (Multer accepts up to 10 files)
  // We use XHR so we can show a progress bar.
  await new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/upload')
    xhr.setRequestHeader('x-admin-token', TOKEN)
    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return
      const pct = Math.min(99, Math.round((e.loaded / e.total) * 100))
      rows.forEach((r) => r.bar.style.width = pct + '%')
    }
    xhr.onload = () => {
      let data = {}
      try { data = JSON.parse(xhr.responseText) } catch {}
      if (xhr.status >= 200 && xhr.status < 300 && data.results) {
        data.results.forEach((r, i) => {
          const row = rows[i] || rows[rows.length - 1]
          row.bar.style.width = '100%'
          if (r.status === 'ok') {
            row.statusEl.textContent = 'Indexed'
            row.statusEl.className = 'status ok'
          } else if (r.status === 'duplicate') {
            row.statusEl.textContent = 'Already in index'
            row.statusEl.className = 'status duplicate'
          } else {
            row.statusEl.textContent = 'Failed'
            row.statusEl.className = 'status error'
            row.li.title = r.message || 'unknown error'
          }
        })
        toast(`Done — ${data.summary.ok} new · ${data.summary.duplicate} dup · ${data.summary.failed} failed`)
        refreshDocs()
      } else {
        rows.forEach((r) => { r.statusEl.textContent = 'Failed'; r.statusEl.className = 'status error' })
        toast(data.message || `Upload failed (${xhr.status})`, 'error')
      }
      resolve()
    }
    xhr.onerror = () => {
      rows.forEach((r) => { r.statusEl.textContent = 'Network error'; r.statusEl.className = 'status error' })
      toast('Network error', 'error')
      resolve()
    }
    const form = new FormData()
    for (const f of files) form.append('files', f)
    xhr.send(form)
  })
}

function addRow(file) {
  const li = document.createElement('li')
  li.innerHTML = `
    <span class="name">${escapeHtml(file.name)}</span>
    <span class="col-meta" style="color:var(--stone-500);font-size:11.5px">${fmtBytes(file.size)}</span>
    <span class="bar"><i style="width:5%"></i></span>
    <span class="status uploading">Uploading</span>`
  ul.prepend(li)
  return { li, bar: li.querySelector('.bar > i'), statusEl: li.querySelector('.status') }
}
