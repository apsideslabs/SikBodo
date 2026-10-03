/* ============================================================
   SikBodo — motion & tactile sound engine (AX.sfx)
   1. Entrance reveal & count-up animations (honours reduced motion)
   2. Zero-dependency Web Audio synthesizer for smooth UI taps,
      card interactions, copy/bookmark chimes, and distinct
      Quiz correct / wrong / completion sounds.
   ============================================================ */

(function () {
  const AX = (window.AX = window.AX || {});

  /* ---------------------------------------------------------- TACTILE AUDIO ENGINE (AX.sfx) */
  const SFX_KEY = "ax:sfx";
  let audioCtx = null;

  function isEnabled() {
    try {
      return localStorage.getItem(SFX_KEY) !== "off";
    } catch (e) {
      return true;
    }
  }

  function setEnabled(on) {
    try {
      localStorage.setItem(SFX_KEY, on ? "on" : "off");
    } catch (e) {}
    document.dispatchEvent(new CustomEvent("ax:sfx", { detail: { enabled: on } }));
  }

  function getCtx() {
    if (!isEnabled()) return null;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!audioCtx) {
      try {
        audioCtx = new Ctx();
      } catch (e) {
        return null;
      }
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function playTone(opts) {
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime + (opts.delay || 0);
    const dur = opts.duration || 0.04;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = opts.type || "sine";
    osc.frequency.setValueAtTime(opts.freq || 400, now);
    if (opts.endFreq) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, opts.endFreq), now + dur);
    }

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(opts.cutoff || 1800, now);

    const peak = opts.gain || 0.05;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(peak, now + Math.min(0.006, dur * 0.2));
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + dur + 0.01);
  }

  const sfx = {
    isEnabled,
    setEnabled,
    toggle() {
      const next = !isEnabled();
      setEnabled(next);
      if (next) sfx.tap();
      return next;
    },

    /* Soft acoustic felt/wood tap for buttons, links, and controls */
    tap() {
      playTone({ type: "sine", freq: 440, endFreq: 170, duration: 0.032, gain: 0.045, cutoff: 1400 });
    },

    /* Warm resonant marimba tap for cards, glyphs, number cells, and accordions */
    card() {
      playTone({ type: "triangle", freq: 520, endFreq: 240, duration: 0.042, gain: 0.05, cutoff: 1600 });
    },

    /* Crisp upward 2-note chime for copying phrases or starring dictionary words */
    pop() {
      playTone({ type: "sine", freq: 587.33, endFreq: 620, duration: 0.055, gain: 0.05, cutoff: 2200, delay: 0 });
      playTone({ type: "sine", freq: 880.0, endFreq: 920, duration: 0.085, gain: 0.055, cutoff: 2400, delay: 0.042 });
    },

    /* Airy upward inflection for flipping flashcards */
    flip() {
      playTone({ type: "sine", freq: 340, endFreq: 540, duration: 0.055, gain: 0.048, cutoff: 1800 });
    },

    /* Uplifting harmonic major-triad chime for Quiz CORRECT answers */
    correct() {
      playTone({ type: "sine", freq: 523.25, duration: 0.11, gain: 0.07, cutoff: 2600, delay: 0 });      // C5
      playTone({ type: "sine", freq: 659.25, duration: 0.13, gain: 0.075, cutoff: 2800, delay: 0.065 }); // E5
      playTone({ type: "triangle", freq: 783.99, duration: 0.24, gain: 0.08, cutoff: 3000, delay: 0.13 }); // G5
    },

    /* Soft, low two-tone descending cue for Quiz WRONG answers */
    wrong() {
      playTone({ type: "triangle", freq: 260, endFreq: 220, duration: 0.11, gain: 0.07, cutoff: 750, delay: 0 });
      playTone({ type: "triangle", freq: 196, endFreq: 155, duration: 0.18, gain: 0.075, cutoff: 650, delay: 0.095 });
    },

    /* Celebratory 4-note arpeggio for completing a lesson or finishing a quiz round */
    complete() {
      playTone({ type: "sine", freq: 523.25, duration: 0.1, gain: 0.065, cutoff: 2600, delay: 0 });
      playTone({ type: "sine", freq: 659.25, duration: 0.1, gain: 0.065, cutoff: 2600, delay: 0.06 });
      playTone({ type: "sine", freq: 783.99, duration: 0.12, gain: 0.07, cutoff: 2800, delay: 0.12 });
      playTone({ type: "triangle", freq: 1046.5, duration: 0.28, gain: 0.08, cutoff: 3200, delay: 0.18 });
    },
  };

  AX.sfx = sfx;

  /* Global delegated sound listener for interactive elements across all 16 pages */
  let boundGlobalSfx = false;
  function bindGlobalSfx() {
    if (boundGlobalSfx) return;
    boundGlobalSfx = true;

    document.addEventListener(
      "click",
      (e) => {
        const t = e.target;
        if (!t || !t.closest) return;

        // Skip elements that trigger their own specialized sound (correct/wrong/pop/flip/complete/sfx-toggle)
        if (
          t.closest(
            ".mc-opt, #q-right, #q-wrong, #q-reveal, [data-done], .phrase-card, .dict-star, #ws-star-btn, #sfx-toggle"
          )
        ) {
          return;
        }

        // Card-like interactive surfaces get a warm marimba card tap
        if (
          t.closest(
            ".glyph, .num-cell, .home-module-card, .launch-tile, .dir-row, .sn-btn, details.lesson > summary, details.faq > summary, .link-card"
          )
        ) {
          sfx.card();
          return;
        }

        // Standard buttons, nav links, segments, swatches, and toggles get a crisp felt tap
        if (
          t.closest(
            "button, .btn, .icon-btn, .nav-toggle, .seg button, .swatch, .header-nav a, .sidebar nav a, .mobile-nav a, .hud-pill, .sec-link, .pillar-links a"
          )
        ) {
          sfx.tap();
        }
      },
      { passive: true }
    );
  }

  /* ---------------------------------------------------------- ENTRANCE & COUNT-UP MOTION */
  const SELECTOR = [
    ".card", ".dialogue", ".level-block", ".ref-block", ".note-card",
    ".resource", ".section", ".stat", ".grid > *", ".btn-row",
    ".glyph-grid", ".num-grid", ".tr-panel", ".quiz-stage",
  ].join(", ");

  const reduced = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function reveal() {
    if (reduced()) return;

    const all = Array.from(document.querySelectorAll("#page-body " + SELECTOR));
    if (!all.length) return;

    const set = new Set(all);
    const top = all.filter((n) => {
      let p = n.parentElement;
      while (p) { if (set.has(p)) return false; p = p.parentElement; }
      return true;
    });

    top.forEach((n, i) => {
      n.classList.add("reveal");
      n.style.setProperty("--reveal-delay", Math.min(i % 6, 5) * 55 + "ms");
    });

    if (!("IntersectionObserver" in window)) {
      top.forEach((n) => n.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 }
    );

    top.forEach((n) => io.observe(n));
  }

  function countUp() {
    const nums = Array.from(document.querySelectorAll("#page-body .stat .num"));
    if (!nums.length || reduced()) return;

    nums.forEach((el) => {
      const target = parseInt(el.textContent.replace(/[^0-9]/g, ""), 10);
      if (!Number.isFinite(target) || target === 0) return;
      el.textContent = "0";

      const start = performance.now();
      const duration = 720;
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = String(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = String(target);
      };
      requestAnimationFrame(step);
    });
  }

  function init() {
    bindGlobalSfx();
    reveal();
    countUp();
  }

  AX.motion = { reveal, countUp, init };
})();
