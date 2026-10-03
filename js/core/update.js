/* ============================================================
   SikBodo — updates
   Registers the service worker, watches for a newer release, and
   drives the update banner plus the "App & updates" controls in
   the display panel.

   Two independent signals are used, because either one can fire
   on its own:

     1. version.json — the running version against what the server
        is serving. This works even on a first visit, with no
        service worker yet.
     2. the service worker's own update lifecycle — a new worker
        installs in the background when sw.js changes.

   Loaded after js/app.js. Safe on file://, where it simply does
   nothing (service workers and fetches of version.json both need
   an origin).
   ============================================================ */

(function () {
  const AX = (window.AX = window.AX || {});
  const META = (window.SKB && window.SKB.meta) || {};
  const VERSION = META.version || "0";
  const REPO = META.repo || "https://github.com/apsideslabs/SikBodo";
  const CHECK_EVERY = 30 * 60 * 1000; // re-check at most this often

  const httpish = location.protocol === "http:" || location.protocol === "https:";

  const state = { checking: false, lastCheck: 0, latest: null, waiting: null, dismissed: null };

  /* ---------- version comparison ---------- */

  function cmp(a, b) {
    const pa = String(a).split(".").map((n) => parseInt(n, 10) || 0);
    const pb = String(b).split(".").map((n) => parseInt(n, 10) || 0);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      const x = pa[i] || 0;
      const y = pb[i] || 0;
      if (x !== y) return x < y ? -1 : 1;
    }
    return 0;
  }

  /* ---------- the banner ---------- */

  function bannerEl() {
    return document.getElementById("update-banner");
  }

  function showBanner(info) {
    const el = bannerEl();
    if (!el) return;
    // stay dismissed for this version only — a later release shows again
    if (state.dismissed === info.version) return;

    const detail = el.querySelector("#ub-detail");
    const notes = el.querySelector("#ub-notes");
    if (detail) {
      detail.textContent = info.released
        ? "SikBodo " + info.version + " was released on " + info.released + "."
        : "SikBodo " + info.version + " is ready to install.";
    }
    if (notes) {
      if (info.notes) {
        notes.href = info.notes;
        notes.hidden = false;
      } else {
        notes.hidden = true;
      }
    }
    el.hidden = false;
  }

  function hideBanner() {
    const el = bannerEl();
    if (el) el.hidden = true;
  }

  /* ---------- the check ---------- */

  async function check(opts) {
    const manual = !!(opts && opts.manual);
    if (state.checking) return { status: "busy" };
    if (!httpish) {
      setStatus(manual ? "Update checks need the published site (they do not run from file://)." : "");
      return { status: "unsupported" };
    }

    state.checking = true;
    setStatus("Checking…");

    try {
      const res = await fetch("version.json?t=" + Date.now(), { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      state.latest = data;
      state.lastCheck = Date.now();

      if (cmp(data.version, VERSION) > 0) {
        showBanner(data);
        setStatus("Update available — v" + data.version + ". Reload to update.", "update");
        return { status: "update", version: data.version };
      }

      hideBanner();
      setStatus("You're up to date — v" + VERSION + ".", "ok");
      return { status: "current", version: VERSION };
    } catch (err) {
      setStatus("Couldn't reach the update server. You're on v" + VERSION + ".", "warn");
      return { status: "error", error: String(err) };
    } finally {
      state.checking = false;
      paint();
    }
  }

  /* ---------- applying an update ---------- */

  // Resolve once the registration reports a worker that has installed and is
  // waiting to take over, or after `ms` with whatever we have by then.
  function waitForWaiting(reg, ms) {
    return new Promise((resolve) => {
      if (reg.waiting) return resolve(reg.waiting);
      let done = false;
      const finish = (worker) => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve(worker || null);
      };
      const timer = setTimeout(() => finish(reg.waiting), ms);
      const watch = (sw) => {
        if (!sw) return;
        if (sw.state === "installed") finish(reg.waiting || sw);
        else if (sw.state === "redundant") finish(null);
        else sw.addEventListener("statechange", () => watch(sw));
      };
      watch(reg.installing);
      reg.addEventListener("updatefound", () => watch(reg.installing));
    });
  }

  async function applyUpdate() {
    let reg = state.registration;
    if (!reg && navigator.serviceWorker) {
      try {
        reg = await navigator.serviceWorker.getRegistration();
      } catch (err) {
        reg = null;
      }
    }

    // The crucial step: make the browser check sw.js *now*. Without it a
    // deployed worker can stay undiscovered while version.json already
    // reports the new version — so the reload below would just serve the
    // old page back out of the cache, and the button would look dead.
    if (reg) {
      try {
        await reg.update();
      } catch (err) {
        /* offline, or no worker yet: fall through */
      }
    }

    let waiting = state.waiting || (reg && reg.waiting) || null;
    if (!waiting && reg) waiting = await waitForWaiting(reg, 5000);

    if (waiting) {
      // let the new worker take over, then reload onto the new cache
      let reloaded = false;
      const go = () => {
        if (reloaded) return;
        reloaded = true;
        location.reload();
      };
      navigator.serviceWorker.addEventListener("controllerchange", go);
      waiting.postMessage({ type: "SKIP_WAITING" });
      // if the swap is slow, reload anyway rather than hanging
      setTimeout(go, 3000);
    } else {
      // nothing to swap — the deployment did not change sw.js, so a plain
      // reload is all that is left
      location.reload();
    }
  }

  /* ---------- service worker ---------- */

  function registerSW() {
    if (!httpish || !("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("sw.js")
      .then((reg) => {
        state.registration = reg;
        // ask for a sw.js check now, rather than waiting for the browser's
        // own (throttled) schedule — otherwise a deployed update can sit
        // undiscovered while version.json already reports it
        try {
          reg.update();
        } catch (err) {
          /* older browsers: ignore */
        }
        if (reg.waiting && navigator.serviceWorker.controller) {
          state.waiting = reg.waiting;
          check({}); // learn which version it is, then show the banner
        }
        reg.addEventListener("updatefound", () => {
          const sw = reg.installing;
          if (!sw) return;
          sw.addEventListener("statechange", () => {
            if (sw.state === "installed" && navigator.serviceWorker.controller) {
              state.waiting = reg.waiting || sw;
              check({});
            }
          });
        });
      })
      .catch(() => {
        /* registration is a bonus; the site works without it */
      });
  }

  /* ---------- panel controls ---------- */

  function setStatus(text, kind) {
    const el = document.getElementById("cp-app-status");
    if (!el) return;
    el.textContent = text || "";
    el.dataset.kind = kind || "";
  }

  function paint() {
    const v = document.getElementById("cp-version");
    if (v) v.textContent = "v" + VERSION;
  }

  /* ---------- wire everything up ---------- */

  function init() {
    paint();

    const reload = document.getElementById("ub-reload");
    if (reload) reload.addEventListener("click", applyUpdate);

    const dismiss = document.getElementById("ub-dismiss");
    if (dismiss) {
      dismiss.addEventListener("click", () => {
        state.dismissed = (state.latest && state.latest.version) || null;
        hideBanner();
      });
    }

    const checkBtn = document.getElementById("cp-check");
    if (checkBtn) checkBtn.addEventListener("click", () => check({ manual: true }));

    // a first check on load, then at most one every half hour when the
    // tab is brought back into focus
    if (httpish) {
      check({});
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState !== "visible") return;
        // returning to the app is the moment to look for a new worker too
        if (state.registration) {
          try {
            state.registration.update();
          } catch (err) {
            /* ignore */
          }
        }
        if (Date.now() - state.lastCheck > CHECK_EVERY) check({});
      });
    }
  }

  AX.update = {
    check,
    apply: applyUpdate,
    version: VERSION,
    get state() {
      return state;
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      init();
      registerSW();
    });
  } else {
    init();
    registerSW();
  }
})();
