import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      id="footer"
      style={{
        padding: '80px 24px 40px',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p
          style={{
            fontSize: '14px',
            color: 'var(--text-muted)',
            marginBottom: '24px',
          }}
        >
          由 RiverLin 设计与开发 · 使用 React + Vite 构建
        </p>

        <button
          onClick={scrollToTop}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '24px',
            background: 'var(--bg-secondary)',
            color: 'var(--text-secondary)',
            fontSize: '13px',
            fontFamily: 'var(--font-mono)',
            border: '1px solid var(--border)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.background = 'var(--text-primary)'
            el.style.color = 'var(--bg-primary)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.background = 'var(--bg-secondary)'
            el.style.color = 'var(--text-secondary)'
          }}
        >
          <ArrowUp size={14} strokeWidth={1.5} />
          返回顶部
        </button>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            marginTop: '40px',
            opacity: 0.6,
          }}
        >
          © {new Date().getFullYear()} RiverLin. All rights reserved.
        </p>
      </motion.div>
    </footer>
  )
}
