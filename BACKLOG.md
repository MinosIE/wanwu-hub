# 可改进清单 · wanwu-hub（BACKLOG）

> 生成日期：2026-10-09。基于当前代码现状梳理「还能做什么」。
> 现状：Vite + TS + 零框架 + subject 插件化 SPA，8 个学科全部 `integrated`，由 `src/main.ts` 按 key 路由到各自 `mount`（`src/core/projects.ts`）。
> 既有规划 `PLAN.md`、Agent 规格 `agent.md`、说明 `readme.md` 均描述**旧版纯静态导航站**，与现状严重不符（见 §6）。

---

## 0. 现状速览（TL;DR）

两种实现范式并存：

| 类型            | 学科                                                     | 入口                                                     | 能力                                                    |
| --------------- | -------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------- |
| **FULL**        | `dynasty / econ / mind / thought / earth / life`（6 个） | 自带 `template.ts` + `main.ts` + 独立 CSS                | 搜索 / 筛选 / refs / 详情（语言与主题由顶栏统一切换）   |
| **LIGHTWEIGHT** | `physics / chem`（2 个）                                 | `src/subjects/subjectKit.ts` 的 `createSubject` 配置驱动 | hero + KPI + 搜索 + 难度筛选 + 模块卡 + 详情弹层 + refs |

工程：Vite 构建 + puppeteer SSG 预渲染（`build:ssg`）；GitHub Pages 自动部署（`.github/workflows/deploy.yml`）。
数据门禁：`npm run verify` = typecheck + `check:json` + `links:check`（死链/双语/派生索引/overview 计数）+ `data:check`（physics/chem 导出防漂移）+ dynasty 校验。
**测试：零覆盖**。文档：`readme.md` / `agent.md` / `docs/` 已对齐现状，`PLAN.md` 仍为历史规划。

---

## 1. 跨学科一致性（本轮已收尾）

本轮已完成：physics/chem hero 中英文后缀、mind refs 布局对齐、**subjectKit 难度筛选 chip**、**学科 hero 内的语言/主题按钮移除（顶栏为唯一切换入口），仅中华王朝保留并桥接到主应用状态（`src/core/viewControls.ts`）**、**physics/chem 去掉其他学科没有的 hero 副标语 `.hero-tag` 与自定义模块标题行 `.sm-head`（含右侧计数），改用共享 `.mod-head`**、physics/chem 机器可读 JSON 导出与 `links:check`/`data:check` 入门禁。

- [x] **physics/chem 搜索框**：`subjectKit` 已带 `#search` + 跨模块结果区（`.sub-results`）。
- [x] **physics/chem 过滤器**：模块内新增「难度」chip（入门/进阶/拓展，复用共享 `.filters/.chip`），仅当该模块有 `level` 数据时渲染（原「共 N 条」计数行已随 `.sm-head` 一并移除）。
- [x] **physics/chem refs / 来源区**：`SubjectConfig.refs` 已渲染（physics 4 条，KPI 同步）。
- [x] **视图内主题 / 语言切换按钮**：与顶栏重复，已从 thought / earth / life / mind / econ 的 hero 模板与 subjectKit（physics / chem）里移除，并同步摘掉各学科 `main.ts` 里对 `#langBtn` 的强依赖（`need()` 会抛错）与共享层 `.icon-btn` 死样式。**例外：中华王朝保留**（深色渐变上的玻璃胶囊是它的招牌样式），其点击由 `src/core/viewControls.ts` 在捕获阶段接管、改走 core `setLang` / `toggleTheme`，因此与顶栏同源；`dynasty.css` 里原有的 `display:none` 已删除。
- [x] **hero 副标语 `.hero-tag`（原 `heroSub`）**：其他学科 hero 只有一行导语，这行小字副标语是 physics/chem 独有的，已删除；`SubjectConfig.heroSub` 字段、physics/chem `data.ts` 里的取值、`scripts/export-data.mjs` 导出的 `heroSub`/`heroSubEn` 与 `subjectKit.css` 样式一并清理（overview.json 需重跑 `npm run data:export`）。
- [x] **模块标题行 `.sm-head`**：与其他学科的 `.mod-head` 功能重叠但长相不同（左对齐 + 右侧计数徽章），已改用共享 `.mod-head`（居中标题），subjectKit.css 里的 `.sm-head`/`.sm-count` 自定义规则与 `setCount()` 全部删除。
- [x] **详情面板难度文案**：徽标与 eyebrow 由 `L1/L2/L3` 改为中文等级词（入门/进阶/拓展），与 thought 等学科用词一致。
- [x] **`level` 数据覆盖面**：已补齐。physics 130/130、chem 非周期表 149/149 条均有难度（周期表 118 条按 `kind: "periodic"` 不参与难度筛选，`subjectKit` 的 `hasLevels()` 已排除）。难度按中国课标进入时点人工判定（1 入门 / 2 进阶 / 3 拓展），非机械填充。浏览器实测：chem 18 个模块中 17 个、physics 16 个模块全部出现难度筛选条。
- [ ] **KPI / 详情 / footer 视觉对齐**：physics/chem 的 `sub-detail` / 简单 footer 与 FULL 风格统一。
- [ ] **首页学科计数口径对齐**：顶栏/首页统计数字（学科数）需同步对齐，避免口径矛盾。

