import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  Star,
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { projects, type Project } from '../data/projects'
import { courseSyllabus } from '../data/course'
import ShowcaseGallery from './ShowcaseGallery'

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

/** mono 大写小标题，沿用站点风格 */
function SectionLabel({ zh, en }: { zh: string; en: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: '28px' }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: 'var(--text-muted)',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}
      >
        {en}
      </p>
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(26px, 4.5vw, 34px)',
          fontWeight: 700,
          letterSpacing: '-0.5px',
          lineHeight: 1.15,
          color: 'var(--text-primary)',
        }}
      >
        {zh}
      </h2>
    </motion.div>
  )
}

/** 卡片封面：优先 cover → 首张 screenshot → 渐变占位 */
function CardCover({ project }: { project: Project }) {
  const img = project.cover || project.detail?.screenshots?.[0]?.src

  if (img) {
    return (
      <div
        style={{
          aspectRatio: '16 / 10',
          overflow: 'hidden',
          background: 'var(--bg-secondary)',
        }}
      >
        <img
          src={img}
          alt={project.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        aspectRatio: '16 / 10',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        textAlign: 'center',
        background:
          'linear-gradient(135deg, var(--bg-secondary) 0%, var(--border) 100%)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '18px',
          fontWeight: 600,
          lineHeight: 1.3,
          color: 'var(--text-secondary)',
        }}
      >
        {project.title}
      </span>
    </div>
  )
}

/** 实践/学生项目图文卡片 */
function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate()
  const isInternal = Boolean(project.detail)
  const Arrow = isInternal ? ArrowUpRight : ExternalLink

  const handleClick = () => {
    if (isInternal) navigate(`/project/${project.id}`)
    else window.open(project.href, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      variants={itemVariants}
      onClick={handleClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '14px',
        border: '1px solid var(--border)',
        background: 'var(--bg-primary)',
        boxShadow: 'var(--shadow)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
        e.currentTarget.style.transform = 'translateY(-3px)'
        const t = e.currentTarget.querySelector('h3') as HTMLElement | null
        if (t) t.style.color = 'var(--text-primary)'
        const a = e.currentTarget.querySelector('.card-arrow') as HTMLElement | null
        if (a) a.style.opacity = '1'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow)'
        e.currentTarget.style.transform = 'translateY(0)'
        const t = e.currentTarget.querySelector('h3') as HTMLElement | null
        if (t) t.style.color = 'var(--text-secondary)'
        const a = e.currentTarget.querySelector('.card-arrow') as HTMLElement | null
        if (a) a.style.opacity = '0'
      }}
    >
      <CardCover project={project} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '16px',
        }}
      >
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: 1.4,
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
          {project.student && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                lineHeight: 1.4,
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '1px 7px',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              学生项目
            </span>
          )}
          <Arrow
            className="card-arrow"
            size={15}
            strokeWidth={1.5}
            style={{
              color: 'var(--text-muted)',
              flexShrink: 0,
              marginLeft: 'auto',
              opacity: 0,
              transition: 'opacity 0.25s ease',
            }}
          />
        </h3>

        <p
          style={{
            fontSize: '13px',
            lineHeight: 1.6,
            color: 'var(--text-muted)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </p>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {project.tags.slice(0, 3).join(' · ')}
        </span>
      </div>
    </motion.div>
  )
}

