export interface Lesson {
  /** 课节编号，如 "01" */
  code: string
  title: string
  /** 展开后显示的本节内容说明 */
  desc: string
  /** 本节配套的可交付小任务：学完这节用它的知识能解决的一件事 */
  task: string
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
        title: '大模型基础',
        desc: 'token 与上下文窗口、模型能做什么、边界在哪；理解它本质是「无状态的下一个词预测器」，为后面的 loop 埋下伏笔。（不含提示词工程）',
        task: '在 playground 里手动把上一轮对话拼进这一轮输入，让模型「看起来有记忆」，亲手验证它本身不记得任何东西。',
      },
      {
        code: '02',
        title: 'Agent 运行原理',
        desc: '一句话心智模型——大脑是 LLM、手脚是 tool、串起来的是 loop：LLM 决定调哪个工具 → 执行 → 结果塞回上下文 → 再循环，直到任务完成，配一个具体 demo 演示。',
        task: '手写一个最小 loop（约 30 行）：让 LLM 在「查天气 / 算数」两个 tool 间自己选择、执行、拿结果再回答，跑通一次多步调用。',
      },
    ],
  },
  {
    layer: '第二层 · 工具层：把 Claude Code 用透',
    en: 'Tooling · Master Claude Code',
    summary: '把上面的原理落到一把趁手的工具上。',
    lessons: [
      {
        code: '03',
        title: 'Claude Code 入门',
        desc: '安装与项目初始化、CLAUDE.md 项目记忆、读写文件 / 运行命令的基本循环，跑通第一个改动。',
        task: '装好 Claude Code，为一个真实项目写一份 CLAUDE.md，让它读懂项目并跑通第一个小改动（改文案或加一个函数）。',
      },
      {
        code: '04',
        title: '计划与执行模式',
        desc: 'Plan Mode（先出方案再动手）、编辑 / 自动接受权限档位、thinking 深度；何时该切哪种模式。',
        task: '用 Plan Mode 完成一个跨多文件的改动——先出方案、你确认后再执行，对比「直接改」的差别。',
      },
      {
        code: '05',
        title: '上下文管理',
        desc: '/clear 清空、/compact 压缩、/context 查看占用、@ 引用文件、# 写入记忆；长会话如何不被上下文拖垮。',
        task: '在一个需要多轮的长任务里，用 /compact、@、# 把上下文控制住，全程不崩、不丢关键信息。',
      },
      {
        code: '06',
        title: 'Skills（技能）',
        desc: '什么是 skill、SKILL.md 结构、如何编写与自动触发，把重复工作流沉淀成可复用技能。',
        task: '把你重复做的一个工作流（如「公众号文章转站点条目」）写成一个 skill，靠描述自动触发跑通一遍。',
      },
      {
        code: '07',
        title: 'Subagents（子代理）',
        desc: 'Explore / Plan 等子代理、上下文隔离与并行、何时拆子代理、怎么写子代理提示。',
        task: '用 Explore 子代理并行搜代码、再用 Plan 子代理出方案，完成一个「先调研后动手」的任务。',
      },
      {
        code: '08',
        title: 'MCP 与工具扩展',
        desc: '用 MCP 连接外部数据与工具（浏览器、数据库、第三方服务）、权限与安全边界。',
        task: '接一个 MCP（浏览器或数据库），让 Agent 读取外部数据、完成一件纯本地做不到的事。',
      },
    ],
  },
  {
    layer: '第三层 · 项目层：用 Agent 造出作品',
    en: 'Building · Ship with Agents',
    summary: '带着做出真东西，从自动化到完整应用。',
    lessons: [
      {
        code: '09',
        title: '用 Agent 构建自动化任务',
        desc: '把抓取、整理、定时批处理交给 Agent；用自定义 /command 把高频流程一键化、用 hooks 在关键节点自动触发、用 skill 固化整套流程。',
        task: '搭一个「一键抓取 → 整理 → 归档」的自动化流程：写一个自定义 /command，配一个 hook 自动触发，用 skill 固化下来。',
      },
      {
        code: '10',
        title: '用 Agent 构建 Web 应用',
        desc: '从需求到部署走通一个 React + Vite 前端应用（对照学生项目），学会让 Agent 分步实现并自查。',
        task: '从需求到部署做出一个 React + Vite 小应用，让 Agent 分步实现、每步自查（对照学生项目）。',
      },
      {
        code: '11',
        title: '用 Agent 做内容 / 数据管线',
        desc: '抓取 → 清洗 → 生成的流水线（如视频转指南、文章转站点），多 Agent 分工协作。',
        task: '搭一条「抓取 → 清洗 → 生成」的多 Agent 流水线（如视频转指南），让子代理分工跑通。',
      },
      {
        code: '12',
        title: '综合项目与上线复盘',
        desc: '从 0 到上线做一个完整作品，回看学生项目里的真实坑与解法。',
        task: '从 0 到上线做一个属于你自己的完整作品，并复盘过程中的真实坑与解法。',
      },
    ],
  },
]
