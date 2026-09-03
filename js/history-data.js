/**
 * History page chapters (student-curated summaries — not a full reprint of any single article).
 */
(function () {
  function ch(id, tag, refs, titles, paras) {
    return { id, tag, refs, title: titles, paragraphs: paras };
  }

  const CHAPTERS = [
    ch(
      "curation",
      "agree",
      [2, 10],
      {
        zh: "1. 學生策展說明",
        th: "1. คำอธิบายการจัดแสดงของนักเรียน",
        en: "1. Student curation note"
      },
      {
        zh: [
          "昆沙是二十世紀泰緬邊境歷史中的爭議人物。他曾領導地方武裝、參與撣邦政治活動，也受到美國司法及緝毒機構的毒品販運指控。",
          "在滿星疊，一些居民對他的記憶不只來自國際新聞，也與學校、道路、生活設施及村落發展有關。因此，昆沙在國際文獻與地方記憶中，呈現出不同甚至互相衝突的形象。",
          "作為滿星疊的學生，我們無意替歷史人物定罪或辯護。本頁將地方記錄、親歷者回憶與外部資料分開標示，希望讀者能在理解資料來源的情況下，自行思考與判斷。"
        ],
        th: [
          "ขุนส่าเป็นบุคคลที่มีข้อถกเถียงในประวัติศาสตร์ชายแดนไทย–เมียนมาศตวรรษที่ 20 เขาเคยนำกำลังท้องถิ่น เกี่ยวข้องกับการเมืองรัฐฉาน และถูกกล่าวหาเรื่องค้ายาโดยหน่วยงานยุติธรรมและปราบปรามยาเสพติดของสหรัฐ",
          "ที่บ้านเทอดไทย ความทรงจำของชาวบ้านบางส่วนไม่ได้มาจากข่าวระหว่างประเทศเท่านั้น แต่ยังเกี่ยวกับโรงเรียน ถนน สาธารณูปโภค และการพัฒนาหมู่บ้าน ดังนั้นภาพในเอกสารระหว่างประเทศกับความทรงจำท้องถิ่นจึงต่างกัน บางครั้งขัดกัน",
          "ในฐานะนักเรียนบ้านเทอดไทย เราไม่ตั้งใจตัดสินหรือแก้ต่างให้บุคคลในประวัติศาสตร์ หน้านี้แยกบันทึกท้องถิ่น ความทรงจำผู้เกี่ยวข้อง และข้อมูลภายนอก เพื่อให้ผู้อ่านคิดด้วยตนเองภายใต้การรู้แหล่งที่มา"
        ],
        en: [
          "Khun Sa is a contested figure in twentieth-century Thai–Myanmar border history. He led local armed forces, took part in Shan political activity, and faced U.S. judicial and drug-enforcement accusations of trafficking.",
          "In Ban Thoed Thai, some residents’ memories are not only from international news but also from schools, roads, facilities and village life. International writing and local memory therefore show different, sometimes conflicting, images.",
          "As students from Ban Thoed Thai, we do not seek to convict or defend a historical figure. This page keeps local records, participant memories and external sources separate so readers can think with the sources in view."
        ]
      }
    ),
    ch(
      "name",
      "differ",
      [1, 2, 7],
      {
        zh: "2. 昆沙的姓名與出生",
        th: "2. ชื่อและการเกิดของขุนส่า",
        en: "2. Names and birth"
      },
      {
        zh: [
          "昆沙的出生年份存在不同記載。大同中學保存的地方資料記為1933年；多數國際出版物與訃聞則記載為1934年2月17日。本網站保留兩種記錄，並標示各自來源，不逕自否定任何一項紀錄。",
          "昆沙的姓名可見 Khun Sa、Chang Chi-fu、Zhang Qifu，以及中文資料中的張奇夫、張啟福等不同語言與譯寫形式。本網站依滿星疊大同中學的使用習慣，統一使用「昆沙」。",
          "部分英文資料將 Khun Sa 解釋為近似「繁榮王子」的稱號，但不同語言的轉寫與解釋並不完全一致。關於「昆」是否僅限官家姓氏等說法，目前缺乏足夠可靠的語言學來源，本站標為尚待查證，不當作已證實史實。"
        ],
        th: [
          "ปีเกิดของขุนส่ามีบันทึกต่างกัน เอกสารท้องถิ่นของโรงเรียนต้าถงระบุปี 1933 สิ่งพิมพ์และคำไว้อาลัยระหว่างประเทศส่วนใหญ่ระบุ 17 กุมภาพันธ์ 1934 เว็บนี้คงทั้งสองแบบและระบุแหล่งโดยไม่ปฏิเสธฝ่ายใด",
          "ชื่อปรากฏเป็น Khun Sa, Chang Chi-fu, Zhang Qifu และรูปจีนต่าง ๆ ตามธรรมเนียมโรงเรียนต้าถงบ้านเทอดไทย เว็บนี้ใช้ชื่อจีนว่า「昆沙」 และไทยว่า「ขุนส่า」",
          "เอกสารอังกฤษบางชิ้นอธิบาย Khun Sa ใกล้เคียงคำว่า “prince of prosperity” แต่การถอดเสียงและคำอธิบายไม่ตรงกันทั้งหมด คำอธิบายเรื่องแซ่「ขุน」ยังขาดหลักภาษาศาสตร์ที่เพียงพอ จึงติดป้ายรอตรวจสอบ"
        ],
        en: [
          "Birth year differs. Datong School local records give 1933; many international publications and obituaries give 17 February 1934. This site keeps both and labels sources; it does not dismiss either record.",
          "Names appear as Khun Sa, Chang Chi-fu, Zhang Qifu and various Chinese forms. Following Datong School usage, this site uses「昆沙」in Chinese and “Khun Sa” in English.",
          "Some English materials gloss Khun Sa roughly as “prince of prosperity,” but transliterations and explanations are not identical. Claims that “Khun” was reserved for official surnames lack sufficient linguistic sources here and are marked pending."
        ]
      }
    ),
    ch(
      "triangle",
      "agree",
      [5, 7],
      {
        zh: "3. 緬甸撣邦與金三角背景",
        th: "3. พื้นหลังรัฐฉานและสามเหลี่ยมทองคำ",
        en: "3. Shan State and Golden Triangle background"
      },
      {
        zh: [
          "緬甸撣邦與泰緬邊境長期處於複雜的族群政治、武裝衝突與跨境經濟之中。金三角一帶的罌粟種植與毒品貿易，是理解二十世紀後半區域史的重要背景之一。",
          "依現有資料整理，相關背景涉及山區貧困、國家能力、冷戰與邊境治理等多層因素。本網站暫不作單一因果定論。"
        ],
        th: [
          "รัฐฉานและชายแดนไทย–เมียนมามีการเมืองชาติพันธุ์ ความขัดแย้งติดอาวุธ และเศรษฐกิจข้ามแดนที่ซับซ้อน การปลูกฝิ่นและการค้ายาในสามเหลี่ยมทองคำเป็นพื้นหลังสำคัญของประวัติศาสตร์ภูมิภาคช่วงครึ่งหลังศตวรรษที่ 20",
          "ตามข้อมูลที่มี พื้นหลังนี้เกี่ยวพันความยากจนบนที่สูง ความสามารถของรัฐ สงครามเย็น และการจัดการชายแดน เว็บนี้ยังไม่สรุปเป็นเหตุผลเดียว"
        ],
        en: [
          "Shan State and the Thai–Myanmar border long combined ethnic politics, armed conflict and cross-border economies. Opium cultivation and drug trade in the Golden Triangle are part of the late-twentieth-century regional background.",
          "Available materials point to highland poverty, state capacity, the Cold War and border governance among other layers. This site does not force a single causal story."
        ]
      }
    ),
    ch(
      "1960s",
      "differ",
      [3, 7],
      {
        zh: "4. 1960年代的地方武裝",
        th: "4. กองกำลังท้องถิ่นทศวรรษ 1960",
        en: "4. Local armed forces in the 1960s"
      },
      {
        zh: [
          "1960年代，泰緬邊境出現多支地方自衛與武裝力量。特泰地方政府資料將昆沙在Ban Hin Taek一帶的活動追溯至1963年；其他國際研究則強調其後拘禁、獲釋與1970年代中後期的基地建設。",
          "兩種記載可能分別指早期活動與後期正式建設基地，但現有資料仍不足以完全確認各階段的界線。本網站將兩種記載並列呈現。"
        ],
        th: [
          "ทศวรรษ 1960 มีกำลังป้องกันและติดอาวุธท้องถิ่นหลายกลุ่มตามแนวชายแดน ข้อมูลท้องถิ่นเทอดไทยย้อนกิจกรรมแถบบ้านหินแตกถึงปี 1963 งานวิจัยระหว่างประเทศเน้นการกักขัง การปล่อยตัว และการสร้างฐานช่วงกลางถึงปลายทศวรรษ 1970",
          "สองแบบอาจหมายถึงช่วงต้นกับการตั้งฐานอย่างเป็นทางการในภายหลัง แต่ยังไม่พอชี้เส้นแบ่งชัด เว็บนี้เสนอคู่กัน"
        ],
        en: [
          "In the 1960s many local self-defence and armed groups operated along the border. Therd Thai local materials push activity near Ban Hin Taek back to 1963; international studies often stress later detention, release and base-building in the mid-to-late 1970s.",
          "The accounts may describe early activity versus a later formal base. Present evidence is not enough to draw firm stage boundaries. This site presents both."
        ]
      }
    ),
    ch(
      "banhin",
      "differ",
      [1, 3, 10],
      {
        zh: "5. 昆沙與Ban Hin Taek／滿星疊",
        th: "5. ขุนส่ากับบ้านหินแตก／บ้านเทอดไทย",
        en: "5. Khun Sa and Ban Hin Taek / Ban Thoed Thai"
      },
      {
        zh: [
          "滿星疊位於泰國清萊府，舊稱 Ban Hin Taek，後改稱 Ban Thoed Thai（特泰村）。依地方資料與園區展示，此地曾與昆沙及其武裝力量在泰北的活動有所關聯，也是大同中學所在的村子。",
          "Ho Mong 位於緬甸撣邦，與滿星疊並非同一地點。後期部分政治與軍事活動主要與緬甸一側有關，不可與泰國滿星疊混寫。"
        ],
        th: [
          "บ้านเทอดไทยอยู่จังหวัดเชียงราย เดิมเรียกบ้านหินแตก ตามข้อมูลท้องถิ่นและการจัดแสดง พื้นที่นี้เคยเกี่ยวพันกับกิจกรรมของขุนส่าและกำลังของเขาในภาคเหนือไทย และเป็นที่ตั้งโรงเรียนต้าถง",
          "โฮมองอยู่ที่รัฐฉาน เมียนมา ไม่ใช่ที่เดียวกับบ้านเทอดไทย กิจกรรมการเมืองและการทหารช่วงหลังบางส่วนเกี่ยวกับฝั่งเมียนมา ห้ามสับสนกับบ้านเทอดไทย"
        ],
        en: [
          "Ban Thoed Thai is in Chiang Rai Province, Thailand; it was formerly Ban Hin Taek. Local materials and park displays link the place to Khun Sa’s northern Thai activity and to Datong School.",
          "Ho Mong is in Shan State, Myanmar, and is not the same place. Later political and military activity often relates to the Myanmar side and must not be conflated with Ban Thoed Thai."
        ]
      }
    ),
    ch(
      "school",
      "agree",
      [2, 1],
      {
        zh: "6. 1975年大同中學創校",
        th: "6. การก่อตั้งโรงเรียนต้าถงปี 1975",
        en: "6. Datong School founded in 1975"
      },
      {
        zh: [
          "依大同中學校史及滿星疊地方資料，大同中學於1975年創立。地方居民普遍肯定昆沙在學校早期創辦及資源籌措上的投入。",
          "對於昆沙興辦學校的目的，不同資料有不同解釋。部分居民認為，他希望保存華文教育並改善地方兒童的學習機會；另有說法認為，教育也可能與培養部隊所需人才有關。",
          "目前資料不足以用單一動機概括創校原因。但可以確認的是，大同中學後來在歷任校長、教師、村民、學生及外界協助下持續發展，其教育成果不應只被視為昆沙個人歷史的一部分。今日的大同中學，是滿星疊社區及歷代師生共同累積的成果。",
          "學生人數、非華裔學生比例、歷任校長人數等動態統計若無標明年份，本站暫不使用具體數字。"
        ],
        th: [
          "ตามประวัติโรงเรียนและเอกสารท้องถิ่น โรงเรียนต้าถงก่อตั้งปี 1975 ชาวบ้านจำนวนมากยืนยันบทบาทของขุนส่าในช่วงแรกและการหาทรัพยากร",
          "วัตถุประสงค์ของการตั้งโรงเรียนมีคำอธิบายต่างกัน บางคนเห็นว่าเพื่อรักษาการศึกษาจีนและโอกาสของเด็ก บางคำกล่าวว่าอาจเกี่ยวพันการสร้างบุคลากรของกองกำลัง",
          "ข้อมูลยังไม่พอสรุปเป็นแรงจูงใจเดียว สิ่งที่ยืนยันได้คือโรงเรียนพัฒนาต่อด้วยอธิการบดี ครู ชาวบ้าน นักเรียน และความช่วยเหลือภายนอก ผลการศึกษาไม่ควรถูกมองเป็นเพียงประวัติบุคคลของขุนส่า",
          "ตัวเลขนักเรียน สัดส่วน และจำนวนอธิการบดี หากไม่มีปีสถิติ เว็บนี้ยังไม่ใช้ตัวเลขเฉพาะ"
        ],
        en: [
          "According to Datong School history and local materials, the school was founded in 1975. Many residents credit Khun Sa’s early role in founding and fundraising.",
          "Motives are explained differently. Some residents stress Chinese schooling and children’s opportunities; other accounts link education to training people the force needed.",
          "Evidence is not enough for a single motive. What can be affirmed is later growth through principals, teachers, villagers, students and outside help. School results should not be reduced to one person’s biography.",
          "Dynamic figures (enrolment, non-Chinese share, number of principals) are omitted here when no year is attached."
        ]
      }
    ),
    ch(
      "youth",
      "oral",
      [1],
      {
        zh: "7. 地方教育與少年兵記憶",
        th: "7. การศึกษาท้องถิ่นและความทรงจำทหารเด็ก",
        en: "7. Local schooling and boy-soldier memories"
      },
      {
        zh: [
          "依網站引用的滿星疊親歷者回憶（見地方華文紀錄中的訪談整理，訪談後設欄位仍待補齊），當時部分少年除了接受泰文及華文教育，也曾參加軍事訓練。受訪者並提到抽籤徵兵、武器操作及部隊紀律等經歷。",
          "這些內容具有重要的口述歷史價值，但目前主要來自個人記憶。不同家庭與不同時期的情況可能並不完全相同，因此本網站不將單一受訪者的經歷直接概括為所有滿星疊兒童的共同經驗。",
          "完整的訪談後設資料（日期、地點、訪談者、同意公開與否等）仍待學生整理團隊補齊後，再於「地方口述紀錄」頁公開。"
        ],
        th: [
          "ตามความทรงจำผู้เกี่ยวข้องที่ถูกอ้างในบันทึกจีนท้องถิ่น เด็กบางคนเรียนไทยและจีน และเคยฝึกทหาร มีการกล่าวถึงการจับฉลากเกณฑ์ทหาร การใช้ปืน และวินัย",
          "เนื้อหามีคุณค่าทางประวัติศาสตร์บอกเล่า แต่ส่วนใหญ่ยังเป็นความทรงจำบุคคล ครอบครัวและช่วงเวลาอาจต่างกัน เว็บนี้ไม่สรุปประสบการณ์ผู้หนึ่งเป็นประสบการณ์เด็กทุกคน",
          "ข้อมูลเมทาดาทาของการสัมภาษณ์ยังต้องเติมก่อนเผยแพร่เต็มในหน้าประวัติศาสตร์บอกเล่า"
        ],
        en: [
          "According to participant memories cited in local Chinese records, some youths combined Thai and Chinese schooling with military drill, conscription lots, weapons training and discipline.",
          "These memories matter as oral history, but they are mainly individual. Households and periods may differ. This site does not generalise one person’s experience to every child in Ban Thoed Thai.",
          "Full interview metadata still needs completion before fuller publication on the oral-history page."
        ]
      }
    ),
    ch(
      "cave",
      "oral",
      [1, 11, 10],
      {
        zh: "8. 刑罰與土牢（銜接園區遺跡）",
        th: "8. การลงโทษและคุกดิน",
        en: "8. Punishment and the earth prison"
      },
      {
        zh: [
          "依部分親歷者回憶，昆沙部隊內部曾實施嚴格軍紀，包括杖刑、禁閉及將違紀者關入土洞等處分。園區目前保留一處被稱為「土牢」或「土洞」的遺跡。",
          "關於各種刑罰的實施方式、次數及適用範圍，目前主要來自口述資料與地方文章，仍需要更多文件及不同受訪者的資料交叉查證。",
          "土牢尺寸若僅見於舊文章，本站標示為「依地方文章描述，尚未重新測量確認」。學生現場測量紀錄尚待補上測量日期後再更新。"
        ],
        th: [
          "ตามคำบอกเล่าบางคน กองของขุนส่าเคยใช้วินัยเข้ม รวมไม้เรียว การขัง และการใส่ผู้ผิดวินัยลงหลุมดิน พื้นที่ยังคงซากที่เรียกคุกดินหรือถ้ำดิน",
          "รายละเอียดวิธีการ จำนวนครั้ง และขอบเขตส่วนใหญ่มาจากคำบอกเล่าและบทความท้องถิ่น ยังต้องเทียบเอกสารและผู้ให้สัมภาษณ์อื่น",
          "ขนาดคุกดินหากมาจากบทความเก่า เว็บติดป้ายว่ายังไม่ได้วัดใหม่ บันทึกการวัดของนักเรียนรอวันที่วัด"
        ],
        en: [
          "Some participant memories describe strict internal discipline, including caning, confinement and an earth pit. The park keeps a site called an earth prison or earth cave.",
          "Methods, frequency and scope mainly rest on oral accounts and local articles; more documents and interviews are needed.",
          "If dimensions come only from older articles, this site marks them as not re-measured. Student survey dates are still to be added."
        ]
      }
    ),
    ch(
      "battle",
      "differ",
      [1, 7, 3],
      {
        zh: "9. 1982年Ban Hin Taek軍事行動",
        th: "9. ปฏิบัติการบ้านหินแตกปี 1982",
        en: "9. The 1982 Ban Hin Taek operations"
      },
      {
        zh: [
          "1982年1月21日，泰國部隊在Ban Hin Taek一帶展開軍事行動，目標包括驅離昆沙武裝。戰事及後續行動使昆沙勢力逐漸轉往緬甸一側，也成為滿星疊歷史的重要轉折。",
          "關於戰役中的生日宴、空中轟炸、傷亡、逐戶搜索及是否查獲毒品等細節，地方訪談、華文紀錄、媒體報導與官方資料的描述並不完全一致。本網站僅在標明來源的情況下呈現相關內容。",
          "「第二次鴉片戰爭」是部分媒體及華文記錄使用的稱呼，並非本網站認定的正式戰役名稱。",
          "個別家庭傷亡、家具遭破壞、是否搜到鴉片等敘述，應分別標為依地方訪談、依特定採訪文字或依當時媒體報導，並標示尚待其他資料交叉確認。"
        ],
        th: [
          "วันที่ 21 มกราคม 1982 กองกำลังไทยเปิดปฏิบัติการแถบบ้านหินแตก เพื่อขับกำลังของขุนส่า หลังศึกค่อยย้ายไปฝั่งเมียนมา และเป็นจุดเปลี่ยนสำคัญของบ้านเทอดไทย",
          "รายละเอียดงานเลี้ยงวันเกิด การทิ้งระเบิด ผู้เสียชีวิต การค้นบ้าน และการยึดยา แหล่งท้องถิ่น บันทึกจีน สื่อ และทางการไม่ตรงกันทั้งหมด เว็บนำเสนอเฉพาะเมื่อระบุแหล่ง",
          "「สงครามฝิ่นครั้งที่สอง」เป็นคำที่สื่อและบันทึกจีนบางชิ้นใช้ ไม่ใช่ชื่อทางการที่เว็บรับรอง",
          "เรื่องผู้เสียชีวิตรายบ้าน ความเสียหาย และการพบฝิ่น ควรแยกป้ายตามสัมภาษณ์ท้องถิ่น บทสัมภาษณ์เฉพาะ หรือสื่อสมัยนั้น และติดป้ายรอการยืนยันไขว้"
        ],
        en: [
          "On 21 January 1982 Thai forces operated around Ban Hin Taek to drive out Khun Sa’s armed group. Afterwards his force shifted toward Myanmar. The episode is a major turn in Ban Thoed Thai history.",
          "Details such as a birthday gathering, air attack, casualties, house searches and whether drugs were seized differ across local interviews, Chinese records, media and official materials. This site presents them only with sources labelled.",
          "“Second Opium War” is a phrase used by some media and Chinese records, not an official battle name adopted by this site.",
          "Claims about particular families, damaged furniture or opium finds should be tagged by interview, named reportage or period media, and marked for further cross-checking."
        ]
      }
    ),
    ch(
      "mta",
      "pending",
      [7, 8],
      {
        zh: "10. 轉往Ho Mong與蒙傣軍",
        th: "10. การย้ายสู่โฮมองและ Mong Tai Army",
        en: "10. Move toward Ho Mong and the Mong Tai Army"
      },
      {
        zh: [
          "1982年後，活動重心逐漸轉往緬甸撣邦一側。概述性資料常提到相關武裝於1985年前後整合為 Mong Tai Army（蒙傣軍）。細部分期仍建議對照專書後再補。",
          "Ho Mong 為後期重要據點之一，位於緬甸撣邦，不是泰國滿星疊。"
        ],
        th: [
          "หลังปี 1982 ศูนย์กลางกิจกรรมย้ายไปฝั่งรัฐฉาน เอกสารภาพรวมมักระบุการรวมเป็น Mong Tai Army ราวปี 1985 รายละเอียดควรเทียบหนังสือ",
          "โฮมองเป็นฐานสำคัญช่วงหลัง อยู่ในรัฐฉาน เมียนมา ไม่ใช่บ้านเทอดไทย"
        ],
        en: [
          "After 1982 the centre of gravity shifted toward Shan State. Overviews often date Mong Tai Army consolidation around 1985; finer phasing should follow specialist books.",
          "Ho Mong was a later key base in Shan State, Myanmar—not Ban Thoed Thai."
        ]
      }
    ),
    ch(
      "1993",
      "differ",
      [6, 7],
      {
        zh: "11. 1993年前後的撣邦政治主張",
        th: "11. ข้อเสนอทางการเมืองรัฐฉานราวปี 1993",
        en: "11. Shan political claims around 1993"
      },
      {
        zh: [
          "1993年前後，昆沙陣營曾在Ho Mong一帶提出撣邦自治、獨立或建立政治實體等主張。不同資料對事件名稱及正式程度記載不一。",
          "Ho Mong位於緬甸撣邦。這件事不是發生在泰國滿星疊。「撣邦共和國」等名稱必須附上來源；不得直接宣稱已建立受到國際承認的國家。"
        ],
        th: [
          "ราวปี 1993 ค่ายขุนส่าเสนอข้อเรียกร้องปกครองตนเองหรือเอกราชที่โฮมอง ชื่อและระดับความเป็นทางการต่างกันตามแหล่ง",
          "โฮมองอยู่รัฐฉาน เมียนมา เหตุการณ์นี้ไม่เกิดที่บ้านเทอดไทย ชื่ออย่าง「สาธารณรัฐรัฐฉาน」ต้องมีแหล่ง และห้ามเขียนว่ารัฐได้รับการรับรองระหว่างประเทศ"
        ],
        en: [
          "Around 1993 Khun Sa’s camp advanced Shan autonomy, independence or a political entity at Ho Mong. Names and formality vary by source.",
          "Ho Mong is in Shan State, Myanmar—not Ban Thoed Thai. Labels such as a “Shan State republic” need citations; this site does not claim an internationally recognised state."
        ]
      }
    ),
    ch(
      "1996",
      "differ",
      [7, 1],
      {
        zh: "12. 1996年繳械",
        th: "12. การวางอาวุธปี 1996",
        en: "12. The 1996 disarmament"
      },
      {
        zh: [
          "1996年，昆沙及蒙傣軍主力向緬甸政府繳械。國際新聞、研究及執法機構多將此事稱為「投降」或「繳械」；部分滿星疊居民與舊部則稱之為「停戰協議」。",
          "不同用詞反映各方對事件的政治理解。本網站以「1996年繳械」作為中性表述，並保留不同來源原本使用的稱呼。"
        ],
        th: [
          "ปี 1996 ขุนส่าและกำลังหลัก Mong Tai Army วางอาวุธต่อรัฐบาลเมียนมา สื่อและงานวิจัยระหว่างประเทศมักใช้คำว่ายอมจำนนหรือวางอาวุธ บางคนท้องถิ่นเรียกข้อตกลงหยุดยิง",
          "คำต่างกันสะท้อนความเข้าใจทางการเมือง เว็บใช้คำกลาง「วางอาวุธปี 1996」และคงคำเดิมของแต่ละแหล่ง"
        ],
        en: [
          "In 1996 Khun Sa and main Mong Tai Army forces disarmed before the Myanmar government. International news and research often say “surrender” or “disarmament”; some local residents and former members say “ceasefire agreement.”",
          "The wording reflects political understandings. This site uses the neutral phrase “1996 disarmament” while noting each source’s own terms."
        ]
      }
    ),
    ch(
      "death",
      "agree",
      [7],
      {
        zh: "13. 2007年逝世",
        th: "13. การถึงแก่อสัญกรรมปี 2007",
        en: "13. Death in 2007"
      },
      {
        zh: [
          "昆沙於2007年10月26日在仰光逝世，享年73歲。",
          "舊文中「年逾七旬」「目前在仰光被保護」「距今已有十年」等說法反映原作者撰文時的情況，不代表今日現況，本站已改為明確年份表述。"
        ],
        th: [
          "ขุนส่าถึงแก่อสัญกรรมที่ย่างกุ้งเมื่อ 26 ตุลาคม 2007 อายุ 73 ปี",
          "ถ้อยคำเก่า เช่น อายุเกินเจ็ดสิบ หรือยังอยู่ภายใต้การคุ้มครอง สะท้อนเวลาที่ผู้เขียนเดิมเขียน ไม่ใช่สถานการณ์ปัจจุบัน"
        ],
        en: [
          "Khun Sa died in Yangon on 26 October 2007, aged 73.",
          "Older phrases such as “now in his seventies” or “under protection in Yangon” reflected the time of writing and are not present-day statements."
        ]
      }
    ),
    ch(
      "memorial",
      "oral",
      [3, 10],
      {
        zh: "14. 從軍事基地到地方記憶空間",
        th: "14. จากค่ายทหารสู่พื้นที่ความทรงจำท้องถิ่น",
        en: "14. From military camp to local memory space"
      },
      {
        zh: [
          "今日的昆沙紀念館保存部分舊建築、遺跡、照片、雕像與地方展示。這些物件不只是關於昆沙個人的紀念，也反映滿星疊居民如何記住戰爭、遷徙、教育與村落發展。",
          "紀念館的存在不代表對歷史人物所有行為的認同。它提供一個認識地方歷史、比較不同資料及思考爭議人物的空間。",
          "依園區及地方說明，騎馬銅像在昆沙逝世後設置，用以呈現其策馬形象。雕像的籌建時間、出資方式及製作者資料仍待進一步整理。除非有正式資料，本站不以「全體村民集資」作為已證實表述。",
          "對年代與真實性尚未確認的物件，本站使用「園區展示」「地方保存物件」「紀念性雕像」「歷史照片」「展示模型」「年代待考物件」等說法，避免一律稱為「文物」。"
        ],
        th: [
          "พิพิธภัณฑ์บ้านขุนส่าวันนี้คงอาคารเดิมบางส่วน ซาก ภาพถ่าย รูปปั้น และการจัดแสดงท้องถิ่น วัตถุเหล่านี้ไม่ได้เป็นเพียงอนุสรณ์บุคคล แต่สะท้อนวิธีที่ชาวบ้านจำสงคราม การย้ายถิ่น การศึกษา และการพัฒนาหมู่บ้าน",
          "การมีพิพิธภัณฑ์ไม่ได้หมายถึงการเห็นด้วยกับทุกการกระทำของบุคคลในประวัติศาสตร์ แต่เป็นพื้นที่เรียนรู้และเปรียบเทียบข้อมูล",
          "ตามคำอธิบายหน้างาน รูปปั้นขี่ม้าตั้งหลังการถึงแก่อสัญกรรม รายละเอียดทุนและช่างยังต้องเรียบเรียง เว็บไม่ยืนยันว่าชาวบ้านทั้งหมู่บ้านร่วมทุนหากไม่มีหลักฐานทางการ",
          "วัตถุที่ยังไม่ยืนยันปีและความแท้ ใช้คำว่าของจัดแสดง ของท้องถิ่น รูปปั้นระลึก ภาพประวัติศาสตร์ แบบจำลอง หรือของรอสอบ ไม่เรียกโบราณวัตถุทุกรายการ"
        ],
        en: [
          "The memorial keeps some former buildings, ruins, photographs, statues and local displays. These objects are not only about one person; they also show how residents remember war, migration, schooling and village change.",
          "A memorial does not mean endorsement of every act. It is a place to learn local history, compare sources and think about a contested figure.",
          "Park and local notes say the equestrian statue was set up after his death to show him on horseback. Funding and makers still need documentation. Without formal evidence this site does not treat “whole-village fundraising” as proven.",
          "When date or authenticity is unclear, we say park display, locally kept object, commemorative statue, historical photograph, model or object pending dating—not “relic” for every item."
        ]
      }
    ),
    ch(
      "views",
      "differ",
      [4, 5, 7, 1],
      {
        zh: "15. 國際記載與地方觀點",
        th: "15. บันทึกระหว่างประเทศกับมุมมองท้องถิ่น",
        en: "15. International records and local views"
      },
      {
        zh: [
          "昆沙與金三角毒品貿易的關係，是其生平最具爭議的部分。",
          "美國司法及緝毒機構、多數國際新聞與研究資料認為，昆沙所領導的組織參與或保障鴉片及海洛因的生產、徵稅與跨境販運。",
          "昆沙及其支持者則主張，部隊主要向種植者和商人徵收費用，以維持軍隊及撣邦政治活動。部分地方居民也以山區貧困、農業條件及長期衝突作為理解這段歷史的背景。",
          "上述說法代表不同立場。「僅收取保護費」屬於昆沙陣營的自我陳述，不能取代國際調查結果；國際指控則主要針對其組織在毒品網絡中的角色，無法完全涵蓋滿星疊居民對地方生活及建設的記憶。",
          "這些差異反映不同群體的歷史經驗。本網站暫不作定論，而是並列不同記錄，提供讀者理解與思考。"
        ],
        th: [
          "ความสัมพันธ์ของขุนส่ากับการค้ายาในสามเหลี่ยมทองคำเป็นส่วนที่มีข้อถกเถียงมากที่สุด",
          "หน่วยงานยุติธรรมและปราบปรามยาของสหรัฐ รวมทั้งข่าวและงานวิจัยระหว่างประเทศจำนวนมากเห็นว่าองค์กรภายใต้การนำของเขามีส่วนหรือคุ้มครองการผลิต การเก็บภาษี และการค้าฝิ่นและเฮโรอีนข้ามแดน",
          "ขุนส่าและผู้สนับสนุนอ้างว่ากองเก็บค่าธรรมเนียมจากผู้ปลูกและพ่อค้าเพื่อเลี้ยงกองทัพและการเมืองรัฐฉาน ชาวบ้านบางส่วนอธิบายผ่านความยากจนบนที่สูง เงื่อนไขเกษตร และความขัดแย้งยาวนาน",
          "คำว่า「เก็บค่าคุ้มครองอย่างเดียว」เป็นการกล่าวของฝ่ายขุนส่า ไม่แทนผลการสอบสวนระหว่างประเทศ ข้อกล่าวหาระหว่างประเทศเน้นบทบาทในเครือข่ายยา และครอบคลุมความทรงจำเรื่องชีวิตและการก่อสร้างของชาวบ้านไม่ได้ทั้งหมด",
          "ความต่างสะท้อนประสบการณ์กลุ่มต่างกัน เว็บยังไม่ชี้ขาด แต่เสนอคู่กันเพื่อให้ผู้อ่านคิด"
        ],
        en: [
          "Khun Sa’s links to Golden Triangle drug trade are the most contested part of his life.",
          "U.S. judicial and drug-enforcement bodies, and much international news and research, hold that organisations under his leadership took part in or protected opium and heroin production, taxation and cross-border trafficking.",
          "Khun Sa and supporters argued that the force mainly taxed growers and traders to sustain the army and Shan politics. Some residents also read the period through highland poverty, farming limits and long conflict.",
          "“Only collecting protection fees” is a self-account from Khun Sa’s side and does not replace international investigations. International charges focus on roles in drug networks and cannot cover all local memories of daily life and building.",
          "The differences reflect different historical experiences. This site draws no final verdict; it places records side by side for readers to think with."
        ]
      }
    ),
    ch(
      "limits",
      "pending",
      [1, 8, 9],
      {
        zh: "16. 史料限制與參考文獻",
        th: "16. ข้อจำกัดของหลักฐานและเอกสารอ้างอิง",
        en: "16. Limits of the evidence and references"
      },
      {
        zh: [
          "本頁為學生整理的歷史摘要，不以任何單一舊文章全文取代多源查證。短引文若使用，將標示作者、篇名與年份；未取得授權者不放整篇逐字稿。",
          "〈昆沙華校滿星疊〉等地方華文資料書目欄位仍待補。紙本專書在未完成頁碼核對前，僅列於「建議查閱文獻」。",
          "完整書目、註腳與分類請見「資料來源」頁。歡迎透過「補充史料／回報錯誤」提供可核對的文件與回憶（須經人工審核）。"
        ],
        th: [
          "หน้านี้เป็นสรุปที่นักเรียนเรียบเรียง ไม่ใช้บทความเก่าฉบับเต็มแทนการตรวจหลายแหล่ง คำอ้างสั้นจะระบุผู้เขียน ชื่อเรื่อง และปี หากไม่มีสิทธิ์จะไม่ลงต้นฉบับทั้งบท",
          "รายการบรรณานุกรมเอกสารจีนท้องถิ่นยังต้องเติม หนังสือกระดาษที่ยังไม่ตรวจเลขหน้าอยู่ในรายการแนะนำให้อ่าน",
          "บรรณานุกรมเต็มดูที่หน้าแหล่งข้อมูล และส่งข้อมูลเพิ่มผ่านแบบฟอร์ม (ต้องผ่านการตรวจก่อนเผยแพร่)"
        ],
        en: [
          "This page is a student summary, not a full reprint of any single older article. Short quotations, when used, will name author, title and year. Full verbatim reprints are not posted without permission.",
          "Bibliography fields for local Chinese articles are still incomplete. Print books not yet checked at page level are listed only as suggested reading.",
          "Full bibliography and footnotes are on the Sources page. Contributions via the corrections form require human review before any update."
        ]
      }
    )
  ];

  const METHOD = {
    title: {
      zh: "我們如何整理這段歷史",
      th: "เราเรียบเรียงประวัติอย่างไร",
      en: "How we organise this history"
    },
    paragraphs: {
      zh: [
        "我們是滿星疊大同中學的學生。這段歷史與我們生活的村落、學校及長輩的記憶有關，但其中也包含毒品、武裝衝突、政治立場與不同族群的歷史經驗。",
        "整理資料時，我們盡量查明年代、人物、地點及資料來源。對於無法完全確認的內容，我們會標示為地方口述、當事人說法或待查資料，而不將其寫成確定事實。",
        "我們尊重長輩的記憶，也尊重政府資料、學術研究及其他公開紀錄。呈現不同觀點不是要否定任何一方，而是希望更誠實地理解滿星疊曾經歷過的時代。",
        "網站內容仍可能有所不足，若讀者持有相關照片、文件或親身經歷，歡迎提供資料，協助我們持續補充與查證。"
      ],
      th: [
        "เราเป็นนักเรียนโรงเรียนต้าถงบ้านเทอดไทย ประวัตินี้เกี่ยวพันหมู่บ้าน โรงเรียน และความทรงจำผู้ใหญ่ แต่ก็รวมยาเสพติด ความขัดแย้งติดอาวุธ การเมือง และประสบการณ์ชาติพันธุ์ต่างกัน",
        "เมื่อเรียบเรียง เราพยายามระบุปี บุคคล สถานที่ และแหล่ง สำหรับสิ่งที่ยืนยันไม่ได้จะติดป้ายคำบอกเล่าหรือรอตรวจสอบ ไม่เขียนเป็นข้อเท็จจริงแน่นอน",
        "เราเคารพความทรงจำผู้ใหญ่ และเคารพข้อมูลรัฐ งานวิชาการ และเอกสารสาธารณะ การเสนอหลายมุมไม่ใช่การปฏิเสธฝ่ายใด แต่เพื่อเข้าใจยุคสมัยของบ้านเทอดไทยอย่างตรงไปตรงมาขึ้น",
        "เนื้อหาอาจยังไม่ครบ หากมีภาพ เอกสาร หรือประสบการณ์ ยินดีให้ข้อมูลเพื่อช่วยเติมและตรวจสอบ"
      ],
      en: [
        "We are students of Datong School, Ban Thoed Thai. This history touches our village, school and elders’ memories, and also drugs, armed conflict, politics and different ethnic experiences.",
        "When we organise material we try to fix dates, people, places and sources. What we cannot confirm is labelled oral, participant account or pending—not written as settled fact.",
        "We respect elders’ memories and also government, academic and other public records. Showing more than one view is not to dismiss anyone; it is to understand Ban Thoed Thai’s past more honestly.",
        "The site may still be incomplete. Photographs, documents or lived experience are welcome so we can keep adding and checking."
      ]
    }
  };

  window.KHUNSA_HISTORY = { CHAPTERS, METHOD };
})();
