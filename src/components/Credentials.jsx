import { ArrowUpRight, Award } from 'lucide-react'
import { SectionKicker } from './AboutSkills'
import { profile } from '../data/profile'

export default function Credentials() {
  if (!profile.certifications.length && !profile.achievements.length) return null
  return (
    <section className="section credentials-section" aria-labelledby="credentials-title">
      <div className="container section-content">
      {profile.certifications.length > 0 && <div className="credentials-group" data-reveal><SectionKicker index="05">{profile.copy.certificationsLabel}</SectionKicker><h2 id="credentials-title">{profile.copy.credentialsHeading}</h2><ul className="credential-list">{profile.certifications.map((item) => <li key={item.name}><span className="credential-mark"><Award aria-hidden="true"/></span><div><h3>{item.name}</h3><p>{item.issuer}{item.date && ` · ${item.date}`}</p></div>{item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`${profile.copy.verifyCredential} ${item.name}`}><ArrowUpRight size={17} aria-hidden="true"/></a>}</li>)}</ul></div>}
      {profile.achievements.length > 0 && <div className="credentials-group" data-reveal><SectionKicker index="06">{profile.copy.achievementsLabel}</SectionKicker>{profile.certifications.length === 0 && <h2 id="credentials-title">{profile.copy.achievementsLabel}</h2>}<ul className="credential-list">{profile.achievements.map((item) => <li key={item.title}><span className="credential-mark"><Award aria-hidden="true"/></span><div><h3>{item.title}</h3>{item.description && <p>{item.description}</p>}</div></li>)}</ul></div>}
      </div>
    </section>
  )
}
