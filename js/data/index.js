/* ============================================================
   SikBodo — content bundle entry point
   Loaded AFTER every js/data/*.js module and BEFORE js/app.js.
   Each module assigns onto window.SKB directly; this file only
   finalises the bundle and computes derived values, so the order
   of the individual modules does not matter.
   ============================================================ */

(function () {
  const B = (window.SKB = window.SKB || {});

  const REQUIRED = [
    "meta", "lessons", "dictionary", "phrases", "dialogues", "reading", "idioms",
    "script", "grammar", "verbs", "numbers", "culture", "resources", "contribute",
  ];

  const missing = REQUIRED.filter((k) => B[k] == null);
  if (missing.length) {
    // Loud but non-fatal: a missing module should be obvious during development.
    console.error(
      "[SikBodo] Content modules not loaded: " + missing.join(", ") +
      ". Check that every js/data/*.js file is included before js/data/index.js."
    );
  }

  /* Derived counts, so pages never hard-code them. */
  B.counts = {
    lessons: (B.lessons || []).length,
    words: (B.dictionary || []).length,
    phrases: (B.phrases || []).length,
    dialogues: (B.dialogues || []).length,
    dialogueLines: (B.dialogues || []).reduce((n, d) => n + (d.lines ? d.lines.length : 0), 0),
    passages: ((B.reading || {}).passages || []).length,
    grammarSections: ((B.grammar || {}).sections || []).length,
    vowels: ((B.script || {}).vowels || []).length,
    consonants: ((B.script || {}).consonants || []).length,
    verbs: (((B.verbs || {}).common || {}).rows || []).length,
    idioms: ((B.idioms || {}).idioms || []).length,
    proverbs: ((B.idioms || {}).proverbs || []).length,
    categories: [...new Set((B.dictionary || []).map((d) => d.cat))].length,
  };

  B.version = (B.meta || {}).version || "0.0.0";
})();
