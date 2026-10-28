/* Pono Learning Quest v37.1 — 小学6年 社会 全体総まとめ */
(function(){
'use strict';
const LESSONS=[{"section":"政治","title":"① ともに生きる暮らしと政治","intro":"政治は、みんなが安心して暮らせる社会をつくるために、決まりや予算を考え、実行する働きです。","points":[["日本国憲法の3つの原則","「国民主権」「基本的人権の尊重」「平和主義」。国民主権は、政治のあり方を最終的に決めるのが国民だということです。"],["三権分立","国会は法律をつくる「立法」、内閣は行政を進める「行政」、裁判所は裁判を行う「司法」。権力の集中を防ぐ仕組みです。"],["地方自治","都道府県や市町村では、住民の選挙で選ばれた議員・首長が、地域の条例や予算、暮らしに関わる仕事を進めます。"],["税金と公共サービス","税金は道路・消防・学校・福祉などに使われます。限られた予算を何に使うか、住民の声も大切です。"],["防災と助け合い","自助は自分の備え、共助は地域の人どうしの助け合い、公助は行政などの支援です。組み合わせることが大切です。"]],"flow":["憲法で政治の基本を定める","国や自治体が役割を分担する","住民の暮らしを支える"]},{"section":"歴史","title":"② 日本の歴史","intro":"いつ、何が起こったかだけでなく、前の時代から何が変わったのかを考えます。","points":[["縄文・弥生・古墳","狩りや採集を中心とした縄文時代、米づくりが広がった弥生時代、力を持つ豪族が古墳をつくった古墳時代へと変化しました。"],["飛鳥・奈良","聖徳太子（厩戸王）の政治、遣隋使、大化の改新などを経て、710年に平城京がつくられ、律令に基づく国づくりが進みました。"],["鎌倉・室町","源頼朝の鎌倉幕府では武士が政治の中心になりました。室町時代には金閣・銀閣、茶の湯・水墨画などの文化が育ちました。"],["戦国・江戸","織田信長・豊臣秀吉による全国統一の後、徳川家康が1603年に江戸幕府を開きました。参勤交代などで大名を統制しました。"],["明治の改革","廃藩置県によって藩をなくし、全国に府県を置きました。学制、地租改正、産業の近代化なども進みました。"],["戦争と戦後","戦争は多くの人々の命と暮らしに被害を与えました。1945年の終戦後、1947年施行の日本国憲法など新しい仕組みがつくられました。"]],"flow":["生活の変化と国づくり","武士の政治と文化","近代化・戦争・戦後の再出発"]},{"section":"世界","title":"③ 世界の中の日本","intro":"世界の国々は、物のやり取りだけでなく、人・文化・環境問題を通してつながっています。","points":[["輸入と輸出","「輸入」は外国から商品を買うこと。「輸出」は外国へ商品を売ること。原油などの資源を輸入し、自動車や機械などを輸出しています。"],["国々の位置と文化","中国・韓国は日本と同じ東アジアにあります。ブラジルは南アメリカにあり、ポルトガル語が公用語です。国の中にも多様な暮らしがあります。"],["国際理解","違う言語・宗教・習慣があるときは、違いを決めつけず、背景を知って互いに尊重することが大切です。"],["国際連合","国際連合（国連）は1945年に設立され、世界の平和と安全、国際協力を進めています。UNICEFは子どもの権利や健康・教育の支援を行います。"],["SDGsと地球規模の課題","気候変動・貧困・紛争などは一国だけでは解決できません。SDGsは、2030年を目標年とする17の持続可能な開発目標です。"]],"flow":["世界との貿易や交流","文化や人々を理解する","共通の課題に協力する"]}];
const PRACTICE=[{"area":"政治","cat":"人権","q":"すべての人が大切な権利をもつことを憲法では何といいますか。","a":"基本的人権の尊重","w":["富国強兵","鎖国"],"ex":"日本国憲法は基本的人権の尊重を原則としています。","type":"choice"},{"area":"政治","cat":"三権分立","q":"法律をもとに国の仕事を進める「行政」を担当する機関は？","a":"内閣","w":["国会","裁判所"],"ex":"内閣が行政を担当します。","type":"choice"},{"area":"政治","cat":"地方自治","q":"地域の決まりを何といいますか。","a":"条例","w":["条約","憲法だけ"],"ex":"条例は地方公共団体が定める決まりです。","type":"choice"},{"area":"政治","cat":"災害","q":"行政や消防など公的な機関による支援を何といいますか。","a":"公助","w":["共助","自助"],"ex":"公助は国や自治体などによる支援です。","type":"choice"},{"area":"歴史","cat":"古墳","q":"有力な豪族の大きな墓を何といいますか。","a":"古墳","w":["城下町","寺子屋"],"ex":"古墳の大きさなどから豪族の力が分かります。","type":"choice"},{"area":"歴史","cat":"奈良","q":"奈良時代に東大寺の大仏をつくらせた天皇は？","a":"聖武天皇","w":["桓武天皇","明治天皇"],"ex":"聖武天皇は仏教の力で国を守ろうとしました。","type":"choice"},{"area":"歴史","cat":"室町","q":"室町幕府を開いた人物は？","a":"足利尊氏","w":["源頼朝","徳川家康"],"ex":"足利尊氏が京都に室町幕府を開きました。","type":"choice"},{"area":"歴史","cat":"戦争と平和","q":"1945年に日本の戦争が終わった後、特に必要だったことは？","a":"被害を受けた人々の暮らしと社会を立て直すこと","w":["戦争をさらに広げること","選挙をすべてなくすこと"],"ex":"戦後は食料や住まいの不足への対応と、民主化や復興が進められました。","type":"choice"},{"area":"世界","cat":"国と文化","q":"韓国語を書くときに主に使われる文字は？","a":"ハングル","w":["ひらがなだけ","アラビア文字"],"ex":"韓国語では主にハングルを用います。","type":"choice"},{"area":"世界","cat":"資料","q":"国々の位置や距離を調べるのに役立つ資料は？","a":"世界地図・地球儀","w":["天気予報だけ","学校の時間割"],"ex":"世界地図や地球儀で位置関係を確認します。","type":"choice"},{"area":"世界","cat":"国際機関","q":"世界の子どもたちの権利や教育などを支える国連の機関は？","a":"UNICEF（ユニセフ）","w":["WFP","WHO"],"ex":"UNICEFは子どもの権利や健康・教育を守る活動を行います。","type":"choice"},{"area":"世界","cat":"環境","q":"温室効果ガスの増加が関わる地球規模の課題は？","a":"気候変動","w":["参勤交代","廃藩置県"],"ex":"気候変動は国境をこえて影響するため国際協力が求められます。","type":"choice"}];
const TEST=[{"area":"政治","cat":"憲法","q":"日本国憲法の3つの基本原則として正しい組み合わせは？","a":"国民主権・基本的人権の尊重・平和主義","w":["三権分立・参勤交代・鎖国","国民主権・徴兵令・地租改正"],"ex":"日本国憲法の基本原則は、国民主権・基本的人権の尊重・平和主義です。","type":"choice"},{"area":"政治","cat":"選挙","q":"国民が政治に自分たちの意思を反映する大切な方法は？","a":"選挙で代表者を選ぶ","w":["裁判を必ず自分でする","税金の使い道を一人で決める"],"ex":"国民は選挙を通じて代表者を選び、政治に参加します。","type":"choice"},{"area":"政治","cat":"三権分立","q":"国会が主に担当する仕事は？","a":"法律をつくる","w":["法律をもとに行政を実行する","裁判を行う"],"ex":"国会は立法、内閣は行政、裁判所は司法を担います。","type":"choice"},{"area":"政治","cat":"地方自治","q":"市町村の条例や予算について話し合い、議決する機関は？","a":"市町村議会","w":["裁判所","内閣"],"ex":"市町村の議会は、条例や予算を審議し議決します。","type":"choice"},{"area":"政治","cat":"税金","q":"学校・道路・消防など、公共の仕事に使われる主なお金は？","a":"税金","w":["お店の売上だけ","外国からの寄付だけ"],"ex":"税金は公共サービスを支えるために使われます。","type":"choice"},{"area":"政治","cat":"防災","q":"災害のとき、近所の人どうしが助け合うことは？","a":"共助","w":["自助","公助"],"ex":"地域の人どうしで助け合うのが共助、自分の備えは自助、行政の支援は公助です。","type":"choice"},{"area":"歴史","cat":"時代","q":"水田での米づくりが広まった時代は？","a":"弥生時代","w":["縄文時代","江戸時代"],"ex":"弥生時代には米づくりが広がり、むらの暮らしが変わりました。","type":"choice"},{"area":"歴史","cat":"飛鳥","q":"遣隋使を送り、冠位十二階などを定めた人物は？","a":"聖徳太子（厩戸王）","w":["源頼朝","徳川家康"],"ex":"聖徳太子（厩戸王）は、推古天皇を助け、大陸から学んで政治の仕組みを整えようとしました。","type":"choice"},{"area":"歴史","cat":"奈良","q":"710年に都が置かれた場所は？","a":"平城京","w":["平安京","江戸"],"ex":"710年、現在の奈良市付近に平城京が置かれました。","type":"choice"},{"area":"歴史","cat":"鎌倉","q":"鎌倉幕府を開き、武士による政治を進めた人物は？","a":"源頼朝","w":["足利義満","徳川家光"],"ex":"源頼朝が鎌倉を拠点に幕府政治を始めました。","type":"choice"},{"area":"歴史","cat":"室町","q":"銀閣や書院造などに代表される文化は？","a":"東山文化","w":["天平文化","元禄文化"],"ex":"足利義政のころに栄えた東山文化は、銀閣、書院造、水墨画などで知られます。","type":"choice"},{"area":"歴史","cat":"江戸","q":"江戸幕府が大名を統制するために行った制度は？","a":"参勤交代","w":["廃藩置県","遣唐使"],"ex":"大名が江戸と領地を定期的に行き来する参勤交代が制度として整えられました。","type":"choice"},{"area":"歴史","cat":"明治","q":"1871年、藩をなくして府や県を置いた改革の名前を書きましょう。","a":"廃藩置県","w":[],"ex":"廃藩置県により中央政府が全国を治める仕組みを強めました。","type":"input"},{"area":"歴史","cat":"戦後","q":"日本国憲法が施行されたのはいつですか。","a":"1947年","w":["1945年","1868年"],"ex":"日本国憲法は1946年に公布され、1947年5月3日に施行されました。","type":"choice"},{"area":"世界","cat":"貿易","q":"日本が外国から品物を買うことを何という？","a":"輸入","w":["輸出","輸送"],"ex":"外国から品物を買うことが輸入、外国へ売ることが輸出です。","type":"choice"},{"area":"世界","cat":"国と文化","q":"ブラジルの公用語は何ですか？","a":"ポルトガル語","w":["スペイン語","中国語"],"ex":"ブラジルではポルトガル語が公用語です。","type":"choice"},{"area":"世界","cat":"国際理解","q":"文化や生活習慣の異なる人と交流するときに大切なのは？","a":"相手の背景を知り、互いに尊重する","w":["自分と違う習慣を否定する","全員同じ生活にする"],"ex":"違いの背景を知って理解し、互いに尊重する姿勢が大切です。","type":"choice"},{"area":"世界","cat":"国際連合","q":"世界の平和と国際協力に取り組む国際組織は？","a":"国際連合","w":["市町村議会","江戸幕府"],"ex":"国際連合は1945年に設立され、平和と国際協力に取り組んでいます。","type":"choice"},{"area":"世界","cat":"SDGs","q":"17の目標を持つ「持続可能な開発目標」の略称を書きましょう。","a":"SDGs","w":[],"ex":"SDGsは2015年に採択された、2030年を目標年とする17の目標です。","type":"input"},{"area":"世界","cat":"気候変動","q":"世界の気候変動に対する考え方として正しいのは？","a":"国をこえて協力し、原因と影響に取り組む","w":["一つの市町村だけで完全に解決できる","国境をこえる影響はない"],"ex":"温室効果ガスや気候変動の影響は国境をこえるため、国際協力が必要です。","type":"choice"}];
const AREAS=['政治','歴史','世界'];
const AREANAMES={政治:'ともに生きる暮らしと政治',歴史:'日本の歴史',世界:'世界の中の日本'};
const root=document.getElementById('app');
if(!root)return;
let state=null;
function esc(x){return String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function clean(x){return String(x||'').replace(/[。、，,\s「」『』（）()・％%]/g,'').toLowerCase();}
function choiceOrder(q,idx){
 const order=[[1,0,2],[2,1,0],[0,2,1],[2,0,1],[0,1,2],[1,2,0]][(idx*5+3)%6];
 return order.map(j=>({text:[q.a,...q.w][j],ok:j===0}));
}
function voice(ta,msg){
 const Rec=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!Rec){msg.textContent='音声入力に対応していません。文字で入力できます。';return;}
 try{const r=new Rec();r.lang='ja-JP';r.onresult=e=>{ta.value=e.results[0][0].transcript;msg.textContent='声を文字にしました。答えを確認してください。';};r.onerror=()=>{msg.textContent='聞き取れませんでした。もう一度お試しください。';};r.start();}
 catch(e){msg.textContent='マイクを開始できませんでした。';}
}
function speak(t){if(typeof speakJP==='function'){speakJP(t);return;}try{const u=new SpeechSynthesisUtterance(t);u.lang='ja-JP';u.rate=.84;speechSynthesis.cancel();speechSynthesis.speak(u);}catch(e){}}
function header(t,back){head(t,back);root.classList.add('social371active');}
function menu(){
 header('社会｜小学6年 全体の総復習',()=>subjectGradeTerms('社会',6));
 root.append(e('div','card social371hero','<div class="tiny">小学6年 社会・総まとめ</div><h2>3つの分野をつなげて考えよう</h2><p>政治・歴史・世界のつながりを確かめます。答えをまちがえても、説明を読んでやり直せます。</p>'));
 root.append(btn('📖 3つの分野を復習する',()=>lesson(0),'primary'));
 root.append(btn('🌱 分野別の練習12問',practiceMenu,'soft'));
 root.append(btn('📝 社会全体のまとめテスト20問',startTest,'soft'));
 const counts=[6,8,6];
 root.append(e('div','card social371areas',`<h3>📝 テストの出題範囲</h3>${AREAS.map((a,i)=>`<div><b>${esc(AREANAMES[a])}</b><span>${counts[i]}問</span></div>`).join('')}<p class="tiny">全20問・100点満点。分野別の正答数も分かります。</p>`));
}
function lesson(i){
 const s=LESSONS[i];header(`📖 学ぶ｜社会の総復習`,menu);
 const p=e('div','card lesson social371lesson',`<div class="social371progress"><b>${i+1} / ${LESSONS.length}　${esc(s.section)}</b><div><i style="width:${Math.round(100*(i+1)/LESSONS.length)}%"></i></div></div><h2>${esc(s.title)}</h2><p>${esc(s.intro)}</p>${s.points.map((a,j)=>`<div class="soc352learn"><b>${j+1}</b><span><strong>${esc(a[0])}</strong><span>${esc(a[1])}</span></span></div>`).join('')}`);
 root.append(p);
 root.append(e('div','card social371diagram',`<h3>🔎 つながりを図で見よう</h3><div class="social371flow">${s.flow.map((v,j)=>`${j?'<b>↓</b>':''}<span>${esc(v)}</span>`).join('')}</div>`));
 root.append(btn('🔊 この分野の説明を聞く',()=>speak(s.points.map(x=>x[0]+'。'+x[1]).join('。')),'soft'));
 if(i>0)root.append(btn('← 前の分野へ',()=>lesson(i-1),'soft'));
 root.append(btn(i<LESSONS.length-1?'次の分野へ →':'🌱 練習問題へ',i<LESSONS.length-1?()=>lesson(i+1):practiceMenu,'primary'));
}
function practiceMenu(){
 header('🌱 分野別の練習',menu);
 root.append(e('div','card',`<h2>練習したい分野をえらぼう</h2><p>それぞれ4問ずつ、答えと解説を確認しながら進めます。</p>`));
 AREAS.forEach(a=>root.append(btn(`📘 ${AREANAMES[a]}（4問）`,()=>startPractice(a),'soft')));
 root.append(btn('📝 社会全体のまとめテスト20問',startTest,'primary'));
}
function startPractice(area){state={kind:'practice',area,qs:PRACTICE.filter(x=>x.area===area),i:0,first:0,wrong:new Set()};practiceQ();}
function practiceQ(){
 const s=state,q=s.qs[s.i];if(!q)return practiceResult();
 header(`🌱 ${s.area}　${s.i+1} / ${s.qs.length}`,practiceMenu);
 root.append(e('div','card',`<p class="tiny">${esc(q.cat)}</p><h2>${esc(q.q)}</h2>`));
 choiceOrder(q,s.i).forEach(x=>root.append(btn(x.text,()=>practiceAnswer(x.ok,q),'soft')));
}
function practiceAnswer(ok,q){
 const s=state;
 if(!ok){s.wrong.add(s.i);header('🌱 解説を読んでやり直そう',practiceQ);root.append(e('div','card warn',`<h2>答え：${esc(q.a)}</h2><p>${esc(q.ex)}</p>`));root.append(btn('同じ問題をもう一度',practiceQ,'primary'));return;}
 if(!s.wrong.has(s.i))s.first++;
 if(window.ponoCorrectSound)window.ponoCorrectSound();
 header('○ できました',practiceQ);
 root.append(e('div','card good',`<p><b>正解：${esc(q.a)}</b></p><p>${esc(q.ex)}</p>`));
 s.i++;
 root.append(btn(s.i<s.qs.length?'次の問題へ':'練習結果を見る',s.i<s.qs.length?practiceQ:practiceResult,'primary'));
}
function practiceResult(){
 const s=state;header(`${s.area}｜練習結果`,practiceMenu);
 root.append(e('div','card social371result',`<h2>初回正解 ${s.first} / ${s.qs.length}問</h2><p>まちがえた問題も、説明を確認して最後まで進めました。</p>`));
 root.append(btn('同じ分野をもう一度',()=>startPractice(s.area),'soft'));
 root.append(btn('別の分野も練習する',practiceMenu,'soft'));
 root.append(btn('📝 全体まとめテストへ',startTest,'primary'));
}
function startTest(){state={kind:'test',qs:TEST.map(q=>({...q})),i:0,answers:[],saved:false};testQ();}
function testQ(){
 const s=state,q=s.qs[s.i];if(!q)return testResult();
 header(`📝 総まとめ ${s.i+1} / ${s.qs.length}`,menu);
 root.append(e('div','card social371question',`<p class="tiny">${esc(AREANAMES[q.area])}・${esc(q.cat)}</p><h2>${esc(q.q)}</h2><p class="tiny">1問5点</p>`));
 if(q.type==='input'){
  const box=e('div','card soft','<b>答えを書こう（音声入力も使えます）</b>');const ta=document.createElement('textarea');ta.rows=2;ta.setAttribute('aria-label','記述式の答え');box.append(ta);
  const msg=e('div','tiny','');box.append(btn('🎤 声で答える',()=>voice(ta,msg),'soft'));box.append(msg);
  box.append(btn('この答えで次へ',()=>{const val=ta.value.trim();if(!val){msg.textContent='答えを入力してください。';return;}let good=clean(val).includes(clean(q.a));if(q.a==='SDGs')good=good||clean(val).includes('持続可能な開発目標');record(good,val,q);},'primary'));
  root.append(box);
 }else choiceOrder(q,s.i).forEach(x=>root.append(btn(x.text,()=>record(x.ok,x.text,q),'soft')));
 root.append(e('p','tiny','※テスト中は正解・解説を表示しません。'));
}
function record(ok,answer,q){state.answers.push({ok,answer,q});state.i++;state.i<state.qs.length?testQ():testResult();}
function breakdown(){
 return AREAS.map(area=>{const items=state.answers.filter(x=>x.q.area===area);return {area,correct:items.filter(x=>x.ok).length,total:items.length};});
}
function testResult(){
 const s=state,correct=s.answers.filter(x=>x.ok).length,score=correct*5,by=breakdown();
 header('📊 社会・総まとめ 結果',menu);
 root.append(e('div',`card social371result ${score>=70?'good':'warn'}`,`<h2>${score}点 / 100点</h2><p>${correct} / 20問 正解</p><p class="tiny">記述問題の自動採点は目安です。答えの表現は先生も確認してください。</p>`));
 root.append(e('div','card social371breakdown',`<h3>分野別の正答数</h3>${by.map(x=>`<div class="social371baritem"><div><strong>${esc(AREANAMES[x.area])}</strong><b>${x.correct} / ${x.total}問</b></div><div class="social371bar"><i style="width:${Math.round(x.correct/x.total*100)}%"></i></div></div>`).join('')}`));
 const missed=s.answers.filter(x=>!x.ok).length;
 if(missed){const worst=by.slice().sort((a,b)=>(a.correct/a.total)-(b.correct/b.total))[0];
  root.append(e('div','card social371tip',`<h3>🌱 次にやってみよう</h3><p>${esc(AREANAMES[worst.area])}を復習すると、理解が深まりそうです。点数ではなく、分かったことを増やしていきましょう。</p>`));
  root.append(btn('🔎 間違えた問題を復習する',reviewWrong,'primary'));
  root.append(btn(`📘 ${AREANAMES[worst.area]}を学び直す`,()=>lesson(AREAS.indexOf(worst.area)),'soft'));
 }else root.append(e('div','card good',`<h3>✨ 全問正解です！</h3><p>3つの分野の学習をつなげて考えられました。</p>`));
 root.append(btn('📖 すべての答えと解説を見る',reviewAll,'soft'));
 root.append(btn('もう一度20問に挑戦する',startTest,'soft'));
 if(!s.saved){s.saved=true;try{
  records.push({studentId:profile.id,date:new Date().toISOString(),subject:'社会',grade:6,unit:'小学6年 社会全体 総まとめ',content:'総まとめテスト20問（政治6・歴史8・世界6）',correct,total:20,rate:score,score,status:`総まとめ ${score}点｜政治${by[0].correct}/6・歴史${by[1].correct}/8・世界${by[2].correct}/6`});save();
 }catch(e){}}
}
function showReview(onlyWrong){
 const items=state.answers.map((a,i)=>({...a,index:i+1})).filter(x=>!onlyWrong||!x.ok);
 header(onlyWrong?'🔎 間違えた問題の復習':'📖 全20問の答えと解説',testResult);
 if(!items.length){root.append(e('div','card good','<h2>間違えた問題はありません。</h2>'));return;}
 root.append(e('div','card',`<p>${items.length}問を、答えと解説を見ながら確認できます。</p>`));
 items.forEach(a=>root.append(e('div',`card social371review ${a.ok?'good':'warn'}`,`<div class="tiny">問${a.index}｜${esc(AREANAMES[a.q.area])}｜${a.ok?'○':'×'}</div><h3>${esc(a.q.q)}</h3><p><b>あなたの答え：</b>${esc(a.answer)}</p><p><b>答え：</b>${esc(a.q.a)}</p><p>${esc(a.q.ex)}</p>`)));
 root.append(btn('採点結果に戻る',testResult,'primary'));
}
function reviewWrong(){showReview(true);}
function reviewAll(){showReview(false);}
function ensureEntry(){
 const h=root.querySelector('.top h1');if(!h||!/^社会｜小学6年$/.test(h.textContent.trim()))return;
 if(root.querySelector('[data-pono371-entry]'))return;
 const buttons=[...root.querySelectorAll(':scope > button')];
 const anchor=buttons.find(b=>/^3\.\s*世界の中の日本$/.test((b.textContent||'').trim()));if(!anchor)return;
 const card=e('div','card social371entry','<h3>🧭 小学6年生・社会の総復習</h3><p>政治・歴史・世界の内容をまとめて確かめられます。</p>');
 card.setAttribute('data-pono371-entry','1');
 const button=btn('📘 社会全体の総まとめ（復習・20問テスト）',menu,'primary');
 anchor.insertAdjacentElement('afterend',card);card.insertAdjacentElement('afterend',button);
}
let pending=false;
new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;ensureEntry();});}).observe(root,{childList:true,subtree:true});
ensureEntry();
})();
