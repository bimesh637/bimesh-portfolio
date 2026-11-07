import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { profile } from '../data/profile'

const socialLinks = [
  {
    name: 'WhatsApp',
    icon: FaWhatsapp,
    href: profile.whatsappNumber ? `https://wa.me/${profile.whatsappNumber.replace(/\D/g, '')}` : '#contact',
    configured: Boolean(profile.whatsappNumber),
    external: Boolean(profile.whatsappNumber),
  },
  { name: 'Email', icon: Mail, href: `mailto:${profile.email}`, configured: Boolean(profile.email), external: false },
  {
    name: 'LinkedIn',
    icon: FaLinkedinIn,
    href: profile.linkedin || '#contact',
    configured: Boolean(profile.linkedin),
    external: Boolean(profile.linkedin),
  },
  { name: 'GitHub', icon: FaGithub, href: profile.github, configured: Boolean(profile.github), external: true },
]

export default function FloatingSocials() {
  return (
    <nav className="floating-socials" aria-label="Social contact links">
      {socialLinks.map(({ name, icon: Icon, href, configured, external }, index) => (
        <a
          className="floating-social-link"
          href={href}
          key={name}
          style={{ '--social-index': index }}
          aria-label={configured ? name : `${name} is not configured; open Contact`}
          title={configured ? name : `${name} — configure in src/data/profile.js`}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          <Icon className="floating-social-icon" aria-hidden="true" focusable="false" />
          <span className="floating-social-name">{configured ? name : 'Set up'}</span>
        </a>
      ))}
    </nav>
  )
}
