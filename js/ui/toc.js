/* ============================================================
   SikBodo — on-this-page table of contents
   Built from the h2/h3 elements inside #content, with a scroll
   spy that highlights the section currently in view.
   ============================================================ */

(function () {
  const AX = (window.AX = window.AX || {});

  const slug = (s) =>
    s.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60);

  function mount() {
    const toc = document.getElementById("toc");
    const content = document.getElementById("content");
    if (!toc || !content) return;

    const heads = Array.from(content.querySelectorAll("h2, h3")).filter((h) => h.textContent.trim());

    if (heads.length < 3 || !AX.prefs.get().toc) {
      toc.innerHTML = "";
      toc.setAttribute("hidden", "");
      const shell = document.querySelector(".shell");
      if (shell) shell.classList.remove("has-toc");
      return;
    }

    const used = new Set();
    heads.forEach((h) => {
      let id = h.id || slug(h.textContent);
      while (used.has(id)) id += "-1";
      used.add(id);
      h.id = id;
    });

    toc.className = "toc";
    toc.removeAttribute("hidden");
    toc.innerHTML = `
      <h2>On this page</h2>
      <nav aria-label="On this page">
        <ul>
          ${heads
            .map(
              (h) =>
                `<li><a href="#${h.id}" class="${h.tagName === "H3" ? "toc-sub" : ""}"
                  style="${h.tagName === "H3" ? "padding-left:calc(var(--sp-3) + 12px)" : ""}">${h.textContent.trim()}</a></li>`
            )
            .join("")}
        </ul>
      </nav>`;

    const shell = document.querySelector(".shell");
    if (shell) shell.classList.add("has-toc");

    const links = Array.from(toc.querySelectorAll("a"));
    if (!("IntersectionObserver" in window)) return;

    const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const visible = new Set();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });
        const first = heads.find((h) => visible.has(h.id));
        links.forEach((a) => a.classList.remove("active"));
        if (first && byId.has(first.id)) byId.get(first.id).classList.add("active");
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    heads.forEach((h) => io.observe(h));
  }

  AX.toc = { mount };
})();
