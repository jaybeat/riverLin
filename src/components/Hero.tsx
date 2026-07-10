import { motion } from 'framer-motion'

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
  { label: 'Mail', href: 'mailto:hello@riverlin.me' },
]

export default function Hero() {
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
          AI 能替我们做越来越多的事，却替不了我们去理解、去品味、去判断。当答案随手可得，稀缺的不再是记住多少知识，而是能不能透视现象、看懂规律、建构起自己的思维框架——这是
          AI 时代最难被替代的能力。
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
          真正的创新，恰恰生长在「你的作品」与「理想的样子」之间那道不断被缩小的差距里。所以我想做的，是让
          AI 成为缩小这道差距的帮手——我擅长把 Agent
          从想法造成能用的产品，也擅长把复杂的东西拆开讲清楚，把两者合成一件事：带人拆解好作品、看懂规律，长出深度理解与品味迭代的能力。不教人背下标准答案，而是一套越用越厚的成长积累。
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
