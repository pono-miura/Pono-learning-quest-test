/* Pono Learning Quest v459 — teacher-reviewed small-goal follow-up. No diagnostic assessment. */
(()=>{'use strict';
if(window.ponoSupport459)return;
const ROOT=document.getElementById('app');if(!ROOT)return;
const ITEMS=()=>window.ponoKanji449Data?.items||[];
const TEACH=()=>window.ponoTeacher457Data;
const MODEL={
 voice:{title:'音声を使い、読みや意味を選ぶ',tip:'聞く・選ぶ方法を本人が使いやすいか確認する'},
 parts:{title:'部品を言葉にして形を確かめる',tip:'線の位置や部品の手がかりを使えるか確認する'},
 meaning:{title:'言葉の意味を文の中で確かめる',tip:'選択や口頭で意味を伝える方法を試す'},
 recall:{title:'短い時間で思い出す復習を試す',tip:'思い出せないときもヒントで確認し、負担を調節する'}
};
const OBS=[['self','本人が方法を選んで取り組めた'],['hint','ヒントを使って取り組めた'],['change','学習方法を変更して取り組めた'],['rest','休憩を入れて取り組めた'],['difficult','負担が大きく、方法の見直しが必要'],['notyet','この日は取り組まなかった']];
const STATES={active:'継続中',completed:'今回の目標を一区切り',adjusted:'目標・方法を調整',paused:'いったん休止'};
const e=(tag,cls='',t)=>{const x=document.createElement(tag);if(cls)x.className=cls.split(' ').map(a=>'v459-'+a).join(' ');if(t!==undefined)x.textContent=String(t);return x};
const p=(v,cls='text')=>e('p',cls,v);
const button=(v,fn,extra='')=>{const b=e('button','btn '+extra,v);b.type='button';b.addEventListener('click',()=>{if(pageId!==getStudent())return home459();fn()});return b};
const card=t=>{const c=e('section','card');c.append(e('h2','heading',t));return c};
const today=()=>{const d=new Date();return `${d.getFullYear()}-${('0'+(d.getMonth()+1)).slice(-2)}-${('0'+d.getDate()).slice(-2)}`};
const plusDays=(n)=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+Number(n));return `${d.getFullYear()}-${('0'+(d.getMonth()+1)).slice(-2)}-${('0'+d.getDate()).slice(-2)}`};
const isDate=s=>/^20\d{2}-\d{2}-\d{2}$/.test(String(s||''))&&!Number.isNaN(new Date(String(s)+'T12:00:00').valueOf());
const sanitize=s=>String(s??'').slice(0,500).trim();
const safeObj=o=>o&&typeof o==='object'&&!Array.isArray(o)?o:{};
function getStudent(){try{if(typeof profile!=='undefined'&&profile&&profile.id!=null&&String(profile.id).trim()&&String(profile.id)!=='trial')return String(profile.id)}catch(_){}return null}
function isChild(){try{return !!JSON.parse(localStorage.getItem('pono454-active-device')||'null')?.studentId}catch(_){return false}}
function available(){return ITEMS().length===395&&TEACH()&&typeof TEACH().currentRecords==='function'}
function key(id=getStudent()){return 'pono459-goal-followup:'+id}
function read(){if(!getStudent())return {nextId:1,goals:[]};try{const obj=safeObj(JSON.parse(localStorage.getItem(key())||'null'));return {nextId:Number.isInteger(obj.nextId)?Math.max(1,obj.nextId):1,goals:Array.isArray(obj.goals)?obj.goals.filter(x=>x&&typeof x==='object').slice(-250):[]}}catch(_){return {nextId:1,goals:[]}}}
function write(obj){try{localStorage.setItem(key(),JSON.stringify(obj));return true}catch(_){return false}}
const charList=g=>ITEMS().filter(x=>Number(x.g)===Number(g));
function selectedChars(str,g){const pool=new Set(charList(g).map(k=>k.c));const found=[];for(const c of [...String(str||'')])if(pool.has(c)&&!found.includes(c))found.push(c);return found.slice(0,5)}
function countRecordFor(chars,created,grade){const r=TEACH().currentRecords();const subset=r.events.filter(x=>Number(x.grade)===grade&&x.date>=created&&chars.includes(x.c));return {entries:subset.length,dates:new Set(subset.map(x=>x.date)).size,hint:subset.filter(x=>x.hint).length,breaks:subset.filter(x=>x.break).length}}
function suggest(g){try{const rows=TEACH().currentRecords().rows.filter(x=>Number(x.k.g)===Number(g));return rows.sort((a,b)=>b.score-a.score||a.k.c.localeCompare(b.k.c,'ja')).slice(0,5).map(x=>x.k.c)}catch(_){return charList(g).slice(0,5).map(x=>x.c)}}
let grade=4,pageId=null,view='list',currentGoal=null,note='',entryChars='',entryMethod='parts',entryDue='7',reviewOutcome='self',reviewNotes='',reviewNext='',reviewState='active',reviewMethod='parts',reviewInterval='7';
function top(title){ROOT.replaceChildren();const main=e('main','page');const nav=e('nav','nav');nav.append(button('← トップへ',()=>{try{if(typeof home==='function')return home()}catch(_){}ROOT.replaceChildren(p('アプリのトップへ戻ってください。'))}),e('h1','title',title));main.append(nav);ROOT.append(main);try{window.scrollTo(0,0)}catch(_){}return main}
function selectBox(options,sel,change){const s=e('select','select');for(const [v,l] of options){const o=e('option','',l);o.value=String(v);s.append(o)}s.value=String(sel);s.addEventListener('change',()=>change(s.value));return s}
function labelField(title,node,tip=''){const l=e('label','field');l.append(e('span','label',title),node);if(tip)l.append(p(tip,'tip'));return l}
function message(m){if(note)m.append(p(note,'notice'))}
function home459(){pageId=getStudent();view='list';render()}
function render(){pageId=getStudent();const m=top('🌱 学習後の目標と支援を見直す v459');const intro=card('小さな目標を決め、本人と一緒に確かめる');intro.append(p('「目標 → 試した方法 → 観察 → 次の目標」をつなぎます。問題を解いた回数と、実際に読み書きできることは分けて考えます。'));m.append(intro);
 if(!pageId){const c=card('学習者を選んでください');c.append(p('ほかの子の記録を誤って表示しないよう、体験モードや未選択では開けません。トップで学習者を選んでください。'));m.append(c);return}
 if(isChild()){const c=card('子ども用の学習画面が使用中です');c.append(p('先生へ端末が返却されていることを確認してから、先生用の記録を開いてください。'));m.append(c);return}
 if(!available()){const c=card('教材データの確認が必要です');c.append(p('v449とv457のJavaScriptが読み込まれていません。以前の教材ファイルを削除せず残してください。'));m.append(c);return}
 const tabs=e('div','tabs');for(const g of [4,5])tabs.append(button('小学'+g+'年',()=>{grade=g;entryChars='';view='list';note='';render()},grade===g?'active':''));m.append(tabs);
 const goals=read().goals.filter(x=>Number(x.grade)===grade).sort((a,b)=>String(b.created).localeCompare(String(a.created))||Number(b.id)-Number(a.id));
 const actions=e('div','actions');actions.append(button('＋ 小さな目標を作る',()=>{view='create';entryChars='';note='';render()},'primary'),button('v458｜共有レポートを見る',()=>window.ponoTeacher458?.()));m.append(actions);
 if(view==='create'){createView(m);message(m);return}
 if(view==='review'){reviewView(m);message(m);return}
 const c=card('設定した目標');if(!goals.length)c.append(p('まだ目標はありません。まず、本人が選んだ方法で無理なく取り組める小さな目標を一つ作ってみましょう。','muted'));
 for(const x of goals){const row=e('div','goal');const head=e('div','goalhead');head.append(e('strong','glyph',x.characters.join(' ')),e('span','state',STATES[x.status]||'確認中'));row.append(head,p(MODEL[x.method]?.title||x.method,'goalname'),p('開始 '+x.created+' ／ 次の見直し '+x.due+' ／ 振り返り '+(x.reviews||[]).length+'件','muted'));
 const cnt=countRecordFor(x.characters,x.created,grade);row.append(p(`関連する学習記録 ${cnt.entries}件（${cnt.dates}日）｜ヒント ${cnt.hint}件｜休憩 ${cnt.breaks}件`,'muted'),p('※同じ学習の記録が複数機能に残る場合があります。学習回数とは一致しません。','tip'));
 row.append(button('振り返り・見直し →',()=>{currentGoal=x.id;reviewNotes='';reviewNext='';reviewOutcome='self';reviewState=x.status||'active';reviewMethod=x.method;reviewInterval='7';view='review';note='';render()},'primary'));c.append(row)}m.append(c);
 const guidance=card('この機能での記録の考え方');guidance.append(p('「できた」「できなかった」だけでなく、どの方法なら取り組めたか、本人が選べたか、休憩が必要だったかを観察します。書字を行わなかった場合は書けないと判定しません。'));guidance.append(p('観察と次の支援は先生が確認・記入するものです。自動判定ではなく、学校・保護者との相談に使う下書きです。','muted'));m.append(guidance);
 const exportCard=card('先生用のまとめ');exportCard.append(button('📋 支援のまとめ文を表示',()=>{view='export';render()},'primary'));if(view==='export'){}m.append(exportCard);
 if(view==='export'){exportView(m)}message(m);
}
function createView(m){const c=card('今週〜2週間の小さな目標');const previews=suggest(grade);c.append(p('対象の漢字を1〜5字選び、試したい方法と見直す日を決めます。目標の達成・未達成を自動判定する機能ではありません。','muted'));
 const inp=e('input','input');inp.type='text';inp.autocomplete='off';inp.placeholder='例：位 試 験';inp.maxLength=32;inp.value=entryChars;inp.addEventListener('input',()=>entryChars=inp.value);c.append(labelField('対象の漢字（1〜5字）',inp,'小学'+grade+'年生の配当漢字のみ登録できます。区切り文字は無視します。'));
 const rec=e('div','chips');for(const kan of previews)rec.append(button(kan,()=>{let arr=selectedChars(entryChars,grade);if(!arr.includes(kan)&&arr.length<5)arr.push(kan);entryChars=arr.join('');inp.value=entryChars},'chip'));c.append(p('記録からの候補（タップして追加）','tip'),rec);
 const select=selectBox(Object.entries(MODEL).map(([k,v])=>[k,v.title]),entryMethod,x=>entryMethod=x);c.append(labelField('まず試す学習方法',select));
 const due=selectBox([['7','1週間後'],['14','2週間後'],['30','1か月後']],entryDue,x=>entryDue=x);c.append(labelField('振り返る目安',due));c.append(p('次の見直しは予定です。休息が必要なときは延期・中断して構いません。','tip'));
 c.append(button('この目標を保存する',()=>{const chars=selectedChars(entryChars,grade);if(!chars.length){note='対象学年の漢字を1〜5字入力してください。';render();return}
 const all=read(),active=all.goals.filter(x=>Number(x.grade)===grade&&['active','adjusted'].includes(x.status));if(active.length>=3){note='継続中の目標は3件までです。ほかの目標を振り返り、一区切りにしてから作成してください。';render();return}
 const goal={id:all.nextId++,grade,characters:chars,method:entryMethod,created:today(),due:plusDays(entryDue),status:'active',reviews:[]};all.goals.push(goal);if(write(all)){view='list';note='目標を保存しました。本人の状況に合わせて途中で見直せます。'}else note='保存できませんでした。端末の保存領域を確認してください。';render();},'primary'),button('戻る',()=>{view='list';note='';render()}));m.append(c)}
