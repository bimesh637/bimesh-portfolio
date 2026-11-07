import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { profile } from '../data/profile'

export default function Footer() {
  const links = [
    profile.github && { href: profile.github, label: profile.copy.github, icon: <FaGithub aria-hidden="true"/> },
    profile.linkedin && { href: profile.linkedin, label: profile.copy.linkedin, icon: <FaLinkedin aria-hidden="true"/> },
  ].filter(Boolean)
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <a className="wordmark" href="#home" aria-label={`${profile.name} — ${profile.copy.backToTop}`}>{profile.name.split(' ').map((part) => part[0]).join('')}<span>.</span></a>
        <nav className="footer-nav" aria-label={profile.copy.footerNavigationLabel}>
          {Object.entries(profile.copy.nav).map(([key, label]) => <a key={key} href={`#${key === 'projects' ? 'work' : key}`}>{label}</a>)}
        </nav>
        <div className="footer-socials">{links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>{link.icon}</a>)}</div>
      </div>
      <div className="container footer-bottom"><small>© {profile.name}</small><small>{profile.role}</small></div>
    </footer>
  )
}
