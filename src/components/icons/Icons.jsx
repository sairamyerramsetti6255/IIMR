// Hand-built inline SVG icons. No emoji, no icon-font dependencies.

const base = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const Panicle = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="M12 3v18" />
    <ellipse cx="12" cy="5.5" rx="1.6" ry="2.2" />
    <ellipse cx="9" cy="8.5" rx="1.6" ry="2.2" />
    <ellipse cx="15" cy="8.5" rx="1.6" ry="2.2" />
    <ellipse cx="12" cy="11.5" rx="1.6" ry="2.2" />
    <ellipse cx="9" cy="14.5" rx="1.6" ry="2.2" />
    <ellipse cx="15" cy="14.5" rx="1.6" ry="2.2" />
    <ellipse cx="12" cy="17.5" rx="1.6" ry="2.2" />
  </svg>
)

export const Grain = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <ellipse cx="12" cy="12" rx="4" ry="7" />
    <path d="M12 5v14" />
  </svg>
)

export const Leaf = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14Z" />
    <path d="M5 19l9-9" />
  </svg>
)

export const Drop = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="M12 3c3.5 4 6 7 6 10a6 6 0 1 1-12 0c0-3 2.5-6 6-10Z" />
  </svg>
)

export const Sun = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <circle cx="12" cy="12" r="3.5" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
  </svg>
)

export const Heart = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
  </svg>
)

export const Pulse = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="M3 12h4l2-5 4 10 2-5h6" />
  </svg>
)

export const Shield = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />
  </svg>
)

export const Sparkle = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
  </svg>
)

export const Scale = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="M12 4v16M5 8h14" />
    <path d="M8 8l-3 6a3 3 0 0 0 6 0L8 8Z" />
    <path d="M16 8l-3 6a3 3 0 0 0 6 0L16 8Z" />
  </svg>
)

export const Baby = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <circle cx="12" cy="8" r="3" />
    <path d="M10 9.5c0 1 .9 2 2 2s2-1 2-2" />
    <path d="M6 21c0-3 3-5 6-5s6 2 6 5" />
  </svg>
)

export const WheatOff = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="M3 21l18-18" />
    <path d="M7 17c-2 0-4-2-4-4 2 0 4 2 4 4Z" />
    <path d="M11 13c-2 0-4-2-4-4 2 0 4 2 4 4Z" />
    <path d="M15 9c-2 0-4-2-4-4 2 0 4 2 4 4Z" />
  </svg>
)

export const Search = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

export const ArrowRight = ({ className = 'w-4 h-4', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

export const ArrowUpRight = ({ className = 'w-4 h-4', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export const ChevronDown = ({ className = 'w-4 h-4', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const ChevronRight = ({ className = 'w-4 h-4', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="m9 6 6 6-6 6" />
  </svg>
)

export const Close = ({ className = 'w-4 h-4', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
)

export const Doc = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="M14 3H6v18h12V7l-4-4Z" />
    <path d="M14 3v4h4" />
    <path d="M9 13h6M9 17h6" />
  </svg>
)

export const Globe = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 3 4 6 4 9s-1.5 6-4 9c-2.5-3-4-6-4-9s1.5-6 4-9Z" />
  </svg>
)

export const Factory = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="M3 21V10l5 3V10l5 3V10l5 3v8H3Z" />
    <path d="M7 17h2M11 17h2M15 17h2" />
  </svg>
)

export const Seed = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="M12 4c4 3 6 6 6 10a6 6 0 1 1-12 0c0-4 2-7 6-10Z" />
    <path d="M12 21V9" />
  </svg>
)

export const Book = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="M4 4h12a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2V4Z" />
    <path d="M4 4v14a2 2 0 0 0 2 2h12" />
  </svg>
)

export const Beaker = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="M9 3v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-10V3" />
    <path d="M8 3h8" />
    <path d="M6 15h12" />
  </svg>
)

export const Carrot = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="M3 21c4-1 9-5 13-9l-4-4C8 12 4 17 3 21Z" />
    <path d="M14 5l1-2M17 6l3-1M16 9l2 1" />
  </svg>
)

export const Check = ({ className = 'w-4 h-4', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="m5 12 5 5 9-12" />
  </svg>
)

export const ChatBubble = ({ className = 'w-5 h-5', stroke = 'currentColor' }) => (
  <svg {...base} className={className} stroke={stroke}>
    <path d="M21 12a8 8 0 0 1-11.7 7.1L4 21l1.9-5.3A8 8 0 1 1 21 12Z" />
    <path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" strokeWidth="2.2" />
  </svg>
)

// Decorative panicle composition for the hero
export const PanicleArt = ({ className = '', primary = '#1B2046', accent = '#F4B942' }) => (
  <svg className={className} viewBox="0 0 320 420" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pg1" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor={accent} stopOpacity="0.95"/>
        <stop offset="100%" stopColor={primary} stopOpacity="0.85"/>
      </linearGradient>
    </defs>
    {/* center stalk */}
    <path d="M160 30 L160 410" stroke={primary} strokeWidth="2.5" strokeLinecap="round" />
    {/* clusters */}
    {Array.from({ length: 9 }).map((_, i) => {
      const y = 60 + i * 38
      const xL = 130 - (i % 2 === 0 ? 6 : 14)
      const xR = 190 + (i % 2 === 0 ? 6 : 14)
      return (
        <g key={i}>
          <ellipse cx={xL} cy={y} rx="9" ry="13" fill="url(#pg1)" opacity={0.92} />
          <ellipse cx={xR} cy={y} rx="9" ry="13" fill="url(#pg1)" opacity={0.92} />
          <ellipse cx={160} cy={y + 4} rx="10" ry="14" fill="url(#pg1)" />
          {/* fine strokes */}
          <path d={`M160 ${y - 8} L${xL + 2} ${y - 3}`} stroke={primary} strokeWidth="1" opacity="0.5"/>
          <path d={`M160 ${y - 8} L${xR - 2} ${y - 3}`} stroke={primary} strokeWidth="1" opacity="0.5"/>
        </g>
      )
    })}
    {/* leaf */}
    <path d="M60 250 Q120 220 158 280" stroke={primary} strokeWidth="2" fill="none" />
    <path d="M260 250 Q200 220 162 280" stroke={primary} strokeWidth="2" fill="none" />
  </svg>
)
