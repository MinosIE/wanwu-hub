import type { SubjectConfig } from "../subjectKit";

export const physicsData: Omit<SubjectConfig, "rootClass" | "accent"> = {
  heroTitle: { zh: "万物物理", en: "Physics of Everything" },
  intro: {
    zh: "从运动、声、光、热、电磁到天体与相对论，按高中物理脉络系统梳理核心概念、常数、实验与物理学家。",
    en: "Motion, sound, light, heat, electromagnetism, astronomy and relativity — core concepts, constants, experiments and physicists organized along the high-school physics map.",
  },
  modules: [
    /* ===================== 运动与力学 ===================== */
    {
      key: "mechanics",
      icon: "🏃",
      title: { zh: "运动与力学", en: "Motion & Mechanics" },
      items: [
        {
          id: "motion-desc",
          icon: "📏",
          term: { zh: "运动的描述", en: "Describing Motion" },
          level: 1,
          oneLiner: {
            zh: "用位移、速度、加速度描述物体位置随时间的变化。",
            en: "Displacement, velocity and acceleration describe how position changes with time.",
          },
          detail: {
            zh: "位移是矢量（初位置指向末位置）；速度是位移对时间的变化率；加速度是速度对时间的变化率，反映速度变化的快慢。",
            en: "Displacement is the vector from start to end; velocity is its rate of change; acceleration is the rate of change of velocity.",
          },
          tags: [{ zh: "运动学", en: "Kinematics" }],
        },
        {
          id: "uniform-motion",
          icon: "➡️",
          term: { zh: "匀速直线运动", en: "Uniform Linear Motion" },
          level: 1,
          oneLiner: {
            zh: "速度恒定、轨迹为直线的运动，位移与时间成正比。",
            en: "Motion at constant velocity along a straight line; displacement is proportional to time.",
          },
          tags: [{ zh: "运动学", en: "Kinematics" }],
        },
        {
          id: "accelerated-motion",
          eq: [
            { lhs: "v", rhs: "v₀ + at", rel: "equal" },
            { lhs: "x", rhs: "v₀t + ½at²", rel: "equal" },
            { lhs: "v²", rhs: "v₀² + 2ax", rel: "equal" },
          ],
          icon: "📈",
          term: { zh: "匀变速直线运动", en: "Uniformly Accelerated Motion" },
          level: 1,
          oneLiner: {
            zh: "加速度恒定的直线运动，常用公式 v=v₀+at、x=v₀t+½at²、v²−v₀²=2ax。",
            en: "Constant acceleration: v=v₀+at, x=v₀t+½at², v²−v₀²=2ax.",
          },
          detail: {
            zh: "自由落体是加速度为 g≈9.8 m/s² 的匀加速运动；竖直上抛可分段或整体处理。其中 v₀、v 为初、末速度，a 为加速度，t 为时间，x 为位移。",
            en: "Free fall is uniformly accelerated motion with a=g≈9.8 m/s²; vertical projection can be split or treated as a whole. Here v₀/v are initial/final velocity, a acceleration, t time, x displacement.",
          },
          example: {
            zh: "苹果下落约 0.5 s 后速度达约 4.9 m/s。",
            en: "After ~0.5 s a falling apple reaches ~4.9 m/s.",
          },
          tags: [{ zh: "运动学", en: "Kinematics" }],
        },
        {
          id: "newton-1",
          icon: "🍎",
          term: {
            zh: "牛顿第一定律（惯性）",
            en: "Newton's First Law (Inertia)",
          },
          level: 1,
          oneLiner: {
            zh: "不受外力或合外力为零时，物体保持静止或匀速直线运动。",
            en: "With no net force, an object stays at rest or in uniform motion.",
          },
          detail: {
            zh: "惯性是物体保持原有运动状态的属性，质量越大惯性越大。",
            en: "Inertia is the tendency to keep current motion; larger mass means larger inertia.",
          },
          tags: [{ zh: "牛顿定律", en: "Newton's Laws" }],
        },
        {
          id: "newton-2",
          eq: { lhs: "F", rhs: "ma", rel: "equal" },
          icon: "⚖️",
          term: { zh: "牛顿第二定律", en: "Newton's Second Law" },
          level: 1,
          oneLiner: {
            zh: "物体的加速度与合外力成正比、与质量成反比：F=ma。",
            en: "Acceleration is proportional to net force and inversely to mass: F=ma.",
          },
          detail: {
            zh: "F、a 均为矢量，方向一致；该定律是经典力学的核心方程。其中 F 为合外力（单位 N），m 为质量（kg），a 为加速度（m/s²）。",
            en: "F and a are vectors in the same direction; it is the central equation of classical mechanics. F is net force (N), m mass (kg), a acceleration (m/s²).",
          },
          tags: [{ zh: "牛顿定律", en: "Newton's Laws" }],
        },
        {
          id: "newton-3",
          icon: "🤝",
          term: { zh: "牛顿第三定律", en: "Newton's Third Law" },
          level: 1,
          oneLiner: {
            zh: "作用力与反作用力大小相等、方向相反、作用在不同物体上。",
            en: "Action and reaction are equal, opposite, and act on different bodies.",
          },
          detail: {
            zh: "两个力同时产生、同时消失，不能相互抵消（因作用对象不同）。",
            en: "The pair appears and vanishes together and never cancels (different bodies).",
          },
          tags: [{ zh: "牛顿定律", en: "Newton's Laws" }],
        },
        {
          id: "friction",
          eq: { lhs: "f", rhs: "μN", rel: "equal" },
          icon: "🪝",
          term: { zh: "摩擦力", en: "Friction" },
          level: 1,
          oneLiner: {
            zh: "阻碍相对运动或相对运动趋势的力，分静摩擦与滑动摩擦。",
            en: "A force opposing relative motion or its tendency; static or kinetic.",
          },
          detail: {
            zh: "滑动摩擦力 f=μN（μ 为动摩擦因数，N 为正压力）；静摩擦力随外力在 0 到最大静摩擦间变化。其中 f 为滑动摩擦力，μ 为动摩擦因数，N 为接触面正压力。",
            en: "Kinetic friction f=μN; static friction varies from 0 up to its maximum with applied force. f kinetic friction, μ coefficient, N normal force.",
          },
          tags: [{ zh: "力", en: "Force" }],
        },
        {
          id: "equilibrium",
          icon: "⚓",
          term: { zh: "共点力平衡", en: "Equilibrium of Forces" },
          level: 1,
          oneLiner: {
            zh: "物体受多个共点力而静止或匀速时，合外力为零。",
            en: "When balanced by concurrent forces, the net force is zero.",
          },
          detail: {
            zh: "可用正交分解法：任意方向合力均为零。",
            en: "Resolve into components: net force is zero in every direction.",
          },
          tags: [{ zh: "力", en: "Force" }],
        },
        {
          id: "projectile",
          icon: "🎯",
          term: { zh: "曲线运动与平抛", en: "Curved & Projectile Motion" },
          level: 2,
          oneLiner: {
            zh: "速度方向与合力不在一直线时做曲线运动；平抛是水平匀速加竖直自由落体。",
            en: "Curved motion occurs when velocity and net force are not collinear; a projectile combines horizontal uniform and vertical free-fall motion.",
          },
          detail: {
            zh: "平抛可分解为水平匀速与竖直匀加速两个独立分运动。",
            en: "A projectile splits into independent horizontal uniform and vertical accelerated motions.",
          },
          tags: [{ zh: "运动学", en: "Kinematics" }],
        },
        {
          id: "centripetal",
          eq: { lhs: "F", rhs: "mv²/r = mω²r", rel: "equal" },
          icon: "🌀",
          term: {
            zh: "圆周运动与向心力",
            en: "Circular Motion & Centripetal Force",
          },
          level: 2,
          oneLiner: {
            zh: "匀速圆周运动由指向圆心的向心力提供：F=mv²/r=mω²r。",
            en: "Uniform circular motion needs a centripetal force toward the center: F=mv²/r=mω²r.",
          },
          detail: {
            zh: "向心力不改速度大小，只改变方向；汽车转弯、卫星绕地均由此力维持。其中 m 为质量，v 为线速度，ω 为角速度，r 为圆周半径。",
            en: "Centripetal force changes only direction, not speed; it keeps cars turning and satellites orbiting. m mass, v linear speed, ω angular speed, r radius.",
          },
          tags: [{ zh: "力学", en: "Mechanics" }],
        },
        {
          id: "gravitation",
          eq: { lhs: "F", rhs: "G·m₁m₂/r²", rel: "equal" },
          icon: "🌎",
          term: { zh: "万有引力定律", en: "Universal Gravitation" },
          level: 2,
          oneLiner: {
            zh: "任意两质点相互吸引：F=G·m₁m₂/r²。",
            en: "Any two masses attract: F=G·m₁m₂/r².",
          },
          detail: {
            zh: "G 为引力常数；该定律统一了地面落体与天体运行。其中 m₁、m₂ 为两物体质量，r 为两质点间距。",
            en: "G is the gravitational constant; it unifies falling bodies and planetary orbits. m₁/m₂ are the masses, r the distance between them.",
          },
          tags: [{ zh: "引力", en: "Gravity" }],
        },
        {
          id: "kepler",
          icon: "🪐",
          term: { zh: "天体运动与开普勒定律", en: "Kepler's Laws" },
          level: 2,
          oneLiner: {
            zh: "行星沿椭圆轨道绕日，面积速度恒定，周期平方正比于半长轴立方。",
            en: "Planets follow ellipses; equal areas in equal times; T²∝a³.",
          },
          detail: {
            zh: "开普勒三定律由观测归纳，后被牛顿引力定律从理论上导出。其中 T 为公转周期，a 为椭圆轨道半长轴（T²∝a³）。",
            en: "Kepler's three laws, derived from observation, were later explained by Newton's gravitation. T is the orbital period, a the semi-major axis (T²∝a³).",
          },
          tags: [{ zh: "天体", en: "Astronomy" }],
        },
        {
          id: "cosmic-velocity",
          eq: { lhs: "v₁", rhs: "√(GM/R) ≈ 7.9 km/s", rel: "equal" },
          icon: "🚀",
          term: { zh: "三个宇宙速度", en: "Cosmic Velocities" },
          level: 2,
          oneLiner: {
            zh: "环绕、脱离、逃逸三档最小速度：约 7.9、11.2、16.7 km/s。",
            en: "The three minimum speeds—orbital, escape, and beyond—about 7.9, 11.2, 16.7 km/s.",
          },
          detail: {
            zh: "第一宇宙速度 7.9 km/s 是近地圆轨道的环绕速度，也是最小发射速度；第二 11.2 km/s 可挣脱地球引力成为绕太阳的人造行星；第三 16.7 km/s 可离开太阳系。三档数值都随中心天体的质量与半径而变，月球、火星探测器须按所在天体重新计算。",
            en: "The first (7.9 km/s) is the low circular-orbit speed and also the minimum launch speed; the second (11.2 km/s) breaks free of Earth to orbit the Sun; the third (16.7 km/s) leaves the Solar System. All scale with the host body's mass and radius, so lunar and Martian probes recompute them per world.",
          },
          tags: [{ zh: "引力", en: "Gravity" }, { zh: "航天", en: "Spaceflight" }],
        },
        {
          id: "orbit-maneuver",
          icon: "🛰️",
          term: { zh: "卫星变轨与轨道转移", en: "Orbit Maneuvers & Transfers" },
          level: 3,
          oneLiner: {
            zh: "加速抬轨、减速降轨——一次喷发重设圆轨半径与周期。",
            en: "Speed up to climb, slow down to descend—a burn resets orbit radius and period.",
          },
          detail: {
            zh: "卫星在原圆轨道加速，所需向心力大于当前引力供给，遂做离心运动抬升到更高轨道；稳定到新圆轨后线速度反而变小（v 随 r 增大而减小），“高处反而更慢”是常考易错点。霍曼转移用两次短脉冲最省燃料地进出高轨，交会对接则需在低轨加速追赶、再做相位微调。",
            en: "A prograde burn makes the satellite need more centripetal force than gravity supplies, so it swings out to a higher orbit; once circularized its speed is actually lower (v falls as r grows)—“higher yet slower” is a classic trap. A Hohmann transfer raises or lowers an orbit with two impulsive burns at minimum fuel, while rendezvous means accelerating in a lower chase orbit then trimming phase.",
          },
          tags: [{ zh: "引力", en: "Gravity" }, { zh: "航天", en: "Spaceflight" }],
        },
        {
          id: "binary-star",
          icon: "🌀",
          term: { zh: "双星与多星系统", en: "Binary & Multiple Stars" },
          level: 3,
          oneLiner: {
            zh: "两颗星绕共同质心转动，周期相同、轨道半径与质量成反比。",
            en: "Two stars orbit their common centre of mass—same period, radii inversely proportional to mass.",
          },
          detail: {
            zh: "双星间的万有引力提供各自绕质心的向心力，故两者角速度与周期相同，满足 m₁r₁ = m₂r₂——质量大的离质心更近、转的圆更小。天狼星 B、食双星由此称出质量；X 射线双星与引力波双黑洞并合同属这一框架，使双星成为称量天体的主法。",
            en: "Their mutual gravity supplies each star's centripetal force, so both share one angular speed and period with m₁r₁ = m₂r₂—heavier stars sit closer to the barycentre on smaller circles. Sirius B and eclipsing binaries are weighed this way, as are X-ray binaries and merging black-hole waves, making binaries the primary method for measuring stellar masses.",
          },
          tags: [{ zh: "引力", en: "Gravity" }, { zh: "天体", en: "Astronomy" }],
        },
        {
          id: "work-power",
          eq: [
            { lhs: "W", rhs: "Fs·cosθ", rel: "equal" },
            { lhs: "P", rhs: "W/t", rel: "equal" },
          ],
          icon: "💪",
          term: { zh: "功与功率", en: "Work & Power" },
          level: 1,
          oneLiner: {
            zh: "功 W=Fs·cosθ（力在位移方向的分量乘位移）；功率 P=W/t。",
            en: "Work W=Fs·cosθ; power P=W/t.",
          },
          detail: {
            zh: "力与位移垂直时不做功；功率表示做功快慢。其中 W 为功，F 为作用力，s 为位移，θ 为力与位移夹角，P 为功率，t 为时间。",
            en: "No work is done when force is perpendicular to displacement; power is the rate of doing work. W work, F force, s displacement, θ angle, P power, t time.",
          },
          tags: [{ zh: "能量", en: "Energy" }],
        },
        {
          id: "kinetic-energy",
          eq: [
            { lhs: "Eₖ", rhs: "½mv²", rel: "equal" },
            { lhs: "W", rhs: "ΔEₖ", rel: "equal" },
          ],
          icon: "🚀",
          term: { zh: "动能与动能定理", en: "Kinetic Energy & Theorem" },
          level: 2,
          oneLiner: {
            zh: "动能 Eₖ=½mv²；合外力做功等于动能变化：W=ΔEₖ。",
            en: "Kinetic energy Eₖ=½mv²; net work equals its change: W=ΔEₖ.",
          },
          detail: {
            zh: "其中 Eₖ 为动能，m 为质量，v 为速率，W 为合外力做的功。",
            en: "Eₖ kinetic energy, m mass, v speed, W net work done.",
          },
          tags: [{ zh: "能量", en: "Energy" }],
        },
        {
          id: "potential-energy",
          eq: { lhs: "Eₚ", rhs: "mgh", rel: "equal" },
          icon: "⛰️",
          term: { zh: "重力势能", en: "Gravitational Potential Energy" },
          level: 1,
          oneLiner: {
            zh: "物体因高度而具有的能量：Eₚ=mgh。",
            en: "Energy due to height: Eₚ=mgh.",
          },
          detail: {
            zh: "势能是系统共有的，与零势能面的选取有关。其中 Eₚ 为重力势能，m 为质量，g 为重力加速度，h 为相对高度。",
            en: "Potential energy belongs to a system and depends on the chosen reference level. Eₚ gravitational potential, m mass, g gravity, h height.",
          },
          tags: [{ zh: "能量", en: "Energy" }],
        },
        {
          id: "mech-conservation",
          icon: "🔋",
          term: { zh: "机械能守恒", en: "Conservation of Mechanical Energy" },
          level: 2,
          oneLiner: {
            zh: "只有重力或弹力做功时，动能与势能之和保持不变。",
            en: "With only gravity/elastic forces doing work, kinetic plus potential energy is constant.",
          },
          detail: {
            zh: "可用来快速求解抛体、单摆、过山车类问题。",
            en: "Useful for projectiles, pendulums and roller-coaster problems.",
          },
          tags: [{ zh: "能量", en: "Energy" }],
        },
        {
          id: "momentum",
          eq: { lhs: "p", rhs: "mv", rel: "equal" },
          icon: "🏹",
          term: { zh: "动量守恒", en: "Conservation of Momentum" },
          level: 2,
          oneLiner: {
            zh: "系统不受外力时，总动量 p=mv 保持不变。",
            en: "Without external force, total momentum p=mv is conserved.",
          },
          detail: {
            zh: "与牛顿第三定律等价，是分析碰撞、火箭推进的基本工具。其中 p 为动量，m 为质量，v 为速度。",
            en: "Equivalent to Newton's third law; key for collisions and rocket propulsion. p momentum, m mass, v velocity.",
          },
          tags: [{ zh: "力学", en: "Mechanics" }],
        },
      ],
    },
    /* ===================== 声学 ===================== */
    {
      key: "sound",
      icon: "🔊",
      title: { zh: "声学", en: "Sound" },
      items: [
        {
          id: "sound-propagation",
          icon: "〰️",
          term: {
            zh: "声音的产生与传播",
            en: "Sound Production & Propagation",
          },
          level: 1,
          oneLiner: {
            zh: "声音由物体振动产生，以声波形式通过介质传播，真空不传声。",
            en: "Sound comes from vibration and travels as waves through a medium; it cannot cross a vacuum.",
          },
          detail: {
            zh: "声波是机械波，需固体、液体或气体等介质。",
            en: "Sound is a mechanical wave requiring a material medium.",
          },
          tags: [{ zh: "声学", en: "Acoustics" }],
        },
        {
          id: "sound-speed",
          icon: "💨",
          term: { zh: "声速", en: "Speed of Sound" },
          level: 1,
          oneLiner: {
            zh: "常温下空气中约 340 m/s，一般固体>液体>气体。",
            en: "About 340 m/s in air at room temperature; usually solid>liquid>gas.",
          },
          tags: [{ zh: "声学", en: "Acoustics" }],
        },
        {
          id: "pitch-loudness",
          icon: "🎵",
          term: { zh: "音调·响度·音色", en: "Pitch · Loudness · Timbre" },
          level: 1,
          oneLiner: {
            zh: "频率决定音调高低，振幅决定响度大小，波形决定音色。",
            en: "Frequency sets pitch, amplitude sets loudness, waveform sets timbre.",
          },
          detail: {
            zh: "女声频率高、音调高；大鼓振幅大、响度大。",
            en: "Higher frequency gives higher pitch; larger amplitude gives greater loudness.",
          },
          tags: [{ zh: "声学", en: "Acoustics" }],
        },
        {
          id: "decibel",
          icon: "📟",
          term: { zh: "分贝", en: "Decibel" },
          level: 1,
          oneLiner: {
            zh: "表示响度级的相对单位，与声强对数相关。",
            en: "A relative unit for loudness level, logarithmic in sound intensity.",
          },
          detail: {
            zh: "0 dB 约为人耳听阈；长期高于 85 dB 可能损伤听力。",
            en: "0 dB is near the hearing threshold; prolonged >85 dB can damage hearing.",
          },
          tags: [{ zh: "声学", en: "Acoustics" }],
        },
        {
          id: "doppler",
          icon: "🚨",
          term: { zh: "多普勒效应", en: "Doppler Effect" },
          level: 2,
          oneLiner: {
            zh: "波源与观察者相对运动时，接收频率发生变化。",
            en: "Relative motion between source and observer shifts the received frequency.",
          },
          detail: {
            zh: "靠近时频率升高（音调变尖），远离时降低；用于测速与天文红移。",
            en: "Approaching raises pitch, receding lowers it; used in speed radar and cosmological redshift.",
          },
          tags: [{ zh: "波", en: "Waves" }],
        },
        {
          id: "resonance",
          icon: "🎻",
          term: { zh: "共振与共鸣", en: "Resonance" },
          level: 2,
          oneLiner: {
            zh: "驱动频率接近系统固有频率时，振幅急剧增大的现象。",
            en: "Amplitude grows sharply when driving frequency nears natural frequency.",
          },
          detail: {
            zh: "共鸣箱、军队过桥齐步易引发共振，需避免。",
            en: "Resonance powers musical boxes but can destroy bridges if troops march in step.",
          },
          tags: [{ zh: "波", en: "Waves" }],
        },
        {
          id: "ultrasonic",
          icon: "🐬",
          term: { zh: "超声波与次声波", en: "Ultrasonic & Infrasonic" },
          level: 1,
          oneLiner: {
            zh: "频率高于 20 kHz 为超声波，低于 20 Hz 为次声波。",
            en: "Above 20 kHz is ultrasonic, below 20 Hz infrasonic.",
          },
          detail: {
            zh: "超声用于医学成像与探伤；次声可由地震、核爆产生。",
            en: "Ultrasound aids medical imaging; infrasound arises from quakes and explosions.",
          },
          tags: [{ zh: "声学", en: "Acoustics" }],
        },
        {
          id: "echo-ranging",
          icon: "📡",
          term: { zh: "回声与测距", en: "Echoes & Ranging" },
          level: 1,
          oneLiner: {
            zh: "声波遇到障碍反射回来就是回声，测出往返时间便能算出距离。",
            en: "Sound reflected from a barrier returns as an echo; timing the round trip gives the distance.",
          },
          detail: {
            zh: "人耳要把回声与原声区分开，两者须相隔约 0.1 s 以上，在空气中对应障碍距声源约 17 m；比这更近的反射声只与原声叠在一起使听感更丰满，音乐厅正是靠这类早期反射声增强音色，而空旷大厅里的长延迟反射才成为恼人的回声。测距公式 s=vt/2：声呐据此测海深、探鱼群，超声测厚与“B 超”成像同属一理。太空与月球表面不能用回声——真空不传声，只能改用电磁波测距。",
            en: "For the ear to separate an echo from the original sound, the gap must exceed about 0.1 s, which in air means a reflector some 17 m away; closer reflections merge with the direct sound and simply enrich it, which is exactly what concert halls exploit with early reflections, while long-delayed bounces in bare halls become intrusive echoes. The ranging formula is s=vt/2: sonar sounds the depth of the sea and locates shoals this way, and ultrasonic thickness gauging and B-scan imaging follow the same principle. Echoes fail in space and on the Moon, since a vacuum carries no sound—radar and laser ranging take over there.",
          },
          eq: { lhs: "s", rhs: "vt/2", rel: "equal" },
          tags: [{ zh: "声学", en: "Acoustics" }],
        },
        {
          id: "noise-control",
          icon: "🔇",
          term: { zh: "噪声的危害与控制", en: "Noise Harm & Control" },
          level: 1,
          oneLiner: {
            zh: "物理上指无规则的杂乱振动，环保上指干扰工作与休息的声音。",
            en: "Physically irregular vibration; environmentally any sound that disrupts work or rest.",
          },
          detail: {
            zh: "乐音与噪声的界限不在频率高低而在波形是否规则，长期处于 85 dB 以上会损伤听力，噪声作业场所的暴露限值通常就定在这一量级附近，睡眠则易被三四十贝的间断声响干扰。控制分三个环节：在声源处减弱（消声器、低噪机械、城区禁鸣），在传播过程中阻断（声屏障、吸声材料、双层玻璃、绿化带），在人耳处防护（耳塞、防声帽）。与分贝一条的分工是：那条讲如何量度，本条讲危害在哪、从何处下手治理。",
            en: "The boundary between music and noise lies not in pitch but in whether the waveform is regular; sustained levels above 85 dB damage hearing, which is roughly where occupational exposure limits sit, while intermittent sounds of only thirty to forty decibels can break sleep. Control acts at three points—at the source (silencers, quieter machines, horn bans), along the path (barriers, absorptive lining, double glazing, tree belts), and at the ear (plugs, muffs). Where the decibel entry explains the measuring scale, this one asks what the harm is and where to attack it.",
          },
          tags: [{ zh: "声学", en: "Acoustics" }],
        },
      ],
    },
    /* ===================== 光学 ===================== */
    {
      key: "optics",
      icon: "🌈",
      title: { zh: "光学", en: "Optics" },
      items: [
        {
          id: "rectilinear",
          icon: "☀️",
          term: { zh: "光的直线传播", en: "Rectilinear Propagation" },
          level: 1,
          oneLiner: {
            zh: "光在同种均匀介质中沿直线传播，形成影与小孔成像。",
            en: "Light travels in straight lines in uniform media, forming shadows and pinhole images.",
          },
          detail: {
            zh: "真空中光速 c≈3.00×10⁸ m/s，是宇宙速度上限。其中 c 为真空中的光速。",
            en: "In vacuum c≈3.00×10⁸ m/s, the cosmic speed limit. c is the speed of light in vacuum.",
          },
          tags: [{ zh: "几何光学", en: "Geometric Optics" }],
        },
        {
          id: "reflection",
          icon: "🪞",
          term: { zh: "光的反射", en: "Reflection" },
          level: 1,
          oneLiner: {
            zh: "反射角等于入射角；分镜面反射与漫反射。",
            en: "Angle of reflection equals angle of incidence; specular or diffuse.",
          },
          tags: [{ zh: "几何光学", en: "Geometric Optics" }],
        },
        {
          id: "plane-mirror",
          icon: "👥",
          term: { zh: "平面镜成像", en: "Plane Mirror Imaging" },
          level: 1,
          oneLiner: {
            zh: "成等大、正立、左右相反的虚像，物像关于镜面对称。",
            en: "Forms an equal, upright, laterally inverted virtual image, symmetric about the mirror.",
          },
          tags: [{ zh: "几何光学", en: "Geometric Optics" }],
        },
        {
          id: "refraction",
          eq: [
            { lhs: "n", rhs: "c/v", rel: "equal" },
            { lhs: "n₁sinθ₁", rhs: "n₂sinθ₂", rel: "equal" },
          ],
          icon: "💧",
          term: { zh: "光的折射", en: "Refraction" },
          level: 1,
          oneLiner: {
            zh: "光斜射入不同介质时传播方向偏折，池中视深变浅。",
            en: "Light bends crossing media obliquely; a pool looks shallower.",
          },
          detail: {
            zh: "折射率 n=c/v；斯涅尔定律 n₁sinθ₁=n₂sinθ₂。其中 n 为折射率，θ₁、θ₂ 为入射、折射光线与法线的夹角。",
            en: "Refractive index n=c/v; Snell's law n₁sinθ₁=n₂sinθ₂. n refractive index, θ₁/θ₂ angles with the normal.",
          },
          tags: [{ zh: "几何光学", en: "Geometric Optics" }],
        },
        {
          id: "total-internal",
          icon: "🔷",
          term: { zh: "全反射", en: "Total Internal Reflection" },
          level: 2,
          oneLiner: {
            zh: "光从光密到光疏且入射角大于临界角时，全部反射无折射。",
            en: "From dense to rare medium beyond the critical angle, all light reflects.",
          },
          detail: {
            zh: "是光导纤维与全反射棱镜的原理。",
            en: "Underlies optical fibers and reflecting prisms.",
          },
          tags: [{ zh: "几何光学", en: "Geometric Optics" }],
        },
        {
          id: "lens",
          icon: "🔍",
          term: { zh: "透镜与凸透镜成像", en: "Lenses & Convex Imaging" },
          level: 2,
          oneLiner: {
            zh: "凸透镜对光有会聚作用；成像规律由物距 u 决定。",
            en: "Convex lenses converge light; image follows object distance u.",
          },
          detail: {
            zh: "u>2f 成倒立缩小实像（照相机）；f<u<2f 成倒立放大实像（投影仪）；u<f 成正立放大虚像（放大镜）。",
            en: "u>2f gives a reduced real image (camera); f<u<2f an enlarged real image (projector); u<f an enlarged upright virtual image (magnifier).",
          },
          tags: [{ zh: "几何光学", en: "Geometric Optics" }],
        },
        {
          id: "dispersion",
          icon: "🌟",
          term: { zh: "光的色散", en: "Dispersion" },
          level: 1,
          oneLiner: {
            zh: "白光经棱镜分解为七色光，因各色光折射率不同。",
            en: "A prism splits white light into colors because refractive index varies with color.",
          },
          detail: {
            zh: "牛顿以此证明白光由多种色光组成；彩虹即水滴色散。",
            en: "Newton showed white light is composite; rainbows are droplet dispersion.",
          },
          tags: [{ zh: "几何光学", en: "Geometric Optics" }],
        },
        {
          id: "interference-diffraction",
          icon: "🌗",
          term: { zh: "干涉与衍射", en: "Interference & Diffraction" },
          level: 3,
          oneLiner: {
            zh: "两列相干光叠加成明暗条纹（干涉）；光绕过障碍偏离直线（衍射）。",
            en: "Coherent light adds to bright/dark fringes (interference); light bends around obstacles (diffraction).",
          },
          detail: {
            zh: "杨氏双缝演示干涉；泊松亮斑是衍射反例成名的证据。",
            en: "Young's double-slit shows interference; Poisson's spot is a famous diffraction proof.",
          },
          tags: [{ zh: "物理光学", en: "Physical Optics" }],
        },
        {
          id: "polarization",
          icon: "🕶️",
          term: { zh: "偏振", en: "Polarization" },
          level: 3,
          oneLiner: {
            zh: "横波特有的振动方向选择性，证明光是横波。",
            en: "Directional filtering of vibration, proving light is transverse.",
          },
          detail: {
            zh: "偏光太阳镜利用偏振削减水面反光。",
            en: "Polarized sunglasses cut glare off water.",
          },
          tags: [{ zh: "物理光学", en: "Physical Optics" }],
        },
        {
          id: "eye-vision",
          icon: "👁️",
          term: { zh: "眼睛与视力矫正", en: "The Eye & Vision Correction" },
          level: 2,
          oneLiner: {
            zh: "晶状体把像成在视网膜上，近视用凹透镜、远视用凸透镜矫正。",
            en: "The lens focuses images on the retina; myopia is fixed with a diverging lens, hyperopia with a converging one.",
          },
          detail: {
            zh: "看近物时睫状肌调节晶状体焦距。近视是像成在视网膜之前，配凹透镜使光线先发散；远视与老花像成在视网膜之后，配凸透镜使光线先会聚。",
            en: "Ciliary muscles refocus the lens for near objects. Myopia images before the retina and needs a diverging lens; hyperopia and presbyopia image behind it and need a converging lens.",
          },
          tags: [{ zh: "几何光学", en: "Geometric Optics" }],
        },
        {
          id: "optical-instruments",
          icon: "🔭",
          term: { zh: "显微镜与望远镜", en: "Microscope & Telescope" },
          level: 3,
          oneLiner: {
            zh: "两组透镜接力放大：显微镜看清近处微小物体，望远镜拉近远处巨大目标。",
            en: "Two lens stages relay magnification: microscopes resolve tiny nearby objects, telescopes bring distant ones close.",
          },
          detail: {
            zh: "显微镜以短焦物镜成放大实像、目镜再放大成虚像；开普勒望远镜用长焦物镜会聚远方来光、目镜放大其所成的像。",
            en: "A microscope's short-focus objective makes a magnified real image the eyepiece enlarges once more; Kepler's telescope uses a long-focus objective to gather distant light and an eyepiece to enlarge its image.",
          },
          tags: [{ zh: "几何光学", en: "Geometric Optics" }],
        },
        {
          id: "object-color",
          icon: "🎨",
          term: { zh: "物体的颜色", en: "Color of Objects" },
          level: 1,
          oneLiner: {
            zh: "透明物体的颜色由透过它的色光决定，不透明物体由它反射的色光决定。",
            en: "A transparent object's color is set by the light it transmits; an opaque one's by the light it reflects.",
          },
          detail: {
            zh: "红玻璃只透过红光、吸收其余色光；红纸只反射红光、吸收其余。白光下物体显其本色，改变照明的色光便改变所见颜色。",
            en: "Red glass passes only red and absorbs the rest; red paper reflects only red. Under white light objects show their color; change the illuminating light and the seen color changes.",
          },
          tags: [{ zh: "物理光学", en: "Physical Optics" }],
        },
        {
          id: "light-primary",
          icon: "🌈",
          term: { zh: "色光的三原色", en: "Additive Primaries of Light" },
          level: 1,
          oneLiner: {
            zh: "红、绿、蓝三色光按不同比例混合可得各种色光，等量混合即为白光。",
            en: "Red, green and blue light mix in varying ratios to yield all colors; equal parts give white.",
          },
          detail: {
            zh: "这是加色混合，不同于颜料的减色三原色品红、黄、青；电视与手机屏幕正以红、绿、蓝像素合成图像。",
            en: "This is additive mixing, unlike the subtractive primaries magenta, yellow and cyan of pigments; TV and phone screens compose images from red, green and blue pixels.",
          },
          tags: [{ zh: "物理光学", en: "Physical Optics" }],
        },
      ],
    },
    /* ===================== 热学 ===================== */
    {
      key: "thermal",
      icon: "🌡️",
      title: { zh: "热学", en: "Thermal Physics" },
      items: [
        {
          id: "temperature",
          eq: { lhs: "K", rhs: "℃ + 273.15", rel: "equal" },
          icon: "🌡️",
          term: { zh: "温度与温标", en: "Temperature & Scales" },
          level: 1,
          oneLiner: {
            zh: "温度表示冷热程度；摄氏℃与热力学温标 K 满足 K=℃+273.15。",
            en: "Temperature measures hot/cold; K=℃+273.15.",
          },
          detail: {
            zh: "热力学温度（开尔文）是国际单位制基本单位，零度为绝对零度。其中 K 为热力学温度（开尔文），℃ 为摄氏温度。",
            en: "Kelvin is an SI base unit; absolute zero is its zero. K is thermodynamic temperature, ℃ Celsius.",
          },
          tags: [{ zh: "热学", en: "Thermodynamics" }],
        },
        {
          id: "kinetic-theory",
          icon: "⚛️",
          term: { zh: "分子动理论", en: "Kinetic Theory" },
          level: 1,
          oneLiner: {
            zh: "物质由大量分子组成，分子永不停息做无规则运动，分子间有作用力。",
            en: "Matter is made of molecules in perpetual random motion with intermolecular forces.",
          },
          detail: {
            zh: "扩散、布朗运动都是分子热运动的证据。",
            en: "Diffusion and Brownian motion evidence molecular motion.",
          },
          tags: [{ zh: "热学", en: "Thermodynamics" }],
        },
        {
          id: "internal-energy",
          icon: "🔥",
          term: { zh: "内能", en: "Internal Energy" },
          level: 1,
          oneLiner: {
            zh: "物体内所有分子动能与势能的总和。",
            en: "Total molecular kinetic and potential energy of a body.",
          },
          detail: {
            zh: "内能与温度、体积、物态有关；理想气体内能只取决于温度。",
            en: "Depends on T, V and phase; for ideal gas it is a function of T only.",
          },
          tags: [{ zh: "热学", en: "Thermodynamics" }],
        },
        {
          id: "first-law",
          eq: { lhs: "ΔU", rhs: "Q + W", rel: "equal" },
          icon: "♨️",
          term: { zh: "热力学第一定律", en: "First Law of Thermodynamics" },
          level: 2,
          oneLiner: {
            zh: "能量守恒在热学中的表述：ΔU=Q+W（吸热与做功均改变内能）。",
            en: "Energy conservation: ΔU=Q+W (heat and work change internal energy).",
          },
          detail: {
            zh: "是能量守恒定律在热力学系统的具体形式。其中 ΔU 为内能变化，Q 为系统吸收的热量，W 为外界对系统做的功。",
            en: "The conservation of energy applied to thermodynamic systems. ΔU internal-energy change, Q heat absorbed, W work done on the system.",
          },
          tags: [{ zh: "热力学", en: "Thermodynamics" }],
        },
        {
          id: "specific-heat",
          eq: { lhs: "Q", rhs: "cmΔt", rel: "equal" },
          icon: "🧊",
          term: { zh: "比热容", en: "Specific Heat" },
          level: 1,
          oneLiner: {
            zh: "单位质量升高 1℃ 吸收的热量：Q=cmΔt。",
            en: "Heat to raise 1 kg by 1℃: Q=cmΔt.",
          },
          detail: {
            zh: "水的比热容大，故沿海温差小、可作冷却剂。其中 Q 为吸收或放出的热量，c 为比热容，m 为质量，Δt 为温度变化。",
            en: "Water's high specific heat moderates coast climate and cools engines. Q heat exchanged, c specific heat, m mass, Δt temperature change.",
          },
          tags: [{ zh: "热学", en: "Thermodynamics" }],
        },
        {
          id: "heat-transfer",
          icon: "🌬️",
          term: { zh: "热传递", en: "Heat Transfer" },
          level: 1,
          oneLiner: {
            zh: "热由高温传向低温，方式有传导、对流、辐射。",
            en: "Heat moves from hot to cold by conduction, convection, radiation.",
          },
          tags: [{ zh: "热学", en: "Thermodynamics" }],
        },
        {
          id: "phase-change",
          icon: "❄️",
          term: { zh: "物态变化", en: "Phase Changes" },
          level: 1,
          oneLiner: {
            zh: "熔化/凝固、汽化/液化、升华/凝华，相变时温度常保持不变。",
            en: "Melting/freezing, vaporization/condensation, sublimation/deposition; temperature stays put during phase change.",
          },
          detail: {
            zh: "晶体有固定熔点，非晶体（如玻璃）没有。",
            en: "Crystals have a fixed melting point; amorphous solids do not.",
          },
          tags: [{ zh: "热学", en: "Thermodynamics" }],
        },
        {
          id: "heat-engine",
          eq: { lhs: "η", rhs: "1 − T冷/T热", rel: "equal" },
          icon: "🚂",
          term: { zh: "热机与效率", en: "Heat Engine & Efficiency" },
          level: 2,
          oneLiner: {
            zh: "将内能转化为机械功的装置；效率受卡诺极限约束。",
            en: "A device turning internal energy into work; efficiency is bounded by Carnot's limit.",
          },
          detail: {
            zh: "卡诺热机效率 η=1−T冷/T热，只与两热源温度有关。其中 η 为热机效率，T_热 与 T_冷 为高温、低温热源的热力学温度（K）。",
            en: "Carnot efficiency η=1−T_cold/T_hot depends only on the two reservoir temperatures. η efficiency, T_hot/T_cold the reservoir temperatures (K).",
          },
          tags: [{ zh: "热力学", en: "Thermodynamics" }],
        },
        {
          id: "gas-laws",
          eq: { lhs: "pV", rhs: "nRT", rel: "equal" },
          icon: "🎈",
          term: { zh: "气体实验定律", en: "Gas Laws" },
          level: 2,
          oneLiner: {
            zh: "玻意耳 pV=C、查理 V∝T、盖-吕萨克 p∝T，统一为 pV=nRT。",
            en: "Boyle pV=C, Charles V∝T, Gay-Lussac p∝T, unified as pV=nRT.",
          },
          detail: {
            zh: "理想气体状态方程描述了压强、体积、温度与物质的量的关系。其中 p 为压强，V 为体积，n 为物质的量，R 为气体常数，T 为热力学温度。",
            en: "The ideal-gas equation links pressure, volume, temperature and amount. p pressure, V volume, n amount, R gas constant, T thermodynamic temperature.",
          },
          tags: [{ zh: "热力学", en: "Thermodynamics" }],
        },
        {
          id: "second-law",
          icon: "🔀",
          term: { zh: "热力学第二定律", en: "Second Law of Thermodynamics" },
          level: 3,
          oneLiner: {
            zh: "热量不能自发从低温物体传向高温物体；孤立系统熵不减。",
            en: "Heat does not flow spontaneously from cold to hot; entropy of an isolated system never decreases.",
          },
          detail: {
            zh: "它指出了宏观过程的方向性，也被视为时间箭头的来源。",
            en: "It sets the direction of macro processes and the arrow of time.",
          },
          tags: [{ zh: "热力学", en: "Thermodynamics" }],
        },
      ],
    },
    /* ===================== 电磁学 ===================== */
    {
      key: "em",
      icon: "⚡",
      title: { zh: "电磁学", en: "Electricity & Magnetism" },
      items: [
        {
          id: "coulomb",
          eq: { lhs: "F", rhs: "k·q₁q₂/r²", rel: "equal" },
          icon: "➕",
          term: { zh: "电荷与库仑定律", en: "Charge & Coulomb's Law" },
          level: 1,
          oneLiner: {
            zh: "同种电荷相斥、异种相吸；F=k·q₁q₂/r²。",
            en: "Like charges repel, unlike attract; F=k·q₁q₂/r².",
          },
          detail: {
            zh: "电荷守恒：电荷既不能创生也不能消灭，只能转移。其中 k 为静电力常量，q₁、q₂ 为两点电荷电量，r 为间距。",
            en: "Charge is conserved: it can only be transferred, never created or destroyed. k electrostatic constant, q₁/q₂ charges, r distance.",
          },
          tags: [{ zh: "电学", en: "Electricity" }],
        },
        {
          id: "electric-field",
          eq: { lhs: "E", rhs: "F/q", rel: "equal" },
          icon: "🕸️",
          term: { zh: "电场与电场强度", en: "Electric Field" },
          level: 2,
          oneLiner: {
            zh: "电荷周围存在电场；E=F/q，方向为正电荷受力方向。",
            en: "A charge creates an electric field; E=F/q, directed as a positive test charge is pushed.",
          },
          detail: {
            zh: "电场线从正电荷出发、终止于负电荷，疏密表强弱。其中 E 为电场强度，F 为试探电荷受力，q 为试探电荷电量。",
            en: "Field lines start at + and end at −; density shows strength. E field strength, F force on test charge, q test charge.",
          },
          tags: [{ zh: "电学", en: "Electricity" }],
        },
        {
          id: "potential",
          eq: { lhs: "U", rhs: "W/q", rel: "equal" },
          icon: "🔋",
          term: { zh: "电势与电势能", en: "Electric Potential" },
          level: 2,
          oneLiner: {
            zh: "电势差即电压 U=W/q；沿电场线电势降低。",
            en: "Potential difference is voltage U=W/q; potential drops along field lines.",
          },
          detail: {
            zh: "等势面与电场线垂直；带电粒子在等势面上移动电场力不做功。其中 U 为电势差（电压），W 为电场力做的功，q 为电荷电量。",
            en: "Equipotentials are perpendicular to field lines; moving on one costs no work. U potential difference (voltage), W work by field, q charge.",
          },
          tags: [{ zh: "电学", en: "Electricity" }],
        },
        {
          id: "capacitance",
          eq: { lhs: "C", rhs: "Q/U", rel: "equal" },
          icon: "🧰",
          term: { zh: "电容", en: "Capacitance" },
          level: 2,
          oneLiner: {
            zh: "电容器储存电荷的本领：C=Q/U。",
            en: "A capacitor's ability to store charge: C=Q/U.",
          },
          detail: {
            zh: "平行板电容 C=εS/d，与极板面积和介电常数成正比、与间距成反比。其中 C 为电容，Q 为极板带电量，U 为电压，ε 为介电常数，S 为极板面积，d 为间距。",
            en: "Parallel-plate C=εS/d, proportional to area and permittivity, inverse to spacing. C capacitance, Q charge, U voltage, ε permittivity, S area, d spacing.",
          },
          tags: [{ zh: "电学", en: "Electricity" }],
        },
        {
          id: "ohm",
          eq: [
            { lhs: "I", rhs: "Q/t", rel: "equal" },
            { lhs: "R", rhs: "U/I", rel: "equal" },
            { lhs: "U", rhs: "IR", rel: "equal" },
          ],
          icon: "🔌",
          term: { zh: "电流·电阻·欧姆定律", en: "Current · Resistance · Ohm" },
          level: 1,
          oneLiner: {
            zh: "电流 I=Q/t；电阻 R=U/I；欧姆定律 U=IR。",
            en: "Current I=Q/t; resistance R=U/I; Ohm's law U=IR.",
          },
          detail: {
            zh: "电阻与材料、长度、横截面积和温度有关：R=ρL/S。其中 I 为电流，Q 为电荷量，t 为时间，R 为电阻，U 为电压，ρ 为电阻率，L 为长度，S 为横截面积。",
            en: "Resistance depends on material, length, area and temperature: R=ρL/S. I current, Q charge, t time, R resistance, U voltage, ρ resistivity, L length, S area.",
          },
          tags: [{ zh: "电路", en: "Circuits" }],
        },
        {
          id: "series-parallel",
          icon: "🔗",
          term: { zh: "串并联电路", en: "Series & Parallel" },
          level: 1,
          oneLiner: {
            zh: "串联电流相等、电压分压；并联电压相等、电流分流。",
            en: "Series: same current, shared voltage; parallel: same voltage, shared current.",
          },
          detail: {
            zh: "总电阻串联相加、并联倒数相加。",
            en: "Total R adds in series, adds in reciprocal in parallel.",
          },
          tags: [{ zh: "电路", en: "Circuits" }],
        },
        {
          id: "electric-power",
          eq: [
            { lhs: "W", rhs: "UIt", rel: "equal" },
            { lhs: "P", rhs: "UI", rel: "equal" },
          ],
          icon: "💡",
          term: { zh: "电功与电功率", en: "Electric Work & Power" },
          level: 1,
          oneLiner: {
            zh: "电功 W=UIt；电功率 P=UI。",
            en: "Work W=UIt; power P=UI.",
          },
          detail: {
            zh: "纯电阻电路中 P=I²R=U²/R。其中 W 为电功，P 为电功率，U 为电压，I 为电流，t 为时间，R 为电阻。",
            en: "For pure resistors P=I²R=U²/R. W electrical work, P power, U voltage, I current, t time, R resistance.",
          },
          tags: [{ zh: "电路", en: "Circuits" }],
        },
        {
          id: "joule",
          eq: { lhs: "Q", rhs: "I²Rt", rel: "equal" },
          icon: "🥵",
          term: { zh: "焦耳定律", en: "Joule's Law" },
          level: 1,
          oneLiner: {
            zh: "电流热效应：Q=I²Rt。",
            en: "Current's heating effect: Q=I²Rt.",
          },
          detail: {
            zh: "电炉、保险丝都利用电流的热效应。其中 Q 为产生的热量，I 为电流，R 为电阻，t 为通电时间。",
            en: "Heaters and fuses exploit the heating effect of current. Q heat produced, I current, R resistance, t time.",
          },
          tags: [{ zh: "电路", en: "Circuits" }],
        },
        {
          id: "magnetic-field",
          icon: "🧲",
          term: { zh: "磁场与磁感线", en: "Magnetic Field" },
          level: 1,
          oneLiner: {
            zh: "磁体、电流周围存在磁场；可用安培定则判断方向。",
            en: "Magnets and currents create magnetic fields; use the right-hand rule for direction.",
          },
          detail: {
            zh: "奥斯特实验首次证明电流能产生磁场。",
            en: "Oersted first showed a current produces a magnetic field.",
          },
          tags: [{ zh: "磁学", en: "Magnetism" }],
        },
        {
          id: "ampere-force",
          eq: { lhs: "F", rhs: "BIL·sinθ", rel: "equal" },
          icon: "📐",
          term: { zh: "安培力", en: "Ampere Force" },
          level: 2,
          oneLiner: {
            zh: "通电导线在磁场中受力：F=BIL·sinθ。",
            en: "A current-carrying wire feels F=BIL·sinθ in a field.",
          },
          detail: {
            zh: "电动机即利用安培力使线圈转动。其中 F 为安培力，B 为磁感应强度，I 为电流，L 为导线长度，θ 为电流与磁场方向夹角。",
            en: "Electric motors use Ampere force to spin coils. F Ampere force, B field, I current, L length, θ angle between I and B.",
          },
          tags: [{ zh: "磁学", en: "Magnetism" }],
        },
        {
          id: "lorentz",
          eq: { lhs: "f", rhs: "qvB·sinθ", rel: "equal" },
          icon: "🎯",
          term: { zh: "洛伦兹力", en: "Lorentz Force" },
          level: 2,
          oneLiner: {
            zh: "运动电荷在磁场中受力：f=qvB·sinθ，方向用左手定则。",
            en: "A moving charge feels f=qvB·sinθ, direction by the left-hand rule.",
          },
          detail: {
            zh: "洛伦兹力不改变速率，只改变速度方向，使其做圆周或螺旋运动。其中 f 为洛伦兹力，q 为电荷量，v 为速度，B 为磁感应强度，θ 为速度与磁场方向夹角。",
            en: "Lorentz force changes direction, not speed, giving circular or helical paths. f Lorentz force, q charge, v velocity, B field, θ angle.",
          },
          tags: [{ zh: "磁学", en: "Magnetism" }],
        },
        {
          id: "induction",
          icon: "🌀",
          term: { zh: "电磁感应", en: "Electromagnetic Induction" },
          level: 2,
          oneLiner: {
            zh: "磁通量变化产生感应电动势：法拉第定律与楞次定律。",
            en: "Changing flux induces EMF: Faraday's and Lenz's laws.",
          },
          detail: {
            zh: "发电机、变压器都基于电磁感应；楞次定律指出感应电流总是阻碍变化。",
            en: "Generators and transformers rely on it; Lenz's law says induced current opposes the change.",
          },
          tags: [{ zh: "电磁", en: "Electromagnetism" }],
        },
        {
          id: "em-waves",
          icon: "📡",
          term: { zh: "交变电流与电磁波", en: "AC & Electromagnetic Waves" },
          level: 3,
          oneLiner: {
            zh: "变化的电场与磁场相互激发，形成传播的电磁波。",
            en: "Changing E and B fields sustain each other as traveling EM waves.",
          },
          detail: {
            zh: "麦克斯韦统一电磁并预言电磁波；赫兹实验证实。频谱含无线电、可见光、X 射线等。",
            en: "Maxwell unified EM and predicted waves; Hertz confirmed them; the spectrum spans radio to X-rays.",
          },
          tags: [{ zh: "电磁", en: "Electromagnetism" }],
        },
        {
          id: "ac-current",
          icon: "🔁",
          term: { zh: "交变电流", en: "Alternating Current (AC)" },
          level: 2,
          oneLiner: {
            zh: "电流大小与方向随时间周期性变化，家用电即正弦式交流电。",
            en: "Current whose magnitude and direction cycle over time; mains supply is sinusoidal AC.",
          },
          detail: {
            zh: "用峰值、有效值与频率描述：正弦交流电有效值等于峰值除以根号2；我国市电为 220 伏、50 赫兹，即每秒方向改变一百次。交流便于变压与远距离输送。",
            en: "Described by peak, RMS and frequency: for a sine wave RMS equals peak over root-two; China's mains are 220 V, 50 Hz, reversing direction 100 times a second. AC suits transformation and long-distance transmission.",
          },
          eq: { lhs: "I", rhs: "Im/√2", rel: "equal" },
          tags: [{ zh: "电磁", en: "Electromagnetism" }],
        },
        {
          id: "transformer",
          icon: "🔌",
          term: { zh: "变压器", en: "Transformer" },
          level: 2,
          oneLiner: {
            zh: "利用互感把交流电压升高或降低，理想变压器输入功率等于输出功率。",
            en: "Uses mutual induction to raise or lower AC voltage; an ideal transformer conserves power.",
          },
          detail: {
            zh: "原、副线圈电压比等于匝数比，电流比则与之相反。升压利于输电、降压利于用电，闭合铁芯能提高磁耦合效率。",
            en: "Primary-to-secondary voltage equals the turn ratio while current ratio is inverted. Step-up aids transmission, step-down aids use; a closed iron core improves coupling.",
          },
          eq: { lhs: "U1/U2", rhs: "n1/n2", rel: "equal" },
          tags: [{ zh: "电磁", en: "Electromagnetism" }],
        },
        {
          id: "self-induction",
          icon: "🌀",
          term: { zh: "自感与互感", en: "Self & Mutual Induction" },
          level: 3,
          oneLiner: {
            zh: "导体自身电流变化会在本回路激起感应电动势，两线圈之间则相互感应。",
            en: "A changing current induces EMF in its own circuit (self) and in a neighboring coil (mutual).",
          },
          detail: {
            zh: "自感电动势总是阻碍电流变化，使通电、断电呈现延时；线圈的自感系数以亨利为单位。互感是变压器与无线充电的原理。",
            en: "Self-induced EMF opposes current change, giving switch-on and switch-off lag; inductance is measured in henries. Mutual induction underlies transformers and wireless charging.",
          },
          eq: { lhs: "ε", rhs: "L·ΔI/Δt", rel: "equal" },
          tags: [{ zh: "电磁", en: "Electromagnetism" }],
        },
        {
          id: "lc-oscillation",
          icon: "🎛️",
          term: { zh: "电磁振荡与电磁波发射", en: "LC Oscillation & Wave Emission" },
          level: 3,
          oneLiner: {
            zh: "电容与电感回路中电场能与磁场能周期互转，产生高频振荡，是发射电磁波的基础。",
            en: "In an LC circuit electric and magnetic energy trade periodically, giving high-frequency oscillation—the basis of emitting EM waves.",
          },
          detail: {
            zh: "振荡频率由电感与电容共同决定；要有效辐射需高频且采用开放电路，故无线电通信使用极高的载波频率。",
            en: "The oscillation frequency is set by inductance and capacitance; efficient radiation needs high frequency and an open circuit, so radio uses very high carriers.",
          },
          eq: { lhs: "f", rhs: "1/(2π√(LC))", rel: "equal" },
          tags: [{ zh: "电磁", en: "Electromagnetism" }],
        },
      ],
    },
    /* ===================== 天体与宇宙 ===================== */
    {
      key: "astronomy",
      icon: "🌌",
      title: { zh: "天体与宇宙", en: "Astronomy & Cosmos" },
      items: [
        {
          id: "solar-system",
          icon: "🪐",
          term: { zh: "太阳系", en: "Solar System" },
          level: 1,
          oneLiner: {
            zh: "以太阳为中心，八大行星及卫星、小行星、彗星等组成的天体系统。",
            en: "The Sun-centered system of eight planets, moons, asteroids and comets.",
          },
          detail: {
            zh: "日心说由哥白尼确立，开普勒与牛顿完善了运动规律。",
            en: "Copernicus set the heliocentric model; Kepler and Newton refined the laws.",
          },
          tags: [{ zh: "天体", en: "Astronomy" }],
        },
        {
          id: "stars-galaxies",
          icon: "✨",
          term: { zh: "恒星与星系", en: "Stars & Galaxies" },
          level: 1,
          oneLiner: {
            zh: "恒星靠核聚变发光；太阳位于银河系一条旋臂上。",
            en: "Stars shine by fusion; the Sun lies in a spiral arm of the Milky Way.",
          },
          detail: {
            zh: "星系由海量恒星、气体与暗物质构成，宇宙中有数千亿个星系。",
            en: "Galaxies of stars, gas and dark matter number in the hundreds of billions.",
          },
          tags: [{ zh: "天体", en: "Astronomy" }],
        },
        {
          id: "redshift",
          eq: { lhs: "v", rhs: "H₀d", rel: "equal" },
          icon: "📉",
          term: { zh: "宇宙膨胀与红移", en: "Expansion & Redshift" },
          level: 2,
          oneLiner: {
            zh: "星系光谱普遍红移，说明宇宙在膨胀（哈勃定律 v=H₀d）。",
            en: "Cosmic redshift shows expansion (Hubble's law v=H₀d).",
          },
          detail: {
            zh: "其中 v 为星系退行速度，H₀ 为哈勃常数，d 为星系距离。",
            en: "v recession speed, H₀ Hubble constant, d distance.",
          },
          tags: [{ zh: "宇宙学", en: "Cosmology" }],
        },
        {
          id: "big-bang",
          icon: "💥",
          term: { zh: "大爆炸宇宙论", en: "Big Bang Theory" },
          level: 2,
          oneLiner: {
            zh: "宇宙源于约 138 亿年前的一次极高温高密度状态膨胀。",
            en: "The universe expanded from a hot, dense state ~13.8 billion years ago.",
          },
          detail: {
            zh: "宇宙微波背景辐射是其重要观测证据。",
            en: "The cosmic microwave background is key evidence.",
          },
          tags: [{ zh: "宇宙学", en: "Cosmology" }],
        },
        {
          id: "black-hole",
          icon: "🕳️",
          term: { zh: "黑洞", en: "Black Hole" },
          level: 3,
          oneLiner: {
            zh: "引力极强、连光也无法逃逸的天体，边界称为事件视界。",
            en: "An object so dense that not even light escapes; bounded by the event horizon.",
          },
          detail: {
            zh: "由大质量恒星坍缩形成；2019 年首张黑洞照片由事件视界望远镜拍摄。",
            en: "Formed by collapse of massive stars; first image captured in 2019.",
          },
          tags: [{ zh: "天体", en: "Astronomy" }],
        },
        {
          id: "gravitational-waves",
          icon: "〰️",
          term: { zh: "引力波", en: "Gravitational Waves" },
          level: 3,
          oneLiner: {
            zh: "加速运动的质量扰动时空产生的涟漪，以光速传播。",
            en: "Ripples in spacetime from accelerating masses, traveling at light speed.",
          },
          detail: {
            zh: "2015 年 LIGO 首次直接探测到双黑洞并合产生的引力波。",
            en: "LIGO first detected them in 2015 from merging black holes.",
          },
          tags: [{ zh: "现代物理", en: "Modern Physics" }],
        },
        {
          id: "stellar-evolution",
          icon: "⭐",
          term: { zh: "恒星的一生", en: "Stellar Evolution" },
          level: 2,
          oneLiner: {
            zh: "恒星由星云引力坍缩点燃，历经主序、膨胀，最终坍缩或爆发，结局由初始质量决定。",
            en: "Stars ignite by gravitational collapse, live on the main sequence, then end as white dwarf, neutron star or black hole by mass.",
          },
          detail: {
            zh: "氢聚变为氦释放辐射压以对抗引力；燃料耗尽后，小质量恒星抛出行星状星云留下白矮星，大质量者经超新星爆发留下中子星或黑洞，重元素也由此播撒宇宙。",
            en: "Hydrogen fusion balances gravity; when fuel runs out, low-mass stars shed shells as white dwarfs, massive ones explode as supernovae leaving neutron stars or black holes and seeding the cosmos with heavy elements.",
          },
          tags: [{ zh: "天体", en: "Astronomy" }],
        },
        {
          id: "cosmic-microwave-background",
          icon: "📻",
          term: { zh: "宇宙微波背景", en: "Cosmic Microwave Background" },
          level: 3,
          oneLiner: {
            zh: "大爆炸约三十八万年后遗留的宇宙「余晖」，充满全天，温度仅约三开尔文。",
            en: "The afterglow of the Big Bang released some 380,000 years in, filling all sky at barely about three kelvin.",
          },
          detail: {
            zh: "炽热早期宇宙冷却到电子与质子结合成原子、光得以自由穿行，那束古老辐射今天被宇宙膨胀红移为微波；其微小的温度涨落正是星系诞生的种子。",
            en: "As the hot early universe cooled enough for atoms to form, light streamed free; that ancient glow is now redshifted to microwaves, and its tiny temperature ripples are the seeds of galaxies.",
          },
          tags: [{ zh: "宇宙学", en: "Cosmology" }],
        },
        {
          id: "dark-matter",
          icon: "🌑",
          term: { zh: "暗物质", en: "Dark Matter" },
          level: 3,
          oneLiner: {
            zh: "不发光、只靠引力显现的神秘物质，约占宇宙物质总量的八成。",
            en: "Invisible matter felt only through gravity, making up roughly four-fifths of the universe's matter.",
          },
          detail: {
            zh: "星系外缘的旋转速度、引力透镜弯折的光与宇宙大尺度结构，都要求存在远超可见星的额外质量；其候选粒子至今尚未被直接探测到。",
            en: "Galaxy rotation curves, the light bent by gravitational lensing and cosmic structure all demand far more mass than stars supply; candidate particles remain undetected.",
          },
          tags: [{ zh: "宇宙学", en: "Cosmology" }],
        },
        {
          id: "cosmic-distance",
          icon: "📏",
          term: { zh: "光年与宇宙尺度", en: "Light-Years & Cosmic Distance" },
          level: 1,
          oneLiner: {
            zh: "光年指的是光在一年里走过的距离，约十万亿公里；浩瀚宇宙用光年与秒差距来丈量。",
            en: "A light-year is the distance light crosses in a year, some ten trillion km; the vast cosmos is measured in light-years and parsecs.",
          },
          detail: {
            zh: "离太阳最近的恒星约四光年之遥。天文学家用三角视差、标准烛光等「宇宙量天尺」，逐级丈量由近及远的天体距离，看远方即是在回溯过去。",
            en: "The nearest star lies just over four light-years off; astronomers ladder up distance by parallax and standard candles, and in looking far away they look back in time.",
          },
          tags: [{ zh: "天体", en: "Astronomy" }],
        },
      ],
    },
    /* ===================== 相对论 ===================== */
    {
      key: "relativity",
      icon: "🕰️",
      title: { zh: "相对论", en: "Relativity" },
      items: [
        {
          id: "sr-postulates",
          icon: "📜",
          term: {
            zh: "狭义相对论基本原理",
            en: "Postulates of Special Relativity",
          },
          level: 3,
          oneLiner: {
            zh: "相对性原理 + 光速不变原理：所有惯性系物理定律相同，真空中光速恒为 c。",
            en: "Relativity + light-speed invariance: laws are same in all inertial frames; c is constant.",
          },
          detail: {
            zh: "由爱因斯坦于 1905 年提出，颠覆了绝对时空观。",
            en: "Einstein (1905) overturned absolute space and time.",
          },
          tags: [{ zh: "现代物理", en: "Modern Physics" }],
        },
        {
          id: "time-dilation",
          eq: { lhs: "Δt", rhs: "Δt₀/√(1−v²/c²)", rel: "equal" },
          icon: "⏳",
          term: { zh: "时间膨胀", en: "Time Dilation" },
          level: 3,
          oneLiner: {
            zh: "运动时钟变慢：Δt=Δt₀/√(1−v²/c²)。",
            en: "Moving clocks run slow: Δt=Δt₀/√(1−v²/c²).",
          },
          detail: {
            zh: "粒子加速器中的不稳定粒子寿命因此被显著延长。其中 Δt 为运动参考系测得的时间，Δt₀ 为静止参考系的原时，v 为相对速度，c 为光速。",
            en: "Unstable particles in accelerators live longer as predicted. Δt moving-frame time, Δt₀ rest proper time, v relative speed, c light speed.",
          },
          tags: [{ zh: "现代物理", en: "Modern Physics" }],
        },
        {
          id: "length-contraction",
          eq: { lhs: "L", rhs: "L₀√(1−v²/c²)", rel: "equal" },
          icon: "📏",
          term: { zh: "长度收缩", en: "Length Contraction" },
          level: 3,
          oneLiner: {
            zh: "运动方向上的长度变短：L=L₀√(1−v²/c²)。",
            en: "Length along motion shortens: L=L₀√(1−v²/c²).",
          },
          detail: {
            zh: "其中 L 为运动参考系测得的长度，L₀ 为静止时的原长，v 为相对速度，c 为光速。",
            en: "L measured in the moving frame, L₀ the rest length, v relative speed, c light speed.",
          },
          tags: [{ zh: "现代物理", en: "Modern Physics" }],
        },
        {
          id: "mass-energy",
          eq: { lhs: "E", rhs: "mc²", rel: "equal" },
          icon: "⚛️",
          term: { zh: "质能方程", en: "Mass–Energy Equivalence" },
          level: 3,
          oneLiner: { zh: "质量即能量：E=mc²。", en: "Mass is energy: E=mc²." },
          detail: {
            zh: "核反应释放的能量正来自质量的微小亏损。其中 E 为能量，m 为质量，c 为光速。",
            en: "Nuclear energy comes from tiny mass defects. E energy, m mass, c speed of light.",
          },
          tags: [{ zh: "现代物理", en: "Modern Physics" }],
        },
        {
          id: "general-relativity",
          icon: "🌐",
          term: { zh: "广义相对论与时空弯曲", en: "General Relativity" },
          level: 3,
          oneLiner: {
            zh: "引力被诠释为时空的弯曲，物质告诉时空如何弯曲。",
            en: "Gravity is spacetime curvature caused by mass-energy.",
          },
          detail: {
            zh: "预言了光线偏折、引力红移、黑洞与引力波，均已被观测证实。",
            en: "Predicts light bending, gravitational redshift, black holes and waves — all observed.",
          },
          tags: [{ zh: "现代物理", en: "Modern Physics" }],
        },
        {
          id: "relativity-simultaneity",
          icon: "⏱️",
          term: { zh: "同时的相对性", en: "Relativity of Simultaneity" },
          level: 3,
          oneLiner: {
            zh: "两件事是否「同时」发生取决于观察者的运动状态，没有绝对的全域此刻。",
            en: "Whether two events are simultaneous depends on the observer's motion; there is no universal now.",
          },
          detail: {
            zh: "高速行驶的列车上，车头车尾两道闪电对车上的人可能不同时、对站台的人却可能同时；时间与空间随参考系而重新划分。",
            en: "Lightning at a fast train's front and rear may be non-simultaneous to riders yet simultaneous on the platform; time and space are re-parted by each frame.",
          },
          tags: [{ zh: "现代物理", en: "Modern Physics" }],
        },
        {
          id: "equivalence-principle",
          icon: "🛗",
          term: { zh: "等效原理", en: "Equivalence Principle" },
          level: 3,
          oneLiner: {
            zh: "引力与加速度在局部不可区分，这是广义相对论的基石。",
            en: "Gravity and acceleration are locally indistinguishable—the cornerstone of general relativity.",
          },
          detail: {
            zh: "在密闭电梯里，人无法分辨是静止于地面还是在深空被匀加速；既然加速度可使光线弯曲，引力也必然使光线弯曲，由此走向时空的几何。",
            en: "In a sealed lift one cannot tell rest on Earth from uniform acceleration in deep space; since acceleration can bend light, gravity must too—leading to the curved geometry of spacetime.",
          },
          tags: [{ zh: "现代物理", en: "Modern Physics" }],
        },
        {
          id: "gravitational-time",
          icon: "🕰️",
          term: { zh: "引力使时间变慢", en: "Gravitational Time Dilation" },
          level: 3,
          oneLiner: {
            zh: "引力越强、时钟走得越慢；山脚的表比山顶的略慢。",
            en: "The stronger the gravity, the slower clocks run; a clock at a mountain's foot lags one at its peak.",
          },
          detail: {
            zh: "近大质量天体处时间流逝变缓，这正是全球定位卫星必须校正的效应，也是电影里「天上一日、地上一年」的物理雏形。",
            en: "Time slows near mass—precisely the correction orbiting position satellites need, and the physics behind 'a day up high, a year below' in film.",
          },
          tags: [{ zh: "现代物理", en: "Modern Physics" }],
        },
        {
          id: "mass-velocity",
          icon: "🚀",
          term: { zh: "质速关系", en: "Mass-Speed Relation" },
          level: 3,
          oneLiner: {
            zh: "物体速度越接近光速，加速它越难，等效惯性随之增大。",
            en: "The closer to light speed, the harder to accelerate—an effective rise in inertia.",
          },
          detail: {
            zh: "随速度升高，动量增长快于经典预期，任何有质量的物体都无法被推到光速；这解释了粒子加速器里电子越飙越「重」。",
            en: "Momentum grows faster than classical physics expects with speed, so no massive body can be pushed to light speed—why electrons in accelerators feel ever heavier as they race.",
          },
          tags: [{ zh: "现代物理", en: "Modern Physics" }],
        },
      ],
    },
    /* ===================== 原子物理与原子核（含示意图） ===================== */
    {
      key: "atomic",
      icon: "☢️",
      title: { zh: "原子物理与原子核", en: "Atomic & Nuclear Physics" },
      items: [
        {
          id: "nuclear-model",
          icon: "🪐",
          term: { zh: "原子的核式模型", en: "Nuclear Model of the Atom" },
          level: 2,
          oneLiner: {
            zh: "卢瑟福提出原子核式结构，玻尔引入量子化轨道解释氢原子。",
            en: "Rutherford proposed the nuclear atom; Bohr added quantized orbits to explain hydrogen.",
          },
          detail: {
            zh: "α 粒子散射实验表明正电荷集中于很小的核；玻尔假设电子在特定能级轨道上稳定运动，跃迁时吸收或辐射光子。",
            en: "α-scattering showed positive charge concentrated in a tiny nucleus; Bohr assumed electrons in fixed-energy orbits, emitting or absorbing photons on jumps.",
          },
          tags: [{ zh: "原子", en: "Atomic" }],
          figure: `<svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <g fill="none" stroke="#3b82f6" stroke-opacity="0.7" stroke-width="1.6"><circle cx="150" cy="112" r="30"/><circle cx="150" cy="112" r="56"/><circle cx="150" cy="112" r="82"/></g>
  <circle cx="150" cy="112" r="20" fill="#e5484d"/><text x="150" y="116" text-anchor="middle" font-size="10" fill="#fff">核 +Ze</text>
  <g fill="#22c55e"><circle cx="180" cy="112" r="5"/><circle cx="150" cy="56" r="5"/><circle cx="150" cy="194" r="5"/><circle cx="94" cy="112" r="5"/></g>
  <text x="8" y="22" font-size="12" fill="currentColor">电子在量子化轨道上绕核</text>
  <text x="250" y="116" font-size="11" fill="#22c55e">e⁻</text>
</svg>`,
        },
        {
          id: "energy-levels",
          eq: { lhs: "hν", rhs: "E高 − E低", rel: "equal" },
          icon: "📶",
          term: { zh: "能级与氢原子光谱", en: "Energy Levels & Spectra" },
          level: 3,
          oneLiner: {
            zh: "原子能量量子化；电子在高能级向低能级跃迁时辐射一份光子 hν。",
            en: "Atomic energy is quantized; an electron dropping levels emits a photon of energy hν.",
          },
          detail: {
            zh: "能级差决定光子频率：hν = E高 − E低；氢原子光谱的谱线即各能级间跃迁的结果（巴耳末系等）。",
            en: "The level gap fixes the frequency: hν = E_high − E_low; hydrogen's spectral lines are these transitions (Balmer series, etc.).",
          },
          tags: [{ zh: "量子", en: "Quantum" }],
          figure: `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <line x1="46" y1="28" x2="46" y2="205" stroke="currentColor" stroke-opacity="0.5"/><text x="10" y="30" font-size="11" fill="currentColor">E</text>
  <g stroke="#3b82f6" stroke-width="2">
    <line x1="74" y1="196" x2="210" y2="196"/><line x1="74" y1="152" x2="210" y2="152"/><line x1="74" y1="116" x2="210" y2="116"/><line x1="74" y1="88" x2="210" y2="88"/>
  </g>
  <g font-size="10" fill="currentColor"><text x="56" y="199">n=1</text><text x="56" y="155">n=2</text><text x="56" y="119">n=3</text><text x="56" y="91">n=4</text></g>
  <defs><marker id="arE" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#22c55e"/></marker></defs>
  <line x1="170" y1="116" x2="170" y2="152" stroke="#22c55e" stroke-width="2" marker-end="url(#arE)"/>
  <path d="M178 150 q10 -8 20 0 q10 8 20 0 q10 -8 20 0" fill="none" stroke="#e5484d" stroke-width="1.6"/>
  <text x="240" y="140" font-size="11" fill="#e5484d">光子 hν</text>
  <text x="74" y="215" font-size="11" fill="currentColor">跃迁释放光子 hν = E₃ − E₂</text>
</svg>`,
        },
        {
          id: "wave-particle",
          eq: { lhs: "λ", rhs: "h/p", rel: "equal" },
          icon: "🌗",
          term: { zh: "波粒二象性", en: "Wave–Particle Duality" },
          level: 3,
          oneLiner: {
            zh: "光与实物粒子都兼具波动性与粒子性。",
            en: "Both light and matter show wave and particle aspects.",
          },
          detail: {
            zh: "光电效应、康普顿散射揭示光的粒子性；德布罗意提出物质波 λ = h/p，电子衍射实验证实。粒子性强的宏观物体波动性可忽略。",
            en: "Photoelectric and Compton effects reveal light's particle side; de Broglie's matter waves λ = h/p were confirmed by electron diffraction.",
          },
          tags: [{ zh: "量子", en: "Quantum" }],
        },
        {
          id: "nucleus-isotope",
          icon: "🔵",
          term: { zh: "原子核与同位素", en: "Nucleus & Isotopes" },
          level: 2,
          oneLiner: {
            zh: "原子核由质子与中子构成，质子数决定元素、中子数形成同位素。",
            en: "Nuclei of protons and neutrons: protons set the element, neutrons give isotopes.",
          },
          detail: {
            zh: "用 ᴬZX 表示：Z 为质子数（电荷数）、A 为质量数（质子 + 中子）；质子数相同、中子数不同者互为同位素（如氕、氘、氚）。",
            en: "Notated ᴬZX: Z protons, A mass number; same Z but different N are isotopes (protium, deuterium, tritium).",
          },
          tags: [{ zh: "原子核", en: "Nuclear" }],
        },
        {
          id: "radioactivity",
          icon: "☢️",
          term: { zh: "放射性与半衰期", en: "Radioactivity & Half-life" },
          level: 2,
          oneLiner: {
            zh: "不稳定核自发放出 α、β、γ 射线衰变；半衰期描述衰变快慢。",
            en: "Unstable nuclei emit α, β, γ radiation; half-life measures the decay rate.",
          },
          detail: {
            zh: "α 射线是氦核（电离强、穿透弱）、β 是高速电子、γ 是光子（穿透最强）；半衰期是统计规律，不随物理化学环境改变。",
            en: "α = helium nuclei (ionizing, weak penetration), β = fast electrons, γ = photons (most penetrating); half-life is statistical and environment-independent.",
          },
          tags: [{ zh: "原子核", en: "Nuclear" }],
          figure: `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <rect x="130" y="26" width="150" height="8" fill="#e5484d"/><text x="272" y="34" font-size="10" fill="#e5484d">负极 −</text>
  <rect x="130" y="186" width="150" height="8" fill="#3b82f6"/><text x="272" y="194" font-size="10" fill="#3b82f6">正极 +</text>
  <rect x="40" y="98" width="26" height="24" fill="#9aa4b2"/><text x="18" y="140" font-size="10" fill="currentColor">放射源</text>
  <g fill="none" stroke-width="2.4">
    <path d="M66 110 H130 Q200 110 240 86" stroke="#e5484d"/>
    <path d="M66 110 H130 Q180 110 195 175" stroke="#22c55e"/>
    <line x1="66" y1="110" x2="320" y2="110" stroke="#9aa4b2"/>
  </g>
  <g font-size="11"><text x="250" y="80" fill="#e5484d">α（少量偏折）</text><text x="150" y="196" fill="#22c55e">β（大幅偏折）</text><text x="286" y="104" fill="#9aa4b2">γ</text></g>
</svg>`,
        },
        {
          id: "binding-energy",
          icon: "⚖️",
          term: { zh: "核力与结合能", en: "Nuclear Force & Binding Energy" },
          level: 3,
          oneLiner: {
            zh: "核力把核子束缚在一起；形成核时质量亏损以结合能释放。",
            en: "The strong force binds nucleons; the mass defect appears as binding energy.",
          },
          detail: {
            zh: "由 E = mc²，结合能对应质量亏损；比结合能（每个核子）越大核越稳定，中等质量核最稳，故重核裂变、轻核聚变都能释放能量。",
            en: "Via E = mc² binding energy matches a mass defect; higher binding energy per nucleon means greater stability, so both fission of heavy and fusion of light nuclei release energy.",
          },
          tags: [{ zh: "原子核", en: "Nuclear" }],
        },
        {
          id: "fission",
          icon: "💥",
          term: { zh: "核裂变与链式反应", en: "Fission & Chain Reaction" },
          level: 3,
          oneLiner: {
            zh: "重核（如铀-235）俘获中子后分裂，放出能量与中子，引发链式反应。",
            en: "A heavy nucleus (U-235) absorbs a neutron, splits, and releases energy plus neutrons, driving a chain reaction.",
          },
          detail: {
            zh: "一次裂变约释 200 MeV 并放出 2–3 个中子；可控链式反应用于核电站，不可控则用于核武器。",
            en: "Each fission yields ~200 MeV and 2–3 neutrons; controlled in reactors, uncontrolled in weapons.",
          },
          tags: [{ zh: "原子核", en: "Nuclear" }],
          figure: `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <circle cx="46" cy="92" r="7" fill="#9aa4b2"/><text x="34" y="72" font-size="10" fill="currentColor">n</text>
  <path d="M56 92 H86" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <circle cx="120" cy="92" r="26" fill="#e5484d"/><text x="120" y="96" text-anchor="middle" font-size="10" fill="#fff">U-235</text>
  <path d="M150 92 H176" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <circle cx="200" cy="70" r="17" fill="#3b82f6"/><text x="200" y="74" text-anchor="middle" font-size="9" fill="#fff">Ba</text>
  <circle cx="200" cy="116" r="14" fill="#3b82f6"/><text x="200" y="120" text-anchor="middle" font-size="9" fill="#fff">Kr</text>
  <g fill="#22c55e"><circle cx="248" cy="56" r="6"/><circle cx="268" cy="92" r="6"/><circle cx="248" cy="128" r="6"/></g>
  <g stroke="#22c55e" stroke-width="1.4"><line x1="216" y1="62" x2="242" y2="56"/><line x1="216" y1="92" x2="262" y2="92"/><line x1="216" y1="122" x2="242" y2="128"/></g>
  <text x="180" y="165" text-anchor="middle" font-size="10" fill="currentColor">放出 2–3 中子 + 能量 ≈ 200 MeV，引发链式反应</text>
</svg>`,
        },
        {
          id: "fusion",
          icon: "☀️",
          term: { zh: "核聚变", en: "Nuclear Fusion" },
          level: 3,
          oneLiner: {
            zh: "轻核（氘氚）在超高温下结合成较重核，释放巨大能量。",
            en: "Light nuclei (deuterium–tritium) fuse at extreme heat into heavier ones, releasing vast energy.",
          },
          detail: {
            zh: "太阳与氢弹能量源于聚变；单位质量释能比裂变更大、产物更清洁，但需上亿度高温约束（磁约束/惯性约束），可控聚变仍在攻关。",
            en: "The Sun and hydrogen bombs run on fusion; per mass it releases more energy than fission with cleaner products, but needs >10⁸ K confinement (magnetic/inertial) — controlled fusion is still being mastered.",
          },
          tags: [{ zh: "原子核", en: "Nuclear" }],
        },
        {
          id: "standard-model",
          icon: "🧩",
          term: { zh: "粒子物理与标准模型", en: "Particle Physics & the Standard Model" },
          level: 3,
          oneLiner: {
            zh: "物质由夸克与轻子构成，靠规范玻色子传递三种基本相互作用。",
            en: "Matter is built of quarks and leptons, with gauge bosons carrying three fundamental forces.",
          },
          detail: {
            zh: "标准模型把基本粒子分为费米子（六种夸克与电子、μ 子、τ 子及其中微子）与玻色子（光子、胶子、W/Z，以及 2012 年证实的希格斯玻色子），统一了电磁、弱、强三种相互作用，引力不在其内。夸克因色禁闭从不单独出现、只能组成质子与中子等强子；该模型预言极精，却无法解释暗物质、中微子质量与引力，被视为更深层理论的近似。",
            en: "The Standard Model sorts particles into fermions (six quarks plus the electron, muon, tau and their neutrinos) and bosons (photon, gluon, W/Z, and the Higgs confirmed in 2012), unifying the electromagnetic, weak and strong forces—gravity aside. Quarks never appear free due to color confinement, only as hadrons like protons and neutrons; the model is uncannily precise yet leaves dark matter, neutrino mass and gravity unexplained, and is taken as an approximation of a deeper theory.",
          },
          tags: [{ zh: "粒子", en: "Particles" }, { zh: "前沿", en: "Frontier" }],
        },
      ],
    },
    /* ===================== 机械振动与波 ===================== */
    {
      key: "waves",
      icon: "🌊",
      title: { zh: "机械振动与波", en: "Vibrations & Waves" },
      items: [
        {
          id: "shm",
          icon: "🪝",
          term: { zh: "简谐运动", en: "Simple Harmonic Motion" },
          level: 2,
          oneLiner: {
            zh: "物体在平衡位置附近往复运动，回复力与位移成正比、方向相反。",
            en: "Oscillation about equilibrium with restoring force proportional to displacement.",
          },
          detail: {
            zh: "F=−kx，加速度 a=−(k/m)x；位移随时间按正弦变化。典型模型：弹簧振子、小摆角单摆。",
            en: "F=−kx so a=−(k/m)x; displacement varies sinusoidally. Models: spring oscillator, small-angle pendulum.",
          },
          tags: [{ zh: "振动", en: "Vibration" }],
        },
        {
          id: "pendulum",
          icon: "⏳",
          term: { zh: "周期与频率", en: "Period & Frequency" },
          level: 2,
          oneLiner: {
            zh: "完成一次全振动的时间叫周期 T，每秒振动次数叫频率 f，二者互为倒数。",
            en: "Period T is time per cycle, frequency f is cycles per second; they are reciprocals.",
          },
          detail: {
            zh: "T=1/f；单摆周期 T=2π√(L/g) 只与摆长和重力加速度有关、与质量无关（小摆角）。",
            en: "T=1/f; a pendulum's T=2π√(L/g) depends on length and g only, not mass (small angles).",
          },
          eq: { lhs: "T", rhs: "2π√(L/g)", rel: "equal" },
          tags: [{ zh: "振动", en: "Vibration" }],
        },
        {
          id: "wave-motion",
          icon: "〰️",
          term: { zh: "波长·波速·频率", en: "Wavelength, Speed & Frequency" },
          level: 2,
          oneLiner: {
            zh: "振动在介质中传播形成波，波速等于波长乘以频率。",
            en: "A wave is vibration traveling through a medium; speed equals wavelength times frequency.",
          },
          detail: {
            zh: "v=λf；波传播的是振动形式与能量，介质质点并不随波迁移。分横波（如弦波）与纵波（如声波）。",
            en: "v=λf; waves carry form and energy, not matter. Transverse (string) vs longitudinal (sound).",
          },
          eq: { lhs: "v", rhs: "λf", rel: "equal" },
          tags: [{ zh: "波动", en: "Wave" }],
        },
        {
          id: "superposition",
          icon: "🔃",
          term: { zh: "波的叠加与干涉", en: "Superposition & Interference" },
          level: 3,
          oneLiner: {
            zh: "两列相干波相遇时位移叠加，形成加强区与减弱区。",
            en: "Overlapping coherent waves add, giving constructive and destructive regions.",
          },
          detail: {
            zh: "频率相同、相位差恒定的相干波才能产生稳定干涉；路程差为波长整数倍加强、半整数倍减弱。衍射则是一切波共有的绕过障碍物现象。",
            en: "Stable interference needs equal frequency and constant phase; integer wavelengths reinforce, half-integers cancel. Diffraction lets waves bend around obstacles.",
          },
          tags: [{ zh: "波动", en: "Wave" }],
        },
        {
          id: "standing-wave",
          icon: "🎸",
          term: { zh: "驻波与共振", en: "Standing Waves & Resonance" },
          level: 3,
          oneLiner: {
            zh: "两列同向反向波叠加形成驻定波形；驱动力频率接近固有频率时振幅最大即共振。",
            en: "Counter-traveling waves form standing patterns; driving near natural frequency maximizes amplitude (resonance).",
          },
          detail: {
            zh: "弦乐器、管乐器的音高源于驻波的波长；塔科马大桥风毁是共振破坏的经典案例。",
            en: "String and wind instrument pitches arise from standing waves; the Tacoma Narrows collapse shows destructive resonance.",
          },
          tags: [{ zh: "波动", en: "Wave" }],
        },
        {
          id: "wave-graphs",
          icon: "📈",
          term: { zh: "波动图象与振动图象", en: "Waveform & Oscillation Graphs" },
          level: 2,
          oneLiner: {
            zh: "y–x 图看某一时刻所有质点的位置，y–t 图看某一个质点随时间的位移。",
            en: "A y–x graph shows every particle at one instant; a y–t graph shows one particle through time.",
          },
          detail: {
            zh: "波动图象的横轴是位置，相邻两波峰之间直接读出波长；振动图象的横轴是时间，一次完整起伏的宽度即周期，两图合体再用 v=λ/T 求波速。判断传播方向常用“带动法”：先振动的质点带动后振动的质点，故波形沿传播方向平移少许即可比出各点下一时刻的动向。最典型的易错是把 y–x 快照误当成某质点的振动历史——两图形状一样、含义完全不同；反之由振动图推各质点位置时，须先确认所给时刻。",
            en: "On a y–x graph the horizontal axis is position, so adjacent crests give the wavelength directly; on a y–t graph it is time, so one full excursion gives the period, and together they yield v=λ/T. To find the direction of travel, shift the whole waveform a little along the guessed direction and compare: whichever way fits the observed particle motions is the true one. The classic error is reading a y–x snapshot as a particle's history—the two curves look identical but mean different things, and going from a y–t graph back to positions requires fixing the instant first.",
          },
          tags: [{ zh: "波动", en: "Wave" }],
        },
        {
          id: "huygens-principle",
          icon: "🌀",
          term: { zh: "惠更斯原理", en: "Huygens' Principle" },
          level: 3,
          oneLiner: {
            zh: "波面上每一点都可视为发出子波的新波源，各子波的包络就是下一时刻的波面。",
            en: "Every point of a wavefront emits a secondary wavelet; the envelope of all of them is the next wavefront.",
          },
          detail: {
            zh: "这一作图同时解释了波的反射、折射与衍射：波进入波速较小的介质时，同一波面上各点子波前进的距离变短，包线遂转向法线一侧——频率保持不变，波速与波长同比例减小。它也给出衍射明显的条件：障碍物或孔径的尺寸与波长可比时子波绕得很远，尺寸远大于波长时阴影边界锐利、近似直线传播。原原理只定出波面的几何位置，不回答各方向各分配多少能量，后由菲涅耳补上子波相干叠加，才成为可定量使用的惠更斯–菲涅耳原理。",
            en: "The construction explains reflection, refraction and diffraction at once: entering a slower medium shortens every secondary wavelet on the same front, tilting the envelope toward the normal while frequency holds and speed and wavelength shrink together. It also sets the condition for strong diffraction—an obstacle or aperture comparable to the wavelength is wrapped around substantially, whereas one far larger leaves a sharp shadow and near-rectilinear travel. The original principle fixes only wavefront geometry, not how much energy goes each way; Fresnel added coherent superposition of the wavelets, making it the quantitatively usable Huygens–Fresnel principle.",
          },
          tags: [{ zh: "波动", en: "Wave" }],
        },
        {
          id: "beats",
          icon: "🎼",
          term: { zh: "拍与拍频", en: "Beats & Beat Frequency" },
          level: 3,
          oneLiner: {
            zh: "两列频率相近的波叠加，强弱会周期性地起伏，起伏频率等于两频率之差。",
            en: "Two waves of nearby frequencies add into a pulsation whose rate is their difference.",
          },
          detail: {
            zh: "f₁ 与 f₂ 相差不大时，两波时而同相加强、时而反相抵消，每秒强弱变化的次数即拍频 |f₁−f₂|。拍是叠加造成的效果而非新的波：介质中各点仍同时参与两个频率的振动。调音师靠听拍判断音准——拍频越大相差越远，拍消失即已同频；超声血流计与雷达测速则把拍频（差频）与多普勒频移配合使用来读出速度。注意与驻波区分：驻波由同频率、相向传播的两列波形成，节与腹的位置固定；拍则是各点振幅随时间的起伏。",
            en: "With f₁ and f₂ close, the pair alternately reinforces and cancels, and the number of swellings per second—the beat frequency—is |f₁−f₂|. A beat is an effect of superposition, not a third wave: each particle still takes part in both original oscillations. Tuners listen for beats to judge pitch, a fast beat meaning a wide gap and silence on them meaning unison; ultrasonic blood-flow meters and radar speed guns combine the difference frequency with the Doppler shift to read out speed. Standing waves are different: made from two equal-frequency counter-traveling waves, they hold nodes and antinodes fixed in space, whereas beats are an amplitude that pulses in time.",
          },
          tags: [{ zh: "波动", en: "Wave" }, { zh: "声学", en: "Acoustics" }],
        },
      ],
    },
    /* ===================== 压强与浮力 ===================== */
    {
      key: "fluids",
      icon: "🛟",
      title: { zh: "压强与浮力", en: "Pressure & Buoyancy" },
      items: [
        {
          id: "pressure",
          icon: "👆",
          term: { zh: "压强", en: "Pressure" },
          level: 1,
          oneLiner: {
            zh: "单位面积上受到的压力，反映压力作用效果。",
            en: "Force per unit area; measures how concentrated a push is.",
          },
          detail: {
            zh: "p=F/S，单位帕斯卡 Pa；刀磨得薄、铁轨铺枕木分别通过减小/增大受力面积改变压强。",
            en: "p=F/S in pascals; a sharp blade reduces area, sleepers under rails increase it.",
          },
          eq: { lhs: "p", rhs: "F/S", rel: "equal" },
          tags: [{ zh: "力学", en: "Mechanics" }],
        },
        {
          id: "liquid-pressure",
          icon: "💧",
          term: { zh: "液体压强", en: "Liquid Pressure" },
          level: 2,
          oneLiner: {
            zh: "液体内部向各方都有压强，随深度与密度增大。",
            en: "Liquids press in all directions; it grows with depth and density.",
          },
          detail: {
            zh: "p=ρgh 只与密度、深度有关；连通器静止时液面等高（茶壶、船闸、下水道存水弯）。",
            en: "p=ρgh depends on density and depth; connected vessels level out (teapots, locks, traps).",
          },
          eq: { lhs: "p", rhs: "ρgh", rel: "equal" },
          tags: [{ zh: "流体", en: "Fluids" }],
        },
        {
          id: "atmospheric",
          icon: "🌍",
          term: { zh: "大气压强", en: "Atmospheric Pressure" },
          level: 2,
          oneLiner: {
            zh: "空气受重力与流动性产生压强，标准大气压约 1.01×10⁵ Pa。",
            en: "Air's weight creates pressure; standard atmosphere ≈ 1.01×10⁵ Pa.",
          },
          detail: {
            zh: "托里析利实验首次测出大气压；吸盘、吸管、活塞式抽水机都靠大气压工作；气压随海拔升高而降低。",
            en: "Torricelli first measured it; suction cups, straws and pumps rely on it; it drops with altitude.",
          },
          tags: [{ zh: "流体", en: "Fluids" }],
        },
        {
          id: "buoyancy",
          icon: "🚤",
          term: { zh: "浮力与阿基米德原理", en: "Buoyancy & Archimedes" },
          level: 2,
          oneLiner: {
            zh: "浸入液体的物体受到向上托力，大小等于它排开液体所受的重力。",
            en: "A body in fluid is lifted by a force equal to the weight of fluid it displaces.",
          },
          detail: {
            zh: "F浮=ρ液gV排；浮沉条件比较浮力与重力（或密度）：轮船、潜水艇、气球与密度计都靠调控浮力。",
            en: "F_buoy=ρ_fluid·g·V_displaced; float/sink compares buoyancy to weight (or density). Ships, submarines, balloons and hydrometers tune buoyancy.",
          },
          eq: { lhs: "F浮", rhs: "ρ液 g V排", rel: "equal" },
          tags: [{ zh: "流体", en: "Fluids" }],
        },
        {
          id: "bernoulli",
          icon: "✈️",
          term: { zh: "流体压强与流速", en: "Fluid Speed & Pressure" },
          level: 3,
          oneLiner: {
            zh: "流体流速大的地方压强小，产生升力与吸附现象。",
            en: "Faster flow means lower pressure, producing lift and suction.",
          },
          detail: {
            zh: "机翼上凸下平使上方流速大、压强小而产生升力；两船并行相吸、火车站安全线都源于此。",
            en: "A wing's curved top speeds flow and lowers pressure, giving lift; parallel ships attract and platform safety lines stem from this.",
          },
          tags: [{ zh: "流体", en: "Fluids" }],
        },
        {
          id: "surface-tension",
          icon: "💧",
          term: { zh: "表面张力", en: "Surface Tension" },
          level: 2,
          oneLiner: {
            zh: "液体表面像一层绷紧的薄膜，使液滴收成球形、让轻小物体浮于水面。",
            en: "A liquid's surface acts like a stretched skin, beading drops and holding light objects afloat.",
          },
          detail: {
            zh: "表面层分子被内部拉扯而收缩，宏观表现为沿表面作用的张力；水黾停于水面、缝针可浮、肥皂减弱表面张力得以去污，皆源于此。",
            en: "Surface molecules are pulled inward so the layer contracts, seen as tension along the surface; water striders, a floating needle and soap's cleaning all follow from it.",
          },
          tags: [{ zh: "流体", en: "Fluids" }],
        },
        {
          id: "capillary-action",
          icon: "🌱",
          term: { zh: "毛细现象", en: "Capillary Action" },
          level: 2,
          oneLiner: {
            zh: "细管中的液面会自动升高或下降，管越细现象越明显。",
            en: "Liquid climbs or falls in narrow tubes, and the thinner the tube the stronger the effect.",
          },
          detail: {
            zh: "当附着层分子引力大于液体内聚力，液体便润湿管壁并沿细管上升；植物体内输水、纸巾吸墨、砖石吸潮都是毛细作用。",
            en: "Where adhesion beats cohesion a wetting liquid rises in a thin tube; water transport in plants, blotting ink and damp masonry all run on capillarity.",
          },
          tags: [{ zh: "流体", en: "Fluids" }],
        },
        {
          id: "viscosity",
          icon: "🍯",
          term: { zh: "流体的黏性", en: "Viscosity" },
          level: 2,
          oneLiner: {
            zh: "流体内部阻碍各层相对滑动的「内摩擦」，蜂蜜比水黏得多。",
            en: "Internal friction resisting layers sliding past one another; honey is far more viscous than water.",
          },
          detail: {
            zh: "黏度越大流动越慢、阻力越大；机油随温度变稠或变稀会改变润滑效果，血液与岩浆的流动同样由黏性主宰。",
            en: "Higher viscosity means slower flow and more drag; engine oil thickening or thinning with temperature changes its lubrication, while blood and magma flow are governed by viscosity.",
          },
          tags: [{ zh: "流体", en: "Fluids" }],
        },
        {
          id: "continuity-equation",
          icon: "🚰",
          term: { zh: "流量与连续性", en: "Flow Rate & Continuity" },
          level: 3,
          oneLiner: {
            zh: "稳定流动中，同一流体通过任一截面的流量相等，管细处流速必大。",
            en: "In steady flow the same fluid carries equal volume rate through every cross-section, so narrower parts run faster.",
          },
          detail: {
            zh: "截面积与流速成反比：捏住水管出口水柱喷得更快，河流在狭窄处水急、开阔处水缓。这正是连续性方程的体现。",
            en: "Area and speed trade inversely: pinching a hose outlet speeds the jet, and rivers run fast in narrows and slow in open reaches—the continuity equation at work.",
          },
          eq: { lhs: "S1v1", rhs: "S2v2", rel: "equal" },
          tags: [{ zh: "流体", en: "Fluids" }],
        },
      ],
    },
    /* ===================== 物理方法与单位制 ===================== */
    {
      key: "methods",
      icon: "📐",
      title: { zh: "物理方法与单位制", en: "Methods & Units" },
      items: [
        {
          id: "si-units",
          icon: "📏",
          term: { zh: "国际单位制", en: "SI Units" },
          level: 1,
          oneLiner: {
            zh: "以米、千克、秒等七个基本单位为基础的统一计量体系。",
            en: "A unified system built on seven base units including metre, kilogram and second.",
          },
          detail: {
            zh: "力学三大基本量：长度 m、质量 kg、时间 s；导出单位如牛顿 N=kg·m/s²、焦耳 J=N·m、瓦特 W=J/s。",
            en: "Mechanics bases: length m, mass kg, time s; derived units like newton N=kg·m/s², joule J=N·m, watt W=J/s.",
          },
          tags: [{ zh: "方法", en: "Method" }],
        },
        {
          id: "dimensional",
          icon: "🧩",
          term: { zh: "量纲分析", en: "Dimensional Analysis" },
          level: 2,
          oneLiner: {
            zh: "用基本量的幂次组合检验公式、推导关系并换算单位。",
            en: "Use powers of base quantities to check formulas, derive relations and convert units.",
          },
          detail: {
            zh: "等式两边量纲必须一致，可快速判断公式是否可能有误；也可猜测量间的比例关系（如单摆周期对 L、g 的依赖）。",
            en: "Both sides of an equation must share dimensions — a quick validity check — and can suggest proportional forms (e.g. a pendulum's dependence on L and g).",
          },
          tags: [{ zh: "方法", en: "Method" }],
        },
        {
          id: "model-ideal",
          icon: "🎯",
          term: { zh: "理想模型", en: "Idealized Models" },
          level: 2,
          oneLiner: {
            zh: "抓住主要因素、忽略次要因素建立的简化对象，是物理学的基本方法。",
            en: "Simplifications keeping dominant factors and ignoring minor ones — a core physics method.",
          },
          detail: {
            zh: "质点、点电荷、光滑面、理想气体、电阻等都是理想模型；实际物体能否近似取决于问题尺度与精度要求。",
            en: "Point mass, point charge, frictionless surface, ideal gas, pure resistor — applicability depends on scale and required precision.",
          },
          tags: [{ zh: "方法", en: "Method" }],
        },
        {
          id: "error-measure",
          icon: "📊",
          term: { zh: "误差与有效数字", en: "Error & Significant Figures" },
          level: 2,
          oneLiner: {
            zh: "测量值与真值之差叫误差，分系统误差与偶然误差，需如实记录有效数字。",
            en: "Difference from the true value; systematic and random types, recorded with significant figures.",
          },
          detail: {
            zh: "系统误差可通过校准仪器、改进方法减小；偶然误差用多次测量取平均减小；有效数字末位为估读位。",
            en: "Calibration reduces systematic error; averaging reduces random error; the last significant digit is estimated.",
          },
          tags: [{ zh: "方法", en: "Method" }],
        },
        {
          id: "control-variables",
          icon: "🧪",
          term: { zh: "控制变量法", en: "Control of Variables" },
          level: 1,
          oneLiner: {
            zh: "多因素问题里只让一个量变、其余保持不变，再逐个排查因果关系。",
            en: "Vary one factor while holding the rest fixed, then test each cause in turn.",
          },
          detail: {
            zh: "探究加速度与力、质量的关系是教科书范例：先保持小车质量不变找 a 与 F 的正比，再保持拉力不变找 a 与 m 的反比，最后合成一条规律。它也是判定实验有没有可比性的尺度——只说“变大变小”而不说明其余条件相同，结论便不能成立。同一思路支撑大量入门实验：电阻与材料、长度、横截面面积的关系，蒸发快慢与温度、表面积、气流的关系。与理想模型分工：那条把对象简化，本条把原因分离。",
            en: "The classic case is finding how acceleration depends on force and mass: keep the cart's mass fixed to show acceleration proportional to force, keep the force fixed to show it inversely proportional to mass, then merge the two. It is also the yardstick for whether a comparison is fair—saying “it got bigger” without holding everything else equal proves nothing. The same logic underpins most introductory experiments, from how resistance depends on material, length and cross-section to how fast water evaporates with temperature, surface area and airflow. Where idealized models simplify the object, this method separates the causes.",
          },
          tags: [{ zh: "方法", en: "Method" }],
        },
        {
          id: "limit-method",
          icon: "⏳",
          term: { zh: "极限法与微元思想", en: "Limits & Infinitesimal Elements" },
          level: 3,
          oneLiner: {
            zh: "用时间趋于零的比值定义瞬时量，把曲线过程切成无限小段再累加。",
            en: "Define instantaneous ratios as the interval shrinks to zero, then chop a curved process into tiny pieces.",
          },
          detail: {
            zh: "平均速度 Δx/Δt 在 Δt 足够小之后的极限就是瞬时速度，v–t 图上某点切线的斜率就是该时刻的加速度——极限法把“变速”定住为“某一时刻的不变”。反向使用就是微元法：求匀变速位移时把过程分成许多小段、每段当匀速处理，段数越多小矩形越贴近 v–t 图下的面积，这就是积分思想的物理入口。伽利略的外推法补上第三环：斜面倾角推到 90 度即自由落体、推到水平即得惯性定律（见「伽利略斜面实验」条）。",
            en: "Instantaneous velocity is the limit of Δx/Δt as the interval shrinks, and the tangent's slope on a v–t graph is the acceleration at that instant—the limit method pins a changing motion to a definite value. Used in reverse it is the element method: to get the displacement of an accelerating motion, split it into many short stretches, treat each as uniform, and as the strips multiply the rectangles fill the area under the v–t curve, which is the physical gateway to integration. Galileo's extrapolation adds the third move—tilting the incline to vertical gives free fall, levelling it to horizontal gives inertia (see the Galileo incline entry).",
          },
          tags: [{ zh: "方法", en: "Method" }],
        },
        {
          id: "amplify-convert",
          icon: "🔍",
          term: { zh: "微小量放大与转换法", en: "Amplification & Conversion" },
          level: 2,
          oneLiner: {
            zh: "把看不见的、测不出的小量放大成可读的量，或转换成好测的量。",
            en: "Magnify what is too small to read, or convert it into something measurable.",
          },
          detail: {
            zh: "放大分两条路：几何放大，如卡文迪许用镜尺把丝线扭转的极小角度反射成光斑的长距离移动；累积放大则先测批量再平分——测一张纸厚可量 100 张，测一个周期可计 30 次全振动。转换法负责看不见的主角：磁场靠小磁针偏转显示，温度靠液柱高度显示，桌面微形变靠光斑位移显示，声音强弱靠示波器波形显示。两者常联手——「著名实验」里的卡文迪许扭秤条是实例，本条讲的是方法本身。",
            en: "Amplification has two roads. Geometric: Cavendish turned a barely perceptible fibre twist into a long light-spot travel with a mirror and scale. Cumulative: measure a hundred sheets together for one page's thickness, or thirty full swings for one period. Conversion handles the invisible cast: a magnetic field betrays itself through a compass needle, temperature through a liquid column, a table's faint sag through a shifting light spot, sound through an oscilloscope trace. The two often work as a pair—the Cavendish entry under Famous Experiments is the case study, this entry is the method itself.",
          },
          tags: [{ zh: "方法", en: "Method" }],
        },
        {
          id: "graph-method",
          icon: "📉",
          term: { zh: "图象法与函数思想", en: "Graphs & Functional Thinking" },
          level: 2,
          oneLiner: {
            zh: "用图线代替公式表达关系：斜率与面积往往就是物理量本身。",
            en: "Let a curve replace a formula: slopes and areas often are physical quantities themselves.",
          },
          detail: {
            zh: "读图三步：先看清轴名与单位，再读截距与斜率，最后算图线与轴围的面积。x–t 图斜率是速度、v–t 图斜率是加速度、v–t 图下面积是位移；F–x 图下面积是功，U–I 图斜率是电阻。非线性猜想靠“变直”检验：画 a 与 1/m 的关系而不是 a 与 m，画 1/I 与 R 而不是 I 与 R——只有成直线才支持比例成立，而截距还能暴露内阻等隐藏量。与「波动图象与振动图象」一条分工：那条专讲波的两类图，本条是通用的图象—函数转化。",
            en: "Read a graph in three passes: check the axis names and units, take intercept and slope, then compute the area between curve and axis. Slope is velocity on an x–t graph and acceleration on a v–t graph, whose area is displacement; area under F–x is work, and the slope of U–I is resistance. Suspected non-linear laws are tested by straightening—plot a against 1/m rather than m, or 1/I against R; only a straight line backs the proportionality, and its intercept can expose hidden quantities such as internal resistance. Where the waveform-graphs entry covers the two wave plots, this is the general translation between picture and formula.",
          },
          tags: [{ zh: "方法", en: "Method" }],
        },
        {
          id: "equivalent-method",
          icon: "🔄",
          term: { zh: "等效替代法", en: "Equivalent Substitution" },
          level: 2,
          oneLiner: {
            zh: "用一个简单对象完全顶替复杂对象，效果相同即允许替换。",
            en: "Let one simple object stand fully in for a complex one—equal effect licenses the swap.",
          },
          detail: {
            zh: "合力与分力、串并联网络的总电阻、交流电的有效值（热效应与直流相等的数值）都属等效替代：替换的是效果而非本质，所以适用条件必须写清——等效电阻只在同一段电路、同一电流条件下成立。它也是测量术的骨架：曹冲称象用石头顶替大象的排水效果；替代法测电阻把未知电阻换成可读的电阻箱、保持电流不变即可读数。与理想模型分工：那条做减法（忽略次要因素），本条做替换（换成等价对象）。",
            en: "A resultant force replacing two pulls, one resistor replacing a network, and the RMS current whose heating equals that of a direct current are all equivalent substitution: what is traded is the effect, not the essence, so the conditions must be stated—an equivalent resistance holds only for that branch under that current. The method is also the skeleton of measurement—Chao Chong weighed an elephant by swapping in stones that displaced the same water, and the substitution technique finds an unknown resistance by replacing it with a readable box while holding the current fixed. Where idealized models subtract minor factors, equivalent substitution swaps the object for an equal-effect stand-in.",
          },
          tags: [{ zh: "方法", en: "Method" }],
        },
        {
          id: "order-of-magnitude",
          icon: "🧮",
          term: { zh: "数量级估算", en: "Order-of-Magnitude Estimation" },
          level: 2,
          oneLiner: {
            zh: "只留一两位有效数字连着乘，答案只问落在 10 的哪一次方。",
            en: "Multiply factors kept to one or two digits and ask only which power of ten the answer lands on.",
          },
          detail: {
            zh: "把没法直接测的问题拆成几个“能记住的数”：每个因子只留一两位有效数字再连乘。费米课堂上问“芝加哥有多少钢琴调音师”，靠的是城市人口、有琴家庭比例、一架琴几年调一次这类可查可猜的锚点；1945 年三位一体核试验，他撕几张纸片随手抛出、看冲击波把它们吹开多远，估出约一万吨 TNT，与后来测得的约两万吨同属一个数量级。随身锚点得事先备好：人约 60 kg、教室约 200 m³、分子直径约 10⁻¹⁰ m、一年约 3×10⁷ s。算完要回头找最不确定那个因子，把它上下浮动一个数量级，看结论是否仍然站得住。与误差与有效数字分工：那条讲有测得值时怎么报精度，本条讲没得测时怎么框范围；与量纲分析分工：那条管单位自洽，本条管数值大小。估算的产物是数量级而非数值——差十倍即算不同级，只够用来判断量对不对、值不值得去测。",
            en: "Break a question you cannot measure into numbers you can actually remember, keep one or two significant digits per factor, then multiply. Fermi's classroom query—how many piano tuners are in Chicago—runs on city population, the share of households with a piano, and how often one gets tuned; at the 1945 Trinity test he tore up paper and tossed it to see how far the blast carried the scraps, estimating about ten kilotons of TNT, the same order as the twenty or so measured later. Carry anchors in advance: a person about 60 kg, a classroom about 200 m³, a molecule about 10⁻¹⁰ m across, a year about 3×10⁷ s. Afterwards find the loosest factor, slide it a decade up and down, and check whether the conclusion still stands. Where the errors-and-significant-figures entry reports the precision of measured values, this one bounds the unmeasured; where dimensional analysis keeps units honest, this keeps magnitudes honest. An estimate yields an order of magnitude, not a number—a factor of ten is already a different level, so it settles whether a quantity is plausible and worth measuring.",
          },
          tags: [{ zh: "方法", en: "Method" }],
        },
      ],
    },
    /* ===================== 物理与现代技术 ===================== */
    {
      key: "tech",
      icon: "📡",
      title: { zh: "物理与现代技术", en: "Physics & Modern Technology" },
      items: [
        {
          id: "semiconductor",
          icon: "💾",
          term: { zh: "半导体与芯片", en: "Semiconductors & Chips" },
          level: 3,
          oneLiner: {
            zh: "导电性介于导体与绝缘体之间，掺入杂质可精确调控，是晶体管的基石。",
            en: "Conductivity between conductor and insulator, tunable by doping — the basis of transistors.",
          },
          detail: {
            zh: "PN 结具有单向导电性，是二极管、晶体管、集成电路的基础；硅晶片上数十亿晶体管构成现代计算机与手机的核心。",
            en: "A PN junction conducts one way, forming diodes, transistors and ICs; billions of transistors on silicon wafers power computers and phones.",
          },
          tags: [{ zh: "应用", en: "Application" }],
        },
        {
          id: "superconductor",
          icon: "🧲",
          term: { zh: "超导现象", en: "Superconductivity" },
          level: 3,
          oneLiner: {
            zh: "某些材料降到临界温度以下电阻突降为零并完全抗磁。",
            en: "Below a critical temperature some materials drop to zero resistance and expel magnetic fields.",
          },
          detail: {
            zh: "零电阻可实现无损耗输电、强磁体（磁悬浮、MRI）；迈斯纳效应体现完全抗磁性；高温超导仍在攻关。",
            en: "Zero resistance enables lossless power and strong magnets (maglev, MRI); the Meissner effect shows full diamagnetism; high-Tc remains a goal.",
          },
          tags: [{ zh: "应用", en: "Application" }],
        },
        {
          id: "laser",
          icon: "🔦",
          term: { zh: "激光", en: "Laser" },
          level: 3,
          oneLiner: {
            zh: "受激辐射放大产生方向性好、单色度高、亮度极强的人造光。",
            en: "Light amplified by stimulated emission — highly directional, monochromatic and intense.",
          },
          detail: {
            zh: "激光用于光纤通信、精密切割、激光雷达、眼科手术与条码扫描；其相干性与高亮度源于受激辐射。",
            en: "Used in fiber optics, cutting, LIDAR, eye surgery and scanning; coherence and brightness come from stimulated emission.",
          },
          tags: [{ zh: "应用", en: "Application" }],
        },
        {
          id: "nuclear-energy",
          icon: "☢️",
          term: { zh: "核能的利用", en: "Nuclear Energy" },
          level: 3,
          oneLiner: {
            zh: "核裂变与核聚变释放巨大能量，是重要的高效能源。",
            en: "Fission and fusion release vast energy — potent power sources.",
          },
          detail: {
            zh: "核电站用可控裂变链式反应发电；太阳与氢弹靠聚变；可控聚变（“人造太阳”）因清洁、原料丰富而被寄予厚望。",
            en: "Reactors run controlled fission; the Sun and bombs use fusion; controlled fusion (artificial suns) is prized for clean, abundant fuel.",
          },
          tags: [{ zh: "应用", en: "Application" }],
        },
        {
          id: "em-spectrum-tech",
          icon: "📶",
          term: { zh: "电磁波谱与应用", en: "Electromagnetic Spectrum" },
          level: 2,
          oneLiner: {
            zh: "无线电波到射线构成电磁波谱，不同波段各有应用。",
            en: "From radio to gamma rays, each band has its uses.",
          },
          detail: {
            zh: "无线电用于通信广播，微波用于雷达与加热，红外线遥感与热成像，可见光是视觉，紫外线杀菌，X 射线成像，γ 射线治疗与探伤。",
            en: "Radio for comms, microwaves for radar/heating, infrared for remote sensing, visible for sight, UV for sterilizing, X-rays for imaging, gamma for therapy/inspection.",
          },
          tags: [{ zh: "应用", en: "Application" }],
        },
        {
          id: "fiber-optics",
          icon: "🔦",
          term: { zh: "光纤通信", en: "Fiber-Optic Communication" },
          level: 2,
          oneLiner: {
            zh: "让光在玻璃纤维中全反射长途奔流，承载现代互联网的信息洪流。",
            en: "Light races by total internal reflection through glass fibers, carrying the flood of modern internet data.",
          },
          detail: {
            zh: "利用光的全反射把信号锁在纤芯内几乎无损地传输，一条光纤可同时传送海量通话与网络数据，构成全球通信的骨干。",
            en: "Total internal reflection traps the signal in the core with little loss; one fiber carries vast simultaneous voice and data traffic—the backbone of global communication.",
          },
          tags: [{ zh: "应用", en: "Application" }],
        },
        {
          id: "mri",
          icon: "🧲",
          term: { zh: "磁共振成像", en: "Magnetic Resonance Imaging" },
          level: 3,
          oneLiner: {
            zh: "用强磁场与无线电波让人体内的氢原子发出信号，绘制无损的软组织图像。",
            en: "Strong fields and radio waves make body hydrogen emit signals, painting soft-tissue images without radiation.",
          },
          detail: {
            zh: "氢核在磁场中按特定频率共振，撤去脉冲后回波被接收并重建为断层图像；因不含电离辐射，特别适合观察脑与关节等软组织。",
            en: "Hydrogen nuclei resonate at a set frequency in the field; after pulses their echoes are received and rebuilt into slices—free of ionizing radiation, ideal for brain and joints.",
          },
          tags: [{ zh: "应用", en: "Application" }],
        },
        {
          id: "particle-accelerator",
          icon: "⚛️",
          term: { zh: "粒子加速器", en: "Particle Accelerator" },
          level: 3,
          oneLiner: {
            zh: "用电磁场把微观粒子加速到近光速并对撞，揭示物质最深处的结构。",
            en: "Electric and magnetic fields drive particles near light speed and smash them, probing matter's innermost structure.",
          },
          detail: {
            zh: "大型强子对撞机等环形加速器将质子加速对撞，从碰撞碎片中寻找希格斯玻色子等粒子，是研究基本相互作用的前沿工具。",
            en: "Ring machines like the Large Hadron Collider speed protons into collisions, seeking particles such as the Higgs boson among the debris—a frontier tool for the fundamental forces.",
          },
          tags: [{ zh: "应用", en: "Application" }],
        },
        {
          id: "quantum-computing",
          icon: "💠",
          term: { zh: "量子计算", en: "Quantum Computing" },
          level: 3,
          oneLiner: {
            zh: "利用量子叠加与纠缠并行探索答案，在特定问题上远超经典计算机。",
            en: "Exploiting superposition and entanglement to explore answers in parallel, far outpacing classical machines on select problems.",
          },
          detail: {
            zh: "量子比特可同时处于零与一的叠加，多比特纠缠令状态空间指数膨胀，在因数分解、模拟分子等任务上潜力巨大，但离通用普及尚远。",
            en: "A qubit holds a blend of zero and one at once, and entangling many grows the state space exponentially—huge promise for factoring and simulating molecules, yet far from general use.",
          },
          tags: [{ zh: "应用", en: "Application" }],
        },
      ],
    },
    /* ===================== 关键常数 ===================== */
    {
      key: "constants",
      icon: "🔢",
      title: { zh: "关键常数", en: "Key Constants" },
      items: [
        {
          id: "c",
          icon: "💡",
          term: { zh: "光速", en: "Speed of Light" },
          level: 1,
          value: { zh: "≈ 3.00×10⁸ m/s", en: "≈ 3.00×10⁸ m/s" },
          oneLiner: {
            zh: "真空中的光速，相对论与电磁学的基石。",
            en: "Speed of light in vacuum; cornerstone of relativity and EM.",
          },
        },
        {
          id: "h",
          icon: "➿",
          term: { zh: "普朗克常数", en: "Planck Constant" },
          level: 3,
          value: { zh: "6.626×10⁻³⁴ J·s", en: "6.626×10⁻³⁴ J·s" },
          oneLiner: {
            zh: "量子化的尺度，E=hν。",
            en: "Scale of quantization, E=hν.",
          },
        },
        {
          id: "G",
          icon: "🪐",
          term: { zh: "引力常数", en: "Gravitational Constant" },
          level: 2,
          value: { zh: "6.674×10⁻¹¹ N·m²/kg²", en: "6.674×10⁻¹¹ N·m²/kg²" },
          oneLiner: {
            zh: "万有引力定律中的比例系数。",
            en: "Proportionality in Newton's gravitation.",
          },
        },
        {
          id: "e",
          icon: "⚡",
          term: { zh: "元电荷", en: "Elementary Charge" },
          level: 1,
          value: { zh: "1.602×10⁻¹⁹ C", en: "1.602×10⁻¹⁹ C" },
          oneLiner: {
            zh: "质子所带电量（电子电荷绝对值）。",
            en: "Charge of a proton (magnitude of an electron's).",
          },
        },
        {
          id: "k",
          icon: "🌡️",
          term: { zh: "玻尔兹曼常数", en: "Boltzmann Constant" },
          level: 2,
          value: { zh: "1.38×10⁻²³ J/K", en: "1.38×10⁻²³ J/K" },
          oneLiner: {
            zh: "连接温度与微观平均动能。",
            en: "Bridges temperature and microscopic kinetic energy.",
          },
        },
        {
          id: "Na",
          icon: "🧮",
          term: { zh: "阿伏伽德罗常数", en: "Avogadro's Number" },
          level: 1,
          value: { zh: "6.022×10²³ mol⁻¹", en: "6.022×10²³ mol⁻¹" },
          oneLiner: {
            zh: "1 摩尔物质含基本单元的个数。",
            en: "Entities per mole of substance.",
          },
        },
        {
          id: "eps0",
          icon: "🕸️",
          term: { zh: "真空介电常数", en: "Vacuum Permittivity" },
          level: 2,
          value: { zh: "8.854×10⁻¹² F/m", en: "8.854×10⁻¹² F/m" },
          oneLiner: {
            zh: "库仑定律中的比例系数 ε₀。",
            en: "The ε₀ in Coulomb's law.",
          },
        },
        {
          id: "me",
          icon: "🔘",
          term: { zh: "电子质量", en: "Electron Mass" },
          level: 2,
          value: { zh: "9.109×10⁻³¹ kg", en: "9.109×10⁻³¹ kg" },
          oneLiner: {
            zh: "基本粒子中最轻的稳定带电粒子质量。",
            en: "Mass of the lightest stable charged particle.",
          },
        },
        {
          id: "g",
          icon: "🍎",
          term: { zh: "重力加速度", en: "Free-Fall Acceleration" },
          level: 1,
          value: { zh: "≈ 9.8 N/kg（9.8 m/s²）", en: "≈ 9.8 N/kg (9.8 m/s²)" },
          oneLiner: {
            zh: "地面附近自由下落的加速度，粗略计算常取 10。",
            en: "Acceleration of free fall near the surface; often taken as 10.",
          },
        },
        {
          id: "ke",
          icon: "🔌",
          term: { zh: "静电力常量", en: "Coulomb Constant" },
          level: 2,
          value: { zh: "≈ 9.0×10⁹ N·m²/C²", en: "≈ 9.0×10⁹ N·m²/C²" },
          oneLiner: {
            zh: "库仑定律的比例系数 k=1/(4πε₀)，与 ε₀ 只记一个。",
            en: "Coulomb's k = 1/(4πε₀); memorize it or ε₀, not both.",
          },
        },
        {
          id: "mu0",
          icon: "🧲",
          term: { zh: "真空磁导率", en: "Vacuum Permeability" },
          level: 3,
          value: { zh: "≈ 4π×10⁻⁷ N/A²", en: "≈ 4π×10⁻⁷ N/A²" },
          oneLiner: {
            zh: "与 ε₀ 联手定出光速 c=1/√(μ₀ε₀)。",
            en: "With ε₀ it fixes c = 1/√(μ₀ε₀).",
          },
        },
        {
          id: "R",
          icon: "🎈",
          term: { zh: "摩尔气体常量", en: "Molar Gas Constant" },
          level: 2,
          value: { zh: "8.314 J/(mol·K)", en: "8.314 J/(mol·K)" },
          oneLiner: {
            zh: "等于阿伏伽德罗常数乘玻尔兹曼常数，是 k 的摩尔版。",
            en: "R = N_A × k_B, the mole-scale twin of Boltzmann's k.",
          },
        },
      ],
    },
    /* ===================== 著名实验 ===================== */
    {
      key: "experiments",
      icon: "🔬",
      title: { zh: "著名实验", en: "Landmark Experiments" },
      items: [
        {
          id: "double-slit",
          icon: "🌗",
          term: { zh: "杨氏双缝实验", en: "Young's Double-Slit" },
          level: 2,
          oneLiner: {
            zh: "光过双缝形成干涉条纹，证明光的波动性。",
            en: "Light through two slits makes interference fringes, proving waves.",
          },
          detail: {
            zh: "1801 年托马斯·杨让光先过一条窄缝、再落到紧邻的两条窄缝上，屏幕上出现明暗相间的条纹。两条缝相当于两个相干光源：波峰与波峰相遇处变亮、波峰与波谷相遇处变暗，这就是干涉。条纹间距与光的波长成正比，用单色光反推可测出波长。这一结果为光的波动说提供了决定性证据，压过了当时占主流的牛顿微粒说。更奇妙的是，即便把光弱到一次只发射一个光子、让它在屏上逐点累积，时间一长干涉条纹依然浮现——单个光子仿佛同时穿过了两条缝与自己干涉，于是杨氏双缝成了量子力学「波粒二象性」最经典的演示。",
            en: "In 1801 Thomas Young let light pass first through one narrow slit and then through two closely spaced slits, producing alternating bright and dark fringes on a screen. The two slits act as coherent sources: crest meeting crest gives a bright band, crest meeting trough a dark one - interference. The fringe spacing scales with the wavelength, so monochromatic light can be used to measure it. The result was decisive evidence for the wave theory of light, against the then-dominant Newtonian particle view. Strangest of all, even when the light is dimmed to emit one photon at a time so that dots build up slowly on the screen, the interference pattern still emerges - each photon seemingly passes both slits and interferes with itself, which is why the double slit became the signature demonstration of wave-particle duality in quantum mechanics.",
          },
        },
        {
          id: "michelson-morley",
          icon: "📏",
          term: { zh: "迈克尔逊-莫雷实验", en: "Michelson–Morley" },
          level: 3,
          oneLiner: {
            zh: "探测「以太风」得零结果，为相对论扫清障碍。",
            en: "Sought the aether wind but found none, clearing the way for relativity.",
          },
          detail: {
            zh: "19 世纪物理学家假设光波需要一种充满宇宙的介质「以太」，地球在其间穿行应产生「以太风」。1887 年迈克尔逊与莫雷用干涉仪把一束光分成互相垂直的两路、反射回来再合拢：若真有以太风，顺风和逆风两路的光程会不同，转动仪器时干涉条纹应当移动。可是不管何时、朝哪个方向重复，条纹几乎纹丝不动——「零结果」。这个被称为「历史上最著名的失败实验」，直接否定了静止的以太，动摇了绝对时空的观念，为 1905 年爱因斯坦狭义相对论把光速不变当作基本假设扫清了道路。",
            en: "Nineteenth-century physicists assumed light waves needed a medium filling the universe, the 'aether', through which Earth moved as an 'aether wind'. In 1887 Michelson and Morley used an interferometer to split a beam into two perpendicular arms, reflect them back and recombine: with a real aether wind the two paths would gain a light-time difference, so rotating the instrument should shift the interference fringes. Yet no matter when or in which direction they repeated it, the fringes barely moved - a 'null result'. Called the most famous failed experiment in history, it ruled out a stationary aether, shook the idea of absolute space and time, and cleared the road for Einstein to take the constancy of light speed as a postulate of special relativity in 1905.",
          },
        },
        {
          id: "millikan",
          icon: "💧",
          term: { zh: "密立根油滴实验", en: "Millikan Oil-Drop" },
          level: 3,
          oneLiner: {
            zh: "悬浮带电油滴测出元电荷，证实电荷量子化。",
            en: "Measured the elementary charge, confirming quantization.",
          },
          detail: {
            zh: "1909 至 1913 年密立根让极小的带电油滴在两块水平平行极板间下落。不加电场时油滴受重力与空气阻力（斯托克斯定律）很快达收尾速度；加上电场则可把油滴悬停或令其匀速升降。由力的平衡算出每颗油滴所带的电量，他惊讶地发现所有读数都是同一个最小值的整数倍。这个最小值就是元电荷，e 约为 1.60×10⁻¹⁹ 库仑，第一次以干净直接的方式证明电荷不是连续的，而是一份一份量子化的，并测准了基本电荷的数值。",
            en: "Between 1909 and 1913 Millikan watched tiny charged oil droplets fall between two horizontal parallel plates. With no field a droplet feels gravity and air drag (Stokes' law) and quickly reaches a terminal speed; with a field it can be held still or made to rise at a steady rate. From the force balance he computed the charge on each droplet and found, strikingly, that every reading was a whole-number multiple of one smallest value. That value is the elementary charge, e about 1.60x10^-19 coulomb - the first clean, direct proof that charge is not continuous but quantized in packets, and a precise measurement of the basic unit.",
          },
        },
        {
          id: "rutherford",
          icon: "⚛️",
          term: { zh: "卢瑟福金箔实验", en: "Rutherford Gold-Foil" },
          level: 2,
          oneLiner: {
            zh: "α 粒子大角度散射，提出原子核式模型。",
            en: "Large-angle α scattering led to the nuclear model.",
          },
          detail: {
            zh: "1909 年盖革与马斯登在卢瑟福指导下用 α 粒子轰击极薄的金箔，靠四周的荧光屏观测散射。按当时汤姆孙的「葡萄干布丁」模型，正电荷均匀铺满整颗原子，α 粒子应当几乎一路直穿、只极小角度偏折。结果却令人震惊：绝大多数确实径直穿过，说明原子内部非常空旷；但有极少数被大角度弹开，甚至超过 90° 原路返回。卢瑟福说这「就像用十五英寸炮弹轰一张纸巾，炮弹却被弹了回来」。1911 年他据此提出核式模型：原子的几乎全部质量和全部正电荷集中在一个直径仅约原子万分之一的小核里，电子在核外广阔空间运动——原子行星模型由此诞生。",
            en: "In 1909 Geiger and Marsden, under Rutherford, bombarded a very thin gold foil with alpha particles and watched the scattering on a ring of fluorescent screens. On Thomson's then-current 'plum pudding' model, where positive charge is smeared through the atom, an alpha particle should pass almost straight through with only tiny deflections. The result was astonishing: most indeed went through, showing the atom is mostly empty, but a very few were hurled through large angles, some past 90 degrees, straight back. Rutherford said it was 'as if you fired a fifteen-inch shell at a piece of tissue paper and it came back and hit you'. In 1911 he proposed the nuclear model: nearly all the mass and all the positive charge sit in a nucleus about ten-thousandths the size of the atom, with electrons in the vast space around it - the birth of the planetary atom.",
          },
        },
        {
          id: "cavendish",
          icon: "⚖️",
          term: { zh: "卡文迪许扭秤", en: "Cavendish Experiment" },
          level: 2,
          oneLiner: {
            zh: "首次测出引力常数 G，并估算地球质量。",
            en: "First measured G and estimated Earth's mass.",
          },
          detail: {
            zh: "1797 至 1798 年卡文迪许设计了一台极灵敏的扭秤：一根水平杆两端各固定一个小铅球，用一根石英丝悬挂，杆旁放两个可移动的大铅球。大球与小球间的万有引力十分微弱，只把杆扭动一点点，他靠悬丝上小镜把光点反射到刻度尺上，把这一微小转角放大读出，从而测出引力的大小。由此他算出地球的平均密度约为水的 5.5 倍，相当于「称出了地球」；后人再从他的数据换算出万有引力常数 G 约 6.67×10⁻¹¹ 牛·平方米每千克平方。这种用扭秤放大微小力的思想后来被库仑测量静电力直接继承。",
            en: "In 1797-1798 Cavendish built a strikingly sensitive torsion balance: a horizontal rod carrying a small lead ball at each end hung from a quartz fibre, with two large movable lead balls set beside it. The gravitational pull between the large and small balls is feeble and twists the rod only a fraction of a degree, but a small mirror on the fibre reflected a light spot onto a scale, magnifying that angle so it could be read, giving the strength of gravity. From this he found Earth's mean density about 5.5 times that of water - in effect 'weighing the Earth' - and later scientists converted his data into the gravitational constant G, about 6.67x10^-11 newton metre-squared per kilogram squared. The idea of amplifying a tiny force with a torsion balance was inherited directly by Coulomb in his measurement of the electrostatic force.",
          },
        },
        {
          id: "photoelectric",
          icon: "🔆",
          term: { zh: "光电效应实验", en: "Photoelectric Effect" },
          level: 2,
          oneLiner: {
            zh: "光照射金属打出电子，爱因斯坦用量子解释，佐证光子说。",
            en: "Light ejects electrons; Einstein's quantum explanation supported photons.",
          },
          detail: {
            zh: "光照到金属表面会打出一层电子，称作光电子，最早由赫兹注意到。用经典波动说无法解释几条事实：能否打出电子只看光的频率有没有超过某个「截止频率」，与光的强弱无关；一旦超过阈值发射几乎瞬时发生；增大光强只会增多电子数目，而增大频率才会抬高每个电子的最大动能。1905 年爱因斯坦用光量子（光子）一举解释：光的能量按一份一份传播，每份 E = hν，一个光子把全部能量交给一个电子，扣除把电子挣脱金属所需的逸出功，剩下的就是最大动能。这不仅坐实了光的粒子性，也让爱因斯坦因此获得 1921 年诺贝尔物理学奖。",
            en: "Light falling on a metal knocks out a shower of electrons, called photoelectrons, a fact first noted by Hertz. Classical wave theory could not explain what experiments showed: whether electrons come off at all depends only on whether the light's frequency clears a certain 'threshold frequency', not on its intensity; once past threshold emission is nearly instant; more intensity only sends out more electrons, while higher frequency raises each electron's maximum kinetic energy. In 1905 Einstein explained it at a stroke with light quanta (photons): light energy travels in packets, each E = h*nu, a single photon hands its whole energy to one electron, and what is left after paying the work needed to escape the metal - the work function - becomes the maximum kinetic energy. This confirmed the particle side of light and earned Einstein the 1921 Nobel Prize in Physics.",
          },
        },
        {
          id: "galileo-incline",
          icon: "📐",
          term: { zh: "伽利略斜面实验", en: "Galileo's Inclined Plane" },
          level: 1,
          oneLiner: {
            zh: "用斜面「冲淡重力」研究匀加速运动，奠定实验物理。",
            en: "Diluted gravity with ramps to study uniform acceleration, founding experimental physics.",
          },
          detail: {
            zh: "自由落体下落太快，当时根本无从计时。伽利略于是让铜球沿阻力很小的斜面滚下，用「冲淡重力」的办法把运动放慢、便于测量；他用水钟计量时间，测出球滚过的路程与所用时间的平方成正比（s 正比于 t²），也就是说速度在均匀增加，是匀加速运动。他还发现同一倾角下加速度与球的重轻无关，并把倾角一路推到竖直，外推出自由落体服从同样规律。由斜面与另一组理想实验，他萌生了「若无阻力物体将永远运动下去」的惯性思想。把可控实验与几何推理结合，这正是近代科学方法的开端。",
            en: "Free fall is too fast to time with the tools of the day, so Galileo let a bronze ball roll down a low-friction inclined plane, 'diluting gravity' to slow the motion and make it measurable. With a water clock he found the distance rolled grew as the square of the time (s proportional to t-squared), meaning speed increased evenly - uniform acceleration. He also showed that at a given slope the acceleration does not depend on the ball's weight, and by pushing the slope all the way to vertical he extrapolated that free fall obeys the same law. From the ramps and a companion thought experiment came his idea of inertia: without resistance a body keeps moving. Marrying controlled experiment to geometric reasoning is where the modern scientific method begins.",
          },
        },
        {
          id: "hertz",
          icon: "📡",
          term: { zh: "赫兹电磁波实验", en: "Hertz EM-Wave" },
          level: 2,
          oneLiner: {
            zh: "用振荡电路发射并接收电磁波，证实麦克斯韦预言。",
            en: "Generated and detected EM waves, confirming Maxwell.",
          },
          detail: {
            zh: "1860 年代麦克斯韦从他的方程组预言：变化的电场与磁场会彼此激发、以波的形式沿空间传播，速度恰等于光速，因此光本身就是电磁波。这只是一个数学预言，直到 1887 至 1888 年赫兹用实验把它坐实：他用感应线圈驱动一对带小间隙的铜环作发射器，在几米外放一个开口环作接收器，间隙间蹦出微小火花——电磁波真的被发射并被收到了。赫兹又测出它的波长与频率算得速度约等于光速，并演示了电磁波的反射、折射、偏振与驻波，全面证明它是一种横波、与光同类。这一实验开启了无线电通信的时代，尽管赫兹本人当时认为它「毫无用处」。",
            en: "In the 1860s Maxwell's equations predicted that changing electric and magnetic fields should sustain each other and travel through space as a wave moving at exactly the speed of light, so light itself is an electromagnetic wave. This was pure mathematics until Hertz made it experimental in 1887-1888: he drove a pair of copper loops with a small gap using an induction coil as a transmitter, and set an open loop several metres away as a receiver - a faint spark leapt the gap, so electromagnetic waves really were sent and caught. Hertz then measured their wavelength and frequency to get a speed close to that of light, and showed their reflection, refraction, polarisation and standing waves, proving in full that they are transverse waves of the same kind as light. The experiment opened the age of radio communication, though Hertz himself judged it 'of no use whatsoever'.",
          },
        },
        {
          id: "cathode-ray",
          icon: "📺",
          term: { zh: "阴极射线实验：电子的发现", en: "Cathode Rays and the Electron" },
          level: 2,
          oneLiner: {
            zh: "汤姆孙测出阴极射线的比荷，发现第一种亚原子粒子。",
            en: "Thomson measured the ray's charge-to-mass ratio and found the first subatomic particle.",
          },
          detail: {
            zh: "十九世纪末，真空管里从阴极射出的「阴极射线」究竟是波还是粒子，争论不休：赫兹让它穿过薄金窗仍能透出，据此支持波动说；克鲁克斯却发现电场与磁场都能把它打偏。1897 年汤姆孙在卡文迪许实验室用测量代替争论：同时加上电场与磁场，把两种偏折调成互相抵消，先定出射线的速度，再由纯磁场下的偏转半径算出比荷 e/m——约为氢离子荷质比的 1800 倍。无论换阴极金属还是管中气体，这个数值都不变，可见它是所有物质共有的组分，而不是某种原子的离子。电子由此成为第一个被发现的亚原子粒子，汤姆孙把它叫作「微粒」。他测到的是电荷与质量之比，电荷本身还要等密立根油滴实验量出，两值相除才得到电子质量。1906 年他因电子获诺贝尔物理学奖，显像管与电子显微镜都是这一测量的下游。",
            en: "In the 1890s physicists argued over whether the 'cathode ray' streaming from the cathode of an evacuated tube was a wave or a particle. Hertz let it pass a thin gold window and read that as evidence for waves; Crookes saw it bent by both electric and magnetic fields. In 1897 J.J. Thomson settled it at the Cavendish by measuring instead of arguing: he applied electric and magnetic fields together, balanced the two deflections to fix the speed, then used the pure-magnetic deflection radius to get the charge-to-mass ratio - about 1800 times that of the hydrogen ion. Swapping the cathode metal or the gas changed nothing, so this was an ingredient shared by all matter rather than an ion of some atom. The electron became the first subatomic particle ever found, and Thomson called it a 'corpuscle'. He measured a ratio: the charge itself had to wait for Millikan's oil drops, and dividing the two yields the electron mass. Thomson took the 1906 Nobel Prize, and cathode-ray tubes and electron microscopes are downstream of that one measurement.",
          },
        },
        {
          id: "frank-hertz",
          icon: "🪜",
          term: { zh: "弗兰克-赫兹实验", en: "Franck-Hertz Experiment" },
          level: 3,
          oneLiner: {
            zh: "电子撞汞原子，每 4.9 伏丢一次能量，能级当场现身。",
            en: "Electrons striking mercury lost energy in 4.9-volt steps, showing levels directly.",
          },
          detail: {
            zh: "玻尔 1913 年给原子安排了分立能级，可证据全来自光谱线，属于「事后反推」。1914 年弗兰克与赫兹在柏林改用电子直接撞原子：真空管充汞蒸气，电子被加速电压 U 推向栅极，越过栅极后还得克服一小段反向拒斥电压才能到达板极形成电流。按经典图像，电子撞气原子只会连续地一点点损失能量，电流该随 U 一路上扬。实测却在 U 到达 4.9 伏时骤然跌落，此后每隔 4.9 伏重复一次：电子只能整份交出 4.9 电子伏把汞原子送上第一激发态，攒不满这一份就撞不出能量损失，越过栅极的电子依旧能到板极。这是原子内部能量量子化的第一次直接证明，两人因此获 1925 年诺贝尔奖。同一装置换氢气，第一激发能是 10.2 电子伏（13.6 减 3.4）。要点在于「非弹性碰撞也有门槛」，而非电子被原子吞掉。",
            en: "Bohr gave atoms discrete levels in 1913, but the evidence came from spectral lines - reasoning after the fact. In 1914 Franck and Hertz in Berlin bombarded atoms with electrons instead: a tube filled with mercury vapour accelerated electrons toward a grid by a voltage U, and beyond the grid they still had to climb a small reverse retarding voltage to reach the plate and make a current. On the classical picture an electron rubbing past a gas atom would bleed energy continuously, so the current should simply keep rising with U. Instead it collapsed the moment U reached 4.9 volts, then collapsed again every 4.9 volts after that: an electron can only hand over a whole 4.9 electronvolts to lift a mercury atom to its first excited state, and short of that bundle there is no inelastic loss at all, so the electron still arrives. This was the first direct proof of quantised energy inside the atom and won them the 1925 Nobel Prize. Refilled with hydrogen, the same tube shows 10.2 electronvolts (13.6 minus 3.4). The lesson is that inelastic collisions have a threshold, not that atoms swallow electrons.",
          },
        },
        {
          id: "davisson-germer",
          icon: "🌀",
          term: { zh: "电子衍射实验", en: "Electron Diffraction" },
          level: 3,
          oneLiner: {
            zh: "镍晶体把电子束衍射出峰，物质波得到实测。",
            en: "A nickel crystal diffracted electrons into sharp peaks, confirming matter waves.",
          },
          detail: {
            zh: "德布罗意 1924 年猜想电子也该有波长 λ = h/p，可是没人测到过。1925 年戴维孙与革末在贝尔实验室用电子轰镍靶，一次空气漏进真空室、镍面氧化，他们高温退火补救，结果原先的多晶长成了几块大单晶——散射强度随角度出现尖锐的峰，和过去平滑的曲线完全不同。他们没有把这桩事故扫掉，而是当成结果来处理：1927 年用 54 电子伏的电子测出强度极大角，与布拉格条件 2d sinθ = λ、取镍晶面间距 0.091 纳米算出的 0.167 纳米严丝合缝；同年 G. P. 汤姆孙让电子穿过超薄金箔，拍到了衍射环。电子确实会衍射。最妙的一对是：父亲 J. J. 汤姆孙因证明电子是粒子获奖（1906），儿子 G. P. 汤姆孙因证明它是波获奖（1937），父子相隔三十一年各领一次诺贝尔物理学奖。宏观棒球的波长只有 10⁻³⁴ 米量级，波动性永远显不出来。",
            en: "De Broglie guessed in 1924 that electrons should carry a wavelength λ = h/p, but nobody had measured one. In 1925 Davisson and Germer at Bell Labs fired electrons at a nickel target; air leaked into the chamber, the surface oxidised, and their high-temperature anneal turned the polycrystal into a few large single crystals - and the scattering intensity suddenly grew sharp peaks against angle where the curve had been smooth. They treated the accident as a result: in 1927, with 54-electronvolt electrons, the peak angle agreed exactly with the Bragg condition 2d sinθ = λ using a nickel plane spacing of 0.091 nanometres, implying λ = 0.167 nanometres, and that same year G. P. Thomson shot electrons through ultrathin gold foil and photographed the diffraction rings. Electrons really do diffract. The loveliest pairing: the father J. J. Thomson was honoured for proving the electron is a particle (1906), the son G. P. Thomson for proving it is a wave (1937), the two honoured thirty-one years apart for opposite faces of the same particle. A baseball's wavelength is of order 10⁻³⁴ metres, so its wave nature never shows.",
          },
        },
        {
          id: "chadwick-neutron",
          icon: "🎱",
          term: { zh: "查德威克发现中子", en: "Chadwick's Neutron" },
          level: 2,
          oneLiner: {
            zh: "α 轰铍放出的中性粒子，撞出质子才露出真身。",
            en: "Beryllium's neutral emission betrayed itself by knocking protons loose.",
          },
          detail: {
            zh: "用 α 粒子轰击铍，会冒出一束穿透力极强的「辐射」。1930 年博特与贝克尔以为它是 γ 射线；1932 年约里奥-居里夫妇把它照向石蜡，打出的质子快得离谱，反推需要几千万电子伏的光子——能量账本已经对不上，他们仍按 γ 解释，与发现擦肩。查德威克重复实验并加测氢、氦、锂等反冲核，只换一个假设：来的是质量与质子相近、不带电的粒子。碰撞要同时守住动量与能量守恒，一个中性粒子撞飞质子毫不费力，γ 却得强到不合常理才做得到。他定出中子质量略大于质子（今值 1.0087 原子质量单位），沿用卢瑟福 1920 年设想的名称。原子核从此是质子与中子的组合，同位素有了说法；更要紧的是中子不带电、不受核的静电排斥，才成了撬开原子核的探针——费米随即用它轰出一串新核素，裂变也在 1938 年被叩开。自由中子本身并不稳定，约 880 秒就 β 衰变，1935 年查德威克因发现中子得诺贝尔物理学奖。",
            en: "Bombarding beryllium with alpha particles produced a strangely penetrating 'radiation'. Bothe and Becker read it as gamma rays in 1930; in 1932 the Joliot-Curies aimed it at paraffin and found the protons it knocked loose far too fast, implying photons of tens of millions of electronvolts - the energy ledger no longer balanced, yet they kept the gamma interpretation and missed the discovery. Chadwick repeated the experiment, added recoil measurements on hydrogen, helium and lithium, and changed just one assumption: the incoming particle weighs about as much as a proton and carries no charge. Since collisions must obey both momentum and energy, a neutral bullet flips a proton effortlessly while a gamma quantum would need an absurd energy to do the same. He fixed the neutron's mass as slightly above the proton's (today 1.0087 atomic mass units) and kept the name Rutherford had proposed in 1920. Nuclei were now protons plus neutrons, which finally explained isotopes; and because a neutron feels no electric repulsion from the nucleus, it became the probe that pried nuclei open - Fermi used it at once, and fission followed in 1938. A free neutron is unstable, beta-decaying in about 880 seconds, and Chadwick took the 1935 Nobel Prize for the discovery.",
          },
        },
        {
          id: "stern-gerlach",
          icon: "🔀",
          term: { zh: "斯特恩-革拉赫实验", en: "Stern-Gerlach Experiment" },
          level: 3,
          oneLiner: {
            zh: "银原子束在非均匀磁场里裂成两条，取向竟是量子化的。",
            en: "A silver beam split in two inside an inhomogeneous field, quantising orientation.",
          },
          detail: {
            zh: "1922 年在汉堡，斯特恩与革拉赫让一束银原子穿过非均匀磁场——磁极削成楔形，使场强沿束的方向变化，原子磁矩会被往侧面拧。按经典图像，磁矩取向是连续的，底片上该出现一条被拉宽的模糊带。洗出来却是清清楚楚的两条，中间留着一道空白：取向只能取两个分立值，这是空间量子化最干净的演示。更棘手的是银原子基态的轨道角动量为零，按当时的理论一束本不该分裂。直到 1925 年乌伦贝克与古兹密特提出电子自旋，自旋量子数 1/2 对应 2 × 1/2 + 1 = 2 条，分裂间距由玻尔磁子定住，结果才对上号。这套分子射线法后来支撑起光谱精细结构与塞曼反常的解释，也是磁共振与原子钟的远祖；斯特恩因它获 1943 年诺贝尔化学奖。还有一点常被忽略：选中了两个取向之一，其余取向的信息就被抹掉了——这是「测量扰动量子态」最早的实物样板。",
            en: "In Hamburg in 1922 Stern and Gerlach sent a beam of silver atoms through an inhomogeneous magnetic field - pole pieces ground into a wedge so the field strength varied across the beam and twisted each atomic magnet sideways. Classically the orientations are continuous, so the plate should record one smeared band. What developed was two clean lines with a gap between them: orientation takes only discrete values, the cleanest demonstration of space quantisation ever made. The awkward part is that silver's ground state carries zero orbital angular momentum, so on the theory of the day the beam should not have split at all. Not until 1925, when Uhlenbeck and Goudsmit proposed electron spin, did it add up - spin one-half gives 2 × 1/2 + 1 = 2 lines, with the spacing set by the Bohr magneton. The molecular-ray method behind it went on to support fine structure and the anomalous Zeeman effect and is an ancestor of magnetic resonance and atomic clocks; Stern received the 1943 Nobel Prize in Chemistry. One detail is often skipped: picking one of the two orientations erases the information in the others, making this the earliest hardware demonstration that measurement disturbs the quantum state.",
          },
        },
        {
          id: "mass-spectrograph",
          icon: "🧾",
          term: { zh: "阿斯顿质谱仪与同位素实测", en: "Aston's Mass Spectrograph" },
          level: 2,
          oneLiner: {
            zh: "磁场按质量把离子排成谱线，同位素从假设变成读数。",
            en: "A magnetic field lined ions up by mass, turning isotopes from hypothesis into readings.",
          },
          detail: {
            zh: "索迪 1913 年为化学性质相同、质量不同的原子造了「同位素」一词，把它称出质量的是质谱仪。原理是两段筛选：离子经加速电压 U 得到动能 qU = ½mv²，进入垂直磁场走圆周，半径 r = mv/(qB)；两式一消得 r = √(2mU/(qB²))——同一电荷下质量越大拐得越缓，落在底片不同位置，一条线就是一种核素，线的浓淡就是天然丰度。汤姆孙 1913 年在阳极射线里看到氖的双亮斑只是雏形，阿斯顿 1919 年起把它做成精密仪器，测出二百余种同位素：氖确有其二（²⁰Ne 与 ²²Ne），氯的两兄弟约 3 ∶ 1，于是「35.5」不再是谜，它只是加权平均。各核素质量还都紧贴整数（整数规则，1922 年诺贝尔化学奖），偏离的那一点正是把核子捆在一起的代价：氦-4 比两个质子加两个中子轻约 0.030 原子质量单位。同位素电子结构一样、化学性质几乎相同，分离只靠这点质量差，所以扩散与离心都得反复上百级；碳-14 测年、氧同位素判古温度与铀-235 提纯都出自这台仪器。",
            en: "Soddy coined 'isotope' in 1913 for atoms of identical chemistry but different mass; the instrument that weighed them was the mass spectrograph. Two selections do the work: an ion gains kinetic energy qU = ½mv² from an accelerating voltage, then circles a perpendicular field at radius r = mv/(qB), and eliminating v gives r = √(2mU/(qB²)) - at equal charge the heavier ion bends more lazily and lands elsewhere on the plate, so each line is one nuclide and its darkness is its natural abundance. Thomson's twin bright spots in canal rays (1913) were only a prototype; from 1919 Aston turned the idea into a precision instrument and identified over two hundred isotopes, confirming neon's two forms (²⁰Ne and ²²Ne) and chlorine's pair at roughly 3 to 1, which made '35.5' a plain weighted average. Nuclide masses also hug whole numbers - the packing rule that won the 1922 Nobel Prize in Chemistry - and the shortfall is precisely the price of binding nucleons together: helium-4 comes out about 0.030 atomic mass units lighter than two protons plus two neutrons. Since isotopes share an electron structure and thus nearly identical chemistry, separation exploits only this sliver of mass, which is why diffusion and centrifugation run through a hundred stages; carbon-14 dating, palaeotemperature from oxygen isotopes and uranium-235 purification all come from this one instrument.",
          },
        },
        {
          id: "cloud-chamber",
          icon: "☁️",
          term: { zh: "云室与正电子的发现", en: "Cloud Chamber & the Positron" },
          level: 3,
          oneLiner: {
            zh: "过饱和蒸气替粒子画出径迹，一条弯错方向的雾迹交出第一个反电子。",
            en: "Supersaturated vapor drew particle tracks, and one curling the wrong way handed physics its first positron.",
          },
          detail: {
            zh: "云室靠一口气工作。威尔逊在 1911 年前后做成这台装置：密闭容器里让酒精或水蒸气处于过饱和，缺了凝核就悬着不动；带电粒子穿过时沿途打出一串离子，液滴立刻在这些离子上凝结，一条雾迹替看不见的粒子画了像。加上磁场，雾迹弯成弧线——弯得急说明动量小，弯的朝向指出电荷正负，迹的浓淡还能反映快慢。1932 年安德森在宇宙线里挑出一条诡异的弧：偏转半径对应的质量与电子同量级，弯曲方向却属于正电。粒子穿过一块 0.6 厘米的铅板后能量变小、弧更急，据此判定它由下往上飞，正电荷不是假象——这是第一个反电子，他起初只叫它「带正电的电子」，1933 年起有了新名 positron。狄拉克 1928 年方程里那条多余的正能量支，1931 年被他自己解成反电子，说它与电子相遇会一同湮灭、放出辐射；从方程到那张照片隔了四年。1933 年布莱克特与奥基亚尼用盖革计数器触发的自动云室拍到成对诞生：一个 γ 光子在核附近整套消失，变成一正一负两条对称雾迹；湮灭则至少交回两个 0.511 MeV 的光子，因为单凭一个光子守不住能量与动量。此事还有先声——赵忠尧 1930 年测硬 γ 射线在铅里的吸收，发现散射辐射比理论强出约四分之一，正是电子对的信号，他当时没有解释，安德森在论文里点名引用了那篇工作。云室此后被格拉塞 1952 年的气泡室接班，威尔逊本人已因这台装置拿了 1927 年诺贝尔奖；要紧的是它第一次让单个基本粒子的径迹成了可以拍照的证据。",
            en: "A cloud chamber runs on a breath of vapor. Wilson built the first practical version around 1911: a sealed box holds alcohol or water vapor supersaturated, hanging there for want of nuclei to condense on. A charged particle plowing through leaves a line of ions along its path, droplets snap out at once, and a streak of fog draws a portrait of something nobody can see. In a magnetic field the streak curls - a tight curl means little momentum, the sense of the curl gives the sign of the charge, and the thickness of the fog hints at speed. In 1932 Anderson picked out a strange curl in the cosmic rays: its radius suited a mass no heavier than an electron, yet it bent the way positive charge bends. The particle had crossed a 0.6 cm lead plate and come out slower, its arc tighter on the far side, so it had traveled upward and the positive sign was no artifact - the first anti-electron, which he at first simply called a positive electron and which took the name positron in 1933. Dirac's 1928 equation had carried a leftover positive-energy branch; in 1931 he read it as an anti-electron that would annihilate with an ordinary electron in a burst of radiation, and four years passed between the equation and the photograph. In 1933 Blackett and Occhialini, triggering the chamber automatically with Geiger counters, photographed pairs being born: a gamma quantum vanishing near a nucleus into two symmetric tracks, while annihilation returned at least two 0.511 MeV photons because one photon alone cannot keep both energy and momentum. There had been a foretone: in 1930 Chao Chung-Yao measured the absorption of hard gamma rays in lead and found the scattered radiation some quarter stronger than theory allowed, which is the signature of pair creation; he did not interpret it, and Anderson cited that 1930 paper by name. Glaser's bubble chamber took over from 1952, and Wilson himself had already shared the 1927 Nobel Prize for the device; what mattered was that the track of a single elementary particle had become a photographable piece of evidence.",
          },
        },
        {
          id: "parity-violation",
          icon: "🪞",
          term: { zh: "吴健雄的宇称不守恒实验", en: "Wu's Parity Test" },
          level: 3,
          oneLiner: {
            zh: "把钴-60 冻到近乎绝对零度并排好自旋，β 电子飞得左右不均——镜像里的物理并不相同。",
            en: "Cooled cobalt-60 with aligned spins threw beta electrons unevenly - the physics in the mirror is not the same.",
          },
          detail: {
            zh: "宇称就是镜像对称：物理规律在镜子里是否照样成立。1956 年以前它被当作不言自明的守恒律，与能量、动量守恒同排写进规则表，原子光谱的跃迁选择定则与核能级的奇偶分类都靠它撑腰。裂缝出在两种介子上：τ 与 θ 的质量、电荷、寿命一模一样，τ 却衰变成两个 π、θ 衰变成三个，而两 π 的宇称为正、三 π 为负——若宇称守恒，它们必是两种粒子，可它们实在像到无从区分。李政道与杨振宁把已有实验从头翻了一遍，摸到一个关键事实：强作用与电磁作用里宇称确有检验，弱作用里一次都没测过。他们列出十来条可做的判据。吴健雄挑了钴-60。样品用绝热去磁冻到百分之几开尔文，低温设备由美国标准局的团队主持；加上强磁场把钴核自旋排向一边，再在自旋方向与其反方向各摆一台闪烁计数器数 β 电子。温度高、自旋混乱时两臂计数相同；一排序两臂立刻分开；把磁场翻转、自旋反向，不对称也跟着翻转——仪器偏见被排除在外，偏心来自自然本身。结果 1957 年初发表：核自旋指向某一边时，β 电子明显更朝自旋的反方向飞出，弱作用只偏爱一只手势，宇称不守恒。物理界震动，李、杨当年即获诺贝尔物理学奖，而做出决定性实验的吴健雄不在获奖名单上，她 1978 年领得首届沃尔夫物理奖。此后一年里中微子被确认只有左旋，β 衰变的耦合写成 V−A 形式；1964 年中性 K 介子又显示，连电荷共轭与宇称联合起来的 CP 也有一点点破缺。镜像两侧不全同，不是规律出了错，而是自然本就偏用一只手。",
            en: "Parity is mirror symmetry: whether the laws of physics hold the same way in a mirror. Before 1956 it was booked as a self-evident conservation law, written down next to energy and momentum, and the selection rules of atomic spectra plus the even-odd classification of nuclear levels leaned on it. The crack came from two mesons: tau and theta matched in mass, charge and lifetime, yet tau decayed into two pions and theta into three, and two pions carry positive parity while three carry negative - if parity were saved they had to be different particles, however indistinguishable they otherwise looked. Lee and Yang went through the existing experiments and found the decisive gap: parity had been tested in strong and electromagnetic processes but never once in a weak one, and they listed about a dozen ways to try. Wu chose cobalt-60. Her sample was chilled to a few hundredths of a kelvin by adiabatic demagnetization in a cryostat run by the team at the US National Bureau of Standards; a strong field lined the cobalt nuclear spins up on one side, and scintillation counters set along and against that direction counted the beta electrons. Warm and disoriented, the two arms agreed; align the spins and the counts split at once; reverse the field, reversing the spins, and the asymmetry flipped with it - instrumental bias was ruled out and the handedness belonged to nature. The result appeared in early 1957: with the nuclear spins pointing one way the beta electrons came out preferentially the other way, and parity is not conserved. Physics reeled; Lee and Yang took the Nobel Prize in Physics that same year while Wu, whose experiment settled it, was left off the certificate - she received the first Wolf Prize in Physics in 1978. Within a year neutrinos were confirmed to be left-handed only and the coupling of beta decay was written as V - A; in 1964 the neutral kaon showed that even CP, charge conjugation combined with parity, is slightly broken. A world that is not its own mirror image is not a law gone wrong - it is nature preferring one hand.",
          },
        },
        {
          id: "atomic-clock",
          icon: "⏱️",
          term: { zh: "原子钟与秒的定义", en: "Atomic Clocks & the Second" },
          level: 2,
          oneLiner: {
            zh: "铯原子的节拍接管了「一秒」，搬上客机环球飞行又量出了相对论的时间差。",
            en: "The cesium atom's beat took over the second, and flown around the world it measured relativity's time difference.",
          },
          detail: {
            zh: "钟的历史就是找更稳的周期。普通石英钟一天差一秒上下，天文时靠地球自转，而自转本身被潮汐摩擦与季节变化拽得忽快忽慢。1949 年莱昂斯的氨分子钟只是原理演示，1955 年埃森与帕里在英国国家物理实验室做出第一台可用的铯原子钟：铯-133 原子基态两个超精细能级之间的跃变只认一个微波频率，拿它锁住振荡器，钟就有了原子的节拍。1967 年国际计量大会把一秒定义为该频率走完 9,192,631,770 个周期，从此秒不再依赖地球；今天的铯喷泉钟约几亿年才差一秒，光钟的不确定度还低两个量级，重新定义秒已排上议程。原子钟同时也是相对论的探针。1971 年哈菲勒与基廷把四台铯束原子钟搬上民航客机，分别向东、向西绕地球一圈，落地后与美国海军天文台的基准钟比对。两项效应符号相反：飞得快让钟走慢，飞得高、所在处引力势更高又让钟走快，而地球自转使东向相对地心的速度大于西向，两条航线的净差因此一负一正。实测东向慢约 59 纳秒、西向快约 275 纳秒，与相对论算出的 −40 ± 23 和 +272 ± 21 在不确定度内相符。同样的修正在导航卫星上是日常事务：GPS 卫星在约两万公里高的轨道上，引力项每天快约 45 微秒、速度项每天慢约 7 微秒，净快 38 微秒，出厂时就得先把频率偏掉；若不校正，定位误差每天累积十来公里。北斗与其他系统做的是同一道算术。",
            en: "The history of clocks is a hunt for a steadier period. An ordinary quartz clock strays about a second a day, and astronomical time rested on Earth's rotation, which tidal friction and the seasons tug in and out of regularity. Lyons demonstrated an ammonia atomic clock in 1949 but it was only a proof of principle; in 1955 Essen and Parry at the National Physical Laboratory built the first usable cesium clock. The two hyperfine levels of the cesium-133 ground state differ by one exact microwave frequency, so locking an oscillator to that transition gave time an atomic beat. In 1967 the General Conference on Weights and Measures defined the second as 9,192,631,770 cycles of that radiation, and timekeeping stopped depending on the Earth; cesium fountains now lose a second in hundreds of millions of years, optical clocks run two orders of magnitude better, and redefining the second is already on the agenda. Atomic clocks also make relativity measurable. In 1971 Hafele and Keating carried four cesium-beam clocks aboard airliners around the world, eastbound and westbound, and compared them afterward with the reference clocks at the US Naval Observatory. Two effects pull opposite ways: moving fast runs a clock slow, while climbing into the higher gravitational potential aloft runs it fast, and because the Earth's rotation makes the eastbound speed through space larger than the westbound one, the net difference comes out negative on one route and positive on the other. The measured figures were roughly -59 and +275 nanoseconds against relativity's -40 ± 23 and +272 ± 21 - agreement within the uncertainty. The same corrections are routine for navigation satellites: a GPS clock in an orbit about twenty thousand kilometers high gains some 45 microseconds a day from gravity and loses some 7 from its orbital speed, a net 38 microseconds that must be trimmed out of the oscillator before launch, or positions would drift by some ten kilometers every day. BeiDou and the other systems do the same arithmetic.",
          },
        },
      ],
    },
    /* ===================== 物理学家 ===================== */
    {
      key: "physicists",
      icon: "🧑‍🔬",
      title: { zh: "物理学家", en: "Physicists" },
      items: [
        {
          id: "newton",
          icon: "🍎",
          term: { zh: "艾萨克·牛顿", en: "Isaac Newton" },
          level: 2,
          oneLiner: {
            zh: "经典力学与微积分奠基人，《原理》建立三定律与万有引力。",
            en: "Founder of classical mechanics and calculus; Principia set the three laws and gravitation.",
          },
          detail: {
            zh: "1666 年他为躲鼠疫回到乡下，一年内酝酿出微积分、光的色散与万有引力三条线索；1684 年哈雷登门问「行星为何走椭圆」，催生了 1687 年由哈雷垫资印行的《自然哲学的数学原理》。他的绝对时空与超距引力被后人当作铁律两百年，又被爱因斯坦逐条改写；与莱布尼茨的微积分发明权之争撕裂了英国与欧洲大陆数学界近一个世纪。他做出第一架实用的反射望远镜，也留下了比物理更多的炼金术手稿；凯恩斯因此说他是「最后一位魔术师」而非「第一个理性主义者」。晚年他主持皇家造币厂、受封爵士，也不再愿意被人反驳。",
            en: "Plague sent him back to the countryside in 1666 and inside a year he had sketches of calculus, the dispersion of light and universal gravitation. Halley's 1684 question about elliptical orbits produced the Principia of 1687, printed with Halley's own money. His absolute space, absolute time and action at a distance stood as law for two centuries and then were dismantled one by one by Einstein, while his priority quarrel with Leibniz split British and continental mathematics for nearly a hundred years. He built the first practical reflecting telescope and left more alchemical manuscript than physics, which is why Keynes called him the last of the magicians rather than the first rationalist. He ended as master of the Mint, knighted, and no longer willing to be argued with.",
          },
        },
        {
          id: "einstein",
          icon: "🧠",
          term: { zh: "阿尔伯特·爱因斯坦", en: "Albert Einstein" },
          level: 3,
          oneLiner: {
            zh: "狭义与广义相对论、光电效应，重塑时空与引力观。",
            en: "Special & general relativity and the photoelectric effect reshaped space, time and gravity.",
          },
          detail: {
            zh: "1905 年他在伯尔尼专利局三级技术员的工位上写出四篇改变物理的论文：光电效应、布朗运动、狭义相对论，以及随后补上的一页质能等价。1915 年 11 月他把广义相对论场方程交到普鲁士科学院，1919 年爱丁顿的日食观测让他成为科学史上第一个全球性头版人物。诺贝尔奖发给他的却是光电效应而非相对论；他终生不接受量子力学的概率诠释，「上帝不掷骰子」的诘问反而生出 EPR 悖论——几十年后它成了量子纠缠实验与量子信息学的起点。",
            en: "In 1905, sitting at his desk as a third-class examiner in the Bern patent office, he produced four papers: the photoelectric effect, Brownian motion, special relativity and mass-energy equivalence. He handed the field equations of general relativity to the Prussian Academy in November 1915, and Eddington's 1919 eclipse expedition made him the first scientist in history to become a global headline. The Nobel committee honoured the photoelectric effect rather than relativity. He never accepted the probability interpretation of quantum mechanics, and his protest that God does not play dice generated the EPR argument, which decades later became the experimental starting point of entanglement and quantum information.",
          },
        },
        {
          id: "maxwell",
          icon: "🧲",
          term: { zh: "詹姆斯·麦克斯韦", en: "James Clerk Maxwell" },
          level: 3,
          oneLiner: {
            zh: "统一电、磁、光，提出麦克斯韦方程组。",
            en: "Unified electricity, magnetism and light via Maxwell's equations.",
          },
          detail: {
            zh: "1861 年他补上位移电流、算出电磁波速度恰等于光速，1865 年给出电磁场的动力学理论，1873 年写成《电学与磁学论》；他 1879 年去世、只有 48 岁，没等到 1887 年赫兹把那些波打出来。今天课本上的四个矢量方程是赫维赛德与赫兹在 1880 年代把他原稿里二十多个分量式精简而成的。他还是分子速率分布的提出者、论证土星环必须是碎粒、拍下第一张永久性彩色影像的人，1871 年创建卡文迪许实验室并任首任主任。",
            en: "In 1861 he added the displacement current and found that the resulting wave speed equalled the speed of light; the dynamical theory followed in 1865 and his Treatise on Electricity and Magnetism in 1873. He died in 1879, aged 48, never knowing that Hertz would generate those waves eight years later. The four vector equations students memorise today are Heaviside's and Hertz's compression of his twenty-odd component equations. He also gave the molecular speed distribution, argued that Saturn's rings must be loose particles, took the first permanent colour photograph, and founded the Cavendish Laboratory in 1871 as its first professor.",
          },
        },
        {
          id: "bohr",
          icon: "🪐",
          term: { zh: "尼尔斯·玻尔", en: "Niels Bohr" },
          level: 2,
          oneLiner: {
            zh: "原子量子化模型与哥本哈根诠释。",
            en: "Quantized atomic model and the Copenhagen interpretation.",
          },
          detail: {
            zh: "1913 年他把量子化条件硬装进卢瑟福的核式原子，一举解释了氢光谱与里德伯常量，也留下一个只能算氢的半经典模型——1926 年薛定谔方程一出即被取代。1920 年他创立哥本哈根理论物理研究所、1921 年正式落成，把它变成量子力学的教堂，1922 年获诺贝尔奖。1939 年他与惠勒用液滴模型给出裂变的理论解释；1943 年他逃出纳粹占领的丹麦，母亲后来死于集中营，他自己化名参与曼哈顿计划，晚年奔走于核开放与不扩散。他的弟弟哈拉尔是数学家，还拿过 1908 年奥运会足球银牌。",
            en: "In 1913 he forced a quantisation condition onto Rutherford's nuclear atom, explaining the hydrogen spectrum and the Rydberg constant at a stroke — and leaving a semi-classical model that nothing more complicated than hydrogen could fit once Schrödinger's equation arrived in 1926. His Copenhagen institute, founded in 1920, became the cathedral of quantum mechanics; the Nobel Prize came in 1922. With Wheeler in 1939 he turned the liquid-drop model into a theory of fission. He fled occupied Denmark by sea in 1943, his mother later dying in a camp; he worked on the Manhattan Project under an assumed name and spent his last years arguing for openness and control of nuclear weapons. His brother Harald was a mathematician who won Olympic football silver in 1908.",
          },
        },
        {
          id: "curie",
          icon: "☢️",
          term: { zh: "玛丽·居里", en: "Marie Curie" },
          level: 1,
          oneLiner: {
            zh: "放射性研究先驱，首位两获诺贝尔奖的科学家。",
            en: "Pioneer of radioactivity; first person to win two Nobel Prizes.",
          },
          detail: {
            zh: "1898 年她与皮埃尔先后宣布钋与镭；1903 年诺贝尔物理学奖的提名起初只列了贝克勒尔与皮埃尔，经人提醒才补上她的名字，1911 年她因分离出纯镭并定出其原子量独得化学奖，至今仍是唯一跨两科获奖的人。一战时她把 X 光设备装上汽车组成流动放射车间奔赴前线。她的笔记本到今天仍带放射性，须存于铅盒、穿防护服才能查阅；1934 年她死于再生障碍性贫血，致病的就是她亲手发现的东西。1911 年她与朗之万的私情风波，几乎让法兰西科学院把她拒之门外。",
            en: "She and Pierre announced polonium and then radium in 1898; the 1903 physics nomination listed only Becquerel and Pierre and she was added after someone pointed out the omission. In 1911 she took the chemistry prize alone, for isolating pure radium and fixing its atomic weight, and she remains the only person to win Nobels in two sciences. During the First World War she fitted cars with X-ray equipment and drove them to the front. Her notebooks are still radioactive, kept in lead boxes and consulted in protective clothing; she died of aplastic anaemia in 1934, killed by what she had discovered. The 1911 scandal over her friendship with Langevin very nearly kept the French Academy of Sciences from admitting her.",
          },
        },
        {
          id: "galileo",
          icon: "🔭",
          term: { zh: "伽利略·伽利雷", en: "Galileo Galilei" },
          level: 1,
          oneLiner: {
            zh: "近代实验物理与天文观测奠基人，惯性概念先驱。",
            en: "Founder of modern experimental physics and observational astronomy; pioneer of inertia.",
          },
          detail: {
            zh: "1609 年他把自制的约二十倍望远镜转向天空，看见月球有环形山、木星有四颗卫星、金星有盈亏，「不变的天界」当场塌了。比萨斜塔上的演示多半出自学生的传闻，他真正做的是用斜面把下落冲淡到可以测量。1632 年的《对话》使他在 1633 年受审、余生于软禁，而软禁中写成的《关于两门新科学的对话》（1638）才是近代力学的起点。他的局限同样清楚：始终不肯放弃圆形轨道的完美信念，拒绝了开普勒的椭圆；对罗马政治形势的判断也彻底失败。",
            en: "In 1609 he turned a telescope of his own making, some twenty powers, on the sky and found craters on the Moon, four moons orbiting Jupiter and phases on Venus, which broke the unchanging heavens. The Leaning Tower demonstration was probably a student's story; what he really did was dilute falling along an inclined plane until it could be measured. His Dialogue of 1632 brought him to trial in 1633 and house arrest for life, and the Two New Sciences he wrote under confinement (1638) founded mechanics. His limits are equally plain: he never gave up circular orbits and refused Kepler's ellipses, and his reading of Roman politics failed completely.",
          },
        },
        {
          id: "faraday",
          icon: "🌀",
          term: { zh: "迈克尔·法拉第", en: "Michael Faraday" },
          level: 2,
          oneLiner: {
            zh: "发现电磁感应，奠定电力工业基础。",
            en: "Discovered electromagnetic induction, foundation of the electrical industry.",
          },
          detail: {
            zh: "他做过装订学徒，靠旁听戴维的讲座记了笔记、自荐进皇家研究所。1821 年他做出电磁旋转装置，是电动机的祖先；1831 年发现电磁感应，电力工业从此有了原理；他还给出电解定律，「电极」「离子」「阳极」「阴极」这些词是惠威尔为他造的。他数学几乎为零，却坚持用「力线」想象空间本身被电场与磁场充满，把物理学从超距作用里解放出来——麦克斯韦说自己的方程只是给法拉第的思想作的翻译。1855 年他拒绝为克里米亚战争研制毒气；他也创办了延续至今的皇家研究所圣诞讲座。",
            en: "A bookbinder's apprentice, he entered the Royal Institution by taking notes at Davy's lectures and offering his services. His electromagnetic rotations of 1821 were the ancestry of the motor; induction in 1831 gave the electrical industry its principle; the laws of electrolysis came from him too, and the words electrode, ion, anode and cathode were coined for him by Whewell. Almost without mathematics, he insisted on lines of force filling space, which freed physics from action at a distance — Maxwell described his own equations as a translation of Faraday's ideas. In 1855 he refused to help design chemical weapons for the Crimean War. He also founded the Royal Institution Christmas Lectures, still running.",
          },
        },
        {
          id: "kepler",
          icon: "🪐",
          term: { zh: "约翰内斯·开普勒", en: "Johannes Kepler" },
          level: 1,
          oneLiner: {
            zh: "提出行星运动三定律，揭示天体运行规律。",
            en: "Formulated the three laws of planetary motion.",
          },
          detail: {
            zh: "他接过第谷二十年攒下的观测数据，为了火星轨道上那 8 角分对不上圆的误差，放弃了被沿用两千年的圆形轨道：1609 年给出椭圆定律与面积定律，1619 年给出周期定律。他的动机并不「现代」：他相信有一种从太阳发出的力扫动行星（引力观念的前身），也相信宇宙必须和谐——早年用五个正多面体嵌套解释六条轨道，那个模型错了，但对「背后必有一律」的执念是对的。1615 年母亲被控巫术，他花数年打赢官司；1630 年他死于为讨薪奔赴雷根斯堡的路上。",
            en: "He inherited Tycho's twenty years of observations and, to settle an eight-arcminute disagreement on Mars, gave up the circular orbits physics had assumed for two thousand years: ellipses and equal areas in 1609, the harmonic law in 1619. His motives were not modern. He believed a force issuing from the sun swept the planets along, a precursor of gravitation, and that the cosmos had to be harmonious — which is why he had first explained six orbits with the five regular solids. That model was wrong while his faith that a law was waiting was right. His mother was charged with witchcraft in 1615 and he spent years winning her release; he died in 1630 on the road to Regensburg to collect a salary he never received.",
          },
        },
        {
          id: "planck",
          icon: "➿",
          term: { zh: "马克斯·普朗克", en: "Max Planck" },
          level: 2,
          oneLiner: {
            zh: "提出能量量子化，开创量子理论。",
            en: "Proposed energy quantization, launching quantum theory.",
          },
          detail: {
            zh: "1900 年 10 月他写出黑体辐射公式，12 月 14 日他被迫承认能量只能一份一份地发射与吸收，这一天通常被当作量子理论的生日。他自称那是「绝望之举」，此后十几年一直想把它塞回经典框架；他拟合出的 h 约 6.55×10⁻³⁴ J·s，与今天的 6.626 只差约百分之一。他本人保守，1913 年推荐爱因斯坦进普鲁士科学院时特意补了一句：他偶尔会跑得太远，比如光量子假说。1918 年的诺贝尔奖延迟到次年颁发。纳粹年代他没有离德，1945 年儿子因涉刺杀希特勒案被处决；两年后他去世，1948 年那个学会以他的名字重命名。",
            en: "In October 1900 he wrote down the black-body formula; on 14 December he conceded that energy is emitted and absorbed only in packets, a date now taken as the birthday of quantum theory. He called it an act of desperation and spent the next decade trying to push it back into classical physics. His value of h, about 6.55×10⁻³⁴ J·s, misses today's 6.626 by roughly one per cent. Politically conservative, he nominated Einstein to the Prussian Academy in 1913 with the caveat that he sometimes overshoots the mark, as with the light quantum. His 1918 Nobel Prize was awarded a year late. He stayed in Germany through Nazism, and in 1945 his son was executed for the plot against Hitler. He died two years later; in 1948 the learned society was renamed for him.",
          },
        },
        {
          id: "hertz",
          icon: "📡",
          term: { zh: "海因里希·赫兹", en: "Heinrich Hertz" },
          level: 2,
          oneLiner: {
            zh: "首次实验证实电磁波存在。",
            en: "First experimentally confirmed electromagnetic waves.",
          },
          detail: {
            zh: "1887 年他用感应线圈激励一对中间开口的铜棒，再以一个开环接收，测出这种波的反射、折射与驻波，并确认它的速度就是光速——麦克斯韦赢了。同年他发现紫外光照在电极上会让火花更容易跳，这是光电效应的第一条观测记录，解释要等爱因斯坦 1905 年接手。他对此毫无兴趣，说这「只是证明麦克斯韦是对的」，也由此留下科技史上最著名的失算之一：无线电属于后来人。他 1894 年死于血液感染，年仅 36 岁；频率单位「赫兹」到二十世纪中叶才由国际计量大会正式命名。",
            en: "In 1887 he drove a split copper dipole with an induction coil and picked the wave up with an open ring, demonstrating its reflection, refraction and standing waves, and confirming that its speed was the speed of light: Maxwell had won. That same year he noticed that ultraviolet light on the electrodes made the sparks jump more easily — the first observation of the photoelectric effect, left for Einstein to explain in 1905. He had no interest in any of it, calling his work a mere proof that Maxwell was right, which became one of the most famous miscalculations in technology: radio went to other people. He died of blood poisoning in 1894, aged 36, and the unit hertz was only formalised by the General Conference on Weights and Measures in the mid-twentieth century.",
          },
        },
        {
          id: "rutherford",
          icon: "🎯",
          term: { zh: "欧内斯特·卢瑟福", en: "Ernest Rutherford" },
          level: 2,
          oneLiner: {
            zh: "α 粒子散射确立原子的核式结构，首次实现人工核转变。",
            en: "Alpha scattering gave the nuclear atom; first artificial transmutation of an element.",
          },
          detail: {
            zh: "新西兰农场出身，1895 年靠卡文迪许奖学金进剑桥，1898 年到蒙特利尔任讲席。在加拿大他与索迪建立起衰变理论、提出半衰期概念，主张放射性就是元素在自发转变——1908 年的化学奖就发给了这项工作，他自嘲毕生把别人的元素变来变去，却没把自己从物理学家变成化学家。1909 年盖革与马斯登在他手下用 α 粒子轰金箔，约八千个里有一个被原路反弹回来；1911 年他据此把原子改成「中心一个很小很重的核，四周几乎全空」。1917 年他用 α 轰氮，第一次人工把一种元素变成另一种，并从飞出的粒子中认出质子；1920 年他已预言中子存在，1932 年由查德威克找到。他执掌卡文迪许实验室后，学生与共事者里出了十多位诺贝尔奖得主。他也留下两个著名失算：核式原子按经典电动力学本该在一瞬间坍缩，他把这个问题留给了玻尔；1933 年他公开断言从原子蜕变中取能「不过是无稽之谈」，四年后裂变被证实。",
            en: "He grew up on a New Zealand farm, reached Cambridge in 1895 on a Cavendish scholarship and took a chair in Montreal in 1898. There, with Soddy, he built the theory of radioactive decay, named the half-life and insisted that radioactivity was elements transforming into other elements — the work that brought him the 1908 chemistry prize, which he took as a joke at his own expense: he had spent his life transmuting other people's elements without ever turning himself from a physicist into a chemist. In 1909 Geiger and Marsden, working under him, fired alpha particles at gold foil and found that about one in eight thousand came straight back, so in 1911 he rebuilt the atom as a tiny heavy nucleus inside a mostly empty volume. In 1917 the alpha bombardment of nitrogen gave the first artificial transmutation of one element into another, and he identified the proton among the particles flying out. He had forecast the neutron in 1920; Chadwick found it in 1932. As head of the Cavendish, more than ten Nobel laureates passed through his students and collaborators. His two famous misses: a nuclear atom should collapse classically in an instant, a problem he handed on to Bohr; and in 1933 he declared that any power obtainable from the transmutation of atoms was moonshine, four years before fission was proved.",
          },
        },
        {
          id: "jj-thomson",
          icon: "🍇",
          term: { zh: "约瑟夫·约翰·汤姆孙", en: "J. J. Thomson" },
          level: 2,
          oneLiner: {
            zh: "发现电子：阴极射线是带比荷的微粒，原子并非不可再分。",
            en: "Discovered the electron: cathode rays are particles with a measurable charge ratio.",
          },
          detail: {
            zh: "1884 年，27 岁的他当上卡文迪许教授，主持这间实验室三十多年，直到 1919 年由卢瑟福来接。1897 年他在阴极射线管里分别用磁场与电场把它偏转，测得这种「微体」的比荷约为氢离子的 1800 倍，据此宣布原子并非不可分；他叫它 corpuscle，后来被命名为电子，1906 年他因气体导电的研究获诺贝尔奖。1904 年他给出「葡萄干布丁」模型：正电荷铺满整个球、电子嵌在其中。这个模型被学生的学生的散射实验推翻，可他追问的「正电荷在原子中如何分布」恰恰是此后所有散射实验真正要测的东西。他还是质谱的先驱：1912 年让带正电的射线穿过交叉的电场与磁场，在底片上按荷质比分出抛物线束，其中氖有一条位置偏重的谱迹，即氖-22——同位素的实验证据比阿斯顿的仪器更早。局限同样明确：他只测到 e/m，电荷值要等密立根；他晚年认定电子是以太里的涡环，把原子结构引向思辨而非测量。他与儿子分别在 1906 与 1937 年因「电子是粒子」和「电子会衍射」获奖，正是同一物体的两张脸。",
            en: "He was made Cavendish professor in 1884 at the age of 27 and ran the laboratory for more than thirty years, until Rutherford came to take it over in 1919. In 1897 he deflected cathode rays separately with magnetic and electric fields and found their charge-to-mass ratio about 1800 times that of the hydrogen ion, concluding that the atom was not divisible; he called them corpuscles and the name that stuck was the electron, while his work on conduction in gases earned him the 1906 physics prize. His 1904 plum-pudding atom spread positive charge through the whole sphere with electrons set inside it. The model fell to a scattering experiment run by a student's student, yet the question he was asking — how is positive charge distributed inside an atom — is exactly what scattering experiments still measure. He also founded mass spectrometry: in 1912 his positively charged rays passed crossed fields and separated on a photographic plate into parabolas by charge-to-mass ratio, and one neon trace sat unmistakably heavy, neon-22, evidence for isotopes before Aston's instrument. His limits match his successes: he measured only e/m, leaving the charge itself to Millikan, and in later life he argued that corpuscles were vortex rings in the ether, steering atomic structure towards speculation rather than measurement. He and his son shared the 1906 and 1937 prizes for the electron as a particle and the electron as a wave, two faces of one object.",
          },
        },
        {
          id: "millikan",
          icon: "💧",
          term: { zh: "罗伯特·密立根", en: "Robert A. Millikan" },
          level: 2,
          oneLiner: {
            zh: "油滴实验测出元电荷，并精确验证爱因斯坦的光电方程。",
            en: "The oil-drop charge of the electron and a precision test of Einstein's photoelectric equation.",
          },
          detail: {
            zh: "1909 年起他把水滴换成不易蒸发的油滴，用喷雾器让油雾穿过小孔缓缓落下，靠两块平行板间的电场把某一滴悬停或倒退，反复测它的电荷，得出 e 约 1.6×10⁻¹⁹ 库仑，把「电荷只能一份一份地出现」钉成实验事实；同一个数字还能反推阿伏伽德罗常量、普朗克常量与电子质量。1914 到 1916 年他做了第二件事：用单色光照射碱金属、测截止电压随频率的变化，检验爱因斯坦 1905 年那条光量子方程。他本自认是来证伪的，量出的直线斜率却正好是普朗克常量，1916 年他承认这方程「与我们现在持有的任何图像都无法调和，却已被实验完全证实」。1923 年诺贝尔奖发给了这两项工作。争议也长在同一张表上：1970 年代科学史家霍尔顿指出，他发表油滴数据时略去了若干不合期望的滴，「失踪数据」之争至今未息——也有学者为他辩护，说被剔掉的每一滴都能指出蒸发或气流干扰。他晚年坚持宇宙线是来自恒星的原始光、宇宙是稳态的，这一条被超新星起源说驳倒。",
            en: "From 1909 he swapped water for oil, which evaporates far less, sprayed single drops through a pinhole and used the field between two plates to hold one drop still or drive it back, measuring its charge again and again until the result pinned the elementary charge near 1.6×10⁻¹⁹ coulomb and made 'charge comes only in whole units' an experimental fact. The same number let him back out Avogadro's constant, Planck's constant and the mass of the electron. Then, from 1914 to 1916, he did a second job: shining monochromatic light on alkali metals and measuring stopping voltage against frequency to test Einstein's 1905 light-quantum equation. He expected to refute it; the slope of his line was Planck's constant, and in 1916 he conceded that the equation, which could not be reconciled with any picture then possessed, had nevertheless been completely justified by experiment. The 1923 Nobel Prize covered both pieces of work. The reproach grew from the same table of numbers: in the 1970s the historian Holton showed that drops disagreeing with his conclusion had been left out of the published data, and the case of the missing drops is still argued, other historians defending each omission as a drop with identifiable evaporation or air disturbance. In his later years he insisted that cosmic rays were pristine light from the stars and that the universe was steady, a position the supernova origin of cosmic rays defeated.",
          },
        },
        {
          id: "cavendish",
          icon: "⚖️",
          term: { zh: "亨利·卡文迪许", en: "Henry Cavendish" },
          level: 1,
          oneLiner: {
            zh: "扭秤称量地球，电学手稿提前一个世纪，判定氢气与水。",
            en: "Weighed the Earth with a torsion balance, left electrical manuscripts a century ahead, settled hydrogen and water.",
          },
          detail: {
            zh: "他继承了米歇尔留下的装置：一根轻质横杆两端各吊一只小球，用细丝悬起，再把两只约 350 磅的大铅球搬到杆的两侧——大球吸引小球，把悬丝扭过一个极小的角度，而这正是整个实验的全部难点。1798 年，他 67 岁，测出地球平均密度约为水的 5.48 倍（今天公认 5.51），误差不到百分之二。当时这成果并不被说成「测出了万有引力常量」——G 要到十九世纪后半才被直接给出——而被说成「称量地球」。他的电学手稿写于 1771 年，用一组莱顿瓶证明电力服从平方反比，又做出电荷全落在导体外表面的「冰桶」实验，比普里斯特利的提示更进一步、比库仑的扭秤早十四年，却压着不发；一百年后麦克斯韦在 1879 年把这些手稿编印成册，人们才发现他几乎把电学提前想完。化学上他分离出「可燃空气」即氢、判定它是单质，1784 年让氢在空气中爆鸣生成水，从而把水从元素表上划掉。他孤僻到与女仆用字条交谈、把住宅一侧的楼梯封起来以免撞到来客，大量成果锁在抽屉里，好些优先权要等手稿被翻出来才归还给他。",
            en: "He inherited the apparatus John Michell had designed: a light horizontal rod with a small ball at each end, suspended on a fine thread, with two lead balls of some 350 pounds moved up beside it. The big balls tugged the small ones and twisted the thread through an angle so tiny that measuring it was the entire difficulty. In 1798, aged 67, he found the mean density of the Earth at 5.48 times that of water, against today's accepted 5.51, a miss of under two per cent. His contemporaries did not describe this as measuring the gravitational constant, which waited for the later nineteenth century, but as weighing the world. His electrical manuscripts of 1771 used a bank of Leyden jars to show that electric force falls off as the inverse square of distance, and proved that charge resides entirely on the outer surface of a conductor — the ice-pail experiment — going further than Priestley's hint and anticipating Coulomb's torsion balance by fourteen years, all of it unpublished; it took Maxwell's 1879 edition of the papers for people to realise that he had thought through most of electricity. In chemistry he isolated inflammable air, judged hydrogen to be a simple substance, and in 1784 exploded it in air to water, removing water from the list of elements. He was unsociable to the point of talking to his housekeeper by note and walling off one staircase of his house to avoid meeting callers, and so much of his work stayed in drawers that several priorities were only returned to him when the manuscripts were read out decades later.",
          },
        },
        {
          id: "joule",
          icon: "🔥",
          term: { zh: "詹姆斯·普雷斯科特·焦耳", en: "James Prescott Joule" },
          level: 1,
          oneLiner: {
            zh: "热功当量的定量测量与焦耳定律，奠定能量守恒的实验根基。",
            en: "Measured the mechanical equivalent of heat and the heating law of currents; grounded energy conservation.",
          },
          detail: {
            zh: "他是索尔福德啤酒厂主的儿子，因体弱在家念书，16 岁进了道尔顿的课堂。1840 年他 22 岁发表电流发热定律——发热正比于电流的平方与电阻，比楞次的独立发现早三年。1843 到 1850 年他把「功变成热」做成可重复的定量实验：让下落的重物带动浸在水里的叶轮转，再量水暖了多少。整个四十年代他测得把一磅水升高 1°F 大约要八百多英尺·磅的功，也就是说十磅的重物得下落八十多英尺才够，他因此打趣说自己需要一个八十英尺高的房间；1878 年他最好的数值与今天的 778 已差不到百分之一。1847 年他在英国科学促进会宣读这结果，同年亥姆霍兹从另一个入口发表能量守恒；而在「热不是物质而是运动」这一点上，焦耳坚持得更早也更硬——他干脆不接受热质说。他与汤姆孙（后来的开尔文勋爵）合作量出节流会降温的焦耳-汤姆孙效应，为液化气体开了路。局限也在这儿：他只信机械运动的图像，对场与势能这些新工具并不热心；以他名字命名的能量单位到十九世纪末才定下、1948 年列入国际单位制。",
            en: "The son of a Salford brewer, too frail for school he was taught at home and at 16 became one of Dalton's pupils. In 1840, aged 22, he published the law that a current's heating goes as the square of the current times the resistance, three years before Lenz reached it independently. From 1843 to 1850 he made the turning of work into heat a repeatable number: falling weights drove paddles immersed in water and he measured how much warmer the water came out. Through the 1840s the eight-hundred-odd foot-pounds he measured to raise a pound of water by a Fahrenheit degree meant a ten-pound weight falling more than eighty feet, which is why he joked that he required an eighty-foot room; by 1878 his best value was within a per cent of today's 778. He read the result to the British Association in 1847, the same year Helmholtz published conservation of energy from another direction, and on the point that heat is not a substance but motion Joule had been earlier and more stubborn, since he would not accept the caloric theory at all. With William Thomson, later Lord Kelvin, he measured the cooling of throttled gases — the Joule-Thomson effect that opened the road to liquefying gases. His limit lay in the same place: he trusted pictures of mechanical motion and took little interest in fields and potential energy, and the energy unit bearing his name was only settled at the end of the nineteenth century before entering SI in 1948.",
          },
        },
        {
          id: "heisenberg",
          icon: "🌫️",
          term: { zh: "维尔纳·海森堡", en: "Werner Heisenberg" },
          level: 3,
          oneLiner: {
            zh: "矩阵力学与不确定性原理，量子力学的奠基者之一。",
            en: "Matrix mechanics and the uncertainty principle; a founder of quantum mechanics.",
          },
          detail: {
            zh: "1925 年夏他到黑尔戈兰岛养花粉症，在那里算出一套不用电子轨道、只让可观测的谱线与强度彼此相乘的量子力学；回哥廷根后与玻恩、约尔当一起把它写成三人论文。不到一年薛定谔的波动力学出现，狄拉克证明两者本是同一个理论。1926 到 1927 年他与玻尔反复争「这套算符究竟说了什么」，1927 年给出测不准关系：位置测得越准，动量就越模糊，两者不确定度的乘积不小于普朗克常量的量级——严格的 Δx·Δp ≥ ħ/2 是肯纳德同年补出来的。1932 年他因「创立量子力学——其应用之一引出了氢的两种形态的发现」获诺贝尔奖，颁奖词把奖项钉在具体可验的成果上；纳粹兴起后他却被攻击搞「犹太物理学」，1937 年遭官方调查，他公开表态效忠、承诺留在德国才平息。1941 年他去哥本哈根拜访玻尔，那次谈话的动机至今无定论，被弗莱恩写成戏剧《哥本哈根》；战后他们在农场庄园被拘留期间的录音显示，德国铀计划的成员既没有造弹的思路，也缺关键工艺。他后半生的另一条线在原子核上：与伊凡年科各自给出质子-中子的核模型，提出同位旋与核子间的交换力，又把 S 矩阵当作绕开波函数的思路留给强相互作用物理。",
            en: "In the summer of 1925 he went to the island of Helgoland to recover from hay fever and there worked out a quantum mechanics that used no electron orbits at all, only arrays of observable spectral lines and intensities that multiplied one another; back in Göttingen, Born and Jordan turned it into the three-man paper. Within a year Schrödinger's wave mechanics appeared and Dirac showed the two were the same theory. From 1926 he argued with Bohr over what the formalism actually said, and in 1927 he published the uncertainty relation — the sharper the position, the blurrer the momentum, with the product of the two spreads no smaller than the scale of Planck's constant, while the exact bound of Δx·Δp ≥ ħ/2 was supplied by Kennard the same year. His 1932 Nobel Prize for the creation of quantum mechanics cited, in its official wording, the application that had led to the discovery of the allotropic forms of hydrogen — a prize pinned to a checkable result. After 1933 the Nazis' acolytes denounced him for practising Jewish physics and an official inquiry followed in 1937; he survived it only by publicly pledging to stay in Germany. His 1941 visit to Bohr in Copenhagen left a conversation whose motive is still unsettled — Frayn made a play of it — and the recordings made while he and his colleagues were detained at Farm Hall after the war show that the German uranium project had neither a bomb design nor the missing industrial steps. His later work ran on another track: with Ivanenko he gave the nucleus its proton-neutron picture, he introduced isotope spin and exchange forces between nucleons, and he proposed the S-matrix as a way around wave functions that strong-interaction physics later took up.",
          },
        },
        {
          id: "schrodinger",
          icon: "🐱",
          term: { zh: "埃尔温·薛定谔", en: "Erwin Schrödinger" },
          level: 3,
          oneLiner: {
            zh: "波动力学与那只猫，用一条方程换掉了电子轨道。",
            en: "Wave mechanics and that cat: one equation in place of electron orbits.",
          },
          detail: {
            zh: "1925 年冬他在苏黎世读到德布罗意的物质波论文，想既然电子是波就该有波动方程，1926 年连发四篇，把方程写成 iħ∂ψ/∂t = Ĥψ 的本征值形式，氢原子能级一次算出，不必再往轨道上硬贴量子化条件；他在第三篇里顺手演示了这套算法与海森堡的矩阵力学等价，狄拉克与冯·诺伊曼随后把它抬成一般定理。分歧在 ψ 是什么：他主张电荷真的摊成了波、波包就是粒子，海森堡回信算给他看波包会自己散开，玻恩再把 |ψ|² 读成概率密度，三人这场架打成今天教科书的第一道选择题。1933 年他与狄拉克共享诺贝尔奖，颁奖词是「原子理论的新生产形式」。1938 年德奥合并后他在维也纳待不下去，先到罗马与牛津，1940 年受邀到都柏林高等研究院主持理论物理学部；1944 年出版的《生命是什么？》里那句「生命以负熵为食」与对非周期性分子的推想，把一批物理学家推向了分子生物学。同年他为了奚落哥本哈根诠释，借爱因斯坦来信里的放射性原子设想了一只又死又活的猫，也在这篇文章里首次写下「纠缠」一词。1956 年他回维也纳主持理论物理研究所，1961 年 1 月 4 日在阿尔特巴赫去世；他没能赢下那场诠释之争，可他留下的纠缠在 1964 年贝尔不等式与八十年代的实验之后，从哲学辩论变成了实验室里可用的资源。",
            en: "In the winter of 1925, in Zurich, he read de Broglie's paper on matter waves and asked why a particle that is a wave should not obey a wave equation; four papers in 1926 put it in the eigenvalue form iħ∂ψ/∂t = Ĥψ and gave the hydrogen levels in one stroke, with no quantum condition pinned onto orbits afterwards. In the third of them he showed his algorithm reproduced Heisenberg's matrix mechanics, a link Dirac and von Neumann later raised to a general theorem. The quarrel was over what ψ is: he insisted the charge really was smeared into a wave and the wave packet was the particle, Heisenberg wrote back with arithmetic showing packets spread on their own, and Born read |ψ|² as a probability density — the three-way disagreement is still the first multiple-choice question in every textbook. He shared the 1933 Nobel Prize with Dirac, cited for new productive forms of atomic theory. After the 1938 Anschluss Vienna became impossible: Rome and Oxford first, then from 1940 the school of theoretical physics of the Dublin Institute, where his 1944 book What Is Life? argued that life feeds on negative entropy and guessed at an aperiodic molecule — a short book that pushed a generation of physicists into molecular biology. The same year, needling the Copenhagen reading with a radioactive atom taken from Einstein's letters to him, he described a cat both dead and alive and coined the word entanglement. He went back to Vienna in 1956 to run the institute's theoretical physics chair and died at Alpbach on 4 January 1961. He lost the interpretation argument; the entanglement he left behind, after Bell's 1964 inequality and the experiments of the 1980s, became a resource laboratories can actually spend.",
          },
        },
        {
          id: "pauli",
          icon: "✋",
          term: { zh: "沃尔夫冈·泡利", en: "Wolfgang Pauli" },
          level: 3,
          oneLiner: {
            zh: "不相容原理与中微子预言，量子力学最锋利的批评者。",
            en: "The exclusion principle and the neutrino forecast; quantum mechanics' sharpest critic.",
          },
          detail: {
            zh: "1921 年他 21 岁在慕尼黑拿博士学位，导师索末菲把《数学百科全书》的相对论词条交给这个研究生写，这篇厚重的综述此后重印不辍，爱因斯坦读后说很难相信作者是个刚答辩的年轻人。1924 年他给电子加了一个「经典图像里没有对应物的双值量子数」，1925 年 1 月据此发表不相容原理：同一个原子中不能有两个电子处于完全相同的状态，电子壳层与元素周期表从此有力学根据，白矮星为何不塌也归到这条原理；几个月后乌伦贝克与高兹米特才把那个量子数叫作自旋，而泡利起初并不认账，直到 1927 年用自己的泡利矩阵把它写进理论。1930 年 12 月他寄给图宾格一场放射学会议一封信，开头是「亲爱的放射性先生女士们」，提议让一种极轻、极难捕获的中性粒子带走 β 衰变里失踪的能量与角动量；1932 年查德威克发现中子之后，费米给这粒子定名中微子，1933 年的 β 衰变理论干脆拿它当地基，弱相互作用由此开张。1935 年起他任苏黎世联邦理工理论物理教授，二战的几年在美国讲学，1946 年回苏黎世。1940 年他证明自旋与统计必须绑定（整数自旋相拥、半整数自排斥），1945 年诺贝尔奖只提一件事：发现不相容原理。他与爱因斯坦就量子力学是否完备通信辩论了三十年，是少数敢当面驳倒海森堡与玻尔的人；荣格给他分析了上千个梦，两人想弄清楚物质与心灵会不会有同一副底子。他的刻薄成了行话——一份稿子的评语是「这连错误都算不上」；1931 年哥廷根一台光谱仪在实验中炸毁，同事们说那是因为泡利在场，从此这类事故叫「泡利效应」。1958 年 12 月 15 日他因胰腺癌在苏黎世去世，58 岁。",
            en: "He took his Munich doctorate in 1921 at twenty-one, and Sommerfeld handed this graduate student the relativity article for the Encyklopädie der mathematischen Wissenschaften: an authoritative article that stayed in print for decades and that Einstein said he could hardly believe came from someone who had just defended a thesis. In 1924 he added to the electron a two-valued quantum number with no classical counterpart, and in January 1925 published the exclusion principle — no two electrons in an atom may share one complete state — which gave the shells and the whole periodic table a mechanical basis, and later a reason why white dwarfs hold themselves up. Uhlenbeck and Goudsmit named that number spin only months after him, and Pauli would not accept it until he had written it into his own theory with his matrices in 1927. In December 1930 he mailed a note to a radiology meeting in Tübingen headed Dear radioactive ladies and gentlemen, proposing an almost massless, almost uncatchable neutral particle to carry off the energy and angular momentum missing from beta decay; after Chadwick found the neutron in 1932 Fermi named this one the neutrino, and Fermi's 1933 theory of beta decay built on it, which is where the weak interaction starts. From 1935 he held the theoretical physics chair at the ETH in Zurich, spent the war years lecturing in America and went back in 1946. In 1940 he proved spin and statistics must be welded together — whole spins cluster, half-spins refuse one another — and the 1945 Nobel Prize named a single achievement, the exclusion principle. He argued with Einstein for thirty years about whether quantum mechanics was complete, and he was among the very few who could corner Bohr and Heisenberg in public. Jung analysed something like a thousand of his dreams while they probed whether matter and mind might share one underlying order. His cruelty became a term of art — of one manuscript he pronounced the verdict not even wrong; when a spectrograph blew up in Göttingen in 1931 colleagues blamed his presence, and gear that fails around him is still said to show the Pauli effect. Pancreatic cancer killed him in Zurich on 15 December 1958, aged 58.",
          },
        },
        {
          id: "fermi",
          icon: "🧮",
          term: { zh: "恩里科·费米", en: "Enrico Fermi" },
          level: 3,
          oneLiner: {
            zh: "从费米统计到第一座反应堆，理论与手艺俱佳的那个人。",
            en: "From Fermi statistics to the first reactor: theory and craft in one person.",
          },
          detail: {
            zh: "他 14 岁丧兄，靠少年时与兄长合抄的一位修士的拉丁文数理手稿自学，1922 年在比萨毕业，1926 年 24 岁当上罗马大学理论物理教授，带着一屋子年轻人（拉塞蒂、塞格雷、阿马尔迪、马约拉纳）上山徒步讨论物理，人称帕尼佩尔纳街学派。同年他给自旋为半整数的粒子写出新统计，与狄拉克各自独立完成：金属里的电子、白矮星里的物质都按费米-狄拉克分布排队，一类粒子因此叫费米子。1933 年他把 β 衰变写成四个费米子在同一顶点耦合的理论（稿子先被《自然》退回，理由是离现实太远），并给那个失踪能量的粒子定了中微子之名——弱相互作用第一个能用的形式就是它。1934 年起他用中子挨个轰击元素，意外发现含氢物质慢化中子会让诱导放射性放大几十倍，做出四十多种人工放射性核，并宣布找到了 92 号之后的超铀元素；1938 年 12 月他因中子辐照产生新放射性元素获诺贝尔奖，同一年哈恩与施特拉斯曼证明的其实是铀核裂变，那个发现离他的实验台只有一步。领奖后他携犹太裔妻子劳拉直接去了纽约，没有再回墨索里尼的意大利。1942 年 12 月 2 日下午，芝加哥大学橄榄球场看台下的 CP-1 达到自持链式反应，运行二十八分钟，现场向华盛顿发电报说意大利导航员已安全登陆。在洛斯阿拉莫斯他是少数既算得动又能上手的人：三位一体核试时他撒落纸片、凭飘送的距离估出当量，量级正确；他是唯一同时在场于首次链式反应、首次原子弹爆炸与首次氢弹原理试验的人。1949 年他主持的顾问委员会曾建议拒绝氢弹，1951 年新的分级构型说服了他，此后他投入热核工作。战后他在芝加哥做加速器与宇宙线，1950 年一次午餐闲聊里追问「可他们到底在哪儿呢」，二十多年后被写成费米悖论；他教的「先估数量级再动笔」（比萨有多少个厨师？）今天还在面试卷上，叫费米估算。1954 年 11 月 28 日他因胃癌在芝加哥去世，第 100 号元素以他命名。",
            en: "He lost his brother at fourteen, taught himself from Latin math notes he and the boy had copied out of a friar's manuscript, took his Pisa degree in 1922, and in 1926 became professor of theoretical physics in Rome at twenty-four, gathering Rasetti, Segrè, Amaldi and Majorana into a group that argued physics on mountain walks — the boys of via Panisperna. That same year he wrote the statistics for half-integer-spin particles, independently of Dirac: the electrons in a metal and the matter in a white dwarf queue up by the Fermi-Dirac distribution, and a whole family of particles is named fermions after him. In 1933 he cast beta decay as four fermions coupled at one vertex — Nature rejected the letter as too remote from reality — and gave the particle that carried the missing energy its name, the neutrino; the first usable form of the weak interaction is that theory. From 1934 he bombarded element after element with neutrons, found by accident that hydrogen-rich material slowed them and multiplied induced radioactivity tens of times, made some forty artificial radioisotopes, and announced elements beyond uranium; in December 1938 he was awarded the Nobel Prize for new radioactive elements from neutron irradiation, in the same year Hahn and Strassmann were proving that the uranium nucleus had split, a discovery within a step of his own bench. He and his Jewish wife Laura sailed from Stockholm to New York and he never returned to Mussolini's Italy. On the afternoon of 2 December 1942 the pile called CP-1 under the stands of Chicago's Stagg Field went self-sustaining for twenty-eight minutes, and the site cabled Washington that the Italian navigator had landed safely. At Los Alamos he was one of the few who could both calculate and build: at the Trinity test he dropped confetti and read the blast yield off how far the wind took it, getting the order of magnitude right, and he is the only person present at the first chain reaction, the first atomic explosion and the first thermonuclear device. In 1949 the committee he chaired advised against the hydrogen bomb; the staged configuration of 1951 changed his mind and he worked on it. After the war at Chicago he ran accelerator and cosmic-ray physics, and at a 1950 lunch he asked between courses where all the visitors were — a question later written up as the Fermi paradox. His habit of estimating the order of magnitude before writing anything down (how many cooks are there in Pisa?) survives on interview sheets as the Fermi estimate. Stomach cancer killed him in Chicago on 28 November 1954; element 100 is named fermium.",
          },
        },
        {
          id: "ampere",
          icon: "🧭",
          term: { zh: "安德烈·马里·安培", en: "André-Marie Ampère" },
          level: 1,
          oneLiner: {
            zh: "一周之内把电流的磁效应变成一门电动力学，电流单位归他。",
            en: "One week turned the magnetic effect of currents into electrodynamics; the ampere is his.",
          },
          detail: {
            zh: "他 1775 年生在里昂的富商之家，1793 年父亲被革命法庭送上断头台，他靠家里的三千册藏书自学，十二岁读完多卷《百科全书》，后来又自己补拉丁文去读欧拉与伯努利的原著，据说能整本倒背。1801 年他在布尔教书，写论文想把道尔顿的原子论与盖-吕萨克的气体化合体积比调和起来，思路通到阿伏加德罗后来分清的那个原子-分子之别，只是没人读。1804 年他到巴黎，1820 年 9 月奥斯特发现通电导线能让磁针偏转的消息经《科学年鉴》传到法国，10 月 9 日阿拉戈在科学院当场演示；安培一周之内就把问题换了：不是电生磁，而是电流与电流也互相作用——同向相吸、反向相斥，并给出可叠加定量的经验定律。他把这门新学问命名为电动力学，把磁全部解释成物质内部环流的分子电流，从此不必再假想两种磁荷；他造出电流天平去量两股电流之间的力，把新绕的线圈叫作螺线管，这门学问的词多半出自他手；他又把电流方向定为从正极流向负极，沿用至今。1822 到 1826 年的《电动力学现象的数学理论》把他的定律写成沿闭合回路的积分形式，麦克斯韦把它收进方程组并添上位移电流，今天课本上叫安培环路定律。他做的线圈与磁针实验让电话与电动机的原理有了一句话的根据；欧姆 1827 年的工作用的正是安培定下的电流测量约定。1824 年起他在法兰西公学院任实验物理教授，1831 年兼任大学理科总督学，1836 年 6 月 10 日在去热那亚的路上病死于马赛一家旅馆，儿子阿尔弗雷德陪到最后。1948 年国际计量大会把电流单位定作安培，写成相距一米的两条无限长平行导线之间每米 2×10⁻⁷ 牛的力；2019 年单位重新定义后，它改为由基本电荷的固定数值给出——全世界的电表上仍有他的名字。",
            en: "Born in Lyon in 1775 to a prosperous merchant family, he watched the Revolution send his father to the guillotine in 1793 and taught himself out of the three thousand volumes at home: the whole Encyclopédie by twelve, Latin picked up later so as to read Euler and Bernoulli in the original, with a memory for reciting books backwards. He was a school teacher in Bourg in 1801 and wrote a paper trying to reconcile Dalton's atoms with Gay-Lussac's combining volumes of gases, one step short of the atom-molecule distinction Avogadro later made, and nobody read it. He came to Paris in 1804. When Oersted's news that a currented wire deflects a needle reached France through the Annales de Chimie, Arago showed it to the Institute on 9 October 1820; inside weeks Ampère had changed the question — not whether electricity makes magnetism, but that currents act on currents too, attracting when parallel and repelling when antiparallel, with an empirical force law that could be added up circuit by circuit. He named the new subject electrodynamics, explained all magnetism as molecular currents circulating inside matter so that two kinds of magnetic fluid were no longer needed, and he built a current balance to weigh the push between two currents and named the new coil a solenoid — much of the subject's vocabulary is his — while fixing current's direction as flowing from positive to negative, which is still how the arrow is drawn. His Théorie mathématique of 1822 to 1826 put his law into the integral round a closed circuit that Maxwell kept in the equations after adding the displacement current, and which textbooks now call Ampère's circuital law: the coil and the needle, in one sentence, are the ancestor of every motor and relay. Ohm's 1827 work rests on the current scale Ampère had fixed. He took the chair of experimental physics at the Collège de France in 1824 and became inspector general of university science in 1831; he died of fever in a Marseille inn on 10 June 1836, on the road to Genoa, with his son Alfred at the bedside. In 1948 the CGPM made the ampere the base unit of current, defined as the current that, sent through two long parallel wires a metre apart in vacuum, gives each metre of the other a push of 2×10⁻⁷ newtons; since the 2019 restatement it comes from a fixed value of the elementary charge — his name is on every ammeter on earth.",
          },
        },
        {
          id: "boltzmann",
          icon: "🎲",
          term: { zh: "路德维希·玻尔兹曼", en: "Ludwig Boltzmann" },
          level: 2,
          oneLiner: {
            zh: "把熵写成微观状态数的对数，为原子论赌上一生的人。",
            en: "Entropy as the logarithm of microstates: the man who staked his life on atoms.",
          },
          detail: {
            zh: "他 1844 年生在维也纳，1867 年在维也纳大学拿博士学位，25 岁经斯特藩推荐去做格拉茨的数学物理教授，此后一生在格拉茨、维也纳、慕尼黑、莱比锡之间来回，最后坐回维也纳的理论物理教席。1866 年他把麦克斯韦的速度分布推广到有外力场的情形，写出课本上的那个指数因子 e 的 −E/kT 次方；1872 年给出输运方程与 H 定理：分子碰撞让分布单调走向平衡，「时间为什么只朝一个方向走」第一次有了力学说法，而他清楚这套推理的前提是分子真的存在。1877 年他把熵写成 S = k log W，无序度等于微观状态数取对数，热力学第二定律从铁律降级为「几乎必然」的统计命题；1884 年他用热力学加上麦克斯韦的辐射压强推出斯特藩的 T⁴ 定律。1890 年代他与马赫、奥斯特瓦尔德的唯能论正面开战：对方说原子只是记账的方便符号，他在 1897 年发表《自然科学中原子论的必要性》，反驳原子论已经能解释扩散、渗透压与气体比热；那几年欧洲多数物理学家站在对手一边。1900 年普朗克在黑体公式里借用他这条对数关系，才不得不引入能量子，普朗克自述这一步走得极不情愿、挣扎了好几年，给常数 k 定名并算出数值的也正是普朗克。1890 年代他在达尔马提亚度假时曾试图自杀未遂，此后情绪时起时伏，1900 年仍应邀去耶鲁做系列讲演。1906 年 9 月 5 日，在的里雅斯特附近的多伊诺，他用浴巾结束了自己的生命，62 岁。爱因斯坦 1905 年从分子碰撞推出布朗运动、佩兰 1908 年把它量成原子的证据，都已在他身后。他的维也纳中央公墓墓碑上只刻一行：S = k log W。埃伦费斯特在维也纳做过他的助教，接过了这门统计物理的讲义。",
            en: "Born in Vienna in 1844, doctorate there in 1867, at twenty-five he was recommended by Josef Stefan to the chair of mathematical physics at Graz, and spent the rest of his life shuttling between Graz, Vienna, Munich and Leipzig before returning to Vienna's theoretical physics chair. In 1866 he extended Maxwell's velocity distribution to fields of force and wrote down the exponential factor e to the power −E/kT found in every textbook; in 1872 came his transport equation and the H-theorem, which make the collision of molecules drive a distribution monotonically toward equilibrium and give, for the first time, a mechanical account of why time has one direction only — with the premise, which he never disguised, that the molecules are real. In 1877 he wrote entropy as S = k log W, disorder being the logarithm of the count of microstates, demoting the second law from iron rule to a proposition that is only almost certain. In 1884, from thermodynamics plus Maxwell's radiation pressure, he derived Stefan's fourth-power law. Through the 1890s he fought Mach and Ostwald's energetism head-on: they called atoms a bookkeeping convenience, and his 1897 answer On the Necessity of the Atomic Theory in Natural Science listed diffusion, osmotic pressure and gas specific heats as work only atoms could do, while most physicists of Europe sided with his opponents. In 1900 Planck borrowed this very logarithmic relation to interpolate his black-body formula and found himself forced to quantise energy — an act he described as unhappily desperate, argued over for years — and it was Planck in the same work who named and measured the constant k. Boltzmann had attempted suicide while on holiday in Dalmatia in the 1890s, and his moods rose and fell after that; he still gave the Yale lecture series in 1900. On 5 September 1906, at Duino near Trieste, he killed himself with a bath towel, aged 62. Einstein's 1905 account of Brownian motion as molecular bombardment and Perrin's measurements, published in 1908, came after him. His gravestone in the Vienna Zentralfriedhof carries one line: S = k log W. Ehrenfest, his assistant in Vienna, carried the statistical physics forward.",
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
          id: "entropy",
          icon: "🔀",
          term: { zh: "熵", en: "Entropy" },
          level: 3,
          oneLiner: {
            zh: "系统无序程度的度量，也是热力学第二定律的核心。",
            en: "A measure of disorder and the heart of the second law.",
          },
        },
        {
          id: "photon",
          icon: "✨",
          term: { zh: "光子", en: "Photon" },
          level: 2,
          oneLiner: {
            zh: "光的量子，静质量为零的电磁场能量包。",
            en: "The quantum of light, a massless packet of EM energy.",
          },
        },
        {
          id: "field",
          icon: "🕸️",
          term: { zh: "场", en: "Field" },
          level: 2,
          oneLiner: {
            zh: "空间中每点赋予一个物理量的分布，如引力场、电磁场。",
            en: "An assignment of a physical quantity to every point in space.",
          },
        },
        {
          id: "plasma",
          icon: "⚡",
          term: { zh: "等离子体", en: "Plasma" },
          level: 2,
          oneLiner: {
            zh: "电离气体，由自由电子与离子组成，物质的第四态。",
            en: "Ionized gas of free electrons and ions — the fourth state of matter.",
          },
        },
        {
          id: "wavelength",
          icon: "🌊",
          term: { zh: "波长", en: "Wavelength" },
          level: 1,
          oneLiner: {
            zh: "波在一个周期内传播的距离，符号 λ。",
            en: "Distance a wave travels in one period, symbol λ.",
          },
        },
        {
          id: "frequency",
          icon: "🔁",
          term: { zh: "频率", en: "Frequency" },
          level: 1,
          oneLiner: {
            zh: "单位时间内振动的次数，单位赫兹 Hz。",
            en: "Oscillations per unit time, in hertz (Hz).",
          },
        },
        {
          id: "vector",
          icon: "➡️",
          term: { zh: "矢量", en: "Vector" },
          level: 1,
          oneLiner: {
            zh: "既有大小又有方向的物理量，如位移、力、速度。",
            en: "A quantity with magnitude and direction, e.g. displacement, force, velocity.",
          },
        },
        {
          id: "inertial-frame",
          icon: "🛰️",
          term: { zh: "惯性系", en: "Inertial Frame" },
          level: 2,
          oneLiner: {
            zh: "不受外力、保持静止或匀速直线运动的参考系。",
            en: "A frame at rest or in uniform motion, free of net force.",
          },
        },
        {
          id: "quantum",
          icon: "📊",
          term: { zh: "量子", en: "Quantum" },
          level: 2,
          oneLiner: {
            zh: "物理量不可再分的最小单元；微观世界离散化的体现。",
            en: "The smallest indivisible unit of a quantity; discreteness in the micro-world.",
          },
        },
        {
          id: "duality",
          icon: "🌗",
          term: { zh: "波粒二象性", en: "Wave-Particle Duality" },
          level: 3,
          oneLiner: {
            zh: "微观粒子既表现波动性也表现粒子性。",
            en: "Microscopic particles exhibit both wave and particle behavior.",
          },
        },
      ],
    },
  ],
  refs: [
    {
      label: {
        zh: "《费曼物理学讲义》",
        en: "The Feynman Lectures on Physics",
      },
      url: "https://www.feynmanlectures.caltech.edu/",
      type: { zh: "教材", en: "Textbook" },
    },
    {
      label: { zh: "Khan Academy · 物理", en: "Khan Academy · Physics" },
      url: "https://www.khanacademy.org/science/physics",
      type: { zh: "科普", en: "Educational" },
    },
    {
      label: { zh: "HyperPhysics", en: "HyperPhysics" },
      url: "http://hyperphysics.phy-astr.gsu.edu/",
      type: { zh: "工具", en: "Reference" },
    },
    {
      label: { zh: "Wikipedia · Physics", en: "Wikipedia · Physics" },
      url: "https://en.wikipedia.org/wiki/Physics",
      type: { zh: "百科", en: "Encyclopedia" },
    },
  ],
};
