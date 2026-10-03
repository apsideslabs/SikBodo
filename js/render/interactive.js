/* ============================================================
   SikBodo — interactive tools
   The Practice Arena: an exercise engine with several modes,
   instant feedback, scoring and XP. Plus the Phrase Translator.
   ============================================================ */

(function () {
  const AX = (window.AX = window.AX || {});
  const B = window.SKB;
  const icon = (n, c) => AX.icons.icon(n, c);

  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const body = () => document.getElementById("page-body");
  const speakBtn = (text, cls) => (AX.speech ? AX.speech.button(text, text, cls) : "");
  const speak = (t) => { if (AX.speech) AX.speech.speak(t); };
  const isDevanagari = (s) => /[\u0900-\u097F]/.test(s || "");

  /* ---------------------------------------------------------- PRACTICE ARENA */
  function quiz() {
    const D = B.dictionary;
    const cats = [...new Set(D.map((d) => d.cat))].sort();
    const ROUND = 12;
    let scope = "all";

    const norm = (s) => String(s || "").toLowerCase().replace(/[\s\-'’.]/g, "");
    const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const sample = (arr, n) => shuffle(arr).slice(0, n);

    const MODES = [
      { id: "mixed",  icon: "spark",   name: "Mixed round",    desc: "A bit of everything — choice, listening and spelling." },
      { id: "choice", icon: "quiz",    name: "Multiple choice", desc: "Pick the right meaning, in both directions." },
      { id: "listen", icon: "volume",  name: "Listening",       desc: "Hear a word and choose what you heard." },
      { id: "type",   icon: "file",    name: "Spelling",        desc: "Type the romanisation for an English word." },
      { id: "flash",  icon: "lessons", name: "Flashcards",      desc: "Reveal the meaning and grade yourself." },
    ];

    function pool() { return scope === "all" ? D : D.filter((d) => d.cat === scope); }

    function build(type, w, p) {
      const others = sample(p.filter((x) => x.en !== w.en && x.bo !== w.bo), 3);
      if ((type === "choice-en" || type === "choice-bo" || type === "listen") && others.length < 3) return null;
      if (type === "choice-en") return { type, w, prompt: w.en, promptLang: "en", answer: w.bo, options: shuffle([w, ...others]).map((o) => ({ label: o.bo, ok: o.bo === w.bo })) };
      if (type === "choice-bo") return { type, w, prompt: w.bo, promptLang: "bo", answer: w.en, options: shuffle([w, ...others]).map((o) => ({ label: o.en, ok: o.en === w.en })) };
      if (type === "listen")    return { type, w, prompt: null, promptLang: "bo", answer: w.bo, options: shuffle([w, ...others]).map((o) => ({ label: o.bo, ok: o.bo === w.bo })) };
      if (type === "type")      return { type, w, prompt: w.en, promptLang: "en", answer: w.rom };
      if (type === "flash")     return { type, w, prompt: w.bo, promptLang: "bo", answer: w.en };
      return null;
    }

    function start(mode) {
      const p = pool();
      const words = sample(p, Math.min(ROUND, p.length));
      const qs = [];
      words.forEach((w, i) => {
        let t = mode;
        if (mode === "mixed") t = ["choice-en", "listen", "choice-bo", "type"][i % 4];
        else if (mode === "choice") t = i % 2 ? "choice-bo" : "choice-en";
        const q = build(t, w, p);
        if (q) qs.push(q);
      });
      render({ mode, qs, i: 0, score: 0, streak: 0, best: 0, answered: false, picked: null, revealed: false });
    }

    function startScreen() {
      body().innerHTML = `
        <div class="arena">
          <div class="arena-head">
            <span class="sec-kicker">PRACTICE ARENA</span>
            <h2>Learn by doing</h2>
            <p class="prose">A round is a short, scored set of exercises drawn from the dictionary. You answer, you get instant feedback, and you earn XP for what you get right. Pick a mode to begin.</p>
            <p class="arena-note">Pronunciation uses your browser's built-in speech. Bodo has no dedicated voice, so an Indic voice reads the Devanagari as an approximation — treat it as a memory aid, not a native model.</p>
          </div>
          <div class="mode-grid">
            ${MODES.map((m) => `<button type="button" class="mode-card" data-mode="${m.id}">
                <span class="mc-ic">${icon(m.icon)}</span>
                <strong>${esc(m.name)}</strong>
                <span>${esc(m.desc)}</span>
                <span class="mc-go">${icon("arrow")}</span>
              </button>`).join("")}
          </div>
          <div class="arena-scope">
            <label for="arena-cat">Words to practise</label>
            <select id="arena-cat">
              <option value="all">All categories (${D.length} words)</option>
              ${cats.map((c) => `<option value="${esc(c)}">${esc(c)}</option>`).join("")}
            </select>
          </div>
        </div>`;
      const sel = document.getElementById("arena-cat");
      sel.addEventListener("change", () => { scope = sel.value; });
      body().querySelectorAll("[data-mode]").forEach((b) =>
        b.addEventListener("click", () => { if (AX.sfx) AX.sfx.pop(); start(b.getAttribute("data-mode")); })
      );
    }

    function render(S) {
      if (S.i >= S.qs.length) return end(S);
      const q = S.qs[S.i];
      const pct = Math.round((S.i / S.qs.length) * 100);

      let promptHTML;
      if (q.type === "listen") {
        promptHTML = `<div class="aq-prompt aq-listen">
            <button type="button" class="play-big" data-speak="${esc(q.w.bo)}" aria-label="Play the word">${icon("volume")}</button>
            <span class="aq-hint">Tap to hear it, then choose the word you heard</span>
          </div>`;
      } else if (q.type === "flash") {
        promptHTML = `<div class="aq-prompt">
            <span class="aq-kicker">What does this mean?</span>
            <div class="aq-bo bo">${esc(q.prompt)} ${speakBtn(q.prompt)}</div>
            <div class="aq-rom">${esc(q.w.rom)}</div>
          </div>`;
      } else if (q.promptLang === "bo") {
        promptHTML = `<div class="aq-prompt">
            <span class="aq-kicker">What does this mean?</span>
            <div class="aq-bo bo">${esc(q.prompt)} ${speakBtn(q.prompt)}</div>
          </div>`;
      } else {
        promptHTML = `<div class="aq-prompt">
            <span class="aq-kicker">${q.type === "type" ? "Type the romanisation" : "Which is the Bodo for…"}</span>
            <div class="aq-en">${esc(q.prompt)}</div>
          </div>`;
      }

      let answerHTML;
      if (q.type === "type") {
        answerHTML = `<div class="aq-type">
            <input id="aq-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="type the romanisation…" aria-label="Your answer">
            <button class="btn primary" id="aq-check" type="button">Check ${icon("arrow")}</button>
          </div>`;
      } else if (q.type === "flash") {
        answerHTML = `<div class="aq-flash">
            ${S.revealed
              ? `<div class="aq-answer"><span class="aq-kicker">It means</span><div class="aq-en">${esc(q.answer)}</div></div>
                 <div class="aq-flash-btns">
                   <button class="btn ghost" data-grade="0" type="button">${icon("reset")} Again</button>
                   <button class="btn primary" data-grade="1" type="button">${icon("check")} Got it</button>
                 </div>`
              : `<button class="btn primary" id="aq-reveal" type="button">${icon("search")} Show the meaning</button>`}
          </div>`;
      } else {
        answerHTML = `<div class="aq-options">
            ${q.options.map((o, k) => {
              const cls = S.answered ? (o.ok ? "ok" : (S.picked === k ? "bad" : "dim")) : "";
              return `<button type="button" class="aq-opt ${cls}" data-opt="${k}" ${S.answered ? "disabled" : ""}>
                  <span class="ao-lbl ${isDevanagari(o.label) ? "bo" : ""}">${esc(o.label)}</span>
                  ${isDevanagari(o.label) ? speakBtn(o.label, "ao-speak") : ""}
                </button>`;
            }).join("")}
          </div>`;
      }

      body().innerHTML = `
        <div class="arena">
          <div class="arena-top">
            <div class="arena-prog"><i style="width:${pct}%"></i></div>
            <div class="arena-meta">
              <span>${S.i + 1} / ${S.qs.length}</span>
              <span class="am-score">${icon("star")} ${S.score}</span>
              <span class="am-streak">${icon("flame")} ${S.streak}</span>
            </div>
          </div>
          <div class="arena-card">
            ${promptHTML}
            ${answerHTML}
            <div class="arena-fb" id="arena-fb" aria-live="polite"></div>
            <div class="arena-actions">
              <button class="btn ghost small" id="arena-quit" type="button">End round</button>
              <button class="btn primary" id="arena-next" type="button" hidden>Next ${icon("arrow")}</button>
            </div>
          </div>
        </div>`;

      wire(S, q);
    }

    function feedback(S, q, correct) {
      S.answered = true;
      if (correct) { S.score++; S.streak++; S.best = Math.max(S.best, S.streak); if (AX.sfx) AX.sfx.correct(); }
      else { S.streak = 0; if (AX.sfx) AX.sfx.wrong(); }
      const fb = document.getElementById("arena-fb");
      const ansBo = q.type === "type" ? q.w.bo : q.answer;
      fb.innerHTML = correct
        ? `<span class="fb-ok">${icon("check")} Correct${S.streak > 1 ? ` · ${S.streak} in a row` : ""}</span>`
        : `<span class="fb-bad">${icon("close")} Not quite — the answer is <b class="bo">${esc(ansBo)}</b>${q.w.rom ? ` <span class="rom">${esc(q.w.rom)}</span>` : ""}</span>`;
      fb.classList.add("show");
      const next = document.getElementById("arena-next");
      next.hidden = false;
      next.focus();
      if (correct) setTimeout(() => { if (document.body.contains(next) && !next.hidden) advance(S); }, 850);
    }

    function wire(S, q) {
      if (q.type === "listen") setTimeout(() => speak(q.w.bo), 250);
      if (q.type === "flash") {
        const rev = document.getElementById("aq-reveal");
        if (rev) rev.addEventListener("click", () => { if (AX.sfx) AX.sfx.flip(); speak(q.prompt); S.revealed = true; render(S); });
        document.querySelectorAll("[data-grade]").forEach((b) =>
          b.addEventListener("click", () => feedback(S, q, b.getAttribute("data-grade") === "1"))
        );
      }
      if (q.type === "type") {
        const input = document.getElementById("aq-input");
        const check = () => {
          const correct = norm(input.value) === norm(q.answer);
          input.disabled = true;
          document.getElementById("aq-check").disabled = true;
          input.classList.add(correct ? "ok" : "bad");
          feedback(S, q, correct);
        };
        document.getElementById("aq-check").addEventListener("click", check);
        input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); check(); } });
        setTimeout(() => input.focus(), 60);
      }
      document.querySelectorAll("[data-opt]").forEach((b) =>
        b.addEventListener("click", () => {
          const k = Number(b.getAttribute("data-opt"));
          S.picked = k;
          document.querySelectorAll("[data-opt]").forEach((x) => {
            const ok = q.options[Number(x.getAttribute("data-opt"))].ok;
            x.classList.add(ok ? "ok" : (Number(x.getAttribute("data-opt")) === k ? "bad" : "dim"));
            x.disabled = true;
          });
          feedback(S, q, q.options[k].ok);
        })
      );
      document.getElementById("arena-next").addEventListener("click", () => advance(S));
      document.getElementById("arena-quit").addEventListener("click", () => end(S));
    }

    function advance(S) {
      S.i++; S.answered = false; S.picked = null; S.revealed = false;
      render(S);
    }

    function end(S) {
      const total = S.i;
      const acc = total ? Math.round((S.score / total) * 100) : 0;
      const xp = S.score * 10 + (acc >= 80 && total ? 20 : 0);
      if (xp) AX.store.progress.addBonusXp(xp);
      if (S.best) AX.store.progress.recordStreak(S.best);
      if (AX.sfx) AX.sfx.complete();
      document.dispatchEvent(new Event("ax:progress"));
      const msg = acc >= 90 ? "Outstanding." : acc >= 70 ? "Good going." : acc >= 40 ? "Getting there." : "Keep at it — repetition is the whole trick.";
      body().innerHTML = `
        <div class="arena">
          <div class="arena-end">
            <span class="sec-kicker">ROUND COMPLETE</span>
            <h2>${acc >= 70 ? icon("trophy") : icon("spark")} ${esc(msg)}</h2>
            <div class="end-stats">
              <div class="end-stat"><b>${S.score}</b><span>correct of ${total}</span></div>
              <div class="end-stat"><b>${acc}%</b><span>accuracy</span></div>
              <div class="end-stat"><b>${S.best}</b><span>best streak</span></div>
              <div class="end-stat xp"><b>+${xp}</b><span>XP earned</span></div>
            </div>
            <div class="btn-row">
              <button class="btn primary" id="end-again" type="button">${icon("reset")} Another round</button>
              <a class="btn ghost" href="progress.html">${icon("progress")} See your record</a>
            </div>
          </div>
        </div>`;
      document.getElementById("end-again").addEventListener("click", () => start(S.mode));
    }

    startScreen();
  }

  /* ---------------------------------------------------------- TRANSLATOR */
  function translator() {
    const host = document.getElementById("page-body");

    const norm = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

    const phraseIndex = {};
    [...B.phrases, ...B.dialogues.flatMap((d) => d.lines)].forEach((p) => {
      const k = norm(p.en);
      if (k && !phraseIndex[k]) phraseIndex[k] = p;
    });

    const wordIndex = {};
    B.dictionary.forEach((d) => {
      d.en.split("/").forEach((part) => {
        const k = norm(part);
        if (!k) return;
        if (!wordIndex[k]) wordIndex[k] = d;
        if (k.startsWith("to ")) {
          const bare = k.slice(3);
          if (bare && !wordIndex[bare]) wordIndex[bare] = d;
        }
      });
    });

    const samples = ["Thank you", "What is your name?", "Where are you going?", "I love you", "water"];

    host.innerHTML = `
      <div class="tr-panel">
        <div class="card">
          <label class="tr-label" for="tr-input">English</label>
          <textarea id="tr-input" placeholder="e.g. Thank you  /  Where are you going?  /  water"></textarea>
          <div class="btn-row" style="margin-top:var(--sp-4)">
            <button class="btn primary" id="tr-go" type="button">${icon("arrow")} Translate</button>
          </div>
          <div class="tr-samples">
            ${samples.map((s) => `<button type="button" data-try="${esc(s)}">${esc(s)}</button>`).join("")}
          </div>
        </div>
        <div class="card" id="tr-output" aria-live="polite">
          <span class="tr-label">Bodo Output</span>
          <p class="tr-note" style="margin:0">Select a sample phrase or type an English sentence to see the Bodo translation and word-by-word gloss.</p>
        </div>
      </div>`;

    const input = document.getElementById("tr-input");
    const out = document.getElementById("tr-output");
    let last = "";

    function run() {
      const t = (input.value || "").trim();
      if (!t) { out.innerHTML = `<p class="tr-note" style="margin:0">Type an English word or sentence above.</p>`; return; }
      const n = norm(t);

      if (phraseIndex[n]) {
        const p = phraseIndex[n];
        last = p.bo;
        out.innerHTML = `
          <span class="tr-label">Bodo</span>
          <div class="tr-bo">${esc(p.bo)}</div>
          <div class="tr-rom">${esc(p.rom || "")}</div>
          <p style="margin:var(--sp-4) 0 0"><span class="badge ok">${icon("check")} Exact phrase match</span></p>
          <div class="btn-row" style="margin-top:var(--sp-4)"><button class="btn ghost small" id="tr-copy" type="button">${icon("copy")} Copy Bodo</button></div>`;
      } else {
        const words = n.split(" ").filter(Boolean);
        const gloss = words.map((w) => (wordIndex[w] ? wordIndex[w].bo : `‹${w}›`));
        const hit = words.filter((w) => wordIndex[w]).length;
        const cov = words.length ? Math.round((hit / words.length) * 100) : 0;
        last = gloss.join(" ");
        out.innerHTML = `
          <span class="tr-label">Word-by-word gloss</span>
          <div class="tr-bo">${esc(gloss.join(" "))}</div>
          <p style="margin:var(--sp-4) 0 0"><span class="badge ${cov >= 60 ? "info" : "warn"}">${cov}% coverage</span></p>
          <p class="tr-note">Words in ‹brackets› are not in the phrasebook yet. Bodo puts the verb last (SOV), so reorder the glosses to read naturally.</p>
          <div class="btn-row" style="margin-top:var(--sp-4)"><button class="btn ghost small" id="tr-copy" type="button">${icon("copy")} Copy gloss</button></div>`;
      }

      const cp = document.getElementById("tr-copy");
      if (cp)
        cp.addEventListener("click", async () => {
          try {
            await navigator.clipboard.writeText(last);
            cp.innerHTML = icon("check") + " Copied";
          } catch (e) {
            cp.textContent = "Copy failed";
          }
          setTimeout(() => (cp.innerHTML = icon("copy") + " Copy"), 1600);
        });
    }

    document.getElementById("tr-go").addEventListener("click", run);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); run(); } });
    host.querySelectorAll("[data-try]").forEach((b) =>
      b.addEventListener("click", () => { input.value = b.getAttribute("data-try"); run(); })
    );
  }

  AX.tools = { quiz, translator };
})();
