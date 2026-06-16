import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Github,
  ExternalLink,
  FileText,
} from 'lucide-react'
import { getProjectById } from '../data/projects'

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const },
  },
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  const project = id ? getProjectById(id) : undefined
  const detail = project?.detail

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrolled(e.currentTarget.scrollTop > 20)
  }

  if (!project) {
    return (
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '28px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '12px',
          }}
        >
          项目未找到
        </h1>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            marginBottom: '24px',
          }}
        >
          该项目不存在或已被移除。
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            padding: '10px 20px',
            borderRadius: '10px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)'
            e.currentTarget.style.borderColor = 'var(--text-muted)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)'
            e.currentTarget.style.borderColor = 'var(--border)'
          }}
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          返回项目列表
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onScroll={handleScroll}
      style={{
        minHeight: '100vh',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      {/* 顶部导航栏 */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.3s ease',
          background: scrolled ? 'rgba(243, 241, 237, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '10px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-secondary)'
            e.currentTarget.style.color = 'var(--text-primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'none'
            e.currentTarget.style.color = 'var(--text-secondary)'
          }}
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          返回项目列表
        </button>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '-0.3px',
          }}
        >
          {project.title}
        </span>
      </nav>

      {/* Hero 区域 */}
      <section
        style={{
          padding: '120px 24px 80px',
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] as const }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-muted)',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Featured Project
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(36px, 6vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              marginBottom: '20px',
            }}
          >
            {project.title}
          </h1>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  background: 'var(--bg-secondary)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: '1px solid var(--border)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 内容区域 */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 24px 120px',
          display: 'flex',
          flexDirection: 'column',
          gap: '64px',
        }}
      >
        {/* 功能概述 */}
        {detail?.highlights && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '20px',
                letterSpacing: '-0.5px',
              }}
            >
              功能概述
            </h2>
            {detail.detailDescription && (
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.8,
                  color: 'var(--text-secondary)',
                  marginBottom: '20px',
                }}
              >
                {detail.detailDescription}
              </p>
            )}
            {detail.demoVideo && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '28px',
                }}
              >
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
              </div>
            )}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {detail.highlights.map((item) => (
                <span
                  key={item}
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    background: 'var(--bg-secondary)',
                    padding: '7px 16px',
                    borderRadius: '20px',
                    border: '1px solid var(--border)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
            {detail.screenshots && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: detail.singleColumnScreenshots
                    ? '1fr'
                    : 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '24px',
                  marginTop: '40px',
                }}
              >
                {detail.screenshots.map((shot, idx) => (
                  <div key={idx}>
                    <p
                      style={{
                        fontSize: '15px',
                        fontWeight: 500,
                        lineHeight: 1.6,
                        color: 'var(--text-secondary)',
                        marginBottom: '20px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          fontWeight: 400,
                          color: 'var(--text-muted)',
                          marginRight: '8px',
                        }}
                      >
                        例{idx + 1}.
                      </span>
                      {shot.caption}
                    </p>
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      style={{
                        width: '100%',
                        borderRadius: '16px',
                        border: '1px solid var(--border)',
                        boxShadow: 'var(--shadow)',
                        display: 'block',
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
            {detail.spiralScript && (
              <div style={{ marginTop: '40px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '6px',
                    letterSpacing: '-0.3px',
                  }}
                >
                  问题驱动螺旋 · 脚本表示例
                </h3>
                <p
                  style={{
                    fontSize: '13px',
                    lineHeight: 1.6,
                    color: 'var(--text-muted)',
                    marginBottom: '20px',
                  }}
                >
                  {detail.spiralScript.caption}
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  {detail.spiralScript.rounds.map((round) => {
                    const isInterlude = round.problem === ''
                    return (
                      <div
                        key={round.phase}
                        style={{
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border)',
                          borderRadius: '14px',
                          padding: '16px 18px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '12px',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '13px',
                              fontWeight: 600,
                              color: 'var(--text-primary)',
                            }}
                          >
                            {round.phase}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '11px',
                              color: 'var(--text-muted)',
                              background: 'var(--bg-primary)',
                              padding: '2px 8px',
                              borderRadius: '6px',
                              border: '1px solid var(--border)',
                            }}
                          >
                            {round.time}
                          </span>
                        </div>
                        {isInterlude ? (
                          <p
                            style={{
                              fontSize: '14px',
                              lineHeight: 1.65,
                              color: 'var(--text-secondary)',
                            }}
                          >
                            {round.evolution}
                          </p>
                        ) : (
                          <div
                            style={{
                              display: 'flex',
                              gap: '12px',
                              flexWrap: 'wrap',
                              alignItems: 'stretch',
                            }}
                          >
                            <div style={{ flex: '1 1 240px', minWidth: 0 }}>
                              <span
                                style={{
                                  display: 'inline-block',
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '10px',
                                  letterSpacing: '0.5px',
                                  color: 'var(--text-muted)',
                                  background: 'var(--bg-primary)',
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                  border: '1px solid var(--border)',
                                  marginBottom: '8px',
                                }}
                              >
                                问题
                              </span>
                              <p
                                style={{
                                  fontSize: '14px',
                                  lineHeight: 1.65,
                                  color: 'var(--text-secondary)',
                                }}
                              >
                                {round.problem}
                              </p>
                            </div>
                            <div
                              style={{
                                flex: '0 0 auto',
                                alignSelf: 'center',
                                color: 'var(--text-muted)',
                                fontSize: '18px',
                              }}
                            >
                              →
                            </div>
                            <div style={{ flex: '1 1 240px', minWidth: 0 }}>
                              <span
                                style={{
                                  display: 'inline-block',
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '10px',
                                  letterSpacing: '0.5px',
                                  color: 'var(--bg-primary)',
                                  background: 'var(--text-primary)',
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                  marginBottom: '8px',
                                }}
                              >
                                进化
                              </span>
                              <p
                                style={{
                                  fontSize: '14px',
                                  lineHeight: 1.65,
                                  color: 'var(--text-secondary)',
                                }}
                              >
                                {round.evolution}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    lineHeight: 1.7,
                    color: 'var(--text-muted)',
                    marginTop: '16px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.5px',
                      color: 'var(--text-muted)',
                      marginRight: '8px',
                    }}
                  >
                    痛点轨迹
                  </span>
                  {detail.spiralScript.trajectory}
                </p>
                <a
                  href={detail.spiralScript.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    marginTop: '20px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)'
                    e.currentTarget.style.borderColor = 'var(--text-muted)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }}
                >
                  <FileText size={14} strokeWidth={1.5} />
                  查看完整脚本表
                </a>
              </div>
            )}
          </motion.div>
        )}

        {/* 处理流水线 */}
        {detail?.pipelineSteps && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '28px',
                letterSpacing: '-0.5px',
              }}
            >
              处理流水线
            </h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0px',
              }}
            >
              {detail.pipelineSteps!.map((step, index, steps) => (
                <div
                  key={step.name}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background:
                          step.type === 'script'
                            ? 'var(--bg-secondary)'
                            : step.type === 'llm'
                              ? 'var(--text-primary)'
                              : 'linear-gradient(135deg, var(--bg-secondary), var(--text-primary))',
                        color:
                          step.type === 'llm'
                            ? 'var(--bg-primary)'
                            : 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        fontWeight: 600,
                        border:
                          step.type === 'script'
                            ? '1.5px solid var(--border)'
                            : 'none',
                        flexShrink: 0,
                      }}
                    >
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        style={{
                          width: '1.5px',
                          height: '36px',
                          background: 'var(--border)',
                        }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      paddingTop: '6px',
                      paddingBottom:
                        index < steps.length - 1 ? '24px' : '0px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '4px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '15px',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {step.name}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          color: 'var(--text-muted)',
                          background: 'var(--bg-secondary)',
                          padding: '3px 10px',
                          borderRadius: '4px',
                          border: '1px solid var(--border)',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {step.type === 'script'
                          ? 'SCRIPT'
                          : step.type === 'llm'
                            ? 'LLM'
                            : 'SCRIPT + LLM'}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: '14px',
                        lineHeight: 1.6,
                        color: 'var(--text-muted)',
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 示例预览 */}
        {detail?.example && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '8px',
                letterSpacing: '-0.5px',
              }}
            >
              示例输出
            </h2>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'var(--text-muted)',
                marginBottom: '24px',
              }}
            >
              以下指南由 {project.title} 自动生成，可直接在浏览器中浏览。
            </p>

            <div
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: '20px',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow)',
              }}
            >
              <div
                style={{
                  padding: '20px 24px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '4px',
                    }}
                  >
                    {detail.example.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.5,
                      color: 'var(--text-muted)',
                    }}
                  >
                    {detail.example.desc}
                  </p>
                </div>
                <a
                  href={detail.example.githubSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border)',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)'
                    e.currentTarget.style.borderColor = 'var(--text-muted)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }}
                >
                  <FileText size={13} strokeWidth={1.5} />
                  查看源码
                </a>
              </div>
              <iframe
                src={detail.example.src}
                title={detail.example.title}
                style={{
                  width: '100%',
                  height: '600px',
                  border: 'none',
                  display: 'block',
                }}
              />
            </div>
          </motion.div>
        )}

        {/* GitHub CTA */}
        {detail?.githubUrl && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{
              textAlign: 'center',
              padding: '48px 24px',
              background: 'var(--bg-secondary)',
              borderRadius: '20px',
              border: '1px solid var(--border)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '12px',
              }}
            >
              感兴趣？
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                marginBottom: '28px',
                maxWidth: '420px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              查看 GitHub 仓库了解完整的实现细节与使用方法。
            </p>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {detail.appUrl && (
                <a
                  href={detail.appUrl}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    borderRadius: '14px',
                    fontSize: '15px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    border: '1.5px solid var(--border)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--text-muted)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <ExternalLink size={18} strokeWidth={1.5} />
                  打开应用
                </a>
              )}
              <a
                href={detail.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  background: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  borderRadius: '14px',
                  fontSize: '15px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.85'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <Github size={20} strokeWidth={1.5} />
                查看 GitHub 仓库
              </a>
              {detail.extraCta && (
                <a
                  href={detail.extraCta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    borderRadius: '14px',
                    fontSize: '15px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    border: '1.5px solid var(--border)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--text-muted)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <ExternalLink size={18} strokeWidth={1.5} />
                  {detail.extraCta.label}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
