/* -------------------------------------------------------------
   2026 Connect Retreat Bilingual Web App - app.js
   Responsive interactive questionnaire & scoring system
   Customized for Spiritual Gifts Profiler
------------------------------------------------------------- */

// --- 1. DATASETS FOR THE 4 QUIZZES ---

// A. LIFEWAY SURVEY (80 Questions, 16 Gifts)
// Mapped as:
// Leadership: 6, 16, 27, 43, 65
// Administration: 1, 17, 31, 47, 59
// Teaching: 2, 18, 33, 61, 73
// Knowledge: 9, 24, 39, 68, 79
// Wisdom: 3, 19, 48, 62, 74
// Prophecy: 10, 25, 40, 54, 69
// Discernment: 11, 26, 41, 55, 70
// Exhortation: 20, 34, 49, 63, 75
// Shepherding: 4, 21, 35, 50, 76
// Faith: 12, 28, 42, 56, 80
// Evangelism: 5, 36, 51, 64, 77
// Apostleship: 13, 29, 44, 57, 71
// Service/Helps: 14, 30, 46, 58, 72
// Mercy: 7, 22, 37, 52, 66
// Giving: 8, 23, 38, 53, 67
// Hospitality: 15, 32, 45, 60, 78

const LIFEWAY_QUESTIONS = [
  { id: 1, gift: "Administration", text: { en: "I have the ability to organize ideas, resources, time, and people effectively.", ko: "나는 생각, 자원, 시간, 사람들을 효과적으로 조직하고 관리하는 능력이 있다." } },
  { id: 2, gift: "Teaching", text: { en: "I am willing to study and prepare for the task of teaching.", ko: "나는 다른 사람들을 가르치기 위해 시간을 들여 성경을 공부하고 준비할 용의가 있다." } },
  { id: 3, gift: "Wisdom", text: { en: "I am able to relate the truths of God to specific situations.", ko: "나는 하나님의 진리의 말씀을 구체적인 삶의 상황에 잘 연결하여 적용할 수 있다." } },
  { id: 4, gift: "Shepherding", text: { en: "I have a God-given ability to help others grow in their faith.", ko: "나는 다른 사람들이 믿음 안에서 성장하도록 돕는 하나님이 주신 능력이 있다." } },
  { id: 5, gift: "Evangelism", text: { en: "I possess a special ability to communicate the truth of salvation.", ko: "나는 구원의 진리를 효과적으로 소통하고 전하는 특별한 능력이 있다." } },
  { id: 6, gift: "Leadership", text: { en: "I have the ability to make critical decisions when necessary.", ko: "나는 필요할 때 결단력 있게 중요한 결정을 내릴 수 있다." } },
  { id: 7, gift: "Mercy", text: { en: "I am sensitive to the hurts of people.", ko: "나는 다른 사람들의 서러움과 상처를 민감하게 느끼고 공감한다." } },
  { id: 8, gift: "Giving", text: { en: "I experience joy in meeting needs through sharing possessions.", ko: "나는 내 소유를 기꺼이 나눔으로써 다른 사람들의 필요를 채울 때 기쁨을 느낀다." } },
  { id: 9, gift: "Knowledge", text: { en: "I enjoy studying.", ko: "나는 성경 말씀이나 깊이 있는 진리를 개인적으로 연구하고 공부하는 것을 즐긴다." } },
  { id: 10, gift: "Prophecy", text: { en: "I have delivered God's message of warning and judgment.", ko: "나는 하나님의 경고와 심판의 메시지를 타협 없이 담대하게 선포한 적이 있다." } },
  { id: 11, gift: "Discernment", text: { en: "I am able to sense the true motivation of persons and movements.", ko: "나는 사람들의 말이나 행동 이면에 있는 진짜 동기와 영적인 흐름을 잘 분별한다." } },
  { id: 12, gift: "Faith", text: { en: "I have a special ability to trust God in difficult situations.", ko: "나는 어려운 상황 속에서도 하나님을 전적으로 신뢰하는 특별한 믿음이 있다." } },
  { id: 13, gift: "Apostleship", text: { en: "I have a strong desire to contribute to the establishment of new churches.", ko: "나는 새로운 교회를 개척하고 든든히 세우는 일에 참여하고 싶은 강한 갈망이 있다." } },
  { id: 14, gift: "Service/Helps", text: { en: "I take action to meet physical and practical needs rather than merely talking about or planning how to help.", ko: "나는 도움이 필요할 때 말이나 계획에 그치지 않고, 몸으로 직접 움직여 실제적인 필요를 채운다." } },
  { id: 15, gift: "Hospitality", text: { en: "I enjoy entertaining guests in my home.", ko: "나는 내 집으로 손님을 초대해 따뜻하게 대접하는 일을 즐거워한다." } },
  { id: 16, gift: "Leadership", text: { en: "I can adapt my guidance to fit the maturity of those working with me.", ko: "나는 함께 일하는 동역자들의 신앙 성숙도에 맞춰 내 지도 방식이나 조언을 유연하게 바꾼다." } },
  { id: 17, gift: "Administration", text: { en: "I can delegate and assign meaningful work.", ko: "나는 사람들에게 적절한 일을 배정하고 의미 있는 사역을 위임할 수 있다." } },
  { id: 18, gift: "Teaching", text: { en: "I have an ability and desire to teach.", ko: "나는 하나님의 말씀을 가르치는 일에 열정과 가르치고 싶은 깊은 갈망이 있다." } },
  { id: 19, gift: "Wisdom", text: { en: "I am usually able to analyze a situation correctly.", ko: "나는 복잡한 상황을 올바르게 분석하고 해결책을 찾아낼 수 있다." } },
  { id: 20, gift: "Exhortation", text: { en: "I have a natural tendency to encourage others.", ko: "나는 낙심하거나 주저하는 사람들을 위로하고 격려하며 세워주는 본능적인 성향이 있다." } },
  { id: 21, gift: "Shepherding", text: { en: "I am willing to take the initiative in helping other Christians grow in their faith.", ko: "나는 다른 기독교인들이 믿음 안에서 자라나도록 기꺼이 솔선수범하여 도우려 한다." } },
  { id: 22, gift: "Mercy", text: { en: "I have an acute awareness of other people's emotions, such as loneliness, pain, fear, and anger.", ko: "나는 외로움, 고통, 두려움, 분노 등 다른 사람들의 깊은 감정을 예민하게 인지한다." } },
  { id: 23, gift: "Giving", text: { en: "I am a cheerful giver.", ko: "나는 인색함 없이 기쁜 마음으로 헌금과 물질을 나누는 사람이다." } },
  { id: 24, gift: "Knowledge", text: { en: "I spend time digging into facts.", ko: "나는 사실과 성경의 진리를 탐구하고 파고드는 일에 기꺼이 시간을 들인다." } },
  { id: 25, gift: "Prophecy", text: { en: "I feel that I have a message from God to deliver to others.", ko: "나는 사람들에게 꼭 전해야 할 하나님으로부터 온 특별한 메시지가 있다고 느낀다." } },
  { id: 26, gift: "Discernment", text: { en: "I can recognize when a person is genuine/honest.", ko: "나는 어떤 사람이 진실하고 정직한지, 아니면 거짓된 상태인지 잘 알아챈다." } },
  { id: 27, gift: "Leadership", text: { en: "I am a person of vision (a clear mental portrait of a preferable future given by God). I am able to communicate vision in such a way that others commit to making the vision a reality.", ko: "나는 하나님이 주신 비전(바람직한 미래상)이 뚜렷하며, 다른 이들이 그 비전에 동참하게 만드는 능력이 있다." } },
  { id: 28, gift: "Faith", text: { en: "I am willing to yield to God's will rather than question and waver.", ko: "나는 내 뜻을 고집하기보다 하나님의 뜻에 기꺼이 순종하며 흔들리지 않는다." } },
  { id: 29, gift: "Apostleship", text: { en: "I would like to be more active in getting the gospel to people in other countries.", ko: "나는 타 문화권이나 해외에 복음을 전하는 일에 더 적극적으로 참여하고 싶다." } },
  { id: 30, gift: "Service/Helps", text: { en: "It makes me happy to do things for people in need.", ko: "나는 도움이 필요한 사람들을 위해 실질적인 일을 해줄 때 큰 행복을 느낀다." } },
  { id: 31, gift: "Administration", text: { en: "I am successful in getting a group to do its work joyfully.", ko: "나는 공동체나 조원들이 주어진 일을 기쁜 마음으로 해내도록 이끄는 일에 재능이 있다." } },
  { id: 32, gift: "Hospitality", text: { en: "I am able to make strangers feel at ease.", ko: "나는 낯선 사람이나 어색한 사람들을 편안하게 해주는 능력이 있다." } },
  { id: 33, gift: "Teaching", text: { en: "I have the ability to teach to a variety of different learning styles.", ko: "나는 배우는 사람들의 다양한 학습 스타일에 맞추어 효과적으로 가르칠 수 있다." } },
  { id: 34, gift: "Exhortation", text: { en: "I can identify those who need encouragement.", ko: "나는 주변에서 격려와 위로가 필요한 사람이 누구인지 잘 찾아낸다." } },
  { id: 35, gift: "Shepherding", text: { en: "I have trained Christians to be more obedient disciples of Christ.", ko: "나는 다른 기독교인들이 주님의 신실한 제자로 성장하도록 직접 훈련하고 가르쳐왔다." } },
  { id: 36, gift: "Evangelism", text: { en: "I am willing to do whatever it takes to see others come to Christ.", ko: "나는 한 영혼이라도 더 그리스도께 인도하기 위해서라면 어떤 대가라도 치를 용의가 있다." } },
  { id: 37, gift: "Mercy", text: { en: "I am drawn to people who are hurting.", ko: "나는 마음이 상하고 슬퍼하는 사람들에게 자연스럽게 마음이 끌린다." } },
  { id: 38, gift: "Giving", text: { en: "I am a generous giver.", ko: "나는 인색하지 않고 넉넉하게 베풀고 나누는 것을 즐거워한다." } },
  { id: 39, gift: "Knowledge", text: { en: "I am able to discover new truths in Scripture.", ko: "나는 성경 말씀을 읽을 때 새로운 진리와 영적인 통찰을 깨닫는 능력이 있다." } },
  { id: 40, gift: "Prophecy", text: { en: "I have spiritual insights from Scripture concerning issues and people that compel me to speak out.", ko: "나는 성경에 기록된 시대적 상황이나 사람들의 문제점을 꿰뚫고 경각심을 주는 영적 통찰이 있어 이를 담대히 말한다." } },
  { id: 41, gift: "Discernment", text: { en: "I can sense when a person is acting in accordance with God's will.", ko: "나는 어떤 사람의 행보나 모임이 하나님의 뜻에 부합하는지 잘 분별해낸다." } },
  { id: 42, gift: "Faith", text: { en: "I can trust in God even when things look dark.", ko: "나는 앞이 보이지 않는 캄캄한 상황 속에서도 오직 하나님만을 굳게 신뢰할 수 있다." } },
  { id: 43, gift: "Leadership", text: { en: "I can determine where God wants a group to go and help it get there.", ko: "나는 공동체가 나아가야 할 방향을 결정하고, 그 목표에 도달하도록 도울 수 있다." } },
  { id: 44, gift: "Apostleship", text: { en: "I have a strong desire to take the gospel to places where it has never been heard.", ko: "나는 복음이 한 번도 전해지지 않은 곳에 예수 그리스도의 소식을 전하고 싶은 강력한 갈망이 있다." } },
  { id: 45, gift: "Hospitality", text: { en: "I enjoy reaching out to new people in my church and community.", ko: "나는 교회나 모임에 처음 온 방문객들에게 먼저 다가가 환영하는 것을 좋아한다." } },
  { id: 46, gift: "Service/Helps", text: { en: "I am sensitive to the needs of people.", ko: "나는 주변 사람들의 신체적, 영적 필요에 대해 매우 민감하게 반응한다." } },
  { id: 47, gift: "Administration", text: { en: "I have been able to make effective and efficient plans for accomplishing the goals of a group.", ko: "나는 조직이나 모임의 목표를 달성하기 위해 효율적이고 구체적인 계획을 잘 수립한다." } },
  { id: 48, gift: "Wisdom", text: { en: "I am often am consulted when fellow Christians are struggling to make difficult decisions.", ko: "나는 동료 그리스도인들이 어려운 결정을 내리지 못해 고민할 때 자주 조언을 해주는 편이다." } },
  { id: 49, gift: "Exhortation", text: { en: "I think about how I can comfort and encourage others in my congregation.", ko: "나는 어떻게 하면 우리 교회 공동체 식구들을 따뜻하게 위로하고 격려할 수 있을지 자주 고민한다." } },
  { id: 50, gift: "Shepherding", text: { en: "I am able to give spiritual direction to others.", ko: "나는 다른 사람들에게 영적인 지도와 나아가야 할 신앙적 방향을 제시할 수 있다." } },
  { id: 51, gift: "Evangelism", text: { en: "I am able to present the gospel to lost persons in such a way that they accept the Lord and His salvation.", ko: "나는 믿지 않는 사람들에게 복음을 제시하여 그들이 주님을 영접하고 구원받도록 도울 수 있다." } },
  { id: 52, gift: "Mercy", text: { en: "I possess an unusual capacity to understand the feelings of those in distress.", ko: "나는 극심한 곤경에 처한 사람들의 처지와 감정을 깊이 공감하고 이해하는 특별한 능력이 있다." } },
  { id: 53, gift: "Giving", text: { en: "I have a strong sense of stewardship based on the recognition that God owns all things.", ko: "나는 내가 가진 모든 자원의 주인이 하나님이심을 깨닫고, 청지기 정신을 바탕으로 철저히 청지기 삶을 산다." } },
  { id: 54, gift: "Prophecy", text: { en: "I have delivered to other persons messages that have come directly from God.", ko: "나는 하나님께서 마음속에 주신 분명한 메시지를 다른 사람들에게 가감 없이 선포한 적이 있다." } },
  { id: 55, gift: "Discernment", text: { en: "I can sense when a person is acting under God's leadership.", ko: "나는 어떤 사람이 하나님의 올바른 인도하심을 따라 행동하고 있는지 직감적으로 분별한다." } },
  { id: 56, gift: "Faith", text: { en: "I try to be in God's will continually and be available for His use.", ko: "나는 늘 하나님의 뜻 안에 거하기 위해 애쓰며, 주님이 언제든 나를 사용하실 수 있도록 깨어 준비한다." } },
  { id: 57, gift: "Apostleship", text: { en: "I feel that I should take the gospel to people who have different beliefs from me.", ko: "나는 나와 신앙이나 문화적 배경이 다른 이들에게도 복음을 전해야 한다는 사명감을 느낀다." } },
  { id: 58, gift: "Service/Helps", text: { en: "I have an acute awareness of the physical needs of others.", ko: "나는 다른 사람들의 신체적이고 실제적인 필요를 아주 기민하게 파악한다." } },
  { id: 59, gift: "Administration", text: { en: "I am skilled in setting forth positive and precise steps of action.", ko: "나는 공동체가 실행해야 할 구체적이고 확실한 실천적 행동 단계들을 설계하는 데 재능이 있다." } },
  { id: 60, gift: "Hospitality", text: { en: "I like to meet visitors at church and make them feel welcome.", ko: "나는 교회 방문객들을 마중하고 그들이 환영받고 있음을 느끼게 해주는 것을 좋아한다." } },
  { id: 61, gift: "Teaching", text: { en: "I explain Scripture in such a way that others understand it.", ko: "나는 다른 사람들이 성경을 잘 이해하고 적용할 수 있도록 쉽고 명확하게 설명해준다." } },
  { id: 62, gift: "Wisdom", text: { en: "I can usually see spiritual solutions to problems.", ko: "나는 문제가 생겼을 때 세속적인 해결책보다 영적인 관점에서의 해결책을 먼저 찾아내곤 한다." } },
  { id: 63, gift: "Exhortation", text: { en: "I welcome opportunities to help people who need comfort, consolation, encouragement, and counseling.", ko: "나는 위로, 격려, 상담 또는 따뜻한 돌봄이 필요한 사람들을 기꺼이 돕는다." } },
  { id: 64, gift: "Evangelism", text: { en: "I feel at ease in sharing Christ with nonbelievers.", ko: "나는 믿지 않는 사람들에게 편안하게 다가가 예수 그리스도를 소개하고 복음을 전한다." } },
  { id: 65, gift: "Leadership", text: { en: "I can influence others to perform to their highest God-given potential.", ko: "나는 다른 사람들이 하나님이 주신 잠재력을 최대한 발휘하며 사역하도록 영향력을 발휘한다." } },
  { id: 66, gift: "Mercy", text: { en: "I recognize the signs of stress and distress in others.", ko: "나는 고통과 스트레스에 시달리는 사람들의 징후를 예리하게 감지한다." } },
  { id: 67, gift: "Giving", text: { en: "I desire to give generously and unpretentiously to worthwhile projects and ministries.", ko: "나는 가치 있는 선교 프로젝트나 사역 공동체에 인색함 없이 넉넉하게 물질을 후원한다." } },
  { id: 68, gift: "Knowledge", text: { en: "I can organize facts into meaningful relationships.", ko: "나는 성경의 수많은 사실들과 원리들을 하나의 체계적인 진리로 일목요연하게 정리하는 것을 좋아한다." } },
  { id: 69, gift: "Prophecy", text: { en: "God gives me messages to deliver to His people.", ko: "나는 하나님께서 그분의 백성들에게 전하라고 내 마음에 주신 엄중한 메시지를 대언하곤 한다." } },
  { id: 70, gift: "Discernment", text: { en: "I am able to sense whether people are being honest when they tell of their religious experiences.", ko: "나는 신앙적인 체험을 말하는 사람들이 진실하게 말하는 것인지 아니면 거짓인지 분별하는 영적 직감이 있다." } },
  { id: 71, gift: "Apostleship", text: { en: "I enjoy presenting the gospel to persons of other cultures and backgrounds.", ko: "나는 다른 문화적 배경과 정서를 가진 사람들에게 복음을 제시하고 전하는 것을 즐거워한다." } },
  { id: 72, gift: "Service/Helps", text: { en: "I enjoy doing little things that help people.", ko: "나는 다른 사람들을 실질적으로 도울 수 있는 작고 사소한 일들을 찾아 기쁘게 봉사한다." } },
  { id: 73, gift: "Teaching", text: { en: "I can give a clear, uncomplicated presentation of the gospel.", ko: "나는 복음을 아주 심플하고 군더더기 없이 명쾌하게 요약하여 설명할 수 있다." } },
  { id: 74, gift: "Wisdom", text: { en: "I have been able to apply biblical truth to the specific needs of my church.", ko: "나는 성경적 진리를 우리 교회나 조원들의 구체적인 상황과 필요에 맞게 지혜롭게 적용해왔다." } },
  { id: 75, gift: "Exhortation", text: { en: "God has used me to encourage others to live Christlike lives.", ko: "나는 동료들이 예수님을 닮아가는 삶을 살아가도록 말과 행동으로 긍정적인 영향을 준다." } },
  { id: 76, gift: "Shepherding", text: { en: "I have sensed the need to help other people become more effective in their ministries.", ko: "나는 다른 사람들이 각자의 영역에서 더 능동적이고 효과적으로 사역하도록 돕고 싶다." } },
  { id: 77, gift: "Evangelism", text: { en: "I like to talk about Jesus to those who do not know Him.", ko: "나는 예수님을 전혀 알지 못하는 이들과 만나 그분에 대해 이야기하는 것을 즐거워한다." } },
  { id: 78, gift: "Hospitality", text: { en: "I have the ability to make strangers feel comfortable in my home.", ko: "나는 낯선 방문객들이 내 집이나 모임에서 집처럼 편안하게 머물 수 있도록 배려한다." } },
  { id: 79, gift: "Knowledge", text: { en: "I have a wide range of study resources and know how to secure information.", ko: "나는 성경 연구를 위한 다양한 자료들을 확보하고 있으며, 필요한 정보를 올바르게 수집하는 법을 안다." } },
  { id: 80, gift: "Faith", text: { en: "I feel assured that a situation will change for the glory of God even when the situation seems impossible.", ko: "나는 도저히 해결 불가능해 보이는 상황 속에서도, 결국 모든 일이 하나님의 영광을 위해 해결될 것임을 확신한다." } }
];

