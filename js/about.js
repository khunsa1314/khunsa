(function () {
  const { t, getLang, formatDisplayDate } = window.KHUNSA_I18N;
  const { CHAPTERS, METHOD } = window.KHUNSA_HISTORY;
  const { TAGS, ITEMS } = window.KHUNSA_TIMELINE;
  const { SOURCES } = window.KHUNSA_SOURCES;
  const lang = getLang();

  function tagHtml(tag) {
    const meta = TAGS[lang][tag] || TAGS.zh[tag];
    return `<button type="button" class="cred-tag cred-tag--${tag}" data-tip="${meta.tip}">${meta.label}</button>`;
  }

  function refsHtml(refs) {
    if (!refs || !refs.length) return "";
    return refs.map((id) => {
      const s = SOURCES.find((x) => x.id === id);
      const title = s ? s.title : id;
      return `<a class="fn-ref" href="sources.html#src-${id}" title="${title}">[${id}]</a>`;
    }).join(" ");
  }

  function methodBlock() {
    const paras = METHOD.paragraphs[lang].map((p) => `<p>${p}</p>`).join("");
    return `<section class="method-box js-reveal" id="method">
      <h2>${METHOD.title[lang]}</h2>
      ${paras}
    </section>`;
  }

  function chaptersHtml() {
    return CHAPTERS.map((c) => {
      const body = c.paragraphs[lang].map((p) => `<p>${p}</p>`).join("");
      return `<section class="history-chapter js-reveal" id="${c.id}">
        <header class="chapter-head">
          <h2>${c.title[lang]}</h2>
          <div class="chapter-meta">${tagHtml(c.tag)} ${refsHtml(c.refs)}</div>
        </header>
        ${body}
      </section>`;
    }).join("");
  }

  function timelineHtml() {
    const rows = ITEMS.map((item) => {
      return `<article class="tl-card" id="tl-${item.id}">
        <div class="tl-card-year">${item.year[lang]}</div>
        <div class="tl-card-body">
          <p>${item.text[lang]}</p>
          <p class="tl-meta"><span>${item.place[lang]}</span> · ${tagHtml(item.tag)} ${refsHtml(item.refs)}</p>
        </div>
      </article>`;
    }).join("");
    return `<section class="history-timeline js-reveal" id="timeline-full">
      <h2>${lang === "en" ? "Timeline" : lang === "th" ? "เส้นเวลา" : "完整時間軸"}</h2>
      <div class="tl-cards">${rows}</div>
    </section>`;
  }

  const verified = formatDisplayDate(window.KHUNSA_DATES.historyVerifiedISO, lang);
  const updated = formatDisplayDate(window.KHUNSA_DATES.contentUpdatedISO, lang);

  const root = document.getElementById("history-root");
  if (root) {
    root.innerHTML = `
      <p class="note date-line">${t("historyVerifiedLabel")}：${verified}　｜　${t("contentUpdatedLabel")}：${updated}</p>
      ${methodBlock()}
      <nav class="toc" aria-label="toc">
        <strong>${lang === "en" ? "Contents" : lang === "th" ? "สารบัญ" : "章節目錄"}</strong>
        <ol>${CHAPTERS.map((c) => `<li><a href="#${c.id}">${c.title[lang]}</a></li>`).join("")}
        <li><a href="#timeline-full">${lang === "en" ? "Timeline" : lang === "th" ? "เส้นเวลา" : "完整時間軸"}</a></li></ol>
      </nav>
      ${chaptersHtml()}
      ${timelineHtml()}
      <p class="site-statement">${t("siteStatement")}</p>
      <p class="note"><a href="sources.html">${t("navSources")}</a> · <a href="oral-history.html">${t("navOral")}</a> · <a href="contribute.html">${t("navContribute")}</a></p>
    `;
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".cred-tag");
    if (!btn) return;
    const tip = btn.getAttribute("data-tip");
    if (!tip) return;
    alert(tip);
  });
})();
