/* Pono Learning Quest v457 — read-only learner-scoped teacher dashboard. Local storage only. */
(()=>{'use strict';
if(window.ponoTeacher457)return;
const ROOT=document.getElementById('app');if(!ROOT)return;
const DATA=()=>window.ponoKanji449Data;
const OVER=()=>window.ponoKanji450Data;
const MODE={voice:'音声・読み',parts:'部品・形',meaning:'意味・文',recall:'思い出す'};
const OUTCOME={self:'自分の方法で取り組んだ',hint:'ヒントが役立った',change:'方法を変えた',rest:'休憩・中断'};
const SOURCE={'v451':'本人の学び方','v452':'週間の観察','v453':'3〜5字の学習','v454':'子ども用の学習'};
let grade='all',span=30,message='',pageId=null;
const today=(date=new Date())=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const startDate=(n)=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-(n-1));return today(d)};
const clean=x=>x&&typeof x==='object'&&!Array.isArray(x)?x:{};
function student(){try{if(typeof profile!=='undefined'&&profile&&profile.id!==null&&profile.id!==undefined&&String(profile.id).trim()&&String(profile.id)!=='trial')return String(profile.id)}catch(_){}return null}
function read(k){try{return clean(JSON.parse(localStorage.getItem(k)||'null'))}catch(_){return {}}}
function ready(){return !!(DATA()&&Array.isArray(DATA().items)&&DATA().items.length===395&&OVER()&&typeof OVER().row==='function'&&typeof OVER().state==='function'&&typeof OVER().info==='function')}
function currentRecords(id=student()){
 if(!id)return {id:null,rows:[],events:[],handoff:[],plans:[],draft:null,active:null};
 const all=ready()?DATA().items:[];
 let rows=[];if(ready()){const snap=OVER().state();rows=all.map(k=>OVER().row(k,snap));}
 const events=[];const add=(s,v,g)=>{if(!v||typeof v!=='object')return;const date=String(v.date||v.day||(v.at||'').slice(0,10));const gg=Number(v.grade??v.g??g);if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||![4,5].includes(gg))return;events.push({source:s,date,grade:gg,c:String(v.c||String(v.id||'').replace(/^\d+-/,'')),method:MODE[v.method]||'未記録',outcome:OUTCOME[v.outcome]||'未記録',hint:!!(v.hint||v.outcome==='hint'),break: v.outcome==='rest',at:String(v.at||'')})};
 const a451=read('pono451-support:'+id);for(const e of (Array.isArray(a451.trials)?a451.trials:[]).slice(-500))add('v451',e);
 const a452=read('pono452-support-week:'+id);const plans=[];for(const [key,p] of Object.entries(clean(a452.plans))){if(!p||typeof p!=='object')continue;const g=Number(p.grade||String(key).split(':')[0]);if(![4,5].includes(g))continue;plans.push({grade:g,week:p.week||String(key).split(':')[1],targets:Array.isArray(p.targets)?p.targets:[],eventCount:Array.isArray(p.events)?p.events.length:0});for(const e of (Array.isArray(p.events)?p.events:[]).slice(-300))add('v452',e,g)}
 const a453=read('pono453-quick:'+id);for(const e of (Array.isArray(a453.events)?a453.events:[]).slice(-1000))add('v453',e);
 const a454=read('pono454-handoff:'+id);for(const s of (Array.isArray(a454.history)?a454.history:[]).slice(-100)){const g=Number(s.grade);for(const e of(Array.isArray(s.events)?s.events:[]))add('v454',e,g)}
 events.sort((a,b)=>a.date.localeCompare(b.date)||a.at.localeCompare(b.at));
 const a455=read('pono455-handoff-check:'+id);const handoff=Array.isArray(a455.entries)?a455.entries.filter(x=>x&&typeof x==='object'):[];
 const active=read('pono454-active-device');
 return {id,rows,events,handoff,plans,draft:clean(a454.draft),active};
}
function filterGrade(g){return grade==='all'||Number(g)===Number(grade)}
function viewModel(){const all=currentRecords();const min=span==='all'?'0000-00-00':startDate(span),rows=all.rows.filter(r=>filterGrade(r.k.g));const events=all.events.filter(e=>filterGrade(e.grade)&&e.date>=min);const unique=new Set(events.filter(x=>x.c).map(e=>`${e.grade}:${e.c}`));
 const stats=ready()?OVER().info(rows):null;
 const dates=new Set(events.map(e=>e.date));const bySource={};for(const k of Object.keys(SOURCE))bySource[k]=events.filter(e=>e.source===k).length;
 const methods={};for(const v of events)if(v.method!=='未記録')methods[v.method]=(methods[v.method]||0)+1;
 const next=rows.slice().sort((a,b)=>b.score-a.score||a.k.c.localeCompare(b.k.c,'ja')).slice(0,5);
 const weekDays=[];for(let d=6;d>=0;d--){const dat=startDate(d+1);weekDays.push({date:dat,n:events.filter(e=>e.date===dat).length})}
 return {...all,rows,events,stats,uniqueCount:unique.size,activeDays:dates.size,hints:events.filter(e=>e.hint).length,rests:events.filter(e=>e.break).length,changes:events.filter(e=>e.outcome===OUTCOME.change).length,bySource,methods,next,weekDays,min};}
