/* Pono Learning Quest v463 — はじめての操作ガイド / 学習前の先生確認
   操作練習は採点しない。漢字の習得評価や既存の学習記録を変更しない。 */
(()=>{'use strict';
if(window.ponoStart463)return;
const ROOT=document.getElementById('app');if(!ROOT)return;
const ACTIVE='pono454-active-device',KEY='pono463-guide:';
let phase='home',stage=0,openedId=null,checkedPerson=false,checkedDevice=false,practised=false,hintOpen=false,heard=false,paused=false,notice='';
const object=x=>x&&typeof x==='object'&&!Array.isArray(x)?x:{};
const raw=k=>{try{return object(JSON.parse(localStorage.getItem(k)||'null'))}catch(_){return {}}};
function student(){try{if(typeof profile!=='undefined'&&profile&&profile.id!==undefined&&profile.id!==null&&String(profile.id).trim()&&String(profile.id)!=='trial')return String(profile.id)}catch(_){}return null}
const active=()=>{const a=raw(ACTIVE);return !!(a.studentId&&String(a.studentId).trim())};
const current=()=>openedId===student();
function saved(){const id=student();return id?raw(KEY+id):{}}
function save(){const id=student();if(!id)return false;try{localStorage.setItem(KEY+id,JSON.stringify({completedAt:new Date().toISOString(),version:463,practice:'操作の体験のみ・採点なし'}));return true}catch(_){notice='この端末には操作ガイドの完了を保存できませんでした。';return false}}
function stop(){try{speechSynthesis.cancel()}catch(_){}}
function say(s){if(!('speechSynthesis'in window)){notice='音声を使えない端末です。文字を見て進められます。';render();return}try{stop();const u=new SpeechSynthesisUtterance(s);u.lang='ja-JP';u.rate=.82;speechSynthesis.speak(u)}catch(_){notice='音声が出ない場合は、文字だけで進められます。';render()}}
const el=(tag,cl='',content)=>{const x=document.createElement(tag);if(cl)x.className=cl.split(' ').filter(Boolean).map(t=>'v463-'+t).join(' ');if(content!==undefined)x.textContent=String(content);return x};
const p=(s,cl='text')=>el('p',cl,s);
const card=t=>{const x=el('section','card');x.append(el('h2','heading',t));return x};
function button(text,act,cls='',allowSwitch=false){const x=el('button','btn '+cls,text);x.type='button';x.addEventListener('click',()=>{if(!allowSwitch&&(!current()||active())){phase='home';stage=0;checkedPerson=false;checkedDevice=false;notice='学習者が切り替わったか、子どもの学習画面が開いています。先生が確認し直してください。';render();return}act()});return x}
function homeOriginal(){stop();phase='home';stage=0;if(typeof home==='function'){try{home();return}catch(_){}}ROOT.replaceChildren(p('トップに戻る場合はページを再読み込みしてください。'))}
function shell(title,back){stop();ROOT.replaceChildren();const main=el('main','page'),nav=el('div','nav');nav.append(button('← 戻る',back||homeOriginal,'',true),el('h1','title',title));main.append(nav);ROOT.append(main);try{window.scrollTo(0,0)}catch(_){}return main}
function checklist(text,yes,cb){const label=el('label','check'),input=el('input');input.type='checkbox';input.checked=yes;input.addEventListener('change',()=>{cb(input.checked);render()});label.append(input,el('span','',text));return label}
function entry(){phase='home';stage=0;practised=false;hintOpen=false;heard=false;paused=false;checkedPerson=false;checkedDevice=false;openedId=student();notice='';render()}
function stats(){const id=student();const v=saved(),a=raw(ACTIVE);return {trial:!id,finished:!!v.completedAt,completedAt:String(v.completedAt||'').slice(0,10),busy:!!a.studentId,busyOther:!!(a.studentId&&String(a.studentId)!==id)}}
function render(){let main=shell('🌱 Pono｜はじめての学習ガイド v463',homeOriginal);if(!current()){phase='home';checkedPerson=false;checkedDevice=false;openedId=student();notice='学習者の選択が変わりました。先生の確認をやり直してください。'}
const s=stats();if(s.busy){const c=card('子どもの学習中です');c.append(p('子ども用画面が使用中です。先生へ返却して学習を一時停止・終了してからガイドを開いてください。','warn'));if(typeof window.ponoKanji454==='function')c.append(button('v454｜学習画面を確認する',()=>window.ponoKanji454(),'primary',true));main.append(c);return}
if(phase==='home'){
 const c=card('まずは操作の練習から');c.append(p('漢字の学習を始める前に、大きなボタン・読み上げ・ヒント・休憩の使い方を体験します。操作練習はテストではありません。'));
 c.append(p(s.trial?'現在は体験モードです。個別記録を残す場合は、先にトップ画面で学習者を選択してください。':`現在選択中の学習者の準備を行います。${s.finished?'この学習者は以前に操作ガイドを体験しています。':'この学習者の操作ガイドは未完了です。'}`,'muted'));
 c.append(button('先生：学習前の確認へ',()=>{phase='prepare';render()},'primary'),button('先生：学習後の確認へ',()=>{phase='after';render()}));main.append(c);
 const x=card('実際の漢字学習へ');x.append(p('ガイドを体験した後も、従来どおりv455で学習者の最終確認をし、v454で今日の漢字を3〜5字準備します。','muted'));
 x.append(button('v455｜先生の学習前チェック',()=>openExisting('ponoKanji455','v455')));main.append(x);
 const y=card('使う前に知っておくこと');y.append(p('この画面は操作の練習をするためのものです。読み・形・書字の評価は付けず、先生の記録も書き換えません。','muted'),p('子ども用画面で先生の管理機能を隠していても、パスワード認証ではありません。共用端末は先生が管理してください。','muted'));main.append(y)
}else if(phase==='prepare'){
 const c=card('① 先生が確認すること');c.append(p(s.trial?'体験モードです。学習者の記録を残すにはトップで学習者を選んでください。':'学習者を選んでいることを先生が確認してください。画面に氏名は表示しません。','muted'));
 c.append(checklist('今、学習する本人を確認しました。',checkedPerson,v=>checkedPerson=v));c.append(checklist('前の子の画面や先生用の記録を閉じました。',checkedDevice,v=>checkedDevice=v));
 const begin=button('子どもへ渡して、使い方を練習する',()=>{phase='practice';stage=0;hintOpen=false;heard=false;paused=false;render()},'primary');begin.disabled=!(checkedPerson&&checkedDevice);c.append(begin);if(!begin.disabled)c.append(p('この後は操作の練習です。間違えても点数は付きません。','muted'));main.append(c)
}else if(phase==='practice'){
 const c=card('② いっしょに操作してみよう');c.append(el('div','count',`れんしゅう ${stage+1} / 4`));
 if(stage===0){c.append(el('div','big','🌼'),el('h3','prompt','おおきな ボタンを おしてみよう。'));c.append(button('🌟 ここを おす',()=>{stage=1;render()},'large primary'))}
 if(stage===1){c.append(el('div','big','🔊'),el('h3','prompt','「きく」を おしてみよう。'));c.append(button('🔊 ことばを きく',()=>{heard=true;render();say('ゆっくりで いいよ。じぶんの ペースで やってみよう。')},'large primary'));c.append(p('音が出ないときも、文字を見て進められます。','muted'));if(heard)c.append(button('つぎへ',()=>{stage=2;render()},'large'))}
 if(stage===2){c.append(el('div','big','💡'),el('h3','prompt','こまったときは ヒントを みよう。'));c.append(button('💡 ヒントを みる',()=>{hintOpen=true;render()},'large primary'));if(hintOpen){const hint=el('div','hint');hint.append(p('わからなくても だいじょうぶ。ヒントを みて、もういちど かんがえよう。'));c.append(hint,button('わかった！ つぎへ',()=>{stage=3;render()},'large'))}}
 if(stage===3){c.append(el('div','big','☕'),el('h3','prompt','つかれたら やすんで いいよ。'));c.append(button(paused?'▶ さいかいする':'☕ ちょっと やすむ',()=>{paused=!paused;render()},'large primary'));if(paused){c.append(p('やすんで いいよ。さいかい したくなったら ボタンを おしてね。','hint'))}else{c.append(button('🌸 せんせいに わたす',()=>{save();phase='done';render()},'large'))}}
 main.append(c);const note=card('みんなに伝えたいこと');note.append(p('はやく終わらなくても大丈夫。書くのが難しいときは、声で答えたり、選んだりしてもよいことを伝えてください。','muted'));main.append(note)
}else if(phase==='done'){
 const c=card('③ そうさの れんしゅう おわり！');c.append(el('div','big','🌷'),p('おおきなボタン・音声・ヒント・休憩を体験できました。これは漢字テストの結果ではありません。'));
 c.append(button('先生：本番の学習前チェックへ',()=>openExisting('ponoKanji455','v455'),'primary'),button('もう一度れんしゅうする',()=>{phase='prepare';checkedPerson=false;checkedDevice=false;render()}));main.append(c)
}else if(phase==='after'){
 const c=card('④ 学習後は先生が確認');const check=raw('pono455-handoff-check:'+(student()||'trial'));const logs=Array.isArray(check.entries)?check.entries:[];const recent=logs.slice(-1)[0];const today=new Date().toLocaleDateString('sv-SE');
 c.append(p('先生に端末を返した後、v455で終了・一時停止の状態を確認します。ここでは個別の成績を表示しません。'));
 c.append(p(recent?`この端末の直近の受け渡し記録：${String(recent.date||'日付なし')}（${recent.kind==='returned'?'返却確認':recent.kind==='paused'?'一時停止確認':recent.kind==='prepared'?'開始前確認':'記録あり'}）`:'まだこの学習者の受け渡し記録はありません。','muted'));
 c.append(button('v455｜先生の返却チェックへ',()=>openExisting('ponoKanji455','v455'),'primary'),button('v454｜子どもの学習状況を確認',()=>openExisting('ponoKanji454','v454')));main.append(c)
}
if(notice)main.append(p(notice,'notice'));
}
function openExisting(fn,name){stop();if(typeof window[fn]==='function'){window[fn]();return}notice=name+'の機能が読み込まれていません。以前のファイルを残しているか確認してください。';render()}
function inject(){if(ROOT.querySelector('.v463-page,.v463-entry'))return;const h=ROOT.querySelector('.top h1,h1');if(!h||!/^(Pono Learning Quest|今日の学習)/.test((h.textContent||'').trim()))return;const x=el('section','entry');x.append(el('strong','','🌱 v463｜はじめての学習ガイド'),p('はじめて使う子も安心。ボタン・音声・ヒント・休憩を練習して、本番の漢字学習へつなぎます。','muted'),button('ガイドを開く →',entry,'primary',true));const existing=ROOT.querySelector('.v462-entry');if(existing)existing.insertAdjacentElement('afterend',x);else (h.closest('.top')||h).insertAdjacentElement('afterend',x)}
function shortcut(){const host=ROOT.querySelector('.v461-page');if(!host||host.querySelector('.v463-shortcut'))return;const nav=host.querySelector('.v461-nav');if(!nav)return;const x=el('div','shortcut');x.append(button('🌱 初回の使い方ガイド v463',entry,'primary',true));nav.insertAdjacentElement('afterend',x)}
let queued=false;function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;inject();shortcut()})}
new MutationObserver(schedule).observe(ROOT,{childList:true,subtree:true});
window.ponoStart463=entry;window.ponoStart463Data={student,stats,saved,active};schedule();
})();
