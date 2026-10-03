/* ============================================================
   SikBodo — shared chrome
   Header with primary navigation, search, theme control,
   animated hamburger trigger, and institutional footer.
   ============================================================ */

(function () {
  const AX = (window.AX = window.AX || {});
  const icon = (n, c) => AX.icons.icon(n, c);

  const NAV = [
    {
      group: "Start here",
      items: [
        { href: "index.html", label: "Overview", key: "home", icon: "home" },
        { href: "lessons.html", label: "Lessons", key: "lessons", icon: "lessons" },
        { href: "script.html", label: "Script & sounds", key: "script", icon: "script" },
        { href: "progress.html", label: "Progress & study record", key: "progress", icon: "progress" },
      ],
    },
    {
      group: "Reference",
      items: [
        { href: "grammar.html", label: "Grammar", key: "grammar", icon: "grammar" },
        { href: "verbs.html", label: "Verbs", key: "verbs", icon: "verbs" },
        { href: "numbers.html", label: "Numbers & time", key: "numbers", icon: "numbers" },
        { href: "dictionary.html", label: "Dictionary", key: "dictionary", icon: "dictionary" },
        { href: "idioms.html", label: "Idioms & proverbs", key: "idioms", icon: "spark" },
      ],
    },
    {
      group: "Practice",
      items: [
        { href: "phrases.html", label: "Phrases", key: "phrases", icon: "phrases" },
        { href: "conversations.html", label: "Conversations", key: "conversations", icon: "conversations" },
        { href: "reading.html", label: "Reading & writing", key: "reading", icon: "library" },
        { href: "quiz.html", label: "Quiz", key: "quiz", icon: "quiz" },
        { href: "translator.html", label: "Translator", key: "translator", icon: "translator" },
      ],
    },
    {
      group: "Background",
      items: [
        { href: "culture.html", label: "Language & community", key: "culture", icon: "culture" },
        { href: "resources.html", label: "Resources", key: "resources", icon: "resources" },
        { href: "contribute.html", label: "Contribute", key: "contribute", icon: "contribute" },
        { href: "about.html", label: "About & sources", key: "about", icon: "about" },
      ],
    },
  ];

  const TOP_LINKS = [
    { href: "index.html", label: "Overview", key: "home" },
    { href: "lessons.html", label: "Lessons", key: "lessons" },
    { href: "script.html", label: "Script", key: "script" },
    { href: "grammar.html", label: "Grammar", key: "grammar" },
    { href: "dictionary.html", label: "Dictionary", key: "dictionary" },
    { href: "quiz.html", label: "Quiz", key: "quiz" },
    { href: "progress.html", label: "Progress", key: "progress" },
  ];

  const FLAT = NAV.reduce((acc, g) => acc.concat(g.items), []);

  function hudHTML() {
    const total = (window.SKB && window.SKB.lessons && window.SKB.lessons.length) || 15;
    const r = AX.store.progress.rank(total);
    const streak = AX.store.visit ? AX.store.visit.get().streak : 0;
    const R = 15, C = 2 * Math.PI * R;
    const off = (C * (1 - Math.min(100, r.levelPercent || 0) / 100)).toFixed(1);
    const title = `Level ${r.level} — ${r.title} · ${r.xp} XP${streak ? ` · ${streak}-day streak` : ""}`;
    return `<a class="hud" id="header-hud" href="progress.html" title="${title}" aria-label="${title}">
      <span class="hud-ring" aria-hidden="true">
        <svg viewBox="0 0 36 36">
          <circle class="hud-ring-bg" cx="18" cy="18" r="${R}" />
          <circle class="hud-ring-fg" cx="18" cy="18" r="${R}" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${off}" />
        </svg>
        <b class="hud-lvl">${r.level}</b>
      </span>
      <span class="hud-stack">
        <span class="hud-xp">${icon("zap")}<b>${r.xp}</b><i>XP</i></span>
        <span class="hud-streak${streak ? " is-on" : ""}">${icon("flame")}<b>${streak}</b><i>day${streak === 1 ? "" : "s"}</i></span>
      </span>
    </a>`;
  }

  function header(page) {
    const meta = window.SKB.meta;
    return `
      <div class="bar">
        <a class="brand" href="index.html" aria-label="${meta.name} — home">
          <svg class="brand-logo" viewBox="0 0 1549 775" width="1549" height="775" role="img" aria-label="SikBodo" focusable="false"><path d="M416.14 229.33C421.55 229.16 426.77 228.17 429.1 234C429.29 235.71 429.48 237.41 429.67 239.12C429.21 242.85 429.86 246.66 429.6 250.42C428.94 259.74 428.14 269.13 426.69 278.37C420.95 314.85 403.68 351.56 374.07 374.55C357.52 387.4 337.59 394.43 319.9 405.39C311.58 410.55 303.81 416.46 296.85 423.36C293.63 426.55 290.62 432.45 286.5 433.7C288.75 396.17 313.32 353.52 335.57 324.08C342.98 314.28 352.08 306.17 360.06 296.91C362.34 294.77 364.61 292.64 366.89 290.5C364.52 291.98 362.15 293.45 359.79 294.93C352.58 297.34 338.57 310.62 332.82 316.32C317.34 331.68 304.2 348.88 293.3 367.77C288.95 375.31 286.26 384.7 281.5 391.74C276.48 382.76 276.07 363.69 276.07 353.5C276.08 343.12 277.35 332.66 280.34 322.71C292.31 282.79 328.57 253.71 367.1 240.57C381.54 235.65 396.05 232.68 411 229.84C412.71 229.67 414.43 229.5 416.14 229.33ZM229.13 346.04C228.59 345.89 228.04 345.74 227.5 345.6C226.38 344.9 225.25 344.2 224.13 343.5C225.4 344.75 226.68 345.99 227.95 347.24C231.45 351.93 236.44 355.7 240.2 360.27C250.52 372.84 257.8 386 263.41 401.26C266.21 408.89 268.6 417.98 267.5 426.12C260.28 423.31 254.05 417.17 247.23 413.33C236.27 407.18 225.2 401.13 215.5 393.01C198.16 378.5 186.56 358.46 180.53 336.92C178.01 327.9 176.46 318.87 175.63 309.55C175.25 305.36 174.34 301.31 176.5 297.59C184 295.35 200.28 301.82 207.7 304.73C235.67 315.67 258.87 332.85 266.14 363.46C267.54 369.34 268.41 375.28 267.5 381.28C263.4 378.01 260.9 373.06 257.43 369.09C250.64 361.32 238.5 350.26 229.13 346.04ZM1035 487.25C1030 487.23 1025 487.22 1020 487.21C1000.41 484.31 981.78 477.47 968.47 462.01C944.48 434.16 943.55 383.22 967.52 355.03C983.01 336.81 1005.73 327.55 1029.5 327.85C1048.95 328.1 1067.73 334.14 1082.34 347.13C1111.52 373.09 1112.96 428.89 1089.36 458.84C1075.58 476.33 1056.49 484.41 1035 487.25ZM1356 487.18C1350.67 487.19 1345.33 487.2 1340 487.21C1330.18 485.74 1321.07 483.69 1312 479.49C1288.37 468.53 1274.45 445.13 1270.82 420C1270.64 418.05 1270.47 416.11 1270.29 414.16C1270.29 409.72 1270.28 405.29 1270.28 400.85C1270.44 399.24 1270.61 397.62 1270.77 396C1273.98 380.81 1277.55 366.62 1288.04 354.56C1296.71 344.59 1308.07 336.39 1320.71 332.25C1348.68 323.08 1384.94 327.46 1405.97 349.55C1436.47 381.59 1432.29 443.45 1397.52 471.05C1385.26 480.77 1371.1 484.53 1356 487.18ZM1190.13 330.32C1191.75 330.5 1193.38 330.69 1195 330.88C1199.1 332.2 1203.39 332.66 1207.5 333.95C1218.1 337.25 1228.64 343.08 1236.57 350.93C1267.89 381.94 1264.96 438.69 1231.29 466.82C1211.35 483.47 1185.24 484.54 1160.5 484.75C1151.5 484.82 1142.5 484.78 1133.5 484.72C1129.08 484.69 1124.03 485.39 1120.01 483.5C1117.57 476.77 1119.2 456.74 1119.18 448.5C1119.12 422.5 1119.18 396.5 1119.16 370.5C1119.16 361.5 1119.13 352.5 1119.17 343.5C1119.19 339.23 1118.5 334.44 1120.1 330.5C1143.44 330.44 1166.78 330.38 1190.13 330.32ZM813 482.9C813.01 432.64 813.01 382.39 813.02 332.13C816.64 329.91 821.36 330.67 825.5 330.67C834.5 330.68 843.5 330.64 852.5 330.66C879.02 330.74 921.78 326.94 932.24 359.32C933.73 363.96 934.45 368.6 934.23 373.5C933.95 379.87 932.46 386.03 928.91 391.37C926.25 395.38 922.43 399.32 918.2 401.7C915.86 403.02 913.34 403.76 911.31 405.5C919.01 408.7 926.03 411.22 931.66 417.82C945.67 434.25 941.91 459.7 925.47 472.99C906.08 488.66 866.11 484.74 842.5 484.67C835.85 484.65 817.8 486.3 813 482.9ZM845.89 357.09C845.72 357.23 845.55 357.36 845.39 357.5C845.37 362 845.35 366.5 845.33 371C845.47 378.83 845.61 386.67 845.75 394.5C855.16 394.6 864.58 394.7 874 394.81C875.63 394.63 877.26 394.46 878.89 394.28C890.53 393.98 898.93 386.48 898.45 374.5C898.28 370.26 897.12 366.44 894.24 363.24C885.87 353.98 869.64 356.33 858.5 356.4C854.52 356.43 849.39 355.55 845.89 357.09ZM1019.74 356.38C968.17 365.8 974.21 466.72 1033.5 459.27C1082.2 453.15 1084.48 364.23 1036.47 356.13C1030.99 355.21 1025.2 355.38 1019.74 356.38ZM1340.61 356.28C1295.45 364.1 1292.46 444.56 1334.76 457.67C1342.08 459.94 1350.76 460.06 1358.26 458.61C1375.13 455.35 1385.92 439.44 1389.31 423.68C1395.04 396.98 1388.17 359.89 1355.5 356.08C1350.59 355.51 1345.49 355.43 1340.61 356.28ZM1177 456.79C1178.64 456.61 1180.28 456.44 1181.93 456.26C1209.61 454.41 1221.76 433.13 1222.16 407.5C1222.35 395.41 1220.05 382.91 1212.28 373.19C1200.96 359.04 1183.44 357.22 1166.5 357.41C1162.24 357.46 1157.7 357.12 1153.5 357.7C1150.95 365.68 1152.61 380.61 1152.62 389.5C1152.63 404.5 1152.6 419.5 1152.6 434.5C1152.6 441.47 1151.33 449.72 1152.83 456.5C1160.88 456.6 1168.94 456.69 1177 456.79ZM148.84 418.33C150.56 418.49 152.28 418.64 154 418.8C164.79 421.06 175.79 422.12 186.54 424.78C211.91 431.03 236.94 442.35 256.05 460.45C263 467.04 268.76 474.65 273.58 482.92C275.37 486.01 277.61 489.88 277.35 493.5C273.49 492.02 270.15 488.26 266.83 485.65C261.63 481.54 255.86 477.67 250.06 474.47C229.23 462.93 206.99 456.3 183.51 452.87C175.26 451.66 166.4 450.04 158.04 450.68C151.37 450.69 144.71 450.7 138.04 450.71C136.53 450.34 135.01 449.97 133.5 449.6C133.48 446.68 134.76 444.01 135.55 441.22C137.47 434.45 139.32 425.39 143.5 419.71C145.28 419.25 147.06 418.79 148.84 418.33ZM404.96 418.3C408.67 418.37 412.38 418.43 416.09 418.5C420.6 422.44 422.79 433.95 424.67 439.77C425.78 443.2 427.13 445.68 426.5 449.23C421.42 451.29 414.06 449.9 408.5 450.08C396.75 450.46 385.2 451.33 373.62 453.3C350.2 457.29 327.36 465.06 307.16 477.67C299.48 482.46 292.79 488.51 285.5 493.82C284.97 483.69 297.81 468.27 304.87 461.37C322.66 444 345.86 431.93 369.71 425.3C379.71 422.52 389.93 421.2 400 418.86C401.65 418.67 403.31 418.49 404.96 418.3ZM845.7 420.01C845.58 423.01 845.45 426 845.33 429C845.33 435.33 845.32 441.67 845.32 448C845.35 451.5 845.38 455 845.41 458.5C845.61 458.59 845.8 458.69 846 458.78C851.04 459.57 856.37 459.2 861.5 459.22C877.46 459.27 905.72 462.1 905.01 438.5C904.35 416.53 879.02 419.01 863.5 419C858.25 418.99 850.13 417.59 845.7 420.01Z" fill="var(--bodo-green)" fill-rule="evenodd" stroke="var(--bodo-green)" stroke-width="0.25" stroke-linejoin="round"/><path d="M594.29 353.5C587.69 359.7 581.1 365.9 574.5 372.09C573.53 371.98 572.67 372.14 571.72 371.76C569.31 370.8 567.21 366.99 565.26 365.25C563.35 363.55 561.06 361.97 558.85 360.69C555.19 358.55 550.39 356.34 546.24 355.4C533.82 352.57 514.26 356.4 514.87 372.5C515.43 387.59 535 390.85 546.29 394.36C566.23 400.57 590.83 407.2 597.65 429.73C598.99 434.15 599.13 438.89 598.98 443.5C598.81 448.48 597.63 453.64 595.64 458.22C583.95 485.1 548.91 489.24 523.5 487.29C516.05 486.72 508.61 485.47 501.58 482.85C491.87 479.22 473.48 467.39 471.49 456.5C474.05 452.36 490.87 439.88 495.5 438.76C500.12 442.34 503.54 447.6 508.12 451.39C517.25 458.95 528.89 461.56 540.5 461.07C549.4 460.69 560.6 455.89 560.72 445.5C560.9 430.72 538.58 426.27 527.53 422.98C506.12 416.6 482.41 405.64 479.91 380.5C479.49 376.26 479.38 371.75 480.09 367.53C484.44 341.61 511.65 328.81 535.5 327.97C545.79 327.61 556.02 329.49 565.73 332.64C575.16 335.7 590.99 343.4 594.29 353.5ZM620 330.81C628.67 330.82 637.33 330.83 646 330.83C649.2 333.57 648.36 337.58 648.37 341.5C648.38 349.83 648.44 358.17 648.43 366.5C648.39 393.5 648.3 420.5 648.35 447.5C648.36 455.5 648.48 463.5 648.4 471.5C648.36 475.51 648.8 479.83 647.19 483.5C641.73 486.48 632.65 484.85 626.5 484.79C623.42 484.76 620.67 485.12 618.03 483.5C615.46 477.2 617.02 456.46 616.99 448.5C616.87 421.17 617.06 393.83 617.07 366.5C617.07 358.17 616.99 349.83 617.03 341.5C617.05 337.33 616.24 333.35 620 330.81ZM679 330.74C686.67 330.77 694.33 330.81 702 330.84C706.38 334.55 704.64 343.23 704.64 348.5C704.63 358.17 704.69 367.83 704.66 377.5C704.65 382.58 703.77 388.36 705.5 393C710.79 390.4 716.13 381.32 719.97 376.47C728.65 365.52 737.66 354.82 746.58 344.1C750.23 339.7 753.33 334.29 758 330.88C770 330.85 782 330.82 794 330.79C794.65 331.69 795.29 332.6 795.94 333.5C777.49 355.17 759.03 376.83 740.58 398.5C743.21 405.86 749.93 412.67 754.47 419.06C764.17 432.67 773.81 446.31 783.72 459.76C787.13 464.39 790.4 469.11 793.8 473.73C795.24 475.68 798.08 478.41 798.72 480.77C799.02 481.87 798.74 482.42 798.75 483.5C794.82 486.04 784.43 484.81 779.5 484.82C774.2 484.82 762.09 486.19 757.67 483.86C753.05 481.43 747.89 471.17 744.82 466.69C737.65 456.25 730.27 445.93 722.89 435.64C719.33 430.68 716.18 424.64 711.5 420.76C709.51 422.73 705.74 425.81 704.95 428.55C703.85 432.35 704.7 437.56 704.7 441.5C704.72 450.83 704.69 460.17 704.61 469.5C704.57 474.07 705.44 479.47 703.5 483.65C700.56 485.05 697.77 484.8 694.5 484.8C688.25 484.8 679.29 486.53 673.73 483.5C672.03 478.97 672.98 473.33 673.01 468.5C673.06 458.83 672.99 449.17 673.02 439.5C673.1 414.83 672.77 390.17 673.02 365.5C673.11 356.3 671.46 340.86 673.57 332.5C675.38 331.91 677.19 331.33 679 330.74ZM415 490.23C410.99 490.38 406.98 490.53 402.97 490.68C374.35 490.95 344.62 496.19 319.02 509.54C310.88 513.79 302.94 519.45 296.42 525.93C292.76 529.58 288.76 535.88 283.3 536.6C273.9 537.83 268.34 526.76 261.85 521.63C248.56 511.12 233.69 503.91 217.45 499.11C196.55 492.93 175.19 491.05 153.5 490.21C147.6 489.98 141.47 489.92 135.58 490.38C130.99 490.74 125.88 491.73 121.72 489.5C120.45 485.62 121.97 481.41 123.05 477.52C124.03 474.01 125.66 463.96 128.23 461.76C130.8 459.57 135.39 460.28 138.5 460.2C146.77 459.98 154.98 460.1 163.25 460.48C192.85 461.83 224.02 469.33 249.35 485.15C257.15 490.02 264.03 495.49 270.83 501.65C274.08 504.59 276.63 508.66 280.5 510.71C285.59 510 289.45 504.08 293.11 500.61C300.41 493.66 308.49 487.73 317.24 482.7C343.19 467.76 373.87 461.43 403.5 460.06C410.84 459.72 418.16 459.73 425.5 459.98C428.39 460.07 432.35 459.69 434.57 461.95C437.61 465.04 437.93 472.26 439.26 476.29C440.73 480.77 442.89 484.97 440.81 489.5C435.62 492.85 421.62 489.86 415 490.23Z" fill="var(--bodo-ink)" fill-rule="evenodd" stroke="var(--bodo-ink)" stroke-width="0.25" stroke-linejoin="round"/><path d="M416.14 229.33C414.43 229.5 412.71 229.67 411 229.84C411.17 229.56 411.33 229.28 411.5 229C413.05 229.11 414.59 229.22 416.14 229.33ZM429.1 234C429.4 234.17 429.7 234.33 430 234.5C429.89 236.04 429.78 237.58 429.67 239.12C429.48 237.41 429.29 235.71 429.1 234ZM360.06 296.91C359.97 296.25 359.88 295.59 359.79 294.93C362.15 293.45 364.52 291.98 366.89 290.5C364.61 292.64 362.34 294.77 360.06 296.91ZM646 330.83C637.33 330.83 628.67 330.82 620 330.81C623.94 328.8 633.65 330 638.5 330C641.14 330 643.78 329.67 646 330.83ZM702 330.84C694.33 330.81 686.67 330.77 679 330.74C682.23 329.25 698.95 329.23 702 330.84ZM794 330.79C782 330.82 770 330.85 758 330.88C760.62 329.43 764.35 330 767.5 330C773.27 330 789.74 328.68 794 330.79ZM1190.13 330.32C1191.59 330.21 1193.04 330.11 1194.5 330C1194.67 330.29 1194.83 330.59 1195 330.88C1193.38 330.69 1191.75 330.5 1190.13 330.32ZM813.02 332.13C813.01 382.39 813.01 432.64 813 482.9C811.37 480.5 812 476.63 812 473.5C812 466.17 812 458.83 812 451.5C812 423.17 812 394.83 812 366.5C812 358.5 812 350.5 812 342.5C812 339.17 811.24 334.65 813.02 332.13ZM229.13 346.04C228.74 346.44 228.34 346.84 227.95 347.24C226.68 345.99 225.4 344.75 224.13 343.5C225.25 344.2 226.38 344.9 227.5 345.6C228.04 345.74 228.59 345.89 229.13 346.04ZM845.89 357.09C845.92 361.56 845.96 366.03 846 370.5C845.78 370.67 845.55 370.83 845.33 371C845.35 366.5 845.37 362 845.39 357.5C845.55 357.36 845.72 357.23 845.89 357.09ZM878.89 394.28C877.26 394.46 875.63 394.63 874 394.81C874.17 394.54 874.33 394.27 874.5 394C875.96 394.09 877.43 394.19 878.89 394.28ZM1270.77 396C1270.61 397.62 1270.44 399.24 1270.28 400.85C1270.19 399.4 1270.09 397.95 1270 396.5C1270.26 396.33 1270.51 396.17 1270.77 396ZM1270.29 414.16C1270.47 416.11 1270.64 418.05 1270.82 420C1270.55 419.83 1270.27 419.67 1270 419.5C1270.1 417.72 1270.19 415.94 1270.29 414.16ZM148.84 418.33C150.39 418.22 151.95 418.11 153.5 418C153.67 418.27 153.83 418.53 154 418.8C152.28 418.64 150.56 418.49 148.84 418.33ZM404.96 418.3C403.31 418.49 401.65 418.67 400 418.86C400.17 418.57 400.33 418.29 400.5 418C401.99 418.1 403.47 418.2 404.96 418.3ZM845.7 420.01C845.8 422.84 845.9 425.67 846 428.5C845.78 428.67 845.55 428.83 845.33 429C845.45 426 845.58 423.01 845.7 420.01ZM845.32 448C845.54 448.17 845.77 448.33 846 448.5C846 451.93 846 455.35 846 458.78C845.8 458.69 845.61 458.59 845.41 458.5C845.38 455 845.35 451.5 845.32 448ZM158.04 450.68C151.37 450.69 144.71 450.7 138.04 450.71C144.71 450.7 151.37 450.69 158.04 450.68ZM1181.93 456.26C1180.28 456.44 1178.64 456.61 1177 456.79C1177.17 456.52 1177.33 456.26 1177.5 456C1178.98 456.09 1180.45 456.18 1181.93 456.26ZM1020 487.21C1025 487.22 1030 487.23 1035 487.25C1034.83 487.5 1034.67 487.75 1034.5 488C1029.83 488 1025.17 488 1020.5 488C1020.33 487.74 1020.17 487.47 1020 487.21ZM1340 487.21C1345.33 487.2 1350.67 487.19 1356 487.18C1355.83 487.45 1355.67 487.73 1355.5 488C1350.5 488 1345.5 488 1340.5 488C1340.33 487.74 1340.17 487.47 1340 487.21ZM415 490.23C414.83 490.49 414.67 490.74 414.5 491C410.66 490.89 406.82 490.79 402.97 490.68C406.98 490.53 410.99 490.38 415 490.23Z" fill="var(--bodo-paper)" fill-rule="evenodd" stroke="var(--bodo-paper)" stroke-width="0.25" stroke-linejoin="round"/></svg>
        </a>

        <nav class="header-nav" aria-label="Primary navigation">
          ${TOP_LINKS.map(
            (l) =>
              `<a href="${l.href}"${l.key === page ? ' aria-current="page"' : ""}>${l.label}</a>`
          ).join("")}
        </nav>

        <div class="header-tools">
          ${hudHTML()}
          <form class="header-search" role="search" action="dictionary.html" method="get">
            <label class="visually-hidden" for="header-q">Search the dictionary</label>
            ${icon("search")}
            <input id="header-q" type="search" name="q" placeholder="Search words…" autocomplete="off">
            <kbd class="search-kbd" aria-hidden="true">/</kbd>
          </form>
          <button class="icon-btn" id="sfx-toggle" type="button" aria-label="Toggle sound effects" title="Toggle UI sound effects">${icon("volume")}</button>
          <button class="icon-btn" id="theme-toggle" type="button" aria-label="Switch theme">${icon("moon")}</button>
          <button class="nav-toggle" id="nav-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="sidebar">
            <span class="burger" aria-hidden="true">
              <i></i><i></i><i></i>
            </span>
            <span class="nav-toggle-lbl">Menu</span>
          </button>
        </div>
      </div>`;
  }

  function footer() {
    const meta = window.SKB.meta;
    return `
      <div class="inner">
        <div>
          <h3>${meta.name} <span class="ver">v${meta.version}</span></h3>
          <p style="margin:0 0 var(--sp-3);max-width:46ch;color:var(--ink-soft)">${meta.description}</p>
          <p style="margin:0;font-size:var(--fs-xs);color:var(--muted)">
            <span class="bo">${meta.nameBo}</span> · ${meta.license} licence · Built by ${meta.author}
          </p>
          ${meta.brand ? `<div class="maker-mark">
            <span class="maker-label">${meta.brand.label}</span>
            ${meta.brand.svg}
          </div>` : ""}
        </div>
        <div>
          <h3>Explore</h3>
          <ul>
            ${FLAT.slice(0, 7).map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}
          </ul>
        </div>
        <div>
          <h3>Project</h3>
          <ul>
            <li><a href="${meta.repo}">Source repository</a></li>
            <li><a href="contribute.html">Contribute</a></li>
            <li><a href="about.html">Accuracy &amp; sources</a></li>
            <li><a href="resources.html">Further reading</a></li>
            <li><a href="${meta.repo}/blob/main/CHANGELOG.md">Changelog</a></li>
            <li><a href="${meta.repo}/blob/main/SECURITY.md">Security</a></li>
          </ul>
        </div>
      </div>
      <div class="inner" style="grid-template-columns:1fr">
        <p class="fine">
          <strong>Accuracy.</strong> Bodo is a lower-resource language with several regional dialects and no single
          settled romanisation. This platform was compiled from public learner resources and published descriptions
          of Bodo grammar — not from native fluency. Where sources disagreed, the more widely repeated form was kept
          and uncertain items are flagged.
        </p>
      </div>`;
  }

  /* The install invitation. Like the header and footer, it is defined here —
     once for every page — rather than repeated in 19 documents. It does not
     need to paint before JavaScript, so there is no reason for it to be
     static markup. */
  function installBanner() {
    const meta = window.SKB.meta;
    return `
      <div class="install-banner" id="install-banner" data-install-banner role="region" aria-label="Install ${meta.name} as an app" hidden>
        <img class="install-banner-mark" src="assets/icon-192.png" alt="" width="56" height="56" loading="lazy" decoding="async">
        <div class="install-banner-copy">
          <p class="install-banner-title">Install ${meta.name} as an app</p>
          <p class="install-banner-text">Add it to your home screen — it opens full screen and keeps working offline.</p>
        </div>
        <div class="install-banner-actions">
          <button class="btn primary small" type="button" data-install-app hidden>Install app</button>
          <button class="icon-btn" type="button" data-install-dismiss aria-label="Dismiss the install suggestion">&#10005;</button>
        </div>
      </div>`;
  }

  function setDrawerState(open) {
    const sb = document.getElementById("sidebar");
    const toggle = document.getElementById("nav-toggle");
    const backdrop = document.getElementById("drawer-backdrop");
    if (!sb) return;

    sb.classList.toggle("open", open);
    document.body.classList.toggle("drawer-open", open);
    if (backdrop) backdrop.classList.toggle("open", open);

    if (toggle) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    }
  }

  function mount(page) {
    const h = document.getElementById("site-header");
    const f = document.getElementById("site-footer");
    if (h) { h.className = "site-header"; h.innerHTML = header(page); }
    if (f) {
      f.className = "site-footer";
      f.innerHTML = footer();

      // the install invitation sits directly above the footer
      if (!document.getElementById("install-banner")) {
        const wrap = document.createElement("div");
        wrap.className = "container";
        wrap.innerHTML = installBanner();
        f.parentNode.insertBefore(wrap, f);
      }
    }

    if (!document.getElementById("drawer-backdrop")) {
      const bd = document.createElement("div");
      bd.id = "drawer-backdrop";
      bd.className = "drawer-backdrop";
      bd.setAttribute("aria-hidden", "true");
      bd.addEventListener("click", () => setDrawerState(false));
      document.body.appendChild(bd);
    }

    document.addEventListener("ax:progress", () => {
      const oldHud = document.getElementById("header-hud");
      if (oldHud) oldHud.outerHTML = hudHTML();
    });

    const toggle = document.getElementById("nav-toggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        const sb = document.getElementById("sidebar");
        if (!sb) return;
        setDrawerState(!sb.classList.contains("open"));
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const sb = document.getElementById("sidebar");
        if (sb && sb.classList.contains("open")) {
          setDrawerState(false);
        }
      }
    });

    const sfxBtn = document.getElementById("sfx-toggle");
    if (sfxBtn) {
      const paintSfx = () => {
        const on = !AX.sfx || AX.sfx.isEnabled();
        sfxBtn.innerHTML = icon(on ? "volume" : "volume-off");
        sfxBtn.setAttribute("aria-label", on ? "Mute sound effects" : "Enable sound effects");
        sfxBtn.setAttribute("title", on ? "Sound effects: On (click to mute)" : "Sound effects: Muted (click to enable)");
      };
      paintSfx();
      sfxBtn.addEventListener("click", () => {
        if (AX.sfx) AX.sfx.toggle();
        paintSfx();
      });
      document.addEventListener("ax:sfx", paintSfx);
    }

    const theme = document.getElementById("theme-toggle");
    if (theme) {
      const paint = () => {
        const dark = AX.prefs.isDark();
        theme.innerHTML = icon(dark ? "sun" : "moon");
        theme.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      };
      paint();
      theme.addEventListener("click", () => {
        AX.prefs.set("theme", AX.prefs.isDark() ? "light" : "dark");
        paint();
      });
      document.addEventListener("ax:prefs", paint);
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = (document.activeElement && document.activeElement.tagName) || "";
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (document.activeElement && document.activeElement.isContentEditable)) {
          return;
        }
        const searchInput = document.getElementById("dict-search") || document.getElementById("phrase-search") || document.getElementById("header-q");
        if (searchInput && searchInput.offsetParent !== null) {
          e.preventDefault();
          searchInput.focus();
          searchInput.select();
        }
      }
    });
  }

  AX.chrome = { NAV, FLAT, mount, setDrawerState };
})();
