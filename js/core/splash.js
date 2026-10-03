/* ============================================================
   SikBodo — launch splash gate
   Loaded in <head>, before the body paints, so a splash that has
   already been shown this session is suppressed with no flash.

   The splash itself is STATIC MARKUP on every page — never injected
   by script — so it paints on the very first frame. This file only
   decides whether it is allowed to appear, and how it goes away.

   The splash is for the installed app: the CSS shows it only under
   display-mode: standalone, or when js/core/install.js has stamped
   data-display="standalone" on <html> (which is how iOS is caught,
   since it has no display-mode media query).
   ============================================================ */

(function () {
  var d = document.documentElement;
  var KEY = "sikbodo.splash";
  var started = Date.now();
  var seen = false;

  try {
    seen = sessionStorage.getItem(KEY) === "1";
  } catch (e) {
    seen = false; // private mode — the splash simply shows again
  }
  if (seen) d.classList.add("splash-done");

  var AX = (window.AX = window.AX || {});

  AX.splash = {
    /* Called once the page has booted. The splash is held for a minimum beat
       so the animation reads as intentional rather than as a flicker, then it
       fades out and is removed. */
    finish: function () {
      var el = document.getElementById("splash");
      if (!el || seen) return;

      try {
        sessionStorage.setItem(KEY, "1");
      } catch (e) {
        /* ignore */
      }

      var wait = Math.max(0, 780 - (Date.now() - started));
      setTimeout(function () {
        el.classList.add("is-done");
        setTimeout(function () {
          d.classList.add("splash-done");
          if (el.parentNode) el.parentNode.removeChild(el);
        }, 420);
      }, wait);
    },
  };
})();
