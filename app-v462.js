/* Pono Learning Quest v462 — 先生用・同一端末の学習者一覧
   既存の学習記録は読み取り専用。本人認証・端末間同期ではありません。 */
(()=>{'use strict';
if(window.ponoTeacher462)return;
const ROOT=document.getElementById('app');if(!ROOT)return;
const TODAY=(d=new Date())=>`${d.getFullYear()}-${('0'+(d.getMonth()+1)).slice(-2)}-${('0'+d.getDate()).slice(-2)}`;
const PREFIXES=[
 'pono438-kanji-profile:', 'pono449-kanji-review:', 'pono451-support:',
 'pono452-support-week:', 'pono453-quick:', 'pono454-handoff:',
 'pono455-handoff-check:', 'pono458-report-draft:',
 'pono459-goal-followup:', 'pono460-verified-timeline:',
 'pono450-', 'pono451-', 'pono456-'
];
const TRACKABLE=PREFIXES.slice(0,10);
const STORE='pono462-roster';const DAILY='pono462-daily:';
let unlocked=false,openedFor=null,period=7,filter='all',notice='',checked=false;
const obj=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
function read(k){try{return obj(JSON.parse(localStorage.getItem(k)||'null'))}catch(_){return {}}}
function store(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(_){notice='保存できません。端末の保存容量と設定を確認してください。';return false}}
function learner(){try{if(typeof profile!=='undefined'&&profile&&profile.id!==null&&profile.id!==undefined&&String(profile.id).trim()&&String(profile.id)!=='trial')return String(profile.id)}catch(_){}return null}
function active(){const v=read('pono454-active-device');return !!(v.studentId&&String(v.studentId).trim())}
function validId(s){return typeof s==='string'&&s.length>0&&s.length<=160&&s!=='trial'&&s!=='null'&&s!=='undefined'&&s!=='[object Object]'}
function roster(){const v=read(STORE);return {ids:Array.isArray(v.ids)?v.ids.filter(validId).slice(0,120):[],labels:obj(v.labels)}}
function scanIds(){const set=new Set(roster().ids),me=learner();if(validId(me))set.add(me);
 try{for(let i=0;i<localStorage.length;i++){
   const key=localStorage.key(i);if(typeof key!=='string')continue;
   for(const prefix of TRACKABLE)if(key.startsWith(prefix)){const id=key.slice(prefix.length);if(validId(id))set.add(id);break}
   if(key.startsWith('pono461-flow:')){const match=key.match(/^pono461-flow:(.+):\d{4}-\d{2}-\d{2}$/);if(match&&validId(match[1]))set.add(match[1])}
 }}catch(_){notice='保存領域を読み取れませんでした。端末の設定をご確認ください。'}
 return [...set].sort((a,b)=>a.localeCompare(b,'ja')).slice(0,100)}
const dateFrom=x=>{const s=String(x||'').slice(0,10);return /^20\d\d-\d\d-\d\d$/.test(s)?s:''};
function collectOne(id,index,today=TODAY()){
 const x454=read('pono454-handoff:'+id),x455=read('pono455-handoff-check:'+id),x452=read('pono452-support-week:'+id),x459=read('pono459-goal-followup:'+id),x461=read('pono461-flow:'+id+':'+today),x453=read('pono453-quick:'+id),x451=read('pono451-support:'+id);
 const history=Array.isArray(x454.history)?x454.history:[];
 const todaySessions=history.filter(s=>dateFrom(s.finishedDate||(s.finished||''))===today).length;
 const sessions=history.filter(s=>s&&typeof s==='object');
 const logs=Array.isArray(x455.entries)?x455.entries.filter(s=>s&&typeof s==='object'):[];
 const lastHandoff=logs.filter(x=>dateFrom(x.date)===today).slice(-1)[0]||null;
 const draft=!!(x454.draft&&Array.isArray(x454.draft.ids)&&x454.draft.ids.length);
 const planEntries=Object.values(obj(x452.plans)).filter(x=>x&&typeof x==='object');
 const currentWeek=planEntries.filter(x=>{const start=dateFrom(x.week);if(!start)return false;const d=new Date(start+'T12:00:00');d.setDate(d.getDate()+7);return start<=today&&today<TODAY(d)});
 const targetCount=currentWeek.reduce((n,x)=>n+(Array.isArray(x.targets)?x.targets.length:0),0);
 const goals=Array.isArray(x459.goals)?x459.goals.filter(x=>x&&typeof x==='object'):[];
 const dueGoals=goals.filter(g=>['active','adjusted'].includes(g.status)&&dateFrom(g.due)&&g.due<=today).length;
 const flow=obj(x461.tasks),done=['check','plan','child','record','report','backup'].filter(k=>flow[k]===true).length;
 const events=[];
 const put=(x)=>{if(!x||typeof x!=='object')return;const d=dateFrom(x.date||x.day||x.at||x.finishedDate||x.finished);if(d)events.push(d)};
 for(const a of (Array.isArray(x451.trials)?x451.trials:[]).slice(-700))put(a);
 for(const a of (Array.isArray(x453.events)?x453.events:[]).slice(-700))put(a);
 for(const p of planEntries)for(const e of (Array.isArray(p.events)?p.events:[]).slice(-500))put(e);
 for(const h of sessions){put({finishedDate:h.finishedDate,finished:h.finished});for(const e of (Array.isArray(h.events)?h.events:[]))put(e)}
 const lastActivity=events.length?events.sort().slice(-1)[0]:'';
 const count=events.filter(x=>period==='all'||x>=startDay(period)).length;
 const needsAttention=draft||lastHandoff?.kind==='prepared'||dueGoals>0;
 return {id,index,display:'学習者'+index,todaySessions,draft,lastHandoff,weekTargets:targetCount,dueGoals,done,latest:lastActivity,recordCount:count,needsAttention};
}
function startDay(n){const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-(Number(n)-1));return TODAY(d)}
function list(){const ids=scanIds();return ids.map((x,i)=>collectOne(x,i+1))}
const e=(tag,classes='',txt)=>{const n=document.createElement(tag);if(classes)n.className=classes.split(' ').filter(Boolean).map(s=>'v462-'+s).join(' ');if(txt!==undefined)n.textContent=String(txt);return n};
const p=(s,c='text')=>e('p',c,s);
function btn(s,fn,c='',allowDuringChild=false){const b=e('button','btn '+c,s);b.type='button';b.addEventListener('click',()=>{if(!allowDuringChild&&(openedFor!==learner()||active())){unlocked=false;notice='学習者が切り替わったか、子ども用画面が使用中です。再確認してください。';render();return}fn()});return b}
const card=t=>{const n=e('section','card');n.append(e('h2','heading',t));return n};
function top(){unlocked=false;openedFor=null;try{if(typeof home==='function')return home()}catch(_){}ROOT.replaceChildren(p('トップへ戻るにはページを再読み込みしてください。'))}
function page(){ROOT.replaceChildren();const m=e('main','page'),nav=e('nav','nav');nav.append(btn('← トップに戻る',top,'',true),e('h1','title','先生用｜みんなの今日の学習 v462'));m.append(nav);ROOT.append(m);try{window.scrollTo(0,0)}catch(_){}return m}
function toggleConfirm(m){const label=e('label','check');const box=e('input');box.type='checkbox';box.checked=unlocked;box.addEventListener('change',()=>{unlocked=box.checked;notice='';render()});label.append(box,e('span','','私は担当者で、端末に表示する学習者の情報を確認しました。'));m.append(label)}
function tabs(root,items,val,change){const w=e('div','tabs');for(const [v,label]of items){const b=btn(label,()=>{change(v);render()},String(v)===String(val)?'on':'');b.setAttribute('aria-pressed',String(v)===String(val));w.append(b)}root.append(w)}
function aliasName(r,labels){return typeof labels[r.id]==='string'&&labels[r.id].trim()?labels[r.id].trim().slice(0,24):r.display}
function saveAlias(id,name){const x=roster(),trim=String(name||'').replace(/[\x00-\x1f<>]/g,'').trim().slice(0,24);if(trim)x.labels[id]=trim;else delete x.labels[id];if(store(STORE,x))notice='表示名を保存しました。この端末でのみ使われます。';render()}
function registerCurrent(){const id=learner();if(!validId(id)){notice='トップ画面で学習者を選んでください。';return render()}const x=roster();if(!x.ids.includes(id))x.ids.push(id);if(store(STORE,x))notice='現在選択中の学習者を、この端末の一覧に追加しました。';render()}
function safeCsv(x){let s=String(x??'');if(/^[=+\-@\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'}
function exportCsv(rows){if(!checked){notice='CSVに個別の状況が含まれます。保存先を確認してからチェックしてください。';return render()}
 const data=[['一覧番号','確認日','本日終了した学習','途中保存','今週の計画文字数','見直し予定の目標','管理チェック','最終の学習記録日'],...rows.map(r=>[r.display,TODAY(),r.todaySessions,r.draft?'あり':'なし',r.weekTargets,r.dueGoals,r.done+'/6',r.latest||'なし'])];
 const csv='\ufeff'+data.map(x=>x.map(safeCsv).join(',')).join('\r\n');try{const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Pono462_teacher_overview_'+TODAY().replace(/-/g,'')+'.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);notice='CSV保存を開始しました。ダウンロード一覧で確認してください。';checked=false;render()}catch(_){notice='CSVを保存できませんでした。ブラウザー設定をご確認ください。';render()}}
function render(){const main=page();const intro=card('一人ひとりの取り組みを、一覧で見落とさず確認');intro.append(p('この端末内の学習者別記録をまとめます。別の端末の情報は取得しません。学習者の名前は自動表示しません。'));main.append(intro);
 if(active()){unlocked=false;intro.append(p('子ども用画面が使用中または途中の状態です。先生へ返却し、学習画面を閉じてから一覧を開いてください。','warn'));intro.append(btn('v454｜子どもの画面を確認',()=>{if(typeof window.ponoKanji454==='function')window.ponoKanji454()},'',true));return}
 toggleConfirm(intro);
 if(!unlocked){intro.append(p('この確認はパスワード認証ではありません。個別情報があるため、共用端末では先生がそばで確認してください。','muted'));return}
 const whole=list(),labels=roster().labels;
 const summary=card('今日の全体状況');const metrics=e('div','metrics');for(const [n,label]of [[whole.length,'記録が見つかった学習者'],[whole.filter(r=>r.todaySessions>0).length,'今日終了した学習がある人'],[whole.filter(r=>r.draft).length,'途中保存のある人'],[whole.filter(r=>r.dueGoals).length,'支援目標の見直し候補がある人']]){const item=e('div','metric');item.append(e('b','num',n),p(label,'small'));metrics.append(item)}summary.append(metrics,p('この人数は、この端末に記録がある学習者だけです。Ponoに登録された全員の名簿ではありません。','muted'));main.append(summary);
 const controls=card('表示する期間と学習者');tabs(controls,[[1,'今日'],[7,'7日'],[30,'30日'],['all','全期間']],period,v=>period=v);tabs(controls,[['all','全員'],['attention','確認候補'],['today','今日学習'],['plan','今週の計画あり']],filter,v=>filter=v);controls.append(btn('＋ 現在選択中の学習者を一覧に追加',registerCurrent));controls.append(p('表示名を付ける場合、学習者の識別に必要な最小限の文字にしてください。','muted'));main.append(controls);
 const area=card('学習者ごとの状況');let rows=whole.filter(r=>filter==='all'||(filter==='attention'&&r.needsAttention)||(filter==='today'&&r.todaySessions)||(filter==='plan'&&r.weekTargets));if(!rows.length)area.append(p(whole.length?'条件に合う学習者がいません。':'まだこの端末に学習者の記録がありません。トップで学習者を選び、学習するか一覧に追加してください。','muted'));
 for(const r of rows){const item=e('div','learner'),top=e('div','learner-head'),name=e('strong','learner-name',aliasName(r,labels));top.append(name);if(r.id===learner())top.append(e('span','current','現在選択中'));if(r.needsAttention)top.append(e('span','flag','確認候補'));item.append(top);
 const small=e('div','data');for(const [a,b]of [['本日終了',r.todaySessions+'回'],['今週の学習計画',r.weekTargets+'字'],['目標の見直し日',r.dueGoals+'件'],['先生の6項目確認',r.done+'/6'],['直近の記録',r.latest||'なし']]){const row=e('div','data-row');row.append(e('span','data-label',a),e('b','data-value',b));small.append(row)}item.append(small);
 if(r.draft)item.append(p('途中の学習があります。先生がv454で再開・終了を確認してください。','flagtext'));
 if(r.lastHandoff?.kind==='prepared')item.append(p('本日の開始前確認はありますが、返却確認はまだ記録されていません。','flagtext'));
 const label=e('label','field');label.append(e('span','','表示名（任意・この端末だけ）'));const input=e('input','nameinput');input.type='text';input.maxLength=24;input.value=labels[r.id]||'';input.placeholder=r.display;input.autocomplete='off';input.addEventListener('change',()=>saveAlias(r.id,input.value));label.append(input);item.append(label);
 item.append(p('個別の読み・形・書字や観察メモは、トップでこの学習者を選んでv457・v458から確認してください。','muted'));area.append(item)}main.append(area);
 const sharing=card('先生用の一覧を保存');sharing.append(p('CSVには学習者ID・表示名・観察の自由記述を入れません。番号だけで出力します。ただし、学習状況自体が個人に関する情報です。','muted'));
 const lab=e('label','check'),cb=e('input');cb.type='checkbox';cb.checked=checked;cb.addEventListener('change',()=>{checked=cb.checked;shareBtn.disabled=!checked});lab.append(cb,e('span','','保存先を確認しました（個別の学習状況を含みます）。'));sharing.append(lab);
 const shareBtn=btn('📄 この一覧をCSVで保存',()=>exportCsv(rows),'primary');shareBtn.disabled=!checked;sharing.append(shareBtn);main.append(sharing);
 const note=card('記録の見方');note.append(p('「記録件数」「学習日」は、学習の実施を把握するための情報です。問題の正答や書字の習得を意味しません。ヒントや休憩が必要だった日は、本人が学べる方法を考える手がかりにします。','muted'),p('v456のバックアップは定期的に保存してください。端末の共有、表示名やCSVの管理にはご注意ください。先生用チェックは本人認証ではありません。','muted'));main.append(note);if(notice)main.append(p(notice,'notice'));
}
function open(){openedFor=learner();unlocked=false;notice='';checked=false;render()}
function inject(){if(ROOT.querySelector('.v462-page,.v462-entry'))return;const h=ROOT.querySelector('.top h1,h1');if(!h||!(/^(Pono Learning Quest|今日の学習)/.test((h.textContent||'').trim())))return;const s=e('section','entry');s.append(e('strong','','👥 先生用｜みんなの学習一覧 v462'),p('同じ端末の複数学習者の今日の状況・途中保存・見直し予定を確認します。','muted'),btn('みんなの学習一覧を開く →',open,'primary',true));const prev=ROOT.querySelector('.v461-entry');if(prev)prev.insertAdjacentElement('afterend',s);else (h.closest('.top')||h).insertAdjacentElement('afterend',s)}
function shortcut(){const m=ROOT.querySelector('.v461-page');if(!m||m.querySelector('.v462-shortcut'))return;const nav=m.querySelector('.v461-nav');if(!nav)return;const s=e('div','shortcut');s.append(btn('👥 みんなの学習一覧（v462）',open,'primary',true));nav.insertAdjacentElement('afterend',s)}
let queued=false;function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;inject();shortcut()})}
new MutationObserver(schedule).observe(ROOT,{childList:true,subtree:true});
window.ponoTeacher462=open;
window.ponoTeacher462Data={scanIds,collectOne,list,roster,active};
schedule();
})();
