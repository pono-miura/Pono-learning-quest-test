/* Pono Learning Quest v439 — flexible, low-writing-load kanji practice; original Pono cues */
(()=>{'use strict';
if(window.ponoKanji439)return;
const ROOT=document.getElementById('app');
const DATA=window.ponoKanji435Data;
if(!ROOT||!Array.isArray(DATA)||!DATA.length)return;
const EXAM=window.ponoKanji438Data||null;
const POS={左右:['左','右'],上下:['上','下'],囲み:['外側','内側']};
const PART={'亻':'にんべん','扌':'てへん','氵':'さんずい','阝':'こざとへん','囗':'くにがまえ','飠':'しょくへん','宀':'うかんむり','⺮':'たけかんむり','冖':'わかんむり','衤':'ころもへん','牜':'うしへん','刂':'りっとう','攵':'のぶん','犭':'けものへん','厂':'がんだれ','巛':'まがりがわ','𠂇':'ななめの線','禾':'のぎへん','糸':'いとへん','月':'にくづき','言':'ごんべん','貝':'かい','頁':'おおがい','木':'き','立':'たつ','寸':'すん','昔':'むかし','動':'うごく','才':'さい','公':'こう','川':'かわ','青':'あお','台':'だい','寺':'てら','古':'ふるい','吉':'きち','勺':'しゃく','成':'なる','化':'ばける','加':'くわえる','官':'かん','力':'ちから','口':'くち','工':'こう','刀':'かたな','果':'くだもの','車':'くるま','畐':'ひとつ、くち、た','則':'そく','建':'たてる','祭':'まつり','元':'もと','云':'うん','土':'つち','井':'いど','大':'おおきい','方':'ほう','次':'つぎ','代':'だい','客':'きゃく','正':'ただしい','平':'たいら','射':'いる','午':'うま','受':'うける','召':'しょう','支':'ささえる','是':'ぜ','各':'かく','可':'か','夜':'よる','昆':'こん','半':'はん','其':'その','虫':'むし','分':'わける','交':'まじわる','制':'せい','衣':'ころも','巴':'ともえ','弗':'ふつ','火':'ひ','士':'し','西':'にし','羊':'ひつじ','我':'われ','心':'こころ','广':'まだれ','色':'いろ','王':'おう','見':'みる','司':'つかさ'};
const MODE={read:{name:'📖 見て読む',desc:'漢字の言葉を見て、読みを選ぶ。'},listen:{name:'🔊 聞いて選ぶ',desc:'音を聞いて、合う言葉を選ぶ。'},parts:{name:'🧩 部品で考える',desc:'部品の位置を言葉で確かめる。'},recall:{name:'🌱 思い出して選ぶ',desc:'一部を隠した言葉から漢字を選ぶ。'}};
let grade=4,screenId='home',settings={preferred:'read',large:false,slow:false},queue=[],pos=0,session=[],feedback=null,hintUsed=false,hadMiss=false,spokenHint=false,saveWarning='';
function learner(){try{if(typeof profile!=='undefined'&&profile&&profile.id!=null)return String(profile.id)}catch(_){}return 'trial'}
function key(){return 'pono439-learning:'+learner()}
function day(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function readJSON(key,fallback={}){try{const x=JSON.parse(localStorage.getItem(key)||'null');return x&&typeof x==='object'&&!Array.isArray(x)?x:fallback}catch(_){return fallback}}
function load(){return readJSON(key(),{prefs:{},progress:{}})}
function save(x){try{localStorage.setItem(key(),JSON.stringify(x));saveWarning='';return true}catch(_){saveWarning='保存に失敗しました。端末の保存容量やプライベートモードをご確認ください。';return false}}
function cfg(){const v=load().prefs?.[grade]||{};settings={preferred:MODE[v.preferred]?v.preferred:'read',large:!!v.large,slow:!!v.slow}}
function putPrefs(){const d=load();d.prefs=d.prefs||{};d.prefs[grade]={...settings};save(d)}
function words(k){const m=String(k.word).match(/^(.*?)（([^）]+)）/);return m?{written:m[1],kana:m[2]}:{written:k.word,kana:k.reading||''}}
function list(){return DATA.filter(k=>k.g===grade)}
function id(k){return `${k.g}-${k.c}`}
function practiced(k){return load().progress?.[id(k)]||{}}
function prevRec(k){try{return EXAM?.get?.(k.g,k.c)||{}}catch(_){return {}}}
function due(k){try{const st=window.ponoKanji437Data?.status?.();return st?.[id(k)]?.next&&st[id(k)].next<=day()}catch(_){return false}}
function recommend(k){const v=prevRec(k);if(v.read==='none'||v.read==='practice'||v.read==='support')return 'read';if(v.shape==='none'||v.shape==='practice'||v.shape==='support')return 'parts';return 'recall'}
function priority(k){const v=prevRec(k),p=practiced(k);return (due(k)?10:0)+((v.read==='practice'||v.shape==='practice')?5:0)+(v.read==='none'?3:0)+(v.shape==='none'?2:0)+(p.lastOk===false?7:0)+(p.total?0:2)}
function order(mode,limit){const a=list().slice();const d=load().progress||{};a.sort((x,y)=>priority(y)-priority(x)||(d[id(x)]?.total||0)-(d[id(y)]?.total||0)||x.c.codePointAt(0)-y.c.codePointAt(0));return a.slice(0,limit).map(k=>({k,mode:mode==='suggest'?recommend(k):mode}))}
function cue(k){const saved=readJSON('pono435-oral-kanji:'+learner());const cust=saved[k.g+'_'+k.c];return cust?.custom&&cust.data?.c===k.c?{...k,...cust.data,chant:cust.chant||''}:{...k,chant:cust?.chant||''}}
function partWords(k){const v=cue(k),p=POS[v.layout]||POS.左右;return `${p[0]}に${PART[v.a]||v.a}、${p[1]}に${PART[v.b]||v.b}`}
function speak(str){if(!('speechSynthesis'in window))return false;try{window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(String(str));u.lang='ja-JP';u.rate=settings.slow?.66:.91;window.speechSynthesis.speak(u);return true}catch(_){return false}}
function stop(){try{window.speechSynthesis?.cancel()}catch(_){}}
function el(tag,cls,t){const x=document.createElement(tag);if(cls)x.className=cls.split(/\s+/).map(k=>'v439-'+k).join(' ');if(t!=null)x.textContent=String(t);return x}
function btn(t,cb,kind=''){const b=el('button','btn '+kind,t);b.type='button';b.addEventListener('click',cb);return b}
function p(t,cls='desc'){return el('p',cls,t)}
function box(t){const x=el('section','card');if(t)x.append(el('h2','',t));return x}
function mount(title,back){screenId=title;stop();ROOT.replaceChildren();const main=el('main','page'+(settings.large?' large':''));const head=el('div','nav');head.append(btn('← もどる',back||exit),el('h1','',title));main.append(head);ROOT.append(main);try{window.scrollTo(0,0)}catch(_){}return main}
function exit(){if(typeof home==='function'){try{home();return}catch(_){}}if(typeof window.ponoKanji438==='function'){window.ponoKanji438();return}ROOT.replaceChildren(p('ホームへは再読み込みで戻ってください。'))}
function learnerNote(main){main.append(p(learner()==='trial'?'現在は仮の学習者です。子ども別に記録するには、先に学習者を選んでください。':'選択中の学習者ごとに、この端末へ結果を保存します。','small'));if(saveWarning)main.append(p(saveWarning,'warning'))}
function tabs(main){const t=el('div','tabs');[4,5].forEach(g=>t.append(btn('小学'+g+'年',()=>{grade=g;cfg();home439()},grade===g?'active':'')));main.append(t)}
function home439(){cfg();const main=mount('🌿 自分に合う漢字練習 v439',exit);tabs(main);
const intro=box('書かずに、4つの方法から選べる');intro.append(p('読む・聞く・部品で考える・思い出して選ぶ。どの方法から始めてもOKです。方法を選ぶことは、得意・不得意を決めつける診断ではありません。'));intro.append(p(`小学${grade}年生は${list().length}字から練習できます（v435の部品説明がある字）。v438の全字一覧はそのまま残ります。`));main.append(intro);
const pref=box('学びやすい設定');pref.append(p('「いつも使いたい方法」を選べます。あとで何度でも変更できます。','small'));const controls=el('div','settings');const select=el('select','select');select.setAttribute('aria-label','いつも使いたい方法');for(const [mode,v] of Object.entries(MODE)){const op=document.createElement('option');op.value=mode;op.textContent=v.name;select.append(op)}select.value=settings.preferred;select.addEventListener('change',()=>{settings.preferred=select.value;putPrefs()});controls.append(select);const large=btn(settings.large?'✓ 文字を大きくする':'□ 文字を大きくする',()=>{settings.large=!settings.large;putPrefs();home439()});const slow=btn(settings.slow?'✓ 読み上げをゆっくり':'□ 読み上げをゆっくり',()=>{settings.slow=!settings.slow;putPrefs();home439()});controls.append(large,slow);pref.append(controls,btn('この方法で3問 →',()=>start(settings.preferred,3),'primary'));main.append(pref);
const suggest=box('今日のおすすめ（3問）');suggest.append(p('v437の復習予定・v438の確認状況・このアプリの練習履歴を参考に、練習する字を提案します。自分で方法を選ぶこともできます。'));suggest.append(btn('🌱 おすすめの3問を始める →',()=>start('suggest',3),'primary'));main.append(suggest);
const menu=box('好きな方法を選んで練習');for(const [m,v] of Object.entries(MODE)){const section=el('div','mode');section.append(el('strong','',v.name),p(v.desc));section.append(btn('3問',()=>start(m,3),'modebtn'),btn('5問',()=>start(m,5),'modebtn'));menu.append(section)}main.append(menu);
const actions=box('自分のペースで');actions.append(btn('🔎 漢字を選んで練習',choose),btn('📊 練習の記録を見る',report));if(window.ponoKanji438)actions.append(btn('📝 読み・形・書字の個別記録を見る',()=>window.ponoKanji438()));main.append(actions);
const tip=box('書くことを必須にしない');tip.append(p('どの問題も画面を選ぶだけで学べます。音声が使えない場合には文字のヒントを使えます。正答しても「書ける」とは自動判定しません。'));main.append(tip);learnerNote(main)}
function choose(){const main=mount(`小学${grade}年｜漢字を選ぼう`,home439),card=box('好きな1字から挑戦');card.append(p('1字ずつ、好きな方法で試せます。'));const select=el('select','select');select.setAttribute('aria-label','練習したい漢字');for(const k of list()){const o=document.createElement('option');o.value=k.c;o.textContent=`${k.c}｜${k.word}`;select.append(o)}card.append(select);const modes=el('div','choosers');for(const [m,v] of Object.entries(MODE))modes.append(btn(v.name,()=>{const k=list().find(x=>x.c===select.value);begin([{k,mode:m}])}));card.append(modes);main.append(card)}
function start(mode,n){begin(order(mode,n))}
function begin(items){if(!items.length)return home439();queue=items;pos=0;session=[];beginItem()}
function beginItem(){feedback=null;hintUsed=false;hadMiss=false;spokenHint=false;question()}
function options(item){
const k=item.k,mode=item.mode,pool=list().filter(x=>x.c!==k.c),choices=[];let correct='';
const samePrefix=(x,y)=>x.slice(0,2)===y.slice(0,2)?3:x[0]===y[0]?1:0;
const shaped=(x)=>cue(x);
const score=x=>{
 if(mode==='read'){const a=words(k).kana,b=words(x).kana;return samePrefix(a,b)*5-Math.abs(a.length-b.length)*2;}
 if(mode==='listen'){const a=words(k).written,b=words(x).written;return samePrefix(a,b)*4-Math.abs(a.length-b.length)*2;}
 const a=shaped(k),b=shaped(x);return (a.a===b.a?7:0)+(a.b===b.b?7:0)+(a.layout===b.layout?3:0);
};
pool.sort((a,b)=>score(b)-score(a)||((a.c.codePointAt(0)+k.c.codePointAt(0))%17)-((b.c.codePointAt(0)+k.c.codePointAt(0))%17));
if(mode==='read'){correct=words(k).kana;for(const x of pool){const val=words(x).kana;if(val!==correct&&!choices.includes(val))choices.push(val)}}
else if(mode==='listen'){correct=words(k).written;for(const x of pool){const val=words(x).written;if(val!==correct&&!choices.includes(val))choices.push(val)}}
else if(mode==='recall'){correct=k.c;for(const x of pool)if(x.c!==correct&&!choices.includes(x.c))choices.push(x.c)}
else{const part=x=>{const a=shaped(x);const t=POS[a.layout]||POS.左右;return `${t[0]}：${a.a} / ${t[1]}：${a.b}`};correct=part(k);for(const x of pool){const val=part(x);if(val!==correct&&!choices.includes(val))choices.push(val)}}
const wrong=choices.slice(0,3);if(wrong.length!==3)throw Error('Not enough alternatives');
const arr=[correct,...wrong],offset=(k.c.codePointAt(0)+{read:1,listen:2,parts:3,recall:0}[mode])%4;
return {items:arr.map((_,i)=>arr[(i+offset)%4]),correct};
}
function question(){if(pos>=queue.length)return finish();const item=queue[pos],k=item.k,mode=item.mode,w=words(k),all=options(item),main=mount(`漢字の練習｜${pos+1}/${queue.length}`,home439),card=box(MODE[mode].name);
card.append(p('この学習は、鉛筆なしで取り組めます。正答しても書字の習得とは判定しません。','small'));
if(mode==='read'){card.append(el('div','hero',w.written),p('この言葉は、どう読むかな？'));card.append(btn('🔊 言葉を聞く',()=>{speak(w.kana);hintUsed=true;questionHint('音声で読みを確認しました。')}));}
if(mode==='listen'){card.append(el('div','symbol','🔊'),p('音を聞いて、合う漢字の言葉を選ぼう。'));card.append(btn('▶ 読み上げを聞く',()=>{speak(w.kana)} ,'primary'));card.append(btn('音が使えないときは文字を表示',()=>{hintUsed=true;hintBox.textContent=`音声の代わり：${w.kana}`;}));}
if(mode==='parts'){card.append(el('div','hero',k.c),p(`「${k.c}」の部品の組み合わせは？`));card.append(btn('🔊 部品の説明を聞く',()=>{hintUsed=true;speak(partWords(k));hintBox.textContent='部品の音声ヒントを使いました。'}));}
if(mode==='recall'){card.append(el('div','hero',w.written.replace(k.c,'□')),p(`（${w.kana}）の□に入る漢字は？`));card.append(btn('🔊 言葉を聞く',()=>speak(w.kana)));}
const hintBox=el('div','hint');hintBox.setAttribute('aria-live','polite');card.append(hintBox);
function questionHint(message){hintBox.textContent=message}
card.append(btn('💡 形・読みのヒント',()=>{hintUsed=true;const t=mode==='read'?`ヒント：${w.kana}。どの文字の組み合わせかな？`:mode==='listen'?`音声の代わり：${w.kana}`:mode==='parts'?`手がかり：${partWords(k)}。${cue(k).chant||''}`:`手がかり：${partWords(k)}。${cue(k).chant||''}`;questionHint(t)},'light'));
const choices=el('div','choices');for(const opt of all.items){const b=btn(opt,()=>{if(feedback)return;if(opt===all.correct){feedback={ok:!hintUsed&&!hadMiss,chosen:opt};questionFeedback();}else{hadMiss=true;status.textContent='もう一度、よく見比べてみよう。ヒントを見ても大丈夫。';status.className='v439-error';}},'answer');choices.append(b)}card.append(choices);
const status=el('p','status');status.setAttribute('aria-live','polite');card.append(status);main.append(card);learnerNote(main);
function questionFeedback(){choices.querySelectorAll('button').forEach(b=>{b.disabled=true;if(b.textContent===all.correct)b.classList.add('v439-correct')});const detail=el('section','feedback');detail.append(el('strong','','🌷 よく考えたね'),p(`答え：${all.correct}`));if(mode==='parts')detail.append(p(`${k.c} は、${partWords(k)}。`));else detail.append(p(`${w.written}（${w.kana}）。${partWords(k)}。`));detail.append(p('この練習で確認したのは「選んで答える力」です。実際に書けるかどうかは別に確認します。','small'));
if(mode==='recall'){detail.append(p('自分では、どこまで思い出せたかな？'));const row=el('div','self');if(!hintUsed&&!hadMiss)row.append(btn('見ずに思い出せた',()=>complete('independent'),'primary'));row.append(btn('選択肢を見れば分かった',()=>complete('recognized')),btn('ヒントが必要だった',()=>complete('hinted')));detail.append(row)}else detail.append(btn('記録して次へ →',()=>complete(hintUsed||hadMiss?'hinted':'selected'),'primary'));
card.append(detail);status.textContent='';}}
function complete(level){const item=queue[pos],k=item.k,mode=item.mode,e={g:k.g,c:k.c,mode,date:day(),firstTry:!hadMiss&&!hintUsed,usedHint:hintUsed||hadMiss,level};session.push(e);const d=load();d.progress=d.progress||{};const existing=d.progress[id(k)]||{};d.progress[id(k)]={total:Math.min(9999,(Number(existing.total)||0)+1),hints:Math.min(9999,(Number(existing.hints)||0)+(e.usedHint?1:0)),lastOk:e.firstTry,lastMode:mode,lastLevel:level,last:day()};save(d);pos++;beginItem()}
function finish(){const main=mount('🌼 今日の練習はここまで',home439),card=box('自分に合う方法を見つけよう');card.append(el('div','hero',`${session.length}字`));card.append(p('鉛筆を使わずに、漢字を見て・聞いて・選んで確かめました。'));const by={read:0,listen:0,parts:0,recall:0};for(const a of session)by[a.mode]++;for(const [m,n] of Object.entries(by))if(n)card.append(p(`${MODE[m].name}：${n}字`,'small'));card.append(p(`ヒントや見直しを使った字：${session.filter(x=>x.usedHint).length}字。ヒントを使うことも学び方の一つです。`));card.append(btn('ほかの方法でも練習する',home439,'primary'),btn('練習記録を見る',report));main.append(card);learnerNote(main)}
function report(){const main=mount(`小学${grade}年｜練習の記録`,home439),card=box('取り組みのふり返り');const d=load().progress||{},items=list().filter(k=>d[id(k)]?.total);card.append(el('div','hero',`${items.length}字`),p(`これまでにこの画面で練習した漢字。全${list().length}字中。`));const hintCount=items.reduce((a,k)=>a+(d[id(k)].hints||0),0);card.append(p(`ヒント・見直しを使った回数：${hintCount}回。回数は能力の良し悪しを示すものではありません。`,'small'));if(items.length){const itemsWrap=el('div','reportgrid');for(const k of items){const r=d[id(k)];const tile=el('div','tile');tile.append(el('strong','',k.c),p(`${r.total}回・前回${MODE[r.lastMode]?.name||''}`, 'small'));itemsWrap.append(tile)}card.append(itemsWrap)}else card.append(p('まだこの画面の練習記録はありません。'));
card.append(p('この記録は練習履歴です。「読める・形を説明できる・書ける」の観察評価はv438で別々に記録してください。','small'));main.append(card);
if(window.ponoKanji438){const guide=box('支援記録につなげる');guide.append(btn('📝 v438の個別記録を開く',()=>window.ponoKanji438(),'primary'));main.append(guide)}learnerNote(main)}
function inject(){if(ROOT.querySelector('.v439-page,.v439-entry'))return;const h=ROOT.querySelector('.top h1, .v438-nav h1, .v437-header h1, .v436-nav h1, .v435-header h1, .v434-header h1, h1');if(!h)return;const title=(h.textContent||'').trim();if(!/Pono Learning Quest|今日の学習|漢字の個別学習記録 v438|漢字の思い出し復習 v437/.test(title))return;const entry=el('section','entry');entry.append(el('strong','','🌿 4つの学び方で漢字を練習｜v439'),p('読む・聞く・部品・思い出す。書かずに選び、本人に合う方法を試せます。'),btn('自分に合う漢字練習を開く →',home439,'primary'));(h.closest('.top,.v438-nav,.v437-header,.v436-nav,.v435-header,.v434-header')||h).insertAdjacentElement('afterend',entry)}
let scheduled=false;const watcher=new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;inject()})});watcher.observe(ROOT,{subtree:true,childList:true});
window.ponoKanji439=home439;window.ponoKanji439Data={total:DATA.length,modes:Object.keys(MODE),read:()=>load(),items:()=>DATA.slice()};inject();
})();
