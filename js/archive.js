(function () {
  const COUNT = 18;
  const { t, format } = window.KHUNSA_I18N;

  KHUNSA.renderChrome();

  const items = Array.from({ length: COUNT }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      src: "images/archive/" + n + ".jpg",
      n: i + 1,
      label: format(t("galleryItem"), { n: n })
    };
  });

  const grid = document.getElementById("archive-grid");
  const dialog = document.getElementById("archive-dialog");
  const dialogImg = document.getElementById("archive-dialog-img");
  const dialogTitle = document.getElementById("archive-dialog-title");
  let index = 0;

  grid.innerHTML = items.map((item, i) => `
    <a href="${item.src}" data-i="${i}">
      <img src="${item.src}" alt="${item.label}"${i === 0 ? "" : ' loading="lazy"'}>
      <span>${item.label}</span>
    </a>
  `).join("");

  function show(i) {
    index = (i + items.length) % items.length;
    const item = items[index];
    dialogImg.src = item.src;
    dialogImg.alt = item.label;
    dialogTitle.textContent = item.label;
  }

  function openAt(i) {
    show(i);
    if (typeof dialog.showModal === "function") dialog.showModal();
  }

  grid.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    e.preventDefault();
    openAt(Number(a.dataset.i));
  });

  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
  dialog.querySelector("[data-prev]").addEventListener("click", () => show(index - 1));
  dialog.querySelector("[data-next]").addEventListener("click", () => show(index + 1));
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  document.addEventListener("keydown", (e) => {
    if (!dialog.open) return;
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });

  document.querySelector("[data-prev]").setAttribute("aria-label", t("prevLabel"));
  document.querySelector("[data-next]").setAttribute("aria-label", t("nextLabel"));
})();
