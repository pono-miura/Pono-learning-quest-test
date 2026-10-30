/* Pono Learning Quest v454 — child handoff, resume, teacher review. Local-only, not access authentication. */
(()=>{'use strict';
if(window.ponoKanji454)return;
const ROOT=document.getElementById('app');if(!ROOT)return;
const K=window.ponoKanji449Data, REC=window.ponoKanji451Data;
const METHODS={voice:'音声で考える',parts:'部品を考える',meaning:'意味から考える',recall:'見ないで思い出す'};
const OUTCOMES={self:'自分で思い出せた',hint:'ヒントで考えられた',change:'方法を変えて考えた',rest:'休憩・中断した'};
const NAMES={'亻':'にんべん','扌':'てへん','氵':'さんずい','忄':'りっしんべん','阝':'こざとへん','宀':'うかんむり','冖':'わかんむり','辶':'しんにょう','艹':'くさかんむり','⺮':'たけかんむり','礻':'しめすへん','衤':'ころもへん','訁':'ごんべん','刂':'りっとう','攵':'のぶん','頁':'おおがい','疒':'やまいだれ','厂':'がんだれ','广':'まだれ','木':'き','火':'ひ','水':'みず','土':'つち','女':'おんな','立':'たつ','口':'くち','心':'こころ','竹':'たけ','禾':'のぎ','日':'ひ','月':'つき','目':'め','人':'ひと','力':'ちから','貝':'かい','寸':'すん','馬':'うま','石':'いし','丶':'点','丨':'たて線','一':'横線'};
const POS={左右:['左','右'],上下:['上','下'],囲み:['外','中'],交差:['線①','線②'],重なり:['部分①','部分②']};
const ready=()=>!!(K&&Array.isArray(K.items)&&K.items.length===395);
const student=()=>{try{if(typeof profile!=='undefined'&&profile&&profile.id!==undefined&&profile.id!==null&&String(profile.id)!=='')return String(profile.id)}catch(_){}return 'trial'};
const key=()=>`pono454-handoff:${student()}`;
const ACTIVE_KEY='pono454-active-device';
const today=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const kid=k=>`${k.g}-${k.c}`;
const byId=id=>ready()?K.items.find(k=>kid(k)===id):null;
const safe=x=>x&&typeof x==='object'&&!Array.isArray(x)?x:{};
function loadRaw(name){try{return safe(JSON.parse(localStorage.getItem(name)||'null'))}catch(_){return {}}}
function read(){return loadRaw(key())}
let error='',grade=4,limit=3,pick=[],large=false,slow=true,phase='home';
function store(data){try{localStorage.setItem(key(),JSON.stringify(data));return true}catch(_){error='この端末に記録を保存できませんでした。空き容量や設定を確認してください。';return false}}
function currentActive(){return loadRaw(ACTIVE_KEY)}
function saveActive(x){try{localStorage.setItem(ACTIVE_KEY,JSON.stringify(x));return true}catch(_){error='学習の一時保存ができません。';return false}}
function clearActive(){try{localStorage.removeItem(ACTIVE_KEY)}catch(_){}}
const E=(tag,cls='',val)=>{const n=document.createElement(tag);if(cls)n.className=cls.split(' ').map(x=>'v454-'+x).join(' ');if(val!==undefined)n.textContent=String(val);return n};
const p=(text,cls='text')=>E('p',cls,text);
function btn(text,fn,cls=''){const n=E('button','btn '+cls,text);n.type='button';n.addEventListener('click',fn);return n}
function card(text){const n=E('section','card');n.append(E('h2','card-title',text));return n}
function speechStop(){try{speechSynthesis.cancel()}catch(_){}}
function speak(text){if(!('speechSynthesis'in window)){error='読み上げに非対応の端末です。';return}try{speechStop();const u=new SpeechSynthesisUtterance(text);u.lang='ja-JP';u.rate=slow?.68:.96;speechSynthesis.speak(u)}catch(_){error='読み上げられませんでした。'}}
function homeOriginal(){speechStop();if(typeof home==='function'){try{home();return}catch(_){}}ROOT.replaceChildren(p('トップ画面に戻る場合はページを再読み込みしてください。'))}
function page(title,back=home454){speechStop();ROOT.replaceChildren();const m=E('main','page');const nav=E('div','nav');nav.append(btn('← もどる',back),E('h1','title',title));m.append(nav);ROOT.append(m);try{window.scrollTo(0,0)}catch(_){}return m}
function tabs(m,call){const z=E('div','tabs');for(const g of [4,5]){const b=btn(`小学${g}年`,()=>{grade=g;pick=[];call()},g===grade?'on':'');b.setAttribute('aria-pressed',String(grade===g));z.append(b)}m.append(z)}
function status(m){m.append(p(student()==='trial'?'体験用の記録として保存します。個別記録を残すにはトップで学習者を選択してください。':'現在選択中の学習者の記録だけを使います。','note'));if(error)m.append(p(error,'warn'))}
function weekly(){const w=loadRaw(`pono452-support-week:${student()}`),d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-(d.getDay()+6)%7);const v=safe(w.plans)[`${grade}:${today(d)}`];return Array.isArray(v?.targets)?v.targets:[]}
function ranked(){if(!REC||typeof REC.ranked!=='function')return[];try{return REC.ranked(grade).filter(x=>x&&x.k&&x.k.g===grade)}catch(_){return[]}}
function options(){if(!ready())return[];const output=[],ids=new Set();const put=(k,reason,method)=>{if(k&&k.g===grade&&!ids.has(kid(k))){ids.add(kid(k));output.push({k,reason,method:METHODS[method]?method:'meaning'})}};
for(const t of weekly())put(byId(t.id),'今週のプラン',t.mode);
for(const x of ranked())put(x.k,x.due?'復習日':x.needsHelp?'ヒントが必要だった字':'おすすめ',x.method);
for(const k of K.items)if(k.g===grade)put(k,'未選択の候補','meaning');return output}
function session(){const d=read().draft;return d&&Array.isArray(d.ids)&&d.ids.length&&Number.isInteger(d.step)?d:null}
function home454(){phase='home';const m=page('🌼 きょうの漢字｜画面の受け渡し v454',homeOriginal);tabs(m,home454);
if(!ready()){m.append(p('v449のデータが読み込めません。app-v449.jsを残してください。','warn'));return}
const c=card('先生が準備し、子どもに渡す');c.append(p('大きな子ども用画面で1字ずつ学びます。途中で休憩しても、同じところから再開できます。'));
const d=session();if(d&&d.studentId===student())c.append(btn(`📖 続きから再開（${d.step+1}/${d.ids.length}字）`,()=>startExisting(),'primary'));
c.append(btn('✏️ 今日の漢字を準備する',prepare,'primary'),btn('📋 今日の記録を確認する',report));m.append(c);
const b=card('画面の切り替えについて');b.append(p('子ども用画面では学習に必要な内容だけを表示し、以前の評価や先生用メモは表示しません。途中の状態は端末内に一時保存されます。','small'),p('この表示切り替えはパスワード保護ではありません。端末全体の個人情報の保護には、端末ロックやアカウントの管理も必要です。','note'));m.append(b);status(m)}
function prepare(){phase='prepare';if(!ready())return home454();const m=page('✏️ 先生｜今日の漢字を準備',home454);tabs(m,prepare);
const c=card('学習する漢字を選ぶ');c.append(p('今週のプランと復習候補を優先します。最大5字まで入れ替え可能です。','small'));
const amounts=E('div','buttons');for(const n of [3,5]){const b=btn(`${n}字`,()=>{limit=n;pick=pick.slice(0,n);for(const x of options())if(pick.length<n&&!pick.includes(kid(x.k)))pick.push(kid(x.k));prepare()},limit===n?'on':'');b.setAttribute('aria-pressed',String(limit===n));amounts.append(b)}c.append(amounts);
if(!pick.length)pick=options().slice(0,limit).map(x=>kid(x.k));
for(const id of pick){const k=byId(id);if(!k)continue;const row=E('div','row');row.append(E('b','glyph',k.c),p(k.word+'（'+k.kana+'）','row-text'),btn('外す',()=>{pick=pick.filter(x=>x!==id);renderPrepareKeep()},'muted-btn'));c.append(row)}
const settings=E('div','buttons');settings.append(btn(large?'文字を大きく ✓':'文字を大きく',()=>{large=!large;prepare()},large?'on':''),btn(slow?'読み上げ：ゆっくり ✓':'読み上げ：ふつう',()=>{slow=!slow;prepare()},slow?'on':''));c.append(settings);
c.append(btn('🌱 子ども用の画面に切り替える',newSession,'primary'));m.append(c);
const select=card('漢字を入れ替える');const input=E('input','search');input.type='search';input.placeholder='漢字・読み・言葉で探す';input.setAttribute('aria-label','漢字検索');select.append(input);const list=E('div','list'),hint=p('','note');select.append(hint,list);m.append(select);
function draw(){list.replaceChildren();const term=input.value.trim();const xs=options().filter(x=>!pick.includes(kid(x.k))&&(!term||[x.k.c,x.k.kana,x.k.word].some(t=>t.includes(term))));hint.textContent=`候補 ${xs.length}字（先頭20字）`;
for(const x of xs.slice(0,20)){const row=E('div','row');row.append(E('b','glyph',x.k.c),p(`${x.k.word}｜${x.reason}`,'row-text'),btn('追加',()=>{if(pick.length>=5){error='一度に選べるのは5字までです。';prepare();return}pick.push(kid(x.k));prepare()}));list.append(row)}}input.addEventListener('input',draw);draw();status(m)}
function renderPrepareKeep(){prepare()}
function newSession(){if(!pick.length){error='漢字を1字以上選んでください。';prepare();return}const old=session();if(old&&old.step<old.ids.length){if(!window.confirm('前回の途中の学習を終了し、新しい学習を始めますか？ 完了済みの記録は残ります。'))return}
const d={studentId:student(),grade,ids:[...pick],step:0,events:[],large,slow,started:new Date().toISOString(),methods:{}};
const all=read();if(!store({...all,draft:d}))return prepare();if(!saveActive({studentId:student()}))return prepare();child(d)}
function startExisting(){const d=session();if(!d)return home454();if(d.studentId!==student())return home454();if(!saveActive({studentId:student()}))return home454();child(d)}
function overlay(){let o=document.querySelector('.v454-overlay');if(!o){o=E('div','overlay');o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.setAttribute('aria-label','子ども用の学習画面');document.body.append(o)}ROOT.inert=true;return o}
function unoverlay(){speechStop();const o=document.querySelector('.v454-overlay');if(o)o.remove();ROOT.inert=false;clearActive()}
function partText(k){const pos=POS[k.layout]||POS.左右;return `${pos[0]}は「${NAMES[k.a]||k.a}」、${pos[1]}は「${NAMES[k.b]||k.b}」。${k.cue||k.tip||''}`}
function child(d){phase='child';if(d.studentId!==student()){const o=overlay();o.replaceChildren();const c=card('先生に渡してください');c.append(p('学習者が切り替わっています。以前の学習内容は表示しません。'),btn('先生の操作で画面を閉じる',()=>{if(window.confirm('学習画面を閉じますか？')){unoverlay();home454()}},'primary'));o.append(c);return}
const o=overlay();o.replaceChildren();const m=E('main','child'+(d.large?' big':''));o.append(m);const n=E('div','child-nav');n.append(E('span','child-progress',`🌱 ${Math.min(d.step+1,d.ids.length)} / ${d.ids.length}`),btn('せんせいに わたす',()=>teacherReturn(d)));m.append(n);
if(d.step>=d.ids.length){const c=card('きょうの がくしゅう、おしまい！');c.append(p('じぶんに あう ほうほうを ためせたね。','encourage'),p('できたことを せんせいと いっしょに ふりかえろう。'),btn('🌸 せんせいに わたす',()=>teacherReturn(d),'primary'));m.append(c);return}
const k=byId(d.ids[d.step]);if(!k){teacherReturn(d);return}let mode=METHODS[d.methods?.[kid(k)]]?d.methods[kid(k)]:'meaning',hinted=false,revealed=false;const c=card('ひとつずつ、じぶんの ペースで');const modes=E('div','buttons');for(const [id,text]of Object.entries(METHODS)){const b=btn(text,()=>{mode=id;d.methods[kid(k)]=id;saveDraft(d);refresh()},mode===id?'on':'');b.setAttribute('aria-pressed',String(mode===id));modes.append(b)}c.append(modes);
const q=E('div','question');const lead=p('','prompt');const blank=E('div','big-glyph','？');q.append(lead,blank);const control=E('div','buttons');control.append(btn('🔊 よみをきく',()=>speak(k.kana)),btn('💡 ヒント',()=>{hinted=true;tip.hidden=false}),btn('👀 こたえ',()=>{revealed=true;blank.textContent=k.c;ans.hidden=false;outs.hidden=false}),btn('☕ きょうは ここまで',()=>{completeOne(d,k,mode,'rest',hinted,revealed)}));q.append(control);c.append(q);
const tip=E('div','tip');tip.hidden=true;tip.append(p(partText(k)));c.append(tip);
const ans=E('div','answer');ans.hidden=true;ans.append(E('div','kanji',k.c),p(`${k.word}（${k.kana}）`,'word'),p('いみ：'+k.meaning),p('ぶん：'+(k.example.includes('□')?k.example.replace(/□/g,k.word):k.example)),p('かたち：'+partText(k),'small'));c.append(ans);
const outs=E('div','outcomes');outs.hidden=true;outs.append(p('きょうは どんな ほうほうで できた？','small'));for(const [id,text]of Object.entries(OUTCOMES))outs.append(btn(text,()=>completeOne(d,k,mode,id,hinted,revealed),id==='self'?'positive':''));c.append(outs);m.append(c);
m.append(p('かかなくても だいじょうぶ。ひとやすみ しても だいじょうぶ。','foot'));
function refresh(){[...modes.children].forEach((b,i)=>{const active=Object.keys(METHODS)[i]===mode;b.classList.toggle('v454-on',active);b.setAttribute('aria-pressed',String(active))});const prompts={voice:`「${k.kana}」と いう ことば。どんな かんじかな？`,parts:`「${k.kana}」の かんじは、どんな ぶひんで できているかな？`,meaning:`「${k.meaning}」と いう いみの ことばは？`,recall:`「${k.kana}」の かんじを みないで おもいだそう。`};lead.textContent=prompts[mode]}
refresh()}
function saveDraft(d){const all=read();return store({...all,draft:d})}
function completeOne(d,k,mode,outcome,hint,answered){if(d.studentId!==student())return;const record={id:kid(k),c:k.c,word:k.word,grade:d.grade,method:mode,outcome,hint:!!hint,answered:!!answered,date:today(),at:new Date().toISOString()};d.events.push(record);if(outcome==='rest')d.interrupted=true;d.step=outcome==='rest'?d.ids.length:d.step+1;if(!saveDraft(d)){window.alert(error||'学習を保存できませんでした。');return}child(d)}
function teacherReturn(d){const o=overlay();o.replaceChildren();const c=card('🌷 せんせいに わたしてね');c.append(p('きょうの がくしゅうを せんせいに みてもらおう。'),p('ここから先は せんせいの かくにん がひつようです。','small'));c.append(btn('🌱 つづける',()=>child(d)));if(d.step<d.ids.length)c.append(btn('先生：あとで同じところから再開する',()=>{if(!window.confirm('先生が操作していますか？ 学習を一時停止して先生用画面に戻ります。'))return;unoverlay();home454()}));c.append(btn('先生：今日の学習を終了して記録へ',()=>{if(!window.confirm('先生が操作していますか？ 今日の学習を終了して記録を確認します。'))return;finalize(d)},'primary'));o.append(c)}
function finalize(d){const all=read();const finished={...d,finished:new Date().toISOString(),finishedDate:today(),status:(!d.interrupted&&d.step>=d.ids.length)?'完了':'途中終了'};const hs=Array.isArray(all.history)?all.history:[];if(d.events.length){hs.push(finished)}if(!store({...all,history:hs.slice(-100),draft:null}))return;unoverlay();phase='report';report()}
function sessions(){const x=read();return Array.isArray(x.history)?x.history:[]}
function csvCell(v){let s=String(v??'');if(/^[=+\-@\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'}
function exportCSV(items){const rows=[['日付','学年','漢字','言葉','学習方法','子どもの振り返り','ヒント使用','答え表示','学習区切り']];for(const a of items)for(const e of a.events||[])rows.push([e.date,e.grade,e.c,e.word,METHODS[e.method]||e.method,OUTCOMES[e.outcome]||e.outcome,e.hint?'あり':'なし',e.answered?'あり':'なし',a.status]);const csv='\ufeff'+rows.map(r=>r.map(csvCell).join(',')).join('\r\n');try{const b=new Blob([csv],{type:'text/csv;charset=utf-8'}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=`Pono454_learning_${today()}_grade${grade}.csv`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1200);error='CSVの保存を開始しました。';return true}catch(_){error='CSVの保存に失敗しました。';return false}}
function report(){phase='report';const m=page('📋 先生｜学習後の確認',home454);tabs(m,report);const all=sessions().filter(s=>s.grade===grade),todaySessions=all.filter(s=>(s.finishedDate||s.finished?.slice(0,10))===today()),events=todaySessions.flatMap(s=>s.events||[]);const c=card('今日の取り組み');const stats=E('div','stats');for(const [n,text]of [[todaySessions.length,'学習の回数'],[events.length,'取り組んだ字数'],[events.filter(x=>x.hint).length,'ヒント使用'],[events.filter(x=>x.outcome==='rest').length,'休憩を選んだ回数']]){const metric=E('div','metric');metric.append(E('b','stat-number',n),p(text,'small'));stats.append(metric)}c.append(stats);c.append(p('振り返りは「読み書きの習得判定」ではありません。本人が選んだ方法や様子を次の支援に生かしてください。','note'));m.append(c);
const d=card('今日の記録');if(!events.length)d.append(p('今日の記録はありません。','note'));for(const e of events.slice().reverse()){const row=E('div','record');row.append(E('b','',`${e.c} ${e.word}`),p(`${METHODS[e.method]}｜${OUTCOMES[e.outcome]}${e.hint?'｜ヒントあり':''}`,'small'));d.append(row)}m.append(d);
const nx=card('次に試せること');if(!events.length)nx.append(p('短時間の3字から、子どもが選びやすい方法を一緒に探してみましょう。'));if(events.some(x=>x.outcome==='rest'))nx.append(p('休憩を選んだ場面がありました。問題数やタイミングを調整してもよさそうです。'));if(events.some(x=>x.hint))nx.append(p('ヒントが役立った字は、次回も同じ手がかりを用意してから、本人と使い方を相談できます。'));if(events.some(x=>x.outcome==='change'))nx.append(p('方法を変えた記録があります。次回は最初から本人に方法を選んでもらうのも一案です。'));if(events.length&&!events.some(x=>x.outcome==='rest'||x.hint||x.outcome==='change'))nx.append(p('本人が取り組みやすかった方法を確認し、少し日を空けてもう一度思い出せるか試してみましょう。'));m.append(nx);
const x=card('先生の保存・次の学習');x.append(p(`直近の記録：${all.length}回。CSVには名前や自由記述を含めません。選択中の学習者のみ出力します。`,'note'),btn('この学年の記録をCSV保存',()=>{exportCSV(all);report()},'primary'),btn('新しい学習を準備する',()=>{pick=[];prepare()}),btn('v450｜読み・形・書字の確認',()=>window.ponoKanji450?.()));m.append(x);status(m)}
function inject(){if(ROOT.querySelector('.v454-page,.v454-entry'))return;const h=ROOT.querySelector('.top h1,h1');if(!h||!/^Pono Learning Quest|今日の学習/.test((h.textContent||'').trim()))return;const x=E('section','entry');x.append(E('strong','','🌼 先生から子どもへ｜漢字の学習画面 v454'),p('先生が3〜5字を準備し、子ども用の全画面表示へ。途中再開や学習後の確認にも対応。','small'),btn('学習を準備する →',home454,'primary'));(h.closest('.top')||h).insertAdjacentElement('afterend',x)}
let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;inject()})}).observe(ROOT,{subtree:true,childList:true});
window.ponoKanji454=home454;window.ponoKanji454Data={load:read,sessions,options,session,active:currentActive,byId};
inject();const a=currentActive();if(a.studentId){const d=loadRaw(`pono454-handoff:${a.studentId}`).draft;if(d&&d.ids&&d.step>=0){if(a.studentId===student())child(d);else child({...d,studentId:'__mismatch__'})}else clearActive()}
})();
