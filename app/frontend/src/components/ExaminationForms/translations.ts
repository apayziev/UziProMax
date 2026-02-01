/**
 * Barcha UZI formalari uchun umumiy tarjimalar
 * DRY prinsipi - bir joyda yozib, hamma joyda ishlatamiz
 */

export type Language = "uz" | "ru"

export function getCommonTranslations(language: Language) {
  return {
    // Umumiy
    select: language === "ru" ? "Выберите" : "Tanlang",
    norm: language === "ru" ? "норма" : "norma",
    auto: language === "ru" ? "автоматически" : "avtomatik",
    yes: language === "ru" ? "есть" : "bor",
    no: language === "ru" ? "нет" : "yo'q",
    none: language === "ru" ? "нет" : "yo'q",
    
    // O'lchov birliklari
    mm: language === "ru" ? "мм" : "mm",
    ml: language === "ru" ? "мл" : "ml",
    gram: language === "ru" ? "г" : "g",
    
    // O'lchamlar
    length: language === "ru" ? "Длина" : "Uzunligi",
    width: language === "ru" ? "Ширина" : "Kengligi",
    thickness: language === "ru" ? "Толщина" : "Qalinligi",
    volume: language === "ru" ? "Объем" : "Hajmi",
    size: language === "ru" ? "Размеры" : "O'lchamlari",
    lengthWidth: language === "ru" ? "длина х ширина" : "uzunligi x kengligi",
    lengthWidthThickness: language === "ru" ? "длина х ширина х толщина" : "uzunligi x kengligi x qalinligi",
    
    // Konturlar
    contours: language === "ru" ? "Контуры" : "Konturlar",
    smooth: language === "ru" ? "ровные, четкие" : "tekis, aniq",
    smoothOnly: language === "ru" ? "ровные" : "tekis",
    uneven: language === "ru" ? "неровные" : "notekis",
    unclear: language === "ru" ? "нечеткие" : "noaniq",
    bumpy: language === "ru" ? "бугристые" : "bo'rtiqli",
    
    // Tuzilish
    structure: language === "ru" ? "Структура" : "Tuzilishi",
    echostructure: language === "ru" ? "Эхоструктура" : "Exotuzilma",
    homogeneous: language === "ru" ? "однородная" : "bir xil",
    heterogeneous: language === "ru" ? "неоднородная" : "har xil",
    diffuseHeterogeneous: language === "ru" ? "диффузно неоднородная" : "diffuz har xil",
    
    // Exogenlik
    echogenicity: language === "ru" ? "Эхогенность" : "Exogenlik",
    normal: language === "ru" ? "обычная" : "oddiy",
    medium: language === "ru" ? "средняя" : "o'rtacha",
    increased: language === "ru" ? "повышена" : "oshgan",
    decreased: language === "ru" ? "снижена" : "pasaygan",
    mixed: language === "ru" ? "смешанная" : "aralash",
    
    // Exogenlik turlari (o'smalar uchun)
    anechoic: language === "ru" ? "анэхогенное" : "anexogen",
    hypoechoic: language === "ru" ? "гипоэхогенное" : "gipoexogen",
    isoechoic: language === "ru" ? "изоэхогенное" : "izoexogen",
    hyperechoic: language === "ru" ? "гиперэхогенное" : "giperexogen",
    mixedEcho: language === "ru" ? "смешанное" : "aralash",
    
    // Kengayish
    notDilated: language === "ru" ? "не расширены" : "kengaymagan",
    dilated: language === "ru" ? "расширены" : "kengaygan",
    
    // Kattalashish
    notEnlarged: language === "ru" ? "не увеличены" : "kattalashmagan",
    enlarged: language === "ru" ? "увеличены" : "kattalashgan",
    
    // Ko'rinish
    visualized: language === "ru" ? "визуализируется" : "ko'rinadi",
    notVisualized: language === "ru" ? "не визуализируется" : "ko'rinmaydi",
    determined: language === "ru" ? "определяется" : "aniqlanadi",
    notDetermined: language === "ru" ? "не определяется" : "aniqlanmaydi",
    
    // Joylashuv
    location: language === "ru" ? "Расположение" : "Joylashuvi",
    localization: language === "ru" ? "Локализация" : "Joylashuvi",
    anteriorWall: language === "ru" ? "передняя стенка" : "oldingi devor",
    posteriorWall: language === "ru" ? "задняя стенка" : "orqa devor",
    fundus: language === "ru" ? "дно" : "tubi",
    lateralWall: language === "ru" ? "боковая стенка" : "yon devor",
    
    // O'ng/Chap
    right: language === "ru" ? "Правый" : "O'ng",
    left: language === "ru" ? "Левый" : "Chap",
    rightFem: language === "ru" ? "Правая" : "O'ng",
    leftFem: language === "ru" ? "Левая" : "Chap",
    
    // Tugunlar
    nodules: language === "ru" ? "Узлы" : "Tugunlar",
    nodule: language === "ru" ? "Узел" : "Tugun",
    mass: language === "ru" ? "Образование" : "O'sma",
    lesions: language === "ru" ? "Образования" : "O'smalar",
    cystic: language === "ru" ? "кистозная" : "kistoz",
    withCalcifications: language === "ru" ? "с кальцинатами" : "kaltsinatli",
    
    // Limfa tugunlari
    lymphNodes: language === "ru" ? "Лимфоузлы" : "Limfa tugunlari",
    regionalLymphNodes: language === "ru" ? "Регионарные лимфоузлы" : "Mintaqaviy limfa tugunlari",
    
    // Qon oqimi
    bloodFlow: language === "ru" ? "Кровоток" : "Qon oqimi",
    usual: language === "ru" ? "обычный" : "oddiy",
    intensified: language === "ru" ? "усилен" : "kuchaygan",
    reducedFlow: language === "ru" ? "снижен" : "pasaygan",
    
    // Qo'shimcha
    additional: language === "ru" ? "Дополнительно" : "Qo'shimcha",
    additionalInfo: language === "ru" ? "Дополнительные сведения" : "Qo'shimcha ma'lumotlar",
    notes: language === "ru" ? "Примечание" : "Izoh",
    additionalObservations: language === "ru" ? "Дополнительные наблюдения..." : "Qo'shimcha kuzatuvlar...",
    
    // Miqdor
    quantity: language === "ru" ? "Количество" : "Miqdori",
    insignificant: language === "ru" ? "незначительное количество" : "ozgina miqdorda",
    moderate: language === "ru" ? "умеренное количество" : "o'rtacha miqdorda",
    significant: language === "ru" ? "значительное количество" : "ko'p miqdorda",
  }
}

