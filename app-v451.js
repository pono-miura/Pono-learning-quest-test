/* Pono Learning Quest v451 — individual choice-led kanji support, all data kept on device. */
(()=>{'use strict';
if(window.ponoKanji451)return;
const ROOT=document.getElementById('app');if(!ROOT)return;
const DATA=window.ponoKanji449Data;
const OLD=window.ponoKanji450Data;
let grade=4,count=3,preferred='auto',viewState=null,notice='';
const MODES=[['auto','記録を参考に提案'],['voice','声で聞いて考える'],['parts','部品と言葉で考える'],['meaning','意味と文で考える'],['recall','隠して思い出す']];
const MODE_LABEL={voice:'聞く・読む',parts:'部品・形',meaning:'意味・文',recall:'思い出す'};
const PART={'亻':'にんべん','扌':'てへん','氵':'さんずい','忄':'りっしんべん','阝':'こざとへん','宀':'うかんむり','冖':'わかんむり','辶':'しんにょう','艹':'くさかんむり','⺮':'たけかんむり','礻':'しめすへん','衤':'ころもへん','飠':'しょくへん','訁':'ごんべん','糸':'いとへん','金':'かねへん','刂':'りっとう','攵':'のぶん','頁':'おおがい','疒':'やまいだれ','厂':'がんだれ','广':'まだれ','木':'き','火':'ひ','水':'みず','土':'つち','女':'おんな','立':'たつ','口':'くち','心':'こころ','竹':'たけ','禾':'のぎ','日':'ひ','月':'つき','目':'め','人':'ひと','力':'ちから','貝':'かい','寸':'すん','馬':'うま','石':'いし','ノ':'ななめ線','丶':'点','丨':'たて線','一':'横線','ヨ':'よの形','冫':'にすい'};
const POS={'左右':['左','右'],'上下':['上','下'],'囲み':['外側','内側'],'交差':['線①','線②'],'重なり':['部分①','部分②']};
const valid=()=>!!(DATA&&Array.isArray(DATA.items)&&DATA.items.length===395&&OLD&&typeof OLD.row==='function'&&typeof OLD.state==='function');
const learner=()=>{try{if(typeof profile!=='undefined'&&profile&&profile.id!==null&&profile.id!==undefined&&String(profile.id)!=='')return String(profile.id)}catch(_){}return 'trial'};
const key=()=>`pono451-support:${learner()}`;
const id=k=>`${k.g}-${k.c}`;
const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const asObj=x=>x&&typeof x==='object'&&!Array.isArray(x)?x:{};
function load(){try{const x=JSON.parse(localStorage.getItem(key())||'null');return asObj(x)}catch(_){return {}}}
function save(data){try{localStorage.setItem(key(),JSON.stringify(data));notice='';return true}catch(_){notice='記録を保存できませんでした。端末の設定や保存容量を確認してください。';return false}}
function oldRows(g=grade){if(!valid())return [];const s=OLD.state();return DATA.items.filter(k=>k.g===g).map(k=>OLD.row(k,s))}
function history(r){const h=asObj(load().progress);return asObj(h[id(r.k)])}
function chooseMode(r,setting=preferred){if(setting!=='auto')return setting;
 if(r.due)return 'recall';
 if(r.needsHelp&&r.shapeCode!=='can')return 'parts';
 if(r.readCode==='none'||r.readCode==='practice'||r.readCode==='difficult')return 'voice';
 if(r.shapeCode==='none'||r.shapeCode==='support'||r.shapeCode==='practice')return 'parts';
 if(!r.attempted||(r.context&&r.context.contextOK===false))return 'meaning';
 return 'recall';}
function reason(r){const texts=[];
 if(r.due)texts.push('復習予定日になっています');
 if(r.needsHelp)texts.push('前回はヒントや見直しがありました');
 if(r.readCode==='none')texts.push('読む状況は未確認です');
 if(r.shapeCode==='none')texts.push('形の理解は未確認です');
 if(r.attempted===0)texts.push('文で使う練習は記録がありません');
 if(r.handwritingCare)texts.push('書字負担・代替方法の記録があります');
 if(!texts.length)texts.push('できた方法を保ちながら確かめます');
 return texts.slice(0,2).join('。')+'。';}
function ranked(g=grade){const done=asObj(load().progress);return oldRows(g).map(r=>{const h=asObj(done[id(r.k)]);let n=r.score||0;
 if(h.date===today())n-=h.outcome==='self'?85:35;
 if(h.outcome==='hint'||h.outcome==='change')n+=10;
 if(h.outcome==='self'&&h.date!==today())n-=10;
 return {...r,priority:n,method:chooseMode(r),history:h}}).sort((a,b)=>b.priority-a.priority||a.k.c.localeCompare(b.k.c,'ja'));}
function el(tag,cls,txt){const x=document.createElement(tag);if(cls)x.className=cls.split(' ').filter(Boolean).map(c=>'v451-'+c).join(' ');if(txt!==undefined)x.textContent=String(txt);return x}
function p(t,cl='text'){return el('p',cl,t)}
function btn(label,cb,cl=''){const b=el('button','btn '+cl,label);b.type='button';b.addEventListener('click',cb);return b}
function card(title){const c=el('section','card');c.append(el('h2','card-title',title));return c}
function exit(){try{if(typeof home==='function')return home()}catch(_){}ROOT.replaceChildren(p('トップに戻るには、ページを再読み込みしてください。'))}
function page(title,back=home451){ROOT.replaceChildren();const m=el('main','page'),nav=el('nav','nav');nav.append(btn('← もどる',back),el('h1','title',title));m.append(nav);ROOT.append(m);try{window.scrollTo(0,0)}catch(_){}return m}
function tabGrades(m,cb=home451){const t=el('div','tabs');for(const g of [4,5]){const b=btn(`小学${g}年生`,()=>{grade=g;cb()},g===grade?'on':'');b.setAttribute('aria-pressed',String(g===grade));t.append(b)}m.append(t)}
function info(m){if(learner()==='trial')m.append(p('学習者が選択されていないため「体験用」の端末内記録です。個別に残す場合は、先に学習者を選択してください。','small'));else m.append(p('現在選択している学習者の記録だけを利用します。端末間の自動同期はありません。','small'));if(notice)m.append(p(notice,'warn'));}
function chooseConfig(m){const c=card('今日の学び方は本人が選べます');c.append(p('おすすめは参考です。やってみて合わなければ、いつでも方法を変更できます。'));
 const controls=el('div','choices');for(const [value,label] of MODES){const b=btn(label,()=>{preferred=value;home451()},preferred===value?'on':'');b.setAttribute('aria-pressed',String(preferred===value));controls.append(b)}c.append(controls);
 c.append(p('1回に取り組む漢字の数','tiny'));const sizes=el('div','sizes');for(const n of [3,5]){const b=btn(n+'字',()=>{count=n;home451()},n===count?'on':'');b.setAttribute('aria-pressed',String(n===count));sizes.append(b)}c.append(sizes);m.append(c)}
function home451(){const m=page('🌷 自分に合う漢字の学び方 v451',exit);tabGrades(m);
 if(!valid()){const c=card('教材の読み込みが必要です');c.append(p('app-v449.js と app-v450.js が同じフォルダーにあり、先に読み込まれていることを確認してください。'));m.append(c);return}
 const r=ranked(),t=card('できる方法を見つけるための支援プラン');t.append(p('小学'+grade+'年生の'+r.length+'字から、復習日・ヒントの使用・未確認の項目を参考に候補を提案します。「未確認」は苦手という意味ではありません。'));m.append(t);
 chooseConfig(m);
 const c=card('今日のおすすめ '+count+'字');c.append(p('今の記録を参考にした提案です。漢字を選び直しても、記録は消えません。','small'));
 const list=el('div','kanji-list');r.slice(0,count).forEach((x,i)=>{const row=el('div','list-row');const head=el('div','word');head.append(el('span','symbol',x.k.c),el('strong','',x.k.word));const sub=el('div','mini');sub.append(head,p(reason(x),'small'),p('提案：'+MODE_LABEL[chooseMode(x)],'method'));
 row.append(sub,btn('この字を練習',()=>beginSession([x])));list.append(row)});c.append(list,btn(count+'字の短い練習を始める',()=>beginSession(r.slice(0,count)),'primary'));m.append(c);
 const teacher=card('先生・保護者向け');teacher.append(p('実際に使った支援方法と、子どもが「できた」「ヒントが役立った」「別の方法がよかった」と感じた記録を分けて表示します。'));teacher.append(btn('記録と支援方法の振り返り',showReport,'wide'),btn('漢字の学習まとめ v450',()=>window.ponoKanji450?.(),'wide'),btn('読み・形・書字の確認 v438',()=>window.ponoKanji438?.(),'wide'));m.append(teacher);
 const caution=card('大切にしたいこと');caution.append(p('問題ができたことは、手書きができる証明ではありません。書くことを必須にせず、本人が使いやすい方法を選びます。提案は診断や能力判定ではなく、先生が支援を考えるための手がかりです。'));m.append(caution);info(m)}
let session=[],step=0,revealed=false,hinted=false,choice='auto',sessionResults=[];
function beginSession(arr){session=arr.map(r=>({key:id(r.k),kanji:r.k,from:r}));step=0;revealed=false;hinted=false;choice=preferred;sessionResults=[];renderStep()}
function explainParts(k){const pos=POS[k.layout]||POS.左右;return `${pos[0]}は「${PART[k.a]||k.a}」、${pos[1]}は「${PART[k.b]||k.b}」。${k.cue||k.tip||''}`}
function speak(s){if(!('speechSynthesis' in window)){notice='この端末では読み上げを利用できません。';renderStep();return}try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(String(s));u.lang='ja-JP';u.rate=.82;speechSynthesis.speak(u)}catch(_){notice='読み上げられませんでした。文字のヒントをご利用ください。';renderStep()}}
function renderStep(){if(step>=session.length)return finishSession();const current=session[step],r=current.from,k=current.kanji;hinted=false;revealed=false;const m=page(`🌱 いっしょに練習 ${step+1} / ${session.length}`,home451);
 const c=card('まずは書かずに考えよう');const active=chooseMode(r,choice);c.append(p(`今日の方法：${MODE_LABEL[active]}`,'method'));
 const modeButtons=el('div','choices compact');for(const [mode,label] of MODES.slice(1)){const b=btn(label,()=>{choice=mode;renderStep()},active===mode?'on':'');modeButtons.append(b)}c.append(modeButtons);
 const box=el('div','prompt');let guide='';if(active==='voice')guide=`「${k.kana}」という言葉の漢字を、声に出したり心の中で考えたりしてみよう。`;
 if(active==='parts')guide=`「${k.kana}」の漢字を、どんな部品や線で作るか思い出そう。`;
 if(active==='meaning')guide=`次の文の □ に合う言葉は何かな？ 「${k.example}」`;
 if(active==='recall')guide=`読み方「${k.kana}」を見て、漢字の形を思い出そう。`;
 box.append(p(guide,'prompt-text'));
 const hidden=el('div','hidden-word','？');box.append(hidden);
 const actions=el('div','actions');actions.append(btn('🔊 読みを聞く',()=>speak(k.kana)),btn('💡 部品のヒント',()=>{hinted=true;hintArea.hidden=false}),btn('👀 答えと説明を見る',()=>{revealed=true;hidden.textContent=k.word;answerArea.hidden=false;feedback.hidden=false}));box.append(actions);
 const hintArea=el('div','help');hintArea.hidden=true;hintArea.append(p(explainParts(k)));
 const answerArea=el('div','answer');answerArea.hidden=true;answerArea.append(p(`答え：${k.word}（${k.kana}）`),p(`意味：${k.meaning}`),p(`文の例：${k.example.replace('□',k.word)}`),p(`形の手がかり：${explainParts(k)}`,'small'));
 box.append(hintArea,answerArea);c.append(box);
 const feedback=el('div','feedback');feedback.hidden=true;feedback.append(p('答えを確かめたら、取り組み方を振り返ろう。点数ではなく、合う学び方を探す記録です。','small'));
 const b1=btn('😊 この方法で取り組めた',()=>finishItem('self',active,hinted),'positive');const b2=btn('💡 ヒントが役立った',()=>finishItem('hint',active,true));const b3=btn('🔄 別の方法がよさそう',()=>finishItem('change',active,hinted));feedback.append(b1,b2,b3);c.append(feedback);m.append(c);
 const care=card('負担を少なくする工夫');care.append(p('筆記はしなくても大丈夫。声で答える、目で選ぶ、部品を説明するなど、本人に合う方法を使います。'));if(r.handwritingCare)care.append(p('以前の記録に、書字負担や代替方法の配慮があります。入力・選択なども使えます。','small'));
 care.append(p('今回の振り返りは「実際に書けた」の評価には反映しません。','small'));m.append(care);info(m)}
function finishItem(outcome,method,hint){const x=session[step],old=load(),progress=asObj(old.progress),k=x.key,prev=asObj(progress[k]);const trial={count:Math.min(99999,(Number(prev.count)||0)+1),date:today(),outcome,method,hint:!!hint,updated:new Date().toISOString()};progress[k]=trial;
 const log=Array.isArray(old.trials)?old.trials.slice(-99):[];log.push({g:x.kanji.g,c:x.kanji.c,date:trial.date,method,outcome,hint:trial.hint});save({progress,trials:log});sessionResults.push({...trial,c:x.kanji.c,word:x.kanji.word});step++;choice=preferred;renderStep()}
function finishSession(){const m=page('🌸 今日の支援プランを振り返る',home451),c=card('今日取り組んだ漢字');c.append(el('div','large',`${sessionResults.length}字`));for(const x of sessionResults){c.append(p(`${x.c}（${x.word}）｜${MODE_LABEL[x.method]}｜${x.outcome==='self'?'取り組めた':x.outcome==='hint'?'ヒントが役立った':'別の方法を考える'}`,'line'))}c.append(p('書き取りの習得度ではなく、本人の取り組み方の記録です。','small'));m.append(c);
 const next=card('次に試せること');next.append(p('やりやすかった方法は続け、ヒントや別の方法が必要だった字は、1〜3字ずつ別のやり方を試しましょう。'));next.append(btn('さらに3字のプランを見る',()=>{count=3;home451()},'primary'),btn('先生向けの振り返りを見る',showReport));m.append(next);info(m)}
function summaryStats(g=grade){const d=asObj(load()),arr=Array.isArray(d.trials)?d.trials.filter(x=>x.g===g):[];const by={};for(const x of arr){const a=by[x.method]||(by[x.method]={total:0,self:0,hint:0,change:0});a.total++;a[x.outcome]=(a[x.outcome]||0)+1}return {n:arr.length,by,arr}}
function showReport(){const m=page('📋 学び方と支援の振り返り',home451);tabGrades(m,showReport);const s=summaryStats(),c=card('この端末で試した支援方法');if(!s.n)c.append(p('まだv451の記録はありません。まず本人が選んだ方法で3字ほど試してみましょう。'));else{c.append(p(`直近${s.n}回分の学習者の取り組み記録です。正解数や学習能力の判定ではありません。`));for(const [method,label] of MODES.slice(1)){const x=s.by[method]||{total:0,self:0,hint:0,change:0};const line=el('div','report-row');line.append(el('strong','',label),p(`${x.total}回｜取り組めた ${x.self}・ヒント ${x.hint}・別方法 ${x.change}`,'small'));c.append(line)}}m.append(c);
 const plan=card('次回の関わりのヒント');const entries=Object.entries(s.by).sort((a,b)=>b[1].self-a[1].self);if(entries.length&&entries[0][1].self>0)plan.append(p(`「${MODE_LABEL[entries[0][0]]}」で取り組めた記録があります。次回も本人に使いたいか聞いてみましょう。`));else plan.append(p('最初は本人が選びやすい方法を一つ提示し、負担や取り組みやすさを確かめましょう。'));
 if(s.arr.some(x=>x.outcome!=='self'))plan.append(p('ヒントや変更が必要だった字は、時間を短くする・口頭にする・文字を選択するなど、条件を一つずつ変えて試せます。'));
 plan.append(p('本機能は記録から学習方法の候補を示しますが、「視覚型」「聴覚型」といった固定的なタイプ分けはしません。','small'));m.append(plan);
 const links=card('学習と確認をつなぐ');links.append(btn('v449｜漢字395字の総復習へ',()=>window.ponoKanji449?.(),'wide'),btn('v450｜漢字の学習まとめへ',()=>window.ponoKanji450?.(),'wide'),btn('v438｜個別の確認記録へ',()=>window.ponoKanji438?.(),'wide'));m.append(links);info(m)}
function inject(){if(ROOT.querySelector('.v451-page,.v451-entry'))return;const heading=ROOT.querySelector('.top h1, h1');if(!heading||!/^Pono Learning Quest|今日の学習/.test((heading.textContent||'').trim()))return;const box=el('section','entry');box.append(el('strong','','🌱 自分に合う学び方｜v451'),p('漢字の読み・部品・意味・思い出す方法から選び、3〜5字で試せます。','small'),btn('今日の支援プランを開く →',home451,'primary'));(heading.closest('.top')||heading).insertAdjacentElement('afterend',box)}
let pending=false;new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;inject()})}).observe(ROOT,{childList:true,subtree:true});
window.ponoKanji451=home451;window.ponoKanji451Data={ranked,reason,chooseMode,oldRows,load,summaryStats};inject();
})();
