/**
 * Oral-history registry. Do not invent interview dates or consent.
 * Entries from older articles are placeholders until metadata is completed.
 */
(function () {
  const INTROS = {
    zh: "口述歷史呈現個人的記憶與觀點，不必然等同完整歷史事實。不同受訪者可能對同一事件有不同記憶，本網站將盡量保留其原意並與其他資料對照。",
    th: "ประวัติศาสตร์บอกเล่าคือความทรงจำและมุมมองของบุคคล ไม่เท่ากับข้อเท็จจริงครบถ้วน ผู้ให้สัมภาษณ์อาจจำเหตุการณ์เดียวกันต่างกัน เว็บจะพยายามคงเจตนาเดิมและเทียบกับข้อมูลอื่น",
    en: "Oral history presents personal memory and viewpoint; it is not the whole of historical fact. Narrators may remember the same event differently. This site keeps intent where possible and compares other sources."
  };

  const RECORDS = [
    {
      id: "oh-001",
      status: "pending_metadata",
      displayName: {
        zh: "張明光（見地方華文紀錄整理）",
        th: "จางหมิงกวง (จากบันทึกจีนท้องถิ่น)",
        en: "Zhang Mingguang (as summarised in local Chinese records)"
      },
      birthYear: "",
      relation: {
        zh: "滿星疊大同中學相關人士；地方華文紀錄中的親歷者敘述",
        th: "เกี่ยวข้องโรงเรียนต้าถง；คำบอกเล่าในบันทึกจีนท้องถิ่น",
        en: "Linked to Datong School; participant narrative in local Chinese records"
      },
      interviewDate: "待補",
      interviewPlace: "待補",
      interviewer: "待補",
      language: "zh",
      summary: {
        zh: "地方華文紀錄整理其就學、徵兵抽籤、「小兵隊」訓練及紀律處罰等回憶。本站僅作摘要指向，不以單一經歷概括全村。",
        th: "บันทึกท้องถิ่นสรุปความทรงจำเรื่องเรียน การจับฉลากเกณฑ์ ทหารเด็ก และวินัย เว็บสรุปชี้แหล่ง ไม่สรุปเป็นประสบการณ์ทั้งหมู่บ้าน",
        en: "Local Chinese records summarise schooling, conscription lots, boy-soldier drill and discipline. This site points to that summary and does not generalise to the whole village."
      },
      transcript: "",
      media: "",
      consentPublic: "待確認",
      confirmedByNarrator: "待確認",
      crossRefs: ["sources.html#src-1", "about.html#youth"],
      pendingNotes: {
        zh: "訪談日期、地點、訪談者、是否同意公開、原始影音與逐字稿均待補。敏感個資（電話、住址等）不得公開。",
        th: "วัน สถานที่ ผู้สัมภาษณ์ ความยินยอม ไฟล์เสียง/ภาพ และคำถอดยังต้องเติม ห้ามเปิดเผยข้อมูลส่วนบุคคลอ่อนไหว",
        en: "Interview date, place, interviewer, consent, AV and transcript still pending. Sensitive personal data must not be published."
      }
    }
  ];

  window.KHUNSA_ORAL = { INTROS, RECORDS };
})();