## 2. 物理/化学功能补齐（与 §1 重叠，需架构决策）

- **决策点：继续扩展 `subjectKit` 还是把 physics/chem 升级为 FULL 模板？**
  - 扩展 subjectKit：成本低，但能力越加越重，最终与 FULL 趋同、双轨维护。
  - 升级为 FULL：一致性强、可直接复用 search/filter/refs，但每个学科工作量更大。
  - 建议：先定范式，再批量落地，避免两套代码长期并存。
- [ ] **`soon.ts` 死代码 / fallback**：当前仅作未匹配 key 的兜底，无学科落入。可统一复用为「未接入学科」占位页，或从路由移除。

## 3. 内容扩充

- [ ] **physics/chem 种子内容深化**：（本条原记的「`data.ts:7` 标注『示例性内容，持续扩充中』」与「physics 31 条 / chem 34 条」均已失真：全仓无该标注（只有 econ 的「示例性年度近似值」），实际为 physics 130 条 / chem 267 条，其中 118 条是完整周期表。当前双语字段无缺失、难度字段已全覆盖；仍偏浅的是**每模块条目的广度**（physics 最少的 methods / fluids / relativity / waves / tech 各 4-5 条，chem 的 energy / electrochem / solutions / kinetics 各 5-6 条）。chem 原缺的**常见物质俗名·颜色·检验速查表**与**化学实验基本操作**已由 `quickref` 模块补上（仪器识别与使用、分离提纯、试剂存放三格也已归入同一模块），`chemists` 已由 8 位扩到 15 位；physics 16 个模块仍缺近代物理实验一类专题。
- [x] **chem `chemists` 8→15 位 + 新增「速查表」模块 `quickref`**（本轮共 +14 条 / 12 个方程式 / 38 项 `subs` / 5 张内联 SVG）：
  - `chemists` 8→15：新增舍勒、普利斯特里、戴维、贝采利乌斯（难度 1/1/2/2）、阿伦尼乌斯、范托夫（3）、侯德榜（2），并给原有 8 位**一律补上 `detail`**（原 8 条只有 `oneLiner`，详情弹层是空的）。写进去的是能纠错的事实：舍勒约 1772 年制氧却因出版晚于普利斯特里而失优先权、以看闻尝鉴定试剂而四十余岁病逝；普利斯特里发现氧而死守燃素说（发现归他、理论归拉瓦锡）；戴维 1807 年电解熔碱得钾与钠、证明氯是元素（拉瓦锡在此判断错了）、把装订学徒法拉第提为助手；贝采利乌斯定下今天仍在用的元素符号并造「催化/同分异构/蛋白质」三词，晚年被二元电化理论挡在有机化学门外；阿伦尼乌斯 1884 年博士论文被压到及格下限、1896 年首次定量算出 CO₂ 翻倍带来的增温；范托夫 22 岁自费印册提出碳四面体、同年勒贝尔独立提出同一想法；侯德榜 1933 年出《制碱》拆掉索尔维封锁、1943 年联合制碱把食盐利用率由不足八成提到九成以上。
  - `quickref`（📋，7 条，插在 `equations` 与 `life-chem` 之间）：俗名与成分 20 组对照（纯碱/小苏打/胆矾皆盐、水玻璃是溶液不是玻璃）、颜色速查（固体 12 + 溶液 8 + 气体 2 的色块表，附「颗粒大小与稀释度同样改变颜色」）、酸碱盐溶解性（口诀 + 20 ℃ 分级数字 10 / 1 / 0.01 g，写明 BaSO₄ 仍溶约 2 mg/L 故「不溶」从不绝对）、焰色反应（7 条色阶 + 「钾必隔蓝色钴玻璃」「洗丝用盐酸而不用硫酸因硫酸盐难挥发」）、常见离子检验（20 项 `subs` + 6 方程式，含 `Fe³⁺ + 3SCN⁻ ⇌ Fe(SCN)₃` 与「先酸化、酸化用的酸要选对」三条规矩）、常见气体检验与验满（15 项 `subs` + 5 方程式，检验伸入瓶内 vs 验满只碰瓶口）、实验基本操作与事故处理（含 `Hg + S = HgS` 与一张五行事故处理表）。
  - 结构取舍：`subjectKit` 的 `Sub.role` 只有 `l/r/c` 三态、`SUB_GROUPS` 标题固定为「反应物 / 生成物 / 条件·催化/介质」，`detail` 又只渲染成单个 `<p>`（纯文本转义、不支持换行），所以**纯表格类速查不能借 `subs` 承载**——俗名、颜色、溶解性、焰色、事故处理五条一律走内联 SVG 表格 + `detail` 段落，只有确实有反应的离子检验与气体检验才用 `subs` + `eq`（未往无反应处塞假角色）。
  - 质量核验：12 条新增方程式逐条过**原子守恒 + 电荷守恒**脚本，脚本自身用 8 组反向对照验有效性（删掉 `2H⁺` 的系数、`2O₃ = 2O₂` 不配平、`Fe²⁺ + Cl₂ → Fe³⁺ + 2Cl⁻` 电荷不守恒三例必须报错；`NH₄⁺ + OH⁻`、`CuSO₄ + 5H₂O → CuSO₄·5H₂O`、`Fe(SCN)₃` 必须判平——分别踩住电荷摘取、水合点号与括号展开三条易崩路径）；方程式物种与同条目 `subs` 差集为空；`f` 字段 0 处中文；22 条新条目双语字段齐全、`*En` 无中文标点。修掉十余处自伤错字（「盐泳于水」→「溶于水」、「酸砸盐」→「酸碱盐」、「只理钾」→「只溶钾」、「眼晴」→「眼睛」、「玻璃器Ⅲ」→「玻璃器皿」、SVG 里 `y="149"?` 的野问号、en 字段漏进中文「挥发/灵敏/浓盐酸」等），并改掉一处真错：镁的溶解性论断原写「镁反而比钙更容易被除去」，实为**软化硬水时必须先把镁转成氢氧化物才能除净**。
  - 计数与实测：chem 17→18 模块、250→264 条（非周期表 132→146）、带 `eq` 条目 55→58、方程式 99→111、`subs` 300→338、SVG 示意图 12→17；`data:export` / `gen:geo` / `gen:sitemap` 已同步（chem `llms.txt` / `llms-en.txt` 的计数与端点自动更新），`npm run verify` exit=0；浏览器实测（每语言独立实例 + 独立 profile）中英 × 明暗 **194 项断言全过、0 报错**，5 张新 SVG 逐张截图人工复核（双语标注不重叠、暗色下 `currentColor` 可读、英文态正文无中文残留）。