function reviewView(m){const data=read(),g=data.goals.find(x=>String(x.id)===String(currentGoal)&&Number(x.grade)===grade);if(!g){view='list';render();return}
 const c=card('支援したことと、本人の様子を振り返る');c.append(e('div','bigkanji',g.characters.join('　')),p(MODEL[g.method]?.title||g.method,'label'),p('開始：'+g.created+' ／ 見直し予定：'+g.due,'muted'));
 const ctr=countRecordFor(g.characters,g.created,grade);const stats=e('div','stats');for(const [v,cap] of [[ctr.entries,'関連する取り組み記録'],[ctr.dates,'記録のある日'],[ctr.hint,'ヒントを使用'],[ctr.breaks,'休憩・中断']]){const b=e('div','stat');b.append(e('strong','statnum',v),p(cap,'muted'));stats.append(b)}c.append(stats,p('※これは端末に残る記録の件数で、習得や目標達成の評価ではありません。','tip'));
 const sel=selectBox(OBS,reviewOutcome,x=>reviewOutcome=x);c.append(labelField('今回、実際に観察したこと',sel));
 const area=e('textarea','area');area.rows=3;area.maxLength=500;area.placeholder='例：音声を聞いてから、3字のうち2字を自分で選んで確認した。途中で休憩を取った。';area.value=reviewNotes;area.addEventListener('input',()=>reviewNotes=area.value);c.append(labelField('本人の様子（任意・事実を記入）',area,'本人の発言は直接確認した場合だけ記載してください。'));
 const next=e('textarea','area');next.rows=3;next.maxLength=500;next.placeholder='例：次は2字に減らし、部品ヒントを先に提示する。';next.value=reviewNext;next.addEventListener('input',()=>reviewNext=next.value);c.append(labelField('次に試す支援（任意）',next));
 const newMethod=selectBox(Object.entries(MODEL).map(([k,v])=>[k,v.title]),reviewMethod,x=>reviewMethod=x);c.append(labelField('次に使う学習方法',newMethod));
 const newInterval=selectBox([['7','1週間後'],['14','2週間後'],['30','1か月後']],reviewInterval,x=>reviewInterval=x);c.append(labelField('次の見直し',newInterval));
 const status=selectBox(Object.entries(STATES),reviewState,x=>reviewState=x);c.append(labelField('目標の扱い',status));
 c.append(button('振り返りを保存する',()=>{const all=read(),x=all.goals.find(z=>String(z.id)===String(currentGoal)&&Number(z.grade)===grade);if(!x){note='対象の記録がありません。';view='list';render();return}
 x.reviews=Array.isArray(x.reviews)?x.reviews:[];x.reviews.push({date:today(),outcome:reviewOutcome,observation:sanitize(reviewNotes),next:sanitize(reviewNext),status:reviewState});if(x.reviews.length>40)x.reviews=x.reviews.slice(-40);x.status=reviewState;x.method=reviewMethod;if(reviewState==='active'||reviewState==='adjusted')x.due=plusDays(reviewInterval);
 if(write(all)){view='list';note='今回の振り返りを保存しました。以前の読み書きの記録は変更していません。'}else note='保存できませんでした。';render();},'primary'),button('目標一覧へ戻る',()=>{view='list';render()}));m.append(c);
 if(g.reviews?.length){const h=card('これまでの見直し');for(const x of g.reviews.slice().reverse().slice(0,8)){const row=e('div','history');row.append(e('strong','',x.date+'　'+(OBS.find(z=>z[0]===x.outcome)?.[1]||'')));if(x.observation)row.append(p(x.observation));if(x.next)row.append(p('次の支援：'+x.next,'muted'));h.append(row)}m.append(h)}
}
function summaryText(){const goals=read().goals.filter(x=>Number(x.grade)===grade).sort((a,b)=>String(b.created).localeCompare(String(a.created))).slice(0,20);const lines=[`Pono Learning Quest｜個別漢字支援の目標と見直し（v459）`,`小学${grade}年生｜作成日：${today()}`,'対象児童：＿＿＿＿＿＿（共有前に必要な場合のみ記入）',''];if(!goals.length)lines.push('目標の登録はありません。');
 for(const x of goals){const st=STATES[x.status]||'確認中';const cnt=countRecordFor(x.characters,x.created,grade);lines.push(`【${x.characters.join('・')}】${MODEL[x.method]?.title||x.method}`,`設定日：${x.created}／見直し予定：${x.due}／状態：${st}`,`関連学習記録：${cnt.entries}件、ヒントの記録：${cnt.hint}件（重複の可能性あり）`);for(const rv of (x.reviews||[]).slice(-3)){lines.push(`振り返り ${rv.date}：${OBS.find(y=>y[0]===rv.outcome)?.[1]||'確認'}${rv.observation?'／'+rv.observation:''}`,`次の支援：${rv.next||'（未記入）'}`)}lines.push('')}
 lines.push('※これは先生が実際の観察を確認して用いる支援記録です。漢字の習得や障害の程度を自動判定するものではありません。','※書字を実施していない場合は「書けない」と判定していません。','※共有する前に本人の意向・共有先・個人情報を確認してください。');return lines.join('\n')}
