import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VibeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -40,
        
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from(textRef.current, {
        y: 30,
        
        duration: 0.6,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#0A0A0A] py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 items-center">
          {/* Image — 55% */}
          <div ref={imageRef} className="w-full md:w-[55%] ">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="/images/underarmour-portrait.jpg"
                alt="Focused athlete portrait"
                className="w-full h-auto min-h-[400px] md:min-h-[500px] object-cover"
              />
              {/* Subtle gradient overlay on image edge */}
              <div
                className="absolute top-0 right-0 bottom-0 w-16 hidden md:block"
                style={{
                  background:
                    'linear-gradient(to right, transparent, rgba(10,10,10,0.8))',
                }}
              />
            </div>
          </div>

          {/* Text — 45% */}
          <div
            ref={textRef}
            className="w-full md:w-[45%] md:pl-16 "
          >
            <div className="section-label  mb-4">THE VIBE</div>
            <h2 className="font-display text-[clamp(40px,5vw,72px)] text-white leading-[0.95] mb-6">
              Where Discipline Meets Motion
            </h2>
            <p className="font-body text-[16px] text-[#A1A1AA] leading-[1.75] mb-8">
              <p>
  Raftaar is more than just a run club — it’s a movement built around fitness,
  community, and consistency. What started with running is evolving into a
  space for all kinds of movement and endurance sports, because fitness looks
  different for everyone.
</p>

<p className="mt-4">
  People join Raftaar to get active, feel better, or challenge themselves — but
  they stay for the community. Supportive, genuine, and full of people growing
  together, Raftaar is a space where everyone belongs, no matter their pace or
  starting point.
</p>

<p className="mt-4">
  Our goal is simple: to create a fun, creative, and authentic fitness
  community that helps people build lasting habits, meaningful connections, and
  a lifestyle they genuinely enjoy.
</p>

<p className="mt-4">
  This isn’t just another fitness group. This is Raftaar — a community built to
  move, grow, and evolve together.
</p>
            </p>
            <a href="#gallery" className="btn-secondary inline-block">
              Explore Community
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
