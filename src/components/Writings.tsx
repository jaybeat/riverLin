import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight, Calendar, Tag } from 'lucide-react'
import { articles } from '../data/articles'

interface WritingItem {
  id?: string
  title: string
  date: string
  description: string
  tags: string[]
  href: string
}

const allWritings: WritingItem[] = articles.map((a) => ({
  id: a.id,
  title: a.title,
  date: a.date,
  description: a.description,
  tags: a.tags,
  href: `/article/${a.id}`,
}))

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.2, 0.8, 0.2, 1] as const,
    },
  },
}

export default function Writings() {
  return (
    <section
      id="writings"
      style={{
        padding: '120px 24px',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '60px' }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--text-muted)',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
        >
          Writings
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 600,
            letterSpacing: '-1px',
            lineHeight: 1.2,
            color: 'var(--text-primary)',
          }}
        >
          文章
        </h2>
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        {allWritings.map((writing) => (
          <motion.a
            key={writing.id || writing.title}
            href={writing.href}
            variants={itemVariants}
            style={{
              display: 'block',
              padding: '28px 32px',
              background: 'var(--bg-secondary)',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow)',
              transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.transform = 'translateY(-4px)'
              el.style.boxShadow = 'var(--shadow-hover)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = 'var(--shadow)'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px',
              }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: 1.4,
                  color: 'var(--text-primary)',
                  maxWidth: '85%',
                }}
              >
                {writing.title}
              </h3>
              <ArrowUpRight
                size={18}
                strokeWidth={1.5}
                style={{
                  color: 'var(--text-muted)',
                  flexShrink: 0,
                  marginTop: '4px',
                }}
              />
            </div>

            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                marginBottom: '16px',
              }}
            >
              {writing.description}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                }}
              >
                <Calendar size={12} strokeWidth={1.5} />
                {writing.date}
              </span>

              <div style={{ display: 'flex', gap: '8px' }}>
                {writing.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-secondary)',
                      background: 'var(--bg-primary)',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <Tag size={10} strokeWidth={1.5} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ marginTop: '40px', textAlign: 'center' }}
      >
        <a
          href="https://mp.weixin.qq.com/s/ZZXw3tdWwNJGSr1pTD7HOA"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '40px',
            padding: '12px 24px',
            background: 'var(--bg-secondary)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.borderColor = 'var(--text-muted)'
            el.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.borderColor = 'var(--border)'
            el.style.transform = 'translateY(0)'
          }}
        >
          查看更多
          <ArrowRight size={16} strokeWidth={1.5} />
        </a>
      </motion.div>
    </section>
  )
}
