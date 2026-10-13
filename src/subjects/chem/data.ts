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
            zh: "原子核含质子与中子；电子按能级与轨道分层排布，价电子参与成键。",
            en: "The nucleus holds protons and neutrons; electrons occupy shells; valence electrons form bonds.",
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
            zh: "门捷列夫按原子量排列并预言未知元素；现代周期表按原子序数排列。",
            en: "Mendeleev arranged by atomic weight; the modern table uses atomic number.",
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
            zh: "离子键靠电子转移、共价键靠电子共享、金属键靠离域电子海，决定硬度、熔沸点和导电性。",
            en: "Ionic (transfer), covalent (sharing) and metallic (delocalized) bonds set hardness, melting point and conductivity.",
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
            zh: "按布朗斯特-劳里定义，酸碱是质子授受关系；强酸强碱中和生成盐与水。",
            en: "Brønsted–Lowry defines them by proton transfer; neutralization yields salt and water.",
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
            zh: "燃烧、腐蚀、电池都属氧化还原；氧化剂得电子、还原剂失电子，二者相伴。",
            en: "Combustion, corrosion and batteries are redox; oxidizing and reducing agents act together.",
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
            zh: "勒夏特列原理：改变浓度、温度或压强，平衡向削弱该改变的方向移动。",
            en: "Le Chatelier's principle: a system shifts to counteract changes in concentration, temperature or pressure.",
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
            zh: "升温或加催化剂可降低活化能、加快反应；碰撞理论解释有效碰撞。",
            en: "Higher temperature or catalysts lower activation energy; collision theory explains effective collisions.",
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
            zh: "ΔG=ΔH−TΔS；ΔG<0 时反应自发，放热与熵增都有利于自发。",
            en: "ΔG=ΔH−TΔS; ΔG<0 means spontaneous.",
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
            zh: "常见于催化剂、颜料与生物分子（如血红素中的铁）。",
            en: "Seen in catalysts, pigments and biomolecules (e.g. iron in heme).",
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
            zh: "溶解度随温度升高一般增大（气体反之）；饱和溶液与温度、压强有关。",
            en: "Solubility usually rises with temperature (gases opposite); saturation depends on T and pressure.",
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
            zh: "烷、烯、炔、醇、酸、酯等构成有机家族；同分异构现象普遍。",
            en: "Alkanes, alkenes, alcohols, acids and esters form the organic family; isomers are common.",
          },
          tags: [{ zh: "有机", en: "Organic" }],
        },
      ],
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
            zh: "质子带正电、电子带负电、中子不带电；中性原子中质子数 = 原子序数 = 核外电子数，质量数 = 质子数 + 中子数。",
            en: "Protons are +, electrons −, neutrons 0; in a neutral atom protons = atomic number = electrons, and mass number = protons + neutrons.",
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
            zh: "前 20 号元素常按 2·8·8 规律排布；最外层电子数决定元素的化学性质与化合价。",
            en: "Elements 1–20 roughly follow 2·8·8; the outermost count sets chemical behavior and valence.",
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
            zh: "如 NaCl：Na 失 1 电子成 Na⁺，Cl 得 1 电子成 Cl⁻；离子键无方向性，熔沸点高、固态不导电、熔融或溶于水导电。",
            en: "In NaCl, Na loses one electron (Na⁺) and Cl gains it (Cl⁻); ionic solids have high melting points and conduct when molten or dissolved.",
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
            zh: "如 H₂、H₂O、CO₂；共用一对为单键、两对为双键、三对为三键；分极性键（H–Cl）与非极性键（H–H）。",
            en: "E.g. H₂, H₂O, CO₂; one/two/three shared pairs give single/double/triple bonds; polar (H–Cl) vs nonpolar (H–H).",
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
            zh: "CO₂ 直线形（180°）、H₂O 为 V 形（约 105°）、CH₄ 为正四面体（109.5°）、NH₃ 为三角锥形。构型影响分子极性与性质。",
            en: "CO₂ is linear (180°), H₂O bent (~105°), CH₄ tetrahedral (109.5°), NH₃ trigonal pyramidal; shape drives polarity and properties.",
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
            zh: "范德华力普遍存在；氢键比范德华力强，使水、HF、NH₃ 沸点反常偏高，也维系 DNA 双螺旋与蛋白质结构。",
            en: "Van der Waals forces are universal; stronger H-bonds raise the boiling points of water, HF and NH₃ and hold DNA and protein structures.",
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
            zh: "离子晶体（NaCl）由离子键结合、熔沸点较高；原子晶体（金刚石、SiO₂）共价键成网、极硬极高熔；分子晶体（干冰、冰）靠分子间作用力、熔沸点低；金属晶体由金属键结合、导电导热延展好。",
            en: "Ionic (NaCl, via ionic bonds), covalent-network (diamond, SiO₂, very hard and refractory), molecular (dry ice, ice, low melting) and metallic (metal bonding, conductive and malleable).",
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
            zh: "现有 7 个周期、18 个纵列；主族（IA–VIIA）与副族（过渡金属）性质各异。",
            en: "Seven periods and 18 columns; main groups and transition metals differ in behavior.",
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
            zh: "核电荷数增大使原子对电子吸引更强，故失电子能力减弱、得电子能力增强。",
            en: "Rising nuclear charge tightens the pull on electrons, weakening loss and easing gain.",
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
            zh: "电子层数增多使外层电子离核更远，更易失去。",
            en: "Extra shells move valence electrons farther, easing their loss.",
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
            zh: "左下角（如铯、钫）金属性最强，右上角（如氟）非金属性最强。",
            en: "Strongest metals bottom-left (Cs, Fr); strongest nonmetal top-right (F).",
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
            zh: "二者同周期递增、同主族递减；稀有气体电离能出现反常。",
            en: "Both rise across a period and fall down a group; noble gases are exceptions.",
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
            zh: "铁、铜、锌等是生命与工业的重要过渡金属。",
            en: "Fe, Cu, Zn are vital transition metals in life and industry.",
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
            zh: "氦、氖、氩、氪、氙、氡；可用于保护气、照明与制冷。",
            en: "He, Ne, Ar, Kr, Xe, Rn; used as shielding gas, lighting and cooling.",
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
          icon: "➕",
          term: { zh: "化合反应", en: "Synthesis" },
          level: 1,
          oneLiner: {
            zh: "多种物质生成一种新物质（A + B → AB）。",
            en: "Several substances form one product (A + B → AB).",
          },
        },
        {
          id: "decomposition",
          icon: "➖",
          term: { zh: "分解反应", en: "Decomposition" },
          level: 1,
          oneLiner: {
            zh: "一种物质分解成多种物质（AB → A + B）。",
            en: "One substance breaks into several (AB → A + B).",
          },
        },
        {
          id: "single",
          icon: "🔁",
          term: { zh: "置换反应", en: "Single Replacement" },
          level: 1,
          oneLiner: {
            zh: "活泼金属把较不活泼金属从其盐中置换出来。",
            en: "A more active metal displaces a less active one from its salt.",
          },
        },
        {
          id: "double",
          icon: "🔄",
          term: { zh: "复分解反应", en: "Double Replacement" },
          level: 2,
          oneLiner: {
            zh: "两种化合物交换组分，常生成沉淀、气体或水。",
            en: "Two compounds exchange parts, often yielding precipitate, gas or water.",
          },
        },
        {
          id: "combustion",
          icon: "🔥",
          term: { zh: "燃烧", en: "Combustion" },
          level: 1,
          oneLiner: {
            zh: "物质与氧气的剧烈氧化，发光放热。",
            en: "Vigorous oxidation with oxygen, releasing light and heat.",
          },
        },
        {
          id: "neutralization",
          icon: "🧪",
          term: { zh: "中和反应", en: "Neutralization" },
          level: 1,
          oneLiner: {
            zh: "酸与碱反应生成盐和水，pH 趋近 7。",
            en: "Acid and base form salt and water, pH trending to 7.",
          },
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
            zh: "二氧化锰作催化剂，实验室常温制氧的常用方法。",
            en: "MnO₂ catalyzes this common room-temperature lab method for O₂.",
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
            zh: "加热即可制氧，无需催化剂。",
            en: "Heating alone yields oxygen, no catalyst needed.",
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
            zh: "实验室制 CO₂ 的首选反应，也可用稀硫酸代替盐酸观察差异。",
            en: "The standard lab route to CO₂.",
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
            zh: "加少量电解质增强导电性；体积比 V(H₂):V(O₂)=2:1。",
            en: "A little electrolyte aids conduction; volume ratio H₂:O₂ = 2:1.",
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
            zh: "活泼金属置换不活泼金属，溶液由蓝变浅绿。",
            en: "A more active metal displaces a less active one; blue fades to pale green.",
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
            zh: "镁、锌、铁可与稀酸反应放氢，铜等不活泼金属不行。",
            en: "Mg, Zn, Fe release H₂ with dilute acid; Cu does not.",
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
            zh: "天然气主要成分，完全燃烧呈蓝色火焰。",
            en: "Main component of natural gas; clean blue flame when complete.",
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
            zh: "强酸强碱中和，常用酚酞指示终点。",
            en: "Strong acid-base neutralization; phenolphthalein shows the endpoint.",
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
            zh: "泡沫灭火器原理之一，产生大量 CO₂。",
            en: "Underlies foam extinguishers, releasing much CO₂.",
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
            zh: "剧烈放热，生成熟石灰，用于干燥与建筑。",
            en: "Highly exothermic, giving slaked lime for drying and building.",
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
            zh: "实验室检验 CO₂ 的特征反应；过量 CO₂ 会使沉淀溶解生成 Ca(HCO₃)₂。",
            en: "The textbook test for CO₂; excess CO₂ redissolves the precipitate.",
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
              f: "xH₂O",
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
            lhs: "4Fe + 3O₂ + xH₂O",
            rhs: "2Fe₂O₃·xH₂O",
          },
          detail: {
            zh: "潮湿空气中铁发生电化学腐蚀，生成疏松的红棕色铁锈。",
            en: "In moist air iron undergoes electrochemical corrosion into flaky rust.",
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
            zh: "生成不溶于稀硝酸的白色 BaSO₄ 沉淀，用于检验 SO₄²⁻。",
            en: "White BaSO₄ precipitate insoluble in dilute nitric acid signals SO₄²⁻.",
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
            zh: "焙制糕点常用作膨松剂，受热放出 CO₂ 使面团疏松。",
            en: "A leavening agent; heating releases CO₂ that aerates dough.",
          },
          tags: [{ zh: "分解", en: "Decomposition" }],
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
            zh: "侯德榜改进索尔维制碱法，使 NH₄Cl 作化肥析出，食盐利用率高。先通氨再通 CO₂，因 NaHCO₃ 溶解度较小而析出。",
            en: "Hou Debang improved the Solvay process, crystallizing NH₄Cl as fertilizer with high salt utilization. Ammonia is passed first, then CO₂; NaHCO₃ precipitates as the least soluble.",
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
            zh: "硬脂酸甘油酯与 NaOH 共热，产物硬脂酸钠是肥皂主要成分，另一产物丙三醇即甘油。",
            en: "Tristearin with NaOH gives sodium stearate (the main soap component) and glycerol.",
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
            zh: "哈伯法合成氨为化肥工业奠基，是 20 世纪最重要的化学工艺之一。反应可逆，正反应放热、气体分子数减小。",
            en: "The Haber process underpins fertilizer making; the reaction is reversible, exothermic and reduces gas moles.",
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
            zh: "氯碱工业基础反应；阳极出 Cl₂、阴极出 H₂ 与 NaOH。Cl₂ 与 NaOH 反应即得漂白液。",
            en: "The core chlor-alkali reaction: Cl₂ at the anode, H₂ and NaOH at the cathode; Cl₂ with NaOH makes bleach.",
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
            zh: "有效成分 Ca(ClO)₂；接触空气与水生成强氧化性 HClO 而漂白，也随之失效。",
            en: "Active Ca(ClO)₂ forms oxidizing HClO with air and water — the basis of bleaching and of spoilage.",
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
            zh: "高炉中以 CO 作还原剂炼铁，是现代钢铁工业的核心反应。",
            en: "CO serves as the reducing agent — the heart of modern ironmaking.",
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
            zh: "利用铝的强还原性与反应放热，产生高温熔融铁，用于野外焊接钢轨。",
            en: "Aluminum's strong reducing power and the exothermicity give molten iron, used to weld rails on site.",
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
            zh: "酸脱羟基、醇脱氢；浓硫酸作催化剂与吸水剂。酒的陈香、食醋风味部分源于酯类。",
            en: "The acid loses –OH and the alcohol –H; conc. H₂SO₄ catalyzes and absorbs water. Esters contribute to aged-wine and vinegar aromas.",
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
            zh: "铜丝作催化剂，是酒精在体内代谢、呼气酒精检测的化学原理之一。",
            en: "Copper catalyzes this — related to how alcohol metabolizes and to breathalyzer chemistry.",
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
            zh: "地球氧气与有机物之源，维持碳—氧平衡，把太阳能转化为化学能。",
            en: "The source of Earth's oxygen and organic matter; it balances the carbon cycle and stores solar energy.",
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
            zh: "酿酒的核心反应；产生的 CO₂ 也是馒头、面包膨松的原因之一。",
            en: "Key to brewing; the CO₂ also leavens bread and steamed buns.",
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
            zh: "胃酸主要成分是盐酸；含 Al(OH)₃ 的胃舒平通过中和缓解胃痛。小苏打也可中和但会产气。",
            en: "Stomach acid is HCl; Al(OH)₃ antacids relieve pain by neutralization. Baking soda also works but releases gas.",
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
            zh: "三步提纯：石英砂与焦炭在电弧炉约 2000 ℃ 还原得冶金级粗硅；粗硅与 HCl 在铜催化下生成液态的三氯氢硅，蒸馏除去硼、磷等杂质；再用氢气在高温下还原，硅沉积在硅芯上，经区熔或直拉法制成单晶硅锭，纯度可达 99.9999999%（9N）。芯片用硅要求极高，因为痕量的硼、磷就会显著改变导电性——这也是废旧芯片值得回收提金的前提。",
            en: "Three steps: quartz sand plus coke in an arc furnace near 2000 °C gives metallurgical-grade silicon; it reacts with HCl over a copper catalyst to form liquid trichlorosilane, which is distilled to strip boron and phosphorus; hydrogen then reduces it back to silicon deposited on seeds, and zone refining or the Czochralski pull yields an ingot up to 99.9999999% (9N). Chip-grade silicon must be that pure because traces of boron or phosphorus already shift conductivity — which is exactly why scrap chips are worth reprocessing.",
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
            zh: "海水中溴只有约 65 mg/L，直接提取不划算；工业上取晒盐后的苦卤，先酸化再通氯把 Br⁻ 氧化成 Br₂，用热空气或水蒸气把 Br₂ 吹出，以 SO₂ 水溶液吸收转成 HBr 富集，最后再氯化得到商品溴。整套“氧化—吹出—吸收—再氧化”的本质是反复浓缩。溴主要用于阻燃剂、感光材料 AgBr、医药与农药，也用作油田完井液 CaBr₂。",
            en: "Seawater holds only about 65 mg/L of bromine — too dilute to work on directly. Industry takes the bittern left after solar salt: acidify, chlorinate the Br⁻ to Br₂, strip the bromine out with hot air or steam, absorb it in aqueous SO₂ to concentrate it as HBr, then chlorinate once more to sellable bromine. The whole oxidize–blow-out–absorb–re-oxidize loop is repeated concentration. Bromine goes mainly into flame retardants, photographic AgBr, pharmaceuticals and pesticides, plus calcium bromide completion fluids in oil wells.",
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
            zh: "镁是海水中第二多的金属离子，约 1.3 g/L。工艺先煅烧石灰石或贝壳得到 CaO，消化成石灰乳加入苦卤，生成溶解度极小的 Mg(OH)₂；过滤后用盐酸溶解、蒸发结晶，再在 HCl 气氛中脱水得到无水氯化镁，最后电解熔融盐制得金属镁。注意：直接加热 MgCl₂·6H₂O 会因水解而得到 MgO，拿不到无水盐。镁合金轻而强度高，用于航空与汽车；MgO 是优质耐火材料。",
            en: "Magnesium is the second most abundant metal ion in seawater, about 1.3 g/L. The route calcines limestone or shells to CaO, slakes it into milk of lime and drops nearly insoluble Mg(OH)₂ from the bittern; the solid is redissolved in hydrochloric acid, evaporated, then dried in an HCl atmosphere to give anhydrous MgCl₂, which is electrolyzed as a melt. The catch: heating MgCl₂·6H₂O outright just hydrolyses it to MgO. Magnesium alloys are light and strong for aircraft and cars, and MgO is a top-grade refractory.",
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
            zh: "石油是烷烃、环烷烃与芳香烃的混合物，分馏塔按沸点区间切出汽油、煤油、柴油与重油——分子本身没变，所以是物理变化。重油太多而汽油不够时就要裂化，把长链断短以提高汽油产率；再升温到 700 ℃ 以上就是裂解，目的是拿乙烯、丙烯这些化工原料。汽油标号指的是辛烷值：异辛烷抗爆好定为 100，正庚烷易爆震定为 0。",
            en: "Crude oil is a mixture of alkanes, cycloalkanes and aromatics; a fractionating column cuts it by boiling range into gasoline, kerosene, diesel and residue — the molecules are untouched, so this is a physical change. When the heavy end runs long and the gasoline end short, cracking breaks long chains short to lift gasoline yield; push the temperature past 700 °C and it is pyrolysis, aimed at ethylene and propylene as chemical feedstocks. Gasoline grades quote the octane number: isooctane, which resists knock, is set at 100 and heptane, which knocks badly, at 0.",
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
            zh: "干馏是隔绝空气加强热使煤分解，得到焦炭（冶金还原剂）、煤焦油（化工原料）、粗氨水与焦炉气（H₂、CH₄、CO、C₂H₄）——分子种类变了，与石油分馏的物理变化相对。气化把煤转成 CO 与 H₂ 的合成气，是整个煤化工的枢纽：合成气再制甲醇，或甲烷化制合成天然气。液化分直接液化（高温高压加氢）与间接液化（先气化再费托合成）。中国富煤、贫油、少气，煤制油与煤制气承担着一部分能源安全的考量。",
            en: "Carbonization heats coal without air until it decomposes, giving coke for smelting, coal tar for chemicals, weak aqueous ammonia, and coke-oven gas (H₂, CH₄, CO, C₂H₄) — the molecules themselves change, which is the point of contrast with physical fractionation of oil. Gasification converts coal to CO + H₂ syngas, the pivot of the whole industry: that syngas is then made into methanol or methanated to substitute natural gas. Liquefaction comes direct (hydrogen under heat and pressure) or indirect (gasify first, then Fischer–Tropsch). China's coal-rich, oil-poor, gas-lean balance is why coal-to-liquids and coal-to-gas carry an energy-security role here.",
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
            zh: "这三样统称硅酸盐工业。普通玻璃用纯碱、石灰石与石英砂，高温下生成 Na₂SiO₃ 与 CaSiO₃，冷却后得到组成近似写作 Na₂O·CaO·6SiO₂ 的混合物；玻璃是非晶体，没有固定熔点，只有一段逐渐软化的温度区间。水泥用石灰石与黏土磨细煅烧，是水硬性胶凝材料——遇水反应硬化，所以受潮即废。陶瓷以黏土成型烧结，烧结时高岭土失去结构水。",
            en: "These three make up the silicate industry. Ordinary glass takes soda ash, limestone and quartz sand; at furnace heat they form Na₂SiO₃ and CaSiO₃, and the cooled product is a mixture written roughly as Na₂O·CaO·6SiO₂. Glass is amorphous — no fixed melting point, only a softening range. Cement is ground limestone and clay, calcined together; it sets hydraulically, reacting with water, so damp storage ruins it. Ceramics are shaped from clay and fired, the kaolinite giving up its structural water as it goes.",
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
            zh: "如 NaCl：钠失去电子成 Na⁺、氯得到电子成 Cl⁻；离子化合物熔沸点较高、固态不导电、熔融或溶于水导电。",
            en: "E.g. NaCl: Na loses an electron, Cl gains one. Ionic solids have high melting points and conduct when molten or dissolved.",
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
            zh: "非金属之间常见。相同原子间为非极性（H₂、Cl₂），不同原子间为极性（HCl、H₂O）；可用电子式与结构式表示。",
            en: "Common among nonmetals: nonpolar between like atoms (H₂), polar between unlike atoms (HCl). Shown by electron and structural formulas.",
          },
          tags: [{ zh: "化学键", en: "Bonding" }],
        },
        {
          id: "metallic-bond",
          icon: "",
          term: { zh: "金属键", en: "Metallic Bond" },
          level: 2,
          oneLiner: {
            zh: "金属阳离子与自由电子间的强烈作用，赋予金属导电、导热与延展性。",
            en: "Cations in a sea of delocalized electrons; gives conductivity, malleability and luster.",
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
            zh: "氢键使水的沸点异常高、冰密度小于水；DNA 双链也靠氢键配对。",
            en: "Hydrogen bonding raises water's boiling point, makes ice float, and pairs the DNA double helix.",
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
            zh: "金刚石（原子晶体）极硬、干冰（分子晶体）易升华、食盐（离子晶体）质脆能溶于水电解质。",
            en: "Diamond (network) is very hard, dry ice (molecular) sublimes, salt (ionic) is brittle and its solution conducts.",
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
            zh: "—OH（醇/酚）、—CHO（醛）、—COOH（酸）、—COO—（酯）、C=C（烯）；官能团决定类别与主要反应。",
            en: "—OH, —CHO, —COOH, —COO—, C=C; the group defines the class and its key reactions.",
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
            zh: "如正丁烷与异丁烷（碳链异构）、乙醇与二甲醚（官能团位置/类型异构）。",
            en: "E.g. n-butane vs isobutane, ethanol vs dimethyl ether.",
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
            zh: "葡萄糖（单糖）能发生银镜反应；淀粉、纤维素为多糖，遇碘淀粉变蓝。",
            en: "Glucose gives the silver-mirror test; starch and cellulose are polysaccharides; starch turns blue with iodine.",
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
            zh: "含肽键，遇浓硝酸变黄（显色）；高温、重金属、强酸碱使其变性。",
            en: "Contain peptide bonds; turn yellow with conc. nitric acid; denatured by heat, heavy metals, strong acid/base.",
          },
          tags: [{ zh: "生命物质", en: "Biomolecule" }],
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
            zh: "n = m/M = N/Nₐ = V/Vm（气体标况 22.4 L/mol）；是化学计算的核心枢纽。",
            en: "n = m/M = N/Nₐ = V/Vm (22.4 L/mol for gases at STP); the hub of stoichiometry.",
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
            zh: "c = n/V；配制一定物质的量浓度溶液需用容量瓶、定容到刻度线。",
            en: "c = n/V; prepared in a volumetric flask, made up to the mark.",
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
            zh: "稀释定律 c₁V₁ = c₂V₂；配制稀溶液时按此量取浓溶液与水的体积。",
            en: "Dilution law c₁V₁ = c₂V₂; measure the concentrated solution and water accordingly.",
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
            zh: "溶解度曲线随温度变化：多数固体升高、气体与少数物质（如熟石灰）降低；可分离提纯（蒸发结晶、降温结晶）。",
            en: "Solubility curves: most solids rise with temperature, gases and a few (e.g. slaked lime) fall; used for separation by evaporation or cooling crystallization.",
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
            zh: "强电解质（强酸、强碱、大部分盐）完全电离，弱电解质（弱酸弱碱）部分电离；电离方程式用 = 或 ⇌ 表示。",
            en: "Strong electrolytes ionize fully (shown with =), weak ones partially (⇌).",
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
            zh: "常温 pH<7 酸性、=7 中性、>7 碱性；pH 每差 1，氢离子浓度差 10 倍。可用指示剂或 pH 计测定。",
            en: "At 25℃: pH<7 acidic, =7 neutral, >7 basic; each unit is a tenfold change in [H⁺]. Measured by indicators or a pH meter.",
          },
          tags: [{ zh: "溶液", en: "Solution" }],
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
            zh: "从键能看：断键吸能、成键放能，二者之差决定整体放热或吸热；燃烧、中和多为放热，Ba(OH)₂·8H₂O 与 NH₄Cl 为典型吸热。",
            en: "Bond breaking absorbs, bond making releases; the difference sets the sign. Combustion and neutralization release heat; Ba(OH)₂·8H₂O + NH₄Cl absorbs it.",
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
            zh: "热化学方程式需标注物质状态与 ΔH，如 C(s)+O₂(g)=CO₂(g) ΔH=−393.5 kJ/mol。",
            en: "Thermochemical equations state phases and ΔH, e.g. C(s)+O₂(g)=CO₂(g) ΔH=−393.5 kJ/mol.",
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
            zh: "规定生成液态水、CO₂ 等稳定态；化石燃料与新能源（氢能、生物质能）都以燃烧热衡量能量高低。",
            en: "Defined with liquid water and CO₂ as stable products; fuels are ranked by it.",
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
            zh: "本质 H⁺ + OH⁻ = H₂O；弱酸弱碱电离吸热会使实测中和热偏小。",
            en: "Net ionic H⁺ + OH⁻ = H₂O; weak acids/bases absorb ionization heat, lowering the value.",
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
            zh: "像代数式一样加减热化学方程式，ΔH 随之加减，用于求难以直接测定的反应热。",
            en: "Add/subtract thermochemical equations and their ΔH to find hard-to-measure values.",
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
            zh: "v = Δc/Δt，同一反应中各物质速率之比等于化学计量数之比；不能用固体或纯液体表示。",
            en: "v = Δc/Δt; rates of species share the stoichiometric ratio; solids/liquids are excluded.",
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
            zh: "升温与加催化剂显著提高速率（增多活化分子/降低活化能）；增大浓度或压强增加单位体积内活化分子数。",
            en: "Heating and catalysts raise rate most (more activated molecules / lower activation energy); higher concentration or pressure packs more collisions.",
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
            zh: "特征“逆、等、动、定、变”；平衡常数 K 只随温度变化，K 越大正向进行程度越高。",
            en: "Dynamic stillness; K depends only on temperature — larger K means greater forward extent.",
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
            zh: "升温向吸热方向、增压向气体分子数少方向、增浓向消耗该物质方向移动；催化剂不移动平衡只加快到达。",
            en: "Heat→endothermic side, pressure→fewer gas moles, concentration→consume added species; catalysts only speed arrival.",
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
            zh: "加水稀释、升温促进电离；同离子效应抑制电离。Ka 越大酸性越强。",
            en: "Dilution and heat promote ionization; common-ion effect suppresses it. Larger Ka means stronger acid.",
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
            zh: "“谁强显谁性”：强碱弱酸盐水解显碱性（纯碱去油污），强酸弱碱盐水解显酸性；升温促进水解。",
            en: "The stronger partner sets the tone: basic salts from strong base + weak acid (washing soda degreasing); heating promotes hydrolysis.",
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
            zh: "锌铜原电池：负极 Zn−2e⁻=Zn²⁺（氧化），正极 2H⁺+2e⁻=H₂↑（还原）；电子经外电路由负到正。",
            en: "Zn–Cu cell: anode Zn−2e⁻=Zn²⁺, cathode 2H⁺+2e⁻=H₂↑; electrons flow externally from − to +.",
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
            zh: "阳极氧化、阴极还原；电解水：阳极出 O₂、阴极出 H₂（体积比 1:2），阴阳两极得失电子数相等。",
            en: "Anode oxidizes, cathode reduces; electrolyzing water gives O₂ and H₂ in a 1:2 volume ratio with equal electrons.",
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
            zh: "钢铁吸氧腐蚀最常见；防护有涂镀层、改变组成（不锈钢）、牺牲阳极（接更活泼金属）与外加电流阴极保护法。",
            en: "Iron's oxygen absorption rust is common; protection includes coatings, stainless alloys, sacrificial anodes and impressed-current cathodic protection.",
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
            zh: "电镀：镀层金属作阳极、待镀件作阴极、含镀层离子为电解液；电解精炼铜时粗铜作阳极、纯铜作阴极。",
            en: "Plating: anode is coating metal, cathode the workpiece, electrolyte holds its ions; refining copper uses crude anode and pure cathode.",
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
            zh: "Q = It，1 mol 电子电量约 96500 C（法第常数 F）；据此由电量算析出金属的质量与气体的体积。",
            en: "Q = It with F ≈ 96500 C/mol; use charge to compute deposited mass and gas volume.",
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
