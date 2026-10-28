/* Pono Learning Quest v39.0 — all-grade curriculum navigator and coverage transparency.
   This is a navigation map, not a certification of school-test readiness.
   This patch does not modify localStorage, learner profiles or learning records. */
(function(){
'use strict';
const app=document.getElementById('app');if(!app)return;
const ROWS=[
 {g:1,items:[['国語',11],['算数',5]],note:'国語・算数の単元メニューがあります。生活科の専用教材は、このメニューにはありません。'},
 {g:2,items:[['国語',11],['算数',6]],note:'国語・算数の単元メニューがあります。生活科の専用教材は、このメニューにはありません。'},
 {g:3,items:[['国語',10],['算数',10],['理科',11],['社会',4],['外国語活動',6]],note:'5領域の単元メニューがあります。説明・図・テストの内容と難易度は今後さらに点検します。'},
 {g:4,items:[['国語',10],['算数',10],['理科',12],['社会',5],['外国語活動',6]],note:'5領域の単元メニューがあります。説明・図・テストの内容と難易度は今後さらに点検します。'},
 {g:5,items:[['国語',9],['算数',11],['理科',9],['社会',5],['外国語',8]],note:'5教科の単元メニューがあります。6年生のような5教科総まとめは、まだ仕上げの途中です。'},
 {g:6,items:[['国語',9],['算数',10],['理科',11],['社会',3],['外国語',8]],note:'5教科すべてに総復習・まとめテストがあります。ただし、実際の児童による使いやすさや教材の正確さは継続して確認します。'}
];
const NAMES={'国語':'📖','算数':'🔢','理科':'🔬','社会':'🌏','外国語':'🗣️','外国語活動':'🗣️'};
const el=(tag,cls,content)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(content!==undefined)n.textContent=content;return n};
const btn=(label,fn,cls='soft')=>{const b=el('button',cls,label);b.type='button';b.addEventListener('click',fn);return b};
function back(){if(typeof child==='function')child();else if(typeof home==='function')home();}
function openSubject(s,g){
 try{if(typeof subjectGradeTerms==='function'){
  // v29.2 supports the Foreign Language menu under '外国語' for grades 3–6.
  subjectGradeTerms(s==='外国語活動'?'外国語':s,g);return;
 }}catch(err){console.warn('Pono subject navigation failed',err)}
 const box=el('section','card pono390note');box.append(el('p','','単元一覧を開けませんでした。最初の画面から教科書順メニューをお試しください。'));app.append(box);
}
function screen(g=6){
 const row=ROWS.find(x=>x.g===Number(g))||ROWS[5];
 app.replaceChildren();const top=el('div','top');top.append(btn('← 戻る',back,'back'),el('h1','pono390title','全学年の教材を確認'));app.append(top);
 const intro=el('section','card pono390intro');intro.append(el('p','pono390eyebrow','Pono Learning Quest v39.0'),el('h2','','小学1〜6年の教材マップ'),el('p','','学年と教科を選ぶと、その単元メニューへ進めます。メニューにあることと、十分に学習できる完成度であることは別です。'));app.append(intro);
 const choose=el('section','card pono390choose');choose.append(el('h3','','学年を選ぶ'));const grid=el('div','pono390grades');
 ROWS.forEach(v=>{const b=btn(`小${v.g}`,()=>screen(v.g),'pono390grade'+(v.g===row.g?' pono390selected':''));b.setAttribute('aria-pressed',String(v.g===row.g));b.setAttribute('aria-label',`小学${v.g}年を選ぶ`);grid.append(b)});choose.append(grid);app.append(choose);
 const overview=el('section','card pono390overview');overview.append(el('h2','',`小学${row.g}年の単元メニュー`));overview.append(el('p','',row.g===6?'5教科の単元教材・総まとめがあります。':'単元メニューと一部の学習教材があります。現在、教材の詳しさ・問題の質を点検する段階です。'));
 const subjects=el('div','pono390subjects');row.items.forEach(([s,count])=>{
  const card=el('section','pono390subject');card.append(el('h3','',`${NAMES[s]||'📚'} ${s}`));card.append(el('p','',`単元メニュー：${count}項目`));card.append(el('p','pono390state',row.g===6?'総まとめあり・実地検証はこれから':'教材の内容・テストを点検中'));
  card.append(btn(`${s}の単元を開く`,()=>openSubject(s,row.g),'primary'));subjects.append(card)
 });overview.append(subjects);app.append(overview);
 const note=el('section','card pono390note');note.append(el('h3','','🌱 これから整えること'),el('p','',row.note));
 note.append(el('p','pono390small','表示している数は教科書順の「単元メニュー項目数」です。正確な教科書の全単元数や、完成したテスト数を保証するものではありません。'));
 note.append(el('p','pono390small','この機能は教材への入口を表示するだけです。学習履歴・学習者ID・バックアップファイルには一切変更を加えません。'));
 app.append(note);
 if(row.g===6&&typeof window.ponoGrade6Dashboard385==='function')app.append(btn('📊 小学6年・5教科の学習まとめへ',()=>window.ponoGrade6Dashboard385(),'soft pono390return'));
 app.append(btn('最初の学習画面に戻る',back,'soft pono390return'));
 try{window.scrollTo(0,0)}catch(_){}
}
function inject(){
 const h=app.querySelector('.top h1');if(!h)return;
 const t=h.textContent.trim();if(!['🌱 Pono Learning Quest','🧒 今日の学習','小学6年｜5教科のまとめ'].includes(t))return;
 if(app.querySelector('[data-pono390-entry]'))return;
 const card=el('section','card pono390entry');card.dataset.pono390Entry='1';
 card.append(el('h3','','📚 小学1〜6年の教材一覧'),el('p','','ほかの学年もどこまで学べるか確認し、教科・単元を選べます。'));
 card.append(btn('全学年の教材を確認する',()=>{let g=6;try{if(typeof profile!=='undefined')g=Number(profile.grade)||6}catch(_){}screen(g)},'primary'));
 const anchor=app.querySelector('.top');if(anchor)anchor.insertAdjacentElement('afterend',card);
}
let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;inject()})}).observe(app,{subtree:true,childList:true});inject();
window.ponoAllGrades390=screen;
})();
