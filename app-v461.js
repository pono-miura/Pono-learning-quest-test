/* Pono Learning Quest v461 — 先生用ホーム。既存記録の表示は参照のみ。
   誤操作防止の確認であり、認証や暗号化ではありません。 */
(()=>{'use strict';
if(window.ponoTeacher461)return;
const ROOT=document.getElementById('app');if(!ROOT)return;
const TASKS=[
 {key:'check',icon:'①',title:'学習者と端末を確認',detail:'学習開始前・終了後の取り違え防止',fn:'ponoKanji455',note:'v455｜共用端末の確認'},
 {key:'plan',icon:'②',title:'今週・今日の学習を準備',detail:'3〜5字の目標と、試す方法を決める',fn:'ponoKanji452',note:'v452｜週間支援プラン'},
 {key:'child',icon:'③',title:'子どもの学習を始める',detail:'書字を必須にしない、途中再開できる学習',fn:'ponoKanji454',note:'v454｜子ども用画面'},
 {key:'record',icon:'④',title:'結果と観察を確認',detail:'学習履歴・ヒント・本人が選んだ方法を確認',fn:'ponoTeacher457',note:'v457｜学習まとめ'},
 {key:'report',icon:'⑤',title:'学校・保護者へ共有する',detail:'先生が内容を確認して個別レポートを作成',fn:'ponoTeacher458',note:'v458｜レポート作成'},
 {key:'backup',icon:'⑥',title:'学習記録をバックアップ',detail:'端末の故障や買い替えに備えて保存',fn:'ponoBackup456',note:'v456｜バックアップ'}
];
const EXTRAS=[
 {title:'自分に合う学習方法を試す',fn:'ponoKanji451',note:'v451'},
 {title:'今日の漢字を先生が準備',fn:'ponoKanji453',note:'v453'},
 {title:'漢字ごとの読み・形・書字',fn:'ponoKanji438',note:'v438'},
 {title:'漢字395字の復習',fn:'ponoKanji449',note:'v449'},
 {title:'1〜4週間の目標・振り返り',fn:'ponoSupport459',note:'v459'},
 {title:'支援の経過を時系列で見る',fn:'ponoTimeline460',note:'v460'},
 {title:'漢字の学習状況一覧',fn:'ponoKanji450',note:'v450'}
];
const TODAY=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
let confirmed=false,holder=null,message='',showOlder=false;
const el=(tag,cl='',txt)=>{const x=document.createElement(tag);if(cl)x.className=cl.split(' ').filter(Boolean).map(k=>'v461-'+k).join(' ');if(txt!==undefined)x.textContent=String(txt);return x};
const p=(txt,cls='text')=>el('p',cls,txt);
function btn(label,fn,cls=''){const b=el('button','button '+cls,label);b.type='button';b.addEventListener('click',fn);return b}
function section(title){const x=el('section','section');x.append(el('h2','section-title',title));return x}
function learner(){try{if(typeof profile!=='undefined'&&profile&&profile.id!==undefined&&profile.id!==null&&String(profile.id).trim()&&String(profile.id)!=='trial')return String(profile.id)}catch(_){ }return null}
function safeObj(s){try{const v=JSON.parse(s||'null');return v&&typeof v==='object'&&!Array.isArray(v)?v:{}}catch(_){return {}}}
function active(){try{return safeObj(localStorage.getItem('pono454-active-device'))}catch(_){return {}}}
function safeRecords(){try{const d=window.ponoTeacher457Data;if(!d||typeof d.currentRecords!=='function')return null;return d.currentRecords()}catch(_){return null}}
function status(){const d=safeRecords()||{};const today=TODAY();let events=Array.isArray(d.events)?d.events:[];const dates=new Set(events.filter(x=>x.date&&x.date<=today).map(x=>x.date));const start=new Date(today+'T00:00:00');start.setDate(start.getDate()-6);const week=start.getFullYear()+'-'+String(start.getMonth()+1).padStart(2,'0')+'-'+String(start.getDate()).padStart(2,'0');return {today:events.filter(x=>x.date===today).length,seven:events.filter(x=>x.date>=week&&x.date<=today).length,days:dates.size,hasDraft:!!(d.draft||d.active),active:active(),events:events.length}}
function readFlow(id){if(!id)return {};try{const s=safeObj(localStorage.getItem('pono461-flow:'+id+':'+TODAY()));return s&&s.tasks&&typeof s.tasks==='object'?s.tasks:{}}catch(_){return {}}}
function saveFlow(id,items){try{localStorage.setItem('pono461-flow:'+id+':'+TODAY(),JSON.stringify({tasks:items}));return true}catch(_){return false}}
function gotChanged(){return !!(holder&&learner()!==holder)}
function gated(fn){if(gotChanged()){confirmed=false;holder=null;message='学習者が切り替わりました。もう一度確認してください。';return render()}const a=active();if(a.studentId){confirmed=false;message='子ども用の画面が使用中、または途中状態です。先にその学習を先生が確認してください。';return render()}if(!confirmed){message='先生による確認を終えてから開いてください。';return render()}if(typeof window[fn]!=='function'){message=fn+' のファイルが見つかりません。以前の更新ファイルを残しているか確認してください。';return render()}window[fn]()}
function top(){try{if(typeof home==='function')return home()}catch(_){ }ROOT.replaceChildren(p('アプリを再読み込みしてトップに戻ってください。'))}
function layout(){ROOT.replaceChildren();const main=el('main','page'),nav=el('nav','nav');nav.append(btn('← トップに戻る',()=>{confirmed=false;holder=null;top()}),el('h1','title','先生用ホーム｜Pono v461'));main.append(nav);ROOT.append(main);try{window.scrollTo(0,0)}catch(_){ }return main}
function labelChip(name,val){const a=el('div','metric');a.append(el('b','metric-value',val),p(name,'metric-label'));return a}
function render(){const main=layout(),id=learner(),running=active();const intro=section('今日の管理をひとつの画面に');intro.append(p('確認 → 準備 → 子どもの学習 → 振り返り → 共有 → バックアップ の順に使えます。操作の入口をまとめただけなので、以前の記録や学習教材は変更しません。'));
 if(!id){confirmed=false;holder=null;intro.append(p('まずトップ画面で学習者を選んでください。体験モードでは個別の学習記録を表示しません。','warning'));intro.append(btn('トップで学習者を選ぶ',top,'primary'));main.append(intro);help(main);return}
 if(running.studentId){confirmed=false;holder=null;intro.append(p('子ども用の学習画面が使用中、または途中保存されています。学習者の取り違えを防ぐため、管理画面の個別情報は表示しません。','warning'));intro.append(btn('子ども用の画面を確認',()=>{if(typeof window.ponoKanji454==='function')window.ponoKanji454();else message='v454の学習画面を確認してください。'},'primary'));main.append(intro);help(main);return}
 const acknowledge=el('label','confirm');const box=el('input');box.type='checkbox';box.checked=confirmed&&holder===id;box.addEventListener('change',()=>{confirmed=box.checked;holder=box.checked?id:null;message='';render()});acknowledge.append(box,el('span','','私は先生・担当者で、この端末の学習者を確認しました。'));intro.append(acknowledge);
 if(!confirmed||holder!==id){intro.append(p('この確認は誤操作を減らすためのもので、パスワードによる本人認証ではありません。子どもに端末を渡す前後は、端末のロックと学習者選択も確認してください。','small'));main.append(intro);help(main);return}
 const s=status();const line=el('div','metrics');line.append(labelChip('今日の学習記録',s.today+'件'),labelChip('直近7日の記録',s.seven+'件'),labelChip('記録された日数',s.days+'日'));intro.append(line,p('記録件数は複数機能の取り組み履歴です。正解率や書字能力の判定ではありません。','small'));main.append(intro);
 const c=section('今日の6ステップ');const progress=readFlow(id);c.append(p('各操作を開いた後、先生が「今日済ませた」にチェックできます。チェックは今日だけの管理用メモです。','small'));const count=TASKS.filter(t=>progress[t.key]).length;c.append(p(`${count} / ${TASKS.length} 項目を確認済み`,'progress'));const list=el('div','tasks');TASKS.forEach(t=>{const item=el('div','task');const left=el('div','task-info');left.append(el('span','task-icon',t.icon),el('strong','task-title',t.title),p(t.detail,'task-desc'),p(t.note,'task-source'));const actions=el('div','task-actions');actions.append(btn('開く',()=>gated(t.fn),'open'));const check=el('label','done'),cb=el('input');cb.type='checkbox';cb.checked=!!progress[t.key];cb.addEventListener('change',()=>{if(gotChanged()){confirmed=false;return render()}const next={...readFlow(id),[t.key]:cb.checked};if(!saveFlow(id,next)){message='チェックの保存に失敗しました。端末の空き容量を確認してください。'}render()});check.append(cb,el('span','','今日済ませた'));actions.append(check);item.append(left,actions);list.append(item)});c.append(list);main.append(c);
 const x=section('必要に応じて使う機能');const extra=el('div','extra-grid');for(const e of EXTRAS){extra.append(btn(e.title+'  · '+e.note,()=>gated(e.fn),'extra'))}x.append(extra);main.append(x);
 const protect=section('記録と共有の注意');protect.append(p('書字の確認をしていない字は「書けない」と扱わず、「未確認」としておきます。共有資料は先生が内容を確認し、必要な範囲だけ渡してください。'));
 protect.append(p('v456のバックアップは端末内の記録をファイルに保存します。別の端末へは自動同期されないため、定期的に保管先を確認してください。','small'));main.append(protect);
 if(message)main.append(p(message,'warning'));help(main)
}
function help(main){const c=section('この画面について');c.append(p('古い管理機能を削除せず、入口だけ整理しています。もし必要な画面が開かない場合は、対応する過去の app-v***.js と style-v***.css が同じフォルダーにあるか確認してください。','small'));main.append(c)}
function open(){confirmed=false;holder=null;message='';render()}
const LEGACY=['450','451','452','453','454','455','456','457','458','459','460'];
function insert(){if(ROOT.querySelector('.v461-page,.v461-entry'))return;const h=ROOT.querySelector('.top h1,h1');if(!h||!/^(Pono Learning Quest|今日の学習)/.test((h.textContent||'').trim()))return;
 const wrap=el('section','entry');wrap.append(el('strong','','🧭 先生用の管理ホーム｜v461'),p('今日の準備・子どもの学習・振り返り・共有・記録の保存をまとめて開く','small'),btn('先生用ホームを開く →',open,'primary'));const where=h.closest('.top')||h;where.insertAdjacentElement('afterend',wrap);
 const d=el('details','previous');d.append(el('summary','','以前の先生用管理ボタンを表示'));const holder=el('div','previous-content');d.append(holder);wrap.insertAdjacentElement('afterend',d);
}
function regroup(){const entry=ROOT.querySelector('.v461-entry'),archive=ROOT.querySelector('.v461-previous-content');if(!entry||!archive)return;for(const n of LEGACY){const old=ROOT.querySelector('.v'+n+'-entry');if(old&&old.parentElement!==archive)archive.append(old)}}
let pending=false;function schedule(){if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;insert();regroup()})}
new MutationObserver(schedule).observe(ROOT,{subtree:true,childList:true});
window.ponoTeacher461=open;
window.ponoTeacher461Data={status,readFlow,saveFlow,steps:TASKS.map(x=>x.key),learner};
schedule();
})();
