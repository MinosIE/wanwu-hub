import type { SubjectConfig, SubjectItem, Sub } from "../subjectKit";

/* ---------- 完整元素周期表数据（118 个元素） ---------- */
const CAT_ZH: Record<string, string> = {
  alkali: "碱金属",
  alkaline: "碱土金属",
  transition: "过渡金属",
  post: "主族金属",
  metalloid: "类金属",
  nonmetal: "非金属",
  halogen: "卤素",
  noble: "稀有气体",
  lanthanide: "镧系",
  actinide: "锕系",
  unknown: "人工合成",
};

/** 分类英文名（供 EN 模式的一句话与导出 JSON 使用）。 */
const CAT_EN: Record<string, string> = {
  alkali: "Alkali metal",
  alkaline: "Alkaline earth metal",
  transition: "Transition metal",
  post: "Post-transition metal",
  metalloid: "Metalloid",
  nonmetal: "Nonmetal",
  halogen: "Halogen",
  noble: "Noble gas",
  lanthanide: "Lanthanide",
  actinide: "Actinide",
  unknown: "Synthesized",
};

/** RAW 第 9 项备注的英文版，按元素符号对应；缺失时回退英文分类名。 */
const NOTE_EN: Record<string, string> = {
  C: "Backbone of organic chemistry; diamond and graphite are allotropes",
  N: "Main component of air; part of proteins and nucleic acids",
  O: "Supports respiration and combustion; most abundant in the crust",
  F: "The most electronegative element",
  Ne: "Glows in neon signs",
  Na: "Reactive metal; forms table salt with chlorine",
  Mg: "Burns with a bright white flame; centre of chlorophyll",
  Al: "Most abundant metal in the crust",
  Si: "Foundation of the semiconductor industry",
  P: "Present in ATP and DNA",
  S: "Yellow solid, used to make sulfuric acid",
  Cl: "Yellow-green gas, a strong oxidizer",
  K: "Maintains nerve and muscle function",
  Ca: "Main mineral of bones and teeth",
  Ti: "Strong and corrosion-resistant",
  Cr: "Key ingredient of stainless steel",
  Fe: "Core of haemoglobin and of steel",
  Cu: "Excellent conductor, used since antiquity",
  Zn: "Galvanizing against rust; battery anode",
  As: "Toxic",
  Br: "Liquid at room temperature",
  Tc: "The first artificially produced element",
  Ag: "Best conductor of heat and electricity",
  I: "Component of thyroid hormones",
  W: "Lamp-filament metal, very high melting point",
  Os: "Densest metal",
  Pt: "Precious-metal catalyst",
  Au: "Corrosion-resistant precious metal, extremely malleable",
  Hg: "Metal liquid at room temperature",
  Pb: "Toxic heavy metal",
  Po: "Radioactive",
  At: "Radioactive and exceedingly rare",
  Rn: "Radioactive gas",
  Nd: "Used in powerful magnets",
  Pm: "Radioactive",
  Fr: "The most radioactive alkali metal",
  Ra: "Radioactive; once used in luminous paint",
  U: "Nuclear fuel, at the heart of atomic energy",
  Pu: "Reactor and weapons material",
};

// [z, 符号, 中文名, 英文名, 分类, 周期, 族, 相对原子质量, 备注?]
type RawEl = [
  number,
  string,
  string,
  string,
  string,
  number,
  number,
  string,
  string?,
];
const RAW: RawEl[] = [
  [1, "H", "氢", "Hydrogen", "nonmetal", 1, 1, "1.008"],
  [2, "He", "氦", "Helium", "noble", 1, 18, "4.003"],
  [3, "Li", "锂", "Lithium", "alkali", 2, 1, "6.941"],
  [4, "Be", "铍", "Beryllium", "alkaline", 2, 2, "9.012"],
  [5, "B", "硼", "Boron", "metalloid", 2, 13, "10.81"],
  [
    6,
    "C",
    "碳",
    "Carbon",
    "nonmetal",
    2,
    14,
    "12.01",
    "有机化学骨架，金刚石/石墨等为同素异形体",
  ],
  [
    7,
    "N",
    "氮",
    "Nitrogen",
    "nonmetal",
    2,
    15,
    "14.01",
    "空气主要成分，蛋白质与核酸的组成元素",
  ],
  [
    8,
    "O",
    "氧",
    "Oxygen",
    "nonmetal",
    2,
    16,
    "16.00",
    "支持呼吸与燃烧，地壳含量最高",
  ],
  [9, "F", "氟", "Fluorine", "halogen", 2, 17, "19.00", "非金属性最强的元素"],
  [10, "Ne", "氖", "Neon", "noble", 2, 18, "20.18", "霓虹灯发光气体"],
  [11, "Na", "钠", "Sodium", "alkali", 3, 1, "22.99", "活泼金属，与氯形成食盐"],
  [
    12,
    "Mg",
    "镁",
    "Magnesium",
    "alkaline",
    3,
    2,
    "24.31",
    "燃烧发白光，叶绿素中心原子",
  ],
  [13, "Al", "铝", "Aluminum", "post", 3, 13, "26.98", "地壳含量最高的金属"],
  [14, "Si", "硅", "Silicon", "metalloid", 3, 14, "28.09", "半导体工业基础"],
  [
    15,
    "P",
    "磷",
    "Phosphorus",
    "nonmetal",
    3,
    15,
    "30.97",
    "存在于 ATP 与 DNA",
  ],
  [16, "S", "硫", "Sulfur", "nonmetal", 3, 16, "32.06", "黄色固体，用于制硫酸"],
  [
    17,
    "Cl",
    "氯",
    "Chlorine",
    "halogen",
    3,
    17,
    "35.45",
    "黄绿色气体，强氧化性",
  ],
  [18, "Ar", "氩", "Argon", "noble", 3, 18, "39.95"],
  [19, "K", "钾", "Potassium", "alkali", 4, 1, "39.10", "维持神经与肌肉功能"],
  [20, "Ca", "钙", "Calcium", "alkaline", 4, 2, "40.08", "骨骼与牙齿主要成分"],
  [21, "Sc", "钪", "Scandium", "transition", 4, 3, "44.96"],
  [22, "Ti", "钛", "Titanium", "transition", 4, 4, "47.87", "强度高、耐腐蚀"],
  [23, "V", "钒", "Vanadium", "transition", 4, 5, "50.94"],
  [24, "Cr", "铬", "Chromium", "transition", 4, 6, "52.00", "不锈钢关键成分"],
  [25, "Mn", "锰", "Manganese", "transition", 4, 7, "54.94"],
  [26, "Fe", "铁", "Iron", "transition", 4, 8, "55.85", "血红蛋白与钢的核心"],
  [27, "Co", "钴", "Cobalt", "transition", 4, 9, "58.93"],
  [28, "Ni", "镍", "Nickel", "transition", 4, 10, "58.69"],
  [
    29,
    "Cu",
    "铜",
    "Copper",
    "transition",
    4,
    11,
    "63.55",
    "优良导体，古代即使用",
  ],
  [30, "Zn", "锌", "Zinc", "transition", 4, 12, "65.38", "镀锌防锈，电池负极"],
  [31, "Ga", "镓", "Gallium", "post", 4, 13, "69.72"],
  [32, "Ge", "锗", "Germanium", "metalloid", 4, 14, "72.63"],
  [33, "As", "砷", "Arsenic", "metalloid", 4, 15, "74.92", "有毒性"],
  [34, "Se", "硒", "Selenium", "nonmetal", 4, 16, "78.97"],
  [35, "Br", "溴", "Bromine", "halogen", 4, 17, "79.90", "常温下为液体"],
  [36, "Kr", "氪", "Krypton", "noble", 4, 18, "83.80"],
  [37, "Rb", "铷", "Rubidium", "alkali", 5, 1, "85.47"],
  [38, "Sr", "锶", "Strontium", "alkaline", 5, 2, "87.62"],
  [39, "Y", "钇", "Yttrium", "transition", 5, 3, "88.91"],
  [40, "Zr", "锆", "Zirconium", "transition", 5, 4, "91.22"],
  [41, "Nb", "铌", "Niobium", "transition", 5, 5, "92.91"],
  [42, "Mo", "钼", "Molybdenum", "transition", 5, 6, "95.95"],
  [43, "Tc", "锝", "Technetium", "transition", 5, 7, "98", "首个人工合成元素"],
  [44, "Ru", "钌", "Ruthenium", "transition", 5, 8, "101.1"],
  [45, "Rh", "铑", "Rhodium", "transition", 5, 9, "102.9"],
  [46, "Pd", "钯", "Palladium", "transition", 5, 10, "106.4"],
  [47, "Ag", "银", "Silver", "transition", 5, 11, "107.9", "导电导热最佳"],
  [48, "Cd", "镉", "Cadmium", "transition", 5, 12, "112.4"],
  [49, "In", "铟", "Indium", "post", 5, 13, "114.8"],
  [50, "Sn", "锡", "Tin", "post", 5, 14, "118.7"],
  [51, "Sb", "锑", "Antimony", "metalloid", 5, 15, "121.8"],
  [52, "Te", "碲", "Tellurium", "metalloid", 5, 16, "127.6"],
  [53, "I", "碘", "Iodine", "halogen", 5, 17, "126.9", "甲状腺激素成分"],
  [54, "Xe", "氙", "Xenon", "noble", 5, 18, "131.3"],
  [55, "Cs", "铯", "Cesium", "alkali", 6, 1, "132.9"],
  [56, "Ba", "钡", "Barium", "alkaline", 6, 2, "137.3"],
  [72, "Hf", "铪", "Hafnium", "transition", 6, 4, "178.5"],
  [73, "Ta", "钽", "Tantalum", "transition", 6, 5, "180.9"],
  [74, "W", "钨", "Tungsten", "transition", 6, 6, "183.8", "灯丝材料，熔点高"],
  [75, "Re", "铼", "Rhenium", "transition", 6, 7, "186.2"],
  [76, "Os", "锇", "Osmium", "transition", 6, 8, "190.2", "密度最大的金属"],
  [77, "Ir", "铱", "Iridium", "transition", 6, 9, "192.2"],
  [78, "Pt", "铂", "Platinum", "transition", 6, 10, "195.1", "贵金属催化剂"],
  [
    79,
    "Au",
    "金",
    "Gold",
    "transition",
    6,
    11,
    "197.0",
    "稳定贵金属，延展性极佳",
  ],
  [80, "Hg", "汞", "Mercury", "transition", 6, 12, "200.6", "常温下为液体金属"],
  [81, "Tl", "铊", "Thallium", "post", 6, 13, "204.4"],
  [82, "Pb", "铅", "Lead", "post", 6, 14, "207.2", "有毒重金属"],
  [83, "Bi", "铋", "Bismuth", "post", 6, 15, "209.0"],
  [84, "Po", "钋", "Polonium", "post", 6, 16, "209", "放射性"],
  [85, "At", "砹", "Astatine", "halogen", 6, 17, "210", "极稀有放射性"],
  [86, "Rn", "氡", "Radon", "noble", 6, 18, "222", "放射性气体"],
  [57, "La", "镧", "Lanthanum", "lanthanide", 6, 3, "138.9"],
  [58, "Ce", "铈", "Cerium", "lanthanide", 6, 3, "140.1"],
  [59, "Pr", "镨", "Praseodymium", "lanthanide", 6, 3, "140.9"],
  [60, "Nd", "钕", "Neodymium", "lanthanide", 6, 3, "144.2", "强磁体材料"],
  [61, "Pm", "钷", "Promethium", "lanthanide", 6, 3, "145", "放射性"],
  [62, "Sm", "钐", "Samarium", "lanthanide", 6, 3, "150.4"],
  [63, "Eu", "铕", "Europium", "lanthanide", 6, 3, "152.0"],
  [64, "Gd", "钆", "Gadolinium", "lanthanide", 6, 3, "157.3"],
  [65, "Tb", "铽", "Terbium", "lanthanide", 6, 3, "158.9"],
  [66, "Dy", "镝", "Dysprosium", "lanthanide", 6, 3, "162.5"],
  [67, "Ho", "钬", "Holmium", "lanthanide", 6, 3, "164.9"],
  [68, "Er", "铒", "Erbium", "lanthanide", 6, 3, "167.3"],
  [69, "Tm", "铥", "Thulium", "lanthanide", 6, 3, "168.9"],
  [70, "Yb", "镱", "Ytterbium", "lanthanide", 6, 3, "173.0"],
  [71, "Lu", "镥", "Lutetium", "lanthanide", 6, 3, "175.0"],
  [87, "Fr", "钫", "Francium", "alkali", 7, 1, "223", "放射性最强的碱金属"],
  [88, "Ra", "镭", "Radium", "alkaline", 7, 2, "226", "放射性，曾用于夜光"],
  [104, "Rf", "𬬻", "Rutherfordium", "transition", 7, 4, "267"],
  [105, "Db", "𬭊", "Dubnium", "transition", 7, 5, "268"],
  [106, "Sg", "𬭳", "Seaborgium", "transition", 7, 6, "269"],
  [107, "Bh", "𬭛", "Bohrium", "transition", 7, 7, "270"],
  [108, "Hs", "𬭶", "Hassium", "transition", 7, 8, "269"],
  [109, "Mt", "鿏", "Meitnerium", "transition", 7, 9, "278"],
  [110, "Ds", "𫟼", "Darmstadtium", "transition", 7, 10, "281"],
  [111, "Rg", "𬬭", "Roentgenium", "transition", 7, 11, "282"],
  [112, "Cn", "鿔", "Copernicium", "transition", 7, 12, "285"],
  [113, "Nh", "鿭", "Nihonium", "unknown", 7, 13, "286"],
  [114, "Fl", "𫓧", "Flerovium", "unknown", 7, 14, "289"],
  [115, "Mc", "镆", "Moscovium", "unknown", 7, 15, "290"],
  [116, "Lv", "𫟷", "Livermorium", "unknown", 7, 16, "293"],
  [117, "Ts", "鿬", "Tennessine", "halogen", 7, 17, "294"],
  [118, "Og", "鿫", "Oganesson", "noble", 7, 18, "294"],
  [89, "Ac", "锕", "Actinium", "actinide", 7, 3, "227"],
  [90, "Th", "钍", "Thorium", "actinide", 7, 3, "232.0"],
  [91, "Pa", "镤", "Protactinium", "actinide", 7, 3, "231.0"],
  [92, "U", "铀", "Uranium", "actinide", 7, 3, "238.0", "核燃料，原子能核心"],
  [93, "Np", "镎", "Neptunium", "actinide", 7, 3, "237"],
  [94, "Pu", "钚", "Plutonium", "actinide", 7, 3, "244", "核反应堆/武器材料"],
  [95, "Am", "镅", "Americium", "actinide", 7, 3, "243"],
  [96, "Cm", "锔", "Curium", "actinide", 7, 3, "247"],
  [97, "Bk", "锫", "Berkelium", "actinide", 7, 3, "247"],
  [98, "Cf", "锎", "Californium", "actinide", 7, 3, "251"],
  [99, "Es", "锿", "Einsteinium", "actinide", 7, 3, "252"],
  [100, "Fm", "镄", "Fermium", "actinide", 7, 3, "257"],
  [101, "Md", "钔", "Mendelevium", "actinide", 7, 3, "258"],
  [102, "No", "锘", "Nobelium", "actinide", 7, 3, "259"],
  [103, "Lr", "铹", "Lawrencium", "actinide", 7, 3, "262"],
];

/** 按构造原理（s²p⁶d¹⁰f¹⁴）近似计算各电子层容纳数，返回 [K, L, M, ...]。 */
function shellsFor(z: number): number[] {
  // 填充顺序（主量子数 n，该亚层容量）：1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p
  //                                        6s 4f 5d 6p 7s 5f 6d 7p
  const ORDER: [number, number][] = [
    [1, 2],
    [2, 2],
    [2, 6],
    [3, 2],
    [3, 6],
    [4, 2],
    [3, 10],
    [4, 6],
    [5, 2],
    [4, 10],
    [5, 6],
    [6, 2],
    [4, 14],
    [5, 10],
    [6, 6],
    [7, 2],
    [5, 14],
    [6, 10],
    [7, 6],
  ];
  const shells: number[] = [];
  let left = z;
  for (const [n, cap] of ORDER) {
    if (left <= 0) break;
    const take = Math.min(cap, left);
    shells[n - 1] = (shells[n - 1] ?? 0) + take;
    left -= take;
  }
  return shells.map((v) => v ?? 0);
}

/** 生成原子结构示意图（玻尔模型：原子核 + 电子层 + 逐层电子），供详情弹层 figure 使用。 */
function atomFigure(sym: string, z: number): string {
  const shells = shellsFor(z);
  const cx = 170;
  const cy = 150;
  const k = shells.length;
  const rMin = 44;
  const rMax = 128;
  const radius = (i: number) =>
    k <= 1 ? rMin : rMin + ((rMax - rMin) * i) / (k - 1);
  const rings = shells
    .map(
      (_, i) => `<circle cx="${cx}" cy="${cy}" r="${radius(i).toFixed(1)}"/>`,
    )
    .join("");
  let dots = "";
  shells.forEach((cnt, i) => {
    const r = radius(i);
    for (let j = 0; j < cnt; j++) {
      const a = -Math.PI / 2 + (2 * Math.PI * j) / cnt;
      const x = (cx + r * Math.cos(a)).toFixed(1);
      const y = (cy + r * Math.sin(a)).toFixed(1);
      dots += `<circle cx="${x}" cy="${y}" r="4"/>`;
    }
  });
  const dist = shells.join("·");
  return `<svg viewBox="0 0 340 300" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <g fill="none" stroke="currentColor" stroke-opacity="0.35">${rings}</g>
  <g fill="#3b82f6">${dots}</g>
  <circle cx="${cx}" cy="${cy}" r="22" fill="#e5484d"/>
  <text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">${sym}</text>
  <text x="8" y="18" font-size="11" fill="currentColor">${sym} · Z=${z}</text>
  <text x="170" y="294" text-anchor="middle" font-size="11" fill="currentColor">电子层 ${dist}</text>
</svg>`;
}

function elToItem(e: RawEl): SubjectItem {
  const [z, sym, zh, en, cat, period, group, mass, note] = e;
  const isLan = cat === "lanthanide";
  const isAct = cat === "actinide";
  const row = isLan ? 9 : isAct ? 10 : period;
  const col = isLan ? 3 + (z - 57) : isAct ? 3 + (z - 89) : group;
  const catZh = CAT_ZH[cat] ?? cat;
  const catEn = CAT_EN[cat] ?? cat;
  return {
    id: "el-" + sym.toLowerCase(),
    term: { zh, en },
    value: { zh: mass, en: mass },
    oneLiner: {
      zh: note ?? `第${period}周期 · ${catZh}`,
      en: NOTE_EN[sym] ?? `Period ${period} · ${catEn}`,
    },
    detail: {
      zh: `${zh}（${en}），原子序数 ${z}，相对原子质量约 ${mass}，属于${catZh}。`,
      en: `${en} (Z=${z}), relative atomic mass ≈ ${mass}, ${cat}.`,
    },
    tags: [{ zh: catZh, en: cat }],
    figure: atomFigure(sym, z),
    pt: { row, col, symbol: sym, z, cat, mass },
  };
}

const periodicItems: SubjectItem[] = RAW.map(elToItem);

export const chemData: Omit<SubjectConfig, "rootClass" | "accent"> = {
  heroTitle: { zh: "万物化学", en: "Chemistry of Everything" },
  intro: {
    zh: "从原子结构、元素周期表、常见实验方程式到材料与化学家，按高中化学脉络系统梳理核心知识。",
    en: "Atomic structure, the periodic table, common lab equations, materials and chemists — core high-school chemistry organized coherently.",
  },
  modules: [
    /* ===================== 核心概念 ===================== */
    {
      key: "concepts",
      icon: "🧪",
      title: { zh: "核心概念", en: "Core Concepts" },
      items: [
        {
          id: "atom",
          icon: "⚛️",
          term: { zh: "原子结构", en: "Atomic Structure" },
          level: 1,
          oneLiner: {
            zh: "原子由带正电的原子核与核外电子组成，电子排布决定化学性质。",
            en: "Atoms have a positive nucleus and orbiting electrons; electron arrangement decides chemistry.",
          },
          detail: {
            zh: "原子的账目要先算清：对一个中性原子，质子数 = 核电荷数 = 核外电子数 = 原子序数，质量数 = 质子数 + 中子数；一旦变成离子，电子数就不等于质子数（Na⁺ 少 1 个、Cl⁻ 多 1 个、O²⁻ 多 2 个），而质子数永远不变——质子数一变就成了另一种元素。质量几乎全集中在核里，电子质量只有质子的约一千八百三十六分之一，所以「相对原子质量约等于质量数」是好用而不完全精确的近似（精确值还受中子数与结合能影响，且查表得到的相对原子质量常不是整数，因为它是各同位素按丰度加权的结果）。化学性质由核外电子、尤其是最外层电子决定：第一层最多 2 个、第二层最多 8 个，各层容量按 2n² 递增，而最外层不超过 8 个（只有一层时不超过 2 个）就是所谓的稳定结构，因此原子一切成键动作都可以追溯到「想把最外层凑成 8」这一动机（见「化学键」）。同位素是最容易混淆的一对概念：质子数相同而中子数不同，如碳-12（6 中子）与碳-14（8 中子），化学性质几乎完全相同（因为电子排布一致），物理性质与质量不同，用途也不同——碳-14 有放射性、半衰期约 5730 年，用于考古测年；铀-235 可裂变，用作核燃料。模型本身也在演化：道尔顿把原子看成实心球（1803）→ 汤姆孙发现电子、提出「葡萄干面包」（1897）→ 卢瑟福用 α 粒子散射证明原子核存在（1911）→ 玻尔引入分层轨道（1913）→ 现代量子力学模型只用「概率云」描述电子出现的机会，不再画得出确定的轨道（人物见「约翰·道尔顿」）。初中层面只需抓两点：化学变化中原子不可再分、原子的种类与数目在反应前后不变，而这两点恰好就是质量守恒的微观解释。",
            en: "Do the bookkeeping first: for a neutral atom, protons = nuclear charge = extranuclear electrons = atomic number, and mass number = protons + neutrons. Once it becomes an ion the electron count no longer equals the proton count - Na+ has one fewer, Cl- one more, O2- two more - while the proton number never changes, since changing it would make the atom a different element. Nearly all mass sits in the nucleus; an electron weighs about one 1836th of a proton, so treating relative atomic mass as roughly the mass number is a useful but inexact shortcut, and the tabulated value is often not an integer because it averages the isotopes by abundance. Chemistry is decided by the electrons, above all the outermost ones: the first shell holds 2, the second 8, capacities grow as 2n squared, and a shell capped at 8 (2 if it is the only shell) counts as stable - which is why every bonding move can be traced to the urge to complete an octet (see Chemical Bonds). Isotopes are the pair most often muddled: same protons, different neutrons, as in carbon-12 with 6 and carbon-14 with 8. Their chemistry is virtually identical because the electron arrangement is the same, while mass, physical behaviour and use differ: carbon-14 is radioactive with a half-life near 5730 years and dates archaeological remains, uranium-235 fissions and fuels reactors. The model itself evolved: Dalton's solid sphere in 1803, Thomson's electron and plum pudding in 1897, Rutherford's scattering proof of a nucleus in 1911, Bohr's shells in 1913, and finally the quantum-mechanical picture that only gives the probability of finding an electron and can no longer draw a definite path. At secondary level keep just two ideas: atoms are indivisible in chemical change, and the kinds and numbers of atoms are unchanged by reaction - which is precisely the microscopic explanation of why mass is conserved.",
          },
          tags: [{ zh: "结构", en: "Structure" }],
        },
        {
          id: "periodic-law",
          icon: "📐",
          term: { zh: "元素周期律", en: "Periodic Law" },
          level: 1,
          oneLiner: {
            zh: "元素性质随原子序数呈周期性变化，周期表是其系统呈现。",
            en: "Element properties repeat periodically with atomic number; the table expresses this.",
          },
          detail: {
            zh: "周期律的内容是「元素的性质随原子序数（原核电荷数）的递增而呈周期性变化」，而造成这种周期性的原因是电子排布的周期性——每开一个新的周期就是多开一个新的电子层，每落进同一主族就是最外层电子数相同，所以「位、构、性」三个字必须连起来读：知道位置能推出结构，知道结构能预测性质。横向（同周期从左到右）：核电荷增多、半径收缩（见「原子半径趋势」），失电子变难，于是金属性减弱、非金属性增强，最高价氧化物对应水化物的碱性减弱而酸性增强，气态氢化物的稳定性增强。纵向（同主族从上到下）：电子层增多、半径增大，失电子变易，金属性增强（钠与水反应温和、钾则剧烈燃烧），氢化物的还原性增强。判断金属性或非金属性强弱要拿实验证据，不能只背结论：金属看单质与水或酸反应置换氢的难易、看最高价氧化物水化物的碱性强弱、看置换反应里谁把谁从溶液里换出来；非金属看与氢气化合的难易、看气态氢化物是否稳定。历史上有意思的一笔是门捷列夫 1869 年按相对原子质量排序时，为了保住化学性质的归类，把碲（约 127.6）排在碘（约 126.9）之前，明知与原子量递增的顺序相违却坚持不改——现代改按质子数排（碲 52、碘 53）后，这个矛盾自然消失，说明「性质由质子数与电子排布决定」比「性质由原子量决定」更根本；他也靠留下的空格预言了镓、钪、锗并给出了密度与熔点，这些元素被发现后与预言高度吻合，周期律才真正立住。到今天周期表排满 118 号，2016 年一次补齐了 113、115、117、118 四个新元素的命名。还有两处常考的特殊：氢的位置既可放第 IA 也可仿卤素放第 VIIA（它既可失电子也可得电子）；镧系与锕系被单列在表下方，是为了让表不至于宽得排不下。",
            en: "The periodic law says properties vary periodically with atomic (nuclear charge) number, and the cause is the periodicity of electron arrangement: each new period opens a new shell, each family shares an outer-electron count, so position, structure and property must be read as one chain - from position infer structure, from structure predict property (see Periods & Groups). Across a period, nuclear charge rises, radii shrink (see Atomic Radius Trend), electrons are harder to lose, so metallic character weakens, the hydroxide of the highest oxide turns from base to acid, and hydrides grow more stable. Down a group, shells multiply, radii grow, electrons come off more easily, so metallic character strengthens - sodium reacts gently with water while potassium ignites - and hydrides become stronger reducers. Rank metallic or non-metallic character on evidence, not recitation: for metals use how readily the element displaces hydrogen from water or acid, the base strength of the highest oxide's hydroxide, and who displaces whom from solution; for non-metals use how easily they combine with hydrogen and how stable the hydride is. The telling historical moment is Mendeleev in 1869: sorting by atomic weight, he placed tellurium (about 127.6) ahead of iodine (about 126.9) to preserve the chemical grouping, knowingly breaking the weight order - and when the table was re-sorted by proton number, 52 before 53, the contradiction vanished, showing that protons and electron arrangement, not weight, govern properties. His blank spaces predicted gallium, scandium and germanium with densities and melting points that matched the found elements, which is what finally convinced people. The table now reaches 118, with four names approved in one stroke in 2016 for elements 113, 115, 117 and 118. Two special cases keep appearing in exams: hydrogen may sit in group IA or be compared to group VIIA, since it can both lose and gain an electron; and the lanthanides and actinides are pulled out below so the table does not become impossibly wide.",
          },
          tags: [{ zh: "周期表", en: "Periodic" }],
        },
        {
          id: "bond",
          icon: "🔗",
          term: { zh: "化学键", en: "Chemical Bonds" },
          level: 1,
          oneLiner: {
            zh: "原子通过离子键、共价键或金属键结合成分子与晶体。",
            en: "Atoms join via ionic, covalent or metallic bonds.",
          },
          detail: {
            zh: "三种化学键的差别不在「强弱」而在「怎么把原子拉住」，所以判断与推理都要从机理出发。离子键靠阴阳离子的静电吸引，通常发生在活泼金属与活泼非金属之间（NaCl、K₂S），特征是一整类性质：熔点较高、硬而脆、固态不导电但熔融或溶于水后导电——最后这条正是「离子化合物」的判据，也是为什么检验一个化合物是离子还是共价要看熔融态是否导电。共价键靠共用电子对，有方向性与饱和性（一个电子对只服务两个原子核），因此分子有确定的形状；它又分极性共价键（H-Cl、C-O，电子对偏向电负性大的一方）与非极性共价键（H-H、Cl-Cl），键的极性叠加分子的几何形状才决定整个分子是否有极性：CO₂ 的两个 C=O 键都极性却因直线对称而整体非极性，SO₂ 因是折线形而整体极性，这也是「相似相溶」与沸点差异的根（见「分子间作用力与氢键」）。共价键还分原子晶体与分子晶体两条路：金刚石、二氧化硅里所有原子以共价键连成整块，所以硬度大、熔点极高（二氧化硅约 1700 ℃）；而氧气、干冰、碘这类分子内部强、分子之间只靠很弱的分子间作用力，所以熔沸点低、易升华——「共价键强」不等于「物质熔点高」，这是最常见的推理滑坡。金属键是金属阳离子浸在自由电子海里，无方向性也无饱和性，因此原子可以滑移而不中断结合（延展性）、电子可定向移动（导电）、自由电子导热并与光作用（金属光泽），且导电随温度升高而下降，与半导体相反（见「金属键」）。两条必须记住的跨界事实：一是离子化合物里完全可以含共价键，NaOH 的 O-H、Na₂SO₄ 的 S-O、NH₄Cl 的 N-H 都是共价键，而 Na⁺ 与 OH⁻ 之间是离子键；二是氢键不是化学键，它属于分子间作用，虽然比范德华力强得多，足以解释水的高沸点、冰的浮力与 DNA 双链的配对，但不能当作成键来处理（见「酸碱」里的 HF 与 NH₃）。",
            en: "The three bond types differ in how they hold atoms, not in strength, so every argument should start from the mechanism. Ionic bonding is electrostatic attraction between oppositely charged ions, typical of active metals with active non-metals (NaCl, K2S), and it comes as a bundle of properties: fairly high melting point, hard but brittle, non-conductive as a solid yet conductive when molten or dissolved - that last clause is the working test for an ionic compound, and the reason one asks whether the melt conducts rather than trusting a formula. Covalent bonding shares an electron pair, is directional and saturated, so molecules have definite shapes; it splits into polar covalent (H-Cl, C-O, the pair leaning to the more electronegative atom) and non-polar (H-H, Cl-Cl), and bond polarity only becomes molecular polarity once geometry is folded in: CO2 has two polar C=O bonds yet is non-polar overall because it is linear and symmetric, whereas bent SO2 is polar, which underlies like-dissolves-like and the boiling-point gaps (see Intermolecular Forces & Hydrogen Bonding). Covalent matter then forks into two architectures: in diamond and silica every atom is covalently welded into one giant solid, hence extreme hardness and melting points (silica near 1700 degrees), while oxygen, dry ice and iodine have strong insides and feeble outsides, so they melt and boil low and sublime readily - strong covalent bonds do not imply a high melting point, the slippiest inference in this chapter. Metallic bonding is cations in a sea of delocalised electrons, with neither direction nor saturation, which is why layers can slide without breaking cohesion (malleability), electrons can drift (conductivity), and electrons carry heat and reflect light; conductivity falls as temperature rises, opposite to semiconductors (see Metallic Bond). Two boundary facts to memorise: ionic compounds routinely contain covalent bonds - the O-H of NaOH, the S-O of Na2SO4, the N-H of NH4Cl are covalent while the counter-ion pairing is ionic; and a hydrogen bond is not a chemical bond but an intermolecular attraction, strong enough to explain the high boiling point of water, why ice floats and how DNA strands pair, yet never treated as bonding (see Acids & Bases for HF and NH3).",
          },
          tags: [{ zh: "成键", en: "Bonding" }],
        },
        {
          id: "acid-base",
          icon: "🧫",
          term: { zh: "酸碱", en: "Acids & Bases" },
          level: 2,
          oneLiner: {
            zh: "酸给出质子（H⁺），碱接受质子；pH 衡量溶液酸碱性。",
            en: "Acids donate protons (H⁺), bases accept them; pH measures acidity.",
          },
          detail: {
            zh: "酸碱的定义在课本里换了三次，每一次都是因为前一个解释不了某些现象。阿伦尼乌斯（1887）说酸是在水溶液里电离出氢离子、碱是电离出氢氧根的物质——好处是能直接连到电离与导电，坏处是离了水就失灵，也解释不了氨气与氯化氢气体相碰生成白烟这种没有氢氧根参与的质子转移。布朗斯特与劳里（1923）把定义放宽成「给出质子的是酸、接受质子的是碱」，于是一整套事实被打通：氨气显碱性是因为氮上有孤对电子接受质子，碳酸氢根、水、氨基酸既能给又能接所以是两性的，中和反应不过是质子从酸传给碱（见「弱电解质的电离平衡」与「配位化合物」）。路易斯同年提出更宽的一层：酸是电子对的接受体、碱是电子对的给予体，这个定义把没有质子的反应也收进来，例如三氟化硼与氨的结合、一切金属离子与配体的配位（配位键正是路易斯酸碱反应的产物）。日常最要紧的辨析是「强弱」与「浓稀」是两套坐标：强弱看的是电离程度（能不能完全电离），浓稀看的是溶质的量，所以浓醋酸是弱酸、极稀的盐酸仍是强酸；强酸溶液的 pH 也不一定低（很稀时接近 7），弱酸也不一定腐蚀性就弱（醋酸能溶掉水垢）。pH 是对数刻度，每差 1 个单位氢离子浓度差 10 倍（见「pH 与酸碱度」与「酸碱指示剂与 pH」）。另外三条边界要划清：一、中和反应的定义是酸与碱作用生成盐和水，但并非所有这类反应都只见盐与水（碳酸钠遇酸放气，见「碳酸钠与盐酸」）；二、酸不只和碱反应，还会与金属、金属氧化物、某些盐反应，只有「与碱作用」那一条才叫中和；三、盐溶液不一定中性——碳酸钠、次氯酸钠因水解显碱性（所以热纯碱水去油污更好），氯化铵、硫酸铝因水解显酸性，这正是「盐类水解」的生活出口。生活与工业里的应用串成一串：胃酸是盐酸（用氢氧化铝中和，见「胃酸中和（胃药）」），食醋是乙酸，发酵面食靠纯碱或小苏打中和产生的酸，土壤过酸用熟石灰改良（见「生石灰遇水」），工业废水中和要算药剂成本而不用最贵的氢氧化钠。",
            en: "The definition of acid and base has been replaced three times, each because the previous one could not cover some fact. Arrhenius (1887) said an acid yields hydrogen ions in aqueous solution and a base yields hydroxide ions - convenient because it links straight to ionisation and conduction, but useless away from water and unable to explain the white smoke when ammonia gas meets hydrogen chloride gas, a proton transfer with no hydroxide involved. Brønsted and Lowry (1923) relaxed it to donor and acceptor of a proton, which unlocked a whole set: ammonia is basic because its nitrogen carries a lone pair that takes the proton, bicarbonate, water and amino acids are amphoteric because they can both give and take, and neutralisation is nothing but handing a proton from acid to base (see Ionization Equilibrium and Coordination Compounds). Lewis proposed the widest net the same year: an acid accepts an electron pair, a base donates one, so even proton-free reactions join in - boron trifluoride binding ammonia, and every metal ion complexing a ligand, since a coordinate bond is exactly a Lewis acid-base adduct. The distinction that matters daily is that strength and concentration are separate axes: strength measures how completely a substance ionises, concentration how much is dissolved, so glacial acetic is a weak acid and a very dilute hydrochloric is still a strong one, a strong-acid solution need not have low pH if badly diluted, and a weak acid still dissolves limescale. pH is logarithmic - one unit is ten times the hydrogen ion concentration (see pH & Acidity and Indicators and pH). Draw three more borders: neutralisation is defined as acid plus base giving salt and water, yet not every such reaction shows only salt and water (carbonate with acid fizzes, see Na₂CO₃ + HCl); acids also attack metals, basic oxides and some salts, and only the reaction with a base counts as neutralisation; and a salt solution need not be neutral - sodium carbonate and sodium hypochlorite are alkaline through hydrolysis, which is why hot washing soda degreases better, while ammonium chloride and aluminium sulfate are acidic, the everyday exit of Salt Hydrolysis. The applications form one chain: stomach acid is hydrochloric, quieted with aluminium hydroxide (see Stomach-Acid Neutralization), vinegar is acetic acid, sour dough is neutralised by soda or bicarbonate, acid soil is treated with slaked lime (see CaO + Water), and wastewater treatment chooses reagents by cost rather than by strength.",
          },
          tags: [{ zh: "酸碱", en: "Acid-Base" }],
        },
        {
          id: "redox",
          icon: "🔋",
          term: { zh: "氧化还原反应", en: "Redox" },
          level: 2,
          oneLiner: {
            zh: "电子转移过程：升价被氧化，降价被还原。",
            en: "Electron transfer: oxidation raises oxidation state, reduction lowers it.",
          },
          detail: {
            zh: "氧化还原的判断标准在课本里升了三级，答题要按最高的那一级来：最初从「得氧失氧」入门（碳得到氧变成二氧化碳、被氧化；氧化铜失去氧变成铜、被还原），到「化合价升降」成为通用判据（有元素化合价变化的反应就是氧化还原反应），而本质是「电子的转移」（得失或偏移）。判据与本质一挂钩，整套术语就不再靠死背：化合价升高 = 失去电子 = 被氧化 = 该物质作还原剂 = 得到氧化产物，化合价降低 = 得到电子 = 被还原 = 该物质作氧化剂 = 得到还原产物；两行必须成对记忆，课堂口诀是「升失氧还、降得还氧」，其中最大的坑是把「氧化剂」与「被氧化」混用（氧化剂自己被还原）。守恒是这套体系的支点：氧化剂得到的电子总数必等于还原剂失去的电子总数，化合价升高总数必等于降低总数，所以未知产物与系数都能靠这个等式反推，这也是为什么「只写一半」的半反应必须配对（见「原电池」）。与四种基本反应类型的关系是必考点：置换反应一定是氧化还原（单质变化合物必然改价）；复分解反应一定不是（只是离子互换、无人改价）；化合与分解则要看有没有单质参加或生成——有单质的化合（碳燃烧）与生成单质的分解（电解水）是，而氧化钙遇水（见「生石灰遇水」）、碳酸钙分解成两种化合物就不是。常见的氧化剂有氧气、氯气、浓硫酸、硝酸、高锰酸钾、三价铁离子；常见还原剂有活泼金属、碳、氢气、一氧化碳、二氧化硫、碘离子、亚铁离子。判断氧化性强弱不靠背清单而靠实验：氧化剂的氧化性强于氧化产物（置换与「强者先行」的放电顺序都是这条的应用，见「电解池」）。同一元素不同价态各有归宿：「高价只具氧化性、低价只具还原性、中间价态两边转」——亚铁离子既能被氯气氧化成三价也能被锌还原成铁单质，所以铁的三种价态两两互变全靠氧化还原，也就是所谓的铁三角。归中与歧化是两个特殊方向：同种元素高价与低价相遇会向中间靠拢（二氧化硫与硫化氢生成硫），而一种价态在环境中自己分头升降就是歧化（氯气溶于水生成盐酸与次氯酸、过氧化氢分解，见「过氧化氢分解制氧气」）。最后，把氧化还原在空间上拆开的装置就是电化学：原电池让它在两个电极上分别发生、把化学能变电能，电解池反过来用电能强迫反应发生；而燃烧、腐蚀、冶炼、光合作用、呼吸本质上全是同一件事（见「金属的腐蚀与防护」）。",
            en: "The test for redox was upgraded three times, and answers should use the top level. One starts with gaining and losing oxygen (carbon gains oxygen and is oxidised, copper oxide loses oxygen and is reduced), moves to rising and falling oxidation number as the universal criterion, and rests finally on the essence, transfer or shift of electrons. Tie the criterion to the essence and the vocabulary stops being memorised: oxidation number rises = electrons lost = oxidised = the substance is the reducing agent = its oxidation product; oxidation number falls = electrons gained = reduced = the substance is the oxidising agent = its reduction product. Teach both lines together - rise-lose-oxidised-reducer, fall-gain-reduced-oxidiser - and watch for the classic swap, calling the oxidising agent the thing that is oxidised. Conservation is the pivot: electrons gained by the oxidiser must equal those lost by the reducer, so total rises equal total falls, which is how coefficients and unknown products are back-calculated by balancing and why half-reactions only exist in pairs (see Galvanic Cell). The link to the four basic types is guaranteed exam material: displacement is always redox, since an element becoming a compound must change valence; double decomposition never is, since ions merely exchange partners; combination and decomposition depend on whether an element is involved - carbon burning and water being electrolysed are, while calcium oxide meeting water (see CaO + Water) and carbonate splitting into two compounds are not. Familiar oxidisers: oxygen, chlorine, concentrated sulfuric acid, nitric acid, permanganate, iron(III). Familiar reducers: active metals, carbon, hydrogen, carbon monoxide, sulfur dioxide, iodide, iron(II). Judge oxidising strength by experiment, not lists: an oxidiser is stronger than its own oxidation product, the same rule that orders displacement and the discharge sequence (see Electrolytic Cell). Different valences of one element have different fates - highest only oxidises, lowest only reduces, intermediate does both, so iron(II) is oxidised by chlorine and reduced by zinc, which is the whole iron triangle (see Iron and Its Triangle). Two special directions are conproportionation, where high and low valences of one element converge (sulfur dioxide plus hydrogen sulfide gives sulfur), and disproportionation, where one valence splits (chlorine in water giving chloride and hypochlorite, hydrogen peroxide decomposing, see Oxygen from H₂O₂). Splitting redox across space is electrochemistry: a galvanic cell runs the two halves at two electrodes and hands over chemical energy as electricity, an electrolytic cell does the reverse; combustion, corrosion, smelting, photosynthesis and respiration are all the same transaction (see Metal Corrosion & Protection).",
          },
          tags: [{ zh: "反应", en: "Reactions" }],
        },
        {
          id: "equilibrium",
          icon: "⚖️",
          term: { zh: "化学平衡", en: "Chemical Equilibrium" },
          level: 2,
          oneLiner: {
            zh: "可逆反应正逆速率相等时，各物质浓度不再变化。",
            en: "When forward and reverse rates equal, concentrations stop changing.",
          },
          detail: {
            zh: "化学平衡的五个字可以拆成五句话：逆（研究对象必须是可逆反应）、等（正反应速率与逆反应速率相等）、动（动态平衡，反应从未停止，只是两方向速率相抵）、定（各组分浓度保持一定，不再随时间变化）、变（条件一改，平衡就被破坏并移到新位置）。判断「是否已达平衡」只有两类可靠依据：一是同一物质上「一正一逆」两个速率数值相等（注意必须换算成同一种物质再比，且方向相反，见「反应速率」）；二是某个原本在变的量停止改变，比如某组分浓度、颜色、体系温度。第二类要小心选变量：反应前后气体分子数不变的反应，如氢气与碘蒸气生成碘化氢，压强、气体总物质的量、平均摩尔质量都始终不变，因此它们「不变」完全不能作平衡标志（见「化学平衡状态」）。平衡常数 K 提供第三个视角：写出表达式时固体与纯液体（稀溶液中的水）不写入，K 只随温度变化，与浓度、压强、催化剂都无关，所以「加催化剂使 K 变大」「加压使 K 变大」都是错误说法；比较 Q 与 K 的大小则能直接指出移动方向（Q 小于 K 则正向进行）。勒夏特列原理的完整表述是「改变影响平衡的一个条件，平衡向能减弱这种改变的方向移动」，其中两个词是全部易错处：一是「减弱」不是「消除」，加压使体积收缩后新平衡下反应物浓度仍比原平衡大，只是比「瞬间压缩后的值」小；二是它只说方向不说程度，也不管速率。工业条件的选择因此往往不是「让平衡最优」，而是速率、平衡、成本、材料与安全四者的折中：合成氨放热、低温本应有利于平衡，但太低时速率几乎为零，所以取约 400 至 500 ℃、配合铁触媒与 10 至 30 兆帕，并用不断液化分离氨、循环未反应气体来绕过平衡限制（见「工业合成氨」）。学习时还要把四种平衡放在一起比较：化学平衡、电离平衡（弱电解质，见「弱电解质的电离平衡」）、水解平衡（盐类，见「盐类水解」）、溶解平衡（饱和溶液，见「溶液与溶解度」）——它们全都是动态平衡、都遵循勒夏特列原理，差别只在「谁在可逆地变」。",
            en: "Unpack the five marks of equilibrium: reversible (only reversible reactions qualify), equal (forward and reverse rates match), dynamic (nothing has stopped, the two directions merely cancel), fixed (composition holds constant in time), shifting (change one condition and the balance is broken and resettles). Only two kinds of evidence prove that equilibrium has been reached: two rates on the same substance, one forward and one reverse, numerically equal - convert to one species first and keep the directions opposite (see Reaction Rate) - or some quantity that had been changing stops changing, such as a concentration, a colour, a temperature. Choose that second quantity carefully: for a reaction with no change in gas molecules, such as hydrogen plus iodine vapour, pressure, total moles of gas and mean molar mass never move at all, so their constancy proves nothing (see Chemical Equilibrium). The constant K adds a third view: solids and pure liquids, including water in dilute solution, stay out of the expression; K varies with temperature alone, not with concentration, pressure or a catalyst, so claims that a catalyst or a squeeze raises K are wrong; comparing Q with K points directly at the direction, since Q below K means the forward reaction still has room. Le Chatelier reads in full: change one condition affecting an equilibrium and it shifts so as to weaken the change. Two words carry every trap. Weaken, not erase - after a compression the new equilibrium still has more reactant than the old one, only less than the instant after squeezing. And the principle gives direction only, never extent, and says nothing about speed. Industrial conditions therefore optimise over rate, equilibrium, cost, materials and safety rather than over yield alone: ammonia synthesis is exothermic so low temperature favours equilibrium, but at a crawl, hence about 400 to 500 degrees with an iron promoter at 10 to 30 megapascal, plus continuous condensation of ammonia and recycling of the unreacted gas to walk around the limit (see Ammonia Synthesis). Study the four equilibria side by side - chemical, ionic for weak electrolytes (see Ionization Equilibrium), hydrolytic for salts (see Salt Hydrolysis), and solubility for saturated solutions (see Solutions & Solubility) - all dynamic, all obedient to Le Chatelier, differing only in what is reversibly changing.",
          },
          tags: [{ zh: "平衡", en: "Equilibrium" }],
        },
        {
          id: "rate",
          icon: "⏱️",
          term: { zh: "反应速率", en: "Reaction Rate" },
          level: 2,
          oneLiner: {
            zh: "浓度、温度、催化剂与表面积都会影响反应快慢。",
            en: "Concentration, temperature, catalysts and surface area affect rate.",
          },
          detail: {
            zh: "速率的第一个坑是定义：v = 浓度变化除以时间，单位 mol/(L·min) 或 mol/(L·s)，而这里的浓度必须是可变的浓度，所以固体与纯液体不能用来表示速率（它们的「浓度」是常数）。同一个反应同一时刻用不同物质表示时，数值不等但严格成计量数之比，比如合成氨里 v(N₂):v(H₂):v(NH₃) = 1:3:2，因此比较两个实验中「哪个更快」必须先把两者换算成同一种物质、同一单位再比大小，直接比题目给的数字是最常见的失分点（见「化学反应速率」与「影响速率的因素」）。第二个坑是把速率与限度混为一谈：速率研究「多快到达」，平衡研究「能到什么程度」，催化剂能大幅加快到达但完全不改变平衡位置与转化率，因此「加催化剂使产率提高」是错的（见「化学平衡」）。碰撞理论给解释搭好框架：反应要发生必须碰撞、且要能量足够（越过活化能）且取向合适，这类碰撞叫有效碰撞；一切外因都能归到两件事之一——提高活化分子的百分数，或提高单位体积内活化分子的数目。升温与加催化剂走第一条路：升温使分子平均动能提高、能量达标的份额变大，加催化剂则是提供一条活化能更低的新路径（因此正逆反应速率同时加快，但吸热一侧加快得更多，这正是温度使平衡向吸热方向移动的原因，见「勒夏特列原理」）；增大浓度或压缩气体压强走第二条路：分子更挤、单位体积里的活化分子更多，碰撞更频繁，但活化分子的百分数不变。所以「压强」只对气体（或溶液中离子）有实质意义：恒容时充入不参与反应的惰性气体，总压上升但各反应物浓度未变，速率不变；恒压时充惰气，体积被撑大、浓度下降，速率反而减慢——同是「充惰气」，两种结果相反（见「影响速率的因素」与「化学平衡状态」）。内因永远优先：反应物本身的活泼性是第一位，钠与水剧烈、镁与热水明显、铁与水蒸气要在高温才进行。最后三个实用尺度：食品冷藏是把速率降下来（约每降 10 ℃ 速率减半上下）、面粉加酵母与工业用触媒是把速率提上去、而把块状磨成粉、鼓进过量空气则都是从接触面积与浓度下手。",
            en: "The first trap is the definition: v equals concentration change over time, in mol per litre per minute or second, and the quantity must be a concentration that can change, so solids and pure liquids cannot express a rate (theirs is a constant). At one instant different species give different numbers strictly in the ratio of their coefficients - for ammonia synthesis v(N2) to v(H2) to v(NH3) is 1 to 3 to 2 - so comparing two experiments means converting both to the same species and the same units first; racing the raw numbers from the question paper is the most common lost mark (see Factors Affecting Rate). The second trap is confusing rate with limit: rate asks how fast, equilibrium asks how far, and a catalyst speeds arrival without moving the equilibrium position or conversion, so 'a catalyst raises the yield' is wrong (see Chemical Equilibrium). Collision theory frames the explanation: reaction needs a collision, enough energy to clear the activation barrier, and the right orientation, and such impacts are called effective; every external factor reduces to one of two effects - raising the fraction of activated molecules, or raising their number per unit volume. Heating and catalysis take the first road: heat lifts the average kinetic energy so a larger share qualifies, while a catalyst opens a new path of lower activation energy, accelerating forward and reverse together but the endothermic side more, which is exactly why temperature pushes equilibrium toward the heat-absorbing direction (see Le Chatelier's Principle). Concentration and squeezed gas pressure take the second: molecules crowd, activated molecules per unit volume rise, collisions thicken, but the fraction stays put. Hence pressure only really bites on gases or ions in solution: adding inert gas at constant volume raises total pressure yet leaves every reactant concentration untouched, so the rate is unchanged, while adding it at constant pressure inflates the volume, dilutes everything and slows the reaction - same inert gas, opposite outcome (see Factors Affecting Rate and Chemical Equilibrium). Nature always outranks nurture: the intrinsic activity of the reactants comes first, so sodium rips through cold water, magnesium works visibly only in hot water, and iron needs steam at red heat. Three everyday scales to end on: refrigeration slows things (roughly halving the rate per 10 degrees down), yeast in dough and promoters in industry speed things up, and grinding lumps to powder or forcing in excess air attack surface area and concentration.",
          },
          tags: [{ zh: "动力学", en: "Kinetics" }],
        },
        {
          id: "thermo",
          icon: "🌡️",
          term: { zh: "化学热力学", en: "Chemical Thermodynamics" },
          level: 3,
          oneLiner: {
            zh: "用焓、熵、吉布斯自由能判断反应能否自发。",
            en: "Enthalpy, entropy and Gibbs free energy decide spontaneity.",
          },
          detail: {
            zh: "这条公式把「反应能不能自己发生」变成了一个算术题：ΔG = ΔH − TΔS，ΔG 小于 0 时反应在该温度下可自发进行，大于 0 则不自发（需要持续供给能量才能推进），等于 0 就是平衡态。按 ΔH 与 ΔS 的正负可以排出四种情形，这是判断题最省力的路子：放热且熵增（ΔH 小于 0、ΔS 大于 0）在任何温度都自发；吸热且熵减在任何温度都不自发；放热且熵减只在低温自发；吸热且熵增只在高温自发，后两种的转折温度就是 ΔG 为零处，即 T = ΔH/ΔS（开尔文）。两个必须分清的概念。「自发」只回答方向与可能性，不回答快慢：常温常压下金刚石转变成石墨的 ΔG 是负的、也确实略放热（约每摩尔放 1.9 kJ，说明石墨能量更低更稳定），但速率低到可以忽略，所以钻石并不会「马上变黑」；反之速率再快也不代表能自发，这就是热力学与动力学的分工（见「反应速率」与「化学平衡」）。「放热」也不能等同于「自发」：氢氧化钡晶体与氯化铵固体搅拌后自行反应、烧杯壁温度能掉二十多度而使杯底与玻璃片之间的水结冰，这是吸热却自发的著名演示——因为产生了大量气体分子、熵增得厉害，TΔS 这一项超过了 ΔH；反过来冰融化也吸热却在室温自发。熵的粗略判据是「混乱度」：气态远大于液态大于固态，反应里气体分子数增加通常就是熵增（每摩尔量级上气态比液态高约 80 至 140 J/(mol·K)），所以分解产气的反应普遍熵增。热化学的另一半是焓：ΔH 只能由路径算出而不能直接测绝对值，常见两条路一条走键能（断键吸热减去成键放热）、一条走生成焓（产物减反应物），两条的相减方向正好相反，弄混就全错（见「反应热与焓变」与「盖斯定律」）；规定稳定单质的标准生成焓为零，是所有计算的基准点。最后是两条边界：热力学第一定律说能量守恒，所以永动机不可能；热力学第二定律说孤立系统的熵不减，给了时间以方向；第三定律则指出绝对零度不可达到，而 0 K 时完美晶体的熵取零，这就是「标准熵」有绝对数值的原因。",
            en: "One formula turns whether a reaction can run by itself into arithmetic: with G = H - TS, a negative G means spontaneous at that temperature, positive means non-spontaneous and needing a continuous energy supply, and zero is equilibrium. Sorting the signs of H and S gives the four cases that settle most judgement questions: exothermic with entropy rising is spontaneous at any temperature; endothermic with entropy falling never is; exothermic with entropy falling works only at low temperature; endothermic with entropy rising only at high temperature, and the turning point for the last two is where G vanishes, T = H over S in kelvin. Two ideas must stay separate. Spontaneous answers direction and possibility, never speed: at room temperature diamond converting to graphite has negative G and even releases a little heat (about 1.9 kJ per mole, which is the quantitative statement that graphite is the stabler form), yet the rate is so slow that diamonds do not turn to soot, while a fast rate never proves spontaneity - this is the division of labour between thermodynamics and kinetics (see Reaction Rate and Chemical Equilibrium). Exothermic does not equal spontaneous either: stirring barium hydroxide octahydrate crystals with solid ammonium chloride is endothermic yet self-running, dropping the temperature by more than twenty degrees and freezing the water film that can then lift a board off the beaker, because so many free molecules are created that the TS term outweighs H. Melting ice is likewise endothermic and spontaneous at room temperature. Entropy is roughly disorder: gas far exceeds liquid exceeds solid, and any reaction that multiplies gas molecules usually gains entropy (some 80 to 140 J per mole kelvin more in the gas phase), which is why gas-releasing decompositions tend to be entropy-driven. The other half of thermochemistry is enthalpy: H can only be computed along a path, never measured absolutely, and the two standard paths - bond energies, where breaking absorbs and forming releases, and formation enthalpies, products minus reactants - subtract in opposite directions, a mix-up that ruins the whole sum (see Enthalpy Change and Hess's Law); stable elements are defined to have zero standard formation enthalpy, the datum everything hangs from. Close with the boundary laws: the first law conserves energy, so perpetual motion is impossible; the second never lets an isolated system's entropy fall, which gives time its arrow; the third says absolute zero is unreachable, and assigns zero entropy to a perfect crystal there, which is why standard entropies have absolute values rather than only differences.",
          },
          tags: [{ zh: "热力学", en: "Thermodynamics" }],
        },
        {
          id: "coordination",
          icon: "🌀",
          term: { zh: "配位化合物", en: "Coordination Compounds" },
          level: 3,
          oneLiner: {
            zh: "中心金属离子与配体通过配位键形成的复杂结构。",
            en: "Central metal ions bonded to ligands via coordinate bonds.",
          },
          detail: {
            zh: "配位键是一种特殊的共价键：共用的一对电子不是双方各出一个，而是由一方单独提供孤对电子、另一方拿出空轨道接受，写成 A→B 的箭头正是为了标明这种「单向捐赠」关系。按路易斯定义，这就是路易斯碱（电子对给予体）与路易斯酸（电子对接受体）的结合（见「酸碱」）。一个配位化合物要分内界与外界：方括号里是中心离子加配体构成的内界、括号外是可自由电离的外界，如硫酸四氨合铜里，硫酸根在外界、加水即电离，而氨分子在内界、不易脱离。中心离子的空轨道数决定配位数，最常见的是 4 与 6：四氨合铜(II) 离子是 4、六氰合铁(III) 离子是 6，配体的个数与几何形状（平面正方形或正八面体）也由中心离子与配体共同决定。颜色是最直观的线索，而且由「中心离子 + 配体」共同决定，不能只记离子：硫酸铜溶液浅蓝是水合铜离子的颜色，滴入氨水变成深蓝是生成了四氨合铜(II)，无水硫酸铜是白色、遇水变蓝所以能用来检验少量水（见「常见物质的俗名与主要成分」）。三条必须记住的「显色而不沉淀」：硫氰化钾遇三价铁离子立刻变血红色，这是检验铁离子最灵敏的办法，若先加铁粉使三价还原为二价则颜色消失（见「常见离子的检验」）；银离子里加氨水先生成白色沉淀、继续加沉淀溶解，是因为生成了更稳定的二氨合银(I) 离子，同理氯化银不溶于水却溶于氨水（见「氯化钡检验硫酸根」里的分层思路）；苯酚遇浓溴水出白沉、遇三价铁显紫色则是另一类显色。配位化学在生物与工业里的分量远超课本篇幅：血红素的铁、叶绿素的镁、维生素 B₁₂ 的钴、固氮酶的铁钼中心都是配位结构，人体靠这些金属的配位环境搬运氧气、捕获光能；摄影与银回收靠的是卤化银感光后被硫代硫酸钠（海波）溶解为可溶的银配离子（定影），现代电子废弃物提银提金也用氰化物或硫脲把金属络进溶液（见「电子废弃物提金（城市矿山）」）；医药上顺铂是铂的配位化合物，只有两个氯与两个氨呈顺式排列时抗癌有效、反式异构体无效，这是「结构决定性质」最直白的例证；含铬废水的三价铬、水垢与重金属中毒的解救靠乙二胺四乙酸二钠钙这类螯合剂把金属离子整团锁住（多个配位位点形成环状结构叫螯合，比单齿配体稳定得多）。最后一点容易忽略：配位平衡也会移动，所以「沉淀溶解」与「配合生成」常常是竞争关系，谁能把金属离子抓得更牢取决于平衡常数的大小（见「化学平衡」）。",
            en: "A coordinate bond is covalent bonding with one-sided authorship: the shared pair comes entirely from one partner donating a lone pair while the other offers a vacant orbital, and the arrow A to B exists to mark that gift. In Lewis terms it is a Lewis base meeting a Lewis acid (see Acids & Bases). A complex splits into inner and outer sphere: inside the brackets sit centre ion plus ligands, outside hang ionisable counter-ions, so in copper tetra-ammine sulfate the sulfate floats free on dilution while the ammonia stays bound. The count of vacant orbitals fixes the coordination number, most often 4 or 6 - four for tetra-amminecopper(II), six for hexacyanoferrate(III) - and geometry, square planar or octahedral, is decided jointly by centre and ligand. Colour is the readout, and it belongs to centre plus ligand together, never to the ion alone: pale blue copper sulfate solution is the hydrated ion, turning deep blue on adding ammonia means tetra-amminecopper(II) has formed, and anhydrous copper sulfate is white but blues with water, which is how traces of water are detected (see Common Names and What They Really Are). Three colour reactions that are not precipitates deserve memorising: potassium thiocyanate with iron(III) flashes blood red, the most sensitive test for that ion, and the colour vanishes if iron powder first reduces it to iron(II) (see Iron and Its Triangle and Testing for the Common Ions); ammonia into silver ion first precipitates then redissolves it as the more stable diamminesilver(I), which is why silver chloride, insoluble in water, dissolves in ammonia; phenol with bromine water gives a white solid and with iron(III) a violet. Far beyond the textbook page, biology and industry run on coordination: haem's iron, chlorophyll's magnesium, cobalamin's cobalt, the iron-molybdenum site of nitrogenase are all complexes, carrying oxygen and trapping light through their ligand environment; photography and silver recovery exploit halide silver being sensitised then dissolved as a soluble thiosulfate complex during fixing, and e-waste leaching uses cyanide or thiourea to complex silver and gold into solution (see Gold Recovery from E-Waste); cisplatin is a platinum complex whose antitumour action exists only in the cis form with the two chlorides adjacent, the trans isomer being inert, the plainest possible demonstration that structure decides property; trivalent chromium in wastewater, scale and heavy-metal poisoning are handled by chelating agents such as calcium disodium EDTA, since a multidentate ligand wrapping a metal into rings holds it far tighter than monodentate ones. One last point, easily missed: complexation equilibria shift, so dissolving a precipitate and forming a complex are usually competing claims on the same metal ion, settled by which equilibrium constant is larger (see Chemical Equilibrium).",
          },
          tags: [{ zh: "无机", en: "Inorganic" }],
        },
        {
          id: "solution",
          icon: "💧",
          term: { zh: "溶液与溶解度", en: "Solutions & Solubility" },
          level: 1,
          oneLiner: {
            zh: "一种或多种物质分散到另一种物质中形成均一稳定的混合物。",
            en: "A homogeneous, stable mixture of solutes dispersed in a solvent.",
          },
          detail: {
            zh: "溶液的定义里有三个关键词：一种或几种物质分散到另一种物质里、形成均一稳定的混合物。被溶解的是溶质、起溶解作用的是溶剂，水是最常用的溶剂但绝不是唯一——碘酒里溶质是碘而溶剂是乙醇，汽油能洗掉油漆也是溶解。必须和溶液划清界限的是另外两种分散系：泥水是固体小颗粒悬着的悬浊液、牛奶是油滴分散在水里的乳浊液，它们不均一、不稳定、静置会分层或沉降，而溶液静置多久都不会分层、也不会有光路散射成可见的「通路」（这是区分溶液与胶体的直观办法之一）。溶解度四要素缺一个就不成立：一定温度下、100 g 溶剂里、达到饱和状态、所溶解溶质的克数；所以「20 ℃ 时硝酸钾溶解度 31.6 g」这句话的每个字都要读到，脱掉「100 g 溶剂」或「饱和」任一件都成错话。由此可直接换算饱和溶液的质量分数：w = S 除以 (100 + S) 再乘百分之百，而这一份在同一温度下就是该溶液的最大浓度。固体溶解度的三条走向要分开记：多数陡升（硝酸钾，所以适合降温结晶）、少数近于平（氯化钠，所以只能用蒸发结晶）、极个别反而随温度升高而下降（氢氧化钙，所以升温会让它析出、石灰水会变浑，见「生石灰遇水」）——「陡升的用降温、近平的用蒸发」这条选择规律是混合物分离里最实用的一招（见「分离与提纯的方法及仪器配套」）。气体溶解度与固体不同轴：温度升高而减小、压强增大而增大，所以打开汽水瓶盖会冒泡、烧水时锅底先起一串气泡、夏天闷热时鱼会浮到水面吸氧，而工厂吸收气体要降温加压。饱和与不饱和的互转只有三把刀：加溶质、蒸发溶剂、改变温度；判断「谁是饱和」不能看浓度高低而要看「还能不能再溶解这种溶质」，同温度下某物质的饱和溶液可能仍很稀（氢氧化钙），而不饱和也可能很浓（硝酸钾）。最后两格计算与操作上的坑：物质的量浓度 c = n 除以 V，V 是溶液的总体积而不是加进去的水体积，配液时定容俯视会使体积偏小而浓度偏大、仰视则相反（见「常用仪器的精度与加热口径」）；结晶水合物如五水硫酸铜受热先失去结晶水变白（风化与此同理），而固体吸水自溶叫潮解（氢氧化钠、氯化钙都潮解），两者都是「化学变化还是物理变化」的常见辩论题。",
            en: "The definition hides three keywords: one or more substances dispersed in another, giving a uniform and stable mixture. What is dissolved is solute, what does the dissolving is solvent, and water is the commonest solvent but by no means the only one - in tincture of iodine the solute is iodine and the solvent is ethanol, and petrol removing paint is dissolution too. Draw the line against the other two dispersions: muddy water is a suspension of fine solid, milk an emulsion of oil droplets; both are non-uniform, unstable and separate on standing, whereas a solution never separates and shows no visible scattered light path, a handy way to tell solutions from colloids. Four conditions must all be present before a solubility number means anything: a stated temperature, 100 g of solvent, a saturated state, and the grams of solute - so read every word of 31.6 g of potassium nitrate at 20 degrees, and dropping either 100 g of solvent or saturated turns it into nonsense. From this the saturated mass fraction follows directly, w equals S over 100 plus S as a percentage, and that value is the maximum attainable at the temperature. Sort the three solid behaviours: most climb steeply (potassium nitrate, so cool-to-crystallise works), a few lie nearly flat (sodium chloride, so only evaporation works), and the rare ones fall as temperature rises (calcium hydroxide, so warming drives it out and turns limewater cloudy, see CaO + Water) - steep goes by cooling, flat goes by evaporation, the single most useful rule in separation (see Separation and Purification: Method Matched to Apparatus). Gases use different axes: solubility falls with heating and rises with pressure, which is why a shaken soda bottle foams when opened, why kettle bottoms string bubbles before boiling, why fish gas at the surface on muggy summer days, and why industry cools and compresses when absorbing a gas. Saturation converts by only three blades: add solute or evaporate solvent, change temperature, or dilute with the same solution; the test of saturation is never concentration but whether more of that solute can still dissolve, so a saturated solution can be very dilute (lime) while an unsaturated one can be very concentrated (nitrate). Two final pits in numbers and hands: molarity c = n over V uses the total solution volume, not the water poured in, and reading a made-up flask from above leaves the volume short and the concentration too high while reading from below does the reverse (see Glassware: Precision and What May Be Heated); hydrates such as copper vitriol lose their water of crystallisation on heating and turn white, the same as efflorescence, whereas a solid that dissolves in the water it absorbs is deliquescence (sodium hydroxide and calcium chloride both do), and both keep appearing in the argument over whether the change is chemical or physical.",
          },
          tags: [{ zh: "溶液", en: "Solutions" }],
        },
        {
          id: "organic-basics",
          icon: "🔗",
          term: { zh: "有机化学基础", en: "Organic Basics" },
          level: 2,
          oneLiner: {
            zh: "以碳为骨架的化合物，常见官能团有羟基、羧基、氨基等。",
            en: "Carbon-based compounds with functional groups like hydroxyl, carboxyl and amino.",
          },
          detail: {
            zh: "有机化合物之所以数量庞大（已知数以千万计，远超一百余种元素），根本原因在碳的两个本事：四价（能同时连四个原子）与成链（能彼此连成长链、支链、环，还能以单键、双键、三键相连）。结构不同而分子式相同就叫同分异构，这是「一种分子式对应多个物质」的根源，要分三类找：碳链异构（骨架排法不同，丁烷 2 种、戊烷 3 种、己烷 5 种）、位置异构（官能团位置不同，如 1-丁烯与 2-丁烯、羟基连在不同碳上的 1-丙醇与 2-丙醇）、官能团异构（分子式相同而类别不同，乙醇与二甲醚都是 C₂H₆O、乙酸与甲酸甲酯都是 C₂H₄O₂）。数异构体要按「先碳链、再位置、最后换类别」的顺序排查，才不会漏也不会重。同系物则完全是另一件事：结构相似、组成上相差一个或若干个 CH₂ 原子团的化合物互称同系物（甲烷与乙烷、乙烯与丙烯），所以同分异构体之间绝不能称为同系物，这一对概念在同一道选择题里最常互换设置陷阱。表示方法有三套，各管各的：分子式表示原子种类与数目、最简式（实验式）只表示原子个数最简比、结构式（或结构简式）才表示连接顺序——最简式相同并不意味着同一物质，乙酸 C₂H₄O₂、葡萄糖 C₆H₁₂O₆ 与甲醛 CH₂O 的最简式都是 CH₂O。有机物的性质由官能团决定，这是学习有机的唯一路径：烃类看饱和与否（烷烃只能取代、烯烃炔烃能加成）、含氧衍生物看羟基/醛基/羧基/酯基（醇与酚虽都有羟基却因连接对象不同而性质迥异，见「官能团」）。两个褪色反应机理完全不同，是最常被混的一组：乙烯使溴水褪色是与溴发生加成反应（变成二溴乙烷）、而使酸性高锰酸钾褪色是被氧化（最终成二氧化碳），所以「鉴别甲烷与乙烯」用两者都行，而「除去甲烷中的乙烯」只能用溴水（高锰酸钾会把乙烯氧化成二氧化碳、引入新杂质）。三大反应类型对应三种骨架变化：取代（甲烷与氯气在光照下逐步换氢、苯的硝化）、加成（双键打开接原子）、聚合（许多小分子连成大分子，加聚如聚乙烯、缩聚同时脱去小分子如酚醛树脂与聚酯）。四类生命与日用物质也都是有机物：糖类、油脂、蛋白质与维生素——淀粉遇碘变蓝、蛋白质遇浓硝酸变黄（显色反应，可用来鉴别含苯环的蛋白质）、灼烧羊毛有焦羽毛味而棉花没有（所以「看是不是真羊毛」就是这条最朴素的化学检验），而它们的消化过程无不是水解（见「蛋白质与氨基酸」与「皂化反应（制肥皂）」）。最后破两个迷思：有机物并非都不溶于水（乙醇、乙酸、甘油与水互溶）、也并非都易燃（四氯化碳曾用作灭火剂、含氟聚合物极难燃），所以「有机物」只能由组成与结构界定，不能由性质印象界定。",
            en: "Organic compounds number in the tens of millions, far beyond the hundred-odd elements, for one reason: carbon can hold four bonds and can chain - into straight runs, branches, rings, and with single, double or triple links between carbons. Same molecular formula with different structure is isomerism, the reason one formula stands for several substances, and it is hunted in three orders: chain isomerism (different skeleton, 2 for butane, 3 for pentane, 5 for hexane), position isomerism (the group sitting on a different carbon, as with but-1-ene and but-2-ene) and functional-group isomerism (same formula, different family - ethanol and dimethyl ether are both C2H6O, acetic acid and methyl formate both C2H4O2). Counting follows that sequence, skeleton then position then family, so nothing is missed or doubled. Homologues are a different relation altogether: structurally similar compounds differing by one or several CH2 units, as methane with ethane or ethene with propene, which is why isomers may never be called homologues - a swap that examiners love. There are three languages of representation, each answering a different question: molecular formula gives kinds and numbers, empirical formula only the simplest ratio, structural or condensed formula the connectivity; an identical empirical formula proves nothing, since acetic acid C2H4O2, glucose C6H12O6 and formaldehyde CH2O all reduce to CH2O. Properties follow the functional group - that is the only study route in organic chemistry: hydrocarbons are read by saturation (alkanes substitute, alkenes and alkynes add), oxygen derivatives by hydroxyl, aldehyde, carboxyl or ester, and alcohols differ from phenols despite both carrying -OH because the group hangs on a different partner (see Functional Groups). Two bleaching events look alike but work differently, and are the most-confused pair: ethene decolourising bromine water is addition, giving dibromoethane, while ethene decolourising acidified permanganate is oxidation, ending as carbon dioxide; so telling methane from ethene can use either reagent, but scrubbing ethene out of methane may use only bromine water, since permanganate would convert the impurity into a new impurity. Three reaction types map three changes of skeleton: substitution (methane with chlorine under light, stepwise; nitration of benzene), addition (a double bond opening to take atoms), and polymerisation (many small units into one giant one - addition polymerisation as in polyethylene, condensation polymerisation as in phenolic resin or polyester, which also sheds a small molecule). Four classes of living and household matter are all organic: sugars, fats, proteins and vitamins - starch turns blue with iodine, protein yellows with concentrated nitric acid, a colour reaction used to identify aromatic protein, and burning wool smells of scorched feathers while cotton does not, which is the plainest textile test there is, while digestion of all of them is hydrolysis (see Proteins & Amino Acids and Saponification). Finally burst two myths: organics are not all water-insoluble (ethanol, acetic acid and glycerol mix with water in any ratio) and not all flammable (carbon tetrachloride was a fire extinguisher, fluoropolymers hardly burn), so the word organic is defined by composition and structure, never by an impression of properties.",
          },
          tags: [{ zh: "有机", en: "Organic" }],
        },
      ],
    },
    /* ===================== 分子空间结构 3D（试点·按需懒加载） ===================== */
    {
      key: "mol3d",
      icon: "🧊",
      title: { zh: "分子结构 3D", en: "Molecular 3D" },
      items: [],
      // 零依赖 Canvas 查看器：仅在渲染到本模块时才 dynamic-import，不拖累其余学科。
      custom: (grid: HTMLElement) => {
        import("./mol3d").then((m) => m.mount(grid));
      },
    },
    /* ===================== 物质结构（含示意图） ===================== */
    {
      key: "structure",
      icon: "🧱",
      title: { zh: "物质结构", en: "Matter & Structure" },
      items: [
        {
          id: "atom-anatomy",
          icon: "⚛️",
          term: { zh: "原子的构成", en: "Anatomy of an Atom" },
          level: 1,
          oneLiner: {
            zh: "原子 = 居于中心的原子核（质子 + 中子）+ 核外分层运动的电子。",
            en: "An atom = a central nucleus (protons + neutrons) ringed by electrons in shells.",
          },
          detail: {
            zh: "质子带正电、电子带负电、中子不带电；中性原子里质子数 = 原子序数 = 核外电子数，质量数 = 质子数 + 中子数。决定元素种类的是质子数——质子数一变就不再是原来那种元素；中子数只决定同位素，质子同而中子不同（如 ¹²C 与 ¹⁴C）互称「同位素」。电子质量只有质子的约 1/1836，原子的质量几乎全集中在核里；原子半径约 10⁻¹⁰ m、核只有约 10⁻¹⁵ m，所以原子内部绝大部分是空的。化学变化只重新排布核外电子、从不触碰原子核。",
            en: "Protons are positive, electrons negative and neutrons neutral; in a neutral atom protons = atomic number = electrons, and mass number = protons + neutrons. The proton count fixes which element an atom is — change it and the atom becomes a different element — while neutrons only set the isotope, same protons but different neutrons, so ¹²C and ¹⁴C are isotopes (see Isotope). An electron weighs about 1/1836 of a proton, so almost all the mass sits in the nucleus; the atom is about 10⁻¹⁰ m across but its nucleus only about 10⁻¹⁵ m, leaving an atom mostly empty space. Ordinary chemistry only redistributes the extranuclear electrons and never touches the nucleus.",
          },
          tags: [{ zh: "结构", en: "Structure" }],
          figure: `<svg viewBox="0 0 340 230" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <g fill="none" stroke="currentColor" stroke-opacity="0.4">
    <circle cx="150" cy="118" r="34"/><circle cx="150" cy="118" r="62"/><circle cx="150" cy="118" r="90"/>
  </g>
  <circle cx="150" cy="118" r="22" fill="#e5484d"/>
  <text x="150" y="122" text-anchor="middle" font-size="11" fill="#fff">p⁺ n⁰</text>
  <g fill="#3b82f6">
    <circle cx="184" cy="118" r="5.5"/><circle cx="116" cy="118" r="5.5"/>
    <circle cx="150" cy="56" r="5.5"/><circle cx="194" cy="162" r="5.5"/><circle cx="106" cy="74" r="5.5"/>
    <circle cx="240" cy="118" r="5.5"/><circle cx="150" cy="208" r="5.5"/><circle cx="60" cy="118" r="5.5"/>
  </g>
  <text x="6" y="22" font-size="12" fill="currentColor">电子分层绕核运动 Electrons in shells</text>
  <text x="250" y="40" font-size="11" fill="#e5484d">● 原子核 nucleus</text>
  <text x="250" y="58" font-size="11" fill="#3b82f6">● 电子 electron</text>
</svg>`,
        },
        {
          id: "electron-config",
          icon: "🪑",
          term: { zh: "核外电子排布", en: "Electron Configuration" },
          level: 1,
          oneLiner: {
            zh: "电子按能级分层排布，各层最多容纳 2n² 个；最外层不超过 8 个。",
            en: "Electrons fill shells by energy, each holding at most 2n², with no more than 8 in the outermost shell.",
          },
          detail: {
            zh: "电子按能量由低到高一层层填充，2n² 给出每层上限（第一层 2、第二层 8、第三层理论 18），但作为最外层不得超过 8、次外层不得超过 18；初中级只要求前 20 号按 2·8·8 排。最外层电子数直接决定化学性质与常见化合价：Na 最外 1 个易失所以 +1、Cl 最外 7 个易记得 −1、最高可到 +7。8 电子（第一层为最外则是 2，如 He）是稳定结构，稀有气体正因排满了才惰性，其余原子得失或共用电子都是在往这个稳定壳层凑——这正是「元素周期律」把最外层电子数与位置对应起来的底气。",
            en: "Electrons fill shells from low to high energy; the 2n² rule caps each shell (2, 8, 18 …), but an outermost shell never exceeds 8 and the one beneath it 18, and this level only needs the first 20 elements arranged 2·8·8. The outermost count fixes chemical behaviour and common valence: Na has one so it tends to lose it and shows +1, Cl has seven so it gains one (−1) and can reach +7. A full shell of eight (or two when the first shell is the only one, as in He) is the stable set — the noble gases are inert precisely because theirs are full, and every other atom gains, loses or shares electrons to reach that shell, which is why the periodic law can line elements up by their outer count (see Periodic Law).",
          },
          tags: [{ zh: "结构", en: "Structure" }],
          figure: `<svg viewBox="0 0 340 230" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <g fill="none" stroke="currentColor" stroke-opacity="0.4"><circle cx="150" cy="120" r="34"/><circle cx="150" cy="120" r="62"/><circle cx="150" cy="120" r="90"/></g>
  <circle cx="150" cy="120" r="20" fill="#e5484d"/><text x="150" y="124" text-anchor="middle" font-size="11" fill="#fff">Na +11</text>
  <g fill="#3b82f6">
    <circle cx="184" cy="120" r="5"/><circle cx="116" cy="120" r="5"/>
    <circle cx="212" cy="120" r="5"/><circle cx="88" cy="120" r="5"/><circle cx="150" cy="58" r="5"/><circle cx="150" cy="182" r="5"/><circle cx="194" cy="76" r="5"/><circle cx="106" cy="164" r="5"/><circle cx="106" cy="76" r="5"/><circle cx="194" cy="164" r="5"/>
    <circle cx="240" cy="120" r="6" fill="#22c55e"/>
  </g>
  <text x="258" y="88" font-size="12" fill="currentColor">K 2</text>
  <text x="258" y="124" font-size="12" fill="currentColor">L 8</text>
  <text x="250" y="152" font-size="12" fill="#22c55e">M 1</text>
  <text x="6" y="22" font-size="12" fill="currentColor">钠 Na：2·8·1，最外层 1 个电子易失去</text>
</svg>`,
        },
        {
          id: "ionic-bond",
          icon: "🧲",
          term: { zh: "离子键", en: "Ionic Bond" },
          level: 1,
          oneLiner: {
            zh: "活泼金属把电子交给活泼非金属，形成阴阳离子，靠静电作用结合。",
            en: "A metal transfers electrons to a nonmetal; the resulting ions attract electrostatically.",
          },
          detail: {
            zh: "如 NaCl：Na 失 1 个电子成 Na⁺，Cl 得这 1 个成 Cl⁻，阴阳离子靠静电吸引结合，成键时因电荷互吸而放热（这部分能量叫晶格能）。判据常用电负性差——一般差到 1.7 上下及以上就以离子键为主。离子键既无方向又无饱和，所以 NaCl 里每个 Na⁺ 被 6 个 Cl⁻ 包围、堆成一整块晶体，而不是一个个孤立的「NaCl 分子」。固态时离子被钉死不能自由移动故不导电，只有熔融或溶于水、离子解离出来才导电。强碱、多数盐与活泼金属氧化物是典型的离子化合物，它们正是「化学键」三大类型里的离子型。",
            en: "In NaCl sodium gives up one electron to become Na⁺ and chlorine takes it to become Cl⁻; the opposite charges attract electrostatically, and bonding releases heat, since that lattice energy is given off. A rule of thumb is the electronegativity gap — near 1.7 or more the bond is mostly ionic. Ionic bonds have neither direction nor saturation, so in NaCl each Na⁺ is ringed by six Cl⁻ and the solid grows as one lattice rather than discrete NaCl molecules. Locked ions cannot move, so the solid does not conduct; only when molten or dissolved, when the ions break free, does it carry current. Strong bases, most salts and the oxides of active metals are typical ionic compounds — the ionic member of the three kinds of chemical bond (see Chemical Bonds).",
          },
          tags: [{ zh: "成键", en: "Bonding" }],
          figure: `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#22c55e"/></marker></defs>
  <circle cx="60" cy="70" r="28" fill="none" stroke="#22c55e" stroke-width="2"/><text x="60" y="74" text-anchor="middle" font-size="12" fill="currentColor">Na</text>
  <circle cx="90" cy="70" r="4.5" fill="#22c55e"/>
  <path d="M100 70 H150" stroke="#22c55e" stroke-width="2" marker-end="url(#ar)"/>
  <text x="96" y="52" font-size="10" fill="#22c55e">失去 1e⁻</text>
  <circle cx="188" cy="70" r="32" fill="none" stroke="#e5484d" stroke-width="2"/><text x="188" y="74" text-anchor="middle" font-size="12" fill="currentColor">Cl</text>
  <text x="150" y="120" font-size="11" fill="#e5484d">得到 1e⁻</text>
  <circle cx="70" cy="165" r="16" fill="#22c55e" opacity="0.85"/><text x="70" y="169" text-anchor="middle" font-size="11" fill="#fff">Na⁺</text>
  <text x="100" y="169" font-size="16" fill="currentColor">····</text>
  <circle cx="150" cy="165" r="20" fill="#e5484d" opacity="0.85"/><text x="150" y="169" text-anchor="middle" font-size="11" fill="#fff">Cl⁻</text>
  <text x="185" y="169" font-size="11" fill="currentColor">静电作用＝离子键</text>
</svg>`,
        },
        {
          id: "covalent-bond",
          icon: "🤝",
          term: { zh: "共价键", en: "Covalent Bond" },
          level: 1,
          oneLiner: {
            zh: "两原子共用电子对而成键，多见于非金属之间。",
            en: "Atoms share electron pairs; common between nonmetals.",
          },
          detail: {
            zh: "两原子各出一个电子配对共用，双方都因把这一对算进自己而趋向 8 电子稳定，如 H₂、H₂O、CO₂。共用一对是单键、两对双键、三对三键；键能越大越稳、键长越短一般越强。共用电子对不偏向谁是非极性键（H–H、Cl–Cl），偏向一方是极性键（H–Cl、H–O），偏移程度看电负性差，也就是「电负性与电离能」里那条差值。但有一个极性键不等于就是极性分子——还要看构型，CO₂ 有两个极性 C=O 键却因直线对称而整体非极性。多数非金属单质、共价化合物，以及含氧酸与碱里原子团的内部，靠的都是共价键。",
            en: "Each atom supplies one electron to a shared pair and both count that pair toward a stable eight, as in H₂, H₂O and CO₂. One shared pair is a single bond, two a double, three a triple; a larger bond energy means a more stable, usually shorter and stronger bond. A pair that sits evenly is a nonpolar bond (H–H, Cl–Cl); one pulled to a side is polar (H–Cl, H–O), the shift set by the electronegativity gap (see Electronegativity & Ionization). But one polar bond does not make a polar molecule — shape decides, which is why CO₂, with two polar C=O bonds, is nonpolar overall. Most nonmetal elementary substances, covalent compounds and the atom-groups inside oxyacids and bases are held by covalent bonds.",
          },
          tags: [{ zh: "成键", en: "Bonding" }],
          figure: `<svg viewBox="0 0 340 180" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <circle cx="130" cy="86" r="48" fill="none" stroke="#3b82f6" stroke-width="2" opacity="0.85"/>
  <circle cx="210" cy="86" r="48" fill="none" stroke="#3b82f6" stroke-width="2" opacity="0.85"/>
  <text x="88" y="90" text-anchor="middle" font-size="14" fill="currentColor">H</text>
  <text x="252" y="90" text-anchor="middle" font-size="14" fill="currentColor">H</text>
  <circle cx="162" cy="76" r="5" fill="#22c55e"/><circle cx="178" cy="96" r="5" fill="#22c55e"/>
  <text x="170" y="44" text-anchor="middle" font-size="11" fill="#22c55e">共用电子对 shared pair</text>
  <text x="170" y="158" text-anchor="middle" font-size="12" fill="currentColor">H₂ · 电子共用不转移</text>
</svg>`,
        },
        {
          id: "vsepr",
          icon: "📐",
          term: { zh: "分子空间构型（VSEPR）", en: "Molecular Shape (VSEPR)" },
          level: 2,
          oneLiner: {
            zh: "价层电子对相互排斥，使分子采取排斥最小的空间排布。",
            en: "Valence electron pairs repel, so molecules adopt the arrangement of least repulsion.",
          },
          detail: {
            zh: "数中心原子价层的电子对数定形：2 对成直线（CO₂，180°）、3 对成平面三角（BF₃，120°）、4 对成正四面体（CH₄，109.5°）。电子对含孤对时键角被压小——孤对对成键对的斥力大于成键对之间的斥力，所以 NH₃ 有一对孤对、得三角锥形、键角压到约 107°，H₂O 有两对孤对、得 V 形（角形）、键角约 105°。键角还会随中心原子与配原子的电负性、半径微调。构型再决定分子有没有极性：对称的 CO₂ 非极性、不对称的 H₂O 才是极性分子。数电子对时成键对与孤对都要算，它们都来自「共价键」里共用或待共用的那对电子。",
            en: "Count the electron pairs around the central atom to fix the shape: 2 pairs give a line (CO₂, 180°), 3 a trigonal plane (BF₃, 120°), 4 a tetrahedron (CH₄, 109.5°). Lone pairs squeeze the angle, because a lone pair repels bonding pairs harder than bonding pairs repel each other — so NH₃, with one lone pair, is a trigonal pyramid near 107°, and H₂O, with two, is bent near 105°. The angle also shifts a little with the electronegativity and size of the atoms. Shape then sets polarity: symmetric CO₂ is nonpolar while bent H₂O is polar. When you count pairs, bonding and lone pairs both count, since both come from the shared electrons of a covalent bond (see Covalent Bond).",
          },
          tags: [{ zh: "结构", en: "Structure" }],
          figure: `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <g stroke="currentColor" stroke-width="2">
    <line x1="34" y1="72" x2="66" y2="72"/><line x1="74" y1="72" x2="106" y2="72"/>
    <line x1="180" y1="66" x2="162" y2="98"/><line x1="180" y1="66" x2="198" y2="98"/>
    <line x1="290" y1="72" x2="290" y2="46"/><line x1="290" y1="72" x2="266" y2="98"/><line x1="290" y1="72" x2="314" y2="98"/><line x1="290" y1="72" x2="304" y2="112"/>
  </g>
  <g stroke="none" font-size="10" text-anchor="middle" fill="#fff">
    <circle cx="70" cy="72" r="12" fill="#3b82f6"/><text x="70" y="75">C</text>
    <circle cx="22" cy="72" r="11" fill="#e5484d"/><text x="22" y="75">O</text>
    <circle cx="118" cy="72" r="11" fill="#e5484d"/><text x="118" y="75">O</text>
    <circle cx="180" cy="62" r="11" fill="#e5484d"/><text x="180" y="65">O</text>
    <circle cx="160" cy="102" r="8" fill="#9aa4b2"/><text x="160" y="105">H</text>
    <circle cx="200" cy="102" r="8" fill="#9aa4b2"/><text x="200" y="105">H</text>
    <circle cx="290" cy="72" r="12" fill="#3b82f6"/><text x="290" y="75">C</text>
    <circle cx="290" cy="42" r="8" fill="#9aa4b2"/><text x="290" y="45">H</text>
    <circle cx="264" cy="100" r="8" fill="#9aa4b2"/><text x="264" y="103">H</text>
    <circle cx="316" cy="100" r="8" fill="#9aa4b2"/><text x="316" y="103">H</text>
    <circle cx="304" cy="116" r="8" fill="#9aa4b2"/><text x="304" y="119">H</text>
  </g>
  <g font-size="11" fill="currentColor" text-anchor="middle">
    <text x="70" y="140">直线形 180° CO₂</text>
    <text x="180" y="140">V 形 105° H₂O</text>
    <text x="292" y="150">正四面体 CH₄</text>
  </g>
</svg>`,
        },
        {
          id: "hydrogen-bond",
          icon: "🫧",
          term: {
            zh: "分子间作用力与氢键",
            en: "Intermolecular Forces & H-Bonds",
          },
          level: 2,
          oneLiner: {
            zh: "分子间存在比化学键弱得多的作用力；含 H–F/O/N 时形成氢键。",
            en: "Weak forces act between molecules; H bonded to F/O/N forms hydrogen bonds.",
          },
          detail: {
            zh: "范德华力普遍存在于一切分子之间，随相对分子质量增大、接触面积增大而增强（同系物沸点递增，支链多则因接触面小而沸点偏低）。氢键是一种特殊的分子间作用：H 已被 F、O、N 拽得近乎带正电，又去吸另一分子里 F/O/N 的孤对，比范德华强、却仍比化学键弱约一个量级，所以氢键不是化学键。它能解释水的沸点远高于 H₂S、冰因氢键撑成疏松晶体而浮于水面、HF 与氨极易溶于水，以及 DNA 双链靠碱基间氢键配对（A–T 两对、G–C 三对）。要分清尺度：分子间作用力与氢键作用在分子之间，「共价键」作用在分子之内，两者强弱差约一个量级。",
            en: "Van der Waals forces act between all molecules and grow with molar mass and contact area (boiling points climb down a homologous series, while branching lowers them by shrinking the contact face). A hydrogen bond is a special case: an H already pulled nearly positive by F, O or N is drawn to a lone pair on another molecule's F/O/N — stronger than van der Waals yet still about an order of magnitude weaker than a real bond, and not itself a covalent bond (see Covalent Bond). It explains why water boils far above H₂S, why ice floats because H-bonds hold an open lattice, why HF and ammonia dissolve so readily, and how the two DNA strands pair, A–T with two and G–C with three hydrogen bonds. Keep the scale straight: intermolecular forces and hydrogen bonds act between molecules while covalent bonds act within one, and the two differ by roughly an order of magnitude.",
          },
          tags: [{ zh: "结构", en: "Structure" }],
          figure: `<svg viewBox="0 0 360 190" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <g stroke="currentColor" stroke-width="2">
    <line x1="110" y1="70" x2="90" y2="96"/><line x1="110" y1="70" x2="130" y2="96"/>
    <line x1="250" y1="70" x2="230" y2="96"/><line x1="250" y1="70" x2="270" y2="96"/>
  </g>
  <g stroke="#e5484d" stroke-width="1.6" stroke-dasharray="5 4">
    <line x1="130" y1="96" x2="228" y2="96"/><line x1="90" y1="96" x2="120" y2="130"/>
  </g>
  <g stroke="none" font-size="10" text-anchor="middle" fill="#fff">
    <circle cx="110" cy="70" r="12" fill="#e5484d"/><text x="110" y="73">O</text>
    <circle cx="90" cy="100" r="8" fill="#9aa4b2"/><text x="90" y="103">H</text>
    <circle cx="130" cy="100" r="8" fill="#9aa4b2"/><text x="130" y="103">H</text>
    <circle cx="250" cy="70" r="12" fill="#e5484d"/><text x="250" y="73">O</text>
    <circle cx="230" cy="100" r="8" fill="#9aa4b2"/><text x="230" y="103">H</text>
    <circle cx="270" cy="100" r="8" fill="#9aa4b2"/><text x="270" y="103">H</text>
  </g>
  <text x="180" y="88" text-anchor="middle" font-size="10" fill="#e5484d">氢键 H-bond</text>
  <text x="180" y="168" text-anchor="middle" font-size="12" fill="currentColor">O–H···O 氢键使水沸点反常偏高</text>
</svg>`,
        },
        {
          id: "crystal-types",
          icon: "💎",
          term: { zh: "晶体类型", en: "Crystal Types" },
          level: 2,
          oneLiner: {
            zh: "微粒按一定方式有序排列成晶体，按结合微粒与作用分为四类。",
            en: "Particles ordered into crystals, grouped by what holds them together.",
          },
          detail: {
            zh: "四类晶体按「微粒 + 作用力」定名：离子晶体（NaCl）由阴、阳离子经离子键结合，熔沸点较高、硬而脆；原子晶体（也叫共价晶体，如金刚石、SiO₂、晶体硅）以共价键连成空间网，熔点极高、是自然界最硬的；分子晶体（干冰、冰、碘）靠分子间作用力堆叠，熔沸点低、易升华；金属晶体由金属键结合，导电导热又有延展。熔点大体是原子晶体 > 离子晶体 > 分子晶体，但同类内部还得比键强与晶格能：C–C 比 Si–Si 强所以金刚石熔点高于晶体硅，MgO 因 Mg²⁺、O²⁻ 电荷高又半径小、晶格能大，熔点反超 NaCl。四类之别归根到底是「化学键」三种键与分子间作用力的分工。",
            en: "Name a crystal by its particles and the force binding them: ionic crystals (NaCl) join cations and anions through ionic bonds, with fairly high melting points but a hard, brittle habit; covalent-network crystals (diamond, SiO₂, crystalline silicon) link atoms into a giant covalent lattice, extremely refractory and the hardest in nature; molecular crystals (dry ice, ice, iodine) stack by intermolecular forces, so they melt low and often sublime; metallic crystals use metal bonds and conduct heat and electricity while staying malleable. Melting points run roughly network over ionic over molecular, but within a type bond strength and lattice energy decide: C–C beats Si–Si so diamond out-melts silicon, and MgO out-melts NaCl because its 2+ and 2− charges are higher and its ions smaller, giving a larger lattice energy. The four kinds differ, in the end, by how the three chemical bonds and the intermolecular forces divide the work (see Chemical Bonds).",
          },
          tags: [{ zh: "结构", en: "Structure" }],
        },
      ],
    },
    /* ===================== 完整元素周期表（118 元素） ===================== */
    {
      key: "periodic-table-full",
      icon: "🧭",
      title: { zh: "元素周期表", en: "Periodic Table" },
      kind: "periodic",
      items: periodicItems,
    },
    /* ===================== 周期律与趋势 ===================== */
    {
      key: "trends",
      icon: "📊",
      title: { zh: "周期律与趋势", en: "Periodic Trends" },
      items: [
        {
          id: "periods-groups",
          icon: "🟰",
          term: { zh: "周期与族", en: "Periods & Groups" },
          level: 1,
          oneLiner: {
            zh: "横排为周期（电子层数相同），纵列为族（最外层电子数相同）。",
            en: "Rows are periods (same shells); columns are groups (same valence electrons).",
          },
          detail: {
            zh: "现行表横排为 7 个周期、纵列 18 列。周期数 = 该元素原子核外电子层数；主族（ⅠA–ⅦA 加 0 族）的族序数 = 最外层电子数，也等于最高正价（O、F 除外）。同一族因最外层电子数相同而化学性质相似（如碱金属ⅠA、卤素ⅦA），这是「元素周期律」里“位置反映结构、结构决定性质”的骨架。短周期（1–3）每族只一两种元素、长周期（4–7）里夹着 d 区的过渡元素，镧系锕系被单列在下方以免表格过宽。定位三个数——周期数看电子层、族序数看最外层、原子序数看质子数——就能在「原子结构」与性质之间来回推算。",
            en: "The modern table runs 7 horizontal periods and 18 vertical columns. The period number equals the atom's number of electron shells, and for a main group (IA–VIIA plus group 0) the group number equals the outer-shell count and the highest positive valence, oxygen and fluorine aside. A group shares chemical behaviour because its members have the same outer count — the alkali metals of group 1, the halogens of group 17 — which is the skeleton of the periodic law, where position reflects structure and structure sets properties (see Periodic Law). Short periods 1–3 hold few elements per group, long periods 4–7 fold in the d-block, and the lanthanides and actinides sit in separate rows below to keep the table from widening. Read three numbers — period for shells, group for outer electrons, atomic number for protons — and you can move between atomic structure and properties (see Atomic Structure).",
          },
          tags: [{ zh: "周期表", en: "Periodic" }],
        },
        {
          id: "same-period",
          icon: "➡️",
          term: { zh: "同周期递变规律", en: "Across a Period" },
          level: 2,
          oneLiner: {
            zh: "从左到右原子半径减小、金属性减弱、非金属性增强。",
            en: "Left to right: radius shrinks, metallic character weakens, nonmetals strengthen.",
          },
          detail: {
            zh: "同周期从左到右，核电荷递增而新增电子填进同一层、屏蔽增加有限，所以有效核电荷增大、原子半径减小（见「原子半径趋势」）。结果是核对最外层电子的引力增强：失电子变难、金属性减弱，得电子变易、非金属性增强，最高价氧化物对应水化物的酸性递增、碱性递减，气态氢化物稳定性递增。第三周期从 Na、Mg、Al 的金属，到 Si 的类金属，再到 P、S、Cl 的非金属，是最完整的递变样本；稀有气体因壳层已满而单列其外。这是「元素周期律」横着读的方向。",
            en: "Across a period the nuclear charge rises while added electrons enter the same shell, so shielding grows little and the effective pull on the outer electrons strengthens — radius shrinks (see Atomic Radius Trend). Losing electrons then gets harder and metallic character weakens, gaining them gets easier and nonmetallic character grows: the hydroxides of the highest oxides turn from basic toward acidic, and the gaseous hydrides become more stable. Period 3 gives the fullest sample, running from the metals sodium, magnesium and aluminium through metalloid silicon to the nonmetals phosphorus, sulfur and chlorine, with the noble gases set apart because their shells are already full. This is the periodic law read left to right (see Periodic Law).",
          },
          tags: [{ zh: "周期表", en: "Periodic" }],
        },
        {
          id: "same-group",
          icon: "⬇️",
          term: { zh: "同主族递变规律", en: "Down a Group" },
          level: 2,
          oneLiner: {
            zh: "从上到下原子半径增大、金属性增强、非金属性减弱。",
            en: "Top to bottom: radius grows, metallic character strengthens, nonmetals weaken.",
          },
          detail: {
            zh: "同主族从上到下，最外层电子数不变而电子层增多、内层屏蔽加厚，所以原子半径增大、核对最外层电子的引力减弱，失电子更容易、金属性增强，得电子更难、非金属性减弱。卤素是纵着读的一条好线：F、Cl 是活泼非金属，Br 次之，I 已显出金属光泽、氢化物 HI 酸性更强而稳定性下降；碱金属则从 Li 到 Cs 与水反应越来越烈。判据口诀“上非下金、右非左金”，两句合起来就是「元素周期律」。它与「同周期递变规律」一横一纵，构成周期表的两条递变主轴。",
            en: "Down a group the outer count stays the same while more shells are added and inner shielding thickens, so the radius grows and the nucleus grips the outer electron less tightly: electrons are lost more easily and metallic character rises, while gaining them becomes harder as nonmetallic character fades. The halogens make a good vertical line — fluorine and chlorine are vigorous nonmetals, bromine less so, and by iodine a metallic lustre appears while the hydride HI turns more acidic yet less stable; the alkali metals likewise react with water ever more violently from lithium to caesium. The rule reads 'up nonmetallic, down metallic' crossed with 'right nonmetallic, left metallic,' and together these are the periodic law (see Periodic Law). Against the across-a-period trend (see Across a Period) these two form the table's axes of variation.",
          },
          tags: [{ zh: "周期表", en: "Periodic" }],
        },
        {
          id: "metal-nonmetal",
          icon: "⚔️",
          term: { zh: "金属性与非金属性", en: "Metallic & Nonmetallic" },
          level: 1,
          oneLiner: {
            zh: "金属性指失电子能力，非金属性指得电子能力；分界线附近为类金属。",
            en: "Metallic = losing electrons; nonmetallic = gaining; metalloids sit near the divide.",
          },
          detail: {
            zh: "金属性看失电子的难易、非金属性看得电子的难易，判据有实测对应：金属性可看单质与水或酸置换氢的本领、最高价氢氧化物碱性强弱；非金属性可看与氢化合的难易、气态氢化物稳定性、最高价含氧酸的酸性。左下角（铯、钫）金属性最强，右上角（氟）非金属性最强。沿 B–Si–As–Te–At 的阶梯线两侧是既有金属性又有非金属性的类金属（硅、锗常作半导体）。越靠这条中线，离子键与共价键的过渡越连续，电负性差正是量这根线位置的尺（见「电负性与电离能」）。它是「同周期递变规律」「同主族递变规律」两条方向合成的总效果。",
            en: "Metallic character is how readily an atom gives up electrons and nonmetallic how readily it takes them, and both have hands-on tests: gauge metallic strength by how a substance frees hydrogen from water or acid and by how basic its highest hydroxide is, and gauge nonmetallic strength by how easily it joins hydrogen, how stable that hydride is, and how strong its highest oxyacid. The lower-left (caesium, francium) is most metallic and the upper-right (fluorine) most nonmetallic. Along the stepped boron–silicon–arsenic–tellurium–astatine line sit the metalloids, both metallic and nonmetallic, with silicon and germanium used as semiconductors. Nearer the divide, ionic-to-covalent bonding shades over continuously, and the electronegativity gap is the ruler measuring position on it (see Electronegativity & Ionization). This is the combined effect of the two directions, across a period and down a group.",
          },
          tags: [{ zh: "周期表", en: "Periodic" }],
        },
        {
          id: "atomic-radius",
          icon: "⭕",
          term: { zh: "原子半径趋势", en: "Atomic Radius Trend" },
          level: 2,
          oneLiner: {
            zh: "同周期减小、同主族增大；稀有气体因计量方式通常单独较大。",
            en: "Shrinks across a period, grows down a group; noble-gas values differ by convention.",
          },
          detail: {
            zh: "原子半径不是实测的硬边，而是把相邻原子核间距取一半推出来的，所以比较时必须守住同一套口径。规律只有两句：同周期从左到右逐渐减小，同主族从上到下逐渐增大。前者是因为电子都填进同一层、屏蔽几乎不增，而核电荷一步步加大，外层被拉得更紧；后者是因为每往下就多出整整一个电子层，层数的作用压过了核电荷的增加。两个常考的比较：一、比微粒半径先看电子层数，层多则大；层数相同再看核电荷，核大则小（O²⁻、F⁻、Na⁺、Mg²⁺、Al³⁺ 都是 2、8 结构，只差质子数，所以依次缩小）。二、同种元素的原子与离子，阳离子一定小于原子（少了一层），阴离子一定大于原子（层没变而电子间斥力变大），所以 Na⁺ 小于 Na、Cl⁻ 大于 Cl。稀有气体要单独说明：它的半径是范德华半径，与相邻元素的金属或共价半径不是同一口径，因此画在同一张折线图上常常突然变大，中学阶段一般不参与比较。",
            en: "An atomic radius is not a measured hard edge: it comes from halving the distance between neighbouring nuclei, so every comparison has to stay inside one convention. The rule is two sentences — radii shrink across a period and grow down a group. In the first case the electrons go into the same shell and screening barely rises while the nuclear charge does, so the outer electrons are pulled tighter; in the second a whole new shell is added, and shell count beats nuclear charge. Two comparisons are examined every year. Particles with different shell counts are ranked by shells first, and where the shell structure is identical the larger nuclear charge wins — O²⁻, F⁻, Na⁺, Mg²⁺, Al³⁺ are all 2,8 and shrink in that order. For one element the cation is always smaller than the atom (a shell gone) while the anion is larger (same shell, more electron repulsion), so Na⁺ is under Na and Cl⁻ over Cl. Note the convention clash for noble gases: their figure is a van der Waals radius, not a metallic or covalent one, which is why they jump at the end of a plot and why the school course leaves them out of the ranking.",
          },
          tags: [{ zh: "周期表", en: "Periodic" }],
        },
        {
          id: "electronegativity",
          icon: "🎚️",
          term: { zh: "电负性与电离能", en: "Electronegativity & Ionization" },
          level: 2,
          oneLiner: {
            zh: "电负性衡量吸引共用电子能力（氟最大）；电离能是失电子所需能量。",
            en: "Electronegativity gauges electron attraction (F largest); ionization energy is to remove an electron.",
          },
          detail: {
            zh: "电负性是原子在「共价键」里抢共用电子对的能力，鲍林标度里氟最大（4.0）、向左下递减；两原子电负性差越大，键越偏向离子性（一般差到 1.7 及以上判离子键为主）。电离能是从气态原子移走一个电子所需的能量，第一电离能同周期左低右高、同主族上高下低；当要拆的是已排满的稳定壳层或半满轨道时，会出现反常台阶（如 Be、N、稀有气体比相邻元素偏高）。两者都随核电荷增大而升高、随半径增大而降低，本质是同一份引力的两面——一个说抢电子、一个说甩电子。同一道电负性差，还能解释为什么 NaCl 是离子化合物而 HCl 是共价分子。",
            en: "Electronegativity is how hard an atom pulls a shared pair in a covalent bond (see Covalent Bond); on the Pauling scale fluorine is highest at 4.0 and the value falls toward the lower left, and the bigger the gap between two atoms the more the bond leans ionic, with a gap near 1.7 and above taken as mainly ionic. Ionization energy is the energy needed to strip one electron from a gaseous atom; the first ionization energy rises left to right across a period and falls down a group, with sudden steps where a full shell or a half-filled subshell must be broken, as in beryllium, nitrogen and the noble gases. Both climb with nuclear charge and fall with radius, being two faces of one grip — one word about seizing electrons, the other about letting them go. The same gap explains why sodium chloride is an ionic solid while hydrogen chloride is a covalent molecule.",
          },
          tags: [{ zh: "周期表", en: "Periodic" }],
        },
        {
          id: "transition",
          icon: "🔩",
          term: { zh: "过渡元素", en: "Transition Elements" },
          level: 2,
          oneLiner: {
            zh: "周期表中部 d 区元素，多为有色、可变价、易形成配合物。",
            en: "Central d-block elements: often colored, multiple valences, complex-forming.",
          },
          detail: {
            zh: "过渡元素是周期表中部填 d（或 f）轨道的一区，价电子除最外层还动用次外层 d 电子，所以常有多价态（Fe 有 +2、+3，Mn 从 +2 到 +7），不像主族多只一个价。多数有颜色、易形成配合物，因为空的 d 轨道能接受孤对电子；水合离子与许多化合物显色正源于 d 电子跃迁吸收可见光。它们熔点高、密度大、硬度高，是结构与功能材料的主力：Fe 造钢、Cu 导电、Ti 轻质耐蚀，催化剂更是遍地（Fe 合成氨、V₂O₅ 接触法制硫酸、Pt 与 Pd 净化汽车尾气）。同一周期内相邻过渡金属半径变化很小，这正是「同周期递变规律」到 d 区放缓的地方。",
            en: "Transition elements are the central block that fills d or f orbitals; their valence reaches into the inner d shell as well as the outer one, so they show many oxidation states — iron at +2 and +3, manganese from +2 up to +7 — unlike main-group atoms that usually sit at one. Most are coloured and form complexes readily, since empty d orbitals can accept lone pairs, and the hues of their hydrated ions come from d electrons absorbing visible light. They are hard, dense and high-melting workhorse materials: iron into steel, copper conducting wires, titanium light and corrosion-proof, and catalysts everywhere (iron for ammonia, vanadium pentoxide for sulfuric acid, platinum and palladium in exhaust cleanup). Radii barely change between neighbours within a period, which is where the across-a-period trend flattens out in the d block (see Across a Period).",
          },
          tags: [{ zh: "周期表", en: "Periodic" }],
        },
        {
          id: "noble-gas",
          icon: "🎈",
          term: { zh: "稀有气体", en: "Noble Gases" },
          level: 1,
          oneLiner: {
            zh: "最外层电子已满，化学性质极稳定，过去称惰性气体。",
            en: "Filled outer shells make them extremely stable, once called inert gases.",
          },
          detail: {
            zh: "氦、氖、氩、氪、氙、氡的最外层已排满（氦 2 个、其余 8 个稳定结构），电离能极高、几乎不得失也不共用电子，故化学性质极不活泼，旧称惰性气体。氖、氩多做保护气与霓虹灯，氦用于低温、超导与气球（密度小又不可燃，比氢气安全），氙可做高压灯与麻醉。说“惰性”只是相对的——1962 年巴特利特制出第一例稳定的含氙化合物，较重、半径较大的氙、氪外层电子离核远、易被强氧化剂拽走而能成键。它们正是「同周期递变规律」里每个周期收尾的那一列，壳层填满处递变到此归零。",
            en: "In helium, neon, argon, krypton, xenon and radon the outer shell is already full (two for helium, eight for the rest), ionization energies are very high, and the atoms neither give, take nor share electrons readily, which is why they were long called inert gases. Neon and argon serve as shield gases and in signs, helium in cryogenics, superconductors and balloons (light and non-flammable, safer than hydrogen), and xenon in powerful lamps and anaesthesia. Inert is only relative: in 1962 Bartlett made the first stable xenon compound, and the heavier, larger atoms such as xenon and krypton hold their outer electrons far enough from the nucleus that strong oxidizers can wrest them into bonds. They are the closing column of every period, where the across-a-period trend ends at a full shell (see Across a Period).",
          },
          tags: [{ zh: "周期表", en: "Periodic" }],
        },
      ],
    },
    /* ===================== 反应类型 ===================== */
    {
      key: "reactions",
      icon: "🔥",
      title: { zh: "反应类型", en: "Reaction Types" },
      items: [
        {
          id: "synthesis",
          subs: [
            {
              f: "CaO",
              name: { zh: "氧化钙（生石灰）", en: "Calcium oxide (quicklime)" },
              note: { zh: "白色块状，遇水剧烈放热，是食品干燥袋里那包东西。", en: "White lumps that heat violently with water — the packet inside food drying bags." },
              role: "l",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "与生石灰化合时水量常不足，最后得到粉末状熟石灰。", en: "Often added in excess of none; the product crumbles to a powder." },
              role: "l",
            },
            {
              f: "Ca(OH)₂",
              name: { zh: "氢氧化钙（熟石灰、消石灰）", en: "Calcium hydroxide (slaked lime)" },
              note: { zh: "放出的热足以把水烧开，所以生石灰煮鸡蛋是真实可行的。", en: "The heat released can actually boil water — lime-cooked eggs are real." },
              role: "r",
            },
            {
              f: "Fe",
              name: { zh: "铁（细铁丝）", en: "Iron (fine wire)" },
              note: { zh: "绕成螺旋状并系一根火柴引燃，末端打磨掉锈才着火。", en: "Coiled and lit by a match splint; the rust must be ground off first." },
              role: "l",
            },
            {
              f: "O₂",
              name: { zh: "氧气", en: "Oxygen" },
              note: { zh: "铁丝在空气里只红不燃，纯氧中才火星四射。", en: "Iron wire only glows in air; it sparks in pure oxygen." },
              role: "l",
            },
            {
              f: "Fe₃O₄",
              name: { zh: "四氧化三铁（黑色固体）", en: "Iron(II,III) oxide (black solid)" },
              note: { zh: "瓶底先放少量水或细沙，防止熔融物溅落炸裂集气瓶。", en: "Water or sand in the bottle stops the molten drop cracking the glass." },
              role: "r",
            },
            {
              f: "CO₂",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: { zh: "溶于水的只有约百分之一反应，所以碳酸是弱酸。", en: "Only about one percent of the dissolved gas reacts, hence a weak acid." },
              role: "l",
            },
            {
              f: "H₂CO₃",
              name: { zh: "碳酸", en: "Carbonic acid" },
              note: { zh: "使紫色石蕊变红、受热立刻分解，振荡或升温都会跑掉。", en: "Reddens litmus and breaks down on warming — shaking vents it." },
              role: "r",
            },
          ],
          icon: "➕",
          term: { zh: "化合反应", en: "Synthesis" },
          level: 1,
          oneLiner: {
            zh: "多种物质生成一种新物质（A + B → AB）。",
            en: "Several substances form one product (A + B → AB).",
          },
          eq: [
            {
              lhs: "CaO + H₂O",
              cond: { zh: "常温，剧烈放热", en: "room temperature; strongly exothermic" },
              rhs: "Ca(OH)₂",
              rel: "equal",
            },
            {
              lhs: "3Fe + 2O₂",
              cond: { zh: "点燃，火星四射", en: "ignited; a shower of sparks" },
              rhs: "Fe₃O₄",
              rel: "equal",
            },
            {
              lhs: "CO₂ + H₂O",
              cond: { zh: "常温，部分化合", en: "room temperature; partly combines" },
              rhs: "H₂CO₃",
              rel: "equilibrium",
            },
          ],
          detail: {
            zh: "化合反应的特征一句话就够：多变一，即由两种或两种以上物质生成另一种物质，生成物必须只有一种，否则不能叫化合。它是初中四大基本反应类型里最容易和「氧化反应」混用的一类：铁燃烧是化合也是氧化，而蜡烛（石蜡）燃烧生成二氧化碳和水两种物质，属于氧化反应却不属于化合反应——判据只看生成物是不是唯一那一种。化合反应大多放热，常见的四组要记牢：生石灰与水（放热到能加热食物，所以自热米饭的加热包就是它）、铁丝在氧气中燃烧（现象是火星四射、生成黑色固体，瓶底必须先放少量水或铺一层细沙防炸裂；这里生成的是 Fe₃O₄ 而不是 Fe₂O₃，铁在潮湿空气里缓慢氧化生成的铁锈才主要是 Fe₂O₃·xH₂O）、磷在氧气中燃烧（生成白烟 P₂O₅，所以测空气氧含量用红磷而不用木炭，因为木炭生成的是气体不占体积差）、二氧化碳溶于水（只有一部分水化合生成碳酸，故为可逆且碳酸不稳定）。还要区分「化合价是否改变」：有单质参加的化合，化合价一定变（如 Fe 由 0 到 +2、+3）；没有单质参加的化合则可能全不变（如 CaO + H₂O、CO₂ + H₂O），所以「化合反应都是氧化还原反应」这句话是错的，判断只看有没有元素化合价升降。另外氨与氯化氢常温下相遇就冒白烟（生成氯化铵固体小颗粒），也是化合，这条常用于说明「两种气体可以生成固体」。",            en: "Synthesis in one line: many into one, and the product must be a single substance or the name does not apply. This is the type most often confused with oxidation, so separate the two: burning iron is both, while a candle (paraffin) yields carbon dioxide and water — oxidation but not synthesis, because two products appear rather than one. Most combination reactions give out heat, and four are worth knowing cold: quicklime with water (enough heat to cook food, which is why an instant-ration heating pack is just this), iron wire burning in oxygen (a shower of sparks and a black solid, with water or sand first placed in the bottle so the molten drop does not crack it; the product is Fe₃O₄, not Fe₂O₃ — rust formed slowly in damp air is mainly Fe₂O₃·xH₂O), phosphorus burning (white smoke of phosphorus pentoxide, which is why the air-content experiment uses red phosphorus and never charcoal, since charcoal gives a gas and leaves no volume change), and carbon dioxide dissolving (only a fraction of the dissolved gas actually combines, hence reversible and hence a weak carbonic acid). Watch oxidation states too: a synthesis involving a free element must change them, while one with no free element may change none — quicklime with water, carbon dioxide with water — so the claim that all combination reactions are redox is simply wrong; the test is whether any valence moved. Ammonia and hydrogen chloride fuming white where they meet is another synthesis, useful for showing that two gases can make a solid.",
          },
          tags: [
            { zh: "反应类型", en: "Reaction Type" },
            { zh: "初中", en: "Junior" },
          ],
        },
        {
          id: "decomposition",
          subs: [
            {
              f: "2H₂O₂",
              name: { zh: "过氧化氢（双氧水）", en: "Hydrogen peroxide" },
              note: { zh: "常温也分解，只是慢到看不见气泡。", en: "It decomposes slowly even cold — too slowly to see." },
              role: "l",
            },
            {
              f: "2KMnO₄",
              name: { zh: "高锰酸钾（紫黑色）", en: "Potassium permanganate (dark violet)" },
              note: { zh: "试管口要略向下倾斜，防止冷凝水倒流炸裂试管。", en: "Tilt the mouth slightly down so condensate cannot run back and crack the tube." },
              role: "l",
            },
            {
              f: "2KClO₃",
              name: { zh: "氯酸钾", en: "Potassium chlorate" },
              note: { zh: "必须混匀二氧化锰再加热，纯氯酸钾受热易猛燃。", en: "Mix with manganese dioxide first; heated alone it can flare." },
              role: "l",
            },
            {
              f: "MnO₂",
              name: { zh: "二氧化锰（催化剂）", en: "Manganese dioxide (catalyst)" },
              note: { zh: "反应前后质量和化学性质都不变，但它是固体所以不能省略研磨步骤。", en: "Unchanged in mass and nature, yet still a solid that must be ground in." },
              role: "c",
            },
            {
              f: "CaCO₃",
              name: { zh: "碳酸钙（石灰石）", en: "Calcium carbonate (limestone)" },
              note: { zh: "常温不分解，要煅烧到约 900 ℃ 才明显放出 CO₂。", en: "Steady cold; it releases CO₂ only near 900 °C in a kiln." },
              role: "l",
            },
            {
              f: "2H₂O",
              name: { zh: "水（加少量稀硫酸增强导电）", en: "Water (with a little acid for conductivity)" },
              note: { zh: "纯水几乎不导电，所以电解时要加稀硫酸或氢氧化钠。", en: "Pure water barely conducts, so acid or alkali is added first." },
              role: "l",
            },
            {
              f: "K₂MnO₄",
              name: { zh: "锰酸钾（绿）", en: "Potassium manganate (green)" },
              note: { zh: "残留物溶于水呈绿色，这是它和二氧化锰的分工证据。", en: "The residue turns the water green — the split between it and the dioxide." },
              role: "r",
            },
            {
              f: "2KCl",
              name: { zh: "氯化钾", en: "Potassium chloride" },
              note: { zh: "留在试管里的白色固体，溶解过滤即可回收二氧化锰。", en: "The white solid left behind; dissolve and filter to recover the dioxide." },
              role: "r",
            },
            {
              f: "CaO",
              name: { zh: "氧化钙（生石灰）", en: "Calcium oxide (quicklime)" },
              note: { zh: "工业制生石灰的唯一来源，同时也是制 CO₂ 的另一产物。", en: "Industry's whole supply of quicklime, and a by-product of lab CO₂ too." },
              role: "r",
            },
            {
              f: "CO₂↑",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: { zh: "使澄清石灰水变浑浊，是它的检验方法。", en: "Clouds lime water — the test for it." },
              role: "r",
            },
            {
              f: "2H₂↑",
              name: { zh: "氢气（负极）", en: "Hydrogen (cathode)" },
              note: { zh: "正负两极气体体积比 1:2，所以「负氢正氧、氢二氧一」。", en: "Volume ratio 2:1 at the negative pole — hydrogen twice, oxygen once." },
              role: "r",
            },
            {
              f: "O₂↑",
              name: { zh: "氧气", en: "Oxygen" },
              note: { zh: "三条路径都产出它，检验方法一律是带火星的木条复燃。", en: "All three routes give it; test it the same way every time with a glowing splint." },
              role: "r",
            },
          ],
          icon: "➖",
          term: { zh: "分解反应", en: "Decomposition" },
          level: 1,
          oneLiner: {
            zh: "一种物质分解成多种物质（AB → A + B）。",
            en: "One substance breaks into several (AB → A + B).",
          },
          eq: [
            {
              lhs: "2H₂O₂",
              cond: { zh: "MnO₂ 催化，常温", en: "MnO₂ catalyst, room temperature" },
              rhs: "2H₂O + O₂↑",
              rel: "equal",
            },
            {
              lhs: "2KMnO₄",
              cond: { zh: "加热", en: "heated" },
              rhs: "K₂MnO₄ + MnO₂ + O₂↑",
              rel: "equal",
            },
            {
              lhs: "2KClO₃",
              cond: { zh: "MnO₂ 催化，加热", en: "MnO₂ catalyst, heated" },
              rhs: "2KCl + 3O₂↑",
              rel: "equal",
            },
            {
              lhs: "CaCO₃",
              cond: { zh: "高温煅烧", en: "strong heat (calcination)" },
              rhs: "CaO + CO₂↑",
              rel: "equal",
            },
            {
              lhs: "2H₂O",
              cond: { zh: "通电", en: "electric current" },
              rhs: "2H₂↑ + O₂↑",
              rel: "equal",
            },
          ],
          detail: {
            zh: "分解反应与化合正好相反：一变多，由一种物质生成两种或两种以上其他物质。判断只看反应物是不是唯一那一种，与生成物有几种无关紧要到几个都行。条件是分类的入口：初中把「分解」按能量来源分成加热分解、通电分解和常温分解三种。加热制氧的两种药品现象不同——高锰酸钾加热时直接分解，管口要塞一团棉花防止粉末进入导管，产物有三种；氯酸钾必须与二氧化锰混匀，产物只有氯化钾和氧气，反应完后加足水溶解、过滤、洗涤、干燥就能把二氧化锰回收再用，这也是「催化剂反应前后质量不变」最直接的实验证据。要特别提醒：二氧化锰在高锰酸钾的分解里是产物而不是催化剂（自己生成了自己），而在氯酸钾与过氧化氢里才是催化剂，同一种物质在不同反应中身份可以不同。常温分解最熟悉的是过氧化氢，双氧水涂在伤口上冒出的气泡就是它放出的氧。通电分解水要加少量稀硫酸或氢氧化钠增强导电，正极出氧气、负极出氢气，体积比 1:2（质量比 8:1，因为氧气分子量更大），口诀「负氢正氧、氢二氧一」；这个实验是「化学变化中分子可分、原子不可分」的最佳证据，也是水中氢氧组成比例的来源。高温煅烧石灰石既是工业制生石灰的方法，也是分解反应在工业生产中的落点，同一条反应在「碳及其化合物」与「化学与工程」里还会出现，注意口径一致。碳酸、碳酸氢钠这类也易分解：碳酸常温就在缓慢分解所以汽水要冷藏拧紧盖，碳酸氢钠受热约 150 ℃ 就分出 CO₂，这是焙制糕点时它做膨松剂的原理（见「碳酸氢钠受热分解」）。",            en: "Decomposition is the mirror of synthesis: one into many, where a single reactant yields two or more products, and the test is only whether the reactant was unique. Energy supplies the sorting key, so the school course splits it into heat-driven, current-driven and room-temperature paths. The two heated oxygen preparations behave differently: potassium permanganate breaks down on its own into three products and needs a cotton plug at the mouth so no powder enters the delivery tube, while potassium chlorate must be ground with manganese dioxide and yields only potassium chloride plus oxygen — after the reaction, adding water, filtering, washing and drying recovers the dioxide for reuse, which is the plainest evidence that a catalyst comes out unchanged in mass. One warning worth repeating: in the permanganate reaction the manganese dioxide is a product, not a catalyst (the reaction makes its own), whereas in chlorate and peroxide it is the catalyst; the same substance can hold different offices in different reactions. The cold route is hydrogen peroxide, whose fizzing on a wound is the oxygen escaping. Electrolysing water needs a little dilute sulfuric acid or sodium hydroxide to carry the current; oxygen collects at the positive pole and hydrogen at the negative in a 2:1 volume ratio (8:1 by mass, since oxygen molecules are heavier) — the chant puts hydrogen first and doubled. That experiment is the best proof that in a chemical change molecules divide but atoms do not, and it fixes the composition of water. Calcining limestone at high heat is both industry's source of quicklime and decomposition showing up in production; the same equation reappears under carbon and under chemical engineering, kept on purpose to the same numbers. Carbonic acid and sodium hydrogencarbonate decompose alike: soda fizzes slowly flat even cold, hence the capped bottle and the fridge, while bicarbonate parts with carbon dioxide near 150 °C, which is exactly why it raises a cake.",
          },
          tags: [
            { zh: "反应类型", en: "Reaction Type" },
            { zh: "制氧气", en: "Oxygen" },
          ],
        },
        {
          id: "single",
          subs: [
            {
              f: "Fe",
              name: { zh: "铁（片、丝、钉均可）", en: "Iron (blade, wire or nail)" },
              note: { zh: "这类反应里铁只到 +2 价，产物是浅绿色的亚铁盐。", en: "Iron stops at +2 here, giving the pale-green iron(II) salt." },
              role: "l",
            },
            {
              f: "CuSO₄",
              name: { zh: "硫酸铜溶液（蓝）", en: "Copper sulfate solution (blue)" },
              note: { zh: "蓝色由铜离子提供，铜被取走后蓝色就褪。", en: "The blue belongs to the copper ion; remove the copper and it fades." },
              role: "l",
            },
            {
              f: "Zn",
              name: { zh: "锌粒", en: "Zinc granules" },
              note: { zh: "与酸反应快慢适中，是实验室制氢气的药品。", en: "A workable pace with acid — the laboratory hydrogen reagent." },
              role: "l",
            },
            {
              f: "H₂SO₄",
              name: { zh: "稀硫酸", en: "Dilute sulfuric acid" },
              note: { zh: "只有稀的非氧化性酸才被置换出氢，浓硫酸与硝酸不行。", en: "Only dilute non-oxidising acids give hydrogen this way." },
              role: "l",
            },
            {
              f: "H₂",
              name: { zh: "氢气", en: "Hydrogen" },
              note: { zh: "既能被锌置换出来，又能反过来置换氧化铜里的铜。", en: "Freed by zinc, and itself the reducer that frees copper from its oxide." },
              role: "l",
            },
            {
              f: "CuO",
              name: { zh: "氧化铜（黑色）", en: "Copper oxide (black)" },
              note: { zh: "氢气还原它时先通氢后点灯，实验结束先熄灯续通氢。", en: "Gas on before flame, flame off before gas — the order protects the hot copper." },
              role: "l",
            },
            {
              f: "Cl₂",
              name: { zh: "氯气", en: "Chlorine" },
              note: { zh: "非金属活动性顺序：氯能置换溴，溴能置换碘。", en: "The non-metal series: chlorine displaces bromine, bromine displaces iodine." },
              role: "l",
            },
            {
              f: "NaBr",
              name: { zh: "溴化钠（溶液）", en: "Sodium bromide (solution)" },
              note: { zh: "无色溶液被氯气氧化后变橙黄，就是生成的溴单质。", en: "The colourless solution turns orange-yellow from the bromine formed." },
              role: "l",
            },
            {
              f: "FeSO₄",
              name: { zh: "硫酸亚铁", en: "Iron(II) sulfate" },
              note: { zh: "溶液由蓝变浅绿，是这条反应的现象证据。", en: "Blue to pale green is the visible evidence." },
              role: "r",
            },
            {
              f: "Cu",
              name: { zh: "铜（红色）", en: "Copper (red)" },
              note: { zh: "附着在铁片表面，所以铁片质最变重、溶液变轻。", en: "Plated onto the iron — the blade gains weight while the solution loses it." },
              role: "r",
            },
            {
              f: "ZnSO₄",
              name: { zh: "硫酸锌", en: "Zinc sulfate" },
              note: { zh: "留在溶液里，蒸干得白色晶体。", en: "Stays dissolved; evaporated it gives white crystals." },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "氢气还原氧化铜的另一种产物，管口会出现液滴。", en: "The other product; droplets form at the tube mouth." },
              role: "r",
            },
            {
              f: "NaCl",
              name: { zh: "氯化钠", en: "Sodium chloride" },
              note: { zh: "留在溶液里的盐，颜色看不出来。", en: "The salt left in solution, invisible by colour." },
              role: "r",
            },
            {
              f: "Br₂",
              name: { zh: "溴（橙黄）", en: "Bromine (orange-yellow)" },
              note: { zh: "水里溶了溴就是那个颜色，加四氯化碳振荡会沉到下层。", en: "Dissolved colour in water; with carbon tetrachloride it sinks to the lower layer." },
              role: "r",
            },
          ],
          icon: "🔁",
          term: { zh: "置换反应", en: "Single Replacement" },
          level: 1,
          oneLiner: {
            zh: "活泼单质把不活泼元素从它的化合物里顶出来（A + BC → AC + B）。",
            en: "A livelier element displaces a lazier one from its compound (A + BC → AC + B).",
          },
          eq: [
            {
              lhs: "Fe + CuSO₄",
              cond: { zh: "铁片入蓝色溶液", en: "iron into the blue solution" },
              rhs: "FeSO₄ + Cu",
              rel: "equal",
            },
            {
              lhs: "Zn + H₂SO₄",
              cond: { zh: "常温，实验室制氢", en: "room temperature; lab hydrogen" },
              rhs: "ZnSO₄ + H₂↑",
              rel: "equal",
            },
            {
              lhs: "H₂ + CuO",
              cond: { zh: "加热，先通氢后点灯", en: "heated; gas first, then flame" },
              rhs: "Cu + H₂O",
              rel: "equal",
            },
            {
              lhs: "Cl₂ + 2NaBr",
              cond: { zh: "溶液中，转橙黄", en: "in solution; turns orange-yellow" },
              rhs: "2NaCl + Br₂",
              rel: "equal",
            },
          ],
          detail: {
            zh: "置换反应的形状很固定：一种单质和一种化合物反应，生成另一种单质和另一种化合物，写成 A + BC → AC + B。因为两边都有单质，化合价一定变，所以「置换反应一定是氧化还原反应」，四大类型里只有它这样。能不能发生完全看活动性，而金属和非金属各有一套顺序。金属那套就是钾钙钠镁铝锌铁锡铅（氢）铜汞银铂金，它管两件事：排在氢前面的金属能把稀盐酸、稀硫酸里的氢置换出来，以及位置靠前的金属能把靠后的金属从它的盐溶液里置换出来（盐必须可溶），具体判读与三个常见坑列在「金属活动性顺序」一条，包括钾钙钠进盐溶液会先与水反应而换不出金属。两条补充判据值得单独记：一、铁在这类反应里只到 +2 价，所以铁与硫酸铜得到的是浅绿的硫酸亚铁而不是黄色的硫酸铁，只有遇到氯气这种强氧化剂才升到 +3（2Fe + 3Cl₂，点燃）；二、把铁片伸进硫酸铜溶液，铁片上镀了铜反而变重、溶液反而变轻，因为每溶进去 56 份质量的铁就析出 64 份质量的铜，这类「反应前后烧杯总质量不变、但固体与溶液各自变重变轻」的题只能靠相对原子质量算。非金属也有自己的置换：氢气还原氧化铜（H₂ + CuO 加热得铜和水）是初中唯一认真学过的非金属置换，实验必须先通一会儿氢再点灯，先把装置里的空气排净否则加热时可能爆炸，而实验完毕要先熄灯继续通氢到冷却，否则刚生成的红热铜又被空气中的氧氧化回黑色；氯气能从溴化钠里置换出溴、溴又能从碘化钾里置换出碘，这个递降的序列在高中用来比较卤素的氧化性。历史上宋代的「胆水浸铜」（曾青得铁则化为铜）用的就是铁置换铜，今天叫湿法冶金，详见「金属活动性顺序」与「化学与工程」。",            en: "The shape of a displacement never varies: one element plus one compound gives a different element and a different compound, written A + BC → AC + B. Because a free element appears on both sides, valences must move, which makes every displacement a redox reaction — the only one of the four basic types with that guarantee. Whether it happens is settled entirely by activity, and metals and non-metals keep separate lists. The metal list runs potassium to gold and governs two questions: metals above hydrogen release hydrogen from dilute hydrochloric and dilute sulfuric acid, and a front metal displaces a back one from its salt solution, the salt being dissolved. The reading and its three classic traps are laid out under the reactivity series, including potassium, calcium and sodium attacking the water first. Two further judgments deserve their own line. First, iron lands at +2, so iron with copper sulfate gives pale-green iron(II) sulfate rather than the yellow iron(III) salt; only a strong oxidiser such as chlorine drives it to +3 (burning in chlorine, 2Fe + 3Cl₂). Second, dip a blade of iron into copper sulfate and it gains weight while the solution loses it, because every 56 parts of iron that dissolve throw down 64 parts of copper — problems of that shape cannot be answered without relative atomic masses, even though the beaker's total never changes. Non-metals displace too: hydrogen over hot copper oxide is the one case the junior course takes seriously, and there the gas must be passed before the lamp is lit (otherwise the air in the tube may explode) and kept flowing after the lamp is out (otherwise the glowing copper is re-oxidised black). Chlorine frees bromine from sodium bromide and bromine frees iodine from potassium iodide, a descending order used in the senior course to rank the halogens as oxidisers. The Song-dynasty 'leaching copper from vitriol water' was iron displacing copper — today the ancestor of hydrometallurgy, and taken up under the reactivity series and under chemical engineering.",
          },
          tags: [
            { zh: "反应类型", en: "Reaction Type" },
            { zh: "氧化还原", en: "Redox" },
          ],
        },
        {
          id: "double",
          subs: [
            {
              f: "Na₂CO₃",
              name: { zh: "碳酸钠（纯碱、苏打）", en: "Sodium carbonate (soda ash)" },
              note: { zh: "是盐不是碱，遇酸立即冒气泡。", en: "A salt, not a base, yet it fizzes at once with acid." },
              role: "l",
            },
            {
              f: "HCl",
              name: { zh: "盐酸", en: "Hydrochloric acid" },
              note: { zh: "酸参与时对方可以不溶，这是复分解的一条例外通道。", en: "With acid present the partner may be insoluble — one of the exceptions." },
              role: "l",
            },
            {
              f: "Ca(OH)₂",
              name: { zh: "氢氧化钙（石灰水）", en: "Calcium hydroxide (lime water)" },
              note: { zh: "与碳酸钠同煮是工业苛化制烧碱的老办法。", en: "Boiled with soda ash, it is the old causticising route to lye." },
              role: "l",
            },
            {
              f: "BaCl₂",
              name: { zh: "氯化钡", en: "Barium chloride" },
              note: { zh: "检验硫酸根常用它，白色沉淀不溶于稀硝酸。", en: "The usual test for sulfate: a white solid insoluble in dilute nitric acid." },
              role: "l",
            },
            {
              f: "Na₂SO₄",
              name: { zh: "硫酸钠", en: "Sodium sulfate" },
              note: { zh: "与氯化钡相遇即出 BaSO₄，医疗上钡餐用的是它而不是氯化钡。", en: "With barium chloride it gives BaSO₄; a 'barium meal' uses this, never the chloride." },
              role: "l",
            },
            {
              f: "CuO",
              name: { zh: "氧化铜（黑色）", en: "Copper oxide (black)" },
              note: { zh: "不溶于水的金属氧化物，但能溶于酸生成蓝色溶液。", en: "An insoluble oxide that nonetheless dissolves in acid to a blue solution." },
              role: "l",
            },
            {
              f: "H₂SO₄",
              name: { zh: "稀硫酸", en: "Dilute sulfuric acid" },
              note: { zh: "除铁锈、溶解氧化铜靠的都是它，同时与氧化铜发生复分解。", en: "It strips rust and dissolves copper oxide — both double decompositions." },
              role: "l",
            },
            {
              f: "NaCl",
              name: { zh: "氯化钠", en: "Sodium chloride" },
              note: { zh: "留在溶液里，蒸发结晶得到。", en: "Left in solution; got back by evaporation." },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "生成水就是复分解的第三个出口，中和反应走这一条。", en: "Forming water is the third exit — the route neutralisation takes." },
              role: "r",
            },
            {
              f: "CO₂↑",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: { zh: "第二个出口是气体，碳酸盐遇酸就走这一条。", en: "The gas exit — carbonates take this one with acid." },
              role: "r",
            },
            {
              f: "CaCO₃↓",
              name: { zh: "碳酸钙（白色沉淀）", en: "Calcium carbonate (white solid)" },
              note: { zh: "既是石灰水变浑浊的东西，也是这个反应能发生的理由。", en: "What clouds lime water, and the reason this reaction runs at all." },
              role: "r",
            },
            {
              f: "NaOH",
              name: { zh: "氢氧化钠（烧碱）", en: "Sodium hydroxide (caustic soda)" },
              note: { zh: "因碳酸钙沉淀下来而留在溶液里，蒸发即得粗碱。", en: "Stays dissolved as the carbonate drops out; evaporate for crude lye." },
              role: "r",
            },
            {
              f: "BaSO₄↓",
              name: { zh: "硫酸钡（白色，不溶于酸）", en: "Barium sulfate (white, acid-fast)" },
              note: { zh: "既不溶于水也不溶于酸，所以既不能与酸再生成气体也洗不掉。", en: "Insoluble in water and in acid alike, so it cannot be redissolved." },
              role: "r",
            },
            {
              f: "CuSO₄",
              name: { zh: "硫酸铜（蓝色溶液）", en: "Copper sulfate (blue solution)" },
              note: { zh: "黑色粉末消失、溶液转蓝，说明氧化铜溶掉了。", en: "The black vanishes and the liquid turns blue — the oxide has gone into solution." },
              role: "r",
            },
          ],
          icon: "🔄",
          term: { zh: "复分解反应", en: "Double Replacement" },
          level: 2,
          oneLiner: {
            zh: "两种化合物交换成分（AB + CD → AD + CB），价态全不变。",
            en: "Two compounds trade partners (AB + CD → AD + CB) with no valence change.",
          },
          eq: [
            {
              lhs: "Na₂CO₃ + 2HCl",
              cond: { zh: "常温，立即冒气泡", en: "room temperature; fizzes at once" },
              rhs: "2NaCl + H₂O + CO₂↑",
              rel: "equal",
            },
            {
              lhs: "Ca(OH)₂ + Na₂CO₃",
              cond: { zh: "溶液中，生成白色沉淀", en: "in solution; a white solid falls" },
              rhs: "CaCO₃↓ + 2NaOH",
              rel: "equal",
            },
            {
              lhs: "BaCl₂ + Na₂SO₄",
              cond: { zh: "溶液中，白色不溶于酸", en: "in solution; acid-fast white solid" },
              rhs: "BaSO₄↓ + 2NaCl",
              rel: "equal",
            },
            {
              lhs: "CuO + H₂SO₄",
              cond: { zh: "微热，黑粉消失转蓝", en: "warmed; the black goes, blue appears" },
              rhs: "CuSO₄ + H₂O",
              rel: "equal",
            },
          ],
          figure: `<svg viewBox="0 0 360 208" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="14" font-size="11" fill="currentColor">复分解能否发生：先看生成物，再看反应物</text>
  <line x1="6" y1="20" x2="354" y2="20" stroke="currentColor" stroke-opacity="0.25"/>
  <g font-size="8" fill="#d4a017">
    <text x="6" y="36">出口一 · 生成沉淀 ↓</text>
    <text x="150" y="36">出口二 · 生成气体 ↑</text>
    <text x="286" y="36">出口三 · 生成水</text>
  </g>
  <g font-size="8" fill="currentColor">
    <text x="6" y="52">白不溶于酸：BaSO₄、AgCl</text>
    <text x="150" y="52">CO₂↑：碳酸盐 + 酸</text>
    <text x="286" y="52">酸 + 碱 → 盐 + H₂O</text>
    <text x="6" y="68">白溶于酸：CaCO₃、BaCO₃</text>
    <text x="150" y="68">NH₃↑：铵盐 + 碱（研磨也行）</text>
    <text x="286" y="68">酸 + 金属氧化物</text>
    <text x="6" y="84">白胶状：Mg(OH)₂、Al(OH)₃</text>
    <text x="150" y="84">三个出口占一个即可</text>
    <text x="286" y="84">三者皆无 → 不反应</text>
    <text x="6" y="100">蓝：Cu(OH)₂　红褐：Fe(OH)₃</text>
  </g>
  <line x1="6" y1="110" x2="354" y2="110" stroke="currentColor" stroke-opacity="0.25"/>
  <g font-size="8" fill="currentColor" fill-opacity="0.75">
    <text x="6" y="126">反应物门槛：盐 + 盐、盐 + 碱 → 两边都得溶</text>
    <text x="6" y="142">有酸参与：碱与金属氧化物可以不溶（如 CuO、Fe₂O₃ 溶酸）</text>
    <text x="6" y="158">反例：NaOH + KCl 三种出口全无 → 不反应</text>
    <text x="6" y="174">判定用「酸碱盐溶解性表」，见速查表模块</text>
  </g>
  <text x="6" y="190" font-size="8.5" fill="#e5484d">⚠ 交换成分而化合价全不变，所以复分解一定不是氧化还原</text>
  <text x="6" y="202" font-size="6.5" fill="currentColor" fill-opacity="0.6">Partners swap, valences stay put — never redox</text>
</svg>`,
          detail: {
            zh: "复分解是两种化合物互相交换成分，生成另外两种化合物，写成 AB + CD → AD + CB：阴阳离子换了搭档，但「每种元素的化合价前后完全不变」，所以复分解一定不属于氧化还原反应——这是它最好用的判据。它能不能发生，不看反应物多活泼，只看生成物里有没有下面三样之一：沉淀、气体或水。初中要求按溶解性表背下的沉淀清单不长，按颜色记最快：白色且不溶于稀硝酸的只有两个，BaSO₄ 与 AgCl（所以检验硫酸根用氯化钡加稀硝酸、检验氯离子用硝酸银加稀硝酸，都不会被碳酸根干扰）；白色但溶于酸的有 CaCO₃、BaCO₃、Mg(OH)₂；蓝色的絮状是 Cu(OH)₂，红褐色絮状是 Fe(OH)₃，这两种都是可溶盐与碱溶液现生成的。气体这个出口主要集中在两处：碳酸盐或碳酸氢盐遇酸放 CO₂（所以鸡蛋壳、水垢、小苏打都能被醋或盐酸“吃掉”），以及铵盐与碱共热或研磨放 NH₃（这是检验铵态氮肥的方法，也是草木灰不能与铵态氮肥混施的原因）。水这个出口就是中和反应与酸溶解金属氧化物。第二道门槛在反应物一侧：两种盐互相反应、或盐与碱反应时，两边必须都可溶，因为反应本质上是自由离子的重新配对，固体里离子不动就没法交换；而只要有酸参与，对方可以不溶，稀硫酸能溶解不溶的氧化铜与氢氧化铜同理。最常见的错句是“任两种化合物相遇就反应”：NaOH 溶液与 KCl 溶液混合什么也不会发生，因为既无沉淀也无气体也无水生成——不能拿符号看着像就写反应，必须先查溶解性表。三大家常写法要背熟：除水垢（主要成分 CaCO₃ 与 Mg(OH)₂，用盐酸或醋酸）、石灰水与纯碱制烧碱（上式第三条，工业上叫苛化法）、氯化钡检硫酸根。还有一个高频陷阱靠它解决：中和反应是复分解的特例，但生成盐和水的反应不一定是中和，CO₂ 与 NaOH 生成 Na₂CO₃ 与 H₂O 就不是，因为反应物里根本没有酸——它是非金属氧化物与碱的反应。复分解在高中叫离子反应，拆写成离子方程式后“谁真正参加了反应”一眼可见，例如 BaCl₂ 与 Na₂SO₄ 的实质就是 Ba²⁺ + SO₄²⁻ → BaSO₄↓，与「常见离子的检验」一条口径一致。",            en: "A double decomposition trades partners between two compounds, written AB + CD → AD + CB: the cations and anions change associates while every element keeps the same valence throughout, which is the single most useful test — no double decomposition is ever redox. Whether it runs depends not on how eager the reactants are but on whether one of three things appears among the products: a precipitate, a gas, or water. The precipitate list the junior course expects is short if it is filed by colour. Only two are white and proof against dilute nitric acid, barium sulfate and silver chloride, which is why sulfate is tested with barium chloride plus nitric acid and chloride with silver nitrate plus nitric acid — carbonate cannot disturb either. White but acid-soluble are calcium carbonate, barium carbonate and magnesium hydroxide; the blue floc is copper hydroxide and the rust-brown floc is iron(III) hydroxide, both made on the spot from a soluble salt and alkali. The gas exit clusters in two places: carbonates and hydrogen carbonates with acid, releasing carbon dioxide (which is how vinegar or hydrochloric acid eats shell, scale and bicarbonate), and ammonium salts with alkali, warmed or ground together, giving ammonia — the test for ammonium nitrogen fertiliser and the reason ash must not be stored with it. The water exit is neutralisation together with acid dissolving a metal oxide. A second threshold sits on the reactant side: when two salts react, or a salt with a base, both must be dissolved, because the reaction is a re-pairing of free ions and ions locked in a solid cannot move; with an acid present the other side may be insoluble, which is why dilute sulfuric acid can take up copper oxide. The commonest false sentence is that any two compounds will react: mixing sodium hydroxide and potassium chloride solutions does nothing at all, since no precipitate, gas or water forms, and no amount of eye-matching symbols substitutes for the solubility table. Three household equations deserve memorising: dissolving kettle scale (calcium carbonate and magnesium hydroxide, with hydrochloric acid or vinegar), making caustic soda from lime water and washing soda (the third equation here, causticising in industry), and testing sulfate with barium chloride. One standing trap clears the same way: neutralisation is a special case of double decomposition, but a reaction yielding salt and water is not necessarily neutralisation — carbon dioxide with sodium hydroxide gives sodium carbonate and water with no acid among the reactants, so it is simply a non-metal oxide and a base. In the senior course double decomposition becomes ionic reaction, and the ionic form shows at a glance who actually takes part: barium chloride with sodium sulfate is really Ba²⁺ + SO₄²⁻ → BaSO₄↓, kept identical to the ion-test entry.",
          },
          tags: [
            { zh: "反应类型", en: "Reaction Type" },
            { zh: "离子反应", en: "Ionic" },
          ],
        },
        {
          id: "combustion",
          subs: [
            {
              f: "CH₄",
              name: { zh: "甲烷（天然气、沼气的主要成分）", en: "Methane (natural and marsh gas)" },
              note: { zh: "最简单的有机物，燃烧火焰呈蓝色，点燃前必须验纯。", en: "The simplest organic fuel; blue flame, and it must be tested for purity." },
              role: "l",
            },
            {
              f: "O₂",
              name: { zh: "氧气（助燃剂）", en: "Oxygen (the supporter)" },
              note: { zh: "本身不可燃，只是让别的物质烧得更旺。", en: "Not itself burning — it only makes other things burn harder." },
              role: "l",
            },
            {
              f: "S",
              name: { zh: "硫（淡黄色固体）", en: "Sulfur (pale yellow solid)" },
              note: { zh: "在空气里是微弱的淡蓝火焰，在纯氧中转明亮蓝紫并刺鼻。", en: "A faint blue bead in air, a bright violet-blue and a sting in pure oxygen." },
              role: "l",
            },
            {
              f: "Mg",
              name: { zh: "镁条", en: "Magnesium ribbon" },
              note: { zh: "能在二氧化碳里继续燃烧，所以镁火不能用二氧化碳灭。", en: "It keeps burning in carbon dioxide — hence no CO₂ extinguisher on magnesium." },
              role: "l",
            },
            {
              f: "CO₂",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: { zh: "对大多数物质它是灭火剂，对镁却是氧化剂。", en: "An extinguisher for most things, an oxidiser for magnesium." },
              role: "l",
            },
            {
              f: "Na",
              name: { zh: "钠", en: "Sodium" },
              note: { zh: "在氯气里剧烈燃烧冒白烟，说明燃烧不一定需要氧气。", en: "It burns fiercely in chlorine with white smoke — oxygen is not required." },
              role: "l",
            },
            {
              f: "Cl₂",
              name: { zh: "氯气", en: "Chlorine" },
              note: { zh: "有毒，这条演示要在通风下做。", en: "Toxic; run this demonstration ventilated." },
              role: "l",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "烧碱与石灰乳也能吸水，所以灭火用后者更有效。", en: "Alkali and lime slurries also soak water up, which is why they beat plain water." },
              role: "r",
            },
            {
              f: "SO₂",
              name: { zh: "二氧化硫", en: "Sulfur dioxide" },
              note: { zh: "刺鼻且造成酸雨，集气瓶里的水就是为吸收它。", en: "Pungent and the cause of acid rain; the water in the bottle exists to soak it up." },
              role: "r",
            },
            {
              f: "MgO",
              name: { zh: "氧化镁（白色）", en: "Magnesium oxide (white)" },
              note: { zh: "燃烧后留下的白色粉末，也是耐高温材料。", en: "The white ash left behind, and a refractory with it." },
              role: "r",
            },
            {
              f: "C",
              name: { zh: "碳（黑色）", en: "Carbon (black)" },
              note: { zh: "镁把二氧化碳里的碳夺了出来，这就是产物里的黑点。", en: "Magnesium strips the carbon out of the dioxide — the black specks." },
              role: "r",
            },
            {
              f: "NaCl",
              name: { zh: "氯化钠（白烟）", en: "Sodium chloride (white smoke)" },
              note: { zh: "固体小颗粒分散在空气里就是烟，区别于雾（液体）。", en: "Solid specks in air are smoke; droplets would be fog." },
              role: "r",
            },
          ],
          icon: "🔥",
          term: { zh: "燃烧与灭火", en: "Combustion and Firefighting" },
          level: 1,
          oneLiner: {
            zh: "可燃物与氧气发生发光放热的剧烈氧化；三条件缺一不燃。",
            en: "Vigorous oxidation giving light and heat; three conditions, all required.",
          },
          eq: [
            {
              lhs: "CH₄ + 2O₂",
              cond: { zh: "点燃，蓝色火焰", en: "ignited; blue flame" },
              rhs: "CO₂ + 2H₂O",
              rel: "equal",
            },
            {
              lhs: "S + O₂",
              cond: { zh: "点燃，瓶底留少量水", en: "ignited; water left in the bottle" },
              rhs: "SO₂",
              rel: "equal",
            },
            {
              lhs: "2Mg + CO₂",
              cond: { zh: "点燃，继燃并出黑点", en: "ignited; it keeps burning, black specks appear" },
              rhs: "2MgO + C",
              rel: "equal",
            },
            {
              lhs: "2Na + Cl₂",
              cond: { zh: "点燃，浓白烟", en: "ignited; dense white smoke" },
              rhs: "2NaCl",
              rel: "equal",
            },
          ],
          figure: `<svg viewBox="0 0 360 196" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="14" font-size="11" fill="currentColor">燃烧三条件缺一不燃，灭火只需破其一</text>
  <line x1="6" y1="20" x2="354" y2="20" stroke="currentColor" stroke-opacity="0.25"/>
  <line x1="180" y1="26" x2="180" y2="128" stroke="currentColor" stroke-opacity="0.2"/>
  <g font-size="8.5" fill="#d4a017">
    <text x="6" y="34">同侧具备 → 燃烧</text>
    <text x="190" y="34">破一即可 → 熄灭</text>
  </g>
  <g font-size="8" fill="currentColor">
    <text x="6" y="50">① 是可燃物</text>
    <text x="6" y="66">② 与氧气（或空气）接触</text>
    <text x="6" y="82">③ 温度达到着火点</text>
    <text x="6" y="104">对照实验：铜片上白磷与红磷</text>
    <text x="6" y="118">同受热，白磷燃而红磷不燃</text>
    <text x="190" y="50">清除、隔离可燃物</text>
    <text x="190" y="66">森林防火隔离带、关阀门</text>
    <text x="190" y="82">隔绝氧气</text>
    <text x="190" y="98">盖沙、锅盖、CO₂、泡沫</text>
    <text x="190" y="114">降温到着火点以下</text>
    <text x="190" y="128">水只能灭一般可燃物火灾</text>
  </g>
  <line x1="6" y1="136" x2="354" y2="136" stroke="currentColor" stroke-opacity="0.25"/>
  <g font-size="8" fill="currentColor" fill-opacity="0.75">
    <text x="6" y="152">烧得更旺两条途径：增大氧浓度 / 增大接触面积（蜂窝煤、架空木柴）</text>
    <text x="6" y="166">爆炸：有限空间内急速燃烧，气体或粉尘达爆炸极限</text>
  </g>
  <text x="6" y="182" font-size="8.5" fill="#e5484d">⚠ 着火点是物质固有属性，只能说「降到着火点以下」</text>
  <text x="6" y="193" font-size="6.5" fill="currentColor" fill-opacity="0.6">A kindling point belongs to the substance; water cools below it, never "lowers" it</text>
</svg>`,
          detail: {
            zh: "狭义燃烧的定义里有三个关键词必须同时出现：可燃物、氧气（或空气）、发光放热的剧烈氧化反应。而“能不能烧”只看三个条件是不是同时具备：一、物质本身可燃（砂子、水、碳酸钠都不燃，所以二氧化碳与它们才能用来灭火）；二、与氧气或空气接触（熄灭酒精灯要用灯帽盖而不能用嘴吹，盖一次不行就再盖一次，目的就是隔绝空气）；三、温度达到着火点。中学最经典的那张对照图是铜片上的实验：铜片一边放白磷、一边放红磷，下面烧杯里是热水（一般约 80 ℃），结果白磷燃而红磷不燃——因为白磷着火点约 40 ℃ 而红磷约 240 ℃，同样的温度只够点燃前者；如果再把第三块白磷沉到热水底部不给它空气，它也不燃，三个条件就这么被拆开验证了。这里必须盯住一个高频错句：可以说「用水把温度降到着火点以下」，绝不能说「降低着火点」——着火点是物质自己的属性，给水给沙都改不了它，能改的只是实际温度。同理，木柴架空、火越扇越旺、把煤做成蜂窝、工地上把油喷成雾状，这些全都是「增大可燃物与氧气的接触面积」而不是降低着火点；而「向炉子里鼓入空气或纯氧」则是增大氧气浓度。促进燃烧只有这两条途径，能把它说清就算掌握。燃烧不一定需要氧气，这是高中一句话就能把学生推翻初中定义的例子：镁条能在二氧化碳中继续燃烧（上式第三条，所以镁、铝粉着火不能用二氧化碳灭火器，只能用沙土覆盖），钠能在氯气里燃烧生成白烟氯化钠，因此广义燃烧是「任何发光放热的剧烈化学反应」。完全与不完全燃烧的区分只看氧气给得够不够：同是碳，充足时得 CO₂、不足时得 CO，而 CO 无色无味、与血红蛋白的结合能力远高于氧，冬天烧煤取暖、关着车门在车库里长时间怠速都是真实中毒场景，发现后先开窗、把人移到通风处、不要开灯或点火查看（见「碳及其化合物」）。爆炸是急速燃烧在有限空间里的结果，所以可燃性气体点燃前一律要验纯（氢气、一氧化碳、甲烷都是），面粉厂与煤矿并不要明火也能出事——悬浮的粉尘本身就有极大表面积，这就是粉尘爆炸；加油站与油库的标志包括严禁烟火与禁止使用易产生火花的工具。缓慢氧化不发光但放热，铁生锈、食物腐败、呼吸作用都属于它，堆得太多的湿草、煤堆、浸油棉纱会因为散热不及时而升温自燃，这也是「自燃」的成因。灭火后还要防复燃，而「三要素缺一不燃、灭火只需破一」就是全部理论。",            en: "The narrow definition carries three words that must appear together: a combustible substance, oxygen or air, and a vigorous oxidation that gives off light and heat. Whether something will burn comes down to three conditions met at once. It must be burnable at all — sodium carbonate, sand and water are not, which is why carbon dioxide and those materials can serve as extinguishers. It must touch oxygen or air — a burning alcohol lamp is put out with its cap rather than blown out, and recapped a second time if needed, the point being to shut the air off. And its temperature must reach the kindling point. The classic classroom picture is the copper sheet: white phosphorus at one end and red phosphorus at the other, over hot water near 80 °C, so the white kind lights and the red does not, because their kindling points are roughly 40 °C and 240 °C; submerge a third piece of white phosphorus in the water, away from air, and it too stays unlit — that is how the three conditions are taken apart and proved. One sentence must be pinned here, because it is the commonest error: you may cool the substance below its kindling point with water, but you can never 'lower the kindling point', which belongs to the substance and answers neither to water nor to sand. By the same logic, stacking firewood loosely, fanning a fire, boring holes in a coal briquette and atomising oil in a burner all work by enlarging the contact area with air, not by touching the kindling point, while blowing air or oxygen into a furnace raises its concentration. Those are the only two ways to make burning fiercer, and stating them cleanly is the whole requirement. Burning does not always need oxygen, the one senior-course example that overturns the junior definition: magnesium continues to burn in carbon dioxide (the third equation above, which is why burning magnesium or aluminium powder must be smothered with sand and never with a CO₂ extinguisher), and sodium burns in chlorine with a white smoke of sodium chloride — so the broad definition is any chemical reaction that is vigorous and gives light and heat. Complete or incomplete burning depends only on whether the oxygen was enough: carbon gives carbon dioxide in plenty and carbon monoxide when short, and carbon monoxide, colourless and odourless, is held by blood far more tightly than oxygen, so a winter stove or a car idling in a closed garage are real poisoning scenes — open the windows, move the person out, do not switch on a light or look for a flame (see carbon and its compounds). An explosion is rapid burning in a confined space, which is why every combustible gas — hydrogen, carbon monoxide, methane — is tested for purity before lighting, and why flour mills and coal mines come to grief without any open flame: suspended dust is itself an enormous surface, and that is a dust explosion, hence the notices at a petrol station about naked lights and spark-producing tools. Slow oxidation gives no light but does give heat: rusting, rotting and breathing are all of it, and a damp haystack, a coal heap or an oil-soaked rag left in a pile can warm itself into spontaneous combustion because the heat cannot escape. Extinguish, then guard against rekindling — three conditions all needed to burn, one broken is enough to stop.",
          },
          tags: [
            { zh: "反应类型", en: "Reaction Type" },
            { zh: "安全常识", en: "Safety" },
          ],
        },
        {
          id: "neutralization",
          subs: [
            {
              f: "HCl",
              name: { zh: "盐酸", en: "Hydrochloric acid" },
              note: { zh: "胃液里本来就含有它，过多时才需要药物中和。", en: "Naturally present in gastric juice; only its excess needs treating." },
              role: "l",
            },
            {
              f: "NaOH",
              name: { zh: "氢氧化钠（强碱）", en: "Sodium hydroxide (strong base)" },
              note: { zh: "腐蚀性强，做中和热实验时浓度要量取准确。", en: "Corrosive; measure its concentration carefully in a heat-of-neutralisation run." },
              role: "l",
            },
            {
              f: "H₂SO₄",
              name: { zh: "硫酸", en: "Sulfuric acid" },
              note: { zh: "二元酸，中和 1 份它要 2 份氢氧化钠。", en: "Dibasic: two parts of soda are needed for one part of it." },
              role: "l",
            },
            {
              f: "Ca(OH)₂",
              name: { zh: "氢氧化钙（熟石灰）", en: "Calcium hydroxide (slaked lime)" },
              note: { zh: "便宜且不刺激，所以用来改酸性土壤而不是用烧碱。", en: "Cheap and mild, so it amends acid soil where caustic soda would not." },
              role: "l",
            },
            {
              f: "Al(OH)₃",
              name: { zh: "氢氧化铝（两性氢氧化物）", en: "Aluminium hydroxide (amphoteric)" },
              note: { zh: "碱性弱、不溶于水，是常见的抗酸胃药成分。", en: "Mild and insoluble, which is what an antacid needs." },
              role: "l",
            },
            {
              f: "NaCl",
              name: { zh: "氯化钠（食盐）", en: "Sodium chloride (table salt)" },
              note: { zh: "中和的产物是盐和水，这里的盐就是 NaCl。", en: "Neutralisation gives salt and water, and this salt is table salt." },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "H⁺ 与 OH⁻ 结合成水就是中和的实质，也是放热的来源。", en: "H⁺ and OH⁻ meeting as water is the substance of neutralisation and the source of the heat." },
              role: "r",
            },
            {
              f: "Na₂SO₄",
              name: { zh: "硫酸钠", en: "Sodium sulfate" },
              note: { zh: "工厂酸性废水用石灰中和后留下的就是这类盐。", en: "The salt left after lime treats an acidic works effluent." },
              role: "r",
            },
            {
              f: "CaCl₂",
              name: { zh: "氯化钙", en: "Calcium chloride" },
              note: { zh: "易溶，也常做干燥剂（但不能干氨气）。", en: "Very soluble, and a common desiccant — though not for ammonia." },
              role: "r",
            },
            {
              f: "AlCl₃",
              name: { zh: "氯化铝", en: "Aluminium chloride" },
              note: { zh: "溶于水后溶液显酸性，所以“恰好中和”不等于 pH = 7。", en: "Its solution is acidic, so 'exactly neutralised' need not mean pH 7." },
              role: "r",
            },
          ],
          icon: "🧪",
          term: { zh: "中和反应", en: "Neutralization" },
          level: 1,
          oneLiner: {
            zh: "酸与碱作用生成盐和水，是复分解的特例，放热。",
            en: "Acid plus base gives salt and water — a heat-giving special case of double decomposition.",
          },
          eq: [
            {
              lhs: "HCl + NaOH",
              cond: { zh: "滴酚酞，红色恰好变无色", en: "with phenolphthalein, the red just vanishes" },
              rhs: "NaCl + H₂O",
              rel: "equal",
            },
            {
              lhs: "H₂SO₄ + 2NaOH",
              cond: { zh: "溶液中，放热", en: "in solution; gives off heat" },
              rhs: "Na₂SO₄ + 2H₂O",
              rel: "equal",
            },
            {
              lhs: "Ca(OH)₂ + 2HCl",
              cond: { zh: "中和酸性废水与土壤", en: "amending acid soil and effluent" },
              rhs: "CaCl₂ + 2H₂O",
              rel: "equal",
            },
            {
              lhs: "Al(OH)₃ + 3HCl",
              cond: { zh: "胃药中过多的胃酸", en: "antacid action on stomach acid" },
              rhs: "AlCl₃ + 3H₂O",
              rel: "equal",
            },
          ],
          detail: {
            zh: "中和反应只认一件事：酸与碱作用生成盐和水，所以它是复分解反应的一个特例，而且是最常用的一个——判定时记住它两个限定：反应物必须是「酸和碱」（不是盐和酸、不是氧化物和碱），生成物除了盐与水以外不能再有第三种。写方程式配平时要尤其留意像硫酸这样的二元酸：1 份 H₂SO₄ 要 2 份 NaOH，因为一个硫酸分子能交出两个氢离子，这跟“价态”无关、只看能电离出几个 H⁺ 与 OH⁻。中和的实质在水溶液里是 H⁺ + OH⁻ → H₂O（高中把它写成离子方程式，也是“中和热”定义的基础），因而一定放热：把稀盐酸逐滴加入含酚酞的氢氧化钠溶液，除了看到红色逐渐变浅到恰好无色，用手摸烧杯外壁也能感到温度升高。这条滴定式的操作就是“怎么知道酸和碱恰好反应完”的标准答案：靠指示剂变色而不是靠猜测，而指示剂的选择与用量见速查表与「溶液与 pH」。应用面比理论宽，把它们当成一个清单记：农业上用熟石灰而不是烧碱改酸性土壤（便宜、不刺激、不会破坏土壤结构），但已施过铵态氮肥的地块要错开时间，因为碱会与铵盐放出氨、肥分就跑了（见「复分解反应」）；工业上用石灰中和酸性废水；医药上用氢氧化铝或碳酸氢钠中和过多胃酸（而碳酸氢钠会产生气体，所以胃溃疡患者禁用，见「钠及其化合物」）；生活上被蜂或蚊蜇咬后抹肥皂水，是因为它们注入的酸性物质能被碱性的肥皂水中和（若注入物呈碱性则改用食醋这类弱酸）。三个高频错句必须逐个拆开：“ pH = 7 就是恰好中和”——不一定，强酸弱碱盐（如本条的 AlCl₃）溶于水就显酸性，“恰好中和”指酸与碱按化学计量恰好完全反应，而溶液的酸碱性还要看生成的盐；“有盐和水生成的反应就是中和反应”——CO₂ 与 NaOH 生成 Na₂CO₃ 与 H₂O，产物看起来一样，但反应物里没有酸，所以不是中和（它是非金属氧化物与碱的反应，同样能用于吸收废气）；“中和与稀释是一回事”——把酸加水稀释只是把 H⁺ 浓度拉低，pH 无限接近 7 但不会越过 7，也除不掉 H⁺，而中和是真的把 H⁺ 变成了水。最后区分“中性”与“中和”：中性是对一种溶液酸碱性的描述（pH 与浓度、温度有关），中和是一个反应动作；碱溶液加酸后变中性才叫“恰好中和”，变无色只是酚酞失去了碱性环境。",            en: "Neutralisation recognises one thing only: an acid acting on a base to give salt and water, which makes it a special — and the most-used — case of double decomposition. Two limits decide every judgement: the reactants must be an acid and a base (not a salt with an acid, not an oxide with a base), and nothing besides salt and water may appear among the products. Weighing the formulae needs care with the two-proton acids: one molecule of sulfuric acid takes two of sodium hydroxide, because it can hand over two hydrogen ions — the count comes from how many H⁺ and OH⁻ the substance ionises, not from any valency trick. In solution the substance of it is H⁺ + OH⁻ → H₂O, which the senior course writes as an ionic equation and which is the basis of the definition of heat of neutralisation; heat is therefore always given out. Add dilute hydrochloric acid drop by drop to sodium hydroxide solution with phenolphthalein and, besides watching the red fade to colourless, you can feel the beaker warm — that manipulation is the standard answer to 'how do you know the two have exactly finished reacting': you trust an indicator's colour, not a guess. Indicators and their use are tabulated in the quick-reference module and under solutions and pH. The applications are broader than the theory and are worth keeping as a list: farmers amend acid soil with slaked lime rather than caustic soda (cheap, mild, and it will not ruin the soil), but a field already given ammonium fertiliser must be limed at a different time, since alkali drives ammonia off ammonium salts and the nitrogen is lost (see double decomposition); industry neutralises acidic effluent with lime; medicine uses aluminium hydroxide or sodium hydrogencarbonate against excess stomach acid, the bicarbonate being barred when an ulcer is present because it generates gas (see sodium and its compounds); a bee or mosquito sting is rubbed with soap solution because the injected venom is acid and soap is alkaline, while an alkaline sting calls for a weak acid such as vinegar. Three false sentences must be taken apart one by one. 'pH 7 means exactly neutralised' — not necessarily: a salt of strong acid and weak base, aluminium chloride in this entry, is acidic in water, so 'exactly neutralised' speaks of stoichiometric completion while the acidity of the result still depends on the salt formed. 'Any reaction giving salt and water is neutralisation' — carbon dioxide with sodium hydroxide yields sodium carbonate and water, products that look identical, yet no acid is among the reactants, so it is a non-metal oxide with a base and not neutralisation (and it serves to scrub waste gas just as well). 'Neutralising and diluting are the same' — diluting an acid only stretches out the H⁺ concentration, so pH creeps toward 7 and never crosses it and nothing is removed, whereas neutralisation actually converts the hydrogen ions into water. Finally separate 'neutral' from 'neutralise': neutral describes a solution's acid-base state (and depends on concentration and temperature), neutralise names an action; the solution is only neutralised when acid and base have met in stoichiometric amounts, and a colourless result merely says the alkaline environment that feeds phenolphthalein is gone.",
          },
          tags: [
            { zh: "反应类型", en: "Reaction Type" },
            { zh: "酸碱", en: "Acid-Base" },
          ],
        },
      ],
    },
    /* ===================== 实验方程式 ===================== */
    {
      key: "equations",
      icon: "📝",
      title: { zh: "常见实验方程式", en: "Common Lab Equations" },
      items: [
        {
          id: "eq-h2o2",
          subs: [
            {
              f: "2H₂O₂",
              name: { zh: "过氧化氢（双氧水）", en: "Hydrogen peroxide" },
              note: {
                zh: "无色液体，遇催化剂迅速分解放出氧。",
                en: "Colourless liquid; rapidly decomposes to release O₂ over a catalyst.",
              },
              role: "l",
            },
            {
              f: "MnO₂",
              name: {
                zh: "二氧化锰（黑色粉末）",
                en: "Manganese dioxide (black powder)",
              },
              note: {
                zh: "作催化剂，加快分解而自身不消耗。",
                en: "Catalyst; speeds decomposition without being consumed.",
              },
              role: "c",
            },
            {
              f: "2H₂O",
              name: { zh: "水", en: "Water" },
              note: {
                zh: "分解的另一产物。",
                en: "The other product of decomposition.",
              },
              role: "r",
            },
            {
              f: "O₂↑",
              name: { zh: "氧气", en: "Oxygen gas" },
              note: {
                zh: "能使带火星木条复燃，是收集目标。",
                en: "Relights a glowing splint; the gas being collected.",
              },
              role: "r",
            },
          ],
          icon: "🧪",
          term: { zh: "过氧化氢分解制氧气", en: "Oxygen from H₂O₂" },
          level: 1,
          oneLiner: {
            zh: "双氧水加二氧化锰催化，常温分解放出氧气。",
            en: "Hydrogen peroxide decomposes at room temperature over MnO₂ catalyst.",
          },
          eq: {
            lhs: "2H₂O₂",
            cond: { zh: "MnO₂（催化）", en: "MnO₂ (cat.)" },
            rhs: "2H₂O + O₂↑",
          },
          detail: {
            zh: "这是初中三种实验室制氧路线里唯一不需要加热的一条，所以发生装置走「固液不加热」那一类（与制 CO₂、制 H₂ 同一套，见「常见气体的实验室制取」）：锥形瓶里放二氧化锰，从分液漏斗滴加过氧化氢，拧着活塞控制滴速就能得到平稳气流，比一次性倒进去要好控制得多。为什么二氧化锰写在箭头上方而不是写进反应物？因为它是催化剂，反应前后质量和化学性质都不变，不参与配平；实验结束后往残留物里加足水溶解、过滤、洗涤、干燥，回收到的二氧化锰质量与加入时相同（氯化钾溶于水而二氧化锰不溶，这一步同时是「催化剂质量不变」最直接的验证）。从化合价看它是一类很有意思的反应：过氧化氢中氧是 −1 价，分解后一部分降到 −2（进入 H₂O）、一部分升到 0（变成 O₂），同一元素自己既升高又降低，这叫歧化；所以 2 分子过氧化氢只给 1 分子氧气，68 g 纯过氧化氢对应 32 g 氧气，别按「一个分子出一个氧」去算。三个易错处：一是把催化剂当生成物写到等号右边；二是以为只有二氧化锰能催化——氯化铁溶液、土豆和肝脏里的过氧化氢酶同样能催化，说明催化剂不唯一，而酶只在体温附近高效、高温会变性；三是浓度，医用双氧水约 3%，靠同样分解放出的新生态氧杀灭厌氧菌，浓度过高反而灼伤皮肤，做实验也不要擅自换成高浓度。最后记住检验方法：导管口气体能使带火星的木条复燃才是氧气，验满要把带火星木条放在集气瓶口。",
            en: "This is the only one of the three lab routes to oxygen that needs no heating, so the generator belongs to the solid-plus-liquid, no-heat family shared with CO2 and H2 (see Preparing Gases in the Lab): MnO2 sits in the flask and H2O2 is added from a dropping funnel, where turning the stopcock sets a steady stream instead of one violent burst. MnO2 is written above the arrow, not among the reactants, because a catalyst is unchanged in mass and chemical properties and takes no part in balancing; dissolving the residue in water, filtering, washing and drying recovers the same mass of MnO2 (KCl dissolves, MnO2 does not), which is the cleanest hands-on proof that a catalyst is not consumed. In oxidation-state terms this is a disproportionation: oxygen in H2O2 is -1, and after decomposition part of it drops to -2 in water while part rises to 0 in O2, so two formula units give only one oxygen molecule - 68 g of pure H2O2 yields 32 g of O2, not the one-to-one a careless reading suggests. Three common mistakes: putting the catalyst on the product side; assuming only MnO2 works, when FeCl3 solution and the catalase in potato or liver are just as effective, which shows catalysts are not unique and that enzymes only work near body temperature and are destroyed by heat; and ignoring concentration - medical hydrogen peroxide is about 3 percent, disinfecting anaerobes through the same freshly released oxygen, while stronger solutions burn skin. For testing, a glowing splint relighting at the delivery tube proves oxygen; for a full check hold the glowing splint at the mouth of the jar.",
          },
          tags: [{ zh: "制气", en: "Gas" }],
        },
        {
          id: "eq-kmno4",
          subs: [
            {
              f: "2KMnO₄",
              name: {
                zh: "高锰酸钾（紫黑色固体）",
                en: "Potassium permanganate (purple-black solid)",
              },
              note: {
                zh: "加热即分解，实验室制氧原料。",
                en: "Decomposes on heating; a lab source of O₂.",
              },
              role: "l",
            },
            {
              f: "K₂MnO₄",
              name: {
                zh: "锰酸钾（绿色固体）",
                en: "Potassium manganate (green solid)",
              },
              note: { zh: "残留固体之一。", en: "One of the residual solids." },
              role: "r",
            },
            {
              f: "MnO₂",
              name: {
                zh: "二氧化锰（黑色固体）",
                en: "Manganese dioxide (black solid)",
              },
              note: {
                zh: "同时生成的副产物。",
                en: "By-product formed alongside.",
              },
              role: "r",
            },
            {
              f: "O₂↑",
              name: { zh: "氧气", en: "Oxygen gas" },
              note: {
                zh: "供收集，使带火星木条复燃。",
                en: "Collected; relights a glowing splint.",
              },
              role: "r",
            },
          ],
          icon: "🟣",
          term: { zh: "高锰酸钾受热分解", en: "KMnO₄ Decomposition" },
          level: 1,
          oneLiner: {
            zh: "高锰酸钾加热分解，放出氧气。",
            en: "Potassium permanganate decomposes on heating, releasing O₂.",
          },
          eq: {
            lhs: "2KMnO₄",
            cond: { zh: "加热 △", en: "heat Δ" },
            rhs: "K₂MnO₄ + MnO₂ + O₂↑",
          },
          detail: {
            zh: "高锰酸钾法是三种制氧路线中的「固体加热」类，与氯酸钾法同一套装置：试管口要略向下倾斜，防止冷凝水倒流使灼热的管底炸裂；试管口要塞一小团棉花，作用是挡住随氧气流冲出紫黑色粉末——粉末进导管会堵塞、进水槽会把水染成紫红。操作上先左右移动试管均匀预热，再固定药品部位强热；用排水法收集时要等气泡连续均匀冒出才收集，因为一开始排出的是试管里的空气；实验结束的顺序必须记牢：先把导管移出水面，再熄灭酒精灯，反了就会因管内的气压降低把水槽里的冷水倒吸进灼热试管。这条反应的化合价并不安分：锰从 +7 一分降到 +6（K₂MnO₄，锰酸钾）一分降到 +4（MnO₂），氧则从 −2 升到 0，所以 2 mol 高锰酸钾（约 316 g）只得 1 mol 氧气（32 g），产氧效率明显低于氯酸钾（每 122.5 g 就给 24 g 氧）。看颜色就能判断反应进度：紫黑色晶体逐渐变成墨绿与黑色混杂的残留。顺便分清两件事：本反应生成的二氧化锰是产物，而「氯酸钾受热分解」里二氧化锰是催化剂，高锰酸钾自己绝不能充当氯酸钾的催化剂（因为它一受热就分解，产物里多出的锰酸钾与二氧化锰才是真正起催化作用的东西）。稀的高锰酸钾溶液紫红色、氧化性很强，在分析中作氧化剂滴定时它自己就能当指示剂——终点是被还原到几乎无色或出现淡粉色，不需要另加指示剂；生活中它也被用作消毒与水果保鲜剂，但浓度必须很稀。",
            en: "The permanganate route is the heat-a-solid member of the three lab preparations of oxygen, so it shares the apparatus with potassium chlorate: tilt the tube mouth slightly downward so condensed water cannot run back onto the hot bottom and crack it, and plug the mouth with a loose wad of cotton to stop the dark violet powder from riding the oxygen stream into the delivery tube, where it would clog it or dye the water trough purple. Warm the tube evenly by sliding it over the flame before heating the charge directly, and with drainage collection wait until bubbles come over steadily and continuously, because the first bubbles are just the air that was in the tube. Remember the shutdown order: draw the delivery tube out of the water before killing the lamp, otherwise the cooling tube sucks cold water back onto hot glass. The oxidation states here are restless: manganese at +7 splits, part dropping to +6 in potassium manganate and part to +4 in MnO2, while oxygen climbs from -2 to 0, so 2 mol of KMnO4 (about 316 g) give only 1 mol of O2 (32 g) - a clearly poorer yield than KClO3, which delivers 24 g of oxygen per 122.5 g. Colour tells you how far the reaction has gone: the violet-black crystals turn into a greenish-black mixture. Keep two things apart: the MnO2 formed here is a product, whereas in Potassium Chlorate Decomposition MnO2 is the catalyst, and KMnO4 can never serve as that catalyst since it decomposes itself first. Dilute permanganate solution is strongly oxidising and useful as its own indicator in redox titrations - the end point shows as loss of the violet or a faint pink - and at very low concentration it is also used as a disinfectant and fruit preservative.",
          },
          tags: [{ zh: "制气", en: "Gas" }],
        },
        {
          id: "eq-kclo3",
          subs: [
            {
              f: "2KClO₃",
              name: {
                zh: "氯酸钾（白色固体）",
                en: "Potassium chlorate (white solid)",
              },
              note: {
                zh: "分解放出氧气。",
                en: "Decomposes to release oxygen.",
              },
              role: "l",
            },
            {
              f: "MnO₂",
              name: { zh: "二氧化锰", en: "Manganese dioxide" },
              note: {
                zh: "催化剂，降低反应温度、加快速率。",
                en: "Catalyst; lowers temperature and speeds the reaction.",
              },
              role: "c",
            },
            {
              f: "2KCl",
              name: {
                zh: "氯化钾（白色固体）",
                en: "Potassium chloride (white solid)",
              },
              note: { zh: "残留固体。", en: "Residual solid." },
              role: "r",
            },
            {
              f: "3O₂↑",
              name: { zh: "氧气", en: "Oxygen gas" },
              note: { zh: "制取目标气体。", en: "The target gas produced." },
              role: "r",
            },
          ],
          icon: "🟡",
          term: { zh: "氯酸钾受热分解", en: "KClO₃ Decomposition" },
          level: 1,
          oneLiner: {
            zh: "氯酸钾在二氧化锰催化并加热下分解放氧。",
            en: "Potassium chlorate decomposes with MnO₂ and heat to give O₂.",
          },
          eq: {
            lhs: "2KClO₃",
            cond: { zh: "MnO₂ · 加热", en: "MnO₂, Δ" },
            rhs: "2KCl + 3O₂↑",
          },
          detail: {
            zh: "这是初中实验室制氧气的第三种药品路线，也是「催化剂」概念最标准的载体。操作上与高锰酸钾法几乎一样：试管口略向下倾斜防冷凝水倒流，导管刚伸入试管内一点即可，用排水法收集。差别在药品本身：氯酸钾单独加热到约 356 ℃ 熔化之后才缓慢放氧，混入二氧化锰并磨匀后在两三百度就明显反应，所以二氧化锰写在箭头上方作条件，不进方程式的配平。它在这里确确实实是催化剂：反应前后质量和化学性质都不变，结束后加足水溶解、过滤、洗涤、干燥就能把它回收（氯化钾溶于水而二氧化锰不溶），这是「催化剂质量不变」最直接的验证。三个高频易错处：一、不能拿高锰酸钾代替二氧化锰——高锰酸钾自己分解也会放氧，但它的产物里多出锰酸钾与二氧化锰，真正起催化作用的是后生成的二氧化锰；二、氯酸钾是强氧化剂，混入炭粉、硫或纸屑后研磨、受热都可能猛燃甚至爆炸，只能与二氧化锰配伍；三、常见错写是把方程式不配平就交，或者把催化剂当生成物写到右边。工业上氯酸钾用于火柴头与烟火，学生实验只用极少量，多余的药品不得倒回原瓶（见「药品的存放与容器选择」）。",
            en: "This is the third of the school oxygen preparations and the standard carrier of the catalyst idea. The handling is the permanganate recipe unchanged: mouth tilted slightly down so condensate cannot run back, delivery tube barely inside the tube, collection over water. The difference is in the drug. Potassium chlorate melts near 356 °C and only then gives oxygen slowly, while ground with manganese dioxide it runs briskly a couple of hundred degrees earlier, so the dioxide is written above the arrow as a condition and never balanced into the equation. And it truly is a catalyst here: unchanged in mass and in chemistry, it is recovered by dissolving the residue in water, filtering, washing and drying the solid — potassium chloride goes into solution, the dioxide does not — the plainest possible proof that a catalyst comes out intact. Three standing traps: potassium permanganate is no substitute for the dioxide, since it decomposes itself into three products and merely supplies the dioxide that does the catalysis afterwards; chlorate is a strong oxidiser and ground or warmed with charcoal, sulfur or paper it can flare or detonate, so it is mixed with nothing else; and the common miswrites are an unbalanced equation or the catalyst parked on the product side. Industry puts chlorate into match heads and pyrotechnics, the bench uses a spatula-tip, and what is left over never goes back into the bottle (see storing reagents and choosing the container).",
          },
          tags: [{ zh: "制气", en: "Gas" }],
        },
        {
          id: "eq-co2",
          subs: [
            {
              f: "CaCO₃",
              name: {
                zh: "碳酸钙（大理石/石灰石）",
                en: "Calcium carbonate (marble/limestone)",
              },
              note: {
                zh: "块状固体，与酸反应放气。",
                en: "Lumpy solid; reacts with acid giving off gas.",
              },
              role: "l",
            },
            {
              f: "2HCl",
              name: { zh: "稀盐酸", en: "Dilute hydrochloric acid" },
              note: {
                zh: "提供 H⁺ 与碳酸根反应。",
                en: "Supplies H⁺ to react with carbonate.",
              },
              role: "l",
            },
            {
              f: "CaCl₂",
              name: { zh: "氯化钙", en: "Calcium chloride" },
              note: {
                zh: "溶于水留在溶液中。",
                en: "Dissolves, remaining in solution.",
              },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "反应生成。", en: "Formed in the reaction." },
              role: "r",
            },
            {
              f: "CO₂↑",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: {
                zh: "使澄清石灰水变浑浊，向上排空气法收集。",
                en: "Turns limewater cloudy; collected by upward displacement of air.",
              },
              role: "r",
            },
          ],
          icon: "🪨",
          term: { zh: "大理石与盐酸制二氧化碳", en: "CO₂ from Carbonate" },
          level: 1,
          oneLiner: {
            zh: "大理石（碳酸钙）与稀盐酸反应制二氧化碳。",
            en: "Marble (calcium carbonate) reacts with dilute HCl to give CO₂.",
          },
          eq: {
            lhs: "CaCO₃ + 2HCl",
            rhs: "CaCl₂ + H₂O + CO₂↑",
          },
          detail: {
            zh: "实验室制二氧化碳只用块状石灰石（或大理石）与稀盐酸，这三处「只用」都有理由，是考试最爱问的条件选择。第一，为什么不用稀硫酸？因为生成物硫酸钙微溶，会包裹在大理石表面把酸与碳酸钙隔开，反应几秒就自行停止（这与「酸雨与石灰石-石膏法脱硫」里硫酸钙成壳是同一件事），除非把石灰石磨成粉并不断搅拌。第二，为什么不用浓盐酸？因为它挥发出的氯化氢气体会混进二氧化碳，使收集的气体不纯，通入石灰水还会因酸性气体干扰而浑浊不明显。第三，为什么不用碳酸钠粉末？因为它与酸接触面积太大，一瞬间剧烈发泡，来不及收集；碳酸钠溶液是给「灭火器」和演示用的，不是制气的。装置走「固液不加热」，与制氢同一套；用向上排空气法收集，因为二氧化碳密度比空气大且能溶于水（常温约 1 体积水溶 1 体积气），一般不用排水法。验满的方法是把燃着的木条放在集气瓶口（不是伸进瓶里），火焰熄灭即满。反应的实质是碳酸钙与氢离子反应，写离子方程式时碳酸钙是固体不拆：CaCO₃ + 2H⁺ = Ca²⁺ + H₂O + CO₂↑，这一条同时说明「为什么碳酸盐都能与酸反应放出二氧化碳」——凡含碳酸根的都能提供 CO₃²⁻。二氧化碳的检验则走另一条特征反应：使澄清石灰水变浑浊（见「二氧化碳使石灰水变浑浊」）。工业上制二氧化碳反而常用高温煅烧石灰石这一分解反应，副产物就是生石灰（见「生石灰遇水」），一条碳酸钙的两条路正好互为对照。",
            en: "In the lab CO2 comes only from lump marble or limestone plus dilute hydrochloric acid, and each restriction has a reason worth reciting. Not dilute sulfuric acid: the CaSO4 formed is sparingly soluble and coats the marble, sealing acid away from carbonate so the reaction stalls after a few seconds - the same gypsum-shell effect as in Flue-Gas Desulfurisation - unless the stone is powdered and stirred. Not concentrated hydrochloric acid: its escaping HCl gas contaminates the CO2 and muddles the limewater test. Not sodium carbonate powder: the contact area is enormous, so it foams violently at once and the gas cannot be collected; the solution is reserved for fire extinguishers and demonstrations. The generator is again the solid-plus-liquid no-heat set shared with hydrogen, and collection is upward displacement of air because CO2 is denser than air and soluble in water (roughly one volume of water dissolves one volume of gas at room temperature), so drainage collection is normally not used. To check the jar is full, hold a burning splint at the mouth, not inside. The essence is carbonate meeting hydrogen ions; since CaCO3 is a solid it is not split apart in the ionic equation: CaCO3 + 2H+ = Ca2+ + H2O + CO2, which also explains why every carbonate fizzes with acid. Testing the gas is a different characteristic reaction - turbidity in limewater (see CO2 Turns Limewater Cloudy). Industry takes the opposite path, decomposing limestone at high temperature, whose co-product is quicklime (see Quicklime Meets Water), so the two routes through calcium carbonate make a neat pair.",
          },
          tags: [{ zh: "制气", en: "Gas" }],
        },
        {
          id: "eq-electrolysis",
          subs: [
            {
              f: "2H₂O",
              name: {
                zh: "水（加少量电解质）",
                en: "Water (with a little electrolyte)",
              },
              note: {
                zh: "被电解；加电解质增强导电性。",
                en: "Electrolysed; electrolyte aids conduction.",
              },
              role: "l",
            },
            {
              f: "2H₂↑",
              name: { zh: "氢气", en: "Hydrogen gas" },
              note: {
                zh: "负极产生，可燃，体积约为氧气两倍。",
                en: "At the cathode; flammable, about twice the O₂ volume.",
              },
              role: "r",
            },
            {
              f: "O₂↑",
              name: { zh: "氧气", en: "Oxygen gas" },
              note: {
                zh: "正极产生，助燃。",
                en: "At the anode; supports combustion.",
              },
              role: "r",
            },
          ],
          icon: "⚡",
          term: { zh: "电解水", en: "Electrolysis of Water" },
          level: 1,
          oneLiner: {
            zh: "水电解生成氢气和氧气。",
            en: "Water electrolyses into hydrogen and oxygen.",
          },
          eq: {
            lhs: "2H₂O",
            cond: { zh: "通电", en: "electrolysis" },
            rhs: "2H₂↑ + O₂↑",
          },
          detail: {
            zh: "纯水几乎不导电，所以做这个实验要加少量稀硫酸或氢氧化钠溶液增强导电性；这里有个常见错误是加食盐，因为食盐水里的氯离子会在阳极先于氢氧根放电，放出的是氯气而不是氧气，两极产物全乱（原因见「电解池」的放电顺序）。操作时用直流电，两极均产生气泡，体积关系记成「正氧负氢、氢二氧一」：与电源正极相连的阳极得氧气、负极的阴极得氢气，体积比约 2（氢）比 1（氧）；检验办法是阴极气体靠近火焰有轻微爆鸣或安静燃烧，阳极气体使带火星木条复燃。注意体积比是 2 比 1，而质量比恰好反过来是 1 比 8（每 4 g 氢配 32 g 氧），因为一个氧分子是氢分子质量的 16 倍但只有一半的分子数。实测常发现氢气略多于两倍的氧，这不是错，而是因为氧气在水里的溶解度比氢气大一些，阳极本身也可能被氧化消耗掉一点氧。这条反应的论证价值在于「水由氢元素和氧元素组成」：分解与化合互为逆过程，它和「氢气燃烧」合起来才构成对水组成的完整证明，也是初中「化学变化中分子可分、原子不可分」的标准例证——水分子被拆成氢原子和氧原子，再两两组合成氢分子和氧分子，原子的种类和数目都没变。按电量算，生成 1 mol 氢气要通过 2 mol 电子，即约 19.3 万库仑（见「法拉第电解定律」），所以电解水制氢看着简单，工业上却是实打实的耗电大户，只有用廉价的可再生电力才谈得上「绿氢」。",
            en: "Pure water barely conducts, so a little dilute sulfuric acid or sodium hydroxide is added - and note the classic blunder of using table salt, because chloride discharges at the anode ahead of hydroxide and the gas is chlorine, not oxygen (the discharge order is laid out in Electrolytic Cell). With direct current both electrodes bubble; recite oxygen-at-anode, hydrogen-at-cathode, two to one by volume, so the anode gas relights a glowing splint and the cathode gas burns quietly or gives a small pop. The volume ratio is 2 to 1 but the mass ratio is the reverse, 1 to 8, because an oxygen molecule is sixteen times heavier while there are half as many of them. Measured hydrogen often exceeds exactly twice the oxygen, which is not an error: oxygen is somewhat more soluble in water than hydrogen, and the anode itself may consume a little. The argument this experiment supplies is the composition of water - decomposition and synthesis are reciprocal, and paired with Hydrogen Combustion they give the complete proof - and it is also the standard illustration that molecules divide in a chemical change while atoms do not: water molecules come apart into H and O atoms that re-pair into H2 and O2 with no atom lost or changed. By charge, making 1 mol of hydrogen needs 2 mol of electrons, roughly 193000 coulomb (see Faraday's Laws), which is why electrolytic hydrogen looks simple but is a serious electricity customer, economic only behind cheap renewable power.",
          },
          tags: [{ zh: "电解", en: "Electrolysis" }],
        },
        {
          id: "eq-fe-cuso4",
          subs: [
            {
              f: "Fe",
              name: { zh: "铁（银白色金属）", en: "Iron (silvery metal)" },
              note: {
                zh: "较活泼，作还原剂置换铜。",
                en: "More reactive; reduces and displaces copper.",
              },
              role: "l",
            },
            {
              f: "CuSO₄",
              name: {
                zh: "硫酸铜（蓝色溶液）",
                en: "Copper(II) sulfate (blue solution)",
              },
              note: {
                zh: "提供待置换的铜离子。",
                en: "Supplies the Cu²⁺ to be displaced.",
              },
              role: "l",
            },
            {
              f: "FeSO₄",
              name: {
                zh: "硫酸亚铁（浅绿色溶液）",
                en: "Iron(II) sulfate (pale-green solution)",
              },
              note: {
                zh: "溶液由蓝变浅绿。",
                en: "Solution fades from blue to pale green.",
              },
              role: "r",
            },
            {
              f: "Cu",
              name: { zh: "铜（红色固体）", en: "Copper (red solid)" },
              note: {
                zh: "析出附着于铁表面，湿法炼铜原理。",
                en: "Deposits on the iron; the basis of hydrometallurgical copper.",
              },
              role: "r",
            },
          ],
          icon: "🔵",
          term: { zh: "铁置换硫酸铜（湿法炼铜）", en: "Fe Displaces Cu" },
          level: 1,
          oneLiner: {
            zh: "铁把铜从硫酸铜溶液中置换出来。",
            en: "Iron displaces copper from copper(II) sulfate solution.",
          },
          eq: {
            lhs: "Fe + CuSO₄",
            rhs: "FeSO₄ + Cu",
          },
          detail: {
            zh: "「曾青得铁则化为铜」是西汉炼丹著作里就写下的话，宋代用它从硫酸铜溶液（胆矾水）里炼铜，称为湿法炼铜——这是世界最早的炼铜法之一，原理就是这条置换反应。现象分三处观察：银白色的铁表面覆盖一层红色（紫红）固体，溶液由蓝色逐渐变浅绿色，若时间够长底部还有疏松的铜粉脱落。做实验前要用砂纸把铁丝打磨光亮，否则表面的氧化膜和油污会让现象来得很慢；判断反应是否完成看蓝色是否褪尽。这里最要紧的辨析是铁的价态：铁被铜离子氧化只能到 +2（生成 FeSO₄），不能一步跳到 +3，因为 Cu²⁺ 的氧化性不足以把铁推到三价；反过来，Fe³⁺ 却能把铜单质氧化溶解，2Fe³⁺ + Cu = 2Fe²⁺ + Cu²⁺，印刷电路板正是用氯化铁溶液「蚀刻」铜箔的。所以三价铁离子、铜离子、铜单质要按同一条氧化性强弱排序（Cu²⁺ 介于两者之间，见「氧化还原反应」）。差量计算也常考：每溶解 56 份质量的铁就析出 64 份质量的铜，固体增重 8 份、溶液相应减重 8 份，把铁钉浸入硫酸铜溶液后称量，总质量不变而铁钉变重，是典型的守恒加差量题。活动性顺序里排在铜前面的金属都能这样把铜置换出来（见「金属活动性顺序」），但要注意「钾钙钠扔进盐溶液先跟水反应」这条例外。今天湿法冶金仍在用同一原理，从矿山废水与电子废弃物浸出液里回收金属，是「电子废弃物提金（城市矿山）」路线的化学基础。",
            en: "The phrase if iron meets blue vitriol, copper is born comes from a Han-dynasty alchemical text, and by the Song dynasty it was used to recover copper from solutions of copper sulfate, the wet method - among the earliest hydrometallurgical routes anywhere. Read the phenomena in three places: a red-purple coating on the silvery iron, the blue solution fading to pale green, and after a long soak a loose powder of copper on the bottom. Sand the wire bright first, since oxide film and grease delay everything, and judge completion by whether any blue is left. The decisive subtlety is the valence of iron: Cu2+ is not oxidising enough to push iron straight to +3, so only FeSO4 forms; conversely Fe3+ does dissolve metallic copper, 2Fe3+ + Cu = 2Fe2+ + Cu2+, which is exactly how ferric chloride etches copper foil on printed circuit boards. Line up Fe3+, Cu2+ and Cu on one oxidising-strength ladder (see Redox Reactions), and note that mass-difference problems are classic: every 56 mass parts of iron dissolved deposits 64 parts of copper, so the solid gains 8 and the solution loses 8 - the whole beaker still weighs the same. Any metal above copper in the activity series can displace it this way (see the Metal Activity Series), except that potassium, calcium and sodium react with the water first. Modern dump-leach and e-waste recovery still rest on this reaction, the chemical base of urban mining.",
          },
          tags: [{ zh: "置换", en: "Displacement" }],
        },
        {
          id: "eq-metal-acid",
          subs: [
            {
              f: "Zn",
              name: { zh: "锌粒", en: "Zinc granules" },
              note: {
                zh: "活泼金属，与稀酸反应放氢。",
                en: "Reactive metal; gives H₂ with dilute acid.",
              },
              role: "l",
            },
            {
              f: "H₂SO₄",
              name: { zh: "稀硫酸", en: "Dilute sulfuric acid" },
              note: { zh: "提供 H⁺。", en: "Supplies H⁺." },
              role: "l",
            },
            {
              f: "ZnSO₄",
              name: { zh: "硫酸锌", en: "Zinc sulfate" },
              note: { zh: "溶于水。", en: "Dissolves in water." },
              role: "r",
            },
            {
              f: "H₂↑",
              name: { zh: "氢气", en: "Hydrogen gas" },
              note: {
                zh: "可燃，实验室制氢常用此法。",
                en: "Flammable; a common lab route to H₂.",
              },
              role: "r",
            },
          ],
          icon: "🔩",
          term: { zh: "活泼金属与稀硫酸", en: "Metal + Acid" },
          level: 1,
          oneLiner: {
            zh: "锌与稀硫酸反应放出氢气。",
            en: "Zinc reacts with dilute sulfuric acid to release H₂.",
          },
          eq: {
            lhs: "Zn + H₂SO₄",
            rhs: "ZnSO₄ + H₂↑",
          },
          detail: {
            zh: "实验室制氢气就用锌粒与稀硫酸，选药品是一条一条比出来的：镁反应太快、热量大、气流难以控制，铁太慢而且往往因杂质发泡不止，铜在金属活动性顺序里排在氢之后、根本不反应，于是速率适中的锌成了标准选择（浓度常用 1:5 的稀硫酸，也可用稀盐酸，但盐酸挥发会让氢气带酸味）。真正的反应是金属与氢离子：Zn + 2H⁺ = Zn²⁺ + H₂↑，所以「金属失电子、氢离子得电子」是这一类反应的共同骨架，活泼性越强反应越快（见「金属活动性顺序」与「原电池」）。有两个坑必须提前踩掉。第一，只有稀的非氧化性酸（盐酸、稀硫酸）才放氢气；浓硫酸和硝酸是氧化性酸，与金属反应时得电子的是酸根里的中心原子，产物是二氧化硫或氮的氧化物而不是氢气，铜能溶在浓硫酸与硝酸里却溶不了在稀盐酸里，正是这条分界。第二，产氢量比较是「等质量金属与足量酸」还是「等量酸与足量金属」，两种题答案完全不同：前者比的是每克金属能给出几摩尔电子，即化合价除以相对原子质量，所以铝最多、镁次之、铁再次、锌最少（每克铝约 0.11 mol 电子、锌约 0.031 mol）；后者酸被用完，只要酸的量相同，最终生成的氢气一样多，只是快慢不同。顺手一个常考点：粗锌或滴几滴硫酸铜溶液反而反应更快，因为锌把铜置换出来贴在表面，锌-铜在酸里构成无数小原电池（呼应「原电池」的加速腐蚀），纯锌反而慢。",
            en: "Laboratory hydrogen is zinc granules plus dilute sulfuric acid, and that choice was argued item by item: magnesium is too fast and hot to control, iron too slow and prone to stubborn foaming from impurities, copper sits after hydrogen in the activity series and simply will not react, so moderate zinc wins, typically with 1:5 dilute sulfuric acid (dilute hydrochloric works but its fumes make the gas taste sour). The real reaction is metal against hydrogen ions, Zn + 2H+ = Zn2+ + H2, so metal loses electrons and hydrogen ions gain them in every member of this family, faster the more active the metal. Two traps to clear in advance. First, only dilute non-oxidising acids give hydrogen: with concentrated sulfuric acid or nitric acid the atom at the centre of the acid anion takes the electrons, so sulfur dioxide or nitrogen oxides come off instead - which is why copper dissolves in those two but not in hydrochloric acid. Second, be explicit about what is equal: equal masses of metal with excess acid ranks by electrons per gram, valence divided by relative atomic mass, so aluminium beats magnesium beats iron beats zinc (about 0.11 mol of electrons per gram for Al, 0.031 for Zn); equal amounts of acid with excess metal gives the same hydrogen either way, differing only in speed. A related exam point: coarse zinc, or a few drops of copper sulfate solution, reacts faster, because the cemented copper and zinc form countless microscopic galvanic cells in the acid (see Galvanic Cell), while pure zinc is sluggish.",
          },
          tags: [{ zh: "置换", en: "Displacement" }],
        },
        {
          id: "eq-ch4",
          subs: [
            {
              f: "CH₄",
              name: {
                zh: "甲烷（天然气主要成分）",
                en: "Methane (main component of natural gas)",
              },
              note: {
                zh: "可燃气体，作燃料。",
                en: "Flammable gas used as fuel.",
              },
              role: "l",
            },
            {
              f: "2O₂",
              name: { zh: "氧气", en: "Oxygen" },
              note: { zh: "助燃。", en: "Supports combustion." },
              role: "l",
            },
            {
              f: "CO₂",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: {
                zh: "燃烧产物，使石灰水浑浊。",
                en: "Combustion product; clouds limewater.",
              },
              role: "r",
            },
            {
              f: "2H₂O",
              name: { zh: "水", en: "Water" },
              note: {
                zh: "火焰上方冷烧杯内壁出现水珠。",
                en: "Droplets condense on a cold beaker over the flame.",
              },
              role: "r",
            },
          ],
          icon: "🔥",
          term: { zh: "甲烷燃烧", en: "Methane Combustion" },
          level: 1,
          oneLiner: {
            zh: "甲烷在氧气中完全燃烧。",
            en: "Methane burns completely in oxygen.",
          },
          eq: {
            lhs: "CH₄ + 2O₂",
            cond: { zh: "点燃", en: "ignite" },
            rhs: "CO₂ + 2H₂O",
          },
          detail: {
            zh: "甲烷是天然气、沼气与「瓦斯」的主要成分，完全燃烧时火焰淡蓝、几乎无烟，所以它被认为是最干净的化石燃料——但这条「干净」有严格前提：必须完全燃烧，空气不足时同一份甲烷会生成一氧化碳甚至游离的碳（灶具火焰发黄、锅底起黑灰就是这个信号，此时应当调大进风口），而一氧化碳才是煤气中毒的元凶。检验产物是初中「由产物推组成」的标准套路：在火焰上方罩一个干而冷的烧杯，内壁凝出水珠说明产物有水、从而说明甲烷含氢元素；把烧杯倒转注入少量澄清石灰水振荡、变浑说明有二氧化碳、从而说明含碳元素。由质量守恒（反应前后元素种类不变）就能确定甲烷由碳和氢组成，这是「定性组成分析」最朴素的样板。量的关系也要读准：1 分子甲烷耗 2 分子氧、生成 1 分子二氧化碳和 2 分子水，所以每 1 体积甲烷约需 10 体积空气才能供足这 2 体积氧（氧气约占空气体积的五分之一）。安全上它和氢气一样「点燃前须验纯」：甲烷在空气中的爆炸极限约 5% 到 15%，矿井瓦斯爆炸、厨房泄漏爆炸都发生在这段浓度里，因此泄漏时不能开关电器、要先关阀开窗。热值方面，甲烷燃烧热约 890 kJ/mol，折合约 55.6 MJ/kg，高于汽油约 46 MJ/kg，且每单位热量排放的二氧化碳比煤和汽油都少，这是「以气代煤」的核心理由；但甲烷本身就是强温室气体，泄漏到大气中的增温能力远大于烧掉它排的那点二氧化碳，所以天然气的环保账必须算上输配环节的泄漏。",
            en: "Methane is the main constituent of natural gas, biogas and mine gas; burned completely it gives a pale blue, nearly smokeless flame, which is why it counts as the cleanest fossil fuel - but only under a strict condition: complete combustion. Starved of air the same methane yields carbon monoxide or free carbon, and a yellow flame with blacking on the pot bottom is the signal to open the air inlet; carbon monoxide is the actual culprit in gas poisoning. Verifying the products is the standard way of reasoning from products back to composition: hold a dry cold beaker over the flame, condensation inside proves water and therefore hydrogen in the fuel, then invert it with a little limewater, turbidity proves carbon dioxide and therefore carbon. Conservation of elements then settles the composition - the crudest and clearest model of qualitative analysis. Read the quantities exactly: one molecule of methane consumes two of oxygen and gives one of carbon dioxide plus two of water, so with oxygen at roughly a fifth of air, one volume of gas needs on the order of ten volumes of air. On safety it shares hydrogen's rule of testing purity before ignition: methane explodes between about 5 and 15 percent in air, so a leak must be handled by closing the valve and opening windows, never by switching appliances. Its heat of combustion is about 890 kJ per mole, some 55.6 MJ/kg, above gasoline's 46 MJ/kg, and it emits less carbon dioxide per joule than coal or petrol - the core case for switching to gas. Yet methane itself is a potent greenhouse gas, far stronger than the CO2 its burning releases, so the environmental ledger must count leakage along the distribution chain.",
          },
          tags: [{ zh: "燃烧", en: "Combustion" }],
        },
        {
          id: "eq-h2",
          subs: [
            {
              f: "2H₂",
              name: { zh: "氢气", en: "Hydrogen" },
              note: {
                zh: "可燃气体，点燃前需验纯。",
                en: "Flammable; must be tested for purity before ignition.",
              },
              role: "l",
            },
            {
              f: "O₂",
              name: { zh: "氧气", en: "Oxygen" },
              note: { zh: "助燃。", en: "Supports combustion." },
              role: "l",
            },
            {
              f: "2H₂O",
              name: { zh: "水", en: "Water" },
              note: {
                zh: "唯一产物，淡蓝色火焰、放热。",
                en: "Sole product; pale-blue flame, exothermic.",
              },
              role: "r",
            },
          ],
          icon: "💧",
          term: { zh: "氢气燃烧", en: "Hydrogen Combustion" },
          level: 1,
          oneLiner: {
            zh: "氢气燃烧生成水。",
            en: "Hydrogen burns to form water.",
          },
          eq: {
            lhs: "2H₂ + O₂",
            cond: { zh: "点燃", en: "ignite" },
            rhs: "2H₂O",
          },
          detail: {
            zh: "氢气燃烧是初中唯一要求亲手验证「产物只有水」的燃烧实验：在导管口点燃纯净的氢气，火焰呈淡蓝色（透过玻璃导管看时常带一点黄，要看清淡蓝可用干燥的玻璃片挡一下），火焰上方罩一个干而冷的烧杯，内壁立刻凝出水雾，说明产物只有水；用手摸烧杯外壁发烫，说明它放热。这条反应有三个用处。一、它是检验氢气最直观的方法，也是「水由氢和氧组成」的合成证据——与电解水正好互为逆过程，两条一起构成水的组成的完整论证。二、每摩尔氢气燃烧约放 286 kJ，按质量算热值高达约 143 MJ/kg，接近同质量汽油的三倍，而且产物只有水不排碳，所以它被当作燃料看待；难点全在储运，因为氢气密度最小，必须高压或液化才能装得下。三、它是「点燃前必须验纯」这条安全规矩的来源：氢气在空气里的体积分数约从 4% 到 75% 都属于爆炸极限，这一段内遇火都会爆炸，所以收集后先用小试管试爆——只听见一声闷响「噗」才算纯净，尖利的爆鸣说明还混着空气、必须重新收集。爆炸极限与「燃烧与灭火」里「有限空间内的剧烈燃烧就是爆炸」口径一致，而氢气还原氧化铜「先通氢、后点灯」的顺序也是同一个理由（见「置换反应」）。",
            en: "Burning hydrogen is the one combustion the junior course must verify by its product: light the pure gas at the jet, hold a dry cold beaker over the flame and mist forms on the wall at once, while the outside of the beaker turns warm. Three uses follow. It is the plainest test for hydrogen and the synthesis half of the argument that water is made of hydrogen and oxygen, electrolysis being the exact reverse — the two together settle the composition of water. It gives some 286 kJ per mole, roughly 143 MJ per kilogram, close to three times petrol, and its only product is water, so it is counted as a carbon-free fuel; the whole difficulty lies in carrying so light a gas about, which takes pressure or liquefaction. And it is why hydrogen must be proved pure before lighting: mixtures from about 4% to 75% by volume in air all explode on a flame, so a small tube is tested first — a soft 'pop' means pure, a sharp shriek means air is still in it and the collection must be repeated. That band is the explosive limit, kept to the same wording as the combustion and fire-control entry, and it is the same reason the copper-oxide reduction passes gas before the lamp is lit (see displacement).",
          },
          tags: [{ zh: "燃烧", en: "Combustion" }],
        },
        {
          id: "eq-neutralize",
          subs: [
            {
              f: "HCl",
              name: {
                zh: "盐酸（强酸）",
                en: "Hydrochloric acid (strong acid)",
              },
              note: { zh: "提供 H⁺。", en: "Supplies H⁺." },
              role: "l",
            },
            {
              f: "NaOH",
              name: {
                zh: "氢氧化钠（强碱）",
                en: "Sodium hydroxide (strong base)",
              },
              note: { zh: "提供 OH⁻。", en: "Supplies OH⁻." },
              role: "l",
            },
            {
              f: "NaCl",
              name: {
                zh: "氯化钠（食盐主要成分）",
                en: "Sodium chloride (table salt)",
              },
              note: {
                zh: "中和生成的盐。",
                en: "The salt formed by neutralization.",
              },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: {
                zh: "H⁺ 与 OH⁻ 结合；酚酞褪色指示终点。",
                en: "H⁺ and OH⁻ combine; phenolphthalein fading marks the endpoint.",
              },
              role: "r",
            },
          ],
          icon: "🧫",
          term: { zh: "盐酸中和氢氧化钠", en: "HCl Neutralizes NaOH" },
          level: 1,
          oneLiner: {
            zh: "盐酸与氢氧化钠中和生成盐和水。",
            en: "Hydrochloric acid is neutralized by sodium hydroxide.",
          },
          eq: {
            lhs: "HCl + NaOH",
            rhs: "NaCl + H₂O",
          },
          detail: {
            zh: "这条反应在烧杯里进行时什么也看不见——两种无色溶液混在一起还是无色，这正是中和滴定的第一个难点：必须借指示剂把看不见的等当点变成看得见的颜色变化。选酚酞而不是石蕊，是因为酚酞在约 pH 8.2 到 10 之间由红骤褪为无色，色变敏锐；石蕊是「紫到红、紫到蓝」的渐变，肉眼判断不出边界，教材里从不用它作滴定指示剂。操作手法有固定套路：左手控制滴定管活塞（或挤压玻璃珠）、右手摇动锥形瓶、眼睛注视瓶内颜色而不是刻度；接近终点时改成半滴半滴加，用锥形瓶内壁把半滴蹭下去。终点判定：滴到最后一滴使溶液由浅红恰好变为无色、且半分钟内不复原。要清楚这个终点严格说在微碱性一侧（pH 约 8.2 时酚酞才褪色），此时还剩极少量氢氧化钠没被中和，但因为强酸强碱滴定在等当点附近 pH 会发生「突跃」（半滴之差从 pH 10 掉到 4），这点误差落在允许范围内——这也是为什么不能用它来滴定很弱的酸或碱，突跃不明显就无法选对指示剂。反应的实质是 H⁺ + OH⁻ = H₂O，生成的 NaCl 只是留在溶液里的「旁观者」，所以蒸发结晶才得到食盐晶体（见「分离与提纯的方法及仪器配套」）。「中和」两个字的边界也要划清：并非所有酸与碱的反应都只生成盐和水，碳酸钠与盐酸会放气、酸与金属氧化物反应生成盐和水却不属于中和（中和的定义是酸与碱作用），这些在「碳酸钠与盐酸」与「酸碱」两条里各自说明。放热与 57.3 kJ/mol 的定量口径见「中和热」，胃里的中和见「胃酸中和（胃药）」。",
            en: "Carried out in a beaker this reaction shows nothing: two colourless solutions give a colourless mixture, which is the first difficulty of titration - the equivalence point is invisible until an indicator turns it into colour. Phenolphthalein is chosen over litmus because it drops from red to colourless sharply across about pH 8.2 to 10, whereas litmus fades gradually and no eye can call its boundary; textbooks never titrate with it. The technique is fixed: left hand on the stopcock, right hand swirling the flask, eyes watching the colour in the flask rather than the scale; near the end point add half-drops and wash them off the wall. Judge the end point as the last drop leaving the solution colourless with no pink returning within half a minute. Strictly, that end point sits on the mildly alkaline side, since phenolphthalein only pales at about pH 8.2, so a trace of sodium hydroxide survives - acceptable because a strong acid against a strong base jumps from about pH 10 to 4 within half a drop, and that is exactly why the same indicator choice fails for very weak acids or bases, where no such jump exists. The essence is H+ + OH- = H2O, with NaCl only a spectator left in solution, so evaporating to dryness is what yields the salt crystals (see Choosing a Separation Method). Mark the borders of the word neutralise as well: not every acid-base reaction gives only salt and water - sodium carbonate with acid fizzes, and an acid dissolving a metal oxide gives salt and water yet is not neutralisation, which by definition is acid plus base. Numbers and heat belong to Heat of Neutralisation, the stomach version to Antacid Chemistry.",
          },
          tags: [{ zh: "中和", en: "Neutralization" }],
        },
        {
          id: "eq-na2co3-hcl",
          subs: [
            {
              f: "Na₂CO₃",
              name: {
                zh: "碳酸钠（纯碱/苏打）",
                en: "Sodium carbonate (soda ash)",
              },
              note: {
                zh: "与酸反应放气。",
                en: "Reacts with acid releasing gas.",
              },
              role: "l",
            },
            {
              f: "2HCl",
              name: { zh: "稀盐酸", en: "Dilute hydrochloric acid" },
              note: { zh: "提供 H⁺。", en: "Supplies H⁺." },
              role: "l",
            },
            {
              f: "2NaCl",
              name: { zh: "氯化钠", en: "Sodium chloride" },
              note: { zh: "中和生成。", en: "Formed by neutralization." },
              role: "r",
            },
            {
              f: "CO₂↑",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: {
                zh: "大量放气，泡沫灭火器原理之一。",
                en: "Vigorous effervescence; underlies foam extinguishers.",
              },
              role: "r",
            },
          ],
          icon: "🫧",
          term: { zh: "碳酸钠与盐酸", en: "Na₂CO₃ + HCl" },
          level: 2,
          oneLiner: {
            zh: "碳酸钠与盐酸反应放出二氧化碳。",
            en: "Sodium carbonate reacts with HCl, releasing CO₂.",
          },
          eq: {
            lhs: "Na₂CO₃ + 2HCl",
            rhs: "2NaCl + H₂O + CO₂↑",
          },
          detail: {
            zh: "这条方程式看着与「大理石与盐酸制二氧化碳」同型，但真正的考点藏在滴加顺序里，而它同时也是不另加试剂区分碳酸钠溶液与稀盐酸的经典方法（互滴法）。把盐酸逐滴加入碳酸钠溶液：开始时一点气泡都没有，因为碳酸根先只结合一个氢离子变成碳酸氢根，CO₃²⁻ + H⁺ = HCO₃⁻；等碳酸根被全部转化，继续滴酸才突然大量放气，HCO₃⁻ + H⁺ = H₂O + CO₂↑。反过来把碳酸钠溶液滴入过量盐酸：一接触立刻剧烈冒泡，因为每一滴碳酸根遇到的都是充足的氢离子。同两种药品、顺序不同、现象完全不同，这就是「量与顺序决定产物」的标准案例：1 比 1 时得到碳酸氢钠（Na₂CO₃ + HCl = NaHCO₃ + NaCl），1 比 2 时才走完总反应。所以「等质量的碳酸钠与碳酸氢钠分别与足量盐酸反应」这类比较题，必须先分清问的是耗酸量还是放气量：碳酸钠每 106 g 放 44 g 二氧化碳而耗 2 mol 盐酸，碳酸氢钠每 84 g 就放 44 g 二氧化碳而只耗 1 mol，单位质量的碳酸氢钠放气更多、单位二氧化碳对应的酸更少。另外三个必须钉住的点：一、碳酸钠俗名纯碱、苏打，但它属于盐而不是碱，水溶液因水解显碱性（见「盐类水解」），「纯碱不是碱」是「常见物质的俗名与主要成分」里最经典的一条；二、焰色反应呈黄色是钠盐的身份证，验证时用铂丝或无锈铁丝蘸稀盐酸灼烧至无色再蘸样品，透过蓝色钴玻璃看是排除钾的干扰；三、泡沫灭火器实际用的是碳酸氢钠浓溶液与硫酸铝溶液双水解（两者互相促进放出大量二氧化碳并形成氢氧化铝泡沫膜，见「盐类水解」），而不是这条碳酸钠与盐酸的反应，别把两者混为一谈。",
            en: "The equation looks like a twin of CO2 from Carbonate, but the point hides in the order of addition, which is also the classic way to tell the two solutions apart with no third reagent (cross-drop test). Add acid dropwise into sodium carbonate solution and nothing bubbles at first, because carbonate only accepts one proton and becomes bicarbonate, CO3(2-) + H+ = HCO3-; gas erupts only after all carbonate has been converted and the next protons meet bicarbonate. Reverse it - pour carbonate solution into excess acid - and every drop fizzes instantly, since each CO3(2-) finds protons plentiful. Same two bottles, opposite appearance, the standard lesson that quantities and order decide products: 1 to 1 stops at sodium hydrogen carbonate (Na2CO3 + HCl = NaHCO3 + NaCl), 1 to 2 runs the whole way. So for comparisons of equal masses of carbonate and bicarbonate with excess acid, first ask whether the question is acid consumed or gas released: 106 g of carbonate gives 44 g of CO2 while needing 2 mol of HCl, whereas 84 g of bicarbonate gives the same 44 g on only 1 mol - bicarbonate wins per gram, carbonate costs more acid per litre of gas. Three facts worth nailing: sodium carbonate is called soda or washing soda yet is a salt, not a base, alkaline only through hydrolysis (see Salt Hydrolysis), the most quoted entry in Common Names and Formulas; a yellow flame test is sodium's ID card, wire cleaned in hydrochloric acid and viewed through cobalt blue glass to exclude potassium; and foam fire extinguishers actually use concentrated sodium hydrogen carbonate with aluminium sulfate, mutual hydrolysis releasing gas and an aluminium hydroxide foam blanket, not this reaction.",
          },
          tags: [{ zh: "复分解", en: "Double" }],
        },
        {
          id: "eq-cao",
          subs: [
            {
              f: "CaO",
              name: { zh: "生石灰（白色固体）", en: "Quicklime (white solid)" },
              note: {
                zh: "与水剧烈化合。",
                en: "Reacts vigorously with water.",
              },
              role: "l",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "与生石灰化合。", en: "Combines with quicklime." },
              role: "l",
            },
            {
              f: "Ca(OH)₂",
              name: { zh: "熟石灰/消石灰", en: "Slaked lime" },
              note: {
                zh: "反应放热，用于建筑与干燥。",
                en: "Exothermic product; used in building and drying.",
              },
              role: "r",
            },
          ],
          icon: "🧱",
          term: { zh: "生石灰遇水", en: "CaO + Water" },
          level: 1,
          oneLiner: {
            zh: "生石灰与水化合生成熟石灰。",
            en: "Quicklime combines with water to form slaked lime.",
          },
          eq: { lhs: "CaO + H₂O", rhs: "Ca(OH)₂" },
          detail: {
            zh: "把水倒进生石灰，几秒内块体崩解成粉末、冒出大量白色蒸汽、用手摸外壁烫得握不住——这是初中化学里放热最剧烈、也是最容易被安全忽视的一个化合反应，1 mol 氧化钙与水化合约放出 64 kJ，足以让一部分水沸腾，所以「自热米饭」的加热包、冬天烘手的石灰袋用的都是它；食品袋里那小包写「不可食用、勿入水」的干燥剂就是它，撕开或加水会灼伤，这是这条反应最实际的生活考点。产物氢氧化钙叫熟石灰或消石灰，加水得到的悬浊液是石灰乳、澄清的饱和溶液才是石灰水（注意：石灰水是稀溶液，氢氧化钙微溶，20 ℃ 时 100 g 水只溶约 0.16 g，这就是「为什么吸收二氧化碳要用氢氧化钠而检验才用石灰水」的原因，见「二氧化碳使石灰水变浑浊」）。生石灰作干燥剂只能干燥中性或碱性气体，如氧气、氢气、氨气，绝不能用它干燥二氧化碳、二氧化硫、氯化氢这些酸性气体，因为它们会与氧化钙或生成的氢氧化钙反应而被吃掉——干燥剂的选择看「是否与气体反应」，不看能不能吸水。整条线是初中最重要的「钙三角」：石灰石高温煅烧得生石灰（分解反应）、生石灰加水得熟石灰（化合、放热）、熟石灰吸收空气里的二氧化碳又变回碳酸钙（这也是石灰浆墙面硬化、抹的灰墙「出汗」的原因），三步把 CaCO₃、CaO、Ca(OH)₂ 串成一圈，配平与类型判断的题基本都绕这一圈出。此外熟石灰的两种工业用法都靠它的碱性：中和酸性土壤与酸性废水（比用氢氧化钠便宜且温和），以及与硫酸铜溶液配波尔多液杀菌剂。",
            en: "Pour water on quicklime and within seconds the lumps collapse into powder, white vapour pours off and the vessel is too hot to hold: the most violent exothermic combination in secondary-school chemistry and the one most often taken unsafely. About 64 kJ per mole of CaO is released, enough to boil part of the water, which is why self-heating rice packs and hand warmers use it, and why the little desiccant sachet marked do not eat, keep dry is dangerous once torn open or wetted. The product Ca(OH)2 is slaked or hydrated lime; mixed with water it gives milk of lime, and only the clear saturated layer is limewater - a dilute solution, since slaked lime is sparingly soluble, about 0.16 g per 100 g of water at 20 degrees, which is precisely why sodium hydroxide, not lime, is used to absorb carbon dioxide industrially (see CO2 Turns Limewater Cloudy). As a drying agent quicklime may serve neutral or basic gases such as oxygen, hydrogen and ammonia, but never acidic gases like carbon dioxide, sulfur dioxide or hydrogen chloride, which it would consume: the choice of a drying agent turns on reaction with the gas, not on thirst. This line completes the calcium triangle - calcining limestone decomposes it to CaO, adding water combines back to the hydroxide, and the hydroxide takes CO2 from air to return to CaCO3, which is also why freshly limewashed walls sweat and then harden. The two industrial uses of slaked lime both exploit its base strength: neutralising acidic soil and acidic wastewater, cheaper and gentler than sodium hydroxide, and, with copper sulfate solution, the fungicide Bordeaux mixture.",
          },
          tags: [{ zh: "化合", en: "Synthesis" }],
        },
        {
          id: "eq-limewater",
          subs: [
            {
              f: "CO₂",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: { zh: "待检验的气体。", en: "The gas being tested." },
              role: "l",
            },
            {
              f: "Ca(OH)₂",
              name: {
                zh: "澄清石灰水（氢氧化钙溶液）",
                en: "Limewater (calcium hydroxide solution)",
              },
              note: { zh: "检验试剂。", en: "The testing reagent." },
              role: "l",
            },
            {
              f: "CaCO₃↓",
              name: {
                zh: "碳酸钙（白色沉淀）",
                en: "Calcium carbonate (white precipitate)",
              },
              note: {
                zh: "使溶液变浑浊，CO₂ 的特征现象。",
                en: "Clouds the solution; the signature test for CO₂.",
              },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "反应生成。", en: "Formed in the reaction." },
              role: "r",
            },
          ],
          icon: "🥛",
          term: {
            zh: "二氧化碳使石灰水变浑浊",
            en: "CO₂ Turns Limewater Cloudy",
          },
          level: 1,
          oneLiner: {
            zh: "二氧化碳通入澄清石灰水生成白色沉淀。",
            en: "Carbon dioxide turns limewater cloudy with a white precipitate.",
          },
          eq: {
            lhs: "CO₂ + Ca(OH)₂",
            rhs: "CaCO₃↓ + H₂O",
          },
          detail: {
            zh: "使澄清石灰水变浑浊是二氧化碳的「特征反应」，但这句话有两个必须补全的边界。第一，检验与除杂是两回事：氢氧化钙微溶，20 ℃ 时 100 g 水只溶约 0.16 g，石灰水太稀，用来吸收（除去）混合气里的二氧化碳效果很差，除杂要改用氢氧化钠浓溶液；反过来说，因为浑浊来得显眼、又是钙盐的特征现象，检验才非它不可。所以「用石灰水检验、用氢氧化钠吸收」是一对必须成对记住的分工，也解释了为什么瓶壁长期涂石灰水保鲜鸡蛋反而能让蛋壳加厚（呼出的二氧化碳不断生成碳酸钙）。第二，浑浊不是二氧化碳独有的：二氧化硫作为酸性氧化物走完全平行的路，SO₂ + Ca(OH)₂ = CaSO₃↓ + H₂O，同样出白色沉淀，因此「通入石灰水变浑就断定是二氧化碳」是错误推理，混合气里若可能含二氧化硫要用品红溶液先确认再判断（见「常见气体的检验与验满」）。第三个层次是同一条反应的两面：持续通入过量二氧化碳，浑浊会重新变澄清，因为碳酸钙与水、二氧化碳结合成可溶的碳酸氢钙，CaCO₃ + H₂O + CO₂ = Ca(HCO₃)₂；把这份澄清液加热，碳酸氢钙分解、二氧化碳跑掉，白色沉淀又回来了。自然界里石灰岩溶洞与钟乳石正是这一进一退亿万年的结果——含二氧化碳的雨水溶解石灰岩形成碳酸氢钙溶液，滴落洞顶时二氧化碳逸出、碳酸钙重新沉积。第四，实验要求用新制的澄清石灰水，久置的会在液面结一层白膜（已经和空气里的二氧化碳反应完了），灵敏度大打折扣；这层白膜本身恰好证明空气中确实含有二氧化碳。",
            en: "Turning clear limewater cloudy is the characteristic reaction of carbon dioxide, but the sentence needs two boundaries. First, testing and scrubbing are different jobs: calcium hydroxide is sparingly soluble, only about 0.16 g per 100 g of water at 20 degrees, so limewater is far too dilute to strip CO2 from a gas stream - concentrated sodium hydroxide solution does that - while the test needs limewater precisely because the turbidity is loud and specific. Remember the pair as one rule: test with lime, absorb with soda. Second, cloudiness is not unique to CO2: sulfur dioxide, also an acidic oxide, runs an identical path, SO2 + Ca(OH)2 = CaSO3 + H2O, so concluding carbon dioxide from turbidity alone is a false inference; if sulfur dioxide may be present, confirm it first with fuchsin solution (see Testing Gases and Checking the Jar Is Full). Third, the same equilibrium has two faces: pass excess CO2 and the precipitate redissolves as soluble calcium hydrogen carbonate, CaCO3 + H2O + CO2 = Ca(HCO3)2; warm that clear liquid and the bicarbonate breaks down, releasing CO2 and bringing the white solid back. Cave stalactites are this give and take over geological time - rainwater charged with CO2 dissolves limestone, and at the drip the gas escapes and carbonate redeposits. Fourth, use freshly prepared limewater: a standing bottle skins over with calcium carbonate, already spent and much less sensitive, though that film itself proves carbon dioxide is present in air.",
          },
          tags: [{ zh: "检验", en: "Test" }],
        },
        {
          id: "eq-rust",
          subs: [
            {
              f: "4Fe",
              name: { zh: "铁", en: "Iron" },
              note: { zh: "被腐蚀的金属。", en: "The metal being corroded." },
              role: "l",
            },
            {
              f: "3O₂",
              name: { zh: "氧气（空气）", en: "Oxygen (from air)" },
              note: {
                zh: "发生吸氧腐蚀。",
                en: "Drives oxygen-absorption corrosion.",
              },
              role: "l",
            },
            {
              f: "2xH₂O",
              name: { zh: "水（潮湿环境）", en: "Water (moist conditions)" },
              note: {
                zh: "形成电解质膜，促成电化学腐蚀。",
                en: "Forms an electrolyte film enabling electrochemical corrosion.",
              },
              role: "l",
            },
            {
              f: "2Fe₂O₃·xH₂O",
              name: {
                zh: "铁锈（红棕色疏松固体）",
                en: "Rust (flaky reddish-brown solid)",
              },
              note: {
                zh: "主要成分为氧化铁水合物，疏松不能保护内部铁。",
                en: "Hydrated iron(III) oxide; porous, so it cannot protect the metal beneath.",
              },
              role: "r",
            },
          ],
          icon: "🟥",
          term: { zh: "铁生锈（吸氧腐蚀）", en: "Iron Rusting" },
          level: 1,
          oneLiner: {
            zh: "铁在潮湿空气中发生吸氧腐蚀生锈。",
            en: "Iron corrodes in moist air (oxygen absorption).",
          },
          eq: {
            lhs: "4Fe + 3O₂ + 2xH₂O",
            rhs: "2Fe₂O₃·xH₂O",
          },
          detail: {
            zh: "铁生锈的条件不是「水」也不是「氧气」，而是两者同时在场，这一点靠一组三管对照实验钉死：第一管放干燥剂与烘干的铁钉（有氧气、无水）不锈，第二管用煮沸后迅速冷却的蒸馏水浸没铁钉并在水面加一层植物油隔绝空气（有水、几乎无氧气）也不锈，第三管铁钉半浸在普通食盐水或自来水里则锈得最明显。结论写完整应是「铁与空气中的氧气、水共同作用」，只答其一不得分。方程式里的 2xH₂O 与产物 Fe₂O₃·xH₂O 中的 x 表示「水量不定」，它是组成记号而不是配平系数，不能拿它去算物质的量——这条方程式重在说明铁锈的主体是三氧化二铁的水合物。机理上这是电化学腐蚀，即微型原电池在工作：负极是铁失电子，Fe − 2e⁻ = Fe²⁺，正极上氧气在酸性很弱或中性的水膜里得电子，O₂ + 2H₂O + 4e⁻ = 4OH⁻，所以叫吸氧腐蚀；生成的亚铁离子继续被氧气氧化并脱水，最终变成含三价铁的红棕色铁锈。食盐水、酸性雨、工业废气让水膜导电性变强，因而显著加速——这也是海边钢架、桥梁与自行车链条最容易烂的原因；若水膜酸性较强，正极就换成析氢腐蚀（见「金属的腐蚀与防护」）。铁锈疏松多孔，会把水汽吸进来让腐蚀一层层向内进行到底，这与铝截然不同：铝表面生成的氧化铝致密、把金属封住，所以「铝比铁活泼却更耐腐蚀」是同一份答案的两半。防护办法都围绕切断条件：刷漆、涂油、搪瓷、烤蓝形成屏障；镀锌（白铁）即使镀层破损，锌作为负极先被腐蚀而铁被保护，叫牺牲阳极；镀锡（马口铁）破损后反而铁先烂，因为铁成了负极——两种罐头皮的取向完全相反，是原电池原理最实用的例证。船体水线以下挂锌块、地下管道通外加电流都属同一类，代价上全球每年因腐蚀损失约相当于生产总值的 3% 到 4%。",
            en: "Rusting needs neither water alone nor oxygen alone but both at once, and a three-tube control fixes this: a dried nail with desiccant (oxygen, no water) stays bright; a nail under boiled-then-cooled distillate sealed by a layer of oil (water, almost no oxygen) also stays; a half-immersed nail in tap or salt water rusts fastest. State the conclusion in full - iron acting with both oxygen and water - or the answer loses marks. The 2xH2O on the left and Fe2O3·xH2O on the right use x for variable water content, a composition symbol and not a balancing coefficient that can be quantified; the equation's job is to say rust is hydrated iron(III) oxide. The mechanism is electrochemical corrosion, a miniature galvanic cell: iron loses electrons at the anode, Fe - 2e- = Fe2+, while oxygen gains them in the neutral or weakly acidic film, O2 + 2H2O + 4e- = 4OH-, hence oxygen-absorption corrosion; the ferrous ion is then oxidised further and dehydrates into red-brown rust containing iron(III). Salt water, acid rain and industrial fumes make the film more conductive and accelerate it sharply, which is why seaside steelwork, bridges and bicycle chains fail first; in a strongly acidic film the cathode reaction switches to hydrogen evolution (see Corrosion and Protection). Rust is porous and holds moisture, so corrosion burrows inward to the last gram, whereas alumina on aluminium is dense and seals the metal - one answer, two halves, for why the more reactive aluminium outlasts iron. Every defence cuts a condition: paint, grease, enamel, bluing as barriers; galvanising (zinc) protects even through a scratch because zinc becomes the sacrificial anode, while tin plate, once breached, lets iron corrode because iron is then the anode - two food cans pointing opposite ways, the most practical demonstration of the galvanic principle. Zinc blocks on hulls and impressed current on buried pipelines belong to the same family, and corrosion costs the world roughly 3 to 4 percent of output each year.",
          },
          tags: [{ zh: "腐蚀", en: "Corrosion" }],
        },
        {
          id: "eq-bacl2",
          subs: [
            {
              f: "BaCl₂",
              name: { zh: "氯化钡溶液", en: "Barium chloride solution" },
              note: { zh: "提供 Ba²⁺。", en: "Supplies Ba²⁺." },
              role: "l",
            },
            {
              f: "H₂SO₄",
              name: {
                zh: "硫酸（含 SO₄²⁻）",
                en: "Sulfuric acid (contains SO₄²⁻)",
              },
              note: { zh: "待检验对象。", en: "The species being tested." },
              role: "l",
            },
            {
              f: "BaSO₄↓",
              name: {
                zh: "硫酸钡（白色沉淀）",
                en: "Barium sulfate (white precipitate)",
              },
              note: {
                zh: "不溶于稀硝酸，SO₄²⁻ 的特征检验。",
                en: "Insoluble in dilute nitric acid; the signature test for SO₄²⁻.",
              },
              role: "r",
            },
            {
              f: "2HCl",
              name: { zh: "盐酸", en: "Hydrochloric acid" },
              note: { zh: "同时生成。", en: "Formed alongside." },
              role: "r",
            },
          ],
          icon: "🧂",
          term: { zh: "氯化钡检验硫酸根", en: "Test Sulfate with BaCl₂" },
          level: 2,
          oneLiner: {
            zh: "氯化钡与硫酸生成白色硫酸钡沉淀。",
            en: "Barium chloride gives a white BaSO₄ precipitate with sulfuric acid.",
          },
          eq: {
            lhs: "BaCl₂ + H₂SO₄",
            rhs: "BaSO₄↓ + 2HCl",
          },
          detail: {
            zh: "「先加稀盐酸、再加氯化钡溶液」——这一句是检验硫酸根的全部答案，顺序与试剂都不能替换，因为每一步都在排除一个假阳性。先加稀盐酸的目的有三：一是排除碳酸根与亚硫酸根，它们与钡离子同样生成白色沉淀 BaCO₃、BaSO₃，但都能溶于盐酸而消失（「三出口」里的沉淀在酸里化掉了，见「复分解反应」）；二是排除银离子，若溶液里有 Ag⁺，加盐酸立刻产生不溶于稀硝酸的白色氯化银沉淀，先加酸就能提前发现并另作处理；三是把溶液调成酸性环境，使后面生成的硫酸钡沉淀得更完全。再加氯化钡出现白色沉淀、且沉淀不溶于稀盐酸，才可以说含 SO₄²⁻，反应为 Ba²⁺ + SO₄²⁻ = BaSO₄↓。因此两个常见错误做法必须点名：其一，只加氯化钡不加酸，可能被碳酸钡或氯化银误判；其二，改用稀硝酸酸化——稀硝酸（以及酸性条件下的硝酸根）有强氧化性，会把亚硫酸根氧化成硫酸根，于是原溶液明明只有亚硫酸根也会「检出」硫酸钡沉淀，这是最典型的假阳性来源，所以试剂要选盐酸与氯化钡，绝不能用硝酸钡代替氯化钡。BaSO₄ 的溶度积极小（约 1.1×10⁻¹⁰ 量级），既不溶于水也不溶于酸，这正是它能作「钡餐」的原因：不溶解就不会释放有毒的钡离子，因此医院用硫酸钡做消化道造影；反过来碳酸钡溶于胃酸，误食会中毒，急救办法是口服硫酸钠（或硫酸镁）溶液，把它转成不溶的硫酸钡（见「药品的存放与容器选择」）。定量上，硫酸钡重量法是测定硫或钡的经典办法：过滤、洗涤至无氯离子、灼烧恒重后称量，沉淀中钡与硫的固定比例（233 份对 32 份）就是计算依据。检验亚硫酸根反而要靠「加酸放出能使品红褪色的气体」，别把两者弄混（见「常见离子的检验」）。",
            en: "Take a sample, add dilute hydrochloric acid, then barium chloride solution - those few words are the whole answer for testing sulfate, and neither the order nor the reagents are swappable, because each step removes a false positive. Dilute hydrochloric acid first does three jobs: it eliminates carbonate and sulfite, which also give white precipitates with barium but dissolve in acid (the same acid-soluble exit of double decomposition); it exposes silver ion, since Ag+ throws down white silver chloride insoluble in dilute nitric acid and can be caught before the real test; and it fixes an acidic medium where barium sulfate precipitates most completely. Only then does a white precipitate, insoluble in dilute hydrochloric acid, prove SO4(2-): Ba2+ + SO4(2-) = BaSO4. Name the two wrong procedures. Adding barium chloride without acid can be fooled by barium carbonate or silver chloride. Acidifying with dilute nitric acid is worse, since nitric acid and nitrate under acidic conditions are strong oxidisers that convert sulfite to sulfate, so a solution containing only sulfite will faithfully report barium sulfate - the classic false positive, and the reason barium nitrate must never substitute for barium chloride. BaSO4 has a very small solubility product, on the order of 1.1e-10, and dissolves neither in water nor in acid, which is exactly why it is safe as the contrast medium swallowed for gastrointestinal X-rays: nothing dissolves, no toxic barium ion is released. Barium carbonate, by contrast, dissolves in stomach acid and poisons, and the antidote is drinking sodium or magnesium sulfate solution to convert it into the insoluble salt. Gravimetrically, barium sulfate weighing is the classical determination of sulfur or barium: filter, wash free of chloride, ignite to constant mass, and compute from the fixed ratio 233 to 32. Testing sulfite is a different act - acidify and smell the gas that bleaches fuchsin - so do not confuse the two.",
          },
          tags: [{ zh: "检验", en: "Test" }],
        },
        {
          id: "eq-nahco3",
          subs: [
            {
              f: "2NaHCO₃",
              name: {
                zh: "碳酸氢钠（小苏打）",
                en: "Sodium bicarbonate (baking soda)",
              },
              note: { zh: "受热分解。", en: "Decomposes on heating." },
              role: "l",
            },
            {
              f: "Na₂CO₃",
              name: { zh: "碳酸钠（纯碱）", en: "Sodium carbonate (soda ash)" },
              note: { zh: "残留固体。", en: "Residual solid." },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "反应生成。", en: "Formed in the reaction." },
              role: "r",
            },
            {
              f: "CO₂↑",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: {
                zh: "使面团疏松膨大，膨松剂原理。",
                en: "Aerates dough; the leavening principle.",
              },
              role: "r",
            },
          ],
          icon: "🫧",
          term: { zh: "碳酸氢钠受热分解", en: "NaHCO₃ Decomposition" },
          level: 2,
          oneLiner: {
            zh: "碳酸氢钠受热分解放出二氧化碳。",
            en: "Sodium bicarbonate decomposes on heating, releasing CO₂.",
          },
          eq: {
            lhs: "2NaHCO₃",
            cond: { zh: "加热 △", en: "heat Δ" },
            rhs: "Na₂CO₃ + H₂O + CO₂↑",
          },
          detail: {
            zh: "这是鉴别碳酸钠与碳酸氢钠最省事的一条实验：把固体装入干燥试管、管口略向下倾斜，加热后将气体通入澄清石灰水，石灰水变浑且管口内壁出现水珠，就说明样品是碳酸氢钠；而碳酸钠同样强热几乎没有任何变化（它要熔化到极高温度才分解）。所以「热稳定性对照」是这对俗名兄弟最干脆的区分法，也是「纯碱与小苏打」在「常见物质的俗名与主要成分」里必须连带记住的一条。装置的两个细节都是防倒流与防炸裂：管口向下是因为反应生成水，固体加热时冷凝水若倒流回灼热管底会炸裂；收集完要先把导管移开液面再熄灯（与「高锰酸钾受热分解」同一规矩）。量的关系值得算一次：每 168 g 碳酸氢钠放出 44 g 二氧化碳、并留下 106 g 碳酸钠；同样质量的碳酸钠则一点气体都不给。因此作膨松剂时碳酸氢钠的「单位质量放气量」更高，但单独用它有个缺陷——残留的碳酸钠显碱性，会让糕点发黄、有碱味甚至发苦，所以市售泡打粉是复配产品：小苏打加上酒石酸氢钾或磷酸二氢钙等酸性成分，遇水先放一部分气（酸碱中和）、烘烤时再放一部分（受热分解），两段放气让组织均匀，这也是「碳酸钠与盐酸」里「顺序与用量决定产物」的厨房版。医疗上它也用于中和过多胃酸，但代价是立刻在胃里生成二氧化碳，会胀气、嗳气，胃溃疡患者有穿孔风险，所以现代胃药更常用氢氧化铝或氢氧化镁（见「胃酸中和（胃药）」）。工业上它还是侯氏制碱法里第一个结晶析出的产物——正因为它在氨盐水中溶解度相对最小（见「侯氏制碱法」），而「碳酸氢钠溶液显碱性却属于酸式盐」这一点，也常在「酸碱」「俗名」两格里被考到。",
            en: "This is the laziest reliable way to tell soda from baking soda: heat the dry solid in a tube tilted mouth-down, pass the gas into limewater; clouding plus droplets inside the mouth proves sodium hydrogen carbonate, while sodium carbonate under the same strong heat barely changes, needing far higher temperatures to decompose. That thermal-stability contrast is the cleanest divider for this pair of common names, and belongs attached to Soda vs Baking Soda in Common Names and Formulas. Two apparatus details both fight backflow: the tilt is needed because the reaction makes water, and condensate running onto the hot bottom would crack the tube; and the delivery tube must leave the liquid before the lamp goes out, the same rule as Potassium Permanganate Decomposition. Worth one calculation: every 168 g of bicarbonate releases 44 g of CO2 and leaves 106 g of carbonate, whereas the same mass of carbonate yields no gas at all. So per gram bicarbonate raises more, yet used alone it leaves a flaw - the sodium carbonate residue is alkaline, yellowing the crumb and giving a soapy bitter taste, which is why commercial baking powder is compounded: soda cream plus an acid salt such as potassium hydrogen tartrate or monocalcium phosphate, giving one burst of gas when wet (acid meeting base) and a second on heating (thermal decomposition), two-stage leavening for an even crumb, the kitchen echo of order and quantity deciding products in Na2CO3 + HCl. Medically it neutralises excess stomach acid but generates carbon dioxide inside the stomach, causing bloating and belching with a perforation risk in ulcers, so modern antacids prefer aluminium or magnesium hydroxide (see Antacid Chemistry). Industrially it is the first crystal to appear in the Hou process precisely because it is the least soluble in the ammoniated brine (see Hou's Process), and the fact that its solution is alkaline although it is an acid salt keeps appearing in the Acids and Bases and common-name entries.",
          },
          tags: [{ zh: "分解", en: "Decomposition" }],
        },
      ],
    },
    /* ===================== 金属与非金属 ===================== */
    {
      key: "metals-nonmetals",
      icon: "🧲",
      title: { zh: "常见金属与非金属", en: "Metals & Nonmetals" },
      items: [
        {
          id: "mn-sodium",
          subs: [
            {
              f: "Na",
              name: { zh: "钠（银白色轻金属）", en: "Sodium (silvery light metal)" },
              note: { zh: "密度比水小、硬度小可用刀切，必须泡在煤油里隔绝空气与水。", en: "Less dense than water, soft enough to cut; stored under paraffin." },
              role: "l",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "提供反应掉的氢，同时是放热使钠熔成小球的原因。", en: "Supplies the hydrogen taken up, and the heat that melts the bead." },
              role: "l",
            },
            {
              f: "NaOH",
              name: { zh: "氢氧化钠（烧碱）", en: "Sodium hydroxide (caustic soda)" },
              note: { zh: "使酚酞变红的碱性物质，俗名火碱、苛性钠。", en: "The alkali that turns phenolphthalein red; lye, caustic soda." },
              role: "r",
            },
            {
              f: "H₂",
              name: { zh: "氢气", en: "Hydrogen" },
              note: { zh: "气体推动小球游动并嘶嘶作响，点燃有尖锐爆鸣声。", en: "The gas that propels the bead; it detonates sharply when lit." },
              role: "r",
            },
            {
              f: "Na₂O₂",
              name: { zh: "过氧化钠（淡黄色）", en: "Sodium peroxide (pale yellow)" },
              note: { zh: "氧以过氧根 O₂²⁻ 形式存在，与 CO₂、H₂O 都能放出氧气，用作供氧剂。", en: "Holds oxygen as O₂²⁻; gives O₂ with both CO₂ and water, hence an oxygen source." },
              role: "l",
            },
            {
              f: "CO₂",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: { zh: "被过氧化钠吸收并换成氧气，密闭供氧就靠这一进一出。", en: "Absorbed and traded for oxygen — the whole point of a sealed oxygen source." },
              role: "l",
            },
            {
              f: "Na₂CO₃",
              name: { zh: "碳酸钠（纯碱、苏打）", en: "Sodium carbonate (soda ash, washing soda)" },
              note: { zh: "属于盐而不是碱，俗名却叫纯碱；去油污靠的是水解显碱性。", en: "A salt, not a base, yet named for its alkalinity; it degreases by hydrolysing basic." },
              role: "r",
            },
            {
              f: "O₂",
              name: { zh: "氧气", en: "Oxygen" },
              note: { zh: "供氧与潜水艇再生空气的有效产物。", en: "The usable output for breathing apparatus and submarines." },
              role: "r",
            },
          ],
          icon: "🧂",
          term: { zh: "钠及其化合物", en: "Sodium and Its Compounds" },
          level: 1,
          oneLiner: {
            zh: "钠浮水面熔成小球四处游动；过氧化钠能吸收二氧化碳放出氧气。",
            en: "Sodium skims, melts and darts on water; sodium peroxide trades CO₂ for O₂.",
          },
          eq: [
            {
              lhs: "2Na + 2H₂O",
              cond: { zh: "常温，滴入酚酞", en: "room temperature, with phenolphthalein" },
              rhs: "2NaOH + H₂↑",
              rel: "equal",
            },
            {
              lhs: "2Na₂O₂ + 2CO₂",
              cond: { zh: "常温即可，密闭供氧", en: "proceeds cold; sealed oxygen supply" },
              rhs: "2Na₂CO₃ + O₂",
              rel: "equal",
            },
          ],
          detail: {
            zh: "钠的性质可以用课堂上的五个字记住：浮、熔、游、响、红——密度比水小所以浮，反应放热且钠熔点低（约 98 ℃）所以熔成小球，气体推动它游动并发出嘶嘶声，滴有酚酞的水最后变红。切开的银白截面很快变暗，是因为常温下 4Na + O₂ = 2Na₂O；若加热则先熔后燃、生成淡黄色的 Na₂O₂，同一个金属因温度不同而给出两种产物。Na₂O₂ 里氧是 −1 价，它既是供氧剂又是氧化剂，能吸收 CO₂ 放 O₂，所以用在呼吸面具与潜艇里；注意它不属于碱性氧化物（碱性氧化物与酸只生成盐和水）。碳酸钠与碳酸氢钠的区分是必考项：同温下溶解度 Na₂CO₃ 大于 NaHCO₃，受热只有 NaHCO₃ 分解出 CO₂，加同浓度盐酸时 NaHCO₃ 立即冒泡而 Na₂CO₃ 先生成 NaHCO₃ 再放气（所以逐滴加入时谁先冒泡能反推组成），加 CaCl₂ 溶液只有 Na₂CO₃ 出白色沉淀。两者都能与酸反应，所以胃药里用 NaHCO₃ 中和胃酸，但胃溃疡患者禁用——产生的气体有穿孔风险。",
            en: "Five words carry sodium's classroom demo: it floats, melts, darts, hisses, and reddens the phenolphthalein — floats because it is lighter than water, melts because the heat of reaction exceeds its 98 °C melting point, darts and hisses as hydrogen pushes it. A freshly cut face dulls at once because 4Na + O₂ = 2Na₂O at room temperature, while heated sodium melts, then burns to pale-yellow Na₂O₂: one metal, two products, decided by temperature. In the peroxide oxygen sits at −1, so it is both an oxygen donor and an oxidiser, taking in CO₂ and giving back O₂ — which is why it serves in breathing masks and submarines; note it is not a basic oxide, since basic oxides yield only salt and water with acid. Telling soda ash from bicarbonate is a standing exam item: at the same temperature carbonate dissolves more, only bicarbonate releases CO₂ on heating, and with acid of the same concentration bicarbonate fizzes immediately while carbonate must first become bicarbonate, so which one bubbles first under dropwise acid reveals the mixture; added calcium chloride precipitates only the carbonate. Both neutralise stomach acid, which is why sodium bicarbonate appears in antacids — and why it is forbidden when an ulcer is present, since the gas it frees risks a perforation.",
          },
          tags: [
            { zh: "金属", en: "Metal" },
            { zh: "元素化合物", en: "Main-Group" },
          ],
        },
        {
          id: "mn-aluminum",
          subs: [
            {
              f: "Al",
              name: { zh: "铝", en: "Aluminium" },
              note: { zh: "活泼却耐腐蚀，靠的是表面那层致密的氧化铝薄膜。", en: "Active yet durable, thanks to a tight film of its oxide." },
              role: "l",
            },
            {
              f: "HCl",
              name: { zh: "盐酸", en: "Hydrochloric acid" },
              note: { zh: "氧化膜先被酸溶掉，之后铝与酸持续反应。", en: "The film dissolves first, then the metal keeps going." },
              role: "l",
            },
            {
              f: "AlCl₃",
              name: { zh: "氯化铝", en: "Aluminium chloride" },
              note: { zh: "酸性条件下的产物，遇到过量氨水会沉淀出氢氧化铝。", en: "Its acidic-side product; excess ammonia throws down the hydroxide." },
              role: "r",
            },
            {
              f: "NaOH",
              name: { zh: "氢氧化钠（强碱）", en: "Sodium hydroxide (strong base)" },
              note: { zh: "铝能与强碱溶液反应，这是它区别于铁、铜的显著性质。", en: "Aluminium reacts with strong base, the property that sets it off from iron and copper." },
              role: "l",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "参与反应并提供氢氧根中的氢。", en: "Takes part, supplying the hydrogen of the hydroxide." },
              role: "l",
            },
            {
              f: "NaAlO₂",
              name: { zh: "偏铝酸钠", en: "Sodium aluminate" },
              note: { zh: "碱性溶液中的存在形式，通入 CO₂ 就析出氢氧化铝。", en: "How aluminium lives in alkali; passing CO₂ precipitates the hydroxide." },
              role: "r",
            },
            {
              f: "H₂",
              name: { zh: "氢气", en: "Hydrogen" },
              note: { zh: "两条路径都放出氢气，所以铝锅不宜久存碱水或盐水。", en: "Both routes free hydrogen — hence no long storage of alkali or brine in aluminium." },
              role: "r",
            },
          ],
          icon: "🥫",
          term: { zh: "铝及其化合物", en: "Aluminium and Its Compounds" },
          level: 2,
          oneLiner: {
            zh: "铝既溶于盐酸又溶于氢氧化钠，氢氧化铝是典型的两性氢氧化物。",
            en: "Aluminium dissolves in both acid and strong base; its hydroxide is the classic amphoteric one.",
          },
          eq: [
            {
              lhs: "2Al + 6HCl",
              cond: { zh: "常温，先溶掉氧化膜", en: "room temperature, film first" },
              rhs: "2AlCl₃ + 3H₂↑",
              rel: "equal",
            },
            {
              lhs: "2Al + 2NaOH + 2H₂O",
              cond: { zh: "强碱溶液", en: "strong base" },
              rhs: "2NaAlO₂ + 3H₂↑",
              rel: "equal",
            },
          ],
          detail: {
            zh: "铝在地壳里是含量最高的金属元素，但人类直到 19 世纪电解法问世才用得起它——因为太活泼，碳还原不动它。它活泼却耐腐蚀，靠的是表面一层致密氧化铝薄膜；一旦这层膜被汞盐破坏（铝汞齐）或被碱溶掉，铝就能持续与水反应长出白色毛状物。真正的分界性质是两性：铝、Al₂O₃、Al(OH)₃ 三者都能既与酸又与强碱反应，所以鉴别 AlCl₃ 与 MgCl₂ 用过量 NaOH——前者先沉淀后溶解，后者沉淀不消。同一条性质也带来一个经典顺序题：往 AlCl₃ 溶液里逐滴加 NaOH，沉淀先增到最大再部分溶解；反过来往 NaOH 里滴 AlCl₃，开始几乎不见沉淀（生成的 Al(OH)₃ 立刻被过量碱溶走），后来才出现不消的沉淀——两种顺序现象不同，所以只用互滴就能鉴别而不需要别的试剂。实验室制 Al(OH)₃ 不用强碱而用氨水，因为 Al(OH)₃ 不溶于弱碱、不会过量溶解。Al₂O₃ 熔点很高，是耐火材料与刚玉（红宝石、蓝宝石的主体就是含微量铬或铁、钛的刚玉）的来源；电解炼铝用冰晶石（Na₃AlF₆）作熔剂把熔化温度从 2050 ℃ 降到约 960 ℃，这仍是耗电大户，所以废铝回收比炼原铝省九成以上能量。",
            en: "Aluminium is the most abundant metal in the crust, yet humanity only put it to use after electrolysis arrived in the 19th century — it is too active for carbon to reduce. It resists corrosion despite that activity because of a tight oxide skin; destroy the skin with a mercury salt or with alkali and the metal will keep reacting with water, growing white hairs. Its defining trait is amphoterism: the metal, its oxide and its hydroxide all react with both acid and strong base, which is how aluminium chloride is told from magnesium chloride — excess sodium hydroxide dissolves the former's precipitate and leaves the latter's. The same trait drives a classic order question: drip sodium hydroxide into aluminium chloride and the precipitate grows, then partly redissolves; drip the other way and little appears at first, since any hydroxide formed is instantly taken back by the excess alkali, and only later does a permanent precipitate show. The two orders look different, so mutual dropwise addition alone distinguishes them without another reagent. A laboratory makes aluminium hydroxide with ammonia rather than strong base precisely because it will not dissolve in a weak base. Aluminium oxide's very high melting point makes it a refractory and the body of corundum — ruby and sapphire are corundum with traces of chromium or iron and titanium — and smelting uses cryolite to bring the working temperature down from about 2050 °C to roughly 960 °C, still power-hungry enough that recycling aluminium saves over ninety percent of the energy of primary metal.",
          },
          tags: [
            { zh: "金属", en: "Metal" },
            { zh: "两性", en: "Amphoteric" },
          ],
        },
        {
          id: "mn-iron",
          subs: [
            {
              f: "Fe",
              name: { zh: "铁（0 价）", en: "Iron (valence 0)" },
              note: { zh: "三角的起点，既可被氧化成 Fe²⁺ 也能直接到 Fe³⁺。", en: "The triangle's origin: oxidisable to iron(II) or straight to iron(III)." },
              role: "l",
            },
            {
              f: "H₂O",
              name: { zh: "水蒸气", en: "Steam" },
              note: { zh: "必须是蒸气，铁与液态水常温下几乎不反应。", en: "Steam specifically — cold liquid water barely touches iron." },
              role: "l",
            },
            {
              f: "Fe₃O₄",
              name: { zh: "四氧化三铁（磁性氧化铁）", en: "Iron(II,III) oxide (magnetic)" },
              note: { zh: "含 +2 与 +3 两种价态，铁丝在氧气中燃烧与高温水蒸气反应都得它。", en: "Carries both valences; flame in oxygen and hot steam both end here." },
              role: "r",
            },
            {
              f: "H₂",
              name: { zh: "氢气", en: "Hydrogen" },
              note: { zh: "高温下铁把水里的氢置换出来。", en: "Iron takes the hydrogen out of water at red heat." },
              role: "r",
            },
            {
              f: "Fe(OH)₂",
              name: { zh: "氢氧化亚铁（白色）", en: "Iron(II) hydroxide (white)" },
              note: { zh: "极怕氧气，制备时要把滴管插到液面下并隔绝空气。", en: "Air-sensitive: the dropper must go below the surface and the dish must be covered." },
              role: "l",
            },
            {
              f: "O₂",
              name: { zh: "氧气", en: "Oxygen" },
              note: { zh: "把白色迅速氧化，是灰绿色出现的唯一原因。", en: "What turns white to grey-green so quickly." },
              role: "l",
            },
            {
              f: "Fe(OH)₃",
              name: { zh: "氢氧化铁（红褐色）", en: "Iron(III) hydroxide (rust-brown)" },
              note: { zh: "铁锈与铁红的主体，失水得 Fe₂O₃。", en: "The body of rust and of iron-red pigment; loses water to give Fe₂O₃." },
              role: "r",
            },
          ],
          icon: "🩸",
          term: { zh: "铁及其化合物的「铁三角」", en: "Iron and Its Triangle" },
          level: 2,
          oneLiner: {
            zh: "Fe、Fe²⁺、Fe³⁺ 靠氧化剂与还原剂互相转化，KSCN 只认 Fe³⁺。",
            en: "Iron, iron(II) and iron(III) convert by oxidation and reduction; thiocyanate answers only to iron(III).",
          },
          eq: [
            {
              lhs: "3Fe + 4H₂O",
              cond: { zh: "高温（水蒸气）", en: "red heat (steam)" },
              rhs: "Fe₃O₄ + 4H₂",
              rel: "equal",
            },
            {
              lhs: "4Fe(OH)₂ + O₂ + 2H₂O",
              cond: { zh: "常温，白色迅速变质", en: "air, the white turns at once" },
              rhs: "4Fe(OH)₃",
              rel: "equal",
            },
          ],
          figure: `<svg viewBox="0 0 360 150" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="14" font-size="11" fill="currentColor">铁三角：谁把谁变成谁 Iron's triangle of valences</text>
  <g font-size="9" fill="currentColor">
    <text x="150" y="40">Fe（0）</text>
    <text x="52" y="112">Fe²⁺</text>
    <text x="258" y="112">Fe³⁺</text>
  </g>
  <g stroke="currentColor" stroke-opacity="0.45" fill="none">
    <path d="M138 52 L78 96"/><path d="M186 52 L246 96"/><path d="M96 110 L236 110"/>
  </g>
  <g font-size="7.5" fill="#d4a017">
    <text x="30" y="66">氧化剂</text>
    <text x="264" y="66">强氧化剂</text>
    <text x="150" y="128">Fe³⁺ → Fe²⁺ 用 Fe、Cu、I⁻</text>
  </g>
  <g font-size="6.5" fill="currentColor" fill-opacity="0.6">
    <text x="24" y="75">mild: H⁺, Cu²⁺, S, I₂</text>
    <text x="258" y="75">strong: Cl₂, HNO₃, H₂O₂</text>
    <text x="150" y="137">and back with a reducer</text>
  </g>
  <text x="6" y="146" font-size="8.5" fill="#e5484d">⚠ 铁与硫、与碘只到 Fe²⁺；氯气才能把它推到 Fe³⁺</text>
</svg>`,
          detail: {
            zh: "铁的三种价态构成一个三角：Fe 到 Fe²⁺ 用弱一点的氧化剂（稀酸、Cu²⁺、硫、碘），Fe 或 Fe²⁺ 到 Fe³⁺ 必须靠强氧化剂（Cl₂、硝酸、H₂O₂、酸性高锰酸钾），Fe³⁺ 回到 Fe²⁺ 用 Fe、Cu 或 I⁻。这条规律里最容易被忽略的是氧化剂的强度决定价态：铁与硫共热只得 FeS、与碘只生成 FeI₂，而氯气能把铁直接推到 FeCl₃，所以「变价金属 + 非金属」的产物要先问非金属的氧化能力。Fe²⁺ 的检验是一套连招：先加 KSCN 不显色，再加氯水立刻变血红，说明原液里是 Fe²⁺ 而不是 Fe³⁺；反过来 Fe³⁺ 一加 KSCN 就红。Fe(OH)₂ 的制备必须与氧气抢时间：滴管插到液面以下、液面盖一层植物油或苯，白色沉淀仍会迅速变灰绿再变红褐，那灰绿色是中间产物而不是杂质。补血剂里的铁是 Fe²⁺，所以同服维生素 C（抗氧化剂）能防止它被氧化，而敞放过的药片失效也是同一道理。Fe³⁺ 溶液遇苯酚显紫色，是实验室里另一条灵敏反应；印刷制版与蚀刻铜板的氯化铁溶液靠的则是 Fe³⁺ 能把 Cu 氧化成 Cu²⁺。",
            en: "Iron's three valences form a triangle: to iron(II) with a milder oxidiser (dilute acid, copper ion, sulfur, iodine), to iron(III) only with a strong one (chlorine, nitric acid, peroxide, acid permanganate), and back down to iron(II) with iron, copper or iodide. The point students miss is that the oxidiser sets the valence: heated with sulfur iron gives only FeS, with iodine only FeI₂, while chlorine drives it to FeCl₃ — so ask what the nonmetal can do before writing the product. Testing for iron(II) is a combination: thiocyanate first shows nothing, then a drop of chlorine water turns it blood-red, proving the solution held iron(II) rather than iron(III); genuine iron(III) reddens on the first touch. Making iron(II) hydroxide is a race with oxygen — dropper below the surface, a lid of oil or benzene, and the white still slides through grey-green to rust-brown, that grey-green being an intermediate rather than an impurity. Iron supplements carry iron(II), which is why vitamin C is taken with them: it sacrifices itself to oxidation, and a bottle left open fails for the same reason. Iron(III) with phenol gives violet, another sensitive laboratory reaction, and ferric chloride etches copper plates because it can pull copper into solution.",
          },
          tags: [
            { zh: "金属", en: "Metal" },
            { zh: "变价", en: "Variable Valence" },
          ],
        },
        {
          id: "mn-chlorine",
          subs: [
            {
              f: "Cl₂",
              name: { zh: "氯气（黄绿色、有毒）", en: "Chlorine (yellow-green, toxic)" },
              note: { zh: "闻的方法仍是手扇引气；泄漏可用肥皂水或稀碱喷洒吸收。", en: "Waft, never lean in; a spill can be knocked down with dilute alkali." },
              role: "l",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "氯气能溶于水（1:2），并与水发生可逆反应。", en: "Chlorine dissolves about 1:2 and reacts reversibly with it." },
              role: "l",
            },
            {
              f: "HCl",
              name: { zh: "盐酸（氢氯酸）", en: "Hydrochloric acid" },
              note: { zh: "氯水中酸性主要来自它，但真正漂白的是 HClO。", en: "Most of chlorine water's acidity, though the bleaching is hypochlorous." },
              role: "r",
            },
            {
              f: "HClO",
              name: { zh: "次氯酸（漂白与消毒的主体）", en: "Hypochlorous acid (the bleaching agent)" },
              note: { zh: "弱酸但强氧化，见光分解为盐酸与氧气，所以氯水要放棕色瓶。", en: "A weak acid but a strong oxidiser; light splits it, hence the amber bottle." },
              role: "r",
            },
            {
              f: "NaOH",
              name: { zh: "氢氧化钠（吸收液）", en: "Sodium hydroxide (the scrub)" },
              note: { zh: "实验室多余的氯气靠浓氢氧化钠吸收，不能用敞口的水。", en: "Waste chlorine is scrubbed with concentrated alkali, never an open dish of water." },
              role: "l",
            },
            {
              f: "NaCl",
              name: { zh: "氯化钠", en: "Sodium chloride" },
              note: { zh: "歧化反应的还原产物。", en: "The reduced half of the disproportionation." },
              role: "r",
            },
            {
              f: "NaClO",
              name: { zh: "次氯酸钠（漂白液有效成分）", en: "Sodium hypochlorite (the active bleach)" },
              note: { zh: "「84 消毒液」的主体；与洁厕灵（含盐酸）混合会放出氯气。", en: "The household bleach — and never mix it with acid toilet cleaners, or chlorine gas follows." },
              role: "r",
            },
          ],
          icon: "🟢",
          term: { zh: "氯及其化合物", en: "Chlorine and Its Compounds" },
          level: 2,
          oneLiner: {
            zh: "氯气与水、与碱都发生歧化；真正能漂白的是次氯酸而不是氯气。",
            en: "Chlorine disproportionates in water and in alkali; the bleach is hypochlorous acid, not the gas.",
          },
          eq: [
            {
              lhs: "Cl₂ + H₂O",
              rhs: "HCl + HClO",
              rel: "equilibrium",
            },
            {
              lhs: "Cl₂ + 2NaOH",
              cond: { zh: "常温，吸收尾气", en: "cold; the waste scrub" },
              rhs: "NaCl + NaClO + H₂O",
              rel: "equal",
            },
          ],
          detail: {
            zh: "干燥的氯气不能使有色布条褪色，湿润的能——因为褪色靠的是 Cl₂ 与水生成的 HClO，这条对比实验是「氯气能漂白」这个说法的纠正。氯水的成分要拆成三层：分子有 Cl₂、H₂O、HClO，离子有 H⁺、Cl⁻、ClO⁻（还有水电离的 OH⁻），所以它同时有酸性、氧化性与漂白性，久置就变成稀盐酸（HClO 见光分解放出 O₂）。漂白粉与漂白精的有效成分是 Ca(ClO)₂，它靠空气中的 CO₂ 与水把 HClO 慢慢放出来起作用，也因此失效（制取与失效的完整过程见「化学与生产生活」里的漂白粉一条）。次氯酸盐的三条工程约束：与酸接触会放出氯气（所以含氯消毒液不能与洁厕灵同用）、受热与光照分解（所以要阴凉避光保存）、浓度越高对皮肤与织物的伤害越大（所以使用前必须按说明稀释）。干燥氯气可以储存在钢瓶里，因为常温下干氯与铁不反应，但一旦含水就剧烈腐蚀——这条同样是「先干燥再反应」的工程例子。",
            en: "Dry chlorine will not fade a coloured cloth; damp chlorine will — because the fading belongs to HClO made with water, and that contrast experiment is the correction to the phrase «chlorine bleaches». Read chlorine water in layers: molecules Cl₂, H₂O and HClO, ions H⁺, Cl⁻ and ClO⁻ (plus a little hydroxide from water), so it is at once acidic, oxidising and bleaching — and standing in the light it ends as dilute hydrochloric acid once the hypochlorous acid gives up oxygen. The active ingredient of bleaching powder is calcium hypochlorite, which works by letting air and moisture release HClO slowly, and fails by the same route (the full preparation and spoilage is under bleach in Chemistry in Industry & Life). Three engineering constraints on hypochlorites: contact with acid frees chlorine gas, so chlorinated disinfectants never meet acid toilet cleaner; heat and light decompose them, so they keep cool and dark; and strength damages both skin and fabric, so dilution to label ratio comes before use. Dry chlorine can be kept in a steel cylinder because it does not attack iron when dry, and corrodes it furiously once damp — one more case of drying before reacting.",
          },
          tags: [
            { zh: "非金属", en: "Nonmetal" },
            { zh: "歧化", en: "Disproportionation" },
          ],
        },
        {
          id: "mn-sulfur",
          subs: [
            {
              f: "Fe",
              name: { zh: "铁", en: "Iron" },
              note: { zh: "与硫共热只被氧化到 +2，因为硫的氧化性比氯弱。", en: "Oxidised only to +2 by sulfur, which is a milder oxidiser than chlorine." },
              role: "l",
            },
            {
              f: "S",
              name: { zh: "硫（硫黄）", en: "Sulfur (brimstone)" },
              note: { zh: "既是铁与共热的反应物，也是二氧化硫与硫化氢归中的产物。", en: "Reactant with hot iron, and the product when sulfur dioxide meets hydrogen sulfide." },
              role: "l",
            },
            {
              f: "FeS",
              name: { zh: "硫化亚铁（黑）", en: "Iron(II) sulfide (black)" },
              note: { zh: "不是 Fe₂S₃；它能溶于酸放出臭鸡蛋气的 H₂S。", en: "Not iron(III) sulfide; it dissolves in acid, releasing the rotten-egg odour of H₂S." },
              role: "r",
            },
            {
              f: "SO₂",
              name: { zh: "二氧化硫", en: "Sulfur dioxide" },
              note: { zh: "无色、刺激性、密度比空气大、易溶于水（约 1:40）。", en: "Colourless and pungent, denser than air, very soluble, about 1:40." },
              role: "l",
            },
            {
              f: "H₂S",
              name: { zh: "硫化氢", en: "Hydrogen sulfide" },
              note: { zh: "硫为 −2 价、只有还原性，与 SO₂ 相遇双双变回 0 价。", en: "Sulfur at −2, reducing only; meet SO₂ and both fall back to zero." },
              role: "l",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "归中反应的另一个产物。", en: "The other product of the comproportionation." },
              role: "r",
            },
          ],
          icon: "🟡",
          term: { zh: "硫及其化合物", en: "Sulfur and Its Compounds" },
          level: 2,
          oneLiner: {
            zh: "SO₂ 使高锰酸钾褪色是还原性、使品红褪色才是漂白；浓硫酸常温下让铁铝钝化。",
            en: "SO₂ decolourising permanganate is reduction, not bleaching; cold concentrated sulfuric acid passivates iron and aluminium.",
          },
          eq: [
            {
              lhs: "Fe + S",
              cond: { zh: "共热，只到 +2 价", en: "heated together; +2 only" },
              rhs: "FeS",
              rel: "equal",
            },
            {
              lhs: "SO₂ + 2H₂S",
              cond: { zh: "常温，归中到 0 价", en: "comproportionation to valence zero" },
              rhs: "3S↓ + 2H₂O",
              rel: "equal",
            },
          ],
          detail: {
            zh: "硫是淡黄色晶体，不溶于水、微溶于酒精、易溶于二硫化碳，所以洗试管壁上的硫要用二硫化碳或热氢氧化钠溶液而不是水。它与变价金属反应只能把金属氧化到低价：与铁得 FeS、与铜得 Cu₂S，而氯气能把铁推到 FeCl₃——「同一种金属 + 不同非金属」的价态对比就记在这一条上。二氧化硫有三条主线：① 酸性氧化物，与水生成亚硫酸、能使石灰水变浑浊，现象与二氧化碳相同，所以区分两者要用品红溶液而不是石灰水；② 还原性，能被氧气（需催化剂）、氯水、高锰酸钾、Fe³⁺ 氧化，它使酸性高锰酸钾褪色靠的是还原性而不是漂白；③ 漂白性，与有色物质化合生成不稳定的无色物质，加热后颜色恢复——这与氯气那种把色素氧化掉的永久漂白是两种机理，把两组现象并排比较就是判断漂白机理的标准方法。浓硫酸有三性：吸水性（作干燥剂，但不能干燥氨气这类碱性气体，也不能干燥 H₂S、HBr、HI 这类还原性气体）、脱水性（把有机物里的氢氧按水的比例夺走，蔗糖炭化实验就是它）、强氧化性（热的浓硫酸能氧化铜与碳，自身被还原为 SO₂）。常温下浓硫酸与浓硝酸会让铁、铝表面钝化生成致密氧化膜，所以能用铝罐或铁罐储运浓硫酸——钝化不是不反应，而是被一层膜挡住，加热后反应会重新加速。硫酸型酸雨的路径有两条：SO₂ 先被氧化为 SO₃ 再与水结合，或 SO₂ 溶在雨水中直接氧化成硫酸；减少的出路是燃料脱硫与排烟脱硫（见「化学与环境」的石灰石-石膏法）。SO₄²⁻ 的检验规矩（先加稀盐酸酸化、再加 BaCl₂）见速查表的离子检验一条。",
            en: "Sulfur is a pale-yellow crystal, insoluble in water, sparingly in alcohol, freely in carbon disulfide — so sulfur on a tube wall comes off with the disulfide or with hot alkali, never with water. With a variable-valence metal it reaches only the low state: iron gives FeS and copper Cu₂S, while chlorine drives iron to FeCl₃, and that contrast between nonmetals on one metal is the lesson to keep. Sulfur dioxide has three threads: an acidic oxide that forms sulfurous acid with water and clouds lime water just as CO₂ does, which is why the two are told apart with fuchsin rather than lime water; a reducer, taken by oxygen under catalysis, by chlorine water, by permanganate and by iron(III) — its fading of acid permanganate is reduction, not bleaching; and a bleach, adding on to colour to form an unstable colourless compound that gives the colour back on warming, a different mechanism from chlorine's oxidative destruction, and setting the two demonstrations side by side is the standard test of which one is at work. Concentrated sulfuric acid carries three properties: it absorbs water (so it dries gases, though not alkaline ones like ammonia nor reducing ones like H₂S, HBr, HI); it dehydrates (stripping hydrogen and oxygen from organics in water's ratio, which is the black sponge of the sugar experiment); and hot acid oxidises, attacking copper and carbon and retreating as SO₂. At room temperature the concentrated acid and concentrated nitric acid passivate iron and aluminium under a tight oxide film, which is why road tankers can carry them in aluminium or steel — passivation is not refusal but a barrier, and heating restarts the reaction. Sulfuric acid rain arrives by two routes: SO₂ oxidised to SO₃ and then taken up by water, or SO₂ dissolved in the drop and oxidised there; the fixes are fuel desulfurisation and flue-gas scrubbing, laid out under the limestone-gypsum process in Chemistry and Environment. The rule for testing sulfate — acidify with dilute hydrochloric acid first, then barium chloride — is in the ion tests of the quick reference.",
          },
          tags: [
            { zh: "非金属", en: "Nonmetal" },
            { zh: "酸雨", en: "Acid Rain" },
          ],
        },
        {
          id: "mn-nitrogen",
          subs: [
            {
              f: "NO",
              name: { zh: "一氧化氮（无色）", en: "Nitric oxide (colourless)" },
              note: { zh: "不溶于水、有毒，遇空气立刻变红棕，所以只能排水法收集。", en: "Insoluble and toxic, reddening in air at once — collect over water only." },
              role: "l",
            },
            {
              f: "O₂",
              name: { zh: "氧气", en: "Oxygen" },
              note: { zh: "常温下就能把 NO 氧化，不需要催化剂。", en: "Oxidises NO unaided, at room temperature." },
              role: "l",
            },
            {
              f: "NO₂",
              name: { zh: "二氧化氮（红棕、有毒）", en: "Nitrogen dioxide (red-brown, toxic)" },
              note: { zh: "它既是 NO 氧化的产物，又是与水反应制硝酸的原料。", en: "Product of oxidising NO, and the feed that water turns into nitric acid." },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "与 NO₂ 反应时，三分之一的氮又回到 NO。", en: "With NO₂ it sends a third of the nitrogen back as NO." },
              role: "l",
            },
            {
              f: "HNO₃",
              name: { zh: "硝酸", en: "Nitric acid" },
              note: { zh: "三大强酸之一，不论浓稀都有强氧化性。", en: "One of the three strong acids; oxidising whether concentrated or dilute." },
              role: "r",
            },
          ],
          icon: "💨",
          term: { zh: "氮及其化合物", en: "Nitrogen and Its Compounds" },
          level: 2,
          oneLiner: {
            zh: "N≡N 难断所以氮气惰性；NO 只能排水收集，NO₂ 与水反应自己回到 NO。",
            en: "Nitrogen is idle because the triple bond resists breaking; NO is gathered over water, NO₂ gives back NO to water.",
          },
          eq: [
            {
              lhs: "2NO + O₂",
              cond: { zh: "常温即行，红棕色出现", en: "instant in air; the red-brown appears" },
              rhs: "2NO₂",
              rel: "equal",
            },
            {
              lhs: "3NO₂ + H₂O",
              cond: { zh: "工业制硝酸的关键一步", en: "the step that makes nitric acid" },
              rhs: "2HNO₃ + NO",
              rel: "equal",
            },
          ],
          detail: {
            zh: "氮气占空气约 78%，之所以不活泼是 N≡N 的键能高达约 946 kJ/mol（与「反应热与焓变」一条呼应），打断它需要高温、放电或催化剂，工业合成氨与自然界闪电固氮都在这三个门槛上。氮的氧化物只先记两个：NO 无色、不溶于水、有毒，与空气接触立刻变成红棕的 NO₂，这也是收集 NO 只能用排水法的原因；NO₂ 易与水反应生成硝酸与 NO，工业上就靠这一循环把氮氧化物推成硝酸（完整流程见「化学与工程」的氨氧化法制硝酸一条）。氨是无色有刺激性气味、极易溶于水（常温常压约 1:700）的气体，所以喷泉实验能成；它是中学阶段唯一的常见碱性气体，湿润的红色石蕊试纸遇它变蓝，遇 HCl 蒸气立刻生成白烟（NH₃ + HCl = NH₄Cl）。铵盐都易溶于水、受热易分解：NH₄Cl 受热赫然“消失”、在冷处又结回白色固体，现象看着像升华，其实先分解后化合（速查表里也强调过这一点）；NH₄⁺ 的检验是加浓 NaOH 并加热，用湿润的红色石蕊试纸靠近管口检验产生的气体。硝酸不论浓稀都有强氧化性，与金属反应一般不放氢气而是放出氮的氧化物：浓硝酸得 NO₂、稀硝酸得 NO，常温下浓硝酸让铁、铝钝化。王水（浓盐酸与浓硝酸按体积 3:1 混合）能溶金与铂，靠的是强氧化与配位共同作用。NO、NO₂ 与碳氢化合物一起构成光化学烟雾，也是硝酸型酸雨与水体富营养化的来源之一。",
            en: "Nitrogen fills about 78% of air and sits idle because the triple bond costs some 946 kJ/mol to break (see the entry on reaction heat and enthalpy): only high temperature, an electric arc or a catalyst gets through it, and industrial ammonia synthesis and natural lightning fixation both stand on those thresholds. Two oxides suffice at first: NO is colourless, insoluble, toxic and reddens in air to NO₂, which is exactly why it can only be gathered over water; NO₂ reacts readily with water to nitric acid and NO, and industry runs that loop to make the acid (the full chain is under ammonia oxidation in Chemical Engineering). Ammonia is colourless, stinging and enormously soluble (about 1:700 at room temperature and pressure), which is what lets a fountain work; it is the one common alkaline gas of the course, blueing wet red litmus and smoking up at once against hydrogen chloride vapour. All ammonium salts dissolve readily and break down on heating: ammonium chloride apparently vanishes and re-forms white in a cold spot, an imitation of sublimation that is really decomposition then recombination (the quick reference flags this too); the test for ammonium is concentrated sodium hydroxide plus warmth, with wet red litmus at the mouth of the tube. Nitric acid oxidises whether strong or weak, and with metals it gives nitrogen oxides rather than hydrogen — NO₂ from the concentrated acid, NO from the dilute — while cold concentrated acid passivates iron and aluminium. Aqua regia, three parts hydrochloric to one of nitric, dissolves gold and platinum by oxidation and complexation together. NO and NO₂ with hydrocarbons make photochemical smog, and they are also a source of nitric-type acid rain and of nutrient enrichment in water.",
          },
          tags: [
            { zh: "非金属", en: "Nonmetal" },
            { zh: "氮循环", en: "Nitrogen Cycle" },
          ],
        },
        {
          id: "mn-carbon",
          subs: [
            {
              f: "C",
              name: { zh: "碳（金刚石、石墨、C₆₀ 的单质）", en: "Carbon (diamond, graphite, C₆₀)" },
              note: { zh: "常温不活泼，高温既能燃烧也能夺氧，是本条的主线。", en: "Idle when cold, both combustible and reducing when hot — the thread of this entry." },
              role: "l",
            },
            {
              f: "O₂",
              name: { zh: "氧气", en: "Oxygen" },
              note: { zh: "充足得 CO₂、不足得 CO，同一堆碳给出两种产物。", en: "Plentiful it gives CO₂, scarce it gives CO — one pile of carbon, two products." },
              role: "l",
            },
            {
              f: "CuO",
              name: { zh: "氧化铜（黑）", en: "Copper(II) oxide (black)" },
              note: { zh: "被碳或 CO 夺走氧后变回红色的铜，是还原性的演示。", en: "Gives its oxygen to carbon or CO and turns red as metal — the reduction demo." },
              role: "l",
            },
            {
              f: "H₂O",
              name: { zh: "水（蒸气）", en: "Water (steam)" },
              note: { zh: "与赤热的碳生成水煤气，也参与碳酸与石灰水的反应。", en: "Makes water gas with red-hot carbon, and appears in carbonic acid and lime water." },
              role: "l",
            },
            {
              f: "Ca(OH)₂",
              name: { zh: "氢氧化钙（石灰水的溶质）", en: "Calcium hydroxide (in lime water)" },
              note: { zh: "只用于检验而不是吸收 CO₂，因为它微溶、量太少。", en: "Used to test for CO₂, not to trap it — it barely dissolves, so there is too little." },
              role: "l",
            },
            {
              f: "CO₂",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: { zh: "不燃烧也不支持燃烧、密度比空气大；遇石灰水就生成沉淀，也能被赤热碳夺回氧。", en: "Neither burns nor supports burning, heavier than air; it precipitates lime water and is itself reduced by hot carbon." },
              role: "r",
            },
            {
              f: "CO",
              name: { zh: "一氧化碳", en: "Carbon monoxide" },
              note: { zh: "只比 CO₂ 少一个氧：可燃、可还原、剧毒、难溶于水。", en: "One oxygen short of CO₂: flammable, reducing, deadly toxic, insoluble." },
              role: "r",
            },
            {
              f: "Cu",
              name: { zh: "铜（红色）", en: "Copper (red)" },
              note: { zh: "黑色粉末变红就是它，是碳与 CO 还原性的共同证据。", en: "The black powder reddens because of it — the shared proof of carbon's and CO's reduction." },
              role: "r",
            },
            {
              f: "H₂",
              name: { zh: "氢气", en: "Hydrogen" },
              note: { zh: "水煤气的一半，与 CO 一起都是可燃气体。", en: "Half of water gas; with CO it makes the mixture burnable." },
              role: "r",
            },
            {
              f: "H₂CO₃",
              name: { zh: "碳酸", en: "Carbonic acid" },
              note: { zh: "使石蕊变红、使汽水刺口，受热就分解回水和 CO₂。", en: "Reddens litmus and pricks the tongue of soda; warm it and it goes back to water and CO₂." },
              role: "r",
            },
            {
              f: "CaCO₃",
              name: { zh: "碳酸钙（石灰石、大理石、贝壳）", en: "Calcium carbonate (limestone, marble, shell)" },
              note: { zh: "石灰水里的白色沉淀，也是实验室制 CO₂ 的原料与建筑材料。", en: "The white in cloudy lime water, the feedstock for laboratory CO₂, and a building stone." },
              role: "r",
            },
            {
              f: "CaO",
              name: { zh: "氧化钙（生石灰）", en: "Calcium oxide (quicklime)" },
              note: { zh: "碳酸钙高温分解的产物，遇水放出大量热变成熟石灰。", en: "What hot limestone leaves; it frees much heat with water and becomes slaked lime." },
              role: "r",
            },
            {
              f: "Ca(HCO₃)₂",
              name: { zh: "碳酸氢钙（可溶）", en: "Calcium hydrogencarbonate (soluble)" },
              note: { zh: "浑浊又变清的原因，也是钟乳石与暂时硬水的载体。", en: "Why cloudiness clears again — and what stalactites and temporary hardness ride on." },
              role: "r",
            },
          ],
          icon: "⚫",
          term: { zh: "碳及其化合物", en: "Carbon and Its Compounds" },
          level: 1,
          oneLiner: {
            zh: "只差一个氧的 CO 与 CO₂ 性质相反；碳的三种单质差别全在结构。",
            en: "CO and CO₂ differ by one atom of oxygen and behave oppositely; carbon's three forms differ only in structure.",
          },
          eq: [
            {
              lhs: "C + O₂",
              cond: { zh: "点燃，氧气充足", en: "ignited, air plentiful" },
              rhs: "CO₂",
              rel: "equal",
            },
            {
              lhs: "2C + O₂",
              cond: { zh: "点燃，氧气不足", en: "ignited, air short" },
              rhs: "2CO",
              rel: "equal",
            },
            {
              lhs: "C + 2CuO",
              cond: { zh: "高温，黑色粉末变红", en: "high heat; the black turns red" },
              rhs: "2Cu + CO₂↑",
              rel: "equal",
            },
            {
              lhs: "C + CO₂",
              cond: { zh: "高温，吸热", en: "high heat, endothermic" },
              rhs: "2CO",
              rel: "equal",
            },
            {
              lhs: "C + H₂O",
              cond: { zh: "高温，制水煤气", en: "high heat; water gas" },
              rhs: "CO + H₂",
              rel: "equal",
            },
            {
              lhs: "2CO + O₂",
              cond: { zh: "点燃，蓝色火焰", en: "ignited, blue flame" },
              rhs: "2CO₂",
              rel: "equal",
            },
            {
              lhs: "CO + CuO",
              cond: { zh: "加热，尾气须点燃或收集", en: "heated; burn or trap the tail gas" },
              rhs: "Cu + CO₂",
              rel: "equal",
            },
            {
              lhs: "CO₂ + H₂O",
              rhs: "H₂CO₃",
              rel: "equilibrium",
            },
            {
              lhs: "CO₂ + Ca(OH)₂",
              cond: { zh: "检验 CO₂ 的方法", en: "the test for CO₂" },
              rhs: "CaCO₃↓ + H₂O",
              rel: "equal",
            },
            {
              lhs: "CaCO₃",
              cond: { zh: "高温（煅烧石灰石）", en: "strong heat (lime kiln)" },
              rhs: "CaO + CO₂↑",
              rel: "equal",
            },
            {
              lhs: "CaCO₃ + H₂O + CO₂",
              cond: { zh: "CO₂ 过量，沉淀溶解", en: "excess CO₂; the solid redissolves" },
              rhs: "Ca(HCO₃)₂",
              rel: "equilibrium",
            },
          ],
          figure: `<svg viewBox="0 0 360 190" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="14" font-size="11" fill="currentColor">CO 与 CO₂：差一个氧，处处相反</text>
  <line x1="6" y1="20" x2="354" y2="20" stroke="currentColor" stroke-opacity="0.25"/>
  <line x1="196" y1="24" x2="196" y2="146" stroke="currentColor" stroke-opacity="0.2"/>
  <text x="62" y="32" font-size="9" fill="#d4a017">CO₂</text>
  <text x="206" y="32" font-size="9" fill="#e5484d">CO</text>
  <g font-size="8" fill="currentColor" fill-opacity="0.7">
    <text x="6" y="48">溶解性</text>
    <text x="6" y="64">可燃性</text>
    <text x="6" y="80">还原性</text>
    <text x="6" y="96">与石灰水</text>
    <text x="6" y="112">与石蕊</text>
    <text x="6" y="128">收集方法</text>
    <text x="6" y="144">尾气处理</text>
  </g>
  <g font-size="8" fill="currentColor">
    <text x="62" y="48">能溶，约 1:1</text>
    <text x="62" y="64">不燃烧，也不支持燃烧</text>
    <text x="62" y="80">无，只与赤热碳反应</text>
    <text x="62" y="96">变浑浊 — 这就是检验</text>
    <text x="62" y="112">变红（生成碳酸）</text>
    <text x="62" y="128">向上排空气法</text>
    <text x="62" y="144">可直接排空</text>
    <text x="206" y="48">难溶，所以能排水法</text>
    <text x="206" y="64">可燃，蓝色火焰</text>
    <text x="206" y="80">还原 CuO 与 Fe₂O₃</text>
    <text x="206" y="96">不反应</text>
    <text x="206" y="112">不变色</text>
    <text x="206" y="128">只能排水法</text>
    <text x="206" y="144">必须点燃或收集</text>
  </g>
  <text x="62" y="156" font-size="6.5" fill="currentColor" fill-opacity="0.6">soluble, supports nothing</text>
  <text x="206" y="156" font-size="6.5" fill="currentColor" fill-opacity="0.6">insoluble, burns, poisons</text>
  <text x="6" y="172" font-size="8.5" fill="#e5484d">⚠ CO 无色无味，泄漏时人察觉不到；中毒先开窗并把人移到通风处</text>
  <text x="6" y="184" font-size="6.5" fill="currentColor" fill-opacity="0.6">Carbon monoxide gives no warning — ventilate first, never switch on a light to look</text>
</svg>`,
          detail: {
            zh: "碳是生命的骨架元素，也是中学化学里最完整的一条「单质—氧化物—酸—盐」线索。单质有三种同素异形体：金刚石里每个碳与四个碳相连、构成空间网状，所以是自然界最硬的物质且不导电，用来做钻头与切割刀具；石墨由六元碳环铺成平面层，层间作用弱、层内有可移动的电子，所以又滑又导电，做铅笔芯、电极和高温润滑剂；C₆₀ 则是 60 个碳构成的足球状分子。三者的化学性质几乎相同（燃烧都只生成 CO₂），物理性质却差这么多，「结构决定性质」这一句在这里最直观。石墨在高温高压与催化剂下能变成金刚石，这是化学变化；转化吸热，也说明石墨能量更低、更稳定。木炭、活性炭、焦炭与炭黑被叫作无定形碳，实质是石墨的微小晶粒，吸附力来自疏松多孔——防毒面具与制糖脱色靠的是吸附而非反应，以物理变化为主。常温下碳很不活泼，用墨（碳黑）写的字画能存千年，木头电线杆埋入地下的那段先烧成炭也是借这层碳防腐；一到高温就活泼：氧气充足得 CO₂、不足得 CO，还能从金属氧化物里夺氧（与 CuO 共热时黑色粉末变红、生成的气体使澄清石灰水变浑浊），工业上让赤热的碳与水蒸气反应得到的 CO 与 H₂ 混合气就叫水煤气。CO 与 CO₂ 只差一个氧，性质却处处相反：CO 无色无味、难溶于水（所以只能排水法收集）、能燃烧（蓝色火焰）、能还原 CuO 与 Fe₂O₃（高炉里真正还原铁矿石的是 CO），毒在它与血红蛋白的结合能力远高于氧气，而它没有气味，泄漏时人察觉不到——冬天燃煤、在车库里长时间怠速开暖风都可能引起煤气中毒，发现后先开窗并把人移到通风处，不要开灯或点火查看。CO₂ 一般既不燃烧也不支持燃烧、密度比空气大，倾倒时阶梯蜡烛从下面那支先灭；它溶于水生成碳酸使紫色石蕊变红，汽水的刺激口感就来自这一步；它使澄清石灰水变浑浊，这是 CO₂ 的检验方法，而要除掉 CO₂ 应改用氢氧化钠溶液，因为后者溶解得多、吸收能力强得多。继续通 CO₂ 还会出现第二步：不溶的 CaCO₃ 变成可溶的 Ca(HCO₃)₂，浑浊又转清，溶洞与钟乳石的形成、烧水壶里暂时硬水的沉淀都在这一步可逆上循环。碳酸盐里最常用的是 CaCO₃（石灰石、大理石、白垩以及蛋壳贝壳的主体），高温煅烧得生石灰与 CO₂，也是实验室制 CO₂ 的原料；实验室选药品有三条规矩：不用稀硫酸（生成的 CaSO₄ 微溶，盖住大理石表面让反应自行停止），不用浓盐酸（挥发出的 HCl 混进气体，干扰石灰水检验），不用 Na₂CO₃ 粉末（反应太快，来不及收集）。干冰升华吸热，用于冷藏运输、人工降雨与舞台烟雾；CO₂ 灭火器使用时要握木柄或橡胶套，避免喷出时的低温冻伤手指。含碳物质燃烧放出的 CO₂ 与光合作用吸收的 CO₂ 本是一个循环，化石燃料等于把远古储存下来的碳在短时间内释放出来，所以减排与捕集是出路（见「化学与环境」的二氧化碳捕集与资源化一条）。",
            en: "Carbon is the skeleton of living matter and the most complete single thread in the school course: element, oxides, acid, salt. Three allotropes open it: in diamond every carbon bonds to four others in a space-filling network, which makes it the hardest natural thing and an insulator, good for drill bits and cutting; graphite is sheets of six-membered carbon rings, weakly held together and full of mobile electrons inside the sheet, so it is both slippery and conductive — pencil leads, electrodes, high-temperature grease; C₆₀ is a football of sixty carbons. All three behave the same chemically (each burns to CO₂ alone) and differ hugely in body, which is the cleanest illustration that structure decides properties. Graphite can be turned into diamond under heat, pressure and a catalyst — a chemical change, and an endothermic one, so graphite sits lower in energy and is the more stable form. Charcoal, activated carbon, coke and lamp black are called amorphous but are really micro-crystals of graphite, and their adsorbing power comes from a porous skeleton: gas masks and the decolourising of sugar adsorb rather than react, mostly a physical change. Cold carbon is idle — ink is lamp black, which is why a thousand-year-old scroll has not faded, and the buried end of a wooden pole is charred on purpose to keep rot off it. Hot carbon is greedy: it gives CO₂ in plenty of air and CO in short supply, and it strips oxygen from metal oxides (heated with copper oxide the black powder turns red and the gas clouds lime water), while red-hot carbon and steam give the CO-and-hydrogen mixture known as water gas. CO and CO₂ differ by a single oxygen yet contradict each other everywhere: CO is colourless, odourless, insoluble (so it can only be gathered over water), burns with a blue flame and reduces copper oxide and iron oxide — in a blast furnace it is CO, not carbon, that does most of the iron-making — and it poisons because hemoglobin holds it far more tightly than oxygen, with no smell to warn of a leak. Winter stoves and a car idling in a closed garage are the usual settings; if poisoning is suspected, open the windows and move the person to fresh air, and never switch on a light or test for a flame. Carbon dioxide neither burns nor supports burning and is heavier than air, so in the tiered-candle pour the lower flame goes out first; it dissolves to carbonic acid and reddens litmus, which is the prick in a soft drink; it clouds lime water, and that is the test for it — but to remove it use sodium hydroxide solution instead, which dissolves far more and so absorbs far better. Pass more CO₂ and a second step follows: insoluble calcium carbonate becomes soluble calcium hydrogencarbonate and the cloud clears again, the same reversible line that builds caves and stalactites and lays the temporary hardness in a kettle. The commonest carbonate is calcium carbonate — limestone, marble, chalk, eggshell and the raw material for laboratory CO₂ — which gives quicklime and CO₂ when burned, and three rules govern how it is used in the flask: no dilute sulfuric acid, because the sparingly soluble calcium sulfate coats the stone and stops the reaction; no concentrated hydrochloric acid, because its vapour rides along into the gas and disturbs the lime-water test; and no sodium carbonate powder, because it goes off too fast to collect. Dry ice subliming takes heat with it, hence cold chains, rain seeding and stage fog, and a CO₂ extinguisher is held by its wooden or rubber grip so the freezing jet does not bite the hand. Burning carbon and photosynthesis once balanced each other; fossil fuel spends in a century what the ground saved over ages, which is why cutting and capturing are the way out — see carbon capture in Chemistry and Environment.",
          },
          tags: [
            { zh: "非金属", en: "Nonmetal" },
            { zh: "碳循环", en: "Carbon Cycle" },
          ],
        },
        {
          id: "mn-activity",
          subs: [
            {
              f: "Zn",
              name: { zh: "锌", en: "Zinc" },
              note: { zh: "与稀硫酸反应速度适中，是实验室制氢气的首选。", en: "Reacts at a workable pace with dilute sulfuric acid — the laboratory choice for hydrogen." },
              role: "l",
            },
            {
              f: "H₂SO₄",
              name: { zh: "稀硫酸", en: "Dilute sulfuric acid" },
              note: { zh: "只有一般的稀酸才能被置换出氢，浓硫酸与硝酸另有走法。", en: "Only ordinary dilute acid gives hydrogen this way; the concentrated and the nitric follow other paths." },
              role: "l",
            },
            {
              f: "ZnSO₄",
              name: { zh: "硫酸锌", en: "Zinc sulfate" },
              note: { zh: "留在溶液里的产物，蒸干可得白色晶体。", en: "Stays in solution; evaporated it gives colourless crystals." },
              role: "r",
            },
            {
              f: "H₂",
              name: { zh: "氢气", en: "Hydrogen" },
              note: { zh: "点燃前要验纯，发生装置与制二氧化碳同一类。", en: "Test for purity before lighting; the generator is the same type as for CO₂." },
              role: "r",
            },
            {
              f: "Fe",
              name: { zh: "铁", en: "Iron" },
              note: { zh: "与酸、与盐溶液反应都只到 +2 价，溶液变浅绿。", en: "With acids and salts it stops at +2, tinting the solution pale green." },
              role: "l",
            },
            {
              f: "CuSO₄",
              name: { zh: "硫酸铜（胆矾的溶液）", en: "Copper sulfate (blue vitriol solution)" },
              note: { zh: "蓝色的来源；湿法炼铜就靠铁把它的铜置换出来。", en: "Where the blue comes from; iron displaces its copper out of solution — the ancient wet smelting." },
              role: "l",
            },
            {
              f: "FeSO₄",
              name: { zh: "硫酸亚铁", en: "Iron(II) sulfate" },
              note: { zh: "是亚铁盐而不是铁盐；补铁剂用的就是这一类价态。", en: "An iron(II) salt, not an iron(III) one — the valence supplements use." },
              role: "r",
            },
            {
              f: "Cu",
              name: { zh: "铜（红色）", en: "Copper (red)" },
              note: { zh: "既是铁置换的产物，又能去置换更后面的银。", en: "Both what iron displaces and what displaces the still nobler silver." },
              role: "l",
            },
            {
              f: "AgNO₃",
              name: { zh: "硝酸银（可溶）", en: "Silver nitrate (soluble)" },
              note: { zh: "盐必须可溶才能发生置换；氯化银不溶，就不与铜反应。", en: "Only a soluble salt works; copper does nothing to insoluble silver chloride." },
              role: "l",
            },
            {
              f: "Cu(NO₃)₂",
              name: { zh: "硝酸铜（蓝）", en: "Copper(II) nitrate (blue)" },
              note: { zh: "铜上挂银时溶液转蓝，是这条反应的现象证据。", en: "As silver plates out the solution turns blue — the visible evidence." },
              role: "r",
            },
            {
              f: "Ag",
              name: { zh: "银（树状结晶）", en: "Silver (dendritic crystals)" },
              note: { zh: "排在很后面，所以银在自然界能以游离态存在。", en: "Low in the series, which is why native silver exists at all." },
              role: "r",
            },
            {
              f: "Na",
              name: { zh: "钠（极活泼）", en: "Sodium (very active)" },
              note: { zh: "排在水之前，所以先与水反应，换不出盐里的金属。", en: "Sits ahead of water, so it reacts with the water first and never frees the metal." },
              role: "l",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "盐溶液里的水比盐先找到钠，所以烧杯里只得氢氧化物。", en: "In solution water reaches sodium before the salt does, so only the hydroxide appears." },
              role: "l",
            },
            {
              f: "NaOH",
              name: { zh: "氢氧化钠", en: "Sodium hydroxide" },
              note: { zh: "生成后立刻与 CuSO₄ 结合成蓝色沉淀，看不到铜。", en: "It meets the copper salt at once as a blue precipitate, never as copper metal." },
              role: "r",
            },
          ],
          icon: "🪙",
          term: { zh: "金属活动性顺序", en: "The Reactivity Series of Metals" },
          level: 1,
          oneLiner: {
            zh: "钾钙钠镁铝……铜汞银铂金：前面的能把后面的置换出来，但钾钙钠会先与水反应。",
            en: "Potassium, calcium, sodium, magnesium, aluminium ... copper, mercury, silver, gold: the front displaces the back, except that the first three go for water first.",
          },
          eq: [
            {
              lhs: "Zn + H₂SO₄",
              cond: { zh: "常温，实验室制氢气", en: "room temperature; laboratory hydrogen" },
              rhs: "ZnSO₄ + H₂↑",
              rel: "equal",
            },
            {
              lhs: "Fe + CuSO₄",
              cond: { zh: "湿法炼铜，铁片上挂红", en: "wet copper-making; the blade reddens" },
              rhs: "FeSO₄ + Cu",
              rel: "equal",
            },
            {
              lhs: "Cu + 2AgNO₃",
              cond: { zh: "铜丝入银盐，长银树", en: "copper in silver nitrate; a silver tree grows" },
              rhs: "Cu(NO₃)₂ + 2Ag",
              rel: "equal",
            },
            {
              lhs: "2Na + 2H₂O",
              cond: { zh: "先与水反应，换不出铜", en: "water first; no copper is freed" },
              rhs: "2NaOH + H₂↑",
              rel: "equal",
            },
          ],
          figure: `<svg viewBox="0 0 360 152" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="14" font-size="11" fill="currentColor">金属活动性顺序 The reactivity series</text>
  <g font-size="8" fill="currentColor">
    <text x="8" y="36">K</text><text x="29" y="36">Ca</text><text x="50" y="36">Na</text>
    <text x="71" y="36">Mg</text><text x="92" y="36">Al</text><text x="113" y="36">Zn</text>
    <text x="134" y="36">Fe</text><text x="155" y="36">Sn</text><text x="176" y="36">Pb</text>
    <text x="194" y="36" fill="#d4a017">(H)</text><text x="218" y="36">Cu</text>
    <text x="239" y="36">Hg</text><text x="260" y="36">Ag</text><text x="281" y="36">Pt</text>
    <text x="302" y="36">Au</text>
  </g>
  <line x1="8" y1="42" x2="312" y2="42" stroke="currentColor" stroke-opacity="0.35"/>
  <text x="120" y="52" font-size="7" fill="currentColor" fill-opacity="0.6">activity falls  活动性减弱  ></text>
  <g stroke="#d4a017" stroke-opacity="0.7">
    <line x1="8" y1="60" x2="100" y2="60"/><line x1="113" y1="60" x2="186" y2="60"/><line x1="218" y1="60" x2="312" y2="60"/>
  </g>
  <g font-size="7" fill="#d4a017">
    <text x="8" y="70">与酸极快</text>
    <text x="113" y="70">能置换稀酸的氢</text>
    <text x="218" y="70">与稀酸不放氢</text>
  </g>
  <g font-size="7.5" fill="currentColor">
    <text x="6" y="88">① 前面 + 稀盐酸 / 稀硫酸 → 盐 + H₂↑</text>
    <text x="6" y="102">② 前换后：前面的金属把后面的从它的盐溶液里置换出来（盐须可溶）</text>
    <text x="6" y="116">③ 验证三种金属的两条套路：两金夹一盐 / 两盐夹一金</text>
  </g>
  <text x="6" y="130" font-size="8" fill="#e5484d">⚠ 钾、钙、钠太活泼，进盐溶液先与水反应，换不出金属</text>
  <text x="6" y="142" font-size="6.5" fill="#e5484d" fill-opacity="0.85">Potassium, calcium and sodium eat the water first; and the order is measured, not counted in electrons</text>
</svg>`,
          detail: {
            zh: "背下来的是口诀「钾钙钠镁铝，锌铁锡铅（氢），铜汞银铂金」，但它是实验测出的顺序，本质是金属在水溶液里失去电子变成阳离子的倾向由强到弱。它能回答三类问题。第一类是金属与酸：排在氢前面的能置换稀盐酸与稀硫酸里的氢，而且位置越前反应越快，镁最快、锌适中、铁较慢，铜与银则不冒泡；但两条例外必须记：浓硫酸与硝酸有强氧化性，跟金属反应不放氢气而是放出二氧化硫或氮的氧化物（浓硫酸与浓硝酸在常温下还会让铁铝钝化），所以「活泼金属 + 酸 → 氢气」只适用于稀的非氧化性酸。第二类是金属与盐溶液：排在前面的金属把排在后面的从它的溶液里置换出来，前提是盐必须可溶，所以铜不能与氯化银固体反应；铁在这类反应里只到 +2 价，铁片入硫酸铜溶液后表面挂上一层红色铜、溶液由蓝变浅绿，这就是早至西汉记载的「曾青得铁则化为铜」，北宋已用胆矾溶液大规模炼铜，今日湿法冶金的思路仍同此理。最大的坑在钾、钙、钠：它们活泼到先与水反应，所以钠块扔进硫酸铜溶液只会浮、熔、游、响，得到氢氧化钠与氢气，接着氢氧化钠与硫酸铜生成蓝色氢氧化铜沉淀，根本得不到铜——「先水后盐」是这类题的固定答案。第三类是验证三种金属的顺序，套路有两种：「两金夹一盐」取中间那种金属的溶液，把两端金属分别放进去（验证锌、铁、铜就用硫酸亚铁溶液加锌片与铜片，锌能置换、铜不能）；「两盐夹一金」取中间那种金属的单质，分别放进两端金属的溶液里（铁放进硫酸锌溶液不反应，放进硫酸铜溶液则能置换出铜）。这个顺序还解释了几件事：金以游离态存在于自然界，因为几乎没东西能氧化它；波尔多液（硫酸铜与石灰乳）不能用铁桶盛，因为铁会把其中的铜置换出来并弄坏铁桶；原电池里一般较活泼的一极作负极（具体判定见「电化学」的原电池一条，并注意镁-铝-氢氧化钠这类特例）。最后两个易错点：活动性强弱与失去电子的数目无关，铝失 3 个电子仍排在镁后面；金属是薄片还是粉末影响的是反应快慢（表面积），而不是能否反应，不能拿来比活动性。高温下碳与一氧化碳也能把后面的金属从它们的氧化物里还原出来（见「碳及其化合物」与高炉炼铁一条），那属于另一套判据，不要与水溶液里的置换混在一起。",
            en: "The chant is potassium, calcium, sodium, magnesium, aluminium, zinc, iron, tin, lead, (hydrogen), copper, mercury, silver, platinum, gold — but the series is measured, not invented: it ranks how willingly each metal gives up electrons to become an ion in water. It answers three kinds of questions. First, metal with acid: anything above hydrogen releases hydrogen from dilute hydrochloric and dilute sulfuric acid, and the further up, the faster — magnesium fastest, zinc workable, iron slow, while copper and silver stay quiet. Two exceptions must travel with the rule: concentrated sulfuric and nitric acid are strong oxidisers, so they give sulfur dioxide or nitrogen oxides rather than hydrogen (and cold concentrated sulfuric acid passivates iron and aluminium), which means 'active metal plus acid yields hydrogen' holds only for dilute, non-oxidising acids. Second, metal with a salt solution: a front metal displaces a back one, provided the salt is dissolved — copper does nothing to solid silver chloride — and iron lands at +2, so a blade in copper sulfate grows a red coating while the blue fades to pale green. That is the 'blue vitriol met by iron turns to copper' recorded as early as the Western Han, scaled up in the Song from leaching baths, and the same idea behind modern hydrometallurgy. The biggest trap is potassium, calcium and sodium: they are so eager that they attack the water first, so a lump of sodium in copper sulfate solution floats, melts, darts and hisses and leaves sodium hydroxide and hydrogen, which then throws down blue copper hydroxide — never copper. 'Water before salt' is the fixed answer to that family of questions. Third, proving the order among three metals, done two ways: two metals bracket one salt (take the middle metal's solution and dip the outer two in it — to sort zinc, iron and copper use iron(II) sulfate with a strip of each, zinc reacts and copper does not), or two salts bracket one metal (take the middle metal and dip it into the outer two's solutions). The series also explains several loose facts: gold is found native because almost nothing can oxidise it; the Bordeaux mixture of copper sulfate and lime cannot be kept in an iron bucket, since iron takes the copper out of it and ruins the bucket in the process; and in a cell the more active electrode is usually the negative one — see the galvanic cell entry for the details and for exceptions such as magnesium-aluminium in strong base. Two final confusions: the number of electrons given up does not set the rank, since aluminium, though it sheds three, sits below magnesium; and foil versus powder changes only how fast a reaction runs (surface area), never whether it can run, so rate is not a measure of position. Hot carbon and carbon monoxide can also pull the nobler metals out of their oxides — that belongs to a different table, covered under carbon and the blast furnace, and should not be confused with displacement in solution.",
          },
          tags: [
            { zh: "金属", en: "Metal" },
            { zh: "置换反应", en: "Displacement" },
          ],
        },
      ],
    },
    /* ===================== 速查表 ===================== */
    {
      key: "quickref",
      icon: "📋",
      title: { zh: "速查表", en: "Quick Reference" },
      items: [
        {
          id: "qr-common-names",
          icon: "🏷️",
          term: { zh: "常见物质的俗名与主要成分", en: "Common Names and What They Really Are" },
          level: 1,
          oneLiner: {
            zh: "纯碱不是碱、干冰不是冰、水银不是银：常用俗名与它们的真实成分对照。",
            en: "Soda ash is no base, dry ice is no ice, quicksilver is no silver: the common names beside what they actually are.",
          },
          detail: {
            zh: "俗名有三个坑。一是分类错位：纯碱 Na₂CO₃、小苏打 NaHCO₃、胆矾 CuSO₄·5H₂O 都是盐，水溶液却有的显碱性，因而被叫成「碱」；二是混合物与纯净物不分：王水是浓盐酸与浓硝酸按体积 3∶1 现配，碱石灰是 NaOH 与 CaO 的混合物，漂白粉的有效成分只是 Ca(ClO)₂，天然气、沼气、坑气都以 CH₄ 为主但不是纯甲烷；三是水合数字被丢掉：写 CuSO₄ 是无色粉末，蓝色晶体是 CuSO₄·5H₂O（胆矾）。另外「主要成分」这个词要谨慎：石灰石与大理石以 CaCO₃ 为主，但含 MgCO₃、SiO₂ 等杂质；石英、水晶、玛瑙与沙子的主要成分都是 SiO₂，区别在晶体颗粒与杂质而不是成分。",
            en: "Three traps hide in these names. First, the class is wrong: Na₂CO₃, NaHCO₃ and CuSO₄·5H₂O are all salts, and the first two are called 'alkali' only because their solutions are basic. Second, mixtures are named as if pure: aqua regia is HCl and HNO₃ in a 3-to-1 volume ratio mixed at the bench, soda lime is NaOH with CaO, bleaching powder works through just its Ca(ClO)₂, and natural, marsh and firedamp are mostly CH₄ but not pure methane. Third, the water of crystallisation gets dropped: anhydrous CuSO₄ is a pale powder, the blue crystals are CuSO₄·5H₂O. And 'mainly' matters — limestone and marble are mostly CaCO₃ with MgCO₃ and SiO₂ along, while quartz, rock crystal, agate and sand are all SiO₂ and differ in crystal size and impurity, not in substance.",
          },
          tags: [
            { zh: "俗名", en: "Trivial Names" },
            { zh: "速查", en: "Quick Reference" },
            { zh: "基础", en: "Basics" },
          ],
          figure: `<svg viewBox="0 0 360 228" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="14" font-size="11" fill="currentColor">俗名与成分 Common names and real formulas</text>
  <line x1="178" y1="22" x2="178" y2="186" stroke="currentColor" stroke-opacity="0.2"/>
  <g font-size="8.5" fill="currentColor">
    <text x="6" y="36">生石灰 <tspan fill="#d4a017">CaO</tspan></text>
    <text x="6" y="52">熟石灰 <tspan fill="#d4a017">Ca(OH)₂</tspan></text>
    <text x="6" y="68">石灰石 <tspan fill="#d4a017">CaCO₃</tspan></text>
    <text x="6" y="84">纯碱 <tspan fill="#d4a017">Na₂CO₃</tspan></text>
    <text x="6" y="100">小苏打 <tspan fill="#d4a017">NaHCO₃</tspan></text>
    <text x="6" y="116">大苏打 <tspan fill="#d4a017">Na₂S₂O₃</tspan></text>
    <text x="6" y="132">烧碱 <tspan fill="#d4a017">NaOH</tspan></text>
    <text x="6" y="148">碱石灰 <tspan fill="#d4a017">NaOH + CaO</tspan></text>
    <text x="6" y="164">水玻璃 <tspan fill="#d4a017">Na₂SiO₃</tspan></text>
    <text x="6" y="180">王水 <tspan fill="#d4a017">HCl + HNO₃</tspan></text>
    <text x="188" y="36">干冰 <tspan fill="#d4a017">CO₂</tspan></text>
    <text x="188" y="52">水银 <tspan fill="#d4a017">Hg</tspan></text>
    <text x="188" y="68">双氧水 <tspan fill="#d4a017">H₂O₂</tspan></text>
    <text x="188" y="84">福尔马林 <tspan fill="#d4a017">HCHO</tspan></text>
    <text x="188" y="100">沼气 <tspan fill="#d4a017">CH₄</tspan></text>
    <text x="188" y="116">水煤气 <tspan fill="#d4a017">CO + H₂</tspan></text>
    <text x="188" y="132">胆矾 <tspan fill="#d4a017">CuSO₄·5H₂O</tspan></text>
    <text x="188" y="148">绿矾 <tspan fill="#d4a017">FeSO₄·7H₂O</tspan></text>
    <text x="188" y="164">石膏 <tspan fill="#d4a017">CaSO₄·2H₂O</tspan></text>
    <text x="188" y="180">明矾 <tspan fill="#d4a017">KAl(SO₄)₂·12H₂O</tspan></text>
  </g>
  <text x="6" y="198" font-size="8" fill="currentColor" fill-opacity="0.6">Workshop and trade names, matched to what analysis actually finds</text>
  <text x="6" y="212" font-size="9" fill="#e5484d">⚠ 纯碱、小苏打、胆矾都是盐；水玻璃是溶液不是玻璃</text>
  <text x="6" y="222" font-size="7.5" fill="#e5484d" fill-opacity="0.85">Soda ash, bicarbonate and blue vitriol are salts; water glass is a solution</text>
</svg>`,
        },
        {
          id: "qr-colors",
          icon: "🎨",
          term: { zh: "常见物质与溶液的颜色", en: "Colours of Common Substances and Solutions" },
          level: 1,
          oneLiner: {
            zh: "固体看亚铁红褐、铜蓝，溶液看铜蓝铁黄、高锰酸紫红：颜色是最快的判断线索。",
            en: "Solids: rust-brown iron(III), blue copper; solutions: blue Cu²⁺, yellow Fe³⁺, purple permanganate — colour is the fastest clue.",
          },
          detail: {
            zh: "颜色只能当线索不能当结论。同一物质颗粒大小不同颜色就变：块状金是黄色但金粉是黑色，AgCl 白色沉淀见光逐渐转灰紫。溶液的颜色来自水合离子，浓度很浅时几乎看不出，所以「无色的 FeCl₃ 溶液」可能只是太稀。三价铁的水合离子属黄到棕黄，二价铁浅绿，高锰酸根紫红，这三样在实验报告里最容易互认错。气体的两条：Cl₂ 黄绿色、NO₂ 红棕色，其余常见气体无色。沉淀的记忆口诀：白色 CaCO₃、BaSO₄、AgCl、Mg(OH)₂；蓝色 Cu(OH)₂；红褐色 Fe(OH)₃；黄色 AgI、Ag₃PO₄。",
            en: "Colour is a clue, never a verdict. The same substance changes hue with particle size: gold is yellow in lump and black as powder, and white AgCl drifts to grey-violet in light. Solution colour comes from hydrated ions and simply vanishes when dilute, so a 'colourless FeCl₃' may only be a weak one. The three most confused in lab reports are the yellow-brown of iron(III), the pale green of iron(II) and the purple-red of permanganate. Two gases carry colour — chlorine's yellow-green and nitrogen dioxide's red-brown — and the rest are clear. For precipitates: white CaCO₃, BaSO₄, AgCl, Mg(OH)₂; blue Cu(OH)₂; rust-brown Fe(OH)₃; yellow AgI and Ag₃PO₄.",
          },
          tags: [
            { zh: "颜色", en: "Colour" },
            { zh: "速查", en: "Quick Reference" },
            { zh: "实验", en: "Lab" },
          ],
          figure: `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="12" font-size="11" fill="currentColor">颜色速查 Colour cues</text>
  <text x="6" y="28" font-size="8" fill="currentColor" fill-opacity="0.7">固体与沉淀 Solids and precipitates</text>
  <g stroke="currentColor" stroke-opacity="0.35">
    <rect x="6" y="33" width="12" height="12" fill="#b87333"/><rect x="96" y="33" width="12" height="12" fill="#262626"/><rect x="186" y="33" width="12" height="12" fill="#9b4a20"/><rect x="276" y="33" width="12" height="12" fill="#1a1a1a"/>
    <rect x="6" y="49" width="12" height="12" fill="#333333"/><rect x="96" y="49" width="12" height="12" fill="#e6d64a"/><rect x="186" y="49" width="12" height="12" fill="#f2e9a0"/><rect x="276" y="49" width="12" height="12" fill="#3b1f45"/>
    <rect x="6" y="65" width="12" height="12" fill="#2a6fdb"/><rect x="96" y="65" width="12" height="12" fill="#a2452a"/><rect x="186" y="65" width="12" height="12" fill="#4fa3dd"/><rect x="276" y="65" width="12" height="12" fill="#f4f4f4"/>
  </g>
  <g font-size="8" fill="currentColor">
    <text x="22" y="42">Cu 紫红</text><text x="112" y="42">CuO 黑</text><text x="202" y="42">Fe₂O₃ 红棕</text><text x="292" y="42">Fe₃O₄ 黑</text>
    <text x="22" y="58">MnO₂ 黑</text><text x="112" y="58">S 淡黄</text><text x="202" y="58">Na₂O₂ 淡黄</text><text x="292" y="58">KMnO₄ 紫黑</text>
    <text x="22" y="74">胆矾 蓝</text><text x="112" y="74">Fe(OH)₃ 红褐</text><text x="202" y="74">Cu(OH)₂ 蓝</text><text x="292" y="74">AgCl 白</text>
  </g>
  <text x="6" y="91" font-size="8" fill="currentColor" fill-opacity="0.7">溶液（水合离子） Solutions, hydrated ions</text>
  <g stroke="currentColor" stroke-opacity="0.35">
    <rect x="6" y="96" width="12" height="12" fill="#2f7fe0"/><rect x="96" y="96" width="12" height="12" fill="#c08a2e"/><rect x="186" y="96" width="12" height="12" fill="#9fd0ae"/><rect x="276" y="96" width="12" height="12" fill="#8b2f8f"/>
    <rect x="6" y="112" width="12" height="12" fill="#d9762a"/><rect x="96" y="112" width="12" height="12" fill="#e8c33a"/><rect x="186" y="112" width="12" height="12" fill="#7a5a3c"/><rect x="276" y="112" width="12" height="12" fill="#cf9a4f"/>
  </g>
  <g font-size="8" fill="currentColor">
    <text x="22" y="105">Cu²⁺ 蓝</text><text x="112" y="105">Fe³⁺ 黄棕</text><text x="202" y="105">Fe²⁺ 浅绿</text><text x="292" y="105">MnO₄⁻ 紫红</text>
    <text x="22" y="121">Cr₂O₇²⁻ 橙</text><text x="112" y="121">CrO₄²⁻ 黄</text><text x="202" y="121">碘水 棕</text><text x="292" y="121">溴水 橙黄</text>
  </g>
  <text x="6" y="137" font-size="8" fill="currentColor" fill-opacity="0.7">气体 Gases</text>
  <g stroke="currentColor" stroke-opacity="0.35">
    <rect x="6" y="142" width="12" height="12" fill="#b3c95b"/><rect x="96" y="142" width="12" height="12" fill="#b04f26"/>
  </g>
  <g font-size="8" fill="currentColor">
    <text x="22" y="151">Cl₂ 黄绿</text><text x="112" y="151">NO₂ 红棕</text><text x="186" y="151" fill-opacity="0.6">其余常见气体无色</text>
  </g>
  <text x="6" y="168" font-size="7.5" fill="currentColor" fill-opacity="0.6">Particle size and dilution move colour as much as identity does</text>
  <text x="6" y="181" font-size="9" fill="#e5484d">⚠ AgCl 白色见光转灰紫；很稀的 Fe³⁺ 几乎看不出颜色</text>
  <text x="6" y="194" font-size="7.5" fill="#e5484d" fill-opacity="0.85">White AgCl greys in light; a dilute iron(III) looks clear</text>
</svg>`,
        },
        {
          id: "qr-solubility",
          icon: "🧂",
          term: { zh: "酸碱盐的溶解性规律", en: "Solubility Rules for Acids, Bases and Salts" },
          level: 2,
          oneLiner: {
            zh: "钾钠铵硝皆可溶，盐酸盐不溶银，硫酸盐不溶钡，碳酸盐只溶钾钠铵。",
            en: "All potassium, sodium, ammonium and nitrate salts dissolve; silver chloride does not; barium sulfate does not; carbonates answer only to K, Na and NH₄.",
          },
          detail: {
            zh: "口诀只是地图，分界数字才有用：习惯上以 20 ℃ 时在 100 g 水里溶解的质量分级——大于 10 g 易溶，1 到 10 g 可溶，0.01 到 1 g 微溶，小于 0.01 g 难溶。所以上面的「不溶」从来不是真正不溶：BaSO₄ 在 20 ℃ 仍有约每升两毫克的溶解量，刚好落入难溶区。三个常见陷阱：微溶物 Ca(OH)₂ 做澄清石灰水时是溶的、写石灰乳时是悬浊；Ag₂SO₄、CaSO₄ 属微溶，浓度大时一样会浑；MgCO₃ 微溶、Mg(OH)₂ 难溶，所以软化硬水时镁必须先转成氢氧化物才能除净。口诀之外还得记特例：盐酸盐里 Hg₂Cl₂ 也不溶；Fe³⁺、Al³⁺ 根本没有正经的碳酸盐，一遇水就双水解。",
            en: "The rhyme is a map; the numbers are the territory. Custom grades solubility at 20 °C in 100 g of water: over 10 g very soluble, 1 to 10 g soluble, 0.01 to 1 g slight, below 0.01 g poor. So 'insoluble' is never truly so — BaSO₄ still dissolves about two milligrams per litre at 20 °C and just lands in the poor class. Three traps: Ca(OH)₂ is dissolved in clear limewater but a suspension as milk of lime, and which one you mean changes the answer; Ag₂SO₄ and CaSO₄ are merely slight yet turn a flask cloudy when concentrated; MgCO₃ is slight while Mg(OH)₂ is poor, so water softening must convert magnesium to the hydroxide before it is genuinely gone. Past the rhyme, remember the exceptions: Hg₂Cl₂ is also insoluble among chlorides, and iron(III) and aluminium have no real carbonate at all — in water they hydrolyse instead.",
          },
          tags: [
            { zh: "溶解性", en: "Solubility" },
            { zh: "速查", en: "Quick Reference" },
            { zh: "离子反应", en: "Ionic Reactions" },
          ],
          figure: `<svg viewBox="0 0 360 208" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="14" font-size="11" fill="currentColor">溶解性口诀与分界 Solubility rhyme and its cut-offs (20 °C)</text>
  <g font-size="8.5" fill="currentColor">
    <text x="6" y="36">钾、钠、铵、硝酸盐</text><text x="150" y="36" fill="#d4a017">全部可溶</text>
    <text x="6" y="45" font-size="6.5" fill-opacity="0.6">K, Na, ammonium and all nitrates: no exception</text>
    <text x="6" y="58">盐酸盐（氯化物）</text><text x="150" y="58" fill="#d4a017">AgCl 不溶，Hg₂Cl₂ 也不溶</text>
    <text x="6" y="67" font-size="6.5" fill-opacity="0.6">chlorides: AgCl down, and Hg₂Cl₂ too</text>
    <text x="6" y="80">硫酸盐</text><text x="150" y="80" fill="#d4a017">BaSO₄ 不溶；Ca、Sr、Ag 微溶</text>
    <text x="6" y="89" font-size="6.5" fill-opacity="0.6">sulfates: BaSO₄ down; Ca, Sr, Ag slight</text>
    <text x="6" y="102">碳酸盐</text><text x="150" y="102" fill="#d4a017">只溶钾、钠、铵；MgCO₃ 微溶</text>
    <text x="6" y="111" font-size="6.5" fill-opacity="0.6">carbonates: only K, Na, NH₄; MgCO₃ slight</text>
    <text x="6" y="124">碱（氢氧化物）</text><text x="150" y="124" fill="#d4a017">溶 K、Na、Ba；Ca(OH)₂ 微溶</text>
    <text x="6" y="133" font-size="6.5" fill-opacity="0.6">bases: K, Na, Ba soluble; Ca(OH)₂ slight</text>
    <text x="6" y="146">磷酸盐、硅酸盐</text><text x="150" y="146" fill="#d4a017">除钾钠铵外多不溶</text>
    <text x="6" y="155" font-size="6.5" fill-opacity="0.6">phosphates and silicates: down but for K, Na, NH₄</text>
  </g>
  <line x1="6" y1="162" x2="354" y2="162" stroke="currentColor" stroke-opacity="0.2"/>
  <text x="6" y="175" font-size="8" fill="currentColor">分级：大于 10 g 易溶，1~10 g 可溶，0.01~1 g 微溶，小于 0.01 g 难溶</text>
  <text x="6" y="184" font-size="6.5" fill="currentColor" fill-opacity="0.6">Graded by grams per 100 g water: very soluble, soluble, slight, poor</text>
  <text x="6" y="197" font-size="8.5" fill="#e5484d">⚠ 没有绝对不溶：BaSO₄ 仍溶约 2 mg/L，“不溶”只意味着写↓</text>
  <text x="6" y="206" font-size="6.5" fill="#e5484d" fill-opacity="0.85">Nothing is truly insoluble; the arrow only marks a precipitate</text>
</svg>`,
        },
        {
          id: "qr-flame",
          icon: "🔥",
          term: { zh: "焰色反应与元素鉴定", en: "Flame Colours as an Element Test" },
          level: 2,
          oneLiner: {
            zh: "钠黄、钾紫、铜绿、钡黄绿：金属离子把火焰染成自己的颜色，烟花也是同一回事。",
            en: "Sodium yellow, potassium violet, copper green, barium yellow-green: ions tint the flame, and fireworks use the same trick.",
          },
          detail: {
            zh: "焰色反应发光来自电子受热跃迁后回落时放出的光，不生成新物质，中学把它归作物理变化；它检验的是元素本身，所以 NaCl、Na₂SO₄、NaOH 焰色一样黄。操作叫「烧—蘸—烧」：先蘸稀盐酸在氧化焰上烧到火焰无色，再蘸样品灼烧，每换一个样重新处理一次；没有铂丝时用无锈铁丝代替。两个易错点：观察钾的焰色必须透过蓝色钴玻璃，因为那怕微量钠的黄光会把钾的紫色完全盖住；洗铂丝用盐酸而不用硫酸，因为硫酸盐难挥发。钠的黄光灵敏度极高，汗渍、自来水、玻璃里都有，所以上手前先把丝烧干净，否则看到的全是黄。烟花的五种颜色就是五种金属盐：锶盐红、钡盐黄绿、钠盐黄、铜盐蓝绿、镁铝粉白亮。",
            en: "The light comes from electrons raised by the heat and falling back, dropping photons on the way down; no new substance forms, which is why schools file it as a physical change. What is tested is the element itself, so NaCl, Na₂SO₄ and NaOH all burn the same yellow. The drill is 'burn, dip, burn': wet the wire with dilute hydrochloric acid, hold it in the oxidising flame until nothing shows, dip it into the sample, and repeat the whole clean between samples, substituting a rust-free iron wire if platinum is out of reach. Two classic slips: potassium's violet must be viewed through blue cobalt glass, because trace sodium yellow drowns it completely, and the wire is cleaned in hydrochloric not sulfuric acid since sulfate salts refuse to volatilise. Sodium yellow is sensitive to a fault — sweat, tap water and glass all carry it — so burn the wire clean first or every sample will look yellow. Fireworks are just five salts: strontium red, barium yellow-green, sodium yellow, copper blue-green, and magnesium or aluminium powder for white.",
          },
          tags: [
            { zh: "焰色", en: "Flame Test" },
            { zh: "鉴定", en: "Identification" },
            { zh: "元素", en: "Elements" },
          ],
          figure: `<svg viewBox="0 0 360 154" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="14" font-size="11" fill="currentColor">焰色反应 Flame colours by element</text>
  <g stroke="currentColor" stroke-opacity="0.3">
    <rect x="6" y="24" width="44" height="18" fill="#ffd400"/><rect x="56" y="24" width="44" height="18" fill="#a855f7"/><rect x="106" y="24" width="44" height="18" fill="#e0447a"/><rect x="156" y="24" width="44" height="18" fill="#d1502c"/><rect x="206" y="24" width="44" height="18" fill="#ef2d56"/><rect x="256" y="24" width="44" height="18" fill="#b7d44a"/><rect x="306" y="24" width="44" height="18" fill="#2fa14a"/>
  </g>
  <g font-size="8" fill="currentColor" text-anchor="middle">
    <text x="28" y="52">钠 Na 黄</text><text x="78" y="52">钾 K 紫</text><text x="128" y="52">锂 Li 紫红</text><text x="178" y="52">钙 Ca 砖红</text><text x="228" y="52">锶 Sr 洋红</text><text x="278" y="52">钡 Ba 黄绿</text><text x="328" y="52">铜 Cu 绿</text>
  </g>
  <text x="6" y="68" font-size="6.5" fill="currentColor" fill-opacity="0.6">Yellow, violet, crimson, brick, scarlet, yellow-green, green — the order above, left to right</text>
  <text x="6" y="86" font-size="8.5" fill="currentColor">步骤「烧—蘸—烧」：铂丝蘸稀盐酸灼烧至无色，再蘸样灼烧</text>
  <text x="6" y="96" font-size="6.5" fill="currentColor" fill-opacity="0.6">Dip in dilute HCl, burn clean, dip the sample; repeat between samples</text>
  <text x="6" y="116" font-size="8.5" fill="#d4a017">观察钾要透过蓝色钴玻璃，滤掉微量钠的黄光</text>
  <text x="6" y="126" font-size="6.5" fill="#d4a017" fill-opacity="0.85">Read potassium through blue cobalt glass; sodium yellow would swallow it</text>
  <text x="6" y="142" font-size="8.5" fill="#e5484d">⚠ 焰色是元素的性质，不是某一种化合物的性质</text>
  <text x="6" y="149" font-size="6.5" fill="#e5484d" fill-opacity="0.85">It identifies the element, not one particular compound of it</text>
</svg>`,
        },
        {
          id: "qr-ion-tests",
          subs: [
            {
              f: "Ag⁺",
              name: { zh: "银离子（来自 AgNO₃ 溶液）", en: "Silver ion (from silver nitrate)" },
              note: { zh: "一碰上 Cl⁻ 就沉淀，但要先酸化，不让 CO₃²⁻ 假阳性。", en: "Drops at once with chloride, but acidify first so carbonate cannot fake the result." },
              role: "l",
            },
            {
              f: "Cl⁻",
              name: { zh: "氯离子", en: "Chloride ion" },
              note: { zh: "盐酸与氯化物里都有；氯水氧化亚铁之后留下的也是它。", en: "In hydrochloric acid and the chlorides; also what chlorine water leaves after oxidising iron(II)." },
              role: "l",
            },
            {
              f: "Ba²⁺",
              name: { zh: "钡离子（来自 BaCl₂ 溶液）", en: "Barium ion (from barium chloride)" },
              note: { zh: "检验 SO₄²⁻ 用它，酸先下是为了不让碳酸根、亚硫酸根一起浑浊。", en: "The reagent for sulfate; the acid goes in first so carbonate and sulfite cannot cloud it too." },
              role: "l",
            },
            {
              f: "SO₄²⁻",
              name: { zh: "硫酸根离子", en: "Sulfate ion" },
              note: { zh: "BaSO₄ 不溶于水也不溶于酸，这是它与 CaCO₃ 的分界。", en: "BaSO₄ is insoluble in water and in acid, which is where it parts company with CaCO₃." },
              role: "l",
            },
            {
              f: "CO₃²⁻",
              name: { zh: "碳酸根离子", en: "Carbonate ion" },
              note: { zh: "遇酸即放 CO₂，但只能说明「碳酸根或碳酸氢根」，两者还要分开。", en: "Acid drives off CO₂, but that only says carbonate or hydrogen carbonate; separating them needs another step." },
              role: "l",
            },
            {
              f: "H⁺",
              name: { zh: "氢离子（稀盐酸提供）", en: "Hydrogen ion (from dilute hydrochloric acid)" },
              note: { zh: "写离子方程式时 HCl 拆成 H⁺ 与 Cl⁻，水与沉淀不拆。", en: "In ionic equations HCl is written apart as H⁺ and Cl⁻; water and precipitates stay whole." },
              role: "l",
            },
            {
              f: "NH₄⁺",
              name: { zh: "铵根离子", en: "Ammonium ion" },
              note: { zh: "常见阳离子里唯一含氮的，遇碱放氨，氮肥与铵盐都靠它鉴定。", en: "The one nitrogen-bearing common cation: base frees its ammonia, which is how ammonium salts are recognised." },
              role: "l",
            },
            {
              f: "OH⁻",
              name: { zh: "氢氧根（浓 NaOH）", en: "Hydroxide (concentrated sodium hydroxide)" },
              note: { zh: "要浓、要热，氨才能大量逸出；稀冷时几乎闻不到。", en: "Strong and hot, or the ammonia stays in solution and nothing shows." },
              role: "l",
            },
            {
              f: "Fe³⁺",
              name: { zh: "铁离子（三价）", en: "Iron(III)" },
              note: { zh: "与 SCN⁻ 生成血红色配合物；也是亚铁被氯水氧化后的产物。", en: "Blood-red with thiocyanate, and what chlorine water turns iron(II) into." },
              role: "l",
            },
            {
              f: "SCN⁻",
              name: { zh: "硫氰酸根（KSCN 溶液）", en: "Thiocyanate (KSCN solution)" },
              note: { zh: "极灵敏，痕量 Fe³⁺ 也显色；先不显色本身就能说明没有三价铁。", en: "Sensitive to traces; a failure to colour is itself evidence that no iron(III) is there." },
              role: "l",
            },
            {
              f: "Fe²⁺",
              name: { zh: "亚铁离子（二价）", en: "Iron(II)" },
              note: { zh: "浅绿，加 KSCN 不变红；被氯水或双氧水氧化后才红，两步连着做才能证明原液含亚铁。", en: "Pale green and silent with thiocyanate; it reddens only after chlorine or peroxide has oxidised it, and only the pair of steps proves iron(II)." },
              role: "l",
            },
            {
              f: "Cl₂",
              name: { zh: "氯气（氯水）", en: "Chlorine (chlorine water)" },
              note: { zh: "充当氧化剂，把 Fe²⁺ 拉到 Fe³⁺，自身还原成 Cl⁻。", en: "The oxidant: lifts iron(II) up to iron(III) and comes down to chloride." },
              role: "l",
            },
            {
              f: "AgCl",
              name: { zh: "氯化银（白色凝乳状沉淀）", en: "Silver chloride (white curdy precipitate)" },
              note: { zh: "不溶于稀硝酸，见光逐渐变灰紫。", en: "Undissolved by dilute nitric acid; drifts grey-violet in light as it decomposes." },
              role: "r",
            },
            {
              f: "BaSO₄",
              name: { zh: "硫酸钡（白色沉淀）", en: "Barium sulfate (white precipitate)" },
              note: { zh: "不溶于酸；医疗上服下的「钡餐」用的就是它。", en: "Inert to acid; the same compound is swallowed as a barium meal." },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "在离子方程式里写成分子，不拆。", en: "Written as a molecule in ionic equations, never split." },
              role: "r",
            },
            {
              f: "CO₂",
              name: { zh: "二氧化碳（气体）", en: "Carbon dioxide (gas)" },
              note: { zh: "接着通入澄清石灰水让它变浑，才算把碳酸根坐实。", en: "Passed on into limewater to cloud it, which is what closes the carbonate case." },
              role: "r",
            },
            {
              f: "NH₃",
              name: { zh: "氨气", en: "Ammonia" },
              note: { zh: "中学里常见的碱性气体，使湿润的红色石蕊试纸变蓝。", en: "The alkaline gas of the school lab: it blues moist red litmus." },
              role: "r",
            },
            {
              f: "Fe(SCN)₃",
              name: { zh: "硫氰化铁（血红色）", en: "Iron(III) thiocyanate (blood red)" },
              note: { zh: "可逆反应的产物，加 NaOH 或铁粉都能把红色弄回去。", en: "Product of an equilibrium; either hydroxide or iron filings can pull the red back out." },
              role: "r",
            },
            {
              f: "HNO₃",
              name: { zh: "稀硝酸（酸化用）", en: "Dilute nitric acid (for acidifying)" },
              note: { zh: "排除 CO₃²⁻、PO₄³⁻ 干扰：它们的银盐溶于酸，AgCl 不溶。", en: "Clears carbonate and phosphate interference: their silver salts dissolve in acid, AgCl does not." },
              role: "c",
            },
            {
              f: "BaCl₂",
              name: { zh: "氯化钡溶液", en: "Barium chloride solution" },
              note: { zh: "提供 Ba²⁺；带进来的 Cl⁻ 不参与反应。", en: "Supplies the barium; the chloride riding along is a spectator." },
              role: "c",
            },
          ],
          icon: "🔍",
          term: { zh: "常见离子的检验", en: "Testing for the Common Ions" },
          level: 3,
          oneLiner: {
            zh: "Cl⁻ 看银、SO₄²⁻ 看钡、CO₃²⁻ 放气、NH₄⁺ 变氨、Fe³⁺ 遇 SCN⁻ 血红。",
            en: "Chloride meets silver, sulfate meets barium, carbonate gives off gas, ammonium gives off ammonia, iron(III) turns blood-red with thiocyanate.",
          },
          eq: [
            {
              lhs: "Ag⁺ + Cl⁻",
              cond: { zh: "滴加 AgNO₃ 与稀硝酸", en: "silver nitrate plus dilute nitric" },
              rhs: "AgCl↓",
            },
            {
              lhs: "Ba²⁺ + SO₄²⁻",
              cond: { zh: "先稀盐酸酸化，再加 BaCl₂", en: "acidify with HCl, then barium chloride" },
              rhs: "BaSO₄↓",
            },
            {
              lhs: "CO₃²⁻ + 2H⁺",
              cond: { zh: "稀盐酸，气体通入石灰水", en: "dilute HCl; gas through limewater" },
              rhs: "H₂O + CO₂↑",
            },
            {
              lhs: "NH₄⁺ + OH⁻",
              cond: { zh: "浓 NaOH，加热 △", en: "concentrated NaOH, heat Δ" },
              rhs: "NH₃↑ + H₂O",
            },
            {
              lhs: "Fe³⁺ + 3SCN⁻",
              cond: { zh: "KSCN 溶液，血红色", en: "KSCN solution, blood red" },
              rhs: "Fe(SCN)₃",
              rel: "equilibrium",
            },
            {
              lhs: "2Fe²⁺ + Cl₂",
              cond: { zh: "先加 KSCN 不显色，再加氯水", en: "no colour with KSCN, then chlorine water" },
              rhs: "2Fe³⁺ + 2Cl⁻",
            },
          ],
          detail: {
            zh: "检验的三条规矩。第一，取样分装，绝不往原试剂瓶里直接倒试剂，免得整瓶药品被污染。第二，先酸化再加沉淀剂，而且酸化用的酸要选对：检 SO₄²⁻ 用盐酸而不是硝酸，因为硝酸会把 SO₃²⁻ 氧化成 SO₄²⁻，凭空造出一堆白色沉淀；检 Cl⁻ 却必须用硝酸，因为碳酸银、磷酸银都溶于酸而 AgCl 不溶。第三，现象与结论分开写：“产生不溶于稀硝酸的白色沉淀”是现象，“溶液里有 SO₄²⁻”才是结论。还要记住顺序：证明 Fe²⁺ 必须先加 KSCN 不显色、再加氯水才变红，一上来就加氯水就分不清原液里到底是二价还是三价；NH₄⁺ 只有浓碱并加热才逸得出氨，常温稀碱几乎闻不到味道。",
            en: "Three rules of the test. First, take a sample: never pour reagent into the stock bottle, or the whole supply is spoiled. Second, acidify before precipitating, and pick the right acid — hydrochloric for sulfate, never nitric, because nitric oxidises sulfite to sulfate and manufactures a white precipitate out of nothing; but nitric for chloride, since carbonate and phosphate of silver dissolve in acid while AgCl does not. Third, keep observation and conclusion apart: 'a white precipitate insoluble in dilute nitric acid' is what you saw, 'sulfate is present' is what you claim. Order matters too: proving iron(II) means thiocyanate first with no colour, then chlorine water and the red; pour in the chlorine first and you can no longer tell which iron was in the tube. And ammonium only speaks with strong, hot alkali — cold dilute base gives off nothing worth smelling.",
          },
          tags: [
            { zh: "离子检验", en: "Ion Tests" },
            { zh: "实验", en: "Lab" },
            { zh: "速查", en: "Quick Reference" },
          ],
        },
        {
          id: "qr-gas-tests",
          subs: [
            {
              f: "Ca(OH)₂",
              name: { zh: "氢氧化钙（澄清石灰水）", en: "Calcium hydroxide (clear limewater)" },
              note: { zh: "检验 CO₂ 的指定试剂，变浑就算中。", en: "The designated reagent for CO₂; cloudiness settles the case." },
              role: "l",
            },
            {
              f: "CO₂",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: { zh: "它是碳酸盐遇酸放出的气体，也是让石灰水变浑的那一种。", en: "The gas acids drive off carbonates, and the one that clouds limewater." },
              role: "l",
            },
            {
              f: "NH₃",
              name: { zh: "氨气", en: "Ammonia" },
              note: { zh: "常见的碱性气体，使湿润红色石蕊试纸变蓝。", en: "The usual alkaline gas: it blues moist red litmus." },
              role: "l",
            },
            {
              f: "HCl",
              name: { zh: "氯化氢（浓盐酸发白雾）", en: "Hydrogen chloride (the fume off concentrated hydrochloric acid)" },
              note: { zh: "与 NH₃ 相遇立刻生成固体小颗粒，看起来就是白烟。", en: "Meets ammonia and makes solid particles at once — what the eye reads as white smoke." },
              role: "l",
            },
            {
              f: "Cl₂",
              name: { zh: "氯气（黄绿色）", en: "Chlorine (yellow-green)" },
              note: { zh: "氧化剂，能把 I⁻ 从 KI 里拉出来；尾气要用 NaOH 吸收。", en: "An oxidant that pulls iodide out of KI; the off-gas must be taken up by soda lye." },
              role: "l",
            },
            {
              f: "KI",
              name: { zh: "碘化钾（淀粉-KI 试纸上）", en: "Potassium iodide (on the starch paper)" },
              note: { zh: "被氧化出的 I₂ 与淀粉一起变蓝，试纸才需要湿润。", en: "The iodine it releases turns starch blue — which is why the paper must be damp." },
              role: "l",
            },
            {
              f: "CuSO₄",
              name: { zh: "无水硫酸铜（白色粉末）", en: "Anhydrous copper sulfate (white powder)" },
              note: { zh: "专用于验水：一见水就变蓝，但不能用来干燥气体。", en: "The water detector: blue at first sight of it, though not fit for drying gases." },
              role: "l",
            },
            {
              f: "H₂",
              name: { zh: "氢气", en: "Hydrogen" },
              note: { zh: "点燃前必须验纯，混有空气时会爆鸣甚至炸裂容器。", en: "Must be proved pure before lighting; mixed with air it pops and can burst the vessel." },
              role: "l",
            },
            {
              f: "O₂",
              name: { zh: "氧气", en: "Oxygen" },
              note: { zh: "本身不燃，但能让带火星的木条重新烧起来。", en: "It does not burn; it relights a glowing splint instead." },
              role: "l",
            },
            {
              f: "CaCO₃",
              name: { zh: "碳酸钙（白色沉淀）", en: "Calcium carbonate (white precipitate)" },
              note: { zh: "石灰水变浑的正是它；再通过量 CO₂ 会转成可溶的碳酸氢钙重新变清。", en: "What clouds the limewater; pass more CO₂ and it converts to soluble calcium hydrogen carbonate, clearing again." },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "既是石灰水反应的产物，也是氢气燃烧的产物。", en: "Product of both the limewater reaction and of burning hydrogen." },
              role: "r",
            },
            {
              f: "NH₄Cl",
              name: { zh: "氯化铵（白烟）", en: "Ammonium chloride (the white smoke)" },
              note: { zh: "固体小颗粒悬浮就是烟，不是雾；雾是液滴。", en: "Suspended solid is smoke; suspended droplets are fog — the two are not the same word." },
              role: "r",
            },
            {
              f: "KCl",
              name: { zh: "氯化钾", en: "Potassium chloride" },
              note: { zh: "留在试纸上的可溶盐，看不出也不算现象。", en: "A soluble salt left in the paper, seen and counted as nothing." },
              role: "r",
            },
            {
              f: "I₂",
              name: { zh: "碘（单质）", en: "Iodine" },
              note: { zh: "与淀粉包合物显蓝色，这就是湿润淀粉-KI 试纸的原理。", en: "Blue with the starch inclusion — the whole working of the moist starch-iodide paper." },
              role: "r",
            },
            {
              f: "CuSO₄·5H₂O",
              name: { zh: "五水硫酸铜（蓝色晶体）", en: "Copper sulfate pentahydrate (blue crystals)" },
              note: { zh: "胆矾；反过来加热到 200 ℃ 上下又变回白色。", en: "Blue vitriol; heat it near 200 °C and it goes white again." },
              role: "r",
            },
          ],
          icon: "🫙",
          term: { zh: "常见气体的检验与验满", en: "Testing Gases and Proving a Jar Is Full" },
          level: 2,
          oneLiner: {
            zh: "检验伸进瓶里，验满只在瓶口：氧复燃、CO₂ 浑石灰水、氨使石蕊变蓝。",
            en: "The test goes into the jar, the fullness check stays at the mouth: oxygen relights, CO₂ clouds limewater, ammonia blues litmus.",
          },
          eq: [
            {
              lhs: "Ca(OH)₂ + CO₂",
              cond: { zh: "通入澄清石灰水", en: "bubbled through limewater" },
              rhs: "CaCO₃↓ + H₂O",
            },
            {
              lhs: "NH₃ + HCl",
              cond: { zh: "两瓶口相对，白烟", en: "jars mouth to mouth, white fume" },
              rhs: "NH₄Cl",
            },
            {
              lhs: "Cl₂ + 2KI",
              cond: { zh: "湿润淀粉-KI 试纸", en: "moist starch-iodide paper" },
              rhs: "2KCl + I₂",
            },
            {
              lhs: "CuSO₄ + 5H₂O",
              cond: { zh: "白色粉末变蓝", en: "white powder turns blue" },
              rhs: "CuSO₄·5H₂O",
            },
            {
              lhs: "2H₂ + O₂",
              cond: { zh: "点燃，淡蓝色火焰", en: "ignited, pale blue flame" },
              rhs: "2H₂O",
            },
          ],
          detail: {
            zh: "先把两个说法分开：检验是认气体本身，试剂要伸入瓶中；验满是证它已经集满，试纸或木条只能放在瓶口，伸进去就不算验满。逐条口径：O₂ 用带火星的木条伸入，复燃即为氧气，验满时在瓶口放一燃着木条、烧得更旺即满；CO₂ 通入澄清石灰水变浑，验满用燃着木条在瓶口火焰熄灭——但能使火焰熄灭的气体不止 CO₂，所以熄灭只说明它不支持燃烧，不能当作鉴定。NH₃ 是常见的碱性气体，使湿润的红色石蕊试纸变蓝；验满把蘸过浓盐酸的玻璃棒靠近瓶口，冒白烟即满。Cl₂ 使湿润的淀粉-KI 试纸变蓝并有刺激性，必须在通风橱里做、尾气通入 NaOH 溶液。SO₂ 使品红溶液浅色、加热后颜色又回来，这正是它与 CO₂ 的分界：CO₂ 不能让品红褪色。H₂ 点燃前必须验纯：用拇指堵住集满气体的试管口，移近火焰松开，听到尖锐爆鸣说明还混有空气，直到只留一声沉闷的“噗”才算净。",
            en: "Separate the two ideas first: identification asks what gas is there and dips the reagent inside the jar; proving the jar full only touches the mouth, and anything thrust in no longer proves fullness. Oxygen relights a glowing splint inside, and a burning splint held at the mouth burns brighter once the jar is full. Carbon dioxide clouds limewater, and a flame dies at the mouth when the jar is filled — but plenty of gases kill a flame, so going out only says 'does not support burning', never 'is CO₂'. Ammonia is the common alkaline gas and blues moist red litmus; a glass rod wetted with concentrated hydrochloric acid near the mouth shows white fume when the jar is full. Chlorine blues moist starch-iodide paper and stings, so it is worked in a fume hood with the off-gas led into soda lye. Sulfur dioxide fades fuchsin and the colour returns on warming, which is exactly where it parts from carbon dioxide — CO₂ cannot bleach fuchsin at all. Hydrogen must be proved pure before lighting: thumb over the mouth of a filled tube, bring it to the flame and release — a sharp bark means air is still mixed in, and only a soft 'puff' means it is clean.",
          },
          tags: [
            { zh: "气体检验", en: "Gas Tests" },
            { zh: "实验", en: "Lab" },
            { zh: "速查", en: "Quick Reference" },
          ],
        },
        {
          id: "qr-lab-safety",
          subs: [
            {
              f: "Hg",
              name: { zh: "汞（水银）", en: "Mercury" },
              note: { zh: "常温下唯一的液态金属，洒落后滚成小珠、难收集，蒸气有毒。", en: "The only liquid metal at room temperature: it rolls into beads hard to gather, and its vapour is toxic." },
              role: "l",
            },
            {
              f: "S",
              name: { zh: "硫粉", en: "Sulfur powder" },
              note: { zh: "常温下就能与汞缓慢结合，把易挥发的汞固定下来。", en: "Combines with mercury slowly at room temperature, pinning down what would otherwise evaporate." },
              role: "l",
            },
            {
              f: "HgS",
              name: { zh: "硫化汞（固体）", en: "Mercury(II) sulfide (solid)" },
              note: { zh: "不再挥发，可以安全扫起、密闭上交；天然矿物即辰砂。", en: "No longer volatile, so it can be swept up, sealed and handed in; the natural mineral is cinnabar." },
              role: "r",
            },
          ],
          icon: "🧯",
          term: { zh: "实验基本操作与事故处理", en: "Bench Technique and First Moves After an Accident" },
          level: 1,
          oneLiner: {
            zh: "酸入水、管不对人、pH 试纸不预先润湿；水银洒了不是用扫把，而是撒硫粉。",
            en: "Acid into water, tube mouth away from people, no wetting pH paper first; spilled mercury gets sulfur dust, not a broom.",
          },
          eq: [
            {
              lhs: "Hg + S",
              cond: { zh: "洒落的汞，撒硫粉盖住", en: "spilled mercury, dusted with sulfur" },
              rhs: "HgS",
            },
          ],
          detail: {
            zh: "取用：固体「一斜二送三直立」，免得药品沾在管口；液体瓶塞倒放、标签向手心、瓶口挨着试管口倒。闻气味时用手轻轻扇动使少量气体飘入鼻孔，绝不能把鼻子凑到瓶口。加热：试管里液体不超过容积的三分之一，管口不对人，先均匀预热再固定；加热固体时管口略向下，免得冷凝水倒流炸裂试管。计量：托盘天平左物右码，腐蚀性药品放在玻璃器皿里称；量筒只读体积，不能加热、不作反应容器、也不在里面溶解东西。分离：过滤记「一贴二低三靠」，蒸发结晶到大量晶体析出就停火、用余热蒸干。稀释：浓硫酸只能沿器壁缓缓注入水里并不断搅拌，反过来会因局部沸腾把酸液溅到身上。试纸：pH 试纸不能预先润湿（润湿等于把待测液稀释），而石蕊试纸、淀粉-KI 试纸必须用蒸馏水润湿。气密性：先把导管口插进水里再用手捂住容器，管口连续冒气泡、松手后水柱回升才算不漏。善后：钠、钾等活泼金属残渣用乙醇慢慢处理，不丢入废液缸；含银、钡、重金属的废液要回收，不随意倒掉。",
            en: "Handling: for solids, tilt, deliver upright, straighten, so nothing sticks at the mouth; for liquids, stopper upside-down on the bench, label to the palm, mouth to mouth. Waft the gas toward your nose with a hand — never put your nose at the bottle. Heating: no more than a third of the tube with liquid, mouth pointed at nobody, warm the whole tube before fixing one spot; when heating a solid the mouth tips slightly down so condensate cannot run back and crack the tube. Weighing: substance left, weights right, corrosives always in glass rather than on the pan; a measuring cylinder reads volume only — it is not heated, not a reaction vessel, not a beaker for dissolving. Separation: filter by 'one paste, two lows, three rests', and stop an evaporation while plenty of crystals still form, letting residual heat dry it. Dilution: concentrated sulfuric acid goes down the wall into water with stirring, never the other way, since the local boil throws acid. Paper: pH paper must stay dry, because wetting it dilutes the sample, while litmus and starch-iodide paper must be wetted first. Leaks: stand the delivery tube in water and warm the flask in your hands — a steady line of bubbles, and water climbing back when you let go, is what tight looks like. Cleanup: sodium and potassium scraps are destroyed with ethanol, never dropped in the waste jar, and silver, barium and heavy-metal wastes are collected rather than poured out.",
          },
          tags: [
            { zh: "基本操作", en: "Technique" },
            { zh: "安全", en: "Safety" },
            { zh: "速查", en: "Quick Reference" },
          ],
          figure: `<svg viewBox="0 0 360 170" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="14" font-size="11" fill="currentColor">意外事故的第一处理 First moves after an accident</text>
  <g font-size="8.5" fill="currentColor">
    <text x="6" y="34">浓酸溅到皮肤：大量水冲洗，再涂 3%~5% NaHCO₃ 溶液</text>
    <text x="6" y="43" font-size="6.5" fill-opacity="0.6">Acid on skin: flood with water, then dilute sodium hydrogen carbonate</text>
    <text x="6" y="56">浓碱溅到皮肤：大量水冲洗，再涂硼酸溶液</text>
    <text x="6" y="65" font-size="6.5" fill-opacity="0.6">Alkali on skin: water first, then boric acid</text>
    <text x="6" y="78">酸或碱溅入眼睛：立即用大量水冲洗，切莫滴酸碱中和，随后就医</text>
    <text x="6" y="87" font-size="6.5" fill-opacity="0.6">In the eye: water only, never a neutralising drop, then a doctor</text>
    <text x="6" y="100">酒精灯倾倒着火：用湿布或沙土盖灭，不要用水浇</text>
    <text x="6" y="109" font-size="6.5" fill-opacity="0.6">Spilled burning alcohol: smother with wet cloth or sand, do not pour water</text>
    <text x="6" y="122">汞洒落：开窗通风，撒硫粉盖住（Hg + S = HgS），收集残珠</text>
    <text x="6" y="131" font-size="6.5" fill-opacity="0.6">Spilled mercury: air the room, dust with sulfur, gather the beads</text>
  </g>
  <text x="6" y="148" font-size="8.5" fill="#e5484d">⚠ 先冲水再报告；伤处不做“酸碱中和”，因为中和本身还放热</text>
  <text x="6" y="158" font-size="6.5" fill="#e5484d" fill-opacity="0.85">Flush first, report after; neutralising on the wound adds its own heat</text>
  <text x="6" y="168" font-size="6.5" fill="currentColor" fill-opacity="0.55">Every line above is a dilution and a removal, not a counter-reaction</text>
</svg>`,
        },
        {
          id: "qr-instruments",
          icon: "⚗️",
          term: { zh: "常用仪器的精度与加热口径", en: "Glassware: Precision and What May Be Heated" },
          level: 1,
          oneLiner: {
            zh: "量筒读到 0.1 mL、滴定管读到 0.01 mL；量器一律不加热、不作反应容器。",
            en: "A cylinder reads to 0.1 mL, a burette to 0.01; measuring glassware is never heated and never a reaction vessel.",
          },
          detail: {
            zh: "认仪器先认三件事：能量到多小、能不能加热、能不能当反应容器。量器类是后两条禁令的共同答案：量筒、容量瓶、酸式与碱式滴定管、漏斗一律不能加热，也不作反应容器、不在里面溶解或稀释——受热会让刻度失准，受热不均还会裂。精度口径要背准：托盘天平读到 0.1 g，量筒读到 0.1 mL（用 10 mL 量筒量 9.5 mL 可以，写 9.50 mL 就不行），滴定管读到 0.01 mL（所以滴定终点记作 22.60 mL 而不是 22.6 mL），容量瓶只有一条标线，只能配它标定的那种体积。读数时视线与凹液面最低处水平：俯视使量筒读数偏大、实际量到的偏少，仰视恰好相反。磨口与塞子也有讲究：碱液会把玻璃里的二氧化硅慢慢变成有黏性的硅酸钠，把磨口塞粘死，所以盛碱液用橡胶塞而不是玻璃塞。温度计的位置随用途改：测液体温度插进液面以下、不碰底也不碰壁，蒸馏时水银球要跟支管口齐平，因为那时要读的是蒸气的温度。pH 试纸不能预先润湿（润湿等于把待测液稀释），石蕊试纸与淀粉-KI 试纸却必须润湿——差别在于前者测浓度、后者测气体能不能与它反应。人教版新教材已把「石棉网」改叫「陶土网」，两者作用一样：让玻璃仪器受热均匀。",
            en: "Every piece of glassware answers three questions: how finely it measures, whether it can be heated, and whether it can serve as a reaction vessel. The measuring class settles the last two together — cylinders, volumetric flasks, burettes and funnels take no heat, host no reaction, and dissolve nothing in place, since warmth moves the very volume their graduations were calibrated for and uneven heating cracks the glass. Know the precisions by heart: a tray balance to 0.1 g, a cylinder to 0.1 mL (a 10 mL cylinder can deliver 9.5 mL but never 9.50), a burette to 0.01 mL (which is why an endpoint is recorded as 22.60 mL, not 22.6), and a volumetric flask carries a single mark for the one volume it was made for. Read at eye level against the bottom of the meniscus: looking down over-reads a cylinder and leaves you short, looking up does the reverse. Ground glass and stoppers follow chemistry too — alkali slowly turns the silica in the joint into sticky sodium silicate, welding stopper to neck, so alkaline solutions get rubber rather than glass. Where the thermometer goes depends on the job: into the liquid but clear of base and wall when you measure the liquid, level with the side arm in distillation, because there you want the vapour's temperature. pH paper must stay dry, since wetting it dilutes the sample, while litmus and starch-iodide paper must be wetted — the first measures a concentration, the second asks whether a gas reacts with it. Newer Chinese textbooks say clay-centred wire gauze where older ones said asbestos; the purpose, even heating, is unchanged.",
          },
          tags: [
            { zh: "仪器", en: "Glassware" },
            { zh: "精度", en: "Precision" },
            { zh: "速查", en: "Quick Reference" },
          ],
          figure: `<svg viewBox="0 0 360 190" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="14" font-size="11" fill="currentColor">仪器精度与加热口径 Precision and heating rules</text>
  <line x1="178" y1="22" x2="178" y2="134" stroke="currentColor" stroke-opacity="0.2"/>
  <g font-size="8.5" fill="currentColor">
    <text x="6" y="36">量筒 <tspan fill="#d4a017">读到 0.1 mL</tspan></text>
    <text x="6" y="54">容量瓶 <tspan fill="#d4a017">只有一条标线</tspan></text>
    <text x="6" y="72">滴定管 <tspan fill="#d4a017">读到 0.01 mL</tspan></text>
    <text x="6" y="90">托盘天平 <tspan fill="#d4a017">读到 0.1 g</tspan></text>
    <text x="6" y="108">温度计 <tspan fill="#d4a017">位置随用途变</tspan></text>
    <text x="6" y="126">pH 试纸 <tspan fill="#d4a017">不得预先润湿</tspan></text>
    <text x="188" y="36">试管 <tspan fill="#d4a017">可直接加热</tspan></text>
    <text x="188" y="54">蒸发皿 <tspan fill="#d4a017">直接加热</tspan></text>
    <text x="188" y="72">坩埚 <tspan fill="#d4a017">强热，配泥三角</tspan></text>
    <text x="188" y="90">烧杯、烧瓶 <tspan fill="#d4a017">垫陶土网</tspan></text>
    <text x="188" y="108">锥形瓶 <tspan fill="#d4a017">垫网，滴定可摇</tspan></text>
    <text x="188" y="126">集气瓶 <tspan fill="#d4a017">不加热</tspan></text>
  </g>
  <line x1="6" y1="142" x2="354" y2="142" stroke="currentColor" stroke-opacity="0.2"/>
  <text x="6" y="156" font-size="7" fill="currentColor" fill-opacity="0.6">Graduations assume cold glass: heat moves the volume a piece actually holds</text>
  <text x="6" y="170" font-size="9" fill="#e5484d">⚠ 量筒、容量瓶、滴定管、漏斗都不加热，也不作反应容器</text>
  <text x="6" y="182" font-size="7" fill="#e5484d" fill-opacity="0.85">Cylinders, measuring flasks, burettes and funnels: never heated, never reaction vessels</text>
</svg>`,
        },
        {
          id: "qr-separations",
          icon: "🫧",
          term: { zh: "分离与提纯的方法及仪器配套", en: "Separation and Purification: Method Matched to Apparatus" },
          level: 2,
          oneLiner: {
            zh: "不溶靠过滤、可溶靠蒸发、沸点差靠蒸馏、溶解度差靠萃取——先看靠什么分开。",
            en: "Insoluble goes by filtering, dissolved by evaporating, a boiling gap by distillation, a solubility gap by extraction — first ask what holds them apart.",
          },
          detail: {
            zh: "分离提纯的选法只看一件事：混合物靠什么性质分得开。不溶固体对液体用过滤，记「一贴二低三靠」：滤纸紧贴漏斗内壁，滤纸边缘低于漏斗口、液面低于滤纸边缘，烧杯紧靠玻璃棒、玻璃棒下端靠在三层滤纸一侧、漏斗尖嘴靠接收烧杯内壁；玻璃棒在这里是引流，不是搅拌。洗沉淀的办法是往漏斗里加蒸馏水至浸没沉淀，等水自然流下再重复两三次。可溶固体从溶液里取出用蒸发结晶：蒸发皿直接加热，玻璃棒搅动防局部过热造成液滴飞溅，出现大量晶体就停火、用余热蒸干。但带结晶水的、受热会分解或会水解的一律不能蒸干，要改蒸发浓缩、降温结晶：NaHCO₃ 受热就放 CO₂，FeCl₃ 溶液蒸到最后只会得到氧化铁而得不到无水氯化铁。互溶的液体看沸点差用蒸馏：加碎瓷片防暴沸，忘了加必须等液体冷下来再补，温度计水银球跟支管口齐平（读的是蒸气温度），冷却水下口进上口出，让冷凝管始终充水且与水蒸气逆流换热，先通水后加热。溶质在两相里溶解度差得远用萃取分液，萃取剂三条要求：与原溶剂互不相溶、溶质在其中溶解度大、与溶质不反应；四氯化碳从碘水里萃取碘，下层紫红色从下口放出，上层水层从上口倒出，分液漏斗用前要检漏、振荡时要倒转过来适时旋开活塞放气。气体除杂走洗气瓶，长管进短管出，让气体鼓泡通过洗涤液；干燥管则是大孔进小孔出。还有两处易混：淀粉胶体里混了小分子离子，靠半透膜渗析除去，碘里混了沙用升华——但氯化铵看起来会「升华」其实是受热分解成氨与氯化氢、在冷处又化合回来，所以不能用升华法把它和碘分开。",
            en: "One question decides the method: what property holds the mixture apart. Insoluble solid from liquid goes through a filter, remembered as 'one paste, two lows, three rests' — paper wetted flat to the funnel wall, paper below the rim and liquid below the paper edge, beaker to the rod, rod to the three-ply side, nozzle to the receiving wall; the rod guides the liquid here and does not stir. A precipitate is washed by filling the funnel with distilled water until the solid is covered, letting it drain, and repeating two or three times. A dissolved solid comes back by evaporation: the dish goes straight on the flame, the rod keeps things moving so nothing boils locally and spits, and the heat goes off while plenty of crystals are still forming, residual heat doing the drying. Anything carrying water of crystallisation, decomposing on heating or hydrolysing must not be dried out — sodium hydrogen carbonate gives up CO₂, and an iron(III) chloride solution evaporated to dryness leaves iron oxide, never anhydrous iron(III) chloride. Miscible liquids separate on boiling point in a distillation: anti-bumping chips, and if you forgot them, add them only once the liquid is cold; the thermometer bulb level with the side arm, because it reads vapour; cooling water in at the lower port and out at the upper so the jacket stays full and works counter-current, water on before the flame. Where the solute prefers one of two immiscible phases, extract and separate: the extractant must not mix with the original solvent, must dissolve the solute far better, and must not react with it — carbon tetrachloride pulls iodine out of water, and the violet lower layer is run off through the tap while the upper aqueous layer is poured off the top; the separatory funnel is leak-checked first and vented at the neck during shaking. Gas impurities wash out through a bubbler, in the long tube and out the short, while a drying tube takes the wide end first. Two last confusions: ions are dialysed away from starch colloid through a semi-permeable membrane, and iodine is sublimed from sand — but ammonium chloride only imitates sublimation, splitting into ammonia and hydrogen chloride and recombining in a cold spot, which is why sublimation cannot part it from iodine.",
          },
          tags: [
            { zh: "分离提纯", en: "Separation" },
            { zh: "实验", en: "Lab" },
            { zh: "速查", en: "Quick Reference" },
          ],
          figure: `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="14" font-size="11" fill="currentColor">分离方法怎么选 Which separation, and why</text>
  <g font-size="8.5" fill="currentColor">
    <text x="6" y="34">过滤·不溶固体与液体</text><text x="150" y="34" fill="#d4a017">一贴二低三靠，玻璃棒引流</text>
    <text x="6" y="43" font-size="6.5" fill-opacity="0.6">filter: an insoluble solid out of a liquid</text>
    <text x="6" y="58">蒸发结晶·可溶固体</text><text x="150" y="58" fill="#d4a017">大量晶体析出即停火</text>
    <text x="6" y="67" font-size="6.5" fill-opacity="0.6">evaporate: stop early, let residual heat finish</text>
    <text x="6" y="82">降温结晶·带水、易分解</text><text x="150" y="82" fill="#d4a017">浓缩后冷却析出</text>
    <text x="6" y="91" font-size="6.5" fill-opacity="0.6">cool a concentrate instead, for hydrates</text>
    <text x="6" y="106">蒸馏·互溶液体</text><text x="150" y="106" fill="#d4a017">沸石、球齐支管口、水下进上出</text>
    <text x="6" y="115" font-size="6.5" fill-opacity="0.6">distil: chips, bulb at the side arm, water against the vapour</text>
    <text x="6" y="130">萃取分液·溶解度差</text><text x="150" y="130" fill="#d4a017">下层下口出，上层上口倒</text>
    <text x="6" y="139" font-size="6.5" fill-opacity="0.6">extract: lower layer out the tap, upper off the top</text>
    <text x="6" y="154">洗气·气体除杂</text><text x="150" y="154" fill="#d4a017">长管进、短管出</text>
    <text x="6" y="163" font-size="6.5" fill-opacity="0.6">wash a gas in the long tube, out the short</text>
  </g>
  <line x1="6" y1="172" x2="354" y2="172" stroke="currentColor" stroke-opacity="0.2"/>
  <text x="6" y="185" font-size="8" fill="currentColor">胶体除离子靠渗析（半透膜），碘混沙靠升华</text>
  <text x="6" y="194" font-size="6.5" fill="currentColor" fill-opacity="0.6">Dialysis for ions in a colloid; sublimation for iodine mixed with sand</text>
  <text x="6" y="207" font-size="8.5" fill="#e5484d">⚠ NH₄Cl 看着像升华，其实是先分解后化合，不能用它分离碘</text>
  <text x="6" y="214" font-size="6.5" fill="#e5484d" fill-opacity="0.85">Ammonium chloride decomposes and recombines — it only imitates sublimation</text>
</svg>`,
        },
        {
          id: "qr-storage",
          subs: [
            {
              f: "SiO₂",
              name: { zh: "二氧化硅（玻璃的主体）", en: "Silicon dioxide (the body of glass)" },
              note: { zh: "磨口塞、试剂瓶、量器都靠它，但它能被碱和氢氟酸侵蚀。", en: "Stoppers, bottles and glassware are built on it, yet alkali and hydrofluoric acid both attack it." },
              role: "l",
            },
            {
              f: "NaOH",
              name: { zh: "氢氧化钠（碱液）", en: "Sodium hydroxide (alkaline solution)" },
              note: { zh: "长期接触磨口就会把塞子粘住，所以碱液瓶配橡胶塞。", en: "Long contact with a ground joint welds it shut, hence the rubber stopper on alkali bottles." },
              role: "l",
            },
            {
              f: "Na₂SiO₃",
              name: { zh: "硅酸钠（有黏性）", en: "Sodium silicate (sticky)" },
              note: { zh: "就是它把玻璃塞与瓶口粘成一体，也是水玻璃的主要成分。", en: "This is what cements stopper to neck, and the main ingredient of water glass." },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "两个侵蚀反应的共同产物。", en: "A product of both attack reactions." },
              role: "r",
            },
            {
              f: "HF",
              name: { zh: "氢氟酸（不能碰玻璃）", en: "Hydrofluoric acid (glass cannot hold it)" },
              note: { zh: "能直接咬玻璃，只能装在塑料瓶里；刻玻璃字用的就是它。", en: "It eats glass outright, so it lives in plastic; it is also what etches glass." },
              role: "l",
            },
            {
              f: "SiF₄",
              name: { zh: "四氟化硅（气体）", en: "Silicon tetrafluoride (gas)" },
              note: { zh: "玻璃被氢氟酸腐蚀后的硅去向。", en: "Where the silicon goes when hydrofluoric acid works on glass." },
              role: "r",
            },
            {
              f: "AgNO₃",
              name: { zh: "硝酸银（见光分解）", en: "Silver nitrate (light-sensitive)" },
              note: { zh: "棕色瓶里的常客，瓶壁内侧那层灰黑就是分解出的银。", en: "A regular of the amber shelf; the grey film inside such bottles is the silver it shed." },
              role: "l",
            },
            {
              f: "Ag",
              name: { zh: "银（单质，黑灰色）", en: "Silver (metal, grey-black)" },
              note: { zh: "分解产物，附在瓶壁上使旧瓶发黑。", en: "Its decomposition product, which darkens an old bottle from inside." },
              role: "r",
            },
            {
              f: "NO₂",
              name: { zh: "二氧化氮", en: "Nitrogen dioxide" },
              note: { zh: "浓硝酸、硝酸银分解都有它；红棕色、有毒。", en: "Fumed from nitric acid and from silver nitrate alike; red-brown and toxic." },
              role: "r",
            },
            {
              f: "O₂",
              name: { zh: "氧气", en: "Oxygen" },
              note: { zh: "硝酸盐分解放出的气体，也是氧化剂自身被还原的证据。", en: "The gas a nitrate gives up, and the mark that the oxidiser reduced itself." },
              role: "r",
            },
          ],
          icon: "🧴",
          term: { zh: "药品的存放与容器选择", en: "Storing Reagents and Choosing the Container" },
          level: 2,
          oneLiner: {
            zh: "怕空气的泡煤油、怕水的密封、怕光的进棕色瓶、怕玻璃的换塑料瓶。",
            en: "What fears air keeps in paraffin, what fears water stays sealed, what fears light takes the amber bottle, what fears glass moves to plastic.",
          },
          eq: [
            {
              lhs: "SiO₂ + 2NaOH",
              cond: { zh: "磨口处玻璃被碱缓慢侵蚀", en: "the ground joint under alkali" },
              rhs: "Na₂SiO₃ + H₂O",
            },
            {
              lhs: "SiO₂ + 4HF",
              cond: { zh: "氢氟酸腐蚀玻璃", en: "hydrofluoric acid on glass" },
              rhs: "SiF₄↑ + 2H₂O",
            },
            {
              lhs: "2AgNO₃",
              cond: { zh: "光照，所以要棕色瓶", en: "light — hence the amber bottle" },
              rhs: "2Ag + 2NO₂↑ + O₂↑",
            },
          ],
          detail: {
            zh: "药品怎么存，只看它跟什么反应：跟空气反应的隔空气，跟水反应的隔水，见光分解的躲光，跟玻璃反应的换塑料。钠、钾泡在煤油里（它密度比煤油大，沉在下面刚好隔绝空气和水），白磷浸在冷水中（着火点只有约 40 ℃，而它不与水反应），液溴上面加一层水封——溴密度大、只能微溶于水，那层水能压住挥发。见光分解的三类必放棕色瓶：硝酸银、浓硝酸、氯水；硝酸银分解会析出单质银，所以旧瓶内壁常带一层灰黑。磨口塞看酸碱性：碱液（NaOH、Na₂CO₃）会缓慢侵蚀玻璃磨口、生成有黏性的硅酸钠，把塞子和瓶口粘成一体，所以碱液瓶用橡胶塞，装碱液的滴定管也必须用碱式（橡胶管里嵌玻璃珠）而不能用带玻璃磨口活塞的酸式；氢氟酸更彻底，它直接和二氧化硅反应，只能装塑料瓶。亚铁盐溶液里放一枚铁钉，把已经氧化出来的 Fe³⁺ 又还原回去，能顶住一阵子。无水硫酸铜、氯化钙这类干燥剂和易潮解的药品放干燥器。存放还要看相容：氧化剂（高锰酸钾、硝酸盐）不能与有机物、还原剂同橱，酸与碱分开，钠钾远离水与酸。",
            en: "Storage asks one question: what does this reagent react with. What fears air is cut off from it, what fears water from that, what fears light from the light, what fears glass gets a different bottle. Sodium and potassium sit under paraffin — denser than the oil, they sink and are sealed from both air and moisture; white phosphorus lies under cold water, since it ignites near 40 °C but does not react with water; bromine keeps a water seal on top, being heavy and only slightly soluble, so the layer above it damps the fuming. Three light-sensitive regulars demand amber glass — silver nitrate, concentrated nitric acid, chlorine water — and since silver nitrate breaks down to the metal, an old bottle greys from the inside. Stoppers follow acid-base chemistry: alkali (sodium hydroxide, sodium carbonate) slowly eats the ground joint into sticky sodium silicate and welds stopper to neck, so alkaline solutions get rubber, and a burette for them uses the bead-and-tube pattern rather than a glass tap; hydrofluoric acid is more thorough still, reacting with the silica itself, and can only live in plastic. An iron nail in an iron(II) salt solution reduces back the iron(III) that has already formed and buys time. Desiccants and deliquescent solids — anhydrous copper sulfate, calcium chloride — keep to a desiccator. Compatibility decides the shelf as well: oxidisers such as permanganate and the nitrates are not stored with organics or reducers, acids apart from bases, sodium and potassium far from both water and acid.",
          },
          tags: [
            { zh: "药品存放", en: "Storage" },
            { zh: "安全", en: "Safety" },
            { zh: "速查", en: "Quick Reference" },
          ],
          figure: `<svg viewBox="0 0 360 152" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="14" font-size="11" fill="currentColor">谁怕什么，就隔掉什么 Kept from whatever it reacts with</text>
  <line x1="178" y1="22" x2="178" y2="110" stroke="currentColor" stroke-opacity="0.2"/>
  <g font-size="8.5" fill="currentColor">
    <text x="6" y="36">钠、钾 <tspan fill="#d4a017">煤油中</tspan></text>
    <text x="6" y="54">白磷 <tspan fill="#d4a017">冷水里</tspan></text>
    <text x="6" y="72">液溴 <tspan fill="#d4a017">上面水封</tspan></text>
    <text x="6" y="90">Na₂O₂、CaC₂ <tspan fill="#d4a017">严格密封</tspan></text>
    <text x="6" y="108">无水 CuSO₄ <tspan fill="#d4a017">干燥器</tspan></text>
    <text x="188" y="36">NaOH、Na₂CO₃ 液 <tspan fill="#d4a017">橡胶塞</tspan></text>
    <text x="188" y="54">氢氟酸 <tspan fill="#d4a017">塑料瓶</tspan></text>
    <text x="188" y="72">AgNO₃、浓 HNO₃ <tspan fill="#d4a017">棕色瓶</tspan></text>
    <text x="188" y="90">FeSO₄ 溶液 <tspan fill="#d4a017">加一枚铁钉</tspan></text>
    <text x="188" y="108">KMnO₄ <tspan fill="#d4a017">与有机物分柜</tspan></text>
  </g>
  <text x="6" y="124" font-size="7" fill="currentColor" fill-opacity="0.6">Left: what air or water would spoil. Right: what the container itself would spoil</text>
  <text x="6" y="137" font-size="8.5" fill="#e5484d">⚠ 碱液会粘死磨口玻璃塞；氢氟酸没有玻璃容得下</text>
  <text x="6" y="148" font-size="6.5" fill="#e5484d" fill-opacity="0.85">Alkali welds a glass stopper shut; no glass vessel holds hydrofluoric acid</text>
</svg>`,
        },
        {
          id: "qr-gas-making",
          icon: "🎈",
          term: { zh: "常见气体的实验室制取", en: "Making Gases in the Laboratory" },
          level: 1,
          oneLiner: {
            zh: "发生装置看反应物状态与是否加热，收集方法看溶解性与密度。",
            en: "The generator follows state and heating; the collector follows solubility and density.",
          },
          figure: `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="14" font-size="11" fill="currentColor">装置与收集怎么选：两条判据就够</text>
  <line x1="6" y1="20" x2="354" y2="20" stroke="currentColor" stroke-opacity="0.25"/>
  <text x="6" y="34" font-size="8" fill="#d4a017">发生装置 · 看反应物状态与是否加热</text>
  <g font-size="8" fill="currentColor">
    <text x="6" y="48">固 + 固，加热 → 试管，口略向下倾斜（高锰酸钾制氧）</text>
    <text x="6" y="62">固 + 液，常温 → 锥形瓶或大试管（双氧水、锌与稀酸、石灰石与盐酸）</text>
    <text x="6" y="76">要随开随停 → 启普发生器（限块状固体，粉末不行）</text>
    <text x="6" y="90">长颈漏斗下端必须入液面下（液封），分液漏斗可控快慢</text>
  </g>
  <text x="6" y="106" font-size="8" fill="#d4a017">收集方法 · 看溶解性与密度</text>
  <g font-size="8" fill="currentColor">
    <text x="6" y="120">不易溶于水、不与水反应 → 排水法（较纯）：O₂、H₂、NO、CH₄</text>
    <text x="6" y="134">密度比空气大（相对分子质量 &gt; 29）→ 向上排空气：CO₂、O₂、Cl₂</text>
    <text x="6" y="148">密度比空气小 → 向下排空气：H₂、NH₃、CH₄</text>
    <text x="6" y="162">有毒或污染空气 → 排空气并接尾气吸收，不得直接排空</text>
  </g>
  <line x1="6" y1="170" x2="354" y2="170" stroke="currentColor" stroke-opacity="0.25"/>
  <text x="6" y="182" font-size="8" fill="currentColor" fill-opacity="0.75">次序：查气密 → 装药 → 固定 → 收集 → 先撤导管 → 后熄灯</text>
  <text x="6" y="195" font-size="8.5" fill="#e5484d">⚠ 先熄灯，水槽里的水会倒流入热试管，试管当场炸裂</text>
</svg>`,
          detail: {
            zh: "制一个气体只问两个问题：用什么装置发生它，用什么方法收集它，而两问都有固定的判据。发生装置只看反应物的状态和要不要加热：固体与固体一起加热就用试管，管口要略向下倾斜（防止冷凝水倒流到热的管底把试管炸了），用高锰酸钾时管口还要塞一团棉花防粉末进导管；固体与液体在常温反应就用锥形瓶或大试管，双氧水加二氧化锰、锌粒与稀硫酸、石灰石与稀盐酸都属于这一类；如果用的是块状固体与液体又要随开随停，就上启普发生器（粉末会漏下去所以不行）。长颈漏斗的下端必须插到液面以下形成液封，否则气体就从漏斗口跑掉了；改用分液漏斗则能控制滴加快慢，从而控制反应速度。收集方法只看气体的两个性质：溶不溶于水、密度比空气大还是小。不易溶于水又不与水反应的就用排水法，得到的气体较纯但带水汽；密度比空气大又不与空气成分反应的用向上排空气法（比较干燥），小的用向下排空气法。一个常用的定量判据是相对分子质量与空气的平均值 29 比大小：CO₂ 是 44、O₂ 是 32，都比 29 大，所以向上排；H₂ 是 2、NH₃ 是 17、CH₄ 是 16，都向下排。但 NO 只能用排水法，因为它一接触空气就变成 NO₂；密度与空气接近的气体（如 CO，28 对 29）靠排空气分不出层次，只能排水收集，而且它有毒，尾气要么点掉要么另瓶收走。三种必考气体的药品选择各有理由，这四个“为什么不用”是必考项：制 CO₂ 不用稀硫酸，因为生成的硫酸钙微溶、会盖住石灰石表面让反应自行停止；不用浓盐酸，因为它挥发出的氯化氢混进气体里，会让澄清石灰水不能正常变浑浊；不用碳酸钠粉末，因为反应太快来不及收集；也不用硝酸，因为它见光易分解、成本高，挥发出的酸雾还会混进气体。锌与稀硫酸制氢不用浓硫酸与硝酸，是因为它们在常温下会把铁铝钝化、与锌反应放出的是二氧化硫或氮的氧化物而不是氢。操作上还有三条固定次序：装药前先查气密性（把导管入水、用手捂住容器看管口是否冒气泡）；加热法制氧结束时一定先把导管从水里抽出来再熄灯，否则水倒流炸管；验满要在瓶口（见「常见气体的检验与验满」）。最后把“发生装置与制二氧化碳同一类”这句用起来：只要反应是固液常温，三种气体的装置就可以完全相同，只是收集方法不同。",            en: "Making a gas asks only two questions — which generator, which collector — and both have fixed answers. The generator looks only at the state of the reactants and whether heat is needed. Solids heated together take a test tube tilted slightly downward at the mouth, so that condensate cannot run back onto the hot bottom and crack it, and potassium permanganate needs a cotton plug as well so that no powder enters the delivery tube. A solid with a liquid at room temperature takes a flask or a large tube: hydrogen peroxide with manganese dioxide, zinc with dilute sulfuric acid, marble with hydrochloric acid, all of this class. A lumped solid with a liquid, wanted now and stopped again at will, goes to a Kipp generator, which powders cannot be used in. The foot of a long-stem funnel must sit below the liquid surface, or the gas simply leaves by the funnel; a dropping funnel instead lets the rate be set drop by drop. The collector looks at two properties only: solubility in water, and density against air. A gas that hardly dissolves and does not react with water is gathered over water, which is purer but damp; one heavier than air and inert toward it rises into an upright jar, one lighter falls into an inverted one, and both by displacement, which is drier. The working comparison is relative molecular mass against air's average of 29: carbon dioxide at 44 and oxygen at 32 displace upward, hydrogen at 2, ammonia at 17 and methane at 16 downward. Nitric oxide, however, can only be gathered over water because it turns into nitrogen dioxide the moment it meets air, and a gas whose mass sits beside air's own (carbon monoxide, 28 against 29) cannot be separated from it at all, so it is collected over water or burnt away. The four 'why not' questions about reagents are examined year after year, and each has a reason: no dilute sulfuric acid for carbon dioxide, because the sparingly soluble calcium sulfate coats the marble and the reaction dies of itself; no concentrated hydrochloric acid, because its escaping hydrogen chloride rides into the gas and stops the lime water clouding; no sodium carbonate powder, because it goes off too fast to catch; no nitric acid either, since it is costly, breaks down in light and fumes acid into the gas. Zinc for hydrogen uses ordinary dilute acid because concentrated sulfuric and nitric acid are oxidisers — they give sulfur dioxide or nitrogen oxides rather than hydrogen, and cold concentrated sulfuric acid passivates iron and aluminium outright. Three fixed orders remain: test the air-tightness before charging anything (stand the delivery tube in water and warm the vessel with your hands until bubbles appear at the mouth); when a heated method finishes, pull the tube out of the water before putting the lamp out, or the water runs back and breaks the hot tube; and the full-jar test is made at the mouth, never inside (see the gas tests entry). Use one sentence to hold the whole thing together: any solid-with-liquid, no-heat preparation shares one generator with carbon dioxide, and only the collection differs.",
          },
          tags: [
            { zh: "实验", en: "Practical" },
            { zh: "气体制取", en: "Gas Making" },
            { zh: "初中", en: "Junior" },
          ],
        },
        {
          id: "qr-indicators",
          icon: "🌈",
          term: { zh: "酸碱指示剂与 pH", en: "Indicators and pH" },
          level: 1,
          oneLiner: {
            zh: "指示剂只判酸碱性，pH 才判强弱；pH 试纸不得先润湿。",
            en: "Indicators show only acid or base; pH measures how strong. Never wet the paper.",
          },
          figure: `<svg viewBox="0 0 360 152" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="14" font-size="11" fill="currentColor">指示剂判酸碱性，pH 判强弱</text>
  <line x1="6" y1="20" x2="354" y2="20" stroke="currentColor" stroke-opacity="0.25"/>
  <g font-size="8" fill="#d4a017">
    <text x="6" y="32">指示剂</text>
    <text x="110" y="32">遇酸</text>
    <text x="175" y="32">遇碱</text>
    <text x="240" y="32">变色范围</text>
  </g>
  <g font-size="8" fill="currentColor">
    <text x="6" y="46">紫色石蕊</text>
    <text x="110" y="46" fill="#e5484d">变红</text>
    <text x="175" y="46" fill="#2563eb">变蓝</text>
    <text x="240" y="46">pH 5.0 ~ 8.0</text>
    <text x="6" y="62">无色酚酞</text>
    <text x="110" y="62">不变（无色）</text>
    <text x="175" y="62" fill="#e5484d">变红</text>
    <text x="240" y="62">pH 8.2 ~ 10.0</text>
  </g>
  <line x1="6" y1="72" x2="354" y2="72" stroke="currentColor" stroke-opacity="0.2"/>
  <rect x="6" y="84" width="110" height="7" fill="#e5484d" fill-opacity="0.55"/>
  <rect x="116" y="84" width="120" height="7" fill="currentColor" fill-opacity="0.18"/>
  <rect x="236" y="84" width="118" height="7" fill="#2563eb" fill-opacity="0.5"/>
  <g font-size="7" fill="currentColor">
    <text x="6" y="102">0 强酸</text>
    <text x="160" y="102">7 中性</text>
    <text x="326" y="102">14 强碱</text>
  </g>
  <text x="6" y="118" font-size="7.5" fill="currentColor" fill-opacity="0.7">pH 每差 1，氢离子浓度差 10 倍；广泛试纸只读到整数</text>
  <text x="6" y="131" font-size="7.5" fill="currentColor" fill-opacity="0.7">酸雨指 pH 小于 5.6 的降水（不是小于 7）</text>
  <text x="6" y="146" font-size="8.5" fill="#e5484d">⚠ 盐不一定中性：Na₂CO₃ 显碱性能使酚酞变红</text>
</svg>`,
          detail: {
            zh: "指示剂的作用只是把看不见的酸碱性变成看得见的颜色，而强弱、多少要靠 pH 才能说。两种指示剂的变色记成一句：紫色石蕊「酸里红、碱里蓝」，无色酚酞「酸里无色、碱里红」（口诀就是「石蕊酸红碱蓝，酚酞酸无碱红」）。但石蕊的变色范围很宽（pH 5.0 到 8.0）、中间还要经过紫色，变化不干脆，而酚酞在 8.2 到 10.0 之间一下子从无色到红，变化干脆得多——这就是为什么定量中和滴定选酚酞（或甲基橙）而不用石蕊。还要记住酚酞并不是遇碱就“一定”红：向很浓的氢氧化钠（pH 超过 13）里滴酚酞，先变红后慢慢褪色，所以现象描述要写“若不变红则可能是碱太浓”。pH 是氢离子浓度的负常用对数（pH = −lg c(H⁺)），所以 pH 每差 1、氢离子浓度差 10 倍：pH 3 的酸比 pH 4 的氢离子多十倍（不是酸多三倍）。测 pH 的标准操作只有一句话：用玻璃棒蘸取待测液、滴在放在表面皿上的试纸上、半分钟内与标准比色卡对照。由此派生三条常考的规矩。一、pH 试纸不得预先润湿：润湿就是把待测液稀释了，测酸时 pH 偏大、测碱时 pH 偏小、测中性无影响（这也是湿润的红色石蕊试纸检氨气、淀粉-KI 试纸检氯气时反而必须润湿的原因，详见「常用仪器的精度与加热口径」）。二、不得把试纸直接伸进待测液里，那会污染整瓶试剂。三、广泛 pH 试纸只能读到整数，要看小数就换精密 pH 试纸或 pH 计。pH 与酸碱性是两回事，要分开回答：“pH 小于 7 就是酸性”只看常温（25 ℃）；水的电离是吸热的，温度升高时中性的 pH 会小于 7（100 ℃ 约 6.1），所以严格说中性应该看氢离子与氢氧根浓度是不是相等。应用上四件事背数字就够：正常雨水因为溶了 CO₂ 而 pH 约 5.6，所以酸雨的定义是 pH 小于 5.6 而不是小于 7（二氧化硫与氮氧化物把它拉到更低）；人的胃液 pH 约 0.9 到 1.5；血浆 pH 稳定在 7.35 到 7.45，波动范围小得惊人；最宜作物生长的土壤 pH 约 6.5 到 7.5，过酸才用熟石灰改良（见「中和反应」）。最后一个高频错句是“盐溶液都显中性”：NaCl、KNO₃ 这类确实中性，但 Na₂CO₃（纯碱）溶液显碱性、能使酚酞变红，而 NH₄Cl、AlCl₃ 溶液显酸性——“谁强听谁的”，这个规律在「盐类水解」一条里展开。",            en: "An indicator only turns an invisible acidity into a visible colour; how strong, and how much, is a question for pH. The two colour changes are learned as one line: litmus turns red in acid and blue in base, phenolphthalein stays colourless in acid and goes red in base. But litmus changes over a wide stretch (pH 5.0 to 8.0) and drifts through purple between the two, while phenolphthalein crosses 8.2 to 10.0 in a single decisive jump from colourless to red — which is why a quantitative titration uses phenolphthalein (or methyl orange) and never litmus. Note that phenolphthalein does not simply go red in every base: into very concentrated sodium hydroxide, above pH 13, it first flushes and then fades again, so a negative result may mean the alkali was too strong rather than absent. pH is the negative common logarithm of the hydrogen-ion concentration, so one step on the scale is tenfold in ions: a pH 3 acid holds ten times the hydrogen ions of a pH 4 one, not three times. The standard measurement is one sentence — dip a glass rod, touch it to a strip lying on a watch glass, read against the colour chart within half a minute — and three exam rules grow out of it. First, never wet a pH strip beforehand, since wetting is dilution: an acid then reads too high, a base too low, and a neutral solution is unaffected, which is exactly why litmus and starch-iodide papers must be wetted when they are testing a gas (see the entry on instrument precision). Second, never dip the strip into the beaker, which spoils the whole reagent bottle. Third, a wide-range strip only reads whole numbers; for decimals use a precision strip or a meter. Acidity and neutrality are not the same claim either: 'below 7 is acid' holds at 25 °C, because water's own ionisation takes up heat and at 100 °C a truly neutral water sits near pH 6.1, so neutrality properly means equal hydrogen and hydroxide concentrations, not the number 7. Four applications are pure recall: normal rain is near pH 5.6 because it dissolves carbon dioxide, so acid rain is defined below 5.6 rather than below 7 (sulfur dioxide and nitrogen oxides push it lower); gastric juice runs 0.9 to 1.5; blood plasma holds 7.35 to 7.45, a startlingly narrow band; and crops grow best near 6.5 to 7.5, which is when an acid soil earns its liming (see neutralisation). One last false sentence: 'salt solutions are neutral'. Sodium chloride and potassium nitrate are, but washing soda is alkaline and reddens phenolphthalein while ammonium chloride and aluminium chloride are acidic — the strong partner decides, which is worked out under salt hydrolysis.",
          },
          tags: [
            { zh: "实验", en: "Practical" },
            { zh: "酸碱", en: "Acid-Base" },
            { zh: "初中", en: "Junior" },
          ],
        },
      ],
    },
    /* ===================== 化学与生产生活 ===================== */
    {
      key: "life-chem",
      icon: "🏭",
      title: { zh: "化学与生产生活", en: "Chemistry in Industry & Life" },
      items: [
        {
          id: "eq-hou",
          subs: [
            {
              f: "NaCl",
              name: {
                zh: "氯化钠（饱和食盐水）",
                en: "Sodium chloride (brine)",
              },
              note: { zh: "提供 Na⁺。", en: "Supplies Na⁺." },
              role: "l",
            },
            {
              f: "NH₃",
              name: { zh: "氨", en: "Ammonia" },
              note: {
                zh: "先通氨使溶液呈碱性，利于吸收 CO₂。",
                en: "Passed first to alkalinize the brine, aiding CO₂ absorption.",
              },
              role: "l",
            },
            {
              f: "CO₂",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: {
                zh: "通入提供碳酸根。",
                en: "Passed in to supply carbonate.",
              },
              role: "l",
            },
            {
              f: "NaHCO₃↓",
              name: { zh: "碳酸氢钠", en: "Sodium bicarbonate" },
              note: {
                zh: "因溶解度较小而析出，是煅烧得纯碱的中间体。",
                en: "Precipitates as the least soluble; the intermediate calcined to soda ash.",
              },
              role: "r",
            },
            {
              f: "NH₄Cl",
              name: { zh: "氯化铵", en: "Ammonium chloride" },
              note: {
                zh: "作氮肥析出，提高原料利用率。",
                en: "Crystallized out as nitrogen fertilizer, raising salt utilization.",
              },
              role: "r",
            },
            {
              f: "Na₂CO₃",
              name: { zh: "碳酸钠（纯碱）", en: "Sodium carbonate (soda ash)" },
              note: {
                zh: "最终产品，由 NaHCO₃ 受热分解得到。",
                en: "Final product, from thermal decomposition of NaHCO₃.",
              },
              role: "r",
            },
          ],
          icon: "🧂",
          term: { zh: "侯氏制碱法", en: "Hou's Process" },
          level: 2,
          oneLiner: {
            zh: "向饱和氨盐水中通 CO₂，析出碳酸氢钠再煅烧得纯碱。",
            en: "Pass CO₂ into ammoniated brine; precipitated NaHCO₃ is calcined to soda ash.",
          },
          eq: [
            { lhs: "NaCl + NH₃ + CO₂ + H₂O", rhs: "NaHCO₃↓ + NH₄Cl" },
            {
              lhs: "2NaHCO₃",
              cond: { zh: "加热 △", en: "heat Δ" },
              rhs: "Na₂CO₃ + H₂O + CO₂↑",
            },
          ],
          detail: {
            zh: "这套工艺的每一步顺序都有理由，理解与考题都落在顺序上。第一步是向饱和食盐水里先通氨、后通二氧化碳：氨极易溶于水（1 体积水约溶 700 体积氨）且水溶液呈碱性，先把溶液变成碱性，才能把溶解度不大的二氧化碳大量接住、转成碳酸氢根；若反过来先通二氧化碳，中性水里溶解的量太少，后面的反应根本起不来。第二步是析出碳酸氢钠而不是别的盐：同一溶液里同时有 Na⁺、NH₄⁺、Cl⁻、HCO₃⁻ 四类离子，可组合出四种盐，而碳酸氢钠在这个体系里溶解度最小、又最先达到饱和，所以它先以沉淀被挑出来——联合制碱最巧的地方不是造出新物质，而是利用溶解度差异把已有离子重新配对。第三步煅烧碳酸氢钠得纯碱，放出的二氧化碳回收再通回第一步。索尔维氨碱法的死结在氯：食盐水里的氯最终变成氯化钙废液排出，钠只用了不足八成，厂外堆着成山的废渣。侯德榜的改动是把母液降温并加入细盐粉，利用氯化铵溶解度随温度下降明显、再加氯离子的同离子效应，让氯化铵单独结晶出来当氮肥，母液循环回用，于是钠和氯都各有去处，利用率提到九成以上，也不再有氯化钙废渣。1933 年他出版《制碱》把长期被垄断的工艺细节公开，1943 年完成这一联合改进（人物见「侯德榜」）。三处常见错解一并排掉：第一，纯碱是盐不是碱，只是碳酸根水解使溶液显碱性（见「常见物质的俗名与主要成分」）；第二，析出碳酸氢钠靠的是溶解度差异，并不意味着它不溶于水，常温它仍溶约 10 g；第三，碳酸氢钠要加热才分解成碳酸钠，所以由它制纯碱必须走煅烧这一步（见「碳酸氢钠受热分解」）。产品去向也连着别的条目：纯碱用于玻璃、洗涤剂与纺织，碳酸氢钠用于发酵粉与胃药（见「玻璃、水泥与陶瓷」与「胃酸中和（胃药）」）。",
            en: "Every step of this process is ordered for a reason, and both the exam questions and the understanding sit in that order. Step one is to pass ammonia into brine first and carbon dioxide second: ammonia is extremely soluble, roughly 700 volumes per volume of water, and its solution is alkaline, so making the liquid basic first is what allows the sparingly soluble dioxide to be taken up in bulk and converted to hydrogen carbonate; reverse the order and only a trace dissolves in the neutral liquid, so nothing downstream can happen. Step two is why sodium hydrogen carbonate rather than something else crystallises: the liquid holds Na+, NH4+, Cl- and HCO3- together, which can pair into four salts, and the bicarbonate is the least soluble in this mixture and the first to reach saturation, so precipitation is really a re-pairing of ions already present rather than the creation of a new substance. Step three, calcining it, gives soda ash and returns dioxide to step one. The dead end of the Solvay route is chlorine: the chloride of the brine ends as calcium chloride waste, less than four fifths of the sodium is captured, and tips of spent liquor pile up outside the plant. Hou Debang changed the recovery step by cooling the mother liquor and dusting in fine salt, exploiting the steep fall of ammonium chloride solubility with temperature plus the common-ion push from extra chloride, so ammonium chloride alone crystallises out and can be sold as nitrogen fertiliser while the liquor is recycled; both sodium and chlorine then have a use, utilisation rises past ninety percent, and the waste disappears. His 1933 book broke the monopoly on the details, and the joint process was worked out in 1943. Three misreadings to clear: soda ash is a salt, not a base, since it merely turns alkaline by hydrolysis of the carbonate ion; the crystallisation is a solubility contest and the bicarbonate still dissolves around 10 g at room temperature; and turning it into soda ash needs the calcination step because it only decomposes on heating. The products lead on elsewhere, into glass and detergents for the carbonate and into baking powder and antacid tablets for the bicarbonate.",
          },
          tags: [{ zh: "工业", en: "Industry" }],
        },
        {
          id: "eq-sapon",
          subs: [
            {
              f: "(C₁₇H₃₅COO)₃C₃H₅",
              name: { zh: "油脂（硬脂酸甘油酯）", en: "Fat (tristearin)" },
              note: { zh: "制肥皂的原料。", en: "The feedstock for soap." },
              role: "l",
            },
            {
              f: "3NaOH",
              name: {
                zh: "氢氧化钠（烧碱）",
                en: "Sodium hydroxide (caustic soda)",
              },
              note: {
                zh: "使油脂水解（皂化）。",
                en: "Hydrolyzes the fat (saponification).",
              },
              role: "l",
            },
            {
              f: "3C₁₇H₃₅COONa",
              name: { zh: "硬脂酸钠", en: "Sodium stearate" },
              note: {
                zh: "肥㚬的主要成分，具去污能力。",
                en: "The main soap component; has cleansing power.",
              },
              role: "r",
            },
            {
              f: "C₃H₅(OH)₃",
              name: { zh: "丙三醇（甘油）", en: "Glycerol" },
              note: {
                zh: "副产物，具润肤用途。",
                en: "By-product; used as a skin moisturizer.",
              },
              role: "r",
            },
          ],
          icon: "🧼",
          term: { zh: "皂化反应（制肥皂）", en: "Saponification" },
          level: 2,
          oneLiner: {
            zh: "油脂在氢氧化钠溶液中水解，生成高级脂肪酸钠和甘油。",
            en: "Fats hydrolyze in NaOH solution into soap (fatty sodium salts) and glycerol.",
          },
          eq: {
            lhs: "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH",
            cond: { zh: "加热 △", en: "heat Δ" },
            rhs: "3C₁₇H₃₅COONa + C₃H₅(OH)₃",
          },
          detail: {
            zh: "皂化这个词有严格边界：油脂在碱性条件下的水解才叫皂化，因为在酸里水解得到的是游离脂肪酸和甘油，只有遇到碱，脂肪酸才被变成钠盐——也就是肥皂。所以「皂化反应就是中和反应」这句话是错的：真正的顺序是水解先出酸、碱随即把酸中和，两步合写成一条方程式，反应物侧因此必须写碱。为什么这样能去污？硬脂酸钠分子一头是亲水的羧酸钠端、另一头是亲油的长烃链，在水中几十个到上百个分子自动排成胶束，亲油端朝内把油滴裹住、亲水端朝外连着水，于是油污被乳化成细小液滴随水冲走——注意这是把油分散成小滴带走，不是把油溶解了，用汽油洗掉油漆才是溶解。三个必须掌握的实验细节：一是反应要加热并不断搅拌，因为油脂不溶于水、两相接触面积决定水解快慢，工业上还常加压提高温度；二是盐析，往煮沸后的浑浊液里加食盐细粉，钠离子浓度升高把高级脂肪酸钠挤出溶液，它密度小而浮在上层（说沉底就错了），下层是甘油与食盐的混合液，这一步是可逆的物理过程，加水还能再溶，与蛋白质的盐析同类（见「蛋白质与氨基酸」）；三是分离出的皂还要水洗、压干、掺入填料与香精。肥皂在两种水里会失灵：硬水中的钙镁离子把硬脂酸根沉淀成不溶的浮渣，就是洗衣时看到的絮状物，既费皂又沾污衣物，所以硬水地区更多用合成洗涤剂；酸性水里则被置换回游离脂肪酸而失去乳化能力，这也是肥皂不宜与酸性清洁剂同用的道理。钾皂更软、常温呈糊状或液态，所以软皂与液体皂用氢氧化钾而不是氢氧化钠。副产物甘油并不废弃，它吸水性好，用于护肤与药剂，也是制硝化甘油的原料。最后两个易混点：油脂本身是高级脂肪酸与甘油形成的酯，所以皂化属于酯的水解的一种（酯的形成见「酯化反应」）；而「油脂是高分子化合物」是错的，它的相对分子质量只有几百到一千量级，远不到聚合物的级别。",
            en: "The word saponification has a hard boundary: only alkaline hydrolysis of a fat deserves the name, because in acid the products are free fatty acids and glycerol, and it takes a base to convert the acid into its sodium salt - that salt is the soap. So the claim that saponification is a neutralisation is wrong in its ordering: hydrolysis supplies the acid first and the base removes it instantly, the two steps are written as one equation, and that is why the reagent side must carry an alkali. Why does it clean? A stearate ion has a water-loving carboxylate head and an oil-loving hydrocarbon tail, and in water dozens to hundreds of them arrange into micelles, tails inward around an oil droplet, heads outward holding the water, so grease is emulsified into fine droplets and swept away - dispersed, not dissolved, and it is petrol removing paint that counts as a true solution. Three laboratory details matter. Heating with constant stirring is essential because fat and water form two layers and the contact area controls the rate, which industry raises further with pressure. Then salting out: dusting common salt into the boiled mixture raises the sodium ion concentration enough to force the soap out of solution, and since it is light it floats as a top layer - saying it sinks is a classic error - while glycerol and brine stay below; this is a reversible physical separation, and adding water redissolves the soap, the same kind of effect seen with proteins. The separated soap is then washed, pressed and dressed with fillers and fragrance. Soap fails in two waters. In hard water calcium and magnesium precipitate the stearate as insoluble scum, the grey flakes that waste soap and stain cloth, which is why synthetic detergents are favoured where water is hard; in acidic water the fatty acid is simply protonated back and loses its emulsifying power, which is why soap should not be paired with an acid cleaner. Potassium salts are softer and remain pasty or liquid, hence soft and liquid soaps are made with potassium hydroxide. The glycerol by-product is not waste: it holds water in skin preparations and pharmacy, and is the feed for nitroglycerine. Two last confusions to clear: a fat is itself an ester of glycerol with long-chain acids, so saponification is a special case of ester hydrolysis, yet calling a fat a polymer is wrong - its molecule weighs only a few hundred to a thousand, far below any macromolecular scale.",
          },
          tags: [{ zh: "有机", en: "Organic" }],
        },
        {
          id: "eq-nh3",
          subs: [
            {
              f: "N₂",
              name: { zh: "氮气（来自空气）", en: "Nitrogen (from air)" },
              note: { zh: "合成氨原料。", en: "Feedstock for ammonia." },
              role: "l",
            },
            {
              f: "3H₂",
              name: {
                zh: "氢气（来自水/燃料）",
                en: "Hydrogen (from water/fuel)",
              },
              note: { zh: "另一原料。", en: "The other feedstock." },
              role: "l",
            },
            {
              f: "2NH₃",
              name: { zh: "氨", en: "Ammonia" },
              note: {
                zh: "化肥工业之母；反应可逆。",
                en: "The backbone of fertilizer making; the reaction is reversible.",
              },
              role: "r",
            },
          ],
          icon: "⚗️",
          term: { zh: "工业合成氨", en: "Ammonia Synthesis" },
          level: 3,
          oneLiner: {
            zh: "氮气与氢气在高温高压、催化剂下可逆化合生成氨。",
            en: "N₂ and H₂ combine reversibly under high pressure, heat and catalyst.",
          },
          eq: {
            lhs: "N₂ + 3H₂",
            cond: { zh: "高温高压 · 催化剂", en: "high P·T, catalyst" },
            rhs: "2NH₃",
            rel: "equilibrium",
          },
          detail: {
            zh: "合成氨难在氮气的头一道关：N≡N 的三键要约 946 kJ/mol 才能断开，所以氮气在常温下几乎不与任何物质反应，人工固氮的全部难度都压在怎样让这对三键拆开上。反应本身放热（约 −92.4 kJ/mol）、气体分子数由 4 变 2，按平衡规律低温与高压都有利于氨的生成，可温度一低速率就慢得没有工业意义，于是条件必须四方折中：约 400 至 500 ℃、10 至 30 兆帕、铁触媒（加氧化钾与氧化铝作助剂与载体），并把生成的氨不断冷凝分离、把未反应的氮氢混合气打回合成塔循环（判据与推理见「化学平衡」与「影响速率的因素」）。压力也不能一味提高，再往上就撞上材料、能耗与安全三堵墙。原料一侧常被忽略：氢气来自天然气或煤与水蒸气的作用、氮气来自空气液化分离，混合气必须严格净化，一氧化碳与硫化物会让触媒中毒失去活性。工艺背后有两个人：哈伯解决了在高温下拿到可用平衡产率的化学问题，博施把它推成能承受高压、连续生产的工厂，因此合成氨在短短十几年里从论文走进产业。它的重要性怎么估都不过分——今天世界粮食产量中相当大一部分靠合成氮肥支撑；但过量氮肥随径流进水体又造成富营养化（见「水体富营养化与脱氮除磷」），这是同一项技术的两面。氨的下游不只是肥料：硝酸走氨氧化路线（见「氨氧化法制硝酸」），纯碱工业要消耗它（见「侯氏制碱法」），制冷剂与合成纤维也用到它。实验室与生产对氨的检验方式一致：氨是中学阶段唯一常见的碱性气体，遇湿润的红色石蕊试纸变蓝；把蘸过浓盐酸的玻璃棒靠近瓶口会有白烟，因为挥出的氯化氢与氨直接化合成氯化铵固体小颗粒（气体验满的一般规矩见「常见气体的检验与验满」）。顺带纠正两个高频错解：一是氨气溶于水导电所以氨是电解质——实际电离的是一水合氨，氨本身是非电解质；二是铵态氮肥不能与碱性的草木灰混用，否则放出氨气而损失氮素（原理见「盐类水解」）。",
            en: "The difficulty begins with the nitrogen molecule itself: the triple bond takes about 946 kJ per mole to break, so nitrogen is almost unreactive at room temperature and the whole problem of fixed nitrogen is how to open that bond. The reaction is exothermic, roughly -92.4 kJ per mole, and shrinks four gas molecules into two, so by equilibrium logic low temperature and high pressure both favour ammonia - yet cold also means a crawl, which forces a four-way compromise: about 400 to 500 degrees, 10 to 30 megapascal, an iron catalyst promoted with potassium and aluminium oxides, continuous condensation of the product, and recycling of the unreacted gas back through the converter. Pressure cannot simply be pushed higher either, because materials, energy cost and safety set the ceiling. The feedstock side is often skipped: hydrogen comes from steam acting on natural gas or coal, nitrogen from liquefied air, and the mixture must be purified scrupulously since carbon monoxide and sulfur compounds poison the catalyst. Two names stand behind the process: Haber settled the chemistry of getting a usable yield at high temperature, Bosch turned it into a plant that could survive pressure and run continuously, which is why the gap between paper and industry was only a decade or two. Its weight is hard to overstate - a large share of world food output rests on synthetic nitrogen - while the same fertiliser running off into rivers drives eutrophication, the other face of one technology. Ammonia feeds more than fertiliser: nitric acid by catalytic oxidation, soda manufacture as a consumer, refrigerants and synthetic fibres. Testing is the same in lab and plant because ammonia is the one common alkaline gas at this level, turning moist red litmus blue, and a rod dipped in concentrated hydrochloric acid produces white smoke as escaping hydrogen chloride combines directly with ammonia into solid ammonium chloride grains. Two frequent errors to fix: ammonia conducts when dissolved because the hydrate ionises, so ammonia itself is a non-electrolyte; and ammonium fertiliser must not be mixed with alkaline ash, since the base drives the nitrogen back off as ammonia gas.",
          },
          tags: [{ zh: "工业", en: "Industry" }],
        },
        {
          id: "eq-chloralkali",
          subs: [
            {
              f: "2NaCl",
              name: {
                zh: "氯化钠（饱和食盐水）",
                en: "Sodium chloride (brine)",
              },
              note: { zh: "原料。", en: "The feedstock." },
              role: "l",
            },
            {
              f: "2H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "参与电解。", en: "Participates in electrolysis." },
              role: "l",
            },
            {
              f: "2NaOH",
              name: {
                zh: "氢氧化钠（烧碱）",
                en: "Sodium hydroxide (caustic soda)",
              },
              note: { zh: "阴极区生成。", en: "Formed near the cathode." },
              role: "r",
            },
            {
              f: "H₂↑",
              name: { zh: "氢气", en: "Hydrogen gas" },
              note: {
                zh: "阴极产物，可燃。",
                en: "Cathode product; flammable.",
              },
              role: "r",
            },
            {
              f: "Cl₂↑",
              name: { zh: "氯气", en: "Chlorine gas" },
              note: {
                zh: "阳极产物，与 NaOH 反应制漂白液。",
                en: "Anode product; with NaOH makes bleach.",
              },
              role: "r",
            },
          ],
          icon: "🔌",
          term: { zh: "氯碱工业（电解食盐水）", en: "Chlor-Alkali" },
          level: 2,
          oneLiner: {
            zh: "电解饱和食盐水制取烧碱、氢气和氯气。",
            en: "Electrolysis of brine yields caustic soda, H₂ and Cl₂.",
          },
          eq: {
            lhs: "2NaCl + 2H₂O",
            cond: { zh: "通电", en: "electrolysis" },
            rhs: "2NaOH + H₂↑ + Cl₂↑",
          },
          detail: {
            zh: "这条反应的要点全在谁先放电：食盐水里有 Na⁺、H⁺（来自水）、Cl⁻、OH⁻ 四类离子，阳极上氯离子在浓度足够大时先于氢氧根失去电子变成氯气，阴极上氢离子比钠离子容易得多地得电子变成氢气，于是阴极区留下氢氧根与钠离子构成氢氧化钠；写离子方程式时钠离子并不参与反应，只是伴在溶液里。由此可推两条常见错误：一是电解食盐水能制得金属钠——水溶液里钠离子根本排不到氢前面放电，制金属钠必须电解熔融的氯化钠（这与电解熔融氧化铝炼铝同理，见「冰晶石熔盐电解炼铝」）；二是把阴极产物记成钠或三样金属，其实阴极放的是氢气。工业装置最要紧的部件是膜：氯气与氢氧化钠一旦接触就反应成氯化钠与次氯酸钠，既吃掉产品又让碱不纯（这条反应正是制漂白液的原理，见「漂白粉的制取与失效」），所以隔膜法要挡住两侧液体对流，离子交换膜法更进一步，只让钠离子从阳极室穿到阴极室，得到的烧碱浓度高而杂质少。电量与产物严格成比例：每通过 1 mol 电子生成 1 mol 氢氧化钠，同时只得 0.5 mol 氯气与 0.5 mol 氢气，这是电解算料的直接应用（见「法拉第电解定律」）。三种产物各有一条主用途链：氯气做漂白剂、聚氯乙烯、盐酸与饮用水消毒，氢气供合成氨与盐酸、也在炼油与新兴的氢能源里出现，烧碱用于造纸、纺织、肥皂与石油精炼——氯碱厂因此必须和上下游同址配套，因为氯气既难储存又不能让多余的部分积压。安全上有两条硬规矩：氯气有毒，尾气必须用碱液吸收而不是排空；氢气与氯气混合见光即爆炸，所以两极的气体绝不能混进同一根管，这也是膜的另一重作用。最后对照一下名字：氯碱工业与纯碱工业只差一字，前者用电解、产品是烧碱与氯气，后者不用电、产品是碳酸钠（见「侯氏制碱法」），两者在考题里常被故意混用。食盐水还要预先精制除去钙镁离子，否则它们在碱性的阴极区生成沉淀堵住膜，这与粗盐提纯的除杂顺序是同一件事的工程版本（方法选择见「分离与提纯的方法及仪器配套」）。",
            en: "Everything here turns on which ion discharges first. Brine carries Na+, H+ from the water, Cl- and OH-: at the anode chloride, being abundant, gives up electrons ahead of hydroxide and becomes chlorine, while at the cathode hydrogen is far easier to reduce than sodium, so hydrogen gas leaves and hydroxide accumulates with the sodium to form caustic soda; the sodium ion takes no part in the ionic equation, it merely stays companion in the solution. Two errors follow directly. Salt water cannot yield sodium metal, since sodium ion never ranks ahead of hydrogen in an aqueous cell - making the metal means electrolysing molten sodium chloride, just as aluminium needs a melt. And the cathode gives hydrogen, not sodium. The decisive hardware is the membrane: chlorine meeting sodium hydroxide reacts to chloride and hypochlorite, destroying product and fouling the alkali, which is exactly how bleach liquor is made, so diaphragm cells stop the two liquids streaming together and ion-exchange membranes go further, admitting only sodium ions from anode chamber to cathode chamber and giving a purer, more concentrated caustic. Charge and output are strictly proportional: one mole of electrons yields one mole of sodium hydroxide together with only half a mole of chlorine and half a mole of hydrogen, the working case for the laws of electrolysis. Each product has its own chain - chlorine into bleach, PVC, hydrochloric acid and water disinfection; hydrogen into ammonia synthesis, acid, refining and the emerging fuel use; caustic into paper, textiles, soap and petroleum treatment - which is why a chlor-alkali plant must sit beside its neighbours, since chlorine is awkward to store and a surplus cannot be banked. Two hard safety rules: the gas is toxic so vent streams go into alkali and never to air, and a mixture of hydrogen with chlorine explodes in light, so the two electrode gases must never share a line, which is a second job of the membrane. Beware the naming trap: the chlor-alkali industry is electrolytic and sells caustic with chlorine, while the soda-ash industry uses no electricity and sells sodium carbonate. Brine is also purified beforehand to strip calcium and magnesium, which would otherwise precipitate in the alkaline cathode region and blind the membrane - the industrial twin of the crude-salt purification sequence.",
          },
          tags: [{ zh: "电解", en: "Electrolysis" }],
        },
        {
          id: "eq-bleach",
          subs: [
            {
              f: "2Cl₂",
              name: { zh: "氯气", en: "Chlorine" },
              note: {
                zh: "与石灰乳反应制漂白粉。",
                en: "Reacted with lime milk to make bleaching powder.",
              },
              role: "l",
            },
            {
              f: "2Ca(OH)₂",
              name: {
                zh: "石灰乳（氢氧化钙）",
                en: "Lime milk (calcium hydroxide)",
              },
              note: { zh: "原料。", en: "The feedstock." },
              role: "l",
            },
            {
              f: "Ca(ClO)₂",
              name: { zh: "次氯酸钙", en: "Calcium hypochlorite" },
              note: {
                zh: "漂白粉的有效成分。",
                en: "The active component of bleaching powder.",
              },
              role: "r",
            },
            {
              f: "CaCl₂",
              name: { zh: "氯化钙", en: "Calcium chloride" },
              note: { zh: "副产物。", en: "By-product." },
              role: "r",
            },
            {
              f: "CO₂",
              name: { zh: "二氧化碳（空气）", en: "Carbon dioxide (air)" },
              note: {
                zh: "与次氯酸钙反应导致失效。",
                en: "Reacts with Ca(ClO)₂, causing spoilage.",
              },
              role: "l",
            },
            {
              f: "CaCO₃↓",
              name: {
                zh: "碳酸钙（白色沉淀）",
                en: "Calcium carbonate (white precipitate)",
              },
              note: {
                zh: "失效过程产物。",
                en: "Product of the spoilage reaction.",
              },
              role: "r",
            },
            {
              f: "2HClO",
              name: { zh: "次氯酸", en: "Hypochlorous acid" },
              note: {
                zh: "强氧化性，起漂白作用，也因此失效。",
                en: "Strong oxidizer; does the bleaching and hence the spoilage.",
              },
              role: "r",
            },
          ],
          icon: "🪣",
          term: { zh: "漂白粉的制取与失效", en: "Bleaching Powder" },
          level: 2,
          oneLiner: {
            zh: "氯气与石灰乳制漂白粉，失效是因与空气中 CO₂ 反应生成 HClO。",
            en: "Cl₂ with lime makes bleaching powder; it spoils by reacting with CO₂ to give HClO.",
          },
          eq: [
            { lhs: "2Cl₂ + 2Ca(OH)₂", rhs: "Ca(ClO)₂ + CaCl₂ + 2H₂O" },
            {
              lhs: "Ca(ClO)₂ + CO₂ + H₂O",
              rhs: "CaCO₃↓ + 2HClO",
            },
          ],
          detail: {
            zh: "制取时用石灰乳而不用澄清石灰水，理由很朴素：氢氧化钙微溶于水，石灰水里溶着的钙太少，通氯气只能得到极稀的溶液，产不出固体产品；把石灰制成糊状的乳才有足够的量（见「生石灰遇水」）。方程式里系数写成 2Cl₂ 与 2Ca(OH)₂，是因为产物侧同时有次氯酸钙与氯化钙，漂白粉就是这两者的混合物，其中真正有效的是次氯酸钙；把次氯酸钙提纯出来的产品有效氯更高，俗称漂粉精。第二件事是理解干燥的漂白粉不漂白：次氯酸钙本身没有漂白能力，它必须先从空气里接过二氧化碳与水，按强酸制弱酸的原理被碳酸置换出次氯酸（碳酸的酸性强于次氯酸，这也是二氧化碳通入次氯酸钙溶液会出碳酸钙沉淀的原因），而次氯酸有强氧化性，把有色物质的发色结构氧化破坏掉——所以这类漂白是氧化型、不可逆的，与二氧化硫的化合型漂白（生成不稳定的无色化合物、受热又复原）以及活性炭的吸附型漂白机理全不相同，三类在一道选择题里常被互换。失效是一条完整的链条：露置空气中先吸收二氧化碳与水生成次氯酸，次氯酸见光就分解为盐酸并放出氧气，生成的盐酸又与次氯酸钙反应放出氯气、把剩下的有效成分继续消耗掉，因此漂白粉必须密封、防潮、避光保存，久置后结块失效（存放通则见「药品的存放与容器选择」）。生活里最要命的一条是：含次氯酸钠的家用漂白液绝不能与洁厕灵这类酸性洗涤剂倒在一起，酸性条件下次氯酸根与氯离子发生归中反应直接生成氯气，在密闭的卫生间里放出的量足以伤人，这是氯化学里最实际的安全教训（见「氯及其化合物」）。游泳池与自来水消毒用的是同一原理——靠次氯酸或二氧化氯的氧化性杀菌（见「饮用水的净化与消毒」），但投加量必须控制，因为余氯过量同样刺激呼吸道并生成有机氯化物。最后两个小考点：漂白粉的有效成分是次氯酸钙而不是氯化钙，答混合物时也要指出有效者；检验一瓶漂白粉是否还有效，可取样加稀盐酸看是否放出黄绿色有刺激性气味的气体，但一定要在通风处做（气体的辨认见「常见气体的检验与验满」）。",
            en: "Lime milk rather than clear limewater is used for a plain reason: calcium hydroxide dissolves only sparingly, so limewater holds far too little calcium to give a solid product, whereas a suspended paste supplies plenty. The coefficients 2Cl₂ with 2Ca(OH)₂ appear because the product side carries both calcium hypochlorite and calcium chloride - bleaching powder is that mixture and only the hypochlorite is active, while the purified product has a higher available chlorine. The second point is that dry bleaching powder does not bleach: the hypochlorite salt has no power of itself, it must first take carbon dioxide and water from the air and be displaced by carbonic acid, since carbonic acid is the stronger of the two acids, which is also why passing dioxide through hypochlorite solution precipitates calcium carbonate. The hypochlorous acid released is a fierce oxidiser that destroys the colouring group outright, so this class of bleaching is oxidative and irreversible, quite unlike sulfur dioxide, which adds on to form a colourless compound that falls apart again on heating, and unlike charcoal, which merely adsorbs - the three mechanisms are a standing trap in multiple-choice sets. Failure is one chain: exposed powder absorbs dioxide and moisture, the hypochlorous acid produced breaks down in light to hydrochloric acid with oxygen, and that acid in turn attacks remaining hypochlorite to liberate chlorine, so the stuff must be kept sealed, dry and dark, and an open tin ends as a useless lump. The most dangerous household fact: a hypochlorite bleach must never be poured together with an acid toilet cleaner, because under acidic conditions hypochlorite and chloride meet in a comproportionation that gives chlorine gas straight away, and the amount released in a small closed bathroom is enough to injure - the plainest safety lesson in the chemistry of chlorine. Swimming pools and drinking water rely on the same oxidising action, though dosing is bounded because excess residual chlorine irritates airways and forms chlorinated organics too. Two small exam points: the active ingredient is calcium hypochlorite, not the chloride, and even when you correctly call the product a mixture you must name the active part; and to test whether a sample still works, add dilute hydrochloric acid and look for a pale yellow-green pungent gas, but do it where air is moving.",
          },
          tags: [{ zh: "工业", en: "Industry" }],
        },
        {
          id: "eq-iron",
          subs: [
            {
              f: "Fe₂O₃",
              name: {
                zh: "氧化铁（铁矿石主要成分）",
                en: "Iron(III) oxide (main ore component)",
              },
              note: { zh: "被还原。", en: "Is reduced." },
              role: "l",
            },
            {
              f: "3CO",
              name: { zh: "一氧化碳", en: "Carbon monoxide" },
              note: { zh: "还原剂。", en: "The reducing agent." },
              role: "l",
            },
            {
              f: "2Fe",
              name: { zh: "铁（生铁）", en: "Iron (pig iron)" },
              note: { zh: "冶炼目标产物。", en: "The smelting target." },
              role: "r",
            },
            {
              f: "3CO₂",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: { zh: "氧化产物。", en: "Oxidation product." },
              role: "r",
            },
          ],
          icon: "🏗️",
          term: { zh: "高炉炼铁", en: "Blast-Furnace Iron" },
          level: 1,
          oneLiner: {
            zh: "一氧化碳在高温下把氧化铁还原为铁。",
            en: "CO reduces iron oxide to iron at high temperature.",
          },
          eq: {
            lhs: "Fe₂O₃ + 3CO",
            cond: { zh: "高温", en: "high temp" },
            rhs: "2Fe + 3CO₂",
          },
          detail: {
            zh: "课本给的总式 Fe₂O₃ + 3CO 只是全炉的收支表，炉内实际是分区的三件事。先是焦炭在风口区燃烧放热，这是全炉热量的根；再是上升的二氧化碳越过炽热焦炭层被还原成一氧化碳（C + CO₂ 高温生成 2CO），所以真正的还原剂主要是一氧化碳，固体碳只负责发热和提供它；三是矿石下降、气体上升的逆流接触，让还原分步完成——氧化铁先失部分氧变成四氧化三铁、再成氧化亚铁、最后成金属铁，不同温度区看到的固体颜色与含氧量都不一样，中学只写最后一步的总式。造渣是第四个必要动作：矿石里带的二氧化硅（脉石）熔点极高、会结壳堵炉，所以要从炉顶配入石灰石，它受热分解出的氧化钙与二氧化硅化合成硅酸钙炉渣浮在铁水上，既带走杂质又保护炉缸（这类酸性氧化物遇碱性氧化物的结合与「玻璃、水泥与陶瓷」里的反应同类）。由此必然推出一个常被答错的事实：从炉底放出的是生铁而不是纯铁，含碳量约 2% 至 4.3%，还带硅锰磷硫等杂质，硬而脆、不能锻轧；要变成钢就得把碳降到约 0.03% 至 2%，方法是向熔融生铁里吹氧气，让碳与这些杂质依次氧化除去——所以炼铁是还原、炼钢是氧化这一句对仗值得直接记住（铁的两种价态互变很丰富，是氧化还原最好的例子之一，见「氧化还原反应」）。高炉也是环保账大户：每产一吨钢的二氧化碳排放在一到两吨量级，主要来自焦炭燃烧与碳酸盐分解，所以现代钢厂把高炉煤气（仍含大量一氧化碳）回收作燃料而不是排空，既节能又避免一氧化碳中毒风险；粉尘与二氧化硫则要走除尘与脱硫（见「酸雨与石灰石-石膏法脱硫」）。矿石一侧也要交代：赤铁矿（氧化铁）与磁铁矿（四氧化三铁）是主要来源，黄铁矿（硫化亚铁）含硫太高一般不用于炼铁而留给制硫酸（见「接触法制硫酸」）。最后与铝热反应对照：那是把还原在坩埚里一次做完、靠反应自身放热把铁熔成液流用来焊接钢轨，与高炉的连续逆流还原是两条完全不同的路（见「铝热反应」）；而铁被腐蚀回去的机理与「铁生锈（吸氧腐蚀）」构成一进一出的一对账。",
            en: "The single equation Fe₂O₃ + 3CO is only the furnace balance sheet; inside, three separate things happen by zone. First coke burns at the tuyeres, and that combustion is the source of all heat in the shaft. Second, the rising carbon dioxide is reduced back to carbon monoxide as it passes red-hot coke, so the working reductant is mainly carbon monoxide while the solid fuel exists to supply heat and that gas. Third, ore descends and gas ascends in counter-current, and reduction proceeds by stages - hematite loses part of its oxygen to magnetite, then to wüstite, then to metal, with different colours and oxygen content in different temperature bands, though school level writes only the last total. Slagging is the fourth necessary action: the silica gangue has a very high melting point and would crust the shaft, so limestone is charged from the top, and the calcium oxide it gives on heating combines with silica into a floating calcium silicate slag that carries the impurity out and protects the hearth - the same acid-oxide-meets-base-oxide pairing as in glass and cement. A frequently missed fact follows: what taps out is pig iron, not pure iron, holding roughly 2 to 4.3 percent carbon plus silicon, manganese, phosphorus and sulfur, hard, brittle and unforgeable; turning it to steel means driving the carbon down to somewhere between a few hundredths and two percent by blowing oxygen through the melt so that carbon and those impurities oxidise away in turn, which is why the couplet that making iron is reduction while making steel is oxidation is worth memorising as a line, and the two valences of iron make it a model case for redox. The blast furnace is also an environmental ledger: a tonne of steel carries on the order of one to two tonnes of carbon dioxide, mostly from burning coke and splitting carbonate, so modern plants recover the carbon-monoxide-rich furnace gas as fuel instead of venting it, saving energy and avoiding poisoning, while dust and sulfur dioxide go through cleaning and desulfurisation. The ore side deserves a word: hematite and magnetite are the main sources, whereas pyrite, being iron sulfide, is too high in sulfur for the furnace and is left to the acid plant. Finally compare the thermite reaction, where reduction is finished in one crucible and its own heat melts the iron into a stream used to weld rails - a completely different route from continuous counter-current reduction - while corrosion closes the ledger on the other side, rusting being the reverse transaction.",
          },
          tags: [{ zh: "工业", en: "Industry" }],
        },
        {
          id: "eq-thermite",
          subs: [
            {
              f: "2Al",
              name: { zh: "铝粉", en: "Aluminum powder" },
              note: {
                zh: "强还原剂，反应放出大量热。",
                en: "Strong reducer; the reaction releases intense heat.",
              },
              role: "l",
            },
            {
              f: "Fe₂O₃",
              name: { zh: "氧化铁", en: "Iron(III) oxide" },
              note: { zh: "被铝还原。", en: "Reduced by aluminum." },
              role: "l",
            },
            {
              f: "Al₂O₃",
              name: { zh: "氧化铝", en: "Aluminum oxide" },
              note: { zh: "反应生成。", en: "Formed in the reaction." },
              role: "r",
            },
            {
              f: "2Fe",
              name: { zh: "铁（熔融态）", en: "Iron (molten)" },
              note: {
                zh: "高温熔化流出，用于野外焊接钢轨。",
                en: "Molten iron runs out; used to weld rails on site.",
              },
              role: "r",
            },
          ],
          icon: "🚄",
          term: { zh: "铝热反应", en: "Thermite Reaction" },
          level: 2,
          oneLiner: {
            zh: "铝与氧化铁高温反应，置换出铁并放出大量热。",
            en: "Aluminum reduces iron oxide, yielding molten iron with intense heat.",
          },
          eq: {
            lhs: "2Al + Fe₂O₃",
            cond: { zh: "高温", en: "high temp" },
            rhs: "Al₂O₃ + 2Fe",
          },
          detail: {
            zh: "铝能把铁从氧化铁里打出来，靠的是铝对氧的亲和力更强：同样夺氧，铝变成氧化铝时放出的热多得多，所以这条置换在能量上极为有利。它不属于溶液里的那套规矩——按金属活动性顺序铝确实排在铁前面，但顺序表主要用来预判湿溶液里的置换，而铝表面永远罩着一层致密氧化膜，常温扔进铁盐溶液什么也看不出来；铝热反应走的是高温干法，用活动性来判断能不能反应、用温度来解释为什么平时不发生，两句话合起来才完整（顺序与规律见「金属活动性顺序」）。第二件事是它需要先高温引发、却能自己维持：氧化铁与铝粉按约三比一的质量比混匀，在混合物上方铺少量氯酸钾、插一段镁条后点燃，镁燃烧放的热把局部温度抬起来，主反应一旦开始就剧烈放热，不再需要外界供热，这正是放热反应自具特征的样子（判据见「放热与吸热反应」）。之所以放热这么多，除了铝的燃烧热大（见「燃烧热」），还因氧化铝中铝与氧结合很牢、晶格能高，生成物能量被压得很低，反应热与焓变的账因此非常可观（见「反应热与焓变」）。第三件事是产物的样子：生成的铁被熔成液流穿沙漏落入下面的容器，氧化铝熔渣密度小浮在上面，冷却后铁块在上层渣之下——不是浮在渣上，这个上下关系是实验报告的常错处。用途就长在这两点上：一是野外或无缝钢轨的焊接，不用电源、不用大型设备，一副药剂就能把钢轨接头熔成一整条；二是金属冶炼，活性排在碳与氢之后、又难用电解法经济获得的铬、锰、钒等金属常用铝热法还原，原理与铁置换硫酸铜那样的置换同类，只是介质从溶液换成了熔体（见「铁置换硫酸铜（湿法炼铜）」）。与安全相关的三条必须写清：反应温度可达两千摄氏度以上并喷出大量火星，必须远距离观察、隔护目镜、下方用干沙承接；不能用水去浇，因为高温下铁与铝都能与水作用放出氢气，反而扩大燃烧；氧化铁若换成四氧化三铁或改用镁粉，剧烈程度还会上升。最后把三条冶炼路线并排站一遍：不活泼的汞、银用热分解即可，铁、锌、铜用碳或一氧化碳还原（高炉就是这一档，见「高炉炼铁」），钾钙钠镁铝因太活泼只能电解（铝走冰晶石熔盐，见「冰晶石熔盐电解炼铝」）——选哪条路取决于金属在活动性顺序上的位置，而铝热反应恰好是拿铝的位次去换别人的位次。铁锈则是这本账的反面：铁在潮湿空气里被缓慢氧化回去，属吸氧腐蚀（见「铁生锈（吸氧腐蚀）」与「金属的腐蚀与防护」），一正一反说明同一氧化还原关系既可用来取铁也可被损耗掉（概念见「氧化还原反应」）。",
            en: "Aluminium can knock iron out of its oxide because aluminium holds oxygen far more tightly, and the extra heat released when it becomes alumina makes the displacement energetically generous. It does not obey the rules of solution chemistry: aluminium certainly stands above iron in the reactivity series, but that series is a guide to displacement in water, and aluminium carries an unbroken oxide skin which is why dropping it into an iron salt solution shows nothing. Thermite is the dry high temperature route, so activity says whether a reaction could go and temperature explains why it does not go at ordinary conditions (see The Reactivity Series of Metals). Second, it needs a violent start and then sustains itself: the oxide and aluminium powder are mixed roughly three to one, topped with a little potassium chlorate and a burning magnesium fuse, whose heat lifts the local temperature until the main reaction runs on its own exothermic supply - the signature of an exothermic change (see Exothermic & Endothermic). The heat is large both because aluminium has a high heat of combustion (see Heat of Combustion) and because alumina holds its lattice together so strongly that the products sit very low in energy, a handsome enthalpy balance (see Enthalpy Change). Third, note what comes out: the iron melts into a stream that falls through the sand while the lighter alumina slag floats above it, so the metal lies beneath the slag and not on top of it, a standing error in written reports. Both facts become uses. Rail joints are welded in the field with no power supply and no plant, simply by casting molten steel into the gap; and metals less eager for oxygen than aluminium yet awkward to plate out electrically - chromium, manganese, vanadium - are won by aluminothermic reduction, the same class of reaction as iron displacing copper from solution but with a melt instead of water (see Fe Displaces Cu). Three safety lines belong in any account: the charge reaches some two thousand degrees and throws showers of sparks, so one watches from distance through eye protection with dry sand beneath; water must never be used to quench it, since hot iron and aluminium both act on water and liberate hydrogen, feeding the fire; and replacing hematite with magnetite, or aluminium with magnesium, only makes it fiercer. Set the three smelting routes side by side: unreactive mercury and silver need only heat to decompose their ores, iron, zinc and copper are reduced by carbon or carbon monoxide, which is exactly what a blast furnace does, while potassium, calcium, sodium, magnesium and aluminium are too eager to be anything but electrolysed, aluminium coming from a cryolite melt (see Blast-Furnace Iron and Hall–Héroult Smelting of Aluminum). Which route applies follows from position in the series, and thermite is precisely a case of spending aluminium's position to buy someone else's. Rust closes the ledger in reverse, iron quietly re-oxidising in damp air by oxygen absorption, so the same redox relationship can be used to win metal and can quietly take it back (see Iron Rusting and Redox).",
          },
          tags: [{ zh: "工业", en: "Industry" }],
        },
        {
          id: "eq-ewaste-gold",
          subs: [
            {
              f: "Au",
              name: {
                zh: "金（镀金引脚、金手指、触点）",
                en: "Gold (plated pins, edge fingers, contacts)",
              },
              note: {
                zh: "空气中不氧化、也不溶于弱酸，只溶于强氧化—配位体系。",
                en: "Neither tarnishes in air nor dissolves in weak acids; needs an oxidizing complexing medium.",
              },
              role: "l",
            },
            {
              f: "HNO₃",
              name: { zh: "浓硝酸", en: "Concentrated nitric acid" },
              note: {
                zh: "氧化剂，把 Au 氧化为 Au(III)。",
                en: "The oxidizer, raising Au to Au(III).",
              },
              role: "l",
            },
            {
              f: "HCl",
              name: { zh: "浓盐酸", en: "Concentrated hydrochloric acid" },
              note: {
                zh: "提供 Cl⁻ 配体，稳定 [AuCl₄]⁻，使溶解得以持续。",
                en: "Supplies Cl⁻ ligands that stabilize [AuCl₄]⁻, driving dissolution on.",
              },
              role: "l",
            },
            {
              f: "HAuCl₄",
              name: { zh: "氯金酸", en: "Chloroauric acid" },
              note: {
                zh: "金进入溶液的形态，橙黄色，蒸干会分解。",
                en: "Dissolved gold, orange-yellow; decomposes on evaporation to dryness.",
              },
              role: "r",
            },
            {
              f: "NO↑",
              name: { zh: "一氧化氮", en: "Nitric oxide" },
              note: {
                zh: "遇空气即变红棕色 NO₂，须在通风橱内尾气吸收。",
                en: "Turns red-brown NO₂ in air; scrub it in a fume hood.",
              },
              role: "r",
            },
            {
              f: "Na₂S₂O₅",
              name: { zh: "焦亚硫酸钠", en: "Sodium metabisulfite" },
              note: {
                zh: "还原剂，S(+4) 被氧化为 S(+6)，把金沉回单质。",
                en: "Reducer; S(+4) to S(+6) drops gold back to the metal.",
              },
              role: "l",
            },
            {
              f: "Au↓",
              name: {
                zh: "金粉（棕色沉淀）",
                en: "Gold powder (brown precipitate)",
              },
              note: {
                zh: "沉出的粗金，须再熔炼或电解提纯才能得高纯金。",
                en: "Crude precipitate; smelting or electrolytic refining follows.",
              },
              role: "r",
            },
            {
              f: "Na₂B₄O₇",
              name: {
                zh: "硼砂（助熔剂）",
                en: "Borax (flux)",
              },
              note: {
                zh: "熔炼时造渣，带走铜、铁等残余杂质。",
                en: "Forms a slag in the melt, carrying off residual copper and iron.",
              },
              role: "c",
            },
          ],
          icon: "♻️",
          term: {
            zh: "电子废弃物提金（城市矿山）",
            en: "Gold Recovery from E-Waste",
          },
          level: 3,
          oneLiner: {
            zh: "富集镀金引脚与触点，用王水或氰化物溶出金，再还原沉出金粉、熔炼成锭。",
            en: "Concentrate gold-plated pins and contacts, dissolve the Au in aqua regia or cyanide, precipitate it and smelt a button.",
          },
          eq: [
            {
              lhs: "Au + HNO₃ + 4HCl",
              cond: { zh: "王水 V(HCl):V(HNO₃)=3:1", en: "aqua regia 3:1" },
              rhs: "HAuCl₄ + NO↑ + 2H₂O",
            },
            {
              lhs: "4Au + 8NaCN + O₂ + 2H₂O",
              cond: { zh: "氰化浸出·碱性（剧毒）", en: "cyanide leach, alkaline" },
              rhs: "4Na[Au(CN)₂] + 4NaOH",
            },
            {
              lhs: "4HAuCl₄ + 3Na₂S₂O₅ + 9H₂O",
              cond: { zh: "还原沉淀", en: "reduction" },
              rhs: "4Au↓ + 16HCl + 3Na₂SO₄ + 3H₂SO₄",
            },
            {
              lhs: "2HAuCl₄ + 3Cu",
              cond: { zh: "置换（简易法）", en: "cementation" },
              rhs: "2Au + 3CuCl₂ + 2HCl",
            },
          ],
          detail: {
            zh: "流程四步：拆解分选（取下 CPU 引脚、内存金手指、继电器触点，破碎后以磁选和涡电流富集）→ 浸出（把单质金转成可溶配合物）→ 还原沉淀（得棕色金粉）→ 酸洗烘干，配硼砂助熔在 1100 ℃ 以上熔炼铸锭；电解精炼可再提纯至 99.99%。品位上，一吨废旧电路板约含 80–300 g 金，天然金矿常只有 1–5 g/t，故称「城市矿山」。但金只是微米级镀层，且多为铜、银、钯综合回收的副产品，家庭「土法炼金」既危险又不划算：王水放出 NO₂ 与 Cl₂，氰化物微量即可致命，酸性废液会长期污染土壤与地下水，正规工厂须做尾气吸收与废液中和。",
            en: "Four steps: sorting (pull gold-plated CPU pins, memory edge fingers and relay contacts, crush, then concentrate magnetically and by eddy current) → leaching (convert metallic Au into a soluble complex) → reduction (brown gold powder precipitates) → acid-wash, dry and smelt above 1100 °C with borax flux to cast a button; electrolytic refining lifts purity to 99.99%. By grade a tonne of scrap circuit boards holds some 80–300 g of gold against 1–5 g/t in natural ore — hence 'urban mine'. Yet the gold is only a micrometre-scale plating and usually a by-product of recovering copper, silver and palladium, so backyard refining is both hazardous and uneconomic: aqua regia releases NO₂ and Cl₂, cyanide is lethal in traces, and acidic effluent poisons soil and groundwater for decades. Licensed plants scrub the off-gas and neutralize the liquor.",
          },
          tags: [
            { zh: "工业", en: "Industry" },
            { zh: "回收", en: "Recycling" },
            { zh: "氧化还原", en: "Redox" },
          ],
          figure: `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="20" font-size="12" fill="currentColor">电子废弃物提金四步 Four steps of gold recovery</text>
  <g stroke="currentColor" stroke-opacity="0.45" fill="none">
    <rect x="6" y="50" width="76" height="62" rx="6"/><rect x="94" y="50" width="76" height="62" rx="6"/>
    <rect x="182" y="50" width="76" height="62" rx="6"/><rect x="270" y="50" width="76" height="62" rx="6"/>
  </g>
  <g fill="currentColor" text-anchor="middle" font-size="10.5">
    <text x="44" y="70">① 拆解分选</text><text x="132" y="70">② 浸出</text>
    <text x="220" y="70">③ 还原沉淀</text><text x="308" y="70">④ 熔炼铸锭</text>
  </g>
  <g fill="currentColor" fill-opacity="0.6" text-anchor="middle" font-size="8">
    <text x="44" y="84">sort &amp; crush</text><text x="132" y="84">leach</text>
    <text x="220" y="84">precipitate</text><text x="308" y="84">smelt &amp; cast</text>
  </g>
  <g fill="#d4a017" text-anchor="middle" font-size="8.5">
    <text x="44" y="101">磁选·涡电流</text><text x="132" y="101">王水 / NaCN</text>
    <text x="220" y="101">Na₂S₂O₅ / Cu</text><text x="308" y="101">硼砂 &gt;1100 ℃</text>
  </g>
  <g fill="#d4a017">
    <polygon points="84,76 93,81 84,86"/><polygon points="172,76 181,81 172,86"/><polygon points="260,76 269,81 260,86"/>
  </g>
  <text x="6" y="136" font-size="10" fill="#d4a017">● 品位：电路板 80–300 g Au/t，金矿石仅 1–5 g/t</text>
  <text x="6" y="152" font-size="9.5" fill="currentColor" fill-opacity="0.7">Grade: boards 80–300 g Au per tonne vs ore 1–5 g/t</text>
  <text x="6" y="176" font-size="10" fill="#e5484d">⚠ NO₂ / Cl₂ 剧毒 · CN⁻ 微量致命 · 废液须中和</text>
  <text x="6" y="190" font-size="9.5" fill="#e5484d" fill-opacity="0.75">Toxic gases and cyanide; effluent must be treated</text>
</svg>`,
        },
        {
          id: "eq-ester",
          subs: [
            {
              f: "CH₃COOH",
              name: { zh: "乙酸（醋酸）", en: "Acetic acid" },
              note: {
                zh: "提供酰基，脱去 –OH。",
                en: "Supplies the acyl group, losing –OH.",
              },
              role: "l",
            },
            {
              f: "C₂H₅OH",
              name: { zh: "乙醇", en: "Ethanol" },
              note: {
                zh: "提供乙氧基，脱去 –H。",
                en: "Supplies the ethoxy group, losing –H.",
              },
              role: "l",
            },
            {
              f: "浓硫酸",
              name: { zh: "浓硫酸", en: "Concentrated sulfuric acid" },
              note: {
                zh: "催化剂兼吸水剂，促进平衡右移。",
                en: "Catalyst and water absorber, shifting equilibrium right.",
              },
              role: "c",
            },
            {
              f: "CH₃COOC₂H₅",
              name: { zh: "乙酸乙酯", en: "Ethyl acetate" },
              note: {
                zh: "有香味的酯，酒香/香精来源。",
                en: "Fragrant ester; source of fruity aromas.",
              },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "反应生成。", en: "Formed in the reaction." },
              role: "r",
            },
          ],
          icon: "🍶",
          term: { zh: "酯化反应", en: "Esterification" },
          level: 2,
          oneLiner: {
            zh: "乙酸与乙醇在浓硫酸催化下生成有香味的乙酸乙酯。",
            en: "Acetic acid and ethanol form fragrant ethyl acetate, catalyzed by conc. H₂SO₄.",
          },
          eq: {
            lhs: "CH₃COOH + C₂H₅OH",
            cond: { zh: "浓硫酸 · △", en: "conc. H₂SO₄, Δ" },
            rhs: "CH₃COOC₂H₅ + H₂O",
            rel: "equilibrium",
          },
          detail: {
            zh: "酯化最核心的一个问题是水里那个氧到底从哪来。规则是酸脱羟基、醇脱氢：乙酸拿出羧基上的 −OH，乙醇拿出羟基上的那个氢，两者合成水，剩下的乙酰基与乙氧基接成乙酸乙酯。这条规则不是背出来的，而是用同位素示踪验出来的——把乙醇里的氧换成¹⁸O 再做反应，¹⁸O 出现在酯里而不是水里，说明醇的碳氧键没有断、断的是氧氢键；反过来若酸脱氢、醇脱羟基，¹⁸O 就该落进水里。这个证据链是有机推断题最爱考的一处，也解释了为什么醇羟基里的氧会留在酯里。第二件事是浓硫酸的两个身份必须同时讲：它既作催化剂加快正逆两向的速率，又作吸水剂把体系里的水抢走，按平衡移动的规律使生成酯的方向占上风（见「勒夏特列原理」与「化学平衡状态」）；所以不能用稀硫酸，稀硫酸带进大量水，方向立刻反过来了。加热要缓和：温度过高乙醇与乙酸大量挥发、还会因浓硫酸的脱水作用碳化并产生二氧化硫等副产物，反而降低产率，所以实验用酒精灯缓慢加热。装置上两根细节常被漏掉：长玻璃导管的作用是冷凝回流兼导出蒸气，不是温度计；试管不能密封，否则蒸气压升高会把塞子顶开。收集这一手是全条最考人的部分——蒸气通入饱和碳酸钠溶液而不是水、也不是氢氧化钠，三个理由各管一个杂质：水层里的碳酸钠把混来的乙酸中和掉（放出气泡，乙酸的酸性强于碳酸，这也是食醋能溶解水垢的道理）、水本身把混来的乙醇溶走、而乙酸乙酯在盐溶液中溶解度更小因而分层，浮在上层并显出果香。若改用氢氧化钠，碱会把刚生成的酯又水解掉，等于白做；若只用清水，酯有一部分溶于水、分层也不清楚。由产物能推位置：乙酸乙酯不溶于水且密度比水小，所以在饱和碳酸钠溶液上层，说沉底必错。官能团一侧要认清楚：酯的结构是 −COO− 里的酯基，酯化属于取代反应而不是加成，也容易被误当成中和反应——虽然表面上是酸与碱式地相遇，但这里是有机酸与醇脱水成酯，产物不是盐（见「官能团」与「取代反应」）。顺带把边界划一下：醇与无机酸也能成酯，乙醇与硝酸生成的硝酸酯是炸药与血管扩张药，那类反应同样叫酯化却不局限于有机酸。酯是水果香味的来源，用作香精与溶剂；它的另一边就是水解，酸催化下可逆、碱催化下被中和成羧酸盐而趋于彻底，皂化正是碱催化水解的那一支（见「皂化反应（制肥皂）」）。工业上因这条反应可逆、单一转化率有限，常把便宜的一侧（乙醇）过量投入或及时蒸出酯与水共沸物来推动平衡，方法与索尔维法借溶解度分离是同一类思路（见「侯氏制碱法」）。",
            en: "The central question of esterification is where the oxygen in the water came from. The rule is that the acid sheds its hydroxyl and the alcohol sheds the hydrogen of its own hydroxyl: acetic acid gives up the -OH of the carboxyl group, ethanol gives up the hydroxyl hydrogen, the two make water, and the remaining acyl and ethoxy fragments join into the ester. The rule is not memorised but proved by isotopic tracing - label the alcohol's oxygen with the heavy isotope and it turns up in the ester and not in the water, so the carbon-oxygen bond of the alcohol stayed intact and the oxygen-hydrogen one broke; had the alcohol lost the hydroxyl instead, the label would have appeared in water. Second, concentrated sulfuric acid holds two offices at once: it catalyses both directions and it strips water from the mixture, which by equilibrium logic pushes the forward side harder (see Le Chatelier's Principle and Chemical Equilibrium). Dilute acid therefore cannot be used, since it pours water in and reverses the advantage. Heating must be gentle, because a hard boil drives off both ethanol and acid and the dehydrating acid chars organics and liberates sulfur dioxide, all of which cut the yield; hence the slow water-bath or small flame in the standard procedure. Two apparatus points are routinely missed: the long glass tube condenses and returns vapour while leading the rest out, and it is not a thermometer; and the tube must not be stoppered, since vapour pressure would blow the cork. The collection step is the hardest part of the whole entry - the vapour is passed into saturated sodium carbonate solution, not into water and not into sodium hydroxide, for three reasons each aimed at one impurity: carbonate neutralises the acid carried over and effervesces, since acetic acid is the stronger acid and the same reason vinegar dissolves scale; the water dissolves the ethanol that came across; and the ester is least soluble in brine, so it separates as an upper layer with a fruity smell. Sodium hydroxide would hydrolyse the ester you just made, plain water would dissolve part of it and give a blurred boundary. From the product one reads its position: the ester is insoluble and lighter than water, so it floats, and claiming it sinks is always wrong. On the functional group side, the ester linkage is the -COO- grouping, esterification is a substitution and not an addition, and it should not be confused with neutralisation, since the product is not a salt even though an acid is involved (see Functional Groups and Substitution). The boundary is worth drawing once: alcohols also form esters with inorganic acids, and the nitrate ester of ethanol is both an explosive and a vasodilator, a reaction still called esterification although no organic acid is present. Esters carry fruit aromas and serve as fragrances and solvents, and their reverse is hydrolysis - reversible under acid, driven to completion under base where the acid is mopped up as a salt, which is precisely the alkaline branch known as saponification (see Saponification). Industry copes with the poor single-pass conversion by dosing the cheaper side in excess or distilling the ester away as a boiling azeotrope, the same family of tricks as shifting a precipitation by solubility differences (see Hou's Process).",
          },
          tags: [{ zh: "有机", en: "Organic" }],
        },
        {
          id: "eq-ethanol-ox",
          subs: [
            {
              f: "2CH₃CH₂OH",
              name: { zh: "乙醇", en: "Ethanol" },
              note: { zh: "被氧化。", en: "Is oxidized." },
              role: "l",
            },
            {
              f: "O₂",
              name: { zh: "氧气", en: "Oxygen" },
              note: { zh: "氧化剂。", en: "The oxidizer." },
              role: "l",
            },
            {
              f: "Cu",
              name: { zh: "铜", en: "Copper" },
              note: { zh: "作催化剂。", en: "Serves as catalyst." },
              role: "c",
            },
            {
              f: "2CH₃CHO",
              name: { zh: "乙醛", en: "Acetaldehyde" },
              note: {
                zh: "氧化产物，有刺激性气味。",
                en: "Oxidation product; pungent odor.",
              },
              role: "r",
            },
            {
              f: "2H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "反应生成。", en: "Formed in the reaction." },
              role: "r",
            },
          ],
          icon: "🌡️",
          term: { zh: "乙醇的催化氧化", en: "Catalytic Oxidation of Ethanol" },
          level: 2,
          oneLiner: {
            zh: "乙醇在铜催化并加热下被氧化为乙醛。",
            en: "Ethanol is oxidized to acetaldehyde over copper with heating.",
          },
          eq: {
            lhs: "2CH₃CH₂OH + O₂",
            cond: { zh: "Cu · 加热", en: "Cu, Δ" },
            rhs: "2CH₃CHO + 2H₂O",
          },
          detail: {
            zh: "这条方程式把铜写在条件上而不是反应物里，理由是催化剂在总反应前后质量和化学性质不变，但机制上铜确实两步都参与了：先把铜丝灼热，表面生成黑色的氧化铜；趁热插入乙醇里，氧化铜把乙醇氧化成乙醛、自己被还原回红色的铜，于是铜丝在黑与红之间来回变，还能闻到刺激性的醛味，同时液体发热——说明这一向放热，热到撤走酒精灯后铜丝仍能保持红热、反应自己维持下去。把两步合写，氧化铜恰好一先一后抵消，铜就只剩下催化身份，这也是中学阶段理解条件上写催化剂的最好的一个例子（催化剂的定义与活化能见「催化剂」）。断键位置有硬规矩：脱去的是羟基上的氢和与羟基相连那个碳上的氢，所以能不能发生催化氧化、氧化到什么产物，全看这个碳上还有没有氢。伯醇有两个这样的氢，先得到乙醛类、继续氧化就成乙酸类；仲醇只有一个，只能得到酮；而叔丁醇这类羟基碳上没有氢的醇根本不能发生催化氧化——把一切醇都写成醛是这一条最典型的错解。方向是可以继续往前走的：乙醛含醛基，很容易被氧化成乙酸，所以敞口的酒会发酸，酿醋就是在乙醇已经生成之后再让醋酸菌接着氧化一轮；再往前，完全燃烧就只剩二氧化碳和水（见「甲烷燃烧」与「燃烧热」）。程度则要收住：常见的强氧化剂能一路把乙醇氧化到乙酸，酸性重铬酸钾由橙色变绿、酸性高锰酸钾褪色，都是同一类检验，交警的呼气酒精检测正是利用变色的定量版本，其中铬由 +6 降到 +3（价态变化是氧化还原的核心判据，见「氧化还原反应」与「氧化数」）。把乙醇与乙醛、乙酸的转化连成一串看，就是含氧有机物的主干：醇可以来自酯的水解、也可以回到酯（见「酯化反应」与「皂化反应（制肥皂）」），醛靠官能团 −CHO 识别，酸靠 −COOH 与酸性来认（见「官能团」）。乙酸这一站还须补三句实用账：它是弱酸但酸性强于碳酸，所以能与碳酸钠放出二氧化碳、与水垢反应，食醋除水垢、腌制防腐都是它的性质；工业大量制乙酸走甲醇羰基化，而不是靠酒氧化，因为后者产量与浓度都上不去。最后两处细节：铜在反应里也可能因烧结而表面积下降、或被硫化物毒化失去活性，所以催化剂要注意条件；另外该反应放热但需要预热才能起动，属典型的先给活化能再自持的氧化，与燃烧的区别在于氧化被控制在羟基碳上而不是全部烧成二氧化碳和水（见「燃烧与灭火」）。",
            en: "Copper sits above the arrow rather than among the reactants because a catalyst leaves an overall reaction unchanged in mass and chemical nature, yet mechanistically copper does all the work in two steps: heat the wire and its surface turns black with copper oxide; plunge it warm into ethanol and that oxide takes hydrogen out of the alcohol, becoming red metal again while the ethanol becomes aldehyde. The wire flickers between black and red, the liquid smells sharp, and it warms - the second step gives off enough heat that the wire stays red even after the lamp is withdrawn, which is how a catalysed oxidation sustains itself. Adding the two steps cancels the oxide, leaving copper with nothing but its catalytic identity, the clearest school-level picture of why a catalyst is written as a condition (see Catalyst). The bond-breaking rule is strict: what is removed is the hydroxyl hydrogen and the hydrogen on the very carbon that carries the hydroxyl, so whether this reaction happens at all, and what it gives, depends entirely on the hydrogens left on that carbon. A primary alcohol has two, so it yields an aldehyde and, if pushed, an acid; a secondary alcohol has one, so it can only reach a ketone; and a tertiary alcohol such as tert-butanol has none, so catalytic oxidation simply does not occur - writing every alcohol as an aldehyde is the classic error here. The direction can be carried further: aldehyde still holds the reactive -CHO group and is easily oxidised to acetic acid, which is why an open bottle of wine turns sharp, and vinegar making is exactly a second round of oxidation by bacteria after the alcohol has formed; further still, complete combustion leaves only dioxide and water (see Methane Combustion and Heat of Combustion). The extent must also be bounded: strong oxidisers run the alcohol all the way to the acid, acidified dichromate going from orange to green and permanganate losing its colour, both standing tests, and the breathalyser is the quantitative cousin of that colour change, with chromium falling from +6 to +3 - oxidation-state bookkeeping being the heart of redox (see Redox and Oxidation State). Read as a chain, alcohol, aldehyde and acid form the backbone of oxygen chemistry: the alcohol can come from ester hydrolysis and return to an ester (see Esterification and Saponification), the aldehyde is recognised by -CHO, the acid by -COOH and its acidity (see Functional Groups). The acid deserves three practical lines: it is weak but stronger than carbonic acid, so it effervesces with carbonate and dissolves scale, which is why vinegar cleans kettles and preserves food; industry makes it from carbon monoxide and methanol rather than by souring alcohol, since the biological route cannot reach either volume or concentration. Two last details: a copper catalyst can lose surface by sintering or be poisoned by sulfur, so conditions matter, and the reaction needs preheating before it runs on its own heat - a classic case of paying activation energy first, distinct from burning because oxidation is confined to one carbon instead of torching the whole molecule (see Combustion and Firefighting).",
          },
          tags: [{ zh: "有机", en: "Organic" }],
        },
        {
          id: "eq-photosyn",
          subs: [
            {
              f: "6CO₂",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: {
                zh: "原料，被固定。",
                en: "Feedstock; fixed into organic matter.",
              },
              role: "l",
            },
            {
              f: "6H₂O",
              name: { zh: "水", en: "Water" },
              note: {
                zh: "光解提供氢并放出氧。",
                en: "Photolysed to supply hydrogen and release oxygen.",
              },
              role: "l",
            },
            {
              f: "C₆H₁₂O₆",
              name: { zh: "葡萄糖", en: "Glucose" },
              note: {
                zh: "储存化学能的有机物。",
                en: "Energy-rich organic product.",
              },
              role: "r",
            },
            {
              f: "6O₂",
              name: { zh: "氧气", en: "Oxygen" },
              note: {
                zh: "地球氧气的主要来源。",
                en: "The main source of Earth's oxygen.",
              },
              role: "r",
            },
          ],
          icon: "🌿",
          term: { zh: "光合作用", en: "Photosynthesis" },
          level: 1,
          oneLiner: {
            zh: "绿色植物在光照与叶绿体下把 CO₂ 和水合成葡萄糖并放氧。",
            en: "Plants build glucose from CO₂ and water using light in chloroplasts, releasing O₂.",
          },
          eq: {
            lhs: "6CO₂ + 6H₂O",
            cond: { zh: "光照 · 叶绿体", en: "light, chloroplast" },
            rhs: "C₆H₁₂O₆ + 6O₂",
          },
          detail: {
            zh: "先把这条反应放进化学习惯的位置：它是把能量存起来的过程，与燃烧、呼吸恰好相反。燃烧与放热反应把化学能交给环境，而光合作用用光能把二氧化碳和水装配成葡萄糖，把能量锁进化学键里，因此它是典型的储能过程，也是把太阳能转成人类可用的化学能的主要通道（分类见「放热与吸热反应」）。配平本身就是一次质量守恒的演练：左六碳、右六碳，氢各十二、氧各十八，原子一个不多一个不少，这正是书写方程式必须逐项核对的道理（见「二氧化碳使石灰水变浑浊」等式同理）。第二件事是产物那条箭头上的氧来自哪里——它全部来自水，而不是二氧化碳。证据同样是同位素示踪：用含¹⁸O 的水培养植物，放出的氧气带¹⁸O；改用标记过的二氧化碳，¹⁸O 就留在糖里而氧气不带标记。机制上过程分两半：先是水在光下被拆开、放出氧气并把能量暂存成活跃的物质，然后是二氧化碳在酶的作用下被固定、还原成糖，所以二氧化碳是碳的来源、水是氧的来源，两者各管一头。第三件事是速率被三个因素分别管着：光强与二氧化碳浓度在低值时是限制因素、加到一定程度就饱和不再涨，温度则通过酶的活性起作用，有一条最适线、超过就下降，这与工业合成氨要在速率与平衡之间折中是同一类思路（见「影响速率的因素」与「化学平衡状态」）。农业上的应用直接接在这三个因素上：温室里补充二氧化碳气肥、阴天补光、白天升温而夜间降温以少耗掉白天存的糖，都是利用平衡与速率的差别来增产；而粮食储藏讲低温干燥低氧，目的都是压低呼吸消耗。第四件事把它接回无机与有机的界：葡萄糖是单糖，分子式 C₆H₁₂O₆；淀粉与纤维素是同由葡萄糖单元搭起来的多糖，所以严格说光合第一步产物是小分子的糖，再聚合成淀粉才在叶里存得住；糖类之所以一度叫碳水，是因为多数糖的氢氧之比恰是 2 比 1，但这个通式并不划界——甲醛符合而鼠李糖 C₆H₁₂O₅ 不符合，可见类别要靠结构而不是靠比值（见「糖类」）。碳循环的另一头要同时讲清：今天烧的煤、石油、天然气是古代生物质固定的碳，燃烧又把这份碳放回大气，而森林与海洋浮游植物承担了当代一半以上的固碳量，因此滥伐与增排是同一个账本的两端，现代技术还尝试把排放的二氧化碳捕集下来重新利用（见「煤的干馏、气化与液化」与「二氧化碳的捕集与资源化」）。最后一处高频错解：植物在白天既光合又呼吸，只是光合速率大于呼吸速率才对外放氧；夜里只呼吸不光合，所以卧室大量摆绿植并不划算——这条判断不需要任何新知识，只需要承认两个过程同时在跑。",
            en: "Place the reaction in the habits of chemistry first: it is a process that stores energy, the exact opposite of burning and of respiration. Combustion and exothermic change hand chemical energy to the surroundings, whereas photosynthesis uses light to assemble dioxide and water into glucose and locks that energy inside bonds, making it the standing example of an energy-storing change and the main gateway by which solar energy becomes chemically usable (see Exothermic & Endothermic). Balancing it is a drill in conservation of mass: six carbons each side, twelve hydrogens, eighteen oxygens, nothing added or lost, which is precisely why every equation must be checked term by term. The second point is where the released oxygen comes from - entirely from water, not from dioxide. The proof is isotopic again: grow a plant on water carrying the heavy oxygen isotope and the gas given off is labelled; switch the label to the dioxide and the label ends up in the sugar while the oxygen stays plain. Mechanically the process is in two halves, water split under light with oxygen released and energy briefly carried by reactive intermediates, then dioxide fixed and reduced to sugar by enzymes, so the dioxide supplies the carbon and the water supplies the oxygen, each governing one end. Third, the rate is watched over by three separate factors: light and dioxide concentration are limiting at low values and then plateau once saturated, while temperature acts through enzyme activity and has an optimum beyond which the rate falls - the same style of trade-off as an industrial synthesis balancing speed against yield (see Factors Affecting Rate and Chemical Equilibrium). Agriculture reads straight off those three: greenhouses enrich the air with dioxide, add light on dull days, keep days warm and nights cool so that less of the day's sugar is breathed away. The inorganic-to-organic border is the fourth point: glucose is a single-unit sugar, whereas starch and cellulose are built from many glucose units, so the direct product is small and only stores well after being assembled; sugars were once called hydrates of carbon because hydrogen and oxygen usually sit in a two-to-one ratio, but the formula draws no boundary - a simple aldehyde fits it and a deoxy sugar does not, so class comes from structure rather than arithmetic (see Carbohydrates). The other end of the cycle must be stated with it: the coal, oil and gas burnt today are carbon fixed by ancient biomass, released again on burning, while forests and ocean plankton carry more than half of current fixation, so felling and emitting are two entries in one ledger, and modern work tries to capture the emitted carbon dioxide and reuse it (see Coal Carbonization, Gasification and Liquefaction and Capturing and Reusing Carbon Dioxide). One last standing error: a green plant respires all day too, and only releases net oxygen while photosynthesis outruns respiration, at night it does the reverse, which is why a bedroom full of plants is not a good bargain - the judgement needs no new facts, only the admission that both processes run at once.",
          },
          tags: [{ zh: "生活", en: "Life" }],
        },
        {
          id: "eq-ferment",
          subs: [
            {
              f: "C₆H₁₂O₆",
              name: { zh: "葡萄糖", en: "Glucose" },
              note: { zh: "发酵底物。", en: "The fermentation substrate." },
              role: "l",
            },
            {
              f: "酶",
              name: { zh: "酒化酶", en: "Zymase" },
              note: { zh: "生物催化剂。", en: "A biological catalyst." },
              role: "c",
            },
            {
              f: "2C₂H₅OH",
              name: { zh: "乙醇（酒精）", en: "Ethanol (alcohol)" },
              note: {
                zh: "酿酒目标产物。",
                en: "The target product of brewing.",
              },
              role: "r",
            },
            {
              f: "2CO₂↑",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: {
                zh: "使面包/馒头膨松。",
                en: "Leavens bread and steamed buns.",
              },
              role: "r",
            },
          ],
          icon: "🍞",
          term: { zh: "酒精发酵", en: "Alcoholic Fermentation" },
          level: 1,
          oneLiner: {
            zh: "葡萄糖在酒化酶作用下分解为乙醇和二氧化碳。",
            en: "Glucose breaks into ethanol and CO₂ under the action of zymase.",
          },
          eq: {
            lhs: "C₆H₁₂O₆",
            cond: { zh: "酶", en: "enzyme" },
            rhs: "2C₂H₅OH + 2CO₂↑",
          },
          detail: {
            zh: "这条方程式最耐看的地方是化合价：葡萄糖中碳的平均氧化数是 0，而产物里乙醇的碳是负价、二氧化碳的碳是正价，也就是说同一批碳原子在这一步里既被氧化又被还原——发酵本质上是有机物自身的歧化，不需要外界氧化剂。这是从生活现象跳到氧化还原分析的极好一例，也解释了为什么发酵必须在缺氧条件下进行：一旦有氧，酵母就把糖彻底氧化成二氧化碳和水，能量全交给呼吸、酒精几乎不生成（价态判据见「氧化数」与「氧化还原反应」）。酵母因此是兼性的：有氧气时它靠彻底氧化大量繁殖、把糖当成燃料，缺氧气时改用发酵、把糖当成产物出口，所以酿酒与发面的工艺都要控制这一层——先给一点气让酵母繁殖起来，再密封把它逼进发酵，密封不严就既不长酒精又容易被杂菌接管。条件上还有两条硬边界：温度宜在二十多到三十度之间，过高酶失活、酵母被杀死，过低速率太慢，这与催化剂受温度影响的道理一致（见「催化剂」与「影响速率的因素」）；强酸强碱、杀菌物质与重金属都会让蛋白类酶变性失活，所以发酵容器要干净又不能残留消毒剂（酶与蛋白的性质见「蛋白质与氨基酸」）。原料一侧要补一步糖化：高粱、大米、薯类里存的是淀粉，淀粉先由麦芽或曲里的淀粉酶水解成葡萄糖，才能被酵母发酵，这就是酿酒先糖化后发酵的顺序，而纤维素虽也由葡萄糖单元组成，人却没有相应的酶，所以它不能作为人的能量来源，反刍动物则靠瘤胃里的微生物代劳。产物一侧连着三件生活事：面团里生成的二氧化碳受热膨胀，使馒头面包出现孔洞；二氧化碳通入澄清石灰水会变浑浊，这是辨认它的老办法（见「二氧化碳使石灰水变浑浊」与「常见气体的检验与验满」）；而酒精度十几度以后要提浓就得蒸馏，因为乙醇与水互溶、沸点差别被利用（分离方法见「分离与提纯的方法及仪器配套」）。蒸馏有个绕不过的坎：乙醇与水在约 95.6% 处形成共沸物，普通蒸馏再多次也得不到无水乙醇，工业上要先用生石灰把水吃掉再蒸，这与生石灰吸水放热的性质直接相关（见「生石灰遇水」）。失败的那一面同样有化学：密封不好时空气里的氧气会把已生成的乙醇继续氧化成乙酸，酒就变酸，酿醋正是利用这一步接着氧化（这条氧化路线见「乙醇的催化氧化」）。最后两处常考数字与常考错解：医用消毒用的乙醇浓度是体积分数约 75%，太浓会使菌体表面蛋白迅速凝固形成保护层、反而渗不进去，所以纯酒精消毒效果不如这个浓度；把乙醇掺入汽油作燃料是为了让燃烧更完全、减少一氧化碳，但它照样放出二氧化碳，属生物质能而非零碳（燃烧是否完全见「燃烧与灭火」）。凡把发酵写成分解反应或有氧氧化的，都可以用上面这条化合价账一次性判掉。",
            en: "The most rewarding thing about this equation is the oxidation bookkeeping: carbon averages zero in glucose, yet in the products it is negative in ethanol and positive in dioxide, which means the same batch of atoms is oxidised and reduced at once - fermentation is a disproportionation of an organic molecule needing no external oxidiser. That is the cleanest bridge from a kitchen observation to redox analysis, and it also explains why the vessel must be air-free: with oxygen present yeast simply burns the sugar to dioxide and water, giving energy and almost no alcohol (see Oxidation State and Redox). Yeast is therefore facultative, multiplying fast on full oxidation when air is available and switching to fermentation as an exit for the sugar when it is not, so both brewing and dough-making manage this layer - a little air first to raise the population, then a tight seal to force the fermentative branch, and a leaky seal yields neither alcohol nor protection from wild microbes. Two hard boundaries govern conditions: a temperature in the twenties to low thirties suits the enzymes, higher kills the yeast and denatures the protein, lower only slows everything, the same temperature logic that governs any catalyst (see Catalyst and Factors Affecting Rate); and strong acid, strong base, disinfectants or heavy metals all denature the protein catalysts, so vessels must be clean but free of sanitizer residue (see Proteins & Amino Acids). The raw material needs one step first: grain and potato store starch, which amylase from malt or qu must hydrolyse to glucose before yeast can act, hence the sequence saccharification then fermentation; cellulose is also built of glucose units yet humans lack the enzyme, so it is not an energy source for us, while ruminants borrow microbes in the rumen to do it. Three everyday facts hang off the products: the gas it gives puffs the dough into its holes; it turns clear limewater milky, the traditional identification (see CO₂ Turns Limewater Cloudy and Testing Gases and Proving a Jar Is Full); and raising the alcohol above a dozen degrees needs distillation, exploiting the different boiling points of a miscible pair (see Separation and Purification: Method Matched to Apparatus). Distillation meets a wall, since ethanol and water boil together at about 95.6 percent, so no number of ordinary runs gives absolute alcohol and the water must first be eaten by quicklime, which is exactly its affinity for water (see CaO + Water). Failure has chemistry too: with air leaking in, the alcohol already made is oxidised further to acetic acid and the wine sours, and vinegar making deliberately rides that second oxidation (see Catalytic Oxidation of Ethanol). Two final figures and their traps: the disinfecting strength is about 75 percent by volume, because stronger alcohol coagulates the surface proteins of a cell into a shield that keeps the rest out, so pure alcohol is worse than the diluted one; and burning ethanol blended into petrol gives a cleaner flame with less carbon monoxide yet still releases dioxide, making biomass fuel a partial answer rather than a zero-carbon one (see Combustion and Firefighting). Anyone who files fermentation under simple decomposition or under aerobic oxidation can be settled by the oxidation numbers above in a single stroke.",
          },
          tags: [{ zh: "生活", en: "Life" }],
        },
        {
          id: "eq-antacid",
          subs: [
            {
              f: "Al(OH)₃",
              name: { zh: "氢氧化铝", en: "Aluminum hydroxide" },
              note: {
                zh: "胃药（胃舒平）有效成分，中和胃酸。",
                en: "Active antacid; neutralizes stomach acid.",
              },
              role: "l",
            },
            {
              f: "NaHCO₃",
              name: {
                zh: "碳酸氢钠（小苏打）",
                en: "Sodium bicarbonate (baking soda)",
              },
              note: {
                zh: "也可中和胃酸，但会产气。",
                en: "Also neutralizes acid but releases gas.",
              },
              role: "l",
            },
            {
              f: "HCl",
              name: {
                zh: "盐酸（胃酸主要成分）",
                en: "Hydrochloric acid (stomach acid)",
              },
              note: { zh: "被中和的对象。", en: "The acid being neutralized." },
              role: "l",
            },
            {
              f: "AlCl₃",
              name: { zh: "氯化铝", en: "Aluminum chloride" },
              note: { zh: "中和产物。", en: "Neutralization product." },
              role: "r",
            },
            {
              f: "NaCl",
              name: { zh: "氯化钠", en: "Sodium chloride" },
              note: { zh: "中和产物。", en: "Neutralization product." },
              role: "r",
            },
            {
              f: "CO₂↑",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: {
                zh: "小苏打中和时产生，易腹胀者慎用。",
                en: "Given off by baking soda; can cause bloating.",
              },
              role: "r",
            },
          ],
          icon: "💊",
          term: { zh: "胃酸中和（胃药）", en: "Stomach-Acid Neutralization" },
          level: 1,
          oneLiner: {
            zh: "氢氧化铝（或碳酸氢钠）中和过多的胃酸。",
            en: "Aluminum hydroxide (or NaHCO₃) neutralizes excess stomach acid.",
          },
          eq: [
            { lhs: "Al(OH)₃ + 3HCl", rhs: "AlCl₃ + 3H₂O" },
            { lhs: "NaHCO₃ + HCl", rhs: "NaCl + H₂O + CO₂↑" },
          ],
          detail: {
            zh: "胃酸的主要成分是盐酸，质量分数只有约百分之零点几，但氢离子浓度高到 pH 常常在 1 上下，这是全身体液里最酸的部位，其功能是激活胃蛋白酶并溶解食物、同时把随食而入的大部分微生物杀掉（pH 的读法见「pH 与酸碱度」与「酸碱指示剂与 pH」）。酸分泌过多就会侵蚀黏膜形成溃疡，于是需要抗酸药，而抗酸药的选取只有两条标准：碱性不能太强以免伤组织，反应产物必须无害。第一条方程式用氢氧化铝，是因为它几乎不溶于水、只能以悬胶状态慢慢中和，起效慢却持久，胃里不会一下子变得很碱，因而不会引起酸的反射性大量再分泌；缺点是铝离子长期吸收与骨软化和记忆减退的担忧有关，现代配方常与氢氧化镁混用以减少铝的用量。这里要提醒一句氢氧化铝的身份：它是两性氢氧化物，既能溶于盐酸也能溶于氢氧化钠，所以它遇强碱并不安静（这一性质是「铝及其化合物」考查最密集处，也是判断氯化铝里加碱时沉淀先生成后又溶解的原因）。第二条方程式用碳酸氢钠，起效快、几秒内就放气泡，但正因放出二氧化碳会把胃内压顶高，溃疡明显者有加重甚至穿孔的风险，且它生成的钠离子与碳酸氢根被大量吸收后有使体液偏碱和反跳性泌酸的问题，肾功能不好者不宜长期服；小苏打溶于水只得弱碱性溶液，与胃酸反应是先按强酸制弱酸放出碳酸、碳酸立刻分解成水和二氧化碳，这一步必须写全，不能只写成中和出盐和水（规律见「酸碱盐的溶解性规律」与「复分解反应」）。另外两种常用药剂可以顺带对照：氧化镁与氢氧化镁中和量高、还兼致泻，碳酸钙中和时同样放出二氧化碳但能顺带补钙，而含铝制剂与柠檬汁、酸性饮料同服会增加铝的吸收，这是服药时真正要避开的搭配。药典里还有一类不是中和的胃药值得划清界线：胶体铋与硫糖铝靠形成保护膜覆盖溃疡面，西咪替丁与奥美拉唑靠抑制腺体分泌胃酸，前者属于保护、后者属于减产，都不属于化学中和，但考题里常与抗酸药混在一起判断（中和反应的定义与放热见「中和反应」与「中和热」）。四条中学级别的实用结论：一是抗酸药只是对症，长期靠它压症状会掩盖真正的病因，溃疡需要查幽门螺杆菌并规范用药；二是同服抗酸药会改变胃内 pH 而影响某些药物吸收，需错开时间；三是绝不能用氢氧化钠或纯碱这类强碱或腐蚀性的碱来中和胃酸，管子里的反应搬到胃里就是灼伤，而小苏打可以短期用也不能久服；四是家里厨房的应急办法是喝温水稀释而非继续进食刺激，出现黑便或剧痛应立即就医（安全操作的一般原则见「实验基本操作与事故处理」）。若把两种药剂的中和效率算一遍，就得到一条常见计算题：同质量下碳酸氢钠耗酸约每 84 克对应 1 摩尔氢离子、氢氧化铝每 78 克对应 3 摩尔，所以论单位质量的中和能力氢氧化铝明显占优，这正是它被广泛配入胃药的定量理由（物质的量换算见「物质的量与摩尔」）。",
            en: "Gastric acid is hydrochloric acid, present only at a fraction of a percent by mass yet strong enough that the pH often sits near 1, the most acidic fluid in the body, whose jobs are to activate digestive enzymes, dissolve food and kill most microbes carried in with it (see pH & Acidity and Indicators and pH). Excess secretion erodes the lining into ulcers, so antacids are taken, and the choice of one obeys just two criteria: the base must not be so strong that it damages tissue, and its products must be harmless. Aluminium hydroxide qualifies because it barely dissolves, neutralising only slowly from a fine suspension spread through the contents, so relief is gentle and prolonged and the stomach never swings alkaline enough to trigger rebound secretion; the drawback is concern over absorbed aluminium and bone and memory effects, which is why modern formulations blend it with magnesium hydroxide to cut the aluminium dose. A reminder about its identity: this hydroxide is amphoteric, dissolving in hydrochloric acid and in sodium hydroxide alike, so it is not quiet in strong base, and that single property is the most examined point in the chemistry of aluminium and the reason a precipitate forms and then redissolves when alkali is added to an aluminium salt (see Aluminium and Its Compounds). Sodium hydrogen carbonate in the second equation acts within seconds and fizzes, but the dioxide raises pressure inside the stomach, which is dangerous in a deep ulcer and can even perforate; the absorbed sodium and bicarbonate alkalinise the body fluids and provoke rebound acid, so long use is unsuitable when kidneys are weak. Writing it properly needs both stages, since a stronger acid liberates a weaker one which then breaks into water and dioxide, and simply calling it a neutralisation to salt and water loses the gas (see Solubility Rules for Acids, Bases and Salts and Double Replacement). Two further agents are worth the comparison: magnesium oxide and hydroxide neutralise a great deal and also act as laxatives, calcium carbonate releases dioxide too but supplies calcium, and aluminium preparations taken with citrus or acidic drinks increase aluminium uptake, the one pairing genuinely worth avoiding. A whole family of stomach medicines is not neutralisation at all and should be separated cleanly: colloidal bismuth and sucralfate lay a protective film over the ulcer, while histamine blockers and proton pump inhibitors cut the secretion itself, so one protects and the other stops production, neither neutralises, though exam sets mix them with antacids (see Neutralization and Heat of Neutralization). Four school-level conclusions follow. An antacid treats symptoms and can mask the real cause, so a genuine ulcer needs proper diagnosis and therapy; antacids shift gastric pH and can alter the absorption of other drugs, so doses should be spaced; never use sodium hydroxide or washing soda against stomach acid, since a reaction acceptable in a test tube is a burn in a person, and even bicarbonate is for short use only; and the sensible home response is warm water to dilute rather than more irritating food, with black stool or severe pain meaning immediate medical care (see Bench Technique and First Moves After an Accident). A quick calculation settles a common question: a gram of bicarbonate binds about one mole of hydrogen per 84 grams while a gram of aluminium hydroxide manages three per 78, so weight for weight the hydroxide is far the better antacid, which is the quantitative reason it dominates formulations (see Mole & Avogadro's Number).",
          },
          tags: [{ zh: "生活", en: "Life" }],
        },
      ],
    },
    /* ===================== 化学与工程 ===================== */
    {
      key: "chem-industry",
      icon: "⚙️",
      title: { zh: "化学与工程", en: "Chemical Engineering" },
      items: [
        {
          id: "ind-si",
          subs: [
            {
              f: "SiO₂",
              name: { zh: "二氧化硅（石英砂）", en: "Silicon dioxide (quartz sand)" },
              note: { zh: "原料，来源是沙子与石英。", en: "The feedstock, from sand and quartz." },
              role: "l",
            },
            {
              f: "C",
              name: { zh: "焦炭", en: "Coke" },
              note: { zh: "还原剂，自己被氧化成 CO。", en: "Reducer; itself oxidized to CO." },
              role: "l",
            },
            {
              f: "Si",
              name: { zh: "硅（粗硅 → 高纯硅）", en: "Silicon (metallurgical → solar grade)" },
              note: {
                zh: "第一步只得 98~99% 粗硅，第三步才沉积出高纯硅。",
                en: "Step one gives only 98–99% crude; step three deposits pure Si.",
              },
              role: "r",
            },
            {
              f: "CO↑",
              name: { zh: "一氧化碳", en: "Carbon monoxide" },
              note: { zh: "电弧炉尾气，可燃、有毒。", en: "Toxic, flammable off-gas of the furnace." },
              role: "r",
            },
            {
              f: "HCl",
              name: { zh: "氯化氢", en: "Hydrogen chloride" },
              note: { zh: "第二步消耗、第三步再生，可循环利用。", en: "Used in step two, regenerated in step three; recycled." },
              role: "l",
            },
            {
              f: "SiHCl₃",
              name: { zh: "三氯氢硅", en: "Trichlorosilane" },
              note: { zh: "液态中间体，蒸馏即可除去硼、磷等杂质。", en: "Liquid intermediate; distillation strips boron and phosphorus." },
              role: "r",
            },
            {
              f: "H₂",
              name: { zh: "氢气", en: "Hydrogen" },
              note: { zh: "还原剂，把硅从 SiHCl₃ 里重新放出来。", en: "Reducer that frees silicon again from SiHCl₃." },
              role: "l",
            },
          ],
          icon: "🖥️",
          term: { zh: "粗硅提纯与半导体级硅", en: "Purifying Silicon for Chips" },
          level: 3,
          oneLiner: {
            zh: "石英砂用焦炭还原得粗硅，转成三氯氢硅蒸馏后再氢还原，区熔得 9N 高纯硅。",
            en: "Coke reduces quartz to crude Si; convert it to SiHCl₃, distill, reduce with H₂, then zone-refine to 9N.",
          },
          eq: [
            {
              lhs: "SiO₂ + 2C",
              cond: { zh: "电弧炉 高温", en: "arc furnace" },
              rhs: "Si + 2CO↑",
            },
            {
              lhs: "Si + 3HCl",
              cond: { zh: "250~300 ℃·铜催化", en: "250–300 °C, Cu catalyst" },
              rhs: "SiHCl₃ + H₂",
            },
            {
              lhs: "SiHCl₃ + H₂",
              cond: { zh: "1100 ℃ 化学气相沉积", en: "1100 °C vapor deposition" },
              rhs: "Si + 3HCl",
            },
          ],
          detail: {
            zh: "三步提纯：石英砂与焦炭在电弧炉约 2000 ℃ 还原得冶金级粗硅；粗硅与 HCl 在铜催化下生成液态的三氯氢硅，蒸馏除去硼、磷等杂质；再用氢气在高温下还原，硅沉积在硅芯上，经区熔或直拉法制成单晶硅锭，纯度可达 99.9999999%（9N）。芯片用硅要求极高，因为痕量的硼、磷就会显著改变导电性——这也是废旧芯片值得回收提金的前提。首步其实是碳从二氧化硅中夺氧的还原——SiO₂ + 2C 在高温下生成 Si 与 CO↑，硅的氧化数由 +4 降到 0，是典型的「氧化还原反应」。",
            en: "Three steps: quartz sand plus coke in an arc furnace near 2000 °C gives metallurgical-grade silicon; it reacts with HCl over a copper catalyst to form liquid trichlorosilane, which is distilled to strip boron and phosphorus; hydrogen then reduces it back to silicon deposited on seeds, and zone refining or the Czochralski pull yields an ingot up to 99.9999999% (9N). Chip-grade silicon must be that pure because traces of boron or phosphorus already shift conductivity — which is exactly why scrap chips are worth reprocessing. The first step is really carbon stripping oxygen from silica: SiO₂ + 2C gives Si + CO↑ at furnace heat, with silicon dropping from +4 to 0 — a textbook redox (see Redox).",
          },
          tags: [
            { zh: "工业", en: "Industry" },
            { zh: "材料", en: "Materials" },
            { zh: "半导体", en: "Semiconductor" },
          ],
          figure: `<svg viewBox="0 0 360 190" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="20" font-size="12" fill="currentColor">硅提纯三步 Three steps of silicon purification</text>
  <g stroke="currentColor" stroke-opacity="0.45" fill="none">
    <rect x="6" y="44" width="96" height="56" rx="6"/><rect x="132" y="44" width="96" height="56" rx="6"/><rect x="258" y="44" width="96" height="56" rx="6"/>
  </g>
  <g fill="currentColor" text-anchor="middle" font-size="10.5">
    <text x="54" y="64">① 电弧炉还原</text><text x="180" y="64">② 氯化·蒸馏</text><text x="306" y="64">③ 氢还原沉积</text>
  </g>
  <g fill="currentColor" fill-opacity="0.6" text-anchor="middle" font-size="8">
    <text x="54" y="78">arc furnace</text><text x="180" y="78">chlorinate &amp; distill</text><text x="306" y="78">reduce with H₂</text>
  </g>
  <g fill="#d4a017" text-anchor="middle" font-size="9">
    <text x="54" y="94">石英砂 → 粗硅</text><text x="180" y="94">→ SiHCl₃</text><text x="306" y="94">→ 高纯硅 9N</text>
  </g>
  <g fill="#d4a017">
    <polygon points="104,68 128,72 104,76"/><polygon points="230,68 254,72 230,76"/>
  </g>
  <path d="M306 100 V128 H54 V104" fill="none" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="4 3"/>
  <polygon points="50,110 58,110 54,102" fill="currentColor" fill-opacity="0.5"/>
  <text x="180" y="142" text-anchor="middle" font-size="9" fill="currentColor" fill-opacity="0.7">HCl 循环回收 HCl recovered</text>
  <text x="6" y="168" font-size="10" fill="#d4a017">● 痕量硼、磷就会改变导电性，芯片硅需 9N</text>
  <text x="6" y="182" font-size="8.5" fill="#d4a017" fill-opacity="0.7">Trace boron or phosphorus alone flips conductivity; chip-grade silicon needs 9N</text>
</svg>`,
        },
        {
          id: "ind-h2so4",
          subs: [
            {
              f: "4FeS₂",
              name: { zh: "硫铁矿（黄铁矿）", en: "Pyrite" },
              note: { zh: "廉价硫源，在沸腾炉中焙烧。", en: "Cheap sulfur source, roasted in a fluidized bed." },
              role: "l",
            },
            {
              f: "O₂",
              name: { zh: "氧气（空气）", en: "Oxygen (air)" },
              note: { zh: "两步都要用空气提供。", en: "Supplied as air in two of the steps." },
              role: "l",
            },
            {
              f: "Fe₂O₃",
              name: { zh: "氧化铁（炉渣）", en: "Iron(III) oxide (slag)" },
              note: { zh: "炉渣可返作炼铁原料或制水泥。", en: "Slag goes back to ironmaking or cement." },
              role: "r",
            },
            {
              f: "SO₂",
              name: { zh: "二氧化硫", en: "Sulfur dioxide" },
              note: { zh: "中间产物，也是酸雨主因，尾气须回收。", en: "Intermediate; also the acid-rain gas, so off-gas is scrubbed." },
              role: "r",
            },
            {
              f: "SO₃",
              name: { zh: "三氧化硫", en: "Sulfur trioxide" },
              note: { zh: "催化氧化的产物，不能直接用水吸收。", en: "From catalytic oxidation; must not be absorbed by water directly." },
              role: "r",
            },
            {
              f: "V₂O₅",
              name: { zh: "五氧化二钒（催化剂）", en: "Vanadium(V) oxide (catalyst)" },
              note: { zh: "加快平衡到达，不改变平衡位置。", en: "Speeds up reaching equilibrium; shifts nothing." },
              role: "c",
            },
            {
              f: "H₂S₂O₇",
              name: { zh: "发烟硫酸", en: "Oleum" },
              note: { zh: "SO₃ 溶于 98.3% 浓硫酸的产物。", en: "SO₃ dissolved in 98.3% sulfuric acid." },
              role: "r",
            },
            {
              f: "H₂SO₄",
              name: { zh: "硫酸", en: "Sulfuric acid" },
              note: { zh: "既是吸收剂又是最终产品，稀释后出厂。", en: "Both absorbent and final product, diluted before shipping." },
              role: "r",
            },
          ],
          icon: "⚗️",
          term: { zh: "接触法制硫酸", en: "Contact Process for Sulfuric Acid" },
          level: 3,
          oneLiner: {
            zh: "焙烧得 SO₂，V₂O₅ 催化氧化成 SO₃，再用 98.3% 浓硫酸吸收后稀释。",
            en: "Roast to SO₂, oxidize over V₂O₅ to SO₃, absorb in 98.3% acid, then dilute.",
          },
          eq: [
            {
              lhs: "4FeS₂ + 11O₂",
              cond: { zh: "沸腾炉 焙烧", en: "fluidized-bed roasting" },
              rhs: "2Fe₂O₃ + 8SO₂↑",
            },
            {
              lhs: "2SO₂ + O₂",
              cond: { zh: "V₂O₅·450 ℃（可逆放热）", en: "V₂O₅, 450 °C (reversible, exothermic)" },
              rhs: "2SO₃",
              rel: "equilibrium",
            },
            {
              lhs: "SO₃ + H₂SO₄",
              cond: { zh: "吸收塔 98.3% 酸", en: "absorbed in 98.3% acid" },
              rhs: "H₂S₂O₇",
            },
            {
              lhs: "H₂S₂O₇ + H₂O",
              rhs: "2H₂SO₄",
            },
          ],
          detail: {
            zh: "三步：焙烧、催化氧化、吸收。SO₂ 氧化为 SO₃ 时气体分子数减小且放热，理论上低温加压有利，但低温下 V₂O₅ 活性不足，所以取 400~500 ℃、常压这个折中点。SO₃ 不直接溶于水，否则形成雾状硫酸难以沉降且腐蚀设备，工业用 98.3% 浓硫酸吸收。硫酸的产量长期被当作工业化的指标：化肥、石油精炼、冶金、蓄电池、洗涤剂全部依赖它。尾气中的 SO₂ 用氨法吸收制取硫酸铵，既省原料又防酸雨。",
            en: "Three stages: roasting, catalytic oxidation, absorption. Oxidizing SO₂ shrinks gas volume and gives off heat, so low temperature and high pressure favour it in theory — but V₂O₅ is inactive when cold, so plants compromise at 400–500 °C and near ambient pressure. SO₃ is never absorbed in water directly, which would make a mist of sulfuric acid that will not settle and eats the equipment; 98.3% acid does the absorbing. Sulfuric acid output has long been read as a proxy for industrialization: fertilizer, refining, metallurgy, batteries and detergents all depend on it. Off-gas SO₂ is scrubbed with ammonia to give ammonium sulfate, saving feedstock and preventing acid rain.",
          },
          tags: [
            { zh: "工业", en: "Industry" },
            { zh: "化工流程", en: "Process" },
            { zh: "平衡", en: "Equilibrium" },
          ],
          figure: `<svg viewBox="0 0 360 190" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="20" font-size="12" fill="currentColor">接触法制硫酸 Three towers of the contact process</text>
  <g stroke="currentColor" stroke-opacity="0.45" fill="none">
    <rect x="6" y="44" width="96" height="56" rx="6"/><rect x="132" y="44" width="96" height="56" rx="6"/><rect x="258" y="44" width="96" height="56" rx="6"/>
  </g>
  <g fill="currentColor" text-anchor="middle" font-size="10.5">
    <text x="54" y="64">① 沸腾炉</text><text x="180" y="64">② 接触室</text><text x="306" y="64">③ 吸收塔</text>
  </g>
  <g fill="currentColor" fill-opacity="0.6" text-anchor="middle" font-size="8">
    <text x="54" y="78">roasting</text><text x="180" y="78">catalytic bed</text><text x="306" y="78">absorption</text>
  </g>
  <g fill="#d4a017" text-anchor="middle" font-size="9">
    <text x="54" y="94">黄铁矿 → SO₂</text><text x="180" y="94">V₂O₅ 450 ℃ → SO₃</text><text x="306" y="94">98.3% 酸吸收</text>
  </g>
  <g fill="#d4a017">
    <polygon points="104,68 128,72 104,76"/><polygon points="230,68 254,72 230,76"/>
  </g>
  <text x="6" y="124" font-size="9.5" fill="currentColor" fill-opacity="0.7">炉渣 Fe₂O₃ → 返作炼铁原料　尾气 SO₂ → 氨法吸收</text>
  <text x="6" y="136" font-size="8.5" fill="currentColor" fill-opacity="0.6">Slag Fe₂O₃ goes back to the blast furnace; tail-gas SO₂ is scrubbed with ammonia</text>
  <text x="6" y="156" font-size="10" fill="#d4a017">● 不直接加水吸收：会形成难沉降的酸雾</text>
  <text x="6" y="168" font-size="9.5" fill="#d4a017" fill-opacity="0.7">No direct water absorption — it makes an un-settleable acid mist</text>
</svg>`,
        },
        {
          id: "ind-hno3",
          subs: [
            {
              f: "NH₃",
              name: { zh: "氨", en: "Ammonia" },
              note: { zh: "由合成氨装置直接供料，两大工艺链相接。", en: "Fed straight from the ammonia plant; two process chains meet." },
              role: "l",
            },
            {
              f: "O₂",
              name: { zh: "氧气（过量空气）", en: "Oxygen (excess air)" },
              note: { zh: "氧化剂，吸收塔还要再通一次。", en: "Oxidizer; passed in again in the absorber." },
              role: "l",
            },
            {
              f: "Pt-Rh",
              name: { zh: "铂铑合金网（催化剂）", en: "Platinum-rhodium gauze (catalyst)" },
              note: { zh: "极贵且易中砷、铅中毒，需净制原料气。", en: "Costly and easily poisoned by arsenic or lead; gas must be cleaned." },
              role: "c",
            },
            {
              f: "NO",
              name: { zh: "一氧化氮", en: "Nitric oxide" },
              note: { zh: "无色，出装置即变红棕；水中吸收时又会逸出循环。", en: "Colourless, browns on escape; recirculates from the water absorption." },
              role: "r",
            },
            {
              f: "NO₂",
              name: { zh: "二氧化氮", en: "Nitrogen dioxide" },
              note: { zh: "红棕色有毒气体，被水与氧吸收成酸。", en: "Red-brown toxic gas, absorbed by water and oxygen into acid." },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "吸收塔的液相，也是副产蒸汽的来源。", en: "The absorber's liquid phase; also raises steam from the heat." },
              role: "l",
            },
            {
              f: "HNO₃",
              name: { zh: "硝酸", en: "Nitric acid" },
              note: { zh: "产品，约 50~68%，可再浓缩。", en: "Product, about 50–68%; can be concentrated further." },
              role: "r",
            },
          ],
          icon: "💥",
          term: { zh: "氨氧化法制硝酸", en: "Ostwald Process for Nitric Acid" },
          level: 3,
          oneLiner: {
            zh: "氨在铂铑网上催化氧化成 NO，再氧化为 NO₂，在过量空气下用水吸收成硝酸。",
            en: "Ammonia burns to NO over Pt-Rh gauze, oxidizes to NO₂, and is absorbed with excess air into nitric acid.",
          },
          eq: [
            {
              lhs: "4NH₃ + 5O₂",
              cond: { zh: "Pt-Rh 网·800 ℃", en: "Pt-Rh gauze, 800 °C" },
              rhs: "4NO + 6H₂O",
            },
            {
              lhs: "2NO + O₂",
              cond: { zh: "冷却后自动进行", en: "spontaneous on cooling" },
              rhs: "2NO₂",
            },
            {
              lhs: "3NO₂ + H₂O",
              cond: { zh: "吸收塔", en: "absorber" },
              rhs: "2HNO₃ + NO",
            },
            {
              lhs: "4NO₂ + O₂ + 2H₂O",
              cond: { zh: "过量空气下总结果", en: "overall with excess air" },
              rhs: "4HNO₃",
            },
          ],
          detail: {
            zh: "奥斯特瓦尔德法。氨氧化在约 800 ℃ 的铂铑网上瞬时完成且放热，反应热可维持自身温度，但必须防止砷、铅使催化剂中毒。NO 遇空气即变红棕色 NO₂；用水吸收时每 3 个 NO₂ 只有 2 个成酸、另 1 个回到 NO，所以工业上在吸收塔里大量通空气把 NO 反复氧化吸收，总结果相当于第四式。主要用途是硝酸铵与硝基化肥、炸药，以及尼龙的中间体己二酸；浓硝酸还用于金属钝化与蚀刻。尾气中的 NOx 用碱液或催化还原除去。",
            en: "The Ostwald process. Ammonia oxidation runs instantaneously on Pt-Rh gauze at about 800 °C and gives off enough heat to sustain itself, but arsenic and lead must be kept out or the catalyst dies. NO browns to NO₂ in air; water absorption turns only 2 of every 3 NO₂ into acid and sends 1 back to NO, so plants flood the absorber with air to re-oxidize and re-absorb it, which is what the fourth line summarizes. Uses: ammonium nitrate and nitrogen fertilizer, explosives, adipic acid for nylon; concentrated acid also passivates and etches metals. Tail-gas NOx is removed with alkali or catalytic reduction.",
          },
          tags: [
            { zh: "工业", en: "Industry" },
            { zh: "化工流程", en: "Process" },
            { zh: "氮", en: "Nitrogen" },
          ],
        },
        {
          id: "ind-al",
          subs: [
            {
              f: "Al₂O₃",
              name: { zh: "氧化铝（自铝土矿提纯）", en: "Alumina (refined from bauxite)" },
              note: { zh: "原料，需先用氢氧化钠溶出重结晶（拜耳法）。", en: "Feedstock, first dissolved in NaOH and recrystallized (Bayer process)." },
              role: "l",
            },
            {
              f: "Na₃AlF₆",
              name: { zh: "冰晶石（熔剂）", en: "Cryolite (solvent)" },
              note: { zh: "把电解温度从 2050 ℃ 降到约 960 ℃。", en: "Drops the operating temperature from 2050 °C to about 960 °C." },
              role: "c",
            },
            {
              f: "C",
              name: { zh: "碳素阳极", en: "Carbon anode" },
              note: { zh: "参与反应被消耗，需定期更换。", en: "Consumed by the oxygen it meets; replaced regularly." },
              role: "l",
            },
            {
              f: "Al",
              name: { zh: "铝液", en: "Molten aluminum" },
              note: { zh: "密度大于电解质，沉在槽底定期抽出。", en: "Denser than the bath, so it pools at the bottom and is tapped." },
              role: "r",
            },
            {
              f: "O₂↑",
              name: { zh: "氧气", en: "Oxygen" },
              note: { zh: "阳极产物，随即与碳块反应。", en: "Anode product, which attacks the carbon immediately." },
              role: "r",
            },
            {
              f: "CO₂↑",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: { zh: "阳极消耗的真实产物，也是碳排放主项。", en: "The real anode output, and the plant's main emission." },
              role: "r",
            },
          ],
          icon: "🛩️",
          term: { zh: "冰晶石熔盐电解炼铝", en: "Hall–Héroult Smelting of Aluminum" },
          level: 2,
          oneLiner: {
            zh: "氧化铝溶进熔融冰晶石，在 960 ℃ 电解即可得铝，远低于直接熔化所需的 2050 ℃。",
            en: "Alumina dissolved in molten cryolite electrolyzes at 960 °C — far below its 2050 °C melting point.",
          },
          eq: [
            {
              lhs: "2Al₂O₃",
              cond: { zh: "通电·冰晶石熔盐 960 ℃", en: "electrolysis in cryolite, 960 °C" },
              rhs: "4Al + 3O₂↑",
            },
            {
              lhs: "C + O₂",
              cond: { zh: "阳极高温", en: "hot anode" },
              rhs: "CO₂↑",
            },
            {
              lhs: "2Al₂O₃ + 3C",
              cond: { zh: "总结果（阳极被消耗）", en: "overall, anode consumed" },
              rhs: "4Al + 3CO₂↑",
            },
          ],
          detail: {
            zh: "氧化铝熔点高达 2050 ℃，直接熔化电解既耗能又损毁内衬；溶入冰晶石 Na₃AlF₆ 后在 950~980 ℃ 就能通电分解，这是 Hall–Héroult 法的核心。阳极产生的氧会把碳块烧成 CO₂，所以阳极要不断补充，电耗与阳极材料占了成本大头——而回收一吨再生铝只需原铝约 5% 的能量。上游的拜耳法用浓 NaOH 溶出铝土矿中的 Al₂O₃，杂质作为红色赤泥排出，堆存是铝工业的主要环境负担。",
            en: "Alumina melts at 2050 °C, too hot to electrolyze directly without wrecking the lining; dissolved in cryolite (Na₃AlF₆) it breaks down at 950–980 °C, which is the core of the Hall–Héroult process. The oxygen liberated burns the carbon anode to CO₂, so anodes are eaten away and must be replaced — power and anodes dominate the cost, which is why recycling a tonne of aluminum takes only about 5% of the energy of primary metal. Upstream, the Bayer process leaches the ore with concentrated NaOH and discards the impurities as red mud, the industry's main waste burden.",
          },
          tags: [
            { zh: "工业", en: "Industry" },
            { zh: "电化学", en: "Electrochemistry" },
            { zh: "金属", en: "Metals" },
          ],
        },
        {
          id: "ind-cu-refine",
          subs: [
            {
              f: "Cu",
              name: { zh: "粗铜（作阳极）", en: "Blister copper (the anode)" },
              note: { zh: "火法炼出的约 99%，含 Fe、Zn、Ni、Au、Ag 等杂质。", en: "About 99% from smelting, holding Fe, Zn, Ni, Au and Ag." },
              role: "l",
            },
            {
              f: "Cu²⁺",
              name: { zh: "铜离子（电解液）", en: "Copper(II) ions (electrolyte)" },
              note: { zh: "阳极溶入、阴极析出，溶液浓度基本不变。", en: "Enters at the anode, leaves at the cathode; strength stays steady." },
              role: "r",
            },
            {
              f: "e⁻",
              name: { zh: "电子（外电路）", en: "Electrons (external circuit)" },
              note: { zh: "阳极失电子溶解，阴极得电子析出。", en: "Given up as the anode dissolves, taken up as copper plates out." },
              role: "c",
            },
            {
              f: "Cu",
              name: { zh: "电解铜（阴极析出，99.95%+）", en: "Cathode copper (electrolytic, 99.95%+)" },
              note: { zh: "纯度达 99.95% 以上，导电用铜必须到这个级别。", en: "99.95%+; conducting copper has to reach this grade." },
              role: "r",
            },
            {
              f: "Zn²⁺",
              name: { zh: "锌离子（进入溶液）", en: "Zinc ions (stay in solution)" },
              note: { zh: "比铜活泼的杂质同溶但不析出，靠电位控制。", en: "More active impurities dissolve but will not plate out at this potential." },
              role: "r",
            },
            {
              f: "Au·Ag·Pt",
              name: { zh: "阳极泥（金、银与铂族）", en: "Anode slime (gold, silver, PGMs)" },
              note: { zh: "比铜惰性的金属不溶解，脱落沉入槽底。", en: "Metals less active than copper never dissolve; they drop to the cell bottom." },
              role: "r",
            },
          ],
          icon: "🔌",
          term: { zh: "铜的电解精炼与阳极泥", en: "Electrorefining Copper and the Anode Slime" },
          level: 2,
          oneLiner: {
            zh: "粗铜作阳极溶解、纯铜在阴极析出，不溶的金银铂族沉入槽底成为阳极泥。",
            en: "The anode dissolves and pure copper plates out; insoluble Au, Ag and PGMs fall as anode slime.",
          },
          eq: [
            {
              lhs: "Cu − 2e⁻",
              cond: { zh: "阳极（粗铜溶解）", en: "anode, dissolving" },
              rhs: "Cu²⁺",
              rel: "equal",
            },
            {
              lhs: "Cu²⁺ + 2e⁻",
              cond: { zh: "阴极（纯铜析出）", en: "cathode, plating" },
              rhs: "Cu",
              rel: "equal",
            },
            {
              lhs: "Zn − 2e⁻",
              cond: { zh: "活泼杂质同溶不析", en: "active impurities co-dissolve" },
              rhs: "Zn²⁺",
              rel: "equal",
            },
          ],
          detail: {
            zh: "火法炼出的铜约 99%，而导电用铜要求 99.95% 以上，靠电解精炼完成：粗铜作阳极、纯铜片作阴极、硫酸酸化的 CuSO₄ 溶液作电解液。通电后阳极上的铜溶解，在阴极按电位控制重新析出，比铜活泼的 Fe、Zn、Ni 虽一同进入溶液却不达析出电位，留在液里；比铜惰性的金、银和铂族金属根本不能溶解，只能从阳极脱落沉底，这就是阳极泥。它是冶炼厂提炼金银与铂族元素的主要原料，也是重要副产品收入。与电子废弃物提金相比，阳极泥里的金是火法富集的“顺带”产物，品位高且无需王水。",
            en: "Smelted copper is about 99% pure, but conducting copper needs 99.95%+, so it is electrorefined: blister copper as anode, a pure-copper sheet as cathode, acidified CuSO₄ solution as electrolyte. Copper dissolves off the anode and plates back under potential control; more active Fe, Zn and Ni enter the solution but never reach their deposition potential and stay there, while gold, silver and the platinum group cannot dissolve at all — they simply fall from the anode as slime. That slime is the chief feedstock for refining precious metals and a major by-product credit for the smelter. Unlike e-waste gold recovery, the gold in anode slime has already been concentrated by fire, at high grade and with no aqua regia involved.",
          },
          tags: [
            { zh: "工业", en: "Industry" },
            { zh: "电化学", en: "Electrochemistry" },
            { zh: "金属回收", en: "Recycling" },
          ],
        },
        {
          id: "ind-bromine",
          subs: [
            {
              f: "Cl₂",
              name: { zh: "氯气（氧化剂）", en: "Chlorine (the oxidizer)" },
              note: { zh: "活泼性 Br₂ < Cl₂，所以氯能把溴置换出来。", en: "Chlorine is the stronger oxidizer, so it displaces bromine." },
              role: "l",
            },
            {
              f: "Br⁻",
              name: { zh: "溴离子（苦卤中）", en: "Bromide (in bittern)" },
              note: { zh: "海水中约 65 mg/L，晒盐母液被浓缩一个量级以上。", en: "About 65 mg/L in seawater, over ten times richer in the salt-pan mother liquor." },
              role: "l",
            },
            {
              f: "Br₂",
              name: { zh: "溴单质", en: "Bromine" },
              note: { zh: "唯一常温下为液态的非金属单质，易挥发、强腐蚀。", en: "The only liquid nonmetal at room temperature; volatile and corrosive." },
              role: "r",
            },
            {
              f: "Cl⁻",
              name: { zh: "氯离子", en: "Chloride" },
              note: { zh: "氯气被还原后的产物，留在卤水中。", en: "What chlorine becomes; stays in the liquor." },
              role: "r",
            },
            {
              f: "SO₂",
              name: { zh: "二氧化硫（吸收剂）", en: "Sulfur dioxide (absorbent)" },
              note: { zh: "把吹出的 Br₂ 还原成 HBr 溶于水，实现富集。", en: "Reduces the blown-out Br₂ to soluble HBr, concentrating it." },
              role: "l",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "吸收塔的溶剂，也参与反应。", en: "The absorbing medium and a reactant." },
              role: "l",
            },
            {
              f: "HBr",
              name: { zh: "氢溴酸", en: "Hydrobromic acid" },
              note: { zh: "富集后的中间形态，再氯化即得高纯溴。", en: "The concentrated intermediate; re-chlorination yields pure bromine." },
              role: "r",
            },
            {
              f: "H₂SO₄",
              name: { zh: "硫酸", en: "Sulfuric acid" },
              note: { zh: "SO₂ 被溴氧化的产物。", en: "What SO₂ is oxidized to during absorption." },
              role: "r",
            },
            {
              f: "HCl",
              name: { zh: "盐酸", en: "Hydrochloric acid" },
              note: { zh: "再氯化时的副产酸，可回用于酸化。", en: "By-product acid, reusable for acidifying the feed." },
              role: "r",
            },
          ],
          icon: "🌊",
          term: { zh: "海水提溴（空气吹出法）", en: "Extracting Bromine from Seawater" },
          level: 2,
          oneLiner: {
            zh: "氯气氧化苦卤中的溴离子，热空气吹出溴，SO₂ 吸收富集后再氯化。",
            en: "Chlorinate bromide in bittern, blow the bromine out with air, absorb it in SO₂ to concentrate, then chlorinate again.",
          },
          eq: [
            {
              lhs: "Cl₂ + 2Br⁻",
              cond: { zh: "酸化后通氯", en: "acidified, then chlorinated" },
              rhs: "2Cl⁻ + Br₂",
            },
            {
              lhs: "Br₂ + SO₂ + 2H₂O",
              cond: { zh: "吸收塔", en: "absorption tower" },
              rhs: "2HBr + H₂SO₄",
            },
            {
              lhs: "Cl₂ + 2HBr",
              cond: { zh: "再氯化", en: "re-chlorination" },
              rhs: "2HCl + Br₂",
            },
          ],
          detail: {
            zh: "海水中溴只有约 65 mg/L，直接提取不划算；工业上取晒盐后的苦卤，先酸化再通氯把 Br⁻ 氧化成 Br₂，用热空气或水蒸气把 Br₂ 吹出，以 SO₂ 水溶液吸收转成 HBr 富集，最后再氯化得到商品溴。整套氧化—吹出—吸收—再氧化的本质是反复浓缩。溴主要用于阻燃剂、感光材料 AgBr、医药与农药，也用作油田完井液 CaBr₂。氯能把溴从其盐里置换出来（Cl₂ + 2Br⁻ 生成 2Cl⁻ + Br₂），靠的是氯的氧化性强于溴，正落在「氧化还原反应」的强弱判据里。",
            en: "Seawater holds only about 65 mg/L of bromine — too dilute to work on directly. Industry takes the bittern left after solar salt: acidify, chlorinate the Br⁻ to Br₂, strip the bromine out with hot air or steam, absorb it in aqueous SO₂ to concentrate it as HBr, then chlorinate once more to sellable bromine. The whole oxidize–blow-out–absorb–re-oxidize loop is repeated concentration. Bromine goes mainly into flame retardants, photographic AgBr, pharmaceuticals and pesticides, plus calcium bromide completion fluids in oil wells. Chlorine displaces bromine from its salts (Cl₂ + 2Br⁻ gives 2Cl⁻ + Br₂) because chlorine is the stronger oxidizer, the very strength ranking behind redox (see Redox).",
          },
          tags: [
            { zh: "工业", en: "Industry" },
            { zh: "海水资源", en: "Marine Resources" },
            { zh: "非金属", en: "Nonmetals" },
          ],
          figure: `<svg viewBox="0 0 360 190" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="20" font-size="12" fill="currentColor">海水提溴三步 Three steps of bromine extraction</text>
  <g stroke="currentColor" stroke-opacity="0.45" fill="none">
    <rect x="6" y="44" width="96" height="56" rx="6"/><rect x="132" y="44" width="96" height="56" rx="6"/><rect x="258" y="44" width="96" height="56" rx="6"/>
  </g>
  <g fill="currentColor" text-anchor="middle" font-size="10.5">
    <text x="54" y="64">① 氯化</text><text x="180" y="64">② 吹出</text><text x="306" y="64">③ 吸收·再氯化</text>
  </g>
  <g fill="currentColor" fill-opacity="0.6" text-anchor="middle" font-size="8">
    <text x="54" y="78">chlorinate</text><text x="180" y="78">air blow-out</text><text x="306" y="78">absorb &amp; recover</text>
  </g>
  <g fill="#d4a017" text-anchor="middle" font-size="9">
    <text x="54" y="94">苦卤 + Cl₂</text><text x="180" y="94">Br₂ 随空气逸出</text><text x="306" y="94">SO₂ → HBr</text>
  </g>
  <g fill="#d4a017">
    <polygon points="104,68 128,72 104,76"/><polygon points="230,68 254,72 230,76"/>
  </g>
  <text x="6" y="126" font-size="9.5" fill="currentColor" fill-opacity="0.7">海水 65 mg/L → 苦卤富集 → 商品溴 Seawater 65 mg/L, concentrated in bittern</text>
  <text x="6" y="152" font-size="10" fill="#e5484d">⚠ Br₂ 强腐蚀易挥发 · Cl₂ 有毒：密闭操作并吸收尾气</text>
  <text x="6" y="166" font-size="9.5" fill="#e5484d" fill-opacity="0.75">Volatile, corrosive bromine and toxic chlorine: closed handling, scrub the vent</text>
</svg>`,
        },
        {
          id: "ind-magnesium",
          subs: [
            {
              f: "CaCO₃",
              name: { zh: "石灰石（或贝壳）", en: "Limestone (or shells)" },
              note: { zh: "煅烧后提供沉淀剂，海边贝壳就是现成原料。", en: "Calcined to give the precipitant; seashells serve as the feedstock." },
              role: "l",
            },
            {
              f: "CaO",
              name: { zh: "生石灰", en: "Quicklime" },
              note: { zh: "消化成石灰乳后使用。", en: "Slaked to milk of lime before dosing." },
              role: "r",
            },
            {
              f: "CO₂↑",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: { zh: "煅烧石灰石的副产气。", en: "Off-gas from calcining the limestone." },
              role: "r",
            },
            {
              f: "MgCl₂",
              name: { zh: "氯化镁（苦卤中）", en: "Magnesium chloride (in bittern)" },
              note: { zh: "海水蒸发浓缩后的镁存留形态，海水中镁约 1.3 g/L。", en: "How the magnesium sits once seawater is concentrated; about 1.3 g/L in the sea." },
              role: "l",
            },
            {
              f: "Ca(OH)₂",
              name: { zh: "石灰乳", en: "Milk of lime" },
              note: { zh: "廉价碱，把镁沉淀下来而不引入新杂质。", en: "A cheap base that drops the magnesium without new impurities." },
              role: "l",
            },
            {
              f: "Mg(OH)₂↓",
              name: { zh: "氢氧化镁沉淀", en: "Magnesium hydroxide precipitate" },
              note: { zh: "溶解度极小，是富集镁的关键一步。", en: "Barely soluble — the concentration step." },
              role: "r",
            },
            {
              f: "CaCl₂",
              name: { zh: "氯化钙", en: "Calcium chloride" },
              note: { zh: "滤液成分，可作融雪剂与干燥剂。", en: "Stays in the filtrate; useful as de-icer and desiccant." },
              role: "r",
            },
            {
              f: "HCl",
              name: { zh: "盐酸", en: "Hydrochloric acid" },
              note: { zh: "把沉淀重新溶解为氯化镁。", en: "Redissolves the precipitate as the chloride." },
              role: "l",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "中和产物；脱水环节必须在 HCl 气氛中抑制水解。", en: "Neutralization product; drying must run in HCl to stop hydrolysis." },
              role: "r",
            },
            {
              f: "Mg",
              name: { zh: "金属镁", en: "Magnesium metal" },
              note: { zh: "轻合金与烟花照明弹的原料，燃烧发耀眼白光。", en: "For light alloys and flares; burns with a dazzling white flame." },
              role: "r",
            },
            {
              f: "Cl₂↑",
              name: { zh: "氯气（副产）", en: "Chlorine (by-product)" },
              note: { zh: "电解副产，回收后用于制盐酸循环使用。", en: "Recovered from the cell and burned back into the HCl loop." },
              role: "r",
            },
          ],
          icon: "🛩️",
          term: { zh: "海水提镁（沉淀—酸化—电解）", en: "Extracting Magnesium from Seawater" },
          level: 2,
          oneLiner: {
            zh: "石灰乳把苦卤中的镁沉淀为 Mg(OH)₂，盐酸溶解后电解熔融氯化镁。",
            en: "Precipitate magnesium as hydroxide with milk of lime, redissolve in HCl, then electrolyze the molten chloride.",
          },
          eq: [
            {
              lhs: "CaCO₃",
              cond: { zh: "高温 煅烧", en: "calcination" },
              rhs: "CaO + CO₂↑",
            },
            {
              lhs: "MgCl₂ + Ca(OH)₂",
              cond: { zh: "沉淀", en: "precipitation" },
              rhs: "Mg(OH)₂↓ + CaCl₂",
            },
            {
              lhs: "Mg(OH)₂ + 2HCl",
              cond: { zh: "溶解", en: "dissolution" },
              rhs: "MgCl₂ + 2H₂O",
            },
            {
              lhs: "MgCl₂",
              cond: { zh: "通电·熔融", en: "electrolysis, molten" },
              rhs: "Mg + Cl₂↑",
            },
          ],
          detail: {
            zh: "镁是海水中第二多的金属离子，约 1.3 g/L。工艺先煅烧石灰石或贝壳得到 CaO，消化成石灰乳加入苦卤，生成溶解度极小的 Mg(OH)₂；过滤后用盐酸溶解、蒸发结晶，再在 HCl 气氛中脱水得到无水氯化镁，最后电解熔融盐制得金属镁。注意：直接加热 MgCl₂·6H₂O 会因水解而得到 MgO，拿不到无水盐。镁合金轻而强度高，用于航空与汽车；MgO 是优质耐火材料。镁很活泼，只能靠电解熔融 MgCl₂ 冶炼、无法从水溶液里电积出来，这与钠、铝同走电解熔盐一路（见「金属活动性顺序」）。",
            en: "Magnesium is the second most abundant metal ion in seawater, about 1.3 g/L. The route calcines limestone or shells to CaO, slakes it into milk of lime and drops nearly insoluble Mg(OH)₂ from the bittern; the solid is redissolved in hydrochloric acid, evaporated, then dried in an HCl atmosphere to give anhydrous MgCl₂, which is electrolyzed as a melt. The catch: heating MgCl₂·6H₂O outright just hydrolyses it to MgO. Magnesium alloys are light and strong for aircraft and cars, and MgO is a top-grade refractory. Magnesium is reactive enough that it must be won by electrolysing molten MgCl₂ and cannot be plated from solution, the same molten-salt route as sodium and aluminium (see The Reactivity Series of Metals).",
          },
          tags: [
            { zh: "工业", en: "Industry" },
            { zh: "海水资源", en: "Marine Resources" },
            { zh: "金属", en: "Metals" },
          ],
        },
        {
          id: "ind-petroleum",
          subs: [
            {
              f: "C₁₆H₃₄",
              name: { zh: "十六烷（重油代表物）", en: "Hexadecane (heavy-oil stand-in)" },
              note: { zh: "沸点高、不能直接当汽油用的长链烷烃。", en: "A long-chain alkane too high-boiling to go straight into petrol." },
              role: "l",
            },
            {
              f: "C₈H₁₈",
              name: { zh: "辛烷（汽油组分）", en: "Octane (gasoline range)" },
              note: { zh: "裂化的目标产物；其异构体异辛烷定辛烷值为 100。", en: "The target of cracking; its isomer is set at octane number 100." },
              role: "r",
            },
            {
              f: "C₈H₁₆",
              name: { zh: "辛烯", en: "Octene" },
              note: { zh: "裂化同时生成的烯烃，含它越多裂化汽油越易氧化变质。", en: "The alkene co-product; more of it makes cracked gasoline age faster." },
              role: "r",
            },
            {
              f: "C₂H₆",
              name: { zh: "乙烷", en: "Ethane" },
              note: { zh: "天然气与炼厂气的主要成分，裂解最便宜的原料。", en: "From natural gas and refinery gas — the cheapest cracker feed." },
              role: "l",
            },
            {
              f: "C₂H₄",
              name: { zh: "乙烯", en: "Ethylene" },
              note: { zh: "产量常被视为衡量石油化工发展水平的标志。", en: "Its output is a standing yardstick of a country's petrochemical industry." },
              role: "r",
            },
            {
              f: "H₂",
              name: { zh: "氢气", en: "Hydrogen" },
              note: { zh: "裂解副产，也大量用于炼油加氢。", en: "A cracker by-product, and a major refinery consumable." },
              role: "r",
            },
            {
              f: "O₂",
              name: { zh: "氧气（空气）", en: "Oxygen (air)" },
              note: { zh: "燃烧必需；供不足则生成有毒的 CO。", en: "Needed to burn; short supply yields toxic CO." },
              role: "l",
            },
            {
              f: "CO₂",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: { zh: "完全燃烧的产物，交通排放的主要碳源。", en: "Product of complete combustion and the main transport-related carbon output." },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水（蒸气）", en: "Water (vapor)" },
              note: { zh: "氢的去处，以水蒸气形式随烟气排出。", en: "Where the hydrogen ends up, leaving with the flue gas as vapor." },
              role: "r",
            },
          ],
          icon: "🛢️",
          term: { zh: "石油的分馏、裂化与裂解", en: "Fractional Distillation, Cracking and Pyrolysis" },
          level: 2,
          oneLiner: {
            zh: "分馏按沸点切割是物理变化，裂化与裂解把长链烃断开才是化学变化。",
            en: "Fractionation sorts by boiling point — a physical change; cracking and pyrolysis break long chains, a chemical one.",
          },
          eq: [
            {
              lhs: "C₁₆H₃₄",
              cond: { zh: "催化剂·加热加压", en: "catalyst, heat and pressure" },
              rhs: "C₈H₁₈ + C₈H₁₆",
            },
            {
              lhs: "C₂H₆",
              cond: { zh: "裂解 700~800 ℃", en: "pyrolysis, 700–800 °C" },
              rhs: "C₂H₄ + H₂",
            },
            {
              lhs: "2C₈H₁₈ + 25O₂",
              cond: { zh: "点燃", en: "ignition" },
              rhs: "16CO₂ + 18H₂O",
            },
          ],
          detail: {
            zh: "石油是烷烃、环烷烃与芳香烃的混合物，分馏塔按沸点区间切出汽油、煤油、柴油与重油——分子本身没变，所以是物理变化。重油太多而汽油不够时就要裂化，把长链断短以提高汽油产率；再升温到 700 ℃ 以上就是裂解，目的是拿乙烯、丙烯这些化工原料。汽油标号指的是辛烷值：异辛烷抗爆好定为 100，正庚烷易爆震定为 0。各馏分本身仍是沸点相近的混合物；乙烯的产量常被当作一个国家石油化工发展水平的标志，它也是「有机化学基础」里聚合与众多衍生物的起点。",
            en: "Crude oil is a mixture of alkanes, cycloalkanes and aromatics; a fractionating column cuts it by boiling range into gasoline, kerosene, diesel and residue — the molecules are untouched, so this is a physical change. When the heavy end runs long and the gasoline end short, cracking breaks long chains short to lift gasoline yield; push the temperature past 700 °C and it is pyrolysis, aimed at ethylene and propylene as chemical feedstocks. Gasoline grades quote the octane number: isooctane, which resists knock, is set at 100 and heptane, which knocks badly, at 0. Each fraction is itself a mixture of nearby boiling points; ethylene output is often taken as a barometer of a country's petrochemical industry, and it is the starting point of polymerization and many derivatives in organic chemistry (see Organic Basics).",
          },
          tags: [
            { zh: "工业", en: "Industry" },
            { zh: "能源", en: "Energy" },
            { zh: "有机", en: "Organic" },
          ],
        },
        {
          id: "ind-coal",
          subs: [
            {
              f: "C",
              name: { zh: "碳（焦炭/煤）", en: "Carbon (coke/coal)" },
              note: { zh: "干馏后的残焦是气化的原料。", en: "The coke left by carbonization feeds the gasifier." },
              role: "l",
            },
            {
              f: "H₂O",
              name: { zh: "水蒸气", en: "Steam" },
              note: { zh: "与炽热焦炭反应，把氢送进合成气。", en: "Meets the red-hot coke and carries the hydrogen in." },
              role: "l",
            },
            {
              f: "CO",
              name: { zh: "一氧化碳", en: "Carbon monoxide" },
              note: { zh: "合成气的一半；有毒，泄漏会致命。", en: "Half of syngas; toxic, so leaks are lethal." },
              role: "r",
            },
            {
              f: "H₂",
              name: { zh: "氢气", en: "Hydrogen" },
              note: { zh: "合成气的另一半，后续加氢反应的还原剂。", en: "The other half, and the reductant for everything downstream." },
              role: "r",
            },
            {
              f: "CH₃OH",
              name: { zh: "甲醇", en: "Methanol" },
              note: { zh: "间接液化的产品，也可制烯烃与甲醛。", en: "An indirect-liquefaction product, and a feed to olefins and formaldehyde." },
              role: "r",
            },
            {
              f: "CH₄",
              name: { zh: "甲烷（合成天然气）", en: "Methane (substitute natural gas)" },
              note: { zh: "甲烷化的产物，即煤制天然气。", en: "The methanation product — coal-to-gas." },
              role: "r",
            },
          ],
          icon: "⛏️",
          term: { zh: "煤的干馏、气化与液化", en: "Coal Carbonization, Gasification and Liquefaction" },
          level: 2,
          oneLiner: {
            zh: "隔绝空气高温干馏得焦炭与煤焦油，再气化成一氧化碳和氢气，合成甲醇或甲烷。",
            en: "Heat coal without air for coke and tar, gasify the carbon to CO and H₂, then build methanol or methane.",
          },
          eq: [
            {
              lhs: "C + H₂O",
              cond: { zh: "高温 炽热焦炭", en: "red-hot coke" },
              rhs: "CO + H₂",
            },
            {
              lhs: "CO + 2H₂",
              cond: { zh: "催化剂·加压", en: "catalyst, pressurized" },
              rhs: "CH₃OH",
            },
            {
              lhs: "CO + 3H₂",
              cond: { zh: "催化剂 甲烷化", en: "methanation catalyst" },
              rhs: "CH₄ + H₂O",
            },
          ],
          detail: {
            zh: "干馏是隔绝空气加强热使煤分解，得到焦炭（冶金还原剂）、煤焦油（化工原料）、粗氨水与焦炉气（H₂、CH₄、CO、C₂H₄）——分子种类变了，与石油分馏的物理变化相对。气化把煤转成 CO 与 H₂ 的合成气，是整个煤化工的枢纽：合成气再制甲醇，或甲烷化制合成天然气。液化分直接液化（高温高压加氢）与间接液化（先气化再费托合成）。中国富煤、贫油、少气，煤制油与煤制气承担着一部分能源安全的考量。煤焦油经分馏可得苯、甲苯、二甲苯与酚、萘等芳香族原料，焦炉气里的 H₂ 与 CH₄ 则可作燃料或合成氨的原料气（见「工业合成氨」）。",
            en: "Carbonization heats coal without air until it decomposes, giving coke for smelting, coal tar for chemicals, weak aqueous ammonia, and coke-oven gas (H₂, CH₄, CO, C₂H₄) — the molecules themselves change, which is the point of contrast with physical fractionation of oil. Gasification converts coal to CO + H₂ syngas, the pivot of the whole industry: that syngas is then made into methanol or methanated to substitute natural gas. Liquefaction comes direct (hydrogen under heat and pressure) or indirect (gasify first, then Fischer–Tropsch). China's coal-rich, oil-poor, gas-lean balance is why coal-to-liquids and coal-to-gas carry an energy-security role here. Work-up of coal tar yields aromatic feedstocks such as benzene, toluene and phenol, while the H₂ and CH₄ in coke-oven gas serve as fuel or as synthesis gas for ammonia (see Ammonia Synthesis).",
          },
          tags: [
            { zh: "工业", en: "Industry" },
            { zh: "能源", en: "Energy" },
            { zh: "煤化工", en: "Coal Chemistry" },
          ],
        },
        {
          id: "ind-silicate",
          subs: [
            {
              f: "Na₂CO₃",
              name: { zh: "纯碱（苏打）", en: "Soda ash" },
              note: { zh: "引入 Na₂O，作用是降低熔化温度。", en: "Supplies Na₂O and lowers the melting temperature." },
              role: "l",
            },
            {
              f: "SiO₂",
              name: { zh: "石英砂（二氧化硅）", en: "Silica (quartz sand)" },
              note: { zh: "玻璃网络的主体，也是陶瓷坯体的骨料。", en: "The glass network former and the grit of the body." },
              role: "l",
            },
            {
              f: "Na₂SiO₃",
              name: { zh: "硅酸钠", en: "Sodium silicate" },
              note: { zh: "水玻璃的主成分，可溶、作胶粘剂。", en: "The soluble 'water glass', used as a binder." },
              role: "r",
            },
            {
              f: "CaCO₃",
              name: { zh: "石灰石", en: "Limestone" },
              note: { zh: "玻璃里引入 CaO 提高耐水性；也是水泥的主要原料。", en: "Supplies CaO for water resistance, and is the chief cement raw material." },
              role: "l",
            },
            {
              f: "CaSiO₃",
              name: { zh: "硅酸钙", en: "Calcium silicate" },
              note: { zh: "玻璃与水泥中都存在的骨架成分。", en: "A structural constituent of both glass and cement." },
              role: "r",
            },
            {
              f: "CO₂↑",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: { zh: "碳酸盐分解带出的气体，需在窑气中排出。", en: "Gas driven off the carbonates and vented from the kiln." },
              role: "r",
            },
            {
              f: "Al₂Si₂O₅(OH)₄",
              name: { zh: "高岭土（黏土主要成分）", en: "Kaolinite (chief clay mineral)" },
              note: { zh: "陶瓷坯体的原料，带结构水。", en: "The clay behind pottery; it carries structural water." },
              role: "l",
            },
            {
              f: "Al₂O₃",
              name: { zh: "氧化铝", en: "Alumina" },
              note: { zh: "烧结后留在瓷体里，决定耐火与硬度。", en: "Stays in the fired body, giving refractoriness and hardness." },
              role: "r",
            },
            {
              f: "H₂O↑",
              name: { zh: "结构水（蒸气）", en: "Structural water (vapor)" },
              note: { zh: "必须缓慢升温排出，否则坯体开裂。", en: "Must be driven off slowly or the ware cracks." },
              role: "r",
            },
          ],
          icon: "🏺",
          term: { zh: "玻璃、水泥与陶瓷", en: "Glass, Cement and Ceramics" },
          level: 1,
          oneLiner: {
            zh: "纯碱、石灰石与石英砂高温成玻璃，石灰石加黏土煅烧成水泥，黏土烧结成陶瓷。",
            en: "Soda, limestone and silica make glass; limestone with clay makes cement; fired clay makes ceramics.",
          },
          eq: [
            {
              lhs: "Na₂CO₃ + SiO₂",
              cond: { zh: "高温 玻璃窑", en: "glass furnace, high heat" },
              rhs: "Na₂SiO₃ + CO₂↑",
            },
            {
              lhs: "CaCO₃ + SiO₂",
              cond: { zh: "高温", en: "high heat" },
              rhs: "CaSiO₃ + CO₂↑",
            },
            {
              lhs: "Al₂Si₂O₅(OH)₄",
              cond: { zh: "烧结 脱水", en: "firing, dehydration" },
              rhs: "Al₂O₃ + 2SiO₂ + 2H₂O↑",
            },
          ],
          detail: {
            zh: "这三样统称硅酸盐工业。普通玻璃用纯碱、石灰石与石英砂，高温下生成 Na₂SiO₃ 与 CaSiO₃，冷却后得到组成近似写作 Na₂O·CaO·6SiO₂ 的混合物；玻璃是非晶体，没有固定熔点，只有一段逐渐软化的温度区间。水泥用石灰石与黏土磨细煅烧，是水硬性胶凝材料——遇水反应硬化，所以受潮即废。陶瓷以黏土成型烧结，烧结时高岭土失去结构水。玻璃不在「晶体类型」的任何一格，正因非晶体而只有软化区间；把普通玻璃加热到近软化后骤冷即得钢化玻璃，表面形成的压让它更耐冲击、碎裂时也不生锐角。",
            en: "These three make up the silicate industry. Ordinary glass takes soda ash, limestone and quartz sand; at furnace heat they form Na₂SiO₃ and CaSiO₃, and the cooled product is a mixture written roughly as Na₂O·CaO·6SiO₂. Glass is amorphous — no fixed melting point, only a softening range. Cement is ground limestone and clay, calcined together; it sets hydraulically, reacting with water, so damp storage ruins it. Ceramics are shaped from clay and fired, the kaolinite giving up its structural water as it goes. Glass fits none of the crystal types, and being amorphous it has only a softening range; chilling glass heated near that point gives toughened glass, whose surface compression makes it far more impact-resistant and free of sharp shards (see Crystal Types).",
          },
          tags: [
            { zh: "工业", en: "Industry" },
            { zh: "材料", en: "Materials" },
            { zh: "硅酸盐", en: "Silicates" },
          ],
        },
      ],
    },
    /* ===================== 化学与环境 ===================== */
    {
      key: "chem-env",
      icon: "🌿",
      title: { zh: "化学与环境", en: "Chemistry & Environment" },
      items: [
        {
          id: "env-acid-rain",
          subs: [
            {
              f: "S",
              name: { zh: "硫（煤与石油中的硫分）", en: "Sulfur (the fraction in coal and oil)" },
              note: { zh: "动力煤含硫可达百分之几，燃烧先进入烟气。", en: "Steam coal can carry several percent sulfur, which leaves in the flue gas." },
              role: "l",
            },
            {
              f: "O₂",
              name: { zh: "氧气（空气）", en: "Oxygen (air)" },
              note: { zh: "燃烧与后续氧化都靠它。", en: "Drives both the burning and the later oxidation." },
              role: "l",
            },
            {
              f: "SO₂",
              name: { zh: "二氧化硫", en: "Sulfur dioxide" },
              note: { zh: "直接刺激呼吸道，也是酸雨的起始物。", en: "Irritates airways and starts the acid-rain chain." },
              role: "r",
            },
            {
              f: "SO₃",
              name: { zh: "三氧化硫", en: "Sulfur trioxide" },
              note: { zh: "在大气中由 SO₂ 缓慢氧化而来，飘尘起催化作用。", en: "Formed slowly from SO₂ in air, catalyzed on dust particles." },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水（云霦、雨水）", en: "Water (cloud and rain)" },
              note: { zh: "SO₃ 极易与之结合。", en: "SO₃ combines with it eagerly." },
              role: "l",
            },
            {
              f: "H₂SO₄",
              name: { zh: "硫酸", en: "Sulfuric acid" },
              note: { zh: "硫酸型酸雨的主体，中国以它为主。", en: "The heart of sulfate-type acid rain, dominant in China." },
              role: "r",
            },
            {
              f: "CaCO₃",
              name: { zh: "石灰石（脱硫浆液）", en: "Limestone (slurries)" },
              note: { zh: "磨成浆液喷入吸收塔，来自主产石膏的钙源。", en: "Ground to slurry in the absorber; the calcium for by-product gypsum." },
              role: "l",
            },
            {
              f: "CaSO₄",
              name: { zh: "硫酸钙（石膏）", en: "Calcium sulfate (gypsum)" },
              note: { zh: "脱硫副产物，回用作水泥缓凝剂与建材。", en: "The by-product, sold on as a cement retarder and board material." },
              role: "r",
            },
            {
              f: "CO₂",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: { zh: "碳酸盐分解带出，不增加脱硫的碳成本则不计。", en: "Released by the carbonate; a small carbon cost of the route." },
              role: "r",
            },
          ],
          icon: "🌧️",
          term: { zh: "酸雨与石灰石-石膏法脱硫", en: "Acid Rain and Limestone Desulfurization" },
          level: 2,
          oneLiner: {
            zh: "煤中硫烧成 SO₂，在大气里氧化成硫酸随雨落下；用石灰石浆液在塔里把它固定成石膏。",
            en: "Coal sulfur burns to SO₂, oxidizes in air to sulfuric acid and falls as rain; limestone slurry fixes it as gypsum inside the absorber.",
          },
          eq: [
            {
              lhs: "S + O₂",
              cond: { zh: "燃烧", en: "combustion" },
              rhs: "SO₂",
            },
            {
              lhs: "2SO₂ + O₂",
              cond: { zh: "大气中缓慢·飘尘催化", en: "slow in air, dust-catalyzed" },
              rhs: "2SO₃",
            },
            {
              lhs: "SO₃ + H₂O",
              cond: { zh: "云滴中", en: "in cloud droplets" },
              rhs: "H₂SO₄",
            },
            {
              lhs: "2CaCO₃ + 2SO₂ + O₂",
              cond: { zh: "湿法脱硫总结果", en: "wet FGD, overall" },
              rhs: "2CaSO₄ + 2CO₂",
            },
          ],
          detail: {
            zh: "正常雨水溶了 CO₂，pH 本底约 5.6，所以酸雨的定义是 pH 低于 5.6 的降水。燃煤与石油中的硫分先烧成 SO₂，在大气中被缓慢氧化成 SO₃ 并与水结合成硫酸，硝酸型则来自 NOx；中国以硫酸型为主。危害包括湖泊酸化、土壤养分淋失、森林退化，以及腐蚀石灰石与大理石建筑——CaCO₃ 遇酸生成可溶盐被雨水冲走，外表的“石壳”就是这样脱落的。治理主战场是烟气脱硫：把石灰石浆液喷入吸收塔与 SO₂ 反应，再鼓风氧化成石膏，效率可达九成以上，石膏回用作水泥缓凝剂。",
            en: "Clean rain already holds dissolved CO₂ and sits near pH 5.6, so 'acid rain' means anything below that. Sulfur in coal and oil burns to SO₂, which oxidizes slowly in air to SO₃ and hydrates to sulfuric acid; the nitric type comes from NOx, and sulfate-type deposition has dominated China. Damage runs to acidified lakes, leached soils, dying forest, and stone: acid converts CaCO₃ into soluble salts that rain washes away, which is why building surfaces slough off. The main control is flue-gas desulfurization — limestone slurry sprayed into an absorber reacts with the SO₂, is blown with air to gypsum, and removes better than ninety percent of the sulfur, with the gypsum sold on to cement plants.",
          },
          tags: [
            { zh: "环境", en: "Environment" },
            { zh: "大气", en: "Atmosphere" },
            { zh: "治理", en: "Abatement" },
          ],
          figure: `<svg viewBox="0 0 360 190" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="6" y="20" font-size="12" fill="currentColor">硫酸型酸雨与脱硫 Sulfate acid rain and scrubbing</text>
  <g stroke="currentColor" stroke-opacity="0.45" fill="none">
    <rect x="6" y="44" width="96" height="56" rx="6"/><rect x="132" y="44" width="96" height="56" rx="6"/><rect x="258" y="44" width="96" height="56" rx="6"/>
  </g>
  <g fill="currentColor" text-anchor="middle" font-size="10.5">
    <text x="54" y="64">① 燃烧成 SO₂</text><text x="180" y="64">② 氧化成 SO₃</text><text x="306" y="64">③ 成酸沉降</text>
  </g>
  <g fill="currentColor" fill-opacity="0.6" text-anchor="middle" font-size="8">
    <text x="54" y="78">burn to SO₂</text><text x="180" y="78">dust-catalyzed</text><text x="306" y="78">acid deposition</text>
  </g>
  <g fill="#d4a017" text-anchor="middle" font-size="9">
    <text x="54" y="94">煤中硫分</text><text x="180" y="94">飘尘表面</text><text x="306" y="94">H₂SO₄ · pH&lt;5.6</text>
  </g>
  <g fill="#d4a017">
    <polygon points="104,68 128,72 104,76"/><polygon points="230,68 254,72 230,76"/>
  </g>
  <text x="6" y="124" font-size="9.5" fill="currentColor" fill-opacity="0.7">脱硫塔：石灰石浆液 + 鼓风氧化 → 石膏回用作水泥缓凝剂</text>
  <text x="6" y="136" font-size="8.5" fill="currentColor" fill-opacity="0.6">Scrubber: limestone slurry plus air blows, the gypsum sold on to cement plants</text>
  <text x="6" y="156" font-size="10" fill="#e5484d">⚠ 酸雨腐蚀大理石与石灰石建筑：CaCO₃ 遇酸生成可溶盐被冲走</text>
  <text x="6" y="170" font-size="9.5" fill="#e5484d" fill-opacity="0.75">Acid turns stone into soluble salts that rain simply washes away</text>
</svg>`,
        },
        {
          id: "env-catalyst",
          subs: [
            {
              f: "CO",
              name: { zh: "一氧化碳", en: "Carbon monoxide" },
              note: { zh: "混合气过浓、燃烧不充分的产物，与血红蛋白结合力强。", en: "From rich, incomplete combustion; binds hemoglobin tightly." },
              role: "l",
            },
            {
              f: "NO",
              name: { zh: "一氧化氮", en: "Nitric oxide" },
              note: { zh: "气缸高温下氮气被固定而来，排入空气后继续氧化成 NO₂。", en: "Nitrogen fixed at cylinder heat; it oxidizes on to NO₂ in air." },
              role: "l",
            },
            {
              f: "NO₂",
              name: { zh: "二氧化氮", en: "Nitrogen dioxide" },
              note: { zh: "红棕色、刺激性，也是光化学烟雾的引发物。", en: "Red-brown and pungent; also the trigger of photochemical smog." },
              role: "l",
            },
            {
              f: "C₃H₆",
              name: { zh: "丙烯（未燃烃代表）", en: "Propene (hydrocarbon stand-in)" },
              note: { zh: "代表未烧完的燃油与润滑油成分。", en: "Stands for unburned fuel and oil carry-over." },
              role: "l",
            },
            {
              f: "O₂",
              name: { zh: "氧气（过量空气）", en: "Oxygen (excess air)" },
              note: { zh: "氧化 CO 与烃的氧化剂，含量由空燃比决定。", en: "The oxidizer for CO and HC, set by the air-fuel ratio." },
              role: "l",
            },
            {
              f: "CO₂",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: { zh: "氧化的终点：无毒但它是温室气体。", en: "The oxidation end point: harmless, yet a greenhouse gas." },
              role: "r",
            },
            {
              f: "N₂",
              name: { zh: "氮气", en: "Nitrogen" },
              note: { zh: "NOx 被还原后的安全归宿。", en: "Where NOx ends up once reduced." },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水（蒸气）", en: "Water (vapor)" },
              note: { zh: "烃氧化的另一产物。", en: "The other product of burning hydrocarbons." },
              role: "r",
            },
          ],
          icon: "🚗",
          term: { zh: "汽车尾气的三元催化", en: "The Three-Way Catalytic Converter" },
          level: 2,
          oneLiner: {
            zh: "铂铑把 CO 与 NOx 分别氧化、还原成 CO₂ 与 N₂，前提是空燃比守在理论值附近。",
            en: "Platinum and rhodium oxidize CO and reduce NOx to CO₂ and N₂ — but only if the air-fuel ratio holds near stoichiometry.",
          },
          eq: [
            {
              lhs: "2CO + 2NO",
              cond: { zh: "铂·铑 催化剂", en: "Pt-Rh catalyst" },
              rhs: "2CO₂ + N₂",
            },
            {
              lhs: "2NO₂ + 4CO",
              cond: { zh: "铑 还原", en: "rhodium, reduction" },
              rhs: "N₂ + 4CO₂",
            },
            {
              lhs: "2C₃H₆ + 9O₂",
              cond: { zh: "钯 氧化", en: "palladium, oxidation" },
              rhs: "6CO₂ + 6H₂O",
            },
          ],
          detail: {
            zh: "汽油机尾气有三类污染物：缺氧燃烧生成的 CO、没烧完的碳氢化合物 HC，以及气缸高温下把氮气固定下来的 NOx。三效催化剂用铂、钯把 CO 与 HC 氧化，用铑把 NOx 还原成 N₂，而三件事同时做好的窗口很窄——空燃比必须守在理论值（汽油约 14.7:1，即 λ≈1）附近，所以必须用氧传感器闭环控制。铅会使催化剂中毒，因此上了三元催化就必须用无铅汽油；冷启动时催化剂未达起燃温度（约 200~300 ℃），此时净化效率最低，也是排放考核要测冷启动工况的原因。",
            en: "A petrol engine emits three problems: CO from oxygen-starved burning, unburned hydrocarbons, and NOx fixed from intake nitrogen at cylinder heat. The three-way catalyst oxidizes CO and HC over platinum and palladium and reduces NOx to N₂ over rhodium — but the window where all three work at once is narrow, so the air-fuel ratio must be held at stoichiometry (about 14.7:1 for petrol, λ≈1) under closed-loop control from an oxygen sensor. Lead poisons the catalyst, which is why three-way cats demanded unleaded fuel; and until the brick reaches its light-off temperature, roughly 200–300 °C, purification barely works — the reason test cycles include a cold start.",
          },
          tags: [
            { zh: "环境", en: "Environment" },
            { zh: "大气", en: "Atmosphere" },
            { zh: "催化", en: "Catalysis" },
          ],
        },
        {
          id: "env-eutrophication",
          subs: [
            {
              f: "Fe³⁺",
              name: { zh: "铁盐（氯化铁）", en: "Iron salt (ferric chloride)" },
              note: { zh: "化学除磷的药剂，铝盐与石灰也可。", en: "The dosed reagent; salts of aluminum or lime work too." },
              role: "l",
            },
            {
              f: "PO₄³⁻",
              name: { zh: "磷酸根", en: "Phosphate" },
              note: { zh: "淡水富营养化通常由磷限量，来自洗涤剂与化肥。", en: "In fresh water phosphorus is usually the limiting nutrient, from detergents and fertilizer." },
              role: "l",
            },
            {
              f: "FePO₄↓",
              name: { zh: "磷酸铁沉淀", en: "Iron phosphate precipitate" },
              note: { zh: "把磷固定进污泥，随剩余污泥排出系统。", en: "Locks the phosphorus into sludge that leaves the plant." },
              role: "r",
            },
            {
              f: "NH₄⁺",
              name: { zh: "铵根（氨氮）", en: "Ammonium (ammonia nitrogen)" },
              note: { zh: "尿液、化肥与养殖尾水的主要氮形态，本身对鱼有毒。", en: "The main nitrogen form in waste; itself toxic to fish." },
              role: "l",
            },
            {
              f: "O₂",
              name: { zh: "溶解氧", en: "Dissolved oxygen" },
              note: { zh: "硝化菌需要好氧；藻类夜间与死亡分解时把它耗光。", en: "Nitriers need it; algae and decaying biomass consume it overnight." },
              role: "l",
            },
            {
              f: "NO₃⁻",
              name: { zh: "硝酸根", en: "Nitrate" },
              note: { zh: "硝化产物，易随水迁移、不易沉淀。", en: "The nitrification product: mobile and hard to precipitate." },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "两个生物过程的共同产物或介质。", en: "Product and medium of both biological steps." },
              role: "r",
            },
            {
              f: "H⁺",
              name: { zh: "氢离子（硝化产酸）", en: "Protons (acid from nitration)" },
              note: { zh: "硝化耗碱度，碱度不足时 pH 下降会抑制菌。", en: "Nitrification eats up alkalinity; a pH crash stalls the bacteria." },
              role: "r",
            },
            {
              f: "CH₃OH",
              name: { zh: "甲醇（外碳源）", en: "Methanol (external carbon)" },
              note: { zh: "进水碳源不足时投加，作反硝化的电子供体。", en: "Dosed when the inflow is carbon-poor; it feeds the denitrifiers." },
              role: "l",
            },
            {
              f: "N₂↑",
              name: { zh: "氮气", en: "Nitrogen gas" },
              note: { zh: "脱氮的终点：氮从水里回到空气。", en: "The goal — nitrogen leaves the water for the air." },
              role: "r",
            },
            {
              f: "CO₂",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: { zh: "甲醇被氧化后的产物。", en: "What the methanol ends up as." },
              role: "r",
            },
            {
              f: "OH⁻",
              name: { zh: "氢氧根（反硝化产碱）", en: "Hydroxide (alkalinity back)" },
              note: { zh: "反硝化回收约一半碱度，两段搭配才能自衡。", en: "Denitrification returns about half the alkalinity; the two stages balance." },
              role: "r",
            },
          ],
          icon: "🦠",
          term: { zh: "水体富营养化与脱氮除磷", en: "Eutrophication, Nitrogen and Phosphorus Removal" },
          level: 3,
          oneLiner: {
            zh: "铁盐把磷沉淀进污泥，先好氧硝化、再缺氧反硝化把硝态氮还原成氮气跑掉。",
            en: "Precipitate phosphorus with iron salt; then nitrate aerobically and denitrify anoxically so the nitrogen escapes as gas.",
          },
          eq: [
            {
              lhs: "Fe³⁺ + PO₄³⁻",
              cond: { zh: "投加铁盐", en: "iron salt dosing" },
              rhs: "FePO₄↓",
            },
            {
              lhs: "NH₄⁺ + 2O₂",
              cond: { zh: "好氧·硝化菌", en: "aerobic, nitriers" },
              rhs: "NO₃⁻ + H₂O + 2H⁺",
            },
            {
              lhs: "5CH₃OH + 6NO₃⁻",
              cond: { zh: "缺氧·反硝化菌", en: "anoxic, denitrifiers" },
              rhs: "3N₂↑ + 5CO₂ + 7H₂O + 6OH⁻",
            },
          ],
          detail: {
            zh: "氮磷本是养分，过量进水体就让藻类疯长。淡水通常由磷限量、海域多由氮限量。藻类白天产氧，夜间与死亡分解时却大量耗氧，溶解氧骤致鱼群窒息、底泥厌氧释磷并发臭：湖泊上叫水华，海里叫赤潮。工程上两条线并进：化学除磷用铁盐、铝盐或石灰把磷酸根沉淀掉；生物脱氮先好氧硝化把铵氮变成硝态氮，再在缺氧池里投碳源让反硝化菌把 NO₃⁻ 还原成 N₂——氮就此从水里“跑”进空气。源头一侧则是限磷洗涤剂（三聚磷酸钠已受限）、化肥流失管控与养殖尾水处理。",
            en: "Nitrogen and phosphorus are nutrients until they arrive in excess, and then algae bloom. Fresh water is usually phosphorus-limited, coastal water often nitrogen-limited. Algae make oxygen by day but consume it at night and as they decay, so dissolved oxygen crashes, fish suffocate, bottom sediment releases its phosphorus anaerobically and the water smells; on a lake it is a bloom, at sea a red tide. Treatment runs on two tracks: chemical removal precipitates phosphate with iron or aluminum salts, or with lime; biological removal nitrifies ammonium to nitrate under aeration, then denitrifies it to N₂ in an anoxic tank fed with carbon — the nitrogen leaves the water for the air. Upstream, the levers are low-phosphorus detergents (sodium tripolyphosphate is now restricted), fertilizer runoff control and cleanup of aquaculture effluent.",
          },
          tags: [
            { zh: "环境", en: "Environment" },
            { zh: "水", en: "Water" },
            { zh: "营养盐", en: "Nutrients" },
          ],
        },
        {
          id: "env-drinking-water",
          subs: [
            {
              f: "Al³⁺",
              name: { zh: "铝离子（明矾溶出）", en: "Aluminum ion (from alum)" },
              note: { zh: "明矾 KAl(SO₄)₂·12H₂O 溶于水解离出来。", en: "Released when alum dissolves." },
              role: "l",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "既是溶剂也是反应物。", en: "Solvent and reactant at once." },
              role: "l",
            },
            {
              f: "Al(OH)₃",
              name: { zh: "氢氧化铝胶体", en: "Aluminum hydroxide floc" },
              note: { zh: "不是沉淀而是胶体，靠表面积吸附悬浮物。", en: "A colloid, not a precipitate; its surface sweeps up suspended matter." },
              role: "r",
            },
            {
              f: "H⁺",
              name: { zh: "氢离子", en: "Protons" },
              note: { zh: "水解产酸，原水碱度低时 pH 会下降。", en: "Hydrolysis acidifies; low-alkalinity raw water will drop in pH." },
              role: "r",
            },
            {
              f: "Cl₂",
              name: { zh: "氯气（液氯）", en: "Chlorine (liquid dosed)" },
              note: { zh: "经典消毒剂，便宜且能持续抑菌。", en: "The classic disinfectant: cheap and long-lasting." },
              role: "l",
            },
            {
              f: "HCl",
              name: { zh: "盐酸", en: "Hydrochloric acid" },
              note: { zh: "氯气溶于水的另一半产物，量极微。", en: "The other half of chlorine in water, present in traces." },
              role: "r",
            },
            {
              f: "HClO",
              name: { zh: "次氯酸", en: "Hypochlorous acid" },
              note: { zh: "不带电荷、易穿透细胞壁，真正起杀菌作用的形态。", en: "Uncharged, so it crosses cell walls — this is the actual killer." },
              role: "r",
            },
            {
              f: "O₃",
              name: { zh: "臭氧", en: "Ozone" },
              note: { zh: "氧化能力更强且无副产氯，但水中存不住。", en: "A stronger oxidizer with no chlorinated by-products, but it will not persist." },
              role: "l",
            },
            {
              f: "O₂",
              name: { zh: "氧气", en: "Oxygen" },
              note: { zh: "臭氧分解后的唯一残留。", en: "All that ozone leaves behind." },
              role: "r",
            },
          ],
          icon: "🚰",
          term: { zh: "饮用水的净化与消毒", en: "Purifying and Disinfecting Drinking Water" },
          level: 2,
          oneLiner: {
            zh: "明矾水解生成胶体吸附杂质，氯或臭氧用强氧化杀死病原微生物。",
            en: "Alum hydrolyzes to a scavenging colloid; chlorine or ozone kill pathogens by oxidation.",
          },
          eq: [
            {
              lhs: "Al³⁺ + 3H₂O",
              rel: "equilibrium",
              cond: { zh: "水解·生成胶体", en: "hydrolysis, floc forms" },
              rhs: "Al(OH)₃ + 3H⁺",
            },
            {
              lhs: "Cl₂ + H₂O",
              rel: "equilibrium",
              cond: { zh: "液氯消毒", en: "chlorination" },
              rhs: "HCl + HClO",
            },
            {
              lhs: "2O₃",
              cond: { zh: "分解后无残留", en: "leaves no residue" },
              rhs: "3O₂",
            },
          ],
          detail: {
            zh: "常规水厂的五步是絮凝、沉淀、过滤、吸附、消毒。明矾溶出 Al³⁺，水解生成的 Al(OH)₃ 是胶体，把悬浮颗粒与部分色度裹挟沉降。消毒靠强氧化：液氯溶于水生成的 HClO 不带电荷、易穿透细胞壁，杀菌可靠且能在管网里留下余氯持续抑菌；但氯与原水里的有机物会生成三卤甲烷等消毒副产物，因此不少水厂改用 ClO₂ 或臭氧——臭氧氧化能力更强、分解后只剩氧气，缺点是没有持续抑菌能力，往往需在后段补少量氯。家用活性炭主要吸附异味与有机物，去不掉重金属离子。",
            en: "A conventional plant runs five steps: coagulation, sedimentation, filtration, adsorption, disinfection. Alum releases Al³⁺, whose hydrolysis product Al(OH)₃ is a colloid that sweeps suspended particles and color out of suspension. Disinfection is oxidation: chlorine dissolved in water gives HClO, uncharged so it penetrates cell walls, reliable and — usefully — leaving a chlorine residual that keeps the pipework clean. But chlorine plus natural organic matter makes chlorinated by-products such as trihalomethanes, so many plants dose chlorine dioxide or ozone instead; ozone oxidizes harder and decays to oxygen alone, but leaves nothing behind, so a small chlorine top-up is still needed. Household activated carbon mainly takes out taste and organics; it does not remove heavy-metal ions.",
          },
          tags: [
            { zh: "环境", en: "Environment" },
            { zh: "水", en: "Water" },
            { zh: "日常", en: "Everyday" },
          ],
        },
        {
          id: "env-chrome-water",
          subs: [
            {
              f: "Cr₂O₇²⁻",
              name: { zh: "重铬酸根（六价铬）", en: "Dichromate (chromium VI)" },
              note: { zh: "电镀、制革、颜料废水里的形态，氧化性强、致癌。", en: "Form found in plating, tanning and pigment effluent; strong oxidizer, carcinogenic." },
              role: "l",
            },
            {
              f: "SO₃²⁻",
              name: { zh: "亚硫酸钠（还原剂）", en: "Sulfite (reducer)" },
              note: { zh: "酸性条件下把 Cr(VI) 还原为 Cr(III)，也可用硫酸亚铁。", en: "Reduces Cr(VI) in acid; ferrous sulfate works as well." },
              role: "l",
            },
            {
              f: "H⁺",
              name: { zh: "氢离子（调 pH≈2~3）", en: "Protons (pH 2–3)" },
              note: { zh: "酸性是还原反应的前提，常用硫酸调。", en: "Acidity is required for the reduction; dosed with sulfuric acid." },
              role: "l",
            },
            {
              f: "Cr³⁺",
              name: { zh: "铬离子（三价）", en: "Chromium(III)" },
              note: { zh: "毒性远低于六价，且能形成难溶氢氧化物。", en: "Far less toxic and readily precipitated as the hydroxide." },
              role: "r",
            },
            {
              f: "SO₄²⁻",
              name: { zh: "硫酸根", en: "Sulfate" },
              note: { zh: "亚硫酸根被氧化的产物，留在水中。", en: "What the sulfite becomes; remains dissolved." },
              role: "r",
            },
            {
              f: "OH⁻",
              name: { zh: "氢氧根（加石灰）", en: "Hydroxide (lime dosing)" },
              note: { zh: "调至 pH 8~9 使铬完全沉淀。", en: "Raised to pH 8–9 to finish the precipitation." },
              role: "l",
            },
            {
              f: "Cr(OH)₃↓",
              name: { zh: "氢氧化铬沉淀", en: "Chromium(III) hydroxide sludge" },
              note: { zh: "压滤除去，滤饼属危险废物。", en: "Filter-pressed out; the cake is hazardous waste." },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "还原反应的产物，也作稀释介质。", en: "Product of the reduction and the carrier of the whole process." },
              role: "r",
            },
          ],
          icon: "🚱",
          term: { zh: "含铬废水的还原沉淀处理", en: "Treating Chromate Wastewater" },
          level: 3,
          oneLiner: {
            zh: "酸性下用亚硫酸钠把六价铬还原为三价，再加石灰沉淀成 Cr(OH)₃ 滤除。",
            en: "Reduce Cr(VI) to Cr(III) with sulfite in acid, then precipitate Cr(OH)₃ with lime and filter it out.",
          },
          eq: [
            {
              lhs: "Cr₂O₇²⁻ + 3SO₃²⁻ + 8H⁺",
              cond: { zh: "先调 pH≈2~3", en: "acidified to pH 2–3" },
              rhs: "2Cr³⁺ + 3SO₄²⁻ + 4H₂O",
            },
            {
              lhs: "Cr³⁺ + 3OH⁻",
              cond: { zh: "再加石灰调 pH≈8~9", en: "then lime to pH 8–9" },
              rhs: "Cr(OH)₃↓",
            },
          ],
          detail: {
            zh: "六价铬以 Cr₂O₇²⁻（酸性）或 CrO₄²⁻（碱性）存在，氧化性强、易穿透生物膜，是明确的致癌物；而三价铬溶解度低、毒性小得多。所以处理思路是“先还原、后沉淀”：酸性下投加亚硫酸钠或硫酸亚铁把 Cr(VI) 还原为 Cr³⁺，再加石灰调至弱碱性生成 Cr(OH)₃ 沉淀，压滤分离。滤饼属危险废物，不能随意填埋；清水需复检达标后排放。另一条路线是离子交换吸附或电解法回收，把铬回用于镀液，既省原料又减泥量。",
            en: "Chromium(VI) exists as Cr₂O₇²⁻ in acid and CrO₄²⁻ in alkali: a strong oxidizer that crosses cell membranes readily and a confirmed carcinogen, whereas Cr(III) is far less toxic and barely soluble. Hence the two-stage logic — reduce first, then precipitate: dose sulfite or ferrous sulfate in acid to bring Cr(VI) down to Cr³⁺, then add lime to make the solution mildly alkaline so Cr(OH)₃ falls out and can be filter-pressed. The cake is hazardous waste and cannot simply be landfilled; the clarified water is re-tested before discharge. The alternative route recovers chromium by ion exchange or electrolysis and returns it to the plating bath, saving both chemical and sludge.",
          },
          tags: [
            { zh: "环境", en: "Environment" },
            { zh: "氧化还原", en: "Redox" },
            { zh: "废水处理", en: "Water Treatment" },
          ],
        },
        {
          id: "env-solid-waste",
          subs: [
            {
              f: "CaCO₃",
              name: { zh: "石灰石粉（炉内喷钙）", en: "Limestone powder (in-furnace injection)" },
              note: { zh: "价格低廉，分解后的 CaO 同时吸硫吸氯。", en: "Cheap; the CaO it gives up takes up sulfur and chlorine alike." },
              role: "l",
            },
            {
              f: "HCl",
              name: { zh: "氯化氢（烟气中的酸）", en: "Hydrogen chloride (acid gas)" },
              note: { zh: "来自 PVC 等含氯垃圾，是焚烧最主要的酸性气体。", en: "From PVC and other chlorinated waste; the chief acid in municipal incineration." },
              role: "l",
            },
            {
              f: "CaCl₂",
              name: { zh: "氯化钙", en: "Calcium chloride" },
              note: { zh: "脱酸生成的中性盐，随飞灰处理。", en: "The neutral salt formed; handled with the fly ash." },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "中和反应的产物。", en: "Product of the neutralization." },
              role: "r",
            },
            {
              f: "CO₂↑",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: { zh: "碳酸盐分解带出的气体。", en: "Released when the carbonate decomposes." },
              role: "r",
            },
            {
              f: "Ca(OH)₂",
              name: { zh: "熟石灰（半干法）", en: "Slaked lime (semidry process)" },
              note: { zh: "喷成细雾，一边吸水一边中和酸性气体。", en: "Atomized so it dries the gas while neutralizing it." },
              role: "l",
            },
            {
              f: "CuO",
              name: { zh: "氧化铜（含铜废料）", en: "Copper oxide (copper-bearing scrap)" },
              note: { zh: "废铜与电镀污泥灼烧后的形态。", en: "What scrap copper and plating sludge leave behind after roasting." },
              role: "l",
            },
            {
              f: "H₂SO₄",
              name: { zh: "稀硫酸（浸出剂）", en: "Dilute sulfuric acid (leachant)" },
              note: { zh: "把铜转入溶液，以便后续电积。", en: "Moves copper into solution for electrowinning." },
              role: "l",
            },
            {
              f: "CuSO₄",
              name: { zh: "硫酸铜溶液", en: "Copper sulfate solution" },
              note: { zh: "电解得阴极铜；与湿法炼铜同源。", en: "Electrolyzed to cathode copper — the same chemistry as heap leaching." },
              role: "r",
            },
          ],
          icon: "🗑️",
          term: { zh: "垃圾焚烧与金属回收", en: "Waste Incineration and Metal Recovery" },
          level: 2,
          oneLiner: {
            zh: "850 ℃ 以上停留 2 秒分解二噁英，石灰吸收 HCl 与 SO₂，飞灰按危险废物处理。",
            en: "Hold the flame above 850 °C for two seconds to crack dioxins, scrub the acid gases with lime, and treat fly ash as hazardous waste.",
          },
          eq: [
            {
              lhs: "CaCO₃ + 2HCl",
              cond: { zh: "炉内喷钙", en: "in-furnace dosing" },
              rhs: "CaCl₂ + H₂O + CO₂↑",
            },
            {
              lhs: "2HCl + Ca(OH)₂",
              cond: { zh: "半干法脱酸", en: "semidry scrubbing" },
              rhs: "CaCl₂ + 2H₂O",
            },
            {
              lhs: "CuO + H₂SO₄",
              cond: { zh: "酸溶回收", en: "acid leaching" },
              rhs: "CuSO₄ + H₂O",
            },
          ],
          detail: {
            zh: "焚烧是减量最彻底的末端手段，但要管住两件事。一是二噁英：炉温需保持在 850 ℃ 以上、烟气停留不少于 2 秒才能把已生成的分解掉；而烟气降温时又在 250~400 ℃ 区间“从头合成”，所以出口必须急冷、快速穿过这段温度。二是酸性气体与飞灰：HCl 与 SO₂ 用石灰石喷射或半干法石灰浆吸收，飞灰富集重金属与二噁英，属危险废物，须螯合稳定化后进安全填埋场；炉渣则多用作路基材料。回收侧的账很清楚：再生铝的能耗只有原铝的约 5%，所以分类回收的价值首先在于能源与矿产，而不是“变废为金”——那一步只在电子废弃物上才成立，且必须集中处理。",
            en: "Incineration is the most thorough way to shrink a waste stream, provided two things are controlled. First, dioxins: the combustion chamber must stay above 850 °C with the gas resident at least two seconds to destroy what has formed, yet as the flue gas cools it re-synthesizes dioxins de novo between 250 and 400 °C, so the outlet is quench-cooled straight through that window. Second, acid gas and fly ash: HCl and SO₂ are taken up by injected limestone or a semidry lime slurry, while the fly ash concentrates heavy metals and dioxins, is classified hazardous, and must be chelate-stabilized before it can go to a secure landfill; the bottom ash, by contrast, is largely usable as road base. The recovery arithmetic is blunt: recycled aluminum costs about five percent of the energy of primary metal, so the value of sorting is energy and ore first, not turning trash into gold — that last trick only pays on electronic waste, and only in centralized hands.",
          },
          tags: [
            { zh: "环境", en: "Environment" },
            { zh: "固废", en: "Solid Waste" },
            { zh: "循环", en: "Recycling" },
          ],
        },
        {
          id: "env-ccus",
          subs: [
            {
              f: "Na₂CO₃",
              name: { zh: "纯碱溶液（吸收剂）", en: "Soda ash solution (the absorbent)" },
              note: { zh: "碳酸钠循环法用廉价天然碱代替有机胺，没有胺降解问题。", en: "The soda cycle uses cheap trona instead of an amine, so nothing degrades." },
              role: "l",
            },
            {
              f: "CO₂",
              name: { zh: "二氧化碳（烟气中的）", en: "Carbon dioxide (in the flue gas)" },
              note: { zh: "燃煤烟气里只占 12~15%，要先被富集才谈得上利用。", en: "Only 12–15% of coal flue gas, so it must be concentrated before it can be used." },
              role: "l",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "参与吸收，也是转化反应的副产物。", en: "Joins the absorption and comes back out of the conversion." },
              role: "l",
            },
            {
              f: "NaHCO₃",
              name: { zh: "碳酸氢钠（负载产物）", en: "Sodium bicarbonate (the loaded product)" },
              note: { zh: "CO₂ 被“装”进溶液的形式，受热即可倒出来。", en: "How the CO₂ is carried in solution — heat releases it again." },
              role: "r",
            },
            {
              f: "CO₂↑",
              name: { zh: "高纯二氧化碳（再生气）", en: "Concentrated carbon dioxide (regenerated)" },
              note: { zh: "解吸后近乎纯净，可直接封存或作碳源。", en: "Nearly pure after desorption, ready for storage or as a feedstock." },
              role: "r",
            },
            {
              f: "H₂",
              name: { zh: "氢气（还原剂）", en: "Hydrogen (the reductant)" },
              note: { zh: "必须来自电解水的绿电，否则整条路线是亏碳的。", en: "Must come from water electrolysis on surplus power, or the carbon balance goes negative." },
              role: "l",
            },
            {
              f: "CH₃OH",
              name: { zh: "甲醇", en: "Methanol" },
              note: { zh: "常温液体，可直接进现有燃料与化工体系。", en: "A liquid at ambient conditions, so it slots into existing fuel and chemical chains." },
              role: "r",
            },
            {
              f: "NH₃",
              name: { zh: "氨", en: "Ammonia" },
              note: { zh: "与 CO₂ 合成尿素，是目前最大宗的固定用途。", en: "Combined with CO₂ into urea, still the largest single use." },
              role: "l",
            },
            {
              f: "CO(NH₂)₂",
              name: { zh: "尿素", en: "Urea" },
              note: { zh: "每生产 1 t 尿素约消耗 0.73 t CO₂。", en: "About 0.73 t of CO₂ per tonne of urea." },
              role: "r",
            },
          ],
          icon: "🌍",
          term: { zh: "二氧化碳的捕集与资源化", en: "Capturing and Reusing Carbon Dioxide" },
          level: 3,
          oneLiner: {
            zh: "纯碱溶液把 CO₂ 变成碳酸氢钠，受热再放回一股近纯气；剩下的问题是给它找一个值得的去处。",
            en: "Soda ash solution loads CO₂ as bicarbonate and gives it back near-pure on heating; the hard part is finding somewhere worth putting it.",
          },
          eq: [
            {
              lhs: "Na₂CO₃ + CO₂ + H₂O",
              cond: { zh: "约 60 ℃ 吸收", en: "absorption, about 60 °C" },
              rhs: "2NaHCO₃",
            },
            {
              lhs: "2NaHCO₃",
              cond: { zh: "加热再生", en: "thermal regeneration" },
              rhs: "Na₂CO₃ + CO₂↑ + H₂O",
            },
            {
              lhs: "CO₂ + 3H₂",
              cond: { zh: "CuO-ZnO-Al₂O₃ 催化，约 250 ℃、5~10 MPa", en: "CuO-ZnO-Al₂O₃ catalyst, about 250 °C, 5–10 MPa" },
              rhs: "CH₃OH + H₂O",
            },
            {
              lhs: "2NH₃ + CO₂",
              cond: { zh: "高压", en: "high pressure" },
              rhs: "CO(NH₂)₂ + H₂O",
            },
          ],
          detail: {
            zh: "捕集分三步账。第一是分离：烟气中 CO₂ 只有 12~15%，浓度低、压力大，所以任何捕集都要付出可观的能量与成本。主流是 30% 单乙醇胺溶液在约 60 ℃ 化学吸收、约 120 ℃ 解吸，缺点是胺会降解、能耗偏高；碳酸钠循环法用天然碱作吸收剂，低温吸收成碳酸氢钠、加热又放回近纯 CO₂，代价是设备体积与碱耗。第二是封存或转化：近纯 CO₂ 可以注入油田驱油、矿化成碳酸盐，或深部咸水层封存。第三是利用：加氢制甲醇、与氨合成尿素、与甲烷干重整制合成气。前两条早已工业化，第三条里“绿氢 + 捕集 CO₂ 制甲醇”最被看好，国内已有千吨级示范装置——但整条路线的碳账完全取决于氢气是否来自可再生能源电力，否则制氢排出的 CO₂ 比固定掉的还多。",
            en: "Keep the accounting in three parts. First, separation: flue gas carries only 12–15% CO₂ at low partial pressure, so capture always costs real energy and money. The mainstream route is 30% monoethanolamine, absorbing near 60 °C and releasing near 120 °C, limited by amine degradation and reboiler duty; the soda cycle uses trona instead, loading CO₂ into bicarbonate at mild temperature and cracking it back out as a near-pure stream, paying instead in vessel size and alkali loss. Second, storage: the concentrated gas can be injected into depleted oil reservoirs for enhanced recovery, mineralized as carbonates, or locked in deep saline aquifers. Third, use: hydrogenation to methanol, synthesis with ammonia to urea, dry reforming with methane to syngas. The first two are long industrialized; of the third, green hydrogen plus captured CO₂ to methanol looks strongest, and demonstration plants at thousand-tonne scale already run in China — but the whole carbon ledger hinges on whether that hydrogen came from renewable power, since otherwise the hydrogen production emits more CO₂ than the process fixes.",
          },
          tags: [
            { zh: "碳捕集", en: "Carbon Capture" },
            { zh: "资源化", en: "Utilization" },
            { zh: "环境", en: "Environment" },
          ],
        },
      ],
    },
    /* ===================== 物质构成与化学键 ===================== */
    {
      key: "bonding",
      icon: "🔗",
      title: { zh: "物质构成与化学键", en: "Structure & Chemical Bonds" },
      items: [
        {
          id: "ionic-bond",
          icon: "🧲",
          term: { zh: "离子键", en: "Ionic Bond" },
          level: 1,
          oneLiner: {
            zh: "阴、阳离子通过静电作用结合，常见于活泼金属与活泼非金属。",
            en: "Electrostatic attraction between ions; typical of active metals with active nonmetals.",
          },
          detail: {
            zh: "阴、阳离子靠静电作用结合成离子键，这种作用既有吸引也有排斥，最终达到平衡；它一般形成于活泼金属与活泼非金属之间。如 NaCl 中钠失去一个电子成 Na⁺、氯得到一个电子成 Cl⁻，两者都达到 8 电子稳定结构。离子键没有方向性也没有饱和性，一个 Na⁺ 周围可同时吸引六个 Cl⁻，所以 NaCl 是立方的离子晶体而不是一个个 NaCl 分子，化学式只表示离子的个数比。据此可判性质：熔沸点较高、硬而脆，固态时离子被钉住不能移动故不导电，熔融或溶于水时电离出自由离子才导电。它与靠共用电子的「共价键」正好相对，二者同属「化学键」，而电负性差越大越倾向生成离子键（见「电负性与电离能」）。",
            en: "Ions are held by electrostatic action that balances attraction and repulsion, typically between a reactive metal and a reactive nonmetal: in NaCl sodium loses one electron to Na⁺ and chlorine gains one to Cl⁻, both reaching a stable eight. The ionic bond has neither direction nor saturation, so one Na⁺ grips six Cl⁻ at once, which is why NaCl is a cubic crystal rather than separate molecules and the formula only gives the ion ratio. Hence the properties — high melting point, hard but brittle, non-conductive as a solid because the ions are locked, yet conductive when molten or dissolved once free ions appear. It is the give-and-take counterpart of the shared-electron covalent bond (see Covalent Bond), both being chemical bonds (see Chemical Bonds), and a larger electronegativity gap favors ionic character (see Electronegativity & Ionization).",
          },
          tags: [{ zh: "化学键", en: "Bonding" }],
        },
        {
          id: "covalent-bond",
          icon: "🤝",
          term: { zh: "共价键", en: "Covalent Bond" },
          level: 1,
          oneLiner: {
            zh: "原子间共用电子对形成的化学键，分极性与非极性。",
            en: "Shared electron pairs between atoms; polar or nonpolar.",
          },
          detail: {
            zh: "原子间通过共用电子对形成的化学键叫共价键，多见于非金属原子之间。按共用电子对有没有偏向，分两类：同种原子间电子对不偏移，为非极性键（H₂、Cl₂、N₂）；不同原子间电子对偏向电负性大的一方，为极性键（HCl、H₂O）。共用一对叫单键、两对叫双键（O=O）、三对叫三键（N≡N），键长依次缩短、键能依次增大。分子整体有没有极性还得看空间构型：CO₂ 虽含极性键却因直线对称而抵消、是非极性分子。电子式用点标出共用与孤对电子，结构式用一根短线代表一对共用电子。共价键有方向性和饱和性，与无方向的「离子键」互补，二者统称「化学键」，成键类型由电负性差决定（见「电负性与电离能」）。",
            en: "A covalent bond is a shared electron pair between atoms, most often nonmetals. If the pair sits evenly the bond is nonpolar (H₂, Cl₂, N₂); if it leans toward the more electronegative atom the bond is polar (HCl, H₂O). One shared pair is a single bond, two a double (O=O) and three a triple (N≡N), with shortening length and rising bond energy. Whether the whole molecule is polar is a separate question of shape: CO₂ has polar bonds yet is a nonpolar molecule because its linearity cancels them. Dot formulas mark shared and lone pairs, structural formulas draw each pair as one line. Covalent bonds are directional and saturated, complementing directionless ionic bonds (see Ionic Bond); together these are chemical bonds (see Chemical Bonds), and the electronegativity gap decides which forms (see Electronegativity & Ionization).",
          },
          tags: [{ zh: "化学键", en: "Bonding" }],
        },
        {
          id: "metallic-bond",
          icon: "🔩",
          term: { zh: "金属键", en: "Metallic Bond" },
          level: 2,
          oneLiner: {
            zh: "金属阳离子与自由电子间的强烈作用，赋予金属导电、导热与延展性。",
            en: "Cations in a sea of delocalized electrons; gives conductivity, malleability and luster.",
          },
          detail: {
            zh: "金属键没有方向性也没有饱和性：金属阳离子排成阵列，价电子脱离各自的原子，变成在整个晶体里自由移动的「电子海」，靠这份共有电子把阳离子们黏在一起。正因为键不挑方向，金属受外力时原子层可以相对滑动而键不断开，这就是延展性——砸成薄片、拉成细丝都靠它；而金刚石这类共价晶体受力时键被强行掰向错误的方向，直接碎裂，所以硬而脆。导电与导热都由那群自由电子负责：加电场就定向移动，受热就加速并把能量传给相邻离子，所以金属的导电性随温度升高而下降（晶格振动加剧、阻碍电子），这与半导体正好相反。自由电子还能吸收并随即放出可见光，于是金属有金属光泽。键的强弱主要看两件事：能给出几个价电子、离子半径多大。碱金属只有一个价电子而半径又大，所以钠能用小刀切开、汞在常温就是液体；过渡金属价电子多、半径小，键强熔点高，钨能撑到 3400 ℃ 以上而用作灯丝。合金通常比纯金属硬，因为掺进来的异种原子大小不一，打乱了本来可以整齐滑移的层（钢比铁硬、青铜比纯铜硬都是这个原因）。",
            en: "A metallic bond has neither direction nor saturation: the cations sit in a lattice while the valence electrons leave their parent atoms and drift through the whole crystal, and this shared sea of electrons is what holds the cations together. Because the bond does not care which way it points, a hammered metal lets its layers slide past one another without breaking anything — that is malleability and ductility — whereas a covalent solid such as diamond has its bonds wrenched into the wrong geometry and simply shatters, hard but brittle. The same free electrons carry current and heat, so a metal conducts better when cold: warming sets the lattice vibrating and scatters the electrons, the opposite of what happens in a semiconductor. Absorb light and re-emit it and you have the metallic lustre. Strength turns on two things, how many electrons are contributed and how small the ion is. Alkali metals give one electron from a large radius, so sodium is cut with a knife and mercury is liquid at room temperature, while transition metals give more from a smaller radius, hence tungsten above 3400 °C and its life as a lamp filament. Alloys are usually harder than the pure metal because atoms of an unequal size disturb the orderly sliding of the layers — steel over iron, bronze over copper.",
          },
          tags: [{ zh: "化学键", en: "Bonding" }],
        },
        {
          id: "intermolecular",
          icon: "💧",
          term: {
            zh: "分子间作用力与氢键",
            en: "Intermolecular Forces & Hydrogen Bonding",
          },
          level: 2,
          oneLiner: {
            zh: "分子间的弱作用（范德华力）与较强的氢键，决定熔沸点与溶解性。",
            en: "Weak van der Waals forces and stronger hydrogen bonds govern boiling points and solubility.",
          },
          detail: {
            zh: "分子之间存在比化学键弱得多的作用：广泛存在的范德华力，以及特殊的氢键。范德华力随相对分子质量增大、分子接触面积增大而增强，所以卤素单质从 F₂、Cl₂ 的气态到 Br₂ 液态、I₂ 固态，熔沸点一路升高；它不是化学键，破坏它只改变物质状态而不改变分子本身。氢键则是含 N、O、F 的分子里，氢与电负性大原子之间的较强吸引，比范德华力强却仍远弱于「共价键」。氢键解释了几件反常：水的沸点远高于同族的 H₂S、冰因氢键把分子排成疏松结构而密度比水小、所以浮在水面、DNA 双链靠碱基间 A–T 与 G–C 的氢键配对。它们与把原子拧在一起的「化学键」分属不同层级的作用，也正是这些弱作用决定了「晶体类型」里分子晶体的低熔沸点（见「晶体类型」）。",
            en: "Between molecules act forces far weaker than bonds: the universal van der Waals force and the special hydrogen bond. Van der Waals grows with molecular mass and contact area, so the halogens climb from gaseous F₂ and Cl₂ to liquid Br₂ and solid I₂ with steadily rising melting and boiling points; it is not a chemical bond, and breaking it changes only the state, not the molecule. A hydrogen bond is the stronger pull, in molecules holding N, O or F, between a hydrogen and an electronegative atom — sturdier than van der Waals yet far weaker than a covalent bond (see Covalent Bond). Hydrogen bonding explains several anomalies: water boils far above H₂S below it, ice floats because hydrogen bonds hold it in an open lattice less dense than liquid water, and the DNA helix pairs A–T and G–C through it. These sit at a different level from the chemical bonds that weld atoms together (see Chemical Bonds), and such weak forces are exactly what give molecular crystals their low melting points (see Crystal Types).",
          },
          tags: [{ zh: "分子间", en: "Intermolecular" }],
        },
        {
          id: "crystal-types",
          icon: "💎",
          term: { zh: "晶体类型", en: "Crystal Types" },
          level: 3,
          oneLiner: {
            zh: "离子晶体、分子晶体、原子晶体与金属晶体，性质差异悬殊。",
            en: "Ionic, molecular, covalent-network and metallic crystals differ greatly in properties.",
          },
          detail: {
            zh: "按构成微粒与微粒间作用力，晶体分四类。离子晶体由阴、阳离子经离子键堆成（NaCl、CaO），熔沸点较高、硬而脆，固态不导电而熔融或溶解导电；分子晶体由分子经分子间作用力（有时还有氢键）排列（干冰、冰、碘），熔沸点低、多数易升华、不导电；原子晶体（共价晶体）由原子经共价键向空间延伸成骨架（金刚石、晶体硅、SiO₂），是四类里最硬、熔点最高的；金属晶体由金属阳离子与自由电子经「金属键」结合，导电导热、有延展性。比较熔点大体是原子晶体高于离子晶体高于分子晶体，同类之内再比键强与晶格能，如金刚石硬于晶体硅、MgO 熔点高于 NaCl。晶体类型与化学键类型相互对应，判类型先问微粒、再问作用力（见「离子键」「共价键」）。",
            en: "Sorted by their building particles and the forces between them, crystals fall into four kinds. Ionic crystals stack cations and anions by ionic bonds (NaCl, CaO): fairly high melting, hard but brittle, non-conductive solid that conducts when molten or dissolved. Molecular crystals pack molecules held by intermolecular forces and sometimes hydrogen bonds (dry ice, ice, iodine): low melting, many sublime, non-conductive. Network covalent crystals extend atoms through covalent bonds into a giant framework (diamond, crystal silicon, SiO₂), the hardest and highest-melting of the four. Metallic crystals bind cations and a sea of free electrons by metallic bonds, so they conduct heat and electricity and can be drawn out (see Metallic Bond). Melting points run roughly network above ionic above molecular, and within a kind you compare bond strength and lattice energy, so diamond beats silicon and MgO beats NaCl. The crystal type maps onto the bond type — first ask what the particles are, then what holds them (see Ionic Bond and Covalent Bond).",
          },
          tags: [{ zh: "物质结构", en: "Structure" }],
        },
        {
          id: "valence",
          icon: "🔢",
          term: { zh: "化合价", en: "Valence" },
          level: 1,
          oneLiner: {
            zh: "元素在化合物中的结合能力，正负化合价代数和为零。",
            en: "Combining power of an element; the sum of oxidation numbers in a neutral compound is zero.",
          },
          detail: {
            zh: "化合价是原子的结合能力，本质是成键时电子偏移的数目：离子化合物里等于得失电子数（NaCl 中钠 +1、氯 −1），共价化合物里等于共用电子对的数目与它的偏向（H₂O 中氢 +1、氧 −2）。用起来只有三条硬规矩和一张常查表。规矩一：单质里元素的化合价为 0，因为不存在电子偏向谁的问题。规矩二：化合物里正负化合价的代数和为 0，这是求未知价态的万能钥匙——知道钾 +1、氧 −2，就能从 KMnO₄ 推出 Mn 为 +7、从 K₂MnO₄ 推出 +6、从 MnO₂ 推出 +4。规矩三：同种元素在不同物质里可以取不同价，甚至在同一物质里同时取两种价（Fe₃O₄ 里铁是 +2 与 +3 混合，平均 +8/3），所以「铁有可变化合价」必须落实到具体物质上说。初中要求背下的常见价态口诀是：一价氢氯钾钠银，二价氧钙钡镁锌，三铝四硅五价磷，二三铁、二四碳，二四六硫都齐全，铜汞二价最常见，单质为零。化合价还直接决定两件事：写化学式时的交叉法，以及氧化还原的判断——化合价升高就是失电子、被氧化、作还原剂，降低则相反，这个口径与「氧化还原反应」一条完全一致，不要与「化合反应」混为一谈。",
            en: "Valence is an atom's combining capacity, and underneath it is simply the number of electrons that shift when a bond forms: in an ionic compound it equals the electrons lost or gained (sodium +1, chlorine −1 in NaCl), in a covalent one the count of shared pairs and which way they lean (hydrogen +1, oxygen −2 in water). Three hard rules carry the whole topic. Rule one: an element in its free state is zero, since nothing is leaning anywhere. Rule two: the algebraic sum in a neutral compound is zero, the master key for any unknown — knowing potassium +1 and oxygen −2, manganese comes out +7 in KMnO₄, +6 in K₂MnO₄ and +4 in MnO₂. Rule three: one element may take several valences, and within a single substance even two at once (Fe₃O₄ holds both +2 and +3, averaging 8/3), so variable valence is always stated substance by substance. The chant learned at thirteen runs: hydrogen, chlorine, potassium, sodium and silver one; oxygen, calcium, barium, magnesium and zinc two; aluminium three, silicon four, phosphorus five; iron two and three, carbon two and four; sulphur two, four and six; copper and mercury most often two; free elements zero. Beyond that, valence dictates how a formula is crossed out and, in the redox chapter, who was oxidised: a rise means electrons lost, the substance oxidised and acting as the reducing agent, and the reverse for a fall — the same wording kept throughout the redox entry, and never to be confused with a synthesis reaction.",
          },
          tags: [{ zh: "化学用语", en: "Notation" }],
        },
      ],
    },
    /* ===================== 有机化学 ===================== */
    {
      key: "organic",
      icon: "🧬",
      title: { zh: "有机化学", en: "Organic Chemistry" },
      items: [
        {
          id: "org-functional",
          icon: "🏷️",
          term: { zh: "官能团", en: "Functional Groups" },
          level: 1,
          oneLiner: {
            zh: "决定有机物化学特性的原子或原子团，如羟基、醛基、羧基。",
            en: "Atom groups that dictate organic reactivity: hydroxyl, aldehyde, carboxyl, etc.",
          },
          detail: {
            zh: "官能团是决定有机物化学特性的原子或原子团，同系物因官能团相同而性质相似，所以认官能团几乎等于给有机物分类。常见者有羟基 —OH（醇，与苯酚上的酚羟基性质不同）、醛基 —CHO（能被银氨溶液氧化而显银镜）、羧基 —COOH（显酸性）、酯基 —COO—（能水解）、碳碳双键 C=C（能加成）、氨基 —NH₂。同一分子可含多种官能团，性质便由它们共同决定，如葡萄糖既有多羟基又有醛基。判类别先找官能团：见 C=C 想加成、见 —COOH 想成盐、见 —CHO 想氧化。官能团与「同分异构体」「取代反应」「加成反应」一起构成有机化学的主线。",
            en: "Functional groups are the atoms or atom groups that set how an organic compound reacts, so finding them is much the same as classifying the molecule — homologues behave alike because they share a group. Watch the common ones: hydroxyl —OH (alcohols, though a phenolic —OH differs), aldehyde —CHO (gives a silver mirror with Tollens reagent), carboxyl —COOH (acidic), ester —COO— (hydrolysable), the carbon-carbon double bond C=C (adds reagents) and amino —NH₂. A single molecule may carry several groups and its chemistry is then the sum of all of them; glucose, for example, has many hydroxyls plus one aldehyde. To classify, first locate the group: a C=C points to addition, a —COOH to salt formation, a —CHO to oxidation. Alongside isomerism (see Isomers), substitution (see Substitution) and addition (see Addition), the functional group is a main thread of organic chemistry.",
          },
          tags: [{ zh: "有机", en: "Organic" }],
        },
        {
          id: "org-isomerism",
          icon: "🔀",
          term: { zh: "同分异构体", en: "Isomers" },
          level: 2,
          oneLiner: {
            zh: "分子式相同、结构不同，性质因而各异的化合物。",
            en: "Same molecular formula, different structure, hence different properties.",
          },
          detail: {
            zh: "同分异构体指分子式相同而结构不同的化合物，原子连接顺序或空间排布一旦不同，就变成性质各异的另一种物质。常见三类：碳链异构，如正丁烷直链、异丁烷带支链；位置异构，如 1-丙醇与 2-丙醇羟基位置不同；官能团异构，如乙醇 CH₃CH₂OH 与二甲醚 CH₃OCH₃ 同是 C₂H₆O 却一类是醇一类是醚，葡萄糖与果糖也同属 C₆H₁₂O₆。碳数越多异构体越繁，丁烷 2 种、戊烷 3 种、己烷 5 种，到 C₄H₁₀O 已有 7 种。写结构先排碳骨架再挪官能团，才能不重不漏；它与「官能团」互为表里，正是同分异构现象让有限的元素拼出千万种有机物。",
            en: "Isomers share a molecular formula but differ in structure, so a change in how atoms are linked or arranged turns one substance into another with its own properties. Three usual kinds: chain isomerism, straight n-butane versus branched isobutane; position isomerism, 1-propanol versus 2-propanol where the hydroxyl sits elsewhere; and functional-group isomerism, ethanol CH₃CH₂OH and dimethyl ether CH₃OCH₃ both being C₂H₆O yet one an alcohol and one an ether, as glucose and fructose are both C₆H₁₂O₆. The more carbons, the more isomers: butane has 2, pentane 3, hexane 5, and C₄H₁₀O already 7. To enumerate without double counting, lay out the carbon skeleton first, then move the group. Isomerism pairs with the functional group (see Functional Groups) and is exactly why a handful of elements build millions of organic molecules.",
          },
          tags: [{ zh: "有机", en: "Organic" }],
        },
        {
          id: "org-substitution",
          icon: "🔁",
          term: { zh: "取代反应", en: "Substitution" },
          level: 2,
          oneLiner: {
            zh: "有机物分子里的原子被其他原子替换，如甲烷氯代。",
            en: "An atom is replaced by another, e.g. chlorination of methane.",
          },
          detail: {
            zh: "取代反应是有机物分子里某个原子或原子团被别的原子或原子团替换掉，特点是有出有进——去掉一个又换上另一个。典型是甲烷与氯气在光照下，C–H 上的氢逐个被氯替换，得到 CH₃Cl、CH₂Cl₂、CHCl₃、CCl₄ 与 HCl 的混合物，这是一步接一步连锁进行的自由基反应。中学常见的取代还有：苯的硝化（苯环上的氢被硝基替换）、酯化反应（酸脱羟基、醇脱氢，属取代）、酯与卤代烃的水解、以及油脂的皂化。凡看到某原子被换走、同时掉下小分子，多属取代。它与只加不上、双键变单键的「加成反应」恰好相反，两者与「消去反应」「官能团」共同搭起有机反应类型的骨架。",
            en: "A substitution reaction swaps one atom or group in an organic molecule for another, its hallmark being give-and-take — something leaves and something else takes its place. The classic case is methane with chlorine under light, where the C–H hydrogens are replaced one after another, yielding a mixture of CH₃Cl, CH₂Cl₂, CHCl₃, CCl₄ and HCl through a stepwise radical chain. Other substitutions seen in school are nitration of benzene (a ring hydrogen swapped for a nitro group), esterification (the acid loses hydroxyl and the alcohol loses hydrogen, a substitution), hydrolysis of esters and haloalkanes, and saponification of fats. Whenever an atom is swapped out while a small molecule drops off, suspect substitution. It is the opposite of addition, which only adds across a double bond (see Addition), and together with elimination (see Elimination) and the functional group (see Functional Groups) it frames the main organic reaction types.",
          },
          eq: {
            lhs: "CH₄ + Cl₂",
            cond: { zh: "光照", en: "light" },
            rhs: "CH₃Cl + HCl",
          },
          subs: [
            {
              f: "CH₄",
              name: { zh: "甲烷", en: "Methane" },
              note: {
                zh: "被取代的有机物，C–H 中的氢被替换。",
                en: "The organic substrate; a C–H hydrogen is replaced.",
              },
              role: "l",
            },
            {
              f: "Cl₂",
              name: { zh: "氯气", en: "Chlorine" },
              note: {
                zh: "光照下产生氯自由基，作取代试剂。",
                en: "Forms chlorine radicals under light; the substituting agent.",
              },
              role: "l",
            },
            {
              f: "CH₃Cl",
              name: { zh: "一氯甲烷", en: "Chloromethane" },
              note: {
                zh: "取代主产物（气体）。",
                en: "Main substitution product (gas).",
              },
              role: "r",
            },
            {
              f: "HCl",
              name: { zh: "氯化氢", en: "Hydrogen chloride" },
              note: {
                zh: "伴随生成的取代副产物。",
                en: "Co-product of the substitution.",
              },
              role: "r",
            },
          ],
          tags: [{ zh: "有机反应", en: "Reaction" }],
        },
        {
          id: "org-addition",
          icon: "➕",
          term: { zh: "加成反应", en: "Addition" },
          level: 2,
          oneLiner: {
            zh: "不饱和键断开，两端加上其他原子，如乙烯使溴水褪色。",
            en: "Atoms add across a double bond; e.g. ethene decolorizes bromine water.",
          },
          detail: {
            zh: "加成反应是有机物里的不饱和键（C=C、C≡C 等）断开其中一个，两端的原子各加上新的原子或原子团，结果是只进不出、由不饱和变饱和。乙烯通入溴水，Br—Br 断开加到两个碳上生成 1,2-二溴乙烷，橙黄的溴水因此褪色，这是鉴别乙烯（或烯烃）与甲烷的常用方法；乙烯也能使酸性高锰酸钾褪色，但那是氧化而非加成。氢气加成把植物油变成人造奶油、把苯加氢成环己烷，水加成得乙醇、氯化氢加成得氯乙烷。能发生加成是因为含不饱和键，故它常与「取代反应」对照记忆——一个加而不掉、一个换而有出，二者都围绕「官能团」的不饱和程度展开。",
            en: "An addition reaction opens one link of an unsaturated bond such as C=C or C≡C and attaches a new atom to each end, so the molecule only gains and never loses, turning unsaturated into saturated. Bubble ethene through bromine water and the Br—Br splits across the two carbons to give 1,2-dibromoethane, so the orange-brown color vanishes — the standard way to tell an alkene from methane. Ethene also bleaches acidified potassium permanganate, but that is oxidation, not addition. Adding hydrogen hardens vegetable oil into margarine and reduces benzene to cyclohexane; adding steam gives ethanol and adding HCl gives chloroethane. Addition happens only where an unsaturated bond exists, so it is set against substitution — one adds without dropping anything, the other swaps with something leaving (see Substitution), both circling the degree of unsaturation fixed by the functional group (see Functional Groups).",
          },
          eq: {
            lhs: "CH₂=CH₂ + Br₂",
            rhs: "CH₂BrCH₂Br",
          },
          subs: [
            {
              f: "CH₂=CH₂",
              name: { zh: "乙烯", en: "Ethene" },
              note: {
                zh: "含碳碳双键，加成反应物。",
                en: "Has a C=C double bond; the addition substrate.",
              },
              role: "l",
            },
            {
              f: "Br₂",
              name: { zh: "溴（溴水）", en: "Bromine water" },
              note: {
                zh: "断开双键加成，使溴水褪色。",
                en: "Adds across the double bond, decolorizing bromine water.",
              },
              role: "l",
            },
            {
              f: "CH₂BrCH₂Br",
              name: { zh: "1,2-二溴乙烷", en: "1,2-Dibromoethane" },
              note: {
                zh: "加成产物，双键变单键。",
                en: "Addition product; the double bond becomes single.",
              },
              role: "r",
            },
          ],
          tags: [{ zh: "有机反应", en: "Reaction" }],
        },
        {
          id: "org-elimination",
          icon: "💨",
          term: { zh: "消去反应", en: "Elimination" },
          level: 3,
          oneLiner: {
            zh: "脱去小分子生成不饱和键，如乙醇脱水制乙烯。",
            en: "Lose a small molecule to form a double bond; e.g. ethanol to ethene.",
          },
          detail: {
            zh: "消去反应与加成方向相反，它从有机物分子里脱去一个小分子（如 H₂O、HX），在相邻两个碳之间新生出不饱和键。典型是乙醇与浓硫酸共热到 170 ℃，分子内脱去一分子水生成乙烯；温度是这里的岔路口，140 ℃ 时两分子乙醇转而脱水成乙醚，那已是取代而非消去。发生消去有结构门槛：连着羟基或卤素的碳，其邻位碳上必须还留有氢（所谓 β-H），否则消不掉，故叔卤代烃最易消去、甲醇这类无邻位碳的不能消去。实验室制乙烯要迅速升至 170 ℃ 并加碎瓷片防暴沸。它与「加成反应」一进一出恰成对，又与「取代反应」同样受条件与结构支配。",
            en: "Elimination runs opposite to addition: a molecule loses a small fragment such as water or HX and a fresh unsaturated bond forms between two neighboring carbons. The textbook case is ethanol heated with concentrated sulfuric acid to 170 °C, shedding one water molecule within the same molecule to give ethene. Temperature is the fork in the road — at 140 °C two ethanol molecules instead dehydrate to ether, which is substitution, not elimination. Elimination has a structural gate: the carbon next to the one carrying the —OH or halogen must still hold a hydrogen (a β-H), or nothing can be eliminated, so tertiary haloalkanes eliminate most readily while methanol, having no neighboring carbon, cannot. In the lab, heat quickly to 170 °C and add porcelain chips against bumping. It pairs as the in-and-out mirror of addition (see Addition), and like substitution (see Substitution) it obeys both conditions and structure.",
          },
          eq: {
            lhs: "C₂H₅OH",
            cond: { zh: "浓硫酸 · 170℃", en: "conc. H₂SO₄, 170℃" },
            rhs: "CH₂=CH₂↑ + H₂O",
          },
          subs: [
            {
              f: "C₂H₅OH",
              name: { zh: "乙醇", en: "Ethanol" },
              note: {
                zh: "消去反应底物，脱去一分子水。",
                en: "Elimination substrate; loses one water molecule.",
              },
              role: "l",
            },
            {
              f: "H₂SO₄（浓）",
              name: { zh: "浓硫酸", en: "Concentrated sulfuric acid" },
              note: {
                zh: "催化剂兼脱水剂，170 ℃ 下促进消去。",
                en: "Catalyst and dehydrating agent; drives elimination at 170 °C.",
              },
              role: "c",
            },
            {
              f: "CH₂=CH₂↑",
              name: { zh: "乙烯（气体）", en: "Ethene (gas)" },
              note: {
                zh: "消去产物，新生碳碳双键。",
                en: "Elimination product with a new C=C bond.",
              },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: {
                zh: "被脱去的小分子。",
                en: "The small molecule eliminated.",
              },
              role: "r",
            },
          ],
          tags: [{ zh: "有机反应", en: "Reaction" }],
        },
        {
          id: "org-polymerization",
          icon: "🔗",
          term: { zh: "聚合反应", en: "Polymerization" },
          level: 2,
          oneLiner: {
            zh: "许多小分子（单体）加成结合成高分子，如聚乙烯。",
            en: "Many monomers join into a polymer, e.g. polyethylene.",
          },
          detail: {
            zh: "聚合反应把许多小分子（单体）连成大分子（高分子），分两类。加聚是含双键的单体打开不饱和键彼此首尾相接、不脱任何小分子，如 n 个乙烯 CH₂=CH₂ 聚成聚乙烯 [—CH₂—CH₂—]ₙ，聚丙烯、聚氯乙烯同理；缩聚则是单体带着两种官能团相互结合、每接一次便脱去一个小分子（水等），如苯酚与甲醛缩成酚醛树脂、二元酸与二元醇缩成涤纶、氨基酸缩聚成蛋白质。写聚合式要标清单体、链节与聚合度 n，并留意高分子里 n 不固定，故聚乙烯等是混合物而非纯净物。加聚本质是反复的「加成反应」，缩聚则伴随取代与「消去反应」式的脱水，判断单体上有无合适「官能团」是能否聚合的关键。",
            en: "Polymerization links many small molecules (monomers) into giant ones (polymers), in two flavors. Addition polymerization opens the double bonds of unsaturated monomers and joins them head to tail without dropping anything: n units of ethene CH₂=CH₂ link into polyethylene [—CH₂—CH₂—]ₙ, as do polypropylene and polyvinyl chloride. Condensation polymerization joins monomers that each carry two functional groups, losing a small molecule such as water at every link — phenol with formaldehyde to phenolic resin, a diacid with a diol to polyester, amino acids to protein. When writing a polymer formula mark the monomer, the repeat unit and the degree of polymerization n, and note that n is not fixed, so polyethylene and the like are mixtures rather than pure substances. Addition polymerization is repeated addition (see Addition) at heart, while condensation polymerization couples substitution with an elimination-like loss of water (see Elimination), and whether a monomer bears the right functional group (see Functional Groups) decides if it can polymerize.",
          },
          eq: {
            lhs: "nCH₂=CH₂",
            cond: { zh: "催化剂", en: "catalyst" },
            rhs: "[—CH₂—CH₂—]ₙ",
          },
          subs: [
            {
              f: "nCH₂=CH₂",
              name: { zh: "乙烯（单体）", en: "Ethene (monomer)" },
              note: {
                zh: "n 个单体经加成聚合。",
                en: "n monomers joining by addition.",
              },
              role: "l",
            },
            {
              f: "催化剂",
              name: { zh: "催化剂", en: "Catalyst" },
              note: {
                zh: "引发加聚反应的条件/介质。",
                en: "Medium that initiates the polymerization.",
              },
              role: "c",
            },
            {
              f: "[—CH₂—CH₂—]ₙ",
              name: { zh: "聚乙烯", en: "Polyethylene" },
              note: {
                zh: "加成聚合生成的高分子。",
                en: "The polymer formed by addition polymerization.",
              },
              role: "r",
            },
          ],
          tags: [{ zh: "有机反应", en: "Reaction" }],
        },
        {
          id: "org-sugar",
          icon: "🍬",
          term: { zh: "糖类", en: "Carbohydrates" },
          level: 1,
          oneLiner: {
            zh: "多羟基醛或酮，分单糖、二糖、多糖，是主要能源物质。",
            en: "Polyhydroxy aldehydes/ketones; mono-, di- and polysaccharides, the main energy source.",
          },
          detail: {
            zh: "糖类是多羟基的醛或酮，以及能水解成它们的物质，是细胞主要的能源。按能否水解分三层：单糖不能水解，如葡萄糖 C₆H₁₂O₆、果糖；二糖一分子水解给两分子单糖，如蔗糖得葡萄糖加果糖、麦芽糖得两分子葡萄糖；多糖一分子水解给许多葡萄糖，如淀粉与纤维素 (C₆H₁₀O₅)ₙ。葡萄糖含醛基，能发生银镜反应、也能把新制氢氧化铜还原成砖红的氧化亚铜，故称还原糖，蔗糖却无醛基不显此反应。淀粉遇碘变蓝，常用来检验淀粉或碘；纤维素人体因缺乏相应酶不能消化，却是促进肠蠕动的重要膳食成分。要破两个迷思：糖不一定甜（淀粉无味），甜的不一定是糖（木糖醇、糖精）。它们的性质差别正来自「官能团」与结构，与「蛋白质与氨基酸」同属基本营养物质。",
            en: "Carbohydrates are polyhydroxy aldehydes or ketones and the substances that hydrolyze into them, serving as the cell's main fuel. Sort them by whether they hydrolyze. Monosaccharides cannot, such as glucose C₆H₁₂O₆ and fructose. Disaccharides split into two monosaccharides — sucrose into glucose plus fructose, maltose into two glucose. Polysaccharides yield many glucose units — starch and cellulose, both written (C₆H₁₀O₅)ₙ. Because glucose carries an aldehyde group it gives the silver-mirror test and reduces fresh copper hydroxide to brick-red copper oxide, so it is a reducing sugar, whereas sucrose has no aldehyde and does neither. Starch turns blue with iodine, a classic test for either. Humans cannot digest cellulose, lacking the enzyme, yet it is valuable roughage that drives intestinal movement. Break two myths: a sugar need not taste sweet (starch is bland) and something sweet need not be a sugar (xylitol, saccharin). Their differences come from the functional group and structure (see Functional Groups), and alongside proteins they are basic nutrients.",
          },
          tags: [{ zh: "生命物质", en: "Biomolecule" }],
        },
        {
          id: "org-protein",
          icon: "🥚",
          term: { zh: "蛋白质与氨基酸", en: "Proteins & Amino Acids" },
          level: 1,
          oneLiner: {
            zh: "由氨基酸缩合而成的高分子，是生命活动的承担者。",
            en: "Polymers of amino acids; the workhorses of life.",
          },
          detail: {
            zh: "蛋白质是由氨基酸缩合而成的高分子化合物，是生命活动的承担者。氨基酸同一分子上带着碱性的氨基 —NH₂ 与酸性的羧基 —COOH，两者脱水缩合形成肽键 —CO—NH—，许多氨基酸连成长链并盘曲成特定空间结构，才成为有活性的蛋白质。蛋白质有几件标志性质：变性，受加热、重金属盐、强酸强碱、酒精等作用结构破坏而失去活性，且不可逆，这正是高温灭菌、误食重金属喝牛奶或鸡蛋解毒、酒精消毒的原理；显色，遇浓硝酸变黄（含苯环的蛋白质），可作检验；灼烧有烧焦羽毛的气味，用来区别真羊毛与化纤；盐析，加浓的轻金属盐溶液析出、可逆，用于分离提纯。酶本身就是蛋白质，兼具高效性与专一性。它由「聚合反应」里的缩聚形成，性质差异仍系于「官能团」，与「糖类」同属人体必需营养素。",
            en: "Proteins are polymers built from amino acids and are the machines that carry out the work of life. Each amino acid bears a basic amino group —NH₂ and an acidic carboxyl —COOH on the same molecule; they condense, losing water, into a peptide bond —CO—NH—, and many residues form a long chain that folds into a specific shape before the protein becomes active. Proteins show several signature behaviors. Denaturation — heat, heavy-metal salts, strong acid or base and alcohol wreck the structure and the protein loses activity irreversibly, which is why autoclaving sterilizes, why milk or egg white is drunk after heavy-metal poisoning, and why alcohol disinfects. Color — a yellowing with concentrated nitric acid for proteins bearing aromatic rings, used as a test. Burning — a scorched-feather smell that tells real wool from synthetic fiber. Salting-out — a reversible precipitation with concentrated light-metal salt solutions, used to separate them. Enzymes are proteins, both highly efficient and highly specific. Proteins arise by condensation polymerization (see Polymerization), their differences still trace to the functional group (see Functional Groups), and alongside carbohydrates (see Carbohydrates) they are essential nutrients.",
          },
          tags: [{ zh: "生命物质", en: "Biomolecule" }],
        },
        {
          id: "org-hydrocarbon",
          icon: "🛢️",
          term: { zh: "烃类家族（烷、烯、炔与苯）", en: "Hydrocarbon Families" },
          level: 2,
          oneLiner: {
            zh: "只含碳氢的有机物四大类：饱和的烷烃、含双键的烯烃、含三键的炔烃与芳香的苯。",
            en: "The four carbon-hydrogen families: saturated alkanes, double-bond alkenes, triple-bond alkynes and aromatic benzene.",
          },
          detail: {
            zh: "烃是只由碳和氢组成的有机物，按碳骨架与是否饱和分成四大类，性质主要由这条分界决定。烷烃（甲烷、乙烷）碳碳之间全是单键、已达饱和，通式 CₙH₂ₙ₊₂，化学上较不活泼，特征反应是在光照下发生取代（见「取代反应」），燃烧时火焰淡蓝而几乎无烟。烯烃（乙烯）含一个碳碳双键 C=C、通式 CₙH₂ₙ，双键里较活泼的那一半一断就能加成（见「加成反应」），所以既能使溴水褪色、也能被酸性高锰酸钾氧化，是鉴别与除杂的抓手；乙烯产量常被看作石油化工水平的标尺。炔烃（乙炔）含碳碳三键，乙炔氧炔焰温度极高，用于切割金属。芳香烃以苯为代表，苯环结构特殊——既非单键也非双键，六个碳共用一圈离域电子，故苯较稳定，通常不能使溴水或酸性高锰酸钾褪色，却能发生取代（如硝化）。同系物结构相似、组成相差若干个 CH₂（见「同分异构体」），碳数递增则熔沸点渐升。四大烃燃烧都生成二氧化碳和水，含碳量越高火焰越亮、烟越浓，这正是甲烷、乙烯、乙炔火焰明暗不同的根源。",
            en: "Hydrocarbons contain only carbon and hydrogen and split into four families by skeleton and saturation, which largely fixes how they behave. Alkanes (methane, ethane) carry only single carbon-carbon bonds and are saturated, formula CnH2n+2; relatively unreactive, their signature reaction is substitution under light (see Substitution), and they burn with a pale, near-smokeless blue flame. Alkenes (ethene) hold one carbon-carbon double bond C=C, formula CnH2n, and the weaker half of that bond opens to add reagents (see Addition), so they decolourise bromine water and are oxidised by acidified permanganate — the handle for identifying and purging them, and ethene output is read as a barometer of a country's petrochemical industry. Alkynes (ethyne) carry a triple bond, and the ethyne-oxygen blowpipe burns hot enough to cut metals. Aromatics are led by benzene, whose ring is unusual - neither single nor double bonds but six carbons sharing a ring of delocalised electrons - so benzene is fairly stable, does not normally fade bromine water or acidified permanganate, yet undergoes substitution such as nitration. Homologues share structure and differ by CH2 units (see Isomers), and rising carbon number lifts melting and boiling points. All four burn to carbon dioxide and water, and the higher the carbon fraction the brighter and smokier the flame - the reason methane, ethene and ethyne show visibly different flames.",
          },
          tags: [{ zh: "有机", en: "Organic" }],
        },
        {
          id: "org-alcohol-phenol",
          icon: "🍶",
          term: { zh: "醇与酚", en: "Alcohols & Phenols" },
          level: 2,
          oneLiner: {
            zh: "同是羟基 —OH，连在脂肪烃基上是醇、连在苯环上却是性质迥异的酚。",
            en: "Both carry hydroxyl -OH, but on an alkyl chain it is an alcohol and on a benzene ring a very different phenol.",
          },
          detail: {
            zh: "醇与酚都带羟基 —OH，区别只在羟基连在谁身上：连在链状脂肪烃基上是醇，连在苯环上是酚，同一个官能团因「邻居」不同而性质大异（见「官能团」）。乙醇是最常见的醇，俗称酒精，与水以任意比互溶，可作燃料与溶剂，医用消毒约 75%。它有两类重要反应：一是氧化，在铜或银催化并加热时被空气氧化为乙醛（即下方方程式），完全燃烧则氧化成二氧化碳和水；二是消去，浓硫酸加热到约 170 ℃ 时脱去一分子水生成乙烯（见「消去反应」）。甲醇有毒，误饮可致盲。酚以苯酚为代表，有弱酸性、能与氢氧化钠反应却一般不与碳酸钠放出二氧化碳，遇氯化铁溶液显紫色，这是检验酚的灵敏反应，久置空气中慢慢泛粉红。甘油即丙三醇，是多羟基醇，吸水保润用于护肤。羟基还能与羧基缩合成酯（见「酯化反应与酯」）。",
            en: "Alcohols and phenols both bear a hydroxyl -OH, and differ only in what that group hangs on: on a chain carbon it is an alcohol, on a benzene ring a phenol, so one and the same group (see Functional Groups) behaves apart by its neighbours. Ethanol, familiar as the alcohol in drinks, mixes with water in any ratio, serves as fuel and solvent, and is used near 75 % as a disinfectant. It shows two key reactions. Oxidation - over a copper or silver catalyst and heated it is taken by air to ethanal (the equation below), while burning oxidises it fully to carbon dioxide and water. Elimination - with concentrated sulfuric acid at about 170 °C it loses a molecule of water to give ethene (see Elimination). Methanol is toxic and can blind if swallowed. Phenol is weakly acidic, reacts with sodium hydroxide yet generally gives no carbon dioxide from sodium carbonate, and turns violet with iron(III) chloride, a sensitive test for it, slowly flushing pink in air. Glycerol is a tri-hydroxyl alcohol that holds moisture and is used in skincare. A hydroxyl can also condense with a carboxyl to form an ester (see Esterification & Esters).",
          },
          eq: {
            lhs: "2CH₃CH₂OH + O₂",
            cond: { zh: "铜或银催化 · 加热 △", en: "Cu/Ag catalyst, Δ" },
            rhs: "2CH₃CHO + 2H₂O",
          },
          subs: [
            {
              f: "CH₃CH₂OH",
              name: { zh: "乙醇", en: "Ethanol" },
              note: {
                zh: "羟基连在链状碳上，属醇；被氧化。",
                en: "Hydroxyl on a chain carbon, an alcohol; is oxidised.",
              },
              role: "l",
            },
            {
              f: "O₂",
              name: { zh: "氧气", en: "Oxygen" },
              note: {
                zh: "空气中的氧化剂。",
                en: "The oxidising agent from air.",
              },
              role: "l",
            },
            {
              f: "CH₃CHO",
              name: { zh: "乙醛", en: "Ethanal" },
              note: {
                zh: "氧化产物，含醛基 —CHO。",
                en: "Oxidation product; carries the aldehyde group -CHO.",
              },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: {
                zh: "脱去的氢与氧结合成水。",
                en: "The removed hydrogen leaves as water.",
              },
              role: "r",
            },
          ],
          tags: [{ zh: "有机", en: "Organic" }],
        },
        {
          id: "org-esterification",
          icon: "🧴",
          term: { zh: "酯化反应与酯", en: "Esterification & Esters" },
          level: 2,
          oneLiner: {
            zh: "酸脱羟基、醇脱氢，缩合生成带香味的酯，是可逆的取代反应。",
            en: "The acid sheds hydroxyl and the alcohol a hydrogen to condense into a fragrant ester - a reversible substitution.",
          },
          detail: {
            zh: "酯化反应是羧酸与醇在浓硫酸催化、加热的条件下脱去一分子水、生成酯和水的反应，规律是「酸脱羟基、醇脱氢」：酸去掉 —OH、醇去掉羟基上的 H 结合成水，余下两部分接成酯基 —COO—，所以酯化属于取代反应（见「取代反应」）。最典型的是乙酸与乙醇生成有果香味的乙酸乙酯；反应可逆，浓硫酸既催化又吸水以提高产率，收集时用饱和碳酸钠溶液吸收，除去挥发的酸与醇并降低酯的溶解度。酯类多有芳香气味，广泛用于香精与溶剂。油脂是高级脂肪酸与甘油形成的酯，在碱性条件下水解生成肥皂和甘油，即皂化反应。酯在酸或碱中都能水解，恰好是酯化的逆过程。它与「官能团」中的酯基、与醇的羟基（见「醇与酚」）环环相扣。",
            en: "Esterification is the reaction of a carboxylic acid with an alcohol, catalysed by concentrated sulfuric acid and heated, to give an ester and a molecule of water. The rule is 'acid loses hydroxyl, alcohol loses hydrogen': the acid drops its -OH and the alcohol its O-H to form water, and the two leftovers join through the ester group -COO-, which is why esterification counts as substitution (see Substitution). The classic case is acetic acid with ethanol forming fragrant ethyl ethanoate; the reaction is reversible, the concentrated acid both catalyses and absorbs water to lift the yield, and the product is collected over saturated sodium carbonate that mops up escaping acid and alcohol while lowering the ester's solubility. Esters often smell pleasant and are widely used in flavourings and solvents. Fats and oils are esters of long-chain fatty acids with glycerol, and under base they hydrolyse into soap and glycerol - saponification. Esters hydrolyse under either acid or base, the exact reverse of their making. They link the ester group among the functional groups (see Functional Groups) to the hydroxyl of alcohols (see Alcohols & Phenols).",
          },
          eq: {
            lhs: "CH₃COOH + C₂H₅OH",
            cond: { zh: "浓硫酸 · 加热 △（可逆）", en: "conc. H2SO4, Δ (reversible)" },
            rhs: "CH₃COOC₂H₅ + H₂O",
          },
          subs: [
            {
              f: "CH₃COOH",
              name: { zh: "乙酸", en: "Acetic acid" },
              note: {
                zh: "提供羧基，脱去羟基 —OH。",
                en: "Supplies the carboxyl and loses hydroxyl -OH.",
              },
              role: "l",
            },
            {
              f: "C₂H₅OH",
              name: { zh: "乙醇", en: "Ethanol" },
              note: {
                zh: "提供羟基氢，脱去氢。",
                en: "Supplies the hydroxyl hydrogen and loses it.",
              },
              role: "l",
            },
            {
              f: "CH₃COOC₂H₅",
              name: { zh: "乙酸乙酯", en: "Ethyl ethanoate" },
              note: {
                zh: "有果香味的酯，难溶于饱和碳酸钠溶液。",
                en: "A fragrant ester, poorly soluble in saturated sodium carbonate.",
              },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: {
                zh: "酸的羟基与醇的氢结合生成。",
                en: "From the acid's hydroxyl plus the alcohol's hydrogen.",
              },
              role: "r",
            },
          ],
          tags: [{ zh: "有机反应", en: "Reaction" }],
        },
      ],
    },
    /* ===================== 溶液与化学计算 ===================== */
    {
      key: "solutions",
      icon: "🧪",
      title: { zh: "溶液与化学计算", en: "Solutions & Calculations" },
      items: [
        {
          id: "mole",
          icon: "🔢",
          term: { zh: "物质的量与摩尔", en: "Mole & Avogadro's Number" },
          level: 1,
          oneLiner: {
            zh: "连接微观粒子与宏观质量的桥梁，1 mol 含约 6.02×10²³ 个粒子。",
            en: "Bridges particles and mass; 1 mol holds about 6.02×10²³ entities.",
          },
          detail: {
            zh: "物质的量是把微观粒子数与宏观质量、体积连起来的桥梁，单位摩尔（mol），符号 n。1 mol 任何指定粒子的数目都等于阿伏伽德罗常数 Nₐ 约 6.02×10²³，它把一个数不到也摸不着的「个数」换成可以称量的量。四条换算都绕着 n 转：n = m/M（质量除以摩尔质量）、n = N/Nₐ（粒子数除以常数）、标准状况下气体用 n = V 除以 22.4 L/mol、溶液里 n = cV。用摩尔必须讲清是哪种微粒，说「1 mol 氧」是含糊的，要写明 1 mol O 原子还是 1 mol O₂ 分子；摩尔质量以 g/mol 为单位时数值上正好等于相对原子或分子质量，这是「摩尔」在计算里最好用的一处巧合。",
            en: "Amount of substance bridges the uncountable micro world and the weighable macro one; its unit is the mole (mol) and its symbol n. One mole of any specified particles holds Avogadro's number NA, about 6.02×10²³, turning a count you can never reach into a mass you can. Four conversions run through n: n = m/M, n = N/NA, for gases at STP n = V over 22.4 L/mol, and in solution n = cV. You must name the entity — saying one mole of oxygen is ambiguous, so write O atoms or O₂ molecules. Numeric in grams per mole it equals relative formula mass, which is what makes the mole so handy in calculation (see Mole).",
          },
          tags: [{ zh: "计算", en: "Calculation" }],
        },
        {
          id: "molarity",
          icon: "💧",
          term: { zh: "物质的量浓度", en: "Molarity" },
          level: 2,
          oneLiner: {
            zh: "单位体积溶液里所含溶质的物质的量，单位 mol/L。",
            en: "Moles of solute per litre of solution, in mol/L.",
          },
          detail: {
            zh: "物质的量浓度 c 指单位体积溶液里所含溶质的物质的量，单位 mol/L。关键在 V 是溶液体积而不是溶剂体积：把 58.5 g NaCl 溶进 1 L 水，得到的并不是 1 mol/L。配制一定浓度溶液的标准步骤是算、称量、溶解、移液、洗涤、定容、摇匀——溶解后冷却，用玻璃棒引流转入容量瓶，再洗涤烧杯和玻璃棒两三次一并注入，加水到离刻度线 1–2 cm 处改用胶头滴管，让凹液面最低点与刻度线相切。定容时俯视会让体积偏小、浓度偏高，仰视则偏低；容量瓶只能用来配制、不能久存或受热、也不能长时间盛碱液。需要 480 mL 溶液时要选 500 mL 容量瓶、按 0.5 L 计算（见「摩尔」）。",
            en: "Molarity c is moles of solute per liter of solution, unit mol/L. The catch is that V is the solution volume, not the solvent, so dissolving 58.5 g of NaCl in 1 L of water does not give 1 mol/L. The make-up runs weigh, dissolve, cool, transfer with a glass rod, rinse the beaker two or three times into the flask, fill to 1–2 cm below the mark, then finish with a dropper until the meniscus bottom just touches the line. Reading from above shrinks the volume and makes it too strong; from below too weak. A volumetric flask only prepares — it stores nothing, takes no heat and no long-held alkali. Need 480 mL and you must pick a 500 mL flask and work from 0.5 L (see Mole).",
          },
          tags: [{ zh: "计算", en: "Calculation" }],
        },
        {
          id: "dilution",
          icon: "🫗",
          term: { zh: "溶液稀释", en: "Dilution" },
          level: 2,
          oneLiner: {
            zh: "加水稀释前后溶质的量不变，据此计算浓度。",
            en: "Solute amount stays constant when diluting; the basis of c₁V₁ = c₂V₂.",
          },
          detail: {
            zh: "稀释只加水，溶质的物质的量守恒，于是稀释定律 c₁V₁ = c₂V₂ 成立，用它算该量取多少浓溶液、再加水定容到多少体积：配 100 mL 0.1 mol/L 稀硫酸，就取 1 mol/L 母液 10 mL 加水稀释。浓硫酸稀释必须把酸沿器壁缓缓注入水里并不断搅拌，切不可反过来——水密度小浮在上面，溶解时放的大量热会让酸液飞溅伤人。质量分数 w 与物质的量浓度之间靠密度 ρ 换算：c = 1000ρw/M（w 取小数）。同一溶质密度越大，等质量混合与等体积混合所得浓度并不相同；对氨水、酒精这类密度小于水的溶液，混合后浓度的偏向还会反过来，判断时要盯住密度方向（见「物质的量浓度」）。",
            en: "Dilution only adds water, so the moles of solute are conserved and the dilution law c₁V₁ = c₂V₂ holds; use it to find how much stock to measure and to what volume to top up. To make 100 mL of 0.1 mol/L dilute sulfuric acid you take 10 mL of 1 mol/L stock and add water. Concentrated sulfuric acid must be poured slowly down the wall into water with stirring, never the reverse, because water sits on top and the heat of mixing sprays acid. Linking mass fraction w to molarity needs density: c = 1000ρw/M with w as a decimal. Equal-mass and equal-volume mixing give different concentrations, and the bias flips for light solutions like ammonia or alcohol that float below water's density, so always track the density direction (see Molarity).",
          },
          tags: [{ zh: "计算", en: "Calculation" }],
        },
        {
          id: "solubility",
          icon: "🧂",
          term: { zh: "溶解度与饱和溶液", en: "Solubility & Saturation" },
          level: 2,
          oneLiner: {
            zh: "一定温度下某固体在 100 g 溶剂里达到饱和所溶解的质量。",
            en: "Grams of solute that saturate 100 g of solvent at a given temperature.",
          },
          detail: {
            zh: "固体溶解度指一定温度下某物质在 100 g 溶剂里达到饱和时所溶解的克数，随温度画成溶解度曲线：多数固体如 KNO₃ 随温度升高明显增大，少数如 NaCl 变化平缓，极少数如熟石灰 Ca(OH)₂ 反而随温度升高而减小；气体则随温度升高、随压强减小而逸出，所以把水烧开时锅底先冒气泡。曲线上每一点都对应饱和溶液，线下是不饱和，线上方的点则正在析出晶体。分离提纯据此选路：溶解度受温度影响大的用降温（冷却）结晶，受温度影响小的如食盐用蒸发结晶，除掉 KNO₃ 中混的少量 NaCl 就走冷却结晶。还要注意饱和与不饱和、浓与稀是两套坐标——饱和溶液不一定浓，稀溶液也不一定不饱和（见「物质的量浓度」）。",
            en: "A solid's solubility is the grams that dissolve in 100 g of solvent to reach saturation at a given temperature, drawn as a curve: most solids such as KNO₃ rise steeply with heat, a few like NaCl barely move, and rare ones such as slaked lime Ca(OH)₂ actually fall; gases leave as temperature rises and pressure drops, which is why bubbles form at the bottom before water boils. Every point on the curve is saturated, below it unsaturated, and a point above is shedding crystals. Purification follows the shape: salts that rise steeply are recovered by cooling crystallization, flat ones like table salt by evaporation, and cooling crystallization is how a little NaCl is stripped from KNO₃. Note that saturated-versus-unsaturated and concentrated-versus-dilute are two separate pairs — a saturated solution need not be concentrated, and a dilute one need not be unsaturated (see Molarity).",
          },
          tags: [{ zh: "溶液", en: "Solution" }],
        },
        {
          id: "electrolyte",
          icon: "⚡",
          term: { zh: "电解质与非电解质", en: "Electrolytes" },
          level: 2,
          oneLiner: {
            zh: "在水溶液或熔融态能导电的化合物为电解质，反之非电解质。",
            en: "Compounds conducting in solution or melt are electrolytes; others are non-electrolytes.",
          },
          detail: {
            zh: "电解质是在水溶液里或熔融状态下能导电的化合物，导电靠的是它自身电离出自由移动的离子；非电解质在这两种情况下都以分子存在、不导电。判断要点是必须由化合物本身电离：SO₃、CO₂、NH₃ 溶于水能导电，但导电的离子是它们与水反应生成的，它们本身仍属非电解质；单质与混合物既不算电解质也不算非电解质。强电解质（强酸、强碱和绝大多数盐）在水中完全电离，电离方程式用等号；弱电解质（弱酸如醋酸、弱碱如氨水、以及水）只部分电离，存在「弱电解质的电离平衡」，用可逆号。能导电不等于就是电解质——铜、石墨导电却是单质，NaCl 固体不导电因为离子不能自由移动，熔融或溶解后才行；而电离既然是可逆过程，也同样受「化学平衡」移动规律的支配。",
            en: "An electrolyte is a compound that conducts in aqueous solution or as a melt because it ionizes into free-moving ions; a non-electrolyte stays as molecules in both states. The test is whether the compound itself ionizes: SO₃, CO₂ and NH₃ conduct in water only because they first react with it, so they remain non-electrolytes, while elements and mixtures are neither. Strong electrolytes — strong acids, strong bases and most salts — ionize completely and are written with an equals sign; weak ones — acetic acid, ammonia water, water itself — ionize only partly and sit in an ionization equilibrium, written with a reversible arrow (see Ionization Equilibrium). Conducting does not make something an electrolyte: copper and graphite conduct yet are elements, and solid NaCl does not conduct because its ions cannot move, only melting or dissolving frees them; and since ionization is reversible it obeys chemical equilibrium like any other (see Chemical Equilibrium).",
          },
          eq: {
            lhs: "NaCl",
            rhs: "Na⁺ + Cl⁻",
            rel: "equal",
          },
          subs: [
            {
              f: "NaCl",
              name: {
                zh: "氯化钠（强电解质）",
                en: "Sodium chloride (strong electrolyte)",
              },
              note: { zh: "溶于水完全电离。", en: "Ionizes fully in water." },
              role: "l",
            },
            {
              f: "Na⁺",
              name: { zh: "钠离子", en: "Sodium ion" },
              note: { zh: "电离出的阳离子。", en: "Cation released." },
              role: "r",
            },
            {
              f: "Cl⁻",
              name: { zh: "氯离子", en: "Chloride ion" },
              note: { zh: "电离出的阴离子。", en: "Anion released." },
              role: "r",
            },
          ],
          tags: [{ zh: "溶液", en: "Solution" }],
        },
        {
          id: "ph",
          icon: "🎯",
          term: { zh: "pH 与酸碱度", en: "pH & Acidity" },
          level: 2,
          oneLiner: {
            zh: "衡量溶液酸碱性强弱的标度，pH = −lg c(H⁺)。",
            en: "Scale of acidity; pH = −log c(H⁺).",
          },
          detail: {
            zh: "pH 是把氢离子浓度取负对数得到的标度，pH = −lg c(H⁺)，它把跨十几个数量级的酸碱强弱压进 0 到 14 这一把尺里。常温 25 ℃ 下水的离子积 Kw = 1×10⁻¹⁴，中性时 c(H⁺) = c(OH⁻) = 1×10⁻⁷、pH 恰为 7；pH 小于 7 为酸性、大于 7 为碱性，每差 1 个单位氢离子浓度就差 10 倍。要提醒的是中性不等于 pH 一定等于 7——温度升高 Kw 变大，100 ℃ 时中性 pH 约 6.1 却仍是中性。测 pH 时把待测液用玻璃棒蘸取点在试纸上、不能把试纸伸进试剂或先把试纸润湿，读整数用广泛 pH 试纸、要精确值用 pH 计；粗判酸碱性可借「酸碱指示剂与 pH」里石蕊、酚酞的变色。强酸每稀释 10 倍 pH 升 1，但酸再怎么稀释也越不过中性那条线，这背后是水的电离平衡（见「弱电解质的电离平衡」）。",
            en: "pH folds a hydrogen-ion concentration spanning many orders of magnitude onto one ruler by taking its negative logarithm, pH = minus log of c(H⁺). At 25 °C water's ion product Kw is 1×10⁻¹⁴, so a neutral solution has H⁺ and OH⁻ each at 1×10⁻⁷ and a pH of exactly 7; below 7 is acidic, above is basic, and each unit is a tenfold change. But neutral does not always mean pH 7 — heat swells Kw, so at 100 °C neutrality sits near pH 6.1 yet stays neutral. To measure, dab the sample onto paper with a glass rod rather than dipping the strip or pre-wetting it; use broad-range paper for whole numbers and a meter for precision, and litmus or phenolphthalein for a rough acid-base call (see Indicators and pH). Diluting a strong acid tenfold lifts its pH by one, yet no dilution can push an acid past the neutral line, held back by water's own ionization equilibrium (see Ionization Equilibrium).",
          },
          tags: [{ zh: "溶液", en: "Solution" }],
        },
        {
          id: "stoich",
          icon: "🧮",
          term: { zh: "根据化学方程式的计算", en: "Calculation from Equations" },
          level: 2,
          oneLiner: {
            zh: "以方程式中各物质的系数比为桥梁，由已知量求未知量。",
            en: "Use the coefficient ratio as the bridge from known to unknown.",
          },
          detail: {
            zh: "根据化学方程式的计算，核心是方程式系数之比等于各物质的物质的量之比，再借「物质的量与摩尔」把 mol 换成可称量的质量、可量取的气体体积或溶液的「物质的量浓度」。规范解法是设未知量、写出配平好的方程式、标出相关物质的相对分子质量与已知量、列比例求解、简明作答。关键陷阱是代入的必须是纯净物的量：含杂质的粗品要先乘纯度、气体体积若非标准状况不能直接除以 22.4、若有反应物过量还得先做过量计算找出真正用完的那种。以 2H₂ + O₂ = 2H₂O 为例，系数 2:1:2 即物质的量之比，也即 4 g 氢气恰好与 32 g 氧气生成 36 g 水，质量在这里同时满足质量守恒。它与守恒法、差量法、关系式法共同构成中学化学计算的四把主要算盘。",
            en: "Calculation from a chemical equation rests on one idea: the coefficients give the mole ratio, and the mole (see Mole & Avogadro's Number) turns that into weighable mass, measurable gas volume or solution concentration (see Molarity). The tidy method is to let the unknown, write a balanced equation, mark the relative masses and known quantities under the relevant substances, set the proportion and solve. The traps are that only pure-substance amounts go in: a crude sample must first be multiplied by its purity, a gas volume counts as 22.4 L/mol only at STP, and an excess mixture must be settled by limiting-reagent logic first. Take 2H2 + O2 = 2H2O: the 2:1:2 is the mole ratio, so 4 g of hydrogen meets exactly 32 g of oxygen to give 36 g of water, and mass is conserved throughout. It joins conservation, difference and relationship methods as the four main tools of school calculation.",
          },
          eq: {
            lhs: "2H₂ + O₂",
            cond: { zh: "点燃", en: "ignite" },
            rhs: "2H₂O",
            rel: "equal",
          },
          subs: [
            {
              f: "H₂",
              name: { zh: "氢气", en: "Hydrogen" },
              note: { zh: "系数 2，2 mol 约 4 g。", en: "Coefficient 2; 2 mol about 4 g." },
              role: "l",
            },
            {
              f: "O₂",
              name: { zh: "氧气", en: "Oxygen" },
              note: { zh: "系数 1，1 mol 为 32 g。", en: "Coefficient 1; 1 mol is 32 g." },
              role: "l",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "系数 2，2 mol 为 36 g。", en: "Coefficient 2; 2 mol is 36 g." },
              role: "r",
            },
          ],
          tags: [{ zh: "计算", en: "Calculation" }],
        },
        {
          id: "conservation",
          icon: "⚖️",
          term: { zh: "守恒法", en: "Conservation Method" },
          level: 3,
          oneLiner: {
            zh: "抓住反应前后某量不变——质量、元素、电子或电荷，绕开中间步骤求解。",
            en: "Track what never changes — mass, element, electrons or charge — and skip the middle.",
          },
          detail: {
            zh: "守恒法是化学计算里最省路数的一类：抓住变化前后始终不变的那个量列等式，就能跳过繁琐的中间过程。四种守恒最常用。质量守恒——参加反应各物总质量等于生成物总质量，所以密闭容器反应前后总质量不变、差出的质量就是跑掉的气体或沉淀；元素守恒——某种元素的原子反应前后总数不变，多步转化也能一路追到底；电子守恒——「氧化还原反应」里失电子总数等于得电子总数，是算氧化剂、还原剂用量的利器；电荷守恒——溶液里阳离子所带正电荷总数等于阴离子的，用于求未知离子浓度。守恒法把过程压缩成一张收支表，往往一步到位，与需按系数比例的根据化学方程式的计算互为补充。",
            en: "The conservation method is the shortest road in calculation: pin down the quantity that never changes, write one equation and skip the messy middle. Four conservations rule. Mass — the reactants total equals the products total, so in a sealed vessel the mass is fixed and any missing mass is the gas or precipitate that escaped. Element — the atoms of an element are conserved across every step, so you can trace one straight from start to finish. Electron — in a redox reaction electrons lost equal electrons gained (see Redox), the sharpest tool for oxidant and reductant amounts. Charge — in solution total positive charge equals total negative charge, used to find an unknown ion concentration. Conservation compresses a whole process into a balance sheet, often solved in one line, complementing the coefficient-ratio route.",
          },
          eq: {
            lhs: "CH₄ + 2O₂",
            cond: { zh: "点燃", en: "ignite" },
            rhs: "CO₂ + 2H₂O",
          },
          subs: [
            {
              f: "CH₄",
              name: { zh: "甲烷", en: "Methane" },
              note: { zh: "1 mol 16 g，含 1 个碳 4 个氢。", en: "1 mol is 16 g; one C, four H." },
              role: "l",
            },
            {
              f: "O₂",
              name: { zh: "氧气", en: "Oxygen" },
              note: { zh: "系数 2，共 64 g。", en: "Coefficient 2; 64 g in all." },
              role: "l",
            },
            {
              f: "CO₂",
              name: { zh: "二氧化碳", en: "Carbon dioxide" },
              note: { zh: "碳全部转入，44 g。", en: "All the carbon lands here, 44 g." },
              role: "r",
            },
            {
              f: "H₂O",
              name: { zh: "水", en: "Water" },
              note: { zh: "氢全部转入，2 mol 共 36 g。", en: "All the hydrogen lands here, 36 g." },
              role: "r",
            },
          ],
          tags: [{ zh: "计算", en: "Calculation" }],
        },
        {
          id: "difference",
          icon: "📉",
          term: { zh: "差量法", en: "Difference Method" },
          level: 3,
          oneLiner: {
            zh: "利用反应前后质量或体积的差与系数差成正比来求解。",
            en: "Use the before-after gap, proportional to the coefficient gap, to solve.",
          },
          detail: {
            zh: "差量法抓的是反应前后某个量的变化差：固体增了多少、气体少了多少、溶液轻了多少，这个差与方程式里对应物质的系数差成正比，据此可绕过不易测的初态或终态直接算出参加反应的量。典型是固体受热分解放气——如 CaCO₃ 分解成 CaO 与 CO₂↑，留下的固体每减少 44 份质量就对应分解了 100 份 CaCO₃，减少的量正是跑掉的 CO₂；有气体参与也可用体积差，点燃合成气后总体积的缩减就对应反应掉的比例。用差量法的前提是认清差从何来：跑掉的气体、析出的沉淀、置换时进出固体的质量差都是差量来源，把它与系数差对齐才能列对比例。它与根据化学方程式的计算同源，只是把基准从某物质的量换成那个差值。",
            en: "The difference method works on the change itself: how much a solid gains or loses, how much gas shrinks — that gap is proportional to the difference in coefficients, so you can find the reacting amount without ever measuring the awkward start or end. The classic case is a solid that gives off gas on heating: CaCO3 breaks into CaO and CO2, and every 44 parts of mass the residue loses corresponds to 100 parts of CaCO3 decomposed, the loss being exactly the escaped CO2; gas reactions allow a volume difference too. The prerequisite is knowing where the difference comes from — escaping gas, precipitate dropping out, or the mass swap when one metal displaces another — then aligning it with the coefficient gap. It shares a root with calculation from equations, only the anchor moves from a substance's amount to the difference.",
          },
          eq: {
            lhs: "CaCO₃",
            cond: { zh: "高温", en: "high temp" },
            rhs: "CaO + CO₂↑",
          },
          subs: [
            {
              f: "CaCO₃",
              name: { zh: "碳酸钙", en: "Calcium carbonate" },
              note: { zh: "固体 100 g 分解。", en: "100 g of solid decomposes." },
              role: "l",
            },
            {
              f: "CaO",
              name: { zh: "氧化钙", en: "Calcium oxide" },
              note: { zh: "残留固体 56 g。", en: "Residue solid, 56 g." },
              role: "r",
            },
            {
              f: "CO₂↑",
              name: { zh: "二氧化碳（气体）", en: "Carbon dioxide (gas)" },
              note: { zh: "逸出致固体减重 44 g。", en: "Escapes, so solid loses 44 g." },
              role: "r",
            },
          ],
          tags: [{ zh: "计算", en: "Calculation" }],
        },
        {
          id: "limiting",
          icon: "⛓️",
          term: { zh: "过量计算", en: "Limiting Reagent" },
          level: 3,
          oneLiner: {
            zh: "反应物有多有少时，先判谁先用完，产物量由不足的那种决定。",
            en: "With unequal reactants, find which runs out first; it sets the yield.",
          },
          detail: {
            zh: "把不按配平比例投料的几种反应物放在一起反应，必有一种先耗尽、另一种有剩余，这就是限量反应物与过量问题；计算生成物的量必须以先用完、量不足的那个为准，用过量者会算出根本不存在的产量。判断谁不足不能只看质量谁小，要比较换算成同一种单位后的比值：把各反应物除以其方程式系数，商最小的就是先用完的限量物质。例如 Zn + 2HCl 中若给 1 mol Zn 与 1 mol HCl，HCl 的比值 1/2 小于 Zn 的 1/1，故盐酸先用完、由 HCl 决定放出多少 H₂，剩余的锌不算数。金属与酸反应还要叠加「金属活动性顺序」判断到底能不能反应。核心口诀是：先定限量、再以限量为基准计算，切勿拿过量者的数去乘。",
            en: "When reactants are not mixed in the exact equation ratio, one runs out first while the other is left over — the limiting-reagent problem, and products must be computed from whichever is exhausted, never from the surplus one, which would predict yield that cannot exist. Deciding which limits is not a matter of smaller mass but of the smaller ratio: divide each reactant by its coefficient and the smallest quotient marks the limiting species. In Zn + 2HCl, give 1 mol Zn and 1 mol HCl, and since HCl's ratio 1/2 falls below Zn's 1/1 the acid is used up first and sets the hydrogen formed, leftover zinc counting for nothing; metal-plus-acid also needs the reactivity series to say whether they react at all (see The Reactivity Series of Metals). Fix the limit first, then compute from it; never multiply up the excess figure.",
          },
          eq: {
            lhs: "Zn + 2HCl",
            rhs: "ZnCl₂ + H₂↑",
          },
          subs: [
            {
              f: "Zn",
              name: { zh: "锌", en: "Zinc" },
              note: { zh: "1 mol 65 g，系数 1。", en: "1 mol is 65 g; coefficient 1." },
              role: "l",
            },
            {
              f: "HCl",
              name: { zh: "盐酸", en: "Hydrochloric acid" },
              note: { zh: "系数 2，常先被耗尽。", en: "Coefficient 2; often spent first." },
              role: "l",
            },
            {
              f: "ZnCl₂",
              name: { zh: "氯化锌", en: "Zinc chloride" },
              note: { zh: "产物之一。", en: "One product." },
              role: "r",
            },
            {
              f: "H₂↑",
              name: { zh: "氢气", en: "Hydrogen" },
              note: { zh: "产量由限量者决定。", en: "Yield set by the limiting one." },
              role: "r",
            },
          ],
          tags: [{ zh: "计算", en: "Calculation" }],
        },
        {
          id: "relationship",
          icon: "🔗",
          term: { zh: "关系式法", en: "Relationship Method" },
          level: 3,
          oneLiner: {
            zh: "把多步反应串成起始物与终产物间的计量关系式，一步算到底。",
            en: "Chain multi-step reactions into one start-to-end ratio and solve at once.",
          },
          detail: {
            zh: "工业生产常连着好几步，逐步算费时且易在中间量上出错；关系式法的办法是抓住贯穿全程不变的元素或电子，把首尾物质直接写成一个计量关系式，一步到位。如接触法制硫酸，硫先烧成 SO₂、再氧化成 SO₃、最后被浓硫酸吸收成 H₂SO₄，硫原子全程守恒，于是得关系式 S ～ SO₂ ～ SO₃ ～ H₂SO₄，简作 S ～ H₂SO₄，只要知道硫的量就能直接算出可得的硫酸，中间三步不必分别列式。同理氨氧化法制硝酸有 N ～ NO ～ NO₂ ～ HNO₃，即 N ～ HNO₃（见「工业合成氨」里讨论的氨催化氧化一路）。用关系式法的前提是找出那条守恒主线：多数靠某原子守恒，个别多步氧化还原则靠电子守恒把首尾氧化数一对即得；它比守恒法更进一步之处在于跳过了所有中间步骤。",
            en: "Industry often runs several linked steps, and solving them one by one is slow and error-prone in the intermediates; the relationship method finds the element or electrons that thread the whole line and writes start and end substance as a single ratio, done at once. In making sulfuric acid, sulfur is burned to SO2, oxidized to SO3, then absorbed into H2SO4; the sulfur atom is conserved throughout, giving S ~ SO2 ~ SO3 ~ H2SO4, simply S ~ H2SO4, so from the sulfur you know the acid directly with no separate equations. Likewise catalytic oxidation of ammonia on to nitric acid gives N ~ NO ~ NO2 ~ HNO3, that is N ~ HNO3, the same catalytic ammonia-oxidation chain (see Ammonia Synthesis). The prerequisite is spotting the conserved backbone, usually one atom, or across several redox steps the electrons pairing first and last oxidation states; it goes past plain conservation by leaping over every intermediate.",
          },
          eq: {
            lhs: "2SO₂ + O₂",
            rhs: "2SO₃",
            rel: "equilibrium",
          },
          subs: [
            {
              f: "SO₂",
              name: { zh: "二氧化硫", en: "Sulfur dioxide" },
              note: { zh: "硫的第一步氧化产物。", en: "First oxidation product of S." },
              role: "l",
            },
            {
              f: "O₂",
              name: { zh: "氧气", en: "Oxygen" },
              note: { zh: "系数 1，催化氧化加入。", en: "Coefficient 1, added in catalytic oxidation." },
              role: "l",
            },
            {
              f: "SO₃",
              name: { zh: "三氧化硫", en: "Sulfur trioxide" },
              note: { zh: "硫全部转入，再制硫酸。", en: "All sulfur lands here, then to acid." },
              role: "r",
            },
          ],
          tags: [{ zh: "计算", en: "Calculation" }],
        },
      ],
    },
    /* ===================== 化学反应与能量 ===================== */
    {
      key: "energy",
      icon: "🔥",
      title: { zh: "化学反应与能量", en: "Reaction Energy & Thermochemistry" },
      items: [
        {
          id: "exo-endo",
          icon: "🌡️",
          term: { zh: "放热与吸热反应", en: "Exothermic & Endothermic" },
          level: 1,
          oneLiner: {
            zh: "反应伴随能量变化：放出热量为放热，吸收热量为吸热。",
            en: "Reactions release (exothermic) or absorb (endothermic) heat.",
          },
          detail: {
            zh: "一切化学反应都伴随能量变化，因为断键要吸收能量、成键会释放能量，两边不相等，多余或不足的部分就以热的形式进出。从宏观看就是：生成物总能量低于反应物则放热，高于则吸热；用键能算则是 ΔH = 反应物总键能 − 生成物总键能，算出负值即放热。常见放热反应：所有燃烧与缓慢氧化（铁生锈、食物腐败也是氧化放热，只是慢得感觉不到）、中和反应、金属与酸、铝热反应、绝大多数化合反应。常见吸热反应：Ba(OH)₂·8H₂O 与 NH₄Cl 在烧杯里搅拌即变凉、能把底下水滴冻住（课本里最经典的演示，同时能闻到氨味）、C + CO₂ 高温生成 2CO、高温下水煤气反应 C + H₂O 生成 CO + H₂、大多数分解反应（如 KClO₃、CaCO₃）、以及盐类水解。这里有一个必须分开的边界：NH₄NO₃ 或尿素溶解于水吸热、NaOH 固体溶解放热，但它们是溶解过程而不是化学反应，所以不能叫吸热反应（医用冰袋靠的就是溶解热）。三句反常最能纠正死记硬背：放热反应不一定常温就能发生，煤和汽油都得先点火到达着火点才能自持（放热与活化能是两件事）；吸热反应不一定需要加热，上面那个钡盐与氯化铵在室温就自己在进行；需要高温的反应不一定吸热，铝热反应用镁条引燃后却剧烈放热到能炼出铁水——「反应条件与热效应无关」是这一块最集中的易错点。图像题只需记住：反应物与生成物的能量差就是 ΔH，催化剂只把活化能 Eₐ 的山坡削低、既不改变 ΔH、也不改变到底是放热还是吸热。从能源角度看，人类利用的化学反应主要是为了取能，但并非所有能源都来自燃烧：太阳能直接利用、风能与水能归根到底来自太阳、核能属于原子核变化。",
            en: "Every chemical reaction carries energy with it, because breaking bonds absorbs and forming bonds releases, and the mismatch between the two enters or leaves as heat. In macroscopic terms the products sit lower than the reactants when heat is given out and higher when it is taken in; computed from bond energies the sign works out as ΔH = total bond energy of the reactants minus that of the products, a negative answer meaning exothermic. Typical exothermic cases: all combustion and slow oxidation (rusting and spoiling food are oxidations too, merely too gentle to feel), neutralisation, metals with acids, the thermite reaction, most combination reactions. Typical endothermic cases: barium hydroxide octahydrate ground with ammonium chloride, which chills the beaker enough to freeze the water under it and smells of ammonia (the classic classroom demonstration), C + CO₂ at red heat giving 2CO, the steam-on-hot-carbon gas reaction C + H₂O giving CO + H₂, most decomposition reactions, and salt hydrolysis. One boundary must be drawn carefully: dissolving ammonium nitrate chills water and dissolving solid sodium hydroxide heats it, but those are solution processes rather than chemical reactions, so they are not endothermic or exothermic reactions — the instant cold pack in a first-aid kit runs on heat of solution, nothing more. Three awkward facts are what correct the memorised rules. Exothermic does not mean spontaneous at room temperature: coal and petrol both need a match to reach ignition before they sustain themselves, because heat released and activation energy are different questions. Endothermic does not mean heating is required: the barium salt reaction above proceeds by itself on the bench. And a reaction that needs a furnace is not necessarily endothermic: thermite is lit with a magnesium ribbon and then pours out molten iron while giving off enormous heat. Reaction conditions and heat effect are simply unrelated, which is the densest trap in this section. For energy diagrams remember only that the gap between reactants and products is ΔH, while a catalyst lowers the hill of activation energy between them without touching either the value or the sign. As an energy source, chemistry is mostly used to release heat, but not every energy stream is combustion: sunlight is captured directly, wind and hydro ultimately come from the sun, and nuclear power is a change inside the nucleus rather than in the electron cloud.",
          },
          tags: [{ zh: "能量", en: "Energy" }],
        },
        {
          id: "enthalpy",
          icon: "📉",
          term: { zh: "反应热与焓变", en: "Enthalpy Change" },
          level: 2,
          oneLiner: {
            zh: "恒压下的反应热称焓变 ΔH，放热为负、吸热为正。",
            en: "Heat at constant pressure, ΔH: negative for exothermic, positive for endothermic.",
          },
          detail: {
            zh: "反应热是化学反应放出或吸收的热量，恒压条件下测得的反应热在数值上就是焓变 ΔH，单位 kJ/mol，放热取负、吸热取正——比较两个 ΔH 谁大必须带着符号比，−100 kJ/mol 比 −50 kJ/mol 小而不是大。热化学方程式有三条铁规。第一必须标聚集状态 s、l、g、aq，因为同一物质状态不同能量就不同：氢气燃烧生成 H₂O(l) 放 285.8 kJ/mol、生成 H₂O(g) 只放 241.8 kJ/mol，差的 44 kJ 就是水的汽化热。第二 ΔH 与化学计量数成正比，所以热化学方程式允许分数系数，H₂ + ½O₂ = H₂O 对应 −285.8，写成 2H₂ + O₂ = 2H₂O 就得写 −571.6；计量数只表示物质的量而不表示分子个数。第三不写↑↓、不写反应条件与催化剂，也不写可逆符号。逆反应的 ΔH 与正反应数值相同、符号相反。求 ΔH 有两条方向恰好相反的路：用键能时是反应物总键能减生成物总键能，用标准生成焓时是生成物总生成焓减反应物总生成焓——把两式写成同一个顺序是最集中的错误，记住键能本身代表拆开它需要吸收的能量、而成键放出能量，所以键能路径要反过来减。测定靠量热计，公式 Q = cmΔT，水的比热容取 4.18 J/(g·℃)，再除以生成物质的量得到 ΔH。另一条路是当反应热无法直接测准时用盖斯定律叠加求出，因为焓只由始态与终态决定。",
            en: "The heat given out or taken in by a reaction is its heat of reaction, and measured at constant pressure that value is precisely the enthalpy change ΔH, stated in kJ per mole, negative when heat is released and positive when it is absorbed. Comparing two ΔH values means comparing them with their signs, so −100 kJ/mol is smaller than −50, not larger. A thermochemical equation obeys three hard rules. First, every phase must be labelled s, l, g or aq, because the same substance stores different energy in different states: burning hydrogen to H₂O(l) releases 285.8 kJ/mol while to H₂O(g) releases only 241.8, the missing 44 being the latent heat of vaporisation. Second, ΔH scales with the stoichiometric numbers, so fractional coefficients are perfectly legal here — H₂ + ½O₂ = H₂O carries −285.8, while 2H₂ + O₂ = 2H₂O must carry −571.6, and the numbers count moles rather than molecules. Third, no gas or precipitate arrows, no conditions, no catalyst over the equals sign, and no reversibility symbol. Turning a reaction around keeps the magnitude of ΔH and flips its sign. There are two routes to ΔH and, confusingly, they subtract in opposite directions: from bond energies it is reactants minus products, from standard enthalpies of formation it is products minus reactants. Writing both in the same order is the single most common slip; the reason they differ is that a bond energy is the energy you must pay to break the bond, so the bond-energy route has to be inverted. Measurement uses a calorimeter and the formula Q = cmΔT, taking 4.18 J per gram per degree for water and then dividing by the amount of substance reacted. When a reaction cannot be measured cleanly at all, Hess's law builds its ΔH from reactions that can, which is possible precisely because enthalpy is fixed by the starting and ending states alone.",
          },
          tags: [{ zh: "能量", en: "Energy" }],
        },
        {
          id: "combustion-heat",
          icon: "🔥",
          term: { zh: "燃烧热", en: "Heat of Combustion" },
          level: 2,
          oneLiner: {
            zh: "1 mol 可燃物完全燃烧生成稳定氧化物时放出的热量。",
            en: "Heat released when 1 mol of a substance burns fully to stable oxides.",
          },
          detail: {
            zh: "燃烧热的定义里有四个限定，缺一个数值就不成立：25 ℃ 与 101 kPa、1 mol 纯可燃物、完全燃烧、生成稳定氧化物。稳定氧化物是指 C 到 CO₂(g) 而不是 CO、H 到 H₂O(l) 而不是水蒸气、S 到 SO₂、N 到 N₂。常见数据：C 393.5、CO 283.0、H₂ 285.8、CH₄ 890.3、乙醇 1366.8 kJ/mol。因为限定完全燃烧，碳若只烧到 CO 每 mol 只放 110.5 kJ，不到一半，所以炉子里黑烟或未烧尽的一氧化碳意味着能量白白扔掉了；同理写错水的状态会把数值差 44 kJ/mol。两条口径不能混：燃烧热按 1 mol 算，热值按 1 kg 算。氢的热值约 143 MJ/kg，是汽油（约 46 MJ/kg）的三倍多，这使它在重量能量密度上无可对手——火箭只用液氢液氧就是这个原因；但氢的体积能量密度极低，常压下得占据巨大体积，车用罐要充到约 70 MPa 或冷却到 −253 ℃ 液化，能耗与安全代价都落在储运上，这就是氢能推广真正难的地方而不是热值低。同素异形体之间也能比：金刚石的燃烧热 395.4 大于石墨的 393.5，两个相减得石墨→金刚石的 ΔH = +1.9 kJ/mol，说明金刚石能量更高、更不稳定，所以「金刚石比石墨硬也就比石墨稳定」是错的，硬是力学性质、稳定是能量高低。而 C→CO→CO₂ 两步燃烧热相加正好等于 C→CO₂，正是盖斯定律「与路径无关」最直接的一次体现。",
            en: "Four conditions are packed into the definition of a heat of combustion, and dropping any one invalidates the number: 25 ℃ and 101 kPa, exactly one mole of the pure fuel, complete combustion, and stable oxides as the products. Stable means carbon ending as CO₂ gas rather than CO, hydrogen as liquid water rather than steam, sulfur as SO₂ and nitrogen as N₂. Familiar values are 393.5 for carbon, 283.0 for CO, 285.8 for hydrogen, 890.3 for methane and 1366.8 kJ/mol for ethanol. Because completeness is built in, carbon burnt only as far as CO surrenders 110.5 kJ per mole, under a third of its full allowance, so black smoke and unburnt carbon monoxide in a flue are energy thrown away; likewise writing water as a gas instead of a liquid shifts the answer by 44 kJ/mol. Two yardsticks must not be confused: a heat of combustion is per mole, a fuel value is per kilogram. Hydrogen releases about 143 MJ per kilogram, more than three times petrol at roughly 46, which makes it unbeatable per unit of mass — the reason rockets burn liquid hydrogen with liquid oxygen — but its energy per unit of volume is dreadful, needing a tank at about 70 MPa or cooling to −253 ℃ to liquefy it, so the real cost of a hydrogen economy sits in storage and transport rather than in any shortage of heat. Allotropes can be ranked too: diamond burns at 395.4 against graphite's 393.5, and the difference is exactly the +1.9 kJ/mol of converting graphite into diamond, proving diamond holds more energy and is the less stable form, so the claim that diamond is more stable because it is harder confuses a mechanical property with an energy level. Finally, adding the two steps C→CO and CO→CO₂ reproduces C→CO₂ exactly, the plainest demonstration that heat depends on endpoints alone.",
          },
          tags: [{ zh: "能量", en: "Energy" }],
        },
        {
          id: "neutralization-heat",
          icon: "🤝",
          term: { zh: "中和热", en: "Heat of Neutralization" },
          level: 2,
          oneLiner: {
            zh: "稀强酸碱中和生成 1 mol 水时放出的热量，约 57.3 kJ/mol。",
            en: "Heat released forming 1 mol water from dilute strong acid and base, about 57.3 kJ/mol.",
          },
          detail: {
            zh: "中和热的定义卡得很细：在稀溶液里，酸与碱发生中和反应生成 1 mol H₂O 时的反应热，强酸强碱的中和热约 57.3 kJ/mol（即 ΔH = −57.3 kJ/mol）。它的本质是 H⁺ + OH⁻ = H₂O，与用的是哪一种强酸强碱无关，因为 Na⁺、Cl⁻、SO₄²⁻ 这些离子在反应前后没有变化。写热化学方程式时要把水配到 1 mol，所以其他物质的系数允许是分数，如 ½H₂SO₄(aq) + NaOH(aq) = ½Na₂SO₄(aq) + H₂O(l)。三个因素会让数值偏离 57.3，它们正好是三类常见判断题：弱酸或弱碱要边电离边反应而电离吸热，所以醋酸与 NaOH、氨水与盐酸的实测值都小于 57.3，醋酸与氨水两者都弱时偏离更大；浓硫酸或浓碱溶解放热，直接倒浓酸进去测得的结果会明显偏大；若中和同时生成沉淀，Ba(OH)₂ 与 H₂SO₄ 除了生成水还生成 BaSO₄，沉淀过程额外放热，实测大于 57.3。不要把中和热与「酸碱恰好完全反应」混为一谈，它只按生成的水计量，所以 1 mol H₂SO₄ 与 1 mol NaOH 反应只生成 1 mol 水，放热就是一个中和热而不是两个。生成盐和水的反应不一定叫中和反应：CO₂ + 2NaOH = Na₂CO₃ + H₂O，非金属氧化物与碱的反应不属于中和，金属氧化物与酸也不是，这是选择题里高频的错。实验上测中和热靠保温与快混：大小烧杯间填满碎泡沫塑料、用环形玻璃搅拌棒而不用金属棒（金属导热快，热量跑掉使测得 ΔH 偏大即绝对值偏小）、碱稍过量以保证酸完全反应、读混合后的最高温度而不是初始温度。",
            en: "The definition of a heat of neutralisation is deliberately narrow: in dilute solution, the heat change when an acid and a base react to form exactly 1 mol of water, which for a strong acid with a strong base is about 57.3 kJ/mol, written ΔH = −57.3. What it measures is H⁺ + OH⁻ = H₂O, which is why the identity of the strong acid or base does not matter — sodium, chloride and sulfate ions are unchanged on both sides. Because the water is pinned to one mole, every other coefficient may be fractional, as in ½H₂SO₄(aq) + NaOH(aq) = ½Na₂SO₄(aq) + H₂O(l). Three effects pull the number away from 57.3, and they are precisely the three judgements exams test. A weak acid or weak base must ionise as it reacts, and ionisation absorbs heat, so acetic acid with sodium hydroxide, and ammonia with hydrochloric acid, both give less than 57.3, the least when both partners are weak. Concentrated acid or base releases heat just by diluting, so pouring concentrated sulfuric acid straight in overstates the answer. And when precipitation accompanies neutralisation, barium hydroxide with sulfuric acid makes BaSO₄ as well as water, the extra heat of forming the precipitate pushes the value above 57.3. Do not confuse the definition with complete reaction: it counts water only, so 1 mol of sulfuric acid neutralised by 1 mol of sodium hydroxide yields one mole of water and therefore exactly one unit of neutralisation heat, not two. Salt plus water is not a reliable signature of neutralisation either: carbon dioxide absorbed by sodium hydroxide gives carbonate and water yet is not a neutralisation, and neither is a metal oxide dissolved in acid, another frequent true-or-false item. In the laboratory the measurement is a fight against escaping heat: foam plastic packed between the beakers, a ring stirrer of glass rather than metal since metal conducts heat out and makes the measured ΔH too small in absolute value, a slight excess of base to guarantee the acid is used up, and reading the highest temperature reached after mixing rather than the starting one.",
          },
          tags: [{ zh: "能量", en: "Energy" }],
        },
        {
          id: "hess-law",
          icon: "🧮",
          term: { zh: "盖斯定律", en: "Hess's Law" },
          level: 3,
          oneLiner: {
            zh: "反应热只与始态终态有关、与路径无关，可由已知反应叠加求得。",
            en: "ΔH depends only on initial and final states, so target reactions can be built from known ones.",
          },
          detail: {
            zh: "盖斯定律说：一个反应的反应热只与始态（各反应物）和终态（各生成物）有关，与中间途径无关。它的根子是焓为状态函数，是能量守恒在热化学里的具体形式——若沿着不同路径能得到不同热量，就可以造出不消耗能量而不断出热的循环，而这不可能。使用只有三个动作：某式逆向则 ΔH 变号；某式乘系数 k 则 ΔH 同乘 k；几式相加则 ΔH 相加，中间物同时消去。解题顺序建议固定下来：先写出目标方程式，再逐个看目标里的物种在各已知式的哪一边，需要它从右边换到左边就逆向整式、系数不对就乘上一个倍数，全部对齐后相加，最后逐项检查中间物是否消尽、每一物质的状态与系数是否与目标式一致。经典例子是 C + ½O₂ = CO 的 ΔH 根本测不准：碳燃烧时总伴随着 CO₂ 生成，无法控制它只烧到 CO，所以只能由 C→CO₂（−393.5）与 CO→CO₂（−283.0）两式相减得到 −110.5 kJ/mol。工业上高炉里 Fe₂O₃ 被 CO 逐步还原为 Fe₃O₄、FeO、Fe，各步热量也无法单独测，同样靠叠加算出。两个必错点要背住：叠加时物质的聚集状态必须一致，H₂O(l) 与 H₂O(g) 之间隔着 44 kJ/mol 的汽化热，不能当作同一种物质互相消掉；ΔH 是带符号的数，“相减”要先写成加上它的相反数再合并，直接把式子相减而忘了同时给 ΔH 换号，整题结果就反了。验算只有一个办法：把叠加后的左右各自合并化简，应与目标式逐项相同；若同一物种在两侧都出现且系数不等，只能按差值保留在一侧，剩下的才叫消去。",
            en: "Hess's law states that the heat of a reaction depends only on the initial state, the reactants as given, and the final state, the products as given, never on the route taken between them. Its foundation is that enthalpy is a state function, which is the law of energy conservation written for heat chemistry: if different routes yielded different heats, one could cycle a substance around for free and collect the difference as unlimited heat, which cannot happen. There are only three moves to master. Reversing an equation reverses the sign of its ΔH; multiplying an equation by k multiplies ΔH by k; adding equations adds their ΔH, and the intermediates cancel out of the sum. Fix the working order and this stops being guesswork: write the target equation first, then locate each of its species in the given equations, flip any equation that puts a needed substance on the wrong side, scale the ones whose coefficients disagree, add everything, and finally check that every intermediate has vanished and that each remaining substance matches the target in both phase and coefficient. The textbook case is C + ½O₂ = CO, whose ΔH cannot be measured at all, because burning carbon always produces some CO₂ alongside and the stop cannot be held at CO; the value −110.5 kJ/mol is therefore obtained only by subtracting the combustion of CO (−283.0) from the combustion of carbon (−393.5). In a blast furnace, carbon monoxide reduces iron oxide step by step through Fe₃O₄ and FeO down to iron, and the heat of each stage is likewise recovered by addition rather than measurement. Two mistakes are worth memorising because they are unavoidable otherwise. Phases must agree across the addition: H₂O(l) and H₂O(g) differ by 44 kJ/mol of vaporisation and must never be cancelled as if they were one substance. And ΔH carries its sign, so subtracting an equation means adding its negated ΔH, not subtracting a magnitude, which reverses the whole answer if missed. There is only one way to check the result: merge each side of the summed equations and simplify, and it must match the target term by term, remembering that a species appearing on both sides with unequal coefficients survives only as the difference.",
          },
          tags: [{ zh: "能量", en: "Energy" }],
        },
        {
          id: "energy-sources",
          icon: "🌍",
          term: { zh: "能源的分类与合理利用", en: "Energy Resources & Their Use" },
          level: 1,
          oneLiner: {
            zh: "能提供能量的资源，按可否再生与是否加工分类，化学能只是其中一支。",
            en: "Resources that supply energy, sorted by renewability and processing; chemical energy is one stream.",
          },
          detail: {
            zh: "凡是能提供能量的自然资源或资源产品都叫能源，而化学课关心的是其中靠化学反应（更确切说是靠电子云重排）放出的那一部分。第一层分类看能否再生：煤、石油、天然气是化石能源，由古代生物固定下来的太阳能经千万年压缩而成，用一点少一点，属不可再生能源；太阳能、风能、水能、生物质能、地热能、潮汐能可循环利用，属可再生能源。第二层分类看是否经过加工：直接从自然界取来的原煤、原油、天然气、水力是一次能源，而电能、汽油、柴油、焦炭、氢能必须由一次能源转化而来，是二次能源——所以「电能是可再生能源」这类说法在术语上就不成立，电只是能量的载体。我国能源结构仍以煤为主，煤占一次能源生产总量的一半以上，二氧化硫与碳排放的压力也正集中在这里。判断能源归属时有一条常被忽略的边界：核能来自原子核的变化，不属于化学反应，因此核电站并不是在「烧」燃料，可它的能量密度惊人——1 kg 铀-235 完全裂变放出的能量约相当于 2700 t 标准煤。化石能源的三重困境是有限、污染与分布不均，出路只能开源与节流并行：一边发展新能源，一边提高利用率。氢能常被寄望最高，因为它的热值约 143 MJ/kg（见「燃烧热」）且产物只有水，但真正的门槛不在热值而在三处——制取（当今绝大部分氢来自天然气重整，仍然排碳，绿氢靠电解水却又要求廉价电力）、储存与运输（常压气态的体积能量密度极低，须压缩到约 70 MPa 或冷却到 −253 ℃ 液化，能耗与安全性代价全部落在储运上）、以及罐体与加氢站的成本。太阳能则是几乎所有能源的上游：风与水循环由太阳驱动、生物质能直接固定太阳、化石能源是古代存下来的太阳能，只有核能与地热能例外。节约能源的做法并不玄妙：让燃料充分燃烧（把煤粉碎、把油雾化、给足空气，别让黑烟与一氧化碳把能量带走）、提高锅炉与发电效率、回收余热做热电联供，以及把二氧化碳当作可资源化的原料而不是废物（见「二氧化碳的捕集与资源化」）。",
            en: "Anything that can supply usable energy is an energy resource, and what chemistry cares about is the fraction released by rearranging the electron cloud rather than the nucleus. The first cut is renewability: coal, oil and natural gas are fossil fuels, ancient biomass that fixed sunlight and was compressed over tens of millions of years, so they are spent once spent and count as non-renewable, whereas sunlight, wind, running water, biomass, geothermal heat and the tides cycle on and count as renewable. The second cut is whether the supply was processed: raw coal, crude oil, natural gas and moving water taken straight from nature are primary energy, while electricity, petrol, diesel, coke and hydrogen must be made out of something else and are secondary — which is why calling electricity a renewable resource fails on the terminology, since electricity is a carrier of energy and not a source of it. China still leans on coal for more than half of its primary energy output, and that is where the pressure of sulfur dioxide and carbon emissions concentrates. One boundary is missed more often than any other: nuclear energy comes from changes inside the nucleus and not from a chemical reaction, so a reactor is not burning fuel in any chemical sense, yet its energy density is staggering, since fissioning one kilogram of uranium-235 releases about what burning 2700 tonnes of standard coal would. Fossil fuel is triple-bound — finite, dirty and unevenly distributed — and the way out needs two wheels turning together, opening new supplies while wasting less of the old. Hydrogen carries the highest hopes because its fuel value is roughly 143 MJ per kilogram and its only product is water, yet the barriers sit elsewhere: making it (almost all hydrogen today comes from steam reforming of natural gas and still emits carbon, while green hydrogen needs electrolysis and therefore cheap clean power), storing and moving it (at ordinary pressure it holds almost no energy per unit volume, so it must be driven up to some 70 MPa or chilled to −253 ℃ to liquefy, and both routes cost energy and raise safety questions), and the price of tanks and filling stations. Sunlight sits upstream of nearly everything else: wind and the water cycle are driven by it, biomass fixes it directly, and fossil fuels are sunlight saved from the distant past — nuclear and geothermal being the only exceptions. Conservation is unglamorous: burn the fuel properly by crushing the coal, atomising the oil and giving it enough air so that black smoke and carbon monoxide stop carrying energy away, raise boiler and generation efficiency, recover waste heat as combined heat and power, and treat carbon dioxide as a feedstock to be captured rather than a waste to be diluted.",
          },
          tags: [{ zh: "能量", en: "Energy" }],
        },
        {
          id: "calorimetry",
          icon: "🧪",
          term: { zh: "反应热的测定", en: "Measuring Heat of Reaction" },
          level: 2,
          oneLiner: {
            zh: "把反应关进已知热容的系统里量温升，按 Q = cmΔT 折算成 ΔH。",
            en: "Run the reaction in a system of known heat capacity and convert the temperature rise via Q = cmΔT.",
          },
          detail: {
            zh: "中和热、燃烧热都能测，测法都属于量热：把反应关在一个已知热容的系统里，量温度升高了多少，再按 Q = cmΔT 折成热量，除以生成水的物质的量或烧掉的可燃物的物质的量，就得到 ΔH。中学最熟悉的中和热装置是「大小烧杯加泡沫塑料」：量取 50 mL 0.50 mol/L 盐酸倒入小烧杯测初温，另取 50 mL 0.55 mol/L NaOH 溶液测得同一初温后一次迅速倒入，用环形玻璃搅拌棒上下轻轻搅动，读混合液能达到的最高温度。每一条操作背后都有一个理由。碱为什么稍过量？为了让限量的一侧（酸）反应完全，避免因酸残留而使放热打折。为什么两个量筒不能不洗就换着量？残留的酸碱会提前中和放热，把初温弄脏。为什么用环形玻璃搅拌棒而不用铜棒？金属导热快，热量顺着棒与壁跑掉，测得温差偏小，于是 ΔH 的绝对值偏小（带符号说就是 ΔH 偏大）。为什么不能猛搅？搅动过猛会溅出液体还要额外输入机械功，两处都把数值推向同一方向。为什么读最高温度而不是读最后温度？因为温度一旦开始下降就说明散热已经追上产热，峰值最接近绝热条件下的理论值。整套误差口诀只有六个字：保温、快混、读峰值——配套细节是小烧杯与盖板之间留缝要小、两杯壁间填满碎泡沫塑料、两杯杯口齐平。若要测燃烧热就得换氧弹量热计：把样品压成片放入充满高压氧气的钢弹，用电火花点燃，钢弹浸在定量水中，测水温升高；由于钢弹本体、搅拌与散热都会吸收或漏掉能量，必须先标定整个系统的热容（常用已知燃烧热的苯甲酸作标准物质），再用系统热容乘温升（Q = CΔT）算未知样品。至于那些根本测不准的反应热，正是盖斯定律的用武之地：碳烧到 CO 这一步总伴随 CO₂ 生成，无法在量热计里停在中间，只能由两条可测的燃烧反应相减得出。最后划一条概念边界：量热计测的中和热专指稀溶液中强酸强碱生成 1 mol 水的过程，任何弱电解质的电离吸热、浓溶液稀释的放热、生成沉淀的额外放热都会污染数值（见「中和热」）。",
            en: "Heats of neutralisation and combustion are both measured the same way, by calorimetry: confine the reaction inside a system of known heat capacity, read how far the temperature rose, convert that to heat with Q = cmΔT, then divide by the moles of water formed or of fuel burnt to obtain ΔH. The school apparatus is a pair of beakers with foam plastic between them: measure 50 mL of 0.50 mol/L hydrochloric acid into the small beaker and record its temperature, measure 50 mL of 0.55 mol/L sodium hydroxide, confirm the same starting temperature, pour it in in one quick motion, work a ring-shaped glass stirrer gently up and down, and read the highest temperature the mixture reaches. Every step has a reason behind it. Why the excess of base? So that the limiting reagent, the acid, is used up and no heat is withheld by leftover acid. Why may one graduated cylinder not be reused unrinsed? Residue neutralises ahead of time and dirties the starting temperature. Why a glass ring rather than a copper rod? Metal conducts, heat escapes along the rod and the wall, the temperature rise reads low, the magnitude of ΔH comes out small, which with the sign attached means ΔH itself reads too large. Why not stir hard? Splashing and the extra mechanical work both push the number the same way. Why read the peak rather than the final temperature? Once the curve turns downward, heat loss has overtaken heat production, so the maximum is the closest approach to the adiabatic value. The whole error analysis collapses into three instructions — insulate, mix fast, read the peak — with housekeeping details: a narrow gap under the lid, foam packed fully between the beakers, their rims level. Combustion needs a bomb calorimeter: press the sample into a pellet, fire it with a spark inside a steel bomb filled with oxygen under high pressure, sit the bomb in a known mass of water and watch its temperature; since the bomb itself, the stirrer and the leakage all take or lose energy, the heat capacity of the whole system must first be calibrated, classically with benzoic acid of known heat of combustion, and only then can Q = C·ΔT be applied to an unknown. Reactions that cannot be measured at all are precisely what Hess's law is for: burning carbon as far as CO always brings CO₂ along and cannot be halted mid-way inside a calorimeter, so −110.5 kJ/mol is recovered by subtracting one measurable combustion from another. Draw the conceptual boundary last: what the calorimeter calls the heat of neutralisation is strictly dilute strong acid with dilute strong base forming one mole of water, and ionisation of a weak electrolyte, dilution of a concentrated one, or a precipitate forming alongside all contaminate the figure.",
          },
          tags: [{ zh: "能量", en: "Energy" }],
        },
        {
          id: "bond-energy",
          icon: "🔗",
          term: { zh: "键能与物质稳定性", en: "Bond Energy & Stability" },
          level: 3,
          oneLiner: {
            zh: "拆开 1 mol 气态共价键吸收的能量，决定分子稳不稳，也用来算反应热。",
            en: "Energy to break 1 mol of a gaseous covalent bond; it sets molecular stability and gives ΔH.",
          },
          detail: {
            zh: "键能是在 25 ℃ 与 101 kPa 下把 1 mol 气态共价键拆开、得到气态原子所吸收的能量，单位 kJ/mol；反过来成键就放出等量能量。它是衡量共价键牢不牢的尺度，与键长（成键两核间的平均距离）此消彼长：同一对原子之间，三键比双键短而强、双键比单键短而强，所以 N≡N 的 946 kJ/mol 远大于 O=O 的 496 与 H—H 的 436。氮气在常温下几乎不与任何物质反应、被当作保护气、合成氨要高温高压加催化剂才勉强推进，根子都在这条最强韧的双原子键之一上；CO₂ 里的 C=O 约 803 kJ/mol、H₂O 里的 O—H 约 463 kJ/mol，同属「产物极其稳定」的一类，这正解释了为什么燃烧的最终产物二氧化碳与水不再继续燃烧。用键能算反应热只有一条式子：ΔH = 反应物总键能 − 生成物总键能。它的物理图像是「先花钱拆、再收钱建」，拆开的支出减去建回的进账就是净额，算出负值即放热。必须与用标准生成焓计算（产物减反应物）分清，两条路的相减方向恰好相反，把它们写成同一个顺序是这一节最集中的错误；记法是「键能管拆，拆的是反应物，所以反应物在前」。例：H₂ + Cl₂ = 2HCl，断键 436 + 243 = 679，成键 2 × 431 = 862，ΔH = 679 − 862 = −183 kJ/mol。三条边界要划清。第一，键能只适用于共价键，不能拿去说离子化合物或金属，它们对应的是晶格能与金属键的强弱，说「NaCl 的键能」是错的。第二，分子的稳定性看键能，物质的熔沸点却看晶体类型与作用力：金刚石与晶体硅都是共价晶体（原子晶体），但 C—C 键长短、键能大，故金刚石的熔点高于硅；碘分子里 I—I 键能虽小，熔化时破坏的只是分子间作用力而不是共价键，所以碘熔点很低却确有共价键——「键能大则熔沸点高」是偷换了对象。第三，反应热取决于断键与成键的总额之差，而不是某一个键能的大小，不能因为 O₂ 键能大就断言它的反应热一定大。",
            en: "Bond energy is the energy absorbed at 25 ℃ and 101 kPa to break one mole of a gaseous covalent bond into gaseous atoms, stated in kJ per mole, and forming the bond again gives back exactly the same amount. It is the yardstick of how tight a covalent bond is, and it trades against bond length, the mean distance between the two nuclei: between the same pair of atoms a triple bond is shorter and stronger than a double, a double than a single, which is why N≡N at 946 kJ/mol towers over O=O at 496 and H—H at 436. Nitrogen's near-total refusal to react at room temperature, its use as a shielding gas, and the furnace, pressure and catalyst that ammonia synthesis demands all trace back to one of the strongest diatomic bonds in existence; the C=O of about 803 kJ/mol in carbon dioxide and the O—H of about 463 in water belong to the same famously-settled class, which is why the ash of combustion refuses to burn further. One formula only turns bond energies into a heat of reaction: ΔH equals the total bond energy of the reactants minus that of the products. The picture behind it is pay first to tear down, collect later to build back, and the net of the two is ΔH, negative when the build wins. It must be kept apart from the standard enthalpy of formation route, products minus reactants, because the two subtract in opposite directions, and writing them alike is the densest error here; the memory hook is that bond energy is about breaking, and what gets broken is the reactants, so reactants come first. Example: for H₂ + Cl₂ = 2HCl, breaking costs 436 + 243 = 679 while forming pays 2 × 431 = 862, so ΔH = −183 kJ/mol. Three boundaries are worth drawing. Bond language applies to covalent bonds only, not to ionic solids or metals, whose strengths go by lattice energy and metallic bonding, so speaking of the bond energy of sodium chloride is simply wrong. Molecular stability is a matter of bond energy, but melting and boiling points are a matter of crystal type and inter-particle force: diamond and crystalline silicon are both covalent networks, yet the shorter, stronger C—C keeps diamond's melting point above silicon's, while iodine melts at a low temperature precisely because melting only prises molecules apart and never touches the I—I bond within them — claiming that a large bond energy means a high melting point has swapped the subject. And reaction heat comes from the difference between two totals, not from the size of any single bond energy, so a large O=O value does not oblige a large heat of reaction.",
          },
          tags: [{ zh: "能量", en: "Energy" }],
        },
      ],
    },
    /* ===================== 速率与化学平衡 ===================== */
    {
      key: "kinetics",
      icon: "⚖️",
      title: { zh: "速率与化学平衡", en: "Rate & Equilibrium" },
      items: [
        {
          id: "rate",
          icon: "⏱️",
          term: { zh: "化学反应速率", en: "Reaction Rate" },
          level: 1,
          oneLiner: {
            zh: "单位时间内浓度的变化，衡量反应快慢。",
            en: "Change of concentration per unit time; measures speed.",
          },
          detail: {
            zh: "速率的定义是 v = Δc/Δt，单位取 mol/(L·s) 或 mol/(L·min)；它是标量、只取正值，而且必须写明是用哪种物质表示的，因为同一反应用不同物质算出的数值不同，其比恰好等于化学计量数之比：合成氨里 v(H₂):v(N₂):v(NH₃) = 3:1:2。比较两个条件下的快慢时必须先换算成同一种物质，或各自除以计量数之后再比，否则会出现假结论——v(H₂) = 0.3 与 v(NH₃) = 0.2 看着不相等，换算成 N₂ 却都是 0.1，两条件其实一样快。中学阶段算的是某段时间内的平均速率，不是瞬时速率。两条禁用要记牢：固体（CaCO₃、锌粒）与纯液体的浓度视为常数，不能用它们的 Δc 表示速率，但固体的表面积确实影响速率，这两件事不要混。所有计算都靠三段式：起始量、转化量、某时刻量三行，其中转化量之比等于计量数之比，浓度则一律除以容器体积统一到 mol/L。加水稀释改变的是浓度而不是物质的量；恒温恒容下充入不参与反应的气体（如 He），总压升高而各组分浓度不变，速率不变；恒温恒压下充入惰性气体，体积膨胀使浓度下降、速率减慢——恒容与恒压这两种容器情形的分别是速率题里最集中的陷阱。最后，速率与转化率是两件事：速率讲快慢、转化率讲多少，催化剂能加快前者而完全不改变后者。",
            en: "Reaction rate is the change of concentration per unit time, v = Δc/Δt, quoted in mol per litre per second or per minute. It is a positive scalar and it always has to name the substance used, since the same reaction gives different numbers for different species in the ratio of their coefficients: in ammonia synthesis v(H₂) : v(N₂) : v(NH₃) = 3 : 1 : 2. Comparing two sets of conditions therefore requires converting both to the same substance first, or dividing each by its own coefficient, otherwise 0.3 for hydrogen and 0.2 for ammonia look unequal while both correspond to 0.1 for nitrogen and the two rates are in fact identical. School problems use average rates over an interval, never instantaneous ones. Two species may not be used: solids such as calcium carbonate or zinc granules, and pure liquids, whose concentration is a constant, so their Δc says nothing — although the surface area of a solid most certainly does change the rate, and the two points must not be confused. Every calculation rests on the three-row bookkeeping of initial amount, change and remaining amount, where the changes are forced into the ratio of the coefficients and concentrations are obtained by dividing by the volume of the container. Dilution alters concentration without altering the amount of substance; an inert gas admitted at constant volume raises the total pressure and leaves every concentration untouched, so the rate does not budge, whereas the same addition at constant pressure inflates the volume, lowers all concentrations and slows the reaction down. Telling the two vessels apart is the sharpest trap in the topic. Rate and conversion are finally not the same question: rate asks how fast, conversion asks how far, and a catalyst accelerates the first while leaving the second exactly where it was.",
          },
          tags: [{ zh: "速率", en: "Kinetics" }],
        },
        {
          id: "rate-factors",
          icon: "🎛️",
          term: { zh: "影响速率的因素", en: "Factors Affecting Rate" },
          level: 2,
          oneLiner: {
            zh: "浓度、压强、温度、催化剂都能改变反应速率。",
            en: "Concentration, pressure, temperature and catalysts all change rate.",
          },
          detail: {
            zh: "内因是反应物本身的性质，它起决定作用：钠与冷水剧烈反应而铁必须靠水蒸气，同浓度盐酸里镁比铁快得多。外因五条，机理分两类。浓度：增大反应物浓度使单位体积内活化分子数目增多、有效碰撞次数上升，速率加快，但活化分子百分数不变。压强：只有涉及气体才有意义，本质是改变浓度——压缩体积使浓度增大而速率加快；恒温恒容下充入不参与反应的气体，总压升高而各组分浓度不变，速率不变；恒温恒压下充入惰性气体则体积增大、浓度减小、速率减慢，两种容器必须分清。温度：升温使更多分子获得足够能量变成活化分子，活化分子百分数显著增大，所以温度对速率的影响远大于浓度，经验上每升高 10 ℃ 速率增到 2–4 倍。催化剂：降低反应所需活化能 Eₐ，使活化分子百分数剧增，并同等程度地加快正、逆两个方向的速率，因此它既不改 ΔH 也不改平衡位置，只缩短达到平衡所需的时间。其他因素有固体表面积（锌粉比锌粒快得多）、光照（HClO、AgNO₃ 见光分解，H₂ 与 Cl₂ 混合光照即爆炸）、溶剂与超声。最要紧的区分只有一句话：只有温度和催化剂能提高活化分子百分数，浓度与压强只增加单位体积内活化分子数而百分数不变，选择题专门在这里设坑。催化剂另有三性：选择性（同一催化剂对不同反应效果不同，酶更有专一性且怕高温）、中毒（铂与铁触媒遇含硫、磷或铅的杂质失活，因此汽车要烧无铅汽油并装三元催化）、以及参与反应而最终不变——反应前后质量与化学性质不变，物理状态可能改变，所以不能说催化剂不参加反应。",
            en: "The decisive factor is inside the reactants themselves: sodium rips through cold water while iron needs steam, and magnesium outruns iron in the same hydrochloric acid. Five external factors then work through two different mechanisms. Raising a concentration packs more activated molecules into each unit volume, so effective collisions multiply and the rate climbs, yet the fraction of activated molecules stays the same. Pressure matters only when gases are involved and is really a concentration change: squeezing the vessel speeds things up, while admitting helium at constant volume raises the total pressure and changes nothing at all, and admitting it at constant pressure stretches the volume and slows the reaction down. Temperature acts on the fraction itself, driving more molecules over the energy barrier, which is why its effect dwarfs every other lever — roughly a two- to four-fold increase per 10 ℃ by the old rule of thumb. A catalyst lowers the barrier and lifts that fraction sharply, accelerating the forward and reverse directions by the same factor, so it never changes ΔH, never moves the equilibrium position, and only shortens the wait for it. Surface area, light, solvent and ultrasound make up the rest: zinc dust beats a granule, and hypochlorous acid or silver nitrate decompose in the light. The one distinction worth memorising is that only temperature and a catalyst change the percentage of activated molecules, whereas concentration and pressure change only how many sit in each unit volume. Catalysts carry three further properties: selectivity, since one catalyst suits one reaction and enzymes are pickier still and denature in heat; poisoning, since sulfur, phosphorus or lead residues kill platinum and the iron contact, which is why cars need unleaded fuel and a three-way converter; and finally the fact that a catalyst does take part in the reaction and is merely regenerated at the end, so its mass and chemical properties are unchanged while its physical form may not be.",
          },
          tags: [{ zh: "速率", en: "Kinetics" }],
        },
        {
          id: "equilibrium",
          icon: "⚖️",
          term: { zh: "化学平衡状态", en: "Chemical Equilibrium" },
          level: 2,
          oneLiner: {
            zh: "正逆反应速率相等、各组分浓度保持不变的可逆状态。",
            en: "Forward and reverse rates equal; concentrations stay constant in a reversible reaction.",
          },
          detail: {
            zh: "可逆反应在同一条件下正、逆两个方向同时进行，因此反应物不可能全部转化，产率永远小于 100%。平衡的本质是 v正 = v逆，宏观表现是各组分浓度与百分含量保持不变；它是动态平衡——微观上分子仍在不停反应，只是生成与消耗相抵。判断是否已达到平衡分两类题。速率类必须同时满足一正一逆且换算后相等：对 N₂ + 3H₂ ⇌ 2NH₃，v正(H₂) = 3v逆(N₂) 是平衡，而 v正(H₂) = v逆(NH₃) 不平衡；两个都描述正方向的速率无论数值如何匹配都不能作判据。变量类要看原本会变的量现在不再变：恒温恒容的密闭容器里，总压强、气体总物质的量、平均摩尔质量、有色气体（如 NO₂ 的红棕色）的颜色都随反应进行而变化过，它们一旦不再变化就是平衡标志；反之，反应前后气体分子数相等的反应（H₂ + I₂(g) ⇌ 2HI）压强从头到尾不变，不能作标志；全部是气体且容器体积固定时密度始终不变，同样不能作标志。平衡常数 K 只随温度变化，K 越大说明正反应进行的程度越大。还要分开速率变化与平衡移动这两件事：加催化剂速率变了而平衡不移；改变压强对分子数相等的反应也不移。工业合成氨选 400–500 ℃、20–50 MPa 与铁触媒，正是速率与平衡互相妥协的结果：温度低对平衡有利但速率太慢，压强高既有利又推高设备与安全成本。",
            en: "A reversible reaction runs both ways under the same conditions, so no reactant can ever be converted completely and the yield stays below one hundred percent. Equilibrium means the forward and reverse rates have become equal, and its macroscopic sign is that every concentration and percentage stops changing; it is dynamic, since molecules are still reacting in both directions at full speed, merely cancelling each other out. Judging whether equilibrium has been reached splits into two question types. Rate statements must show one forward and one reverse rate and must agree after conversion: for N₂ + 3H₂ ⇌ 2NH₃ the equality v_forward(H₂) = 3 v_reverse(N₂) does signal equilibrium while v_forward(H₂) = v_reverse(NH₃) does not, and two statements that both describe the forward direction prove nothing however neatly they match. Constant statements must ask which quantities were still changing: in a rigid sealed vessel at fixed temperature, total pressure, total moles of gas, average molar mass and the colour of a gas such as reddish-brown NO₂ all move during the reaction, so each of them freezing is a genuine sign; but a reaction whose gas molecules balance on both sides, H₂ + I₂ ⇌ 2HI, never changes its pressure and cannot serve, and with every species gaseous in a fixed volume the density is constant from start to finish and is likewise worthless. The equilibrium constant K answers to temperature alone, and a larger K means the reaction has gone further toward products. Changing a rate is not the same as shifting an equilibrium: a catalyst speeds both directions and shifts nothing, and pressure changes leave a balanced reaction where it was. Industrial ammonia is run at 400–500 ℃ over an iron contact at 20–50 MPa precisely because rate and equilibrium pull in opposite directions — cold would favour the yield but is far too slow, and extra pressure helps but costs equipment and safety margin.",
          },
          eq: {
            lhs: "N₂ + 3H₂",
            cond: { zh: "高温高压 · 催化剂", en: "high T,P · catalyst" },
            rhs: "2NH₃",
            rel: "equilibrium",
          },
          subs: [
            {
              f: "N₂",
              name: { zh: "氮气", en: "Nitrogen" },
              note: {
                zh: "合成氨原料，来自空气分离。",
                en: "Feedstock from air separation.",
              },
              role: "l",
            },
            {
              f: "3H₂",
              name: { zh: "氢气", en: "Hydrogen" },
              note: {
                zh: "合成氨的另一原料。",
                en: "The other synthesis feedstock.",
              },
              role: "l",
            },
            {
              f: "催化剂",
              name: { zh: "铁触媒", en: "Iron catalyst" },
              note: {
                zh: "加快达到平衡，不改平衡位置。",
                en: "Speeds arrival at equilibrium without shifting it.",
              },
              role: "c",
            },
            {
              f: "2NH₃",
              name: { zh: "氨气", en: "Ammonia" },
              note: {
                zh: "可逆反应的生成物。",
                en: "Product of the reversible reaction.",
              },
              role: "r",
            },
          ],
          tags: [{ zh: "平衡", en: "Equilibrium" }],
        },
        {
          id: "le-chatelier",
          icon: "↔️",
          term: { zh: "勒夏特列原理", en: "Le Chatelier's Principle" },
          level: 3,
          oneLiner: {
            zh: "改变影响平衡的条件，平衡向减弱这种改变的方向移动。",
            en: "When a stress is applied, equilibrium shifts to counteract it.",
          },
          detail: {
            zh: "内容是：如果改变影响平衡的一个条件（浓度、温度、压强），平衡就向能够减弱这种改变的方向移动。关键字是减弱而不是消除：对 N₂ + 3H₂ ⇌ 2NH₃ 的平衡体系恒温恒容再充入 N₂，平衡正向移动，但新平衡时 N₂ 的浓度仍然比原平衡大，只是比刚充入完的那一瞬间小；升温使平衡向吸热方向移动，却并不能把温度降回原值——这一条最反直觉，也是判断题的主要落点。四条用法要连着限制条件一起记。浓度：增大反应物浓度平衡正移，该反应物自身的转化率反而降低，而另一种反应物的转化率升高，这就是工业上让廉价原料过量以提高贵重原料转化率的依据。压强：只对涉及气体且反应前后气体分子数不等的反应有意义，压缩体积增大压强使平衡向分子数少的一侧移动；若分子数相等（H₂ + I₂ ⇌ 2HI），改变压强不移动。温度：升温向吸热方向、降温向放热方向，且只有温度的改变才会改变平衡常数 K，因此凡是让 K 不变的操作都不可能是温度变化。催化剂完全不移动平衡；恒容时充入惰性气体各组分浓度没变，平衡不移动，而恒压时充入惰性气体相当于减压，平衡向分子数多的一侧移动。适用边界同样要讲清：原理只适用于已经达到平衡的体系，不能用来判断反应速率，也不能回答是否平衡；它的定量版本更可靠——比较浓度商 Q 与 K，Q 小于 K 正向进行、相等即平衡、大于 K 逆向进行，遇到几个条件同时改变的复杂情形就按 Q 与 K 判方向而不是背口诀。工业上把生成的 NH₃ 及时液化分离，就是用不断移走产物让平衡一路右移的办法。",
            en: "Le Chatelier's principle says that if one of the conditions controlling an equilibrium — concentration, temperature or pressure — is altered, the system shifts in the direction that weakens the change. The operative word is weaken, not undo: injecting extra nitrogen into a balanced N₂ + 3H₂ ⇌ 2NH₃ mixture at constant volume does shift it right, yet the new equilibrium still holds more nitrogen than the old one, less only than the instant after injection; heating drives a system toward the endothermic direction without ever pulling the temperature back down. This single subtlety is where most exam judgements are lost. Each lever carries its own condition. Raising a reactant concentration shifts the reaction forward but lowers that reactant's own percentage conversion while raising the other's, which is exactly why industry floods the expensive feedstock with a cheap excess. Pressure counts only for gas reactions whose molecule numbers differ across the equation; compressing shifts toward fewer molecules, and a balanced equation such as H₂ + I₂ ⇌ 2HI ignores pressure entirely. Temperature is the only lever that changes K itself, so any argument concluding that K has changed must be about temperature. A catalyst never shifts an equilibrium; an inert gas added at constant volume changes no concentration and moves nothing, while the same addition at constant pressure swells the volume and acts as a decompression, favouring the side with more molecules. The principle applies only to a system already at equilibrium, and it says nothing about how fast a reaction goes nor settles whether one has been reached; its quantitative replacement is more trustworthy, comparing the reaction quotient Q with K — below K the reaction runs forward, equal means balanced, above K it runs backward — which is how to treat cases where several conditions change at once instead of reciting a slogan. Industry liquefies and removes the ammonia as it forms, so continuous withdrawal keeps dragging the equilibrium to the right.",
          },
          tags: [{ zh: "平衡", en: "Equilibrium" }],
        },
        {
          id: "ionization-eq",
          icon: "🔬",
          term: { zh: "弱电解质的电离平衡", en: "Ionization Equilibrium" },
          level: 3,
          oneLiner: {
            zh: "弱酸弱碱部分电离，存在电离平衡，用电离度与 Ka 描述。",
            en: "Weak acids/bases partially ionize; described by degree of ionization and Ka.",
          },
          detail: {
            zh: "强弱电解质的分界只看是否完全电离，与溶解度和导电能力都无关：BaSO₄、AgCl 难溶，但溶进去的那一点完全电离，所以是强电解质；醋酸与水任意比混溶却是弱电解质——易溶就是强、难溶就是弱是错的。导电能力取决于离子浓度与离子所带电荷，极稀的强酸溶液可能比浓醋酸导电还弱。电离平衡同样是逆、等、动、定、变的动态平衡，且电离吸热，所以升温促进电离。三条影响方向要分清：加水稀释促进电离，电离度增大，但溶液里 c(H⁺) 仍然下降、pH 升高，因为体积涨得比新电离出的离子快；加入含相同离子的物质（醋酸里加醋酸钠或加盐酸）抑制电离，平衡左移；升温促进电离，Ka、Kw 都随之增大。Ka 只与温度有关，同一温度下 Ka 越大酸性越强。多元弱酸分步电离且第一步远大于第二步（H₂CO₃ 的 Ka1 约 4.4×10⁻⁷、Ka2 约 4.7×10⁻¹¹），所以 NaHCO₃ 溶液里 HCO₃⁻ 既能电离又能水解，最终以水解为主而显碱性。判断某酸是弱酸的三种实验办法最实用：同浓度同元酸比 pH，醋酸明显大于盐酸；同浓度同体积与足量锌反应，最终产氢量相同而醋酸开始慢、后期仍在产气（说明储备的分子还在不断电离补充）；把 pH 相同的两种酸各稀释 10 倍，盐酸 pH 正好升 1 个单位而醋酸升高不足 1。水的电离也归在这里：纯水在 25 ℃ 时 c(H⁺) = c(OH⁻) = 1×10⁻⁷ mol/L、Kw = 1×10⁻¹⁴，升到 100 ℃ 时 Kw 约为 5.5×10⁻¹³，中性水的 pH 约 6.1 而不是 7——pH = 7 就是中性只在 25 ℃ 成立。加酸加碱抑制水的电离，加入能水解的盐则促进水的电离。",
            en: "Strong and weak electrolytes are separated by one test only, whether ionisation is complete; neither solubility nor conducting ability belongs in the definition. Barium sulfate and silver chloride barely dissolve, yet every particle that does enter solution is fully ionised, so they are strong electrolytes, while acetic acid, miscible with water in all proportions, is weak — the belief that soluble means strong and insoluble means weak is simply wrong. Conductivity tracks ion concentration and the charge each ion carries, so a very dilute strong acid can conduct less than concentrated acetic acid. Ionisation is an ordinary dynamic equilibrium with all five of its behaviours, and since it absorbs heat, warming pushes it further. Three influences must be kept apart: dilution with water promotes ionisation and raises the degree of ionisation, yet c(H⁺) still falls and the pH rises, because the volume grows faster than the extra ions produced; adding a substance that supplies one of the same ions, sodium acetate or hydrochloric acid into acetic acid, suppresses ionisation and drives the equilibrium back; and warming promotes it, increasing both Ka and Kw. Ka answers to temperature alone, and at a given temperature the larger Ka the stronger the acid. Polyprotic weak acids ionise step by step with the first step far ahead of the second — carbonic acid has Ka1 near 4.4×10⁻⁷ against Ka2 near 4.7×10⁻¹¹ — which is why hydrogen carbonate both ionises and hydrolyses and ends up basic through hydrolysis. Three experiments settle whether an acid is weak: compare the pH of equal concentrations of the same basicity, where acetic acid sits well above hydrochloric; treat equal volumes and concentrations with excess zinc, where the total hydrogen is the same but the slow acid keeps producing gas as its reserve ionises; or take two samples of equal pH and dilute each tenfold, where hydrochloric acid gains exactly one pH unit and acetic acid less than one. Water belongs in the same account: at 25 ℃ pure water holds c(H⁺) = c(OH⁻) = 1×10⁻⁷ mol/L with Kw = 1×10⁻¹⁴, while at 100 ℃ Kw climbs to about 5.5×10⁻¹³ and neutral water reads roughly pH 6.1, so the rule that pH 7 is neutral is a statement about 25 ℃ only. Acids and bases suppress the ionisation of water; a hydrolysing salt promotes it.",
          },
          eq: {
            lhs: "CH₃COOH",
            rhs: "CH₃COO⁻ + H⁺",
            rel: "equilibrium",
          },
          subs: [
            {
              f: "CH₃COOH",
              name: { zh: "醋酸（弱酸）", en: "Acetic acid (weak)" },
              note: {
                zh: "弱电解质，仅部分电离。",
                en: "Weak electrolyte; only partly ionizes.",
              },
              role: "l",
            },
            {
              f: "CH₃COO⁻",
              name: { zh: "醋酸根离子", en: "Acetate ion" },
              note: { zh: "电离出的阴离子。", en: "Anion from ionization." },
              role: "r",
            },
            {
              f: "H⁺",
              name: { zh: "氢离子", en: "Hydrogen ion" },
              note: {
                zh: "电离出的阳离子，决定酸性。",
                en: "Cation that sets acidity.",
              },
              role: "r",
            },
          ],
          tags: [{ zh: "平衡", en: "Equilibrium" }],
        },
        {
          id: "hydrolysis",
          icon: "🌊",
          term: { zh: "盐类水解", en: "Salt Hydrolysis" },
          level: 3,
          oneLiner: {
            zh: "盐的离子结合水电离的 H⁺ 或 OH⁻，使溶液显酸性或碱性。",
            en: "Salt ions take H⁺ or OH⁻ from water, making the solution acidic or basic.",
          },
          detail: {
            zh: "水解的本质是盐电离出的离子夺走了水电离的 H⁺ 或 OH⁻，生成弱电解质，使水的电离平衡右移，溶液于是显出酸性或碱性。规律四句：有弱才水解、无弱不水解、谁强显谁性、越弱越水解。CH₃COONa 是强碱弱酸盐，CH₃COO⁻ 结合 H⁺ 使 c(OH⁻) 大于 c(H⁺) 而显碱性；NH₄Cl 是强酸弱碱盐显酸性；NaCl 不水解显中性；相同浓度下 Na₂CO₃ 比 CH₃COONa 碱性更强，因为对应的酸 HCO₃⁻ 更弱。水解吸热（它正是中和的逆过程），所以升温促进：热的纯碱溶液去油污更好、明矾在温水里更快形成胶体。两种离子相互促进时水解能进行到底，即双水解：Al³⁺ 与 HCO₃⁻、CO₃²⁻、S²⁻、AlO₂⁻ 相遇即彻底水解生成 Al(OH)₃ 沉淀与气体，泡沫灭火器靠的正是 Al₂(SO₄)₃ 与 NaHCO₃ 这一对，这也解释了 Al₂S₃ 无法在溶液里制取。配溶液时要加对应酸抑制水解：FeCl₃、SnCl₂ 溶液都必须加盐酸，否则出现浑浊。应用还有几处：TiCl₄ 加大量热水制 TiO₂（升温与稀释双重促进水解）、焊接时用 NH₄Cl 除去金属表面的氧化膜、明矾净水（Al³⁺ 水解生成的 Al(OH)₃ 胶体吸附悬浮物）。判断离子浓度大小要靠三个守恒：电荷守恒（阳离子带的正电荷总数等于阴离子的负电荷总数）、物料守恒（各元素总量之比等于化学式中的比例）、质子守恒（由前两式相减得到，例如 Na₂CO₃ 溶液中 c(OH⁻) = c(H⁺) + c(HCO₃⁻) + 2c(H₂CO₃)）。最后一个常考结论是蒸干盐溶液得到什么：AlCl₃、FeCl₃ 溶液蒸干得到氢氧化物甚至氧化物，因为水解产生的 HCl 挥发使平衡一路右移；Al₂(SO₄)₃ 蒸干仍得原盐，因为硫酸不挥发；而 NaHCO₃ 受热本身就分解，与水解无关。",
            en: "Hydrolysis is a salt's own ions stealing back the H⁺ or OH⁻ that water produces, locking them into a weak electrolyte and thereby pulling the ionisation of water to the right, which is how a neutral solution turns acidic or basic. The four-line rule states it compactly: only a salt with a weak partner hydrolyses, a salt of strong acid and strong base does not, the stronger partner dictates the pH, and the weaker the partner the deeper the hydrolysis. Sodium acetate, born of a strong base and a weak acid, is basic because acetate claims protons and leaves hydroxide behind; ammonium chloride, from a strong acid and a weak base, is acidic; sodium chloride does neither. At equal concentration sodium carbonate is more alkaline than sodium acetate, since its conjugate acid hydrogen carbonate is the weaker of the two. Hydrolysis absorbs heat, being the reverse of neutralisation, so warmth accelerates it: hot washing-soda solution cuts grease better and alum builds its colloid faster in warm water. When both ions promote each other the reaction can go to completion — aluminium with hydrogen carbonate, carbonate, sulfide or aluminate collapses into Al(OH)₃ precipitate plus gas, which is the working pair inside a foam fire extinguisher and the reason aluminium sulfide cannot be prepared from solution. Stock solutions of FeCl₃ or SnCl₂ must be acidified with hydrochloric acid or they turn cloudy. The same chemistry makes TiO₂ by dumping TiCl₄ into large amounts of hot water, lets ammonium chloride strip oxide films off metal before soldering, and lets alum clarify drinking water through the gelatinous hydroxide it forms. Ranking ion concentrations requires three conservations: charge balance, in which total positive charge equals total negative charge; mass balance, in which element ratios match the formula; and proton balance, obtained by subtracting one from the other, so that in sodium carbonate solution c(OH⁻) = c(H⁺) + c(HCO₃⁻) + 2c(H₂CO₃). One last prediction belongs here, namely what remains after evaporating a salt solution: AlCl₃ or FeCl₃ leave the hydroxide and even the oxide, because the hydrochloric acid of hydrolysis escapes and drags the equilibrium all the way along, whereas aluminium sulfate survives intact since sulfuric acid is non-volatile; sodium hydrogen carbonate, for its part, decomposes on heating regardless of any hydrolysis.",
          },
          tags: [{ zh: "平衡", en: "Equilibrium" }],
        },
      ],
    },
    /* ===================== 电化学 ===================== */
    {
      key: "electrochem",
      icon: "🔋",
      title: { zh: "电化学", en: "Electrochemistry" },
      items: [
        {
          id: "galvanic",
          icon: "🔋",
          term: { zh: "原电池", en: "Galvanic Cell" },
          level: 2,
          oneLiner: {
            zh: "把化学能转化为电能的装置，负极氧化、正极还原。",
            en: "Converts chemical energy to electricity; anode oxidizes, cathode reduces.",
          },
          detail: {
            zh: "原电池的四个条件缺一不可：能自发进行的氧化还原反应、两个活泼性不同的电极、电解质溶液、闭合回路——锌片与铜片同插稀硫酸就成电池，插进无水乙醇什么都不发生，因为既不导电也没有自发反应。判断正负极不能只背「锌是负极」：活泼性只在与该电解质构成的体系里算数，镁—铝—氢氧化钠溶液里被腐蚀的是铝而镁作正极，铁—铜—浓硝酸里铁钝化、反而是铜溶解——「更活泼的不一定作负极」是这一整块最集中的陷阱。电子从负极经导线流向正极，溶液里没有电子在跑，是离子在迁：阳离子（H⁺、Na⁺、K⁺）奔向正极、阴离子（SO₄²⁻、Cl⁻、OH⁻）奔向负极，这一条最常被记反。盐桥把两个半电池连成通路并各自保持电中性，其中 K⁺ 移向正极一侧、Cl⁻ 移向负极一侧，选盐得避开会与槽内溶液生成沉淀的组合，所以硝酸银体系要用硝酸钾盐桥而不能用含 Cl⁻ 的。燃料电池能说明介质比燃料更能改写法：氢气在酸性介质的负极写 H₂ − 2e⁻ → 2H⁺，在碱性介质写 H₂ − 2e⁻ + 2OH⁻ → 2H₂O，甲烷在碱性介质里碳的终点是 CO₃²⁻ 而不是 CO₂，因为生成的二氧化碳立刻被碱吃掉。可充电电池放电时是原电池、充电时变电解池，接线规矩是正接正、负接负；锂电池放电时锂离子从负极脱出经隔膜嵌入正极，所以电池内部游动的永远是离子而不是电子。",
            en: "A galvanic cell needs four things at once: a spontaneous redox reaction, two electrodes of different activity, an electrolyte, and a closed circuit — zinc and copper in dilute sulfuric acid make one, the same pair in ethanol makes nothing since there is neither ion conduction nor a spontaneous reaction. Do not memorise 'zinc is the anode': activity only counts inside the specific electrolyte, so in a magnesium–aluminium–sodium hydroxide cell the aluminium corrodes and magnesium is the positive electrode, while in iron–copper–concentrated nitric acid the iron passivates and the copper dissolves instead — the more active metal is not always the anode, and that is the densest trap in the whole topic. Electrons run through the wire from minus to plus, but nothing carries an electron through the solution: cations (H⁺, Na⁺, K⁺) drift toward the positive electrode and anions (SO₄²⁻, Cl⁻, OH⁻) toward the negative one, the direction most people invert. A salt bridge completes the circuit and keeps each half-cell neutral, K⁺ going into the cathode side and Cl⁻ into the anode side, so choose a salt that cannot precipitate with either beaker — a silver nitrate cell wants a potassium nitrate bridge, not a chloride one. Fuel cells show that the medium rewrites the half-equations: hydrogen in acid gives H₂ − 2e⁻ → 2H⁺ at the negative electrode, in alkali H₂ − 2e⁻ + 2OH⁻ → 2H₂O, and methane in alkaline electrolyte ends as carbonate rather than carbon dioxide because the alkali swallows the CO₂ at once. A rechargeable battery is galvanic while discharging and electrolytic while charging, wired plus-to-plus and minus-to-minus; in a lithium cell the ion de-intercalates from the negative electrode and embeds in the positive one, so what travels inside any battery is always the ion and never the electron.",
          },
          eq: {
            lhs: "Zn + Cu²⁺",
            rhs: "Zn²⁺ + Cu",
            rel: "equal",
          },
          subs: [
            {
              f: "Zn",
              name: { zh: "锌（负极）", en: "Zinc (anode)" },
              note: {
                zh: "失电子被氧化：Zn − 2e⁻ = Zn²⁺。",
                en: "Oxidized by losing electrons: Zn − 2e⁻ = Zn²⁺.",
              },
              role: "l",
            },
            {
              f: "Cu²⁺",
              name: { zh: "铜离子（溶液）", en: "Copper ion (solution)" },
              note: {
                zh: "在正极得电子被还原。",
                en: "Reduced at the cathode by gaining electrons.",
              },
              role: "l",
            },
            {
              f: "Zn²⁺",
              name: { zh: "锌离子", en: "Zinc ion" },
              note: {
                zh: "负极氧化进入溶液的产物。",
                en: "Oxidation product entering solution.",
              },
              role: "r",
            },
            {
              f: "Cu",
              name: { zh: "铜", en: "Copper" },
              note: {
                zh: "正极还原析出的金属。",
                en: "Metal deposited at the cathode.",
              },
              role: "r",
            },
          ],
          tags: [{ zh: "电化学", en: "Electrochem" }],
        },
        {
          id: "electrolytic",
          icon: "⚡",
          term: { zh: "电解池", en: "Electrolytic Cell" },
          level: 2,
          oneLiner: {
            zh: "借助外加电流把电能转化为化学能的装置。",
            en: "Uses external current to turn electricity into chemical change.",
          },
          detail: {
            zh: "电解池是把电能强行灌进一个不自发的氧化还原反应：阴极接电源负极发生还原、阳极接正极发生氧化，记住「阴得阳失」。谁先放电决定产物。阴极上阳离子按 Ag⁺ > Fe³⁺ > Cu²⁺ > H⁺ > Fe²⁺ > Zn²⁺ 依次得电子，而 Al³⁺、Mg²⁺、Na⁺ 在水溶液里根本轮不到，因为水抢先被还原放氢气——这正是工业制钠必须电解熔融 NaCl 而不能电解食盐水的根本原因。阳极先看电极本身：铁、铜这类活性阳极会自己溶解（Cu − 2e⁻ → Cu²⁺），只有铂或石墨等惰性电极才轮到阴离子放电，顺序是 S²⁻ > I⁻ > Br⁻ > Cl⁻ > OH⁻ > 含氧酸根，所以电解硝酸铜溶液时阳极出氧气而不是硝酸根被氧化。按产物分四类最省记忆：电解水型（Na₂SO₄、稀硫酸、NaOH 溶液都只消耗水，于是酸更酸、碱更浓）、电解电解质型（HCl、CuCl₂ 溶液）、放氢生碱型（饱和食盐水阴极区生成 NaOH，滴酚酞先变红，工业上即「氯碱工业（电解食盐水）」）、放氧生酸型（CuSO₄ 溶液阳极区积累 H₂SO₄）。电解后复原的口诀是出什么补什么，而且要按析出原子的种类与比例补齐：电解 CuSO₄ 跑出的是 Cu 与 O₂，应当加 CuO，不能加 Cu(OH)₂（多搭了一份水），更不能加 Cu（补不进氧）。氯碱工业里的阳离子交换膜只放 Na⁺ 穿过，把 Cl⁻ 与 OH⁻ 挡在阴极室之外，防止氯气与氢氧化钠相遇生成 NaClO 使产品不纯。",
            en: "Electrolysis forces electricity into a reaction that would not run by itself: the cathode sits on the negative terminal and reduces, the anode on the positive and oxidises — cathode gains, anode loses. Which species discharges first decides everything. At the cathode the order is Ag⁺ > Fe³⁺ > Cu²⁺ > H⁺ > Fe²⁺ > Zn²⁺, and Al³⁺, Mg²⁺ or Na⁺ never get a turn in water because water is reduced first and gives off hydrogen — exactly why sodium is made from molten chloride and not from brine. At the anode inspect the electrode itself before the solution: iron or copper anodes dissolve (Cu − 2e⁻ → Cu²⁺), and only platinum or graphite lets the anions compete, in the order S²⁻ > I⁻ > Br⁻ > Cl⁻ > OH⁻ > oxy-anions, so electrolysing copper nitrate with inert electrodes yields oxygen rather than any nitrogen product. Four product patterns carry the pH bookkeeping: water-only electrolysis (sodium sulfate, dilute sulfuric acid and sodium hydroxide solution all just lose water, so acids sharpen and bases concentrate), electrolyte-only (HCl, CuCl₂), hydrogen-out-base-out (brine builds sodium hydroxide at the cathode and phenolphthalein flushes red — the chlor-alkali process), and oxygen-out-acid-out (copper sulfate leaves sulfuric acid behind). To restore a spent cell put back precisely what left it, atom for atom: after electrolysing copper sulfate add CuO, not Cu(OH)₂ (that returns extra water) and not Cu (that returns no oxygen). The cation-exchange membrane used in industry passes only Na⁺, holding Cl⁻ and OH⁻ out of the cathode compartment so chlorine cannot meet the sodium hydroxide it would otherwise convert into hypochlorite.",
          },
          eq: {
            lhs: "2H₂O",
            cond: { zh: "通电", en: "electrolysis" },
            rhs: "2H₂↑ + O₂↑",
            rel: "equal",
          },
          subs: [
            {
              f: "2H₂O",
              name: { zh: "水（被电解）", en: "Water (electrolyzed)" },
              note: {
                zh: "通直流电发生电解。",
                en: "Split by direct current.",
              },
              role: "l",
            },
            {
              f: "2H₂↑",
              name: { zh: "氢气（阴极）", en: "Hydrogen (cathode)" },
              note: {
                zh: "阴极还原产物，体积约为氧气两倍。",
                en: "Cathode product, about twice the oxygen volume.",
              },
              role: "r",
            },
            {
              f: "O₂↑",
              name: { zh: "氧气（阳极）", en: "Oxygen (anode)" },
              note: { zh: "阳极氧化产物。", en: "Anode oxidation product." },
              role: "r",
            },
          ],
          tags: [{ zh: "电化学", en: "Electrochem" }],
        },
        {
          id: "corrosion",
          icon: "🦠",
          term: { zh: "金属的腐蚀与防护", en: "Metal Corrosion & Protection" },
          level: 1,
          oneLiner: {
            zh: "金属被氧化而损耗，主要防止方法是隔绝或电化学保护。",
            en: "Metals oxidize away; prevented by barrier or electrochemical protection.",
          },
          detail: {
            zh: "腐蚀分化学腐蚀（金属直接与 O₂、Cl₂ 接触被氧化，不产生电流）与电化学腐蚀（不纯的金属在表面水膜下变成无数微型原电池），钢铁在潮湿空气里生锈几乎都属于后者，所以它比燃烧更普遍也更难防。水膜接近中性时发生吸氧腐蚀，负极 2Fe − 4e⁻ → 2Fe²⁺、正极 O₂ + 2H₂O + 4e⁻ → 4OH⁻；只有水膜酸性较强时才发生析氢腐蚀（正极 2H⁺ + 2e⁻ → H₂↑），所以海边和雨季锈得最快，而浸在大量浓酸里的铁主要是被酸溶掉。Fe²⁺ 与 OH⁻ 先生成白色 Fe(OH)₂，再被氧气一步步氧化成红褐色 Fe(OH)₃、脱水成 Fe₂O₃·xH₂O，整条链见「铁生锈（吸氧腐蚀）」——铁锈疏松多孔、吸水透气，盖不住新鲜表面，于是锈一直往里长；铝恰好相反，Al₂O₃ 膜致密完整地贴合表面，一次钝化就长期保护，这就是铝盆不用刷漆、铁栏杆必须刷漆的真实原因。防护有三类思路：加覆盖层（油漆、搪瓷、油脂、镀层）、改变内部组成（掺铬镍制成不锈钢）、以及两类电化学保护——牺牲阳极的阴极保护法（把更活泼的锌块或镁棒接到钢铁上，让锌作负极先烂，船体、海底管道、热水器内胆的镁棒都是它）与外加电流的阴极保护法（把钢铁接到电源负极，用直流电顶回腐蚀电流，适合大型地下管网）。比较同一块铁在不同装置里谁坏得快，背一条顺序就够：电解池阳极 > 原电池负极 > 化学腐蚀 > 原电池正极 > 电解池阴极，即被迫氧化的最快、被迫得电子的最安全。镀锌铁皮（白铁）镀层破损后锌仍作负极继续保护铁；镀锡铁皮（马口铁）破损后铁反倒成为负极，锈得比不镀还快——这也是罐头内壁不能被刮花的道理。",
            en: "Corrosion is either chemical — metal oxidised by direct contact with oxygen or chlorine, with no current involved — or electrochemical, where an impure metal under a film of water becomes a field of microscopic cells. Rusting in damp air is almost always the second kind, which is why it is far more common than burning and far harder to stop. With a neutral film the cell absorbs oxygen: 2Fe − 4e⁻ → 2Fe²⁺ at the anode and O₂ + 2H₂O + 4e⁻ → 4OH⁻ at the cathode; only a strongly acidic film gives hydrogen instead, so seaside and rainy air rusts iron fastest while iron buried in concentrated acid is mainly dissolved by the acid. Ferrous and hydroxide ions first make white iron(II) hydroxide, which oxygen then walks step by step to rust, as set out in the entry on rusting; rust is porous and holds water against the surface so it keeps growing inward, whereas the aluminium oxide film is dense and fits the metal exactly, one passivation buying long protection — the reason an aluminium basin needs no paint and an iron railing does. Three families of defence exist: barriers (paint, enamel, grease, plating), alloying (stainless steel with chromium and nickel), and two electrochemical methods. Sacrificial-anode protection bolts a more active metal, a zinc block or a magnesium rod, onto the steel so that the additive corrodes first — ship hulls, subsea pipelines, the magnesium rod inside a water heater. Impressed-current protection ties the structure to the negative terminal of a DC supply and simply pushes the corrosion current back, which is how long buried pipeline networks are saved. To rank how fast one piece of iron dies, memorise a single order: electrolytic anode, then galvanic anode, then plain chemical attack, then galvanic cathode, then electrolytic cathode — forced oxidation is quickest, forced reduction is safest. A scratched galvanised sheet still protects the steel because the zinc becomes the anode, while a scratched tin-plated can makes the steel the anode and it rusts faster than bare iron; that is the real reason the inside of a food can must not be scratched.",
          },
          tags: [{ zh: "电化学", en: "Electrochem" }],
        },
        {
          id: "electroplating",
          icon: "🪙",
          term: { zh: "电镀与电解精炼", en: "Electroplating & Refining" },
          level: 3,
          oneLiner: {
            zh: "利用电解在表面镀上金属，或提纯粗金属。",
            en: "Uses electrolysis to coat surfaces or purify crude metals.",
          },
          detail: {
            zh: "电镀与电解精炼是同一套装置的两种用途，三个电极角色一旦搞混就全错。电镀的规矩是：镀层金属作阳极、待镀件作阴极、电镀液必须含有镀层金属的离子。这样工作时阳极溶解多少、阴极就析出多少，电镀液里金属离子浓度保持不变——这是电镀区别于电解精炼的第一处关键。镀层能不能粘住全在前处理：热碱液除油污、对应稀酸除氧化膜，残留油污会让镀层起皮鼓泡，所以电镀车间把洗看得比镀更重；镀铬因为铬表面钝化而不能直接用铬作阳极，需要定期往槽里补充铬化合物。铜的电解精炼：粗铜（含 Zn、Fe、Ni、Ag、Au、Pt）作阳极、纯铜作阴极、CuSO₄ 溶液作电解液。通电后比铜活泼的杂质先溶（Zn − 2e⁻ → Zn²⁺、Fe − 2e⁻ → Fe²⁺），铜随后溶解，而 Ag、Au、Pt 既不溶也不放电，成块脱落到槽底成为阳极泥——那是回收银、金和铂族金属的主要原料，思路与「电子废弃物提金（城市矿山）」同源，都是把贫料当富矿看。阴极只有 Cu²⁺ 放电析出（Zn²⁺、Fe²⁺ 排在它后面，留在溶液里），于是每通过 2 mol 电子，阳极溶解的铜与阴极析出的铜并不相等，液里 Cu²⁺ 浓度会略微下降并需定期净化除杂——这一条常被误当作「浓度不变」，而它正是电解精炼与电镀最集中的分界。若把粗铜阳极换成惰性电极，就不再是精炼而在电解 CuSO₄，产物完全不同。完整流程与装置见「铜的电解精炼与阳极泥」。",
            en: "Plating and refining are the same hardware put to two uses, and the three electrode roles must never be swapped. For plating: the coating metal is the anode, the workpiece is the cathode, and the bath must contain ions of the coating metal. Then whatever the anode dissolves the cathode regains and the bath concentration stays constant — the first difference from refining. Whether a layer sticks is settled before any current flows: hot alkali lifts the grease and the matching dilute acid strips the oxide film, because trapped oil makes the coating blister and peel, which is why plating shops treat washing as more dangerous than bathing. Chromium cannot serve as its own anode since its surface passivates, so its bath is replenished chemically. In copper refining the crude slab is the anode, pure copper the cathode and copper sulfate the bath. At the anode the more active impurities go first (Zn − 2e⁻ → Zn²⁺, Fe − 2e⁻ → Fe²⁺), then the copper dissolves, while silver, gold and platinum neither dissolve nor discharge but drop in chunks to the bottom as anode slime — the main commercial source of silver, gold and the platinum-group metals, the same city-mine logic used to recover gold from electronic waste. At the cathode only Cu²⁺ discharges, since Zn²⁺ and Fe²⁺ sit behind it in the order and stay in solution, so per 2 mol of electrons the anode loses a little less copper than the cathode gains, the Cu²⁺ concentration drifts down and the bath must be cleaned periodically. Claiming that the concentration stays unchanged is the standard mistake, and that line is exactly where refining parts company from plating. Swap the crude slab for an inert anode and you are no longer refining at all but simply electrolysing copper sulfate. The full flowsheet is in the entry on copper refining and anode slime.",
          },
          tags: [{ zh: "电化学", en: "Electrochem" }],
        },
        {
          id: "faraday",
          icon: "🧲",
          term: { zh: "法拉第电解定律", en: "Faraday's Laws" },
          level: 3,
          oneLiner: {
            zh: "电极上析出物质的量与通过的电量成正比。",
            en: "Mass deposited at an electrode is proportional to charge passed.",
          },
          detail: {
            zh: "法拉第电解定律把「通电多少」与「析出多少」直接挂钩：电极上发生反应的物质的量正比于通过的电量。计算只有三步。先算电量 Q = It，时间必须换成秒、电流用安培，得出库仑；再换成电子的物质的量 n(e⁻) = Q/F，其中 F ≈ 96485 C/mol，即每 mol 电子所带的电量，等于阿伏加德罗常数乘以单个电子电荷 1.602×10⁻¹⁹ C；最后按该物种放电需要的电子数折算：m = M·n(e⁻)/z，z 取 Ag⁺ 为 1、Cu²⁺ 为 2、Al³⁺ 为 3，而水放 O₂ 每 mol 对应 4 mol 电子。因为串联电路中各处通过的电量相同，几个电解槽串起来时比较产量只看各自的 z，与电压、电极面积、溶液浓度都无关，这是「串联比电量、并联比电压」的由来。举例：通过 2 mol 电子能析出 2 mol Ag（约 216 g）、1 mol Cu（64 g）或 2/3 mol Al（18 g），也能得到 1 mol H₂ 和 0.5 mol O₂——同样是 2 mol 电子，产物质量差出十几倍，所以「电量相同则质量相同」是错的，相同的是电子数。定律算出的是理论值：实际工业总有电流效率低于 100%（铝电解通常只有 85%–95%，剩下的电量被副反应、短路和离子迁移吃掉），因此按定律算出的产量永远不低于实际产量。两个经典测量都立在它之上：恒电流电解硝酸银的银库仑计，把电子总数与析出的银原子数一比就得到阿伏加德罗常数；或电解硫酸铜溶液、称阴极增重并配平电量，反算铜的摩尔质量。做题最常见的错误不是公式而是单位：分钟没换成秒、把千库读成库、质量没换成克就开算，算出的量会错十倍到六十倍。",
            en: "Faraday's laws tie how much electricity passed to how much substance reacted: the amount of any product is proportional to the charge, worked in three mechanical steps. First the charge Q = It, with time in seconds and current in amperes, giving coulombs. Then the moles of electrons n(e⁻) = Q/F, where F ≈ 96485 C/mol is the charge carried by one mole of electrons, equal to Avogadro's number times the elementary charge of 1.602×10⁻¹⁹ C. Finally divide by the electrons each species needs: m = M·n(e⁻)/z, with z = 1 for Ag⁺, 2 for Cu²⁺, 3 for Al³⁺, and 4 per mole of oxygen released from water. Cells wired in series all pass the same charge, so their outputs compare through z alone — independent of voltage, electrode area or concentration, which is what series compares charge and parallel compares voltage is meant to say. Push 2 mol of electrons and you collect 2 mol of silver (about 216 g), or 1 mol of copper (64 g), or 2/3 mol of aluminium (18 g), along with 1 mol of hydrogen and half a mole of oxygen: equal charge does not mean equal mass, only equal electrons, and the masses differ by more than tenfold. Anything the law predicts is a ceiling, since real plants run below full current efficiency — aluminium smelting typically manages 85% to 95%, the rest being lost to side reactions, short-circuiting and migration — so the theoretical yield can never fall below the actual one. Two classic measurements rest on the law: the silver coulometer, which runs a constant current through silver nitrate and compares total electrons with the silver atoms deposited to pin down Avogadro's number, and the electrolysis of copper sulfate with weighed electrodes, where the cathode gain plus the charge gives the molar mass of copper. In exams the damage is almost never the formula but the units: minutes left unconverted, kilocouloms read as coulombs, grams mistaken for kilograms, each of which throws the answer off by ten to sixty times.",
          },
          tags: [{ zh: "电化学", en: "Electrochem" }],
        },
        {
          id: "primary-cells",
          icon: "🪫",
          term: { zh: "化学电源：一次电池与二次电池", en: "Primary & Rechargeable Cells" },
          level: 2,
          oneLiner: {
            zh: "把化学能直接变成电能的装置，放电后能否充电复原是分界线。",
            en: "Devices turning chemical energy straight into electricity, split by whether discharge can be undone.",
          },
          detail: {
            zh: "化学电源把化学能直接变成电能，按能否充电分两类。一次电池放电后不能复原：最早的锌锰干电池以锌筒作负极（Zn − 2e⁻ → Zn²⁺）、石墨棒作正极、四周填着二氧化锰与碳粉，电解质是 NH₄Cl 与 ZnCl₂ 的糊状物；它的短板是锌筒会被酸性糊状物慢慢蚀穿而漏液，且大电流时正极产物在电极表面积累使电压骤降（极化）。碱性锌锰把电解质换成 KOH、负极改用锌粉以增大接触面积，容量与放电平稳度都上一个台阶，是最常见的 5 号、7 号电池。氧化银纽扣电池与锂一次电池能量密度更高，用于手表与心脏起搏器。二次电池可以充电：放电时是原电池、充电时被接成电解池，接线规矩是正接正、负接负。铅蓄电池是唯一要求把两极反应都背下来的常见电池，因为两极反应都生成固体 PbSO₄ 附着在电极上（负极 Pb − 2e⁻ + SO₄²⁻ → PbSO₄，正极 PbO₂ + 2e⁻ + 4H⁺ + SO₄²⁻ → PbSO₄ + 2H₂O），所以放电时正极质量增大、硫酸被消耗而使电解液密度下降——用密度计读数就能判断剩余电量，汽车「亏电」正是这样测的；总反应 Pb + PbO₂ + 2H₂SO₄ ⇌ 2PbSO₄ + 2H₂O 可逆，充电即把它倒回去。锂离子电池靠 Li⁺ 在两极的层状结构之间来回嵌入与脱出工作，被形象地称为「摇椅式电池」：放电时 Li⁺ 从负极（石墨）脱出、经隔膜移向正极（LiCoO₂）并嵌入，充电时反向；整个过程不产生锂单质，正因如此它没有记忆效应、自放电小、比能量高。它的电解质必须是有机溶剂而不能是水，因为水会与锂及其嵌入化合物反应放出氢气——这一点也解释了为什么锂电池着火不能用水浇，而要用干粉或沙土。评价电池的两个指标是比能量（单位质量或体积储存的电能，Wh/kg）与功率密度：铅蓄电池比能量低、不适合长续航，却能在几秒内输出极大电流，所以启动发动机仍用它。废旧电池必须回收，汞、镉、铅都是会累积的重金属，而从旧电池里回收镍、锂、镉本身也是实打实的金属资源（见「电子废弃物提金（城市矿山）」）。",
            en: "Chemical power sources turn chemical energy straight into electricity, and they divide on whether they can be recharged. A primary cell cannot be restored once discharged: the earliest zinc–manganese dry cell used the zinc can as the negative electrode (Zn − 2e⁻ → Zn²⁺), a carbon rod as the positive electrode packed in manganese dioxide with carbon powder, and a paste of ammonium chloride with zinc chloride as electrolyte. Its weaknesses are that the acidic paste slowly eats through the can, so old cells leak, and that products accumulating on the electrode make the voltage collapse under heavy current, the effect called polarisation. Alkaline cells replace the paste with potassium hydroxide and use zinc powder at the negative electrode, which multiplies the contact area and gives a steadier, roomier output; these are the ordinary AA and AAA batteries in the drawer. Silver oxide button cells and lithium primary cells store more energy per gram and serve watches and cardiac pacemakers. Secondary cells do take charge: they discharge as galvanic cells and are forced to run backwards as electrolytic cells, wired positive to positive and negative to negative. The lead-acid battery is the one common cell whose both electrode reactions must be memorised, because both end in solid lead sulfate clinging to the plates (negative: Pb − 2e⁻ + SO₄²⁻ → PbSO₄; positive: PbO₂ + 2e⁻ + 4H⁺ + SO₄²⁻ → PbSO₄ + 2H₂O), so on discharge the positive plate gains mass while sulfuric acid is consumed and the electrolyte thins — a hydrometer reading therefore tells how much life is left, which is exactly how a car battery is judged flat. The overall reaction Pb + PbO₂ + 2H₂SO₄ ⇌ 2PbSO₄ + 2H₂O is reversible and charging has to undo it. The lithium-ion cell works by shuttling lithium ions in and out of layered hosts, the rocking-chair picture: on discharge Li⁺ leaves the graphite negative electrode, crosses the separator and embeds in the lithium cobalt oxide positive electrode, and on charge it runs home; lithium metal is never formed, which is why such cells have no memory effect, self-discharge little and lead on specific energy. Their electrolyte must be an organic solvent rather than water, since water reacts with the charged electrode materials and liberates hydrogen — the same fact explains why a burning lithium cell is fought with dry powder or sand and not with water. Two figures rate any cell: specific energy, the watt-hours stored per kilogram or litre, and power density. Lead-acid scores low on the first yet can pour out an enormous current for a few seconds, which is why it still starts engines. Spent cells must be collected, since mercury, cadmium and lead are heavy metals that accumulate, while reclaiming nickel, lithium and cadmium from old batteries is a real metallurgy rather than an environmental slogan.",
          },
          tags: [{ zh: "电化学", en: "Electrochem" }],
        },
        {
          id: "fuel-cells",
          icon: "🫧",
          term: { zh: "燃料电池", en: "Fuel Cell" },
          level: 3,
          oneLiner: {
            zh: "燃料从外部连续送入的电化学装置，产物只有水、效率高于燃烧。",
            en: "Electrochemical device fed continuously from outside; water is its only product and it beats combustion on efficiency.",
          },
          detail: {
            zh: "燃料电池与普通电池最根本的差别是：反应物存放在体外，只要持续供入燃料与氧化剂就能连续放电，因此它不是「储能装置」而是「小型发电厂」。氢氧燃料电池的总反应就是 2H₂ + O₂ = 2H₂O，理论上能量转化率可达 80% 以上，而火力发电要先烧开水推动汽轮机，受温差限制只能到 30%–40%。写电极反应式必须先问介质，这是燃料电池全部难度所在：负极永远是燃料失电子，正极永远是氧气得电子，而氧气得电子之后靠谁收尾完全由介质决定。酸性溶液中，正极 O₂ + 4e⁻ + 4H⁺ → 2H₂O，负极 H₂ − 2e⁻ → 2H⁺；碱性溶液中，正极 O₂ + 2H₂O + 4e⁻ → 4OH⁻，负极 H₂ − 2e⁻ + 2OH⁻ → 2H₂O——同一份氢气，酸里出 H⁺、碱里被 OH⁻ 接走生成水，两边各配一次才不冲突。若电解质是熔融碳酸盐（传导 CO₃²⁻），正极要写成 O₂ + 2CO₂ + 4e⁻ → 2CO₃²⁻，因此得把二氧化碳循环回正极；若是固体氧化物（传导 O²⁻），正极直接 O₂ + 4e⁻ → 2O²⁻。含碳燃料还多一道关卡：甲烷、甲醇里的碳反应后得有去处。碱性介质里绝不可能以 CO₂ 存在，因为它立刻被 OH⁻ 吸收，所以甲烷在碱性燃料电池的负极要写成 CH₄ − 8e⁻ + 10OH⁻ → CO₃²⁻ + 7H₂O，碳的终点是碳酸根；只有酸性介质才可写 CO₂。数电子是另一条易错线：CH₄ 中碳为 −4 价，到 +4（CO₂ 或 CO₃²⁻）共失 8 个电子，甲醇 CH₃OH 是 6 个，肼（N₂H₄）中氮为 −2 价、变 N₂ 失 4 个。氢氧燃料电池的产物只有水，因此被视为最干净的电化学装置；它的真正障碍不在原理而在成本——铂催化剂贵、膜寿命有限、氢气储运麻烦（见「能源的分类与合理利用」）。把一台燃料电池与一个电解池联起来，就构成「电解水制氢—燃料电池发电」的循环，两个装置的电极反应恰好互逆，是判断是否真懂这一节而不是背下结论的经典设问。",
            en: "A fuel cell differs from every battery in that its reactants are stored outside it: feed it fuel and oxidiser continuously and it keeps discharging, so it is not a storage device but a small power plant. The overall reaction of a hydrogen–oxygen fuel cell is simply 2H₂ + O₂ = 2H₂O, and its theoretical energy conversion can exceed 80%, whereas thermal generation must first boil water to drive a turbine and manages only 30% to 40%. Writing the electrode equations is entirely a question of the medium, and that is where all the difficulty lies: the negative electrode is always the fuel losing electrons and the positive always oxygen gaining them, but who cleans up after the oxygen depends on the electrolyte. In acid the cathode reads O₂ + 4e⁻ + 4H⁺ → 2H₂O and the anode H₂ − 2e⁻ → 2H⁺; in alkali the cathode reads O₂ + 2H₂O + 4e⁻ → 4OH⁻ and the anode H₂ − 2e⁻ + 2OH⁻ → 2H₂O — the same hydrogen gives up H⁺ in acid yet is met by OH⁻ in alkali, so each side has to be balanced against its own medium. With molten carbonate, which conducts CO₃²⁻, the cathode becomes O₂ + 2CO₂ + 4e⁻ → 2CO₃²⁻ and carbon dioxide must be recirculated into it; with a solid oxide, which conducts O²⁻, the cathode is simply O₂ + 4e⁻ → 2O²⁻. Carbon-bearing fuels add one more gate, because the carbon has somewhere to go. In alkali it cannot appear as CO₂, which the hydroxide would swallow at once, so methane at the anode of an alkaline cell is written CH₄ − 8e⁻ + 10OH⁻ → CO₃²⁻ + 7H₂O with carbonate as its terminus, and only acid media may show CO₂. Counting electrons is the other frequent slip: carbon is −4 in CH₄ and reaches +4, eight electrons; methanol gives six; hydrazine, where nitrogen stands at −2, gives four as it turns into N₂. The hydrogen–oxygen cell leaves behind only water and is reckoned the cleanest electrochemical device there is, while its obstacles are practical rather than principled — platinum catalyst cost, membrane lifetime and the awkwardness of storing hydrogen. Pair one cell with an electrolyser and you have the loop water → hydrogen → electricity → water, the two sets of electrode reactions being exact inverses of each other, which is the classic test of whether a section was understood rather than memorised.",
          },
          tags: [{ zh: "电化学", en: "Electrochem" }],
        },
        {
          id: "electrode-writing",
          icon: "✍️",
          term: { zh: "电极反应式的书写", en: "Writing Electrode Equations" },
          level: 2,
          oneLiner: {
            zh: "先判装置、再定电极、按介质配平、最后用总反应与三个守恒验收。",
            en: "Identify the cell, name the electrodes, balance against the medium, then verify with the overall reaction and three conservations.",
          },
          detail: {
            zh: "电极反应式写不出，多半是顺序乱了。固定四步就不会错。第一步判装置：有外接电源的是电解池，没有电源而靠自发反应出电的是原电池；若两个无电源的池子串联，则活泼性差得多的那个作原电池、另一个被它拖着当电解池。第二步定电极：原电池叫正负极，负极氧化（失电子）、正极还原（得电子）；电解池叫阴阳极，与电源负极相接的是阴极、发生还原，与正极相接的是阳极、发生氧化，即「阴得阳失」。还得先看阳极是不是活性金属（Fe、Cu、Ag 等），若阳极为活性电极而非铂或石墨，电极本身先溶解而不是溶液里的阴离子放电。第三步写主体半反应并配平：先按化合价升降写出得失电子数，再按介质补粒子——酸性溶液用 H⁺ 与 H₂O 配平氢氧（不得出现 OH⁻），碱性溶液用 OH⁻ 与 H₂O 配平（不得出现 H⁺），熔融碳酸盐用 CO₃²⁻ 与 CO₂，固体氧化物用 O²⁻；水溶液里 Al³⁺、Mg²⁺、Na⁺ 这类离子根本不放电，因为它们抢不过水。第四步总检查：两式按电子数最小公倍数放大后相加，消去电子应正好得到总反应式，若消不尽或得到与化学事实不符的结果，则有式子写反；还要逐项核对三个守恒（原子守恒、电荷守恒、得失电子守恒），并记住电子只能出现在半反应里、绝不能出现在总反应式中。几个高频错误全部落在这四步里：把电子写进总反应式；酸性介质里写成生成 OH⁻；把可充电电池的正负极写反（充电时原来的正极变成阳极、要写它的逆反应，故铅蓄电池充电时阴极写 PbSO₄ + 2e⁻ → Pb + SO₄²⁻、阳极写 PbSO₄ − 2e⁻ + 2H₂O → PbO₂ + 4H⁺ + SO₄²⁻）；以及忘记气体与沉淀符号——电极反应式与热化学方程式一样一般不标↑↓。最难的一类是新型电池：题面只给总反应、要你自己拆两式，捷径是先由元素化合价变化找出谁被氧化，把它写成负极（或阳极）式，再用总反应减去这一式得另一式——「总式减一式得另一式」在配平、介质与电子数上都自动正确，比硬写第二式更保险。",
            en: "Most failures to write an electrode equation come from doing the steps in the wrong order. Fix four of them and the task becomes mechanical. Step one, identify the apparatus: an external power supply means an electrolytic cell, no supply but a spontaneous reaction driving current means a galvanic cell; where two unpowered cells are wired together, the one with the greater difference in electrode activity is the galvanic cell and it drags the other into acting as an electrolyser. Step two, name the electrodes: a galvanic cell has a negative electrode where oxidation and a positive where reduction; an electrolytic cell has a cathode on the negative terminal, where reduction happens, and an anode on the positive, where oxidation happens — cathode gains, anode loses. Then look at the anode itself: an active metal such as iron, copper or silver dissolves before any anion in solution gets a turn, whereas platinum or graphite stays put and lets the ions discharge. Step three, write the half-reaction and balance it: take the electron count from the change in oxidation state, then add whatever the medium supplies — H⁺ and H₂O in acid, where OH⁻ must not appear; OH⁻ and H₂O in alkali, where H⁺ must not appear; CO₃²⁻ and CO₂ in molten carbonate; O²⁻ in a solid oxide. In water, ions such as Al³⁺, Mg²⁺ and Na⁺ never discharge at all, because water is reduced ahead of them. Step four, check: scale the two half-reactions to a common electron count and add them, and the electrons must cancel to give exactly the overall reaction; if they do not, one equation is reversed. Verify the three conservations one by one — atoms, charge, electrons gained against electrons lost — and remember that electrons belong only in a half-reaction, never in the overall equation. Every recurring error sits inside these four steps: leaving electrons in the total; writing OH⁻ in an acidic medium; reversing the polarity of a rechargeable cell, since on charging the original positive electrode becomes the anode and its reaction must be written backwards, so the charging cathode of a lead-acid cell reads PbSO₄ + 2e⁻ → Pb + SO₄²⁻ while the anode reads PbSO₄ − 2e⁻ + 2H₂O → PbO₂ + 4H⁺ + SO₄²⁻; and forgetting that electrode equations, like thermochemical ones, carry no gas or precipitate arrows. The hardest questions give only the overall reaction of some novel cell and ask for both electrodes. The shortcut is to find from the oxidation states which element is oxidised, write that half-reaction yourself, and obtain the other by subtracting it from the overall equation — subtraction settles the medium, the coefficients and the electrons automatically, and is far safer than writing the second equation from scratch.",
          },
          tags: [{ zh: "电化学", en: "Electrochem" }],
        },
      ],
    },
    /* ===================== 化学家 ===================== */
    {
      key: "chemists",
      icon: "🧑‍🔬",
      title: { zh: "化学家", en: "Chemists" },
      items: [
        {
          id: "mendeleev",
          icon: "📐",
          term: { zh: "德米特里·门捷列夫", en: "Dmitri Mendeleev" },
          level: 1,
          oneLiner: {
            zh: "编制第一张元素周期表，并预言了若干未知元素。",
            en: "Built the first periodic table and predicted unknown elements.",
          },
          detail: {
            zh: "1869 年按相对原子质量与性质把已知元素排成一张表，留下空位并预言「类铝」「类硅」「类硼」的性质；镓、锗、钪陆续填上这些格子，是这张表最硬的说服力。轮到钴与镍、碲与碘时，按质量该调换次序，他咬定是原子量测错了、坚持按性质排位，后来改用核电荷排序证明他没错。他与德国人迈尔几乎同时得到周期体系，优先权长期有争议。真正持久的不是那张表的样式，而是「元素周期律」这条排序逻辑：性质随核电荷递增而重复出现。",
            en: "He arranged the known elements by atomic weight and similarity in 1869, left gaps, and forecast the properties of 'eka-aluminium', 'eka-silicon' and 'eka-boron'; gallium, germanium and scandium filled them, the strongest proof the table was right. Where cobalt and nickel, or tellurium and iodine, would have forced a swap by weight, he insisted the measured masses were wrong and kept the chemical order; reordering by nuclear charge later vindicated him. He reached the system almost simultaneously with Germany's Meyer, and the priority fight outlived both. What endured is not the layout but the periodic law: properties recur as nuclear charge rises (see Periodic Law).",
          },
        },
        {
          id: "lavoisier",
          icon: "⚖️",
          term: { zh: "安托万·拉瓦锡", en: "Antoine Lavoisier" },
          level: 1,
          oneLiner: {
            zh: "现代化学之父，确立质量守恒与氧化学说。",
            en: "Father of modern chemistry; conservation of mass and oxygen theory.",
          },
          detail: {
            zh: "在密闭容器里精确称量反应前后，把「燃素」从化学里请了出去，证明燃烧是物质与氧结合。1789 年的《化学纲要》给出第一张元素表和一套新命名法，硫酸、氧化物这类名字由此而来；那张表里仍列着「热」与「光」，也把硅、铝当作尚未分解的复合体。1785 年他把金刚石放进纯氧里烧，生成的气体同样能让石灰水变浑，头一回说明金刚石与木炭原是同一元素的不同形态。他兼任包税官，1794 年死于法国大革命，拉格朗日事后说：砍下这个头颅只要一瞬，一百年也长不出第二个。",
            en: "Weighing reactants and products in sealed vessels, he removed phlogiston from chemistry and showed burning as combination with oxygen. His 1789 textbook carried the first element table and the naming system still used for sulfates and oxides — though it listed heat and light among the elements and treated silica and alumina as unsplit compounds. In 1785 he burned a diamond in pure oxygen and the gas it gave clouded limewater just as charcoal's did, the first clear sign that diamond and charcoal are two forms of one element. He also farmed taxes for the crown and was guillotined in 1794; Lagrange: a moment sufficed to cut that head off, and a century will not grow another.",
          },
        },
        {
          id: "dalton",
          icon: "⚛️",
          term: { zh: "约翰·道尔顿", en: "John Dalton" },
          level: 1,
          oneLiner: {
            zh: "提出原子论，认为物质由不可再分的原子构成。",
            en: "Proposed atomic theory: matter is made of indivisible atoms.",
          },
          detail: {
            zh: "他把原子拉进定量化学：以氢为 1 推出相对原子质量，用「最简比」猜化学式（因此把水写成 HO、氨写成 NH），并给出混合气体的分压定律。他坚信原子不可再分、同种元素的原子一般重，这两条后来分别被「同位素」与核物理推翻。他拒绝阿伏伽德罗的分子假说，原子量与分子量于是纠缠了半个世纪，直到 1860 年卡尔斯鲁厄会议上康尼查罗重新区分原子与分子才算理清。他最早用科学笔触记录了红绿色盲，这种视觉缺陷后来就以他的名字命名。",
            en: "He made atoms quantitative: taking hydrogen as 1 he tabulated relative atomic weights, guessed formulae by the simplest ratio (so water became HO and ammonia NH) and stated the law of partial pressures. He held atoms indivisible and equal in weight within an element — both later broken, by isotopes (see Isotope) and by nuclear physics. Rejecting Avogadro's molecule, he left atomic and molecular weights tangled for fifty years, until Cannizzaro re-separated atom from molecule at the 1860 Karlsruhe congress. He also gave the first scientific account of red-green colour blindness, a defect later named after him.",
          },
        },
        {
          id: "boyle",
          icon: "🫧",
          term: { zh: "罗伯特·玻意耳", en: "Robert Boyle" },
          level: 1,
          oneLiner: {
            zh: "玻意耳定律（pV = 常量）奠定气体研究基础。",
            en: "Boyle's law (pV = const) founded the study of gases.",
          },
          detail: {
            zh: "用自制的抽气泵做「空气弹」实验，1662 年得出温度不变时气体压强与体积成反比，器械与操作多由胡克动手完成。同一台抽气机还证明：声音要靠空气传播，把燃着的蜡烛或小白鼠关进真空，火焰会熄、小鼠会窒息，这为「燃烧与灭火」里燃烧离不开空气的一面提供了早期证据。《怀疑的化学家》（1661）既反对四元素也反对三要素，主张化学的任务是把具体物体拆成成分并逐一定量——他给元素下了个操作性定义：元素是不能再分解为更简单身体的物质。",
            en: "With a pump of his own making he ran air-gun experiments and in 1662 reported that at fixed temperature a gas trades pressure against volume; Hooke built and worked much of the apparatus. The same vacuum showed that sound needs air, and that a lit candle or a small mouse shuts down in it — early evidence that fire depends on air (see Combustion and Firefighting). The Sceptical Chymist of 1661 refused both the four elements and the three principles, assigning chemistry the task of resolving bodies into ingredients and measuring each. His working definition: an element is what cannot be broken into a simpler body.",
          },
        },
        {
          id: "curie",
          icon: "☢️",
          term: { zh: "玛丽·居里", en: "Marie Curie" },
          level: 1,
          oneLiner: {
            zh: "发现钋与镭，放射性研究的先驱。",
            en: "Discovered polonium and radium; pioneer of radioactivity.",
          },
          detail: {
            zh: "「放射性」这个词由她造出。她与皮埃尔·居里从成吨沥青铀矿渣里煮炼、分级结晶，1898 年先析出钋（以波兰命名）再得镭，并测出镭的原子量。1903 年的物理学奖起初只提名皮埃尔与贝克勒尔，经友人提醒才补上她的名字；1911 年的化学奖因分离纯镭归她一人，她也因此成为唯一在物理、化学两个不同学科各获一次诺奖的人。一战时她组织流动 X 光车上前线；1934 年死于再生障碍性贫血，笔记本至今带放射性，查阅者要穿防护服并签同意书。",
            en: "She coined the word 'radioactivity'. With Pierre she boiled down tonnage of pitchblende residue and crystallised it in fractions, isolating polonium in 1898 (named for her Poland) and then radium, and fixing radium's atomic weight. The 1903 physics prize first named only Pierre and Becquerel and was amended to add her only after a friend's protest; the 1911 chemistry prize was hers alone for the isolated metal, and she remains the only laureate honoured twice in two different sciences. She ran mobile X-ray units to the front in the First War and died of aplastic anaemia in 1934 — her notebooks stay radioactive and are still handled in protective clothing behind signed waivers.",
          },
        },
        {
          id: "pauling",
          icon: "🔗",
          term: { zh: "莱纳斯·鲍林", en: "Linus Pauling" },
          level: 3,
          oneLiner: {
            zh: "化学键本质与电负性研究的巨擘，两获诺贝尔奖。",
            en: "Giant of chemical bonding and electronegativity; two-time Nobel laureate.",
          },
          detail: {
            zh: "把量子力学接进化学键：杂化轨道、电负性标度与「共振」都出自他 1931 年起的系列工作，《化学键的本质》至今是这门学科的语言。他给出的电负性差至今仍用来粗判键型——两原子电负性相差大，电子几乎被拉过去成离子键；相差居中，就是「电负性与电离能」里那种极性共价。1951 年他与科里提出蛋白质主链的 α 螺旋与 β 折叠，同一时期给出的 DNA 三螺旋模型却是错的。1954 年获化学奖，1962 年因推动部分禁核试条约再得和平奖。晚年投入大剂量维生素 C 防治感冒与癌症，证据薄弱，这是他名声上最实的一处伤口。",
            en: "He brought quantum mechanics into the bond: hybridisation, the electronegativity scale and 'resonance' all come from work begun in 1931, and The Nature of the Chemical Bond still sets the vocabulary. His electronegativity difference still sorts bond types roughly by eye — a large gap pulls electrons across into an ionic bond, a middling one leaves the polar covalent bond of electronegativity and ionization (see Electronegativity & Ionization). With Corey he proposed the α-helix and β-sheet of protein backbones in 1951 — and, in the same stretch, a wrong triple-helix model of DNA. Chemistry prize 1954, peace prize 1962 for his push behind the test-ban treaty. His late campaign for megadose vitamin C against colds and cancer rested on thin evidence and is the plainest wound on his reputation.",
          },
        },
        {
          id: "avogadro",
          icon: "🧮",
          term: { zh: "阿莫迪欧·阿伏伽德罗", en: "Amedeo Avogadro" },
          level: 2,
          oneLiner: {
            zh: "提出同温同压下等体积气体含等量分子（阿伏伽德罗定律）。",
            en: "Equal gas volumes hold equal molecule counts at same T and P.",
          },
          detail: {
            zh: "1811 年提出：气体单质常以双原子分子存在（H₂、O₂、Cl₂），同温同压下等体积的气体含同样多的分子。这条假说能把盖-吕萨克测出的体积比直接换算成化学式，却被道尔顿与贝采利乌斯拒斥；他此后几乎再无新论，1856 年在冷清中去世，被长期忽略。真正的承认是 1860 年以后，而「阿伏伽德罗常数」这个叫法出现在他身后：1 摩尔任何物质都含约 6.02×10²³ 个微粒，这条定律至今仍是把气体体积换算成物质的量的桥梁，也正是「摩尔」这一单位的地基。",
            en: "In 1811 he proposed that the elemental gases are diatomic (H₂, O₂, Cl₂) and that equal volumes of gas at the same temperature and pressure hold equal numbers of molecules. The hypothesis converted Gay-Lussac's measured volume ratios straight into formulae, and Dalton and Berzelius rejected it; he published little after, and died quietly in 1856, long overlooked. Recognition came only after 1860, and the name 'Avogadro's number' postdated him: one mole of any substance holds about 6.02×10²³ particles, the law still bridges a measured gas volume to an amount of substance, and this is the very footing of the mole (see Mole).",
          },
        },
        {
          id: "lechatelier",
          icon: "⚖️",
          term: { zh: "亨利·勒夏特列", en: "Henry Le Chatelier" },
          level: 2,
          oneLiner: {
            zh: "提出平衡移动原理，指导化工生产条件优化。",
            en: "Stated the equilibrium-shift principle guiding chemical industry.",
          },
          detail: {
            zh: "1888 年总结出移位规则：改变条件时，平衡向削弱这一改变的方向移动（前一年德国人布朗已独立发表同一原理，故也常并称勒夏特列-布朗原理）。工业合成氨便顺着这条走：加压、选一个折中的高温，再把氨从体系里冷凝移走，逼「化学平衡状态」一路朝生成氨的方向挪；判断电离、溶解等平衡的走向，用的也是同一条思路。他出身矿业世家，把工业现场当实验室：改进本生灯与安全煤气灯、发明光学高温计、建立测定钢中碳的定碳法，也是最早解释水泥硬化机理的人之一。",
            en: "In 1888 he stated the shift rule: a system at equilibrium answers a change by partly undoing it (the German Braun had published the same the year before, hence Le Chatelier–Braun). Industrial ammonia synthesis follows it — high pressure, a compromise temperature, and condensing the ammonia out to drag the chemical equilibrium toward more product (see Chemical Equilibrium); the same reasoning serves ionization and solubility shifts. From a mining family, he treated the works as his laboratory, improving the Bunsen burner and the miners' safety lamp, inventing an optical pyrometer and the carbon-in-steel determination, and among the first to explain how cement hardens.",
          },
        },
        {
          id: "scheele",
          icon: "🧪",
          term: { zh: "卡尔·威廉·舍勒", en: "Carl Wilhelm Scheele" },
          level: 1,
          oneLiner: {
            zh: "药房学徒出身的实验天才，独立发现氧与氯，还分离出一批有机酸。",
            en: "A pharmacy apprentice who found oxygen and chlorine independently and isolated a generation of organic acids.",
          },
          detail: {
            zh: "1770 年代他在乌普萨拉与林雪平的药房里，用简陋器具把空气拆开研究：约 1772 年制得氧气并称它「火的空气」，只因出版晚于普利斯特里而丢了优先权——那能让带火星的木条复燃的气体正是氧气。氯（1774 年由盐酸与软锰矿作用得到）、锰、钡，以及草酸、乳酸、柠檬酸、尿酸都出自他的手，他还发明了含砷的颜料「舍勒绿」。他习惯用看、闻、尝来鉴定试剂，四十余岁即病逝；后人检测其遗骸发现汞含量异常高，普遍推测长期的重金属暴露加速了他的死亡。",
            en: "Through the 1770s, in pharmacies at Uppsala and Linköping, he took air apart with rudimentary glassware: oxygen by about 1772, which he called 'fire air', a claim lost to Priestley only because he published later — though it was the very gas that rekindles a glowing splint. Chlorine (1774, from muriatic acid on manganese ore), manganese, barium, and oxalic, lactic, citric and uric acids all came from his bench, along with the arsenical pigment 'Scheele's green'. He identified reagents by looking, sniffing and tasting, and was dead in his forties; later assay of his remains found startlingly high mercury, and long heavy-metal exposure is the usual explanation.",
          },
        },
        {
          id: "priestley",
          icon: "🌱",
          term: { zh: "约瑟夫·普利斯特里", en: "Joseph Priestley" },
          level: 1,
          oneLiner: {
            zh: "用凸透镜聚热分解氧化汞，收集到能让蜡烛烧得更旺的气体，独立发现氧气。",
            en: "Lenses focused on mercury calx gave him a gas that made candles burn brighter: oxygen, found independently.",
          },
          detail: {
            zh: "1774 年他用大凸透镜把日光聚到氧化汞上，收集起这种能让蜡烛爆燃、小鼠活得更久的「脱燃素空气」，其实它就是氧气，命名与解释的功劳归了拉瓦锡。更早几年他已把薄荷枝与点着的蜡烛扣在同一只钟罩里，看到植物能修补被蜡烛和老鼠弄坏的气体——「光合作用」能更新空气这件事第一次露出头角。他还把二氧化碳压进水里做出汽水，也注意到印度橡胶能擦去铅笔字、因而被视作橡皮擦的推广者；他是神学家与一位论者，因公开支持美国与法国革命而在 1794 年远走宾夕法尼亚。",
            en: "In 1774 a burning lens over mercury calx gave him a gas that flashed candles into brighter flame and kept mice lively: 'dephlogisticated air' — in truth oxygen, whose correct name and theory went to Lavoisier. Years earlier he had shut a mint sprig and a lit candle under the same bell jar and watched the plant repair air that candle and beast had spoiled, the first sight of photosynthesis (see Photosynthesis) renewing the atmosphere. He also forced CO₂ into water to make soda water, and is credited with popularizing the rubber eraser after noticing India rubber rubbed out pencil marks; a Unitarian theologian, his open support for the American and French revolutions drove him to Pennsylvania in 1794.",
          },
        },
        {
          id: "davy",
          icon: "⚡",
          term: { zh: "汉弗里·戴维", en: "Humphry Davy" },
          level: 2,
          oneLiner: {
            zh: "用大电池电解熔盐，一年之内分离出钾与钠，把电解变成发现元素的手段。",
            en: "Electrolysing molten salts with a giant battery, he isolated potassium and sodium within a year and made electrolysis a way to find elements.",
          },
          detail: {
            zh: "1807 年他用那台巨型伏打电堆电解熔融的苛性钾与苛性钠，取得在水面闪燃的金属钾与钠；钙、锶、钡、镁随后相继分离，他又证明氯是一种元素而非含氧的酸——这一点上拉瓦锡判断错了。他记录过一氧化二氮能消除疼痛并建议用于手术，真正把它推上临床的是后来的牙科医生；他也证明金刚石在纯氧中能烧成二氧化碳，并发明了煤矿用的安全灯。他把装订学徒出身的法拉第提为自己的实验助手——这一步比他任何一个发现都更改变了化学。",
            en: "In 1807 a giant battery drove current through molten caustic potash and caustic soda, yielding potassium and sodium that flashed on water; calcium, strontium, barium and magnesium followed, and he showed chlorine to be an element rather than an oxygen-bearing acid, on which Lavoisier had been wrong. He noted that nitrous oxide could take away pain and suggested it for surgery — dentists were the ones who made that real — proved that diamond burns to CO₂ in pure oxygen, and invented the miners' safety lamp. He also hired Faraday, a bookbinder's apprentice, as his laboratory assistant: one decision that did more for chemistry than any of his discoveries.",
          },
        },
        {
          id: "berzelius",
          icon: "🏷️",
          term: { zh: "永斯·贝采利乌斯", en: "Jöns Berzelius" },
          level: 2,
          oneLiner: {
            zh: "定下今天仍在用的元素符号写法，把「催化」「同分异构」「蛋白质」这些词请进化学。",
            en: "Set the element symbols we still write, and brought catalysis, isomerism and protein into the language.",
          },
          detail: {
            zh: "1811 年他主张用拉丁名字的首字母加次字母做符号（O、H、Cu、Fe），数字前缀表示原子个数，取代此前各行其是的炼金式记号；这套写法沿用至今。他测定了四十余种元素的原子量，编出第一张可用的原子量表，发现铈（1803）、硒（1817）与钍（1828），并首次制得较纯的硅、锆和钽。「催化」（1835）、「同分异构」（1830）与「蛋白质」（1838）这些名字都出自他手。他的整套思路建立在「化合物由正负两半相吸」的二元电化理论上，因此难以接受有机化学的新发展，晚年与维勒、李比希等人公开争执。",
            en: "In 1811 he argued for symbols taken from Latin names — O, H, Cu, Fe — with numerals for counts, replacing the private alchemical shorthand, and the notation has survived him. He measured the atomic weights of some forty-five elements and drew the first usable table, discovered cerium (1803), selenium (1817) and thorium (1828), and prepared silicon, zirconium and tantalum in near-pure form. 'Catalysis' (1835), 'isomerism' (1830) and 'protein' (1838) are his coins. Everything sat on his dualistic electrochemical theory, in which a compound is two halves held by opposite electricity, and that frame made the new organic chemistry hard for him to accept; the quarrels with Wöhler and Liebig turned public in his old age.",
          },
        },
        {
          id: "arrhenius",
          icon: "🌡️",
          term: { zh: "斯凡特·阿伦尼乌斯", en: "Svante Arrhenius" },
          level: 3,
          oneLiner: {
            zh: "说盐溶于水自己就分成离子，又给出速率随温度变化的指数关系。",
            en: "Salts split into ions on dissolving, and rates climb with temperature by his exponential law.",
          },
          detail: {
            zh: "1884 年他的博士论文提出电解质在水中自发解离成离子、并不需要通电，评分被压到能授予学位的下限；这套说法要到范托夫与科尔劳施用依数性和电导数据支持之后才翻了案，1903 年为他换来诺贝尔化学奖。1889 年他解释为什么升温对速率的提升远大于碰撞次数增加所能解释的，给出 k = A·e^(−Ea/RT) 与活化能，这条指数关系至今是化工选择温度的依据。1896 年他第一次定量算出大气二氧化碳翻倍会带来地表增温（他的估计在 5 ℃ 上下），是温室效应研究的起点——他自己还以为这对北方农业是好事。",
            en: "His 1884 dissertation held that electrolytes split into ions on their own when dissolved, no current required, and was graded at the lowest mark that still passed; the idea reversed only after van 't Hoff and Kohlrausch backed it with colligative data and conductivity, and it brought him the 1903 chemistry prize. In 1889 he explained why heating speeds a reaction far more than the extra collisions alone would, giving k = A·e^(−Ea/RT) and the activation energy — still the reason industry picks the temperatures it does. And in 1896 he made the first quantitative estimate of how much a doubling of atmospheric CO₂ would warm the surface, around five degrees, founding climate physics while believing it would rather help northern farms.",
          },
        },
        {
          id: "vanthoff",
          icon: "🔺",
          term: { zh: "雅各布斯·范托夫", en: "Jacobus van 't Hoff" },
          level: 3,
          oneLiner: {
            zh: "把碳的四个键摆成正四面体，一举解释了互为镜像却不同的两种分子。",
            en: "He set carbon's four bonds at the corners of a tetrahedron and explained mirror-image molecules at a stroke.",
          },
          detail: {
            zh: "1874 年，二十二岁的他自费印出几页小册子，主张碳的四个价键指向正四面体的四个顶角：若一个碳连着四个不同基团，两种排列互为镜像而无法重合，旋光性的差别就有了结构解释——立体化学由此成立；法国人勒贝尔同年独立提出同一想法。同样的空间与数学思路被他搬到溶液与速率上：解释电解质依数性的范托夫因子、与气体方程同形的渗透压式 πV = nRT，以及速率随温度上升的经验关系。1901 年他领取首届诺贝尔化学奖。这套主张起初反响冷淡，他陆续以法文、英文重述，几年内被实验陆续证实；晚年研究海水蒸发析盐的顺序与植物营养。",
            en: "In 1874, aged twenty-two, he self-published a handful of pamphlet pages arguing that carbon's four bonds point to the corners of a tetrahedron: with four different groups on one carbon the two arrangements are mirror images that cannot be superposed, which gave optical activity its structural explanation and founded stereochemistry; Le Bel reached the same idea that year. He carried the same spatial mathematics into solutions and rates — the factor bearing his name for electrolyte colligative action, the osmotic law πV = nRT matching the gas equation, and an empirical rule for how rates climb with temperature. The first chemistry Nobel, in 1901, was his. The idea landed cold; he restated it in French and then English, and within a few years experiments came in on its side. Late on he worked out the order in which sea salt crystallises as brine evaporates, and plant nutrition.",
          },
        },
        {
          id: "hou-debang",
          icon: "🧂",
          term: { zh: "侯德榜", en: "Hou Debang" },
          level: 2,
          oneLiner: {
            zh: "把索尔维制碱法的封锁写成书公开，又用联合制碱法让氯化铵变成氮肥。",
            en: "He broke the Solvay blockade by publishing it, then turned ammonium chloride into fertiliser with his combined process.",
          },
          detail: {
            zh: "纯碱工艺当年被索尔维公司严密技术封锁，只许看不许问。他在永利查清碳酸化塔结疤堵塞的原因（碳酸氢钠在器壁析出），1926 年做出「红三角」牌纯碱。1933 年他用英文写成《制碱》在美国出版，把原料、设备与工艺要点摊开给全世界，封锁自此失效。抗战时工厂西迁重庆，到 1943 年他首创联合制碱：把合成氨与制碱联在同一套系统里，向母液加食盐低温析出氯化铵作氮肥，二氧化碳与食盐水循环使用，食盐的利用率由索尔维法的不足八成提到九成以上，也不再有大量氯化钙废液堆山。1955 年他当选中国科学院首批学部委员。",
            en: "The Solvay process was blockaded: plants could be visited, nothing could be asked. At the Yongli works he traced the fouling of the carbonating towers to sodium bicarbonate crusting on the walls, and in 1926 his 'Red Triangle' soda ash went to market. In 1933 he published Manufacture of Soda in the United States, laying the raw materials, plant and process open to the world, after which the blockade meant nothing. War drove the works inland to Chongqing, and by 1943 he had created the combined process: ammonia synthesis and soda manufacture in one system, salt added to the mother liquor to crystallise ammonium chloride as nitrogen fertiliser, carbon dioxide and brine recycled. Salt utilisation rose from under four-fifths to better than nine-tenths, and the heaps of waste calcium chloride disappeared. In 1955 he was elected among the first academicians of the Chinese Academy of Sciences.",
          },
        },
      ],
    },
    /* ===================== 名词词典 ===================== */
    {
      key: "glossary",
      icon: "📖",
      title: { zh: "名词词典", en: "Glossary" },
      items: [
        {
          id: "mole",
          icon: "🧮",
          term: { zh: "摩尔", en: "Mole" },
          level: 1,
          oneLiner: {
            zh: "物质的量单位，1 摩尔含阿伏伽德罗常数个基本单元。",
            en: "Unit of amount of substance; one mole holds Avogadro's number of entities.",
          },
        },
        {
          id: "catalyst",
          icon: "⚡",
          term: { zh: "催化剂", en: "Catalyst" },
          level: 1,
          oneLiner: {
            zh: "改变反应速率却不在反应中消耗的物种。",
            en: "A species that changes rate without being consumed.",
          },
        },
        {
          id: "ph",
          icon: "🧫",
          term: { zh: "pH", en: "pH" },
          level: 1,
          oneLiner: {
            zh: "氢离子浓度的负对数，衡量溶液酸碱强弱。",
            en: "Negative log of hydrogen ion concentration; measures acidity.",
          },
        },
        {
          id: "isotope",
          icon: "♒",
          term: { zh: "同位素", en: "Isotope" },
          level: 2,
          oneLiner: {
            zh: "质子数相同、中子数不同的同种元素变体。",
            en: "Variants of an element with same protons, different neutrons.",
          },
        },
        {
          id: "electrolyte",
          icon: "🔌",
          term: { zh: "电解质", en: "Electrolyte" },
          level: 2,
          oneLiner: {
            zh: "溶于水或熔融后能导电的化合物。",
            en: "A compound that conducts electricity when dissolved or molten.",
          },
        },
        {
          id: "valence",
          icon: "🔢",
          term: { zh: "化合价", en: "Valence" },
          level: 1,
          oneLiner: {
            zh: "元素原子形成化学键时表现的结合能力，常用数值表示。",
            en: "An atom's combining capacity, expressed as a number.",
          },
        },
        {
          id: "allotrope",
          icon: "💎",
          term: { zh: "同素异形体", en: "Allotrope" },
          level: 2,
          oneLiner: {
            zh: "同种元素组成的不同单质，如金刚石与石墨。",
            en: "Different forms of the same element, e.g. diamond and graphite.",
          },
        },
        {
          id: "solubility",
          icon: "💧",
          term: { zh: "溶解度", en: "Solubility" },
          level: 2,
          oneLiner: {
            zh: "一定温度、压强下某物质在溶剂中达到饱和时的浓度。",
            en: "Concentration at saturation under given T and P.",
          },
        },
        {
          id: "activation",
          icon: "🚀",
          term: { zh: "活化能", en: "Activation Energy" },
          level: 3,
          oneLiner: {
            zh: "反应物变为活化络合物所需的最低能量壁垒。",
            en: "The energy barrier reactants must cross to react.",
          },
        },
        {
          id: "oxidation-state",
          icon: "🔋",
          term: { zh: "氧化数", en: "Oxidation State" },
          level: 2,
          oneLiner: {
            zh: "人为规定的原子表观电荷数，用于判断氧化还原。",
            en: "An assigned apparent charge used to track redox.",
          },
        },
      ],
    },
  ],
  refs: [
    {
      label: { zh: "Khan Academy · 化学", en: "Khan Academy · Chemistry" },
      url: "https://www.khanacademy.org/science/chemistry",
      type: { zh: "科普", en: "Educational" },
    },
    {
      label: { zh: "PubChem", en: "PubChem" },
      url: "https://pubchem.ncbi.nlm.nih.gov/",
      type: { zh: "工具", en: "Reference" },
    },
    {
      label: {
        zh: "Royal Society of Chemistry",
        en: "Royal Society of Chemistry",
      },
      url: "https://www.rsc.org/",
      type: { zh: "机构", en: "Institution" },
    },
    {
      label: { zh: "Wikipedia · Chemistry", en: "Wikipedia · Chemistry" },
      url: "https://en.wikipedia.org/wiki/Chemistry",
      type: { zh: "百科", en: "Encyclopedia" },
    },
  ],
};
