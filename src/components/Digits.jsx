import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Odometer: each digit is a vertical strip 0-9 that slides into place.
// `value` can change at any time; strips tween to the new position.
export default function Digits({ value, pad = 2, className = '', duration = 1.2 }) {
  const str = String(Math.max(0, Math.round(value))).padStart(pad, '0')
  const refs = useRef([])
  useEffect(() => {
    str.split('').forEach((d, i) => {
      const el = refs.current[i]
      if (el) gsap.to(el, { yPercent: -10 * Number(d), duration, ease: 'expo.out', delay: i * 0.06 })
    })
  }, [str])
  return (
    <span className={`dg ${className}`} aria-label={str}>
      {str.split('').map((_, i) => (
        <span className="dg__win" key={i} aria-hidden="true">
          <span className="dg__strip" ref={(el) => (refs.current[i] = el)}>
            {Array.from({ length: 10 }, (_, n) => <span key={n}>{n}</span>)}
          </span>
        </span>
      ))}
    </span>
  )
}