- [x] **chem `quickref` 再补上「仪器识别与使用」一类三格**（本轮 +3 条 / 3 个方程式 / 10 项 `subs` / 3 张内联 SVG，模块数不变）：
  - `qr-instruments`（⚗️，难度 1）：只认三件事——能量到多小、能不能加热、能不能当反应容器。精度口径逐条写死（托盘天平 0.1 g、量筒 0.1 mL、滴定管 0.01 mL 所以终点记作 22.60 mL、容量瓶只有一条标线），附俯视/仰视对量筒读数的方向、碱液为何用橡胶塞、温度计何时插液面何时齐支管口、pH 试纸不能润湿而石蕊与淀粉-KI 试纸必须润湿（前者测浓度、后者测气体），并标注人教版新教材已把「石棉网」改叫「陶土网」。
  - `qr-separations`（🫧，难度 2）：过滤「一贴二低三靠」与洗沉淀的具体做法、蒸发结晶大量晶体即停火、带结晶水或易水解的必须改降温结晶（NaHCO₃ 受热放 CO₂；FeCl₃ 溶液蒸干只得氧化铁而得不到无水氯化铁）、蒸馏四事（沸石忘加必冷后补、球齐支管口、水下进上出、先通水后加热）、萃取剂三条要求与下层下口出上层上口倒、洗气长进短出与干燥管大进小出，末尾钉住两个易错点：胶体除离子靠渗析、而 NH₄Cl 只是「假升华」（先分解后化合）所以不能用升华法把它和碘分开。
  - `qr-storage`（🧴，难度 2）：存放只看「它跟什么反应」——钠钾泡煤油（密度比煤油大、沉在下面刚好隔绝空气与水）、白磷浸冷水（着火点约 40 ℃）、液溴水封、见光分解三类进棕色瓶（AgNO₃、浓 HNO₃、氯水，旧瓶内壁发黑就是析出的银）、亚铁盐里放铁钉、干燥剂入干燥器、氧化剂与有机物分柜；配 3 个真方程式与 10 项 `subs`：`SiO₂ + 2NaOH`（磨口被碱粘死）、`SiO₂ + 4HF → SiF₄↑`（氢氟酸只能装塑料瓶）、`2AgNO₃ =(光照) 2Ag + 2NO₂↑ + O₂↑`，并写明装碱液的滴定管为何必须用碱式（橡胶管嵌玻璃珠）而不能用带玻璃磨口活塞的酸式。
  - 结构取舍：延续上一轮的纪律——仪器与分离提纯两条本质是操作口径而非化学反应，**不往无反应处塞 `subs`/`eq`**（表格走内联 SVG + `detail`）；只有试剂存放里确实发生的那三个侵蚀与分解反应用了 `subs` + `eq`。
  - 质量核验：quickref 15 条方程式逐条过**原子守恒 + 电荷守恒**，脚本自身用 13 组反向对照钉住易崩路径（其中 `2Fe²⁺ + Cl₂ → 2Fe³⁺ + 2Cl⁻` 与 `Ba²⁺ + SO₄²⁻ → BaSO₄↓` 必须判平、`Ba²⁺ + SO₄²⁻ → BaSO₃↓` 必须报错——本轮核验脚本初版正是把上标 `²⁻` 只按一个负号计为 -1，被这三例逼出）；另校 `eq` 物种与同条目 `subs` 差集为空、`f` 无中文、双语字段与 `*En` 无中文、行尾无空格。结构+守恒合计 **1373 项断言 0 失败**。
  - 计数与实测：chem 264→267 条、`quickref` 7→10 条、非周期表 146→149、带 `eq` 条目 58→59、方程式 111→114、`subs` 338→348、SVG 示意图 17→20（模块数仍 18）；`data:export` / `gen:geo` 已同步（chem `llms.txt` / `llms-en.txt` 计数自动由 264 改为 267，sitemap 条数不变）；`npm run verify` exit=0；浏览器实测（每语言独立实例 + 独立 profile）中英 × 明暗 **380 项断言全过、0 报错**（含逐条公式/释义/插图数量、英文态正文去 svg 后无中文、气体符号动画节点 3 处与光照动效类 1 处命中）；3 张新 SVG 与详情弹层逐张截图人工复核（明暗下均无重叠与裁切）。
