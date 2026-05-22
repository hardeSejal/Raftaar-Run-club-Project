import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  {
    src: '/images/blur-motion.jpg',
    caption: 'The Rhythm of Motion',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/images/logo-runner.jpg',
    caption: 'Fuel Your Run',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/group-clear.jpg',
    caption: 'Community Strong',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/group-motion.jpg',
    caption: 'Energy in Motion',
    span: 'col-span-1 row-span-2',
  },
  {
    src: '/images/underarmour-group.jpg',
    caption: 'UA x Raftaar',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/underarmour-portrait.jpg',
    caption: 'The Focus',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/nagpur-run.jpg',
    caption: 'Run Nagpur Forward',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/images/underarmour-motion.jpg',
    caption: 'Collective Speed',
    span: 'col-span-1 row-span-1',
  },
]

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

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

      if (gridRef.current) {
        const items = gridRef.current.children
        gsap.from(items, {
          y: 40,
          
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
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
      id="gallery"
      className="bg-[#0A0A0A] py-20 md:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 ">
          <div className="section-label mb-4">THE GALLERY</div>
          <h2 className="font-display text-[clamp(36px,4vw,64px)] text-white leading-[0.95]">
            Every Run Tells a Story
          </h2>
        </div>

        {/* Gallery Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]"
        >
          {galleryImages.map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-lg cursor-pointer ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.9)] via-transparent to-transparent  group-hover:opacity-100 transition-opacity duration-400" />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                <p className="font-body text-[14px] text-white font-medium">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <p className="text-center font-body text-[16px] text-[#A1A1AA] mt-12">
          Motion. Connection. Community.
        </p>
      </div>
    </section>
  )
}
