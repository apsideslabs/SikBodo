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
    const streak = AX.store.visit ? AX.store.visit.get().streak : 0;
    const R = 15, C = 2 * Math.PI * R;
    const off = (C * (1 - Math.min(100, r.levelPercent || 0) / 100)).toFixed(1);
    const title = `Level ${r.level} — ${r.title} · ${r.xp} XP${streak ? ` · ${streak}-day streak` : ""}`;
    return `<a class="hud" id="header-hud" href="progress.html" title="${title}" aria-label="${title}">
      <span class="hud-ring" aria-hidden="true">
        <svg viewBox="0 0 36 36">
          <circle class="hud-ring-bg" cx="18" cy="18" r="${R}" />
          <circle class="hud-ring-fg" cx="18" cy="18" r="${R}" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${off}" />
        </svg>
        <b class="hud-lvl">${r.level}</b>
      </span>
      <span class="hud-stack">
        <span class="hud-xp">${icon("zap")}<b>${r.xp}</b><i>XP</i></span>
        <span class="hud-streak${streak ? " is-on" : ""}">${icon("flame")}<b>${streak}</b><i>day${streak === 1 ? "" : "s"}</i></span>
      </span>
    </a>`;
  }

  function header(page) {
    const meta = window.SKB.meta;
    return `
      <div class="bar">
        <a class="brand" href="index.html" aria-label="${meta.name} — home">
          <svg class="brand-logo" viewBox="0 0 511.8 122" width="511.8" height="122" role="img" aria-label="SikBodo" focusable="false"><g transform="translate(0 11) scale(0.19531)"><rect width="512" height="512" rx="116" fill="#48871c"/><g fill="none" stroke="#eaf7dc" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"><path d="M256 432 L256 258"/></g><g fill="#eaf7dc"><path d="M256 306 C188 312 152 268 148 210 C208 212 246 254 256 306 Z"/><path d="M256 272 C324 278 360 234 364 176 C304 178 266 220 256 272 Z"/><path d="M256 234 C232 178 246 120 256 96 C266 120 280 178 256 234 Z"/></g></g><g transform="translate(130 95) scale(0.1 -0.1)" fill="currentColor"><path transform="translate(0.0 0)" d="M280 -11Q193 -11 130.5 17.5Q68 46 16 104L118 205Q152 166 193.5 144.5Q235 123 290 123Q340 123 367.5 141.0Q395 159 395 191Q395 220 377.0 238.0Q359 256 329.5 269.0Q300 282 264.5 294.0Q229 306 194.0 321.5Q159 337 129.5 360.5Q100 384 82.0 419.5Q64 455 64 509Q64 574 95.5 621.0Q127 668 183.0 692.5Q239 717 312 717Q386 717 447.5 691.0Q509 665 549 620L447 519Q415 552 382.5 568.0Q350 584 309 584Q268 584 244.0 568.5Q220 553 220 524Q220 497 238.0 480.5Q256 464 285.5 452.0Q315 440 350.5 428.0Q386 416 421.0 400.0Q456 384 485.5 359.5Q515 335 533.0 297.5Q551 260 551 205Q551 104 479.0 46.5Q407 -11 280 -11Z"/><path transform="translate(583.0 0)" d="M54 0V486H207V0ZM131 553Q95 553 71.5 577.5Q48 602 48 637Q48 673 71.5 697.0Q95 721 131 721Q167 721 190.0 697.0Q213 673 213 637Q213 602 190.0 577.5Q167 553 131 553Z"/><path transform="translate(844.0 0)" d="M365 0 195 252 364 486H535L331 223L336 286L545 0ZM54 0V726H207V0Z"/><path transform="translate(1390.0 0)" d="M188 0V122H354Q400 122 426.0 149.0Q452 176 452 215Q452 242 440.0 263.0Q428 284 406.5 296.0Q385 308 354 308H188V427H341Q380 427 404.0 446.5Q428 466 428 506Q428 545 404.0 564.5Q380 584 341 584H188V706H371Q439 706 486.5 681.0Q534 656 559.0 614.0Q584 572 584 521Q584 456 542.0 411.0Q500 366 418 349L422 402Q511 385 559.5 333.0Q608 281 608 205Q608 147 579.5 100.5Q551 54 497.5 27.0Q444 0 369 0ZM68 0V706H223V0Z"/><path transform="translate(2031.0 0)" d="M288 -11Q213 -11 152.5 22.5Q92 56 57.0 114.0Q22 172 22 244Q22 316 57.0 373.0Q92 430 152.0 463.5Q212 497 288 497Q364 497 424.0 464.0Q484 431 519.0 373.5Q554 316 554 244Q554 172 519.0 114.0Q484 56 424.0 22.5Q364 -11 288 -11ZM288 128Q321 128 346.0 142.5Q371 157 384.5 183.5Q398 210 398 244Q398 278 384.0 303.5Q370 329 345.5 343.5Q321 358 288 358Q256 358 231.0 343.5Q206 329 192.0 303.0Q178 277 178 243Q178 210 192.0 183.5Q206 157 231.0 142.5Q256 128 288 128Z"/><path transform="translate(2607.0 0)" d="M261 -10Q192 -10 138.5 23.0Q85 56 54.5 113.0Q24 170 24 243Q24 316 54.5 373.0Q85 430 138.5 463.0Q192 496 261 496Q311 496 351.5 477.0Q392 458 418.5 424.5Q445 391 448 348V143Q445 100 419.0 65.5Q393 31 352.0 10.5Q311 -10 261 -10ZM288 128Q321 128 345.0 142.5Q369 157 383.0 183.0Q397 209 397 243Q397 277 383.5 302.5Q370 328 345.5 343.0Q321 358 289 358Q257 358 232.5 343.0Q208 328 193.5 302.0Q179 276 179 243Q179 210 193.0 184.0Q207 158 232.0 143.0Q257 128 288 128ZM541 0H391V131L414 249L388 367V726H541Z"/><path transform="translate(3202.0 0)" d="M288 -11Q213 -11 152.5 22.5Q92 56 57.0 114.0Q22 172 22 244Q22 316 57.0 373.0Q92 430 152.0 463.5Q212 497 288 497Q364 497 424.0 464.0Q484 431 519.0 373.5Q554 316 554 244Q554 172 519.0 114.0Q484 56 424.0 22.5Q364 -11 288 -11ZM288 128Q321 128 346.0 142.5Q371 157 384.5 183.5Q398 210 398 244Q398 278 384.0 303.5Q370 329 345.5 343.5Q321 358 288 358Q256 358 231.0 343.5Q206 329 192.0 303.0Q178 277 178 243Q178 210 192.0 183.5Q206 157 231.0 142.5Q256 128 288 128Z"/></g></svg>
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
