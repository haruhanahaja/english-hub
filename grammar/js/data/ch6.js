window.CURRICULUM.push({
  id: "c6", emoji: "🏔️", title: "정상 도전", sub: "디테일을 잡아 실력 완성하기",
  units: [
    {
      id: "u21", title: "수량 표현", sub: "many / much / few / little",
      cards: [
        {
          h: "many 와 much",
          b: "**many + 셀 수 있는 명사(복수)**\n**much + 셀 수 없는 명사**\n**a lot of**는 둘 다 가능!",
          ex: [["{many} books, {many} people", "많은 책, 많은 사람"], ["{much} water, {much} time", "많은 물, 많은 시간"], ["{a lot of} books / water", "많은 책 / 물"]]
        },
        {
          h: "a 하나의 차이",
          b: "a가 있으면 **조금 있다**(긍정), 없으면 **거의 없다**(부정).",
          rows: [["a few + 셀 수 있는", "조금 있는"], ["few + 셀 수 있는", "거의 없는"], ["a little + 셀 수 없는", "조금 있는"], ["little + 셀 수 없는", "거의 없는"]]
        },
        {
          h: "some 과 any",
          b: "**some**: 긍정문, 권유하는 의문문\n**any**: 부정문, 일반 의문문",
          ex: [["I have {some} questions.", "질문이 몇 개 있어요."], ["I don't have {any} money.", "나는 돈이 하나도 없다."], ["Would you like {some} tea?", "차 좀 드릴까요? (권유)"]],
          tip: "every / each 뒤에는 단수 명사 + 단수 동사: Every child needs love."
        }
      ],
      qs: [
        { t: "mcq", q: "How ___ water do you drink a day?", o: ["much", "many", "few", "a few"], ko: "하루에 물을 얼마나 마시니?", ex: "water는 셀 수 없는 명사 → much" },
        { t: "mcq", q: "There aren't ___ eggs in the fridge.", o: ["any", "some", "much", "a little"], ko: "냉장고에 달걀이 하나도 없다.", ex: "부정문에는 any" },
        { t: "mcq", q: "I have ___ friends in Busan, so I visit there often.", o: ["a few", "few", "a little", "much"], ko: "부산에 친구가 몇 명 있어서 자주 간다.", ex: "friends는 셀 수 있고, '몇 명 있다'(긍정) → a few" },
        { t: "mcq", q: "Hurry up! We have ___ time.", o: ["little", "few", "many", "a few"], ko: "서둘러! 시간이 거의 없어.", ex: "time은 셀 수 없고, '거의 없다' → little" },
        { t: "mcq", q: "Would you like ___ coffee?", o: ["some", "many", "few", "a few"], ko: "커피 좀 드시겠어요?", ex: "권유하는 의문문에는 some" },
        { t: "mcq", q: "Every student ___ a student ID card.", o: ["has", "have", "are having", "having"], ko: "모든 학생은 학생증을 가지고 있다.", ex: "Every + 단수 명사 → 단수 동사 has" },
        { t: "mcq", q: "She has ___ of books.", o: ["a lot", "many", "much", "few"], ko: "그녀는 책이 많다.", ex: "a lot of = 많은. of와 함께 쓰는 건 a lot뿐" },
        { t: "ox", q: "I don't have much money.", a: true, ko: "나는 돈이 많지 않다.", ex: "money는 셀 수 없는 명사 → much" },
        { t: "fix", q: "There is a few milk in the bottle.", w: "few", r: "little", ko: "병에 우유가 조금 있다.", ex: "milk는 셀 수 없는 명사 → a little" },
        { t: "order", ko: "나는 질문이 몇 개 있다.", a: "I have a few questions", x: ["little"], ex: "a few + 셀 수 있는 복수 명사" }
      ]
    },
    {
      id: "u22", title: "가정법 과거완료 · I wish", sub: "지나간 일을 아쉬워하기",
      cards: [
        {
          h: "과거를 되돌린다면",
          b: "**If + had p.p., would have p.p.**\n이미 지나간 **과거 사실과 반대**로 상상해요.",
          ex: [["If I {had left} earlier, I {would have caught} the bus.", "더 일찍 출발했다면 버스를 탔을 텐데. (실제로는 놓침)"]]
        },
        {
          h: "I wish ~ : ~라면 좋을 텐데",
          b: "**I wish + 과거형** → 지금에 대한 아쉬움\n**I wish + had p.p.** → 과거에 대한 아쉬움",
          ex: [["I wish I {had} a car.", "차가 있으면 좋을 텐데."], ["I wish I {had studied} harder.", "더 열심히 공부했더라면 좋았을 텐데."]]
        },
        {
          h: "조동사 + have p.p.",
          b: "과거 일에 대한 후회와 추측을 말해요.",
          rows: [["should have p.p.", "~했어야 했는데 (안 함)"], ["could have p.p.", "~할 수도 있었는데"], ["must have p.p.", "~했음이 틀림없다"]],
          ex: [["I {should have called} you.", "너에게 전화했어야 했는데."]]
        }
      ],
      qs: [
        { t: "mcq", q: "If I had studied harder, I ___ the exam.", o: ["would have passed", "would pass", "will pass", "passed"], ko: "더 열심히 공부했다면 시험에 합격했을 텐데.", ex: "If + had p.p. → would have p.p." },
        { t: "mcq", q: "If she ___ earlier, she wouldn't have missed the train.", o: ["had left", "left", "leaves", "has left"], ko: "그녀가 더 일찍 떠났다면 기차를 놓치지 않았을 텐데.", ex: "주절이 would have p.p. → if 절은 had p.p." },
        { t: "mcq", q: "I wish I ___ taller.", o: ["were", "am", "will be", "be"], ko: "키가 더 크면 좋을 텐데.", ex: "지금에 대한 아쉬움 → I wish + 과거형(were)" },
        { t: "mcq", q: "I wish I ___ that yesterday.", o: ["hadn't said", "don't say", "haven't said", "won't say"], ko: "어제 그 말을 하지 않았더라면 좋았을 텐데.", ex: "과거에 대한 아쉬움 → I wish + had p.p." },
        { t: "mcq", q: "You ___ have told me earlier! Now it's too late.", o: ["should", "must", "will", "can"], ko: "더 일찍 말해 줬어야지! 이제 너무 늦었어.", ex: "should have p.p. = ~했어야 했는데 (후회 · 원망)" },
        { t: "mcq", q: "The ground is wet. It ___ have rained last night.", o: ["must", "should", "can", "will"], ko: "땅이 젖어 있다. 어젯밤에 비가 온 게 틀림없다.", ex: "must have p.p. = ~했음이 틀림없다 (강한 추측)" },
        { t: "ox", q: "I wish I can speak English fluently.", a: false, fix: "I wish I could speak English fluently.", ko: "영어를 유창하게 할 수 있으면 좋을 텐데.", ex: "I wish 뒤에는 과거형. can → could" },
        { t: "fix", q: "If I had known, I would have help you.", w: "help", r: "helped", ko: "알았더라면 너를 도왔을 텐데.", ex: "would have + p.p. → helped" },
        { t: "type", q: "I should have ___ (bring) an umbrella.", a: ["brought"], ko: "우산을 가져왔어야 했는데.", ex: "bring - brought - brought" },
        { t: "order", ko: "네가 여기 있으면 좋을 텐데.", a: "I wish you were here", x: ["are"], ex: "I wish + 주어 + 과거형(were)" }
      ]
    },
    {
      id: "u23", title: "수 일치", sub: "주어와 동사 짝 맞추기",
      cards: [
        {
          h: "진짜 주어를 찾아라",
          b: "주어와 동사 사이에 낀 말에 속지 마세요. 동사는 **진짜 주어**에 맞춰요.",
          ex: [["The {boy} with two dogs {is} my cousin.", "개 두 마리를 데리고 있는 소년은 내 사촌이다."], ["The {books} on the desk {are} mine.", "책상 위의 책들은 내 것이다."]]
        },
        {
          h: "항상 단수인 것들",
          b: "뜻은 여럿 같아도 문법적으로는 **단수**예요.",
          rows: [["everyone, everybody, each", "Everyone is here."], ["동명사 주어", "Reading books is fun."], ["금액 · 시간 · 거리", "Ten dollars is enough."], ["news, math 등", "The news is good."]]
        },
        {
          h: "헷갈리는 짝꿍들",
          b: "통째로 기억하세요.",
          rows: [["There is / are", "뒤에 오는 명사에 맞춤"], ["both A and B", "항상 복수"], ["one of + 복수 명사", "단수 동사 (주어는 one)"], ["either A or B", "B에 맞춤"]],
          ex: [["One of my friends {lives} in Paris.", "내 친구 중 한 명은 파리에 산다."]]
        }
      ],
      qs: [
        { t: "mcq", q: "Everyone ___ ready to go.", o: ["is", "are", "be", "were"], ko: "모두 갈 준비가 되었다.", ex: "everyone은 단수 취급 → is" },
        { t: "mcq", q: "The books on the desk ___ mine.", o: ["are", "is", "be", "was"], ko: "책상 위의 책들은 내 것이다.", ex: "진짜 주어는 The books(복수). the desk에 속지 마세요!" },
        { t: "mcq", q: "One of my friends ___ in New York.", o: ["lives", "live", "living", "are living"], ko: "내 친구 중 한 명은 뉴욕에 산다.", ex: "주어는 One(한 명) → 단수 동사 lives" },
        { t: "mcq", q: "There ___ many people in the park.", o: ["are", "is", "be", "has"], ko: "공원에 사람이 많다.", ex: "There is / are는 뒤의 명사에 맞춰요. many people → are" },
        { t: "mcq", q: "Reading books ___ my favorite hobby.", o: ["is", "are", "be", "have"], ko: "책 읽기는 내가 가장 좋아하는 취미다.", ex: "동명사 주어(Reading books)는 단수 취급" },
        { t: "mcq", q: "Both Tom and his sister ___ tall.", o: ["are", "is", "be", "was"], ko: "톰과 그의 여동생은 둘 다 키가 크다.", ex: "both A and B는 항상 복수" },
        { t: "mcq", q: "Each of the students ___ a laptop.", o: ["has", "have", "are having", "having"], ko: "학생들 각자가 노트북을 가지고 있다.", ex: "each는 단수 취급 → has" },
        { t: "ox", q: "The news is surprising.", a: true, ko: "그 소식은 놀랍다.", ex: "news는 -s로 끝나지만 셀 수 없는 단수 명사예요." },
        { t: "fix", q: "My friend and I am in the same class.", w: "am", r: "are", ko: "내 친구와 나는 같은 반이다.", ex: "My friend and I = We(복수) → are" },
        { t: "type", q: "Ten dollars ___ (be) too expensive for a coffee.", a: ["is"], ko: "커피 한 잔에 10달러는 너무 비싸다.", ex: "금액은 하나의 덩어리로 보아 단수 취급" }
      ]
    },
    {
      id: "u24", title: "헷갈리는 문법 총정리", sub: "한국인이 자주 틀리는 포인트",
      cards: [
        {
          h: "시키는 동사 make / let / have",
          b: "**make / let / have + 사람 + 동사원형** (to 없이!)",
          ex: [["{Let} me {know}.", "나에게 알려 줘."], ["My mom {made} me {clean} my room.", "엄마가 내게 방 청소를 시키셨다."], ["I {heard} him {sing}.", "나는 그가 노래하는 것을 들었다. (지각동사도 같아요)"]]
        },
        {
          h: "used to vs be used to",
          b: "생김새는 비슷하지만 뜻은 전혀 달라요.",
          rows: [["used to + 동사원형", "(예전에) ~하곤 했다"], ["be used to + -ing", "~하는 데 익숙하다"]],
          ex: [["I {used to live} in Busan.", "나는 예전에 부산에 살았다."], ["I{'m used to living} alone.", "나는 혼자 사는 데 익숙하다."]]
        },
        {
          h: "전치사를 붙이면 틀리는 표현",
          b: "우리말로는 '~에 대해', '~와'가 붙지만 영어에서는 **전치사 없이** 써요.",
          rows: [["discuss about ✕", "discuss the plan"], ["marry with ✕", "marry him"], ["go to home ✕", "go home"], ["enter into ✕", "enter the room"]],
          tip: "부가의문문: 앞이 긍정이면 뒤는 부정! You like it, don't you?"
        }
      ],
      qs: [
        { t: "mcq", q: "Let me ___ your phone number.", o: ["know", "to know", "knowing", "knew"], ko: "네 전화번호를 알려 줘.", ex: "let + 사람 + 동사원형" },
        { t: "mcq", q: "My mom made me ___ my room.", o: ["clean", "to clean", "cleaning", "cleaned"], ko: "엄마가 내게 방을 청소하게 하셨다.", ex: "make + 사람 + 동사원형" },
        { t: "mcq", q: "I ___ play the piano when I was young.", o: ["used to", "am used to", "use to", "was used to"], ko: "나는 어렸을 때 피아노를 치곤 했다.", ex: "used to + 동사원형 = (예전에) ~하곤 했다" },
        { t: "mcq", q: "I'm used to ___ up early.", o: ["getting", "get", "got", "gets"], ko: "나는 일찍 일어나는 데 익숙하다.", ex: "be used to + -ing = ~에 익숙하다" },
        { t: "mcq", q: "You like pizza, ___ you?", o: ["don't", "do", "aren't", "doesn't"], ko: "너 피자 좋아하지, 그렇지?", ex: "일반동사 긍정문 → 부가의문문은 don't you?" },
        { t: "mcq", q: "She is a student, ___ she?", o: ["isn't", "is", "doesn't", "don't"], ko: "그녀는 학생이지, 그렇지?", ex: "be동사 긍정문 → 부가의문문은 isn't she?" },
        { t: "ox", q: "We discussed about the problem.", a: false, fix: "We discussed the problem.", ko: "우리는 그 문제에 대해 논의했다.", ex: "discuss는 about 없이 바로 목적어를 써요." },
        { t: "ox", q: "She married a doctor.", a: true, ko: "그녀는 의사와 결혼했다.", ex: "marry는 with 없이 바로 목적어를 써요. 완벽한 문장!" },
        { t: "fix", q: "Let's go to home.", w: "to", r: "", ko: "집에 가자.", ex: "home은 그 자체로 '집으로'라는 뜻이라 to가 필요 없어요." },
        { t: "order", ko: "나는 그가 노래하는 것을 들었다.", a: "I heard him sing a song", x: ["to"], ex: "hear + 사람 + 동사원형 (to 없이)" }
      ]
    }
  ]
});
