/* ============================================================
   SikBodo — sidebar & slide-over navigation drawer
   Desktop sticky sidebar + polished slide-over mobile/tablet
   drawer with header, quick search, and Mastery card.
   ============================================================ */

(function () {
  const AX = (window.AX = window.AX || {});
  const icon = (n, c) => AX.icons.icon(n, c);

  function drawerHeadHTML() {
    const meta = window.SKB.meta;
    return `
      <div class="drawer-head">
        <a class="drawer-brand" href="index.html">
          <img src="assets/logo-mark.svg" alt="" width="30" height="30" aria-hidden="true">
          <div>
            <strong>${meta.name}</strong>
            <span>${meta.nameBo} · Navigation</span>
          </div>
        </a>
        <button type="button" class="icon-btn drawer-close" id="drawer-close" aria-label="Close navigation menu">
          ${icon("close")}
        </button>
      </div>
      <form class="drawer-search" role="search" action="dictionary.html" method="get">
        <label class="visually-hidden" for="drawer-q">Search dictionary</label>
        ${icon("search")}
        <input id="drawer-q" type="search" name="q" placeholder="Search Bodo words…" autocomplete="off">
      </form>`;
  }

  function groupHTML(group, page) {
    const total = (window.SKB.lessons || []).length;
    const p = AX.store.progress.count(total);
    return `
      <div class="sidebar-group">
        <h2>${group.group}</h2>
        <nav aria-label="${group.group}">
          <ul>
            ${group.items
              .map((it) => {
                const badge =
                  it.key === "lessons"
                    ? `<span class="nav-count">${p.done}/${p.total}</span>`
                    : "";
                return `<li><a href="${it.href}"${it.key === page ? ' aria-current="page"' : ""}>
                  ${icon(it.icon)}<span>${it.label}</span>${badge}</a></li>`;
              })
              .join("")}
          </ul>
        </nav>
      </div>`;
  }

  function progressHTML(page) {
    if (page === "progress") return "";
    const lessons = window.SKB.lessons || [];
    const total = lessons.length;
    const p = AX.store.progress.count(total);
    const r = AX.store.progress.rank(total);
    const nextN = AX.store.progress.nextLesson(total);
    return `
      <div class="progress-card">
        <div class="pc-top">
          <div>
            <span class="pc-lvl">LEVEL ${r.level} · ${r.title.toUpperCase()}</span>
            <strong class="pc-bo bo">${r.bo}</strong>
          </div>
          <span class="pc-xp">${icon("star")} ${r.xp} XP</span>
        </div>
        <div class="progress" role="progressbar" aria-valuenow="${r.levelPercent}" aria-valuemin="0" aria-valuemax="100">
          <i style="width:${r.levelPercent}%"></i>
        </div>
        <div class="pc-meta">
          <span>${p.done}/${p.total} lessons</span>
          <a href="progress.html">Profile &amp; sheet →</a>
        </div>
        <a class="btn primary small pc-cta" href="lessons.html#lesson-${nextN}">
          ${p.done ? `Continue Lesson ${nextN}` : "Start Lesson 1"} ${icon("arrow")}
        </a>
      </div>`;
  }

  function mount(page) {
    const el = document.getElementById("sidebar");
    if (!el) return;
    el.className = "sidebar";
    const renderAll = () => {
      el.innerHTML =
        drawerHeadHTML() +
        `<div class="sidebar-scroll">` +
        AX.chrome.NAV.map((g) => groupHTML(g, page)).join("") +
        progressHTML(page) +
        `</div>`;

      const closeBtn = el.querySelector("#drawer-close");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          if (AX.chrome && AX.chrome.setDrawerState) AX.chrome.setDrawerState(false);
          else el.classList.remove("open");
        });
      }
    };
    renderAll();

    document.addEventListener("ax:progress", renderAll);

    el.addEventListener("click", (e) => {
      if (e.target.closest("a") && (window.matchMedia("(max-width: 1023px)").matches || page === "home")) {
        if (AX.chrome && AX.chrome.setDrawerState) AX.chrome.setDrawerState(false);
        else el.classList.remove("open");
      }
    });
  }

  AX.sidebar = { mount, progressHTML };
})();
