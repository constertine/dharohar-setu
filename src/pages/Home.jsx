import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Features from '../components/Features'
import Sites from '../components/Sites'
import WhyDharohar from '../components/WhyDharohar'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <HowItWorks />
        <Features />
        <Sites />
        <WhyDharohar />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
