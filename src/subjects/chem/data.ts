import type { SubjectConfig } from "../subjectKit";

export const chemData: Omit<SubjectConfig, "rootClass" | "accent"> = {
  heroTitle: { zh: "万物化学", en: "Chemistry of Everything" },
  heroSub: { zh: "物质之变", en: "The Transformations of Matter" },
  intro: {
    zh: "从元素、化学反应到材料与化学家，理解物质如何组合、分解与转化。示例性内容，持续扩充中。",
    en: "Elements, reactions, materials and chemists — how matter combines, breaks apart and transforms. Seed content, expanding.",
  },
  modules: [
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
            zh: "原子核含质子与中子；电子按能级与轨道分层排布。价电子（最外层电子）参与成键。",
            en: "The nucleus holds protons and neutrons; electrons occupy shells and orbitals. Valence electrons form bonds.",
          },
          tags: [{ zh: "结构", en: "Structure" }],
        },
        {
          id: "periodic",
          icon: "📐",
          term: { zh: "元素周期律", en: "Periodic Law" },
          level: 1,
          oneLiner: {
            zh: "元素性质随原子序数呈周期性变化，周期表是其系统呈现。",
            en: "Element properties repeat periodically with atomic number; the table expresses this.",
          },
          detail: {
            zh: "门捷列夫按原子量排列并预言未知元素；现代周期表按原子序数排列，同族元素性质相近。",
            en: "Mendeleev arranged by atomic weight and predicted unknowns; the modern table uses atomic number, with similar families.",
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
            en: "Atoms join into molecules and crystals via ionic, covalent or metallic bonds.",
          },
          detail: {
            zh: "离子键靠电子转移、共价键靠电子共享、金属键靠离域电子海，决定物质的硬度、熔沸点和导电性。",
            en: "Ionic (transfer), covalent (sharing) and metallic (delocalized electrons) bonds set hardness, melting point and conductivity.",
          },
          tags: [{ zh: "成键", en: "Bonding" }],
        },
        {
          id: "acid-base",
          icon: "🧫",
          term: { zh: "酸碱", en: "Acids & Bases" },
          level: 2,
          oneLiner: {
            zh: "酸给出质子（H⁺），碱接受质子；pH 衡量溶液的酸碱性。",
            en: "Acids donate protons (H⁺), bases accept them; pH measures acidity.",
          },
          detail: {
            zh: "按布朗斯特-劳里定义，酸碱是质子授受关系。强酸强碱中和生成盐与水。",
            en: "Brønsted–Lowry defines them by proton transfer; strong acid–base neutralization yields salt and water.",
          },
          tags: [{ zh: "酸碱", en: "Acid-Base" }],
        },
        {
          id: "redox",
          icon: "🔋",
          term: { zh: "氧化还原反应", en: "Redox" },
          level: 2,
          oneLiner: {
            zh: "电子转移的过程：升价被氧化，降价被还原。",
            en: "Electron transfer: oxidation raises oxidation state, reduction lowers it.",
          },
          detail: {
            zh: "燃烧、腐蚀、电池都属氧化还原。氧化剂得电子、还原剂失电子，二者相伴发生。",
            en: "Combustion, corrosion and batteries are redox; the oxidizing agent gains electrons as the reducing agent loses them.",
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
            en: "Concentration, temperature, catalysts and surface area affect how fast reactions go.",
          },
          detail: {
            zh: "升高温度或加催化剂可降低活化能、加快反应；碰撞理论解释有效碰撞。",
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
            zh: "用焓、熵、吉布斯自由能判断反应能否自发进行。",
            en: "Enthalpy, entropy and Gibbs free energy decide if a reaction is spontaneous.",
          },
          detail: {
            zh: "ΔG = ΔH − TΔS：ΔG < 0 时反应自发。放热与熵增都有利于自发。",
            en: "ΔG = ΔH − TΔS; ΔG < 0 means spontaneous. Exothermic and entropy-increasing both help.",
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
            en: "Central metal ions bonded to ligands via coordinate bonds form complex structures.",
          },
          detail: {
            zh: "常见于催化剂、颜料与生物分子（如血红素中的铁）。配位数与几何构型多样。",
            en: "Seen in catalysts, pigments and biomolecules (e.g. iron in heme); varied coordination numbers and geometries.",
          },
          tags: [{ zh: "无机", en: "Inorganic" }],
        },
      ],
    },
    {
      key: "elements",
      icon: "🧬",
      title: { zh: "元素", en: "Elements" },
      items: [
        {
          id: "h",
          icon: "💧",
          term: { zh: "氢", en: "Hydrogen" },
          value: { zh: "H · 1 号", en: "H · Z=1" },
          oneLiner: {
            zh: "宇宙中最丰富的元素，最轻的气体，可作清洁能源。",
            en: "The most abundant element; lightest gas and a clean energy carrier.",
          },
        },
        {
          id: "c",
          icon: "⚫",
          term: { zh: "碳", en: "Carbon" },
          value: { zh: "C · 6 号", en: "C · Z=6" },
          oneLiner: {
            zh: "有机化学的核心，能形成长链与多种同素异形体（石墨、金刚石）。",
            en: "The core of organic chemistry; forms chains and allotropes like graphite and diamond.",
          },
        },
        {
          id: "o",
          icon: "🫧",
          term: { zh: "氧", en: "Oxygen" },
          value: { zh: "O · 8 号", en: "O · Z=8" },
          oneLiner: {
            zh: "维持呼吸与燃烧，地壳中含量最高的元素。",
            en: "Sustains respiration and combustion; most abundant element in Earth's crust.",
          },
        },
        {
          id: "fe",
          icon: "🔩",
          term: { zh: "铁", en: "Iron" },
          value: { zh: "Fe · 26 号", en: "Fe · Z=26" },
          oneLiner: {
            zh: "人类文明的支柱金属，血红蛋白与钢的核心成分。",
            en: "The backbone metal of civilization; core of hemoglobin and steel.",
          },
        },
        {
          id: "au",
          icon: "🥇",
          term: { zh: "金", en: "Gold" },
          value: { zh: "Au · 79 号", en: "Au · Z=79" },
          oneLiner: {
            zh: "化学性质极稳定、延展性好的贵金属，自古作货币与饰品。",
            en: "Extremely stable and ductile noble metal, long used for coinage and jewelry.",
          },
        },
        {
          id: "na",
          icon: "🧂",
          term: { zh: "钠", en: "Sodium" },
          value: { zh: "Na · 11 号", en: "Na · Z=11" },
          oneLiner: {
            zh: "活泼碱金属，与氯结合成食盐（NaCl）。",
            en: "Reactive alkali metal; pairs with chlorine as table salt (NaCl).",
          },
        },
        {
          id: "si",
          icon: "💾",
          term: { zh: "硅", en: "Silicon" },
          value: { zh: "Si · 14 号", en: "Si · Z=14" },
          oneLiner: {
            zh: "半导体工业的基础，地壳第二丰富的元素。",
            en: "The basis of semiconductors and the second-most abundant crustal element.",
          },
        },
        {
          id: "he",
          icon: "🎈",
          term: { zh: "氦", en: "Helium" },
          value: { zh: "He · 2 号", en: "He · Z=2" },
          oneLiner: {
            zh: "稀有气体，极稳定、密度小，用于气球与制冷。",
            en: "Noble gas, very stable and light; used in balloons and cooling.",
          },
        },
      ],
    },
    {
      key: "reactions",
      icon: "🔥",
      title: { zh: "反应类型", en: "Reaction Types" },
      items: [
        {
          id: "synthesis",
          icon: "➕",
          term: { zh: "化合反应", en: "Synthesis" },
          oneLiner: {
            zh: "多种物质生成一种新物质（A + B → AB）。",
            en: "Several substances form one product (A + B → AB).",
          },
        },
        {
          id: "decomposition",
          icon: "➖",
          term: { zh: "分解反应", en: "Decomposition" },
          oneLiner: {
            zh: "一种物质分解成多种物质（AB → A + B）。",
            en: "One substance breaks into several (AB → A + B).",
          },
        },
        {
          id: "single",
          icon: "🔁",
          term: { zh: "置换反应", en: "Single Replacement" },
          oneLiner: {
            zh: "活泼金属把较不活泼金属从其盐中置换出来。",
            en: "A more active metal displaces a less active one from its salt.",
          },
        },
        {
          id: "double",
          icon: "🔄",
          term: { zh: "复分解反应", en: "Double Replacement" },
          oneLiner: {
            zh: "两种化合物交换组分，常生成沉淀、气体或水。",
            en: "Two compounds exchange parts, often yielding a precipitate, gas or water.",
          },
        },
        {
          id: "combustion",
          icon: "🔥",
          term: { zh: "燃烧", en: "Combustion" },
          oneLiner: {
            zh: "物质与氧气的剧烈氧化，发光放热。",
            en: "Vigorous oxidation with oxygen, releasing light and heat.",
          },
        },
        {
          id: "neutralization",
          icon: "🧪",
          term: { zh: "中和反应", en: "Neutralization" },
          oneLiner: {
            zh: "酸与碱反应生成盐和水，pH 趋近 7。",
            en: "Acid and base form salt and water, pH trending to 7.",
          },
        },
      ],
    },
    {
      key: "chemists",
      icon: "🧑‍🔬",
      title: { zh: "化学家", en: "Chemists" },
      items: [
        {
          id: "mendeleev",
          icon: "📐",
          term: { zh: "德米特里·门捷列夫", en: "Dmitri Mendeleev" },
          oneLiner: {
            zh: "编制第一张元素周期表，并预言了若干未知元素。",
            en: "Built the first periodic table and predicted several unknown elements.",
          },
        },
        {
          id: "lavoisier",
          icon: "⚖️",
          term: { zh: "安托万·拉瓦锡", en: "Antoine Lavoisier" },
          oneLiner: {
            zh: "现代化学之父，确立质量守恒与氧化学说。",
            en: "Father of modern chemistry; established conservation of mass and oxygen theory.",
          },
        },
        {
          id: "dalton",
          icon: "⚛️",
          term: { zh: "约翰·道尔顿", en: "John Dalton" },
          oneLiner: {
            zh: "提出原子论，认为物质由不可再分的原子构成。",
            en: "Proposed atomic theory: matter is made of indivisible atoms.",
          },
        },
        {
          id: "boyle",
          icon: "🫧",
          term: { zh: "罗伯特·玻意耳", en: "Robert Boyle" },
          oneLiner: {
            zh: "玻意耳定律（pV = 常量）奠定气体研究基础。",
            en: "Boyle's law (pV = const) founded the study of gases.",
          },
        },
        {
          id: "curie",
          icon: "☢️",
          term: { zh: "玛丽·居里", en: "Marie Curie" },
          oneLiner: {
            zh: "发现钋与镭，放射性研究的先驱。",
            en: "Discovered polonium and radium; pioneer of radioactivity.",
          },
        },
        {
          id: "pauling",
          icon: "🔗",
          term: { zh: "莱纳斯·鲍林", en: "Linus Pauling" },
          oneLiner: {
            zh: "化学键本质与电负性研究的巨擘，两获诺贝尔奖。",
            en: "Giant of chemical bonding and electronegativity; two-time Nobel laureate.",
          },
        },
      ],
    },
    {
      key: "glossary",
      icon: "📖",
      title: { zh: "名词词典", en: "Glossary" },
      items: [
        {
          id: "mole",
          icon: "🧮",
          term: { zh: "摩尔", en: "Mole" },
          oneLiner: {
            zh: "物质的量单位，1 摩尔含阿伏伽德罗常数个基本单元。",
            en: "Unit of amount of substance; one mole holds Avogadro's number of entities.",
          },
        },
        {
          id: "catalyst",
          icon: "⚡",
          term: { zh: "催化剂", en: "Catalyst" },
          oneLiner: {
            zh: "改变反应速率却不在反应中消耗的物种。",
            en: "A species that changes rate without being consumed.",
          },
        },
        {
          id: "ph",
          icon: "🧫",
          term: { zh: "pH", en: "pH" },
          oneLiner: {
            zh: "氢离子浓度的负对数，衡量溶液酸碱强弱。",
            en: "Negative log of hydrogen ion concentration; measures acidity.",
          },
        },
        {
          id: "isotope",
          icon: "♒",
          term: { zh: "同位素", en: "Isotope" },
          oneLiner: {
            zh: "质子数相同、中子数不同的同种元素变体。",
            en: "Variants of an element with the same protons but different neutrons.",
          },
        },
        {
          id: "electrolyte",
          icon: "🔌",
          term: { zh: "电解质", en: "Electrolyte" },
          oneLiner: {
            zh: "溶于水或熔融后能导电的化合物。",
            en: "A compound that conducts electricity when dissolved or molten.",
          },
        },
      ],
    },
  ],
};
