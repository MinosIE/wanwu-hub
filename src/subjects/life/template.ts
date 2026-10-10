export const TEMPLATE = `<div class="wrap">
      <section class="hero">
        <button
          class="icon-btn theme-btn"
          id="themeBtn"
          aria-label="切换明暗主题"
        >
          <span id="themeLabel">夜间</span>
        </button>
        <button
          class="icon-btn lang-btn"
          id="langBtn"
          aria-label="切换语言 Switch language"
        >
          <span id="langLabel">中文</span>
        </button>
        <h1 data-i18n="heroTitle">万物哲学 · Thought of Everything</h1>
        <p data-i18n="heroSub">
          从孔子到康德，从庄子到波伏瓦——把东西方的思想长河，讲成看得懂的常识。中立、结构化、中英双语、免费无广告。
        </p>
        <div class="kpis" id="kpis"></div>
      </section>

      <div class="search">
        <input
          id="search"
          type="search"
          autocomplete="off"
          aria-label="搜索"
          data-i18n-attr="placeholder:searchPlaceholder"
          placeholder="搜索：流派 / 命题 / 著作 / 思想家，如「儒家」「自由意志」「理想国」"
        />
        <div class="search-results" id="searchResults" hidden></div>
      </div>

      <nav class="modnav" id="modNav" aria-label="模块导航">
        <button class="mod active" data-go="m-home" data-i18n="nav.home">
          概览
        </button>
        <button class="mod" data-go="m-schools" data-i18n="nav.schools">
          哲学流派
        </button>
        <button class="mod" data-go="m-questions" data-i18n="nav.questions">
          核心命题
        </button>
        <button class="mod" data-go="m-principles" data-i18n="nav.principles">
          生命原理
        </button>
        <button class="mod" data-go="m-classics" data-i18n="nav.classics">
          经典著作
        </button>
        <button class="mod" data-go="m-thinkers" data-i18n="nav.thinkers">
          思想家
        </button>
        <button class="mod" data-go="m-endemics" data-i18n="nav.endemics">
          中国特有物种
        </button>
      </nav>

      <section class="module active" id="m-home">
        <p class="home-lead" data-i18n="homeLead">
          从流派到命题，从经典到人物 —— 选一个板块，开始你的思想旅行。
        </p>
        <div class="home-grid" id="homeGrid"></div>
        <section class="refs" id="refsBox" hidden>
          <h2 data-i18n="refsTitle">主要参考资料与数据来源</h2>
          <p class="mod-sub" data-i18n="refsSub">
            本站为通识性整理，重要论点均标注出处；内容仅供学习，不构成专业意见。
          </p>
          <ul class="ref-list" id="refList"></ul>
        </section>
      </section>

      <section class="module" id="m-schools">
        <header class="mod-head">
          <h2 data-i18n="schools.title">哲学流派</h2>
          <p class="mod-sub" data-i18n="schools.sub">
            同一组关于「如何生活、如何认识、如何共处」的问题，不同的传统给出不同的处方。点击卡片看详解。
          </p>
        </header>
        <div class="filters" id="schoolsFilters"></div>
        <p class="count" id="schoolsCount"></p>
        <div class="card-grid" id="schoolsGrid"></div>
      </section>

      <section class="module" id="m-questions">
        <header class="mod-head">
          <h2 data-i18n="questions.title">核心命题</h2>
          <p class="mod-sub" data-i18n="questions.sub">
            哲学不是结论，而是一组反复被追问的根本问题。每个问题列出主要立场与为何重要。
          </p>
        </header>
        <div class="filters" id="questionsFilters"></div>
        <p class="count" id="questionsCount"></p>
        <div class="card-grid" id="questionsGrid"></div>
      </section>

      <section class="module" id="m-principles">
        <header class="mod-head">
          <h2 data-i18n="principles.title">生命原理</h2>
          <p class="mod-sub" data-i18n="principles.sub">
            从细胞到生态，生命如何获取能量、传递遗传、演化适应并自我调节。点击卡片看机制与要点。
          </p>
        </header>
        <div class="filters" id="principlesFilters"></div>
        <p class="count" id="principlesCount"></p>
        <div class="card-grid" id="principlesGrid"></div>
      </section>

      <section class="module" id="m-classics">
        <header class="mod-head">
          <h2 data-i18n="classics.title">经典著作</h2>
          <p class="mod-sub" data-i18n="classics.sub">
            穿越时间的文本：它们提出的问题，至今仍在我们的争论里回响。点击看要义与影响。
          </p>
        </header>
        <div class="filters" id="classicsFilters"></div>
        <p class="count" id="classicsCount"></p>
        <div class="card-grid" id="classicsGrid"></div>
      </section>

      <section class="module" id="m-thinkers">
        <header class="mod-head">
          <h2 data-i18n="thinkers.title">思想家</h2>
          <p class="mod-sub" data-i18n="thinkers.sub">
            孔子、老子、柏拉图、亚里士多德、康德、尼采、休谟、萨特、波伏瓦……他们各自回答了什么。
          </p>
        </header>
        <div class="filters" id="thinkersFilters"></div>
        <p class="count" id="thinkersCount"></p>
        <div class="card-grid" id="thinkersGrid"></div>
      </section>

      <section class="module" id="m-endemics">
        <header class="mod-head">
          <h2 data-i18n="endemics.title">中国特有物种</h2>
          <p class="mod-sub" data-i18n="endemics.sub">
            从旗舰物种到孑遗植物：讲清它们的特征、分布与保护现状。
          </p>
        </header>
        <div class="filters" id="endemicsFilters"></div>
        <p class="count" id="endemicsCount"></p>
        <div class="card-grid" id="endemicsGrid"></div>
      </section>

      <footer class="foot" id="foot"></footer>
    </div>

    <button
      class="to-top"
      id="toTop"
      type="button"
      aria-label="返回顶部"
      title="返回顶部"
    >
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>

    <div class="detail-root" id="detailRoot" hidden></div>`;
