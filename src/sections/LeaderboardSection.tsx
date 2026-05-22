import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase.ts'

gsap.registerPlugin(ScrollTrigger)

export default function LeaderboardSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<HTMLTableSectionElement>(null)

  type Leader = {
  id: number
  runner: string
  distance: number
}

const [leaders, setLeaders] = useState<Leader[]>([])

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('distance', { ascending: false })

      if (data) {
        setLeaders(data)
      }

      if (error) {
        console.error(error)
      }
    }

    fetchLeaderboard()

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scale: 0.97,

        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      if (rowsRef.current) {
        const rows = rowsRef.current.children

        gsap.from(rows, {
          y: 20,

          stagger: 0.06,
          duration: 0.5,
          delay: 0.3,
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
      id="leaderboard"
      className="bg-[#0A0A0A] py-20 md:py-24"
    >
      <div className="max-w-[800px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div
          ref={cardRef}
          className="glass-card rounded-xl p-8 md:p-12"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="section-label mb-4">LEADERBOARD</div>

            <h2 className="font-display text-[clamp(32px,3.5vw,48px)] text-white leading-[0.95]">
              This Week's Top Runners
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)]">
                  <th className="text-left font-body text-[12px] uppercase tracking-[0.1em] text-[#52525B] pb-3 pr-4">
                    Rank
                  </th>

                  <th className="text-left font-body text-[12px] uppercase tracking-[0.1em] text-[#52525B] pb-3 pr-4">
                    Runner
                  </th>

                  <th className="text-right font-body text-[12px] uppercase tracking-[0.1em] text-[#52525B] pb-3">
                    Distance
                  </th>
                </tr>
              </thead>

              <tbody ref={rowsRef}>
                {leaders.map((entry, index) => (
                  <tr
                    key={index}
                    className="border-b border-[rgba(255,255,255,0.03)] transition-colors duration-200 hover:bg-[rgba(255,255,255,0.02)]"
                  >
                    <td className="py-4 pr-4">
                      <span
                        className={`font-mono text-[16px] ${
                          index === 0
                            ? 'text-[#0B7D7D]'
                            : 'text-[#A1A1AA]'
                        }`}
                      >
                        {index + 1}
                      </span>
                    </td>

                    <td className="py-4 pr-4">
                      <span className="font-body text-[16px] text-white">
                        {entry.runner}
                      </span>
                    </td>

                    <td className="py-4 text-right">
                      <span className="font-mono text-[16px] text-[#A1A1AA]">
                        {entry.distance} km
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Link */}
          <div className="mt-8 text-center">
            <button className="inline-flex items-center gap-2 text-[#0B7D7D] font-body text-[14px] font-medium group">
              View Full Leaderboard

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}