// B. WAGNER-MODIFIED HOUTS SURVEY (110 Questions, 22 Gifts)
const WAGNER_QUESTIONS = [
  { id: 1, gift: "Prophecy", text: { en: "I have a desire to speak direct messages from God that edify, exhort, or comfort others.", ko: "나는 다른 이들을 격려하고 권면하고 위로하는 하나님의 메시지를 직접 말하고 싶은 갈망이 있다." } },
  { id: 2, gift: "Pastor", text: { en: "I have enjoyed relating to a certain group of people over a long period of time, sharing personally in their successes and failures.", ko: "나는 오랫동안 특정 그룹의 사람들과 관계를 맺고, 그들의 성공과 실패를 함께 나누는 것에 보람을 느낀다." } },
  { id: 3, gift: "Teaching", text: { en: "People have told me that I have helped them learn some biblical truth in a meaningful way.", ko: "사람들은 내가 성경적 진리를 깨닫고 배울 수 있도록 유용하게 가르쳤다고 말해준다." } },
  { id: 4, gift: "Wisdom", text: { en: "I have applied spiritual truth effectively to situations in my own life.", ko: "나는 삶 속의 다양한 상황 속에서 영적인 원리를 효과적으로 잘 적용하는 편이다." } },
  { id: 5, gift: "Knowledge", text: { en: "Others have told me that I have helped them distinguish key and important facts of scripture.", ko: "다른 사람들은 내가 성경의 중요하고 핵심적인 사실들을 깊이 있게 발견하고 해석해 낸다고 인정한다." } },
  { id: 6, gift: "Exhortation", text: { en: "I have verbally encouraged the wavering, the troubled or the discouraged.", ko: "나는 신앙이 흔들리거나, 시험에 들거나, 낙심한 사람들을 말로 격려해 주기를 잘한다." } },
  { id: 7, gift: "Discernment", text: { en: "Others in the church have noted that I was able to see through phoniness before it was evident to other people.", ko: "나는 어떤 사람의 언행이 진실한지, 혹은 위선이 섞였는지 남보다 먼저 직감적으로 식별할 수 있다." } },
  { id: 8, gift: "Giving", text: { en: "I find I manage money well in order to give liberally to the Lord's work.", ko: "나는 주님의 사역에 기꺼이 나누기 위해 내 소득과 재정을 규모 있게 잘 관리한다." } },
  { id: 9, gift: "Helps", text: { en: "I have assisted Christian leaders to relieve them for their essential job.", ko: "나는 교회의 영적 지도자들이 본연의 일에 더 집중할 수 있도록 그들의 실질적인 필요나 업무를 기쁨으로 돕는다." } },
  { id: 10, gift: "Mercy", text: { en: "I have a desire to work with those who have physical or mental problems, to alleviate their suffering.", ko: "나는 신체적, 정신적 고통을 겪는 이들과 함께 일하며 그들의 아픔을 덜어주고 위로하고 싶다." } },
  { id: 11, gift: "Missionary", text: { en: "I feel comfortable relating to people of other cultural backgrounds, and they seem to accept me.", ko: "나는 나와 다른 문화적 배경을 가진 이들과 관계를 맺는 것이 즐겁고 소통이 잘 되는 편이다." } },
  { id: 12, gift: "Evangelist", text: { en: "I have led others to a decision for salvation through faith in Christ.", ko: "나는 복음을 기쁜 마음으로 전하고 상대방이 믿음으로 그리스도를 영접하도록 적극적으로 인도한다." } },
  { id: 13, gift: "Hospitality", text: { en: "My home is always open to people passing through who need a place to stay.", ko: "나는 여행 중이거나 쉼이 필요한 사람들에게 내 집이나 방을 기꺼이 열어 제공하는 편이다." } },
  { id: 14, gift: "Faith", text: { en: "When in a group, I am often the one others often look to for vision and direction.", ko: "나는 모임에서 다른 사람들에게 하나님이 주신 비전과 믿음의 방향성을 선포하곤 한다." } },
  { id: 15, gift: "Leadership", text: { en: "When I speak people seem to listen and agree.", ko: "내가 모임이나 사역에 대해 이야기할 때 다른 사람들이 깊이 경청하고 동의하는 편이다." } },
  { id: 16, gift: "Administration", text: { en: "When a group I am in is lacking organization, I tend to step in and fill the gap.", ko: "나는 조직이나 모임이 무질서하고 뼈대가 부실할 때 이를 체계적으로 세우는 일을 자발적으로 맡아 해결한다." } },
  { id: 17, gift: "Miracles", text: { en: "Others can point to specific instances where my prayers have resulted in visible miracles.", ko: "다른 사람들은 내 기도를 통해 기적적인 주님의 일하심과 초자연적 변화가 일어난 구체적인 일들을 목격했다." } },
  { id: 18, gift: "Healing", text: { en: "In the name of the Lord, I have been used in curing diseases instantaneously.", ko: "나는 하나님의 이름으로 병이 기적적으로 치유되거나 고쳐지는 일에 사용된 적이 있다." } },
  { id: 19, gift: "Tongues", text: { en: "I have spoken in tongues.", ko: "나는 방언으로 기도하여 영적인 교감을 깊이 누린다." } },
  { id: 20, gift: "Interpretation of Tongues", text: { en: "Sometimes when a person speaks in tongues, I get an idea about what God is saying.", ko: "나는 모임에서 방언을 들을 때 하나님의 뜻이 무엇인지 마음속에 직감적으로 와닿을 때가 있다." } },
  { id: 21, gift: "Intercession", text: { en: "I spend at least an hour a day in prayer.", ko: "나는 하루에 한 시간 이상 꾸준히 기도와 묵상에 집중하는 것을 즐긴다." } },
  { id: 22, gift: "Service", text: { en: "I enjoy being called upon to do special jobs around the church.", ko: "나는 교회 안에서 크고 작은 실질적인 보직이나 심부름 같은 보조 사역을 맡을 때 보람이 크다." } },
  { id: 23, gift: "Prophecy", text: { en: "Through God, I have revealed specific things which will happen in the future.", ko: "나는 하나님이 알려주시는 특별한 마음을 통해 장차 일어날 미래의 일이나 경고를 깨닫고 말한 적이 있다." } },
  { id: 24, gift: "Pastor", text: { en: "I have enjoyed assuming responsibility for the spiritual well-being of a particular group of Christians.", ko: "나는 특정 그리스도인 그룹의 영적 웰빙과 지속적인 양육을 책임지고 인도하는 일이 기쁘다." } },
  { id: 25, gift: "Teaching", text: { en: "I feel I can explain the New Testament teaching about the health and ministry of the body of Christ in a relevant way.", ko: "나는 성경에 기록된 그리스도의 몸(교회)의 건강과 사역적 원리를 다른 이들에게 깊이 있게 가르쳐 줄 수 있다." } },
  { id: 26, gift: "Wisdom", text: { en: "I can intuitively arrive at solutions to fairly complicated problems.", ko: "나는 복잡하고 풀기 어려운 문제에 마주했을 때 성경적이고 실천적인 해결책을 직감적으로 잘 찾아낸다." } },
  { id: 27, gift: "Knowledge", text: { en: "I have had insights into spiritual truth which others have said helped bring them closer to God.", ko: "나는 성경 말씀을 연구하다 얻은 깊은 영적 통찰을 다른 이들에게 전하여 그들을 주님께로 이끌곤 한다." } },
  { id: 28, gift: "Exhortation", text: { en: "I can effectively motivate people to get involved in ministry when it's needed.", ko: "나는 어떤 사역이 지체되거나 필요할 때 다른 사람들이 열정적으로 참여하도록 설득하고 격려한다." } },
  { id: 29, gift: "Discernment", text: { en: "I can 'see' the Spirit of God resting on certain people from time to time.", ko: "나는 때때로 하나님의 영이 특정한 사람들에게 역사하고 머무시는지 영적으로 감지한다." } },
  { id: 30, gift: "Giving", text: { en: "My giving records show that I give considerably more than 10 percent of my income to the Lord's work.", ko: "나는 내가 얻은 수입에서 십일조 수준을 훌쩍 넘어서서 기꺼이 주님의 사역에 후원한다." } },
  { id: 31, gift: "Helps", text: { en: "Other people have told me that I helped them become more effective in their ministries.", ko: "다른 사람들은 내가 그들의 사역을 도움으로써 사역의 효율성이 크게 올라갔다고 격려해준다." } },
  { id: 32, gift: "Mercy", text: { en: "I have cared for others when they have had material or physical needs.", ko: "나는 물질적이나 물질외로 신체적 곤란과 결핍을 겪는 이들을 보살피고 돕는 일이 편안하다." } },
  { id: 33, gift: "Missionary", text: { en: "I feel I could learn another language well in order to minister to those in a different culture.", ko: "나는 다른 문화적 영역에 있는 사람들을 섬기기 위해서라면 새로운 언어라도 기꺼이 배울 의향이 있다." } },
  { id: 34, gift: "Evangelist", text: { en: "I have shared joyfully how Christ has brought me to Himself in a way that is meaningful to non-believers.", ko: "나는 믿지 않는 이들에게 그리스도가 내 인생을 어떻게 바꾸셨는지 지혜롭게 간증하길 좋아한다." } },
  { id: 35, gift: "Hospitality", text: { en: "I enjoy taking charge of church suppers or social gatherings.", ko: "나는 교회 친교 모임이나 단체 파티 등에서 행사 총괄이나 먹거리 대접을 관리하는 것을 좋아한다." } },
  { id: 36, gift: "Faith", text: { en: "I have believed God for the impossible and have seen it happen in a tangible way.", ko: "나는 인간적으로 도저히 불가능해 보이는 일도 하나님을 전적으로 의지하여 기적이 실현되는 것을 경험했다." } },
  { id: 37, gift: "Leadership", text: { en: "Other Christians have followed my leadership because they believed in me.", ko: "다른 그리스도인들은 내 성품과 비전을 신뢰하여 내 인도와 조언을 잘 따르는 편이다." } },
  { id: 38, gift: "Administration", text: { en: "I enjoy the details of organizing ideas, people, resources and time for more effective ministry.", ko: "나는 자원 배분, 예산 기획, 팀 운영 등 세부적인 프로젝트 관리를 체계적으로 기획하는 일을 잘한다." } },
  { id: 39, gift: "Miracles", text: { en: "God has used me personally to perform supernatural signs and wonders.", ko: "주님께서는 나를 사용하여 인생의 거대한 장벽이나 불가능한 환경을 깨뜨리시는 놀라운 주권적 역사를 보여주셨다." } },
  { id: 40, gift: "Healing", text: { en: "I enjoy praying for sick people because I know that many of them will be healed as a result.", ko: "나는 아픈 환자들을 위해 믿음으로 기도하는 것을 주저하지 않으며, 치유의 결과를 확신한다." } },
  { id: 41, gift: "Tongues", text: { en: "I have spoken an immediate message of God to His people in a language that I have never learned.", ko: "나는 내가 배우지 않은 영적인 언어(방언)로 하나님께 대언하거나 깊이 기도한 적이 있다." } },
  { id: 42, gift: "Interpretation of Tongues", text: { en: "I have interpreted tongues with the result that the body of Christ was edified, exhorted, or comforted.", ko: "나는 방언의 메시지를 이해하여 회중들이 깨달을 수 있는 교훈으로 올바르게 설명한 경험이 있다." } },
  { id: 43, gift: "Intercession", text: { en: "When I hear a prayer request, I pray for that need for several days at least.", ko: "나는 기도 제목을 들으면 단번에 끝내지 않고 며칠간 간절히 가슴에 품고 지속해서 기도한다." } },
  { id: 44, gift: "Service", text: { en: "I don't have many special skills, but I do what needs to be done around the church.", ko: "나는 대단한 특기나 기술은 없어도, 보이지 않는 곳에서 청소, 청지기 등 교회의 필요를 채우는 섬김을 잘한다." } },
  { id: 45, gift: "Prophecy", text: { en: "People have told me that I have communicated timely and urgent messages which have come directly from the Lord.", ko: "사람들은 내 전언이나 메시지를 통해 그들의 막힌 영안이 열리고 적절한 시기에 큰 깨달음을 얻었다고 전한다." } },
  { id: 46, gift: "Pastor", text: { en: "I feel unafraid of giving spiritual guidance and direction to a group of Christians.", ko: "나는 소그룹이나 그리스도인 그룹의 신앙을 정성껏 보살피고 지도하는 일에 특별히 두려움이 없다." } },
  { id: 47, gift: "Teaching", text: { en: "I can devote considerable time to learning new biblical truths in order to communicate them to others.", ko: "나는 가르칠 내용을 완벽히 설명하기 위해 오랜 시간 동안 심도 있게 조사하고 준비하는 것을 즐긴다." } },
  { id: 48, gift: "Wisdom", text: { en: "When a person has a problem I can frequently guide them to the best Biblical solution.", ko: "누군가 고민이나 어려움에 처했을 때, 나는 그들에게 성경 말씀에 근거한 구체적인 해결책을 찾아 잘 알려준다." } },
  { id: 49, gift: "Knowledge", text: { en: "Through study or experience, I have discerned major strategies or techniques God seems to use in furthering His kingdom.", ko: "나는 연구나 개인적 경험을 통해, 하나님이 그분의 나라를 세우시기 위해 역사하시는 거대한 전략적 흐름을 감지한다." } },
  { id: 50, gift: "Exhortation", text: { en: "People come to me in their afflictions or suffering and have told me that they have been helped, relieved and healed.", ko: "아픔이나 고통을 겪는 사람들이 나에게 와서 위로를 받고 회복이나 심적인 치유를 경험했다고 말한다." } },
  { id: 51, gift: "Discernment", text: { en: "I can tell with a fairly high degree of assurance when a person is afflicted by an evil spirit.", ko: "나는 어떤 사람이나 상황이 어둠의 영적인 세력에 억눌려 있는지 높은 확률로 감지해 낸다." } },
  { id: 52, gift: "Giving", text: { en: "When I am moved by an appeal to give to God's work, I usually find the money that I need to do it.", ko: "나는 사역 프로젝트의 긴급한 헌금 요청을 받았을 때, 내 가용 한도 이상으로 채워질 것을 믿고 후원한다." } },
  { id: 53, gift: "Helps", text: { en: "I have enjoyed doing routine tasks that led to more effective ministry by others.", ko: "나는 공동체 리더들이 더 가치 있는 일에 집중할 수 있도록 묵묵히 서류 기획이나 장비 셋업 같은 보조 업무를 돕는다." } },
  { id: 54, gift: "Mercy", text: { en: "I enjoy visiting in hospitals and/or retirement homes, and feel I do well in such a ministry.", ko: "나는 병원, 노인 요양원 또는 소외된 보호시설을 방문해 그들을 돌보고 위로하는 일을 아주 가치 있게 여긴다." } },
  { id: 55, gift: "Missionary", text: { en: "People of a different race or culture have been attracted to me, and we have related well.", ko: "나는 언어나 인종이 다른 외국인들과도 어색함 없이 친근하게 친밀함을 형성하며 깊은 우정을 쌓는다." } },
  { id: 56, gift: "Evangelist", text: { en: "Non-Christians have noted that they feel comfortable when they are around me, and that I have a positive effect on them toward developing a faith in Christ.", ko: "비기독교인들은 내 곁에서 편안함을 느끼며, 대화를 통해 예수님께로 호감을 가지는 경향이 있다." } },
  { id: 57, gift: "Hospitality", text: { en: "When people come to our home, they indicate that they 'feel at home' with us.", ko: "우리 집에 방문하는 사람들은 한결같이 내 집이 정말 편하고 따뜻해서 '내 집 같다'고 이야기한다." } },
  { id: 58, gift: "Faith", text: { en: "Other people have told me that I had faith to accomplish what seemed impossible to them.", ko: "사람들은 내 모습을 보고 큰 난관 앞에서도 굴하지 않는 특별한 담대함과 믿음을 가지고 있다고 말한다." } },
  { id: 59, gift: "Leadership", text: { en: "When I set goals, others seem to accept them readily.", ko: "내가 사역 목표나 방향성을 정하면, 팀원들이 적극적으로 동조하며 동참해 준다." } },
  { id: 60, gift: "Administration", text: { en: "I have been able to make effective and efficient plans for accomplishing the goals of a group.", ko: "나는 모임이나 팀이 목표를 이룰 수 있도록 효율적이고 구체적인 계획을 체계적으로 수립하는 편이다." } },
  { id: 61, gift: "Miracles", text: { en: "God regularly seems to do impossible things through my life.", ko: "하나님께서는 내가 상상하지 못한 방식으로 삶의 큰 막힘들을 열어주시는 초자연적인 돌파를 자주 보여주신다." } },
  { id: 62, gift: "Healing", text: { en: "Others have told me that God healed them of an emotional problems when I ministered to them.", ko: "나는 상처 입고 마음이 무너진 이들을 위해 기도해 주고 돌볼 때 그들의 감정이 치유되는 것을 경험했다." } },
  { id: 63, gift: "Tongues", text: { en: "I can speak to God in a language I have never learned.", ko: "나는 기도의 깊은 단계에서 하나님과 신비로운 언어(방언)로 깊은 소통을 나누곤 한다." } },
  { id: 64, gift: "Interpretation of Tongues", text: { en: "I have prayed that I may interpret if someone begins speaking in tongues.", ko: "나는 방언 기도를 드릴 때 다른 사람들에게 이 유익한 영적 교훈이 올바르게 선포되도록 통역의 지혜를 구한다." } },
  { id: 65, gift: "Intercession", text: { en: "Intercessory prayer is one of my favourite ways of spending time.", ko: "나는 조용히 골방에 들어가 누군가를 위해 드리는 중보기도 시간이 하루 중 가장 보람 있고 즐거운 시간이다." } },
  { id: 66, gift: "Service", text: { en: "Others have mentioned that I seem to enjoy routine tasks and do well at them.", ko: "동료들은 내가 작고 소박한 봉사 사역을 맡아서 할 때도 귀찮아하지 않고 기쁨으로 해낸다고 인정해 준다." } },
  { id: 67, gift: "Prophecy", text: { en: "I sometimes have a strong sense of what God wants to say to people in response to a particular situation.", ko: "나는 특정한 환경에 직면한 이들에게 하나님이 지금 무어라 말씀하시며 위로하시는지 영적인 마음을 깊이 느낀다." } },
  { id: 68, gift: "Pastor", text: { en: "I have helped fellow believers by guiding them to relevant portions of the Bible and praying with them.", ko: "나는 흔들리는 지체들과 성경을 같이 찾아서 읽고 그 구절을 묵상하며 기도해 주는 일을 기쁘게 수행한다." } },
  { id: 69, gift: "Teaching", text: { en: "I feel I can communicate Biblical truths to others and see resulting changes in knowledge, attitudes, values, or conduct.", ko: "나는 성경의 교훈들을 체계적이고 설득력 있게 전달하여 듣는 이들의 가치관과 태도에 긍정적인 변화를 일으킨다." } },
  { id: 70, gift: "Wisdom", text: { en: "Some people indicate that I have perceived and applied Biblical truth to the specified needs of fellow believers.", ko: "지체들은 내가 자신들의 아픔이나 상황에 꼭 맞는 성경 말씀과 진리를 지혜롭게 조언해 주었다고 고마워한다." } },
  { id: 71, gift: "Knowledge", text: { en: "I study and read quite a bit in order to learn new Biblical truths.", ko: "나는 성경 속 새로운 깨달음과 계시를 파악하기 위해 관련 주석이나 책을 찾아 심도 있게 독서한다." } },
  { id: 72, gift: "Exhortation", text: { en: "I have a desire to effectively counsel the perplexed, the guilty or the addicted.", ko: "나는 삶에 중독이나 상처, 죄책감을 가진 고통받는 사람들을 올바르게 상담하고 도와주고 싶은 열망이 있다." } },
  { id: 73, gift: "Discernment", text: { en: "I can recognize whether a person's teaching is from God, from Satan, or of human origin.", ko: "나는 어떤 설교나 주장이 하나님으로부터 온 참된 진리인지, 거짓 교리나 잘못된 사상인지 정확히 가려낼 수 있다." } },
  { id: 74, gift: "Giving", text: { en: "I am so confident that God will meet my needs that I give to Him sacrificially and consistently.", ko: "나는 하나님의 공급하심을 확고히 믿기 때문에, 내 형편이 넉넉하지 않을 때도 물질을 헌신한다." } },
  { id: 75, gift: "Helps", text: { en: "When I do things behind the scenes and others are helped, I am joyful.", ko: "나는 드러나지 않는 그늘에서 일하면서, 공동체가 잘 굴러가고 다른 지체들이 빛을 보는 것 자체에 큰 보람을 느낀다." } },
  { id: 76, gift: "Mercy", text: { en: "People call on me to help those who are less fortunate.", ko: "주변 사람들은 내게 소외되고 어려운 이웃을 돕는 가치 있는 봉사 프로젝트를 제안하거나 함께하자고 권한다." } },
  { id: 77, gift: "Missionary", text: { en: "I would be willing to leave comfortable surroundings if it would enable me to share Christ with more people.", ko: "나는 복음을 위해 전도할 수만 있다면, 내가 익숙하고 편안해하는 환경과 주거지를 기꺼이 옮겨갈 각오가 있다." } },
  { id: 78, gift: "Evangelist", text: { en: "I get frustrated when others don't seem to share their faith with unbelievers as much as I do.", ko: "나는 지체들이 복음을 전하거나 새신자를 정착시키는 사명에 열정을 쏟지 않는 모습을 볼 때 안타까움을 느낀다." } },
  { id: 79, gift: "Hospitality", text: { en: "Others have mentioned to me that I am a very hospitable person.", ko: "우리 집에 방문했던 사람들은 내가 손님을 극진히 모시고 정성을 다해 대접하는 환대의 사람이라고 입을 모은다." } },
  { id: 80, gift: "Faith", text: { en: "There have been times when I have felt sure I knew God's specific will for the future growth of His work, even when others did not been so sure.", ko: "사역의 돌파구나 비전이 보이지 않아 다른 이들이 낙심할 때도, 나는 하나님이 결국 일하실 것임을 굳게 믿는다." } },
  { id: 81, gift: "Leadership", text: { en: "When I join a group, others seem to back off and expect me to take the leadership.", ko: "내가 어떤 공동체에 들어가면, 다른 사람들은 나를 자연스레 핵심 리더십으로 존중하며 이끌어주길 기대한다." } },
  { id: 82, gift: "Administration", text: { en: "I am able to give directions to others without using persuasion to get them to accomplish a task.", ko: "나는 억지나 고압적인 지시가 아니라, 사람들을 인격적으로 배려하면서도 책임 있게 일을 조율하여 완수한다." } },
  { id: 83, gift: "Miracles", text: { en: "People have told me that I was God's instrument which brought supernatural changes in lives or circumstances.", ko: "지체들은 내 돌봄과 선포를 통해 그들의 삶에 하나님의 놀라운 초자연적 도우심과 환경이 바뀌는 것을 경험했다고 말한다." } },
  { id: 84, gift: "Healing", text: { en: "I have prayed for others and physical healing has occurred.", ko: "나는 질병에 시달리는 이들의 치유를 위해 기도하여 실질적인 회복의 역사를 맛본 적이 있다." } },
  { id: 85, gift: "Tongues", text: { en: "When I give a public message in tongues, I expect it to be interpreted.", ko: "나는 성령이 회중들에게 방언을 주실 때, 이를 온전히 알아들어 공동체에 유익한 통역의 말씀이 전해지길 갈망한다." } },
  { id: 86, gift: "Interpretation of Tongues", text: { en: "I have interpreted tongues in a way that seemed to bless others.", ko: "나는 방언 통역을 통해 예배에 온 지체들의 영성이 격려와 위로를 받도록 이바지한 경험이 있다." } },
  { id: 87, gift: "Intercession", text: { en: "Others have told me that my prayers for them have been answered in tangible ways.", ko: "동료들은 내가 그들을 위해 드린 약속의 기도가 실제로 하나님의 때에 명확히 응답받았다고 확인해준다." } },
  { id: 88, gift: "Service", text: { en: "I prefer being active and doing something rather than just sitting around talking or reading or listening to a speaker.", ko: "나는 가만히 앉아서 말로만 의논하는 회의보다, 팔을 걷어붙이고 직접 무언가를 나르고 조립하는 몸동작 봉사가 좋다." } },
  { id: 89, gift: "Prophecy", text: { en: "I sometimes feel that I know exactly what God wants me to do in ministry at a specific point in time.", ko: "나는 특정 순간에 하나님의 나라를 위해 내가 감당해야 할 정확한 소명과 행보를 확신하는 편이다." } },
  { id: 90, gift: "Pastor", text: { en: "People have told me that I have helped them to be restored to the Christian community.", ko: "지체들은 힘든 영적 침체나 방황 속에 빠졌을 때 내가 다가가 그들을 다시 교회 공동체로 회복시켰다고 말한다." } },
  { id: 91, gift: "Teaching", text: { en: "Studying the Bible and sharing my insights with others is very satisfying for me.", ko: "성경을 묵상하고 그 안에 담긴 놀라운 구속의 역사와 지혜를 사람들과 함께 토론하고 가르치는 것이 내 삶의 낙이다." } },
  { id: 92, gift: "Wisdom", text: { en: "I have felt an unusual presence of God and personal confidence when important decisions needed to be made.", ko: "나는 매우 신중하고 리스크가 큰 결정을 내려야 할 때 하나님의 임재와 깊은 평안을 누리며 결단하곤 한다." } },
  { id: 93, gift: "Knowledge", text: { en: "I have the ability to discover new truths for myself through reading or observing situations firsthand.", ko: "나는 성경이나 학술 서적을 읽으면서, 그 안의 복합적인 핵심 이론과 메시지를 독창적으로 포착해 정리하는 편이다." } },
  { id: 94, gift: "Exhortation", text: { en: "I have urged others to seek a Biblical solution to their affliction or suffering.", ko: "나는 역경에 부딪혀 무기력해진 지체들에게 다가가 성경의 위대한 소망의 약속들을 붙잡고 일어서도록 강력히 도전한다." } },
  { id: 95, gift: "Discernment", text: { en: "I can tell whether a person speaking in tongues is genuine.", ko: "나는 방언 기도를 드리는 사람들을 볼 때, 그것이 정말 하나님이 주신 은사인지 아니면 거짓 선동인지 가늠해낼 수 있다." } },
  { id: 96, gift: "Giving", text: { en: "I have been willing to maintain a lower standard of living in order to benefit God's work.", ko: "나는 하나님의 나라가 확장될 수만 있다면 기꺼이 더 검소하게 생활하고 내 소비 수준을 낮출 의향이 있다." } },
  { id: 97, gift: "Helps", text: { en: "When I serve the Lord, I really don't care who gets the credit.", ko: "나는 주님을 섬길 때, 내 공로나 헌신을 남들이 알아주거나 칭찬해 주는 것에 연연하지 않는다." } },
  { id: 98, gift: "Mercy", text: { en: "I would enjoy spending time with a lonely, shut-in person or someone in prison.", ko: "나는 병원에 홀로 격리된 환자나 쓸쓸한 독거노인, 혹은 갇힌 자들을 방문해 말벗이 되어주는 것에 큰 기쁨이 있다." } },
  { id: 99, gift: "Missionary", text: { en: "More than most, I have had a strong desire to see people of others countries won to the Lord.", ko: "나는 다른 문화권이나 오지에 있는 잃어버린 영혼들이 주님께 돌아오는 소식에 가슴이 뜨거워지곤 한다." } },
  { id: 100, gift: "Evangelist", text: { en: "I am attracted to non-believers because of my desire to win them to Christ.", ko: "나는 아직 예수를 믿지 않는 세상 친구들과 어울리는 것을 두려워하지 않으며, 그들을 전도하고픈 갈망이 가득하다." } },
  { id: 101, gift: "Hospitality", text: { en: "I have desired to make my home available to those in the Lord's service whenever needed.", ko: "나는 하나님의 나라를 위해 애쓰는 선교사나 주님의 종들이 필요하다면 언제든지 내 집을 쉼터로 내어줄 준비가 되어 있다." } },
  { id: 102, gift: "Faith", text: { en: "Others have told me that I am a person of unusual vision and I agree.", ko: "지체들은 내가 불가능 속에서도 가능성을 찾아내는 뛰어난 통찰력하고 장기 비전이 있는 사람이라고 이야기한다." } },
  { id: 103, gift: "Leadership", text: { en: "When I am in charge, things seem to run smoothly.", ko: "내가 일을 총괄하거나 조장으로 기획을 맡으면 일처리가 체계적으로 깔끔하게 마무리되는 편이다." } },
  { id: 104, gift: "Administration", text: { en: "I have enjoyed bearing the responsibility for the success of a particular task within my church.", ko: "나는 교회나 공동체의 성패를 가르는 특정한 사역과 임무를 온전히 짊어지고 그것을 책임감 있게 수행하는 것을 좋아한다." } },
  { id: 105, gift: "Miracles", text: { en: "In the name of the Lord, I have been able to recover sight to the blind.", ko: "나는 주님의 주권적인 역사로 눈이 가려진 영적 소경들이 온전히 진리를 보게 되고 어두움이 걷히는 영적 기적을 보았다." } },
  { id: 106, gift: "Healing", text: { en: "When I pray for the sick, either I or they feel sensations of tingling or warmth.", ko: "나는 연약한 환우를 위해 기도할 때 내 마음에 하나님의 뜨거운 긍휼과 위로의 손길이 임하는 것을 절실히 느낀다." } },
  { id: 107, gift: "Tongues", text: { en: "When I speak in tongues, I believe it is edifying to the Lord's body.", ko: "나는 기도가 막히거나 마음에 깊은 영적 씨름이 있을 때 방언으로 기도하여 심령의 새 힘을 얻곤 한다." } },
  { id: 108, gift: "Interpretation of Tongues", text: { en: "I have interpreted tongues in such a way that the message appeared to be directly from God.", ko: "나는 공적인 자리에서 방언의 통역을 맡아 주님이 지체들에게 주시는 격려의 마음을 맑고 투명하게 전달해 보았다." } },
  { id: 109, gift: "Intercession", text: { en: "When I pray, God frequently speaks to me, and I recognize His voice.", ko: "나는 예배와 조용한 묵상의 순간 속에서 하나님의 세밀하고 친밀한 성령의 음성과 이끄심을 명확히 알아차린다." } },
  { id: 110, gift: "Service", text: { en: "I respond cheerfully when asked to do a job, even if it seems menial.", ko: "나는 드러나지 않는 사소한 청소, 장비 정리, 셋업 일을 할 때도 기쁘고 감사한 마음으로 임한다." } }
];

