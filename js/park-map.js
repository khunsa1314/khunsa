(function () {
  const POS = {
    1: { x: 640, y: 560 },
    2: { x: 390, y: 530 },
    3: { x: 760, y: 390 },
    4: { x: 910, y: 410 },
    5: { x: 1040, y: 360 },
    6: { x: 500, y: 390 },
    7: { x: 800, y: 280 },
    8: { x: 950, y: 250 },
    9: { x: 700, y: 250 },
    10: { x: 860, y: 175 },
    11: { x: 1025, y: 195 },
    12: { x: 600, y: 700 }
  };

  function tree(x, y, s) {
    const h = 28 * s;
    return `<g transform="translate(${x} ${y})" fill="none">
      <path d="M0 ${h} L0 ${h + 10}" stroke="#5a4630" stroke-width="2.2" stroke-linecap="round"/>
      <ellipse cx="0" cy="${h - 10}" rx="${14 * s}" ry="${16 * s}" fill="#6b7f62" stroke="#4a5c48" stroke-width="1.2"/>
      <ellipse cx="${-6 * s}" cy="${h - 4}" rx="${10 * s}" ry="${11 * s}" fill="#7d9174" opacity=".85"/>
    </g>`;
  }

  function hill(d, fill) {
    return `<path d="${d}" fill="${fill}" stroke="#5d6e5c" stroke-width="1.4" stroke-linejoin="round"/>`;
  }

  function house(x, y, w, h, roof) {
    const rw = w / 2;
    return `<g transform="translate(${x} ${y})">
      <rect x="${-rw}" y="0" width="${w}" height="${h}" fill="#cbb89a" stroke="#6a5340" stroke-width="1.4"/>
      <path d="M${-rw - 4} 0 L0 ${-roof} L${rw + 4} 0" fill="#7a8b6e" stroke="#4d5c4c" stroke-width="1.4" stroke-linejoin="round"/>
      <rect x="${-6}" y="${h - 18}" width="12" height="18" fill="#eadfce" stroke="#6a5340" stroke-width="1"/>
    </g>`;
  }

  function renderMap(mount) {
    if (!mount || !window.KHUNSA) return;
    const spots = KHUNSA.getSpots();
    const t = window.KHUNSA_I18N.t;
    const route = [1, 2, 6, 7, 12].map((id) => `${POS[id].x},${POS[id].y}`).join(" ");

    const markers = spots.map((s) => {
      const p = POS[s.id];
      const n = String(s.id).padStart(2, "0");
      const fill = s.status === "open" ? "#31463a" : "#8a847a";
      const href = KHUNSA.spotUrl(s.id);
      const labelX = p.x > 880 ? p.x - 28 : p.x + 28;
      const anchor = p.x > 880 ? "end" : "start";
      return `<a class="park-marker" href="${href}" aria-label="${t("mapSee")}：${s.name}">
        <title>${n} ${s.name}</title>
        <g class="park-dot">
          <circle cx="${p.x}" cy="${p.y}" r="22" fill="#f7f3ea" stroke="${fill}" stroke-width="2.4"/>
          <text x="${p.x}" y="${p.y + 6}" text-anchor="middle" font-size="15" font-family="Noto Serif TC, serif" fill="${fill}" font-weight="600">${n}</text>
        </g>
        <text class="park-marker-label" x="${labelX}" y="${p.y + 5}" text-anchor="${anchor}" font-family="Noto Sans TC, sans-serif">${s.name}</text>
      </a>`;
    }).join("");

    mount.innerHTML = `
<svg class="park-map" viewBox="0 0 1200 800" role="img" aria-labelledby="park-map-title">
  <title id="park-map-title">${t("mapTitle")} — ${t("mapSchematic")}</title>
  <defs>
    <pattern id="paper" width="18" height="18" patternUnits="userSpaceOnUse">
      <path d="M0 18 L18 0" stroke="rgba(90,70,40,.06)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="800" fill="#e4edd9"/>
  <rect width="1200" height="800" fill="url(#paper)"/>
  ${hill("M-20 210 C180 90 340 130 520 170 C700 210 860 90 1220 150 L1220 320 L-20 320 Z", "#8fa086")}
  ${hill("M-20 280 C220 180 480 240 720 200 C940 164 1100 230 1220 210 L1220 420 L-20 420 Z", "#9aab90")}
  <path d="M-20 760 L1220 760 L1220 800 L-20 800 Z" fill="#c9b896"/>
  <ellipse cx="600" cy="520" rx="520" ry="210" fill="#b7c6a8" opacity=".55"/>
  <path d="M40 620 C200 580 360 640 520 600 C700 552 880 620 1160 580" fill="none" stroke="#c4b089" stroke-width="22" stroke-linecap="round" opacity=".45"/>
  ${tree(120, 300, 1.1)}${tree(210, 340, 0.9)}${tree(1080, 430, 1)}${tree(160, 500, 0.85)}${tree(1120, 520, 1.15)}
  ${house(760, 390, 70, 36, 18)}
  ${house(910, 410, 86, 34, 16)}
  ${house(1040, 360, 90, 34, 16)}
  ${house(800, 280, 64, 32, 16)}
  ${house(950, 250, 60, 30, 14)}
  ${house(700, 250, 58, 30, 14)}
  ${house(860, 175, 56, 28, 14)}
  ${house(1025, 195, 50, 26, 18)}
  <g transform="translate(600 700)">
    <rect x="-70" y="-18" width="140" height="28" fill="#8d6b4a" stroke="#5a4630" stroke-width="1.4"/>
    <path d="M-66 -18 h132" stroke="#eadfce" stroke-width="3"/>
  </g>
  <g transform="translate(640 560)">
    <ellipse cx="0" cy="18" rx="22" ry="8" fill="#6b7f62" opacity=".45"/>
    <path d="M-10 10 C-4 -18 10 -22 8 8" fill="#4a5c48" stroke="#31463a" stroke-width="1.2"/>
    <circle cx="4" cy="-18" r="7" fill="#cbb89a" stroke="#5a4630" stroke-width="1.2"/>
  </g>
  <g transform="translate(390 530)">
    <path d="M-28 16 Q0 -28 28 16 Z" fill="#6a5a48" stroke="#4a3d32" stroke-width="1.4"/>
    <ellipse cx="0" cy="8" rx="10" ry="8" fill="#2a241e"/>
  </g>
  <g transform="translate(500 390)">
    <ellipse cx="0" cy="8" rx="26" ry="12" fill="#8a7a62" stroke="#5a4630" stroke-width="1.2"/>
    <path d="M-10 -2 l20 16 M10 -2 l-20 16" stroke="#5a4630" stroke-width="1.1"/>
  </g>
  <polyline points="${route}" fill="none" stroke="#7c5728" stroke-width="2.2" stroke-dasharray="7 8" stroke-linecap="round" opacity=".55"/>
  <g transform="translate(1088 72)" aria-hidden="true">
    <circle cx="0" cy="0" r="28" fill="#f7f3ea" stroke="#6a5340" stroke-width="1.4"/>
    <path d="M0 -16 L6 4 L0 0 L-6 4 Z" fill="#31463a"/>
    <text x="0" y="38" text-anchor="middle" font-size="11" fill="#5a4630" font-family="Noto Sans TC, sans-serif">N</text>
  </g>
  <text x="48" y="56" fill="#31463a" font-size="15" font-family="Noto Serif TC, serif">${t("mapTitle")}</text>
  ${markers}
</svg>`;
  }

  window.KHUNSA_PARK_MAP = { render: renderMap };
})();
