import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Eye, ThumbsUp, Share2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import { getArticleById } from '../data/articles'

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

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '24px',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginTop: '2em',
        marginBottom: '0.8em',
        paddingBottom: '0.3em',
        borderBottom: '1px solid var(--border)',
        letterSpacing: '-0.5px',
        lineHeight: 1.3,
      }}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '18px',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginTop: '1.5em',
        marginBottom: '0.6em',
        letterSpacing: '-0.3px',
        lineHeight: 1.4,
      }}
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p
      style={{
        fontSize: '16px',
        lineHeight: 1.8,
        color: 'var(--text-secondary)',
        margin: '1em 0',
      }}
    >
      {children}
    </p>
  ),
  blockquote: ({ children }) => (
    <blockquote
      style={{
        margin: '1.2em 0',
        padding: '1em 1.2em',
        background: 'var(--bg-secondary)',
        borderLeft: '3px solid var(--text-muted)',
        borderRadius: '0 12px 12px 0',
        color: 'var(--text-secondary)',
      }}
    >
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul
      style={{
        paddingLeft: '1.5em',
        margin: '1em 0',
        color: 'var(--text-secondary)',
      }}
    >
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol
      style={{
        paddingLeft: '1.5em',
        margin: '1em 0',
        color: 'var(--text-secondary)',
      }}
    >
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li
      style={{
        margin: '0.5em 0',
        fontSize: '16px',
        lineHeight: 1.8,
      }}
    >
      {children}
    </li>
  ),
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      style={{
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '12px',
        margin: '1.5em auto',
        display: 'block',
      }}
    />
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: 'var(--text-primary)',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
      }}
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong
      style={{
        color: 'var(--text-primary)',
        fontWeight: 600,
      }}
    >
      {children}
    </strong>
  ),
  hr: () => (
    <hr
      style={{
        border: 'none',
        borderTop: '1px solid var(--border)',
        margin: '2em 0',
      }}
    />
  ),
  pre: ({ children }) => (
    <pre
      style={{
        margin: '1.2em 0',
        padding: '1em 1.2em',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        overflowX: 'auto',
        lineHeight: 1.6,
        fontSize: '14px',
      }}
    >
      {children}
    </pre>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.includes('language-')
    if (isBlock) {
      return (
        <code
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--text-primary)',
            whiteSpace: 'pre',
          }}
        >
          {children}
        </code>
      )
    }
    return (
      <code
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9em',
          background: 'var(--bg-secondary)',
          padding: '0.15em 0.4em',
          borderRadius: '4px',
          color: 'var(--text-primary)',
        }}
      >
        {children}
      </code>
    )
  },
}

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  const article = id ? getArticleById(id) : undefined

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrolled(e.currentTarget.scrollTop > 20)
  }

  if (!article) {
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
          文章未找到
        </h1>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            marginBottom: '24px',
          }}
        >
          该文章不存在或已被移除。
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
          返回首页
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
          borderBottom: scrolled
            ? '1px solid var(--border)'
            : '1px solid transparent',
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
          返回首页
        </button>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '-0.3px',
            maxWidth: '50%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {article.title}
        </span>
      </nav>

      {/* Hero 区域 */}
      <section
        style={{
          padding: '120px 24px 60px',
          maxWidth: '720px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.2, 0.8, 0.2, 1] as const,
          }}
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
            {article.album}
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 700,
              letterSpacing: '-1px',
              lineHeight: 1.2,
              color: 'var(--text-primary)',
              marginBottom: '20px',
            }}
          >
            {article.title}
          </h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                fontSize: '14px',
                color: 'var(--text-muted)',
              }}
            >
              {article.author}
            </span>
            <span
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--border)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--text-muted)',
              }}
            >
              {article.date}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {article.tags.map((tag) => (
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

      {/* 正文区域 */}
      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '0 24px 80px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.2, 0.8, 0.2, 1] as const,
          }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {article.content}
          </ReactMarkdown>
        </motion.div>
      </div>

      {/* 底部区域 */}
      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '0 24px 120px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: 0.6,
            ease: [0.2, 0.8, 0.2, 1] as const,
          }}
          style={{
            padding: '40px 32px',
            background: 'var(--bg-secondary)',
            borderRadius: '20px',
            border: '1px solid var(--border)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '32px',
              marginBottom: '28px',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '14px',
                color: 'var(--text-muted)',
              }}
            >
              <Eye size={16} strokeWidth={1.5} />
              <span>{article.readNum} 阅读</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '14px',
                color: 'var(--text-muted)',
              }}
            >
              <ThumbsUp size={16} strokeWidth={1.5} />
              <span>{article.likeNum} 点赞</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '14px',
                color: 'var(--text-muted)',
              }}
            >
              <Share2 size={16} strokeWidth={1.5} />
              <span>{article.shareNum} 分享</span>
            </div>
          </div>

          <a
            href={article.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
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
            <ExternalLink size={18} strokeWidth={1.5} />
            查看原文
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
}