- [x] **chem 新增「化学与环境」模块 `chem-env` + 填厚「化学与工程」**（本轮共 +11 条 / 36 个方程式 / 100 项 `subs` / 2 张内联 SVG）：
  - `chem-env`（🌿，7 条 / 22 方程式）：酸雨与石灰石-石膏法湿法脱硫（含总结果式与“石壳脱落”一侧的危害）、汽车尾气三元催化（铂铑钯三件事与 λ≈1 的窄窗口、无铅汽油的因果）、水体富营养化与脱氮除磷（铁盐除磷、好氧硝化与缺氧反硝化两式电荷守恒）、饮用水净化与消毒（明矾水解与氯水均 `rel: "equilibrium"`，ClO₂/臭氧的取舍）、垃圾焚烧与金属回收（二噁英 850 ℃/2 s 与急冷穿过 250~400 ℃、飞灰属危废）、二氧化碳的捕集与资源化（碳酸钠循环吸收-再生、CO₂ 加氢制甲醇、结合成尿素，并写明绿氢前提）。原 `chem-industry` 里的含铬废水 `env-chrome-water` 归入本模块。
  - `chem-industry` 6→10 条（19→33 方程式）：追加海水提溴（空气吹出法四步循环，配一张三步流程图）、海水提镁（石灰乳沉淀→酸溶→熔融电解，含“直热 MgCl₂·6H₂O 只会得到 MgO”的坑）、石油的分馏与裂化裂解（物理/化学变化分界与辛烷值口径）、煤的干馏气化液化（合成气为枢纽）、玻璃/水泥/陶瓷（硅酸盐工业，高岭土失结构水）。
  - 质量核验：36 条新增方程式逐条过**原子守恒 + 电荷守恒**脚本，脚本自身用 4 组反向对照验有效性（删系数、改 O₂ 计量必须报错，含括号化学式 `CO(NH₂)₂` 必须能解）；方程式物种与 `subs` 的差集为空；`f` 字段保持语言中立（本轮新增 0 处中文）。顺手修掉三处自伤：`C₈H₁₈` 下标被吞成 `C₈H₁`、「锻烧」→「煅烧」、「云霓」→「云滴」。
  - 计数与实测：chem 16→17 模块、239→250 条（非周期表 121→132）、带 `eq` 条目 44→55、方程式 63→99、`subs` 200→300、SVG 示意图 9→11；`data:export` / `gen:geo` / `gen:sitemap` 已同步，浏览器实测（每语言独立浏览器实例 + 独立 profile）中英 × 明暗 **163 项断言全过、0 报错**，两张新流程图截图已人工复核（双语标注不重叠、暗夜下 `currentColor` 可读）。
