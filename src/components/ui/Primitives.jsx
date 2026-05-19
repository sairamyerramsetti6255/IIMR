import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from '../icons/Icons.jsx'

export const Container = ({ children, className = '' }) => (
  <div className={`mx-auto w-full max-w-8xl px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
)

export const Eyebrow = ({ children, tone = 'forest', className = '' }) => {
  const tones = {
    forest: 'text-forest-600',
    millet: 'text-millet-600',
    clay: 'text-clay-600',
    paper: 'text-paper-300',
    light: 'text-millet-200',
  }
  return (
    <div className={`flex items-center gap-3 text-2xs font-semibold uppercase tracking-eyebrow ${tones[tone]} ${className}`}>
      <span className="h-px w-6 bg-current/30" style={{ background: 'currentColor', opacity: 0.4 }} />
      <span>{children}</span>
    </div>
  )
}

export const SectionTitle = ({ eyebrow, title, lede, tone = 'forest', align = 'left', children }) => (
  <div className={`mb-10 ${align === 'center' ? 'text-center mx-auto' : ''} max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
    {eyebrow && <Eyebrow tone={tone} className={align === 'center' ? 'justify-center' : ''}>{eyebrow}</Eyebrow>}
    <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.7rem] leading-[1.05] font-display font-medium tracking-tight2 text-ink text-balance">
      {title}
    </h2>
    {lede && <p className="mt-4 text-lg text-stone-600 max-w-prose text-pretty">{lede}</p>}
    {children}
  </div>
)

export const Tag = ({ children, tone = 'paper', className = '' }) => {
  const tones = {
    paper: 'bg-paper-200/70 text-stone-700 ring-stone-300',
    forest: 'bg-forest-700/8 text-forest-800 ring-forest-700/20',
    millet: 'bg-millet-100 text-millet-800 ring-millet-300',
    clay: 'bg-clay-100 text-clay-800 ring-clay-300',
    ink: 'bg-ink text-paper ring-ink',
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-2xs font-semibold uppercase tracking-eyebrow ring-1 ${tones[tone]} ${className}`}>
      {children}
    </span>
  )
}

export const Stat = ({ value, label, caption, tone = 'forest' }) => (
  <div className="flex flex-col">
    <Eyebrow tone={tone} className="!gap-2">{label}</Eyebrow>
    <div className="mt-3 font-display text-[2.4rem] sm:text-5xl leading-none tracking-tighter2 text-ink tabular">{value}</div>
    {caption && <div className="mt-2 text-sm text-stone-500">{caption}</div>}
  </div>
)

export const Button = ({ to, href, children, tone = 'forest', size = 'md', icon: Icon = ArrowRight, className = '', ...rest }) => {
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-5 py-3 text-sm', lg: 'px-7 py-4 text-base' }
  const tones = {
    forest: 'bg-forest-700 text-paper hover:bg-forest-800 ring-forest-700',
    millet: 'bg-millet-500 text-paper hover:bg-millet-600 ring-millet-500',
    outline: 'bg-transparent text-forest-800 ring-1 ring-forest-700/30 hover:bg-forest-700/8',
    ghost: 'bg-transparent text-forest-800 hover:bg-forest-700/8',
    paper: 'bg-paper text-forest-800 ring-1 ring-forest-700/15 hover:bg-paper-200',
  }
  const cls = `inline-flex items-center gap-2 font-semibold rounded-full transition-colors ${sizes[size]} ${tones[tone]} ${className}`
  const inner = (
    <>
      <span>{children}</span>
      {Icon && <Icon className="w-4 h-4" />}
    </>
  )
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>
  if (href) return <a href={href} target="_blank" rel="noreferrer" className={cls} {...rest}>{inner}</a>
  return <button className={cls} {...rest}>{inner}</button>
}

export const InfoRow = ({ label, value }) => (
  <div className="flex items-start gap-4 py-2 border-b border-stone-200/70 last:border-0">
    <dt className="w-40 shrink-0 text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold pt-0.5">{label}</dt>
    <dd className="text-sm text-ink leading-relaxed">{value}</dd>
  </div>
)

export const Callout = ({ children, tone = 'forest', title }) => {
  const tones = {
    forest: 'bg-forest-700/5 ring-forest-700/15 text-forest-900',
    millet: 'bg-millet-100/60 ring-millet-300 text-millet-900',
    clay: 'bg-clay-100/60 ring-clay-300 text-clay-900',
  }
  return (
    <div className={`rounded-2xl ring-1 px-5 py-4 ${tones[tone]}`}>
      {title && <div className="font-semibold text-sm mb-1">{title}</div>}
      <div className="text-sm text-pretty">{children}</div>
    </div>
  )
}

export const Divider = ({ className = '' }) => <hr className={`border-stone-200 ${className}`} />

export const FilterChips = ({ value, onChange, options }) => (
  <div className="flex flex-wrap gap-2">
    {options.map((o) => {
      const active = value === o.id || value === o.value
      return (
        <button
          key={o.id || o.value}
          onClick={() => onChange(o.id || o.value)}
          className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ring-1 ${
            active
              ? 'bg-forest-700 text-paper ring-forest-700'
              : 'bg-paper text-stone-700 ring-stone-300 hover:bg-paper-200'
          }`}
        >
          {o.label}
        </button>
      )
    })}
  </div>
)

export const ExternalLink = ({ href, children, className = '' }) => (
  <a href={href} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1 underline-link ${className}`}>
    {children}
    <ArrowUpRight className="w-3.5 h-3.5" />
  </a>
)

export const Hairline = ({ className = '' }) => (
  <div className={`h-px w-full bg-gradient-to-r from-transparent via-forest-700/15 to-transparent ${className}`} />
)

export const Pill = ({ children, className = '' }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-2xs font-medium bg-paper-200/80 text-stone-700 ${className}`}>{children}</span>
)
