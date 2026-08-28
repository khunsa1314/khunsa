(function () {
  const { renderChrome, icon, getSpots } = window.KHUNSA;
  const { t } = window.KHUNSA_I18N;
  renderChrome();

  const spots = getSpots();
  const news = t("newsItems") || [];

  const list = document.getElementById("news-list");
  if (list) {
    list.innerHTML = news.map((n) =>
      `<a href="spot.html?id=${n.id}"><small>${n.date}</small><br>${n.title}</a>`
    ).join("");
  }

  const photos = document.getElementById("photo-grid");
  if (photos) {
    const alt = t("photosAlt");
    photos.querySelectorAll("img").forEach((img) => {
      if (!img.alt) img.alt = alt;
    });
  }

  const grid = document.getElementById("explore-grid");
  const tone = { 1: "open", 2: "s2", 6: "s6", 7: "s7", 12: "s12" };
  const zonePhoto = { 1: "images/photos/18.jpg", 7: "images/photos/08.jpg", 12: "images/photos/15.jpg" };
  if (grid) {
    grid.innerHTML = spots.map((s) => {
      const src = zonePhoto[s.id];
      const bg = src ? `style="background-image:url('${src}')"` : "";
      return `
      <a class="zone ${tone[s.id] || s.status}${src ? " has-photo" : ""}" href="spot.html?id=${s.id}" ${bg}>
        <div class="visual">
          <div>
            <div class="num">${String(s.id).padStart(2, "0")}</div>
            ${src ? "" : icon(s.icon)}
          </div>
        </div>
        <div class="name">${s.name}<br><span class="badge">${s.statusLabel}</span></div>
      </a>`;
    }).join("");
  }
})();
