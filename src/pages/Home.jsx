import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Features from '../components/Features'
import Sites from '../components/Sites'
import WhyDharohar from '../components/WhyDharohar'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

export default function Home({ onNavigate, initialNodeId }) {
  useEffect(() => {
    // 1. Handle scroll position (if arriving from a node link, Sites component handles scrolling to #sites)
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (!initialNodeId) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }

    // 2. Setup IntersectionObserver for reveal animations on fresh mount
    const revealEls = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

    revealEls.forEach((el) => io.observe(el))

    // 3. Trigger initial scroll & resize events so Hero and HowItWorks calculate properly
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
      window.dispatchEvent(new Event('scroll'))
    }, 50)

    return () => {
      clearTimeout(timer)
      io.disconnect()
    }
  }, [initialNodeId])

  return (
    <>
      <Navbar onNavigate={onNavigate} />
      <main id="top">
        <Hero onNavigate={onNavigate} />
        <HowItWorks />
        <Features />
        <Sites initialNodeId={initialNodeId} />
        <WhyDharohar />
        <CTA onNavigate={onNavigate} />
      </main>
      <Footer onNavigate={onNavigate} />
    </>
  )
}
