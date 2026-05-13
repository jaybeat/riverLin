import { motion } from 'framer-motion'
import { ExternalLink, Star, ArrowRight } from 'lucide-react'

interface Project {
  title: string
  description: string
  tags: string[]
  href: string
  featured?: boolean
}

interface ProjectsProps {
  onSelectProject?: () => void
}

const projects: Project[] = [
  {
    title: 'Video to Guide',
    description: '将长视频转换为章节化、可交互的配套指南网页，支持浮动视频播放器与时间戳跳转',
    tags: ['Python', 'LLM Pipeline', 'Claude Skill', 'HTML Generator'],
    href: 'https://github.com/jaybeat/video_to_guide',
    featured: true,
  },
  {
    title: '雨滴打字机',
    description: '一个沉浸式的打字体验工具，模拟雨声背景下的专注写作环境。支持多种雨声场景与打字音效组合。',
    tags: ['React', 'Web Audio', 'Animation'],
    href: '#',
  },
  {
    title: 'Clawd 动画引擎',
    description: '轻量级的 CSS 动画编排库，通过声明式 API 让复杂的交互动画变得简单直观。',
    tags: ['TypeScript', 'Animation', 'Library'],
    href: '#',
  },
  {
    title: 'Meta Prompt 工坊',
    description: '一套用于优化和评估 AI 提示词的工具集合，帮助开发者快速迭代高质量的 prompt 设计。',
    tags: ['AI', 'Next.js', 'OpenAI'],
    href: '#',
  },
  {
    title: '极简待办',
    description: '回归本质的任务管理应用，没有冗余功能，只有清晰的待办事项与优雅的交互体验。',
    tags: ['React', 'PWA', 'LocalStorage'],
    href: '#',
  },
]

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function Projects({ onSelectProject }: ProjectsProps) {
  return (
    <section
      id="projects"
      style={{
        padding: '120px 24px',
        maxWidth: '1000px',
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
          Projects
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
          项目
        </h2>
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
        }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={itemVariants}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gridColumn: project.featured ? '1 / -1' : undefined,
            }}
          >
            {project.featured ? (
              <div
                onClick={onSelectProject}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '36px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '20px',
                  border: '1.5px solid var(--text-muted)',
                  boxShadow: 'var(--shadow)',
                  transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  cursor: 'pointer',
                  height: '100%',
                  position: 'relative',
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
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.5px',
                  }}
                >
                  <Star size={12} strokeWidth={1.5} />
                  FEATURED
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: 600,
                      lineHeight: 1.4,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {project.title}
                  </h3>
                  <ArrowRight
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
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                    marginBottom: '20px',
                    flex: 1,
                    maxWidth: '640px',
                  }}
                >
                  {project.description}
                </p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--text-secondary)',
                        background: 'var(--bg-primary)',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <motion.a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '32px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '20px',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow)',
                  transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  cursor: 'pointer',
                  height: '100%',
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
                    marginBottom: '16px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      lineHeight: 1.4,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {project.title}
                  </h3>
                  <ExternalLink
                    size={16}
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
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                    marginBottom: '20px',
                    flex: 1,
                  }}
                >
                  {project.description}
                </p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--text-secondary)',
                        background: 'var(--bg-primary)',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
