import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollProvider, useScroll } from './hooks/useScroll.jsx'
import { TransitionProvider } from './hooks/useTransition.jsx'
import Loader from './components/Loader.jsx'
import Header from './components/Header.jsx'
import Cursor from './components/Cursor.jsx'
import Home from './pages/Home.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CasePage from './pages/CasePage.jsx'
import Sent from './pages/Sent.jsx'
import NotFound from './pages/NotFound.jsx'

function RouteReset() {
  const { pathname } = useLocation()
  const scroll = useScroll()
  useEffect(() => {
    scroll.to(0, { immediate: true, force: true })
    const id = setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => clearTimeout(id)
  }, [pathname])
  return null
}

function Shell() {
  const [loaded, setLoaded] = useState(false)
  const scroll = useScroll()
  useEffect(() => {
    if (!scroll.ready) return
    loaded ? scroll.start() : scroll.stop()
  }, [loaded, scroll.ready])

  return (
    <>
      <Cursor />
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Header />
      <RouteReset />
      <main>
        <Routes>
          <Route path="/" element={<Home started={loaded} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work/:slug" element={<CasePage />} />
          <Route path="/sent" element={<Sent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default function App() {
  return (
    <ScrollProvider>
      <TransitionProvider>
        <Shell />
      </TransitionProvider>
    </ScrollProvider>
  )
}
