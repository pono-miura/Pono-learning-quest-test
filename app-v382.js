/* Pono Learning Quest v38.2 — 小学6年 国語：資料を比べて考え、根拠を使う */
(function(){
'use strict';
const CASES=[{"id":"図書室","title":"図書室の席をどう使う？","intro":"図書委員会が、同じ40人に座席の使い方について調べました。以下は練習用に作った架空の資料です。","sources":[{"title":"資料A｜図書室でしてみたいこと（40人・1人1回答）","headers":["したいこと","人数"],"rows":[["静かな場所で本を読む","18人"],["友だちと調べ学習をする","12人"],["どちらもしたい","10人"]]},{"title":"資料B｜「静かに読めた」と答えた人（同じ40人）","headers":["調べた時期","人数"],"rows":[["席を分ける前","14人"],["席を分けた後","27人"]]}],"learn":[["最初に表題と人数を見る","資料Aは40人のうち「どんな使い方をしたいか」を、資料Bは同じ40人の「静かに読めた」という回答数を調べています。問いが違うことに注意します。"],["数字を比べて、事実を書く","資料Bでは「静かに読めた」が14人から27人に増え、13人多くなりました。人数を根拠にして説明できます。"],["言い切れないことも確かめる","資料Bだけでは、席の分け方だけが変化の原因とまでは断定できません。「全員が満足」とも言えません。"]],"questions":[{"type":"choice","focus":"資料の事実","q":"資料Aで、いちばん人数が多い使い方はどれですか。","options":["友だちと調べ学習をする","どちらもしたい","静かな場所で本を読む"],"answer":2,"ex":"資料Aでは18人が「静かな場所で本を読む」を選びました。12人・10人より多いです。"},{"type":"choice","focus":"数値の比較","q":"資料Bの「静かに読めた」人は、席を分けた後に何人増えましたか。","options":["13人","27人","14人"],"answer":0,"ex":"席を分けた後27人 − 前14人 ＝ 13人です。"},{"type":"choice","focus":"資料の違い","q":"資料Aと資料Bについて、正しい説明はどれですか。","options":["資料Aも資料Bも、貸し出した本の冊数を調べている","資料Aは図書室の温度、資料Bは座席の数を調べている","資料Aは希望する使い方、資料Bは読めたと答えた人数を調べている"],"answer":2,"ex":"資料Aは希望、資料Bは利用時の回答を示しています。何を調べたか、表題に注目しましょう。"},{"type":"choice","focus":"言い切れないこと","q":"「図書室を使った40人全員が、席を分けた後で満足した」と言い切れない理由はどれですか。","options":["資料Bは「静かに読めた」人数を示すだけで、全員の満足度は調べていないから","図書室は本を置く場所だから","資料Aに12人という数があるから"],"answer":0,"ex":"資料Bは特定の質問の回答で、満足度の調査ではありません。人数も27人で40人全員ではありません。"},{"type":"write","focus":"根拠を使って提案","q":"資料A・Bから分かることを使い、図書室の席について提案を一文か二文で書きましょう。","example":"静かな読書席と話し合い用の席を分ける方法を続けたいです。資料Aでは静かに読みたい人が18人いて、資料Bでは静かに読めた人が14人から27人に増えたからです。ただし、席を分けたことだけが原因とはまだ言い切れません。","guide":"「資料Aでは〇人」「資料Bでは〇人」のどちらかを入れると根拠が伝わります。"}]},{"id":"川の調査","title":"川のごみを調べて提案しよう","intro":"六年生が、同じ長さ100mの区間を3か所で調べました。次の数字は架空の練習資料です。","sources":[{"title":"資料C｜川で見つけたごみの個数","headers":["調べた場所","1回目","2回目"],"rows":[["上流","6個","5個"],["中流","14個","15個"],["下流","9個","11個"]]},{"title":"資料D｜清掃参加者30人に聞いた「また参加したい？」","headers":["答え","人数"],"rows":[["参加したい","22人"],["まだ分からない","6人"],["参加したくない","2人"]]}],"learn":[["条件と数字を読む","資料Cは3か所とも同じ100mの長さで調べています。1回目も2回目も、最も多く見つかったのは中流です。"],["資料ごとに調査対象を確認する","資料Dは「清掃に参加した30人」の意見です。町の人全員に聞いた結果ではありません。"],["次の調査を考える","中流にごみが多かった理由は、この2回の個数だけでは分かりません。天気や人通りも含め、条件をそろえて調べましょう。"]],"questions":[{"type":"choice","focus":"表の読み取り","q":"資料Cで、1回目も2回目もごみが最も多かった場所はどこですか。","options":["上流","中流","下流"],"answer":1,"ex":"中流は1回目14個・2回目15個で、どちらも3か所の中で最も多いです。"},{"type":"choice","focus":"数値の比較","q":"資料Cの中流では、2回目は1回目より何個多かったですか。","options":["29個","1個","15個"],"answer":1,"ex":"2回目15個 − 1回目14個 ＝ 1個多いです。"},{"type":"choice","focus":"資料の対象","q":"資料Dから確かに言えることはどれですか。","options":["町の人すべてが清掃に参加したい","調査した清掃参加者30人のうち22人が、また参加したいと答えた","清掃に参加したことがない人は、全員参加したくない"],"answer":1,"ex":"資料Dは参加者30人への質問です。町全体の意見ではありません。"},{"type":"choice","focus":"推測と事実","q":"「中流にごみが多いのは、人通りが多いからだ」と断定する前に必要なことは何でしょう。","options":["ごみが多い日だけ残して記録する","理由は確かめず決める","人通りなども調べて、今回の記録と比べる"],"answer":2,"ex":"ごみの数だけでは原因を断定できません。人通りや天気なども調べる必要があります。"},{"type":"write","focus":"複数資料から提案","q":"資料C・Dを使って、次の清掃活動について提案を一文か二文で書きましょう。","example":"次は中流を中心に清掃し、もう一度ごみの数を調べたいです。資料Cでは中流が2回とも最も多く、資料Dでは参加者30人のうち22人がまた参加したいと答えたからです。ただし、町全員の意見とまでは言えません。","guide":"「どの場所で何個」「参加者のうち何人」など、資料の数字を使ってみましょう。"}]}];
const root=document.getElementById('app');if(!root)return;
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function el(tag,cls,html){const x=document.createElement(tag);if(cls)x.className=cls;if(html!==undefined)x.innerHTML=html;return x;}
function button(text,callback,kind='soft'){const b=document.createElement('button');b.type='button';b.className=kind;b.textContent=text;b.addEventListener('click',callback);return b;}
let state=null;
function screen(title,back){root.replaceChildren();const top=el('div','top');top.append(button('← 戻る',back,'back'),el('h1','jap382heading',esc(title)));root.append(top);try{window.scrollTo(0,0)}catch(e){}}
function meter(i,total){return el('div','jap382meter',`<b>${i} / ${total}</b><div><span style="width:${Math.round(100*i/total)}%"></span></div>`);}
function speak(text,slow){try{const api=window.speechSynthesis;if(!api||!window.SpeechSynthesisUtterance)return false;api.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='ja-JP';u.rate=slow?.62:.88;api.speak(u);if(state)state.reads=(state.reads||0)+1;return true;}catch(e){return false}}
function audio(text){const r=el('div','jap382audio');r.append(button('🔊 読み上げ',()=>{if(!speak(text,false))alert('この端末では読み上げが使えません。')}));r.append(button('🐢 ゆっくり',()=>{if(!speak(text,true))alert('この端末では読み上げが使えません。')}));return r;}
function sources(item){const wrap=el('div','jap382sources');item.sources.forEach(src=>{
 const box=el('section','card jap382source');box.append(el('h3','',esc(src.title)));
 const holder=el('div','jap382tablewrap');const table=el('table','jap382table');const thead=document.createElement('thead');const hr=document.createElement('tr');src.headers.forEach(t=>{const th=document.createElement('th');th.textContent=t;hr.append(th)});thead.append(hr);table.append(thead);
 const body=document.createElement('tbody');src.rows.forEach(row=>{const tr=document.createElement('tr');row.forEach((x,i)=>{const td=document.createElement(i?'td':'th');td.textContent=x;if(i===0)td.scope='row';tr.append(td)});body.append(tr)});table.append(body);holder.append(table);box.append(holder);wrap.append(box);
 });return wrap;}
function menu(){state=null;screen('国語｜小学6年 資料を比べて考える',()=>subjectGradeTerms('国語',6));
 root.append(el('div','card jap382intro','<p class="tiny">国語・資料活用ステップアップ</p><h2>資料を比べて、根拠のある意見を伝えよう</h2><p>数字を読む → 調べた人数を確かめる → 言えることと推測を分ける → 自分の考えを説明する。</p><p class="tiny">資料はすべて練習のために作った架空のものです。</p>'));
 CASES.forEach((c,i)=>root.append(button(`📊 ${i+1}. ${c.title}（5問）`,()=>learnStart(i),'primary')));
 root.append(button('🌱 2つの題材を続けて10問',()=>startQuestions('all'),'soft'));
}
function learnStart(idx){state={kind:'learn',idx,chapter:0,reads:0};showLearn();}
function showLearn(){const s=state,c=CASES[s.idx],p=c.learn[s.chapter];screen(`${c.id}｜学ぶ`,menu);root.append(meter(s.chapter+1,c.learn.length));
 root.append(el('div','card jap382intro',`<h2>${esc(c.title)}</h2><p>${esc(c.intro)}</p>`));root.append(sources(c));
 root.append(el('div','card jap382learn',`<p class="tiny">学ぶ ${s.chapter+1} / ${c.learn.length}</p><h3>${esc(p[0])}</h3><p>${esc(p[1])}</p>`));root.append(audio(p[1]));
 if(s.chapter>0)root.append(button('← 前の説明',()=>{s.chapter--;showLearn()}));
 root.append(button(s.chapter<c.learn.length-1?'次の説明へ →':'この資料で5問練習する →',()=>{if(s.chapter<c.learn.length-1){s.chapter++;showLearn()}else startQuestions(s.idx,s.reads)},'primary'));
}
function startQuestions(which,reads=0){const qs=CASES.flatMap((c,ci)=>((which==='all'||which===ci)?c.questions.map((q,qi)=>({c,ci,q,qi})):[]));
 state={kind:'questions',which,qs,i:0,reads,first:0,choices:0,wrong:0,helps:0,answers:[],selfChecks:[],written:[],saved:false,tryCount:0,firstFailed:false};showQ();}
function showQ(){const s=state;if(!s||s.kind!=='questions')return;const x=s.qs[s.i];if(!x){results();return}const {c,q}=x;
 screen(`${c.id}｜${s.i+1} / ${s.qs.length}問`,menu);root.append(meter(s.i+1,s.qs.length));
 root.append(el('div','card jap382prompt',`<p class="tiny">${esc(q.focus)}｜${q.type==='write'?'短い記述（自動採点なし）':'選択問題'}</p><h2>${esc(q.q)}</h2>`));root.append(sources(c));
 root.append(audio(c.intro+'。'+c.sources.map(x=>x.title+'。'+x.rows.map(row=>row.join('、')).join('。')).join('。')));
 if(q.type==='choice'){
   q.options.forEach((opt,j)=>root.append(button(`${j+1}. ${opt}`,()=>answerChoice(j),'soft jap382choice')));
   root.append(button('💡 どこを見るかヒント',()=>{s.helps++;const h=el('div','card jap382help',`<p>まず表の題名と人数を確かめましょう。${esc(q.focus)}に注目してみよう。</p>`);root.append(h)},'soft'));
 }else{
   const box=el('div','card jap382write','<p>短い文でも大丈夫。声で入力してもかまいません。</p>');const ta=document.createElement('textarea');ta.rows=4;ta.placeholder='ここに考えを書こう';ta.setAttribute('aria-label','自分の考え');box.append(ta);const msg=el('p','tiny','');box.append(button('🎤 音声で入力',()=>voice(ta,msg)));
   box.append(button('書いた内容を例文と比べる',()=>{const ans=ta.value.trim();if(!ans){msg.textContent='一文だけでも入力してみよう。難しいときは「例文を見る」を選べます。';return}submitWriting(ans)},'primary'));
   box.append(button('例文を見て確認する',()=>submitWriting(''),'soft'));root.append(box);
 }
}
function voice(ta,msg){const API=window.SpeechRecognition||window.webkitSpeechRecognition;if(!API){msg.textContent='この端末では音声入力を利用できません。キーボード入力か「例文を見る」を使ってください。';return;}try{const rec=new API();rec.lang='ja-JP';rec.interimResults=false;rec.maxAlternatives=1;rec.onresult=ev=>{ta.value+=(ta.value?' ':'')+ev.results[0][0].transcript;msg.textContent='声の文字変換は間違うことがあります。確認してから進みましょう。'};rec.onerror=()=>{msg.textContent='音声入力できませんでした。文字入力も使えます。'};rec.start();}catch(e){msg.textContent='音声入力を開始できませんでした。';}}
function answerChoice(index){const s=state,x=s.qs[s.i],q=x.q;if(s.tryCount===0){s.choices++;if(index===q.answer)s.first++;else s.firstFailed=true;}s.tryCount++;const ok=index===q.answer;if(!ok)s.wrong++;
 screen(ok?'○ 根拠を確認できたね':'🔎 ここを確かめよう',()=>showQ());root.append(el('div',`card jap382feedback ${ok?'good':'warn'}`,`<h2>${ok?'正解です':'答えを確かめよう'}</h2><p><b>正解：</b>${esc(q.options[q.answer])}</p><p>${esc(q.ex)}</p>`));
 root.append(button('次の問題へ →',()=>{s.answers[s.i]={question:q.q,correct:q.options[q.answer],selected:q.options[index],ok,firstTry:!s.firstFailed&&s.tryCount===1};s.i++;s.tryCount=0;s.firstFailed=false;showQ()},'primary'));
 if(!ok)root.append(button('もう一度考える',showQ,'soft'));
}
function submitWriting(ans){const s=state,x=s.qs[s.i],q=x.q;s.written[s.i]=ans;s.answers[s.i]={question:q.q,writing:ans,graded:false};
 screen('✍️ 資料を使った説明を振り返ろう',()=>showQ());root.append(el('div','card jap382feedback',`<h2>自分の説明を確かめよう</h2><p><b>自分の考え：</b>${esc(ans||'（今回は例文を確認しました）')}</p><p><b>説明の例：</b>${esc(q.example)}</p><p class="tiny">${esc(q.guide)}</p>`));
 root.append(el('div','card jap382check','<h3>書いた説明を見直そう</h3><p>1. 資料の数字や事実が入っている？</p><p>2. それを根拠に、自分の考えが書けている？</p><p>3. 分からないことまで言い切っていない？</p>'));
 [['自分の言葉で説明できた','自分で考えた'],['例文を見て分かった','例文を参考'],['もう一度練習したい','再練習したい']].forEach(([label,val])=>root.append(button(label,()=>{s.selfChecks[s.i]=val;s.i++;showQ()},'soft jap382choice')));
}
function results(){const s=state;if(!s||s.kind!=='questions')return;screen('📊 資料を比べる学習・結果',menu);
 const choiceTotal=s.qs.filter(x=>x.q.type==='choice').length;const written=s.qs.filter((x,i)=>x.q.type==='write'&&(s.written[i]||'').trim()).length;
 root.append(el('div','card jap382result',`<h2>初回で資料を読み取れた数</h2><strong>${s.first} / ${choiceTotal}問</strong><p>自分の考えを書いた問題：${written} / ${s.qs.length-choiceTotal}問</p><p>読み上げ：${s.reads}回（得点には影響しません）</p><p class="tiny">この正答数は選択問題のみです。記述の内容には自動で点数を付けていません。</p>`));
 root.append(el('div','card jap382summary','<h3>次にできること</h3><p>資料から分かることを見つけ、数字を根拠に自分の考えを説明する練習をしました。人数や調査条件を確かめ、言い切れないことも意識してみましょう。</p>'));
 root.append(button('📖 自分の答え・解説を振り返る',review,'primary'));
 root.append(button('同じ内容をもう一度練習する',()=>startQuestions(s.which),'soft'));
 root.append(button('資料を選ぶ画面へ',menu,'soft'));
 if(!s.saved){s.saved=true;try{if(typeof records!=='undefined'&&typeof profile!=='undefined'&&typeof save==='function'){
  records.push({studentId:profile.id,date:new Date().toISOString(),subject:'国語',grade:6,unit:'複数資料の比較と根拠のある説明',content:`資料${s.which==='all'?'A〜D':s.which===0?'A・B':'C・D'}の読み取りと記述 ${s.qs.length}問`,correct:s.first,total:choiceTotal,rate:Math.round(s.first/choiceTotal*100),firstTryCorrect:s.first,reads:s.reads,hints:s.helps,writtenCount:written,writingAssessment:'自動採点なし',status:`選択問題の初回正解 ${s.first}/${choiceTotal}・記述${written}問`,responses:s.answers.map((x,i)=>({question:x?.question||'',correct:x?.correct||'',selected:x?.selected||'',writing:x?.writing||'',selfCheck:s.selfChecks[i]||'',graded:x?.graded!==false}))});save();
 }}catch(e){}}
}
function review(){const s=state;if(!s||s.kind!=='questions')return;screen('📖 解説・自分の考え',results);s.qs.forEach((x,i)=>{const q=x.q,a=s.answers[i]||{};root.append(el('div','card jap382review',`<p class="tiny">${i+1}/${s.qs.length}｜${esc(x.c.id)}｜${esc(q.focus)}</p><h3>${esc(q.q)}</h3><p><b>答え・根拠：</b>${esc(q.type==='choice'?q.options[q.answer]:q.example)}</p>${q.type==='choice'?`<p>${esc(q.ex)}</p>`:`<p><b>自分の考え：</b>${esc(a.writing||'（例文を見て確認しました）')}</p><p class="tiny">振り返り：${esc(s.selfChecks[i]||'')}</p>`}`));});root.append(button('結果へ戻る',results,'primary'))}
function ensureEntry(){const h=root.querySelector('.top h1');if(!h||!/^国語\s*[｜|]\s*小学6年\s*全体の総復習$/.test((h.textContent||'').trim()))return;if(root.querySelector('[data-pono382-entry]'))return;
 const anchor=root.querySelector('.jap381entry')||root.querySelector('.jap379hero');if(!anchor)return;
 const card=el('div','card jap382entry','<h3>📊 複数資料を比べて考える</h3><p>数字や文章を比べ、資料から言えることを根拠に説明しよう。2つの題材・合計10問。</p>');card.dataset.pono382Entry='1';card.append(button('📖 資料を比べる練習を開く',menu,'primary'));anchor.insertAdjacentElement('afterend',card);
}
let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;ensureEntry()})}).observe(root,{subtree:true,childList:true});ensureEntry();
})();
