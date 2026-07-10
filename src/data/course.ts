export interface Lesson {
  /** 课节编号，如 "01" */
  code: string
  title: string
  /** 展开后显示的本节内容说明 */
  desc: string
}

export interface CourseLayer {
  /** 层标签，如 "第一层 · 底层" */
  layer: string
  en: string
  /** 该层一句话说明 */
  summary: string
  lessons: Lesson[]
}

/** 「AI Agent 课程」三层递进目录 — 底层原理 → Claude Code 工具层 → 项目层 */
export const courseSyllabus: CourseLayer[] = [
  {
    layer: '第一层 · 底层：看懂 Agent 如何运作',
    en: 'Foundation · How Agents Work',
    summary: '不碰工具，先建立 Agent 的心智模型。',
    lessons: [
      {
        code: '01',
        title: '大模型与提示词基础',
        desc: 'token 与上下文窗口、system/user/assistant 角色、温度与采样；提示词工程与结构化输出，理解模型「能做什么、边界在哪」。',
      },
      {
        code: '02',
        title: '从对话到 Agent',
        desc: '一个最小 demo 如何一步步长出：多轮循环 → 短期记忆（带历史）→ 长期记忆（持久化）→ 工具调用 → 规划，收束为「大脑在大模型、手脚是工具」的心智模型。',
      },
      {
        code: '03',
        title: 'Agent 的进化路线',
        desc: '用达尔文进化论的方式看 chatbot → 记忆 → 工具 → skill → 多 Agent：每一步能力都是为化解一个新痛点而长出来的。',
      },
      {
        code: '04',
        title: '上下文工程与多 Agent 编排',
        desc: '上下文窗口的预算与污染、上下文隔离、子任务拆分与并行；多 Agent 为什么能抗幻觉、提效率。',
      },
    ],
  },
  {
    layer: '第二层 · 工具层：把 Claude Code 用透',
    en: 'Tooling · Master Claude Code',
    summary: '把上面的原理落到一把趁手的工具上。',
    lessons: [
      {
        code: '05',
        title: 'Claude Code 入门',
        desc: '安装与项目初始化、CLAUDE.md 项目记忆、读写文件 / 运行命令的基本循环，跑通第一个改动。',
      },
      {
        code: '06',
        title: '计划与执行模式',
        desc: 'Plan Mode（先出方案再动手）、编辑 / 自动接受权限档位、thinking 深度；何时该切哪种模式。',
      },
      {
        code: '07',
        title: '上下文管理指令',
        desc: '/clear 清空、/compact 压缩、/context 查看占用、@ 引用文件、# 写入记忆；长会话如何不被上下文拖垮。',
      },
      {
        code: '08',
        title: '斜杠命令与自定义命令',
        desc: '常用内置 slash 命令，编写自己的 /command 把高频流程一键化。',
      },
      {
        code: '09',
        title: 'Skills（技能）',
        desc: '什么是 skill、SKILL.md 结构、如何编写与自动触发，把重复工作流沉淀成可复用技能。',
      },
      {
        code: '10',
        title: 'Subagents（子代理）',
        desc: 'Explore / Plan 等子代理、上下文隔离与并行、何时拆子代理、怎么写子代理提示。',
      },
      {
        code: '11',
        title: 'MCP 与工具扩展',
        desc: '用 MCP 连接外部数据与工具（浏览器、数据库、第三方服务）、权限与安全边界。',
      },
      {
        code: '12',
        title: 'Hooks、权限与配置',
        desc: 'settings.json、hooks 自动化钩子、权限允许清单，把 Claude Code 调成自己的工作台。',
      },
    ],
  },
  {
    layer: '第三层 · 项目层：用 Agent 造出作品',
    en: 'Building · Ship with Agents',
    summary: '带着做出真东西，从自动化到完整应用。',
    lessons: [
      {
        code: '13',
        title: '用 Agent 构建自动化任务',
        desc: '把抓取、整理、定时批处理、脚本编排交给 Agent，用 skill 与命令把流程固化下来。',
      },
      {
        code: '14',
        title: '用 Agent 构建 Web 应用',
        desc: '从需求到部署走通一个 React + Vite 前端应用（对照学生项目），学会让 Agent 分步实现并自查。',
      },
      {
        code: '15',
        title: '用 Agent 做内容 / 数据管线',
        desc: '抓取 → 清洗 → 生成的流水线（如视频转指南、文章转站点），多 Agent 分工协作。',
      },
      {
        code: '16',
        title: '综合项目与上线复盘',
        desc: '从 0 到上线做一个完整作品，回看学生项目里的真实坑与解法。',
      },
    ],
  },
]
