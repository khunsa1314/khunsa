/**
 * Bibliography for Khun Sa Memorial (student-curated).
 * Do not invent URLs, page numbers, or quotations for print books not yet consulted.
 */
(function () {
  const SOURCES = [
    {
      id: 1,
      cat: "A",
      authors: "作者／刊名待補",
      title: "〈昆沙華校滿星疊〉",
      year: "待補",
      type: "地方華文紀錄／全文書目待補",
      lang: "zh",
      url: "",
      accessed: "2026-09-04",
      supports: "滿星疊地方敘事、大同中學創校、1982年相關地方記憶等網站摘要來源之一",
      primary: false,
      note: "書目資料待補：作者、原刊物、發表日期、頁碼、取得方式及全文轉載授權尚未完整確認。未取得授權前，本站不以全文逐字轉載。"
    },
    {
      id: 2,
      cat: "A",
      authors: "滿星疊大同中學（校史／地方整理）",
      title: "大同中學創校年份（校方確認）",
      year: "1975",
      type: "校史確認事項",
      lang: "zh",
      url: "",
      accessed: "2026-09-04",
      supports: "1975年大同中學創校",
      primary: true,
      note: "依校方確認內容；本站不得改為其他年份。"
    },
    {
      id: 3,
      cat: "B",
      authors: "องค์การบริหารส่วนตำบลเทอดไทย",
      title: "บ้านขุนส่า",
      year: "n.d.",
      type: "泰國地方政府網頁",
      lang: "th",
      url: "https://www.therdthai.go.th/postdata/701",
      accessed: "2026-09-04",
      supports: "地方對「บ้านขุนส่า」及Ban Hin Taek一帶活動年代的記述（含追溯至1963年等說法）",
      primary: false,
      note: "屬地方政府公開說明；與國際研究對進駐年代的記載可能不同，應並列閱讀。"
    },
    {
      id: 4,
      cat: "C",
      authors: "DEA Museum",
      title: "Drug Mule Bell and Bridle",
      year: "n.d.",
      type: "美國緝毒署博物館藏品說明",
      lang: "en",
      url: "https://museum.dea.gov/museum-collection/collection-spotlight/artifact/drug-mule-bell-bridle",
      accessed: "2026-09-04",
      supports: "美國執法／博物館脈絡下對金三角毒品販運與相關人物的展示敘述",
      primary: false,
      note: "僅可依頁面既有說明引用，不可超出來源自行推論。"
    },
    {
      id: 5,
      cat: "C",
      authors: "UNODC",
      title: "Opium Poppy Cultivation in South East Asia 2007",
      year: "2007",
      type: "聯合國報告",
      lang: "en",
      url: "https://www.unodc.org/pdf/research/icmp/south_east_asia_report_2007_web.pdf",
      accessed: "2026-09-04",
      supports: "東南亞罌粟種植與相關背景資料",
      primary: false,
      note: "報告討論區域種植情勢，不宜逕自等同個人罪名陳述。"
    },
    {
      id: 6,
      cat: "D",
      authors: "Amporn Jirattikorn",
      title: "Shan virtual insurgency and the spectatorship of the nation",
      year: "2011",
      type: "學術期刊文章",
      lang: "en",
      url: "https://www.cambridge.org/core/journals/journal-of-southeast-asian-studies/article/abs/shan-virtual-insurgency-and-the-spectatorship-of-the-nation/AA10EDAA2A9A000EC0B162EC7CB42370",
      accessed: "2026-09-04",
      supports: "撣族媒體、民族想像與相關政治／文化再現之研究脈絡",
      primary: false,
      note: "建議查閱全文後再用於細部引證；目前列為參考文獻。"
    },
    {
      id: 7,
      cat: "E",
      authors: "The Guardian",
      title: "Khun Sa",
      year: "2007",
      type: "訃聞／新聞",
      lang: "en",
      url: "https://www.theguardian.com/news/2007/nov/06/guardianobituaries.burma",
      accessed: "2026-09-04",
      supports: "2007年逝世、國際媒體對生平的概述與評價框架",
      primary: false,
      note: "媒體訃聞有其敘事立場，需與其他類型資料對照。"
    },
    {
      id: 8,
      cat: "G",
      authors: "Bertil Lintner",
      title: "Burma in Revolt: Opium and Insurgency Since 1948",
      year: "1999",
      type: "專書（建議查閱）",
      lang: "en",
      url: "",
      accessed: "",
      supports: "緬甸叛亂、鴉片與武裝政治之研究背景",
      primary: false,
      note: "紙本專書。本站整理團隊尚未以具體頁碼完成核對，暫列「建議查閱文獻」，不以本書裝作已證實正文。"
    },
    {
      id: 9,
      cat: "G",
      authors: "Martin Smith",
      title: "Burma: Insurgency and the Politics of Ethnicity",
      year: "1991",
      type: "專書（建議查閱）",
      lang: "en",
      url: "",
      accessed: "",
      supports: "緬甸族群政治與武裝衝突研究背景",
      primary: false,
      note: "紙本專書。尚未完成頁碼級引用核對，暫列建議查閱。"
    },
    {
      id: 10,
      cat: "F",
      authors: "滿星疊大同中學學生整理團隊",
      title: "園區據點現況、開放狀態與現場展示抄錄",
      year: "2026",
      type: "學生現場調查／館方確認事項彙整",
      lang: "zh",
      url: "",
      accessed: "2026-08-28",
      supports: "十二處據點編號、開放狀態、聯絡電話與預約提醒",
      primary: true,
      note: "動態資訊以現場公告為準；最後確認日期見參觀頁。"
    },
    {
      id: 11,
      cat: "G",
      authors: "待補",
      title: "土牢／土洞尺寸現場測量紀錄",
      year: "待補",
      type: "學生測量／或舊文描述",
      lang: "zh",
      url: "",
      accessed: "",
      supports: "土牢尺寸描述",
      primary: false,
      note: "若為舊文章數字：標「依地方文章描述，尚未重新測量確認」。若為學生測量：需補測量日期。目前尺寸仍待確認。"
    }
  ];

  const CAT_LABELS = {
    zh: {
      A: "A. 大同中學校史與地方華文資料",
      B: "B. 滿星疊地方政府及泰國政府資料",
      C: "C. 國際機構與執法資料",
      D: "D. 學術研究與專書",
      E: "E. 新聞、採訪與訃聞",
      F: "F. 口述歷史與學生現場調查",
      G: "G. 尚待補充或確認的資料"
    },
    th: {
      A: "A. ประวัติโรงเรียนและเอกสารจีนท้องถิ่น",
      B: "B. ข้อมูลองค์กรปกครองส่วนท้องถิ่นและรัฐไทย",
      C: "C. หน่วยงานระหว่างประเทศและการบังคับใช้กฎหมาย",
      D: "D. งานวิชาการและหนังสือ",
      E: "E. ข่าว สัมภาษณ์ และคำไว้อาลัย",
      F: "F. ประวัติศาสตร์บอกเล่าและการสำรวจภาคสนามของนักเรียน",
      G: "G. ข้อมูลที่ยังต้องเติมหรือยืนยัน"
    },
    en: {
      A: "A. Datong School history and local Chinese sources",
      B: "B. Local Thai government sources",
      C: "C. International and law-enforcement sources",
      D: "D. Academic studies and books",
      E: "E. News, interviews and obituaries",
      F: "F. Oral history and student field notes",
      G: "G. Items still to be completed or verified"
    }
  };

  window.KHUNSA_SOURCES = { SOURCES, CAT_LABELS };
})();