// Ginekologiya uchun maxsus tarjimalar
export function getGynecologyTranslations(language: Language) {
  const common = getCommonTranslations(language)
  return {
    ...common,
    
    // Hayz
    lastMenstruation: language === "ru" ? "День последней менструации" : "Oxirgi hayz kuni",
    mcPhase: language === "ru" ? "Фаза МЦ" : "Hayz sikli fazasi",
    dependsOnPhase: language === "ru" ? "зависит от фазы МЦ" : "hayz sikli fazasiga bog'liq",
    proliferative: language === "ru" ? "пролиферативная" : "proliferativ",
    secretory: language === "ru" ? "секреторная" : "sekretor",
    menstrual: language === "ru" ? "менструальная" : "hayz",
    
    // Bachadon
    uterus: language === "ru" ? "МАТКА" : "BACHADON",
    position: language === "ru" ? "Положение" : "Joylashuvi",
    myometriumStructure: language === "ru" ? "Структура миометрия" : "Miometriy tuzilishi",
    withNodes: language === "ru" ? "с узлами" : "tugunli",
    
    // Endometriy
    endometrium: language === "ru" ? "ЭНДОМЕТРИЙ" : "ENDOMETRIY",
    
    // Bachadon bo'yni
    cervix: language === "ru" ? "ШЕЙКА МАТКИ" : "BACHADON BO'YNI",
    endocervix: language === "ru" ? "Эндоцервикс" : "Endoserviks",
    
    // Tuxumdonlar
    ovaries: language === "ru" ? "ЯИЧНИКИ" : "TUXUMDONLAR",
    rightOvary: language === "ru" ? "Правый яичник" : "O'ng tuxumdon",
    leftOvary: language === "ru" ? "Левый яичник" : "Chap tuxumdon",
    follicles: language === "ru" ? "Фолликулы" : "Follikulalar",
    sizeStructure: language === "ru" ? "размер, структура" : "o'lcham, tuzilishi",
    diameterCount: language === "ru" ? "Ø, количество" : "Ø, soni",
    
    // Qo'shimcha
    fluidInPelvis: language === "ru" ? "Жидкость в малом тазу" : "Kichik tos bo'shlig'ida suyuqlik",
    pelvicVeins: language === "ru" ? "Вены малого таза" : "Kichik tos venalari",
    
    // Mioma
    myomaNodes: language === "ru" ? "МИОМАТОЗНЫЕ УЗЛЫ" : "MIOMA TUGUNLARI",
    nodeCount: language === "ru" ? "Количество узлов" : "Tugunlar soni",
    figoType: language === "ru" ? "Тип (FIGO)" : "Turi (FIGO)",
    nodeSizes: language === "ru" ? "Размеры узлов" : "Tugunlar o'lchami",
  }
}

