import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import { profile } from '../data/profile'

export default function Header({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const { copy } = profile
  const links = [
    ['about', copy.nav.about], ['skills', copy.nav.skills], ['work', copy.nav.projects],
    ['experience', copy.nav.experience], ['contact', copy.nav.contact],
  ]

  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="wordmark" href="#home" aria-label={profile.name}>{profile.name.split(' ').map((part) => part[0]).join('')}<span>.</span></a>
        <button ref={toggleRef} className="nav-toggle" type="button" aria-expanded={open} aria-controls="primary-nav" aria-label={open ? copy.closeMenu : copy.openMenu} onClick={() => setOpen((value) => !value)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav id="primary-nav" className={`primary-nav${open ? ' is-open' : ''}`} aria-label={copy.navigationLabel}>
          {links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
          {profile.resume && <a className="nav-resume" href={profile.resume} download onClick={closeMenu}>{copy.resume}</a>}
        </nav>
        <div className="header-actions">
          <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={theme === 'dark' ? copy.themeLight : copy.themeDark}>
            {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </button>
          {profile.resume && <a className="header-resume" href={profile.resume} download>{copy.resume}</a>}
          <a className="header-cta" href="#contact" onClick={closeMenu}>{copy.contactCta}<ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="scroll-progress" aria-hidden="true" />
    </header>
  )
}
