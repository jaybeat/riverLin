import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const tocItems = [
  { id: 'product', label: 'AI Agent 产品' },
  { id: 'course', label: 'AI Agent 课程设计' },
  { id: 'writings', label: '快速学习的系统方法' },
]

/** 左侧固定目录，跳转到首页三个模块；窄屏（放不下侧栏）自动隐藏 */
export default function SideToc() {
  const [wide, setWide] = useState(false)
  const [active, setActive] = useState<string>('product')

  // 仅在足够宽的视口显示，避免压到 720px 主列
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1080px)')
    const onChange = () => setWide(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // 滚动时高亮当前所在模块
  useEffect(() => {
    if (!wide) return
    const sections = tocItems
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [wide])

  if (!wide) return null

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      aria-label="模块目录"
      style={{
        position: 'fixed',
        top: '50%',
        left: '32px',
        transform: 'translateY(-50%)',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
      }}
    >
      {tocItems.map((item) => {
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'transparent',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <span
              style={{
                width: isActive ? '22px' : '12px',
                height: '2px',
                background: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                borderRadius: '2px',
                flexShrink: 0,
                transition: 'all 0.3s ease',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                lineHeight: 1.4,
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 400,
                transition: 'color 0.3s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </motion.nav>
  )
}
