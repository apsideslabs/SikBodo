/* ============================================================
   SikBodo — install
   Offers "Install app" wherever the browser allows it, and gives
   iOS a manual route, because Safari never fires the install
   prompt.

   Chromium fires beforeinstallprompt when the app meets the
   installability criteria (manifest + service worker + served
   over HTTPS). We hold that event and replay it on the user's
   click — the prompt must come from a user gesture.

   Loaded after js/app.js.
   ============================================================ */

(function () {
  const AX = (window.AX = window.AX || {});
  const httpish = location.protocol === "http:" || location.protocol === "https:";

  let deferred = null;
  let installed = false;

  /* Set once the app is installed, or once the reader turns the banner down.
     Either way the invitation is not shown again. */
  const HIDE_KEY = "sikbodo.install.hidden";

  function hiddenForGood() {
    try {
      return localStorage.getItem(HIDE_KEY) === "1";
    } catch (e) {
      return false; // private mode — the banner behaves as un-dismissed
    }
  }

  function hideForGood() {
    try {
      localStorage.setItem(HIDE_KEY, "1");
    } catch (e) {
      /* ignore */
    }
  }

  const isStandalone = () =>
    (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
    window.navigator.standalone === true;

  const isIOS = () =>
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  /* One codebase, two feels: stamp the display mode on <html> so the CSS can
     trim the website chrome when the page is running as an installed app. */
  try {
    document.documentElement.setAttribute("data-display", isStandalone() ? "standalone" : "browser");
  } catch (e) {
    /* no document yet — the attribute is a progressive enhancement */
  }

  function buttons() {
    return Array.from(document.querySelectorAll("[data-install-app]"));
  }

  function banners() {
    return Array.from(document.querySelectorAll("[data-install-banner]"));
  }

  function paint() {
    const canPrompt = !!deferred;
    const standalone = isStandalone() || installed;

    /* The banner is shown only when installing is actually possible, and never
       in the installed app, after an install, or after a dismissal. */
    const offerable = !standalone && !hiddenForGood() && (canPrompt || isIOS());
    banners().forEach((el) => {
      el.hidden = !offerable;
    });

    buttons().forEach((btn) => {
      if (standalone) {
        btn.hidden = true;
        return;
      }
      // show the button when the browser can prompt, or on iOS where
      // we can still explain the manual route
      btn.hidden = !(canPrompt || isIOS());
      btn.textContent = canPrompt ? "Install app" : "Add to Home Screen";
    });
  }

  function setStatus(text, kind) {
    const el = document.getElementById("cp-app-status");
    if (!el) return;
    el.textContent = text || "";
    el.dataset.kind = kind || "";
  }

  async function install(btn) {
    if (deferred) {
      deferred.prompt();
      let choice = null;
      try {
        choice = await deferred.userChoice;
      } catch (e) {
        /* older browsers resolve nothing; carry on */
      }
      deferred = null;
      paint();
      if (choice && choice.outcome === "accepted") {
        installed = true;
        hideForGood(); // accepted — do not wait for appinstalled to retire the banner
        setStatus("Installing — SikBodo will appear on your home screen.", "ok");
      } else {
        setStatus("Install cancelled. You can try again any time.", "");
      }
      return;
    }

    if (isIOS()) {
      setStatus(
        "On iPhone or iPad: tap Share, then “Add to Home Screen”.",
        "ok"
      );
      if (btn) btn.hidden = true;
      return;
    }

    setStatus(
      "Your browser does not offer app installation. Use the browser menu’s “Install” or “Add to Home screen”.",
      "warn"
    );
  }

  function init() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault(); // keep the mini-infobar away; we show our own
      deferred = e;
      paint();
    });

    window.addEventListener("appinstalled", () => {
      installed = true;
      deferred = null;
      hideForGood(); // installed — the invitation has done its job
      paint();
      setStatus("SikBodo is installed. Open it from your home screen or app list.", "ok");
    });

    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-install-app]");
      if (btn) {
        e.preventDefault();
        install(btn);
        return;
      }

      const dismiss = e.target.closest("[data-install-dismiss]");
      if (dismiss) {
        e.preventDefault();
        hideForGood();
        paint();
      }
    });

    paint();
  }

  AX.install = {
    prompt: () => install(null),
    get available() {
      return !!deferred;
    },
    get standalone() {
      return isStandalone() || installed;
    },
    get dismissed() {
      return hiddenForGood();
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