// Akusherlik uchun maxsus tarjimalar
export function getObstetricsTranslations(language: Language) {
  const common = getCommonTranslations(language)
  return {
    ...common,
    
    // Homiladorlik
    pregnancy: language === "ru" ? "Беременность" : "Homiladorlik",
    lastMenstruation: language === "ru" ? "1-й день последней менструации" : "Oxirgi hayz 1-kuni",
    gestationalAge: language === "ru" ? "Срок беременности" : "Homiladorlik muddati",
    weeks: language === "ru" ? "нед" : "haft",
    days: language === "ru" ? "дн" : "kun",
    edd: language === "ru" ? "Предполагаемая дата родов" : "Taxminiy tug'ilish sanasi",
    fetusCount: language === "ru" ? "Количество плодов" : "Homilalar soni",
    twins: language === "ru" ? "двойня" : "egizak",
    triplets: language === "ru" ? "тройня" : "uchlik",
    presentation: language === "ru" ? "Предлежание" : "Joylashuvi",
    cephalic: language === "ru" ? "головное" : "bosh bilan",
    breech: language === "ru" ? "тазовое" : "tos bilan",
    transverse: language === "ru" ? "поперечное" : "ko'ndalang",
    oblique: language === "ru" ? "косое" : "qiya",
    
    // Fetometriya
    fetometry: language === "ru" ? "ФЕТОМЕТРИЯ" : "FETOMETRIYA",
    crl: language === "ru" ? "КТР" : "KTR",
    crlFull: language === "ru" ? "Копчико-теменной размер" : "Dum-tepa o'lchami",
    nt: language === "ru" ? "ТВП" : "TVP",
    ntNorm: language === "ru" ? "норма до 2.5" : "norma 2.5 gacha",
    nasalBone: language === "ru" ? "Носовая кость" : "Burun suyagi",
    bpd: language === "ru" ? "БПР" : "BPR",
    bpdFull: language === "ru" ? "бипариетальный" : "biparietal",
    ofd: language === "ru" ? "ЛЗР" : "LZR",
    ofdFull: language === "ru" ? "лобно-затылочный" : "peshona-ensa",
    hc: language === "ru" ? "ОГ" : "BO",
    hcFull: language === "ru" ? "окружность головы" : "bosh aylanasi",
    ac: language === "ru" ? "ОЖ" : "QA",
    acFull: language === "ru" ? "окружность живота" : "qorin aylanasi",
    fl: language === "ru" ? "ДБК" : "SU",
    flFull: language === "ru" ? "длина бедра" : "son uzunligi",
    hl: language === "ru" ? "ДПК" : "YU",
    hlFull: language === "ru" ? "длина плеча" : "yelka uzunligi",
    fhr: language === "ru" ? "ЧСС" : "YUS",
    fhrUnit: language === "ru" ? "уд/мин" : "ur/daq",
    fhrNorm: language === "ru" ? "норма 120-160" : "norma 120-160",
    fetalWeight: language === "ru" ? "Масса плода" : "Homila vazni",
    
    // Anatomiya
    fetalAnatomy: language === "ru" ? "АНАТОМИЯ ПЛОДА" : "HOMILA ANATOMIYASI",
    brainStructure: language === "ru" ? "Структура мозга" : "Miya tuzilishi",
    clearDiff: language === "ru" ? "дифференцируется четко" : "aniq farqlanadi",
    changed: language === "ru" ? "изменена" : "o'zgargan",
    lateralVentricles: language === "ru" ? "Боковые желудочки" : "Yon qorinchalar",
    spine: language === "ru" ? "Позвоночник" : "Umurtqa pog'onasi",
    traceable: language === "ru" ? "прослеживается на всем протяжении" : "butunlay kuzatiladi",
    deformed: language === "ru" ? "деформирован" : "deformatsiyalangan",
    heart4ch: language === "ru" ? "4-камерный срез сердца" : "4-kamerali yurak kesimi",
    stomach: language === "ru" ? "Желудок" : "Oshqozon",
    kidneys: language === "ru" ? "Почки" : "Buyraklar",
    typicalLocation: language === "ru" ? "на типичном месте" : "odatiy joyda",
    bladder: language === "ru" ? "Мочевой пузырь" : "Siydik pufagi",
    
    // Yo'ldosh
    placenta: language === "ru" ? "ПЛАЦЕНТА" : "YO'LDOSH",
    lowLying: language === "ru" ? "низкое" : "past",
    previa: language === "ru" ? "предлежание" : "yo'ldosh kelishi",
    maturity: language === "ru" ? "Степень зрелости" : "Yetilish darajasi",
    grade0: language === "ru" ? "0 степень (до 30 нед)" : "0 daraja (30 haftgacha)",
    grade1: language === "ru" ? "I степень (27-36 нед)" : "I daraja (27-36 haft)",
    grade2: language === "ru" ? "II степень (34-39 нед)" : "II daraja (34-39 haft)",
    grade3: language === "ru" ? "III степень (37-40 нед)" : "III daraja (37-40 haft)",
    
    // Homila suvi
    amnioticFluid: language === "ru" ? "ОКОЛОПЛОДНЫЕ ВОДЫ" : "HOMILA SUVI",
    normalAmount: language === "ru" ? "нормальное" : "normal",
    oligohydramnios: language === "ru" ? "маловодие" : "kam suv",
    polyhydramnios: language === "ru" ? "многоводие" : "ko'p suv",
    afi: language === "ru" ? "ИАЖ" : "HS indeksi",
    afiNorm: language === "ru" ? "норма 80-180" : "norma 80-180",
    quality: language === "ru" ? "Качество" : "Sifati",
    clear: language === "ru" ? "прозрачные" : "tiniq",
    withSuspension: language === "ru" ? "с взвесью" : "aralashma bilan",
    cloudy: language === "ru" ? "мутные" : "loyqa",
    
    // Bachadon bo'yni
    cervix: language === "ru" ? "ШЕЙКА МАТКИ" : "BACHADON BO'YNI",
    cervixNorm: language === "ru" ? "норма более 30" : "norma 30 dan ko'p",
    internalOs: language === "ru" ? "Внутренний зев" : "Ichki og'iz",
    closed: language === "ru" ? "закрыт" : "yopiq",
    open: language === "ru" ? "открыт" : "ochiq",
    
    // Doppler
    doppler: language === "ru" ? "ДОППЛЕРОМЕТРИЯ" : "DOPPLEROMETRIYA",
    mcaSd: language === "ru" ? "СМА плода С/Д" : "Homila OMA S/D",
    uaSd: language === "ru" ? "Пупочная артерия С/Д" : "Kindik arteriyasi S/D",
    rightUaSd: language === "ru" ? "Правая МА С/Д" : "O'ng BA S/D",
    leftUaSd: language === "ru" ? "Левая МА С/Д" : "Chap BA S/D",
    fetalFlowDisorder: language === "ru" ? "Нарушение МППК" : "OPQ buzilishi",
    degree1a: language === "ru" ? "Iа степень" : "Ia daraja",
    degree1b: language === "ru" ? "Iб степень" : "Ib daraja",
    degree2: language === "ru" ? "II степень" : "II daraja",
    degree3: language === "ru" ? "III степень" : "III daraja",
  }
}

