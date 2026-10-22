/**
 * 滿星疊・記憶之路 — engine + UI
 */
(function () {
  const G = window.KHUNSA_GAME;
  if (!G) return;

  const { t, getLang, applyPage } = window.KHUNSA_I18N;
  const root = document.getElementById("game-root");
  if (!root) return;

  let state = null;
  let busy = false;
  let noteOpen = false;

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

  function roleById(id) {
    return G.roles.find((r) => r.id === id);
  }

  function itemById(id) {
    return G.items.find((i) => i.id === id);
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
      phase: "intro",
      roleId: null,
      items: [],
      time: G.START_TIME,
      energy: G.START_ENERGY,
      locationId: "gate",
      visited: [],
      unlocked: ["statue"],
      clues: [],
      choices: [],
      route: ["gate"],
      flags: { comparedSources: false },
      randomQueue: shuffle(G.randomEvents.map((e) => e.id)),
      randomIndex: 0,
      pendingRandomAfter: null,
      active: null,
      lastFeedback: null,
      endingId: null,
      arrivalNote: null,
      pendingRandomCheck: false
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
    state.time = Math.max(0, Math.min(120, state.time));
    state.energy = Math.max(0, Math.min(120, state.energy));
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

    if (choice.log) {
      state.choices.push({ label: tx(choice.log), at: state.locationId });
    }

    return { parts, gained, dTime, dEnergy };
  }

  function pickEnding() {
    const n = state.visited.length;
    const c = state.clues.length;
    const tags = new Set();
    state.clues.forEach((id) => {
      const cl = G.cluesCatalog[id];
      (cl.tags || []).forEach((t) => tags.add(t));
    });
    const multi =
      state.flags.comparedSources &&
      tags.has("sourceA") &&
      tags.has("sourceB") &&
      n >= 4 &&
      c >= 4;
    if (multi) return "multi";
    if (n >= 5 && c >= 5) return "recorder";
    return "first";
  }

  function finishJourney(early) {
    state.endingId = pickEnding();
    state.phase = early ? "early" : "ending";
    state.active = null;
    state.lastFeedback = null;
    save();
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

  function startLocationEvent(locId) {
    const ev = G.locationEvents[locId];
    state.locationId = locId;
    state.active = {
      kind: "location",
      id: locId,
      choiceId: null
    };
    state.phase = "event";
    state.lastFeedback = null;
    save();
  }

  function startRandomIfAny() {
    if (state.randomIndex >= state.randomQueue.length) return false;
    // Insert a random event about every other move, deterministically from queue
    if (state.visited.length === 0) return false;
    if (state.visited.length % 2 === 0) return false;
    const id = state.randomQueue[state.randomIndex];
    state.randomIndex += 1;
    state.arrivalNote = null;
    state.active = { kind: "random", id, choiceId: null };
    state.phase = "event";
    state.lastFeedback = null;
    save();
    return true;
  }

  function goToLocation(locId) {
    if (busy) return;
    if (state.visited.indexOf(locId) !== -1) return;
    if (state.unlocked.indexOf(locId) === -1) return;

    busy = true;
    try {
      const cost = travelCost();
      state.time -= cost.time;
      state.energy -= cost.energy;
      clampRes();
      state.route.push(locId);
      state.arrivalNote =
        (lang() === "en" ? "Travel cost: " : lang() === "th" ? "ค่าเดินทาง: " : "移動消耗：") +
        "-" +
        cost.time +
        "/" +
        "-" +
        cost.energy +
        (hasItem("parkmap")
          ? lang() === "en"
            ? " (map)"
            : lang() === "th"
              ? " (แผนที่)"
              : "（地圖）"
          : "");
      if (maybeDeplete()) {
        render();
        return;
      }
      startLocationEvent(locId);
      render();
    } finally {
      busy = false;
    }
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
    const kind = state.active.kind;
    let eventObj = null;
    if (kind === "location") eventObj = G.locationEvents[state.active.id];
    else eventObj = G.randomEvents.find((e) => e.id === state.active.id);
    if (!eventObj) return;

    const choice = visibleChoices(eventObj.choices).find((c) => c.id === choiceId);
    if (!choice) return;

    busy = true;
    try {
      state.active.choiceId = choiceId;
      state.arrivalNote = null;
      const result = applyChoice(choice);

      if (kind === "location") {
        completeLocation(state.active.id);
        state.pendingRandomCheck = true;
      } else {
        state.pendingRandomCheck = false;
      }

      state.lastFeedback = {
        title: ui("feedback"),
        parts: result.parts,
        gained: result.gained,
        next: "after"
      };
      state.phase = "result";
      save();
      maybeDeplete();
      render();
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
        render();
        return;
      }

      // After a location event only, maybe insert one random event
      if (state.pendingRandomCheck) {
        state.pendingRandomCheck = false;
        if (startRandomIfAny()) {
          render();
          return;
        }
      }

      state.phase = "map";
      save();
      render();
    } finally {
      busy = false;
    }
  }

  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  function resourcesHtml() {
    return `
      <div class="mg-res" role="group" aria-label="resources">
        <span><strong>${ui("time")}</strong> ${state.time}</span>
        <span><strong>${ui("energy")}</strong> ${state.energy}</span>
        <span><strong>${ui("clues")}</strong> ${state.clues.length}</span>
      </div>`;
  }

  function toolbarHtml() {
    if (state.phase === "intro" || state.phase === "role" || state.phase === "pack") return "";
    if (state.phase === "ending" || state.phase === "early") return "";
    return `
      <div class="mg-toolbar">
        ${resourcesHtml()}
        <button type="button" class="btn btn-line mg-btn" data-act="notebook">${ui("notebook")}</button>
      </div>`;
  }

  function renderIntro() {
    return `
      <section class="mg-panel mg-intro">
        <p class="kicker">${ui("kicker")}</p>
        <h1 class="page-title">${ui("title")}</h1>
        <p class="measure">${ui("intro")}</p>
        <p class="note">${ui("timeEst")}</p>
        <p class="note">${ui("resourceNote")}</p>
        <div class="mg-actions">
          <button type="button" class="btn btn-solid" data-act="new">${ui("start")}</button>
          ${hasSave() && load().phase !== "intro" ? `<button type="button" class="btn btn-line" data-act="continue">${ui("continue")}</button>` : ""}
        </div>
      </section>`;
  }

  function renderRole() {
    return `
      <section class="mg-panel">
        <h2>${ui("chooseRole")}</h2>
        <div class="mg-cards">
          ${G.roles
            .map(
              (r) => `
            <button type="button" class="mg-card ${state.roleId === r.id ? "is-on" : ""}" data-act="pick-role" data-id="${r.id}">
              <strong>${tx(r.name)}</strong>
              <span>${tx(r.blurb)}</span>
              <em>${tx(r.perk)}</em>
            </button>`
            )
            .join("")}
        </div>
        <div class="mg-actions">
          <button type="button" class="btn btn-solid" data-act="to-pack" ${state.roleId ? "" : "disabled"}>${ui("next")}</button>
        </div>
      </section>`;
  }

  function renderPack() {
    const n = state.items.length;
    return `
      <section class="mg-panel">
        <h2>${ui("choosePack")}</h2>
        <p class="note">${ui("packHint").replace("0/2", n + "/2")}</p>
        <div class="mg-cards">
          ${G.items
            .map(
              (it) => `
            <button type="button" class="mg-card ${hasItem(it.id) ? "is-on" : ""}" data-act="toggle-item" data-id="${it.id}">
              <strong>${tx(it.name)}</strong>
              <span>${tx(it.effect)}</span>
            </button>`
            )
            .join("")}
        </div>
        <div class="mg-actions">
          <button type="button" class="btn btn-solid" data-act="depart" ${n === 2 ? "" : "disabled"}>${ui("confirmPack")}</button>
        </div>
      </section>`;
  }

  function renderMap() {
    const nodes = [
      { id: "gate", name: ui("gate"), special: true },
      ...G.locations.map((l) => ({ id: l.id, name: tx(l.name), short: tx(l.short), image: l.image }))
    ];
    return `
      <section class="mg-panel">
        <h2>${ui("mapTitle")}</h2>
        <ol class="mg-path" aria-label="${ui("mapTitle")}">
          ${nodes
            .map((n) => {
              const done = n.id === "gate" ? state.visited.length > 0 : state.visited.indexOf(n.id) !== -1;
              const here = state.locationId === n.id;
              const open = n.id !== "gate" && state.unlocked.indexOf(n.id) !== -1 && !done;
              const locked = n.id !== "gate" && !done && !open;
              let status = done ? ui("done") : open ? ui("available") : locked ? ui("locked") : ui("youAreHere");
              if (here && n.id === "gate" && state.visited.length === 0) status = ui("youAreHere");
              return `
              <li class="mg-stop ${done ? "is-done" : ""} ${here ? "is-here" : ""} ${open ? "is-open" : ""} ${locked ? "is-locked" : ""}">
                <div class="mg-stop-body">
                  ${n.image ? `<img src="${n.image}" alt="" loading="lazy">` : `<span class="mg-gate-mark" aria-hidden="true">◆</span>`}
                  <div>
                    <strong>${n.name}</strong>
                    ${n.short ? `<small>${n.short}</small>` : ""}
                    <em>${status}</em>
                  </div>
                </div>
                ${
                  open
                    ? `<button type="button" class="btn btn-solid mg-btn" data-act="go" data-id="${n.id}">${ui("go")}</button>`
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
      </section>`;
  }

  function renderEvent() {
    const kind = state.active.kind;
    let eventObj;
    let image = "images/hero.jpg";
    let title = "";
    if (kind === "location") {
      const loc = locById(state.active.id);
      eventObj = G.locationEvents[state.active.id];
      image = loc.image;
      title = tx(loc.name);
    } else {
      eventObj = G.randomEvents.find((e) => e.id === state.active.id);
      title = tx(eventObj.title);
    }
    const choices = visibleChoices(eventObj.choices);
    const arrive = state.arrivalNote
      ? `<p class="note mg-arrive">${state.arrivalNote}</p>`
      : "";
    return `
      <section class="mg-panel mg-event" aria-live="polite">
        <figure class="mg-scene">
          <img src="${image}" alt="">
          <figcaption><span class="mg-tag">${ui("fictionTag")}</span> ${title}</figcaption>
        </figure>
        ${arrive}
        <p>${tx(eventObj.scene)}</p>
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
      </section>`;
  }

  function formatDelta(c) {
    const bits = [];
    if (c.time) bits.push((lang() === "en" ? "Time " : lang() === "th" ? "เวลา " : "時間 ") + (c.time > 0 ? "+" : "") + c.time);
    if (c.energy) bits.push((lang() === "en" ? "Energy " : lang() === "th" ? "พลัง " : "體力 ") + (c.energy > 0 ? "+" : "") + c.energy);
    return bits.join(" · ");
  }

  function renderResult() {
    const fb = state.lastFeedback;
    const clueHtml = (fb.gained || [])
      .map((id) => {
        const c = G.cluesCatalog[id];
        return `<li><strong>${tx(c.title)}</strong> — ${tx(c.text)} <a href="${c.sourceUrl}" target="_blank" rel="noopener noreferrer">${tx(c.source)}</a></li>`;
      })
      .join("");
    return `
      <section class="mg-panel" aria-live="polite">
        <h2>${fb.title}</h2>
        <ul class="mg-feedback">${(fb.parts || []).map((p) => `<li>${p}</li>`).join("")}</ul>
        ${clueHtml ? `<h3>${ui("clueList")}</h3><ul class="mg-clues">${clueHtml}</ul>` : ""}
        <div class="mg-actions">
          <button type="button" class="btn btn-solid" data-act="after-result">${ui("next")}</button>
        </div>
      </section>`;
  }

  function renderEnding() {
    const ending = G.endings.find((e) => e.id === state.endingId) || G.endings[0];
    const early = state.phase === "early";
    const visitedNames = state.visited.map((id) => tx(locById(id).name)).join(" → ");
    const clues = state.clues
      .map((id) => {
        const c = G.cluesCatalog[id];
        return `<li><strong>${tx(c.title)}</strong> <span class="mg-tag">${ui("historyTag")}</span><br>${tx(c.text)} · <a href="${c.sourceUrl}" target="_blank" rel="noopener noreferrer">${tx(c.source)}</a></li>`;
      })
      .join("");
    const choices = state.choices.map((c) => `<li>${c.label}</li>`).join("");
    return `
      <section class="mg-panel mg-ending">
        <p class="kicker">${early ? ui("earlyEnd") : ui("endingTitle")}</p>
        <h1 class="page-title">${tx(ending.name)}</h1>
        <p><strong>${ui("whyEnding")}</strong> ${tx(ending.why)}</p>
        <h3>${ui("visited")}</h3>
        <p>${visitedNames || "—"}</p>
        <h3>${ui("keyChoices")}</h3>
        <ul>${choices || "<li>—</li>"}</ul>
        <h3>${ui("clueList")}</h3>
        <ul class="mg-clues">${clues || "<li>—</li>"}</ul>
        <h3>${ui("review")}</h3>
        <ul>
          ${ending.links.map((l) => `<li><a href="${l.href}">${tx(l.label)}</a></li>`).join("")}
          <li><a href="spot.html?id=1">${tx(locById("statue").name)}</a></li>
          <li><a href="about.html">${t("navHistory")}</a></li>
        </ul>
        <div class="mg-actions">
          <button type="button" class="btn btn-solid" data-act="again">${ui("again")}</button>
          <a class="btn btn-line" href="index.html">${ui("home")}</a>
        </div>
      </section>`;
  }

  function notebookOverlay() {
    if (!noteOpen) return "";
    const visited = state.visited.map((id) => `<li>${tx(locById(id).name)}</li>`).join("") || "<li>—</li>";
    const clues = state.clues
      .map((id) => {
        const c = G.cluesCatalog[id];
        return `<li><strong>${tx(c.title)}</strong><br>${tx(c.text)} · <a href="${c.sourceUrl}" target="_blank" rel="noopener noreferrer">${tx(c.source)}</a></li>`;
      })
      .join("") || "<li>—</li>";
    const choices = state.choices.map((c) => `<li>${c.label}</li>`).join("") || "<li>—</li>";
    return `
      <div class="mg-note" role="dialog" aria-modal="true" aria-label="${ui("notebook")}">
        <div class="mg-note-inner">
          <header>
            <h2>${ui("notebook")}</h2>
            <button type="button" class="btn btn-line" data-act="close-note">${ui("closeNote")}</button>
          </header>
          ${resourcesHtml()}
          <h3>${ui("visited")}</h3><ul>${visited}</ul>
          <h3>${ui("clueList")}</h3><ul class="mg-clues">${clues}</ul>
          <h3>${ui("keyChoices")}</h3><ul>${choices}</ul>
        </div>
      </div>`;
  }

  function render() {
    let body = "";
    switch (state.phase) {
      case "intro":
        body = renderIntro();
        break;
      case "role":
        body = renderRole();
        break;
      case "pack":
        body = renderPack();
        break;
      case "map":
        body = renderMap();
        break;
      case "event":
        body = renderEvent();
        break;
      case "result":
        body = renderResult();
        break;
      case "ending":
      case "early":
        body = renderEnding();
        break;
      default:
        body = renderIntro();
    }
    root.innerHTML = `
      <div class="mg-shell">
        ${toolbarHtml()}
        ${body}
        ${notebookOverlay()}
      </div>`;
  }

  function confirmRestart() {
    if (!window.confirm(ui("restartConfirm"))) return;
    clearSave();
    state = freshState();
    noteOpen = false;
    busy = false;
    save();
    render();
  }

  root.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-act]");
    if (!btn || btn.disabled) return;
    const act = btn.getAttribute("data-act");
    const id = btn.getAttribute("data-id");

    if (act === "new") {
      clearSave();
      state = freshState();
      state.phase = "role";
      save();
      render();
      return;
    }
    if (act === "continue") {
      state = load() || freshState();
      render();
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
      state.phase = "map";
      state.locationId = "gate";
      save();
      render();
      return;
    }
    if (act === "go") {
      goToLocation(id);
      return;
    }
    if (act === "choose") {
      onChoice(id);
      return;
    }
    if (act === "after-result") {
      afterResult();
      return;
    }
    if (act === "notebook") {
      noteOpen = true;
      render();
      return;
    }
    if (act === "close-note") {
      noteOpen = false;
      render();
      return;
    }
    if (act === "end-trip") {
      finishJourney(state.time <= 0 || state.energy <= 0);
      render();
      return;
    }
    if (act === "restart" || act === "again") {
      confirmRestart();
      return;
    }
  });

  root.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && noteOpen) {
      noteOpen = false;
      render();
    }
  });

  window.KHUNSA_GAME_API = {
    getState: () => state,
    freshState,
    pickEnding: () => {
      state = state || freshState();
      return pickEnding();
    },
    _test: {
      setState(s) {
        state = s;
        save();
      },
      applyChoice,
      finishJourney,
      addClue
    }
  };

  try {
    window.KHUNSA.renderChrome();
    applyPage();
    const saved = load();
    state = saved && saved.phase !== "intro" ? saved : freshState();
    if (!saved) state.phase = "intro";
    render();
  } catch (err) {
    console.error("memory-road boot", err);
    root.innerHTML = "<p class=\"note\">Game failed to start. Please refresh.</p>";
  }
})();
