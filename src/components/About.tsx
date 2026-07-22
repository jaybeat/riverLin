import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Mail,
  GraduationCap,
  Zap,
  Package,
  BarChart3,
  TriangleAlert,
  Wrench,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Cpu,
} from 'lucide-react'

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

const intro = `我是林川杰（RiverLin），一名 AI 产品经理与 Agent 工程师。本科与硕士就读于中国人民大学信息学院，主攻数据挖掘与机器学习。职业生涯从微软亚洲研究院起步，随后以「阿里星」身份加入蚂蚁金服，从算法一路做到 P7 AI 产品专家，主导智能云客服、钉钉服务群等企业级 AI 产品，赋能上万商家、沉淀出可复制的标准化解决方案，并积累 3 项发明专利；之后从 0 到 1 搭建了云器科技的大数据分析平台。近几年我把重心转向「AI × 学习」的底层规律——在北京师范大学研修教育科学，如今在上海建桥学院讲授《数据结构》与新开设的《AI 智能体》课程，同时持续做 Agent / Skill 的工程实践（视频创作 Agent、内容解构灵感库、概念地图生成等，详见本站作品）。我始终相信：当答案随手可得，真正稀缺的是看懂现象背后的规律、并驾驭 AI 把事情做成的能力——这既是我教学的方向，也是我想继续深耕的领域。`

interface Education {
  school: string
  degree: string
  period: string
  honor: string
  gpa: string
  courses: string
}

const education: Education[] = [
  {
    school: '中国人民大学 · 信息学院',
    degree: '硕士',
    period: '2014.9 – 2017.6',
    honor: '一等奖学金',
    gpa: 'GPA 3.82 / 4.0',
    courses: '核心课程：机器学习、NLP、数据挖掘、图像识别',
  },
  {
    school: '中国人民大学 · 信息学院',
    degree: '本科',
    period: '2010.9 – 2014.7',
    honor: '保送研究生',
    gpa: 'GPA 3.56 / 4.0 ｜「创新杯」特等奖 · 数模北京一等奖',
    courses: '核心课程：数分、高代、概率统计、数据结构、算法',
  },
]

interface SkillGroup {
  title: string
  items: string[]
}

const skillGroups: SkillGroup[] = [
  {
    title: 'AI 技术理解',
    items: ['机器学习 / LLM / prompt', 'Workflow、Agent', 'MCP、LangGraph'],
  },
  {
    title: '企业级 AI 产品能力',
    items: ['需求调研 / 产品定义', 'AI 融入创新', '智能问答、知识库产品'],
  },
  {
    title: '综合能力',
    items: ['团队推动和协同', '系统思维', '结构化写作'],
  },
]

interface Metric {
  label: string
  desc: string
}

interface WorkItem {
  label: string
  desc: string
}

interface LinkItem {
  label: string
  href: string
}

interface TechGroup {
  label: string
  items: string[]
}

interface Experience {
  company: string
  role: string
  period: string
  capability: string
  techStack?: TechGroup[]
  outputTitle: string
  outputs: string[]
  metrics?: Metric[]
  background?: string
  product?: string
  work?: WorkItem[]
  links?: LinkItem[]
}

