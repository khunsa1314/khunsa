(function () {
  const { renderChrome, getSpots } = window.KHUNSA;
  const { t, getLang } = window.KHUNSA_I18N;
  renderChrome();

  const spots = getSpots();
  const news = t("newsItems") || [];
  const lang = getLang();
  const spotPhoto = {
    1: "images/photos/18.jpg",
    2: "images/photos/spot-02-cave-a.jpg",
    3: "images/photos/spot-03.jpg",
    4: "images/photos/spot-04.jpg",
    5: "images/photos/spot-05.jpg",
    6: "images/photos/spot-06.jpg",
    7: "images/photos/spot-07-board.jpg",
    8: "images/photos/spot-08.jpg",
    9: "images/photos/spot-09.jpg",
    10: "images/photos/spot-10-door.jpg",
    11: "images/photos/spot-11.jpg",
    12: "images/photos/spot-12.jpg"
  };

  const slides = [
    "images/hero.jpg",
    "images/photos/memorial-hall.jpg",
    "images/photos/spot-09.jpg",
    "images/photos/18.jpg",
    "images/photos/spot-02-cave-a.jpg",
    "images/photos/spot-06.jpg",
    "images/photos/spot-10-door.jpg",
    "images/photos/spot-07-board.jpg",
    "images/photos/spot-03.jpg",
    "images/photos/spot-05.jpg",
    "images/photos/spot-11.jpg",
    "images/photos/15.jpg"
  ];

  const track = document.getElementById("stage-track");
  const pauseBtn = document.getElementById("stage-pause");
  const ind = document.getElementById("stage-ind");
  let index = 0;
  let playing = true;
  let timer = 0;

  const icoPause = '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="4" y="3" width="2.2" height="10" fill="currentColor"/><rect x="9.8" y="3" width="2.2" height="10" fill="currentColor"/></svg>';
  const icoPlay = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9l8-4.5z" fill="currentColor"/></svg>';

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  if (track) {
    const alt = t("heroAlt");
    track.innerHTML = slides.map((src, i) =>
      `<figure class="hero-slide${i === 0 ? " is-on" : ""}"><img src="${src}" alt="${i === 0 ? alt : ""}"${i === 0 ? "" : ' loading="lazy"'}></figure>`
    ).join("");

    function show(n) {
      index = (n + slides.length) % slides.length;
      track.querySelectorAll(".hero-slide").forEach((el, i) => {
        el.classList.toggle("is-on", i === index);
      });
      if (ind) ind.textContent = pad(index + 1) + " / " + pad(slides.length);
    }
    function tick() {
      if (playing) show(index + 1);
    }
    function start() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        playing = false;
        pauseBtn.innerHTML = icoPlay;
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
    pauseBtn.innerHTML = icoPause;
    pauseBtn.setAttribute("aria-label", t("pauseLabel"));
    document.getElementById("stage-prev").setAttribute("aria-label", t("prevLabel"));
    document.getElementById("stage-next").setAttribute("aria-label", t("nextLabel"));
    pauseBtn.addEventListener("click", () => {
      playing = !playing;
      pauseBtn.setAttribute("aria-pressed", String(!playing));
      pauseBtn.innerHTML = playing ? icoPause : icoPlay;
      pauseBtn.setAttribute("aria-label", playing ? t("pauseLabel") : t("playLabel"));
      if (playing) start();
      else clearInterval(timer);
    });
    show(0);
    start();
  }

  const virt = document.getElementById("virt-lines");
  if (virt) {
    virt.innerHTML = spots.map((s) =>
      `<li><a href="spot.html?id=${s.id}"><span>${pad(s.id)}</span>${s.name}</a></li>`
    ).join("");
  }

  const scenes = document.getElementById("scene-grid");
  if (scenes) {
    scenes.innerHTML = spots.map((s) => {
      const src = spotPhoto[s.id];
      const pic = src
        ? `<img src="${src}" alt="${s.name}" loading="lazy">`
        : `<span class="ph">${pad(s.id)}</span>`;
      return `<a class="spot-tile" href="spot.html?id=${s.id}">
        <div class="pic">${pic}</div>
        <div class="ribbon"><b>${s.name}</b></div>
        <div class="body">
          <p class="sub">${pad(s.id)}　${s.subtitle}</p>
          <p class="blurb">${s.summary}</p>
          <span class="go" aria-hidden="true">›</span>
        </div>
      </a>`;
    }).join("");
  }

  const homeTl = document.getElementById("home-timeline");
  if (homeTl && window.KHUNSA_TIMELINE) {
    const pick = ["birth", "1975", "1976", "1982", "1996", "2007"];
    const tags = window.KHUNSA_TIMELINE.TAGS[lang] || window.KHUNSA_TIMELINE.TAGS.zh;
    homeTl.innerHTML = pick.map((id) => {
      const item = window.KHUNSA_TIMELINE.ITEMS.find((x) => x.id === id);
      if (!item) return "";
      const tag = tags[item.tag];
      return `<div class="tl-item">
        <b>${item.year[lang]}</b>
        <p>${item.text[lang]}</p>
        <small class="cred-inline">${tag.label}</small>
      </div>`;
    }).join("");
  }

  const route = document.getElementById("home-route");
  if (route) {
    const ids = [1, 2, 6, 7, 12];
    const steps = ids.map((id) => spots.find((s) => s.id === id)).filter(Boolean);
    route.innerHTML = steps.map((s, i) => {
      const line = i < steps.length - 1 ? '<span class="route-line" aria-hidden="true"></span>' : "";
      return `<a class="route-step" href="spot.html?id=${s.id}"><b>${pad(i + 1)}</b>${s.name}</a>${line}`;
    }).join("");
  }

  const list = document.getElementById("news-list");
  if (list) {
    list.innerHTML = news.map((n) =>
      `<a href="spot.html?id=${n.id}"><span><small>${n.date}</small><br>${n.title}</span><span aria-hidden="true">→</span></a>`
    ).join("");
  }
})();
