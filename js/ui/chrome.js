/* ============================================================
   SikBodo — shared chrome
   Header with primary navigation, search, theme control,
   animated hamburger trigger, and institutional footer.
   ============================================================ */

(function () {
  const AX = (window.AX = window.AX || {});
  const icon = (n, c) => AX.icons.icon(n, c);

  const NAV = [
    {
      group: "Start here",
      items: [
        { href: "index.html", label: "Overview", key: "home", icon: "home" },
        { href: "lessons.html", label: "Lessons", key: "lessons", icon: "lessons" },
        { href: "script.html", label: "Script & sounds", key: "script", icon: "script" },
        { href: "progress.html", label: "Progress & study record", key: "progress", icon: "progress" },
      ],
    },
    {
      group: "Reference",
      items: [
        { href: "grammar.html", label: "Grammar", key: "grammar", icon: "grammar" },
        { href: "verbs.html", label: "Verbs", key: "verbs", icon: "verbs" },
        { href: "numbers.html", label: "Numbers & time", key: "numbers", icon: "numbers" },
        { href: "dictionary.html", label: "Dictionary", key: "dictionary", icon: "dictionary" },
        { href: "idioms.html", label: "Idioms & proverbs", key: "idioms", icon: "spark" },
      ],
    },
    {
      group: "Practice",
      items: [
        { href: "phrases.html", label: "Phrases", key: "phrases", icon: "phrases" },
        { href: "conversations.html", label: "Conversations", key: "conversations", icon: "conversations" },
        { href: "reading.html", label: "Reading & writing", key: "reading", icon: "library" },
        { href: "quiz.html", label: "Quiz", key: "quiz", icon: "quiz" },
        { href: "translator.html", label: "Translator", key: "translator", icon: "translator" },
      ],
    },
    {
      group: "Background",
      items: [
        { href: "culture.html", label: "Language & community", key: "culture", icon: "culture" },
        { href: "resources.html", label: "Resources", key: "resources", icon: "resources" },
        { href: "contribute.html", label: "Contribute", key: "contribute", icon: "contribute" },
        { href: "about.html", label: "About & sources", key: "about", icon: "about" },
      ],
    },
  ];

  const TOP_LINKS = [
    { href: "index.html", label: "Overview", key: "home" },
    { href: "lessons.html", label: "Lessons", key: "lessons" },
    { href: "script.html", label: "Script", key: "script" },
    { href: "grammar.html", label: "Grammar", key: "grammar" },
    { href: "dictionary.html", label: "Dictionary", key: "dictionary" },
    { href: "quiz.html", label: "Quiz", key: "quiz" },
    { href: "progress.html", label: "Progress", key: "progress" },
  ];

  const FLAT = NAV.reduce((acc, g) => acc.concat(g.items), []);

  function hudHTML() {
    const total = (window.SKB && window.SKB.lessons && window.SKB.lessons.length) || 15;
    const r = AX.store.progress.rank(total);
    return `<a class="hud-pill" id="header-hud" href="progress.html" title="Level ${r.level} ${r.title} · ${r.xp} XP">
      <span class="hud-lvl">Lv.${r.level}</span>
      <span class="hud-xp">${icon("star")} ${r.xp} XP</span>
    </a>`;
  }

  function header(page) {
    const meta = window.SKB.meta;
    return `
      <div class="bar">
        <a class="brand" href="index.html" aria-label="${meta.name} — home">
          <img class="brand-logo" src="assets/logo.svg" alt="" width="118" height="35" decoding="async">
        </a>

        <nav class="header-nav" aria-label="Primary navigation">
          ${TOP_LINKS.map(
            (l) =>
              `<a href="${l.href}"${l.key === page ? ' aria-current="page"' : ""}>${l.label}</a>`
          ).join("")}
        </nav>

        <div class="header-tools">
          ${hudHTML()}
          <form class="header-search" role="search" action="dictionary.html" method="get">
            <label class="visually-hidden" for="header-q">Search the dictionary</label>
            ${icon("search")}
            <input id="header-q" type="search" name="q" placeholder="Search words…" autocomplete="off">
            <kbd class="search-kbd" aria-hidden="true">/</kbd>
          </form>
          <button class="icon-btn" id="sfx-toggle" type="button" aria-label="Toggle sound effects" title="Toggle UI sound effects">${icon("volume")}</button>
          <button class="icon-btn" id="theme-toggle" type="button" aria-label="Switch theme">${icon("moon")}</button>
          <button class="nav-toggle" id="nav-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="sidebar">
            <span class="burger" aria-hidden="true">
              <i></i><i></i><i></i>
            </span>
            <span class="nav-toggle-lbl">Menu</span>
          </button>
        </div>
      </div>`;
  }

  function footer() {
    const meta = window.SKB.meta;
    return `
      <div class="inner">
        <div>
          <h3>${meta.name} <span class="ver">v${meta.version}</span></h3>
          <p style="margin:0 0 var(--sp-3);max-width:46ch;color:var(--ink-soft)">${meta.description}</p>
          <p style="margin:0;font-size:var(--fs-xs);color:var(--muted)">
            <span class="bo">${meta.nameBo}</span> · ${meta.license} licence · Built by ${meta.author}
          </p>
          ${meta.brand ? `<div class="maker-mark">
            <span class="maker-label">${meta.brand.label}</span>
            ${meta.brand.svg}
          </div>` : ""}
        </div>
        <div>
          <h3>Explore</h3>
          <ul>
            ${FLAT.slice(0, 7).map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}
          </ul>
        </div>
        <div>
          <h3>Project</h3>
          <ul>
            <li><a href="${meta.repo}">Source repository</a></li>
            <li><a href="contribute.html">Contribute</a></li>
            <li><a href="about.html">Accuracy &amp; sources</a></li>
            <li><a href="resources.html">Further reading</a></li>
            <li><a href="${meta.repo}/blob/main/CHANGELOG.md">Changelog</a></li>
            <li><a href="${meta.repo}/blob/main/SECURITY.md">Security</a></li>
          </ul>
        </div>
      </div>
      <div class="inner" style="grid-template-columns:1fr">
        <p class="fine">
          <strong>Accuracy.</strong> Bodo is a lower-resource language with several regional dialects and no single
          settled romanisation. This platform was compiled from public learner resources and published descriptions
          of Bodo grammar — not from native fluency. Where sources disagreed, the more widely repeated form was kept
          and uncertain items are flagged.
        </p>
      </div>`;
  }

  /* The install invitation. Like the header and footer, it is defined here —
     once for every page — rather than repeated in 19 documents. It does not
     need to paint before JavaScript, so there is no reason for it to be
     static markup. */
  function installBanner() {
    const meta = window.SKB.meta;
    return `
      <div class="install-banner" id="install-banner" data-install-banner role="region" aria-label="Install ${meta.name} as an app" hidden>
        <img class="install-banner-mark" src="assets/icon-192.png" alt="" width="56" height="56" loading="lazy" decoding="async">
        <div class="install-banner-copy">
          <p class="install-banner-title">Install ${meta.name} as an app</p>
          <p class="install-banner-text">Add it to your home screen — it opens full screen and keeps working offline.</p>
        </div>
        <div class="install-banner-actions">
          <button class="btn primary small" type="button" data-install-app hidden>Install app</button>
          <button class="icon-btn" type="button" data-install-dismiss aria-label="Dismiss the install suggestion">&#10005;</button>
        </div>
      </div>`;
  }

  function setDrawerState(open) {
    const sb = document.getElementById("sidebar");
    const toggle = document.getElementById("nav-toggle");
    const backdrop = document.getElementById("drawer-backdrop");
    if (!sb) return;

    sb.classList.toggle("open", open);
    document.body.classList.toggle("drawer-open", open);
    if (backdrop) backdrop.classList.toggle("open", open);

    if (toggle) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    }
  }

  function mount(page) {
    const h = document.getElementById("site-header");
    const f = document.getElementById("site-footer");
    if (h) { h.className = "site-header"; h.innerHTML = header(page); }
    if (f) {
      f.className = "site-footer";
      f.innerHTML = footer();

      // the install invitation sits directly above the footer
      if (!document.getElementById("install-banner")) {
        const wrap = document.createElement("div");
        wrap.className = "container";
        wrap.innerHTML = installBanner();
        f.parentNode.insertBefore(wrap, f);
      }
    }

    if (!document.getElementById("drawer-backdrop")) {
      const bd = document.createElement("div");
      bd.id = "drawer-backdrop";
      bd.className = "drawer-backdrop";
      bd.setAttribute("aria-hidden", "true");
      bd.addEventListener("click", () => setDrawerState(false));
      document.body.appendChild(bd);
    }

    document.addEventListener("ax:progress", () => {
      const oldHud = document.getElementById("header-hud");
      if (oldHud) oldHud.outerHTML = hudHTML();
    });

    const toggle = document.getElementById("nav-toggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        const sb = document.getElementById("sidebar");
        if (!sb) return;
        setDrawerState(!sb.classList.contains("open"));
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const sb = document.getElementById("sidebar");
        if (sb && sb.classList.contains("open")) {
          setDrawerState(false);
        }
      }
    });

    const sfxBtn = document.getElementById("sfx-toggle");
    if (sfxBtn) {
      const paintSfx = () => {
        const on = !AX.sfx || AX.sfx.isEnabled();
        sfxBtn.innerHTML = icon(on ? "volume" : "volume-off");
        sfxBtn.setAttribute("aria-label", on ? "Mute sound effects" : "Enable sound effects");
        sfxBtn.setAttribute("title", on ? "Sound effects: On (click to mute)" : "Sound effects: Muted (click to enable)");
      };
      paintSfx();
      sfxBtn.addEventListener("click", () => {
        if (AX.sfx) AX.sfx.toggle();
        paintSfx();
      });
      document.addEventListener("ax:sfx", paintSfx);
    }

    const theme = document.getElementById("theme-toggle");
    if (theme) {
      const paint = () => {
        const dark = AX.prefs.isDark();
        theme.innerHTML = icon(dark ? "sun" : "moon");
        theme.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      };
      paint();
      theme.addEventListener("click", () => {
        AX.prefs.set("theme", AX.prefs.isDark() ? "light" : "dark");
        paint();
      });
      document.addEventListener("ax:prefs", paint);
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = (document.activeElement && document.activeElement.tagName) || "";
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (document.activeElement && document.activeElement.isContentEditable)) {
          return;
        }
        const searchInput = document.getElementById("dict-search") || document.getElementById("phrase-search") || document.getElementById("header-q");
        if (searchInput && searchInput.offsetParent !== null) {
          e.preventDefault();
          searchInput.focus();
          searchInput.select();
        }
      }
    });
  }

  AX.chrome = { NAV, FLAT, mount, setDrawerState };
})();
