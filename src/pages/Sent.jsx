import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import RollButton from '../components/RollButton.jsx'
import Hills from '../components/Hills.jsx'
import { usePageTransition } from '../hooks/useTransition.jsx'

export default function Sent() {
  const root = useRef(null)
  const go = usePageTransition()
  useGSAP(() => {
    gsap.timeline({ delay: 0.9 })
      .from('.sn__t .ch', { yPercent: 110, stagger: 0.04, duration: 1, ease: 'power4.out' })
      .from('.sn__d, .sn .rb', { opacity: 0, y: 20, stagger: 0.12, duration: 0.8 }, 0.4)
  }, { scope: root })
  return (
    <section className="sn" ref={root}>
      <h1 className="sn__t">{'Message sent'.split('').map((c, i) => <span className="mask" key={i}><span className="ch">{c === ' ' ? '\u00a0' : c}</span></span>)}</h1>
      <p className="sn__d">Thanks for reaching out — I read every note myself and reply within two working days.</p>
      <RollButton onClick={() => go('/', 'home')}>BACK HOME</RollButton>
      <Hills tone="light" />
    </section>
  )
}
