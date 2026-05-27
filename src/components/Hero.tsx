import { motion } from 'framer-motion'
import { Github, Twitter, Mail } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.8, 0.2, 1] as const,
    },
  },
}

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: '680px' }}
      >
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--text-muted)',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          你好，我是
        </motion.p>

        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(48px, 8vw, 80px)',
            fontWeight: 700,
            letterSpacing: '-2.4px',
            lineHeight: 1.05,
            color: 'var(--text-primary)',
            marginBottom: '20px',
          }}
        >
          RiverLin
        </motion.h1>

        <motion.p
          variants={itemVariants}
          style={{
            fontSize: '20px',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            marginBottom: '16px',
          }}
        >
          AI产品经理 & Agent工程师
        </motion.p>

        <motion.p
          variants={itemVariants}
          style={{
            fontSize: '16px',
            lineHeight: 1.75,
            color: 'var(--text-muted)',
            maxWidth: '480px',
            margin: '0 auto 40px',
          }}
        >
          林川杰，专注于 AI 产品设计与智能体工程化落地。热爱探索大模型应用与自动化工作流，在这里分享我的技术思考与项目实践。
        </motion.p>

        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {[
            { icon: Github, href: 'https://github.com' },
            { icon: Twitter, href: 'https://twitter.com' },
            { icon: Mail, href: 'mailto:hello@example.com' },
          ].map(({ icon: Icon, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-secondary)',
                color: 'var(--text-secondary)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.background = 'var(--text-primary)'
                el.style.color = 'var(--bg-primary)'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.background = 'var(--bg-secondary)'
                el.style.color = 'var(--text-secondary)'
                el.style.transform = 'translateY(0)'
              }}
            >
              <Icon size={20} strokeWidth={1.5} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'var(--border)',
            margin: '0 auto 8px',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            letterSpacing: '1px',
          }}
        >
          SCROLL
        </span>
      </motion.div>
    </section>
  )
}
