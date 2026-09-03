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

  function langHtml() {
    const cur = getLang();
    return `
      <nav class="lang" aria-label="${t("lang")}">
        ${LANGS.map((l) =>
          `<button type="button" data-lang="${l.code}" class="${l.code === cur ? "is-on" : ""}" title="${l.name}">${l.label}</button>`
        ).join("")}
      </nav>`;
  }

  function fsHtml() {
    return `
      <span class="fs">
        ${t("fontSize")}
        <button type="button" data-fs="s" aria-label="${t("fontS")}">${t("fontS")}</button>
        <button type="button" data-fs="m" aria-label="${t("fontM")}">${t("fontM")}</button>
        <button type="button" data-fs="l" aria-label="${t("fontL")}">${t("fontL")}</button>
      </span>`;
  }

  function searchHtml(id, compact) {
    const ph = compact ? t("search") : t("searchPlaceholder");
    const btn = compact
      ? `<button type="submit" aria-label="${t("search")}">↗</button>`
      : `<button type="submit">${t("search")}</button>`;
    return `
      <form class="search${compact ? " is-compact" : ""}" action="search.html" method="get" role="search">
        <label class="sr" for="${id}">${t("search")}</label>
        <input id="${id}" name="q" type="search" placeholder="${ph}">
        ${btn}
      </form>`;
  }

  function headerHtml(spots) {
    const spotLinks = spots.map((s) =>
      `<li><a href="spot.html?id=${s.id}">${String(s.id).padStart(2, "0")} ${s.name}</a></li>`
    ).join("");

    return `
      <a class="skip" href="#main" accesskey="C">${t("skip")}</a>
      <header class="site-nav">
        <div class="wrap nav-bar">
          <a class="logo" href="index.html" accesskey="U">
            <strong>${t("siteName")}</strong>
            <em>${t("siteEn")}</em>
          </a>
          <ul class="nav-links">
            <li><a href="guide.html">${t("navGuide")}</a></li>
            <li><a href="visit.html">${t("navVisit")}</a></li>
            <li><a href="map.html">${t("navMap")}</a></li>
            <li><a href="about.html">${t("navHistory")}</a></li>
            <li><a href="sources.html">${t("navSources")}</a></li>
          </ul>
          <div class="nav-tools">
            <a class="search-link" href="search.html">${t("search")}</a>
            ${langHtml()}
            <button class="menu-btn" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="${t("menu")}">
              <span></span>
            </button>
          </div>
        </div>
      </header>
      <nav id="main-nav" class="drawer" aria-label="${t("menu")}">
        <button class="drawer-close" type="button">${t("closeMenu")}</button>
        <h2>${t("quickLinks")}</h2>
        <ul>
          <li><a href="guide.html">${t("navGuide")}</a></li>
          <li><a href="visit.html">${t("navVisit")}</a></li>
          <li><a href="visit.html#status">${t("navStatus")}</a></li>
          <li><a href="map.html">${t("navMap")}</a></li>
          <li><a href="archive.html">${t("navGallery")}</a></li>
          <li><a href="about.html">${t("navHistory")}</a></li>
          <li><a href="sources.html">${t("navSources")}</a></li>
          <li><a href="oral-history.html">${t("navOral")}</a></li>
          <li><a href="contribute.html">${t("navContribute")}</a></li>
          <li><a href="index.html#news">${t("newsTitle")}</a></li>
          <li><a href="visit.html#route">${t("navRoute")}</a></li>
          <li><a href="visit.html#rules">${t("navRules")}</a></li>
          <li><a href="sitemap.html">${t("sitemap")}</a></li>
        </ul>
        <h2>${t("navExplore")}</h2>
        <ul>${spotLinks}</ul>
        <div class="drawer-tools">
          ${searchHtml("q-drawer")}
          ${langHtml()}
          ${fsHtml()}
        </div>
      </nav>`;
  }

  function footerHtml() {
    return `
      <footer class="site-foot">
        <div class="wrap foot-grid">
          <div>
            <p class="brand">${t("siteName")}<em>${t("siteEn")}</em></p>
            <p>${t("footerAddress")}</p>
            <p>${t("visitHoursManager")} <a href="tel:+66821292305">082-129-2305</a> ${t("visitHoursManagerLang")}</p>
            <p>${t("visitHoursService")} <a href="tel:+66988079227">098-807-9227</a></p>
            <p>${t("footerDisclaimer")}</p>
          </div>
          <div>
            <h2>${t("quickLinks")}</h2>
            <ul>
              <li><a href="guide.html">${t("navGuide")}</a></li>
              <li><a href="visit.html">${t("navVisit")}</a></li>
              <li><a href="map.html">${t("navMap")}</a></li>
              <li><a href="about.html">${t("navHistory")}</a></li>
              <li><a href="sources.html">${t("navSources")}</a></li>
              <li><a href="oral-history.html">${t("navOral")}</a></li>
              <li><a href="archive.html">${t("navGallery")}</a></li>
              <li><a href="contribute.html">${t("navContribute")}</a></li>
            </ul>
          </div>
          <div>
            <h2>${t("navVisit")}</h2>
            <ul>
              <li><a href="visit.html#hours">${t("scHours")}</a></li>
              <li><a href="visit.html#status">${t("navStatus")}</a></li>
              <li><a href="visit.html#route">${t("navRoute")}</a></li>
              <li><a href="visit.html#rules">${t("navRules")}</a></li>
              <li><a href="visit.html#open">${t("navOpenSpots")}</a></li>
            </ul>
          </div>
          <div>
            <h2>${t("navAbout")}</h2>
            <ul>
              <li><a href="about.html">${t("navHistory")}</a></li>
              <li><a href="about.html#name">${t("navName")}</a></li>
              <li><a href="about.html#school">${t("navSchool")}</a></li>
              <li><a href="about.html#battle">${langSafe("battle")}</a></li>
              <li><a href="about.html#views">${langSafe("views")}</a></li>
              <li><a href="sources.html">${t("navSources")}</a></li>
            </ul>
          </div>
        </div>
        <p class="wrap site-statement foot-statement">${t("siteStatement")}</p>
        <div class="wrap foot-meta">
          <span>${t("footerBrand")}</span>
          <span>${t("footerUpdated")}</span>
        </div>
      </footer>`;
  }

  function langSafe(key) {
    if (key === "battle") return getLang() === "en" ? "1982 operations" : getLang() === "th" ? "ปฏิบัติการ 1982" : "1982年記事";
    if (key === "views") return getLang() === "en" ? "International and local views" : getLang() === "th" ? "มุมมองระหว่างประเทศและท้องถิ่น" : "國際記載與地方觀點";
    return key;
  }

  function applyFont(size) {
    document.documentElement.dataset.fs = size;
    localStorage.setItem("khunsa-fs", size);
    document.querySelectorAll(".fs button").forEach((btn) => {
      btn.classList.toggle("is-on", btn.dataset.fs === size);
    });
  }

  function setDrawer(open) {
    const nav = document.getElementById("main-nav");
    const menuBtn = document.querySelector(".menu-btn");
    if (!nav || !menuBtn) return;
    nav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("is-locked", open);
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
    const closeBtn = document.querySelector(".drawer-close");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", () => setDrawer(!nav.classList.contains("is-open")));
    }
    if (closeBtn) closeBtn.addEventListener("click", () => setDrawer(false));
    if (nav) {
      nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setDrawer(false)));
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setDrawer(false);
    });

    const header = document.querySelector(".site-nav");
    const onScroll = () => {
      if (!header) return;
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const nodes = document.querySelectorAll(".js-reveal");
    if (!nodes.length) return;
    const markIn = (el) => {
      el.classList.add("is-in");
    };
    const revealVisible = () => {
      nodes.forEach((el) => {
        if (el.classList.contains("is-in")) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 8 && rect.bottom > 8) markIn(el);
      });
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches
      || window.matchMedia("(max-width: 768px)").matches) {
      nodes.forEach(markIn);
      return;
    }
    revealVisible();
    requestAnimationFrame(revealVisible);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          markIn(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px 0px 0px" });
    nodes.forEach((el) => {
      if (!el.classList.contains("is-in")) io.observe(el);
    });
    window.addEventListener("resize", revealVisible, { passive: true });
  }

  window.KHUNSA.renderChrome = function renderChrome(opts) {
    const spots = getSpots();
    document.body.insertAdjacentHTML("afterbegin", headerHtml(spots));
    document.body.insertAdjacentHTML("beforeend", footerHtml());
    bindChrome();
    applyPage();
    injectPageMeta(opts || {});
  };

  function injectPageMeta(opts) {
    const title = document.title || t("siteName");
    const desc =
      opts.description ||
      (document.querySelector('meta[name="description"]') && document.querySelector('meta[name="description"]').content) ||
      t("siteTagline");
    const url = location.href.split("#")[0].split("?")[0];
    const image = new URL(opts.image || "images/photos/memorial-hall.jpg", location.href).href;

    ensureLink("canonical", url);
    ensureMeta("property", "og:title", title);
    ensureMeta("property", "og:description", desc);
    ensureMeta("property", "og:type", "website");
    ensureMeta("property", "og:url", url);
    ensureMeta("property", "og:image", image);
    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:title", title);
    ensureMeta("name", "twitter:description", desc);
    ensureMeta("name", "twitter:image", image);

    if (!document.getElementById("khunsa-jsonld")) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "khunsa-jsonld";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": ["Museum", "TouristAttraction"],
        name: t("siteName"),
        alternateName: "KHUN SA MEMORIAL",
        description: t("siteTagline"),
        url: url.replace(/[^/]+$/, "") || url,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ban Thoed Thai",
          addressRegion: "Chiang Rai",
          addressCountry: "TH"
        },
        telephone: ["+66-82-129-2305", "+66-98-807-9227"],
        inLanguage: ["zh-Hant", "th", "en"]
      });
      document.head.appendChild(script);
    }
  }

  function ensureMeta(attr, key, value) {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", value);
  }

  function ensureLink(rel, href) {
    let el = document.head.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement("link");
      el.rel = rel;
      document.head.appendChild(el);
    }
    el.href = href;
  }

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
