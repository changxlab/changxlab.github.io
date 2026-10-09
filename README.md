# 悟空 · Neural Lab

个人主页：学习 · 研究 · 论文 · 创意 · 探索 · 开源。交互与动效基于 [neural-creator-dashboard](https://github.com/luoluo-121/neural-creator-dashboard)（光球 + 五只水母模块 + 双向链接神经图谱 + 节点分析面板），内容改为个人研究站。

| 模块 | 内容来源 |
|---|---|
| 作品与开源 | 站内页面（OpenClaw / 报告 / 模型组合 / 故事）、woothos、黑客松、带站点链接的 wiki source |
| 知识库 | `~/llm-wiki` 的 concepts / entities（按被引用次数取前 60） |
| 研究课题 | wiki queries（最新 18 条开放问题） |
| 论文写作 | wiki overview / synthesis |
| 概念网络 | 至少出现在两条内容里的 tags |

## 常用命令

```bash
npm install
npm run import:wiki   # 从 ~/llm-wiki 重新生成 src/data/site-data.js（会公开部署，注意隐私）
npm run dev           # 本地预览
npm run build         # 输出 dist/，push 到 main 后由 GitHub Actions 自动部署
```

- 增删作品：编辑 `scripts/import-wiki.mjs` 里的 `WORKS`，再重新导入
- 旧的静态页面放在 `public/`，构建时原样复制（`/openclaw.html`、`/report.html` 等链接不变）

## 授权

基于 neural-creator-dashboard，按 PolyForm Noncommercial 1.0.0 使用（仅限非商业用途），见 `LICENSE` 与 `NOTICE.md`。光球与水母视频素材来自原项目。
