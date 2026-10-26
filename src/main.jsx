import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const projects = [
  {
    number: '01',
    type: 'Mobile application / full-stack',
    title: 'Exhibition CRM',
    description:
      'A customer and exhibition management app built around a practical mobile workflow. The interface connects Kotlin and Jetpack Compose screens to a Node.js / Express API and PostgreSQL data.',
    detail: 'Built to make create, edit, search, filter, and delete flows feel clear on a small screen.',
    stack: ['Kotlin', 'Jetpack Compose', 'Node.js', 'Express', 'PostgreSQL', 'REST API'],
    variant: 'crm',
    codeUrl: null,
    liveUrl: null,
  },
  {
    number: '02',
    type: 'Frontend storefront',
    title: 'OrgaFlow',
    description:
      'A flower storefront exploration focused on approachable browsing, product hierarchy, and responsive React interface implementation.',
    detail: 'A frontend project built with React and Vite.',
    stack: ['React', 'Vite', 'CSS'],
    variant: 'flowers',
    codeUrl: null,
    liveUrl: null,
  },
  {
    number: '03',
    type: 'Web application / full-stack',
    title: 'Food Delivery',
    description:
      'A delivery experience with a React and Vite frontend paired with a Node.js and Express backend. The project explores the connective tissue between browsing and ordering.',
    detail: 'MongoDB and integration features are represented only where confirmed by the project setup.',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB'],
    variant: 'food',
    codeUrl: null,
    liveUrl: null,
  },
]

const skillGroups = [
  ['Frontend', 'HTML', 'CSS', 'JavaScript', 'React'],
  ['UI & styling', 'Tailwind CSS', 'Bootstrap', 'Responsive design'],
  ['Backend & APIs', 'Node.js', 'Express', 'REST API integration'],
  ['Database', 'PostgreSQL', 'MongoDB'],
  ['Android development', 'Kotlin', 'Jetpack Compose'],
  ['Tools & workflow', 'Git', 'GitHub', 'WordPress'],
]

function Arrow({ className = '' }) {
  return <span aria-hidden="true" className={`arrow ${className}`}>↗</span>
}

function SectionLabel({ index, children }) {
  return (
    <div className="section-label reveal">
      <span>{index}</span>
      <span>{children}</span>
    </div>
  )
}

function ProjectPreview({ variant }) {
  if (variant === 'crm') {
    return (
      <div className="preview preview-crm" aria-label="Abstract preview of the Exhibition CRM mobile interface">
        <div className="phone-shell">
          <div className="phone-top"><span>9:41</span><span>•••</span></div>
          <div className="phone-heading"><span>Exhibitions</span><b>+</b></div>
          <div className="search-bar">⌕&nbsp; Search customers</div>
          <div className="crm-filter"><span className="filter-active">All customers</span><span>Recent</span></div>
          <div className="customer-row"><i>AM</i><span><b>Anna Miller</b><small>Contemporary / 04.12</small></span><strong>›</strong></div>
          <div className="customer-row"><i className="lime-icon">RK</i><span><b>Ravi Kumar</b><small>Illustration / 04.08</small></span><strong>›</strong></div>
          <div className="customer-row"><i>JS</i><span><b>Julia Singh</b><small>Photography / 03.29</small></span><strong>›</strong></div>
          <div className="phone-nav"><span>⌂<small>Home</small></span><span className="nav-current">▦<small>CRM</small></span><span>◷<small>Activity</small></span></div>
        </div>
        <div className="preview-note">MOBILE / 01</div>
      </div>
    )
  }
  if (variant === 'flowers') {
    return (
      <div className="preview preview-flowers" aria-label="Abstract preview of the OrgaFlow flower storefront">
        <div className="flower-window">
          <div className="window-nav"><b>orgaflow</b><span>Shop&nbsp;&nbsp; Journal&nbsp;&nbsp; About</span><strong>Bag (0)</strong></div>
          <div className="flower-hero"><span>Seasonal forms<br />for every room.</span><b>01 <em>/ 04</em></b></div>
          <div className="flower-art"><div className="stem stem-one" /><div className="stem stem-two" /><div className="petal petal-one" /><div className="petal petal-two" /><div className="petal petal-three" /><div className="leaf" /></div>
          <div className="flower-foot"><span>New arrivals</span><span>Natural / considered / local</span></div>
        </div>
      </div>
    )
  }
  return (
    <div className="preview preview-food" aria-label="Abstract preview of the Food Delivery application">
      <div className="food-window">
        <div className="food-nav"><b>good<span>food</span></b><span>Deliver to <strong>New Delhi⌄</strong></span><i>⌕</i><i>♧</i></div>
        <div className="food-hero"><small>WHAT ARE YOU CRAVING?</small><h3>Something good<br /><em>is on the way.</em></h3><div className="food-search">Search for dishes, restaurants <b>→</b></div></div>
        <div className="food-categories"><span>Popular</span><span>Pizza</span><span>Bowls</span><span>Drinks</span></div>
        <div className="food-cards"><div><b>Green bowl</b><small>Fresh / healthy</small></div><div><b>House pizza</b><small>Stone baked</small></div></div>
      </div>
    </div>
  )
}

