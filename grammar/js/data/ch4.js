window.CURRICULUM.push({
  id: "c4", emoji: "🦋", title: "동사의 변신", sub: "동사가 명사 · 형용사로 변해요",
  units: [
    {
      id: "u13", title: "to부정사", sub: "to + 동사원형",
      cards: [
        {
          h: "~하는 것, ~하기",
          b: "**to + 동사원형**은 동사를 명사처럼 쓰게 해 줘요.\nwant, hope, decide, plan, need 뒤에 자주 와요.",
          ex: [["I want {to travel}.", "나는 여행하고 싶다."], ["She decided {to learn} Spanish.", "그녀는 스페인어를 배우기로 결심했다."]]
        },
        {
          h: "~하기 위해, ~할",
          b: "**목적**(~하기 위해)을 말하거나, 명사 뒤에서 **~할**이라고 꾸밀 수도 있어요.",
          ex: [["I went to the store {to buy} milk.", "나는 우유를 사러 가게에 갔다."], ["I need something {to eat}.", "나는 먹을 것이 필요하다."]]
        },
        {
          h: "자주 쓰는 패턴",
          b: "통째로 외워 두면 편해요.",
          rows: [["It is ~ to V", "It is fun to cook. (요리하는 것은 재미있다)"], ["too ~ to V", "too tired to walk (너무 피곤해서 못 걷는)"], ["tell / ask / want + 사람 + to V", "He told me to wait."]],
          tip: "to 뒤에는 항상 동사원형! to goes ✕, to went ✕"
        }
      ],
      qs: [
        { t: "mcq", q: "I want ___ a doctor.", o: ["to be", "be", "being", "to being"], ko: "나는 의사가 되고 싶다.", ex: "want + to부정사" },
        { t: "mcq", q: "She decided ___ abroad.", o: ["to study", "studying", "study", "studied"], ko: "그녀는 유학을 가기로 결심했다.", ex: "decide는 to부정사만 목적어로 써요." },
        { t: "mcq", q: "He went to the library ___ books.", o: ["to borrow", "borrow", "borrowed", "for borrow"], ko: "그는 책을 빌리러 도서관에 갔다.", ex: "목적(~하기 위해)을 나타내는 to부정사" },
        { t: "mcq", q: "It is important ___ enough water.", o: ["to drink", "drink", "drinks", "drank"], ko: "물을 충분히 마시는 것은 중요하다.", ex: "It is + 형용사 + to V. It은 가짜 주어예요." },
        { t: "mcq", q: "I'm too tired ___ any more.", o: ["to walk", "walking", "walk", "walked"], ko: "나는 너무 피곤해서 더는 못 걷겠다.", ex: "too ~ to V = 너무 ~해서 …할 수 없다" },
        { t: "mcq", q: "My mom told me ___ my room.", o: ["to clean", "clean", "cleaning", "cleaned"], ko: "엄마가 나에게 방을 청소하라고 하셨다.", ex: "tell + 사람 + to V" },
        { t: "ox", q: "I hope to see you again soon.", a: true, ko: "곧 다시 만나기를 바라요.", ex: "hope 뒤에는 to부정사가 와요." },
        { t: "fix", q: "She wants to buys a new laptop.", w: "buys", r: "buy", ko: "그녀는 새 노트북을 사고 싶어 한다.", ex: "to 뒤에는 동사원형" },
        { t: "type", q: "I need something ___ (drink).", a: ["to drink"], ko: "나는 마실 것이 필요하다.", ex: "something + to V = ~할 것" },
        { t: "order", ko: "나는 살을 빼기 위해 매일 운동한다.", a: "I exercise every day to lose weight", alt: ["To lose weight I exercise every day"], x: ["losing"], ex: "to lose weight = 살을 빼기 위해 (목적)" }
      ]
    },
    {
      id: "u14", title: "동명사", sub: "동사 + -ing",
      cards: [
        {
          h: "동사가 명사로 변신",
          b: "**동사 + -ing**는 '~하는 것'이라는 명사가 돼요. 주어, 목적어 자리에 올 수 있어요.",
          ex: [["{Swimming} is fun.", "수영하는 것은 재미있다."], ["My hobby is {drawing}.", "내 취미는 그림 그리기다."]],
          tip: "동명사 주어는 단수 취급: Reading books is fun."
        },
        {
          h: "-ing만 좋아하는 동사",
          b: "뒤에 어떤 모양이 오는지는 동사가 정해요.",
          rows: [["-ing만", "enjoy, finish, mind, avoid, keep, give up"], ["to V만", "want, hope, decide, plan"], ["둘 다", "like, love, start, begin"]]
        },
        {
          h: "전치사 뒤에는 -ing",
          b: "전치사(for, at, about, in, to…) 뒤에 동사를 쓰려면 반드시 **동명사**로!",
          ex: [["Thank you for {coming}.", "와 줘서 고마워."], ["She is good at {singing}.", "그녀는 노래를 잘한다."], ["I look forward to {seeing} you.", "너를 만나기를 기대해."]]
        }
      ],
      qs: [
        { t: "mcq", q: "I enjoy ___ to music.", o: ["listening", "to listen", "listen", "listened"], ko: "나는 음악 듣는 것을 즐긴다.", ex: "enjoy + -ing" },
        { t: "mcq", q: "She finished ___ the report.", o: ["writing", "to write", "write", "wrote"], ko: "그녀는 보고서 쓰는 것을 끝냈다.", ex: "finish + -ing" },
        { t: "mcq", q: "Thank you for ___ me.", o: ["helping", "help", "to help", "helped"], ko: "도와줘서 고마워.", ex: "전치사 for 뒤에는 동명사" },
        { t: "mcq", q: "___ books is my hobby.", o: ["Reading", "Read", "Reads", "To reading"], ko: "책 읽기가 내 취미다.", ex: "주어 자리에는 동명사" },
        { t: "mcq", q: "I'm looking forward to ___ you.", o: ["seeing", "see", "saw", "be seeing"], ko: "너를 만나기를 기대하고 있어.", ex: "look forward to의 to는 전치사! 뒤에 -ing가 와요." },
        { t: "mcq", q: "Would you mind ___ the door?", o: ["closing", "to close", "close", "closed"], ko: "문 좀 닫아 주시겠어요?", ex: "mind + -ing" },
        { t: "ox", q: "She is good at to cook.", a: false, fix: "She is good at cooking.", ko: "그녀는 요리를 잘한다.", ex: "전치사 at 뒤에는 동명사" },
        { t: "fix", q: "My brother avoids eat vegetables.", w: "eat", r: "eating", ko: "내 남동생은 채소 먹는 것을 피한다.", ex: "avoid + -ing" },
        { t: "type", q: "How about ___ (go) for a walk?", a: ["going"], ko: "산책하러 가는 게 어때?", ex: "How about + -ing? = ~하는 게 어때?" },
        { t: "order", ko: "매일 운동하는 것은 건강에 좋다.", a: "Exercising every day is good for your health", x: ["exercise"], ex: "동명사 주어(Exercising every day) + 단수동사 is" }
      ]
    },
    {
      id: "u15", title: "수동태", sub: "be + p.p.",
      cards: [
        {
          h: "주어가 '당하는' 문장",
          b: "**be동사 + 과거분사(p.p.)** = ~되다, ~당하다\n누가 했는지는 **by** 뒤에 써요.",
          ex: [["Tom broke the window.", "톰이 창문을 깼다. (능동)"], ["The window {was broken} by Tom.", "창문이 톰에 의해 깨졌다. (수동)"]]
        },
        {
          h: "시제는 be동사가 담당",
          b: "p.p.는 그대로 두고 **be동사만** 바꿔요.",
          rows: [["현재", "is made"], ["과거", "was made"], ["미래", "will be made"], ["현재완료", "has been made"]],
          tip: "누가 했는지 모르거나 중요하지 않으면 by ~는 생략: English is spoken here."
        },
        {
          h: "주의할 점",
          b: "**happen, appear, arrive**처럼 목적어가 없는 동사는 수동태로 쓸 수 없어요.\nby 대신 다른 전치사를 쓰는 표현도 있어요.",
          rows: [["be interested in", "~에 관심이 있다"], ["be surprised at", "~에 놀라다"], ["be covered with", "~로 덮여 있다"], ["be made of", "~로 만들어지다"]]
        }
      ],
      qs: [
        { t: "mcq", q: "This book ___ by Hemingway.", o: ["was written", "wrote", "was wrote", "writes"], ko: "이 책은 헤밍웨이에 의해 쓰였다.", ex: "책은 '쓰이는' 것 → was + p.p.(written)" },
        { t: "mcq", q: "English ___ in many countries.", o: ["is spoken", "speaks", "is speaking", "spoke"], ko: "영어는 많은 나라에서 사용된다.", ex: "영어는 '말해지는' 것 → is spoken" },
        { t: "mcq", q: "The window was broken ___ the kids.", o: ["by", "from", "to", "of"], ko: "창문은 아이들에 의해 깨졌다.", ex: "행위자 앞에는 by" },
        { t: "mcq", q: "The package will ___ tomorrow.", o: ["be delivered", "deliver", "delivered", "be deliver"], ko: "소포는 내일 배달될 것이다.", ex: "조동사 + be + p.p." },
        { t: "mcq", q: "I am interested ___ history.", o: ["in", "at", "by", "with"], ko: "나는 역사에 관심이 있다.", ex: "be interested in = ~에 관심이 있다" },
        { t: "mcq", q: "My bike ___ last night.", o: ["was stolen", "stole", "was stole", "is stealing"], ko: "내 자전거는 어젯밤에 도난당했다.", ex: "steal - stole - stolen. 자전거는 '도난당하는' 것" },
        { t: "mcq", q: "The accident ___ last night.", o: ["happened", "was happened", "is happened", "was happen"], ko: "그 사고는 어젯밤에 일어났다.", ex: "happen은 수동태로 쓸 수 없는 동사예요." },
        { t: "ox", q: "The cake was made by my mom.", a: true, ko: "그 케이크는 우리 엄마가 만드셨다.", ex: "make - made - made (불규칙)" },
        { t: "fix", q: "These cars are make in Korea.", w: "make", r: "made", ko: "이 차들은 한국에서 만들어진다.", ex: "be + p.p. → are made" },
        { t: "order", ko: "그 다리는 1990년에 지어졌다.", a: "The bridge was built in 1990", x: ["build"], ex: "build - built - built. was built = 지어졌다" }
      ]
    },
    {
      id: "u16", title: "분사", sub: "-ing 와 -ed 형용사",
      cards: [
        {
          h: "동사가 형용사로 변신",
          b: "**현재분사(-ing)**: ~하고 있는 (능동 · 진행)\n**과거분사(p.p.)**: ~된 (수동 · 완료)",
          ex: [["a {sleeping} baby", "자고 있는 아기"], ["a {broken} window", "깨진 창문"], ["{fallen} leaves", "떨어진 나뭇잎"]]
        },
        {
          h: "boring vs bored",
          b: "**-ing** = 그런 감정을 **일으키는**\n**-ed** = 그런 감정을 **느끼는**",
          ex: [["The movie is {boring}.", "그 영화는 지루하다. (지루하게 만듦)"], ["I am {bored}.", "나는 지루하다. (지루함을 느낌)"]],
          tip: "I'm boring이라고 하면 '나는 재미없는 사람이야'가 돼요!"
        },
        {
          h: "뒤에서 꾸미기",
          b: "분사에 다른 말이 딸려 있으면 **명사 뒤**에서 꾸며요.",
          ex: [["the girl {wearing a red hat}", "빨간 모자를 쓴 소녀"], ["a book {written in English}", "영어로 쓰인 책"]]
        }
      ],
      qs: [
        { t: "mcq", q: "The movie was really ___.", o: ["boring", "bored", "bore", "bores"], ko: "그 영화는 정말 지루했다.", ex: "영화가 지루함을 '일으킴' → boring" },
        { t: "mcq", q: "I was ___ at the news.", o: ["surprised", "surprising", "surprise", "surprises"], ko: "나는 그 소식에 놀랐다.", ex: "내가 놀라움을 '느낌' → surprised" },
        { t: "mcq", q: "Be careful of the ___ glass.", o: ["broken", "breaking", "break", "broke"], ko: "깨진 유리를 조심해.", ex: "유리는 '깨진' 상태 → 과거분사 broken" },
        { t: "mcq", q: "The girl ___ a red hat is my sister.", o: ["wearing", "worn", "wears", "wear"], ko: "빨간 모자를 쓴 소녀는 내 여동생이다.", ex: "소녀가 모자를 '쓰고 있는'(능동) → wearing" },
        { t: "mcq", q: "This is a letter ___ in English.", o: ["written", "writing", "wrote", "write"], ko: "이것은 영어로 쓰인 편지다.", ex: "편지는 '쓰인' 것(수동) → written" },
        { t: "ox", q: "I'm very exciting about the trip.", a: false, fix: "I'm very excited about the trip.", ko: "나는 여행 때문에 아주 신난다.", ex: "내가 신남을 '느끼는' 것 → excited" },
        { t: "fix", q: "The game was very excited.", w: "excited", r: "exciting", ko: "그 경기는 매우 흥미진진했다.", ex: "경기가 흥분을 '일으키는' 것 → exciting" },
        { t: "type", q: "The news was ___ (shock). Everyone was speechless.", a: ["shocking"], ko: "그 소식은 충격적이었다. 모두 말을 잃었다.", ex: "소식이 충격을 '주는' 것 → shocking" },
        { t: "type", q: "I'm ___ (interest) in K-pop.", a: ["interested"], ko: "나는 케이팝에 관심이 있다.", ex: "내가 흥미를 '느끼는' 것 → interested" },
        { t: "order", ko: "저기서 달리고 있는 소년은 내 남동생이다.", a: "The boy running over there is my brother", x: ["runs"], ex: "running over there가 뒤에서 The boy를 꾸며요." }
      ]
    }
  ]
});