/** 重点项目 spotlight — 视频创作 Agent */
function FeaturedSpotlight({ project }: { project: Project }) {
  const navigate = useNavigate()
  const detail = project.detail
  if (!detail) return null

  const images =
    detail.showcaseImages ??
    (detail.showcaseImage ? [detail.showcaseImage] : [])

  const ctaBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    padding: '9px 18px',
    borderRadius: '40px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  }

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >

      <motion.h3
        variants={itemVariants}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(19px, 2.6vw, 22px)',
          fontWeight: 600,
          letterSpacing: '-0.3px',
          lineHeight: 1.25,
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '14px',
        }}
      >
        {project.title}
        <Star size={16} strokeWidth={1.5} style={{ color: 'var(--text-muted)' }} />
      </motion.h3>

      <motion.p
        variants={itemVariants}
        style={{
          fontSize: '15px',
          lineHeight: 1.75,
          color: 'var(--text-secondary)',
          marginBottom: '20px',
        }}
      >
        {project.description}
      </motion.p>

      {detail.highlights && (
        <motion.ul
          variants={itemVariants}
          style={{
            listStyle: 'none',
            margin: '0 0 24px',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {detail.highlights.map((h) => (
            <li
              key={h}
              style={{
                display: 'flex',
                gap: '10px',
                fontSize: '14px',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: 'var(--text-muted)',
                  flexShrink: 0,
                  marginTop: '8px',
                }}
              />
              <span style={{ minWidth: 0 }}>{h}</span>
            </li>
          ))}
        </motion.ul>
      )}

      {images.length > 0 ? (
        <motion.div variants={itemVariants} style={{ marginBottom: '28px' }}>
          <ShowcaseGallery images={images} fallbackAlt={project.title} />
        </motion.div>
      ) : (
        detail.demoVideo && (
          <motion.div variants={itemVariants} style={{ marginBottom: '28px' }}>
            <video
              src={detail.demoVideo.src}
              poster={detail.demoVideo.poster}
              controls
              playsInline
              preload="metadata"
              style={{
                width: '100%',
                maxWidth:
                  detail.demoVideo.orientation === 'portrait'
                    ? '320px'
                    : '100%',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow)',
                background: 'var(--bg-secondary)',
                display: 'block',
              }}
            />
          </motion.div>
        )
      )}

      <motion.div
        variants={itemVariants}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}
      >
        <button
          onClick={() => navigate(`/project/${project.id}`)}
          style={{
            ...ctaBase,
            color: 'var(--bg-secondary)',
            background: 'var(--text-primary)',
            border: '1px solid var(--text-primary)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.85'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1'
          }}
        >
          查看详情
          <ArrowRight size={15} strokeWidth={1.5} />
        </button>
        <button
          onClick={() =>
            window.open(detail.githubUrl, '_blank', 'noopener,noreferrer')
          }
          style={{
            ...ctaBase,
            color: 'var(--text-secondary)',
            background: 'transparent',
            border: '1px solid var(--border)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--text-muted)'
            e.currentTarget.style.color = 'var(--text-primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.color = 'var(--text-secondary)'
          }}
        >
          GitHub
          <ExternalLink size={15} strokeWidth={1.5} />
        </button>
      </motion.div>
    </motion.div>
  )
}

