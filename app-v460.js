/* Pono Learning Quest v460 — review timeline with teacher-verified observations. */
(()=>{'use strict';
if(window.ponoTimeline460)return;
const ROOT=document.getElementById('app');if(!ROOT)return;
const BASE=()=>window.ponoTeacher457Data, GOALS=()=>window.ponoSupport459Data, PACK=()=>window.ponoKanji449Data;
const METHODS={voice:'音声で聞く・選ぶ',parts:'部品と言葉の手がかり',meaning:'意味や文章で考える',recall:'隠して思い出す',other:'本人が選んだ別の方法'};
const RESULTS={independent:'自分で方法を選んで取り組んだ',supported:'ヒントや支援を使って取り組んだ',adjusted:'学習方法や量を調整した',rest:'休憩・中断を選んだ',notyet:'その日は取り組まなかった',other:'そのほか（記述を参照）'};
const OUTCOMES={self:'自分で方法を選んで取り組めた',hint:'ヒントを使って取り組めた',change:'方法を変更して取り組めた',rest:'休憩を入れて取り組めた',difficult:'負担が大きく方法を見直した',notyet:'その日は取り組まなかった'};
const MODES={voice:'音声',parts:'部品',meaning:'意味・文章',recall:'思い出す'};
const x=(tag,cls='',value)=>{const n=document.createElement(tag);if(cls)n.className=cls.split(/\s+/).filter(Boolean).map(c=>'v460-'+c).join(' ');if(value!==undefined)n.textContent=String(value);return n};
const text=(t,cls='text')=>x('p',cls,t),head=t=>{const n=x('section','card');n.append(x('h2','heading',t));return n};
const now=()=>{let d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const ago=n=>{let d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-n);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const validDay=s=>{if(!/^20\d\d-\d\d-\d\d$/.test(String(s)))return false;const d=new Date(s+'T12:00:00');return !Number.isNaN(+d)&&`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`===s};
const clean=v=>String(v??'').trim().slice(0,500);
const object=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
function learner(){try{if(typeof profile!=='undefined'&&profile&&profile.id!=null&&String(profile.id).trim()&&String(profile.id)!=='trial')return String(profile.id)}catch(_){}return null}
function childActive(){try{return !!JSON.parse(localStorage.getItem('pono454-active-device')||'null')?.studentId}catch(_){return false}}
function ready(){return !!(BASE()&&typeof BASE().currentRecords==='function'&&GOALS()&&typeof GOALS().read==='function'&&PACK()?.items?.length===395)}
function storageKey(id=learner()){return 'pono460-verified-timeline:'+id}
function read(){if(!learner())return {id:1,entries:[]};try{const a=object(JSON.parse(localStorage.getItem(storageKey())||'null'));return {id:Number.isInteger(a.id)&&a.id>0?a.id:1,entries:Array.isArray(a.entries)?a.entries.filter(z=>z&&typeof z==='object').slice(-500):[]}}catch(_){return {id:1,entries:[]}}}
function persist(a){try{localStorage.setItem(storageKey(),JSON.stringify(a));return true}catch(_){return false}}
function makeTimeline(g,span){const base=BASE().currentRecords(),goalList=GOALS().read().goals||[],local=read().entries;
 const min=span==='all'?'0000-00-00':ago(Number(span)-1);const fits=n=>g==='all'||Number(n)===Number(g);
 const logs=base.events.filter(z=>fits(z.grade)&&validDay(z.date)&&z.date>=min);
 const goals=goalList.filter(z=>fits(z.grade)&&validDay(z.created)&&z.created<=now());
 const reviews=[];for(const goal of goals){for(const r of (Array.isArray(goal.reviews)?goal.reviews:[])){if(validDay(r.date)&&r.date>=min&&r.date<=now())reviews.push({date:r.date,g:goal.grade,chars:goal.characters||[],outcome:r.outcome,observation:r.observation||'',next:r.next||'',goal:goal.id})}}
 const entries=local.filter(z=>fits(z.grade)&&validDay(z.date)&&z.date>=min&&z.date<=now()).sort((a,b)=>String(b.date).localeCompare(String(a.date))||Number(b.id)-Number(a.id));
 const started=goals.filter(z=>z.created>=min).length;
 const days=new Map();const get=d=>{if(!days.has(d))days.set(d,{date:d,events:[],reviews:[],notes:[],goals:[]});return days.get(d)};
 for(const z of logs)get(z.date).events.push(z);
 for(const z of reviews)get(z.date).reviews.push(z);
 for(const z of entries)get(z.date).notes.push(z);
 for(const z of goals)if(z.created>=min)get(z.created).goals.push(z);
 const rows=[...days.values()].sort((a,b)=>b.date.localeCompare(a.date));
 return {rows,logs,entries,reviews,started,days:rows.length,hints:logs.filter(z=>z.hint).length,rests:logs.filter(z=>z.break).length,goals};
}
let selectedId=null,grade='all',period=30,mode='list',note='',editing=null,includeNotes=false;
let edit={date:now(),grade:4,chars:'',method:'parts',result:'supported',observation:'',next:'',voice:''};
const btn=(t,fn,extra='')=>{let b=x('button','btn '+extra,t);b.type='button';b.addEventListener('click',()=>{if(selectedId!==learner()){note='学習者が変わりました。選択を確認してください。';return open()}if(childActive()){note='子ども用画面の使用中です。先生へ返却してから開いてください。';return open()}fn()});return b};
function select(opts,value,fn){const s=x('select','select');for(const [v,t] of opts){const o=x('option','',t);o.value=v;s.append(o)}s.value=String(value);s.addEventListener('change',()=>fn(s.value));return s}
function field(label,node,tip=''){const l=x('label','field');l.append(x('span','label',label),node);if(tip)l.append(text(tip,'tip'));return l}
function top(){ROOT.replaceChildren();const m=x('main','page');const bar=x('nav','nav');bar.append(btn('← トップへ戻る',()=>{try{if(typeof home==='function')return home()}catch(_){}ROOT.replaceChildren(text('アプリのトップから開き直してください。'))}),x('h1','title','🌱 支援の経過を振り返る v460'));m.append(bar);ROOT.append(m);try{window.scrollTo(0,0)}catch(_){}return m}
function open(){selectedId=learner();mode='list';includeNotes=false;note='';render()}
function toolbar(m){const tabs=x('div','tabs');for(const [key,t] of [['all','4・5年生'],[4,'小学4年'],[5,'小学5年']])tabs.append(btn(t,()=>{grade=key;render()},String(grade)===String(key)?'on':''));m.append(tabs);
const ps=x('div','tabs');for(const [key,t]of[[7,'直近7日'],[30,'直近30日'],[90,'直近90日'],['all','全期間']])ps.append(btn(t,()=>{period=key;render()},String(period)===String(key)?'on':''));m.append(ps)}
function barChart(m,s){const last=[];for(let i=6;i>=0;i--){let date=ago(i);last.push({date,n:s.logs.filter(z=>z.date===date).length,notes:s.entries.filter(z=>z.date===date).length})}const max=Math.max(1,...last.map(z=>z.n));const c=head('直近7日の学習記録');const bars=x('div','bars');for(const day of last){const box=x('div','bar-col');box.append(x('strong','count',day.n));const track=x('div','track'),b=x('div','bar');b.style.height=(day.n?Math.max(5,day.n/max*100):0)+'%';b.title=day.date+'：'+day.n+'件';track.append(b);box.append(track,text(day.date.slice(5).replace('-','/'),'day'));bars.append(box)}c.append(bars,text('棒の高さは記録件数です。同じ学習が複数の機能に記録されている場合があり、学力の伸びや正答率を表すものではありません。','tip'));m.append(c)}
function summary(s){return `Pono Learning Quest｜支援の経過（v460）\n対象：${grade==='all'?'小学4・5年':`小学${grade}年`}／${period==='all'?'全期間':`直近${period}日`}\n学習記録：${s.logs.length}件（重複の可能性あり）／記録がある日：${s.days}日\n先生の観察：${s.entries.length}件／目標の振り返り：${s.reviews.length}件\nヒント使用の記録：${s.hints}件／休憩・中断の記録：${s.rests}件\n※記録件数や頻度だけで学力や成長を判定していません。\n※書字をしていないことは「書けない」を意味しません。`}
function chronological(m,s){const c=head('日付ごとの取り組み');if(!s.rows.length)c.append(text('この期間の記録はありません。先生の観察を追加するか、学習後にもう一度確認してください。','muted'));
for(const d of s.rows.slice(0,90)){const details=x('details','date-group');const header=x('summary');header.append(x('strong','',d.date),x('span','count-chip',`学習${d.events.length}件・観察${d.notes.length}件・目標確認${d.reviews.length}件`));details.append(header);
 if(d.goals.length){for(const q of d.goals){const div=x('div','event');div.append(x('b','',`目標を設定｜小学${q.grade}年 ${Array.isArray(q.characters)?q.characters.join(' '):''}`),text('方法：'+(METHODS[q.method]||'本人と確認')+'／見直し：'+(q.due||'未設定'),'small'));details.append(div)}}
 if(d.events.length){const by=new Map();for(const e of d.events){let k=`${e.source}:${e.method}:${e.outcome}`;let v=by.get(k)||{count:0,chars:new Set(),hint:0};v.count++;if(e.c)v.chars.add(e.c);if(e.hint)v.hint++;by.set(k,v)}for(const [key,v] of by){const [source,method,outcome]=key.split(':');const div=x('div','event');div.append(text(`学習の取り組み｜${source.replace('v','バージョン')} ／ ${method} ／ ${outcome}：${v.count}件`,'compact'),text(`対象：${[...v.chars].slice(0,24).join('・')||'未記録'}${v.chars.size>24?' ほか':''}${v.hint?' ／ ヒントの記録 '+v.hint+'件':''}`,'small'));details.append(div)}}
 for(const rv of d.reviews){const div=x('div','event');div.append(x('b','','目標の見直し｜'+(OUTCOMES[rv.outcome]||'先生による記録')));if(rv.observation)div.append(text('観察：'+rv.observation,'compact'));if(rv.next)div.append(text('次に試すこと：'+rv.next,'small'));details.append(div)}
 for(const z of d.notes){const div=x('div','observation');div.append(x('b','',`先生の観察｜小学${z.grade}年 ${z.chars||''}`),text(METHODS[z.method]||'方法の記録なし','small'),text(RESULTS[z.result]||'取り組みを確認','compact'));if(z.observation)div.append(text('実際に見た様子：'+z.observation,'compact'));if(z.next)div.append(text('次の支援：'+z.next,'small'));if(z.voice)div.append(text('本人の言葉（直接確認）：'+z.voice,'small'));div.append(btn('編集',()=>{editing=z.id;edit={...z};mode='edit';render()}));details.append(div)}
 c.append(details)}if(s.rows.length>90)c.append(text('画面では新しい90件の日付を表示します。集計と書き出しは選択した期間全体が対象です。','tip'));m.append(c)}
function inputNode(v,prop,area=false){const node=x(area?'textarea':'input',area?'area':'input');if(area){node.rows=3;node.maxLength=500;node.placeholder='確認できた事実を短く記入（任意）'}else{node.type='text';node.autocomplete='off';node.maxLength=60}node.value=v;node.addEventListener('input',()=>edit[prop]=node.value);return node}
function editor(m){const c=head(editing===null?'実際に観察したことを記録する':'観察記録を編集する');c.append(text('できた・できないの判定よりも、本人が試した方法や必要だった配慮を、実際に見た事実で残します。','muted'));
const date=x('input','input');date.type='date';date.value=edit.date;date.max=now();date.min='2020-01-01';date.addEventListener('change',()=>edit.date=date.value);c.append(field('観察した日',date));
const gr=select([[4,'小学4年'],[5,'小学5年']],edit.grade,z=>edit.grade=Number(z));c.append(field('漢字の学年',gr));
c.append(field('取り組んだ漢字（任意・最大5字）',inputNode(edit.chars,'chars'),'別の学年の字や、漢字を使わなかった活動は空欄でも構いません。'));
c.append(field('試した方法',select(Object.entries(METHODS),edit.method,z=>edit.method=z)));
c.append(field('観察した取り組み',select(Object.entries(RESULTS),edit.result,z=>edit.result=z)));
c.append(field('実際に見た様子（任意）',inputNode(edit.observation,'observation',true),'例：2字に減らすと、本人から「もう一回」と声があり、休憩後に続きを選んだ。'));
c.append(field('次に試す支援（任意）',inputNode(edit.next,'next',true)));
c.append(field('本人の言葉（直接聞いた場合のみ・任意）',inputNode(edit.voice,'voice',true),'推測で本人の気持ちを記入しないでください。'));
c.append(btn('この観察を保存',()=>{if(!validDay(edit.date)||edit.date>now()){note='正しい日付を選んでください。';render();return}if(![4,5].includes(Number(edit.grade))){note='学年を選んでください。';render();return}const allowed=new Set(PACK().items.filter(k=>Number(k.g)===Number(edit.grade)).map(k=>k.c));const chars=[...String(edit.chars||'')].filter(c=>allowed.has(c));let set=[...new Set(chars)].slice(0,5);if([...String(edit.chars||'').replace(/[\s、・,，]/g,'')].some(c=>!allowed.has(c))){note='漢字は選んだ学年の配当漢字だけにしてください。対象字がない場合は空欄にできます。';render();return}
const d=read();let row={date:edit.date,grade:Number(edit.grade),chars:set.join(''),method:Object.hasOwn(METHODS,edit.method)?edit.method:'other',result:Object.hasOwn(RESULTS,edit.result)?edit.result:'other',observation:clean(edit.observation),next:clean(edit.next),voice:clean(edit.voice)};
if(editing!==null){let idx=d.entries.findIndex(z=>Number(z.id)===Number(editing));if(idx>=0)d.entries[idx]={...d.entries[idx],...row}}else{d.entries.push({id:d.id++,...row})}d.entries=d.entries.slice(-500);if(persist(d)){mode='list';note='観察を保存しました。以前の学習記録や読み書きの評価は変更していません。';editing=null}else note='端末に保存できませんでした。保存領域を確認してください。';render()},'primary'),btn('保存せず戻る',()=>{mode='list';render()}));
if(editing!==null)c.append(btn('この観察だけを削除',()=>{if(!window.confirm('この観察記録だけを削除しますか？ 元の学習記録や目標は削除されません。'))return;const d=read();d.entries=d.entries.filter(z=>Number(z.id)!==Number(editing));if(persist(d)){editing=null;mode='list';note='観察を削除しました。'}else note='削除を保存できませんでした。';render()},'danger'));
m.append(c)}
function makeCsv(s,include){const rows=[['日付','学年','種別','漢字','学習方法','取り組み','件数','観察','次の支援','本人の言葉']];for(const d of s.rows.slice().reverse()){
for(const z of d.events)rows.push([z.date,z.grade,z.source,z.c,z.method,z.outcome,1,'','','']);
for(const z of d.reviews)rows.push([z.date,z.g,'目標見直し',z.chars.join('・'),'',OUTCOMES[z.outcome]||'確認',1,include?z.observation:'',include?z.next:'','']);
for(const z of d.notes)rows.push([z.date,z.grade,'先生の観察',z.chars,METHODS[z.method]||'',RESULTS[z.result]||'',1,include?z.observation:'',include?z.next:'',include?z.voice:'']);
for(const z of d.goals)rows.push([z.created,z.grade,'目標を設定',(z.characters||[]).join('・'),METHODS[z.method]||'','',1,'','',''])}
const cell=a=>{let t=String(a??'');if(/^[=+\-@\t\r]/.test(t))t="'"+t;return '"'+t.replace(/"/g,'""')+'"'};return '\uFEFF'+rows.map(r=>r.map(cell).join(',')).join('\r\n')}
function download(value,file,type){const url=URL.createObjectURL(new Blob([value],{type}));const a=document.createElement('a');a.href=url;a.download=file;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function exportPanel(m,s){const c=head('共有する前に確認する');c.append(text('学習者名・IDは含めません。自由記述の観察・本人の言葉は初期状態では出力しません。','muted'));const check=x('input','check');check.type='checkbox';check.checked=includeNotes;check.addEventListener('change',()=>{includeNotes=check.checked;render()});const lab=x('label','check-label');lab.append(check,x('span','','先生の観察文・本人の言葉をCSVに含める（共有先を必ず確認）'));c.append(lab,x('pre','preview',summary(s)));
c.append(btn('CSVで保存する',()=>{try{download(makeCsv(s,includeNotes),`Pono460_timeline_${grade}_${period}_${now()}.csv`,'text/csv;charset=utf-8');note='CSVの保存を開始しました。'}catch(_){note='保存できませんでした。'}render()},'primary'),btn('学校・保護者向けレポート v458',()=>window.ponoTeacher458?.()),btn('目標と振り返り v459',()=>window.ponoSupport459?.()));m.append(c)}
function render(){const m=top(),i=head('目標と実際の取り組みを、日付で振り返る');i.append(text('学習の回数だけで変化を判断せず、本人が使えた方法や休憩、先生が見た様子を記録します。'));m.append(i);
if(!selectedId){const c=head('学習者を選んでください');c.append(text('個別の学習内容は、トップで学習者を選んでから表示します。体験モードでは開けません。'));m.append(c);return}
if(childActive()){const c=head('子ども用の画面が使用中です');c.append(text('先生へ端末が返却されたことを確認し、学習画面を終了してから開いてください。'));m.append(c);return}
if(!ready()){const c=head('以前の教材ファイルが必要です');c.append(text('v449・v457・v459の教材ファイルが同じフォルダーにあることを確認してください。'));m.append(c);return}
toolbar(m);if(mode==='edit'){editor(m);if(note)m.append(text(note,'notice'));return}
const s=makeTimeline(grade,period);const stats=head('この期間の記録');const figures=x('div','stats');for(const [num,label] of [[s.logs.length,'学習記録（重複の可能性）'],[s.days,'記録のある日'],[s.entries.length,'先生の観察'],[s.reviews.length,'目標の振り返り']]){const box=x('div','metric');box.append(x('strong','big',num),text(label,'small'));figures.append(box)}stats.append(figures,text(`ヒントの記録 ${s.hints}件 ／ 休憩・中断の記録 ${s.rests}件`,'muted'),text('「取り組みが増えた＝学力が伸びた」という評価はしません。正答率や書字能力の自動判定ではありません。','tip'));m.append(stats);
const actions=x('div','actions');actions.append(btn('＋ 先生の観察を追加する',()=>{editing=null;edit={date:now(),grade:grade==='all'?4:Number(grade),chars:'',method:'parts',result:'supported',observation:'',next:'',voice:''};mode='edit';render()},'primary'),btn('v459｜目標と見直し',()=>window.ponoSupport459?.()));m.append(actions);
barChart(m,s);chronological(m,s);exportPanel(m,s);
const guide=head('記録を支援につなげる視点');guide.append(text('「今日はどの方法で取り組めたか」「負担はどう変わったか」「本人は何を選んだか」を、日付ごとに比べることができます。変化の理由は学習記録だけでは判断できません。','muted'));guide.append(text('この画面の観察文は端末内に保存されます。個別記録には保護が必要です。必要に応じてv456でバックアップし、共用端末をロックしてください。','tip'));m.append(guide);if(note)m.append(text(note,'notice'))}
function inject(){if(ROOT.querySelector('.v460-page,.v460-entry'))return;const h=ROOT.querySelector('.top h1,h1');if(!h||!/^Pono Learning Quest|今日の学習/.test((h.textContent||'').trim()))return;const s=x('section','entry');s.append(x('strong','','🌱 支援の経過を振り返る v460'),text('学習履歴・目標の見直し・先生の観察を日付ごとに整理。','small'),btn('支援の経過を見る →',open,'primary'));(h.closest('.top')||h).insertAdjacentElement('afterend',s)}
let scheduled=false;new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;inject()})}).observe(ROOT,{childList:true,subtree:true});
window.ponoTimeline460=open;window.ponoTimeline460Data={makeTimeline,makeCsv,read,summary};inject();
})();
