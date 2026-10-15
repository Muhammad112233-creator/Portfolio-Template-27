import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Hero from '../sections/Hero.jsx'
import Statement from '../sections/Statement.jsx'
import About from '../sections/About.jsx'
import Awards from '../sections/Awards.jsx'
import Works from '../sections/Works.jsx'
import Expertise from '../sections/Expertise.jsx'
import ContactForm from '../components/ContactForm.jsx'
import Footer from '../components/Footer.jsx'
import { contact } from '../data/content'

export default function Home({ started }) {
  const contactRef = useRef(null)
  useGSAP(() => {
    gsap.from('.ct__title .ch', {
      yPercent: 100, opacity: 0, stagger: 0.015, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.ct__title', start: 'top 85%' },
    })
    gsap.fromTo('.ct__rule', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.ct__rule', start: 'top 90%' } })
    gsap.from('.ft__name', { yPercent: 40, opacity: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.ft__name', start: 'top 95%' } })
    gsap.fromTo('.ft__role', { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: '.ft__role', start: 'top bottom', end: 'bottom 85%', scrub: true } })
  }, { scope: contactRef })

  return (
    <>
      <Hero started={started} />
      <Statement />
      <About />
      <Awards />
      <div className="wx">
        <Works />
        <Expertise />
      </div>
      <div className="paper" ref={contactRef}>
        <section className="ct" id="contact">
          <p className="ct__n">[ N.006 ]</p>
          <p className="ct__k">( contact form. )</p>
          <h2 className="ct__title">
            {contact.title.split(' ').map((w, i) => (
              <span className="w" key={i}>{w.split('').map((c, k) => <span className="mask" key={k}><span className="ch">{c}</span></span>)}&nbsp;</span>
            ))}
          </h2>
          <span className="ct__rule" />
          <ContactForm />
        </section>
        <Footer />
      </div>
    </>
  )
}
