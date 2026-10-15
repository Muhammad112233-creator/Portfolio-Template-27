import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Two-part cursor: a precise dot and a lagging ring. The ring swells over
// anything marked data-cursor="link" and shows a label for data-cursor="view".
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return
    document.documentElement.classList.add('has-cursor')
    const xd = gsap.quickTo(dot.current, 'x', { duration: 0.08 })
    const yd = gsap.quickTo(dot.current, 'y', { duration: 0.08 })
    const xr = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' })
    const yr = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' })
    let state = ''
    let px = -100, py = -100

    const setState = (el) => {
      const t = el?.closest?.('[data-cursor]')
      const next = t ? t.dataset.cursor : ''
      if (next !== state) {
        state = next
        ring.current.dataset.state = next
        label.current.textContent = next === 'view' ? 'view' : ''
      }
    }
    const move = (e) => {
      px = e.clientX; py = e.clientY
      xd(px); yd(py); xr(px); yr(py)
      setState(e.target)
    }
    // content slides under a still mouse while scrolling — re-check what's beneath it
    const onScroll = () => setState(document.elementFromPoint(px, py))
    window.addEventListener('scroll', onScroll, { passive: true })
    const down = () => gsap.to(ring.current, { scale: 0.8, duration: 0.2 })
    const up = () => gsap.to(ring.current, { scale: 1, duration: 0.3 })
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 })
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 })
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div className="cur-ring" ref={ring} aria-hidden="true"><span ref={label} /></div>
      <div className="cur-dot" ref={dot} aria-hidden="true" />
    </>
  )
}
