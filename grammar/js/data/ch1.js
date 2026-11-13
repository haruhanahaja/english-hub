window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push({
  id: "c1", emoji: "🌱", title: "첫걸음", sub: "영어 문장의 뼈대 세우기",
  units: [
    {
      id: "u01", title: "be동사", sub: "am / is / are",
      cards: [
        {
          h: "be동사는 '~이다, ~에 있다'",
          b: "주어가 **무엇인지**, **어떤 상태인지**, **어디에 있는지** 말할 때 써요.\n주어에 따라 모양이 달라집니다.",
          rows: [["I", "am"], ["You / We / They", "are"], ["He / She / It", "is"]],
          ex: [["I {am} a student.", "나는 학생이다."], ["She {is} happy.", "그녀는 행복하다."], ["They {are} in the park.", "그들은 공원에 있다."]]
        },
        {
          h: "부정문과 의문문",
          b: "**부정문**은 be동사 뒤에 **not**만 붙이면 끝!\n**의문문**은 be동사를 문장 맨 앞으로 보내요.",
          ex: [["He {is not} tired.", "그는 피곤하지 않다."], ["{Are} you ready?", "너 준비됐니?"], ["{Is} this your bag?", "이거 네 가방이니?"]]
        },
        {
          h: "줄임말로 자연스럽게",
          b: "회화에서는 보통 줄여서 말해요.",
          rows: [["I am", "I'm"], ["You are", "You're"], ["He is", "He's"], ["is not", "isn't"], ["are not", "aren't"]],
          ex: [["{I'm} from Korea.", "나는 한국 출신이야."], ["They {aren't} busy.", "그들은 바쁘지 않아."]],
          tip: "am not은 줄일 수 없어요. amn't ✕ → I'm not ○"
        }
      ],
      qs: [
        { t: "mcq", q: "I ___ a student.", o: ["am", "is", "are", "be"], ko: "나는 학생이다.", ex: "주어가 I일 때 be동사는 항상 am이에요." },
        { t: "mcq", q: "My brother ___ very tall.", o: ["is", "are", "am", "be"], ko: "내 남동생은 키가 아주 크다.", ex: "My brother는 He로 바꿀 수 있는 3인칭 단수 → is" },
        { t: "mcq", q: "Tom and Jane ___ my friends.", o: ["are", "is", "am", "be"], ko: "톰과 제인은 내 친구들이다.", ex: "A and B는 두 명(복수)이므로 are를 써요." },
        { t: "mcq", q: "___ you hungry?", o: ["Are", "Is", "Am", "Do"], ko: "너 배고프니?", ex: "be동사 의문문은 be동사를 앞으로! you와 짝꿍은 are." },
        { t: "ox", q: "She are a doctor.", a: false, fix: "She is a doctor.", ko: "그녀는 의사다.", ex: "She는 3인칭 단수이므로 is를 써야 해요." },
        { t: "fix", q: "The books is on the table.", w: "is", r: "are", ko: "그 책들은 탁자 위에 있다.", ex: "books는 복수 명사 → are" },
        { t: "type", q: "We ___ (be) late for class.", a: ["are"], ko: "우리는 수업에 늦었다.", ex: "We와 짝꿍인 be동사는 are." },
        { t: "type", q: "It ___ (be + not) cold today.", a: ["is not", "isn't"], ko: "오늘은 춥지 않다.", ex: "It + is, 부정은 뒤에 not → is not (= isn't)" },
        { t: "order", ko: "그는 내 선생님이 아니다.", a: "He is not my teacher", x: ["are"], ex: "be동사 부정문: 주어 + be동사 + not" },
        { t: "order", ko: "너의 부모님은 집에 계시니?", a: "Are your parents at home", end: "?", x: ["is"], ex: "your parents는 복수 → Are로 시작하는 의문문" }
      ]
    },
    {
      id: "u02", title: "일반동사 현재형", sub: "3인칭 단수엔 -s",
      cards: [
        {
          h: "습관과 사실은 현재형으로",
          b: "늘 하는 일, 변하지 않는 사실은 **현재형**으로 말해요.\n주어가 **He / She / It (3인칭 단수)**이면 동사에 **-s**를 붙입니다.",
          ex: [["I {play} tennis on Sundays.", "나는 일요일마다 테니스를 친다."], ["She {plays} tennis on Sundays.", "그녀는 일요일마다 테니스를 친다."], ["The earth {goes} around the sun.", "지구는 태양 주위를 돈다."]]
        },
        {
          h: "-s 붙이는 규칙",
          b: "대부분은 그냥 -s. 몇 가지만 기억하세요.",
          rows: [["대부분", "like → likes"], ["-s, -sh, -ch, -x, -o", "watch → watches, go → goes"], ["자음 + y", "study → studies"], ["불규칙", "have → has"]],
          tip: "모음 + y는 그냥 -s: play → plays, enjoy → enjoys"
        },
        {
          h: "얼마나 자주? 빈도부사",
          b: "always(항상) › usually(보통) › often(자주) › sometimes(가끔) › never(절대 안)\n위치는 **일반동사 앞, be동사 뒤**예요.",
          ex: [["I {always} drink water in the morning.", "나는 아침에 항상 물을 마신다."], ["He is {never} late.", "그는 절대 늦지 않는다."]]
        }
      ],
      qs: [
        { t: "mcq", q: "She ___ to school by bus.", o: ["goes", "go", "going", "gos"], ko: "그녀는 버스로 학교에 간다.", ex: "She는 3인칭 단수. go는 -o로 끝나서 -es → goes" },
        { t: "mcq", q: "My parents ___ in Busan.", o: ["live", "lives", "living", "is live"], ko: "우리 부모님은 부산에 사신다.", ex: "My parents는 복수(They) → 동사원형 그대로 live" },
        { t: "mcq", q: "He ___ English every night.", o: ["studies", "studys", "study", "studying"], ko: "그는 매일 밤 영어를 공부한다.", ex: "자음 + y로 끝나면 y를 i로 바꾸고 -es → studies" },
        { t: "mcq", q: "The sun ___ in the east.", o: ["rises", "rise", "rising", "is rise"], ko: "해는 동쪽에서 뜬다.", ex: "변하지 않는 사실은 현재형. The sun은 3인칭 단수 → rises" },
        { t: "ox", q: "My sister have a cute dog.", a: false, fix: "My sister has a cute dog.", ko: "내 여동생은 귀여운 강아지가 있다.", ex: "have의 3인칭 단수형은 haves가 아니라 has!" },
        { t: "fix", q: "Minho watch TV after dinner.", w: "watch", r: "watches", ko: "민호는 저녁 식사 후에 TV를 본다.", ex: "Minho는 3인칭 단수, -ch로 끝나는 동사는 -es → watches" },
        { t: "type", q: "She ___ (teach) math at a middle school.", a: ["teaches"], ko: "그녀는 중학교에서 수학을 가르친다.", ex: "-ch로 끝나는 동사 + es → teaches" },
        { t: "type", q: "My dad ___ (have) a new car.", a: ["has"], ko: "우리 아빠는 새 차가 있다.", ex: "have → has (불규칙)" },
        { t: "order", ko: "나는 보통 7시에 일어난다.", a: "I usually get up at seven", alt: ["Usually I get up at seven"], x: ["gets"], ex: "빈도부사 usually는 일반동사(get) 앞에 와요." },
        { t: "order", ko: "그는 절대 아침을 거르지 않는다.", a: "He never skips breakfast", x: ["skip"], ex: "never + 일반동사. 주어가 He라서 skips!" }
      ]
    },
    {
      id: "u03", title: "부정문과 의문문", sub: "do / does 활용하기",
      cards: [
        {
          h: "일반동사 부정문",
          b: "일반동사는 혼자서 부정문을 못 만들어요. 도우미 **do**를 불러요.\n**don't / doesn't + 동사원형**",
          rows: [["I / You / We / They", "don't + 동사원형"], ["He / She / It", "doesn't + 동사원형"]],
          ex: [["I {don't like} carrots.", "나는 당근을 좋아하지 않는다."], ["He {doesn't like} carrots.", "그는 당근을 좋아하지 않는다."]]
        },
        {
          h: "일반동사 의문문",
          b: "**Do / Does + 주어 + 동사원형 ~?**\n대답은 do / does로 짧게 해요.",
          ex: [["{Do} you {like} music?", "너는 음악을 좋아하니?"], ["{Does} she {live} here?", "그녀는 여기 사니?"], ["Yes, she {does}. / No, she {doesn't}.", "응, 그래. / 아니, 안 그래."]]
        },
        {
          h: "가장 많이 하는 실수",
          b: "does / doesn't가 나오면 뒤의 동사는 반드시 **동사원형**!\n-s가 does로 이사 갔다고 생각하세요.",
          ex: [["She doesn't {like} it.", "likes ✕"], ["Does he {play} soccer?", "plays ✕"]],
          tip: "의문사가 있으면 맨 앞에: Where do you live?"
        }
      ],
      qs: [
        { t: "mcq", q: "I ___ like spicy food.", o: ["don't", "doesn't", "am not", "isn't"], ko: "나는 매운 음식을 좋아하지 않는다.", ex: "일반동사 like의 부정. 주어가 I → don't" },
        { t: "mcq", q: "She ___ eat meat.", o: ["doesn't", "don't", "isn't", "aren't"], ko: "그녀는 고기를 먹지 않는다.", ex: "주어가 She(3인칭 단수) → doesn't" },
        { t: "mcq", q: "___ your brother play soccer?", o: ["Does", "Do", "Is", "Are"], ko: "네 남동생은 축구를 하니?", ex: "your brother는 3인칭 단수 → Does" },
        { t: "mcq", q: "Does he ___ in Seoul?", o: ["live", "lives", "living", "lived"], ko: "그는 서울에 사니?", ex: "Does 뒤에는 반드시 동사원형!" },
        { t: "mcq", q: "A: Do you know her?   B: Yes, I ___.", o: ["do", "does", "am", "is"], ko: "A: 그녀를 아니?  B: 응, 알아.", ex: "Do로 물으면 do로 대답해요. Yes, I do." },
        { t: "ox", q: "He doesn't like math.", a: true, ko: "그는 수학을 좋아하지 않는다.", ex: "doesn't 뒤에는 동사원형 like." },
        { t: "fix", q: "Do your sister speak English?", w: "Do", r: "Does", ko: "네 언니는 영어를 하니?", ex: "your sister는 3인칭 단수 → Does" },
        { t: "type", q: "They ___ (not + have) a car.", a: ["don't have", "do not have"], ko: "그들은 차가 없다.", ex: "주어가 They → don't + 동사원형 have" },
        { t: "order", ko: "너는 어디에 사니?", a: "Where do you live", end: "?", x: ["does"], ex: "의문사 + do + 주어 + 동사원형?" },
        { t: "order", ko: "그녀는 커피를 마시지 않는다.", a: "She does not drink coffee", x: ["drinks"], ex: "does not + 동사원형 drink" }
      ]
    },
    {
      id: "u04", title: "명사와 관사", sub: "a / an / the 와 복수형",
      cards: [
        {
          h: "하나일 땐 a / an",
          b: "셀 수 있는 명사가 **하나**일 때 앞에 a를 붙여요.\n**발음**이 모음(아·에·이·오·우)으로 시작하면 **an**!",
          ex: [["{a} book, {a} dog", "책 한 권, 개 한 마리"], ["{an} apple, {an} egg", "사과 한 개, 달걀 한 개"], ["{an} hour / {a} university", "h가 묵음 / '유'로 발음"]],
          tip: "철자가 아니라 '소리'가 기준이에요."
        },
        {
          h: "서로 아는 그것, the",
          b: "앞에서 말한 것, 서로 아는 것, 세상에 하나뿐인 것에는 **the**를 써요.",
          ex: [["I saw a cat. {The} cat was white.", "고양이를 봤어. 그 고양이는 하얬어."], ["{the} sun, {the} moon", "해, 달 (하나뿐)"], ["play {the} piano", "피아노를 치다 (악기 앞)"]]
        },
        {
          h: "여러 개일 땐 복수형",
          b: "보통 **-s**, 일부는 모양이 달라져요.",
          rows: [["대부분", "cat → cats"], ["-s, -x, -ch, -sh", "box → boxes"], ["자음 + y", "baby → babies"], ["불규칙", "man → men, child → children, tooth → teeth"]],
          tip: "water, money, information 같은 셀 수 없는 명사는 a도 복수형도 안 돼요."
        }
      ],
      qs: [
        { t: "mcq", q: "I have ___ umbrella.", o: ["an", "a", "two", "many"], ko: "나는 우산이 하나 있다.", ex: "umbrella는 모음 소리(어)로 시작 → an" },
        { t: "mcq", q: "She waited for ___ hour.", o: ["an", "a", "two", "many"], ko: "그녀는 한 시간 동안 기다렸다.", ex: "hour의 h는 소리가 안 나요(아워). 모음 소리 → an" },
        { t: "mcq", q: "He is ___ university student.", o: ["a", "an", "any", "two"], ko: "그는 대학생이다.", ex: "university는 '유'로 발음(자음 소리) → a" },
        { t: "mcq", q: "I bought a book. ___ book is very interesting.", o: ["The", "A", "An", "Many"], ko: "나는 책을 샀다. 그 책은 아주 재미있다.", ex: "앞에서 말한 바로 '그' 책 → The" },
        { t: "mcq", q: "There are three ___ in the room.", o: ["children", "child", "childs", "childrens"], ko: "방에 아이가 세 명 있다.", ex: "child의 복수형은 children (불규칙)" },
        { t: "mcq", q: "Can you play ___ piano?", o: ["the", "a", "an", "many"], ko: "너는 피아노를 칠 수 있니?", ex: "악기를 연주한다고 할 때는 play the + 악기" },
        { t: "ox", q: "I need some informations.", a: false, fix: "I need some information.", ko: "나는 정보가 좀 필요하다.", ex: "information은 셀 수 없는 명사라 -s를 붙일 수 없어요." },
        { t: "fix", q: "She has two baby.", w: "baby", r: "babies", ko: "그녀는 아기가 둘 있다.", ex: "둘이니까 복수형. 자음 + y → -ies" },
        { t: "type", q: "Brush your ___ (tooth) twice a day.", a: ["teeth"], ko: "하루에 두 번 이를 닦으세요.", ex: "tooth의 복수형은 teeth (불규칙)" },
        { t: "order", ko: "오늘 밤 달이 밝다.", a: "The moon is bright tonight", x: ["a"], ex: "하나뿐인 달에는 the를 붙여요." }
      ]
    }
  ]
});
