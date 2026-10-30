/* Pono Learning Quest v452: opt-in weekly kanji support planning; records stored locally per learner. */
(()=>{'use strict';
if(window.ponoKanji452)return;
const ROOT=document.getElementById('app');if(!ROOT)return;
const KANJI=window.ponoKanji449Data, OVERVIEW=window.ponoKanji450Data, ADVICE=window.ponoKanji451Data;
const MODES={voice:'声と読み',parts:'部品と形',meaning:'意味と文',recall:'隠して思い出す'};
const GOALS={read:'読みを確かめる',shape:'形のしくみを知る',context:'文の意味を考える',access:'答え方の負担を減らす'};
const OUTCOMES={self:'自分の方法で取り組めた',hint:'ヒントが役立った',change:'方法を変えて取り組んだ',break:'休憩・中断を選んだ'};
const SUPPORTS={none:'追加の支援なし',audio:'読み上げ・口頭',parts:'部品の手がかり',select:'文字・選択肢で回答',typing:'キーボード入力',rest:'短時間・休憩'};
let grade=4,week=weekStart(new Date()),view='home',notice='',editor=null,search='',filter='all',selected='';
const ready=()=>!!(KANJI&&Array.isArray(KANJI.items)&&KANJI.items.length===395&&OVERVIEW&&typeof OVERVIEW.row==='function'&&typeof OVERVIEW.state==='function'&&ADVICE&&typeof ADVICE.ranked==='function');
const learner=()=>{try{if(typeof profile!=='undefined'&&profile&&profile.id!==null&&profile.id!==undefined&&String(profile.id)!=='')return String(profile.id)}catch(_){}return 'trial'};
const key=()=>`pono452-support-week:${learner()}`;
const kid=k=>`${k.g}-${k.c}`;
const clean=x=>x&&typeof x==='object'&&!Array.isArray(x)?x:{};
function read(){try{return clean(JSON.parse(localStorage.getItem(key())||'null'))}catch(_){return {}}}
function put(x){try{localStorage.setItem(key(),JSON.stringify(x));notice='保存しました。';return true}catch(_){notice='保存できませんでした。端末の保存設定を確認してください。';return false}}
function localDay(x){const d=new Date(x);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function parseDay(x){const [y,m,d]=x.split('-').map(Number);return new Date(y,m-1,d,12)}
function weekStart(d){const x=new Date(d.getFullYear(),d.getMonth(),d.getDate(),12);x.setDate(x.getDate()-(x.getDay()+6)%7);return localDay(x)}
function addDays(x,n){const d=parseDay(x);d.setDate(d.getDate()+n);return localDay(d)}
function displayDate(x){return x?x.replace(/^(\d{4})-(\d{2})-(\d{2})$/,(_,a,b,c)=>`${Number(b)}月${Number(c)}日`):'未定'}
function weekId(){return `${grade}:${week}`}
function current(){return clean(read().plans)[weekId()]||null}
function allKanji(){return ready()?KANJI.items.filter(x=>x.g===grade):[]}
function getK(id){return allKanji().find(k=>kid(k)===id)}
function oldRow(k){return OVERVIEW.row(k,OVERVIEW.state())}
function topSuggestions(n=5){const a=ADVICE.ranked(grade);return a.filter(x=>x&&x.k&&x.k.g===grade).slice(0,n)}
function modeFor(k){const suggested=topSuggestions(allKanji().length).find(x=>kid(x.k)===kid(k));return suggested&&MODES[suggested.method]?suggested.method:'meaning'}
function newItem(k){const r=oldRow(k);let goal=r.due?'shape':r.readCode==='none'?'read':r.shapeCode==='none'?'shape':r.attempted===0?'context':'context';if(r.handwritingCare)goal='access';return {id:kid(k),goal,mode:modeFor(k),support:r.handwritingCare?'select':'none'} }
function newPlan(n=3){const s=topSuggestions(n);return {grade,week,targets:s.map(x=>newItem(x.k)),events:[],created:new Date().toISOString(),updated:new Date().toISOString()}}
function savePlan(obj){const d=read(),plans=clean(d.plans),x=clean(obj);x.grade=grade;x.week=week;x.updated=new Date().toISOString();plans[weekId()]=x;return put({...d,plans})}
function el(tag,cls='',value){const e=document.createElement(tag);if(cls)e.className=cls.split(' ').filter(Boolean).map(t=>'v452-'+t).join(' ');if(value!==undefined)e.textContent=String(value);return e}
function p(txt,cls='text'){return el('p',cls,txt)}
function btn(txt,fn,cls=''){const b=el('button','btn '+cls,txt);b.type='button';b.addEventListener('click',fn);return b}
function card(title){const c=el('section','card');c.append(el('h2','card-title',title));return c}
function select(opts,val,fn,placeholder=''){const s=el('select','select');if(placeholder)s.setAttribute('aria-label',placeholder);for(const [k,v]of Object.entries(opts)){const o=el('option','',v);o.value=k;s.append(o)}s.value=val;s.addEventListener('change',()=>fn(s.value));return s}
function field(label,value,cb,opts){const d=el('label','field');d.append(el('span','label',label),select(opts,value,cb,label));return d}
function leave(){try{if(typeof home==='function')return home()}catch(_){}ROOT.replaceChildren(p('トップに戻るにはページを再読み込みしてください。'))}
function screen(title,back=home452){ROOT.replaceChildren();const m=el('main','page'),nav=el('nav','nav');nav.append(btn('← もどる',back),el('h1','title',title));m.append(nav);ROOT.append(m);try{window.scrollTo(0,0)}catch(_){}return m}
function tabs(m,cb=home452){const t=el('div','tabs');for(const g of [4,5]){const b=btn(`小学${g}年`,()=>{grade=g;editor=null;search='';selected='';cb()},grade===g?'on':'');b.setAttribute('aria-pressed',String(grade===g));t.append(b)}m.append(t)}
function weeks(m,cb=home452){const w=el('div','week');w.append(btn('‹ 前の週',()=>{week=addDays(week,-7);editor=null;cb()}),el('strong','',`${displayDate(week)}〜${displayDate(addDays(week,6))}`),btn('次の週 ›',()=>{week=addDays(week,7);editor=null;cb()}));m.append(w)}
function note(m){m.append(p(learner()==='trial'?'学習者を選択していないため、体験用の端末内記録として保存されます。個別に残す場合は先に学習者を選んでください。':'現在選択中の学習者の記録だけを表示しています。端末間の自動同期はありません。','muted'));if(notice)m.append(p(notice,'warn'))}
function methodHint(r){if(r.due)return '復習の予定日が来ています。';if(r.needsHelp)return '前回、ヒントや見直しを使った記録があります。';if(r.readCode==='none')return '読みの確認記録はまだありません。';if(r.shapeCode==='none')return '形の理解の確認記録はまだありません。';if(r.attempted===0)return '文章練習の記録はまだありません。';return 'できた方法を保ちつつ、少し日を空けて確かめましょう。'}
function home452(){view='home';const m=screen('🌷 1週間の漢字支援プラン v452',leave);tabs(m);weeks(m);
 if(!ready()){const c=card('教材データの読み込みを確認');c.append(p('v449・v450・v451のファイルが同じフォルダーにあり、先に読み込まれているか確認してください。'));m.append(c);return}
 const pl=current(),lead=card('子どもと決める、小さな1週間');lead.append(p('「読める・形が分かる・書ける」は別々の力です。これまでの結果をヒントにしながら、3〜5字と取り組む方法を選びます。書き取りは必須ではありません。'));if(!pl){lead.append(p('この週のプランはまだありません。おすすめ候補から作るか、漢字を手動で選びましょう。','muted'));lead.append(btn('おすすめ3字からプランを作る',()=>startEdit(3),'primary'),btn('おすすめ5字からプランを作る',()=>startEdit(5)));}else{lead.append(el('div','hero',`${pl.targets.length}字`),p(`記録 ${pl.events.length}件｜最終更新 ${displayDate(localDay(pl.updated||new Date()))}`,'muted'));lead.append(btn('この週の漢字・方法を調整する',()=>startEdit(0),'primary'));lead.append(btn('取り組みと様子を記録する',chooseObservation));lead.append(btn('週のまとめ・共有文を見る',showSummary));}
 m.append(lead);
 const c=card('以前の記録から見える候補');const arr=topSuggestions(5);arr.forEach(r=>{const d=el('div','row');d.append(el('strong','kanji',r.k.c),el('div','row-info',`${r.k.word}（${r.k.kana}）\n${methodHint(r)}`));c.append(d)});c.append(p('「候補」は記録からの参考表示で、診断や苦手の断定ではありません。記録がない場合も作成できます。','muted'));m.append(c);
 const menu=card('関連する学習を開く');menu.append(btn('v451｜学び方を選ぶ練習へ',()=>window.ponoKanji451?.()),btn('v450｜学習のまとめへ',()=>window.ponoKanji450?.()),btn('v438｜読み・形・書字を分けた確認へ',()=>window.ponoKanji438?.()));m.append(menu);note(m)}
function startEdit(n){const old=current();editor=old?JSON.parse(JSON.stringify(old)):newPlan(n);search='';filter='all';editPlan()}
function editPlan(){view='edit';const m=screen('📝 この週の漢字と支援方法を選ぶ',home452);tabs(m,()=>{editor=newPlan(3);editPlan()});weeks(m,()=>{editor=current()?JSON.parse(JSON.stringify(current())):newPlan(3);editPlan()});const pl=editor||newPlan(3);
 const a=card('選んだ漢字｜最大5字');a.append(p('毎回このすべてを書かせる必要はありません。読み・形・意味・回答方法から、今週確かめたい点を選びます。','small'));
 const stack=el('div','targets');for(const item of pl.targets){const k=getK(item.id);if(!k)continue;const group=el('div','target');const title=el('div','target-head');title.append(el('strong','word',`${k.c}　${k.word}`),btn('外す',()=>{pl.targets=pl.targets.filter(t=>t.id!==item.id);editPlan()},'quiet'));group.append(title);
 group.append(field('今週の目標',item.goal,v=>{item.goal=v},GOALS),field('使う学習方法',item.mode,v=>{item.mode=v},MODES),field('試す支援',item.support,v=>{item.support=v},SUPPORTS));stack.append(group)}
 if(!pl.targets.length)stack.append(p('まだ漢字が選ばれていません。下の一覧から追加してください。','muted'));a.append(stack);a.append(btn('この内容で週のプランを保存',()=>{if(pl.targets.length<1){notice='漢字を1字以上選んでください。';editPlan();return}savePlan(pl);editor=null;home452()},'primary'));m.append(a);
 const b=card('漢字を選び直す');b.append(p('おすすめ順・検索のどちらからでも追加できます。5字まで選べます。','small'));const s=el('input','search');s.type='search';s.placeholder='漢字・熟語・読みを検索';s.setAttribute('aria-label','漢字を探す');s.value=search;b.append(s);const list=el('div','kanji-list'),count=p('','small');b.append(count,list);m.append(b);
 function showChoices(){list.replaceChildren();const available=topSuggestions(allKanji().length).filter(r=>!pl.targets.some(t=>t.id===kid(r.k))).filter(r=>!search||[r.k.c,r.k.word,r.k.kana].some(v=>String(v).includes(search)));count.textContent=`追加候補 ${available.length}字（先頭30字を表示）`;
 for(const r of available.slice(0,30)){const row=el('div','candidate');row.append(el('strong','kanji',r.k.c),p(`${r.k.word}（${r.k.kana}）`,'small'),btn('＋ 追加',()=>{if(pl.targets.length>=5){notice='一週間のプランは最大5字です。';editPlan();return}pl.targets.push(newItem(r.k));search='';editPlan()},'add'));list.append(row)}}
 s.addEventListener('input',()=>{search=s.value.trim();showChoices()});showChoices();note(m)}
let picked='',outcome='self',support='none',method='voice';
function chooseObservation(){view='observe';const pl=current(),m=screen('🌱 取り組んだ方法と様子を残す',home452);if(!pl){m.append(p('先に週のプランを保存してください。'));return}weeks(m,chooseObservation);const c=card('記録する漢字を選ぶ');const items=el('div','choices');for(const item of pl.targets){const k=getK(item.id);if(!k)continue;items.append(btn(k.c,()=>{picked=item.id;method=item.mode;support=item.support;outcome='self';chooseObservation()},picked===item.id?'on':''))}c.append(items);m.append(c);
 if(!picked||!pl.targets.some(t=>t.id===picked)){picked=pl.targets[0]?.id||'';if(picked){method=pl.targets[0].mode;support=pl.targets[0].support}}
 const item=pl.targets.find(t=>t.id===picked),k=item&&getK(item.id);if(!k){m.append(p('漢字を1字選んでください。'));return}const q=card(`今日の記録｜${k.c} ${k.word}`);q.append(p(`今週の目標：${GOALS[item.goal]||GOALS.context}`,'small'));
 q.append(field('実際に使った方法',method,v=>{method=v},MODES),field('子どもの取り組み',outcome,v=>{outcome=v},OUTCOMES),field('実際に使った支援',support,v=>{support=v},SUPPORTS));q.append(p('自力で書けたかどうかの判定ではありません。見えた取り組みを選んでください。','muted'));
 q.append(btn('この観察を保存する',()=>{const x=current();if(!x)return;const event={day:localDay(new Date()),id:picked,mode:method,outcome,support,at:new Date().toISOString()};x.events=Array.isArray(x.events)?x.events.slice(-199):[];x.events.push(event);savePlan(x);notice='観察を保存しました。';picked='';chooseObservation()},'primary'));m.append(q);
 const h=card('今週の記録');const logs=(pl.events||[]).filter(e=>e.id===picked).slice(-5).reverse();if(!logs.length)h.append(p('この漢字の記録はまだありません。','muted'));for(const e of logs)h.append(p(`${displayDate(e.day)}｜${MODES[e.mode]||e.mode}｜${OUTCOMES[e.outcome]||e.outcome}｜${SUPPORTS[e.support]||e.support}`,'record'));m.append(h);note(m)}
function stats(pl){const x=clean(pl);const ev=Array.isArray(x.events)?x.events:[];const out={};for(const v of Object.keys(OUTCOMES))out[v]=ev.filter(e=>e.outcome===v).length;return {events:ev.length,by:out,experienced:new Set(ev.map(e=>e.id)).size}}
function summaryText(pl){const s=stats(pl),targets=pl.targets.map(t=>{const k=getK(t.id);return k?`${k.c}（${k.word}）：${GOALS[t.goal]||'確認'}／${MODES[t.mode]||'選択'}`:''}).filter(Boolean).join('、');const events=(pl.events||[]).map(e=>{const k=getK(e.id);return `${displayDate(e.day)} ${k?k.c:''}：${MODES[e.mode]||''}・${OUTCOMES[e.outcome]||''}（${SUPPORTS[e.support]||''}）`}).join('\n');return `Pono Learning Quest｜漢字の個別支援メモ\n対象：小学${grade}年／${displayDate(week)}〜${displayDate(addDays(week,6))}\n今週の目標：${targets}\n観察記録：${s.events}件（${s.experienced}字）\n${events||'まだ観察記録はありません。'}\n次回の検討：本人に選びやすい方法を確認し、書き取りは必要に応じて代替手段を選ぶ。\n※記録した取り組み状況であり、読み書きの能力判定や医学的診断ではありません。\n※学習者名と自由記述は含めていません。`}
function csvEsc(x){let s=String(x??'');if(/^[=+\-@\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'}
function exportCSV(pl){const head=['学年','週の開始日','漢字','言葉','確認した日','今週の目標','実際の学習方法','取り組み状況','使った支援'];const rows=[];for(const it of pl.targets){const k=getK(it.id);if(!k)continue;const ev=(pl.events||[]).filter(e=>e.id===it.id);if(!ev.length)rows.push([grade,week,k.c,k.word,'',GOALS[it.goal],'','','']);else for(const x of ev)rows.push([grade,week,k.c,k.word,x.day,GOALS[it.goal],MODES[x.mode],OUTCOMES[x.outcome],SUPPORTS[x.support]])}
 const csv='\uFEFF'+[head,...rows].map(row=>row.map(csvEsc).join(',')).join('\r\n');download(csv,`Pono452_week_${week}_grade${grade}.csv`,'text/csv;charset=utf-8');}
function download(body,name,mime){try{const blob=new Blob([body],{type:mime}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);notice='保存を開始しました。保存先は端末の設定によって異なります。';}catch(_){notice='保存できませんでした。ブラウザーの設定を確認してください。'}showSummary()}
function showSummary(){view='summary';const pl=current(),m=screen('📋 1週間のふり返りと共有',home452);tabs(m,showSummary);weeks(m,showSummary);if(!pl){m.append(p('この週のプランはまだありません。'));return}const s=stats(pl),c=card('記録から確かめられること');const row=el('div','metrics');for(const [a,b]of [['対象の漢字',pl.targets.length+'字'],['観察を記録',s.events+'回'],['取り組んだ漢字',s.experienced+'字']]){const x=el('div','metric');x.append(el('strong','number',b),p(a,'small'));row.append(x)}c.append(row);for(const [k,v]of Object.entries(OUTCOMES)){c.append(p(`${v}：${s.by[k]}回`,'record'))}c.append(p('「休憩・中断」は失敗ではありません。本人の負担に合わせて選んだ行動も大切な記録です。','muted'));m.append(c);
 const d=card('週の観察記録');const logs=(pl.events||[]).slice().sort((a,b)=>String(a.at).localeCompare(String(b.at)));for(const e of logs){const k=getK(e.id);d.append(p(`${displayDate(e.day)}｜${k?k.c:'漢字'}｜${OUTCOMES[e.outcome]||''}（${MODES[e.mode]||''}・${SUPPORTS[e.support]||''}）`,'record'))}if(!logs.length)d.append(p('まだ記録はありません。観察ができてからまとめられます。','muted'));m.append(d);
 const advice=card('次の支援を考えるために');if(s.by.hint)advice.append(p('・ヒントが役立った記録があります。次回は部品の手がかりを少し遅らせるなど、本人に合う提示を相談できます。'));
 if(s.by.change)advice.append(p('・方法を変更した記録があります。本人に「どの方法がやりやすかった？」と聞いて、条件を一つずつ変えて試しましょう。'));
 if(s.by.break)advice.append(p('・休憩や中断を選んだ記録があります。時間や問題数を減らし、疲れ具合を確認しましょう。'));
 if(!s.events)advice.append(p('・まずは1字だけ試し、本人が選んだ方法と負担を観察してみましょう。'));
 if(s.by.self)advice.append(p('・取り組めた方法は、少し日を空けて再度使えるか確かめましょう。'));
 advice.append(p('ここに示すのは先生が検討するための候補です。学習スタイルを固定したり、正解数から書字能力を推定したりしません。','muted'));m.append(advice);
 const share=card('先生・保護者への引き継ぎ');share.append(p('個人名・自由記述を入れず、観察した事実だけをまとめます。共有する前に本人と内容・共有先を確認してください。','small'));const pre=el('pre','preview',summaryText(pl));share.append(pre);share.append(btn('引き継ぎ文をコピー',async()=>{try{await navigator.clipboard.writeText(summaryText(pl));notice='引き継ぎ文をコピーしました。'}catch(_){notice='コピーできませんでした。表示中の文章を手動で選択してください。'}showSummary()},'primary'),btn('この週の記録をCSV保存',()=>exportCSV(pl)),btn('まとめ画面を印刷',()=>window.print()));m.append(share);note(m)}
function inject(){if(ROOT.querySelector('.v452-page,.v452-entry'))return;const h=ROOT.querySelector('.top h1,h1');if(!h||!/^Pono Learning Quest|今日の学習/.test((h.textContent||'').trim()))return;const box=el('section','entry');box.append(el('strong','','📋 1週間の漢字支援プラン｜v452'),p('3〜5字の目標・取り組み方を記録し、次回の支援に生かします。','small'),btn('今週のプランを開く →',home452,'primary'));(h.closest('.top')||h).insertAdjacentElement('afterend',box)}
let pending=false;new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;inject()})}).observe(ROOT,{subtree:true,childList:true});
window.ponoKanji452=home452;window.ponoKanji452Data={read,current,weekStart,addDays,stats,summaryText,topSuggestions,learner};inject();
})();
