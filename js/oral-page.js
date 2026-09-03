(function () {
  const { t, getLang } = window.KHUNSA_I18N;
  const { INTROS, RECORDS } = window.KHUNSA_ORAL;
  const lang = getLang();
  const root = document.getElementById("oral-root");
  if (!root) return;

  const cards = RECORDS.map((r) => `
    <article class="oral-card js-reveal" id="${r.id}">
      <h2>${r.displayName[lang]}</h2>
      <dl class="source-dl">
        <dt>${lang === "en" ? "Relation" : lang === "th" ? "ความสัมพันธ์" : "與事件的關係"}</dt><dd>${r.relation[lang]}</dd>
        <dt>${lang === "en" ? "Interview date" : lang === "th" ? "วันสัมภาษณ์" : "訪談日期"}</dt><dd>${r.interviewDate}</dd>
        <dt>${lang === "en" ? "Place" : lang === "th" ? "สถานที่" : "訪談地點"}</dt><dd>${r.interviewPlace}</dd>
        <dt>${lang === "en" ? "Interviewer" : lang === "th" ? "ผู้สัมภาษณ์" : "訪談者"}</dt><dd>${r.interviewer}</dd>
        <dt>${lang === "en" ? "Language" : lang === "th" ? "ภาษา" : "訪談語言"}</dt><dd>${r.language}</dd>
        <dt>${lang === "en" ? "Consent to publish" : lang === "th" ? "ยินยอมเผยแพร่" : "是否同意公開"}</dt><dd>${r.consentPublic}</dd>
        <dt>${lang === "en" ? "Confirmed by narrator" : lang === "th" ? "ผู้เล่ายืนยัน" : "是否經本人確認"}</dt><dd>${r.confirmedByNarrator}</dd>
      </dl>
      <h3>${lang === "en" ? "Summary" : lang === "th" ? "สรุป" : "摘要"}</h3>
      <p>${r.summary[lang]}</p>
      <h3>${lang === "en" ? "Pending" : lang === "th" ? "รอดำเนินการ" : "尚待查證事項"}</h3>
      <p>${r.pendingNotes[lang]}</p>
      <p class="note">${lang === "en" ? "Cross-check" : lang === "th" ? "เทียบเคียง" : "可對照"}:
        ${r.crossRefs.map((href) => `<a href="${href}">${href}</a>`).join(" · ")}
      </p>
    </article>
  `).join("");

  root.innerHTML = `
    <p class="measure oral-intro">${INTROS[lang]}</p>
    ${cards}
    <p class="note"><a href="contribute.html">${t("navContribute")}</a></p>
  `;
  if (window.KHUNSA.observeReveals) window.KHUNSA.observeReveals(root);
})();
