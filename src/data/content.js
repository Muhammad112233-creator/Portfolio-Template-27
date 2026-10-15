// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE TO MAKE THE TEMPLATE YOURS.
//  Every piece of copy on the site comes from here.
// ─────────────────────────────────────────────────────────────
import portrait from '../assets/img/portrait.jpg'
import w1 from '../assets/img/work-1.jpg'
import w2 from '../assets/img/work-2.jpg'
import w3 from '../assets/img/work-3.jpg'
import w4 from '../assets/img/work-4.jpg'
import w5 from '../assets/img/work-5.jpg'
import w6 from '../assets/img/work-6.jpg'

export const site = {
  firstName: 'Arin',
  lastName: 'Vale',
  role: 'Creative Frontend Developer',
  email: 'hello@arinvale.dev',
  city: 'Lahore',
  timezone: 'Asia/Karachi',
  edition: 'v.1.0',
  loaderPhrase: 'quiet code · loud details · ',
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Dribbble', href: 'https://dribbble.com/' },
  ],
  nav: [
    { label: 'About', id: 'about' },
    { label: 'Awards', id: 'awards' },
    { label: 'Works', id: 'works' },
    { label: 'Expertise', id: 'expertise' },
    { label: 'Contact', id: 'contact' },
  ],
}

export const hero = {
  line: ['Less noise,', 'more signal.'],
}

export const statement = {
  // Words wrapped in [] get the dimmed “ghost” treatment.
  text: 'I build the web the way a carpenter sands wood — slowly, [by hand,] until nothing catches. Every pixel left on screen [has] earned its place.',
}

export const about = {
  bigTop: ['CRAFT', 'OF'],
  bigBottom: ['MOTION', 'ON THE', 'WEB'],
  portrait,
  intro: [
    "Hey, I'm Arin — a creative frontend developer.",
    'I turn calm layouts into living interfaces,',
    'where scroll, type and light move together.',
  ],
  scatter:
    'Seven years of shipping sites for studios, brands and stubborn ideas. I care about frame rates, kerning and the half-second after a click.',
}

export const awards = {
  total: 14,
  title: ['Work that', 'juries kept', 'coming back to'],
  desc: 'Recognition is shared with every client who trusted a slower, sharper process.',
  list: [
    { n: '3x', org: 'Awwwards', what: 'Site of the Day' },
    { n: '2x', org: 'Awwwards', what: 'Developer Award' },
    { n: '1x', org: 'FWA', what: 'FWA of the Day' },
    { n: '3x', org: 'GSAP', what: 'Site of the Month' },
    { n: '1x', org: 'CSS Design Awards', what: 'Best UI Design' },
    { n: '2x', org: 'Codrops', what: 'Featured Demo' },
    { n: '1x', org: 'Muzli', what: 'Editor’s Pick' },
    { n: '1x', org: 'Orpetron', what: 'Website of the Day' },
  ],
}

export const works = [
  {
    slug: 'okhra',
    title: 'Okhra Ceramics',
    year: '2026',
    type: ['E-commerce', 'Art direction', 'WebGL'],
    img: w1,
    url: 'https://example.com',
    text: 'An online home for a two-person clay studio. Products rotate on a soft-lit turntable, and the checkout feels like wrapping a parcel by hand.',
    honors: ['Awwwards — SOTD', 'CSSDA — UI'],
  },
  {
    slug: 'nordval',
    title: 'Nordval Atelier',
    year: '2025',
    type: ['Corporate', 'Motion', 'CMS'],
    img: w2,
    url: 'https://example.com',
    text: 'A concrete-heavy architecture practice wanted a site as heavy as their buildings. Projects drift in through fog; typography does the structural work.',
    honors: ['FWA — FOTD'],
  },
  {
    slug: 'salvia',
    title: 'Salvia Lab',
    year: '2025',
    type: ['Brand site', 'Shopify', '3D'],
    img: w3,
    url: 'https://example.com',
    text: 'Botanical skincare with a lab coat. Ingredient stories unfold on scroll while a single glass bottle refracts the page behind it.',
    honors: ['Awwwards — HM'],
  },
  {
    slug: 'lowtide',
    title: 'Low Tide 26',
    year: '2024',
    type: ['Event', 'Audio reactive', 'Three.js'],
    img: w4,
    url: 'https://example.com',
    text: 'A night-time electronic festival by the sea. The horizon line responds to the live lineup audio, and the countdown never quite sits still.',
    honors: ['GSAP — SOTM', 'Codrops — Feature'],
  },
  {
    slug: 'mira-holt',
    title: 'Mira Holt',
    year: '2024',
    type: ['Portfolio', 'Gallery', 'Next.js'],
    img: w5,
    url: 'https://example.com',
    text: 'A documentary photographer’s archive. Quiet grids, honest captions, and a lightbox that gets out of the way of the pictures.',
    honors: ['Muzli — Pick'],
  },
  {
    slug: 'threadline',
    title: 'Threadline Museum',
    year: '2023',
    type: ['Culture', 'Archive', 'Accessibility'],
    img: w6,
    url: 'https://example.com',
    text: 'A digital archive for woven textiles from South Asia. Deep zoom down to single threads, readable by screen readers from day one.',
    honors: ['Awwwards — SOTD'],
  },
]

export const expertise = {
  areas: ['UI / UX design', 'Web design', 'Development', '3D & WebGL'],
  kinds: [
    'Landing pages',
    'Studio & agency sites',
    'Personal brands',
    'E-commerce',
    'Award-driven showcases',
    'Editorial & archives',
  ],
  stack: ['HTML5', 'CSS3 / SCSS', 'JavaScript / TS', 'GSAP', 'Three.js', 'React', 'React Three Fiber', 'Blender', 'Webflow'],
}

export const contact = {
  title: "Let's build something people remember",
  budgets: ['$3k – 8k', '$8k – 15k', '15k +'],
}

export const aboutPage = {
  title: ['Arin', 'Vale'],
  subtitle: 'Creative frontend developer · Lahore, PK',
  paragraphs: [
    'I started by taking apart Flash sites in 2012 to see how the clouds moved. Today I write React, GSAP and shaders, but the reflex is the same: open it up, find the motion, make it feel inevitable.',
    'I work best with small studios and founders who care about detail. I join early, prototype in the browser instead of in slides, and stay until the last easing curve is right.',
  ],
  numbers: [
    { n: 7, label: 'years in the craft' },
    { n: 60, label: 'sites shipped' },
    { n: 14, label: 'industry awards' },
  ],
  process: [
    { t: 'Listen', d: 'Short calls, long notes. We agree on what the site must make people feel.' },
    { t: 'Prototype', d: 'Motion is designed in code from week one, not handed off at the end.' },
    { t: 'Polish', d: 'Performance budgets, accessibility passes and real-device testing.' },
    { t: 'Launch', d: 'Handover docs, a CMS you actually enjoy, and support after go-live.' },
  ],
}