- [x] **chem 新增「化学与工程」模块 `chem-industry`**（⚙️，6 条 / 19 个方程式 / 42 项 `subs` / 2 张内联 SVG）：粗硅提纯与半导体级硅（三步串联 + HCl 循环）、接触法制硫酸（三塔，含 `SO₂ ⇌ SO₃` 可逆与「为何不直接加水吸收」）、氨氧化法制硝酸（Pt-Rh 网催化 + NO 循环）、冰晶石熔盐电解炼铝（含阳极被消耗的总结果）、铜的电解精炼与阳极泥（三式均 `rel: "equal"`，与 `electrochem` 口径一致）、含铬废水的还原沉淀处理（先酸化还原、再加石灰沉淀）。方程式逐条过配平/电荷守恒脚本核验；难度按课标时点判为 2/3 混合（与既有氯碱 2、合成氨 3 对齐，非机械填 3）。chem 15→16 模块、233→239 条，`data:export` / `gen:geo` / `gen:sitemap` 已同步，浏览器实测中英 × 明暗 41 项断言全过、0 报错。
- [x] **chem 补「电子废弃物提金」工艺流程**：`life-chem` 新增 `eq-ewaste-gold`（难度 3）——四步流程（拆解分选 → 浸出 → 还原沉淀 → 熔炼铸锭）配 4 条方程式（王水溶金、氰化浸出、焦亚硫酸钠还原、铜置换）、8 项 `subs` 逐物种释义、一张内联 SVG 流程图（`currentColor` 文本 + 金色试剂标注，暗夜下已实测可读），品位与安全口径写到条目里（电路板 80–300 g Au/t vs 矿石 1–5 g/t；NO₂/Cl₂ 与 CN⁻ 危害、废液须处理、金多为铜银钯综合回收的副产品）。chem 232→233 条，`data:export` / `gen:geo` 已同步，双语与来源门禁 0 错 0 警。
- [x] **econ 补「骗局与泡沫」模块与金融大事件**：新增 `bubbles.json`（16 条中英双语：郁金香、南海、庞氏、亨特兄弟、巴林、LTCM、互联网泡沫、安然、银广夏、麦道夫、LIBOR、PlusToken、Wirecard、LUNA、FTX 等）与新视图 `m-bubbles`（`template.ts` section + 导航按钮 + `s/build-econ-index.mjs` 登记 + i18n 双语键）；`events.json` 22→31（黑色星期一、黑色星期三/索罗斯做空英镑、俄罗斯违约、欧元区主权债务危机、闪电崩盘、2015 A 股异常波动、瑞郎脱钩、英国迷你预算、硅谷银行）。econ 模块 16→17、条目 207→232，overview 计数/KPI 与四份 GEO 文档已同步。
- [x] **econ 把「芒果骗局」收为误区条目而非泡沫事件**：先定性——这则「商人进村喊话收购芒果、每天涨一块、助手把芒果抵押变现、五次反转」的网文是**教学寓言**，没有真实主体、年份、金额与判决，填不满 `bubbles` schema 的 `year` / `cost` / `sources` 三格（银广夏那条是靠《财经》2001 年报道 + 证监会处罚决定撑住的），所以不是漏收，是它本就不属于事件层。改为进 `myths.json`（`mango-parable`，难度 2，myths 6→7）：把寓言**逐点还原成真实机制**——凭空造需求、养出「还会涨」的预期、把货与债权分别打包套现都是真的，假的在最后那句「看穿套路就轮不到自己接盘」：撑价是持续贴钱的成本（亨特兄弟买白银买到交不出保证金，交易所一改规则价格当场崩，结局并不由操纵者决定）；后期入场者多半不是被骗，而是明知是资金盘仍赌有人接盘（凯恩斯《通论》第 12 章的选美竞赛）；风险能一路转手的前提是审计、披露与核查同时失灵（银广夏败于报关单、收汇、产能三个数字互相对不上）。来源 3 条双语成对（金德尔伯格与阿尔伯《疯狂、恐慌与崩溃》2011、凯恩斯《就业、利息和货币通论》第 12 章 1936、阿克洛夫与席勒《钓愚》2015），`related` 指向 `ponzi-1920` 与 `yinguangxia-2001`。派生索引经 `econ:build-index` 重建（search +1 条、related +1 桶，注意 econ 的真相源就是 JSON，与 chem 改 `data.ts` 相反），`overview.counts.myths` 6→7、econ 条目 232→233。`llms-full.txt` / `llms-full-en.txt` 手工插入并对齐既有 `### 误区 / - 更准确的说法 / - 为什么会搞错` 三行格式（econ 无 llms-full builder，仅 dynasty 有）。浏览器实测中英 × 明暗 **23 项断言全过、0 报错**（模块导航走 `button.mod[data-go="m-myths"]`，卡面难度与详情面板双语字段均无串味）。
- [x] **econ 图表数据口径**：先摸底发现数据层早已说清（每张图标题带「（示意）」、`note`/`noteEn` 逐图免责、`sources` 标「近似整理」，`charts.ts` 已渲染，`llms-full.txt` 也带）；真正缺的是两件事，已修：① 口径标到 **SVG 本体**（`svg.chart .c-mark`，文案新增 `ui.chartMark`：「示意 · 非实测数据」/ “Schematic · not measured”），卡片被截图外传时口径不会随之丢失；② `charts.ts` 原本自己拼接 `src.label`，**英文界面漏中文**，改为复用 `core/detail.ts` 导出的 `srcLabel()`（单一真相源，年份括号随语言）。实测 7/7 张图双语均正常。**不换为真实数值序列**：本仓无法核验数据源，把近似值改扮成可引用统计比口径不清更糟。
- [x] **mind 在建模块**：本条前提失真——mind 模板的 15 个 section 已全部建成（11 个 `listModules` + `m-demos` / `m-bigfive` / `m-selfrating` 三个自定义模块），模板里 `class="placeholder"` 元素 0 个，`mountPlaceholders()` 与 `ui.comingSoon`（`i18n.ts:187`）是**永远不会命中的兜底路径**，无在建模块可推进。保留这段兜底代码（成本为零，可防未来新增 section 时漏挂载），本条关闭。
- [x] **mind 双语补齐并进默认门禁**：`links:check` 默认清单加入 mind（原为六科）。落地内容：① mind 此前完全不支持来源英文，`types.ts` 的 `RefSource` 加 `labelEn/type/typeEn`，`detail.ts` 导出与 econ 同构的 `srcLabel()`（labelEn 优先、年份括号随语言），`app.ts` 页脚 refs 与详情面板共用一份；② 数据补 63 处 `labelEn` + 5 处 `typeEn`（来源缺英文 68 → 0）、50 处 `categoryEn` + 6 处 `eraEn`（英文态分类筛选条与流派年代不再漏中文，实测 biases/everyday/experiments/myths/schools 五模块全英化且筛选仍准确）；③ 修掉进门禁时爆出的 5 个真错：`experiments.json` 与 `glossary.json` 的 `cognitive-dissonance` **id 重名**（mind 的 `related.ts` 用扁平 Map 注册，重名会静默覆盖跳转目标）→ 实验条目改名 `festinger-dissonance`，并按其自引的 `Festinger & Carlsmith (1959)` 把 `year` 1957 纠正为 1959；`psychologists.json` 3 条死链 → `carl-rogers` 的 `self-concept` 改指已有条目 `self`，`aaron-beck` 的 `cognitive-distortion`、`vygotsky` 的 `scaffolding` **直接删除**（仓内无对应条目，挂到「认知失调」「学习」都是错的，宁缺不凑）；`myths.json → left-right-brain` 的 `oneLinerEn` 里漏着中文“分工”→ 改写。现 mind 错误 0 / 告警 0，`npm run verify` 通过。
- [ ] **mind `overview.json` 迁移到新 schema**：它仍是早期移植的 `{kpis:[{file,titleKey,count}], entries, refs}`，没有 `counts`，因此 `links:check` 的分类计数校验对 mind 自动跳过（`check-links.mjs` 已加 `hasCounts` 守卫，否则 `canon(undefined)` 会直接崩溃）。迁移需连 `app.ts` 的 `mountOverview()` KPI/入口渲染一起改，属独立工作量。
- [ ] 各 `sources.json` / refs 来源补全与去重（已 10 个 FULL 文件含 `sources.json`）。mind 的来源双语已于本轮补齐并进门禁（见上条），其余学科的 `sources.json` 仍未逐条核校。

