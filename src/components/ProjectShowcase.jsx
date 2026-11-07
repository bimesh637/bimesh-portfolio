import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { profile } from '../data/profile'
import projectCoverSprite from '../assets/projects/project-cover-sprite.jpg'
import { BrandIcon } from './Icon'
import { SectionKicker } from './AboutSkills'

const coverPositions = {
  hotel: [0, 0],
  startup: [1, 0],
  truth: [2, 0],
  bus: [0, 1],
  library: [1, 1],
  inventory: [2, 1],
  code: [3, 1],
  dispatch: [0, 2],
  calendar: [1, 2],
  rentify: [2, 2],
  pizza: [3, 2],
  finance: [0, 3],
  archive: [1, 3],
}

function ProjectCover({ project }) {
  const [column, row] = coverPositions[project.visual] || [3, 3]
  return <div className="project-cover" role="img" aria-label={`${project.title}: ${profile.copy.conceptCover}`}>
    <div className="project-cover-photo" style={{ '--cover-offset-x': `${column * -100}%`, '--cover-offset-y': `${row * -100}%` }}>
      <img src={projectCoverSprite} alt="" loading="lazy" decoding="async" onError={(event) => { event.currentTarget.style.display = 'none' }}/>
    </div>
    <span className="project-cover-label" aria-hidden="true">{profile.copy.conceptCover}</span>
  </div>
}

function ProjectCard({ project, index, staggerIndex = index }) {
  const { copy } = profile
  const links = [
    project.live && { label: copy.liveLink, href: project.live },
    project.github && { label: copy.githubLink, href: project.github },
    project.caseStudy && { label: copy.caseStudyLink, href: project.caseStudy },
  ].filter(Boolean)

  return (
    <article className="project-card" data-reveal style={{ '--card-index': staggerIndex }}>
      <ProjectCover project={project}/>
      <div className="project-card-body">
        <div className="project-meta"><span>{String(index + 1).padStart(2, '0')}</span><span>{project.category}</span></div>
        <h3>{project.title}</h3>
        {(project.description || project.problem) && <p className="project-problem">{project.description || project.problem}</p>}
        {project.role && <p className="project-role"><span>{copy.roleLabel}</span>{project.role}</p>}
        {project.outcomes.length > 0 && <ul className="project-outcomes" aria-label={copy.outcomesLabel}>{project.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>}
        {project.tech.length > 0 && <ul className="project-tech" aria-label={copy.technologiesLabel}>{project.tech.map((tech) => <li key={tech.name}>{tech.icon && <BrandIcon name={tech.icon}/>}<span>{tech.name}</span></li>)}</ul>}
        {links.length > 0 && <div className="project-card-links">{links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={15} aria-hidden="true"/></a>)}</div>}
      </div>
    </article>
  )
}

export default function ProjectShowcase() {
  const [filter, setFilter] = useState('All')
  const featured = profile.projects.filter((project) => project.featured)
  const additional = profile.projects.filter((project) => !project.featured)
  const filters = ['All', ...new Set(additional.flatMap((project) => project.categories))]
  const filtered = useMemo(() => filter === 'All' ? additional : additional.filter((project) => project.categories.includes(filter)), [additional, filter])

  return (
    <section className="section projects-section" id="work" aria-labelledby="projects-title">
      <div className="container section-content">
        <SectionKicker index="03">{profile.copy.projectsLabel}</SectionKicker>
        <header className="section-heading" data-reveal><h2 id="projects-title">{profile.copy.projectsHeading}</h2><p>{profile.copy.projectsIntro}</p></header>
        {featured.length > 0 && <>
          <div className="project-group-label" data-reveal><span>{profile.copy.featuredLabel}</span><i/></div>
          <div className="featured-project-grid">
            {featured.map((project, index) => <ProjectCard project={project} index={profile.projects.indexOf(project)} staggerIndex={index} key={project.title}/>)}
          </div>
        </>}
        {additional.length > 0 && <div className="more-projects-block">
          <div className="more-projects-top" data-reveal>
            <div><div className="project-group-label"><span>{profile.copy.moreLabel}</span><i/></div><p>{profile.copy.moreProjectsIntro}</p></div>
            <div className="project-filters" role="group" aria-label={profile.copy.filterLabel}>
              {filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item === 'All' ? profile.copy.filters.all : profile.copy.filters[item] || item}</button>)}
            </div>
          </div>
          <div className="project-grid">
            {filtered.map((project, index) => <ProjectCard project={project} index={profile.projects.indexOf(project)} staggerIndex={index} key={project.title}/>)}
          </div>
          {filtered.length === 0 && <p className="empty-filter">{profile.copy.emptyFilter}</p>}
        </div>}
      </div>
    </section>
  )
}
