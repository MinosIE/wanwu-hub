export interface Project {
  key: string;
  emoji: string;
  zh: string;
  en: string;
  subZh: string;
  subEn: string;
  descZh: string;
  descEn: string;
  repo: string;
  line: "timeline" | "everything";
  /** 在 wanwu 统一站内是否已接入可浏览的内容 */
  integrated: boolean;
  siteUrl?: string;
  repoUrl?: string;
  statusZh: "online" | "first" | "soon" | "wip";
  statusEn: "online" | "first" | "soon" | "wip";
  tagsZh: string[];
  tagsEn: string[];
}

export const PROJECTS: Project[] = [
  {
    key: "dynasty",
    emoji: "📜",
    zh: "中华王朝",
    en: "Chinese Dynasties",
    subZh: "千年脉络",
    subEn: "A Millennia of Lineage",
    descZh: "从夏到清，逐一展开每个朝代的帝王世系、核心人才、关键政策与制度演变，看懂数千年权力与文明的流转。",
    descEn: "From Xia to Qing: dynastic lineages, key figures, policies and institutions across millennia of Chinese civilization.",
    repo: "chinese-dynasty-timeline",
    line: "timeline",
    integrated: true,
    siteUrl: "https://minosie.github.io/chinese-dynasty-timeline/",
    repoUrl: "https://github.com/MinosIE/chinese-dynasty-timeline",
    statusZh: "online",
    statusEn: "online",
    tagsZh: ["朝代", "帝王", "大事件", "时间轴"],
    tagsEn: ["Dynasties", "Emperors", "Events", "Timeline"],
  },
  {
    key: "econ",
    emoji: "💰",
    zh: "万物经济学",
    en: "Economics of Everything",
    subZh: "供需之间看世界",
    subEn: "The World through Supply & Demand",
    descZh: "用供需、市场、货币与行为的视角，把日常的经济现象讲清楚，看见价格背后的逻辑。",
    descEn: "See everyday economic phenomena through supply, demand, markets, money and behavior — the logic behind prices.",
    repo: "econ-everything",
    line: "everything",
    integrated: true,
    siteUrl: "https://minosie.github.io/econ-everything/",
    repoUrl: "https://github.com/MinosIE/econ-everything",
    statusZh: "wip",
    statusEn: "wip",
    tagsZh: ["供需", "市场", "货币", "行为"],
    tagsEn: ["Supply", "Market", "Money", "Behavior"],
  },
  {
    key: "mind",
    emoji: "🧠",
    zh: "万物心理学",
    en: "Mind of Everything",
    subZh: "读懂人心",
    subEn: "Understanding the Mind",
    descZh: "梳理心理学主要流派、经典实验与常见认知偏差，并落到生活里的自我觉察与决策。",
    descEn: "Schools of thought, landmark experiments and cognitive biases — applied to self-awareness and daily decisions.",
    repo: "mind-everything",
    line: "everything",
    integrated: true,
    siteUrl: "https://minosie.github.io/mind-everything/",
    repoUrl: "https://github.com/MinosIE/mind-everything",
    statusZh: "wip",
    statusEn: "wip",
    tagsZh: ["流派", "认知偏差", "实验", "生活应用"],
    tagsEn: ["Schools", "Biases", "Experiments", "Life"],
  },
  {
    key: "thought",
    emoji: "🏛️",
    zh: "万物哲学",
    en: "Thought of Everything",
    subZh: "思想长河",
    subEn: "The River of Thought",
    descZh: "串起东西方哲学流派、核心命题与经典著作，在追问与思辨中理解我们如何认识世界。",
    descEn: "Eastern and Western schools, core questions and classics — how we come to know the world through inquiry.",
    repo: "thought-everything",
    line: "everything",
    integrated: true,
    statusZh: "wip",
    statusEn: "wip",
    tagsZh: ["东西方", "流派", "核心命题", "经典著作"],
    tagsEn: ["East-West", "Schools", "Questions", "Classics"],
  },
  {
    key: "earth",
    emoji: "🌍",
    zh: "万物地理",
    en: "Earth of Everything",
    subZh: "山河经纬",
    subEn: "Mountains, Rivers & Coordinates",
    descZh: "从地形、气候带到国家档案与河流山脉，建立对世界地理空间的整体认知。",
    descEn: "Terrain, climate zones, country profiles and rivers — a spatial map of the world.",
    repo: "earth-everything",
    line: "everything",
    integrated: false,
    statusZh: "soon",
    statusEn: "soon",
    tagsZh: ["地形", "气候带", "国家档案", "河流山脉"],
    tagsEn: ["Terrain", "Climate", "Countries", "Rivers"],
  },
  {
    key: "life",
    emoji: "🧬",
    zh: "万物生物",
    en: "Life of Everything",
    subZh: "生命之树",
    subEn: "The Tree of Life",
    descZh: "从演化、分类学到细胞与生态，理解生命的多样性与万物之间的关联。",
    descEn: "Evolution, taxonomy, cells and ecology — the diversity of life and how it all connects.",
    repo: "life-everything",
    line: "everything",
    integrated: false,
    statusZh: "soon",
    statusEn: "soon",
    tagsZh: ["演化", "分类学", "细胞", "生态"],
    tagsEn: ["Evolution", "Taxonomy", "Cells", "Ecology"],
  },
  {
    key: "physics",
    emoji: "⚛️",
    zh: "万物物理",
    en: "Physics of Everything",
    subZh: "万物之理",
    subEn: "The Order of All Things",
    descZh: "从基本定律、常数到关键实验与物理学家，看见支配宇宙运行的简洁秩序。",
    descEn: "Laws, constants, landmark experiments and physicists — the elegant order governing the universe.",
    repo: "physics-everything",
    line: "everything",
    integrated: false,
    statusZh: "soon",
    statusEn: "soon",
    tagsZh: ["定律", "常数", "实验", "物理学家"],
    tagsEn: ["Laws", "Constants", "Experiments", "Physicists"],
  },
  {
    key: "chem",
    emoji: "🧪",
    zh: "万物化学",
    en: "Chemistry of Everything",
    subZh: "物质之变",
    subEn: "The Transformations of Matter",
    descZh: "从元素、化学反应到材料与化学家，理解物质如何组合、分解与转化。",
    descEn: "Elements, reactions, materials and chemists — how matter combines, breaks apart and transforms.",
    repo: "chem-everything",
    line: "everything",
    integrated: false,
    statusZh: "soon",
    statusEn: "soon",
    tagsZh: ["元素", "反应", "材料", "化学家"],
    tagsEn: ["Elements", "Reactions", "Materials", "Chemists"],
  },
];

export function statusLabel(
  p: Project,
  lang: "zh" | "en",
): string {
  const key = lang === "zh" ? p.statusZh : p.statusEn;
  const map: Record<string, string> = {
    online: lang === "zh" ? "已上线" : "Online",
    first: lang === "zh" ? "系列首作" : "First Work",
    soon: lang === "zh" ? "敬请期待" : "Coming Soon",
    wip: lang === "zh" ? "接入中" : "Integrating",
  };
  return map[key] || key;
}