// Qorin bo'shlig'i uchun maxsus tarjimalar
export function getAbdominalTranslations(language: Language) {
  const common = getCommonTranslations(language)
  return {
    ...common,
    
    // Jigar
    liver: language === "ru" ? "ПЕЧЕНЬ" : "JIGAR",
    kvrRight: language === "ru" ? "КВР правой доли" : "O'ng bo'lak KVR",
    kvrLeft: language === "ru" ? "КВР левой доли" : "Chap bo'lak KVR",
    pzr: language === "ru" ? "ПЗР" : "OAR",
    portalVein: language === "ru" ? "V. portae" : "Darvoza venasi",
    ivc: language === "ru" ? "НПВ (I.V.C)" : "PVK",
    choledoch: language === "ru" ? "Холедох" : "Xoledox",
    
    // O't pufagi
    gallbladder: language === "ru" ? "ЖЕЛЧНЫЙ ПУЗЫРЬ" : "O'T PUFAGI",
    wallThickness: language === "ru" ? "Толщина стенки" : "Devor qalinligi",
    content: language === "ru" ? "Содержимое" : "Tarkibi",
    homogeneousContent: language === "ru" ? "гомогенное" : "bir xil",
    heterogeneousContent: language === "ru" ? "негомогенное" : "har xil",
    withSediment: language === "ru" ? "с осадком" : "cho'kma bilan",
    stones: language === "ru" ? "конкременты" : "toshlar",
    
    // Oshqozon osti bezi
    pancreas: language === "ru" ? "ПОДЖЕЛУДОЧНАЯ ЖЕЛЕЗА" : "OSHQOZON OSTI BEZI",
    head: language === "ru" ? "Головка" : "Boshi",
    body: language === "ru" ? "Тело" : "Tanasi",
    tail: language === "ru" ? "Хвост" : "Dumi",
    wirsungDuct: language === "ru" ? "Вирсунгов проток" : "Virsung yo'li",
    
    // Taloq
    spleen: language === "ru" ? "СЕЛЕЗЕНКА" : "TALOQ",
    splenicVein: language === "ru" ? "Селезеночная вена" : "Taloq venasi",
    
    // Buyraklar
    kidneys: language === "ru" ? "ПОЧКИ" : "BUYRAKLAR",
    rightKidney: language === "ru" ? "Правая почка" : "O'ng buyrak",
    leftKidney: language === "ru" ? "Левая почка" : "Chap buyrak",
    parenchyma: language === "ru" ? "Паренхима" : "Parenxima",
  }
}

