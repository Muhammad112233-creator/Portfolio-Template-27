import { useMemo } from 'react'

// Procedural misty ridgelines (seeded, so they never change between renders).
function rand(seed) {
  let s = seed
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
}
function ridge(seed, base, amp, w = 1600, h = 400) {
  const r = rand(seed)
  const pts = []
  let y = base
  for (let x = 0; x <= w; x += 20) {
    y += (r() - 0.5) * amp
    y = Math.min(Math.max(y, base - amp * 2.2), base + amp * 2.2)
    pts.push(`${x},${y.toFixed(1)}`)
  }
  return `M0,${h} L${pts.join(' L')} L${w},${h} Z`
}

export default function Hills({ tone = 'light', flip = false, className = '' }) {
  const layers = useMemo(
    () => [ridge(7, 150, 26), ridge(19, 200, 22), ridge(43, 250, 18), ridge(71, 300, 14)],
    []
  )
  const fills = tone === 'light'
    ? ['#b5bdae', '#a9b1a2', '#9da596', '#c2cabb']
    : ['#1b1e19', '#171a15', '#131512', '#10120f']
  return (
    <svg className={`hills ${flip ? 'hills--flip' : ''} ${className}`} viewBox="0 0 1600 400" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id={`blur-${tone}`}><feGaussianBlur stdDeviation="2.5" /></filter>
      </defs>
      {layers.map((d, i) => (
        <path key={i} d={d} fill={fills[i]} opacity={i === 3 ? 1 : 0.85} filter={i < 2 ? `url(#blur-${tone})` : undefined} className="hills__l" data-depth={i} />
      ))}
    </svg>
  )
}
