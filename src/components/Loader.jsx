import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { site, works, about } from '../data/content'

// Preloads images, counts 0 → 100, spins the phrase on a ring,
// then flings the letters outward and lifts the curtain.
export default function Loader({ onDone }) {
  const root = useRef(null)
  const ring = useRef(null)
  const [pct, setPct] = useState(0)
  const phrase = site.loaderPhrase.toUpperCase().split('')

  useEffect(() => {
    const srcs = [about.portrait, ...works.map((w) => w.img)]
    let done = 0
    const prog = { v: 0 }
    const target = { v: 0 }
    srcs.forEach((s) => {
      const im = new Image()
      im.onload = im.onerror = () => { done++; target.v = (done / srcs.length) * 100 }
      im.src = s
    })
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve()

    const ctx = gsap.context(() => {
      gsap.from('.ld__ch', { opacity: 0, scale: 0.4, stagger: { each: 0.03, from: 'random' }, duration: 0.8, ease: 'power3.out' })
      gsap.to(ring.current, { rotation: 360, duration: 18, ease: 'none', repeat: -1 })
    }, root)

    const minTime = new Promise((r) => setTimeout(r, 2200))
    const tick = () => {
      prog.v += (Math.max(target.v, prog.v) - prog.v) * 0.08 + 0.15
      prog.v = Math.min(prog.v, target.v < 100 ? 92 : 100)
      setPct(prog.v)
    }
    gsap.ticker.add(tick)

    Promise.all([minTime, fontsReady, new Promise((r) => {
      const check = () => (done >= srcs.length ? r() : setTimeout(check, 60))
      check()
    })]).then(() => {
      target.v = 100
      gsap.to(prog, {
        v: 100, duration: 0.6, ease: 'power2.out', onUpdate: () => setPct(prog.v),
        onComplete: () => {
          gsap.ticker.remove(tick)
          const tl = gsap.timeline({ onComplete: onDone })
          tl.to('.ld__ch', {
            x: () => gsap.utils.random(-600, 600), y: () => gsap.utils.random(-500, 500),
            opacity: 0, rotate: () => gsap.utils.random(-180, 180), duration: 1, ease: 'power3.in', stagger: 0.008,
          }, root)
            .to('.ld__pct', { yPercent: -120, opacity: 0, duration: 0.5, ease: 'power2.in' }, '<0.3')
            .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '-=0.3')
        },
      })
    })

    return () => { gsap.ticker.remove(tick); ctx.revert() }
  }, [])

  return (
    <div className="ld" ref={root} aria-label="Loading">
      <div className="ld__ring" ref={ring}>
        {phrase.map((c, i) => (
          <span className="ld__ch" key={i} style={{ '--a': `${(360 / phrase.length) * i}deg` }}>{c}</span>
        ))}
      </div>
      <div className="ld__pct">{Math.floor(pct)}%</div>
      <div className="ld__meta"><span>{site.firstName} {site.lastName}</span><span>{site.edition}</span></div>
    </div>
  )
}
