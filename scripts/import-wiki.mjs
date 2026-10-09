#!/usr/bin/env node
// 把 ~/llm-wiki（OKF 格式）、课程课件和站内作品转换成 src/data/site-data.js，供神经网络主页使用。
// 只用 Node 自带模块，不联网，不修改笔记。
//
// 分类（两个维度）：
//   水母（做什么）：作品与开源 / 概念网络 / 学习与研究 / 研究课题 / 论文写作
//   星团（哪个领域）：学习课程 + A 空间感知与SLAM / B 协同感知与多智能体 / C 具身智能与世界模型 / D Agent工程 / E 知识管理
// 公开范围：physical-ai 的 concepts / entities（排除人物与机构）/ queries / overview；Personal-Growth 只取 concepts。
//
// 用法：node scripts/import-wiki.mjs [--wiki ~/llm-wiki]
import {readFileSync, writeFileSync, readdirSync, existsSync} from 'node:fs';
import {join, resolve, dirname, basename} from 'node:path';
import {fileURLToPath} from 'node:url';
import {homedir} from 'node:os';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const WIKI = resolve(arg('--wiki', join(homedir(), 'llm-wiki')).replace(/^~/, homedir()));

// —— 领域词典：folder 用作星团目录名（数字前缀会在图谱里去掉），quota 为节点名额 ——
const DOMAINS = [
  {id: 'A', folder: '02-空间感知与SLAM', quota: 20, terms: ['slam', 'loop-closure', 'visual-localization', 'visual-relocalization', '3d-vision', 'nerf', '3dgs', 'feature-matching', 'visual-odometry', 'pose-estimation', 'imu', 'lidar', 'optimization', 'graph-optimization', 'stereo', 'depth', 'reconstruction', 'odometry', 'place-recognition', 'vlad', 'computer-vision']},
  {id: 'B', folder: '03-协同感知与多智能体', quota: 18, terms: ['cooperative-perception', 'collaborative-slam', 'v2x', 'autonomous-driving', 'sensor-fusion', 'multimodal-fusion', 'bev', 'multi-agent', 'group-intelligence', 'federated', 'carla', '协同感知', '群智']},
  {id: 'C', folder: '04-具身智能与世界模型', quota: 15, terms: ['embodied-ai', 'embodied', 'sim-to-real', 'simulation', 'simulator', 'robotics', 'world-model', 'foundation-model', 'physical-ai', 'spatial-ai', 'scene-understanding', 'robot', 'zero-shot', 'vla', '具身', '世界模型']},
  {id: 'D', folder: '05-Agent工程', quota: 18, terms: ['agent', 'multi-agent', '循环工程', 'harness', '自我修复', 'hitl', '安全', '代码审查', '代理', 'llm', '系统提示', '并发', 'deerflow', '自动化', 'tdd']},
  {id: 'E', folder: '06-知识管理与学习方法', quota: 12, terms: ['llm-wiki', 'okf', '知识管理', 'education', 'exercise-design', 'curriculum', 'learning-path', 'knowledge', '学习', 'wiki', 'pedagogy']}
];
const LEARN = '01-学习课程';
// 不上图：人物、机构、平台类实体
const PRIVATE = /^(researcher|person|people|人物|organization|university|research-lab|lab|company|conference|community|nvidia|meta|mit|stanford|peking-university|bigai|feishu|飞书)$/i;
// 概念写法统一
const ALIAS = {'physical-ai': 'Physical AI', slam: 'SLAM', 'llm-wiki': 'LLM Wiki', 'self-repair': '自我修复', agent: 'Agent', 'ai代理': 'Agent', '代理': 'Agent', 'agent-harness': 'Harness工程', harness工程: 'Harness工程', 'multi-agent': '多智能体', 'cooperative-perception': '协同感知', '协同感知': '协同感知', 'embodied-ai': '具身智能', 'sim-to-real': 'Sim-to-Real', 'deep-learning': '深度学习', 'collaborative-slam': '协同SLAM', 'sensor-fusion': '传感器融合', 'multimodal-fusion': '传感器融合', 'autonomous-driving': '自动驾驶', 'computer-vision': '计算机视觉', hitl: 'HITL', 'loop-closure': '回环检测', 'feature-matching': '特征匹配', 'visual-odometry': '视觉里程计', education: '教学设计', 'exercise-design': '教学设计', 'world-model': '世界模型', '循环工程': '循环工程', '知识管理': '知识管理', okf: 'OKF', robotics: '机器人', simulation: '仿真', 'v2x': 'V2X', 'nerf': 'NeRF/3DGS', '3dgs': 'NeRF/3DGS', 'nerf-slam': 'NeRF/3DGS', '3dgs-slam': 'NeRF/3DGS'};
const canon = t => ALIAS[t.toLowerCase()] || null;