## 4. 工程化（中优先）

- [x] **代码风格与静态检查统一**：现由 **Biome**（`biome.json` + `@biomejs/biome` 入 devDependencies）一手承担格式化 + lint；新增 `lint` / `lint:fix` / `lint:ci` 三条脚本，`lint:ci`（`biome check --diagnostic-level=error`）已接进 `verify` 取代原 `format:check`。口径沿用先前实测结论：lineWidth 80、2 空格、双引号、尾逗号，**唯一例外 `src/subjects/mind/**` 单引号**（逐目录数过字面量，仅 mind 单引号占优 1436:699）；`quoteProperties: "preserve"` 保住 dynasty builder 里含间隔号的中文键引号；**`assist.organizeImports` 关闭**（import 顺序承载模块求值顺序，各学科 `index.ts` 先引 template/CSS 再引 `main`）；屏蔽 `public`、physics/chem `data.ts`、`**/*.html`。不存在“替换 ESLint”——本仓从未有 ESLint，Biome 带来的是从未有过的 lint 层。迁移代价实测很小：在已被 Prettier 全量格式化过的代码上，Biome 仅与 4 个文件口径不同（`router.ts` 联合类型换行、mind 3 个 CSS 的属性选择器引号）。顺手清掉的真问题：3 处 `(x ??= []).push()` 表达式内赋值、`build-geo.mjs` 未使用的 `PUBLIC` import、`add-classics.cjs` 的 `node:` 协议；`useIterableCallbackReturn` 降为 warn（63 处移植树写法）。验证：`verify` 全绿、builder 重跑输出与迁移前逐字节一致、`build:ssg` 产物零漂移、首页 + 16 个学科视图（8 学科 × 2 语言）浏览器实测 0 报错。
- [x] **修复 econ 派生索引陈旧**：`public/econ-data/data/search.json` / `related.json` 里 `china-stock-volatility-2015` 还挂着旧标题「2015 年中国股市异常波动」，而源数据 `events.json` 早已改为「中国股市异常波动」；重跑 `econ:build-index` 后对齐。已做 A/B 证明是旧欠债而非本次迁移引入（迁移前的 builder 产出同样差异）。教训进 `agent.md`：改完源数据必须 `index:rebuild`，门禁查不出这类陈旧。
- [x] **清掉 lint 里的真缺陷**（202 → 155 warnings）：`noUnusedImports` 15 处全清（其中 mind 10 个模块是因为 `card: (it, L) => …` 的**参数名遮蔽了同名 import**，属于移植时的残留冗余，`typecheck` 可兜底验证），`noGlobalIsNan` 3 处改 `Number.isNaN`（先逐个确认入参恒为 number：`startYear()` 走 `+tok`、锚定演示走 `parseInt`，否则 `isNaN(null)===true` 而 `Number.isNaN(null)===false` 会默默改掉语义；`dynasty:validate` 输出逐行比对一致）。这两类修复是 **unsafe fix**，`lint:fix` 默认不动，得 `--only=<rule> --write --unsafe` 限定单条跑。
- [x] **CSS 刻意写法按目录豁免**：`overrides` 对 `src/subjects/**/*.css` 关掉 `noImportantStyles`（11）与 `noDescendingSpecificity`（16），共消 27 条 —— 学科样式的 `.xxx-root` 分层覆盖本就依赖这个写法；`src/core/ui/ui.css` 里 `prefers-reduced-motion` 的两处 `!important` 不跟目录豁免，改用就地 `biome-ignore` 注释（那是无障碍兜底，且 hub 侧仍需该规则）。已做对照：去掉 override 为 182 warnings，带上为 155，差值刚好 27。
- [ ] **清剩余 lint 存量**：现 155 warnings + 53 infos，均不阻断门禁——`useIterableCallbackReturn` 63（已降级，改写完可恢复 error）、`noExplicitAny` 29、`noNonNullAssertion` 29、`useOptionalChain` 18、`useTemplate` 50 infos（`lint:fix` 会自动修，但会造大 diff，宜随功能改动顺手换）、`noCommaOperator` 4、`noConfusingVoidType` 4、`noUnusedVariables` 6。
- [ ] **补测试**：当前零测试（`devDependencies` 无 vitest/jest，无 `*.test.*`）。建议 vitest 冒烟测试：构建产物、关键渲染、i18n 切换、路由分发。
- [x] **类型检查 / 数据校验进 CI**：新增 `npm run verify`（typecheck + check:json + dynasty 校验）与 `.github/workflows/ci.yml`（PR/push 跑 verify + build）。
- [x] **单一真相源 / 去重**：`src/core/subjects.json`（四脚本共享）、`src/core/dataKit.ts`（data.ts 工厂）、`s/build-index.mjs`（合并三份 index-builder）、GEO 域名统一为 minosie。
- [ ] **CloudStudio 部署**：项目记忆里有 CloudStudio 规则但未配置任何 CloudStudio 文件；如需多端部署可补，否则维持 GitHub Pages。

