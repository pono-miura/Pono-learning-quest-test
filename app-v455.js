/* Pono Learning Quest v455 — teacher handoff check for shared devices.
   Privacy reminder, NOT authentication or encryption. No historical data modified. */
(()=>{'use strict';
if(window.ponoKanji455)return;
const root=document.getElementById('app');if(!root)return;
const DATA=()=>window.ponoKanji454Data;
const TODAY=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')};
const STU=()=>{try{if(typeof profile!=='undefined'&&profile&&profile.id!==undefined&&profile.id!==null&&String(profile.id)!=='')return String(profile.id)}catch(_){}return 'trial'};
const logKey=()=>`pono455-handoff-check:${STU()}`;
const activeKey='pono454-active-device';
const safe=o=>o&&typeof o==='object'&&!Array.isArray(o)?o:{};
function readRaw(k){try{return safe(JSON.parse(localStorage.getItem(k)||'null'))}catch(_){return {}}}
function read(){const x=readRaw(logKey());return {entries:Array.isArray(x.entries)?x.entries.filter(v=>v&&typeof v==='object').slice(-50):[]}}
function save(items){try{localStorage.setItem(logKey(),JSON.stringify({entries:items.slice(-50)}));return true}catch(_){message='保存できませんでした。端末の空き容量や設定を確認してください。';return false}}
function draft(){const d=DATA();try{return d&&typeof d.session==='function'?d.session():null}catch(_){return null}}
function sessions(){const d=DATA();try{return d&&typeof d.sessions==='function'?d.sessions():[]}catch(_){return []}}
function otherActive(){const a=readRaw(activeKey);return !!(a.studentId&&a.studentId!==STU())}
function thisActive(){const a=readRaw(activeKey);return !!(a.studentId&&a.studentId===STU())}
function status(){const d=draft(),hs=sessions();let count=0,todaySessions=0;for(const h of hs){const date=String(h.finishedDate||(h.finished||'').slice(0,10));if(date===TODAY()){todaySessions++;count+=(Array.isArray(h.events)?h.events.length:0)}}return {trial:STU()==='trial',studentId:STU(),other:otherActive(),active:thisActive(),draft:d,completed:todaySessions,characters:count,historyCount:hs.length}}
let message='',confirmLearner=false,confirmClear=false,confirmReview=false,confirmClosed=false,grade=4,view='home',scrolling=false;
const el=(tag,cls='',val)=>{const x=document.createElement(tag);if(cls)x.className='v455-'+cls.split(' ').join(' v455-');if(val!==undefined)x.textContent=String(val);return x};
const para=(t,cls='text')=>el('p',cls,t);
function btn(t,fn,cls=''){const x=el('button','btn '+cls,t);x.type='button';x.addEventListener('click',fn);return x}
function box(h){const x=el('section','card');x.append(el('h2','h2',h));return x}
function check(labelText,checked,onChange){const label=el('label','check');const cb=el('input');cb.type='checkbox';cb.checked=!!checked;cb.addEventListener('change',()=>onChange(cb.checked));label.append(cb,el('span','',labelText));return label}
function original(){if(typeof home==='function'){try{home();return}catch(_){}}root.replaceChildren(para('トップに戻る場合はページを再読み込みしてください。'))}
function layout(title){root.replaceChildren();const main=el('main','page'),nav=el('div','nav');nav.append(btn('← トップに戻る',original),el('h1','title',title));main.append(nav);root.append(main);try{window.scrollTo(0,0)}catch(_){}return main}
function closeAnyChildWarning(container){const st=status();if(st.other){const b=box('⚠ 別の学習者の途中画面があります');b.append(para('この端末で別の学習者の学習が途中の可能性があります。学習内容や名前は表示しません。担当者が先に元の学習を一時停止・終了してください。','warn'));container.append(b)}return st}
function setLog(kind,detail=''){const x=read().entries;const e={date:TODAY(),at:new Date().toISOString(),kind,grade,detail:String(detail).slice(0,80)};x.push(e);return save(x)}
const KIND={prepared:'開始前の確認',returned:'先生へ返却・確認済み',paused:'一時停止を確認'};
function home455(){view='home';const m=layout('🌱 Pono｜共用端末の学習チェック v455');const st=closeAnyChildWarning(m);
const c=box('今日の利用状況');const line=el('div','stats');for(const [a,b]of [[st.completed,'今日の終了した学習'],[st.characters,'今日の取り組み字数'],[st.draft?'あり':'なし','途中の学習'],[st.active?'使用中':'待機','子ども用画面']]){const metric=el('div','metric');metric.append(el('strong','n',a),para(b,'tiny'));line.append(metric)}c.append(line);
if(st.trial)c.append(para('現在は体験用です。個別の学習記録を残す場合、先にトップ画面で学習者を選択してください。','warn'));
else c.append(para('現在選択されている学習者を確認してから、端末を渡してください。下の確認画面では学習者IDを表示します。','small'));
m.append(c);
const actions=box('先生の操作');actions.append(btn('① 学習前の学習者確認',prepare455,'primary'),btn('② 学習後・返却時の確認',finish455),btn('📋 受け渡しの記録を見る',report455));m.append(actions);
const e=box('安全に使うために');e.append(para('子ども用画面には以前の評価を出さず、先生が学習者の選択と端末の画面を目で確認します。','small'),para('これは誤操作を減らす補助機能です。パスワード・端末の暗号化・アクセス制限の代わりにはなりません。端末のロックと記録の管理は引き続き必要です。','note'));m.append(e);if(message)m.append(para(message,'message'));inject()}
function gradeTabs(container,callback){const t=el('div','tabs');for(const g of [4,5]){const b=btn('小学'+g+'年',()=>{grade=g;callback()},grade===g?'on':'');b.setAttribute('aria-pressed',String(grade===g));t.append(b)}container.append(t)}
function prepare455(){view='prepare';const m=layout('① 先生｜学習前の確認');const st=closeAnyChildWarning(m);
const c=box('学習する子の確認');if(st.trial)c.append(para('体験モードです。学習者を選ぶ場合はトップに戻って選択してください。','warn'));
else {c.append(para('現在選択されている学習者ID（先生が確認するための表示）','small'),el('div','identifier',st.studentId))}
gradeTabs(c,prepare455);
if(st.draft){const d=st.draft;c.append(para(`前回の学習が途中です（小学${d.grade}年・${Math.min(d.step||0,d.ids?.length||0)}/${d.ids?.length||0}字）。新しい学習ではなく「続きから再開」を選べます。`,'note'))}
if(st.other)c.append(para('別の学習が途中の可能性があるため、この画面から開始できません。','warn'));
c.append(check('先生が、現在選択されている学習者を確認しました。',confirmLearner,v=>{confirmLearner=v;prepare455()}));
c.append(check('前の子の画面や先生用メモを閉じ、端末を渡せる状態です。',confirmClear,v=>{confirmClear=v;prepare455()}));
const ok=confirmLearner&&confirmClear&&!st.other;
const start=btn(st.draft?'v454で続きの学習を確認する':'v454で今日の学習を準備する',()=>{if(STU()!==st.studentId){confirmLearner=false;confirmClear=false;message='学習者が切り替わりました。もう一度確認してください。';prepare455();return}if(!setLog('prepared',st.draft?'再開準備':'新規準備')){prepare455();return}confirmLearner=false;confirmClear=false;if(typeof window.ponoKanji454==='function'){window.ponoKanji454();const t=root.querySelector('.v454-tabs');if(t){const b=[...t.querySelectorAll('button')].find(x=>x.textContent.trim()==='小学'+grade+'年');if(b)b.click()}}else{message='v454が読み込まれていません。app-v454.jsを残してください。';home455()}},'primary');start.disabled=!ok;c.append(start);
if(!ok)c.append(para('2つの確認項目にチェックすると開始できます。','small'));
m.append(c);const note=box('学習の受け渡し手順');note.append(para('v454で先生が3〜5字を準備 → 子ども用画面で学習 → 子どもが「先生にわたす」 → 先生がv454の記録を確認します。','small'));m.append(note);if(message)m.append(para(message,'message'))}
function finish455(){view='finish';const m=layout('② 先生｜返却時の確認');const st=closeAnyChildWarning(m);const c=box('今日の学習後の確認');c.append(para(`現在選択中の学習者：${st.trial?'体験モード':st.studentId}`,'small'),para(`v454で今日終了した学習：${st.completed}回／取り組み：${st.characters}字`,'small'));
if(st.draft)c.append(para('まだ途中の学習が保存されています。後で再開できます。終了したことにはなりません。','note'));
if(st.active)c.append(para('子ども用画面が使用中の状態です。先にv454で先生へ返してください。','warn'));
if(st.other)c.append(para('別の学習者の画面が使用中のため、返却の確認を記録できません。','warn'));
c.append(check('先生が今回の学習と途中保存の状態を確認しました。',confirmReview,v=>{confirmReview=v;finish455()}));
c.append(check('子ども用画面を閉じ、次の子に渡す前の確認をしました。',confirmClosed,v=>{confirmClosed=v;finish455()}));
const done=btn(st.draft?'一時停止・返却確認を記録':'学習後の返却確認を記録',()=>{if(STU()!==st.studentId){confirmReview=false;confirmClosed=false;message='学習者が変わりました。確認をやり直してください。';finish455();return}if(setLog(st.draft?'paused':'returned',st.draft?'途中保存あり':'終了後確認')){confirmReview=false;confirmClosed=false;message='返却の確認を記録しました。次の学習者を選ぶ前に、画面をトップに戻してください。';report455()}else finish455()},'primary');done.disabled=!(confirmReview&&confirmClosed&&!st.active&&!st.other);c.append(done);m.append(c);
const b=box('学習がまだ途中の場合');b.append(btn('v454を開いて学習を確認する',()=>window.ponoKanji454?.()));b.append(para('ここで「一時停止」を記録しても、途中の漢字は削除しません。再開すると同じ字から続けられます。','note'));m.append(b);if(message)m.append(para(message,'message'))}
function safeCsv(v){let x=String(v??'');if(/^[=+\-@\t\r]/.test(x))x="'"+x;return '"'+x.replace(/"/g,'""')+'"'}
function exportCsv(){const rows=[['日付','確認時刻','学年','確認内容','備考']];for(const e of read().entries)rows.push([e.date,e.at,'小学'+e.grade+'年',KIND[e.kind]||e.kind,e.detail||'']);const data='\ufeff'+rows.map(r=>r.map(safeCsv).join(',')).join('\r\n');try{const blob=new Blob([data],{type:'text/csv;charset=utf-8'}),u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=`Pono455_handoff_${TODAY()}.csv`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1500);message='選択中の学習者の受け渡し記録をCSVに保存しました。';report455()}catch(_){message='CSVの保存に失敗しました。';report455()}}
function report455(){view='report';const m=layout('📋 先生｜端末の受け渡し記録');const st=closeAnyChildWarning(m);const es=read().entries;
const c=box('確認記録');c.append(para(st.trial?'体験モードでの記録です。':`現在選択されている学習者の記録だけを表示しています。`,'note'));if(!es.length)c.append(para('まだ受け渡しの記録はありません。','small'));
for(const e of es.slice(-12).reverse()){const r=el('div','history');r.append(el('strong','',KIND[e.kind]||'確認'),para(`${e.date}｜小学${e.grade}年｜${e.detail||''}`,'small'));c.append(r)}c.append(btn('この学習者の確認記録をCSV保存',exportCsv),btn('もう一度、学習前に確認する',prepare455,'primary'));m.append(c);
const b=box('記録について');b.append(para('受け渡しの記録は、漢字の正誤や読み書きの習得評価ではありません。端末内で、先生が確認した日時だけを残します。','small'),para('CSVには氏名や学習者IDを含めません。ファイル名は日付だけです。共有する際は必要な範囲で取り扱ってください。','note'));m.append(b);if(message)m.append(para(message,'message'))}
function inject(){if(root.querySelector('.v455-entry,.v455-page'))return;const h=root.querySelector('.top h1,h1');if(!h||!/^Pono Learning Quest|今日の学習/.test((h.textContent||'').trim()))return;const x=el('section','entry');x.append(el('strong','','🌿 共用端末の学習者確認 v455'),para('学習前の確認と、先生への返却チェック。以前の学習を残したまま使えます。','small'),btn('先生の確認を始める →',home455,'primary'));(h.closest('.top')||h).insertAdjacentElement('afterend',x)}
let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;inject()})}).observe(root,{subtree:true,childList:true});
window.ponoKanji455=home455;window.ponoKanji455Data={read,status,session:draft,sessions,otherActive,logKey,exportCsv};inject();
})();