// C. GIFTSTEST.COM SURVEY (66 Questions, 22 Gifts)
const GIFTSTEST_QUESTIONS = [
  { id: 1, gift: "Administration", text: { en: "I like organizing services and events.", ko: "나는 집회나 행사를 기획하고 조직하는 것을 좋아한다." } },
  { id: 2, gift: "Apostleship", text: { en: "I enjoy starting new churches.", ko: "나는 새로운 교회를 개척하고 시작하는 일에 흥미가 있다." } },
  { id: 3, gift: "Craftsmanship", text: { en: "Working with my hands is fun for me.", ko: "손으로 물건을 만들거나 다루는 작업이 나에게는 즐겁다." } },
  { id: 4, gift: "Discernment", text: { en: "I can tell when someone is insincere.", ko: "나는 어떤 사람이 위선적이거나 진실하지 못할 때 그것을 알아챌 수 있다." } },
  { id: 5, gift: "Evangelism", text: { en: "I pray for the lost daily.", ko: "나는 매일 믿지 않는 사람들을 위해 기도한다." } },
  { id: 6, gift: "Exhortation", text: { en: "Encouraging others is a high priority in my life.", ko: "다른 이들을 격려하는 일은 내 삶의 최우선 순위 중 하나이다." } },
  { id: 7, gift: "Faith", text: { en: "Believing God for our daily needs is important to me.", ko: "우리의 일상적 필요를 채우실 하나님을 굳게 믿는 것이 나에게 중요하다." } },
  { id: 8, gift: "Giving", text: { en: "Influencing others for the kingdom of God through finances is extremely important to me.", ko: "재정을 통해 하나님 나라에 기여하고 영향력을 주는 일은 나에게 매우 중요하다." } },
  { id: 9, gift: "Healing", text: { en: "I look for opportunities to pray for the sick.", ko: "나는 아픈 사람들을 위해 기도해 줄 기회를 찾는다." } },
  { id: 10, gift: "Helping", text: { en: "I enjoy doing the little things that others do not.", ko: "나는 다른 사람들이 귀찮아하거나 지나치는 작은 일들을 기꺼이 담당한다." } },
  { id: 11, gift: "Hospitality", text: { en: "Having people over to my house is something I do often.", ko: "사람들을 집으로 초대하여 대접하는 일을 자주 하는 편이다." } },
  { id: 12, gift: "Intercession", text: { en: "Spending hours in prayer for other people is very enjoyable to me.", ko: "다른 사람들을 위해 오랜 시간 동안 중보기도를 드리는 것은 나에게 큰 기쁨이다." } },
  { id: 13, gift: "Knowledge", text: { en: "I get insights about others while praying for them even though I don't know them.", ko: "그 사람을 잘 모르더라도 그를 위해 기도할 때 하나님이 주시는 특별한 통찰을 얻곤 한다." } },
  { id: 14, gift: "Leadership", text: { en: "I tend to motivate others to get involved.", ko: "나는 사람들이 사역이나 모임에 동참하도록 동기를 부여하는 경향이 있다." } },
  { id: 15, gift: "Mercy", text: { en: "My heart hurts when I see others hurting.", ko: "고통받는 이들을 보면 마음이 깊이 아프고 공감된다." } },
  { id: 16, gift: "Miracles", text: { en: "I believe God will use me to enact His miracles.", ko: "나는 하나님께서 기적을 행하시는 도구로 나를 사용하실 것임을 믿는다." } },
  { id: 17, gift: "Shepherding", text: { en: "Caring for the hurting is paramount in my eyes.", ko: "마음이 상하고 다친 사람들을 돌보는 일은 나에게 무엇보다 중요하다." } },
  { id: 18, gift: "Prophecy", text: { en: "The willful sin of others really aggravates me.", ko: "타인의 고의적인 죄나 잘못된 행동을 볼 때 경각심과 의로운 분노를 느낀다." } },
  { id: 19, gift: "Serving", text: { en: "I enjoy serving behind the scenes.", ko: "나는 보이지 않는 곳에서 묵묵히 섬기는 봉사를 즐거워한다." } },
  { id: 20, gift: "Teaching", text: { en: "I take pleasure in explaining God's word to others.", ko: "나는 하나님의 말씀의 의미를 다른 사람들에게 설명하는 것에서 기쁨을 찾는다." } },
  { id: 21, gift: "Tongues", text: { en: "God has used me to interpret a heavenly language.", ko: "하나님께서 나를 방언을 통역하는 일에 사용하신 적이 있다." } },
  { id: 22, gift: "Wisdom", text: { en: "I enjoy the book of Proverbs more than any other book in the Bible.", ko: "나는 성경의 다른 어떤 책보다 잠재력과 지혜를 주는 잠언을 읽는 것을 좋아한다." } },
  { id: 23, gift: "Administration", text: { en: "I am passionate about managing details.", ko: "나는 사역의 아주 자잘하고 세부적인 세팅과 디테일을 관리하는 일에 열정이 있다." } },
  { id: 24, gift: "Apostleship", text: { en: "I prefer to pioneer new ministry projects.", ko: "나는 기존의 사역보다 새로운 사역이나 선교 프로젝트를 개척하는 것을 선호한다." } },
  { id: 25, gift: "Craftsmanship", text: { en: "I consider myself a craftsman or craftswoman.", ko: "나는 손재주가 좋거나 공예, 조립, 셋업 작업 등에서 수공예적 능력이 있다고 생각한다." } },
  { id: 26, gift: "Discernment", text: { en: "I sense when situations are spiritually unhealthy.", ko: "나는 특정 모임이나 공동체의 분위기가 영적으로 불안정하거나 잘못된 방향으로 흐를 때 이를 기민하게 파악한다." } },
  { id: 27, gift: "Evangelism", text: { en: "I am greatly concerned about seeing the lost saved.", ko: "나는 아직 믿지 않는 영혼이 구원을 얻고 예수를 구주로 시인하게 하는 일에 지대한 관심이 있다." } },
  { id: 28, gift: "Exhortation", text: { en: "I try to come across loving and caring.", ko: "나는 대화 속에서 상대방에게 따뜻하게 경청하고 사랑과 돌봄을 느끼게 하려 애쓴다." } },
  { id: 29, gift: "Faith", text: { en: "Asking God for a list of big things is exciting to me.", ko: "나는 내 능력 밖으로 보이는 큰 기도 제목들도 하나님이 응답해 주실 것임을 굳게 기대한다." } },
  { id: 30, gift: "Giving", text: { en: "I find ways to give offerings above my tithe.", ko: "나는 기본 십일조를 초과하여 기쁨으로 특별 선교 헌금이나 구제 물질을 드린다." } },
  { id: 31, gift: "Healing", text: { en: "I believe miraculous healing is for this day and age.", ko: "나는 현대에도 하나님의 치료와 기적적인 신유가 활발히 일어난다고 굳게 믿는다." } },
  { id: 32, gift: "Helping", text: { en: "Helping others is one of my highest achievements.", ko: "다른 사람들을 뒤에서 서포트하고 돕는 과정 자체가 나에게 큰 자부심이자 보람이다." } },
  { id: 33, gift: "Hospitality", text: { en: "Creating a warm and welcoming home is important to me.", ko: "우리 집에 방문한 사람들이 정말 환영받고 편안함을 느끼도록 따뜻한 공간을 가꾸는 일을 중요하게 여긴다." } },
  { id: 34, gift: "Intercession", text: { en: "I am burdened to pray for situations in the world.", ko: "나는 세계 각처의 고통받는 상황이나 선교지를 보며 기도의 부담을 느끼고 지속적으로 중보한다." } },
  { id: 35, gift: "Knowledge", text: { en: "I get specific pieces of information that God reveals that could not have been naturally known.", ko: "나는 공부하거나 경험하지 않았던 특별한 영적 정보나 진리를 성령님의 알려주심으로 깨닫곤 한다." } },
  { id: 36, gift: "Leadership", text: { en: "I prefer to take the lead whenever necessary.", ko: "나는 필요할 때 언제든지 조를 대표해 책임을 지고 앞장서서 리더십을 발휘하는 편이다." } },
  { id: 37, gift: "Mercy", text: { en: "I'm very sensitive to sad stories.", ko: "나는 눈물겨운 사연이나 슬픈 이야기를 들을 때 쉽게 마음이 동요되고 눈물이 나곤 한다." } },
  { id: 38, gift: "Miracles", text: { en: "Miracles often happen when I'm nearby.", ko: "나는 내 주변에서 하나님의 특별한 기적과 주권적인 역사가 일어나는 것을 목격하곤 한다." } },
  { id: 39, gift: "Shepherding", text: { en: "I enjoy connecting, caring, and coaching others.", ko: "나는 성도들과 관계를 맺고, 그들을 가르치고 지도하는 양육(코칭) 사역이 즐겁다." } },
  { id: 40, gift: "Prophecy", text: { en: "Confronting someone with sin in his or her life is not hard.", ko: "누군가의 숨겨진 고의적인 잘못이나 죄를 사랑으로 권면하고 직면하는 일이 두렵지 않다." } },
  { id: 41, gift: "Serving", text: { en: "It bothers me when people sit around and do nothing.", ko: "나는 다른 사람들이 가만히 앉아 말만 하고 실제 행동으로 봉사하지 않는 모습을 보면 서운한 마음이 든다." } },
  { id: 42, gift: "Teaching", text: { en: "I share Biblical truth with others in hopes of their personal growth.", ko: "나는 다른 사람들의 신앙 성장과 인격적 성숙을 위해 내가 깨달은 성경의 진리를 나눈다." } },
  { id: 43, gift: "Tongues", text: { en: "I pray in tongues daily.", ko: "나는 매일 방언으로 기도하며 영적 호흡과 마음의 기쁨을 누린다." } },
  { id: 44, gift: "Wisdom", text: { en: "When I study scripture God gives me unique insights.", ko: "나는 성경을 읽고 연구할 때 하나님의 말씀이 내 삶의 구체적 지혜가 되는 것을 체험한다." } },
  { id: 45, gift: "Administration", text: { en: "Creating a task list is easy and enjoyable for me.", ko: "나는 해야 할 일의 목록을 작성하고 스케줄을 기획하는 작업이 쉽고 재미있다." } },
  { id: 46, gift: "Apostleship", text: { en: "I am attracted to ministries that start new churches.", ko: "나는 선교지를 돕거나 새로운 지교회를 기획하고 개척하는 사역 단체에 마음이 끌린다." } },
  { id: 47, gift: "Craftsmanship", text: { en: "Building something with my hands is very rewarding to me.", ko: "내 손으로 물건을 설계하고 제작하여 사역 환경을 멋지게 꾸미는 일이 성취감이 크다." } },
  { id: 48, gift: "Discernment", text: { en: "I can pinpoint issues or problems before others.", ko: "나는 다른 사람들보다 먼저 문제 상황을 짚어내고 잠재적인 트러블을 감지하는 능력이 탁월하다." } },
  { id: 49, gift: "Evangelism", text: { en: "I enjoy sharing the gospel with a total stranger.", ko: "나는 길에서 우연히 마주친 낯선 사람에게도 스스럼없이 복음을 전하고 간증할 수 있다." } },
  { id: 50, gift: "Exhortation", text: { en: "I look for ways to be an encouragement to other people.", ko: "나는 어떻게 하면 낙심한 조원들이나 주변 사람들에게 격려의 힘을 줄 수 있을지 늘 생각한다." } },
  { id: 51, gift: "Faith", text: { en: "I trust that God has my back in every situation.", ko: "나는 어떤 곤경에 부딪히더라도 하나님이 반드시 나와 동행하시며 이끌어 주실 것임을 의심치 않는다." } },
  { id: 52, gift: "Giving", text: { en: "Making more money means that I can give more.", ko: "나는 재정을 더 많이 버는 것이 축복인 이유가, 그로 인해 더 많은 사람에게 구제하고 나눌 수 있기 때문이라고 믿는다." } },
  { id: 53, gift: "Healing", text: { en: "God has used me to bring healing to those who are sick.", ko: "하나님께서는 아프고 질병이 있는 이들의 치유와 기도를 도울 때 나를 도구로 사용하신 적이 있다." } },
  { id: 54, gift: "Helping", text: { en: "Being a part of the process is fulfilling to me.", ko: "사역의 어떤 역할이든 공동체에 기여하는 과정에 동참하는 것 자체가 나에게 뿌듯하다." } },
  { id: 55, gift: "Hospitality", text: { en: "I tend to make total strangers feel at home.", ko: "나는 우리 교회 공동체에 처음 들어온 사람이 어색해하지 않고 바로 정착하도록 배려하고 대접한다." } },
  { id: 56, gift: "Intercession", text: { en: "People often describe me as a prayer warrior.", ko: "주변 성도들은 나를 기도의 능력이 있고 중보기도의 사명이 투철한 기도의 군사라고 부른다." } },
  { id: 57, gift: "Knowledge", text: { en: "Others often affirm a specific insight that I expressed about them personally.", ko: "내가 특정한 사람을 위해 기도하며 느꼈던 통찰이나 영적인 깨달음을 그에게 건넸을 때, 그가 큰 위로를 얻고 사실임을 확인해 준 적이 있다." } },
  { id: 58, gift: "Leadership", text: { en: "I delegate responsibilities to accomplish tasks.", ko: "나는 일이나 프로젝트가 잘 완료되도록 사람들에게 사명을 위임하고 효율적으로 조율한다." } },
  { id: 59, gift: "Mercy", text: { en: "I am motivated to help those who are less fortunate.", ko: "나는 환경이 어려운 선교지나 가난한 지체들에게 자원하고 물질을 나누는 일에 강력한 동기가 있다." } },
  { id: 60, gift: "Miracles", text: { en: "I have a constant hunger to see God's miraculous power.", ko: "나는 하나님의 초자연적이고 엄청난 이적의 역사들이 이 시대에도 멈추지 않고 나타나기를 열렬히 갈망한다." } },
  { id: 61, gift: "Shepherding", text: { en: "I enjoy walking with someone in times of difficulty.", ko: "나는 지체들이 힘겨운 시련을 통과할 때 그의 곁을 지키며 긴밀히 돌보고 동행하는 일이 즐겁다." } },
  { id: 62, gift: "Prophecy", text: { en: "I enjoy hearing passionate and clear preaching of the truth.", ko: "나는 회중을 향해 하나님의 엄중하고 뜨거운 말씀을 타협 없이 강력하게 선포하는 열정적인 고백을 듣거나 전하길 기뻐한다." } },
  { id: 63, gift: "Serving", text: { en: "I like to do small things that others pass over.", ko: "나는 다른 이들이 하기 싫어하거나 그냥 내버려 두는 사소한 정리 및 봉사를 솔선해서 담당한다." } },
  { id: 64, gift: "Teaching", text: { en: "I enjoy knowing Biblical details and helping others to understand them.", ko: "나는 성경의 흥미로운 세부 맥락들을 공부하고 조원들에게 자세히 설명해 주는 과정이 즐겁다." } },
  { id: 65, gift: "Tongues", text: { en: "Praying in the Spirit is encouraging and important to me.", ko: "나는 성령 충만함 가운데 방언으로 간절히 구하는 기도를 매우 가치 있고 유익하게 여긴다." } },
  { id: 66, gift: "Wisdom", text: { en: "When faced with difficulty I tend to make wise decisions and choices.", ko: "나는 여러 갈래의 복잡한 의견이나 선택이 대립할 때, 현명하고 지혜로운 최선의 결정을 내린다." } }
];