const experiences: Experience[] = [
  {
    company: '蚂蚁金服',
    role: '阿里星算法工程师',
    period: '2016 – 2019',
    capability: 'AI 技术理解',
    outputTitle: '成果',
    outputs: ['风险预测模型', '内容标签体系', '因子选股回测工具'],
    metrics: [
      { label: '风险预测', desc: '基于随机森林模型，显著降低保险出险风险预测误差' },
      { label: '点击率 +60%', desc: '构建社区内容标签体系，大幅提升点击率' },
      { label: '量化系统', desc: '完成因子选股与回测系统原型搭建' },
    ],
    background:
      '金融场景下风险预测精度不足，直接影响业务止损；社区内容理解维度单一，导致推荐分发效率受限。',
    product: '风险预测模型服务 · 社区内容标签系统 · 量化因子选股工具',
    work: [
      { label: '模型优化', desc: '清洗海量特征数据，训练与调优随机森林等机器学习模型。' },
      { label: '标签体系', desc: '设计并落地内容标签挖掘算法，构建多维度的内容画像。' },
      { label: '量化回测', desc: '从 0 搭建基于新闻与基本面的因子选股回测框架。' },
    ],
  },
  {
    company: '蚂蚁金服',
    role: '智能云客服',
    period: '2019 – 2021',
    capability: '企业级 AI 产品能力',
    outputTitle: '产品',
    outputs: ['智能云客服（智能知识库 + 推荐气泡）'],
    metrics: [
      { label: '规模', desc: '支持 10,000+ 家小程序商家' },
      { label: '效率', desc: '平台用户人工求助率下降约 25%' },
      { label: '覆盖', desc: '成为支付宝小程序生态标配服务组件' },
    ],
    background:
      '商家知识库覆盖率低且更新不及时，传统检索式问答理解能力弱，导致用户自助解决率低，人工客服压力巨大。',
    product: '智能云客服平台（含智能知识库、推荐气泡组件、运营分析后台）',
    work: [
      { label: '知识库构建', desc: '设计半自动抽取工具与知识图谱架构，降低商家冷启动成本。' },
      { label: '推荐气泡', desc: '引入语义匹配与意图识别，在用户提问前预判需求。' },
      { label: '反馈闭环', desc: '建立「点踩 / 人工介入」的数据回流机制，反哺模型优化。' },
    ],
  },
  {
    company: '蚂蚁金服',
    role: '钉钉服务群',
    period: '2019 – 2021',
    capability: '综合能力 · 系统思维',
    outputTitle: '产品',
    outputs: ['一站式 B2B 社群服务平台（群服务组件 + 开放 API）'],
    metrics: [
      { label: '覆盖范围', desc: '覆盖阿里云、淘宝商家运营等 30+ 内部核心业务场景' },
      { label: '核心能力', desc: '群自主应答、群活码、跨应用统一身份(OneID) 等核心能力' },
      { label: '业务成效', desc: 'B2B 服务从「人肉堆砌」向「智能化运营」转型' },
    ],
    background:
      'B2B 服务协同角色多（销售 / 实施 / 客服）、决策与服务链路长，传统群聊缺乏沉淀与管理，效率低下且难以量化。',
    product: '一站式 B2B 社群服务平台（含群服务组件、开放接口、数据看板）',
    work: [
      { label: '顶层设计', desc: '构建「人-客-群-内容」四层逻辑，定义 B2B 社群服务标准。' },
      { label: '精细运营', desc: '设计权限管理、分层服务体系与群消息质量监控机制。' },
      { label: '生态打通', desc: '打通钉钉开放平台与小程序，实现业务流在群内的闭环。' },
    ],
  },
  {
    company: '杭州云器科技',
    role: '大数据平台产品负责人',
    period: '2022 – 2023',
    capability: '企业级 AI 产品能力',
    outputTitle: '产品',
    outputs: ['客户数据分析平台（采-建-管-用全链）'],
    metrics: [
      { label: '落地应用', desc: '推动多家金融与 SaaS 企业落地数字化客户管理体系' },
      { label: '统一集成', desc: '搭建 OneID 打通、标签加工与画像分析平台' },
      { label: '可视化', desc: '实现从数据接入到可视化洞察的全链路闭环' },
    ],
    background:
      '企业客户数据「采、建、管、用」链路割裂，数据孤岛严重，运营难以形成闭环，数据价值无法有效释放。',
    product: '客户数据分析平台（采-建-管-用全链路解决方案）',
    work: [
      { label: '数据治理', desc: '设计多源数据接入标准与统一身份(OneID)打通方案。' },
      { label: '标签体系', desc: '构建灵活的标签加工引擎与客户画像 360 视图。' },
      { label: '分析触达', desc: '开发可视化分析看板与自动化营销触达组件。' },
    ],
  },
  {
    company: '上海建桥学院',
    role: '大学教师',
    period: '2023 – 至今',
    capability: 'AI Agent 实践',
    outputTitle: '成果',
    outputs: [
      '视频创作 Agent',
      '内容解构灵感库',
      '概念地图生成',
      '《AI 智能体》课程',
      'WHWM 评测框架',
    ],
    metrics: [
      { label: '爆款', desc: '视频创作 Agent 产出《数据结构》10 万+ 阅读' },
      { label: '课程', desc: '新开《AI 智能体》四单元进阶课，指导众多学生 AI 作品' },
      { label: '评测', desc: '自研 WHWM 拆解框架，把主观审美转化为可度量 evals' },
    ],
    background:
      'AI 让答案随手可得，教学重点从「记知识」转向「长出 AI 替代不了的理解与判断」；同时 Agent 作品质量主观、难以稳定评估。',
    product:
      '多个 AI Agent / Skill 工程项目（视频创作 Agent、内容解构灵感库、概念地图生成）+《与智能体共事》课程体系 + WHWM 评测组件库',
    work: [
      {
        label: 'Agent 工程实践',
        desc: '设计并开发 Skill / 多 Agent 系统，深度使用 Claude Code 等主流 Agent 工具。',
      },
      {
        label: '课程设计',
        desc: '从机制出发设计四单元进阶课程，学生角色随之逐级晋升。',
      },
      {
        label: '系统学习 + 评测',
        desc: '以 WHWM 拆解框架沉淀可复用「组件库」，用 rubric 把主观审美转化为可度量的 evals。',
      },
    ],
  },
]

