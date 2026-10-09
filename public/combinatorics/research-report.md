# 组合数学（Combinatorics）学习资源研究报告

> 研究日期：2026-06-27  
> 研究范围：教材、公开课、习题集、博客、视频教程、学术资源、中文资源  
> 覆盖层次：入门 → 本科 → 研究生 → 研究前沿

---

## 目录

1. [概述与学习路线](#1-概述与学习路线)
2. [经典教材（按难度分级）](#2-经典教材按难度分级)
3. [公开课与视频资源](#3-公开课与视频资源)
4. [习题与竞赛资源](#4-习题与竞赛资源)
5. [博客与社区](#5-博客与社区)
6. [在线学习平台](#6-在线学习平台)
7. [交互工具与可视化](#7-交互工具与可视化)
8. [中文本土资源](#8-中文本土资源)
9. [研究前沿与学术资源](#9-研究前沿与学术资源)
10. [推荐学习路径](#10-推荐学习路径)

---

## 1. 概述与学习路线

### 什么是组合数学

组合数学（Combinatorics）是研究**离散结构**的数学分支，核心是计数（枚举）、存在性、构造和优化。主要子领域：

| 子领域 | 核心问题 | 典型工具 |
|--------|----------|----------|
| **枚举组合学** | "有多少种？" | 生成函数、递推关系、容斥原理 |
| **极值组合学** | "最大/最小是多少？" | Ramsey 理论、Turán 定理 |
| **代数组合学** | 用代数结构研究组合对象 | 群作用、表示论、交换代数 |
| **概率方法** | 用概率证明存在性 | 期望线性、Lovász Local Lemma |
| **加性组合学** | 整数集合的加法结构 | Fourier 分析、Szemerédi 定理 |
| **图论** | 图的结构与性质 | 匹配、着色、极值图论 |
| **解析组合学** | 用复分析做精确/渐近计数 | 奇点分析、鞍点法 |

### 推荐学习路径

```
入门阶段 (1-3 个月)
  ├── 排列组合基础 (Khan Academy / 高中数学复习)
  ├── 离散数学入门 (Oscar Levin: Discrete Mathematics: An Open Introduction)
  └── 推荐教材: A Walk Through Combinatorics (Bóna) 前 4 章

基础阶段 (3-6 个月)
  ├── 系统学习枚举组合学
  ├── 生成函数与递推关系
  ├── 推荐教材: Applied Combinatorics (Keller & Trotter) / 组合数学 (Brualdi)
  └── 习题: 102 Combinatorial Problems

进阶阶段 (6-12 个月)
  ├── 图论基础
  ├── 代数组合学入门
  ├── 推荐教材: A Course in Combinatorics (van Lint & Wilson)
  ├── 补充: generatingfunctionology (Wilf, 免费)
  └── 习题: AoPS Intermediate Counting & Probability

高级阶段 (研究生水平)
  ├── Enumerative Combinatorics (Stanley, Vol 1)
  ├── Analytic Combinatorics (Flajolet & Sedgewick)
  ├── 概率方法: The Probabilistic Method (Alon & Spencer)
  └── 专题课程: MIT OCW 系列
```

---

## 2. 经典教材（按难度分级）

### 2.1 🌱 入门级（高中生 / 大学低年级）

| 教材 | 作者 | 特点 | 获取 |
|------|------|------|------|
| **A Walk Through Combinatorics** | Miklós Bóna | ⭐ 最推荐的入门书。写作风格亲切，证明清晰，习题优秀。涵盖枚举、图论、组合设计。 | Amazon / 各大书店 |
| **Applied Combinatorics** | Keller & Trotter | 免费开源教材，Georgia Tech 使用。面向 CS 学生的应用导向。 | [Open Textbook Library](https://open.umn.edu/opentextbooks/textbooks/339) |
| **Discrete Mathematics: An Open Introduction** | Oscar Levin | 免费开源，适合离散数学入门，组合部分质量高。 | [官网](http://discrete.openmathbooks.org/) |
| **Combinatorics and Graph Theory** | Harris, Hirst, Mossinghoff | 本科标准教材，图论与组合并重。 | Springer |
| **Introductory Combinatorics** (组合数学 原书第5版) | Richard Brualdi | MIT 等名校使用的经典教材，有中文版。系统阐述组合数学基础。 | 机械工业出版社（中文版） |
| **Combinatorics Through Guided Discovery** | Kenneth Bogart | 免费！探究式学习，带提示和答案。 | [Dartmouth](https://math.dartmouth.edu/news-resources/electronic/kpbogart/) |

### 2.2 🌿 中级（本科高年级）

| 教材 | 作者 | 特点 | 获取 |
|------|------|------|------|
| **Concrete Mathematics** | Graham, Knuth, Patashnik | 🔥 **神书**。连续与离散数学的融合。Knuth 的经典之作，边注幽默，习题极佳（全部有解答）。CS 与数学交叉。 | Amazon / 有中文版《具体数学》 |
| **A Course in Combinatorics** | van Lint & Wilson | 剑桥经典教材，覆盖广。适合已学完入门课程的学生。 | Cambridge University Press |
| **generatingfunctionology** | Herbert Wilf | 🔥 **免费神书**。生成函数专著，写得极好。作者说"生成函数是晾衣绳，我们把数列挂上去展示"。 | [免费 PDF](https://www2.math.upenn.edu/~wilf/gfology2.pdf) |
| **Combinatorics: Topics, Techniques, Algorithms** | Peter Cameron | 算法导向的组合数学。 | Cambridge University Press |
| **Basic Techniques of Combinatorial Theory** | Daniel I.A. Cohen | 基础扎实，讲解透彻。 | Wiley |

### 2.3 🌳 高级（研究生 / 专业方向）

| 教材 | 作者 | 特点 | 获取 |
|------|------|------|------|
| **Enumerative Combinatorics, Vol 1 & 2** | Richard Stanley | 🔥 **研究生圣经**。枚举组合学的标准参考书。习题极难但极有价值。 | Cambridge University Press |
| **Analytic Combinatorics** | Flajolet & Sedgewick | 🔥 **免费神书**。用复分析做组合计数，CS 理论必备。 | [免费官网](https://ac.cs.princeton.edu/) |
| **The Probabilistic Method** | Alon & Spencer | 概率方法的权威著作。 | Wiley |
| **Algebraic Combinatorics** | Richard Stanley | Stanley 的另一力作，代数组合学入门。 | Springer |
| **Additive Combinatorics** | Tao & Vu | 加性组合学，Terence Tao 合著。需要扎实的分析学基础。 | Cambridge University Press |
| **Analytic Combinatorics in Several Variables** | Pemantle, Wilson, Melczer | 多变量解析组合学前沿。 | Cambridge University Press (2024 第2版) |
| **Introduction to Enumerative and Analytic Combinatorics** | Miklós Bóna | Bóna 的研究生水平教材，连接枚举与解析组合学。 | CRC Press |

### 2.4 AoPS 系列（竞赛导向）

| 教材 | 适合 | 特点 |
|------|------|------|
| **Introduction to Counting & Probability** | 6-10 年级 | 组合数学竞赛入门 |
| **Intermediate Counting & Probability** | 9-12 年级 | 进阶计数与概率 |
| **AoPS Volume 1 & 2** | 竞赛备赛 | 综合数学竞赛训练 |

---

## 3. 公开课与视频资源

### 3.1 MIT OpenCourseWare（免费完整课程）

MIT OCW 是组合数学公开课最丰富的来源之一：

| 课程 | 编号 | 年份 | 水平 | 内容 |
|------|------|------|------|------|
| **Combinatorial Theory** | 18.315 | 2005 Spring | 研究生 | 图论导论、极值组合、枚举组合，含完整讲义 |
| [**Algebraic Combinatorics**](https://ocw.mit.edu/courses/18-212-algebraic-combinatorics-spring-2019) | 18.212 | 2019 Spring | 研究生 | Catalan 数、Dyck 路、对称函数 |
| [**Probabilistic Methods in Combinatorics**](https://ocw.mit.edu/courses/18-226-probabilistic-methods-in-combinatorics-fall-2022) | 18.226 | 2022 Fall | 研究生 | 概率方法，含视频讲座 🎥 |
| [**Graph Theory and Additive Combinatorics**](https://ocw.mit.edu/courses/18-225-graph-theory-and-additive-combinatorics-fall-2023) | 18.225 | 2023 Fall | 研究生 | 图论与加性组合学交叉 |
| **Topics in Algebraic Combinatorics** | 18.318 | 2006 Spring | 研究生 | 矩阵树定理等专题 |
| **Geometric Combinatorics** | 18.319 | 2005 Fall | 研究生 | 离散与计算几何 |
| **Topics: Analysis of Boolean Functions** | 18.218 | 2021 Spring | 研究生 | Boolean 函数 Fourier 分析 |

### 3.2 YouTube 精品系列

| 系列 | 讲师 | 机构 | 水平 | 链接特点 |
|------|------|------|------|----------|
| **Enumerative Combinatorics** | Federico Ardila | 旧金山州立大学 | 本科/研究生 | 🔥 **强烈推荐**。讲解清晰，覆盖枚举组合学核心。 |
| **Topics in Combinatorics** | Timothy Gowers | 剑桥 Part III | 研究生 | 菲尔兹奖得主授课！含讲义和习题。Erdős-Ko-Rado 定理等 |
| **Algebraic methods in combinatorics** | Boris Bukh | 卡内基梅隆 | 研究生 | 极值组合中的代数方法 |
| **Discrete Math II / Combinatorics** | Kimberly Brehm | - | 本科 | 完整的离散数学第二学期课程 |
| **Algebraic Combinatorics (ACOW)** | 多位学者 | 在线研讨 | 研究级 | 代数组合学在线研讨会系列 |
| **Probabilistic Methods** | MIT OCW | MIT | 研究生 | 含视频，Ramsey 下界、Sperner 定理等 |

### 3.3 其他视频平台

| 资源 | 说明 | 链接 |
|------|------|------|
| **Khan Academy** | 排列组合入门，适合零基础 | [khanacademy.org](https://www.khanacademy.org) |
| **Stanford CS109** | 概率论中的组合学部分 | [YouTube](https://www.youtube.com/watch?v=ag4Ei15CG0c) |
| **UCSD MATH 184** | 枚举组合学，完整学期录像 | [Podcast](https://podcast.ucsd.edu/watch/sp24/math184_a00/) |
| **Igor Pak 视频收藏** | UCLA 教授整理的组合数学视频索引 | [UCLA](https://www.math.ucla.edu/~pak/lectures/Math-Videos/comb-videos.htm) |
| **3Blue1Brown** | 部分组合数学可视化视频 | [YouTube](https://www.youtube.com/@3blue1brown) |
| **Numberphile** | 组合数学科普 | [YouTube](https://www.youtube.com/@numberphile) |

---

## 4. 习题与竞赛资源

### 4.1 习题集

| 资源 | 说明 | 获取 |
|------|------|------|
| **102 Combinatorial Problems** | Titu Andreescu & Zuming Feng。从 US IMO 训练中精选的 102 道题，按主题分类，含详细解答。 | [PDF 流传](https://rainymathboy.files.wordpress.com/2011/01/102-combinatorial-problems.pdf) |
| **A Path to Combinatorics for Undergraduates** | 大学生组合数学之路。包含计数策略、鸽巢原理、生成函数等主题的习题。 | [PDF 流传](https://mathematicalolympiads.files.wordpress.com/2012/08/a_path_to_combinatorics_for_undergraduates.pdf) |
| **MadAsMaths - Combinatorics** | 英国 A-Level 风格组合学习题集，难度渐进。 | [madasmaths.com](https://madasmaths.com/) |
| **UConn Probability OER** | 概率论中的组合学习题，含详细解答。 | [UConn OER](https://probability.oer.math.uconn.edu/) |
| **AoPS Wiki - Combinatorics** | 竞赛导向的组合数学百科，海量例题。 | [AoPS Wiki](https://artofproblemsolving.com/wiki/index.php/Combinatorics) |

### 4.2 竞赛体系

| 竞赛 | 水平 | 组合数学占比 | 语言 |
|------|------|-------------|------|
| **AMC 8** | 初中 | 约 25% | 英语 |
| **AMC 10/12** | 高中 | 约 30-35% | 英语 |
| **AIME** | 高中拔尖 | 约 35% | 英语 |
| **USAMO / IMO** | 国家队 | 组合为四大板块之一 | 英语 |
| **全国高中数学联赛** | 高中 | 组合为重要板块 | 中文 |
| **CMO（中国数学奥林匹克）** | 国家队选拔 | 高 | 中文 |
| **Project Euler** | 全年龄段 | 大量组合数学编程题 | 英语（编程） |

### 4.3 在线练习平台

| 平台 | 特点 | 链接 |
|------|------|------|
| **AoPS Online** | 自适应难度，社区解答 | [artofproblemsolving.com](https://artofproblemsolving.com) |
| **Brilliant.org** | 交互式数学学习，组合数学课程优秀 | [brilliant.org](https://brilliant.org) |
| **Project Euler** | 用编程解决数学问题，大量组合题 | [projecteuler.net](https://projecteuler.net) |
| **Codeforces** | 竞赛编程，组合数学在算法题中频繁出现 | [codeforces.com](https://codeforces.com) |
| **LeetCode** | 算法面试中的组合数学相关题目 | [leetcode.com](https://leetcode.com) |

---

## 5. 博客与社区

### 5.1 学术博客

| 博客 | 作者 | 内容方向 |
|------|------|----------|
| **Combinatorics and more** | Gil Kalai | 🔥 组合数学与理论计算机科学前沿。量子计算辩论、机器学习与数学。 | [gilkalai.wordpress.com](https://gilkalai.wordpress.com) |
| **Igor Pak's Blog** | Igor Pak (UCLA) | 组合数学教材批判、数学社区观察。"The problem with combinatorics textbooks" 是必读。 | [igorpak.wordpress.com](https://igorpak.wordpress.com) |
| **What's new** | Terence Tao (UCLA) | 加性组合学、解析数论。菲尔兹奖得主的博客。 | [terrytao.wordpress.com](https://terrytao.wordpress.com) |
| **The n-Category Café** | 多位数学/CS 学者 | 范畴论、代数组合学 | [golem.ph.utexas.edu/category](https://golem.ph.utexas.edu/category/) |
| **Math ∩ Programming** | Jeremy Kun | 数学与编程交叉，组合算法。 | [jeremykun.com](https://www.jeremykun.com) |
| **11011110** | David Eppstein (UCI) | 计算几何、图论、组合学。 | [11011110.livejournal.com](https://11011110.livejournal.com) |
| **Richard Stanley's Papers** | Richard Stanley | 代数组合学前沿论文和综述。 | [math.mit.edu/~rstan](https://math.mit.edu/~rstan/papers.html) |

### 5.2 Q&A 社区

| 社区 | 组合数学相关 |
|------|-------------|
| **Math StackExchange** | `combinatorics` 标签下有 10 万+ 问题。搜索 "good book" / "recommendation" 获得教材推荐。 |
| **MathOverflow** | 研究级问题。高质量教材推荐线程。 |
| **Reddit r/math** | 学习资源讨论活跃。搜索 "combinatorics" 获取大量推荐。 |
| **Reddit r/learnmath** | 初学者友好，作业求助和资源推荐。 |

---

## 6. 在线学习平台

| 平台 | 组合数学相关课程 | 费用 | 特点 |
|------|-----------------|------|------|
| **MIT OCW** | 7+ 门组合数学/图论课 | 免费 | 最完整的学术资源，含讲义/习题/视频 |
| **Coursera** | Discrete Optimization (Melbourne), Introduction to Discrete Mathematics | 免费旁听 | 结构化学习，有证书 |
| **edX** | 部分大学离散数学课 | 免费旁听 | 可与 MIT OCW 互补 |
| **学堂在线** | 清华大学《组合数学》 | 免费 | 🔥 中文最佳选择 |
| **中国大学MOOC** | 多所高校离散数学/组合数学 | 免费 | 中文授课 |
| **Brilliant.org** | Combinatorics 互动课程 | 付费 | 交互式学习体验极佳 |
| **Khan Academy** | 排列组合基础 | 免费 | 零基础友好 |
| **AoPS Online School** | 计数与概率系列 | 付费 | 竞赛导向，社区强大 |
| **Daily Challenge (Po-Shen Loh)** | 组合数学模块 | 付费 | 前美国 IMO 教练设计 |

---

## 7. 交互工具与可视化

| 工具 | 用途 | 链接 |
|------|------|------|
| **Mathigon** | 🔥 数学互动乐园。Polypad 可做组合数学的可视化探索。 | [mathigon.org](https://mathigon.org) |
| **GeoGebra** | 免费数学工具，概率与组合可视化。 | [geogebra.org](https://www.geogebra.org) |
| **Matteo Mucciconi Applets** | 概率与代数组合学交互实验。 | [matteomucciconi.github.io](https://matteomucciconi.github.io/applets-list) |
| **Desmos** | 在线图形计算器，可用于生成函数可视化。 | [desmos.com](https://www.desmos.com) |
| **Python (sympy / itertools)** | 用编程验证组合恒等式、生成组合对象。推荐 Jupyter Notebook 环境。 | `itertools.combinations` 等 |

---

## 8. 中文本土资源

### 8.1 中文教材

| 教材 | 说明 |
|------|------|
| **《组合数学》（原书第5版）** | Brualdi 经典教材，中文翻译版。MIT 等名校采用。 |
| **《具体数学：计算机科学基础》** | Graham, Knuth, Patashnik 的中文版。译者：张明尧、张凡。 |
| **《组合数学》** | 清华大学出版社，国内高校常用。 |
| **《组合数学丛书》** | 高等教育出版社/清华大学出版社系列，涵盖多个专题。 |

### 8.2 中文公开课

| 课程 | 平台 | 说明 |
|------|------|------|
| **清华大学《组合数学》** | 学堂在线 | 🔥 **强烈推荐**。系统讲解计数法则、母函数、递推关系、鸽巢原理、容斥原理、Pólya 计数定理。 |
| **中国大学MOOC** | icourse163.org | 多所高校的离散数学/组合数学课程。南京大学等。 |
| **Bilibili** | bilibili.com | 大量数学竞赛组合数学讲解视频。搜索"组合数学"即可。 |

### 8.3 中文社区与博客

| 资源 | 说明 |
|------|------|
| **知乎** | 搜索"组合数学 教材推荐"获得大量中文评价。 |
| **CSDN / 博客园** | 部分组合数学教程和笔记（质量参差，建议优先看教材和公开课）。 |
| **Bilibili** | 数学竞赛 UP 主的组合数学系列。AoPS 官方视频课有搬运。 |

---

## 9. 研究前沿与学术资源

### 9.1 预印本与论文

| 资源 | 说明 |
|------|------|
| **[arXiv math.CO](https://arxiv.org/list/math.CO/recent)** | 组合数学预印本。每日更新，是跟踪前沿最直接的方式。2025 年有 4000+ 篇。 |
| **Paper Digest** | 每月发布"最具影响力组合数学 arXiv 论文"。 |
| **GRWC (Graduate Research Workshop in Combinatorics)** | 研究生组合数学研究研讨会，每年产出论文。2025 年在 Ames, IA 举办。 |

### 9.2 重要学术会议

| 会议 | 说明 |
|------|------|
| **FPSAC** (Formal Power Series and Algebraic Combinatorics) | 代数组合学最重要年度会议 |
| **SODA** (ACM-SIAM Symposium on Discrete Algorithms) | 组合算法 |
| **STOC / FOCS** | 理论计算机科学，大量组合数学应用 |
| **CanaDAM** | 加拿大离散与算法数学会议 |
| **BCC** (British Combinatorial Conference) | 英国组合数学会议 |

### 9.3 当前热点方向（2024-2026）

| 方向 | 说明 |
|------|------|
| **Analytic Combinatorics in Several Variables (ACSV)** | Pemantle-Wilson-Melczer 教科书 2024 第2版，多变量渐近计数 |
| **组合数学与机器学习交叉** | 图神经网络、组合优化的学习增强 |
| **极值组合学新方法** | 代数方法在极值问题中的应用，Flag Algebra |
| **加性组合学进展开** | Green-Tao 定理后续发展 |
| **高维展开子 (High-Dimensional Expanders)** | 代数拓扑与组合学交叉 |
| **枚举组合学的代数方法** | Catalan 结构的新解释、Schröder 数等 |

### 9.4 重要学者（推荐关注）

| 学者 | 机构 | 方向 |
|------|------|------|
| Richard Stanley | MIT | 枚举组合学、代数组合学 |
| Terence Tao | UCLA | 加性组合学、调和分析 |
| Gil Kalai | 耶路撒冷希伯来大学 | 极值组合、理论 CS |
| Noga Alon | Princeton / Tel Aviv | 概率方法、极值组合 |
| June Huh | Princeton | 代数组合学（Fields Medal 2022） |
| Federico Ardila | 旧金山州立大学 | 枚举组合学、拟阵理论 |
| Igor Pak | UCLA | 组合枚举、计算组合学 |
| Timothy Gowers | 剑桥 / Collège de France | 极值组合、加性组合学（Fields Medal 1998） |
| Peter Cameron | St Andrews | 组合学、群论 |
| Persi Diaconis | Stanford | 概率组合学、随机性 |

---

## 10. 推荐学习路径

### 🎯 目标 A：计算机科学方向

```
1. Applied Combinatorics (Keller & Trotter) — 免费
2. Concrete Mathematics (Graham, Knuth, Patashnik)
3. Analytic Combinatorics (Flajolet & Sedgewick) — 免费
4. 补充: MIT 18.212 + 在线习题
```

### 🎯 目标 B：数学竞赛方向

```
1. AoPS Introduction to Counting & Probability
2. AoPS Intermediate Counting & Probability
3. 102 Combinatorial Problems
4. AMC 10/12 真题训练
5. AoPS Wiki 组合板块通读
```

### 🎯 目标 C：纯数学研究方向

```
1. A Walk Through Combinatorics (Bóna) — 基础
2. A Course in Combinatorics (van Lint & Wilson) — 广度
3. generatingfunctionology (Wilf) — 生成函数专精
4. Enumerative Combinatorics Vol 1 (Stanley) — 核心
5. MIT OCW 对应课程 + Federico Ardila 视频
6. arXiv math.CO 每日浏览
```

### 🎯 目标 D：中文环境自学

```
1. 清华大学《组合数学》(学堂在线) — 视频课程
2. 《组合数学》原书第5版 (Brualdi 中文版)
3. 《具体数学》(中文版)
4. Bilibili 补充视频 + 知乎推荐帖
5. AoPS 中文资源 + Project Euler 练习
```

---

## 附录：免费资源速查表

| 资源 | 类型 | 链接 |
|------|------|------|
| Applied Combinatorics | 教材 | [Open Textbook Library](https://open.umn.edu/opentextbooks/textbooks/339) |
| Discrete Math: Open Introduction | 教材 | [discrete.openmathbooks.org](http://discrete.openmathbooks.org/) |
| generatingfunctionology | 教材 | [Penn Math](https://www2.math.upenn.edu/~wilf/gfology2.pdf) |
| Analytic Combinatorics | 教材 | [Princeton](https://ac.cs.princeton.edu/) |
| Combinatorics Through Guided Discovery | 教材+习题 | [Dartmouth](https://math.dartmouth.edu/news-resources/electronic/kpbogart/) |
| MIT OCW 全部组合学课程 | 视频+讲义 | [ocw.mit.edu](https://ocw.mit.edu) |
| 清华大学《组合数学》 | 视频课程 | [学堂在线](https://www.xuetangx.com/course/THU08091000450) |
| Federico Ardila Enumerative Combinatorics | 视频 | [YouTube](https://www.youtube.com/watch?v=pCJNjW8kMIg) |
| Timothy Gowers Topics in Combinatorics | 视频+讲义 | [YouTube](https://www.youtube.com/watch?v=gesQpnQNyqw) |
| 102 Combinatorial Problems | 习题集 | [PDF](https://rainymathboy.files.wordpress.com/2011/01/102-combinatorial-problems.pdf) |
| MadAsMaths Combinatorics | 习题集 | [madasmaths.com](https://madasmaths.com/) |
| AoPS Wiki - Combinatorics | 百科+习题 | [AoPS](https://artofproblemsolving.com/wiki/index.php/Combinatorics) |
| arXiv math.CO | 前沿论文 | [arxiv.org](https://arxiv.org/list/math.CO/recent) |
| Igor Pak 视频收藏 | 视频索引 | [UCLA](https://www.math.ucla.edu/~pak/lectures/Math-Videos/comb-videos.htm) |

---

*本报告由 Hermes Agent（悟空）研究整理，2026 年 6 月 27 日。*
