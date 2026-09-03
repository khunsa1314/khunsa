/**
 * Timeline entries — years/facts aligned across zh/th/en.
 * Tags: agree | differ | oral | pending
 */
(function () {
  const TAGS = {
    zh: {
      agree: { label: "多方資料一致", tip: "此標籤用來說明資料性質，不代表對提供者是否誠實的判斷。" },
      differ: { label: "不同來源記載有差異", tip: "此標籤用來說明資料性質，不代表對提供者是否誠實的判斷。" },
      oral: { label: "地方口述／當事人回憶", tip: "此標籤用來說明資料性質，不代表對提供者是否誠實的判斷。" },
      pending: { label: "尚待進一步查證", tip: "此標籤用來說明資料性質，不代表對提供者是否誠實的判斷。" }
    },
    th: {
      agree: { label: "หลายแหล่งสอดคล้อง", tip: "ป้ายนี้บอกชนิดของข้อมูล ไม่ได้ตัดสินว่าผู้ให้ข้อมูลซื่อสัตย์หรือไม่" },
      differ: { label: "แหล่งต่างกันบันทึกไม่ตรงกัน", tip: "ป้ายนี้บอกชนิดของข้อมูล ไม่ได้ตัดสินว่าผู้ให้ข้อมูลซื่อสัตย์หรือไม่" },
      oral: { label: "คำบอกเล่าท้องถิ่น／ความทรงจำผู้เกี่ยวข้อง", tip: "ป้ายนี้บอกชนิดของข้อมูล ไม่ได้ตัดสินว่าผู้ให้ข้อมูลซื่อสัตย์หรือไม่" },
      pending: { label: "ยังต้องตรวจสอบเพิ่ม", tip: "ป้ายนี้บอกชนิดของข้อมูล ไม่ได้ตัดสินว่าผู้ให้ข้อมูลซื่อสัตย์หรือไม่" }
    },
    en: {
      agree: { label: "Multiple sources agree", tip: "This label describes the nature of the evidence. It does not judge whether a source is honest." },
      differ: { label: "Sources differ", tip: "This label describes the nature of the evidence. It does not judge whether a source is honest." },
      oral: { label: "Local oral / participant memory", tip: "This label describes the nature of the evidence. It does not judge whether a source is honest." },
      pending: { label: "Still to be verified", tip: "This label describes the nature of the evidence. It does not judge whether a source is honest." }
    }
  };

  const ITEMS = [
    {
      id: "birth",
      year: { zh: "1933／1934", th: "1933／1934", en: "1933 / 1934" },
      place: { zh: "緬甸撣邦（萊莫山弄掌大寨等記載）", th: "รัฐฉาน เมียนมา", en: "Shan State, Myanmar" },
      tag: "differ",
      refs: [1, 7],
      text: {
        zh: "出生年份有不同記載：大同中學保存的地方資料記為1933年；多數國際出版物與訃聞則記載為1934年2月17日。",
        th: "ปีเกิดมีบันทึกต่างกัน เอกสารท้องถิ่นของโรงเรียนต้าถงระบุปี 1933 สิ่งพิมพ์และคำไว้อาลัยระหว่างประเทศส่วนใหญ่ระบุ 17 ก.พ. 1934",
        en: "Birth year differs: Datong School local records give 1933; many international publications and obituaries give 17 February 1934."
      }
    },
    {
      id: "1963",
      year: { zh: "1963", th: "1963", en: "1963" },
      place: { zh: "泰緬邊境／Ban Hin Taek一帶（依地方資料）", th: "แนวชายแดนไทย–เมียนมา／บ้านหินแตก", en: "Thai–Myanmar border / Ban Hin Taek area (local account)" },
      tag: "differ",
      refs: [3],
      text: {
        zh: "特泰地方政府資料將昆沙在Ban Hin Taek一帶的活動追溯至1963年，並與地方自衛武裝的組織有關。其他研究對早期階段的界線記載不一。",
        th: "ข้อมูลท้องถิ่นเทอดไทยโยงกิจกรรมในพื้นที่บ้านหินแตกถึงปี 1963 และการจัดตั้งกำลังป้องกันท้องถิ่น งานวิจัยอื่นอาจกำหนดช่วงต่างกัน",
        en: "Therd Thai local government materials trace activity around Ban Hin Taek to 1963 and local self-defence organisation. Other studies draw the early period differently."
      }
    },
    {
      id: "1967",
      year: { zh: "1967", th: "1967", en: "1967" },
      place: { zh: "金三角", th: "สามเหลี่ยมทองคำ", en: "Golden Triangle" },
      tag: "pending",
      refs: [7, 8],
      text: {
        zh: "多數概述性資料提到1967年前後捲入金三角鴉片商隊衝突。細節仍宜對照專書與檔案後再細寫。",
        th: "เอกสารภาพรวมหลายชิ้นกล่าวถึงความขัดแย้งคาราวานฝิ่นราวปี 1967 รายละเอียดควรเทียบหนังสือและเอกสารเพิ่ม",
        en: "Many overview sources place him in Golden Triangle opium-caravan fighting around 1967. Details should be checked against books and archives before finer claims."
      }
    },
    {
      id: "1969",
      year: { zh: "1969", th: "1969", en: "1969" },
      place: { zh: "緬甸", th: "เมียนมา", en: "Myanmar" },
      tag: "agree",
      refs: [7],
      text: {
        zh: "遭緬甸政府拘禁（國際訃聞與概述多採此年）。",
        th: "ถูกทางการเมียนมากักขัง (คำไว้อาลัยและภาพรวมระหว่างประเทศมักใช้ปีนี้)",
        en: "Detained by the Myanmar authorities (commonly dated 1969 in international obituaries and overviews)."
      }
    },
    {
      id: "release",
      year: { zh: "1973／1974", th: "1973／1974", en: "1973 / 1974" },
      place: { zh: "緬甸", th: "เมียนมา", en: "Myanmar" },
      tag: "differ",
      refs: [7],
      text: {
        zh: "獲釋年份存在不同記載（1973或1974）。本網站並列呈現，暫不作單一斷定。",
        th: "ปีที่ได้รับการปล่อยมีบันทึกต่างกัน (1973 หรือ 1974) เว็บนี้เสนอคู่กันโดยยังไม่ชี้ขาด",
        en: "Release is dated variously to 1973 or 1974. This site presents both readings without forcing one."
      }
    },
    {
      id: "1975",
      year: { zh: "1975", th: "1975", en: "1975" },
      place: { zh: "滿星疊（Ban Thoed Thai／舊稱 Ban Hin Taek），泰國清萊府", th: "บ้านเทอดไทย (เดิมบ้านหินแตก) เชียงราย", en: "Ban Thoed Thai (formerly Ban Hin Taek), Chiang Rai, Thailand" },
      tag: "agree",
      refs: [2, 1],
      text: {
        zh: "滿星疊大同中學創校（校方確認）。",
        th: "โรงเรียนต้าถงบ้านเทอดไทยก่อตั้ง (ยืนยันโดยโรงเรียน)",
        en: "Datong School founded at Ban Thoed Thai (confirmed by the school)."
      }
    },
    {
      id: "1976",
      year: { zh: "約1976", th: "ราว 1976", en: "c. 1976" },
      place: { zh: "Ban Hin Taek／滿星疊", th: "บ้านหินแตก／บ้านเทอดไทย", en: "Ban Hin Taek / Ban Thoed Thai" },
      tag: "differ",
      refs: [3, 7],
      text: {
        zh: "國際研究多指獲釋後約於1976年重新進駐Ban Hin Taek並建立重要基地；地方資料另有更早活動的追溯。兩者可能分指不同階段。",
        th: "งานวิจัยระหว่างประเทศมักระบุว่าหลังปล่อยตัวราวปี 1976 ได้ตั้งฐานสำคัญที่บ้านหินแตก ข้อมูลท้องถิ่นอาจย้อนกิจกรรมก่อนหน้านั้น สองแบบอาจหมายถึงช่วงต่างกัน",
        en: "International studies often place a major return to Ban Hin Taek around 1976 after release; local materials may push earlier activity further back. The two may describe different stages."
      }
    },
    {
      id: "1982",
      year: { zh: "1982年1月21日", th: "21 ม.ค. 1982", en: "21 January 1982" },
      place: { zh: "Ban Hin Taek／滿星疊，泰國", th: "บ้านหินแตก／บ้านเทอดไทย ประเทศไทย", en: "Ban Hin Taek / Ban Thoed Thai, Thailand" },
      tag: "agree",
      refs: [1, 7, 3],
      text: {
        zh: "泰國部隊展開Ban Hin Taek軍事行動，目標包括驅離昆沙武裝。戰後日漸轉往緬甸一側。細部（生日宴、傷亡、搜索等）來源記載不一。",
        th: "กองกำลังไทยเปิดปฏิบัติการที่บ้านหินแตก เพื่อขับกำลังของขุนส่า หลังศึกค่อยย้ายไปฝั่งเมียนมา รายละเอียดบางส่วนแหล่งข้อมูลไม่ตรงกัน",
        en: "Thai forces launched operations at Ban Hin Taek aiming to drive out Khun Sa’s armed group. Afterwards activity shifted toward the Myanmar side. Some details differ by source."
      }
    },
    {
      id: "1985",
      year: { zh: "1985", th: "1985", en: "1985" },
      place: { zh: "泰緬邊境／撣邦相關武裝", th: "แนวชายแดน／กำลังเกี่ยวข้องรัฐฉาน", en: "Border / Shan-related forces" },
      tag: "pending",
      refs: [7, 8],
      text: {
        zh: "相關武裝整合為 Mong Tai Army（蒙傣軍）的時間，概述性資料多寫1985；細節仍建議查閱專書核對。",
        th: "การรวมกำลังเป็น Mong Tai Army มักระบุปี 1985 ในเอกสารภาพรวม ควรเทียบหนังสือเพิ่ม",
        en: "Overview sources often date consolidation as the Mong Tai Army to 1985; finer dating should be checked in specialist books."
      }
    },
    {
      id: "1993",
      year: { zh: "1993年前後", th: "ราวปี 1993", en: "Around 1993" },
      place: { zh: "Ho Mong，緬甸撣邦（非泰國滿星疊）", th: "โฮมอง รัฐฉาน เมียนมา (ไม่ใช่บ้านเทอดไทย)", en: "Ho Mong, Shan State, Myanmar (not Ban Thoed Thai)" },
      tag: "differ",
      refs: [6, 7],
      text: {
        zh: "昆沙陣營在Ho Mong一帶提出撣邦自治、獨立或政治實體等主張；名稱與正式程度記載不一。不可寫成發生於滿星疊，也不可寫成已獲國際承認的國家。",
        th: "ค่ายขุนส่าเสนอข้อเรียกร้องปกครองตนเองหรือเอกราชที่โฮมอง ชื่อและระดับความเป็นทางการต่างกันตามแหล่ง ห้ามสับสนกับบ้านเทอดไทย และห้ามเขียนว่ารัฐได้รับการรับรองระหว่างประเทศ",
        en: "Khun Sa’s camp advanced Shan autonomy or independence claims around Ho Mong; names and formality vary. Not at Ban Thoed Thai; not an internationally recognised state."
      }
    },
    {
      id: "1996",
      year: { zh: "1996", th: "1996", en: "1996" },
      place: { zh: "緬甸", th: "เมียนมา", en: "Myanmar" },
      tag: "differ",
      refs: [7, 1],
      text: {
        zh: "昆沙及蒙傣軍主力向緬甸政府繳械。國際多用「投降／繳械」；部分地方居民與舊部稱「停戰協議」。本站以「1996年繳械」為中性表述。",
        th: "ขุนส่าและกำลังหลัก Mong Tai Army วางอาวุธต่อรัฐบาลเมียนมา สื่อระหว่างประเทศมักใช้คำว่ายอมจำนน／วางอาวุธ บางคนท้องถิ่นเรียกข้อตกลงหยุดยิง เว็บใช้คำกลาง「วางอาวุธปี 1996」",
        en: "Khun Sa and main Mong Tai Army forces disarmed before the Myanmar government. International wording often says surrender/disarmament; some locals say ceasefire. This site uses the neutral phrase “1996 disarmament”."
      }
    },
    {
      id: "2007",
      year: { zh: "2007年10月26日", th: "26 ต.ค. 2007", en: "26 October 2007" },
      place: { zh: "仰光，緬甸", th: "ย่างกุ้ง เมียนมา", en: "Yangon, Myanmar" },
      tag: "agree",
      refs: [7],
      text: {
        zh: "昆沙在仰光逝世，享年73歲。",
        th: "ขุนส่าถึงแก่อสัญกรรมที่ย่างกุ้ง อายุ 73 ปี",
        en: "Khun Sa died in Yangon, aged 73."
      }
    },
    {
      id: "memorial",
      year: { zh: "其後", th: "หลังจากนั้น", en: "Afterwards" },
      place: { zh: "滿星疊昆沙紀念館園區", th: "พื้นที่พิพิธภัณฑ์บ้านขุนส่า บ้านเทอดไทย", en: "Khun Sa Memorial grounds, Ban Thoed Thai" },
      tag: "oral",
      refs: [3, 10],
      text: {
        zh: "舊營區逐漸成為地方歷史展示與紀念空間；騎馬銅像等展示物的籌建細節仍待進一步整理。",
        th: "ค่ายเดิมค่อยกลายเป็นพื้นที่จัดแสดงและระลึกประวัติท้องถิ่น รายละเอียดการสร้างรูปปั้นขี่ม้ายังต้องเรียบเรียงเพิ่ม",
        en: "The former camp gradually became a local history display and memorial space; details of statues and displays still need further documentation."
      }
    }
  ];

  window.KHUNSA_TIMELINE = { TAGS, ITEMS };
})();
