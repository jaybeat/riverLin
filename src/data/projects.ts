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

/** 效果展示图（如抖音封面 / app 截图），用于首页重点块与详情页展示项目效果 */
export interface ShowcaseImage {
  src: string
  alt?: string
  /** 'portrait' 竖版限宽居中；缺省 'landscape' 整宽 */
  orientation?: 'portrait' | 'landscape'
  /** 图片下方小字说明 */
  caption?: string
}

/** 多 Agent 编排中的一个角色 */
export interface AgentRole {
  name: string
  role: string
}

/** 某个环节的典型工程问题及其解法 */
export interface Challenge {
  problem: string
  solution: string
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
  showcaseImage?: ShowcaseImage
  /** 多张效果展示图（优先于 showcaseImage） */
  showcaseImages?: ShowcaseImage[]
  /** 「多 Agent 编排」section 标题，缺省为「多 Agent 编排」 */
  agentsTitle?: string
  /** 「多 Agent 编排」section 说明文案 */
  agentsCaption?: string
  agents?: AgentRole[]
  challenges?: Challenge[]
  /** 「解决的典型问题」section 说明文案，缺省为视频制作版文案 */
  challengesCaption?: string
  /** 深入板块：某支柱的角色引擎 + 典型问题（如解构里的「写作·创作 五角色引擎」） */
  writingPillar?: {
    title: string
    caption?: string
    roles: AgentRole[]
    challenges?: Challenge[]
  }
  pipelineSteps?: PipelineStep[]
  example?: Example
  githubUrl?: string
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
  /** 标记为首页大图「重点项目」，渲染为 spotlight（而非卡片墙） */
  spotlight?: boolean
  /** 标记为学生作品（课程实践产出），渲染「学生项目」徽章 */
  student?: boolean
  /** 卡片封面图；缺省时回退到首张 screenshot，再缺省用渐变占位封面 */
  cover?: string
  detail?: ProjectDetailData
}

export const projectCategories: { key: ProjectCategory; label: string }[] = [
  { key: 'deconstruction', label: '应该学什么？· 信息解构' },
  { key: 'pedagogy', label: '怎么教和学？· 教与学方法' },
  { key: 'practice', label: 'AI 课程实践' },
]

