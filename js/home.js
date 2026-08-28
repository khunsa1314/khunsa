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

  const grid = document.getElementById("explore-grid");
  const tone = { 1: "open", 2: "s2", 6: "s6", 7: "s7", 12: "s12" };
  if (grid) {
    grid.innerHTML = spots.map((s) => `
      <a class="zone ${tone[s.id] || s.status}" href="spot.html?id=${s.id}">
        <div class="visual">
          <div>
            <div class="num">${String(s.id).padStart(2, "0")}</div>
            ${icon(s.icon)}
          </div>
        </div>
        <div class="name">${s.name}<br><span class="badge">${s.statusLabel}</span></div>
      </a>
    `).join("");
  }

  const slides = [...document.querySelectorAll(".slide")];
  const dots = document.getElementById("hero-dots");
  let i = 0;
  if (dots && slides.length) {
    dots.innerHTML = slides.map((_, n) => `<button type="button" aria-label="${n + 1}"></button>`).join("");
    const buttons = [...dots.querySelectorAll("button")];
    function show(n) {
      i = n;
      slides.forEach((el, idx) => el.classList.toggle("is-on", idx === n));
      buttons.forEach((el, idx) => el.classList.toggle("is-on", idx === n));
    }
    buttons.forEach((btn, idx) => btn.addEventListener("click", () => show(idx)));
    show(0);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInterval(() => show((i + 1) % slides.length), 7000);
    }
  }
})();
