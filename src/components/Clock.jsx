import { useEffect, useState } from 'react'
import { site } from '../data/content'

// Local time for the studio's timezone + a ring of 60 ticks that fills with the seconds.
export default function Clock({ dark = false }) {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: site.timezone })
  const sec = Number(new Intl.DateTimeFormat('en-GB', { second: '2-digit', timeZone: site.timezone }).format(now))
  return (
    <div className={`clock ${dark ? 'clock--dark' : ''}`} title={`${site.city} time`}>
      <svg viewBox="0 0 60 60" className="clock__ring" aria-hidden="true">
        {Array.from({ length: 60 }, (_, i) => (
          <line key={i} x1="30" y1="3" x2="30" y2={i % 5 ? 7 : 9}
            transform={`rotate(${i * 6} 30 30)`} className={i <= sec ? 'on' : ''} />
        ))}
      </svg>
      <span className="clock__t">{fmt.format(now)}</span>
    </div>
  )
}
