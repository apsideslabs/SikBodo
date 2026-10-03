/* ============================================================
   SikBodo — sound effects
   Tiny synthesised feedback tones built with the Web Audio API.
   No audio files, no dependencies, works offline. Referenced
   everywhere as AX.sfx.<name>().
   ============================================================ */

(function () {
  const AX = (window.AX = window.AX || {});

  let ctx = null;
  let enabled = true;
  try {
    const v = window.localStorage.getItem("sikbodo.sfx");
    if (v !== null) enabled = v === "1";
  } catch (e) {}

  function ac() {
    if (ctx) return ctx;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    try { ctx = new Ctx(); } catch (e) { ctx = null; }
    return ctx;
  }

  function tone(freq, dur, type, gain, when, slideTo) {
    const c = ac();
    if (!c) return;
    const t0 = c.currentTime + (when || 0);
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(freq, t0);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain || 0.07, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g);
    g.connect(c.destination);
    o.start(t0);
    o.stop(t0 + dur + 0.03);
  }

  function play(fn) {
    if (!enabled) return;
    const c = ac();
    if (!c) return;
    if (c.state === "suspended") c.resume();
    try { fn(); } catch (e) {}
  }

  const api = {
    isEnabled: () => enabled,
    set(v) {
      enabled = !!v;
      try { window.localStorage.setItem("sikbodo.sfx", enabled ? "1" : "0"); } catch (e) {}
      document.dispatchEvent(new Event("ax:sfx"));
    },
    toggle() { api.set(!enabled); return enabled; },
    /* call on the first user gesture so the context is allowed to start */
    resume() { const c = ac(); if (c && c.state === "suspended") c.resume(); },

    tap()     { play(() => tone(440, 0.055, "triangle", 0.045)); },
    pop()     { play(() => tone(620, 0.09, "sine", 0.06, 0, 900)); },
    flip()    { play(() => tone(520, 0.07, "sine", 0.05, 0, 720)); },
    card()    { play(() => tone(360, 0.05, "square", 0.028)); },
    correct() { play(() => { tone(659, 0.1, "sine", 0.07); tone(880, 0.13, "sine", 0.07, 0.09); tone(1175, 0.18, "sine", 0.055, 0.19); }); },
    wrong()   { play(() => { tone(220, 0.2, "sawtooth", 0.045, 0, 130); }); },
    complete() { play(() => { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.16, "sine", 0.065, i * 0.1)); }); },
    level()   { play(() => { [659, 880, 1175, 1568].forEach((f, i) => tone(f, 0.2, "triangle", 0.065, i * 0.09)); }); },
  };

  AX.sfx = api;

  /* unlock the audio context on the first interaction */
  ["pointerdown", "keydown", "touchstart"].forEach((ev) =>
    document.addEventListener(ev, () => api.resume(), { once: true, passive: true })
  );
})();
