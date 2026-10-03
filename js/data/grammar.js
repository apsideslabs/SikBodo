/* ============================================================
   SikBodo — grammar reference
   Descriptive tables for the core grammatical machinery of Bodo.
   Forms are drawn from published descriptions of Bodo grammar;
   uncertain or variable forms are flagged in `notes`. The variety
   described is Standard (Western) Bodo.
   ============================================================ */

window.SKB = window.SKB || {};

window.SKB.grammar = {
  intro:
    "Bodo is a Tibeto-Burman language, and its grammar works nothing like the Indo-Aryan languages around it. It is agglutinative: meaning is built by stacking suffixes onto a root, so a single Bodo word often carries what English spreads over several. Nouns take plural endings and show their role in the sentence with postpositions; pronouns draw a line between two kinds of 'we'; and the verb marks tense, aspect and person all in one word, with the verb sitting last. This reference collects the machinery you will meet in the lessons. Unless stated otherwise it describes Standard (Western) Bodo.",

  sections: [
    {
      id: "words",
      title: "Words (सोदोब)",
      summary: "What a word is, how Bodo words are built, and where they come from.",
      table: {
        caption: "How words are built",
        head: ["Type", "How it is formed", "Examples"],
        rows: [
          ["Root", "A single meaningful unit that cannot be split further", "दै dwi 'water', नो no 'house', जा za 'eat'"],
          ["Derived", "A root plus an affix that changes its meaning or class", "फोरोंनाय fwrwngnai 'teaching' from फोरों fwrwng 'to teach'"],
          ["Compound", "Two roots placed together make a third meaning", "दंफां dongfang 'tree' (wood + ?), सानदों sandwng 'thought'"],
          ["Reduplicated", "A word said twice, for plurality or intensity", "गोदान-गोदान godan-godan 'very new', गेदेर-गेदेर geder-geder 'very big'"],
          ["Loanword", "Borrowed from Assamese, Hindi or English", "इस्कुल iskul 'school', साहा saha 'tea', रेलगारि relgari 'train'"]
        ]
      },
      notes: [
        "Bodo adds far more suffixes than prefixes, and it makes new words productively — a speaker can build a word on the spot and be understood.",
        "Many modern words are borrowed, and everyday speech mixes Bodo freely with Assamese and English."
      ]
    },
    {
      id: "sentences",
      title: "Sentences and word order",
      summary: "Subject, object, verb — and why the verb always comes last.",
      table: {
        caption: "The basic order",
        head: ["Order", "Bodo", "Roman", "English"],
        rows: [
          ["Subject–Object–Verb", "आं उंखाम जा", "ang wngkham za", "I rice eat — 'I eat rice.'"],
          ["Subject–Verb", "बियो फैबाय", "biyo faibai", "he/she came — 'He/she came.'"],
          ["Subject–Locative–Verb", "बियो नोयाव दों", "biyo noyao dong", "he/she house-in is — 'He/she is in the house.'"]
        ]
      },
      notes: [
        "The verb is final. Everything that modifies it — object, place, time — comes before it.",
        "Bodo is 'topic-prominent': whatever the sentence is about can be moved to the front and marked, so word order shifts for emphasis even though the verb stays last."
      ]
    },
    {
      id: "parts-of-speech",
      title: "Parts of speech (सोदोब बाहागो)",
      summary: "The classes of word Bodo recognises.",
      table: {
        caption: "The classes",
        head: ["Class", "Bodo", "Example", "English"],
        rows: [
          ["Noun", "मुंगा सोदोब", "नो", "no — house"],
          ["Pronoun", "सोमोन्दै सोदोब", "आं", "ang — I"],
          ["Verb", "माव सोदोब", "जा", "za — eat"],
          ["Adjective", "बेसेन सोदोब", "मोजां", "mwjang — good"],
          ["Adverb", "माब्रै सोदोब", "गोख्रै", "gokhrai — soon"],
          ["Numeral", "अनजिमा", "से", "se — one"],
          ["Classifier", "हिसाब सोदोब", "मोन", "mwn — the general classifier"]
        ]
      },
      notes: [
        "Bodo does not mark gender on any class of word — no he/she distinction in the pronoun, no masculine/feminine agreement on the adjective or verb.",
        "The same root can move between classes with a suffix: a verb becomes a noun, an adjective becomes an adverb."
      ]
    },
    {
      id: "nouns",
      title: "Nouns, number and plural",
      summary: "How Bodo makes a noun plural — and when it does not bother.",
      table: {
        caption: "The plural suffixes",
        head: ["Suffix", "Used with", "Example", "English"],
        rows: [
          ["-फोर -phwr", "Nouns (things and people)", "नोफोर nophwr", "houses"],
          ["-सोर -swr", "Non-honorific 2nd & 3rd person pronouns", "नोंसोर nwngswr", "you (plural)"],
          ["-मोन -mwn", "Honorific 2nd & 3rd person", "बिथांमोन bithangmwn", "they (honorific)"]
        ]
      },
      notes: [
        "Number is marked only when it needs to be. If a number or a word like 'many' already shows plurality, the plural ending is often dropped.",
        "Bodo has no grammatical gender; 'he', 'she' and 'it' are all the same word, बि bi.",
        "There is no definite article. Definiteness is shown by context, by the demonstratives बे be 'this' and बै bwi 'that', or by the object marker."
      ]
    },
    {
      id: "classifiers",
      title: "Classifiers (हिसाब सोदोब)",
      summary: "The little words that stand between a number and the thing counted.",
      table: {
        caption: "Counting with classifiers",
        head: ["Classifier", "Used for", "Example", "English"],
        rows: [
          ["मोन -mwn", "People and many general things", "मानसि सेमोन manshi semwn", "one person"],
          ["गों -gong", "Long, thin things", "दंफां सेगों dongfang segong", "one tree"],
          ["पान -phan", "Flat, leaf-like things", "बिलाइ सेपान bilai sephan", "one leaf"]
        ]
      },
      notes: [
        "A classifier is obligatory in a counted noun phrase: you do not say 'one tree', you say 'one tree-classifier'.",
        "Classifiers are one of the clearest fingerprints of Bodo as a Tibeto-Burman language, and English has only a trace of the same habit in phrases like 'three head of cattle'.",
        "The exact classifier set varies by dialect and by what is being counted; the three above are common."
      ]
    },
    {
      id: "case",
      title: "Case and postpositions (कारक)",
      summary: "How Bodo says of, to, in, from and with — by adding endings after the noun.",
      table: {
        caption: "The case markers",
        head: ["Case", "Marker", "Example", "English"],
        rows: [
          ["Nominative", "-अ -a / unmarked", "बिमा बे बेरायाव दों", "bima be berayao dong — mother is at home"],
          ["Accusative", "-खौ -khou / -नो -nw", "नोंखौ nwngkhou", "you (as object)"],
          ["Genitive", "-नि -ni", "बिमानि bimani", "mother's / of mother"],
          ["Dative", "-नो -nw", "नोंनो nwngnw", "to you"],
          ["Locative", "-याव -yao / -आव -ao", "हाथायाव hathaiyao", "in / at the market"],
          ["Instrumental", "-जों -jwng", "अखाइजों akhaijwng", "with / by the hand"],
          ["Ablative", "-निफ्राय -nifrai", "नोनिफ्राय nonifrai", "from the house"]
        ]
      },
      notes: [
        "All case markers are postpositions — they follow the noun, never precede it.",
        "The nominative is usually unmarked. The accusative marker is used mainly when the object is definite or human, so the same noun can appear with or without it.",
        "This 'mark it when you need to' behaviour is common across Tibeto-Burman languages and is a good example of how Bodo grammar is driven by meaning rather than fixed endings."
      ]
    },
    {
      id: "pronouns",
      title: "Pronouns (सोमोन्दै सोदोब)",
      summary: "I, you, he, she — and the two different kinds of 'we'.",
      table: {
        caption: "Personal pronouns",
        head: ["Person", "Bodo", "Roman", "English"],
        rows: [
          ["1st singular", "आं", "ang", "I"],
          ["1st plural (inclusive)", "जों", "jwng", "we — including you"],
          ["1st plural (exclusive)", "जां", "jang", "we — excluding you"],
          ["2nd singular", "नों", "nwng", "you"],
          ["2nd plural", "नोंसोर", "nwngswr", "you (plural)"],
          ["3rd singular", "बि", "bi", "he / she / it"],
          ["3rd plural", "बिसोर", "biswr", "they"]
        ]
      },
      notes: [
        "The inclusive/exclusive contrast is one of the most important things to learn: जों jwng is a 'we' that includes the person you are speaking to, जां jang a 'we' that leaves them out. English uses one word for both.",
        "Bodo pronouns carry no gender: बि bi is 'he', 'she' and 'it' at once.",
        "Honorific forms exist for the second and third person, built with the element -थां -thang (नोंथां nwngthang 'you (respectful)', बिथां bithang 'he/she (respectful)').",
        "Kinship words often take a possessive prefix instead of a separate 'my' or 'your', so 'my mother' and 'your mother' come from the same root."
      ]
    },
    {
      id: "honorifics",
      title: "Honorifics and politeness",
      summary: "How Bodo shows respect — with the pronoun, not with a full set of tiers.",
      table: {
        caption: "The respectful forms",
        head: ["Plain", "Respectful", "English"],
        rows: [
          ["नों nwng", "नोंथां nwngthang", "you"],
          ["बि bi", "बिथां bithang", "he / she"],
          ["नोंसोर nwngswr", "नोंथांमोन nwngthangmwn", "you (plural)"],
          ["बिसोर biswr", "बिथांमोन bithangmwn", "they"]
        ]
      },
      notes: [
        "Unlike Assamese, which has three full honorific tiers running through the verb, Bodo marks respect more simply — with a respectful pronoun and, where needed, a polite form of the verb.",
        "The plural suffix -मोन -mwn is the honorific plural, used with people you address with respect.",
        "Everyday politeness leans on the same courtesies as anywhere: greetings, the word for 'please', and a soft tone."
      ]
    },
    {
      id: "verbs",
      title: "Verbs (माव सोदोब)",
      summary: "Tense, aspect, and how a Bodo verb stacks its endings.",
      table: {
        caption: "The tense markers",
        head: ["Tense", "Marker", "Example", "English"],
        rows: [
          ["Present", "unmarked", "आं जा ang za", "I eat"],
          ["Past", "-मोन -mwn", "आं जामोन ang zamwn", "I ate"],
          ["Future", "-गोन -gwn", "आं जागोन ang zagwn", "I will eat"]
        ]
      },
      notes: [
        "The present is the bare stem; past and future add a suffix. This is the reverse of English, where the present is the one that changes (eat / eats).",
        "Aspect markers sit between the verb and the tense marker, so a single verb can carry several suffixes in a fixed order.",
        "Bodo verbs agree with their subject in person and, for the second and third persons, in honorific level — but the agreement is lighter than in Assamese and varies between descriptions.",
        "The tables here model the system rather than asserting that every form is attested for every verb. Confirm details with a speaker."
      ]
    },
    {
      id: "negation",
      title: "Negation",
      summary: "Saying no — on the verb, not with a separate word.",
      table: {
        caption: "The negative",
        head: ["Form", "Bodo", "Roman", "English"],
        rows: [
          ["Simple negative", "आं जाया", "ang zaya", "I don't eat"],
          ["Negative future", "आं जाला", "ang zala", "I will not eat"],
          ["Prohibitive ('don't')", "जादा", "zada", "don't eat"]
        ]
      },
      notes: [
        "Bodo does not use a free-standing 'not' the way English does; the negative is part of the verb.",
        "The negative future uses its own marker, distinct from the positive future.",
        "Forms and their exact shapes vary between descriptions — treat these as a guide, and check with a speaker."
      ]
    },
    {
      id: "questions",
      title: "Questions",
      summary: "Yes/no and wh-questions.",
      table: {
        caption: "Asking",
        head: ["Type", "How it is formed", "Example", "English"],
        rows: [
          ["Yes/no", "statement + ना na", "नों जा ना? nwng za na?", "Are you eating?"],
          ["What", "मा ma", "बे मा? be ma?", "What is this?"],
          ["Who", "सोर swr", "बे सोर? be swr?", "Who is this?"],
          ["Where", "बबे bobe / बहा baha", "नों बबेयाव? nwng bobeyao?", "Where are you?"],
          ["When", "माब्ला mabla", "माब्ला फैगोन? mabla faigwn?", "When will you come?"],
          ["Why", "मानो manw", "मानो? manw?", "Why?"],
          ["How", "माब्रै mabrwai", "माब्रै दों? mabrwai dong?", "How is it?"]
        ]
      },
      notes: [
        "A yes/no question often differs from a statement only by the final particle ना na and the intonation.",
        "The question word sits in the position the answer would occupy, and the verb still comes last — so the word order does not change the way it does in English."
      ]
    },
    {
      id: "adjectives",
      title: "Adjectives",
      summary: "How Bodo describes a noun.",
      table: {
        caption: "Common adjectives",
        head: ["Bodo", "Roman", "English"],
        rows: [
          ["मोजां", "mwjang", "good"],
          ["गाज्रि", "gajri", "bad"],
          ["गेदेर", "geder", "big"],
          ["फिसा", "phisa", "small"],
          ["गोदान", "godan", "new"],
          ["गोजौ", "gojwo", "high"],
          ["गुफुर", "guphur", "white"],
          ["गोमो", "gomwo", "yellow"]
        ]
      },
      notes: [
        "An adjective normally comes before the noun it describes, as in English.",
        "An adjective can be repeated for emphasis: गेदेर-गेदेर geder-geder 'very big'.",
        "Many adjectives are really verbs — 'to be big' and 'big' are the same word doing different work."
      ]
    },
    {
      id: "numerals",
      title: "Numerals and counting",
      summary: "Numbers, and the classifiers that go with them.",
      table: {
        caption: "One to ten",
        head: ["Number", "Bodo", "Roman"],
        rows: [
          ["1", "से", "se"], ["2", "नै", "nai"], ["3", "थाम", "tham"], ["4", "ब्रै", "brai"], ["5", "बा", "ba"],
          ["6", "द'", "do"], ["7", "स्नि", "sni"], ["8", "दाइन", "dain"], ["9", "गु", "gu"], ["10", "जि", "ji"]
        ]
      },
      notes: [
        "See the Numbers & time page for the full system, the tens and the hundreds.",
        "In a counted noun phrase a classifier is inserted between the number and the noun (see the Classifiers section above)."
      ]
    },
    {
      id: "word-formation",
      title: "Word formation",
      summary: "Compounding, suffixing and reduplication.",
      table: {
        caption: "Ways to build a new word",
        head: ["Process", "What it does", "Example"],
        rows: [
          ["Compounding", "Joins two roots into one word", "सान san 'day' + दों dwng → सानदों sandwng 'thought'"],
          ["Suffixing", "Adds an ending that changes the class", "फोरों fwrwng 'teach' → फोरोंनाय fwrwngnai 'teaching'"],
          ["Reduplication", "Repeats a word for plural or intensity", "गेदेर geder 'big' → गेदेर-गेदेर 'very big'"]
        ]
      },
      notes: [
        "Reduplication is a living process: a speaker can reduplicate almost any word to intensify it or spread its meaning over many things.",
        "Because so much vocabulary is built from a smaller set of roots, recognising the roots and the endings lets you understand words you have never been taught."
      ]
    },
    {
      id: "coordination",
      title: "Joining sentences",
      summary: "And, but, because — and reported speech.",
      table: {
        caption: "Connecting ideas",
        head: ["Function", "Word", "Example"],
        rows: [
          ["and", "आरो aro", "आं आरो नों ang aro nwng — 'I and you'"],
          ["but", "खालि khali", "… खालि … — '… but …'"],
          ["because", "मानोब्ला manobla", "… मानोब्ला … — '… because …'"],
          ["if", "जुदि judi", "जुदि … judi — 'if …'"]
        ]
      },
      notes: [
        "Bodo often chains clauses by putting a verb in a subordinated form rather than by joining two full sentences — one verb carries 'in order to' or 'having done'.",
        "Reported speech usually keeps the original words and adds a verb of saying, rather than shifting the tense the way English does."
      ]
    },
    {
      id: "register",
      title: "Register: formal and spoken",
      summary: "How written Bodo differs from everyday speech.",
      table: {
        caption: "Two registers",
        head: ["Feature", "Formal / written", "Everyday speech"],
        rows: [
          ["Endings", "Fuller, more honorific forms", "Shorter; what can be guessed is dropped"],
          ["Loanwords", "Kept to a minimum", "Assamese and English words mixed in freely"],
          ["Pronouns", "Respectful forms preferred", "Plain forms among equals and friends"],
          ["Pronunciation", "Careful, tone marked in speech", "Rapid, with sound changes across word boundaries"]
        ]
      },
      notes: [
        "A learner should expect written Bodo and street Bodo to look different, exactly as they do in every language.",
        "The mix with Assamese and English is normal and not a sign of 'bad' Bodo — it is how the language lives day to day."
      ]
    }
  ]
};
