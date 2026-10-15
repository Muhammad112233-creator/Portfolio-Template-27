import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { statement, site } from '../data/content'
import Split from '../components/Split.jsx'
import Clock from '../components/Clock.jsx'
import Digits from '../components/Digits.jsx'

// Pinned manifesto. Characters brighten one by one with scroll,
// a hand-drawn signature writes itself, and a tiny odometer ticks along.
export default function Statement() {
  const root = useRef(null)
  const [n, setN] = useState(1)

  useGSAP(() => {
    const chars = root.current.querySelectorAll('.st__text .ch')
    const sig = root.current.querySelector('.st__sig path')
    const len = sig.getTotalLength()
    gsap.set(sig, { strokeDasharray: len, strokeDashoffset: len })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current, start: 'top top', end: '+=180%', scrub: 0.6, pin: true,
        onUpdate: (s) => setN(1 + Math.floor(s.progress * 98)),
      },
    })
    tl.fromTo(chars, { opacity: 0.12 }, { opacity: 1, stagger: 0.02, ease: 'none' })
      .to(sig, { strokeDashoffset: 0, ease: 'none', duration: chars.length * 0.006 })
      .fromTo('.st__plus', { rotation: 0 }, { rotation: 180, ease: 'none', duration: 1 }, 0)
    ScrollTrigger.refresh()
  }, { scope: root })

  return (
    <section className="st" ref={root}>
      <div className="st__top">
        <span className="st__n">[ N. <Digits value={n} pad={3} duration={0.6} /> ]</span>
        <span className="st__plus">+</span>
        <span className="pill">craft <i>•</i></span>
      </div>
      <div className="st__body">
        <Split className="st__text" text={statement.text} />
        <svg className="st__sig" viewBox="0 0 220 90" aria-hidden="true">
          <path d="M8 70 C 30 20, 46 8, 52 30 S 40 78, 60 60 S 92 16, 100 34 S 96 72, 118 52 C 132 40, 140 30, 150 44 S 160 70, 178 50 L 212 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="st__bottom">
        <Clock />
        <span className="st__plus st__plus--b">+</span>
        <span className="st__ed">edition_{site.edition}</span>
      </div>
    </section>
  )
}
