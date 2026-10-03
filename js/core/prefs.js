/* ============================================================
   SikBodo — display preferences
   The single source of truth for how the platform looks and reads.
   ============================================================ */

(function () {
  const AX = (window.AX = window.AX || {});

  const KEY = "prefs";

  const DEFAULTS = {
    theme: "light",
    reading: false,
    font: "sans",
    textScale: 1,
    zoom: 1,
    warmth: 0,
    intensity: 45,
    accent: "green",
    contrast: "normal",
    toc: true,
  };

  /* Crafted studio accent palettes: [brand, brand-ink, brand-soft] */
  const ACCENTS = {
    indigo: { name: "Electric Indigo", l: ["#4338ca", "#312e81", "#eef2ff"], d: ["#818cf8", "#a5b4fc", "rgba(129,140,248,0.15)"] },
    teal:   { name: "Emerald Teal",    l: ["#0d9488", "#0f766e", "#ccfbf1"], d: ["#2dd4bf", "#5eead4", "rgba(45,212,191,0.15)"] },
    rose:   { name: "Coral Rose",      l: ["#e11d48", "#be123c", "#ffe4e6"], d: ["#fb7185", "#fda4af", "rgba(251,113,133,0.15)"] },
    amber:  { name: "Sunburst Gold",   l: ["#d97706", "#b45309", "#fef3c7"], d: ["#fbbf24", "#fcd34d", "rgba(251,191,36,0.15)"] },
    violet: { name: "Royal Violet",    l: ["#7c3aed", "#5b21b6", "#f3e8ff"], d: ["#a78bfa", "#c4b5fd", "rgba(167,139,250,0.15)"] },
    green:  { name: "Bodo Green",       l: ["#48871c", "#2f5e10", "#eef7e3"], d: ["#8fce4f", "#b6e07a", "rgba(143,206,79,0.15)"] },
  };

  let current = Object.assign({}, DEFAULTS, AX.store.get(KEY, {}));

  function isDark() {
    if (current.theme === "dark") return true;
    if (current.theme === "auto") {
      return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  }

  function apply() {
    const root = document.documentElement;
    const dark = isDark();

    root.setAttribute("data-theme", dark ? "dark" : "light");
    root.setAttribute("data-reading", current.reading ? "on" : "off");
    root.setAttribute("data-font", current.font);
    root.setAttribute("data-contrast", current.contrast);

    const a = ACCENTS[current.accent] || ACCENTS.indigo;
    const set = dark ? a.d : a.l;
    root.style.setProperty("--brand", set[0]);
    root.style.setProperty("--brand-ink", set[1]);
    root.style.setProperty("--brand-soft", set[2]);

    root.style.setProperty("--text-scale", current.textScale);
    root.style.setProperty("--zoom", current.zoom);

    const strength = (Math.abs(current.warmth) / 100) * (current.intensity / 100) * 0.28;
    root.style.setProperty("--warm-color", current.warmth >= 0 ? "#ff8a3d" : "#3d7bff");
    root.style.setProperty("--warm-opacity", strength.toFixed(3));

    document.documentElement.setAttribute("data-toc", current.toc ? "on" : "off");
    AX.store.set(KEY, current);
  }

  function set(key, value) {
    current[key] = value;
    apply();
    document.dispatchEvent(new CustomEvent("ax:prefs", { detail: { key, value, prefs: get() } }));
  }

  function setMany(patch) {
    Object.assign(current, patch);
    apply();
    document.dispatchEvent(new CustomEvent("ax:prefs", { detail: { key: "*", value: null, prefs: get() } }));
  }

  function reset() {
    current = Object.assign({}, DEFAULTS);
    apply();
    document.dispatchEvent(new CustomEvent("ax:prefs", { detail: { key: "*", value: null, prefs: get() } }));
  }

  function get() { return Object.assign({}, current); }

  if (window.matchMedia) {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => { if (current.theme === "auto") apply(); };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  AX.prefs = { DEFAULTS, ACCENTS, get, set, setMany, reset, apply, isDark };
})();
