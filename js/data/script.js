/* ============================================================
   SikBodo — script data
   Part of the window.SKB content bundle. See docs/CONTENT-GUIDE.md.
   Every Bodo string is in the Devanagari script and carries a
   romanisation. Scheme: w = the vowel /ɯ/, j = /z/, y = /j/.
   ============================================================ */

window.SKB = window.SKB || {};

window.SKB.script = {
  "intro": "Bodo is written in the Devanagari script — the same alphabet as Hindi, Marathi and Nepali. But a shared alphabet does not mean shared sounds. Bodo reads many letters differently from Hindi, and it has sounds Devanagari was not built for: the high central vowel /ɯ/ and tone. Below is the varnamala chart — every letter as it is read aloud — then the vowel and consonant tables with a plain-English hint for each sound. Read it with Lesson 2.",
  "chart": [
    {
      "group": "Vowels",
      "bo": "सर'",
      "items": [
        { "l": "अ", "reads": "o" },
        { "l": "आ", "reads": "aa" },
        { "l": "इ", "reads": "i" },
        { "l": "ई", "reads": "ee" },
        { "l": "उ", "reads": "u" },
        { "l": "ऊ", "reads": "oo" },
        { "l": "ए", "reads": "e" },
        { "l": "ऐ", "reads": "ai" },
        { "l": "ओ", "reads": "o" },
        { "l": "औ", "reads": "ou" }
      ]
    },
    {
      "group": "Velar (क-वर्ग)",
      "bo": "कण्ठ्य",
      "items": [
        { "l": "क", "reads": "ko" },
        { "l": "ख", "reads": "kho" },
        { "l": "ग", "reads": "go" },
        { "l": "घ", "reads": "gho" },
        { "l": "ङ", "reads": "ngo" }
      ]
    },
    {
      "group": "Palatal (च-वर्ग)",
      "bo": "तालव्य",
      "items": [
        { "l": "च", "reads": "so" },
        { "l": "छ", "reads": "so" },
        { "l": "ज", "reads": "zo" },
        { "l": "झ", "reads": "zho" },
        { "l": "ञ", "reads": "nyo" }
      ]
    },
    {
      "group": "Retroflex (ट-वर्ग)",
      "bo": "मूर्धन्य",
      "items": [
        { "l": "ट", "reads": "to" },
        { "l": "ठ", "reads": "tho" },
        { "l": "ड", "reads": "do" },
        { "l": "ढ", "reads": "dho" },
        { "l": "ण", "reads": "no" }
      ]
    },
    {
      "group": "Dental (त-वर्ग)",
      "bo": "दन्त्य",
      "items": [
        { "l": "त", "reads": "to" },
        { "l": "थ", "reads": "tho" },
        { "l": "द", "reads": "do" },
        { "l": "ध", "reads": "dho" },
        { "l": "न", "reads": "no" }
      ]
    },
    {
      "group": "Labial (प-वर्ग)",
      "bo": "ओष्ठ्य",
      "items": [
        { "l": "प", "reads": "po" },
        { "l": "फ", "reads": "pho" },
        { "l": "ब", "reads": "bo" },
        { "l": "भ", "reads": "bho" },
        { "l": "म", "reads": "mo" }
      ]
    },
    {
      "group": "Semivowels and liquids",
      "bo": "अन्तःस्थ",
      "items": [
        { "l": "य", "reads": "yo" },
        { "l": "र", "reads": "ro" },
        { "l": "ल", "reads": "lo" },
        { "l": "व", "reads": "wo" }
      ]
    },
    {
      "group": "Sibilants and h",
      "bo": "ऊष्म",
      "items": [
        { "l": "श", "reads": "so" },
        { "l": "ष", "reads": "so" },
        { "l": "स", "reads": "so" },
        { "l": "ह", "reads": "ho" }
      ]
    },
    {
      "group": "Conjuncts and loan letters",
      "bo": "संयुक्त",
      "items": [
        { "l": "क्ष", "reads": "kho" },
        { "l": "त्र", "reads": "tro" },
        { "l": "ज्ञ", "reads": "gyo" },
        { "l": "ड़", "reads": "ro" },
        { "l": "ढ़", "reads": "rho" }
      ]
    }
  ],
  "vowels": [
    { "l": "अ", "r": "o", "s": "the inherent vowel — a short open vowel, roughly 'o' as in British 'hot'" },
    { "l": "आ", "r": "aa", "s": "long, as in father" },
    { "l": "इ", "r": "i", "s": "short, as in pin" },
    { "l": "ई", "r": "i", "s": "historically long; in modern Bodo it sounds the same as इ" },
    { "l": "उ", "r": "u", "s": "short, as in put" },
    { "l": "ऊ", "r": "u", "s": "long, as in pool" },
    { "l": "ए", "r": "e", "s": "long, like the 'é' in French 'été' — no glide" },
    { "l": "ऐ", "r": "ai", "s": "a diphthong; also used in spelling to write the vowel /ɯ/ (as in दै dwi 'water')" },
    { "l": "ओ", "r": "o", "s": "a rounded vowel; also used in spelling to write /ɯ/ (as in नों nwng 'you')" },
    { "l": "औ", "r": "ou", "s": "a diphthong, like 'ow' in cow" }
  ],
  "consonants": [
    { "l": "क", "r": "k", "s": "like 'k' in kite; mostly in loanwords and names" },
    { "l": "ख", "r": "kh", "s": "aspirated k, like 'kh' in backhand" },
    { "l": "ग", "r": "g", "s": "like 'g' in go" },
    { "l": "घ", "r": "gh", "s": "aspirated g — loanwords and names" },
    { "l": "ङ", "r": "ng", "s": "like 'ng' in sing; rare at the start of a word" },
    { "l": "च", "r": "s", "s": "in Bodo, च is 's', as in sun — not 'ch'" },
    { "l": "छ", "r": "s", "s": "also 's' in Bodo; च and छ have merged" },
    { "l": "ज", "r": "z", "s": "voiced, like 'z' in zoo" },
    { "l": "झ", "r": "zh", "s": "aspirated 'z' — mostly in loanwords" },
    { "l": "ञ", "r": "ny", "s": "like 'ny' in canyon" },
    { "l": "ट", "r": "t", "s": "retroflex t — loanwords and names" },
    { "l": "ठ", "r": "th", "s": "retroflex, aspirated — loanwords" },
    { "l": "ड", "r": "d", "s": "retroflex d — loanwords and names" },
    { "l": "ढ", "r": "dh", "s": "retroflex, aspirated — loanwords" },
    { "l": "ण", "r": "n", "s": "retroflex n — loanwords" },
    { "l": "त", "r": "t", "s": "dental t — the tongue touches the teeth; common in native words" },
    { "l": "थ", "r": "th", "s": "dental, aspirated" },
    { "l": "द", "r": "d", "s": "dental d" },
    { "l": "ध", "r": "dh", "s": "dental, aspirated — loanwords" },
    { "l": "न", "r": "n", "s": "like 'n' in name" },
    { "l": "प", "r": "p", "s": "like 'p' in pen" },
    { "l": "फ", "r": "ph", "s": "aspirated p, like 'ph' in uphill" },
    { "l": "ब", "r": "b", "s": "like 'b' in book" },
    { "l": "भ", "r": "bh", "s": "aspirated b — loanwords" },
    { "l": "म", "r": "m", "s": "like 'm' in man" },
    { "l": "य", "r": "y", "s": "like 'y' in yes" },
    { "l": "र", "r": "r", "s": "like 'r' in ring" },
    { "l": "ल", "r": "l", "s": "like 'l' in love" },
    { "l": "व", "r": "w", "s": "like 'w' in water; also a vowel sign in some spellings" },
    { "l": "श", "r": "s", "s": "in Bodo, 's' as in sun" },
    { "l": "ष", "r": "s", "s": "also 's' in Bodo" },
    { "l": "स", "r": "s", "s": "also 's' in Bodo" },
    { "l": "ह", "r": "h", "s": "like 'h' in home" },
    { "l": "क्ष", "r": "kh", "s": "a conjunct; in Bodo a single 'kh' sound" },
    { "l": "त्र", "r": "tr", "s": "a conjunct, as in 'tra'" },
    { "l": "ज्ञ", "r": "gy", "s": "a conjunct, as in 'gya'" },
    { "l": "ड़", "r": "r", "s": "a flap, as in Hindi 'baṛa' — loanwords" },
    { "l": "ढ़", "r": "rh", "s": "aspirated flap — loanwords" }
  ],
  "notes": [
    "Bodo uses the Devanagari script, the same one as Hindi. The alphabet is identical; what differs is the sound value given to many letters, and the sounds Bodo has that Devanagari was not designed for.",
    "Three letters — श, ष and स — are all pronounced 's' in Bodo, and च and छ are also pronounced 's'. So the sibilant row collapses to a single sound. Do not read these as they are read in Hindi.",
    "ज and य are pronounced 'z' (as in zoo), not 'j' or 'y'. This is one of the clearest ways to recognise Bodo speech.",
    "The voiced aspirates — घ, झ, ढ, ध, भ — and the retroflex row — ट, ठ, ड, ढ, ण — are used mainly in loanwords and proper names; native Bodo words do not use them.",
    "The vowel /ɯ/ — a high central vowel with no English equivalent — has no letter of its own in Devanagari. In spelling it is written with ो or ै (so नों nwng 'you', जों jwng 'we', दै dwi 'water'), and in the romanisation here it is always written w.",
    "Bodo is tonal: high and low tones are common and can tell words apart, with a mid tone also described. Tone is not marked in ordinary Devanagari spelling, so it has to be learnt from speech.",
    "Unlike Hindi, Bodo keeps its final vowel. Where Hindi drops the inherent vowel at the end of a word, Bodo pronounces it — which is why the language's own name is written बरʼ, with the final vowel written out.",
    "The romanisation used across this platform writes w for the vowel /ɯ/, j for the sound /z/, y for /j/, and ph, th, kh for the aspirated stops. It is used consistently everywhere.",
    "Every consonant carries a built-in vowel. Read on its own, क is 'ko', ख is 'kho', ग is 'go' — which is why primers teach the letters as ko, kho, go.",
    "The chart gives each letter as it is read aloud; the vowel and consonant tables give the sound alone and a hint for it. The two are the same letters seen two ways."
  ]
};
