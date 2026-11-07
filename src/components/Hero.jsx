import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/profile'

export default function Hero() {
  const education = profile.education.find((item) => item.note)
  const internship = profile.experience.find((item) => item.role && item.org)

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-layout container">
        <div className="hero-copy">
          <p className="eyebrow">{profile.copy.heroEyebrow}</p>
          <h1 id="hero-title" aria-label={profile.name}><span>Bimesh</span><span>Sathnidu</span></h1>
          <h2 className="hero-supporting-headline">{profile.copy.heroSupportingHeadline}</h2>
          <p className="hero-tagline">{profile.copy.heroIntroduction}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore My Projects<ArrowDownRight size={18} aria-hidden="true"/></a>
            <a className="button button-secondary" href="#contact">Contact Me<ArrowUpRight size={17} aria-hidden="true"/></a>
          </div>
        </div>
        <figure className="hero-portrait-frame" aria-label={profile.photo.alt}>
          <div className="portrait-image-frame">
            <img src={profile.photo.src} alt={profile.photo.alt} width={profile.photo.width} height={profile.photo.height} loading="eager" fetchPriority="high" decoding="async" style={{ objectPosition: profile.photo.position }}/>
          </div>
        </figure>
      </div>
      <ul className="proof-strip container" aria-label={profile.copy.proofLabel}>
        <li><strong>{profile.projects.length} Projects</strong><span>Selected software work</span></li>
        {education && <li><strong>{education.note} — {profile.copy.studyLabel}</strong><span>{education.school}</span></li>}
        {internship && <li><strong>{internship.org} — {internship.role}</strong><span>Professional experience</span></li>}
      </ul>
    </section>
  )
}
