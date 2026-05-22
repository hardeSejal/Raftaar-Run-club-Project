import { Instagram, MessageCircle } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Events', href: '#events' },
  { label: 'Community', href: '#gallery' },
  { label: 'Leaderboard', href: '#leaderboard' },
  { label: 'Contact', href: '#footer' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { label: 'WhatsApp', href: 'https://wa.me', icon: MessageCircle },
]

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer
      id="footer"
      className="bg-[#0A0A0A] border-t border-[rgba(255,255,255,0.05)] pt-16 pb-8"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Column 1: Brand */}
          <div>
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="font-display text-[22px] tracking-[0.3em] text-white hover:text-[#FF5A1F] transition-colors duration-300 inline-block mb-3"
            >
              RAFTAAR
            </a>
            <p className="font-body text-[14px] text-[#52525B]">
              Run Club. Nagpur. Est. 2024.
            </p>
          </div>

          {/* Column 2: Nav */}
          <div>
            <p className="font-body text-[12px] uppercase tracking-[0.12em] text-[#52525B] mb-4">
              Navigate
            </p>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-body text-[14px] text-[#A1A1AA] hover:text-[#FF5A1F] transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Social */}
          <div>
            <p className="font-body text-[12px] uppercase tracking-[0.12em] text-[#52525B] mb-4">
              Connect
            </p>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[14px] text-[#A1A1AA] hover:text-[#FF5A1F] transition-colors duration-300 inline-flex items-center gap-2"
                >
                  <link.icon size={16} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-[rgba(255,255,255,0.05)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[13px] text-[#52525B]">
            Built in Nagpur 🇮🇳
          </p>
          <p className="font-body text-[13px] text-[#52525B]">
            © 2025 Raftaar Run Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
