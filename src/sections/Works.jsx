import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { works } from '../data/content'
import { usePageTransition } from '../hooks/useTransition.jsx'
import Hills from '../components/Hills.jsx'

// Project names zig-zag down the page. Hovering one floats its cover
// next to the cursor with a little inertia and tilt.
export default function Works() {
  const root = useRef(null)
  const float = useRef(null)
  const last = useRef({ x: 0, y: 0 })
  const go = usePageTransition()

  useGSAP(() => {
    const q = gsap.utils.selector(root)
    q('.wk__item').forEach((el) => {
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%' } })
        .from(el.querySelector('.wk__name'), { yPercent: 100, opacity: 0, duration: 0.9, ease: 'power3.out' })
        .fromTo(el.querySelector('.wk__line'), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'expo.out' }, 0.1)
    })
    gsap.from(q('.wk__center .ch'), {
      opacity: 0.1, stagger: 0.03, ease: 'none',
      scrollTrigger: { trigger: q('.wk__center')[0], start: 'top 80%', end: 'top 40%', scrub: true },
    })
    gsap.to(q('.hills__l'), {
      yPercent: (i) => i * 5, ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'center top', scrub: true },
    })

    const fx = gsap.quickTo(float.current, 'x', { duration: 0.6, ease: 'power3' })
    const fy = gsap.quickTo(float.current, 'y', { duration: 0.6, ease: 'power3' })
    const fr = gsap.quickTo(float.current, 'rotate', { duration: 0.8, ease: 'power3' })
    let lastX = 0
    const move = (e) => {
      const r = root.current.getBoundingClientRect()
      last.current = { x: e.clientX, y: e.clientY }
      fx(e.clientX - r.left); fy(e.clientY - r.top)
      fr(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6)); lastX = e.clientX
    }
    root.current.addEventListener('pointermove', move)
    return () => root.current?.removeEventListener('pointermove', move)
  }, { scope: root })

  const show = (i, el) => {
    // snap to the pointer (or the hovered row) before fading in, so it never pops in from a corner
    const r = root.current.getBoundingClientRect()
    const b = el?.getBoundingClientRect()
    const x = last.current.x || (b ? b.left + b.width / 2 : 0)
    const y = last.current.y || (b ? b.top : 0)
    if (Number(gsap.getProperty(float.current, 'opacity')) < 0.05) gsap.set(float.current, { x: x - r.left, y: y - r.top })
    const imgs = float.current.querySelectorAll('img')
    imgs.forEach((im, k) => gsap.to(im, { opacity: k === i ? 1 : 0, scale: k === i ? 1 : 1.15, duration: 0.5 }))
    gsap.to(float.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' })
  }
  const hide = () => gsap.to(float.current, { scale: 0.6, opacity: 0, duration: 0.4, ease: 'power3.in' })

  const center = 'a few recent pieces'
  return (
    <section className="wk" id="works" ref={root}>
      <Hills tone="dark" flip />
      <div className="wk__head"><span>( works. )</span><span>[ N.004 ]</span></div>
      <ul className="wk__list" onPointerLeave={hide}>
        {works.map((w, i) => (
          <li className={`wk__item wk__item--${i % 2 ? 'r' : 'l'}`} key={w.slug}>
            <button
              className="wk__btn" data-cursor="view"
              onPointerEnter={(e) => show(i, e.currentTarget)} onFocus={(e) => show(i, e.currentTarget)} onBlur={hide}
              onClick={() => go(`/work/${w.slug}`, w.title.toLowerCase())}
            >
              <span className="mask"><span className="wk__name">{w.title}</span></span>
              <span className="wk__meta">{w.year} — {w.type[0]}</span>
              <span className="wk__line" />
            </button>
          </li>
        ))}
        <li className="wk__center" aria-hidden="true">
          {center.split('').map((c, i) => <span className="ch" key={i}>{c === ' ' ? '\u00a0' : c}</span>)}
        </li>
      </ul>
      <div className="wk__float" ref={float} aria-hidden="true">
        {works.map((w) => <img key={w.slug} src={w.img} alt="" />)}
      </div>
    </section>
  )
}
