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
          AI 能替我们做越来越多的事，却替不了我们去理解、去判断。当答案随手可得，真正稀缺的不再是记住多少知识，而是看懂现象背后的规律——这是
          AI 时代最难被替代的能力，也是一切创新的起点。
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
          可深度的理解，往往不是靠硬记发生的——它需要有逻辑、能被看见的材料，把一个复杂的东西拆成能循序渐进走进去的情境。所以我想做一个
          Agent，专门去创造这种促进深度理解的情境：让任何人都能一步步看懂一个领域、一条底层规律，也让企业的产品与理念更容易被用户理解。顺着这个方向走下去，我希望它最终会成为每个人随时能对话的深度导师——让学会任何一个感兴趣的领域、终身成长，从少数人的幸运，变成人人触手可及的事。
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
