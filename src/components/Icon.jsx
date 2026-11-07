import { Code2, Network } from 'lucide-react'
import {
  SiAndroidstudio,
  SiCss,
  SiExpress,
  SiExpo,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiOllama,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiSpringboot,
  SiSqlite,
  SiVite,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'

const icons = {
  Network,
  Code2,
  FaJava,
  SiAndroidstudio,
  SiCss,
  SiExpress,
  SiExpo,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiOllama,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiSpringboot,
  SiSqlite,
  SiVite,
}

export function BrandIcon({ name, className = '' }) {
  const Icon = icons[name] || Code2
  return <Icon className={className} data-brand={name || 'fallback'} aria-hidden="true" focusable="false" />
}