/* ── 教育版数据（面向 AI 老师岗：懂技术 / 会应用 / 能教学带赛） ──────── */

const teacherIntro = `我是林川杰（RiverLin）。本科与硕士就读于中国人民大学信息学院，主攻数据挖掘与机器学习，为「懂 AI」打下了扎实底子。我的 AI 技术之路从微软亚洲研究院起步，随后在支付宝（蚂蚁金服）做到高级工程师，用机器学习、NLP、推荐与量化建模解决真实业务问题；此后转向应用创新，先后主导钉钉服务群、智能云客服、大数据分析平台等企业级 AI 产品，绩效 375「优秀」。近几年我把重心放到「AI × 学习」——以「理解型学习」的理念，在上海建桥学院开设《编程算法》与《AI 智能体》课程，从机制出发设计课程、培养学生的 AI 思维与作品，并指导学生在蓝桥杯、ICPC 等竞赛中获奖。我希望做的，正是一名 AI 老师需要的那种人：既深入理解 AI 技术，又有把 AI 落地成产品的应用创新能力，还能把这些变成学生长得出来的理解、作品与奖项。`

const teacherSkillGroups: SkillGroup[] = [
  {
    title: '深入理解 AI 技术',
    items: ['机器学习 / 深度学习 / NLP', 'LLM · Prompt · Agent · MCP', '推荐与量化建模'],
  },
  {
    title: 'AI 应用创新能力',
    items: ['从需求到产品定义', '把 AI 融入真实业务', '企业级问答 / 知识库 / 数据平台落地'],
  },
  {
    title: '教学与比赛能力',
    items: ['理解型学习理念', '从机制出发的课程设计', '培养学生 AI 思维、作品与竞赛获奖'],
  },
]