const el=(tag,cls='',txt)=>{const x=document.createElement(tag);if(cls)x.className=cls.split(' ').filter(Boolean).map(a=>'v457-'+a).join(' ');if(txt!==undefined)x.textContent=String(txt);return x};
function text(str,cls='text'){return el('p',cls,str)}
function btn(t,f,cl=''){const x=el('button','btn '+cl,t);x.type='button';x.addEventListener('click',()=>{if(pageId&&student()!==pageId){message='学習者が変わりました。改めて選択を確認してください。';return home457()}f()});return x}
function card(t){const c=el('section','card');c.append(el('h2','card-title',t));return c}
function exit(){try{if(typeof home==='function')return home()}catch(_){}ROOT.replaceChildren(text('トップに戻るにはページを再読み込みしてください。'))}
function page(t,back=exit){ROOT.replaceChildren();const m=el('main','page'),nav=el('nav','nav');nav.append(btn('← トップへ戻る',back),el('h1','title',t));m.append(nav);ROOT.append(m);try{window.scrollTo(0,0)}catch(_){}return m}
function metric(box,n,label,detail=''){const c=el('div','metric');c.append(el('b','metric-number',n),text(label,'metric-label'));if(detail)c.append(text(detail,'small'));box.append(c)}
function selectTabs(m){const t=el('div','tabs');for(const [g,label] of [['all','4・5年生'],[4,'小学4年'],[5,'小学5年']]){const b=btn(label,()=>{grade=g;home457()},String(grade)===String(g)?'on':'');b.setAttribute('aria-pressed',String(grade)===String(g));t.append(b)}m.append(t);const s=el('div','tabs');for(const [k,label]of[[7,'7日間'],[30,'30日間'],['all','全期間']]){const b=btn(label,()=>{span=k;home457()},String(span)===String(k)?'on':'');b.setAttribute('aria-pressed',String(span)===String(k));s.append(b)}m.append(s)}
function isOtherActive(view){return !!(view.active&&view.active.studentId)}
function csvCell(val){let x=String(val??'');if(/^[=+\-@\t\r]/.test(x))x="'"+x;return '"'+x.replace(/"/g,'""')+'"'}
function exportCsv(view){if(student()!==pageId){message='学習者が切り替わりました。';home457();return}const headers=['日付','学年','漢字','記録元','学習方法','取り組み','ヒント利用'];const lines=[headers,...view.events.map(e=>[e.date,e.grade,e.c,SOURCE[e.source],e.method,e.outcome,e.hint?'あり':'なし'])];const csv='\uFEFF'+lines.map(x=>x.map(csvCell).join(',')).join('\r\n');const b=new Blob([csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(b),a=document.createElement('a');a.href=url;a.download=`Pono457_teacher_${grade}_days${span}_${today()}.csv`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);message='この学習者のCSV保存を開始しました。';home457()}
function summaryText(v){const q=v.stats||{};const scope=grade==='all'?'小学4・5年':`小学${grade}年`;const range=span==='all'?'全期間':`直近${span}日`;
 return `Pono Learning Quest｜先生用 学習状況まとめ\n対象：${scope}／${range}（この端末内の選択中の学習者）\n練習記録：${v.events.length}件、取り組んだ漢字${v.uniqueCount}字、記録がある日${v.activeDays}日\nヒントを使った記録：${v.hints}件、休憩・中断：${v.rests}件\n先生が確認した読み：${q.read||0}字、形：${q.shape||0}字、手書き：${q.hand||0}字、文字入力・選択：${q.alternate||0}字\n文章練習の記録がある字：${q.context||0}字、復習日が来た字：${q.due||0}字\n次回の候補：${v.next.map(x=>x.k.c+'（'+x.action+'）').join('、')||'記録を確認'}\n※選択問題への取り組みと読み書きの確認は別の記録です。能力・障害の判定には使いません。\n※氏名・学習者ID・自由記述は含めていません。共有前に本人と共有先を確認してください。`}
async function copySummary(v){try{await navigator.clipboard.writeText(summaryText(v));message='まとめ文をコピーしました。'}catch(_){message='コピーできませんでした。まとめ文を画面から選択してください。'}home457()}
function home457(){pageId=student();const m=page('📋 先生用｜学習状況のまとめ v457');const intro=card('一人ひとりの「できたこと」と次の支援を考える');intro.append(text('ここに表示するのは、現在選択中の学習者の端末内記録です。読める・形が分かる・書けるを混同せず、学習の取り組みを整理します。'));m.append(intro);
 if(!pageId){const c=card('先に学習者を選んでください');c.append(text('体験モードでは、ほかの子の記録を間違えて表示しないように、個別の集計を開きません。トップで学習者を選択してから、もう一度この画面を開いてください。'));m.append(c);return}
 if(!ready()){const c=card('教材の読み込みが必要です');c.append(text('v449・v450のデータが見つかりません。以前のapp-v449.jsとapp-v450.jsを削除せず、同じフォルダーに入れてください。'));m.append(c);return}
 const v=viewModel();if(isOtherActive(v)){const c=card('子ども用の画面を確認してください');c.append(text('子ども用の学習が使用中の可能性があります。先に先生へ返却し、学習を終了・一時停止してから開いてください。'));c.append(btn('v454｜学習画面を確認する',()=>window.ponoKanji454?.()));m.append(c);return}
 const s=v.stats;selectTabs(m);
 const overview=card('選択した期間の取り組み');const g=el('div','stats');metric(g,v.events.length,'記録された取り組み','複数の機能に記録された回数');metric(g,v.uniqueCount,'取り組んだ漢字','異なる漢字の数');metric(g,v.activeDays,'記録がある日');metric(g,v.hints,'ヒント利用');overview.append(g,text('これは「学習に取り組んだ記録」です。正答数や習得した字数ではありません。v451〜v454の記録を合わせて表示しています。','small'));m.append(overview);
 const observation=card('先生が実際に確認したこと（v438）');const ob=el('div','stats');metric(ob,s.read,'読みを確認','手がかりで読めた場合を含む');metric(ob,s.shape,'形の理解を確認');metric(ob,s.hand,'手書きを確認');metric(ob,s.alternate,'入力・選択で表現');observation.append(ob,text(`未確認項目のある漢字：${s.unconfirmed}字。未確認は「できない」ではありません。これらの数は期間を限定せず、現在保存されている確認結果を表示します。`,'small'));m.append(observation);
 const activity=card('取り組み方と休憩の記録');activity.append(text(`ヒントが役立った記録：${v.hints}件　／　休憩・中断：${v.rests}件　／　方法を変更：${v.changes}件`));for(const [key,label]of Object.entries(SOURCE))activity.append(text(`${label}：${v.bySource[key]}件`,'record'));if(Object.keys(v.methods).length){activity.append(el('h3','subheading','使った方法'));for(const [label,n]of Object.entries(v.methods).sort((a,b)=>b[1]-a[1]))activity.append(text(`${label}：${n}回`,'record'))}else activity.append(text('選択した期間の学習記録はありません。まず1〜3字の短い練習から始められます。','small'));m.append(activity);
 const trend=card('直近7日間の取り組み記録');const max=Math.max(1,...v.weekDays.map(x=>x.n));const bars=el('div','bars');for(const x of v.weekDays){const box=el('div','bar-col'),h=el('div','bar-wrapper'),b=el('div','bar');b.style.height=(x.n?Math.max(6,Math.round(x.n/max*100)):0)+'%';b.setAttribute('title',x.date+'：'+x.n+'件');h.append(b);box.append(el('b','bar-num',x.n),h,text(x.date.slice(5).replace('-','/'),'bar-date'));bars.append(box)}trend.append(bars,text('上のグラフは直近7日間を表示します。期間切り替えとは別です。複数機能の記録がある場合は、それぞれを1件として数えます。','small'));m.append(trend);
 const next=card('次に試せる5字｜先生が選んで変更できます');for(const r of v.next){const line=el('div','focus');line.append(el('strong','kanji',r.k.c),el('div','focus-body',`${r.k.word}｜${r.action}`));next.append(line)}if(s.due)next.append(text(`復習予定日が来ている漢字：${s.due}字。本人の負担に合わせて少しずつ確認してください。`,'small'));if(v.rests)next.append(text('休憩の記録があります。問題数や時間帯を減らすことも検討できます。','small'));if(v.hints)next.append(text('ヒントを使った記録があります。部品を言葉にする、音声で聞くなど、本人が使いたい方法を確かめましょう。','small'));next.append(btn('v452｜週間プランを調整',()=>window.ponoKanji452?.(),'primary'),btn('v454｜子ども用学習を準備',()=>window.ponoKanji454?.()));m.append(next);
 const week=card('週間プラン・受け渡しの状況');const wp=v.plans.filter(p=>filterGrade(p.grade)).sort((a,b)=>String(b.week).localeCompare(String(a.week)))[0];if(wp)week.append(text(`最新の週間プラン：${wp.week}〜／${wp.targets.length}字／観察${wp.eventCount}件`));else week.append(text('週間プランはまだ作成されていません。'));
 const recentHandoff=v.handoff.slice(-1)[0];if(recentHandoff)week.append(text(`直近の端末確認：${recentHandoff.date||''}（${recentHandoff.kind==='prepared'?'学習前':recentHandoff.kind==='returned'?'返却後':'確認あり'}）`,'small'));if(v.draft&&Array.isArray(v.draft.ids)&&v.draft.ids.length)week.append(text('途中保存された子ども用学習があります。v454で再開・終了を確認してください。','alert'));m.append(week);
 const share=card('先生用のまとめを保存する');share.append(text('CSVとまとめ文に、学習者名やID・自由記述は含めません。ただし、学習内容から本人が推測される場合があるため、共有先を必ず確認してください。'));share.append(el('pre','preview',summaryText(v)),btn('📋 まとめ文をコピー',()=>copySummary(v),'primary'),btn('📄 期間内の記録をCSV保存',()=>exportCsv(v)),btn('🗂️ v456｜記録をバックアップ',()=>window.ponoBackup456?.()),btn('🖨️ まとめ画面を印刷',()=>window.print()));m.append(share);
 m.append(text('先生用画面ですがパスワード保護ではありません。共用端末では画面を閉じ、端末のロックを使用してください。別端末とは自動同期しません。','foot'));if(message)m.append(text(message,'notice'));
}
function inject(){if(ROOT.querySelector('.v457-page,.v457-entry'))return;const h=ROOT.querySelector('.top h1,h1');if(!h||!/^Pono Learning Quest|今日の学習/.test((h.textContent||'').trim()))return;const e=el('section','entry');e.append(el('strong','','📋 先生用｜学習状況のまとめ v457'),text('直近7日・30日・全期間の取り組みと、読み・形・書字の確認を分けて表示します。','small'),btn('学習状況を確認する →',home457,'primary'));(h.closest('.top')||h).insertAdjacentElement('afterend',e)}
let pending=false;new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;inject()})}).observe(ROOT,{childList:true,subtree:true});
window.ponoTeacher457=home457;window.ponoTeacher457Data={currentRecords,viewModel,summaryText,getGrade:()=>grade,getSpan:()=>span};inject();
})();
