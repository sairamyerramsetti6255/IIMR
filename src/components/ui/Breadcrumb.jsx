import { Link } from 'react-router-dom'
import { ChevronRight } from '../icons/Icons.jsx'

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-2xs font-semibold uppercase tracking-eyebrow text-stone-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-center gap-1.5">
            {idx > 0 && <ChevronRight className="w-3 h-3 text-stone-400" />}
            {it.to && idx < items.length - 1 ? (
              <Link to={it.to} className="hover:text-forest-700">{it.label}</Link>
            ) : (
              <span className={idx === items.length - 1 ? 'text-forest-700' : ''}>{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
