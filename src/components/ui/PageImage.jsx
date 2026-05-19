import { useState } from 'react'

export default function PageImage({
  src,
  alt = '',
  className = '',
  imgClassName = 'w-full h-full object-cover',
  loading = 'lazy',
  decoding = 'async',
  fallback = null,
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return fallback ? <div className={className}>{fallback}</div> : null
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={imgClassName}
        onError={() => setFailed(true)}
      />
    </div>
  )
}
