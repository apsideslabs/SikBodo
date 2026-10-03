/* ============================================================
   SikBodo — mobile bottom navigation
   Shown under 768px as a 5-destination app bar:
   Home · Lessons · Words · Quiz · Progress.
   ============================================================ */

(function () {
  const AX = (window.AX = window.AX || {});
  const icon = (n, c) => AX.icons.icon(n, c);

  const ITEMS = [
    { href: "index.html", label: "Home", key: "home", icon: "home" },
    { href: "lessons.html", label: "Lessons", key: "lessons", icon: "lessons" },
    { href: "dictionary.html", label: "Words", key: "dictionary", icon: "dictionary" },
    { href: "quiz.html", label: "Practice", key: "quiz", icon: "quiz" },
    { href: "progress.html", label: "Progress", key: "progress", icon: "progress", badge: true },
  ];

  function mount(page) {
    if (document.querySelector(".mobile-nav")) return;

    const total = (window.SKB && window.SKB.lessons && window.SKB.lessons.length) || 15;
    const r = AX.store.progress.rank(total);

    const nav = document.createElement("nav");
    nav.className = "mobile-nav";
    nav.setAttribute("aria-label", "Primary mobile navigation");

    nav.innerHTML = ITEMS.map((it) => {
      const badgeHTML = it.badge
        ? `<b class="mnav-badge" id="mnav-lvl-badge">L${r.level}</b>`
        : "";
      return `<a class="mnav-item" href="${it.href}"${it.key === page ? ' aria-current="page"' : ""}>
        <span class="mnav-icon">
          ${icon(it.icon)}
          ${badgeHTML}
        </span>
        <span class="mnav-label">${it.label}</span>
      </a>`;
    }).join("");

    document.body.appendChild(nav);

    document.addEventListener("ax:progress", () => {
      const badge = document.getElementById("mnav-lvl-badge");
      if (badge) {
        const updated = AX.store.progress.rank(total);
        badge.textContent = "L" + updated.level;
      }
    });
  }

  AX.mobilenav = { mount };
})();