function Project({ project, reverse = false }) {
  return (
    <article className={`project reveal ${reverse ? 'project-reverse' : ''}`}>
      <div className="project-preview-wrap">
        <ProjectPreview variant={project.variant} />
      </div>
      <div className="project-copy">
        <div className="project-meta"><span>{project.number}</span><span>{project.type}</span></div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <p className="project-detail">{project.detail}</p>
        <div className="stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
        <div className="project-links">
          {project.codeUrl ? <a href={project.codeUrl} target="_blank" rel="noreferrer">Repository <Arrow /></a> : <span className="unavailable">Repository link to add <Arrow /></span>}
          {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer">Live demo <Arrow /></a> : <span className="unavailable">Demo link to add <Arrow /></span>}
        </div>
      </div>
    </article>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      revealObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const cursor = document.querySelector('.cursor-dot')
    if (!cursor || window.matchMedia('(pointer: coarse)').matches) return undefined
    const move = (event) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
    }
    const activate = () => cursor.classList.add('cursor-active')
    const deactivate = () => cursor.classList.remove('cursor-active')
    window.addEventListener('pointermove', move)
    document.querySelectorAll('a, button, .preview').forEach((el) => {
      el.addEventListener('pointerenter', activate)
      el.addEventListener('pointerleave', deactivate)
    })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className="cursor-dot" aria-hidden="true" />
      <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
        <a className="wordmark" href="#top" onClick={closeMenu}>aditi <span>/ developer</span></a>
        <nav className={menuOpen ? 'nav-open' : ''} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}>Selected work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <a className="availability" href="#contact"><i /> Open to conversations</a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </header>

      <main id="top">
        <section className="hero section-shell">
          <div className="hero-grid-mark" aria-hidden="true"><span>INTERFACE / 01</span><span>BUILD / LEARN / REFINE</span></div>
          <div className="hero-kicker reveal"><span className="lime-line" /> Frontend-focused developer / BCA student</div>
          <h1 className="hero-title"><span className="line-reveal">Interfaces with</span><span className="line-reveal accent-text">intention.</span><span className="line-reveal">Software with</span><span className="line-reveal">purpose<span className="period">.</span></span></h1>
          <div className="hero-bottom">
            <p className="hero-intro reveal">I build clean, responsive interfaces and practical web experiences — with a growing full-stack toolkit behind them.</p>
            <div className="hero-actions reveal"><a className="button-link" href="#work">Explore my work <Arrow /></a><a className="text-link" href="#contact">Get in touch <Arrow /></a></div>
            <div className="hero-aside reveal"><span>Based in India</span><span>Focused on thoughtful digital products</span></div>
          </div>
          <a className="scroll-cue" href="#work"><span>Scroll to explore</span><i>↓</i></a>
        </section>

        <section id="work" className="work section-shell">
          <SectionLabel index="01 /" >Selected work</SectionLabel>
          <div className="section-intro reveal"><h2>Small systems.<br /><em>Real details.</em></h2><p>A selection of interface and application work, shaped around clarity, useful flows, and the details that make software feel considered.</p></div>
          <div className="project-list">{projects.map((project, index) => <Project key={project.number} project={project} reverse={index === 1} />)}</div>
        </section>

        <section id="about" className="about section-shell">
          <SectionLabel index="02 /">A little context</SectionLabel>
          <div className="about-layout"><h2 className="reveal">Frontend first.<br /><em>Curious beyond it.</em></h2><div className="about-copy reveal"><p>I’m Aditi, a BCA student and frontend-focused developer. I care about how an interface reads, responds, and helps someone get something done.</p><p>My projects are where I’m expanding into full-stack work — connecting UI to APIs, relational data, and backend logic without losing sight of the experience.</p><div className="fact-row"><span>Currently learning</span><b>Full-stack application development</b></div></div></div>
        </section>

        <section id="experience" className="experience section-shell">
          <SectionLabel index="03 /">Capabilities</SectionLabel>
          <div className="capabilities-layout"><h2 className="reveal">Tools for<br /><em>the work.</em></h2><div className="skills-list">{skillGroups.map(([group, ...skills], index) => <div className="skill-group reveal" style={{ '--delay': `${index * 70}ms` }} key={group}><span className="skill-index">0{index + 1}</span><div><h3>{group}</h3><p>{skills.join('  /  ')}</p></div></div>)}</div></div>
          <div className="experience-note reveal"><span className="lime-line" /><p>Experience is currently expressed through independent projects and focused practice, with an emphasis on frontend/UI implementation.</p></div>
        </section>

        <section id="contact" className="contact section-shell">
          <SectionLabel index="04 /">Start a conversation</SectionLabel>
          <div className="contact-main reveal"><p className="contact-overline">Have a project in mind?</p><h2>Let’s make it<br /><em>clear and useful.</em></h2><a className="contact-cta" href="https://github.com/Aditi19-opi" target="_blank" rel="noreferrer">Find me on GitHub <Arrow /></a></div>
          <div className="contact-footer"><span>© {new Date().getFullYear()} Aditi</span><a href="https://github.com/Aditi19-opi" target="_blank" rel="noreferrer">github.com/Aditi19-opi <Arrow /></a><span>Built with intention</span></div>
        </section>
      </main>
    </>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
