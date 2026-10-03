/* ============================================================
   SikBodo — contribute
   Everything a visitor needs in order to correct, add to or
   improve this platform — including the no-code route.
   ============================================================ */

window.SKB = window.SKB || {};

window.SKB.contribute = {
  intro:
    "SikBodo is a community resource, not a finished product. Every word, phrase and table in it can be improved by someone who knows Bodo better than the compiler does — and that includes you. You do not need to write code, and you do not need a GitHub account to start.",

  why: [
    {
      icon: "target",
      title: "Accuracy comes from speakers",
      text: "This platform was compiled from published sources, not from native fluency. A single speaker correcting one entry is worth more than any amount of further reading."
    },
    {
      icon: "globe",
      title: "Bodo is not one thing",
      text: "Western, Eastern and Southern Bodo differ in real ways, and the Mech variety of West Bengal and Nepal is close kin. Recording which form belongs to which region turns a limitation into a feature — the platform can document variation instead of hiding it."
    },
    {
      icon: "users",
      title: "Coverage grows only if people add",
      text: "A language needs thousands of entries. Every word you add is one a learner will meet tomorrow."
    },
    {
      icon: "shield",
      title: "The hard cases need care",
      text: "Tone is not marked in the everyday spelling, and the romanisation varies between sources. Only speakers can settle what is right, and flag where a form is uncertain."
    }
  ],

  roles: [
    {
      icon: "users",
      title: "Speakers and teachers",
      text: "You are the highest-value contributor. You can confirm or correct anything, and you can tell us which form belongs to your area.",
      can: [
        "Correct a dictionary entry or a phrase",
        "Confirm the tone and pronunciation of a word",
        "Add a proverb, idiom or song from your village",
        "Review a grammar table for accuracy"
      ]
    },
    {
      icon: "idea",
      title: "Writers and translators",
      text: "You can grow the reading material and the phrasebook, and help keep the English renderings natural.",
      can: [
        "Add a graded reading passage",
        "Write a dialogue for a setting we are missing",
        "Improve an English gloss or a romanisation",
        "Translate a section into Bodo"
      ]
    },
    {
      icon: "handshake",
      title: "Developers and designers",
      text: "The platform is plain HTML, CSS and JavaScript with no build step — the files are exactly what the browser runs.",
      can: [
        "Fix a bug or improve accessibility",
        "Add a feature that keeps the no-dependency rule",
        "Improve the layout or the print stylesheet",
        "Help the service worker and the offline experience"
      ]
    }
  ],

  tasks: [
    {
      icon: "star",
      title: "Correct one word",
      effort: "2 minutes",
      text: "Spotted a dictionary entry that is wrong, or a romanisation that does not match how you say it? Say so.",
      how: "Open an issue with the word, what it should be, and where you are from. That last detail is the valuable part."
    },
    {
      icon: "phrases",
      title: "Add a phrase",
      effort: "5 minutes",
      text: "Everyday phrases are the easiest thing to add and the most immediately useful to a learner.",
      how: "Use the phrase format in docs/CONTENT-GUIDE.md — English, Bodo in Devanagari, and a romanisation — and open a pull request, or paste it into an issue."
    },
    {
      icon: "conversations",
      title: "Write a dialogue",
      effort: "20 minutes",
      text: "A short realistic exchange teaches more than a page of rules.",
      how: "Pick a setting, write 5–8 turns with English, Bodo and romanisation, and add one note on how it actually sounds."
    },
    {
      icon: "library",
      title: "Add a reading passage",
      effort: "30 minutes",
      text: "Graded passages are what let a learner move from decoding to reading.",
      how: "Compose a short passage, give each paragraph a romanisation and an English rendering, and add two or three comprehension questions."
    },
    {
      icon: "spark",
      title: "Add an idiom or proverb",
      effort: "10 minutes",
      text: "The idioms page is a starter set and needs speakers to grow it.",
      how: "Give the Bodo, a romanisation, the literal image, and what the phrase actually means."
    },
    {
      icon: "bug",
      title: "Report a bug",
      effort: "3 minutes",
      text: "Something broken, misaligned or inaccessible? We want to know.",
      how: "Open an issue using the bug-report template and say what you expected and what happened."
    }
  ],

  routes: [
    {
      id: "nocode",
      badge: "No code needed",
      title: "The issue route",
      for: "Anyone — no account beyond GitHub, no tools to install.",
      steps: [
        "Open the repository's Issues tab.",
        "Choose the bug-report or feature-request template.",
        "Write the correction: the current text, the corrected text, and where you are from.",
        "Submit. A maintainer will fold it into the platform."
      ]
    },
    {
      id: "content",
      badge: "Content only",
      title: "The content pull request",
      for: "People comfortable editing a text file on GitHub.",
      steps: [
        "Read docs/CONTENT-GUIDE.md for the exact shape of each entry.",
        "Edit the matching file under <code>js/data/</code> in the browser.",
        "Keep every Bodo string in Devanagari with a romanisation, and invent nothing — flag uncertainty instead.",
        "Open a pull request and say what you changed."
      ]
    },
    {
      id: "code",
      badge: "For developers",
      title: "The code pull request",
      for: "Developers who want to fix or extend the platform itself.",
      steps: [
        "Clone the repository and open <code>index.html</code> — there is no build step.",
        "Run <code>node tools/check-links.mjs</code> before you push.",
        "Keep the design constraints: no dependencies, no build step, works offline, accessible by default.",
        "Open a pull request describing the change and why."
      ]
    }
  ],

  faq: [
    { q: "I don't know how to use GitHub. Can I still help?", a: "Yes. If you can send an email, you can help — write to the address in the repository and we will make the change for you. Corrections from speakers are the single most valuable contribution to this project." },
    { q: "My dialect is different from what you have. Is that a problem?", a: "Not at all — it is useful. Tell us which form you use and where you are from. The platform aims to document variation rather than pretend it does not exist." },
    { q: "How do I write a romanisation?", a: "Use the scheme in the README: w for the vowel /ɯ/, j for the sound /z/, y for /j/, and ph, th, kh for the aspirated stops. Keep it consistent, and if you are unsure, mark it." },
    { q: "Can I add audio?", a: "Not yet — the platform is deliberately dependency-free and offline-first. Pronunciation audio is on the roadmap; for now, a careful romanisation and a note on tone is the best we can carry." },
    { q: "Will you pay me, or can I reuse this?", a: "The platform is MIT-licensed, so you may reuse and remix it freely, including for your own teaching. There is no money in it, only the work." }
  ],

  links: [
    { icon: "fork", label: "Source repository", desc: "Browse the code, open an issue, or send a pull request.", href: "https://github.com/apsideslabs/SikBodo" },
    { icon: "resources", label: "Further reading", desc: "The external sources consulted while compiling the platform.", href: "resources.html" },
    { icon: "about", label: "About & accuracy", desc: "How the platform was built and how far to trust it.", href: "about.html" },
    { icon: "library", label: "Content guide", desc: "The exact shape of every content entry.", href: "https://github.com/apsideslabs/SikBodo/blob/main/docs/CONTENT-GUIDE.md" }
  ],

  rules: [
    { rule: "Every Bodo string is in Devanagari", why: "It is the official script and what learners meet in print." },
    { rule: "Every Bodo string carries a romanisation", why: "Devanagari does not mark tone, so the sound has to be written too." },
    { rule: "Never invent a form", why: "A flagged gap is better than a confident error." },
    { rule: "Name your variety", why: "Bodo has several dialects; a form standard in one area can differ in another." },
    { rule: "No emoji, no new dependencies", why: "The project uses the Lucide sprite and stays dependency-free." }
  ],

  review: [
    "Your issue or pull request is read by a maintainer.",
    "If it is a content correction, it is checked against the entry it changes.",
    "If it is accepted, it is folded in and credited in CONTRIBUTORS.md.",
    "If something is unclear, you are asked a question rather than refused."
  ],

  recognition: "Contributors are listed in CONTRIBUTORS.md, and corrections from speakers are called out in the changelog. The value here is accuracy, not volume — one corrected word matters."
};