const teacherExperiences: Experience[] = [
  {
    company: '深入理解 AI 技术',
    role: '微软亚研 → 支付宝高级工程师',
    period: '2016 – 2021',
    capability: '深入理解 AI 技术',
    techStack: [
      {
        label: '机器学习 / 建模',
        items: ['机器学习', '深度学习', '神经网络', 'NLP', '推荐系统', '量化建模'],
      },
      {
        label: 'LLM · Agent 工程',
        items: ['Agent', 'Skill', 'MCP', 'RAG', 'Multi-Agent', 'Prompt / Workflow'],
      },
    ],
    outputTitle: '代表项目',
    outputs: ['风险预测模型', '内容标签体系'],
    metrics: [
      { label: '风险预测', desc: '随机森林模型显著降低保险出险预测误差' },
      { label: '点击率 +60%', desc: '内容标签体系提升内容分发点击率' },
    ],
    background:
      '在微软亚研起步、于支付宝深耕算法：金融风险预测精度不足直接影响业务止损，社区内容理解维度单一制约分发效率，都需要用机器学习从数据里「长出」判断。',
    product: '风险预测模型服务 · 社区内容标签系统 · 量化因子选股工具',
    work: [
      { label: '模型优化', desc: '清洗海量特征数据，训练与调优随机森林等机器学习模型。' },
      { label: '标签体系', desc: '设计并落地内容标签挖掘算法，构建多维度内容画像。' },
      { label: '量化回测', desc: '从 0 搭建基于新闻与基本面的因子选股回测框架。' },
    ],
  },
  {
    company: 'AI 应用创新能力',
    role: '支付宝 AI 产品专家',
    period: '2019 – 2023',
    capability: 'AI 应用创新能力',
    outputTitle: '产品',
    outputs: ['智能云客服（知识库 + 推荐气泡）', '钉钉一站式 B2B 社群服务平台', '客户数据分析平台'],
    metrics: [
      { label: '绩效 375 · 优秀', desc: '企业级 AI 产品交付获「优秀」绩效评级' },
      { label: '10,000+ 商家', desc: '智能云客服支撑上万小程序商家，人工求助率下降约 25%' },
      { label: '30+ 业务场景', desc: '钉钉服务群覆盖阿里云、淘宝商家运营等内部核心业务' },
    ],
    background:
      '把 AI 从「模型」做成「产品」：商家知识库覆盖低、传统检索问答弱；B2B 服务链路长、难沉淀；企业客户数据「采建管用」割裂——都需要产品化的 AI 应用创新。',
    product:
      '智能云客服平台、钉钉一站式 B2B 社群服务平台、客户数据分析平台（企业岗更详细的分项经历见「企业版」）',
    work: [
      { label: '智能客服', desc: '设计半自动知识抽取 + 语义推荐气泡，在用户提问前预判需求并闭环反馈。' },
      { label: '钉钉服务群', desc: '以「人-客-群-内容」四层逻辑定义 B2B 社群服务标准，打通开放平台。' },
      { label: '数据平台', desc: '搭建 OneID 打通、标签加工与画像分析，实现数据接入到洞察的闭环。' },
    ],
  },
  {
    company: '教学与比赛能力',
    role: '上海建桥学院',
    period: '2023 – 至今',
    capability: '教学与比赛能力',
    outputTitle: '成果',
    outputs: [
      '北京师范大学「理解型学习」专业教师',
      '《编程算法》课程',
      '《AI 智能体》四单元进阶课',
      '学生 AI 作品',
      '竞赛获奖指导',
    ],
    metrics: [
      { label: '蓝桥杯银奖', desc: '指导学生在蓝桥杯程序设计竞赛中获得银奖' },
      { label: 'ICPC 铜奖', desc: '指导学生在 ICPC 国际大学生程序设计竞赛中获得铜奖' },
      { label: '学生作品', desc: '带出多项学生 AI 实践作品（桌宠、地图、拍照学单词等）' },
    ],
    background:
      'AI 让答案随手可得，教学重点从「记知识」转向「长出 AI 替代不了的理解与判断」。我以「理解型学习」为理念，从机制出发设计课程，让学生既能打编程算法的硬底子，又能用 AI 做出自己的作品。',
    product:
      '《编程算法》+《AI 智能体》课程体系：从机制出发的四单元进阶课，配套学生 AI 作品与竞赛指导。',
    work: [
      { label: '理解型学习', desc: '不教「工具怎么点」，而教「机制为什么」，培养可迁移的 AI 思维。' },
      { label: '课程设计', desc: '从机制出发设计四单元进阶课程，学生角色随之逐级晋升。' },
      { label: '作品与竞赛', desc: '指导学生产出 AI 作品并在蓝桥杯、ICPC 等竞赛中获奖。' },
    ],
    links: [
      { label: '查看课程设计', href: '/#course' },
      { label: '学生作品', href: '/#course' },
    ],
  },
]

/* ── 共享内容组件（滚动视图与放映视图复用） ─────────────────────── */

/** section 标题：mono 英文小标 + 中文大标（可选图标） */
function SectionHeading({
  en,
  zh,
  icon,
}: {
  en: string
  zh: string
  icon?: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: '24px' }}>
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
          fontSize: 'clamp(24px, 4vw, 30px)',
          fontWeight: 700,
          letterSpacing: '-0.5px',
          lineHeight: 1.15,
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {icon}
        {zh}
      </h2>
    </div>
  )
}

