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

export interface Screenshot {
  src: string
  caption: string
}

export interface DemoVideo {
  src: string
  poster?: string
  /** 'portrait' constrains width for vertical (e.g. 1080×1920) videos */
  orientation?: 'portrait' | 'landscape'
}

export interface SpiralRound {
  /** 轮次标签，如 "第 0 轮"、"引言"、"汇总" */
  phase: string
  /** 该段时间区间，如 "00:41–01:18" */
  time: string
  /** 左·问题例子（痛点）；引言/收束等无痛点的段落留空 */
  problem: string
  /** 右·进化结果（为化解痛点而长出的新能力） */
  evolution: string
}

export interface SpiralScriptExample {
  /** 示例脚本表的标题 */
  title: string
  /** 对该示例的一句话说明 */
  caption: string
  /** 痛点层级上升轨迹的一句话总结 */
  trajectory: string
  /** 指向原始脚本表 Markdown 的链接 */
  sourceUrl: string
  rounds: SpiralRound[]
}

export interface ProjectDetailData {
  detailDescription: string
  highlights: string[]
  spiralScript?: SpiralScriptExample
  demoVideo?: DemoVideo
  pipelineSteps?: PipelineStep[]
  example?: Example
  githubUrl: string
  appUrl?: string
  screenshots?: Screenshot[]
  /** Render screenshots one-per-row instead of the default multi-column grid */
  singleColumnScreenshots?: boolean
  extraCta?: {
    label: string
    url: string
  }
}

export type ProjectCategory = 'deconstruction' | 'pedagogy' | 'practice'

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  href: string
  category: ProjectCategory
  featured?: boolean
  detail?: ProjectDetailData
}

export const projectCategories: { key: ProjectCategory; label: string }[] = [
  { key: 'deconstruction', label: '应该学什么？· 信息解构' },
  { key: 'pedagogy', label: '怎么教和学？· 教与学方法' },
  { key: 'practice', label: 'AI 课程实践' },
]