// D. MINI / HYBRID ASSESSMENT (30 Questions, 10 Gifts)
const MINI_QUESTIONS = [
  // 1. Shepherding
  { id: 1, gift: "Shepherding", text: { en: "I enjoy connecting with, caring for, and spiritually mentoring others.", ko: "나는 다른 사람들과 관계를 맺고, 돌보며, 영적으로 이끌어주는(멘토링) 일을 기뻐한다." } },
  { id: 2, gift: "Shepherding", text: { en: "Caring for the spiritual growth of a small group of people is highly important to me.", ko: "소그룹 멤버들의 영적 성장을 위해 마음을 쓰고 돌보는 일이 나에게 매우 중요하다." } },
  { id: 3, gift: "Shepherding", text: { en: "I enjoy walking with someone and helping them navigate through times of difficulty.", ko: "나는 삶의 어려움을 겪고 있는 사람과 함께 동행하며 극복하도록 돕는 일을 좋아한다." } },
  // 2. Teaching
  { id: 4, gift: "Teaching", text: { en: "I take pleasure in explaining God's word and biblical truths to others.", ko: "나는 하나님의 말씀과 성경적 진리를 다른 사람들에게 명확하게 설명하는 일에 기쁨을 느낀다." } },
  { id: 5, gift: "Teaching", text: { en: "I share biblical insights with others in hopes of encouraging their personal growth.", ko: "나는 다른 사람들의 영적 성장을 바라며 성경적 깨달음을 나누는 것을 좋아한다." } },
  { id: 6, gift: "Teaching", text: { en: "I enjoy studying biblical details and helping others understand them clearly.", ko: "나는 성경의 구체적인 가르침을 공부하고 다른 사람들이 쉽게 이해하도록 돕는 일이 즐겁다." } },
  // 3. Evangelism
  { id: 7, gift: "Evangelism", text: { en: "I pray for the spiritually lost daily and seek opportunities to share my faith.", ko: "나는 믿지 않는 사람들을 위해 매일 기도하며 내 신앙을 나눌 기회를 찾는다." } },
  { id: 8, gift: "Evangelism", text: { en: "I am deeply concerned about seeing the lost saved and coming to know Christ.", ko: "나는 구원받지 못한 영혼들이 그리스도를 영접하게 하는 일에 깊은 관심이 있다." } },
  { id: 9, gift: "Evangelism", text: { en: "I feel comfortable and enjoy sharing the gospel with a total stranger.", ko: "나는 낯선 사람에게 복음을 전하고 대화를 나누는 일이 자연스럽고 즐겁다." } },
  // 4. Serving
  { id: 10, gift: "Serving", text: { en: "I enjoy serving behind the scenes doing practical tasks to support ministries.", ko: "나는 사역을 돕기 위해 보이지 않는 곳에서 실질적이고 구체적인 일로 돕는 것을 좋아한다." } },
  { id: 11, gift: "Serving", text: { en: "I like to do small, practical things to help around the church that others might pass over.", ko: "나는 다른 사람들이 쉽게 지나칠 수 있는 교회의 작고 실질적인 필요들을 채우는 것을 좋아한다." } },
  { id: 12, gift: "Serving", text: { en: "It fulfills me to help run events, set up rooms, or clean up after services.", ko: "나는 행사를 준비하고, 공간을 세팅하거나, 집회 후 뒷정리를 돕는 일에서 큰 보람을 느낀다." } },
  // 5. Administration
  { id: 13, gift: "Administration", text: { en: "I like organizing services, schedules, team logistics, and church events.", ko: "나는 예배, 스케줄, 팀 운영 및 교회 행사를 체계적으로 기획하고 조직하는 것을 좋아한다." } },
  { id: 14, gift: "Administration", text: { en: "I am passionate about managing details and coordinate resources to achieve a goal.", ko: "나는 세부 사항을 조율하고 목표를 이루기 위해 자원을 효율적으로 배정하는 일에 열정이 있다." } },
  { id: 15, gift: "Administration", text: { en: "Creating task lists, managing projects, and setting timelines is easy and fun for me.", ko: "나는 할 일 목록을 만들고, 프로젝트를 관리하며, 타임라인을 세우는 일이 쉽고 흥미롭다." } },
  // 6. Giving
  { id: 16, gift: "Giving", text: { en: "Influencing others for the kingdom of God through my finances is extremely important.", ko: "재정적인 지원을 통해 하나님의 나라와 이웃에게 기여하는 일은 나에게 매우 중요하다." } },
  { id: 17, gift: "Giving", text: { en: "I actively look for ways to give offerings and financial support above my basic tithe.", ko: "나는 십일조 외에도 도움이 필요한 사역이나 사람들에게 재정을 더 기부할 기회를 적극적으로 찾는다." } },
  { id: 18, gift: "Giving", text: { en: "Making more money is a blessing because it allows me to give more generously to others.", ko: "재정을 더 버는 것은 다른 사람들에게 더 넉넉히 나눌 수 있는 축복이기에 기쁜 일이다." } },
  // 7. Mercy
  { id: 19, gift: "Mercy", text: { en: "My heart deeply hurts when I see others going through pain, sorrow, or loneliness.", ko: "나는 고통이나 슬픔, 외로움을 겪는 이들을 볼 때 마음이 깊이 아프고 공감한다." } },
  { id: 20, gift: "Mercy", text: { en: "I am drawn to comfort and care for people who are hurting, sick, or grieving.", ko: "나는 마음이 상한 자, 아픈 자, 슬퍼하는 이들을 위로하고 보살피는 일에 이끌린다." } },
  { id: 21, gift: "Mercy", text: { en: "I am strongly motivated to spend my time helping those who are less fortunate or in need.", ko: "나는 어려운 형편에 처해 있거나 소외된 이들을 돕는 일에 기꺼이 내 시간을 내어준다." } },
  // 8. Exhortation
  { id: 22, gift: "Exhortation", text: { en: "Encouraging others and lifting their spirits is a high priority in my life.", ko: "다른 사람들을 격려하고 그들의 낙담한 마음을 일으켜 세우는 일은 내 삶의 우선순위이다." } },
  { id: 23, gift: "Exhortation", text: { en: "I try to speak words of hope and comfort to people when they face personal trials.", ko: "나는 사람들이 개인적인 시련에 직면했을 때 희망과 소망의 말을 건네려 노력한다." } },
  { id: 24, gift: "Exhortation", text: { en: "I look for ways to motivate others to discover their potential and take positive action.", ko: "나는 다른 사람들이 잠재력을 발견하고 긍정적인 행동을 취하도록 동기부여 하는 방법을 찾는다." } },
  // 9. Hospitality
  { id: 25, gift: "Hospitality", text: { en: "Having people over to my house or hosting gatherings is something I do joyfully.", ko: "사람들을 내 집에 초대하고 모임을 호스팅하여 대접하는 일이 나에게 큰 기쁨이다." } },
  { id: 26, gift: "Hospitality", text: { en: "Creating a warm, comfortable, and welcoming environment for others is important.", ko: "다른 사람들을 위해 따뜻하고, 편안하며, 환영받는 분위기를 조성하는 일이 중요하다." } },
  { id: 27, gift: "Hospitality", text: { en: "I naturally tend to make total strangers feel welcome and at home in our church group.", ko: "나는 처음 온 사람이나 서먹한 사람도 모임에 잘 적응하고 편안함을 느끼도록 배려한다." } },
  // 10. Faith
  { id: 28, gift: "Faith", text: { en: "Believing God for big things and trusting His promises in difficult situations is natural for me.", ko: "어려운 상황에서도 하나님이 행하실 큰일을 믿고 그분의 약속을 전적으로 신뢰하는 것이 자연스럽다." } },
  { id: 29, gift: "Faith", text: { en: "Asking God for bold, seemingly impossible prayers is exciting to me.", ko: "인간적으로 불가능해 보이는 담대한 기도 제목을 하나님께 올려드리는 것이 나에게 흥미롭다." } },
  { id: 30, gift: "Faith", text: { en: "I have deep confidence that God will fulfill His word and make a way even when no path is visible.", ko: "나는 길이 보이지 않을 때에도 하나님께서 그분의 말씀을 성취하시고 마침내 인도하실 것이라는 강한 확신이 있다." } }
];