export const projects: Project[] = [
  {
    id: 'exam-grader',
    title: '试卷批改 Agent',
    description:
      '把整班手写试卷拍照后批量自动批改的 Claude Code 技能：视觉识别每份作答、对照参考答案判分、错题旁用红笔写出正确答案，生成每人一份带 ✓/✗ 与得分表的 Word，并合并为全班 Excel 成绩表。规划中：按知识板块输出每个学生的掌握与薄弱点分析。',
    tags: ['Claude Code', 'Subagents', 'Vision OCR', 'python-docx', 'openpyxl'],
    href: '/project/exam-grader',
    category: 'pedagogy',
    featured: true,
    detail: {
      detailDescription:
        '试卷批改 Agent 是一个项目内置的 Claude Code 技能（exam-grader），把一整班的手写试卷照片（一张照片 = 一名学生，可正背面分文件夹、可跨页两页）连同一份参考答案，批量批改成每人一份的 Word。它先把参考答案读成一份结构化的判分准绳 ref_rubric.md（答案 key / 每题分值 / 等价规则 / 主观题细则）作为唯一标准；再由主编排 Agent 为每名学生开一个 general-purpose 子代理、每批约 5 个并行推进：子代理用视觉 Read 看图识别学号姓名与逐题作答（潦草处先 crop_zoom 裁剪放大再读），填入 DATA 跑 grade_docx.py，自动判客观题、按细则给主观题分，在错题旁用红字写出正确答案，并生成分板块得分与总分表。全部批完后 build_gradebook.py 从各份 docx 里回读分数，合并成含平均 / 最高 / 最低的 Excel 成绩表。学科与语言无关（数学、物理、数据结构、语文皆可，输出语言跟随试卷）。此为教师本人批改自己班级试卷的合法工作流。',
      highlights: [
        '一图一人批量批改：客观题按归一化比较自动判分，主观题按细则给分（支持半分）',
        '红笔纠错成卷：错题旁用红字写出正确答案，生成每人一份带 ✓/✗ 与分板块得分表的 Word',
        '攻克手写与身份难题：模糊笔迹裁剪放大重读，背面无学号按拍摄顺序与正面位置配对',
        '带图号防重名：文件名一律 IMG<图号>_<学号>，并行批改互不覆盖，也便于按拍摄顺序登分',
        '一键成绩表：从批改 docx 回读分数，合并为含平均 / 最高 / 最低的全班 Excel 成绩表',
        '学科与语言无关：数学 / 物理 / 数据结构等皆可，输出语言跟随试卷',
        '（规划中）知识板块分析：按板块输出每个学生的掌握点与薄弱点诊断',
      ],
      agentsTitle: '多 Agent 编排：分批并行批改',
      agentsCaption:
        '主编排 Agent 只做协调——建判分准绳、准备共享模板、算好每张的学号 + 图号 + file_suffix、分批派发、收集回传、最后汇总核对；真正的批改由每名学生一个子代理并行完成，每批约 5 个、按图号升序推进。',
      agents: [
        {
          name: '主编排 Agent',
          role: '读参考答案建 ref_rubric.md，复制 grade_docx.py 为共享模板，清点照片、定身份、算好每张的图号 + 学号 + file_suffix，分批派发子代理并汇总核对',
        },
        {
          name: '批改子代理（每生一个）',
          role: '读 rubric + 模板，用视觉 Read 看图识别作答（潦草处 crop_zoom 放大），填 DATA 跑脚本生成带红笔纠错与得分表的 Word，自检 SAVED / 红字数 / 总分，回传一行成绩',
        },
        {
          name: '成绩汇总',
          role: 'build_gradebook.py 扫描全部批改 docx、回读各部分与总分，合并为含平均 / 最高 / 最低、缺分高亮的 Excel 成绩表',
        },
      ],
      challengesCaption: '整班批改里最难啃的几个工程问题，逐一给出解法。',
      challenges: [
        {
          problem: '手写潦草难辨认',
          solution:
            'crop_zoom.py 裁剪并放大模糊区域后再用视觉 Read 重读，读准学号、姓名与作答',
        },
        {
          problem: '背面/续页没有学号',
          solution:
            'pair_papers.py 按拍摄顺序与正面做位置配对，把学号带过来；正背面数量不等直接报错、拒绝盲配',
        },
        {
          problem: '并行批改文件互相覆盖',
          solution:
            '文件名一律带唯一图号 IMG<图号>_<学号>，天然防撞，也便于老师按拍摄顺序逐张登分',
        },
        {
          problem: '大班批改慢、进度难控',
          solution:
            '每名学生一个 general-purpose 子代理、每批约 5 个并行，一批回传后再发下一批，逐批可汇报',
        },
        {
          problem: '判分口径不一致',
          solution:
            '先把参考答案读成唯一的 ref_rubric.md 作为判分准绳，每份卷都照它判，保证同一标准',
        },
        {
          problem: '分数誊抄易出错',
          solution:
            '成绩表从生成的 docx 得分表里回读分数，绝不手工誊抄，避免转录错误',
        },
      ],
      pipelineSteps: [
        { name: '建判分准绳', type: 'both', desc: '读参考答案（docx/pdf/文本/图片）生成结构化 ref_rubric.md：答案 key、每题分值、等价规则、主观题细则，核对满分对得上' },
        { name: '清点照片·定身份', type: 'both', desc: '列目录理清一图一人 / 单页或跨页 / 正背面拆分；卷面读学号姓名，背面无号用 pair_papers.py 与正面位置配对' },
        { name: '分批派发子代理', type: 'llm', desc: '主 Agent 算好每张的图号 + 学号 + file_suffix，按图号升序每批约 5 个 general-purpose 子代理并行' },
        { name: '看图判分生成', type: 'both', desc: '子代理视觉识别作答（模糊处 crop_zoom 放大），填 DATA 跑 grade_docx.py，生成带红笔纠错与分板块得分表的 Word' },
        { name: '自检回传', type: 'script', desc: '脚本回读生成的 docx，校验 SAVED、红色 run 数 > 0、总分，子代理回传一行成绩摘要' },
        { name: '合并成绩表', type: 'script', desc: 'build_gradebook.py 扫描全部批改 docx、回读分数，合并为含平均 / 最高 / 最低、缺分高亮的 Excel 总表' },
        { name: '验收复核', type: 'both', desc: '核对份数 = 学生数、文件名无重名覆盖，列出低置信清单（学号难辨 / 判分临界 / 涂改）交老师复核' },
      ],
      singleColumnScreenshots: true,
      screenshots: [
        {
          src: '/images/exam-grader/grading-result.webp',
          caption:
            '批改结果（正面）：选择题逐题 ✓/✗、错题红字标注正确答案，填空题给出学生答案与订正，并按板块统计得分',
        },
        {
          src: '/images/exam-grader/2.webp',
          caption:
            '批量产出：每张试卷照片（IMG_43xx.JPG）批改成一份 Word，文件名带唯一图号 IMG<图号>_<学号> 防重名，便于按拍摄顺序逐张登分',
        },
      ],
    },
  },
  {
    id: 'video-to-guide',
    title: '视频变图文',
    description:
      '将长视频转换为章节化、可交互的配套指南网页，支持浮动视频播放器与时间戳跳转',
    tags: ['Python', 'LLM Pipeline', 'Claude Skill', 'HTML Generator'],
    href: 'https://github.com/jaybeat/video_to_guide',
    category: 'deconstruction',
    featured: true,
    cover: '/images/video-to-guide/guide-preview.webp',
    detail: {
      detailDescription:
        '这是一个 Claude Skill，能够将 YouTube 上的长视频（通常是 1-3 小时的技术讲座或教程）转换为结构化的配套指南网页。生成的页面读起来像书章一样流畅，同时完整保留代码和公式，每个章节都配有原视频的时间戳，点击即可跳转播放。',
      showcaseImage: {
        src: '/images/video-to-guide/guide-preview.webp',
        alt: '生成的 Build GPT 伴读指南：左侧章节目录 + 右侧图文正文',
        caption:
          '生成的配套指南网页：左侧章节导航，右侧书章式图文正文，保留代码、公式与关键帧',
      },
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
    id: 'concept-map-builder',
    title: '概念地图设计器',
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
    id: 'fragments',
    title: '大师金句',
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
          src: '/images/fragments/screenshot-1.webp',
          caption: '首页浏览不同人物的精选片段，按产品与打磨、组织与公司演化等领域分类展示',
        },
        {
          src: '/images/fragments/screenshot-2.webp',
          caption: '人物详情页按主题聚类，如巴菲特的"决策与判断"，一览核心思考时刻',
        },
        {
          src: '/images/fragments/screenshot-3.webp',
          caption: '沉浸式播放界面支持双语对照、时间戳跳转与章节导航，还原真人原声语境',
        },
        {
          src: '/images/fragments/screenshot-4.webp',
          caption: '新增收藏功能：粘贴 YouTube 链接，自动提取转录并切分高光片段',
        },
      ],
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
          src: '/images/evo/screenshot-1.webp',
          caption: '主题首页：每个主题沿"核心机制 → 演化变体"组织，如二叉搜索树从"快速查找"出发',
        },
        {
          src: '/images/evo/screenshot-2.webp',
          caption: '问题驱动的课时：先感受线性扫描逐个比对的笨拙，再一步步逼出更优解法',
        },
        {
          src: '/images/evo/screenshot-3.webp',
          caption: '演化出二分查找：数据排好序后，每次对半排除，效率实现飞跃',
        },
        {
          src: '/images/evo/screenshot-4.webp',
          caption: '沿演化路径推进：把有序数组从中间"拎起来"，自然演化出二叉搜索树',
        },
      ],
    },
  },
  {
    id: 'deconstruct',
    title: '解构 · AI 灵感库',
    description:
      '解构是一个本地化的个人 AI 灵感库，解决「好内容刷了就忘、学不到门道、创作又从零起步」的问题——把你收藏的优质内容自动拆解、沉淀，转成下一次创作可复用的养料。',
    tags: ['Claude Code', 'Express', 'React', 'Whisper', 'WHWM', '灵感库'],
    href: 'https://github.com/jaybeat/deconstruct',
    category: 'deconstruction',
    featured: true,
    spotlight: true,
    detail: {
      detailDescription:
        '人的学习与成长，源于读到优质信息——把它拆解、沉淀，再用进自己的创作。解构就是这样一个 AI 灵感库：帮你把刷到的好内容一键收藏，替你拆解其中的门道、沉淀成可复用的灵感，让每一次输入都成为下一次创作的养料。它是一个本地化的个人 AI 灵感库，口号「解构别人，写出自己」，跑通 拆解 → 沉淀 → 创作 的闭环。① 阅读·拆解：通过微信把视频号 / B站 / YouTube 的分享链接发来（或在内容库点「＋」），后端经 Cloudflare Worker 解析、yt-dlp 下载、Whisper 转写落库，再用 whwm-reading-analysis 按 WHWM 四模块（What / How / Why / Meaningful）把内容拆到骨架级——How 是重中之重、Why 按古典三艺列机制清单；还可按需做拉片、仿写、选题三种解构。② 组件库·沉淀：writing-components 把这些分析里「表达方式」的启发提炼成可按写作环节检索的组件卡，并生成作者签名配方，成为可复用的第二大脑。③ 写作·创作：whwm-writer 五角色引擎（选题→调研→结构→写稿→审稿）用组件库驱动，产出中心明确的新文章 / 书。整个灵感库以 Markdown 为唯一数据源，由本地 Express + React 应用索引、浏览、搜索并驱动各条流水线；分析质量由双层 evals（结构脚本 + LLM 裁判 rubric）回归把关。仓库当前为私有，如需访问请联系我。',
      highlights: [
        '一键采集：微信发来视频号 / B站 / YouTube 链接，自动下载并 Whisper 转写落库',
        '深度拆解：按 WHWM 四模块把内容拆到骨架级，How 拆手法、Why 列机制清单',
        '沉淀为组件：把表达启发做成可按写作环节检索的组件卡 + 作者签名配方',
        '组件驱动创作：whwm-writer 五角色引擎用组件库产出中心明确的新文章 / 书',
      ],
      showcaseImages: [
        {
          src: '/images/deconstruct/wechat.webp',
          alt: '微信发链接一键采集',
          orientation: 'portrait',
          caption: '微信发来视频号 / B站 / YouTube 链接，自动采集进阅读库',
        },
        {
          src: '/images/deconstruct/reading.webp',
          alt: '阅读·拆解界面',
          orientation: 'landscape',
          caption: '阅读·拆解：字幕逐句对照 + WH速览 / 仿写 / 选题分析',
        },
        {
          src: '/images/deconstruct/components.webp',
          alt: '组件库·沉淀界面',
          orientation: 'landscape',
          caption: '组件库·沉淀：把表达启发提炼成可按写作环节检索的组件卡 + 作者签名配方',
        },
        {
          src: '/images/deconstruct/writing.webp',
          alt: '写作·创作流水线',
          orientation: 'landscape',
          caption: '写作·创作：立项 → 立意 → 选材 → 布局 → 细化 → 成稿 六阶段',
        },
      ],
      agentsTitle: 'AI 引擎：拆解 · 沉淀 · 创作',
      agentsCaption:
        '围绕「阅读→组件库→写作」闭环的技能与子代理，各守一支柱；本地 Express + React 应用只做索引 / 浏览 / 触发，Markdown 为唯一数据源。',
      agents: [
        {
          name: '阅读·拆解 whwm-reading-analysis',
          role: '按 WHWM 四模块深度拆解，How 到骨架级、Why 按三艺（构思/布局/表达）列机制清单',
        },
        {
          name: '多视角解构 拉片 / 仿写 / 选题',
          role: 'article-lapian 逐镜拉片表、fangxie 仿写模板、xuanti 选题逻辑，换角度吃透「怎么写的」',
        },
        {
          name: '组件·沉淀 writing-components',
          role: '把启发提炼成按环节检索的组件卡 + 作者签名配方，并维护 taxonomy 词表',
        },
        {
          name: '写作·创作 whwm-writer',
          role: '选题→调研→结构→写稿→审稿 五角色引擎，用组件库驱动产出新作',
        },
        {
          name: '质量·回归 whwm-grader + evals',
          role: 'Layer A 结构脚本 + Layer B LLM 裁判 rubric（1–5 带证据）做回归',
        },
      ],
      challenges: [
        {
          problem: '收藏即吃灰、看了不消化',
          solution: '拆解 → 沉淀 → 创作闭环，把「消费」直接接到「产出」',
        },
        {
          problem: '素材散落多平台',
          solution:
            '微信发链接一键采集，视频号 / B站 / YouTube 自动下载 + Whisper 转写落库',
        },
        {
          problem: '只学到表面、学不到「怎么写的」',
          solution: 'WHWM 把 How 拆到骨架级，Why 按古典三艺列出机制清单',
        },
        {
          problem: '方法记不住、临用调不出',
          solution:
            'writing-components 把启发做成按写作环节检索的组件卡 + 作者签名配方',
        },
        {
          problem: '白屏创作、从零起步难',
          solution: '组件库驱动 + whwm-writer 五角色写作流水线产出中心明确新作',
        },
        {
          problem: 'AI 分析质量飘忽、爱写套话',
          solution:
            '双层 evals：结构脚本查「在不在」+ LLM 裁判按 rubric 查「深不深、忠不忠、是不是套话」',
        },
      ],
      pipelineSteps: [
        { name: '微信发链接', type: 'both', desc: '把视频号 / B站 / YouTube 分享链接发来，或在内容库点「＋」粘贴' },
        { name: '采集转写', type: 'script', desc: 'Cloudflare Worker 解析 → yt-dlp 下载 → Whisper 转写字幕，落题材目录、chokidar 自动重建索引' },
        { name: 'WHWM 拆解', type: 'llm', desc: 'whwm-reading-analysis 把字幕 / 文章拆成四模块报告（headless 自动、串行队列）' },
        { name: '多视角解构', type: 'llm', desc: '按需拉片 / 仿写模板 / 选题逻辑，多角度吃透写法' },
        { name: '组件沉淀', type: 'both', desc: 'writing-components 把报告提炼成可检索组件卡 + 作者画像（人在回路把关）' },
        { name: '质量回归', type: 'both', desc: 'evals 双层校验分析质量：结构脚本 + LLM 裁判 rubric' },
        { name: '组件驱动写作', type: 'llm', desc: 'whwm-writer 五角色流水线用组件库产出中心明确的新作' },
      ],
      writingPillar: {
        title: '写作·创作 · 五角色引擎',
        caption:
          'WHWM 写作法（What / How / Why / Meaningful）驱动：五个 subagent 依次接力，选题、大纲两个停靠点由人拍板；status.md 随时续写、每个停靠点一次 git 提交可回滚；审稿师作为 Why 过滤器按 S1–S9 结构清单 / D1–D8 成稿清单退回可执行诊断。',
        roles: [
          {
            name: '调研师 whwm-researcher',
            role: '领域扫描 + 定向深调研，材料每条附来源；经验型主题产出访谈提纲',
          },
          {
            name: '选题师 whwm-topic-scout',
            role: '把宽泛主题收敛成 5–8 个「中心具体、角度各异」的候选，各带 What/Why/Meaningful',
          },
          {
            name: '结构师 whwm-architect',
            role: '设计每章都能自证的大纲，维护贯穿线索表（分形协议）',
          },
          {
            name: '写稿师 whwm-drafter',
            role: '严格限定输入、前文只读摘要不读原文，逐章忠实成文',
          },
          {
            name: '审稿师 whwm-reviewer',
            role: 'Why 过滤器：结构审查 S1–S9 + 成稿检查 D1–D8，产出可执行诊断',
          },
        ],
        challenges: [
          {
            problem: '长文越写越「失忆」',
            solution:
              '写稿师禁读全文原文，前文只以 summaries/ 摘要形态进入上下文，保住上下文质量',
          },
          {
            problem: '中心漂移、各章散架',
            solution: '全书一句话中心 + 每章 What/Why 必须自证（S1/S2 Why 过滤）',
          },
          {
            problem: '伏笔埋了收不回',
            solution:
              '显式「贯穿线索表」+ 线索闭环检验 S5：只埋不收 / 只收不埋均不过',
          },
          {
            problem: '选题空泛、角度写滥',
            solution:
              '选题师从领域地图的空白点与争议里找角度、主动避开写滥；中心禁空话',
          },
          {
            problem: '材料凭记忆编造、无出处',
            solution: '调研每条事实必附来源，成稿 D8 事实溯源抽查',
          },
          {
            problem: '章节重复、职责重叠',
            solution: '互斥性检验 S3 + 查重 D4',
          },
          {
            problem: '大纲改崩无法回滚',
            solution: '每个停靠点一次 git 提交，前后 diff 一目了然',
          },
        ],
      },
      githubUrl: 'https://github.com/jaybeat/deconstruct',
      extraCta: {
        label: '查看 whwm-reading-analysis Skill',
        url: 'https://github.com/jaybeat/deconstruct/tree/main/.claude/skills/whwm-reading-analysis',
      },
    },
  },
  {
    id: 'ai-teach-video',
    title: '视频创作 Agent',
    description:
      '视频创作 Agent 是一套把中文技术文章自动做成讲解短视频的多 Agent 流水线，解决「一个人做讲解视频——分镜、配音、动画、音画同步——样样耗时」的问题。',
    tags: ['Manim', 'Python', 'TTS', 'FFmpeg', 'Claude Code', 'Agent Pipeline'],
    href: 'https://github.com/jaybeat/ai_teach_video',
    category: 'pedagogy',
    featured: true,
    spotlight: true,
    detail: {
      detailDescription:
        '视频创作 Agent 是一套把中文技术文章自动做成讲解短视频的多 Agent 流水线。三个 Claude Code subagent 各司其职——分镜设计师把文章改写成逐句旁白与动画 beat，内容评审师按留存清单预检每一段，动画设计师产出 Manim 动画；由 /new-episode 技能把三者编排成一条自动流水线，并用 eval 对内容评审的黄金用例做回归、发布后回填真实留存数据。架构上采用「共享引擎 + 每集零件」：引擎（dsvkit.py、TTS、build.sh）全系列复用，每集只改旁白与动画。它逐一啃下了视频制作各环节最难的工程问题（见下方「解决的典型问题」）。仓库当前为私有，如需访问请联系我。',
      highlights: [
        '三 Agent 流水线：分镜设计 → 留存评审 → Manim 动画，由 /new-episode 一键编排',
        '共享引擎 + 每集零件：引擎全系列复用，每集只换旁白与动画',
        '攻克工程难题：音画同步、系列风格一致、公式与多音字朗读、动画不遮挡',
        '一稿多用：/wechat-article 把已出片视频转成自包含 HTML 图文',
      ],
      agentsCaption:
        '三个 Claude Code subagent 各司其职，由 /new-episode 技能编排成一条自动流水线；eval 对内容评审的黄金用例做回归，发布后回填真实留存数据。',
      agents: [
        {
          name: '分镜设计师 storyboard-designer',
          role: '把文章改写成 storyboard.md 与逐句旁白 segments.py，一句旁白 = 一个动画 beat',
        },
        {
          name: '内容评审师 content-reviewer',
          role: '按 RETENTION_RUBRIC.md 逐段预测 R1–R7 留存风险产出 review.md，并作为 eval 黄金用例',
        },
        {
          name: '动画设计师 animation-designer',
          role: '产出 video.py，按 durations.json 撑时长渲染 Manim 动画',
        },
      ],
      challenges: [
        {
          problem: '音画不同步',
          solution:
            '两段式真实时间轴对齐：先按 TTS 时长渲染动画，再按动画真实时间轴 seg_times.json 重建对齐音轨后 mux',
        },
        {
          problem: '同系列风格不一致',
          solution:
            '共享引擎 + 每集零件：dsvkit.py/TTS/build.sh 全系列复用；片尾 CTA 配音只合成一次、全系列缓存复用',
        },
        {
          problem: '数学符号被读错',
          solution:
            '显示/朗读双形标记 [[显示//朗读]]：屏幕显示符号原样，TTS 走自然语言读法',
        },
        {
          problem: '多音字读错',
          solution: '同一双形标记为多音字指定正确读音，显示不变、朗读纠正',
        },
        {
          problem: '动画遮挡与出框',
          solution: '渲染期布局自检：检测元素出框与压字幕带并强制修复',
        },
        {
          problem: '开场劝退 / 留存低',
          solution:
            'content-reviewer 按 R1–R7 留存清单逐段预检；eval 跑黄金用例回归，发布后回填真实留存',
        },
        {
          problem: '渲染耗时、试错慢',
          solution: '画质档位 ql/qm/qh：480p15 快验证 → 720p30 → 1080p60 成片',
        },
      ],
      // 抖音「林小川说学习」视频作品效果截图。请把截图保存到下面这个路径：
      // public/images/ai-teach-video/douyin-showcase.webp
      showcaseImage: {
        src: '/images/ai-teach-video/douyin-showcase.webp',
        alt: '抖音「林小川说学习」视频作品效果展示',
      },
      pipelineSteps: [
        { name: '文章改写与分镜', type: 'llm', desc: 'storyboard-designer agent 把文章改写成 storyboard.md 与 segments.py，一句旁白 = 一个动画 beat' },
        { name: '留存预检', type: 'llm', desc: 'content-reviewer agent 按 RETENTION_RUBRIC.md 逐段预测 R1–R7 风险，产出 review.md' },
        { name: 'TTS 配音与量时长', type: 'script', desc: 'edge-tts / piper-tts 逐段合成中文配音，写入 durations.json' },
        { name: 'Manim 动画渲染', type: 'both', desc: 'animation-designer agent 产出 video.py；Manim 按 durations.json 撑时长并写出 seg_times.json' },
        { name: '真实时间轴对齐音轨', type: 'script', desc: 'rebuild_audio.py 按 seg_times.json 把每段配音精确铺到对应画面起始时刻' },
        { name: '合并出片', type: 'script', desc: 'ffmpeg 合并视频与对齐音轨为 output.mp4' },
        { name: '离线自检与抽帧', type: 'script', desc: '抽 beat 中帧拼联系表，目检同步与布局' },
        { name: '评测回填', type: 'both', desc: 'eval 跑 content-reviewer 黄金用例回归；发布后回填真实留存数据' },
      ],
      githubUrl: 'https://github.com/jaybeat/ai_teach_video',
      extraCta: {
        label: '查看 /new-episode Skill',
        url: 'https://github.com/jaybeat/ai_teach_video/tree/main/.claude/skills/new-episode',
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
    id: 'game-translation',
    title: '游戏汉化工具',
    description:
      '实时游戏汉化工具：PrintWindow 抓取游戏窗口画面 + OCR 识别文字，把外语游戏即时译成中文。支持直接汉化、框选翻译、固定框选自动翻译与替换词规则四种模式。',
    tags: ['C#', '.NET', 'OCR', '屏幕翻译', '游戏汉化'],
    href: 'https://github.com/sar-cat/Game-translation-software',
    category: 'practice',
    student: true,
    detail: {
      detailDescription:
        '游戏汉化工具是一个 C#/.NET 桌面应用，帮玩家把没有中文的外语游戏实时汉化。它通过 PrintWindow 抓取选定游戏窗口的画面，OCR 识别其中文字并翻译回中文，叠加显示译文。提供四种模式：直接汉化整窗抓取识别、框选翻译手动圈选任意区域、固定框选框定一块屏幕区域后在文字变化时自动翻译、以及替换词规则用于统一术语与专有名词译名。支持全局热键（Ctrl+Shift+D）快速呼出。',
      highlights: [
        '直接汉化：抓取整个游戏窗口画面并识别翻译',
        '框选翻译：手动圈选任意区域即时翻译',
        '固定框选：框定屏幕区域，文字变化时自动翻译',
        '替换词规则：自定义术语/专有名词替换，统一译名',
        'PrintWindow 抓图，指定目标游戏窗口',
        '全局热键 Ctrl+Shift+D 快速呼出',
      ],
      githubUrl: 'https://github.com/sar-cat/Game-translation-software',
      singleColumnScreenshots: true,
      screenshots: [
        {
          src: '/images/game-translation/overlay.webp',
          caption: '游戏内实时汉化：识别原文并在画面上叠加中英对照译文',
        },
        {
          src: '/images/game-translation/tool-ui.webp',
          caption: '工具界面：固定框选模式框定屏幕区域，选定游戏窗口后文字变化即自动翻译',
        },
      ],
    },
  },
  {
    id: 'japan-otaku-map',
    title: '日本动漫店铺地图',
    description:
      '为中国动漫爱好者打造的日本巡礼地图，收录 176 家动漫店铺、按 7 大连锁品牌分色，集成 DeepSeek AI 旅行助手与全文搜索、地区筛选。',
    tags: ['React', 'TypeScript', 'Vite', 'MapLibre GL', 'Zustand', 'DeepSeek'],
    href: 'https://github.com/9dk9jptv8h-hue/japan-otaku-map',
    category: 'practice',
    student: true,
    cover: '/images/japan-otaku-map/map-cover.webp',
    detail: {
      detailDescription:
        '日本动漫店铺地图（Japan Otaku Map）是一款面向中国动漫爱好者的日本巡礼地图。它用 MapLibre GL 渲染 OpenFreeMap 矢量瓦片，标注覆盖北海道到九州的 176 家动漫店铺，按 Animate、Melonbooks、Mandarake、Suruga-ya、GAMERS、Lashinbang、K-Books 七大连锁分色显示；支持按名称/描述/标签/地址全文搜索，按地区与品类筛选，并按评分、名称、更新时间、热度排序。内置一个由 DeepSeek 驱动、经 Cloudflare Worker 代理的 AI 旅行顾问，熟悉全部 176 家店铺，可给出巡礼路线建议。桌面端用侧栏、移动端用抽屉的响应式布局，并通过 GitHub Actions 自动构建可同步数据的 Android APK。',
      highlights: [
        'MapLibre GL 矢量瓦片地图（OpenFreeMap CDN）',
        '176 家动漫店铺，按 7 大连锁品牌分色',
        '全文搜索 + 地区/品类筛选 + 多维排序',
        'DeepSeek AI 旅行顾问（Cloudflare Worker 代理）',
        '桌面侧栏 / 移动抽屉响应式布局',
        'GitHub Actions 自动构建 Android APK',
      ],
      appUrl: 'https://9dk9jptv8h-hue.github.io/japan-otaku-map/',
      githubUrl: 'https://github.com/9dk9jptv8h-hue/japan-otaku-map',
      singleColumnScreenshots: true,
      screenshots: [
        {
          src: '/images/japan-otaku-map/welcome-screen.webp',
          caption: '欢迎页：介绍这张面向中国动漫爱好者的日本巡礼地图与玩法',
        },
        {
          src: '/images/japan-otaku-map/map-cover.webp',
          caption: '地图主界面：176 家店铺按连锁品牌分色标注，侧栏可搜索、筛选与排序',
        },
      ],
    },
  },
  {
    id: 'miku-desktop-pet',
    title: 'AI 桌面宠物',
    description:
      '常驻桌面右侧的悬浮窗助手，以多项目卡片实时展示进度、状态与子任务，支持系统托盘、里程碑提醒、多主题与开机自启。',
    tags: ['Python', 'Tkinter', 'CustomTkinter', 'pystray', 'PyInstaller'],
    href: 'https://github.com/tlyyxjz/miku-desktop-pet',
    category: 'practice',
    student: true,
    detail: {
      detailDescription:
        'AI 桌面宠物是一个常驻桌面右侧的悬浮窗仪表盘，用多张项目卡片实时展示各项目的进度条、状态与子任务清单。窗口置顶且半透明，不抢焦点、不遮挡 Alt+Tab；进度更新带缓动动画。它集成系统托盘（右键可显示/隐藏/刷新/设置/退出），提供图形化设置面板调节主题、透明度、字号与刷新间隔，内置 Catppuccin、Nord、Dracula、Gruvbox 等五套配色，并在进度跨越 25%/50%/75%/100% 或状态变更时弹出提醒。支持开机自启、窗口位置记忆，数据损坏时回退到缓存配置。',
      highlights: [
        '置顶半透明悬浮窗，不抢焦点、不挡 Alt+Tab',
        '多项目卡片：进度条 / 状态 / 子任务清单',
        '系统托盘菜单与图形化设置面板',
        '五套配色主题（Catppuccin / Nord / Dracula / Gruvbox）',
        '里程碑（25/50/75/100%）与状态变更提醒',
        '开机自启、窗口位置记忆、数据容错',
      ],
      githubUrl: 'https://github.com/tlyyxjz/miku-desktop-pet',
    },
  },
  {
    id: 'web-ai-notes',
    title: '网页 AI 笔记',
    description:
      '一个 Chrome MV3 侧边栏网页笔记插件（网页笔记助手）：一键提取网页正文、调用 LLM 生成 AI 摘要，按分类管理笔记并本地存储，支持 YouTube 字幕摘要与 Markdown/JSON/CSV 导出。',
    tags: ['Chrome MV3', 'Service Worker', 'JavaScript', 'LLM API', 'Side Panel'],
    href: 'https://github.com/okurazhl/-',
    category: 'practice',
    student: true,
    detail: {
      detailDescription:
        '网页 AI 笔记（应用内名「网页笔记助手」）是一个基于 Chrome Manifest V3 的侧边栏浏览器插件，用来提升网页阅读与知识沉淀的效率。它由 Side Panel UI、Service Worker 与 Content Script 三部分组成：Content Script 注入当前网页读取标题、正文、链接、选中文字乃至 YouTube 字幕；Service Worker 负责注入脚本、调用 LLM 接口并协调各模块；Side Panel 展示摘要、编辑笔记、管理分类与配置 AI 参数。摘要通过用户配置的 OpenAI 兼容接口生成，笔记用 chrome.storage.local 本地保存，可按分类与标签管理、搜索，并基于已存摘要做本日/本周/本月学习复盘，支持导出为 Markdown、JSON、CSV 或纯文本。针对不同网页结构，它先做页面类型识别（文章/搜索页/GitHub/ChatGPT/视频）再用多策略提取正文；并用心跳保活与超时控制缓解 MV3 Service Worker 在长时间调用 AI 时被终止的问题。',
      highlights: [
        '一键提取网页正文：标题 / 正文 / 链接 / 选中文字',
        'AI 摘要：调用用户配置的 OpenAI 兼容接口生成',
        '页面类型识别 + 多策略提取（文章 / 搜索页 / GitHub / 视频）',
        'YouTube 字幕摘要（可选本地 Python 字幕后端）',
        '笔记分类管理、搜索与本日/本周/本月复盘',
        '本地存储 chrome.storage.local，支持 Markdown/JSON/CSV 导出',
      ],
      githubUrl: 'https://github.com/okurazhl/-',
      singleColumnScreenshots: true,
      screenshots: [
        {
          src: '/images/web-ai-notes/side-panel.webp',
          caption: '侧边栏「网页笔记助手」：在 YouTube 视频旁提取字幕生成摘要，按分类保存笔记并可导出 Markdown',
        },
        {
          src: '/images/web-ai-notes/architecture.webp',
          caption: 'MV3 架构：Side Panel UI ↔ Service Worker，经 Content Script 读页面、调 LLM API、用 chrome.storage.local 存储',
        },
      ],
    },
  },
  {
    id: 'wordsnap',
    title: 'WordSnap 拍照学单词',
    description:
      '拍照即得英文单词的 Web 应用：MiniMax M3 视觉识别物体，四层级联查词给出音标/释义/例句并语音朗读，收藏本本地存储并可 Supabase 云端同步。',
    tags: ['React', 'Vite', 'Supabase', 'MiniMax M3', 'Tailwind', 'Zustand'],
    href: 'https://github.com/Elvire77/WordSnap',
    category: 'practice',
    student: true,
    cover: '/images/wordsnap/home.webp',
    detail: {
      detailDescription:
        'WordSnap（拍照学单词）是一款移动优先的英语学习 Web 应用，主打「看到即学习」：用户拍照或从相册选图，MiniMax M3 多模态视觉模型识别画面主体并返回英文名词，点击单词进入详情，系统按「本地离线词典 → MiniMax → Free Dictionary → 硬编码兜底」四层级联获取音标、中英释义与例句（例句经 MyMemory 翻译为中文），并用浏览器 SpeechSynthesis 朗读单词与例句。用户可建多个收藏本管理单词；数据采用「本地优先 + 云端增强」策略：默认存 localStorage 离线可用，邮箱登录后经 syncService 与 Supabase（Auth + PostgreSQL，RLS 行级隔离）双向合并同步，跨设备一致，并提供无需注册的游客模式。前端 React 18 + Vite 5 + Tailwind + Zustand，部署于 Vercel。',
      highlights: [
        '拍照/相册选图，MiniMax M3 视觉模型识别主体英文单词',
        '四层级联查词：本地词典 → MiniMax → Free Dictionary → 兜底',
        '单词详情：音标、中英释义、例句翻译与语音朗读',
        '收藏本管理：创建/删除、加入移出、自动去重',
        '本地优先 localStorage + 登录后 Supabase 双向同步',
        '邮箱注册/登录 + 游客模式，RLS 数据隔离，Vercel 部署',
      ],
      appUrl: 'https://word-snap-lovat.vercel.app/',
      githubUrl: 'https://github.com/Elvire77/WordSnap',
      singleColumnScreenshots: true,
      screenshots: [
        {
          src: '/images/wordsnap/recognition.webp',
          caption: '拍照取词：识别上传图片主体，返回英文单词卡片（Glass Mug），可一键收藏',
        },
        {
          src: '/images/wordsnap/word-detail.webp',
          caption: '单词详情：音标、中英释义、三条例句与中文翻译，支持单词/例句语音朗读',
        },
        {
          src: '/images/wordsnap/collections.webp',
          caption: '我的收藏：多个收藏本分组管理已学单词，支持新建与删除',
        },
      ],
    },
  },
  {
    id: 'tarot-daily',
    title: 'AI 占卜师',
    description:
      '网页版每日塔罗占卜应用，提供每日抽牌解读、塔罗百科、历史记录与 AI 解读，部署于 Netlify / Vercel。',
    tags: ['JavaScript', 'HTML', 'CSS', 'DeepSeek', 'Vercel'],
    href: 'https://github.com/Miaoqi777/tarot-daily',
    category: 'practice',
    student: true,
    detail: {
      detailDescription:
        'AI 占卜师是一款网页版每日塔罗占卜应用。用户每日抽牌后，由 DeepSeek（deepseek-chat）模型生成个性化的牌意解读；解读请求经 Serverless 函数（Vercel Edge Function）代理，密钥保存在服务端，并设有每日预算上限以防滥用，额度耗尽时返回提示。除每日抽牌外，还提供塔罗百科查询牌义、历史记录回看过往牌阵。纯前端实现，部署于 Netlify / Vercel。',
      highlights: [
        '每日抽牌 + DeepSeek 个性化牌意解读',
        'Serverless 代理隐藏密钥，并设每日预算上限',
        '塔罗百科：牌义查询',
        '历史记录：回看过往牌阵',
        '纯前端 + Netlify / Vercel 部署',
      ],
      githubUrl: 'https://github.com/Miaoqi777/tarot-daily',
      singleColumnScreenshots: true,
      screenshots: [
        {
          src: '/images/tarot-daily/spread.webp',
          caption: '事业运势·三张牌阵：选定领域与牌阵后抽牌，逐张给出当前状态、机遇与挑战的解读，可切换简洁/详细并开启 AI 智能深度解读',
        },
      ],
    },
  },
  {
    id: 'voicechat',
    title: '实时语音聊天室',
    description:
      '基于 LiveKit 的多人实时语音聊天室：输入昵称即可创建或加入 6 位房间码的房间，支持实时语音、文字聊天与屏幕共享，右侧成员列表实时显示在线状态。',
    tags: ['React', 'TypeScript', 'LiveKit', 'WebRTC', 'Vercel'],
    href: 'https://github.com/3441433811-hash/voicechat',
    category: 'practice',
    student: true,
    detail: {
      detailDescription:
        '实时语音聊天室（基于 LiveKit 的语音聊天室系统）是一个网页版多人语音协作工具。它主打「无需注册、即开即聊」：用户只输入一个昵称，就能创建房间或用 6 位房间码（字符集 A-Z2-9，去除易混字符）加入他人房间，没有账号也没有管理员角色，人人平等。进房后，语音通过 LiveKit SFU（基于 WebRTC）做多人实时传输；右侧成员面板实时展示所有在线成员与「说话中」状态，底部工具条可一键切换麦克风、扬声器与屏幕共享，或离开房间。除语音外还内置基于 LiveKit Data Channel 的实时文字聊天面板，并用 localStorage 记录最近加入的房间、用 BroadcastChannel 防止同一房间多标签页回声。前端为 React 19 + Vite + TypeScript，后端为 Fastify / Vercel Serverless Functions，房间与消息存于 Upstash Redis，整体部署在 Vercel。',
      highlights: [
        '无需注册：输入昵称即可创建或加入房间',
        '6 位房间码（A-Z2-9，去除易混字符）分享入房',
        'LiveKit SFU（WebRTC）多人实时语音',
        'Data Channel 实时文字聊天，右侧聊天面板',
        '屏幕共享 + 麦克风 / 扬声器一键切换',
        '成员列表实时在线状态，多标签页防回声',
      ],
      appUrl: 'https://voicechat-five.vercel.app',
      githubUrl: 'https://github.com/3441433811-hash/voicechat',
      singleColumnScreenshots: true,
      screenshots: [
        {
          src: '/images/voicechat/home.webp',
          caption: '首页：输入昵称即可创建或加入房间（6 位房间码），下方「最近加入的房间」快速回访，全程无需注册',
        },
        {
          src: '/images/voicechat/room.webp',
          caption: '房间内：右侧成员列表实时显示在线成员与「说话中」状态，支持屏幕共享，底部一键切换麦克风、扬声器与屏幕共享',
        },
      ],
    },
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
