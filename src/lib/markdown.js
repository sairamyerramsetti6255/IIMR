/**
 * Tiny zero-dependency Markdown → HTML renderer tuned for our chatbot:
 *   • headings (## ###)
 *   • bold (**), italic (*), inline code (`)
 *   • bullet & numbered lists
 *   • links [t](url)
 *   • bracket citations [1], [1][2] → clickable <sup> chips
 *   • paragraphs separated by blank lines
 *
 * This is NOT a full Markdown engine — it covers exactly what the model emits.
 */

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c])

export function renderMarkdown(src) {
  const text = String(src || '').replace(/\r\n?/g, '\n')
  const lines = text.split('\n')
  const out = []
  let i = 0

  const isList   = (l) => /^\s*[-*•]\s+/.test(l)
  const isOrdered = (l) => /^\s*\d+\.\s+/.test(l)

  while (i < lines.length) {
    const line = lines[i]

    // Skip blank
    if (!line.trim()) { i++; continue }

    // Heading
    const h = line.match(/^(#{1,4})\s+(.*)$/)
    if (h) {
      const level = Math.min(h[1].length, 4)
      out.push(`<h${level + 1}>${inline(h[2])}</h${level + 1}>`)
      i++
      continue
    }

    // Blockquote
    if (/^\s*>\s?/.test(line)) {
      const buf = []
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^\s*>\s?/, ''))
        i++
      }
      out.push(`<blockquote>${inline(buf.join(' '))}</blockquote>`)
      continue
    }

    // Unordered list
    if (isList(line)) {
      const items = []
      while (i < lines.length && isList(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\s*[-*•]\s+/, ''))}</li>`)
        i++
      }
      out.push(`<ul>${items.join('')}</ul>`)
      continue
    }
    if (isOrdered(line)) {
      const items = []
      while (i < lines.length && isOrdered(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\s*\d+\.\s+/, ''))}</li>`)
        i++
      }
      out.push(`<ol>${items.join('')}</ol>`)
      continue
    }

    // Paragraph — collect until blank or block boundary
    const para = []
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,4})\s+/.test(lines[i]) &&
      !isList(lines[i]) &&
      !isOrdered(lines[i]) &&
      !/^\s*>\s?/.test(lines[i])
    ) {
      para.push(lines[i])
      i++
    }
    out.push(`<p>${inline(para.join(' '))}</p>`)
  }

  return out.join('\n')
}

function inline(s) {
  let t = escapeHtml(s)
  // Inline code first so other rules don't touch its content
  t = t.replace(/`([^`]+)`/g, (_m, c) => `<code>${c}</code>`)
  // Bold then italic
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  t = t.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1<em>$2</em>')
  // Links
  t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_m, label, url) =>
    `<a href="${url}" target="_blank" rel="noreferrer noopener">${label}</a>`)
  // Citations like [1] or [12]
  t = t.replace(/\[(\d{1,3})\]/g, (_m, n) =>
    `<sup class="cite" data-cite="${n}" tabindex="0">[${n}]</sup>`)
  return t
}
