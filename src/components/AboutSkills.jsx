import { GraduationCap, MapPin, Target, University } from 'lucide-react'
import { BrandIcon } from './Icon'
import { profile } from '../data/profile'

const factIcons = { MapPin, GraduationCap, Target, University }

function SkillList({ items, className = '' }) {
  return <ul className={className}>{items.map((item) => <li className="skill-tech" key={item.name}>
    {item.icon && <BrandIcon name={item.icon} className="skill-tech-icon"/>}<span>{item.name}</span>
  </li>)}</ul>
}

export function SectionKicker({ index, children }) {
  return <p className="section-kicker"><span>{index}</span><i aria-hidden="true"/>{children}</p>
}

export function AboutSection() {
  const facts = profile.about.facts.filter((fact) => fact.value)
  const lookingFor = profile.status || profile.copy.lookingFor
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="container section-content">
        <SectionKicker index="01">{profile.copy.aboutLabel}</SectionKicker>
        <div className="about-layout" data-reveal>
          <div className="about-heading">
            <h2 id="about-title">{profile.copy.aboutHeading}</h2>
            {profile.about.summary && <p>{profile.about.summary}</p>}
          </div>
          <div className="fact-bento">
            {facts.map((fact) => {
              const Icon = factIcons[fact.icon] || Target
              return <article className="fact-card" key={fact.label}><Icon aria-hidden="true"/><span>{fact.label}</span><strong>{fact.value}</strong></article>
            })}
            {lookingFor && <article className="fact-card fact-card-wide"><Target aria-hidden="true"/><span>{profile.copy.lookingForLabel}</span><strong>{lookingFor}</strong></article>}
          </div>
        </div>
      </div>
    </section>
  )
}

export function SkillsSection() {
  const developmentGroups = profile.skills.filter(({ group, items }) => items.length && ['Programming Languages', 'Frontend Development', 'Backend Development', 'Databases'].includes(group))
  const aiFocusAreas = profile.about.focusAreas.map((name) => ({ name }))
  const ollama = profile.skills.find((group) => group.group === 'AI Engineering')?.items ?? []
  const aiItems = [...aiFocusAreas.slice(0, 2), ...ollama, ...aiFocusAreas.slice(2)]
  const tools = profile.skills.find((group) => group.group === 'Development Tools')?.items ?? []
  if (!developmentGroups.length && !aiItems.length && !tools.length) return null

  return (
    <section className="section skills-section" id="skills" aria-labelledby="skills-title">
      <div className="container section-content">
        <SectionKicker index="04">{profile.copy.skillsLabel}</SectionKicker>
        <header className="skills-heading-row" data-reveal>
          <h2 id="skills-title">{profile.copy.skillsHeadingStart}<em>{profile.copy.skillsHeadingAccent}</em></h2>
          {profile.copy.skillsIntro && <p>{profile.copy.skillsIntro}</p>}
        </header>
        {developmentGroups.length > 0 && <section className="skills-development" aria-labelledby="skills-development-title">
          <h3 className="skills-subsection-label" id="skills-development-title">{profile.copy.skillDevelopmentLabel}</h3>
          <div className="skill-panels">
            {developmentGroups.map((group, index) => <article className="skill-panel" data-reveal style={{ '--skill-index': index }} key={group.group}>
              <span className="skill-panel-index">{String(index + 1).padStart(2, '0')}</span>
              <h4>{group.group}</h4>
              <SkillList items={group.items} className="skill-tech-list"/>
            </article>)}
          </div>
        </section>}
        {aiItems.length > 0 && <section className="skills-applied-ai" data-reveal aria-labelledby="skills-ai-title">
          <div className="skills-ai-copy">
            <span className="skills-subsection-label">{profile.copy.skillAppliedAiLabel}</span>
            <h3 id="skills-ai-title">{profile.copy.skillAppliedAiTitle}</h3>
          </div>
          <SkillList items={aiItems} className="skill-ai-list"/>
        </section>}
        {tools.length > 0 && <section className="skills-tools" data-reveal aria-labelledby="skills-tools-title">
          <h3 className="skills-subsection-label" id="skills-tools-title">{profile.copy.skillDevelopmentToolsLabel}</h3>
          <SkillList items={tools} className="skill-tool-list"/>
        </section>}
      </div>
    </section>
  )
}
