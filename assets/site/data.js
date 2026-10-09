// 站点内容：只改这个文件即可增删节点。links 里的 id 会在图谱中连线。
window.SITE = {
  name: '悟空 · Wukong',
  role: 'AI 架构师 · 数据科学硕士在读 · 具身智能爱好者',
  roleEn: 'AI Architect · M.S. Data Science · Embodied AI tinkerer',
  github: 'https://github.com/wukong-ai-code',
  modules: [
    {id: 'learn',   zh: '学习', en: 'Learn',   hue: 190, angle: -90,  desc: '数据科学硕士课程笔记与学习路线'},
    {id: 'research',zh: '研究', en: 'Research',hue: 265, angle: -18,  desc: '具身智能、协同感知、空间智能'},
    {id: 'paper',   zh: '论文', en: 'Papers',  hue: 320, angle: 54,   desc: '论文阅读、写作与投稿进度'},
    {id: 'idea',    zh: '创意', en: 'Ideas',   hue: 40,  angle: 126,  desc: '黑客松点子与原型'},
    {id: 'oss',     zh: '开源', en: 'Open Source', hue: 140, angle: 198, desc: '开源项目与 Agent 工程'}
  ],
  items: [
    {id: 'stat', mod: 'learn', title: '统计学习与推断', tag: '课程', status: '进行中', desc: '回归、贝叶斯推断、模型选择的课程笔记。', links: ['ml-sys', 'paper-perception']},
    {id: 'ml-sys', mod: 'learn', title: '机器学习系统设计', tag: '课程', status: '进行中', desc: '从数据管道到模型服务的工程化实践。', links: ['woothos']},
    {id: 'dl', mod: 'learn', title: '深度学习与表示学习', tag: '自学', status: '持续', desc: 'Transformer、扩散模型、世界模型的阅读路线。', links: ['world-model']},
    {id: 'perception', mod: 'research', title: '协同感知', tag: 'Physical AI', status: '调研', desc: '多智能体 / 车路协同的感知融合。', links: ['paper-perception', 'spatial']},
    {id: 'spatial', mod: 'research', title: '空间智能', tag: 'Physical AI', status: '调研', desc: '3D 场景理解、空间推理与具身导航。', links: ['world-model', 'robot-hack']},
    {id: 'world-model', mod: 'research', title: '世界模型与 VLA', tag: 'Embodied', status: '追踪', desc: 'Vision-Language-Action 模型与仿真到真实。', links: ['paper-reading']},
    {id: 'paper-perception', mod: 'paper', title: '硕士论文：协同感知方向', tag: 'Thesis', status: '选题中', desc: '开题、文献综述、实验设计。', links: ['perception']},
    {id: 'paper-reading', mod: 'paper', title: '论文精读清单', tag: 'Reading', status: '持续', desc: '每周 1–2 篇，记录方法、数据与可复现性。', links: ['dl']},
    {id: 'model-eval', mod: 'paper', title: 'AI 编码工具选型评估', tag: '报告', status: '已完成', desc: '多模型编码能力对比与选型建议。', url: 'report.html', links: ['combo']},
    {id: 'robot-hack', mod: 'idea', title: '桌面机器人 Agent', tag: '黑客松', status: '原型', desc: '用 LLM Agent 驱动低成本机械臂完成桌面任务。', links: ['woothos', 'spatial']},
    {id: 'combo', mod: 'idea', title: 'OpenRouter 最佳模型组合', tag: '研究笔记', status: '已发布', desc: '按任务路由模型，平衡成本与能力。', url: 'combo.html', links: ['openclaw']},
    {id: 'story', mod: 'idea', title: '住在微信里的工程团队', tag: '故事', status: '已发布', desc: 'OpenClaw · Hermes · 波布 · 悟空的协作故事。', url: 'story.html', links: ['openclaw']},
    {id: 'woothos', mod: 'oss', title: 'woothos', tag: 'Agent 框架', status: '开发中', desc: '企业级 Agent 框架：react / graph / deep / mas / buddy / lead 六种范式。', links: ['openclaw']},
    {id: 'openclaw', mod: 'oss', title: 'OpenClaw Personal Agent', tag: 'Agent', status: '运行中', desc: '执行层 Agent 与聊天桥接。', url: 'openclaw.html', links: []},
    {id: 'gh', mod: 'oss', title: 'GitHub · wukong-ai-code', tag: 'Repo', status: '持续', desc: '所有开源代码与实验。', url: 'https://github.com/wukong-ai-code', links: []}
  ]
};
