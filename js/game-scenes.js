/**
 * Illustrated 2D scenes + traveler SVG for Memory Road adventure.
 */
(function () {
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function travelerSvg() {
    return `
      <div class="mg-actor" id="mg-actor" aria-hidden="true">
        <div class="mg-actor-shadow"></div>
        <svg class="mg-actor-svg" viewBox="0 0 64 96" width="64" height="96">
          <g transform="translate(22,58)"><g class="mg-limb mg-leg mg-leg-l">
            <rect x="-4" y="0" width="8" height="22" rx="3" fill="#3a4238"/>
            <rect x="-5" y="18" width="10" height="6" rx="2" fill="#2a2f28"/>
          </g></g>
          <g transform="translate(42,58)"><g class="mg-limb mg-leg mg-leg-r">
            <rect x="-4" y="0" width="8" height="22" rx="3" fill="#323830"/>
            <rect x="-5" y="18" width="10" height="6" rx="2" fill="#242922"/>
          </g></g>
          <g transform="translate(32,40)"><g class="mg-torso">
            <rect x="-12" y="-8" width="24" height="28" rx="8" fill="#5c6b58"/>
            <rect x="-10" y="-2" width="20" height="6" rx="2" fill="#a77a44" opacity="0.85"/>
            <path class="mg-cloth" d="M-12 16 Q0 22 12 16" fill="none" stroke="#4a5748" stroke-width="2"/>
          </g></g>
          <g transform="translate(16,42)"><g class="mg-limb mg-arm mg-arm-l">
            <rect x="-3" y="0" width="6" height="20" rx="3" fill="#c9b59a"/>
            <rect x="-4" y="16" width="8" height="6" rx="2" fill="#b79f82"/>
          </g></g>
          <g transform="translate(48,42)"><g class="mg-limb mg-arm mg-arm-r">
            <rect x="-3" y="0" width="6" height="20" rx="3" fill="#c9b59a"/>
            <rect x="-4" y="16" width="8" height="6" rx="2" fill="#b79f82"/>
          </g></g>
          <g transform="translate(32,22)"><g class="mg-head">
            <circle cx="0" cy="0" r="12" fill="#e2c8a8"/>
            <ellipse class="mg-hair" cx="0" cy="-6" rx="12" ry="8" fill="#3a322c"/>
            <g class="mg-face">
              <ellipse class="mg-eye mg-eye-l" cx="-4" cy="1" rx="1.6" ry="2" fill="#24302a"/>
              <ellipse class="mg-eye mg-eye-r" cx="4" cy="1" rx="1.6" ry="2" fill="#24302a"/>
              <path d="M-3 6 Q0 8 3 6" fill="none" stroke="#8a6a4a" stroke-width="1.2"/>
            </g>
          </g></g>
          <g class="mg-prop mg-prop-note" opacity="0">
            <rect x="40" y="48" width="14" height="12" rx="2" fill="#f7f3ea" stroke="#a77a44"/>
            <path d="M43 52 h8 M43 55 h6" stroke="#7c5728" stroke-width="1"/>
          </g>
        </svg>
      </div>`;
  }

  function layerFar(p, w) {
    return `
      <div class="mg-layer mg-layer-far" data-parallax="0.25">
        <svg viewBox="0 0 ${w} 520" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="sky-${p.sky.replace("#", "")}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${p.sky}"/>
              <stop offset="100%" stop-color="#e7efe4"/>
            </linearGradient>
          </defs>
          <rect width="${w}" height="520" fill="url(#sky-${p.sky.replace("#", "")})"/>
          <g class="mg-clouds" fill="#ffffff" opacity="0.35">
            <ellipse cx="280" cy="90" rx="90" ry="28"/>
            <ellipse cx="900" cy="70" rx="110" ry="32"/>
            <ellipse cx="1600" cy="100" rx="100" ry="30"/>
          </g>
          <path d="M0 260 Q200 200 400 250 T800 230 T1200 255 T1600 220 T${w} 250 L${w} 520 L0 520 Z" fill="${p.far}" opacity="0.85"/>
        </svg>
      </div>`;
  }

  function layerMid(p, w, sceneId) {
    let props = "";
    if (sceneId === "statue") {
      props = `<g transform="translate(1040,210)">
        <ellipse cx="40" cy="160" rx="70" ry="18" fill="#000" opacity="0.12"/>
        <rect x="10" y="120" width="60" height="40" fill="#6b5a3e"/>
        <path d="M20 120 L40 40 L60 120 Z" fill="#8a7348"/>
        <circle cx="40" cy="36" r="16" fill="#7a623c"/>
        <text x="40" y="185" text-anchor="middle" font-size="14" fill="#5c4a32">statue</text>
      </g>`;
    } else if (sceneId === "cave") {
      props = `<g transform="translate(900,200)">
        <path d="M20 180 Q40 40 160 50 Q260 60 280 180 Z" fill="#3d453f"/>
        <path d="M60 180 Q100 90 180 95 Q240 100 250 180" fill="#2a312c"/>
      </g>`;
    } else if (sceneId === "bomb") {
      props = `<g transform="translate(980,250)">
        <rect x="0" y="80" width="120" height="50" rx="6" fill="#6a6558"/>
        <ellipse cx="60" cy="70" rx="50" ry="22" fill="#5a5548"/>
        <path d="M20 70 L40 40 L55 70" fill="#7a6a4a"/>
      </g>`;
    } else if (sceneId === "hall") {
      props = `<g transform="translate(700,160)">
        <rect x="0" y="0" width="520" height="260" fill="#d8c9a8" stroke="#a89068"/>
        <rect x="40" y="40" width="120" height="160" fill="#f4efe4" stroke="#a77a44"/>
        <rect x="200" y="40" width="120" height="160" fill="#f4efe4" stroke="#a77a44"/>
        <rect x="360" y="40" width="120" height="160" fill="#f4efe4" stroke="#a77a44"/>
        <rect x="220" y="220" width="80" height="40" fill="#8a7348"/>
      </g>`;
    } else if (sceneId === "mural") {
      props = `<g transform="translate(760,150)">
        <rect x="0" y="0" width="700" height="240" fill="#8d7a5c"/>
        <rect x="20" y="20" width="200" height="180" fill="#cbb892"/>
        <rect x="250" y="20" width="200" height="180" fill="#b9a888"/>
        <rect x="480" y="20" width="200" height="180" fill="#cbb892"/>
        <text x="350" y="120" text-anchor="middle" font-size="22" fill="#31463a">KHUN SA OLD CAMP</text>
      </g>`;
    } else {
      props = `<g transform="translate(1000,180)">
        <rect x="0" y="40" width="160" height="180" fill="#8fa392" stroke="#5c6b58"/>
        <path d="M-10 40 L80 -20 L170 40 Z" fill="#6d8570"/>
        <rect x="60" y="140" width="40" height="80" fill="#5c4a32"/>
      </g>`;
    }
    return `
      <div class="mg-layer mg-layer-mid" data-parallax="0.55">
        <svg viewBox="0 0 ${w} 520" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
          <path d="M0 300 Q300 270 600 295 T1200 280 T1800 300 T${w} 290 L${w} 520 L0 520 Z" fill="${p.mid}" opacity="0.9"/>
          ${props}
          <g class="mg-trees" fill="${p.far}">
            <ellipse cx="180" cy="280" rx="40" ry="60"/><rect x="172" y="320" width="16" height="50" fill="#5c4a32"/>
            <ellipse cx="${w - 200}" cy="270" rx="50" ry="70"/><rect x="${w - 208}" y="320" width="16" height="55" fill="#5c4a32"/>
          </g>
        </svg>
      </div>`;
  }

  function layerNear(p, w, indoor) {
    const dust = indoor
      ? `<g class="mg-dust" fill="#fff8e8" opacity="0.35">
          <circle cx="400" cy="200" r="2"/><circle cx="900" cy="160" r="1.5"/><circle cx="1300" cy="220" r="2"/>
        </g>
        <rect class="mg-beam" x="600" y="0" width="80" height="400" fill="#fff6d8" opacity="0.12"/>`
      : "";
    return `
      <div class="mg-layer mg-layer-near" data-parallax="0.85">
        <svg viewBox="0 0 ${w} 520" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
          ${dust}
          <g class="mg-grass" fill="${p.accent}" opacity="0.35">
            <path d="M60 400 q10 -30 20 0 q10 -25 20 0"/>
            <path d="M420 405 q8 -28 16 0 q8 -22 16 0"/>
            <path d="M1500 400 q10 -32 20 0"/>
          </g>
          <path d="M0 380 L${w} 380 L${w} 520 L0 520 Z" fill="${p.ground}"/>
          <path class="mg-path-line" d="M80 420 Q400 400 800 415 T1600 410 T${w - 80} 420" fill="none" stroke="#a89068" stroke-width="18" opacity="0.35" stroke-linecap="round"/>
        </svg>
        <div class="mg-fg-leaf mg-fg-leaf-l" aria-hidden="true"></div>
        <div class="mg-fg-leaf mg-fg-leaf-r" aria-hidden="true"></div>
      </div>`;
  }

  function hotspotsHtml(scene, tx) {
    return (scene.hotspots || [])
      .map((h) => {
        const label = tx(h.label);
        return `<button type="button" class="mg-hotspot" data-hotspot="${esc(h.id)}" style="left:${h.x}px" aria-label="${esc(label)}">
          <span class="mg-hotspot-ping" aria-hidden="true"></span>
          <span class="mg-hotspot-label">${esc(label)}</span>
        </button>`;
      })
      .join("");
  }

  function buildScene(sceneId, scene, tx) {
    const p = scene.palette;
    const w = scene.width;
    return `
      <div class="mg-world" id="mg-world" data-scene="${esc(sceneId)}" style="width:${w}px">
        <p class="mg-scene-badge">${esc(tx({ zh: "示意場景", th: "ฉากจำลอง", en: "Illustrated scene" }))}</p>
        ${layerFar(p, w)}
        ${layerMid(p, w, sceneId)}
        ${layerNear(p, w, !!p.indoor)}
        <div class="mg-walk" id="mg-walk" role="presentation"></div>
        <div class="mg-hotspots">${hotspotsHtml(scene, tx)}</div>
        ${travelerSvg()}
      </div>`;
  }

  window.KHUNSA_GAME_SCENES = {
    buildScene,
    travelerSvg,
    clampWalkX(scene, x) {
      let v = Math.max(scene.walkMin, Math.min(scene.walkMax, x));
      (scene.obstacles || []).forEach((o) => {
        if (v > o.x1 && v < o.x2) {
          v = v < (o.x1 + o.x2) / 2 ? o.x1 : o.x2;
        }
      });
      return v;
    },
    nearestWalkTo(scene, x) {
      return window.KHUNSA_GAME_SCENES.clampWalkX(scene, x);
    }
  };
})();
