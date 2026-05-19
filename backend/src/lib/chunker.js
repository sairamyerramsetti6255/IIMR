/**
 * Recursive character text splitter — modelled on LangChain's design but
 * implemented in ~80 lines with no deps. Splits text on the strongest
 * boundary available (double newline → sentence → space → character) so
 * chunks stay semantically coherent.
 */

const DEFAULT_SEPARATORS = ['\n\n', '\n', '. ', '? ', '! ', '; ', ', ', ' ', '']

export function chunkText(rawText, opts = {}) {
  const text = normalize(rawText)
  const size = Math.max(200, opts.chunkSize ?? 1100)
  const overlap = Math.max(0, Math.min(opts.overlap ?? 180, size - 50))
  const separators = opts.separators ?? DEFAULT_SEPARATORS

  const splits = recursiveSplit(text, separators, size)
  return mergeWithOverlap(splits, size, overlap)
}

function normalize(t) {
  return String(t || '')
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[\t\f\v]+/g, ' ')
    .trim()
}

function recursiveSplit(text, separators, size) {
  if (text.length <= size) return [text]

  const [sep, ...rest] = separators
  if (sep === '') {
    const out = []
    for (let i = 0; i < text.length; i += size) out.push(text.slice(i, i + size))
    return out
  }

  const pieces = text.split(sep)
  const out = []
  for (const piece of pieces) {
    const withSep = sep ? piece + sep : piece
    if (withSep.length > size) {
      out.push(...recursiveSplit(piece, rest, size))
    } else {
      out.push(withSep)
    }
  }
  return out
}

function mergeWithOverlap(pieces, size, overlap) {
  const chunks = []
  let buf = ''

  for (const piece of pieces) {
    if (!piece) continue
    if ((buf + piece).length <= size) {
      buf += piece
    } else {
      if (buf) chunks.push(buf.trim())
      // start the next buffer with the tail of the previous one (overlap)
      const tail = overlap > 0 && buf.length > overlap ? buf.slice(-overlap) : ''
      buf = tail + piece
      // if the single piece is itself larger than `size`, hard-split it
      while (buf.length > size) {
        chunks.push(buf.slice(0, size).trim())
        buf = (overlap > 0 ? buf.slice(size - overlap, size) : '') + buf.slice(size)
      }
    }
  }
  if (buf.trim()) chunks.push(buf.trim())
  return chunks.filter((c) => c.length >= 40)
}
