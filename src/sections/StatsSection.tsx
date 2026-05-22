import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 10000, suffix: '+', label: 'Kilometers Logged', display: '10K+' },
  { value: 300, suffix: '+', label: 'Active Members', display: '300+' },
  { value: 45, suffix: '+', label: 'Weekly Runs', display: '45+' },
  { value: 12, suffix: '+', label: 'Community Events', display: '12+' },
]

function AnimatedCounter({
  target,
  suffix,
  triggered,
}: {
  target: number
  suffix: string
  triggered: boolean
}) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!triggered) return

    const duration = 2000
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(easeOut * target)

      if (current !== countRef.current) {
        countRef.current = current
        setCount(current)
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(rafRef.current)
  }, [triggered, target])

  const formatted =
    target >= 1000 ? `${Math.floor(count / 1000)}K` : count.toString()

  return (
    <span>
      {target >= 1000 ? `${formatted}${suffix}` : `${count}${suffix}`}
    </span>
  )
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => setTriggered(true),
        once: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A0A0A] border-t border-b border-[rgba(255,255,255,0.05)] py-16 md:py-20"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-[clamp(48px,6vw,80px)] text-[#0B7D7D] leading-none">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  triggered={triggered}
                />
              </div>
              <div className="font-body text-[12px] uppercase tracking-[0.12em] text-[#A1A1AA] mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
