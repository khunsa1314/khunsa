(function () {
  const { renderChrome, queryId, outdoorIds, getSpots } = window.KHUNSA;
  const { t } = window.KHUNSA_I18N;
  renderChrome();

  const spots = getSpots();
  const id = queryId() || 1;
  const spot = spots.find((s) => s.id === id) || spots[0];
  document.title = `${spot.name}｜${t("siteName")}`;

  const area = outdoorIds.includes(spot.id) ? t("crumbOutdoor") : t("crumbIndoor");

  document.getElementById("crumb").innerHTML =
    `<a href="index.html">${t("crumbHome")}</a> ＞ <a href="about.html">${t("navAbout")}</a> ＞ <a href="index.html#explore">${area}</a> ＞ ${spot.name}`;

  const sideOpen = spots.filter((s) => s.status === "open");
  const sideClosed = spots.filter((s) => s.status === "closed");
  function links(list) {
    return list.map((s) =>
      `<a class="${s.id === spot.id ? "is-on" : ""}" href="spot.html?id=${s.id}">${String(s.id).padStart(2, "0")} ${s.name}</a>`
    ).join("");
  }
  document.getElementById("sidebar").innerHTML = `
    <h2>${t("open")}</h2>
    ${links(sideOpen)}
    <h2>${t("closed")}</h2>
    ${links(sideClosed)}
  `;

  const body = spot.body.map((p) => `<p>${p}</p>`).join("");
  const photos = {
    1: { src: "images/photos/18.jpg", cls: "portrait" },
    7: { src: "images/photos/08.jpg", cls: "portrait" },
    12: { src: "images/photos/15.jpg", cls: "painting" }
  };
  const lead = photos[spot.id]
    ? `<figure class="spot-photo ${photos[spot.id].cls}"><img src="${photos[spot.id].src}" alt="${spot.name}"></figure>`
    : "";
  document.getElementById("article").innerHTML = `
    <h1>${spot.name}</h1>
    <p class="meta">${spot.subtitle}　｜　${spot.location}　｜　${spot.statusLabel}</p>
    ${lead}
    ${body}
    ${spot.mural ? muralHtml() : ""}
    <p class="note">${t("statusNote")}</p>
  `;

  function muralHtml() {
    return `
      <div class="mural">
        <section class="mural-card">
          <div class="costume">${costume()}</div>
          <h3>${t("muralCostume")}</h3>
          <p>${t("muralCostumeP1")}</p>
          <ul>
            <li>${t("muralCostumeLi1")}</li>
            <li>${t("muralCostumeLi2")}</li>
          </ul>
          <p>${t("muralCostumeP2")}</p>
        </section>
        <section class="mural-card">
          <div class="flag">${army()}</div>
          <h3>${t("muralArmy")}</h3>
          <p>${t("muralArmyP1")}</p>
          <p>${t("muralArmyP2")}</p>
        </section>
        <section class="mural-card">
          <div class="flag">${shan()}</div>
          <h3>${t("muralFlag")}</h3>
          <p>${t("muralFlagP")}</p>
          <ul>
            <li>${t("muralFlagLi1")}</li>
            <li>${t("muralFlagLi2")}</li>
            <li>${t("muralFlagLi3")}</li>
            <li>${t("muralFlagLi4")}</li>
          </ul>
        </section>
      </div>
      <p>${t("muralClose")}</p>
    `;
  }

  function shan() {
    return `<svg viewBox="0 0 90 60" role="img" aria-label="${t("muralFlag")}">
      <rect width="90" height="20" fill="#d4a017"/>
      <rect y="20" width="90" height="20" fill="#2f6b45"/>
      <rect y="40" width="90" height="20" fill="#a33b32"/>
      <circle cx="45" cy="30" r="11" fill="#f3efe4"/></svg>`;
  }
  function army() {
    return `<svg viewBox="0 0 90 60" role="img" aria-label="${t("muralArmy")}">
      <rect width="90" height="60" fill="#6b1d18"/>
      <rect width="90" height="8" fill="#d4a017"/>
      <rect y="52" width="90" height="8" fill="#d4a017"/>
      <circle cx="45" cy="30" r="10" fill="none" stroke="#e7d7b8" stroke-width="2"/>
      <path d="M45 16v28M31 30h28" stroke="#e7d7b8" stroke-width="1.4"/></svg>`;
  }
  function costume() {
    return `<svg viewBox="0 0 90 60" aria-hidden="true">
      <circle cx="28" cy="16" r="6" fill="none" stroke="#c4a056" stroke-width="1.4"/>
      <path d="M18 52 V30 q10-8 20 0 v22" fill="none" stroke="#c4a056" stroke-width="1.4"/>
      <circle cx="62" cy="16" r="6" fill="none" stroke="#c4a056" stroke-width="1.4"/>
      <path d="M50 52 V32 q12-10 24 0 v20" fill="none" stroke="#c4a056" stroke-width="1.4"/>
      <path d="M50 36 h24" stroke="#8c8170" stroke-width="1"/></svg>`;
  }
})();
