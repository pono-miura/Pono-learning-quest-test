/* Pono Learning Quest v450 — kanji learner support overview; all records stay local and read-only. */
(()=>{'use strict';
if(window.ponoKanji450)return;
const ROOT=document.getElementById('app');if(!ROOT)return;
const PACK=window.ponoKanji449Data;
let grade=4,mode='recommended',query='',limit=32,notice='';
const READ={none:'未確認',can:'読める',support:'手がかりで読める',practice:'練習中',difficult:'練習中'};
const SHAPE={none:'未確認',can:'形を説明できる',support:'見れば分かる',practice:'練習中',difficult:'練習中'};
const WRITE={none:'未確認・実施していない',can:'自力で書ける',support:'支援があれば書ける',alternate:'入力・選択で表現',difficult:'手書きの負担が大きい'};
const PART={'亻':'にんべん','扌':'てへん','氵':'さんずい','忄':'りっしんべん','阝':'こざとへん','宀':'うかんむり','冖':'わかんむり','辶':'しんにょう','艹':'くさかんむり','⺮':'たけかんむり','礻':'しめすへん','衤':'ころもへん','飠':'しょくへん','訁':'ごんべん','言':'ごんべん','糸':'いとへん','金':'かねへん','刂':'りっとう','攵':'のぶん','頁':'おおがい','疒':'やまいだれ','厂':'がんだれ','广':'まだれ','木':'き','火':'ひ','水':'みず','土':'つち','女':'おんな','立':'たつ','口':'くち','心':'こころ','竹':'たけ','禾':'のぎ','日':'ひ','月':'つき','目':'め','人':'ひと','力':'ちから','貝':'かい','寸':'すん','馬':'うま','石':'いし'};
const WHERE={'左右':['左','右'],'上下':['上','下'],'囲み':['外側','内側'],'交差':['線の部分①','線の部分②'],'重なり':['重なる部分①','重なる部分②']};
const VERSIONS=[440,445,446,447,448];const SHAPES=[441,442,443,444];
const hasData=()=>!!(PACK&&Array.isArray(PACK.items)&&PACK.items.length===395);
const learner=()=>{try{if(typeof profile!=='undefined'&&profile&&profile.id!==''&&profile.id!=null)return String(profile.id)}catch(e){}return 'trial'};
const id=k=>k.g+'-'+k.c;
const day=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
function get(key){try{const d=JSON.parse(localStorage.getItem(key)||'null');return d&&typeof d==='object'&&!Array.isArray(d)?d:{}}catch(e){return {}}}
function state(){const u=learner(),c={manual:get('pono438-kanji-profile:'+u),review:get('pono449-kanji-review:'+u).progress||{},legacy:get('pono437-recall:'+u),words:{},shapes:{},rec439:get('pono439-learning:'+u).progress||{}};
 for(const v of VERSIONS)c.words[v]=get('pono'+v+'-context:'+u).progress||{};
 for(const v of SHAPES)c.shapes[v]=get('pono'+v+'-verbal-kanji:'+u).progress||{};
 return c}
function getPack(){return hasData()?PACK.items.filter(k=>k.g===grade):[]}
function row(k,s){const z=id(k),r=s.manual[z]||{},review=s.review[z]||{},old=s.legacy[z]||{},shape=SHAPES.map(v=>s.shapes[v][z]).find(Boolean)||{},context=VERSIONS.map(v=>s.words[v][z]).find(Boolean)||{},r439=s.rec439[z]||{};
 const explicit=!!(s.manual[z]&&typeof s.manual[z]==='object');
 const reading=READ[r.read]||'未確認',formation=SHAPE[r.shape]||'未確認',writing=WRITE[r.write]||'未確認・実施していない';
 const attempted=Number(context.count)||0,reviewed=Number(review.attempts)||0;
 const due=!!((review.next&&review.next<=day())||(!reviewed&&((old.next&&old.next<=day())||(shape.next&&shape.next<=day()))));
 const needsHelp=!!((reviewed&&(review.lastHint===true||review.lastGood===false))||(attempted&&(context.lastNeedsHelp===true||context.contextOK===false||context.meaningOK===false))||(shape.attempts&&shape.help)||(r439.total&&r439.lastOk===false));
 const unconfirmed=!explicit||['read','shape','write'].some(a=>!r[a]||r[a]==='none');
 const handwritingCare=r.write==='difficult'||r.write==='alternate'||r.burden==='high';
 let score=0; if(due)score+=100;if(needsHelp)score+=60;if(!attempted)score+=20;if(!reviewed)score+=20;if(unconfirmed)score+=10;if(handwritingCare)score+=10;
 const action=due?'復習の予定日が来ています':needsHelp?'ヒントを使って、もう一度確認':!reviewed?'読み・部品・文脈を短く復習':!explicit?'読み・形・書字を個別に確認':'できたことを保ちながら復習';
 return {k,explicit,reading,formation,writing,readCode:r.read||'none',shapeCode:r.shape||'none',writeCode:r.write||'none',burden:r.burden||'none',method:r.method||'none',updated:r.updated||'',attempted,context,reviewed,review,due,needsHelp,unconfirmed,handwritingCare,action,score,legacySeen:!!(old.tries||shape.attempts||r439.total)};
}
function allRows(){const s=state();return getPack().map(k=>row(k,s))}
function info(rows){const n=rows.length,manual=rows.filter(x=>x.explicit);return {total:n,manual:manual.length,read:manual.filter(x=>x.readCode==='can'||x.readCode==='support').length,shape:manual.filter(x=>x.shapeCode==='can'||x.shapeCode==='support').length,hand:manual.filter(x=>x.writeCode==='can'||x.writeCode==='support').length,alternate:manual.filter(x=>x.writeCode==='alternate').length,high:manual.filter(x=>x.handwritingCare).length,context:rows.filter(x=>x.attempted>0).length,review:rows.filter(x=>x.reviewed>0).length,due:rows.filter(x=>x.due).length,needs:rows.filter(x=>x.needsHelp).length,unconfirmed:rows.filter(x=>x.unconfirmed).length};}
function element(tag,classes='',txt){const x=document.createElement(tag);if(classes)x.className=classes.split(/\s+/).filter(Boolean).map(v=>'v450-'+v).join(' ');if(txt!==undefined)x.textContent=String(txt);return x}
function button(txt,cb,style=''){const b=element('button','btn '+style,txt);b.type='button';b.addEventListener('click',cb);return b}
function card(title){const c=element('section','card');c.append(element('h2','card-title',title));return c}
function text(t,cl='explain'){return element('p',cl,t)}
function finish(){if(typeof home==='function'){try{return home()}catch(e){}}ROOT.replaceChildren(text('トップへ戻るにはページを読み直してください。'))}
function screen(t,back=home450){ROOT.replaceChildren();const m=element('main','page'),n=element('nav','nav');n.append(button('← もどる',back),element('h1','title',t));m.append(n);ROOT.append(m);try{window.scrollTo(0,0)}catch(e){}return m}
function gradeTabs(root,cb=home450){const tabs=element('div','tabs');for(const g of [4,5]){const b=button(`小学${g}年`,()=>{grade=g;query='';mode='recommended';limit=32;cb()},g===grade?'selected':'');b.setAttribute('aria-pressed',String(g===grade));tabs.append(b)}root.append(tabs)}
function note(root){root.append(text(learner()==='trial'?'今は仮の学習者の記録を表示しています。記録を分ける場合は、先に学習者を選んでください。':'選択中の学習者だけの端末内記録を表示します。別の端末と自動同期されません。','muted'));if(notice)root.append(text(notice,'alert'))}
function metric(root,label,value,unit='',detail=''){const c=element('div','metric');c.append(element('div','metric-val',String(value)+unit),element('div','metric-label',label));if(detail)c.append(text(detail,'small'));root.append(c)}
function reportText(stats){return `小学${grade}年生の漢字${stats.total}字。読むことを確認した字 ${stats.read}字、形の理解を確認した字 ${stats.shape}字、手書きを確認した字 ${stats.hand}字、入力・選択で表現できる字 ${stats.alternate}字。言葉の練習に取り組んだ字 ${stats.context}字、v449の復習に取り組んだ字 ${stats.review}字。復習予定が来ている字 ${stats.due}字。未確認の項目が残る字 ${stats.unconfirmed}字。これらは異なる方法と機会による記録で、能力の比較や診断には使いません。`}
function home450(){const m=screen('🌷 漢字の学習まとめ v450',finish);gradeTabs(m);
 if(!hasData()){const c=card('教材の読み込みを確認してください');c.append(text('v449の漢字データが読み込めませんでした。app-v449.jsを以前のファイルと同じフォルダーに残し、ページを読み直してください。'));m.append(c);return}
 const rows=allRows(),q=info(rows),lead=card('いまの学びを、別々の力として見る');lead.append(text('小学'+grade+'年生の配当漢字'+q.total+'字。正解した回数だけで「読める」「書ける」とは判定しません。先生や保護者が実際に確認したことと、選択練習の記録は分けて表示します。'));const grid=element('div','stats');metric(grid,'読みを確認',q.read,'字');metric(grid,'形の理解を確認',q.shape,'字');metric(grid,'手書きを確認',q.hand,'字');metric(grid,'入力・選択で表現',q.alternate,'字');lead.append(grid,text('上の数はv438で確認した項目の記録です。「未確認」は「できない」ではありません。','small'));m.append(lead);
 const learn=card('練習と次回の復習');const small=element('div','stats');metric(small,'言葉・文の練習',q.context,'字');metric(small,'思い出し復習',q.review,'字');metric(small,'復習予定が来た字',q.due,'字');metric(small,'項目が未確認の字',q.unconfirmed,'字');learn.append(small,text('問題に取り組んだ字数です。習得した字数とは違います。','small'));m.append(learn);
 const next=card('今日のおすすめ：まずは5字');const recommended=rows.slice().sort((a,b)=>b.score-a.score||(a.k.c.codePointAt(0)-b.k.c.codePointAt(0))).slice(0,5);const list=element('div','focus-list');for(const r of recommended){const b=button(`${r.k.c}｜${r.k.word}`,()=>detail(r.k), 'focus');const wrap=element('div','focus-row');wrap.append(b,text(r.action,'small'));list.append(wrap)}next.append(list,text('以前の記録がない場合は未着手の漢字から提案します。必ずこの順番で学ばなければならないわけではありません。','muted'));if(typeof window.ponoKanji449==='function')next.append(button('🌱 思い出し復習の画面へ',()=>window.ponoKanji449(),'primary'));m.append(next);
 const report=card('先生・保護者向けの記録');report.append(text('読む・形・書字・言葉の練習・復習日を一度に見られます。必要な支援の相談や記録整理に使ってください。'));report.append(button('📋 漢字395字の一覧・絞り込み',listing,'primary'),button('🧾 個別のまとめ・CSV出力',summary));if(typeof window.ponoKanji438==='function')report.append(button('✍️ 読み・形・書字の確認を記録する（v438）',()=>window.ponoKanji438()));m.append(report);note(m)}
function filteredRows(){const rows=allRows().filter(r=>!query||[r.k.c,r.k.word,r.k.kana].some(s=>String(s).includes(query)));
 const f=rows.filter(r=>mode==='all'||(mode==='recommended'&&true)||(mode==='due'&&r.due)||(mode==='needs'&&r.needsHelp)||(mode==='care'&&r.handwritingCare)||(mode==='unconfirmed'&&r.unconfirmed)||(mode==='context'&&r.attempted>0));
 if(mode==='recommended')f.sort((a,b)=>b.score-a.score||(a.k.c.codePointAt(0)-b.k.c.codePointAt(0)));return f}
function listing(){const m=screen(`小学${grade}年｜漢字の学習状況`,home450);gradeTabs(m,listing);
 const c=card('一字ずつ、できたことを確かめる');c.append(text('選択式の正解は「手書きできる」とは扱いません。空欄の項目は未確認として残します。'));
 const search=element('input','search');search.type='search';search.placeholder='漢字・読み・言葉で検索';search.setAttribute('aria-label','漢字の検索');search.value=query;c.append(search);
 const picks=[['recommended','おすすめ順'],['due','復習の日'],['needs','ヒント・見直し'],['unconfirmed','未確認あり'],['care','書字の配慮'],['all','すべて']];const tabs=element('div','filters'),tiles=element('div','list'),counter=text('','small'),more=button('さらに表示する',()=>{limit+=32;drawRows()});c.append(tabs,counter,tiles,more);m.append(c);
 for(const [key,label] of picks){tabs.append(button(label,()=>{mode=key;limit=32;drawTabs();drawRows()},mode===key?'selected':''))}
 function drawTabs(){[...tabs.children].forEach((b,i)=>{b.classList.toggle('v450-selected',picks[i][0]===mode);b.setAttribute('aria-pressed',String(picks[i][0]===mode))})}
 function drawRows(){tiles.replaceChildren();const xs=filteredRows();counter.textContent=`該当 ${xs.length}字／表示 ${Math.min(limit,xs.length)}字`;for(const r of xs.slice(0,limit)){const b=element('button','kanji-row');b.type='button';b.append(element('span','symbol',r.k.c));const body=element('span','kanji-body');body.append(element('strong','',r.k.word));body.append(text(`読み：${r.reading}／形：${r.formation}／書字：${r.writing}`,'small'));body.append(text(r.action,'small'));b.append(body);b.addEventListener('click',()=>detail(r.k));tiles.append(b)}more.hidden=limit>=xs.length}
 search.addEventListener('input',()=>{query=search.value.trim();limit=32;drawRows()});drawRows();note(m)}
function wordsPart(k){const l=WHERE[k.layout]||WHERE.左右;return `${l[0]}：${PART[k.a]||k.a}、${l[1]}：${PART[k.b]||k.b}。${k.cue||''}`}
function detail(k){const r=row(k,state()),m=screen(`漢字の記録｜${k.c}`,listing);const top=card('言葉と形の手がかり');top.append(element('div','hero',k.c),text(`${k.word}（${k.kana}）`),text(k.example.replace('□',k.word)),text('意味：'+k.meaning),text(wordsPart(k),'small'));m.append(top);
 const status=card('別々に見る5つの状況');const labels=[['① 読む',r.reading],['② 形・部品',r.formation],['③ 手書き・代替',r.writing],['④ 文の中で使う練習',r.attempted?`${r.attempted}回取り組んだ${r.context.lastNeedsHelp?'（ヒント・見直しあり）':''}`:'まだ記録なし'],['⑤ 思い出し復習',r.reviewed?`${r.reviewed}回／前回${r.review.score||0}/3問／次回 ${r.review.next||'未定'}`:'まだv449の記録なし']];for(const [a,b] of labels){const div=element('div','status');div.append(element('strong','',a),text(b,'small'));status.append(div)}status.append(text('選択問題の結果は、実際に読んだ・書いたと確認した記録とは分けています。','muted'));m.append(status);
 const support=card('次に試せる関わり');let tips=[];if(r.due)tips.push('時間を少し空けて、漢字を隠した状態から思い出す');if(r.needsHelp)tips.push('部品の位置を言葉で聞く・形を選ぶ・ヒントを段階的に使う');if(!r.attempted)tips.push('意味を聞き、例文の空欄に入る言葉を選ぶ');if(r.writeCode==='none'||r.handwritingCare)tips.push('書き取りは必須にせず、口頭・選択・入力など本人に合う方法を使う');if(!tips.length)tips.push('できる方法を保ち、数日空けてもう一度確認する');for(const t of tips)support.append(text('・'+t));if(typeof window.ponoKanji449==='function')support.append(button('🌱 v449の漢字復習を開く',()=>window.ponoKanji449(),'primary'));if(typeof window.ponoKanji438==='function')support.append(button('📋 v438の確認記録を開く',()=>window.ponoKanji438()));m.append(support);note(m)}
function formatDate(v){return typeof v==='string'?v.slice(0,10):''}
function csvQuote(x){let v=String(x??'');if(/^[=+\-@\t\r]/.test(v))v="'"+v;return '"'+v.replace(/"/g,'""')+'"'}
function exportCSV(){const head=['学年','漢字','言葉','読み','形の理解','書字・代替','文の練習回数','復習回数','次回復習日','ヒント等の再確認','最後の確認日'];const rows=allRows().map(x=>[x.k.g,x.k.c,x.k.word,x.reading,x.formation,x.writing,x.attempted,x.reviewed,x.review.next||'',x.needsHelp?'あり':'なし',formatDate(x.updated)]);const csv='\uFEFF'+[head,...rows].map(l=>l.map(csvQuote).join(',')).join('\r\n');try{const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`Pono_v450_kanji_grade${grade}.csv`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);notice='CSVの保存を開始しました。保存先は端末の設定により異なります。';}catch(e){notice='CSVを保存できませんでした。ブラウザー設定を確認してください。'}summary()}
function summary(){const m=screen(`小学${grade}年｜先生・保護者向けまとめ`,home450);gradeTabs(m,summary);const q=info(allRows());const c=card('今の学習状況');c.append(text(reportText(q)));m.append(c);const tips=card('次の学習を考えるために');tips.append(text('まだ確認していない項目は、できないことを示すものではありません。必要なときに、本人が負担なく答えられる方法で確かめます。'));if(q.due)tips.append(text(`・復習予定の字が${q.due}字あります。全部を一度に行わず、3〜5字から選べます。`));if(q.context<q.total)tips.append(text('・文の中で意味を使う練習を、少しずつ取り入れましょう。'));if(q.high||q.alternate)tips.append(text('・書字負担や代替方法の記録がある字は、書く量や回答方法を本人と相談しましょう。'));tips.append(text('読み・形・意味・書字を一つの点数にまとめたり、学習障害の診断に使ったりする画面ではありません。','small'));m.append(tips);
 const actions=card('印刷・記録の書き出し');actions.append(text('CSVには、漢字ごとの状態と学習回数・予定日だけが入ります。学習者名やメモ、自由記述は含まれません。共有前に相手と内容を確認してください。'));actions.append(button('📄 この学年の記録をCSV保存',exportCSV,'primary'),button('🖨️ まとめ画面を印刷',()=>window.print()),button('漢字一覧を見る',listing));m.append(actions);note(m)}
function inject(){if(!hasData()||ROOT.querySelector('.v450-page,.v450-entry'))return;const h=ROOT.querySelector('.top h1, .v449-nav h1, h1');if(!h)return;const t=(h.textContent||'').trim();if(!/Pono Learning Quest|今日の学習|漢字395字・思い出し復習|漢字の個別学習記録/.test(t))return;const e=element('section','entry');e.append(element('strong','','📊 漢字の学習まとめ｜v450'),text('読む・形・書字・意味・復習を混同せず、次の練習を考えます。','small'),button('個別の学習まとめを開く →',home450,'primary'));(h.closest('.top,.v449-nav')||h).insertAdjacentElement('afterend',e)}
let pending=false;const mo=new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;inject()})});mo.observe(ROOT,{subtree:true,childList:true});
window.ponoKanji450=home450;window.ponoKanji450Data={row,info,state,allRows,getPack,exportCSV};inject();
})();
