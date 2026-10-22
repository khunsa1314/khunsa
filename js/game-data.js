/**
 * 滿星疊・記憶之路 — game data (editable).
 * Fiction traveler journey; history lines cite existing site pages only.
 */
(function () {
  const L = (zh, th, en) => ({ zh, th, en });

  window.KHUNSA_GAME = {
    SAVE_KEY: "khunsa-memory-road-v2",
    VERSION: 2,
    START_TIME: 120,
    START_ENERGY: 120,
    TRAVEL_TIME: 8,
    TRAVEL_ENERGY: 7,
    MAP_SAVE: 3,

    roles: [
      {
        id: "student",
        name: L("學生", "นักเรียน", "Student"),
        blurb: L(
          "擅長整理資料與展板筆記。在史料展示室可使用專屬整理選項。",
          "ถนัดจัดบันทึกและป้ายจัดแสดง มีตัวเลือกพิเศษที่ห้องเอกสาร",
          "Good at organising notes. Special option in the history display room."
        ),
        perk: L("專長：整理筆記", "จุดเด่น: จัดบันทึก", "Perk: organise notes")
      },
      {
        id: "photo",
        name: L("攝影愛好者", "นักถ่ายภาพ", "Photography enthusiast"),
        blurb: L(
          "擅長觀察場景細節。在青銅雕像與壁畫可使用專屬觀察選項。",
          "ถนัดสังเกตรายละเอียดฉาก มีตัวเลือกพิเศษที่รูปปั้นและภาพจิตรกรรม",
          "Good at observing scenes. Special options at the statue and mural."
        ),
        perk: L("專長：場景觀察", "จุดเด่น: สังเกตฉาก", "Perk: scene observation")
      },
      {
        id: "culture",
        name: L("文化旅人", "นักท่องเที่ยววัฒนธรรม", "Cultural traveler"),
        blurb: L(
          "擅長比較不同來源的記錄。在炸彈殘骸與史料展示室可比較多方史料。",
          "ถนัดเปรียบบันทึกหลายแหล่ง มีตัวเลือกเปรียบเทียบที่ซากระเบิดและห้องเอกสาร",
          "Compares records from different sources at the bomb remnant and display room."
        ),
        perk: L("專長：比較來源", "จุดเด่น: เปรียบแหล่ง", "Perk: compare sources")
      }
    ],

    items: [
      {
        id: "notebook",
        name: L("筆記本", "สมุดบันทึก", "Notebook"),
        effect: L(
          "整理筆記類事件可多得 1 條線索，並略減體力消耗。",
          "เหตุการณ์จดบันทึกได้เบาะแสเพิ่ม 1 และลดความเมื่อยเล็กน้อย",
          "Note events grant +1 clue and slightly less energy cost."
        )
      },
      {
        id: "camera",
        name: L("相機", "กล้อง", "Camera"),
        effect: L(
          "觀察場景時多得視覺線索；與攝影角色搭配效果更穩。",
          "เมื่อสังเกตฉากได้เบาะแสภาพเพิ่ม เข้ากับบทถ่ายภาพได้ดี",
          "Observation choices grant a visual clue; stronger with the photo role."
        )
      },
      {
        id: "water",
        name: L("飲水", "น้ำดื่ม", "Drinking water"),
        effect: L(
          "休息時額外恢復 8 點體力（仍會消耗時間）。",
          "พักแล้วฟื้นพลังเพิ่ม 8 (ยังใช้เวลา)",
          "Rest restores +8 extra energy (still costs time)."
        )
      },
      {
        id: "parkmap",
        name: L("園區地圖", "แผนที่สวน", "Park map"),
        effect: L(
          "每次移動少消耗 4 時間與 4 體力。",
          "แต่ละการเดินทางใช้เวลากับพลังน้อยลงอย่างละ 4",
          "Each move costs 4 less time and 4 less energy."
        )
      }
    ],

    /** Path order for unlock. Only open outdoor / display sites. */
    locations: [
      {
        id: "statue",
        spotId: 1,
        order: 1,
        name: L("青銅雕像", "รูปปั้นทองสัมฤทธิ์", "Bronze statue"),
        short: L("入口地標", "จุดหมายทางเข้า", "Entrance landmark"),
        image: "images/photos/18.jpg",
        link: "spot.html?id=1",
        unlockNext: "cave"
      },
      {
        id: "cave",
        spotId: 2,
        order: 2,
        name: L("土洞（土牢）", "โพรงดิน (คุกดิน)", "Earth cave (prison)"),
        short: L("山坡遺跡", "ซากบนเนิน", "Hillside remnant"),
        image: "images/photos/spot-02-cave-a.jpg",
        link: "spot.html?id=2",
        unlockNext: "bomb"
      },
      {
        id: "bomb",
        spotId: 6,
        order: 3,
        name: L("炸彈殘骸", "ซากระเบิด", "Bomb remnant"),
        short: L("1982 相關展示", "จัดแสดงเกี่ยว 1982", "Display linked to 1982"),
        image: "images/photos/spot-06.jpg",
        link: "spot.html?id=6",
        unlockNext: "hall"
      },
      {
        id: "hall",
        spotId: 7,
        order: 4,
        name: L("史料展示室", "ห้องจัดแสดงเอกสาร", "History display room"),
        short: L("原始用途待確認", "การใช้เดิมรอยืนยัน", "Original use pending"),
        image: "images/photos/spot-07-board.jpg",
        link: "spot.html?id=7",
        unlockNext: "mural"
      },
      {
        id: "mural",
        spotId: 12,
        order: 5,
        name: L("牆壁上的壁畫", "ภาพจิตรกรรมบนกำแพง", "Wall mural"),
        short: L("入口牆面", "กำแพงทางเข้า", "Entrance wall"),
        image: "images/photos/spot-12.jpg",
        link: "spot.html?id=12",
        unlockNext: null
      }
    ],

    cluesCatalog: {
      statue_landmark: {
        tags: ["place"],
        title: L("入口銅像地標", "จุดหมายรูปปั้นทางเข้า", "Entrance statue landmark"),
        text: L(
          "園區入口銅像是最醒目的地標。依園區及地方說明，雕像於昆沙逝世後設置；籌建細節仍待整理。",
          "รูปปั้นทางเข้าเป็นจุดหมายชัด ตามคำอธิบายหน้างานตั้งหลังถึงแก่อสัญกรรม รายละเอียดทุนยังต้องเรียบเรียง",
          "The entrance statue is the clearest landmark. Park notes say it was set after Khun Sa’s death; funding details still need work."
        ),
        source: L("據點頁・青銅雕像", "หน้าจุด・รูปปั้น", "Spot page · Bronze statue"),
        sourceUrl: "spot.html?id=1"
      },
      statue_photo: {
        tags: ["place", "visual"],
        title: L("銅像觀察筆記", "บันทึกสังเกตรูปปั้น", "Statue observation note"),
        text: L(
          "許多遊客會在此拍照。銅像呈現策馬形象，承載地方如何記住這段歷史，並不代表網站對歷史人物所有行為的評價。",
          "นักท่องเที่ยวถ่ายรูปที่นี่บ่อย รูปขี่ม้าสะท้อนวิธีจำของท้องถิ่น ไม่ใช่คำตัดสินของเว็บ",
          "Visitors often photograph here. The rider image shows how the place remembers; it is not this site’s verdict on every act."
        ),
        source: L("據點頁・青銅雕像", "หน้าจุด・รูปปั้น", "Spot page · Bronze statue"),
        sourceUrl: "spot.html?id=1"
      },
      cave_guide: {
        tags: ["place", "oral"],
        title: L("土牢導覽說明", "คำอธิบายคุกดิน", "Earth-prison guide note"),
        text: L(
          "依園區現有導覽，此處稱為土牢或土洞，與蒙傣軍時期關押／禁閉相關。尺寸與刑罰細節主要來自口述與舊文，仍待交叉查證。",
          "ตามนำชมเรียกคุกดิน/โพรง เกี่ยวการกักขังสมัยกองกำลัง ขนาดและโทษส่วนใหญ่จากคำบอกเล่า ยังต้องตรวจไขว้",
          "Park guides call this an earth prison/cave linked to confinement in the armed period. Measurements and penalties still need cross-checking."
        ),
        source: L("據點頁・土洞（土牢）", "หน้าจุด・คุกดิน", "Spot page · Earth cave"),
        sourceUrl: "spot.html?id=2"
      },
      cave_caution: {
        tags: ["place"],
        title: L("靠近遺跡的注意", "ข้อควรระวังใกล้ซาก", "Caution near the remnant"),
        text: L(
          "靠近時請注意步履與光線。開放狀態以現場為準。",
          "ระวังก้าวและแสง สถานะเปิดยึดหน้างาน",
          "Watch your step and the light. Opening status follows the site."
        ),
        source: L("據點頁・土洞（土牢）", "หน้าจุด・คุกดิน", "Spot page · Earth cave"),
        sourceUrl: "spot.html?id=2"
      },
      bomb_1982: {
        tags: ["place", "sourceA"],
        title: L("1982 戰事相關展示", "จัดแสดงเกี่ยวสงคราม 1982", "Display linked to 1982 fighting"),
        text: L(
          "依園區現有展示說明，炸彈殘骸被認為與1982年前後泰國政府在 Ban Hin Taek（滿星疊）一帶的軍事行動有關。",
          "ตามป้ายจัดแสดง ซากระเบิดโยงปฏิบัติการของรัฐไทยแถบบ้านหินแตกราว ค.ศ. 1982",
          "Park display notes link the remnant to Thai military action around Ban Hin Taek circa 1982."
        ),
        source: L("據點頁・炸彈殘骸／歷史頁", "หน้าจุด・ซากระเบิด / ประวัติ", "Spot · Bomb / History"),
        sourceUrl: "spot.html?id=6"
      },
      bomb_press: {
        tags: ["place", "sourceB"],
        title: L("報刊用語的提醒", "คำเตือนภาษารายงาน", "Note on press wording"),
        text: L(
          "部分報刊當時以鴉片戰爭作比喻，那是特定時代的報導用語，並非本網站的結論。",
          "สื่อบางฉบับเคยใช้คำเปรียบแบบสงครามฝิ่น เป็นภาษายุคนั้น ไม่ใช่ข้อสรุปของเว็บนี้",
          "Some press of the time used opium-war metaphors; that is period wording, not this site’s conclusion."
        ),
        source: L("據點頁・炸彈殘骸", "หน้าจุด・ซากระเบิด", "Spot page · Bomb remnant"),
        sourceUrl: "spot.html?id=6"
      },
      hall_pending: {
        tags: ["place", "sourceA"],
        title: L("展示室用途待確認", "การใช้ห้องรอยืนยัน", "Room use still pending"),
        text: L(
          "此房舍目前陳列生平展板與老照片。現場舊稱曾作「童軍駐房間」；在館方確認前，本站標為史料展示室（原始用途待確認）。",
          "ห้องนี้จัดแผ่นชีวประวัติและภาพเก่า ชื่อเก่ายังรอยืนยันจากพิพิธภัณฑ์",
          "Boards and old photos are shown here. An older room name awaits museum confirmation; this site labels original use as pending."
        ),
        source: L("據點頁・史料展示室", "หน้าจุด・ห้องเอกสาร", "Spot · History display room"),
        sourceUrl: "spot.html?id=7"
      },
      hall_compare: {
        tags: ["place", "sourceB"],
        title: L("展板與歷史頁對照", "เทียบแผ่นกับหน้าประวัติ", "Boards vs history page"),
        text: L(
          "展板圖文所載年代與敘事，請與歷史頁及資料來源頁對照閱讀，保留來源分歧與待確認標示。",
          "ปีและเรื่องบนแผ่นควรเทียบกับหน้าประวัติและแหล่งข้อมูล คงเครื่องหมายรอยืนยัน",
          "Dates and narratives on boards should be read against the history and sources pages, keeping pending labels."
        ),
        source: L("歷史頁／資料來源", "หน้าประวัติ / แหล่ง", "History / Sources"),
        sourceUrl: "sources.html"
      },
      mural_symbols: {
        tags: ["place", "visual"],
        title: L("壁畫圖像說明", "คำอธิบายภาพจิตรกรรม", "Mural imagery note"),
        text: L(
          "入口磚牆有浮雕與「บ้านขุนส่า／KHUN SA OLD CAMP」。依園區解說，圖像與族群、武裝組織及相關政治主張有關。",
          "กำแพงมีนูนต่ำและชื่อค่าย ตามคำอธิบายโยงชาติพันธุ์ กองกำลัง และข้ออ้างการเมืองที่เกี่ยวข้อง",
          "The wall shows reliefs and “KHUN SA OLD CAMP”. Park notes link the imagery to ethnicity, armed groups and related claims."
        ),
        source: L("據點頁・牆壁上的壁畫", "หน้าจุด・ภาพจิตรกรรม", "Spot page · Mural"),
        sourceUrl: "spot.html?id=12"
      },
      note_organise: {
        tags: ["meta"],
        title: L("旅途筆記整理", "จัดบันทึกการเดินทาง", "Travel notes organised"),
        text: L(
          "（遊戲事件）你把今天看過的展板重點抄進筆記本，方便回家後對照網站條目。",
          "(เหตุการณ์เกม) คุณจดประเด็นป้ายวันนี้ลงสมุด เพื่อเทียบกับหน้าเว็บภายหลัง",
          "(Game event) You copy board highlights into a notebook to check against site pages later."
        ),
        source: L("遊戲事件・非史料", "เหตุการณ์เกม・ไม่ใช่หลักฐาน", "Game event · not a source"),
        sourceUrl: "game.html"
      },
      route_plan: {
        tags: ["meta"],
        title: L("路線重規劃", "วางเส้นทางใหม่", "Route replanned"),
        text: L(
          "（遊戲事件）你依建議參觀順序調整下一步：銅像 → 土牢 → 炸彈殘骸 → 史料展示室 → 壁畫。",
          "(เหตุการณ์เกม) คุณปรับลำดับตามเส้นทางแนะนำ",
          "(Game event) You adjust the next stop to the suggested route order."
        ),
        source: L("參觀資訊・建議路線", "ข้อมูลเข้าชม・เส้นทางแนะนำ", "Visit · suggested route"),
        sourceUrl: "visit.html#route"
      }
    },

    /** Location events: choices apply deltas + optional clueIds / flags / roleOnly / needItem */
    locationEvents: {
      statue: {
        scene: L(
          "你站在紀念館入口。銅像在陽光下很醒目。這是虛構旅程的起點；歷史說明請對照據點頁。",
          "คุณยืนที่ทางเข้า รูปปั้นเด่นใต้แดด นี่คือจุดเริ่มการเดินทางสมมติ ดูรายละเอียดที่หน้าจุด",
          "You stand at the entrance. The statue is clear in the light. This is a fictional visit; check the spot page for history."
        ),
        fiction: true,
        choices: [
          {
            id: "statue_read",
            label: L("仔細閱讀入口說明（較完整）", "อ่านป้ายทางเข้าอย่างละเอียด", "Read the entrance notes carefully"),
            time: -11,
            energy: -6,
            clues: ["statue_landmark"],
            log: L("在銅像前讀完入口說明", "อ่านป้ายครบที่รูปปั้น", "Finished entrance notes at the statue")
          },
          {
            id: "statue_quick",
            label: L("先記錄觀察，保留體力", "จดสังเกตก่อน เก็บแรง", "Note a quick observation, save energy"),
            time: -6,
            energy: -3,
            clues: ["statue_landmark"],
            log: L("快速記錄銅像觀察", "จดสังเกตรูปปั้นแบบสั้น", "Quick statue observation")
          },
          {
            id: "statue_photo",
            label: L("【攝影】觀察銅像細節與遊客動線", "【ถ่ายภาพ】สังเกตรายละเอียดและเส้นทางคน", "【Photo】Study statue details and visitor paths"),
            roleOnly: "photo",
            time: -10,
            energy: -6,
            clues: ["statue_landmark", "statue_photo"],
            needItemBonus: { item: "camera", clues: ["statue_photo"] },
            log: L("以攝影視角觀察銅像", "สังเกตรูปปั้นด้วยมุมถ่ายภาพ", "Observed the statue as a photographer")
          }
        ]
      },
      cave: {
        scene: L(
          "山坡遺跡前光線偏暗。園區導覽稱此為土牢／土洞。你只能從外側理解，不杜撰對話。",
          "ซากบนเนินแสงน้อย นำชมเรียกคุกดิน/โพรง คุณดูจากภายนอก ไม่แต่งบทสนทนา",
          "Light is low by the hillside remnant. Guides call it an earth prison/cave. You observe from outside; no invented dialogue."
        ),
        fiction: true,
        choices: [
          {
            id: "cave_study",
            label: L("對照導覽與據點說明（較完整）", "เทียบนำชมกับหน้าจุด", "Compare guide notes with the spot page"),
            time: -12,
            energy: -7,
            clues: ["cave_guide", "cave_caution"],
            log: L("在土洞前對照導覽說明", "เทียบคำอธิบายที่คุกดิน", "Compared guide notes at the cave")
          },
          {
            id: "cave_brief",
            label: L("記下位置與注意事項後離開", "จดตำแหน่งกับข้อควรระวังแล้วไป", "Note location and cautions, then leave"),
            time: -6,
            energy: -4,
            clues: ["cave_caution"],
            log: L("簡記土洞位置與安全提醒", "จดตำแหน่งคุกดินแบบสั้น", "Brief cave location note")
          },
          {
            id: "cave_rest",
            label: L("在陰涼處短休（恢復體力）", "พักสั้นในที่ร่ม", "Short rest in the shade"),
            time: -10,
            energy: 12,
            waterBonus: 8,
            log: L("在土洞附近短休", "พักใกล้คุกดิน", "Rested near the cave")
          }
        ]
      },
      bomb: {
        scene: L(
          "展示區可見炸彈殘骸。說明指向1982年前後的軍事行動相關記憶。請勿攀爬展品——這是遊戲中的參訪提醒。",
          "มีซากระเบิดจัดแสดง โยงความจำปฏิบัติการราว 1982 ห้ามปีน—เป็นคำเตือนในเกม",
          "A bomb remnant is on display, linked in notes to fighting around 1982. Do not climb exhibits—a visit reminder in the game."
        ),
        fiction: true,
        choices: [
          {
            id: "bomb_full",
            label: L("完整閱讀展示說明", "อ่านป้ายจัดแสดงทั้งหมด", "Read the full display notes"),
            time: -11,
            energy: -7,
            clues: ["bomb_1982", "bomb_press"],
            log: L("讀完炸彈殘骸展示說明", "อ่านป้ายซากระเบิดครบ", "Read full bomb-display notes")
          },
          {
            id: "bomb_short",
            label: L("記下年份相關重點後前進", "จดประเด็นปีแล้วไปต่อ", "Note the year-related points and move on"),
            time: -6,
            energy: -4,
            clues: ["bomb_1982"],
            log: L("摘錄炸彈殘骸年份重點", "จดประเด็นปีซากระเบิด", "Noted year points at the remnant")
          },
          {
            id: "bomb_compare",
            label: L("【文化旅人】對照報刊用語與園區說明", "【วัฒนธรรม】เทียบภาษารายงานกับป้ายสวน", "【Culture】Compare press wording with park notes"),
            roleOnly: "culture",
            time: -11,
            energy: -6,
            clues: ["bomb_1982", "bomb_press"],
            flags: { comparedSources: true },
            log: L("比較炸彈殘骸的多方表述", "เปรียบบรรยายหลายทางที่ซากระเบิด", "Compared multiple accounts at the remnant")
          }
        ]
      },
      hall: {
        scene: L(
          "史料展示室陳列展板與老照片。原始用途仍待館方確認。請把展板內容與網站歷史頁分開看待。",
          "ห้องเอกสารมีแผ่นและภาพเก่า การใช้เดิมรอยืนยัน แยกเนื้อแผ่นกับหน้าประวัติบนเว็บ",
          "Boards and photos are on show. Original room use is pending. Keep board text and the site history page distinct."
        ),
        fiction: true,
        choices: [
          {
            id: "hall_read",
            label: L("慢慢讀展板（較完整）", "อ่านแผ่นช้า ๆ", "Read the boards slowly"),
            time: -12,
            energy: -7,
            clues: ["hall_pending", "hall_compare"],
            log: L("在展示室細讀展板", "อ่านแผ่นในห้องเอกสาร", "Read boards in the display room")
          },
          {
            id: "hall_skim",
            label: L("先記下「用途待確認」標示", "จดป้ายรอยืนยันก่อน", "Note the “use pending” label first"),
            time: -6,
            energy: -4,
            clues: ["hall_pending"],
            log: L("記錄展示室待確認標示", "จดป้ายรอยืนยันห้องเอกสาร", "Noted pending label in the room")
          },
          {
            id: "hall_student",
            label: L("【學生】整理展板要點成筆記", "【นักเรียน】จัดประเด็นแผ่นเป็นบันทึก", "【Student】Organise board points into notes"),
            roleOnly: "student",
            time: -10,
            energy: -5,
            notebookBonus: true,
            clues: ["hall_pending", "hall_compare", "note_organise"],
            log: L("學生角色整理展示室筆記", "จัดบันทึกห้องเอกสารในบทนักเรียน", "Organised display-room notes as a student")
          },
          {
            id: "hall_culture",
            label: L("【文化旅人】對照資料來源頁", "【วัฒนธรรม】เทียบหน้าแหล่งข้อมูล", "【Culture】Cross-check the sources page"),
            roleOnly: "culture",
            time: -11,
            energy: -6,
            clues: ["hall_pending", "hall_compare"],
            flags: { comparedSources: true },
            log: L("在展示室對照資料來源", "เทียบแหล่งข้อมูลในห้องเอกสาร", "Cross-checked sources in the display room")
          }
        ]
      },
      mural: {
        scene: L(
          "入口牆面的浮雕與大字提醒族群與武裝記憶的複雜交織。你可用觀察或簡記結束今日主要路線。",
          "นูนต่ำและตัวอักษรบนกำแพงเตือนความซับซ้อนของชาติพันธุ์กับกำลังติดอาวุธ",
          "Reliefs and lettering on the wall recall how ethnicity and armed memory intertwine."
        ),
        fiction: true,
        choices: [
          {
            id: "mural_study",
            label: L("對照據點頁閱讀圖像說明", "อ่านคำอธิบายภาพเทียบหน้าจุด", "Read imagery notes with the spot page"),
            time: -10,
            energy: -6,
            clues: ["mural_symbols"],
            log: L("閱讀壁畫圖像說明", "อ่านคำอธิบายภาพจิตรกรรม", "Read mural imagery notes")
          },
          {
            id: "mural_quick",
            label: L("拍照構圖後簡記離開", "จัดเฟรมถ่ายแล้วจดสั้น", "Frame a photo note and leave"),
            time: -5,
            energy: -3,
            clues: ["mural_symbols"],
            log: L("簡記壁畫觀察", "จดสังเกตภาพจิตรกรรมสั้น", "Brief mural note")
          },
          {
            id: "mural_photo",
            label: L("【攝影】分區觀察服飾與旗幟細節", "【ถ่ายภาพ】สังเกตเครื่องแต่งกับธงเป็นส่วน", "【Photo】Study dress and flag details by zone"),
            roleOnly: "photo",
            time: -12,
            energy: -7,
            clues: ["mural_symbols", "statue_photo"],
            needItemBonus: { item: "camera", clues: ["statue_photo"] },
            log: L("分區觀察壁畫細節", "สังเกตรายละเอียดภาพจิตรกรรม", "Observed mural details by zone")
          }
        ]
      }
    },

    randomEvents: [
      {
        id: "rnd_notes",
        title: L("整理筆記", "จัดบันทึก", "Organise notes"),
        scene: L(
          "【遊戲事件】你找個角落整理剛才抄下的重點，不是新的歷史發現。",
          "【เหตุการณ์เกม】คุณจัดประเด็นที่จดไว้ ไม่ใช่ค้นพบประวัติใหม่",
          "[Game event] You tidy notes you already took—not a new historical find."
        ),
        choices: [
          {
            id: "rnd_notes_do",
            label: L("花時間整理（可能多得線索）", "ใช้เวลาจัด (อาจได้เบาะแสเพิ่ม)", "Spend time organising (may gain a clue)"),
            time: -7,
            energy: -3,
            clues: ["note_organise"],
            notebookBonus: true,
            log: L("旅途中整理筆記", "จัดบันทึกระหว่างทาง", "Organised notes on the way")
          },
          {
            id: "rnd_notes_skip",
            label: L("稍後再整理，繼續前進", "ค่อยจัดทีหลัง ไปต่อ", "Organise later; keep moving"),
            time: -3,
            energy: -2,
            log: L("略過筆記整理", "ข้ามการจัดบันทึก", "Skipped organising notes")
          }
        ]
      },
      {
        id: "rnd_rest",
        title: L("需要休息", "ต้องการพัก", "Need a rest"),
        scene: L(
          "【遊戲事件】天氣偏熱，你考慮是否短休。休息會恢復體力，但消耗時間。",
          "【เหตุการณ์เกม】อากาศร้อน กำลังคิดจะพักสั้น พักฟื้นแรงแต่ใช้เวลา",
          "[Game event] It feels hot. Resting restores energy but costs time."
        ),
        choices: [
          {
            id: "rnd_rest_yes",
            label: L("短休補充體力", "พักสั้นเติมพลัง", "Rest briefly to recover energy"),
            time: -9,
            energy: 14,
            waterBonus: 8,
            log: L("旅途短休", "พักสั้นระหว่างทาง", "Took a short rest")
          },
          {
            id: "rnd_rest_no",
            label: L("堅持前進", "เดินต่อ", "Keep going"),
            time: -3,
            energy: -6,
            log: L("忍著熱繼續走", "ฝืนร้อนเดินต่อ", "Pushed on despite the heat")
          }
        ]
      },
      {
        id: "rnd_replan",
        title: L("重新規劃路線", "วางเส้นทางใหม่", "Replan the route"),
        scene: L(
          "【遊戲事件】你對照建議參觀順序，確認下一站，避免走回頭路。",
          "【เหตุการณ์เกม】คุณเทียบลำดับแนะนำ เพื่อไม่ย้อนทาง",
          "[Game event] You check the suggested visit order to avoid backtracking."
        ),
        choices: [
          {
            id: "rnd_replan_map",
            label: L("用園區地圖核對（若有地圖更省）", "ใช้แผนที่สวนตรวจ (มีแผนที่ประหยัดกว่า)", "Check with the park map"),
            time: -6,
            energy: -3,
            clues: ["route_plan"],
            mapExtraSave: true,
            log: L("用地圖重規劃路線", "ใช้แผนที่วางเส้นทางใหม่", "Replanned with the map")
          },
          {
            id: "rnd_replan_memory",
            label: L("憑記憶往下走", "เดินตามความจำ", "Continue from memory"),
            time: -4,
            energy: -5,
            log: L("憑記憶繼續路線", "เดินต่อตามความจำ", "Continued from memory")
          }
        ]
      },
      {
        id: "rnd_shade",
        title: L("尋找陰涼", "หาที่ร่ม", "Find shade"),
        scene: L(
          "【遊戲事件】陽光很強，你在屋簷下站一會兒，想想剛才看過的說明。",
          "【เหตุการณ์เกม】แดดแรง คุณยืนใต้ชายคาคิดทบทวนป้ายที่อ่าน",
          "[Game event] The sun is strong. You pause under an eave and recall the notes you read."
        ),
        choices: [
          {
            id: "rnd_shade_think",
            label: L("複習已得線索", "ทบทวนเบาะแสที่มี", "Review clues you already have"),
            time: -8,
            energy: 4,
            waterBonus: 8,
            log: L("在陰涼處複習線索", "ทบทวนเบาะแสในที่ร่ม", "Reviewed clues in the shade")
          },
          {
            id: "rnd_shade_go",
            label: L("很快繼續行程", "ไปต่อเร็ว ๆ", "Move on quickly"),
            time: -3,
            energy: -3,
            log: L("略作停頓後繼續", "หยุดสั้นแล้วไปต่อ", "Paused briefly, then continued")
          }
        ]
      },
      {
        id: "rnd_write",
        title: L("補寫觀察", "เขียนสังเกตเพิ่ม", "Add an observation"),
        scene: L(
          "【遊戲事件】你擔心回家後忘了細節，想補寫幾句觀察——仍是虛構旅程紀錄。",
          "【เหตุการณ์เกม】กลัวลืมรายละเอียด จึงเขียนสังเกตเพิ่ม—ยังเป็นบันทึกสมมติ",
          "[Game event] You fear forgetting details and add a few observation lines—still a fictional travel log."
        ),
        choices: [
          {
            id: "rnd_write_yes",
            label: L("補寫觀察筆記", "เขียนบันทึกสังเกต", "Write the observation note"),
            time: -9,
            energy: -5,
            clues: ["note_organise"],
            notebookBonus: true,
            log: L("補寫旅途觀察", "เขียนสังเกตเพิ่ม", "Added an observation note")
          },
          {
            id: "rnd_write_no",
            label: L("相信自己記得", "เชื่อว่าจำได้", "Trust your memory"),
            time: -2,
            energy: -1,
            log: L("未補寫觀察", "ไม่ได้เขียนสังเกตเพิ่ม", "Did not add an observation")
          }
        ]
      },
      {
        id: "rnd_pace",
        title: L("調整步調", "ปรับจังหวะ", "Adjust the pace"),
        scene: L(
          "【遊戲事件】時間與體力都在消耗。你決定是否放慢，以免後面無法走完。",
          "【เหตุการณ์เกม】เวลาและแรงลดลง ตัดสินใจจะช้าลงหรือไม่",
          "[Game event] Time and energy are ticking down. You decide whether to slow your pace."
        ),
        choices: [
          {
            id: "rnd_pace_slow",
            label: L("放慢步調，節省體力", "เดินช้า เก็บแรง", "Slow down to save energy"),
            time: -8,
            energy: 6,
            log: L("放慢參觀步調", "เดินชมช้าลง", "Slowed the visit pace")
          },
          {
            id: "rnd_pace_fast",
            label: L("加快腳步趕下一站", "เร่งไปจุดถัดไป", "Hurry to the next stop"),
            time: -5,
            energy: -10,
            log: L("加快趕往下一站", "เร่งไปจุดต่อไป", "Hurried toward the next stop")
          }
        ]
      }
    ],

    endings: [
      {
        id: "first",
        name: L("初訪者", "ผู้มาครั้งแรก", "First-time visitor"),
        why: L(
          "本次走完部分主要地點，或線索仍有限。適合作為下次再訪的起點。",
          "ครั้งนี้ชมบางจุดหลัก หรือเบาะแสยังน้อย เหมาะเป็นจุดเริ่มเยี่ยมครั้งหน้า",
          "You covered part of the main path or gathered limited clues—a start for a later visit."
        ),
        links: [
          { href: "visit.html#route", label: L("建議參觀路線", "เส้นทางแนะนำ", "Suggested route") },
          { href: "guide.html", label: L("數位導覽", "นำชมดิจิทัล", "Digital guide") }
        ]
      },
      {
        id: "recorder",
        name: L("地方記憶記錄者", "ผู้บันทึกความทรงจำท้องถิ่น", "Local memory recorder"),
        why: L(
          "你完成五處主要可參觀地點，並整理足夠線索，形成較完整的參訪筆記。",
          "คุณครบห้าจุดหลักที่เข้าชมได้ และมีเบาะแสพอสำหรับบันทึกการเยี่ยม",
          "You finished the five main open stops and gathered enough clues for a solid visit notebook."
        ),
        links: [
          { href: "index.html#explore", label: L("園區據點", "จุดในพื้นที่", "Park stops") },
          { href: "archive.html", label: L("影像館", "คลังภาพ", "Archive") }
        ]
      },
      {
        id: "multi",
        name: L("多方史料探索者", "ผู้สำรวจหลายแหล่ง", "Multi-source explorer"),
        why: L(
          "你主動比較不同來源的表述（例如園區說明與報刊用語／資料來源頁），並留下對照筆記。",
          "คุณเปรียบบรรยายต่างแหล่ง (เช่น ป้ายสวนกับภาษารายงาน/หน้าแหล่ง) และจดเทียบไว้",
          "You compared differing accounts (park notes vs press wording / sources page) and kept contrast notes."
        ),
        links: [
          { href: "sources.html", label: L("資料來源", "แหล่งข้อมูล", "Sources") },
          { href: "about.html", label: L("歷史沿革", "ประวัติ", "History") }
        ]
      }
    ],

    ui: {
      title: L("滿星疊・記憶之路", "เส้นทางความทรงจำบ้านเทอดไทย", "Ban Thoed Thai · Road of Memory"),
      kicker: L("互動遊戲", "เกมเชิงโต้ตอบ", "Interactive game"),
      intro: L(
        "扮演當代虛構旅人，在有限時間與體力下探索紀念館可參觀據點，蒐集地方記憶線索。歷史內容只引用本站既有資料；遊戲情境均標示為虛構。",
        "เล่นเป็นนักเดินทางสมมติ สำรวจจุดที่เข้าชมได้ด้วยเวลาและแรงจำกัด เก็บเบาะแส เนื้อประวัติอ้างเฉพาะที่มีบนเว็บ เหตุการณ์เกมติดป้ายสมมติ",
        "Play a fictional present-day traveler exploring open stops with limited time and energy. History lines cite this site only; game scenes are marked fiction."
      ),
      timeEst: L("預估遊玩約 8–15 分鐘", "ใช้เวลาประมาณ 8–15 นาที", "About 8–15 minutes"),
      start: L("開始記憶之旅", "เริ่มเส้นทางความทรงจำ", "Begin the memory journey"),
      continue: L("繼續上次旅程", "เล่นต่อครั้งก่อน", "Continue saved journey"),
      restart: L("重新開始", "เริ่มใหม่", "Start over"),
      restartConfirm: L("確定重新開始？只會清除本遊戲進度。", "เริ่มใหม่? จะลบความคืบหน้าเกมนี้เท่านั้น", "Restart? This clears only this game’s save."),
      chooseRole: L("選擇旅人角色", "เลือกบทบาท", "Choose a traveler"),
      choosePack: L("整理行囊（選兩件）", "จัดสัมภาระ (เลือก 2)", "Pack two items"),
      packHint: L("已選 0/2", "เลือกแล้ว 0/2", "Selected 0/2"),
      confirmPack: L("出發", "ออกเดินทาง", "Set out"),
      mapTitle: L("旅程地圖", "แผนที่การเดินทาง", "Journey map"),
      youAreHere: L("目前位置", "ตำแหน่งปัจจุบัน", "You are here"),
      done: L("已完成", "เสร็จแล้ว", "Done"),
      locked: L("尚未解鎖", "ยังไม่ปลดล็อก", "Locked"),
      available: L("可前往", "ไปได้", "Open"),
      go: L("前往此地", "ไปที่นี่", "Go here"),
      notebook: L("旅人筆記", "สมุดนักเดินทาง", "Traveler’s notebook"),
      closeNote: L("關閉筆記", "ปิดสมุด", "Close notebook"),
      endTrip: L("結束旅程並查看結局", "จบการเดินทางและดูตอนจบ", "End journey & see ending"),
      earlyEnd: L("資源不足，旅程提早結束", "ทรัพยากรไม่พอ จบก่อนกำหนด", "Resources low — journey ends early"),
      review: L("旅程回顧", "ทบทวนการเดินทาง", "Journey review"),
      next: L("下一步", "ขั้นถัดไป", "Next"),
      backMap: L("回到地圖", "กลับแผนที่", "Back to map"),
      fictionTag: L("虛構遊戲情境", "สถานการณ์เกมสมมติ", "Fictional game scene"),
      historyTag: L("本站既有史料摘要", "สรุปหลักฐานที่มีบนเว็บ", "Summary from site sources"),
      time: L("時間", "เวลา", "Time"),
      energy: L("體力", "พลัง", "Energy"),
      clues: L("線索", "เบาะแส", "Clues"),
      feedback: L("選擇結果", "ผลของตัวเลือก", "Outcome"),
      endingTitle: L("旅程結局", "ตอนจบการเดินทาง", "Journey ending"),
      again: L("再次出發", "ออกเดินทางอีกครั้ง", "Travel again"),
      home: L("返回紀念館", "กลับพิพิธภัณฑ์", "Back to memorial"),
      visited: L("去過的地點", "จุดที่ไปแล้ว", "Places visited"),
      keyChoices: L("重要選擇", "ตัวเลือกสำคัญ", "Key choices"),
      clueList: L("取得的線索", "เบาะแสที่ได้", "Clues gathered"),
      whyEnding: L("達成原因", "เหตุที่ได้ตอนจบนี้", "Why this ending"),
      gate: L("園區入口", "ทางเข้าสวน", "Park gate"),
      pickTwo: L("請選擇正好兩件物品", "เลือกให้ครบ 2 ชิ้น", "Please select exactly two items"),
      busy: L("處理中…", "กำลังดำเนินการ…", "Working…"),
      resourceNote: L("時間與體力為遊戲抽象資源（初始各120），不代表真實參觀時數或身體狀況。", "เวลาและพลังเป็นทรัพยากรในเกม (เริ่มอย่างละ 120) ไม่ใช่ชั่วโมงจริงหรือร่างกาย", "Time and energy are abstract game resources (start at 120 each), not real visit hours or health."),
      skip: L("跳過", "ข้าม", "Skip"),
      interact: L("查看", "ดู", "Inspect"),
      walkHint: L("點擊地面移動；靠近標記後點擊互動", "แตะพื้นเพื่อเดิน ใกล้ป้ายแล้วแตะเพื่อโต้ตอบ", "Tap the ground to walk; tap a marker to interact"),
      mapBtn: L("地圖", "แผนที่", "Map"),
      packBtn: L("行囊", "สัมภาระ", "Pack"),
      audioOn: L("音效：開", "เสียง: เปิด", "Sound: on"),
      audioOff: L("音效：關", "เสียง: ปิด", "Sound: off"),
      sceneLabel: L("示意場景", "ฉากจำลอง", "Illustrated scene"),
      loading: L("載入旅程…", "กำลังโหลด…", "Loading journey…"),
      retry: L("重試", "ลองใหม่", "Retry"),
      arrive: L("抵達", "ถึงแล้ว", "Arrived"),
      approach: L("走近查看", "เดินเข้าไปดู", "Walk closer"),
      openEvent: L("開始探索", "เริ่มสำรวจ", "Begin exploring"),
      cinematicSkip: L("跳過開場", "ข้ามบทเปิด", "Skip intro"),
      lowEnergy: L("體力偏低", "แรงน้อย", "Energy low"),
      travelTo: L("前往", "ไปยัง", "Travel to")
    },

    /** 2D adventure scene layouts (illustrated; not historical photos). */
    scenes: {
      gate: {
        width: 2400,
        groundY: 78,
        walkMin: 100,
        walkMax: 2200,
        spawnX: 280,
        obstacles: [{ x1: 980, x2: 1180 }],
        hotspots: [
          { id: "gate_sign", x: 720, kind: "flavor", label: L("入口說明", "ป้ายทางเข้า", "Entrance sign") },
          { id: "to_statue", x: 1950, kind: "travel", target: "statue", label: L("通往銅像", "ไปรูปปั้น", "To the statue") }
        ],
        palette: { sky: "#c9d6c4", far: "#8fa392", mid: "#6d8570", ground: "#cbb892", accent: "#a77a44" }
      },
      statue: {
        width: 2200,
        groundY: 78,
        walkMin: 120,
        walkMax: 2000,
        spawnX: 260,
        obstacles: [{ x1: 1040, x2: 1160 }],
        hotspots: [
          { id: "main", x: 980, kind: "event", eventId: "statue", label: L("青銅雕像", "รูปปั้นทองสัมฤทธิ์", "Bronze statue") }
        ],
        palette: { sky: "#d5dece", far: "#93a894", mid: "#738977", ground: "#d0bc93", accent: "#8b6914" }
      },
      cave: {
        width: 2100,
        groundY: 80,
        walkMin: 140,
        walkMax: 1900,
        spawnX: 240,
        obstacles: [{ x1: 860, x2: 1180 }],
        hotspots: [
          { id: "main", x: 1020, kind: "event", eventId: "cave", label: L("土洞（土牢）", "โพรงดิน", "Earth cave") }
        ],
        palette: { sky: "#b7c2b4", far: "#6f7f72", mid: "#55665a", ground: "#b5a588", accent: "#5c4a32" }
      },
      bomb: {
        width: 2100,
        groundY: 78,
        walkMin: 120,
        walkMax: 1900,
        spawnX: 240,
        obstacles: [{ x1: 900, x2: 1200 }],
        hotspots: [
          { id: "main", x: 1050, kind: "event", eventId: "bomb", label: L("炸彈殘骸", "ซากระเบิด", "Bomb remnant") }
        ],
        palette: { sky: "#cfd6c8", far: "#879687", mid: "#6a7a6c", ground: "#c4b08a", accent: "#7a5c38" }
      },
      hall: {
        width: 2000,
        groundY: 82,
        walkMin: 160,
        walkMax: 1800,
        spawnX: 280,
        obstacles: [{ x1: 720, x2: 980 }, { x1: 1200, x2: 1480 }],
        hotspots: [
          { id: "main", x: 1080, kind: "event", eventId: "hall", label: L("史料展示室", "ห้องเอกสาร", "Display room") }
        ],
        palette: { sky: "#e8e0d0", far: "#d2c4a8", mid: "#b9a888", ground: "#d9c9a8", accent: "#a77a44", indoor: true }
      },
      mural: {
        width: 2200,
        groundY: 78,
        walkMin: 120,
        walkMax: 2000,
        spawnX: 260,
        obstacles: [{ x1: 700, x2: 1600 }],
        hotspots: [
          { id: "main", x: 1150, kind: "event", eventId: "mural", label: L("牆壁上的壁畫", "ภาพจิตรกรรม", "Wall mural") }
        ],
        palette: { sky: "#d8e0d2", far: "#90a090", mid: "#6f8672", ground: "#cdb892", accent: "#31463a" }
      }
    }
  };
})();

