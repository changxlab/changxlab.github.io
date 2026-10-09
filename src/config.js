// 个性化配置：换成你自己的品牌名、账号和头像，其余代码不用改。
// Personal settings: swap in your own brand, account and avatar; nothing else needs to change.
export const CONFIG = {
  brand: {name: 'CHANG', sub: 'NEURAL LAB', tagline: 'AI native · 数据科学 · 具身智能', taglineEn: 'AI native · Data science · Embodied AI'},
  // 图谱中心节点的名字
  workspace: '悟瑟斯 · Chang',
  // 头像放在 public/ 下，填相对路径
  avatar: 'wukong.webp',
  footer: {zh: '每一次学习、实验与提交，都是网络里的一个节点。', en: 'Every lesson, experiment and commit is a node.'},
  // 选题、草稿、目标保存在浏览器 localStorage 里的键名前缀
  storagePrefix: 'wukong-lab'
};

// public/ 下的素材路径（兼容部署在子路径，如 GitHub Pages）
export const asset = path => import.meta.env.BASE_URL + path;
