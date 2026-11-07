import { BrandIcon } from './Icon'
import { profile } from '../data/profile'

const technologies = profile.skills.flatMap((group) => group.items)

export default function TechMarquee() {
  if (!technologies.length) return null
  return (
    <section className="tech-marquee" aria-label={profile.copy.marqueeLabel} data-reveal>
      <p className="sr-only">{technologies.map((item) => item.name).join(', ')}</p>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((loop) => <ul key={loop}>{technologies.map((item) => <li key={`${loop}-${item.name}`}><BrandIcon name={item.icon}/>{item.name}</li>)}</ul>)}
      </div>
    </section>
  )
}
