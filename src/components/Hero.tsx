import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.2, 0.8, 0.2, 1] as const,
    },
  },
}

const links = [
  { label: '公众号', href: 'https://mp.weixin.qq.com/s/ZZXw3tdWwNJGSr1pTD7HOA' },
  { label: 'Mail', href: 'mailto:jaybeatlin1028@163.com' },
]

export default function Hero() {
  const navigate = useNavigate()
  return (
    <section
      id="hero"
      style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '120px 24px 48px',
      }}
    >
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--text-muted)',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          你好，我是
        </motion.p>

        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(40px, 6vw, 60px)',
            fontWeight: 700,
            letterSpacing: '-2px',
            lineHeight: 1.05,
            color: 'var(--text-primary)',
            marginBottom: '6px',
          }}
        >
          林川杰
        </motion.h1>

        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--text-muted)',
            letterSpacing: '1px',
            marginBottom: '14px',
          }}
        >
          RiverLin
        </motion.p>

        <motion.p
          variants={itemVariants}
          style={{
            fontSize: '17px',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            marginBottom: '14px',
          }}
        >
          AI 产品经理 · Agent 工程师 · 探索学习与创造的本质
        </motion.p>

        <motion.p
          variants={itemVariants}
          style={{
            fontSize: '15px',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            maxWidth: '600px',
            marginBottom: '12px',
          }}
        >
          AI 能替我们做的事越来越多，那我们是不是可以不用再学了？恰恰相反——它对人提出了更高的要求。当答案随手可得，重要的不再是记住多少知识、背下多少套路，而是能不能看懂现象背后的规律，长出
          AI 替代不了的理解与判断——这也是一切创新的起点。
        </motion.p>

        <motion.p
          variants={itemVariants}
          style={{
            fontSize: '15px',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            maxWidth: '600px',
            marginBottom: '24px',
          }}
        >
          于是真正的问题变成了：学一个领域，到底什么才值得学？值得死磕的，是那些能推导出一切的「知识生成器」——一个学科的大图景与思维方式，而不是随手可查、AI
          更在行的事实套路。选对了该学的，才谈得上怎么学：为它搭一个合适的理解情境，在解决问题中真正学懂、用起来。这正是我在用
          AI 探索的方向：让每个人都能有一个随时对话的深度导师——无论你想转专业、跨行业，还是要啃下一个陌生领域，都有人陪你一步步走过去。
        </motion.p>

        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => navigate('/about')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: 'var(--bg-secondary)',
              background: 'var(--text-primary)',
              border: '1px solid var(--text-primary)',
              padding: '9px 18px',
              borderRadius: '40px',
              cursor: 'pointer',
              transition: 'opacity 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.85'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
            }}
          >
            我的经历
            <ArrowRight size={15} strokeWidth={1.5} />
          </button>

          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '2px',
                transition: 'color 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.color = 'var(--text-primary)'
                el.style.borderColor = 'var(--text-muted)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.color = 'var(--text-secondary)'
                el.style.borderColor = 'var(--border)'
              }}
            >
              {label}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