export const projects: Project[] = [
  {
    id: 'lecture-deconstructor',
    title: 'Lecture Deconstructor',
    description:
      '把教学内容双线解构、并反向生成递进螺旋式教学分镜脚本的两个 Claude Skill。一条线抽出"概念命题线"骨架，另一条线沿"问题驱动螺旋"还原概念如何被一步步逼出来；反向技能则由概念线倒推痛点，产出可配音的螺旋脚本表。',
    tags: ['Claude Skill', 'Python', 'SRT', 'Markdown', '问题驱动螺旋'],
    href: 'https://github.com/jaybeat/teach_content_desconstruct',
    category: 'deconstruction',
    featured: true,
    detail: {
      detailDescription:
        'Lecture Deconstructor 是一对互为正反的 Claude Skill，围绕"问题驱动螺旋"重新组织教学内容。lecture-dual-line-analysis 先用 clean_transcript.py 把讲座字幕（.srt/.vtt/文本）清洗为带时间戳的逐行数据，再做"双线解构"：一条是"概念命题线"，按讲解顺序抽出核心概念，形成回答"讲了什么"的静态骨架；另一条是"问题驱动螺旋"，把"具体痛点 → 概念作解药"的动态教学机制还原出来，并为每一段补齐逐句带时间戳的完整旁白（拼接即等于全文）。concept-to-spiral-script 则反向而行：拿一条"概念命题线"，倒推出单调递进的痛点，产出可直接配音的"螺旋脚本表"。它正是 Spiral Explainer Video 的上游——解构出的螺旋脚本，下游就能渲染成竖屏讲解视频。',
      highlights: [
        '双线解构：概念命题线（静态骨架）+ 问题驱动螺旋（动态机制）',
        '问题在左、概念作解药在右，逐句带时间戳的完整旁白',
        'concept-to-spiral-script 反向由概念线倒推痛点生成螺旋脚本表',
        '痛点单调递进：能力缺失 → 状态/记忆 → 持久化 → 真实交互 → 效率 → 规模',
        '同一主角贯穿、统一隐喻，且忠于原内容不臆造新知识',
        '示例：《用达尔文进化论的方式讲解 Agent》《数字系统的演化》',
      ],
      spiralScript: {
        title: '《用达尔文进化论的方式讲解 Agent》— 问题驱动螺旋',
        caption:
          '下面是用 lecture-dual-line-analysis 解构这条讲座得到的「问题驱动螺旋」脚本表节选：左列是讲者每一步抛出的真实痛点，右列是为化解痛点而进化出的新能力，逐轮螺旋上升。',
        trajectory:
          '输不了第二句 → 忘了同会话上文 → 跨天遗忘 → 不知实时信息 → 嫌重复操作烦 → 信息过载出幻觉——痛点一轮比一轮高，概念随之螺旋上升，最终收束为一个完整的 Agent 心智模型。',
        sourceUrl:
          'https://github.com/jaybeat/teach_content_desconstruct/blob/master/2026-06-01_22.09.50_%E8%BE%BE%E5%B0%94%E6%96%87%E8%BF%9B%E5%8C%96%E8%AE%BA%E7%9A%84%E6%96%B9%E5%BC%8F%E8%AE%B2%E8%A7%A3Agent_%E9%97%AE%E9%A2%98%E9%A9%B1%E5%8A%A8%E8%9E%BA%E6%97%8B.md',
        rounds: [
          { phase: '引言', time: '00:00–00:41', problem: '', evolution: '抛出主题：Agent 到底是什么？预告用「达尔文进化论」的方式，从一个小 demo 一步步进化成 Agent。' },
          { phase: '第 0 轮', time: '00:41–01:18', problem: '', evolution: '调用大模型 API 写出「小 demo」：输入一句、得到一句回复。' },
          { phase: '第 1 轮', time: '01:18–01:39', problem: '想接着输入第二句话，小 demo 却「死」了——只支持一轮对话。', evolution: '加入循环，不断收发消息 → 支持多轮对话。' },
          { phase: '第 2 轮', time: '01:39–02:47', problem: '问「咱们第一句聊了啥」，大模型答不上来——它本身无记忆。', evolution: '每次通信都带上历史消息 → 短期记忆，作品升级改名「聊天机器人」。' },
          { phase: '第 3 轮', time: '02:47–03:42', problem: '隔天再问「昨天聊了啥」又忘了——短期记忆随进程消亡。', evolution: '把历史消息存入本地文件 → 长期记忆。' },
          { phase: '第 4 轮', time: '03:42–05:01', problem: '问「北京明天天气」，大模型不知道任何实时信息。', evolution: '引入工具 Tool 让它对外界采取行动 →（质变）正式升级为 Agent。' },
          { phase: '第 5 轮', time: '05:01–05:47', problem: '每周写周报都要敲一大段格式化提示词，太烦。', evolution: '把重复工作流封装成 skill，每次随工具/历史消息一并告知大模型。' },
          { phase: '第 6 轮', time: '05:47–07:09', problem: '让它读整本书做总结，结果开始胡说八道、越来越慢——上下文溢出导致幻觉。', evolution: '拆出多个 subagent → 上下文隔离、各读一部分，既抗幻觉又并行提速。' },
          { phase: '汇总', time: '07:09–09:28', problem: '', evolution: '能力全集（循环+短期/长期记忆+工具+skill+subagent）收束为「Agent 是只有手脚、大脑在大模型的人」心智模型，并用查天气闭环走完一遍。' },
        ],
      },
      pipelineSteps: [
        { name: '字幕清洗', type: 'script', desc: 'clean_transcript.py 把 .srt/.vtt/文本清洗为带时间戳的逐行结构化数据' },
        { name: '概念命题线', type: 'llm', desc: '按讲解顺序抽出核心概念，形成分层的静态骨架' },
        { name: '问题驱动螺旋', type: 'llm', desc: '左侧具体痛点 → 右侧概念解药，补齐逐句带时间戳的完整旁白' },
        { name: '反向脚本生成', type: 'llm', desc: 'concept-to-spiral-script 由概念线倒推递进痛点，写出口语化旁白' },
        { name: '输出脚本表', type: 'script', desc: '生成 <name>_螺旋脚本表.md，报告分镜数与预估时长' },
      ],
      githubUrl: 'https://github.com/jaybeat/teach_content_desconstruct',
      extraCta: {
        label: '查看两个 Skill',
        url: 'https://github.com/jaybeat/teach_content_desconstruct/tree/master/.claude/skills',
      },
    },
  },
  {
    id: 'concept-map-builder',
    title: 'Concept Map Builder',
    description:
      '从一个焦点问题出发，用 Novak 六步法逐步构建概念图的 Claude Skill。写成 Graphviz DOT 源、用 dot 渲染并注入柔光，输出一张自包含的暗色发光 .svg，再由 evaluator 子代理按八项标准评估并迭代修订。',
    tags: ['Claude Skill', 'Graphviz', 'DOT', 'SVG', 'Subagent'],
    href: 'https://github.com/jaybeat/concept-map-builder',
    category: 'deconstruction',
    featured: true,
    detail: {
      detailDescription:
        'Concept Map Builder 是一个 Claude Skill，把一块知识系统地图形化为概念图。它遵循认知科学家 Novak 的六步法：先在顶部确立一个强调"关系"而非"定义"的焦点问题，再自由头脑风暴概念、从抽象到具体做层级排序、搭建无标签骨架、为每条连线补上方向性的命题标签，最后加入跨分支交叉链接与具体实例。整张图写成 Graphviz DOT 源、用 dot 渲染并注入柔光，成为一张无需外部 CSS 或运行时、打开即可浏览的自包含暗色发光 SVG。完成后由一个独立的 evaluator 子代理按八项标准评估其主观质量，并据此按优先级迭代修订（2–3 轮收敛）。',
      highlights: [
        'Novak 六步法构建概念图',
        '焦点问题驱动，拒绝知识点堆砌',
        'Graphviz DOT 渲染 + 柔光注入',
        '自包含暗色发光 SVG，打开即览',
        'evaluator 子代理按八项标准评估',
        '迭代收敛（最多 2–3 轮修订）',
      ],
      pipelineSteps: [
        { name: '确立焦点问题', type: 'both', desc: '把宽泛主题收窄为强调关系的焦点问题；模糊则给出 2–4 个候选供选择' },
        { name: '概念头脑风暴', type: 'llm', desc: '自由列出相关概念放入"停车场"，先不连线' },
        { name: '层级排序', type: 'llm', desc: '从抽象到具体排序，保留 15–25 个核心概念' },
        { name: '骨架搭建', type: 'both', desc: '写成 Graphviz DOT，dot 渲染为节点与无标签连线' },
        { name: '关系标注与交叉链接', type: 'llm', desc: '为每条连线补上方向性命题标签，加入跨分支交叉链接与实例' },
        { name: '柔光渲染', type: 'script', desc: '注入柔光，输出自包含的暗色发光 SVG' },
        { name: '评估与修订', type: 'both', desc: 'evaluator 子代理按八项标准评估，按优先级迭代修订' },
      ],
      githubUrl: 'https://github.com/jaybeat/concept-map-builder',
      singleColumnScreenshots: true,
      screenshots: [
        {
          src: '/images/concept-map-builder/concept-map-data-structures-competency.svg',
          caption: '焦点问题"数据结构培养学生具备什么？"——把核心目标外显为可锻炼的多项胜任力',
        },
        {
          src: '/images/concept-map-builder/concept-map-hashtable-amortized-o1-alt.svg',
          caption: '焦点问题"哈希表凭什么做到均摊 O(1)？"——把 O(1) 基底、哈希映射与摊还分析串成命题',
        },
      ],
      extraCta: {
        label: '查看 SKILL.md',
        url: 'https://github.com/jaybeat/concept-map-builder/tree/master/.claude/skills/concept-map-builder',
      },
    },
  },
  {
    id: 'spiral-explainer-video',
    title: 'Spiral Explainer Video',
    description:
      '把"问题驱动螺旋"脚本自动转成竖屏讲解视频的 Claude Skill。沿"现状 → 问题 → 推理 → 方案 → 进化能力"的螺旋逐轮展开，配中文配音与逐句同步，输出 1080×1920 移动端长卷动画。',
    tags: ['Claude Skill', 'Node.js', 'HyperFrames', 'FFmpeg', 'MiniMax TTS', 'Python'],
    href: 'https://github.com/jaybeat/spiral-explainer-video',
    category: 'pedagogy',
    featured: true,
    detail: {
      detailDescription:
        'Spiral Explainer Video 是一个 Claude Skill，把"问题驱动螺旋"（现状 → 具体问题 → 推理 → 方案 → 进化出的新能力）结构的脚本，自动转换为竖屏 1080×1920 的讲解视频。它用 MiniMax 生成中文配音，按句测量时长并与画面逐句对齐，再用 HyperFrames 把内容编排成一张可滚动的"长卷"，配合平移镜头逐轮展开，最终渲染成适合手机观看的讲解短片。',
      highlights: [
        '问题驱动螺旋叙事结构',
        '逐句音频与画面同步',
        '竖屏 1080×1920 移动端优先',
        '长卷构图 + 平移镜头',
        '逐轮渲染与质量校验',
        '示例作品《用达尔文进化论的方式讲解 Agent》',
      ],
      demoVideo: {
        src: '/videos/spiral-explainer-video/agent-evolution.mp4',
        orientation: 'portrait',
      },
      pipelineSteps: [
        { name: '脚本解析', type: 'script', desc: '将脚本拆解为"问题—方案"的螺旋轮次结构' },
        { name: '旁白分句', type: 'script', desc: '把每轮旁白切分为句级片段，作为对齐单元' },
        { name: 'TTS 语音合成', type: 'llm', desc: 'MiniMax 生成中文配音，逐句测量音频时长' },
        { name: '音频拼接', type: 'script', desc: '按顺序拼接句级音频，生成最终旁白文件' },
        { name: 'HyperFrames 构图', type: 'both', desc: '编排为可滚动长卷，配合平移镜头逐轮展开' },
        { name: '逐轮渲染校验', type: 'both', desc: '按轮次增量渲染并校验画面与配音同步' },
      ],
      githubUrl: 'https://github.com/jaybeat/spiral-explainer-video',
      extraCta: {
        label: '查看 SKILL.md',
        url: 'https://github.com/jaybeat/spiral-explainer-video/tree/main/.claude/skills/spiral-explainer-video',
      },
    },
  },
  {
    id: 'evo',
    title: 'EvoLearn',
    description:
      '对抗"知识点清单式学习"的进化式学习平台。每个主题都有一个核心机制，所有复杂知识都是它为了解决新问题而演化出的变体。沿知识的演化路径学习，而非面对扁平清单。',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Anthropic API', 'Zustand'],
    href: 'https://github.com/jaybeat/EvoLearn',
    category: 'pedagogy',
    featured: true,
    detail: {
      detailDescription:
        'EvoLearn（知识的进化）是一个基于认知科学设计的在线学习平台，核心理念是"每个主题都有一个核心机制，所有看似复杂的知识点都是这个核心机制为了解决新问题而演化出来的变体"。它让学习者沿知识的演化路径走一遍——先感受问题，再归纳概念，再看它如何进化出变体——而不是面对一份扁平的知识点清单。',
      highlights: [
        'AI 驱动的课程生成管线',
        '五层语义学习结构（Hook → Sensation → Insight → Verification → Transfer）',
        '认知科学课程拆分算法',
        '进度追踪与互动学习',
        '课程创建与章节管理',
      ],
      pipelineSteps: [
        { name: '课程蓝图生成', type: 'llm', desc: 'AI 分析原始材料，生成符合 EvoLearn 结构的课程蓝图（≤40 字标题 / 4 章节 / 4 成就）' },
        { name: '课时拆分分析', type: 'both', desc: '基于 HookingQuestion、Cognitive Leap、Achievement Mapping、Attention Window 四个测试拆分课时' },
        { name: '内容精修与填充', type: 'llm', desc: '为每个课时生成 Hook、Stepped Demo、Knowledge Card、Quiz、Reflection 五层内容' },
        { name: 'React 前端渲染', type: 'script', desc: '构建沉浸式学习界面，支持进度追踪与互动答题' },
      ],
      appUrl: 'https://evo.riverlin.me',
      githubUrl: 'https://github.com/jaybeat/EvoLearn',
      singleColumnScreenshots: true,
      screenshots: [
        {
          src: '/images/evo/screenshot-1.png',
          caption: '主题首页：每个主题沿"核心机制 → 演化变体"组织，如二叉搜索树从"快速查找"出发',
        },
        {
          src: '/images/evo/screenshot-2.png',
          caption: '问题驱动的课时：先感受线性扫描逐个比对的笨拙，再一步步逼出更优解法',
        },
        {
          src: '/images/evo/screenshot-3.png',
          caption: '演化出二分查找：数据排好序后，每次对半排除，效率实现飞跃',
        },
        {
          src: '/images/evo/screenshot-4.png',
          caption: '沿演化路径推进：把有序数组从中间"拎起来"，自然演化出二叉搜索树',
        },
      ],
    },
  },
  {
    id: 'fragments',
    title: 'Fragments',
    description:
      '从演讲和访谈中提取大师们的核心思考时刻，聚焦产品、商业、组织与个人成长话题的沉浸式音频产品。支持真人原声、领域分段、源视频溯源与暗色/暖色双主题。',
    tags: ['React', 'TypeScript', 'Python', 'Gemini', 'Audio'],
    href: 'https://github.com/jaybeat/Fragments',
    category: 'deconstruction',
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
      appUrl: '/fragments',
      githubUrl: 'https://github.com/jaybeat/Fragments',
      screenshots: [
        {
          src: '/images/fragments/screenshot-1.png',
          caption: '首页浏览不同人物的精选片段，按产品与打磨、组织与公司演化等领域分类展示',
        },
        {
          src: '/images/fragments/screenshot-2.png',
          caption: '人物详情页按主题聚类，如巴菲特的"决策与判断"，一览核心思考时刻',
        },
        {
          src: '/images/fragments/screenshot-3.png',
          caption: '沉浸式播放界面支持双语对照、时间戳跳转与章节导航，还原真人原声语境',
        },
        {
          src: '/images/fragments/screenshot-4.png',
          caption: '新增收藏功能：粘贴 YouTube 链接，自动提取转录并切分高光片段',
        },
      ],
    },
  },
  {
    id: 'video-to-guide',
    title: 'Video to Guide',
    description:
      '将长视频转换为章节化、可交互的配套指南网页，支持浮动视频播放器与时间戳跳转',
    tags: ['Python', 'LLM Pipeline', 'Claude Skill', 'HTML Generator'],
    href: 'https://github.com/jaybeat/video_to_guide',
    category: 'deconstruction',
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
    id: 'justspeak',
    title: 'justSpeak',
    description:
      '按住说话的实时语音翻译。说中文，松手出地道口语英文/日文并自动朗读。支持浏览器 PWA 和桌面命令行双端，底层是"全程流式+管线重叠"的低延迟语音管线。',
    tags: ['React', 'TypeScript', 'Vite', 'FastAPI', 'WebSocket', 'PWA', 'AudioWorklet'],
    href: 'https://github.com/jaybeat/justSpeak',
    category: 'practice',
    featured: true,
    detail: {
      detailDescription:
        'justSpeak 是一个低延迟实时语音翻译工具。核心理念是"按住说话，松手即得"——用户按住按钮说中文，系统通过流式 STT → LLM 翻译 → TTS 合成，在松手瞬间输出地道口语化的英文或日文，并自动朗读。支持浏览器 PWA 和桌面命令行两个版本，两端复用同一套语音处理管线。',
      highlights: [
        'PWA 浏览器/手机端：按住说话，松手出翻译并朗读',
        '桌面命令行版：回车录音/结束，支持中译英/中译日切换',
        '低延迟流式处理：STT、LLM、TTS 三者管线重叠执行',
        '可插拔 STT：云端阿里云 Paraformer 或本地 faster-whisper',
        '国内直连：MiniMax API，无需代理',
        'GaplessPlayer + AudioWorklet 实现无缝音频播放',
      ],
      pipelineSteps: [
        { name: '音频采集', type: 'script', desc: '浏览器 AudioWorklet / 桌面 PyAudio 实时采集音频流' },
        { name: '语音识别', type: 'both', desc: '云端 Paraformer 或本地 faster-whisper 流式转文字' },
        { name: 'LLM 翻译', type: 'llm', desc: 'MiniMax-Text-01 将中文翻译为地道口语英文/日文' },
        { name: 'TTS 合成', type: 'llm', desc: 'MiniMax speech-2.8-turbo 流式生成语音' },
        { name: '无缝播放', type: 'script', desc: 'GaplessPlayer / AudioWorklet 队列实现零间隙音频播放' },
      ],
      githubUrl: 'https://github.com/jaybeat/justSpeak',
    },
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
