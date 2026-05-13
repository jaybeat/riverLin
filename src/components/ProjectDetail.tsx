import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Github,
  ExternalLink,
  FileText,
} from 'lucide-react'

interface ProjectDetailProps {
  onBack: () => void
}

const pipelineSteps = [
  { name: '下载预处理', type: 'script', desc: '提取字幕、分块、生成初始数据' },
  { name: '两遍结构识别', type: 'llm', desc: '粗粒度主题 → 细粒度章节划分' },
  { name: '章节重写', type: 'llm', desc: '并行子代理将口语转为书面表达' },
  { name: '帧提取插入', type: 'both', desc: '自动提取并插入教学关键帧' },
  { name: '诊断打磨', type: 'both', desc: '脚本诊断 + 定向 LLM 修复' },
  { name: '翻译输出', type: 'llm', desc: '中文翻译（源中文则跳过）' },
  { name: '导出 HTML', type: 'script', desc: '生成带浮动播放器的指南页' },
]

const highlights = [
  '7 阶段自动化流水线',
  '两遍结构识别',
  '断点续传',
  '中英双语输出',
  '代码与公式完整保留',
]

const example = {
  title: 'Build GPT 配套指南',
  desc: '基于 Andrej Karpathy "Let\'s build GPT" 视频生成的中文配套指南，完整覆盖了从零构建 GPT 模型的全过程。',
  src: '/workspace/build_gpt/guide.zh.html',
  githubSrc:
    'https://github.com/jaybeat/video_to_guide/blob/main/workspace/build_gpt/guide.zh.html',
}

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

export default function ProjectDetail({ onBack }: ProjectDetailProps) {
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrolled(e.currentTarget.scrollTop > 20)
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
          onClick={onBack}
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
          Video to Guide
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
            Video to Guide
          </h1>
          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: '540px',
              margin: '0 auto 28px',
            }}
          >
            将长视频转换为章节化、可交互的配套指南网页，支持浮动视频播放器与时间戳跳转
          </p>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {['Python', 'LLM Pipeline', 'Claude Skill', 'HTML Generator'].map(
              (tag) => (
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
              )
            )}
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
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'var(--text-secondary)',
              marginBottom: '20px',
            }}
          >
            这是一个 Claude Skill，能够将 YouTube 上的长视频（通常是 1-3
            小时的技术讲座或教程）转换为结构化的配套指南网页。生成的页面读起来像书章一样流畅，同时完整保留代码和公式，每个章节都配有原视频的时间戳，点击即可跳转播放。
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            {highlights.map((item) => (
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
        </motion.div>

        {/* 处理流水线 */}
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
            {pipelineSteps.map((step, index) => (
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
                  {index < pipelineSteps.length - 1 && (
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
                      index < pipelineSteps.length - 1 ? '24px' : '0px',
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

        {/* 示例预览 */}
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
            以下指南由 Video to Guide 从 Andrej Karpathy 的教学视频自动生成，可直接在浏览器中浏览。
          </p>

          {/* iframe */}
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
                  {example.title}
                </h3>
                <p
                  style={{
                    fontSize: '13px',
                    lineHeight: 1.5,
                    color: 'var(--text-muted)',
                  }}
                >
                  {example.desc}
                </p>
              </div>
              <a
                href={example.githubSrc}
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
              src={example.src}
              title={example.title}
              style={{
                width: '100%',
                height: '600px',
                border: 'none',
                display: 'block',
              }}
            />
          </div>
        </motion.div>

        {/* GitHub CTA */}
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
            查看 GitHub 仓库了解完整的 Skill 定义、流水线实现细节与使用方法。
          </p>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="https://github.com/jaybeat/video_to_guide"
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
            <a
              href="https://github.com/jaybeat/video_to_guide/tree/main/.claude/skills/video-to-companion-guide"
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
              查看 SKILL.md
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
