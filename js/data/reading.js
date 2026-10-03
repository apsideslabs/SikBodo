/* ============================================================
   SikBodo — reading & writing
   Graded passages to read for meaning, each with a romanisation,
   an English rendering and comprehension questions whose answers
   sit behind a toggle. Then a short guide to writing in Bodo.
   The passages were composed for this platform as practice
   material — they are not quoted from any author, and they are
   not verified by a native speaker.
   ============================================================ */

window.SKB = window.SKB || {};

window.SKB.reading = {
  intro:
    "Reading is the step after the alphabet: you stop decoding letters and start taking in meaning. The passages below run from two-line beginner texts to a short essay, each with a romanisation, an English rendering, and comprehension questions you can answer before revealing the answer. Read the Bodo first, aloud if you can; only then check the romanisation and the English. All passages were written for this platform as practice material, not quoted from any author.",

  howTo: [
    "Read the Bodo aloud once without looking at the English — you are training your ear and your eye together.",
    "Read it again and try to answer the questions from memory of the text.",
    "Only then open the romanisation and the English to check yourself.",
    "Finally, read the passage once more. The second reading is where the grammar starts to feel familiar."
  ],

  passages: [
    {
      id: "rd-family",
      title: "आंनि नखर",
      titleEn: "My family",
      level: "Basic",
      text: [
        "बे आंनि नखर। आंनि बिमा आरो आंनि बिफा दों। आंनि से आदा आरो से बिनानाओ दों।",
        "जों लोगो जोबोद गोजोन दों।"
      ],
      rom: [
        "Be angni nakhar. Angni bima aro angni bipha dong. Angni se ada aro se binanao dong.",
        "Jwng logo jwobwd gojon dong."
      ],
      en: [
        "This is my family. My mother and my father are there. I have one elder brother and one younger sister.",
        "We are very happy together."
      ],
      questions: [
        { q: "आंनि नखरआव सोर सोर दों?", qEn: "Who is in the speaker's family?", a: "बिमा, बिफा, से आदा आरो से बिनानाओ।", aEn: "Mother, father, one elder brother and one younger sister." },
        { q: "'दों' नि माने मा?", qEn: "What does 'दों' (dong) mean?", a: "दों माने 'to be / there is'.", aEn: "दों (dong) means 'to be' / 'there is'." }
      ],
      note: "Notice that दों (dong) does the work of English 'is/are/there is'. Bodo has no separate words for these."
    },
    {
      id: "rd-market",
      title: "हाथाइयाव",
      titleEn: "At the market",
      level: "Basic",
      text: [
        "दिनै आं हाथाइयाव थांबाय। हाथाइ जोबोद गोजोन।",
        "आं फिथाइ आरो ना बायबाय। उनाव आं नोयाव फैबाय।"
      ],
      rom: [
        "Dinai ang hathaiyao thangbai. Hathai jwobwd gojon.",
        "Ang phithai aro na baibai. Unao ang noyao faibai."
      ],
      en: [
        "Today I went to the market. The market is very lively.",
        "I bought vegetables and fish. Then I came home."
      ],
      questions: [
        { q: "आं मा मा बायबाय?", qEn: "What did the speaker buy?", a: "फिथाइ आरो ना।", aEn: "Vegetables and fish." },
        { q: "थांबाय आरो फैबाय — मा फाराग?", qEn: "What is the difference between थांबाय and फैबाय?", a: "थांबाय माने 'went' (थां, go); फैबाय माने 'came' (फै, come).", aEn: "थांबाय (thangbai) is 'went' (थां thang, 'go'); फैबाय (faibai) is 'came' (फै fai, 'come')." }
      ],
      note: "The past ending -बाय (-bai) marks a completed action here; the -मोन (-mwn) form is the other common past marker."
    },
    {
      id: "rd-bwisagu",
      title: "ब्विसागु",
      titleEn: "Bwisagu, the new year",
      level: "Elementary",
      text: [
        "ब्विसागु बर' मानसिनि गेदेर हारिमु। बे बोसोरनि आगो।",
        "मानसि गासैबो गोजोन जायो। खाम, सिफुं आरो जोथा हारबाय। हिनजावफोर मोसानो।"
      ],
      rom: [
        "Bwisagu bor' manshini geder harimu. Be bosorni ago.",
        "Mansi gasaibw gojon jayo. Kham, sifung aro jotha harbai. Hinjaophwr mosanw."
      ],
      en: [
        "Bwisagu is the greatest festival of the Bodo people. It is the start of the year.",
        "Everyone is happy. The drum, the flute and the cymbals play. The women dance."
      ],
      questions: [
        { q: "ब्विसागु माब्ला जायो?", qEn: "When is Bwisagu celebrated?", a: "बोसोरनि आगो — बोहाग दानाव (मध्य-एफ्रिल)।", aEn: "At the start of the year — in the month of Bohag (mid-April)." },
        { q: "हारिमुवा मा मा हारबाय?", qEn: "Which instruments play at the festival?", a: "खाम (drum), सिफुं (flute) आरो जोथा (cymbals).", aEn: "खाम (kham, drum), सिफुं (sifung, flute) and जोथा (jotha, cymbals)." }
      ],
      note: "The plural -फोर (-phwr) turns हिनजाव (hinjao, 'woman') into हिनजावफोर (hinjaophwr, 'women')."
    },
    {
      id: "rd-school",
      title: "जोंनि इस्कुल",
      titleEn: "Our school",
      level: "Elementary",
      text: [
        "जोंनि गामिआव से इस्कुल दों। फोरोंगिरि जोबोद मोजां।",
        "जों सानफ्रोमबो बिजाब फरायो। जों बर' राव आरो इंराजि राव फरायो।"
      ],
      rom: [
        "Jwngni gamiao se iskul dong. Fwrwnggiri jwobwd mwjang.",
        "Jwng sanphrombo bijab pharayo. Jwng bor' rao aro inraji rao pharayo."
      ],
      en: [
        "In our village there is a school. The teacher is very good.",
        "We read books every day. We study Bodo and English."
      ],
      questions: [
        { q: "इस्कुलआ बबेयाव दों?", qEn: "Where is the school?", a: "गामिआव।", aEn: "In the village." },
        { q: "जों मा मा राव फरायो?", qEn: "Which languages do they study?", a: "बर' राव आरो इंराजि राव।", aEn: "Bodo and English." }
      ],
      note: "सानफ्रोमबो (sanphrombo) means 'every day'. The locative -आव (-ao) is what makes गामिआव (gamiao) 'in the village'."
    },
    {
      id: "rd-river",
      title: "दैमा",
      titleEn: "The river",
      level: "Intermediate",
      text: [
        "जोंनि गामिनि खाथियाव से दैमा दों। दैमाया गोजौ आरो गोजोन।",
        "फुंआव हिनजावफोर दै लाबोनो थायो। बिफानिफ्राय बिसोर ना बायो।"
      ],
      rom: [
        "Jwngni gamini khathiyao se daima dong. Daimaya gojwo aro gojon.",
        "Fungao hinjaophwr dwi labwnw thayo. Biphanifrai biswr na bayo."
      ],
      en: [
        "Near our village there is a river. The river is long and beautiful.",
        "In the morning the women go to fetch water. From it they get fish."
      ],
      questions: [
        { q: "हिनजावफोर फुंआव मा मावनो थायो?", qEn: "What do the women go to do in the morning?", a: "दै लाबोनो थायो।", aEn: "They go to fetch water." },
        { q: "'बिफानिफ्राय' नि माने मा?", qEn: "What does 'बिफानिफ्राय' (biphanifrai) mean?", a: "बिफा माने 'it'; -निफ्राय माने 'from' — माने 'from it'.", aEn: "बिफा (bipha) is 'it'; -निफ्राय (-nifrai) is 'from' — so 'from it'." }
      ],
      note: "The ablative -निफ्राय (-nifrai) means 'from'. And notice the subordinating -नो (-nw) on लाबोनो (labwnw): 'in order to fetch'."
    },
    {
      id: "rd-food",
      title: "उंखाम आरो जौ",
      titleEn: "Food and rice beer",
      level: "Intermediate",
      text: [
        "बर' मानसिनि उंखामआ जोबोद मोजां। बिसोर उंखाम आरो नानि उंख्रि जायो।",
        "हारिमुवा बिसोर जौ लों। फिथाइआ बिसोरनि खामानि।"
      ],
      rom: [
        "Bor' manshini wngkham jwobwd mwjang. Biswr wngkham aro nani wngkhri jayo.",
        "Harimuwa biswr jau lwng. Phithaia biswrni khamani."
      ],
      en: [
        "Bodo food is very good. They eat rice and fish curry.",
        "At festivals they drink rice beer. Vegetables are their work — their crop."
      ],
      questions: [
        { q: "बिसोर हारिमुवा मा लों?", qEn: "What do they drink at festivals?", a: "जौ (जुमै)।", aEn: "Rice beer (जौ jau, also called जुमै jumai)." },
        { q: "फिथाइआ मा?", qEn: "What is फिथाइ (phithai)?", a: "फिथाइ माने 'vegetable / greens', आरो बे बिसोरनि खामानि।", aEn: "फिथाइ (phithai) means 'vegetable / greens', and it is their crop." }
      ],
      note: "The genitive -नि (-ni) marks possession: बिसोरनि (biswrni) 'their'. It is the same ending that makes 'your mother' (नोंनि बिमा)."
    },
    {
      id: "rd-why",
      title: "मानो बर' राव सोलोंनो?",
      titleEn: "Why learn Bodo?",
      level: "Advanced",
      text: [
        "रावआ मानसिनि गावनि गोहो। बर' रावआ बर' मानसिनि गोहो आरो गोरा।",
        "जों जुदि बर' राव सोलोंब्ला, जों बर' हारिमु आरो सोलोंनो हागोन। बर' रावआ गोबां बोसोरनि सोदोब लाना दों।",
        "एबा लोगो, रावआ खालि सोदोब नंगा — बे आ मानसिनि गोसो।"
      ],
      rom: [
        "Raoa manshini gaoni goho. Bor' raoa bor' manshini goho aro gwra.",
        "Jwng judi bor' rao solonbla, jwng bor' harimu aro solonw hagwn. Bor' raoa gobang bosorni swdwb lana dong.",
        "Eba logo, raoa khali swdwb nonga — be a manshini goso."
      ],
      en: [
        "A language is a people's identity. The Bodo language is the identity and strength of the Bodo people.",
        "If we learn Bodo, we can learn Bodo culture too. The Bodo language carries the words of many years.",
        "So, friends, a language is not only words — it is a people's heart."
      ],
      questions: [
        { q: "रावआ मा?", qEn: "What is a language, according to the passage?", a: "रावआ मानसिनि गोहो — खालि सोदोब नंगा, बे आ मानसिनि गोसो।", aEn: "A language is a people's identity — not only words, but a people's heart." },
        { q: "'सोलोंब्ला' नि माने मा?", qEn: "What does 'सोलोंब्ला' (solonbla) mean?", a: "'जुदि सोलों' — 'if we learn'.", aEn: "'If (we) learn' — the conditional form." }
      ],
      note: "This is an opinion passage written for practice. The conditional जुदि … -ब्ला (judi … -bla) means 'if … then'."
    }
  ],

  writing: {
    intro:
      "Writing Bodo is largely a matter of reading it well first. The script is Devanagari, so the mechanics are the same as Hindi; what needs care is the sound the letters carry, and the final vowels that Bodo keeps and Hindi drops.",
    table: {
      caption: "A short guide",
      head: ["Form", "How it is laid out", "Example"],
      rows: [
        ["Paragraph", "One idea per paragraph; the verb of each clause comes last.", "जोंनि गामिआव से इस्कुल दों।"],
        ["Letter", "Greeting, then news, then a closing wish.", "खुलुमबाय … मोजां जाथों।"],
        ["Essay", "Introduction, two or three points, then a conclusion.", "रावआ मानसिनि गोहो …"],
        ["Story", "Past-tense verbs throughout; the -बाय or -मोन past forms.", "दिनै आं हाथाइयाव थांबाय।"]
      ]
    },
    notes: [
      "Keep the verb last. A Bodo sentence that ends in its subject will read as English-in-disguise.",
      "Write the final vowel even where Hindi would drop it — बरʼ, not बर.",
      "Every Bodo string in this platform carries a romanisation; do the same in your own notes, so you can check the sound.",
      "Do not invent forms. If you are unsure of a word, ask a speaker or leave a note — that is the single most useful thing a learner can do."
    ]
  }
};
