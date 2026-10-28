/* Pono Learning Quest v36.9 — 小学6年 社会「日本とつながりの深い国々」 */
(function(){
'use strict';
const UNIT = "日本とつながりの深い国々";
const CHAPTERS = [{"title":"① 日本と世界はどうつながる？","summary":"身のまわりの品物から、世界とのつながりを発見しよう。","learn":["日本は世界の国々と、貿易・観光・スポーツ・文化・人の行き来などでつながっています。外国で生まれた製品や食べ物も私たちの生活にあります。","「輸入」は外国から品物を買うことです。「輸出」は日本から外国へ品物を売ることです。どちらも国々が必要なものをやり取りする方法です。","日本は原油などのエネルギー資源や、さまざまな食料を外国から輸入しています。一方、自動車や機械などを外国に輸出しています。","一つの製品でも、原材料・部品・組み立て・販売を別々の国で分担することがあります。身近な品物の表示を調べると世界とのつながりが見えてきます。"]},{"title":"② 近くの国々を見てみよう","summary":"東アジアにある国々と、日本との関係を知ろう。","learn":["中国と韓国は、日本と同じ東アジアにあります。世界地図や地球儀を使うと、海をはさんだ位置関係が分かります。","中国では漢字が使われますが、使い方や読み方は日本語と同じではありません。中国は地域が広く、気候・食文化・暮らしも多様です。","韓国では主にハングルを使って言葉を書きます。日本との間には観光、食品、音楽、スポーツなど、さまざまな交流があります。","近い国でも習慣や考え方が同じとは限りません。なぜ違いが生まれるのか、気候・歴史・文化を調べることが大切です。"]},{"title":"③ 海の向こうの国々を見てみよう","summary":"アメリカ・ブラジル・サウジアラビアを例に考えよう。","learn":["アメリカ合衆国は北アメリカ大陸にあります。日本との間では、貿易、学問、スポーツ、映画など多くの交流があります。","ブラジルは南アメリカ大陸にあります。主にポルトガル語が使われ、日系人の歴史を通じて日本と深いつながりがあります。","サウジアラビアはアジア西部の中東地域にあります。日本との関係では原油の貿易が重要な例です。イスラム教も社会や文化に大きく関わっています。","同じ国の中にも地域や家庭によって暮らしの違いがあります。代表的な特徴だけで、すべての人を同じだと決めつけないようにしましょう。"]},{"title":"④ 文化や人を通してつながる","summary":"違いを知り、尊重することが交流の出発点です。","learn":["世界の国々には、言語、食事、宗教、行事、住まい方などにさまざまな違いがあります。違いの背景を調べると暮らしへの理解が深まります。","オリンピック・パラリンピック、音楽、観光、学校同士の交流などを通して、人々は国境をこえてつながっています。","「自分たちと違うからおかしい」と決めつけず、相手の考えや文化を知ろうとする姿勢が、互いに尊重し合うことにつながります。","貿易の相手が限られすぎると、災害や国際的な出来事などが起きたとき、品物が届きにくくなることもあります。世界のつながりには便利さと課題の両方があります。"]},{"title":"⑤ 資料から自分で考えよう","summary":"地図・商品の表示・交流の様子から読み取ろう。","learn":["国の位置を知りたいときは世界地図や地球儀を使います。輸入や輸出の様子を知りたいときは、貿易のグラフや表が役立ちます。","食品や洋服の原産国表示、部品の製造国などを調べると、身近な暮らしが外国の生産や物流とつながっていることが分かります。","資料を読むときは「いつの数字か」「何を比べているか」を確認しましょう。国による違いを一つの数字だけで決めつけず、複数の資料を見ることが大切です。"]}];
const PRACTICE = [{"l":"b","cat":"ことば","q":"外国から品物を買い入れることを何といいますか。","a":"輸入","w":["輸出","国内生産"],"ex":"輸入は外国から品物を買うことです。"},{"l":"b","cat":"ことば","q":"日本から外国へ品物を売ることを何といいますか。","a":"輸出","w":["輸入","国内消費"],"ex":"輸出は外国へ品物を売ることです。"},{"l":"b","cat":"地理","q":"中国や韓国と日本がある地域はどこですか。","a":"東アジア","w":["南アメリカ","西ヨーロッパ"],"ex":"日本、中国、韓国はいずれも東アジアにあります。"},{"l":"b","cat":"地理","q":"アメリカ合衆国が位置する大陸はどこですか。","a":"北アメリカ","w":["南アメリカ","ヨーロッパ"],"ex":"アメリカ合衆国の大部分は北アメリカ大陸にあります。"},{"l":"b","cat":"地理","q":"ブラジルがある大陸はどこですか。","a":"南アメリカ","w":["北アメリカ","アフリカ"],"ex":"ブラジルは南アメリカ大陸にあります。"},{"l":"b","cat":"地理","q":"サウジアラビアがある地域はどこですか。","a":"中東（アジア西部）","w":["東アジア","南アメリカ"],"ex":"サウジアラビアはアジア西部の中東地域にあります。"},{"l":"b","cat":"言語","q":"韓国で主に使われる文字はどれですか。","a":"ハングル","w":["ひらがな","キリル文字"],"ex":"韓国語は主にハングルを使って表記されます。"},{"l":"b","cat":"言語","q":"ブラジルの主な公用語はどれですか。","a":"ポルトガル語","w":["スペイン語","英語"],"ex":"ブラジルの公用語はポルトガル語です。"},{"l":"b","cat":"貿易","q":"日本が外国から多く輸入しているエネルギー資源の例はどれですか。","a":"原油","w":["自動車","電子ゲーム機"],"ex":"日本は国内で十分に得られない原油などを輸入しています。"},{"l":"b","cat":"資料","q":"国々の位置関係を調べるのに適している資料はどれですか。","a":"世界地図・地球儀","w":["気温の折れ線グラフ","工場の設計図"],"ex":"世界地図・地球儀は国や大陸の位置関係を示します。"},{"l":"s","cat":"資料の読み取り","q":"【資料】洋服のタグに「原産国：ベトナム」とあります。どんなことが分かりますか。","a":"その洋服は外国でつくられた","w":["日本でしかつくられない","日本の輸出量が必ず増えた"],"ex":"原産国表示から、商品がどこでつくられたかを読み取れます。"},{"l":"s","cat":"貿易","q":"日本が外国に売っている工業製品の例として適切なのはどれですか。","a":"自動車や機械","w":["輸入した原油だけ","国内の田んぼだけ"],"ex":"日本は自動車や機械などの工業製品を輸出しています。"},{"l":"s","cat":"交流","q":"日本と韓国の交流の例として適切なものはどれですか。","a":"観光や音楽・スポーツを通じた交流","w":["江戸時代の参勤交代","日本国内の県議会選挙"],"ex":"観光や音楽・スポーツなど、国をこえた交流があります。"},{"l":"s","cat":"資料の読み取り","q":"ある国について、地域によって気候や食事に違いがある資料を読みました。正しい考え方はどれですか。","a":"同じ国の中にも多様な暮らしがある","w":["一国の人は全員同じ生活をする","気候は暮らしと無関係である"],"ex":"国の中にも、地域や家庭による違いがあります。"},{"l":"s","cat":"国際理解","q":"違う文化や習慣に出会ったとき、大切にしたい態度はどれですか。","a":"違いの背景を調べて尊重する","w":["自分と同じ習慣に変えさせる","確かめずに相手を判断する"],"ex":"違いを理解し、互いに尊重することが国際理解につながります。"},{"l":"a","cat":"思考・活用","q":"ある国から輸入する品物の割合がとても高いとき、考えられる課題はどれですか。","a":"その国で問題が起きると品物が届きにくくなる","w":["必ず品物が安定して届く","自国の生産が不要になる"],"ex":"輸入先の偏りは、供給が不安定になるリスクにつながる場合があります。"},{"l":"a","cat":"資料・判断","q":"貿易額のグラフを比べるとき、まず確認するべきことはどれですか。","a":"調べた年や品物・単位が同じか","w":["グラフの色だけ","国旗の大きさだけ"],"ex":"年や単位が違うと正しく比較できないため、資料の条件を確認します。"},{"l":"a","cat":"総合","q":"国際交流が大切な理由として、最も適切なのはどれですか。","a":"違う文化の人と理解し合い協力できるから","w":["世界中の文化を一つに統一するため","外国の暮らしを知らなくてもよいから"],"ex":"文化の違いを尊重しながら理解し合うことが交流の大切な役割です。"}];
const TEST = [{"cat":"貿易","type":"choice","q":"外国から品物を買うことを何といいますか。","a":"輸入","w":["輸出","国内販売"],"ex":"輸入は外国から品物を買うことです。"},{"cat":"貿易","type":"choice","q":"外国に品物を売ることを何といいますか。","a":"輸出","w":["輸入","国内消費"],"ex":"輸出は外国へ品物を売ることです。"},{"cat":"地理","type":"choice","q":"国の位置や距離を調べるときに役立つ資料はどれですか。","a":"世界地図や地球儀","w":["景気の折れ線グラフ","人口だけの棒グラフ"],"ex":"地図や地球儀は世界の国々の位置関係を示します。"},{"cat":"地域","type":"choice","q":"中国や韓国と日本がある地域はどれですか。","a":"東アジア","w":["中東","南アメリカ"],"ex":"日本、中国、韓国は東アジアにあります。"},{"cat":"地域","type":"choice","q":"アメリカ合衆国の大部分がある大陸はどれですか。","a":"北アメリカ","w":["南アメリカ","オーストラリア"],"ex":"アメリカ合衆国の大部分は北アメリカ大陸にあります。"},{"cat":"地域","type":"choice","q":"ブラジルが位置する大陸はどこですか。","a":"南アメリカ","w":["北アメリカ","ユーラシア"],"ex":"ブラジルは南アメリカ大陸にあります。"},{"cat":"地域","type":"choice","q":"サウジアラビアの位置として正しいのはどれですか。","a":"アジア西部の中東","w":["東アジアの島々","南アメリカの東部"],"ex":"サウジアラビアはアジア西部の中東地域にあります。"},{"cat":"言語","type":"choice","q":"韓国語を書くときに主に使われる文字はどれですか。","a":"ハングル","w":["ひらがな","ローマ数字"],"ex":"韓国語では主にハングルが使われます。"},{"cat":"言語","type":"choice","q":"ブラジルの公用語はどれですか。","a":"ポルトガル語","w":["スペイン語","フランス語"],"ex":"ブラジルの公用語はポルトガル語です。"},{"cat":"貿易","type":"choice","q":"日本が輸入しているエネルギー資源の例はどれですか。","a":"原油","w":["自動車","精密機械"],"ex":"日本は原油などのエネルギー資源を輸入しています。"},{"cat":"貿易","type":"choice","q":"日本から外国へ輸出する工業製品の例はどれですか。","a":"自動車や機械","w":["輸入した原油だけ","原産国表示だけ"],"ex":"自動車や機械は日本の輸出品の例です。"},{"cat":"資料","type":"choice","q":"外国でつくられた商品だと確かめる手がかりはどれですか。","a":"原産国の表示","w":["商品の大きさだけ","店の照明だけ"],"ex":"原産国表示に生産された国が示されていることがあります。"},{"cat":"産業","type":"choice","q":"一つの製品の部品づくりや組み立てを複数の国で分担することから分かるのは？","a":"国々の産業はつながっている","w":["各国の産業は完全に独立している","製品には部品がいらない"],"ex":"材料・部品・組み立て・販売は複数国をまたぐことがあります。"},{"cat":"交流","type":"choice","q":"日本とアメリカのつながりの例として適切なのは？","a":"貿易や学問・スポーツの交流","w":["参勤交代の大名行列","江戸幕府の寺子屋"],"ex":"日本とアメリカの間には貿易やさまざまな交流があります。"},{"cat":"交流","type":"choice","q":"日本とブラジルの関係を考えるとき、歴史的につながりが深い例はどれですか。","a":"日系人の歴史や文化交流","w":["室町幕府の勘合貿易","聖徳太子の遣隋使"],"ex":"ブラジルには日本からの移住の歴史があり、日系人を通じた交流もあります。"},{"cat":"文化","type":"choice","q":"同じ国の人々の生活について、正しい見方はどれですか。","a":"地域や家庭によって違いがある","w":["全員が全く同じ習慣で暮らす","一度調べれば全員の暮らしが分かる"],"ex":"同じ国でも地域や家庭などにより暮らしは多様です。"},{"cat":"国際理解","type":"choice","q":"異なる文化の人と交流するときに大切なことは？","a":"相手の文化を知り、互いに尊重する","w":["相手の文化を否定する","同じ習慣に変えるよう求める"],"ex":"違いを知り、尊重する姿勢が大切です。"},{"cat":"考察","type":"choice","q":"一つの国だけから輸入する品物に大きく頼ることの課題は？","a":"その国で問題が起こると届きにくくなる","w":["必ず価格が安定する","輸入がいらなくなる"],"ex":"自然災害や政治・物流の変化が輸入品に影響する場合があります。"},{"cat":"記述","type":"input","q":"外国から品物を買うことを、漢字2文字で書きましょう。","a":"輸入","keys":["輸入"],"ex":"輸入は外国から品物を買うことです。"},{"cat":"記述","type":"input","q":"日本から外国へ品物を売ることを、漢字2文字で書きましょう。","a":"輸出","keys":["輸出"],"ex":"輸出は日本から外国へ品物を売ることです。"}];
const KNOWN_SOCIAL = ["国づくりへの歩み","大陸に学んだ国づくり","武士の政治が始まる","室町文化と力をつける人々","全国統一への動き","幕府の政治と人々の暮らし","新しい文化と学問","明治の新しい国づくり","近代国家を目ざして","戦争と人々の暮らし","平和で豊かな暮らしを目ざして","日本とつながりの深い国々","地球規模の課題の解決と国際協力"];
let state = null;
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function norm(v){return String(v||'').replace(/[。、，,\s「」『』（）()・％%]/g,'').toLowerCase();}
function choose(q,i){
 const entries=[q.a,...q.w].map((t,n)=>({t,ok:n===0}));
 const pos=[[1,0,2],[2,1,0],[0,2,1],[2,0,1],[1,2,0],[0,1,2]];
 return pos[i%pos.length].map(j=>entries[j]);
}
function speak(text){
 if(typeof speakJP==='function'){speakJP(text);return;}
 const u=new SpeechSynthesisUtterance(text);u.lang='ja-JP';u.rate=.85;speechSynthesis.cancel();speechSynthesis.speak(u);
}
function voice(ta,msg){
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){msg.textContent='この端末では音声入力が使えません。文字で入力してください。';return;}
 try{
  const r=new SR();r.lang='ja-JP';r.onresult=ev=>{ta.value=ev.results[0][0].transcript;msg.textContent='音声を文字にしました。確認してください。';};
  r.onerror=()=>{msg.textContent='聞き取れませんでした。もう一度お試しください。';};r.start();
 }catch(ex){msg.textContent='マイクを開始できませんでした。';}
}
function menu(){
 head(`社会｜${UNIT}`,()=>subjectGradeTerms('社会',6));
 A.append(e('div','card',`<div class="tiny">小学6年 社会 ＞ 世界の中の日本</div><h2>${UNIT}</h2><p>貿易・文化・暮らしのつながりを、身近な例から学びます。</p>`));
 A.append(btn('📖 学ぶ（5つの短い章）',()=>learnStep(0),'primary'));
 A.append(btn('🌱 練習問題をやる',()=>practiceStart('b'),'soft'));
 A.append(btn('📝 小単元テスト20問',testStart,'soft'));
}
function block(text,i){return `<div class="soc352learn"><b>${i+1}</b><span>${esc(text)}</span></div>`;}
function diagram(i){
 if(i===0)return `<div class="world369flow"><span>外国でつくられた品物</span><b>↓ 輸入</b><span>🇯🇵 日本の暮らし</span><b>↓ 輸出</b><span>外国へ売る日本の製品</span></div><p class="world369tip">食べ物や洋服の原産国表示を見てみよう。</p>`;
 if(i===1)return `<div class="world369cards"><section><strong>🇨🇳 中国</strong><span>東アジア</span><small>漢字、地域によって多様な食文化や気候</small></section><section><strong>🇰🇷 韓国</strong><span>東アジア</span><small>ハングル、観光・音楽・スポーツの交流</small></section></div>`;
 if(i===2)return `<div class="world369cards"><section><strong>🇺🇸 アメリカ</strong><span>北アメリカ</span><small>貿易・スポーツ・学問などの交流</small></section><section><strong>🇧🇷 ブラジル</strong><span>南アメリカ</span><small>ポルトガル語・日系人の歴史</small></section><section><strong>🇸🇦 サウジアラビア</strong><span>中東・アジア西部</span><small>日本との原油の貿易など</small></section></div>`;
 if(i===3)return `<div class="world369flow"><span>文化や習慣の違いを知る</span><b>↓</b><span>相手の背景を考える</span><b>↓</b><span>互いに尊重し、協力する</span></div>`;
 return `<div class="world369cards"><section><strong>🗺️ 世界地図・地球儀</strong><small>国の位置と距離を見る</small></section><section><strong>🏷️ 商品の原産国表示</strong><small>どの国でつくられたかを見る</small></section><section><strong>📊 貿易の表・グラフ</strong><small>「何年の数字か」「何の品物か」を確かめる</small></section></div>`;
}
function learnStep(i){
 const ch=CHAPTERS[i];head(`📖 学ぶ｜${UNIT}`,menu);
 A.append(e('div','card lesson world369lesson',`<div class="world369progress"><span>学ぶ ${i+1} / ${CHAPTERS.length}</span><div class="world369bar"><i style="width:${100*(i+1)/CHAPTERS.length}%"></i></div></div><h2>${esc(ch.title)}</h2><p class="tiny">${esc(ch.summary)}</p>${ch.learn.map(block).join('')}</div>`));
 A.append(e('div','card',`<h2>👀 図で確かめよう</h2>${diagram(i)}`));
 A.append(btn('🔊 この章の説明を聞く',()=>speak(ch.learn.join('。')),'soft'));
 if(i>0)A.append(btn('← 前の章',()=>learnStep(i-1),'soft'));
 A.append(btn(i<CHAPTERS.length-1?'次の章へ →':'🌱 基礎10問へ',i<CHAPTERS.length-1?()=>learnStep(i+1):()=>practiceStart('b'),'primary'));
}
function label(l){return l==='b'?'🌱 基礎':l==='s'?'📘 標準':'🌟 応用';}
function practiceStart(l){state={kind:'practice',level:l,questions:PRACTICE.filter(q=>q.l===l),i:0,first:0,wrong:new Set()};practiceQuestion();}
function practiceQuestion(){
 const s=state,q=s.questions[s.i];if(!q)return practiceDone();head(`${label(s.level)} ${s.i+1}/${s.questions.length}｜${UNIT}`,menu);
 A.append(e('div','card',`<p class="tiny">${esc(q.cat)}</p><h2>${esc(q.q)}</h2>`));
 choose(q,s.i).forEach(x=>A.append(btn(x.t,()=>practiceAnswer(x.ok,q),'soft')));
}
function practiceAnswer(ok,q){
 const s=state;if(!ok){s.wrong.add(s.i);head('🌱 解説を確認',practiceQuestion);
  A.append(e('div','card warn',`<h2>もう一度確認しよう</h2><p><b>答え：</b>${esc(q.a)}</p><p>${esc(q.ex)}</p>`));
  A.append(btn('同じ問題をやり直す',practiceQuestion,'primary'));return;}
 if(!s.wrong.has(s.i))s.first++;
 if(window.ponoCorrectSound)window.ponoCorrectSound();
 head('○ できました',practiceQuestion);A.append(e('div','card good',`<p><b>答え：</b>${esc(q.a)}</p><p>${esc(q.ex)}</p>`));
 s.i++;A.append(btn(s.i<s.questions.length?'次の問題へ':'結果を見る',s.i<s.questions.length?practiceQuestion:practiceDone,'primary'));
}
function practiceDone(){
 const s=state,need=s.level==='b'?8:s.level==='s'?4:0;
 const passed=s.level==='a'||s.first>=need;
 head(`${label(s.level)} 結果｜${UNIT}`,menu);
 A.append(e('div',`card ${passed?'good':'warn'}`,`<h2>${passed?'✨ できました':'🌱 復習してみよう'}</h2><p>初回正解 ${s.first} / ${s.questions.length}問</p>`));
 if(passed&&s.level==='b')A.append(btn('📘 標準5問へ',()=>practiceStart('s'),'primary'));
 if(passed&&s.level==='s')A.append(btn('🌟 応用3問へ',()=>practiceStart('a'),'primary'));
 if(s.level==='a')A.append(btn('📝 小単元テストへ',testStart,'primary'));
 A.append(btn('同じレベルをもう一度',()=>practiceStart(s.level),'soft'));
 A.append(btn('📖 学ぶへ戻る',()=>learnStep(0),'soft'));
}
function testStart(){state={kind:'test',questions:TEST.map(q=>({...q})),i:0,answers:[]};testQuestion();}
function testQuestion(){
 const s=state,q=s.questions[s.i];if(!q)return result();head(`📝 テスト ${s.i+1}/${s.questions.length}｜${UNIT}`,menu);
 A.append(e('div','card',`<h2>${esc(q.q)}</h2><p class="tiny">${esc(q.cat)}｜5点</p>`));
 if(q.type==='input'){
  const d=e('div','card soft','<b>答えを書こう（音声入力も使えます）</b>');const ta=document.createElement('textarea');ta.rows=2;ta.setAttribute('aria-label','記述の答え');d.append(ta);
  const msg=e('div','tiny','');d.append(btn('🎤 音声で答える',()=>voice(ta,msg),'soft'));d.append(msg);
  d.append(btn('この答えで次へ',()=>{const user=ta.value.trim();if(!user){msg.textContent='答えを入力してください。';return;}record((q.keys||[q.a]).every(k=>norm(user).includes(norm(k))),user,q);},'primary'));A.append(d);
 }else choose(q,s.i).forEach(x=>A.append(btn(x.t,()=>record(x.ok,x.t,q),'soft')));
 A.append(e('p','tiny','※テスト中は正解や解説を表示しません。'));
}
function record(ok,user,q){state.answers.push({ok,user,q});state.i++;state.i<state.questions.length?testQuestion():result();}
function result(){
 const s=state,correct=s.answers.filter(a=>a.ok).length,score=correct*5;
 head(`採点結果｜${UNIT}`,menu);
 A.append(e('div',`card ${score>=70?'good':'warn'}`,`<h2>${score}点 / 100点</h2><p>${correct} / 20問 正解</p><p class="tiny">※記述の自動採点は目安です。先生が表現を確認してください。</p>`));
 A.append(btn('📖 答えと解説を見る',review,'primary'));
 A.append(btn('🌱 基礎から復習',()=>practiceStart('b'),'soft'));
 try{records.push({studentId:profile.id,date:new Date().toISOString(),subject:'社会',grade:6,unit:UNIT,content:'小単元テスト20問',correct,total:20,rate:score,score,status:`テスト ${score}点`});save();}catch(ex){}
}
function review(){head(`答えと解説｜${UNIT}`,result);state.answers.forEach((a,i)=>A.append(e('div',`card ${a.ok?'good':'warn'}`,`<p class="tiny">問${i+1}｜${a.ok?'○':'×'}</p><h3>${esc(a.q.q)}</h3><p><b>あなたの答え：</b>${esc(a.user)}</p><p><b>答え：</b>${esc(a.q.a)}</p><p>${esc(a.q.ex)}</p>`)));}
// 既存の第6学年社会の小単元一覧ボタンを、本教材へ接続。
document.addEventListener('click',ev=>{
 const b=ev.target&&ev.target.closest?ev.target.closest('button'):null;if(!b)return;
 const name=(b.textContent||'').replace(/^\s*\d+\.\s*/,'').trim();
 if(name!==UNIT)return;
 const body=(document.getElementById('app')?.textContent||'');
 if(!body.includes('世界の中の日本'))return;
 ev.preventDefault();ev.stopImmediatePropagation();menu();
},true);
// 第6学年社会「学ぶ」の長い見出しを、スマホで自然な2段構成にする。
function fixHeading(){
 const h=document.querySelector('#app .top > h1');if(!h||h.dataset.pono369Heading==='1')return;
 const match=h.textContent.match(/^📖\s*学ぶ\s*[｜|]\s*(.+)$/);if(!match)return;
 if(!KNOWN_SOCIAL.includes(match[1]))return;
 const label=document.createElement('span');label.className='pono369headLabel';label.textContent='📖 学ぶ';
 const title=document.createElement('span');title.className='pono369headTitle';title.textContent=match[1];
 h.replaceChildren(label,title);h.dataset.pono369Heading='1';h.parentElement.classList.add('pono369heading');
}
const root=document.getElementById('app');
if(root&&typeof MutationObserver!=='undefined'){
 let scheduled=false;
 new MutationObserver(()=>{
  if(scheduled)return;scheduled=true;
  requestAnimationFrame(()=>{scheduled=false;fixHeading();});
 }).observe(root,{subtree:true,childList:true});
 fixHeading();
}
})();
