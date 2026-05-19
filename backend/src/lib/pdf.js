/**
 * PDF text extraction. We use `pdf-parse` which is a thin wrapper around
 * pdf.js that returns full text + metadata. It's small and reliable for
 * standard digital PDFs (the ones IIMR publishes).
 *
 * Scanned-image PDFs (no embedded text) won't extract — we surface a clear
 * error so the operator knows to OCR them first.
 */
import pdfParse from 'pdf-parse/lib/pdf-parse.js' // skip the bundled debug entry

const MAX_BYTES = 25 * 1024 * 1024 // 25 MB safety cap per file

export async function extractPdf(buffer, originalName = 'document.pdf') {
  if (!Buffer.isBuffer(buffer)) throw new TypeError('buffer must be a Buffer')
  if (buffer.length === 0) throw new Error('PDF buffer is empty')
  if (buffer.length > MAX_BYTES) {
    throw new Error(`PDF exceeds the ${Math.round(MAX_BYTES / 1024 / 1024)} MB limit`)
  }
  // Quick magic-bytes sanity check
  if (buffer.slice(0, 4).toString('ascii') !== '%PDF') {
    throw new Error('File is not a valid PDF (missing %PDF header)')
  }

  const data = await pdfParse(buffer)
  const text = (data.text || '').replace(/\u0000/g, '').trim()

  if (!text || text.length < 40) {
    throw new Error(
      `PDF "${originalName}" yielded almost no text — it may be a scanned image. OCR it first.`
    )
  }

  return {
    text,
    numPages: data.numpages || 0,
    info: data.info || {},
    bytes: buffer.length,
  }
}
