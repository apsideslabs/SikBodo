/* ============================================================
   SikBodo — floating display controller
   The button and panel markup live in the HTML (see the page
   template), so the control is present even if JavaScript is slow
   or blocked. This module wires it up and keeps it in sync with
   the saved preferences.
   ============================================================ */

(function () {
  const AX = (window.AX = window.AX || {});

  let panel, fab;

  /* Sync every control to the current preferences. */
  function sync() {
    if (!panel) return;
    const p = AX.prefs.get();

    panel.querySelectorAll(".seg").forEach((s) => {
      const name = s.getAttribute("data-seg");
      let current;
      if (name === "reading") current = p.reading ? "on" : "off";
      else if (name === "toc") current = p.toc ? "on" : "off";
      else current = p[name];
      s.querySelectorAll("button[data-val]").forEach((b) =>
        b.setAttribute("aria-pressed", String(b.getAttribute("data-val") === current))
      );
    });

    panel.querySelectorAll(".swatch").forEach((sw) =>
      sw.setAttribute("aria-pressed", String(sw.getAttribute("data-accent") === p.accent))
    );

    const set = (id, val, outId, fmt) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
      const out = document.getElementById(outId);
      if (out && fmt) out.textContent = fmt(val);
    };
    set("cp-text", Math.round(p.textScale * 100), "cp-text-val", (v) => v + "%");
    set("cp-zoom", Math.round(p.zoom * 100), "cp-zoom-val", (v) => v + "%");
    set("cp-warm", p.warmth, "cp-warm-val", (v) => (v > 0 ? "+" : "") + v);
    set("cp-int", p.intensity, "cp-int-val", String);
  }

  /* Minimal fallback, used only if a page is missing the static markup. */
  function buildFallback() {
    fab = document.createElement("button");
    fab.className = "cp-fab";
    fab.id = "cp-fab";
    fab.type = "button";
    fab.setAttribute("aria-label", "Display settings");
    fab.innerHTML = '<span aria-hidden="true">Aa</span>';

    panel = document.createElement("div");
    panel.className = "cp-panel";
    panel.id = "cp-panel";
    panel.setAttribute("role", "dialog");
    panel.innerHTML = `
      <div class="cp-head"><h2>Display</h2>
        <button class="icon-btn" id="cp-close" type="button" aria-label="Close">&#10005;</button></div>
      <div class="cp-group"><label>Theme</label>
        <div class="seg" data-seg="theme">
          <button type="button" data-val="light" aria-pressed="true">White</button>
          <button type="button" data-val="dark" aria-pressed="false">Dark</button>
          <button type="button" data-val="auto" aria-pressed="false">Auto</button>
        </div></div>
      <div class="cp-group"><label for="cp-text">Text size <span class="cp-val" id="cp-text-val">100%</span></label>
        <div class="cp-slider"><input type="range" id="cp-text" min="85" max="150" step="5" value="100"></div></div>
      <div class="cp-group"><label>Accent colour</label>
        <div class="swatches">
          ${Object.keys(AX.prefs.ACCENTS)
            .map((k) => `<button type="button" class="swatch" data-accent="${k}" aria-pressed="false"
              aria-label="${AX.prefs.ACCENTS[k].name}" style="background:${AX.prefs.ACCENTS[k].l[0]}"></button>`)
            .join("")}
        </div></div>`;
    document.body.appendChild(fab);
    document.body.appendChild(panel);
  }

  function wire() {
    const open = () => {
      panel.classList.add("open");
      fab.setAttribute("aria-expanded", "true");
    };
    const close = () => {
      panel.classList.remove("open");
      fab.setAttribute("aria-expanded", "false");
    };
    const toggle = () => (panel.classList.contains("open") ? close() : open());

    fab.addEventListener("click", toggle);

    const closeBtn = document.getElementById("cp-close");
    if (closeBtn) closeBtn.addEventListener("click", close);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panel.classList.contains("open")) close();
    });

    panel.querySelectorAll(".seg").forEach((s) => {
      s.addEventListener("click", (e) => {
        const b = e.target.closest("button[data-val]");
        if (!b) return;
        const name = s.getAttribute("data-seg");
        const val = b.getAttribute("data-val");
        s.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", "false"));
        b.setAttribute("aria-pressed", "true");
        if (name === "reading") AX.prefs.set("reading", val === "on");
        else if (name === "toc") AX.prefs.set("toc", val === "on");
        else AX.prefs.set(name, val);
      });
    });

    const bind = (id, key, toValue, outId, fmt) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("input", () => {
        const v = toValue(Number(el.value));
        AX.prefs.set(key, v);
        const out = document.getElementById(outId);
        if (out) out.textContent = fmt(v);
      });
    };
    bind("cp-text", "textScale", (v) => v / 100, "cp-text-val", (v) => Math.round(v * 100) + "%");
    bind("cp-zoom", "zoom", (v) => v / 100, "cp-zoom-val", (v) => Math.round(v * 100) + "%");
    bind("cp-warm", "warmth", (v) => v, "cp-warm-val", (v) => (v > 0 ? "+" : "") + v);
    bind("cp-int", "intensity", (v) => v, "cp-int-val", (v) => String(v));

    panel.querySelectorAll(".swatch").forEach((sw) =>
      sw.addEventListener("click", () => {
        panel.querySelectorAll(".swatch").forEach((x) => x.setAttribute("aria-pressed", "false"));
        sw.setAttribute("aria-pressed", "true");
        AX.prefs.set("accent", sw.getAttribute("data-accent"));
      })
    );

    const reset = document.getElementById("cp-reset");
    if (reset)
      reset.addEventListener("click", () => {
        AX.prefs.reset();
        sync();
        close();
        fab.focus();
      });

    /* keep the panel truthful if prefs change from elsewhere (theme button) */
    document.addEventListener("ax:prefs", sync);
  }

  function mount() {
    fab = document.getElementById("cp-fab");
    panel = document.getElementById("cp-panel");
    if (!fab || !panel) buildFallback();
    sync();
    wire();
  }

  AX.panel = { mount, sync };
})();
