/* Pono Learning Quest v36.6 - 平和で豊かな暮らしを目ざして */
(function(){
'use strict';
const UNIT="平和で豊かな暮らしを目ざして";
const LEARN=["1945年に戦争が終わったとき、日本の多くの都市や工場は空襲で大きな被害を受けていました。家を失った人や、食べ物が足りず困る人も多く、暮らしを立て直すことが大きな課題でした。", "日本は連合国軍の占領下に置かれました。連合国軍最高司令官総司令部をGHQといいます。日本政府はGHQの方針のもと、政治や社会のしくみを変える改革を進めました。", "農地改革では、地主が持つ多くの農地を買い上げ、小作人などに売り渡しました。自分の土地を持って耕す農民が増え、農村のしくみが大きく変わりました。", "戦後には女性にも国政選挙の投票権が認められました。1946年の衆議院議員総選挙では、女性が初めて投票し、女性の国会議員も誕生しました。", "日本国憲法は1946年11月3日に公布され、1947年5月3日に施行されました。「公布」は新しい決まりを知らせること、「施行」はその決まりが実際に効力を持ち始めることです。", "日本国憲法の三つの基本原則は「国民主権」「基本的人権の尊重」「平和主義」です。戦前の大日本帝国憲法と比べ、主権のあり方や人々の権利について大きく変わりました。", "1947年には教育のしくみも変わり、小学校6年・中学校3年の9年間が義務教育になりました。男女が同じ学校で学ぶことも広がっていきました。", "1950年に朝鮮戦争が始まると、日本の企業は軍需品などの注文を受けるようになりました。これを「特需」といい、戦争による被害を受けた朝鮮半島の人々がいる一方、日本経済の回復を後押ししました。", "1951年、日本は多くの国とサンフランシスコ平和条約を結びました。条約は1952年に発効し、占領が終わって日本は主権を回復しました。ただし沖縄などには別の状況が続きました。", "1956年、日本は国際連合（国連）に加盟しました。国際社会の中で協力する役割を担うようになりました。", "1950年代半ばから1970年代初めにかけて日本の経済は急速に成長しました。これを「高度経済成長」といいます。工業製品の生産が増え、人々の生活も変化しました。", "洗濯機・冷蔵庫・テレビなどの家電が広まり、家事や生活が便利になりました。地方から都市へ移る人も増え、住宅・交通などの新しい課題も生まれました。", "1964年、東京オリンピックが開かれ、東海道新幹線が開業しました。交通の発展や国際交流の広がりを示す出来事でした。1970年には大阪で日本万国博覧会（大阪万博）が開かれました。", "工業が急速に発展する一方、工場の排水や煙などによる公害が深刻になりました。水俣病は工場排水中のメチル水銀による健康被害、四日市ぜんそくは大気汚染による健康被害として知られています。", "公害で健康や生活を奪われた人々が声を上げ、企業や行政の責任が問われました。環境を守る法律や対策が整えられ、1971年には環境庁が発足しました。便利さだけでなく、安全や健康を守ることも重要です。", "沖縄は戦後も長い間アメリカの施政権下に置かれました。1972年に沖縄は日本へ復帰しましたが、アメリカ軍の基地は現在も多く残り、地域の暮らしと安全に関わる問題が続いています。", "1973年の石油危機（オイルショック）では石油の値段が上がり、生活や工業が大きな影響を受けました。海外の資源に頼ることの課題が明らかになりました。", "戦後の日本は民主化、経済発展、国際協力を進めました。その一方で、公害や地域格差、戦争の記憶、基地の問題などの課題もあります。「豊かさ」とは何かを、平和・人権・環境の視点から考えることが大切です。"];
const PRACTICE=[{"l": "b", "cat": "戦後の政治", "q": "戦後、日本の占領政策を進めた連合国軍最高司令官総司令部を何という？", "a": "GHQ", "w": ["国際連合（国連）", "日本銀行"], "ex": "GHQは占領政策を進め、日本の改革に大きく関わりました。"}, {"l": "b", "cat": "選挙", "q": "女性が初めて参加した衆議院議員総選挙は何年？", "a": "1946年", "w": ["1925年", "1956年"], "ex": "1946年の衆議院議員総選挙で女性が初めて投票しました。"}, {"l": "b", "cat": "憲法", "q": "日本国憲法が施行されたのはいつ？", "a": "1947年5月3日", "w": ["1946年11月3日", "1952年4月28日"], "ex": "日本国憲法は1946年11月3日に公布、1947年5月3日に施行されました。"}, {"l": "b", "cat": "憲法", "q": "国の政治のあり方を最終的に決める権限が国民にあるという原則は？", "a": "国民主権", "w": ["基本的人権の尊重", "平和主義"], "ex": "国民主権は日本国憲法の三つの基本原則の一つです。"}, {"l": "b", "cat": "農村の改革", "q": "地主の農地を買い上げ、小作人などが自分の土地を持てるようにした改革は？", "a": "農地改革", "w": ["地租改正", "廃藩置県"], "ex": "農地改革によって自分の土地を耕す農民が増えました。"}, {"l": "b", "cat": "講和", "q": "1951年に日本が多くの国と結んだ平和条約は？", "a": "サンフランシスコ平和条約", "w": ["日米和親条約", "日清講和条約"], "ex": "1952年にこの条約が発効し、日本は主権を回復しました。"}, {"l": "b", "cat": "国際社会", "q": "日本が国際連合（国連）に加盟したのは何年？", "a": "1956年", "w": ["1945年", "1972年"], "ex": "日本は1956年に国連に加盟しました。"}, {"l": "b", "cat": "経済", "q": "1950年代半ばから1970年代初めにかけて経済が急速に発展したことを何という？", "a": "高度経済成長", "w": ["世界恐慌", "石油危機"], "ex": "高度経済成長によって工業が発展し、家電などが広がりました。"}, {"l": "b", "cat": "交通", "q": "1964年に東京オリンピックと同じ年に開業した交通機関は？", "a": "東海道新幹線", "w": ["山陽新幹線", "青函トンネル"], "ex": "東海道新幹線は1964年に開業しました。"}, {"l": "b", "cat": "沖縄", "q": "沖縄が日本に復帰したのは何年？", "a": "1972年", "w": ["1952年", "1964年"], "ex": "沖縄は1972年に日本に復帰しました。"}, {"l": "s", "cat": "憲法・資料", "q": "【資料】「1946年11月3日」と「1947年5月3日」の二つの日付がある。正しい説明は？", "a": "1946年に公布、1947年に施行", "w": ["1946年に施行、1947年に公布", "両方とも公布の日"], "ex": "憲法を国民に知らせた日が公布、効力を持ち始めた日が施行です。"}, {"l": "s", "cat": "戦後の政治", "q": "【資料】選挙で投票する女性たちの1946年の写真。この資料が示す変化は？", "a": "女性も国政選挙に参加できるようになった", "w": ["女性はまだ投票できなかった", "国会が廃止された"], "ex": "1946年の衆議院選挙で初めて女性が投票できました。"}, {"l": "s", "cat": "復興・国際関係", "q": "1952年に日本が主権を回復しても、沖縄の復帰が1972年だったのはなぜ？", "a": "沖縄ではアメリカの施政権が続いていたから", "w": ["沖縄は独立した別の国だったから", "日本が国連に加盟していなかったから"], "ex": "本土の占領終了後も沖縄にはアメリカの施政権が続いていました。"}, {"l": "s", "cat": "経済と暮らし", "q": "【資料】家電の普及率と自動車生産が大きく増えた。最も関係する変化は？", "a": "高度経済成長", "w": ["農地改革だけ", "大政奉還"], "ex": "工業が発達し、家電や自動車の利用が増えた時期です。"}, {"l": "s", "cat": "公害と環境", "q": "工場の排水が水質を悪化させ、健康被害が生じた。学ぶべきこととして最も適切なのは？", "a": "経済発展と同時に環境や健康を守る必要がある", "w": ["工業が発展すれば公害は必ずなくなる", "公害は交通だけで起こる"], "ex": "公害の被害から、環境や健康を守るための対策が進められました。"}, {"l": "a", "cat": "歴史のつながり", "q": "戦後の改革と現在の日本の政治をつなげて考えると、重要な変化は？", "a": "国民の権利と政治参加を重視する仕組みが整えられた", "w": ["大名による藩の支配が復活した", "選挙で代表者を選ぶ仕組みがなくなった"], "ex": "日本国憲法と選挙制度の改革は、民主的な政治の基礎につながりました。"}, {"l": "a", "cat": "豊かさを考える", "q": "高度経済成長の成果と課題を両方表す説明は？", "a": "暮らしは便利になった一方、公害などの問題も生まれた", "w": ["工業が成長すると生活への悪影響は起こらなかった", "経済成長によって家電も交通も普及しなかった"], "ex": "生産や交通の発展と、公害などの課題をあわせて捉えることが大切です。"}, {"l": "a", "cat": "複数の視点", "q": "1952年の主権回復と1972年の沖縄復帰を一緒に学ぶ理由として適切なのは？", "a": "戦後の変化が地域によって異なり、課題も残ったことを理解するため", "w": ["全国の占領が1972年まで同じように続いたから", "沖縄には戦後の変化がなかったから"], "ex": "沖縄には本土と異なる占領の歴史があり、復帰後も基地の課題が続きました。"}];
const TEST=[{"cat": "戦後の政治", "type": "choice", "q": "戦後の日本で占領政策を進めた組織は？", "a": "GHQ", "w": ["国際連合（国連）", "日本銀行"], "ex": "連合国軍最高司令官総司令部をGHQといいます。"}, {"cat": "農地改革", "type": "choice", "q": "戦後の農地改革が目ざした変化は？", "a": "小作人などが自分の農地を持てるようにすること", "w": ["地主がすべての農地をまとめて所有すること", "農地をすべて国有化して農業を禁止すること"], "ex": "農地改革で自分の土地を持って耕す農民が増えました。"}, {"cat": "選挙", "type": "choice", "q": "女性が初めて投票した衆議院議員総選挙はいつ？", "a": "1946年", "w": ["1925年", "1956年"], "ex": "女性が初めて国政選挙で投票したのは1946年です。"}, {"cat": "憲法", "type": "choice", "q": "日本国憲法が公布された日は？", "a": "1946年11月3日", "w": ["1947年5月3日", "1952年4月28日"], "ex": "1946年11月3日に公布され、翌年に施行されました。"}, {"cat": "憲法", "type": "choice", "q": "日本国憲法が施行された日は？", "a": "1947年5月3日", "w": ["1946年11月3日", "1951年9月8日"], "ex": "1947年5月3日から効力を持ち始めました。"}, {"cat": "憲法", "type": "choice", "q": "日本国憲法の三つの基本原則の組み合わせとして正しいのは？", "a": "国民主権・基本的人権の尊重・平和主義", "w": ["天皇主権・身分制度・平和主義", "国民主権・徴兵制・身分制度"], "ex": "国民主権・基本的人権の尊重・平和主義が三つの基本原則です。"}, {"cat": "教育", "type": "choice", "q": "1947年に始まった義務教育の仕組みは？", "a": "小学校6年と中学校3年の9年間", "w": ["小学校4年と中学校4年の8年間", "小学校6年のみの6年間"], "ex": "戦後の教育改革で9年間の義務教育が整えられました。"}, {"cat": "経済", "type": "choice", "q": "1950年の朝鮮戦争をきっかけに日本の企業への注文が増えたことを何という？", "a": "特需", "w": ["地租改正", "殖産興業"], "ex": "朝鮮戦争による特需は日本経済の回復を後押ししました。"}, {"cat": "講和", "type": "choice", "q": "1951年に結ばれ、翌1952年に発効した条約は？", "a": "サンフランシスコ平和条約", "w": ["日米和親条約", "下関条約"], "ex": "サンフランシスコ平和条約は1952年に発効しました。"}, {"cat": "講和", "type": "choice", "q": "1952年のサンフランシスコ平和条約発効によって起きた変化は？", "a": "日本が主権を回復し、占領が終わった", "w": ["沖縄のアメリカによる施政権も同時に終わった", "日本が国連に初めて加盟した"], "ex": "1952年に日本は主権を回復しましたが、沖縄は1972年までアメリカの施政権下でした。"}, {"cat": "国際社会", "type": "choice", "q": "日本が国際連合（国連）に加盟した年は？", "a": "1956年", "w": ["1947年", "1972年"], "ex": "1956年、日本は国連に加盟しました。"}, {"cat": "経済", "type": "choice", "q": "1950年代半ばから1970年代初めにかけての急速な経済発展は？", "a": "高度経済成長", "w": ["石油危機", "世界恐慌"], "ex": "高度経済成長では生産や生活が大きく変化しました。"}, {"cat": "交通", "type": "choice", "q": "1964年に開業した新幹線は？", "a": "東海道新幹線", "w": ["山陽新幹線", "東北新幹線"], "ex": "1964年に東海道新幹線が開業しました。"}, {"cat": "国際交流", "type": "choice", "q": "1964年に東京で開かれた世界的なスポーツ大会は？", "a": "東京オリンピック", "w": ["大阪万博", "札幌冬季オリンピック"], "ex": "1964年の東京オリンピックは国際交流の象徴となりました。"}, {"cat": "環境", "type": "choice", "q": "工場排水のメチル水銀による健康被害として知られる公害病は？", "a": "水俣病", "w": ["四日市ぜんそく", "イタイイタイ病"], "ex": "水俣病はメチル水銀に汚染された魚介類などを通した健康被害です。"}, {"cat": "環境", "type": "choice", "q": "工業化で大気や水が汚れ、住民の健康に被害が出る問題は？", "a": "公害", "w": ["農地改革", "地方自治"], "ex": "工場排水や煙などによる公害が社会問題になりました。"}, {"cat": "沖縄", "type": "choice", "q": "沖縄が日本に復帰した年は？", "a": "1972年", "w": ["1952年", "1964年"], "ex": "沖縄は1972年に日本へ復帰しました。"}, {"cat": "資源・経済", "type": "choice", "q": "1973年、石油価格の上昇が生活や産業に影響した出来事は？", "a": "石油危機", "w": ["世界恐慌", "満州事変"], "ex": "1973年の石油危機は資源への依存を考えるきっかけになりました。"}, {"cat": "記述", "type": "input", "q": "1946年に公布され、1947年に施行された、現在の日本の政治の基本となる憲法の名前を書きましょう。", "a": "日本国憲法", "keys": ["日本国憲法"], "ex": "日本国憲法は国民主権・基本的人権の尊重・平和主義を基本原則とします。"}, {"cat": "記述", "type": "input", "q": "1950年代半ばから日本の経済が急速に発展したことを、漢字6文字で書きましょう。", "a": "高度経済成長", "keys": ["高度経済成長"], "ex": "高度経済成長により産業や生活が変化し、公害などの課題も生じました。"}];

let st=null;
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function norm(s){return String(s||'').replace(/[。、，,\s「」『』（）()・％%]/g,'');}
function order(q,i){const items=[q.a,...q.w].map((t,n)=>({t,ok:n===0}));const indices=[[1,0,2],[2,1,0],[0,2,1],[1,2,0],[2,0,1],[0,1,2]];return indices[(i*5+1)%indices.length].map(n=>items[n]);}
function voice(ta,msg){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){msg.textContent='この端末では音声入力が使えません。文字入力を使ってください。';return;}
 try{const r=new SR();r.lang='ja-JP';r.onresult=ev=>{ta.value=ev.results[0][0].transcript;msg.textContent='声を文字にしました。内容を確認してから進みましょう。';};r.onerror=()=>msg.textContent='聞き取れませんでした。もう一度お試しください。';r.start();}catch(err){msg.textContent='マイクを開始できませんでした。';}}
function menu(){head(`社会｜${UNIT}`,()=>subjectGradeTerms('社会',6));
 A.append(e('div','card',`<div class="tiny">小学6年 社会 ＞ 日本の歴史</div><h2>${UNIT}</h2><p>戦後の民主化・復興・経済成長を、歴史の流れと暮らしの両方から学びましょう。</p>`));
 A.append(btn('📖 学ぶ',learn,'primary'));
 A.append(btn('🌱 練習問題をやる',()=>startPractice('b'),'soft'));
 A.append(btn('📝 小単元テスト20問',startTest,'soft'));
}
function learn(){head(`📖 学ぶ｜${UNIT}`,menu);
 const b=e('div','card lesson peace366lesson',`<h2>${UNIT}</h2><p class="tiny">「いつ」「なぜ」「どのように暮らしが変わったか」を確認します。</p>`);
 LEARN.forEach((x,i)=>{if([0,4,8,10,13,15].includes(i)){
  const names={0:'① 戦後の出発',4:'② 新しい憲法と教育',8:'③ 主権回復と世界との関係',10:'④ 経済成長と豊かな暮らし',13:'⑤ 公害と環境',15:'⑥ 沖縄・石油危機・これから'};
  b.appendChild(e('h3','peace366section',esc(names[i])));
 }
 const d=e('div','soc352learn',`<b>${i+1}</b><span>${esc(x)}</span>`);b.appendChild(d);});A.append(b);
 A.append(e('div','card',`<h2>🗓️ 戦後の年表</h2>
 <div class="peace366timeline">
 <section><strong>1945年</strong><span>終戦・占領開始</span><small>食料不足などから復興を始める</small></section>
 <section><strong>1946年</strong><span>女性が初めて国政選挙で投票</span><small>日本国憲法が公布される</small></section>
 <section><strong>1947年</strong><span>日本国憲法を施行</span><small>新しい教育制度も始まる</small></section>
 <section><strong>1951・1952年</strong><span>平和条約の調印・発効</span><small>1952年に主権を回復する</small></section>
 <section><strong>1956年</strong><span>国連加盟</span><small>国際社会の一員として協力する</small></section>
 <section><strong>1964年</strong><span>東京オリンピック・東海道新幹線</span><small>経済成長と交通の発展</small></section>
 <section><strong>1972年</strong><span>沖縄の日本復帰</span><small>長く続いたアメリカの施政権が終わる</small></section>
 <section><strong>1973年</strong><span>石油危機</span><small>資源に頼る社会の課題が見える</small></section>
 </div>`));
 A.append(e('div','card',`<h2>🔎 暮らしはどのように変わった？</h2>
 <div class="peace366compare">
 <section><strong>🏚️ 戦争直後</strong><span>住む家・食べ物の不足</span><small>まちや工場の再建が必要だった</small></section>
 <section><strong>🗳️ 民主化</strong><span>選挙・憲法・学校の改革</span><small>政治参加と人々の権利を重視する制度へ</small></section>
 <section><strong>🚄 高度経済成長</strong><span>工場・家電・交通が発達</span><small>便利な生活が広がった</small></section>
 <section><strong>🌱 新たな課題</strong><span>公害・資源・地域の問題</span><small>健康、環境、地域の暮らしを考える必要がある</small></section>
 </div>
 <div class="peace366path"><span>復興</span><b>→</b><span>民主化</span><b>→</b><span>経済成長</span><b>→</b><span>新しい課題への取り組み</span></div>
 <p class="peace366notice"><b>考えてみよう：</b>生活が便利になることと、平和・人権・環境を守ることは、どのようにつながっているでしょう。</p>`));
 A.append(btn('🔊 説明を聞く',()=>speakJP(`${UNIT}。${LEARN.join('。')}`),'soft'));
 A.append(btn('🌱 基礎10問へ',()=>startPractice('b'),'primary'));
}
function level(l){return l==='b'?'🌱 基礎':l==='s'?'📘 標準':'🌟 応用';}
function startPractice(l){st={mode:'p',l,qs:PRACTICE.filter(q=>q.l===l),i:0,first:0,miss:new Set()};practiceQ();}
function practiceQ(){const q=st.qs[st.i];if(!q)return practiceDone();head(`${level(st.l)} ${st.i+1} / ${st.qs.length}｜${UNIT}`,menu);
 A.append(e('div','card',`<p class="tiny">${esc(q.cat)}</p><h2>${esc(q.q)}</h2>`));
 order(q,st.i).forEach(x=>A.append(btn(x.t,()=>practiceAns(x.ok,q),'soft')));
}
function practiceAns(ok,q){if(!ok){st.miss.add(st.i);head('🌱 もう一度確認しよう',practiceQ);A.append(e('div','card warn',`<h2>答えと説明</h2><p><b>答え：</b>${esc(q.a)}</p><p>${esc(q.ex)}</p>`));A.append(btn('同じ問題をもう一度',practiceQ,'primary'));return;}
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
 try{records.push({studentId:profile.id,date:new Date().toISOString(),subject:'社会',grade:6,unit:UNIT,content:'小単元テスト20問',correct:c,total:20,rate:score,score,status:`テスト ${score}点`});save();}catch(err){}
}
function review(){head(`答えと解説｜${UNIT}`,result);st.ans.forEach((a,i)=>A.append(e('div',`card ${a.ok?'good':'warn'}`,`<div class="tiny">問${i+1}｜${a.ok?'○':'×'}</div><h3>${esc(a.q.q)}</h3><p><b>あなたの答え：</b>${esc(a.user)}</p><p><b>答え：</b>${esc(a.q.a)}</p><p>${esc(a.q.ex)}</p>`)));}
// 小学6年社会「日本の歴史」の既存小単元ボタンを、詳細教材へつなぐ。
document.addEventListener('click',function(ev){const b=ev.target&&ev.target.closest?ev.target.closest('button'):null;if(!b)return;
 const txt=(b.textContent||'').replace(/^\s*\d+\.\s*/,'').trim();if(txt!==UNIT)return;
 const page=(document.body&&document.body.innerText)||'';if(!page.includes('日本の歴史'))return;
 ev.preventDefault();ev.stopImmediatePropagation();menu();},true);
})();
