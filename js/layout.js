(function () {
  const { t, getLang, setLang, LANGS, applyPage } = window.KHUNSA_I18N;

  function getSpots() {
    const lang = getLang();
    const extra = (window.KHUNSA_SPOTS_I18N && window.KHUNSA_SPOTS_I18N[lang]) || {};
    return (window.KHUNSA_SPOTS || []).map((s) => Object.assign({}, s, extra[s.id] || {}));
  }

  window.KHUNSA = {
    outdoorIds: [1, 2, 6, 12],
    isHome: () => /(?:\/|index\.html)$/i.test(location.pathname) || location.pathname.endsWith("/"),
    spotUrl: (id) => `spot.html?id=${id}`,
    queryId: () => Number(new URLSearchParams(location.search).get("id") || 0),
    getSpots,
    get spots() {
      return getSpots();
    }
  };

  function menuItems(spots) {
    return [
      {
        label: t("navNews"),
        href: "index.html#news",
        children: [
          { label: t("navNewsUpdates"), href: "index.html#news" },
          { label: t("navNewsNotes"), href: "index.html#news" }
        ]
      },
      {
        label: t("navVisit"),
        href: "visit.html",
        children: [
          { label: t("navStatus"), href: "visit.html#status" },
          { label: t("navRoute"), href: "visit.html#route" },
          { label: t("navMap"), href: "map.html" },
          { label: t("navRules"), href: "visit.html#rules" }
        ]
      },
      {
        label: t("navAbout"),
        href: "about.html",
        children: [
          { label: t("navHistory"), href: "about.html" },
          { label: t("navName"), href: "about.html#name" },
          { label: t("navBattle"), href: "about.html#battle" },
          { label: t("navSchool"), href: "about.html#school" },
          { label: t("navOpenSpots"), href: "visit.html#open" },
          { label: t("navClosedSpots"), href: "visit.html#closed" },
          { label: t("navMural"), href: "spot.html?id=12" }
        ]
      },
      {
        label: t("navExplore"),
        href: "index.html#explore",
        children: spots.map((s) => ({
          label: `${String(s.id).padStart(2, "0")} ${s.name}`,
          href: `spot.html?id=${s.id}`
        }))
      }
    ];
  }

  function langHtml() {
    const cur = getLang();
    return `
      <nav class="lang" aria-label="${t("lang")}">
        ${LANGS.map((l) =>
          `<button type="button" data-lang="${l.code}" class="${l.code === cur ? "is-on" : ""}" title="${l.name}">${l.label}</button>`
        ).join("")}
      </nav>`;
  }

  function headerHtml(spots) {
    const items = menuItems(spots).map((item) => {
      const links = item.children
        .map((c) => `<li><a href="${c.href}">${c.label}</a></li>`)
        .join("");
      const subClass = item.children.length > 6 ? "sub wide" : "sub";
      return `
        <li class="nav-item">
          <a href="${item.href}">${item.label}</a>
          <ul class="${subClass}">${links}</ul>
        </li>`;
    }).join("");

    return `
      <a class="skip" href="#main" accesskey="C">${t("skip")}</a>
      <div class="utility">
        <div class="wrap utility-inner">
          <a href="index.html" accesskey="U">${t("home")}</a>
          <a href="sitemap.html">${t("sitemap")}</a>
          <span class="fs">
            ${t("fontSize")}
            <button type="button" data-fs="s" aria-label="${t("fontS")}">${t("fontS")}</button>
            <button type="button" data-fs="m" aria-label="${t("fontM")}">${t("fontM")}</button>
            <button type="button" data-fs="l" aria-label="${t("fontL")}">${t("fontL")}</button>
          </span>
          ${langHtml()}
        </div>
      </div>
      <header class="masthead">
        <div class="wrap masthead-inner">
          <a class="logo" href="index.html">
            <span class="mark" aria-hidden="true">昆</span>
            <span>
              <strong>${t("siteName")}</strong>
              <em>${t("sitePlace")}</em>
            </span>
          </a>
          <form class="search" action="search.html" method="get" role="search">
            <label class="sr" for="q">${t("search")}</label>
            <input id="q" name="q" type="search" placeholder="${t("searchPlaceholder")}">
            <button type="submit">${t("search")}</button>
          </form>
          ${langHtml()}
          <button class="menu-btn" type="button" aria-expanded="false" aria-controls="main-nav">${t("menu")}</button>
        </div>
        <nav id="main-nav" class="main-nav" aria-label="${t("navExplore")}">
          <div class="wrap">
            <ul>${items}</ul>
          </div>
        </nav>
      </header>`;
  }

  function footerHtml(spots) {
    return `
      <footer class="site-foot">
        <div class="wrap foot-grid">
          <div>
            <h2>${t("navVisit")}</h2>
            <ul>
              <li><a href="visit.html#status">${t("navStatus")}</a></li>
              <li><a href="visit.html#route">${t("navRoute")}</a></li>
              <li><a href="map.html">${t("navMap")}</a></li>
              <li><a href="visit.html#rules">${t("navRules")}</a></li>
            </ul>
          </div>
          <div>
            <h2>${t("navAbout")}</h2>
            <ul>
              <li><a href="about.html">${t("navHistory")}</a></li>
              <li><a href="about.html#school">${t("navSchool")}</a></li>
              <li><a href="spot.html?id=1">${spots[0] ? spots[0].name : t("statue")}</a></li>
              <li><a href="spot.html?id=7">${t("guideRoom")}</a></li>
              <li><a href="spot.html?id=12">${t("navMural")}</a></li>
            </ul>
          </div>
          <div>
            <h2>${t("navExplore")}</h2>
            <ul>
              ${spots.slice(0, 6).map((s) => `<li><a href="spot.html?id=${s.id}">${s.name}</a></li>`).join("")}
            </ul>
          </div>
          <div>
            <h2>${t("footerContact")}</h2>
            <p>${t("footerAddress")}</p>
            <p>${t("footerDisclaimer")}</p>
          </div>
        </div>
        <div class="wrap foot-meta">
          <span>${t("footerUpdated")}</span>
          <span>${t("footerBrand")}</span>
        </div>
      </footer>`;
  }

  function applyFont(size) {
    document.documentElement.dataset.fs = size;
    localStorage.setItem("khunsa-fs", size);
    document.querySelectorAll(".fs button").forEach((btn) => {
      btn.classList.toggle("is-on", btn.dataset.fs === size);
    });
  }

  function bindChrome() {
    const saved = localStorage.getItem("khunsa-fs") || "m";
    applyFont(saved);
    document.querySelectorAll(".fs button").forEach((btn) => {
      btn.addEventListener("click", () => applyFont(btn.dataset.fs));
    });
    document.querySelectorAll(".lang button").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.getElementById("main-nav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        menuBtn.setAttribute("aria-expanded", String(open));
      });
    }
  }

  window.KHUNSA.renderChrome = function renderChrome() {
    const spots = getSpots();
    document.body.insertAdjacentHTML("afterbegin", headerHtml(spots));
    document.body.insertAdjacentHTML("beforeend", footerHtml(spots));
    bindChrome();
    applyPage();
  };

  window.KHUNSA.icon = function icon(name) {
    const stroke = "#fff";
    const map = {
      statue: `<svg viewBox="0 0 64 40"><path d="M8 32h48M18 32c4-10 8-18 16-18s8 4 14 18" fill="none" stroke="${stroke}" stroke-width="1.6"/><circle cx="34" cy="10" r="3" fill="${stroke}"/></svg>`,
      cave: `<svg viewBox="0 0 64 40"><path d="M12 32q20-28 40 0" fill="none" stroke="${stroke}" stroke-width="1.6"/><path d="M24 32q8-14 16 0" fill="none" stroke="${stroke}" stroke-width="1.3"/></svg>`,
      bed: `<svg viewBox="0 0 64 40"><rect x="14" y="10" width="36" height="22" fill="none" stroke="${stroke}" stroke-width="1.5"/><path d="M14 10 L32 4 L50 10" fill="none" stroke="${stroke}" stroke-width="1.5"/></svg>`,
      dining: `<svg viewBox="0 0 64 40"><rect x="14" y="10" width="36" height="22" fill="none" stroke="${stroke}" stroke-width="1.5"/><path d="M14 10 L32 4 L50 10" fill="none" stroke="${stroke}" stroke-width="1.5"/></svg>`,
      barracks: `<svg viewBox="0 0 64 40"><rect x="14" y="10" width="36" height="22" fill="none" stroke="${stroke}" stroke-width="1.5"/><path d="M14 10 L32 4 L50 10" fill="none" stroke="${stroke}" stroke-width="1.5"/></svg>`,
      bomb: `<svg viewBox="0 0 64 40"><ellipse cx="32" cy="22" rx="14" ry="8" fill="none" stroke="${stroke}" stroke-width="1.6"/><path d="M22 16l20 12M42 16L22 28" stroke="${stroke}" stroke-width="1.1"/></svg>`,
      guide: `<svg viewBox="0 0 64 40"><rect x="14" y="10" width="36" height="22" fill="none" stroke="${stroke}" stroke-width="1.5"/><path d="M14 10 L32 4 L50 10" fill="none" stroke="${stroke}" stroke-width="1.5"/></svg>`,
      aide: `<svg viewBox="0 0 64 40"><rect x="14" y="10" width="36" height="22" fill="none" stroke="${stroke}" stroke-width="1.5"/><path d="M14 10 L32 4 L50 10" fill="none" stroke="${stroke}" stroke-width="1.5"/></svg>`,
      reception: `<svg viewBox="0 0 64 40"><rect x="14" y="10" width="36" height="22" fill="none" stroke="${stroke}" stroke-width="1.5"/><path d="M14 10 L32 4 L50 10" fill="none" stroke="${stroke}" stroke-width="1.5"/></svg>`,
      bedroom: `<svg viewBox="0 0 64 40"><rect x="14" y="10" width="36" height="22" fill="none" stroke="${stroke}" stroke-width="1.5"/><path d="M14 10 L32 4 L50 10" fill="none" stroke="${stroke}" stroke-width="1.5"/></svg>`,
      zen: `<svg viewBox="0 0 64 40"><path d="M32 8c8 8 8 16 0 24C24 24 24 16 32 8z" fill="none" stroke="${stroke}" stroke-width="1.6"/></svg>`,
      mural: `<svg viewBox="0 0 64 40"><rect x="10" y="8" width="44" height="24" fill="none" stroke="${stroke}" stroke-width="1.5"/><circle cx="24" cy="20" r="5" fill="none" stroke="${stroke}"/><circle cx="40" cy="20" r="5" fill="none" stroke="${stroke}"/></svg>`
    };
    return map[name] || map.bed;
  };
})();
