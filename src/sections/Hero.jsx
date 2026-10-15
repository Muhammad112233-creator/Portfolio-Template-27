import { lazy, Suspense, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { hero, site } from '../data/content'

const Cairn = lazy(() => import('../three/Cairn.jsx'))

// Full-screen sage stage with the 3D cairn. The section is pinned while
// the cairn sinks and the tagline drifts apart.
export default function Hero({ started }) {
  const root = useRef(null)
  const progress = useRef(0)
  const pointer = useRef({ x: 0, y: 0 })

  useGSAP(() => {
    const move = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', move)

    gsap.timeline({
      scrollTrigger: {
        trigger: root.current, start: 'top top', end: '+=120%', scrub: true, pin: true,
        onUpdate: (s) => (progress.current = s.progress),
      },
    })
      .to('.hero__line--a', { xPercent: -30, opacity: 0, ease: 'none' }, 0)
      .to('.hero__line--b', { xPercent: 30, opacity: 0, ease: 'none' }, 0)
      .to('.hero__vignette', { opacity: 1, ease: 'none' }, 0)
      .to('.hero__scroll', { opacity: 0, ease: 'none', duration: 0.2 }, 0)

    return () => window.removeEventListener('pointermove', move)
  }, { scope: root })

  useGSAP(() => {
    if (!started) return
    gsap.timeline({ delay: 0.15 })
      .from('.cairn', { opacity: 0, scale: 1.08, duration: 2, ease: 'power2.out' })
      .from('.hero__line .ch', { yPercent: 110, stagger: 0.025, duration: 0.9, ease: 'power3.out' }, 0.5)
      .from('.hero__scroll, .hero__corner', { opacity: 0, y: 12, stagger: 0.1, duration: 0.8 }, 1)
  }, { scope: root, dependencies: [started] })

  return (
    <section className="hero" ref={root}>
      <div className="hero__bg" />
      <Suspense fallback={null}><Cairn progress={progress} pointer={pointer} /></Suspense>
      <div className="hero__vignette" />
      <h1 className="hero__title">
        {hero.line.map((l, i) => (
          <span className={`hero__line hero__line--${i ? 'b' : 'a'}`} key={i}>
            {l.split('').map((c, k) => (
              <span className="mask" key={k}><span className="ch">{c === ' ' ? '\u00a0' : c}</span></span>
            ))}
          </span>
        ))}
      </h1>
      <p className="hero__corner hero__corner--l">[ {site.city.toUpperCase()} ]</p>
      <p className="hero__corner hero__corner--r">{site.role.toLowerCase()}</p>
      <div className="hero__scroll"><span>scroll</span><i /></div>
    </section>
  )
}
