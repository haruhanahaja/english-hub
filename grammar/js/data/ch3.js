window.CURRICULUM.push({
  id: "c3", emoji: "🎨", title: "표현 넓히기", sub: "문장에 색깔과 뉘앙스 입히기",
  units: [
    {
      id: "u09", title: "조동사", sub: "can / must / should / may",
      cards: [
        {
          h: "동사를 돕는 조동사",
          b: "조동사는 동사에 **가능, 의무, 충고** 같은 뜻을 더해요.\n규칙은 딱 두 개: **뒤에는 동사원형**, **주어가 바뀌어도 모양 그대로**.",
          ex: [["She {can} swim.", "그녀는 수영할 수 있다. (cans ✕)"], ["{May} I come in?", "들어가도 될까요?"]]
        },
        {
          h: "must · have to · should",
          b: "**must / have to** = ~해야 한다 (의무)\n**should** = ~하는 게 좋다 (충고)",
          ex: [["You {must} stop at a red light.", "빨간불에는 멈춰야 한다."], ["You {should} see a doctor.", "병원에 가 보는 게 좋겠어."]],
          tip: "must not = ~하면 안 된다(금지) / don't have to = ~할 필요 없다. 뜻이 완전히 달라요!"
        },
        {
          h: "정중하게 부탁하기",
          b: "can보다 **could**, will보다 **would**가 더 공손해요.",
          ex: [["{Could} you help me?", "도와주시겠어요?"], ["{Would} you like some tea?", "차 좀 드시겠어요?"], ["{May} I ask a question?", "질문해도 될까요?"]]
        }
      ],
      qs: [
        { t: "mcq", q: "She can ___ three languages.", o: ["speak", "speaks", "speaking", "to speak"], ko: "그녀는 3개 국어를 할 수 있다.", ex: "조동사 뒤에는 항상 동사원형" },
        { t: "mcq", q: "You ___ wear a seat belt. It's the law.", o: ["must", "may", "can't", "don't have to"], ko: "안전벨트를 매야 합니다. 법이에요.", ex: "법으로 정해진 강한 의무 → must" },
        { t: "mcq", q: "You look tired. You ___ get some rest.", o: ["should", "shouldn't", "must not", "can't"], ko: "피곤해 보여. 좀 쉬는 게 좋겠어.", ex: "부드러운 충고 → should" },
        { t: "mcq", q: "Tomorrow is Sunday. You ___ get up early.", o: ["don't have to", "must", "has to", "must not"], ko: "내일은 일요일이야. 일찍 일어날 필요 없어.", ex: "don't have to = ~할 필요가 없다" },
        { t: "mcq", q: "You ___ park here. It's a fire lane.", o: ["must not", "don't have to", "should", "may"], ko: "여기 주차하면 안 됩니다. 소방 도로예요.", ex: "must not = ~하면 안 된다 (금지)" },
        { t: "mcq", q: "___ I use your pen?", o: ["May", "Am", "Does", "Have"], ko: "네 펜 좀 써도 될까?", ex: "허락을 구할 때: May I ~? / Can I ~?" },
        { t: "ox", q: "He can swim very well.", a: true, ko: "그는 수영을 아주 잘한다.", ex: "조동사에는 -s를 붙이지 않아요." },
        { t: "fix", q: "She has to goes now.", w: "goes", r: "go", ko: "그녀는 지금 가야 한다.", ex: "have to / has to 뒤에는 동사원형" },
        { t: "type", q: "You should ___ (be) more careful.", a: ["be"], ko: "너는 더 조심해야 해.", ex: "should + 동사원형. be동사의 원형은 be" },
        { t: "order", ko: "창문 좀 열어 주시겠어요?", a: "Could you open the window", end: "?", x: ["opens"], ex: "Could you + 동사원형 ~? 정중한 부탁" }
      ]
    },
    {
      id: "u10", title: "형용사와 부사", sub: "꾸며 주는 말",
      cards: [
        {
          h: "형용사는 명사를, 부사는 동사를",
          b: "**형용사**: 명사를 꾸미거나 주어를 설명\n**부사**: 동사, 형용사, 문장 전체를 꾸밈",
          ex: [["She is a {careful} driver.", "그녀는 조심스러운 운전자다. (형용사)"], ["She drives {carefully}.", "그녀는 조심스럽게 운전한다. (부사)"]]
        },
        {
          h: "부사 만들기",
          b: "보통 **형용사 + -ly**. 하지만 예외가 있어요.",
          rows: [["slow → slowly", "happy → happily"], ["good → well", "fast → fast"], ["hard → hard (열심히)", "late → late (늦게)"]],
          tip: "hardly는 '거의 ~않다', lately는 '최근에'. 전혀 다른 뜻이에요!"
        },
        {
          h: "감각동사 뒤에는 형용사",
          b: "**look, sound, smell, taste, feel** 뒤에는 부사가 아니라 **형용사**가 와요.",
          ex: [["You look {happy}.", "너 행복해 보여. (happily ✕)"], ["It smells {good}.", "냄새가 좋다. (well ✕)"], ["That sounds {great}!", "그거 좋은데!"]]
        }
      ],
      qs: [
        { t: "mcq", q: "He drives very ___.", o: ["carefully", "careful", "care", "more careful"], ko: "그는 아주 조심스럽게 운전한다.", ex: "동사 drives를 꾸미므로 부사 carefully" },
        { t: "mcq", q: "She is a ___ singer.", o: ["good", "well", "goodly", "nicely"], ko: "그녀는 노래를 잘하는 가수다.", ex: "명사 singer를 꾸미므로 형용사 good" },
        { t: "mcq", q: "He speaks English very ___.", o: ["well", "good", "goodly", "nice"], ko: "그는 영어를 아주 잘한다.", ex: "동사 speaks를 꾸미는 부사. good의 부사는 well" },
        { t: "mcq", q: "This soup tastes ___.", o: ["great", "greatly", "nicely", "badly"], ko: "이 수프는 맛이 훌륭하다.", ex: "감각동사 taste 뒤에는 형용사" },
        { t: "mcq", q: "He worked ___ to pass the exam.", o: ["hard", "hardly", "hardy", "hardness"], ko: "그는 시험에 합격하려고 열심히 공부했다.", ex: "'열심히'는 hard. hardly는 '거의 ~않다'" },
        { t: "mcq", q: "You look ___ today. What happened?", o: ["sad", "sadly", "sadness", "sadden"], ko: "너 오늘 슬퍼 보여. 무슨 일 있었어?", ex: "look + 형용사 = ~해 보이다" },
        { t: "ox", q: "She runs fastly.", a: false, fix: "She runs fast.", ko: "그녀는 빨리 달린다.", ex: "fast는 형용사와 부사의 모양이 같아요. fastly라는 단어는 없어요." },
        { t: "fix", q: "The children played happy in the garden.", w: "happy", r: "happily", ko: "아이들은 정원에서 행복하게 놀았다.", ex: "동사 played를 꾸미므로 부사 happily" },
        { t: "type", q: "Please speak ___ (quiet) in the library.", a: ["quietly"], ko: "도서관에서는 조용히 말해 주세요.", ex: "동사 speak를 꾸미는 부사 → quietly" },
        { t: "order", ko: "그 영화는 정말 재미있었다.", a: "The movie was really interesting", x: ["real"], ex: "부사 really가 형용사 interesting을 꾸며요." }
      ]
    },
    {
      id: "u11", title: "비교급과 최상급", sub: "-er / -est / more / most",
      cards: [
        {
          h: "비교급: 더 ~한",
          b: "짧은 단어는 **-er**, 긴 단어는 **more ~**. 비교 대상 앞에는 **than**.",
          rows: [["tall", "taller"], ["big", "bigger"], ["easy", "easier"], ["beautiful", "more beautiful"]],
          ex: [["I am {taller than} my sister.", "나는 여동생보다 키가 크다."]]
        },
        {
          h: "최상급: 가장 ~한",
          b: "**the + -est** 또는 **the most ~**. 뒤에 in(장소) / of(무리)가 자주 와요.",
          ex: [["He is {the tallest} in my class.", "그는 우리 반에서 가장 키가 크다."], ["It is {the most popular} song of the year.", "그것은 올해 가장 인기 있는 노래다."]]
        },
        {
          h: "불규칙과 꿀팁",
          b: "모양이 완전히 바뀌는 단어들이 있어요.",
          rows: [["good / well", "better – best"], ["bad", "worse – worst"], ["many / much", "more – most"], ["little", "less – least"]],
          tip: "비교급 강조는 very가 아니라 much / a lot / even: much better ○, very better ✕"
        }
      ],
      qs: [
        { t: "mcq", q: "My bag is ___ than yours.", o: ["heavier", "heavy", "heaviest", "more heavy"], ko: "내 가방이 네 것보다 더 무겁다.", ex: "than이 있으면 비교급. heavy → heavier" },
        { t: "mcq", q: "This is the ___ building in the city.", o: ["tallest", "taller", "tall", "most tall"], ko: "이것은 그 도시에서 가장 높은 건물이다.", ex: "the + 최상급 + in 장소" },
        { t: "mcq", q: "This book is ___ interesting than that one.", o: ["more", "most", "much", "very"], ko: "이 책은 저 책보다 더 재미있다.", ex: "긴 형용사의 비교급은 more + 형용사" },
        { t: "mcq", q: "Today is ___ than yesterday.", o: ["worse", "bad", "badder", "worst"], ko: "오늘은 어제보다 더 나쁘다.", ex: "bad - worse - worst (불규칙)" },
        { t: "mcq", q: "He is as ___ as his father.", o: ["tall", "taller", "tallest", "more tall"], ko: "그는 아버지만큼 키가 크다.", ex: "as + 원급 + as = ~만큼 …한" },
        { t: "mcq", q: "Your idea is ___ better than mine.", o: ["much", "very", "more", "most"], ko: "네 아이디어가 내 것보다 훨씬 낫다.", ex: "비교급을 강조할 때는 much. very는 쓸 수 없어요." },
        { t: "ox", q: "She is more smarter than me.", a: false, fix: "She is smarter than me.", ko: "그녀는 나보다 똑똑하다.", ex: "-er과 more를 동시에 쓰면 안 돼요." },
        { t: "fix", q: "Mt. Everest is the higher mountain in the world.", w: "higher", r: "highest", ko: "에베레스트산은 세계에서 가장 높은 산이다.", ex: "the ~ in the world → 최상급 highest" },
        { t: "type", q: "This is the ___ (good) pizza in town.", a: ["best"], ko: "이것은 동네에서 최고의 피자다.", ex: "good - better - best" },
        { t: "order", ko: "건강은 돈보다 더 중요하다.", a: "Health is more important than money", x: ["most"], ex: "more + 형용사 + than" }
      ]
    },
    {
      id: "u12", title: "전치사", sub: "in / on / at 과 친구들",
      cards: [
        {
          h: "시간의 at · on · in",
          b: "작은 시간부터 큰 시간 순서로 기억하세요.",
          rows: [["at + 시각", "at 7, at noon, at night"], ["on + 요일 · 날짜", "on Monday, on May 5th"], ["in + 월 · 계절 · 연도", "in July, in summer, in 2024"]],
          tip: "in the morning / afternoon / evening, 하지만 at night!"
        },
        {
          h: "장소의 at · on · in",
          b: "**at** = 한 지점, **on** = 표면 위, **in** = 공간 안",
          ex: [["Let's meet {at} the bus stop.", "버스 정류장에서 만나자."], ["The clock is {on} the wall.", "시계는 벽에 걸려 있다."], ["She lives {in} Korea.", "그녀는 한국에 산다."]]
        },
        {
          h: "자주 쓰는 전치사",
          b: "작지만 뜻을 바꾸는 단어들이에요.",
          rows: [["by + 교통수단 / 기한", "by bus, by Friday"], ["until", "~까지 (계속)"], ["for + 기간(숫자)", "for two hours"], ["during + 명사", "during the vacation"]],
          ex: [["The cat is {next to} the sofa.", "고양이는 소파 옆에 있다."], ["He stood {in front of} me.", "그는 내 앞에 서 있었다."]]
        }
      ],
      qs: [
        { t: "mcq", q: "The class starts ___ 9 o'clock.", o: ["at", "on", "in", "for"], ko: "수업은 9시에 시작한다.", ex: "정확한 시각 앞에는 at" },
        { t: "mcq", q: "My birthday is ___ March.", o: ["in", "on", "at", "by"], ko: "내 생일은 3월이다.", ex: "월 앞에는 in" },
        { t: "mcq", q: "We have a meeting ___ Monday.", o: ["on", "in", "at", "to"], ko: "우리는 월요일에 회의가 있다.", ex: "요일 앞에는 on" },
        { t: "mcq", q: "There is a picture ___ the wall.", o: ["on", "in", "at", "to"], ko: "벽에 그림이 하나 걸려 있다.", ex: "표면에 붙어 있으면 on" },
        { t: "mcq", q: "I go to work ___ subway.", o: ["by", "on", "in", "with"], ko: "나는 지하철로 출근한다.", ex: "by + 교통수단 (관사 없이)" },
        { t: "mcq", q: "Please finish it ___ Friday.", o: ["by", "until", "in", "at"], ko: "금요일까지 끝내 주세요.", ex: "기한(늦어도 ~까지 완료)은 by. until은 그때까지 '계속'할 때 써요." },
        { t: "mcq", q: "I studied ___ three hours.", o: ["for", "during", "since", "at"], ko: "나는 세 시간 동안 공부했다.", ex: "숫자로 된 기간 앞에는 for" },
        { t: "ox", q: "I usually get up early at the morning.", a: false, fix: "I usually get up early in the morning.", ko: "나는 보통 아침에 일찍 일어난다.", ex: "in the morning이 한 덩어리예요." },
        { t: "fix", q: "She was born on 2010.", w: "on", r: "in", ko: "그녀는 2010년에 태어났다.", ex: "연도 앞에는 in" },
        { t: "order", ko: "은행은 우체국 옆에 있다.", a: "The bank is next to the post office", x: ["at"], ex: "next to = ~ 옆에" }
      ]
    }
  ]
});
