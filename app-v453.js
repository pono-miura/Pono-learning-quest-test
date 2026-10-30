/* Pono Learning Quest v453 — teacher-guided quick kanji sessions; no handwriting inference. */
(()=>{'use strict';
if(window.ponoKanji453)return;
const ROOT=document.getElementById('app');if(!ROOT)return;
const KANJI=window.ponoKanji449Data, REC=window.ponoKanji451Data;
const MODES={voice:'聞いて考える',parts:'部品で考える',meaning:'言葉と文で考える',recall:'隠して思い出す'};
const RESULTS={self:'自分の方法で取り組めた',hint:'ヒントが役立った',change:'方法を変えるとよさそう',rest:'休憩・中断を選んだ'};
const PART={'亻':'にんべん','扌':'てへん','氵':'さんずい','忄':'りっしんべん','阝':'こざとへん','宀':'うかんむり','冖':'わかんむり','辶':'しんにょう','艹':'くさかんむり','⺮':'たけかんむり','礻':'しめすへん','衤':'ころもへん','飠':'しょくへん','訁':'ごんべん','糸':'いとへん','金':'かねへん','刂':'りっとう','攵':'のぶん','頁':'おおがい','疒':'やまいだれ','厂':'がんだれ','广':'まだれ','木':'き','火':'ひ','水':'みず','土':'つち','女':'おんな','立':'たつ','口':'くち','心':'こころ','竹':'たけ','禾':'のぎ','日':'ひ','月':'つき','目':'め','人':'ひと','力':'ちから','貝':'かい','寸':'すん','馬':'うま','石':'いし','ノ':'ななめ線','丶':'点','丨':'たて線','一':'横線','ヨ':'ヨの形','冫':'にすい'};
const PLACE={'左右':['左','右'],'上下':['上','下'],'囲み':['外側','内側'],'交差':['線の部分①','線の部分②'],'重なり':['部分①','部分②']};
const ready=()=>!!(KANJI&&Array.isArray(KANJI.items)&&KANJI.items.length===395&&REC&&typeof REC.ranked==='function');
const student=()=>{try{if(typeof profile!=='undefined'&&profile&&profile.id!==null&&profile.id!==undefined&&String(profile.id)!=='')return String(profile.id)}catch(_){}return 'trial'};
const KEY=()=>`pono453-quick:${student()}`;
const clean=x=>x&&typeof x==='object'&&!Array.isArray(x)?x:{};
const day=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
function weekStart(){const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-(d.getDay()+6)%7);return day(d)}
function readKey(k){try{return clean(JSON.parse(localStorage.getItem(k)||'null'))}catch(_){return {}}}
function load(){return readKey(KEY())}
let notice='',grade=4,limit=3,preferred='auto',big=false,slow=false,choose=[],queue=[],at=0,revealed=false,hinted=false,mode='voice',results=[],phase='home';
function save(data){try{localStorage.setItem(KEY(),JSON.stringify(data));notice='';return true}catch(_){notice='保存できませんでした。端末の空き容量や設定を確認してください。';return false}}
function history(){const d=load();return Array.isArray(d.events)?d.events:[]}
function remember(){const d=load(),events=history();const x=results[results.length-1];events.push({...x,at:new Date().toISOString(),date:day(),grade});return save({...d,events:events.slice(-1000)})}
const kid=k=>`${k.g}-${k.c}`;
const byId=id=>ready()?KANJI.items.find(k=>kid(k)===id):null;
const pool=()=>ready()?KANJI.items.filter(k=>k.g===grade):[];
function ranked(){return ready()?REC.ranked(grade).filter(x=>x&&x.k&&x.k.g===grade):[]}
function plan(){const w=readKey(`pono452-support-week:${student()}`);return clean(w.plans)[`${grade}:${weekStart()}`]||null}
function suggestion(){const w=plan(),targets=Array.isArray(w&&w.targets)?w.targets:[];let xs=[];for(const t of targets){const k=byId(t.id);if(k&&k.g===grade&&!xs.some(x=>kid(x.k)===kid(k)))xs.push({k,method:MODES[t.mode]?t.mode:'meaning',from:'今週のプラン'})}for(const r of ranked())if(!xs.some(x=>kid(x.k)===kid(r.k)))xs.push({k:r.k,method:MODES[r.method]?r.method:'meaning',from:r.due?'復習日':r.needsHelp?'以前ヒントを使用':'おすすめ'});return xs}
function css(t,c='',s){const e=document.createElement(t);if(c)e.className=c.split(' ').filter(Boolean).map(x=>'v453-'+x).join(' ');if(s!==undefined)e.textContent=String(s);return e}
function p(s,c='text'){return css('p',c,s)}
function button(s,fn,c=''){const b=css('button','btn '+c,s);b.type='button';b.addEventListener('click',fn);return b}
function card(s){const d=css('section','card');d.append(css('h2','card-title',s));return d}
function stop(){try{speechSynthesis.cancel()}catch(_){}}
function speak(s){if(!('speechSynthesis'in window)){notice='この端末は音声読み上げに対応していません。';return false}try{stop();const u=new SpeechSynthesisUtterance(String(s));u.lang='ja-JP';u.rate=slow?.65:.91;speechSynthesis.speak(u);return true}catch(_){notice='読み上げられませんでした。文字で確認してください。';return false}}
function leave(){stop();if(typeof home==='function'){try{return home()}catch(_){}}ROOT.replaceChildren(p('トップに戻る場合はページを再読み込みしてください。'))}
function page(title,back=home453,child=false){stop();ROOT.replaceChildren();const main=css('main','page'+(child?' child':'')+(big?' big':'')),nav=css('div','nav');nav.append(button('← もどる',back),css('h1','title',title));main.append(nav);ROOT.append(main);try{window.scrollTo(0,0)}catch(_){}return main}
function tabs(m,fn=home453){const t=css('div','tabs');for(const g of [4,5]){const b=button(`小学${g}年`,()=>{grade=g;choose=[];fn()},g===grade?'on':'');b.setAttribute('aria-pressed',String(g===grade));t.append(b)}m.append(t)}
function status(m){m.append(p(student()==='trial'?'現在は体験用の記録です。学習者別に保存する場合は、トップ画面で学習者を選んでください。':'トップ画面で選択中の学習者にだけ、今回の記録を保存します。','muted'));if(notice)m.append(p(notice,'warn'))}
function buttonsRange(m){const a=css('div','choices');for(const n of [3,5]){const b=button(n+'字',()=>{limit=n;home453()},limit===n?'on':'');b.setAttribute('aria-pressed',String(limit===n));a.append(b)}m.append(a)}
function home453(){phase='home';const m=page('🌷 今日の漢字｜先生の準備 v453',leave);tabs(m);
 if(!ready()){const c=card('前の教材を確認してください');c.append(p('v449・v451の漢字データが読み込めません。app-v449.js と app-v451.js が残っているか確認してください。'));m.append(c);return}
 const lead=card('先生が準備 → 子どもが学ぶ → 振り返る');lead.append(p('漢字の選び方は先生が調整できます。子ども用の画面には過去の評価や先生用メモを出さず、1字ずつ大きく表示します。'));lead.append(p('今日の学習数を選ぶ','small'));buttonsRange(lead);
 lead.append(button('🌱 今日の練習を準備する',prepare,'primary'),button('📋 今日の結果・先生用の記録を見る',teacher));m.append(lead);
 const w=plan(),c=card('今週のプランとおすすめ');if(w&&Array.isArray(w.targets))c.append(p(`v452で作成した今週のプラン：${w.targets.map(t=>byId(t.id)?.c).filter(Boolean).join('・')||'漢字未設定'}`,'small'));else c.append(p('今週のプランがまだない場合は、これまでの練習記録からおすすめを提案します。','small'));
 for(const x of suggestion().slice(0,5)){const z=css('div','row');z.append(css('b','glyph',x.k.c),p(`${x.k.word}（${x.k.kana}）｜${x.from}`,'small'));c.append(z)}c.append(button('v452｜週間プランを編集',()=>window.ponoKanji452?.()));m.append(c);
 const links=card('ほかの学習につなげる');links.append(button('v451｜学習方法を選ぶ',()=>window.ponoKanji451?.()),button('v450｜読み・形・書字のまとめ',()=>window.ponoKanji450?.()));m.append(links);status(m)}
function prepare(){phase='prepare';if(!ready())return home453();const m=page('✏️ 今日の漢字を決める',home453);tabs(m,prepare);const items=suggestion();if(!choose.length)choose=items.slice(0,limit).map(x=>kid(x.k));const c=card('取り組む漢字｜最大5字');c.append(p('下の「外す」「追加する」で自由に変更できます。選んだ順に子ども用の画面へ進みます。','small'));
 for(const id of choose){const k=byId(id);if(!k)continue;const row=css('div','row');row.append(css('b','glyph',k.c),p(k.word+'（'+k.kana+'）','small'),button('外す',()=>{choose=choose.filter(x=>x!==id);prepare()},'quiet'));c.append(row)}
 const pref=css('label','field');pref.append(css('span','label','最初に使う方法'));const sel=css('select','select');const o=css('option','','漢字ごとの提案');o.value='auto';sel.append(o);for(const [id,name]of Object.entries(MODES)){const x=css('option','',name);x.value=id;sel.append(x)}sel.value=preferred;sel.addEventListener('change',()=>preferred=sel.value);pref.append(sel);c.append(pref);
 const flags=css('div','choices');flags.append(button(big?'文字：大きめ ✓':'文字：標準',()=>{big=!big;prepare()},big?'on':''),button(slow?'音声：ゆっくり ✓':'音声：ふつう',()=>{slow=!slow;prepare()},slow?'on':''));c.append(flags);
 c.append(button('子ども用の画面で始める →',start,'primary'));m.append(c);
 const f=card('入れ替える候補');const inp=css('input','search');inp.type='search';inp.placeholder='漢字・読み・言葉で検索';inp.setAttribute('aria-label','漢字を検索');f.append(inp);const list=css('div','list'),count=p('','small');f.append(count,list);m.append(f);
 function draw(){list.replaceChildren();const q=inp.value.trim();const rest=items.filter(x=>!choose.includes(kid(x.k))&&(!q||[x.k.c,x.k.kana,x.k.word].some(s=>s.includes(q))));count.textContent=`候補 ${rest.length}字（先頭24字を表示）`;for(const x of rest.slice(0,24)){const z=css('div','row');z.append(css('b','glyph',x.k.c),p(x.k.word+'｜'+x.from,'small'),button('追加する',()=>{if(choose.length>=5){notice='一度に選べるのは5字までです。';prepare();return}choose.push(kid(x.k));prepare()}));list.append(z)}}inp.addEventListener('input',draw);draw();status(m)}
function start(){if(!choose.length){notice='漢字を1字以上選んでください。';return prepare()}queue=choose.map(byId).filter(Boolean);at=0;results=[];renderChild()}
function partText(k){const pos=PLACE[k.layout]||PLACE.左右;return `${pos[0]}は「${PART[k.a]||k.a}」、${pos[1]}は「${PART[k.b]||k.b}」。${k.cue||k.tip||''}`}
function getMethod(k){if(MODES[preferred])return preferred;const x=suggestion().find(t=>kid(t.k)===kid(k));return x&&MODES[x.method]?x.method:'meaning'}
function renderChild(){phase='child';if(at>=queue.length)return done();const k=queue[at];hinted=false;revealed=false;mode=getMethod(k);const m=page(`🌱 きょうの かんじ ${at+1}/${queue.length}`,()=>{if(window.confirm('先生の画面に戻りますか？ まだ終わっていない漢字は記録されません。'))teacher()},true);
 const c=card('じぶんの やりかたで かんがえよう');c.append(p(`きょうの ほうほう：${MODES[mode]}`,'label'));const modes=css('div','choices');for(const [key,label]of Object.entries(MODES)){const b=button(label,()=>{mode=key;showPrompt()},mode===key?'on':'');modes.append(b)}c.append(modes);
 const question=css('div','prompt'),tip=css('div','hint'),ans=css('div','answer'),feedback=css('div','feedback');tip.hidden=true;ans.hidden=true;feedback.hidden=true;
 const guide=p('','prompt-line'),blank=css('div','blank','？');question.append(guide,blank);
 const tools=css('div','tools');tools.append(button('🔊 よみをきく',()=>speak(k.kana)),button('💡 ヒントをみる',()=>{hinted=true;tip.hidden=false}),button('👀 こたえをみる',()=>{revealed=true;blank.textContent=k.c;ans.hidden=false;feedback.hidden=false}),button('☕ きょうはここまで',()=>finishOne('rest')));question.append(tools);
 tip.append(p(partText(k)));
 ans.append(css('div','bigword',k.c),p(`${k.word}（${k.kana}）`,'answer-word'),p(`いみ：${k.meaning}`),p(`ぶん：${k.example.includes('□')?k.example.replace(/□/g,k.word):k.example}`),p('かたちのヒント：'+partText(k),'small'));
 feedback.append(p('できたことを えらぼう。かけたかどうかの テストではありません。','small'));
 for(const [key,label]of Object.entries(RESULTS)){feedback.append(button(label,()=>finishOne(key),'wide '+(key==='self'?'positive':'')))}
 c.append(question,tip,ans,feedback);m.append(c);m.append(p('つかれたときは、「休憩・中断」を選んでも大丈夫です。','muted'));
 function showPrompt(){[...modes.children].forEach((b,i)=>{const active=Object.keys(MODES)[i]===mode;b.classList.toggle('v453-on',active);b.setAttribute('aria-pressed',String(active))});const prompts={voice:`「${k.kana}」を きいて、どんな かんじか かんがえよう。`,parts:`「${k.kana}」の かんじは、どんな ぶひんで できているかな？`,meaning:`「${k.meaning}」という いみの ことばを かんがえよう。`,recall:`「${k.kana}」の かんじを、みないで おもいだそう。`};guide.textContent=prompts[mode];if(revealed){ans.hidden=false;feedback.hidden=false}}showPrompt();status(m)}
function finishOne(outcome){const k=queue[at];const record={id:kid(k),c:k.c,word:k.word,method:mode,outcome,hint:!!hinted,answered:!!revealed};results.push(record);const ok=remember();if(!ok){notice='記録の保存に失敗しました。端末の保存設定を確認してください。';return}if(outcome==='rest'){at=queue.length;done()}else{at++;renderChild()}}
function done(){phase='done';const m=page('🌸 きょうの ふりかえり',teacher,true),c=card('きょう 取り組んだ かんじ');c.append(css('div','large',`${results.length}字`));for(const x of results)c.append(p(`${x.c}　${RESULTS[x.outcome]}`,'record'));c.append(p('すべて書けるようになったという意味ではありません。取り組み方の記録です。','small'));c.append(button('先生と いっしょに ふりかえる',teacher,'primary'));m.append(c)}
function lastDays(n){const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-(n-1));return day(d)}
function summary(events){const unique=new Set(events.map(x=>x.id));return {n:events.length,kanji:unique.size,hints:events.filter(x=>x.hint||x.outcome==='hint').length,rest:events.filter(x=>x.outcome==='rest').length,changed:events.filter(x=>x.outcome==='change').length};}
function csvValue(s){const z=String(s??'');return '"'+(/^[=+\-@\t\r]/.test(z)?"'"+z:z).replace(/"/g,'""')+'"'}
function exportCSV(rows){const head=['日付','学年','漢字','言葉','使った方法','取り組み','部品ヒント','答えを表示'];const table=[head,...rows.map(e=>[e.date,e.grade,e.c,e.word,MODES[e.method]||e.method,RESULTS[e.outcome]||e.outcome,e.hint?'あり':'なし',e.answered?'あり':'なし'])];const txt='\ufeff'+table.map(r=>r.map(csvValue).join(',')).join('\r\n');try{const blob=new Blob([txt],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`Pono453_support_${day()}_grade${grade}.csv`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);notice='CSVの保存を開始しました。'}catch(_){notice='CSVを保存できませんでした。'}}
function teacher(){phase='teacher';const m=page('📋 先生用｜今日の学習と次の支援',home453);tabs(m,teacher);const d=history().filter(e=>e.grade===grade),todayEntries=d.filter(e=>e.date===day()),weekly=d.filter(e=>e.date>=lastDays(7)),s=summary(todayEntries);
 const a=card('今日の記録');const stats=css('div','metrics');for(const [value,label]of [[s.n,'取り組み回数'],[s.kanji,'取り組んだ漢字'],[s.hints,'ヒントを使った回数'],[s.rest,'休憩・中断']]){const q=css('div','metric');q.append(css('b','n',value),p(label,'small'));stats.append(q)}a.append(stats);a.append(p('この数は学習の取り組み状況です。「書ける」「習得した」という評価ではありません。','muted'));m.append(a);
 const b=card('取り組んだ方法と子どもの様子');const rows=todayEntries.slice().reverse();if(!rows.length)b.append(p('まだ今日の記録はありません。','muted'));for(const x of rows.slice(0,40)){const row=css('div','record');row.append(css('b','',x.c+' '+x.word),p(`${MODES[x.method]||'方法未記録'}｜${RESULTS[x.outcome]||'確認中'}${x.hint?'｜ヒントあり':''}`,'small'));b.append(row)}m.append(b);
 const c=card('次に試せること');if(!s.n)c.append(p('まずは1〜3字を選び、本人の取り組みやすさを観察しましょう。'));if(s.hints)c.append(p('ヒントが役立った漢字は、次回も必要な手がかりを提示してから、少しずつ減らせるか本人と相談できます。'));if(s.changed)c.append(p('方法の変更が役立ちそうな記録があります。声・部品・文脈など、選択肢を提示してみましょう。'));if(s.rest)c.append(p('休憩した記録があります。問題数や時間を少なくしても構いません。'));if(s.n&&!s.hints&&!s.changed&&!s.rest)c.append(p('取り組めた方法を本人に確かめ、少し日を空けてもう一度思い出せるか試してみましょう。'));c.append(p('提案は記録の整理であり、書字能力・障害の程度の判定ではありません。','muted'));m.append(c);
 const csv=card('先生用の記録を残す');csv.append(p(`直近7日間の記録：${weekly.length}件。個人名や自由記述は出力せず、選択中の学習者の記録だけを出力します。共有先を確認してからお使いください。`));csv.append(button('直近7日間の記録をCSV保存',()=>{exportCSV(weekly);teacher()},'primary'),button('v452｜週間プランへ',()=>window.ponoKanji452?.()),button('v450｜読み・形・書字の確認へ',()=>window.ponoKanji450?.()),button('もう一度練習を準備する',()=>{choose=[];prepare()}));m.append(csv);status(m)}
function inject(){if(ROOT.querySelector('.v453-page,.v453-entry'))return;const h=ROOT.querySelector('.top h1,h1');if(!h||!/^Pono Learning Quest|今日の学習/.test((h.textContent||'').trim()))return;const box=css('section','entry');box.append(css('strong','','🌷 今日の3〜5字｜先生の準備と子どもの学習 v453'),p('先生が漢字を選び、子どもは大きな画面で1字ずつ。学習後は方法と取り組みを確認できます。','small'),button('今日の漢字学習を開く →',home453,'primary'));(h.closest('.top')||h).insertAdjacentElement('afterend',box)}
let pending=false;new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;inject()})}).observe(ROOT,{childList:true,subtree:true});
window.ponoKanji453=home453;window.ponoKanji453Data={load,history,plan,suggestion,summary,weekStart};inject();
})();
