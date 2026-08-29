(function () {
  const { renderChrome, icon, getSpots } = window.KHUNSA;
  const { t } = window.KHUNSA_I18N;
  renderChrome();

  const spots = getSpots();
  const news = t("newsItems") || [];
  const spotPhoto = {
    1: "images/photos/18.jpg",
    7: "images/photos/08.jpg",
    12: "images/photos/15.jpg"
  };

  const slides = [
    "images/hero.jpg",
    "images/photos/18.jpg",
    "images/photos/16.jpg",
    "images/photos/15.jpg",
    "images/photos/01.jpg",
    "images/photos/17.jpg",
    "images/photos/14.jpg",
    "images/photos/11.jpg",
    "images/photos/04.jpg",
    "images/photos/08.jpg",
    "images/photos/13.jpg",
    "images/photos/10.jpg"
  ];

  const track = document.getElementById("stage-track");
  const pauseBtn = document.getElementById("stage-pause");
  let index = 0;
  let playing = true;
  let timer = 0;

  if (track) {
    const alt = t("heroAlt");
    track.innerHTML = slides.map((src, i) =>
      `<figure class="stage-slide${i === 0 ? " is-on" : ""}"><img src="${src}" alt="${alt}"></figure>`
    ).join("");

    function show(n) {
      index = (n + slides.length) % slides.length;
      track.querySelectorAll(".stage-slide").forEach((el, i) => {
        el.classList.toggle("is-on", i === index);
      });
    }
    function tick() {
      if (playing) show(index + 1);
    }
    function start() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        playing = false;
        pauseBtn.textContent = "▶";
        pauseBtn.setAttribute("aria-pressed", "true");
        pauseBtn.setAttribute("aria-label", t("playLabel"));
        return;
      }
      clearInterval(timer);
      timer = setInterval(tick, 5000);
    }
    document.getElementById("stage-prev").addEventListener("click", () => {
      show(index - 1);
      if (playing) start();
    });
    document.getElementById("stage-next").addEventListener("click", () => {
      show(index + 1);
      if (playing) start();
    });
    pauseBtn.setAttribute("aria-label", t("pauseLabel"));
    document.getElementById("stage-prev").setAttribute("aria-label", t("prevLabel"));
    document.getElementById("stage-next").setAttribute("aria-label", t("nextLabel"));
    pauseBtn.addEventListener("click", () => {
      playing = !playing;
      pauseBtn.setAttribute("aria-pressed", String(!playing));
      pauseBtn.textContent = playing ? "❚❚" : "▶";
      pauseBtn.setAttribute("aria-label", playing ? t("pauseLabel") : t("playLabel"));
      if (playing) start();
      else clearInterval(timer);
    });
    start();
  }

  const orbit = document.getElementById("orbit-map");
  if (orbit) {
    const items = spots.map((s, i) => {
      const a = (i / spots.length) * Math.PI * 2 - Math.PI / 2;
      const x = 50 + 44 * Math.cos(a);
      const y = 50 + 42 * Math.sin(a);
      return `<a class="orbit-node ${s.status}" href="spot.html?id=${s.id}" style="left:${x}%;top:${y}%">
        <span class="orbit-ico">${icon(s.icon)}</span>
        <span>${String(s.id).padStart(2, "0")} ${s.name}</span>
      </a>`;
    }).join("");
    orbit.innerHTML = `
      <a class="orbit-core" href="spot.html?id=1">
        <img src="images/photos/16.jpg" alt="${t("hall2Title")}">
      </a>
      ${items}`;
  }

  const scenes = document.getElementById("scene-grid");
  if (scenes) {
    const cards = [
      { id: 1, img: "images/photos/18.jpg" },
      { id: 2, img: "" },
      { id: 7, img: "images/photos/08.jpg" },
      { id: 12, img: "images/photos/15.jpg" }
    ];
    scenes.innerHTML = cards.map((c) => {
      const s = spots.find((x) => x.id === c.id) || { name: "" };
      const bg = c.img ? `style="background-image:url('${c.img}')"` : "";
      return `<a class="scene ${c.img ? "" : "plain"}" href="spot.html?id=${c.id}" ${bg}><span>${s.name}</span></a>`;
    }).join("");
  }

  const catalog = document.getElementById("catalog-grid");
  if (catalog) {
    catalog.innerHTML = spots.map((s) => {
      const src = spotPhoto[s.id];
      const href = new URL(`spot.html?id=${s.id}`, location.href).href;
      const qr = "https://api.qrserver.com/v1/create-qr-code/?size=72x72&margin=2&data=" + encodeURIComponent(href);
      const pic = src
        ? `<img src="${src}" alt="">`
        : `<div class="cat-ico">${icon(s.icon)}</div>`;
      return `<a class="cat-card" href="spot.html?id=${s.id}">
        <div class="cat-pic">${pic}</div>
        <div class="cat-copy">
          <h3>${String(s.id).padStart(2, "0")} ${s.name}</h3>
          <p class="cat-sub">${s.subtitle} · ${s.statusLabel}</p>
          <p>${s.summary}</p>
        </div>
        <img class="cat-qr" src="${qr}" alt="${t("qrHint")} ${s.name}" width="72" height="72">
      </a>`;
    }).join("");
  }

  const list = document.getElementById("news-list");
  if (list) {
    list.innerHTML = news.map((n) =>
      `<a href="spot.html?id=${n.id}"><small>${n.date}</small><br>${n.title}</a>`
    ).join("");
  }
})();
