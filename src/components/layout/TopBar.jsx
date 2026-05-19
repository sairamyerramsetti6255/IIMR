import { Container } from '../ui/Primitives.jsx'

export default function TopBar() {
  return (
    <div className="bg-ink text-paper/90 text-[10.5px]">
      <Container className="flex items-center justify-between h-7">
        <div className="flex items-center gap-3 min-w-0">
          <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.14em] whitespace-nowrap">
            <span className="inline-block w-1 h-1 rounded-full bg-millet-400" />
            Govt. of India
          </span>
          <span className="hidden sm:inline opacity-50">·</span>
          <span className="hidden sm:inline uppercase tracking-[0.12em] opacity-70 truncate">
            International Year of Millets 2023+
          </span>
          <span className="hidden lg:inline opacity-50">·</span>
          <span className="hidden lg:inline opacity-60 truncate">Aligned to ICAR–IIMR, Hyderabad</span>
        </div>
        <div className="hidden md:flex items-center gap-3 opacity-80">
          <a href="#" className="hover:text-millet-300 transition-colors">हिंदी</a>
          <span className="opacity-30">|</span>
          <a href="#" className="hover:text-millet-300 transition-colors font-semibold">EN</a>
          <span className="opacity-30">|</span>
          <a href="#" className="hover:text-millet-300 transition-colors">A− A A+</a>
          <span className="opacity-30">|</span>
          <a href="#main" className="hover:text-millet-300 transition-colors">Skip to content</a>
        </div>
      </Container>
    </div>
  )
}
