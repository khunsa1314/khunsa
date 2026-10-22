/**
 * 滿星疊・記憶之路 — 2D adventure engine
 * Keeps resources / branches / endings / localStorage; presents illustrated scenes.
 */
(function () {
  const G = window.KHUNSA_GAME;
  const Scenes = window.KHUNSA_GAME_SCENES;
  if (!G || !Scenes) return;

  const { t, getLang, applyPage } = window.KHUNSA_I18N;
  const root = document.getElementById("game-root");
  if (!root) return;

  const reduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarse =
    window.matchMedia && window.matchMedia("(pointer: coarse)").matches;

  let state = null;
  let busy = false;
  let noteOpen = false;
  let mapOpen = false;
  let packOpen = false;
  let raf = 0;
  let lastTs = 0;
  let paused = document.hidden;
  let viewportEl = null;
  let worldEl = null;
  let actorEl = null;
  let keys = { left: false, right: false };
  let moveTarget = null;
  let cameraX = 0;
  let staging = null; // { step, timer, hotspot }
  let skipPrompt = false;
  let loadFailed = false;
  let approachBoost = false;

  function lang() {
    return getLang() || "zh";
  }
  function tx(obj) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[lang()] || obj.zh || obj.en || "";
  }
  function ui(key) {
    return tx(G.ui[key]);
  }
  function locById(id) {
    return G.locations.find((l) => l.id === id);
  }
  function sceneOf(id) {
    return G.scenes[id] || G.scenes.gate;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function freshState() {
    return {
      version: G.VERSION,
      phase: "boot",
      roleId: null,
      items: [],
      time: G.START_TIME,
      energy: G.START_ENERGY,
      locationId: "gate",
      sceneId: "gate",
      actorX: G.scenes.gate.spawnX,
      facing: 1,
      visited: [],
      unlocked: ["statue"],
      clues: [],
      choices: [],
      route: ["gate"],
      flags: { comparedSources: false },
      randomQueue: shuffle(G.randomEvents.map((e) => e.id)),
      randomIndex: 0,
      active: null,
      lastFeedback: null,
      endingId: null,
      arrivalNote: null,
      pendingRandomCheck: false,
      audioOn: false,
      introDone: false
    };
  }

  function save() {
    try {
      localStorage.setItem(G.SAVE_KEY, JSON.stringify(state));
    } catch (_) {}
  }
  function load() {
    try {
      const raw = localStorage.getItem(G.SAVE_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (!s || s.version !== G.VERSION) return null;
      return s;
    } catch (_) {
      return null;
    }
  }
  function clearSave() {
    try {
      localStorage.removeItem(G.SAVE_KEY);
    } catch (_) {}
  }
  function hasSave() {
    return !!load();
  }
  function hasItem(id) {
    return state.items.indexOf(id) !== -1;
  }
  function addClue(clueId) {
    if (!clueId || state.clues.indexOf(clueId) !== -1) return false;
    if (!G.cluesCatalog[clueId]) return false;
    state.clues.push(clueId);
    return true;
  }
  function clampRes() {
    state.time = Math.max(0, Math.min(140, state.time));
    state.energy = Math.max(0, Math.min(140, state.energy));
  }
  function travelCost() {
    let time = G.TRAVEL_TIME;
    let energy = G.TRAVEL_ENERGY;
    if (hasItem("parkmap")) {
      time -= G.MAP_SAVE;
      energy -= G.MAP_SAVE;
    }
    return { time: Math.max(4, time), energy: Math.max(3, energy) };
  }

  function applyChoice(choice) {
    const gained = [];
    const parts = [];
    let dTime = choice.time || 0;
    let dEnergy = choice.energy || 0;
    if (choice.waterBonus && hasItem("water") && dEnergy > 0) {
      dEnergy += choice.waterBonus;
      parts.push(lang() === "en" ? "Water: +8 energy" : lang() === "th" ? "น้ำดื่ม: พลัง +8" : "飲水：體力 +8");
    }
    if (choice.notebookBonus && hasItem("notebook") && dEnergy < 0) {
      dEnergy += 2;
      parts.push(lang() === "en" ? "Notebook: less fatigue" : lang() === "th" ? "สมุด: เมื่อยน้อยลง" : "筆記本：體力消耗略減");
    }
    if (choice.mapExtraSave && hasItem("parkmap")) {
      dTime += 2;
      dEnergy += 2;
      parts.push(lang() === "en" ? "Map: easier planning" : lang() === "th" ? "แผนที่: วางแผนง่ายขึ้น" : "園區地圖：規劃更省力");
    }
    state.time += dTime;
    state.energy += dEnergy;
    clampRes();
    if (dTime || dEnergy) {
      parts.unshift(
        (lang() === "en" ? "Time " : lang() === "th" ? "เวลา " : "時間 ") +
          (dTime >= 0 ? "+" : "") +
          dTime +
          " · " +
          (lang() === "en" ? "Energy " : lang() === "th" ? "พลัง " : "體力 ") +
          (dEnergy >= 0 ? "+" : "") +
          dEnergy
      );
    }
    const clueList = (choice.clues || []).slice();
    if (choice.needItemBonus && hasItem(choice.needItemBonus.item)) {
      (choice.needItemBonus.clues || []).forEach((c) => {
        if (clueList.indexOf(c) === -1) clueList.push(c);
      });
    }
    if (choice.notebookBonus && hasItem("notebook") && clueList.indexOf("note_organise") === -1) {
      clueList.push("note_organise");
    }
    clueList.forEach((id) => {
      if (addClue(id)) gained.push(id);
    });
    if (choice.flags) {
      Object.keys(choice.flags).forEach((k) => {
        state.flags[k] = choice.flags[k];
      });
    }
    if (choice.log) state.choices.push({ label: tx(choice.log), at: state.locationId });
    return { parts, gained, dTime, dEnergy };
  }

  function pickEnding() {
    const n = state.visited.length;
    const c = state.clues.length;
    const tags = new Set();
    state.clues.forEach((id) => {
      const cl = G.cluesCatalog[id];
      (cl.tags || []).forEach((tg) => tags.add(tg));
    });
    if (state.flags.comparedSources && tags.has("sourceA") && tags.has("sourceB") && n >= 4 && c >= 4) {
      return "multi";
    }
    if (n >= 5 && c >= 5) return "recorder";
    return "first";
  }

  function finishJourney(early) {
    stopLoop();
    state.endingId = pickEnding();
    state.phase = early ? "early" : "ending";
    state.active = null;
    state.lastFeedback = null;
    save();
    render();
  }

  function maybeDeplete() {
    if (state.time <= 0 || state.energy <= 0) {
      finishJourney(true);
      return true;
    }
    return false;
  }

  function visibleChoices(list) {
    return list.filter((c) => !c.roleOnly || c.roleOnly === state.roleId);
  }

  function beep(freq) {
    if (!state.audioOn) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = freq || 520;
      g.gain.value = 0.03;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      setTimeout(() => {
        o.stop();
        ctx.close();
      }, 90);
    } catch (_) {}
  }

  function setActorAnim(mode) {
    if (!actorEl) return;
    actorEl.classList.remove("is-idle", "is-walk", "is-look", "is-write", "is-rest", "is-tired");
    actorEl.classList.add("is-" + mode);
    if (state.energy < 35) actorEl.classList.add("is-tired");
    actorEl.classList.toggle("face-left", state.facing < 0);
    actorEl.classList.toggle("face-right", state.facing >= 0);
  }

  function placeActor() {
    if (!actorEl) return;
    actorEl.style.left = state.actorX + "px";
    actorEl.style.bottom = "18%";
    actorEl.style.transform = `translateX(-50%) scaleX(${state.facing < 0 ? -1 : 1})`;
  }

  function updateCamera(dt) {
    if (!viewportEl || !worldEl) return;
    const sc = sceneOf(state.sceneId);
    const viewW = viewportEl.clientWidth || 360;
    let target = state.actorX - viewW * 0.42;
    if (staging && staging.zoom) target = staging.focusX - viewW * 0.5;
    const max = Math.max(0, sc.width - viewW);
    target = Math.max(0, Math.min(max, target));
    const k = reduced ? 1 : Math.min(1, dt * 3.2);
    cameraX += (target - cameraX) * k;
    worldEl.style.transform = `translate3d(${-cameraX}px,0,0)`;
    worldEl.querySelectorAll("[data-parallax]").forEach((layer) => {
      const p = Number(layer.getAttribute("data-parallax")) || 1;
      const shift = cameraX * (1 - p);
      layer.style.transform = `translate3d(${shift}px,0,0)`;
    });
  }

  function nearHotspot(h, radius) {
    return Math.abs(state.actorX - h.x) <= (radius || (isCoarse ? 90 : 70));
  }

  function stopLoop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    lastTs = 0;
  }

  function loop(ts) {
    if (paused || state.phase !== "explore") {
      raf = requestAnimationFrame(loop);
      return;
    }
    if (!lastTs) lastTs = ts;
    let dt = (ts - lastTs) / 1000;
    lastTs = ts;
    if (dt > 0.05) dt = 0.05;

    const sc = sceneOf(state.sceneId);
    const speed =
      (state.energy < 35 ? 120 : 170) * (reduced ? 1.35 : 1) * (approachBoost ? 2.4 : 1);
    let moving = false;

    // Allow walking while staging.step===0 (approaching hotspot)
    if (!staging || staging.step === 0) {
      let dir = 0;
      if (!staging) {
        if (keys.left) dir -= 1;
        if (keys.right) dir += 1;
      }
      if (dir !== 0) {
        moveTarget = null;
        approachBoost = false;
        state.facing = dir;
        state.actorX = Scenes.clampWalkX(sc, state.actorX + dir * speed * dt);
        moving = true;
      } else if (moveTarget != null) {
        const dx = moveTarget - state.actorX;
        if (Math.abs(dx) < 3) {
          state.actorX = moveTarget;
          moveTarget = null;
          approachBoost = false;
        } else {
          state.facing = dx < 0 ? -1 : 1;
          state.actorX = Scenes.clampWalkX(
            sc,
            state.actorX + Math.sign(dx) * Math.min(Math.abs(dx), speed * dt)
          );
          moving = true;
        }
      }
    }

    if (staging && staging.step >= 1) {
      staging.t += dt;
      tickStaging();
    } else if (!staging) {
      setActorAnim(moving ? "walk" : "idle");
    } else {
      setActorAnim(moving ? "walk" : "idle");
    }

    placeActor();
    updateCamera(dt);
    updateHotspotHints();
    raf = requestAnimationFrame(loop);
  }

  function startLoop() {
    stopLoop();
    paused = document.hidden;
    raf = requestAnimationFrame(loop);
  }

  function updateHotspotHints() {
    if (!worldEl || staging) return;
    const sc = sceneOf(state.sceneId);
    worldEl.querySelectorAll(".mg-hotspot").forEach((btn) => {
      const id = btn.getAttribute("data-hotspot");
      const h = sc.hotspots.find((x) => x.id === id);
      if (!h) return;
      const near = nearHotspot(h);
      btn.classList.toggle("is-near", near);
      btn.classList.toggle("is-done", h.kind === "event" && state.visited.indexOf(h.eventId) !== -1);
    });
  }

  function walkTo(x, then, boost) {
    const sc = sceneOf(state.sceneId);
    moveTarget = Scenes.nearestWalkTo(sc, x);
    approachBoost = !!boost;
    if (then) {
      const goal = moveTarget;
      const check = () => {
        if (moveTarget == null && Math.abs(state.actorX - goal) < 10) {
          approachBoost = false;
          then();
        } else if (state.phase === "explore" || staging) {
          requestAnimationFrame(check);
        }
      };
      requestAnimationFrame(check);
    }
  }

  function beginStaging(hotspot) {
    if (busy || staging) return;
    const focus = Scenes.nearestWalkTo(sceneOf(state.sceneId), hotspot.x);
    staging = {
      hotspot,
      step: 0,
      t: 0,
      focusX: hotspot.x,
      zoom: false,
      done: false
    };
    walkTo(
      focus,
      () => {
        if (!staging) return;
        state.facing = hotspot.x >= state.actorX ? 1 : -1;
        staging.step = 1;
        staging.t = 0;
        staging.zoom = true;
        setActorAnim("look");
        beep(440);
      },
      true
    );
  }

  function tickStaging() {
    if (!staging || staging.step < 1) return;
    const skip = skipPrompt || reduced;
    if (staging.step === 1 && (staging.t > (skip ? 0.05 : 0.45))) {
      staging.step = 2;
      staging.t = 0;
      setActorAnim(staging.hotspot.kind === "event" ? "write" : "look");
    }
    if (staging.step === 2 && (staging.t > (skip ? 0.05 : 0.55))) {
      staging.step = 3;
      staging.t = 0;
      openHotspotEvent(staging.hotspot);
    }
  }

  function openHotspotEvent(h) {
    staging = null;
    skipPrompt = false;
    if (h.kind === "flavor") {
      state.active = {
        kind: "flavor",
        id: h.id,
        choiceId: null
      };
      state.phase = "event";
      state.lastFeedback = null;
      save();
      renderDialog();
      return;
    }
    if (h.kind === "travel") {
      mapOpen = false;
      travelToScene(h.target);
      return;
    }
    if (h.kind === "event") {
      if (state.visited.indexOf(h.eventId) !== -1) {
        state.phase = "explore";
        setActorAnim("idle");
        return;
      }
      state.locationId = h.eventId;
      state.active = { kind: "location", id: h.eventId, choiceId: null };
      state.phase = "event";
      state.lastFeedback = null;
      save();
      renderDialog();
    }
  }

  function travelToScene(sceneId) {
    if (busy) return;
    const can =
      sceneId === "gate" ||
      state.unlocked.indexOf(sceneId) !== -1 ||
      state.visited.indexOf(sceneId) !== -1;
    if (!can) return;

    busy = true;
    const cost = travelCost();
    if (state.sceneId !== sceneId) {
      state.time -= cost.time;
      state.energy -= cost.energy;
      clampRes();
      state.arrivalNote =
        ui("travelTo") +
        " · " +
        (lang() === "en" ? "Time " : lang() === "th" ? "เวลา " : "時間 ") +
        "-" +
        cost.time;
      if (maybeDeplete()) {
        busy = false;
        return;
      }
      if (state.route[state.route.length - 1] !== sceneId) state.route.push(sceneId);
    }
    state.sceneId = sceneId;
    state.locationId = sceneId === "gate" ? "gate" : sceneId;
    state.actorX = sceneOf(sceneId).spawnX;
    state.facing = 1;
    moveTarget = null;
    cameraX = 0;
    staging = null;
    state.phase = "transition";
    save();
    render();
    setTimeout(() => {
      if (state.phase !== "transition") {
        busy = false;
        return;
      }
      if (
        sceneId !== "gate" &&
        state.visited.indexOf(sceneId) === -1 &&
        state.visited.length > 0 &&
        state.visited.length % 2 === 1
      ) {
        if (startRandomIfAny()) {
          busy = false;
          render();
          return;
        }
      }
      state.phase = "explore";
      busy = false;
      render();
      startLoop();
      setActorAnim("look");
      setTimeout(() => {
        if (state.phase === "explore") setActorAnim("idle");
      }, reduced ? 0 : 480);
    }, reduced ? 80 : 650);
  }

  function startRandomIfAny() {
    if (state.randomIndex >= state.randomQueue.length) return false;
    if (state.visited.length === 0) return false;
    const id = state.randomQueue[state.randomIndex];
    state.randomIndex += 1;
    state.active = { kind: "random", id, choiceId: null };
    state.phase = "event";
    state.lastFeedback = null;
    save();
    return true;
  }

  function completeLocation(locId) {
    if (state.visited.indexOf(locId) === -1) state.visited.push(locId);
    const loc = locById(locId);
    if (loc && loc.unlockNext && state.unlocked.indexOf(loc.unlockNext) === -1) {
      state.unlocked.push(loc.unlockNext);
    }
    state.locationId = locId;
  }

  function onChoice(choiceId) {
    if (busy || !state.active || state.active.choiceId) return;
    if (state.active.kind === "flavor") {
      state.active = null;
      state.phase = "explore";
      save();
      renderDialog();
      startLoop();
      return;
    }
    const kind = state.active.kind;
    let eventObj =
      kind === "location"
        ? G.locationEvents[state.active.id]
        : G.randomEvents.find((e) => e.id === state.active.id);
    if (!eventObj) return;
    const choice = visibleChoices(eventObj.choices).find((c) => c.id === choiceId);
    if (!choice) return;

    busy = true;
    try {
      state.active.choiceId = choiceId;
      setActorAnim(choice.energy > 0 ? "rest" : "write");
      const result = applyChoice(choice);
      if (kind === "location") {
        completeLocation(state.active.id);
        state.pendingRandomCheck = true;
      } else state.pendingRandomCheck = false;
      state.lastFeedback = { parts: result.parts, gained: result.gained };
      state.phase = "result";
      save();
      maybeDeplete();
      beep(660);
      renderDialog();
      // clue fly animation
      if (result.gained && result.gained.length) {
        root.classList.add("mg-clue-fly");
        setTimeout(() => root.classList.remove("mg-clue-fly"), 700);
      }
    } finally {
      busy = false;
    }
  }

  function afterResult() {
    if (busy) return;
    busy = true;
    try {
      state.lastFeedback = null;
      state.active = null;
      if (state.visited.length >= 5) {
        state.pendingRandomCheck = false;
        finishJourney(false);
        return;
      }
      if (state.pendingRandomCheck) {
        state.pendingRandomCheck = false;
        // do not auto-open another random here; travel handles it
      }
      state.phase = "explore";
      save();
      renderDialog();
      startLoop();
      setActorAnim(state.energy < 35 ? "rest" : "idle");
      setTimeout(() => {
        if (state.phase === "explore") setActorAnim("idle");
      }, 600);
    } finally {
      busy = false;
    }
  }

  /* ——— UI ——— */

  function hudHtml() {
    return `
      <div class="mg-hud">
        <div class="mg-hud-res">
          <span><strong>${ui("time")}</strong> ${state.time}</span>
          <span class="${state.energy < 35 ? "is-low" : ""}"><strong>${ui("energy")}</strong> ${state.energy}${
            state.energy < 35 ? " · " + ui("lowEnergy") : ""
          }</span>
          <span><strong>${ui("clues")}</strong> ${state.clues.length}</span>
        </div>
        <div class="mg-hud-tools">
          <button type="button" class="mg-icon-btn" data-act="map">${ui("mapBtn")}</button>
          <button type="button" class="mg-icon-btn" data-act="pack">${ui("packBtn")}</button>
          <button type="button" class="mg-icon-btn" data-act="notebook">${ui("notebook")}</button>
          <button type="button" class="mg-icon-btn" data-act="audio">${
            state.audioOn ? ui("audioOn") : ui("audioOff")
          }</button>
        </div>
      </div>
      <p class="mg-walk-hint">${ui("walkHint")}</p>`;
  }

  function formatDelta(c) {
    const bits = [];
    if (c.time) bits.push((lang() === "en" ? "Time " : "時間 ") + (c.time > 0 ? "+" : "") + c.time);
    if (c.energy) bits.push((lang() === "en" ? "Energy " : "體力 ") + (c.energy > 0 ? "+" : "") + c.energy);
    return bits.join(" · ");
  }

  function dialogHtml() {
    if (state.phase !== "event" && state.phase !== "result") return "";
    if (state.phase === "result" && state.lastFeedback) {
      const fb = state.lastFeedback;
      const clues = (fb.gained || [])
        .map((id) => {
          const c = G.cluesCatalog[id];
          return `<li><strong>${tx(c.title)}</strong> — ${tx(c.text)}</li>`;
        })
        .join("");
      return `
        <div class="mg-dialog" role="dialog" aria-modal="true">
          <div class="mg-dialog-card">
            <p class="mg-tag">${ui("fictionTag")}</p>
            <h2>${ui("feedback")}</h2>
            <ul>${(fb.parts || []).map((p) => `<li>${p}</li>`).join("")}</ul>
            ${clues ? `<h3>${ui("clueList")}</h3><ul class="mg-clues">${clues}</ul>` : ""}
            <button type="button" class="btn btn-solid" data-act="after-result">${ui("next")}</button>
          </div>
        </div>`;
    }

    if (state.active && state.active.kind === "flavor") {
      return `
        <div class="mg-dialog" role="dialog" aria-modal="true">
          <div class="mg-dialog-card">
            <p class="mg-tag">${ui("fictionTag")}</p>
            <p>${
              lang() === "en"
                ? "An illustrated park sign. Historical details are on the memorial’s spot pages."
                : lang() === "th"
                  ? "ป้ายฉากจำลอง รายละเอียดประวัติอยู่ที่หน้าจุดของพิพิธภัณฑ์"
                  : "這是示意場景中的園區標示。歷史細節請見紀念館據點頁。"
            }</p>
            <button type="button" class="btn btn-solid" data-act="flavor-ok">${ui("next")}</button>
          </div>
        </div>`;
    }

    const kind = state.active.kind;
    const eventObj =
      kind === "location"
        ? G.locationEvents[state.active.id]
        : G.randomEvents.find((e) => e.id === state.active.id);
    if (!eventObj) return "";
    const title =
      kind === "location" ? tx(locById(state.active.id).name) : tx(eventObj.title);
    const choices = visibleChoices(eventObj.choices);
    const img = kind === "location" ? locById(state.active.id).image : "images/hero.jpg";
    return `
      <div class="mg-dialog" role="dialog" aria-modal="true">
        <div class="mg-dialog-card">
          <button type="button" class="mg-skip-line" data-act="skip-anim">${ui("skip")}</button>
          <figure class="mg-dialog-fig">
            <img src="${img}" alt="">
            <figcaption><span class="mg-tag">${ui("historyTag")}</span> ${title}</figcaption>
          </figure>
          <p class="mg-tag">${ui("fictionTag")}</p>
          <p>${tx(eventObj.scene)}</p>
          ${state.arrivalNote ? `<p class="note">${state.arrivalNote}</p>` : ""}
          <div class="mg-choices">
            ${choices
              .map(
                (c) => `
              <button type="button" class="mg-choice" data-act="choose" data-id="${c.id}">
                <strong>${tx(c.label)}</strong>
                <small>${formatDelta(c)}</small>
              </button>`
              )
              .join("")}
          </div>
        </div>
      </div>`;
  }

  function mapHtml() {
    if (!mapOpen) return "";
    const nodes = [{ id: "gate", name: ui("gate") }].concat(
      G.locations.map((l) => ({ id: l.id, name: tx(l.name) }))
    );
    return `
      <div class="mg-modal" role="dialog" aria-modal="true" aria-label="${ui("mapBtn")}">
        <div class="mg-modal-card">
          <header><h2>${ui("mapTitle")}</h2><button type="button" class="btn btn-line" data-act="close-map">${ui("closeNote")}</button></header>
          <ol class="mg-map-list">
            ${nodes
              .map((n) => {
                const done = n.id !== "gate" && state.visited.indexOf(n.id) !== -1;
                const open =
                  n.id === "gate" ||
                  state.unlocked.indexOf(n.id) !== -1 ||
                  done ||
                  n.id === state.sceneId;
                const here = state.sceneId === n.id;
                return `<li class="${here ? "is-here" : ""} ${done ? "is-done" : ""} ${
                  open ? "" : "is-locked"
                }">
                  <span>${n.name}${here ? " · " + ui("youAreHere") : done ? " · " + ui("done") : open ? "" : " · " + ui("locked")}</span>
                  ${
                    open && !here
                      ? `<button type="button" class="btn btn-solid mg-btn" data-act="travel" data-id="${n.id}">${ui("go")}</button>`
                      : ""
                  }
                </li>`;
              })
              .join("")}
          </ol>
          <div class="mg-actions">
            <button type="button" class="btn btn-line" data-act="end-trip">${ui("endTrip")}</button>
            <button type="button" class="btn btn-line" data-act="restart">${ui("restart")}</button>
          </div>
        </div>
      </div>`;
  }

  function noteHtml() {
    if (!noteOpen) return "";
    const visited =
      state.visited.map((id) => `<li>${tx(locById(id).name)}</li>`).join("") || "<li>—</li>";
    const clues =
      state.clues
        .map((id) => {
          const c = G.cluesCatalog[id];
          return `<li><strong>${tx(c.title)}</strong><br>${tx(c.text)} · <a href="${c.sourceUrl}" target="_blank" rel="noopener">${tx(c.source)}</a></li>`;
        })
        .join("") || "<li>—</li>";
    return `
      <div class="mg-modal" role="dialog" aria-modal="true">
        <div class="mg-modal-card">
          <header><h2>${ui("notebook")}</h2><button type="button" class="btn btn-line" data-act="close-note">${ui("closeNote")}</button></header>
          <h3>${ui("visited")}</h3><ul>${visited}</ul>
          <h3>${ui("clueList")}</h3><ul class="mg-clues">${clues}</ul>
          <h3>${ui("keyChoices")}</h3><ul>${
            state.choices.map((c) => `<li>${c.label}</li>`).join("") || "<li>—</li>"
          }</ul>
        </div>
      </div>`;
  }

  function packHtml() {
    if (!packOpen) return "";
    return `
      <div class="mg-modal" role="dialog" aria-modal="true">
        <div class="mg-modal-card">
          <header><h2>${ui("packBtn")}</h2><button type="button" class="btn btn-line" data-act="close-pack">${ui("closeNote")}</button></header>
          <ul>${state.items
            .map((id) => {
              const it = G.items.find((x) => x.id === id);
              return `<li><strong>${tx(it.name)}</strong> — ${tx(it.effect)}</li>`;
            })
            .join("")}</ul>
          <p class="note">${tx(roleByIdSafe().blurb)}</p>
        </div>
      </div>`;
  }

  function roleByIdSafe() {
    return G.roles.find((r) => r.id === state.roleId) || G.roles[0];
  }

  function endingHtml() {
    const ending = G.endings.find((e) => e.id === state.endingId) || G.endings[0];
    const early = state.phase === "early";
    const path = ["gate"].concat(state.visited);
    return `
      <section class="mg-ending-cine">
        <p class="kicker">${early ? ui("earlyEnd") : ui("endingTitle")}</p>
        <h1>${tx(ending.name)}</h1>
        <svg class="mg-route-draw" viewBox="0 0 320 60" aria-hidden="true">
          <polyline class="mg-route-line" points="${path
            .map((_, i) => `${20 + i * (280 / Math.max(1, path.length - 1))},30`)
            .join(" ")}" fill="none" stroke="#a77a44" stroke-width="3"/>
          ${path
            .map((id, i) => {
              const x = 20 + i * (280 / Math.max(1, path.length - 1));
              return `<circle cx="${x}" cy="30" r="5" fill="#31463a"><title>${id}</title></circle>`;
            })
            .join("")}
        </svg>
        <p><strong>${ui("whyEnding")}</strong> ${tx(ending.why)}</p>
        <h3>${ui("clueList")}</h3>
        <ul class="mg-memory-strip">
          ${state.clues
            .map((id) => `<li class="mg-mem-card"><strong>${tx(G.cluesCatalog[id].title)}</strong></li>`)
            .join("") || "<li>—</li>"}
        </ul>
        <ul>${ending.links.map((l) => `<li><a href="${l.href}">${tx(l.label)}</a></li>`).join("")}</ul>
        <div class="mg-actions">
          <button type="button" class="btn btn-solid" data-act="again">${ui("again")}</button>
          <a class="btn btn-line" href="index.html">${ui("home")}</a>
        </div>
      </section>`;
  }

  function setupHtml() {
    if (state.phase === "role") {
      return `
        <div class="mg-setup">
          <h2>${ui("chooseRole")}</h2>
          <div class="mg-cards">
            ${G.roles
              .map(
                (r) => `
              <button type="button" class="mg-card ${state.roleId === r.id ? "is-on" : ""}" data-act="pick-role" data-id="${r.id}">
                <strong>${tx(r.name)}</strong><span>${tx(r.blurb)}</span><em>${tx(r.perk)}</em>
              </button>`
              )
              .join("")}
          </div>
          <button type="button" class="btn btn-solid" data-act="to-pack" ${state.roleId ? "" : "disabled"}>${ui("next")}</button>
        </div>`;
    }
    if (state.phase === "pack") {
      const n = state.items.length;
      return `
        <div class="mg-setup">
          <h2>${ui("choosePack")}</h2>
          <p class="note">${ui("packHint").replace("0/2", n + "/2")}</p>
          <div class="mg-cards">
            ${G.items
              .map(
                (it) => `
              <button type="button" class="mg-card ${hasItem(it.id) ? "is-on" : ""}" data-act="toggle-item" data-id="${it.id}">
                <strong>${tx(it.name)}</strong><span>${tx(it.effect)}</span>
              </button>`
              )
              .join("")}
          </div>
          <button type="button" class="btn btn-solid" data-act="depart" ${n === 2 ? "" : "disabled"}>${ui("confirmPack")}</button>
        </div>`;
    }
    return "";
  }

  function titleHtml() {
    return `
      <section class="mg-title">
        <p class="kicker">${ui("kicker")}</p>
        <h1>${ui("title")}</h1>
        <p class="measure">${ui("intro")}</p>
        <p class="note">${ui("timeEst")}</p>
        <p class="note">${ui("resourceNote")}</p>
        <div class="mg-actions">
          <button type="button" class="btn btn-solid" data-act="new">${ui("start")}</button>
          ${
            hasSave()
              ? `<button type="button" class="btn btn-line" data-act="continue">${ui("continue")}</button>`
              : ""
          }
        </div>
      </section>`;
  }

  function cinematicHtml() {
    return `
      <div class="mg-cine ${reduced ? "is-reduced" : ""}" id="mg-cine">
        <button type="button" class="btn btn-line mg-cine-skip" data-act="skip-cine">${ui("cinematicSkip")}</button>
        <div class="mg-cine-stage">
          <div class="mg-cine-layer mg-cine-far"></div>
          <div class="mg-cine-layer mg-cine-mid"></div>
          <div class="mg-cine-layer mg-cine-near"></div>
          <div class="mg-cine-actor"></div>
          <p class="mg-cine-title">${ui("title")}</p>
        </div>
      </div>`;
  }

  function renderDialog() {
    const host = root.querySelector("#mg-overlay");
    if (!host) {
      render();
      return;
    }
    host.innerHTML = dialogHtml() + mapHtml() + noteHtml() + packHtml();
    // keep hud numbers fresh
    const res = root.querySelector(".mg-hud-res");
    if (res) {
      res.innerHTML = `
        <span><strong>${ui("time")}</strong> ${state.time}</span>
        <span class="${state.energy < 35 ? "is-low" : ""}"><strong>${ui("energy")}</strong> ${state.energy}</span>
        <span><strong>${ui("clues")}</strong> ${state.clues.length}</span>`;
    }
  }

  function bindStage() {
    viewportEl = root.querySelector("#mg-viewport");
    worldEl = root.querySelector("#mg-world");
    actorEl = root.querySelector("#mg-actor");
    placeActor();
    updateCamera(1);
    const walk = root.querySelector("#mg-walk");
    if (walk) {
      walk.onclick = (e) => {
        if (state.phase !== "explore" || staging) return;
        const rect = worldEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        walkTo(x);
        beep(320);
      };
    }
  }

  function render() {
    stopLoop();
    if (state.phase === "boot" || state.phase === "title") {
      root.innerHTML = `<div class="mg-shell mg-shell-setup">${titleHtml()}</div>`;
      return;
    }
    if (state.phase === "cinematic") {
      root.innerHTML = `<div class="mg-shell">${cinematicHtml()}</div>`;
      if (reduced) {
        finishCinematic();
        return;
      }
      setTimeout(() => {
        if (state.phase === "cinematic") finishCinematic();
      }, 10000);
      return;
    }
    if (state.phase === "role" || state.phase === "pack") {
      root.innerHTML = `<div class="mg-shell mg-shell-setup">${setupHtml()}</div>`;
      return;
    }
    if (state.phase === "ending" || state.phase === "early") {
      root.innerHTML = `<div class="mg-shell mg-shell-setup">${endingHtml()}</div>`;
      return;
    }

    // explore / event / result / transition
    const sc = sceneOf(state.sceneId);
    const sceneBlock = Scenes.buildScene(state.sceneId, sc, tx);
    root.innerHTML = `
      <div class="mg-shell mg-shell-stage ${state.phase === "transition" ? "is-transition" : ""} ${
        reduced ? "is-reduced" : ""
      } ${isCoarse ? "is-touch" : ""}">
        ${hudHtml()}
        <div class="mg-viewport" id="mg-viewport" tabindex="0" aria-label="${ui("title")}">
          ${sceneBlock}
        </div>
        <div id="mg-overlay">${dialogHtml()}${mapHtml()}${noteHtml()}${packHtml()}</div>
      </div>`;
    bindStage();
    if (state.phase === "explore") startLoop();
    else {
      placeActor();
      updateCamera(1);
      setActorAnim(state.phase === "event" ? "look" : "idle");
    }
  }

  function finishCinematic() {
    state.introDone = true;
    state.phase = "role";
    save();
    render();
  }

  function confirmRestart() {
    if (!window.confirm(ui("restartConfirm"))) return;
    clearSave();
    state = freshState();
    state.phase = "title";
    noteOpen = mapOpen = packOpen = false;
    staging = null;
    render();
  }

  root.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-act], .mg-hotspot");
    if (!btn) return;
    if (btn.classList.contains("mg-hotspot")) {
      if (state.phase !== "explore") return;
      const id = btn.getAttribute("data-hotspot");
      const h = sceneOf(state.sceneId).hotspots.find((x) => x.id === id);
      if (!h) return;
      if (nearHotspot(h)) beginStaging(h);
      else walkTo(h.x, () => beginStaging(h));
      return;
    }
    const act = btn.getAttribute("data-act");
    const id = btn.getAttribute("data-id");
    if (btn.disabled) return;

    if (act === "new") {
      clearSave();
      state = freshState();
      state.phase = "cinematic";
      render();
      return;
    }
    if (act === "continue") {
      state = load() || freshState();
      if (state.phase === "boot" || state.phase === "title" || state.phase === "cinematic") {
        state.phase = state.roleId ? (state.items.length === 2 ? "explore" : "pack") : "role";
      }
      render();
      return;
    }
    if (act === "skip-cine") {
      finishCinematic();
      return;
    }
    if (act === "pick-role") {
      state.roleId = id;
      save();
      render();
      return;
    }
    if (act === "to-pack") {
      if (!state.roleId) return;
      state.phase = "pack";
      save();
      render();
      return;
    }
    if (act === "toggle-item") {
      const i = state.items.indexOf(id);
      if (i !== -1) state.items.splice(i, 1);
      else if (state.items.length < 2) state.items.push(id);
      save();
      render();
      return;
    }
    if (act === "depart") {
      if (state.items.length !== 2) {
        window.alert(ui("pickTwo"));
        return;
      }
      state.sceneId = "gate";
      state.locationId = "gate";
      state.actorX = G.scenes.gate.spawnX;
      state.phase = "explore";
      save();
      render();
      return;
    }
    if (act === "choose") {
      onChoice(id);
      return;
    }
    if (act === "after-result" || act === "flavor-ok") {
      if (act === "flavor-ok") {
        state.active = null;
        state.phase = "explore";
        save();
        renderDialog();
        startLoop();
        return;
      }
      afterResult();
      return;
    }
    if (act === "skip-anim") {
      skipPrompt = true;
      if (staging) staging.t += 10;
      return;
    }
    if (act === "map") {
      mapOpen = true;
      renderDialog();
      return;
    }
    if (act === "close-map") {
      mapOpen = false;
      renderDialog();
      return;
    }
    if (act === "pack") {
      packOpen = true;
      renderDialog();
      return;
    }
    if (act === "close-pack") {
      packOpen = false;
      renderDialog();
      return;
    }
    if (act === "notebook") {
      noteOpen = true;
      renderDialog();
      return;
    }
    if (act === "close-note") {
      noteOpen = false;
      renderDialog();
      return;
    }
    if (act === "travel") {
      mapOpen = false;
      travelToScene(id);
      return;
    }
    if (act === "audio") {
      state.audioOn = !state.audioOn;
      if (state.audioOn) beep(500);
      save();
      renderDialog();
      const audioBtn = root.querySelector('[data-act="audio"]');
      if (audioBtn) audioBtn.textContent = state.audioOn ? ui("audioOn") : ui("audioOff");
      return;
    }
    if (act === "end-trip") {
      finishJourney(state.time <= 0 || state.energy <= 0);
      return;
    }
    if (act === "restart" || act === "again") {
      confirmRestart();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (state.phase !== "explore" || staging) return;
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.left = true;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.right = true;
    if (e.key === "Escape") {
      noteOpen = mapOpen = packOpen = false;
      renderDialog();
    }
    if (e.key === "Enter" || e.key === " ") {
      const sc = sceneOf(state.sceneId);
      const h = sc.hotspots.find((hs) => nearHotspot(hs));
      if (h) {
        e.preventDefault();
        beginStaging(h);
      }
    }
  });
  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.left = false;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.right = false;
  });
  document.addEventListener("visibilitychange", () => {
    paused = document.hidden;
    if (!paused && state.phase === "explore") lastTs = 0;
  });

  // boot
  window.KHUNSA_GAME_API = {
    getState: () => state,
    travelToScene,
    walkTo
  };

  try {
    window.KHUNSA.renderChrome();
    applyPage();
    root.innerHTML = `<div class="mg-shell mg-shell-setup"><p class="note">${ui("loading")}</p></div>`;
    const saved = load();
    state = saved || freshState();
    if (!saved) state.phase = "title";
    else if (state.phase === "boot" || state.phase === "transition" || state.phase === "cinematic") {
      if (state.roleId && state.items && state.items.length === 2) state.phase = "explore";
      else if (state.roleId) state.phase = "pack";
      else state.phase = "title";
    }
    if (!state.sceneId) state.sceneId = state.locationId === "gate" ? "gate" : state.locationId || "gate";
    if (state.actorX == null) state.actorX = sceneOf(state.sceneId).spawnX;
    if (state.facing == null) state.facing = 1;
    if (!G.scenes[state.sceneId]) state.sceneId = "gate";
    render();
  } catch (err) {
    console.error(err);
    loadFailed = true;
    root.innerHTML = `<div class="mg-shell"><p class="note">${ui("loading")}</p>
      <button type="button" class="btn btn-solid" onclick="location.reload()">${ui("retry")}</button></div>`;
  }
})();
