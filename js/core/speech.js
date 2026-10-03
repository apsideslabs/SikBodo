/* ============================================================
   SikBodo — speech
   Pronunciation playback with the browser's built-in speech
   synthesis. Bodo has no dedicated voice, so the platform asks
   for an Indic voice (Hindi reads Devanagari reasonably) and
   falls back to the system default. No files, no dependencies.
   Referenced as AX.speech.<...>.
   ============================================================ */

(function () {
  const AX = (window.AX = window.AX || {});
  const synth = window.speechSynthesis || null;

  let voices = [];
  let on = true;
  try {
    const v = window.localStorage.getItem("sikbodo.voice");
    if (v !== null) on = v === "1";
  } catch (e) {}

  function load() {
    if (!synth) return;
    try { voices = synth.getVoices() || []; } catch (e) { voices = []; }
  }
  load();
  if (synth && synth.addEventListener) synth.addEventListener("voiceschanged", load);

  function pickVoice() {
    if (!voices.length) load();
    if (!voices.length) return null;
    const pref = ["hi", "bn", "ne", "mr", "as", "or", "ta", "te", "gu", "pa"];
    for (const p of pref) {
      const v = voices.find((x) => (x.lang || "").toLowerCase().startsWith(p));
      if (v) return v;
    }
    return voices.find((x) => /^en/i.test(x.lang || "")) || voices[0];
  }

  function speak(text, opts) {
    if (!synth || !on || !text) return false;
    opts = opts || {};
    try {
      synth.cancel();
      const u = new SpeechSynthesisUtterance(String(text));
      const v = pickVoice();
      if (v) u.voice = v;
      u.lang = (v && v.lang) || "hi-IN";
      u.rate = opts.rate || 0.85;
      u.pitch = 1;
      u.volume = 1;
      synth.speak(u);
      return true;
    } catch (e) {
      return false;
    }
  }

  /* a small speaker button; clicks are handled by delegation below */
  function button(text, label, cls) {
    const t = String(text == null ? "" : text).replace(/"/g, "&quot;");
    return (
      '<button type="button" class="speak-btn ' + (cls || "") + '" data-speak="' + t + '" ' +
      'aria-label="Play pronunciation of ' + t + '" title="Hear it">' +
      '<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-volume"></use></svg></button>'
    );
  }

  AX.speech = {
    speak,
    button,
    available: () => !!synth,
    isEnabled: () => on,
    setEnabled(v) {
      on = !!v;
      try { window.localStorage.setItem("sikbodo.voice", on ? "1" : "0"); } catch (e) {}
      if (!on && synth) try { synth.cancel(); } catch (e) {}
    },
    toggle() { AX.speech.setEnabled(!on); return on; },
  };

  /* one delegated listener, so buttons added later still work */
  document.addEventListener("click", (e) => {
    const b = e.target.closest && e.target.closest("[data-speak]");
    if (!b) return;
    e.preventDefault();
    e.stopPropagation();
    if (AX.sfx) AX.sfx.tap();
    speak(b.getAttribute("data-speak"));
  });
})();
