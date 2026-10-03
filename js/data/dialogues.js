/* ============================================================
   SikBodo — conversations
   Real-life dialogues with English, Bodo and a romanisation side
   by side, each with a note on how the exchange actually sounds
   in speech. Composed for this platform as practice material;
   not verified by a native speaker.
   ============================================================ */

window.SKB = window.SKB || {};

window.SKB.dialogues = [
  {
    title: "A neighbour on the road",
    setting: "On the street, morning",
    level: "Basic",
    lines: [
      { who: "Rupa", en: "Greetings! Good morning.", bo: "खुलुमबाय! गोजोन फुंबिलि।", rom: "Khulumbai! Gojon fungbili." },
      { who: "Anil", en: "Greetings! Are you well?", bo: "खुलुमबाय! नों मोजां दों ना?", rom: "Khulumbai! Nwng mwjang dong na?" },
      { who: "Rupa", en: "I am well, thank you. And you?", bo: "आं मोजां दों, साबायखर। नोंलाय?", rom: "Ang mwjang dong, sabaikhor. Nwnglai?" },
      { who: "Anil", en: "I am well too. Where are you off to?", bo: "आंबो मोजां दों। बबेयाव थांगासिनो दों?", rom: "Angbw mwjang dong. Bobeyao thanggasinw dong?" },
      { who: "Rupa", en: "I am going to the market. I need to buy some vegetables.", bo: "आं हाथाइयाव थांगासिनो दों। फिथाइ बायनो नांगौ।", rom: "Ang hathaiyao thanggasinw dong. Phithai bainw nangau." }
    ],
    note: "Bodo keeps the verb last, so 'I am going to the market' ends in थांगासिनो दों (thanggasinw dong). The progressive uses the -गासिनो form plus दों."
  },
  {
    title: "At the market",
    setting: "Vegetable stall, daytime",
    level: "Basic",
    lines: [
      { who: "Buyer", en: "How much is this?", bo: "बे बेसेबां?", rom: "Be besebang?" },
      { who: "Seller", en: "Twenty rupees.", bo: "नैजि रुपौ।", rom: "Naiji rupou." },
      { who: "Buyer", en: "That is too much. Give me a little less.", bo: "बे जोबोद। खैसे खम हो।", rom: "Be jwobwd. Khaise kham ho." },
      { who: "Seller", en: "All right. Take it.", bo: "मोजां। ला।", rom: "Mwjang. La." },
      { who: "Buyer", en: "Thank you.", bo: "साबायखर।", rom: "Sabaikhor." }
    ],
    note: "Numbers come before the noun, and the classifier is often dropped when the amount is already clear — नैजि रुपौ (naiji rupou) is 'twenty rupees'."
  },
  {
    title: "Ordering food",
    setting: "A small eatery",
    level: "Basic",
    lines: [
      { who: "Guest", en: "I am hungry. What do you have?", bo: "आं उंखाम नांगौ। मा दों?", rom: "Ang wngkham nangau. Ma dong?" },
      { who: "Host", en: "We have rice and fish curry.", bo: "उंखाम आरो नानि उंख्रि दों।", rom: "Wngkham aro nani wngkhri dong." },
      { who: "Guest", en: "Please give me rice and fish.", bo: "आंखौ उंखाम आरो ना हो।", rom: "Angkhou wngkham aro na ho." },
      { who: "Host", en: "Please sit down.", bo: "जेराय।", rom: "Jerai." },
      { who: "Guest", en: "It is delicious. Thank you.", bo: "जोबोद मोजां। साबायखर।", rom: "Jwobwd mwjang. Sabaikhor." }
    ],
    note: "The object marker -खौ (-khou) appears on आं (ang) as आंखौ (angkhou) 'to me'. It marks the recipient of हो (ho) 'give'."
  },
  {
    title: "Asking directions",
    setting: "A village lane",
    level: "Basic",
    lines: [
      { who: "Visitor", en: "Excuse me, where is the market?", bo: "निमाहा, हाथाइआ बबेयाव?", rom: "Nimaha, hathaia bobeyao?" },
      { who: "Local", en: "Go straight, then turn left.", bo: "थोंजों थां, उनाव आग्सि गिदिं।", rom: "Thongjwng thang, unao agsi giding." },
      { who: "Visitor", en: "Is it far?", bo: "गोजौ ना?", rom: "Gojwo na?" },
      { who: "Local", en: "Not far. It is near.", bo: "गोजौ नंगा। खाथियाव दों।", rom: "Gojwo nonga. Khathiyao dong." },
      { who: "Visitor", en: "Thank you.", bo: "साबायखर।", rom: "Sabaikhor." }
    ],
    note: "Note the yes/no question pattern: a statement plus ना (na). 'Is it far?' is simply 'far' plus the question particle."
  },
  {
    title: "Meeting a relative",
    setting: "At a family home",
    level: "Elementary",
    lines: [
      { who: "Aunt", en: "You have come! Come in.", bo: "नों फैबाय! फै, सिंआव।", rom: "Nwng faibai! Fai, singao." },
      { who: "Nephew", en: "Greetings, aunt. How are you?", bo: "खुलुमबाय, आबो। नों मोजां दों ना?", rom: "Khulumbai, abo. Nwng mwjang dong na?" },
      { who: "Aunt", en: "I am well. How is your mother?", bo: "आं मोजां दों। नोंनि बिमा माब्रै दों?", rom: "Ang mwjang dong. Nwngni bima mabrwai dong?" },
      { who: "Nephew", en: "She is well too.", bo: "बिबो मोजां दों।", rom: "Bibw mwjang dong." },
      { who: "Aunt", en: "Sit down, I will bring tea.", bo: "जेराय, आं साहा लाबोगोन।", rom: "Jerai, ang saha labw gwn." }
    ],
    note: "Kinship words take a possessive ending: नोंनि बिमा (nwngni bima) is 'your mother'. The genitive -नि (-ni) does the work of English 's."
  },
  {
    title: "At the doctor",
    setting: "A small clinic",
    level: "Elementary",
    lines: [
      { who: "Patient", en: "I am not well, doctor.", bo: "आं मोजां नंगा, देहा फाहामगिरि।", rom: "Ang mwjang nonga, deha phahamgiri." },
      { who: "Doctor", en: "What is the problem?", bo: "मा जेंना?", rom: "Ma jenna?" },
      { who: "Patient", en: "I have a headache and a fever.", bo: "आंनि खोरो सा आरो देहा जोबोद।", rom: "Angni khoro sa aro deha jwobwd." },
      { who: "Doctor", en: "Since when?", bo: "माब्लानिफ्राय?", rom: "Mablanifrai?" },
      { who: "Patient", en: "Since yesterday.", bo: "मैयानिफ्राय।", rom: "Maiyanifrai." }
    ],
    note: "The ablative -निफ्राय (-nifrai) means 'from' or 'since' — मैयानिफ्राय (maiyanifrai) 'since yesterday'."
  },
  {
    title: "In class",
    setting: "A village school",
    level: "Elementary",
    lines: [
      { who: "Teacher", en: "Good morning, everyone.", bo: "गोजोन फुंबिलि, गासैबो।", rom: "Gojon fungbili, gasaibw." },
      { who: "Students", en: "Good morning, teacher.", bo: "गोजोन फुंबिलि, फोरोंगिरि।", rom: "Gojon fungbili, fwrwnggiri." },
      { who: "Teacher", en: "Open your books.", bo: "नोंनि बिजाबखौ खेव।", rom: "Nwngni bijabkhou khew." },
      { who: "Teacher", en: "Repeat after me.", bo: "आंनि उनाव बुंफिन।", rom: "Angni unao bungphin." },
      { who: "Students", en: "Very good!", bo: "जोबोर मोजां!", rom: "Jwobwr mwjang!" }
    ],
    note: "गासैबो (gasaibw) is 'everyone' — the word गासै (gaswi) 'all' plus the emphatic -बो (-bw)."
  },
  {
    title: "On the phone",
    setting: "A phone call",
    level: "Elementary",
    lines: [
      { who: "A", en: "Hello, who is speaking?", bo: "खुलुमबाय, सोर बुंगासिनो दों?", rom: "Khulumbai, swr bunggasinw dong?" },
      { who: "B", en: "It is Anil. Are you free tomorrow?", bo: "आं अनिल। गाबोन नों फुर्सत दों ना?", rom: "Ang Anil. Gabon nwng phursot dong na?" },
      { who: "A", en: "Yes, in the morning I am free.", bo: "नंगौ, फुंआव आं फुर्सत दों।", rom: "Nongau, fungwao ang phursot dong." },
      { who: "B", en: "Then call me.", bo: "अब्ला आंखौ कल खालाम।", rom: "Abla angkhou call khalam." },
      { who: "A", en: "All right.", bo: "मोजां।", rom: "Mwjang." }
    ],
    note: "The locative -आव (-ao) marks time as well as place: फुंआव (fungao) 'in the morning'."
  },
  {
    title: "At Bwisagu",
    setting: "The new-year festival, spring",
    level: "Intermediate",
    lines: [
      { who: "Host", en: "Happy Bwisagu! Come, come in.", bo: "ब्विसागु हारिमु मोजां जाथों! फै, सिंआव फै।", rom: "Bwisagu harimu mwjang jathwng! Fai, singao fai." },
      { who: "Guest", en: "Happy Bwisagu to you too.", bo: "नोंबो ब्विसागु मोजां जाथों।", rom: "Nwngbw bwisagu mwjang jathwng." },
      { who: "Host", en: "Have some rice beer.", bo: "जौ लों।", rom: "Jau lwng." },
      { who: "Guest", en: "Will the dancing begin soon?", bo: "मोसानाय गोख्रै जागोन ना?", rom: "Mosanai gokhrai jagwn na?" },
      { who: "Host", en: "Yes — listen, the drum has started.", bo: "नंगौ — खोनथि, खामआ हारबाय।", rom: "Nongau — khonthi, khama harbai." }
    ],
    note: "Bwisagu is the Bodo new year, in mid-April. Kham (drum), sifung (flute) and jotha (cymbals) are the festival instruments."
  },
  {
    title: "Talking about the weather",
    setting: "A veranda, afternoon",
    level: "Intermediate",
    lines: [
      { who: "A", en: "It is very hot today.", bo: "दिनै जोबोद जोबोद।", rom: "Dinai jwobwd jwobwd." },
      { who: "B", en: "Yes. Maybe it will rain.", bo: "नंगौ। माबोबो अखा हागोन।", rom: "Nongau. Mabwbo akha hagwn." },
      { who: "A", en: "If it rains, the fields will be happy.", bo: "जुदि अखा हायोब्ला, हालि गोजोनगोन।", rom: "Judi akha hayobla, hali gojongwn." },
      { who: "B", en: "True. Let us wait.", bo: "सैथो। जों ने।", rom: "Saitwo. Jwng ne." }
    ],
    note: "The conditional uses जुदि (judi) 'if' with a subordinated verb form ending in -ब्ला (-bla)."
  },
  {
    title: "At the bank",
    setting: "A town bank",
    level: "Intermediate",
    lines: [
      { who: "Customer", en: "Where do I change money?", bo: "आं रां बबेयाव सोलायनो हागोन?", rom: "Ang rang bobeyao solainw hagwn?" },
      { who: "Clerk", en: "At the next window.", bo: "उननि खिरखिआव।", rom: "Unni khirikhiao." },
      { who: "Customer", en: "How much is the charge?", bo: "बेसेबां खर्च जागोन?", rom: "Besebang kharch jagwn?" },
      { who: "Clerk", en: "A little. Please wait.", bo: "खैसे। जासिगोन ने।", rom: "Khaise. Jasigon ne." },
      { who: "Customer", en: "Thank you.", bo: "साबायखर।", rom: "Sabaikhor." }
    ],
    note: "The future -गोन (-gwn) marks an action to come: जागोन (jagwn) 'will be'."
  },
  {
    title: "Making a plan",
    setting: "Two friends, evening",
    level: "Intermediate",
    lines: [
      { who: "A", en: "What will you do tomorrow?", bo: "गाबोन नों मा मावगोन?", rom: "Gabon nwng ma maogwn?" },
      { who: "B", en: "I will go to the village.", bo: "आं गामियाव थांगोन।", rom: "Ang gamiyao thanggwn." },
      { who: "A", en: "Come with me — we will go together.", bo: "आंजों फै — जों लोगो थांगोन।", rom: "Angjwng fai — jwng logo thanggwn." },
      { who: "B", en: "All right, at what time?", bo: "मोजां, माब्ला?", rom: "Mwjang, mabla?" },
      { who: "A", en: "In the morning.", bo: "फुंआव।", rom: "Fungao." }
    ],
    note: "Here जों (jwng) is the inclusive 'we' — it includes the person being spoken to, which is exactly why the invitation works."
  },
  {
    title: "Apologising",
    setting: "A shop",
    level: "Intermediate",
    lines: [
      { who: "A", en: "I am sorry, I am late.", bo: "निमाहा हो, आं गोबां जाबाय।", rom: "Nimaha ho, ang gobang jabai." },
      { who: "B", en: "It doesn't matter.", bo: "मा गोनां नंगा।", rom: "Ma gonang nonga." },
      { who: "A", en: "Please forgive me.", bo: "जासिगोन निमाहा हो।", rom: "Jasigon nimaha ho." },
      { who: "B", en: "It is fine. Come, sit.", bo: "मोजां। फै, जेराय।", rom: "Mwjang. Fai, jerai." }
    ],
    note: "Bodo politeness leans on set courtesies rather than a large honorific verb system: निमाहा (nimaha) 'sorry' and जासिगोन (jasigon) 'please' carry the tone."
  },
  {
    title: "Congratulating someone",
    setting: "After good news",
    level: "Intermediate",
    lines: [
      { who: "A", en: "I heard your good news!", bo: "आं नोंनि मोजां खबर खोनबाय!", rom: "Ang nwngni mwjang khabor khonbai!" },
      { who: "B", en: "Thank you very much.", bo: "जोबोद साबायखर।", rom: "Jwobwd sabaikhor." },
      { who: "A", en: "May you be happy always.", bo: "नों सानफ्रोमबो गोजोन जाथों।", rom: "Nwng sanphrombo gojon jathwng." },
      { who: "B", en: "And you too.", bo: "नोंबो।", rom: "Nwngbw." }
    ],
    note: "सानफ्रोमबो (sanphrombo) means 'every day, always'. The optative ending -जाथों (-jathwng) expresses a wish: 'may you be …'."
  }
];