// —— 课程：静态课件在 public/<slug>/ ——
const COURSES = [
  {slug: 'machine-perception', title: '机器感知', tags: ['slam', 'computer-vision', 'education'], pages: [['课件', 'courseware.html'], ['合订本', 'handbook.html'], ['研究报告', 'research.html']], desc: 'SLAM 体系课件：相机模型、对极几何、视觉里程计、后端优化与回环检测，附练习。'},
  {slug: 'discrete-math', title: '离散数学', tags: ['education'], pages: [['课件', 'courseware.html'], ['练习', 'exercises.html'], ['合订本', 'handbook.html'], ['研究报告', 'research.html']], desc: '9 讲 21 页课件：逻辑、集合、关系、图论与代数结构，配 10 页练习。'},
  {slug: 'combinatorics', title: '组合数学', tags: ['education'], pages: [['课件', 'courseware.html'], ['练习', 'exercises.html'], ['合订本', 'handbook.html'], ['研究报告', 'research.html']], desc: '20 页课件：计数原理、容斥、生成函数、递推关系，70 道练习题。'},
  {slug: 'parallel-computing', title: '高级并行计算', tags: ['education'], pages: [['合订本', 'handbook.html'], ['研究报告', 'research.html']], desc: '并行体系结构、并行算法设计、MPI / OpenMP / CUDA 编程。'},
  {slug: null, title: '数据科学硕士课程（占位）', tags: ['education', 'deep-learning'], pages: [], desc: '数据科学硕士在读课程：统计学习、机器学习系统、深度学习等。课程笔记整理后补充到 scripts/import-wiki.mjs 的 COURSES。'}
];

// —— 作品与开源 ——
const WORKS = [
  {title: 'woothos 企业级 Agent 框架', date: '2026-09-20 12:00', tags: ['agent', 'multi-agent', 'open-source'], url: 'https://github.com/wukong-ai-code', body: 'uv workspace 下的企业级 Agent 框架：react / graph / deep / mas / buddy / lead 六种范式 + 13 个 woothos.* SDK 包，用 `woothos serve <paradigm>` 统一启动。'},
  {title: 'OpenClaw Personal Agent', date: '2026-06-19 12:00', tags: ['agent', 'open-source'], url: 'openclaw.html', file: 'openclaw.html'},
  {title: '住在微信里的工程团队', date: '2026-05-27 12:00', tags: ['agent', 'multi-agent'], url: 'story.html', file: 'story.html'},
  {title: 'AI 编码工具选型评估', date: '2026-05-28 12:00', tags: ['llm', 'agent'], url: 'report.html', file: 'report.html'},
  {title: 'OpenRouter 最佳模型组合', date: '2026-06-15 12:00', tags: ['llm', 'agent'], url: 'combo.html', file: 'combo.html'},
  {title: '具身智能 Hackathon 原型', date: '2026-08-30 12:00', tags: ['embodied-ai', 'robotics'], body: '黑客松作品位：LLM Agent + 低成本机械臂 / 仿真环境完成桌面任务。把真实作品的链接和截图补到 scripts/import-wiki.mjs 的 WORKS 里。'}
];

