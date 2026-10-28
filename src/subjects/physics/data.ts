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
            zh: "描述运动要先选参考系、再把物体看成质点——你坐着不动，可是北纬 30° 的地面正带你以约 400 m/s 向东转。位移只问初末位置、是矢量，路程才数走过的轨迹、是标量，绕 400 m 跑道跑一圈位移为零而路程是 400 m。平均速度是位移除以时间，瞬时速度是这段时间取得越短越趋近的那个比值，速率只取它的大小。加速度是对速度再做一次同样的处理，它与「跑得多快」无关：刚起步的货车速度很小而加速度不小，定速巡航的高铁速度很大而加速度近乎零；a 与 v 同号就加速、异号就减速，a 读作负数只说明它指向你定的正方向的反面，不代表在减速。单位换算是常年的失分点：60 km/h 等于 16.7 m/s，人步行约 1.4 m/s，手枪子弹出膛不过 300 m/s 上下，已是步行速度的两百倍。本条只管「用哪些量说运动」，具体公式在匀变速、平抛与圆周诸条里。",
            en: "To describe motion you first pick a reference frame and treat the body as a point mass - sitting still, you are being carried east at about 400 m/s at latitude 30°. Displacement asks only about start and end and is a vector; distance counts the actual trail and is a scalar, so one lap of a 400 m track gives zero displacement and 400 m of distance. Average velocity is displacement over time, instantaneous velocity is what that ratio approaches as the interval shrinks, and speed is its magnitude. Acceleration is the same trick applied to velocity and says nothing about how fast something goes: a truck pulling away has little speed but real acceleration, a cruise-controlled train has plenty of speed and almost none. Same sign as v means speeding up, opposite means slowing down, and a negative a only marks direction against the axis you chose. Unit conversion is the standing trap: 60 km/h is 16.7 m/s, walking is about 1.4 m/s, and a pistol bullet leaves the barrel near 300 m/s, some two hundred times a walking pace. This entry settles only what language to use; the formulas live in the uniformly accelerated, projectile and circular-motion entries.",
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
          detail: {
            zh: "物体沿直线且在任意相等的时间里位移都相等，就是匀速直线运动，只剩一个公式 x = vt。图像各说一半：x–t 图是一条倾斜直线、斜率就是速度，v–t 图是一条水平线、与时间轴围下的面积是位移。实验室用打点计时器造出并检验这种运动——电磁式接 50 Hz 交流、每 0.02 s 打一点，纸带上相邻点距相等即判定匀速，习惯上每 5 个点取一个计数点、对应时间间隔 0.1 s。概念上它是牛顿第一定律的正面形态：维持匀速不需要力，只有改变运动状态才需要力。「力是维持运动的原因」是摩擦造出的日常错觉，冰面与气垫导轨上滑块能滑很久、几乎不停，正是反证。现实中严格的匀速只是近似：平直轨道上定速巡航的列车、匀速传送带、以及下落到阻力与重力相等的收尾速度的雨滴，都归在这一档。",
            en: "A body moves uniformly along a straight line when its displacement is equal in every equal interval of time, which leaves one equation, x = vt. The two graphs split the story: x-t is a slanted straight line whose slope is the velocity, v-t is a horizontal line whose area against the axis is the displacement. The laboratory makes and checks such motion with a ticker timer - an electromagnetic one on a 50 Hz supply stamps a dot every 0.02 s, equally spaced dots certify uniform motion, and counting every fifth dot gives a convenient 0.1 s step. Conceptually this is Newton's first law seen from the front: nothing needs a force to keep going, only a change of motion does. The belief that force sustains motion is an illusion bred by friction, and a puck on an air track shows the opposite. Perfectly uniform motion is only an approximation in practice: a train cruising on straight level track, a conveyor belt, and a raindrop that has reached its terminal speed, with drag exactly balancing weight, all belong to this class.",
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
            zh: "三条公式只服务同一前提：加速度恒定且沿直线，用哪条看缺什么——不求位移用 v = v₀+at，不含时间用 v²−v₀²=2ax，不碰末速度用 x = v₀t+½at²。两条推论常考：某段时间的平均速度等于这段中间时刻的瞬时速度 (v₀+v)/2，但只对匀变速成立；而中间位置的速度 √((v₀²+v²)/2) 总比中间时刻的速度大，因为速度小的那一段花的时间更多。纸带上求加速度用逐差法：相邻相等时间里的位移差是恒量 Δx = aT²，把六段分两组两两相减再平均，能压小偶然误差。自由落体是 a = g 的特例，g 约 9.8 m/s² 且随纬度与海拔微变（赤道约 9.780、两极约 9.832），落得太快不好计时，伽利略才用斜面「冲淡重力」。竖直上抛的上升与回落对称——回到抛点速率仍是 v₀、两段时间相等，把全程当成 a 取负的匀减速来处理比分段省事。符号纪律：先定一个正方向并守住它，负号只代表指向，不该读成「在变小」。式中 v₀、v 为初、末速度，a 为加速度，t 为时间，x 为位移。",
            en: "Three formulas serve one premise - constant acceleration along a line - and you pick by what is missing: v = v0 + at skips displacement, v² - v0² = 2ax skips time, x = v0*t + ½at² skips the final velocity. Two consequences are exam staples: the average velocity over a stretch equals the instantaneous velocity at the middle instant, true only for uniform acceleration; and the velocity at the middle of the distance, √((v0²+v²)/2), always exceeds the velocity at the middle of the time, because the body spends more time while going slower. On tape, successive displacements in equal times differ by the constant Δx = aT², and the standard way to squeeze out random error is to split six segments into two groups, subtract in pairs, then average. Free fall is the case a = g, about 9.8 m/s² and shifting slightly with latitude and height (roughly 9.780 at the equator, 9.832 at the poles); Galileo diluted gravity with an inclined plane because the fall itself was too quick to time. A ball thrown straight up is symmetric - it returns to the launch point at the launch speed after equal times - and treating the whole flight as one uniform acceleration with a taken as negative is shorter than splitting it. Keep one positive direction: a minus sign marks orientation, not a shrinking quantity. Symbols: v0 and v are initial and final velocity, a the acceleration, t the time, x the displacement.",
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
            zh: "这条定律给不出直接的实验证明——地球上找不到真正不受力的物体，它出自伽利略的理想斜面：小球沿一个斜面滚下，会冲上另一个斜面、几乎回到原来的高度；第二面放得越平，球要滚越远才够到那个高度；放到完全水平，球就永远滚下去。笛卡尔补上「方向也不变」，牛顿 1687 年在《自然哲学的数学原理》里把它列为第一定律，推翻了统治近两千年「运动需要力来维持」的看法。要点有三。惯性只由质量量度，与速度无关——同一辆车满载比空车难停，变的是质量不是速度。其次「不受力」与「合外力为零」等价，所以匀速直线是零合力所呈现的状态，而不是需要力去养着的状态。第三，解释现象别说「受到惯性作用」，惯性不是力，正确的说法是物体因惯性要保持原来的速度。安全带、头枕与货物捆扎，全是这条定律开出的工程账单。",
            en: "The first law cannot be proven by experiment directly - nothing on Earth is free of force - and it grew from Galileo's ideal incline: a ball rolling down one slope climbs the next to nearly its original height; flatten that second slope and it must roll farther to reach the same height; make it perfectly horizontal and the ball never stops. Descartes added the unchanged direction, and Newton set it down as the first law in the Principia of 1687, overturning the view, close to two thousand years old, that motion needs a cause to sustain it. Hold on to three points. Inertia is measured by mass alone, not by speed - a loaded truck is harder to stop than the same truck empty, and it is the mass that changed. Next, no force and perfectly balanced force come to the same thing, so uniform straight motion is what zero net force looks like, not a state a force must feed. Third, never say a body is 'acted on by inertia': inertia is not a force; the body keeps its velocity because that is its default. Seat belts, headrests and lashed cargo are all bills presented by this law.",
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
            zh: "F = ma 要读作「合外力等于质量乘以加速度」，重音落在「合」与「即时」：先把所有外力按矢量合成一个和，它定下的加速度就与和同向、随和立刻改变，力一撤 a 归零而物体照旧匀速下去。力的单位正是这么定的——使 1 kg 获得 1 m/s² 的力为 1 N，于是 kg·m/s² 与 N 可互相检验。解题的两个视角：几个物体一起动时先当整体求出 a，再隔离其中一个求内力，别把内力混进整体方程。两个易混点：把 a 与 v 挂钩是错的（力大不代表速度大，上抛的小球在最高点 v = 0 而 a 仍是 g）；把「视重」当重力也是错的（电梯加速上升时台秤读数变大即超重、加速下降时变小即失重，变的只是支持力 N，g 没有动）。适用范围须写明：宏观低速才成立，接近光速要换相对论形式（那时更基本的是 F = dp/dt），微观粒子另有量子规律。式中 F 为合外力（单位 N）、m 为质量（kg）、a 为加速度（m/s²）。",
            en: "Read F = ma as 'net force equals mass times acceleration', with the stress on net and on instant: add the external forces as vectors first, and the acceleration points along that sum and changes with it the moment it changes - take the force away and a drops to zero while the body carries on at constant velocity. The unit is defined by the law: 1 N is the force giving 1 kg an acceleration of 1 m/s², which is how kg·m/s² and newtons cross-check. Two working habits for problems: for bodies moving together treat them as one system to find a, then isolate one to find the internal force, and never let internal forces into the system equation. Two confusions to clear: linking a to v (a large force is not a large speed - a thrown ball at its highest point has v = 0 while a is still g), and taking apparent weight for gravity (a scale reads high in an upward accelerating lift and low in a downward one, but only the support force N changed, g did not). State the boundary too: the form holds for slow everyday bodies; near light speed you need the relativistic version, where F = dp/dt is the deeper statement, and microscopic particles follow quantum rules. Symbols: F is the net force in newtons, m the mass in kilograms, a the acceleration in m/s².",
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
            zh: "两物体间的作用力与反作用力总是等值、反向、共线，而且同性质、同时产生同时消失。它与「一对平衡力」的分别是必考点：平衡力作用在同一物体上、可以相互抵消，作用力与反作用力分属两个物体、永远谈不上抵消。两个误解当场消掉。其一，马拉车不是因为「马的拉力大于车回给的拉力」——那对力大小恒等；马能前进是马蹄向后蹬地、地把马向前推，而地给马向前的力大于车受到的阻力，胜负写在各物体所受的外力上，不在这一对相互作用里。其二，火箭不靠推空气：它把废气向后高速抛出，废气给火箭向前的反作用力，真空中同样存在，这正是太空里能变轨、能调姿的原因；喷气飞机、划桨、人走路都是同一笔账。用两只弹簧秤对拉，无论哪一方更「主动」，两边读数始终一样——这既是定律的演示，也是测力计读数的依据。",
            en: "Action and reaction between two bodies are always equal, opposite and collinear, of the same kind of force, born and gone at the same instant. The contrast with a balanced pair is the point usually tested: balanced forces act on one body and cancel, while an action-reaction pair acts on two different bodies and can never cancel each other. Two misconceptions clear away at once. A horse does not pull a cart because its pull exceeds the cart's reaction - those two are always equal; the horse advances because it kicks the ground backward and the ground pushes it forward harder than the drag on the cart, so the verdict is written on each body's external forces, not inside that pair. A rocket does not push against the air: it throws exhaust backward and the exhaust pushes it forward, and that thrust exists in vacuum, which is exactly how a spacecraft turns or trims its attitude; jet engines, oars and walking are the same transaction. Hook two spring scales together and pull - however one side 'attacks', the readings stay identical, which is both a demonstration of the law and the reason a force meter can be trusted.",
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
            zh: "摩擦力头上写着「相对」二字：它阻碍的是两个接触面之间的相对滑动或其趋势，不是物体本身的运动。静摩擦是被动力，大小由平衡条件决定（有加速度时改由牛顿第二定律定），可在 0 到最大静摩擦之间随外力取值，方向与相对运动趋势相反——判断趋势的常用手法是「假想接触面光滑，它会往哪边滑」。一旦滑动，f = μN，μ 是动摩擦因数、没有单位，只由材料与粗糙程度决定，在近似意义上与接触面积和速度大小无关；N 是正压力，不一定等于重力：斜面上 N = mg cosθ，别的力只要有竖直分量就会改动它。最大静摩擦略高于滑动摩擦，所以推重柜子最费劲的是「起步」那一下。以滚代滑省力的量级差很大，钢轮对钢轨的滚动阻力系数约 0.001，比干钢面滑动摩擦的 0.5 上下小两个数量级。两个易错处：摩擦力也能做动力，传送带靠摩擦把货物从静止带到共速、人走路时地面给脚的摩擦向前；算摩擦生热要乘相对位移，Q = f·Δs 里的 Δs 是两表面之间滑过的距离（也就是划痕长度），不是任一物体相对地面的位移。式中 f 为滑动摩擦力，μ 为动摩擦因数，N 为接触面正压力。",
            en: "Friction carries the word relative in its own definition: it opposes relative sliding between the two surfaces in contact, or the tendency of it, not the motion of the body. Static friction is reactive - its value is fixed by the balance condition, or by Newton's second law once there is acceleration, free to take anything from zero up to its maximum, pointing against the tendency you test by asking which way the surfaces would slip if they were smooth. Once sliding, f = μN, with μ a dimensionless coefficient set by material and roughness and, to good approximation, independent of contact area and speed; N is the pressing force, which need not equal weight - on a slope N = mg cosθ, and any vertical component of another force shifts it. Maximum static friction sits a little above the kinetic value, which is why a heavy cabinet is hardest exactly at the start. Replacing sliding by rolling is cheap in a way the numbers show: steel wheel on steel rail has a rolling resistance coefficient around 0.001 against a kinetic value near 0.5 for dry steel. Two traps: friction can be the driving force, since a conveyor belt accelerates its load by friction and the ground pushes your foot forward by friction when you walk; and the heat produced is Q = f times the relative sliding distance - the length of the scratch between the surfaces - not either body's displacement over the ground. Symbols: f is kinetic friction, μ the coefficient, N the normal (pressing) force.",
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
            zh: "平衡条件是合外力为零，而这等价于两条方程：ΣFx = 0 且 ΣFy = 0，所以正交分解是默认动作——先选定研究对象，再画受力图，把斜着的力拆进两根轴。只受三个力时有捷径：三条作用线必共点（三力汇交），把三个力首尾相接就得到一个闭合三角形，于是相似三角形与纯几何常比列方程更快。动态平衡另有一套路子：一个力大小方向都不变、一个只变方向、剩下的随之调整，把可变的力沿矢量三角形滑过去，谁增大谁减小一眼可见，这类题在「缓慢拉起」「半圆形支架」一类装置上反复出现。约束模型要分清真绳与轻杆：绳只能沿自身提供拉力，跨过光滑滑轮的同一根绳张力处处相等（活结），打了结则两侧张力可以不等（死结）；轻杆却能拉、能压、还能给侧向力，其弹力方向不必沿杆。整体法与隔离法可自由切换，但一次只能对一个对象列方程，也别把内力写进方程里。",
            en: "Equilibrium means zero net force, which is two equations, ΣFx = 0 and ΣFy = 0, so resolving into perpendicular axes is the default move: choose the object, draw the free-body diagram, split every slanted force between the axes. With only three forces there is a shortcut - their lines of action must meet at one point, and laid head to tail they close into a triangle, so similar triangles and plain geometry often beat algebra. Dynamic equilibrium wants a different reflex: hold one force fixed, let a second change only in direction, and slide the remaining force along the vector triangle to see which grows and which shrinks; this is the pattern behind the 'pulled up slowly' and 'semicircular frame' problems. Sort out the constraint models: a rope can only pull along itself, and a single rope over a frictionless pulley has equal tension throughout (a running knot), whereas a tied knot permits different tensions on the two sides; a light rod can pull, push or load sideways, and its force need not lie along the rod. Switch freely between the whole system and one isolated body, but write equations for a single object at a time and keep internal forces out of them.",
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
            zh: "做曲线运动的条件是合力与速度不在同一直线上，轨迹向合力一侧弯：合力指向凹侧、速度沿切线，这两条写反，图像题就全错。处理办法是「拆成互不干扰的直线运动」——演示实验里蜡块在注水的玻璃管中匀速上升，同时随管水平匀速移动，合起来仍是直线；把水平那段改成变速，轨迹就弯成抛物线，这同时说明了分运动的等时性与独立性。平抛取水平 x = v₀t、竖直 y = ½gt²，两式一消去 t 得轨迹 y = gx²/(2v₀²)；任意时刻速度偏向角 α 与位移偏向角 θ 满足 tanα = 2tanθ，这个二倍关系是选择与填空的常客。等时性还能反过来做演示：平抛出去的小球与同高同时自由下落的小球同时落地（平抛竖落仪），说明竖直分运动与水平快慢无关。同一套数学搬到匀强电场里就是带电粒子的「类平抛」，示波管与喷墨打印靠它偏转束流。不计阻力时，等高落地的抛体射程在 45° 取得极大，40° 与 50° 的射程精确相等——互补角共用同一个 sin2θ，这正是「两个角度命中同一目标」的来源。",
            en: "A body curves whenever the net force is not along its velocity, and the path bends toward that force: the force points to the concave side while the velocity lies along the tangent - reverse these two and every graph question is lost. The method is to split motion into independent straight-line parts. In the classic demonstration a wax block rising steadily inside a water-filled tube that is slid sideways at a steady pace still traces a straight line, while making the horizontal part accelerated bends the path into a parabola, which shows at once that the components are simultaneous and independent. For a horizontal throw take x = v0*t and y = ½gt²; eliminating t gives the path y = gx²/(2v0²), and at any instant the velocity angle α and displacement angle θ obey tanα = 2tanθ - that factor of two is a favourite of examiners. Equality of time works in reverse as a demo: a ball launched sideways and a ball dropped from the same height at the same moment land together (the projectile-and-free-fall apparatus), proving the vertical part ignores horizontal speed. The same algebra moved into a uniform electric field is the projectile-like deflection of a charged particle, which is how cathode-ray tubes and inkjet printers steer their beam. Neglecting drag, range on level ground peaks at 45°, and 40° and 50° land exactly alike because complementary angles share one sin2θ - which is why two angles can hit one target.",
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
            zh: "先理清描述量：线速度 v = 2πr/T、角速度 ω = 2π/T，两者由 v = ωr 挂钩；向心加速度 a = v²/r = ω²r = 4π²r/T²，它只改速度方向、不改大小。最要紧的一句是「向心力」按效果取名字，不是一种新来的力，所以每道题都得回答谁提供它：随转盘转的物块靠静摩擦，圆锥摆靠绳拉力与重力的合力，卫星靠引力，火车在略高的外轨上转弯靠重力与支持力的合力——在设计速度下轮缘几乎不挤压轨道。竖直平面内的圆周分两种模型：绳（或内侧轨道）只能拉，最高点速率不得低于 √(gr)，再小绳就松、车就脱轨；杆（或圆管）既能拉又能撑，最高点速率可以为零。当供给小于所需的 mv²/r，物体就做离心运动，洗衣机脱水与砂轮超速时飞出的碎块都记在这笔账上。最后一条纪律：在惯性系里别写「物体受到离心力」，那是只有在非惯性系里才需要引入的惯性力，写出来就把受力分析搞乱了。式中 m 为质量，v 为线速度，ω 为角速度，r 为圆周半径。",
            en: "Sort the descriptors first: v = 2πr/T and ω = 2π/T, joined by v = ωr, with centripetal acceleration a = v²/r = ω²r = 4π²r/T², which turns the velocity around without changing its size. The essential sentence is that 'centripetal force' names an effect, not a fresh kind of force, so every problem must answer who supplies it: static friction for a block riding a turntable, the resultant of tension and weight for a conical pendulum, gravity for a satellite, and the resultant of weight and the track's support for a train turning on a raised outer rail - at the design speed the wheel flanges press almost nothing. Vertical circles split into two models: a string or an inner rail can only pull, so the speed at the top cannot fall below √(gr) or the string goes slack and the vehicle leaves the track; a rod or a tube can also push, so zero speed at the top is allowed. When the supply falls short of the needed mv²/r the body swings outward - a spin dryer wringing clothes and the shards of an over-speeding grinding wheel are on this account. One discipline: in an inertial frame never write that the body 'experiences a centrifugal force', which is a device used only in non-inertial frames and it wrecks the force analysis. Symbols: m is mass, v linear speed, ω angular speed, r the radius.",
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
            zh: "F = G·m₁m₂/r² 的前提是质点或均匀球体——球体对外的效果等价于全部质量集中在球心，这才让定律能用于行星与地球；r 是两质点间距，地面附近的物体取 r 约等于地球半径 R。G ≈ 6.67×10⁻¹¹ N·m²/kg² 小得离谱：两个 1 kg 的球相距 1 m，彼此的引力只有 6.67×10⁻¹¹ 牛，比托起其中一个所需的重力小约十一个数量级。引力在微观世界毫无存在感、在天文尺度上独裁，原因正在它是长程的、只会相加而从不抵消。这个 G 由后人从卡文迪许 1797 至 1798 年的扭秤数据换算而来，他本人只说「称量地球」——测出地球平均密度约为水的 5.5 倍。定律的历史功绩是把苹果与月亮并成一件事：月球轨道半径约为 60 个地球半径，若引力按 1/r² 衰减，月球的「下落加速度」就该是地面 g 的 1/3600、即 0.0027 m/s² 上下，而由 (2π/T)²r 算出的月球向心加速度正是这个数——这一步检验比公式本身更能说明它为什么叫「万有」，教科书里把这一步称作月—地检验。工程上最省事的替换是黄金代换 GM = gR²：地面重力与天体质量被缝成一个可测量；再由卫星的 T 与 r 用 M = 4π²r³/(GT²) 称出任一天体的质量与密度。g 随高度按 g(h) = g₀(R/(R+h))² 衰减，400 km 高的轨道上仍有约 8.7 m/s²，所以舱内漂浮不是因为没了引力，而是飞船与里面的人在共同做同一份自由落体（视重的口径见牛顿第二定律条）。边界须写明：弱场低速足够，水星近日点每世纪多出约 43 角秒的进动对不上这个式子，那要交给广义相对论。式中 G 为引力常数，m₁、m₂ 为两物体质量，r 为两质点间距。",
            en: "The formula F = G m₁m₂/r² presumes point masses or uniform spheres - a sphere acts from outside as if all its mass sat at its centre, which is what lets the law be used on planets and Earth - and r is the separation of the two points, so near the ground r is about Earth's radius. G ≈ 6.67 × 10⁻¹¹ N·m²/kg² is absurdly small: two 1 kg balls a metre apart pull on each other with 6.67 × 10⁻¹¹ N, some eleven orders of magnitude below the force needed to hold up one of them. Gravity is irrelevant in the micro world and dictator of the astronomical one precisely because it is long-ranged, only ever adding and never cancelling. The number was converted later from Cavendish's torsion-balance data of 1797-1798, who described his own result only as 'weighing the Earth' - a mean density about 5.5 times that of water. The law's historical triumph was to make apple and moon one case: the Moon sits about 60 Earth radii away, so if gravity falls off as 1/r² its 'falling acceleration' should be the ground value divided by 3600, about 0.0027 m/s², and (2π/T)²r gives exactly that - the check, more than the formula, is why the law calls itself universal - the textbook names it the Earth-Moon test. The handiest substitute in practice is the gold exchange GM = gR², which stitches surface gravity and planetary mass into one measurable; then a satellite's T and r yield any body's mass and density through M = 4π²r³/(GT²). Gravity thins with height as g(h) = g₀(R/(R+h))², and at 400 km it is still about 8.7 m/s², so floating inside a cabin is not the absence of gravity but the ship and its occupants making the same free fall together (for apparent weight see the second-law entry). State the boundary too: weak fields and slow speeds are fine, but the roughly 43 arcseconds per century by which Mercury's perihelion outruns this formula belongs to general relativity. Symbols: G the gravitational constant, m₁ and m₂ the two masses, r the distance between the point masses.",
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
            zh: "三条定律是同一次观测的三次抽象，各管一件事。第一定律说轨道是椭圆、太阳在其中一个焦点上：近日点距离 a(1−e)、远日点 a(1+e)，e 是偏心率，圆只是 e = 0 的特例，所以别把「轨道半径」当成不变量。第二定律说相等时间里扫过相等面积，即面积速度恒定，于是行星在近日点快、远日点慢；今天知道它的实质是角动量守恒（引力是有心力、力矩为零），但开普勒手里只有第谷留下的观测数。第三定律 T² = (4π²/GM)·a³ 才是真正能用的一条：比值只由中心天体决定，因此绕日的行星共用一个常数、绕地的卫星共用另一个，跨中心天体去比就是错。它的用处有三——由 a 与 T 反算中心天体的质量；给定周期定轨道高度（地球同步卫星取一个恒星日约 23 小时 56 分，解出 a 约 4.2 万公里、离地约 3.6 万公里，通信与气象卫星就钉在这里）；以及判断变轨之后周期的长短。史实口径与人物条一致：第谷二十年肉眼观测攒下的数据里，火星轨道有 8 角分放不下圆轨道，开普勒因此丢掉延续两千年的圆形执念，1609 年给出前两条、1619 年给出第三条；1687 年牛顿再从万有引力把这三条从理论上导出——顺序不能记反，开普勒是观测的归纳，牛顿是动力学的解释。适用边界也要交代：它是二体近似，真实太阳系里行星互扰产生摄动，天王星轨道的残差正是 1846 年海王星「被算出来而非被看见」的依据。式中 T 为公转周期，a 为椭圆轨道半长轴（T²∝a³）。",
            en: "The three laws are three abstractions of one body of observations, each doing a different job. The first says the orbit is an ellipse with the Sun at one focus: perihelion distance a(1−e), aphelion a(1+e), e being the eccentricity, and a circle is merely the case e = 0 - so never treat orbital radius as a constant. The second says equal areas in equal times, the areal speed being constant, so a planet moves fastest near the Sun and slowest far off; we now know its substance is conservation of angular momentum (gravity is a central force, hence zero torque), though Kepler had only Tycho's numbers in hand. The third, T² = (4π²/GM)a³, is the one actually usable: the ratio is fixed by the central body alone, so planets about the Sun share one constant and satellites about the Earth another, and comparing across central bodies is simply wrong. Three uses follow - recover the central mass from a and T; fix an orbital altitude from a chosen period (a geostationary satellite, taking a sidereal day of about 23 h 56 min, lands on a of roughly 42,000 km, some 36,000 km above the surface, which is where comms and weather satellites are nailed down); and judge how the period changes after a maneuver. Keep the history consistent with the biography entry: among the twenty years of naked-eye data Tycho amassed, the martian orbit missed the circle by 8 arcminutes, so Kepler gave up two millennia of circular devotion, publishing the first two laws in 1609 and the third in 1619; Newton then derived all three from universal gravitation in 1687 - and the order must not be reversed, since Kepler generalises from data while Newton explains. State the limit as well: these are two-body approximations, and mutual perturbations rattle the real system - the residual in Uranus's orbit is what made Neptune counted rather than seen in 1846. Symbols: T the orbital period, a the semi-major axis of the ellipse (T² ∝ a³).",
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
            zh: "第一宇宙速度 7.9 km/s 是近地圆轨道的环绕速度，也是最小发射速度；第二 11.2 km/s 即逃逸速度，可挣脱地球引力成为绕太阳的人造行星；第三 16.7 km/s 可离开太阳系。三档数值都随中心天体的质量与半径而变，月球、火星探测器须按所在天体重新计算。三档速度各有出处：第一是 √(GM/R)，第二恰是它的 √2 倍即 √(2GM/R)，两者都以「贴地飞行、不计大气与山高」为前提；第三 16.7 km/s 要先挣脱地球、再借上地球公转的约 30 km/s，发射方向选在公转同向才最省。真实火箭也不是直线冲到 7.9 就停手：入轨的总速度增量约 9.4 km/s，多出的 1.5 km/s 上下是克服重力损失与空气阻力的代价，姿态因此先竖直起飞、再逐渐把倾角压平（重力转弯）。补一组可对照的数：400 km 圆轨道上速度约 7.67 km/s、周期约 90 分钟、g 仍有约 8.7 m/s²；换个天体数字全变，月球环绕约 1.7、逃逸约 2.4，火星环绕约 3.6、逃逸约 5.0，单位都是 km/s。",
            en: "The first (7.9 km/s) is the low circular-orbit speed and also the minimum launch speed; the second (11.2 km/s, hence also called the escape velocity) breaks free of Earth to orbit the Sun; the third (16.7 km/s) leaves the Solar System. All scale with the host body's mass and radius, so lunar and Martian probes recompute them per world. Each tier has its own source: the first is √(GM/R), the second exactly √2 times it, and both presuppose skimming flight with no atmosphere and no mountains; the third, 16.7 km/s, must first escape the Earth and then spend the roughly 30 km/s already supplied by the planet's orbit, so launching along the direction of that motion is the cheapest. A real rocket does not simply fly up to 7.9 and stop - the total velocity increment to reach orbit is about 9.4 km/s, the extra 1.5 km/s or so paying for gravity losses and drag, which is why the vehicle climbs first and then gradually tips its trajectory over (a gravity turn). A comparable set of numbers: in a 400 km circular orbit the speed is about 7.67 km/s, the period roughly 90 minutes, and g is still near 8.7 m/s². Change worlds and every figure moves - orbit speed about 1.7 and escape about 2.4 km/s for the Moon, about 3.6 and 5.0 km/s for Mars.",
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
            zh: "卫星在原圆轨道加速，所需向心力大于当前引力供给，遂做离心运动抬升到更高轨道；稳定到新圆轨后线速度反而变小（v 随 r 增大而减小），“高处反而更慢”是常考易错点。霍曼转移用两次短脉冲最省燃料地进出高轨，交会对接则需在低轨加速追赶、再做相位微调。这一条最该记牢的账是「高轨更慢，机械能却更高」：轨道能量 E = −GMm/(2r)，r 越大越接近零，而动能 ½mv² 随 1/r 减小，差额全存在势能里——所以抬轨一定要烧燃料，降轨反而能白捡速度。霍曼转移的两次脉冲都是正向（第一次进椭圆、到远地点再加速才圆化），返程则两次反向减速。交会不能直线追：在同一轨道上加速会抬轨变慢、把距离拉开，追赶者须先在低轨按相位角提前出发，再择点抬轨汇合。回家同样是减速——把近地点压进大气层，之后交给阻力继续降高，一次「刹车」才是返回的钥匙。地月之间的经典霍曼转移约 5 天，阿波罗走更快的窗口只用 3 天上下。",
            en: "A prograde burn makes the satellite need more centripetal force than gravity supplies, so it swings out to a higher orbit; once circularized its speed is actually lower (v falls as r grows)—“higher yet slower” is a classic trap. A Hohmann transfer raises or lowers an orbit with two impulsive burns at minimum fuel, while rendezvous means accelerating in a lower chase orbit then trimming phase.The account worth remembering is 'higher yet slower, but with more mechanical energy': orbital energy is E = −GMm/(2r), which rises toward zero as r grows while the kinetic energy ½mv² falls with 1/r, the whole difference being stored as potential - so climbing always burns fuel, whereas falling hands speed back. Both burns of a Hohmann transfer are prograde (the first enters the ellipse, the second circularises at apogee), and the return does the reverse twice over. Rendezvous cannot be a straight chase: accelerating in the same orbit lifts and slows you, opening the gap, so the chaser starts low, arrives by phase angle and only then raises the orbit to meet. Going home is a deceleration too - drop the perigee into the atmosphere and let drag do the rest, since one brake, not one push, is the key to re-entry. The classical Earth-Moon Hohmann transfer takes about five days, while Apollo flew a faster window of roughly three.",
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
            zh: "双星间的万有引力提供各自绕质心的向心力，故两者角速度与周期相同，满足 m₁r₁ = m₂r₂——质量大的离质心更近、转的圆更小。天狼星 B、食双星由此称出质量；X 射线双星与引力波双黑洞并合同属这一框架，使双星成为称量天体的主法。观测上有三条互补的称量路子：目视双星量出角轨道与周期，食双星由掩食补出轨道倾角与两星半径，光谱双星靠多普勒视向速度曲线给出质量函数，三者叠起来才拿到真实质量。天狼星 B 正是这样落定的——1862 年看见它暗弱的伴星，1915 年测出其光谱，才知是一颗密度高得离谱的白矮星（与恒星演化条口径一致）。脉冲双星 PSR B1913+16（1974 年由赫尔斯与泰勒发现）的周期在不断变短，缩短量与引力波带走能量的预言吻合到千分之几，两人因此获 1993 年诺贝尔物理学奖；LIGO 2015 年看到的双黑洞并合是同一条轨道衰减的最后几秒，频率上扬的那段「啁啾」就是把两颗黑洞的轨道同时按开普勒定律与引力辐射算出来的。最常见的错在符号：公式里的 r 是两星之间的距离，各自绕质心的轨道半径是 r₁、r₂，满足 r₁ + r₂ = r，把 r 当成轨道半径会整题算错。",
            en: "Their mutual gravity supplies each star's centripetal force, so both share one angular speed and period with m₁r₁ = m₂r₂—heavier stars sit closer to the barycentre on smaller circles. Sirius B and eclipsing binaries are weighed this way, as are X-ray binaries and merging black-hole waves, making binaries the primary method for measuring stellar masses.Three observational routes complement each other: visual binaries give the angular orbit and period, eclipsing binaries add the inclination and both radii, and spectroscopic binaries give a mass function from the Doppler radial-velocity curve - only stacked together do they yield real masses. Sirius B settled this way: its faint companion was seen in 1862 and its spectrum measured in 1915, revealing an absurdly dense white dwarf (consistent with the stellar-evolution entry). The pulsar pair PSR B1913+16, found by Hulse and Taylor in 1974, has a period that keeps shrinking, matching the energy carried off by gravitational waves to within a few parts per thousand - their 1993 Nobel prize - and the binary black-hole merger LIGO heard in 2015 is the last few seconds of that same decay, its rising chirp being the orbit computed from Kepler's laws and gravitational radiation at once. The commonest slip is notation: r in the formula is the separation of the two stars, while their own radii about the barycentre are r₁ and r₂ with r₁ + r₂ = r - read r as an orbit radius and the whole problem goes wrong.",
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
            zh: "功的定义只有一句：W = Fs·cosθ，力在位移方向上的分量乘以位移。它是标量，正负不问方向而问这个角色是动力还是阻力——阻力做负功时常说成「克服某力做功若干」。三种情形下不做功：没受力、没位移、力与位移垂直；提着水桶水平走路，竖直的提力对桶做功为零，腰酸来自肌肉反复收缩而不是物理功。功率有两种问法：P = W/t 是这段时间的平均功率，P = Fv 是这一瞬间的实际功率，铭牌上的额定功率就是允许长时间输出的上限。由此两件事一目了然：汽车以额定功率爬坡必须换低速挡，因为 v 降下来 F 才升得上去；「一马力」定得比马的实际输出偏高——瓦特为了把蒸汽机卖给矿主，把它定为 550 英尺·磅每秒（约 746 W），而马长时间拉动的实际功率低于这个数，公制马力又取 735.5 W。量级感：把 20 kg 的箱子抬高 1 m 约做 200 J，60 kg 的人上一层 3 m 高的楼约 1.8 kJ，而人能持续输出的功率不过百瓦量级。最后一条与摩擦力条分工：算功一律用物体相对地面的位移，算摩擦生热用两表面之间的相对滑动距离；一对相互作用力的功之和要看有无相对滑动——静摩擦时恰为零，滑动时之和为负、绝对值就是产生的热。式中 W 为功（J），F 为作用力，s 为位移，θ 为力与位移夹角，P 为功率（W），t 为时间。",
            en: "Work has one definition: W = Fs cosθ, the force component along the displacement times that displacement. It is a scalar, and its sign asks not about direction but about role - a negative work is usually phrased as 'doing work against' that force. Three situations do no work at all: no force, no displacement, or force perpendicular to displacement; carry a bucket level across a room and your upward pull does zero work on it, while the ache in your arm comes from muscles contracting again and again, not from physics. Power asks two different questions: P = W/t is the average over an interval, P = Fv is the actual value at an instant, and the rated power on a machine's plate is what it may sustain for hours. Two everyday facts follow. A car climbing at rated power must shift down, because only a smaller v buys a larger F. And one horsepower was set above what a horse really delivers: to sell steam engines Watt defined it as 550 foot-pounds per second (about 746 W), while a horse pulling for hours gives less - the metric horsepower counts 735.5 W. For scale: lifting a 20 kg box by 1 m is about 200 J, a 60 kg person climbing one 3 m flight is about 1.8 kJ, and a human sustains only on the order of 100 W. One division of labour with the friction entry: work always uses displacement relative to the ground, while frictional heat uses the relative sliding distance between the two surfaces - and the two works of an action-reaction pair sum to exactly zero when there is no slipping, and to minus the heat generated when there is. Symbols: W work in joules, F the force, s the displacement, theta the angle between them, P power in watts, t the time.",
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
            zh: "动能 Eₖ = ½mv² 是标量，而且随参考系而变：车厢里以 10 m/s 走向车头的乘客，对车厢的动能小、对地面还得叠上车速——默认取地面为参考系，正是为了避免这笔糊涂账。速度是平方进入的，所以翻倍的速度带来四倍的动能，限速与「保持车距」的物理根据就在这里：同样路面下刹车距离 s = v²/(2μg)，100 km/h 的刹车距离约为 50 km/h 的四倍；把一辆 1000 kg 的车加速到 100 km/h，要付出约 39 万焦（½×1000×27.8²）。动能定理 W_合 = ΔEₖ 的价值在于它是标量方程：不必问力怎么变、轨迹怎么弯，把各力的功代数相加即可，因此变力做功、曲线运动、穿透深度、制动距离都归它管，而换成 F = ma 就得先解矢量方程。三个易错处：一是 W 必须是合外力的总功，漏掉一段摩擦或一段重力就错；二是动能不变不等于没有力做功——匀速上升的电梯里牵引力做正功、重力做等量负功，总和才为零；三是它只在惯性系里成立、且限宏观低速，高速时动能要换成 (γ−1)mc²。式中 Eₖ 为动能，m 为质量，v 为速率，W 为合外力做的功。",
            en: "Kinetic energy E_k = ½mv² is a scalar and it depends on the frame: a passenger walking forward at 10 m/s inside a carriage has little energy relative to the carriage and rather more relative to the ground, which is exactly why the ground frame is the silent default. Speed enters squared, so doubling it quadruples the energy - the physics behind speed limits and two-second gaps: on the same surface the braking distance is s = v²/(2μg), so stopping from 100 km/h takes about four times the distance needed at 50 km/h, and bringing a 1000 kg car up to 100 km/h costs roughly 390 kJ (½ × 1000 × 27.8²). The theorem W_net = ΔE_k is worth learning because it is a scalar equation: never mind how the force varies or how the path bends, just add up the works algebraically. Changing forces, curved paths, penetration depth and stopping distance all fall to it, where F = ma would first demand a vector equation. Three traps. The W must be the total work of the net force - leave out one stretch of friction or one of gravity and the answer is wrong. Constant kinetic energy does not mean no force is doing work: in a lift rising at steady speed the cable does positive work and gravity does exactly as much negative work, and only the sum vanishes. And the theorem holds only in inertial frames and at non-relativistic speeds, where energy becomes (γ - 1)mc². Symbols: E_k kinetic energy, m mass, v speed, W the net work done.",
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
            zh: "重力势能 Eₚ = mgh 有三件必须说清的事。第一，它属于系统而不属于物体：这笔能量归「物体—地球」共有，把势能写成物体单独持有的东西是概念性错误。第二，它依赖零势能面的选取，因而可正可负——负号不代表没有势能，只代表它在所选面的下方；与选取无关的永远是差值 ΔEₚ，过程用掉的也只是差。第三，重力做功与路径无关、只由初末高度差决定，W_G = −ΔEₚ，这正是「势能」概念得以成立的条件；对照之下摩擦力做功沿路径一路累加，圈数越多耗得越多，所以不存在「摩擦势能」。弹性势能 Eₚ = ½kx² 走的是同一套逻辑：弹力随形变线性变化，F–x 图下的三角形面积就是功（k 为劲度系数，超出弹性限度后不再线性）。量级感：60 kg 的人登上 100 m 高的楼顶，势能增加约 5.9×10⁴ 焦，与一块方糖氧化放出的化学能同量级；水库蓄满后每立方米水下落 100 m 交出约 9.8×10⁵ 焦，水力发电吃的就是这笔差。最后一条边界须写明：mgh 只在高度远小于地球半径时成立，再高就得回到引力的严格式 −GMm/r。式中 Eₚ 为重力势能，m 为质量，g 为重力加速度，h 为相对零势能面的高度。",
            en: "Gravitational potential energy E_p = mgh has three things to settle. First, it belongs to a system, not to the object: the energy is jointly held by the object-and-Earth, and writing it as something a body carries alone is a category error. Second, it depends on the chosen zero level, so it can be negative - a minus sign does not mean no energy, only that the body sits below the level you picked; the difference ΔE_p is what never depends on that choice, and processes spend only the difference. Third, gravity does work independently of the path, fixed by the height difference alone, W_G = −ΔE_p, and this is precisely the condition that lets a potential energy exist at all; friction by contrast accumulates along the path, more laps spend more, which is why there is no 'friction potential energy'. Elastic energy E_p = ½kx² follows the same logic: the spring force grows linearly with deformation, so the work is the triangle under the F-x graph (k is the stiffness, valid only inside the elastic limit). For scale: a 60 kg person going up to a 100 m rooftop gains about 5.9 × 10⁴ J, the same order as the chemical energy in one sugar cube, and each cubic metre of reservoir water falling 100 m hands over about 9.8 × 10⁵ J - hydropower is simply a bill for that difference. One boundary must be stated: mgh holds only while the height is tiny against Earth's radius; higher up you return to the exact gravitational form −GMm/r. Symbols: E_p gravitational potential energy, m mass, g gravitational acceleration, h the height above the chosen zero level.",
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
            zh: "守恒条件写作「只有重力或弹力做功」，注意它考的是功、不是受力清单：单摆的绳拉力、斜面与曲面的支持力自始至终都在，但因为永远与速度垂直、一个也不做功，于是机械能守恒。反过来，匀速下降的降落伞动能不变而势能不断减少，机械能显然不守恒，差额被空气阻力变成了热。绳子突然绷紧的瞬间、多数碰撞、人走路与骑车时体内化学能的介入，都会让「机械能」这一本账算不平，此时须改用总的能量守恒 ΔEₖ + ΔEₚ = W_其他（摩擦一项就是 −Q）。式子只有 ½mv₁² + mgh₁ = ½mv₂² + mgh₂，好处是完全不问路径与中间过程的力。两个判据写在数字里：20 m 高的光滑滑道，末端速度按 √(2gh) 约 20 m/s、合 72 km/h，而真实水滑道只跑到其大半，剩下的是摩擦的账；过山车的第一座提升丘必须是最高的，之后每一座都只能更低，否则车爬不过去——落差 60 m 理论上给出约 34 m/s。它与动能定理是同一件事的两副面孔：定理是普适标量式，任何过程都能上；守恒式只在条件成立时最省事，所以解题第一步永远是先问「除了重力和弹力，还有谁在做功」。",
            en: "The condition reads 'only gravity or spring force does work', and the test is about work, not about the list of forces: the string tension of a pendulum and the normal force of a slide are present the whole time, yet because they stay perpendicular to the velocity they do no work, so mechanical energy is conserved. Conversely, a parachute descending at steady speed keeps its kinetic energy while losing potential energy, so mechanical energy is plainly not conserved - the difference has been handed to the air as heat. A rope snapping taut, most collisions, and the chemistry inside walking or pedalling legs all make the mechanical account fail to balance, and then you must switch to the general one, ΔE_k + ΔE_p = W_other, with the friction term standing for −Q. The formula is only ½mv₁² + mgh₁ = ½mv₂² + mgh₂, and its virtue is that it never asks about the path or the forces along it. Two checks live in numbers: a 20 m frictionless chute ends at √(2gh), about 20 m/s or 72 km/h, while a real water slide reaches only the better part of that, the rest being friction's bill; and a roller coaster's first lift hill has to be its tallest, every later hill lower, or the train will not make it over - a 60 m drop would theoretically give about 34 m/s. This and the work-energy theorem are two faces of one thing: the theorem is the universal scalar form that handles any process, while conservation is the shortcut that pays only when its condition holds, so the first move in any problem is to ask 'besides gravity and the spring, who else is doing work?'",
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
            zh: "动量 p = mv 是矢量，用守恒定律第一步是定正方向，负号代表反向而不代表「小」。守恒条件是系统不受外力或合外力为零；而碰撞、打击、爆炸这类过程内力远大于外力、时间又短，可以近似按守恒处理，这正是它比动能定理好用的场合。动量定理 I = Δp 把力与作用时间绑在一起（I = Ft，F–t 图下的面积即冲量），一切「缓冲」都是这条公式的工程：1 kg 的小球以 10 m/s 撞墙、以 8 m/s 弹回，动量变化的大小是 18 kg·m/s，而动能只少了 18 焦——矢量的改写道数与标量的差完全是两件事；若接触时间是 0.01 s，平均冲力达 1800 N（约相当于 180 kg 压上来），垫上泡沫把作用时间拉长到 0.1 s，力就降到 180 N，跳高垫、保险杠与包装泡沫买的都是这一个数量级（缓冲公式 F = Δp/t 就是这条定理改写的）。碰撞分三档：弹性碰撞动量与动能都守恒；一般非弹性碰撞只守恒动量；完全非弹性碰撞碰后共速、动能损失最大而动量一分不少。两个常用模型：等质量弹性正碰交换速度（牛顿摆与台球的直觉来源）；静止系统分开时的反冲与人船问题里质心不动，故 m₁v₁ = m₂v₂、位移也满足 m₁x₁ = m₂x₂。火箭是最漂亮的一例——它不靠推空气（见牛顿第三定律条），喷气速度一定时可得的速度增量按齐奥尔科夫斯基公式 Δv = v_e·ln(m₀/m₁) 走对数，质量比一加就得靠多级把干重扔掉。边界两处：守恒的根据是「内力不改总动量」，与牛顿第三定律等价；高速时 p 要换成 γmv，微观粒子仍守动量但不再有确定的轨道。式中 p 为动量，m 为质量，v 为速度。",
            en: "Momentum p = mv is a vector, so the first move with its conservation law is to fix a positive direction; a minus sign means reversed, not small. The condition is that the system feels no external force or that the net external force vanishes, and in collisions, impacts and explosions the internal forces dwarf the external ones over a very short time, so conservation applies approximately - which is exactly where it beats the work-energy theorem. The impulse-momentum relation I = Δp ties force to contact time (I = Ft, the area under the F-t graph being the impulse), and every cushioning device is its engineering (the cushion formula F = Δp/t is just this relation solved for force): a 1 kg ball hitting a wall at 10 m/s and rebounding at 8 m/s changes its momentum by 18 kg·m/s while losing only 18 J of kinetic energy - two quite different books - and if contact lasts 0.01 s the average force is 1800 N, roughly the weight of 180 kg piled on, whereas stretching that to 0.1 s with foam drops it to 180 N. High-jump mats, bumpers and packaging foam all buy that single order of magnitude. Collisions come in three grades: elastic ones conserve both momentum and kinetic energy; real inelastic ones conserve only momentum; perfectly inelastic ones leave the bodies moving together with the largest kinetic-energy loss and not one unit of momentum missing. Two staple models: an equal-mass elastic head-on collision swaps the velocities (the intuition behind Newton's cradle and billiards), and in recoil or the boat-and-person problem the centre of mass stays put, giving m₁v₁ = m₂v₂ and likewise m₁x₁ = m₂x₂. The rocket is the finest case - it does not push on air (see the third-law entry), and with a fixed exhaust speed the reachable velocity gain follows the Tsiolkovsky formula Δv = v_e ln(m₀/m₁), a logarithm, which is why stacking stages to shed dry mass is the only way around it. Two boundaries: the law rests on internal forces never changing total momentum, equivalent to the third law; and at high speed p becomes γmv, while microscopic particles still conserve momentum but no longer have orbits. Symbols: p momentum, m mass, v velocity.",
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
            zh: "一切正在发声的物体都在振动，振动停止发声即止——但已经发出去的声音仍在介质里继续跑，这两件事常被混为一谈。鼓面、音叉、说话时用手轻按喉部感到的声带振动都算直接证据；把悬线的乒乓球贴向发音的音叉，球会被反复弹开，这是把看不见的振动放大成看得见的转换法（与「微小量放大与转换法」条同口径）。声波需要介质，在空气里是纵波：压强忽高忽低，形成一疏一密向前推进，介质质点只在平衡位置附近往复、并不随波迁移，传出去的是振动的形式与能量（口径同「机械振动与波」模块），所以真空不能传声。经典的真空罩内电铃实验要说清两处细节：绝对真空做不到，且铃锤与底座的固体传声仍在，因此它是「一路推理到真空」的理想实验而不是纯直接证据，结论靠的是气越稀声越弱这条趋势。三态介质都能传声：耳朵贴桌面听敲击比在空气中清楚，花样游泳者在水下听得到音乐，岸上的脚步会通过岸与水惊跑鱼群，而鲸群与潜艇的声学探测全靠水这一条通道。人耳的可听范围约 20 Hz 到 20 kHz，出了界就是次声与超声（见「超声波与次声波」条）。还有一条常考的路是骨传导：堵住双耳仍能听见自己说话与咀嚼，因为颅骨与牙齿把振动直接送进内耳，不必经过外耳道、鼓膜与三块听小骨这条空气传导的主路；贝多芬晚年靠牙咬指挥棒抵在钢琴板上「听」琴，今日的骨传导耳机与部分助听器走的是同一条路，它也是「声音既能通过空气也能通过骨骼」的最好证据。声波同光一样会反射、折射与衍射：隔墙能听到声音是衍射（声波的波长与门、墙尺寸可比，而可见光波长太小，故「闻其声而不见其人」），山谷里再回原声是反射（见「回声与测距」条）。最后记一句能量口径：声音携带能量，所以既能被用来清洗与碎石，也能在高声压下震碎玻璃（见「共振与共鸣」条）。",
            en: "Anything that sounds is vibrating, and when the vibration stops the sound stops—though sound already on its way keeps travelling through the medium, a distinction routinely blurred. The drumhead, a tuning fork, the vocal cords felt under a hand on the throat are direct evidence; a suspended ping-pong ball kicked repeatedly by a sounding fork is how an invisible vibration is magnified into a visible one (the same conversion trick as in the magnify-and-convert entry). Sound needs a medium, and in air it is longitudinal: pressure alternately rises and falls, a pattern of compressions and rarefactions moving forward while the molecules only oscillate about their own positions and never travel with the wave—what propagates is the form of the vibration and its energy (as the vibrations-and-waves module puts it), so a vacuum carries no sound. The classic bell-under-a-bell-jar demo deserves two honest caveats: a perfect vacuum is never reached, and the striker still talks to the jar through its base, so the experiment is a thought experiment extrapolated toward vacuum rather than pure direct evidence; the trend—thinner air, weaker sound—is what carries the conclusion. All three states transmit sound: a knock on a desk is clearer with your ear on the wood than in the air, synchronized swimmers hear music underwater, footsteps on a bank startle fish through bank and water, and whale and submarine acoustics depend entirely on that water channel. The audible window is roughly 20 Hz to 20 kHz, and outside it lie infrasound and ultrasound (see the ultrasound entry). One more path worth knowing is bone conduction: you still hear yourself speak and chew with both ears plugged, because skull and teeth deliver vibration straight into the inner ear, bypassing the main air route through the ear canal, the eardrum and the three ossicles; Beethoven, once deaf, bit a rod resting on the piano to listen, and modern bone-conduction headphones and some hearing aids use the same road—which is also the clearest proof that sound travels through bone as well as air. Sound reflects, refracts and diffracts like light: hearing through a wall is diffraction, since sound wavelengths are comparable to doors and walls while visible light wavelengths are far too small, which is exactly why you can hear a person you cannot see; a valley reply is reflection (see the echo-ranging entry). And a note on energy: sound carries energy, so it can clean and crush stones, and can shatter glass at high pressure (see the resonance entry).",
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
          detail: {
            zh: "声速取决于介质与温度：空气里 0 ℃ 约 331 m/s、15 ℃ 约 340 m/s，日常计算就取 340，规律近似 v=331+0.6t（t 为摄氏温度），所以夏天比冬天传声快，湿气重也略快。一般固体>液体>气体：水约 1500 m/s、海水约 1530、钢在 5000 m/s 量级。决定快慢的是弹性与惯性之比，v=√(弹性模量/密度)，而不是「越密越快」这种单变量直觉——软木密度小却比水慢得多，正是这个反例说明理由找错了变量。两处高频错误要钉住：其一，声不能与光并列比快慢，光在真空中最快且根本不需要介质，声在介质中反而最快、在真空里严格为零；其二，声速是「振动传出去」的速度，与风吹送声音、声源移动造成的频移都无关（后者见「多普勒效应」条）。测量口径有两条常用路：共鸣管法（移动水面改变空气柱长度，在最短的强响处空气柱约等于波长的四分之一）与双麦克风计时差。赛场口径也归这里：百米起跑若听枪声才按表，会计时员少记约 0.29 s（100 m 除以 340 m/s），故正式计时看烟不听声；把耳朵贴在铁轨上能比空气先听到远处列车，是固体更快的直接证明。雷电是最好的一把尺：先见闪电后闻雷，雷声每迟到约 3 s，闪电处就近在约 1 km 外。最后是超音速：马赫数 M=v/v声，物体跑过声速后压强扰动叠成激波锥，锥角满足 sinθ=1/M，M=1.5 时约 41.8°，锥扫过地面就是两声之间的音爆，因此超音速飞行多被限制在海上或干脆禁止在陆上进行；「突破音障」也不是撞上速度上限，而是阻力与加热骤然加剧的一道关口（与「相对论」里光速作为上限的说法毫无冲突，那说的是另一个极限）。式中 v 为声速，t 为摄氏温度，M 为马赫数，θ 为马赫角。",
            en: "The speed of sound depends on medium and temperature: about 331 m/s in air at 0 ℃ and 340 m/s at 15 ℃, which is the number used in everyday calculation, with the rule of thumb v=331+0.6t in Celsius, so sound runs faster in summer than in winter and slightly faster in humid air. As a rule solid > liquid > gas: roughly 1500 m/s in water, 1530 in seawater, and around 5000 m/s in steel. What sets the pace is the ratio of elasticity to inertia, v=sqrt(elastic modulus/density), not a one-variable intuition about density—cork, far lighter than water, conducts sound much more slowly, which is the counter-example showing that the wrong variable was picked. Two errors deserve nailing. Sound cannot simply be raced against light: light is fastest in vacuum and needs no medium at all, while sound is fastest in matter and is strictly zero in a vacuum. And sound speed is the speed at which a disturbance travels, unrelated to wind carrying noise or to motion-induced frequency shifts (see the Doppler entry). Two measurement routes are standard: the resonance tube, where moving the water level changes the air-column length and the first strong response marks about a quarter-wavelength, and timing the delay between two microphones. Sport gives the same numbers: starting a 100 m stopwatch on the crack of the pistol loses about 0.29 s (100 m over 340 m/s), which is why official timing watches the smoke; an ear on a rail hears the distant train through the steel before the air delivers it. Thunder is the handiest ruler—count three seconds between flash and bang and the strike is about a kilometre away. Finally the supersonic case: the Mach number is M=v/v_sound, and once an object outruns sound its pressure disturbances stack into a shock cone whose half-angle obeys sinθ=1/M, some 41.8° at M=1.5; when that cone sweeps the ground you hear the sonic boom, which is why supersonic flight is largely confined to sea routes or banned overland. Breaking the sound barrier is not hitting a speed limit but crossing a wall where drag and heating jump (and it in no way conflicts with the relativistic statement that light speed is the limit—that is a different limit altogether). In the formulas, v is the speed of sound, t the Celsius temperature, M the Mach number and θ the Mach angle.",
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
            zh: "声音的三要素各有各的物理量与主观感受，混起来是本模块第一大错。音调由频率决定，即发声体每秒振动的次数，单位赫兹：男声基频多在 100 Hz 上下、女声在 200 Hz 上下，标准音 A4 取 440 Hz，高八度就是 880 Hz——「八度」的本义是频率翻倍，而十二平均律把一个八度等分为十二个半音，相邻半音的频率比是 2 的十二次方根约 1.0595，所以定音走的是比例而不是等差。弦的基频 f=(1/2L)√(T/μ)：弦越短、越紧、越轻细，音就越高，故吉他按品是在缩短 L，拧弦钮是在改 T，一弦比六弦细是在改 μ；管乐器靠空气柱的驻波，空气柱越短频率越高，这与敲击瓶子的结论正好相反（见「共振与共鸣」条）。响度由振幅与声强决定，也随距离与耳朵的敏感度变：点声源向外 I=P/(4πr²)，远一倍则弱到四分之一，而「响度」本身是主观量，客观量化要用分贝（见「分贝」条）。音色由波形决定，也就是基频之外的泛音（谐波）成分与其强度分配，故同一音高同一响度下小提琴与钢琴一听可分，「未见其人先闻其声」认的正是音色；示波器能把三者摊开来看——疏密看频率、幅度看响度、形状看音色（这属于「微小量放大与转换法」条里的转换显示）。中国乐器有个极漂亮的实证：曾侯乙编钟（约前 433 年，湖北随州出土，全套 65 件）一钟双音，击正鼓与侧鼓得到两个相差约三度的音，靠的是钟的横截面呈合瓦形而非圆形（与「中华王朝」的考古条同口径）。最后三处易错：音调高不等于响度大，蚊鸣细尖而牛吼沉响；「高声喧哗」说的是响度，「男高音」说的是音调；听不见不等于不存在，次声与超声一样真实地传到你的耳蜗（见「超声波与次声波」条）。式中 f 为频率，L 为弦长，T 为弦的张力，μ 为弦的线密度，I 为声强，P 为声源辐射功率，r 为到声源的距离。",
            en: "The three qualities of sound each pair a measurable quantity with a sensation, and confusing them is this module's most common error. Pitch is set by frequency, the vibrations per second, in hertz: male voice fundamentals cluster near 100 Hz and female voices near 200 Hz, orchestras tune A4 to 440 Hz, and an octave above is 880 Hz—an octave literally means a doubling, while equal temperament slices each octave into twelve semitones whose ratio is the twelfth root of two, about 1.0595, so tuning proceeds by proportion, not arithmetic. A string's fundamental is f=(1/2L)√(T/μ): shorter, tighter and lighter strings sound higher, which is why fretting shortens L, pegs raise T, and the first string is thinner than the sixth to change μ; wind instruments rely on standing waves in an air column, shorter column meaning higher pitch—the opposite of what happens when you strike the bottle instead of blowing across it (see the resonance entry). Loudness follows amplitude and intensity and also varies with distance and with the ear's sensitivity: for a point source I=P/(4πr²), so doubling the distance cuts intensity to a quarter, yet loudness itself is subjective and its objective scale is the decibel (see the decibel entry). Timbre is the waveform, meaning the overtone (harmonic) content above the fundamental and how those partials are weighted, which is why a violin and a piano are instantly separable at the same pitch and level, and why you know a caller before seeing them; an oscilloscope spreads the three apart—cycle spacing reads frequency, height reads loudness, shape reads timbre (the conversion-display method of the magnify-and-convert entry). Chinese instruments supply a striking proof: the bells of Marquis Yi of Zeng (cast around 433 BCE, excavated at Suizhou, Hubei, sixty-five in the set) sound two notes an interval of about a third apart when struck at the centre or the side of each bell, because each bell's cross-section is a pointed oval rather than a circle (the same account as the archaeology entry in the dynasties project). Three traps at the end: high pitch is not high volume—the mosquito whines sharply while the ox bellows low; 'keep your voice down' speaks of loudness while 'high tenor' speaks of pitch; and being inaudible is not being absent, since infrasound and ultrasound reach your cochlea just as truly (see the ultrasound entry). In the formulas, f is frequency, L string length, T string tension, μ mass per unit length, I sound intensity, P radiated power and r distance from the source.",
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
            zh: "分贝不是响度的单位，而是「级」的单位：声强级 L=10lg(I/I₀)，参考声强 I₀ 取 10⁻¹² W/m²，接近人耳在 1000 Hz 附近的听阈；用声压写则是 L=20lg(p/p₀)，参考声压 p₀=20 μPa。之所以取对数，是因为耳朵的动态范围太大——从听阈到痛阈的声强相差约一万亿倍，线性刻度画不下，而听觉近似满足「声强每乘十倍，主观响度约翻一倍」。数值锚要背熟：0 dB 是听阈，30 dB 耳语或安静的书房，40 dB 轻声交谈，日常谈话约 50—60 dB，马路与嘈杂办公室 70 dB 上下，80—90 dB 长期暴露开始伤听力，电锯与地铁约 100 dB，120 dB 左右到达痛阈，喷气发动机近旁约 140 dB。两处计算口径必须会：其一，分贝不做普通加法，两台各自 80 dB 的机器同开只到约 83 dB，因为功率加倍只加 3 dB，真要升到 90 dB 需要约十台这样的机器；其二，+10 dB 意味着能量十倍，+3 dB 意味着能量加倍，两句话说的是同一件事。由于人耳对低频迟钝、对中频敏感，评价环境噪声要用 A 计权网络修正频率响应，写作 dB(A)，这个数与主观响度更接近；职业暴露通常按每日 8 小时 85 dB(A) 定限，且声级每升高约 3 dB 允许时间减半，而我国声环境质量标准对居住区昼间只取 55 dB(A) 量级、夜间还要再低约 10 dB（见「噪声的危害与控制」条）。两个易错：其一，「分贝大」不等于「频率高」，dB 只管强弱不管音调（与「音调·响度·音色」条分工）；其二，0 dB 不是「没有声音」，而是恰好等于听阈这个参考值。最实用的一条建议是耳机 60-60 原则：音量不超过最大值的六成、连续使用不超过六十分钟，因为内耳的毛细胞损伤后不重生，噪声性听力损失是不可逆的。式中 L 为声强级或声压级，I 与 I₀ 为声强与参考声强，p 与 p₀ 为声压与参考声压。",
            en: "The decibel is not a unit of loudness but of level: the intensity level is L=10lg(I/I₀), with the reference intensity I₀=10⁻¹² W/m², close to the ear's threshold near 1000 Hz; written with pressure it is L=20lg(p/p₀) with p₀=20 μPa. The logarithm exists because the ear's dynamic range is enormous—intensity runs some twelve orders of magnitude from threshold to pain, unschedulable on a linear scale—while hearing roughly obeys 'ten times the intensity, twice the perceived loudness'. The numbers are worth memorising: 0 dB is threshold, 30 dB a whisper or a quiet study, 40 dB soft conversation, ordinary talk 50–60 dB, streets and busy offices around 70 dB, 80–90 dB where prolonged exposure starts to harm, chain saws and metro trains near 100 dB, pain threshold about 120 dB, a jet engine nearby some 140 dB. Two arithmetic points must be mastered. Decibels do not add normally: two machines each at 80 dB together reach only about 83 dB, since doubling the power buys 3 dB, and getting to 90 dB would take roughly ten such machines. And +10 dB means ten times the energy while +3 dB means double—two ways of saying the same thing. Because the ear is dull at low frequencies and sharp in the mid band, environmental noise is rated through an A-weighting network that corrects the frequency response and is written dB(A), the number closer to subjective loudness; occupational limits typically fix 85 dB(A) for an eight-hour day and halve the permitted time for every ~3 dB increase, while China's ambient standard sets only around 55 dB(A) daytime in residential zones, some 10 dB lower at night (see the noise-control entry). Two traps: a higher decibel is not a higher frequency—the dB scale measures strength, not pitch (the division of labour with the pitch-loudness-timbre entry); and 0 dB does not mean silence, only equality with the reference threshold. The single most useful rule is 60-60 for headphones: no more than sixty per cent of maximum volume, no more than sixty minutes at a stretch, since damaged inner-ear hair cells never regenerate and noise-induced hearing loss is permanent. In the formulas, L is the intensity or pressure level, I and I₀ the intensity and its reference, p and p₀ the sound pressure and its reference.",
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
            zh: "波源与观察者相互接近或远离时，接收到的频率与波源发出的频率不同，这就是多普勒效应：接近时音调变尖，远离时变低，而且在波源掠身的瞬间发生骤降——「一高一低一顿挫」既是判据也是最易辨识的听感。口径要精确：真正改变的是单位时间内到达观察者的波峰数目，波源自身发出的频率没有变。声波因为需要介质，「波源动」与「观察者动」并不等价，要分别写成 f′=(v+v观)/(v−v源)·f（接近取加、远离取减），这正是它与光的版本最主要的区别。算一遍数量级就明白耳朵为何如此敏感：声速 340 m/s，救护车鸣 1000 Hz、以 30 m/s（约 108 km/h）驶来，接近时约 1097 Hz、离开时约 919 Hz，两头相差约 180 Hz。只有沿视线方向的速度分量起作用，掠过的那一刻径向速度由正转负，纯粹的横向运动并不产生经典频移。应用比听感宽得多：交警测速与气象雷达其实用电磁波（原理同源，见「交变电流与电磁波」条），回波的频移正比于径向速度，气象雷达因此能从回波里读出风场结构、识别龙卷的旋转特征；医学彩超把超声的多普勒频移换算成血流速度与方向；声呐则同时用它判断目标是接近还是离开（与「回声与测距」条分工：那条管时间，本条管频率）。天文上最重要的红移必须说清：遥远星系的光谱线整体向红端移动，哈勃发现退行速度与距离成正比，故越远红移越大（见「宇宙膨胀与红移」条）——但宇宙学红移不是普通的经典多普勒，而是光在膨胀的空间里波长被一同拉长，把「星系在空间中飞奔」直接套上去是错的；狭义相对论还给出仅有运动学时间膨胀造成的横向多普勒效应，它本身已是相对论成立的实验证据之一（见「时间膨胀」条）。系外行星的第一批确认也靠它：恒星被行星带着轻微摆动，其谱线周期性地蓝移红移，这套径向速度法就是全部依据。式中 v 为介质中的声速，v观、v源 为观察者与波源沿视线方向的速度分量，f 为波源频率，f′ 为接收频率。",
            en: "When source and observer approach or separate, the frequency received differs from the frequency emitted: that is the Doppler effect—pitch climbs as the ambulance nears, drops as it leaves, and the change snaps over at the instant it passes, so 'up, down, and a break in between' is both the test and the most recognizable sound. Precision matters: what changes is how many wavecrests arrive per second, not what the source emits. Because sound needs a medium, 'moving source' and 'moving observer' are not equivalent and must be written separately as f′=(v+v_obs)/(v−v_src)·f, plus when approaching and minus when receding—the key structural difference from the light version. One worked number explains the ear's sensitivity: take sound at 340 m/s and a siren at 1000 Hz on a vehicle running 30 m/s (about 108 km/h); approaching it reads near 1097 Hz, receding near 919 Hz, a gap of some 180 Hz. Only the component along the line of sight counts; at the moment of passing the radial velocity flips sign, and purely lateral motion produces no classical shift. Applications reach far beyond the ear: speed radar and weather radar actually use electromagnetic waves (same principle, see the em-waves entry), where the shift is proportional to radial velocity, letting meteorologists read wind fields and spot a tornado's rotation; medical colour Doppler converts ultrasonic shifts into blood speed and direction; sonar uses it to tell whether a target closes or opens (the division with the echo-ranging entry: that one measures time, this one frequency). The astronomical redshift needs careful wording: spectral lines of distant galaxies sit toward the red, and Hubble found recession speed proportional to distance, so farther means redder (see the expansion-and-redshift entry)—yet cosmological redshift is not ordinary classical Doppler but light whose wavelength is stretched along with expanding space, so picturing galaxies sprinting through space is wrong. Special relativity adds a transverse Doppler effect arising purely from time dilation, itself among the evidence for relativity (see the time-dilation entry). The first confirmed exoplanets came the same way: a star tugged into a small wobble shifts its lines back and forth periodically, and that radial-velocity method is the entire evidence. In the formula, v is the speed of sound in the medium, v_obs and v_src the observer and source velocity components along the line of sight, f the emitted frequency and f′ the received frequency.",
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
            zh: "每个系统都有自己的固有频率，当驱动频率接近它时，外界每周期都恰好在最对的时机推一把，振幅急剧放大，这就是共振。用受迫振动的语言说：稳定后物体按驱动力的频率振动，而驱动力频率等于固有频率时振幅出现峰值，阻尼越小峰越高越尖——这是与「机械振动与波」模块共用的口径，本条只管声与工程。声音世界里的共振就是共鸣：把两只同频率的音叉相对放置，敲响一只，另一只上的纸人便会跳动，能量隔着空气被同一频率接走；提琴、吉他与胡琴这类弦乐器，它们的琴身、琴箱与琴筒都是共鸣箱，把弦那点微弱能量高效交给空气；音箱上的倒相孔让箱内空气柱一起辐射，低音因此更足；笛、笙、唢呐、口琴的发声体是空气柱的驻波（与「机械振动与波」模块分工：那条讲驻波如何形成，本条讲它如何让声音变大）。有一个必考的对照：对着瓶口吹气，振的是瓶内空气柱，水加得越多空气柱越短、音调越高；而敲击瓶子，振的是瓶体与水，水越多频率越低——同一只瓶子，「吹」与「敲」的结论正好相反，这是本条最狠的一处易错。共振的坏处同样具体：军队过桥要便步而不是齐步，机器底座要配重与减振，高耸建筑与大桥要装调谐阻尼器，因为一旦驱动频率撞上结构固有频率，振幅能长到破坏。常被引作共振教材的是 1940 年美国塔科马海峡大桥的风毁（主跨 853 m，风速只约 19 m/s 就把桥面扭成波浪），严格说它属于气动弹性颤振——结构从风里自取能量，而不是被一个简谐外力推动，把「风频恰好等于固有频率」当成解释其实不准确（「驻波与共振」条按传统口径将其列为共振例，此处补一句机制差别）。另两个常见说法也要校正：高音「唱碎」玻璃杯靠的确实是声频与杯子固有频率吻合、振幅超过强度极限，属真共振；而微波炉加热并不依赖所谓「水分子共振」，家用 2.45 GHz 远高于水的介电弛豫主损耗频段，实质是极性分子在交变场里反复转向、互相摩擦生热（口径与「交变电流与电磁波」条一致，这里专门纠一处流传很广的误传）。声学里还有一支精密的共振在身体里：耳蜗基底膜像一排按位置调好频率的接收器，不同处对不同频率响应，把频谱分析直接在空间上摊开（这套「按位置分频」正是耳朵能分辨音调的原因）。",
            en: "Every system has its own natural frequency, and when a drive approaches it, the outside world pushes at exactly the right moment once per cycle and the amplitude swells: that is resonance. In forced-vibration language the object settles into the driving frequency, and amplitude peaks where driving equals natural frequency, the peak taller and narrower the less damping—this is the shared account with the vibrations-and-waves module, and here we keep to sound and engineering. In the world of sound, resonance shows up as acoustic sympathy: two forks of the same frequency set facing each other, strike one and the paper rider on the other dances, energy carried across the air by a matching frequency. The bodies of string instruments—a violin, a guitar, the resonator of a Chinese two-string fiddle—are all soundboards handing the string's feeble energy efficiently to the air; the port on a loudspeaker lets the enclosed air column radiate too, which is why bass gains body; flutes, sheng, suonas and harmonicas voice themselves through standing waves in an air column (division with the standing-wave entry: there the standing wave is explained, here what it does to loudness). One contrast experiment is a classic trap: blow across a bottle and the air column vibrates, so more water means a shorter column and a higher pitch; strike the same bottle and glass plus water vibrate, so more water means a lower pitch—opposite conclusions from one bottle depending on whether you blow or hit. The harms are just as concrete: troops break step on bridges, machine bases get counterweights and isolation, towers and long spans carry tuned dampers, because once the drive hits a structural natural frequency the amplitude can grow to failure. The textbook casualty is the Tacoma Narrows Bridge of 1940 (main span 853 m, destroyed by a modest wind of some 19 m/s that twisted the deck into waves); strictly it was aerodynamic flutter—the structure feeding on the wind itself rather than being pushed by a harmonic force—so the neat story 'the wind matched the natural frequency' is not accurate (the standing-wave entry lists it under the traditional heading, and the mechanism gap is noted here). Two more claims deserve calibration: shattering a wine glass with the right high note really is resonance, the sound matching the glass's natural frequency until amplitude exceeds its strength; microwave heating, however, does not rest on a supposed 'water-molecule resonance'—household 2.45 GHz sits far above water's main dielectric relaxation loss band, and the real mechanism is polar molecules tumbling in an alternating field and frictional heating (as the em-waves entry says, and this corrects a very widespread misstatement). One last precise resonance lives inside you: the cochlea's basilar membrane works as a bank of receivers tuned by position, spreading the spectrum across space, which is also how the ear tells one pitch from another.",
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
            zh: "人耳的可听范围大约是 20 Hz 到 20 kHz，高出上界是超声波、低出下界是次声波，两者都不是「声音太小」而是频率出了界（口径同「音调·响度·音色」条）。超声的长处来自波长短：方向性好、能聚成束、穿透力强、在界面上反射明显。医学 B 超用 2—18 MHz 的脉冲超声，靠各组织界面的回波时间与强度成像，本质上就是回声测距的一种（见「回声与测距」条）；关键量是声阻抗 Z=ρc，失配越强烈反射越强，肺里的气与骨骼界面几乎把能量全部弹回，所以超声看不到含气器官与骨内结构，检查时涂的耦合凝胶正是为挤掉探头与皮肤之间的空气。工业上超声用于探伤（裂纹回波定位）、测厚、液位计与塑料与金属的焊接；超声清洗靠液体里空化气泡瞬间崩溃产生的局部冲击，把精密零件与珠宝的污物剥下来；雾化器把药液打散成微米级雾滴也属同族应用。体外碎石常被归进「超声」，其实它用的是电火花或压电装置产生的冲击波——压力陡升的窄脉冲——经组织界面反射与聚焦后打在结石上把它震裂，属冲击波医学而不是超声成像（与「声速」条的激波口径相接）。动物一支比工程用得更早也更精：蝙蝠发出 20—200 kHz 的超声做回声定位，能在全黑中于数米外捉住飞虫；海豚的咔哒声高至约 150 kHz，可探鱼群与地形；所谓「狗哨」发 20—40 kHz，人听不见而狗听得清清楚楚；猫与啮齿类的听觉上限也远在人之上。次声这一侧的特点是波长极长、衰减极小，能绕地球传得很远：地震、火山、雪崩、强风暴与核爆炸都发出次声，因此次声台站既能预警也能用于监测核试验；大象与鲸以十几到二十几赫兹的次声在数公里外通话，人听不见却常在脚底感到一阵发麻。还有一处工程上的麻烦：正因为人体胸腔与腹腔器官的固有频率在几赫兹量级（约 4—8 Hz），强度够大的次声即使不觉其响也会引起不适、恶心与器官振动，所以潜艇、飞行器、风力机与地下管网的低频噪声评估必须把次声段单独拿出来看。最后划一条常被混的界线：「超声」说的是频率高于 20 kHz 的声波，「超音速」说的是速度大于声速，两者只是中文相近，物理内容毫无关系（见「声速」条的音爆）。式中 Z 为声阻抗，ρ 为介质密度，c 为声在该介质中的传播速度。",
            en: "The audible window runs roughly 20 Hz to 20 kHz: above the top lies ultrasound, below the bottom infrasound, and in neither case is the sound merely quiet—the frequency has left the band (as the pitch-loudness-timbre entry insists). Ultrasound profits from short wavelengths: it is directional, focusable, penetrating, and reflects sharply at interfaces. Medical B-scans use pulses of 2–18 MHz and build images from the timing and strength of echoes at tissue boundaries, which is really one species of echo ranging (see the echo-ranging entry); the governing quantity is acoustic impedance Z=ρc, and the greater the mismatch the stronger the reflection, so air in the lungs and bone surfaces throw nearly all the energy back—which is why ultrasound cannot see into gas-filled organs or through bone, and why the gel smeared on the skin exists at all: it expels the air between probe and body. Industry uses ultrasound for flaw detection (locating echoes from cracks), thickness and level gauging, and welding of plastics and metals; ultrasonic cleaning relies on the local shock of collapsing cavitation bubbles in a liquid to strip soil from precision parts and jewellery, and nebulizers that shred medicine into micrometre droplets belong to the same family. Extracorporeal lithotripsy is often filed under 'ultrasound' but is really shock-wave medicine: a narrow pressure spike generated by spark or piezoelectric device, reflected and focused through tissue boundaries onto the stone, which it fractures (matching the shock discussion in the sound-speed entry). Animals got there long before engineering and do it better: bats emit 20–200 kHz and catch insects in total darkness metres away; dolphins click up to about 150 kHz to read shoals and seabed; the so-called silent dog whistle emits 20–40 kHz, inaudible to us and perfectly clear to a dog; cats and rodents likewise hear far above our ceiling. Infrasound, at the other end, has enormous wavelengths and tiny attenuation, so it circles the globe: earthquakes, volcanoes, avalanches, severe storms and nuclear explosions all radiate it, which is why infrasound arrays serve both early warning and treaty monitoring; elephants and whales converse a few kilometres away at ten-odd to twenty-odd hertz, felt by people as a tingling through the floor rather than heard. One engineering nuisance belongs here too: because the organs of the human chest and abdomen have natural frequencies of a few hertz (roughly 4–8 Hz), intense infrasound causes discomfort, nausea and organ vibration without ever sounding loud, so low-frequency noise from submarines, aircraft, wind turbines and pipe networks must be assessed on the infrasonic band separately. Draw the last line carefully: 'ultrasonic' means a frequency above 20 kHz, 'supersonic' means a speed above the speed of sound; the two Chinese terms look alike and have nothing in common (see the sonic-boom passage in the sound-speed entry). In the formula, Z is acoustic impedance, ρ the medium density and c the sound speed in that medium.",
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
            zh: "人耳要把回声与原声区分开，两者须相隔约 0.1 s 以上，在空气中对应障碍距声源约 17 m；比这更近的反射声只与原声叠在一起使听感更丰满，音乐厅正是靠这类早期反射声增强音色，而空旷大厅里的长延迟反射才成为恼人的回声。测距公式 s=vt/2：声呐据此测海深、探鱼群，超声测厚与“B 超”成像同属一理。太空与月球表面不能用回声——真空不传声，只能改用电磁波测距。回声与混响要分开：同一个声源的声被墙面、天花板与座椅反复反射，若回来的延迟短于约 0.1 s 且强度足够，就与原声黏在一起把听感延长，这叫混响，音乐厅追求的正是它。混响时间 T60 定义为声能衰减 60 dB 所需的时长，与房间容积成正比、与室内总吸声量成反比（T60=0.161V/A，V 取立方米、A 取平方米），因此演讲厅通常控制在 1 s 上下、音乐厅可到 1.5—2 s，而体育馆这类硬表面大空间常超过 2 s，讲话便糊成一团。雷声之所以是隆隆一串而不是一声，靠的正是云底、地面与山壁的多次反射加上不同路径的长度差。人的听觉也吃回声的信息：双耳效应利用声音到达两耳的时间差与强度差判断方位，闭上单耳听声明显失去方向感，立体声录音与耳机的双声道就是把这一差值录下来重放。工程口径再补两句：声呐常把测距与测速同机使用，前者靠时间、后者靠频率（见「多普勒效应」条）；而需要极高精度的场合一律不用声——地月距离约 38 万公里，靠激光器打向阿波罗宇航员留下的角反射器测到（见「光的反射」条），精度可达厘米级；蝙蝠与经过训练的失能者用口鼻点击做回声定位，是同一原理的生物版本。式中 V 为房间容积，A 为室内总吸声量，T60 为混响时间。",
            en: "For the ear to separate an echo from the original sound, the gap must exceed about 0.1 s, which in air means a reflector some 17 m away; closer reflections merge with the direct sound and simply enrich it, which is exactly what concert halls exploit with early reflections, while long-delayed bounces in bare halls become intrusive echoes. The ranging formula is s=vt/2: sonar sounds the depth of the sea and locates shoals this way, and ultrasonic thickness gauging and B-scan imaging follow the same principle. Echoes fail in space and on the Moon, since a vacuum carries no sound—radar and laser ranging take over there. Echo and reverberation must be told apart. Sound bounces repeatedly off walls, ceiling and seats, and when the delay falls below about 0.1 s at sufficient strength it merges with the original and simply prolongs the impression—that is reverberation, and concert halls are tuned for it. Reverberation time T60 is defined as the interval needed for sound energy to decay 60 dB; it scales with room volume and inversely with the total absorption inside (T60=0.161V/A, V in cubic metres and A in square metres), which is why lecture halls aim near 1 s, concert halls reach 1.5–2 s, and hard-surfaced arenas often exceed 2 s and turn speech into mush. Thunder rumbles rather than cracks precisely because of many reflections from cloud base, ground and hillsides plus the spread in path lengths. Human hearing also feeds on echo information: binaural effect uses the time and intensity differences between the two ears to fix direction, close one ear and orientation degrades badly, and stereo recording plus headphones merely capture and replay that difference. Two engineering notes: sonar routinely combines ranging with speed measurement, the first from time and the second from frequency (see the Doppler entry); and where extreme precision is required, sound is abandoned altogether—the 384,000 km Earth–Moon distance is measured by lasers bounced off the corner reflectors the Apollo crews left on the surface (see the reflection entry), to within centimetres. Bats, and trained blind people who click with tongue or nose, are the biological versions of the same principle. In the formula, V is room volume, A the total interior absorption and T60 the reverberation time.",
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
            zh: "乐音与噪声的界限不在频率高低而在波形是否规则，长期处于 85 dB 以上会损伤听力，噪声作业场所的暴露限值通常就定在这一量级附近，睡眠则易被三四十贝的间断声响干扰。控制分三个环节：在声源处减弱（消声器、低噪机械、城区禁鸣），在传播过程中阻断（声屏障、吸声材料、双层玻璃、绿化带），在人耳处防护（耳塞、防声帽）。与分贝一条的分工是：那条讲如何量度，本条讲危害在哪、从何处下手治理。再补三笔可操作的口径。第一笔是吸声与隔声不是一回事：多孔材料（矿棉、泡沫、织物、穿孔吸声板）靠空气在细孔里摩擦把声能转成热，减的是室内反射与混响，对挡住隔壁的声音几乎无用；隔声要靠面密度与密封，厚重的墙、双层窗、堵死门缝与穿管孔洞才是拦声主力，「鸡蛋托贴墙能隔声」是流传很广的误解，它只轻微改变反射。中空玻璃两层之间若是真空，固体传声通道被切断、隔声本该更好，但结构与成本代价大，故实际产品多用干燥空气层。第二笔是治理的次序：先改声源（低噪机械、消声器、城区禁鸣、限速以降胎噪与风噪），再拦传播（声屏障、隔声窗、绿化带、把噪声车间与居住区拉开距离），最后才是接收端防护（耳塞、防声帽、限时暴露），次序倒过来则成本最高而收效最差；消声器自身还分阻性（靠吸声材料）与抗性（用共振腔把某些频率抵消，见「共振与共鸣」条）。第三笔是量的口径：环境噪声用 A 计权与等效连续声级评价，把起伏不定的噪声按能量平均成一个数，居住区昼间限值大致在 55 dB(A) 量级、夜间再低约 10 dB，职业暴露则按每日 8 小时 85 dB(A) 定限、声级每高约 3 dB 允许时间减半（见「分贝」条）。噪声被称作能量污染，正因为它不留残余——声停即除，这是它与水与空气污染最大的差别，也是治理最容易见效的理由。危害还要补两处：除听力之外，长期高噪声还牵连睡眠、心血管与儿童阅读成绩，低频与次声即便不觉其响同样致不适（见「超声波与次声波」条）；而对个人来说最便宜的一条是耳机 60-60 原则——音量不过六成、连续不过六十分钟。",
            en: "The boundary between music and noise lies not in pitch but in whether the waveform is regular; sustained levels above 85 dB damage hearing, which is roughly where occupational exposure limits sit, while intermittent sounds of only thirty to forty decibels can break sleep. Control acts at three points—at the source (silencers, quieter machines, horn bans), along the path (barriers, absorptive lining, double glazing, tree belts), and at the ear (plugs, muffs). Where the decibel entry explains the measuring scale, this one asks what the harm is and where to attack it. Three practical distinctions round out the topic. Absorption is not insulation: porous materials (mineral wool, foam, fabric, perforated panels) turn sound into heat by friction in their pores, cutting indoor reflection and reverberation, but they do almost nothing to stop noise arriving from the next room; blocking needs surface mass and airtightness—heavy walls, double glazing, sealed door gaps and pipe penetrations—and the folk belief that egg cartons glued to a wall insulate sound is simply wrong, they only modify the reflection mildly. An evacuated cavity between two window panes would, by cutting the solid path, insulate better still, but structure and cost keep commercial products on dry air layers instead. Order of attack matters: fix the source first (quieter machines, silencers, horn bans, speed limits that cut tyre and wind noise), then block the path (barriers, insulated windows, tree belts, separating noisy plant from housing), and only then protect the receiver (ear plugs, muffs, exposure limits); reverse the order and you pay the most for the least. Silencers themselves split into resistive (absorptive lining) and reactive (resonant cavities cancelling chosen frequencies, see the resonance entry). Keep the measuring conventions straight: environmental noise is rated with A weighting and the equivalent continuous level, which averages a fluctuating noise into one energy-based number, with residential daytime limits around 55 dB(A) and night some 10 dB lower, while occupational exposure is fixed at 85 dB(A) over eight hours with permitted time halving for roughly every 3 dB rise (see the decibel entry). Noise is called an energy pollutant precisely because it leaves no residue—switch it off and it is gone—which is both its biggest difference from water and air pollution and the reason control shows results so quickly. Two last harm notes: beyond hearing, chronic noise is implicated in sleep disturbance, cardiovascular strain and children's reading performance, and low-frequency and infrasonic noise causes discomfort even when it never sounds loud (see the ultrasound entry); and the cheapest personal rule of all is 60-60 for headphones—no more than sixty per cent volume, no more than sixty minutes at a stretch.",
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
            zh: "光在同种均匀介质中沿直线传播，影子、小孔成像、日食与月食都由它而来。条件有两条，同种且均匀，缺任何一条光都可能拐弯：大气密度随高度连续变化，星光穿过大气会被连续折射，太阳实际还在地平线下约 0.5° 时就已经能被看见，海市蜃楼同样是密度梯度造的弯（详见折射一条）。小孔成像是这条最干净的证据——孔足够小时屏上出现倒立的像，像的大小与屏到孔的距离成正比，把屏推远就放大像；孔太大时一个物点会摊成一片投影区，像反而糊成光斑，而孔极小时衍射又把它抹开，所以「小孔」其实存在一个中间最优值。墨家《墨经》在公元前四五世纪就记下小孔成像的「景倒」，是现存最早的光学实验记录之一。影子还分本影（完全照不到）与半影（只被部分遮住），日食的类型正由观察者落在哪个影区决定：本影扫过的窄带是日全食，本影延长线（伪本影）带上是日环食，半影区只看到日偏食；月食是月亮走进地球的本影，一次可同时被半个夜半球看到，所以「此地日全食、彼地看不见」并不矛盾。工程上也把直线传播当尺子用：激光准直给隧道掘进与砌墙导向，射击的「缺口—准星—目标」三点一线、排队看齐、用杆影相似三角形测楼高与井深。真空中的光速 c≈3.00×10⁸ m/s，是宇宙速度上限；空气中几乎不变（n≈1.0003，约 29.99 万公里每秒），水中约 2.26 万公里每秒，玻璃中约 20 万公里每秒。光年就是这一速度走一年的距离，约 9.46×10¹⁵ m，是长度单位而不是时间单位。最后提醒：严格说没有一条光线绝对直，衍射总会在影子边缘留下条纹，只是在宏观尺度上偏离小到可以忽略——「直线传播」是几何光学的第一条近似，而不是光的本性。",
            en: "Light travels in straight lines within a single uniform medium, and shadows, pinhole images, solar and lunar eclipses all follow from this. Two conditions are bundled here—same medium, and uniform—and if either fails light can bend: air density changes continuously with height, starlight is refracted all the way down, so the Sun is already visible when it is still some 0.5° below the horizon, and mirages are the same gradient trick (see the refraction entry). A pinhole camera is the cleanest evidence: with a small enough hole the screen shows an inverted image whose size grows in proportion to screen distance, so pushing the screen back magnifies it; open the hole too wide and each object point smears into a patch, while a tiny hole lets diffraction blur it again—there really is an optimum hole size. The Mohist Canon of the 5th–4th centuries BCE recorded the inverted image of a pinhole, among the earliest optics experiments on record. A shadow has two zones, the umbra where light is wholly blocked and the penumbra where it is partly blocked, and which zone an observer stands in decides the eclipse type: a narrow track of umbra gives a total solar eclipse, the extension of the cone (antumbra) gives an annular one, and the penumbra only shows a partial eclipse; a lunar eclipse is the Moon entering Earth's umbra and is visible to the whole night hemisphere at once, so 'total here, invisible there' is not a contradiction. Straight-line propagation is also used as a ruler: laser alignment guides tunnel boring and wall laying, 'notch, bead and target in one line' governs rifle aiming, queues line up by the same logic, and shadow similar-triangles measure building heights and well depths. The vacuum speed of light c≈3.00×10⁸ m/s is the cosmic limit; in air it barely changes (n≈1.0003, about 299,900 km/s), in water it is roughly 226,000 km/s and in glass 200,000 km/s. A light-year is the distance covered at that speed in one year, about 9.46×10¹⁵ m—a unit of length, never of time. One caveat: no ray is ever perfectly straight, diffraction always fringes a shadow edge, and 'rectilinear propagation' is the first approximation of geometric optics rather than the nature of light.",
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
          detail: {
            zh: "反射定律只有三句：反射光线与入射光线、法线在同一平面内，分居法线两侧，反射角等于入射角。这里的角一律是对法线量的而不是对镜面量的——说「光线与镜面成 30°」时入射角其实是 60°，这是本条最高频的错误。镜面自己转过 θ，反射线会转过 2θ，因为入射角本身就变了 θ；光路可逆，逆着反射线打回去必沿原路出射，解题与角反射器都靠这一句。反射分两类：平静水面与抛光金属是镜面反射，平行束被整束按同一方向弹回，所以只在特定角度刺眼；纸、墙、布与粉笔字是漫反射，微观上每一点都严格守反射定律，只是各点法线方向杂乱，把光散向四面八方——正因如此我们从任何角度都看得见本身不发光的物体，而「漫反射不遵守反射定律」是彻底的错话。黑板某处反光看不清字，就是那一片被磨得太光滑而起镜面反射，办法是磨砂或涂白，不是擦得更亮；投影幕与电影幕用粗糙白布，一为漫向全场，二为不改变颜色（见「物体的颜色」条）。两面平面镜夹角为 θ 时成 360/θ−1 个像（θ=90° 得 3 个、60° 得 5 个），万花筒正是靠它把碎片复制成对称图案。相互垂直的两面镜有个极有用的性质：出射线总与入射线平行而方向相反；三块两两垂直的镜面组成的角反射器更进一步——无论光从哪个方向来都被沿原路送回。自行车尾灯、道路标志与反光服里的微棱镜膜、卫星上的角反射器阵列都是它，阿波罗计划留在月面的反射器至今用于激光测距；雷达与声呐也挂角反射器让目标在屏幕上更醒目。潜望镜与光路转向可用平面镜，也可用全反射棱镜（后者不依赖镀层、更耐久，见「全反射」条）。最后一条常与偏振连着：自然光以约 56°（玻璃的布鲁斯特角）掠射时，反射的那部分是部分偏振光，这就是偏振太阳镜能压掉路面与水面反光的根据（见「偏振」条）。",
            en: "The law of reflection has just three clauses: the reflected ray, the incident ray and the normal lie in one plane; the first two sit on opposite sides of it; and the angle of reflection equals the angle of incidence. Every angle here is measured from the normal, never from the surface—say 'the ray makes 30° with the mirror' and the incidence angle is really 60°, the single most common slip in this topic. Rotate the mirror itself by θ and the reflected ray swings by 2θ, because the incidence angle changed by θ on its own. Light paths are reversible: send a ray back along the reflected direction and it exits along the original one, a fact used both in problem-solving and in corner reflectors. Reflection comes in two kinds. Still water and polished metal give specular reflection, sending a parallel bundle off in one direction, which is why it dazzles only from particular angles. Paper, walls, cloth and chalk letters give diffuse reflection: microscopically every point obeys the law exactly, but their normals point every which way, so light is scattered into all directions. That scattering is precisely why we can see non-luminous objects from anywhere, and 'diffuse reflection breaks the law' is simply wrong. When a glare patch on a blackboard hides the writing, that spot has been polished smooth into specular reflection; the fix is to roughen or whiten it, not to wipe it shinier. Projection and cinema screens are coarse white cloth both to scatter light across the room and to leave colours unchanged (see the colour-of-objects entry). Two plane mirrors set at an angle θ produce 360/θ−1 images (three at θ=90°, five at 60°), which is how a kaleidoscope multiplies its chips into symmetric patterns. Two mutually perpendicular mirrors have a very useful property: the outgoing ray is always parallel to the incoming one, merely reversed. Three mirrors pairwise perpendicular—a corner reflector—go further and return light along its own path from any direction. Bicycle tail lights, the micro-prism film in road signs and reflective clothing, corner reflectors on satellites, and the arrays the Apollo missions left on the Moon (still used for laser ranging) are all this; radar and sonar targets carry them too. Periscopes and beam turns may use plane mirrors or total-reflection prisms, the latter needing no coating and lasting better (see the total internal reflection entry). Finally, reflection links to polarization: at about 56° for glass (Brewster's angle) the reflected part is partially polarized, which is why polarized sunglasses can suppress glare from roads and water (see the polarization entry).",
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
          detail: {
            zh: "平面镜成正立、等大的虚像，像与物关于镜面对称：二者的连线垂直镜面，像到镜面的距离等于物到镜面的距离。所谓虚像，是反射光线反向延长线的交点，不是实际光线会聚之处，因此光屏接不住——这条判据同样适用于所有镜子与透镜的实像／虚像之分，也是本模块一切作图题的入口。常被背诵的「左右相反」其实不准确：镜子交换的是沿法线方向的前后，并不真的分左右；人站着时前后颠倒被大脑读成左右互换，若仰面躺着照镜，颠倒就跑到了上下方向。平面镜成像的实验口径要注意三处：用透明玻璃板代替平面镜，是为了能在镜前看到像同时看到板后的蜡烛，从而定出像的位置；玻璃板必须竖直，否则像与桌面蜡烛错开；比较像与物大小用「等效替代」——拿一支完全相同的蜡烛在板后移动到与像重合（此法与曹冲称象同属替代思想，见「等效替代法」条）。两个高频易错：其一，人走近镜子时像的大小不变，始终与人等高，只是视角变大让人觉得「像更大更清楚」，镜子尺寸不改变像的比例，而能照到全身只需身高一半高的镜子，由两条边缘光线作图即得；其二，水中的「倒影」是平面镜成像（水平镜面使上下颠倒），与「影子」完全是两件事，一个是像、一个是光被遮挡后照不到的区域。面镜家族还有两位：凸面镜发散光束、总是成正立缩小的虚像，却把视野撑大，故汽车后视镜与路口反光镜用它，并配上「镜中物体比看上去更近」的警告语；凹面镜会聚光束，物距足够远时成倒立实像，可作太阳灶、手电筒与车灯的反光碗，剃须镜则利用人靠近焦点后成放大虚像。哈哈镜就是曲率不规则的这两种面镜。潜望镜与穿衣镜属于平面镜成像的应用，而万花筒与光路转向属于反射定律的应用（见「光的反射」条）。",
            en: "A plane mirror forms an upright virtual image exactly the size of the object, with object and image symmetric about the mirror surface: the line joining them is perpendicular to the surface and the image distance equals the object distance. A virtual image is where the backward extensions of the reflected rays meet, not where rays actually converge, so no screen can catch it—the same criterion separates real from virtual images for every mirror and lens in this module and opens every construction problem. The familiar 'left–right reversal' is loose speech: a mirror swaps front and back along its normal, not left and right. Standing upright we read that as a sideways flip; lie on your back in front of the mirror and the reversal moves to the vertical. Three laboratory points matter: a clear glass plate replaces a mirror so you can see both the image and the candle behind the plate and thus locate the image; the plate must stand perfectly vertical or the image will drift off the desk candle; and comparing sizes uses equivalent substitution—move an identical candle until it coincides with the image (the same reasoning as Cao Chong weighing the elephant, see the equivalent-substitution entry). Two frequent errors. First, walking toward a mirror does not enlarge you: the image stays exactly your height, and a larger viewing angle only makes it look bigger (a mirror half your height already shows your whole body, straight from two edge rays). Second, a reflection in water is plane-mirror imaging with a horizontal surface, which flips things top-to-bottom, and has nothing to do with a shadow—one is an image, the other a region light cannot reach. The curved members of the family: a convex mirror diverges the beam and always gives an upright, diminished virtual image while widening the field, hence rear-view mirrors and corner traffic mirrors, complete with the warning that objects are closer than they appear; a concave mirror converges, forms an inverted real image when the object is far off—solar cookers, torch and headlamp reflectors—and shows an enlarged virtual image once you move inside its focus, which is the shaving mirror. Funhouse mirrors are simply these two with irregular curvature. Periscopes and dressing mirrors apply plane-mirror imaging, while kaleidoscopes and beam turning apply the law of reflection (see the reflection entry).",
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
            zh: "光斜射到两种介质的界面时会同时发生反射与折射，折射定律有两句：折射光线与入射光线、法线共面且分居两侧；n₁sinθ₁=n₂sinθ₂。折射率定义为 n=c/v，真空中恒为 1，空气约 1.0003，水约 1.33，普通玻璃约 1.5，钻石约 2.42，因此光在水里约 22.6 万公里每秒、玻璃里约 20 万公里每秒。由定律立刻得到方向口诀：从光疏进入光密（n 小的进到 n 大的）时折射角小于入射角，光线偏向法线，反之偏离线；正入射时方向不变，只变速度与波长。这里有个必须钉住的分工：折射时频率不变，波速与波长同步变小（v=fλ，频率由光源决定），所以颜色由频率定而不是由波长定。生活中的折射几乎都是视深问题：从岸上看水里的鱼，看到的鱼比真的浅（近似 h′=h/n），叉鱼要瞄准看到的下方；反之从水下看岸上的物体，看到的比真的更高，潜水员头顶的世界被压成一个约 97.6° 的圆窗（其边界正是全反射的临界角，见下条）；插进水里的筷子看起来在水面处折断，玻璃砖后的字被平移，都是同一件事。海市蜃楼则是连续折射：近地面空气热而稀、上层冷而密，光一路弯向密度大的一侧，远处景物的像被抬到空中（上现蜃景常见于海面与雪原，下现蜃景常见于沙漠与柏油路面）；大气折射让日出提前、日落推迟几分钟，也让太阳盘面略扁。历史上惠更斯 1678 年以子波原理推出折射定律，把「光走哪条路」变成「波面上每点都是新波源」的作图法，这是波动说的第一次胜利（见「惠更斯原理」条）。测量口径也要记：中学用插针法或玻璃砖画光路测 n，量的是角度而不是距离，公式的易错点是角必须对法线量。式中 n 为折射率，c 为真空光速，v 为光在该介质中的速度，θ₁、θ₂ 为入射角与折射角，h 与 h′ 为实际深度与看起来的深度。",
            en: "When light strikes an interface obliquely it is both reflected and refracted. The law of refraction has two parts: the refracted ray, the incident ray and the normal lie in one plane on opposite sides of it; and n₁sinθ₁=n₂sinθ₂. The refractive index is n=c/v: exactly 1 in vacuum, about 1.0003 in air, 1.33 in water, 1.5 in ordinary glass, 2.42 in diamond, so light runs at roughly 226,000 km/s in water and 200,000 km/s in glass. The direction rule follows at once—passing from an optically thinner into a denser medium (small n into large n) the refraction angle is smaller than the incidence angle and the ray bends toward the normal, and the other way round; at normal incidence the direction is unchanged and only speed and wavelength alter. A division that must be nailed down: refraction leaves the frequency untouched, while speed and wavelength shrink together (v=fλ, with f fixed by the source), so colour is set by frequency, not wavelength. Almost every everyday example is an apparent-depth problem: fish seen from the bank appear shallower than they are (roughly h′=h/n), so spearing means aiming below the image; seen from under water, objects above the surface stand higher, and a diver looks up into a world compressed into a circular window about 97.6° wide—its rim is exactly the critical angle, see the next entry. A chopstick seems broken at the surface, letters shift sideways under a glass slab, all the same effect. Mirages are continuous refraction: hot thin air at ground level under cold dense air bends light progressively toward the denser side, lifting distant scenery into the sky (superior mirages over sea and snow, inferior ones over deserts and asphalt). Atmospheric refraction brings sunrise forward and delays sunset by several minutes and slightly flattens the solar disk. Historically Huygens derived the law in 1678 from his wavelet principle, turning 'which path does light take' into 'every point of a wavefront is a new source', the first victory of the wave theory (see the Huygens-principle entry). For the lab: pin sighting or a glass slab measures n through angles, not distances, and the trap is that angles are always measured from the normal. In the formulas, n is refractive index, c the vacuum speed of light, v the speed in the medium, θ₁ and θ₂ the angles of incidence and refraction, h the true depth and h′ the apparent depth.",
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
            zh: "全反射有两个门槛，缺一不可：光必须从光密介质射向光疏介质（n 大的一侧出来），且入射角不小于临界角 C。临界角由折射定律在折射角等于 90° 时给出，sinC=1/n（另一侧为空气时）。数值记住三个：水 48.8°、普通玻璃 41.8°、钻石 24.4°。入射角一旦跨过 C，折射光消失，能量几乎全部退回原介质——不是「折射很弱」而是「没有折射」，所以反射率接近 100%，比任何镀银镜面都干净。日常证据很多：水中气泡边缘特别亮、被水浸湿的砂与抛光面看起来发白、从水下往上看水面像一面镜子、潜水员的天空只剩一个约 97.6° 的圆窗，下现蜃景里也有一段是全反射造成的。光学仪器有两个直接受益者：其一，全反射棱镜（等腰直角棱镜）用 45° 入射角轻松越过 41.8° 的临界角，把光转向 90° 或 180°，不用镀层、不怕氧化、寿命长于平面镜，故双筒望远镜与潜望镜多用它；其二，光导纤维把这两条门槛做成结构——内芯 n 略大、包层 n 略小，只要光入射到端面后在内壁的入射角始终大于 C，即使光纤弯曲也能一路全反射传下去；弯曲半径太小、端面不洁或包层被油水印污，都会让一部分光漏出去，这就是「水流导光」演示里水柱能导光而断流就灭的原因。通信光纤的工作窗口约 1.55 μm，优质光纤损耗已低至每公里 0.2 dB 量级；1966 年高锟提出以超纯玻璃做纤维通信的设想并据此获 2009 年诺贝尔物理学奖；医用内窥镜（胃镜）与工业端视镜是同一原理的另一支，短距离照明与传感则用塑料光纤。钻石是这套口径的受益者：n=2.42 使 C 只有 24.4°，加之色散强，好的切工把冠部与亭部的角度算准，让进入的光在内部来回全反射数次后集中从台面射出，形成所谓火彩；切工过浅时光从底部漏走，钻石就显得发黑。最后两处易错：一是「光疏到光密」永远不会全反射，无论角多大；二是临界角随两侧介质与光的颜色而变（n 依赖波长，见「光的色散」条），所以同一界面下紫光先消失、红光后消失。式中 n 为内芯相对外部的折射率之比，C 为临界角。",
            en: "Total internal reflection has two gates, both mandatory: light must travel from the denser medium toward the thinner one (out of the larger n), and the incidence angle must reach or exceed the critical angle C, which comes straight from Snell's law by setting the refraction angle to 90°: sinC=1/n when the outside is air. Memorise three numbers—48.8° for water, 41.8° for ordinary glass, 24.4° for diamond. Once the critical angle is crossed the refracted ray vanishes and essentially all the energy returns to the original medium; this is not 'weak refraction' but 'no refraction', so the reflectance is near unity and cleaner than any silvered mirror. Everyday evidence is plentiful: bubble rims shine under water, wet sand and polished surfaces look pale, the surface acts as a mirror when seen from below, a diver's sky shrinks to a circular window about 97.6° across, and the inferior mirage contains a total-reflection leg. Two instruments profit directly. First, the reflecting prism (an isosceles right-angle block) turns light by 90° or 180° because 45° comfortably exceeds 41.8°; it needs no coating and cannot tarnish, so binoculars and periscopes prefer it to mirrors. Second, the optical fibre builds those two gates into a structure: a core of slightly higher index inside cladding of slightly lower index, so that once light enters the end face at an angle that keeps every internal hit above C, it can walk around bends by total reflection alone. Bend the fibre too tightly, dirty the end face, or let oil and water soak the cladding, and light leaks out—that is why the 'water column light pipe' demo guides light while the falling stream does not. Telecom fibres work near 1.55 μm and the best now lose around 0.2 dB per kilometre; Charles Kao proposed ultra-pure glass fibre communication in 1966 and shared the 2009 Nobel Prize in Physics for it, medical endoscopes and industrial borescopes are the other branch of the same idea, and short-haul lighting and sensing use plastic fibre. Diamond is a beneficiary of this book of numbers: with n=2.42 the critical angle is only 24.4°, and combined with strong dispersion a good cut fixes the crown and pavilion angles so that entering light bounces repeatedly inside and leaves through the table, the so-called fire; cut too shallow and light escapes through the bottom and the stone looks dead. Two last traps: light going from thin to dense never totally reflects, whatever the angle; and the critical angle depends on both media and on colour, since n varies with wavelength (see the dispersion entry), so violet disappears first and red last at the same interface. In the formula, n is the index ratio of core to outside and C is the critical angle.",
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
            zh: "透镜的分工先讲清：凸透镜把平行光束会聚到焦点，凹透镜把光束发散，看似从另一侧的虚焦点发出。但「会聚／发散」说的是折射后相对于原来的光束更靠轴还是更离轴，不是像的大小，也不是介质的正负——把一块凸透镜放进折射率比它更高的液体里，它会变成发散透镜，这是本条最狠的一处易错。三条特殊光线足以作一切图：平行主轴的光过焦点；过光心的光不偏折；过焦点的光出射后平行主轴。焦距粗测就是让太阳光（近似平行光）在屏上会成最小最亮的光斑，斑到透镜的距离即 f，这也是凸透镜能点火的原因。成像规律按物距 u 逐档而定：u>2f 成倒立缩小实像，像距在 f 与 2f 之间，照相机与眼睛就是这个档位；u=2f 成倒立等大实像，v=2f，此时物与像之间距离最小为 4f；f<u<2f 成倒立放大实像，v>2f，投影仪、幻灯机与手机的近拍都属此档；u=f 不成像，出射平行光（探照灯正是要把灯丝放在焦点上）；u<f 成正立放大虚像，物像同侧，放大镜即此。成实像时的口诀是「物近像远像变大」，而实像都能成在光屏上、虚像不能，这是唯一的判据。实验里三条纪律：烛焰、透镜、光屏三者中心调到同一高度（同轴），否则像跑出台面；光屏上找不到像通常有三种原因——u<f 成的是虚像、u 太接近 f 像远到接不住、或者三心不同高；改用 F 形发光二极管光源比蜡烛更稳且便于比较倒正。透镜的折光本领用焦度表示，D=1/f（f 取米），单位是屈光度，眼镜的「度数」就是它乘 100：+2.00 D 的凸透镜 f=50 cm，−3.00 D 的近视镜 f=−33 cm（见「眼睛与视力矫正」条）。放大镜的放大率约 M=25/f（f 取厘米，25 cm 是明视距离），f=5 cm 即约 5 倍；想再大就撞上衍射极限，须改显微镜（见「显微镜与望远镜」条）。凹透镜另有一用：与凸透镜组合可消色差与消球差，照相机与显微镜的物镜都是多片胶合的透镜组而非单片。式中 u 为物距，v 为像距，f 为焦距，D 为焦度，M 为放大率。",
            en: "Settle the roles first: a convex lens brings a parallel beam to a focus, a concave lens spreads it as if coming from a virtual focus behind it. But converging and diverging mean 'closer to or further from the axis than the incoming bundle', not the size of the image and not the sign of the medium—plunge a convex lens into a liquid of higher refractive index and it turns diverging, the cruellest trap here. Three special rays support every drawing: a ray parallel to the axis leaves through the focus; a ray through the optical centre goes straight; a ray through the focus emerges parallel. Rough focal length measurement just uses sunlight as an almost parallel beam and finds the smallest, brightest patch on a screen—that distance is f, which is also why a convex lens can start a fire. Imaging follows the object distance u in bands: u>2f gives an inverted diminished real image with image distance between f and 2f, the setting of cameras and of the eye; u=2f gives an inverted equal-size real image at v=2f, and here the object-image separation reaches its minimum of 4f; f<u<2f gives an inverted magnified real image with v>2f, the projector, slide lamp and close-focus phone camera; u=f gives no image at all, only a parallel exit beam (which is why a searchlight puts its filament at the focus); u<f gives an upright magnified virtual image on the same side, the magnifying glass. For real images the rule is 'object nearer, image farther and bigger', and the one true test of real versus virtual is whether a screen can catch it. Three laboratory disciplines: align flame, lens and screen centres to one height or the image walks off the paper; failure to find an image has three usual causes—the object is inside f so the image is virtual, u is so close to f that the image is unreachable, or the three centres are not aligned; an F-shaped light-emitting diode source beats a candle for steadiness and for judging inversion. A lens's bending power is its optical power D=1/f with f in metres, the dioptre, and spectacle 'power' is that times 100: a +2.00 D convex lens has f=50 cm, a −3.00 D myopia lens f=−33 cm (see the eye-and-vision entry). A simple magnifier gives about M=25/f with f in centimetres, since 25 cm is the distance of distinct vision, so f=5 cm means roughly ×5; push beyond that and diffraction forbids it, which is the microscope's job (see the microscope-and-telescope entry). Concave lenses have a second use: paired with convex ones they cancel chromatic and spherical aberration, so camera and microscope objectives are cemented multi-element groups, never single glasses. In the formulas, u is object distance, v image distance, f focal length, D optical power and M magnification.",
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
            zh: "白光是复合光，经三棱镜后展开成红橙黄绿蓝靛紫的连续光谱，原因是折射率随波长变化：同一种玻璃对红光的 n 最小、对紫光的 n 最大，于是紫光每一跳都偏得更狠，出射时按颜色被分开——因果链是「n 依赖波长，故偏折角不同」，而不是棱镜「制造」了颜色。牛顿 1666 年的关键实验有两步：先用棱镜把白光展开，再用第二个棱镜把这些色光重新会聚回一束白光，这才排除了「是棱镜把光染了色」的另一种解释，这一步反向复合常被教科书略去。彩虹是同一条链在水滴里完成：阳光进入水滴折射一次、在底面反射一次、再折射出来，主虹的红光出射方向与入射阳光夹角约 42°、紫光约 40°，因此背对太阳时红在外圈紫在内圈；霓是水滴内反射两次的结果，夹角约 51°、颜色顺序反转且更暗。看彩虹的条件是空气里有大量水滴而太阳在身后低处，故雨后傍晚最常见，背着太阳喷一片水雾也能造出小彩虹。天空蓝与夕阳红既不是折射也不是色散而是散射：空气分子对光的散射强度约与波长的四次方成反比（瑞利散射），蓝光被散得最厉害，于是整个天空都发蓝；日落时阳光要穿过比正午厚得多的气层，蓝光沿途被剥掉，剩下的偏红橙；云与雾的滴子大得多，属几乎不挑波长的米氏散射，所以呈白与灰。不可见光谱的两端也归这一条管：红光之外是红外线，1800 年赫歇尔把温度计拖到光谱红端之外，发现那里升温最快，红外主要体现为热作用，遥控器、热像仪与夜视仪靠它；紫光之外是紫外线，1801 年里特靠氯化银变黑找到它，紫外化学作用强，能杀菌（波长约 254 nm 最有效）、能让荧光物质发光，故验钞与防伪用它，也正是它把皮肤晒伤。色散在仪器上通常是要克服的毛病：单片透镜对不同色光焦距不同，像边缘带彩（色差），18 世纪用冕牌与火石两种玻璃胶合成消色差透镜才压住；而棱镜与光栅则把色散做成工具，光谱仪的核心就是它——太阳光谱里那些暗的夫琅禾费线，正是本生与基尔霍夫把谱线对应到元素、进而读出恒星成分的依据（见「能级与氢原子光谱」条）。光纤里不同颜色的光跑得不一样快也会拖累带宽，这叫色散，是长途通信必须补偿的问题（见「全反射」条）。颜料与色光的混合规矩不同，见「色光的三原色」条。",
            en: "White light is a mixture: a prism spreads it into the continuous band red-orange-yellow-green-blue-violet because refractive index depends on wavelength—same glass, smallest n for red, largest for violet, so violet bends harder at every refraction and the colours pull apart. The chain of causation is 'n varies with wavelength, therefore the deviation differs', never 'the prism invented the colours'. Newton's crucial experiment of 1666 had two steps: spread white light with a prism, then recombine the colours with a second prism back into white, which is what ruled out the rival explanation that the glass was dyeing the light; this recombination half is often left out of textbooks. A rainbow is the same chain inside droplets: light refracts on entering a drop, reflects once off its back wall and refracts out again, with red leaving about 42° from the incoming sunlight and violet about 40°, so with the Sun behind you red sits on the outer edge; the secondary bow comes from two internal reflections, sits near 51°, reverses the order and is dimmer. You need abundant droplets in the air and a low Sun behind your back—hence rainbows after evening showers, and a spray bottle facing away from the Sun makes a small one. Blue sky and red sunsets are neither refraction nor dispersion but scattering: molecular scattering goes roughly as the inverse fourth power of wavelength (Rayleigh), so blue is flung around most vigorously and fills the whole sky; at sunset the light crosses a far thicker slab of atmosphere and the blue is stripped off along the way, leaving red and orange; cloud and fog droplets are much larger and scatter almost wavelength-blind (Mie), which is why they look white or grey. The two ends beyond the visible belong here too: infrared was found in 1800 by Herschel, who dragged a thermometer past the red end of the spectrum and saw the fastest rise there, and its signature is heat—remotes, thermal cameras and night-vision devices use it; ultraviolet was found in 1801 by Ritter through silver chloride darkening, acts strongly in chemistry, kills microbes (most effective near 254 nm) and makes fluorescent materials glow, which is what banknote and anti-counterfeit checks exploit—and what sunburns skin. In instruments dispersion is usually a defect to be beaten: a single lens has different focal lengths for different colours, ringing images with colour, and only the 18th-century achromatic doublet of crown and flint glass tamed it; prisms and gratings, conversely, turn dispersion into the working part of a spectroscope—the dark Fraunhofer lines across the solar spectrum are what let Bunsen and Kirchhoff map lines onto elements and eventually read the composition of stars (see the hydrogen-spectrum entry). In optical fibre, colours travelling at different speeds also throttle the link, again called dispersion, and must be compensated for in long hauls (see the total internal reflection entry). Pigments mix by different rules, covered in the additive-primaries entry.",
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
            zh: "干涉与衍射是波独有的签名，正是它们把光从「粒子流」判给「波」。干涉的条件是相干：两列光频率相同且相位差恒定；两盏普通灯永不相干，因为原子发光的波列是随机的。杨氏因此在 1801—1803 年用同一束光经过双缝分成两路来保证相干。判据看路程差：路程差等于波长整数倍处加强、半波长奇数倍处减弱，屏上相邻明纹间距 Δx=λL/d——取缝距 d=0.2 mm、缝到屏 L=1 m、波长 λ=600 nm，算得 3 mm，条纹清晰可数，这正是实验室做得出的量级。用白光做双缝时中央是白色亮纹、两侧出现彩色带，因为各色条纹间距不同。薄膜干涉是同一原理的另一实现：光在薄膜上下两个表面各反射一次后相干，肥皂泡与油膜的彩色来自膜厚与波长可比；增透膜把厚度做到约 λ/(4n)，让两束反射光相消、透射光增强，相机镜头与镀膜眼镜上那点蓝紫反光就是它的签名；检查平台平不平用「牛顿环」，条纹弯在哪里，工件就凹在哪里。衍射是光绕过障碍偏离直线，一切波都衍射，但明显与否取决于障碍或孔的尺寸与波长是否相当：声波的波长从厘米到十几米，所以隔墙「闻其声而不见其人」办得到；可见光只有 400—700 nm，故日常只见直线传播，须用狭缝、细丝或小针孔才看得出。圆孔与圆板的衍射会在几何阴影的正中留下一个亮斑：1818 年法国科学院的征文竞赛中，泊松从菲涅耳的波动理论推出这个他自认荒谬的结论意在反驳，阿拉果随即真的测到它，史称泊松亮斑——一次旨在推翻理论的预言反倒成了理论最漂亮的证据。激光出现后相干不再稀缺，全息术因此可行：记录物光与参考光的干涉图样等于同时保存了振幅与相位，故能重建出立体的像（伽博 1947 年提出这一想法，并获 1971 年诺贝尔物理学奖）。衍射同时设下分辨的天花板：仪器最小可分辨角约 1.22λ/D，口径越大看得越细；显微镜最小分辨距离约 0.61λ/NA，取 550 nm 与最高数值孔径 1.4 得约 0.24 μm，这就是光学显微镜放大到约 1600 倍便再无信息可挖、须改用电子显微镜的原因（见「显微镜与望远镜」条）。式中 λ 为波长，d 为双缝间距，L 为缝到屏的距离，Δx 为相邻亮纹间距，D 为口径，NA 为数值孔径。",
            en: "Interference and diffraction are the exclusive signatures of waves, and it was these that moved light off the particle ledger and onto the wave one. Interference demands coherence: equal frequency and a steady phase difference. Two ordinary lamps can never interfere, since atoms emit in random wave-trains, which is why Young in 1801–1803 split one beam through two slits to guarantee it. The test is path difference: constructive where it is a whole number of wavelengths, destructive at odd half-wavelengths, and the spacing of bright fringes on the screen is Δx=λL/d—take slit separation d=0.2 mm, screen distance L=1 m and wavelength λ=600 nm and you get 3 mm, an easy pattern to count in the lab. With white light the central fringe is white and the flanks are coloured, because each colour spaces its fringes differently. Thin-film interference is the same principle in another guise: two reflections off the two faces of a film interfere, and soap bubbles and oil slicks colour because film thickness is comparable to wavelength; an anti-reflection coating is made about λ/(4n) thick so the two reflected beams cancel and transmission rises—the faint blue-purple sheen on camera lenses and coated spectacles is its signature; testing optical flatness with 'Newton's rings' reads a bump or dip straight off the bent fringe. Diffraction is light bending round obstacles; every wave does it, and whether it is obvious depends on whether obstacle or aperture size is comparable to the wavelength: sound runs from centimetres to tens of metres, so you can hear round a wall without seeing the speaker, while visible light at 400–700 nm demands a narrow slit, a hair or a pinhole before anything shows. Circular apertures and discs throw a bright spot into the middle of the geometric shadow: in the 1818 French Academy prize contest Poisson derived that absurd-looking consequence from Fresnel's wave theory expecting to refute it, and Arago promptly observed it—Poisson's bright spot, an attempted kill-shot that became the theory's finest evidence. Once lasers made coherence cheap, holography followed: recording the interference of object and reference beams stores phase as well as amplitude, so a three-dimensional image can be rebuilt (Gabor conceived this in 1947 and took the 1971 Nobel Prize). Diffraction also caps resolution: the smallest separable angle is about 1.22λ/D, so bigger apertures see finer, and a light microscope cannot resolve below roughly 0.61λ/NA—about 0.24 μm at 550 nm with the best oil-immersion objective—which is why magnifying past some 1600× buys nothing and electron microscopes take over (see the microscope-and-telescope entry). In the formulas, λ is wavelength, d slit separation, L slit-to-screen distance, Δx fringe spacing, D aperture and NA numerical aperture.",
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
            zh: "偏振讲的是振动方向的选择性，因此它是横波独有的性质：只有振动方向与传播方向垂直的波，才谈得上「只放行某个方向」。自然光（太阳、灯丝）在垂直于传播的平面内各方向均匀，通过一片偏振片后只留一个分量，强度约减半；再把第二片转到与第一片正交，光就完全过不去、屏全黑——这个「双偏振片消光」是光是横波最直接的一条证据，与电磁波里 E 与 B 相互垂直且都垂直于传播方向的口径接得上（见「交变电流与电磁波」条）。定量关系是马吕斯定律 I=I₀cos²θ；马吕斯 1808 年发现光的偏振，而偏振被安到横波的位置上则要靠后来的电磁理论。日常里偏振处处在：水面、玻璃与路面反射的光是部分偏振的，掠射时最明显，玻璃在约 56°（布鲁斯特角，tanθ=n₂/n₁）附近反射的光几乎完全线偏振，偏振太阳镜正是挡掉这一方向，于是开车与钓鱼时既压掉刺眼反光又不至于把整个视野调暗一半。看立体电影时，影院用两台放映机以互相垂直的偏振方向把左右眼画面叠在同一块银幕上，眼镜不过是两片方向不同的偏振片；液晶显示本身不发光，靠液晶分子旋转偏振方向、再由偏振片决定亮暗，因此戴着偏振镜看手机屏幕会莫名发黑，反过来两片偏振片也能验出一块屏是不是液晶。透明塑料受力时显出彩色条纹，这是光弹效应，工程上用它给桥梁与齿轮模型的应力分布拍照；糖溶液能使偏振面旋转，旋光仪据此测浓度，制糖与制药车间常年使用；天空的散射光部分偏振，偏振摄影滤镜压在镜头上可以把蓝天压暗、白云更跳，蜜蜂一类昆虫也靠天空的偏振模式在阴天里导航。反过来，空气中的声波是纵波，无论叠多少片「偏振片」都不会消光，这本身就是横波与纵波最好的一组对照（见「声音的产生与传播」条）。光纤里两个偏振方向的速度略有差别，会产生偏振模色散，是高速通信要处理的问题之一。式中 I 为透射光强，I₀ 为自然光过第一片后的光强，θ 为两片偏振片透振方向的夹角，n₁、n₂ 为界面两侧介质的折射率。",
            en: "Polarization is about a preference of vibration direction, so it belongs to transverse waves alone: only a wave whose vibration is perpendicular to its travel can be said to pass just one direction. Natural light (Sun, filament) is uniform in the plane transverse to propagation, so one polarizer leaves about half the intensity; cross a second polarizer at 90° and the screen goes black. That extinction between crossed polarizers is the most direct evidence that light is transverse, and it lines up with the statement that in an electromagnetic wave E and B are mutually perpendicular and both perpendicular to the direction of travel (see the em-waves entry). The quantitative rule is Malus's law, I=I₀cos²θ; Malus discovered the polarization of light in 1808, while placing polarization inside the transverse-wave picture took the later electromagnetic theory. Polarization is everywhere in daily life: light reflected from water, glass and roadways is partially polarized, most strongly at grazing incidence, and near 56° for glass (Brewster's angle, tanθ=n₂/n₁) the reflected light is almost fully linearly polarized—polarized sunglasses simply block that direction, cutting glare on the road or while fishing without dimming the whole view by half. Stereoscopic films work by two projectors laying left- and right-eye pictures on one screen at crossed polarizations, and the glasses are nothing but two differently oriented polarizing sheets. LCDs emit no light: liquid crystal rotates the polarization and a polarizer then decides bright or dark, which is why a phone screen goes black when viewed through a polarizer, and why two sheets can test whether a screen is a liquid-crystal display. Stressed transparent plastic shows coloured fringes—the photoelastic effect, used to photograph stress distributions in bridge and gear models; sugar solutions rotate the polarization plane, which the polarimeter turns into a concentration reading, a routine in sugar and pharmaceutical plants; scattered skylight is partially polarized, so a polarizing camera filter darkens the sky and lifts the clouds, and insects such as bees navigate on overcast days by that polarization pattern. Sound in air, by contrast, is longitudinal: stack as many 'polarizers' as you like and it never extinguishes, which is itself the cleanest transverse-versus-longitudinal contrast (see the sound-propagation entry). In fibre optics the two polarization directions travel at slightly different speeds, giving polarization-mode dispersion, one of the problems high-speed links must handle. In the formulas, I is transmitted intensity, I₀ the intensity after the first sheet, θ the angle between the two transmission axes, and n₁, n₂ the refractive indices either side of the interface.",
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
            zh: "眼睛是一架会自调焦的照相机：角膜与晶状体共同折光（角膜其实贡献了大部分折光力），在视网膜上成一个倒立、缩小的实像，感光细胞把光信号交给视神经，而「正立的世界」是大脑翻读之后的结果——所以「眼睛里成的是倒像」与「我们看见的是正立的」两句同时成立，把它们当成矛盾是常见错误。瞳孔是光阑，强光下缩小、弱光下放大（暗处可扩到约 8 mm）；看近物时睫状肌收缩、晶状体变凸、折光力增强，这叫调节，看远时相反。正常眼能看清的最近点叫近点，青少年约 10 cm 且随年龄推远；长时间阅读最舒适的距离约 25 cm，称明视距离，放大镜的放大率正是以它为基准（见「透镜与凸透镜成像」条）。近视的原因是眼球前后轴过长或晶状体折光过强，远物的像成在视网膜之前，故看远模糊、看近反而清楚，矫正要戴凹透镜让光先发散一些；远视则是像倾向于成在视网膜之后，看远看近都得动用调节，配凸透镜。老花与远视不是一回事：它是晶状体随年龄变硬、调节能力下降、近点后移，看小字要拿远，凸透镜只是代偿那份失去的调节，所以「年轻人近视、老年人老花」两套口径不能混。配镜的度数用焦度表示，D=1/f（f 取米），−3.00 D 即焦距约 −33 cm 的凹透镜，+2.00 D 即 f=50 cm 的凸透镜；散光是角膜在不同子午线方向上不平，各方向折光力不一，须用柱面透镜。保护视力第一位的是姿势、光照与时间分配：常见建议是连续用眼二三十分钟后抬头看远几十秒，让调节肌松弛，每天足够的户外活动对抑制近视加深有帮助；耳机则要限音量限时长按（见「噪声的危害与控制」条）。两个补充口径：视网膜上视神经穿出的地方没有感光细胞，像落在那里就看不见，这叫盲点，因两眼视野互补且大脑会填补而平时察觉不到；眯眼或在小孔后看远处会更清楚，因为挡住了边缘乱折的光、只让近轴光进入，与「光的直线传播」条里的小孔成像同源。式中 D 为焦度（屈光度），f 为透镜焦距（以米计，凹透镜取负）。",
            en: "The eye is a self-focusing camera: cornea and lens bend the light together (the cornea in fact supplies most of the power) and form an inverted, diminished real image on the retina, whose cells hand the signal to the optic nerve, while the upright world is what the brain reads out afterwards—so 'the eye images upside down' and 'we see things upright' are both true at once, and treating them as a contradiction is a standard error. The pupil is the aperture, constricting in bright light and dilating in the dark (to some 8 mm); for near work the ciliary muscle contracts, the lens bulges and its power rises, which is called accommodation, and the reverse happens at distance. The nearest point a normal eye can focus is the near point, roughly 10 cm in the young and receding with age; the comfortable sustained viewing distance is about 25 cm, the distance of distinct vision, which is the baseline for a magnifier's power (see the lens-imaging entry). Myopia comes from an eyeball that is too long or a lens system that is too strong, so distant objects focus in front of the retina—far looks blurred while near stays sharp—and it is corrected by a diverging lens that spreads the light first. Hyperopia focuses behind the retina and must spend accommodation on far and near alike, so a converging lens is prescribed. Presbyopia is not hyperopia: the lens hardens with age, accommodation fails and the near point retreats, so small print gets held away, and the converging lens merely stands in for the lost accommodation—'young people short-sighted, old people long-sighted for reading' are two different accounts and must not be merged. Spectacle power is measured in dioptres, D=1/f with f in metres: −3.00 D is a diverging lens of about −33 cm focal length, +2.00 D a converging lens at 50 cm; astigmatism means the cornea is uneven across meridians, with different power in different directions, needing a cylindrical lens. Vision protection starts with posture, lighting and time management: a common recommendation is to look far away for tens of seconds after every half-hour of close work to release the ciliary muscle, and ample outdoor daylight helps slow myopia progression; earphones need limits on volume and duration (see the noise-control entry). Two side notes: where the optic nerve leaves the retina there are no photoreceptors, so an image there is simply missing—the blind spot goes unnoticed because the two eyes overlap and the brain fills in; and squinting, or viewing through a small hole, sharpens distance vision by blocking the wildly bent marginal rays and admitting only paraxial ones, the same physics as the pinhole in the rectilinear-propagation entry. In the formula, D is optical power in dioptres and f the focal length in metres, taken negative for a diverging lens.",
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
            zh: "显微镜与望远镜都是两段透镜接力，取向却相反：显微镜要看清近处的微小，望远镜要把远处的巨大拉近，而两者的判据都是视角——眼睛能分辨的最小视角约 1 角分，一切放大装置的本质都是增大进入眼睛的视角，而不是「把像做大」。显微镜把标本放在短焦物镜的一倍与二倍焦距之间，先成一个倒立放大的实像，落进目镜焦点之内，目镜再充当放大镜把这个实像放大成虚像；总放大率是两段乘积 M=m₁×m₂，10×40 即 400 倍。真正的限制不在放大而在分辨：可见光波长 400—700 nm，衍射使最小分辨距离约 0.61λ/NA，最好的油浸物镜也只能到 0.2 μm 上下，于是光学显微镜放大到约 1600 倍再无信息可挖，继续放大只是空放大；要看更小的须改用电子显微镜，因为 100 kV 电子的德布罗意波长仅约 3.7 pm，比光短几万倍（见「波粒二象性」条）。望远镜有两条血统：开普勒式用两只凸透镜，物镜焦距长、目镜焦距短，放大率 M=f物/f目，成倒像，但镜筒内那个实像处可以装十字分划板用于测量，故天文与瞄准具多用它；伽利略式以凹透镜做目镜，成正立像、镜筒短、视场窄，剧院望远镜走这条路线，而 1609 年伽利略把它指向天空，看到了月面环形山、木星的四颗卫星与金星的盈亏。反射式由牛顿 1668 年做出，用抛物面镜取代物镜，一举消掉色差，也才把口径做得大——决定一台望远镜好坏的首要指标是口径而不是倍数：集光力按 D² 增长，角分辨率约 1.22λ/D，10 cm 口径在可见光下约 1.4 角秒，而暗适应的人眼凭约 7 mm 瞳孔只能看到 6 等星，大口径意味着更暗、更细都看得见。当代例子包括 2.4 m 的哈勃空间望远镜与地面 8—10 m 级大望远镜；射电波段的波长要长得多，分辨率只能靠更大的天线面（如 500 m 口径的 FAST）与干涉阵列补回来（见「光年与宇宙尺度」条）。同一台望远镜换更短焦的目镜倍数更高，但像更暗、抖动也更明显，故观测者宁取适中倍率换清晰与稳定。式中 M 为放大率，m₁、m₂ 为物镜与目镜各自的放大倍数，f物、f目 为物镜与目镜焦距，D 为口径，λ 为波长，NA 为数值孔径。",
            en: "Both instruments relay two lens stages but in opposite directions: a microscope must resolve the tiny nearby, a telescope must pull the vast far away, and the yardstick for both is visual angle—the eye separates about one arcminute, so any magnifier works by enlarging the angle subtended at the eye, not by 'making the image big'. A microscope puts the specimen between one and two focal lengths of a short-focus objective, which paints an inverted magnified real image inside the eyepiece's focus; the eyepiece then acts as a simple magnifier on that image. Total magnification is the product M=m₁×m₂, so 10×40 means 400×. The real limit is resolution, not magnification: with visible wavelengths of 400–700 nm, diffraction holds the smallest resolvable spacing near 0.61λ/NA, about 0.2 μm even for the best oil immersion, so past roughly 1600× an optical microscope yields no further information and more magnification is empty; smaller things need an electron microscope, since a 100 kV electron's de Broglie wavelength is only about 3.7 pm, tens of thousands of times shorter (see the wave-particle entry). Telescopes come in two lineages. The Keplerian uses two convex lenses, long-focus objective and short-focus eyepiece, M=f_obj/f_eye, giving an inverted image but leaving a real image inside the tube where a crosshair graticule can sit—hence its use in astronomy and sights. The Galilean uses a concave eyepiece, stays upright, short and narrow-fielded, which is the opera glass; in 1609 Galileo turned one skyward and found cratered mountains on the Moon, four satellites of Jupiter and the phases of Venus. Newton's 1668 reflector replaced the objective with a parabolic mirror, ending chromatic aberration outright and allowing large apertures—and aperture, not magnification, is the primary spec: light gathering grows as D², angular resolution is about 1.22λ/D, so a 10 cm instrument reaches some 1.4 arcseconds in visible light where the dark-adapted eye, with a 7 mm pupil, tops out near sixth magnitude. Flagship examples are the 2.4 m Hubble and ground-based 8–10 m class telescopes; at radio wavelengths, where λ is enormously longer, resolution is recovered only with huge dishes (the 500 m FAST) and interferometer arrays (see the cosmic-distance entry). Swapping to a shorter eyepiece raises magnification but dims and shakes the image, so observers usually trade magnification for steadiness and clarity. In the formulas, M is magnification, m₁ and m₂ the objective and eyepiece contributions, f_obj and f_eye their focal lengths, D the aperture, λ the wavelength and NA the numerical aperture.",
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
            zh: "物体的颜色不是它自带的涂料，而是它对照明光谱做了一次筛选：不透明物体的颜色由它反射的色光决定，透明物体的颜色由它透过的色光决定。红纸只反射红光而吸收其余，红玻璃只透过红光而吸收其余；白光下物体显出「本色」，一旦换成单色光源就露底——只有红光的工作灯下，蓝布把光全部吸收而近乎全黑，绿光下的红玫瑰同样发暗，这就是车间、机房与舞台用有色光时颜色不可信的原因。黑色吸收几乎全部可见光因而升温（夏天深色车身与沥青路面烫手，极地用黑冰取火），白色反射几乎全部所以凉爽；沙漠里宽松的长黑袍并不违背这条吸收规律，它靠袍内空气对流把热带走。滤色镜是这套规则的工程用法：在镜头前加一片只放行某段光的玻璃或树脂，黄滤镜吸收蓝光从而压暗蓝天、让白云更跳，是黑白摄影的经典手段，舞台分色、生化检测与荧光显微里的激发块同理（见「光的色散」「偏振」条）。有一类颜色根本不含色素，而是结构造出来的：蝴蝶翅膀、孔雀羽毛与光盘背面的彩虹，来自薄膜干涉与光栅衍射把不同颜色的光分方向弹开，因此随视角变色，也不会因化学作用褪色，这叫结构色（见「干涉与衍射」条）。另一类是先吸收再发出：荧光物质吸收紫外线后立即发出可见光，故验钞、防伪标记与荧光笔在紫外灯下极亮；夜光材料则吸收后缓慢释放，属磷光。「光本身的颜色」与「物体的颜色」要分开，而人最终看到的颜色是三种视锥细胞响应的组合，同一颜色感觉可以由完全不同的光谱产生——这叫作同色异谱，正是屏幕能用三色像素骗过眼睛、而一盏灯的「显色指数」需要单独评价的原因（见「色光的三原色」条）。天体的颜色也走这条路：恒星偏蓝说明表面温度高、偏红说明温度低，红巨星与蓝白星的颜色差就是这么读的（见「恒星的一生」条）。",
            en: "An object's colour is not paint it carries but a filter it applies to the light reaching it: an opaque object's colour is set by the light it reflects, a transparent one's by the light it transmits. Red paper reflects red and absorbs the rest; red glass passes red and absorbs the rest. Under white light things show their 'own' colour, but change the source and the mask slips—under a red-only work lamp blue cloth absorbs everything and goes nearly black, and a red rose under green light is equally dim, which is exactly why colours are untrustworthy under coloured lighting in workshops, machine rooms and stages. Black absorbs almost the whole visible band and heats up (dark car bodies and asphalt burn the hand in summer; black ice was used to start fires in the polar night), white reflects nearly all of it and stays cool; the loose black robe of desert nomads does not defy that absorption law—it sheds heat through the air current inside the robe. Colour filters are the engineered version: put a sheet of glass or resin that passes only part of the spectrum in front of a lens, and a yellow filter soaks up blue, darkening the sky and lifting the clouds, the classic black-and-white trick, with the same logic behind stage gels and the excitation blocks of fluorescence microscopy (see the dispersion and polarization entries). A class of colour contains no pigment at all: butterfly wings, peacock feathers and the rainbow on a compact disc come from thin-film interference and grating diffraction flinging different colours into different directions, so they shift with viewing angle and never fade chemically—structural colour (see the interference-and-diffraction entry). Another class absorbs first and then re-emits: fluorescent materials take in ultraviolet and promptly return visible light, which is why banknote checks, security marks and highlighter ink blaze under a UV lamp, while glow-in-the-dark stores release slowly, which is phosphorescence. Keep 'the colour of light' separate from 'the colour of objects', and remember that the colour you finally see is a combination of three cone responses: identical colour sensations can come from utterly different spectra—metamerism—which is why three-pixel screens can fool the eye, and why a lamp's colour-rendering index has to be graded separately (see the additive-primaries entry). Celestial colours follow the same road: a blue star has a hotter surface than a red one, and that is how red giants and blue-white stars are read apart (see the life-of-stars entry).",
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
            zh: "色光的三原色是红、绿、蓝，规矩是加色混合：叠得越多越亮，红加绿得黄、红加蓝得品红、绿加蓝得青，三色等量即白光。这里必须解释「红加绿为什么是黄」：它并没有造出波长 580 nm 的黄光，而是同时刺激了眼里对红与对绿敏感的两种视锥细胞，而一束真正的黄光刺激的正是同一组合，大脑把两种输入读成同一种感觉。这一「同色异谱」的事实是整个色度学的地基，也是屏幕能工作的理由：手机与显示器把红绿蓝子像素排成点阵，靠人眼分辨极限在远处把它们混成一色，逐点调节三种光的强度就铺得出可显示的全部颜色；视频制式与色彩管理里的 sRGB、DCI-P3 等色域概念，说的都是这三条通道能覆盖多大范围。另一套三原色属于颜料与油墨，规矩是减色混合：品红、黄、青，每一种都吞掉一段光谱、把剩下的反射出来，混得越多被吃掉的光越多，所以颜料越调越暗，三色等量趋近黑；实际印刷用青、品红、黄再加一支黑（CMYK），黑色单独上墨，既省掉把三种染料叠成脏黑的代价，也能把暗部压下去。两套原色常被交叉着考，判据只有一条：光源发光走加色，被反射或被透过的颜料与滤色片走减色。几个连带结论：白光能被棱镜分回七色又能重新复合，说明它是复合光（见「光的色散」条）；钠灯发出的是几乎单一波长的黄光，看上去与「红加绿」的黄一样，但光谱完全不同，这是同色异谱最干净的实例；物体的颜色由它反射或透过的那部分决定，与三原色规则相乘而不是相加（见「物体的颜色」条）；红绿色盲者缺某一种视锥细胞，因而对混色识别图失效，这从生理一侧证明了加色混合走的是三条通道而不是无数条。",
            en: "The additive primaries of light are red, green and blue, and the rule is addition: the more you stack, the brighter it gets—red plus green gives yellow, red plus blue gives magenta, green plus blue gives cyan, and all three in equal measure give white. The question 'why does red plus green look yellow' must be answered properly: no 580 nm yellow light has been created; instead the two cones sensitive to red and to green are stimulated together, and a genuinely yellow beam stimulates the very same pair, so the brain reads both inputs as one sensation. This metamerism is the foundation of the whole of colorimetry and the reason screens work: displays pack red, green and blue subpixels into a matrix, let the eye's resolution limit merge them at a distance, and paint every displayable colour by dialling the three intensities point by point; the colour-space names of video and colour management, sRGB and DCI-P3 among them, simply describe how much territory those three channels can cover. The other set of primaries belongs to pigments and ink and works by subtraction: magenta, yellow and cyan, each swallowing a slice of the spectrum and reflecting the rest, so mixing more of them eats more light and paints get darker as you blend, with all three approaching black. Practical printing therefore uses cyan, magenta, yellow plus a separate black (CMYK), the black saving the cost of stacking three dyes into a muddy dark and giving the shadows real depth. Exam questions cross the two sets constantly, and there is one test: a source that emits light follows addition, while reflected or transmitted pigment and filter follow subtraction. Consequences worth carrying: white light can be split into seven colours by a prism and recombined again, proving it composite (see the dispersion entry); a sodium lamp emits almost a single wavelength of yellow that looks identical to 'red plus green' yet has an utterly different spectrum, the cleanest instance of metamerism; an object's colour is decided by the slice it reflects or transmits, which multiplies with rather than adds to the primary rules (see the colour-of-objects entry); and red-green colour blindness, caused by a missing cone type, defeats pseudo-isochromatic plates, proving from the physiological side that additive mixing runs on three channels rather than on countless ones.",
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
            zh: "温度表示冷热程度，它的严格依据是热平衡：两个系统接触后不再有净热量交换，就说它们温度相同，而热平衡的传递性（即第零定律）才让温度计能够读数。热力学温度（开尔文）是国际单位制基本单位，零度为绝对零度。式中 K 为热力学温度（开尔文），℃ 为摄氏温度，两者只差零点位置，1 K 的间隔与 1 ℃ 完全相同；2019 年单位制重新定义之后，开尔文直接由玻尔兹曼常数 k=1.380649×10⁻²³ 焦耳每开尔文固定下来，不再依赖任何具体物质的性质。从微观看，温度是分子热运动剧烈程度的量度，理想气体分子的平均平动动能等于 3kT/2，300 K 时约 6.2×10⁻²¹ 焦耳。摄氏温标 1742 年提出时其实是倒着刻的，0 度标在水的沸点、100 度标在冰点，不久后才被翻转成今天的样式。温度计也不只靠热胀冷缩一种原理：水银与酒精温度计靠液柱体积，铂电阻与热电偶靠电阻和温差电压，红外测温枪靠辐射强度，量程与响应速度各有所长。标定上历史上曾用冰点，后来改用更稳定的水的三相点 0.01 ℃，因为冰点会随气压与溶入的空气浮动。体温计的量程只有 35 到 42 ℃、分度值 0.1 ℃，玻璃泡上方的缩口让水银柱离开人体后不回落，读数前得甩几下才复位；我国已按汞公约的安排自 2026 年起停止生产含汞体温计。热胀冷缩也不是普遍规律：水在 4 ℃ 时密度最大，0 到 4 ℃ 之间反而热缩冷胀，所以冬天湖面结冰而湖底保持约 4 ℃，鱼得以往来越冬；把铜片与铁片铆成双金属片，受热会朝固定一侧弯曲，温控开关与老式温度计用的就是它。常见误区有两个：一是把温度当成内能，温度只反映分子平均动能，一杯 80 ℃ 的水的内能远小于一池 20 ℃ 的水；二是以为温度能降到绝对零度，量子力学并不允许，绝对零度只能无限逼近而不能到达。微观解释见「分子动理论」条，单位口径见「国际单位制」条。",
            en: "Temperature is a measure of hotness, and its rigorous basis is thermal equilibrium: two systems that exchange no net heat when placed in contact are at the same temperature, and the transitivity of that relation - the zeroth law - is exactly what lets a thermometer be read at all. Thermodynamic temperature in kelvin is an SI base unit whose zero is absolute zero. In the formula, K is the thermodynamic temperature in kelvin and ℃ is the Celsius reading: the two differ only in where zero sits, and a step of 1 K is identical to a step of 1 ℃. Since the 2019 restatement of the SI the kelvin is fixed directly through the Boltzmann constant k=1.380649×10⁻²³ joules per kelvin rather than through the properties of any particular substance, and microscopically temperature measures how violently the molecules move - the mean translational kinetic energy of an ideal-gas molecule is 3kT/2, about 6.2×10⁻²¹ joule at 300 K. When Celsius proposed his scale in 1742 it was written backwards, with 0 at the boiling point of water and 100 at its freezing point, and the flip into today's form came only shortly afterwards. Thermometers do not all rely on expansion: mercury and alcohol columns read volume, platinum resistance thermometers and thermocouples read resistance and thermoelectric voltage, and an infrared pyrometer reads radiated power, each with its own span and speed of response. Calibration once used the ice point but moved to the far steadier triple point of water at 0.01 ℃, because the ice point drifts with air pressure and with the air dissolved in the water. A clinical thermometer spans only 35 to 42 ℃ with 0.1 ℃ graduations, and the narrow constriction above its bulb stops the mercury column falling once it leaves the body, so it must be shaken down before reuse; under the mercury convention China has stopped producing mercury thermometers from 2026. Expansion on heating is not universal either: water is densest at 4 ℃ and actually shrinks when heated between 0 and 4 ℃, which is why a lake freezes at the surface while the bottom stays near 4 ℃ and fish survive the winter; bonding copper to iron in a bimetallic strip makes it bend in a fixed direction when warmed, the element inside thermostats and older thermometers. Two mistakes are worth naming: temperature is not internal energy, since it tracks only the mean molecular kinetic energy and a cup of water at 80 ℃ holds far less internal energy than a pond at 20 ℃; and reaching absolute zero is impossible, since quantum mechanics forbids it and one can only approach it. For the microscopic reading see the kinetic theory entry, and for the unit conventions see the SI units entry.",
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
            zh: "物质由大量分子组成，分子永不停息地做无规则运动，分子之间同时存在引力与斥力，这三条就是分子动理论的全部内容。分子小到什么程度？把 1 摩尔水的体积 18 立方厘米除以阿伏伽德罗常数 6.02×10²³，每个分子平均只分到约 3×10⁻²⁹ 立方米，边长是 0.3 纳米的量级；粗测时可以让一滴已知体积的油酸在水面摊成单分子油膜，用油滴体积除以油膜面积就直接得到分子直径，这是「数量级估算」条所说的把微观量变成可测量的典型做法。扩散是第一条证据：墨滴入水、腌菜入味、把磨平的金块与铅块压紧放上几年，界面处都能测到彼此渗入；气体最快、液体次之、固体最慢，温度越高越快，所以热炒比凉拌更入味。布朗运动是第二条证据：1827 年布朗在显微镜下看花粉在水中的微粒，见到它们不停地抖动折线；微粒比分子大千万倍以上，动的并不是分子本身，而是液体分子从四面八方的撞击不平衡，颗粒越小、温度越高，抖动越剧烈。爱因斯坦 1905 年给出微粒平均平方位移正比于时间的定量关系，佩兰 1908 年用实验把它证实，原子与分子才真正被学界当作实物接受；玻尔兹曼为原子实在论争了半生，1906 年去世，没能等到结论（见「路德维希·玻尔兹曼」条）。分子力随距离变化：在约 10⁻¹⁰ 米的平衡距离上引力与斥力恰好抵消，更近时斥力陡增，稍远时引力为主，超过约十个平衡距离就可以忽略——两块破镜对接后仍然不牢，是因为真正落到平衡距离以内的分子少得可以忽略，而不是分子力失灵。三条常见误区：布朗运动不是分子的运动而是微粒的运动；扩散在 0 ℃ 照样进行，并非只有高温才有；温度越低分子运动越慢但绝不会停止，因为绝对零度不能到达。分子力的宏观表现——拉断一根绳要用力、两块铅压在一起会粘住——与这套图像同口径，温度的微观含义见「温度与温标」条。",
            en: "Kinetic theory says three things: matter is made of an enormous number of molecules, they are in ceaseless random motion, and they exert both attractive and repulsive forces on one another. How small is a molecule? Dividing the volume of one mole of water, 18 cubic centimetres, by Avogadro's number 6.02×10²³ leaves about 3×10⁻²⁹ cubic metre per molecule, a cube roughly 0.3 nanometre on a side; in the crude classroom measurement a known drop of oil acid is allowed to spread into a monolayer on water, and dividing its volume by the film area hands over the molecular diameter directly - the very move the order-of-magnitude estimation entry calls turning a microscopic quantity into something measurable. Diffusion is the first piece of evidence: ink spreading in water, salt working into a pickle, and a flattened gold block pressed against lead for years all show interpenetration at the boundary. It runs fastest in gases, slower in liquids and slowest in solids, and speeds up with temperature, which is why a hot stir-fry seasons better than a cold dressing. Brownian motion is the second: in 1827 Brown watched pollen grains jitter and dart along jagged lines under a microscope in water. The grains are more than ten million times larger than molecules, so what one sees is not molecular motion itself but the imbalance of molecular blows arriving from every side, and the smaller the grain and the higher the temperature, the wilder the jitter. Einstein gave the quantitative law in 1905 - the mean square displacement grows in proportion to time - and Perrin confirmed it experimentally in 1908, which is when atoms and molecules were finally accepted as real rather than as bookkeeping; Boltzmann had argued for their reality most of his life and died in 1906 without seeing the verdict, as the Boltzmann entry notes. The molecular force depends sharply on separation: at about 10⁻¹⁰ metre attraction and repulsion cancel, closer in the repulsion climbs steeply, a little farther out attraction dominates, and beyond some ten equilibrium spacings the force can be ignored. Two broken pieces pressed back together do not rejoin because so few molecules fall inside the equilibrium distance, not because the force has failed. Three misunderstandings are worth clearing up: Brownian motion is the motion of the grain and not of the molecule; diffusion proceeds at 0 ℃ as well, not only at high temperature; and cooling never stops the motion, because absolute zero cannot be reached. The macroscopic signatures - the force needed to snap a rope, two clean lead blocks sticking when pressed - belong to the same picture, and the microscopic meaning of temperature is taken up in the temperature and scales entry.",
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
            zh: "内能是物体内所有分子热运动动能与分子势能的总和，只记分子世界的账：一辆停着的烫手汽车内能不为零，机械能却可以为零，把物体的宏观动能与被举高的重力势能算进内来是常见错误（机械能口径见「机械能守恒」条）。内能与温度、体积、物态有关；理想气体因为忽略分子间作用力、没有分子势能，其内能就只取决于温度。改变内能有两条途径：做功与热传递，而且在改变内能这一点上两者完全等效——1 焦耳的功与 1 焦耳的热进入内能账本毫无差别，这正是等效替代的思路在热学里的用法（口径见「等效替代法」条）。历史上这一点曾激烈争论：长期流行的热质说认为热是一种没有质量、能从高温物流向低温流的流体；焦耳从 1843 年起用重物下落带动叶片搅水的实验，测得热功当量约 4.184 焦耳对应 1 卡，把做功多少与升温多少定量挂钩，热质说就此让位。顺带来一个数量级感：1 千克水下落 1000 米，若重力做的功全部变成它自身的内能，也只够让它升温约 2.3 ℃，可见机械能转成内能并不显眼；搓手变暖的摩擦生热、钻木取火、刹车片烫手、流星体进入大气烧蚀，走的都是同一条路。概念上还有一个必须分清的地方：内能是状态量，热量与功是过程量，说物体含有多少热量是错的。高频易错在于同温度不等于同内能：0 ℃ 的冰与 0 ℃ 的水温度相同，内能却不同，因为冰熔化成水要吸收每千克约 3.34×10⁵ 焦耳的熔解热而温度不变，吸收的能量用来破坏晶格、增大分子势能；同理 100 ℃ 的水变成 100 ℃ 的水蒸气还要再吸每千克约 2.26×10⁶ 焦耳。温度的微观含义见「分子动理论」条，功与能的换算见「功与功率」条，把两者合起来记账就是「热力学第一定律」条。",
            en: "Internal energy is the sum of all the random molecular kinetic energy and the molecular potential energy inside a body, and it keeps only the molecular accounts: a parked car with a hot engine has plenty of internal energy while its mechanical energy may be zero, and mixing the body's bulk kinetic energy or its gravitational energy into internal energy is the usual slip, as the conservation of mechanical energy entry draws the line. Internal energy depends on temperature, volume and phase; for an ideal gas, where intermolecular forces and therefore molecular potential energy are ignored, it is a function of temperature only. Two routes change it - doing work and transferring heat - and on this score the two are entirely equivalent, one joule of work and one joule of heat entering the internal-energy ledger without distinction, which is exactly equivalent substitution at work in thermal physics (see the equivalent substitution entry). Historically this was contested: the caloric theory held heat to be a massless fluid flowing from hot bodies to cold, and from 1843 Joule's experiments, in which a falling weight drove paddles through water, measured the mechanical equivalent of heat at about 4.184 joule per calorie, tying the work done to the temperature rise and ending caloric theory. A sense of scale: 1 kilogram of water falling 1000 metres, if all its lost gravitational work became its own internal energy, would warm itself by only about 2.3 ℃, so the conversion of mechanical energy into internal energy is understated rather than dramatic - rubbing hands, drilling fire, overheated brake pads and meteorites ablating in the atmosphere all take this same road. One distinction must be kept: internal energy is a state quantity while heat and work are process quantities, so saying a body contains so much heat is simply wrong. A frequent trap is equal temperature without equal internal energy: ice at 0 ℃ and water at 0 ℃ share a temperature but not an internal energy, because melting absorbs about 3.34×10⁵ joule per kilogram with no temperature change, the energy going into breaking the crystal lattice and raising the molecular potential energy; turning 100 ℃ water into 100 ℃ steam costs a further 2.26×10⁶ joule per kilogram. The microscopic meaning of temperature is in the kinetic theory entry, the work-energy conversion in the work and power entry, and keeping both books together is the first law of thermodynamics entry.",
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
            zh: "热力学第一定律是能量守恒定律在热力学系统的具体形式。式中 ΔU 为内能变化，Q 为系统吸收的热量，W 为外界对系统做的功。符号口径必须先声明：本站取 W 为外界对系统做的功，因此压缩气体与吸热都让内能增加；不少教材把 W 定义成系统对外做的功，公式随之写成 ΔU=Q−W，两者的物理内容一致，读题时先看约定再动笔算，这是最容易丢分的地方。四条常用推论：绝热过程 Q=0，外界对气体做功则升温，气体自己膨胀则降温，给自行车打气时筒壁发热、喷雾罐喷一会儿罐体变凉、湿润空气沿山坡爬升因绝热膨胀而凝结成云致雨，走的都是这一条；等容过程 W=0，吸热全部变成内能；等温过程对理想气体 ΔU=0，吸收的热量全部用来对外做功；循环过程回到初态，ΔU=0，一个循环净吸的热等于净做的功，热机正是靠这一点吃饭。能量守恒意味着第一类永动机，也就是不消耗能量而能源源不断对外做功的机器，根本造不出来；而光有守恒还不够，方向性的另一半限制见「热力学第二定律」条。混合量热法是常用的定量手段：在保温良好的容器里让热水与冷水混合，放出的热等于吸收的热，可以求末温或比热。把 1 千克 90 ℃ 的水与 1 千克 20 ℃ 的水混合，末温约 55 ℃；但若混进去的是 0 ℃ 的冰，就必须先扣掉熔解热，末温会明显低于只按比热算出的值，凡有相变就不能只用 Q=cmΔt（见「比热容」条与「物态变化」条）。热功当量的测定口径见「内能」条，绝热与等温的过程约束见「气体实验定律」条，能量在各形式之间的总量守恒见「机械能守恒」条。",
            en: "The first law is the conservation of energy written for thermodynamic systems. In the formula, ΔU is the change in internal energy, Q the heat absorbed by the system and W the work done on it by the surroundings. The sign convention has to be declared first: this site takes W as work done on the system, so compressing a gas and heating it both raise the internal energy, while many textbooks define W as work done by the system and write ΔU=Q−W instead; the physics is the same, and reading which convention a problem uses before calculating is where marks are most often lost. Four standard corollaries: in an adiabatic process Q=0, so work done on the gas warms it and expansion cools it - a bicycle pump grows hot in the hand, a spraying can turns cold after a few seconds, and moist air climbing a slope condenses into rain as it expands adiabatically; at constant volume W=0 and all absorbed heat becomes internal energy; in an isothermal process an ideal gas keeps ΔU=0 and converts all its absorbed heat into work done outward; and around a complete cycle the system returns to its starting state so ΔU=0, meaning the net heat taken in equals the net work delivered, which is precisely how a heat engine earns its living. Conservation of energy puts the first kind of perpetual motion machine - one that works forever without any energy input - out of existence, but conservation alone is not enough, and the missing half, the restriction on direction, is the second law of thermodynamics entry. The method of mixtures is the everyday quantitative tool: hot and cold water are combined in a well lagged vessel, heat given up equals heat taken, and one solves for the final temperature or the specific heat. Mixing 1 kilogram of water at 90 ℃ with 1 kilogram at 20 ℃ lands near 55 ℃, but if the addition is ice at 0 ℃ the latent heat of melting has to come off the top first and the final temperature falls well below what the specific-heat formula alone predicts; whenever a phase change is involved Q=cmΔt stops being sufficient, as the specific heat and phase change entries explain. The mechanical equivalent of heat is taken up in the internal energy entry, the adiabatic and isothermal constraints in the gas laws entry, and the accounting of energy across forms in the conservation of mechanical energy entry.",
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
            zh: "比热容是物质本身的属性，即单位质量的物质温度升高 1 ℃ 所吸收的热量。式中 Q 为吸收或放出的热量，c 为比热容，m 为质量，Δt 为温度变化。c 不随 Q、m、Δt 改变，说比热容与吸热成正比、与质量成反比是概念错误；它还随物态而变，冰的比热约 2.1×10³ 焦耳每千克摄氏度，只有水的一半左右。水的比热容 4.2×10³ 焦耳每千克摄氏度在常见物质里最大的一档，砂石约 0.92×10³、铁约 0.46×10³，同样受热时水的升温只有砂石的十分之一上下，于是有了沿海冬暖夏凉、内陆地区昼夜温差大的差别，也决定了白天风从海面吹向陆地、夜间反过来吹的海陆风（万物地理里“海边白天风为什么从海上吹来”一条用的正是同一机制）。城市比郊区常高 1 到 3 ℃ 的热岛效应，除了人为排热，还因为水泥与沥青热容大、蓄热多，而水面与植被的蒸发散热少（参见万物地理“城市为什么比郊区更热、雨更多”条）。工程上大量用水做冷却剂，看中的正是它比热大、便宜、易得：汽车发动机靠水冷循环把燃烧热带走约三分之一，暖气片、地暖与电站冷凝器同理；散热器要加鳍片、加风扇，是为了增大面积与加快热传递（见「热传递」条）。人靠出汗蒸发散热，当空气潮湿闷热、汗液难以蒸发时体温调节就会失灵，中暑的危险正来自这一点（体温调节口径见「万物生物」的内环境稳态条）。实验室里的比热实验多用混合量热法：保温、搅拌、快速读数、控制变量缺一不可，任何散热漏失都会让测得值偏小（见「控制变量法」条与「误差与有效数字」条）。算例：把 2 千克水从 20 ℃ 烧到 100 ℃ 需要 6.7×10⁵ 焦耳，用 1 千瓦的电水壶约需 11 分钟，而提供同样的热只要烧掉约 15 克汽油，可见燃料热值之高（口径见「热机与效率」条）。水的比热大还带来一个副作用：同样多的热，水温变化小，所以海是巨大的储热库，也是气候的缓冲器。",
            en: "Specific heat is a property of the material itself: the heat needed to raise one kilogram by one degree. In the formula, Q is the heat absorbed or released, c the specific heat, m the mass and Δt the temperature change. c does not vary with Q, m or Δt, so claiming it is proportional to the heat absorbed or inversely proportional to the mass is a conceptual error, and it changes with phase as well - ice sits near 2.1×10³ joule per kilogram per degree, about half that of water. Water's 4.2×10³ is the largest among common substances, against roughly 0.92×10³ for sand and stone and 0.46×10³ for iron, so with the same heat input water warms only about a tenth as much, which is what gives coastlands their mild winters and cool summers and the interior its huge day-to-night swing, and what drives the sea breeze by day and land breeze by night - the same mechanism the geography question bank uses when it asks why seaside wind blows from the sea during the day. The 1 to 3 ℃ urban heat island owes as much to the high heat capacity and storage of concrete and asphalt and to the loss of evaporative cooling from water and vegetation as to the heat people dump (see the geography entry on why cities are hotter than their suburbs and rainier). Engineering uses water as a coolant for exactly this reason: an engine's water loop carries away roughly a third of the heat of combustion, and radiators, underfloor heating and power-station condensers work the same way, while adding fins and a fan to a radiator is about enlarging area and speeding heat transfer, as the heat transfer entry sets out. People shed heat by sweating, and when humid air stops the sweat evaporating, temperature regulation fails, which is where heatstroke comes from (see the biology entry on homeostasis). The laboratory measurement uses the method of mixtures, where insulation, stirring, quick reading and controlled variables are all needed and any heat leak biases the result low, as the control of variables and error and significant figures entries warn. A worked number: raising 2 kilograms of water from 20 ℃ to 100 ℃ costs 6.7×10⁵ joule, about 11 minutes on a 1 kilowatt kettle, and the same heat comes from burning only some 15 grams of gasoline, which shows how dense a fuel's energy is (see the heat engine and efficiency entry). One side effect of water's great heat capacity is worth naming: the sea is an enormous storehouse of heat and therefore a buffer for climate.",
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
          detail: {
            zh: "热传导、热对流与热辐射这三条路总是同时出现，只是主次随场景而变，而它们的方向都一样：热自发地从高温物体流向低温物体，直到热平衡为止。传导靠分子碰撞与自由电子把能量一层层传下去，没有宏观的物质迁移：金属快，银与铜的导热率约 400 瓦每米开尔文，空气与聚苯乙烯泡沫只有 0.03 左右，差着上万倍，所以冬天赤脚踩瓷砖比踩木地板更冷，并不是瓷砖温度低，而是它把脚底的热抽走得快；被子与羽绒服靠锁住静止空气保温，晒被子恢复蓬松就是把空气层重新撑起来。对流只能发生在流体里，靠宏观流动搬热：受热部分密度变小而上升、较冷的部分补上来，就是自然对流，暖气片装在低处、冰箱里冷空气自上而下、烟顺烟囱而出都属此类；用电扇或水泵强迫流动叫强制对流，海陆风与大气环流是自然对流的大尺度样本。辐射不需要任何介质，是电磁波携带能量，因而也是真空中唯一的方式，太阳的热正是穿过太空的真空抵达地球。辐射强弱随热力学温度的四次方增长，峰值波长随温度升高而变短（口径见「电磁波谱与应用」条），307 开尔文的人体峰值在约 9.4 微米的红外波段，红外热像仪就是靠它成像；黑色粗糙面吸收与发射都强，白亮抛光面两者都弱。保温瓶又称杜瓦瓶，1892 年由杜瓦发明，它一次堵住三条路：真空夹层断掉传导与对流，镀银内壁反射辐射，短颈与塞子减少口部散热，因此既能保冷也能保热，但只能减慢传热而不能阻止。晴朗无风的夜晚地面向外强烈辐射而辐射冷却，气温降到露点以下就结露，再低就直接凝华为霜（万物地理“晴朗无风的夜晚为什么容易起霜”一条与此同一口径）。判断谁主导要看场景：锅柄烫手是传导，烧开水是对流，围着火炉与晒背是辐射。最后记住热量既不是温度也不是内能，它只是传递过程中能量的多少，内能的口径见「内能」条。",
            en: "Thermal conduction, thermal convection and thermal radiation are always present together and only trade places in importance from scene to scene, while all three share one direction: heat runs spontaneously from hot to cold until equilibrium is reached. Conduction passes energy down layer by layer through molecular collisions and free electrons with no bulk transfer of matter: metals are quick, silver and copper conduct at roughly 400 watt per metre kelvin while air and polystyrene foam manage about 0.03, some ten thousand times less, so bare feet find a tiled floor colder than a wooden one not because the tile is at a lower temperature but because it drains heat from the sole faster; quilts and down jackets insulate by trapping still air, and airing them out fluffs the air layers back up. Convection can occur only in fluids and carries heat by bulk motion: warmed fluid becomes less dense and rises while colder fluid takes its place, which is natural convection - radiators sit low, cold air in a refrigerator circulates downward, smoke climbs the chimney - whereas a fan or pump makes it forced convection, and the sea breeze and the general atmospheric circulation are natural convection on a large scale. Radiation needs no medium at all and carries energy as electromagnetic waves, so it is the only route across a vacuum, and the Sun's heat reaches the earth through empty space. Radiated power grows with the fourth power of thermodynamic temperature and the peak wavelength shortens as temperature rises (see the electromagnetic spectrum and applications entry), so a body at 307 K peaks near 9.4 micrometres in the infrared, which is all a thermal camera needs, and black rough faces both absorb and emit strongly while bright polished faces do neither. The vacuum flask, also called the Dewar after its 1892 invention by Dewar, closes all three roads at once: the vacuum gap kills conduction and convection, the silvered walls reflect radiation, and the short neck with a stopper limits losses at the mouth, so it keeps cold things cold as readily as hot things hot, slowing transfer but never stopping it. On a clear windless night the ground radiates away its heat and cools radiatively, dew forms once the air drops to its dew point and frost deposits directly from vapour below that, which is the same account the geography question gives for why clear still nights are frosty. Deciding which route dominates is a matter of scene: a hot pan handle is conduction, boiling water is convection, and sitting by a fire or sunbathing is radiation. One last caution: heat is neither temperature nor internal energy but simply energy in transit, and the internal energy entry draws that line.",
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
            zh: "六种变化两两互逆：熔化与凝固、汽化与液化、升华与凝华，前三个吸热、后三个放热。晶体有固定熔点，非晶体如玻璃、松香、沥青与蜡没有，加热时只是逐渐变软变稀，这是教材常作的区分。晶体熔化时吸热而温度不变，因为能量用来破坏晶格、增加分子势能，而温度只记平均动能的账（温度的微观含义见「分子动理论」条）；同理凝固要放热，所以果农在霜夜往苗圃灌水，水结冰释放的熔解热能把苗护住。潜热的数值很大：冰的熔解热约 3.34×10⁵ 焦耳每千克，相当于把同质量的水升温约 80 ℃ 所需的热；水的汽化热约 2.26×10⁶ 焦耳每千克，相当于升温约 538 ℃，这就是 100 ℃ 的水蒸气烫伤远比 100 ℃ 的开水严重的道理，也是发烧时出汗能带走大量热的原因。汽化分两条路：蒸发在任何温度下都进行、只发生在表面、并且有致冷作用，湿衣服晾干、狗伸舌喘气、擦酒精降温靠的都是它，影响它的三个因素是温度、表面积与空气流动；沸腾则要在特定温度下于表面和内部同时发生，气泡升到液面破裂，而且必须继续供热才能维持。气压与沸点的关系是一条正相关：气压升高沸点随之升高，高原油压约 60 千帕时水到 86 ℃ 就沸腾，饭煮不熟才需要高压锅，而密封的高压锅把压强提到约 2 个标准大气压、沸点升到约 120 ℃，饭菜熟得快。液化有两条路，降温和压缩体积，液化石油气在常温下靠压缩成液态装进钢瓶，冬天哈气、冰镇饮料外壁的水珠、洗过热水澡时镜面上的一层雾都是水汽遇冷液化；此处最常考的一个说法是白气不是水蒸气而是悬浮的小水滴，水蒸气本身看不见。露是水汽在草叶上液化的产物，霜是水汽直接凝华，雾是近地面水汽液化成悬浮小滴的天气现象，判断时先看温度是否降到 0 ℃ 以下。升华与凝华的例子：樟脑丸越放越小、冻干食品先把原料冻结再在真空里让冰升华脱水、钨丝蒸发后在灯泡内壁凝华发黑、干冰升华吸热使周围水汽凝华成冰核从而人工降雨。易错有三处：达到熔点还不算熔化，必须继续吸热；标准气压下冰水混合物的温度是 0 ℃ 而不是 4 ℃；有相变时不能再单纯用比热公式算末温（见「比热容」条与「热力学第一定律」条）。海陆风与霜的口径与万物地理同出一源。",
            en: "Melting and freezing, vaporisation and condensation, sublimation and deposition are three inverse pairs, the first of each absorbing heat and the second releasing it. Crystals have a fixed melting point while amorphous solids such as glass, rosin, pitch and wax do not - they merely soften and thin out on heating, which is the standard textbook distinction. A melting crystal takes in heat at constant temperature because the energy goes into dismantling the lattice and raising molecular potential energy, while temperature books average kinetic energy only, as the kinetic theory entry explains; freezing therefore gives heat back, which is why growers flood seedbeds on frosty nights, since the latent heat released by the freezing water shields the seedlings. The latent heats are large: melting ice costs about 3.34×10⁵ joule per kilogram, as much heat as would raise the same mass of water by some 80 ℃, and vaporising water costs 2.26×10⁶ joule per kilogram, equivalent to a 538 ℃ rise, which is why a scald from 100 ℃ steam is far worse than one from 100 ℃ boiling water, and why sweating off a fever removes so much heat. Vaporisation runs on two tracks: evaporation happens at any temperature, only at the surface, and cools the liquid, which is how wet clothes dry, how a dog pants to lose heat and how rubbing alcohol chills the skin, with temperature, surface area and airflow as the three controls; boiling needs its own characteristic temperature, happens at the surface and inside together as bubbles that break at the top, and stops the moment heating stops. The boiling point follows the pressure: at a plateau pressure of some 60 kilopascals water boils already at 86 ℃ and rice refuses to cook through, which is why high ground needs a pressure cooker, and a sealed cooker raising the pressure to about two atmospheres pushes the boiling point near 120 ℃ so food softens quickly. Condensation also has two routes, cooling and compressing the volume - liquefied petroleum gas is simply propane squeezed liquid into a cylinder at ordinary temperature, while breath fogging in winter, beads on a cold drink can and the film on a bathroom mirror are vapour meeting a cold surface. The exam favourite here is that white mist is not water vapour but suspended droplets, since vapour itself is invisible. Dew is vapour liquefied on blades of grass, frost is vapour deposited directly, and fog is droplets suspended near the ground, so the first question is whether the surface fell below 0 ℃. Sublimation and deposition: mothballs shrink away, freeze-dried food is first frozen then placed in vacuum so its ice sublimes straight out, tungsten evaporated from a filament darkens the bulb by depositing on it, and dry ice seeding rain works by subliming, cooling the air until vapour deposits into ice nuclei. Three traps: reaching the melting point is not melting, since heat must keep flowing in; an ice-water mixture sits at 0 ℃ at one atmosphere, not 4 ℃; and once a phase change is in play the final temperature cannot be found from the specific-heat formula alone, as the specific heat and first law entries warn. The accounts of the sea breeze and of frost run together with the geography course.",
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
            zh: "热机把内能转化为机械功，效率 η 等于有用功与吸收热量之比。式中 η 为热机效率，T热 与 T冷 为高温、低温热源的热力学温度（开尔文）；卡诺热机效率 η=1−T冷/T热，只与两热源温度有关，而任何实际热机都达不到这个上限。按 600 K 与 300 K 算上限是 50%，按 800 K 与 300 K 算约 62.5%，可实际柴油机只做到 40% 上下，蒸汽机在 10% 左右徘徊，早期的往复式蒸汽机甚至只有百分之几，可见上限从来不是瓶颈。蒸汽机是外燃机，燃烧在气缸外的锅炉里进行，热量要穿过缸壁与管道，瓦特改良后的机型效率不过百分之几，这是它被取代的原因。内燃机把燃烧搬进气缸，减少了缸壁散热与笨重锅炉，效率大幅提高：四冲程的工作循环是吸气、压缩、做功、排气，曲轴转两转只有一个冲程对外做功，转速 3000 转每分意味着每缸每秒 25 个做功冲程，压缩冲程把机械能转为内能（见「内能」条），做功冲程反过来。汽油机靠火花塞点燃，压缩比约 8 到 11；柴油机没有火花塞，把空气压到柴油自燃，压缩比 14 到 25，效率更高、更省油但更重。燃料的本领用热值衡量：汽油约 4.6×10⁷ 焦耳每千克、柴油约 4.3×10⁷、无烟煤约 3.4×10⁷、氢约 1.43×10⁸，燃烧是化学反应，口径见「万物化学」的燃烧热条。效率为什么上不去？废气带走约三分之一的热、冷却系统带走约三分之一、剩下才轮到摩擦与不完全燃烧，这也是给锅炉与发动机加余热回收的道理。把 η=1−T冷/T热 与「热力学第二定律」条一起读才完整：即使没有摩擦，热机也不能把吸收的热全部变成功，因为必须有冷源接收废热。工程上提高上限的办法是把高温热源做热——涡轮前温度已推到 1400 到 1700 ℃ 并靠叶片气膜冷却撑住，而冷源受环境温度卡住，几乎无从下手。数值锚：效率 30% 的热机每吸入 1 兆焦耳的热，只输出 0.3 兆焦耳的功，余下 0.7 兆焦耳变成废热排入环境，这也是热污染与城市热岛的一部分来源（见「比热容」条）。",
            en: "A heat engine converts internal energy into mechanical work, with efficiency η equal to useful work over heat absorbed. In the formula, η is the efficiency and T_hot and T_cold are the thermodynamic temperatures of the hot and cold reservoirs; a Carnot engine reaches η=1−T_cold/T_hot, which depends on nothing but those two temperatures, and every real engine falls short of it. At 600 K and 300 K the ceiling is 50 percent, at 800 K and 300 K about 62.5 percent, yet a real diesel manages some 40 percent and a steam engine lingers near 10 percent, with early reciprocating engines down in the single digits, so the ideal ceiling is far from the binding constraint. The steam engine is external combustion: burning happens in a boiler outside the cylinder and its heat must cross walls and pipes, and Watt's improved machines never rose far above a few percent, which is exactly why they were displaced. The internal combustion engine moves the burning inside the cylinder, cutting wall losses and the heavy boiler, and efficiency climbs: the four-stroke cycle runs intake, compression, power and exhaust, the crankshaft turns twice for a single power stroke, so 3000 revolutions per minute means each cylinder fires 25 times a second, with the compression stroke turning mechanical energy into internal energy (see the internal energy entry) and the power stroke reversing that. A petrol engine ignites by spark plug at a compression ratio of 8 to 11; a diesel has no plug and compresses air until injected fuel self-ignites, at 14 to 25, giving better economy at the cost of weight. Fuel quality is measured by calorific value: petrol about 4.6×10⁷ joule per kilogram, diesel 4.3×10⁷, smokeless coal 3.4×10⁷ and hydrogen 1.43×10⁸, and since burning is a chemical reaction the chemistry course's heat of combustion entry sets that convention. Why does efficiency stall? The exhaust carries off roughly a third of the heat, the cooling system another third, and only then come friction and incomplete burning, which is what waste-heat recovery tries to reclaim. Read together with the second law of thermodynamics entry the picture becomes complete: even frictionless, an engine cannot turn all its absorbed heat into work, because a cold sink must accept the waste heat. The practical way to lift the ceiling is to make the hot side hotter - turbine inlet temperatures now reach 1400 to 1700 ℃, held up by film-cooled blades - while the cold side is pinned to ambient temperature and offers almost nothing. One worked number: a 30 percent engine takes in 1 megajoule of heat, delivers 0.3 megajoule of work and dumps 0.7 megajoule into the environment, which feeds both thermal pollution and the urban heat island (see the specific heat entry).",
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
            zh: "理想气体状态方程把压强、体积、温度与物质的量联系起来。式中 p 为压强，V 为体积，n 为物质的量，R 为气体常数，T 为热力学温度；玻意耳的等温律 pV=C、查理的等容律 p∝T 与盖-吕萨克的等压律 V∝T 是它分别在等温、等容与等压下的特例，R 取 8.314 焦耳每摩尔开尔文，1 摩尔气体在标准状况下占 22.4 升。理想气体本身是理想模型（见「理想模型」条）：分子体积与分子间作用力都被忽略，真实气体在压强不高、温度不低时近似符合，在高压低温下会偏离甚至液化。把方程写成 pV=NkT（N 是分子数、k 是玻尔兹曼常数）就露出它的微观身份：压强来自大量分子对器壁的撞击，决定它的是分子数密度与平均动能，而平均动能正比于温度，与「分子动理论」条同一口径；R=N_A·k，式中 N_A 为阿伏伽德罗常数（亦作阿伏加德罗），数值口径见「摩尔气体常量」条与「阿伏伽德罗常数」条。数字例子：300 K 的空气，按方均根速率公式 √(3RT/M) 取 M=0.029 千克每摩尔算得约 508 米每秒，比声速还快，可见声速并不由分子速率单独决定，而取决于碰撞逐级传递扰动的方式——这一点要回到「声速」条去看。应用与易错同样多：气球升空时外部气压降低而体积膨胀；潜水员上浮时肺内气体膨胀，所以绝不可憋气上升；夏天暴晒的车胎里气体温度上升、体积受限，于是压强增大；用注射器封住一段空气推压感到回弹，正是玻意耳定律的手感。最常见的两个错误是把摄氏温度直接代入公式（必须换成热力学温度，见「温度与温标」条），以及以为温度升高压强必然增大——若体积同时膨胀，压强完全可以不变甚至下降，判断前要先看清哪两个量被约束住。与质量守恒联用时的常用形式是 pV/T 不变（n 固定），而画 p-V 图求功是「图象法与函数思想」条的标准用途。",
            en: "The ideal-gas equation links pressure, volume, temperature and amount of substance. In the formula, p is pressure, V volume, n the amount of substance, R the gas constant and T the thermodynamic temperature; Boyle's isothermal law pV=C, Charles's isochoric law p∝T and Gay-Lussac's isobaric law V∝T are its special cases under constant temperature, volume and pressure respectively, with R=8.314 joule per mole kelvin and one mole of gas occupying 22.4 litres at standard conditions. An ideal gas is an idealised model, as the idealized models entry insists: molecular volume and intermolecular forces are both ignored, so real gases follow the equation well at modest pressure and comfortable temperature but drift away, and even liquefy, under high pressure and low temperature. Rewriting it as pV=NkT, with N the number of molecules and k the Boltzmann constant, exposes its microscopic identity - pressure comes from molecules hammering the wall, set by their number density and their mean kinetic energy, and that energy is proportional to temperature, exactly the reading of the kinetic theory entry. Here R=N_A·k, where N_A is Avogadro's number, whose conventions belong to the molar gas constant and Avogadro's number entries. One number: air at 300 K has a root-mean-square speed of about 508 metre per second from √(3RT/M) with M=0.029 kilogram per mole, faster than sound, so the speed of sound cannot be set by molecular speed alone but by how collisions relay a disturbance, which belongs to the speed of sound entry. Applications and mistakes come in equal supply: a rising balloon expands as outside pressure falls; an ascending diver must never hold his breath because the gas in his lungs expands; a tyre left in summer sun sees its pressure climb as temperature rises in a fixed volume; and pushing the plunger of a syringe with the nozzle sealed gives Boyle's law in the hand. The two commonest errors are substituting a Celsius reading straight into the equation - it must become thermodynamic temperature, as the temperature and scales entry demands - and assuming that heating must raise the pressure: if the volume is free to expand the pressure can stay put or even fall, so one must first identify which two quantities are constrained. With the amount of substance fixed the handy form is pV/T unchanged, and reading work off a p-V diagram is the standard use of the graphs and functional thinking entry.",
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
            zh: "热力学第二定律有两类表述，而它们彼此等价。克劳修斯表述说热量不能自发地从低温物体传向高温物体，而不引起其他变化；开尔文与普朗克的表述说不可能从单一热源吸热并把它全部变成功，而不产生其他影响。本条的两句话合起来才是它的全部力量：它指出了宏观过程的方向性，也被视为时间箭头的来源。第一类永动机被「热力学第一定律」条以守恒之名禁止，第二类永动机则是从单一热源（比如海洋）吸热全部变功的机器，它不违反守恒，却被本定律判了死刑；即便理想无摩擦的热机，也必须向冷源放废热，效率上限由「热机与效率」条的卡诺公式给出。熵是这套方向性的量度：可逆过程中 ΔS=Q/T，式中 ΔS 为熵变，Q 为吸收的热量，T 为吸热时的热力学温度，孤立系统的熵永不减少。1 千克水从 0 ℃ 加热到 100 ℃，熵增加约 1.3×10³ 焦耳每开尔文（用 ΔS=mc ln(T2/T1) 算），冰熔化成水时熵增约每千克 1.2×10³ 焦耳每开尔文，都是分子排列从有序走向无序的账；玻尔兹曼把熵写成 S=k ln W，式中 W 是对应宏观状态的微观状态数，这公式就刻在他的墓碑上（见「路德维希·玻尔兹曼」条，术语释义见「熵」条）。能量耗散是本定律的日常面孔：能量总量守恒，但可用度在下降——燃料里的化学能烧完之后变成环境里几十开尔文的低温热，虽然一分不少，却再也收不回来做功，所以能量守恒并不等于不必节约能源。常见误解有四个：一是以为冰箱与空调在违反本定律，其实它们靠压缩机消耗外界做功把热从冷处搬到热处，并非自发，而在开着门的厨房里吹空调只会让房间更热；二是把熵增当成宇宙万物都在变得混乱的口号，局部完全可以变得更有序，只要向环境排出更多的熵，生命与雪花都属此类；三是以为热量大的过程熵就增得多，实际上熵变还除以温度，同样的热在低温处造成的熵变更大；四是以为能量耗散等于能量消失。把时间方向说成由本定律给出，是因为守恒定律本身对过去与未来不分优劣，只有熵增给出一条箭头的指向；而宇宙早期的低熵起点是另一个更深的问题，与「大爆炸宇宙论」条和「宇宙微波背景」条相互衔接。",
            en: "The second law comes in two statements that turn out to be equivalent. Clausius says heat cannot of itself pass from a colder body to a hotter one without further change; Kelvin and Planck say no engine can take heat from a single reservoir and convert it all into work without any other effect. Taken together the two statements do the whole work: they fix the direction of macroscopic processes and are read as the source of the arrow of time. The first kind of perpetual motion machine is barred by the first law of thermodynamics entry on the grounds of conservation; the second kind - one drawing heat from a single reservoir such as the sea and turning it wholly into work - breaks no conservation law yet is condemned by this one, and even a frictionless ideal engine must still discharge waste heat to a cold sink, its ceiling given by the Carnot formula in the heat engine and efficiency entry. Entropy measures this directionness: in a reversible process ΔS=Q/T, where ΔS is the entropy change, Q the heat absorbed and T the thermodynamic temperature at which it is taken, and the entropy of an isolated system never decreases. Heating 1 kilogram of water from 0 ℃ to 100 ℃ adds about 1.3×10³ joule per kelvin (from ΔS=mc ln(T2/T1)), and melting ice adds some 1.2×10³ joule per kilogram, both bookkeeping for the passage from ordered to disordered molecular arrangement; Boltzmann wrote it as S=k ln W, where W is the number of microscopic states matching that macroscopic state, and the formula stands on his tombstone (see the Ludwig Boltzmann entry, and the entropy entry for the term). Energy dissipation is the law's everyday face: the total is conserved but the availability decays, since the chemical energy of fuel ends up as low-grade warmth in the environment at a few hundred kelvin which, though not a joule of it is lost, can never be gathered back to do work, so conservation is no licence for wastefulness. Four misunderstandings are worth naming. First, refrigerators and air conditioners do not violate the law: a compressor spends external work to pump heat from cold to hot, so the transfer is not spontaneous, and running an air conditioner with the kitchen door open only heats the room. Second, the increase of entropy is not a slogan that everything is getting messier: a local region can become far more ordered provided it exports more entropy to its surroundings, as a living body and a snowflake both do. Third, a large heat flow does not automatically mean a large entropy change, since the division by temperature matters and the same heat delivered at low temperature produces the bigger increase. Fourth, dissipation is not disappearance. Calling the second law the origin of the arrow of time is exact in this sense: the conservation laws make no distinction between past and future, and only entropy increase points one way, while the low-entropy starting point of the early universe is a deeper question that meets the big bang theory and cosmic microwave background entries.",
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
            zh: "库仑定律 F = k·q₁q₂/r² 有两条前提：真空中、点电荷。r 趋于零时公式趋于无穷大是假象——带电体已有尺寸、电荷会重新分布，公式早已失效；反过来，均匀带电球体在球外等效于电荷全在球心，这才让它能用于天体与微观模型。k = 9×10⁹ N·m²/C² 看着比引力常数 G = 6.67×10⁻¹¹ 大了二十个数量级，但两者量纲不同、不能直接比大小；能比的是同一对粒子之间的两种力：两个质子相距同距时电力约是万有引力的 10³⁶ 倍（两个电子更达 4×10⁴² 倍），所以微观世界引力彻底靠边、原子结构全由电力决定；天体则几乎等量正负、抵消得干干净净，长程只相加不抵消的引力反倒在宇宙尺度上独裁（与力学万有引力条同口径）。电量必须一份一份来：e = 1.6×10⁻¹⁹ C 由密立根 1909 年起的油滴实验钉成实验事实，任何宏观带电体的电量都是它的整数倍。起电只有三条路——摩擦（得失电子）、接触、感应；感应起电的妙处在于不必碰触：先让导体靠近带电体、再在远端接地、最后断开，导体就带上了异种电荷。两个完全相同的导体球接触后电量均分，但不相同的两球并不一定平分，这是题目的常见陷阱。力的方向永远沿两球心的连线，多个电荷同时存在时求某个电荷的合力就得逐对算完再做矢量相加，电力同样满足叠加原理。式中 k 为静电力常量，q₁、q₂ 为两点电荷电量，r 为间距。",
            en: "Coulomb's law F = k q₁q₂/r² carries two conditions: vacuum, and point charges. The infinity the formula predicts as r goes to zero is an illusion - real charged bodies have size and their charge redistributes, so the equation has long since stopped applying; conversely a uniformly charged sphere acts from outside as if all its charge sat at its centre, which is what lets the law be used on planets and on model atoms. k = 9 × 10⁹ N·m²/C² looks some twenty orders of magnitude above G = 6.67 × 10⁻¹¹, but the units differ and the constants cannot simply be compared - what can be compared is the two forces between the same pair of particles: at any equal separation the electric push between two protons is about 10³⁶ times their gravitational pull (about 4 × 10⁴² for two electrons), so gravity drops out of micro physics and atomic structure is entirely electric. Bulk matter holds nearly equal amounts of plus and minus and cancels almost perfectly, which is why the long-ranged, never-cancelling gravity rules the astronomical scale instead. Charge comes in whole units: e = 1.6 × 10⁻¹⁹ C, fixed as experimental fact by Millikan's oil-drop work from 1909, and any macroscopic charge is a whole multiple of it. There are only three ways to charge something - rubbing (electrons gained or lost), touching, and induction. The trick of induction is that nothing need be touched: bring a conductor near a charged body, ground its far side, then lift the ground, and the body is left with the opposite charge. Two identical conducting spheres share their total equally on contact, but two unequal ones need not, a standing trap in problems. The force always lies along the line of the two centres, and with several charges present the net force on any one of them means computing every pair and then adding vectors - electric forces obey superposition like everything else. Symbols: k the electrostatic constant, q₁ and q₂ the two point charges, r their separation.",
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
            zh: "电场是客观存在的特殊物质：没有媒质边界、不需接触就能施力，且满足叠加原理——空间某点的场强是各个源电荷单独所致的矢量和，与那里放不放置试探电荷无关。E = F/q 取的是正电荷的受力方向，所以负电荷受力与之恰好反向，这是第一处易错。两条公式外形相似而身份完全不同：E = F/q 是定义式（比值法），对任何电场都成立、却答不了「这场是谁造的」；E = kQ/r² 是点电荷的决定式，只适用于点电荷（或均匀带电球体外部），但真正把电量与距离带了进来。二者不能混用，这是第二处易错。电场线是为可视化而画的假线，空间里并没有；静电场的电场线自正电荷出发、终止于负电荷，不闭合、不相交（磁感线则闭合，见磁场条），线上某点的切线方向才是该点场强方向，疏密表大小。由此得到一个硬结论：带电粒子的运动轨迹一般不沿电场线，只有在电场线是直线且粒子初速为零或初速与线共线时两者才重合，这是第三处易错。点电荷的场是辐射状的直线；等量同种电荷在中点场强为零而电势不为零，等量异种电荷在中垂线上处处场强不为零而那条中垂线恰好是等势线，这两组对照几乎每届考试都要考。匀强电场最规整的实例就是一对平行正对带电板之间（靠边缘处弯曲，称边缘效应）。粒子的电量与质量之比叫比荷，它决定粒子在给定场里响应得多快，是质谱与回旋加速器一切讨论的入口。式中 E 为电场强度，F 为试探电荷受力，q 为试探电荷电量。",
            en: "An electric field is objective matter of a special kind: it has no boundary of medium, pushes without contact, and obeys superposition - the field at a point is the vector sum of what each source charge would produce alone, and it does not care whether a test charge happens to sit there. E = F/q takes the direction of the force on a positive charge, so a negative charge is pushed the opposite way; that is trap one. Two formulas look alike but have different identities: E = F/q is the defining ratio, valid for any field yet silent about who made it, while E = kQ/r² is the constructive law for a point charge (or outside a uniformly charged sphere), which actually brings charge and distance in. Mixing them up is trap two. Field lines are drawn for visualization and are not in the space: electrostatic lines leave positive charge and end on negative, they neither close on themselves nor cross (magnetic lines do close - see the magnetic-field entry), the tangent at a point gives the direction there and the spacing gives the strength. A hard consequence follows: a charge's trajectory generally does not follow a field line, and the two coincide only when the line is straight and the particle starts from rest or straight along it - trap three. A point charge gives straight radial lines; for two equal like charges the field vanishes at the midpoint while the potential does not, and for two equal opposite charges the field is nonzero everywhere along the perpendicular bisector while that bisector itself is an equipotential - this pair is examined almost every year. The tidiest uniform field is the space between two facing parallel plates, bending near the rim (edge effect). The charge-to-mass ratio fixes how fast a particle answers a given field and is the entry point to everything in the mass spectrometer and the cyclotron. Symbols: E field strength, F the force on the test charge, q its charge.",
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
            zh: "φ = E_p/q 只由电场本身与位置决定，E_p = qφ 才把电荷也拉进来——一个是场地的属性、一个是双方共同持有，恰似力学里 g 与 mgh 的分工，混用为第一易错。电势可正可负，负号先要问零势点取在哪里（常取大地或无穷远），与选取无关的永远只是差值 U。判断大小只有一条硬规矩：沿电场线电势必然降低；但场强大小与电势高低没有直接关系——场强很大的地方电势可以很低，匀强电场里更是每段相等降落而处处场强相同，这是第二易错。符号要算数：负电荷在电势低处的电势能反而大，所以电子沿着电场线跑时电场力做负功、自己的势能升上去，与常见直觉正相反。等势面与电场线垂直，沿等势面移动电荷电场力不做功；处于静电平衡的导体是一整块等势体，内部场强为零、净电荷只分布在表面（尖端处密集，故有尖端放电与避雷针），内部因此不受外场影响——这就是静电屏蔽，金属网罩、汽车外壳、高压带电作业的均压服与实验室的屏蔽室都靠这一条。鸟停在高压输电线上不会被电击，原因也在这一条：它两爪接触同一根导线，那一段线上的电势差只是毫伏量级；真正危险的是跨步电压：落地电线周围，人前后两脚之间可能承上上百伏，所以要并脚跳离或小步挪开。解题上省力的一笔是：电场叠加要分解矢量，而电势是标量、直接代数相加。常见量级：雷雨前地面附近的场强可达 10⁴ V/m 量级，空气的绝缘强度约 3×10⁶ V/m，即每千伏大约对应几厘米的火花长度。式中 U 为电势差（电压），W 为电场力做的功，q 为电荷电量。",
            en: "φ = E_p/q is fixed by the field and the place alone, while E_p = qφ brings the charge in as well - one is a property of the terrain, the other is held jointly, exactly the division of labour between g and mgh in mechanics; confusing them is trap one. Potential can be negative, but the minus sign first asks where you set the zero (usually the earth or infinity), and only the difference U is independent of that choice. There is one hard rule for ranking: potential must fall along a field line. But field strength and potential height are not tied together - a very strong field can sit at low potential, and in a uniform field every equal step drops the same amount while the field never changes, which is trap two. Signs must actually be counted: a negative charge has more potential energy where the potential is lower, so an electron travelling along a field line has the field doing negative work and its energy rising, against the usual intuition. Equipotential surfaces are perpendicular to field lines and no work is done moving along one; a conductor in electrostatic equilibrium is one equipotential lump with zero internal field and all net charge on its surface (crowded at points, hence point discharge and the lightning rod), so its interior is cut off from outside fields - which is electrostatic shielding, the trick behind a wire mesh cage, a car body, the conductive suit worn for live-line work and a shielded laboratory room. This is why a bird perched on a high-voltage line survives - both feet share one wire whose drop is millivolts - while step voltage is genuinely dangerous, since a fallen line can put a hundred volts between a person's two feet, so one retreats with feet together or in tiny shuffles. The saving move in problems: superposing fields needs vector decomposition, but potential is a scalar and simply adds. For scale: the field near the ground before a thunderstorm can reach 10⁴ V/m, and air breaks down near 3 × 10⁶ V/m, i.e. a few centimetres of spark per kilovolt. Symbols: U potential difference (voltage), W the work done by the electric force, q the charge.",
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
            zh: "C = Q/U 是比值定义法：电容由结构与介质决定，不随带电量与电压变化，正如电阻不随 U、I 变化——定义式、决定式、计算式要分得清。平行板决定式 C = εS/(4πkd)（写成 C = ε_rε₀S/d 等价）给出三个把手：面积、间距、介质。先算一笔数量级的账：1 cm² 的正对方片、隔 1 mm 空气，电容只有约 0.89 pF，这就是电子线路里电容常以皮法、微法计的原因。两条状态必须辨清：一直连着电源则 U 不变，拉开极板（d 升、C 降、Q 与 E 都跟着降）；充完电断开电源则 Q 不变，拉开极板时 U 反而升高，且板间场强不变（把 C 与 Q 代回 E = U/d 后得 4πkQ/(εS)，与 d 无关），这是最常见的易错点。储存的能量 W = ½CU²：充电要克服斥力做功、放电全部交出，所以电容是储能器件。介质被强电场电离后就不再绝缘，称为击穿，故每个电容都有耐压值（标称容量与耐压是两个数字）。实际器件中电解电容有正负极、接反会鼓包甚至爆裂；超级电容靠双电层把有效间距压到纳米量级，容量能到数千法拉、充放极快、循环寿命长，但耐压只有几伏、能量密度远低于锂电池，因此当不了储能主力，只在刹车能量回收与需要瞬间大电流的场合干活。应用面也很宽：收音机调谐、单相电机启动、断电后短时供电、指纹识别与触控屏都靠它；说电容「通交流、隔直流」并不是电荷穿过了介质，而是极板上电荷来回移动的等效效果。式中 C 为电容，Q 为极板带电量，U 为电压，ε 为介电常数，S 为极板面积，d 为间距。",
            en: "C = Q/U is a ratio definition: capacitance is set by geometry and dielectric, not by how much charge or voltage happens to be present, just as resistance does not depend on U and I - keep definition, construction and calculation formulas apart. The parallel-plate law C = εS/(4πkd) (equivalently ε_rε₀S/d) offers three handles: area, spacing, dielectric. Do the scale book first: two 1 cm² squares 1 mm apart in air give about 0.89 pF, which is why circuit capacitors are quoted in picofarads and microfarads. Two regimes must be told apart. Kept wired to the supply, U is fixed, so pulling the plates apart lowers C, Q and E together; charged then disconnected, Q is fixed, so pulling the plates raises U while the field between them does not change at all (substituting into E = U/d leaves 4πkQ/(εS), independent of d) - the single most common trap. Stored energy is W = ½CU²: charging means working against repulsion, discharging hands it all back, so a capacitor is an energy device. Once a strong field ionises the dielectric it stops insulating - breakdown - hence every capacitor has a withstand rating, and nominal capacitance and withstand voltage are two different numbers. Electrolytic capacitors have polarity and will swell or burst if reversed; supercapacitors squeeze the effective gap to nanometres with a double layer, reaching thousands of farads with very fast charge and long cycle life, yet only a few volts of withstand and an energy density far below lithium cells, so they cannot be the main store and serve instead in brake-energy recovery and places needing a sudden burst of current. The uses are broad: radio tuning, single-phase motor starting, brief hold-up after power loss, fingerprint and touch screens. Saying a capacitor 'passes AC and blocks DC' is not charge crossing the dielectric but the equivalent effect of charge shuffling on the plates. Symbols: C capacitance, Q plate charge, U voltage, ε permittivity, S plate area, d the gap.",
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
            zh: "先区分两条电阻公式：R = U/I 是定义式（适用于任何导体，包括非线性元件），R = ρL/S 才是决定式，它把材料、长度与截面带进来。欧姆定律本身也有适用条件：金属与电解液导电成立，气体导电、二极管等非线性元件不成立，这类元件只能看伏安特性曲线取点。电阻随温度变：金属的随温度上升（钨丝从常温到工作温度电阻可涨十几倍，故白炽灯绝大多数都在开灯瞬间烧掉——冷态电流冲击最大），碳与半导体则相反，某些合金几乎不变而用作标准电阻与电热丝。超导是另一件事：降到临界温度以下电阻突降为零，但电流或磁场一旦超过临界值就恢复，而且不是所有材料都有这一档。第二组易错在电动势与路端电压：电动势 ε 描述电源把其他形式的能变成电能的本领、由电源本身定；路端电压 U = ε − Ir 随电流增大而下降，所以下午用电高峰时灯会略暗。12 V 的电池内阻 0.5 Ω、输出 1 A 时路端只剩 11.5 V，短路时电流高达 24 A 而路端为零——这就是短路最伤电源、也最容易起火的原因。电流定义 I = Q/t 只问每秒过截面多少电荷：金属里电子的漂移速率仅毫米每秒量级，但电场建立的信号传递接近光速，按下开关灯亮并不是电子从开关跑到了灯泡。电表改装的两个思路都由它来：串大电阻分压做成电压表，并小电阻分流做成电流表，内核都是同一个灵敏电流计。式中 I 为电流，Q 为电荷量，t 为时间，R 为电阻，U 为电压，ρ 为电阻率，L 为长度，S 为横截面积。",
            en: "Separate the two resistance formulas first: R = U/I is the definition (it works for any conductor, even a nonlinear one), while R = ρL/S is the construction law bringing in material, length and section. Ohm's law itself has a domain: metals and electrolytes obey it, gas discharge and diodes do not, and those must be read off their current-voltage curve instead. Resistance moves with temperature. In metals it rises - a tungsten filament goes up more than tenfold from cold to working heat, which is why most incandescent bulbs die at the instant of switching, when the cold surge is largest; carbon and semiconductors go the other way; some alloys barely move and are used for standard resistors and heating wire. Superconductivity is a different story: below a critical temperature resistance collapses to zero, but exceed the critical current or field and it returns, and not every material has this branch at all. The second trap is electromotive force against terminal voltage: ε describes the source's ability to turn other energy into electrical energy and is set by the source, while U = ε − Ir falls as current grows, which is why lamps dim slightly at the evening peak. A 12 V cell with 0.5 Ω internal resistance shows 11.5 V while delivering 1 A, and on short circuit the current reaches 24 A with zero volts at the terminals - hence the damage and the fire risk. I = Q/t only asks how much charge crosses a section per second; in a metal electrons drift at millimetres per second, yet the signal that turns a lamp on travels near light speed, so switching on is not electrons arriving from the switch. Two instrument conversions follow: add a large series resistor to divide voltage and you get a voltmeter, add a small shunt to divide current and you get an ammeter, both built around the same sensitive galvanometer. Symbols: I current, Q charge, t time, R resistance, U voltage, ρ resistivity, L length, S cross-section.",
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
            zh: "串联只有一条通路：各处电流相等 I₁=I₂，总电压等于各段之和 U=U₁+U₂，总电阻相加 R=R₁+R₂——n 个相同电阻串起来总阻变 nR，相当于把导体拉长，道理在 R=ρL/S 里。并联两端电压相等，总电流为各支路之和，电阻的倒数相加：两个相同电阻并联得 R/2（相当于截面积翻倍），一般两个电阻用更顺手的 R₁R₂/(R₁+R₂)；分流与阻值成反比，阻大的支路反而流得少。判串并的笨办法最可靠：从电源正极走一遍，只有一条路不回头就是串联，出现分支就是并联；短路则是给电流架了一座几乎零阻的「桥」，几乎全部电荷从桥上走、被短路的用电器就停了。生活用电一律并联，理由就是那两条：每个用电器都要拿到额定的 220 V，且关掉一盏不能带着别的一起灭；串联看着省线，其实一个断开全断、电压还要按阻值分摊。滑动变阻器的两种接法分工写得很清楚：限流接法（串在回路里）简单、本身耗电少，但负载电压调不到零；分压接法（三个接线柱全用上）能从零连续调到接近满值，代价是接线复杂、要多耗一些电，所以下限必须到零、或待测电阻远大于变阻器总阻时就得用分压。等效思路在此最管用：把外部网络逐步化成「一个电阻」，而电源的电动势与内阻始终不变。另外记住电表不是理想器件——电压表内阻极大但并非无穷，电流表内阻极小但并非为零，把表接进电路就已改变了电路，这是读数与误差题的总根源。式中 R 为电阻，U 为电压，I 为电流，下标 1、2 指两段（或两条支路）。",
            en: "Series has one path only: current is the same everywhere, I₁ = I₂, the voltages add, U = U₁ + U₂, and resistances add, R = R₁ + R₂ - putting n equal resistors in series gives nR, which is simply lengthening the conductor, and the reason lives in R = ρL/S. Parallel shares one voltage, the currents add, and reciprocals add: two equal resistors in parallel give R/2 (that is doubling the cross-section), and for the general pair R₁R₂/(R₁ + R₂) is handier; current divides in inverse proportion to resistance, so the larger branch carries less. The plainest reliable test is to walk from the positive terminal: one path with no branching is series, any fork is parallel; a short circuit is a near-zero-resistance bridge thrown across the current, which almost all of it takes, and the bypassed device simply stops. Household wiring is parallel for exactly those two reasons: every appliance must see its rated 220 V, and switching one lamp off must not take the others with it. Series looks economical until one break stops everything and the voltage has to be shared out by resistance. A rheostat has two hookups with clear division of labour: limiting (in series with the load) is simple and wasteful of nothing but cannot bring the load voltage to zero; dividing (all three terminals used) runs continuously from zero to nearly full, at the cost of a messier wiring and extra dissipation - so whenever the lower bound must be zero, or the device under test far exceeds the rheostat's total resistance, use the dividing hook. The equivalent-circuit habit is what pays here: collapse the external network step by step into one resistor, while the emf and internal resistance of the source never change. And remember meters are not ideal - a voltmeter's resistance is huge but not infinite, an ammeter's tiny but not zero - so plugging a meter in has already altered the circuit, which is the root of all instrument-error questions. Symbols: R resistance, U voltage, I current, subscripts 1 and 2 marking the two elements.",
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
            zh: "三条公式的身份必须先分开：电功 W = UIt、电功率 P = UI 是普遍式，任何电路都算的是「输入了多少电能」；只有纯电阻电路里才能改写为 P = I²R = U²/R。非纯电阻（电动机、充电中的电池）必须分开算：P_输入 = UI、P_热 = I²R、P_机械 = UI − I²R。举一笔账：额定电压 220 V、线圈电阻 10 Ω 的电动机正常工作时输入 500 W，若误用 P = U²/R 会得到 4840 W——它不是电阻，电能大部分变成了机械能而不是热，这是本条最大的易错点。生活里电功的单位不是焦耳而是千瓦时（kW·h，俗称一度电），1 kW·h = 3.6×10⁶ J，1000 W 的电器开一小时就是一度，电费单读的是这个数而不是 J。额定值与实际值是另一对概念：铭牌上写的是额定电压、额定功率，实际功率由外加电压决定，灯泡上「220 V 25 W」与「220 V 100 W」串联时反而 25 W 的更亮，因为电阻 R = U²/P_额 更大、而串联时实际功率 P_实 = I²R 只看电流与电阻——这句与力学功率条的「额定功率是长时间输出的上限」同口径。保险丝与空气开关都是保护：前者用电阻率较大、熔点较低的合金，电流超额定值就因 I²R 发热自动熔断切断电路，因此额定电流要选得稍大于正常工作电流，且绝对不能用铜丝铁丝替代（铜丝电阻小、熔点高，电流再大也不断，反而失去保护）。用电安全另有两条：金属外壳必须接地，一旦内部绝缘破损外壳带电，短路电流会被空气开关跳断而不经过人体；插座回路上另装漏电保护器，它比较火线与零线的电流，不平衡超过约 30 mA 就在几十毫秒内断开；大功率与金属外壳电器（空调、电热水器）最忌与人体同时接触。式中 W 为电功，P 为电功率，U 为电压，I 为电流，t 为时间，R 为电阻。",
            en: "Separate the three formulas by identity first: W = UIt and P = UI are universal and count energy delivered to any circuit; only inside a pure resistance may they be rewritten as P = I²R = U²/R. For anything else - a motor, a charging cell - keep the books apart: P_in = UI, P_heat = I²R, P_mechanical = UI − I²R. One tally makes the point: a motor rated 220 V with 10 Ω of winding resistance drawing 500 W in normal work would give 4840 W if you misapplied U²/R, because it is not a resistor and most of the energy leaves as shaft work, not heat. That is the biggest trap in this entry. At home the unit of electrical work is not the joule but the kilowatt-hour (kW·h, one 'unit' on the meter), with 1 kW·h = 3.6 × 10⁶ J: a 1000 W appliance for one hour is one unit, and that is what the bill reads. Rated and actual are another pair: the plate gives rated voltage and rated power, while actual power follows the applied voltage - so a '220 V 25 W' and a '220 V 100 W' lamp wired in series burn the other way round, since R = U²/P_rated is larger for the 25 W one and in series the actual P = I²R cares only about current and resistance (same reading as the mechanics entry's 'rated power is the ceiling it may sustain for hours'). Fuses and breakers are both protection: a fuse is an alloy of high resistivity and low melting point that melts by its own I²R heating above the rated current, so its rating is chosen somewhat above the working current, and substituting copper or iron wire destroys the protection entirely, since those carry huge currents without melting. Two safety rules follow from the same arithmetic: metal cases must be earthed, so that a failed insulation shorts to ground and trips the breaker instead of going through a person; and it is worst to touch a large metal-cased appliance (air conditioner, storage heater) while also touching ground; socket circuits carry a further device, the residual-current breaker, which compares the current going out and coming back and cuts off within tens of milliseconds once the imbalance exceeds some 30 mA. Symbols: W electrical work, P power, U voltage, I current, t time, R resistance.",
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
            zh: "Q = I²Rt 是电热（焦耳热）的量热公式，由实验定出。两条用法界线要先划清：纯电阻电路里电能全部变热，W = UIt 与 Q = I²Rt 相等；电动机、充电中的电池这类电能主要变成其他形式的能，则 W > Q，此时用 Q = I²Rt 只算发热那一部分，而 U²t/R 不适用。散热也是账的一部分：电热器（电饭锅、电烙铁、电暖器）要把热量尽量留下，故用绝热与减小散热面积；电动机与变压器反而要压住热，靠风扇、散热片与油浸，因为发热就是绝缘老化与效率损失。远距离输电最能体现这条公式的分量：线损 P_损 = I²R_线，减小损耗有两条路——换粗导线与降电流；把输电线的电阻降到零不现实，所以工程上靠升压来降电流：输送功率 P 一定时 I = P/U，电压升到 10 倍电流即降到十分之一，线损按平方降到百分之一。我国电网发电站先升到 110〜500 kV 的高压交流、部分线路用到 1000 kV 特高压交流，直流输电则常取 ±800〜±1100 kV（直流无感抗且适合远距离与跨海）。热功当量由焦耳本人 1840 年代用砝码带动桨叶搅拌水的实验确定，1 cal = 4.184 J，电热与机械能在能量守恒上等价。两处易错：一、「热量」是过程量，符号用 Q 不能用 q，也不能说物体「含有多少热量」；二、算出的温度上升是理想上限，实际散热快、水吸热不完全，计算值总比真实偏高。式中 Q 为电热，I 为电流，R 为电阻，t 为通电时间。",
            en: "Q = I²Rt is the heating law, fixed by experiment. Draw the two boundaries first: in a pure resistance all delivered energy becomes heat, so W = UIt and Q = I²Rt coincide; in a motor or a charging cell most of it becomes something else, so W > Q, and Q = I²Rt then counts only the heat while U²t/R does not apply. Losing heat is part of the book too: heaters (rice cookers, soldering irons, panel heaters) try to keep their heat with insulation and small radiating area, while motors and transformers try to dump it, with fans, fins and oil, because heat is ageing insulation and lost efficiency. Long-distance transmission shows the formula's weight best: the loss is I²R_line, and there are two ways down - thicker wire, or less current. Making the line resistance vanish is not on the table, so the trade is to raise the voltage: with P fixed, I = P/U, and ten times the voltage is a tenth of the current, hence one hundredth of the loss by the square. Grids step generation up to 110-500 kV alternating current, some lines reaching 1000 kV ultra-high, while direct-current links run at ±800 to ±1100 kV (no reactance, and best over long distances and under sea). The mechanical equivalent of heat was measured by Joule himself in the 1840s by falling weights turning paddles in water, giving 1 cal = 4.184 J, and putting electrical and mechanical energy on one conservation account. Two traps: heat is a process quantity, written Q and never spoken of as something a body 'contains'; and any computed temperature rise is an ideal ceiling, since real setups lose heat and absorb imperfectly, so the calculation overshoots. Symbols: Q the heat generated, I current, R resistance, t the time of flow.",
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
            zh: "磁场与电场同为客观存在的物质，但两者的场线形态根本不同：磁感线是闭合曲线，外部由 N 极到 S 极、内部由 S 回到 N，因此没有磁单极——把一条形磁铁掰断，得到的是两块新的完整磁铁而不是两个磁极（这一点与力学里「正负电荷可分开」形成对照）。方向判定统一交给安培定则（右手螺旋）：直导线用拇指指电流、四指卷向即磁感线环绕方向；环形与螺线管则四指顺电流、拇指指轴线上的 N 极，这一步也是判断电磁铁磁极与继电器动作方向的第一步。历史脉络很紧凑：1820 年奥斯特发现通电导线能让小磁针偏转，是人类第一次看到电与磁有联系；紧接着安培把问题换成「电流与电流也相互作用」（同向相吸、反向相斥，见安培力条），并主张磁就是物质内部的分子环流，从此不必假想两种磁荷。地磁是最有用的一个实例：地球相当于一个大磁体，而地理北极附近其实是地磁场的 S 极（正因如此磁针的 N 端才被吸向北，口径与「异名磁极相吸」一致）；磁偏角（磁北与真北之差）在我国宋代沈括《梦溪笔谈》（1088 年前后）已有明确记载，同书还记下了指南针的水浮、缕悬、碗唇、指甲四种装置法；哥伦布 1492 年横渡大西洋时也在海上实测到了它；地磁两极与地理两极不重合、且长期在漂移。强度上地磁场约 5×10⁻⁵ T（即 0.5 高斯），而实验室电磁铁可达 1 T 以上、医用磁共振设备常见 1.5〜3 T，相差四个数量级以上。两个常考对照：两条通同向电流的导线在中点的合磁场为零（而中垂线上其他地方不为零）；小磁针静止时 N 极指的方向即该点磁场方向，与它「S 极指的方向」相对。式中 B 为磁感应强度（T），方向定义为小磁针 N 极受力方向。",
            en: "A magnetic field is as objective as an electric one, but its line pattern differs fundamentally: magnetic lines are closed curves, running N to S outside a magnet and S back to N inside, so there is no magnetic monopole - snap a bar magnet and you get two new complete magnets, not two separated poles (contrast this with plus and minus charge, which can be pulled apart). Direction is settled by one rule, Ampère's right-hand grip: for a straight wire point the thumb along the current and the curled fingers give the sense of the lines; for a loop or solenoid curl the fingers with the current and the thumb points to the N pole along the axis - the first move for any electromagnet or relay question. The history is tight: in 1820 Oersted showed a current-carrying wire swings a compass needle, the first human witness of a link between electricity and magnetism, and within days Ampère had changed the question to currents acting on currents (like directions attract, opposite repel - see the ampere-force entry), arguing that magnetism simply is molecular circulation inside matter, so no two kinds of magnetic fluid need be assumed. Geomagnetism is the most useful example: the Earth behaves like a big magnet, and near the geographic north sits the south pole of that field - which is exactly why a needle's north end is pulled northway, consistent with 'unlike poles attract'. Magnetic declination, the angle between magnetic and true north, was recorded clearly in China by Shen Kuo in the Dream Pool Essays around 1088, where he also lists four ways of mounting a compass needle (floating on water, hanging by a silk thread, on a bowl rim, on a fingernail), and Columbus measured it at sea in 1492; the geomagnetic poles do not coincide with the rotation poles and drift steadily. For scale the field here is about 5 × 10⁻⁵ T (0.5 gauss) while a laboratory electromagnet tops 1 T and medical MRI runs 1.5-3 T, four or more orders apart. Two standard comparisons: two parallel wires carrying the same current give zero net field at their midpoint (but not elsewhere on the bisector), and a needle at rest points its N end along the field, its S end against it. Symbols: B magnetic flux density in tesla, defined as the direction of the force on a north pole.",
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
            zh: "F = BIL 只适用于匀强磁场中且直导线与磁场垂直，不垂直时取分量 F = BIL·sinθ；θ = 0（导线与磁场平行）则受力为零，这一点常被忽略。方向用左手定则：磁感线穿入手心、四指指电流方向、拇指即受力方向。本条要与磁场条的右手螺旋分工清楚——右手判「电流造出的磁场」，左手判「磁场给电流的力」。安培力其实是洛伦兹力的宏观表现：F = BIL 与导体内每个载流子受的 f = qvB 数量上能对上（以 n 为单位体积载流子数、S 为截面、L 为长度，则总载流子数 N = nSL，合力为 N·qvB 形式而 v 的漂移量级刚好使结果归回 BIL），这也是下面霍尔效应的入口。电动机是本公式最要紧的应用：线圈在磁场中受安培力而转动，靠换向器与电刷在每个半周把电流反向以保证转矩不反向；而一旦转起来，线圈又在磁场中切割磁感线、产生一个与外加电压反向的电动势（反电动势），它就是电动机不能用欧姆定律简单取 I = U/R 的原因（起动瞬间没有反电动势，所以起动电流最大，与照明灯开灯即烧是同一类事）。两条通流导线之间的安培力（同向相吸、反向相斥）是安培单位的历史定义：1948 年国际计量大会把安培写作相距 1 m 的无限长平行导线间每米 2×10⁻⁷ N 的力，2019 年改由基本电荷的固定数值给出（与安培人物条同口径）。工程上另两处用到它：扬声器靠音圈受力带动纸盆，磁电式电表靠安培力力矩平衡游丝力矩。易错点是受力方向、电流方向、磁场方向三者两两垂直，已知两个求第三个才能直接用左手定则。式中 F 为安培力，B 为磁感应强度，I 为电流，L 为导线长度，θ 为电流与磁场方向夹角。",
            en: "F = BIL holds only for a straight wire in a uniform field at right angles to it; otherwise take the component, F = BIL sinθ, and note that the force vanishes when the wire runs parallel to the field - the case most often forgotten. The direction comes from the left-hand rule: let the lines pierce the palm, point the four fingers with the current, and the thumb is the force. Divide the labour with the magnetic-field entry: the right hand judges the field a current makes, the left hand judges the force a field gives a current. Ampère force is in fact the macroscopic face of the Lorentz force, and the two do match numerically through the carriers inside the wire, which is also the doorway to the Hall effect below. The motor is the weightiest application: the coil is pushed by Ampère forces and the commutator with its brushes reverses the current every half turn so that the torque never flips; but once it spins, the coil is cutting lines and raises an emf opposing the supply - the back emf - and this is precisely why a running motor cannot be treated with I = U/R (at standstill there is no back emf, so starting current is largest, the same family of fact as a lamp dying at switch-on). The force between two current-carrying wires, attracting when parallel, was also the historical definition of the unit: in 1948 the metre-kilogram-second community wrote the ampere as the current giving 2 × 10⁻⁷ N per metre between one metre apart infinite parallel wires, and since 2019 it follows from a fixed elementary charge instead (as the Ampère biography entry states). Two further uses: a loudspeaker's voice coil drives a cone by this force, and a moving-coil meter balances it against a hairspring. The trap is geometry: force, current and field are mutually perpendicular, so the left hand works only when two of the three are known. Symbols: F Ampère force, B flux density, I current, L wire length, θ the angle between current and field.",
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
            zh: "洛伦兹力永远与速度垂直，因此只改方向不改速率、对粒子不做功，动能不变——这是本条第一句要立的口径。v 与 B 垂直时粒子做匀速圆周，r = mv/(qB)、T = 2πm/(qB)，而周期与速率无关：快粒子半径大、走得远，但一圈用的时间相同。回旋加速器就靠这一点工作——磁场只负责把粒子带回缝隙，加速全部由缝隙里的交变电场完成，每过缝一次加一笔能；但粒子快到相对论效应显著时，质量上升使周期变长、与固定频率失步，因此能量上限受限，得改用同步加速器或同步调整频率。由半径公式反解就得到质谱的原理：同速的离子按 m/q 分半径，氘核半径是质子的两倍，分离同位素靠的就是这一笔（v = 1×10⁶ m/s、B = 0.5 T 时质子的圆半径约 21 cm）。速度选择器让电场力与磁场力相抵，qE = qvB 即 v = E/B，与电量、质量、速率都无关，只选速度；反过来看，带电粒子进入匀强磁场后若能回到原高度，中间一定发生过与壁的弹性碰撞，这是题型而非现实。把 v 分解成垂直与平行于 B 的两个分量，就得到螺旋轨道；沿磁力线方向的分量不变、垂直分量绕圈，因此磁场能把发散的粒子束「箍」回轴向，称磁聚焦（托卡马克的磁面约束与此同理）。霍尔效应则是本公式在固体里的直接后果：电流与磁场垂直时载流子被侧向挤到一侧，在两侧建立起电压 U_H = IB/(nqd)（d 为沿磁场方向的厚度），由此可判载流子种类（电压反向即说明是空穴）、测浓度（金属 n 约 10²⁹ 每立方米、霍尔电压极小，半导体 n 约 10²³ 反而明显，故霍尔探头都用半导体）。易错点在方向：负电荷受力与左手定则所指四向相反，要取反向。式中 f 为洛伦兹力，q 为电荷量，v 为速度，B 为磁感应强度，θ 为速度与磁场方向夹角。",
            en: "The Lorentz force is always perpendicular to the velocity, so it turns speed aside without changing it and does no work - kinetic energy is untouched, and that is the first thing to settle. With v at right angles to B the path is a circle of radius r = mv/(qB) and period T = 2πm/(qB), and the period does not depend on speed: a faster particle rides a wider circle yet takes the same time per turn. The cyclotron lives on that fact - the magnet only brings the particle back to the gap, and all acceleration is done by an alternating electric field across the gap, one top-up per crossing; but once relativistic mass gain stretches the period the fixed frequency falls out of step, which caps the energy and forces the synchrotron or a swept frequency instead. Solving the radius formula backwards gives the mass spectrometer: ions of equal speed separate by m/q, a deuteron turning out at twice the proton's radius, which is how isotopes are parted (about 21 cm for a proton at v = 1 × 10⁶ m/s in 0.5 T). A velocity selector cancels electric against magnetic force, qE = qvB, i.e. v = E/B, independent of charge, mass and everything else but speed. Split v into parts perpendicular and parallel to B and the path becomes a helix: the parallel part is untouched while the perpendicular part circles, so a magnetic field gathers a spreading beam back onto the axis - magnetic focusing, the same idea behind magnetic confinement in a tokamak. The Hall effect is the formula's consequence inside solids: with current and field perpendicular, carriers are shoved to one face until a transverse voltage U_H = IB/(nqd) balances it (d being the thickness along the field), which identifies carrier sign (a reversed voltage means holes) and measures their density - about 10²⁹ per cubic metre in metals, where the voltage is minute, and around 10²³ in semiconductors, where it is obvious, which is why every Hall probe is a semiconductor. The trap is direction: for a negative charge the force is opposite to what the left hand indicates. Symbols: f Lorentz force, q charge, v speed, B flux density, θ the angle between v and B.",
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
            zh: "先定研究对象：磁通量 Φ = BS 是穿过回路的磁感线条数（B 与面垂直时；不垂直取投影 Φ = BS·cosα），它是标量但有正负（穿入穿出）。产生感应电动势的唯一条件是回路磁通量发生变化，与磁通量本身多大无关—— Φ 很大而不变时反而没有感应，这是第一处易错。大小由法拉第定律给：ε = n·ΔΦ/Δt（n 为匝数），导体棒切割磁感线则是它的特例 ε = BLv（要求 B、L、v 三者两两垂直，不垂直时取分量）。算一笔账：100 匝线圈在 0.1 s 内把磁通从 0.02 Wb 变到 0.08 Wb，得 ε = 60 V。方向由楞次定律定，而它的实质是能量守恒——感应电流的效果总是反抗引起它的那个原因：靠近则拒、远离则留（「来拒去留」），磁铁穿过竖直铜管会明显缓慢下落就是这个道理（涡流阻尼），也是磁悬浮刹车与电磁阻尼式电表指针迅速停摆的原因。判方向的完整口径是五步：定原磁场方向 → 判磁通增还是减 → 用楞次定律定感应磁场（增反减同）→ 再用安培定则找感应电流。这里的安培定则（右手螺旋）用于线圈回路，而导体棒切割时另有一条「右手定则」：掌心迎磁感线、拇指指导体运动方向、四指即感应电流方向；两者分工不同，此前缺字的这两个术语在此一并补上。应用分三支：发电机与动圈话筒是「动生」，变压器与无线充电是「感生」；涡流的另一面就是感应炉与电磁炉——高频交变磁场在锅底同时产生涡流与磁滞损耗而发热，所以铁质导磁锅效果好、铝锅与玻璃陶瓷基本不行。式中 ε 为感应电动势，n 为线圈匝数，Φ 为磁通量（Wb），t 为时间。",
            en: "Fix the object first: flux Φ = BS counts the lines crossing a loop (for B perpendicular to the face; otherwise project, Φ = BS cosα). It is a scalar with a sign, in against out. The one condition for an induced emf is that the flux changes, no matter how large it is - a big but steady flux induces nothing, which is trap one. The size comes from Faraday, ε = n·ΔΦ/Δt, and the moving rod's ε = BLv is its special case (requiring B, L and v mutually perpendicular, else take components). A tally: 100 turns whose flux runs from 0.02 Wb to 0.08 Wb in 0.1 s give 60 V. The direction comes from Lenz, whose substance is energy conservation - the induced current always fights the cause that made it, refusing an approach and clinging to a departure ('oppose the coming, oppose the going'), which is why a magnet falls visibly slowly through a vertical copper tube (eddy-current damping), and why magnetic brakes and dead-beat galvanometer needles settle so fast. The full five-step recipe: name the original field, judge whether flux grows or shrinks, use Lenz for the induced field (opposite if growing, same if shrinking), then use Ampère's right-hand grip for the current. That grip is a different tool from the 'right-hand rule' commonly used for a cutting rod (thumb along motion, fingers along induced current, palm facing the lines): one judges coils, the other judges rods - a terminology gap this entry now closes. Applications split three ways: generators and moving-coil microphones are motion-made, transformers and wireless charging are field-made; and the other face of eddy currents is the induction furnace and the induction hob, where a high-frequency alternating field heats the pan through both eddy current and magnetic hysteresis, which is why a magnetic steel pan works while aluminium, glass and ceramic barely do. Symbols: ε induced emf, n number of turns, Φ flux in weber, t time.",
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
            zh: "关键的一步是位移电流：麦克斯韦 1861 年提出「变化的电场也等效为电流」，于是磁场的产生不再只靠传导电流，电磁场才能自洽地向前推进。他从方程组算出电磁波速度 v = 1/√(μ₀ε₀)，代入实验测得的磁常数与电常数后得数恰等于光速，因而得出一个伟大推论：光就是电磁波（与麦克斯韦人物条同口径）。赫兹 1887 年才用感应线圈与开环偶极子把这种波打出来、测到反射折射与驻波，证实了这一点，而他本人只当这是「证明麦克斯韦是对的」，看不出实用价值。电磁波是横波：E 与 B 相互垂直且都垂直于传播方向，E、B 同相振荡；真空中所有频率的电磁波都取同一个速度 c = 3×10⁸ m/s，而波长与频率满足 c = λf，频率越高波长越短。按波长从长到短排序为：无线电波、微波、红外、可见光、紫外、X 射线、γ 射线。几个必须记住的性质：微波波长以厘米计、绕射能力差因而需要视距传播（5G 尤其明显），但它能穿透云雾且使锅底水分子随交变电场反复转向、摩擦生热（教材常简称为共振吸收，微波炉取 2.45 GHz，炉门玻璃下那张金属网就是电磁屏蔽：网孔远小于波长，波过不去而眼睛看得见）；红外线主要就是热效应，容易被水汽与尘埃吸收，因此遥控与夜视都用近红外；可见光只占约 400〜700 nm 很窄一段；紫外线适量能促成维生素 D、过量则伤皮肤与眼，大部分被臭氧层吸收；X 射线由高速电子轰击金属靶产生、穿透力强而电离会致癌，故医学上既要照得透又要挡得住（铅衣）；γ 射线波长最短、来自原子核内部，穿透最强。发射必须满足两个条件：频率足够高且电路开放（见 LC 振荡条），所以低频信号得先「调制」到高频载波上——调幅改振幅、调频改频率；传播中遇到障碍物尺寸与其波长相当时衍射明显，波长越长绕射越强，因此长波能绕山沿海传播、微波只能直线接力。光也是电磁波，所以本条与光学各条其实是同一个谱的不同区段。式中 c 为电磁波速度，λ 为波长，f 为频率。",
            en: "The decisive move was displacement current: in 1861 Maxwell proposed that a changing electric field acts like a current, so making a magnetic field no longer required a conducted current, and the electromagnetic field could push itself forward. From his equations he got v = 1/√(μ₀ε₀); inserting the measured magnetic and electrical constants returned exactly the speed of light, whence the great inference that light is an electromagnetic wave (the same reading as the Maxwell biography entry). Hertz only produced such waves in 1887 with an induction coil, a split copper bar and an open ring, measuring their reflection, refraction and standing waves, and he saw this merely as 'proving Maxwell right' - the famous misjudgement that left radio to others. These waves are transverse: E and B are perpendicular to each other and both perpendicular to the direction of travel, oscillating in step. In vacuum every frequency travels at the same c = 3 × 10⁸ m/s, with c = λf, so higher frequency means shorter wavelength. Ordered by decreasing wavelength: radio, microwave, infrared, visible, ultraviolet, X-ray, gamma. The properties worth memorising: microwaves are centimetre-scale, diffract poorly and so need line of sight (very noticeable at 5G), yet pass through cloud and fog and heat food by driving polar water molecules to flip with the alternating field, rubbing them into heat (the textbook shorthand is resonant absorption; a kitchen oven uses 2.45 GHz, and the metal mesh under its door window is electromagnetic shielding - holes far smaller than the wavelength, so the wave cannot pass but the eye can); infrared is mostly heat, readily absorbed by vapour, hence remotes and night vision use the near band; visible light spans only some 400-700 nm; ultraviolet makes vitamin D but damages skin and eyes and is largely absorbed by the ozone layer; X-rays come from fast electrons striking a metal target, penetrate well and ionise cells, so medicine must both see through and shield (lead aprons); gamma rays are shortest of all, born inside the nucleus, and penetrate most. Efficient emission needs high frequency and an open circuit (see the LC entry), so a slow signal must first be modulated onto a carrier - amplitude modulation varies the height, frequency modulation the rate. Diffraction is strong when an obstacle matches the wavelength, so long waves bend round hills and hug the sea while microwaves must be relayed in straight lines. Since light is one of them, this entry and the optics entries describe different stretches of a single spectrum. Symbols: c wave speed, λ wavelength, f frequency.",
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
            zh: "描述交变电流用峰值、有效值、周期与频率四件：正弦式交流电的有效值 I = I_m/√2、U = U_m/√2，我国市电 220 V、50 Hz，即周期 0.02 s、线圈每转一周方向改变两次、每秒方向改变 100 次，而峰值 220×1.41 ≈ 311 V。有效值的定义口径是热效应等效：与它同时间在同电阻上产生相同热量的直流数值，因此电表读数、保险丝额定值与铭牌上写的都是有效值而不是峰值（本条第一易错：误把 220 V 当恒定电压，它的瞬时值在 ±311 V 之间连续变化）。相位与频率是另一组易错点：电容「通交流、隔直流」并不是电荷穿过了介质，而是极板上电荷来回移动的等效电流，其容抗 X_C = 1/(2πfC)，频率越高越容易通过；电感的感抗 X_L = 2πfL，频率越高越阻，因此电感常作阻流与滤波，两者组合就能选频。特别注意：感抗与容抗都不是电阻，不消耗能量，只使电流与电压相位错开（电感上电压超前电流、电容上电压落后电流），所以不能直接拿 I = U/R 去算交流电路的电流，要看阻抗。为什么非要用交流输电：因为交流能变压，而升压可大幅降低线损（见焦耳定律条），所以发电机用交流。与之对照，直流输电因无感抗与容抗损失、且不需同步运行，反而适合超远距离与跨海联网。安全上另要记一句：触电危不危险并不只看有效值，220 V 峰值 311 V 已足以击穿皮肤电阻，而干燥环境下人体电阻可达几千欧、潮湿时降至一千欧以下。式中 I 为有效值，I_m 为峰值。",
            en: "Describe alternating current with peak, rms, period and frequency. For a sine wave the rms values are I = I_m/√2 and U = U_m/√2; the Chinese mains is 220 V at 50 Hz, so the period is 0.02 s, an alternating coil reverses twice per turn and the current flips direction 100 times a second, with a peak of 220 × 1.41 ≈ 311 V. The rms value is defined thermally: the steady current that, in the same resistance and time, gives the same heat - which is why meter readings, fuse ratings and nameplate figures are all rms, not peak (trap one: treating 220 V as a constant, when the instantaneous value swings through ±311 V continuously). Phase and frequency bring the next traps. A capacitor 'passes AC and blocks DC' not because charge crosses the dielectric but because charge shuffles on its plates, an equivalent current; its reactance X_C = 1/(2πfC) shrinks as frequency rises, while an inductor's X_L = 2πfL grows, so inductors choke and filter and the pair together selects frequency. Note well that neither reactance is a resistance: neither spends energy, each only shifts phase - voltage leads current on an inductor, lags it on a capacitor - so I = U/R cannot be used on an AC circuit without going through impedance. Why alternating current for the grid at all: because it can be transformed, and stepping up slashes the line loss (see Joule's law); generators are therefore built as AC machines. By contrast direct-current links, free of reactance losses and of the need to run in step, suit very long distances and undersea interconnection. One safety sentence too: danger does not follow the rms figure alone - the 311 V peak of a 220 V supply is easily enough to break down skin, and a human body measures thousands of ohms when dry but under a thousand when wet. Symbols: I the rms current, I_m the peak.",
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
            zh: "变压器靠互感工作：原线圈中变化的电流在铁芯里产生变化的磁通，副线圈因这一变化而感应出电动势，因此它只能改变交流电压而不能改变直流（与自感条里法拉第铁环实验「只在通电与断电瞬间有感应」同一道理）。理想变压器的两条关系：电压比等于匝数比 U₁/U₂ = n₁/n₂，而电流比与之相反 I₁/I₂ = n₂/n₁——第二条只能从功率相等得出，漏掉这一步而只算电压比是本条第一大易错。铁芯用硅钢叠片而非整块，是为了压住涡流发热（涡流在整块铁芯里会白白耗能并升温），叠片方向与磁通垂直、电阻大得多；实际变压器总有铜损（线圈电阻发热）与铁损（涡流加磁滞），效率常见 90% 以上，大型电力变压器可达 98% 以上。匝数少的一边电流大，因此用粗导线（高压侧匝数多、线细）。与焦耳定律条联起来就是电网的全部理由：输送功率一定时 I = P/U，电压升十倍则电流降十分之一、线损降百分之一，所以发电站先升到 110〜500 kV，部分线路用 1000 kV 特高压，到用电区再分级降到 10 kV、最后到户用 220 V。升压与降压是同一台机器两个方向的使用，变电站里两种并用；而变压器不能变频率，输出频率与输入相同。另外提醒：自耦变压器（只一个线圈、抽头取压）体积小成本低，但高低压侧直接导电相连、失去绝缘隔离，因而不能用作安全电源。式中 U₁、U₂ 为原副线圈电压，n₁、n₂ 为匝数，I₁、I₂ 为电流。",
            en: "A transformer runs on mutual induction: the changing current in the primary makes a changing flux in the core, and the secondary responds to that change, so it can alter an alternating voltage and nothing at all on a steady direct one (the same lesson as Faraday's iron-ring experiment, where the effect showed only at make and break). The ideal machine gives two relations: voltage follows turns, U₁/U₂ = n₁/n₂, while current runs the other way, I₁/I₂ = n₂/n₁ - and the second is available only from equal power, so forgetting it and stopping at the turns ratio is this entry's first trap. The core is stacked from silicon-steel laminations rather than one solid block in order to choke eddy-current heating; the sheets run across the flux and present a far larger resistance. Real transformers always carry copper loss from the windings and iron loss from eddy current plus hysteresis, with efficiencies above 90 per cent normally and above 98 per cent for large power units. The few-turn side carries the bigger current and is therefore wound with thick wire (the high-voltage side has many turns of thin wire). Read together with Joule's law this is the whole reason grids exist: with power fixed, I = P/U, so ten times the voltage is a tenth of the current and a hundredth of the loss - hence generation stepped up to 110-500 kV, some lines at 1000 kV ultra-high, then stepped down in stages to 10 kV and finally to the 220 V at the socket. Stepping up and stepping down are one machine used in two directions and substations run both; a transformer cannot change frequency, which stays as delivered. One warning: an autotransformer, a single winding with a tap, is small and cheap, but its high and low sides are electrically joined and lose galvanic isolation, so it must not be used as a safe supply. Symbols: U₁, U₂ primary and secondary voltage, n₁, n₂ turns, I₁, I₂ currents.",
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
            zh: "自感是线圈对自己电流变化的反抗：电流一变，自身磁通跟着变，就在同一线圈里激起感应电动势，方向总阻碍原电流的变化（楞次定律是本条一切方向的总口径）。由此两条现象：通电时电流只能逐渐建立、并联的灯泡渐亮；断电时原本稳恒的电流失去通路，却因自感电动势维持而继以短暂电流，故与线圈并联的灯泡会「先闪一下再灭」而不是立即熄灭。电动势大小 ε = L·ΔI/Δt，L 为自感系数、单位亨利：1 H 的线圈若每秒变化 1 A 就激起 1 V；实用线圈常为毫亨量级，日光灯镇流器与电源滤波扼流圈都在此。本条最能伤人的是断电：断开一个大电流电感（汽车点火线圈、大型接触器、变压器带电拔插）时 ΔI/Δt 极大，自感电动势可达数百上千伏，因而拉出火花、击穿开关、电击人手；汽车点火系统正是靠断开点火回路那一瞬间产生的高压去点燃火花塞，而工程上则在线圈两端并接续流二极管给电流一个退路。与之互补的是电感的基本性格「通直流、阻交流，通低频、阻高频」（X_L = 2πfL），因此它在电路里作扼流与滤波，与电容分工相反（电容「通交流、隔直流」）。互感则是把一个线圈的变化交给另一个线圈：变压器与互感拾音头是它的正经应用，无线充电与手机充电板则靠近场互感传递能量，效率高但距离只能到厘米量级，且异物会因涡流发热因而需要检测。另外提醒：自感与互感都不创造能量，磁场能 W = ½LI² 储在线圈里，建立时取、消失时交回。式中 ε 为自感电动势，L 为自感系数（H），ΔI 为电流变化量，Δt 为时间。",
            en: "Self-induction is a coil resisting changes in its own current: change the current, change its flux, and an emf appears in the same coil opposing that change (Lenz's law is the one reading for every direction here). Two everyday consequences follow. On making, the current can only grow gradually and the lamp brightens slowly; on breaking, the steady current loses its path but is held briefly by the self-induced emf, so a lamp wired across the coil flashes out rather than vanishing. The size is ε = L·ΔI/Δt, with L the self-inductance in henries: one henry returns one volt per ampere per second, while practical coils sit in millihenries - a fluorescent-lamp ballast and a supply choke both live there. The breaking case is the dangerous one. Cut a heavy-current inductance (a car ignition coil, a heavy contactor, a transformer under load) and ΔI/Δt is enormous, the emf reaches hundreds or thousands of volts, so it throws a spark, burns the switch and can strike a hand; an ignition system relies on exactly that voltage spike to fire the plug, while engineers clamp a free-wheeling diode across the coil to give the current somewhere to go. The complementary character of an inductor is 'passes DC, blocks AC; passes low frequency, blocks high' (X_L = 2πfL), which is why it serves as choke and filter, the opposite of a capacitor's 'passes AC, blocks DC'. Mutual induction hands one coil's change to another: transformers and pickup coils are its proper work, while wireless and phone charging pads carry energy by near-field mutual coupling - efficient but only over centimetres, and foreign objects heat up by eddy current, which is why they must be detected. Neither kind of induction creates energy: the magnetic store is W = ½LI², taken while building up and handed back on collapse. Symbols: ε self-induced emf, L inductance in henry, ΔI the current change, Δt the time.",
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
            zh: "LC 回路的振荡是能量在电场与磁场之间来回交接：电容放完电后电流不会停，线圈的自感维持它继续流动、反过来给电容充满反向电压，于是这样来回交替。T = 2π√(LC)、f = 1/(2π√(LC))，L 与 C 越小频率越高；振荡过程中电流与电荷相位错开四分之一个周期（电荷最大时电流为零，反之亦反），恰好与力学里弹簧振子的位移与速度同构。理想回路无阻尼会一直振荡，实际线圈有电阻，能量以 I²R 热损失而振荡衰减（阻尼），要维持等幅必须靠晶体管不断补能——这就是电子振荡器的本质。要有效辐射需两个条件：频率足够高与电路足够开放，把极板张开、让电场散到空间中去，因此低频信号不能直接发射，得先「驮」到高频载波上——这就是调制：调幅改振幅、调频改频率，调谐与选台其实是同一件事：改变回路里的可变电容器，让固有频率与目标电台一致而发生电谐振（与力学受迫振动条同口径，只是能量交换发生在电磁回路里）。天线尺寸与工作波长相关，半波长偶极子最常见：100 MHz 的调频广播波长 3 m，常用天线约 1.5 m（或四分之一波长约 0.75 m）。发射与接收分别在这回路两端：发射要开放电路与高频、接收靠调谐与解调把信号从载波上取下来。式中 f 为振荡频率，L 为电感，C 为电容。",
            en: "Oscillation in an LC circuit is energy handed back and forth between field forms: when the capacitor has discharged the current does not stop, because the coil's self-inductance drives it on and charges the capacitor up in reverse, and the account keeps turning. T = 2π√(LC) and f = 1/(2π√(LC)), so the smaller L and C, the higher the frequency; during the swing charge and current are a quarter period out of step (charge peaks where current vanishes and the other way round), exactly the same structure as displacement against velocity in a spring oscillator. An ideal circuit would oscillate forever, but a real coil has resistance, energy leaves as I²R heat and the swing decays (damping); holding constant amplitude means a transistor topping it up continuously - which is what an electronic oscillator is. Efficient radiation asks two things, high frequency and an open circuit that spreads its field into space, so a slow signal cannot be broadcast directly and must be lifted onto a carrier: modulation, amplitude or frequency. Tuning and station selection are one thing - vary the capacitor until the circuit's natural frequency matches the target station and electrical resonance takes hold (the same reading as forced oscillation in mechanics, only the energy exchange here is electromagnetic). Antenna size follows the wavelength, with the half-wave dipole most common: an FM station at 100 MHz has a 3 m wavelength, so antennas near 1.5 m, or a quarter-wave at 0.75 m, are usual. Emission and reception sit at the two ends of this circuit - the transmitter needs high frequency and openness, the receiver needs tuning plus demodulation to take the message off the carrier. Symbols: f oscillation frequency, L inductance, C capacitance.",
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
            zh: "太阳系以太阳为中心，太阳独占全系统质量的 99.86%，其余都是围绕它转的次要角色。八大行星按离日远近排为水、金、地、火、木、土、天王、海王：前四颗是小而密的类地行星，以岩石与金属为骨架；木星与土星是气态巨行星，主要成分是氢与氦；天王星与海王星更冷、含更多水与氨的冰凉幔层，常被单列为冰巨星。火星与木星之间是小行星带（约 2.2 到 3.3 天文单位），更远的柯伊伯带（约 30 到 50 天文单位）是冰封小天体的仓库，冥王星就住在其中——1930 年被当作第九行星发现，2006 年因新的行星定义（须能清除轨道附近其他天体）被改列为矮行星，它的轨道偏心率大、倾角约 17 度，绕日一圈要 248 年（由开普勒第三定律算得）。比柯伊伯带更远数万倍的地方是奥尔特云，长周期彗星便来自那里。彗星是冰与尘埃的混合体，靠近太阳时受热蒸发，形成背向太阳的彗尾，哈雷彗星约 76 年回归一次，我国宋代以来对它有多次连续记录。流星是流星体进入大气烧蚀发光的现象，出现在约 80 到 120 千米的高空，未烧尽而落到地面的叫陨石，1976 年吉林落下约 1770 千克的一块，是世界最大的石陨石之一。日心说由哥白尼在 1543 年确立，此前托勒密的地心说用一轮套一轮的本轮均轮也能算出行星位置，只是越来越繁琐；第谷做了二十年肉眼观测，把位置精度推到约 1 角分，开普勒用他的火星数据才发现轨道是椭圆；伽利略 1610 年用望远镜看到木星的四颗卫星与金星的盈亏，为日心说提供了直接可见的证据（口径见「天体运动与开普勒定律」条与「伽利略·伽利雷」条）。行星与日月都大致落在黄道——地球轨道面在天球上的投影——附近运行。月相由日、地、月三者位置决定，从朔到望再到朔要 29.53 天，日食是月影扫过地面，月食才是月球进入地球影子里，两者不能混为一谈；日全食的本影带在地面上只有百来千米宽，一次全食最长不过约 7.5 分钟。月球因为潮汐摩擦被锁定成同步自转，自转与公转周期都是 27.32 天，因此永远以同一面朝向地球，而它正以每年约 3.8 厘米的速度远离我们；海水的潮汐主要由月球引起，太阳的贡献约为月球的一半。太阳本身也有活动：太阳黑子比周围光球低约 1500 开尔文因而显暗，其数目有约 11 年的周期；耀斑与日冕物质抛射把带电粒子送入行星际空间，太阳风（速度常达每秒数百千米）与地磁场相互作用，在高纬酿成极光，1859 年的卡林顿事件曾让电报线起火。日冕温度高达上百万开尔文，而光球只有约 5770 开尔文，这个日冕加热问题至今没有定论。这些距离如今也有实物亲身去量：旅行者 1 号 1977 年出发、2012 年越过日球层顶，已在 240 亿千米之外，而它连奥尔特云的边都不曾挨到；新视野号 2015 年才第一次近距离拍下冥王星；我国嫦娥四号 2019 年首次在月球背面软着陆，嫦娥五号 2020 年取回约 1731 克月壤，天问一号 2021 年将祝融号送上火星的乌托邦平原。引力如何决定这些轨道，见「万有引力定律」条，而万有引力常量 G 在地面的测量口径见「卡文迪许扭秤」条。",
            en: "The Solar System is organised around the Sun, which alone holds 99.86 percent of its mass, while everything else is a secondary player turning about it. The eight planets in order of distance are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune: the first four are small, dense terrestrial planets built of rock and metal; Jupiter and Saturn are the gas giants, made mostly of hydrogen and helium; Uranus and Neptune are colder and carry thick icy mantles of water and ammonia, so they are often listed apart as ice giants. Between Mars and Jupiter lies the asteroid belt at some 2.2 to 3.3 astronomical units, and far beyond it the Kuiper belt at 30 to 50 units, a storehouse of icy debris in which Pluto sits - found in 1930 and hailed as a ninth planet, then reclassified as a dwarf planet in 2006 once a definition was adopted that a planet must have cleared its orbital neighbourhood, its path being steeply eccentric, tilted some 17 degrees and taking 248 years to complete, as Kepler's third law gives. Tens of thousands of times farther out still lies the Oort cloud, from which long-period comets come. A comet is a mixture of ice and dust that vaporises as it nears the Sun and raises a tail pointing away from it; Halley's comet returns roughly every 76 years and Chinese records have followed its returns ever since the Song dynasty. A meteor is a meteoroid burning up and glowing between 80 and 120 kilometre altitude, and whatever survives to reach the ground is a meteorite - in 1976 some 1770 kilograms fell at Jilin, among the largest stony falls on record. Copernicus set the heliocentric model in 1543; before that Ptolemy's geocentric system also predicted planetary positions, by stacking circle upon circle, only at ever greater cost in complexity. Tycho observed with the naked eye for twenty years and pushed positional accuracy to about one arcminute, and Kepler used his Mars data to find that orbits are ellipses; Galileo's telescope in 1610 revealed four moons about Jupiter and the full set of phases of Venus, evidence anyone could see for the heliocentric claim, as the entries on Kepler's laws and on Galileo put it. Planets, Sun and Moon all run near the ecliptic, the projection of Earth's orbit onto the sky. The phases of the Moon follow the geometry of Sun, Earth and Moon and take 29.53 days from new to new, whereas a solar eclipse is the Moon's shadow falling on the ground and a lunar eclipse the Moon entering Earth's shadow - the two must not be confused; the Moon's umbral track on the ground is only some hundred kilometres wide and totality lasts at most about 7.5 minutes. Tidal friction has locked the Moon into synchronous rotation, its spin and orbit both 27.32 days, so it always shows us one face, and it recedes by roughly 3.8 centimetre each year; the tides of the sea are raised mainly by the Moon, the Sun contributing about half as much. The Sun is itself active: sunspots look dark because they sit some 1500 kelvin below the surrounding photosphere, and their count runs on a cycle near 11 years; flares and coronal mass ejections inject charged particles into interplanetary space, and the solar wind, commonly several hundred kilometres per second, working with the geomagnetic field, makes aurorae at high latitudes, while the 1859 Carrington event set telegraph lines alight. The corona reaches millions of kelvin although the visible surface is only about 5770, and that heating problem remains open. These distances now have hardware measuring them first-hand: Voyager 1, launched in 1977, crossed the heliopause in 2012 and already lies some 24 billion kilometres out without having touched the edge of the Oort cloud; New Horizons did not photograph Pluto close until 2015; China's Chang'e 4 made the first far-side lunar landing in 2019, Chang'e 5 returned some 1731 grams of soil in 2020, and Tianwen-1 set the Zhurong rover on the Martian plain of Utopia in 2021. How gravity fixes these orbits belongs to the universal gravitation entry, and how G was weighed on the ground to the Cavendish experiment entry.",
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
            zh: "恒星靠核心的核聚变发光，太阳就是一颗普通的 G 型主序星，表面约 5772 开尔文；星系则由海量恒星、气体、尘埃与暗物质在引力下聚在一起，宇宙中有数千亿个这样的星系。衡量亮度的老办法是星等：数值越小越亮，相差 5 等意味着亮度相差 100 倍，每一等约 2.512 倍。天狼星是夜空中除太阳外最亮的恒星，视星等约 −1.46，而北极星（勾陈一）只有约 +2 等，并不显眼；视星等只说明看起来多亮，把恒星统一挪到 10 秒差距远处再比才是绝对星等，反映真实的发光本领，两者之差直接给出距离（口径见「光年与宇宙尺度」条）。北极星也不是永恒的职位：因岁差，天极在约 2.6 万年的周期里画圈，织女星约一万两千年后会取代勾陈一。参宿四是猎户座里一颗红超巨星，距约 700 光年，若把它放在太阳的位置，其表面可伸到木星轨道附近，这样的巨星随时可能爆发为超新星。我们所在的银河系直径约 10 万光年，含恒星约一千亿到四千亿颗，形状是带棒旋臂的盘，太阳位于猎户座支臂上、距银心约 2.6 万光年，以约每秒 220 千米绕心旋转，一周约需 2.3 亿年；夜空那条乳白色的带子正是我们从内部望向盘面所见的星光。星系按形状分旋涡、椭圆与不规则三类，椭圆星系多老星、气体少，旋涡星系仍在产星。仙女座 M31 距约 250 万光年，是本星系群最大的成员，正以每秒约 110 千米靠近，约四十亿年后与银河系相撞——由于恒星之间极为空旷，撞的过程里几乎不会有恒星真的碰上。要留意一个高频误解：同一张星座图里相邻的两颗星，实际距离可以差上几十倍，视觉上挨着并不代表物理上在一起，星座只是人类在天上画的线。可观测宇宙里到底有多少颗恒星无法逐一数清，只能靠星系的样本统计来估（口径见「大爆炸宇宙论」条）。恒星的生老病死另见「恒星的一生」条，星系的引力骨架由「暗物质」条接手。",
            en: "Stars shine by nuclear fusion in their cores, and the Sun is an ordinary G-type main-sequence star with a surface near 5772 kelvin; galaxies bind together vast numbers of stars with gas, dust and dark matter, and the cosmos holds hundreds of billions of them. The old yardstick of brightness is magnitude, where smaller numbers mean brighter and a difference of five magnitudes means a factor of 100 in light, each step being about 2.512. Sirius, at magnitude −1.46, is the brightest star in the night sky apart from the Sun, while the North Star, Polaris, manages only about +2 and is unremarkable to the eye; apparent magnitude says no more than how bright something looks, and absolute magnitude, which imagines the star moved to a standard distance of ten parsecs, measures what it really puts out - the gap between the two is itself a distance, as the light-years and cosmic distance entry explains. Even the pole star is a temporary office: precession carries the celestial pole around a circle in some 26000 years, and Vega will take over from Polaris in roughly twelve thousand. Betelgeuse, the red supergiant in Orion, lies about 700 light-years off, and set in the Sun's place its surface would reach nearly to the orbit of Jupiter, so a star of that kind may explode as a supernova at any moment. Our Milky Way is a barred disc some 100000 light-years across with perhaps one hundred to four hundred billion stars; the Sun rides the Orion spur about 26000 light-years from the centre and circles it at some 220 kilometres per second, a journey of roughly 230 million years, and the milky band overhead is precisely the view from inside that disc. Galaxies sort into spirals, ellipticals and irregulars; ellipticals hold old stars and little gas while spirals are still making them. Andromeda, M31, at 2.5 million light-years is the largest member of our local group, closing at some 110 kilometres per second and destined to merge with the Milky Way in about four billion years - and because stars are so widely spaced, hardly any will actually collide during it. One everyday trap deserves naming: two neighbours in the same constellation drawing may differ in true distance by tens of times, since looking close is only a line humans have drawn on the sky. No one can count the stars of the observable universe one by one, so the estimate rides on sampling galaxies, as the big bang theory entry takes up. The birth and death of stars belongs to the stellar evolution entry, and the gravitational skeleton of galaxies to the dark matter entry.",
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
            zh: "星系光谱里的吸收线整体向红端移动，位移比例记作 z=Δλ/λ，式中 Δλ 为谱线波长的改变量，λ 为实验室里的静止波长；这就是宇宙膨胀最直接的观测证据。式中 v 为星系退行速度，H₀ 为哈勃常数，d 为星系距离。要区分两种红移：近处星系可以用「多普勒效应」条的思路理解成光源在空间里跑动造成的波长按压与拉长，但宇宙学红移的成因是空间本身在膨胀、光在漫长路途中被波长的拉伸带走，并不是星系在自己的空间里飞行，因此远得多的星系可以退行快过光速而不违反「狭义相对论基本原理」条——那是度规在变，不是物体在穿越空间。哈勃在 1929 年把斯莱弗测得的红移与用造父变星定出的距离放在一起，发现越远的星系退行越快，比例系数就是 H₀，这条正比关系就叫哈勃定律；今天两种主流测法给出的值约在 67 到 73 千米每秒每百万秒差距之间，这个尚未消解的分歧被称作哈勃常数张力，是本领域最活跃的悬案之一。取 H₀=70 时 1/H₀ 约合 140 亿年，与宇宙年龄同数量级，所以这条直线既是距离尺也是时钟。举例：700 百万秒差距外的星系，按 H₀=70 算得退行约 4.9 万千米每秒、即 0.16 倍光速，其光谱线整体挪位、亮度被拉暗、超新星的光变曲线也被拉长同样倍数。膨胀没有中心：面包里的每一颗葡萄干都看到别人在远离自己，宇宙各处看到的规律相同，这也是地心说式直觉需要清除的地方（历史上地心说与日心说的转换见「太阳系」条）。1998 年两个团队用遥远的 Ia 型超新星发现膨胀正在加速，这一效应被写成暗能量或它的数学化身——爱因斯坦在 1917 年塞进方程的宇宙学常数；他当年视之为最大错误，如今它以最低能量的形式回来了，约占宇宙总能量的 68%（口径与「暗物质」条一致）。距离阶梯如何逐级标定见「光年与宇宙尺度」条，宇宙何时开始膨胀见「大爆炸宇宙论」条。",
            en: "Absorption lines in galaxy spectra shift toward the red as a whole, by the fraction z=Δλ/λ, where Δλ is the change in wavelength and λ the laboratory wavelength at rest; this is the most direct evidence that the universe expands. In the formula, v is the recession speed of the galaxy, H₀ the Hubble constant and d the distance to the galaxy. Two kinds of redshift must be told apart: nearby galaxies can be read through the Doppler effect entry, as waves compressed and stretched by a source moving through space, but a cosmological redshift arises because space itself stretches while the light is en route, not because the galaxy flies through its space. A sufficiently distant galaxy may therefore recede faster than light without offending the postulates of special relativity, since it is the metric that changes rather than an object crossing space. In 1929 Hubble put Slipher's redshifts beside distances measured with Cepheid variables and found the farther galaxies recede faster, the ratio being H₀, and this proportionality is Hubble's law; today's two main routes to it land between roughly 67 and 73 kilometres per second per megaparsec, and the unresolved gap is the Hubble tension, among the field's liveliest open problems. Taking H₀=70 gives 1/H₀ near 14 billion years, the same order as the age of the universe, so this straight line serves as ruler and clock at once. A galaxy at 700 megaparsecs recedes at about 0.16 times the speed of light, its lines shift as a block, its light dims, and the light curve of its supernovae stretches by the same factor. Expansion has no centre: every raisin in the rising loaf sees the others draw away, and the same law holds wherever the observer stands, which is where a geocentric kind of instinct must be cleared out (the older swap from geocentric to heliocentric thinking is told in the solar system entry). In 1998 two teams using distant type Ia supernovae found the expansion accelerating; the effect is written either as dark energy or as its mathematical stand-in, the cosmological constant Einstein inserted into his equations in 1917, which he called his greatest blunder and which has returned in the guise of the lowest possible energy density, some 68 percent of the cosmic budget (conventions shared with the dark matter entry). How the distance ladder is calibrated step by step is the light-years and cosmic distance entry, and when this expansion began is the big bang theory entry.",
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
            zh: "大爆炸宇宙论说宇宙曾处于极高温高密的初始状态并一直在膨胀，但它是各处同时膨胀，不是一场从某个中心炸开的爆炸，也没有所谓的外面。时间线可以粗粗地列：最初几分钟里发生核合成，氢与氦按比例成形；约 38 万年后温度降到约 3000 开尔文以下，电子与质子结合成原子，光从此得以自由穿行，那份光就是今天的宇宙微波背景（见「宇宙微波背景」条）；再过了数亿年，第一代恒星与星系点亮。勒梅特在 1927 年就提出膨胀的宇宙并把起点称为原始原子；伽莫夫与阿尔弗、赫尔曼在 1948 年前后算出这场核合成的产物比例，并推定宇宙应留有约 5 开尔文的余温，为观测留下靶子。稳恒态理论曾经与之竞争，主张宇宙虽在膨胀而密度不变、不断创生新物质，随微波背景的发现而退出主流。三条证据相互独立又彼此印证：星系的普遍红移（口径见「宇宙膨胀与红移」条）、微波背景的黑体谱、以及轻元素丰度——按最初三分钟内质子与中子约一比七的比例算，约四分之一的质量会进入氦核，这正是今天观测到的原始氦丰度。奥伯斯佯谬问得很好：若宇宙无限、永恒且处处均匀，夜空应该像太阳表面一样亮，而夜是黑的，这本身就说明宇宙有年龄、星光来不及填满所有方向，加上膨胀把远处的光红移掉能量，夜空才留得下黑暗。可观测宇宙的半径约 465 亿光年，比 138 亿年乘以光速大得多，原因是光飞行期间空间本身又把它拉长了：宇宙年龄 138 亿年与可观测半径 465 亿光年这一对数字的落差是最高频的易错点，两者都对，只是问的不是同一件事。更早的历史无法用光去探，因为宇宙在那之前对辐射不透明；理论上只有中微子背景与引力波背景能把信息带到更古老的时刻。星系如何在此后聚集、暗物质如何在其中起作用，见「暗物质」条与「恒星与星系」条。",
            en: "The big bang theory holds that the universe was once in an extremely hot, dense state and has been expanding ever since - but it is expansion everywhere at once, not a blast going off from some centre, and there is no outside for it to expand into. The timeline can be sketched roughly: within the first minutes nucleosynthesis shaped hydrogen and helium in fixed proportion; some 380000 years in, when the temperature fell below about 3000 kelvin, electrons and protons combined into atoms and light began to travel free, and that light is today's cosmic microwave background, as the entry with that name sets out; a few hundred million years later the first stars and galaxies lit up. Lemaître had already proposed an expanding universe in 1927 and called the starting point a primeval atom; around 1948 Gamow, with Alpher and Herman, computed the yields of that early nucleosynthesis and inferred that a residual heat near 5 kelvin should still fill space, leaving observers a target to hunt. The steady-state theory competed with it, holding that density stays constant as new matter is continuously created, and faded once the background radiation was found. Three lines of evidence stand apart yet confirm each other: the general redshift of galaxies (see the expansion and redshift entry), the blackbody spectrum of the background, and the abundance of light elements - taking protons and neutrons in about a seven-to-one ratio in those first minutes, roughly a quarter of the mass ends up in helium nuclei, which is precisely the primordial helium fraction measured today. The paradox of Olbers asks the question neatly: if the universe were infinite, eternal and uniform, the night sky should shine as brightly as the surface of the Sun, yet night is dark, which itself argues for a universe with an age, whose starlight has had no time to fill every direction, with expansion redshifting the distant light into insignificance. The observable universe has a radius near 46.5 billion light-years, far more than 13.8 billion times the speed of light, because space stretched the journey while the light was crossing it, and the mismatch between an age of 13.8 billion years and a radius of 46.5 billion light-years is the most common slip in this subject - both numbers are right, they simply answer different questions. History before the background radiation cannot be read with light at all, since the universe was opaque to radiation, and only a neutrino or gravitational-wave background could in principle carry news from earlier still. How matter gathered afterwards into galaxies, and what dark matter did in the process, is taken up in the dark matter and stars and galaxies entries.",
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
            zh: "黑洞是引力强到连光也无法逃逸的天体，其边界叫事件视界，视界半径由史瓦西半径公式给出，r=2GM/c²，式中 G 为引力常数、M 为天体质量、c 为光速，可见视界半径只与质量成正比。把太阳压成黑洞，视界直径只有约 5.9 千米；把地球压成黑洞，视界直径不到 2 厘米，这说明黑洞的门槛不是质量大小而是密度，太阳本身靠辐射压撑着自己，除非燃料耗尽、核心质量越过钱德拉塞卡极限 1.4 倍太阳质量而连电子简压也顶不住（见「恒星的一生」条），否则不会自行坍缩。因此恒星级黑洞由大质量恒星坍缩而来，而星系中心的超大质量黑洞可达数百万到数十亿倍太阳质量：银河系的人马座 A* 约 430 万倍，M87 星系中心那个约 65 亿倍，其视界直径约 380 亿千米。事件视界不是固体表面而是一条单行道：越靠近它，时间走得越慢（口径见「引力使时间变慢」条），远处的观察者会看到下落的钟越来越慢、光越来越红；而对落者本人，视界处并无特别的门，只是在较小的黑洞上，脚与头的引力差已能把人拉成一条，所谓意大利面化，而在超大质量黑洞的视界处这种潮汐力几乎无感。看不见怎么证明它在？三条路：吸积盘里的气体被摩擦加热到上亿度而发出强 X 射线；引力透镜把背后的星光弯成环或弧（口径见「暗物质」条）；恒星绕着一个看不见的中心转——银河系核心有恒星以约 16 年周期绕着一个空位置转，从中称出那个看不见的巨大质量（方法见「双星与多星系统」条）。2019 年事件视界望远镜发布 M87 中心黑洞的影像，那圈亮环其实是被引力弯折的吸积流的光围成一圈，中间那块暗区才是黑洞的影子轮廓，直径约 42 微角秒，靠全球多台射电望远镜合成一个近地球直径的口径（分辨率与口径的关系见「显微镜与望远镜」条），2022 年又发布了人马座 A*。常见误解有二：黑洞并非宇宙吸尘器，把太阳换成同质量的黑洞，地球的轨道完全不变，因为引力只看质量与距离；霍金辐射说明黑洞会缓慢蒸发，但一个恒星级黑洞蒸发所需的时间远超宇宙年龄，日常尺度上它仍是只进不出的形象。形成与演化的完整链条见「恒星的一生」条，时空为何会这样弯曲见「广义相对论与时空弯曲」条。",
            en: "A black hole is a body whose gravity is so strong that not even light can escape, bounded by an event horizon whose radius follows the Schwarzschild formula r=2GM/c², where G is the gravitational constant, M the mass and c the speed of light - so the horizon grows in direct proportion to mass and nothing else. Squash the Sun into a black hole and its horizon is barely 5.9 kilometres across; squash the Earth and the horizon is under 2 centimetres, which shows the threshold is density rather than bulk, and the Sun cannot collapse on its own because radiation pressure holds it up unless its core crosses the Chandrasekhar limit of 1.4 solar masses, where even electron degeneracy fails (see the stellar evolution entry). Stellar-mass black holes therefore come from the collapse of massive stars, while the giant ones at galactic centres run from millions to billions of solar masses: Sagittarius A* at the heart of the Milky Way is about 4.3 million, and the one in M87 about 6.5 billion, its horizon some 38 billion kilometres wide. The event horizon is a one-way boundary rather than a solid surface: the closer one gets the slower time runs, as the gravitational time dilation entry explains, so a distant observer sees an infalling clock tick ever more slowly and its light ever redder, while the faller notices no gate at the horizon - only that around a small black hole the pull on feet and head already stretches the body into the so-called spaghetti, whereas at a supermassive one that tidal force is barely felt at all. How do we prove what cannot be seen? Three routes: gas in the accretion disc is frictionally heated to hundreds of millions of degrees and blazes in X-rays; gravitational lensing bends background starlight into rings and arcs, the same tool used in the dark matter entry; and stars orbit an empty-looking point, with one near our galactic centre completing a circuit in about 16 years and weighing the unseen mass by its motion, as the binary and multiple stars entry describes the method. In 2019 the Event Horizon Telescope released an image of the M87 hole, the bright ring being lensed light from the accreting flow wrapped into a circle while the dark patch at its middle is the shadow itself, about 42 microarcseconds across, resolved by combining radio telescopes worldwide into an aperture nearly the size of Earth (aperture and resolution belong to the microscopes and telescopes entry), and Sagittarius A* followed in 2022. Two misunderstandings deserve correction: a black hole is no cosmic vacuum cleaner, since swapping the Sun for one of equal mass would leave Earth's orbit untouched, gravity being a matter of mass and distance only; and Hawking radiation does make a black hole evaporate ever so slowly, but a stellar one needs far longer than the present age of the cosmos to vanish, so on human scales it keeps its reputation as an entrance without an exit. The full chain of formation is in the stellar evolution entry, and why spacetime should bend like that in the general relativity entry.",
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
            zh: "引力波是加速运动的质量对时空的扰动，以涟漪形式按光速向外传播，是「广义相对论与时空弯曲」条里时空可变形的直接结果。它有两个偏振模式，表现为相互垂直方向上的交替拉伸与压缩；不是所有的运动都能辐射它——球对称的膨胀或收缩并不产生引力波，必须有四极矩那样的不对称加速。它的强度极弱：到达地球时应变只有 10⁻²¹ 量级，两条 4 千米长的探测臂被改变的量约 1.6×10⁻¹⁷ 米，比质子直径还小约两个量级，因而探测靠的是把光在真空中来回反射上千次的干涉仪（原理与「迈克尔逊-莫雷实验」条同源），并把地面震动、温度起伏与悬吊噪声一层层隔离掉。2015 年 9 月 14 日 LIGO 首次直接记录到两个黑洞并合，编号 GW150914：两个约 36 与 29 倍太阳质量的黑洞合成 62 倍，约 3 倍太阳质量在 0.1 秒内按「质能方程」条换算成引力波能量，其瞬时功率超过可观测宇宙中所有恒星发光之和的量级。此前的间接证据同样硬核：1974 年赫尔斯与泰勒发现脉冲双星，测得它的轨道周期正按引力波带走能量的速率缩短，两人因此获 1993 年诺贝尔奖。2017 年的两颗中子星并合第一次同时被引力波与望远镜看见，光学对应体里合成了金、铂这类重元素，把重元素从何而来的老问题接上了实验。引力波天文学的意义在于换了感官：不透明的区域、不发光的黑洞、宇宙极早期那些光子带不来的信息，都能用时空本身的抖动来读。中国的天琴与太极计划、欧美的 LISA 都是把干涉臂搬到太空，以获得更长的臂与更低的频率。两处常见误解：一是把引力波当声波，它并不在介质里传，只是在若干频率上可以被人耳映射为声音；二是以为引力波经过时身体会被明显拉长压扁，实际形变量与原子核相比都可忽略。黑洞本身的性质见「黑洞」条，双星轨道如何称出质量见「双星与多星系统」条。",
            en: "A gravitational wave is a ripple in spacetime raised by accelerating mass, travelling outward at the speed of light, the direct consequence of the deformable spacetime described in the general relativity entry. It carries two polarisations, alternating stretches and squeezes along mutually perpendicular directions, and not just any motion makes one: perfectly spherical expansion or contraction radiates nothing, since the source must change asymmetrically, with a quadrupole moment. The effect is feeble by the time it reaches us - a strain near 10⁻²¹, so a 4 kilometre detector arm changes by some 1.6×10⁻¹⁷ metre, two orders below the diameter of a proton - and detection depends on interferometers that bounce light back and forth a thousand times in vacuum (an ancestor of the Michelson-Morley experiment entry) while isolating ground motion, thermal drift and suspension noise layer by layer. On 14 September 2015 LIGO made the first direct recording of two merging black holes, event GW150914: bodies of about 36 and 29 solar masses coalesced into 62, and some 3 solar masses were converted within a tenth of a second into gravitational-wave energy as the mass-energy equivalence entry would compute, its instantaneous output exceeding the combined light of every star in the observable universe. The indirect evidence before it was equally hard: Hulse and Taylor found a binary pulsar in 1974 whose orbital period shrinks exactly at the rate gravitational waves should carry energy away, work that earned them the 1993 prize. In 2017 a neutron-star merger was seen by waves and by telescopes together, and the optical counterpart forged gold, platinum and other heavy elements, attaching experiment to the question of where heavy matter comes from. The point of gravitational-wave astronomy is a change of sense: opaque regions, black holes that emit no light, and the very early universe whose photons cannot reach us can all be read through the shudder of spacetime itself. China's Tianqin and Taiji missions, like the European LISA, propose lifting the interferometer into space for longer arms and lower frequencies. Two slips to avoid: a gravitational wave is not a sound wave and needs no medium, though its frequencies can be mapped into audible sound; and a body is not visibly stretched as a wave passes, the deformation being negligible against an atomic nucleus. The holes themselves are in the black hole entry, and how a binary's masses are weighed from its orbit in the binary and multiple stars entry.",
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
            zh: "恒星的一生由初始质量写定剧本。冷分子云在自身引力下坍缩，原恒星收缩放热，核心升到约一千万开尔文时氢核聚变点燃，星体由此成为一颗主序星，并在这一格里停住一生——太阳正处此段，已燃烧约 46 亿年，还能再烧约 50 亿年。太阳核心的产能走质子-质子链：四个质子合成一个氦核，放出约 26.7 兆电子伏与两个中微子；按这个速率，它每秒把约 426 万吨质量换成辐射（口径见「质能方程」与「核聚变」两条），垂直于阳光的每平方米面约接到 1360 瓦，而每平方厘米面积每秒穿过约六百亿个中微子。质量大于太阳约 1.3 倍的恒星核心更热，主要靠碳氮氧循环产能，碳、氮、氧在反应里只作催化剂而不被消耗。燃料耗尽后核心收缩、外壳膨胀，恒星离开主序变成红巨星，光度更大而表面更凉，在赫罗图（横轴为温度或颜色、纵轴为光度）上朝右上角走去。此后分两岔：太阳这类中小质量恒星先在氦闪中点燃氦，再靠壳层燃烧把外壳抛成行星状星云，留下的碳氧核是白矮星，由电子简并压支撑，上限即钱德拉塞卡极限约 1.4 倍太阳质量，体积与地球相仿而每立方厘米重约一吨；质量更大的恒星逐层烧到铁为止，而聚变过铁不再产能，核心在不到一秒内坍缩，外层反弹成超新星爆发，约百分之九十九的能量在几秒内以中微子的形式带走，剩下百分之一才是抛飞星壳的动能与光芒——1987A 的光抵达地球之前，三家中微子探测器已先记下二十来个事件；爆发后的余辉由镍-56 一类核素的衰变供给，口径见「放射性与半衰期」条。坍缩的结局同样只看质量：核心余重在钱德拉塞卡极限与约 3 倍太阳质量之间的是中子星，直径二十来千米、自转可达每秒数百转，蟹状星云中心那颗每 33 毫秒转一圈，而那片星云正是 1054 年我国史书所记“天关客星”的遗骸，至今仍在以每秒上千千米的速度扩张；余重超过约 3 倍太阳质量，连中子简并压也顶不住，便坍成「黑洞」。这条链上最要紧的粗略规律是寿命与质量成反比：十数倍太阳质量的恒星只能活几千万年，红矮星却可以慢烧上万亿年。恒星又是元素的工厂：氢与几乎全部的氦来自太初，碳到铁在恒星内部与红巨星的星风里炼成，铁以上的重元素要靠超新星与中子星并合（见「引力波」条）。上游的起点见「大爆炸宇宙论」条，下游的星系骨架见「暗物质」条。",
            en: "A star's life is scripted by the mass it starts with. A cold molecular cloud collapses under its own gravity, the protostar heats as it shrinks, and once the core reaches some ten million kelvin hydrogen fusion ignites, settling the body onto the main sequence as a main-sequence star where it spends most of its life - the Sun is in that stretch now, burning for about 4.6 billion years with perhaps 5 billion more to go. The Sun powers itself through the proton-proton chain, in which four protons end as one helium nucleus, some 26.7 megaelectronvolts of energy and two neutrinos; at that rate it converts about 4.26 million tonnes of mass into radiation every second, on the conventions of the mass-energy equivalence and nuclear fusion entries, each square metre facing the Sun receives near 1360 watts, and sixty billion neutrinos pass through every square centimetre each second. Stars more than about 1.3 solar masses run hotter and fuse chiefly through the carbon-nitrogen-oxygen cycle, in which those nuclei act only as catalysts and are not consumed. When the hydrogen gives out the core contracts and the envelope swells: the star leaves the main sequence and becomes a red giant, more luminous but cooler at the surface, moving to the upper right of the Hertzsprung-Russell diagram, whose horizontal axis is temperature or colour and whose vertical axis is luminosity. The road then forks. Stars of the Sun's class ignite helium in a flash and then, burning in shells, cast their outer layers off as a planetary nebula, leaving the carbon-oxygen core as a white dwarf held up by electron degeneracy, capped by the Chandrasekhar limit near 1.4 solar masses, no bigger than Earth yet with a cubic centimetre weighing about a tonne. Heavier stars burn in layers down to iron, fusion beyond iron yields nothing, the core collapses in under a second and the outer layers rebound as a supernova; some 99 percent of the energy departs within seconds as neutrinos while the remaining percent is what flings the shell outward and makes it shine, so detectors on Earth logged some twenty neutrino events before the light of supernova 1987A arrived, and the afterglow is fed by the decay of nuclei such as nickel-56, on the conventions of the radioactivity and half-life entry. What the collapse leaves again depends on mass: between the Chandrasekhar limit and roughly three solar masses it is a neutron star, some twenty kilometres across and spinning at up to hundreds of turns a second - the one in the Crab Nebula turns every 33 milliseconds, and that nebula is the debris of the guest star recorded in Chinese annals in the year 1054, still widening at over a thousand kilometres per second - whereas above about three solar masses even neutron degeneracy fails and the object becomes a black hole. The one crude rule worth keeping is that lifetime runs inversely with mass: a star of ten-odd solar masses lasts tens of millions of years while red dwarfs smoulder for trillions. Stars are also the element factories: hydrogen and nearly all helium are primordial, carbon through iron are forged inside stars and shed by red giant winds, and everything heavier than iron needs supernovae or merging neutron stars, as the gravitational waves entry shows. The beginning upstream is the big bang theory entry and the scaffolding downstream the dark matter entry.",
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
            zh: "宇宙微波背景是大爆炸约 38 万年之后留下的余晖，如今充满全天，黑体谱温度 2.725 开尔文，峰值波长落在 1.06 毫米的微波段（口径与「温度与温标」「电磁波谱与应用」两条相通）。早期宇宙是炽热的等离子体，光刚离开源头就被自由电子散射，整个宇宙像一团不透光的雾；温度降到约 3000 开尔文时电子与质子结合成中性原子，史称复合，雾随即散开，光从此直线穿行——那一刻发出的光在这 138 亿年里被宇宙膨胀把波长拉长千倍以上，落到今天的微波。1965 年彭齐亚斯与威尔逊用贝尔实验室那副喇叭形天线排查卫星通信的噪声，怎么都去不掉一种各个方向都有的、约 3.5 开的多余温升；天线里的一对鸽子连同它们的白色分泌物曾被当作嫌疑并认真清除，最后他们才明白收下的是宇宙本身的背景，两人因此获 1978 年诺贝尔奖。而更早的 1948 年，伽莫夫门下的阿尔菲与赫尔曼已按大爆炸的算法推得应留有约 5 开的余温，只是没被当作严肃预言去测。真正的转折来自卫星：COBE 在 1990 年测出这束谱线是迄今最纯的黑体，1992 年又在十万分之一的量级上找到温度涨落；WMAP 自 2003 年、普朗克卫星自 2013 与 2018 年逐级把全天各向异性图画清，直接从其中读出宇宙年龄 138 亿年、空间几何近乎平直、普通物质约 5%、暗物质约 27%（配比口径见「暗物质」条）。这些十万分之一的疏密不是仪器噪声而是种子：略密处吸引邻区，引力失稳长成星系与星系团，今天所见的宇宙大尺度网状结构即由它们而来。两点须分清：一是背景并不真的均匀，我们的运动在其中刻出一个约 3.4 毫开的偶极项，按「多普勒效应」条的思路即可理解，但这一项比涨落大千倍，作图前必须先剔掉；二是它不由任何一颗恒星或星系所发，而是整个宇宙在同一时刻变得透明时留下的面光，因此可以叫它宇宙最早的一张照片，也是任何宇宙学模型都必须解释的观测底座。它被红移拉凉的机制见「宇宙膨胀与红移」条，温度的微观含义见「分子动理论」条，更早的最初三分钟见「大爆炸宇宙论」条。",
            en: "The cosmic microwave background is the afterglow left about 380000 years after the big bang, filling the whole sky with a blackbody spectrum at 2.725 kelvin whose peak sits at a wavelength of 1.06 millimetre in the microwave band, on conventions shared with the temperature and scales and the electromagnetic spectrum entries. The early universe was a burning plasma in which light was scattered the moment it left its source, so the cosmos hung like an opaque fog; when the temperature fell to about 3000 kelvin electrons and protons combined into neutral atoms - the recombination - the fog lifted and light has travelled in straight lines ever since, and that light has had its wavelength stretched more than a thousandfold by the expansion of space during the 13.8 billion years since. In 1965 Penzias and Wilson, hunting down the noise in a horn antenna at Bell Labs, could not remove an excess of some 3.5 kelvin arriving equally from every direction; a pair of pigeons nesting inside it, together with the white deposit they left, were treated as suspects and duly cleared away, and only then did the two recognise that they had pocketed the background of the universe itself, for which they took the 1978 prize. Earlier, in 1948, Alpher and Herman in Gamow's group had already worked out that a big bang should leave a residue near 5 kelvin, but nobody went to measure it in earnest. The turn came with satellites: COBE found in 1990 that this spectrum is the purest blackbody ever measured, and in 1992 detected its temperature ripples at the one-part-in-a-hundred-thousand level; WMAP from 2003 and the Planck satellite from 2013 and 2018 mapped the anisotropy of the whole sky step by step, reading off directly an age of 13.8 billion years, a near-flat geometry, some 5 percent ordinary matter and some 27 percent dark matter, the ratios shared with the dark matter entry. Those faint contrasts are no instrument error but seed: slightly dense places pull in their neighbours, gravitational instability grows them into galaxies and clusters, and the web now mapped on the largest scales is their outcome. Two distinctions matter. The background is not truly uniform - our own motion carves a dipole of about 3.4 millikelvin across it, understandable through the Doppler effect entry but a thousand times larger than the ripples, so it must be subtracted before anything is plotted; and it is emitted by no star or galaxy but is the surface light of a universe becoming transparent at one instant, which entitles it to be called the earliest photograph there is and makes it the observation every cosmological model must answer to. How expansion cooled it is the expansion and redshift entry, the microscopic meaning of its temperature is the kinetic theory entry, and the first minutes before it are the big bang theory entry.",
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
            zh: "暗物质不发光、不吸收也不散射电磁波，只能靠引力察觉；它约占宇宙全部物质的八成五，由原子构成的普通物质只有一成多。这个词是茨维基在 1933 年造出的：他用位力定理核算后发星系团里众多星系的运动速度，得出总质量比看得见的物质多出数百倍，当时几乎无人采信。第二条证据来自星系自身：二十世纪七十年代鲁宾与福特逐颗测仙女座等旋涡星系外缘的公转速度，发现速度并不按「天体运动与开普勒定律」条预告的那样随半径下降，而是一条平到最外缘的旋转曲线，这说明星系被裹在一圈延展到可见盘十数倍之外的暗物质晕里。第三条路是引力透镜：前景质量把背景星像扭曲、拉长成弧，由形变反推出的质量分布同样远超亮光的分布；最干净的一例是 2006 年公布的子弹星系团，两团相撞时灼热气体被阻力拖在中间，X 射线的亮区与透镜测得的质量峰彼此错开，物质与光第一次被分开画在同一张图上。第四条是宇宙学的账：「宇宙微波背景」图样里那些疏密的相对高低，加上星系在大尺度上结成的网状结构，都要求存在不参与电磁作用、却早在复合之前就已成团的额外质量；按普朗克卫星的口径，宇宙的构成约为普通物质 5%、暗物质 27%、暗能量 68%，后一项见「宇宙膨胀与红移」条。候选者主要是两类：与弱相互作用同量级重的粒子，以及轻得多的轴子。既然只认引力，找它就得去最安静的地方——我国锦屏地下实验室埋在山体之下 2400 米岩层里，宇宙线本底为世界最低之一，极低温晶体与液氙探测器守在那里，等一个原子核被撞一下；结果至今是零，可能的质量与作用截面界线只能一路收紧，于是也有人改试引力定律本身在极低加速度下是否失效，但这类修正在透镜与背景辐射两方面都难以兼顾。必须与「黑洞」划清界限：暗物质并不是把光关起来的致密天体，若它只是由质子与中子堆成的普通物体，「大爆炸宇宙论」条里太初核合成算出的氦丰度与微波背景的峰位都不会是现在这个样子。它撑起骨架，「恒星的一生」条讲骨架上那层发光的东西如何生灭，「光年与宇宙尺度」条讲这些尺度是怎么量出来的。",
            en: "Dark matter neither shines, absorbs nor scatters light and betrays itself only through gravity; it holds roughly five-sixths of all matter in the cosmos, atoms supplying barely a sixth. The name was Zwicky's, in 1933: applying the virial theorem to the motions of galaxies in the Coma cluster he concluded that its mass ran to hundreds of times the visible supply, and almost no one believed him. The second witness is the galaxies themselves - in the 1970s Rubin and Ford measured orbital speeds out to the rims of spirals such as Andromeda and found no falloff of the kind the Kepler's laws entry would predict for mass you can see, the rotation curves staying flat far past the visible edge, which means each galaxy sits inside a halo of dark matter reaching some ten times the disc. The third route is gravitational lensing, where foreground mass stretches background images into arcs and the mass map rebuilt from the distortion again exceeds the distribution of light; the cleanest case is the Bullet cluster, published in 2006, in which two colliding clusters left their hot gas dragged to the middle by ram pressure while the lensed mass peaks slid past it - matter and light drawn separately on one page for the first time. The fourth is the cosmological ledger: the relative heights of the ripples in the cosmic microwave background pattern, together with the web galaxies weave on the largest scales, both demand extra mass taking no part in electromagnetism and already clumping before recombination; on Planck's accounting the universe is about 5 percent ordinary matter, 27 percent dark matter and 68 percent dark energy, the last item belonging to the expansion and redshift entry. Two candidates lead: particles as heavy as the weak interaction, and axions far lighter still. Since only gravity speaks for it, the search goes where it is quietest - China's Jinping underground laboratory lies beneath 2400 metres of rock, among the lowest cosmic-ray backgrounds on Earth, where cryogenic crystals and liquid xenon wait for a single nucleus to be nudged; the answer so far is nothing, the allowed mass and cross-section bounds tighten year by year, which drives some to ask whether gravity itself fails at vanishing accelerations, though such readings strain against both the lensing and the background evidence. Keep it apart from a black hole: dark matter is not light locked inside a dense body, and were it merely protons and neutrons then the primordial helium abundance of the big bang theory entry and the peak structure of the background would both look different. It is the scaffolding; the stellar evolution entry covers the luminous layer built on it, and the light-years and cosmic distance entry how such scales are measured.",
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
            zh: "光年是距离而不是时间：光在真空中一年走过的路程，约 9.46 万亿千米，估算时粗记作十万亿千米（算法就是把 3×10⁸ 米每秒乘以一年的 3156 万秒，正是「数量级估算」条教的那种两个大数相乘）。天文学另有一把尺叫秒差距：当天体的视差恰为 1 角秒时它的距离就是 1 秒差距，合 3.26 光年、3.09×10¹⁶ 米；视差角与距离成反比，比邻星的视差约 0.77 角秒，于是距离 1.30 秒差距、即 4.24 光年，是除太阳外最近的恒星。测视差要把基线拉长，地球轨道的直径约 3 亿千米就是天然的长基线，今天的天体测量卫星已把视差精度推到几十微角秒，相当于在 1000 千米外看出一根头发丝。基线之外还得靠“标准烛光”：光度已知的天体，拿本征光度与观测亮度一比就交出距离，而星等口径把这件事变成算术——相差 5 等即亮度相差 100 倍，把恒星统一挪到 10 秒差距远处再比才是绝对星等（口径见「恒星与星系」条）。1912 年勒维特发现造父变星的周光关系，脉动周期越长本征光度越大，这把尺第一次量到了银河系之外；更远处靠 Ia 型超新星，其峰值光度几乎一致，能亮到数十亿光年之外（口径与「宇宙膨胀与红移」条一致）。这把量天尺每上一级都要用下一级校准，系统差在各段之间传递，今天哈勃常数张力的来源之一就在这里。第二件事必须记住：宇宙尺度上距离与时间是同一件事，看到的无一不是过去——月球是 1.3 秒前，太阳是 8 分钟前，织女星 25 年前，仙女座 250 万年前，而宇宙微波背景送来的是 138 亿年前的光，望远镜因此是时间机器。丈量天的传统在我国同样古老：东汉张衡制浑天仪，以水漏带动浑象来演示星辰运转（其事见「中华王朝」科目人物志里的“张衡”条），唐代僧一行于公元 724 年组织实测子午线，是史书记载的第一次子午线一度长的实地测量；今天接棒的是 500 米口径的球面射电望远镜 FAST，常被称作“中国天眼”，到 2024 年已用它发现脉冲星逾 900 颗，以及一夜能取四千条光纤光谱的 LAMOST。至于可观测宇宙半径 465 亿光年为何大于宇宙年龄乘以光速、夜又为什么是黑的，「大爆炸宇宙论」条已一并答过。",
            en: "A light-year is a distance and not a time: the way light crosses in one year through vacuum, some 9.46 trillion kilometres, rounded to ten trillion for estimates, which is simply 3×10⁸ metres per second multiplied by the 31.56 million seconds in a year - the product of two big numbers that the order-of-magnitude estimation entry teaches. Astronomy's other yardstick is the parsec, the distance at which a body's parallax comes to exactly one arcsecond, worth 3.26 light-years or 3.09×10¹⁶ metres; parallax and distance are inverses, and Proxima Centauri, with a parallax near 0.77 arcsecond, sits at 1.30 parsecs, that is 4.24 light-years, the nearest star beyond the Sun. Parallax needs a long baseline, and the diameter of Earth's orbit, some 300 million kilometres, is the natural one, while modern astrometric satellites have carried parallax down to a few tens of microarcseconds, equivalent to making out a human hair at 1000 kilometres. Beyond baselines there are standard candles: bodies whose true luminosity is known, so comparing that with the faintness observed hands over the distance, and the magnitude system turns this into arithmetic - five magnitudes is a factor of 100 in light, and absolute magnitude is what a star would show if moved to a common distance of ten parsecs, as the stars and galaxies entry explains. In 1912 Leavitt found the period-luminosity relation of the Cepheid variables, the slower they pulsate the more luminous they are, and with it distance reached beyond the Milky Way for the first time; farther still come type Ia supernovae, whose peak brightness is nearly uniform and visible across billions of light-years, the same rungs discussed in the expansion and redshift entry. Each rung of this ladder is calibrated against the next and systematic error travels along it, which is one source of today's Hubble tension. The second thing to hold onto is that on cosmic scales distance and time are one quantity: everything seen is past - the Moon 1.3 seconds ago, the Sun eight minutes, Vega twenty-five years, Andromeda 2.5 million, and the cosmic microwave background delivers light 13.8 billion years old, so a telescope is a time machine. China's tradition of measuring the sky is equally old: in the Eastern Han Zhang Heng built a water-driven armillary sphere to demonstrate the turning of the stars, as his entry in the Chinese dynasties subject relates, and in 724 the astronomer-monk Yixing organised a field survey of the meridian, the first measured length of one degree of meridional arc in the historical record. Their successors today are FAST, a 500-metre spherical radio telescope popularly called China's Sky Eye, which had found over 900 pulsars with it by 2024, and LAMOST, which collects four thousand fibre spectra in a night. Why the observable universe's radius of 46.5 billion light-years exceeds age multiplied by the speed of light, and why the night stays dark, are both answered in the big bang theory entry.",
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
            zh: "狭义相对论立在两条公设上。其一，相对性原理：所有惯性系里物理定律的形式完全相同，没有任何实验能在一辆匀速直行的封闭车厢里告诉你“车在动”——把「惯性系」与「匀速直线运动」摆在一起，这就是伽利略对力学说过的话，爱因斯坦把它推广到电磁学与光学。其二，光速不变原理：真空中的光对任何惯性系的观测者都以同一速率 c≈3×10⁸ 米每秒传播，与光源跑多快无关，数值与「光速」条一致。这两句话写于 1905 年。那一年爱因斯坦连发四篇论文——光电效应、布朗运动、六月的狭义相对论、九月补上的质能关系——史称奇迹年，作者当时的身份是伯尔尼专利局的三级技术员。它们之所以革命，是因为十九世纪末的物理看似只差修补：麦克斯韦方程组直接给出电磁波的速度是一个定值，可照速度叠加的常识，不同观测者应当测出不同数值。为弥合这个裂缝，人们假设宇宙充满一种叫“以太”的媒质，它同时充当绝对静止的标准；1887 年迈克尔逊与莫雷用干涉仪比较相互垂直的两臂光程，随地球公转换季转向，始终看不到预期的条纹移动——应当有的移动约 0.4 条，实测不到它的几十分之一，这桩最著名的失败在「迈克尔逊-莫雷实验」条有完整账目。爱因斯坦的取舍是干脆删掉以太：不需要媒质，也不需要绝对静止。承认两条公设，绝对时空就随之报废。洛伦兹与庞加莱其实早已写下联系两个惯性系坐标与时刻的变换式，x′=(x−vt)/√(1−v²/c²)、t′=(t−vx/c²)/√(1−v²/c²)；洛伦兹把它当作以太中的动力学效应，庞加莱也逼近了正确的数学结构，是爱因斯坦给出了物理意义：时间与空间的分划本身依赖参考系。低速时 v≪c，根号趋近一，变换退回伽利略的简单相加，新理论在这一点上必须通过对应原理的关卡，思路见「理想模型」与「极限法与微元思想」两条。三条推论由此展开：「时间膨胀」「长度收缩」与「同时的相对性」，而换不了的是时空间隔与因果次序。两点误解要挑明：一，相对论并非“什么都相对”，它恰恰把光速、把物理定律的形式写成对所有观测者都相同的不变量；二，“狭义”指只管没有引力、彼此匀速的惯性系，把引力收进来是十年后的「广义相对论与时空弯曲」条。至于光速为什么偏偏是极限、远星系又如何能退行超光而不违犯本条，见「同时的相对性」与「宇宙膨胀与红移」两条。",
            en: "Special relativity rests on two postulates. The first, the principle of relativity, says the laws of physics take the same form in every inertial frame, so no experiment inside a smoothly travelling sealed carriage can tell you that “the train is moving” — for mechanics Galileo had already said this of inertial frames and uniform straight-line motion; Einstein extended it to electromagnetism and optics. The second, the invariance of the speed of light, says that light in vacuum propagates at the same c ≈ 3×10⁸ m/s for every inertial observer, no matter how fast the source moves, the same value recorded in the entry on the speed of light. Both were published in 1905, the annus mirabilis in which Einstein produced four papers — on the photoelectric effect, on Brownian motion, on special relativity in June, and on mass–energy in September — while working as a third-class examiner at the Bern patent office. They were revolutionary because late-nineteenth-century physics seemed to need only repairs: Maxwell's equations hand back a fixed wave speed, yet everyday velocity addition says different observers should measure different ones. To close that gap physicists supposed space was filled with an “ether” that also served as absolute rest. In 1887 Michelson and Morley compared the light paths of two perpendicular arms of an interferometer as Earth changed its heading through the year and saw no fringe shift — about 0.4 fringes should have appeared, and the result was under a few tens of that; the entry on the Michelson–Morley experiment keeps the full accounts. Einstein simply deleted the ether: no medium, no absolute rest, and absolute space and time go with it. Lorentz and Poincaré had already written the transformations linking coordinates and times between frames, x′=(x−vt)/√(1−v²/c²) and t′=(t−vx/c²)/√(1−v²/c²); Lorentz read them as dynamical effects in the ether and Poincaré came close to the right group structure, but it was Einstein who gave them physical meaning — the partition of time and space itself depends on the frame. At low speeds v≪c the square root tends to one and the transformation collapses into Galileo's simple addition, the correspondence test any new theory must pass, in the spirit of the entries on idealised models and on limiting and element arguments. Three consequences unfold from the postulates: time dilation, length contraction and the relativity of simultaneity, while the spacetime interval and the order of causally linked events stay invariant. Two misconceptions to correct: relativity is not the claim that “everything is relative” — it is precisely a theory of invariants, c among them; and “special” means it governs only gravity-free frames in mutual uniform motion, which ten years later the general theory superseded. Why light speed is a limit, and how distant galaxies can recede faster than it without breaking the postulates, is treated in the entries on simultaneity and on cosmic expansion and redshift.",
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
            zh: "运动的钟走得慢：Δt=Δt₀/√(1−v²/c²)，式中 Δt₀ 是随钟一同运动的观测者测得的两次滴答间隔，称为原时或固有时，Δt 是相对该钟以速率 v 运动的观测者测得的更长间隔，c 为光速，因子 γ=1/√(1−v²/c²) 在 0.6c 时为 1.25、0.8c 时约 1.67，要慢到十倍得跑到 0.995c。推导只要一支光钟和勾股定理：相距 1 米的两面镜子之间光来回一次算一个滴答，车上的人看光走直线，站台上的人看它走斜边；路程变长而光速不变（「狭义相对论基本原理」条的第二条），钟就必然变慢。变的不是机械，是时间本身——心跳、化学反应、衰变、衰老都按同一比例放慢，车里的人永远感觉不到自己慢。这份相互性看着像矛盾：两边都看见对方的钟慢，化解要靠「同时的相对性」条，因为比较两处的时刻本身需要约定。证据最漂亮的是 μ 子：静止的 μ 子平均只活 2.2 微秒，即便以光速也只能走约 660 米，可宇宙线与高空大气相撞产生的 μ 子大量抵达海平面；按 0.995c 计 γ=10，地面看到它的寿命延长到约 22 微秒、可飞约 6.6 千米，而 μ 子自己的说法是 15 千米厚的大气沿运动方向被压到 1.5 千米——同一件事的两种记账，另一面见「长度收缩」条。钟也真被搬上过天：1971 年哈菲勒与基廷带着铯原子钟分别向东、向西绕地球飞行，落地后与海军天文台的基准钟比出纳秒级的差，与理论相符，数字口径见「原子钟与秒的定义」条；导航卫星每天要为速度项扣掉约 7 微秒，同一条也记在那边。加速器里不稳定粒子能飞过的距离成倍拉长，是本条在工程上的日常（见「粒子加速器」条）。至于“双生子佯谬”：以 0.8c 出行的旅行者过 10 年，地球上过去 16.7 年，回来的人确实更年轻；破谬的关键是旅行者中途必须调头、并不一直待在同一个惯性系里，谁经历加速谁的原时更短。日常尺度上完全可以忽略——时速 300 千米的高铁跑满一天，钟只差约 3 纳秒。两处易错：一是同一对事件在随动系里的原时最短，别说成“钟不准”；二是别把眼睛看到的光行时差与测量结果混为一谈，那是另一笔账。",
            en: "A moving clock runs slow: Δt=Δt₀/√(1−v²/c²), where Δt₀ is the interval between two ticks measured by an observer riding with the clock — the proper time — and Δt is the longer interval measured by an observer relative to whom the clock moves at speed v, with c the speed of light. The factor γ=1/√(1−v²/c²) is 1.25 at 0.6c, about 1.67 at 0.8c, and reaches ten only at 0.995c. One light clock and Pythagoras give the derivation: a tick is a round trip of light between two mirrors a metre apart; a passenger sees a straight path, a platform observer sees a diagonal one, and since the route lengthens while the speed of light cannot change, the tick must take longer. Nothing mechanical is wrong — time itself is involved, so heartbeats, chemistry, decay and ageing all slow in the same proportion, and the traveller never feels late. The reciprocity looks like a contradiction, since each side sees the other's clock lagging; the way out is the relativity of simultaneity, because comparing times at two places requires a convention. The neatest evidence is the muon: at rest it lives about 2.2 microseconds, some 660 metres of light, yet muons created by cosmic rays high in the atmosphere reach sea level in numbers. At 0.995c, γ=10, so the ground sees its lifetime stretched to about 22 microseconds and roughly 6.6 kilometres of flight, while the muon's own version is that the 15 kilometre atmosphere is flattened to 1.5 kilometres — two bookkeeping styles for one fact, the other side being length contraction. Clocks have physically flown: in 1971 Hafele and Keating carried caesium clocks east and west around the world and found nanosecond-scale offsets against the US Naval Observatory reference, matching theory, with figures kept in the entry on atomic clocks and the definition of the second; navigation satellites deduct about 7 microseconds a day for the velocity term. Unstable particles in accelerators travel many times farther than their rest lifetimes allow, which is this effect as daily engineering. As for the twin paradox, a traveller at 0.8c who ages ten years returns to an Earth that has aged 16.7: the traveller is genuinely younger, and the paradox breaks because the turnaround means the traveller was never in one inertial frame throughout — whoever accelerates accumulates less proper time. At human scales the effect is negligible: a train at 300 km/h lagging about 3 nanoseconds over a whole day. Two slips to avoid: proper time is the shortest interval between the two events, not an inaccurate clock; and what an eye receives after light-travel delay is not the measurement itself.",
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
            zh: "沿运动方向的长度变短：L=L₀√(1−v²/c²)，式中 L₀ 是物体相对自身静止时的原长，L 是相对它以速率 v 运动的观测者测得的长度，垂直于运动的尺寸不受影响，c 为光速。它与「时间膨胀」共用同一个因子 γ，只是位置相反——收缩是除以 γ。这个念头最初并非相对论的产物：1887 年迈克尔逊与莫雷找不到“以太风”之后，菲茨杰拉德在 1892 年、洛伦兹在 1895 年各自提出，物体沿运动方向会真的缩短那么一点，恰好抹平干涉仪两臂的程差，于是实验永远测不出什么。爱因斯坦的改动是把它从材料的机械变形升级为时空的分划方式：不是原子被压扁，而是“测量一个运动物体的长度”这件事本身就要求在同一时刻记下头尾两个坐标，而同时性按参考系重新划分（「同时的相对性」条），长度因此必然带上 γ。数值要算清：γ=2 需要约 0.87c，一根 6 米的杆此时量得 3 米；高铁的收缩只有十亿分之一的百亿分之几量级，日常测不到。著名的“撑杆过车库”佯谬由此而生：以 0.87c 冲来的 6 米杆，在车库方看来只剩 3 米，前后两扇门可以同时关上；杆上的人则说 3 米长的车库缩成 1.5 米，两扇门绝不同时关——两种说法都对，分歧只在“同时”，而且没有哪扇门会夹到杆，因为杆减速时的应力传递也不可能快过光速（因果上限见「狭义相对论基本原理」条）。真实世界里它已被反复检验：相对论重离子对撞时，金核沿束流方向被压成一片“薄饼”，核子密度陡然升高，正是这类环境让实验室得以复现极早期宇宙的高温（口径见「粒子物理与标准模型」条）；宇宙线 μ 子能抵达地面，用收缩来讲与用钟慢来讲同样简洁。三点易错：一、收缩只发生在运动方向，杆的粗细不变；二、它是测量的结果而非“眼睛看到的形状”——把光行时差算进去后，高速球体看起来是被旋转而不是被压扁，这叫特雷尔效应；三、原长最长，物体在自己的静止系里一切如常，别把收缩当成材料受损。至于为什么垂直方向不参与、以及它与钟慢如何出自同一条变换式（即洛伦兹变换，见「狭义相对论基本原理」条），回到那两条公设即可看清：变化的是时空坐标的分划，而不是物体受到的挤压。",
            en: "Lengths along the direction of motion shorten: L=L₀√(1−v²/c²), where L₀ is the rest length measured in the object's own frame, L the length found by an observer moving at speed v relative to it, c the speed of light, and dimensions perpendicular to the motion untouched. The same γ that dilates time appears inverted here — contraction is a division by γ. The idea began outside relativity: after Michelson and Morley failed to find an “ether wind” in 1887, Fitzgerald in 1892 and Lorentz in 1895 proposed that bodies really do shrink along the direction of travel by exactly enough to cancel the interferometer's path difference, so the experiment could never register anything. Einstein's revision was to promote this from mechanical strain to the way spacetime is partitioned: measuring the length of a moving body means recording the positions of its ends at the same time, and simultaneity is re-parted frame by frame, so the length must carry γ. The numbers: γ=2 needs about 0.87c, at which a 6 m pole measures 3 m, whereas a train contracts by a fraction far beyond everyday reach. The pole-in-the-barn paradox follows: driven at 0.87c, a 6 m pole fits a 3 m barn and both doors can shut together, while the pole's own account says a 3 m barn shrinks to 1.5 m and the doors cannot shut at once — both are right, the whole disagreement living in “at once”, and no door harms the pole because stopping stresses cannot travel faster than light either. Nature confirms it: in relativistic heavy-ion collisions gold nuclei are flattened into pancakes along the beam, raising nucleon density in the matter that recreates the early universe's heat, and the muons of cosmic rays reach the ground just as easily described by contraction as by slow clocks. Three slips: contraction runs only along the motion, so the pole keeps its thickness; it is a result of measurement, not of appearance — allowing for light-travel delay, a fast sphere looks rotated rather than squashed, the Terrell effect; and the rest length is the longest, the body suffering nothing in its own frame. Why the transverse size is exempt, and how this and slow clocks issue from one Lorentz transformation, is clearest straight from the two postulates: what changes is the partition of spacetime coordinates, not pressure on the material.",
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
            zh: "E=mc² 说的是质量与能量本是一事：式中 E 为能量，m 为质量，c 为真空光速，换算系数 c²≈9×10¹⁶ 焦每千克，意味着一份静止质量本身就存着海量能量。物体不动时也有“静能”mc²，运动时总能量为 γmc²，动能只是多出的零头。核物理里最顺手的换算是 1 个原子质量单位对应 931.5 兆电子伏，于是核子结合得越紧、总质量剩得越少，「核力与结合能」条里的质量亏损就是这本账；电子的静能只有 0.511 兆电子伏，一对正负电子湮灭至少给出 1.022 兆电子伏的光子，反过来造出质量也要花这么多（见「波粒二象性」条）。数量级一算就懂：1 千克质量全部放出是 9×10¹⁶ 焦，约合 2150 万吨 TNT，是广岛那颗约 1.5 万吨当量的千余倍；倒过来更震撼——广岛那次爆炸真正消失的质量只有约 0.7 克。太阳每秒把约 426 万吨质量换成辐射，光度 3.8×10²⁶ 瓦，口径见「恒星的一生」与「核聚变」两条；一次铀核裂变约放 200 兆电子伏，四个质子合成一个氦核放 26.7 兆电子伏，见「核裂变与链式反应」与「核聚变」。化学燃烧同样服从这条定律，只是小到看不见：1 千克汽油放出约 4.6×10⁷ 焦，质量只减约 5×10⁻⁷ 克，占比约 5×10⁻¹⁰；1 千克水升温 80 摄氏度，内能增量对应质量增加约 3.7×10⁻¹² 千克（热量口径见「内能」条）——这正是天平在化学反应里够用、在核反应里不够用的原因。三点必须纠正：一、不是“物质消灭了、转化为能量”，质量本来就是能量的量度，能量带走时质量同行；封闭系统的总能量与总质量各自守恒，但各部分静止质量之和（静质量）可以不守恒，光子对产生与湮灭就是账面重排；二、E=mc² 不是原子弹的设计图，链式反应能否自持取决于中子增殖与临界质量，质能式只负责结算（详见「核能的利用」条）；三、把 m 写成“随速度增大的质量”是老写法，今天更主张用不变质量配上「质速关系」条的动量表达，免得与惯性质量、引力质量两重身份的讨论纠缠，后者见「等效原理」条。日常经验里这条式子并不遥远：称一台锅炉、烧一壶水、给电池充电，被充进去的能量都带着极小的质量入场，只是小到仪器看不见——它真正显形，是在核与星的尺度上。",
            en: "E=mc² states that mass and energy are one thing: E is energy, m is mass, and the conversion factor c², about 9×10¹⁶ joules per kilogram, says a body's rest mass already stores an immense account of energy. A stationary object still holds this rest energy, a moving one totals γmc², so kinetic energy is only the surplus. The handy unit in nuclear physics is 1 unified atomic mass unit = 931.5 MeV, which is how the entry on nuclear force and binding energy turns a mass defect into energy; an electron's rest energy is a mere 0.511 MeV, so annihilating a positron with it yields at least 1.022 MeV of photons and creating such a pair costs the same. The magnitudes: converting 1 kg outright releases 9×10¹⁶ J, some 21.5 million tonnes of TNT, over a thousand times the roughly 15 kilotonnes of Hiroshima — and read the other way, that explosion destroyed only about 0.7 g of mass. The Sun trades about 4.26 million tonnes of mass for radiation every second, a luminosity of 3.8×10²⁶ W, as the entries on stellar evolution and on nuclear fusion record; one fission of uranium yields about 200 MeV and four protons fused into helium 26.7 MeV. Chemistry obeys the same law at absurdly small scale: burning 1 kg of petrol frees about 4.6×10⁷ J and about 5×10⁻⁷ g of mass, a fraction near 5×10⁻¹⁰, and heating 1 kg of water by 80 °C adds roughly 3.7×10⁻¹² kg, which is why a balance suffices in the laboratory but not in the reactor. Three corrections. First, matter is not “destroyed and turned into energy”: mass is a measure of energy, so departing energy departs with its mass; total energy and total mass of a closed system are each conserved, yet the sum of the parts' rest masses need not be, as pair creation and annihilation show. Second, the formula is not a blueprint for a bomb — whether a chain reaction sustains itself depends on neutron multiplication and critical mass, while E=mc² merely settles the bill, as the entry on the use of nuclear energy details. Third, writing m as a “mass that grows with speed” is the old style; today one keeps the invariant mass and speaks of momentum instead, the relation set out in the entry on the mass-speed relation, avoiding tangles with the inertial and gravitational roles discussed under the equivalence principle. Nothing here is far from daily life: charging a battery or boiling water does carry energy's tiny mass aboard, only too little for instruments — it declares itself at the scale of nuclei and stars.",
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
            zh: "广义相对论把引力解释成时空的弯曲。1915 年 11 月爱因斯坦交出场方程：左边描述时空的曲率，由黎曼 1854 年关于几何基础的讲演所开创的弯曲空间语言、里奇与列维-齐维塔的合同演算、以及与格罗斯曼数年苦算提供；右边是物质与能量的分布，比例系数含 8πG/c⁴，式中 G 为「引力常数」、c 为光速。惠勒的口诀最见骨：“物质告诉时空如何弯曲，时空告诉物质如何运动。”起点是一个念头——1907 年他说，自由下落的人感觉不到自己的重量；这条「等效原理」意味着引力可以靠选择参考系在局部消去，那么剩下需要解释的就是不同落点之间的相对加速，即潮汐，即曲率。三条经典检验全胜。其一，水星近日点每世纪比牛顿的账本多出 43 角秒，自 1859 年勒维耶指出后悬了半个多世纪（同一轨道账目的牛顿面见「万有引力定律」条），场方程给出的正是这 43 角秒，爱因斯坦据说是算完就躺下不干了。其二，掠过日面的星光偏折 1.75 角秒，恰是“光作为微粒被引力拉扯”这一早先算法值 0.875 角秒的两倍；1919 年 5 月 29 日日食，爱丁顿带队分赴普林西比岛与索布拉尔测得的结果与前者相符，爱因斯坦一夜成名，其后的复测、射电干涉与依巴谷卫星把偏差压到百分之一以内。其三，掠过太阳的雷达回波会被额外延迟几十微秒，即夏皮罗延迟，卡西尼号在 2003 年把理论与观测的差缩到十万分之几。清单此后越来越长：引力红移（1960 年庞德与雷布卡在 22.5 米高的塔里量得，见「引力使时间变慢」条）、脉冲双星轨道按引力波带走能量的速率收缩（见「引力波」条）、大质量天体把背景星光弯成弧与环的引力透镜——1936 年爱因斯坦算出、1979 年找到第一对双像类星体，如今用它称量「暗物质」，成环成像的一例见「黑洞」条——以及 2015 年 9 月 14 日 LIGO 直接收到的双黑洞并合 GW150914，两个约 36 与 29 倍太阳质量的黑洞合成 62 倍，约 3 倍太阳质量在 0.1 秒内按「质能方程」条换成时空的抖动。它也改了宇宙学：1917 年他为让宇宙静止而塞进宇宙学常数，膨胀被发现后他视之为最大失策，1998 年这个常数以暗能量的形式归来，约占宇宙总能量六成八（口径见「宇宙膨胀与红移」条）；旋转的质量还拖着时空同转，即参考系拖曳，引力探针 B 号测得每年约 39 毫角秒。两条边界要说清：低速弱场下它自动退回「万有引力定律」，这是新理论必须通过的对应原理；而它与量子理论至今没有统一，黑洞中心的奇点与普朗克尺度上的时空仍是悬案。",
            en: "General relativity reads gravity as the curvature of spacetime. In November 1915 Einstein produced the field equations: the left side describes curvature, in the language of curved space opened by Riemann's 1854 lecture on the foundations of geometry, worked out with Ricci and Levi-Civita's absolute calculus and years of labour with Grossmann; the right side is the distribution of matter and energy, coupled through 8πG/c⁴ with G the gravitational constant and c the speed of light. Wheeler's couplet is the sharpest summary: matter tells spacetime how to curve, spacetime tells matter how to move. The seed was 1907's thought that a falling person feels no weight — the equivalence principle, which lets gravity be removed locally by choosing a frame, so all that remains to explain is the relative acceleration of neighbouring falls, namely tides, namely curvature. The three classic tests all passed. Mercury's perihelion gains 43 arcseconds a century more than Newton's bookkeeping allows, an anomaly known since Le Verrier in 1859 (the Newtonian side of that account in the entry on universal gravitation), and the equations hand back exactly 43. Starlight grazing the Sun bends by 1.75 arcseconds, twice the 0.875 given by treating light as corpuscles pulled by gravity; expeditions led by Eddington to Príncipe and Sobral measured the 19 May 1919 eclipse, matched the larger figure and made Einstein famous overnight, with later re-observations, radio interferometry and Hipparcos tightening the deviation inside one per cent. Radar echoes skimming the Sun arrive tens of microseconds late — the Shapiro delay — and Cassini in 2003 squeezed the difference to a few parts in a hundred thousand. The list has only grown: the gravitational redshift measured by Pound and Rebka up a 22.5 m tower; the orbital decay of the 1974 binary pulsar at precisely the rate gravitational waves carry energy away; gravitational lensing, arcs and rings, computed by Einstein in 1936, seen as the first double quasar in 1979 and now used to weigh dark matter; and LIGO's direct detection on 14 September 2015 of two black holes of 36 and 29 solar masses merging into 62, some 3 solar masses converted in 0.1 seconds into a ripple of spacetime. Cosmology changed with it: the cosmological constant inserted in 1917 to hold the universe still, later called his greatest blunder, returned in 1998 as dark energy accounting for roughly sixty-eight per cent of the cosmic budget; and rotating mass drags spacetime with it, frame dragging, measured by Gravity Probe B at about 39 milliarcseconds a year. Two frontiers to state plainly: in slow, weak fields the theory collapses back into Newton's law, the correspondence any successor must pass; and it has yet to be reconciled with quantum physics, leaving singularities and Planck-scale spacetime open.",
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
            zh: "“同时”不是宇宙级的公共事实。1905 年爱因斯坦先给出对钟的约定：在一地发出光信号、由镜面反射返回，取往返时间的中点作为“到达的那一刻”的时刻；同一参考系里两个异地事件是否同时，从此有了可操作的判据。配上「狭义相对论基本原理」的两条公设，结论立刻出来：站台上认为同时劈中车头与车尾的两道闪电，在向前奔跑的车上人看来先中车头——因为他正朝车头来的光跑去，而扣掉传播时间后判定依然如此。定量地，沿运动方向相距 L 的两事件在新参考系里的时刻差为 vL/c² 量级（再乘一个 γ）。拿一列夸张的 1000 千米长、时速 900 千米的列车算，v=250 米每秒，差约 2.8 纳秒：小得可笑，但光一纳秒走 30 厘米，卫星定位与通信网络的对钟都必须把这类项算进去，口径见「原子钟与秒的定义」条。这里要拆掉一个常见误读：同时性的相对性不能解释成“光传到人眼需要时间，所以看到的有先后”——把传播延迟全部扣除，两个参考系仍对“是否同时”给不出一致答案，这是时空的结构，不是测量的技术故障。1908 年闵可夫斯基给出了最干净的表达：把时刻乘上光速与三个空间坐标并列成四维时空，两事件间的时空间隔 s²=c²t²−x²（三维情形取各方向之差）对所有惯性系相同，变的只是它相对各坐标轴的倾角；用他的原话说，空间本身与时间本身都注定消隐为阴影，只有二者结合才保有独立的意义。于是事件被分成三类：类时的（能被光或更慢的信号连通）先后绝对，可以构成因果链；类空的（连不通）先后随参考系颠倒，因而绝不能用来传信；类光的恰好落在边界上。每个事件周围由所有可能的光线围成一个“光锥”，锥内是它能影响的未来与能被告知的原因，锥外是永远互不通问的他处。相对论保住的不是“现在”，而是因果（速度上限见「狭义相对论基本原理」条，场的扰动以光速传变见「电磁感应」条）。“全域的此刻并不存在”也牵出现在主义与块宇宙之争，那是「万物哲学」科目的题目。两处易错：一、「时间膨胀」比的是同一处的两个时刻，本条比的是两处的时刻，两式不可互替；二、“各参考系各有说法”不等于任意，洛伦兹变换给出的差值精确可算、可验证，并且与「同时的相对性」这一名称一样，是可重复测量的事实。",
            en: "Simultaneity is no cosmic common fact. In 1905 Einstein first fixed a convention for synchronising clocks: send a light pulse from a place, reflect it back from a mirror, and take the midpoint of the round trip as the moment of arrival; whether two distant events are simultaneous in that frame is then operationally decided. Add the two postulates of special relativity and the verdict follows at once. Two lightning strokes that a platform judges to hit a train's front and rear together strike the front first for a rider running toward that flash — and the judgement survives even after light-travel time is subtracted. Quantitatively, events separated by L along the motion differ in time by about vL/c², with a further γ: for an exaggerated train 1000 km long at 900 km/h, v=250 m/s gives roughly 2.8 nanoseconds, absurdly small, yet light runs 30 cm in a nanosecond, so satellite navigation and telecom timing must carry such terms, as the entry on atomic clocks and the definition of the second spells out. A familiar misreading should be dismantled: this is not “we see things late because light takes time” — subtract every propagation delay and the two frames still disagree, which is a property of spacetime, not of instruments. Minkowski's 1908 formulation is the cleanest: multiply time by c and set it beside the three coordinates as four-dimensional spacetime, and the interval s²=c²t²−x² between two events is the same for all inertial frames, only its tilt against the axes changing; in his words, space by itself and time by itself are doomed to fade into shadows and keep reality only in their union. Events therefore fall into three classes: timelike ones, reachable by light or slower signals, keep an absolute order and can bear causal chains; spacelike ones, unreachable, trade their order between frames and so can never carry a message; lightlike ones sit on the boundary. Around each event the possible light rays trace a light cone — inside, its future and its causes; outside, regions that can never exchange news. What relativity protects is not “the now” but causality: the speed limit sits in the entry on the postulates, and fields propagate their disturbances at light speed as the entry on electromagnetic induction shows. That there is no universal present also feeds the philosophical quarrel between presentism and the block universe. Two slips: time dilation compares two instants at one place while this entry compares two places, so the formulas are not interchangeable; and “each frame has its own verdict” is not arbitrariness — the offset is exact, calculable and measured.",
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
            zh: "引力与加速度在局部不可区分，这是广义相对论的地基。先把质量的两种身份分开：在 F=ma 里它是抵抗加速的本性，称惯性质量；在「万有引力定律」里它决定受引力的大小，称引力质量。这两个概念在逻辑上毫无必然联系，实验却一再发现它们严格相等——牛顿用过单摆，伽利略的自由落体传说家喻户晓（真实的斜面工作在「伽利略斜面实验」条），厄缶自 1889 年起用扭秤比较不同材料的下落加速度，精度做到十亿分之几；2022 年微小号（MICROSCOPE）卫星公布最终结果，把两种铍合金的加速度相对差压到 10⁻¹⁵，也就是十亿亿分之一。爱因斯坦把这个巧合升格为原理：一只密封舱里的人，无论做力学、光学、摆或钟的任何实验，都无法分辨自己是静止在地球表面，还是在深空中被火箭以 9.8 米每二次方秒匀加速拖着走。推理随即展开：舱在深空向上加速时，一束水平穿舱的光会在光飞行的时间里随舱横移，观察者看见光线弯了；既然加速能让光弯，引力也必然让光弯——1911 年爱因斯坦正是这样算出偏折值的，可惜只得对的一半，另一半要等时空弯曲补齐（见「广义相对论与时空弯曲」条）。同理，加速舱的底与顶因为「时间膨胀」而钟速不同，那么引力场里高低两处也必有差，这便是引力红移与「引力使时间变慢」的来路。为何这一条足以把引力几何化：既然自由下落能在局部消去引力，自由落体就不是“受力的运动”而是“不受力的运动”，即沿测地线的惯性运动；两物相互靠近不再是有力在拉，而是它们走的路径本身在弯曲的时空里收拢。引力的座次由此从“一种力”改成“时空的形状”。必须补上的限制是“局部”：舱够大时，两只各自下落的球会缓缓靠近，因为它们都朝地心收敛，这种消不掉的相对加速叫潮汐，正是曲率的定义本身（潮汐的极端形态见「黑洞」条）。日常最亲切的例子是绕地飞船里的失重，配合「三个宇宙速度」与「卫星变轨与轨道转移」两条看：舱内飘着不是因为没引力（四百千米高处的引力仍有地面的约九成），而是舱与舱内一切以同一加速度一起下落。三点易错：一、等效原理只在小区域、短时间内成立；二、它说的是局域不可分辨，不是说引力与加速在起源上完全同源；三、惯性质量与引力质量相等是实验事实，别把它当成定义——正因它不是定义，这条原理才有内容。",
            en: "Gravity and acceleration are locally indistinguishable, and that is the cornerstone of general relativity. First separate the two faces of mass: in F=ma it is resistance to acceleration, inertial mass; in the law of universal gravitation it sets how strongly a body is pulled, gravitational mass. Nothing in logic marries the two, yet experiment keeps finding them strictly equal — Newton used pendulums, Galileo's falling-body story is famous (the real inclined-plane work sits in its own entry), and from 1889 Eötvös compared the fall of different materials with a torsion balance to a few parts in a billion; the MICROSCOPE satellite's final 2022 result pushes the relative difference between two beryllium alloys to 10⁻¹⁵, one part in a thousand trillion. Einstein promoted the coincidence to a principle: inside a sealed cabin no experiment — mechanical, optical, pendulum or clock — can tell someone whether they rest on Earth or are dragged through deep space at 9.8 m/s². The reasoning runs at once: in a cabin accelerating upward, a horizontal beam of light is seen to curve because the floor gains on it mid-flight; if acceleration bends light, gravity must too. Einstein computed a deflection this way in 1911 and got exactly half the right answer, the other half waiting for curved spacetime. Likewise, floor and ceiling of the accelerating cabin keep time at different rates through time dilation, so a gravitational field must also grade clock rates with height — the route to the gravitational redshift and to gravitational time dilation. Why is this enough to geometrise gravity? Because free fall can erase gravity locally, falling is not motion under a force but forceless motion along a geodesic, and two bodies drawing nearer do so not because something pulls but because their paths converge in curved spacetime. Gravity is demoted from a force to a feature of geometry. The saving clause is “locally”: in a large cabin two freely falling spheres creep together because both head for Earth's centre, and that irreducible relative acceleration — the tide — is curvature itself, whose extreme form is spelled out in the entry on black holes. The homeliest instance is weightlessness in orbit, read together with the entries on cosmic velocities and orbital manoeuvres: things float at 400 km not because gravity is gone (it is still some ninety per cent of surface strength) but because cabin and contents fall together. Three slips: the principle holds only in small regions for short times; local indistinguishability is not identity of origin; and the equality of inertial and gravitational mass is an experimental fact, not a definition — which is precisely what gives the principle its content.",
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
            zh: "引力越强，钟走得越慢，这条效应叫引力时间膨胀。弱场里两处钟的相对快慢差等于引力势差除以光速平方，地面附近简化成 Δf/f=gh/c²，式中 g 为重力加速度、h 为高度差、c 为光速：一米的高度差对应约 1.1×10⁻¹⁶ 的相对频差，一年累积约 3 纳秒，所以一个人头与脚的钟差，用整整一生也攒不满一微秒。精确写法来自「广义相对论与时空弯曲」条的史瓦西解：质量 M 附近钟的节拍按 √(1−2GM/(rc²)) 缩小，越近越慢，r 缩到 2GM/c²（史瓦西半径）时因子归零——那正是「黑洞」条的事件视界，远处观察者会看到下落的钟越走越慢、光越走越红，最终像“冻”在视界上。第一个在地面把它量出来的是 1960 年的庞德与雷布卡：他们让 14.4 千电子伏的 γ 射线沿哈佛塔的 22.5 米竖直上下来回，用穆斯堡尔效应压掉热运动与多普勒噪声，测得约 2.5×10⁻¹⁵ 的频率移动，与预言在百分之十内相符，后续复测把不确定度压到百分之一量级。天体上数量级立刻抬升：太阳表面的钟每天比远处慢约 0.2 秒，白矮星在千分之一量级，中子星（半径十来千米、质量一到两倍太阳）表面钟的节拍只剩远处的约四分之三，接近黑洞视界的钟几乎停摆。在导航卫星上这是每天的事务：GPS 卫星在约两万千米的轨道上，因离地心远、引力势更高，它的钟每天比地面快约 45 微秒；与「时间膨胀」的速度项每天慢约 7 微秒相抵，净快 38 微秒，出厂前就得先把频率偏掉，否则定位误差每天累积十来公里——完整账目见「原子钟与秒的定义」条。科幻里的“天上一日、地上一年”在本条的尺度上绝不可能：地球上的引力差只是纳秒级，要挣到成倍的时间差必须深入强场，而那里的潮汐与辐射先要人命（见「黑洞」与「恒星的一生」两条）。今天这只钟灵敏到能用厘米称高度：光钟的不确定度进入 10⁻¹⁸，抬起约一厘米就能看见频率变化，反过来用一组钟即可绘出重力势地图，用于监测地下水、岩浆活动与地壳形变，这是「数量级估算」条所说把极小量变成的可测信号。两处易错：一、引力是让低处的钟走得慢，不是让它走得乱；二、它与速度造成的钟慢是两笔独立的账，符号可以相反，卫星与环球飞行实验必须两笔一起结算。",
            en: "The stronger the gravity, the slower clocks run — gravitational time dilation. In weak fields the fractional rate difference equals the difference in gravitational potential divided by c², which near the ground simplifies to Δf/f=gh/c², with g the gravitational field, h the height difference and c the speed of light: one metre of height gives about 1.1×10⁻¹⁶, roughly 3 nanoseconds a year, so the gap between a person's head and feet never fills a microsecond across a whole lifetime. The exact statement comes from the Schwarzschild solution of general relativity: near a mass M a clock's pace is reduced by √(1−2GM/(rc²)), slower the closer you sit, and at r=2GM/c² — the Schwarzschild radius — the factor reaches zero, which is the event horizon described in the entry on black holes, where a distant watcher sees a falling clock freeze and its light redden without end. Pound and Rebka first measured it on the ground in 1960, sending 14.4 keV gamma rays up and down a 22.5 m tower and using the Mössbauer effect to strip Doppler noise: about 2.5×10⁻¹⁵ in fractional shift, agreeing with prediction within ten per cent, later refined to about one per cent. Bodies in space lift the scale at once: a clock on the Sun's surface loses roughly 0.2 seconds a day against a distant one, a white dwarf is in the parts-per-thousand range, a neutron star of ten-odd kilometres and one to two solar masses keeps only about three quarters of the faraway beat, and near a horizon clocks all but stop. For navigation satellites this is routine bookkeeping: GPS orbits at some twenty thousand kilometres, sits higher in the potential and gains about 45 microseconds a day, the velocity term of time dilation takes back about 7, and the net 38 must be built into the frequency before launch or position error grows ten-odd kilometres daily, as the entry on atomic clocks and the definition of the second records. Science-fiction's “a day aloft, a year below” is impossible at Earth's scale — nanoseconds at best; earning day-versus-year gaps demands strong fields, where tides and radiation kill you first. Today the clock is sensitive enough to weigh height in centimetres: optical clocks reach 10⁻¹⁸, so lifting one is visible, and a network of clocks now maps gravitational potential over aquifers, magma and deforming crust. Two slips: gravity slows lower clocks rather than disordering them; and it is a separate account from velocity-based dilation, with the opposite sign possible, so satellites and round-the-world flights must settle both lines together.",
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
            zh: "这条关系讲的是：动得越快，再加速越难。今天的准确表述是动量按 p=γmv 增长，式中 p 为动量、m 为不变质量（静质量）、v 为速率、γ=1/√(1−v²/c²) 随速度升高而发散；因为 γ 趋于无穷，把任何有质量的物体推到光速需要无穷能量，光速因此成为不可逾越的门槛。老教材爱写“质量随速度增大”，把 γm 称为运动质量，算数不错却容易误导：它让人以为物体里的物质变多了，还会引出纵向与横向不同的“有效质量”——F=ma 的形状在此不再成立，正确的写法是 F=dp/dt，力与加速度甚至可以不同向。与「质能方程」条合起来可写成能量—动量关系 E²=(pc)²+(mc²)²：静能 mc² 是速度为零时的能量；光子静质量为零却仍有动量 p=E/c，故光能推动他物——彗尾背向太阳、光压与太阳帆都靠它（见「光子」条）。代价有多大，看两台机器：把电子推到 104 GeV 时 γ 约二十万，电子只比光速慢约 3.6 毫米每秒；7 TeV 的质子 γ 约 7460，比光速慢约 2.7 米每秒——再喂能量，速度几乎不动，全部涨在 γ 上。这直接决定机器的设计：回旋加速器若固定交变电压的频率，粒子一进相对论区就会与加速电场失步，必须同步调频或改换磁场与轨道结构，口径见「洛伦兹力」「粒子加速器」与「交变电流」三条。速度也不能简单相加：同向的两段速度 u′ 与 v 合成 u=(u′+v)/(1+u′v/c²)，0.5c 加 0.5c 得 0.8c，0.9c 加 0.9c 得 0.994c，永远够不到 c，这是洛伦兹变换（见「狭义相对论基本原理」条）的直接后果。菲佐 1851 年测流动水中的光速，得到的“拖曳系数”恰为 1−1/n²，n 为水的折射率约 1.33，系数约 0.44，正是上式的一阶近似（口径见「光的折射」条）——一场十九世纪的水与光实验因此成了相对论的前注。三点易错：一、“越接近光速越难推”涨的是能量与动量，不是物体能装下更多物质；二、加速器里的电子越跑越“钝”并非因为阻力，真空中没有「摩擦力」可谈，这是时空给动量定的规矩；三、本条与「时间膨胀」「长度收缩」同出一个 γ，三式连用才不自相矛盾，例如算束流寿命时必须一起结算。它也解释了一个常见错觉：为什么宇宙射线里的质子能穿过整个星系而不停下——不是因为推力大，而是因为对它们自己而言，沿途的路程被「长度收缩」条的那条式子缩短了。",
            en: "This relation says the faster you go, the harder it is to accelerate further. Today the precise form is that momentum grows as p=γmv, with p the momentum, m the invariant (rest) mass, v the speed and γ=1/√(1−v²/c²) diverging as v approaches c; because γ runs to infinity, pushing any massive body to light speed would take infinite energy, and that is why c is a threshold rather than a record. Older textbooks speak of “mass increasing with speed” and call γm the relativistic mass; the arithmetic is fine but the language misleads, hinting that the body contains more stuff and spawning different “effective masses” lengthwise and crosswise. In truth F=ma no longer holds in that shape — the correct statement is F=dp/dt, and force and acceleration need not even point the same way. Combined with mass–energy equivalence one writes E²=(pc)²+(mc²)²: mc² is the energy at zero speed, while a photon, massless, still carries momentum p=E/c and so can push things, which is why comet tails point away from the Sun and why light sails work, as the entry on the photon notes. How steep the price is, two machines show: electrons at 104 GeV have γ near two hundred thousand and travel only some 3.6 millimetres per second below light speed; 7 TeV protons, γ about 7460, lag by roughly 2.7 metres per second — feed in more energy and the speed barely moves while γ climbs. This dictates design: a cyclotron with fixed-frequency voltage loses synchronism once particles turn relativistic, so frequency must track γ or magnet and orbit geometry change, as the entries on the Lorentz force, particle accelerators and alternating current explain. Velocities do not add naively either: collinear u′ and v combine as u=(u′+v)/(1+u′v/c²), so 0.5c plus 0.5c is 0.8c and 0.9c plus 0.9c is 0.994c, forever short of c — a direct read-off from the Lorentz transformation. Fizeau's 1851 measurement of light in flowing water returned a dragging coefficient of exactly 1−1/n², about 0.44 for water with refractive index 1.33, the first-order form of that same addition law, as the entry on refraction records; a nineteenth-century experiment with water and light thereby became a preface to relativity. Three slips: nearing light speed raises energy and momentum, not the amount of matter; electrons in storage rings grow “sluggish” with no friction anywhere, since it is spacetime's rule for momentum, not a drag; and this relation shares its γ with time dilation and length contraction, so beam lifetimes and cosmic-ray reach must be computed with all three together — which is also why a proton from deep space can cross a galaxy in its own account, the journey having contracted.",
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
            zh: "原子里那点正电荷到底怎么摆，一度全靠猜。汤姆孙的枣糕模型把电子嵌在一团均匀正电荷里，可这撑不过一束 α 粒子。1909 年盖革与马斯登在卢瑟福指导下用 α 轰金箔，发现绝大多数直穿而过、约每八千个才有一个偏过九十度——卢瑟福后来说这“就像你用十五英寸炮弹轰一张纸，炮弹却弹回来”。要出现这种大角度反弹，正电荷就不能铺满整个原子，只能集中在中心一个极小极重的核里，于是 1911 年有了核式模型：电子绕核运转，原子内部几乎全是空的。有多空？把一颗 5.5 兆电子伏的 α 正对金核轰去，靠库仑斥力最靠近到约 41 飞米（2×79×1.44/5.5），而金核半径按 R=1.2A^(1/3) 只约 7 飞米，金原子半径却约 0.14 纳米，核与原子的线度之比约一万四千比一；把核放大到一粒细沙，最近的电子也在几十米开外。空到这个程度，恰好解释了 α 为何多半直穿。但纯经典的绕核电子要不断辐射能量、螺旋坠核，原子活不过一微秒——这一步把量子化逼了出来。1913 年玻尔给氢原子立了三条假设：电子只能在某些分立轨道上稳定运动而不辐射、角动量按 ℏ 整数倍量子化、跃迁时才吸收或放出一份光子。基态轨道半径 0.529 埃、电子速率约 2.19×10⁶ 米每秒（恰是光速除以 137），这两个数从此成了原子尺度的标尺。核式模型负责讲清“核在哪、有多大”，能级的细账交给「能级与氢原子光谱」，实验经过见「卢瑟福金箔实验」，人物小传在「欧内斯特·卢瑟福」与「尼尔斯·玻尔」；而这种抓住主要矛盾、忽略次要因素的简化，正是「理想模型」的一条样板。",
            en: "How the atom's positive charge is arranged was once pure guesswork. Thomson's plum-pudding model embedded electrons in a uniform ball of positive charge, but that could not survive a beam of alpha particles. In 1909 Geiger and Marsden, under Rutherford, fired alpha particles at gold foil and found that almost all passed straight through while roughly one in eight thousand scattered past ninety degrees—Rutherford later said it was 'like firing a fifteen-inch shell at tissue paper and having it come back.' For such large-angle rebounds the positive charge cannot be spread over the whole atom; it must sit concentrated in a tiny, heavy central nucleus, giving the nuclear model of 1911: electrons orbit a core and the atom is nearly all empty. How empty? Send a 5.5 MeV alpha head-on at a gold nucleus and Coulomb repulsion brings it no closer than about 41 fm (2×79×1.44/5.5), yet the gold nucleus radius from R=1.2A^(1/3) is only about 7 fm while the gold atom spans some 0.14 nm—nucleus to atom is about 1 to 14,000 in linear size; magnify the nucleus to a grain of sand and the nearest electron is tens of metres away. That emptiness is exactly why most alphas fly straight through. But a classically orbiting electron would radiate energy and spiral into the nucleus in well under a microsecond, forcing quantisation. Bohr's 1913 postulates for hydrogen were three: electrons stand stable only in certain discrete orbits without radiating, angular momentum is quantised in integer multiples of ℏ, and a photon is absorbed or emitted only on a jump. The ground orbit radius 0.529 Å and electron speed 2.19×10⁶ m/s (light speed divided by 137) became the yardsticks of atomic scale. The nuclear model answers 'where and how big is the nucleus'; the level accounting is left to Energy Levels & Hydrogen Spectra, the experiment to Rutherford's Gold-Foil Experiment, and the lives to Ernest Rutherford and Niels Bohr, while this grab-the-main-contradiction simplification is a textbook case of the Ideal Model.",
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
            zh: "氢原子发光不是一道连续的彩虹，而是一根根锐利的谱线，经典物理解释不了，玻尔用量子化的能级一刀解开。核心公式是 hν=E高−E低：跃迁放出的光子能量恰等于两个能级之差，频率由差值定，而不由“电子本来跑多快”定。氢的能级 E_n=−13.6/n² 电子伏，n=1 基态 −13.6、n=2 是 −3.4、n=3 是 −1.51、n=4 是 −0.85，越往外越密、到 n=∞ 归零就是电离。跃迁落到不同的终态分属不同线系：落回 n=2 是可见光的巴耳末系（Hα 656.5、Hβ 486.3、Hγ 434.2、Hδ 410.3 纳米），落回 n=1 是紫外的赖曼系（首线 121.6、系限 91.2 纳米），落回 n=3 是红外的帕邢系（首线 1876 纳米）。所有谱线都被一条里德伯公式 1/λ=R(1/m²−1/n²) 一网打尽，R=1.097×10⁷ 每米——1885 年巴耳末先凑出经验式，1913 年玻尔才给出理论解释。能级分立不是假设而是实测：1914 年弗兰克与赫兹用电子轰汞蒸气，发现电子只有把能量凑够 4.9 电子伏才突然整份交出、把原子“点亮”，电流—电压曲线每隔 4.9 伏出现一个谷，直接描出了分立的能级（见「弗兰克-赫兹实验」）。这也解释了同种原子为何发同种“指纹”谱线，光谱分析据此能在星光里认出地球上的元素。算跃迁最常见的错有三处：丢掉能级差的正负号（吸收要升、辐射要降）、把 −13.6/n 而非平方代入、以及把实物粒子碰撞与光子激发混为一谈——光子必须“恰好等于”某能级差才会被吸收，而电子碰撞只需动能不小于差值即可。至于这些量子数背后更深、把“轨道”换成“概率”的图景，得等「波粒二象性」与量子力学登场；能级的能量单位换算归「普朗克常数」与「光子」。",
            en: "Hydrogen does not glow as a continuous rainbow but as a set of razor-sharp spectral lines, which classical physics could not explain and Bohr cut open with quantised levels. The core formula is hν=E_high−E_low: the emitted photon's energy equals exactly the gap between two levels, so the frequency is set by the difference, not by 'how fast the electron was going'. Hydrogen's levels are E_n=−13.6/n² eV—−13.6 at n=1, −3.4 at n=2, −1.51 at n=3, −0.85 at n=4—cramming closer together outward and reaching zero at n=∞, which is ionisation. Transitions landing on different final levels form distinct series: down to n=2 is the visible Balmer series (Hα 656.5, Hβ 486.3, Hγ 434.2, Hδ 410.3 nm), down to n=1 the ultraviolet Lyman series (first line 121.6, series limit 91.2 nm), down to n=3 the infrared Paschen series (first line 1876 nm). Every line obeys one Rydberg formula, 1/λ=R(1/m²−1/n²) with R=1.097×10⁷ per metre—Balmer fit it empirically in 1885 and Bohr explained it in 1913. Discrete levels are measured, not assumed: in 1914 Franck and Hertz bombarded mercury vapour with electrons and found an electron gives up its energy only in one lump once it reaches 4.9 eV, lighting the atom up whole; the current–voltage curve dips once every 4.9 eV, tracing the levels directly (see the Franck–Hertz Experiment). This also explains why one element always emits its own fingerprint lines, letting spectroscopy pick out terrestrial elements in starlight. Three slips dominate level problems: dropping the sign of the gap (absorption climbs, emission falls), using −13.6/n instead of over n², and confusing a particle collision with photon absorption—a photon must match a gap exactly to be taken, while a colliding electron needs only kinetic energy at least equal to it. The deeper picture that trades 'orbit' for 'probability' waits in Wave–Particle Duality; the energy units belong to Planck's Constant and Photon.",
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
            zh: "光既是波又是粒子，实物粒子也带波长——这不是诗意的比喻，而是两头都有硬邦邦的实验。先看粒子这一头。光电效应里光打到金属表面打出电子，可经典波动说预言不了几个事实：能否打出电子只看频率有没有迈过门槛、与光强无关，光强只决定打出的个数，而且响应是瞬时的。爱因斯坦 1905 年照普朗克的量子说办，把光本身切成一份份光子、能量 E=hν，电子吃下一份光子、扣掉挣脱金属的逸出功 W 才剩下动能：hν=W+½mv²。门槛频率 ν₀=W/h，钠逸出功 2.28 电子伏对应红限约 544 纳米、铯 2.14 电子伏约 579 纳米——这正是“看频率不看强度”的模样（实验细节见「光电效应实验」，人物见「阿尔伯特·爱因斯坦」）。康普顿散射再补一刀：X 射线被电子弹回后波长变长，反向时位移最大 2λc=4.85 皮米（λc=2.42 皮米），只有把光子当成带动量 p=h/λ 的粒子、按碰撞来守恒计算才对得上。再看波动这一头。德布罗意 1924 年反问：既然波能像粒子，粒子能不能像波？他给出物质波 λ=h/p。电子穿过晶体确实衍射，戴维孙与革末、以及英国的 G.P.汤姆孙各自证实（见「电子衍射实验」）；慢中子 0.025 电子伏波长 0.18 纳米、100 伏加速的电子波长 0.123 纳米，都跟晶格间距同量级，所以能拿来探结构。那为什么看不见棒球的波动？把它代进去：0.1 千克、30 米每秒的球，λ 约 2.2×10⁻³⁴ 米，比原子核还小约十九个数量级，任何仪器都测不出——这就是“宏观物体波动性可忽略”的定量理由，不是没有，而是小得离谱。真正收束这一切的是概率诠释与不确定性：那列波不是实体在抖动，而是某处出现的概率幅；位置测得越准动量就越模糊，Δx·Δp≥ℏ/2，“轨道”一词在原子尺度不再精确（见「维尔纳·海森堡」「埃尔温·薛定谔」）。术语对照归「波粒二象性」，能量与频率的换算归「普朗克常数」与「光子」。",
            en: "Light is both wave and particle, and matter carries a wavelength too—not a poetic metaphor but a claim with hard experiments on both sides. Start with the particle side. In the photoelectric effect light knocks electrons off a metal, yet classical wave theory cannot predict the facts: whether an electron comes out depends only on whether the frequency clears a threshold and not on intensity, intensity only sets how many come out, and the response is instantaneous. In 1905 Einstein took Planck's quantum literally, slicing light itself into photons of energy E=hν; an electron swallows one photon, pays the work function W to escape, and keeps the rest as kinetic energy: hν=W+½mv². The threshold ν₀=W/h means sodium's 2.28 eV maps to a red limit near 544 nm and caesium's 2.14 eV to about 579 nm—exactly the frequency-not-intensity behaviour (details in the Photoelectric Experiment; the man in Albert Einstein). Compton scattering drives it home: X-rays bounced off electrons come back longer in wavelength, by up to 2λc=4.85 pm at 180° (λc=2.42 pm), matched only if the photon is treated as a particle of momentum p=h/λ and the collision conserved. Now the wave side. In 1924 de Broglie asked back: if waves act like particles, can particles act like waves? He gave the matter wave λ=h/p. Electrons diffract through crystals, confirmed independently by Davisson–Germer and by G.P. Thomson in Britain (see the Electron Diffraction Experiment); a 0.025 eV neutron has λ=0.18 nm and a 100 V electron 0.123 nm, both on the scale of lattice spacing, so they probe structure. Why never see a baseball wave? Put it in: a 0.1 kg ball at 30 m/s gives λ≈2.2×10⁻³⁴ m, about nineteen orders smaller than a nucleus and beyond any instrument—so 'macroscopic wave nature is negligible' is a quantitative reason, not absence, just absurdly small. What finally ties it together is the probability interpretation and uncertainty: the wave is not a thing vibrating but a probability amplitude, and the more precisely position is known the more momentum blurs, Δx·Δp≥ℏ/2, so 'orbit' stops being exact at atomic scale (see Werner Heisenberg and Erwin Schrödinger). The vocabulary sits in Wave–Particle Duality, the energy–frequency conversion in Planck's Constant and Photon.",
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
            zh: "原子核是质子和中子（合称核子）挤成的致密小球，记账用符号 ᴬ_ZX：Z 是质子数也就是电荷数、决定“这是哪种元素”，A 是质量数即质子加中子，中子数 N=A−Z。质子数相同、中子数不同的原子化学性质几乎一样、只是质量不同，互为同位素——氢的三兄弟氕（一个质子、零中子）、氘（一加一）、氚（一加二）最典型。中子来得晚：质子 1919 年被卢瑟福“看见”，中子却直到 1932 年才由查德威克确认——用 α 轰铍放出的那种穿透力强、又不带电的射线，靠它把石蜡里的氢撞出来再测氢的能量，才断定那是一种质量近乎质子的中性粒子（见「查德威克发现中子」；同期费米一伙人正在做慢中子）。同位素的存在最早靠质谱仪实测：阿斯顿拿它给氖拍出“两条质量线”，给“同元素不同质量”落了铁证（见「阿斯顿质谱仪与同位素实测」）。这里有个高频错点：化学里的“同素异形体”（金刚石与石墨、O₂ 与 O₃）是同一元素的不同单质排布，跟“同位素”完全两码事——前者差在分子或晶体结构、后者差在核里的中子数，背混的人极多。核有多小多重？半径 R≈1.2A^(1/3) 飞米，金（A 约 197）约 7 飞米；把这一核的质量摊到那么小的体积上，核物质密度达约 2.3×10¹⁷ 千克每立方米，即每一立方厘米约两亿三千万吨，一茶匙核物质就近万吨级——中子星正是把这种密度放大到天体尺度的产物。核子数还牵着稳定与放射性：中子质子比失衡的核往往不稳，那是「放射性与半衰期」的话题；把它们拆开要付的能量见「核力与结合能」。日常用得上的同位素例子极多，从测年到医学示踪，见「核能的利用」与「磁共振成像」。",
            en: "The nucleus is a dense ball of protons and neutrons (nucleons), booked as ᴬ_ZX: Z is the proton count, the charge, which fixes which element it is; A is the mass number, protons plus neutrons, so the neutron number is N=A−Z. Atoms with the same Z but different N are almost identical chemically and differ only in mass—they are isotopes, with hydrogen's three brothers protium (one proton, no neutron), deuterium (one-one) and tritium (one-two) the clearest case. The neutron came late: the proton was 'seen' by Rutherford in 1919, but the neutron was confirmed only by Chadwick in 1932—the penetrating, chargeless radiation from alpha-bombarded beryllium was pinned down by watching it knock hydrogen out of paraffin and measuring that hydrogen, proving a neutral particle about as heavy as a proton (see Chadwick's Discovery of the Neutron; Fermi's group was doing slow neutrons in the same years). Isotopes were first measured with the mass spectrograph: Aston photographed neon as 'two mass lines', hard evidence of same-element, different-mass atoms (see Aston's Mass Spectrograph & Isotope Measurement). A common slip to guard: chemistry's allotropes (diamond and graphite, O₂ and O₃) are different structural forms of one element and have nothing to do with isotopes—the former differ in molecular or crystal structure, the latter in the neutron count in the nucleus. How small and heavy is a nucleus? Radius R≈1.2A^(1/3) fm, gold (A about 197) about 7 fm; spread one nucleus's mass over that volume and nuclear matter hits about 2.3×10¹⁷ kg per cubic metre, some 230 million tonnes per cubic centimetre—a teaspoon weighs thousands of tonnes—and a neutron star is this density scaled up to an astronomical body. The nucleon counts also steer stability and radioactivity: a lopsided neutron-to-proton ratio tends to make an unstable nucleus, a topic for Radioactivity & Half-life, while the energy to pull them apart is in Nuclear Force & Binding Energy; practical isotopes from dating to medical tracers sit in Nuclear Energy and MRI.",
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
            zh: "有些原子核自己待不住，会自发吐出货、变成别的核，这就是放射线。1896 年贝克勒尔在铀盐上头一次撞见它，随后居里夫妇从成吨沥青矿渣里炼出钋和镭、“放射性”一词也由居里夫人定下（人物见「玛丽·居里」）。吐出的三种东西在电场里当场分家（见「放射性与半衰期」那条配图）：α 是氦核 ⁴₂He，带两单位正电、质量大，电离本领最强却穿透最弱，一张纸或几厘米空气就能挡住；β 是高速电子 ⁰₋₁e，穿得远些、要几毫米铝板；γ 是高能光子，不带电、穿透最强，得用厚铅或混凝土。三者偏转方向与强弱的差异正是判据。衰变方程只守恒两样——质量数 A 与电荷数 Z：放一个 α，A 减 4、Z 减 2，元素往下挪两格；β⁻ 衰变是核里一个中子变成质子加电子，Z 加一而 A 不变。半衰期是统计规律，指大量核里一半衰变掉所需的时间，对“单个原子何时衰”毫无预测力，也不随温度、压强或化成什么化合物而改变——常被误当可控。量级随手可得：碳-14 半衰期 5730 年，活物体内每克碳的 ¹⁴C 活度约 0.231 贝可，死后不再补充、按 5730 年减半，考古据此测年；氚 12.3 年，存放 20 年只剩约 32%，聚变堆的燃料因此得现产；钚-238 半衰期 87.7 年、每克放热约 0.57 瓦，正是航天器核电池的热源；氟-18 只有 110 分钟，注射用于 PET 的示踪剂三小时后掉到约 32%，所以回旋加速器得贴着医院建（见「粒子加速器」「云室与正电子的发现」）。辐射剂量是另一笔账：一次胸部 CT 约 10 毫西弗、相当于数年天然本底，“谈核色变”与“满不在乎”都不对，分寸见「核能的利用」。天然放射性的成因是不稳定核，归「原子核与同位素」与「核力与结合能」；人工放射性与正电子见实验条。",
            en: "Some nuclei cannot sit still: they spontaneously eject something and turn into another nucleus—radioactivity. Becquerel first stumbled on it in uranium salts in 1896, then the Curies refined polonium and radium out of tonnes of pitchblende residue and the word 'radioactivity' came from Madame Curie (see Marie Curie). The three emissions separate on the spot in an electric field (see the figure with Radioactivity & Half-life): α is a helium nucleus ⁴₂He, doubly positive and heavy, the strongest ioniser but the weakest penetrator—a sheet of paper or a few centimetres of air stops it; β is a fast electron ⁰₋₁e, needing a few millimetres of aluminium; γ is a high-energy photon, chargeless and the most penetrating, held only by thick lead or concrete. Their differing deflection and penetration are the very tests. A decay equation conserves only two things—mass number A and charge Z: emit one α and A drops 4, Z drops 2, moving the element two places down; in β⁻ decay a neutron inside turns into a proton plus an electron, so Z rises by one while A is unchanged. Half-life is a statistical law, the time for half of a large sample to decay, with no power to say when one atom goes, and it does not shift with temperature, pressure or what compound the atom sits in—often mistaken for something controllable. Orders of magnitude come cheaply: carbon-14 has a 5730-year half-life and living tissue carries about 0.231 becquerel of ¹⁴C per gram of carbon, so once intake stops on death the count halves every 5730 years and archaeology dates accordingly; tritium at 12.3 years leaves only about 32% after 20 years, so a fusion reactor must breed its fuel; plutonium-238 at 87.7 years and about 0.57 watt per gram is the heat source of spacecraft nuclear batteries; fluorine-18 lasts only 110 minutes, its PET tracer down to about 32% after three hours, which is why the cyclotron must sit beside the hospital (see Particle Accelerator and Cloud Chamber & the Positron). Dose is a separate ledger: a chest CT is about 10 millisieverts, several years of natural background, so neither 'nuclear phobia' nor 'carelessness' is right—see Nuclear Energy. The cause of natural radioactivity is the unstable nucleus, handled in Nucleus & Isotopes and Nuclear Force & Binding Energy; artificial radioactivity and the positron are in the experiment entries.",
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
            zh: "把原子核拆开要费能量，这能量从哪来？答案是把“质量”和“能量”算成一回事。核的质量总比它所有核子单独质量之和略小，少的那块叫质量亏损，按「质能方程」E=mc² 折成能量放了出来——每亏损一个原子质量单位约对应 931.5 兆电子伏。亏损越大、要拆开的结合能越大，可比较不同的核得公平地“除以核子数”，这就是比结合能（每个核子的结合能），它才是核稳定性的真正标尺。曲线两头低、中间高，在铁-56 附近登顶约每核子 8.8 兆电子伏，故铁峰一带最稳。举两个硬数：氦-4（α）极稳，质量亏损 0.030376 原子质量单位、结合能 28.3 兆电子伏、每核子 7.07；氘核却只有 2.224 兆电子伏、每核子约 1.1，松散得多，这解释了为什么核反应一旦凑出 α 粒子就爱把它往外吐。曲线的斜率就是能源的方向：轻核往中间聚（聚变）每核子多绑住一大截，重核往中间裂（裂变）每核子也多绑一点，两边都朝铁峰滑、都放能。铀-235 每核子约 7.6 兆电子伏，裂成两块中等核升到约 8.5，一份差攒成约 200 兆电子伏的总账；氘氚聚变每核子从约 1.1 跳到氦-4 的 7.07，单位质量释放比裂变更猛。所以“重核裂变、轻核聚变都产能”不是巧合，而是同一张曲线的两段，分别展开在「核裂变与链式反应」与「核聚变」。要把这套账算通，还得认清核力本身：它是短程强吸引，两三飞米内远胜库仑斥力、超过约几飞米就骤停，正因短程每个核子只跟近邻结合（饱和性），比结合能才近似常数、液滴模型才好用；而质子间的电斥力是长程的，核越大攒的斥力越猛，重核因此趋向不稳定乃至自发裂变。质量为何能变成能量、守恒到底守恒什么，回「质能方程」「狭义相对论基本原理」；这套能量在工程上如何兑现，见「核能的利用」。",
            en: "Where does the energy to pull a nucleus apart come from? From treating mass and energy as one thing. A nucleus always weighs a hair less than all its nucleons do separately; that shortfall is the mass defect, cashed out as binding energy via E=mc² (see Mass–Energy Equivalence)—each atomic mass unit lost is worth about 931.5 MeV. A bigger defect means a bigger binding energy, but comparing different nuclei fairly requires dividing by the nucleon count, giving binding energy per nucleon, the true ruler of stability. Its curve runs low at both ends and high in the middle, topping out near iron-56 at about 8.8 MeV per nucleon, so the iron peak is the most stable. Two hard numbers: helium-4 (the alpha) is very tight—mass defect 0.030376 u, binding energy 28.3 MeV, 7.07 per nucleon—while the deuteron has only 2.224 MeV, about 1.1 per nucleon, far looser, which is why reactions that can assemble an alpha happily spit it out. The slope of that curve is the direction of power: fusing light nuclei toward the middle gains a lot per nucleon, splitting heavy nuclei toward the middle gains a little more each, both sliding toward iron and both releasing energy. Uranium-235 sits near 7.6 MeV per nucleon and its fragments near 8.5, the gap tallying to about 200 MeV per fission; deuterium–tritium fusion leaps from about 1.1 to helium-4's 7.07, hitting harder per mass than fission. So 'heavy nuclei fusing and light nuclei fusing both yield power' is not a coincidence but two spans of one curve, worked out in Fission & Chain Reaction and Nuclear Fusion. To close the books you must also see the nuclear force itself: it is a short-range strong attraction, overwhelming Coulomb repulsion within two to three femtometres and dying off beyond a few, so being short-ranged each nucleon binds only its neighbours (saturation), which is why binding per nucleon is near-constant and the liquid-drop model works; the proton–proton electric repulsion, by contrast, is long-ranged and piles up with size, pushing heavy nuclei toward instability and even spontaneous fission. Why mass can become energy and what is really conserved returns to Mass–Energy Equivalence and Special Relativity; how this energy is spent is under Nuclear Energy.",
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
            zh: "重核吞下一个中子就断成两截、甩出能量和新中子，新中子再去打断下一个——这就是链式反应。1938 年哈恩与斯特拉斯曼在化学产物里认出了钡，迈特纳与弗里施用液滴模型算清这是核真的裂了开，并顺手用「质能方程」报了能量账。一次铀-235 裂变约释放 200 兆电子伏、平均抛出 2 到 3 个中子、亏损约 0.2 个原子质量单位。单次听着小，可一乘阿伏伽德罗常数就吓人：1 千克铀-235 全裂约 8.2×10¹³ 焦耳、只亏掉约 0.91 克（占千分之零点九一），却抵得上近二十万吨 TNT；广岛“小男孩”约 1.5 万吨当量、真正裂变的铀不到 1 千克（约 0.77 千克）、亏掉的质量约 0.70 克——“原子的能量”就藏在这零点几克里。链能不能自持，看中子跑掉的有没有比产生的多，这由临界质量说了算：燃料够纯够密、越过临界就指数暴涨（武器），掺入慢化与控制让每代恰好留一个中子（反应堆）。慢化剂要把裂变飞出的快中子（约 2 兆电子伏）降到 0.025 电子伏的热中子才好再被铀-235 俘获——轻水约二十次碰撞就够、石墨要上百一十五次，故堆型的分水岭就在“用什么慢化”；镉或硼的控制棒吞中子来调反应率，事故时全插进去“急停”。和平利用的起点是 1942 年费米在芝加哥一个球场看台下垒出的第一座反应堆 CP-1（见「恩里科·费米」）。再补一个反直觉的地质事实：二十亿年前天然铀里铀-235 的丰度约 3.78%（今天只剩 0.72%，因它半衰期短、消耗得快），浓到在某些铀矿里自己点燃了天然核反应堆——加蓬奥克洛就是证据，大自然早于人类造过堆。铀-235 之外可裂变的钚-239 靠铀-238 俘中子转化而来，牵出增殖与核燃料循环。浓缩、能量账的工程口径、快中子堆与核废料都归「核能的利用」；裂变碎片的放射性即「放射性与半衰期」的来源之一；那 200 兆电子伏为何存在，回到「核力与结合能」的曲线。",
            en: "A heavy nucleus swallows a neutron, splits into two, and throws out energy and fresh neutrons that split the next ones— the chain reaction. In 1938 Hahn and Strassmann identified barium among the chemical products, and Meitner and Frisch, with the liquid-drop model, showed the nucleus had truly split and cashed the energy through E=mc² (see Mass–Energy Equivalence). One U-235 fission releases about 200 MeV, gives off 2–3 neutrons on average, and loses about 0.2 atomic mass units. A single event sounds tiny until you multiply by Avogadro's number: 1 kg of U-235 fully fissioned yields about 8.2×10¹³ J, having burned off only about 0.91 g (nine ten-thousandths), yet equals nearly 200 kilotons of TNT; Hiroshima's 'Little Boy' was about 15 kilotons, with under 1 kg (roughly 0.77 kg) of uranium actually fissioning and about 0.70 g of mass lost—the 'power of the atom' hides in that fraction of a gram. Whether the chain self-sustains depends on whether neutrons escape faster than they are made, governed by the critical mass: fuel pure and dense enough to pass critical explodes exponentially (a weapon), while moderation and control keep exactly one neutron per generation (a reactor). A moderator slows the ~2 MeV fast neutrons of fission down to 0.025 eV thermal neutrons that U-235 readily captures—light water needs about twenty collisions, graphite about one hundred and fifteen—so reactor types divide on 'what moderates'; cadmium or boron control rods absorb neutrons to tune the rate and slam fully in for a scram. Peaceful use began in 1942 when Fermi built the first reactor, CP-1, under a Chicago squash-court stand (see Enrico Fermi). A counterintuitive geological fact: two billion years ago natural uranium held about 3.78% U-235 (only 0.72% today, since it decays faster), rich enough that some ore bodies lit themselves into natural reactors—Oklo in Gabon is the proof, nature building a pile long before humans. Beyond U-235, the fissionable plutonium-239 is bred from U-238 capturing neutrons, opening breeding and the fuel cycle. Enrichment, the engineering energy ledger, fast breeder reactors and waste all sit under Nuclear Energy; the radioactivity of the fragments is one source behind Radioactivity & Half-life, and why that 200 MeV exists returns to the curve in Nuclear Force & Binding Energy.",
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
            zh: "把两个轻核硬塞到一起就是聚变，可核都带正电、隔着几飞米时库仑斥力大得离谱，得让它们靠得足够近、强核力才接管——这要上亿度的高温给粒子足够快的速度。太阳正干这事：核心约 1500 万度、压强极高，靠质子—质子链分几步把四个氢挤成一个氦，净亏损约 0.0287 个原子质量单位、放 26.7 兆电子伏，同时甩出正电子和中微子——每平方米每秒约有 6.4×10¹⁴ 个太阳中微子穿过地球，几乎不与物质作用、却实实在在数得清。人类更好点着的是氘氚反应：氘加氚生成氦-4 加一个中子，放 17.6 兆电子伏，其中约 3.5 兆给 α、14.1 兆给中子。按「核力与结合能」那条曲线算，氘氚每核子约 1.1 兆电子伏、产物氦-4 达 7.07，落差极大，所以单位质量聚变释放远超裂变：1 千克氘氚混合约 3.4×10¹⁴ 焦耳、抵八万吨 TNT 级，每核子约 3.5 兆电子伏对铀的约 0.85。代价是“约束”二字——要么用强磁场把上亿度的等离子体悬空兜住（磁约束，托卡马克），要么用激光在一瞬内爆一小丸燃料（惯性约束）。中国 EAST 全超导托卡马克做到约 1 亿度、403 秒长脉冲高约束运行，国际 ITER 正在建、瞄准净能量增益；氢弹则根本不做约束，靠一颗裂变原子弹当引信瞬间点火、完全不可控。聚变的招牌是燃料近乎取之不尽：一升海水里的氘约 0.017 克，若全部聚变释放折合约 460 升汽油，而产物没有高放长寿命废料、也没有链式失控之虞。难点也实在：上亿度下没有任何材料能触碰等离子体、能量怎么稳住、氚如何自给。燃料之丰、太阳如何靠聚变过完一生并走向终结见「恒星的一生」，反应堆工程与“人造太阳”路线见「核能的利用」，被约束的那锅上亿度等离子体则是「温度与温标」「分子动理论」的极端版。",
            en: "Forcing two light nuclei together is fusion, but both are positive and at a few femtometres apart the Coulomb repulsion is enormous, so they must be brought close enough for the strong force to take over—demanding temperatures of a hundred million degrees to give the particles enough speed. The Sun does exactly this: at a core of about 15 million degrees and immense pressure, the proton–proton chain squeezes four hydrogens into one helium over several steps, netting a loss of about 0.0287 atomic mass units and 26.7 MeV while shedding positrons and neutrinos—some 6.4×10¹⁴ solar neutrinos pass through each square metre of Earth every second, barely interacting yet genuinely countable. The reaction humans light more easily is deuterium–tritium: D+T gives helium-4 plus a neutron, releasing 17.6 MeV, about 3.5 MeV to the alpha and 14.1 to the neutron. Read against the curve in Nuclear Force & Binding Energy, D and T sit near 1.1 MeV per nucleon while the product helium-4 reaches 7.07, a huge drop, so fusion per unit mass far outruns fission: 1 kg of a D–T mix yields about 3.4×10¹⁴ J, an eighty-kiloton scale, about 3.5 MeV per nucleon against uranium's ~0.85. The price is the word 'confinement'—either suspend a hundred-million-degree plasma in a strong magnetic field (magnetic confinement, the tokamak) or implode a tiny fuel pellet with lasers in an instant (inertial confinement). China's superconducting EAST tokamak has reached roughly 100 million degrees for a 403-second high-confinement pulse, and the international ITER is being built toward net energy gain; the hydrogen bomb, by contrast, confines nothing, igniting instantly on a fission primary and wholly uncontrolled. Fusion's selling point is near-limitless fuel: the deuterium in one litre of seawater, about 0.017 g, if fully fused equals roughly 460 litres of petrol, and the products carry no long-lived high-level waste and no risk of a runaway chain. The hard parts are equally real: at those temperatures no material can touch the plasma, energy must be held steady, and tritium must be bred. Fuel abundance and how the Sun lives and dies on fusion are in Stellar Life Cycles; reactor engineering and the 'artificial sun' road are in Nuclear Energy; that confined hundred-million-degree plasma is the extreme form of Temperature & Scales and Kinetic Theory.",
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
            zh: "原子核之外再往下挖，物质的底牌写在标准模型里：两打基本粒子加几种“信使”。费米子（自旋为半整数、遵循泡利不相容，因此物质彼此不穿透）分夸克与轻子两族——夸克有上、下、粲、奇、顶、底六味，因“色禁闭”从不单独露面，只能三三成重子（质子=上上下、电荷恰凑成 +1）、二二成介子；轻子里有电子、μ 子、τ 子及各自对应的中微子，μ 子像“重一点的电子”、τ 子则更沉得多。把粒子黏在一起的是玻色子（整数自旋、专职传力）：光子传电磁、胶子传强、W 与 Z 传弱，2012 年确认的希格斯玻色子给别的粒子赋质量——希格斯本身约 125 吉电子伏、约 133 个质子那么沉，顶夸克更达 173 吉电子伏、约 185 个质子，比许多轻原子核还重。电磁与弱在更高能量下本是一体（弱电统一），四基本相互作用里电磁、强、弱都进了模型，唯独引力不在：两个质子之间引力只有电力的大约 8×10⁻³⁷ 倍，弱到量子引力至今没有实测。标准模型的预言准得惊人，电子磁矩算到小数点后十位仍对得上实验。可它远非终局：中微子竟有质量（模型原初设为零）、宇宙里看得见的普通物质只占约一成、剩下多是暗物质与暗能量，而模型拿不出一个候选暗物质粒子、引力也进不来——它更像一座盖到九成、缺了整层的新楼。宇称曾被认为在弱作用里守恒，1957 年吴健雄用低温钴-60 实验证明它不守恒（见「吴健雄的宇称不守恒实验」），说明连“对称”也得实验说了算。要找更底层的规矩，就靠「粒子加速器」把能量砸到一起、重演大爆炸后的极早期；反物质与正电子的发现见「云室与正电子的发现」，宇宙尺度的暗物质在「暗物质」与「宇宙膨胀与红移」，希格斯场的真空性质则牵进「量子计算」想模拟的那一类问题。",
            en: "Dig below the nucleus and matter's bottom card is written in the Standard Model: some two dozen fundamental particles plus a few messengers. Fermions (half-integer spin, obeying Pauli exclusion, which is why matter does not pass through matter) split into quarks and leptons—six flavoured quarks (up, down, charm, strange, top, bottom) that never appear alone because of colour confinement, binding as three-into baryons (the proton, up-up-down, charges summing to +1) or two-into mesons; and leptons—the electron, muon, tau and their neutrinos, the muon a 'heavier electron' and the tau heavier still. What glues particles is bosons (integer spin, force-carriers): the photon carries electromagnetism, gluons the strong force, W and Z the weak, and the Higgs boson confirmed in 2012 endows other particles with mass—the Higgs itself at about 125 GeV, some 133 protons heavy, and the top quark at 173 GeV, about 185 protons, heavier than many light nuclei. Electromagnetism and the weak force merge into one electroweak interaction at higher energy; of the four fundamental interactions the model takes in electromagnetic, strong and weak but not gravity: between two protons gravity is only about 8×10⁻³⁷ of the electric force, so feebly that quantum gravity has never been measured. The model's predictions are unnerving—electron magnetic moment matches experiment to ten decimal places—yet it is far from final: neutrinos turn out to have mass (the model set them to zero), ordinary visible matter is only about a tenth of the cosmos with the rest dark matter and dark energy, and the model offers no dark-matter candidate and no way in for gravity—more a building raised to ninety percent with a whole floor missing. Parity was once thought conserved in the weak interaction until Wu's 1957 cobalt-60 low-temperature experiment proved otherwise (see Wu's Parity-Violation Experiment), showing that even 'symmetry' answers to the lab. To find deeper rules, Particle Accelerators smash energies together to replay the earliest instants after the Big Bang; antimatter and the positron are in Cloud Chamber & the Positron, cosmic dark matter in Dark Matter and Cosmic Expansion & Redshift, and the Higgs field's vacuum properties feed into the problems Quantum Computing hopes to simulate.",
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
            zh: "判据只有一条：回复力与相对平衡位置的位移成正比且方向相反，写成 F=−kx，于是 a=−(k/m)x，位移随时间按正弦走 x=A sin(ωt+φ)，其中 ω=2π/T=2πf。跟着有 v=Aω cos(ωt+φ) 与 a=−Aω² sin(ωt+φ)，三者同频而相位各异：过平衡位置时位移为零而速度取最大值 Aω，到端点时速度为零而加速度取最大值 Aω²——把“位移最大处速度加速度也最大”当成理所当然，是最常见的错读。描述一场振动只需三个数：振幅 A、周期 T（或频率 f）、相位 φ；相位讲某一刻在周期里走到哪一处，两振子相位差恒为零叫同相、恒为 π 叫反相。两个原型各有各的ω：弹簧振子 ω=√(k/m)，取 k=100 牛每米、m=0.25 千克得 ω=20 弧度每秒、周期约 0.31 秒，与质量有关而与振幅无关；单摆在小角度下才近似简谐，因为回复力 mg sinθ≈mg·x/L 才正比于位移，于是 ω=√(g/L)。小角度是前提而非细节：摆角 30 度时周期已比小角公式长约 2%，所谓等时性只是近似，这一步的理想化正是「理想模型」条讲的那类操作。能量账由「机械能守恒」接管：总能为 ½kA²，动能与势能彼此互换而总和不变，A=5 厘米、k=100 牛每米即 0.125 焦；振幅由初始条件定，周期不受振幅影响，这是等时性的另一面。给个量级感觉：标准音 A4 每秒全振动 440 次、端点振幅只有一毫米，末速度约 2.8 米每秒而加速度峰值达七千多米每平方秒、合七八百个重力加速度——指尖摸上去只觉得“微微发麻”而非“看得见振动”，正因为振幅极小而加速度极大。有阻尼时振幅按指数包络衰减、周期略为变长，无阻尼是其理想极限；要把这些量读准，请配合「波动图象与振动图象」一条，那里专讲快照与历史两种图怎么分。计时口径与秒摆、摆钟的调节则归「周期与频率」条。",
            en: "The criterion is a single line: the restoring force is proportional to the displacement from equilibrium and points back at it, F=−kx, hence a=−(k/m)x and x=A sin(ωt+φ) with ω=2π/T=2πf. Then v=Aω cos(ωt+φ) and a=−Aω² sin(ωt+φ): the three share one frequency but differ in phase. At the equilibrium point the displacement is zero while the speed is at its maximum Aω; at the endpoints the speed vanishes while the acceleration reaches Aω². Reading the curve as if everything peaks together is the most common mistake. Three numbers describe a whole oscillation: amplitude A, period T (or frequency f) and phase φ, the last of which says where the cycle currently stands—two oscillators with a constant zero phase difference are in phase, with π they are in antiphase. Each prototype brings its own ω. A spring oscillator gives ω=√(k/m): with k=100 N/m and m=0.25 kg that is 20 rad/s and a period of about 0.31 s, fixed by mass and stiffness and not by amplitude. A pendulum is only approximately simple harmonic at small angles, because only then does mg sinθ≈mg·x/L hold, giving ω=√(g/L); at 30° the period already exceeds the small-angle formula by roughly 2%, so isochronism is an approximation, and that idealisation is exactly the move described in the Ideal Model entry. The energy bookkeeping belongs to Mechanical Energy Conservation: total energy is ½kA², exchanged between kinetic and potential while the sum holds—0.125 J for A=5 cm and k=100 N/m. Amplitude comes from the initial conditions while the period does not, which is the other face of isochronism. For scale: standard pitch A4 runs 440 cycles a second with an endpoint excursion of just a millimetre, so the tip speed is about 2.8 m/s while peak acceleration passes 7000 m/s², some 700 to 800 times gravity. A finger resting on a sounding branch feels a buzz rather than visible motion precisely because the amplitude is minute while the acceleration is enormous. With damping the amplitude decays inside an exponential envelope and the period lengthens slightly; the undamped case is the ideal limit. Read the quantities off the two kinds of graph in the Waveform & Oscillation Graphs entry, and leave timing, the seconds pendulum and clock regulation to Period & Frequency.",
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
            zh: "周期 T 是一次全振动的时间、频率 f 是每秒的次数，二者互为倒数 T=1/f，角频率 ω=2π/T=2πf。单摆的 T=2π√(L/g) 有三层前提：摆角足够小、摆线轻而不可伸长、摆球近似质点；结论是周期只与摆长与当地重力加速度有关，与质量和振幅（小幅下）无关。反解出 g=4π²L/T² 就是实验室测重力加速度的正路：L=1.000 米、测得 T=2.007 秒即给 9.82 米每平方秒，与「重力加速度」条的 9.8 同档。周期太小不好测，实操是测 30 次全振动的总时间再除，这是「微小量放大与转换法」的一个日常版本。历史上 T=2 秒（半周期恰一秒）的摆叫秒摆，摆长 √(g/π²)≈0.99 米，几乎正好一米——米的初议曾取秒摆长，后来走了地球周长十分之一千万的路线；惠更斯 1657 年拿摆做成摆钟，靠的就是等时性。摆钟的误差极好算：周期正比于 √L，摆长缩 1% 则周期短 0.5%，一天快约 433 秒、七分钟；把走准的钟从巴黎搬到赤道，g 由 9.81 降到 9.78，周期变长、每天慢约一分半。1672 年法国天文学家让·里希尔就带着秒摆钟去了南美卡宴，发现每天慢两分半，逼出了“地球在赤道鼓起来”的判断，最终由「万有引力定律」把离心效应与扁率算通。频率与音高是两回事：A4=440 赫兹只是 1939 年定下的约定而非自然常数，音高如何由频率、振幅与波形共同决定，交给「音调·响度·音色」条。电气与生理的量级顺手可比：市电 50 赫兹周期 0.02 秒（与「交变电流」条分工），人心脏约每秒一次、合一点二赫兹。两个易错点：其一，T=1/f 只对周期性运动有意义，一次性的碰撞、衰减振动谈频率要先说清按什么周期；其二，ω 与 f 只差因子 2π，把 50 赫兹当成 50 弧度每秒会错 2π 倍。若只想快速判断“谁快谁慢”，用「数量级估算」条的路子先把周期取整再比。",
            en: "Period T is the time for one complete cycle, frequency f the number of cycles each second, and they are reciprocals, T=1/f, with ω=2π/T=2πf. The pendulum formula T=2π√(L/g) rests on three conditions: small swing angle, a light inextensible cord, and a bob small enough to count as a point mass. Its sting is that the period depends only on length and local gravity—neither on mass nor, for small swings, on amplitude. Inverting gives g=4π²L/T², the standard classroom route to gravity: L=1.000 m with T=2.007 s yields 9.82 m/s², the same band as the Gravitational Acceleration entry. A single period is too short to time well, so labs measure thirty oscillations and divide—everyday use of the Enlarging Tiny Quantities method. A pendulum with T=2 s, half a second to each side, was called the seconds pendulum; its length, √(g/π²), is about 0.99 m, almost exactly one metre, which is why the seconds pendulum was once a candidate definition of the metre before the Earth-circle route won. Huygens built the first pendulum clock in 1657 on the strength of isochronism. Clock errors are easy to forecast: since T scales with √L, shrinking the length by 1% shortens the period by 0.5% and the clock gains roughly 433 s—seven minutes—a day; carrying a well-regulated clock from Paris to the equator, where g drops from 9.81 to 9.78, makes it lose about a minute and a half a day. In 1672 Richer took a seconds-pendulum clock to Cayenne and found it lost two and a half minutes daily, forcing the conclusion that the Earth bulges at the equator—later reconciled quantitatively through Universal Gravitation. Frequency and pitch are not the same animal: A4=440 Hz is a convention fixed in 1939, not a constant of nature, and how pitch, loudness and timbre split the work is left to Pitch, Loudness & Timbre. Handy orders of magnitude: mains electricity at 50 Hz has a 0.02 s period (see Alternating Current for that side), and a resting heart beats near 1.2 Hz. Two traps: T=1/f only means anything for motion that repeats, so a collision or a decaying swing needs its cycle defined before a frequency is quoted; and ω differs from f by the factor 2π, so treating 50 Hz as 50 rad/s is a 2π-fold error.",
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
            zh: "v=λf（等价于 v=λ/T）的来历只有一步：介质每振动一个周期，波形恰好前进一个波长。用它务必先把三个量的分工想明白。频率由波源决定，是“多少赫兹在振”这件事的唯一来源；波速由介质决定，同一种介质里声波的快慢与频率基本无关；于是波长只是两者之商，波源变了、介质变了，λ 都得跟着重算。这条分工解释了跨介质时的行为：光从空气进入水，频率保持 5×10¹⁴ 赫兹不变，速度降到约 2.26×10⁸ 米每秒，波长便由 600 纳米缩到约 450 纳米——「光的折射」那条讲的正是这一步。波速的量级差异极大：声波在空气约 340、水中约 1500、钢中约 5000 米每秒，而电磁波在真空是 3×10⁸ 米每秒，两者差六个数量级；绳上的横波由张紧与粗细定，v=√(F/μ)，张力大一倍快约 41%。若介质里波速随频率而变就叫色散，玻璃对光的色散（见「光的色散」条）与深水表面波同属此类，无色散介质里才有“一个波速通吃所有频率”的干净图像。横波与纵波的区分在于振动方向与传播方向是否垂直：弦波、电磁波是横波，只有横波能偏振（见「偏振」条）；气体与液体里的声波是纵波，靠疏密交替推进，所以声波不能在真空中传而电磁波可以，固体则两种都支持。最容易错的一句是“波随水走”：介质质点只在原地振动，并不随波迁移，水面漂浮物只上下起伏而不下游，波传走的是振动形式、能量、动量与信息。波长的可感知跨度值得记几个数：440 赫兹的声波长 0.77 米，可闻下限 20 赫兹长达 17 米，上限 2 万赫兹只有 1.7 厘米（超声与次声的分界与其应用交给「超声波与次声波」条）；医用超声 5 兆赫兹在软组织里波长仅 0.3 毫米，这正好是它能否出毫米级细节的原因；无线电从千米到毫米跨六个数量级，谱段划分见「电磁波谱与应用」条。最后留个提醒：水波既不是纯横波也不是纯纵波，水质点走的是近似圆周，所以“波=横波或纵波”的二选一并不穷尽一切。",
            en: "The formula v=λf (equivalently v=λ/T) needs just one step of reasoning: in one period the pattern advances by exactly one wavelength. Using it well means keeping the three quantities' division of labour clear. Frequency belongs to the source—it is the only place “how many cycles a second” comes from. Speed belongs to the medium, and in one medium sound's speed is almost indifferent to frequency. Wavelength is therefore the quotient: change the source or change the medium and λ must be recomputed. That division explains what happens at a boundary: light crossing from air into water keeps its 5×10¹⁴ Hz, drops to roughly 2.26×10⁸ m/s, so a 600 nm wave shrinks to about 450 nm—exactly the step made in the Refraction entry. Speeds span an absurd range: sound runs 340 m/s in air, 1500 in water, 5000 in steel, while light in vacuum runs 3×10⁸ m/s, six orders of magnitude up. Waves on a stretched string obey v=√(F/μ), so doubling the tension buys only about 41%. When speed depends on frequency the medium is dispersive—glass dispersing light (see Dispersion) and deep-water ripples both are—otherwise one speed serves all frequencies. Transverse versus longitudinal asks whether the vibration is perpendicular to travel: string and electromagnetic waves are transverse, and only transverse waves can be polarised (see Polarization); sound in gases and liquids is longitudinal, a train of compressions, which is why it cannot cross a vacuum while light can, though solids carry both kinds. The stubborn mistake is believing matter rides along: particles merely oscillate on the spot, a floating leaf bobs without drifting downstream, and what propagates is the pattern together with energy, momentum and information. Worth memorising as scales: 440 Hz sound has λ=0.77 m, the 20 Hz hearing floor stretches to 17 m and the 20 kHz ceiling shrinks to 1.7 cm (the ultrasound–infrasound boundary is handled in Ultrasound & Infrasound); medical ultrasound at 5 MHz has λ of only 0.3 mm in soft tissue, which is precisely why millimetre detail is resolvable; radio runs six orders from kilometres to millimetres, tabulated in The Electromagnetic Spectrum & Applications. One last caution: water waves are neither purely transverse nor purely longitudinal—each packet of water traces an almost circular path—so the two-way classification does not exhaust the world.",
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
            zh: "叠加原理说的是：几列波相遇时，某点的位移是各列波单独存在时位移的矢量和，且各列波穿过彼此后形状、频率、速度都不改，像没遇见过一样。这不是新的物理假设而是波动方程线性性质的直接后果，正因为是“线性”，只有振幅不太大时才成立——海啸逼近海岸、声波强到出现激波时叠加原理就不再够用。相遇会产生图样，但要得到稳定不动的图样必须相干：两列波频率相同、相位差恒定、振动方向一致，缺一不可；普通两个灯泡不干涉，不是因为光不叠加，而是相位差每秒乱改上万次，图样糊成平均亮度。相干之后的判据是路程差：两源同相时，δ=kλ 处加强、δ=(2k+1)λ/2 处减弱；若两源本就反相，这两个判据整体互换——漏看前提是做错干涉题的头号原因。还要分清“加强”指什么：它指振幅相加为 A₁+A₂，那一点仍在剧烈振动，并不是位移永远最大；减弱处振幅只剩 |A₁−A₂|，两列等幅时那一点才几乎静止。能量也没有被消灭，只是被重新分配到别处，整幅图样加起来仍守恒。定量的例子中，双缝条纹间距 Δx=λL/d：取 λ=600 纳米、屏距 2 米、缝距 0.5 毫米，得 2.4 毫米，条纹肉眼可数；装置与历史见「杨氏双缝实验」，光学的干涉衍射总账在「干涉与衍射」。声波因为波长在厘米到米的量级，干涉极好演示：两只喇叭发 1700 赫兹（λ 约 20 厘米）同源信号，在两者之间横走一圈会听到忽强忽弱数处。另一类干涉不需要狭缝：光在薄膜上下两面各反射一次，来回光程 2nt，膜厚取 λ/(4n) 即约 100 纳米（氟化镁 n=1.38、绿光 550 纳米）时两面反射反相而互相抵消，这就是镜头的增透膜，其淡紫反光与肥皂膜的彩色同出一门；肥皂膜彩色常被误当成色散，其实一个靠干涉、一个靠折射随波长变（见「光的色散」）。同一原理也用来检查平面的平整度，标准样板下空气楔的明暗条纹直接标出凹凸。技术侧，主动降噪耳机把环境噪声反相后叠加，在耳道里“减弱”，对低频规律噪声最有效（治理噪声的其余手段见「噪声的危害与控制」）；微波干涉仪用来精确测距，引力波探测本质也是干涉——但那条物理属于「引力波」。",
            en: "The superposition principle says the displacement at a meeting point is the vector sum of what each wave would have produced alone, and that after passing through each other the waves keep their shape, frequency and speed as if nothing happened. It is not a separate hypothesis but an immediate consequence of the wave equation's linearity—and precisely because linearity is what's behind it, it fails when amplitudes grow large: breaking surf and acoustic shocks are beyond it. Overlap makes patterns, but a pattern that stands still requires coherence: equal frequency, constant phase difference and matching vibration direction, all three at once. Two light bulbs do not interfere—not because light refuses to add, but because the phase difference scrambles tens of thousands of times a second and everything washes into average brightness. With coherence the test is the path difference: for in-phase sources δ=kλ reinforces while δ=(2k+1)λ/2 cancels; if the sources start in antiphase the two criteria swap wholesale, and forgetting that premise is the leading cause of wrong interference answers. Be precise about what 'reinforced' means—it is the amplitude that becomes A₁+A₂, so that point still oscillates violently, not a place frozen at maximum displacement; a cancelled point keeps |A₁−A₂| and is truly quiet only when the two amplitudes match. Energy is destroyed nowhere either: it is merely redistributed, and the total over the whole field still balances. A worked number: fringe spacing Δx=λL/d gives 2.4 mm for λ=600 nm, screen distance 2 m and slit separation 0.5 mm—easily counted by eye; the apparatus and its history sit in Young's Double-Slit Experiment, while the optical ledger is in Interference & Diffraction. Sound, with wavelengths in centimetres to metres, makes interference trivial to demo: two loudspeakers fed one 1700 Hz signal (λ about 20 cm) let you walk between them and hear several maxima and minima. Interference needs no slits: light reflecting off the two faces of a thin film travels an extra optical path 2nt, so choosing the thickness λ/(4n)—about 100 nm for magnesium fluoride at n=1.38 and green light at 550 nm—makes the two reflections cancel, which is the antireflection coating on a lens, whose violet sheen and a soap film's colour share one origin. Soap-film colour is often mistaken for dispersion, but one is interference and the other is refraction varying with wavelength (see Dispersion). The same trick checks flatness: bright and dark bands over an air wedge under a reference plate map the bumps directly. On the engineering side, noise-cancelling headphones add an inverted copy of the ambient sound so that cancellation happens inside the ear canal, working best on low, steady noise (the rest of noise control is under Hazards & Control of Noise). Microwave interferometers measure distances with care, and gravitational-wave detection is interferometry too—though that physics belongs to Gravitational Waves.",
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
            zh: "驻波由两列同频、等幅、相向传播的波叠加而成：某些点始终不动叫节点，某些点振幅加倍叫腹点，相邻两节点相距 λ/2，波形停在原地起伏而不前进，能量在相邻节段之间往返而不外传——这是它与行波最根本的差别，行波才真正“把能量送走”。边界把驻波量子化：两端固定的弦必须满足 L=nλ/2，于是 f_n=n v/(2L)，其中 v=√(F/μ)。代个真实数字：吉他有效弦长 0.65 米、单弦张力约 80 牛、线密度 0.4 克每米，得波速约 447 米每秒、基频约 344 赫兹，二次谐波 688 赫兹恰高一个八度、三次 1032 赫兹。由此立刻看出一个易错点：要把音高提一个八度，频率只需翻倍而张力要翻四倍，因为频率跟着 √F 走，调琴时拧过劲就是这条规律在咬手。管子另有规矩：开口管两端都是腹，f₁=v/(2L) 且奇偶谐波齐全；一端封口则封端为节、开口近似为腹，f₁=v/(4L) 且只有奇次谐波。八英尺（2.44 米）的开口管发约 70 赫兹（把管口端的修正算进去接近 65 赫兹，即管风琴记谱的低 C），同一根管堵上一端就低一个八度——这就是管风琴靠音栓换八度的原理。用 256 赫兹音叉在闭管上做共鸣实验，第一次听到明显增强时气柱长约 33.5 厘米，正是 λ/4。音色取决于基频与各泛频的强度配比，那部分归「音调·响度·音色」，而空气中同类现象的叫法与乐器共鸣箱归「共振与共鸣」。受迫振动是另一半故事，也是最容易讲错的地方：稳定下来之后，振动频率等于驱动力的频率而不是系统的固有频率；只有驱动频率接近固有频率时振幅才显著抬升，这条“振幅—驱动频率”曲线叫共振曲线，位移峰值实际略低于固有频率（差 √(1−1/(2Q²)) 因子，品质因数 Q 大时几乎重合），而 Q 越小峰越矮越钝、能量散得越快。阻尼下的衰减也能量级化：一个 Q 约一千的秒摆每摆动一次振幅只减约千分之三，要三十多分钟才掉到 4% 左右，所以大摆钟能走很久。有益共振处处在用：收音机调谐靠电磁振荡的选频（原理见「交变电流与电磁波」）、磁共振成像靠自旋在射频下的共振（见「磁共振成像」）。但有个流传很广的错误解释必须点名：家用微波炉的 2.45 吉赫兹并不是“水分子的固有频率”，微波加热靠的是极性分子在交变电场里的介质损耗，选这一频点是在吸收强度与穿透深度之间的折中，油和糖照样被加热。有害共振最出名的案例是 1940 年 11 月 7 日塔科马窄桥：约 19 米每秒的风让 853 米主跨每分钟扭转约三十六次（0.6 赫兹）、振幅达数米而垮塌；严格机理是气动弹性颤振这种自激振动，而非教科书常说的“风致共振”，但“驱动频率撞上固有频率”这套判词依然适用，士兵过桥改便步走的规矩也依然有道理。",
            en: "A standing wave is made of two equal-frequency, equal-amplitude waves travelling in opposite directions: some points never move—nodes—others swing at double amplitude—antinodes—with adjacent nodes half a wavelength apart. The pattern heaves in place rather than advancing, and energy shuttles between neighbouring segments instead of being carried off; that contrast is the cleanest way to separate it from a travelling wave. Boundaries quantise the pattern: a string fixed at both ends demands L=nλ/2, hence f_n=n v/(2L) with v=√(F/μ). Put in real numbers: a guitar's 0.65 m speaking length, roughly 80 N of string tension and 0.4 g per metre of linear density give about 447 m/s and a fundamental near 344 Hz, with the second harmonic at 688 Hz exactly an octave above and the third at 1032 Hz. Here is an easy trap made visible: raising the pitch one octave doubles the frequency but quadruples the tension, since frequency tracks √F—anyone who cranks a peg too far feels that square root. Pipes follow their own rule. An open pipe has antinodes at both ends, f₁=v/(2L) and the full harmonic series; stop one end and that end becomes a node, so f₁=v/(4L) and only odd harmonics survive. An eight-foot (2.44 m) open pipe speaks near 70 Hz—closer to 65 Hz once the open-end correction is counted, the low C of organ notation—while the same pipe stopped at one end drops an octave, which is how organ stops swap octaves. Resonance with a 256 Hz tuning fork over a closed tube first swells when the air column is about 33.5 cm, one quarter wavelength. Timbre is the recipe of fundamental and overtones, handled under Pitch, Loudness & Timbre, while the same phenomenon in air and in instrument bodies belongs to Resonance & Sympathetic Vibration. Forced oscillation is the other half of the story and the part most often got wrong: once steady, the oscillation frequency equals the driving frequency, not the system's natural one; the amplitude only lifts markedly as the driver approaches the natural frequency. That amplitude–frequency plot is the resonance curve, whose displacement peak actually sits slightly below the natural frequency (a factor √(1−1/(2Q²)), negligible for large quality factor Q), and small Q makes the peak lower, blunter and faster-dissipating. Damping, too, can be put in orders: a seconds pendulum with Q around a thousand loses only about three parts in a thousand of amplitude per swing, needing some thirty minutes to fall toward 4%, which is why long-case clocks run for ages. Useful resonance is everywhere: radio tuning selects through electromagnetic oscillation (see Alternating Current & Electromagnetic Waves) and magnetic resonance imaging works on spin resonance driven by radio frequency (see Magnetic Resonance Imaging). But one popular explanation deserves naming as false: a microwave oven's 2.45 GHz is not 'the natural frequency of the water molecule'. Microwave heating comes from dielectric loss of polar molecules in an alternating field, and the frequency is a compromise between absorption strength and penetration depth—grease and sugar heat just as well. The most famous destructive case is the Tacoma Narrows Bridge on 7 November 1940, where a wind near 19 m/s set the 853 m main span twisting about thirty-six times a minute (0.6 Hz) with several metres of amplitude until it failed; the true mechanism is aerodynamic flutter, a self-excited oscillation rather than textbook forced resonance, yet the working test—driver meeting natural frequency—still governs the lesson, and the old rule of breaking cadence on bridges still stands.",
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
            zh: "波动图象的横轴是位置，读的是某一时刻所有质点的位置分布，相邻两波峰之间直接给出波长；振动图象的横轴是时间，读的是某一个质点随时间的位移，一次完整起伏的宽度即周期。两图合体再用 v=λ/T 求波速：绳上 20 赫兹、图上量得 λ=0.2 米，波速就是 4 米每秒。判断传播方向常用带动法：先振动的质点带动后振动的质点，把整条波形沿猜测方向平移少许，比出各点下一刻的动向；另一个等价手法是看波峰两侧的“上坡与下坡”，同一时刻两侧质点的运动方向相反。最典型的易错是把 y–x 快照误当成某质点的振动历史——两图形状一样而含义完全不同，横轴一换，读出的量从波长变成周期；反之由振动图推各质点位置时，必须先把所给时刻钉死。斜率的两副面孔也须分清：y–x 图的斜率是波形的陡度，与质点速度无关；y–t 图的斜率才是该质点的速度，斜率为零处质点正停在端点。位移与加速度的关系在两图里同一：a=−(2π/T)²x，故凡是位移最大处加速度必指向平衡位置而速度为零。还有一个“数数”层面的易错：一个周期里质点走完 4 倍振幅的路程，而波只前进 1 个波长，这两个数不相等、也不该拿来互换。多解性最容易失手：若只给 y–x 图上两点间的距离与相位关系，波长可写成 λ=Δx/(n+φ/2π)，n 取任意非负整数，故波速有无穷多解，题目须再加约束（例如“波速小于某值”或“周期大于某值”）才唯一；忘了这层就多解少解全靠猜。方法层面，这两张图是「图象法与函数思想」条讲的两类函数图像在物理里最典型的落地，读图的三步（看轴、看形、看斜率与面积）在那里；而简谐运动的三个量——振幅、周期、相位——的定义与算法在「简谐运动」，波如何靠 v=λf 由介质与波源共同定价在「波长·波速·频率」，本条只解决“图上读什么、往哪传、有几解”这三件事。",
            en: "On a y–x graph the horizontal axis is position, so it is a snapshot of every particle at one instant and adjacent crests hand you the wavelength directly; on a y–t graph it is time, so one particle's history unfolds and the width of a full excursion is the period. Combine them and v=λ/T gives the speed: a 20 Hz wave whose snapshot measures λ=0.2 m travels at 4 m/s along the rope. To find the direction of travel, use the dragging rule—particles that start earlier drag the ones that start later—so shift the whole curve a little along the guessed direction and compare which way matches the observed motions; the equivalent shortcut is to look at the upslope and downslope on either side of a crest, where particles move in opposite senses at the same instant. The classic error is reading a y–x snapshot as some particle's history: the curves look alike but mean different things, and swapping the axis changes what you can read off, from wavelength to period; going the other way, from a y–t graph back to positions, requires fixing the stated instant first. Slopes have two faces too: on y–x the slope is how steep the waveform is and has nothing to do with particle speed, while on y–t the slope is precisely that particle's speed, zero at the turning points. Acceleration reads the same way on both graphs, a=−(2π/T)²x, so wherever displacement is largest the acceleration points back through equilibrium and the speed is zero. A counting trap: in one period a particle covers four amplitudes of path while the wave advances one wavelength—these two numbers are not interchangeable. Multiplicity of solutions is where students lose marks: given only a separation and a phase relation between two points on a snapshot, the wavelength is λ=Δx/(n+φ/2π) for any non-negative integer n, so the speed has infinitely many values and the problem needs an extra bound (say, speed below some value, or period above some value) before the answer is unique; miss that and every solution is a guess. Method-wise these two graphs are the most concrete instance of the Graph Method & Function Thinking entry's two families of plots—read the axes, read the shape, then read slopes and areas—while the definitions of amplitude, period and phase live in Simple Harmonic Motion, and the way medium and source jointly price the speed lives in Wavelength, Speed & Frequency. This entry settles only three things: what a graph gives you, which way the wave runs, and how many answers it admits.",
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
            zh: "这一作图同时解释了波的反射、折射与衍射：波面上每一点都可视为发出子波的新波源，各子波在前方的包络就是下一时刻的波面。波进入波速较小的介质时，同一波面上各点子波前进的距离按比例变短，包线遂转向法线一侧，由此直接得到折射定律 sin i/sin r=v₁/v₂，而频率保持不变、波速与波长同比例减小——「光的折射」条里的 n=c/v 正是这个比值的水波版；在水波槽里让斜斜的一列波从深水区进入浅水区，肉眼就能看见波前折向法线。它也给出衍射明显的条件：障碍物或孔径的尺寸与波长可比时子波绕得很远，尺寸远大于波长时阴影边界锐利、近似直线传播。这个判据把一句老话变成算术：门宽一米，而可闻声波波长从 17 米到 1.7 厘米，与门同档，所以“闻其声而不见其人”；可见光波长 5×10⁻⁷ 米比门小六个数量级，所以门槛外的影子利落——直线传播本身只是波长趋零的近似（见「光的直线传播」，衍射的定量账在「干涉与衍射」）。声波还有同一机另一件日常事：声速随气温升高，白天上层暖、下层凉，声线向上弯，喊话传不远；夜里地面先凉，上层反而快，声线向下折回地面，所以深夜听得见远处车声（温度梯度与声速的分工见「声速」条）。原原理只定出波面的几何位置，不回答各方向分配多少能量，后由菲涅耳补上子波的相干叠加、再由基尔霍夫给出严格的衍射积分，才成为可定量使用的惠更斯–菲涅耳原理；今天它并不是一条独立的假设，而是波动方程解的一种等价表示，球面波的二阶包络仍是球面这一事实对机械波、电磁波、水波通用。史的一面值得记：惠更斯 1690 年在《光论》里用这套子波说解释反射与折射，与牛顿的微粒说对峙百余年，直到 1801 年杨氏双缝把波动说推上台面；而折射率与光速的关系也由这同一套图像顺带给出——这些都归「杨氏双缝实验」与光学各条，本条只留“波面如何一格一格往前推进”这个作图本身，以及它的适用边界：介质均匀、波速已知、且波长与障碍物尺寸之比决定图样粗细。",
            en: "The construction explains reflection, refraction and diffraction at once: every point of a wavefront acts as a source of secondary wavelets, and the envelope of all of them ahead is the next wavefront. Entering a slower medium shortens every wavelet on the same front in the same proportion, tilting the envelope toward the normal, which yields the sine law directly as sin i/sin r=v₁/v₂ while frequency holds and speed and wavelength shrink together—the n=c/v of the Refraction entry is this ratio in its optical dress. In a ripple tank a train of waves slanting from deep to shallow water visibly bends its fronts toward the normal. The construction also states when diffraction matters: an obstacle or aperture comparable to the wavelength gets wrapped around substantially, one far larger leaves a sharp shadow and near-rectilinear travel. That test turns an old saying into arithmetic—a doorway is about a metre wide while audible sound runs from 17 m down to 1.7 cm, the same order, so you hear someone before you see them; visible light at 5×10⁻⁷ m is six orders smaller, so its shadow edge is crisp, and straight-line propagation itself is just the short-wavelength limit (see Rectilinear Propagation of Light, with the quantitative diffraction ledger in Interference & Diffraction). The same mechanism explains an everyday acoustic fact: sound speeds up with temperature, so on a warm day the upper air is faster and rays bend upward, carrying a shout poorly, whereas at night the ground cools first, the upper air is faster and rays curve back down, which is why distant traffic is audible late at night (see Speed of Sound for that temperature side). The original principle fixes wavefront geometry but never says how much energy goes each way; Fresnel added coherent superposition of the wavelets and Kirchhoff supplied the rigorous diffraction integral, making it the quantitatively usable Huygens–Fresnel principle. Today it is not an independent hypothesis but an equivalent representation of the solution of the wave equation—the fact that a spherical front's next envelope is again spherical holds for mechanical, electromagnetic and water waves alike. A page of history is worth keeping: Huygens used the wavelet picture in his 1690 Treatise on Light to explain reflection and refraction, facing off against Newton's corpuscles for over a century until Young's double slit of 1801 pushed the wave theory into the open, and the very same picture hands over the link between refractive index and light speed. Those chapters belong to Young's Double-Slit Experiment and the optics entries; what stays here is the construction itself—how a front nudges forward point by point—together with its bounds of use: a homogeneous medium, a known wave speed, and the wavelength-to-obstacle ratio setting how coarse the pattern is.",
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
            zh: "两列频率相近、振幅相仿、沿同一方向振动的波叠加，强弱会周期性地起伏，起伏的每秒次数即拍频 |f₁−f₂|。用和差化积看得最清楚：两式相加化为 2A cos(2π(Δf/2)t)·sin(2π f̄ t)，包络的数学频率只有差的一半，可“响一次”在每个包络周期里出现两次，所以听见的拍频恰好等于 f 之差——这个“一半与两倍互相抵消”的细节是本条最容易讲错的地方。拍是叠加造成的效果而非第三种波：介质中每一点仍同时参与两个频率的振动，只是合位移在交替放大与抵消；加强时能量聚在这里，减弱时挪到别处，总能量不变。听拍判音准极灵敏：音叉 256 与 259 赫兹同敲，每秒听见三次强弱；标准音 440 赫兹与一把 438 赫兹的弦对奏，拍频每秒两次，越准拍越慢，拍完全消失即已同频。钢琴调律比这更精一层：真琴弦因刚度而谐波略高，纯 2∶1 的八度反而听着“死”，调律师要按十二平均律故意留出每秒零点几拍的“活拍”，靠不同音程各自规定该留多快来判断音准——这门手艺叫拍频分律。工程侧，超声血流计与雷达测速把发射波与回波混频取差频，再靠差频与速度的比例读出流速或车速（多普勒本身的账在「多普勒效应」条，本条只讲“为什么要先混出一个低频差”）。近频叠加还是理解波包的入口：两列相近频率合成一个忽强忽弱的包，色散介质里这个包整体的移动速度与单色波的相速度不同，这正是群速度的雏形；想把它画出来，水波槽里两列近频波纹交叠即可看到缓慢游动的菱形网格，条纹本身既在时间上起伏也在空间上起伏。最后两处区分：与「驻波与共振」的分别是“同频相向”对“近频同向”——驻波的节与腹钉在空间不动，拍则是同一点上振幅随时间起伏；与两个音叉“共振驱动”的分别是拍需要两列波同时存在，缺一即无拍。频率相差太远就不再是拍而是两个独立音，人耳能分辨的差值下限约几赫兹以内才算“同音带拍”。",
            en: "Two waves of nearby frequencies and similar amplitudes travelling the same way add into a swell that rises and falls, and the number of beats each second is |f₁−f₂|. Sum-to-product makes it transparent: the pair becomes 2A cos(2π(Δf/2)t)·sin(2π f̄ t), so the envelope's mathematical frequency is only half the difference while each envelope cycle delivers two loud maxima—the 'half' and the 'double' cancel, and the audible beat rate comes out exactly equal to the frequency difference. That subtlety is where explanations most often slip. A beat is an effect of superposition, not a third wave: every particle still takes part in both original oscillations while the resultant displacement alternately amplifies and cancels; energy gathers at a loud moment and moves elsewhere at a quiet one, with the total unchanged. Ears are uncannily sensitive to beats: strike a 256 Hz fork against a 259 Hz one and you hear three pulsations a second; bow a 438 Hz string against standard 440 Hz and you hear two, the beat slowing as the gap closes and vanishing at unison. Piano tuning goes one layer finer: real strings are stiff, so their harmonics sit slightly above exact multiples, and a pure 2∶1 octave sounds dead, so tuners deliberately leave a fraction of a beat per second according to the equal-tempered scale, judging each interval by the beat rate it is supposed to keep—the craft is voiced tuning by beats. On the engineering side, ultrasonic blood-flow meters and radar speed guns mix the emitted wave with the echo and read the difference frequency, whose ratio to speed then gives flow or velocity (the Doppler account itself is in the Doppler Effect entry; what belongs here is only why mixing down to a low difference frequency helps). Two nearby frequencies are also the doorway to wave packets: their sum is a slowly pulsing envelope, and in a dispersive medium that envelope travels at a speed different from the phase speed of either monochromatic component—the seed of group velocity. Draw it in a ripple tank: two trains of nearly equal frequency overlap into a drifting rhombic grid, undulating in time and in space at once. Two final separations. From Standing Waves & Resonance the difference is same-frequency counter-travelling versus near-frequency co-travelling—standing waves pin nodes and antinodes in space, beats make one point pulse in time. From resonant driving by a tuning fork the difference is that a beat needs both waves present simultaneously; remove one and the pulsation disappears. Push the frequencies far apart and it is no longer a beat but two distinct tones: the ear only reads them as one tone-with-beats while the gap stays within a few hertz.",
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
            zh: "压强描述压力的集中程度，定义是 p=F/S，即垂直作用在单位面积上的力，单位帕斯卡（Pa），1 帕等于 1 牛每平方米。式中 p 为压强，F 为垂直作用在表面上的力，S 为受力面积。1 帕这个单位极小：把一枚约 50 克的鸡蛋举高 1 米大约做 0.5 焦的功，而 1 帕压在 1 平方米上的力才 1 牛，所以日常与工程里更常用千帕与兆帕，气象上还有百帕，一个标准大气压约 1013 百帕。必须把压力与压强分开：压力是力，压强讲的是作用效果，同一个力摊在越大的面积上效果越弱——菜刀磨薄、图钉做尖、注射器针头极细，都是靠减小受力面积来增大压强；铁轨下铺枕木、书包用宽背带、坦克与收割机改用履带或双胎，都是靠增大受力面积来减小压强。算几笔账就明白量级差多大：体重约 500 牛的中学生双脚站立，与地面接触面积约 350 平方厘米，对地面压强约 1.4×10⁴ 帕；踮起一只脚就翻倍到约 2.9×10⁴ 帕；芭蕾舞演员单脚脚尖着地，触地面积只有约 2 平方厘米，450 牛的体重能造出约 2.25×10⁶ 帕，比几十吨重的坦克对地压强（约 8×10⁴ 帕）大近三十倍。切菜时 10 牛的力落在 0.05 毫米宽、5 厘米长的刃口上，压强约 4×10⁶ 帕，这就是“磨刀不误砍柴工”的物理账。压强本身看不见，教材里用海绵或沙面的凹陷程度来显示它，这正是「微小量放大与转换法」条讲的转换思想。两条常见易错：一是压力不一定等于重力，斜面上物体的压力只是重力的一个分力，被手按在墙上的物体，其对墙的压力与重力毫无关系；二是 S 取实际接触面积而不是物体的表面积，公式里的 F 也必须是垂直于表面的那一个分力。液体与气体的压强另有规矩，见「液体压强」与「大气压强」两条。",
            en: "Pressure measures how concentrated a push is: p=F/S, the force acting perpendicular per unit area, in pascals, where 1 Pa is 1 N per square metre. In the formula, p is pressure, F the force normal to the surface and S the area over which it acts. One pascal is tiny — lifting a 50 g egg by a metre does about 0.5 J, yet 1 Pa pressing over a whole square metre amounts to only 1 N — so kilopascals and megapascals are the everyday units, and weather reports use hectopascals, a standard atmosphere being about 1013 hPa. Keep force and pressure apart: the force is the push, the pressure is the effect, and the same push spread wider does less. Sharpening a knife, pointing a thumbtack and using a hypodermic needle all increase pressure by shrinking the area; sleepers under rails, wide backpack straps and the tracks of tanks and harvesters reduce it by enlarging the area. Do the sums and the spread becomes memorable: a student weighing about 500 N standing on both feet (some 350 cm² of contact) exerts about 1.4×10⁴ Pa, doubling to roughly 2.9×10⁴ Pa on one foot; a ballet dancer on a single toe tip of about 2 cm² reaches some 2.25×10⁶ Pa, nearly thirty times the ground pressure of a tens-of-tonnes tank (about 8×10⁴ Pa). Slicing with 10 N along an edge 0.05 mm thick and 5 cm long gives about 4×10⁶ Pa, which is the whole point of a sharp blade. Pressure itself is invisible, so school experiments reveal it by how deep a sponge or sand dents — the conversion idea set out in the entry on amplifying and converting tiny quantities. Two common slips: the normal force need not equal weight (on a slope it is only a component, and a body pressed against a wall transfers a force with nothing to do with its weight), and S is the real contact area rather than the body's surface area, with F the component normal to that surface. Fluids follow their own rules, covered in the entries on liquid pressure and on atmospheric pressure.",
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
            zh: "液体内部向各个方向都有压强，静止液体里某一点的压强由 p=ρgh 给出：式中 ρ 为液体密度，g 为重力加速度，h 为该点到自由液面的竖直深度。这个公式只留下两个变量——密度与深度，与液体的总重、容器的形状和底面积都无关，一池水和一根细管只要深度相同，同一深度处的压强就相同，这正是所谓“帕斯卡裂桶”的依据：相传 1646 年帕斯卡把一根细长管接到装满水的木桶上，只倒进几杯水，十米高的水柱就在桶内造出约 9.8×10⁴ 帕的压强，桶顶约 0.1 平方米的面积上受力近一吨，桶壁随之崩裂，而倾倒入的水重不过几十牛。同一深度处液体向各个方向的压强相等，因此侧壁也要受力，坝体因此做成下宽上窄，水库蓄水位越高坝底压强越大：蓄水位 175 米时坝底水压约 1.7×10⁶ 帕，合十几个大气压，潜水时每下潜约 10 米就多承受一个大气压，这正是深潜器必须用厚壳与球形舱的原因。另一条独立原理是帕斯卡定律：加在密闭液体上的压强能够大小不变地被液体向各个方向传递，于是液压机有了把手——小活塞面积若是大的百分之一，50 牛的力就能顶起 5000 牛，汽车千斤顶、挖掘机大臂、刹车踏板到制动钳的油路、机床与剪板机全走这条路；代价是小活塞要压下 100 倍的行程，力赚了距离就得赔，与「功与功率」条的账一致。第三条承载结构是连通器：上端开口、下部连通的几个容器里同种液体静止时液面等高，茶壶的嘴与壶身因此要一样高，下水道存水弯靠一段留在弯里的水封住臭气，锅炉与水箱外侧装一根玻璃水位计直接读出炉内液位，船闸则是最大号的连通器——上下游水位差数十米，先让闸室与一侧齐平再开门，三峡船闸把约 113 米的落差分成五级闸室逐级抬降，一条船过闸要三四个小时。两条易错：一是深度 h 从自由液面往下量，不是从容器底往上量，容器底与顶谁压强大的判据只有深度；二是液体压强公式不适用于气体在同一容器里的小高度差（空气密度小，几米高度的 ρgh 只有几十帕，通常忽略）。",
            en: "A liquid presses in every direction, and at rest the pressure at a point is p=ρgh, where rho is the liquid's density, g the gravitational field and h the vertical depth below the free surface. Only two variables survive — density and depth — so total weight, vessel shape and base area drop out: a pond and a slender tube give the same pressure at the same depth. That is the point of Pascal's barrel, said to have been burst around 1646 by a tall thin column of a few cups of water: ten metres of water makes about 9.8×10⁴ Pa, and over the roughly 0.1 m² lid that pushes with close to a tonne of force although the water poured in weighed only tens of newtons. Pressure at a given depth acts equally in all directions, so walls are loaded too; dams are therefore wide at the foot, and with a 175 m reservoir the bottom sees about 1.7×10⁶ Pa, some ten atmospheres — which is why divers gain one atmosphere of pressure every ten metres and deep submersibles need thick spherical hulls. A second, independent principle is Pascal's law: pressure applied to a confined liquid is transmitted unchanged in every direction, which is what gives hydraulics its lever — if the small piston has one hundredth the area, 50 N lifts 5000 N, the basis of car jacks, excavator arms, brake pedals acting on callipers, presses and shears. The price is travel: the small piston must move a hundred times farther, gain in force being paid for in distance, exactly the bookkeeping of the entry on work and power. Third comes the communicating vessels rule: like liquids standing in open, interconnected containers level out to the same height, which is why a teapot's spout matches its body, why the bend under a sink keeps a water plug against smells, why boilers carry a glass gauge reading the level directly, and why ship locks are communicating vessels at giant scale — a lock chamber is levelled with one side before the gates open, and the Three Gorges five-stage lock steps a ship through roughly 113 m of difference in three or four hours. Two slips to avoid: h is measured down from the free surface, not up from the bottom; and the formula should not be stretched to gases over a few metres, since rho for air gives only tens of pascals and the term is normally ignored.",
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
            zh: "空气有质量又能够流动，被重力约束在地球周围，于是像液体一样在内部向各方产生压强，这就是大气压强，标准值约 1.01×10⁵ 帕，即 101.3 千帕。第一个把它测出来的是托里拆利：1644 年他把一根约一米长、一端封口的玻璃管灌满水银倒插进水银槽，管内液面降下一段后停住，管内外液面差约 760 毫米，上方空出的那段近乎真空，此后被称为托里拆利真空；按 p=ρgh 算，13600×9.8×0.760 恰得 1.01×10⁵ 帕。这个实验的说服力在于对照：如果水银柱是被大气压“托”住的，那么换成水就得用十米多长的管子（101325/(1000×9.8)≈10.3 米），而这直接决定了抽水机的吸程上限。1654 年格里克在马德堡当众演出，把两个铜半球合在一起抽成真空，两边各用八匹马、共十六匹才把它们拉开——半径 0.25 米的半球投影面积约 0.2 平方米，大气压在打开它之前交出约 2×10⁴ 牛、合两吨的力。吸盘、吸管与抽水机都靠气压差工作，但说法要纠正一处：用吸管喝饮料并不是把饮料“吸”上来，而是嘴里气压降低，外界大气压把液面压上去；活塞式抽水机同样靠活塞下形成低压让水被压进泵腔，而一个标准大气压最多只能把水托起约 10.3 米，这就是吸程的天花板，井太深时须把离心式水泵的叶轮下到水下、改用潜水电泵，或分级提水；高层住宅则反过来，靠屋顶水塔或二次加压供水，30 米压头约给出 2.9×10⁵ 帕，与家庭常见的 0.2 到 0.4 兆帕水压同量级。大气压随海拔升高而降低，因为头顶上那柱空气变短了：粗略地，在近地面每升高约 12 米水银柱降 1 毫米；拉萨海拔约 3650 米，气压只有约 60 千帕，水到 86 ℃ 就沸腾，饭煮不熟才需要高压锅，而密封高压锅把压强提到约两个标准大气压、沸点升到约 120 ℃（口径见「物态变化」条）；客机在一万米巡航，舱内必须增压到相当于两三千米高度的气压，否则人会在几分钟内失能。测量仪器有两类：水银气压计精度最高、气象台沿用已久，无液气压计靠抽成真空的金属盒随气压胀缩、便于携带，加上高度刻度就是高度计，登山表和飞机高度表都是它。最后一条常被问起：人体表面积约 1.6 平方米，大气压在上面留下的总压力约 1.6×10⁵ 牛、合十几吨重，人之所以没有被压扁，是因为体腔与体液内部的压强与外界随时平衡——大气压不是只从上面压下来，而是四面八方都在压，这与「液体压强」里同一深度各方压强相等的结论同源。",
            en: "Air has weight and flows, so gravity holds it in a shell around Earth where, like a liquid, it presses in every direction. This is atmospheric pressure, about 1.01×10⁵ Pa, or 101.3 kilopascals, at sea level. Torricelli measured it first: in 1644 he filled a roughly one-metre tube closed at one end with mercury, inverted it into a dish, and the column fell to a level about 760 mm above the dish, leaving near-vacuum above it — the Torricellian vacuum. His p=ρgh gives 13600×9.8×0.760, precisely 1.01×10⁵ Pa. The experiment carries its own control: if the atmosphere is holding the mercury up, water would need a tube over ten metres long (101325/(1000×9.8) is about 10.3 m), and that number fixes the limit of every suction pump. In 1654 von Guericke staged the Magdeburg hemispheres publicly, evacuating two copper shells that needed eight pairs of horses — sixteen in all — to part; a hemisphere of 0.25 m radius presents some 0.2 m², so the air pressed with roughly 2×10⁴ N, a two-tonne pull. Suction cups, drinking straws and pumps all run on pressure differences, though one phrase should be corrected: sipping is not pulling the drink up but lowering the pressure in your mouth so the atmosphere pushes the liquid up, and a piston pump likewise makes a low-pressure region for the water to rise into, yet one atmosphere can lift water only about 10.3 m. That is the ceiling on suction lift, which is why deep wells use centrifugal pumps with the impeller dropped below the waterline, submersible pumps, or staged lifting, while tall buildings do the opposite and feed from a roof tank or a booster set — a 30 m head supplies about 2.9×10⁵ Pa, matching domestic water pressure of 0.2 to 0.4 MPa. Pressure falls with altitude because the column overhead shortens; near the ground each 12 m of climb drops the mercury about a millimetre. Lhasa at 3650 m sees roughly 60 kilopascals, so water boils at 86 ℃ and rice undercooks, which is why a sealed pressure cooker raises the pressure to about two atmospheres and the boiling point to some 120 ℃, as the entry on changes of state records. Airliners cruising at ten kilometres must pressurise the cabin to the equivalent of two or three thousand metres, or crew and passengers are incapacitated within minutes. Two instruments serve: the mercury barometer, the most accurate and long used by weather services, and the aneroid barometer, where an evacuated metal box breathes with pressure, portable and — given an altitude scale — an altimeter, the same device in watches and aircraft. One last question: our roughly 1.6 m² of skin bears some 1.6×10⁵ N, a dozen tonnes of push, and we are not crushed because internal pressures balance it everywhere at once. The atmosphere presses from all sides, not merely downward, exactly as liquid pressure at a given depth acts equally in every direction.",
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
            zh: "浸入液体或气体里的物体受到向上的托力，叫浮力，其大小由阿基米德原理给出：F浮=ρ液gV排，即浮力等于物体排开的那部分流体所受的重力，式中 ρ液 是流体密度、V排 是排开流体的体积。这一定律的出处是叙拉古国王希耶罗二世怀疑金匠在王冠里掺了银，阿基米德在浴室里注意到水被身体排开，想到用等重的纯金块与王冠各放入盛满水的容器比较溢出的水量——掺银的王冠体积更大、溢水更多，密度之说由此落地，后来他写成《论浮体》。实验上最常用的判据是称重法：先在空气中称出物重 G，再浸没在液体里称得示重 F示，则 F浮=G−F示。浮力的来源不是某种新力，而是「液体压强」的直接后果：下表面所处的深度更大、压强更大，上下表面的压力差合出一个向上的力，侧向的压力则逐对抵消。浮沉要看两个量的比较：浸没时若 F浮小于 G 就下沉，相等则悬浮在任何深度，大于则上浮，最后露出液面达到漂浮，此时 F浮=G 且 V排 只算浸入部分。所有能浮的器械都是在调这两个量之一。轮船把钢材做成空心，让几千吨钢板排出上万吨海水——排水量一万吨的轮船排开 10⁷ 千克水，浮力约 9.8×10⁷ 牛，恰与船重相抵；从海里驶入河里，水密度从约 1025 降到 1000 千克每立方米，排开体积必须增大，吃水随之加深约百分之二点五，所以船身上同时标有海水与淡水两条吃水线。潜水艇走的是另一条路：水舱灌海水就下潜、用高压气吹出水就上浮，它改变的是自身重力而浮力几乎不变。气球与飞艇靠空气浮力，1 立方米氢气受到约 12.6 牛浮力、氢气自身只重约 0.9 牛，净举力约 11.8 牛，热空气每秒只能挣出约 1.9 牛，所以热气球必须做到几万立方米。密度计漂浮时重力不变，浮力也就必须不变，液体越密它排开越少、露出越多，因此刻度上小下大、且因深度与密度成反比而不均匀。几个日常判据：死海盐度高达两成以上、密度约 1.2×10³ 千克每立方米，人能仰浮在水面；农业用适当浓度的盐水选种，饱满种粒密度大而下沉、虫蛀空粒上浮；冰山水下部分约占九成（917/1025≈89.5%），故“冰山一角”有真实的数字依据；汤圆与饺子煮熟浮起，是因为受热后内部气体膨胀、体积变大而重力几乎不变。两处易错必须点明：一是物体一旦完全浸没，浮力就与深度无关，“越深浮力越小”是错的，下沉时变的是压强而不是浮力；二是沉底的物体依然受浮力，除非它的下表面与容器底紧密贴合、液体进不去（打入河床的桥墩就是这种情形，这也是浮力公式的前提之一）。",
            en: "A body immersed in a liquid or a gas is pressed upward by buoyancy, whose size Archimedes' principle fixes: the buoyant force equals the weight of the fluid displaced, F = rho-fluid × g × V-displaced, where rho is the fluid's density and V the displaced volume. The story is Hiero II of Syracuse suspecting that a goldsmith had adulterated his crown, and Archimedes noticing in a bath how water gave way to his body: weighed against an equal lump of pure gold, the crown overflowed more water, meaning a larger volume and so a lower density — a test he later formalised in On Floating Bodies. The laboratory criterion is the weighing method: find the weight in air G, then the reading while immersed, and the buoyant force is their difference. Buoyancy is no new kind of force but the direct consequence of liquid pressure — the lower face sits deeper, feels more pressure, and the difference of the two faces sums to an upward push while sideways pushes cancel in pairs. Whether a body rises or sinks compares two quantities: submerged, it sinks if buoyancy falls short of weight, hangs suspended if they match, rises if buoyancy wins, and finally floats with buoyancy equal to weight and only the immersed volume counting as displaced. Every floating machine tunes one of them. Ships hollow out steel so thousands of tonnes of plate can displace tens of thousands of tonnes of water: a liner of 10 000 tonnes displacement pushes aside 10⁷ kg of seawater, giving 9.8×10⁷ N of lift to balance its weight, and steaming from sea into river, where density drops from about 1025 to 1000 kg per cubic metre, must displace more and so sits some 2.5 per cent deeper — hence separate salt and fresh water load lines on the hull. Submarines take the other route, flooding ballast to dive and blowing it out with high-pressure air to surface: they change their own weight while buoyancy barely moves. Balloons and airships ride air's buoyancy — a cubic metre of hydrogen is lifted with about 12.6 N and weighs only 0.9 N of itself, a net 11.8 N, whereas hot air earns barely 1.9 N, which is why hot-air envelopes must reach tens of thousands of cubic metres. A hydrometer floats with fixed weight and therefore fixed buoyancy, so denser liquids displace less and it stands higher: its scale reads small at the top, large at the bottom, and is uneven because depth varies inversely with density. Everyday tests: the Dead Sea, over one fifth salt and about 1.2×10³ kg per cubic metre, holds a person on its surface; farmers brine-sort seed so plump grains sink and worm-eaten ones float; nine tenths of an iceberg (917/1025 is 89.5 per cent) lies below the waterline, giving 'tip of the iceberg' an honest number; dumplings and glutinous balls rise when cooked because heating expands their volume while their weight hardly changes. Two slips must be named. Once a body is fully submerged buoyancy stops caring about depth — 'deeper means less lift' is wrong; what grows with depth is pressure. And a sunken body still feels buoyancy unless its underside is sealed against the container floor so no fluid gets in, the case of a bridge pile driven into riverbed mud, which is itself a hidden premise of the formula.",
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
            zh: "在同一个稳定流动里，流速大的地方压强小，这就是流体压强与流速的关系，1738 年丹尼尔·伯努利在《流体学》中给出这一结论，今天常见的公式形式由欧拉在十八世纪中叶整理出来：沿同一条流线，p+½ρv²+ρgh 保持不变，三项分别是压强能、动能与势能的份额，所以它的实质是能量守恒在流体里的写法（口径见「机械能守恒」条）。使用前提要写足：同一流体、稳定流动、不可压缩、比较的两点在同一条流线上，四个条件少一个就不能直接下结论。机翼升力是最有名的例子：教材按“上表面凸、气流路程长而流速大、压强小”讲它，严格说法还要补一句——升力同时来自机翼把气流往下偏折，被偏折的空气给机翼向上的反作用（见「牛顿第三定律」条），压差与偏转本是同一件事的两面，而“上下两股空气必须同时到达后缘”的等时假设并不成立。攻角是机翼与来流的夹角，增大攻角能增大升力，超过约十几度后气流在上表面分离、升力骤降，就是失速。算一笔账：6×10⁴ 千克的客机需要约 5.9×10⁵ 牛升力，摊在 125 平方米的机翼上只需约 4.7×10³ 帕的压强差，不到大气压的百分之五；按 Δp=½ρ(v₂²−v₁²) 反推，若下表面气流约 70 米每秒，上表面约 113 米每秒就够了。两船并行之所以相吸，是中间水道变窄、流速增大、压强降低（判据在「流量与连续性」条），十九世纪初以来多起轮船与军舰贴近相撞都被这样解释，因此各国都规定了追越时的横距；火车站与地铁站的安全线同理，列车以 80 千米每小时（约 22 米每秒）掠过时，人身迎风面与背风面的压差可达约 290 帕，作用在 1 平方米上就是约 290 牛的推力，足以把人推向轨道。足球的香蕉球与乒乓球的上旋下旋出自同一机理：旋转的球带动边界层空气，两侧流速不等便有了侧向压强差，这叫马格努斯效应。喷雾器、化油器与老式香水瓶靠的是“低压抽液”：高速气流经过细管口使管口压强低于大气压，液体被压上来并被吹散成雾。飞机的空速管（皮托管）把迎面气流的总压与侧孔的静压相减，用 v=√(2Δp/ρ) 反算速度，压差 3000 帕约对应 71 米每秒即 255 千米每小时，赛车与风力发电测试也用同一把尺。大风掀掉屋顶也是这条规律：屋面上方风速大而屋内气压照常，30 米每秒的风在 100 平方米屋面上能交出约 5.5 吨的举力，所以抗风设计要算屋面的向上净压。两处易错要挑明：一、不能拿两处的“流速”和「压强」随意配对比较，必须在同一流线上，否则会出现“吹两张纸反而分开”这类误判；二、气体压强变化大时密度也变，伯努利式要修正，超音速流动另有规矩。",
            en: "Within one steady flow, faster fluid presses less: this is the relation between fluid speed and pressure, given by Daniel Bernoulli in his Hydrodynamica of 1738 and written into today's form by Euler in the mid eighteenth century — along a single streamline, p plus a half rho v-squared plus rho gh stays constant, the three terms being shares of pressure energy, kinetic energy and potential energy, so the statement is really energy conservation told for fluids, the same ledger as the entry on conservation of mechanical energy. Its conditions must be stated in full: one and the same fluid, steady flow, essentially incompressible, and both comparison points lying on the same streamline; drop any of them and the conclusion no longer follows. Lift on a wing is the famous case. Textbooks say the curved upper surface makes air travel farther and faster, so pressure falls; the rigorous version adds that a wing also deflects the oncoming air downwards and the deflected air pushes the wing up (see the entry on Newton's third law), pressure difference and deflection being two faces of one fact, while the 'equal transit time' claim — that two parcels parted at the leading edge must reunite at the trailing edge — is simply false. Angle of attack, the tilt between wing and oncoming flow, raises lift until some ten-odd degrees, when the flow separates from the upper surface and lift collapses: that is a stall. Do the arithmetic. A 6×10⁴ kg airliner needs about 5.9×10⁵ N, and spread over 125 m² of wing this is a pressure gap of only 4.7×10³ Pa, under five per cent of an atmosphere; inverting delta-p equals a half rho times the difference of squares gives about 113 m/s over the top where the underside sees 70 m/s. Two ships running parallel are drawn together because the narrowed channel speeds the water and lowers its pressure — the criterion belongs to the entry on flow rate and continuity — and close-quarter collisions between ships have been read this way for two centuries, which is why passing distances are legislated. Platform safety lines follow the same rule: a train arriving at 80 km/h, some 22 m/s, can leave a pressure gap near 290 Pa across a person, roughly 290 N pushing on one square metre of chest, quite enough to shove someone onto the track. The bending free kick and the spinning ping-pong ball come from the same mechanism, the Magnus effect: a spinning ball drags boundary-layer air so the two sides differ in speed and therefore in pressure. Atomisers, carburettors and old perfume bulbs all draw liquid up into a fast stream, where the nozzle pressure falls below atmosphere and the liquid is lifted and shredded into spray. An aircraft's pitot tube subtracts static pressure from the stagnation pressure it gathers head-on and recovers speed as v equals the square root of two delta-p over rho: 3000 Pa of difference corresponds to about 71 m/s, near 255 km/h, and the same probe serves racing cars and wind-turbine tests. Roofs torn off in storms are Bernoulli's too: fast wind above an intact pressure indoors, and 30 m/s over 100 m² yields a lifting force around five tonnes, so wind-resistant design counts that upward net load. Two errors deserve naming. You may not pair 'speed here' with 'pressure there' at will — the comparison must run along one streamline, otherwise demonstrations such as blowing between two sheets get misread. And when a gas changes pressure greatly its density changes as well, so Bernoulli's equation needs correction and supersonic flow plays by different rules.",
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
            zh: "液体表面层像一张被绷紧的薄膜，这个说法背后是很具体的分子账：表面层的分子与内部分子相比，上方缺少同伴，受到内部分子的引力没有被抵消，于是整层被往里拉，表面自发收缩，宏观上就表现为沿表面切向作用的张力。描述它的物理量是张力系数 σ，定义为一段边界单位长度受到的拉力，单位牛每米，也可看成每增加一平方米表面所需的能量；水在 20 ℃ 时约 0.073 牛每米，肥皂水降到约 0.025，酒精约 0.022，水银高达约 0.46，所以水银滴圆得发硬。正因为表面要收缩，同体积下表面积最小的形状就是球形，露珠、熔化的金属滴与蜡滴才都收成球。弯曲表面还会造成压强差，球面的附加压强为 Δp=2σ/R，半径 1 毫米的水泡内外只差约 146 帕，与大气压相比是千分之一，可一旦半径缩到微米量级，这个压差就爬到与大气压可比的地步——表面效应在小尺度上称王，这也是两个相同的小气泡相连后小者会被大者吸空的原因。表面张力能托住比水重的东西：缝衣针或单面刀片小心地横放在水面上可以浮着，它排开的体积微小到浮力几乎为零，靠的全是这张膜；一只约 20 毫克的水黾六条腿压在面上，与水面接触的总长约 2 厘米，σL 最多能交出约 1.5×10⁻³ 牛的向上托力，是它体重的七倍上下。这里必须分清浮力与表面张力两种机制，「浮力与阿基米德原理」条管的是排开液体的重力。与表面紧密相关的一对概念是浸润与不浸润：液体与固体接触的附着层里，若固体分子对液体分子的引力强过液体内聚力，附着层就扩张、液面贴壁铺开，称浸润，水对洁净玻璃、酒精对大多数表面都属此类，接触角小于 90°；反之附着层收缩、液体缩成团，称不浸润，水银在玻璃上、水在蜡与荷叶上都是典型，接触角大于 90°。荷叶把不浸润推到极致：叶面微米级的乳突与蜡质共同把接触角抬到 150° 以上，滚落的水珠顺带粘走灰尘，这就是自洁的荷叶效应，它与「毛细现象」条同源，都发生在附着层上。工程与家务里的应用也多依此：焊接时撒的助焊剂既除氧化膜又降低熔融锡的表面张力，让锡铺开润湿铜面；肥皂与洗涤剂一方面把水的张力压下一大截、使水能钻进织物缝隙，另一方面靠分子一端亲水一端亲油把油污乳化成微小液滴（乳化本身在「万物化学」科目里另有说法）；陶瓷注浆、油漆涂装、 打印纸张吸墨、土壤持水都涉及同一枚硬币的两面。三条易错：一、表面张力的方向沿液面切向、不是垂直压向液面；二、它是分子引力的宏观表现，而不是分子斥力；三、温度升高时张力系数明显下降，热水比冷水更容易润湿与铺开。",
            en: "A liquid's surface behaves like a stretched skin, and the molecular bookkeeping behind that image is concrete: a molecule in the surface layer lacks neighbours above, so the pull of the liquid below it is not cancelled and the whole layer is dragged inward, the surface contracting of its own accord and showing up macroscopically as a force tangent to the surface. The quantity describing it is the tension coefficient, defined as the pull per unit length of boundary in newtons per metre, or equivalently the energy needed to create a square metre of fresh surface: water at 20 ℃ sits near 0.073 N/m, soapy water falls to about 0.025, alcohol to 0.022, mercury climbs to roughly 0.46, which is why mercury beads look rigidly round. Because the surface is trying to shrink, the shape with least area for a given volume wins, and dewdrops, molten metal droplets and wax drops all pull themselves spherical. A curved surface also costs pressure: for a spherical interface the extra pressure is two sigma over R. A one-millimetre bubble differs from its surroundings by only about 146 Pa, a thousandth of an atmosphere, yet shrink the radius to micrometres and that gap grows to atmospheric scale — surface effects rule the small world, which is why two connected small bubbles empty the smaller into the larger. Surface tension can hold up things denser than water: a sewing needle or a single-edge blade laid carefully on the surface will stay afloat though the buoyant force from displaced liquid is negligible, carried entirely by the film; a water strider of some 20 milligrams presses six legs onto the surface over a total contact length near two centimetres, so sigma times length supplies up to about 1.5×10⁻³ N, some seven times its weight. Buoyancy and film tension must be kept apart here — the entry on buoyancy counts the weight of displaced fluid, this one counts a skin. A closely related pair of ideas is wetting and non-wetting. In the adhesion layer touching a solid, if the solid's pull on liquid molecules beats the liquid's cohesion, that layer spreads and the liquid climbs and flattens — we call it wetting, as water does on clean glass or alcohol on nearly anything, contact angle below 90 degrees; when the adhesion layer contracts instead, the liquid balls up — non-wetting, as mercury on glass or water on wax — with contact angle above 90 degrees. The lotus pushes non-wetting to its limit: microscopic bumps plus a wax coating lift the contact angle past 150 degrees, so rolling beads gather dust and clean the leaf, the self-cleaning lotus effect, whose mechanism is shared with the entry on capillary action since both live in the adhesion layer. Applications turn on the same coin's two faces: flux in soldering both strips the oxide film and lowers the surface tension of molten tin so it wets copper; soap and detergents cut water's tension sharply so it penetrates cloth, while their molecules — water-loving at one end, oil-loving at the other — emulsify grease into tiny droplets, a chemist's topic in its own right; slip casting of ceramics, painting, ink-jet paper and soil moisture all obey the same rules. Three slips are worth naming. Surface tension acts tangentially along the surface, never pressing perpendicular into it. It is the macroscopic face of molecular attraction, not of repulsion. And the coefficient falls visibly as temperature rises, which is why hot water wets and spreads better than cold.",
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
            zh: "把细管插进能浸润它的液体里，液面会自己升到高于容器液面，管子越细升得越高；换成不浸润的液体（如水银在玻璃管里），液面反而被压低——这就是毛细现象，常见于半径零点几毫米以下的细管、缝隙与多孔材料。它的成因是「表面张力」与浸润两件事的合力：浸润的液体在附着层被管壁拉向上方，弯月面因此凹下去，一张绷紧的膜在弯曲面上交出附加压强，把液体往上提，直到被提起的液柱重力把压强差抵消为止。把这个平衡写成公式就是 h=2σcosθ/(ρgr)，式中 σ 为张力系数、θ 为接触角、r 为管半径。数值最能说明它有多依赖尺度：水在半径 0.1 毫米的玻璃管里约升 15 厘米，10 微米的管里约 1.5 米，1 微米的缝里理论上可达 15 米；同样道理，砖块、混凝土、石膏板能把地下水沿孔隙举到墙上，形成“返潮”与盐霜，老建筑的地圈梁与防潮层就是在切断这条通路。生活中的名单还很长：纸巾与吸墨纸吸墨、毛笔与钢笔尖储墨、油灯与酒精灯把燃料从储液池沿棉灯芯举到灯头燃烧、蜡烛芯同理、方糖与面包沿孔隙吸咖啡、土壤里的水分被举到地表蒸发。最后一条牵出一个重要的农业经验：锄松表层土壤是为了切断土壤里的毛细管，让下层水分不再被举到表面白白蒸发，北方农谚所谓“锄头三寸泽”。有一处最常被混谈的账要算清：高大的树木并不是靠毛细现象喝水的。木质部导管的半径在微米量级，按上式毛细至多把水举几米到十几米，而几十米高的红杉要把水送到树冠，主要动力来自叶片气孔蒸腾拉出的水柱张力——水分子之间的内聚力让这条细水柱能够承受拉力而不被拉断，毛细只在幼苗、表层土壤与叶片末端起辅助作用。蒸腾作用在「万物生物」与「万物地理」两科里各有专条，此处只强调力学分工。三条易错：一、毛细上升的高度与管半径成反比，与管长无关，管子太短时液体升到管口就停住而不会喷出来；二、液体必须浸润管壁才会上升，不浸润时方向相反，这也是水银气压计里读数要修正弯月面的原因；三、毛细管必须上端开口与大气相通，封闭的管里被压出的气体很快就会把上升顶回去。",
            en: "Plunge a slender tube into a liquid it can wet and the liquid climbs above the surrounding level, higher the narrower the bore; swap in a liquid the tube will not wet, mercury in glass for instance, and the level is depressed instead. This is capillary action, usual in tubes, slits and porous materials with radii below a fraction of a millimetre. Its cause is the joint venture of surface tension and wetting described in those entries: in the adhesion layer the wetted liquid is tugged upward by the wall, the meniscus turns concave, and a stretched curved skin supplies an extra pressure that lifts the column until the weight of the raised liquid cancels it. Written as an equation the balance reads h equals two sigma cosine theta over rho g r, sigma being the tension coefficient, theta the contact angle and r the tube radius. Numbers show how fiercely the effect depends on scale: water climbs some 15 centimetres in a glass tube of 0.1 millimetre radius, about 1.5 metres at 10 micrometres and in principle 15 metres in a one-micrometre slit. For the same reason bricks, concrete and plaster wick groundwater up into walls, producing damp and salt blooms, which is why older buildings carry a damp-proof course — a deliberate cut across that pathway. The household list runs long: blotting paper and tissues drawing ink, brush and fountain-pen tips holding their supply, oil lamps and spirit lamps lifting fuel along a cotton wick to the burner, candle wicks doing the same, a sugar cube or bread soaking up coffee through its pores, soil raising water to the surface where it evaporates. That last item carries an old farming lesson: hoeing breaks the surface into a loose layer, severing the capillary channels so that subsoil moisture is no longer wicked up and lost — the reason behind the proverb that a hoe holds three inches of rain. One widely confused account must be settled: tall trees do not drink by capillarity. Xylem conduits have radii in the micrometre range, so capillary lift tops out at a few to a dozen metres, whereas a redwood scores of metres high moves water to its crown mainly by the tension drawn by transpiration from leaf pores — cohesion between water molecules lets a thread of sap bear a pull without snapping — capillarity assisting only in seedlings, topsoil and the leaf end. Transpiration has its own entries in the biology and geography subjects; here only the mechanical division of labour matters. Three slips are worth naming. Capillary height varies inversely with radius and not with tube length, so a short tube simply fills to its mouth and stops rather than jetting. The liquid must wet the wall to rise; otherwise the shift is downward, which is why mercury barometer readings are corrected for their meniscus. And the tube must stay open to the atmosphere, since in a closed one the compressed trapped air soon pushes the rise back down.",
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
            zh: "流体的黏性是流体内部阻碍各层相对滑动的“内摩擦”。它与固体摩擦的口径不同：固体的滑动摩擦发生在接触面、大小近似与正压力成正比；黏性阻力发生在流体内部相邻两快慢层之间，与两层的接触面积和速度梯度成正比，写成 F=ηS·Δv/Δx，静止的流体里它完全不露面。描述黏性大小的量是黏度 η，单位帕·秒：水在 20 ℃ 约 1.0×10⁻³，血液约 3 到 4×10⁻³，比水黏三成到四成，蜂蜜约 10、番茄酱更达上百，比水大一万到几万倍，空气约 1.8×10⁻⁵，是水的五十分之一——“黏”与“稠”的日常感觉与数量级关系相当不可靠，酒精与水的黏度同量级却显得“稀”，甘油黏而密度并不特别高。温度效应在两类流体里方向相反，这一点最容易记错：液体升温黏度下降，蜂蜜泡进热水就流动起来，发动机冬天要用低黏度的 5W 机油才转得动；气体升温黏度上升，因为分子热运动更剧烈、层与层之间交换动量更快（与「分子动理论」条的口径一致）。黏性最直观的后果是层流与湍流之分：流线平滑、分层滑行的叫层流，充满旋涡、彼此掺混的叫湍流，判据是无量纲的雷诺数 Re=ρvL/η，圆管里大约 2000 以下层流、4000 以上湍流。算几个例子就明白为什么水管里几乎总是湍流：内径 2 厘米、每秒 1 米的水流 Re 约 2×10⁴，早就过了临界，所以水龙头开到后面水柱会“抖”；而人体主动脉里血流 Re 只有约 500，属层流，瓣膜狭窄处 Re 上千、开始湍，医生用听诊器听到的杂音正是这种湍流的证据；毛细血管中速度只有约 0.5 毫米每秒、直径几微米，Re 低至千分之一量级，黏性完全压过惯性，血流在此最慢也最平稳，气体交换因此得以完成。两条定量规律最常用。一是斯托克斯定律：小球在黏滞流体中低速运动时阻力 F=6πηrv，与「密立根油滴实验」条同源——半径 0.5 微米的油滴在空气里的收尾速度只有约 30 微米每秒，慢到这个地步才让密立根能把单颗油滴反复悬停、倒退着测量它的电荷；而收尾速度本身仍是力学里“阻力增大到与重力相等即匀速”那件事，见「匀速直线运动」条。二是泊肃叶定律：细管中层流的流量 Q=πr⁴Δp/(8ηL)，与管径的四次方成反比，血管半径收缩一半血流量只剩十六分之一，这就是血压调节几乎全靠改变血管口径的道理，也解释了为什么狭窄的血管需要显著更高的压强才能维持供血。工程与自然的例子遍布：机油牌号、润滑与轴承发热、泥浆与混凝土的泵送、船体的摩擦阻力、蜂蜜与熔岩的缓慢流动，而岩浆是极说明问题的一例——硅含量高、黏度大的岩浆里气体跑不出来，压力攒够就爆炸式喷发；玄武岩岩浆黏度低，气体从容逸出，就安静地溢成熔岩流。两条易错要挑明：一、黏度大不代表密度大，两件事互不蕴含；二、静止流体里不表现为黏性力，只有层间发生相对滑动时才有，所以“黏”的是速度差而不是运动本身。",
            en: "Viscosity is internal friction: a fluid's own reluctance to let one layer slide past another. Its accounting differs from that of solid friction, which lives at a contact surface and scales with the normal load, whereas viscous drag arises between neighbouring fast and slow layers inside the fluid, proportional to their contact area and to the velocity gradient, written F equals eta S times delta-v over delta-x, and it stays entirely invisible in a fluid at rest. The measure is the viscosity eta in pascal seconds: water at 20 ℃ about 1.0×10⁻³, blood three to four times that, honey near 10 and tomato sauce into the hundreds — ten thousand to a hundred thousand times water — while air sits at 1.8×10⁻⁵, a fiftieth of water. Everyday words such as 'thick' are unreliable across scales: alcohol feels thin yet is close to water in viscosity, and glycerine is stiff without being unusually dense. Temperature pulls the two classes in opposite directions, the point most often misremembered: liquids thin out when heated — honey runs once warmed in hot water, and engines need low-viscosity 5W oil to turn over in winter — while gases thicken, because faster molecular motion shuttles momentum between layers more briskly, in the same spirit as the entry on kinetic molecular theory. Viscosity's most visible consequence is the split between laminar and turbulent flow: smooth sliding layers against churning, mixing eddies. The criterion is the dimensionless Reynolds number, Re equals rho v L over eta; in pipes flow stays laminar below roughly 2000 and turns turbulent above 4000. A few sums explain why taps are almost always turbulent: water moving a metre per second through a 2-centimetre bore gives Re near 20 000, well past the limit, which is why the jet starts to shake further downstream. Blood in the aorta, by contrast, sits near Re 500 and streams in orderly layers, while a narrowed valve pushes Re past a thousand and turbulence begins — the murmur a physician hears is exactly that turbulence. In capillaries, where speed is about half a millimetre per second across a few micrometres, Re drops to a thousandth, viscosity utterly dominates inertia, and the resulting slowness is what lets gas exchange finish in peace. Two quantitative laws earn their keep. Stokes' law gives the drag on a small sphere creeping through a viscous fluid, F equals six pi eta r v — the same physics as the entry on Millikan's oil-drop experiment: an oil drop half a micrometre in radius falls through air at only some 30 micrometres per second, and it is precisely this slowness that let Millikan hover a single drop and walk it backwards to measure its charge. That steady terminal speed is still the mechanics story of drag growing until it matches weight, as the entry on uniform motion notes. Poiseuille's law says that laminated flow through a thin tube carries Q equals pi r to the fourth delta-p over 8 eta L, so radius matters to the fourth power: halve a vessel and the flow drops to a sixteenth, which is why blood-pressure control works almost entirely by changing vessel calibre, and why a narrowed artery needs a much higher pressure to sustain supply. Examples litter engineering and nature: oil grades, bearing warmth, pumping mud and concrete, a hull's skin friction, honey and lava creeping downhill. Magma makes the case crisply — silica-rich, stiff magma traps its gases until pressure builds and the eruption goes explosive, while runny basalt lets gas escape and simply overflows into lava flows. Two slips to name: high viscosity does not imply high density, the two being unrelated; and viscous force exists only when layers actually slide on each other, so what a fluid resists is the velocity difference, not motion itself.",
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
            zh: "流量指单位时间流过某一截面的流体体积，记 Q=Sv，单位是立方米每秒，家用软管放水约 5 升每秒即 5×10⁻³ 立方米每秒。连续性方程说的是一条守恒：在同一段没有分支、没有源也没有汇的流管里，稳定流动时流过每个截面的流量必须相等，否则流体要么在中间堆积要么被拉断，于是 S₁v₁=S₂v₂，式中 S 为截面积、v 为该截面上的平均流速，结论就是截面积与流速成反比。它的前提同样要写清楚：流体不可压缩（或密度近似不变）、流动稳定、比较的是同一股流体。数值最有说服力：5 升每秒的水在直径 10 厘米的管里平均只有 0.64 米每秒，被压进 2.5 厘米的细管就飙到 10.2 米每秒——速度涨了十六倍，而黏性造成的压强损失大致随速度平方上升，所以给水管不能一味缩径，泵要为此多付功（代价见「流体的黏性」条）。日常与工程现象一串可举：用手指捏窄水管口，水柱变细而出口速度更大、射程更远，园林喷嘴与洗车水枪就是这个把手，要注意的是流量并没有变大，变的只是速度与形态；河流在狭窄处水急、在开阔处水缓，航行的船只在浅窄航道里会被加速并难以操纵；地铁列车进站的瞬间像一支巨型针筒，把隧道里的空气沿活塞效应推向站台，站台门与通风口的布置正是按这条规律设计的；火箭与喷气发动机的喷管先收缩后扩张，称为拉瓦尔喷管。最后一条需要一个补充：气体速度接近或超过声速时密度不能再当作常数，守恒式要写成 ρ₁S₁v₁=ρ₂S₂v₂，于是在超音速段“截面越大速度反而越快”，与低速水的直觉正好相反，这正是喷管必须先收后放的原因。生物体也按同一式子分配流速，但要看清一个陷阱：血管与气管一级级分支，单根越来越细，可是分支数量增加得更快，总截面积反而逐级增大，因此速度逐级下降——全身最慢的血流出现在总截面最大的毛细血管网，肺里气流在肺泡附近近乎停下，两者都为了让交换有时间发生，这与「流体的黏性」条里毛细血管雷诺数极低的说法互相印证。三条易错要点明：一、连续性讲的是同一股流体在两个截面之间的比较，不能拿来比两根不同的管或两台不同的泵；二、截面积小处速度大并不表示流量大，各截面流量处处相同；三、它只在不可压缩与稳定流动的前提下精确成立，有水锤、进气或可燃混合气脉动的场合要另行处理。",
            en: "Flow rate is the volume of fluid crossing a given section per second, Q equals S v, in cubic metres per second; a garden hose letting out five litres a second is running at 5×10⁻³ cubic metres per second. The continuity equation states one conservation claim: inside a stretch of flow that branches nowhere and has neither source nor sink, steady motion must carry the same flow rate through every section, otherwise fluid would pile up or snap apart, hence S1 v1 equals S2 v2, where S is cross-sectional area and v the mean speed over it, and the consequence is that area and speed trade inversely. Its premises deserve writing down as well: the fluid is incompressible or nearly so, the flow is steady, and the comparison concerns one and the same stream. Numbers carry the argument. Five litres a second moves at an average 0.64 metres per second in a 10-centimetre pipe but shoots to 10.2 metres per second squeezed into a 25-millimetre bore — sixteen times faster, while viscous loss of pressure rises roughly with the square of speed, so supply pipes cannot simply be narrowed and the pump must pay extra work for it, the cost recorded in the entry on viscosity. A string of familiar cases follows. Pinching a hose's mouth makes the jet thinner and faster and it reaches farther, the trick behind lawn nozzles and car-wash lances, though the flow rate has not grown — only the speed and the shape of the stream. Rivers quicken in narrows and slacken in open reaches, which is why ships feel pulled and hard to steer in a shallow constricted channel. A metro train entering a station acts as a giant syringe, ramming tunnel air ahead of it onto the platform by piston effect, and platform doors and ventilation grilles are laid out by exactly this rule. Rocket and jet nozzles contract then expand, the de Laval shape. That last case needs a supplement: once gas speed approaches or exceeds sound, density can no longer be treated as constant, the conservation law becomes rho1 S1 v1 equals rho2 S2 v2, and in the supersonic leg a wider section means a faster flow — the opposite of the low-speed water intuition, which is precisely why the nozzle must first pinch and then flare. Living bodies apportion speed by the same equation, but here a trap must be cleared. Blood vessels and airways branch level after level, each tube getting thinner, yet the number of branches grows faster still, so total cross-sectional area climbs stage by stage and speed falls stage by stage: the slowest blood in the body is in the capillary bed, which has by far the greatest total area, and airflow in the lung all but stalls near the alveoli, both because exchange needs time. That agrees with the capillary Reynolds numbers so tiny that viscosity rules, as the entry on viscosity notes. Three slips deserve naming. Continuity compares two sections of one and the same stream, not two different pipes or two different pumps. A smaller area with a higher speed does not mean a bigger flow rate, since the rate is the same everywhere along the stream. And it holds exactly only for incompressible, steady motion; water hammer, ingested air or pulsing fuel mixture each require separate treatment.",
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
            zh: "以米、千克、秒等七个基本单位为基础的统一计量体系，1960 年定名国际单位制（SI）。七家基本单位：米 m、千克 kg、秒 s、安培 A、开尔文 K、摩尔 mol、坎德拉 cd，其余物理量的单位都由它们导出——牛顿 N=kg·m/s²、焦耳 J=N·m、瓦特 W=J/s。米的定义三度换代：先是地球子午线的千万分之一，1960 年起改用氪-86 谱线波长，1983 年定格为“光在真空中 1/299792458 秒走过的路程”，即 299792458 米每秒——这不是测出来的数，而是人为规定、让米去迁就光速。秒锚在铯-133 基态超精细能级跃迁的 9192631770 个周期，一个周期约 0.109 纳秒；千克沿用一立方分米水的质量起步，1889 年起由铂铱合金国际千克原器执掌，2019 年重定义把七个基本单位全部锚到常数：h=6.62607015×10⁻³⁴ J·s 精确成立，复现用基布尔秤把力学量折回 h。易错点有三：用原器定义千克（它曾凭空漂移几十微克）、把单位符号的大小写写错（来源是人名才大写，N、Pa 大写，m、s 小写）、以及导出单位不统一写法——物理计算第一步永远是“先统一单位再代数”。再补两个常锚：开尔文锚在玻尔兹曼常数 k=1.380649×10⁻²³ J/K，绝对零度即 −273.15 ℃、水的三相点 273.16 K 这些数字如今都是定义的推论；坎德拉锚在 540 太赫兹绿光的发光效能 683 流明每瓦。安培在 2019 年前靠“两根无限长平行导线间的作用力”定义，如今改为元电荷 e=1.602176634×10⁻¹⁹ 库仑的推论——“无限长导线”这种理想化退出历史，正是常数定义的连带清理。日常换算也归它管：光年走的全是时间乘以速度的账，1 光年约 9.46×10¹⁵ 米；人步行 1 米每秒、合 3.6 千米每时——换算因子 3.6 与“千”“时”的幂次一一对应，先换单位再代数，一半的计算错误就此绝迹。",
            en: "A unified system built on seven base units including metre, kilogram and second, named SI in 1960. The seven: metre m, kilogram kg, second s, ampere A, kelvin K, mole mol, candela cd; every other unit is derived — newton N=kg·m/s², joule J=N·m, watt W=J/s. The metre changed anchors three times: a ten-millionth of the meridian, then a krypton-86 spectral wavelength (1960), and since 1983 “the distance light travels in 1/299792458 of a second” — the speed of light fixed at exactly 299792458 m/s, a human stipulation rather than a measurement, with the metre made to fit the constant. The second rides on 9192631770 cycles of the cesium-133 hyperfine transition (one cycle ≈ 0.109 ns). The kilogram began as the mass of a cubic decimetre of water, was embodied from 1889 by the platinum-iridium international prototype, and in the 2019 redefinition all seven base units were anchored to constants, with h = 6.62607015×10⁻³⁴ J·s exact and reproduced on a Kibble balance. Three traps: thinking a metal cylinder still defines the kilogram (it drifted by tens of micrograms), miscapitalizing symbols (capitalized only when named after a person: N, Pa, but m, s), and sloppy unit conversion — every physics calculation starts by unifying units. Two more anchors: the kelvin hangs on the Boltzmann constant k = 1.380649×10⁻²³ J/K, so absolute zero at −273.15 ℃ and water's triple point at 273.16 K are now consequences of definition; the candela hangs on 683 lumens per watt at 540 terahertz. Before 2019 the ampere was defined by the force between two infinite parallel wires, and is now a consequence of the elementary charge e = 1.602176634×10⁻¹⁹ C — an idealization (“infinite wires”) retired as a side effect of anchoring units to constants.",
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
            zh: "用基本量的幂次组合检验公式、推导关系并换算单位。等式两边量纲必须一致：速度只能等于长度除以时间，能量量纲 M·L²·T⁻² 与功 mgh 折算一致——若某表达式右边凭空多出一个速度量纲，它必错无疑，这是判断公式最快的筛子。反过来不成立：量纲一致只说明“可能有意义”，推不出系数——量纲法给不出单摆的 2π，也给不出动能的 1/2，无量纲因子在它管辖之外。比例猜测是它最漂亮的一手：单摆周期只可能正比于 √(L/g)，代入 L=1 米、g=9.8 立刻得到约 1 秒的摆动时标，与秒摆实测吻合；惠更斯造摆钟正是先吃定了这个比例。单位换算是它的日常面：1 km/h=1/3.6 m/s、1 度电=3.6×10⁶ J，靠的都是把换算因子写成量纲为 1 的分数。数字锚与教训：1999 年火星气候轨道器坠毁，只因英制冲量与公制牛顿秒在同一张表里握手——统一单位制不是官僚洁癖，是实验与工程的及格线。再练三例：压强 p=F/S 量纲 M·L⁻¹·T⁻²、功率 P=W/t 量纲 M·L²·T⁻³、磁感应强度 B=F/(I·L) 量纲 M·T⁻²·I⁻¹——把公式折算成这四个字母再比左右，是卷子上零成本的检查动作。两个盲区要认账：角速度与频率量纲同为 T⁻¹，量纲一致却意义不同，量纲给不了这层区分；至于“密度乘以体积等于质量”这类恒等式，量纲检验永远放行，它只筛形式错误、不管物理对错。检验的动作要落到纸面：把平抛落地时间猜成 v²/g，右边量纲 L²·T⁻⁴ 对不上时间，一轮除法即判死刑；落体时间只由 h 与 g 决定、和质量无关——量纲法连“质量插不进哪里”都提前说了。换算练习再做两组：1 千瓦时=3.6×10⁶ 焦、1 个标准大气压≈10⁵ 帕，都是把幂次对齐再乘系数。",
            en: "Use powers of base quantities to check formulas, derive relations and convert units. Both sides of an equation must share dimensions: velocity can only be length over time, energy carries M·L²·T⁻² just like the mgh of work — an expression sprouting an extra velocity on one side is certainly wrong, the fastest sieve there is. The converse fails: matching dimensions only means “possibly meaningful,” never the numerical factor. Dimensional analysis cannot supply pendulum's 2π or kinetic energy's 1/2; dimensionless numbers lie outside its jurisdiction. Proportionality guessing is its finest move: a pendulum's period can only scale as √(L/g); with L=1 m and g=9.8 you get a ~1 s timescale at once, exactly the seconds pendulum Huyghens exploited for his clock. Unit conversion is its everyday face — 1 km/h = 1/3.6 m/s, 1 kWh = 3.6×10⁶ J — each a fraction with dimension one. Cautionary anchor: the 1999 Mars Climate Orbiter was lost because pound-force seconds and newton seconds shook hands inside one table. A unified unit system is not bureaucratic fussiness but the passing grade of engineering. Three more drills: pressure p=F/S carries M·L⁻¹·T⁻², power P=W/t carries M·L²·T⁻³, magnetic field B=F/(I·L) carries M·T⁻²·I⁻¹ — folding formulas into these four letters and comparing both sides is a zero-cost check on any exam. Two blind spots to admit: angular velocity and frequency share dimension T⁻¹ yet mean different things, which dimensions cannot tell apart; and identities like “density times volume equals mass” always pass — the sieve catches formal errors, never physical sense.",
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
            zh: "抓住主要因素、忽略次要因素建立的简化对象，是物理学的基本方法。质点、点电荷、光滑面、理想气体、理想电表、原线圈无漏磁，全是理想模型；能否近似取决于问题尺度与精度要求——研究火车从北京到上海的行程可当质点，计算它通过长江大桥的时间则车长不可忽略，同一物体在两个问题里身份不同，没有“谁是质点”的绝对答案，只有“对这个问题而言”的取舍。理想化总有代价，代价在误差分析里还账：绳与滑轮被默认无摩擦无质量、电表被默认不分流不分压、电源被默认内阻为零，哪一天题目不再默认，模型就得当场补项（接上「控制变量法」条所说的“其余条件”）。气体之所以敢称理想，是因为标况下分子平均间距约 3.4 纳米、达到分子直径的十倍上下，相互作用确实稀薄；而“光源近似”成点，靠的是距离远大于发光面尺寸。判断一个模型可不可用，不看它的名字里有没有“理想”二字，只看你能否说出被抹掉的那一半为什么在本问题里可以忽略。数字锚再备三枚：理想气体在高压低温下集体失效，液化就是模型破产的声音；点电荷要求带电体尺度远小于问题距离，均匀带电球壳在壳外可当全部电荷挤在球心，在壳内电场却为零——同一物体，内外两副面孔；电子在原子里不能当“质点”沿轨道运行，其德布罗意波长与轨道尺度相当，质点图像当场作废。另记一条等效链：理想电表的两端是极限——电流表内阻趋于零、电压表内阻趋于无穷，实际表头与之的偏差就是系统误差的出处。数字锚再补两枚：地球在测两地距离时可当质点，在算贴地卫星周期时半径就进了公式——同一物体、两个问题、两副身份；教室空气的分子数用“间距立方占一格”估算，200 立方米的房间约坐 5×10²⁷ 个分子，是阿伏伽德罗常数的百万倍——理想模型不只是简化，也是估算的地基。",
            en: "Simplifications keeping dominant factors and ignoring minor ones — a core physics method. Point mass, point charge, frictionless surface, ideal gas, ideal meters, flux-free transformer primaries: all idealized. Whether an object may be idealized depends on the scale and precision of the question — a train is a point for its Beijing-to-Shanghai journey but not for the seconds it needs to cross a river bridge, so “is it a point mass?” has no absolute answer, only a verdict per problem. Idealization always costs something, and error analysis is where the bill arrives: massless frictionless ropes and pulleys, meters that draw no current, sources with zero internal resistance — assumptions the moment a problem stops endorsing them. Gas earns the word “ideal” because at STP the mean molecular spacing, about 3.4 nm, runs ten times the molecular diameter, so interactions really are feeble; a lamp counts as a point source only when the distance dwarfs its glowing surface. Judge a model not by the word “ideal” in its name but by whether you can say why the half you erased is negligible for this question. Three more anchors: ideal gases fail collectively at high pressure and low temperature — liquefaction is the sound of the model going bankrupt; a point charge demands the body be dwarfed by the distance, and a uniformly charged shell acts as if all its charge sat at the centre outside the shell yet fields zero inside — one object, two faces; an electron in an atom cannot be a point mass orbiting along a track, since its de Broglie wavelength matches the orbit scale. Note too the limiting chain behind ideal meters: an ammeter's resistance tending to zero and a voltmeter's to infinity — the gap between real instruments and those limits is exactly where systematic error is born.",
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
            zh: "测量值与真值之差叫误差，分系统误差与偶然误差，需如实记录有效数字。两类误差来路与解法不同：系统误差源于仪器或方法，测量总是朝同一方向偏——刻度磨损、天平零点未校、电表内阻对电路的干扰，解药是校准仪器、改进方法（换等效电路），平均一百次也平均不掉它；偶然误差源于估读等细枝末节的涨落，方向不定，可用多次测量取平均压低。有效数字要如实反映测量能力：最小刻度 1 毫米的米尺读到一个纸带点距为 12.00 厘米——“12.0”是读准的、“0”是估出来的，末位是存疑位，多一位假数字少一位真数字都不诚实；运算结果不得凭空增加位数，0.0560 是三位有效数字，末尾那个 0 不许省。仪器的分度值决定读数位数：10 分度游标卡尺精确到 0.1 毫米、50 分度到 0.02 毫米、螺旋测微器读到 0.01 毫米再估一位；打点计时器用 50 赫兹交流电，每 0.02 秒打一点，每 5 个点取一个计数点即 0.1 秒。数字锚：秒表读数 9.8 秒与 9.80 秒传达的精度不同。易错是把误差笼统说成“偏大偏小”——严格的说法是不确定度，但中学阶段按“误差”分析仍成立。相对误差把两件事连起来：用毫米尺量 1 米，估读半毫米的相对误差约万分之五；用量筒量 5 毫升，1 毫升分度的相对误差达两成——同一个“估读一位”，精度天差地别，有效数字正是把这种差别写进位数的约定。系统误差的方向可以预判：刻度受热膨胀尺变长，读数偏小；伏安法里电流表分压让电阻测量偏大、电压表分流让电阻测量偏小——“偏大偏小”四个字背后各有机理。实验收尾要先排主次：最大误差来源是哪一项、该不该换仪器重测，这也是实验题评分真正的考点。数字锚收尾两枚：从毫米尺、50 分度游标到螺旋测微器，分辨率 1 毫米、0.02 毫米、0.001 毫米三级跳，三级工具对应三道题的读数规则——游标不估读、螺旋要估读；有效数字运算短板原则一句话：加减看小数位最少的那个，乘除看有效位数最少的那个，结果的“真”永远由最弱一环定。",
            en: "Difference from the true value; systematic and random types, recorded with significant figures. The two kinds come from different places and yield to different remedies. Systematic error lives in the instrument or the method and always pushes one way — a worn scale, an uncalibrated balance zero, meter resistance loading the circuit; the antidote is calibration and a better circuit, and averaging a hundred times will not average it away. Random error comes from the flicker of reading details, points no fixed way, and shrinks when you average repeated trials. Significant figures must honestly report the instrument's power: against a 1 mm ruler a tape interval reads 12.00 cm — “12.0” is certain, the last “0” is estimated; the final digit is the doubtful one, and padding or truncating it is dishonest arithmetic. The scale step fixes the digits: a 10-division vernier resolves 0.1 mm, a 50-division one 0.02 mm, a micrometer 0.01 mm plus one estimated digit; a ticker timer on 50 Hz mains dots every 0.02 s, and counting every fifth dot gives a tidy 0.1 s. Writing 9.8 s and 9.80 s by stopwatch is not the same claim. Careful wording: strictly this is uncertainty, not “a bit too big,” though school-level error analysis stands. Relative error ties the threads together: half a millimetre of estimation against a metre read on a millimetre ruler is about five parts in ten thousand, while one millilitre of estimation in a 5 mL graduated cylinder is twenty percent — the same “one estimated digit,” worlds apart in precision, and significant figures are the convention that writes this difference into digit counts. Systematic error even has predictable direction: a ruler that expands when hot reads small; in volt-ampere resistance measurements, the ammeter's voltage share inflates the result while the voltmeter's current share deflates it. When an experiment closes, rank the error sources first — which term dominates and whether to swap instruments is what error questions really grade.",
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
            zh: "多因素问题里只让一个量变、其余保持不变，再逐个排查因果关系。探究加速度与力、质量的关系是教科书范例：先保持小车质量不变找 a 与 F 的正比，再保持拉力不变找 a 与 m 的反比，纸带上用逐差法取数，最后合成一条规律。它也是判定实验有没有可比性的尺度——只说“变大变小”而不说明其余条件相同，结论便不能成立；比较不同材料电阻率之前，必须先把长度与横截面积说成同值。操作层面的坑在“其余”二字：研究滑动摩擦力与接触面粗糙程度的关系，压力必须同值，弹簧秤要沿水平方向匀速拉动（借二力平衡读摩擦）；探究落体时把纸揉成团与平纸同高释放，变的其实不是“形状”，而是空气阻力与重力的比值这一自变量。同一思路支撑大量入门实验：电阻与材料、长度、横截面积的关系，蒸发快慢与温度、表面积、气流的关系。与理想模型分工：那条把对象简化，本条把原因分离；易错点也有两条——漏掉未控制之量，和“控制了却没测量”（不变量同样要记录在案）。数字锚一例：探究电阻与长度的关系，若在同一根电阻丝上取不同长度段，横截面积与材料确实不变，控制的账就干净；若换了不同粗细的镍铬线，长度与横截面积同时变动，两条结论都无法从这堆数据里长出。对照组的说法同属此法：测有薄膜与无薄膜的蒸发快慢，两杯水须同温同面同风，缺一不可。最后警惕“隐性共变”——斜面实验中把木板侧放以改变接触面，倾角其实也悄悄变了；控制变量的功夫，大半藏在这类看不见的联动里。数字锚再补一枚：逐差法处理纸带六段位移，本质是“隔三项相减再取平均”，既把六段数据全部用上，又把起点累积的偶然误差折进差里消掉——它是“多次测量取平均”在等间隔过程上的变体，与“控制其余条件”同属一个家族的两种功夫。操作红线一条：弹簧秤读数时视线垂直刻度面板、沿水平方向匀速拉动，加速读数会把摩擦与惯性搅成一锅。",
            en: "Vary one factor while holding the rest fixed, then test each cause in turn. The classic case is finding how acceleration depends on force and mass: keep the cart's mass fixed to show acceleration proportional to force, keep the force fixed to show it inversely proportional to mass, reading the tape by successive differences, then merge the two. It is also the yardstick for whether a comparison is fair — “it got bigger” without holding everything else equal proves nothing; before comparing resistivities you must state that length and cross-section were kept the same. The trap sits in the word “rest”: when testing friction against surface roughness the normal load must match, the spring balance must pull horizontally at constant speed (reading friction through two-force balance); when dropping a flat sheet beside a crumpled one from the same height, the variable you truly moved is not “shape” but the ratio of air drag to weight. The same logic underpins most introductory experiments, from how resistance depends on material, length and cross-section to how fast water evaporates with temperature, surface area and airflow. Where idealized models simplify the object, this method separates the causes — and the two school mistakes are a silently varied factor and an unrecorded constant. One numeric anchor: probing how resistance depends on length is clean if all segments are cut from one wire — material and cross-section genuinely unchanged — but if wires of different thickness are swapped in, length and cross-section move together and neither conclusion can grow from the data. Control groups obey the same rule: comparing evaporation with and without an oil film demands equal temperature, surface area and airflow. Beware hidden co-variation too: standing a board on its side to change the contact surface has quietly changed the incline as well — most of the craft of controlling variables hides in such invisible linkages.",
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
            zh: "用时间趋于零的比值定义瞬时量，把曲线过程切成无限小段再累加。平均速度 Δx/Δt 在 Δt 足够小之后的极限就是瞬时速度，v–t 图上某点切线的斜率就是该时刻的加速度——极限法把“变速”定住为“某一时刻的不变”。实验里的对应物是光电门与高速摄影：用 1 毫秒内的平均速去代瞬时值，对日常加速度误差只在百分之几量级，段取得越短越逼真，但“足够小”三个字永远要交代。反向使用就是微元法：求匀变速位移时把过程分成许多小段、每段当匀速处理，段数从 4 增到 100 逐次细化，小矩形越贴近 v–t 图下的面积——这就是积分思想的物理入口；微元的要义是“以恒代变”，段内越平缓近似越服帖。伽利略的外推法补上第三环：斜面倾角推到 90 度即自由落体、推到水平即得惯性定律（见「伽利略斜面实验」条）。易错有二：把极限理解成“足够小就收手”——极限是无限趋近的过程而非某个很小的数；以及在小结里用 Δx/Δt 直接代瞬时值却不说明段内变化是否剧烈，近似便失去依据。数字锚两枚：光电门配 5 厘米宽挡光片，计时 0.05 秒得 1 米每秒，换成 1 厘米片同速测得 1.002——片越窄越近瞬时；匀变速里“平均速度等于中间时刻的瞬时速度”是极限思想的精确落点，而中间位置的速度比它大，两条易混。微元法还能推导向心加速度：把一小段弧上的速度三角形与位移三角形相似，取极限即得 a=v²/r——微元不只是求面积，也求变化率的方向。数字锚再补两枚：位移测量里“足够小”可以算账——加速度 2 米每二次方秒，段取 1 毫秒，平均速与瞬时速偏差约 2×10⁻³ 米每秒；段取 100 微秒，偏差缩到 2×10⁻⁴——想压误差十倍，段长就要缩十倍，这就是“极限是过程不是数”的算术版本。外推的边界同样要交代：倾角超过 90 度、推到“负角”，便不再是斜面问题的合理外推。",
            en: "Define instantaneous ratios as the interval shrinks to zero, then chop a curved process into tiny pieces. Instantaneous velocity is the limit of Δx/Δt as the interval shrinks, and the tangent's slope on a v–t graph is the acceleration at that instant — the limit method pins a changing motion to a definite value. In the lab this is the photogate or high-speed frame: a 1 ms average stands in for the instantaneous value with an error of a few percent for everyday accelerations, and the shorter the slice the better — but “short enough” must always be stated. Used in reverse it is the element method: to get the displacement of an accelerating motion, split it into many short stretches, treat each as uniform; as the strips multiply from four to a hundred the rectangles fill the area under the v–t curve, the physical gateway to integration. The essence is “freeze the change inside each element,” and the flatter the variation within a slice, the more obedient the approximation. Galileo's extrapolation adds the third move — tilting the incline to vertical gives free fall, levelling it to horizontal gives inertia (see the Galileo incline entry). Two traps: reading a limit as “some very small number” rather than a process of endless approach, and substituting Δx/Δt for an instantaneous value without checking whether the quantity changes violently inside the slice. Two numeric anchors: a photogate with a 5 cm flag timing 0.05 s reports 1 m/s, while a 1 cm flag on the same cart reads 1.002 — the narrower the flag, the closer to the instant; and in uniformly accelerated motion “average velocity equals the instantaneous velocity at mid-time” is the exact landing point of the limit idea, while the mid-position speed runs larger — a pair students constantly conflate. The element method also derives centripetal acceleration: matching the velocity triangle to the displacement triangle over a tiny arc and taking the limit yields a=v²/r — elements integrate not only areas but the direction of change itself.",
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
            zh: "把看不见的、测不出的小量放大成可读的量，或转换成好测的量。放大分两条路：几何放大，如卡文迪许用镜尺把丝线扭转的极小角度反射成光斑的长距离移动——镜面转过约 0.057 度，5 米外的标尺上光斑便移走 10 毫米，把不可见的小角转成可读的毫米；累积放大则先测批量再平分——测一张纸厚可量 100 张除以 100，测一个周期可计 30 次全振动除以 30。转换法负责看不见的主角：磁场靠小磁针偏转显示，温度靠液柱高度显示，桌面微形变靠光斑位移显示，声音强弱靠示波器波形显示——把不好测的量换成它的好测效应。两者常联手，「著名实验」里的卡文迪许扭秤条是实例，库仑扭秤同理，本条讲的是方法本身。方法也有边界：放大不创造精度，镜尺读出的毫米终究受丝线本身性质限制；累积法要求被累积的量可加且不变——100 张纸须压得同样紧，30 次全振动须同一振幅，第一句“测 100 张除以 100 得 0.10 毫米”听着精确，前提不成立时精度是假的。再记一个“转换+累积”的联手范本：单分子油膜法测分子直径——1 滴油酸溶液含纯油酸约 10⁻⁶ 毫升，展开成约 0.1 平方米的油膜，厚度折合约 10⁻¹⁰ 米，分子的尺度就这样从一把直尺里被“逼”了出来。显示类转换还有：螺线管磁场靠铁屑排列、微小电流靠灵敏电流计、微小时间差靠拍频。判断该用放大还是转换，只看小量本身好不好直接读——角度小到读不出就放大，量根本看不见就转换。数字锚再补两枚：用直尺测 0.5 毫米的波长测不了，可以数 10 个波峰量总长再除以 10——波动世界里的“累积法”，与测纸厚同源；镜尺系统里 5 米标尺上读 1 毫米，对应镜面转角约 0.0057 度，光杠杆的放大倍数就是“两倍光程除以尺距”。放大与转换的选择，说到底是一道“哪里能装下刻度”的工程题。",
            en: "Magnify what is too small to read, or convert it into something measurable. Amplification has two roads. Geometric: Cavendish turned a barely perceptible fibre twist into a long light-spot travel with a mirror and scale — a mirror deflection of about 0.057 degrees slides the spot 10 mm along a scale 5 m away, translating an invisible angle into readable millimetres. Cumulative: measure a hundred sheets together and divide by 100 for one page's thickness, or time thirty full swings and divide by 30 for one period. Conversion handles the invisible cast: a magnetic field betrays itself through a compass needle, temperature through a liquid column, a table's faint sag through a shifting light spot, sound through an oscilloscope trace — each unmeasurable quantity traded for a measurable effect. The two often work as a pair; the Cavendish entry under Famous Experiments is the case study, Coulomb's torsion balance the cousin, and this entry is the method itself. The method has edges, though: amplification creates no precision — the millimetre you read is still bounded by the fibre's own behaviour — and accumulation demands that the summed quantity be additive and steady: a hundred sheets must press equally tight, thirty swings must hold one amplitude. A reading of “0.10 mm per page” sounds exact and is false when the premise fails. One more tag-team of conversion plus accumulation: the oil-film method measures a molecule's diameter by spreading one drop containing about 10⁻⁶ mL of pure oleic acid into a film near 0.1 m² — a thickness of about 10⁻¹⁰ m, extracted with nothing but a ruler. Display-type conversions multiply: solenoid fields through iron filings, microcurrents through galvanometers, tiny time differences through beats. Choose between amplifying and converting by one question only — if the quantity is visible but too small, magnify it; if it is invisible outright, convert it.",
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
            zh: "用图线代替公式表达关系：斜率与面积往往就是物理量本身。读图三步：先看清轴名与单位，再读截距与斜率，最后算图线与轴围的面积。x–t 图斜率是速度、v–t 图斜率是加速度、v–t 图下面积是位移；F–x 图下面积是功，U–I 图斜率是电阻。非线性猜想靠“变直”检验：画 a 与 1/m 的关系而不是 a 与 m，画 1/I 与 R 而不是 I 与 R——只有成直线才支持比例成立。截距还能交代隐藏量：伏安法测电源的 U–I 图，纵截距是电动势、斜率大小是内阻。数字锚：匀加速小车打出 a=2 m/s²，则 v–t 线每过 1 秒升高 2 米每秒，前两秒图线下面积 4 米即位移。用图的前提是把函数关系先写对：轴若不从零起，“面积等于位移”之类的换算就不再成立；图线交点只表示该时刻两量相等，不是“同一物体同一状态”；x–t 图的直线刻画的是匀速而非“轨迹是直线”——把图线当轨迹是最常见的读图错误。与「波动图象与振动图象」一条分工：那条专讲波的两类图，本条是通用的图象—函数转化。数字锚：两条伏安特性直线画在同一张 U–I 图上，斜率大的电阻大；但两轴若对调，结论翻转——斜率的物理意义永远依附于轴的定义。图象法还自带剔坏点功能：直线拟合时明显偏离的点可判为测量失误，剔除有据；这是“先化直再外推”比“直接代数字”更稳的原因。读图的最高一层是翻译：看到追及问题里两图线交点，先默念“此刻位置相同”，再动笔算——把几何特征翻回物理语言，才算真读懂。数字锚再补两枚：v–t 图梯形面积算位移，上底 4、下底 6、高 2，面积 10 米即两段平均速度之和乘时间；U–I 图两条直线并联比较，同样电压下电流大的电阻小——“控制变量”在图上就是“作辅助线取相同横坐标”。用图的纪律一条：图线只说数据说过的话，外推到测量范围之外要声明“假设线性延续”，把趋势当定律是图象法唯一的、也是致命的滥用。",
            en: "Let a curve replace a formula: slopes and areas often are physical quantities themselves. Read a graph in three passes: check the axis names and units, take intercept and slope, then compute the area between curve and axis. Slope is velocity on an x–t graph and acceleration on a v–t graph, whose area is displacement; area under F–x is work, and the slope of U–I is resistance. Suspected non-linear laws are tested by straightening — plot a against 1/m rather than m, or 1/I against R; only a straight line backs the proportionality. Intercepts expose hidden quantities: on the U–I plot of a battery the vertical intercept is the emf and the slope's magnitude the internal resistance. Anchor: a cart accelerating at 2 m/s² lifts its v–t line by 2 m/s each second, and the 4 m of area under the first two seconds is exactly its displacement. Prerequisites and traps: if an axis does not start at zero, translations like “area equals displacement” silently break; an intersection marks two quantities agreeing at that moment, not one object in one state; and a straight x–t line certifies uniform motion, not a straight path — reading a graph as a trajectory is the classic error. Where the waveform-graphs entry covers the two wave plots, this is the general translation between picture and formula. One more anchor: two volt-ampere lines on one U–I plot rank their resistors by slope — but swap the axes and the ranking flips, for a slope's meaning is forever hostage to the axes. Graphing also licenses rejecting bad points: a lone dot straying from a fitted line can be judged a measurement blunder, removed with grounds — why “straighten then extrapolate” beats plugging numbers. The top floor of graph-reading is translation: at an intersection in a pursuit problem, murmur “same position at this moment” before you compute — geometry earned back into physics is what actually counts as reading.",
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
            zh: "用一个简单对象完全顶替复杂对象，效果相同即允许替换。合力与分力、串并联网络的总电阻、交流电的有效值（热效应与直流相等的数值）都属等效替代：替换的是效果而非本质，所以适用条件必须写清——等效电阻只在同一段电路、同一电流条件下成立，出了这一段便无权外推。它也是测量术的骨架：曹冲称象用石头顶替大象的排水效果；替代法测电阻把未知电阻换成可读的电阻箱、保持电流不变即可读数。数值锚：220 伏正弦交流的有效值对应峰值约 311 伏，标称耐压 250 伏的电容器接不上 220 伏线路——耐压看的是峰值而非有效值，U=U_m/√2 只对正弦波形成立，方波另算。与理想模型分工：那条做减法（忽略次要因素），本条做替换（换成等价对象）；替换后“多出来”的那个量不增加任何作用——合力不是分力之外多出的一个力，受力分析里两者同现便是重复计算。把等效误当等同、漏掉“同条件”限定，是把总电阻往全电路外推、把有效值公式套给非正弦波这类错误的共同根源。数字锚再补两枚：曹冲称象的账可以摊开——象重 2 吨、船舷面积 4 平方米，吃水差 0.5 米，石头须一块块加到同一刻线，等效的判据永远是“同一效果”而非“差不多”；两个 R 并联得 R/2、串联得 2R，等效只对外端口成立，内部的功率分配两者完全不同。合力与分力之间还隔着一条矢量法则：3 牛与 4 牛垂直，合力 5 牛而非 7 牛——效果等效，但合成不是代数相加。数字锚再补两枚：重心是重力的等效作用点，等效只在“对外效果”一层——重心可以在物体之外，圆环、空心球的心都悬在空处，切不成“质量集中”的事实。交流有效值的陷阱用数字说话：正弦 220 伏峰值 311 伏，方波的有效值却等于峰值本身——同一句“热效应相等”，不同波形答案不同。等效思想还支撑着简化电路的全部日常工作：把复杂网络揉成一个电动势加一个内阻（戴维南等价电源），效果相同、内部全非。",
            en: "Let one simple object stand fully in for a complex one — equal effect licenses the swap. A resultant force replacing two pulls, one resistor replacing a network, and the RMS current whose heating equals that of a direct current are all equivalent substitution: what is traded is the effect, not the essence, so the conditions must be stated — an equivalent resistance holds only for that branch under that current, and loses all authority outside it. The method is also the skeleton of measurement: Chao Chong weighed an elephant by swapping in stones that displaced the same water, and the substitution technique finds an unknown resistance by replacing it with a readable box while holding the current fixed. Anchors: a 220 V mains sine wave peaks near 311 V, so a capacitor rated 250 V cannot sit on the line — ratings read the peak, not the RMS, and U = U_m/√2 holds only for sinusoids. Where idealized models subtract minor factors, equivalent substitution swaps the object for an equal-effect stand-in; the swapped-in quantity adds no extra action — the resultant is not a third force beside the two it replaces, and drawing both in one free-body diagram is double counting. Treating equivalence as identity and dropping the “same conditions” clause is the shared root of extrapolating one branch's resistance to the whole circuit and forcing RMS formulas onto non-sinusoidal waves. Two further anchors: the centre of gravity is the equivalent point of gravity — equivalent only in outward effect, since it can lie outside the body (the heart of a ring or a hollow shell floats in empty air, no “mass concentration” there to cut). And the RMS trap speaks in numbers: a sine 220 V peaks near 311 V, but a square wave's RMS equals its peak outright — the same phrase “equal heating,” different answers per waveform. Equivalent thinking also underwrites every circuit simplification: folding a network into one emf plus one internal resistance (a Thévenin source) — same effect at the terminals, nothing of the interior preserved.",
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
            zh: "导电性介于导体与绝缘体之间，掺入杂质可精确调控，是晶体管的基石。硅中掺入百万分之一的磷或硼，电阻率便下降数个数量级——“可调控”才是半导体的灵魂，导电性居中只是表象。PN 结具有单向导电性，正向导通、反向截止：二极管靠它整流，把交流变成直流；三极管再进一步，用小的基极电流控制大的集电极电流，实现放大。1947 年肖克利、巴丁与布拉顿在贝尔实验室做出锗点接触晶体管，1956 年三人同获诺贝尔奖；1958 年基尔比与 1959 年诺伊斯先后把集成电路落地——晶体管、电阻与连线做进同一块硅片。摩尔 1965 年预言集成度约每两年翻番，驱动行业把线宽从微米一路推进到纳米节点：3 纳米级工艺的栅长只相当于十几个硅原子直径（硅原子直径约 0.2 纳米），原子尺度的漏电已是必须正面处理的对手，光刻也换上了 13.5 纳米的极紫外光源。硅晶片上数十亿晶体管构成现代计算机与手机的核心。易错有二：把半导体读成“导电性居中就行”——纯净硅几乎不导电，器件性能全靠掺杂剖面；以及把“纳米节点”当真实栅长——那早已是产品代称，与实际尺寸脱钩。数字锚再补三枚：掺杂浓度常以每立方厘米 10¹⁵ 到 10¹⁸ 个计，而硅原子本身约 5×10²² 个每立方厘米——所谓“调控”就是在这上亿的宿主里安排千分之一的客子；锗管被硅管取代，因硅的禁带更宽、高温漏电更小；极紫外光源靠锡滴被激光每秒击成数十亿度的等离子体发出 13.5 纳米的光。另记一条使用边界：PN 结反向电压超过击穿值，单向导电就作废——静电击穿 CMOS 器件，走的正是这条路。",
            en: "Conductivity between conductor and insulator, tunable by doping — the basis of transistors. Doping silicon with one part per million of phosphorus or boron drops its resistivity by orders of magnitude: tunability, not middling conductivity, is the soul of a semiconductor. A PN junction conducts one way — forward on, reverse off — which makes the diode's rectifier turn AC into DC, and the bipolar transistor goes further, letting a small base current control a large collector current, that is, amplify. In 1947 Shockley, Bardeen and Brattain built the first point-contact germanium transistor at Bell Labs, sharing the 1956 Nobel Prize; Kilby (1958) and Noyce (1959) then folded transistors, resistors and wiring into a single chip. Moore's 1965 forecast — integration doubling roughly every two years — drove lithography from microns down to nanometre-class nodes: a 3 nm gate spans only a dozen or so silicon atom diameters (about 0.2 nm each), so atomic-scale leakage is an opponent you must face head-on, and the patterning light itself has become 13.5 nm extreme ultraviolet. Billions of transistors on silicon wafers power computers and phones. Two traps: calling a semiconductor “just middling conductors” — pure silicon barely conducts, and devices live on doping profiles — and reading “nanometre node” as a real gate length, a product label long detached from physical gate dimensions. Three more anchors: doping runs at roughly 10¹⁵ to 10¹⁸ atoms per cubic centimetre against silicon's own 5×10²² — “tuning” means seating a thousandth of guests among a hundred-billion hosts; germanium yielded to silicon because silicon's wider bandgap leaks less when hot; and the 13.5 nm extreme-ultraviolet light itself comes from tin droplets vaporised into billion-degree plasma by lasers, fifty thousand times a second. One boundary to respect: reverse a PN junction past its breakdown voltage and the one-way traffic dies — that is exactly how static electricity kills a chip.",
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
            zh: "某些材料降到临界温度以下电阻突降为零并完全抗磁。1911 年昂内斯把汞冷却到 4.2 开尔文附近，电阻表突然读不出任何数值——零电阻不是“很小”，而是“没有”。但超导态有三把门槛：温度、磁场与电流各超过临界值都会把它打断，磁体绕制时必须三者都留余量。迈斯纳效应是它的第二重身份：超导体把内部磁通完全排出，体现完全抗磁性——这不能从零电阻推出，零电阻只“冻结”既有磁通，抗磁才是独立假设，也是磁悬浮列车与超导轴承的原理（上海演示线与日本 L0 系磁悬浮列车时速 603 公里皆赖强磁体）。应用按冷却代价分两营：液氦温区（4.2 开尔文）的低温超导做 MRI 与加速器磁体；1986 年以后的钇钡铜氧一类铜氧化物把临界温度推到 90 开尔文上下、越过 77 开尔文的液氮沸点——液氮便宜一个数量级，“高温超导”四个字只相对 4.2 开尔文而言，离室温仍远。约瑟夫森效应让超导结在电压下产生频率严格正比于电压的振荡（约 483.6 兆赫兹每微伏），电压基准至今由约瑟夫森结阵列复现。零电阻可实现无损耗输电、强磁体；高温超导仍在攻关。易错：把“完全抗磁”当“零电阻的推论”，以及以为超导体在任何磁场下都能悬浮——超过临界磁场，悬浮立刻塌掉。数字锚再补三枚：磁场并非在界面“硬切”，而是渗入表面几十到几百纳米后才衰减到零，这个穿透深度是第二类超导体涡旋活动的舞台；2019 千克重定义复现所用的基布尔秤，靠的正是超导磁体把力学量与电学量锁在天平两端；超导环里的持续电流实测可十年以上不见衰减，“零电阻”不是修辞。工程账也要算：制冷能耗常常高于线路损耗的节省，超导电缆在电网改造中经济性仍排在铜铝之后。",
            en: "Below a critical temperature some materials drop to zero resistance and expel magnetic fields. In 1911 Onnes cooled mercury near 4.2 K and the ohmmeter could find no value at all — zero resistance is not “very small,” it is “none.” But the superconducting state stands behind three gates: temperature, magnetic field and current each carry a critical value beyond which superconductivity snaps, and magnet designers keep margin on all three. The Meissner effect is its second identity: a superconductor expels interior flux, showing perfect diamagnetism — a fact not derivable from zero resistance, which merely freezes whatever flux is already there. That independent axiom is what lifts maglev trains (Japan's L0 Series at 603 km/h) and bearings. Applications split by cooling cost: liquid-helium low-temperature superconductors (4.2 K) build MRI and accelerator magnets, while the copper oxides since 1986 — yttrium barium copper oxide among them — push the critical temperature near 90 K, above liquid nitrogen's 77 K boiling point, a tenth the price; “high-Tc” is high only against 4.2 K, still far from room temperature. The Josephson effect makes a superconducting junction oscillate at a frequency strictly proportional to voltage (about 483.6 MHz per microvolt), and the volt is still reproduced from Josephson arrays today. Zero resistance enables lossless power and strong magnets; room-temperature superconductivity remains the open goal. Two traps: treating perfect diamagnetism as a corollary of zero resistance, and assuming a superconductor levitates in any field — past the critical field the levitation collapses. Three more anchors: the field is not guillotined at the surface but decays over tens to hundreds of nanometres of penetration depth — the stage on which type-II superconductors host their vortex activity; the Kibble balance used in the 2019 kilogram reproduction leans on superconducting magnets to lock mechanical and electrical quantities on one beam; and persistent currents in a superconducting loop are measured to persist a decade or more without decay — “zero resistance” is not rhetoric. The engineering ledger matters too: refrigeration often costs more than the line loss it saves, which is why superconducting cable still ranks behind copper and aluminium in grid upgrades.",
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
            zh: "受激辐射放大产生方向性好、单色度高、亮度极强的人造光。热平衡下低能态的原子总是多于高能态，受激辐射敌不过吸收，所以造激光第一步是“泵浦”把工作物质抽成粒子数反转——高能态原子多于低能态，放大才能压过吸收；这一步 1917 年由爱因斯坦的受激辐射理论埋下地基。第二步是谐振腔：两面反射镜让光往返穿越增益介质，同频率、同方向、同相位的光在受激辐射中复制壮大。1960 年梅曼的红宝石激光器打出第一束。单色性与方向性可以量化：氦氖激光 632.8 纳米的红光谱线宽可窄到 10⁻⁵ 纳米量级，单色比约千万分之一，而钠黄光 589.0 纳米的谱线宽约 6×10⁻⁴ 纳米；激光发散角约 1 毫弧度，10 米外光斑仍只有厘米级、1 千米外约 1 米，探照灯在百米外已铺开近 9 米的弥散斑。光盘读出激光从 CD 的 780 纳米走到蓝光的 405 纳米，波长越短可刻的凹点越小、容量越大；眼科手术用准分子激光以每次约十纳米的厚度逐层消融角膜。2022 年 12 月美国国家点火装置近两百路激光同击毫米级靶丸，聚变输出首超入射激光能量。光纤通信、精密切割、激光雷达、条码扫描皆源于此。易错：把“激光天然单色”当无条件事实——单色性取决于腔与谱线，以及把激光的危险只想到功率——连续激光伤眼靠亮度，脉冲激光伤眼靠能量密度。数字锚再补三枚：一支 1 毫瓦氦氖激光的发散角约 1 毫弧度，折算亮度足以与太阳表面比肩——“亮过太阳”不是夸张而是发散角换来的事实；激光雷达选 1550 纳米而非 905 纳米，因前者被角膜吸收、到不了视网膜，人眼安全功率高一个数量级；核聚变点火路线中，起爆的“点数”靠黑腔内 X 射线均匀重定向，激光本身并不直接加热燃料。",
            en: "Light amplified by stimulated emission — highly directional, monochromatic and intense. In thermal equilibrium the lower level always outnumbers the upper, so absorption beats stimulated emission; the first move of any laser is to pump the gain medium into population inversion, where more atoms sit up than down and amplification can win. Einstein laid that theoretical ground in 1917. The second move is the resonator: two mirrors bounce light through the medium again and again while stimulated emission clones waves of one frequency, one direction, one phase. Maiman's ruby laser fired the first beam in 1960. Monochromaticity and direction can be quantified: a helium-neon laser at 632.8 nm can have a linewidth near 10⁻⁵ nm — a monochromaticity ratio of about one in seventy million — versus roughly 6×10⁻⁴ nm for the 589.0 nm sodium D line; a laser diverges by about 1 milliradian, its spot still centimetres wide at 10 m and about a metre at 1 km, where a searchlight already smears to nearly 9 m at 100 m. Disc readout lasers walked from CD's 780 nm to Blu-ray's 405 nm — the shorter the wavelength, the smaller the pit and the larger the capacity; excimer lasers shave the cornea in steps of about ten nanometres per pulse for eye surgery. In December 2022 the National Ignition Facility's nearly two hundred beams struck a millimetre target and fusion output exceeded the incoming laser energy for the first time. Fiber optics, precision cutting, LIDAR and barcode scanning all descend from this. Two traps: treating “lasers are monochromatic” as unconditional — it depends on cavity and line — and thinking only power makes lasers dangerous: continuous beams injure by brightness, pulsed beams by energy density. Three more anchors: a 1 mW helium-neon beam diverging by ~1 mrad reaches a brightness comparable to the sun's surface — “brighter than the sun” is arithmetic bought with divergence, not hype; LIDAR for the road chooses 1550 nm over 905 nm because the former is absorbed by the cornea and never reaches the retina, lifting the eye-safe power budget an order of magnitude; and in ignition experiments the laser does not heat the fuel directly — a hohlraum converts the beams to a uniform X-ray bath that squeezes the pellet.",
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
            zh: "核裂变与核聚变释放巨大能量，是重要的高效能源。链式反应靠中子维系：铀-235 裂变放出两三个中子，慢化剂把快中子减速成更易引发裂变的慢中子（石墨、重水皆可胜任），控制棒吸收中子决定反应速率——两者配合让堆芯处于“刚好自持”的临界状态，控制棒全部插入即停堆；1942 年费米团队在芝加哥大学球场看台下让 CP-1 达到临界，输出功率只有半个瓦。能量密度是核能的名片：1 千克铀-235 完全裂变约释放 8.2×10¹³ 焦，折近三万吨标准煤——一座百万千瓦机组每天“烧”掉的铀以克计。工程屏障层层设防：压水堆把一回路加压到约 150 个大气压，三百多度的水仍不沸腾，热量经二回路变成蒸汽推汽轮机；安全壳拦住放射性物质的最后一道去向。代价写在事故与废料账上：1979 年三里岛、1986 年切尔诺贝利、2011 年福岛；乏燃料里的长寿命核素需要万年尺度的隔离处置，而正常运行下核电站几乎不排碳。核电站用可控裂变链式反应发电；太阳与氢弹靠聚变；可控聚变（“人造太阳”）因清洁、原料丰富而被寄予厚望。易错有二：把链式反应当“燃烧”——它不需要氧，“灭火”直觉在这里失效；以及担心反应堆“像原子弹那样炸”——燃料铀-235 浓度只有百分之几，与武器级的九成以上差着量级，物理上不可能核爆。数字锚再补三枚：全球在运核电机组四百余台、供全程发电量约百分之九，法国比例约六成半；轻水堆对天然铀中铀-235 的利用率不足百分之一，快堆与循环工艺的目标正是把这笔账翻过来；停堆一小时堆芯仍有约百分之七的功率在衰变发热——三里岛与福岛的熔毁都发生在这份“关不掉的余热”上，泵停止循环比链式反应停止更难。",
            en: "Fission and fusion release vast energy — potent power sources. A chain reaction runs on neutrons: each fission of uranium-235 frees two or three, a moderator (graphite or heavy water) slows them into the easy-to-capture slow band, and control rods absorb them to set the rate — together they hold the core at the edge of criticality, and flooding the rods stops the reactor. In 1942 Fermi's team brought Chicago Pile-1 critical under a football stadium's bleachers at half a watt. Energy density is nuclear power's calling card: a kilogram of uranium-235, fully fissioned, yields about 8.2×10¹³ J, close to thirty thousand tonnes of standard coal — a gigawatt-class plant burns grams of fuel per day. Engineering layers stand between the core and the world: a pressurized-water reactor keeps its primary loop at some 150 atmospheres so water at over 300 °C still does not boil, handing heat to a secondary loop whose steam turns the turbine, while the containment vessel is the last barrier for radioactivity. The bill comes due in accidents and waste: Three Mile Island in 1979, Chernobyl in 1986, Fukushima in 2011; long-lived nuclides in spent fuel need ten-thousand-year isolation, though routine operation emits almost no carbon. Reactors run controlled fission; the Sun and bombs use fusion; controlled fusion (“artificial suns”) is prized for clean, abundant fuel. Two traps: reading the chain reaction as “burning” — it needs no oxygen, and firefighting intuition fails here — and fearing a reactor will “explode like a bomb”: reactor fuel sits at a few percent uranium-235 against weapons-grade ninety-plus, a gap that makes nuclear detonation physically impossible. Three more anchors: some 440 reactors supply about nine percent of world electricity, France leaning on the option for roughly two-thirds; light-water reactors burn under one percent of natural uranium's U-235, and fast reactors plus reprocessing exist to flip that ledger; and one hour after shutdown the core still releases about seven percent of its operating power as decay heat — the meltdowns at Three Mile Island and Fukushima both happened on this “heat you cannot switch off,” which is why losing circulation, not losing the chain reaction, is the true emergency.",
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
            zh: "无线电波到 γ 射线构成电磁波谱，不同波段各有应用。谱系按波长从千米级排到 10 皮米量级的 γ 射线，跨十几个数量级；分界不在“波的名字”，而在光子能量 E=hf——频率相差十个数量级，作用机制便各不相同。微波 2.45 吉赫兹对应波长约 12 厘米，通信与雷达的好地段；红外线对应分子热运动，人体 310 开尔文的辐射峰值在约 10 微米波段，热成像相机因此“看得见温度”，遥控器则用近红外的发光二极管对准接收窗。可见光只占谱上一窄条；紫外线里 200 到 280 纳米的短波成分破坏微生物的复制机制，用于杀菌，同一类高能量光子打在皮肤上就是晒伤。X 射线凭穿透本领成像：软组织透过多、骨骼吸收多，医学剂量以毫西弗计量，CT 一次约 10 毫西弗；γ 射线用于放疗与金属探伤。无线电用于通信广播，微波用于雷达与加热，红外线遥感与热成像，可见光是视觉，紫外线杀菌，X 射线成像，γ 射线治疗与探伤。易错有二：把“辐射”一律当“电离辐射”——红外、微波光子能量不足，只能加热、不能打断化学键；以及坚持“微波炉靠水共振”的旧谣言——2.45 吉赫兹并不是水的固有频率，加热靠的是电场驱使极性分子来回转向、彼此碰撞生热。数字锚再补三枚：可见光只占 400 到 700 纳米一窄条，其两侧紫外与红外的“化学效应”分野早在 1800 年由赫歇尔用温度计探红外、1801 年里特用氯化银探紫外先后发现；紫外线再按波长分 UV-A、UV-B、UV-C 三段，臭氧层截掉波长最短的 UV-C，晒伤主要由 UV-B 承担；家用 Wifi 与微波炉同在 2.45 吉赫兹挤一个频段，互扰的根源正在这里——波段应用史半部是频谱争夺史。",
            en: "From radio to gamma rays, each band has its uses. The spectrum runs from kilometre-scale radio waves down to gamma rays near 10 picometres, spanning well over a decade of orders; the true boundary is not the band's name but the photon energy E = hf — separated by ten powers of frequency, the mechanisms differ utterly. Microwaves at 2.45 GHz correspond to about 12 cm, a good address for radar and links. Infrared matches molecular vibration: a body at 310 K radiates peaking near 10 µm, which is why thermal cameras “see temperature,” while remotes aim a near-infrared LED at the receiver. Visible light is a thin sliver. In the ultraviolet, the 200–280 nm band scrambles microbial reproduction and sterilizes surfaces — the same kind of energetic photon reaching skin is a sunburn. X-rays image by penetration differences: soft tissue transmits, bone absorbs; medical doses are counted in millisieverts, a CT round about 10. Gamma rays treat tumours and probe steel for flaws. Radio for comms, microwaves for radar and heating, infrared for remote sensing, visible for sight, UV for sterilizing, X-rays for imaging, gamma for therapy and inspection. Two traps: treating every “radiation” as ionizing — infrared and microwave photons cannot break chemical bonds, only heat — and keeping the old rumor that microwave ovens run on water resonance: 2.45 GHz is not water's natural frequency; the field twists polar molecules back and forth and collisions do the heating. Three more anchors: visible light is a sliver from 400 to 700 nm, and the infrared and ultraviolet sides were found within a year of each other — Herschel with a thermometer in 1800, Ritter with silver chloride in 1801; the ultraviolet splits into UV-A, UV-B and UV-C, the ozone layer screens out the shortest band, and sunburn is mostly UV-B's signature; and household Wifi shares the 2.45 GHz microwave band with the oven next door — half the history of spectrum applications is a history of spectrum fights.",
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
            zh: "让光在玻璃纤维中全反射长途奔流，承载现代互联网的信息洪流。全反射把条件做得极温和：纤芯折射率约 1.46、包层约 1.45，掠射在芯层界面的光几乎全部反射回芯内，折射率只差 0.01 便足够锁光；临界角约 83 度，意味着即便光纤弯折，沿轴向前进的光仍一根不断地传输。1966 年高锟指出玻璃纤维的损耗源于杂质而非玻璃本性，把衰减压到 20 分贝每千米以下通信即属可行——他因此获 2009 年诺贝尔物理学奖。数字对比最能说明进步：早年劣质玻璃 50 千米便只剩百分之一的光，今天的石英光纤在 1550 纳米的最低损耗窗口只有约 0.15 分贝每千米，光跑完 100 千米还剩下约百分之三，理论极限更在 0.02 分贝以下。中继器与掺铒光纤放大器在洋底接力补光，总长百万千米级的海底光缆网承载洲际通信，一对光纤可同时奔流数十太比特每秒的话务。利用光的全反射把信号锁在纤芯内几乎无损地传输，一条光纤可同时传送海量通话与网络数据，构成全球通信的骨干。易错有二：把光纤当“镜子管子”——光走的不是镜面直线反射而是掠射全反射的折线，包层既是反射面也是保护，不可省略；以及把“光速在纤芯里仍是 c”当真——纤芯中光速约降到真空的三分之二，色散与延迟都由此来。数字锚再补三枚：纤芯直径单模约 9 微米、多模约 50 微米，包层统一 125 微米、涂覆层 250 微米——“头发丝”并非修辞；一根光纤里用波分复用可并行上百个波长，每个波长各自奔流百吉比特，容量靠“颜色分车道”而非单声道提速；1550 纳米窗口的光在组织般介质里早被吸收殆尽，而它在石英里能跑百公里——同一种光，两个世界。",
            en: "Light races by total internal reflection through glass fibers, carrying the flood of modern internet data. The fiber makes the grazing condition gentle: a core of index about 1.46 sheathed in cladding of about 1.45 — a difference of just 0.01 is enough to lock light inside, with a critical angle near 83°, so even a bent fiber keeps axially travelling light hopping along without escape. In 1966 Kao showed the loss of glass fibre came from impurities rather than glass itself, and that pushing attenuation below 20 dB per kilometre would make communication feasible — the 2009 Nobel Prize followed. Numbers tell the progress: poor early glass left one percent of the light after 50 km, while today's silica fiber in its 1550 nm loss window runs at about 0.15 dB per kilometre, still around three percent remaining after 100 km, with a theoretical floor below 0.02. Repeaters and erbium-doped fiber amplifiers relight the signal across ocean floors, and a subsea network measured in millions of kilometres interconnects continents, tens of terabits per second flowing through a single fiber pair. Total internal reflection traps the signal in the core with little loss; one fiber carries vast simultaneous voice and data traffic — the backbone of global communication. Two traps: picturing the fiber as a “mirror pipe” — the ray advances by grazing total reflections, not mirror bounces, and the cladding is both reflector and protector — and assuming light inside still moves at c: in the core it runs at about two thirds of vacuum speed, which is where delay and dispersion come from. Three more anchors: cores run 9 µm single-mode or 50 µm multi-mode inside a standard 125 µm cladding and 250 µm coating — “human hair” is specification, not metaphor; wavelength-division multiplexing runs a hundred-plus colours down one fiber, each carrying a hundred gigabits, capacity built by lane-splitting rather than a single louder channel; and 1550 nm light that is swallowed almost immediately by tissue will cross a hundred kilometres of silica — same photon, two worlds.",
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
            zh: "用强磁场与无线电波让人体内的氢原子发出信号，绘制无损的软组织图像。水与脂肪多氢，人体是天然的样品池。质子在磁场里以约 42.58 兆赫每特斯拉的比率进动，1.5 特斯拉的扫描仪对应约 64 兆赫射频脉冲——恰好落在无线电波段，MRI 发射与接收的都是无线电波。射频脉冲撤去后，氢核回到平衡态放出回波；梯度磁场按位置给频率编码，T1、T2 两种弛豫时间在不同组织间差异明显，对比度由此而来，脑与关节等软组织图像因此清晰。场强标尺可比：地磁场只有约 50 微特斯拉，医院常用的 1.5 与 3 特斯拉比它强三到六万倍，7 特斯拉科研机也已用于人体成像。因不含电离辐射，它特别适合观察软组织；但强磁场对铁磁性金属与心脏起搏器植入者是禁区，铁磁性异物在 1.5 特斯拉场中受力可相当于自重的百倍量级，检查前的金属筛查不是形式主义；造影剂钆用于增强病灶显影。氢核在磁场中按特定频率共振，撤去脉冲后回波被接收并重建为断层图像。易错有二：把“核磁共振”的“核”当放射性核——它是氢原子核，与放射无关；以及把“特斯拉”当能量单位——那是磁感应强度单位，MRI 说的是场强不是剂量。数字锚再补三枚：3 特斯拉对应约 127.7 兆赫，频率越高在组织里波长越短、射频场越难打匀，高场的均匀性与比吸收率（发热）限值是一对硬约束；把质子自旋翻转所需的能量折成温度只有毫开量级，信号之微弱可见一斑，这也是 MRI 线圈要紧贴人体那么近的原因；7 特斯拉机型已获批人体成像，而它的磁场仍抓不住一枚硬币——磁场力作用在铁磁体上才粗暴，对水分子只是轻轻扶正。",
            en: "Strong fields and radio waves make body hydrogen emit signals, painting soft-tissue images without radiation. Water and fat are full of hydrogen, and a human body is a ready sample. Protons precess at about 42.58 MHz per tesla, so a 1.5 T scanner speaks to them at roughly 64 MHz of RF — squarely in the radio band; an MRI machine transmits and receives radio waves. After the pulse stops, nuclei relax back and return echoes; gradient fields tag position with frequency, and the two relaxation times T1 and T2 differ enough between tissues to build the contrast that makes brain and joints legible. For scale, Earth's field is about 50 microtesla — the clinic's 1.5 T and 3 T run thirty to sixty thousand times stronger, and 7 T research machines already image people. Free of ionizing radiation, it excels at soft tissue; but the field itself is the hazard: ferromagnetic objects and some pacemakers are barred, a loose ferromagnetic tool can feel forces hundreds of times its weight in a 1.5 T bore, so metal screening is not ceremony, and gadolinium contrast agents sharpen lesions. Hydrogen nuclei resonate at a set frequency in the field and their echoes are rebuilt into slices. Two traps: reading the “nuclear” in nuclear magnetic resonance as radioactivity — it means the hydrogen nucleus — and treating “tesla” as a dose unit: it measures field strength, not energy deposited. Three more anchors: 3 T corresponds to about 127.7 MHz, and the higher the frequency the shorter the wavelength inside tissue and the harder the RF is to distribute evenly — field uniformity and the specific absorption rate (heating) are the twin constraints at high field; the energy difference between proton spin states, converted to temperature, is in millikelvin order, which is how faint the signal is and why the coil must hug the body; and 7 T machines are approved for human imaging yet still cannot pick up a coin — magnetic force is brutal only on ferromagnets; on water it merely straightens the posture.",
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
            zh: "用电磁场把微观粒子加速到近光速并对撞，揭示物质最深处的结构。原理分工明确：电场每过一道缝隙加速一次，磁场只做偏转与聚焦、对粒子不做功。1932 年劳伦斯发明回旋加速器，恒定磁场里粒子沿螺旋一路提速；能量再高，相对论效应让转速失同步，于是有同步加速器与对撞机——两束反向环流，把能量全部押在对心上而不是浪费在撞静止靶。1988 年北京正负电子对撞机建成，τ 轻子质量等测量随之更新世界平均值。大型强子对撞机周长 26.7 公里，质子每秒环行约 1.1 万圈；6.5 太电子伏的质子洛伦兹因子约七千，只比光速慢每秒 3 米；束流由 8.3 特斯拉的超导磁体箍在轨道内，整条环路泡在 1.9 开尔文的超流氦里——比 2.7 开尔文的外太空更冷，是人类最大的低温工程。13.6 太电子伏的对撞能量换来了 2012 年希格斯玻色子的确认。加速器家族如今半数在医院：质子与重离子治疗用布拉格峰把剂量砸进肿瘤而非穿体而过，医用同位素靠回旋加速器量产；弯道的同步辐射从“干扰手段”翻身成“超级显微镜”。易错有二：以为对撞机是“显微镜换代”——其实是能量换尺度，由德布罗意关系，束流物质波比可见光短十几个数量级；以及以为磁场也在加速——磁场只改方向不做功，提速的永远只有电场。数字锚再补三枚：全球加速器实数以万计，其中过半在医院——CT 与闪光刀的 X 射线管、电子束保鲜、放疗直线加速器都是它的亲戚，对撞机只是家族里最贵的那一支；27 公里的周长不是想要多大建多大，而是沿用 1988 年退役的莱普大隧道——能量被地基预算锁死；同步辐射亮度比常规 X 射线管高千万倍量级，蛋白质晶体学、锂电池充放电原位观察都靠它。",
            en: "Electric and magnetic fields drive particles near light speed and smash them, probing matter's innermost structure. The division of labour is strict: electric fields kick across every gap, magnetic fields only bend and focus, doing no work. Lawrence's 1932 cyclotron spiralled particles up inside a fixed field; at higher energies relativity detunes the spin, so synchrotrons and colliders took over — two counter-rotating beams betting all their energy on the collision instead of wasting most of it on a stationary target. Beijing's electron-positron collider, completed in 1988, refined world-average measurements such as the tau lepton mass. The Large Hadron Collider rings at 26.7 km: protons lap about eleven thousand times a second; at 6.5 TeV each proton's Lorentz factor nears seven thousand, putting it a mere three metres per second under c; 8.3 tesla superconducting magnets clamp the beams, and the whole loop bathes in superfluid helium at 1.9 K — colder than interplanetary space's 2.7 K, the largest cryogenic plant ever built. The 13.6 TeV collision energy paid for the Higgs boson in 2012. Half the accelerator family now lives in hospitals: proton and heavy-ion therapy banks dose in a Bragg peak inside the tumour instead of passing through, and medical isotopes are mass-made in cyclotrons, while the synchrotron radiation once cursed as a leak has been rehired as a “super microscope.” Two traps: calling a collider a microscope upgrade — it trades energy for resolution, since beam matter waves run ten-plus orders shorter than visible light — and crediting magnets with acceleration: they turn, never push. Three more anchors: accelerators number in the tens of thousands worldwide and more than half work in hospitals — the X-ray tubes behind CT and radiosurgery, electron-beam sterilisation and linac therapy are all family members; the collider is merely the most expensive branch; the LHC's 27 km is not ambition but inheritance, the ring reused from the LEP tunnel retired in 1988 — energy priced by civil engineering; and synchrotron light runs some ten million times brighter than a conventional X-ray tube, which is how protein crystallography and in-operando battery studies got their microscope.",
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
            zh: "利用量子叠加与纠缠并行探索答案，在特定问题上远超经典计算机。经典比特非 0 即 1，量子比特在测量前处于 0 与 1 的叠加；n 比特的状态空间按 2ⁿ 膨胀，50 比特对应约 1.1×10¹⁵ 个振幅——需要同时存储的天文数字正是量子算法的杠杆。1994 年秀尔给出因数分解的量子算法：大数分解对经典计算机是指数量级的难题，RSA 一类公钥密码正立在它之上，“破解密码”因此成为量子计算最早的名声，也是后量子密码学立项的原因。路线竞争看物理实现：超导回路、离子阱、光量子各据一角。2019 年谷歌以 53 比特超导处理器宣布“量子霸权”——其 200 秒完成的采样任务，最强超算估计要一万年；2020 年“九章”光量子原型机在高斯玻色采样上把优势拉到百亿亿倍量级，“祖冲之”系列则接续超导路线。与叠加原理同源的量子通信早已实用：1984 年的 BB84 协议保证窃听必留痕，2016 年“墨子号”卫星实现千公里级星地密钥分发。量子比特可同时处于零与一的叠加，多比特纠缠令状态空间指数膨胀，在因数分解、模拟分子等任务上潜力巨大。易错有二：“叠加”不等于“同时算出所有答案然后读取”——测量只能取回一个结果，算力来自让错误答案相消、正确答案相长的干涉设计；真正的拦路虎是退相干——超导量子比特相干时间仅百微秒量级，纠错要靠上千物理比特换一逻辑比特，离通用普及尚远。数字锚再补三枚：谷歌 2019 年的声明随即遭 IBM 质疑——同样的采样任务用优化过的经典算法在萨米特超算上约两天可完成，“一万年”只是朴素估法，基准之争本身就是这个领域的日常；超导路线的芯片活在稀释制冷机约 15 毫开的环境里，比星际空间冷千倍，而光量子路线在室温就能跑——制冷的账也是路线之争的账；目前纠错靠上千个物理比特换一个可靠逻辑比特，工程门槛仍以“数量级”计。",
            en: "Exploiting superposition and entanglement to explore answers in parallel, far outpacing classical machines on select problems. A classical bit is 0 or 1; a qubit, before measurement, rides a blend of both, and an n-bit system's state space grows as 2ⁿ — fifty qubits mean roughly 1.1×10¹⁵ amplitudes to hold at once, and that astronomical ledger is the leverage quantum algorithms spend. In 1994 Shor gave a quantum algorithm for factoring: big-number factorisation is an exponential grind for classical machines, RSA-style public-key cryptography stands on that difficulty, and “breaking codes” became quantum computing's earliest reputation — and the reason post-quantum cryptography was chartered. The race over physical implementation splits among superconducting circuits, ion traps and photonics. Google's 2019 53-qubit announcement of “quantum supremacy” cited 200 seconds of sampling that the strongest supercomputer might take ten thousand years for; China's Jiuzhang photonic prototype stretched the advantage in Gaussian boson sampling to the exafold scale in 2020, while the Zuchongzhi line pressed on superconducting. Quantum communication, a sibling of the same physics, is already operational: the 1984 BB84 protocol guarantees eavesdroppers leave marks, and the 2016 Micius satellite distributed keys over more than a thousand kilometres between ground and orbit. A qubit holds a blend of zero and one at once, and entangling many grows the state space exponentially — huge promise for factoring and simulating molecules. Two traps: “superposition” is not “compute all answers and read them out” — measurement returns a single result, and the power comes from interference that cancels wrong answers and compounds right ones; and the real gatekeeper is decoherence — superconducting qubits hold coherence for only hundreds of microseconds, fault tolerance spends a thousand physical bits per logical one, and general-purpose machines remain far off. Three more anchors: IBM immediately contested Google's 2019 claim, estimating the same sampling task at roughly two days on an optimised classical Summit run — the “ten thousand years” was the naive baseline, and benchmark disputes are this field's daily weather; superconducting qubits live inside dilution refrigerators near 15 millikelvin, a thousand times colder than interstellar space, while photonic qubits run at room temperature — the refrigeration bill is itself part of the route war; and today's error correction still spends a thousand-plus physical qubits per reliable logical one, so the engineering threshold is measured in orders of magnitude.",
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
            zh: "1801 年，托马斯·杨在英国皇家学会宣读论文，让光先过一条窄缝、再落到紧邻的两条窄缝上，屏幕上出现的不是一亮带而是明暗相间的条纹。两条缝相当于两个相干光源：波峰与波峰相遇处加强变亮、波峰与波谷相遇处抵消变暗，这正是「波的叠加与干涉」。相邻明纹间距正比于波长、正比于缝屏距离、反比于双缝间隔，即 Δy=λL/d——于是用一把尺子量出条纹间距，就能反推出光的波长，杨由此估得可见光波长在数百纳米量级。这一结果为光的波动说提供了决定性证据，压过了当时由「艾萨克·牛顿」权威撑腰、占主流地位的微粒说，也直接催生了「干涉与衍射」这一整条研究路线。更奇妙的是两百多年后的单粒子版本：把光源弱到一次只发射一个光子、让它在屏上逐点累积，起初满是杂乱无章的落点，时间一长干涉条纹却从统计中缓缓浮现——单个光子仿佛同时穿过两条缝、与自己发生干涉。一旦在缝口架设探测器去“看”它究竟走了哪条缝，条纹立刻消失、退化成两道亮带。杨氏双缝因此成为量子力学「波粒二象性」最纯粹、也最令人不安的演示，费曼甚至断言它“包含了量子力学的唯一奥秘”。1961 年起，电子、中子乃至由上百个原子组成的分子都被逐一拿来做双缝实验，条纹无一例外地出现——波动性并非光独有的脾气，而是物质的底色。",
            en: "In 1801 Thomas Young read a paper to the Royal Society in which light first passed through one narrow slit and then fell on two closely spaced slits; the screen showed not a single bright band but alternating bright and dark fringes. The two slits act as coherent sources: crest meeting crest reinforces into a bright band, crest meeting trough cancels into a dark one — exactly the superposition and interference of waves. The spacing between adjacent bright fringes is proportional to the wavelength and to the slit-to-screen distance and inversely proportional to the slit separation, Δy=λL/d; so measuring the fringe spacing with a ruler lets one infer the wavelength of light, and Young estimated visible wavelengths in the hundreds of nanometres. This gave decisive evidence for the wave theory of light, over the then-dominant corpuscular view backed by Newton's authority, and launched the whole programme of interference and diffraction. Stranger still is the single-particle version made two centuries later: dim the source until it emits one photon at a time and let the dots pile up slowly on the screen — at first a scatter of random hits, then, over time, the interference pattern emerges out of the statistics, as though each photon passed both slits and interfered with itself. Put a detector at the slits to see which one it went through, and the fringes vanish at once, collapsing to two plain bands. The double slit thus became the purest and most unsettling demonstration of wave-particle duality in quantum mechanics, and Feynman went so far as to say it 'contains the only mystery' of the theory. From 1961 on, electrons, neutrons and even molecules of a hundred-plus atoms have each been run through a double slit, and fringes appear in every case — wave behaviour is not a habit unique to light but the underlying colour of matter itself.",
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
            zh: "19 世纪物理学家普遍认为光波必须靠一种充满宇宙的介质传播，称之为“以太”；地球以约每秒钟三十公里的速度绕日运行，理应迎头撞上一阵“以太风”。1887 年迈克尔逊与莫雷在美国克利夫兰用改进的干涉仪检验此事：把一束光分成互相垂直的两路、各经反射镜折回再合拢，若两路所受“以太风”影响不同，光程就会产生微小差异，转动仪器九十度时干涉条纹应当平移。按地球轨道速度与光速之比估算，预期的条纹移动约零点四条纹宽，可是不管何时、朝哪个方向反复测量，条纹几乎纹丝不动——实测值不到预期的百分之一，这就是著名的“零结果”，后世称之为“历史上最著名的失败实验”。它干脆否定了静止以太的存在，动摇了绝对时空的根基，为 1905 年爱因斯坦把「狭义相对论基本原理」的两条公设——物理定律在一切「惯性系」中相同、真空「光速」对谁都不变——当作出发点扫清了道路。为挽救以太，洛伦兹与斐兹杰惹曾独立假设物体沿运动方向会收缩、恰好抵消光程差；这一“收缩假说”后来被相对论自然地吸收为「长度收缩」。实验并未就此落幕：肯尼迪与索恩代克在 1964 年延长一臂重做，近代又以互相垂直的稳定激光腔比对不同方向的谐振频率，把可能的各向异性压到 10⁻¹⁷ 量级——一百多年过去，“以太风”依旧毫无踪影，光速不变依然是被反复验证的事实。",
            en: "Nineteenth-century physicists held that light waves must ride on a medium filling the universe, the 'aether'; since Earth sweeps around the Sun at some thirty kilometres a second, it should run into an 'aether wind'. In 1887 Michelson and Morley, in Cleveland, tested this with a refined interferometer: split a beam into two perpendicular arms, reflect each back and recombine; if the aether wind affected the two paths unequally, a tiny light-path difference would appear, so turning the instrument by ninety degrees should shift the interference fringes. Judging from the ratio of Earth's orbital speed to the speed of light, the expected shift was about four-tenths of a fringe, yet no matter when or in which direction they repeated it, the fringes barely moved — the measured value was under one per cent of the prediction. This was the famous 'null result', later called the most famous failed experiment in history. It flatly ruled out a stationary aether and shook the foundations of absolute space and time, clearing the road for Einstein in 1905 to take as his starting point the two postulates of special relativity — the laws of physics are the same in every inertial frame, and the speed of light in vacuum is the same for everyone. To save the aether, Lorentz and FitzGerald had independently proposed that bodies contract along the direction of motion by just enough to cancel the light-path difference; that contraction hypothesis was later absorbed naturally by relativity as length contraction. The experiment did not end there: Kennedy and Thorndike repeated it in 1964 with one arm lengthened, and modern work compares the resonance frequencies of perpendicular stabilised laser cavities, pinning any possible anisotropy to the 10⁻¹⁷ level. After more than a century the aether wind is still nowhere to be found, and the constancy of light speed remains a repeatedly verified fact.",
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
            zh: "1909 至 1913 年，密立根在芝加哥让极小的带电油滴在两枚水平平行极板之间缓缓下落。他用喷雾器喷出油珠，油滴在喷出时因摩擦而带电，再用 X 射线照射、把电荷打得改变，从而观察同一颗油滴在不同带电量下的运动。不加电场时，油滴受重力与空气阻力（斯托克斯定律）作用，很快达到一个匀速的收尾速度；加上竖直电场，则可把油滴悬停、或令其匀速上升。由匀速时受力平衡，他先算出油滴的质量与半径，再算出每颗油滴所带电量——惊讶地发现所有读数都是同一个最小值的整数倍，而这个最小值正是「元电荷」e，他测得约 1.60×10⁻¹⁹ 库仑（现代值 1.602×10⁻¹⁹）。第一次以干净直接的方式证明电荷不是连续的水流，而是一份一份量子化的。为消除微小油滴上空气阻力偏差，他还引入了对空气平均自由程的修正，把结果校准到与今日值仅差不到百分之一。这桩测量与「阴极射线实验：电子的发现」正好互补：汤姆孙 1897 年测的是电子的比荷 e/m，密立根测的是 e，两值相除才得到「电子质量」；正是这套“电荷量子化＋电子”的图景，让密立根独得 1923 年诺贝尔物理学奖。围绕他是否挑选了对己有利的数据、把偏离整数倍的读点悄悄剔除，后世科学史家争论了近百年——但电荷是一份一份的这一结论，从原子核的质子数到今天的单电子梭形器件，早已成为整个物理与电工计量大厦的地基。",
            en: "Between 1909 and 1913 Millikan, at Chicago, watched tiny charged oil droplets fall slowly between two horizontal parallel plates. He sprayed oil from an atomiser, so the droplets took on charge by friction, then irradiated them with X-rays to change that charge and follow the same droplet under different electrifications. With no field a droplet feels gravity and air drag (Stokes' law) and quickly settles to a steady terminal speed; with a vertical field it can be held suspended or made to rise at a constant rate. From the force balance when moving uniformly he first worked out the droplet's mass and radius, then its charge — and found, strikingly, that every reading was a whole-number multiple of one smallest value, the elementary charge e, which he measured at about 1.60x10^-19 coulomb (modern value 1.602x10^-19). It was the first clean, direct proof that charge is not a continuous fluid but quantized in packets. To correct the drag on such small droplets he added a correction for air's mean free path, bringing his result within under one per cent of today's value. This measurement pairs exactly with the cathode-ray discovery of the electron: Thomson in 1897 had found the charge-to-mass ratio e/m, Millikan found e, and dividing the two yields the electron mass; it was this picture — quantized charge plus the electron — that won Millikan the 1923 Nobel Prize in Physics. Whether he cherry-picked data favourable to his conclusion, quietly dropping readings that strayed from a whole multiple, has been debated by historians of science for nearly a century. But the verdict that charge comes in packets has since become the bedrock of the whole edifice of physics and electrical metrology, from nuclear proton number down to today's single-electron shuttle devices.",
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
            zh: "1909 年，在曼彻斯特，盖革与年仅约二十岁、还是本科生的马斯登，在卢瑟福指导下用放射源放出的 α 粒子轰击极薄的金箔——金箔厚度只有一千来个原子，四周环置涂硫化锌的荧光屏，靠显微镜逐点数闪烁。按当时汤姆孙的“葡萄干布丁”模型，正电荷像布丁一样均匀铺满整颗原子、电子嵌在其中，质量也散布各处，那么又重又快、带正电的 α 粒子穿过去时应当几乎一路直穿、只极小角度偏折。结果令人震惊：绝大多数确实径直穿过，说明原子内部非常空旷；但大约每八千颗里就有一颗被大角度弹开，个别甚至偏过九十度原路返回。卢瑟福后来说这“就像你用十五英寸炮弹轰一张纸巾，炮弹却被弹回来打中了你”。1911 年他据此提出「原子的核式模型」：原子的几乎全部质量与全部正电荷，都集中在一个直径仅约原子万分之一（10⁻¹⁴ 米对 10⁻¹⁰ 米）的微小核里，电子在核外广阔空间绕行——原子行星模型由此诞生，他还用库仑散射公式算出了核的电荷。可这套图像立刻撞上经典电磁学的难题：按麦克斯韦理论，绕核旋转的电子本该不断辐射能量、在极短时间内螺旋坠入核内，原子应当瞬间塌缩。正是这个矛盾，逼出了玻尔次年把量子化条件塞进轨道、用「能级与氢原子光谱」为原子续命，最终由「波粒二象性」与量子力学彻底解决。",
            en: "In 1909, in Manchester, Geiger and Marsden — the latter barely twenty and still an undergraduate — bombarded an extremely thin gold foil, only some thousand atoms thick, with alpha particles from a radioactive source under Rutherford's direction, ringed with zinc-sulfide screens and counting the scintillations one by one through a microscope. On Thomson's then-current 'plum pudding' model, positive charge smeared through the whole atom like batter with electrons set into it and the mass spread out too, a heavy, fast, positively charged alpha particle should pass almost straight through with only tiny deflections. The result was astonishing: most indeed went clean through, showing the atom is mostly empty; but roughly one in eight thousand was hurled through a large angle, a few past ninety degrees, straight back. Rutherford later said it was 'as if you fired a fifteen-inch shell at a piece of tissue paper and it came back and hit you'. In 1911 he proposed the nuclear model of the atom: nearly all its mass and all its positive charge sit in a minute nucleus about ten-thousandths the diameter of the atom (10^-14 metres against 10^-10), with electrons circling in the vast space outside — the planetary atom was born, and he derived the nuclear charge from his Coulomb scattering formula. But the picture at once ran into the wall of classical electromagnetism: on Maxwell's theory an electron orbiting the nucleus should radie energy continuously and spiral inward in a flash, so the atom should instantly collapse. It was exactly this puzzle that drove Bohr the next year to force quantisation onto the orbits and keep the atom alive through the energy levels and hydrogen spectrum, a conflict finally resolved only by wave-particle duality and quantum mechanics.",
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
            zh: "1797 至 1798 年，卡文迪许在自家实验室搭起一台极其灵敏的扭秤，只为测出那肉眼永远看不见的引力到底有多大。装置是一根约三十厘米长的水平木杆，两端各固定一个铅球，用一根细丝从中悬吊；杆外另置两个可绕轴转动的巨大铅球。大球靠近时，它与小球之间那点微弱的「万有引力定律」之力会轻轻扭动悬丝，把杆转过一个几乎无法察觉的角度——卡文迪许在悬丝上贴一小片镜，把一束光反射到远处的刻度尺上，用光点的移动把这微小转角放大读出，从而测出引力的大小与悬丝的扭转常数。由这个力他算出地球的平均密度约为水的 5.5 倍（约每立方厘米 5.5 克），据此即可推出地球质量约 6×10²⁴ 千克——这就是“称出地球”的由来，他本人却谦逊地只说“测了地球密度”。有意思的是，他至死都没给出「引力常数」G 的数值；G≈6.67×10⁻¹¹ 牛·米²/千克² 是后人在一百年后（如 1891 年玻伊兹用更精细的石英丝扭秤）由他的数据换算而来。为排除人体与空气流动带来的极微气流干扰，他把整套仪器关在屋内、只从屋外通过望远镜读取光点——这种“隔室观测”正是微小量测量思想的早期典范。用扭镜放大微小形变与转角的路数，后来被库仑测静电力、被迈克尔逊那一类精密光学实验、乃至今天探测「引力波」的激光干涉仪一路继承。",
            en: "In 1797-1798 Cavendish set up in his home laboratory a strikingly sensitive torsion balance, aiming only to measure how strong that invisible force of gravity really is. The device was a horizontal wooden rod about thirty centimetres long with a lead ball fixed at each end, hung from its middle by a thin fibre; outside the rod sat two huge lead balls that could be turned on an axis. As a large ball drew near, the feeble pull of universal gravitation between it and the small ball twisted the fibre through an angle almost too small to perceive — Cavendish stuck a tiny mirror on the fibre and reflected a beam of light onto a distant scale, magnifying that slight turn into a moving spot he could read, and so measured both the force and the fibre's torsion constant. From it he found Earth's mean density about 5.5 times that of water (roughly 5.5 grams per cubic centimetre), which yields an Earth mass of about 6x10^24 kilograms — the origin of 'weighing the Earth', though he modestly said only that he had 'weighed the density of the Earth'. Curiously, he never himself gave a number for the gravitational constant G; the value G about 6.67x10^-11 newton metre-squared per kilogram-squared was converted from his data a century later, for instance by Boys in 1891 with a finer quartz-fibre balance. To shut out the faint air currents from his own body and the room, he sealed the whole apparatus indoors and read the light spot through a telescope from outside — this 'observation through a wall' is an early model of the craft of measuring minute quantities. The strategy of amplifying a tiny twist with a torsion mirror and light lever was inherited directly by Coulomb for the electrostatic force and, down the line, by the laser interferometers that detect gravitational waves today.",
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
            zh: "光照射到金属表面会把电子打出来，称作光电子，这现象最早由赫兹在 1887 年做「赫兹电磁波实验」时偶然注意到：接收间隙在紫外光照射下更容易蹦出火花。随后勒纳德系统研究，摆出几条经典波动说怎么都解释不通的事实：能不能打出电子，只看光的频率有没有越过某个“截止频率”，与光的强弱无关；一旦越过阈值，发射几乎瞬时发生、延迟不超十亿分之一秒；增大光强只会增多电子数目，而唯有提高频率，才抬高每个电子的最大动能——按波动图像，能量该随光的亮度累积、与颜色无关，理应越亮越“猛”，现实却恰恰相反。1905 年爱因斯坦用「光子」假说一举破解：光的能量本就不连续，而是一份份传播，每份 E=hν；一个光子把全部能量一次交给一个电子，扣掉电子挣脱金属所需的“逸出功”W，剩下的便是最大动能，即 Eₖ=hν−W。于是截止频率对应 hν₀=W，光强只管光子数目、频率才决定每个光子能量。密立根本想用精密实验证伪这条方程，测到 1916 年却越测越服、把普朗克常数 h 校到约百分之二，反因此印证了它；这也解释了为何“光电”与碱金属（铯对可见光敏感、锌须紫外）的选材。这桩工作坐实了光的粒子性、为「波粒二象性」补上关键一环，让爱因斯坦独得 1921 年诺贝尔物理学奖；而它的下游，从光电管、光电倍增管、太阳能电池到数码相机的感光芯片，全都建立在“一个光子打出一个电子”这条规则之上。",
            en: "Light falling on a metal knocks out electrons, called photoelectrons — a fact Hertz first stumbled on in 1887 during his electromagnetic-wave experiments, when a receiving spark gap sparked more easily under ultraviolet light. Lenard then studied it systematically and laid out several facts classical wave theory could not explain: whether electrons come off at all depends only on whether the light's frequency clears a certain 'threshold frequency', not on its intensity; once past threshold emission is essentially instant, with a delay under a nanosecond; more intensity only sends out more electrons, while only raising the frequency lifts each electron's maximum kinetic energy. On the wave picture, energy should build up with brightness regardless of colour, so brighter light ought to be 'fiercer' — yet reality was the opposite. In 1905 Einstein solved it at a stroke with the photon hypothesis: light's energy is not continuous but travels in packets, each E=hν; one photon hands its whole energy to one electron at once, and what is left after paying the 'work function' W needed to escape the metal becomes the maximum kinetic energy, E_k = hν − W. So the threshold frequency obeys hν₀ = W, intensity governs only the number of photons, and frequency sets each photon's energy. Millikan set out to refute the equation by precision experiment, and by 1916 had made it more convinced the better it agreed, pinning Planck's constant h to about two per cent; this also explains the choice of material — caesium responds to visible light, zinc needs the ultraviolet. The work nailed down the particle side of light, supplied a key link in wave-particle duality, and earned Einstein the 1921 Nobel Prize in Physics; its descendants, from phototubes and photomultipliers to solar cells and the sensor chips of digital cameras, all rest on the single rule that one photon frees one electron.",
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
            zh: "自由落体下落太快，在伽利略的年代根本没有能精确计时的工具。于是他约在 1604 年起让铜球沿一道磨得很光滑、阻力极小的斜面缓缓滚下，用“冲淡重力”的办法把加速度稀释成正比的 sinθ 倍、把运动放慢以便测量。他靠一座水钟计量时间——放出水流称重来量出历时——反复测下发现：球从静止滚过的路程，与所用时间的平方成正比，即 s∝t²，这正是速度均匀增加的「匀变速直线运动」的铁证。他还发现：同一倾角下，无论铜球轻重，加速度都相同，一举推翻了亚里士多德“越重的物体落得越快”延续近两千年的断言；把倾角一路推到竖直，他外推出自由落体也服从同样的规律（至于比萨斜塔同时抛两球的故事，多半是后人附会的传说）。再配上“理想实验”：小球沿一斜面滚下、会沿对面斜面滚到几乎同样的高度，若把对面斜面越放越平，球就为达到那高度而越滚越远——由此萌生了「牛顿第一定律（惯性）」的雏形：“若无阻力，运动物体将永远运动下去”。把可控实验、精密计时与几何推理拧成一体，用斜面“稀释”掉测不了的现象，正是伽利略为近代科学方法立下的开山范式，爱因斯坦因此称他为“近代科学之父”。",
            en: "Free fall is too swift to time with the tools of Galileo's day, so from about 1604 he let a bronze ball roll slowly down a well-polished, low-friction inclined plane, 'diluting gravity' to scale the acceleration down by the sine of the slope and slow the motion enough to measure. He kept time with a water clock — weighing the water that ran off to read the elapsed interval — and found, run after run, that the distance the ball rolled from rest grew as the square of the time, s proportional to t-squared: the iron signature of uniformly accelerated motion. He further showed that on a given slope the acceleration is the same whatever the ball's weight, overturning Aristotle's claim, held for near two thousand years, that heavier bodies fall faster; and by pushing the slope all the way to vertical he extrapolated that free fall obeys the very same law (the story of the Leaning Tower of Pisa is most likely a later legend). Pairing this with a 'thought experiment' — a ball rolling down one ramp climbs the opposite ramp to nearly the same height, and the flatter the opposite ramp is made, the farther it rolls to reach that height — came the seed of Newton's first law of inertia: with no resistance, a moving body keeps moving. To weld controlled experiment, precise timing and geometric reasoning into one, and to 'dilute' an unmeasurable phenomenon with a ramp, is exactly the founding paradigm Galileo set for the modern scientific method — which is why Einstein called him 'the father of modern science'.",
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
            zh: "1860 年代，「詹姆斯·麦克斯韦」从他的方程组预言：变化的电场与磁场会彼此激发、以横波的形式在空间中传播，速度恰等于「光速」，因此光本身就是一种电磁波。这当时只是一串漂亮的数学，直到 1887 至 1888 年在卡尔斯鲁厄，赫兹用实验把它坐实。他用一台鲁姆科夫感应线圈驱动一对隔着空气间隙的锌板作发射器，在几米外放一个留有微小开口的铜环作接收器——接收间隙间果然蹦出肉眼几乎看不见的微小火花，说明电磁波真的被发射出去、又在远处被收到了。赫兹进一步在导线对上测出驻波，从相邻波节间距拿到波长、乘上振荡电路的频率，算得的传播速度约等于光速；他又用锌板做出反射、用沥青棱柱做出折射、用一排金属丝做出偏振，逐项证明它与光同属一种「电磁感应」框架下的横波，甚至连“光是电磁波”这一断言都被一并验证。有趣的是，赫兹本人对这一划时代发现的应用前景相当冷淡，据说他断言这些波“毫无用处”。然而正是这桩实验开启了无线电通信的时代：马可尼与特斯拉后来把电磁波送上天空、催生了广播、雷达、电视与今天的手机。为纪念他，频率的单位被命名为“赫兹”；而德国物理学家以他名字命名、却在他英年早逝（1894 年去世，年仅 36 岁）之后，才让「赫兹电磁波实验」成为一个永被引用的名词。",
            en: "In the 1860s James Clerk Maxwell, from his equations, predicted that changing electric and magnetic fields would sustain one another and travel through space as a transverse wave moving at exactly the speed of light, so that light itself is an electromagnetic wave. For a long time this was only a beautiful piece of mathematics, until in Karlsruhe in 1887-1888 Hertz turned it into experiment. He drove a pair of zinc plates separated by an air gap with a Ruhmkorff induction coil as a transmitter, and set a copper ring with a tiny opening several metres away as a receiver — and a spark too faint for the eye to catch really leapt the gap, showing that electromagnetic waves were being sent out and caught at a distance. Hertz then measured standing waves along a wire pair, read the wavelength from the spacing of adjacent nodes, multiplied by the oscillation frequency of the circuit, and got a propagation speed close to that of light; he demonstrated reflection off a zinc sheet, refraction through a pitch prism, and polarisation through a grid of wires, proving item by item that they are transverse waves of the same kind as light within the framework of electromagnetism — even the claim that light itself is electromagnetic was verified along the way. Tellingly, Hertz himself was cool about the practical promise of this epoch-making discovery, reportedly declaring the waves 'of no use whatsoever'. Yet it was this very experiment that opened the age of radio communication: Marconi and Tesla later sent electromagnetic waves into the sky, breeding broadcast, radar, television and today's mobile phones. The unit of frequency was named the hertz in his honour; and the German physicist, honoured by that name, died young in 1894 at just 36, only after which did the 'Hertz electromagnetic-wave experiment' become a phrase forever cited.",
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
            zh: "1643 年生于英格兰林肯郡的伍尔索普——按当时英国通行的儒略历，生日恰是圣诞节；1661 年入剑桥三一学院，1665 年因大城市鼠疫停课、回乡避居近两年。正是在这段后世称为“奇迹年”的日子里，他同时酝酿出微积分（他自名“流数术”）、光的色散与万有引力三条线索。1672 年他用棱镜把一束白光摊成七色光谱、证明颜色是光与生俱来的属性而非棱镜染上，就此当选皇家学会会员；1668 年他磨镜做出第一台实用的反射式望远镜。1684 年哈雷登门问“行星为何走椭圆”，催成 1687 年由哈雷垫资印行的《自然哲学的数学原理》：他正是从「天体运动与开普勒定律」这一端接起，用一个平方反比的力把苹果落地与月球绕地拧成同一条规律——月球每秒朝地球“下落”约 1.4 毫米，恰合把地面重力按距离平方稀释后的数值，天上与地下第一次被写进同一条「万有引力定律」。他的绝对时空与超距引力被后人奉为铁律两百年，又被爱因斯坦逐条改写；与莱布尼茨的微积分发明权之争撕裂了英国与欧洲大陆数学界近一个世纪。他晚年主持皇家造币厂、督过大规模重铸、也把造假币者送上刑场；1703 年当选皇家学会会长、连任至去世，1704 年出版《光学》，1705 年受封爵士。他留下的炼金术与神学手稿逾百万字，凯恩斯因此说他是“最后一位魔术师”而非“第一个理性主义者”。1727 年辞世，葬于威斯敏斯特教堂，由五位公爵抬棺——这是给一位科学家的、此前只有王侯才享有的哀荣。",
            en: "Born in 1643 at Woolsthorpe in Lincolnshire — by the Julian calendar then used in England, on Christmas Day itself — he entered Trinity College Cambridge in 1661 and in 1665 the university closed for the plague, sending him home for nearly two years. In that “miracle year” he was simultaneously sketching calculus (his “method of fluxions”), the dispersion of light and universal gravitation. In 1672 he spread a beam of white light into a spectrum with a prism and showed that colour is an innate property of light rather than something the prism dyes onto it, winning a Royal Society fellowship; in 1668 he ground the mirrors of the first practical reflecting telescope. Halley’s 1684 question — why do planets move in ellipses? — produced the Principia of 1687, printed with Halley’s own money. Taking the Keplerian orbits as his starting point, one inverse-square force tied the falling apple to the orbiting Moon under a single law of gravitation: the Moon “falls” toward Earth by about 1.4 millimetres each second, exactly the surface gravity thinned by the square of its distance. His absolute space and time and his action at a distance stood as law for two centuries, then were dismantled piece by piece by Einstein; his priority quarrel with Leibniz over calculus split British and continental mathematics for nearly a hundred years. He ran the Royal Mint in his later years, oversaw the great recoinage and hanged forgers; he was elected president of the Royal Society in 1703 and served until he died, published the Opticks in 1704 and was knighted in 1705. He left over a million words of alchemical and theological manuscript, which is why Keynes called him the last of the magicians rather than the first rationalist. He died in 1727 and lay in Westminster Abbey, carried to the grave by five dukes — a mourning until then reserved for princes.",
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
            zh: "1905 年，他坐在伯尔尼专利局三级技术员的工位上，一年之内写出四篇改变物理的论文外加一篇博士论文：光电效应、布朗运动、狭义相对论，以及随后补上一页纸的质能等价「质能方程」。这些全靠两条公设撑起——物理定律在所有「惯性系」中相同、真空光速对谁都不变，时间和空间于是让了位。1908 年后他陆续任教，1914 年定居柏林，1915 年 11 月把「广义相对论与时空弯曲」的场方程交到普鲁士科学院；困扰天文学界半个世纪的水星近日点每世纪多出的 43 角秒，他的方程一次算中。1917 年他把同一套想法施于整个宇宙，为求静态解添上一个“宇宙学常数”，后来又自称这是他“一生中最大的失算”；同年他提出受激辐射，那是几十年后激光的理论地基。1919 年爱丁顿的日食观测证实星光确实被太阳偏折，让他一夜之间成为科学史上第一个全球性头版人物。1921 年度的诺贝尔奖（延迟到次年颁发）发给他的却是「光电效应实验」所揭示的光量子、而非相对论；有趣的是密立根当年正是想用精密实验证伪这条光量子方程，结果越测越服、反因此获了自己的诺奖。他终生不接受量子力学的概率诠释，与玻尔在历次索尔维会议正面交锋，“上帝不掷骰子”的诘问反而生出 EPR 悖论——几十年后它成了「波粒二象性」之外量子纠缠实验与量子信息学的起点。1933 年纳粹上台，他不再回德国，定居普林斯顿高等研究院；1939 年他签署致罗斯福的信促成了铀计划，晚年却为此懊悔。1955 年他在普林斯顿去世，留下“E=mc²”这一最简洁也最沉重的公式。",
            en: "In 1905, sitting at his desk as a third-class examiner in the Bern patent office, he produced four field-changing papers in a single year, plus a doctoral thesis: the photoelectric effect, Brownian motion, special relativity, and the one extra page of mass-energy equivalence. All of it rested on two postulates — the laws of physics are the same in every inertial frame, and the speed of light in vacuum is the same for everyone — so space and time had to give way. After 1908 he taught in turn and settled in Berlin in 1914, handing the field equations of general relativity to the Prussian Academy in November 1915; the 43 arc-seconds per century by which Mercury’s orbit overran Newtonian prediction, a puzzle for half an age, fell out of his equations at once. In 1917 he applied the same thinking to the whole universe, adding a “cosmological constant” to keep it static, and later called that his greatest blunder; that same year he proposed stimulated radiation, the theoretical ground of the laser decades on. Eddington’s 1919 eclipse expedition confirmed that starlight really bends around the Sun, and overnight he became the first scientist in history to make a global front page. The 1921 Nobel Prize (awarded the following year) honoured the light quantum revealed by the photoelectric effect, not relativity; tellingly, Millikan set out to refute that light-quantum equation by precision experiment and only grew more convinced the better it agreed, earning his own Nobel for the trouble. He never accepted the probability reading of quantum mechanics, clashed head-on with Bohr at successive Solvay Congresses, and his protest that “God does not play dice” generated the EPR argument, which decades later became the experimental starting point of entanglement and quantum information. When the Nazis came to power in 1933 he never returned to Germany and settled at the Institute for Advanced Study in Princeton; in 1939 he signed the letter to Roosevelt that launched the uranium project, and regretted it in his old age. He died at Princeton in 1955, leaving E=mc² as physics’ most compact and most fateful equation. He was born in Ulm in 1879 and had drifted through an unemployed year before the patent office saved him.",
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
            zh: "1831 年生于爱丁堡，恰好与爱因斯坦出生同年、只早了半个世纪出头——爱因斯坦书房里就挂着他的肖像。少年时他因把诗歌押韵迁移到数学上、写出最早的力多边形作图而得“数字缪斯”的诨名；爱丁堡与剑桥毕业后年纪轻轻便任教。1856 年为土星环作奖竞论文，他证明一环若是固体，会被土星潮汐力沿轨道撕碎，故只能是无数绕行的小颗粒——三百年后探测器照片证实他是对的。1860 年他给出气体分子速率分布律，把“温度”解释成分子平均动能、为「分子动理论」与统计力学奠基（后经玻尔兹曼推广成麦克斯韦—玻尔兹曼分布）。1861 年他从法拉第的力线出发补上“位移电流”，顺手算出由此产生的电磁波速度恰等于光速；1865 年给出电磁场的动力学理论，1873 年写成卷帙浩繁的《电学与磁学论》，第一次把电、磁、光统一成同一场里的波动——今天课本上那四个矢量方程，其实是赫维赛德与赫兹在 1880 年代把他原稿里二十多个分量式精简而成。他还是实验家：1861 年拍下世界上第一张永久性彩色照片（用红绿蓝三张滤色片，也由此奠定三原色原理），1871 年创建卡文迪许实验室并任首任主任，还精确测过气体黏度、手算过土星环的稳定性。1879 年他因病去世，年仅 48 岁，没能等到 1887 年赫兹在实验室里把他预言的那无形的波真的打出来——而无线电、电视、雷达、手机这一整条链，都从他补上的那一项“位移电流”开始。",
            en: "Born in Edinburgh in 1831, the very year of Einstein’s birth and only half a century ahead of him — Einstein kept his portrait on the study wall. As a boy he won the nickname “mathematical poet” for transporting the rhyme of verse into geometry and drawing force polygons early. After Edinburgh and Cambridge he was teaching as a young man. His 1856 prize essay on Saturn’s rings proved that if a ring were solid, Saturn’s tidal force would rend it along the orbit, so it must be a host of small orbiting particles — confirmed by probe photographs centuries later. In 1860 he gave the distribution of molecular speeds, reading “temperature” as the mean kinetic energy of molecules and founding the kinetic theory and statistical mechanics (later widened by Boltzmann into the Maxwell–Boltzmann distribution). In 1861, starting from Faraday’s lines of force, he added the “displacement current” and found, almost as a by-product, that the resulting electromagnetic wave travelled at exactly the speed of light; the dynamical theory followed in 1865 and his bulky Treatise on Electricity and Magnetism in 1873, for the first time uniting electricity, magnetism and light as waves in one field — the four vector equations students memorise today are really Heaviside’s and Hertz’s compression of his twenty-odd component equations. He was an experimentalist too: in 1861 he took the world’s first permanent colour photograph (through red, green and blue filters, laying the ground of the three-primary theory), founded the Cavendish Laboratory in 1871 as its first professor, measured gas viscosity, and hand-computed the stability of Saturn’s rings. He died of illness in 1879, aged 48, never living to see Hertz actually generate those invisible waves he had predicted in 1887 — and the whole chain of radio, television, radar and mobile phones begins from the one term he added, the displacement current.",
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
            zh: "1885 年生于哥本哈根，1911 年到剑桥投在卢瑟福门下，正赶上原子被从“实心球”改成「原子的核式模型」。1913 年他连发三篇论原子结构的论文，把普朗克的量子硬装进卢瑟福的核式原子：规定电子只能待在若干条“定态”轨道上、角动量一份份量子化，跃迁时才发光，一举解释了「能级与氢原子光谱」里氢的谱线系、算出了里德伯常量与那条至今以他命名的玻尔半径；1918 年他又提出电子按壳层逐格填充的构造原理，给元素周期表找到了物理根基。这套模型只算得准氢、一到复杂原子就失灵，1926 年薛定谔方程一出即被取代——但“定态与跃迁”的内核留了下来。1920 年他创立哥本哈根理论物理研究所、1921 年正式落成，把它变成量子力学的教堂，1922 年因“原子结构与辐射”获诺贝尔奖。他与爱因斯坦在历次索尔维会议上就「波粒二象性」与概率诠释正面交锋，提出“互补原理”为哥本哈根诠释定调。1939 年，为躲避纳粹迫害而流亡的他与惠勒一起用液滴模型给出裂变的理论解释，并指出真正易裂变的是铀-235。1943 年他经鱼雷艇渡海逃出纳粹占领的丹麦，母亲后来死于集中营；他自己化名“尼古拉斯·贝克”先到伦敦、再赴洛斯阿拉莫斯参与曼哈顿计划，战后奔走于核武器的开放管控与不扩散。1950 年获英国功绩勋章，1962 年在哥本哈根去世；研究所今日改名尼尔斯·玻尔研究所，第 107 号元素以他命名为“玻尔”。他的弟弟哈拉尔是数学家，还拿过 1908 年伦敦奥运会的足球银牌——玻尔年轻时自己也是守门员。",
            en: "Born in Copenhagen in 1885, he went to Cambridge in 1911 to work under Rutherford just as the atom was being rewritten from a solid sphere into a nuclear model. In 1913 he fired off three papers on atomic structure, forcing Planck’s quantum into Rutherford’s nuclear atom: electrons may occupy only certain “stationary” orbits with angular momentum quantised in steps, and light is emitted only on a jump — explaining at a stroke the hydrogen spectral series and the Rydberg constant and computing the Bohr radius that still carries his name; in 1918 he added the building-up principle by which electrons fill shells, giving the periodic table a physical root. The model could only handle hydrogen and broke down for anything heavier, and Schrödinger’s equation supplanted it in 1926 — yet the core of stationary states and jumps survived. He founded the Copenhagen institute in 1920, opened in 1921, turned it into the cathedral of quantum mechanics, and won the 1922 Nobel Prize for atomic structure and radiation. With Einstein he clashed head-on at successive Solvay Congresses over wave-particle duality and the probability reading, and set the tone of the Copenhagen interpretation with his “complementarity.” In 1939 he and Wheeler, both refugees from Nazi persecution, turned the liquid-drop model into a theory of fission and pointed out that it is uranium-235 that fissures most easily. In 1943 he fled occupied Denmark by fishing boat across the sea; his mother later died in a camp. Under the alias “Nicholas Baker” he went first to London and then to Los Alamos on the Manhattan Project, and after the war campaigned for openness and control of nuclear weapons. He took the British Order of Merit in 1950 and died at Copenhagen in 1962; his institute now bears his name, and element 107, bohrium, was named for him. His brother Harald was a mathematician who won Olympic football silver in 1908 — Niels himself had been a goalkeeper in his youth.",
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
            zh: "1867 年生于沙俄统治下的华沙，原名玛丽亚·斯克沃多夫斯卡。当时女子进不了大学，她与姐姐约定互相资助、先后去巴黎求学，此前先在乡下做了几年家庭教师；1891 年入索邦大学，以第一名的成绩读完物理、再修数学，1895 年与皮埃尔·居里结婚。她研究贝克勒尔发现的铀射线，用皮埃尔兄弟造的高灵敏度静电计逐份称量沥青铀矿的“射线强度”，发现钍也会自发放射，并造出“放射性”这个词；更惊人的是，某些矿石的放射远超其中铀所能解释，她据此断言里面藏着未知的强放射元素。1898 年她与皮埃尔先后宣布钋（以祖国波兰命名）与镭。为了证明镭确实是一种元素，他们在棚屋里把成吨的沥青铀矿渣一锅锅煮炼结晶，历时数年才从数吨残渣中提出约十分之一克纯镭盐、并测得镭的原子量约 225（今值 226）。1903 年诺贝尔物理学奖的提名起初只列了贝克勒尔与皮埃尔，经人提醒才补上她的名字——她由此成为第一位获诺贝尔奖的女性；1906 年皮埃尔在一场街头车祸中骤然丧生，她接过了他在索邦的讲席，成为该校第一位女教授。1911 年她因分离出纯镭并定出其原子量独得化学奖，至今仍是唯一横跨两科获奖的人；同年她与物理学家朗之万的私情风波被右翼媒体大肆渲染，几乎让法兰西科学院把她拒之门外。第一次世界大战期间，她把 X 光设备装上汽车、组织起约两百辆流动放射车奔赴前线，估计为上百万伤兵做了检查、避免了无数不必要的截肢。她的笔记本到今天仍带放射性，须存于铅盒、穿防护服才能查阅；1934 年她死于再生障碍性贫血，致病的就是她亲手发现、又日日随身携带的东西。她的女儿伊蕾娜与女婿约里奥 1935 年因人工放射性也拿了化学奖。1995 年，她与皮埃尔的遗骨移葬巴黎先贤祠，成为第一位凭自身成就入葬那里的女性。",
            en: "Born Maria Skłodowska in Warsaw under Russian rule in 1867. Girls were shut out of university then, so she and her sister agreed to fund each other in turn and she went to Paris in 1891 after years as a rural governess; at the Sorbonne she took her physics degree first in the class, then added mathematics, and married Pierre Curie in 1895. Studying Becquerel’s uranium rays with the highly sensitive electrometer Pierre and his brother had built, she weighed the radiation of pitchblende sample by sample, found that thorium likewise gave off rays spontaneously, and coined the word “radioactivity.” More striking, some ores glowed far stronger than their uranium could account for, so she argued a potent unknown element lay hidden. She and Pierre announced polonium — named for her occupied homeland — and then radium in 1898. To prove radium was really an element, in a shed they boiled and crystallised ton after ton of pitchblende residue over several years, isolating about a tenth of a gram of pure radium salt from tons of waste and fixing radium’s atomic weight near 225 (modern value 226). The 1903 physics nomination listed only Becquerel and Pierre, and she was added only after someone pointed out the omission — becoming the first woman to win a Nobel. Pierre was killed outright in a street accident in 1906, and she took over his Sorbonne chair as the university’s first female professor. In 1911 she won the chemistry prize alone, for isolating pure radium and fixing its atomic weight, and she remains the only person to win Nobels in two sciences; that same year the press hounded her liaison with the physicist Langevin so savagely that the French Academy of Sciences very nearly refused to seat her. During the First World War she fitted cars with X-ray equipment and drove some two hundred mobile units to the front, thought to have examined over a million wounded soldiers and spared countless needless amputations. Her notebooks are still radioactive, kept in lead boxes and consulted in protective clothing; she died of aplastic anaemia in 1934, killed by what she had discovered and carried about daily. Her daughter Irène and son-in-law Joliot took the 1935 chemistry prize for artificial radioactivity. In 1995 her and Pierre’s remains were moved to the Paris Panthéon, she the first woman buried there on her own merits.",
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
            zh: "1564 年生于比萨（同年米开朗基罗辞世），1589 年起在比萨、继而在帕多瓦大学任教十八年。他真正的革命不在天上而在地上：相传比萨斜塔上两个铁球同时落地的演示多半出自学生的传闻，他做的是用「伽利略斜面实验」把自由下落“冲淡”到当时能测量的地步——让铜球沿光滑斜面滚下，用水钟（漏壶）计时，测得滚过的距离正比于所用时间的平方，即匀加速运动，再一路外推到竖直落体，得出落体与重量无关、只与时间平方相关的结论。他还把抛出的物体拆成水平匀速与竖直匀加速两笔，指出其轨迹是一条抛物线——这两件事合起来正是近代力学的起点。约 1602 年起他研究摆的等时性，萌生了用摆作钟表的念头。1609 年他听说荷兰人做出了能“望远”的镜筒，就自己磨镜片做到二十到三十倍，把镜口转向天空：看见月球满是环形山与沟壑、太阳有黑子、银河原是无数暗弱恒星挤在一起，还看到木星旁有四颗卫星在绕它转、金星竟像月亮一样有圆缺盈亏——“一切天体都绕地球”的地心说当场露了馅，「天体运动与开普勒定律」的日心图景则被这些观测撑了起来。1610 年他出版《星际信使》公布木星的四大卫星（故又称伽利略卫星），震动全欧。1616 年他被告诫不要坚持哥白尼学说，1632 年发表《关于两门世界体系的对话》为日心说辩护，半年内即被查禁，1633 年在宗教裁判所面前受审、被判终身软禁——相传他念完认罪词低声补了一句“可它确实在转动”。软禁中他写成的《关于两门新科学的对话》（1638 年）才是真正的力学奠基之作，而始终不肯放弃圆形轨道完美信念、拒绝开普勒椭圆的，也正是这个他。1642 年他在阿切特里去世；三百多年后的 1983 年，教廷正式承认当年对他的判决有误。1995 年抵达木星的探测器，以他的名字命名。",
            en: "Born in Pisa in 1564 (the year Michelangelo died), he taught from 1589 first at Pisa then for eighteen years at Padua. His real revolution was on the ground, not in the sky: the Leaning Tower demonstration with two balls landing together was probably a student’s tale, but what he truly did was dilute free fall along an inclined plane until it could be measured — rolling a bronze ball down a smooth groove, timing it with a water clock, and finding the distance run proportional to the square of the time, that is, uniform acceleration, then extrapolating all the way to a vertical drop and concluding that falling is independent of weight and governed by the square of time. He also split a thrown body into horizontal uniform motion and vertical uniform acceleration and showed its path is a parabola — and these two moves together were the start of modern mechanics. Around 1602 he studied the isochronism of the pendulum and conceived the pendulum clock. In 1609, hearing that the Dutch had made a tube that brought distant things near, he ground his own lenses to twenty or thirty powers and turned them skyward: he saw a Moon all craters and gorges, sunspots on the Sun, the Milky Way as a press of faint stars, four moons circling Jupiter, and Venus waxing and waning like our Moon — so “everything orbits the Earth” cracked open on the spot, while observations braced up the heliocentric picture of Kepler’s planetary motion. His Sidereal Messenger of 1610 announced the four satellites of Jupiter (hence Galilean moons) and shook all Europe. Warned in 1616 not to hold to Copernicus, he published his Dialogue on the Two Chief World Systems in 1632 to defend the heliocentric view; within six months it was banned, and in 1633 he stood before the Inquisition and was sentenced to house arrest for life — said to have muttered, after recanting, “and yet it moves.” The Two New Sciences he wrote under confinement (1638) is the true founding text of mechanics, and it was this same man who clung to perfect circular orbits and refused Kepler’s ellipses. He died at Arcetri in 1642; more than three centuries later, in 1983, the Church formally acknowledged the old verdict against him had been wrong. The probe that reached Jupiter in 1995 was named for him.",
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
            zh: "1791 年生于伦敦近郊一个铁匠贫家，正规教育只到识字与初级算术，代数都使他为难——他后来全部的物理直觉几乎不借助数学。十二三岁进书肆当装订学徒，五年里把经手的书一本本读过去；1812 年他花掉几乎整周工钱买票去听戴维的公开讲座，把讲稿整理成厚厚的笔记呈上去自荐，1813 年终于得戴维收作助手（起初只肯做杂役），还随戴维欧游数年大开眼界。1820 年奥斯特发现电流能使磁针偏转，次年法拉第就做出让导线绕着磁极不停旋转的装置——“电磁旋转”，把电能变成持续的机械运动，是电动机的祖先，当时却被同行讥为“无用的把戏”。1831 年他反过来追问“磁能否生电”，用两个线圈发现只有在一个通电或断电的瞬间、另一个里才闪过一股电流，据此确立「电磁感应」定律与感应电流方向的规律，造出最早的感应圆盘，让电力第一次成为可以源源不断产生的东西——今天整座电力工业的原理由此而起。1833 年起他给出电解定律，把电与化学计量定量地连起来，“电极”“离子”“阳极”“阴极”这些词是惠威尔为他造的；后人把电解一摩尔单价离子所需的电量记作法拉第常数，约 9.65×10⁴ 库仑每摩尔，恰等于元电荷乘以阿伏伽德罗常数。他数学近乎为零，却坚持用“力线”去想象空间本身被电场与磁场充满，把物理学从超距作用里解放出来——麦克斯韦说自己的方程不过是给法拉第的思想作的翻译，爱因斯坦把场论的源头也记在他名下。1845 年他发现有些材料会被磁场排斥（抗磁性），又发现让偏振光穿过被磁化的玻璃时振动面会旋转——“法拉第效应”，第一次把光与电磁牵连在一起。1855 年他拒绝为克里米亚战争研制毒气。1825 年他创办的皇家研究所圣诞讲座延续至今，他自己一生却两次婉拒封爵、也拒绝出任皇家学会会长（因信仰不肯宣誓）。1867 年他安详离世，只想长眠于海格特那块再普通不过的墓里。",
            en: "Born in 1791 to a poor blacksmith’s family on the edge of London, his formal schooling stopped at reading and elementary arithmetic, and algebra itself was a struggle — nearly all his later physical intuition ran without mathematics. Apprenticed at twelve or thirteen to a bookbinder, he read his way through the volumes that crossed his bench for five years; in 1812 he spent almost a week’s wages on a ticket to Davy’s public lectures, bound his notes into a thick volume and offered them as a recommendation, and in 1813 finally got taken on by Davy as an assistant (glad at first even to do menial work), touring Europe with him for several years and seeing a great deal. After Oersted found in 1820 that a current deflects a compass needle, Faraday the very next year built a device that spun a wire endlessly around a magnetic pole — “electromagnetic rotation,” turning electricity into continuous motion, the ancestry of the motor, then mocked by colleagues as a useless trick. In 1831 he asked the reverse, can magnetism make electricity, and with two coils found that only in the instant a current is started or stopped does a flash of current jump in the other, fixing the law of electromagnetic induction and the rule for its direction and building the earliest induction disc — the first time electricity could be made to flow in a stream, the principle on which the whole electrical industry stands. From 1833 he gave the laws of electrolysis, tying electricity to chemical amounts with numbers, and the words electrode, ion, anode and cathode were coined for him by Whewell; the charge needed to electrolyse one mole of a singly charged ion is still called the faraday, about 9.65×10⁴ coulombs per mole, exactly the elementary charge times the Avogadro constant. Almost without mathematics, he insisted on lines of force filling space itself, freeing physics from action at a distance — Maxwell called his own equations a translation of Faraday’s ideas, and Einstein traced field theory back to him. In 1845 he found that some materials are repelled by a magnet (diamagnetism), and that passing polarised light through magnetised glass turns its plane of vibration — the Faraday effect, the first to link light and electromagnetism. In 1855 he refused to help design chemical weapons for the Crimean War. The Royal Institution Christmas Lectures he founded in 1825 run to this day, though he twice declined a knighthood and refused the presidency of the Royal Society (his faith would not let him swear the oath). He died peacefully in 1867, asking only to lie in an unremarkable grave at Highgate.",
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
            zh: "1571 年生于德国的小城魏尔德，幼年一场天花让他视力受损、体弱多病，却把他推向天文。1596 年他写出《宇宙的奥秘》，用五个正多面体层层嵌套去解释当时已知六颗行星的轨道间距——这个模型后来被他自己推翻，但那份“宇宙背后必有一套可算的数学秩序”的执念是对的，也正是它引来第谷的注意。1600 年他赴布拉格与第谷合作，一年后第谷去世、留下一辈子肉眼观测的数据，精度达一到两角分，是望远镜之前史上最准的一份。为火星这颗第谷指定的“硬骨头”，他苦战经年：圆的轨道始终与观测差着约 8 角分，他不肯把这当成误差抹平，终于承认轨道是椭圆，1609 年出版《新天文学》公布前两大定律——轨道是以太阳为一个焦点的椭圆（火星偏心率约 0.093）、行星与太阳连线在相等时间里扫过相等的面积，于是行星近时快、远时慢。第二条面积定律用今天的话说，本质上正是角动量守恒在天幕上的投影。1619 年他在《世界的和谐》里给出第三定律：各行星公转周期的平方正比于其轨道半长轴的立方，从此六条轨道不再是六件孤立的事，而被串成一个可算的体系——这正是四十年后牛顿「万有引力定律」最直接的经验地基。他的动机并不“现代”：他相信有一种从太阳发出、随距离减弱并扫动行星的力（那是引力观念的前身），也着迷于数字与几何的和谐。他还是光学先驱：1604 年正确解释了近视与远视的成因、说明小孔成像与光线如何落在视网膜上，并改进出用两片凸透镜的开普勒式望远镜。1615 年母亲被控行巫术、被囚十四个月，他放下研究为她辩护，花六年打赢官司；1627 年凭第谷数据编成《鲁道夫星表》、把行星位置算到约两角分精度，却因战乱迟迟未能印行。1630 年，他为向雇主讨要拖欠多年的薪俸奔赴雷根斯堡，病逝途中，终年五十九岁。他一生清贫动荡，却在天上为人类理清了行星的舞步。",
            en: "Born in 1571 in the small German town of Weil der Stadt, a childhood attack of smallpox left him frail and short-sighted yet pushed him toward the sky. In 1596 he published the Cosmographic Mystery, nesting the five regular solids to explain the spacings of the six then-known planetary orbits — a model he later overthrew himself, but his faith that a computable mathematical order must lie behind the cosmos was right, and it drew Tycho’s attention. In 1600 he went to Prague to work with Tycho, who died the next year leaving a lifetime of naked-eye data accurate to one or two arc-minutes, the best before the telescope. Over the planet Tycho had assigned him, the tough nut of Mars, he laboured for years: a circular orbit never matched the observations by about eight arc-minutes, and instead of smoothing that off as error he conceded the orbit is an ellipse, publishing the New Astronomy in 1609 with the first two laws — the orbit is an ellipse with the Sun at one focus (Mars’ eccentricity is about 0.093), and the line joining planet to Sun sweeps equal areas in equal times, so a planet speeds up near the Sun and slows far away; that equal-areas law, in modern words, is essentially the conservation of angular momentum projected onto the sky. In 1619, in The Harmony of the Worlds, he gave the third law: the squares of the periods are proportional to the cubes of the orbits’ semi-major axes, so the six orbits ceased to be six isolated facts and were strung into one computable system — the most direct empirical foundation of Newton’s universal gravitation forty years on. His motives were not “modern”: he believed in a force issuing from the Sun, weakening with distance and sweeping the planets along, a precursor of gravitation, and he was bewitched by the harmony of number and geometry. He was also an optical pioneer: in 1604 he correctly explained near- and farsightedness, how a pinhole forms an image and how light falls on the retina, and improved the telescope into the Keplerian form with two convex lenses. In 1615 his mother was charged with witchcraft and held fourteen months; he set aside his work and spent six years winning her defence. In 1627 he compiled the Rudolphine Tables from Tycho’s data, placing the planets to about two arc-minutes, but war delayed their printing. In 1630, travelling to Regensburg to collect a salary withheld from him for years, he fell ill and died on the road, aged fifty-nine. He lived poor and restless, yet up in the sky he set the planets’ dance in order for humankind.",
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
            zh: "1857 年生于汉堡一个法学世家，起初在德累斯顿学工程（曾以弹性体模拟晶体光学的各向异性，那份“赫兹接触”的力学分析至今是接触问题的起点），后转投物理、进柏林大学师从亥姆霍兹。老师给他出了道题：去证明麦克斯韦预言的那些“电磁波”真的存在。1887 至 1888 年，他在卡尔斯鲁厄理工的实验室里，用感应线圈激励一对中间留了小间隙的铜棒（偶极振子）当发射器，再以一个同样留缝的开环当接收器——当发送端火花一闪，接收环对面的小缝里竟也跳出了微弱的火花：波真的收到了。他一步步测出这种波会被金属板反射、被石蜡大棱镜折射、是横波、并会叠成驻波，再由测得的波长与频率算出它的速度约 3×10⁸ 米每秒、与光速吻合——麦克斯韦赢了，光从此被并成电磁波谱里可见的那一小段，无线电、电视、雷达、手机整条链都从这对简陋的火花隙起步。有意思的是，就在同一年他发现一束紫外光照到接收电极上、会让火花更容易跳起来，这是「光电效应实验」最早的一条观测记录，其解释要等爱因斯坦 1905 年接手、并据「波粒二象性」的光量子一举道破。可他对自己造出的波和这道光电现象都提不起应用兴趣，说这一切“不过是证明麦克斯韦是对的”，也由此留下科技史上最著名的失算之一：把无线电拱手让给了后来的马可尼与波波夫。他一生纯粹做基础物理，还研究过阴极射线的本性（误以为它能穿透薄金属、偏向波动说，与勒纳德的粒子说相持，后来才厘清），并精确测过接触起电。1894 年他因血液感染（败血症）骤然离世，年仅 36 岁。为了纪念他，频率的单位——每秒一次振动——被命名为“赫兹”，直到 1960 年才由国际计量大会正式并入国际单位制。",
            en: "Born in Hamburg in 1857 into a family of jurists, he first studied engineering in Dresden (modelling the anisotropy of crystal optics with elastic bodies, and that “Hertzian contact” analysis of stress is still the starting point of contact problems), then turned to physics and went to the University of Berlin under Helmholtz. His teacher set him a task: go prove that the electromagnetic waves Maxwell predicted really exist. In 1887–1888, in the laboratory at Karlsruhe, he drove a pair of copper rods with a small gap in the middle — a dipole oscillator — as a transmitter with an induction coil, and caught the wave with an open ring that likewise had a gap: when a spark flashed at the sender, a faint spark leapt across the far side of the receiving ring too. The wave had been received. Step by step he showed it is reflected by metal sheets, refracted by a giant paraffin prism, is a transverse wave, and stacks into standing waves; from the measured wavelength and frequency he computed its speed at about 3×10⁸ metres per second, matching the speed of light — Maxwell had won, light was folded into the visible sliver of the electromagnetic spectrum, and the whole chain of radio, television, radar and mobile phones begins from those two crude spark gaps. Curiously, that same year he noticed that ultraviolet light falling on the receiving electrode made the spark jump more readily — the first recorded observation of the photoelectric effect, left for Einstein to explain in 1905 with the light quantum and wave-particle duality. Yet he took no interest in applications for either the waves or the photoelectric phenomenon, calling all of it “just a proof that Maxwell was right,” and so handed down one of the most famous miscalculations in the history of technology: radio went to Marconi and Popov, who came after. He spent his life on pure physics, also probing the nature of cathode rays (wrongly leaning toward the wave view because he thought they passed through thin metal, at odds with Lenard’s particle view, cleared up only later) and measuring contact electrification precisely. In 1894 he died suddenly of a blood infection, sepsis, at only 36. In his honour the unit of frequency — one vibration per second — was named the hertz, though it was only formally folded into the SI by the General Conference on Weights and Measures in 1960.",
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
