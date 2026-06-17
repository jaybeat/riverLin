import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Star, ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { projects, projectCategories, type ProjectCategory } from '../data/projects'

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

export default function Projects() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('deconstruction')

  const visibleProjects = projects.filter((p) => p.category === activeCategory)

  return (
    <section
      id="projects"
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
          Projects · 项目
        </p>
      </motion.div>

      <div
        role="tablist"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '20px',
        }}
      >
        {projectCategories.map((category) => {
          const isActive = category.key === activeCategory
          return (
            <button
              key={category.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(category.key)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                background: isActive ? 'var(--bg-secondary)' : 'transparent',
                padding: '7px 16px',
                borderRadius: '20px',
                border: isActive
                  ? '1px solid var(--text-muted)'
                  : '1px solid var(--border)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {category.label}
            </button>
          )
        })}
      </div>

      <motion.div
        key={activeCategory}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        {visibleProjects.map((project) => {
          const isInternal = Boolean(project.featured)
          const Arrow = isInternal ? ArrowUpRight : ExternalLink
          const handleClick = () => {
            if (isInternal) navigate(`/project/${project.id}`)
            else window.open(project.href, '_blank', 'noopener,noreferrer')
          }
          return (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onClick={handleClick}
              style={{
                display: 'block',
                padding: '16px 0',
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
                    gap: '8px',
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
                    {project.title}
                  </span>
                  {project.featured && (
                    <Star
                      size={12}
                      strokeWidth={1.5}
                      style={{ color: 'var(--text-muted)', flexShrink: 0 }}
                    />
                  )}
                  <Arrow
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
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '40%',
                  }}
                >
                  {project.tags.slice(0, 3).join(' · ')}
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
                {project.description}
              </p>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
