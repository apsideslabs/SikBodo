/* ============================================================
   SikBodo — storage & gamified mastery state
   Thin, failure-tolerant wrapper over localStorage with real-time
   XP, level progression, streaks, and bookmarked vocabulary.
   ============================================================ */

(function () {
  const AX = (window.AX = window.AX || {});
  const PREFIX = "sikbodo.";
  const memory = new Map();

  let usable = true;
  try {
    const probe = PREFIX + "__probe__";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
  } catch (e) {
    usable = false;
  }

  function get(key, fallback) {
    const k = PREFIX + key;
    try {
      const raw = usable ? window.localStorage.getItem(k) : memory.get(k);
      if (raw == null) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function set(key, value) {
    const k = PREFIX + key;
    const raw = JSON.stringify(value);
    try {
      if (usable) window.localStorage.setItem(k, raw);
      else memory.set(k, raw);
    } catch (e) {
      memory.set(k, raw);
    }
    return value;
  }

  function remove(key) {
    const k = PREFIX + key;
    try { if (usable) window.localStorage.removeItem(k); } catch (e) {}
    memory.delete(k);
  }

  /* ---------- lesson progress & XP mastery ---------- */
  const LESSONS_KEY = "lessons.read";
  const BONUS_XP_KEY = "xp.bonus";
  const STREAK_KEY = "quiz.bestStreak";
  const SAVED_WORDS_KEY = "words.saved";
  const PROFILE_KEY = "learner.profile";
  const SEEN_ACH_KEY = "achievements.seen";
  const SEEN_LVL_KEY = "level.seen";

  const RANKS = [
    { level: 1, title: "Initiate", minXp: 0, nextXp: 50,
      focus: "Starting your Bodo journey — the script and your first greetings.",
      milestone: "Unlocked automatically when you begin learning." },
    { level: 2, title: "Sound Seeker", minXp: 50, nextXp: 120,
      focus: "The six vowels, the consonants Bodo reads differently, the vowel /ɯ/, and the two tones.",
      milestone: "Earn 50 XP — complete 1 lesson (+50 XP) or answer 5 quiz cards (+10 XP each)." },
    { level: 3, title: "Script Reader", minXp: 120, nextXp: 200,
      focus: "Reading the Devanagari letters as Bodo reads them, and the final vowel Bodo keeps.",
      milestone: "Reach 120 XP by completing 2–3 lessons or practising in the Quiz Arena." },
    { level: 4, title: "Word Gatherer", minXp: 200, nextXp: 300,
      focus: "Core everyday nouns, the pronouns, and the family and kinship set.",
      milestone: "Reach 200 XP — complete all 4 Basic tier lessons (L1–L4)." },
    { level: 5, title: "Phrase Builder", minXp: 300, nextXp: 420,
      focus: "SOV word order, the existential दों (dong) forms, and polite requests.",
      milestone: "Reach 300 XP — complete 6 lessons or combine lessons with Quiz streaks." },
    { level: 6, title: "Syntax Weaver", minXp: 420, nextXp: 550,
      focus: "Case markers (-ni, -khou, -nw, -yao, -jwng, -nifrai) and classifiers.",
      milestone: "Reach 420 XP — finish the Elementary tier (L5–L8) and drill vocabulary." },
    { level: 7, title: "Sound Keeper", minXp: 550, nextXp: 700,
      focus: "Tone, the /ɯ/ and /z/ sounds, and natural connected speech.",
      milestone: "Reach 550 XP — complete 11 lessons or earn bonus XP in the Quiz Arena." },
    { level: 8, title: "Conversationalist", minXp: 700, nextXp: 850,
      focus: "Tense and aspect, negation, and multi-turn Bodo dialogues.",
      milestone: "Reach 700 XP — complete 12+ lessons and practise real-world dialogues." },
    { level: 9, title: "Story Keeper", minXp: 850, nextXp: 1000,
      focus: "Aspect chains, compound verbs, and intermediate narrative clauses.",
      milestone: "Reach 850 XP — complete all 15 lessons (750 XP) + 100 XP from quizzes." },
    { level: 10, title: "Grammar Architect", minXp: 1000, nextXp: 1200,
      focus: "Clause chaining, subordination, and complex SOV sentence synthesis.",
      milestone: "Reach 1,000 XP across lessons and Quiz Arena rounds." },
    { level: 11, title: "Lexicon Master", minXp: 1200, nextXp: 1400,
      focus: "Deep retention of Bodo vocabulary across kinship, nature, verbs and culture.",
      milestone: "Reach 1,200 XP by mastering flashcards and multiple-choice vocabulary rounds." },
    { level: 12, title: "Proverb Sage", minXp: 1400, nextXp: 1650,
      focus: "Idiomatic Bodo, its sayings and proverbs, and the formal registers.",
      milestone: "Reach 1,400 XP through sustained quiz streaks and curriculum mastery." },
    { level: 13, title: "Bodo Scholar", minXp: 1650, nextXp: 1900,
      focus: "Literary vs colloquial Bodo, historical phonology, and morphology.",
      milestone: "Reach 1,650 XP — elite fluency across grammar, script and lexicon." },
    { level: 14, title: "Grandmaster", minXp: 1900, nextXp: 2200,
      focus: "Complete command of the Bodo grammar reference and the dictionary.",
      milestone: "Reach 1,900 XP across all lessons and high-streak Quiz Arena sessions." },
    { level: 15, title: "Bodo Laureate", minXp: 2200, nextXp: 2500,
      focus: "Pinnacle rank of SikBodo — guardian of the Bodo language, script and heritage.",
      milestone: "Reach 2,200 XP to claim the highest honour on SikBodo." },
  ];

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
      <text x="44" y="49" text-anchor="middle" fill="#ffffff" font-family="var(--font-display)" font-weight="800" font-size="17">L${level}</text>
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
      case "footprints":
        return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
          <circle cx="28" cy="28" r="20" fill="#0ea5e9" stroke="#bae6fd" stroke-width="2"/>
          <ellipse cx="22" cy="24" rx="4.5" ry="7" transform="rotate(-12 22 24)" fill="#ffffff"/>
          <circle cx="20" cy="14" r="2" fill="#e0f2fe"/>
          <circle cx="24" cy="14" r="1.8" fill="#e0f2fe"/>
          <ellipse cx="34" cy="33" rx="4.5" ry="7" transform="rotate(12 34 33)" fill="#fde047"/>
          <circle cx="32" cy="23" r="2" fill="#fef08a"/>
          <circle cx="36" cy="23" r="1.8" fill="#fef08a"/>
        </svg>`;
      case "lantern":
        return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
          <rect x="22" y="9" width="12" height="4" rx="2" fill="#b45309"/>
          <path d="M18 15 H38 L41 28 L36 42 H20 L15 28 Z" fill="#f59e0b" stroke="#fde047" stroke-width="1.8"/>
          <ellipse cx="28" cy="28" rx="7" ry="9" fill="#fef9c3"/>
          <path d="M28 22 C28 22 32 26 32 30 C32 32.5 30.2 34 28 34 C25.8 34 24 32.5 24 30 C24 26 28 22 28 22 Z" fill="#ea580c"/>
          <rect x="21" y="42" width="14" height="4" rx="2" fill="#b45309"/>
        </svg>`;
      case "wings":
        return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
          <path d="M28 32 C19 32 10 25 8 15 C14 16 20 20 24 26 Z" fill="#fbbf24"/>
          <path d="M28 32 C37 32 46 25 48 15 C42 16 36 20 32 26 Z" fill="#fbbf24"/>
          <path d="M28 38 C18 38 11 33 10 24 C16 25 21 28 25 33 Z" fill="#f59e0b"/>
          <path d="M28 38 C38 38 45 33 46 24 C40 25 35 28 31 33 Z" fill="#f59e0b"/>
          <polygon points="28,12 34,26 28,44 22,26" fill="#fef08a" stroke="#d97706" stroke-width="1.8"/>
        </svg>`;
      case "lotus":
        return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
          <path d="M28 11 C33 19 35 28 28 38 C21 28 23 19 28 11 Z" fill="#f43f5e"/>
          <path d="M28 38 C19 35 13 26 15 17 C22 21 25 28 28 38 Z" fill="#fb7185"/>
          <path d="M28 38 C37 35 43 26 41 17 C34 21 31 28 28 38 Z" fill="#fb7185"/>
          <path d="M28 40 C16 40 9 34 8 26 C16 27 22 32 28 40 Z" fill="#fda4af"/>
          <path d="M28 40 C40 40 47 34 48 26 C40 27 34 32 28 40 Z" fill="#fda4af"/>
          <ellipse cx="28" cy="42" rx="14" ry="3.5" fill="#10b981"/>
        </svg>`;
      case "target":
        return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
          <circle cx="28" cy="28" r="20" fill="#ef4444" stroke="#fecaca" stroke-width="2"/>
          <circle cx="28" cy="28" r="14" fill="#ffffff"/>
          <circle cx="28" cy="28" r="9" fill="#ef4444"/>
          <circle cx="28" cy="28" r="4.5" fill="#fde047"/>
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
      case "comet":
        return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
          <path d="M10 46 L26 22 L34 30 Z" fill="#38bdf8" opacity="0.75"/>
          <path d="M14 42 L30 24 L32 26 Z" fill="#bae6fd"/>
          <polygon points="35,11 38,19 46,20 40,25 42,33 35,29 28,33 30,25 24,20 32,19" fill="#fde047" stroke="#f59e0b" stroke-width="1.5"/>
        </svg>`;
      case "phoenix":
        return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
          <polygon points="28,6 48,17 48,39 28,50 8,39 8,17" fill="#dc2626" stroke="#fca5a5" stroke-width="1.8"/>
          <path d="M28 12 C28 12 41 22 41 34 C41 41.5 35.2 46 28 46 C20.8 46 15 41.5 15 34 C15 22 28 12 28 12 Z" fill="#f97316"/>
          <path d="M20 26 C14 23 11 17 13 13 C17 16 21 20 23 24 Z" fill="#fde047"/>
          <path d="M36 26 C42 23 45 17 43 13 C39 16 35 20 33 24 Z" fill="#fde047"/>
          <path d="M28 20 C28 20 35 27 35 34 C35 38.5 31.8 42 28 42 C24.2 42 21 38.5 21 34 C21 27 28 20 28 20 Z" fill="#fef08a"/>
        </svg>`;
      case "dragon":
        return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
          <circle cx="28" cy="28" r="20" fill="#7f1d1d" stroke="#f87171" stroke-width="2"/>
          <path d="M16 36 C15 25 22 15 34 15 C31 20 33 24 39 24 C35 31 28 39 16 36 Z" fill="#f97316"/>
          <polygon points="28,12 31,20 39,20 33,25 35,33 28,28 21,33 23,25 17,20 25,20" fill="#fde047"/>
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
      case "prism":
        return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
          <polygon points="28,7 48,43 8,43" fill="#06b6d4" stroke="#a5f3fc" stroke-width="2"/>
          <polygon points="28,14 41,39 15,39" fill="#67e8f9"/>
          <polygon points="28,21 35,35 21,35" fill="#ecfeff"/>
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
      case "throne":
        return `<svg viewBox="0 0 56 56" class="tr-svg" aria-hidden="true">
          <polygon points="28,4 50,16 50,40 28,52 6,40 6,16" fill="#f59e0b" stroke="#fef08a" stroke-width="2"/>
          <polygon points="28,9 45,19 45,37 28,47 11,37 11,19" fill="#b45309"/>
          <path d="M16 34 L19 18 L24 25 L28 14 L32 25 L37 18 L40 34 Z" fill="#fef08a"/>
          <circle cx="28" cy="29" r="3" fill="#ef4444"/>
          <rect x="16" y="36" width="24" height="4" rx="2" fill="#fde047"/>
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

  const DEFAULT_PROFILE = {
    name: "Bodo Learner",
    focus: "Complete Curriculum",
    targetXp: 250,
  };

  const profile = {
    get() {
      const raw = get(PROFILE_KEY, null);
      if (!raw || typeof raw !== "object") return { ...DEFAULT_PROFILE };
      return {
        name: String(raw.name || DEFAULT_PROFILE.name).trim().slice(0, 40) || DEFAULT_PROFILE.name,
        focus: String(raw.focus || DEFAULT_PROFILE.focus),
        targetXp: Number(raw.targetXp) || DEFAULT_PROFILE.targetXp,
      };
    },
    set(patch) {
      const next = { ...profile.get(), ...(patch || {}) };
      next.name = String(next.name || DEFAULT_PROFILE.name).trim().slice(0, 40) || DEFAULT_PROFILE.name;
      next.targetXp = Number(next.targetXp) || DEFAULT_PROFILE.targetXp;
      set(PROFILE_KEY, next);
      document.dispatchEvent(new Event("ax:progress"));
      return next;
    },
    clear() {
      remove(PROFILE_KEY);
    },
  };

  const progress = {
    list() {
      const v = get(LESSONS_KEY, []);
      return Array.isArray(v) ? v : [];
    },
    isRead(n) {
      return progress.list().indexOf(Number(n)) !== -1;
    },
    setRead(n, on) {
      const num = Number(n);
      let list = progress.list();
      if (on) {
        if (list.indexOf(num) === -1) list = list.concat(num);
      } else {
        list = list.filter((x) => x !== num);
      }
      set(LESSONS_KEY, list.sort((a, b) => a - b));
      if (on) daily.add(50);
      return list;
    },
    count(total) {
      const done = progress.list().filter((n) => n >= 1 && n <= total).length;
      return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
    },
    nextLesson(total) {
      const doneList = progress.list();
      for (let i = 1; i <= (total || 15); i++) {
        if (doneList.indexOf(i) === -1) return i;
      }
      return 1;
    },
    xp(totalLessons) {
      const done = progress.count(totalLessons || 15).done;
      const bonus = Number(get(BONUS_XP_KEY, 0)) || 0;
      return done * 50 + bonus;
    },
    addBonusXp(pts) {
      const cur = Number(get(BONUS_XP_KEY, 0)) || 0;
      const next = Math.max(0, cur + Number(pts || 0));
      set(BONUS_XP_KEY, next);
      daily.add(pts);
      document.dispatchEvent(new Event("ax:progress"));
      return next;
    },
    bestStreak() {
      return Number(get(STREAK_KEY, 0)) || 0;
    },
    recordStreak(s) {
      const best = progress.bestStreak();
      if (s > best) set(STREAK_KEY, s);
      return Math.max(best, s);
    },
    rank(totalLessons) {
      const xp = progress.xp(totalLessons || 15);
      let currentRank = RANKS[0];
      for (let i = 0; i < RANKS.length; i++) {
        if (xp >= RANKS[i].minXp) currentRank = RANKS[i];
      }
      const span = Math.max(1, currentRank.nextXp - currentRank.minXp);
      const into = Math.min(span, Math.max(0, xp - currentRank.minXp));
      const levelPercent = Math.min(100, Math.round((into / span) * 100));
      return {
        level: currentRank.level,
        title: currentRank.title,
        bo: currentRank.bo || "",
        xp,
        nextXp: currentRank.nextXp,
        levelPercent,
      };
    },
    clear() {
      remove(LESSONS_KEY);
      remove(BONUS_XP_KEY);
      remove(STREAK_KEY);
    },
    exportRecord() {
      return {
        platform: "SikBodo",
        version: 1,
        exportedAt: new Date().toISOString().slice(0, 10),
        profile: profile.get(),
        lessonsRead: progress.list(),
        bonusXp: Number(get(BONUS_XP_KEY, 0)) || 0,
        bestStreak: progress.bestStreak(),
        savedWords: saved.list(),
      };
    },
    importRecord(data) {
      if (!data || typeof data !== "object") return false;
      if (data.profile && typeof data.profile === "object") {
        profile.set(data.profile);
      }
      if (Array.isArray(data.lessonsRead)) {
        const clean = data.lessonsRead
          .map((n) => Number(n))
          .filter((n) => Number.isFinite(n) && n >= 1 && n <= 50);
        set(LESSONS_KEY, Array.from(new Set(clean)).sort((a, b) => a - b));
      }
      if (typeof data.bonusXp === "number") {
        set(BONUS_XP_KEY, Math.max(0, Math.round(data.bonusXp)));
      }
      if (typeof data.bestStreak === "number") {
        set(STREAK_KEY, Math.max(0, Math.round(data.bestStreak)));
      }
      if (Array.isArray(data.savedWords)) {
        set(
          SAVED_WORDS_KEY,
          Array.from(new Set(data.savedWords.map((w) => String(w))))
        );
      }
      document.dispatchEvent(new Event("ax:progress"));
      return true;
    },
    RANKS,
  };

  /* ---------- saved / starred dictionary words ---------- */
  const saved = {
    list() {
      const v = get(SAVED_WORDS_KEY, []);
      return Array.isArray(v) ? v : [];
    },
    has(en) {
      return saved.list().indexOf(String(en)) !== -1;
    },
    toggle(en) {
      const key = String(en);
      let list = saved.list();
      const exists = list.indexOf(key) !== -1;
      if (exists) list = list.filter((x) => x !== key);
      else list = list.concat(key);
      set(SAVED_WORDS_KEY, list);
      return !exists;
    },
    clear() {
      remove(SAVED_WORDS_KEY);
    },
  };

  /* ---------- visit streak & daily goal ---------- */
  const VISIT_KEY = "visit.log";
  const DAILY_KEY = "daily.xp";

  function ymd(d) {
    d = d || new Date();
    const z = (n) => String(n).padStart(2, "0");
    return d.getFullYear() + "-" + z(d.getMonth() + 1) + "-" + z(d.getDate());
  }

  const visit = {
    get() {
      const v = get(VISIT_KEY, null);
      if (!v || typeof v !== "object") return { last: null, streak: 0, best: 0 };
      return { last: v.last || null, streak: Number(v.streak) || 0, best: Number(v.best) || 0 };
    },
    /* Record today's visit and roll the day-streak forward. Idempotent per day. */
    touch() {
      const t = ymd();
      const v = visit.get();
      if (v.last === t) return v;
      const y = ymd(new Date(Date.now() - 86400000));
      const streak = v.last === y ? v.streak + 1 : 1;
      const next = { last: t, streak, best: Math.max(v.best, streak) };
      set(VISIT_KEY, next);
      document.dispatchEvent(new Event("ax:progress"));
      return next;
    },
    clear() { remove(VISIT_KEY); },
  };

  const daily = {
    goal() { return 50; },
    get() {
      const d = get(DAILY_KEY, null);
      const t = ymd();
      if (!d || typeof d !== "object" || d.date !== t) return { date: t, xp: 0 };
      return { date: t, xp: Number(d.xp) || 0 };
    },
    add(pts) {
      const cur = daily.get();
      const next = { date: cur.date, xp: Math.max(0, cur.xp + Number(pts || 0)) };
      set(DAILY_KEY, next);
      return next;
    },
    percent() {
      return Math.min(100, Math.round((daily.get().xp / daily.goal()) * 100));
    },
    clear() { remove(DAILY_KEY); },
  };

  AX.store = { get, set, remove, profile, progress, saved, visit, daily, isPersistent: () => usable };
})();
