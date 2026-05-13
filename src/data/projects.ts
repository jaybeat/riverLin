export interface PipelineStep {
  name: string
  type: 'script' | 'llm' | 'both'
  desc: string
}

export interface Example {
  title: string
  desc: string
  src: string
  githubSrc: string
}

export interface ProjectDetailData {
  detailDescription: string
  highlights: string[]
  pipelineSteps?: PipelineStep[]
  example?: Example
  githubUrl: string
  extraCta?: {
    label: string
    url: string
  }
}

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  href: string
  featured?: boolean
  detail?: ProjectDetailData
}

export const projects: Project[] = [
  {
    id: 'fragments',
    title: 'Fragments',
    description:
      '从演讲和访谈中提取大师们的核心思考时刻，聚焦产品、商业、组织与个人成长话题的沉浸式音频产品。支持真人原声、领域分段、源视频溯源与暗色/暖色双主题。',
    tags: ['React', 'TypeScript', 'Python', 'Gemini', 'Audio'],
    href: 'https://github.com/jaybeat/Fragments',
    featured: true,
    detail: {
      detailDescription:
        'Fragments 是一个音频产品，专注于从乔布斯、芒格、马斯克、巴菲特等 notable figures 的演讲和访谈中，提取关于产品、商业、组织和个人成长的核心思考时刻。每一段都是真人原话，不经过 AI 生成或模仿，可追溯至原始视频与具体时间点。',
      highlights: [
        '真人原声片段',
        '领域自动分段',
        '源视频溯源',
        '暗色/暖色双主题',
        '沉浸式播放体验',
      ],
      pipelineSteps: [
        { name: 'YouTube 下载与语音识别', type: 'script', desc: '提取音频、生成原始字幕与时间轴' },
        { name: '语义分割', type: 'llm', desc: 'Gemini 识别核心思考时刻与关键片段边界' },
        { name: '主题聚类', type: 'both', desc: 'sentence-transformers 按产品、商业、组织等维度聚类组织片段' },
        { name: '人工校验与精修', type: 'llm', desc: '校准时间戳、优化分段边界、确保上下文完整' },
        { name: 'React 前端渲染', type: 'script', desc: '构建沉浸式音频播放界面，支持双主题切换' },
      ],
      githubUrl: 'https://github.com/jaybeat/Fragments',
    },
  },
  {
    id: 'video-to-guide',
    title: 'Video to Guide',
    description:
      '将长视频转换为章节化、可交互的配套指南网页，支持浮动视频播放器与时间戳跳转',
    tags: ['Python', 'LLM Pipeline', 'Claude Skill', 'HTML Generator'],
    href: 'https://github.com/jaybeat/video_to_guide',
    featured: true,
    detail: {
      detailDescription:
        '这是一个 Claude Skill，能够将 YouTube 上的长视频（通常是 1-3 小时的技术讲座或教程）转换为结构化的配套指南网页。生成的页面读起来像书章一样流畅，同时完整保留代码和公式，每个章节都配有原视频的时间戳，点击即可跳转播放。',
      highlights: [
        '7 阶段自动化流水线',
        '两遍结构识别',
        '断点续传',
        '中英双语输出',
        '代码与公式完整保留',
      ],
      pipelineSteps: [
        { name: '下载预处理', type: 'script', desc: '提取字幕、分块、生成初始数据' },
        { name: '两遍结构识别', type: 'llm', desc: '粗粒度主题 → 细粒度章节划分' },
        { name: '章节重写', type: 'llm', desc: '并行子代理将口语转为书面表达' },
        { name: '帧提取插入', type: 'both', desc: '自动提取并插入教学关键帧' },
        { name: '诊断打磨', type: 'both', desc: '脚本诊断 + 定向 LLM 修复' },
        { name: '翻译输出', type: 'llm', desc: '中文翻译（源中文则跳过）' },
        { name: '导出 HTML', type: 'script', desc: '生成带浮动播放器的指南页' },
      ],
      example: {
        title: 'Build GPT 配套指南',
        desc: '基于 Andrej Karpathy "Let\'s build GPT" 视频生成的中文配套指南，完整覆盖了从零构建 GPT 模型的全过程。',
        src: '/workspace/build_gpt/guide.zh.html',
        githubSrc:
          'https://github.com/jaybeat/video_to_guide/blob/main/workspace/build_gpt/guide.zh.html',
      },
      githubUrl: 'https://github.com/jaybeat/video_to_guide',
      extraCta: {
        label: '查看 SKILL.md',
        url: 'https://github.com/jaybeat/video_to_guide/tree/main/.claude/skills/video-to-companion-guide',
      },
    },
  },
  {
    id: 'rain-typer',
    title: '雨滴打字机',
    description:
      '一个沉浸式的打字体验工具，模拟雨声背景下的专注写作环境。支持多种雨声场景与打字音效组合。',
    tags: ['React', 'Web Audio', 'Animation'],
    href: '#',
  },
  {
    id: 'clawd',
    title: 'Clawd 动画引擎',
    description:
      '轻量级的 CSS 动画编排库，通过声明式 API 让复杂的交互动画变得简单直观。',
    tags: ['TypeScript', 'Animation', 'Library'],
    href: '#',
  },
  {
    id: 'meta-prompt',
    title: 'Meta Prompt 工坊',
    description:
      '一套用于优化和评估 AI 提示词的工具集合，帮助开发者快速迭代高质量的 prompt 设计。',
    tags: ['AI', 'Next.js', 'OpenAI'],
    href: '#',
  },
  {
    id: 'minimal-todo',
    title: '极简待办',
    description:
      '回归本质的任务管理应用，没有冗余功能，只有清晰的待办事项与优雅的交互体验。',
    tags: ['React', 'PWA', 'LocalStorage'],
    href: '#',
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
