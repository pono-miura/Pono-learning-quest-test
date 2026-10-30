/* Pono Learning Quest v438 — individual kanji support record; no mandatory handwriting. */
(()=>{'use strict';
if(window.ponoKanji438)return;
const ROOT=document.getElementById('app'),A=window.ponoKanji434Data,B=window.ponoKanji435Data;
if(!ROOT||!A||!A.kanji||!Array.isArray(B))return;
const ALL={4:A.kanji['4'],5:A.kanji['5']},CUES=new Map(B.map(k=>[k.g+'-'+k.c,k]));
const READ=[['none','未確認'],['can','読める'],['support','手がかりで読める'],['practice','練習中']];
const SHAPE=[['none','未確認'],['can','形を説明できる'],['support','部品を見れば分かる'],['practice','練習中']];
const WRITE=[['none','未確認・実施しない'],['can','自力で書ける'],['support','手本や支援で書ける'],['alternate','入力・選択で表現できる'],['difficult','書字の負担が大きい']];
const BURDEN=[['none','未確認・記入しない'],['low','負担は少なめ'],['medium','少し疲れる'],['high','負担が大きい']];
const METHODS=[['none','未選択'],['speak','口頭で答える'],['choice','選択肢で答える'],['typing','キーボードで入力'],['trace','指でなぞる'],['paper','紙に書く（本人が望むとき）']];
const PARTS={'亻':'にんべん','扌':'てへん','氵':'さんずい','阝':'こざとへん','囗':'くにがまえ','飠':'しょくへん','宀':'うかんむり','⺮':'たけかんむり','冖':'わかんむり','衤':'ころもへん','牜':'うしへん','糸':'いとへん','刂':'りっとう','禾':'のぎへん','言':'ごんべん','忄':'りっしんべん','攵':'のぶん','頁':'おおがい','辶':'しんにょう','木':'き','月':'つき','土':'つち','金':'かね','口':'くち','女':'おんな','心':'こころ'};
const LAYOUT={'左右':['左','右'],'上下':['上','下'],'囲み':['外側','内側']};
let grade=4,filter='all',search='',pageName='main',activeChar=null;let saveWarning='';
function learner(){try{if(typeof profile!=='undefined'&&profile&&profile.id!=null)return String(profile.id)}catch(_){}return 'trial'}
function key(){return 'pono438-kanji-profile:'+learner()}
function getJSON(k){try{const r=JSON.parse(localStorage.getItem(k)||'{}');return r&&typeof r==='object'&&!Array.isArray(r)?r:{}}catch(_){return {}}}
function id(g,c){return `${g}-${c}`}
function sanitizeRec(s){if(!s||typeof s!=='object'||Array.isArray(s))return {};
 const accepted=(x,opts)=>opts.some(a=>a[0]===x)?x:'none';return {read:accepted(s.read,READ),shape:accepted(s.shape,SHAPE),write:accepted(s.write,WRITE),burden:accepted(s.burden,BURDEN),method:accepted(s.method,METHODS),note:typeof s.note==='string'?s.note.slice(0,280):'',updated:typeof s.updated==='string'?s.updated.slice(0,40):''};}
function mine(){return getJSON(key())}
function put(g,c,value){const all=mine();all[id(g,c)]=sanitizeRec(value);all[id(g,c)].updated=new Date().toISOString();try{localStorage.setItem(key(),JSON.stringify(all));saveWarning='';return true}catch(_){saveWarning='端末内の保存に失敗しました。容量やブラウザーの設定をご確認ください。';return false}}
function priorRead(g,c){const v=getJSON('pono434-kanji:'+learner()+':g'+g)[c];return v==='ok'?'can':v==='practice'?'practice':'none'}
function priorShape(g,c){const v=getJSON('pono435-oral-kanji:'+learner())[g+'_'+c]?.state;return v==='can'?'can':v==='review'?'practice':'none'}
function readRec(g,c){const raw=mine()[id(g,c)];if(raw&&typeof raw==='object'){const r=sanitizeRec(raw);return {...r,source:'v438'}}return {read:priorRead(g,c),shape:priorShape(g,c),write:'none',burden:'none',method:'none',note:'',updated:'',source:'older'}}
function newest(g,c){const k=CUES.get(id(g,c));const e=getJSON('pono437-recall:'+learner())[id(g,c)];const t=getJSON('pono436-component-progress:'+learner())['build-'+g+'-'+c];return {cue:k,recall:e||null,built:!!t?.done};}
function selected(arr,code){return arr.find(x=>x[0]===code)?.[1]||'未確認'}
function el(tag,name,text){const e=document.createElement(tag);if(name)e.className=name.trim().split(/\s+/).map(s=>'v438-'+s).join(' ');if(text!=null)e.textContent=String(text);return e}
function btn(text,cb,kind=''){const b=el('button','btn '+kind,text);b.type='button';b.addEventListener('click',cb);return b}
function card(title){const box=el('section','card');if(title)box.append(el('h2','',title));return box}
function say(s,slow=false){if(!('speechSynthesis'in window))return;try{window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(String(s));u.lang='ja-JP';u.rate=slow?0.68:0.93;window.speechSynthesis.speak(u)}catch(_){}}
function stopSay(){try{window.speechSynthesis?.cancel()}catch(_){}}
function exit(){if(typeof home==='function'){try{home();return}catch(_){}}if(window.ponoKanji437){window.ponoKanji437();return}ROOT.replaceChildren(el('p','desc','ホームへは再読み込みで戻ってください。'))}
function screen(title,back){stopSay();ROOT.replaceChildren();const p=el('div','page');const nav=el('div','nav');nav.append(btn('← もどる',back||exit),el('h1','',title));p.append(nav);ROOT.append(p);try{window.scrollTo(0,0)}catch(_){}return p}
function tabs(p,onSwitch=main){const row=el('div','tabs');for(const g of [4,5])row.append(btn('小学'+g+'年',()=>{grade=g;filter='all';search='';onSwitch()},grade===g?'active':''));p.append(row)}
function info(p){const learnerNote=el('p','small',learner()==='trial'?'現在は仮の学習者の端末内記録です。子どもごとに管理するときは、先に学習者を選んでください。':'選択中の学習者の記録を、この端末内で管理しています。');p.append(learnerNote);if(saveWarning)p.append(el('p','warning',saveWarning))}
function tally(g){const r={total:ALL[g].length,read:0,shape:0,write:0,alt:0,burden:0,untested:0};for(const c of ALL[g]){const x=readRec(g,c);if(x.read==='can'||x.read==='support')r.read++;if(x.shape==='can'||x.shape==='support')r.shape++;if(x.write==='can'||x.write==='support')r.write++;if(x.write==='alternate')r.alt++;if(x.burden==='high'||x.write==='difficult')r.burden++;if(x.read==='none'&&x.shape==='none'&&x.write==='none')r.untested++;}return r;}
function progress(g){const m=tally(g),s=card('できることを別々に見る');s.append(el('p','desc','これらは確認した状態の記録です。読み・形の理解・書字は、別の力として扱います。'));const vals=[['読む',m.read],['形が分かる',m.shape],['手書き',m.write]];const grid=el('div','statgrid');for(const [name,num] of vals){const x=el('div','stat');x.append(el('strong','num',num+'字'),el('span','label',name+'（確認できた字）'));grid.append(x)}s.append(grid);const bars=el('div','bars');for(const [name,num] of vals){const line=el('div','barline');line.append(el('span','',name));const track=el('div','track'),fill=el('div','fill');fill.style.width=(num/m.total*100).toFixed(1)+'%';track.append(fill);line.append(track,el('strong','',num+'/'+m.total));bars.append(line)}s.append(bars);
 s.append(el('p','small',`未確認（3項目とも）：${m.untested}字 ／ 入力・選択で表現できる：${m.alt}字 ／ 書字負担が大きいとの記録：${m.burden}字`));return s;}
function main(){pageName='main';const p=screen('🌿 漢字の個別学習記録 v438',exit);tabs(p);
 const intro=card('「読める」と「書ける」は別の力');intro.append(el('p','desc','手で書くことが難しくても、漢字を読んだり、意味や形を理解したりできる場合があります。書字が難しいことだけで、漢字全体が苦手とは判断しません。'));intro.append(el('p','desc','小学4年202字・5年193字の一覧を使います。部品の言葉による手がかりは、v435で用意した73字に表示します。'));p.append(intro,progress(grade));
 const action=card('今の状態を記録する');action.append(btn('🔎 漢字を選んで確認する →',listing,'primary'),btn('📋 先生・保護者向けまとめ →',report));action.append(el('p','small','過去のv434「読める」とv435「形を説明できた」は、項目を分けて参考表示します。v436・v437の練習履歴は習得判定とは区別します。'));p.append(action);info(p);
}
function listing(){pageName='list';const p=screen('小学'+grade+'年｜漢字を選ぶ',main);const box=card('一字ずつ、負担なく確認');box.append(el('p','desc','気になる字を選び、「読み・形の理解・書字」をそれぞれ記録できます。書字は確認せずに終えてもかまいません。'));p.append(box);
 const finder=el('input','search');finder.type='search';finder.placeholder='漢字をさがす（例：技）';finder.setAttribute('aria-label','漢字を検索');finder.value=search;p.append(finder);
 const row=el('div','filters');for(const [f,label] of [['all','すべて'],['need','未確認を優先'],['read','読める字'],['write','書く負担に配慮']])row.append(btn(label,()=>{filter=f;render()},filter===f?'active':''));p.append(row);
 const count=el('p','small',''),tiles=el('div','grid'),more=btn('もっと見る',()=>{limit+=48;renderTiles()},'');p.append(count,tiles,more);let limit=48,matched=[];
 function renderTiles(){tiles.replaceChildren();count.textContent=`${matched.length}字のうち${Math.min(limit,matched.length)}字を表示`;
 for(const c of matched.slice(0,limit)){const x=readRec(grade,c);const b=el('button','tile');b.type='button';b.setAttribute('aria-label',c+'の学習状況を確認');b.append(el('strong','tilechar',c),el('span','tilehint',(x.read==='can'?'読○':x.read==='support'?'読△':'読—')+' / '+(x.shape==='can'?'形○':x.shape==='support'?'形△':'形—')));b.addEventListener('click',()=>detail(grade,c));tiles.append(b)}more.hidden=limit>=matched.length;}
 function render(){row.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('v438-active',['all','need','read','write'][i]===filter));matched=ALL[grade].filter(c=>{const x=readRec(grade,c);return (!search||c.includes(search))&&(filter==='all'||(filter==='need'?(x.read==='none'||x.shape==='none'||x.write==='none'):filter==='read'?(x.read==='can'||x.read==='support'):(x.write==='difficult'||x.write==='alternate'||x.burden==='high')))});limit=48;renderTiles()}
 finder.addEventListener('input',()=>{search=finder.value.trim();render()});render();info(p);}
function optionsGroup(parent,name,arr,val,onChange){const h=el('h3','',name),grid=el('div','controlgroup');parent.append(h,grid);for(const [code,label] of arr){const b=el('button','choice',label);b.type='button';b.dataset.selected=String(val===code);b.setAttribute('aria-pressed',String(val===code));b.addEventListener('click',()=>{onChange(code);for(const child of grid.children){const isSel=child===b;child.dataset.selected=String(isSel);child.setAttribute('aria-pressed',String(isSel))}});grid.append(b)}}
function cueText(k){if(!k)return '';const d=LAYOUT[k.layout]||LAYOUT.左右;return `${d[0]}に「${PARTS[k.a]||k.a}」、${d[1]}に「${PARTS[k.b]||k.b}」`}
function detail(g,c){pageName='detail';activeChar=c;const k=newest(g,c),previous=readRec(g,c),draft={read:previous.read,shape:previous.shape,write:previous.write,burden:previous.burden,method:previous.method,note:previous.note||'',updated:previous.updated};
 const p=screen(`漢字の確認｜${c}`,listing);const top=card('まず、書かずに確認');top.append(el('div','focuschar',c));
 const cues=k.cue?`ことばの例：${k.cue.word}。 ${cueText(k.cue)}。`:'部品の手がかりが未収録の字です。書かなくても「読み・意味・形」の確認はできます。';top.append(el('p','desc',cues));
 if(k.cue){top.append(btn('🔊 部品の説明を聞く',()=>say(cueText(k.cue))),btn('🐢 ゆっくり聞く',()=>say(cueText(k.cue),true)))}top.append(btn('🔊 漢字を聞く',()=>say(c)));p.append(top);
 const history=card('これまでの取り組み（参考）');let any=false;
 const oldread=priorRead(g,c),oldshape=priorShape(g,c);if(oldread!=='none'){history.append(el('span','chip','v434 読み：'+selected(READ,oldread)));any=true}if(oldshape!=='none'){history.append(el('span','chip','v435 形の説明：'+selected(SHAPE,oldshape)));any=true}if(k.built){history.append(el('span','chip','v436 部品を組み立てた'));any=true}if(k.recall){history.append(el('span','chip','v437 復習 '+(k.recall.tries||0)+'回'));any=true}if(!any)history.append(el('p','desc','これまでの関連記録はありません。'));history.append(el('p','small','取り組んだ回数は「身に付いた」という証明ではありません。'));p.append(history);
 const st=card('今回の確認を記録');st.append(el('p','desc','それぞれ独立した項目です。見て確かめたことだけ選び、判断できない項目は「未確認」で大丈夫です。'));
 optionsGroup(st,'① 読む（読字）',READ,draft.read,x=>draft.read=x);
 optionsGroup(st,'② 形を説明する・部品を理解する',SHAPE,draft.shape,x=>draft.shape=x);
 optionsGroup(st,'③ 書く・代替方法で表す（任意）',WRITE,draft.write,x=>draft.write=x);
 optionsGroup(st,'④ 書くときの負担（任意）',BURDEN,draft.burden,x=>draft.burden=x);
 optionsGroup(st,'⑤ 答え方・支援方法（任意）',METHODS,draft.method,x=>draft.method=x);
 st.append(el('h3','','先生・保護者のメモ（任意）'));const textarea=el('textarea','textarea');textarea.maxLength=280;textarea.placeholder='例：部品を口で説明できた。鉛筆よりキーボードが楽。';textarea.value=draft.note;st.append(textarea);
 const msg=el('p','small',''),saveBtn=btn('💾 この漢字の記録を保存',()=>{draft.note=textarea.value.slice(0,280);if(put(g,c,draft)){msg.textContent='この漢字の5項目を保存しました。';msg.className='v438-message';}else{msg.textContent=saveWarning;msg.className='v438-warning'}},'primary');st.append(saveBtn,msg,btn('保存して次の漢字へ',()=>{draft.note=textarea.value.slice(0,280);if(put(g,c,draft)){const a=ALL[g];const i=a.indexOf(c);detail(g,a[(i+1)%a.length]);}else{msg.textContent=saveWarning;msg.className='v438-warning'}}));p.append(st);
 const note=card('今日、書かない選択もOK');note.append(el('p','desc','読む・選ぶ・口頭で答えることも大切な学びです。書くかどうかは体調や本人の希望に合わせて決めてください。'));p.append(note);info(p);
}
function report(){pageName='report';const p=screen('先生・保護者向け｜学習のまとめ',main);tabs(p,report);const a=card('小学'+grade+'年｜個別の学び方');a.append(el('p','desc','合計だけで一人ひとりの力を決めつけず、「読みと形の理解」「書字・表現手段」を分けて支援を考えるための記録です。'));p.append(a,progress(grade));
 const t=tally(grade),s=card('支援を考えるときの視点');if(t.read>t.write)s.append(el('p','message','読む力が確認された字の数は、手書きが確認された字の数より多くなっています。回答方法の工夫を考える手がかりになります。ただし、確認した字や機会の違いによる可能性もあります。'));
 else s.append(el('p','desc','書く力の確認数が少なくても、「未確認」なのか「負担が大きい」のかは分けて見ます。'));s.append(el('p','desc',`代替方法で表現できた字：${t.alt}字。書字負担の大きさに関する記録：${t.burden}字。いずれも診断や能力の総合点ではありません。`));p.append(s);
 const examples=card('確認の例');examples.append(el('p','desc','読み：漢字の入った短い言葉を読み、意味を話せるか。形：部品や位置を口で説明できるか。書字：本人が望む場合に一字だけ試し、疲労や代替方法も観察する。'));p.append(examples);
 const buttons=card('記録を共有する');buttons.append(el('p','desc','CSVは学年・漢字・各項目の状態・確認日時だけを出力します。メモや学習者IDは含めません。共有先は確認して扱ってください。'));buttons.append(btn('📄 この学年の記録をCSVで保存',()=>exportCSV(grade),'primary'),btn('🖨️ この画面を印刷',()=>window.print()));p.append(buttons);info(p);
}
function csvField(v){const str=String(v==null?'':v);return '"'+str.replace(/"/g,'""')+'"'}
function exportCSV(g){const header=['学年','漢字','読み','形の理解','書字・代替','書字負担','答え方','確認日時'];const data=ALL[g].map(c=>{const r=readRec(g,c);return [g,c,selected(READ,r.read),selected(SHAPE,r.shape),selected(WRITE,r.write),selected(BURDEN,r.burden),selected(METHODS,r.method),r.updated?String(r.updated).slice(0,10):'']});const csv='\uFEFF'+[header,...data].map(row=>row.map(csvField).join(',')).join('\r\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),href=URL.createObjectURL(blob),a=document.createElement('a');a.href=href;a.download=`Pono_v438_kanji_grade${g}.csv`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(href),1000)}
function inject(){if(ROOT.querySelector('.v438-page,.v438-entry'))return;const h=ROOT.querySelector('.top h1, .v434-header h1, .v435-header h1, .v436-nav h1, .v437-header h1, h1');if(!h)return;const text=(h.textContent||'').trim();if(!/Pono Learning Quest|今日の学習|漢字の思い出し復習|漢字の部品|漢字のことば学習|漢字の全字チェック/.test(text))return;const entry=el('section','entry');entry.append(el('strong','','🌿 漢字の個別学習記録｜v438'),el('p','desc','「読む・形が分かる・書く」を分けて記録。書かない選択も大切にします。'),btn('漢字の個別記録を開く →',main,'primary'));(h.closest('.top,.v434-header,.v435-header,.v436-nav,.v437-header')||h).insertAdjacentElement('afterend',entry)}
let scheduled=false;const watcher=new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;inject()})});watcher.observe(ROOT,{childList:true,subtree:true});
window.ponoKanji438=main;window.ponoKanji438Data={counts:{4:ALL[4].length,5:ALL[5].length},get:(g,c)=>readRec(g,c),summary:g=>tally(g)};inject();
})();
