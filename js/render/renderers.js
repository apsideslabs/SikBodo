/* ============================================================
   SikBodo — page renderers
   Crafted, tactile, gamified views for all static and reference
   pages. Static <h1> headings live in the HTML files; these
   renderers populate #page-body.
   ============================================================ */

(function () {
  const AX = (window.AX = window.AX || {});
  const B = window.SKB;
  const icon = (n, c) => AX.icons.icon(n, c);

  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const body = () => document.getElementById("page-body");

  function table(head, rows, caption) {
    return `<div class="table-wrap"><table>
      ${caption ? `<caption>${esc(caption)}</caption>` : ""}
      <thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join("")}</tr></thead>
      <tbody>${rows
        .map((r) => `<tr>${r.map((c, i) => `<td${i === 0 ? ' scope="row"' : ""}>${c}</td>`).join("")}</tr>`)
        .join("")}</tbody>
    </table></div>`;
  }

  const notesList = (notes) =>
    notes && notes.length
      ? `<div class="callout"><div class="callout-title">${icon("info")} Points to note</div><ul style="margin:0;padding-left:1.1em">${notes
          .map((n) => `<li>${esc(n)}</li>`)
          .join("")}</ul></div>`
      : "";

  /* ---------------------------------------------------------- HOME */
  function home() {
    const c = B.counts;
    const total = B.lessons.length;
    const r = AX.store.progress.rank(total);
    const p = AX.store.progress.count(total);
    const nextN = AX.store.progress.nextLesson(total);
    const visit = AX.store.visit ? AX.store.visit.get() : { streak: 0, best: 0 };
    const dailyXp = AX.store.daily ? AX.store.daily.get().xp : 0;
    const goal = AX.store.daily ? AX.store.daily.goal() : 50;
    const goalPct = Math.min(100, Math.round((dailyXp / goal) * 100));
    const savedN = AX.store.saved.list().length;

    const isRead = (n) => AX.store.progress.isRead(n);
    const nextLesson = B.lessons.find((l) => l.n === nextN) || B.lessons[0];
    const upNext = B.lessons.filter((l) => !isRead(l.n) && l.n !== nextN).slice(0, 4);
    const allDone = p.done >= p.total;

    const dayIndex = Math.floor(Date.now() / 86400000);
    const wotd = B.dictionary[dayIndex % B.dictionary.length];

    const ring = (pct, R) => {
      const C = 2 * Math.PI * R;
      const off = (C * (1 - Math.min(100, Math.max(0, pct)) / 100)).toFixed(1);
      const v = R * 2 + 6;
      return `<svg viewBox="0 0 ${v} ${v}" class="ring" aria-hidden="true">
        <circle cx="${R + 3}" cy="${R + 3}" r="${R}" class="ring-bg" />
        <circle cx="${R + 3}" cy="${R + 3}" r="${R}" class="ring-fg" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${off}" />
      </svg>`;
    };

    const launch = [
      { icon: "lessons", title: "Graded Lessons", text: `${c.lessons} modules from Basic to Advanced`, href: "lessons.html", tone: "a" },
      { icon: "script", title: "Script & Sounds", text: `${c.vowels} vowels · ${c.consonants} consonants · inspector`, href: "script.html", tone: "b" },
      { icon: "grammar", title: "Grammar Reference", text: "SOV syntax, case markers & mood", href: "grammar.html", tone: "c" },
      { icon: "verbs", title: "Verb Tables", text: `${c.verbs} core roots × 3 tenses`, href: "verbs.html", tone: "d" },
      { icon: "dictionary", title: "Dictionary", text: `${c.words} searchable entries · bookmarkable`, href: "dictionary.html", tone: "a" },
      { icon: "numbers", title: "Numbers & Time", text: "Cardinals, tens, days & months", href: "numbers.html", tone: "b" },
      { icon: "phrases", title: "Everyday Phrases", text: `${c.phrases} expressions by situation`, href: "phrases.html", tone: "c" },
      { icon: "conversations", title: "Conversations", text: `${c.dialogues} annotated dialogues`, href: "conversations.html", tone: "d" },
      { icon: "quiz", title: "Quiz Arena", text: "Flashcards & multiple choice", href: "quiz.html", tone: "a" },
      { icon: "translator", title: "Phrase Translator", text: "English ↔ Bodo phrase & word lookup", href: "translator.html", tone: "b" },
      { icon: "culture", title: "Language & Community", text: "History, script movement & festivals", href: "culture.html", tone: "c" },
      { icon: "contribute", title: "Contribute", text: "Open-source corpus & verification", href: "contribute.html", tone: "d" },
    ];

    const badges = [
      { icon: "graduation", label: "First lesson", on: p.done >= 1 },
      { icon: "book", label: "5 lessons", on: p.done >= 5 },
      { icon: "compass", label: "10 lessons", on: p.done >= 10 },
      { icon: "zap", label: "500 XP", on: r.xp >= 500 },
      { icon: "flame", label: "3-day streak", on: visit.streak >= 3 },
      { icon: "medal", label: "10 words saved", on: savedN >= 10 },
    ];

    const research = [
      { icon: "library", title: "Graded reading", text: `${c.passages} passages from two lines to a short essay, with comprehension checks.`, href: "reading.html" },
      { icon: "resources", title: "Sources & study plan", text: "The grammars, dictionaries and corpora behind the platform, plus a 12-week plan.", href: "resources.html" },
      { icon: "culture", title: "Language & community", text: "The script movement, tone, dialects, Bathouism and the literature.", href: "culture.html" },
      { icon: "dictionary", title: "The lexicon", text: `${c.words} words with romanisation, searchable and bookmarkable.`, href: "dictionary.html" },
    ];

    const shelfItems = B.phrases.filter((ph) => ph.cat === "Greetings & courtesy").slice(0, 6);

    body().innerHTML = `
      <section class="home-dash">
        <div class="dash-lead">
          <div class="dash-ring-lg">
            ${ring(r.levelPercent, 34)}
            <span class="dash-ring-num">${r.level}</span>
          </div>
          <div class="dash-copy">
            <span class="sec-kicker">YOUR STUDY RECORD</span>
            <h2>Level ${r.level} · ${esc(r.title)}</h2>
            <p class="dash-sub">${p.done} of ${p.total} lessons complete · ${r.xp} XP earned</p>
            <div class="dash-progress" role="progressbar" aria-valuenow="${r.levelPercent}" aria-valuemin="0" aria-valuemax="100"><i style="width:${r.levelPercent}%"></i></div>
            <p class="dash-next">${allDone ? "Every lesson complete — the ladder is yours." : `${Math.max(0, r.nextXp - r.xp)} XP to the next rank.`}</p>
          </div>
          <div class="dash-cta">
            <a class="btn primary" href="lessons.html#lesson-${nextN}">${allDone ? "Review lessons" : `Continue Lesson ${nextN}`} ${icon("arrow")}</a>
            <a class="btn ghost" href="quiz.html">${icon("quiz")} Quiz Arena</a>
          </div>
        </div>
        <div class="dash-tiles">
          <div class="dash-tile t-xp"><span class="dt-ic">${icon("zap")}</span><b>${r.xp}</b><span>XP earned</span></div>
          <div class="dash-tile t-streak ${visit.streak ? "is-on" : ""}"><span class="dt-ic">${icon("flame")}</span><b>${visit.streak}</b><span>day streak</span></div>
          <div class="dash-tile t-goal"><span class="dt-ic">${icon("target")}</span><b>${goalPct}%</b><span>daily goal · ${dailyXp}/${goal} XP</span></div>
          <div class="dash-tile t-saved"><span class="dt-ic">${icon("star")}</span><b>${savedN}</b><span>words saved</span></div>
        </div>
      </section>

      <section class="home-band">
        <div class="sec-head">
          <div><span class="sec-kicker">YOUR LEARNING PATH</span><h2>${allDone ? "You have finished the course" : "Pick up where you left off"}</h2></div>
          <a href="lessons.html" class="sec-link">All ${c.lessons} lessons ${icon("arrow")}</a>
        </div>
        <div class="path-grid">
          <a class="path-hero" href="lessons.html#lesson-${nextN}">
            <span class="ph-badge">${allDone ? "COMPLETE" : "UP NEXT"}</span>
            <span class="ph-n">Lesson ${nextN}</span>
            <h3>${esc(nextLesson.title)}</h3>
            <p>${esc(nextLesson.summary)}</p>
            <span class="ph-cta">${allDone ? "Review this lesson" : "Start this lesson"} ${icon("arrow")}</span>
          </a>
          <div class="path-side">
            ${upNext.length
              ? upNext.map((l) => `<a class="path-mini" href="lessons.html#lesson-${l.n}">
                  <span class="pm-n">${l.n}</span>
                  <span class="pm-t"><b>${esc(l.title)}</b><small>${esc(l.level)} · +50 XP</small></span>
                  <span class="pm-go" aria-hidden="true">${icon("arrow")}</span>
                </a>`).join("")
              : `<p class="empty">All lessons are marked complete. Revisit any lesson from the course page, or drill the dictionary.</p>`}
          </div>
        </div>
      </section>

      <section class="home-band">
        <div class="split-2">
          <div class="wotd" id="wotd">
            <span class="sec-kicker">WORD OF THE DAY</span>
            <div class="wotd-cat">${esc(wotd.cat)}</div>
            <div class="wotd-en">${esc(wotd.en)}</div>
            <button class="btn ghost small wotd-reveal" type="button" id="wotd-btn">${icon("search")} Reveal the Bodo</button>
            <div class="wotd-ans" id="wotd-ans" hidden>
              <span class="wotd-bo bo">${esc(wotd.bo)}</span>
              <span class="wotd-rom">${esc(wotd.rom)}</span>
            </div>
            <button class="btn subtle small" type="button" id="wotd-save">${icon("star")} Save this word</button>
          </div>
          <div class="practice-card">
            <span class="sec-kicker">DAILY PRACTICE</span>
            <h3>Keep the streak alive</h3>
            <p>Ten minutes a day beats a weekend of cramming. Drill a round of flashcards, or test yourself against the whole dictionary.</p>
            <div class="practice-stats">
              <span>${icon("flame")} ${visit.streak}-day streak</span>
              <span>${icon("target")} ${goalPct}% of today's goal</span>
              <span>${icon("star")} best streak ${visit.best}</span>
            </div>
            <div class="btn-row">
              <a class="btn primary" href="quiz.html">${icon("quiz")} Start a quiz round</a>
              <a class="btn ghost" href="dictionary.html">${icon("dictionary")} Browse words</a>
            </div>
          </div>
        </div>
      </section>

      <section class="home-band">
        <div class="sec-head">
          <div><span class="sec-kicker">PLATFORM DIRECTORY</span><h2>Explore the Platform</h2></div>
          <span class="sec-sub">12 modules · works 100% offline</span>
        </div>
        <div class="dir-grid">
          ${launch.map((l) => `<a class="dir-card tone-${l.tone}" href="${l.href}">
              <span class="dir-icon">${icon(l.icon)}</span>
              <span class="dir-main"><strong>${esc(l.title)}</strong><span>${esc(l.text)}</span></span>
              <span class="dir-arrow" aria-hidden="true">${icon("arrow")}</span>
            </a>`).join("")}
        </div>
      </section>

      <section class="home-band">
        <div class="sec-head">
          <div><span class="sec-kicker">MILESTONES</span><h2>Badges to Collect</h2></div>
          <a href="progress.html" class="sec-link">Full study record ${icon("arrow")}</a>
        </div>
        <div class="mile-strip">
          ${badges.map((b) => `<div class="mile ${b.on ? "earned" : "locked"}">
              <span class="mile-ic">${icon(b.on ? b.icon : "shield")}</span>
              <span class="mile-lbl">${esc(b.label)}</span>
              <span class="mile-state">${b.on ? icon("check") + " Earned" : "Locked"}</span>
            </div>`).join("")}
        </div>
      </section>

      <section class="home-band">
        <div class="sec-head">
          <div><span class="sec-kicker">STUDY &amp; RESEARCH</span><h2>Go deeper</h2></div>
        </div>
        <div class="research-grid">
          ${research.map((x) => `<a class="research-card" href="${x.href}">
              <span class="rc-ic">${icon(x.icon)}</span>
              <strong>${esc(x.title)}</strong>
              <span>${esc(x.text)}</span>
            </a>`).join("")}
        </div>
      </section>

      <section class="home-band">
        <div class="sec-head">
          <div><span class="sec-kicker">ESSENTIAL GREETINGS · TAP TO COPY</span><h2>Six Phrases to Start With</h2></div>
          <a href="phrases.html" class="sec-link">All ${c.phrases} phrases ${icon("arrow")}</a>
        </div>
        <div class="home-phrase-grid">
          ${shelfItems.map((ph) => `<div class="home-phrase-item phrase-card" data-copy="${esc(ph.bo)}" tabindex="0" role="button" aria-label="Copy ${esc(ph.bo)}">
                <div class="hpi-top"><span class="hpi-bo bo">${esc(ph.bo)}</span><span class="pc-copy-hint">${icon("copy")}</span></div>
                <span class="hpi-rom">${esc(ph.rom)}</span>
                <span class="hpi-en">${esc(ph.en)}</span>
              </div>`).join("")}
        </div>
      </section>`;

    body().querySelectorAll(".phrase-card").forEach((card) => {
      const triggerCopy = async () => {
        if (AX.sfx) AX.sfx.pop();
        const text = card.getAttribute("data-copy");
        const hint = card.querySelector(".pc-copy-hint");
        try {
          await navigator.clipboard.writeText(text);
          if (hint) hint.innerHTML = `${icon("check")} <span style="font-size:0.7rem">Copied</span>`;
          setTimeout(() => { if (hint) hint.innerHTML = icon("copy"); }, 1400);
        } catch (e) {}
      };
      card.addEventListener("click", triggerCopy);
      card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); triggerCopy(); } });
    });

    const wotdBtn = document.getElementById("wotd-btn");
    const wotdAns = document.getElementById("wotd-ans");
    if (wotdBtn && wotdAns) {
      wotdBtn.addEventListener("click", () => {
        if (AX.sfx) AX.sfx.pop();
        wotdAns.hidden = false;
        wotdBtn.hidden = true;
      });
    }
    const wotdSave = document.getElementById("wotd-save");
    if (wotdSave) {
      const paint = () => { wotdSave.innerHTML = (AX.store.saved.has(wotd.en) ? icon("check") + " Saved" : icon("star") + " Save this word"); };
      paint();
      wotdSave.addEventListener("click", () => { if (AX.sfx) AX.sfx.pop(); AX.store.saved.toggle(wotd.en); paint(); });
    }
  }

  /* ---------------------------------------------------------- LESSONS */
  function lessons() {
    const levels = ["Basic", "Elementary", "Intermediate", "Advanced"];
    const total = B.lessons.length;

    function renderLessonsPage(activeFilter) {
      const filter = activeFilter || "all";
      const p = AX.store.progress.count(total);
      const r = AX.store.progress.rank(total);
      const nextN = AX.store.progress.nextLesson(total);

      const lessonHTML = (l) => {
        const done = AX.store.progress.isRead(l.n);
        return `<details class="lesson ${done ? "is-done" : ""}" id="lesson-${l.n}">
          <summary>
            <span class="lesson-n">${done ? icon("check") : l.n}</span>
            <span class="lesson-title">${esc(l.title)}</span>
            <span class="lesson-xp ${done ? "earned" : ""}">${done ? "✓ +50 XP" : "+50 XP"}</span>
            <span class="lesson-sum">${esc(l.summary)}</span>
          </summary>
          <div class="lesson-body">
            ${l.body}
            <div class="lesson-done">
              <button class="btn ${done ? "ghost" : "primary"}" data-done="${l.n}" type="button">
                ${done ? icon("check") + " Completed (+50 XP Earned)" : icon("star") + " Complete Lesson · +50 XP"}
              </button>
              <span class="state ${done ? "done" : ""}">${done ? "Mastered — click to undo" : "Mark complete when you finish reading"}</span>
            </div>
          </div>
        </details>`;
      };

      body().innerHTML = `
        <section class="path-banner">
          <div class="pb-top">
            <div>
              <span class="pb-kicker">CURRICULUM SKILL TREE · LEVEL ${r.level} ${esc(r.title.toUpperCase())}</span>
              <h2 style="border:0;padding:0;margin:4px 0 0;font-size:var(--fs-xl)">${p.done} of ${p.total} Lessons Completed (${p.percent}%)</h2>
            </div>
            <span class="mc-xp">${icon("star")} ${r.xp} XP</span>
          </div>
          <div class="progress-wrap" style="margin:var(--sp-3) 0 var(--sp-4)">
            <div class="progress" role="progressbar" aria-valuenow="${p.percent}" aria-valuemin="0" aria-valuemax="100"><i style="width:${p.percent}%"></i></div>
          </div>
          <div class="skill-nodes" aria-label="Jump to lesson">
            ${B.lessons
              .map((l) => {
                const done = AX.store.progress.isRead(l.n);
                const isNext = l.n === nextN && !done;
                return `<button type="button" class="sn-btn ${done ? "done" : ""} ${isNext ? "next" : ""}" data-target="lesson-${l.n}">
                  <span class="sn-dot">${done ? icon("check") : l.n}</span>
                  <span class="sn-txt">
                    <b>${esc(l.title)}</b>
                    <small>${esc(l.level)} · +50 XP</small>
                  </span>
                </button>`;
              })
              .join("")}
          </div>
        </section>

        <div class="toolbar" style="justify-content:space-between;align-items:center;margin-bottom:var(--sp-4)">
          <div class="seg" id="lesson-filter" role="group" aria-label="Filter by level" style="width:auto">
            <button type="button" data-lv="all" aria-pressed="${filter === "all"}">All (${total})</button>
            ${levels.map((lv) => `<button type="button" data-lv="${lv}" aria-pressed="${filter === lv}">${lv}</button>`).join("")}
          </div>
          <button class="btn ghost small" id="lesson-expand-all" type="button">Expand all</button>
        </div>

        ${levels
          .filter((lv) => filter === "all" || filter === lv)
          .map((lv) => {
            const items = B.lessons.filter((l) => l.level === lv);
            if (!items.length) return "";
            return `<section class="level-block">
              <div class="level-head">
                <span class="level-tag lv-${lv.toLowerCase()}">${lv}</span>
                <h2>${items.length} lesson${items.length > 1 ? "s" : ""} · ${items.length * 50} XP</h2>
              </div>
              ${items.map(lessonHTML).join("")}
            </section>`;
          })
          .join("")}`;

      body().querySelectorAll("[data-done]").forEach((b) =>
        b.addEventListener("click", () => {
          const n = Number(b.getAttribute("data-done"));
          const nowDone = !AX.store.progress.isRead(n);
          AX.store.progress.setRead(n, nowDone);
          if (AX.sfx) {
            if (nowDone) AX.sfx.complete();
            else AX.sfx.tap();
          }
          document.dispatchEvent(new Event("ax:progress"));
          const openIds = Array.from(body().querySelectorAll("details.lesson[open]")).map((d) => d.id);
          renderLessonsPage(filter);
          openIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.open = true;
          });
        })
      );

      body().querySelectorAll(".sn-btn").forEach((step) =>
        step.addEventListener("click", () => {
          const id = step.getAttribute("data-target");
          const det = document.getElementById(id);
          if (!det) return;
          det.open = true;
          det.scrollIntoView({ behavior: "smooth", block: "center" });
          det.querySelector("summary").focus({ preventScroll: true });
        })
      );

      const filterEl = document.getElementById("lesson-filter");
      if (filterEl) {
        filterEl.addEventListener("click", (e) => {
          const btn = e.target.closest("button[data-lv]");
          if (!btn) return;
          renderLessonsPage(btn.getAttribute("data-lv"));
        });
      }

      const expBtn = document.getElementById("lesson-expand-all");
      if (expBtn) {
        let allOpen = false;
        expBtn.addEventListener("click", () => {
          allOpen = !allOpen;
          body().querySelectorAll("details.lesson").forEach((d) => { d.open = allOpen; });
          expBtn.textContent = allOpen ? "Collapse all" : "Expand all";
        });
      }
    }

    renderLessonsPage("all");

    if (location.hash && location.hash.startsWith("#lesson-")) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.open = true;
        setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
      }
    }
  }

  /* ---------------------------------------------------------- SCRIPT */
  function script() {
    const s = B.script;
    const allGlyphs = s.vowels.concat(s.consonants);
    let activeGlyph = allGlyphs[0];

    const cell = (x) => `<button type="button" class="glyph" data-glyph="${esc(x.l)}">
      <span class="glyph-l">${esc(x.l)}</span>
      <span class="glyph-r">${esc(x.r)}</span>
      <span class="glyph-s">${esc(x.s)}</span>
    </button>`;

    body().innerHTML = `
      <p class="prose">${esc(s.intro)}</p>
      <div id="char-inspector" class="char-inspector" aria-live="polite"></div>
      <h2>Vowels <span style="font-family:var(--font-bo);font-weight:600;color:var(--muted);font-size:var(--fs-sm)">Click any character to inspect</span></h2>
      <div class="glyph-grid">${s.vowels.map(cell).join("")}</div>
      <h2>Consonants <span style="font-family:var(--font-bo);font-weight:600;color:var(--muted);font-size:var(--fs-sm)">Click any character to inspect</span></h2>
      <div class="glyph-grid">${s.consonants.map(cell).join("")}</div>
      <h2>The varnamala chart <span style="font-family:var(--font-bo);font-weight:600;color:var(--muted);font-size:var(--fs-sm)">every letter as it is read aloud</span></h2>
      <p class="prose">Say each letter by its sound-name — ko, kho, aa, oo — rather than by its written shape.</p>
      <div class="chart-groups">
        ${(s.chart || [])
          .map(
            (g) => `<section class="chart-group">
          <h3>${esc(g.group)} <span class="rom">${esc(g.bo)}</span></h3>
          <div class="glyph-grid">${g.items
            .map((it) => `<div class="glyph"><span class="glyph-l">${esc(it.l)}</span><span class="glyph-r">${esc(it.reads)}</span></div>`)
            .join("")}</div>
        </section>`
          )
          .join("")}
      </div>
      <h2>Things to know</h2>
      ${notesList(s.notes)}
      <div class="callout info">
        <div class="callout-title">${icon("arrow")} Practise next</div>
        Read <a href="lessons.html#lesson-2">Lesson 2 — Reading the sounds</a> alongside this chart, then test yourself in the <a href="quiz.html">Quiz Arena</a>.
      </div>`;

    function updateInspector(g) {
      activeGlyph = g;
      const box = document.getElementById("char-inspector");
      if (!box) return;
      const baseChar = g.l.charAt(0);
      const examples = B.dictionary.filter((d) => d.bo.includes(baseChar)).slice(0, 4);
      box.innerHTML = `
        <div class="ci-main">
          <div class="ci-big bo">${esc(g.l)}</div>
          <div class="ci-info">
            <span class="ci-kicker">INTERACTIVE CHARACTER INSPECTOR</span>
            <h3>Romanisation: <code>${esc(g.r)}</code></h3>
            <p>Pronunciation guide: <strong>${esc(g.s)}</strong></p>
          </div>
        </div>
        <div class="ci-examples">
          <span class="ci-kicker">DICTIONARY EXAMPLES WITH THIS SOUND</span>
          <div class="ci-ex-grid">
            ${
              examples.length
                ? examples
                    .map(
                      (ex) => `<div class="ci-ex">
                        <span class="bo">${esc(ex.bo)}</span>
                        <span class="rom">${esc(ex.rom)}</span>
                        <small>${esc(ex.en)}</small>
                      </div>`
                    )
                    .join("")
                : `<small>Explore the dictionary for compound forms.</small>`
            }
          </div>
        </div>`;

      body().querySelectorAll(".glyph").forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-glyph") === g.l);
      });
    }

    updateInspector(activeGlyph);

    body().querySelectorAll(".glyph").forEach((btn) => {
      btn.addEventListener("click", () => {
        const l = btn.getAttribute("data-glyph");
        const found = allGlyphs.find((x) => x.l === l);
        if (found) updateInspector(found);
      });
    });
  }

  /* ---------------------------------------------------------- GRAMMAR */
  function grammar() {
    const g = B.grammar;
    body().innerHTML =
      `<p class="prose">${esc(g.intro)}</p>` +
      g.sections
        .map((s, i) => {
          const t = s.table ? table(s.table.head, s.table.rows, s.table.caption) : "";
          return `<section class="section" id="${esc(s.id)}">
            <h2><span class="sec-num">${String(i + 1).padStart(2, "0")}</span>${esc(s.title)}</h2>
            <p class="prose">${esc(s.summary)}</p>
            ${t}
            ${notesList(s.notes)}
          </section>`;
        })
        .join("");
  }

  /* ---------------------------------------------------------- VERBS */
  function verbs() {
    const v = B.verbs;
    const cell = (c) => `<span class="bo">${esc(c.bo)}</span><br><span class="rom">${esc(c.rom)}</span>`;

    const matrixRows = v.persons.map((p, i) => {
      const cells = v.tenses.map((t) => cell(t.cells[i]));
      return [`<span class="bo">${esc(p.bo)}</span><br><span class="rom">${esc(p.rom)}</span><br><small>${esc(p.en)}</small>`].concat(cells);
    });

    body().innerHTML = `
      <p class="prose">${esc(v.intro)}</p>
      <div class="callout warn"><div class="callout-title">${icon("alert")} How to read the tables</div>${esc(v.caveat)}</div>

      <h2>The model verb</h2>
      <p class="prose">Everything below is built on <span class="bo">${esc(v.model.bo)}</span> <span class="rom">${esc(v.model.rom)}</span> — “${esc(v.model.en)}”.</p>
      ${table(["Person"].concat(v.tenses.map((t) => esc(t.label))), matrixRows)}

      <h2>What the endings carry</h2>
      ${table(["Form", "Meaning"], v.tenses.map((t) => [`<strong>${esc(t.label)}</strong>`, esc(t.gloss)]))}

      <h2>${esc(v.negative.title)}</h2>
      <p class="prose">${esc(v.negative.note)}</p>
      ${table(["Form", "Bodo", "Roman", "Meaning"], v.negative.rows.map((r) => [`<strong>${esc(r[0])}</strong>`, `<span class="bo">${esc(r[1])}</span>`, `<span class="rom">${esc(r[2])}</span>`, esc(r[3])]))}

      <h2>${esc(v.imperative.title)}</h2>
      ${table(["Form", "Bodo", "Roman", "Meaning"], v.imperative.rows.map((r) => [`<strong>${esc(r[0])}</strong>`, `<span class="bo">${esc(r[1])}</span>`, `<span class="rom">${esc(r[2])}</span>`, esc(r[3])]))}
      <div class="callout"><div class="callout-title">${icon("info")} Note</div>${esc(v.imperative.note)}</div>

      <h2>Aspect</h2>
      <p class="prose">Aspect sits on top of tense, built from the -i form of the verb plus an auxiliary.</p>
      ${table(["Aspect", "How it is formed", "Example"], v.aspects.map((a) => [esc(a.name), esc(a.how), `<span class="bo">${esc(a.example)}</span>`]))}

      <h2>Common verbs</h2>
      <p class="prose">The first-person present, past and future forms of ten everyday verbs.</p>
      ${table(v.common.head, v.common.rows.map((r) => [`<strong>${esc(r[0])}</strong>`, `<span class="bo">${esc(r[1])}</span>`, `<span class="bo">${esc(r[2])}</span>`, `<span class="bo">${esc(r[3])}</span>`]))}`;
  }


  /* ---------------------------------------------------------- NUMBERS */
  function numbers() {
    const n = B.numbers;
    const grid = (arr) =>
      `<div class="num-grid">${arr
        .map((x) => `<div class="num-cell"><span class="n">${x.n}</span><span class="b">${esc(x.bo)}</span><span class="r">${esc(x.rom)}</span></div>`)
        .join("")}</div>`;
    const digitGrid = (arr) =>
      `<div class="num-grid">${arr
        .map((x) => `<div class="num-cell"><span class="n" style="font-family:var(--font-bo)">${x.n}</span><span class="b">${esc(x.bo)}</span><span class="r">${esc(x.arabic)} · ${esc(x.rom)}</span></div>`)
        .join("")}</div>`;
    const pair = (arr) =>
      table(["English", "Bodo", "Roman"], arr.map((t) => [esc(t.en), `<span class="bo">${esc(t.bo)}</span>`, `<span class="rom">${esc(t.rom)}</span>`]));
    const label = (t) => `<span style="font-family:var(--font-bo);font-weight:600;color:var(--muted);font-size:var(--fs-sm)">${t}</span>`;

    body().innerHTML = `
      <p class="prose">${esc(n.intro)}</p>
      <h2>The ten digits ${label("अनजिमा")}</h2>
      <p class="prose">These are the Devanagari digits — not the Western 0–9. Each cell shows the digit, the word for it, and the Arabic value.</p>
      ${digitGrid(n.digits)}
      <h2>One to ten</h2>
      ${grid(n.ones)}
      <h2>Eleven to twenty</h2>
      ${grid(n.teens)}
      <h2>The tens</h2>
      ${grid(n.tens)}
      <h2>One hundred</h2>
      <div class="callout"><div class="callout-title">${icon("info")} ${esc(n.hundred.bo)} <span class="rom">${esc(n.hundred.rom)}</span></div>${esc(n.hundred.note)}</div>
      <h2>The pattern</h2>
      ${table(["Rule", "Detail"], n.pattern.map((p) => [`<strong>${esc(p.rule)}</strong>`, esc(p.detail)]))}
      <h2>Ordinals</h2>
      ${grid(n.ordinals)}
      <h2>Time words</h2>
      ${pair(n.time)}
      <h2>Days of the week</h2>
      ${pair(n.days)}
      <h2>The Bodo year ${label("दान")}</h2>
      <p class="prose">The Bodo solar year begins in mid-April with Bwisagu, the new-year festival, so each month straddles two Gregorian months.</p>
      ${table(["Approx. Gregorian", "Month", "Roman"], n.months.map((m) => [esc(m.en), `<span class="bo">${esc(m.bo)}</span>`, `<span class="rom">${esc(m.rom)}</span>`]))}
      <h2>The Gregorian months in Bodo</h2>
      ${pair(n.gregorianMonths)}
      <h2>Things to know</h2>
      ${notesList(n.notes)}`;
  }


  /* ---------------------------------------------------------- DICTIONARY */
  function dictionary() {
    const cats = [...new Set(B.dictionary.map((d) => d.cat))].sort();
    const q = new URLSearchParams(location.search).get("q") || "";
    let starredOnly = false;

    body().innerHTML = `
      <div class="toolbar">
        <label class="visually-hidden" for="dict-search">Search the dictionary</label>
        <input id="dict-search" type="search" placeholder="Search in English, the Devanagari script or romanisation…" value="${esc(q)}">
        <label class="visually-hidden" for="dict-cat">Filter by category</label>
        <select id="dict-cat">
          <option value="">All categories (${cats.length})</option>
          ${cats.map((c) => `<option value="${esc(c)}">${esc(c)}</option>`).join("")}
        </select>
        <button type="button" class="btn ghost" id="dict-starred-btn" aria-pressed="false">
          ${icon("star")} Saved (<span id="dict-saved-num">${AX.store.saved.list().length}</span>)
        </button>
      </div>
      <p class="count" id="dict-count" role="status"></p>
      <div id="dict-list" class="dict-grid"></div>`;

    const search = document.getElementById("dict-search");
    const catSel = document.getElementById("dict-cat");
    const starFilterBtn = document.getElementById("dict-starred-btn");
    const savedNumEl = document.getElementById("dict-saved-num");
    const list = document.getElementById("dict-list");
    const count = document.getElementById("dict-count");

    function draw() {
      const term = (search.value || "").trim().toLowerCase();
      const cat = catSel.value;
      const savedSet = new Set(AX.store.saved.list());
      if (savedNumEl) savedNumEl.textContent = String(savedSet.size);

      const rows = B.dictionary.filter(
        (d) =>
          (!starredOnly || savedSet.has(d.en)) &&
          (!cat || d.cat === cat) &&
          (!term || d.en.toLowerCase().includes(term) || d.bo.includes(term) || (d.rom || "").toLowerCase().includes(term))
      );
      count.textContent = `${rows.length} of ${B.dictionary.length} words`;
      list.innerHTML = rows.length
        ? rows
            .map((d) => {
              const isStar = savedSet.has(d.en);
              return `<article class="dict-card">
                <button type="button" class="dict-star ${isStar ? "active" : ""}" data-star="${esc(d.en)}" aria-label="Bookmark ${esc(d.en)}" title="Save word">${icon("star")}</button>
                <span class="dc-bo bo">${esc(d.bo)}</span>
                <span class="dc-rom">${esc(d.rom || "")}</span>
                <span class="dc-en">${esc(d.en)}</span>
                ${d.note ? `<span class="dc-note">${esc(d.note)}</span>` : ""}
                <span class="dc-cat">${esc(d.cat)}</span>
              </article>`;
            })
            .join("")
        : `<p class="empty">${starredOnly ? "No saved words match this filter yet. Tap the star on any word to save it." : "No matches. Try a different spelling — Bodo romanisation varies between sources."}</p>`;

      list.querySelectorAll("[data-star]").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (AX.sfx) AX.sfx.pop();
          AX.store.saved.toggle(btn.getAttribute("data-star"));
          draw();
        });
      });
    }

    search.addEventListener("input", draw);
    catSel.addEventListener("change", draw);
    starFilterBtn.addEventListener("click", () => {
      starredOnly = !starredOnly;
      starFilterBtn.setAttribute("aria-pressed", String(starredOnly));
      starFilterBtn.classList.toggle("primary", starredOnly);
      starFilterBtn.classList.toggle("ghost", !starredOnly);
      draw();
    });
    draw();
  }

  /* ---------------------------------------------------------- PHRASES */
  function phrases() {
    const cats = [...new Set(B.phrases.map((p) => p.cat))];
    body().innerHTML = `
      <div class="toolbar">
        <label class="visually-hidden" for="phrase-search">Search phrases</label>
        <input id="phrase-search" type="search" placeholder="Search phrases…">
      </div>
      <div id="phrase-list"></div>`;

    const search = document.getElementById("phrase-search");
    const list = document.getElementById("phrase-list");

    function draw() {
      const term = (search.value || "").trim().toLowerCase();
      const html = cats
        .map((c) => {
          const rows = B.phrases.filter(
            (p) => p.cat === c && (!term || p.en.toLowerCase().includes(term) || p.bo.includes(term) || (p.rom || "").toLowerCase().includes(term))
          );
          if (!rows.length) return "";
          return `<section class="ref-block">
            <h3>${esc(c)}</h3>
            <div class="phrase-grid">
              ${rows
                .map(
                  (p) => `<div class="phrase-tile">
                  <span class="pt-bo bo">${esc(p.bo)}</span>
                  <span class="pt-rom">${esc(p.rom || "")}</span>
                  <span class="pt-en">${esc(p.en)}</span>
                </div>`
                )
                .join("")}
            </div>
          </section>`;
        })
        .join("");
      list.innerHTML = html || `<p class="empty">No phrases match that search.</p>`;
    }
    search.addEventListener("input", draw);
    draw();
  }

  /* ---------------------------------------------------------- CONVERSATIONS */
  function conversations() {
    body().innerHTML = B.dialogues
      .map((d) => {
        const side = {};
        d.lines.forEach((l) => { if (!(l.who in side)) side[l.who] = Object.keys(side).length % 2; });
        return `<article class="dialogue">
          <header class="dlg-head">
            <h2 style="border:0;padding:0;margin:0;font-size:var(--fs-lg)">${esc(d.title)}</h2>
            <div class="chips" style="font-size:var(--fs-xs);color:var(--muted)">
              <span>${esc(d.setting)}</span>
              <span aria-hidden="true">·</span>
              <span style="font-weight:700;color:var(--brand)">${esc(d.level)}</span>
            </div>
          </header>
          <div class="chat">
            ${d.lines
              .map(
                (l) => `<div class="chat-turn ${side[l.who] ? "right" : ""}">
                  <span class="chat-avatar" aria-hidden="true">${esc((l.who || "?").trim().charAt(0))}</span>
                  <div class="chat-bubble">
                    <div class="chat-bo bo">${esc(l.bo)}</div>
                    <div class="chat-rom">${esc(l.rom || "")}</div>
                    <div class="chat-en">${esc(l.en)}</div>
                  </div>
                </div>`
              )
              .join("")}
          </div>
          ${d.note ? `<p class="dlg-note">${icon("info")} <strong>Note:</strong> ${esc(d.note)}</p>` : ""}
        </article>`;
      })
      .join("");
  }

  /* ---------------------------------------------------------- CULTURE */
  function culture() {
    body().innerHTML =
      `<p class="prose">${esc(B.culture.intro)}</p>` +
      B.culture.sections
        .map(
          (s) => `<section class="section" id="${esc(s.id)}">
            <h2>${esc(s.title)}</h2>
            ${s.body.map((p) => `<p class="prose">${esc(p)}</p>`).join("")}
          </section>`
        )
        .join("");
  }

  /* ---------------------------------------------------------- RESOURCES */
  function resources() {
    const r = B.resources;
    body().innerHTML = `
      <p class="prose">${esc(r.intro)}</p>
      ${r.categories
        .map(
          (c) => `<section class="section">
            <h2>${esc(c.title)}</h2>
            ${c.items
              .map(
                (it) => `<div class="resource">
                  <span class="r-icon">${icon(c.icon, "icon-lg")}</span>
                  <div>
                    <h3>${esc(it.name)}</h3>
                    <p>${esc(it.desc)}</p>
                    <a href="${esc(it.href)}" rel="noopener noreferrer" target="_blank">${esc(it.href.replace(/^https?:\/\//, "").replace(/\/$/, ""))} ${icon("external")}</a>
                  </div>
                </div>`
              )
              .join("")}
          </section>`
        )
        .join("")}
      <section class="section">
        <h2>${esc(r.plan.title)}</h2>
        ${table(["Weeks", "Focus", "What to do"], r.plan.weeks.map((w) => [`<strong>${esc(w.w)}</strong>`, esc(w.focus), esc(w.do)]))}
        <div class="callout ok"><div class="callout-title">${icon("spark")} Tip</div>${esc(r.plan.tip)}</div>
      </section>
      <section class="section">
        <h2>${esc(r.contribute.title)}</h2>
        <p class="prose">${esc(r.contribute.text)}</p>
      </section>`;
  }

  /* ---------------------------------------------------------- ABOUT */
  function about() {
    const m = B.meta;
    const c = B.counts;
    body().innerHTML = `
      <div class="grid-2">
        <div class="card">
          <h3 style="margin-top:0">Version</h3>
          <p style="margin:0"><strong>${esc(m.name)}</strong> v${esc(m.version)} · released ${esc(m.released)}</p>
          <p style="margin:var(--sp-2) 0 0;font-size:var(--fs-sm);color:var(--muted)">${esc(m.license)} licence · ${esc(m.author)}</p>
          <p style="margin:var(--sp-3) 0 0"><a href="${m.repo}">Source repository</a> · <a href="${m.repo}/blob/main/CHANGELOG.md">Changelog</a> · <a href="${m.repo}/blob/main/SECURITY.md">Security policy</a></p>
          ${m.brand ? `<div class="maker-mark large">
            <span class="maker-label">${m.brand.label}</span>
            ${m.brand.svg}
          </div>` : ""}
        </div>
        <div class="card">
          <h3 style="margin-top:0">Contents</h3>
          <ul style="margin:0;padding-left:1.1em;font-size:var(--fs-sm)">
            <li>${c.lessons} lessons across four levels</li>
            <li>${c.grammarSections} grammar reference sections</li>
            <li>${c.verbs} verbs conjugated across 3 tenses</li>
            <li>${c.words} dictionary words in ${c.categories} categories</li>
            <li>${c.phrases} phrases · ${c.dialogues} dialogues (${c.dialogueLines} lines)</li>
          </ul>
        </div>
      </div>

      <section class="section">
        <h2>Accuracy and honesty</h2>
        <div class="callout warn">
          <div class="callout-title">${icon("alert")} Linguistic scope note</div>
          <p style="margin:0 0 var(--sp-2)">Bodo is a lower-resource language with several regional dialects and no single settled romanisation. This platform was compiled from public learner resources and published descriptions of Bodo grammar.</p>
          <p style="margin:0">Where sources disagreed, the more widely repeated form was kept and uncertain items are flagged in place. Confirm regional nuances with native speakers.</p>
        </div>
      </section>

      <section class="section">
        <h2>Sources consulted</h2>
        <ul class="source-list">${B.sources.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
        <p class="prose" style="margin-top:var(--sp-4)">Direct links to the external material are collected on the <a href="resources.html">Resources</a> page.</p>
      </section>

      <section class="section">
        <h2>Credits</h2>
        ${table(["Component", "Attribution"], m.credits.map((cr) => [`<strong>${esc(cr.what)}</strong>`, esc(cr.detail)]))}
      </section>

      <section class="section">
        <h2>How it is built</h2>
        <p class="prose">Static HTML5, CSS and vanilla JavaScript. Content lives in plain objects under <code>js/data/</code>, the interface is generated by <code>js/app.js</code> and its modules, and the visual system is driven by design tokens.</p>
      </section>`;
  }

  /* ---------------------------------------------------------- CONTRIBUTE */
  function contribute() {
    const c = B.contribute;

    const roles = c.roles
      .map(
        (r) => `<article class="card feature">
          <div class="feature-icon">${icon(r.icon, "icon-lg")}</div>
          <h3>${esc(r.title)}</h3>
          <p>${esc(r.text)}</p>
          <ul class="tick-list">${r.can.map((x) => `<li>${icon("check")} <span>${esc(x)}</span></li>`).join("")}</ul>
        </article>`
      )
      .join("");

    const why = c.why
      .map(
        (w) => `<article class="card feature">
          <div class="feature-icon">${icon(w.icon, "icon-lg")}</div>
          <h3>${esc(w.title)}</h3>
          <p>${esc(w.text)}</p>
        </article>`
      )
      .join("");

    const tasks = c.tasks
      .map(
        (t) => `<article class="card task">
          <div class="task-head">
            <span class="task-icon">${icon(t.icon)}</span>
            <h3>${esc(t.title)}</h3>
            <span class="chip effort">${esc(t.effort)}</span>
          </div>
          <p>${esc(t.text)}</p>
          <p class="task-how">${icon("arrow")} ${esc(t.how)}</p>
        </article>`
      )
      .join("");

    const routes = c.routes
      .map(
        (r) => `<section class="route" id="route-${esc(r.id)}">
          <div class="route-head">
            <span class="badge info">${esc(r.badge)}</span>
            <h3>${esc(r.title)}</h3>
          </div>
          <p class="route-for">${icon("users")} ${esc(r.for)}</p>
          <ol class="route-steps">${r.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
        </section>`
      )
      .join("");

    const faq = c.faq
      .map(
        (f) => `<details class="lesson faq"><summary>
          <span class="faq-q">${esc(f.q)}</span>
        </summary><div class="lesson-body"><p>${esc(f.a)}</p></div></details>`
      )
      .join("");

    const links = c.links
      .map(
        (l) => `<a class="resource link-card" href="${esc(l.href)}" rel="noopener noreferrer" target="_blank">
          <span class="r-icon">${icon(l.icon, "icon-lg")}</span>
          <span class="link-body">
            <strong>${esc(l.label)} ${icon("external")}</strong>
            <span>${esc(l.desc)}</span>
          </span>
        </a>`
      )
      .join("");

    body().innerHTML = `
      <p class="prose lede-inline">${esc(c.intro)}</p>

      <section class="section">
        <h2>Why it matters</h2>
        <div class="grid">${why}</div>
      </section>

      <section class="section">
        <h2>Who can contribute</h2>
        <p class="prose">Whichever of these you are, there is a route below that needs no programming at all.</p>
        <div class="grid">${roles}</div>
      </section>

      <section class="section">
        <h2>What you can do</h2>
        <p class="prose">Concrete jobs, roughly in order of how little effort they take.</p>
        <div class="grid task-grid">${tasks}</div>
      </section>

      <section class="section">
        <h2>How to contribute</h2>
        <p class="prose">Pick the route that matches your comfort level. Route A is the one most people want.</p>
        ${routes}
      </section>

      <section class="section">
        <h2>Rules for content</h2>
        <p class="prose">These exist to keep the platform trustworthy. They are checked in review.</p>
        ${table(["Rule", "Why it exists"], c.rules.map((r) => [`<strong>${esc(r.rule)}</strong>`, r.why]))}
      </section>

      <section class="section">
        <h2>What happens after you submit</h2>
        <ol class="prose" style="padding-left:1.2em">${c.review.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
        <div class="callout ok"><div class="callout-title">${icon("star")} Recognition</div>${esc(c.recognition)}</div>
      </section>

      <section class="section">
        <h2>Questions</h2>
        ${faq}
      </section>

      <section class="section">
        <h2>Where to go next</h2>
        <div class="link-grid">${links}</div>
      </section>`;
  }

  /* ---------------------------------------------------------- PROGRESS & LEARNER PROFILE PAGE */
  function progress() {
    const levels = ["Basic", "Elementary", "Intermediate", "Advanced"];
    const total = B.lessons.length;
    let editingProfile = false;
    let confirmReset = false;
    let ledgerNotice = "";

    /* --- Custom Vector SVGs for Profile, XP, Animated Fire & Trophies --- */
    function avatarRingSVG(level, pct) {
      const r = 36;
      const c = Math.round(2 * Math.PI * r);
      const offset = Math.round(c - (pct / 100) * c);
      return `<svg class="lp-avatar-svg" viewBox="0 0 88 88" aria-hidden="true">
        <defs>
          <linearGradient id="lp-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4f46e5"/>
            <stop offset="55%" stop-color="#7c3aed"/>
            <stop offset="100%" stop-color="#f59e0b"/>
          </linearGradient>
          <linearGradient id="lp-shield-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#4338ca"/>
            <stop offset="100%" stop-color="#1e1b4b"/>
          </linearGradient>
        </defs>
        <circle cx="44" cy="44" r="${r}" fill="none" stroke="var(--line)" stroke-width="6"/>
        <circle cx="44" cy="44" r="${r}" fill="none" stroke="url(#lp-ring-grad)" stroke-width="6"
                stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${offset}"
                transform="rotate(-90 44 44)"/>
        <path d="M44 18 L63 26 V43 C63 55.5 54.8 64.8 44 69 C33.2 64.8 25 55.5 25 43 V26 Z"
              fill="url(#lp-shield-grad)" stroke="#818cf8" stroke-width="1.5"/>
        <path d="M44 23 L46.9 31.2 L55.5 31.4 L48.7 36.6 L51.1 44.9 L44 39.9 L36.9 44.9 L39.3 36.6 L32.5 31.4 L41.1 31.2 Z"
              fill="#fbbf24" opacity="0.22"/>
        <text x="44" y="49" text-anchor="middle" fill="#ffffff" font-family="var(--font-display)" font-weight="800" font-size="18">L${level}</text>
      </svg>`;
    }

    function xpCrestSVG() {
      return `<svg class="xp-crest-svg" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="xp-gem-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fde047"/>
            <stop offset="50%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#d97706"/>
          </linearGradient>
          <linearGradient id="xp-bolt-g" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#fef08a"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="28" fill="url(#xp-gem-g)" opacity="0.16" class="xp-halo"/>
        <polygon points="32,6 54,18 54,46 32,58 10,46 10,18" fill="url(#xp-gem-g)" stroke="#fef08a" stroke-width="2"/>
        <polygon points="32,11 49,21 49,43 32,53 15,43 15,21" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="1.2"/>
        <path d="M35 16 L21 34 H31 L29 48 L43 30 H33 Z" fill="url(#xp-bolt-g)"/>
      </svg>`;
    }

    function animatedFireSVG(active) {
      return `<svg class="fire-logo-svg ${active ? "is-lit" : ""}" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="fire-outer" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stop-color="#fb923c"/>
            <stop offset="55%" stop-color="#f97316"/>
            <stop offset="100%" stop-color="#dc2626"/>
          </linearGradient>
          <linearGradient id="fire-mid" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stop-color="#fde047"/>
            <stop offset="100%" stop-color="#f59e0b"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="36" r="24" fill="#f97316" opacity="0.15" class="fire-glow"/>
        <circle class="fire-ember e1" cx="22" cy="14" r="2" fill="#fbbf24"/>
        <circle class="fire-ember e2" cx="43" cy="18" r="1.6" fill="#fb923c"/>
        <circle class="fire-ember e3" cx="32" cy="9" r="1.8" fill="#fde047"/>
        <path class="fire-flame-outer"
              d="M33 7 C33 7 49 20 49 37 C49 48.6 41.4 57 32 57 C22.6 57 15 48.6 15 37 C15 27.5 21 19.5 24.5 16 C24.5 16 23.5 23 27.5 25 C26 17.5 33 7 33 7 Z"
              fill="url(#fire-outer)"/>
        <path class="fire-flame-mid"
              d="M32.5 20 C32.5 20 42 29 42 39 C42 46.5 37.5 52 32 52 C26.5 52 22 46.5 22 39 C22 33 26.5 27.5 32.5 20 Z"
              fill="url(#fire-mid)"/>
        <path class="fire-flame-core"
              d="M32 31 C32 31 37 36.5 37 42 C37 46 34.8 49 32 49 C29.2 49 27 46 27 42 C27 36.5 32 31 32 31 Z"
              fill="#fef9c3"/>
      </svg>`;
    }

    function trophySVG(kind) {
      switch (kind) {
        case "cup":
          return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
            <path d="M16 12 H40 V25 C40 32.5 34.6 38 28 38 C21.4 38 16 32.5 16 25 Z" fill="#f59e0b"/>
            <path d="M16 15 H10 V21 C10 25.5 12.8 28.5 16 29" fill="none" stroke="#f59e0b" stroke-width="3.2" stroke-linecap="round"/>
            <path d="M40 15 H46 V21 C46 25.5 43.2 28.5 40 29" fill="none" stroke="#f59e0b" stroke-width="3.2" stroke-linecap="round"/>
            <rect x="25" y="37" width="6" height="8" rx="1" fill="#d97706"/>
            <rect x="18" y="44" width="20" height="5" rx="2.5" fill="#b45309"/>
            <polygon points="28,16 30,21 35,21 31,24 32.5,29 28,26 23.5,29 25,24 21,21 26,21" fill="#fef08a"/>
          </svg>`;
        case "spark":
          return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
            <circle cx="28" cy="28" r="20" fill="#fff7ed" stroke="#fdba74" stroke-width="2"/>
            <path d="M28 8 L32 22 L46 26 L32 30 L28 44 L24 30 L10 26 L24 22 Z" fill="#f97316"/>
            <path d="M28 15 L30.2 23.8 L39 26 L30.2 28.2 L28 37 L25.8 28.2 L17 26 L25.8 23.8 Z" fill="#fde047"/>
          </svg>`;
        case "flame":
          return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
            <path d="M28 8 L45 15 V28 C45 39 37.8 46.8 28 50 C18.2 46.8 11 39 11 28 V15 Z" fill="#ea580c"/>
            <path d="M28.5 15 C28.5 15 38 24 38 33 C38 39.5 33.5 44 28 44 C22.5 44 18 39.5 18 33 C18 26 28.5 15 28.5 15 Z" fill="#fde047"/>
            <path d="M28 26 C28 26 33 31 33 35.5 C33 39 30.8 41.5 28 41.5 C25.2 41.5 23 39 23 35.5 C23 31 28 26 28 26 Z" fill="#ffffff"/>
          </svg>`;
        case "phoenix":
          return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
            <polygon points="28,6 48,17 48,39 28,50 8,39 8,17" fill="#dc2626" stroke="#fca5a5" stroke-width="1.8"/>
            <path d="M28 12 C28 12 41 22 41 34 C41 41.5 35.2 46 28 46 C20.8 46 15 41.5 15 34 C15 22 28 12 28 12 Z" fill="#f97316"/>
            <path d="M20 26 C14 23 11 17 13 13 C17 16 21 20 23 24 Z" fill="#fde047"/>
            <path d="M36 26 C42 23 45 17 43 13 C39 16 35 20 33 24 Z" fill="#fde047"/>
            <path d="M28 20 C28 20 35 27 35 34 C35 38.5 31.8 42 28 42 C24.2 42 21 38.5 21 34 C21 27 28 20 28 20 Z" fill="#fef08a"/>
          </svg>`;
        case "ribbon":
          return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
            <path d="M16 10 H40 C41.7 10 43 11.3 43 13 V47 L28 38 L13 47 V13 C13 11.3 14.3 10 16 10 Z" fill="#e11d48" stroke="#fda4af" stroke-width="1.8"/>
            <polygon points="28,16 30.6,21.4 36.5,22.2 32.2,26.4 33.3,32.3 28,29.5 22.7,32.3 23.8,26.4 19.5,22.2 25.4,21.4" fill="#ffe4e6"/>
          </svg>`;
        case "gem":
          return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
            <polygon points="18,11 38,11 48,23 28,48 8,23" fill="#10b981"/>
            <polygon points="18,11 38,11 33,23 23,23" fill="#6ee7b7"/>
            <polygon points="8,23 23,23 28,48" fill="#059669"/>
            <polygon points="33,23 48,23 28,48" fill="#047857"/>
            <polygon points="23,23 33,23 28,48" fill="#34d399"/>
          </svg>`;
        case "sapphire":
          return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
            <polygon points="28,7 47,18 47,38 28,49 9,38 9,18" fill="#0284c7" stroke="#7dd3fc" stroke-width="1.8"/>
            <polygon points="28,13 41,21 41,35 28,43 15,35 15,21" fill="#38bdf8"/>
            <polygon points="28,18 35,23 35,33 28,38 21,33 21,23" fill="#e0f2fe"/>
          </svg>`;
        case "amethyst":
          return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
            <polygon points="28,6 44,20 38,48 18,48 12,20" fill="#7c3aed" stroke="#ddd6fe" stroke-width="1.8"/>
            <polygon points="28,6 38,22 28,48 18,22" fill="#a78bfa"/>
            <polygon points="28,13 34,23 28,39 22,23" fill="#f3e8ff"/>
          </svg>`;
        case "medal":
          return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
            <polygon points="19,8 26,8 23,24 15,24" fill="#ef4444"/>
            <polygon points="37,8 30,8 33,24 41,24" fill="#3b82f6"/>
            <circle cx="28" cy="34" r="14" fill="#f59e0b" stroke="#fde047" stroke-width="2"/>
            <polygon points="28,25 30.5,30.5 36.5,31 32,35 33.5,41 28,37.8 22.5,41 24,35 19.5,31 25.5,30.5" fill="#fef9c3"/>
          </svg>`;
        case "compass":
          return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
            <circle cx="28" cy="28" r="20" fill="#0d9488" stroke="#99f6e4" stroke-width="2"/>
            <polygon points="28,9 33,23 47,28 33,33 28,47 23,33 9,28 23,23" fill="#5eead4"/>
            <polygon points="28,15 31,25 41,28 31,31 28,41 25,31 15,28 25,25" fill="#ffffff"/>
            <circle cx="28" cy="28" r="3.5" fill="#0f766e"/>
          </svg>`;
        case "aegis":
          return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
            <path d="M28 7 L46 14 V28 C46 40 38.2 47.5 28 51 C17.8 47.5 10 40 10 28 V14 Z" fill="#4338ca" stroke="#a5b4fc" stroke-width="2"/>
            <path d="M28 12 L41 17.5 V28 C41 36.8 35.4 42.5 28 45.5 C20.6 42.5 15 36.8 15 28 V17.5 Z" fill="#6366f1"/>
            <path d="M28 17 L32 25 L40 26.5 L34 32 L35.5 40 L28 36 L20.5 40 L22 32 L16 26.5 L24 25 Z" fill="#fde047"/>
          </svg>`;
        case "laurel":
          return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
            <circle cx="28" cy="28" r="19" fill="#15803d" stroke="#86efac" stroke-width="2"/>
            <path d="M18 38 C13 32 13 21 20 15" fill="none" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
            <path d="M38 38 C43 32 43 21 36 15" fill="none" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
            <polygon points="28,17 30.8,23 37,23.8 32.4,28 33.6,34.2 28,31 22.4,34.2 23.6,28 19,23.8 25.2,23" fill="#fef08a"/>
          </svg>`;
        case "scroll":
          return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
            <rect x="14" y="11" width="28" height="34" rx="4" fill="#f59e0b" stroke="#fde68a" stroke-width="2"/>
            <rect x="18" y="15" width="20" height="26" rx="2" fill="#fffbeb"/>
            <line x1="21" y1="21" x2="35" y2="21" stroke="#d97706" stroke-width="2.4" stroke-linecap="round"/>
            <line x1="21" y1="27" x2="35" y2="27" stroke="#d97706" stroke-width="2.4" stroke-linecap="round"/>
            <line x1="21" y1="33" x2="30" y2="33" stroke="#d97706" stroke-width="2.4" stroke-linecap="round"/>
          </svg>`;
        case "bolt":
          return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
            <circle cx="28" cy="28" r="20" fill="#6366f1"/>
            <circle cx="28" cy="28" r="16" fill="none" stroke="#a5b4fc" stroke-width="1.5"/>
            <path d="M31 13 L18 29 H27 L25 43 L38 27 H29 Z" fill="#fde047"/>
          </svg>`;
        case "sunburst":
          return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
            <polygon points="28,5 33,14 43,10 41,20 51,25 43,32 47,42 37,42 33,51 28,43 23,51 19,42 9,42 13,32 5,25 15,20 13,10 23,14" fill="#f59e0b"/>
            <circle cx="28" cy="28" r="12" fill="#fef08a" stroke="#d97706" stroke-width="2"/>
            <path d="M28 20 L30 25.5 L36 26 L31.5 29.8 L33 35.5 L28 32.2 L23 35.5 L24.5 29.8 L20 26 L26 25.5 Z" fill="#d97706"/>
          </svg>`;
        case "supernova":
          return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
            <circle cx="28" cy="28" r="20" fill="#9333ea" stroke="#e9d5ff" stroke-width="2"/>
            <polygon points="28,8 32,22 46,24 34,32 38,46 28,37 18,46 22,32 10,24 24,22" fill="#f472b6"/>
            <polygon points="28,14 30.8,23.5 40,25 32.5,30.5 35,40 28,34 21,40 23.5,30.5 16,25 25.2,23.5" fill="#fef08a"/>
          </svg>`;
        case "grandmaster":
          return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
            <polygon points="28,5 49,17 49,39 28,51 7,39 7,17" fill="#1e1b4b" stroke="#fbbf24" stroke-width="2.4"/>
            <polygon points="28,11 43,20 43,36 28,45 13,36 13,20" fill="#4338ca"/>
            <path d="M17 34 L20 20 L25 26 L28 17 L31 26 L36 20 L39 34 Z" fill="#fde047"/>
            <rect x="17" y="36" width="22" height="4" rx="2" fill="#f59e0b"/>
          </svg>`;
        default:
          return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
            <path d="M10 38 L14 18 L23 27 L28 14 L33 27 L42 18 L46 38 Z" fill="#f59e0b" stroke="#fde047" stroke-width="1.8" stroke-linejoin="round"/>
            <rect x="10" y="40" width="36" height="6" rx="3" fill="#d97706"/>
            <circle cx="14" cy="15" r="2.5" fill="#fde047"/>
            <circle cx="28" cy="11" r="3" fill="#fde047"/>
            <circle cx="42" cy="15" r="2.5" fill="#fde047"/>
          </svg>`;
      }
    }

    let activePopup = null;

    function drawProgressPage() {
      const prof = AX.store.profile.get();
      const p = AX.store.progress.count(total);
      const r = AX.store.progress.rank(total);
      const nextN = AX.store.progress.nextLesson(total);
      const bestStreak = AX.store.progress.bestStreak();
      const savedKeys = new Set(AX.store.saved.list());
      const savedEntries = B.dictionary.filter((d) => savedKeys.has(d.en));
      const ranks = AX.store.progress.RANKS || [];
      const suggestedWords = B.dictionary.slice(0, 6);

      const tierCount = (lv) =>
        B.lessons.filter((l) => l.level === lv && AX.store.progress.isRead(l.n)).length;
      const basicDone = tierCount("Basic");
      const elemDone = tierCount("Elementary");
      const interDone = tierCount("Intermediate");
      const advDone = tierCount("Advanced");

      const trophies = [
        {
          id: "first-step",
          kind: "cup",
          title: "First Step",
          bo: "गिबि आगान",
          sub: "1st lesson",
          cur: Math.min(1, p.done),
          max: 1,
          unit: "lesson",
          how: "Open Lessons and mark your very first Bodo lesson complete (+50 XP).",
          ctaLabel: "Go to Lesson 1",
          ctaHref: "lessons.html#lesson-1",
        },
        {
          id: "spark-streak",
          kind: "spark",
          title: "Spark Ignited",
          bo: "अरखि",
          sub: "3 quiz streak",
          cur: Math.min(3, bestStreak),
          max: 3,
          unit: "streak",
          how: "Answer 3 vocabulary cards in a row correctly in the Quiz Arena.",
          ctaLabel: "Play Quiz Arena",
          ctaHref: "quiz.html",
        },
        {
          id: "on-fire",
          kind: "flame",
          title: "Wildfire",
          bo: "अर गोनां",
          sub: "5 quiz streak",
          cur: Math.min(5, bestStreak),
          max: 5,
          unit: "streak",
          how: "Reach a streak of 5 consecutive correct answers in the Quiz Arena.",
          ctaLabel: "Play Quiz Arena",
          ctaHref: "quiz.html",
        },
        {
          id: "inferno-streak",
          kind: "phoenix",
          title: "Inferno Streak",
          bo: "गोरान अर",
          sub: "10 quiz streak",
          cur: Math.min(10, bestStreak),
          max: 10,
          unit: "streak",
          how: "Hit 10 correct answers in a row in the Quiz Arena without a mistake.",
          ctaLabel: "Challenge Quiz",
          ctaHref: "quiz.html",
        },
        {
          id: "first-word",
          kind: "ribbon",
          title: "First Word",
          bo: "गिबि सोदोब",
          sub: "Save 1 word",
          cur: Math.min(1, savedEntries.length),
          max: 1,
          unit: "word",
          how: "Tap the star icon on any Bodo word in the Dictionary (or under Saved Words below) to bookmark it.",
          ctaLabel: "Browse Dictionary",
          ctaHref: "dictionary.html",
        },
        {
          id: "word-collector",
          kind: "gem",
          title: "Lexicon Gem",
          bo: "सोदोब मुकुता",
          sub: "5 saved words",
          cur: Math.min(5, savedEntries.length),
          max: 5,
          unit: "words",
          how: "Star 5 Bodo vocabulary entries in the Dictionary to build your personal study list.",
          ctaLabel: "Browse Dictionary",
          ctaHref: "dictionary.html",
        },
        {
          id: "vault-keeper",
          kind: "sapphire",
          title: "Vault Keeper",
          bo: "सोदोब बाख्रि",
          sub: "15 saved words",
          cur: Math.min(15, savedEntries.length),
          max: 15,
          unit: "words",
          how: "Bookmark 15 Bodo words across categories in the Dictionary.",
          ctaLabel: "Open Dictionary",
          ctaHref: "dictionary.html",
        },
        {
          id: "lexicon-sage",
          kind: "amethyst",
          title: "Lexicon Sage",
          bo: "बिहुं रोंगौमान",
          sub: "30 saved words",
          cur: Math.min(30, savedEntries.length),
          max: 30,
          unit: "words",
          how: "Curate a personal lexicon of 30 starred Bodo words in the Dictionary.",
          ctaLabel: "Open Dictionary",
          ctaHref: "dictionary.html",
        },
        {
          id: "basic-master",
          kind: "medal",
          title: "Basic Honor",
          bo: "गुदि सनमान",
          sub: "4 Basic lessons",
          cur: Math.min(4, basicDone),
          max: 4,
          unit: "lessons",
          how: "Complete all 4 Basic tier lessons (Lessons 1, 2, 3, and 4).",
          ctaLabel: "Open Basic Lessons",
          ctaHref: "lessons.html#lesson-1",
        },
        {
          id: "elementary-star",
          kind: "compass",
          title: "Elementary Star",
          bo: "गेजेर हाथोर",
          sub: "4 Elem. lessons",
          cur: Math.min(4, elemDone),
          max: 4,
          unit: "lessons",
          how: "Complete all 4 Elementary tier lessons (Lessons 5, 6, 7, and 8).",
          ctaLabel: "Open Lesson 5",
          ctaHref: "lessons.html#lesson-5",
        },
        {
          id: "grammar-shield",
          kind: "aegis",
          title: "Grammar Shield",
          bo: "रावखान्थि रैखा",
          sub: "4 Inter. lessons",
          cur: Math.min(4, interDone),
          max: 4,
          unit: "lessons",
          how: "Complete all 4 Intermediate tier lessons (Lessons 9, 10, 11, and 12).",
          ctaLabel: "Open Lesson 9",
          ctaHref: "lessons.html#lesson-9",
        },
        {
          id: "adv-laureate",
          kind: "laurel",
          title: "Laureate Wreath",
          bo: "गोजौ सिरि",
          sub: "3 Adv. lessons",
          cur: Math.min(3, advDone),
          max: 3,
          unit: "lessons",
          how: "Complete all 3 Advanced tier lessons (Lessons 13, 14, and 15).",
          ctaLabel: "Open Lesson 13",
          ctaHref: "lessons.html#lesson-13",
        },
        {
          id: "halfway-scroll",
          kind: "scroll",
          title: "Halfway Scroll",
          bo: "आदामान",
          sub: "8 lessons done",
          cur: Math.min(8, p.done),
          max: 8,
          unit: "lessons",
          how: "Complete any 8 graded lessons across the SikBodo curriculum.",
          ctaLabel: "Continue Lessons",
          ctaHref: `lessons.html#lesson-${nextN}`,
        },
        {
          id: "xp-centurion",
          kind: "bolt",
          title: "100 XP Club",
          bo: "१०० XP हान्जा",
          sub: "Reach 100 XP",
          cur: Math.min(100, r.xp),
          max: 100,
          unit: "XP",
          how: "Earn 100 total XP (+50 XP per completed lesson and +10 XP per correct quiz answer).",
          ctaLabel: "Earn XP Now",
          ctaHref: "quiz.html",
        },
        {
          id: "xp-vanguard",
          kind: "sunburst",
          title: "300 XP Vanguard",
          bo: "३०० XP सिगां",
          sub: "Reach 300 XP",
          cur: Math.min(300, r.xp),
          max: 300,
          unit: "XP",
          how: "Earn 300 total XP by completing lessons and building streaks in the Quiz Arena.",
          ctaLabel: "Continue Lessons",
          ctaHref: `lessons.html#lesson-${nextN}`,
        },
        {
          id: "xp-titan",
          kind: "supernova",
          title: "600 XP Titan",
          bo: "६०० XP गोहो",
          sub: "Reach 600 XP",
          cur: Math.min(600, r.xp),
          max: 600,
          unit: "XP",
          how: "Accumulate 600 total XP across lessons and vocabulary quizzes.",
          ctaLabel: "Continue Lessons",
          ctaHref: `lessons.html#lesson-${nextN}`,
        },
        {
          id: "bodo-crown",
          kind: "crown",
          title: "Bodo Crown",
          bo: "बर'लेण्ड मुकुट",
          sub: "All 15 lessons",
          cur: p.done,
          max: total,
          unit: "lessons",
          how: "Complete all 15 graded lessons from Basic to Advanced.",
          ctaLabel: "View Lessons",
          ctaHref: `lessons.html#lesson-${nextN}`,
        },
        {
          id: "xp-grandmaster",
          kind: "grandmaster",
          title: "1000 XP Legend",
          bo: "रावखान्थि गुरु",
          sub: "Reach 1000 XP",
          cur: Math.min(1000, r.xp),
          max: 1000,
          unit: "XP",
          how: "Reach Level 10 Grandmaster standing by earning 1,000 total XP across lessons and quizzes.",
          ctaLabel: "Play Quiz Arena",
          ctaHref: "quiz.html",
        },
      ];
      const unlockedTrophies = trophies.filter((t) => t.cur >= t.max).length;

      let popupHTML = "";
      if (activePopup) {
        const pct = Math.min(100, Math.round((activePopup.cur / Math.max(1, activePopup.max)) * 100));
        const isUnlocked = activePopup.cur >= activePopup.max;
        popupHTML = `
          <div class="lp-modal-backdrop" id="lp-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="lp-modal-title">
            <div class="lp-modal">
              <button type="button" class="lp-modal-close" id="lp-modal-close" aria-label="Close popup">&#10005;</button>
              <div class="lpm-art ${isUnlocked ? "unlocked" : "locked"}">
                ${activePopup.svg}
              </div>
              <span class="lpm-status ${isUnlocked ? "ok" : "pending"}">
                ${isUnlocked ? "✓ UNLOCKED" : `LOCKED · ${pct}% COMPLETE`}
              </span>
              <h3 id="lp-modal-title" class="lpm-title">${esc(activePopup.title)}</h3>
              <span class="bo lpm-bo">${esc(activePopup.bo || "")}</span>

              <div class="lpm-box">
                <span class="lpm-box-kicker">HOW TO UNLOCK</span>
                <p>${esc(activePopup.how)}</p>
                <div class="lpm-prog-head">
                  <span>Progress</span>
                  <strong>${activePopup.cur} / ${activePopup.max} ${esc(activePopup.unit || "")}</strong>
                </div>
                <div class="lpt-bar lpm-bar">
                  <i style="width:${pct}%"></i>
                </div>
              </div>

              <div class="lpm-actions">
                <a class="btn primary small" href="${activePopup.ctaHref}">${esc(activePopup.ctaLabel)} →</a>
                <button type="button" class="btn ghost small" id="lp-modal-ok">Got it</button>
              </div>
            </div>
          </div>`;
      }

      body().innerHTML = `
        <!-- 1. COMPACT PROFILE HEADER -->
        <section class="lp-header">
          <div class="lp-user">
            <div class="lp-avatar-wrap">
              ${avatarRingSVG(r.level, r.levelPercent)}
            </div>
            <div class="lp-user-meta">
              <div class="lp-name-line">
                <div class="lp-name">${esc(prof.name)}</div>
                <button type="button" class="lp-edit-btn" id="prof-edit-toggle" title="Edit name">
                  ${editingProfile ? "Cancel" : "Edit"}
                </button>
              </div>
              <div class="lp-rank-pill">
                <span class="lp-rank-lvl">Level ${r.level} / ${ranks.length}</span>
                <strong>${esc(r.title)}</strong>
                <span class="bo lp-rank-bo">${esc(r.bo)}</span>
              </div>
            </div>
          </div>

          <div class="lp-quick-cta">
            <a class="btn primary" href="lessons.html#lesson-${nextN}">
              ${icon("lessons")} ${p.done ? `Lesson ${nextN}` : "Start Lesson 1"}
            </a>
            <a class="btn ghost" href="quiz.html">${icon("quiz")} Quiz</a>
          </div>
        </section>

        ${
          editingProfile
            ? `<form class="lp-inline-edit" id="prof-editor-form">
                <input id="pe-name-input" class="field" type="text" maxlength="32" value="${esc(prof.name)}" placeholder="Your name" aria-label="Learner name">
                <button type="submit" class="btn primary small">Save</button>
              </form>`
            : ""
        }

        <!-- 2. EYE-CATCHING VISUAL HERO WIDGETS: XP + ANIMATED FIRE STREAK + TROPHIES -->
        <section class="lp-vitrine" aria-label="Learner highlights">
          <!-- XP Power Showcase -->
          <div class="lp-card lp-card-xp">
            <div class="lp-card-top">
              ${xpCrestSVG()}
              <div class="lp-xp-main">
                <span class="lp-card-kicker">EXPERIENCE POINTS</span>
                <div class="lp-xp-number">
                  <strong>${r.xp}</strong>
                  <span>XP</span>
                </div>
              </div>
            </div>
            <div class="lp-xp-meter">
              <div class="lp-xp-labels">
                <span>Lv.${r.level} ${esc(r.title)}</span>
                <span>${r.xp} / ${r.nextXp} XP</span>
              </div>
              <div class="lp-xp-bar" role="progressbar" aria-valuenow="${r.levelPercent}" aria-valuemin="0" aria-valuemax="100">
                <i style="width:${r.levelPercent}%"></i>
              </div>
            </div>
          </div>

          <!-- Animated Fire Streak Showcase -->
          <div class="lp-card lp-card-fire ${bestStreak > 0 ? "active" : ""}">
            <div class="lp-card-top">
              ${animatedFireSVG(bestStreak > 0)}
              <div class="lp-fire-main">
                <span class="lp-card-kicker">BEST STREAK</span>
                <div class="lp-fire-number">
                  <strong>${bestStreak}</strong>
                  <span>in a row</span>
                </div>
              </div>
            </div>
            <div class="lp-card-foot">
              <span>${bestStreak > 0 ? "Flame lit in Quiz Arena" : "Play Quiz to light your flame"}</span>
              <a href="quiz.html">Quiz →</a>
            </div>
          </div>

          <!-- Trophies & Mastery Showcase -->
          <div class="lp-card lp-card-mastery">
            <div class="lp-card-top">
              <div class="lp-mini-trophy">${trophySVG("cup")}</div>
              <div class="lp-fire-main">
                <span class="lp-card-kicker">TROPHIES &amp; LESSONS</span>
                <div class="lp-mastery-number">
                  <strong>${unlockedTrophies}<small>/${trophies.length}</small></strong>
                  <span>· ${p.done}/${p.total} lessons</span>
                </div>
              </div>
            </div>
            <div class="lp-xp-meter">
              <div class="lp-xp-labels">
                <span>Course Mastery</span>
                <span>${p.percent}%</span>
              </div>
              <div class="progress">
                <i style="width:${p.percent}%"></i>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. TROPHY CASE (18 CLICKABLE SVG VECTOR BADGES) -->
        <section class="lp-section">
          <div class="lp-sec-head">
            <h2>Trophies &amp; Badges</h2>
            <span class="lp-sec-count">${unlockedTrophies} / ${trophies.length} Unlocked · Tap any badge for details</span>
          </div>
          <div class="lp-trophy-grid">
            ${trophies
              .map((t) => {
                const unlocked = t.cur >= t.max;
                const pct = Math.min(100, Math.round((t.cur / t.max) * 100));
                return `<button type="button" class="lp-trophy-card ${unlocked ? "unlocked" : "locked"}" data-trophy-id="${t.id}">
                  <div class="lpt-art">${trophySVG(t.kind)}</div>
                  <strong class="lpt-title">${esc(t.title)}</strong>
                  <span class="lpt-sub">${esc(t.sub)}</span>
                  <div class="lpt-bar">
                    <i style="width:${pct}%"></i>
                  </div>
                  <span class="lpt-prog">${unlocked ? "✓ Unlocked" : `${t.cur} / ${t.max}`}</span>
                </button>`;
              })
              .join("")}
          </div>
        </section>

        <!-- 4. 10-LEVEL RANK ROADMAP (CLICKABLE LEVELS) -->
        <section class="lp-section">
          <div class="lp-sec-head">
            <h2>10 Mastery Levels</h2>
            <span class="lp-sec-count">Current: Lv.${r.level} ${esc(r.title)} · Tap any level to inspect</span>
          </div>
          <div class="lp-ranks-strip">
            ${ranks
              .map((rk) => {
                const isCurrent = rk.level === r.level;
                const isUnlocked = r.xp >= rk.minXp;
                return `<button type="button" class="lpr-step ${isCurrent ? "current" : ""} ${isUnlocked ? "unlocked" : "locked"}" data-level-id="${rk.level}">
                  <div class="lpr-top">
                    <span class="lpr-badge">Lv.${rk.level}</span>
                    <span class="lpr-xp">${rk.minXp} XP</span>
                  </div>
                  <strong>${esc(rk.title)}</strong>
                  <span class="bo lpr-bo">${esc(rk.bo)}</span>
                </button>`;
              })
              .join("")}
          </div>
        </section>

        <!-- 5. VISUAL LESSON PROGRESS (COMPACT INTERACTIVE NODES) -->
        <section class="lp-section">
          <div class="lp-sec-head">
            <h2>Lessons</h2>
            <span class="lp-sec-count">${p.done} / ${p.total} Completed · Tap ✓ to toggle (+50 XP)</span>
          </div>
          <div class="lp-tiers">
            ${levels
              .map((lv) => {
                const items = B.lessons.filter((l) => l.level === lv);
                const doneCount = items.filter((l) => AX.store.progress.isRead(l.n)).length;
                return `<div class="lp-tier-block">
                  <div class="lpt-head">
                    <span class="level-tag lv-${lv.toLowerCase()}">${lv}</span>
                    <span class="lpt-stat">${doneCount} / ${items.length}</span>
                  </div>
                  <div class="lp-node-grid">
                    ${items
                      .map((l) => {
                        const done = AX.store.progress.isRead(l.n);
                        return `<div class="lp-lesson-chip ${done ? "done" : ""}">
                          <button type="button" class="lplc-check" data-toggle-lesson="${l.n}" aria-label="${done ? `Unmark Lesson ${l.n}` : `Complete Lesson ${l.n}`}" title="Toggle complete (+50 XP)">
                            ${done ? icon("check") : l.n}
                          </button>
                          <a href="lessons.html#lesson-${l.n}" class="lplc-title">
                            <strong>${esc(l.title)}</strong>
                            <small>${done ? "+50 XP earned" : "50 XP"}</small>
                          </a>
                        </div>`;
                      })
                      .join("")}
                  </div>
                </div>`;
              })
              .join("")}
          </div>
        </section>

        <!-- 6. SAVED WORDS (COMPACT CHIPS) -->
        <section class="lp-section">
          <div class="lp-sec-head">
            <h2>Saved Words (${savedEntries.length})</h2>
            <a class="sec-link" href="dictionary.html">Dictionary ${icon("arrow")}</a>
          </div>
          <div class="lp-word-grid">
            ${(savedEntries.length ? savedEntries : suggestedWords)
              .map((d) => {
                const isStarred = savedKeys.has(d.en);
                return `<div class="lp-word-chip">
                  <div>
                    <span class="bo lpw-bo">${esc(d.bo)}</span>
                    <strong class="lpw-en">${esc(d.en)}</strong>
                  </div>
                  <button type="button" class="dict-star ${isStarred ? "active" : ""}" data-unstar="${esc(d.en)}" aria-label="Toggle star for ${esc(d.en)}">
                    ${icon("star")}
                  </button>
                </div>`;
              })
              .join("")}
          </div>
        </section>

        <!-- 7. MINIMAL DATA CONTROLS -->
        <section class="lp-foot-bar">
          <div class="ledger-actions">
            <button type="button" class="btn ghost small" id="prof-export-json">Export Backup</button>
            <label class="btn ghost small" for="prof-import-input" style="cursor:pointer">
              Restore Backup
              <input type="file" id="prof-import-input" accept="application/json,.json" class="visually-hidden">
            </label>
            ${
              !confirmReset
                ? `<button type="button" class="btn subtle small" id="prof-reset-ask">${icon("reset")} Reset</button>`
                : `<span class="reset-confirm-bar">
                    <strong>Reset all progress?</strong>
                    <button type="button" class="btn primary small" id="prof-reset-confirm" style="background:var(--danger);border-color:var(--danger)">Yes</button>
                    <button type="button" class="btn ghost small" id="prof-reset-cancel">No</button>
                  </span>`
            }
          </div>
          ${ledgerNotice ? `<span class="ledger-notice" role="status">${esc(ledgerNotice)}</span>` : ""}
        </section>
        ${popupHTML}`;

      /* --- Event bindings --- */
      body().querySelectorAll("[data-trophy-id]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-trophy-id");
          const t = trophies.find((x) => x.id === id);
          if (!t) return;
          if (AX.sfx) {
            if (t.cur >= t.max) AX.sfx.pop();
            else AX.sfx.card();
          }
          activePopup = {
            svg: trophySVG(t.kind),
            title: t.title,
            bo: t.bo,
            cur: t.cur,
            max: t.max,
            unit: t.unit,
            how: t.how,
            ctaLabel: t.ctaLabel,
            ctaHref: t.ctaHref,
          };
          drawProgressPage();
        });
      });

      body().querySelectorAll("[data-level-id]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const lv = Number(btn.getAttribute("data-level-id"));
          const rk = ranks.find((x) => x.level === lv);
          if (!rk) return;
          if (AX.sfx) {
            if (r.xp >= rk.minXp) AX.sfx.pop();
            else AX.sfx.card();
          }
          const target = Math.max(1, rk.minXp);
          activePopup = {
            svg: avatarRingSVG(rk.level, r.xp >= rk.minXp ? 100 : Math.min(99, Math.round((r.xp / target) * 100))),
            title: `Level ${rk.level}: ${rk.title}`,
            bo: rk.bo,
            cur: rk.minXp === 0 ? 1 : Math.min(rk.minXp, r.xp),
            max: rk.minXp === 0 ? 1 : rk.minXp,
            unit: rk.minXp === 0 ? "level" : "XP",
            how: `${rk.milestone} (${rk.focus})`,
            ctaLabel: `Continue Lesson ${nextN}`,
            ctaHref: `lessons.html#lesson-${nextN}`,
          };
          drawProgressPage();
        });
      });

      const closePopup = () => {
        if (!activePopup) return;
        activePopup = null;
        if (AX.sfx) AX.sfx.tap();
        drawProgressPage();
      };

      const modalClose = document.getElementById("lp-modal-close");
      if (modalClose) modalClose.addEventListener("click", closePopup);
      const modalOk = document.getElementById("lp-modal-ok");
      if (modalOk) modalOk.addEventListener("click", closePopup);
      const modalBackdrop = document.getElementById("lp-modal-backdrop");
      if (modalBackdrop) {
        modalBackdrop.addEventListener("click", (e) => {
          if (e.target === modalBackdrop) closePopup();
        });
      }
      const editToggle = document.getElementById("prof-edit-toggle");
      if (editToggle) {
        editToggle.addEventListener("click", () => {
          editingProfile = !editingProfile;
          drawProgressPage();
        });
      }

      const editorForm = document.getElementById("prof-editor-form");
      if (editorForm) {
        editorForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const nameInput = document.getElementById("pe-name-input");
          AX.store.profile.set({
            name: nameInput ? nameInput.value : prof.name,
          });
          editingProfile = false;
          if (AX.sfx) AX.sfx.pop();
          drawProgressPage();
        });
      }

      body().querySelectorAll("[data-toggle-lesson]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const n = Number(btn.getAttribute("data-toggle-lesson"));
          const nowDone = !AX.store.progress.isRead(n);
          AX.store.progress.setRead(n, nowDone);
          if (AX.sfx) {
            if (nowDone) AX.sfx.complete();
            else AX.sfx.tap();
          }
          document.dispatchEvent(new Event("ax:progress"));
          drawProgressPage();
        });
      });

      body().querySelectorAll("[data-unstar]").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (AX.sfx) AX.sfx.pop();
          AX.store.saved.toggle(btn.getAttribute("data-unstar"));
          drawProgressPage();
        });
      });

      const exportBtn = document.getElementById("prof-export-json");
      if (exportBtn) {
        exportBtn.addEventListener("click", () => {
          const payload = JSON.stringify(AX.store.progress.exportRecord(), null, 2);
          const blob = new Blob([payload], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "luitra-profile.json";
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
          if (AX.sfx) AX.sfx.pop();
          ledgerNotice = "Backup saved.";
          drawProgressPage();
        });
      }

      const importInput = document.getElementById("prof-import-input");
      if (importInput) {
        importInput.addEventListener("change", (e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const parsed = JSON.parse(String(reader.result || "{}"));
              if (AX.store.progress.importRecord(parsed)) {
                if (AX.sfx) AX.sfx.complete();
                ledgerNotice = "Profile restored.";
              }
            } catch (err) {
              ledgerNotice = "Invalid file.";
            }
            drawProgressPage();
          };
          reader.readAsText(file);
        });
      }

      const askBtn = document.getElementById("prof-reset-ask");
      if (askBtn) {
        askBtn.addEventListener("click", () => {
          confirmReset = true;
          drawProgressPage();
        });
      }
      const cancelBtn = document.getElementById("prof-reset-cancel");
      if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
          confirmReset = false;
          drawProgressPage();
        });
      }
      const confirmBtn = document.getElementById("prof-reset-confirm");
      if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {
          AX.store.progress.clear();
          confirmReset = false;
          ledgerNotice = "Progress reset.";
          document.dispatchEvent(new Event("ax:progress"));
          drawProgressPage();
        });
      }
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && activePopup) {
        activePopup = null;
        if (AX.sfx) AX.sfx.tap();
        drawProgressPage();
      }
    });

    drawProgressPage();
  }

  /* ---------------------------------------------------------- IDIOMS */
  function idioms() {
    const d = B.idioms;
    const label = (t) => `<span style="font-family:var(--font-bo);font-weight:600;color:var(--muted);font-size:var(--fs-sm)">${t}</span>`;
    const rows = (arr) =>
      arr.map((x) => [
        `<span class="bo">${esc(x.bo)}</span><br><span class="rom">${esc(x.rom)}</span>`,
        esc(x.literal || ""),
        esc(x.meaning)
      ]);

    body().innerHTML = `
      <p class="prose">${esc(d.intro)}</p>

      <h2>Idioms ${label("सोदोब")}</h2>
      <p class="prose">A fixed phrase whose meaning is not the sum of its words.</p>
      ${table(["Bodo", "Literal image", "Meaning"], rows(d.idioms))}

      <h2>Proverbs ${label("गोहो")}</h2>
      <p class="prose">A whole piece of folk wisdom in a single line.</p>
      ${table(["Bodo", "Literal image", "Meaning"], rows(d.proverbs))}

      <h2>Things to know</h2>
      ${notesList(d.notes)}`;
  }

  /* ---------------------------------------------------------- READING */
  function reading() {
    const r = B.reading;
    const passages = r.passages
      .map((p) => {
        const paras = p.text
          .map(
            (t, i) => `<div class="rd-para">
              <p class="rd-text">${esc(t)}</p>
              <p class="rom rd-rom">${esc(p.rom[i])}</p>
              <p class="rd-en">${esc(p.en[i])}</p>
            </div>`
          )
          .join("");
        const qs = p.questions
          .map(
            (q) => `<li class="rd-q">
              <p class="rd-question">${esc(q.q)} <span class="rd-qen">${esc(q.qEn)}</span></p>
              <details class="rd-answer"><summary>Show answer</summary>
                <p class="rd-text">${esc(q.a)}</p>
                <p class="rd-en">${esc(q.aEn)}</p>
              </details>
            </li>`
          )
          .join("");
        return `<section class="section rd-passage" id="${esc(p.id)}">
            <div class="rd-head"><h2>${esc(p.title)}</h2><span class="rd-level">${esc(p.level)}</span></div>
            <p class="rd-title-en">${esc(p.titleEn)}</p>
            ${paras}
            <h3 class="rd-sub">Comprehension</h3>
            <ol class="rd-questions">${qs}</ol>
            ${p.note ? `<p class="rd-note">${icon("info")} <span><strong>Note:</strong> ${esc(p.note)}</span></p>` : ""}
          </section>`;
      })
      .join("");

    body().innerHTML = `
      <p class="prose">${esc(r.intro)}</p>
      <h2>How to use these passages</h2>
      <ol class="rd-howto">${r.howTo.map((h) => `<li>${esc(h)}</li>`).join("")}</ol>
      <h2>Reading passages</h2>
      ${passages}
      <h2>Writing in Bodo</h2>
      <p class="prose">${esc(r.writing.intro)}</p>
      ${table(r.writing.table.head, r.writing.table.rows, r.writing.table.caption)}
      ${notesList(r.writing.notes)}`;
  }

  AX.render = { home, lessons, progress, script, grammar, verbs, numbers, dictionary, idioms, phrases, conversations, reading, culture, resources, about, contribute };
})();
