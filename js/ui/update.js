/* ============================================================
   SikBodo — install & update notice
   The interface shown ONLY when the platform is running as an
   installed app (display-mode: standalone / fullscreen / iOS
   home-screen). On the plain website this module does nothing
   except register the service worker, so the update notice never
   interrupts a casual reader.

   Three things it can report:
     1. a waiting service worker  → "a new version is ready, reload"
     2. version.json              → a newer release has been deployed
     3. the GitHub release feed   → the newest release, with notes

   Checks 2 and 3 need the network; check 3 is a request to
   api.github.com and is rate-limited, so it runs on launch and on
   an explicit tap, never in a loop.
   ============================================================ */

(function () {
  const AX = (window.AX = window.AX || {});
  if (AX.update) return;

  const VERSION_URL = "version.json";
  const SW_URL = "sw.js";
  const RELEASES_API = "https://api.github.com/repos/apsideslabs/SikBodo/releases/latest";
  const RELEASES_PAGE = "https://github.com/apsideslabs/SikBodo/releases";
  const STORE_KEY = "sikbodo.update";

  const currentVersion = () =>
    (window.SKB && window.SKB.meta && window.SKB.meta.version) || "0.0.0";

  const icon = (n, c) => (AX.icons && AX.icons.icon ? AX.icons.icon(n, c) : "");

  /* ---- installed-app mode -------------------------------------
     One codebase, two feels. The browser tells us when the page is
     running as an installed app; we stamp that on <html> so the CSS and
     the header/footer builders can drop the website chrome and behave
     like a native shell. This runs at parse time, before app.js boots,
     so the header is built knowing which mode it is in. */
  const INSTALLED = isInstalled();
  AX.installed = INSTALLED;
  try {
    document.documentElement.setAttribute("data-display", INSTALLED ? "standalone" : "browser");
  } catch (err) {
    /* no document yet — the attribute is a progressive enhancement */
  }

  /* The website offers to install itself; the installed app never does.
     Chromium fires beforeinstallprompt; Safari does not, and falls back
     to the written hint in the footer. */
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    const btn = document.getElementById("install-app");
    const hint = document.getElementById("install-hint-text");
    if (btn) btn.hidden = false;
    if (hint) hint.hidden = true;
  });

  function isInstalled() {
    try {
      if (window.navigator.standalone === true) return true; // iOS home-screen
      if (!window.matchMedia) return false;
      return ["standalone", "fullscreen", "minimal-ui"].some(
        (m) => window.matchMedia("(display-mode: " + m + ")").matches
      );
    } catch (err) {
      return false;
    }
  }

  function parse(v) {
    return String(v == null ? "" : v)
      .replace(/^v/i, "")
      .split(".")
      .map((n) => parseInt(n, 10) || 0);
  }

  function isNewer(a, b) {
    const A = parse(a);
    const B = parse(b);
    for (let i = 0; i < 3; i++) {
      if ((A[i] || 0) > (B[i] || 0)) return true;
      if ((A[i] || 0) < (B[i] || 0)) return false;
    }
    return false;
  }

  function store() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    } catch (err) {
      return {};
    }
  }
  function save(patch) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(Object.assign(store(), patch)));
    } catch (err) {
      /* storage disabled: the notice simply will not remember dismissals */
    }
  }

  let banner = null;
  let fab = null;
  let waitingWorker = null;
  let reloading = false;
  let hideTimer = 0;

  /* ---------------------------------------------------------- UI */

  function mountUI() {
    if (fab) return;

    fab = document.createElement("button");
    fab.type = "button";
    fab.id = "asm-upd-fab";
    fab.className = "upd-fab on";
    fab.setAttribute("aria-label", "Check for updates");
    fab.innerHTML =
      icon("reset") +
      '<span class="upd-fab-label">Updates</span><span class="dot" aria-hidden="true"></span>';
    fab.addEventListener("click", () => check(true));
    document.body.appendChild(fab);

    banner = document.createElement("div");
    banner.id = "asm-upd-banner";
    banner.className = "upd-banner";
    banner.setAttribute("role", "status");
    banner.setAttribute("aria-live", "polite");
    banner.hidden = true;
    document.body.appendChild(banner);

    window.addEventListener("resize", measure);
  }

  function measure() {
    const h = banner && !banner.hidden ? banner.offsetHeight : 0;
    document.documentElement.style.setProperty("--upd-h", h + "px");
  }

  function openBanner() {
    if (!banner) return;
    banner.hidden = false;
    document.documentElement.classList.add("upd-open");
    requestAnimationFrame(measure);
  }

  function closeBanner() {
    if (!banner) return;
    banner.hidden = true;
    document.documentElement.classList.remove("upd-open");
    document.documentElement.style.setProperty("--upd-h", "0px");
  }

  function show(o) {
    if (!banner) return;
    clearTimeout(hideTimer);

    const tone = o.tone || "info";
    const ico = o.icon || (tone === "ok" ? "check" : tone === "warn" ? "alert" : "spark");

    const actions = (o.actions || [])
      .map(
        (a, i) =>
          '<button type="button" class="btn ' +
          (a.primary ? "primary" : "ghost") +
          ' small" data-act="' +
          i +
          '">' +
          (a.icon ? icon(a.icon) + " " : "") +
          a.label +
          "</button>"
      )
      .join("");

    banner.className = "upd-banner " + tone;
    banner.innerHTML =
      '<div class="upd-inner">' +
      '<span class="upd-ico">' +
      icon(ico) +
      "</span>" +
      '<span class="upd-text"><b></b><span></span></span>' +
      '<span class="upd-actions">' +
      actions +
      "</span>" +
      (o.dismissable === false
        ? ""
        : '<button type="button" class="upd-close" aria-label="Dismiss">&times;</button>') +
      "</div>";

    banner.querySelector(".upd-text b").textContent = o.title || "";
    banner.querySelector(".upd-text span").textContent = o.message || "";

    (o.actions || []).forEach((a, i) => {
      const btn = banner.querySelector('[data-act="' + i + '"]');
      if (btn) btn.addEventListener("click", a.onClick);
    });

    const x = banner.querySelector(".upd-close");
    if (x) x.addEventListener("click", () => { closeBanner(); setDot(false); });

    openBanner();
    if (o.autoHide) hideTimer = setTimeout(closeBanner, o.autoHide);
  }

  function setDot(on) {
    if (fab) fab.classList.toggle("has-new", !!on);
  }

  /* ---------------------------------------------------------- reporting */

  function announce(info, force) {
    setDot(true);
    if (!force && store().dismissed === info.version) return; // dismissed this one already

    const bits = [];
    if (info.version && info.version !== currentVersion()) bits.push("Version " + info.version);
    bits.push("You have " + currentVersion() + ".");

    const actions = [];
    if (info.pending || info.version) {
      actions.push({ label: "Reload now", primary: true, icon: "reset", onClick: reloadWithUpdate });
    }
    const link = info.url || RELEASES_PAGE;
    actions.push({
      label: info.url ? "What's new" : "Release notes",
      icon: "external",
      onClick: () => window.open(link, "_blank", "noopener")
    });

    show({
      tone: "info",
      title: info.title || "A new version of SikBodo is available",
      message: bits.join(" "),
      actions
    });
    save({ seen: info.version || "pending" });
  }

  function reloadWithUpdate() {
    if (waitingWorker) {
      reloading = true;
      waitingWorker.postMessage("SKIP_WAITING");
    } else {
      location.reload();
    }
  }

  /* ---------------------------------------------------------- checks */

  async function checkVersion() {
    const res = await fetch(VERSION_URL + "?t=" + Date.now(), { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    if (json && json.version && isNewer(json.version, currentVersion())) {
      return { version: json.version, title: "A new version of SikBodo is available" };
    }
    return null;
  }

  async function checkRelease() {
    const res = await fetch(RELEASES_API, {
      headers: { Accept: "application/vnd.github+json" },
      cache: "no-store"
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json && json.tag_name && isNewer(json.tag_name, currentVersion())) {
      return {
        version: String(json.tag_name).replace(/^v/i, ""),
        url: json.html_url,
        title: json.name || "New release: " + json.tag_name
      };
    }
    return null;
  }

  async function check(manual) {
    if (!isInstalled()) return;

    if (manual) {
      show({
        tone: "info",
        icon: "reset",
        title: "Checking for updates…",
        message: "Looking for a newer release.",
        actions: [],
        dismissable: false
      });
    }

    const results = await Promise.allSettled([checkVersion(), checkRelease()]);
    const found = results
      .filter((r) => r.status === "fulfilled" && r.value)
      .map((r) => r.value);

    const offline = results.every((r) => r.status === "rejected");

    if (found.length) {
      found.sort((a, b) => (isNewer(a.version, b.version) ? -1 : 1));
      announce(found[0], manual);
      return;
    }

    if (waitingWorker) {
      announce({ pending: true, title: "A new version of SikBodo is ready" }, manual);
      return;
    }

    if (manual) {
      if (offline) {
        show({
          tone: "warn",
          icon: "alert",
          title: "Could not check for updates",
          message: "You appear to be offline. SikBodo " + currentVersion() + " still works.",
          actions: [{ label: "Try again", icon: "reset", onClick: () => check(true) }]
        });
      } else {
        setDot(false);
        show({
          tone: "ok",
          icon: "check",
          title: "You're up to date",
          message: "SikBodo " + currentVersion() + " is the latest version.",
          actions: [],
          autoHide: 4500
        });
      }
    }
  }

  /* ---------------------------------------------------------- service worker */

  function markWaiting(worker) {
    waitingWorker = worker;
    if (isInstalled()) announce({ pending: true, title: "A new version of SikBodo is ready" }, false);
  }

  function registerSW() {
    if (!("serviceWorker" in navigator)) return;
    const secure =
      location.protocol === "https:" ||
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1";
    if (!secure) return; // file:// and plain http: nothing to do

    navigator.serviceWorker
      .register(SW_URL, { scope: "./" })
      .then((reg) => {
        if (reg.waiting && navigator.serviceWorker.controller) markWaiting(reg.waiting);
        reg.addEventListener("updatefound", () => {
          const nw = reg.installing;
          if (!nw) return;
          nw.addEventListener("statechange", () => {
            if (nw.state === "installed" && navigator.serviceWorker.controller) markWaiting(nw);
          });
        });
        /* look for a new worker on every launch */
        try { reg.update(); } catch (err) { /* ignore */ }
      })
      .catch(() => {});

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloading) location.reload();
    });
  }

  /* A one-time note, shown only in the installed app, telling the reader
     that this copy lives on their device and works offline. Dismissing it
     records the version, so it returns only after an upgrade. */
  function welcome() {
    let seen = false;
    try {
      seen = localStorage.getItem("sikbodo.appwelcome") === currentVersion();
    } catch (err) {
      seen = false;
    }
    if (seen) return;

    const head = document.querySelector("#content .page-head");
    if (!head) return;

    const card = document.createElement("div");
    card.className = "app-welcome";
    card.setAttribute("role", "status");
    card.innerHTML =
      `<span class="aw-icon">${icon("check")}</span>` +
      `<div class="aw-text"><strong>Installed app</strong> — SikBodo v${currentVersion()} runs from your device and works offline. ` +
      `Open it any time from your home screen; a new version is offered here whenever one is published.</div>` +
      `<button type="button" class="btn ghost small" id="aw-dismiss">Got it</button>`;
    head.insertAdjacentElement("afterend", card);

    const btn = card.querySelector("#aw-dismiss");
    if (btn) {
      btn.addEventListener("click", () => {
        try {
          localStorage.setItem("sikbodo.appwelcome", currentVersion());
        } catch (err) {
          /* private mode — the note simply shows again next time */
        }
        card.remove();
      });
    }
  }

  /* Wires the footer's install button. Only ever called on the website. */
  function wireInstall() {
    const btn = document.getElementById("install-app");
    if (!btn) return;
    if (deferredPrompt) {
      btn.hidden = false;
      const hint = document.getElementById("install-hint-text");
      if (hint) hint.hidden = true;
    }
    btn.addEventListener("click", async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      try {
        await deferredPrompt.userChoice;
      } catch (err) {
        /* the reader dismissed the browser prompt */
      }
      deferredPrompt = null;
      btn.hidden = true;
    });
  }

  function init() {
    registerSW();
    if (isInstalled()) {
      mountUI();
      welcome();
      check(false);
      return;
    }
    wireInstall(); // the website offers to install; the app never does
  }

  AX.update = {
    init,
    check: () => check(true),
    isInstalled,
    installed: INSTALLED,
    currentVersion
  };
})();