// --- 2. LOCALIZATION TRANSLATIONS ---

const TRANSLATIONS = {
  ko: {
    app_title: "은사발견 프로파일러",
    app_subtitle: "Spiritual Gifts Profiler",
    welcome_heading: "은사발견 프로파일러",
    intro_text: "하나님께서 여러분에게 부어주신 영적 은사들을 발견하고, 그 은사를 가지고 공동체를 어떻게 사랑으로 섬길 수 있는지 고찰하고 기쁜 마음으로 결단해 보세요.",
    
    // Cards
    lifeway_title: "1. 남침례교(Lifeway) 공식 진단",
    lifeway_desc: "전통 신학적 뼈대로 16대 영적 은사를 고찰하는 공식 진단입니다. (총 80문항)",
    wagner_title: "2. 풀러/바그너 은사 진단",
    wagner_desc: "신비 은사를 포함한 22가지 풍성한 은사를 정교하게 채점하는 피터 바그너식 진단입니다. (총 110문항)",
    giftstest_title: "3. GiftsTest.com 은사 진단",
    giftstest_desc: "은사주의적 sign 은사들을 포함한 22가지 은사를 모듈형으로 다루는 서구식 진단입니다. (총 66문항)",
    mini_title: "4. 미니 단축 은사 진단",
    mini_desc: "리트릿 현장에서 핵심 10대 은사만을 간편하고 빠르게 진단하는 숏코스입니다. (총 30문항)",
    
    start_btn: "테스트 시작하기",
    learn_btn: "📘 은사 가이드북 보기",
    
    // Quiz Interface
    question: "질문",
    next: "다음",
    prev: "이전",
    submit: "제출하기",
    
    // Likert Options for Lifeway, GiftsTest, Mini
    likert_5: "매우 그렇다",
    likert_4: "그렇다",
    likert_3: "보통이다",
    likert_2: "그렇지 않다",
    likert_1: "전혀 그렇지 않다",
    
    // Likert Options for Wagner (0-3 scale)
    wagner_3: "매우 그렇다 (Much)",
    wagner_2: "어느 정도 그렇다 (Some)",
    wagner_1: "약간 그렇다 (Little)",
    wagner_0: "전혀 그렇지 않다 (Not at All)",
    
    // Results
    results_heading: "진단 결과",
    dominant_badge: "나의 가장 강한 대표 은사",
    score_breakdown_heading: "은사별 세부 점수 분포",
    retake_btn: "🔄 다른 테스트 하기",
    pledge_entry_btn: "📜 은사로 결단 및 헌신하기",
    
    // Pledge / Commitment Screen
    pledge_title: "은사 결단 및 약정서",
    pledge_intro: "발견한 은사를 토대로, 우리 공동체의 어느 영역에서 구체적인 섬김을 시작할지 기도하며 서명해 보세요.",
    name_label: "서명할 실명 입력:",
    name_placeholder: "여기에 이름을 입력하세요 (예: 홍길동)",
    ministry_heading: "헌신할 봉사 사역 분야 선택 (중복 가능):",
    pledge_statement_heading: "약정서 서약 내용 선택:",
    pledge_preset_1: "하나님께서 내게 주신 은사를 사용하여 교회를 세우고 이 공동체를 사랑으로 섬길 것을 결단합니다.",
    pledge_preset_2: "받은 은사를 묻어두지 않고, 공동체의 연약한 지체들을 돌보고 세우는 일에 지혜롭고 충성되게 사용하겠습니다.",
    generate_card_btn: "✨ 결단 약정서 카드 발행하기",
    
    // Covenant Card output
    covenant_title: "은사 결단 약정서",
    covenant_subtitle: "Covenant of Service",
    covenant_body: "위 지체는 하나님께서 주신 은사적 설계를 겸손히 깨닫고, 그리스도의 몸 된 교회를 세우기 위해 다음과 같이 사역을 결단하고 헌신할 것을 엄숙히 약정합니다.",
    covenant_date_label: "약정 일자: ",
    covenant_sig_label: "약정자 서명: ",
    
    share_covenant_btn: "🔗 약정서 내용 복사하기",
    back_to_results: "← 결과 화면으로",
    copied_toast: "약정서 내용이 복사되었습니다! 소그룹 단체방에 공유해 보세요.",
    
    // Facilitator Tools
    facilitator_title: "⚙️ 인도자용 도구",
    facilitator_desc: "조원들의 결과 텍스트를 모아서 분석하고 자동으로 소그룹 조를 편성합니다.",
    facilitator_guide_title: "📖 인도자 가이드",
    facilitator_guide_body: "<p><strong>Step 1.</strong> 조원들이 진단을 마치고 <em>'약정서 내용 복사하기'</em> 또는 <em>'결과 복사하기'</em> 버튼을 눌러 공유하도록 합니다.</p><p><strong>Step 2.</strong> 카톡방 등에 조원들이 올린 결과 텍스트들을 <strong>아래 입력창에 전부 복사-붙여넣기</strong> 합니다.</p><p><strong>Step 3.</strong> '결과 분석' 버튼을 누른 후, 편성할 조의 개수와 조 편성 방식을 정해 실행합니다.</p>",
    parse_btn: "📋 결과 가져오기 및 분석",
    members_list_title: "참가자 은사 현황",
    group_count_label: "편성할 조 개수:",
    group_criterion_label: "조 편성 방식:",
    criterion_diverse: "은사가 골고루 섞이게 편성 (추천)",
    criterion_similar: "비슷한 은사끼리 묶어서 편성",
    run_group_btn: "✨ 소그룹 조 편성 실행",
    group_results_title: "소그룹 편성 결과",
    copy_groups_btn: "📋 조 편성 결과 복사",
    back_to_home: "홈으로 돌아가기",
    
    // Gift Descriptions (Korean)
    gift_desc: {
      "Leadership": "공동체의 비전과 목표를 명확히 제시하고 다른 지체들이 열정적으로 동참하도록 이끄는 은사입니다.",
      "Administration": "모임, 행사, 일정 및 자원을 체계적이고 효율적으로 기획하고 조직하여 조직을 안정시키는 은사입니다.",
      "Teaching": "성경의 진리를 쉽고 명확하게 설명하여 다른 이들이 하나님의 말씀을 깨닫고 배우도록 돕는 은사입니다.",
      "Knowledge": "성경 연구와 묵상을 통해 하나님의 진리와 심오한 진실을 발견하고 깨닫는 은사입니다.",
      "Wisdom": "복잡한 상황 속에서 하나님의 관점으로 해결책을 제시하고 삶의 구체적 방향을 잡아주는 은사입니다.",
      "Prophecy": "시대 상황을 향한 하나님의 뜻과 심판, 혹은 경고의 메시지를 담대하고 타협 없이 대언하는 은사입니다.",
      "Discernment": "진리와 오류, 선과 악, 혹은 영적인 동기와 위선이 섞인 상태를 명확히 구별해 내는 은사입니다.",
      "Exhortation": "낙심하거나 흔들리는 지체들을 말과 소망으로 위로하며 그들의 잠재력을 격려해 일으켜 세우는 은사입니다.",
      "Shepherding": "한 무리의 지체들의 영적 웰빙과 지속적인 양육, 신앙 성장을 책임지고 부모처럼 돌보는 은사입니다.",
      "Pastor": "한 무리의 지체들의 영적 웰빙과 지속적인 양육, 신앙 성장을 책임지고 부모처럼 돌보는 은사입니다.",
      "Faith": "눈에 보이는 난관 앞에서도 하나님의 약속을 절대 의심하지 않고 담대하게 기도로 돌파하는 믿음의 은사입니다.",
      "Evangelism": "아직 예수를 알지 못하는 영혼들에게 거부감 없이 다가가 구원의 소식을 유려하게 전하는 은사입니다.",
      "Evangelist": "아직 예수를 알지 못하는 영혼들에게 거부감 없이 다가가 구원의 소식을 유려하게 전하는 은사입니다.",
      "Apostleship": "새로운 공동체를 개척하고 미자립 지역에 선교 지경을 확장해 나가는 선구자적 은사입니다.",
      "Missionary": "새로운 공동체를 개척하고 미자립 지역에 선교 지경을 확장해 나가는 선구자적 은사입니다.",
      "Service/Helps": "드러나지 않는 곳에서 실제적인 청소, 셋업, 보조 작업을 도맡아 다른 이들의 사역을 돕는 은사입니다.",
      "Helps": "리더나 다른 사역자들이 영적인 직무에 충실할 수 있도록 기꺼이 실무와 정리를 도맡아 돕는 은사입니다.",
      "Service": "공동체 내부의 사소하거나 몸을 쓰는 실질적인 필요(나르기, 셋업 등)를 기꺼이 즐거움으로 메우는 은사입니다.",
      "Serving": "보이지 않는 곳에서 묵묵히 실질적이고 구체적인 봉사 업무를 돕는 은사입니다.",
      "Mercy": "질병, 외로움, 고통 등에 노출된 사회적 약자나 슬픈 이들의 마음을 깊이 공감하고 체휼하여 품어주는 은사입니다.",
      "Giving": "인색함 없이 기쁘고 은밀하게 자신의 재정과 물질을 나누어 주님의 사역과 구제를 재정적으로 지탱하는 은사입니다.",
      "Hospitality": "낯선 이들을 따뜻하게 마중하고 친근하게 대접하여 공동체에 소속감을 느끼고 안착하도록 이끄는 은사입니다.",
      "Miracles": "하나님의 주권적인 필요에 따라 불가능을 가능케 하는 이적적 역사를 가져오는 도구로 쓰이는 은사입니다.",
      "Healing": "질병에 걸리거나 감정적으로 찢어진 지체들을 주님의 이름으로 기도하여 회복시키는 치유의 은사입니다.",
      "Tongues": "성령의 말하게 하심을 따라 학습하지 않은 하늘의 신비한 언어로 하나님과 깊이 대화하는 은사입니다.",
      "Interpretation of Tongues": "회중 예배에서 선포된 방언의 뜻을 분별하여 공동체의 유익을 위해 올바른 대언으로 선포하는 은사입니다.",
      "Intercession": "자신의 필요를 넘어 조원들과 교회를 위해 골방에서 지속적이고 정성 들여 중보기도를 올리는 은사입니다.",
      "Craftsmanship": "손재주를 발휘해 나무, 섬유, 금속 등을 다루거나 직접 무대와 시설물을 아름답게 셋업하고 보완하는 은사입니다."
    }
  },
  en: {
    app_title: "Spiritual Gifts Profiler",
    app_subtitle: "Spiritual Gifts Profiler",
    welcome_heading: "Spiritual Gifts Profiler",
    intro_text: "Discover the unique spiritual gifts God has placed inside you. Take a test, learn about your design, and make a covenant to serve this community in love.",
    
    // Cards
    lifeway_title: "1. Lifeway Spiritual Gifts Assessment",
    lifeway_desc: "The classic denominational assessment tool covering 16 spiritual gifts. (80 Questions)",
    wagner_title: "2. Wagner-Modified Houts Survey",
    wagner_desc: "A highly detailed, historical test evaluating 22 gifts including sign gifts. (110 Questions)",
    giftstest_title: "3. GiftsTest.com Assessment",
    giftstest_desc: "A modern, modular assessment classifying 22 spiritual gifts. (66 Questions)",
    mini_title: "4. Mini/Hybrid Spiritual Gifts Survey",
    mini_desc: "A quick, streamlined survey focusing on the top 10 practical ministry gifts. (30 Questions)",
    
    start_btn: "Start Test",
    learn_btn: "📘 View Gift Guidebook",
    
    // Quiz Interface
    question: "Question",
    next: "Next",
    prev: "Prev",
    submit: "Submit",
    
    // Likert Options
    likert_5: "Strongly Agree",
    likert_4: "Agree",
    likert_3: "Neutral",
    likert_2: "Disagree",
    likert_1: "Strongly Disagree",
    
    // Wagner Likert Options
    wagner_3: "Much (Consistently true)",
    wagner_2: "Some (Usually true)",
    wagner_1: "Little (Occasionally true)",
    wagner_0: "Not at All (Never true)",
    
    // Results
    results_heading: "Assessment Results",
    dominant_badge: "My Dominant Spiritual Gift",
    score_breakdown_heading: "Detailed Score Distribution",
    retake_btn: "🔄 Try Another Test",
    pledge_entry_btn: "📜 Make a Covenant of Service",
    
    // Pledge / Commitment Screen
    pledge_title: "Covenant of Service",
    pledge_intro: "Reflect on your spiritual gifts. Choose where you want to step out in service, sign your name, and make a pledge of commitment.",
    name_label: "Enter your full name for signature:",
    name_placeholder: "Type name here (e.g., John Doe)",
    ministry_heading: "Select Ministry Service Areas (Multiple choice):",
    pledge_statement_heading: "Select your Pledge Statement:",
    pledge_preset_1: "I pledge to use the spiritual gifts God has given me to build up the church and serve this community in love.",
    pledge_preset_2: "Instead of burying my gifts, I will use them wisely and faithfully to comfort, support, and build up fellow believers.",
    generate_card_btn: "✨ Issue Covenant Card",
    
    // Covenant Card output
    covenant_title: "Covenant of Service",
    covenant_subtitle: "Covenant of Service",
    covenant_body: "Having humbly discovered their spiritual gifts, this believer solemnly pledges to utilize God's unique design to build up the body of Christ and serve others in love.",
    covenant_date_label: "Date of Commitment: ",
    covenant_sig_label: "Signed Covenant: ",
    
    share_covenant_btn: "🔗 Copy Covenant Details",
    back_to_results: "← Back to Results",
    copied_toast: "Covenant text copied! Share it with your small group chat.",
    
    // Facilitator Tools
    facilitator_title: "⚙️ Facilitator Tool",
    facilitator_desc: "Compile retreat members' shared results to analyze the team gifts balance and auto-generate small groups.",
    facilitator_guide_title: "📖 Facilitator Guide",
    facilitator_guide_body: "<p><strong>Step 1.</strong> Ask members to copy and share their results in your chat group.</p><p><strong>Step 2.</strong> Copy and paste all the shared result text blocks into the text box below.</p><p><strong>Step 3.</strong> Click 'Analyze Results', configure the number of teams and grouping logic, and click run.</p>",
    parse_btn: "📋 Load & Analyze Results",
    members_list_title: "Participants Gifts List",
    group_count_label: "Number of Groups:",
    group_criterion_label: "Grouping Mode:",
    criterion_diverse: "Diverse mix of gifts (Recommended)",
    criterion_similar: "Group similar gifts together",
    run_group_btn: "✨ Generate Small Groups",
    group_results_title: "Generated Small Groups",
    copy_groups_btn: "📋 Copy Team Allocations",
    back_to_home: "Back to Home",
    
    // Gift Descriptions (English)
    gift_desc: {
      "Leadership": "The ability to set goals, cast vision, and motivate others to work together harmoniously to accomplish them.",
      "Administration": "The ability to organize, coordinate, schedule, and direct resources and people efficiently to execute tasks.",
      "Teaching": "The ability to analyze, explain, and communicate biblical truth clearly so that others understand and apply it.",
      "Knowledge": "The ability to discover, research, and organize deep biblical insights and scriptural facts.",
      "Wisdom": "The ability to understand God's perspective on situations and offer practical, helper solutions to complex problems.",
      "Prophecy": "The ability to declare God's warning, truth, and messages boldly and uncompromisingly to confront sin or edify the church.",
      "Discernment": "The ability to perceive and distinguish whether a spirit, message, or motivation is from God, human, or evil origins.",
      "Exhortation": "The ability to counsel, encourage, comfort, and motivate others to step out in faith and grow spiritually.",
      "Shepherding": "The ability to take long-term responsibility for the spiritual well-being, nurture, and guidance of a group of believers.",
      "Pastor": "The ability to take long-term responsibility for the spiritual well-being, nurture, and guidance of a group of believers.",
      "Faith": "The ability to trust God completely for things unseen and move forward boldly under His promises despite all obstacles.",
      "Evangelism": "The ability to share the Gospel of Christ with unbelievers in an effective, welcoming way that draws them to salvation.",
      "Evangelist": "The ability to share the Gospel of Christ with unbelievers in an effective, welcoming way that draws them to salvation.",
      "Apostleship": "The ability to pioneer new ministries, plant churches, and oversee spiritual works across borders or cultures.",
      "Missionary": "The ability to pioneer new ministries, plant churches, and oversee spiritual works across borders or cultures.",
      "Service/Helps": "The ability to work behind the scenes performing practical tasks to support and relieve other leaders' ministry responsibilities.",
      "Helps": "The ability to assist other believers in their tasks, relieving them of practical burdens to maximize team success.",
      "Service": "The ability to perform practical, physical tasks around the church family, meeting physical needs with joy.",
      "Serving": "The ability to identify unmet practical needs and work quietly behind the scenes to complete tasks.",
      "Mercy": "The ability to feel deep compassion and cheerfulness in comforting and helping those who are suffering, sick, or marginalized.",
      "Giving": "The ability to earn, manage, and contribute financial and material resources generously and quietly beyond the basic tithe.",
      "Hospitality": "The ability to open one's home and heart to guests, making strangers feel accepted, welcomed, and comfortable.",
      "Miracles": "The ability to serve as a channel for God to perform supernatural events that demonstrate His power and glory.",
      "Healing": "The ability to serve as an instrument for God to restore physical, mental, or emotional health to the sick.",
      "Tongues": "The ability to speak to God in an unlearned, heavenly language for personal edification or public대언.",
      "Interpretation of Tongues": "The ability to translate a message spoken in tongues so that the entire church is edified and comforted.",
      "Intercession": "The ability to pray for others consistently and for extended periods, seeing frequent and specific answers.",
      "Craftsmanship": "The ability to design, build, construct, or restore physical items or settings to be used in ministries."
    }
  }
};

