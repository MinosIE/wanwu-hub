import type { SubjectConfig } from "../subjectKit";

export const physicsData: Omit<SubjectConfig, "rootClass" | "accent"> = {
  heroTitle: { zh: "万物物理", en: "Physics of Everything" },
  heroSub: { zh: "万物之理", en: "The Order of All Things" },
  intro: {
    zh: "从基本定律、常数到关键实验与物理学家，看见支配宇宙运行的简洁秩序。示例性内容，持续扩充中。",
    en: "Laws, constants, landmark experiments and physicists — the elegant order governing the universe. Seed content, expanding.",
  },
  modules: [
    {
      key: "concepts",
      icon: "⚛️",
      title: { zh: "核心概念", en: "Core Concepts" },
      items: [
        {
          id: "newtons-laws",
          icon: "🍎",
          term: { zh: "牛顿运动定律", en: "Newton's Laws of Motion" },
          level: 1,
          oneLiner: {
            zh: "描述物体运动与受力关系的三条基本定律：惯性、F=ma、作用与反作用。",
            en: "Three basic laws linking motion and force: inertia, F=ma, and action–reaction.",
          },
          detail: {
            zh: "牛顿在《自然哲学的数学原理》(1687) 中提出：第一定律（惯性）指出无外力时物体保持静止或匀速直线运动；第二定律定量给出 F=ma；第三定律说明力总是成对出现、大小相等方向相反。",
            en: "Proposed by Newton in Principia (1687): the first law (inertia) states an object keeps its state absent external force; the second gives F=ma; the third says forces come in equal, opposite pairs.",
          },
          example: {
            zh: "急刹车时乘客向前倾，正是惯性使身体维持原有运动状态。",
            en: "Passengers lurch forward in a sudden stop — inertia keeps the body moving.",
          },
          tags: [{ zh: "经典力学", en: "Mechanics" }],
        },
        {
          id: "conservation-energy",
          icon: "🔋",
          term: { zh: "能量守恒", en: "Conservation of Energy" },
          level: 1,
          oneLiner: {
            zh: "能量不会凭空产生或消失，只会从一种形式转化为另一种。",
            en: "Energy is never created or destroyed, only converted between forms.",
          },
          detail: {
            zh: "热力学第一定律即能量守恒在热力学中的表述：系统内能的变化等于吸收的热量减去对外做的功。机械能、热能、电磁能、化学能等可相互转化，总量不变。",
            en: "The first law of thermodynamics is energy conservation: change in internal energy equals heat added minus work done. Mechanical, thermal, electromagnetic and chemical energy interchange while the total stays constant.",
          },
          tags: [{ zh: "能量", en: "Energy" }],
        },
        {
          id: "gravity",
          icon: "🌎",
          term: { zh: "万有引力", en: "Universal Gravitation" },
          level: 1,
          oneLiner: {
            zh: "任意两个有质量的物体相互吸引，力与质量乘积成正比、与距离平方成反比。",
            en: "Any two masses attract; force scales with their product and inversely with distance squared.",
          },
          detail: {
            zh: "牛顿万有引力定律 F = G·m₁m₂/r² 统一了地面落体与天体运行。它解释行星轨道、潮汐，并在广义相对论中被重新诠释为时空弯曲。",
            en: "F = G·m₁m₂/r² unifies falling apples and planetary orbits, explaining tides; general relativity later reframes it as spacetime curvature.",
          },
          tags: [{ zh: "引力", en: "Gravity" }],
        },
        {
          id: "thermodynamics-2nd",
          icon: "🔥",
          term: { zh: "热力学第二定律", en: "Second Law of Thermodynamics" },
          level: 2,
          oneLiner: {
            zh: "孤立系统的熵（无序度）永不减少；热量不能自发从低温流向高温。",
            en: "Entropy of an isolated system never decreases; heat does not flow spontaneously from cold to hot.",
          },
          detail: {
            zh: "第二定律给出过程的方向性：宏观过程不可逆。它是理解热机效率上限（卡诺极限）与时间箭头的基础。",
            en: "It sets the direction of processes and the irreversibility of macro events, underlying heat-engine limits (Carnot) and the arrow of time.",
          },
          tags: [{ zh: "热力学", en: "Thermodynamics" }],
        },
        {
          id: "em-induction",
          icon: "🧲",
          term: { zh: "电磁感应", en: "Electromagnetic Induction" },
          level: 2,
          oneLiner: {
            zh: "变化的磁场会在导体中产生感应电动势（法拉第定律）。",
            en: "A changing magnetic field induces an electromotive force (Faraday's law).",
          },
          detail: {
            zh: "法拉第与楞次定律奠定了发电机、变压器的基础，是电能大规模应用的核心原理。",
            en: "Faraday's and Lenz's laws underpin generators and transformers — the core of large-scale electricity.",
          },
          tags: [{ zh: "电磁学", en: "Electromagnetism" }],
        },
        {
          id: "relativity",
          icon: "🕰️",
          term: { zh: "狭义相对论", en: "Special Relativity" },
          level: 3,
          oneLiner: {
            zh: "光速不变，时间与空间随运动速度相对变化（时间膨胀、长度收缩）。",
            en: "Light speed is invariant; time and space vary with motion (time dilation, length contraction).",
          },
          detail: {
            zh: "爱因斯坦 1905 年提出，基于相对性原理与光速不变。质能等价 E=mc² 揭示质量即能量。",
            en: "Einstein (1905) built it on relativity and light-speed invariance; E=mc² reveals mass as energy.",
          },
          tags: [{ zh: "现代物理", en: "Modern" }],
        },
        {
          id: "quantization",
          icon: "📊",
          term: { zh: "量子化", en: "Quantization" },
          level: 2,
          oneLiner: {
            zh: "某些物理量（如能量、角动量）只能取离散值，而非连续。",
            en: "Some quantities (energy, angular momentum) take discrete values, not continuous ones.",
          },
          detail: {
            zh: "普朗克为解释黑体辐射假设能量以 hν 为最小单元，开启量子理论。原子能级、光子都是量子化的体现。",
            en: "Planck's hν quanta explained blackbody radiation and launched quantum theory; atomic levels and photons are quantized.",
          },
          tags: [{ zh: "量子", en: "Quantum" }],
        },
        {
          id: "wave-particle",
          icon: "🌊",
          term: { zh: "波粒二象性", en: "Wave-Particle Duality" },
          level: 3,
          oneLiner: {
            zh: "微观粒子既表现出波动性也表现出粒子性。",
            en: "Microscopic particles exhibit both wave-like and particle-like behavior.",
          },
          detail: {
            zh: "德布罗意提出物质波，电子衍射实验证实。对同一个对象，测量方式决定呈现出波还是粒子的面貌。",
            en: "De Broglie proposed matter waves, confirmed by electron diffraction; how we measure decides the aspect observed.",
          },
          tags: [{ zh: "量子", en: "Quantum" }],
        },
        {
          id: "uncertainty",
          icon: "❓",
          term: { zh: "不确定性原理", en: "Uncertainty Principle" },
          level: 3,
          oneLiner: {
            zh: "无法同时精确知道粒子的位置与动量，二者不确定度乘积有下限。",
            en: "Position and momentum cannot be simultaneously known precisely; their uncertainties have a lower bound.",
          },
          detail: {
            zh: "海森堡 1927 年提出，这是量子系统的本质属性，而非测量技术不足。它划定了经典决定论的边界。",
            en: "Heisenberg (1927): a fundamental property of quantum systems, not instrumental limitation, bounding classical determinism.",
          },
          tags: [{ zh: "量子", en: "Quantum" }],
        },
        {
          id: "momentum",
          icon: "🏹",
          term: { zh: "动量守恒", en: "Conservation of Momentum" },
          level: 2,
          oneLiner: {
            zh: "在无外力作用的系统中，总动量保持不变。",
            en: "In a system free of external forces, total momentum is conserved.",
          },
          detail: {
            zh: "动量守恒与牛顿第三定律等价，是分析碰撞、火箭推进与粒子散射的基本工具。",
            en: "Equivalent to Newton's third law, it is the basic tool for collisions, rocket propulsion and scattering.",
          },
          tags: [{ zh: "力学", en: "Mechanics" }],
        },
      ],
    },
    {
      key: "constants",
      icon: "🔢",
      title: { zh: "关键常数", en: "Key Constants" },
      items: [
        {
          id: "c",
          icon: "💡",
          term: { zh: "光速", en: "Speed of Light" },
          value: { zh: "≈ 3.00×10⁸ m/s", en: "≈ 3.00×10⁸ m/s" },
          oneLiner: {
            zh: "真空中的光速，相对论与电磁学的基石。",
            en: "Speed of light in vacuum; the cornerstone of relativity and electromagnetism.",
          },
          detail: {
            zh: "在所有惯性系中光速相同，这一不变性是狭义相对论的出发点。",
            en: "Identical in all inertial frames — the starting point of special relativity.",
          },
        },
        {
          id: "h",
          icon: "➿",
          term: { zh: "普朗克常数", en: "Planck Constant" },
          value: { zh: "6.626×10⁻³⁴ J·s", en: "6.626×10⁻³⁴ J·s" },
          oneLiner: {
            zh: "量子化的尺度，联系能量与频率 E = hν。",
            en: "The scale of quantization, linking energy and frequency via E = hν.",
          },
        },
        {
          id: "G",
          icon: "🪐",
          term: { zh: "引力常数", en: "Gravitational Constant" },
          value: { zh: "6.674×10⁻¹¹ N·m²/kg²", en: "6.674×10⁻¹¹ N·m²/kg²" },
          oneLiner: {
            zh: "万有引力定律中的比例系数，衡量引力的强弱。",
            en: "The proportionality in Newton's gravitation, measuring gravity's strength.",
          },
        },
        {
          id: "e",
          icon: "⚡",
          term: { zh: "元电荷", en: "Elementary Charge" },
          value: { zh: "1.602×10⁻¹⁹ C", en: "1.602×10⁻¹⁹ C" },
          oneLiner: {
            zh: "单个质子所带（或电子电荷绝对值）的基本电量。",
            en: "The fundamental charge of a proton (or magnitude of an electron's).",
          },
        },
        {
          id: "k",
          icon: "🌡️",
          term: { zh: "玻尔兹曼常数", en: "Boltzmann Constant" },
          value: { zh: "1.38×10⁻²³ J/K", en: "1.38×10⁻²³ J/K" },
          oneLiner: {
            zh: "连接宏观温度与微观粒子平均动能的桥梁。",
            en: "Bridges macroscopic temperature and microscopic average kinetic energy.",
          },
        },
        {
          id: "Na",
          icon: "🧮",
          term: { zh: "阿伏伽德罗常数", en: "Avogadro's Number" },
          value: { zh: "6.022×10²³ mol⁻¹", en: "6.022×10²³ mol⁻¹" },
          oneLiner: {
            zh: "1 摩尔物质所含基本单元（原子/分子）的个数。",
            en: "Number of elementary entities in one mole of substance.",
          },
        },
      ],
    },
    {
      key: "experiments",
      icon: "🔬",
      title: { zh: "著名实验", en: "Landmark Experiments" },
      items: [
        {
          id: "double-slit",
          icon: "🌗",
          term: { zh: "杨氏双缝实验", en: "Young's Double-Slit" },
          oneLiner: {
            zh: "光通过双缝形成干涉条纹，证明光的波动性；单光子下仍呈干涉，引出波粒二象性。",
            en: "Light through two slits makes interference fringes, proving wave behavior; single photons still interfere, hinting duality.",
          },
        },
        {
          id: "michelson-morley",
          icon: "📏",
          term: { zh: "迈克尔逊-莫雷实验", en: "Michelson–Morley" },
          oneLiner: {
            zh: "试图探测「以太风」却得到零结果，为狭义相对论扫清障碍。",
            en: "Sought the 'aether wind' but found none, clearing the way for special relativity.",
          },
        },
        {
          id: "millikan",
          icon: "💧",
          term: { zh: "密立根油滴实验", en: "Millikan Oil-Drop" },
          oneLiner: {
            zh: "通过悬浮带电油滴测出元电荷，证实电荷的量子化。",
            en: "Measured the elementary charge from suspended charged droplets, confirming charge quantization.",
          },
        },
        {
          id: "rutherford",
          icon: "⚛️",
          term: { zh: "卢瑟福金箔实验", en: "Rutherford Gold-Foil" },
          oneLiner: {
            zh: "α 粒子大角度散射让卢瑟福提出原子核式模型。",
            en: "Large-angle α scattering led Rutherford to the nuclear model of the atom.",
          },
        },
        {
          id: "cavendish",
          icon: "⚖️",
          term: { zh: "卡文迪许扭秤", en: "Cavendish Experiment" },
          oneLiner: {
            zh: "首次测出万有引力常数 G，并由此估算地球质量。",
            en: "First measured G and thereby estimated the Earth's mass.",
          },
        },
      ],
    },
    {
      key: "physicists",
      icon: "🧑‍🔬",
      title: { zh: "物理学家", en: "Physicists" },
      items: [
        {
          id: "newton",
          icon: "🍎",
          term: { zh: "艾萨克·牛顿", en: "Isaac Newton" },
          oneLiner: {
            zh: "经典力学与微积分奠基人，《原理》建立运动三定律与万有引力。",
            en: "Founder of classical mechanics and calculus; Principia set the three laws and gravitation.",
          },
        },
        {
          id: "einstein",
          icon: "🧠",
          term: { zh: "阿尔伯特·爱因斯坦", en: "Albert Einstein" },
          oneLiner: {
            zh: "狭义与广义相对论、光电效应，重塑人类对时空与引力的理解。",
            en: "Special & general relativity and the photoelectric effect reshaped space, time and gravity.",
          },
        },
        {
          id: "maxwell",
          icon: "🧲",
          term: { zh: "詹姆斯·麦克斯韦", en: "James Clerk Maxwell" },
          oneLiner: {
            zh: "统一电、磁、光，提出麦克斯韦方程组。",
            en: "Unified electricity, magnetism and light via Maxwell's equations.",
          },
        },
        {
          id: "bohr",
          icon: "🪐",
          term: { zh: "尼尔斯·玻尔", en: "Niels Bohr" },
          oneLiner: {
            zh: "原子结构量子化模型（玻尔模型）与哥本哈根诠释。",
            en: "Quantized atomic model (Bohr model) and the Copenhagen interpretation.",
          },
        },
        {
          id: "curie",
          icon: "☢️",
          term: { zh: "玛丽·居里", en: "Marie Curie" },
          oneLiner: {
            zh: "放射性研究先驱，首位两获诺贝尔奖的科学家。",
            en: "Pioneer of radioactivity; first person to win two Nobel Prizes.",
          },
        },
        {
          id: "galileo",
          icon: "🔭",
          term: { zh: "伽利略·伽利雷", en: "Galileo Galilei" },
          oneLiner: {
            zh: "近代实验物理与天文观测奠基人，惯性概念先驱。",
            en: "Founder of modern experimental physics and observational astronomy; pioneer of inertia.",
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
          id: "entropy",
          icon: "🔀",
          term: { zh: "熵", en: "Entropy" },
          oneLiner: {
            zh: "系统无序程度的度量，也是热力学第二定律的核心。",
            en: "A measure of disorder and the heart of the second law of thermodynamics.",
          },
        },
        {
          id: "photon",
          icon: "✨",
          term: { zh: "光子", en: "Photon" },
          oneLiner: {
            zh: "光的量子，静质量为零的电磁场能量包。",
            en: "The quantum of light, a massless packet of electromagnetic energy.",
          },
        },
        {
          id: "field",
          icon: "🕸️",
          term: { zh: "场", en: "Field" },
          oneLiner: {
            zh: "空间中每点都赋予一个物理量的分布，如引力场、电磁场。",
            en: "An assignment of a physical quantity to every point in space, e.g. gravity or EM field.",
          },
        },
        {
          id: "plasma",
          icon: "⚡",
          term: { zh: "等离子体", en: "Plasma" },
          oneLiner: {
            zh: "电离气体，由自由电子与离子组成，被称为物质的第四态。",
            en: "Ionized gas of free electrons and ions — often called the fourth state of matter.",
          },
        },
      ],
    },
  ],
};
