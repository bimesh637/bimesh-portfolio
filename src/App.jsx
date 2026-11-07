import { useEffect, useState } from 'react'
import './App.css'
import './App.motion.css'
import useMotion from './useMotion'
import { profile } from './data/profile'
import Header from './components/Header'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import { AboutSection, SkillsSection } from './components/AboutSkills'
import ProjectShowcase from './components/ProjectShowcase'
import Experience from './components/Experience'
import Credentials from './components/Credentials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingSocials from './components/FloatingSocials'

function getInitialTheme() {
  try {
    return localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export default function App() {
  useMotion()
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('portfolio-theme', theme)
    } catch {
      // Theme selection still works for this session if storage is unavailable.
    }
    const themeColor = document.querySelector('meta[name="theme-color"]')
    if (themeColor) themeColor.content = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()
  }, [theme])

  const toggleTheme = () => setTheme((current) => current === 'dark' ? 'light' : 'dark')

  return (
    <>
      <a className="skip-link" href="#main">{profile.copy.skip}</a>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main id="main" tabIndex="-1">
        <Hero />
        <TechMarquee />
        <AboutSection />
        <SkillsSection />
        <ProjectShowcase />
        <Experience />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <FloatingSocials />
    </>
  )
}