// --- 3. STATE AND ROUTING LOGIC ---

let currentLanguage = "ko";
let activeQuizType = ""; // "lifeway", "wagner", "giftstest", "mini"
let quizQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = {}; // Map of index -> score string (e.g., "5", "3" or wagner "3", "2")
let participants = []; // For facilitator parsing

// DOM references
const DOM = {
  appTitle: document.getElementById("app-title"),
  appSubtitle: document.getElementById("app-subtitle"),
  langToggleBtn: document.getElementById("lang-toggle-btn"),
  homeIconBtn: document.getElementById("home-icon-btn"),
  
  // Screens
  homeScreen: document.getElementById("home-screen"),
  quizScreen: document.getElementById("quiz-screen"),
  resultsScreen: document.getElementById("results-screen"),
  pledgeScreen: document.getElementById("pledge-screen"),
  facilitatorScreen: document.getElementById("facilitator-screen"),
  
  // Cards / Menu
  lifewayCard: document.getElementById("lifeway-card"),
  wagnerCard: document.getElementById("wagner-card"),
  giftstestCard: document.getElementById("giftstest-card"),
  miniCard: document.getElementById("mini-card"),
  facilitatorOpenBtn: document.getElementById("facilitator-open-btn"),
  
  // Quiz Elements
  quizTypeTitle: document.getElementById("quiz-type-title"),
  questionProgress: document.getElementById("question-progress"),
  progressBar: document.getElementById("progress-bar"),
  optionsContainer: document.getElementById("options-container"),
  prevBtn: document.getElementById("prev-btn"),
  nextBtn: document.getElementById("next-btn"),
  
  // Results Elements
  dominantName: document.getElementById("dominant-name"),
  dominantDescription: document.getElementById("dominant-description"),
  chartContainer: document.getElementById("chart-container"),
  pledgeEntryBtn: document.getElementById("pledge-entry-btn"),
  retakeBtn: document.getElementById("retake-btn"),
  
  // Pledge Elements
  signatureInput: document.getElementById("signature-input"),
  generateCardBtn: document.getElementById("generate-card-btn"),
  covenantCardArea: document.getElementById("covenant-card-area"),
  shareCovenantBtn: document.getElementById("share-covenant-btn"),
  backToResultsBtn: document.getElementById("back-to-results-btn"),
  
  // Facilitator Elements
  resultsInput: document.getElementById("results-input"),
  parseResultsBtn: document.getElementById("parse-results-btn"),
  membersListCard: document.getElementById("members-list-card"),
  memberCountBadge: document.getElementById("member-count-badge"),
  membersTableBody: document.getElementById("members-table-body"),
  groupCountInput: document.getElementById("group-count"),
  generateGroupsBtn: document.getElementById("generate-groups-btn"),
  groupsResultCard: document.getElementById("groups-result-card"),
  groupsContainer: document.getElementById("groups-container"),
  copyGroupsBtn: document.getElementById("copy-groups-btn"),
  facilitatorBackBtn: document.getElementById("facilitator-back-btn"),
  
  // Toast
  toast: document.getElementById("toast-notification")
};

// Initialize app
function init() {
  bindEvents();
  translateUI();
  
  // Check localstorage for previous state
  const savedLang = localStorage.getItem("gifts-quiz-lang");
  if (savedLang) {
    currentLanguage = savedLang;
    translateUI();
  }
}

function bindEvents() {
  DOM.langToggleBtn.addEventListener("click", () => {
    currentLanguage = currentLanguage === "ko" ? "en" : "ko";
    localStorage.setItem("gifts-quiz-lang", currentLanguage);
    translateUI();
    if (DOM.quizScreen.classList.contains("active")) {
      renderQuestion();
    } else if (DOM.resultsScreen.classList.contains("active")) {
      showResults();
    } else if (DOM.pledgeScreen.classList.contains("active")) {
      updateCovenantCardPreview();
    }
  });
  
  DOM.homeIconBtn.addEventListener("click", () => {
    if (confirm(currentLanguage === "ko" ? "진행 중인 테스트가 초기화됩니다. 홈 화면으로 갈까요?" : "Your progress will be lost. Return to the home screen?")) {
      showScreen("home-screen");
      activeQuizType = "";
      quizQuestions = [];
      userAnswers = {};
    }
  });
  
  // Quiz Cards selection
  DOM.lifewayCard.addEventListener("click", () => startQuiz("lifeway", LIFEWAY_QUESTIONS));
  DOM.wagnerCard.addEventListener("click", () => startQuiz("wagner", WAGNER_QUESTIONS));
  DOM.giftstestCard.addEventListener("click", () => startQuiz("giftstest", GIFTSTEST_QUESTIONS));
  DOM.miniCard.addEventListener("click", () => startQuiz("mini", MINI_QUESTIONS));
  
  DOM.prevBtn.addEventListener("click", goToPrevQuestion);
  DOM.nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex === quizQuestions.length - 1) {
      submitQuiz();
    } else {
      goToNextQuestion();
    }
  });
  
  DOM.retakeBtn.addEventListener("click", () => {
    showScreen("home-screen");
    activeQuizType = "";
    quizQuestions = [];
    userAnswers = {};
  });
  
  DOM.pledgeEntryBtn.addEventListener("click", () => {
    showScreen("pledge-screen");
    setupPledgeScreen();
  });
  
  DOM.backToResultsBtn.addEventListener("click", () => {
    showScreen("results-screen");
  });
  
  DOM.generateCardBtn.addEventListener("click", generatePledgeCovenantCard);
  DOM.shareCovenantBtn.addEventListener("click", copyCovenantToClipboard);
  
  // Facilitator
  DOM.facilitatorOpenBtn.addEventListener("click", () => showScreen("facilitator-screen"));
  DOM.facilitatorBackBtn.addEventListener("click", () => showScreen("home-screen"));
  DOM.parseResultsBtn.addEventListener("click", parseFacilitatorData);
  DOM.generateGroupsBtn.addEventListener("click", generateFacilitatorGroups);
  DOM.copyGroupsBtn.addEventListener("click", copyGroupsToClipboard);
}

