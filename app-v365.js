/* Pono Learning Quest v36.5 - 戦争と人々の暮らし */
(function(){
'use strict';
const UNIT="戦争と人々の暮らし";
const LEARN=["第一次世界大戦の後、日本では人々の政治への参加を求める動きが広まりました。1925年に普通選挙法が成立し、25歳以上のすべての男子に衆議院議員の選挙権が認められました。ただし女性にはまだ選挙権がありませんでした。同じ年、政治運動などを取りしまる治安維持法も成立しました。", "1929年に始まった世界恐慌は日本の経済にも大きな影響を与え、仕事や暮らしが苦しくなる人が増えました。国内では軍部の発言力が強まり、政治が変化していきました。", "1931年、日本の関東軍が中国東北部（満州）で満州事変を起こしました。その後、日本は満州国の成立に関わり、国際社会との対立が強まりました。", "1937年、日本と中国の間で日中戦争が始まりました。戦いは長引き、中国の多くの人々が命を失い、暮らしや自由を奪われるなど大きな被害を受けました。", "1939年、ヨーロッパで第二次世界大戦が始まりました。日本は1941年12月、アメリカのハワイの真珠湾などを攻撃し、アメリカやイギリスなどとの太平洋戦争に入りました。", "日本軍はアジアや太平洋の広い地域へ戦争を拡大しました。日本による侵攻や植民地支配のもとで、アジアの多くの人々が被害を受けました。日本国内の被害だけでなく、他国の人々への影響も学ぶことが大切です。", "1938年に国家総動員法が制定され、戦争を続けるため、人・物資・経済などを政府が広く統制できるようになりました。国民の暮らしも戦争を中心に変えられました。", "食料や衣服などが不足し、配給によって受け取る品物や量が制限されました。代用品が使われ、家庭でも節約や物資の供出が求められました。", "多くの大人が戦争に動員され、学生や生徒も工場などで働く勤労動員に参加しました。戦争が長引くにつれ、学校で十分に学べない子どもたちも増えました。", "都市への空襲が激しくなると、子どもたちは安全のために都市を離れて地方へ移ることがありました。これを学童疎開といいます。家族と離れ、慣れない場所で暮らした子どももいました。", "1945年には日本各地が激しい空襲を受け、多くの市民が犠牲になりました。家や学校、町が焼け、生活の基盤も失われました。", "1945年の沖縄戦では、地上戦に住民が巻き込まれ、多くの人々が命を落としました。戦争による被害が大きかった場所として、沖縄の歴史にも目を向けます。", "1945年8月6日に広島、8月9日に長崎へ原子爆弾が投下されました。多くの命が奪われ、被爆による健康や生活への影響は戦後も長く続きました。", "1945年8月15日、日本では政府がポツダム宣言を受け入れたことが国民に伝えられました。日本が降伏文書に調印したのは9月2日です。戦争が終わっても、家族や住まいを失った人々の苦しみは続きました。", "この単元では「なぜ戦争が広がったか」「戦争によって暮らしがどう変わったか」「日本とアジアの人々に何が起きたか」を、年表・写真・当時の記録を通して考えましょう。資料にある事実と自分の考えを分けることも大切です。"];
const PRACTICE=[{"l": "b", "cat": "政治", "q": "1925年に成立し、25歳以上のすべての男子に選挙権を認めた法律は？", "a": "普通選挙法", "w": ["治安維持法", "国家総動員法"], "ex": "普通選挙法により、一定の年齢以上の男子に納税額によらない選挙権が認められました。女性の選挙権はまだ認められていませんでした。"}, {"l": "b", "cat": "年代", "q": "1931年に日本の関東軍が中国東北部で起こした出来事は？", "a": "満州事変", "w": ["日中戦争", "太平洋戦争"], "ex": "1931年の満州事変をきっかけに、日本は中国東北部への支配を強めました。"}, {"l": "b", "cat": "年代", "q": "1937年に日本と中国の間で本格化した戦争は？", "a": "日中戦争", "w": ["日露戦争", "日清戦争"], "ex": "1937年に日中戦争が始まり、戦いが長引きました。"}, {"l": "b", "cat": "年代", "q": "日本が1941年にアメリカ・イギリスなどとの間で始めた戦争は？", "a": "太平洋戦争", "w": ["日清戦争", "戊辰戦争"], "ex": "1941年12月、日本はアメリカやイギリスなどとの戦争に入りました。"}, {"l": "b", "cat": "政治", "q": "1938年、戦争のために人や物資などを国が広く統制する根拠となった法律は？", "a": "国家総動員法", "w": ["普通選挙法", "学制"], "ex": "国家総動員法により、人・物資・経済などへの統制が強まりました。"}, {"l": "b", "cat": "暮らし", "q": "食料や生活用品を決められた量だけ受け取る仕組みは？", "a": "配給", "w": ["参勤交代", "自由貿易"], "ex": "不足した物資を管理して分けるため、配給が行われました。"}, {"l": "b", "cat": "子どもの生活", "q": "空襲の危険を避け、都市の子どもたちが地方へ移ることは？", "a": "学童疎開", "w": ["勤労動員", "廃藩置県"], "ex": "学童疎開では子どもたちが家族と離れ、地方で生活することもありました。"}, {"l": "b", "cat": "人々の生活", "q": "戦争中、学生や生徒が工場などで働くよう動員されたことは？", "a": "勤労動員", "w": ["学童疎開", "参勤交代"], "ex": "勤労動員によって、学校での学習より工場などでの仕事を求められた学生や生徒もいました。"}, {"l": "b", "cat": "戦争の被害", "q": "1945年に住民が地上戦へ巻き込まれ、多くの犠牲が出た地域は？", "a": "沖縄", "w": ["北海道", "京都"], "ex": "沖縄戦では一般の住民も戦闘に巻き込まれ、大きな被害を受けました。"}, {"l": "b", "cat": "終戦", "q": "日本で戦争の終結が国民に伝えられた1945年の日付は？", "a": "8月15日", "w": ["8月6日", "9月2日"], "ex": "1945年8月15日、政府がポツダム宣言を受け入れたことが国民に伝えられました。"}, {"l": "s", "cat": "資料・政治", "q": "【資料】1925年の選挙について「25歳以上の男子」と書かれている。この資料から分かることは？", "a": "女性にはまだ衆議院選挙の投票権がなかった", "w": ["18歳以上のすべての人が投票できた", "女性だけが投票できた"], "ex": "1925年の普通選挙法は男子に限られ、女性参政権が実現したのは戦後です。"}, {"l": "s", "cat": "資料・暮らし", "q": "【資料】家族が切符を出して米を受け取っている。最も関係の深い制度は？", "a": "配給", "w": ["自由な買い物だけ", "地租改正"], "ex": "配給では切符などを使って品物を受け取る仕組みが用いられました。"}, {"l": "s", "cat": "資料・子ども", "q": "【資料】都会から離れた旅館などで子どもたちが集団で生活している。考えられることは？", "a": "空襲を避けるための学童疎開", "w": ["修学旅行だけの記録", "参勤交代の一場面"], "ex": "都市への空襲を避けるため、集団で地方へ移った子どもたちがいました。"}, {"l": "s", "cat": "資料・時系列", "q": "次の出来事を古い順に正しく並べたものは？", "a": "満州事変 → 日中戦争 → 太平洋戦争", "w": ["太平洋戦争 → 満州事変 → 日中戦争", "日中戦争 → 太平洋戦争 → 満州事変"], "ex": "1931年満州事変、1937年日中戦争、1941年太平洋戦争の順です。"}, {"l": "s", "cat": "資料・被害", "q": "【資料】1945年、町の建物が焼け、家を失った人々が写っている。最も適切な読み取りは？", "a": "空襲で生活の場を失った人々がいた", "w": ["全国の町が無傷だった", "戦争中も暮らしは変わらなかった"], "ex": "1945年には各地への空襲により、多くの人が住まいや生活の基盤を失いました。"}, {"l": "a", "cat": "原因と結果", "q": "戦争が長引いたことと暮らしの変化を正しく結び付けたものは？", "a": "物資不足や人手不足が進み、配給や動員が広がった", "w": ["戦争が長引くほど物資が豊富になった", "子どもたちは全員いつも通り授業を受けられた"], "ex": "長期化する戦争は物資や人手を必要とし、日常生活や学校生活にも大きく影響しました。"}, {"l": "a", "cat": "視点を広げる", "q": "日本が関わった戦争の被害を調べるとき、どの見方が大切？", "a": "日本の人々とアジアなど他国の人々の被害の両方を調べる", "w": ["日本の被害だけを調べる", "戦争で失われたものを調べない"], "ex": "日本の空襲などによる被害と、日本の侵攻や植民地支配で他国の人々が受けた被害の両方を見ることが大切です。"}, {"l": "a", "cat": "資料を読み取る", "q": "戦時中の写真や日記を調べるとき、歴史の学び方として適切なのは？", "a": "資料が示す事実と自分の考えを区別する", "w": ["写真一枚だけで全ての人の暮らしを決めつける", "年代を確かめずに結論を出す"], "ex": "複数の資料を比べ、いつ・どこで・だれの記録なのか確認しながら考えます。"}];
const TEST=[{"cat": "普通選挙", "type": "choice", "q": "1925年に、25歳以上のすべての男子に選挙権を認めた法律は？", "a": "普通選挙法", "w": ["治安維持法", "国家総動員法"], "ex": "普通選挙法は男子に限った選挙権の拡大でした。女性に選挙権が認められたのは戦後です。"}, {"cat": "年代", "type": "choice", "q": "1931年に中国東北部で起こった出来事は？", "a": "満州事変", "w": ["日中戦争", "太平洋戦争"], "ex": "1931年に満州事変が起こり、日本が中国東北部への支配を強めました。"}, {"cat": "年代", "type": "choice", "q": "1937年、日本と中国の間で始まった戦争は？", "a": "日中戦争", "w": ["日清戦争", "日露戦争"], "ex": "1937年に始まった日中戦争は長期化し、多くの人々に被害を与えました。"}, {"cat": "世界との関わり", "type": "choice", "q": "1939年にヨーロッパで始まった世界規模の戦争は？", "a": "第二次世界大戦", "w": ["第一次世界大戦", "朝鮮戦争"], "ex": "第二次世界大戦は1939年にヨーロッパで始まり、各地へ拡大しました。"}, {"cat": "年代", "type": "choice", "q": "1941年、日本がアメリカやイギリスなどと始めた戦争は？", "a": "太平洋戦争", "w": ["日露戦争", "戊辰戦争"], "ex": "日本は1941年12月、真珠湾などを攻撃し、太平洋戦争に入りました。"}, {"cat": "法律", "type": "choice", "q": "戦時中、人・物資・経済などを国が統制する根拠となった1938年の法律は？", "a": "国家総動員法", "w": ["普通選挙法", "大日本帝国憲法"], "ex": "国家総動員法は戦争のために国内の資源を動員・統制する法律でした。"}, {"cat": "暮らし", "type": "choice", "q": "戦時中、食料や生活用品などを決められた量だけ受け取る仕組みは？", "a": "配給", "w": ["自由貿易", "年貢"], "ex": "物資が不足し、配給によって受け取る品物や量が制限されました。"}, {"cat": "子ども", "type": "choice", "q": "空襲から逃れるために、都市の子どもが地方へ移ることは？", "a": "学童疎開", "w": ["勤労動員", "参勤交代"], "ex": "学童疎開によって家族と離れて暮らす子どももいました。"}, {"cat": "子ども", "type": "choice", "q": "学生や生徒が工場などで働くよう動員されたことを何という？", "a": "勤労動員", "w": ["学童疎開", "天保の改革"], "ex": "勤労動員に参加し、学校で十分に学べなかった人々がいました。"}, {"cat": "学習・生活", "type": "choice", "q": "戦争中の学校や子どもたちの暮らしについて正しいものは？", "a": "戦争が長引くと勉強や家庭生活にも大きな影響が出た", "w": ["学校の授業は全国で常に同じように続いた", "子どもたちは戦争の影響を受けなかった"], "ex": "疎開や勤労動員、物資不足などで子どもたちの暮らしも変化しました。"}, {"cat": "都市の被害", "type": "choice", "q": "1945年の日本各地への空襲で多くの市民が直面したことは？", "a": "家や町が焼かれ生活の場を失った", "w": ["町の建物がすべて守られた", "食料や衣服が増え続けた"], "ex": "空襲により多くの人々が命や家を失い、生活に深刻な影響がありました。"}, {"cat": "沖縄戦", "type": "choice", "q": "1945年、地上戦に多くの住民が巻き込まれた地域は？", "a": "沖縄", "w": ["京都", "北海道"], "ex": "沖縄戦では住民も戦闘に巻き込まれ、多くの人々が犠牲になりました。"}, {"cat": "原子爆弾", "type": "choice", "q": "1945年8月6日に原子爆弾が投下された都市は？", "a": "広島", "w": ["長崎", "大阪"], "ex": "1945年8月6日に広島へ原子爆弾が投下されました。"}, {"cat": "原子爆弾", "type": "choice", "q": "1945年8月9日に原子爆弾が投下された都市は？", "a": "長崎", "w": ["広島", "神戸"], "ex": "1945年8月9日に長崎へ原子爆弾が投下されました。"}, {"cat": "終戦", "type": "choice", "q": "1945年、日本の国民に戦争の終結が伝えられた日は？", "a": "8月15日", "w": ["8月6日", "9月2日"], "ex": "8月15日、政府がポツダム宣言を受け入れたことが国民に伝えられました。降伏文書への調印は9月2日です。"}, {"cat": "アジアへの影響", "type": "choice", "q": "日本の戦争について学ぶとき正しい見方は？", "a": "日本国内だけでなくアジアなど他国の人々への被害も考える", "w": ["日本国内の被害だけが起こったと考える", "他国の人々には影響がなかったと考える"], "ex": "日本軍の侵攻や植民地支配によって、他国でも多くの人々が被害を受けました。"}, {"cat": "資料を読む", "type": "choice", "q": "戦争の時代の写真や記録を調べる際に大切なことは？", "a": "記録の年代や場所を確認し、複数の資料を比べる", "w": ["一枚の写真だけで全国の様子を決めつける", "資料の書かれた時代は確認しない"], "ex": "資料がいつどこで作られたかを確かめ、根拠をもって考えます。"}, {"cat": "出来事の順序", "type": "choice", "q": "出来事を古い順に正しく並べたものは？", "a": "満州事変 → 日中戦争 → 太平洋戦争 → 終戦", "w": ["終戦 → 太平洋戦争 → 日中戦争 → 満州事変", "日中戦争 → 満州事変 → 終戦 → 太平洋戦争"], "ex": "1931年、1937年、1941年、1945年という順に出来事が起こりました。"}, {"cat": "記述", "type": "input", "q": "1937年に日本と中国の間で始まった戦争の名前を書きましょう。", "a": "日中戦争", "keys": ["日中戦争"], "ex": "1937年に日中戦争が始まり、長期化しました。"}, {"cat": "記述", "type": "input", "q": "空襲の危険を避け、都市の子どもたちが地方へ移って生活したことを何といいますか。", "a": "学童疎開", "keys": ["学童疎開"], "ex": "学童疎開では家族と離れて地方で暮らす子どももいました。"}];

let st=null;
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function norm(s){return String(s||'').replace(/[。、，,\s「」『』（）()・％%]/g,'');}
function order(q,i){const items=[q.a,...q.w].map((t,n)=>({t,ok:n===0}));const indices=[[1,0,2],[2,1,0],[0,2,1],[1,2,0],[2,0,1],[0,1,2]];return indices[(i*5+1)%indices.length].map(n=>items[n]);}
function voice(ta,msg){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){msg.textContent='この端末では音声入力が使えません。文字入力を使ってください。';return;}
 try{const r=new SR();r.lang='ja-JP';r.onresult=ev=>{ta.value=ev.results[0][0].transcript;msg.textContent='音声を文字にしました。確認してから次へ進みましょう。';};r.onerror=()=>msg.textContent='聞き取れませんでした。もう一度お試しください。';r.start();}catch(e){msg.textContent='マイクを開始できませんでした。';}}
function menu(){head(`社会｜${UNIT}`,()=>subjectGradeTerms('社会',6));
 A.append(e('div','card',`<div class="tiny">小学6年 社会 ＞ 日本の歴史</div><h2>${UNIT}</h2><p>戦争の流れと人々の生活を、図と記録から学びましょう。</p><p class="tiny">学習内容には戦争や被害についての記述があります。つらくなったら休憩できます。</p>`));
 A.append(btn('📖 学ぶ',learn,'primary'));
 A.append(btn('🌱 練習問題をやる',()=>startPractice('b'),'soft'));
 A.append(btn('📝 小単元テスト20問',startTest,'soft'));
}
function learn(){head(`📖 学ぶ｜${UNIT}`,menu);
 const b=e('div','card lesson war365lesson',`<h2>${UNIT}</h2><p class="tiny">年号だけではなく、戦争と人々の暮らしのつながりを学びます。</p>`);
 LEARN.forEach((x,i)=>{const d=e('div','soc352learn',`<b>${i+1}</b><span>${esc(x)}</span>`);b.appendChild(d);});A.append(b);
 A.append(e('div','card',`<h2>🗓️ 年表で整理しよう</h2>
 <div class="war365timeline">
 <section><strong>1925年</strong><span>普通選挙法</span><small>男子の選挙権が広がる一方、女性にはまだ選挙権がない</small></section>
 <section><strong>1931年</strong><span>満州事変</span><small>中国東北部への支配が強まる</small></section>
 <section><strong>1937年</strong><span>日中戦争</span><small>戦争が長引き、被害が広がる</small></section>
 <section><strong>1941年</strong><span>太平洋戦争</span><small>アメリカやイギリスなどとも戦争になる</small></section>
 <section><strong>1945年 春</strong><span>沖縄戦・各地への空襲</span><small>多くの住民も被害を受ける</small></section>
 <section><strong>1945年 8月</strong><span>広島・長崎への原爆投下、終戦</span><small>8月6日広島・9日長崎・15日国民へ終戦を伝える</small></section>
 </div>
 <div class="war365path"><span>戦争の拡大</span><b>→</b><span>物資や人手の不足</span><b>→</b><span>暮らしの変化</span><b>→</b><span>大きな被害</span></div>`));
 A.append(e('div','card',`<h2>🏠 人々の暮らしはどう変わった？</h2>
 <div class="war365life">
 <section><strong>🍚 食べ物・生活用品</strong><span>配給と節約</span><small>自由に買えない品物が増える</small></section>
 <section><strong>🏭 学校・仕事</strong><span>勤労動員</span><small>学生・生徒も工場などで働く</small></section>
 <section><strong>🏡 子どもと家族</strong><span>学童疎開</span><small>空襲を避けて都市から地方へ移る</small></section>
 <section><strong>🕊️ 命と暮らし</strong><span>空襲・沖縄戦・原爆</span><small>命や住まいを失い、戦後も被害が続く</small></section>
 </div><div class="war365notice"><b>二つの視点を忘れずに</b><p>日本国内で被害を受けた人々と、日本の侵攻や植民地支配で被害を受けたアジアなど他国の人々。どちらの歴史も見つめることが大切です。</p></div>`));
 A.append(btn('🔊 説明を聞く',()=>speakJP(`${UNIT}。${LEARN.join('。')}`),'soft'));
 A.append(btn('🌱 基礎10問へ',()=>startPractice('b'),'primary'));
}
function level(l){return l==='b'?'🌱 基礎':l==='s'?'📘 標準':'🌟 応用';}
function startPractice(l){st={mode:'p',l,qs:PRACTICE.filter(q=>q.l===l),i:0,first:0,miss:new Set()};practiceQ();}
function practiceQ(){const q=st.qs[st.i];if(!q)return practiceDone();head(`${level(st.l)} ${st.i+1} / ${st.qs.length}｜${UNIT}`,menu);
 A.append(e('div','card',`<p class="tiny">${esc(q.cat)}</p><h2>${esc(q.q)}</h2>`));
 order(q,st.i).forEach(x=>A.append(btn(x.t,()=>practiceAns(x.ok,q),'soft')));
}
function practiceAns(ok,q){if(!ok){st.miss.add(st.i);head('🌱 確認してみよう',practiceQ);A.append(e('div','card warn',`<h2>答えと説明</h2><p><b>答え：</b>${esc(q.a)}</p><p>${esc(q.ex)}</p>`));A.append(btn('同じ問題をもう一度',practiceQ,'primary'));return;}
 if(!st.miss.has(st.i))st.first++;if(window.ponoCorrectSound)window.ponoCorrectSound();head('○ 正解',practiceQ);A.append(e('div','card good',`<h2>できました</h2><p><b>答え：</b>${esc(q.a)}</p><p>${esc(q.ex)}</p>`));st.i++;A.append(btn(st.i<st.qs.length?'次の問題へ':'結果を見る',st.i<st.qs.length?practiceQ:practiceDone,'primary'));
}
function practiceDone(){const need=st.l==='b'?8:st.l==='s'?4:0,pass=st.l==='a'||st.first>=need;head(`${level(st.l)}結果｜${UNIT}`,menu);
 A.append(e('div',`card ${pass?'good':'warn'}`,`<h2>${pass?'✨ できました':'🌱 もう一度確認してみよう'}</h2><p>初回正解 <b>${st.first} / ${st.qs.length}</b></p>`));
 if(st.l==='b'&&pass)A.append(btn('📘 標準5問へ',()=>startPractice('s'),'primary'));
 if(st.l==='s'&&pass)A.append(btn('🌟 応用3問へ',()=>startPractice('a'),'primary'));
 if(st.l==='a')A.append(btn('📝 小単元テストへ',startTest,'primary'));
 A.append(btn('🌱 このレベルをもう一度',()=>startPractice(st.l),'soft'));
 A.append(btn('📖 学ぶへ戻る',learn,'soft'));
}
function startTest(){st={mode:'t',qs:TEST.map(x=>({...x})),i:0,ans:[]};testQ();}
function testQ(){const q=st.qs[st.i];if(!q)return result();head(`📝 テスト ${st.i+1} / ${st.qs.length}｜${UNIT}`,menu);
 A.append(e('div','card',`<h2>${esc(q.q)}</h2><p class="tiny">${esc(q.cat)}｜5点</p>`));
 if(q.type==='input'){
   const b=e('div','card soft','<b>答えを書きましょう（音声入力も使えます）</b>'),ta=document.createElement('textarea');ta.rows=3;ta.setAttribute('aria-label','記述の答え');b.appendChild(ta);
   const m=e('div','tiny','');b.appendChild(btn('🎤 音声で答える',()=>voice(ta,m),'soft'));b.appendChild(m);
   b.appendChild(btn('この答えで次へ',()=>{const v=ta.value.trim();if(!v){m.textContent='答えを入力してください。';return;}record((q.keys||[q.a]).every(k=>norm(v).includes(norm(k))),v,q);},'primary'));A.append(b);
 }else order(q,st.i).forEach(x=>A.append(btn(x.t,()=>record(x.ok,x.t,q),'soft')));
 A.append(e('p','tiny','※テスト中は正解や解説を表示しません。'));
}
function record(ok,user,q){st.ans.push({ok,user,q});st.i++;st.i<st.qs.length?testQ():result();}
function result(){const c=st.ans.filter(x=>x.ok).length,score=c*5;head(`採点結果｜${UNIT}`,menu);
 A.append(e('div',`card ${score>=70?'good':'warn'}`,`<h2>${score}点 / 100点</h2><p>${c} / 20問 正解</p><p class="tiny">記述はキーワードによる自動採点の目安です。先生が表現を確認してください。</p>`));
 A.append(btn('📖 答えと解説を見る',review,'primary'));A.append(btn('🌱 基礎から復習する',()=>startPractice('b'),'soft'));
 try{records.push({studentId:profile.id,date:new Date().toISOString(),subject:'社会',grade:6,unit:UNIT,content:'小単元テスト20問',correct:c,total:20,rate:score,score,status:`テスト ${score}点`});save();}catch(e){}
}
function review(){head(`答えと解説｜${UNIT}`,result);st.ans.forEach((a,i)=>A.append(e('div',`card ${a.ok?'good':'warn'}`,`<div class="tiny">問${i+1}｜${a.ok?'○':'×'}</div><h3>${esc(a.q.q)}</h3><p><b>あなたの答え：</b>${esc(a.user)}</p><p><b>答え：</b>${esc(a.q.a)}</p><p>${esc(a.q.ex)}</p>`)));}
// Existing Grade 6 history list already contains this unit. Intercept its click to open the detailed lesson.
document.addEventListener('click',function(ev){const b=ev.target&&ev.target.closest?ev.target.closest('button'):null;if(!b)return;
 const txt=(b.textContent||'').replace(/^\s*\d+\.\s*/,'').trim();if(txt!==UNIT)return;
 const page=(document.body&&document.body.innerText)||'';if(!page.includes('日本の歴史'))return;
 ev.preventDefault();ev.stopImmediatePropagation();menu();},true);
})();
