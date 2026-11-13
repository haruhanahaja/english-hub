window.CURRICULUM.push({
  id: "c2", emoji: "⏳", title: "시간 여행", sub: "현재 · 과거 · 미래를 자유롭게",
  units: [
    {
      id: "u05", title: "현재진행형", sub: "be + -ing",
      cards: [
        {
          h: "지금 이 순간! be + -ing",
          b: "**지금 하고 있는 일**은 **be동사 + 동사-ing**로 말해요.",
          ex: [["I {am reading} a book.", "나는 책을 읽고 있다."], ["She {is cooking} dinner.", "그녀는 저녁을 요리하고 있다."], ["{Are} you {listening}?", "너 듣고 있니?"]]
        },
        {
          h: "-ing 붙이는 규칙",
          b: "대부분 그냥 -ing. 세 가지만 조심하세요.",
          rows: [["-e로 끝남", "make → making"], ["짧은 모음 + 자음 하나", "run → running, swim → swimming"], ["-ie로 끝남", "lie → lying"]]
        },
        {
          h: "현재형 vs 현재진행형",
          b: "**현재형** = 늘 하는 습관\n**현재진행형** = 지금 하는 중",
          ex: [["He {plays} the guitar every day.", "그는 매일 기타를 친다. (습관)"], ["He {is playing} the guitar now.", "그는 지금 기타를 치고 있다."]],
          tip: "know, like, want, have(가지다) 같은 '상태' 동사는 진행형으로 쓰지 않아요. I am knowing ✕"
        }
      ],
      qs: [
        { t: "mcq", q: "Look! It ___ outside.", o: ["is raining", "rains", "rain", "raining"], ko: "봐! 밖에 비가 오고 있어.", ex: "Look!은 '지금' 일어나는 일의 신호 → be + -ing" },
        { t: "mcq", q: "They ___ soccer now.", o: ["are playing", "is playing", "plays", "playing"], ko: "그들은 지금 축구를 하고 있다.", ex: "They + are + playing. be동사가 꼭 필요해요." },
        { t: "mcq", q: "I ___ this song. It's great!", o: ["like", "am liking", "liking", "likes"], ko: "나는 이 노래가 좋아. 정말 멋져!", ex: "like는 상태를 나타내는 동사라 진행형으로 쓰지 않아요." },
        { t: "mcq", q: "She usually ___ tea, but today she is drinking coffee.", o: ["drinks", "is drinking", "drink", "drinking"], ko: "그녀는 보통 차를 마시지만 오늘은 커피를 마시고 있다.", ex: "usually(보통)는 습관 → 현재형 drinks" },
        { t: "ox", q: "He is running in the park.", a: true, ko: "그는 공원에서 달리고 있다.", ex: "run은 짧은 모음 + 자음 → n을 한 번 더 쓰고 -ing" },
        { t: "fix", q: "We is having lunch now.", w: "is", r: "are", ko: "우리는 지금 점심을 먹고 있다.", ex: "We와 짝꿍인 be동사는 are" },
        { t: "type", q: "The baby ___ (sleep) now.", a: ["is sleeping", "'s sleeping"], ko: "아기는 지금 자고 있다.", ex: "The baby(3인칭 단수) + is + sleeping" },
        { t: "type", q: "They ___ (swim) in the pool right now.", a: ["are swimming", "'re swimming"], ko: "그들은 지금 수영장에서 수영하고 있다.", ex: "swim → swimming (m을 한 번 더!)" },
        { t: "order", ko: "너는 지금 뭐 하고 있니?", a: "What are you doing now", end: "?", x: ["do"], ex: "의문사 + be동사 + 주어 + -ing?" },
        { t: "order", ko: "나는 지금 TV를 보고 있지 않다.", a: "I am not watching TV now", x: ["watch"], ex: "진행형 부정문: be동사 + not + -ing" }
      ]
    },
    {
      id: "u06", title: "과거시제", sub: "-ed 와 불규칙 동사",
      cards: [
        {
          h: "be동사의 과거: was / were",
          b: "am, is → **was**\nare → **were**",
          ex: [["I {was} tired yesterday.", "나는 어제 피곤했다."], ["They {were} at the beach.", "그들은 해변에 있었다."]]
        },
        {
          h: "일반동사의 과거: -ed",
          b: "규칙 동사는 **-ed**를 붙여요.",
          rows: [["대부분", "play → played"], ["-e로 끝남", "like → liked"], ["자음 + y", "study → studied"], ["짧은 모음 + 자음", "stop → stopped"]],
          tip: "부정문은 didn't + 동사원형, 의문문은 Did + 주어 + 동사원형?"
        },
        {
          h: "꼭 외워야 할 불규칙 동사",
          b: "자주 쓰는 동사일수록 불규칙이 많아요.",
          rows: [["go → went", "come → came"], ["eat → ate", "see → saw"], ["buy → bought", "have → had"], ["make → made", "take → took"]],
          ex: [["I {went} to bed early.", "나는 일찍 잤다."], ["Did you {see} it?", "그거 봤어? (Did 뒤는 원형)"]]
        }
      ],
      qs: [
        { t: "mcq", q: "I ___ to the library yesterday.", o: ["went", "go", "goed", "gone"], ko: "나는 어제 도서관에 갔다.", ex: "yesterday → 과거. go의 과거형은 went" },
        { t: "mcq", q: "She ___ at home last night.", o: ["was", "were", "is", "did"], ko: "그녀는 어젯밤 집에 있었다.", ex: "She + be동사 과거 → was" },
        { t: "mcq", q: "We ___ see the movie last week.", o: ["didn't", "wasn't", "don't", "weren't"], ko: "우리는 지난주에 그 영화를 보지 않았다.", ex: "일반동사 과거 부정: didn't + 동사원형" },
        { t: "mcq", q: "Did you ___ your homework?", o: ["finish", "finished", "finishing", "finishes"], ko: "너 숙제 끝냈니?", ex: "Did 뒤에는 동사원형. 과거 표시는 Did가 이미 했어요." },
        { t: "mcq", q: "He ___ a sandwich an hour ago.", o: ["ate", "eats", "eat", "eaten"], ko: "그는 한 시간 전에 샌드위치를 먹었다.", ex: "ago(~전에) → 과거. eat의 과거형은 ate" },
        { t: "ox", q: "They was very tired after the trip.", a: false, fix: "They were very tired after the trip.", ko: "그들은 여행 후에 매우 피곤했다.", ex: "They는 복수 → were" },
        { t: "fix", q: "I buyed a new bag last week.", w: "buyed", r: "bought", ko: "나는 지난주에 새 가방을 샀다.", ex: "buy의 과거형은 bought (불규칙)" },
        { t: "type", q: "She ___ (study) English for three hours yesterday.", a: ["studied"], ko: "그녀는 어제 세 시간 동안 영어를 공부했다.", ex: "자음 + y → y를 i로 바꾸고 -ed" },
        { t: "type", q: "We ___ (take) many photos in Jeju last summer.", a: ["took"], ko: "우리는 지난여름 제주에서 사진을 많이 찍었다.", ex: "take의 과거형은 took" },
        { t: "order", ko: "너는 어젯밤에 뭘 했니?", a: "What did you do last night", end: "?", x: ["does"], ex: "의문사 + did + 주어 + 동사원형?" }
      ]
    },
    {
      id: "u07", title: "미래 표현", sub: "will / be going to",
      cards: [
        {
          h: "will + 동사원형",
          b: "**방금 한 결심, 예측, 약속**을 말할 때 써요.",
          ex: [["I{'ll help} you.", "내가 도와줄게. (즉석 결심)"], ["It {will be} sunny tomorrow.", "내일은 맑을 거야. (예측)"], ["I {won't} tell anyone.", "아무에게도 말 안 할게. (won't = will not)"]]
        },
        {
          h: "be going to + 동사원형",
          b: "**이미 정해 둔 계획**이나 **눈에 보이는 근거가 있는 예측**에 써요.",
          ex: [["I{'m going to visit} my grandma this weekend.", "이번 주말에 할머니 댁에 갈 거야. (계획)"], ["Look at the clouds. It{'s going to rain}.", "구름 좀 봐. 비가 오겠어."]]
        },
        {
          h: "when / if 뒤에는 현재형",
          b: "미래의 일이라도 **when, if 절 안에서는 현재형**을 써요.",
          ex: [["When I {arrive}, I will call you.", "도착하면 전화할게. (will arrive ✕)"], ["If it {rains}, we will stay home.", "비가 오면 집에 있을 거야."]],
          tip: "will 뒤에는 항상 동사원형! will goes ✕"
        }
      ],
      qs: [
        { t: "mcq", q: "I think it ___ rain tomorrow.", o: ["will", "wills", "is", "going"], ko: "내일 비가 올 것 같아.", ex: "예측에는 will. will은 주어가 무엇이든 모양이 변하지 않아요." },
        { t: "mcq", q: "She will ___ us next week.", o: ["visit", "visits", "visiting", "visited"], ko: "그녀는 다음 주에 우리를 방문할 것이다.", ex: "will + 동사원형" },
        { t: "mcq", q: "We ___ going to travel to Japan this winter.", o: ["are", "will", "is", "do"], ko: "우리는 이번 겨울에 일본으로 여행 갈 예정이다.", ex: "be going to의 be는 주어에 맞춰요. We → are" },
        { t: "mcq", q: "A: The phone is ringing.   B: I ___ get it!", o: ["will", "am going", "am", "going to"], ko: "A: 전화 온다.  B: 내가 받을게!", ex: "그 자리에서 바로 결정한 일 → will" },
        { t: "mcq", q: "If it ___ tomorrow, we will stay home.", o: ["rains", "will rain", "rained", "raining"], ko: "내일 비가 오면 우리는 집에 있을 것이다.", ex: "if 절에서는 미래의 일도 현재형으로 써요." },
        { t: "ox", q: "He will comes back soon.", a: false, fix: "He will come back soon.", ko: "그는 곧 돌아올 것이다.", ex: "will 뒤에는 동사원형 come" },
        { t: "fix", q: "I am going to studying tonight.", w: "studying", r: "study", ko: "나는 오늘 밤 공부할 예정이다.", ex: "be going to + 동사원형" },
        { t: "type", q: "I ___ (will + not) be late again. I promise.", a: ["won't", "will not"], ko: "다시는 늦지 않을게. 약속해.", ex: "will not의 줄임말은 won't" },
        { t: "order", ko: "나는 내일 그를 만날 예정이다.", a: "I am going to meet him tomorrow", alt: ["Tomorrow I am going to meet him"], x: ["will"], ex: "be going to + 동사원형 meet" },
        { t: "order", ko: "내일 나를 도와줄래?", a: "Will you help me tomorrow", end: "?", x: ["helps"], ex: "Will + 주어 + 동사원형?" }
      ]
    },
    {
      id: "u08", title: "현재완료", sub: "have + p.p.",
      cards: [
        {
          h: "과거와 현재를 잇는 다리",
          b: "**have / has + 과거분사(p.p.)**\n과거에 일어난 일이 **지금과 연결**되어 있을 때 써요.",
          rows: [["경험", "I have been to Jeju. (가 본 적 있다)"], ["계속", "I have lived here for 5 years. (쭉 살고 있다)"], ["완료", "I have just finished. (막 끝냈다)"]]
        },
        {
          h: "for 와 since",
          b: "**for + 기간** (~동안)\n**since + 시작 시점** (~부터)",
          ex: [["I have studied English {for} three years.", "나는 3년 동안 영어를 공부해 왔다."], ["I have studied English {since} 2022.", "나는 2022년부터 영어를 공부해 왔다."]]
        },
        {
          h: "과거시제와 헷갈리지 않기",
          b: "**yesterday, last year, ~ ago**처럼 분명한 과거 시점과는 현재완료를 함께 쓸 수 없어요.",
          ex: [["I {lost} my key yesterday.", "어제 열쇠를 잃어버렸다. (have lost ✕)"], ["I {have lost} my key.", "열쇠를 잃어버렸다. (지금도 없음)"]],
          tip: "have been to = 가 본 적 있다 / have gone to = 가 버렸다(지금 여기 없음)"
        }
      ],
      qs: [
        { t: "mcq", q: "I have ___ this movie before.", o: ["seen", "saw", "see", "seeing"], ko: "나는 이 영화를 전에 본 적이 있다.", ex: "have + 과거분사. see - saw - seen" },
        { t: "mcq", q: "She ___ lived here since 2020.", o: ["has", "have", "is", "was"], ko: "그녀는 2020년부터 여기에 살고 있다.", ex: "주어가 She → has + p.p." },
        { t: "mcq", q: "We have known each other ___ ten years.", o: ["for", "since", "during", "from"], ko: "우리는 10년 동안 서로 알고 지냈다.", ex: "ten years는 '기간' → for" },
        { t: "mcq", q: "I ___ my keys yesterday.", o: ["lost", "have lost", "has lost", "lose"], ko: "나는 어제 열쇠를 잃어버렸다.", ex: "yesterday는 분명한 과거 시점 → 과거시제" },
        { t: "mcq", q: "Have you ___ been to Paris?", o: ["ever", "since", "ago", "for"], ko: "파리에 가 본 적 있니?", ex: "경험을 물을 때: Have you ever + p.p.?" },
        { t: "ox", q: "He has finished his homework yesterday.", a: false, fix: "He finished his homework yesterday.", ko: "그는 어제 숙제를 끝냈다.", ex: "yesterday와 현재완료는 함께 쓸 수 없어요." },
        { t: "fix", q: "I have already eat lunch.", w: "eat", r: "eaten", ko: "나는 이미 점심을 먹었다.", ex: "have + 과거분사. eat - ate - eaten" },
        { t: "type", q: "She ___ (not + finish) the report yet.", a: ["hasn't finished", "has not finished"], ko: "그녀는 아직 보고서를 끝내지 못했다.", ex: "has not + p.p. yet은 '아직'이라는 뜻으로 완료 부정문에 자주 써요." },
        { t: "type", q: "They have lived in Seoul ___ 2015. (for / since)", a: ["since"], ko: "그들은 2015년부터 서울에 살고 있다.", ex: "2015는 '시작 시점' → since" },
        { t: "order", ko: "나는 그렇게 큰 개를 본 적이 없다.", a: "I have never seen such a big dog", x: ["saw"], ex: "have never + p.p. = ~해 본 적이 없다" }
      ]
    }
  ]
});