## 5. 体验 / 设计

- [ ] **全局跨科搜索**：目前搜索是学科内；可考虑壳层全局搜索跨所有学科。
- [x] **主题 / 语言切换 bug 排查**：根因是学科内按钮走学科自己的 `setLang`/主题写入（dynasty 的 localStorage 还是沙箱内存桩），与顶栏不同源；index.html 因此直接隐藏了它们。现结论收敛为「顶栏是唯一切换入口」：除中华王朝外按钮已从模板移除，dynasty 的按钮由 `src/core/viewControls.ts` 桥接（捕获阶段 `stopPropagation` → 改调 core `setLang`/`toggleTheme`）。实测 8 科：顶栏切换对 8 科全部生效，dynasty hero 两枚按钮与顶栏双向同步，0 控制台报错。
- [ ] **重复 id 隐患**：顶栏 `#themeBtn` 与中华王朝 hero `#themeBtn` 同页共存（HTML 无效）；主应用已改为 `header #themeBtn` 作用域查询规避，彻底清理需重命名移植模板里的 id（并入 §2 范式决策）。
- [ ] **移动端适配一致性**：8 学科响应式核对（hero 高度本轮已统一收敛）。
- [ ] **加载态 / 骨架屏、错误边界**。
- [ ] **无障碍**：aria、键盘导航、对比度（hero 标题对比度本轮已修）。
- [ ] **收藏 / 书签、分享深链**：physics/chem 已支持 `#subject/physics/mod/id` 深链，可推广到 FULL 学科。

