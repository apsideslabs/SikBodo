/* ============================================================
   SikBodo — verb reference
   Bodo verbs are agglutinative: tense, aspect and person are
   carried by suffixes stacked onto a root. The tables below give
   a model verb, the negative, the imperative, the aspect markers
   and a set of common verbs. Forms model the system; see the caveat.
   ============================================================ */

window.SKB = window.SKB || {};

window.SKB.verbs = {
  intro:
    "A Bodo verb is a root with endings stacked onto it. The present tense is the bare root; the past adds -मोन -mwn and the future adds -गोन -gwn. Aspect markers sit between the root and the tense marker, so one word can carry tense, aspect and person together — the agglutination you met in Lesson 1. This page gives the paradigm for one model verb (जा, za, 'to eat'), the negative, the imperative, the aspect markers, and a set of common verbs.",

  caveat:
    "These tables model the regular pattern rather than asserting that every derived form is attested for every verb. Bodo verb agreement is lighter than in Assamese and varies between descriptions and dialects; the negative and imperative shapes in particular differ from source to source. Bodo has irregular verbs too. Treat the tables as a scaffold and confirm details with a speaker.",

  model: { bo: "जा", rom: "za", en: "to eat" },

  persons: [
    { bo: "आं", rom: "ang", en: "I" },
    { bo: "जों", rom: "jwng", en: "we (incl.)" },
    { bo: "नों", rom: "nwng", en: "you" },
    { bo: "नोंसोर", rom: "nwngswr", en: "you (pl.)" },
    { bo: "बि", rom: "bi", en: "he / she" },
    { bo: "बिसोर", rom: "biswr", en: "they" }
  ],

  tenses: [
    {
      label: "Present",
      gloss: "the action now or habitually — the bare root, unmarked.",
      cells: [
        { bo: "जा", rom: "za" },
        { bo: "जा", rom: "za" },
        { bo: "जा", rom: "za" },
        { bo: "जा", rom: "za" },
        { bo: "जा", rom: "za" },
        { bo: "जा", rom: "za" }
      ]
    },
    {
      label: "Past",
      gloss: "the action finished — root + -मोन -mwn.",
      cells: [
        { bo: "जामोन", rom: "zamwn" },
        { bo: "जामोन", rom: "zamwn" },
        { bo: "जामोन", rom: "zamwn" },
        { bo: "जामोन", rom: "zamwn" },
        { bo: "जामोन", rom: "zamwn" },
        { bo: "जामोन", rom: "zamwn" }
      ]
    },
    {
      label: "Future",
      gloss: "the action to come — root + -गोन -gwn.",
      cells: [
        { bo: "जागोन", rom: "zagwn" },
        { bo: "जागोन", rom: "zagwn" },
        { bo: "जागोन", rom: "zagwn" },
        { bo: "जागोन", rom: "zagwn" },
        { bo: "जागोन", rom: "zagwn" },
        { bo: "जागोन", rom: "zagwn" }
      ]
    }
  ],

  negative: {
    title: "The negative",
    note: "Bodo marks negation inside the verb rather than with a separate 'not'. The negative future has its own marker, different from the positive future, and there is a distinct prohibitive for 'don't'.",
    rows: [
      ["Simple negative", "आं जाया", "ang zaya", "I don't eat"],
      ["Negative past", "आं जामोन", "ang zamwn", "I did not eat"],
      ["Negative future", "आं जाला", "ang zala", "I will not eat"],
      ["Prohibitive", "जादा", "zada", "don't eat"]
    ]
  },

  imperative: {
    title: "The imperative",
    note: "The imperative is the short form of the verb. Politeness is carried by the pronoun and by extra particles rather than by a large change in the verb, so the same root can be a plain order or a respectful request depending on who is addressed.",
    rows: [
      ["Singular", "जा", "za", "eat!"],
      ["Plural", "जाथो", "zatho", "eat (you all)!"],
      ["Honorific", "जाबाय", "zabai", "please eat"],
      ["Prohibitive", "जादा", "zada", "don't eat!"]
    ]
  },

  aspects: [
    { name: "Habitual", how: "root + -जो -jo — for what is done regularly.", example: "जाजो zajo — 'eats (habitually)'" },
    { name: "Progressive", how: "root + -गासिनो -gasinw, with दों dong — for what is happening now.", example: "जागासिनो दों zagasinw dong — 'is eating'" },
    { name: "Perfective", how: "root + -दों -dwn — for what is finished.", example: "जादों zadwng — 'has eaten'" }
  ],

  common: {
    head: ["Verb", "Present", "Past", "Future"],
    rows: [
      ["eat", "जा", "जामोन", "जागोन"],
      ["drink", "लों", "लोंमोन", "लोंगोन"],
      ["go", "थां", "थांमोन", "थांगोन"],
      ["come", "फै", "फैमोन", "फैगोन"],
      ["see", "नाय", "नायमोन", "नायगोन"],
      ["speak", "बुं", "बुंमोन", "बुंगोन"],
      ["do", "माव", "मावमोन", "मावगोन"],
      ["sleep", "उंदु", "उंदुमोन", "उंदुगोन"],
      ["give", "हो", "होमोन", "होगोन"],
      ["get", "मोन", "मोनमोन", "मोनगोन"]
    ]
  }
};