/** 一个子栏：标题 + 横向滚动的项目卡片行（左右箭头点击滚动） */
function ProjectScrollRow({
  title,
  items,
}: {
  title: string
  items: Project[]
}) {
  const rowRef = useRef<HTMLDivElement | null>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)

  const update = () => {
    const el = rowRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    update()
    const el = rowRef.current
    if (!el) return
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length])

  const scroll = (dir: number) => {
    const el = rowRef.current
    if (!el) return
    el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.8), behavior: 'smooth' })
  }

  if (items.length === 0) return null

  const arrowStyle = (enabled: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '1px solid var(--border)',
    background: 'var(--bg-primary)',
    color: 'var(--text-secondary)',
    cursor: enabled ? 'pointer' : 'default',
    opacity: enabled ? 1 : 0.35,
    transition: 'all 0.2s ease',
  })

  return (
    <div style={{ marginTop: '36px' }}>
      <style>{`.hscroll::-webkit-scrollbar{height:0}`}</style>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '19px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px',
          }}
        >
          {title}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-muted)',
              fontWeight: 400,
            }}
          >
            {items.length}
          </span>
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            aria-label="向左滚动"
            onClick={() => scroll(-1)}
            disabled={!canLeft}
            style={arrowStyle(canLeft)}
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>
          <button
            aria-label="向右滚动"
            onClick={() => scroll(1)}
            disabled={!canRight}
            style={arrowStyle(canRight)}
          >
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <motion.div
        ref={rowRef}
        className="hscroll"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        style={{
          display: 'flex',
          gap: '20px',
          overflowX: 'auto',
          scrollSnapType: 'x proximity',
          paddingBottom: '4px',
          scrollbarWidth: 'none',
        }}
      >
        {items.map((project) => (
          <div
            key={project.id}
            style={{
              flex: '0 0 clamp(240px, 72%, 280px)',
              scrollSnapAlign: 'start',
            }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/** 课程「设计理念」引子：一段克制的短文案，点出这门课教的是判断框架而非会过时的技巧 */
function CourseRationale() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      style={{
        marginTop: '24px',
        padding: '18px 20px',
        borderRadius: '12px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text-muted)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}
      >
        设计理念 · Why This Course
      </p>
      <p
        style={{
          fontSize: '14px',
          lineHeight: 1.8,
          color: 'var(--text-secondary)',
        }}
      >
        这门课不教那些过几个月就会过时的操作技巧，而是教一套{' '}
        <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>从机制生长、不随工具过时的思维框架</strong>
        ：从看懂 Agent 的运作机制与边界起步，延伸到在真实任务中如何指挥它、何处该由你把关、如何把一件件事做成，最终长成「与智能体共事」的判断力。学生带走的不是几个用法，而是面对任何新 AI，都能先追问它的机制与边界、再驾驭它协作的能力。
      </p>
    </motion.div>
  )
}

/** 四单元进阶的「AI Agent 课程目录」，每节课可点击展开说明 */
function CourseSyllabus() {
  const [openKey, setOpenKey] = useState<string | null>(null)

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      {courseSyllabus.map((layer) => (
        <motion.div key={layer.layer} variants={itemVariants}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-muted)',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}
          >
            {layer.en}
          </p>
          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              lineHeight: 1.35,
            }}
          >
            {layer.layer}
          </h4>
          <p
            style={{
              fontSize: '13px',
              lineHeight: 1.6,
              color: 'var(--text-muted)',
              margin: '4px 0 12px',
            }}
          >
            {layer.summary}
          </p>

          <div
            style={{
              borderTop: '1px solid var(--border)',
            }}
          >
            {layer.lessons.map((lesson) => {
              const key = lesson.code
              const isOpen = openKey === key
              return (
                <div key={key} style={{ borderBottom: '1px solid var(--border)' }}>
                  <button
                    onClick={() => setOpenKey(isOpen ? null : key)}
                    aria-expanded={isOpen}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      width: '100%',
                      padding: '11px 2px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        color: 'var(--text-muted)',
                        flexShrink: 0,
                      }}
                    >
                      {lesson.code}
                    </span>
                    <span
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          color: 'var(--text-secondary)',
                          lineHeight: 1.4,
                        }}
                      >
                        {lesson.title}
                      </span>
                      <span
                        style={{
                          fontSize: '12px',
                          color: 'var(--text-muted)',
                          lineHeight: 1.4,
                        }}
                      >
                        {lesson.subtitle}
                      </span>
                    </span>
                    <ChevronDown
                      size={15}
                      strokeWidth={1.5}
                      style={{
                        color: 'var(--text-muted)',
                        flexShrink: 0,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                      }}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '0 26px 14px' }}>
                          <p
                            style={{
                              fontSize: '13px',
                              lineHeight: 1.7,
                              color: 'var(--text-muted)',
                            }}
                          >
                            {lesson.desc}
                          </p>
                          <p
                            style={{
                              display: 'flex',
                              gap: '8px',
                              alignItems: 'baseline',
                              fontSize: '13px',
                              lineHeight: 1.6,
                              color: 'var(--text-secondary)',
                              marginTop: '8px',
                            }}
                          >
                            <span
                              style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '11px',
                                color: 'var(--text-muted)',
                                letterSpacing: '1px',
                                flexShrink: 0,
                              }}
                            >
                              任务
                            </span>
                            {lesson.task}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function Projects() {
  const spotlights = projects.filter((p) => p.spotlight)
  const otherProjects = projects.filter((p) => !p.spotlight)
  const moreProjects = otherProjects.filter((p) => !p.student)
  const studentProjects = otherProjects.filter((p) => p.student)

  return (
    <section
      id="projects"
      style={{
        padding: '56px 24px',
        maxWidth: '720px',
        margin: '0 auto',
      }}
    >
      {spotlights.length > 0 && (
        <div id="product" style={{ scrollMarginTop: '72px' }}>
          <SectionLabel zh="AI Agent 产品" en="AI Agent Products" />
          {spotlights.map((project, idx) => (
            <div
              key={project.id}
              style={
                idx > 0
                  ? {
                      marginTop: '56px',
                      paddingTop: '56px',
                      borderTop: '1px solid var(--border)',
                    }
                  : undefined
              }
            >
              <FeaturedSpotlight project={project} />
            </div>
          ))}
          <ProjectScrollRow title="更多 Agent 实践项目" items={moreProjects} />
        </div>
      )}

      <div id="course" style={{ marginTop: spotlights.length > 0 ? '72px' : 0, scrollMarginTop: '72px' }}>
        <SectionLabel zh="AI Agent 课程设计" en="AI Agent Course Design" />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: '15px',
            lineHeight: 1.75,
            color: 'var(--text-secondary)',
            marginTop: '-8px',
          }}
        >
          面向高中 / 大一学生的 AI 创新实践课（零基础可上手）。四单元进阶：<strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>心智模型</strong> →{' '}
          <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>单任务循环</strong> →{' '}
          <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>多步多会话</strong> →{' '}
          <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>扩展与品味</strong>，学生的角色随之逐级晋升——从当模型、当考官，到当项目经理、当创造者。
        </motion.p>

        <CourseRationale />

        <CourseSyllabus />

        <ProjectScrollRow title="学生项目" items={studentProjects} />
      </div>
    </section>
  )
}
