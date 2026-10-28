/* Pono Learning Quest v37.0 - 小学6年社会 地球規模の課題と国際協力 */
(function(){
'use strict';
const UNIT="地球規模の課題の解決と国際協力";
const CHAPTERS=[{"title":"① 世界にはどんな課題がある？","summary":"一つの国だけでは解決できない問題を知ろう。","learn":["世界には、気候変動、貧困、食料不足、紛争、感染症など、国境をこえて影響する課題があります。このような問題を「地球規模の課題」といいます。","たとえば、大気に出た温室効果ガスは国境で止まりません。ある地域の環境の変化が、別の地域の暮らしや農業にも影響することがあります。","食べ物や薬を必要としている人がいても、道路や水道、学校、病院などが整っていないと、暮らしを立て直すのは難しくなります。","課題は一つずつ別に起こるとは限りません。干ばつによって作物が育たなくなり、食料の値段が上がるなど、いくつもの問題がつながります。"]},{"title":"② 気候変動と環境を守る取組","summary":"原因と影響をつなげて考えてみよう。","learn":["石油や石炭などを燃やすと、二酸化炭素などの温室効果ガスが出ます。温室効果ガスが増えることは、地球の平均気温が上がる原因の一つです。","気温の上昇によって、熱波や大雨、干ばつなどの起こり方が変わるおそれがあります。影響の大きさは地域によって異なります。","海のごみや森林の減少、生き物のすみかが失われることも環境問題です。ごみが川から海へ流れたり、森林の変化が気候に影響したりします。","再生可能エネルギーの利用、省エネルギー、森林の保全などに加えて、国どうしが話し合い、技術や情報を共有することが必要です。"]},{"title":"③ 子どもの権利と、世界の暮らし","summary":"教育・健康・安全がつながっていることを知ろう。","learn":["世界には、貧困や紛争、災害などのために、学校へ通うことや安全な水を使うことが難しい子どもたちがいます。","子どもには、学ぶことや健康に育つこと、安全に暮らすことなどの権利があります。子どもの権利を守ることは、国際協力の大切な目的の一つです。","感染症が広がったときは、医療や情報を共有し、必要な人に予防や治療の機会が届くようにすることが重要です。","紛争で住んでいた場所を離れた人々には、食料や住まいだけでなく、心身の安全、教育、将来の生活を考えた支援も必要です。"]},{"title":"④ 国際連合と専門機関の役割","summary":"どの組織が、何を支えているか整理しよう。","learn":["国際連合（国連）は、第二次世界大戦後の1945年に設立され、世界の平和や安全、国際協力に取り組んでいます。","UNICEF（ユニセフ）は、子どもの命や権利を守り、教育や健康などの支援に取り組む国連の機関です。","UNHCR（国連難民高等弁務官事務所）は、難民などの保護を支えます。WFP（世界食糧計画）は、食料支援などに取り組みます。","WHO（世界保健機関）は、世界の健康に関する取組を支え、病気や感染症への国際的な対応にも関わります。国際機関は役割を分担して協力しています。"]},{"title":"⑤ SDGsと日本の国際協力","summary":"世界の目標と、日本ができる協力を知ろう。","learn":["2015年に国際連合で、2030年を目標年とするSDGs（持続可能な開発目標）が採択されました。SDGsには、貧困・教育・健康・環境など、17の目標があります。","SDGsは、社会・経済・環境を大切にしながら、将来の世代も暮らし続けられる社会を目ざす考え方です。「誰一人取り残さない」という考えも重視しています。","ODA（政府開発援助）は、政府が開発途上国の発展や人々の福祉を支えるために行う協力です。日本のJICA（国際協力機構）は、技術協力や資金協力などを担っています。","政府だけでなく、NGOなどの民間団体、企業、研究者、地域の人々も協力できます。支援するときには、その地域の人々の希望や必要なことを確かめることが大切です。"]},{"title":"⑥ 資料を読み、行動を考えよう","summary":"資料の数字と、暮らしのつながりを読み取ろう。","learn":["気温のグラフを読むときは、「何年から何年までか」「単位は何か」「増えているか、減っているか」を見ます。短い期間だけで長期的な気候変動を決めつけないことも大切です。","【架空の資料】ある町では、毎年捨てられる食べ物が100箱から80箱になりました。この場合、捨てられる食べ物は20箱減ったと読み取れます。","災害の支援を考えるときは、被害を受けた人々が何を必要としているかを確かめ、国・国際機関・NGO・地域の人たちが役割を分担します。","身近なごみや食品ロスを減らす行動も大切ですが、世界の課題は個人だけでは解決できません。社会の仕組みや国際的な協力も合わせて考えましょう。"]}];
const PRACTICE=[{"l":"b","cat":"ことば","q":"国境をこえて影響する大きな問題を何といいますか。","a":"地球規模の課題","w":["一つの家庭だけの予定","学校の時間割"],"ex":"気候変動、貧困、感染症などは地球規模の課題です。"},{"l":"b","cat":"環境","q":"地球温暖化の原因の一つになる気体はどれですか。","a":"二酸化炭素","w":["酸素だけ","窒素だけ"],"ex":"二酸化炭素などの温室効果ガスが増えると、地球の気温に影響します。"},{"l":"b","cat":"環境","q":"太陽光や風力のように自然の力を利用するエネルギーを何といいますか。","a":"再生可能エネルギー","w":["化石燃料だけ","原子力だけ"],"ex":"太陽光や風力は再生可能エネルギーの例です。"},{"l":"b","cat":"組織","q":"世界の平和や国際協力を進めるために1945年に設立された組織は？","a":"国際連合","w":["世界貿易の会社","日本の市議会"],"ex":"国際連合（国連）は1945年に設立されました。"},{"l":"b","cat":"子ども","q":"子どもの権利や健康・教育を支える国連の機関は？","a":"UNICEF（ユニセフ）","w":["WFP","UNHCR"],"ex":"UNICEFは子どもの命や権利を守る活動に取り組みます。"},{"l":"b","cat":"難民","q":"難民などの保護を主に支える国連の機関は？","a":"UNHCR","w":["UNICEF","WFP"],"ex":"UNHCRは難民などの保護に取り組みます。"},{"l":"b","cat":"食料","q":"災害や紛争などで食料が足りない人々を支援する国連の機関は？","a":"WFP","w":["WHO","UNESCO"],"ex":"WFPは世界食糧計画で、食料支援などを行います。"},{"l":"b","cat":"健康","q":"世界の健康や感染症対策を支える国際機関は？","a":"WHO","w":["WFP","UNHCR"],"ex":"WHOは世界保健機関です。"},{"l":"b","cat":"SDGs","q":"SDGsの目標はいくつありますか。","a":"17","w":["8","30"],"ex":"SDGsには17の目標があります。"},{"l":"b","cat":"日本の協力","q":"政府が開発途上国の発展などを支える協力を何といいますか。","a":"ODA（政府開発援助）","w":["参勤交代","鎖国"],"ex":"ODAは政府開発援助で、国際協力の方法の一つです。"},{"l":"s","cat":"関連づけ","q":"【資料】気温の変化を調べるグラフがあります。正しく比べるために大切なのは？","a":"調べた期間と単位を確かめる","w":["棒の色だけで判断する","最初の年を見ずに比べる"],"ex":"グラフは期間・単位・変化の大きさを確認して読み取ります。"},{"l":"s","cat":"子どもの権利","q":"【資料】災害後、子どもたちに飲み水と学ぶ場所が必要です。適切な支援は？","a":"水や衛生と教育の両方を支える","w":["学校だけを再開して水は考えない","飲み水だけで安全や教育を考えない"],"ex":"暮らしの課題はつながっているため、複数の支援が必要です。"},{"l":"s","cat":"SDGs","q":"SDGsの「誰一人取り残さない」に近い考え方は？","a":"立場の違う人にも支援や機会が届くようにする","w":["支援の届きやすい人だけを選ぶ","国によって人権を考えなくてよいとする"],"ex":"支援や機会が届きにくい人のことも考える姿勢が大切です。"},{"l":"s","cat":"資料","q":"【架空の資料】食品ロスが100箱から80箱に減りました。何箱減りましたか。","a":"20箱","w":["10箱","180箱"],"ex":"100－80＝20で、20箱減りました。"},{"l":"s","cat":"協力","q":"国際協力をするとき、最も大切な進め方は？","a":"現地の人々の希望や必要なことを確かめる","w":["支援する側だけで全てを決める","現地の意見を聞かない"],"ex":"相手の立場を尊重し、必要な支援を一緒に考えます。"},{"l":"a","cat":"思考・活用","q":"干ばつによって作物が育たなくなった地域を支えるには、どんな考え方が必要？","a":"食料支援と水・農業など長期的な対策を組み合わせる","w":["一度だけ食べ物を送れば他は考えない","その地域だけで解決させる"],"ex":"急いで必要な支援と、将来の暮らしを支える取組を組み合わせます。"},{"l":"a","cat":"国際協力","q":"感染症が複数の国に広がったとき、国際協力が必要な理由は？","a":"情報や医療の知識を共有して対策できるから","w":["国ごとに情報を隠す方が安全だから","他国と協力しても役立たないから"],"ex":"感染症は国境をこえるため、情報共有と協力が重要です。"},{"l":"a","cat":"総合","q":"環境のための行動について、最も適切な考えはどれですか。","a":"一人ひとりの工夫と社会・国どうしの取組を組み合わせる","w":["個人の努力だけで全て解決できる","政府だけが行動し人々は関係ない"],"ex":"地球規模の課題には個人、地域、企業、政府、国際機関の協力が必要です。"}];
const TEST=[{"cat":"環境","type":"choice","q":"地球規模の課題の例として適切なのはどれですか。","a":"気候変動","w":["校内だけの掃除当番","個人の筆箱の色"],"ex":"気候変動は国境をこえて影響する課題です。"},{"cat":"環境","type":"choice","q":"地球温暖化に関係する温室効果ガスの例は？","a":"二酸化炭素","w":["酸素だけ","ヘリウムだけ"],"ex":"二酸化炭素などの温室効果ガスが増えることは温暖化の要因の一つです。"},{"cat":"環境","type":"choice","q":"再生可能エネルギーの例として正しいのは？","a":"太陽光や風力","w":["石炭や石油だけ","ガソリンだけ"],"ex":"太陽光や風力は再生可能エネルギーです。"},{"cat":"世界の暮らし","type":"choice","q":"安全な水や学校の不足が子どもの暮らしに与える影響は？","a":"健康や学ぶ機会に影響する","w":["健康にも学習にも関係しない","教育だけを考えれば水は不要"],"ex":"水・衛生・教育などは関係し合っています。"},{"cat":"組織","type":"choice","q":"1945年に設立され、平和や協力に取り組む組織は？","a":"国際連合","w":["WFP","JICA"],"ex":"国際連合は第二次世界大戦後の1945年に設立されました。"},{"cat":"組織","type":"choice","q":"子どもの権利や健康・教育を支援する国連の機関は？","a":"UNICEF","w":["WHO","UNHCR"],"ex":"UNICEFは子どもの権利や健康、教育などを支えています。"},{"cat":"組織","type":"choice","q":"難民の保護に取り組む国連の機関は？","a":"UNHCR","w":["WFP","UNICEF"],"ex":"UNHCRは難民などの保護を支えます。"},{"cat":"組織","type":"choice","q":"食料支援に主に取り組む国連の機関は？","a":"WFP","w":["WHO","UNHCR"],"ex":"WFPは世界食糧計画です。"},{"cat":"組織","type":"choice","q":"世界の健康に関する取組を支える機関は？","a":"WHO","w":["WFP","JICA"],"ex":"WHOは世界保健機関です。"},{"cat":"SDGs","type":"choice","q":"SDGsが国際連合で採択されたのは何年ですか。","a":"2015年","w":["1945年","2000年"],"ex":"SDGsは2015年に採択されました。"},{"cat":"SDGs","type":"choice","q":"SDGsが目標とする年はいつですか。","a":"2030年","w":["2050年","1990年"],"ex":"SDGsは2030年を目標年としています。"},{"cat":"SDGs","type":"choice","q":"SDGsの目標は全部でいくつありますか。","a":"17","w":["10","50"],"ex":"SDGsは17の目標から成り立ちます。"},{"cat":"SDGs","type":"choice","q":"「誰一人取り残さない」という考えに近いのは？","a":"支援を受けにくい人の立場も考える","w":["支援しやすい人だけを考える","貧困と教育は別問題として考えない"],"ex":"SDGsは誰一人取り残さないことを重視します。"},{"cat":"日本の国際協力","type":"choice","q":"日本の政府開発援助の略称はどれですか。","a":"ODA","w":["SDGs","NGO"],"ex":"ODAは政府開発援助です。"},{"cat":"日本の国際協力","type":"choice","q":"日本のODAの実施を担う国際協力機構の略称は？","a":"JICA","w":["UNICEF","WFP"],"ex":"JICAは国際協力機構で、技術協力などに取り組みます。"},{"cat":"資料の読み方","type":"choice","q":"資料の二つの数字を比べるとき、先に確かめることは？","a":"期間や単位がそろっているか","w":["棒の色が同じか","文字の大きさが同じか"],"ex":"条件をそろえて比べることが資料を読む基本です。"},{"cat":"資料の読み取り","type":"choice","q":"【架空の資料】100箱あった食品ロスが80箱になりました。減った量は？","a":"20箱","w":["80箱","180箱"],"ex":"100－80＝20で、20箱減っています。"},{"cat":"総合","type":"choice","q":"災害で困っている地域を支援するときに大切なのは？","a":"現地の人の必要や希望を確かめて協力する","w":["支援側の都合だけで決める","一つの物だけを大量に送れば十分"],"ex":"現地の希望を聞き、必要な支援を連携して行うことが大切です。"},{"cat":"記述","type":"input","q":"持続可能な開発目標の英語の略称を、アルファベットで書きましょう。","a":"SDGs","keys":["sdgs"],"ex":"SDGsは17の目標からなる、2030年に向けた世界共通の目標です。"},{"cat":"記述","type":"input","q":"世界の平和や国際協力に取り組む国際組織の名前を書きましょう。","a":"国際連合（国連）","alternatives":["国際連合","国連","UN"],"ex":"国際連合（国連）は1945年に設立されました。"}];

let state=null;
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function norm(v){return String(v??'').replace(/[。、，,\s「」『』（）()・％%]/g,'').toLowerCase();}
function options(q,i){
 const arr=[q.a,...q.w].map((t,n)=>({t,ok:n===0}));
 const orders=[[1,0,2],[0,2,1],[2,1,0],[1,2,0],[2,0,1],[0,1,2]];
 return orders[i%orders.length].map(j=>arr[j]);
}
function speak(v){
 if(typeof speakJP==='function'){speakJP(v);return;}
 if('speechSynthesis' in window){const u=new SpeechSynthesisUtterance(v);u.lang='ja-JP';u.rate=.83;speechSynthesis.cancel();speechSynthesis.speak(u);}
}
function voice(input,msg){
 const R=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!R){msg.textContent='この端末では音声入力が使えません。文字入力を使ってください。';return;}
 try{const r=new R();r.lang='ja-JP';r.onresult=ev=>{input.value=ev.results[0][0].transcript;msg.textContent='声を文字にしました。内容を確認してください。';};r.onerror=()=>{msg.textContent='うまく聞き取れませんでした。';};r.start();}
 catch(err){msg.textContent='マイクを開始できませんでした。';}
}
function answerOK(q,user){
 const n=norm(user);
 if(Array.isArray(q.alternatives))return q.alternatives.some(x=>n===norm(x)||n.includes(norm(x)));
 return (q.keys||[q.a]).every(k=>n.includes(norm(k)));
}
function menu(){
 head(`社会｜${UNIT}`,()=>subjectGradeTerms('社会',6));
 A.append(e('div','card',`<div class="tiny">小学6年 社会 ＞ 世界の中の日本</div><h2>${UNIT}</h2><p>気候変動・子どもの権利・国際連合・SDGsを、身近な例からつなげて学びます。</p>`));
 A.append(btn('📖 学ぶ（6つの短い章）',()=>learn(0),'primary'));
 A.append(btn('🌱 練習問題をやる',()=>startPractice('b'),'soft'));
 A.append(btn('📝 小単元テスト20問',startTest,'soft'));
}
function block(text,i){return `<div class="soc352learn"><b>${i+1}</b><span>${esc(text)}</span></div>`;}
function diagram(i){
 if(i===0)return `<div class="world370flow"><span>🌍 地球規模の課題</span><b>↓</b><span>気候・食料・安全などが互いに影響</span><b>↓</b><span>国と地域、世界の組織が協力</span></div><p class="world370tip">一つの課題が、別の課題につながることもあります。</p>`;
 if(i===1)return `<div class="world370grid"><section><strong>🏭 原因の例</strong><span>化石燃料の使用</span><small>二酸化炭素などの温室効果ガスが増える</small></section><section><strong>🌡️ 変化</strong><span>気温の上昇</span><small>世界の気候や海などに影響</small></section><section><strong>🌾 暮らしへの影響</strong><span>干ばつ・大雨・熱波など</span><small>農業や健康、住まいに影響することがある</small></section><section><strong>🌱 取り組み</strong><span>省エネ・再生可能エネルギー</span><small>国や企業、地域が協力して進める</small></section></div>`;
 if(i===2)return `<div class="world370grid"><section><strong>🚰 安全な水</strong><span>健康と衛生</span><small>病気を防ぐ土台になる</small></section><section><strong>📚 学ぶ機会</strong><span>教育</span><small>子どもの将来の可能性につながる</small></section><section><strong>🏠 暮らしと安全</strong><span>住まい・食料</span><small>安心できる生活を支える</small></section><section><strong>🤝 権利の尊重</strong><span>子どもの声を大切にする</span><small>必要な支援を一緒に考える</small></section></div>`;
 if(i===3)return `<div class="world370grid"><section><strong>🌐 国際連合（国連）</strong><span>平和と国際協力</span><small>1945年に設立</small></section><section><strong>🧒 UNICEF</strong><span>子どもの権利・健康・教育</span><small>子どもたちを支援</small></section><section><strong>🏡 UNHCR</strong><span>難民などの保護</span><small>安全と権利を守る</small></section><section><strong>🍚 WFP</strong><span>食料支援</span><small>災害や紛争などで食料が不足する人々を支える</small></section><section><strong>🩺 WHO</strong><span>世界の健康</span><small>感染症などへの対応にも関わる</small></section></div>`;
 if(i===4)return `<div class="world370flow"><span>🌏 世界共通の目標：SDGs（17目標）</span><b>↓</b><span>国際連合・各国の政府・企業・NGOなど</span><b>↓</b><span>🇯🇵 日本ではODA・JICAなどの協力</span><b>↓</b><span>現地の人々の声を聞き、共に進める</span></div>`;
 return `<div class="world370grid"><section><strong>📈 グラフを見る</strong><span>年・単位・変化を確認</span><small>資料の条件を確かめて比べる</small></section><section><strong>🍱 身近な暮らしを見る</strong><span>食べ物・水・ごみ</span><small>原因と影響、社会の仕組みを考える</small></section><section><strong>🤝 支援を考える</strong><span>必要なことを確かめる</span><small>支援する側の決めつけを避ける</small></section></div>`;
}
function learn(i){
 const c=CHAPTERS[i];head(`📖 学ぶ｜${UNIT}`,menu);
 const pct=(i+1)*100/CHAPTERS.length;
 A.append(e('div','card lesson world370lesson',`<div class="world370progress"><b>学ぶ ${i+1} / ${CHAPTERS.length}</b><div class="world370bar" role="progressbar" aria-label="学習の進み具合" aria-valuenow="${i+1}" aria-valuemin="0" aria-valuemax="${CHAPTERS.length}"><i style="width:${pct}%"></i></div></div><h2>${esc(c.title)}</h2><p class="tiny">${esc(c.summary)}</p>${c.learn.map(block).join('')}</div>`));
 A.append(e('div','card',`<h2>👀 図で確認しよう</h2>${diagram(i)}`));
 A.append(btn('🔊 この章の説明を聞く',()=>speak(c.learn.join('。')),'soft'));
 if(i>0)A.append(btn('← 前の章へ',()=>learn(i-1),'soft'));
 A.append(btn(i<CHAPTERS.length-1?'次の章へ →':'🌱 基礎10問へ',i<CHAPTERS.length-1?()=>learn(i+1):()=>startPractice('b'),'primary'));
}
function level(l){return l==='b'?'🌱 基礎':l==='s'?'📘 標準':'🌟 応用';}
function startPractice(l){state={kind:'practice',level:l,questions:PRACTICE.filter(q=>q.l===l),i:0,first:0,miss:new Set()};practiceQuestion();}
function practiceQuestion(){
 const s=state,q=s.questions[s.i];if(!q)return practiceDone();
 head(`${level(s.level)} ${s.i+1}/${s.questions.length}｜${UNIT}`,menu);
 A.append(e('div','card',`<p class="tiny">${esc(q.cat)}</p><h2>${esc(q.q)}</h2>`));
 A.append(btn('🔊 問題を聞く',()=>speak(q.q),'soft'));
 options(q,s.i).forEach(x=>A.append(btn(x.t,()=>practiceAnswer(x.ok,q),'soft')));
}
function practiceAnswer(ok,q){
 const s=state;
 if(!ok){s.miss.add(s.i);head('🌱 解説を確認',practiceQuestion);A.append(e('div','card warn',`<h2>この問題の答え</h2><p><b>答え：</b>${esc(q.a)}</p><p>${esc(q.ex)}</p>`));A.append(btn('同じ問題をもう一度',practiceQuestion,'primary'));return;}
 if(!s.miss.has(s.i))s.first++;
 if(window.ponoCorrectSound)window.ponoCorrectSound();
 head('○ できました',practiceQuestion);A.append(e('div','card good',`<p><b>答え：</b>${esc(q.a)}</p><p>${esc(q.ex)}</p>`));
 s.i++;A.append(btn(s.i<s.questions.length?'次の問題へ':'結果を見る',s.i<s.questions.length?practiceQuestion:practiceDone,'primary'));
}
function practiceDone(){
 const s=state,need=s.level==='b'?8:s.level==='s'?4:0,passed=s.level==='a'||s.first>=need;
 head(`${level(s.level)} 結果｜${UNIT}`,menu);
 A.append(e('div',`card ${passed?'good':'warn'}`,`<h2>${passed?'✨ できました':'🌱 復習してみよう'}</h2><p>初回正解 ${s.first} / ${s.questions.length}問</p><p class="tiny">練習は、間違えた問題を学び直しながら進められます。</p>`));
 if(passed&&s.level==='b')A.append(btn('📘 標準5問へ',()=>startPractice('s'),'primary'));
 if(passed&&s.level==='s')A.append(btn('🌟 応用3問へ',()=>startPractice('a'),'primary'));
 if(s.level==='a')A.append(btn('📝 小単元テストへ',startTest,'primary'));
 A.append(btn('同じレベルをもう一度',()=>startPractice(s.level),'soft'));
 A.append(btn('📖 学ぶへ戻る',()=>learn(0),'soft'));
}
function startTest(){state={kind:'test',questions:TEST.map(q=>({...q})),i:0,answers:[],saved:false};testQuestion();}
function testQuestion(){
 const s=state,q=s.questions[s.i];if(!q)return result();
 head(`📝 テスト ${s.i+1}/${s.questions.length}｜${UNIT}`,menu);
 A.append(e('div','card',`<h2>${esc(q.q)}</h2><p class="tiny">${esc(q.cat)}｜5点</p>`));
 A.append(btn('🔊 問題を聞く',()=>speak(q.q),'soft'));
 if(q.type==='input'){
  const panel=e('div','card soft','<b>答えを書こう（音声入力も使えます）</b>'),ta=document.createElement('textarea');ta.rows=2;ta.setAttribute('aria-label','記述の答え');panel.append(ta);
  const msg=e('div','tiny','');panel.append(btn('🎤 音声で答える',()=>voice(ta,msg),'soft'));panel.append(msg);
  panel.append(btn('この答えで次へ',()=>{const user=ta.value.trim();if(!user){msg.textContent='答えを入力してください。';return;}record(answerOK(q,user),user,q)},'primary'));A.append(panel);
 }else options(q,s.i).forEach(x=>A.append(btn(x.t,()=>record(x.ok,x.t,q),'soft')));
 A.append(e('p','tiny','※テスト中は正解・ヒントを表示しません。'));
}
function record(ok,user,q){state.answers.push({ok,user,q});state.i++;state.i<state.questions.length?testQuestion():result();}
function result(){
 const s=state,correct=s.answers.filter(a=>a.ok).length,score=correct*5;
 head(`採点結果｜${UNIT}`,menu);
 A.append(e('div',`card ${score>=70?'good':'warn'}`,`<h2>${score}点 / 100点</h2><p>${correct} / 20問 正解</p><p class="tiny">記述問題の自動採点は目安です。表記の違いなどは先生が確認してください。</p>`));
 A.append(btn('📖 答えと解説を見る',review,'primary'));
 A.append(btn('🌱 基礎から復習',()=>startPractice('b'),'soft'));
 if(!s.saved){s.saved=true;try{records.push({studentId:profile.id,date:new Date().toISOString(),subject:'社会',grade:6,unit:UNIT,content:'小単元テスト20問',correct,total:20,rate:score,score,status:`テスト ${score}点`});save();}catch(err){}}
}
function review(){
 head(`答えと解説｜${UNIT}`,result);
 state.answers.forEach((a,i)=>A.append(e('div',`card ${a.ok?'good':'warn'}`,`<div class="tiny">問${i+1}｜${a.ok?'○':'×'}</div><h3>${esc(a.q.q)}</h3><p><b>あなたの答え：</b>${esc(a.user)}</p><p><b>答え：</b>${esc(a.q.a)}</p><p>${esc(a.q.ex)}</p>`)));
}
// 第6学年社会「世界の中の日本」小単元ボタンを詳細学習につなぎます。
document.addEventListener('click',function(ev){
 const b=ev.target&&ev.target.closest?ev.target.closest('button'):null;if(!b)return;
 const name=(b.textContent||'').replace(/^\s*\d+\.\s*/,'').trim();
 if(name!==UNIT)return;
 const body=(document.getElementById('app')?.textContent||'');
 if(!body.includes('世界の中の日本'))return;
 ev.preventDefault();ev.stopImmediatePropagation();menu();
},true);
})();
