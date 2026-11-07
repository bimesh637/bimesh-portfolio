import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { profile } from '../data/profile'
import { SectionKicker } from './AboutSkills'

export default function Contact() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container contact-inner" data-reveal>
        <div className="contact-intro">
          <SectionKicker index="07">CONTACT</SectionKicker>
          <h2 id="contact-title">Let&apos;s build something useful.</h2>
          <p>I'm open to internship opportunities, junior software engineering roles, and conversations about software and AI development.</p>
        </div>
        <div className="contact-list" aria-label="Contact details">
          {profile.email && <a className="contact-row" href={`mailto:${profile.email}`}>
            <span className="contact-icon"><Mail aria-hidden="true"/></span>
            <span className="contact-row-text"><small>Email</small><strong>{profile.email}</strong></span>
            <ArrowUpRight className="contact-row-arrow" aria-hidden="true"/>
          </a>}
          <a className="contact-row" href={profile.github} target="_blank" rel="noopener noreferrer">
            <span className="contact-icon"><FaGithub aria-hidden="true"/></span>
            <span className="contact-row-text"><small>GitHub</small><strong>github.com/bimesh637</strong></span>
            <ArrowUpRight className="contact-row-arrow" aria-hidden="true"/>
          </a>
          <div className="contact-row">
            <span className="contact-icon"><MapPin aria-hidden="true"/></span>
            <span className="contact-row-text"><small>Location</small><strong>{profile.location}</strong></span>
          </div>
        </div>
      </div>
    </section>
  )
}
