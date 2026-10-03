/* ============================================================
   SikBodo — boot
   Loaded last. Applies saved display preferences before first
   paint, mounts the chrome, then renders the page for the
   data-page value on <body>.
   ============================================================ */

(function () {
  const AX = (window.AX = window.AX || {});

  const PAGES = {
    home: () => AX.render.home(),
    lessons: () => AX.render.lessons(),
    progress: () => AX.render.progress(),
    script: () => AX.render.script(),
    grammar: () => AX.render.grammar(),
    verbs: () => AX.render.verbs(),
    numbers: () => AX.render.numbers(),
    dictionary: () => AX.render.dictionary(),
    phrases: () => AX.render.phrases(),
    conversations: () => AX.render.conversations(),
    quiz: () => AX.tools.quiz(),
    translator: () => AX.tools.translator(),
    reading: () => AX.render.reading(),
    idioms: () => AX.render.idioms(),
    culture: () => AX.render.culture(),
    resources: () => AX.render.resources(),
    contribute: () => AX.render.contribute(),
    about: () => AX.render.about(),
  };

  function boot() {
    const page = document.body.getAttribute("data-page") || "";

    // 1. icons must exist before anything renders markup that uses them
    AX.icons.inject();

    // 1b. record today's visit and roll the day-streak forward
    if (AX.store && AX.store.visit) AX.store.visit.touch();

    // 2. preferences are already applied by js/core/prefs.js at parse time;
    //    re-apply once the document is ready so the theme toggle reflects state
    AX.prefs.apply();

    // 3. chrome, navigation and the display panel
    AX.chrome.mount(page);
    AX.sidebar.mount(page);
    AX.mobilenav.mount(page);
    AX.panel.mount();

    // 4. page content
    const render = PAGES[page];
    if (render) {
      try {
        render();
      } catch (err) {
        console.error("[SikBodo] Failed to render page:", page, err);
        const host = document.getElementById("page-body");
        if (host) {
          host.innerHTML =
            '<div class="callout danger"><div class="callout-title">This page could not be rendered</div>' +
            "<p>Something went wrong while building the content. Reload the page, or report it at the repository.</p></div>";
        }
      }
    }

    // 5. on-this-page column is built from the rendered headings
    AX.toc.mount();

    // 6. entrance animation and stat count-up (no-op under reduced motion)
    AX.motion.init();

    document.documentElement.setAttribute("data-booted", "true");

    // 7. release the launch splash (installed app only; a no-op elsewhere)
    if (AX.splash && AX.splash.finish) AX.splash.finish();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
