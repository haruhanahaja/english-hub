// 학습 데이터: 한 줄 = "영어 | 한국어 해석 | 듣기 팁(선택)"
// dialog: true 인 유닛은 두 사람이 번갈아 말하는 장면입니다.
// rate(기본 속도)는 1.0 아래로 내리지 않습니다. 1.0 = 목소리 본래의 속도이고, 그보다 느리면 소리를 늘여서 만들기 때문에 어색하게 들립니다.
// 데스크톱 앱(autoeng/core.py)과 웹(app.js)이 이 파일을 함께 읽습니다.
// 규칙: 문장 id 가 "레벨-파트:줄번호" 라서, 기존 줄의 순서를 바꾸거나 중간에 끼워 넣으면 학습 기록이 어긋납니다.
//       새 문장은 파트의 맨 끝에, 새 파트는 레벨의 맨 끝에 덧붙이세요. 필드 안에 | ` $ \ 는 쓰지 않습니다.
const COURSE = [
{
  id: 1, name: '첫걸음', rate: 1.0,
  desc: '2~5단어의 아주 짧은 문장',
  who: '영어 소리가 아직 낯선 분. 여기서 시작하세요.',
  goal: '천천히 말하는 짧은 문장을 듣고 뜻을 바로 떠올립니다.',
  units: [
    { title: '인사와 안부', lines: `
Hello.|안녕하세요.
Good morning.|좋은 아침이에요.
How are you?|어떻게 지내요?
I'm fine, thank you.|잘 지내요, 고마워요.
Nice to meet you.|만나서 반가워요.|meet you는 붙어서 '미츄'처럼 들려요.
See you later.|나중에 봐요.
Good night.|잘 자요.
Have a nice day.|좋은 하루 보내세요.|Have a는 '해버'로 이어져요.
Thank you so much.|정말 고마워요.
You're welcome.|천만에요.
Hi there.|안녕하세요.
Good afternoon.|좋은 오후예요.
Good evening.|좋은 저녁이에요.
How's it going?|어떻게 지내요?|How's it은 '하우짓'으로 이어져요.
Not bad.|나쁘지 않아요.|Not의 t는 거의 들리지 않아요.
Long time no see.|오랜만이에요.
Take care.|잘 지내요. / 조심히 가요.
See you soon.|곧 봐요.
Goodbye.|안녕히 가세요.
Have a good weekend.|주말 잘 보내세요.` },
    { title: '나를 소개하기', lines: `
My name is Mina.|제 이름은 미나예요.
I'm from Korea.|저는 한국에서 왔어요.
I live in Seoul.|저는 서울에 살아요.|live in은 '리빈'으로 이어져요.
I'm a student.|저는 학생이에요.
I'm thirty years old.|저는 서른 살이에요.
I have a sister.|저는 여자 형제가 한 명 있어요.
I like music.|저는 음악을 좋아해요.
I work at a bank.|저는 은행에서 일해요.|work at a는 '워캐러'처럼 한 덩어리로 들려요.
This is my friend.|이쪽은 제 친구예요.
I speak a little English.|저는 영어를 조금 해요.
I'm Korean.|저는 한국 사람이에요.
I'm married.|저는 결혼했어요.
I have two kids.|저는 아이가 둘 있어요.
I'm an office worker.|저는 회사원이에요.|I'm an office는 '아이머너피스'로 이어져요.
I was born in Busan.|저는 부산에서 태어났어요.
I like to cook.|저는 요리하는 걸 좋아해요.
My hobby is reading.|제 취미는 독서예요.
I live with my parents.|저는 부모님과 함께 살아요.
I'm learning English.|저는 영어를 배우고 있어요.
Call me Jay.|제이라고 불러 주세요.` },
    { title: '숫자와 시간', lines: `
It's three o'clock.|3시예요.
What time is it?|지금 몇 시예요?|time is it은 '타이미짓'으로 이어져요.
It's ten thirty.|10시 30분이에요.
I get up at seven.|저는 7시에 일어나요.|get up at은 '게러팻'처럼 들려요.
Today is Monday.|오늘은 월요일이에요.
See you tomorrow.|내일 봐요.
I have two cats.|저는 고양이 두 마리가 있어요.
It's five dollars.|5달러예요.
My birthday is in May.|제 생일은 5월이에요.
Wait a minute.|잠깐만요.|'웨이러 미닛'처럼 들려요.
It's half past six.|6시 반이에요.
It's a quarter to nine.|9시 15분 전이에요.|quarter to는 '쿼러루'처럼 들려요.
I go to bed at eleven.|저는 11시에 자요.
The class starts at nine.|수업은 9시에 시작해요.
I'm twenty years old.|저는 스무 살이에요.
It takes ten minutes.|10분 걸려요.
It's June first.|6월 1일이에요.
See you at noon.|정오에 봐요.
I need three tickets.|표 세 장이 필요해요.
It's almost midnight.|거의 자정이에요.` },
    { title: '기분과 상태', lines: `
I'm happy.|저는 행복해요.
I'm so tired.|너무 피곤해요.
I'm hungry.|배고파요.
I'm sorry.|미안해요.
I'm not sure.|잘 모르겠어요.
That's great!|정말 잘됐네요!
It's okay.|괜찮아요.
I feel sick.|몸이 안 좋아요.
I'm very busy today.|오늘 아주 바빠요.
Don't worry.|걱정하지 마세요.
I'm so excited.|정말 신나요.
I'm a little nervous.|조금 긴장돼요.
I'm thirsty.|목말라요.
I'm cold.|추워요.
I'm bored.|심심해요.
I feel great.|기분이 아주 좋아요.
I'm so sleepy.|너무 졸려요.
That's too bad.|그것참 안됐네요.
I'm scared.|무서워요.
Take it easy.|진정해요. / 쉬엄쉬엄해요.|'테이키리지'처럼 이어져요.` },
    { title: '간단한 질문', lines: `
What is this?|이게 뭐예요?
Where are you?|어디에 있어요?
Who is she?|그녀는 누구예요?
Do you like coffee?|커피 좋아해요?
Can you help me?|저 좀 도와줄 수 있어요?
Is it far?|먼가요?|Is it은 '이짓'으로 이어져요.
How much is it?|얼마예요?|much is it은 '머치짓'으로 이어져요.
Are you ready?|준비됐어요?
What do you want?|뭘 원해요?
Where is the bathroom?|화장실이 어디예요?
What's your name?|이름이 뭐예요?|What's your는 '와춰'처럼 들려요.
How old are you?|몇 살이에요?
Where are you from?|어디에서 왔어요?
Do you have time?|시간 있어요?
Is this yours?|이거 당신 거예요?
Who is that?|저 사람은 누구예요?
When is it?|그게 언제예요?
Why not?|왜 안 돼요? / 좋죠.
Which one?|어느 거요?
Can I sit here?|여기 앉아도 돼요?` },
    { title: '부탁과 대답', lines: `
Yes, please.|네, 부탁해요.
No, thank you.|아니요, 괜찮아요.
Excuse me.|실례합니다.
Come here, please.|이리 와 주세요.
Sit down, please.|앉아 주세요.
Please say it again.|다시 말해 주세요.|say it again은 '세이러겐'처럼 들려요.
I don't know.|모르겠어요.
I understand.|이해했어요.
One more time, please.|한 번만 더 부탁해요.
Let's go.|갑시다.
Sure.|물론이죠.
Of course.|당연하죠.
No problem.|문제없어요.
Just a moment.|잠시만요.
Help me, please.|도와주세요.
Open the door, please.|문 좀 열어 주세요.
Speak slowly, please.|천천히 말해 주세요.
Me too.|저도요.
I think so.|그런 것 같아요.
That's right.|맞아요.` },
  ],
},
{
  id: 2, name: '일상 회화', rate: 1.0,
  desc: '6~9단어의 생활 속 문장',
  who: '짧은 문장은 들리지만 길어지면 놓치는 분.',
  goal: '카페, 쇼핑, 길 찾기 같은 실제 상황의 문장을 한 번에 알아듣습니다.',
  units: [
    { title: '카페와 식당', lines: `
Can I have a coffee, please?|커피 한 잔 주시겠어요?|Can I는 '캐나이'로 이어져요.
I'd like a table for two.|두 명 자리 부탁해요.
What do you recommend?|뭘 추천하세요?
Can I see the menu, please?|메뉴판 좀 볼 수 있을까요?
I'll have the chicken salad.|치킨 샐러드로 할게요.
Could I get some water?|물 좀 주시겠어요?
This is really delicious.|이거 정말 맛있어요.
Can we have the check, please?|계산서 주시겠어요?
For here or to go?|드시고 가세요, 가져가세요?
Keep the change.|잔돈은 가지세요.
Could I have this without onions?|이거 양파 빼고 주실 수 있어요?
I'd like my steak medium, please.|스테이크는 미디엄으로 해 주세요.
Do you have any vegetarian dishes?|채식 메뉴가 있나요?
Can I get a refill on this?|이거 리필해 주실 수 있어요?
Is the tip included in the bill?|계산서에 팁이 포함되어 있나요?
We're still waiting for our drinks.|저희 음료가 아직 안 나왔어요.
I didn't order this, actually.|사실 이건 제가 주문한 게 아니에요.
Can I have a small latte to go?|작은 라테 한 잔 포장해 주세요.|to go = 포장해서 가져가는
Could we get separate checks, please?|따로 계산해 주시겠어요?
Everything was great, thank you.|전부 훌륭했어요, 감사합니다.` },
    { title: '쇼핑', lines: `
I'm just looking, thanks.|그냥 구경하는 중이에요, 고마워요.
Do you have this in a smaller size?|이거 더 작은 사이즈 있어요?
Can I try this on?|이거 입어 봐도 돼요?|try this on = 입어 보다
How much are these shoes?|이 신발 얼마예요?
It's a little too expensive.|조금 너무 비싸네요.
Do you take credit cards?|신용카드 받으세요?
I'll take this one.|이걸로 할게요.
Where is the fitting room?|탈의실이 어디예요?
Can I get a refund?|환불받을 수 있어요?
Is this on sale?|이거 세일 중이에요?
Do you have this in another color?|이거 다른 색 있어요?
I'm looking for a gift for my mom.|엄마께 드릴 선물을 찾고 있어요.
It doesn't fit me very well.|저한테 잘 안 맞아요.
Can you give me a discount?|할인해 주실 수 있어요?
I'd like to exchange this, please.|이거 교환하고 싶어요.
Do I need the receipt for that?|그러려면 영수증이 필요한가요?
Can I pay with my phone?|휴대폰으로 결제할 수 있어요?
What time do you close today?|오늘 몇 시에 문 닫아요?
I'll think about it and come back.|생각해 보고 다시 올게요.
Could you wrap it as a gift?|선물용으로 포장해 주시겠어요?|wrap it as a는 '래피래저'처럼 이어져요.` },
    { title: '길 찾기와 이동', lines: `
How do I get to the station?|역까지 어떻게 가요?
Go straight and turn left.|직진해서 왼쪽으로 도세요.
It's next to the bank.|은행 옆에 있어요.|next to는 t가 하나로 합쳐져 '넥스투'로 들려요.
Is there a bus stop near here?|이 근처에 버스 정류장 있어요?
How long does it take?|얼마나 걸려요?
It takes about ten minutes.|10분쯤 걸려요.
I think I'm lost.|길을 잃은 것 같아요.
Which bus goes to the airport?|어느 버스가 공항에 가요?
You can't miss it.|쉽게 찾으실 거예요.
Please take me to this address.|이 주소로 가 주세요.
Where is the nearest subway station?|가장 가까운 지하철역이 어디예요?
Is it within walking distance?|걸어갈 수 있는 거리예요?
It's across from the post office.|우체국 맞은편에 있어요.|across from = ~의 맞은편에
Turn right at the second corner.|두 번째 모퉁이에서 오른쪽으로 도세요.
You need to transfer at the next stop.|다음 정거장에서 갈아타야 해요.
Does this train go downtown?|이 기차 시내로 가요?
How much is the fare to the airport?|공항까지 요금이 얼마예요?
Can you show me on the map?|지도에서 보여 주실 수 있어요?
I'd like to get off here, please.|여기서 내릴게요.|get off = 내리다
Am I going the right way?|제가 맞는 방향으로 가고 있나요?` },
    { title: '가족과 친구', lines: `
My brother is older than me.|우리 형(오빠)은 저보다 나이가 많아요.
She is my best friend.|그녀는 제 가장 친한 친구예요.
We met in high school.|우리는 고등학교 때 만났어요.
My parents live in the country.|부모님은 시골에 사세요.
He looks just like his father.|그는 아버지를 꼭 닮았어요.
What does your sister do?|언니(누나/여동생)는 무슨 일을 해요?
I'm going to visit my grandmother.|할머니를 뵈러 갈 거예요.
We talk on the phone every day.|우리는 매일 통화해요.
They've been married for ten years.|그들은 결혼한 지 10년 됐어요.
I get along well with my family.|저는 가족과 잘 지내요.|get along with = ~와 잘 지내다
I have an older sister and a younger brother.|언니(누나) 한 명과 남동생이 한 명 있어요.
My best friend lives next door.|제 가장 친한 친구는 옆집에 살아요.
We've known each other since we were kids.|우리는 어릴 때부터 알고 지냈어요.
My dad taught me how to swim.|아빠가 수영하는 법을 가르쳐 주셨어요.
She just had a baby last month.|그녀는 지난달에 아기를 낳았어요.
My grandparents are coming over for dinner.|조부모님이 저녁 드시러 오세요.|come over = 집에 들르다
I take after my mom the most.|저는 엄마를 가장 많이 닮았어요.|take after = 닮다
We hang out almost every weekend.|우리는 거의 매주 주말에 같이 놀아요.|hang out = 어울려 놀다
He is the youngest in the family.|그는 집안의 막내예요.
I miss my family so much.|가족이 너무 보고 싶어요.` },
    { title: '하루 일과', lines: `
I usually wake up at six.|저는 보통 6시에 일어나요.
I take a shower every morning.|매일 아침 샤워를 해요.
I go to work by subway.|지하철로 출근해요.
I have lunch at noon.|정오에 점심을 먹어요.
I finish work at six o'clock.|6시에 일을 마쳐요.
I cook dinner for my family.|가족을 위해 저녁을 요리해요.
I watch TV after dinner.|저녁 식사 후에 TV를 봐요.
I go to bed around eleven.|11시쯤 잠자리에 들어요.
I work out three times a week.|일주일에 세 번 운동해요.|work out = 운동하다
What do you do on weekends?|주말에는 뭐 해요?
I have breakfast at seven thirty.|7시 30분에 아침을 먹어요.
I check my email first thing in the morning.|아침에 제일 먼저 이메일을 확인해요.|first thing = 맨 먼저
I walk my dog before work.|출근 전에 개를 산책시켜요.
I usually take the bus to school.|보통 버스를 타고 학교에 가요.
I do the laundry on Sundays.|일요일마다 빨래를 해요.
I get home around seven in the evening.|저녁 7시쯤 집에 도착해요.
I do the dishes right after dinner.|저녁을 먹고 바로 설거지를 해요.
I read a book before going to sleep.|자기 전에 책을 읽어요.
I take a nap on the weekend.|주말에는 낮잠을 자요.
I stayed up late last night.|어젯밤에 늦게까지 안 잤어요.|stay up = 안 자고 깨어 있다` },
    { title: '날씨와 계획', lines: `
It's really cold today.|오늘 정말 추워요.
It looks like it's going to rain.|비가 올 것 같아요.
Don't forget your umbrella.|우산 잊지 마세요.
What are you doing this weekend?|이번 주말에 뭐 해요?
I'm going to see a movie.|영화 보러 갈 거예요.
Do you want to come with us?|우리랑 같이 갈래요?
That sounds like fun.|재미있겠네요.
I'm sorry, I already have plans.|미안해요, 이미 약속이 있어요.
Let's meet at seven.|7시에 만나요.
I'm looking forward to it.|기대하고 있어요.|look forward to = ~을 기대하다
It's so hot and humid today.|오늘 너무 덥고 습해요.
It's supposed to snow tomorrow.|내일 눈이 온대요.|be supposed to = ~하기로 되어 있다
The weather is perfect for a picnic.|소풍 가기에 딱 좋은 날씨예요.
Do you have any plans for tonight?|오늘 밤에 무슨 계획 있어요?
I'm thinking of going hiking on Saturday.|토요일에 등산을 갈까 생각 중이에요.
Let's stay home and watch a movie.|집에 있으면서 영화나 봐요.
How about going out for dinner?|저녁 먹으러 나가는 건 어때요?
I'm free all day on Sunday.|일요일에는 하루 종일 한가해요.
Can we make it another day?|다른 날로 할 수 있을까요?
I can't wait for the summer vacation.|여름휴가가 너무 기다려져요.|can't wait = 몹시 기다려지다` },
  ],
},
{
  id: 3, name: '소리의 변화', rate: 1.0,
  desc: '줄임말·연음 — 영화가 안 들리는 진짜 이유',
  who: '글로 보면 아는데 귀로는 안 들리는 분.',
  goal: '원어민이 실제로 발음하는 방식(줄이고, 잇고, 약하게)에 귀를 맞춥니다.',
  units: [
    { title: 'gonna · wanna · gotta', lines: `
I'm gonna call you later.|나중에 전화할게.|gonna = going to
What are you gonna do?|너 어떻게 할 거야?|gonna = going to
I wanna go home.|집에 가고 싶어.|wanna = want to
Do you wanna grab a coffee?|커피 한잔할래?|wanna = want to
I gotta go now.|나 이제 가야 해.|gotta = (have) got to, '가라'처럼 들려요.
You gotta see this.|너 이거 꼭 봐야 해.|gotta = got to
I'm not gonna lie.|솔직히 말할게.|직역: 거짓말하지 않을게
She's gonna love it.|그녀가 정말 좋아할 거야.
I don't wanna talk about it.|그 얘기는 하고 싶지 않아.|talk about it은 '토커바우릿'으로 이어져요.
We gotta hurry up.|우리 서둘러야 해.
I'm gonna be late.|나 늦을 거야.|gonna = going to
It's gonna be okay.|괜찮을 거야.|It's gonna는 '잇츠거너'로 짧게 지나가요.
Are you gonna eat that?|너 그거 먹을 거야?
I was gonna tell you.|너한테 말하려고 했어.|was gonna = was going to
You're gonna regret this.|너 이거 후회할 거야.
I just wanna help.|난 그냥 돕고 싶은 거야.|wanna = want to
You wanna know why?|왜인지 알고 싶어?|Do가 빠진 질문이에요. 끝을 올려 말해요.
I've gotta get up early.|나 일찍 일어나야 해.|I've gotta에서 've는 거의 안 들려요.
You've gotta be kidding.|농담이겠지.
We're never gonna make it.|우린 절대 제시간에 못 가.|make it = 해내다, 제시간에 가다` },
    { title: '이어지는 소리 (연음)', lines: `
Check it out.|이것 좀 봐.|'체키라웃'처럼 한 덩어리로 들려요.
Pick it up.|그거 주워.|'피키럽'
Not at all.|전혀요.|'나래롤'
Come on in.|어서 들어와.|'커모닌'
Take a look at this.|이것 좀 봐 봐.|'테이커 루캣 디스'
I'll think about it.|생각해 볼게.|'띵커바우릿'
What's up?|무슨 일이야? / 잘 지내?|'와썹'
Can I get a glass of water?|물 한 잔 주실래요?|glass of는 '글래서'
Turn it off, please.|그것 좀 꺼 주세요.|'터니로프'
It's a piece of cake.|식은 죽 먹기야.|piece of는 '피서'
Hold on a second.|잠깐만 기다려.|'홀도너 세컨'
Fill it up, please.|가득 채워 주세요.|'필리럽'
Give it a try.|한번 해 봐.|'기비러 트라이'
Figure it out.|알아내 봐.|'피겨리라웃'
Look at this.|이것 좀 봐.|'루캣디스'
Wake up, it's time to go.|일어나, 갈 시간이야.|Wake up은 '웨이컵'
I ran out of time.|시간이 다 됐어.|ran out of는 '래나우러'
Get in the car.|차에 타.|'게린더 카'
That's none of your business.|네가 상관할 일이 아니야.|none of your는 '너너뷰어'
Put it away.|그거 치워.|'푸리러웨이'` },
    { title: '부드러워지는 T', lines: `
Can I get some water?|물 좀 주실래요?|water의 t는 'ㄹ'처럼: '워러'
That's a lot better.|훨씬 낫네.|better → '베러', a lot → '얼랏'
I got it.|알겠어.|'가릿'
What a beautiful city!|정말 아름다운 도시야!|beautiful → '뷰리풀', city → '시리'
Put it on the table.|그거 탁자 위에 놔.|'푸리론'
I'll see you at the party.|파티에서 봐.|party → '파리'
Let it go.|그냥 놔줘. / 잊어버려.|'레릿고'
It doesn't matter.|상관없어.|matter → '매러'
What are you doing?|뭐 하고 있어?|What are you → '와라유'
Get out of here!|여기서 나가! / 말도 안 돼!|'게라러 히어'
I need a bottle of water.|물 한 병이 필요해.|bottle → '바를', water → '워러'
Wait a second.|잠깐 기다려.|Wait a → '웨이러'
I'm getting ready.|준비하는 중이야.|getting → '게링'
She's a little busy.|그녀는 조금 바빠.|little → '리를'
Not again!|또야!|'나러겐'
What about you?|너는 어때?|'와러바우츄'
I bought it yesterday.|그거 어제 샀어.|bought it → '바릿'
Shut up and listen.|조용히 하고 들어 봐.|Shut up → '셔럽'
Go get it.|가서 가져와.|get it → '게릿'
I thought about it a lot.|그것에 대해 많이 생각했어.|thought about it → '또러바우릿'` },
    { title: '약해지는 단어', lines: `
I can do it.|나 할 수 있어.|긍정의 can은 약하게 '큰'으로 스쳐 지나가요.
I can't do it.|나 못 해.|부정의 can't는 강하고 길게 '캔-'으로 들려요.
Tell him I said hi.|그에게 안부 전해 줘.|tell him → h가 빠져 '텔름'
Give her a call.|그녀에게 전화해 봐.|give her → '기버'
A cup of coffee, please.|커피 한 잔 주세요.|of는 거의 '어'만 남아요: '커퍼'
I'd like salt and pepper.|소금이랑 후추 주세요.|and는 '은' 정도로 약해져요.
I went to the store.|가게에 갔었어.|to는 '투'가 아니라 '터'
What do you think?|어떻게 생각해?|What do you → '와루유'
Where did he go?|그는 어디 갔어?|did he → '디디'
I should've called you.|너한테 전화했어야 했는데.|should've → '슈르브'
I'm waiting for you.|너를 기다리고 있어.|for는 '포'가 아니라 '퍼'
Ask her out.|그녀에게 데이트 신청해.|ask her → '애스커'
What did he say?|그가 뭐라고 했어?|did he → '디디'
I could have done it.|내가 할 수도 있었는데.|could have → '쿠더'
It's from my mom.|엄마한테서 온 거야.|from은 '프럼'보다 '프름'에 가까워요.
One at a time.|한 번에 하나씩.|at a → '애러'
I don't like them.|난 그것들이 싫어.|them → '음'으로 약해져요.
Some of them are mine.|그중 몇 개는 내 거야.|Some of them → '서머뎀'
Is he coming?|그 사람 와?|Is he → '이지'
You and me.|너와 나.|and는 '앤' 또는 '은'` },
    { title: '축약형', lines: `
I'd love to.|그러고 싶어요.|I'd = I would
I'll be right back.|금방 돌아올게.|I'll은 '아이윌'이 아니라 '알'에 가까워요.
You'd better hurry.|서두르는 게 좋을 거야.|You'd = You had
I should've known.|진작 알았어야 했는데.|should've = should have
It would've been nice.|그랬다면 좋았을 텐데.|would've = would have
I haven't seen him.|그를 못 봤어.
She doesn't know yet.|그녀는 아직 몰라.
They're not coming.|그들은 안 와.|They're는 'there'와 똑같이 들려요.
We've been waiting for an hour.|우리 한 시간째 기다리고 있어.
That'll be fine.|그거면 괜찮을 거야.|That'll → '대를'
I've got to go.|가 봐야 해.|I've = I have
He's been busy lately.|그는 요즘 바빴어.|He's = He has
I wouldn't do that.|나라면 그렇게 안 해.|wouldn't → '우든'
You shouldn't have come.|넌 오지 말았어야 했어.|shouldn't have → '슈드너브'
I couldn't believe it.|믿을 수가 없었어.
It won't take long.|오래 안 걸릴 거야.|won't는 want와 달리 '오우' 소리가 나요.
There's nothing to worry about.|걱정할 거 하나도 없어.
Who's that?|저 사람 누구야?|Who's = Who is
What've you been up to?|그동안 뭐 하고 지냈어?|What've = What have
You'll see.|두고 보면 알 거야.|You'll → '율'` },
    { title: '빠른 일상 말투', lines: `
I dunno.|몰라.|dunno = don't know
Lemme see.|어디 보자.|lemme = let me
Gimme a second.|잠깐만 시간 좀 줘.|gimme = give me
Kinda, yeah.|응, 약간.|kinda = kind of
I'm sorta busy right now.|나 지금 좀 바빠.|sorta = sort of
Whatcha doing?|뭐 해?|whatcha = what are you
Gotcha.|알겠어. / 잡았다.|gotcha = got you
C'mon, let's go!|어서, 가자!|c'mon = come on
I'm outta here.|난 간다.|outta = out of
There's a lotta people here.|여기 사람 진짜 많다.|lotta = lot of
Betcha can't do it.|넌 못 할걸.|betcha = bet you
Didja eat yet?|밥은 먹었어?|didja = did you
Wouldja mind?|괜찮겠어요?|wouldja = would you
Ya know what I mean?|무슨 말인지 알지?|ya = you
Tell 'em I'm busy.|걔네한테 나 바쁘다고 해.|'em = them
Nothin' much.|별일 없어.|-ing의 g가 빠져요.
I'm tryna help.|도우려는 거야.|tryna = trying to
Coulda been worse.|더 나쁠 수도 있었어.|coulda = could have
Shoulda told me.|나한테 말했어야지.|shoulda = should have
I hafta go.|나 가야 해.|hafta = have to` },
  ],
},
{
  id: 4, name: '구동사와 관용 표현', rate: 1.0,
  desc: '쉬운 단어인데 뜻이 안 떠오르는 표현들',
  who: '단어는 다 들리는데 무슨 뜻인지 모르겠는 분.',
  goal: '영화 대사의 절반을 차지하는 구동사와 관용구를 소리째로 익힙니다.',
  units: [
    { title: '꼭 필요한 구동사 1', lines: `
I need to figure out what to do.|뭘 해야 할지 알아내야 해.|figure out = 알아내다
Can you pick me up at the airport?|공항으로 나 데리러 올 수 있어?|pick up = 데리러 가다
I ran into an old friend yesterday.|어제 옛 친구를 우연히 만났어.|run into = 우연히 마주치다
Let's put off the meeting until Friday.|회의를 금요일로 미루자.|put off = 미루다
She turned down the job offer.|그녀는 일자리 제안을 거절했어.|turn down = 거절하다
I'll look into it right away.|바로 알아볼게요.|look into = 조사하다
We ran out of milk.|우유가 다 떨어졌어.|run out of = ~이 다 떨어지다
He finally showed up an hour late.|그는 결국 한 시간 늦게 나타났어.|show up = 나타나다
Don't give up on your dream.|꿈을 포기하지 마.|give up on = ~을 포기하다
I came across this photo in a drawer.|서랍에서 이 사진을 우연히 발견했어.|come across = 우연히 발견하다
Can you turn up the volume a little?|소리 좀 키워 줄래?|turn up = (소리를) 키우다
I need to drop off this package.|이 소포를 맡기고 와야 해.|drop off = 맡기다, 내려 주다
She broke up with her boyfriend last week.|그녀는 지난주에 남자 친구와 헤어졌어.|break up with = ~와 헤어지다
Please fill out this form first.|먼저 이 양식을 작성해 주세요.|fill out = 작성하다
I grew up in a small town.|나는 작은 마을에서 자랐어.|grow up = 자라다
The plane took off on time.|비행기는 정시에 이륙했어.|take off = 이륙하다
Let me find out what's going on.|무슨 일인지 내가 알아볼게.|find out = 알아내다
I'm looking for my car keys.|내 차 열쇠를 찾고 있어.|look for = 찾다
He passed out from the heat.|그는 더위 때문에 기절했어.|pass out = 기절하다
We set up a meeting for Monday.|월요일로 회의를 잡았어.|set up = 마련하다, 잡다` },
    { title: '꼭 필요한 구동사 2', lines: `
Hang on, I'll be right there.|잠깐만, 금방 갈게.|hang on = 잠깐 기다리다
I can't put up with this noise anymore.|이 소음을 더는 못 참겠어.|put up with = 참다
Let's catch up over lunch sometime.|언제 점심 먹으면서 밀린 얘기 하자.|catch up = 밀린 얘기를 나누다
He came up with a great idea.|그가 멋진 아이디어를 생각해 냈어.|come up with = 생각해 내다
I'm trying to cut down on sugar.|설탕을 줄이려고 노력 중이야.|cut down on = ~을 줄이다
Could you fill me in on what happened?|무슨 일이 있었는지 알려 줄래요?|fill in = 자세히 알려 주다
It turned out to be a mistake.|그건 실수였던 걸로 밝혀졌어.|turn out = ~로 밝혀지다
I'll get back to you tomorrow.|내일 다시 연락드릴게요.|get back to = 다시 연락하다
She takes after her mother.|그녀는 엄마를 닮았어.|take after = 닮다
Things will work out in the end.|결국엔 다 잘될 거야.|work out = 잘 풀리다
I'm looking forward to seeing you.|너를 만나길 기대하고 있어.|look forward to = ~을 기대하다
Let's get together sometime next week.|다음 주 언제 한번 모이자.|get together = 모이다
The car broke down on the highway.|차가 고속도로에서 고장 났어.|break down = 고장 나다
I'll make up for it, I promise.|꼭 만회할게, 약속해.|make up for = 만회하다
She pointed out a mistake in the report.|그녀가 보고서의 실수를 지적했어.|point out = 지적하다
Don't bring up that subject again.|그 얘기는 다시 꺼내지 마.|bring up = (화제를) 꺼내다
I ended up staying home all weekend.|결국 주말 내내 집에 있었어.|end up = 결국 ~하게 되다
You should stand up for yourself.|네 입장은 네가 지켜야 해.|stand up for = ~을 옹호하다
I can't keep up with the class.|수업을 따라갈 수가 없어.|keep up with = ~을 따라가다
He backed out at the last minute.|그는 막판에 발을 뺐어.|back out = 발을 빼다` },
    { title: '자주 쓰는 관용 표현', lines: `
It's not a big deal.|별일 아니야.
I'm on my way.|지금 가는 중이야.
You can say that again.|내 말이 그 말이야.|직역하면 '다시 말해도 돼' — 강한 동의예요.
I have no idea what you mean.|무슨 말인지 전혀 모르겠어.
Let's call it a day.|오늘은 여기까지 하자.
It's up to you.|너한테 달렸어. / 네가 정해.
I'm running late.|나 늦을 것 같아.
Give me a break.|좀 봐줘. / 말도 안 돼.
That makes sense.|말이 되네. / 이해가 돼.
I changed my mind.|마음이 바뀌었어.
Better late than never.|늦더라도 안 하는 것보단 나아.
It's on me.|내가 살게.
I'm all ears.|귀 기울이고 있어. / 말해 봐.
Take your time.|천천히 해.
So far, so good.|지금까지는 순조로워.
It slipped my mind.|깜빡했어.|slip one's mind = 잊어버리다
I'm sick of this.|이거 지긋지긋해.|sick of = ~이 지긋지긋한
Hang in there.|조금만 버텨.
You never know.|그건 모르는 일이야.
Don't take it personally.|개인적인 감정으로 받아들이지 마.` },
    { title: '맞장구와 리액션', lines: `
Are you serious?|진심이야?
No way!|말도 안 돼!
You've got to be kidding me.|농담하는 거지?
I know what you mean.|무슨 말인지 알아.
That's what I thought.|내 생각도 그랬어.
Good for you!|잘됐다!
Fair enough.|그래, 일리 있네.
Tell me about it.|내 말이. / 누가 아니래.|'말해 줘'가 아니라 공감의 표현이에요.
I couldn't agree more.|전적으로 동의해.
It could be worse.|그나마 다행이야.|직역: 더 나쁠 수도 있었어
Seriously?|진짜야?
That's insane!|말도 안 돼, 대박이다!
I told you so.|내가 그랬잖아.
No wonder.|그럴 만도 하네.
You're telling me.|내 말이 그 말이야.|'네가 나한테 말하고 있다'가 아니라 강한 공감이에요.
That's a relief.|다행이다.
What a shame.|정말 아쉽다.
You can't be serious.|설마 진심은 아니겠지.
Same here.|나도 그래.
Lucky you!|좋겠다!` },
    { title: '약속과 전화', lines: `
Are you free this Friday night?|이번 금요일 밤에 시간 돼?
Can I call you back in five minutes?|5분 뒤에 다시 전화해도 될까?
Sorry, something came up.|미안, 일이 좀 생겼어.|come up = (일이) 생기다
Can we reschedule for next week?|다음 주로 일정을 다시 잡을 수 있을까?
I'll text you the address.|주소를 문자로 보낼게.
You're breaking up. I can't hear you.|소리가 끊겨. 안 들려.|break up = (통화가) 끊기다
Let me check my schedule.|일정 좀 확인해 볼게.
Sorry to keep you waiting.|기다리게 해서 미안해요.
Does two o'clock work for you?|2시 괜찮으세요?
I'll let you know as soon as I can.|가능한 한 빨리 알려 줄게.
Who's calling, please?|전화하신 분은 누구세요?
Can you hold on for a second?|잠깐만 기다려 줄래요?
I'm sorry, you have the wrong number.|죄송하지만 전화 잘못 거셨어요.
I'll call you right back.|바로 다시 전화할게.
My phone is about to die.|내 휴대폰이 곧 꺼질 것 같아.|about to = 막 ~하려는
Let's meet up in front of the theater.|극장 앞에서 만나자.|meet up = 만나다
Is it okay if I'm ten minutes late?|10분 늦어도 괜찮을까?
I'm afraid I can't make it tonight.|아쉽지만 오늘 밤엔 못 갈 것 같아.|make it = (약속에) 가다
What time should I come over?|몇 시에 가면 돼?
I tried calling you, but you didn't pick up.|전화했는데 네가 안 받더라.|pick up = (전화를) 받다` },
    { title: '직장과 일', lines: `
I'm swamped with work this week.|이번 주는 일에 파묻혀 있어.|swamped = 정신없이 바쁜
Can you send me the file by noon?|정오까지 파일 보내 줄 수 있어요?
Let's go over the details one more time.|세부 사항을 한 번 더 검토합시다.|go over = 검토하다
I'm in the middle of something.|지금 뭐 좀 하는 중이야.
The deadline has been moved up.|마감이 앞당겨졌어.|move up = 앞당기다
I'll take care of it.|제가 처리할게요.
We're short on time.|우리 시간이 부족해.
Could you give me a hand with this?|이것 좀 도와줄 수 있어요?|give a hand = 도와주다
I'm taking tomorrow off.|저 내일 쉬어요.
Let's wrap this up.|이제 마무리합시다.|wrap up = 마무리하다
I'll get it done by the end of the day.|오늘 안으로 끝낼게요.|get it done = 끝내다
Can we push the meeting back an hour?|회의를 한 시간 늦출 수 있을까요?|push back = 미루다
I'm working from home today.|저 오늘 재택근무해요.
Let me walk you through the plan.|계획을 차근차근 설명해 드릴게요.|walk through = 차근차근 설명하다
Keep me posted on any changes.|변동 사항 있으면 계속 알려 줘요.|keep posted = 계속 알려 주다
I'm behind on my emails.|이메일 답장이 밀렸어.|behind on = ~이 밀린
We need to come up with a plan B.|우리는 대안을 생각해 내야 해.|come up with = 생각해 내다
She just got promoted to manager.|그녀가 막 매니저로 승진했어.
I'm calling in sick today.|오늘 병가 낼게요.|call in sick = 아파서 못 나간다고 전화하다
Let's touch base next week.|다음 주에 다시 얘기합시다.|touch base = 잠깐 연락해 상황을 확인하다` },
  ],
},
{
  id: 5, name: '영화 속 대사', rate: 1.0,
  desc: '장르별로 자주 나오는 대사 패턴',
  who: '일상 회화는 되는데 영화는 여전히 빠르게 느껴지는 분.',
  goal: '장르마다 반복되는 대사 유형을 미리 귀에 넣어 둡니다.',
  units: [
    { title: '로맨스', lines: `
I can't stop thinking about you.|네 생각을 멈출 수가 없어.
I've never felt this way before.|이런 감정은 처음이야.
You mean the world to me.|넌 나에게 세상 전부야.
I don't want to lose you.|널 잃고 싶지 않아.
Why didn't you tell me sooner?|왜 더 일찍 말해 주지 않았어?|didn't you → '디든츄'
I thought we had something special.|우리 사이엔 특별한 게 있다고 생각했어.
It's not you, it's me.|네 잘못이 아니야, 내 문제야.
I'll wait for you, no matter how long it takes.|얼마나 걸리든 널 기다릴게.
We were meant to be together.|우린 함께할 운명이었어.|meant to be = ~할 운명인
Just give me one more chance.|딱 한 번만 더 기회를 줘.
I think I'm falling for you.|너한테 빠진 것 같아.|fall for = ~에게 반하다
You're the best thing that ever happened to me.|넌 내 인생 최고의 선물이야.
Where have you been all my life?|내 평생 넌 어디 있었던 거야?
I've been wanting to say this for a long time.|오래전부터 이 말을 하고 싶었어.
Do you believe in love at first sight?|첫눈에 반하는 사랑을 믿어?
I don't deserve you.|난 너한테 과분해.
Stay with me. Please, just stay.|내 곁에 있어 줘. 제발, 그냥 있어 줘.
I never stopped loving you.|널 사랑하는 걸 멈춘 적이 없어.
What are we doing? This is crazy.|우리 지금 뭐 하는 거야? 이건 미친 짓이야.
If you leave now, don't come back.|지금 떠나면 돌아오지 마.` },
    { title: '액션 · 스릴러', lines: `
Get down! Everybody get down!|엎드려! 모두 엎드려!
We don't have much time.|시간이 얼마 없어.
Put your hands where I can see them.|손을 내가 볼 수 있는 곳에 둬.
Trust me, I know what I'm doing.|날 믿어, 내가 뭘 하는지 알고 있어.
They're right behind us!|놈들이 바로 뒤에 있어!
Don't move, or you'll regret it.|움직이지 마, 안 그러면 후회할 거야.
We've got company.|불청객이 왔군.|직역은 '손님이 있다' — 적이 나타났다는 뜻이에요.
Cover me, I'm going in.|엄호해 줘, 내가 들어간다.
It's a trap. Get out of there!|함정이야. 거기서 나와!
This isn't over yet.|아직 끝난 게 아니야.
Go, go, go! Move it!|가, 가, 가! 움직여!
Drop your weapon, now!|무기 버려, 당장!
We need backup right away.|지금 당장 지원이 필요해.
Who sent you? Answer me!|누가 보냈어? 대답해!
He's getting away!|놈이 도망가고 있어!|get away = 달아나다
I'm running out of ammo.|총알이 떨어져 가.|ammo = ammunition(탄약)
Stay low and follow me.|몸을 낮추고 날 따라와.
You have ten seconds to decide.|결정할 시간을 10초 주지.
Nobody gets left behind.|아무도 두고 가지 않아.
I've got a bad feeling about this.|이거 느낌이 안 좋아.` },
    { title: '코미디 · 일상', lines: `
You've got to be out of your mind.|너 제정신이 아니구나.|out of your mind = 제정신이 아닌
That's the worst idea I've ever heard.|내가 들어 본 것 중 최악의 생각이야.
What could possibly go wrong?|설마 무슨 일이야 있겠어?
Well, that went better than expected.|음, 생각보다 잘됐네.
Don't look at me like that.|그런 눈으로 보지 마.
I can explain. Actually, no, I can't.|설명할 수 있어. 아니, 사실 못 하겠다.
Whose side are you on, anyway?|근데 넌 누구 편이야?
Long story short, I got fired.|간단히 말하면, 나 잘렸어.|long story short = 요약하자면
Remind me never to listen to you again.|다시는 네 말 듣지 말라고 나한테 알려 줘.
I'm not saying it was me, but it was me.|내가 그랬다는 건 아닌데, 내가 그랬어.
In my defense, I was left unsupervised.|변명하자면, 아무도 날 안 지켜봤잖아.|in my defense = 변명하자면
I have a plan. It's a terrible plan, but it's a plan.|계획이 있어. 끔찍한 계획이지만, 계획은 계획이야.
Please tell me you didn't just do that.|방금 그 짓 안 했다고 말해 줘.
Okay, nobody panic. I'm panicking.|자, 아무도 당황하지 마. 난 당황했어.
This is fine. Everything is fine.|괜찮아. 다 괜찮아.
Did you seriously just say that out loud?|그걸 진짜 입 밖으로 말한 거야?|out loud = 소리 내어
I'm too old for this.|이런 거 하기엔 내가 너무 늙었어.
Well, this is awkward.|음, 이거 어색하네.
You had one job. One job!|넌 딱 한 가지만 하면 됐어. 딱 하나!
That's not how any of this works.|이건 그렇게 되는 게 하나도 아니야.` },
    { title: '수사 · 법정', lines: `
Where were you on the night of the murder?|살인 사건이 있던 밤에 어디 있었습니까?
You have the right to remain silent.|당신은 묵비권을 행사할 권리가 있습니다.
I want to speak to my lawyer.|변호사와 얘기하고 싶습니다.
We found your fingerprints at the scene.|현장에서 당신 지문을 발견했습니다.
I'm telling you, I didn't do it.|정말이에요, 제가 안 했어요.
Something doesn't add up.|뭔가 앞뒤가 안 맞아.|add up = 말이 되다
Objection, Your Honor!|이의 있습니다, 재판장님!
The witness may step down.|증인은 내려가셔도 좋습니다.
He's hiding something. I can feel it.|그는 뭔가 숨기고 있어. 느낌이 와.
Case closed.|사건 종결.
Do you recognize the man in this photo?|이 사진 속 남자를 알아보시겠습니까?
We have a warrant to search the premises.|이 건물에 대한 수색 영장이 있습니다.|premises = 건물, 구내
You're under arrest.|당신을 체포합니다.
Anything you say can be used against you.|당신이 하는 모든 말은 불리하게 쓰일 수 있습니다.
Where did you get this money?|이 돈은 어디서 났습니까?
The evidence speaks for itself.|증거가 모든 걸 말해 줍니다.
I swear to tell the truth.|진실만을 말할 것을 맹세합니다.
No further questions, Your Honor.|더 이상 질문 없습니다, 재판장님.
He has an alibi for that night.|그는 그날 밤 알리바이가 있어.
We find the defendant not guilty.|피고인에게 무죄를 평결합니다.` },
    { title: 'SF · 모험', lines: `
We've lost contact with the ship.|우주선과 연락이 끊겼습니다.
This is impossible. It shouldn't exist.|이건 불가능해. 존재해선 안 되는 거야.
The fate of the world is in your hands.|세상의 운명이 네 손에 달렸어.
There's no turning back now.|이제 되돌아갈 수 없어.
Something about this place feels wrong.|이곳은 뭔가 이상한 느낌이 들어.
You were chosen for a reason.|네가 선택된 데는 이유가 있어.
Whatever happens, stay close to me.|무슨 일이 있어도 내 곁에 붙어 있어.
The system is shutting down.|시스템이 꺼지고 있습니다.
We're running out of oxygen.|산소가 떨어지고 있어.|run out of = ~이 다 떨어지다
It's now or never.|지금 아니면 기회는 없어.
I'm picking up a strange signal.|이상한 신호가 잡히고 있어.|pick up = (신호를) 잡다
How long was I asleep?|내가 얼마나 잠들어 있었지?
We are not alone out here.|이곳에 우리만 있는 게 아니야.
The map leads to a hidden cave.|지도는 숨겨진 동굴로 이어져.
Brace for impact!|충격에 대비해!
I've never seen anything like it.|이런 건 한 번도 본 적이 없어.
We have to go back for them.|그들을 데리러 돌아가야 해.
Once you go through that door, everything changes.|저 문을 지나면 모든 것이 달라져.
It's been waiting for us all along.|그건 처음부터 우리를 기다리고 있었어.|all along = 처음부터 줄곧
Set a course for home.|집으로 항로를 잡아.` },
    { title: '드라마 · 가족', lines: `
I'm so proud of you.|네가 정말 자랑스러워.
You can't keep running away from your problems.|계속 문제에서 도망칠 수는 없어.
I did what I thought was right.|난 옳다고 생각한 일을 했어.
You were never there for me.|넌 내 곁에 있어 준 적이 없어.|be there for = ~의 곁에 있어 주다
I'm not a kid anymore.|난 더 이상 어린애가 아니야.
It's never too late to start over.|다시 시작하기에 너무 늦은 때란 없어.
I should've been honest with you from the beginning.|처음부터 너에게 솔직했어야 했어.
Promise me you'll take care of yourself.|몸 잘 챙기겠다고 약속해 줘.
No matter what happens, we're family.|무슨 일이 있어도 우린 가족이야.
Sometimes you just have to let go.|때로는 그냥 놓아줘야 해.
I just want what's best for you.|난 그저 네가 잘되길 바랄 뿐이야.
You have no idea what I've been through.|내가 무슨 일을 겪었는지 넌 몰라.|be through = 겪다
Why can't you just be happy for me?|왜 그냥 기뻐해 주지 못해?
I'm sorry I wasn't a better father.|더 좋은 아빠가 되지 못해 미안하다.
We need to talk about what happened.|무슨 일이 있었는지 얘기 좀 해야겠어.
You remind me so much of your mother.|넌 네 엄마를 정말 많이 닮았구나.|remind A of B = A에게 B를 떠올리게 하다
I'm doing the best I can.|난 내가 할 수 있는 최선을 다하고 있어.
This is your home. It always will be.|여긴 네 집이야. 언제까지나 그럴 거야.
I forgive you. I already did.|널 용서해. 이미 용서했어.
Let's not fight anymore, okay?|우리 이제 그만 싸우자, 응?` },
  ],
},
{
  id: 6, name: '실전 장면', rate: 1.1,
  desc: '두 사람이 주고받는 영화식 대화',
  who: '문장은 들리는데 대화 흐름을 따라가기 벅찬 분.',
  goal: '자막 없이 한 장면을 처음부터 끝까지 따라갑니다. 먼저 「연속 듣기」로 통째로 들어 보세요.',
  units: [
    { title: '장면 1 — 카페에서의 재회', dialog: true, lines: `
Oh my gosh, is that really you?|세상에, 정말 너야?
Wow, it's been forever! How have you been?|와, 정말 오랜만이다! 어떻게 지냈어?
Pretty good, actually. I just moved back last month.|꽤 잘 지냈어. 지난달에 막 돌아왔어.
No way. I thought you were still living in New York.|말도 안 돼. 아직 뉴욕에 사는 줄 알았는데.
I was, but I got a job offer I couldn't turn down.|그랬지, 근데 거절할 수 없는 일자리 제안을 받았어.|turn down = 거절하다
That's amazing. We should definitely catch up sometime.|대단하다. 언제 꼭 밀린 얘기 좀 하자.
Are you doing anything right now? Let me buy you a coffee.|지금 뭐 해? 내가 커피 살게.
I'd love to, but I've got a meeting in ten minutes.|그러고 싶은데, 10분 뒤에 회의가 있어.
How about dinner this weekend, then?|그럼 이번 주말에 저녁 어때?
Sounds perfect. I'll text you.|완벽해. 문자할게.` },
    { title: '장면 2 — 취조실', dialog: true, lines: `
Let's go over this one more time. Where were you last night?|한 번 더 짚어 봅시다. 어젯밤 어디 있었죠?
I already told you. I was at home all night.|이미 말했잖아요. 밤새 집에 있었어요.
Then why did your neighbor see you leave around nine?|그럼 왜 이웃이 9시쯤 당신이 나가는 걸 봤을까요?
She must have been mistaken. It was dark.|그분이 잘못 본 거겠죠. 어두웠으니까요.
We've got you on camera at the gas station.|주유소 카메라에 당신이 찍혔어요.
Okay, fine. I went out, but only for a few minutes.|그래요, 좋아요. 나갔었어요, 하지만 몇 분뿐이었어요.
Why did you lie to us?|왜 우리한테 거짓말했죠?
Because I knew how it would look.|어떻게 보일지 알았으니까요.
You'd better start telling the truth right now.|지금 당장 사실대로 말하는 게 좋을 겁니다.
I want my lawyer. I'm not saying another word.|변호사를 불러 주세요. 한마디도 더 안 하겠어요.` },
    { title: '장면 3 — 공항의 이별', dialog: true, lines: `
So this is it, huh?|그럼 이제 정말 가는 거네?
I guess so. My flight leaves in an hour.|그런 것 같아. 비행기가 한 시간 뒤에 떠나.
You don't have to go, you know.|안 가도 되잖아.
We've been through this. It's a once-in-a-lifetime opportunity.|이 얘긴 이미 했잖아. 일생에 한 번뿐인 기회야.|be through this = 이미 다 얘기한 일이다
I know. I just wish things were different.|알아. 그냥 상황이 달랐으면 해서.
It's only for a year. It'll go by before you know it.|딱 1년이야. 눈 깜짝할 사이에 지나갈 거야.
A lot can happen in a year.|1년이면 많은 일이 일어날 수 있어.
Hey, look at me. Nothing's going to change between us.|저기, 날 봐. 우리 사이엔 아무것도 변하지 않아.
You'd better call me the second you land.|도착하자마자 바로 전화해야 해.|the second = ~하자마자
I will. I promise.|그럴게. 약속해.` },
    { title: '장면 4 — 사무실의 위기', dialog: true, lines: `
Have you seen the numbers? We're in serious trouble.|수치 봤어요? 우리 심각한 상황이에요.
Calm down. Tell me exactly what happened.|진정해요. 정확히 무슨 일인지 말해 봐요.
The client pulled out of the deal this morning.|고객이 오늘 아침 거래에서 손을 뗐어요.|pull out of = ~에서 빠지다
What? I thought we had it all wrapped up.|뭐라고요? 다 마무리된 줄 알았는데.
So did I. Apparently, they got a better offer.|저도요. 듣자 하니 더 좋은 제안을 받았대요.
All right. Who else knows about this?|알겠어요. 이 일을 또 누가 알죠?
Nobody yet. I came straight to you.|아직 아무도요. 바로 당신한테 왔어요.
Good. Let's keep it that way for now.|좋아요. 당분간은 그렇게 둡시다.
What are we going to tell the boss?|사장님께는 뭐라고 하죠?
Leave that to me. I'll figure something out.|그건 나한테 맡겨요. 방법을 찾아볼게요.` },
    { title: '장면 5 — 탈출', dialog: true, lines: `
The door's locked. We're stuck in here.|문이 잠겼어. 우리 여기 갇혔어.
Stand back. I'm going to break it down.|물러서. 내가 부술게.
Wait! Do you hear that? Somebody's coming.|잠깐! 저 소리 들려? 누가 오고 있어.
Quick, hide behind the desk.|빨리, 책상 뒤에 숨어.
We can't stay here. They'll find us sooner or later.|여기 있을 순 없어. 조만간 우릴 찾아낼 거야.
There's a window in the back. Can you make it?|뒤쪽에 창문이 있어. 갈 수 있겠어?|make it = 해내다
Do I have a choice?|나한테 선택권이 있어?
On three. One, two, three, go!|셋에 간다. 하나, 둘, 셋, 가!
I can't believe that actually worked.|그게 진짜 통하다니 믿기지 않아.
Don't celebrate yet. We're not out of the woods.|아직 좋아하긴 일러. 위기를 벗어난 게 아니야.|out of the woods = 위기를 벗어난` },
    { title: '장면 6 — 가족의 저녁 식사', dialog: true, lines: `
You've barely touched your food. What's on your mind?|음식에 거의 손도 안 댔구나. 무슨 생각 하니?
I have something to tell you, and you're not going to like it.|드릴 말씀이 있는데, 좋아하지 않으실 거예요.
Just say it. Whatever it is, we can handle it.|그냥 말해 보렴. 뭐든 우린 감당할 수 있어.
I dropped out of law school.|저 로스쿨 그만뒀어요.|drop out of = ~을 중퇴하다
You what? When did this happen?|뭐라고? 언제 그랬니?
A couple of months ago. I didn't know how to tell you.|두어 달 전에요. 어떻게 말씀드려야 할지 몰랐어요.
After everything we've done for you?|우리가 널 위해 한 그 모든 걸 두고?
I know, and I'm grateful. But it's my life.|알아요, 감사하고요. 하지만 제 인생이에요.
So what are you planning to do now?|그래서 이제 뭘 할 계획이니?
I want to open a restaurant. It's what I've always wanted.|식당을 열고 싶어요. 늘 원하던 일이에요.` },
    { title: '장면 7 — 첫 데이트', dialog: true, lines: `
You look amazing. I almost didn't recognize you.|정말 멋지다. 하마터면 못 알아볼 뻔했어.
Thanks. You clean up pretty well yourself.|고마워. 너도 차려입으니까 꽤 멋진데.|clean up well = 차려입으니 멋지다
I hope you're hungry. This place has the best pasta in town.|배고팠으면 좋겠다. 여기 파스타가 이 동네 최고거든.
I'm starving, actually. I skipped lunch.|사실 배고파 죽겠어. 점심을 걸렀거든.
So, what made you say yes?|그런데, 왜 좋다고 한 거야?
Honestly? You made me laugh.|솔직히? 네가 날 웃게 했잖아.
That's it? I thought it was my good looks.|그게 다야? 난 내 잘생긴 얼굴 때문인 줄 알았는데.
Don't push your luck.|너무 나가지는 마.|push one's luck = 운을 믿고 무리하다
Fair enough. Should we order some wine?|알았어. 와인 좀 시킬까?
Now you're talking.|이제야 말이 통하네.` },
    { title: '장면 8 — 진료실', dialog: true, lines: `
What seems to be the problem today?|오늘은 어디가 불편하신가요?
I've had this terrible headache for three days.|사흘째 두통이 너무 심해요.
Have you been getting enough sleep?|잠은 충분히 주무시고 있나요?
Not really. I've been working late every night.|별로요. 매일 밤 늦게까지 일했어요.
Any other symptoms? Dizziness, nausea?|다른 증상은요? 어지럽거나 메스꺼운 건요?
I get a little dizzy when I stand up.|일어설 때 조금 어지러워요.
I'd like to run a few tests, just to be safe.|만약을 위해 검사를 몇 가지 해 보겠습니다.|run a test = 검사를 하다
Is it something serious?|심각한 건가요?
Probably not, but let's not take any chances.|아마 아닐 겁니다만, 모험은 하지 맙시다.|take a chance = 모험을 하다
All right. Whatever you think is best.|알겠습니다. 선생님 판단대로 할게요.` },
    { title: '장면 9 — 인질 협상', dialog: true, lines: `
This is Detective Cole. Who am I speaking with?|저는 콜 형사입니다. 지금 누구와 통화하고 있죠?
You don't need my name. You need to listen.|내 이름은 알 필요 없어. 듣기나 해.
I'm listening. Just tell me everybody's okay in there.|듣고 있습니다. 안에 있는 사람들이 모두 무사하다고만 말해 줘요.
Nobody's hurt. Not yet.|아무도 안 다쳤어. 아직은.
Let's keep it that way. What do you want?|계속 그렇게 합시다. 원하는 게 뭡니까?
A car out front in twenty minutes. No tricks.|20분 안에 정문 앞에 차 한 대. 수작 부리지 말고.
I can do that, but I need something in return.|그렇게 할 수 있지만, 나도 대가로 뭔가 받아야겠어요.|in return = 대가로
You're in no position to make demands.|넌 뭘 요구할 처지가 아니야.
Let the kids go, and you'll get your car.|아이들을 보내 주면 차를 받게 될 겁니다.
You've got ten minutes. Don't make me regret this.|10분 주지. 후회하게 만들지 마.` },
    { title: '장면 10 — 면접', dialog: true, lines: `
Thanks for coming in. Did you find the place all right?|와 주셔서 감사합니다. 찾아오시는 데 어렵지 않았나요?
No trouble at all. Thank you for having me.|전혀요. 불러 주셔서 감사합니다.
So, tell me a little about yourself.|그럼, 자기소개를 간단히 해 주시겠어요?
I've spent the last five years working in marketing.|지난 5년 동안 마케팅 분야에서 일했습니다.
And why are you looking to leave your current job?|그런데 왜 지금 직장을 떠나려고 하시죠?
I've learned a lot there, but I'm ready for a new challenge.|그곳에서 많이 배웠지만, 새로운 도전을 할 준비가 됐습니다.
What would you say is your biggest weakness?|본인의 가장 큰 약점은 뭐라고 생각하세요?
I tend to take on too much at once.|한꺼번에 너무 많은 일을 떠맡는 경향이 있습니다.|take on = 떠맡다
Well, we could certainly use someone like that around here.|음, 여기선 그런 분이 꼭 필요하긴 하죠.|could use = ~이 필요하다
I'd be thrilled to be part of the team.|팀의 일원이 된다면 정말 기쁠 겁니다.` },
    { title: '장면 11 — 룸메이트와 피자', dialog: true, lines: `
Did you eat my leftovers again?|내 남은 음식 또 먹었어?
What leftovers? I have no idea what you're talking about.|무슨 남은 음식? 무슨 소린지 전혀 모르겠는데.
The pizza. It had my name on it.|피자 말이야. 내 이름 써 놨잖아.
Oh, that. I thought it was up for grabs.|아, 그거. 아무나 먹어도 되는 줄 알았지.|up for grabs = 누구나 가질 수 있는
It literally said, do not touch.|말 그대로 손대지 말라고 써 있었거든.
Okay, my bad. I'll buy you another one.|알았어, 내 잘못이야. 하나 새로 사 줄게.|my bad = 내 잘못이야
That's what you said last time.|지난번에도 그렇게 말했잖아.
This time I mean it. Extra cheese and everything.|이번엔 진심이야. 치즈 추가에 전부 다.
Fine. But you're doing the dishes for a week.|좋아. 대신 일주일 동안 설거지는 네가 해.
Deal. Wait, a whole week?|좋아. 잠깐, 일주일 내내?` },
    { title: '장면 12 — 한밤의 작전', dialog: true, lines: `
Is everyone in position?|모두 제자리에 있나?
Almost. Give me thirty more seconds.|거의. 30초만 더 줘.
We don't have thirty seconds. The guards change shifts at midnight.|30초도 없어. 경비가 자정에 교대한단 말이야.
Relax. I've done this a hundred times.|진정해. 이런 건 백 번도 넘게 해 봤어.
That's exactly what worries me.|바로 그게 걱정이라는 거야.
Okay, I'm in. The cameras are down.|좋아, 들어왔어. 카메라는 꺼졌어.
Nice work. You've got five minutes before they reboot.|잘했어. 재부팅되기 전까지 5분 남았어.
Five minutes? You said ten!|5분? 10분이라며!
Plans change. Grab the files and get out.|계획은 바뀌는 거야. 파일 챙겨서 나와.
You owe me big time for this.|이번 일로 나한테 크게 빚진 거야.|big time = 크게, 엄청나게` },
  ],
},
];
