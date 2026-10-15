import { createContext, useContext, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

const Ctx = createContext(null)
export const usePageTransition = () => useContext(Ctx)

// A sage curtain rises with the destination name spelled letter by letter,
// the route swaps underneath, then the curtain leaves through the top.
export function TransitionProvider({ children }) {
  const navigate = useNavigate()
  const panel = useRef(null)
  const [label, setLabel] = useState('')
  const busy = useRef(false)

  const go = useCallback((to, name = '') => {
    if (busy.current) return
    busy.current = true
    setLabel(name || 'loading')
    requestAnimationFrame(() => {
      const letters = panel.current.querySelectorAll('.pt__l')
      const tl = gsap.timeline({ onComplete: () => (busy.current = false) })
      tl.set(panel.current, { yPercent: 100, visibility: 'visible' })
        .set(letters, { yPercent: 110 })
        .to(panel.current, { yPercent: 0, duration: 0.8, ease: 'expo.inOut' })
        .to(letters, { yPercent: 0, stagger: 0.035, duration: 0.6, ease: 'power3.out' }, '-=0.25')
        .add(() => {
          navigate(to)
          window.scrollTo(0, 0)
        })
        .to(letters, { yPercent: -110, stagger: 0.025, duration: 0.5, ease: 'power3.in' }, '+=0.25')
        .to(panel.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '-=0.2')
        .set(panel.current, { visibility: 'hidden' })
    })
  }, [navigate])

  return (
    <Ctx.Provider value={go}>
      {children}
      <div className="pt" ref={panel} aria-hidden="true">
        <div className="pt__word">
          {label.split('').map((c, i) => (
            <span className="pt__m" key={i}><span className="pt__l">{c === ' ' ? '\u00a0' : c}</span></span>
          ))}
        </div>
      </div>
    </Ctx.Provider>
  )
}
