/* Pono Learning Quest v437 | writing-optional spaced recall (original practice) */
(()=>{'use strict';
if(window.ponoKanji437) return;
const ROOT=document.getElementById('app');
const DATA=window.ponoKanji435Data;
if(!ROOT||!Array.isArray(DATA)) return;
const PARTS={'亻':'にんべん','扌':'てへん','氵':'さんずい','阝':'こざとへん','囗':'くにがまえ','飠':'しょくへん','宀':'うかんむり','⺮':'たけかんむり','冖':'わかんむり','衤':'ころもへん','牜':'うしへん','糸':'いとへん','刂':'りっとう','禾':'のぎへん','貝':'かい','言':'ごんべん','忄':'りっしんべん','攵':'のぶん','頁':'おおがい','辶':'しんにょう','金':'かねへん','月':'つき','木':'き','力':'ちから','立':'たつ','青':'あお','女':'おんな','土':'つち','口':'くち','心':'こころ'};
const POSITION={'左右':['左','右'],'上下':['上','下'],'囲み':['外側','内側']};
const REVIEW_DAYS=[1,3,7,14];
let grade=4,queue=[],index=0,showAnswer=false,usedHint=false, sourceLabel='';
function learner(){try{if(typeof profile!=='undefined'&&profile&&profile.id!=null)return String(profile.id)}catch(_){}return 'trial'}
function key(){return 'pono437-recall:'+learner()}
function pastKey(){return 'pono436-component-progress:'+learner()}
function charKey(k){return `${k.g}-${k.c}`}
function localDay(d=new Date()){const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),n=String(d.getDate()).padStart(2,'0');return `${y}-${m}-${n}`}
function validDay(x){if(typeof x!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(x))return false;let d=new Date(x+'T12:00:00');return !isNaN(d.getTime())&&localDay(d)===x}
function afterDays(day,n){const d=validDay(day)?new Date(day+'T12:00:00'):new Date();d.setDate(d.getDate()+n);return localDay(d)}
function cleanState(v){if(!v||typeof v!=='object'||Array.isArray(v))return null;return {stage:Math.min(4,Math.max(0,Number(v.stage)||0)),next:validDay(v.next)?v.next:localDay(),last:validDay(v.last)?v.last:null,tries:Math.max(0,Number(v.tries)||0),withHint:Math.max(0,Number(v.withHint)||0),source:v.source==='v436'?'v436':'v437'};}
function read(){let s={};try{const p=JSON.parse(localStorage.getItem(key())||'{}');if(p&&typeof p==='object'&&!Array.isArray(p))for(const [k,v] of Object.entries(p)){const clean=cleanState(v);if(clean)s[k]=clean}}catch(_){}
 // v436 recorded an activity, not mastery: schedule a first recall one day after that activity.
 try{const past=JSON.parse(localStorage.getItem(pastKey())||'{}');if(past&&typeof past==='object')for(const k of DATA){const id=charKey(k);const old=past[`build-${k.g}-${k.c}`];if(!s[id]&&old?.done){const at=validDay(old.at)?old.at:localDay();s[id]={stage:0,next:afterDays(at,1),last:at,tries:0,withHint:0,source:'v436'};}}}catch(_){}
 return s;}
let states=read();
function persist(){try{localStorage.setItem(key(),JSON.stringify(states));return true}catch(e){return false}}
function sync(){states=read()}
function tag(n,cls,text){const e=document.createElement(n);if(cls)e.className=cls.split(' ').map(a=>'v437-'+a).join(' ');if(text!==undefined)e.textContent=String(text);return e}
function txt(n,cls,str){return tag(n,cls,str)}
function btn(label,cb,type='secondary'){const b=tag('button','btn '+type,label);b.type='button';b.addEventListener('click',cb);return b;}
function block(title){const e=tag('section','card');e.append(txt('h2','card-title',title));return e;}
function speak(s,slow=false){if(!('speechSynthesis'in window))return;try{window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(s);u.lang='ja-JP';u.rate=slow?.68:.9;window.speechSynthesis.speak(u)}catch(_){}}
function stopSpeak(){try{window.speechSynthesis?.cancel()}catch(_){}}
function back(){if(typeof window.ponoKanji436==='function')return window.ponoKanji436();if(typeof window.ponoKanji435==='function')return window.ponoKanji435();try{if(typeof home==='function')return home()}catch(_){}ROOT.replaceChildren(txt('p','desc','前の画面へは、ページを再読み込みして戻ってください。'))}
function page(title,backFn){stopSpeak();ROOT.replaceChildren();const main=tag('div','page');const header=tag('div','header');header.append(btn('← もどる',backFn||back),txt('h1','heading',title));main.append(header);ROOT.append(main);try{window.scrollTo(0,0)}catch(_){}return main;}
function all(){return DATA.filter(k=>k.g===grade)}
function state(k){return states[charKey(k)]}
function due(k){const s=state(k);return !!s&&s.next<=localDay()}
function dayLabel(d){if(!validDay(d))return '未設定';const [y,m,n]=d.split('-');return `${Number(m)}月${Number(n)}日`}
function main(){sync();const p=page('🌱 漢字の思い出し復習 v437',back);const tabs=tag('div','tabs');for(let g of [4,5])tabs.append(btn(`小学${g}年`,()=>{grade=g;main()},grade===g?'active':'secondary'));p.append(tabs);
 const items=all(),dueItems=items.filter(due),newItems=items.filter(k=>!state(k)),later=items.filter(k=>state(k)&&!due(k));
 const intro=block('今日の復習を選ぼう');intro.append(txt('p','desc','書かずに「思い出す → 必要ならヒント → 答えを確かめる」。できたら次回は少し日を空けます。1日・3日・7日・14日を目安に復習します。'));
 const counts=tag('div','counts');for(const [a,b] of [[dueItems.length,'今日の復習'],[newItems.length,'まだ始めていない字'],[later.length,'次回を待っている字']]){const t=tag('div','count');t.append(txt('strong','count-number',a),txt('span','count-label',b));counts.append(t)}intro.append(counts);
 intro.append(btn(`⏰ 今日の復習（${dueItems.length}字・最大5字ずつ）`,()=>start(dueItems.slice(0,5),'今日の復習'), 'primary'));
 intro.append(btn(`🌷 新しい3字を学ぶ`,()=>start(newItems.slice(0,3),'新しい漢字')));
 intro.append(btn(`📚 小学${grade}年の漢字から選ぶ`,listing));p.append(intro);
 if(!dueItems.length){const a=block('今日の復習が0字のとき');a.append(txt('p','desc',newItems.length?'新しい字を3字だけ学ぶか、「漢字から選ぶ」で好きな漢字を選べます。':'復習の予定日が来るまでは休んでも大丈夫。いつでも練習できます。'));p.append(a)}
 if(later.length){const x=later.slice().sort((a,b)=>state(a).next.localeCompare(state(b).next));const b=block('これからの予定');b.append(txt('p','desc',x.slice(0,8).map(k=>`${k.c}：${dayLabel(state(k).next)}`).join('　／　')));p.append(b)}
 const note=block('大切にすること');note.append(txt('p','desc','「ヒントを見た」「思い出せた」は子どもの自己申告です。漢字が正確に書けるという判定ではありません。今日は疲れていたら1字で終了しても大丈夫。'));
 note.append(txt('p','desc',learner()==='trial'?'現在は仮の学習者です。記録を分けたい場合は先に学習者を選んでください。':'記録は、選択中の学習者ごとにこの端末内へ保存します。'));p.append(note);
}
function listing(){sync();const p=page(`小学${grade}年｜漢字を選ぶ`,main),b=block('好きな字から1問ずつ');b.append(txt('p','desc','「今日の復習日」より前でも、いつでも見直せます。'));
 const grid=tag('div','grid');for(const k of all()){const s=state(k);const lab=s?(due(k)?'復習する日':`次回 ${dayLabel(s.next)}`):'未学習';const item=btn(k.c+'\n'+lab,()=>start([k],'選んで復習'),'pick');item.setAttribute('aria-label',k.c+' '+lab);grid.append(item)}b.append(grid);p.append(b)}
function start(q,source){if(!q.length){const p=page('今日の学習はありません',main),b=block('おつかれさま');b.append(txt('p','desc','今は対象の字がありません。「漢字から選ぶ」からも練習できます。'),btn('一覧に戻る',main,'primary'));p.append(b);return}queue=q;index=0;sourceLabel=source;renderPrompt()}
function positions(k){let pos=POSITION[k.layout]||POSITION.左右;let a=PARTS[k.a]||k.a,b=PARTS[k.b]||k.b;return `${pos[0]}は「${a}」、${pos[1]}は「${b}」`}
function hint(k){return `${positions(k)}。合わせると「${k.c}」です。`}
function renderPrompt(){if(index>=queue.length){finish();return}showAnswer=false;usedHint=false;const k=queue[index],p=page(`🌱 ${sourceLabel}　${index+1}/${queue.length}`,main),b=block('漢字を見ずに思い出そう');b.append(txt('p','prompt','この言葉の漢字を思い出せるかな？'));
 b.append(txt('div','word',`ことば：${k.word.split(k.c).join('□')}`));
 const cover=txt('div','hidden','？');cover.setAttribute('aria-label','漢字はまだ隠れています');b.append(cover);
 b.append(btn('🔊 ことばを聞く',()=>speak(k.word)),btn('🐢 ゆっくり聞く',()=>speak(k.word,true)));
 b.append(txt('p','desc','頭の中で思い浮かべるだけでもOK。答えが出なくても、ヒントを使えます。'));
 b.append(btn('💡 部品のヒントを見る',()=>{usedHint=true;showHint(k)},'secondary'));
 b.append(btn('👀 答えを確かめる',()=>show(k,false),'primary'));p.append(b);
}
function showHint(k){const p=page(`🌱 ${sourceLabel}　${index+1}/${queue.length}`,main),b=block('部品のヒント');b.append(txt('div','hidden','？'),txt('p','desc',positions(k)));b.append(btn('🔊 ヒントを聞く',()=>speak(positions(k))),btn('🐢 ゆっくり聞く',()=>speak(positions(k),true)));
 b.append(txt('p','desc','形をイメージできたら、答えを見て確かめよう。'));b.append(btn('答えを見て確認する →',()=>show(k,true),'primary'));p.append(b)}
function show(k,fromHint){showAnswer=true;const p=page(`🌱 ${sourceLabel}　${index+1}/${queue.length}`,main),b=block('形を確かめよう');b.append(txt('div','kanji',k.c),txt('p','word',k.word),txt('p','desc',positions(k)));
 b.append(btn('🔊 部品の位置を聞く',()=>speak(positions(k))),btn('🐢 ゆっくり聞く',()=>speak(positions(k),true)));
 b.append(txt('p','question','答えを見る前に、どのくらい思い出せた？'));
 if(fromHint||usedHint)b.append(txt('p','help-note','ヒントを見て確かめた回です。無理に「自力でできた」を選ばなくて大丈夫。'));
 if(!(fromHint||usedHint))b.append(btn('😊 自力で思い出せた',()=>record(k,true),'primary'));
 b.append(btn('🌱 ヒントが必要だった・まだ難しい',()=>record(k,false),fromHint||usedHint?'primary':'secondary'));
 b.append(txt('p','small','自分で選べます。書き取りの正誤を採点するものではありません。'));p.append(b)}
function record(k,success){const today=localDay();const id=charKey(k),prev=state(k)||{stage:0,tries:0,withHint:0};const newStage=success?Math.min(4,prev.stage+1):0;const offset=success?REVIEW_DAYS[newStage-1]:1;
 states[id]={stage:newStage,next:afterDays(today,offset),last:today,tries:(prev.tries||0)+1,withHint:(prev.withHint||0)+(success?0:1),source:'v437'};
 const stored=persist();index++;if(index<queue.length){renderPrompt();return}finish(stored)}
function finish(stored=true){const p=page('🌷 今日の学習はここまで',main),b=block('少しずつ思い出そう');b.append(txt('div','done',`${queue.length}字に取り組みました`));b.append(txt('p','desc','「思い出せた字」も「ヒントを使った字」も、どちらも学習の大切な記録です。次の予定日にまた見直せます。'));
 if(!stored)b.append(txt('p','warning','端末の保存に失敗した可能性があります。ブラウザーの保存設定を確認してください。'));
 b.append(btn('今日の予定を見る',main,'primary'),btn('好きな漢字を選ぶ',listing));p.append(b)}
function inject(){if(ROOT.querySelector('.v437-page,.v437-entry'))return;const h=ROOT.querySelector('.top h1, .v436-nav h1, .v435-header h1, .v434-header h1, h1');if(!h)return;const t=(h.textContent||'').trim();if(!(/Pono Learning Quest|漢字の部品|漢字のことば学習|漢字の全字チェック|今日の学習/.test(t)))return;const entry=tag('section','entry');entry.append(txt('strong','entry-title','🌱 漢字の思い出し復習｜v437'),txt('p','desc','書かずに、1日・3日・7日・14日を目安に思い出す練習をします。'),btn('今日の漢字を復習する →',main,'primary'));(h.closest('.top,.v435-header,.v434-header,.v436-nav')||h).insertAdjacentElement('afterend',entry)}
let scheduled=false;const observer=new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;inject()})});observer.observe(ROOT,{childList:true,subtree:true});
window.ponoKanji437=main;window.ponoKanji437Data={total:DATA.length,intervals:REVIEW_DAYS.slice(),status:()=>{sync();return states}};
inject();
})();
