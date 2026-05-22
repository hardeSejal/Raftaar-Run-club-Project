import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const events = [
  {
    image: '/images/group-clear.jpg',
    title: 'Community Marathon',
    meta: 'Every Sunday • 5:30 AM • Ramdaspeth',
    difficulty: 'All Levels',
    cta: 'Register Now',
  },
  {
    image: '/images/underarmour-group.jpg',
    title: 'Under Armour x Raftaar',
    meta: 'Monthly • 6:00 AM • Under Armour Nagpur',
    difficulty: 'Intermediate',
    cta: 'Learn More',
  },
]

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40,
        
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      if (cardsRef.current) {
        const cards = cardsRef.current.children
        gsap.from(cards, {
          y: 60,
          
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="events"
      className="bg-[#0A0A0A] py-20 md:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="section-label mb-4">UPCOMING</div>
          <h2 className="font-display text-[clamp(48px,6vw,96px)] text-white leading-[0.95]">
            Run With Us
          </h2>
        </div>

        {/* Event Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {events.map((event) => (
            <div
              key={event.title}
              className="group bg-[#141414] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#0B7D7D]/40 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-body text-[22px] font-semibold text-white mb-2">
                  {event.title}
                </h3>
                <p className="font-body text-[14px] text-[#A1A1AA] mb-4">
                  {event.meta}
                </p>

                <div className="flex items-center justify-between">
                  {/* Difficulty Badge */}
                  <span
                    className="inline-block px-3.5 py-1 rounded-full text-[12px] uppercase font-body"
                    style={{
                      background: 'rgba(11, 125, 125, 0.15)',
                      color: '#0B7D7D',
                    }}
                  >
                    {event.difficulty}
                  </span>

                  {/* CTA */}
                  <button className="flex items-center gap-2 text-[#0B7D7D] font-body text-[14px] font-medium group/btn">
                    {event.cta}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
