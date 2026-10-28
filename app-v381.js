/* Pono Learning Quest v38.1 — 国語6年：本文の根拠から短く説明する */
(function(){
'use strict';
const TEXTS=[{"id":"説明文","title":"公園のベンチを調べる","kind":"説明文（Ponoオリジナル）","paras":["夏のある日、町の公園を訪れた人から「ベンチが熱くて座れない」という声がありました。六年生の調査班は、木陰なら座りやすいのではないかと考えました。しかし、感じ方だけでは確かめられません。","調査班は同じ日の午後二時に、日なたと木陰のベンチの表面温度を同じ温度計で測りました。日なたは41度、木陰は31度でした。測定は安全に気をつけ、大人と一緒に行いました。","調査班は、木陰をつくる工夫を町に提案しました。ただし、日によって雲や風の強さが異なるため、今回の結果だけで、いつも同じ差になるとは言えません。これからも条件をそろえて調べる必要があります。"],"questions":[{"q":"調査班が「同じ時刻・同じ温度計」で測った理由を、本文の根拠を使って説明しましょう。","choices":["六年生の調査班は、木陰なら座りやすいのではないかと考えました。","同じ日の午後二時に、日なたと木陰のベンチの表面温度を同じ温度計で測りました。","これからも条件をそろえて調べる必要があります。"],"correct":1,"hint":"測り方について、二つの場所で何を同じにしたかを探そう。","example":"時間と温度計をそろえれば、日なたと木陰の表面温度を同じ条件で比べられるからです。","focus":"比べ方が公平かどうか"},{"q":"木陰のベンチの方が座りやすそうだと考えた根拠を説明しましょう。","choices":["日なたは41度、木陰は31度でした。","「ベンチが熱くて座れない」という声がありました。","木陰をつくる工夫を町に提案しました。"],"correct":0,"hint":"調べて分かった「数値」を見つけてみよう。","example":"同じときに測ると木陰のベンチは31度で、日なたの41度より10度低かったからです。","focus":"数値を使った説明"},{"q":"この調査だけで「木陰はいつでも10度低い」と言い切れないのはなぜでしょう。","choices":["測定は安全に気をつけ、大人と一緒に行いました。","夏のある日、町の公園を訪れた人から「ベンチが熱くて座れない」という声がありました。","日によって雲や風の強さが異なるため、今回の結果だけで、いつも同じ差になるとは言えません。"],"correct":2,"hint":"最後の段落で「今回だけでは分からないこと」を探そう。","example":"日によって雲や風などの条件が変わり、今回の一度の測定だけでは毎日の差は分からないからです。","focus":"事実と推測の違い"}]},{"id":"物語文","title":"地図の続きを描く","kind":"物語文（Ponoオリジナル）","paras":["校外学習のあと、班で歩いた道を地図にまとめることになりました。れなは途中から道順を思い出せなくなり、「わたしのせいで完成しないかもしれない」と思って、鉛筆を置きました。","同じ班ののぞみは地図を取り上げずに、「覚えている場所を、一つずつ教えてくれる？」と声をかけました。れなは橋を渡ったことを話し、別の友だちは公園の場所を思い出しました。みんなで話すうちに、地図に書けることが増えていきました。","地図にはまだ分からない道がありましたが、班は先生に確認し、直して完成させました。れなはできあがった地図を見て、「全部思い出せなくても、聞いたり確かめたりできるんだね」と言いました。翌日、れなは自分から班の発表を手伝いました。"],"questions":[{"q":"はじめに、れなが鉛筆を置いたのはなぜだと考えられますか。","choices":["地図にはまだ分からない道がありましたが","「わたしのせいで完成しないかもしれない」と思って、鉛筆を置きました。","翌日、れなは自分から班の発表を手伝いました。"],"correct":1,"hint":"最初の段落の、れなの心の中の言葉を探そう。","example":"道順を思い出せない自分が、班のみんなの作業を止めてしまうと心配したからです。","focus":"人物の不安の理由"},{"q":"のぞみの声かけが、れなの行動を変えるきっかけになったのはなぜでしょう。","choices":["同じ班ののぞみは地図を取り上げずに、「覚えている場所を、一つずつ教えてくれる？」と声をかけました。","班は先生に確認し、直して完成させました。","翌日、れなは自分から班の発表を手伝いました。"],"correct":0,"hint":"のぞみが代わりに全部やったのか、一緒に考えられるようにしたのかを探そう。","example":"のぞみは代わりに地図を描くのではなく、覚えていることから話せるように声をかけたので、れなも参加しやすくなったからです。","focus":"行動の変化のきっかけ"},{"q":"物語の終わりのれなは、はじめと比べてどう変わりましたか。","choices":["れなは途中から道順を思い出せなくなり","別の友だちは公園の場所を思い出しました。","「全部思い出せなくても、聞いたり確かめたりできるんだね」と言いました。翌日、れなは自分から班の発表を手伝いました。"],"correct":2,"hint":"最後の段落にある、れなの言葉と行動の両方に注目しよう。","example":"はじめは自分だけで思い出せず不安だったけれど、みんなに聞いて確かめながら進められると分かり、自分から発表も手伝うようになりました。","focus":"前後の変化を比べる"}]}];
const root=document.getElementById('app');if(!root)return;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const el=(tag,cls,html)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(html!==undefined)n.innerHTML=html;return n;};
const btn=(label,fn,cls='soft')=>{const n=document.createElement('button');n.type='button';n.className=cls;n.textContent=label;n.addEventListener('click',fn);return n;};
let st=null;
function header(title,back){root.replaceChildren();const top=el('div','top');top.append(btn('← 戻る',back,'back'),el('h1','jap381title',esc(title)));root.append(top);try{window.scrollTo(0,0);}catch(e){}}
function passage(txt,hilite=''){
 const wrap=el('div','jap381passage');txt.paras.forEach((p,i)=>{
  const mark=hilite&&p.includes(hilite);const body=mark?esc(p).replace(esc(hilite),'<mark class="jap381mark">'+esc(hilite)+'</mark>'):esc(p);
  wrap.append(el('section','jap381para',`<span class="jap381number">${i+1}</span><p>${body}</p>`));
 });return wrap;
}
function say(text,slow){try{const api=window.speechSynthesis;if(!api||!window.SpeechSynthesisUtterance)return false;api.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='ja-JP';u.rate=slow?.65:.89;api.speak(u);if(st)st.reads++;return true;}catch(e){return false;}}
function audio(text){const row=el('div','jap381audio');row.append(btn('🔊 読み上げ',()=>{if(!say(text,false))alert('この端末では読み上げが使えません。');}));row.append(btn('🐢 ゆっくり',()=>{if(!say(text,true))alert('この端末では読み上げが使えません。');}));return row;}
function meter(i,total){return el('div','jap381meter',`<b>${i} / ${total}</b><div><span style="width:${Math.round(i/total*100)}%"></span></div>`);}
function menu(){st=null;header('国語｜小学6年 根拠から説明する',()=>subjectGradeTerms('国語',6));root.append(el('div','card jap381intro','<p class="tiny">国語・読解ステップアップ</p><h2>「どこに書いてある？」から「だから、こう考える」へ</h2><p>本文の根拠を選び、自分の言葉で短く説明します。読み上げや声での入力を使っても大丈夫です。</p>'));
 root.append(el('div','card jap381steps','<h3>学習の3ステップ</h3><p>① 本文を読む　→　② 根拠を選ぶ　→　③ 根拠を使って説明する</p><p class="tiny">書く部分の正誤は自動採点せず、例文と比べて自分で振り返ります。</p>'));
 TEXTS.forEach(t=>root.append(btn(`📖 ${t.id}「${t.title}」を読む（3問）`,()=>readStart(t.id),'primary')));
 root.append(btn('🌱 2つの文章を続けて6問',()=>practiceStart('all'),'soft'));
}
function readStart(id){st={mode:'read',id,part:0,reads:0};readPage();}
function readPage(){const t=TEXTS.find(x=>x.id===st.id);if(!t)return menu();header(`📖 ${t.id}｜${st.part+1}/${t.paras.length}段落`,menu);
 root.append(el('div','card jap381intro',`<h2>${esc(t.title)}</h2><p>一段落ずつ読めます。自分のペースで進めましょう。</p>`));
 const area=el('div','jap381passage');area.append(el('section','jap381para',`<span class="jap381number">${st.part+1}</span><p>${esc(t.paras[st.part])}</p>`));root.append(area,audio(t.paras[st.part]));
 if(st.part>0)root.append(btn('← 前の段落',()=>{st.part--;readPage();}));
 root.append(btn(st.part<t.paras.length-1?'次の段落へ →':'🔎 根拠を使って説明する3問へ',()=>{if(st.part<t.paras.length-1){st.part++;readPage();}else practiceStart(st.id,st.reads);},'primary'));
}
function practiceStart(id,reads=0){const qs=TEXTS.filter(t=>id==='all'||t.id===id).flatMap(t=>t.questions.map((q,n)=>({t,q,n})));
 st={mode:'practice',id,qs,i:0,attempts:0,reads,first:0,seenWrong:new Set(),hints:0,written:[],selections:[],reflections:[],draft:'',tried:0,saved:false};question();}
function current(){return st?.qs?.[st.i];}
function question(){const s=st;if(!s||s.mode!=='practice')return;const x=current();if(!x)return results();
 const {t,q}=x;header(`🔎 根拠を選ぼう ${s.i+1}/${s.qs.length}`,menu);root.append(meter(s.i+1,s.qs.length));
 root.append(el('div','card jap381prompt',`<p class="tiny">${esc(t.id)} ｜ ${esc(q.focus)}</p><h2>${esc(q.q)}</h2><p>次の3つから、この問いの説明に役立つ本文の一部分を選ぼう。</p>`));
 root.append(passage(t));root.append(audio(t.paras.join('。')));
 root.append(el('h3','jap381sub','答えの根拠はどれ？'));
 q.choices.forEach((opt,i)=>root.append(btn(`${i+1}. ${opt}`,()=>choose(i),'soft jap381choice')));
 if(s.tried)root.append(el('div','card jap381hint','もう一度、本文と選択肢を見比べてみましょう。'));
}
function choose(pick){const s=st,x=current();if(!x)return;const {q}=x;s.attempts++;
 if(s.tried===0){if(pick===q.correct)s.first++;else s.seenWrong.add(s.i);}
 s.tried++;if(pick===q.correct){s.selections[s.i]={correct:pick,assisted:false};write();return;}
 s.hints++;header('🌱 根拠をもう一度探そう',question);
 root.append(el('div','card jap381hint',`<h2>ここを確認しよう</h2><p>${esc(q.hint)}</p><p>本文を見直して、自分で選び直してみよう。</p>`));
 root.append(btn('🔎 本文に戻って選ぶ',question,'primary'));
 root.append(btn('根拠を見て次へ進む',()=>{s.selections[s.i]={correct:q.correct,assisted:true};write();}));
}
function mic(area,status){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){status.textContent='このブラウザでは音声入力に対応していません。キーボード入力は使えます。';return;}
 try{const rec=new SR();rec.lang='ja-JP';rec.interimResults=false;rec.maxAlternatives=1;status.textContent='マイクの利用を許可すると、話した言葉が入力されます。';rec.onresult=ev=>{const v=ev.results?.[0]?.[0]?.transcript||'';area.value=(area.value?area.value+' ':'')+v;if(st)st.draft=area.value;status.textContent='入力できました。必要なら直せます。';};rec.onerror=()=>{status.textContent='音声入力を利用できませんでした。文字で入力できます。';};rec.start();}catch(e){status.textContent='音声入力を開始できませんでした。';}}
