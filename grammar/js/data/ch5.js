window.CURRICULUM.push({
  id: "c5", emoji: "🌉", title: "문장 잇기", sub: "짧은 문장을 길고 자연스럽게",
  units: [
    {
      id: "u17", title: "접속사", sub: "and / but / because / if",
      cards: [
        {
          h: "문장을 잇는 풀",
          b: "가장 기본적인 네 가지예요.",
          rows: [["and", "그리고"], ["but", "하지만"], ["or", "또는"], ["so", "그래서"]],
          ex: [["I was hungry, {so} I made a sandwich.", "배가 고파서 샌드위치를 만들었다."]]
        },
        {
          h: "이유 · 때 · 조건 · 양보",
          b: "**because** ~때문에 · **when** ~할 때 · **if** ~라면 · **although** 비록 ~이지만",
          ex: [["I stayed home {because} I was sick.", "나는 아파서 집에 있었다."], ["{Although} it was late, he kept working.", "늦었지만 그는 계속 일했다."]],
          tip: "접속사 절이 문장 앞에 오면 쉼표를 찍어요: When I got home, I took a shower."
        },
        {
          h: "because vs because of",
          b: "**because + 문장(주어 + 동사)**\n**because of + 명사**",
          ex: [["{because} it rained", "비가 왔기 때문에"], ["{because of} the rain", "비 때문에"]]
        }
      ],
      qs: [
        { t: "mcq", q: "I was tired, ___ I went to bed early.", o: ["so", "but", "or", "because"], ko: "나는 피곤해서 일찍 잤다.", ex: "피곤했다 → 그래서(so) 일찍 잤다" },
        { t: "mcq", q: "She studied hard, ___ she failed the test.", o: ["but", "so", "or", "because"], ko: "그녀는 열심히 공부했지만 시험에 떨어졌다.", ex: "앞뒤 내용이 반대 → but" },
        { t: "mcq", q: "I stayed home ___ it was raining.", o: ["because", "so", "but", "although"], ko: "비가 와서 나는 집에 있었다.", ex: "이유를 말할 때 because" },
        { t: "mcq", q: "___ it was cold, he went out without a coat.", o: ["Although", "Because", "So", "If"], ko: "추웠는데도 그는 코트 없이 나갔다.", ex: "Although = 비록 ~이지만" },
        { t: "mcq", q: "Call me ___ you arrive.", o: ["when", "although", "but", "so"], ko: "도착하면 전화해.", ex: "when = ~할 때, ~하면" },
        { t: "mcq", q: "The game was canceled ___ the rain.", o: ["because of", "because", "although", "so"], ko: "경기는 비 때문에 취소되었다.", ex: "뒤에 명사(the rain)만 있으므로 because of" },
        { t: "mcq", q: "Which do you want, tea ___ coffee?", o: ["or", "so", "but", "because"], ko: "차와 커피 중에 어떤 걸 원하니?", ex: "둘 중 선택 → or" },
        { t: "ox", q: "I will call you when I get home.", a: true, ko: "집에 도착하면 전화할게.", ex: "when 절에서는 미래의 일도 현재형으로 써요." },
        { t: "fix", q: "He was sick, because he went to school anyway.", w: "because", r: "but", ko: "그는 아팠지만 어쨌든 학교에 갔다.", ex: "아팠다 ↔ 학교에 갔다. 반대되는 내용 → but" },
        { t: "order", ko: "서두르지 않으면 버스를 놓칠 거야.", a: "You will miss the bus if you do not hurry", alt: ["If you do not hurry you will miss the bus"], x: ["because"], ex: "if 절은 현재형, 주절은 will" }
      ]
    },
    {
      id: "u18", title: "관계대명사", sub: "who / which / that",
      cards: [
        {
          h: "두 문장을 하나로",
          b: "관계대명사는 앞의 명사를 **문장으로 꾸며 주는 연결고리**예요.\n사람 → **who**, 사물 → **which**, 둘 다 → **that**",
          ex: [["I have a friend {who} lives in Canada.", "나는 캐나다에 사는 친구가 있다."], ["This is the bag {which} I bought.", "이것이 내가 산 가방이다."]]
        },
        {
          h: "생략할 수 있을 때",
          b: "관계대명사 뒤에 **주어 + 동사**가 바로 오면(목적격) 생략할 수 있어요.",
          ex: [["the book {(that)} I read", "내가 읽은 책 (생략 가능)"], ["the man {who} called me", "나에게 전화한 남자 (생략 불가)"]],
          tip: "소유를 나타낼 땐 whose: a girl whose hair is long (머리가 긴 소녀)"
        },
        {
          h: "what = ~하는 것",
          b: "**what**은 꾸밀 명사 없이 혼자 '~하는 것'이라는 뜻이에요.",
          ex: [["{What} I want is a break.", "내가 원하는 것은 휴식이다."], ["Tell me {what} you saw.", "네가 본 것을 말해 줘."]]
        }
      ],
      qs: [
        { t: "mcq", q: "I have a friend ___ lives in Canada.", o: ["who", "which", "whose", "what"], ko: "나는 캐나다에 사는 친구가 있다.", ex: "꾸밈 받는 명사가 사람(a friend) → who" },
        { t: "mcq", q: "This is the book ___ I bought yesterday.", o: ["which", "who", "whose", "what"], ko: "이것은 내가 어제 산 책이다.", ex: "꾸밈 받는 명사가 사물(the book) → which" },
        { t: "mcq", q: "I met a girl ___ father is a pilot.", o: ["whose", "who", "which", "that"], ko: "나는 아버지가 조종사인 소녀를 만났다.", ex: "'그녀의' 아버지 → 소유격 whose" },
        { t: "mcq", q: "___ I need is a cup of coffee.", o: ["What", "That", "Which", "Who"], ko: "내가 필요한 것은 커피 한 잔이다.", ex: "앞에 꾸밀 명사가 없고 '~하는 것' → What" },
        { t: "mcq", q: "The people who ___ next door are very kind.", o: ["live", "lives", "living", "is living"], ko: "옆집에 사는 사람들은 아주 친절하다.", ex: "who 뒤의 동사는 앞의 명사(people, 복수)에 맞춰요." },
        { t: "mcq", q: "She is the teacher ___ everyone likes.", o: ["that", "which", "whose", "what"], ko: "그녀는 모두가 좋아하는 선생님이다.", ex: "사람을 꾸밀 때는 who 또는 that" },
        { t: "ox", q: "The man which lives upstairs is a chef.", a: false, fix: "The man who lives upstairs is a chef.", ko: "위층에 사는 남자는 요리사다.", ex: "사람에는 which를 쓸 수 없어요." },
        { t: "ox", q: "The movie I watched last night was great.", a: true, ko: "내가 어젯밤에 본 영화는 훌륭했다.", ex: "The movie (that) I watched — 목적격 관계대명사는 생략할 수 있어요." },
        { t: "fix", q: "This is the phone who I want to buy.", w: "who", r: "which", ko: "이것이 내가 사고 싶은 전화기다.", ex: "사물(the phone)에는 which 또는 that" },
        { t: "order", ko: "이것이 내가 찾고 있던 열쇠다.", a: "This is the key that I was looking for", x: ["who"], ex: "the key + that + 주어 + 동사" }
      ]
    },
    {
      id: "u19", title: "의문사와 간접의문문", sub: "질문을 문장 속에 넣기",
      cards: [
        {
          h: "의문사 총정리",
          b: "who(누가) · what(무엇) · when(언제) · where(어디) · why(왜) · how(어떻게)",
          rows: [["How many + 셀 수 있는 명사", "몇 개"], ["How much", "얼마 (양 · 가격)"], ["How long", "얼마나 오래"], ["How often", "얼마나 자주"]]
        },
        {
          h: "간접의문문",
          b: "질문이 다른 문장 속에 들어가면 **의문사 + 주어 + 동사** 순서(평서문 어순)가 돼요.",
          ex: [["Where does he live?", "그는 어디에 사니?"], ["Do you know {where he lives}?", "그가 어디 사는지 아니?"]],
          tip: "does / did는 사라지고 동사가 원래 모양을 되찾아요: lives, went"
        },
        {
          h: "의문사가 없으면 if",
          b: "Yes / No 질문을 넣을 때는 **if** 또는 **whether**(~인지)를 써요.",
          ex: [["I wonder {if} she is okay.", "그녀가 괜찮은지 궁금하다."], ["{Who made} this?", "누가 이걸 만들었니? (의문사가 주어면 바로 동사)"]]
        }
      ],
      qs: [
        { t: "mcq", q: "___ do you go to the gym?   — Twice a week.", o: ["How often", "How long", "How many", "How much"], ko: "얼마나 자주 헬스장에 가니? — 일주일에 두 번.", ex: "빈도를 묻는 표현은 How often" },
        { t: "mcq", q: "___ is your birthday?   — It's in May.", o: ["When", "Where", "Who", "Why"], ko: "네 생일은 언제니? — 5월이야.", ex: "때를 물을 때는 When" },
        { t: "mcq", q: "Do you know where ___?", o: ["she lives", "does she live", "lives she", "is she live"], ko: "그녀가 어디 사는지 아니?", ex: "간접의문문: 의문사 + 주어 + 동사" },
        { t: "mcq", q: "I don't know what ___.", o: ["his name is", "is his name", "name is his", "his name does"], ko: "나는 그의 이름이 뭔지 모른다.", ex: "what + 주어(his name) + 동사(is)" },
        { t: "mcq", q: "I wonder ___ he will come to the party.", o: ["if", "what", "who", "which"], ko: "그가 파티에 올지 궁금하다.", ex: "의문사가 없는 질문은 if(~인지)로 연결" },
        { t: "mcq", q: "Who ___ this cake?   — My mom did.", o: ["made", "did made", "does made", "making"], ko: "누가 이 케이크를 만들었니? — 우리 엄마가.", ex: "의문사 Who가 주어일 때는 바로 동사가 와요." },
        { t: "mcq", q: "___ books do you read a month?", o: ["How many", "How much", "How long", "How often"], ko: "한 달에 책을 몇 권 읽니?", ex: "셀 수 있는 명사(books)의 수 → How many" },
        { t: "ox", q: "Can you tell me where the station is?", a: true, ko: "역이 어디인지 알려 주시겠어요?", ex: "간접의문문은 주어(the station) + 동사(is) 순서" },
        { t: "fix", q: "How much people came to the party?", w: "much", r: "many", ko: "파티에 몇 명이 왔니?", ex: "people은 셀 수 있는 명사 → How many" },
        { t: "order", ko: "나는 그가 왜 화났는지 모르겠다.", a: "I do not know why he is angry", x: ["does"], ex: "why + 주어(he) + 동사(is)" }
      ]
    },
    {
      id: "u20", title: "가정법", sub: "If 로 상상하기",
      cards: [
        {
          h: "실제로 있을 법한 일",
          b: "**If + 현재형, will + 동사원형**\n일어날 가능성이 충분한 일이에요.",
          ex: [["If it {rains}, I {will take} an umbrella.", "비가 오면 우산을 가져갈 거야."]]
        },
        {
          h: "상상 · 현실과 반대",
          b: "**If + 과거형, would / could + 동사원형**\n과거형을 쓰지만 뜻은 **현재**! 현실과 거리가 멀다는 표시예요.",
          ex: [["If I {had} wings, I {would fly}.", "날개가 있다면 날 텐데. (날개 없음)"], ["If I {were} you, I {would say} sorry.", "내가 너라면 사과할 텐데."]],
          tip: "가정법에서 be동사는 주어와 상관없이 were를 쓰는 것이 원칙이에요."
        },
        {
          h: "한눈에 비교",
          b: "같은 상황, 다른 마음가짐",
          ex: [["If I {have} time, I {will} help you.", "시간이 있으면 도울게. (있을 수도)"], ["If I {had} time, I {would} help you.", "시간이 있다면 도울 텐데. (지금 없음)"]]
        }
      ],
      qs: [
        { t: "mcq", q: "If it rains tomorrow, we ___ at home.", o: ["will stay", "would stay", "stayed", "staying"], ko: "내일 비가 오면 우리는 집에 있을 것이다.", ex: "실제 가능한 조건: If + 현재, will + 동사원형" },
        { t: "mcq", q: "If I ___ you, I would apologize.", o: ["were", "am", "will be", "be"], ko: "내가 너라면 사과할 텐데.", ex: "가정법 과거의 be동사는 were" },
        { t: "mcq", q: "If I had a lot of money, I ___ around the world.", o: ["would travel", "will travel", "travel", "traveled"], ko: "돈이 많다면 세계 여행을 할 텐데.", ex: "If + 과거(had), would + 동사원형" },
        { t: "mcq", q: "If she ___ harder, she would pass the exam.", o: ["studied", "studies", "will study", "study"], ko: "그녀가 더 열심히 공부한다면 시험에 합격할 텐데.", ex: "주절이 would → if 절은 과거형" },
        { t: "mcq", q: "___ you hurry, you will be late.", o: ["Unless", "If", "Because", "Although"], ko: "서두르지 않으면 늦을 거야.", ex: "Unless = If ~ not (~하지 않으면)" },
        { t: "mcq", q: "If I ___ time, I would help you. But I'm too busy now.", o: ["had", "have", "will have", "having"], ko: "시간이 있다면 도울 텐데. 하지만 지금은 너무 바빠.", ex: "지금 시간이 없음(현실과 반대) → 가정법 과거 had" },
        { t: "ox", q: "If I will see him, I will tell him.", a: false, fix: "If I see him, I will tell him.", ko: "그를 보면 말해 줄게.", ex: "if 절 안에서는 will을 쓰지 않고 현재형을 써요." },
        { t: "fix", q: "If I were a bird, I will fly to you.", w: "will", r: "would", ko: "내가 새라면 너에게 날아갈 텐데.", ex: "If + 과거(were) → 주절은 would" },
        { t: "type", q: "If I ___ (be) taller, I could reach the shelf.", a: ["were", "was"], ko: "내가 키가 더 크다면 선반에 손이 닿을 텐데.", ex: "가정법 과거의 be동사는 were가 원칙이에요. (회화에서는 was도 써요)" },
        { t: "order", ko: "내가 너라면 그 차를 사지 않을 텐데.", a: "If I were you I would not buy the car", alt: ["I would not buy the car if I were you"], x: ["will"], ex: "If I were you, I would ~ = 내가 너라면 ~할 텐데" }
      ]
    }
  ]
});
