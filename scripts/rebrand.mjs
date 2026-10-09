// 一次性把参考看板的「自媒体」文案改成个人研究站的文案。可重复运行（已替换的会提示 MISS）。
import {readFileSync, writeFileSync} from 'node:fs';
const R = (f, pairs) => {
  let s = readFileSync(f, 'utf8');
  for (const [a, b] of pairs) { if (!s.includes(a)) console.log('MISS', f, a.slice(0, 50)); s = s.split(a).join(b); }
  writeFileSync(f, s);
};
const metric = [["'观看', 'Views'", "'字数', 'Chars'"], ["'收藏', 'Saves'", "'引用', 'Refs'"], ["'涨粉', 'Follows'", "'双链', 'Links'"]];
const kpi = "['作品', 'Works', posts.length], ['知识页', 'Wiki pages', snapshot.followers], ['总字数', 'Total chars', total], ['引用', 'Refs', posts.reduce((s, p) => s + p.saves, 0)]";

R('src/neural/graph.js', [
  ["title: '作品库', en: 'Works'", "title: '作品与开源', en: 'Works & OSS'"],
  ["title: '方法库', en: 'Methods'", "title: '知识库', en: 'Knowledge'"],
  ["title: '选题池', en: 'Ideas'", "title: '研究课题', en: 'Research'"],
  ["title: '创作台', en: 'Drafts'", "title: '论文写作', en: 'Writing'"],
  ["label: '方法笔记', en: 'Method note'", "label: '知识笔记', en: 'Knowledge'"],
  ["label: '选题', en: 'Idea'", "label: '研究课题', en: 'Question'"],
  ["label: '创作空间'", "label: '悟空'"],
  ['观看最高', '篇幅最长'], [' 观看 · ', ' 字 · ']
]);
R('src/neural/Home.jsx', [
  ["'观看', 'views'", "'字', 'chars'"], ["'待写', 'to write'", "'待研究', 'open'"], ...metric.slice(0, 2),
  ['让每一条链接，<br/>双向生长。', '学习 · 研究 · 论文<br/>创意 · 探索 · 开源'],
  ['Every link grows both ways.', "An AI architect's neural lab — data science, embodied AI, open source."],
  ['创作空间 <em>Core</em>', '悟空 <em>Core</em>'],
  ['选择一篇笔记查看全部分析', '选择一个节点查看连接与分析']
]);
R('src/neural/pages.jsx', [
  ...metric,
  ["['已发布', 'Published', posts.length], ['账号粉丝', 'Followers', snapshot.followers], ['累计观看', 'Total views', total], ['已知涨粉', 'Known follows', posts.reduce((s, p) => s + (p.follows ?? 0), 0)]", kpi],
  ["['views', '字数', 'Chars'], ['rate', '收藏率', 'Save rate'], ['follows', '双链', 'Links']", "['views', '篇幅', 'Length'], ['saves', '引用', 'Refs']"],
  ['zh="作品库" en="Works" sub="每一篇，都留下回响。" subEn="Every piece leaves an echo — metrics and links side by side."', 'zh="作品与开源" en="Works & OSS" sub="做出来，才算学会。" subEn="Projects, reports and hackathon builds — linked to the knowledge behind them."'],
  ["'视频 · Video' : '图文 · Post'", "'视频 · Video' : '项目 · Project'"]
]);
R('src/neural/main.jsx', [
  ["['home', '工作台', 'Workspace'], ['library', '作品库', 'Works'], ['drafts', '创作台', 'Drafts'], ['ideas', '选题池', 'Ideas']", "['home', '神经网络', 'Network'], ['library', '作品与开源', 'Works'], ['drafts', '论文写作', 'Writing'], ['ideas', '研究课题', 'Research']"],
  ["['已发布笔记', 'Published', posts.length], ['账号粉丝', 'Followers', snapshot.followers], ['累计观看', 'Total views', total], ['已知笔记涨粉', 'Known follows', posts.reduce((s, p) => s + (p.follows ?? 0), 0)]", kpi],
  ['作品表现 <em>Performance</em>', '近期作品 <em>Recent</em>'],
  ['<th>观看 <em>Views</em></th><th>收藏 <em>Saves</em></th><th>涨粉 <em>Follows</em></th>', '<th>字数 <em>Chars</em></th><th>引用 <em>Refs</em></th><th>日期 <em>Date</em></th>'],
  ["<td>{p.follows ?? '—'}</td>", '<td>{p.date.slice(5, 10)}</td>'],
  ['创作计划 <em>Plan</em>', '研究计划 <em>Plan</em>'], ['下一篇写什么 <em>Up next</em>', '下一个课题 <em>Up next</em>'],
  ['继续创作 <em>Continue</em>', '继续写作 <em>Continue</em>'], ['账号快照', '研究快照'],
  ["platform: '小红书'", "platform: 'Physical AI'"],
  ["if (a.type === 'read')", "if (a.type === 'url') window.open(a.url, /^https?:/.test(a.url) ? '_blank' : '_self');\n    if (a.type === 'read')"]
]);
R('src/neural/Analysis.jsx', [
  ["metric: {label: '收藏率', en: 'Save rate'", "metric: {label: '引用密度', en: 'Ref density'"],
  ["['eye', p.views, '观看', 'Views'], ['save', p.saves, '收藏', 'Saves'], ['user', p.follows ?? '—', '涨粉', 'Follows']", "['eye', p.views, '字数', 'Chars'], ['save', p.saves, '引用', 'Refs'], ['user', node.tags.length, '话题', 'Topics']"],
  ['观看第 ${rank}/${P.length} 名；收藏率', '篇幅第 ${rank}/${P.length} 名；引用密度'],
  ["badge: ['已发布', 'Published']", "badge: ['作品', 'Work']"],
  ["action: ['查看作品', 'Open in Works', {type: 'page', page: 'library', id: p.id}]", "action: p.url ? ['打开项目', 'Open', {type: 'url', url: p.url}] : ['查看作品', 'Open in Works', {type: 'page', page: 'library', id: p.id}]"],
  ["badge: ['方法笔记', 'Method note']", "badge: ['知识笔记', 'Knowledge']"]
]);
R('src/config.js', [
  ["brand: {name: 'NEURAL', sub: 'STUDIO', tagline: '创作神经网络', taglineEn: 'Creative neural studio'}", "brand: {name: 'WUKONG', sub: 'NEURAL LAB', tagline: 'AI 架构师 · 数据科学硕士 · 具身智能', taglineEn: 'AI architect · Data science · Embodied AI'}"],
  ["workspace: '我的创作空间'", "workspace: '悟空 · Wukong'"],
  ["avatar: 'avatar.svg'", "avatar: 'wukong.webp'"],
  ["footer: {zh: '每一篇笔记，都是网络里的一个节点。', en: 'Every note is a node in the network.'}", "footer: {zh: '每一次学习、实验与提交，都是网络里的一个节点。', en: 'Every lesson, experiment and commit is a node.'}"],
  ["storagePrefix: 'neural-dashboard'", "storagePrefix: 'wukong-lab'"]
]);
