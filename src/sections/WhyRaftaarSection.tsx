import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Target, Users, TrendingUp, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Target,
    title: 'Discipline',
    body: "Show up when nobody's watching. Rain or shine, the pavement doesn't care about excuses.",
  },
  {
    icon: Users,
    title: 'Community',
    body: 'Solo miles build character. Group runs build legends. Find your crew and outgrow your limits.',
  },
  {
    icon: TrendingUp,
    title: 'Consistency',
    body: 'Not every run is your best. But every run counts. Stack the small wins into something massive.',
  },
  {
    icon: Zap,
    title: 'Movement',
    body: 'Speed is a mindset. Forward is the only direction. Keep the rhythm alive, one stride at a time.',
  },
]

export default function WhyRaftaarSection() {
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
          y: 50,
          
          stagger: 0.12,
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
    <section ref={sectionRef} className="bg-[#0A0A0A] py-20 md:py-24">
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 ">
          <div className="section-label mb-4">WHY RAFTAAR</div>
          <h2 className="font-display text-[clamp(48px,6vw,96px)] text-white leading-[0.95]">
            Built Different
          </h2>
        </div>

        {/* Feature Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group glass-card rounded-lg p-8 md:p-10 transition-all duration-300 hover:border-[rgba(255,90,31,0.25)] hover:-translate-y-1"
            >
              <feature.icon
                size={32}
                className="text-[#0B7D7D] mb-6"
                strokeWidth={1.5}
              />
              <h3 className="font-body text-[20px] font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="font-body text-[15px] text-[#A1A1AA] leading-[1.7]">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