function download(txt){try{const blob=new Blob(['\uFEFF'+txt],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`Pono459_followup_grade${grade}_${today()}.txt`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);note='テキスト保存を開始しました。';render()}catch(_){note='ファイルを保存できませんでした。';render()}}
function exportView(m){const c=card('共有前に内容を確かめる');c.append(p('学習者名・IDは自動では含まれませんが、先生が書いた観察文は含まれます。必要な範囲だけ共有してください。','muted'));const pre=e('pre','preview',summaryText());c.append(pre,button('📄 まとめをテキスト保存',()=>download(summaryText()),'primary'),button('← 一覧に戻る',()=>{view='list';render()}));m.append(c)}
function inject(){if(ROOT.querySelector('.v459-page,.v459-entry'))return;const h=ROOT.querySelector('.top h1,h1');if(!h||!/^Pono Learning Quest|今日の学習/.test((h.textContent||'').trim()))return;const x=e('section','entry');x.append(e('strong','','🌱 学習後の目標と支援の見直し v459'),p('目標 → 試す方法 → 実際の観察 → 次の目標。小4・小5の漢字を1〜5字ずつ。','muted'),button('個別支援の目標を確認する →',home459,'primary'));(h.closest('.top')||h).insertAdjacentElement('afterend',x)}
let pending=false;new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;inject()})}).observe(ROOT,{childList:true,subtree:true});
window.ponoSupport459=home459;window.ponoSupport459Data={read,summaryText,countRecordFor,selectedChars};inject();
})();
