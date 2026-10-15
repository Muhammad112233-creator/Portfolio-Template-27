import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { aboutPage, about } from '../data/content'
import Footer from '../components/Footer.jsx'
import Clock from '../components/Clock.jsx'

export default function AboutPage() {
  const root = useRef(null)
  useGSAP(() => {
    const q = gsap.utils.selector(root)
    gsap.timeline({ delay: 0.9 })
      .from(q('.ap__title .ch'), { yPercent: 110, stagger: 0.04, duration: 1.1, ease: 'power4.out' })
      .from(q('.ap__sub'), { opacity: 0, y: 16, duration: 0.8 }, 0.4)
      .from(q('.ap__img'), { clipPath: 'inset(100% 0 0 0)', duration: 1.4, ease: 'expo.inOut' }, 0.2)
    gsap.to(q('.ap__img img'), { yPercent: 12, ease: 'none', scrollTrigger: { trigger: q('.ap__img')[0], scrub: true } })
    q('.ap__p').forEach((p) => gsap.from(p, { opacity: 0, y: 40, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: p, start: 'top 85%' } }))
    q('.ap__num b').forEach((b) => {
      const end = Number(b.dataset.n); const o = { v: 0 }
      gsap.to(o, { v: end, duration: 2, ease: 'power2.out', scrollTrigger: { trigger: b, start: 'top 90%' }, onUpdate: () => (b.textContent = Math.round(o.v)) })
    })
    q('.ap__step').forEach((s) => gsap.timeline({ scrollTrigger: { trigger: s, start: 'top 88%' } })
      .fromTo(s.querySelector('i'), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'expo.out' })
      .from(s.querySelectorAll('h3, p, small'), { opacity: 0, y: 20, stagger: 0.08, duration: 0.7 }, 0.15))
  }, { scope: root })

  return (
    <div className="ap" ref={root}>
      <section className="ap__hero">
        <h1 className="ap__title">
          {aboutPage.title.map((t, i) => (
            <span className={`ap__row ap__row--${i}`} key={t}>{t.split('').map((c, k) => <span className="mask" key={k}><span className="ch">{c}</span></span>)}</span>
          ))}
        </h1>
        <figure className="ap__img"><img src={about.portrait} alt="Portrait" /></figure>
        <p className="ap__sub">{aboutPage.subtitle}</p>
        <div className="ap__clock"><Clock dark /></div>
      </section>
      <section className="ap__text">
        {aboutPage.paragraphs.map((p) => <p className="ap__p" key={p.slice(0, 12)}>{p}</p>)}
      </section>
      <section className="ap__nums">
        {aboutPage.numbers.map((n) => (
          <div className="ap__num" key={n.label}><b data-n={n.n}>0</b><span>{n.label}</span></div>
        ))}
      </section>
      <section className="ap__process">
        <p className="ap__k">( process. )</p>
        {aboutPage.process.map((s, i) => (
          <div className="ap__step" key={s.t}>
            <i /><small>0{i + 1}</small><h3>{s.t}</h3><p>{s.d}</p>
          </div>
        ))}
      </section>
      <div className="paper paper--slim"><Footer /></div>
    </div>
  )
}
