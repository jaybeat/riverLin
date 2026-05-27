import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navItems = [
  { label: '首页', href: '#hero' },
  { label: '项目', href: '#projects' },
  { label: '文章', href: '#writings' },
  { label: '关于', href: '#footer' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 40px',
        background: scrolled ? 'rgba(243, 241, 237, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}
    >
      <a
        href="#hero"
        onClick={(e) => handleClick(e, '#hero')}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '20px',
          fontWeight: 600,
          letterSpacing: '-0.5px',
          color: 'var(--text-primary)',
        }}
      >
        RiverLin
      </a>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              transition: 'color 0.3s ease',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = 'var(--text-primary)'
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = 'var(--text-secondary)'
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </motion.nav>
  )
}
