/* Pono Learning Quest v458 — editable teacher-reviewed learner report, local only. */
(()=>{'use strict';
if(window.ponoTeacher458)return;
const ROOT=document.getElementById('app');if(!ROOT)return;
const T=()=>window.ponoTeacher457Data;
const V=()=>window.ponoKanji450Data;
const SCOPE={school:'学校へ共有する資料',family:'保護者へ共有する資料'};
let grade=4,period=30,audience='school',pageStudent=null,notice='',confirmed=false,edits={},viewerMode='edit';
const fields=[
 {key:'strength',title:'取り組めたこと・本人のよさ',tip:'具体的な行動・できた場面を記入（「楽しそうに取り組んだ」など、観察した事実に限定）'},
 {key:'voice',title:'本人が選んだ方法・気持ち',tip:'本人が話した言葉や、選んだ方法を記入。発言は実際に確認した場合のみ記載'},
 {key:'support',title:'役立った支援・環境調整',tip:'音声・部品のヒント・選択式・休憩など、実際に試して役立ったこと'},
 {key:'next',title:'次の小さな目標',tip:'例：週に1〜3字、本人が選んだ方法で確かめる'},
 {key:'request',title:'家庭・学校と一緒に確認したいこと',tip:'共有先にお願いしたいことや、相談したい配慮を記入'}
];
const labels={school:'学校向け',family:'保護者向け'};
const localDay=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const beginDay=(n)=>{let d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-(n-1));return localDay(d)};
const student=()=>{try{if(typeof profile!=='undefined'&&profile&&profile.id!=null&&String(profile.id).trim()&&String(profile.id)!=='trial')return String(profile.id)}catch(_){}return null};
const clean=(v)=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
function dataReady(){return !!(T()&&typeof T().currentRecords==='function'&&V()&&typeof V().info==='function'&&window.ponoKanji449Data?.items?.length===395)}
function onChild(){try{const x=JSON.parse(localStorage.getItem('pono454-active-device')||'null');return !!(x&&x.studentId)}catch(_){return false}}
function oldDraft(){if(!student())return {};try{let x=JSON.parse(localStorage.getItem('pono458-report-draft:'+student())||'null');return clean(x)}catch(_){return {}}}
function draftKey(){return audience+':'+grade}
function loadedDraft(){let d=clean(oldDraft()[draftKey()]);return Object.fromEntries(fields.map(f=>[f.key,String(d[f.key]||'')]))}
function stored(){return Object.fromEntries(fields.map(f=>[f.key,String(edits[f.key]||'').slice(0,800)]))}
function switchPage(g=grade,a=audience,p=period){if(student()!==pageStudent){notice='学習者が切り替わったため画面を閉じました。';return home458()}if(fields.some(f=>String(edits[f.key]||'')!==String(loadedDraft()[f.key]||''))&&!window.confirm('保存していない追記があります。別の学年・共有先へ切り替えますか？'))return;grade=g;audience=a;period=p;edits=loadedDraft();confirmed=false;viewerMode='edit';render()}
function report(){if(!dataReady()||!student())return null;let d=T().currentRecords();const rows=d.rows.filter(r=>Number(r.k.g)===Number(grade));const stats=V().info(rows);
 const cutoff=period==='all'?'0000-00-00':beginDay(Number(period));const ev=d.events.filter(x=>Number(x.grade)===Number(grade)&&x.date>=cutoff);
 const uniq=new Set(ev.filter(x=>x.c).map(x=>x.c));const freq=Object.entries(ev.reduce((out,e)=>{if(e.method!=='未記録')out[e.method]=(out[e.method]||0)+1;return out},{})).sort((a,b)=>b[1]-a[1]);
 const focus=rows.slice().sort((a,b)=>b.score-a.score||a.k.c.localeCompare(b.k.c,'ja')).slice(0,4);
 return {grade,period,audience,stats,events:ev.length,unique:uniq.size,days:new Set(ev.map(e=>e.date)).size,hints:ev.filter(e=>e.hint).length,rests:ev.filter(e=>e.break).length,method:freq,focus,periodLabel:period==='all'?'全期間':`${beginDay(Number(period))}〜${localDay()}`,created:localDay()};}
function commonSummary(v){let s=v.stats;return [
 `対象の学年：小学${v.grade}年生（配当漢字${s.total}字）`,
 `集計期間：${v.periodLabel}／作成日：${v.created}`,
 `【期間内の取り組み】記録${v.events}件、記録された漢字${v.unique}字、記録のある日${v.days}日。ヒント利用の記録${v.hints}件、休憩・中断の記録${v.rests}件。`,
 `【先生が確認した内容（全期間の最新状態）】読みを確認${s.read}字、形の理解を確認${s.shape}字、手書きを確認${s.hand}字、文字入力・選択で表現した記録${s.alternate}字。`,
 `【学習への参加記録（全期間）】言葉・文脈の練習に取り組んだ字${s.context}字、復習記録のある字${s.review}字、復習予定日が来ている字${s.due}字。`,
 `【次の確認候補】${v.focus.map(r=>r.k.c+'（'+r.action+'）').join('、')||'まず本人が選んだ方法で確認'}。`,
 `※取り組んだ回数・問題への正答と、読む力・書く力の確認は別です。未確認は「できない」ではありません。`,
 `※同じ学習の記録が複数機能に残る場合があり、記録件数は実際の学習回数と一致しないことがあります。`
].join('\n')}
function reportText(v,notes=edits){if(!v)return '';let arr=[
 'Pono Learning Quest｜漢字の学習と支援 共有用レポート',
 `宛先：${SCOPE[v.audience]}　／　対象：小学${v.grade}年生`,
 '対象児童：＿＿＿＿＿＿＿＿＿＿（必要に応じて共有前に記入）',
 '',commonSummary(v),'',
 '【先生が確認・追記する内容】'
];for(const f of fields)arr.push(`${f.title}：${String(notes[f.key]||'').trim()||'（未記入）'}`);
 arr.push('','【共有時のお願い】','子ども本人の負担や選びたい学び方を確かめながら、読む・形を理解する・書くことをそれぞれ支援してください。','この文書は端末内の学習記録から作成した支援のための資料であり、診断書や能力判定、学校所定の出席認定資料ではありません。','共有する前に内容・宛先・本人の意向を確認してください。');return arr.join('\n')}
const el=(tag,classes='',t)=>{const x=document.createElement(tag);if(classes)x.className=classes.split(' ').filter(Boolean).map(k=>'v458-'+k).join(' ');if(t!==undefined)x.textContent=String(t);return x};
const p=(t,c='text')=>el('p',c,t);
const button=(t,fn,c='')=>{const b=el('button','btn '+c,t);b.type='button';b.addEventListener('click',()=>{if(pageStudent!==student())return home458();fn()});return b};
const card=(title)=>{const c=el('section','card');c.append(el('h2','heading',title));return c};
function exit(){try{if(typeof home==='function')return home()}catch(_){}ROOT.replaceChildren(p('トップへ戻るには再読み込みしてください。'))}
function screen(title){ROOT.replaceChildren();const main=el('main','page'),nav=el('nav','nav');nav.append(button('← トップへ',exit),el('h1','title',title));main.append(nav);ROOT.append(main);try{window.scrollTo(0,0)}catch(_){}return main}
function tabs(m){const a=el('div','tabs');for(const g of [4,5])a.append(button('小学'+g+'年',()=>switchPage(g),g===grade?'selected':''));m.append(a);
 const b=el('div','tabs');for(const [x,t] of [['school','学校へ'],['family','保護者へ']])b.append(button(t,()=>switchPage(grade,x),audience===x?'selected':''));m.append(b);
 const c=el('div','tabs');for(const [x,t] of [[7,'7日間'],[30,'30日間'],['all','全期間']])c.append(button(t,()=>{period=x;confirmed=false;render()},String(period)===String(x)?'selected':''));m.append(c)}
function metric(root,n,cap,detail=''){const b=el('div','metric');b.append(el('strong','metric-num',String(n)),p(cap,'metric-cap'));if(detail)b.append(p(detail,'muted'));root.append(b)}
function summaryPart(m,v){const a=card('記録から分かること');a.append(p('ここからは端末内の記録の集計です。正解数から漢字を書く力を推測しません。','muted'));
 const grid=el('div','metrics');metric(grid,v.events,'期間内の記録件数','学習回数と一致しない場合あり');metric(grid,v.unique,'記録された漢字');metric(grid,v.hints,'ヒント利用の記録');metric(grid,v.rests,'休憩・中断の記録');a.append(grid);m.append(a);
 const b=card('先生が確認した読み・形・書字（全期間の最新状態）');const g=el('div','metrics');metric(g,v.stats.read,'読みを確認');metric(g,v.stats.shape,'形の理解を確認');metric(g,v.stats.hand,'手書きを確認');metric(g,v.stats.alternate,'入力・選択で表現');b.append(g,p(`未確認の項目がある漢字：${v.stats.unconfirmed}字。未確認は「できない」ではありません。`,'muted'));m.append(b);
 const c=card('次に確認する漢字の候補');for(const x of v.focus){const r=el('div','focus');r.append(el('b','glyph',x.k.c),p(`${x.k.word}｜${x.action}`));c.append(r)}c.append(p('候補は学習記録から機械的に並べています。苦手の判定ではなく、先生が本人と相談して調整してください。','muted'));m.append(c)}
function editorPart(m){const c=card('先生の観察・本人の言葉を追記する');c.append(p('記入は任意です。書かなかった内容は「未記入」と表示します。観察していないことを推測で書かないでください。','muted'));
 for(const f of fields){const wrap=el('div','field');const label=el('label','label',f.title);const ta=el('textarea','area');ta.rows=3;ta.placeholder=f.tip;ta.value=edits[f.key]||'';ta.maxLength=800;ta.addEventListener('input',()=>{edits[f.key]=ta.value;confirmed=false;updateReportPreview()});label.append(ta);wrap.append(label,p(f.tip,'muted'));c.append(wrap)}
 c.append(p('自由記述の下書きは「この端末に下書きを保存」した場合にのみ保存します。共有資料には個人名やIDを自動挿入しません。','muted'));
 c.append(button('💾 この端末に下書きを保存',saveDraft),button('下書きの記述を消す',clearDraft));m.append(c)}
function saveDraft(){if(!student())return;try{const key='pono458-report-draft:'+student(),all=oldDraft();all[draftKey()]={...stored(),updated:new Date().toISOString()};localStorage.setItem(key,JSON.stringify(all));notice='この学習者の下書きを端末内に保存しました。';render()}catch(_){notice='保存できませんでした。保存領域の空きを確認してください。';render()}}
function clearDraft(){if(!window.confirm('この学年・共有先の下書きを消しますか？ 元の学習記録は消えません。'))return;try{let x=oldDraft();delete x[draftKey()];localStorage.setItem('pono458-report-draft:'+student(),JSON.stringify(x))}catch(_){}edits=Object.fromEntries(fields.map(f=>[f.key,'']));confirmed=false;notice='このレポートの下書きを消しました。学習記録は変更していません。';render()}
let reportPre=null;
function updateReportPreview(){if(reportPre)reportPre.textContent=reportText(report());const share=document.querySelector('.v458-share-actions');if(share)share.querySelectorAll('button').forEach(b=>b.disabled=!confirmed)}
function sharePart(m,v){const c=card('共有前の確認とレポート');c.append(p('下の文章を確認してからコピー・保存・印刷できます。本人の同意や共有先の確認をお願いします。','muted'));
 const vbox=el('div','paper');reportPre=el('pre','pre',reportText(v));vbox.append(reportPre);c.append(vbox);
 const lab=el('label','confirm');const cb=document.createElement('input');cb.type='checkbox';cb.checked=confirmed;cb.addEventListener('change',()=>{confirmed=cb.checked;updateReportPreview()});lab.append(cb,document.createTextNode(' 本人に関係する内容・共有先を確認しました'));c.append(lab);
 const ops=el('div','share-actions');ops.append(button('📋 レポート文をコピー',copyReport,'primary'),button('📄 テキストを保存',downloadTxt),button('🖨️ A4で印刷／PDF保存',printReport));c.append(ops);m.append(c);updateReportPreview()}
function copyReport(){if(!confirmed)return;let txt=reportText(report());if(navigator.clipboard?.writeText){navigator.clipboard.writeText(txt).then(()=>{notice='レポート文をコピーしました。';render()},()=>{notice='コピーできませんでした。文章を長押ししてコピーしてください。';render()})}else{notice='この端末では自動コピーできません。画面の文章を長押ししてコピーしてください。';render()}}
function downloadTxt(){if(!confirmed)return;try{const b=new Blob(['\uFEFF'+reportText(report())],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(b),a=document.createElement('a');a.href=url;a.download=`Pono458_report_${grade}_${audience}_${localDay()}.txt`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2500);notice='テキスト保存を開始しました。';render()}catch(_){notice='端末の設定により保存できませんでした。コピーをご利用ください。';render()}}
function printReport(){if(!confirmed)return;window.print()}
function render(){pageStudent=student();reportPre=null;const m=screen('📄 漢字の学習と支援｜共有レポート v458');const introduction=card('できたこと・試した支援・次の目標を伝える');introduction.append(p('小4・小5の漢字395字の学習記録をもとに、学校・保護者と共有する文章を作成します。書字を確認していない字を「書けない」とは判定しません。'));m.append(introduction);
 if(!pageStudent){const c=card('学習者を選んでください');c.append(p('体験モードや未選択では、ほかの子の記録が見えないようレポートを表示しません。トップで学習者を選んでください。'));m.append(c);return}
 if(onChild()){const c=card('子ども用画面の利用中です');c.append(p('先生へ端末が返却されていることを確認してから開いてください。'));c.append(button('v454｜学習画面の終了を確認',()=>window.ponoKanji454?.()));m.append(c);return}
 if(!dataReady()){const c=card('以前の教材データが必要です');c.append(p('v449・v450・v457のファイルが読み込まれていません。以前のJSを削除せず同じフォルダーに入れてください。'));m.append(c);return}
 tabs(m);const v=report();if(!v){m.append(p('データの読み込みを確認してください。'));return}
 const select=card('共有先と対象期間');select.append(p(`${labels[audience]} ／ 小学${grade}年 ／ ${v.periodLabel}`,'selection'));select.append(p('読み・形・書字の確認状況は、期間にかかわらず端末に残る最新の確認結果です。期間内の記録とは区別して表示します。','muted'));m.append(select);
 summaryPart(m,v);editorPart(m);sharePart(m,v);
 const foot=p('これは先生が内容を確かめて完成させる下書きです。出席認定・診断のための公的書類ではありません。下書きは端末内に保存され、別端末には同期されません。先生画面にはパスワード保護はありません。','foot');m.append(foot);
 if(notice)m.append(p(notice,'notice'))}
function home458(){pageStudent=student();grade=4;period=30;audience='school';confirmed=false;edits=loadedDraft();notice='';render()}
function inject(){if(ROOT.querySelector('.v458-page,.v458-entry'))return;const h=ROOT.querySelector('.top h1,h1');if(!h||!/^Pono Learning Quest|今日の学習/.test((h.textContent||'').trim()))return;const b=el('section','entry');b.append(el('strong','', '📄 学校・保護者へ共有する漢字レポート v458'),p('小4・小5｜学習記録と先生の観察を、読みやすい文章にまとめます。','muted'),button('個別レポートを作る →',home458,'primary'));(h.closest('.top')||h).insertAdjacentElement('afterend',b)}
let pending=false;new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;inject()})}).observe(ROOT,{childList:true,subtree:true});
window.ponoTeacher458=home458;window.ponoTeacher458Data={report,reportText,commonSummary,loadedDraft};inject();
})();
