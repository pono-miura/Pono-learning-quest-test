/* Pono Learning Quest v464 — 実地試用チェック / 操作上の改善点を記録する先生用ツール。
 * この機能は教科の採点・発達特性の判定・医療的評価をしません。
 * 記録は選択中の学習者の端末内にのみ保存し、従来のデータへ書き込みません。 */
(()=>{'use strict';
if(window.ponoPilot464)return;
const ROOT=document.getElementById('app');if(!ROOT)return;
const PRE='pono464-pilot:',ACTIVE='pono454-active-device';
const TASKS=[
 ['start','始め方・画面の見つけやすさ'],['tap','ボタンの押しやすさ'],
 ['speech','読み上げ・音の聞きやすさ'],['hint','ヒントの使いやすさ'],
 ['pace','文字量・問題数・疲れやすさ'],['pause','休憩・再開・終了のしやすさ']
];
const CATEGORIES=[['start','学習を始める'],['tap','ボタン・画面操作'],['speech','音声・読み上げ'],['hint','ヒント・説明'],['pace','文字量・疲れやすさ'],['pause','休憩・再開'],['data','保存・記録'],['other','その他']];
const MODES=[['','未選択'],['voice','音声で聞く'],['parts','部品で考える'],['meaning','言葉や文で考える'],['recall','思い出す'],['mixed','複数の方法を試した']];
const LEVELS=[['not','未確認'],['easy','自分で進められた'],['help','ヒントや支援が役立った'],['hard','操作で困った']];
const FEELS=[['','まだ聞いていない'],['easy','やりやすかった'],['okay','少し考えた'],['hard','難しかった'],['rest','休憩したかった'],['skip','答えたくない']];
const SEVERITIES=[['low','軽微（学習を続けられる）'],['mid','要改善（学習を妨げる）'],['high','優先（その機能を使えない）']];
const STATUSES=[['open','未対応'],['doing','確認・対応中'],['done','対応確認済み']];
let page='home',confirmed=false,consent=false,openedId=null,message='',prep={},observation={},method='',feeling='',teacherNote='',issueCategory='tap',issueSeverity='low',issueDescription='',issueSteps='',filter='all';
const obj=x=>x&&typeof x==='object'&&!Array.isArray(x)?x:{};
function idNow(){try{if(typeof profile!=='undefined'&&profile&&profile.id!==undefined&&profile.id!==null&&String(profile.id).trim()&&String(profile.id)!=='trial')return String(profile.id)}catch(_){}return null}
function active(){try{const v=obj(JSON.parse(localStorage.getItem(ACTIVE)||'null'));return !!(v.studentId&&String(v.studentId).trim())}catch(_){return false}}
function read(id){if(!id)return {sessions:[],issues:[]};try{const d=obj(JSON.parse(localStorage.getItem(PRE+id)||'null'));return {sessions:Array.isArray(d.sessions)?d.sessions.filter(x=>x&&typeof x==='object').slice(-150):[],issues:Array.isArray(d.issues)?d.issues.filter(x=>x&&typeof x==='object').slice(-150):[]}}catch(_){return {sessions:[],issues:[]}}}
function write(id,d){if(!id)return false;try{localStorage.setItem(PRE+id,JSON.stringify({version:464,sessions:d.sessions.slice(-150),issues:d.issues.slice(-150)}));return true}catch(_){message='保存できませんでした。端末の保存領域を確認してください。';return false}}
function iso(){return new Date().toISOString()}
const el=(t,cl='',s)=>{const x=document.createElement(t);if(cl)x.className=cl.split(' ').filter(Boolean).map(k=>'v464-'+k).join(' ');if(s!==undefined)x.textContent=String(s);return x};
const p=(t,cl='text')=>el('p',cl,t);
const card=t=>{const c=el('section','card');c.append(el('h2','heading',t));return c};
function btn(label,fn,cl='',allowEntry=false){const b=el('button','btn '+cl,label);b.type='button';b.addEventListener('click',()=>{if(!allowEntry&&!guard())return;fn()});return b}
function option(v,label){const o=document.createElement('option');o.value=v;o.textContent=label;return o}
function select(items,value,onChange){const s=el('select','select');for(const [v,label] of items)s.append(option(v,label));s.value=value;s.addEventListener('change',()=>onChange(s.value));return s}
function labeled(label,control){const wrap=el('label','field');wrap.append(el('span','fieldname',label),control);return wrap}
function textbox(value,change,lines=3,max=360){const n=el('textarea','textarea');n.value=value;n.rows=lines;n.maxLength=max;n.addEventListener('input',()=>change(n.value));return n}
function checkbox(label,checked,fn){const a=el('label','check'),b=document.createElement('input');b.type='checkbox';b.checked=!!checked;b.addEventListener('change',()=>fn(b.checked));a.append(b,el('span','',label));return a}
function start(){page='home';confirmed=false;openedId=null;message='';render()}
function toTop(){if(typeof home==='function'){try{home();return}catch(_){}}ROOT.replaceChildren(p('トップ画面に戻る場合は再読み込みしてください。'))}
function guard(){const id=idNow();if(id!==openedId){confirmed=false;openedId=null;page='home';message='学習者が切り替わりました。先生の確認をやり直してください。';render();return false}if(active()){confirmed=false;page='home';message='子どもの学習画面が使用中です。端末の返却後に確認してください。';render();return false}return true}
function view(title){ROOT.replaceChildren();const m=el('main','page'),n=el('nav','nav');const back=el('button','btn small','← 戻る');back.type='button';back.addEventListener('click',()=>{if(page==='home')toTop();else{page='home';render()}});n.append(back,el('h1','title',title));m.append(n);ROOT.append(m);try{window.scrollTo(0,0)}catch(_){}return m}
function resetObservation(){observation=Object.fromEntries(TASKS.map(([id])=>[id,'not']));method='';feeling='';teacherNote='';}
function open(){page='home';confirmed=false;consent=false;openedId=null;message='';resetObservation();prep={};render()}
function render(){const m=view('🧭 Pono｜使ってみて確認 v464');const now=idNow();if(now!==openedId){confirmed=false;consent=false;openedId=now;page='home';message='学習者を変更した場合は先生の確認をやり直してください。'}
if(active()){confirmed=false;const c=card('子どもの学習中です');c.append(p('子ども用画面が開いているか、途中保存されています。先生に端末を返し、v454で学習を終了・一時停止してから開いてください。','warning'));m.append(c);return}
if(!now){const c=card('学習者を選択してください');c.append(p('個別の試用メモを保存するため、トップ画面で学習者を選んでください。体験モードでは記録を表示しません。','warning'));m.append(c);return}
if(!confirmed){const c=card('先生・担当者の確認');c.append(p('これは共用端末での誤操作を減らす確認です。パスワード認証ではありません。'));c.append(checkbox('選択中の学習者と、端末の状態を確認しました。',consent,v=>{consent=v;const b=c.querySelector('.v464-continue');if(b)b.disabled=!consent}));const continueButton=btn('確認して進む',()=>{confirmed=true;page='home';message='';render()},'primary wide continue');continueButton.disabled=!consent;c.append(continueButton);m.append(c);return}
if(page==='home')return homePage(m,now);
if(page==='prepare')return preparePage(m);
if(page==='observe')return observePage(m);
if(page==='issue')return issuePage(m);
if(page==='report')return reportPage(m,now);
}
function homePage(m,id){const data=read(id),open=data.issues.filter(i=>i.status!=='done').length;const intro=card('まず1回、無理なく使ってみましょう');intro.append(p('試用前の準備 → 実際に使う → 子どもの感想を確かめる → 先生が事実を記録する、の順です。漢字のテスト結果や「書ける」の判定には影響しません。'));
const grid=el('div','stats');for(const [n,v] of [['試用記録',data.sessions.length+'回'],['未確認・対応中',open+'件'],['対応確認済み',data.issues.filter(x=>x.status==='done').length+'件']]){const box=el('div','stat');box.append(el('b','statvalue',v),p(n,'caption'));grid.append(box)}intro.append(grid);intro.append(btn('① 新しい試用を始める',()=>{prep={};resetObservation();page='prepare';render()},'primary wide'),btn('② 困った点を記録する',()=>{issueCategory='tap';issueSeverity='low';issueDescription='';issueSteps='';page='issue';render()},'wide'),btn('③ 記録と改善状況を見る',()=>{page='report';render()},'wide'));m.append(intro);
const links=card('関連する学習画面');links.append(p('試用する前に使い方を確認したい場合は、v463の操作ガイドを使えます。実際の漢字学習はv455の確認を経て進めてください。','muted'));links.append(btn('🌱 v463｜はじめての操作ガイド',()=>jump('ponoStart463')),btn('📋 v455｜学習者の確認',()=>jump('ponoKanji455')));m.append(links);
const note=card('記録の扱い');note.append(p('自由記述には氏名や診断名などの個人情報を入力しないでください。記録はこの端末に保存されます。改善点のCSVは件数のみで、学習者IDや自由記述を含みません。','muted'));m.append(note);if(message)m.append(p(message,'notice'))}
function preparePage(m){const c=card('試用前チェック');c.append(p('3つの項目を確認してから、子どもの操作を観察します。'));const list=[['person','学習者の選択を確認した'],['sound','音量・読み上げを使うか確認した'],['choice','本人が学習方法や休憩を選べると伝えた']];for(const [id,t] of list)c.append(checkbox(t,prep[id],v=>{prep[id]=v;const b=c.querySelector('.v464-begin');if(b)b.disabled=!list.every(([k])=>prep[k])}));const b=btn('観察の記録へ進む',()=>{page='observe';render()},'primary wide begin');b.disabled=!list.every(([k])=>prep[k]);c.append(b);m.append(c);const x=card('本人に伝えること');x.append(p('「分からないときはヒントを見てもいいよ。疲れたら休んでもいいよ。今日はアプリが使いやすいか、一緒に試してみよう。」'));m.append(x)}
function observePage(m){const c=card('試用の様子を記録する');c.append(p('本人の能力評価ではなく、アプリが使いやすかったか・どんな支援が役立ったかを記録します。未確認の項目はそのままで大丈夫です。','muted'));
for(const [id,title] of TASKS)c.append(labeled(title,select(LEVELS,observation[id]||'not',v=>observation[id]=v)));
c.append(labeled('今回試した学習方法',select(MODES,method,v=>method=v)));
c.append(labeled('本人の感想（聞けた場合のみ）',select(FEELS,feeling,v=>feeling=v)));
c.append(labeled('先生の観察・次に試す支援（任意・氏名や診断名は書かない）',textbox(teacherNote,v=>teacherNote=v,4,360)));
c.append(p('自由記述を含む試用記録は端末に保存されます。本人の言葉を引用する場合は、共有に適切か十分確認してください。','muted'));
c.append(btn('記録を保存する',()=>{const id=idNow(),d=read(id),entry={id:'session-'+Date.now()+'-'+Math.floor(Math.random()*100000),date:iso(),tasks:{...observation},method,feeling,note:teacherNote.slice(0,360)};d.sessions.push(entry);if(write(id,d)){page='home';message='試用を保存しました。問題点があれば「困った点を記録する」から追加できます。';render()}},'primary wide'));m.append(c)}
function issuePage(m){const c=card('困った点を1件ずつ記録');c.append(p('操作の不具合、説明が分かりにくい点、支援が必要だった場面などを記録します。'));c.append(labeled('どの場面？',select(CATEGORIES,issueCategory,v=>issueCategory=v)));c.append(labeled('優先度',select(SEVERITIES,issueSeverity,v=>issueSeverity=v)));c.append(labeled('何に困った？（具体的な操作・画面を記入）',textbox(issueDescription,v=>issueDescription=v,3,250)));c.append(labeled('どうすると起こる？／次に試したいこと（任意）',textbox(issueSteps,v=>issueSteps=v,3,250)));
c.append(p('氏名など個人が分かる情報は書かないでください。記録は端末内に保存されます。','muted'));
c.append(btn('改善点を保存する',()=>{if(!issueDescription.trim()){message='困った内容を一言でも入力してください。';render();return}const d=read(idNow());d.issues.push({id:'issue-'+Date.now()+'-'+Math.floor(Math.random()*100000),date:iso(),category:issueCategory,severity:issueSeverity,description:issueDescription.trim().slice(0,250),steps:issueSteps.trim().slice(0,250),status:'open'});if(write(idNow(),d)){page='report';message='改善点を記録しました。対応状況は一覧から変更できます。';render()}},'primary wide'));m.append(c);if(message)m.append(p(message,'warning'))}
function reportPage(m,id){const d=read(id),c=card('試用の振り返り');const easy={},help={},hard={};for(const s of d.sessions)for(const [k] of TASKS){if(s.tasks&&s.tasks[k]==='easy')easy[k]=(easy[k]||0)+1;if(s.tasks&&s.tasks[k]==='help')help[k]=(help[k]||0)+1;if(s.tasks&&s.tasks[k]==='hard')hard[k]=(hard[k]||0)+1}
c.append(p(`試用 ${d.sessions.length}回 / 改善点 ${d.issues.length}件（未対応 ${d.issues.filter(x=>x.status==='open').length}件）`));
if(d.sessions.length){const list=el('div','list');for(const s of d.sessions.slice(-10).reverse()){const x=el('div','entryline');x.append(el('strong','',dateOnly(s.date)+' の試用'),p('学習方法：'+labelOf(MODES,s.method)+'　感想：'+labelOf(FEELS,s.feeling),'muted'));const details=TASKS.filter(([k])=>s.tasks&&s.tasks[k]&&s.tasks[k]!=='not').map(([k,t])=>t+'：'+labelOf(LEVELS,s.tasks[k]));if(details.length)x.append(p(details.join(' / '),'small'));if(s.note)x.append(p('先生の観察：'+String(s.note).slice(0,360),'small'));list.append(x)}c.append(list)}else c.append(p('試用記録はまだありません。','muted'));
const suggestions=TASKS.filter(([k])=>hard[k]||help[k]);if(suggestions.length){const note=el('div','hint');note.append(el('strong','','次に試せること'));for(const [k,t] of suggestions){const txt=k==='speech'?'音声が聞こえたか、速度や周囲の音量を確認':k==='tap'?'押す場所と画面の拡大を確認':k==='pace'?'1回の問題数を減らし、休憩しやすい環境に':k==='hint'?'ヒントを使う位置や説明の順番を確認':k==='pause'?'途中再開の操作を一緒に練習':'学習開始の手順を短く、分かりやすく';note.append(p('・'+t+'：'+txt,'small'))}c.append(note)}m.append(c);
const issues=card('改善点・対応状況');issues.append(labeled('表示',select([['all','すべて'],['open','未対応'],['doing','対応中'],['done','確認済み']],filter,v=>{filter=v;render()})));
const rows=d.issues.filter(x=>filter==='all'||x.status===filter).slice().reverse();if(!rows.length)issues.append(p('該当する改善点はありません。','muted'));for(const item of rows){const x=el('div','issue');x.append(el('strong','',labelOf(CATEGORIES,item.category)+'｜'+labelOf(SEVERITIES,item.severity)));x.append(p(dateOnly(item.date)+'　'+String(item.description||'').slice(0,250)));if(item.steps)x.append(p('再現・次に試すこと：'+String(item.steps).slice(0,250),'muted'));x.append(labeled('対応状況',select(STATUSES,item.status||'open',v=>{const d2=read(id),z=d2.issues.find(a=>a.id===item.id);if(z){z.status=v;if(write(id,d2)){message='対応状況を更新しました。';render()}}})));issues.append(x)}issues.append(btn('困った点を追加',()=>{page='issue';issueDescription='';issueSteps='';message='';render()}));m.append(issues);
const exportSec=card('改善状況を共有する');exportSec.append(p('匿名の集計CSVには、場面・優先度・対応状況ごとの件数だけを保存します。氏名・学習者ID・試用日・自由記述は含みません。少人数の集計でも共有範囲に注意してください。','muted'));exportSec.append(btn('集計CSVを保存',()=>exportCsv(d),'primary'));m.append(exportSec);if(message)m.append(p(message,'notice'))}
function labelOf(items,k){return (items.find(i=>i[0]===k)||['','未確認'])[1]}
function dateOnly(s){return typeof s==='string'?s.slice(0,10):'日付なし'}
function exportCsv(d){const map=new Map();for(const s of d.issues){const k=[s.category||'other',s.severity||'low',s.status||'open'].join('\u001f');map.set(k,(map.get(k)||0)+1)}let rows=[['場面','優先度','対応状況','件数']];for(const [k,n] of map){const [cat,sev,status]=k.split('\u001f');rows.push([labelOf(CATEGORIES,cat),labelOf(SEVERITIES,sev),labelOf(STATUSES,status),String(n)])}if(!map.size)rows.push(['改善点なし','','','0']);const q=x=>'"'+String(x).replace(/"/g,'""')+'"';const csv='\ufeff'+rows.map(row=>row.map(q).join(',')).join('\r\n')+'\r\n';const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Pono_v464_改善状況_匿名集計.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000)}
function jump(fn){const f=window[fn];if(typeof f==='function'){f();return}message=fn+'の画面が見つかりません。以前のapp-v***.jsが残っているか確認してください。';render()}
function inject(){if(ROOT.querySelector('.v464-page,.v464-entry'))return;const h=ROOT.querySelector('.top h1,h1');if(!h||!/^(Pono Learning Quest|今日の学習)/.test((h.textContent||'').trim()))return;const c=el('section','entry');c.append(el('strong','','🧭 v464｜試用チェックと改善記録'),p('実際に使って困った点を残し、次の工夫に生かします。採点や診断ではありません。','muted'),btn('試用チェックを開く →',open,'primary',true));const anchor=ROOT.querySelector('.v463-entry');if(anchor)anchor.insertAdjacentElement('afterend',c);else (h.closest('.top')||h).insertAdjacentElement('afterend',c)}
function shortcut(){const host=ROOT.querySelector('.v461-page');if(!host||host.querySelector('.v464-shortcut'))return;const anchor=host.querySelector('.v463-shortcut')||host.querySelector('.v461-nav');if(!anchor)return;const c=el('div','shortcut');c.append(btn('🧭 試用チェックと改善記録 v464',open,'primary',true));anchor.insertAdjacentElement('afterend',c)}
let busy=false;function schedule(){if(busy)return;busy=true;requestAnimationFrame(()=>{busy=false;inject();shortcut()})}
new MutationObserver(schedule).observe(ROOT,{subtree:true,childList:true});
window.ponoPilot464=open;
window.ponoPilot464Data={read,idNow,active,taskNames:TASKS.map(x=>x[0]),categoryNames:CATEGORIES.map(x=>x[0])};
schedule();
})();
