import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { awards } from '../data/content'
import Digits from '../components/Digits.jsx'
import Hills from '../components/Hills.jsx'

export default function Awards() {
  const root = useRef(null)
  const [count, setCount] = useState(0)

  useGSAP(() => {
    const q = gsap.utils.selector(root)
    const c = { v: 0 }
    gsap.to(c, {
      v: awards.total, ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'center 40%', scrub: true },
      onUpdate: () => setCount(c.v),
    })
    gsap.from(q('.aw__title .mask > span'), {
      yPercent: 110, stagger: 0.12, duration: 1.1, ease: 'power4.out',
      scrollTrigger: { trigger: q('.aw__title')[0], start: 'top 80%' },
    })
    q('.aw__row').forEach((row) => {
      gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 92%' } })
        .fromTo(row.querySelector('.aw__line'), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'expo.out' })
        .from(row.querySelectorAll('span:not(.aw__line)'), { yPercent: 100, opacity: 0, stagger: 0.06, duration: 0.6, ease: 'power3.out' }, 0.1)
    })
    gsap.to(q('.hills__l'), {
      yPercent: (i) => -i * 6, ease: 'none',
      scrollTrigger: { trigger: q('.hills')[0], start: 'top bottom', end: 'bottom top', scrub: true },
    })
  }, { scope: root })

  return (
    <section className="aw" id="awards" ref={root}>
      <div className="aw__in">
        <div className="aw__head"><span>( awards. )</span><span>[ N.003 ]</span></div>
        <Digits className="aw__count" value={count} pad={2} duration={0.4} />
        <div className="aw__top">
          <h2 className="aw__title">
            {awards.title.map((l, i) => <span className={`mask aw__t${i}`} key={l}><span>{l}</span></span>)}
          </h2>
          <p className="aw__desc">{awards.desc}</p>
        </div>
        <ul className="aw__list">
          {awards.list.map((a) => (
            <li className="aw__row" key={a.org + a.what}>
              <span className="mask"><span>{a.n}</span></span>
              <span className="mask"><span>{a.org}</span></span>
              <span className="mask"><span>{a.what}</span></span>
              <span className="aw__line" />
            </li>
          ))}
        </ul>
      </div>
      <Hills tone="light" />
    </section>
  )
}
