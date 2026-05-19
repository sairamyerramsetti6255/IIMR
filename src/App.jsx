import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import TopBar from './components/layout/TopBar.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import MilletsIndex from './pages/MilletsIndex.jsx'
import MilletDetail from './pages/MilletDetail.jsx'
import Pop from './pages/Pop.jsx'
import Varieties from './pages/Varieties.jsx'
import Nutrition from './pages/Nutrition.jsx'
import Recipes from './pages/Recipes.jsx'
import Processing from './pages/Processing.jsx'
import SeedHub from './pages/SeedHub.jsx'
import Resources from './pages/Resources.jsx'
import About from './pages/About.jsx'
import Ask from './pages/Ask.jsx'
import NotFound from './pages/NotFound.jsx'
import ChatWidget from './components/chat/ChatWidget.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <ScrollToTop />
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/millets" element={<MilletsIndex />} />
          <Route path="/millets/:slug" element={<MilletDetail />} />
          <Route path="/package-of-practices" element={<Pop />} />
          <Route path="/varieties" element={<Varieties />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/seed-hub" element={<SeedHub />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/ask" element={<Ask />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
