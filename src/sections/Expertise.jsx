import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { expertise } from '../data/content'

export default function Expertise() {
  const root = useRef(null)
  useGSAP(() => {
    const q = gsap.utils.selector(root)
    const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 65%' } })
    tl.from(q('.ex__area'), { yPercent: 120, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out' })
      .from(q('.ex__dot'), { scale: 0, stagger: 0.1, duration: 0.5 }, 0.3)
      .from(q('.ex__pill'), { y: 24, opacity: 0, stagger: 0.06, duration: 0.7, ease: 'back.out(1.6)' }, 0.4)
      .from(q('.ex__stack li'), { opacity: 0, filter: 'blur(6px)', stagger: 0.05, duration: 0.6 }, 0.7)
    gsap.fromTo(q('.ex__corner'), { rotation: 0 }, { rotation: 360, ease: 'none', scrollTrigger: { trigger: root.current, scrub: true } })
  }, { scope: root })

  return (
    <section className="ex" id="expertise" ref={root}>
      <div className="ex__head"><span>( expertise. )</span><span>[ N.005 ]</span></div>
      <ul className="ex__areas">
        {expertise.areas.map((a, i) => (
          <li key={a}>
            <span className="mask"><span className="ex__area">/ {a}</span></span>
            {i < expertise.areas.length - 1 && <span className="ex__dot">•</span>}
          </li>
        ))}
      </ul>
      <ul className="ex__pills">
        {expertise.kinds.map((k) => <li className="ex__pill" key={k}>/ {k}</li>)}
      </ul>
      <ul className="ex__stack">
        {expertise.stack.map((s) => <li key={s}>{s}</li>)}
      </ul>
      <span className="ex__corner ex__corner--l">+</span>
      <span className="ex__corner ex__corner--r">+</span>
    </section>
  )
}
