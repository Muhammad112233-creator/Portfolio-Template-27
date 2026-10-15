import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../data/content'
import { useScroll } from '../hooks/useScroll.jsx'
import { usePageTransition } from '../hooks/useTransition.jsx'
import RollLink from './RollLink.jsx'
import RollButton from './RollButton.jsx'

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const scroll = useScroll()
  const go = usePageTransition()
  const { pathname } = useLocation()

  const copy = async () => {
    try { await navigator.clipboard.writeText(site.email) } catch { /* clipboard blocked */ }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  const nav = (id) => (pathname === '/' ? scroll.to(`#${id}`) : go('/', 'home'))

  return (
    <footer className="ft">
      <nav className="ft__nav">
        {site.nav.slice(0, 4).map((n) => <RollLink key={n.id} label={n.label.toUpperCase()} onClick={() => nav(n.id)} />)}
      </nav>
      <h2 className="ft__name">{site.firstName} {site.lastName}</h2>
      <div className="ft__soc">
        {site.socials.map((s) => <RollLink key={s.label} label={s.label} href={s.href} className="rl--u" />)}
      </div>
      <button className={`ft__mail ${copied ? 'is-copied' : ''}`} onClick={copy} data-cursor="link" aria-label="Copy email">
        <span className="ft__mail-a">email: {site.email}</span>
        <span className="ft__mail-b">copied to clipboard ✓</span>
      </button>
      <p className="ft__role">{site.role}</p>
      <div className="ft__bar">
        <p>© {new Date().getFullYear()} {site.firstName} {site.lastName}. Built by hand in {site.city}.<br />Template free to reuse — keep the craft honest.</p>
        <p className="ft__made">React · GSAP · Lenis · Three.js</p>
        <RollButton className="rb--sm" onClick={() => scroll.to(0, { duration: 2.4 })}>TOP ↑</RollButton>
      </div>
    </footer>
  )
}