function write(){const s=st,x=current();if(!x)return;const {t,q}=x;header(`✍️ 根拠から説明する ${s.i+1}/${s.qs.length}`,question);root.append(meter(s.i+1,s.qs.length));
 root.append(el('div','card jap381prompt',`<p class="tiny">${esc(t.id)} ｜ ${esc(q.focus)}</p><h2>${esc(q.q)}</h2><p>選んだ根拠を使って、短い文で説明してみよう。</p>`));
 root.append(el('div','card jap381evidence',`<b>📌 根拠</b><p>${esc(q.choices[q.correct])}</p>`));
 root.append(btn('🔎 根拠がある段落を見直す',()=>{const cards=passage(t,q.choices[q.correct]);const prior=root.querySelector('.jap381passage');if(prior)prior.remove();root.querySelector('.jap381evidence').insertAdjacentElement('afterend',cards);},'soft'));
 root.append(el('div','card jap381writing','<h3>自分の言葉で説明しよう</h3><p class="tiny">「なぜなら〜からです」「〜ということから、〜と考えました」など、短い文でも大丈夫。</p>'));
 const card=root.querySelector('.jap381writing');const input=document.createElement('textarea');input.className='jap381input';input.rows=4;input.placeholder='ここに自分の説明を書こう（短い文でOK）';input.setAttribute('aria-label','自分の説明');input.value=s.draft;input.addEventListener('input',()=>s.draft=input.value);card.append(input);
 const notice=el('p','tiny jap381status','');card.append(btn('🎤 声で答える',()=>mic(input,notice)));card.append(notice);
 card.append(btn('書いた説明と例文を比べる',()=>{if(!input.value.trim()){notice.textContent='説明を一言でも書くか、下の「例文から学ぶ」を選んでね。';return;}s.written[s.i]=input.value.trim();example(false);},'primary'));
 card.append(btn('まだ書けないので、例文から学ぶ',()=>{s.written[s.i]='';example(true);}));
 root.append(el('p','tiny jap381note','※ 記述文の正誤は自動採点しません。先生や保護者と一緒に内容を確かめることもできます。'));
}
function example(skipped){const s=st,x=current();if(!x)return;const {t,q}=x;header('📖 根拠と説明を見比べよう',menu);root.append(el('div','card jap381example',`<p class="tiny">${esc(t.id)} ｜ ${esc(q.focus)}</p><h2>${esc(q.q)}</h2><h3>📌 本文の根拠</h3><p>${esc(q.choices[q.correct])}</p><h3>💡 説明の例（正解の一例）</h3><p>${esc(q.example)}</p>${skipped?'<p class="tiny">例を読んで考え方をつかむことも大切です。</p>':`<h3>✍️ あなたの説明</h3><p>${esc(s.written[s.i]||'')}</p>`}`));
 root.append(passage(t,q.choices[q.correct]));root.append(el('div','card jap381reflect','<h3>振り返り</h3><p>いちばん近いものを選ぼう。正しい・間違いの採点ではありません。</p>'));
 [['自分の言葉で説明できた','できた'],['例文を読んで分かった','例を見た'],['もう一度練習したい','練習したい']].forEach(([label,v])=>root.append(btn(label,()=>{s.reflections[s.i]=v;s.i++;s.tried=0;s.draft='';if(s.i<s.qs.length)question();else results();},v==='できた'?'primary':'soft')));
}
function results(){const s=st;if(!s||s.mode!=='practice')return;header('📊 根拠を使った説明・学習結果',menu);const total=s.qs.length,done=s.written.filter(x=>String(x||'').trim()).length;
 root.append(el('div','card jap381results',`<h2>初回で根拠を選べた数</h2><strong>${s.first} / ${total} 問</strong><p>自分の言葉で書いた説明：${done} / ${total} 問</p><p>本文の読み上げ：${s.reads} 回（減点なし）</p><p>説明を聞いたり例文を使ったりしたことも、大切な学習です。</p><p class="tiny">※ この数字は根拠の選択結果です。記述の内容は自動採点していません。</p>`));
 root.append(el('div','card jap381summary','<h3>次につなげよう</h3><p>本文の根拠を確かめてから、自分の考えを一文で伝える練習ができました。必要なところから読み直せます。</p>'));
 root.append(btn('📖 書いた説明・例文を見直す',review,'primary'));
 root.append(btn('同じ文章でもう一度練習する',()=>practiceStart(s.id)));
 root.append(btn('文章を選ぶ画面へ戻る',menu));
 if(!s.saved){s.saved=true;try{if(typeof records!=='undefined'&&typeof profile!=='undefined'&&typeof save==='function'){
  const data={studentId:profile.id,date:new Date().toISOString(),subject:'国語',grade:6,unit:'本文の根拠を使って説明する',content:`説明文・物語文の根拠選択と短い記述 ${total}問`,correct:s.first,total,rate:Math.round(s.first/total*100),status:`根拠の初回選択 ${s.first}/${total}（記述は未採点）`,firstTryCorrect:s.first,reads:s.reads,retries:s.attempts-total,hints:s.hints,writtenCount:done,readingSupport:s.reads>0?'読み上げ利用':'読み上げ未利用',writingAssessment:'自動採点なし',responses:s.qs.map((x,i)=>({question:x.q.q,writing:s.written[i]||'',reflection:s.reflections[i]||'',assisted:!!s.selections[i]?.assisted}))};
  records.push(data);save();
 }}catch(e){}}
}
function review(){if(!st||st.mode!=='practice')return;const s=st;header('📖 自分の説明を振り返ろう',results);s.qs.forEach((x,i)=>root.append(el('div','card jap381review',`<p class="tiny">${i+1} / ${s.qs.length} ｜ ${esc(x.t.id)}</p><h3>${esc(x.q.q)}</h3><p><b>根拠：</b>${esc(x.q.choices[x.q.correct])}</p><p><b>あなたの説明：</b>${esc(s.written[i]||'（例文で確認しました）')}</p><p><b>説明の例：</b>${esc(x.q.example)}</p><p class="tiny">振り返り：${esc(s.reflections[i]||'')}</p>`)));
 root.append(btn('学習結果へ戻る',results,'primary'));
}
function ensureEntry(){const h=root.querySelector('.top h1');if(!h||!/^国語\s*[｜|]\s*小学6年\s*全体の総復習$/.test(h.textContent.trim()))return;if(root.querySelector('[data-pono381-entry]'))return;
 const anchor=root.querySelector('.jap380entry')||root.querySelector('.jap379hero');if(!anchor)return;const card=el('div','card jap381entry','<h3>✍️ 本文の根拠を使って説明する</h3><p>「根拠を選ぶ」から「自分の言葉で理由を説明する」練習へ。短い記述・声での入力にも対応しています。</p>');card.dataset.pono381Entry='1';card.append(btn('📖 根拠から説明する練習を開く',menu,'primary'));anchor.insertAdjacentElement('afterend',card);
}
let scheduled=false;new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;ensureEntry();});}).observe(root,{childList:true,subtree:true});ensureEntry();
})();
