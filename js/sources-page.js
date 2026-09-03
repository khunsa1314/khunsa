(function () {
  const { t, getLang, formatDisplayDate } = window.KHUNSA_I18N;
  const { SOURCES, CAT_LABELS } = window.KHUNSA_SOURCES;
  const lang = getLang();
  const labels = CAT_LABELS[lang] || CAT_LABELS.zh;
  const order = ["A", "B", "C", "D", "E", "F", "G"];

  function row(s) {
    const url = s.url
      ? `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.url}</a>`
      : "—";
    return `<article class="source-card" id="src-${s.id}">
      <h3>[${s.id}] ${s.title}</h3>
      <dl class="source-dl">
        <dt>${lang === "en" ? "Author / body" : lang === "th" ? "ผู้เขียน／หน่วยงาน" : "作者或發布機關"}</dt><dd>${s.authors}</dd>
        <dt>${lang === "en" ? "Year" : lang === "th" ? "ปี" : "年份"}</dt><dd>${s.year}</dd>
        <dt>${lang === "en" ? "Type" : lang === "th" ? "ประเภท" : "資料類型"}</dt><dd>${s.type}</dd>
        <dt>${lang === "en" ? "Language" : lang === "th" ? "ภาษา" : "原文語言"}</dt><dd>${s.lang}</dd>
        <dt>${lang === "en" ? "URL" : "網址"}</dt><dd>${url}</dd>
        <dt>${lang === "en" ? "Accessed" : lang === "th" ? "วันเข้าดู" : "查閱日期"}</dt><dd>${s.accessed || "—"}</dd>
        <dt>${lang === "en" ? "Supports" : lang === "th" ? "รองรับเนื้อหา" : "主要支持的內容"}</dt><dd>${s.supports}</dd>
        <dt>${lang === "en" ? "Primary?" : lang === "th" ? "一手?" : "是否第一手"}</dt><dd>${s.primary ? (lang === "en" ? "Closer to primary / on-site confirmation" : "較接近第一手／現場確認") : (lang === "en" ? "Secondary / published" : "二手／已出版資料")}</dd>
        <dt>${lang === "en" ? "Notes" : lang === "th" ? "หมายเหตุ" : "注意事項"}</dt><dd>${s.note}</dd>
      </dl>
    </article>`;
  }

  const root = document.getElementById("sources-root");
  if (!root) return;
  const updated = formatDisplayDate(window.KHUNSA_DATES.contentUpdatedISO, lang);
  let html = `<p class="note">${t("contentUpdatedLabel")}：${updated}</p><p class="measure">${t("sourcesLead")}</p>`;
  order.forEach((cat) => {
    const items = SOURCES.filter((s) => s.cat === cat);
    if (!items.length) return;
    html += `<section class="js-reveal" id="cat-${cat}"><h2>${labels[cat]}</h2>${items.map(row).join("")}</section>`;
  });
  html += `<p class="site-statement">${t("siteStatement")}</p>`;
  root.innerHTML = html;
})();
