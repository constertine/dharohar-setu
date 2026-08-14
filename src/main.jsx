import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/global.css'

function AppWithInteractions() {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('in')
      })
    }, { threshold: 0.15 })

    revealEls.forEach((el) => io.observe(el))

    const trailNodes = document.querySelectorAll('.trail-node')
    const trailFill = document.getElementById('trailFill')
    const trailContainer = document.querySelector('.trail')
    const trailLength = trailFill?.getTotalLength?.() ?? 0

    if (trailLength) {
      trailFill.style.strokeDasharray = `${trailLength}`
      trailFill.style.strokeDashoffset = `${trailLength}`
    }

    const updateTrail = () => {
      if (!trailContainer || !trailFill) return

      const rect = trailContainer.getBoundingClientRect()
      const progressPoint = window.innerHeight * 0.62
      let filled = progressPoint - rect.top
      filled = Math.max(0, Math.min(filled, rect.height))

      if (trailLength) {
        trailFill.style.strokeDashoffset = `${trailLength * (1 - filled / rect.height)}`
      }

      trailNodes.forEach((node) => {
        const nodeRect = node.getBoundingClientRect()
        node.classList.toggle('active', nodeRect.top < progressPoint)
      })
    }

    window.addEventListener('scroll', updateTrail, { passive: true })
    window.addEventListener('resize', updateTrail)
    updateTrail()

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', updateTrail)
      window.removeEventListener('resize', updateTrail)
    }
  }, [])

  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithInteractions />
  </StrictMode>
)
