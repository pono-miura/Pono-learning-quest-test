/* Pono Learning Quest v38.5 — 小学6年 5教科の復習ダッシュボード */
(function(){
'use strict';
const root=document.getElementById('app');if(!root)return;
const ITEMS=[
 {name:'国語',icon:'📖',subject:'国語',unit:'小学6年 国語全体 総まとめ',hint:'文章・資料・言葉を読む',entry:'[data-pono379-entry] button'},
 {name:'算数',icon:'🔢',subject:'算数',unit:'小学6年 算数全体 総まとめ',hint:'計算・図形・データ',entry:'[data-pono377-entry] button'},
 {name:'理科',icon:'🔬',subject:'理科',unit:'小学6年 理科全体 総まとめ',hint:'実験・観察から考える',entry:'[data-pono378-entry] button'},
 {name:'社会',icon:'🌏',subject:'社会',unit:'小学6年 社会全体 総まとめ',hint:'政治・歴史・世界',entry:'[data-pono371-entry] + button'},
 {name:'英語',icon:'🗣️',subject:'外国語',unit:'小学6年 英語全体 まとめテスト',hint:'聞く・読む・伝える',entry:'[data-pono384-entry] button'}
];
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const div=(tag,cls,html)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(html!==undefined)n.innerHTML=html;return n;};
const button=(label,fn,cls='soft')=>{const n=document.createElement('button');n.type='button';n.className=cls;n.textContent=label;n.addEventListener('click',fn);return n;};
function currentId(){try{return typeof profile!=='undefined'&&profile?profile.id:null}catch(e){return null}}
function latest(item){
 let data=[];try{data=typeof records!=='undefined'&&Array.isArray(records)?records:[]}catch(e){}
 const id=currentId();if(id===null||id===undefined)return {count:0,last:null};
 const hits=data.filter(r=>r&&r.studentId===id&&Number(r.grade)===6&&r.subject===item.subject&&r.unit===item.unit&&Number(r.total)===20&&Number.isFinite(Number(r.rate)));
 hits.sort((a,b)=>Date.parse(b.date||0)-Date.parse(a.date||0));return {count:hits.length,last:hits[0]||null};
}
function fmtDate(v){try{const d=new Date(v);return Number.isNaN(+d)?'日付不明':new Intl.DateTimeFormat('ja-JP',{timeZone:'Asia/Tokyo',month:'numeric',day:'numeric'}).format(d)}catch(e){return '日付不明'}}
function openSubject(item){
 if(typeof subjectGradeTerms!=='function')return;
 subjectGradeTerms(item.subject,6);
 // 既存の「総まとめ」ボタンは各教材側の画面描画後に追加される。
 // 2回の画面更新を待って探し、見つからなければ教科一覧に留める。
 requestAnimationFrame(()=>requestAnimationFrame(()=>{
   const target=root.querySelector(item.entry);
   if(target)target.click();
 }));
}
function show(){
 root.replaceChildren();
 const top=div('div','top');top.append(button('← 戻る',()=>{if(typeof child==='function')child();else if(typeof home==='function')home()},'back'));
 top.append(div('h1','pono385title','小学6年｜5教科のまとめ'));root.append(top);
 const infos=ITEMS.map(item=>({...item,...latest(item)}));
 const taken=infos.filter(x=>x.count).length;
 root.append(div('div','card pono385hero',`<p class="tiny">Pono Learning Quest・小学6年生</p><h2>5教科の学びをつなげよう</h2><p>学習したい教科から始めて大丈夫。練習やテストをした後、ここで記録を確認できます。</p><p class="pono385counter">この端末にまとめテストの記録がある教科：<strong>${taken} / 5</strong></p>`));
 const g=div('div','pono385grid');
 infos.forEach(item=>{
   const c=div('section','card pono385subject');
   c.append(div('h2','',`${item.icon} ${esc(item.name)}`));
   c.append(div('p','pono385hint',esc(item.hint)));
   if(item.last){
     const v=Math.max(0,Math.min(100,Math.round(Number(item.last.rate))));
     c.append(div('p','pono385score',`直近のまとめテスト：<strong>${v}点</strong> / 100点`));
     const bar=div('div','pono385bar','<span></span>');bar.setAttribute('role','progressbar');bar.setAttribute('aria-label',item.name+'の直近の正答率');bar.setAttribute('aria-valuenow',String(v));bar.setAttribute('aria-valuemin','0');bar.setAttribute('aria-valuemax','100');bar.firstChild.style.width=v+'%';c.append(bar);
     c.append(div('p','pono385meta',`${fmtDate(item.last.date)}に実施・記録 ${item.count}回`));
   }else{
     c.append(div('p','pono385empty','この端末には、まだ20問テストの記録がありません。'));
   }
   c.append(button(`${item.name}の総まとめへ`,()=>openSubject(item),'primary pono385action'));
   g.append(c);
 });root.append(g);
 root.append(div('div','card pono385note','<h3>🌱 記録の見方</h3><p>点数は、その日に取り組んだ20問の結果です。読んでもらったり、やり直したりした経験も大切な学習です。点数だけで得意・不得意を決めず、各教科の解説や単元別の学習に戻って確認しましょう。</p><p class="tiny">この画面は、現在選んでいる学習者の、この端末・このブラウザ内の記録を表示しています。学校や家庭の別端末とは自動で同期しません。</p>'));
 root.append(button('学習の画面に戻る',()=>{if(typeof child==='function')child();else if(typeof home==='function')home()},'soft pono385return'));
}
function ensureEntry(){
 const h=root.querySelector('.top h1');if(!h)return;
 const title=(h.textContent||'').trim();
 const isChild=title.includes('今日の学習');
 const isGrade6=/^(?:国語|算数|理科|社会|外国語|英語)\s*[｜|]\s*小学6年$/.test(title);
 if(!isGrade6&&!isChild)return;
 if(isChild){
   try{if(typeof profile==='undefined'||!profile||Number(profile.grade)!==6)return;}catch(e){return}
 }
 if(root.querySelector('[data-pono385-entry]'))return;
 const first=root.querySelector('.card')||root.querySelector('.unit-pick');if(!first)return;
 const pane=div('div','card pono385entry',`<h3>📚 小学6年・5教科のまとめ</h3><p>国語・算数・理科・社会・英語の総復習と記録をまとめて確認できます。</p>`);
 pane.dataset.pono385Entry='1';pane.append(button('5教科の学習まとめを開く',show,'primary'));
 if(isChild)first.insertAdjacentElement('afterend',pane);else first.insertAdjacentElement('beforebegin',pane);
}
let queued=false;
new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;ensureEntry()})}).observe(root,{subtree:true,childList:true});
ensureEntry();
window.ponoGrade6Dashboard385=show;
})();
