import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { about } from '../data/content'
import RollButton from '../components/RollButton.jsx'
import { usePageTransition } from '../hooks/useTransition.jsx'

// Dark chapter: giant ghost lettering slides in from both sides, the portrait
// unmasks, and a cloud of loose letters falls into a readable sentence.
export default function About() {
  const root = useRef(null)
  const go = usePageTransition()

  useGSAP(() => {
    const q = gsap.utils.selector(root)
    gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'bottom 30%', scrub: 1 } })
      .fromTo(q('.ab__big--l'), { xPercent: -14 }, { xPercent: 0, ease: 'none' }, 0)
      .fromTo(q('.ab__big--r'), { xPercent: 14 }, { xPercent: 0, ease: 'none' }, 0)

    gsap.fromTo(q('.ab__img'), { clipPath: 'inset(50% 20% 50% 20%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
      scrollTrigger: { trigger: q('.ab__stage')[0], start: 'top 85%', end: 'center 50%', scrub: 1 },
    })
    gsap.fromTo(q('.ab__img img'), { scale: 1.35 }, {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: q('.ab__stage')[0], start: 'top bottom', end: 'bottom top', scrub: true },
    })

    // scattered letters → sentence
    const letters = q('.ab__scatter .ch')
    letters.forEach((el) => {
      gsap.set(el, {
        x: gsap.utils.random(-window.innerWidth * 0.45, window.innerWidth * 0.45),
        y: gsap.utils.random(-window.innerHeight * 0.9, window.innerHeight * 0.2),
        rotate: gsap.utils.random(-90, 90), opacity: 0.25,
      })
    })
    gsap.to(letters, {
      x: 0, y: 0, rotate: 0, opacity: 1, ease: 'power2.out', stagger: { each: 0.004, from: 'random' },
      scrollTrigger: { trigger: q('.ab__scatter')[0], start: 'top 95%', end: 'center 55%', scrub: 1.2 },
    })

    gsap.from(q('.ab__intro span'), {
      yPercent: 100, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: q('.ab__intro')[0], start: 'top 85%' },
    })
    gsap.fromTo(q('.ab__rule'), { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 60%', end: 'bottom 60%', scrub: true } })
  }, { scope: root })

  return (
    <section className="ab" id="about" ref={root}>
      <div className="ab__head">
        <span>( about. )</span>
        <span>[ N.002 ]</span>
      </div>
      <div className="ab__stage">
        <h2 className="ab__big ab__big--l">{about.bigTop.map((t) => <span key={t}>{t}</span>)}</h2>
        <figure className="ab__img"><img src={about.portrait} alt="Portrait" loading="lazy" /></figure>
        <h2 className="ab__big ab__big--r">{about.bigBottom.map((t) => <span key={t}>{t}</span>)}</h2>
        <span className="ab__rule" />
      </div>
      <p className="ab__scatter" aria-label={about.scatter}>
        {about.scatter.split(' ').map((w, i) => (
          <span className="w" key={i}>{w.split('').map((c, k) => <span className="ch" key={k}>{c}</span>)}&nbsp;</span>
        ))}
      </p>
      <p className="ab__intro">
        {about.intro.map((l) => <span className="mask" key={l}><span>{l}</span></span>)}
      </p>
      <div className="ab__cta"><RollButton onClick={() => go('/about', 'about')}>ABOUT ME</RollButton></div>
    </section>
  )
}
