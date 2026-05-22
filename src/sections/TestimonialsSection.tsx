import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      'Raftaar changed my mornings. I went from hitting snooze to hitting the pavement. The community keeps me accountable.',
    name: 'Aarav M.',
    role: 'Member since 2024',
  },
  {
    quote:
      'Running alone is therapy. Running with Raftaar is a revolution. The energy is unmatched anywhere in Nagpur.',
    name: 'Priya K.',
    role: 'Marathon Runner',
  },
  {
    quote:
      'From my first 5K to my first half marathon — these people believed in me before I believed in myself.',
    name: 'Rahul S.',
    role: 'Weekend Warrior',
  },
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 30,
       
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      if (cardsRef.current) {
        const cards = cardsRef.current.children
        gsap.from(cards, {
          y: 40,
          
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-[#0A0A0A] border-t border-[rgba(255,255,255,0.05)] py-24 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 ">
          <div className="section-label mb-4">VOICES</div>
          <h2 className="font-display text-[clamp(40px,5vw,72px)] text-white leading-[0.95]">
            The Runners Speak
          </h2>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="glass-card rounded-lg p-8 md:p-9 relative"
            >
              {/* Decorative Quote Mark */}
              <span
                className="absolute top-6 left-8 font-display text-[64px] text-[#FF5A1F] leading-none opacity-40 select-none"
                style={{ fontFamily: 'Bebas Neue' }}
              >
                &ldquo;
              </span>

              <p className="font-body text-[16px] text-white leading-[1.7] italic mb-8 pt-10">
                {t.quote}
              </p>

              <div>
                <p className="font-body text-[15px] font-semibold text-white">
                  {t.name}
                </p>
                <p className="font-body text-[13px] text-[#52525B]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
