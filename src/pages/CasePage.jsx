import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { works } from '../data/content'
import { usePageTransition } from '../hooks/useTransition.jsx'
import RollButton from '../components/RollButton.jsx'
import Footer from '../components/Footer.jsx'
import NotFound from './NotFound.jsx'

export default function CasePage() {
  const { slug } = useParams()
  const go = usePageTransition()
  const root = useRef(null)
  const swiper = useRef(null)
  const i = works.findIndex((w) => w.slug === slug)
  const w = works[i]
  const next = works[(i + 1) % works.length]

  useGSAP(() => {
    if (!w) return
    gsap.timeline({ delay: 0.9 })
      .from('.cs__title .ch', { yPercent: 110, stagger: 0.03, duration: 1, ease: 'power4.out' })
      .from('.cs__meta > *', { opacity: 0, y: 20, stagger: 0.08, duration: 0.7 }, 0.3)
      .from('.cs__slider', { clipPath: 'inset(0 0 100% 0)', duration: 1.3, ease: 'expo.inOut' }, 0.2)
    gsap.from('.cs__next-t', { yPercent: 100, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.cs__next', start: 'top 85%' } })
  }, { scope: root, dependencies: [slug] })

  if (!w) return <NotFound />

  // three framings of the same cover + a typographic slide
  const slides = [
    { pos: 'center', scale: 1 },
    { pos: '20% 40%', scale: 1.6 },
    { pos: '80% 60%', scale: 1.9 },
  ]

  return (
    <div className="cs" ref={root} key={slug}>
      <div className="cs__top">
        <button className="cs__back" onClick={() => go('/', 'home')} data-cursor="link">← back</button>
        <span>[ case {String(i + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')} ]</span>
      </div>
      <h1 className="cs__title">
        {w.title.split('').map((c, k) => <span className="mask" key={k}><span className="ch">{c === ' ' ? '\u00a0' : c}</span></span>)}
      </h1>
      <div className="cs__meta">
        <div><h4>Year</h4><p>{w.year}</p></div>
        <div><h4>Scope</h4><ul>{w.type.map((t) => <li key={t}>{t}</li>)}</ul></div>
        <div><h4>Recognition</h4><ul>{w.honors.map((t) => <li key={t}>{t}</li>)}</ul></div>
        <div className="cs__desc"><p>{w.text}</p><RollButton href={w.url}>VISIT LIVE</RollButton></div>
      </div>

      <div className="cs__slider" data-cursor="view">
        <Swiper onSwiper={(s) => (swiper.current = s)} loop speed={900} grabCursor slidesPerView={1.15} spaceBetween={16} centeredSlides
          breakpoints={{ 900: { slidesPerView: 1.4, spaceBetween: 28 } }}>
          {slides.map((s, k) => (
            <SwiperSlide key={k}>
              <div className="cs__slide"><img src={w.img} alt={`${w.title} view ${k + 1}`} style={{ objectPosition: s.pos, transform: `scale(${s.scale})` }} /></div>
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <div className="cs__slide cs__slide--type"><p>{w.title}</p><span>{w.type.join(' / ')}</span></div>
          </SwiperSlide>
        </Swiper>
        <div className="cs__arrows">
          <button onClick={() => swiper.current?.slidePrev()} aria-label="Previous" data-cursor="link">←</button>
          <button onClick={() => swiper.current?.slideNext()} aria-label="Next" data-cursor="link">→</button>
        </div>
      </div>

      <button className="cs__next" onClick={() => go(`/work/${next.slug}`, next.title.toLowerCase())} data-cursor="view">
        <span>next case</span>
        <span className="mask"><span className="cs__next-t">{next.title}</span></span>
      </button>
      <div className="paper paper--slim"><Footer /></div>
    </div>
  )
}