// Sut bezlari uchun maxsus tarjimalar
export function getBreastTranslations(language: Language) {
  const common = getCommonTranslations(language)
  return {
    ...common,
    
    // Umumiy
    generalData: language === "ru" ? "Общие данные" : "Umumiy ma'lumotlar",
    complaints: language === "ru" ? "Жалобы" : "Shikoyatlar",
    pain: language === "ru" ? "боль" : "og'riq",
    lump: language === "ru" ? "уплотнение" : "qattiqlik",
    discharge: language === "ru" ? "выделения" : "ajralmalar",
    cycleDay: language === "ru" ? "День менструального цикла" : "Hayz sikli kuni",
    
    // Sut bezi
    rightBreast: language === "ru" ? "ПРАВАЯ МОЛОЧНАЯ ЖЕЛЕЗА" : "O'NG SUT BEZI",
    leftBreast: language === "ru" ? "ЛЕВАЯ МОЛОЧНАЯ ЖЕЛЕЗА" : "CHAP SUT BEZI",
    glandular: language === "ru" ? "железистый тип" : "bez tipi",
    fatty: language === "ru" ? "жировой тип" : "yog' tipi",
    ducts: language === "ru" ? "Протоки" : "Yo'llar",
    atOclock: language === "ru" ? "на ... часах" : "... soatda",
    lesionSize: language === "ru" ? "Размер образования" : "O'sma o'lchami",
    lesionType: language === "ru" ? "Характер образования" : "O'sma xarakteri",
    anechoicCyst: language === "ru" ? "анэхогенное (киста)" : "anexogen (kista)",
    
    // Limfa
    axillaryRight: language === "ru" ? "Подмышечные справа" : "O'ngdagi qo'ltiq osti",
    axillaryLeft: language === "ru" ? "Подмышечные слева" : "Chapdagi qo'ltiq osti",
    
    // BI-RADS
    birads: language === "ru" ? "КЛАССИФИКАЦИЯ BI-RADS" : "BI-RADS TASNIFI",
    birads0: language === "ru" ? "BI-RADS 0 - требуется доп. обследование" : "BI-RADS 0 - qo'shimcha tekshiruv kerak",
    birads1: language === "ru" ? "BI-RADS 1 - норма" : "BI-RADS 1 - norma",
    birads2: language === "ru" ? "BI-RADS 2 - доброкачественные изменения" : "BI-RADS 2 - yaxshi sifatli o'zgarishlar",
    birads3: language === "ru" ? "BI-RADS 3 - вероятно доброкачественные" : "BI-RADS 3 - ehtimol yaxshi sifatli",
    birads4: language === "ru" ? "BI-RADS 4 - подозрение на злокачественность" : "BI-RADS 4 - yomon sifatli gumon",
    birads5: language === "ru" ? "BI-RADS 5 - высокая вероятность злокачественности" : "BI-RADS 5 - yomon sifatli ehtimoli yuqori",
    birads6: language === "ru" ? "BI-RADS 6 - подтвержденная злокачественность" : "BI-RADS 6 - tasdiqlangan yomon sifatli",
  }
}

