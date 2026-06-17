import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { articles } from '../data/articles'

interface WritingItem {
  id?: string
  title: string
  date: string
  description: string
  tags: string[]
  href: string
}

const categoryOrder = ['学习原理与方法', '数学', '编程'] as const

const writingsByCategory = categoryOrder
  .map((category) => ({
    category,
    items: articles
      .filter((a) => a.category === category)
      .map((a) => ({
        id: a.id,
        title: a.title,
        date: a.date,
        description: a.description,
        tags: a.tags,
        href: `/article/${a.id}`,
      })),
  }))
  .filter((group) => group.items.length > 0)

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.2, 0.8, 0.2, 1] as const,
    },
  },
}

function WritingRow({ writing }: { writing: WritingItem }) {
  return (
    <motion.a
      key={writing.id || writing.title}
      href={writing.href}
      variants={itemVariants}
      style={{
        display: 'block',
        padding: '14px 0',
        borderBottom: '1px solid var(--border)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        const t = e.currentTarget.querySelector('h3') as HTMLElement | null
        if (t) t.style.color = 'var(--text-primary)'
        const a = e.currentTarget.querySelector('.row-arrow') as HTMLElement | null
        if (a) a.style.opacity = '1'
      }}
      onMouseLeave={(e) => {
        const t = e.currentTarget.querySelector('h3') as HTMLElement | null
        if (t) t.style.color = 'var(--text-secondary)'
        const a = e.currentTarget.querySelector('.row-arrow') as HTMLElement | null
        if (a) a.style.opacity = '0'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: '16px',
        }}
      >
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: 1.5,
            color: 'var(--text-secondary)',
            transition: 'color 0.25s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            minWidth: 0,
          }}
        >
          <span
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {writing.title}
          </span>
          <ArrowUpRight
            className="row-arrow"
            size={15}
            strokeWidth={1.5}
            style={{
              color: 'var(--text-muted)',
              flexShrink: 0,
              opacity: 0,
              transition: 'opacity 0.25s ease',
            }}
          />
        </h3>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--text-muted)',
            flexShrink: 0,
          }}
        >
          {writing.date}
        </span>
      </div>

      <p
        style={{
          fontSize: '13px',
          lineHeight: 1.6,
          color: 'var(--text-muted)',
          marginTop: '4px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {writing.description}
      </p>
    </motion.a>
  )
}

export default function Writings() {
  const [activeCategory, setActiveCategory] = useState(
    writingsByCategory[0]?.category
  )
  const activeGroup = writingsByCategory.find(
    (group) => group.category === activeCategory
  )

  return (
    <section
      id="writings"
      style={{
        padding: '56px 24px',
        maxWidth: '720px',
        margin: '0 auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '20px' }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--text-muted)',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          Writings · 文章
        </p>
      </motion.div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '20px',
        }}
      >
        {writingsByCategory.map((group) => {
          const isActive = group.category === activeCategory
          return (
            <button
              key={group.category}
              onClick={() => setActiveCategory(group.category)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 500,
                color: isActive ? 'var(--bg-secondary)' : 'var(--text-secondary)',
                background: isActive ? 'var(--text-primary)' : 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderColor: isActive ? 'var(--text-primary)' : 'var(--border)',
                borderRadius: '40px',
                padding: '7px 16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--text-muted)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--border)'
                }
              }}
            >
              {group.category}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: isActive ? 'var(--bg-secondary)' : 'var(--text-muted)',
                  opacity: 0.8,
                }}
              >
                {group.items.length}
              </span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {activeGroup?.items.map((writing) => (
            <WritingRow key={writing.id || writing.title} writing={writing} />
          ))}
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ marginTop: '24px' }}
      >
        <a
          href="https://mp.weixin.qq.com/s/ZZXw3tdWwNJGSr1pTD7HOA"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)'
          }}
        >
          查看更多
          <ArrowRight size={15} strokeWidth={1.5} />
        </a>
      </motion.div>
    </section>
  )
}
