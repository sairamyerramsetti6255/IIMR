import { Link } from 'react-router-dom'
import { Container, Eyebrow, Button } from '../components/ui/Primitives.jsx'
import { PanicleArt } from '../components/icons/Icons.jsx'

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <Eyebrow tone="forest">404</Eyebrow>
          <h1 className="mt-3 font-display text-5xl text-ink tracking-tighter2">This panicle didn't ripen.</h1>
          <p className="mt-4 text-stone-700 max-w-prose">
            The page you're looking for doesn't exist. Try the millet encyclopedia, the resources library, or head back home.
          </p>
          <div className="mt-7 flex gap-3">
            <Button to="/">Go home</Button>
            <Button to="/millets" tone="outline">Open encyclopedia</Button>
          </div>
        </div>
        <div className="lg:col-span-5 hidden lg:flex justify-end opacity-70">
          <PanicleArt className="w-72 h-auto" />
        </div>
      </Container>
    </section>
  )
}