function translateUI() {
  const dict = TRANSLATIONS[currentLanguage];
  DOM.langToggleBtn.innerHTML = `🌐 ${currentLanguage === 'ko' ? 'English' : '한국어'}`;
  
  // Header titles
  DOM.appTitle.textContent = dict.app_title;
  DOM.appSubtitle.textContent = dict.app_subtitle;
  
  // Welcome screen
  document.getElementById("welcome-heading").textContent = dict.welcome_heading;
  document.getElementById("intro-text").textContent = dict.intro_text;
  
  // Cards
  document.getElementById("lifeway-title").textContent = dict.lifeway_title;
  document.getElementById("lifeway-desc").textContent = dict.lifeway_desc;
  document.getElementById("lifeway-start-btn").textContent = dict.start_btn;
  
  document.getElementById("wagner-title").textContent = dict.wagner_title;
  document.getElementById("wagner-desc").textContent = dict.wagner_desc;
  document.getElementById("wagner-start-btn").textContent = dict.start_btn;
  
  document.getElementById("giftstest-title").textContent = dict.giftstest_title;
  document.getElementById("giftstest-desc").textContent = dict.giftstest_desc;
  document.getElementById("giftstest-start-btn").textContent = dict.start_btn;
  
  document.getElementById("mini-title").textContent = dict.mini_title;
  document.getElementById("mini-desc").textContent = dict.mini_desc;
  document.getElementById("mini-start-btn").textContent = dict.start_btn;
  
  DOM.facilitatorOpenBtn.textContent = `⚙️ ${dict.facilitator_title}`;
  document.getElementById("facilitator-explain-text").innerHTML = dict.facilitator_desc;
  
  // Results Screen static texts
  document.getElementById("results-heading").textContent = dict.results_heading;
  document.getElementById("dominant-badge").textContent = dict.dominant_badge;
  document.getElementById("score-breakdown-heading").textContent = dict.score_breakdown_heading;
  DOM.pledgeEntryBtn.textContent = dict.pledge_entry_btn;
  DOM.retakeBtn.textContent = dict.retake_btn;
  
  // Pledge Screen
  document.getElementById("pledge-title-main").textContent = dict.pledge_title;
  document.getElementById("pledge-intro-desc").textContent = dict.pledge_intro;
  document.getElementById("name-input-label").textContent = dict.name_label;
  DOM.signatureInput.placeholder = dict.name_placeholder;
  document.getElementById("ministry-heading-label").textContent = dict.ministry_heading;
  document.getElementById("pledge-statement-label").textContent = dict.pledge_statement_heading;
  document.getElementById("pledge-option-1-label").textContent = dict.pledge_preset_1;
  document.getElementById("pledge-option-2-label").textContent = dict.pledge_preset_2;
  DOM.generateCardBtn.textContent = dict.generate_card_btn;
  DOM.shareCovenantBtn.textContent = dict.share_covenant_btn;
  DOM.backToResultsBtn.textContent = dict.back_to_results;
  
  // Facilitator Screen
  document.getElementById("facilitator-heading-title").textContent = dict.facilitator_title;
  document.getElementById("facilitator-intro-guide").innerHTML = dict.facilitator_desc;
  document.getElementById("facilitator-guide-header").textContent = dict.facilitator_guide_title;
  document.getElementById("facilitator-guide-steps").innerHTML = dict.facilitator_guide_body;
  DOM.resultsInput.placeholder = currentLanguage === 'ko' ? "조원들이 공유한 결과 메시지들을 여기에 모두 붙여넣으세요..." : "Paste all results shared by members here...";
  DOM.parseResultsBtn.textContent = dict.parse_btn;
  document.getElementById("member-table-title").textContent = dict.members_list_title;
  document.getElementById("group-count-label").textContent = dict.group_count_label;
  document.getElementById("match-criteria-label").textContent = dict.group_criterion_label;
  document.getElementById("criteria-diverse-label").textContent = dict.criterion_diverse;
  document.getElementById("criteria-similar-label").textContent = dict.criterion_similar;
  DOM.generateGroupsBtn.textContent = dict.run_group_btn;
  document.getElementById("groups-result-title").textContent = dict.group_results_title;
  DOM.copyGroupsBtn.textContent = dict.copy_groups_btn;
  DOM.facilitatorBackBtn.textContent = `← ${dict.back_to_home}`;
  
  // Set table headers bilingually
  document.getElementById("th-name").textContent = currentLanguage === 'ko' ? "이름" : "Name";
  document.getElementById("th-quiz").textContent = currentLanguage === 'ko' ? "진단 유형" : "Test";
  document.getElementById("th-gifts").textContent = currentLanguage === 'ko' ? "주요 은사 점수" : "Top Gifts";
}

function showScreen(screenId) {
  Object.values(DOM.screens).forEach(scr => {
    if (scr) scr.classList.remove("active");
  });
  
  const target = document.getElementById(screenId);
  if (target) target.classList.add("active");
  
  // Show home button if not on home screen
  DOM.homeIconBtn.style.display = screenId === "home-screen" ? "none" : "block";
  
  window.scrollTo(0, 0);
}

DOM.screens = {
  homeScreen: DOM.homeScreen,
  quizScreen: DOM.quizScreen,
  resultsScreen: DOM.resultsScreen,
  pledgeScreen: DOM.pledgeScreen,
  facilitatorScreen: DOM.facilitatorScreen
};

// --- 4. QUIZ FUNCTIONALITY ---

function startQuiz(type, questions) {
  activeQuizType = type;
  quizQuestions = questions;
  currentQuestionIndex = 0;
  userAnswers = {};
  
  // Update header text bilingually
  const dict = TRANSLATIONS[currentLanguage];
  let titleText = "";
  if (type === "lifeway") titleText = dict.lifeway_title;
  else if (type === "wagner") titleText = dict.wagner_title;
  else if (type === "giftstest") titleText = dict.giftstest_title;
  else if (type === "mini") titleText = dict.mini_title;
  
  DOM.quizTypeTitle.textContent = titleText;
  
  showScreen("quiz-screen");
  renderQuestion();
}

function renderQuestion() {
  const question = quizQuestions[currentQuestionIndex];
  const dict = TRANSLATIONS[currentLanguage];
  
  // Progress indicators
  DOM.questionProgress.textContent = `${dict.question} ${currentQuestionIndex + 1} / ${quizQuestions.length}`;
  const percentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  DOM.progressBar.style.width = `${percentage}%`;
  
  DOM.optionsContainer.innerHTML = "";
  
  // Render question text
  const questionTextElement = document.createElement("div");
  questionTextElement.className = "quiz-question-text";
  questionTextElement.style.fontSize = "1.15rem";
  questionTextElement.style.fontWeight = "700";
  questionTextElement.style.marginBottom = "25px";
  questionTextElement.style.lineHeight = "1.6";
  questionTextElement.style.color = "var(--text-bright)";
  questionTextElement.textContent = `${currentQuestionIndex + 1}. ${question.text[currentLanguage]}`;
  DOM.optionsContainer.appendChild(questionTextElement);
  
  // Options options definitions
  let options = [];
  if (activeQuizType === "wagner") {
    // 0-3 scale
    options = [
      { key: "3", text: { ko: dict.wagner_3, en: dict.wagner_3 } },
      { key: "2", text: { ko: dict.wagner_2, en: dict.wagner_2 } },
      { key: "1", text: { ko: dict.wagner_1, en: dict.wagner_1 } },
      { key: "0", text: { ko: dict.wagner_0, en: dict.wagner_0 } }
    ];
  } else {
    // 1-5 scale
    options = [
      { key: "5", text: { ko: dict.likert_5, en: dict.likert_5 } },
      { key: "4", text: { ko: dict.likert_4, en: dict.likert_4 } },
      { key: "3", text: { ko: dict.likert_3, en: dict.likert_3 } },
      { key: "2", text: { ko: dict.likert_2, en: dict.likert_2 } },
      { key: "1", text: { ko: dict.likert_1, en: dict.likert_1 } }
    ];
  }
  
  options.forEach((opt) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    
    // Check if selected
    if (userAnswers[currentQuestionIndex] === opt.key) {
      button.classList.add("selected");
    }
    
    button.innerHTML = `
      <span class="option-letter">${opt.key}</span>
      <span>${opt.text[currentLanguage]}</span>
    `;
    
    button.addEventListener("click", () => handleOptionSelect(opt.key));
    DOM.optionsContainer.appendChild(button);
  });
  
  // Nav buttons state
  DOM.prevBtn.disabled = currentQuestionIndex === 0;
  DOM.nextBtn.innerHTML = currentQuestionIndex === quizQuestions.length - 1 
    ? `${dict.submit}` 
    : `${dict.next} →`;
}

function handleOptionSelect(selectedScore) {
  userAnswers[currentQuestionIndex] = selectedScore;
  
  // Highlight UI
  const buttons = DOM.optionsContainer.querySelectorAll(".option-btn");
  buttons.forEach(btn => {
    const letterEl = btn.querySelector(".option-letter");
    if (letterEl && letterEl.textContent === selectedScore) {
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
    }
  });
  
  // Auto-advance with micro delay
  setTimeout(() => {
    if (currentQuestionIndex === quizQuestions.length - 1) {
      submitQuiz();
    } else {
      goToNextQuestion();
    }
  }, 250);
}

function goToNextQuestion() {
  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  }
}

function goToPrevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}

function submitQuiz() {
  // Check if all answered
  const unanswered = [];
  for (let i = 0; i < quizQuestions.length; i++) {
    if (userAnswers[i] === undefined) {
      unanswered.push(i + 1);
    }
  }
  
  if (unanswered.length > 0) {
    alert(currentLanguage === 'ko' 
      ? `응답하지 않은 질문이 있습니다: ${unanswered.join(", ")}번` 
      : `Please answer all questions. Missing: ${unanswered.join(", ")}`);
    return;
  }
  
  showScreen("results-screen");
  showResults();
}

// --- 5. SCORING & VISUALIZATION LOGIC ---

let calculatedGiftsSorted = []; // Stores final sorted results [{gift: '...', score: 10, maxScore: 25, percent: 40}]

function calculateScores() {
  const scores = {};
  
  // Initialize all gifts for the active quiz
  if (activeQuizType === "lifeway") {
    Object.keys(GIFT_NAMES.Lifeway).forEach(g => scores[g] = 0);
  } else if (activeQuizType === "wagner") {
    Object.keys(GIFT_NAMES.Wagner).forEach(g => scores[g] = 0);
  } else if (activeQuizType === "giftstest") {
    Object.keys(GIFT_NAMES.GiftsTest).forEach(g => scores[g] = 0);
  } else if (activeQuizType === "mini") {
    Object.keys(GIFT_NAMES.Mini).forEach(g => scores[g] = 0);
  }
  
  // Sum up scores
  quizQuestions.forEach((q, idx) => {
    const gift = q.gift;
    const value = parseInt(userAnswers[idx]);
    if (scores[gift] !== undefined) {
      scores[gift] += value;
    }
  });
  
  // Format results
  const maxScore = activeQuizType === "wagner" ? 15 : (activeQuizType === "lifeway" ? 25 : 15);
  calculatedGiftsSorted = Object.entries(scores).map(([gift, score]) => {
    return {
      gift: gift,
      score: score,
      maxScore: maxScore,
      percent: (score / maxScore) * 100
    };
  });
  
  // Sort descending
  calculatedGiftsSorted.sort((a, b) => b.score - a.score || a.gift.localeCompare(b.gift));
}

function showResults() {
  calculateScores();
  
  const dict = TRANSLATIONS[currentLanguage];
  const topGiftObj = calculatedGiftsSorted[0];
  
  // Show top dominant gift
  const giftLocalName = GIFT_NAMES[activeQuizType === 'lifeway' ? 'Lifeway' : (activeQuizType === 'wagner' ? 'Wagner' : (activeQuizType === 'giftstest' ? 'GiftsTest' : 'Mini'))][topGiftObj.gift][currentLanguage];
  DOM.dominantName.innerHTML = `${giftLocalName} <span style="font-size: 1.1rem; opacity: 0.7; margin-left: 4px;">(${topGiftObj.score} / ${topGiftObj.maxScore})</span>`;
  DOM.dominantDescription.textContent = dict.gift_desc[topGiftObj.gift] || (currentLanguage === 'ko' ? "설명이 준비 중입니다." : "Description coming soon.");
  
  // Render list of scores
  DOM.chartContainer.innerHTML = "";
  calculatedGiftsSorted.forEach(item => {
    const row = document.createElement("div");
    row.className = "chart-row";
    
    const giftName = GIFT_NAMES[activeQuizType === 'lifeway' ? 'Lifeway' : (activeQuizType === 'wagner' ? 'Wagner' : (activeQuizType === 'giftstest' ? 'GiftsTest' : 'Mini'))][item.gift][currentLanguage];
    
    row.innerHTML = `
      <div class="chart-label-group">
        <span class="chart-label-name">${giftName}</span>
        <span class="chart-label-score">${item.score} / ${item.maxScore}</span>
      </div>
      <div class="chart-bar-track">
        <div class="chart-bar-fill" style="width: 0%"></div>
      </div>
    `;
    DOM.chartContainer.appendChild(row);
    
    // Animate widths
    setTimeout(() => {
      const fill = row.querySelector(".chart-bar-fill");
      if (fill) fill.style.width = `${item.percent}%`;
    }, 100);
  });
}

// --- 6. PLEDGE & COVENANT FLOW ---

function setupPledgeScreen() {
  // Populate checkbox list of ministry areas based on language
  const container = document.getElementById("ministry-checkbox-container");
  container.innerHTML = "";
  
  const ministries = [
    { key: "worship", name: { ko: "찬양 및 예배 예술 (Worship & Arts)", en: "Worship & Arts" }, desc: { ko: "찬양팀 보컬/인스트루먼트, 성가대, 예배실 데코레이션 등", en: "Worship team vocal/instrument, choir, decorating, etc." } },
    { key: "welcome", name: { ko: "안내 및 환대 (Welcoming & Hospitality)", en: "Welcoming & Hospitality" }, desc: { ko: "새가족 안내, 주차 봉사, 친교실 다과 및 바리스타 등", en: "Greeting visitors, parking helpers, coffee setup, etc." } },
    { key: "media", name: { ko: "미디어 및 음향 기술 (Media & Tech)", en: "Media & Tech" }, desc: { ko: "자막/PPT 기획, 음향 믹싱, 예배 사진 촬영 및 영상 편집", en: "PPT presentation slides, sound mixing, photography, video editing" } },
    { key: "smallgroup", name: { ko: "소그룹 조장/도우미 (Small Group Leader)", en: "Small Group Helper" }, desc: { ko: "소그룹 조장 또는 리더 지원, 조원 케어 및 친교 준비", en: "Group facilitator, checking in on members, prepping materials" } },
    { key: "prayer", name: { ko: "중보기도 사역 (Intercessory Prayer)", en: "Intercessory Prayer" }, desc: { ko: "공동체 기도제목 취합, 리트릿 중보기도팀 활동 등", en: "Gathering prayer requests, serving on the retreat prayer team" } },
    { key: "admin", name: { ko: "행정 및 기획/셋업 지원 (Admin & Setup)", en: "Administration & Setup" }, desc: { ko: "예배 인쇄물 제작, 장비 상하차 및 무대 세팅/철거 총괄", en: "Printing bulletins, setting up equipment, stage cleanup, schedule help" } }
  ];
  
  ministries.forEach(min => {
    const item = document.createElement("div");
    item.className = "pledge-checkbox-item";
    
    item.innerHTML = `
      <input type="checkbox" id="min-chk-${min.key}" value="${min.key}">
      <label class="pledge-checkbox-label" for="min-chk-${min.key}">
        <span class="pledge-checkbox-title">${min.name[currentLanguage]}</span>
        <span class="pledge-checkbox-desc">${min.desc[currentLanguage]}</span>
      </label>
    `;
    container.appendChild(item);
  });
  
  DOM.signatureInput.value = "";
  DOM.covenantCardArea.style.display = "none";
  DOM.shareCovenantBtn.style.display = "none";
}

