import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ScrollCtx = createContext(null)
export const useScroll = () => useContext(ScrollCtx)

export function ScrollProvider({ children }) {
  const lenisRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setReady(true)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  const api = {
    lenis: () => lenisRef.current,
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
    to: (target, opts = {}) => lenisRef.current?.scrollTo(target, { duration: 1.6, easing: (x) => 1 - Math.pow(1 - x, 4), ...opts }),
    ready,
  }
  return <ScrollCtx.Provider value={api}>{children}</ScrollCtx.Provider>
}
