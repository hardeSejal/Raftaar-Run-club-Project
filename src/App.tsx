import ExchangeToken from './pages/ExchangeToken'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import StatsSection from './sections/StatsSection'
import VibeSection from './sections/VibeSection'
import EventsSection from './sections/EventsSection'
import GallerySection from './sections/GallerySection'
import LeaderboardSection from './sections/LeaderboardSection'
import WhyRaftaarSection from './sections/WhyRaftaarSection'
import TestimonialsSection from './sections/TestimonialsSection'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {

 

  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])
  
   if (window.location.pathname === '/exchange_token') {
    return <ExchangeToken />
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <VibeSection />
      <EventsSection />
      <GallerySection />
      <LeaderboardSection />
      <WhyRaftaarSection />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}