function updateCovenantCardPreview() {
  const name = DOM.signatureInput.value.trim();
  if (!name) return;
  
  // Find selected ministries
  const selectedKeys = [];
  const checkboxes = document.querySelectorAll("#ministry-checkbox-container input[type='checkbox']");
  checkboxes.forEach(chk => {
    if (chk.checked) selectedKeys.push(chk.value);
  });
  
  const minTextMap = {
    worship: { ko: "찬양 및 예배 예술", en: "Worship & Arts" },
    welcome: { ko: "안내 및 환대", en: "Welcoming & Hospitality" },
    media: { ko: "미디어 및 음향 기술", en: "Media & Tech" },
    smallgroup: { ko: "소그룹 조장/도우미", en: "Small Group Leader" },
    prayer: { ko: "중보기도 사역", en: "Intercessory Prayer" },
    admin: { ko: "행정 및 기획/셋업 지원", en: "Administration & Setup" }
  };
  
  const selectedMinNames = selectedKeys.map(k => minTextMap[k][currentLanguage]);
  const localMinistryText = selectedMinNames.length > 0 
    ? selectedMinNames.join(", ") 
    : (currentLanguage === 'ko' ? "[사역 분야 선택 안 됨]" : "[No service areas selected]");
  
  // Get top 3 gifts
  const typeMap = activeQuizType === 'lifeway' ? 'Lifeway' : (activeQuizType === 'wagner' ? 'Wagner' : (activeQuizType === 'giftstest' ? 'GiftsTest' : 'Mini'));
  const topGiftsLocal = calculatedGiftsSorted.slice(0, 3).map(item => {
    return GIFT_NAMES[typeMap][item.gift][currentLanguage];
  });
  
  // Pledge statement selection
  const selectedPledgeOption = document.querySelector("input[name='pledge_option']:checked");
  const pledgeText = selectedPledgeOption.value === "1" 
    ? TRANSLATIONS[currentLanguage].pledge_preset_1
    : TRANSLATIONS[currentLanguage].pledge_preset_2;
  
  const dict = TRANSLATIONS[currentLanguage];
  const currentDate = new Date().toLocaleDateString(currentLanguage === 'ko' ? 'ko-KR' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  
  DOM.covenantCardArea.innerHTML = `
    <div class="covenant-card">
      <div class="covenant-title">${dict.covenant_title}</div>
      <div class="covenant-subtitle">${dict.covenant_subtitle}</div>
      <div class="covenant-body">
        ${currentLanguage === 'ko' 
          ? `하나님 앞에서 신실하게 거듭난 지체 <span class="covenant-name-highlight">${name}</span>(은)는 <br>
             자신의 핵심 은사 <span class="covenant-gifts-highlight">${topGiftsLocal.join(", ")}</span>(을)를 발견하고, <br>
             주님께서 머리 되신 교회의 <span class="covenant-ministry-highlight">${localMinistryText}</span> 사역으로 봉사할 것을 결단합니다.`
          : `Having discovered the spiritual design of <span class="covenant-gifts-highlight">${topGiftsLocal.join(", ")}</span>, <br>
             the beloved believer <span class="covenant-name-highlight">${name}</span> hereby pledges to serve the body of Christ <br>
             in the areas of <span class="covenant-ministry-highlight">${localMinistryText}</span>.`}
      </div>
      <div class="covenant-pledge-text">" ${pledgeText} "</div>
      <div class="covenant-footer">
        <div class="covenant-date">
          <div>${dict.covenant_date_label}</div>
          <div style="font-weight: 700; margin-top: 4px; color: var(--text-bright);">${currentDate}</div>
        </div>
        <div class="covenant-signature">
          <div class="covenant-signature-label">${dict.covenant_sig_label}</div>
          <div class="covenant-signature-value">${name}</div>
        </div>
      </div>
      <span class="covenant-corner-bl">✦</span>
      <span class="covenant-corner-br">✦</span>
    </div>
  `;
}

function generatePledgeCovenantCard() {
  const name = DOM.signatureInput.value.trim();
  if (!name) {
    alert(currentLanguage === 'ko' ? "서명을 위한 실명을 입력해 주세요." : "Please enter your name for the covenant signature.");
    return;
  }
  
  DOM.covenantCardArea.style.display = "block";
  DOM.shareCovenantBtn.style.display = "block";
  updateCovenantCardPreview();
  
  // Scroll to covenant card
  setTimeout(() => {
    DOM.covenantCardArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function copyCovenantToClipboard() {
  const name = DOM.signatureInput.value.trim();
  const currentDate = new Date().toLocaleDateString(currentLanguage === 'ko' ? 'ko-KR' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  
  // Find selected ministries
  const selectedKeys = [];
  const checkboxes = document.querySelectorAll("#ministry-checkbox-container input[type='checkbox']");
  checkboxes.forEach(chk => {
    if (chk.checked) selectedKeys.push(chk.value);
  });
  const minTextMap = {
    worship: { ko: "찬양 및 예배 예술", en: "Worship & Arts" },
    welcome: { ko: "안내 및 환대", en: "Welcoming & Hospitality" },
    media: { ko: "미디어 및 음향 기술", en: "Media & Tech" },
    smallgroup: { ko: "소그룹 조장/도우미", en: "Small Group Leader" },
    prayer: { ko: "중보기도 사역", en: "Intercessory Prayer" },
    admin: { ko: "행정 및 기획/셋업 지원", en: "Administration & Setup" }
  };
  const selectedMinNames = selectedKeys.map(k => minTextMap[k][currentLanguage]);
  const ministryText = selectedMinNames.join(", ");
  
  const typeMap = activeQuizType === 'lifeway' ? 'Lifeway' : (activeQuizType === 'wagner' ? 'Wagner' : (activeQuizType === 'giftstest' ? 'GiftsTest' : 'Mini'));
  const topGiftsText = calculatedGiftsSorted.slice(0, 3).map(item => {
    const local = GIFT_NAMES[typeMap][item.gift][currentLanguage];
    return `${local}(${item.score}점)`;
  }).join(", ");
  
  const selectedPledgeOption = document.querySelector("input[name='pledge_option']:checked");
  const pledgeText = selectedPledgeOption.value === "1" 
    ? TRANSLATIONS[currentLanguage].pledge_preset_1
    : TRANSLATIONS[currentLanguage].pledge_preset_2;
  
  const testName = activeQuizType === 'lifeway' ? "Lifeway 공식 진단" : (activeQuizType === 'wagner' ? "바그너 은사 진단" : (activeQuizType === 'giftstest' ? "GiftsTest.com 진단" : "미니 단축 진단"));
  
  const copyText = `📜 [${TRANSLATIONS[currentLanguage].covenant_title} - ${testName}] 📜
──────────────────────────
👤 약정인: ${name}
📅 일자: ${currentDate}

✨ 나의 3대 주역 은사:
${topGiftsText}

🛠️ 결단한 봉사 사역 분야:
${ministryText || "선택된 사역 분야 없음"}

✍️ 결단 서약 내용:
"${pledgeText}"
──────────────────────────
Powered by Connect Retreat Spiritual Gifts Profiler`;

  navigator.clipboard.writeText(copyText)
    .then(() => {
      showToast(TRANSLATIONS[currentLanguage].copied_toast);
    })
    .catch(err => {
      console.error("Clipboard copy error:", err);
      // Fallback
      alert(copyText);
    });
}

function showToast(message) {
  DOM.toast.textContent = message;
  DOM.toast.classList.add("show");
  
  setTimeout(() => {
    DOM.toast.classList.remove("show");
  }, 3000);
}

// --- 7. FACILITATOR COMPILING & GROUP MATCHING ---

function parseFacilitatorData() {
  const rawData = DOM.resultsInput.value.trim();
  if (!rawData) {
    alert(currentLanguage === 'ko' ? "붙여넣은 텍스트가 비어 있습니다." : "Please paste result text first.");
    return;
  }
  
  participants = [];
  
  // Regex to match parsed information
  // Matches "약정인: [이름]" or "Name: [이름]" and "나의 3대 주역 은사:" or "Spiritual Gifts:"
  const blocks = rawData.split(/📜\s*\[/); // Splits by the start certificate mark
  
  blocks.forEach(block => {
    if (!block.trim()) return;
    
    // Parse Name
    let name = "";
    const nameMatch = block.match(/(?:약정인|👤\s*약정인|👤\s*Name|Name)\s*:\s*([^\n\r]+)/i);
    if (nameMatch) name = nameMatch[1].trim();
    
    // Parse test type
    let testType = "";
    const testMatch = block.match(/^(.*?)(?=\])/);
    if (testMatch) testType = testMatch[1].replace("은사 결단 약정서 - ", "").trim();
    
    // Parse Gifts and Scores
    // Format: "목양(15점)" or "Teaching(15)"
    const giftsList = [];
    const giftMatch = block.match(/(?:나의 3대 주역 은사|대표 은사|주요 은사|Gifts):\s*\n?([^\n\r]+)/i);
    if (giftMatch) {
      const items = giftMatch[1].split(/[,|]/);
      items.forEach(item => {
        const itemClean = item.trim();
        const giftScoreMatch = itemClean.match(/^([^\(]+)\s*\((\d+)(?:점)?\)/);
        if (giftScoreMatch) {
          giftsList.push({
            gift: giftScoreMatch[1].trim(),
            score: parseInt(giftScoreMatch[2])
          });
        } else if (itemClean) {
          giftsList.push({
            gift: itemClean,
            score: 5 // Default score fallback
          });
        }
      });
    }
    
    if (name) {
      participants.push({
        name: name,
        testType: testType || "Spiritual Gifts Test",
        gifts: giftsList
      });
    }
  });
  
  // If parsing blocks failed, try alternative parsing line by line
  if (participants.length === 0) {
    const lines = rawData.split("\n");
    let currentParticipant = null;
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith("약정인:") || trimmed.startsWith("Name:") || trimmed.startsWith("👤 약정인:")) {
        if (currentParticipant) participants.push(currentParticipant);
        currentParticipant = {
          name: trimmed.split(":")[1].trim(),
          testType: "Spiritual Gifts Test",
          gifts: []
        };
      } else if (trimmed.startsWith("나의 3대 주역 은사:") || trimmed.startsWith("Gifts:")) {
        if (currentParticipant) {
          const rawGifts = trimmed.split(":")[1].trim();
          const items = rawGifts.split(",");
          items.forEach(it => {
            const m = it.trim().match(/^([^\(]+)\s*\((\d+)/);
            if (m) {
              currentParticipant.gifts.push({ gift: m[1].trim(), score: parseInt(m[2]) });
            }
          });
        }
      }
    });
    if (currentParticipant) participants.push(currentParticipant);
  }
  
  // Render participant table
  if (participants.length > 0) {
    DOM.membersListCard.style.display = "block";
    DOM.memberCountBadge.textContent = currentLanguage === 'ko' ? `총 ${participants.length}명` : `Total ${participants.length}`;
    
    DOM.membersTableBody.innerHTML = "";
    participants.forEach(p => {
      const tr = document.createElement("tr");
      const giftStrings = p.gifts.map(g => `${g.gift}(${g.score})`).join(", ");
      tr.innerHTML = `
        <td style="font-weight: 700; color: var(--text-bright);">${p.name}</td>
        <td style="font-size: 0.8rem; color: var(--text-muted);">${p.testType}</td>
        <td style="color: var(--color-primary);">${giftStrings}</td>
      `;
      DOM.membersTableBody.appendChild(tr);
    });
  } else {
    alert(currentLanguage === 'ko' ? "참가자 결과를 파싱하지 못했습니다. 형식을 확인해 주세요." : "Could not parse any participant data. Make sure it contains '약정인: [이름]' and '나의 3대 주역 은사:'");
  }
}

function generateFacilitatorGroups() {
  const groupCount = parseInt(DOM.groupCountInput.value);
  if (isNaN(groupCount) || groupCount < 1) {
    alert("Please enter a valid group count.");
    return;
  }
  
  if (participants.length === 0) {
    alert("No participants loaded.");
    return;
  }
  
  // Initialize groups
  const groups = Array.from({ length: groupCount }, (_, i) => ({
    id: i + 1,
    members: []
  }));
  
  const criterion = document.querySelector("input[name='criteria']:checked").value;
  
  // Sort participants by their first gift's name to balance them
  const sortedParticipants = [...participants].sort((a, b) => {
    const gA = a.gifts[0] ? a.gifts[0].gift : "";
    const gB = b.gifts[0] ? b.gifts[0].gift : "";
    return gA.localeCompare(gB);
  });
  
  if (criterion === "diverse") {
    // Round robin distribution of sorted members to keep gifts diverse within groups
    sortedParticipants.forEach((p, index) => {
      const targetGroup = groups[index % groupCount];
      targetGroup.members.push(p);
    });
  } else {
    // Group similar gifts together: sort by primary gift, and stack them in groups sequentially
    const chunk = Math.ceil(sortedParticipants.length / groupCount);
    sortedParticipants.forEach((p, index) => {
      const targetGroupIndex = Math.min(Math.floor(index / chunk), groupCount - 1);
      groups[targetGroupIndex].members.push(p);
    });
  }
  
  // Render groups
  DOM.groupsResultCard.style.display = "block";
  DOM.groupsContainer.innerHTML = "";
  
  groups.forEach(g => {
    const card = document.createElement("div");
    card.className = "group-card";
    
    let membersHtml = "";
    g.members.forEach(m => {
      const primaryGift = m.gifts[0] ? m.gifts[0].gift : "Gifts";
      membersHtml += `
        <div class="group-member-item">
          <span>${m.name}</span>
          <span class="group-member-tag">${primaryGift}</span>
        </div>
      `;
    });
    
    card.innerHTML = `
      <h4>Group ${g.id}</h4>
      <div>${membersHtml || (currentLanguage === 'ko' ? "조원 없음" : "No members")}</div>
    `;
    DOM.groupsContainer.appendChild(card);
  });
  
  // Scroll to results
  setTimeout(() => {
    DOM.groupsResultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function copyGroupsToClipboard() {
  const cards = DOM.groupsContainer.querySelectorAll(".group-card");
  let outputText = `📢 [소그룹 조 편성 결과] 📢
──────────────────────────
`;
  
  cards.forEach(card => {
    const title = card.querySelector("h4").textContent;
    outputText += `
📍 ${title}
`;
    
    const items = card.querySelectorAll(".group-member-item");
    items.forEach(it => {
      const name = it.querySelector("span:first-child").textContent;
      const tag = it.querySelector(".group-member-tag").textContent;
      outputText += `- ${name} (${tag})
`;
    });
  });
  
  outputText += `
──────────────────────────
Powered by Connect Retreat Facilitator Tool`;
  
  navigator.clipboard.writeText(outputText)
    .then(() => {
      showToast(currentLanguage === 'ko' ? "조 편성 결과가 복사되었습니다!" : "Team allocations copied!");
    })
    .catch(err => {
      console.error("Error copying groups:", err);
      alert(outputText);
    });
}

// Start PWA Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('ServiceWorker registration successful with scope: ', reg.scope))
      .catch(err => console.log('ServiceWorker registration failed: ', err));
  });
}

// Run
window.addEventListener("DOMContentLoaded", init);