// —— 读取 ——
const ls = d => existsSync(d) ? readdirSync(d).filter(f => f.endsWith('.md')).map(f => join(d, f)) : [];
const unquote = s => String(s).trim().replace(/^['"]|['"]$/g, '');
function parse(file) {
  const text = readFileSync(file, 'utf8');
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const fm = {};
  if (m) for (const raw of m[1].split(/\r?\n/)) {
    const kv = raw.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!kv) continue;
    const v = kv[2].trim();
    fm[kv[1]] = v.startsWith('[') && v.endsWith(']') ? v.slice(1, -1).split(',').map(unquote).filter(Boolean) : unquote(v);
  }
  const tags = (Array.isArray(fm.tags) ? fm.tags : []).map(t => t.toLowerCase().trim()).filter(Boolean);
  return {file, slug: basename(file, '.md'), fm, tags, title: String(fm.title || basename(file, '.md')).replace(/^Research:\s*/i, '').trim(), body: m ? text.slice(m[0].length) : text};
}
const dateOf = fm => /^\d{4}-\d{2}-\d{2}/.test(fm.updated || fm.created || '') ? String(fm.updated || fm.created).slice(0, 10) + ' 12:00' : '2026-06-01 12:00';
const PA = join(WIKI, 'physical-ai/wiki'), PG = join(WIKI, 'Personal-Growth/wiki');
const isNoise = p => /飞书|feishu|权限/i.test(p.title + p.slug);

const candidates = [
  ...ls(join(PA, 'concepts')).map(f => ({...parse(f), vault: 'PA'})),
  ...ls(join(PA, 'entities')).map(f => ({...parse(f), vault: 'PA'})).filter(p => !p.tags.some(t => PRIVATE.test(t))),
  ...ls(join(PG, 'concepts')).map(f => ({...parse(f), vault: 'PG'}))
].filter(p => !isNoise(p));
const queries = ls(join(PA, 'queries')).map(f => ({...parse(f), vault: 'PA'})).filter(p => !isNoise(p));
const overview = existsSync(join(PA, 'overview.md')) ? parse(join(PA, 'overview.md')) : null;

// 人名脱敏：人物实体除公众人物外，正文里的名字也替换掉（导师与课题组信息不公开）
const PUBLIC_PEOPLE = new Set(['andrej-karpathy', 'fei-fei-li', 'richard-szeliski', 'gao-xiang']);
const people = ls(join(PA, 'entities')).map(parse).filter(p => p.tags.some(t => /^(researcher|person|people|人物)$/.test(t)) && !PUBLIC_PEOPLE.has(p.slug));
const names = [...new Set(people.flatMap(p => [p.slug, ...p.title.split(/[()（）]/).map(s => s.trim())]).filter(s => s.length >= 2))].sort((a, b) => b.length - a.length);
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const NAME = names.length ? new RegExp(`(${names.map(esc).join('|')})`, 'g') : null;
const redact = body => !NAME ? body : body.split('\n')
  .filter(line => !/飞书|feishu/i.test(line) && !(/^\s*[-*]\s/.test(line) && people.some(p => line.includes(p.slug))))
  .join('\n')
  .replace(new RegExp(`${NAME.source}\\s*(教授)?\\s*(团队|课题组|组)`, 'g'), '课题组')
  .replace(new RegExp(`${NAME.source}\\s*教授`, 'g'), '授课教师')
  .replace(NAME, '研究者')
  .replace(/^\s*[-*]\s*研究者([、，, ]+研究者)*\s*[—-].*\n?/gm, '');

// 被引用次数（正文双链 + related）
const inbound = new Map();
for (const p of [...candidates, ...queries]) {
  const targets = [...p.body.matchAll(/\[\[([^\]|#]+)/g)].map(m => m[1]).concat(Array.isArray(p.fm.related) ? p.fm.related : []);
  for (const t of targets) { const k = t.trim().toLowerCase(); inbound.set(k, (inbound.get(k) || 0) + 1); }
}
const score = p => (inbound.get(p.slug.toLowerCase()) || 0) + (inbound.get(p.title.toLowerCase()) || 0);

// —— 领域归属 ——
function classify(p) {
  if (p.fm.domain) { const d = DOMAINS.find(x => x.id === String(p.fm.domain).toUpperCase() || x.folder.includes(p.fm.domain)); if (d) return [d]; }
  const hay = [...p.tags, p.slug.toLowerCase()];
  const ranked = DOMAINS.map(d => ({d, s: d.terms.reduce((s, t) => s + hay.filter(h => h.includes(t)).length, 0)})).filter(x => x.s > 0).sort((a, b) => b.s - a.s);
  if (!ranked.length) return [DOMAINS.find(d => d.id === (p.vault === 'PA' ? 'C' : 'E'))];
  return ranked.slice(0, 2).filter((x, i) => i === 0 || x.s >= ranked[0].s * .6).map(x => x.d);
}
// 课程类页面不进研究领域（由课程节点代表）
const isCourse = p => /^(lecture-|course-|exercises|practice-kit|supplementary)/.test(p.slug) || p.tags.includes('course');
const picked = [];
for (const d of DOMAINS) {
  const pool = candidates.filter(p => !isCourse(p) && !picked.includes(p) && classify(p)[0] === d).sort((a, b) => score(b) - score(a));
  picked.push(...pool.slice(0, d.quota));
}
const bridges = picked.filter(p => classify(p).length > 1).length;

// —— 文本处理 ——
const known = new Set([...picked, ...(overview ? [overview] : [])].flatMap(p => [p.slug.toLowerCase(), p.title.toLowerCase()]));
const relink = body => body.replace(/\[\[([^\]]+)\]\]/g, (all, inner) => {
  const [target, alias] = inner.split('|');
  return known.has(target.split('#')[0].trim().toLowerCase()) ? all : (alias || target).trim();
});
const clean = (body, n = 4000) => redact(relink(body.replace(/\r/g, ''))).replace(/\n{3,}/g, '\n\n').trim().slice(0, n);
const relatedLine = p => {
  const rel = (Array.isArray(p.fm.related) ? p.fm.related : []).filter(r => known.has(r.toLowerCase()) && r.toLowerCase() !== p.slug.toLowerCase());
  return rel.length ? `\n\n相关：${rel.map(r => `[[${r}]]`).join(' ')}` : '';
};
const brief = p => redact(String(p.fm.description || clean(p.body, 400).replace(/^#.*\n/gm, '').replace(/\s+/g, ' '))).slice(0, 140);
const topicTags = tags => [...new Set(tags.map(canon).filter(Boolean))].slice(0, 8);

// —— 作品 ——
const html = f => existsSync(join(ROOT, f)) ? readFileSync(join(ROOT, f), 'utf8').replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim() : '';
const works = WORKS.map(w => ({...w, body: (w.body || html(w.file).slice(0, 2500)) + (w.url ? `\n\n链接：${w.url}` : '')})).sort((a, b) => b.date.localeCompare(a.date));
const refs = s => (s.match(/\[\[|https?:\/\//g) || []).length;
const posts = works.map((w, i) => ({id: 'w' + (i + 1), title: w.title, date: w.date, views: w.body.length, likes: 0, comments: 0, saves: refs(w.body) + w.tags.length, follows: null, shares: 0, impressions: null, ctr: null, duration: null, url: w.url || null}));
const postContent = works.map(w => ({title: w.title, body: w.body, tags: topicTags(w.tags), media: 'images'}));

// —— 学习与研究 ——
const courseNotes = COURSES.map(c => ({
  title: c.title, path: `05-方法库 methods/${LEARN}/${c.slug || 'data-science'}.md`, url: c.slug && c.pages[0] ? `${c.slug}/${c.pages[0][1]}` : null,
  body: `# ${c.title}\n\n${c.desc}\n\n${c.pages.map(([n, f]) => `- ${n}：${c.slug}/${f}`).join('\n')}${c.slug === 'machine-perception' ? '\n\n延伸：[[slam]] [[cooperative-perception]]' : ''}`,
  tags: topicTags(c.tags)
}));
const domainNotes = picked.map(p => {
  const ds = classify(p);
  return {title: redact(p.title), path: `05-方法库 methods/${ds[0].folder}/${p.slug}.md`, body: clean(p.body) + relatedLine(p), tags: topicTags([...p.tags, ...ds.flatMap(d => d.id === 'D' ? ['agent'] : [])]), bridge: ds.length > 1 ? ds.map(d => d.id).join('×') : null};
});
const notes = [...courseNotes, ...domainNotes].map((n, i) => ({id: 'n' + (i + 1), ...n}));

// —— 研究课题（只取 physical-ai 开放问题）与论文写作 ——
const ideaPages = queries.sort((a, b) => score(b) - score(a) || dateOf(b.fm).localeCompare(dateOf(a.fm))).slice(0, 20);
const seedIdeas = ideaPages.map((p, i) => ({id: i + 1, title: redact(p.title), platform: classify(p)[0].folder.replace(/^\d+-/, ''), priority: i < 7 ? '高' : i < 14 ? '中' : '低', status: p.fm.status === 'answered' ? '待扩展' : '待写', note: brief(p)}));
const seedDrafts = overview ? [{id: 'draft-1', title: 'Physical AI 研究综述', source: null, body: clean(overview.body, 6000)}] : [];

// —— 概念网络：统一写法后出现 ≥2 次的话题 ——
const count = new Map();
for (const t of [...postContent.flatMap(w => w.tags), ...notes.flatMap(n => n.tags)]) count.set(t, (count.get(t) || 0) + 1);
const concepts = [...count].filter(([, c]) => c >= 2).sort((a, b) => b[1] - a[1]).slice(0, 24)
  .map(([t]) => [t, [t.toLowerCase(), ...Object.entries(ALIAS).filter(([, v]) => v === t).map(([k]) => k)]]);

const today = new Date().toISOString().slice(0, 10), dates = posts.map(p => p.date.slice(0, 10)).sort();
const snapshot = {account: '悟空 · Wukong', followers: candidates.length + queries.length, capturedAt: today, publishedFrom: dates[0], publishedTo: dates.at(-1), source: 'llm-wiki（Physical AI / 个人成长概念页）、课程课件与站内作品'};

const J = v => JSON.stringify(v, null, 1);
writeFileSync(join(ROOT, 'src/data/site-data.js'), `// 由 scripts/import-wiki.mjs 生成（${today}）。这份数据会公开部署。重新生成：npm run import:wiki

export const snapshot = ${J(snapshot)};

export const posts = ${J(posts)};

export const postContent = ${J(postContent)};

export const notes = ${J(notes.map(({tags, ...n}) => n))};

export const seedIdeas = ${J(seedIdeas)};

export const seedDrafts = ${J(seedDrafts)};

export const concepts = ${J(concepts)};
`);
writeFileSync(join(ROOT, 'src/data/index.js'), `// 主页数据入口：由 scripts/import-wiki.mjs 生成的 site-data.js。切回示例：export * from './sample.js';\nexport * from './site-data.js';\n`);
const per = Object.fromEntries([LEARN, ...DOMAINS.map(d => d.folder)].map(f => [f.replace(/^\d+-/, ''), notes.filter(n => n.path.includes('/' + f + '/')).length]));
console.log(`导入完成：作品 ${posts.length}、学习与研究 ${notes.length}（跨领域桥 ${bridges}）、课题 ${seedIdeas.length}、论文 ${seedDrafts.length}、概念 ${concepts.length}`);
console.log('各星团：' + Object.entries(per).map(([k, v]) => `${k} ${v}`).join(' · '));
console.log('概念：' + concepts.map(c => c[0]).join(' '));
