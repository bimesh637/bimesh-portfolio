import { useEffect } from 'react'

export default function useMotion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleanups = []
    const observedTargets = new Set()
    const cardCleanups = new WeakMap()
    let revealObserver
    let mutationObserver

    const showAllReveals = () => {
      document.documentElement.classList.remove('motion-ready')
      revealObserver?.disconnect()
      mutationObserver?.disconnect()
      document.querySelectorAll('[data-reveal]').forEach((target) => target.classList.add('is-visible'))
    }

    const observeTree = (node) => {
      if (!(node instanceof Element)) return
      if (node.matches('[data-reveal]') && !observedTargets.has(node)) {
        observedTargets.add(node)
        revealObserver.observe(node)
      }
      node.querySelectorAll('[data-reveal]').forEach((target) => {
        if (observedTargets.has(target)) return
        observedTargets.add(target)
        revealObserver.observe(target)
      })
    }

    const bindProjectCard = (card) => {
      if (reduced || cardCleanups.has(card)) return
      const onRevealEnd = (event) => {
        if (event.target !== card || event.propertyName !== 'opacity' || !card.classList.contains('is-visible')) return
        card.classList.add('is-revealed')
        card.removeEventListener('transitionend', onRevealEnd)
      }
      card.addEventListener('transitionend', onRevealEnd)
      cardCleanups.set(card, () => {
        card.removeEventListener('transitionend', onRevealEnd)
      })
    }

    const bindCardsInTree = (node) => {
      if (!(node instanceof Element)) return
      if (node.matches('.project-card')) bindProjectCard(node)
      node.querySelectorAll('.project-card').forEach(bindProjectCard)
    }

    const unbindCardsInTree = (node) => {
      if (!(node instanceof Element)) return
      const cards = [...(node.matches('.project-card') ? [node] : []), ...node.querySelectorAll('.project-card')]
      cards.forEach((card) => {
        cardCleanups.get(card)?.()
        cardCleanups.delete(card)
        revealObserver?.unobserve(card)
        if (!card.classList.contains('is-visible')) observedTargets.delete(card)
      })
    }

    if (!reduced && 'IntersectionObserver' in window) {
      try {
        revealObserver = new IntersectionObserver((entries, activeObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('is-visible')
            activeObserver.unobserve(entry.target)
          })
        }, { threshold: 0.08, rootMargin: '0px 0px -3% 0px' })
        observeTree(document.documentElement)
        document.documentElement.classList.add('motion-ready')
        document.querySelectorAll('.project-card').forEach(bindProjectCard)

        if ('MutationObserver' in window && document.body) {
          mutationObserver = new MutationObserver((records) => {
            records.forEach((record) => {
              record.removedNodes.forEach(unbindCardsInTree)
              record.addedNodes.forEach((node) => {
                observeTree(node)
                bindCardsInTree(node)
              })
            })
          })
          mutationObserver.observe(document.body, { childList: true, subtree: true })
        } else {
          showAllReveals()
        }
      } catch {
        showAllReveals()
      }
      cleanups.push(() => {
        revealObserver?.disconnect()
        mutationObserver?.disconnect()
        document.querySelectorAll('.project-card').forEach((card) => cardCleanups.get(card)?.())
        document.documentElement.classList.remove('motion-ready')
      })
    } else {
      document.querySelectorAll('[data-reveal]').forEach((target) => target.classList.add('is-visible'))
    }

    const progressBar = document.querySelector('.scroll-progress')
    if (progressBar) {
      let frame = 0
      const update = () => {
        const range = document.documentElement.scrollHeight - window.innerHeight
        progressBar.style.setProperty('--scroll-progress', range > 0 ? `${window.scrollY / range}` : '0')
        frame = 0
      }
      const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(update)
      }
      update()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      cleanups.push(() => {
        cancelAnimationFrame(frame)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
      })
    }

    const navLinks = [...document.querySelectorAll('.primary-nav a')]
    const observedSections = ['home', 'about', 'skills', 'work', 'experience', 'contact']
      .map((id) => document.getElementById(id)).filter(Boolean)
    if ('IntersectionObserver' in window && navLinks.length) {
      const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          navLinks.forEach((link) => {
            const active = link.getAttribute('href') === `#${entry.target.id}`
            link.classList.toggle('is-active', active)
            if (active) link.setAttribute('aria-current', 'location')
            else link.removeAttribute('aria-current')
          })
        })
      }, { rootMargin: '-45% 0px -50% 0px' })
      observedSections.forEach((section) => navObserver.observe(section))
      cleanups.push(() => navObserver.disconnect())
    }

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [])
}
