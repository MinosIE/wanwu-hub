export const TEMPLATE = `<div class="wrap">
      <section class="hero">  <h1 data-i18n="heroTitle">万物哲学</h1>
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
        <button class="mod" data-go="m-branches" data-i18n="nav.branches">
          哲学分支
        </button>
        <button class="mod" data-go="m-classics" data-i18n="nav.classics">
          经典著作
        </button>
        <button class="mod" data-go="m-thinkers" data-i18n="nav.thinkers">
          思想家
        </button>
        <button class="mod" data-go="m-glossary" data-i18n="nav.glossary">
          哲学术语
        </button>
        <button class="mod" data-go="m-timeline" data-i18n="nav.timeline">
          时间线
        </button>
        <button class="mod" data-go="m-experiments" data-i18n="nav.experiments">
          思想实验
        </button>
        <button class="mod" data-go="m-compare" data-i18n="nav.compare">
          中西对照
        </button>
        <button class="mod" data-go="m-myths" data-i18n="nav.myths">
          常见误区
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

      <section class="module" id="m-branches">
        <header class="mod-head">
          <h2 data-i18n="branches.title">哲学分支</h2>
          <p class="mod-sub" data-i18n="branches.sub">
            形而上学、认识论、伦理学与各大分支——哲学把哪些问题划为己有。
          </p>
        </header>
        <div class="filters" id="branchesFilters"></div>
        <p class="count" id="branchesCount"></p>
        <div class="card-grid" id="branchesGrid"></div>
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

      <section class="module" id="m-glossary">
        <header class="mod-head">
          <h2 data-i18n="glossary.title">哲学术语</h2>
          <p class="mod-sub" data-i18n="glossary.sub">
            哲学里最容易被误用的词：先弄清它们各自的确切含义，再开始争论。点击术语看定义与白话版。
          </p>
        </header>
        <div class="filters" id="glossaryFilters"></div>
        <p class="count" id="glossaryCount"></p>
        <div class="card-grid" id="glossaryGrid"></div>
      </section>

      <section class="module" id="m-timeline">
        <header class="mod-head">
          <h2 data-i18n="timeline.title">哲学史时间线</h2>
          <p class="mod-sub" data-i18n="timeline.sub">
            把思想放回时间里：从米利都的日食预测到语言学的转向，一条由事件串起的哲学史。点击看前因后果。
          </p>
        </header>
        <div class="filters" id="timelineFilters"></div>
        <p class="count" id="timelineCount"></p>
        <div class="card-grid" id="timelineGrid"></div>
      </section>

      <section class="module" id="m-experiments">
        <header class="mod-head">
          <h2 data-i18n="experiments.title">思想实验</h2>
          <p class="mod-sub" data-i18n="experiments.sub">
            哲学家在头脑里做的实验：场景极简，结论极重。孪生地球、中文房间、体验机器……点击走进每个场景。
          </p>
        </header>
        <div class="filters" id="experimentsFilters"></div>
        <p class="count" id="experimentsCount"></p>
        <div class="card-grid" id="experimentsGrid"></div>
      </section>

      <section class="module" id="m-compare">
        <header class="mod-head">
          <h2 data-i18n="compare.title">中西对照</h2>
          <p class="mod-sub" data-i18n="compare.sub">
            同一组问题，两个传统各自的回答：名与逻各斯、仁与正义、礼与自然法。点击看两边主张与会合点。
          </p>
        </header>
        <div class="filters" id="compareFilters"></div>
        <p class="count" id="compareCount"></p>
        <div class="card-grid" id="compareGrid"></div>
      </section>

      <section class="module" id="m-myths">
        <header class="mod-head">
          <h2 data-i18n="myths.title">常见误区</h2>
          <p class="mod-sub" data-i18n="myths.sub">
            被引用成口号的说法，原文里往往另有一层意思。逐条回到文本，看清被简化掉了什么。
          </p>
        </header>
        <div class="filters" id="mythsFilters"></div>
        <p class="count" id="mythsCount"></p>
        <div class="card-grid" id="mythsGrid"></div>
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
