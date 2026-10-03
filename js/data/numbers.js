/* ============================================================
   SikBodo — numbers and time
   Bodo numerals are Tibeto-Burman: one to ten must be learnt,
   the teens stack onto ten, and the tens are built unit + ten.
   ============================================================ */

window.SKB = window.SKB || {};

window.SKB.numbers = {
  "intro":
    "Bodo numerals are short and follow a clear pattern — quite unlike the Assamese numbers spoken next door. One to ten must be learnt by heart; from eleven the units simply stack onto ten; and the tens are built the other way round, with the unit before the word for ten. Above a hundred the parts stack again. This page gives the ten digits, one to a hundred, the pattern, the ordinals, the days, the months and the words for times of day. Spellings vary between sources — see the notes.",

  "digits": [
    { "n": "०", "arabic": "0", "bo": "लाथिख'", "rom": "lathikh" },
    { "n": "१", "arabic": "1", "bo": "से", "rom": "se" },
    { "n": "२", "arabic": "2", "bo": "नै", "rom": "nai" },
    { "n": "३", "arabic": "3", "bo": "थाम", "rom": "tham" },
    { "n": "४", "arabic": "4", "bo": "ब्रै", "rom": "brai" },
    { "n": "५", "arabic": "5", "bo": "बा", "rom": "ba" },
    { "n": "६", "arabic": "6", "bo": "द'", "rom": "do" },
    { "n": "७", "arabic": "7", "bo": "स्नि", "rom": "sni" },
    { "n": "८", "arabic": "8", "bo": "दाइन", "rom": "dain" },
    { "n": "९", "arabic": "9", "bo": "गु", "rom": "gu" }
  ],

  "ones": [
    { "n": "1", "bo": "से", "rom": "se" },
    { "n": "2", "bo": "नै", "rom": "nai" },
    { "n": "3", "bo": "थाम", "rom": "tham" },
    { "n": "4", "bo": "ब्रै", "rom": "brai" },
    { "n": "5", "bo": "बा", "rom": "ba" },
    { "n": "6", "bo": "द'", "rom": "do" },
    { "n": "7", "bo": "स्नि", "rom": "sni" },
    { "n": "8", "bo": "दाइन", "rom": "dain" },
    { "n": "9", "bo": "गु", "rom": "gu" },
    { "n": "10", "bo": "जि", "rom": "ji" }
  ],

  "teens": [
    { "n": "11", "bo": "जिसे", "rom": "jise" },
    { "n": "12", "bo": "जिनै", "rom": "jinai" },
    { "n": "13", "bo": "जिथाम", "rom": "jitham" },
    { "n": "14", "bo": "जिब्रै", "rom": "jibrai" },
    { "n": "15", "bo": "जिबा", "rom": "jiba" },
    { "n": "16", "bo": "जिद'", "rom": "jido" },
    { "n": "17", "bo": "जिस्नि", "rom": "jisni" },
    { "n": "18", "bo": "जिदाइन", "rom": "jidain" },
    { "n": "19", "bo": "जिगु", "rom": "jigu" },
    { "n": "20", "bo": "नैजि", "rom": "naiji" }
  ],

  "tens": [
    { "n": "10", "bo": "जि", "rom": "ji" },
    { "n": "20", "bo": "नैजि", "rom": "naiji" },
    { "n": "30", "bo": "थामजि", "rom": "thamji" },
    { "n": "40", "bo": "ब्रैजि", "rom": "braiji" },
    { "n": "50", "bo": "बाजि", "rom": "baji" },
    { "n": "60", "bo": "द'जि", "rom": "doji" },
    { "n": "70", "bo": "स्निजि", "rom": "sniji" },
    { "n": "80", "bo": "दाइनजि", "rom": "dainji" },
    { "n": "90", "bo": "गुजि", "rom": "guji" },
    { "n": "100", "bo": "जौ", "rom": "jau" }
  ],

  "hundred": {
    "bo": "जौ",
    "rom": "jau",
    "note": "A hundred is जौ jau. To count hundreds, put the multiplier first: सेजौ sejau 'one hundred', नैजौ naijau 'two hundred', and so on. A thousand is रोजा roja (also हाजार hajar, borrowed); ten thousand is जिरोजा jiroja."
  },

  "pattern": [
    { "rule": "Eleven to nineteen: ten + unit", "detail": "Add the unit to जि ji 'ten': जिसे jise 'eleven', जिनै jinai 'twelve'. The unit follows ten." },
    { "rule": "The tens: unit + ten", "detail": "Twenty is नैजि naiji — literally 'two-ten' — and thirty is थामजि thamji 'three-ten'. The unit comes first." },
    { "rule": "Twenty-one to ninety-nine: tens + unit", "detail": "Build on the tens word and add the unit: नैजिसे naijise 'twenty-one', थामजिबा thamjiba 'thirty-five'." },
    { "rule": "Hundreds: multiplier + जौ jau", "detail": "सेजौ sejau 'one hundred', नैजौ naijau 'two hundred'. Thousands use रोजा roja the same way." },
    { "rule": "Spelling varies", "detail": "Sources differ on the spelling and romanisation of some numbers — 'two' appears as both नै nai and न्वि nwi, 'four' as ब्रै brai and ब्र्वि brwi. Learn one, and expect the other." }
  ],

  "ordinals": [
    { "n": "1st", "bo": "सिगां", "rom": "sigang" },
    { "n": "2nd", "bo": "नैसि", "rom": "naisi" },
    { "n": "3rd", "bo": "थामसि", "rom": "thamshi" }
  ],

  "time": [
    { "en": "today", "bo": "दिनै", "rom": "dinai" },
    { "en": "yesterday", "bo": "मैया", "rom": "maiya" },
    { "en": "tomorrow", "bo": "गाबोन", "rom": "gabon" },
    { "en": "day", "bo": "सान", "rom": "san" },
    { "en": "night", "bo": "हर", "rom": "hor" },
    { "en": "morning", "bo": "फुं", "rom": "fung" },
    { "en": "evening", "bo": "बेलासि", "rom": "belasi" },
    { "en": "year", "bo": "बोसोर", "rom": "bosor" },
    { "en": "month", "bo": "दान", "rom": "dan" },
    { "en": "week", "bo": "सबथा", "rom": "sabtha" }
  ],

  "days": [
    { "en": "Sunday", "bo": "रबिबार", "rom": "rabibar" },
    { "en": "Monday", "bo": "समबार", "rom": "sombar" },
    { "en": "Tuesday", "bo": "मंगलबार", "rom": "mangalbar" },
    { "en": "Wednesday", "bo": "बुदबार", "rom": "budbar" },
    { "en": "Thursday", "bo": "बिसथिबार", "rom": "bisthibar" },
    { "en": "Friday", "bo": "सुखुरबार", "rom": "sukhurbar" },
    { "en": "Saturday", "bo": "सनिबार", "rom": "sanibar" }
  ],

  "months": [
    { "en": "mid-Apr – mid-May", "bo": "बोहाग", "rom": "bohag" },
    { "en": "mid-May – mid-Jun", "bo": "जेठ", "rom": "jeth" },
    { "en": "mid-Jun – mid-Jul", "bo": "आहार", "rom": "ahar" },
    { "en": "mid-Jul – mid-Aug", "bo": "साउन", "rom": "saun" },
    { "en": "mid-Aug – mid-Sep", "bo": "भाद", "rom": "bhad" },
    { "en": "mid-Sep – mid-Oct", "bo": "आसिन", "rom": "asin" },
    { "en": "mid-Oct – mid-Nov", "bo": "काति", "rom": "kati" },
    { "en": "mid-Nov – mid-Dec", "bo": "आघोन", "rom": "aghon" },
    { "en": "mid-Dec – mid-Jan", "bo": "पुस", "rom": "pus" },
    { "en": "mid-Jan – mid-Feb", "bo": "माघ", "rom": "magh" },
    { "en": "mid-Feb – mid-Mar", "bo": "फागुन", "rom": "phagun" },
    { "en": "mid-Mar – mid-Apr", "bo": "सैत", "rom": "sait" }
  ],

  "gregorianMonths": [
    { "en": "January", "bo": "जानुवारी", "rom": "januwari" },
    { "en": "February", "bo": "फेब्रुवारी", "rom": "phebruwari" },
    { "en": "March", "bo": "मार्च", "rom": "march" },
    { "en": "April", "bo": "एफ्रिल", "rom": "eph ril" },
    { "en": "May", "bo": "मे", "rom": "me" },
    { "en": "June", "bo": "जुन", "rom": "jun" },
    { "en": "July", "bo": "जुलाइ", "rom": "julai" },
    { "en": "August", "bo": "आगष्ट", "rom": "agast" },
    { "en": "September", "bo": "सेप्थेम्बर", "rom": "sephthembar" },
    { "en": "October", "bo": "अक्थबर", "rom": "akthabar" },
    { "en": "November", "bo": "नवेम्बर", "rom": "nawembar" },
    { "en": "December", "bo": "डिसेम्बर", "rom": "disembar" }
  ],

  "notes": [
    "Numbers, like the rest of the vocabulary here, are compiled from public sources and have not been checked with a native speaker. Spelling and romanisation vary noticeably between sources.",
    "When you count things rather than recite numbers, Bodo uses classifiers — a small word between the number and the noun, chosen for what is being counted. See Lesson 6 and the grammar reference.",
    "The Bodo solar year begins in mid-April with Bwisagu, the new-year festival. The months are the shared Indian solar months, so each straddles two Gregorian months.",
    "The Gregorian month names are borrowings and are pronounced roughly as in English or Assamese; the spellings above are one common Devanagari rendering.",
    "Day names follow the same Indic pattern as the neighbouring languages; older or more traditional names may exist in the villages."
  ]
};
