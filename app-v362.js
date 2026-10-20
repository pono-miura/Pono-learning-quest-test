/* v36.2 6年社会：新しい文化と学問 詳細版 */
(function(){
const UNIT='新しい文化と学問';

const LEARN=[
'江戸時代には、農業や商業、交通、都市が発達し、町人を中心とする文化が広がりました。',
'歌舞伎や浮世絵など、庶民が楽しむ文化が発達しました。浮世絵には役者、美人、名所などが描かれました。',
'葛飾北斎や歌川広重は、風景を題材にした浮世絵で知られています。',
'松尾芭蕉は俳諧を発展させ、「奥の細道」を残しました。',
'寺子屋では、町人や農民の子どもたちが読み書きやそろばんなどを学びました。',
'長崎を通じて西洋の知識が入り、オランダ語を通して医学や科学などを学ぶ蘭学が発達しました。',
'杉田玄白らはオランダ語の医学書を翻訳し、「解体新書」を出版しました。',
'本居宣長らは日本の古典を研究する国学を発展させました。',
'文化や学問の担い手が武士や貴族だけでなく、町人や庶民にも広がっていったことがこの時代の大きな特徴です。'
];

const PRACTICE=[
{l:'b',cat:'基礎知識',q:'江戸時代に庶民の子どもたちが読み書きやそろばんを学んだ場所は？',a:'寺子屋',w:['国会','奉行所'],ex:'寺子屋では、町人や農民の子どもたちが読み書きやそろばんを学びました。'},
{l:'b',cat:'基礎知識',q:'役者・美人・名所などを題材にした江戸時代の版画は？',a:'浮世絵',w:['水墨画','壁画'],ex:'浮世絵は町人文化を代表する版画で、役者や美人、風景などが描かれました。'},
{l:'b',cat:'基礎知識',q:'江戸時代に庶民に広く親しまれた舞台芸能は？',a:'歌舞伎',w:['能だけ','雅楽'],ex:'歌舞伎は都市の町人を中心に人気を集めた舞台芸能です。'},
{l:'b',cat:'人物',q:'「奥の細道」を残した人物は？',a:'松尾芭蕉',w:['杉田玄白','本居宣長'],ex:'松尾芭蕉は俳諧を発展させ、「奥の細道」を残しました。'},
{l:'b',cat:'人物',q:'「富嶽三十六景」で知られる浮世絵師は？',a:'葛飾北斎',w:['歌川広重','近松門左衛門'],ex:'葛飾北斎は富士山を題材にした「富嶽三十六景」で知られます。'},
{l:'b',cat:'人物',q:'「東海道五十三次」で知られる浮世絵師は？',a:'歌川広重',w:['葛飾北斎','松尾芭蕉'],ex:'歌川広重は街道や名所を描いた「東海道五十三次」で知られます。'},
{l:'b',cat:'学問',q:'オランダ語を通して西洋の医学や科学を学ぶ学問は？',a:'蘭学',w:['国学','儒学'],ex:'蘭学はオランダ語を通して西洋の医学や科学などを学ぶ学問です。'},
{l:'b',cat:'人物・学問',q:'「解体新書」の出版と関係が深い人物は？',a:'杉田玄白',w:['本居宣長','福沢諭吉'],ex:'杉田玄白らはオランダ語の医学書を翻訳し「解体新書」を出版しました。'},
{l:'b',cat:'学問',q:'日本の古典や文化を研究する学問は？',a:'国学',w:['蘭学','洋学'],ex:'国学は日本の古典や文化を研究する学問です。'},
{l:'b',cat:'人物・学問',q:'国学を発展させた人物として最も関係が深いのは？',a:'本居宣長',w:['杉田玄白','徳川家光'],ex:'本居宣長は「古事記」など日本の古典を研究し、国学を発展させました。'},

{l:'s',cat:'資料・関連づけ',q:'【資料】子どもたちが筆とそろばんを使って学んでいる。最も関係が深い場所は？',a:'寺子屋',w:['城下町の城','関所'],ex:'寺子屋では庶民の子どもたちが読み書きやそろばんを学びました。'},
{l:'s',cat:'資料・関連づけ',q:'【資料】富士山を大きく描いた多色刷りの版画。最も関係が深い人物は？',a:'葛飾北斎',w:['杉田玄白','本居宣長'],ex:'葛飾北斎は富士山を題材にした「富嶽三十六景」で知られます。'},
{l:'s',cat:'資料・関連づけ',q:'【資料】オランダ語の医学書を日本語に翻訳した本がある。何の発達を示す？',a:'蘭学',w:['国学','鎖国の強化だけ'],ex:'西洋医学の知識をオランダ語から学ぶ蘭学の発達を示します。'},
{l:'s',cat:'資料・関連づけ',q:'【資料】役者や町人の姿を描いた版画が大量に刷られている。何が分かる？',a:'町人を中心とする文化が広がった',w:['武士だけが文化を楽しんだ','印刷文化がなくなった'],ex:'浮世絵の広がりは、町人文化が多くの人々に親しまれたことを示します。'},
{l:'s',cat:'比較・思考',q:'蘭学と国学の違いとして正しいものは？',a:'蘭学は西洋の知識、国学は日本の古典を研究した',w:['どちらも武士の戦術だけを学んだ','どちらも外国語だけを研究した'],ex:'蘭学は西洋、国学は日本の古典・文化への関心から発達しました。'},

{l:'a',cat:'思考・活用',q:'寺子屋が各地に広がったことから分かることは？',a:'庶民にも読み書きや計算を学ぶ機会が広がった',w:['学ぶのは武士だけだった','文字を使う人が減った'],ex:'寺子屋の広がりは、庶民の学習機会が増えたことを示します。'},
{l:'a',cat:'思考・活用',q:'江戸時代に蘭学が発達できた背景として最も関係が深いものは？',a:'長崎を通してオランダとの交流が続いていた',w:['外国との交流が完全にゼロだった','全国の港が自由に開かれていた'],ex:'対外交流は制限されていましたが、長崎を通じてオランダの知識が伝わりました。'},
{l:'a',cat:'思考・活用',q:'歌舞伎・浮世絵・寺子屋に共通する時代の変化は？',a:'文化や学びの担い手が町人や庶民へ広がった',w:['文化が貴族だけのものに戻った','庶民の学びが禁止された'],ex:'都市や商業の発達とともに、文化や学問が広い人々に広がりました。'}
];

const TEST=[
{cat:'文化',type:'choice',q:'江戸時代に町人を中心に広がった文化を考えるとき、代表的なものは？',a:'歌舞伎や浮世絵',w:['前方後円墳','遣唐使'],ex:'歌舞伎や浮世絵は江戸時代の町人文化を代表します。'},
{cat:'教育',type:'choice',q:'町人や農民の子どもが読み書きやそろばんを学んだ場所は？',a:'寺子屋',w:['国会','幕府の評定所'],ex:'寺子屋は庶民の学びの場でした。'},
{cat:'文化',type:'choice',q:'江戸時代の版画で、役者や美人、名所などが描かれたものは？',a:'浮世絵',w:['絵巻物','壁画'],ex:'浮世絵は版画として広く親しまれました。'},
{cat:'人物',type:'choice',q:'「奥の細道」と関係が深い人物は？',a:'松尾芭蕉',w:['杉田玄白','本居宣長'],ex:'松尾芭蕉は俳諧を発展させました。'},
{cat:'人物',type:'choice',q:'「富嶽三十六景」で知られる人物は？',a:'葛飾北斎',w:['歌川広重','近松門左衛門'],ex:'葛飾北斎は富士山を題材にした浮世絵で知られます。'},
{cat:'人物',type:'choice',q:'「東海道五十三次」で知られる人物は？',a:'歌川広重',w:['葛飾北斎','松尾芭蕉'],ex:'歌川広重は街道や各地の風景を描きました。'},
{cat:'学問',type:'choice',q:'オランダ語を通して西洋の医学や科学を学ぶ学問は？',a:'蘭学',w:['国学','朱子学だけ'],ex:'蘭学は西洋の知識を学ぶ学問です。'},
{cat:'人物',type:'choice',q:'「解体新書」と最も関係が深い人物は？',a:'杉田玄白',w:['本居宣長','伊藤博文'],ex:'杉田玄白らが西洋医学書を翻訳しました。'},
{cat:'学問',type:'choice',q:'日本の古典を研究する学問は？',a:'国学',w:['蘭学','洋学'],ex:'国学は日本の古典・文化を研究しました。'},
{cat:'人物',type:'choice',q:'本居宣長と最も関係が深い学問は？',a:'国学',w:['蘭学','仏教'],ex:'本居宣長は国学を発展させました。'},
{cat:'資料',type:'choice',q:'【資料】子どもたちが筆とそろばんで学んでいる。何を表す資料？',a:'寺子屋',w:['参勤交代','刀狩'],ex:'寺子屋では庶民の子どもたちが学びました。'},
{cat:'資料',type:'choice',q:'【資料】富士山と波を描いた多色刷りの版画。最も関係が深い文化は？',a:'浮世絵',w:['水墨画だけ','古墳文化'],ex:'江戸時代の多色刷り版画として浮世絵が広がりました。'},
{cat:'資料',type:'choice',q:'【資料】西洋の人体図を見ながら日本語に翻訳している。最も関係が深い学問は？',a:'蘭学',w:['国学','和歌'],ex:'西洋医学の知識を学ぶ蘭学と関係します。'},
{cat:'比較',type:'choice',q:'蘭学と国学を正しく比べたものは？',a:'蘭学は西洋、国学は日本の古典を研究した',w:['両方とも同じ内容を研究した','蘭学は日本の古典、国学は西洋医学を研究した'],ex:'研究対象が異なります。'},
{cat:'社会',type:'choice',q:'寺子屋が広がったことから最もよく分かることは？',a:'庶民にも学ぶ機会が広がった',w:['武士だけが文字を使った','教育がなくなった'],ex:'庶民の読み書きや計算の力が広がることにつながりました。'},
{cat:'因果関係',type:'choice',q:'長崎でオランダとの交流が続いたことが、学問に与えた影響は？',a:'西洋医学や科学の知識が入り、蘭学が発達した',w:['国学だけが禁止された','すべての外国語が使えなくなった'],ex:'長崎から西洋の知識が伝わりました。'},
{cat:'因果関係',type:'choice',q:'都市や商業の発達が文化に与えた影響として適切なのは？',a:'町人が文化を楽しみ支えるようになった',w:['文化が貴族だけに限られた','歌舞伎や浮世絵がなくなった'],ex:'経済力を持った町人が文化の担い手になりました。'},
{cat:'総合',type:'choice',q:'歌舞伎・浮世絵・寺子屋・蘭学に共通する江戸時代の特徴は？',a:'文化や学びが広い人々に広がった',w:['外国との交流が完全になくなった','武士の戦いだけが続いた'],ex:'文化や学問の担い手が広がったことが大きな特徴です。'},
{cat:'記述',type:'input',q:'寺子屋が広がったことから分かる社会の変化を書きましょう。',a:'庶民にも読み書きやそろばんを学ぶ機会が広がった。',keys:['庶民','学'],ex:'寺子屋の広がりは、庶民の学習機会が増えたことを示します。'},
{cat:'記述',type:'input',q:'蘭学が発達した理由を、長崎との関係を入れて書きましょう。',a:'長崎を通してオランダから西洋の知識が伝わったから。',keys:['長崎','オランダ'],ex:'長崎でオランダとの交流が続き、西洋医学や科学などの知識が伝わりました。'}
];

let st=null;
function esc(s){return String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function norm(s){return String(s||'').replace(/[。、，,\s「」『』（）()・％%]/g,'');}
function order(q,i){const a=[q.a,...q.w].map((t,n)=>({t,ok:n===0})),ps=[[1,0,2],[2,1,0],[0,2,1],[1,2,0],[2,0,1],[0,1,2]];return ps[i%6].map(n=>a[n]);}
function inputOK(v,q){const n=norm(v);return (q.keys||[q.a]).every(k=>n.includes(norm(k)));}
function voice(ta,msg){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){msg.textContent='この端末では音声入力が使えません。';return}try{const r=new SR();r.lang='ja-JP';r.onresult=e=>{ta.value=e.results[0][0].transcript;msg.textContent='音声を文字にしました。'};r.onerror=()=>msg.textContent='うまく聞き取れませんでした。';r.start()}catch(e){msg.textContent='マイクを開始できませんでした。'}}

function menu(){
 head(`社会｜${UNIT}`,()=>subjectGradeTerms('社会',6));
 A.append(e('div','card',`<div class="tiny">日本の歴史 ＞ 小単元</div><h2>${UNIT}</h2><p><b>学校の単元テストに答えられるように、文化・人物・学問をつなげて学びます。</b></p>`));
 A.append(btn('📖 学ぶ',learn,'primary'));
 A.append(btn('🌱 練習問題をやる',()=>startPractice('b'),'soft'));
 A.append(btn('📝 小単元テスト20問',startTest,'soft'));
}
function learn(){
 head(`📖 学ぶ｜${UNIT}`,menu);
 const b=e('div','card lesson',`<h2>${UNIT}</h2><p class="tiny">「文化」「学び」「人物」のつながりを確認します。</p>`);
 LEARN.forEach((x,i)=>b.innerHTML+=`<div class="soc352learn"><b>${i+1}</b><span>${esc(x)}</span></div>`);
 A.append(b);
 A.append(e('div','card bunka362',`
 <h2>👀 図で整理しよう</h2>
 <div class="bunka362grid">
   <div><strong>🎭 町人文化</strong><span>歌舞伎・浮世絵</span><small>都市や商業の発達とともに、町人が文化の担い手になる</small></div>
   <div><strong>🖼️ 浮世絵</strong><span>葛飾北斎・歌川広重</span><small>役者、美人、名所、風景などを版画で表す</small></div>
   <div><strong>✍️ 寺子屋</strong><span>読み書き・そろばん</span><small>町人や農民の子どもたちにも学びが広がる</small></div>
   <div><strong>🔬 蘭学</strong><span>杉田玄白・解体新書</span><small>長崎を通して入った西洋医学や科学を学ぶ</small></div>
   <div><strong>📚 国学</strong><span>本居宣長</span><small>日本の古典や文化を研究する</small></div>
 </div>
 <div class="bunka362flow"><span>都市・商業が発達</span><b>→</b><span>町人の力が高まる</span><b>→</b><span>文化が広がる</span><b>→</b><span>学ぶ人も増える</span></div>
 <p><b>ここが大切：</b>江戸時代後半には、文化や学問が武士や貴族だけでなく、町人や庶民にも広がりました。</p>`));
 A.append(btn('🔊 説明を聞く',()=>speakJP(`${UNIT}。${LEARN.join('。')}`),'soft'));
 A.append(btn('🌱 基礎10問へ',()=>startPractice('b'),'primary'));
}
function level(l){return l==='b'?'🌱 基礎':l==='s'?'📘 標準':'🌟 応用';}
function startPractice(l){st={mode:'p',l,qs:PRACTICE.filter(x=>x.l===l),i:0,first:0,miss:new Set()};practiceQ();}
function practiceQ(){const q=st.qs[st.i];head(`${level(st.l)} ${st.i+1} / ${st.qs.length}｜${UNIT}`,menu);A.append(e('div','card',`<h2>${esc(q.q)}</h2><p class="tiny">${q.cat}</p>`));order(q,st.i).forEach(it=>A.append(btn(it.t,()=>practiceAns(it.ok,q),'soft')));}
function practiceAns(ok,q){if(!ok){st.miss.add(st.i);head('🌱 ここを確認',practiceQ);A.append(e('div','card warn',`<h2>この問題の解説</h2><p><b>答え：</b>${esc(q.a)}</p><p>${esc(q.ex)}</p>`));A.append(btn('同じ問題をもう一度',practiceQ,'primary'));return}if(!st.miss.has(st.i))st.first++;if(window.ponoCorrectSound)window.ponoCorrectSound();head('○ 確認',practiceQ);A.append(e('div','card good',`<h2>できました</h2><p><b>答え：</b>${esc(q.a)}</p><p>${esc(q.ex)}</p>`));st.i++;A.append(btn(st.i<st.qs.length?'次の問題へ':'結果を見る',st.i<st.qs.length?practiceQ:practiceDone,'primary'));}
function practiceDone(){const need=st.l==='b'?8:st.l==='s'?4:0,pass=st.l==='a'||st.first>=need;head(`${level(st.l)}結果｜${UNIT}`,menu);A.append(e('div',`card ${pass?'good':'warn'}`,`<h2>${pass?'✨ できました':'🌱 もう一度確認'}</h2><p>初回正解 <b>${st.first} / ${st.qs.length}</b></p>`));if(st.l==='b'&&pass)A.append(btn('📘 標準5問へ',()=>startPractice('s'),'primary'));if(st.l==='s'&&pass)A.append(btn('🌟 応用3問へ',()=>startPractice('a'),'primary'));if(st.l==='a')A.append(btn('📝 小単元テストへ',startTest,'primary'));}
function startTest(){st={mode:'t',qs:TEST.map(x=>({...x})),i:0,ans:[]};testQ();}
function testQ(){const q=st.qs[st.i];head(`📝 テスト ${st.i+1} / 20｜${UNIT}`,menu);A.append(e('div','card',`<h2>${esc(q.q)}</h2><p class="tiny">${q.cat}｜5点</p>`));if(q.type==='input'){const b=e('div','card soft','<b>答えを書きましょう</b>'),ta=document.createElement('textarea');ta.rows=3;b.appendChild(ta);const m=e('div','tiny','');b.appendChild(btn('🎤 音声で答える',()=>voice(ta,m),'soft'));b.appendChild(m);b.appendChild(btn('この答えで次へ',()=>{const v=ta.value.trim();if(!v){m.textContent='答えを入力してください。';return}record(inputOK(v,q),v,q)},'primary'));A.append(b)}else order(q,st.i).forEach(it=>A.append(btn(it.t,()=>record(it.ok,it.t,q),'soft')));A.append(e('p','tiny','※テスト中は正解・ヒント・解説を表示しません。'));}
function record(ok,user,q){st.ans.push({ok,user,q});st.i++;st.i<20?testQ():result();}
function result(){const c=st.ans.filter(x=>x.ok).length,score=c*5;head(`採点結果｜${UNIT}`,menu);A.append(e('div',`card ${score>=70?'good':'warn'}`,`<h2>${score}点 / 100点</h2><p>${c} / 20問 正解</p><p class="tiny">※記述はキーワードによる自動採点の目安です。</p>`));A.append(btn('📖 答えと解説を見る',review,'primary'));try{records.push({studentId:profile.id,date:new Date().toISOString(),subject:'社会',grade:6,unit:UNIT,content:'小単元テスト20問',correct:c,total:20,rate:score,score,status:`テスト ${score}点`});save()}catch(e){}}
function review(){head(`答えと解説｜${UNIT}`,result);st.ans.forEach((a,i)=>A.append(e('div',`card ${a.ok?'good':'warn'}`,`<div class="tiny">問${i+1}｜${a.ok?'○':'×'}</div><h3>${esc(a.q.q)}</h3><p><b>あなたの答え：</b>${esc(a.user)}</p><p><b>答え：</b>${esc(a.q.a)}</p><p>${esc(a.q.ex)}</p>`)));}

document.addEventListener('click',function(ev){
 const b=ev.target&&ev.target.closest?ev.target.closest('button'):null;if(!b)return;
 const t=(b.textContent||'').replace(/^\s*\d+\.\s*/,'').trim();
 if(t!==UNIT)return;
 const body=(document.body&&document.body.innerText)||'';
 if(!body.includes('日本の歴史'))return;
 ev.preventDefault();ev.stopImmediatePropagation();menu();
},true);
})();
