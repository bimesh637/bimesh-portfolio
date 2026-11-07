import { BriefcaseBusiness, GraduationCap } from 'lucide-react'
import { SectionKicker } from './AboutSkills'
import { profile } from '../data/profile'

export default function Experience() {
  const hasTimeline = profile.experience.length || profile.education.length
  if (!hasTimeline) return null

  return (
    <section className="section timeline-section" id="experience" aria-labelledby="experience-title">
      <div className="container section-content">
        <SectionKicker index="04">{profile.copy.experienceLabel}</SectionKicker>
        <div className="section-heading" data-reveal>
          <h2 id="experience-title">{profile.copy.experienceHeading}</h2>
        </div>
        <div className="timeline" data-reveal>
          {profile.experience.map((item) => (
            <article className="timeline-entry" key={`${item.role}-${item.org}`}>
              <div className="timeline-meta">
                <span>{item.start && item.end ? `${item.start} — ${item.end}` : profile.copy.experienceType}</span>
              </div>
              <div className="timeline-content">
                <span className="timeline-kind"><BriefcaseBusiness aria-hidden="true"/>{profile.copy.professionalExperience}</span>
                <h3>{item.role}</h3>
                <p>{item.org}</p>
                {item.outcomes.length > 0 && <ul>{item.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>}
              </div>
            </article>
          ))}
          {profile.education.map((item) => (
            <article className="timeline-entry" key={`${item.degree}-${item.school}`}>
              <div className="timeline-meta">
                {(item.start && item.end) || item.status ? <span>{item.start && item.end ? `${item.start} — ${item.end}` : item.status}</span> : null}
              </div>
              <div className="timeline-content">
                <span className="timeline-kind"><GraduationCap aria-hidden="true"/>{profile.copy.educationType}</span>
                <h3>{item.degree}</h3>
                <p>{item.school}</p>
                {item.field && <p className="timeline-detail">{item.field}</p>}
                {item.affiliation && <p className="timeline-affiliation">{item.affiliation}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