// Qalqonsimon bez uchun maxsus tarjimalar
export function getThyroidTranslations(language: Language) {
  const common = getCommonTranslations(language)
  return {
    ...common,
    
    // Bo'laklar
    rightLobe: language === "ru" ? "ПРАВАЯ ДОЛЯ" : "O'NG BO'LAK",
    leftLobe: language === "ru" ? "ЛЕВАЯ ДОЛЯ" : "CHAP BO'LAK",
    isthmus: language === "ru" ? "ПЕРЕШЕЕК" : "BO'G'IN",
    
    // Tugun tafsilotlari
    rightNodule: language === "ru" ? "Узловое образование правой доли" : "O'ng bo'lak tugun o'smasi",
    leftNodule: language === "ru" ? "Узловое образование левой доли" : "Chap bo'lak tugun o'smasi",
    
    // Umumiy hajm
    totalVolumeLymph: language === "ru" ? "ОБЩИЙ ОБЪЕМ И ЛИМФОУЗЛЫ" : "UMUMIY HAJM VA LIMFA TUGUNLARI",
    totalThyroidVolume: language === "ru" ? "Общий объем ЩЖ" : "QBning umumiy hajmi",
    normFemale: language === "ru" ? "норма: жен 9-18, муж 9-25" : "norma: ayol 9-18, erkak 9-25",
    
    // TI-RADS
    tirads: language === "ru" ? "КЛАССИФИКАЦИЯ TI-RADS" : "TI-RADS TASNIFI",
    tiradsIfNodules: language === "ru" ? "TI-RADS (если есть узлы)" : "TI-RADS (tugunlar bo'lsa)",
    tirads1: language === "ru" ? "TI-RADS 1 - норма" : "TI-RADS 1 - norma",
    tirads2: language === "ru" ? "TI-RADS 2 - доброкачественное" : "TI-RADS 2 - yaxshi sifatli",
    tirads3: language === "ru" ? "TI-RADS 3 - вероятно доброкачественное" : "TI-RADS 3 - ehtimol yaxshi sifatli",
    tirads4a: language === "ru" ? "TI-RADS 4a - низкий риск" : "TI-RADS 4a - past xavf",
    tirads4b: language === "ru" ? "TI-RADS 4b - умеренный риск" : "TI-RADS 4b - o'rtacha xavf",
    tirads4c: language === "ru" ? "TI-RADS 4c - высокий риск" : "TI-RADS 4c - yuqori xavf",
    tirads5: language === "ru" ? "TI-RADS 5 - злокачественное" : "TI-RADS 5 - yomon sifatli",
  }
}
