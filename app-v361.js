/* v36.1 6年社会：幕府の政治と人々の暮らし 詳細版 */
(function(){
const UNIT='幕府の政治と人々の暮らし';

const LEARN=[
'1600年の関ヶ原の戦いに勝った徳川家康は、1603年に征夷大将軍となり江戸幕府を開きました。幕府と藩が全国を治める仕組みを幕藩体制といいます。',
'江戸幕府は武家諸法度などで大名を統制しました。徳川家光のころ参勤交代が制度として整えられ、大名は江戸と領地を定期的に行き来しました。',
'幕府はキリスト教を禁止し、外国との自由な出入りや貿易を制限しました。ただし外国との関係を完全に断ったわけではなく、限られた窓口で交流が続きました。',
'長崎ではオランダ・中国、対馬では朝鮮、薩摩では琉球、松前ではアイヌの人々との交易や交流が行われました。',
'農業では新田開発や農具の改良が進み、米などの生産が増えました。五街道や海上交通も整い、人や物の移動が活発になりました。',
'江戸は政治の中心、大阪は「天下の台所」とよばれる商業の中心として栄えました。京都も文化や工芸の中心として発展しました。',
'江戸時代は身分によって役割や暮らしに違いがある社会でした。武士、百姓、町人などがそれぞれの立場で社会を支えました。',
'長く大きな戦乱が少ない時代が続いたことで、農業・商業・交通・都市が発達し、人々の生活や文化も広がっていきました。'
];

const PRACTICE=[
{l:'b',cat:'基礎知識',type:'choice',q:'1603年に江戸幕府を開いた人物は？',a:'徳川家康',w:['徳川家光','豊臣秀吉'],ex:'徳川家康は1600年の関ヶ原の戦いに勝ち、1603年に江戸幕府を開きました。'},
{l:'b',cat:'基礎知識',type:'choice',q:'幕府と藩が全国を治めた仕組みを何という？',a:'幕藩体制',w:['律令制度','三権分立'],ex:'幕府と、大名が治める藩によって全国を支配する仕組みを幕藩体制といいます。'},
{l:'b',cat:'基礎知識',type:'choice',q:'大名など武家が守るべき決まりを定めた法令は？',a:'武家諸法度',w:['十七条の憲法','御成敗式目'],ex:'武家諸法度は、大名を統制するための重要な法令でした。'},
{l:'b',cat:'基礎知識',type:'choice',q:'大名が江戸と領地を定期的に行き来した制度は？',a:'参勤交代',w:['廃藩置県','刀狩'],ex:'参勤交代は、大名を統制する制度の一つです。'},
{l:'b',cat:'基礎知識',type:'choice',q:'参勤交代を制度として整えた将軍は？',a:'徳川家光',w:['徳川家康','徳川慶喜'],ex:'3代将軍徳川家光のころ、参勤交代が制度として整えられました。'},
{l:'b',cat:'基礎知識',type:'choice',q:'江戸時代、オランダや中国との貿易の窓口となった場所は？',a:'長崎',w:['鎌倉','平城京'],ex:'長崎ではオランダや中国との貿易が行われました。'},
{l:'b',cat:'基礎知識',type:'choice',q:'朝鮮との外交・交流の窓口となった地域は？',a:'対馬',w:['薩摩','松前'],ex:'対馬藩は朝鮮との外交や交流の窓口となりました。'},
{l:'b',cat:'基礎知識',type:'choice',q:'琉球との関係の窓口となった地域は？',a:'薩摩',w:['対馬','長崎'],ex:'薩摩藩は琉球との関係を通して東アジアとのつながりを持ちました。'},
{l:'b',cat:'基礎知識',type:'choice',q:'アイヌの人々との交易の窓口となった地域は？',a:'松前',w:['対馬','大阪'],ex:'松前藩はアイヌの人々との交易に関わりました。'},
{l:'b',cat:'基礎知識',type:'choice',q:'江戸時代に「天下の台所」とよばれた都市は？',a:'大阪',w:['奈良','鎌倉'],ex:'大阪には全国の米や物資が集まり、商業の中心として栄えました。'},

{l:'s',cat:'資料・関連づけ',type:'choice',q:'【資料】大名が多くの家来を連れて江戸へ向かう行列が描かれている。最も関係が深い制度は？',a:'参勤交代',w:['刀狩','遣唐使'],ex:'大名行列は参勤交代と深く関係します。'},
{l:'s',cat:'資料・関連づけ',type:'choice',q:'【資料】長崎・対馬・薩摩・松前の4か所が示されている。この資料から分かることは？',a:'外国や周辺地域との交流が限られた窓口で続いていた',w:['日本が完全に外国と関係を断った','すべての港が自由に開かれていた'],ex:'いわゆる鎖国の時代でも、複数の窓口を通して交流が続きました。'},
{l:'s',cat:'資料・関連づけ',type:'choice',q:'【資料】江戸から京都・大阪などへ五街道が伸び、宿場町が並んでいる。何が分かる？',a:'人や物の移動が活発になった',w:['全国の移動が禁止された','農村だけが発達した'],ex:'街道や宿場の整備によって交通と流通が活発になりました。'},
{l:'s',cat:'資料・関連づけ',type:'choice',q:'【資料】田畑が増え、米の生産量が増えているグラフがある。最も関係が深いものは？',a:'新田開発',w:['前方後円墳','廃藩置県'],ex:'新田開発などによって農地が広がり、農業生産が増えました。'},
{l:'s',cat:'資料・関連づけ',type:'choice',q:'【資料】大阪に全国各地から米や商品が集まる図がある。大阪が何とよばれたことと関係する？',a:'天下の台所',w:['天下布武','東の京'],ex:'大阪は全国の物資が集まる商業都市として「天下の台所」とよばれました。'},

{l:'a',cat:'思考・活用',type:'choice',q:'参勤交代が幕府の大名統制につながった理由として最も適切なのは？',a:'江戸との往復や江戸屋敷の維持に多くの費用がかかり、大名の力をおさえることにもつながったから',w:['大名が外国へ自由に移住できたから','すべての大名が江戸で商人になったから'],ex:'参勤交代は大名に時間と費用の負担をかけ、幕府の統制につながりました。'},
{l:'a',cat:'思考・活用',type:'choice',q:'「鎖国」でも日本が完全に孤立していたわけではないと言えるのはなぜ？',a:'長崎・対馬・薩摩・松前などを通して外国や周辺地域との交流が続いていたから',w:['外国人が全国どこでも自由に住めたから','海外との交流が一切なかったから'],ex:'対外関係は制限されましたが、複数の窓口を通して貿易・外交・交流が続きました。'},
{l:'a',cat:'思考・活用',type:'choice',q:'農業生産が増え、交通網が整ったことで社会にどんな変化が起きた？',a:'商品流通が活発になり都市や商業が発達した',w:['人の移動がなくなり都市が衰えた','農業だけが発達し商業はなくなった'],ex:'農業・交通・商業は互いに関係しながら発達しました。'}
];

const TEST=[
{cat:'人物・年代',type:'choice',q:'1603年に江戸幕府を開いた人物は？',a:'徳川家康',w:['徳川家光','豊臣秀吉'],ex:'徳川家康は1603年に江戸幕府を開きました。'},
{cat:'知識',type:'choice',q:'幕府と藩が全国を治めた政治の仕組みは？',a:'幕藩体制',w:['律令制度','摂関政治'],ex:'幕府と各藩によって全国を治める仕組みを幕藩体制といいます。'},
{cat:'政策',type:'choice',q:'大名など武家が守るべき決まりを定めた法令は？',a:'武家諸法度',w:['御成敗式目','十七条の憲法'],ex:'武家諸法度は幕府が大名を統制するための法令です。'},
{cat:'政策',type:'choice',q:'大名が江戸と領地を定期的に往復した制度は？',a:'参勤交代',w:['廃藩置県','検地'],ex:'参勤交代は大名統制の重要な制度でした。'},
{cat:'人物',type:'choice',q:'参勤交代を制度として整えた将軍は？',a:'徳川家光',w:['徳川家康','徳川慶喜'],ex:'3代将軍徳川家光のころ参勤交代が制度として整えられました。'},
{cat:'対外関係',type:'choice',q:'外国との自由な出入りや貿易を厳しく制限した体制を何という？',a:'鎖国',w:['開国','廃藩置県'],ex:'幕府はキリスト教を禁じ、外国との出入りや貿易を制限しました。'},
{cat:'対外関係',type:'choice',q:'オランダや中国との貿易の窓口は？',a:'長崎',w:['鎌倉','平城京'],ex:'長崎ではオランダ・中国との貿易が行われました。'},
{cat:'対外関係',type:'choice',q:'朝鮮との外交・交流の窓口は？',a:'対馬',w:['薩摩','松前'],ex:'対馬藩は朝鮮との交流の窓口でした。'},
{cat:'対外関係',type:'choice',q:'琉球との関係の窓口は？',a:'薩摩',w:['対馬','長崎'],ex:'薩摩藩は琉球との関係に深く関わりました。'},
{cat:'対外関係',type:'choice',q:'アイヌの人々との交易の窓口は？',a:'松前',w:['対馬','大阪'],ex:'松前藩はアイヌの人々との交易に関わりました。'},
{cat:'資料',type:'choice',q:'【資料】大名が多くの家来を連れて江戸へ向かう行列。何を表す？',a:'参勤交代',w:['刀狩','遣唐使'],ex:'大名行列は参勤交代と深く関係します。'},
{cat:'資料',type:'choice',q:'【資料】五街道と宿場町の位置が示されている。何が分かる？',a:'人や物の移動が活発になった',w:['全国の移動が禁止された','農村だけが発達した'],ex:'街道と宿場の整備で交通・流通が発達しました。'},
{cat:'都市',type:'choice',q:'「天下の台所」とよばれた都市は？',a:'大阪',w:['奈良','鎌倉'],ex:'大阪には全国から米や物資が集まりました。'},
{cat:'産業',type:'choice',q:'新しく田畑を増やすために行われたことは？',a:'新田開発',w:['前方後円墳の建設','廃藩置県'],ex:'新田開発によって農地が増えました。'},
{cat:'社会',type:'choice',q:'江戸時代の身分と暮らしについて適切な説明は？',a:'身分によって役割や暮らしに違いがあり、武士・百姓・町人などが社会を支えた',w:['全員が同じ仕事と生活をしていた','商人だけが政治を行った'],ex:'身分によって役割や暮らしに違いがありました。'},
{cat:'思考',type:'choice',q:'参勤交代が交通の発達にも影響した理由は？',a:'大名や家来の移動で街道や宿場の利用が増えたから',w:['大名の移動が禁止されたから','海上交通がなくなったから'],ex:'参勤交代による大規模な移動は街道や宿場の発達につながりました。'},
{cat:'思考',type:'choice',q:'鎖国中も海外との交流があったことを示す組み合わせは？',a:'長崎・対馬・薩摩・松前',w:['江戸・鎌倉・奈良・平安京','長崎・鎌倉・大阪・平城京'],ex:'限られた4つの窓口で交流が続きました。'},
{cat:'因果関係',type:'choice',q:'農業生産の増加と交通網の整備によって起こった変化は？',a:'商品流通が活発になり都市や商業が発達した',w:['人の移動がなくなり都市が衰えた','米づくりが禁止された'],ex:'農業・交通・商業は関係しながら発達しました。'},
{cat:'記述',type:'input',q:'参勤交代が幕府の大名統制につながった理由を書きましょう。',a:'大名に江戸と領地の往復や江戸屋敷の維持をさせ、多くの費用を負担させたから。',keys:['大名','費用'],ex:'参勤交代は大名に大きな負担をかけ、幕府の統制につながりました。'},
{cat:'記述',type:'input',q:'江戸時代の「鎖国」が外国との完全な断絶ではなかった理由を書きましょう。',a:'長崎・対馬・薩摩・松前などの窓口を通して貿易や交流が続いていたから。',keys:['長崎','交流'],ex:'外国との関係は制限されましたが、複数の窓口で貿易・外交・交流が続きました。'}
];

let st=null;
function esc(s){return String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function norm(s){return String(s||'').replace(/[。、，,\s「」『』（）()・％%]/g,'');}
function order(q,i){const a=[q.a,...q.w].map((t,n)=>({t,ok:n===0})),ps=[[1,0,2],[2,1,0],[0,2,1],[1,2,0],[2,0,1],[0,1,2]];return ps[i%6].map(n=>a[n]);}
function inputOK(v,q){const n=norm(v);return (q.keys||[q.a]).every?((q.keys||[q.a]).every(k=>n.includes(norm(k)))):n.includes(norm(q.a));}
function voice(ta,msg){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){msg.textContent='この端末では音声入力が使えません。';return}try{const r=new SR();r.lang='ja-JP';r.onresult=e=>{ta.value=e.results[0][0].transcript;msg.textContent='音声を文字にしました。'};r.onerror=()=>msg.textContent='うまく聞き取れませんでした。';r.start()}catch(e){msg.textContent='マイクを開始できませんでした。'}}

function menu(){
 head(`社会｜${UNIT}`,()=>subjectGradeTerms('社会',6));
 A.append(e('div','card',`<div class="tiny">日本の歴史 ＞ 小単元</div><h2>${UNIT}</h2><p><b>学校の単元テストに答えられる内容を、図・練習・テストで確認します。</b></p>`));
 A.append(btn('📖 学ぶ',learn,'primary'));
 A.append(btn('🌱 練習問題をやる',()=>startPractice('b'),'soft'));
 A.append(btn('📝 小単元テスト20問',startTest,'soft'));
}
function learn(){
 head(`📖 学ぶ｜${UNIT}`,menu);
 const b=e('div','card lesson',`<h2>${UNIT}</h2><p class="tiny">大事な流れを先に確認します。</p>`);
 LEARN.forEach((x,i)=>b.innerHTML+=`<div class="soc352learn"><b>${i+1}</b><span>${esc(x)}</span></div>`);
 A.append(b);
 A.append(e('div','card edo361',`<h2>👀 図で流れを確認しよう</h2>
 <div class="edo361flow">
 <div><b>1603年</b><span>徳川家康<br>江戸幕府</span></div><i>→</i>
 <div><b>大名統制</b><span>武家諸法度<br>参勤交代</span></div><i>→</i>
 <div><b>対外関係</b><span>交流を制限<br>4つの窓口</span></div><i>→</i>
 <div><b>社会の発達</b><span>農業・交通<br>商業・都市</span></div></div>
 <h3>🌏 4つの窓口</h3><div class="edo361ports">
 <div><b>長崎</b><span>オランダ・中国</span></div><div><b>対馬</b><span>朝鮮</span></div><div><b>薩摩</b><span>琉球</span></div><div><b>松前</b><span>アイヌの人々</span></div></div>
 <p><b>ここが大切：</b>「鎖国＝外国と完全に交流しなかった」ではありません。交流の相手や場所を幕府が制限しながら、貿易や外交は続いていました。</p>
 <h3>🏙️ くらしと産業</h3><div class="edo361chain"><span>新田開発・農業生産</span><b>→</b><span>街道・海運</span><b>→</b><span>物の流通</span><b>→</b><span>江戸・大阪など都市が発達</span></div>`));
 A.append(btn('🔊 説明を聞く',()=>speakJP(`${UNIT}。${LEARN.join('。')}`),'soft'));
 A.append(btn('🌱 基礎10問へ',()=>startPractice('b'),'primary'));
}
function level(l){return l==='b'?'🌱 基礎':l==='s'?'📘 標準':'🌟 応用';}
function startPractice(l){const qs=PRACTICE.filter(x=>x.l===l);st={mode:'p',l,qs,i:0,first:0,miss:new Set()};practiceQ();}
function practiceQ(){const q=st.qs[st.i];head(`${level(st.l)} ${st.i+1} / ${st.qs.length}｜${UNIT}`,menu);A.append(e('div','card',`<h2>${esc(q.q)}</h2><p class="tiny">${q.cat}</p>`));order(q,st.i).forEach(it=>A.append(btn(it.t,()=>practiceAns(it.ok,q),'soft')));}
function practiceAns(ok,q){if(!ok){st.miss.add(st.i);head('🌱 ここを確認',practiceQ);A.append(e('div','card warn',`<h2>この問題の解説</h2><p><b>答え：</b>${esc(q.a)}</p><p>${esc(q.ex)}</p>`));A.append(btn('同じ問題をもう一度',practiceQ,'primary'));return}if(!st.miss.has(st.i))st.first++;if(window.ponoCorrectSound)window.ponoCorrectSound();head('○ 確認',practiceQ);A.append(e('div','card good',`<h2>できました</h2><p><b>答え：</b>${esc(q.a)}</p><p>${esc(q.ex)}</p>`));st.i++;A.append(btn(st.i<st.qs.length?'次の問題へ':'結果を見る',st.i<st.qs.length?practiceQ:practiceDone,'primary'));}
function practiceDone(){const need=st.l==='b'?8:st.l==='s'?4:0,pass=st.l==='a'||st.first>=need;head(`${level(st.l)}結果｜${UNIT}`,menu);A.append(e('div',`card ${pass?'good':'warn'}`,`<h2>${pass?'✨ できました':'🌱 もう一度確認'}</h2><p>初回正解 <b>${st.first} / ${st.qs.length}</b></p>`));if(st.l==='b'&&pass)A.append(btn('📘 標準5問へ',()=>startPractice('s'),'primary'));if(st.l==='s'&&pass)A.append(btn('🌟 応用3問へ',()=>startPractice('a'),'primary'));if(st.l==='a')A.append(btn('📝 小単元テストへ',startTest,'primary'));}
function startTest(){st={mode:'t',qs:TEST.map(x=>({...x})),i:0,ans:[]};testQ();}
function testQ(){const q=st.qs[st.i];head(`📝 テスト ${st.i+1} / 20｜${UNIT}`,menu);A.append(e('div','card',`<h2>${esc(q.q)}</h2><p class="tiny">${q.cat}｜5点</p>`));if(q.type==='input'){const b=e('div','card soft','<b>答えを書きましょう</b>'),ta=document.createElement('textarea');ta.rows=3;b.appendChild(ta);const m=e('div','tiny','');b.appendChild(btn('🎤 音声で答える',()=>voice(ta,m),'soft'));b.appendChild(m);b.appendChild(btn('この答えで次へ',()=>{const v=ta.value.trim();if(!v){m.textContent='答えを入力してください。';return}record(inputOK(v,q),v,q)},'primary'));A.append(b)}else order(q,st.i).forEach(it=>A.append(btn(it.t,()=>record(it.ok,it.t,q),'soft')));A.append(e('p','tiny','※テスト中は正解・ヒント・解説を表示しません。'));}
function record(ok,user,q){st.ans.push({ok,user,q});st.i++;st.i<20?testQ():result();}
function result(){const c=st.ans.filter(x=>x.ok).length,score=c*5;head(`採点結果｜${UNIT}`,menu);A.append(e('div',`card ${score>=70?'good':'warn'}`,`<h2>${score}点 / 100点</h2><p>${c} / 20問 正解</p><p class="tiny">※記述はキーワードによる自動採点の目安です。</p>`));A.append(btn('📖 答えと解説を見る',review,'primary'));try{records.push({studentId:profile.id,date:new Date().toISOString(),subject:'社会',grade:6,unit:UNIT,content:'小単元テスト20問',correct:c,total:20,rate:score,score,status:`テスト ${score}点`});save()}catch(e){}}
function review(){head(`答えと解説｜${UNIT}`,result);st.ans.forEach((a,i)=>A.append(e('div',`card ${a.ok?'good':'warn'}`,`<div class="tiny">問${i+1}｜${a.ok?'○':'×'}</div><h3>${esc(a.q.q)}</h3><p><b>あなたの答え：</b>${esc(a.user)}</p><p><b>答え：</b>${esc(a.q.a)}</p><p>${esc(a.q.ex)}</p>`)));}

/* 日本の歴史の小単元一覧からこの単元を押した時だけ、v36.1専用教材へ */
document.addEventListener('click',function(ev){
 const b=ev.target&&ev.target.closest?ev.target.closest('button'):null;if(!b)return;
 const t=(b.textContent||'').replace(/^\s*\d+\.\s*/,'').trim();
 if(t!==UNIT)return;
 const body=(document.body&&document.body.innerText)||'';
 if(!body.includes('日本の歴史'))return;
 ev.preventDefault();ev.stopImmediatePropagation();menu();
},true);
})();