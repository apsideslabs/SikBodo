/* ============================================================
   SikBodo — interactive tools
   Gamified Quiz Arena (Multiple Choice + Flashcards with XP &
   Streaks) and Bilingual Phrase Translator.
   ============================================================ */

(function () {
  const AX = (window.AX = window.AX || {});
  const B = window.SKB;
  const icon = (n, c) => AX.icons.icon(n, c);

  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------------------------------------------------------- QUIZ ARENA */
  function quiz() {
    const host = document.getElementById("page-body");
    let quizType = "mc"; // "mc" (multiple choice) | "flash" (flashcard)
    let dirMode = "all"; // "all" | "en" | "bo"

    const shuffle = (arr) => {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    const buildDeck = () => {
      const raw = [];
      B.dictionary.forEach((d, idx) => {
        const en = d.en.split("/")[0].trim();
        if (dirMode === "all" || dirMode === "en") {
          raw.push({ id: idx, q: en, a: d.bo, rom: d.rom || "", cat: d.cat || "", from: "en" });
        }
        if (dirMode === "all" || dirMode === "bo") {
          raw.push({ id: idx, q: d.bo, a: en, rom: d.rom || "", cat: d.cat || "", from: "bo" });
        }
      });

      const picked = shuffle(raw).slice(0, 15);
      return picked.map((item) => {
        const pool = B.dictionary
          .filter((_, idx) => idx !== item.id)
          .map((d) => (item.from === "en" ? d.bo : d.en.split("/")[0].trim()));
        const distractors = shuffle([...new Set(pool)].filter((x) => x !== item.a)).slice(0, 3);
        const options = shuffle([item.a, ...distractors]);
        return Object.assign({}, item, { options });
      });
    };

    let deck = buildDeck();
    let i = 0;
    let revealed = false;
    let pickedChoice = null;
    let score = 0;
    let streak = 0;
    let sessionXp = 0;

    function draw() {
      const c = deck[i];
      const pct = Math.round((i / deck.length) * 100);

      host.innerHTML = `
        <div class="quiz-stage">
          <div class="quiz-controls">
            <div class="seg" id="q-type-seg" role="group" aria-label="Quiz mode" style="width:auto">
              <button type="button" data-qtype="mc" aria-pressed="${quizType === "mc"}">Multiple Choice</button>
              <button type="button" data-qtype="flash" aria-pressed="${quizType === "flash"}">Flashcards</button>
            </div>
            <div class="seg" id="q-dir-seg" role="group" aria-label="Direction" style="width:auto">
              <button type="button" data-qdir="all" aria-pressed="${dirMode === "all"}">Mixed</button>
              <button type="button" data-qdir="en" aria-pressed="${dirMode === "en"}">EN → BO</button>
              <button type="button" data-qdir="bo" aria-pressed="${dirMode === "bo"}">BO → EN</button>
            </div>
          </div>

          <div class="quiz-hud">
            <span class="q-counter">Question ${i + 1} / ${deck.length}</span>
            <div class="q-badges">
              <span class="q-streak ${streak >= 2 ? "hot" : ""}">🔥 ${streak} Streak</span>
              <span class="mc-xp">${icon("star")} +${sessionXp} XP</span>
            </div>
          </div>

          <div class="progress" style="margin-bottom:var(--sp-4)">
            <i style="width:${pct}%"></i>
          </div>

          <div class="flash">
            <div class="prompt-label">
              ${c.from === "en" ? "Select the Bodo translation" : "Select the English meaning"}
              ${c.cat ? ` · ${esc(c.cat)}` : ""}
            </div>
            <div class="prompt ${c.from === "bo" ? "bo" : ""}">${esc(c.q)}</div>
            ${c.from === "bo" && c.rom ? `<div class="answer-rom">${esc(c.rom)}</div>` : ""}

            ${
              quizType === "mc"
                ? `<div class="mc-options">
                    ${c.options
                      .map((opt, idx) => {
                        let cls = "mc-opt";
                        if (revealed) {
                          if (opt === c.a) cls += " correct";
                          else if (opt === pickedChoice) cls += " wrong";
                        }
                        return `<button type="button" class="${cls}" data-opt="${esc(opt)}" ${revealed ? "disabled" : ""}>
                          <span class="mc-key">${idx + 1}</span>
                          <span class="mc-val ${c.from === "en" ? "bo" : ""}">${esc(opt)}</span>
                        </button>`;
                      })
                      .join("")}
                  </div>
                  ${
                    revealed
                      ? `<div class="mc-feedback ${pickedChoice === c.a ? "ok" : "err"}">
                          <div>
                            <strong>${pickedChoice === c.a ? "Correct! +10 XP" : "Not quite"}</strong>
                            <span>${esc(c.q)} = <b class="bo">${esc(c.a)}</b> ${c.rom ? `(${esc(c.rom)})` : ""}</span>
                          </div>
                          <button class="btn primary small" id="q-next" type="button">Next ${icon("arrow")}</button>
                        </div>`
                      : ""
                  }`
                : `${
                    revealed
                      ? `<div class="flash-divider"></div>
                         <div class="answer ${c.from === "en" ? "bo" : ""}">${esc(c.a)}</div>
                         ${c.from === "en" && c.rom ? `<div class="answer-rom">${esc(c.rom)}</div>` : ""}`
                      : ""
                  }`
            }
          </div>

          ${
            quizType === "flash"
              ? `<div class="quiz-btns">
                  ${
                    !revealed
                      ? `<button class="btn primary" id="q-reveal" type="button">Flip Card</button>`
                      : `<button class="btn primary" id="q-right" type="button">${icon("check")} Got it · +10 XP</button>
                         <button class="btn ghost" id="q-wrong" type="button">Needs review</button>`
                  }
                  <button class="btn subtle" id="q-restart" type="button">${icon("reset")} Restart</button>
                </div>`
              : `<div class="quiz-btns" style="margin-top:var(--sp-3)">
                  <button class="btn subtle small" id="q-restart" type="button">${icon("reset")} New 15-Question Round</button>
                </div>`
          }
        </div>`;

      host.querySelector("#q-type-seg").addEventListener("click", (e) => {
        const b = e.target.closest("button[data-qtype]");
        if (!b) return;
        quizType = b.getAttribute("data-qtype");
        restart();
      });

      host.querySelector("#q-dir-seg").addEventListener("click", (e) => {
        const b = e.target.closest("button[data-qdir]");
        if (!b) return;
        dirMode = b.getAttribute("data-qdir");
        restart();
      });

      host.querySelectorAll(".mc-opt").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (revealed) return;
          pickedChoice = btn.getAttribute("data-opt");
          revealed = true;
          const isGood = pickedChoice === c.a;
          if (isGood) {
            score++;
            streak++;
            sessionXp += 10;
            AX.store.progress.addBonusXp(10);
            AX.store.progress.recordStreak(streak);
            if (AX.sfx) AX.sfx.correct();
          } else {
            streak = 0;
            if (AX.sfx) AX.sfx.wrong();
          }
          draw();
        });
      });

      const nextBtn = document.getElementById("q-next");
      if (nextBtn) nextBtn.addEventListener("click", () => advance());

      const r = document.getElementById("q-reveal");
      if (r)
        r.addEventListener("click", () => {
          revealed = true;
          if (AX.sfx) AX.sfx.flip();
          draw();
        });
      const rt = document.getElementById("q-right");
      if (rt)
        rt.addEventListener("click", () => {
          score++;
          streak++;
          sessionXp += 10;
          AX.store.progress.addBonusXp(10);
          AX.store.progress.recordStreak(streak);
          if (AX.sfx) AX.sfx.correct();
          advance();
        });
      const wr = document.getElementById("q-wrong");
      if (wr)
        wr.addEventListener("click", () => {
          streak = 0;
          if (AX.sfx) AX.sfx.wrong();
          advance();
        });
      const rst = document.getElementById("q-restart");
      if (rst) rst.addEventListener("click", restart);
    }

    function advance() {
      if (i + 1 >= deck.length) {
        if (AX.sfx) AX.sfx.complete();
        const pct = Math.round((score / deck.length) * 100);
        host.innerHTML = `
          <div class="quiz-stage">
            <div class="flash">
              <div class="prompt-label">ROUND COMPLETE</div>
              <div class="prompt">${score} / ${deck.length} Correct (${pct}%)</div>
              <div class="answer-rom">Earned <strong>+${sessionXp} XP</strong> this session · Best streak: 🔥 ${AX.store.progress.bestStreak()}</div>
            </div>
            <div class="quiz-btns">
              <button class="btn primary" id="q-again" type="button">${icon("reset")} Play Another Round</button>
              <a class="btn ghost" href="lessons.html">Back to Lessons</a>
            </div>
          </div>`;
        document.getElementById("q-again").addEventListener("click", restart);
        return;
      }
      i++;
      revealed = false;
      pickedChoice = null;
      draw();
    }

    function restart() {
      deck = buildDeck();
      i = 0;
      score = 0;
      streak = 0;
      sessionXp = 0;
      revealed = false;
      pickedChoice = null;
      draw();
    }

    draw();
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