## 6. 文档更新（已基本完成）

> 状态更新：`readme.md` / `agent.md` / `docs/README.md` 已重写为当前 Vite + TS + subject SPA 现状，并补充了 `subjects.json` 单一真相源 / `dataKit` / GEO 生成器 / 派生索引重建 / CI 门禁 / 品牌与分析。`PLAN.md` 仍为收敛前的历史规划，保留作背景（可选：加一行指向本 BACKLOG 的“已完成”说明）。

- [x] **重写 `readme.md`**：技术栈、目录（含 `subjects.json`/`dataKit`/`_shared`/`scripts`）、本地预览与数据脚本、GEO 与品牌分析。
- [x] **重写 `agent.md`**：design tokens、新增学科流程（改 `subjects.json`）、§７ GEO/重建/CI。
- [x] **更新 `PLAN.md`**：已标记「收敛已完成」并指向本 BACKLOG（`PLAN.md:4`）。
- [ ] **physics/chem 状态位**：`src/core/subjects.json` 仍标 `status: "wip"`（首页显示「接入中」），但两科已具备搜索/筛选/详情/refs/机器可读 JSON + GEO。是否改 `online` 需你拍（会同步影响首页徽标、预渲染页与 `llms.txt` 口径）。
- [x] **新建 `docs/`**：`docs/README.md` 开发/内容贡献指南（含派生数据与 GEO 生成）。

## 7. 优先级总览

| 优先级 | 项                                                     | 价值                                 |
| ------ | ------------------------------------------------------ | ------------------------------------ |
| ~~P0~~ | ~~§1 physics/chem 搜索 / 筛选 / refs 补齐 + 切换按钮~~ | ✅ 本轮已完成（见 §1）               |
| **P0** | §6 文档重写                                            | ✅ 已基本完成，仅 `PLAN.md` 待标历史 |
| **P1** | §2 架构决策（subjectKit vs FULL）                      | 决定长期维护成本                     |
| **P1** | §3 内容深化（chem `level` 覆盖面 / earth / life）      | 内容质量                             |
| **P2** | §4 测试                                                | 稳定性（CI 门禁已接 links/data）     |
| **P2** | §5 体验 / 设计                                         | polish                               |

---

### 附：本轮已落地（供追溯）

- `d824262` physics/chem hero 补中英文后缀（与其它学科 i18n 一致）
- `dfad0f3` 移除 physics/chem hero 副标题（sub-sub）
- `29d043c` mind refs 区块布局对齐其它学科（左对齐标题 + 多列网格 + 去虚线）
- `05fdcde` 首页简介学科数 六→四
- thought 新增 5 类视图（术语/时间线/思想实验/中西对比/误区），共 10 视图 184 条，索引 87→184
- `scripts/export-data.mjs`：physics/chem `data.ts` → `public/<x>-data/data/*.json`（+ llms/robots/sitemap），`data:check` 防漂移
- `scripts/check-links.mjs` 新增「派生索引覆盖」检查；earth/life 24 处 related 死链与 overview 计数清零
- `scripts/jsonStyle.mjs`：`fmt-json` 与 `export-data` 共用同一排版器（导出产物天生即为仓库规范风格）
- `src/core/viewControls.ts`（dynasty hero 按钮桥接）+ `subjectKit` 难度筛选：8 科顶栏语言/主题切换实测生效，dynasty 双向同步（puppeteer 0 报错）
- 学科 hero 语言/主题按钮移除：顶栏样式改为 `.toolbar` 作用域（原先裸 `.theme-btn{width:38px}` 泄进学科 hero，把胶囊压成竖排圆钮）
