import { Container, Eyebrow } from './Primitives.jsx'
import PageImage from './PageImage.jsx'

/** Full-width page banner with optional photo */
export default function PageHero({ src, alt, eyebrow, title, lede, children, height = 'h-[min(42vh,420px)]' }) {
  return (
    <section className="relative border-b border-stone-200 overflow-hidden bg-forest-900">
      <PageImage
        src={src}
        alt={alt}
        className={`absolute inset-0 ${height} min-h-[280px]`}
        imgClassName="w-full h-full object-cover opacity-90"
        loading="eager"
        fallback={<div className={`absolute inset-0 bg-gradient-to-br from-forest-800 via-forest-700 to-millet-800 ${height} min-h-[280px]`} />}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-900/85 via-forest-900/40 to-forest-900/20" aria-hidden />
      <Container className="relative py-14 lg:py-20 text-paper">
        {eyebrow && <Eyebrow tone="paper" className="!text-millet-300">{eyebrow}</Eyebrow>}
        {title && (
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.05] tracking-tighter2 text-balance max-w-4xl">
            {title}
          </h1>
        )}
        {lede && <p className="mt-5 text-lg text-paper-200/90 max-w-2xl text-pretty">{lede}</p>}
        {children}
      </Container>
    </section>
  )
}