function CoverContent({ intro, subtitle }: { intro: string; subtitle?: string }) {
  return (
    <div>
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
        About Me
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(36px, 6vw, 52px)',
          fontWeight: 700,
          letterSpacing: '-1.5px',
          lineHeight: 1.1,
          color: 'var(--text-primary)',
          marginBottom: subtitle ? '10px' : '28px',
        }}
      >
        林川杰 <span style={{ color: 'var(--text-muted)' }}>/ RiverLin</span>
      </h1>
      {subtitle && (
        <p
          style={{
            fontSize: '17px',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            marginBottom: '28px',
          }}
        >
          {subtitle}
        </p>
      )}
      <p style={{ fontSize: '15px', lineHeight: 1.9, color: 'var(--text-secondary)' }}>{intro}</p>
    </div>
  )
}

function EducationContent() {
  return (
    <div>
      <SectionHeading
        en="Education"
        zh="教育背景"
        icon={<GraduationCap size={24} strokeWidth={1.6} style={{ color: 'var(--text-muted)' }} />}
      />
      <div className="edu-grid">
        {education.map((edu) => (
          <div
            key={edu.degree}
            style={{
              borderRadius: '14px',
              border: '1px solid var(--border)',
              background: 'var(--surface-card)',
              boxShadow: 'var(--shadow)',
              padding: '20px 22px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '10px',
                marginBottom: '4px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}
              >
                {edu.school}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '1px 9px',
                  flexShrink: 0,
                }}
              >
                {edu.degree}
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginBottom: '12px',
              }}
            >
              {edu.period} · {edu.honor}
            </p>
            <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '6px' }}>
              {edu.gpa}
            </p>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>{edu.courses}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SkillsContent({ groups }: { groups: SkillGroup[] }) {
  return (
    <div>
      <SectionHeading
        en="Core Skills"
        zh="核心能力"
        icon={<Zap size={22} strokeWidth={1.6} style={{ color: 'var(--text-muted)' }} />}
      />
      <div className="skill-grid">
        {groups.map((group) => (
          <div
            key={group.title}
            style={{
              borderRadius: '14px',
              border: '1px solid var(--border)',
              background: 'var(--surface-card)',
              boxShadow: 'var(--shadow)',
              padding: '18px 20px',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--accent-text)',
                paddingBottom: '12px',
                marginBottom: '12px',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {group.title}
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {group.items.map((item) => (
                <li
                  key={item}
                  style={{
                    display: 'flex',
                    gap: '9px',
                    fontSize: '14px',
                    lineHeight: 1.5,
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
                      marginTop: '7px',
                    }}
                  />
                  <span style={{ minWidth: 0 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

/** 右卡里的一个小节：图标 + mono 小标 + 内容 */
function SubBlock({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: '8px',
        }}
      >
        {icon}
        {label}
      </p>
      {children}
    </div>
  )
}

/** 左侧高亮深色卡：成果/产品 + 核心指标（等高填充） */
function HighlightCard({ exp }: { exp: Experience }) {
  return (
    <div
      style={{
        height: '100%',
        borderRadius: '14px',
        background: 'var(--accent)',
        color: 'var(--accent-on)',
        padding: '22px 22px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {exp.techStack && (
        <div>
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              opacity: 0.6,
              marginBottom: '12px',
            }}
          >
            <Cpu size={13} strokeWidth={1.6} />
            精通技术
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {exp.techStack.map((g) => (
              <div key={g.label}>
                <p style={{ fontSize: '12px', opacity: 0.6, marginBottom: '7px' }}>{g.label}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {g.items.map((it) => (
                    <span
                      key={it}
                      style={{
                        fontSize: '12.5px',
                        fontWeight: 500,
                        lineHeight: 1.4,
                        background: 'rgba(255, 255, 255, 0.13)',
                        borderRadius: '8px',
                        padding: '3px 9px',
                      }}
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            opacity: 0.6,
            marginBottom: '10px',
          }}
        >
          <Package size={13} strokeWidth={1.6} />
          {exp.outputTitle}
        </p>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {exp.outputs.map((o) => (
            <li key={o} style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.5 }}>
              {o}
            </li>
          ))}
        </ul>
      </div>

      {exp.metrics && (
        <div>
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              opacity: 0.6,
              marginBottom: '12px',
            }}
          >
            <BarChart3 size={13} strokeWidth={1.6} />
            核心指标
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {exp.metrics.map((m) => (
              <div key={m.label}>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '17px',
                    fontWeight: 600,
                    letterSpacing: '-0.3px',
                    marginBottom: '3px',
                  }}
                >
                  {m.label}
                </p>
                <p style={{ fontSize: '13px', lineHeight: 1.6, opacity: 0.78 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/** 右侧浅色描边卡：背景与痛点 / 产出产品 / 核心工作（等高填充） */
function DetailCard({ exp }: { exp: Experience }) {
  return (
    <div
      style={{
        height: '100%',
        borderRadius: '14px',
        border: '1px solid var(--border)',
        background: 'var(--surface-card)',
        boxShadow: 'var(--shadow)',
        padding: '22px 24px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {exp.background && (
        <SubBlock icon={<TriangleAlert size={13} strokeWidth={1.6} />} label="背景与痛点">
          <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--text-secondary)' }}>{exp.background}</p>
        </SubBlock>
      )}

      {exp.product && (
        <SubBlock icon={<Package size={13} strokeWidth={1.6} />} label="产出产品">
          <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--text-secondary)' }}>{exp.product}</p>
        </SubBlock>
      )}

      {exp.work && (
        <SubBlock icon={<Wrench size={13} strokeWidth={1.6} />} label="核心工作">
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {exp.work.map((w) => (
              <li key={w.label} style={{ display: 'flex', gap: '10px', fontSize: '14px', lineHeight: 1.7 }}>
                <span
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: 'var(--text-muted)',
                    flexShrink: 0,
                    marginTop: '9px',
                  }}
                />
                <span style={{ minWidth: 0, color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{w.label}：</strong>
                  {w.desc}
                </span>
              </li>
            ))}
          </ul>
        </SubBlock>
      )}

      {exp.links && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '2px' }}>
          {exp.links.map((lnk) => (
            <a
              key={lnk.label}
              href={lnk.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--accent-text)',
                background: 'var(--accent-soft)',
                border: '1px solid var(--accent-border)',
                borderRadius: '20px',
                padding: '6px 14px',
                textDecoration: 'none',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
              }}
            >
              {lnk.label} →
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

/** 一段经历「幻灯片块」：能力标签 + 标题 + 双栏等高卡片（compact 时单卡） */
function ExperienceContent({ exp }: { exp: Experience }) {
  return (
    <div>
      {/* 能力标签 */}
      <span
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.5px',
          color: 'var(--accent-text)',
          background: 'var(--accent-soft)',
          border: '1px solid var(--accent-border)',
          borderRadius: '20px',
          padding: '4px 12px',
          marginBottom: '12px',
        }}
      >
        能力 · {exp.capability}
      </span>

      {/* 标题 + 时间 */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          gap: '8px 14px',
          marginBottom: '18px',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(20px, 3vw, 24px)',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            color: 'var(--text-primary)',
            lineHeight: 1.2,
          }}
        >
          {exp.company} · {exp.role}
        </h3>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)' }}>
          {exp.period}
        </span>
      </div>

      <div className="exp-grid">
        <HighlightCard exp={exp} />
        <DetailCard exp={exp} />
      </div>
    </div>
  )
}

function ContactContent() {
  return (
    <div>
      <SectionHeading en="Contact" zh="联系我" />
      <a
        href="mailto:jaybeatlin1028@163.com"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'var(--font-mono)',
          fontSize: '14px',
          color: 'var(--text-secondary)',
          padding: '10px 18px',
          borderRadius: '40px',
          border: '1px solid var(--border)',
          background: 'var(--bg-secondary)',
          transition: 'all 0.25s ease',
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
        <Mail size={15} strokeWidth={1.5} />
        jaybeatlin1028@163.com
      </a>
    </div>
  )
}

/* ── 页面 ──────────────────────────────────────────────────────── */

interface Slide {
  key: string
  node: React.ReactNode
}

function buildSlides(
  intro: string,
  subtitle: string | undefined,
  groups: SkillGroup[],
  exps: Experience[],
): Slide[] {
  return [
    { key: 'cover', node: <CoverContent intro={intro} subtitle={subtitle} /> },
    {
      key: 'edu-skills',
      node: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <EducationContent />
          <SkillsContent groups={groups} />
        </div>
      ),
    },
    ...exps.map((exp) => ({
      key: `${exp.company}-${exp.role}-${exp.period}`,
      node: <ExperienceContent exp={exp} />,
    })),
    { key: 'contact', node: <ContactContent /> },
  ]
}

/** 放映模式覆盖层：一次一页，键盘 ←/→ 翻页、Esc 退出 */
function Presentation({ slides, onExit }: { slides: Slide[]; onExit: () => void }) {
  const [current, setCurrent] = useState(0)
  const [zoom, setZoom] = useState(1)
  const last = slides.length - 1

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        setCurrent((c) => Math.min(c + 1, last))
      } else if (e.key === 'ArrowLeft') {
        setCurrent((c) => Math.max(c - 1, 0))
      } else if (e.key === 'Escape') {
        onExit()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [last, onExit])

  // 浏览器退出全屏（Esc / 手动）时联动退出放映
  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement) onExit()
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [onExit])

  // 按视口宽度整体缩放，让内容像 PPT 一样铺满、放大
  useEffect(() => {
    const calc = () => setZoom(Math.min(1.6, Math.max(1.05, window.innerWidth / 1200)))
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  const navBtn = (enabled: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1px solid var(--border)',
    background: 'var(--bg-primary)',
    color: 'var(--text-secondary)',
    cursor: enabled ? 'pointer' : 'default',
    opacity: enabled ? 1 : 0.35,
    transition: 'all 0.2s ease',
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="present-scope"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 顶栏：进度 + 退出 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 28px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)' }}>
          {current + 1} / {slides.length}
        </span>
        <button
          onClick={onExit}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '6px 14px',
            cursor: 'pointer',
            background: 'transparent',
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
          退出放映
          <X size={15} strokeWidth={1.6} />
        </button>
      </div>

      {/* 幻灯片区：铺满 + 居中，内容超高时可滚动 */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[current].key}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ margin: 'auto', width: '100%' }}
          >
            <div
              style={{
                zoom,
                width: '100%',
                maxWidth: '1120px',
                margin: '0 auto',
                padding: 'clamp(16px, 3vh, 40px) clamp(24px, 4vw, 72px)',
              }}
            >
              {slides[current].node}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 底部控件 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          padding: '16px 28px',
          borderTop: '1px solid var(--border)',
        }}
      >
        <button
          aria-label="上一页"
          onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
          disabled={current === 0}
          style={navBtn(current !== 0)}
        >
          <ChevronLeft size={18} strokeWidth={1.6} />
        </button>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)', minWidth: '48px', textAlign: 'center' }}>
          {current + 1} / {slides.length}
        </span>
        <button
          aria-label="下一页"
          onClick={() => setCurrent((c) => Math.min(c + 1, last))}
          disabled={current === last}
          style={navBtn(current !== last)}
        >
          <ChevronRight size={18} strokeWidth={1.6} />
        </button>
      </div>
    </motion.div>
  )
}

export default function About() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [presenting, setPresenting] = useState(false)
  const [canPresent, setCanPresent] = useState(false)
  const [variant, setVariant] = useState<'enterprise' | 'teacher'>('enterprise')

  // 按 variant 选数据：企业版（编年 5 段）/ 教育版（三核心能力 3 段）
  const activeIntro = variant === 'teacher' ? teacherIntro : intro
  const activeSubtitle =
    variant === 'teacher' ? '互联网大厂 AI 工程师 → 教育' : 'AI 产品经理 · Agent 工程师'
  const activeSkillGroups = variant === 'teacher' ? teacherSkillGroups : skillGroups
  const activeExperiences = variant === 'teacher' ? teacherExperiences : experiences
  const slides = buildSlides(activeIntro, activeSubtitle, activeSkillGroups, activeExperiences)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrolled(e.currentTarget.scrollTop > 20)
  }

  // 仅在足够宽的视口开放放映（窄屏强制长页面）
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const onChange = () => {
      setCanPresent(mq.matches)
      if (!mq.matches) setPresenting(false)
    }
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const enterPresent = () => {
    // 用户手势内触发系统级全屏（像 PPT 放映）；被拒绝则退回铺满窗口
    document.documentElement.requestFullscreen?.().catch(() => {})
    setPresenting(true)
  }

  const exitPresent = () => {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
    setPresenting(false)
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onScroll={handleScroll}
      className="about-scope"
      style={{
        minHeight: '100vh',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      {/* About 局部配色：暖纸底 + 浮起的白卡 + 墨绿强调（不影响全站其它页面） */}
      <style>{`
        .about-scope {
          --surface-card: #fdfcfa;
          --border: #e6e2da;
          --text-secondary: #5a5854;
          --text-muted: #9a968e;
          --accent: #2f5d4a;
          --accent-on: #eef3ef;
          --accent-text: #2f5d4a;
          --accent-soft: #e8efe9;
          --accent-border: #d3e2d8;
        }
        /* 放映模式走深色 deck：同一墨绿家族，提亮以适应深底 */
        .present-scope {
          --bg-primary: #14161a;
          --bg-secondary: #1d2026;
          --surface-card: #1b1e23;
          --text-primary: #f2f3f5;
          --text-secondary: #a7adb5;
          --text-muted: #6c727a;
          --border: #2b2f36;
          --accent: #2f8062;
          --accent-on: #eaf6f0;
          --accent-text: #7fc3a3;
          --accent-soft: #17251f;
          --accent-border: #2a4638;
          --shadow: none;
        }
        .exp-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
          gap: 20px;
          align-items: stretch;
        }
        .edu-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }
        .skill-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        @media (max-width: 760px) {
          .exp-grid, .edu-grid, .skill-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>

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
          返回首页
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* 版本切换：企业版 / 教育版 */}
          <div
            style={{
              display: 'inline-flex',
              padding: '3px',
              borderRadius: '20px',
              border: '1px solid var(--border)',
              background: 'var(--surface-card)',
            }}
          >
            {([
              ['enterprise', '企业版'],
              ['teacher', '教育版'],
            ] as const).map(([key, label]) => {
              const active = variant === key
              return (
                <button
                  key={key}
                  onClick={() => setVariant(key)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    padding: '5px 12px',
                    borderRadius: '16px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: active ? 'var(--accent)' : 'transparent',
                    color: active ? 'var(--accent-on)' : 'var(--text-secondary)',
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>
          {canPresent && (
            <button
              onClick={enterPresent}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--accent-on)',
                background: 'var(--accent)',
                border: '1px solid var(--accent)',
                borderRadius: '20px',
                padding: '7px 16px',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.85'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
              }}
            >
              <Play size={14} strokeWidth={1.8} />
              放映
            </button>
          )}
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.3px',
            }}
          >
            我的经历
          </span>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section
        style={{
          padding: '120px 24px 48px',
          maxWidth: '760px',
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] as const }}
        >
          <CoverContent intro={activeIntro} subtitle={activeSubtitle} />
        </motion.div>
      </section>

      {/* 内容区域 */}
      <div
        style={{
          maxWidth: '880px',
          margin: '0 auto',
          padding: '0 24px 120px',
          display: 'flex',
          flexDirection: 'column',
          gap: '72px',
        }}
      >
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <EducationContent />
        </motion.section>

        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <SkillsContent groups={activeSkillGroups} />
        </motion.section>

        {/* 主要经历 */}
        <section>
          <SectionHeading en="Experience" zh="主要经历" />
          <p
            style={{
              fontSize: '14px',
              lineHeight: 1.75,
              color: 'var(--text-muted)',
              marginTop: '-12px',
              marginBottom: '36px',
            }}
          >
            以下每段经历，都是对上面某项核心能力的印证。
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
            {activeExperiences.map((exp) => (
              <motion.div
                key={`${exp.company}-${exp.role}-${exp.period}`}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
              >
                <ExperienceContent exp={exp} />
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <ContactContent />
        </motion.section>
      </div>

      <AnimatePresence>
        {presenting && <Presentation key="present" slides={slides} onExit={exitPresent} />}
      </AnimatePresence>
    </motion.div>
  )
}
