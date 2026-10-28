/* Pono Learning Quest v38.4 — 小学6年英語 8単元の総復習 */
(function(){
'use strict';
const UNITS=[{"title":"This is me!","jp":"自分の好きなこと・得意なこと","goal":"好きなことと、できることを伝える","points":[["I like music.","私は音楽が好きです。"],["I can play the piano.","私はピアノを弾けます。"],["What do you like?","何が好きですか。"]],"note":"like の後ろには好きなもの、can の後ろには動作を表す言葉を続けます。","say":"I like drawing. I can swim.","sayjp":"私は絵を描くのが好きです。泳げます。"},{"title":"Welcome to Japan.","jp":"日本の文化を紹介する","goal":"日本の季節や文化を短く紹介する","points":[["Welcome to Japan.","日本へようこそ。"],["You can see cherry blossoms in spring.","春には桜を見られます。"],["Please try Japanese food.","日本の食べ物を試してみてください。"]],"note":"You can ... は「あなたは〜できます」、Please ... はていねいなお願いです。","say":"You can enjoy summer festivals in Japan.","sayjp":"日本では夏祭りを楽しめます。"},{"title":"What time do you get up?","jp":"一日の生活と時刻","goal":"自分の一日の時刻を伝える","points":[["What time do you get up?","何時に起きますか。"],["I get up at six thirty.","私は6時30分に起きます。"],["I go to bed at nine.","私は9時に寝ます。"]],"note":"時刻の前には at を使います。six thirty は6時30分です。","say":"I eat breakfast at seven.","sayjp":"私は7時に朝食を食べます。"},{"title":"My Summer Vacation","jp":"過去の出来事","goal":"夏休みにしたことを過去の表現で伝える","points":[["I went to the sea.","私は海に行きました。"],["I ate watermelon.","私はスイカを食べました。"],["I saw a beautiful sunset.","私はきれいな夕日を見ました。"]],"note":"went は go、ate は eat、saw は see の過去の形です。","say":"I went to the park and played soccer.","sayjp":"私は公園に行ってサッカーをしました。"},{"title":"We live together.","jp":"世界の文化とつながり","goal":"国や言葉の違いを知り、行きたい場所を伝える","points":[["Where do you want to go?","どこに行きたいですか。"],["I want to go to Australia.","私はオーストラリアに行きたいです。"],["People speak different languages.","人々はさまざまな言語を話します。"]],"note":"want to go to ... で「〜へ行きたい」。文化の違いを尊重することも大切です。","say":"I want to visit Brazil someday.","sayjp":"私はいつかブラジルを訪れたいです。"},{"title":"Save the animals.","jp":"動物と環境を守る","goal":"動物のくらしと守るための行動を伝える","points":[["They live in the forest.","彼らは森に住んでいます。"],["We can plant trees.","私たちは木を植えられます。"],["Don't throw trash into the river.","川にごみを捨てないでください。"]],"note":"Don’t ... は「〜しないで」という表現。できる行動を具体的に考えます。","say":"We can help animals by keeping rivers clean.","sayjp":"川をきれいに保つことで動物を助けられます。"},{"title":"My Best Memory","jp":"小学校生活の思い出","goal":"心に残ったことと気持ちを伝える","points":[["What is your best memory?","いちばんの思い出は何ですか。"],["My best memory is our sports day.","いちばんの思い出は運動会です。"],["It was exciting.","わくわくしました。"]],"note":"思い出を一つ選び、何をしたかや気持ちを一文添えましょう。","say":"My best memory is our school trip. It was fun.","sayjp":"いちばんの思い出は修学旅行です。楽しかったです。"},{"title":"My Future, My Dream","jp":"将来の夢","goal":"将来の希望と理由を簡単に伝える","points":[["What do you want to be?","将来何になりたいですか。"],["I want to be a chef.","私は料理人になりたいです。"],["Because I want to help people.","なぜなら人を助けたいからです。"]],"note":"I want to be ... で希望を伝えます。まだ決まっていなければ興味のあることを話しても大丈夫です。","say":"I want to be a teacher because I like helping children.","sayjp":"子どもたちを助けるのが好きなので、先生になりたいです。"}];
const TEST=[{"unit":0,"kind":"読む","src":"My name is Yui. I like drawing. I can swim.","q":"Yuiが好きなことは何ですか。","opts":["泳ぐこと","絵を描くこと","料理すること","歌うこと"],"ans":1,"why":"I like drawing. が好きなことを示します。"},{"unit":0,"kind":"表現","src":"","q":"「私はピアノを弾けます。」に合う英文はどれですか。","opts":["I like the piano.","I want a piano.","I play the piano yesterday.","I can play the piano."],"ans":3,"why":"can の後ろは play のような動詞の原形です。"},{"unit":0,"kind":"聞く","src":"I like blue, but I don't like green.","q":"話している人の好きな色は何ですか。","opts":["青","緑","黄色","赤"],"ans":0,"why":"I like blue. が好きな色を表しています。"},{"unit":1,"kind":"読む","src":"You can see cherry blossoms in spring in Japan.","q":"日本の春に見ることができるものは何ですか。","opts":["花火","雪","桜","紅葉"],"ans":2,"why":"cherry blossoms は桜、in spring は春です。"},{"unit":1,"kind":"表現","src":"","q":"「おすしを試してみてください。」に合う英文はどれですか。","opts":["I tried sushi yesterday.","Please try sushi.","I never eat sushi.","Do you cook sushi?"],"ans":1,"why":"Please try ... は「〜を試してください」の意味です。"},{"unit":1,"kind":"聞く","src":"We have summer festivals in Japan.","q":"日本で紹介されている行事は何ですか。","opts":["雪まつり","入学式","卒業式","夏祭り"],"ans":3,"why":"summer festivals は夏祭りです。"},{"unit":2,"kind":"聞く","src":"I get up at six thirty.","q":"話している人は何時に起きますか。","opts":["6時30分","7時30分","6時","7時"],"ans":0,"why":"six thirty は6時30分です。"},{"unit":2,"kind":"読む","src":"I eat breakfast at seven. I leave home at eight.","q":"家を出る時刻は何時ですか。","opts":["6時","7時","8時","9時"],"ans":2,"why":"I leave home at eight. に注目します。"},{"unit":2,"kind":"表現","src":"What time do you go to bed?","q":"質問に合う答えを選びましょう。","opts":["I like bedtime.","I go to bed at nine.","I went to the zoo.","I can dance."],"ans":1,"why":"What time ...? には時刻を含めて答えます。"},{"unit":3,"kind":"読む","src":"Last Sunday, I went to the zoo and saw elephants.","q":"この人が日曜日に行った場所はどこですか。","opts":["公園","海","図書館","動物園"],"ans":3,"why":"went to the zoo は「動物園に行った」です。"},{"unit":3,"kind":"表現","src":"","q":"「昨日、カレーを食べました。」の空欄に入る語はどれですか。I (　) curry yesterday.","opts":["ate","eat","eats","eating"],"ans":0,"why":"yesterday は昨日を示すので eat の過去形 ate を使います。"},{"unit":3,"kind":"聞く","src":"I played soccer with my brother yesterday.","q":"誰とサッカーをしましたか。","opts":["友だち","先生","兄弟","お父さん"],"ans":2,"why":"with my brother は兄弟と、という意味です。"},{"unit":4,"kind":"読む","src":"Lina lives in Brazil. She speaks Portuguese.","q":"Linaが話す言語は何ですか。","opts":["英語","ポルトガル語","日本語","フランス語"],"ans":1,"why":"She speaks Portuguese. に注目します。"},{"unit":4,"kind":"表現","src":"Where do you want to go?","q":"質問に合う答えを選びましょう。","opts":["I can cook.","It is a book.","I live in Japan.","I want to go to Australia."],"ans":3,"why":"Where ...? は場所をたずねています。"},{"unit":5,"kind":"読む","src":"Sea turtles sometimes eat plastic bags because the bags look like jellyfish.","q":"ウミガメが食べてしまうことがあるものは何ですか。","opts":["ビニール袋","木の葉","空き缶","石"],"ans":0,"why":"plastic bags はビニール袋です。"},{"unit":5,"kind":"聞く","src":"Please don't throw trash into the river.","q":"何をしないよう呼びかけていますか。","opts":["川で泳ぐこと","木を植えること","川へごみを捨てること","川の写真を撮ること"],"ans":2,"why":"Don't throw trash into the river. の意味を考えます。"},{"unit":6,"kind":"読む","src":"My best memory is our sports day. I ran with my team.","q":"いちばんの思い出は何ですか。","opts":["遠足","運動会","学芸会","修学旅行"],"ans":1,"why":"sports day は運動会です。"},{"unit":6,"kind":"表現","src":"What is your best memory?","q":"質問に合う答えを選びましょう。","opts":["I want to be a nurse.","I get up at seven.","I can swim.","My best memory is our school trip."],"ans":3,"why":"best memory はいちばんの思い出です。"},{"unit":7,"kind":"読む","src":"I want to be a nurse because I want to help people.","q":"この人が看護師になりたい理由は何ですか。","opts":["人を助けたいから","旅行したいから","動物が好きだから","本を読みたいから"],"ans":0,"why":"because I want to help people が理由です。"},{"unit":7,"kind":"聞く","src":"I want to be a chef in the future.","q":"この人の将来の希望は何ですか。","opts":["先生","医師","料理人","画家"],"ans":2,"why":"chef は料理人、in the future は将来です。"}];
const PRACTICE=[{"unit":0,"kind":"読む","src":"I like soccer. I can ride a bicycle.","q":"この人ができることは何ですか。","opts":["サッカーをする","自転車に乗る","泳ぐ","料理する"],"ans":1,"why":"can ride a bicycle に注目します。"},{"unit":0,"kind":"表現","src":"What do you like?","q":"自然な答えはどれですか。","opts":["I like apples.","I went home.","I am eleven yesterday.","I live at seven."],"ans":0,"why":"like の質問には I like ... と答えられます。"},{"unit":1,"kind":"読む","src":"Please enjoy Japanese food.","q":"何を楽しんでほしいと伝えていますか。","opts":["運動会","音楽","夏休み","日本の食べ物"],"ans":3,"why":"Japanese food は日本の食べ物です。"},{"unit":2,"kind":"読む","src":"I go to school at eight fifteen.","q":"学校へ行く時刻は何時ですか。","opts":["8時50分","7時15分","8時15分","9時15分"],"ans":2,"why":"eight fifteen は8時15分です。"},{"unit":2,"kind":"表現","src":"","q":"時刻を伝える文として正しいものは？","opts":["I get up in seven.","I get up at seven.","I get up on seven.","I get up to seven."],"ans":1,"why":"時刻には at を使います。"},{"unit":3,"kind":"読む","src":"I saw a rainbow yesterday.","q":"昨日見たものは何ですか。","opts":["虹","星","海","花火"],"ans":0,"why":"saw は see の過去形です。"},{"unit":3,"kind":"表現","src":"","q":"go の過去形はどれですか。","opts":["goes","going","gone to","went"],"ans":3,"why":"go の過去形は went です。"},{"unit":4,"kind":"読む","src":"I want to visit Canada someday.","q":"行ってみたい国はどこですか。","opts":["ブラジル","オーストラリア","カナダ","日本"],"ans":2,"why":"visit Canada に注目します。"},{"unit":5,"kind":"読む","src":"We can save water by turning off the tap.","q":"水を大切に使うための行動は何ですか。","opts":["電気をつける","蛇口を閉める","ごみを増やす","水を流し続ける"],"ans":1,"why":"turning off the tap は蛇口を閉めることです。"},{"unit":6,"kind":"読む","src":"Our school festival was fun.","q":"行事はどうだったと話していますか。","opts":["楽しかった","こわかった","つまらなかった","難しかった"],"ans":0,"why":"fun は楽しかったという感想です。"},{"unit":7,"kind":"表現","src":"What do you want to be?","q":"自然な答えはどれですか。","opts":["I like blue.","I get up at six.","I went to the zoo.","I want to be an artist."],"ans":3,"why":"将来なりたい仕事を I want to be ... で伝えます。"},{"unit":7,"kind":"読む","src":"I want to help animals, so I want to be a vet.","q":"どんな仕事を目指していますか。","opts":["料理人","先生","獣医","建築家"],"ans":2,"why":"vet は獣医です。"}];
const root=document.getElementById('app');if(!root)return;
const E=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const el=(tag,cls,html)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(html!==undefined)x.innerHTML=html;return x};
const button=(label,fn,cls='soft')=>{const x=document.createElement('button');x.type='button';x.className=cls;x.textContent=label;x.addEventListener('click',fn);return x};
let st=null;
function shell(title,back){root.replaceChildren();const top=el('div','top');top.append(button('← 戻る',back,'back'),el('h1','eng384title',E(title)));root.append(top);try{window.scrollTo(0,0);}catch(e){}}
function speak(line,slow=false){
 try{const sy=window.speechSynthesis;if(!sy||!window.SpeechSynthesisUtterance){alert('この端末では音声読み上げを利用できません。英文の文字表示を使ってください。');return}
  sy.cancel();const u=new SpeechSynthesisUtterance(String(line));u.lang='en-US';u.rate=slow?.63:.86;u.pitch=1;
  const voices=sy.getVoices?.()||[];const v=voices.find(x=>x.lang==='en-US')||voices.find(x=>x.lang.startsWith('en'));if(v)u.voice=v;
  sy.speak(u);if(st&&st.mode==='test')st.reads++;}catch(e){alert('この端末では読み上げを利用できません。英文を表示して学びましょう。')}
}
function audio(line){const x=el('div','eng384audio');x.append(button('🔊 英語を聞く',()=>speak(line)));x.append(button('🐢 ゆっくり聞く',()=>speak(line,true)));return x}
function enter(){st=null;shell('外国語｜小学6年 全体のまとめ',()=>subjectGradeTerms('外国語',6));
 root.append(el('div','card eng384hero','<p class="tiny">小学6年　外国語・総復習</p><h2>聞く・読む・伝える力を育てよう</h2><p>8単元を振り返り、12問で練習してから20問テストに挑戦できます。読み上げや英文表示を使っても減点しません。</p>'));
 root.append(button('📖 8単元を復習する',lessonMenu,'primary'));
 root.append(button('🌱 練習12問',()=>start('practice'),'soft'));
 root.append(button('📝 まとめテスト20問（100点）',()=>start('test'),'soft'));
 root.append(el('div','card eng384tips','<h3>使い方</h3><p>「聞く」問題では、まず音声を聞けます。聞き取りにくいときは英文を表示できます。発音の上手・下手は採点しません。</p><p class="tiny">※ 音声機能は端末の対応状況によって使えない場合があります。</p>'));
}
function lessonMenu(){shell('📖 英語8単元の復習',enter);root.append(el('div','card eng384tips','<p>学びたい単元を選ぼう。音声を聞き、例文をまねし、自分のことに置き換えてみましょう。</p>'));
 UNITS.forEach((u,i)=>root.append(button(`${i+1}. ${u.title}　｜　${u.jp}`,()=>lesson(i),'soft eng384unitbtn')));
 root.append(button('🌱 練習12問へ',()=>start('practice'),'primary'));
}
function lesson(i){const u=UNITS[i];shell(`📖 ${u.title}`,lessonMenu);
 const c=el('div','card eng384lesson',`<p class="tiny">${i+1} / 8　｜　${E(u.jp)}</p><h2>${E(u.goal)}</h2>`);
 u.points.forEach(([en,jp],j)=>{const p=el('div','eng384phrase',`<p class="eng384english" lang="en">${E(en)}</p><p>${E(jp)}</p>`);p.append(audio(en));c.append(p)});
 c.append(el('p','eng384note',E(u.note)));root.append(c);
 const s=el('div','card eng384try',`<h3>🗣️ 自分でも言ってみよう</h3><p class="eng384english" lang="en">${E(u.say)}</p><p>${E(u.sayjp)}</p><p class="tiny">まず聞いて、まねします。発音の点数はつけません。</p>`);s.append(audio(u.say));
 s.append(button('🎙️ 話した英語を文字で確かめる（対応端末のみ）',()=>recognize(s),'soft'));root.append(s);
 const nav=el('div','eng384nav');if(i>0)nav.append(button('← 前の単元',()=>lesson(i-1)));if(i<UNITS.length-1)nav.append(button('次の単元 →',()=>lesson(i+1),'primary'));else nav.append(button('練習12問へ',()=>start('practice'),'primary'));root.append(nav);
}
function recognize(target){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;let msg=target.querySelector('.eng384recognition');if(!msg){msg=el('p','eng384recognition');target.append(msg)}
 if(!SR){msg.textContent='この端末では音声認識を利用できません。聞いて、声に出す練習だけでも大丈夫です。';return}
 msg.textContent='マイクで話した英語を確認します。音声認識は端末・ブラウザのサービスを利用する場合があります。';try{const r=new SR();r.lang='en-US';r.interimResults=false;r.maxAlternatives=1;r.onresult=e=>{msg.textContent='認識された言葉：'+(e.results?.[0]?.[0]?.transcript||'（認識できませんでした）')+'　※発音の採点ではありません。'};r.onerror=()=>{msg.textContent='認識できませんでした。音声機能を使わずに進めても大丈夫です。'};r.start();}catch(e){msg.textContent='この端末ではマイクを開始できませんでした。'}
}
function start(mode){const qs=mode==='test'?TEST:PRACTICE;st={mode,qs,i:0,answers:Array(qs.length).fill(null),reads:0,started:Date.now(),saved:false};question()}
function bar(){const s=st;return el('div','eng384progress',`<b>${s.i+1} / ${s.qs.length}</b><div><span style="width:${Math.round(s.i/s.qs.length*100)}%"></span></div>`)}
function question(){const s=st;if(!s)return enter();const q=s.qs[s.i];if(!q)return result();
 shell(`${s.mode==='test'?'📝 まとめテスト':'🌱 練習'} ${s.i+1}/${s.qs.length}`,enter);root.append(bar());
 const card=el('div','card eng384question',`<p class="tiny">${E(UNITS[q.unit].title)} ｜ ${E(q.kind)}</p><h2>${E(q.q)}</h2>`);
 if(q.src){if(q.kind==='聞く'){
  card.append(el('p','tiny','まず音声を聞いてみよう。必要なら英文を表示しても大丈夫です。'));
  card.append(audio(q.src));
  const script=el('p','eng384english eng384script',E(q.src));script.hidden=true;card.append(button('👀 英文を表示／隠す',()=>{script.hidden=!script.hidden}));card.append(script);
 }else{card.append(el('p','eng384source',`<span lang="en">${E(q.src)}</span>`));card.append(audio(q.src));}}
 card.append(el('h3','eng384prompt','答えを一つ選ぼう'));
 q.opts.forEach((opt,i)=>card.append(button(`${i+1}. ${opt}`,()=>choose(i),`eng384choice ${s.answers[s.i]===i?'eng384chosen':'soft'}`)));
 root.append(card);
 if(s.mode==='test'){
  root.append(el('p','tiny','※テスト中は正解を表示しません。選択後、次へ進みます。'));
  root.append(button('答えずに次へ進む',()=>next(null),'soft'));
 }else if(s.answers[s.i]!==null)showPracticeFeedback();
}
function choose(idx){if(!st)return;const s=st;const q=s.qs[s.i];if(s.mode==='test'){next(idx);return}
 if(s.answers[s.i]!==null)return;
 s.answers[s.i]=idx;question();}
function showPracticeFeedback(){const s=st,q=s.qs[s.i],right=s.answers[s.i]===q.ans;root.append(el('div',`card eng384feedback ${right?'eng384ok':'eng384review'}`,`<h3>${right?'✅ 正解！':'🌱 もう一度確認しよう'}</h3><p><b>答え：</b>${E(q.opts[q.ans])}</p><p>${E(q.why)}</p>`));root.append(button(s.i===s.qs.length-1?'結果を見る':'次の問題へ →',()=>{s.i++;if(s.i>=s.qs.length)result();else question()},'primary'))}
function next(answer){const s=st;if(!s)return; s.answers[s.i]=answer;s.i++;if(s.i>=s.qs.length)result();else question()}
function record(score,total,byUnit){const s=st;if(!s||s.saved)return;s.saved=true;
 try{if(typeof records==='undefined'||typeof profile==='undefined'||typeof save!=='function')return;
  records.push({studentId:profile.id,date:new Date().toISOString(),subject:'外国語',grade:6,unit:s.mode==='test'?'小学6年 英語全体 まとめテスト':'小学6年 英語 練習12問',content:s.mode==='test'?'8単元・20問（聞く・読む・表現）':'8単元の復習練習',correct:score,total,rate:Math.round(score/total*100),reads:s.reads,status:'学習結果を確認',details:byUnit,seconds:Math.round((Date.now()-s.started)/1000),listeningSupport:s.reads>0?'音声利用あり':'音声利用なし',pronunciationScored:false});save();
 }catch(e){/* 保存できない環境では結果の表示を優先 */}
}
function result(){const s=st;if(!s)return enter();const total=s.qs.length;const correct=s.answers.filter((v,i)=>v===s.qs[i].ans).length;const score=Math.round(correct/total*100);const grouped=UNITS.map((u,i)=>({unit:u.title,correct:s.qs.reduce((a,q,k)=>a+(q.unit===i&&s.answers[k]===q.ans?1:0),0),total:s.qs.filter(q=>q.unit===i).length}));
 shell(`${s.mode==='test'?'📝 テスト':'🌱 練習'}の結果`,enter);
 root.append(el('div','card eng384result',`<p class="tiny">${s.mode==='test'?'8単元の総まとめ':'12問の練習'}</p><h2>${correct} / ${total} 問　${score}点</h2><p>聞き直し：${s.reads}回（減点なし）</p><p>得点だけでなく、どの表現を使えるようになったか確認しましょう。</p>`));
 const summary=el('div','card eng384summary','<h3>単元別の結果</h3><p class="tiny">各単元の問題数は少ないため、苦手と断定せず、復習する場所の目安にしてください。</p>');
 grouped.filter(x=>x.total).forEach(g=>summary.append(el('div','eng384area',`<span>${E(g.unit)}</span><b>${g.correct} / ${g.total}</b>`)));
 root.append(summary);
 record(correct,total,grouped);
 root.append(button('📖 間違えた問題と解説を確認',review,'primary'));
 root.append(button('📚 8単元の復習に戻る',lessonMenu,'soft'));
 root.append(button('🔁 もう一度チャレンジ',()=>start(s.mode),'soft'));
}
function review(){const s=st;if(!s)return enter();shell('📖 答えと解説',result);const wrong=s.qs.map((q,i)=>({q,i,got:s.answers[i]})).filter(x=>x.got!==x.q.ans);if(!wrong.length)root.append(el('div','card eng384result','<h2>すべて正解でした！</h2><p>別の表現を使って言う練習もしてみよう。</p>'));
 wrong.forEach(({q,i,got})=>{const c=el('div','card eng384wrong',`<p class="tiny">${i+1}問目 ｜ ${E(UNITS[q.unit].title)}</p><h3>${E(q.q)}</h3>${q.src?`<p class="eng384source" lang="en">${E(q.src)}</p>`:''}<p>あなたの答え：${got===null?'未回答':E(q.opts[got])}</p><p><b>正解：${E(q.opts[q.ans])}</b></p><p>${E(q.why)}</p>`);if(q.src)c.append(audio(q.src));c.append(button('この単元を学び直す',()=>lesson(q.unit),'soft'));root.append(c)});
 root.append(button('結果画面へ戻る',result,'primary'));
}
function ensureEntry(){const h=root.querySelector('.top h1');if(!h||!/^(?:外国語|英語)\s*[｜|]\s*小学6年$/.test((h.textContent||'').trim()))return;if(root.querySelector('[data-pono384-entry]'))return;
 const first=root.querySelector('.unit-pick');if(!first)return;const card=el('div','card eng384entry','<h3>🌍 小学6年 英語の総まとめ</h3><p>8単元の復習・聞く・読む・使う20問テストを確認できます。</p>');card.dataset.pono384Entry='1';card.append(button('📚 英語全体のまとめを開く',enter,'primary'));first.insertAdjacentElement('beforebegin',card);
}
let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;ensureEntry();});}).observe(root,{subtree:true,childList:true});ensureEntry();
})();
