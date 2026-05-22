import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Events', href: '#events' },
  { label: 'Community', href: '#gallery' },
  { label: 'Leaderboard', href: '#leaderboard' },
  { label: 'Contact', href: '#footer' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(10,10,10,0.85)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)]'
          : 'bg-[rgba(10,10,10,0.4)] backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="w-full max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)] flex items-center justify-between">
        {/* Logo */}
        <a
  href="#hero"
  onClick={(e) => handleNavClick(e, '#hero')}
  className="flex items-center"
>
  <img
  src="/images/raftaar-logo.png"
  alt="Raftaar Run Club"
  className="h-28 md:h-32 w-auto object-contain"
/>
</a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-body text-[13px] font-normal tracking-[0.08em] uppercase text-[#A1A1AA] hover:text-[#FF5A1F] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
  href={`https://www.strava.com/oauth/authorize?client_id=${
    import.meta.env.VITE_STRAVA_CLIENT_ID
  }&response_type=code&redirect_uri=http://localhost:3000/exchange_token&scope=read,activity:read_all`}
  className="bg-[#FC4C02] hover:bg-[#e34402] text-white text-[13px] font-medium uppercase tracking-[0.04em] px-6 py-2.5 rounded transition-all duration-300 inline-flex items-center"
>
  Connect Strava
</a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] md:hidden">
          <div className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-body text-[14px] font-normal tracking-[0.08em] uppercase text-[#A1A1AA] hover:text-[#0B7D7D] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <button className="bg-[#0B7D7D] hover:bg-[#096666] text-white text-[13px] font-medium uppercase tracking-[0.04em] px-6 py-2.5 rounded transition-all duration-300 mt-2">
              Join The Movement
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
