import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(subtitleRef.current, {
        
        y: 30,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out',
      })
      gsap.from(ctaRef.current, {
        
        y: 30,
        duration: 0.8,
        delay: 0.8,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/nagpur-run.jpg"
          alt="Runners in Nagpur"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.1) 40%, rgba(10,10,10,0.7) 85%, rgba(10,10,10,1) 100%)',
          }}
        />
      </div>

      {/* Floating Glow Orbs */}
      <div
        className="absolute z-[1] w-[600px] h-[600px] rounded-full float-glow-1 pointer-events-none"
        style={{
          top: '-10%',
          left: '-5%',
          background: 'radial-gradient(circle, rgba(255, 90, 31, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute z-[1] w-[600px] h-[600px] rounded-full float-glow-2 pointer-events-none"
        style={{
          bottom: '20%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* 3D Perspective Text Flip */}
        <div className="perspective-text mb-6" style={{ perspective: '400px' }}>
          <div className="perspective-line">
  <p>RUN NAGPUR</p>
  <p>TOGETHER</p>
</div>
          
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-[18px] text-[#A1A1AA] max-w-[520px] mb-10 "
        >
          Morning runs.  One unstoppable movement.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 ">
          <a
  href={`https://www.strava.com/oauth/authorize?client_id=${
    import.meta.env.VITE_STRAVA_CLIENT_ID
  }&response_type=code&redirect_uri=http://localhost:3000/exchange_token&scope=read,activity:read_all`}
  className="bg-[#FC4C02] hover:bg-[#e34402] text-white text-[13px] font-medium uppercase tracking-[0.04em] px-6 py-2.5 rounded transition-all duration-300 inline-flex items-center"
>
  Connect Strava
</a>
          <a href="#events" className="btn-secondary inline-block text-center">
            Explore Events
          </a>
        </div>
      </div>
    </section>
  )
}
