import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { site } from '../data/content'
import { useScroll } from '../hooks/useScroll.jsx'
import { usePageTransition } from '../hooks/useTransition.jsx'
import RollLink from './RollLink.jsx'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const scroll = useScroll()
  const go = usePageTransition()
  const menu = useRef(null)
  const name = `${site.firstName} ${site.lastName}`.toUpperCase()

  const toSection = (id) => {
    setOpen(false)
    if (pathname === '/') scroll.to(`#${id}`, { offset: 0 })
    else {
      go('/', 'home')
      setTimeout(() => scroll.to(`#${id}`, { immediate: true }), 1500)
    }
  }

  useEffect(() => {
    if (!menu.current) return
    const items = menu.current.querySelectorAll('.mm__i')
    if (open) {
      scroll.stop()
      gsap.timeline()
        .set(menu.current, { visibility: 'visible' })
        .fromTo(menu.current, { clipPath: 'circle(0% at 100% 0%)' }, { clipPath: 'circle(150% at 100% 0%)', duration: 0.9, ease: 'expo.inOut' })
        .fromTo(items, { yPercent: 120 }, { yPercent: 0, stagger: 0.06, duration: 0.7, ease: 'power3.out' }, '-=0.45')
    } else {
      scroll.start()
      gsap.to(menu.current, { clipPath: 'circle(0% at 100% 0%)', duration: 0.6, ease: 'expo.inOut', onComplete: () => gsap.set(menu.current, { visibility: 'hidden' }) })
    }
  }, [open])

  return (
    <header className="hd">
      <div className="hd__in">
        <button className="logo" onClick={() => (pathname === '/' ? scroll.to(0) : go('/', 'home'))} aria-label="Home" data-cursor="link">
          {name.split('').map((c, i) => (
            <span className="logo__c" key={i} style={{ '--i': i }}>
              <span className="logo__f">{c === ' ' ? '\u00a0' : c}</span>
              <span className="logo__b">{c === ' ' ? '\u00a0' : c}</span>
            </span>
          ))}
        </button>
        <nav className="hd__nav" aria-label="Main">
          {site.nav.map((n) => (
            <RollLink key={n.id} label={n.label.toUpperCase()} onClick={() => toSection(n.id)} />
          ))}
        </nav>
        <button className={`burger ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          <span /><span />
        </button>
      </div>

      <div className="mm" ref={menu}>
        <ul>
          {site.nav.map((n, i) => (
            <li key={n.id} className="mm__m">
              <button className="mm__i" onClick={() => toSection(n.id)}>
                <small>0{i + 1}</small>{n.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="mm__foot">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <div>{site.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}</div>
        </div>
      </div>
    </header>
  )
}
