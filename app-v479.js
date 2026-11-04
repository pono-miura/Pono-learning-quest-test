/* Pono Learning Quest v479 — 子ども用の単一ナビゲーション。
 * v475/v477/v478のナビだけ置き換え、旧教材の問題・採点・保存内容は変更しない。
 * 家庭・Pono管理者のv476メニューはそのまま利用する。
 */
(()=>{'use strict';
if(window.ponoNav479)return;
const ROOT=document.getElementById('app');if(!ROOT)return;
const SUBJECTS={
 '国語':{icon:'📖',key:'国語'},'算数':{icon:'🔢',key:'算数'},
 '理科':{icon:'🔬',key:'理科'},'社会':{icon:'🌏',key:'社会'},
 '英語':{icon:'🔤',key:'外国語'},'生活科':{icon:'🌱',key:'生活科'}
};
let grade=6,subject=null,view='subjects',learning=false,screen=null,backButton=null,busy=false,lastRole='',notice='';
const create=(tag,cl,text)=>{const n=document.createElement(tag);if(cl)n.className='v479-'+cl;if(text!=null)n.textContent=String(text);return n};
const button=(label,action,cl='button')=>{const b=create('button',cl,label);b.type='button';b.addEventListener('click',action);return b};
function role(){return window.ponoRoles476?.role?.()||'choose'}
function registered(){
 try{if(typeof profile!=='undefined'){const n=Number(profile?.grade);if(Number.isInteger(n)&&n>=1&&n<=6)return n}}catch(_){}
 try{const n=Number(JSON.parse(localStorage.getItem('ponoV9Student')||'{}').grade);if(Number.isInteger(n)&&n>=1&&n<=6)return n}catch(_){}
 return 6;
}
function courseList(g,s){
 const key=SUBJECTS[s]?.key;if(!key)return [];
 try{if(typeof TEXTBOOK_MAP!=='undefined'&&Array.isArray(TEXTBOOK_MAP[key]?.[g]))return [...TEXTBOOK_MAP[key][g]]}catch(_){}
 try{if(s==='英語'&&typeof ENG36_292!=='undefined'&&ENG36_292[g])return Object.keys(ENG36_292[g])}catch(_){}
 return [];
}
function onMain(){const h=ROOT.querySelector('.top h1');const text=h?.textContent?.trim()||'';return /^(?:🌱\s*)?Pono Learning Quest|^(?:🧒\s*)?今日の学習/.test(text)}
function ensure(){
 if(screen)return;
 screen=create('section','hub');screen.setAttribute('role','region');screen.setAttribute('aria-label','Pono 学習メニュー');screen.append(create('main','inner'));document.body.append(screen);
 backButton=button('← 学年・教科に戻る',leaveLearning,'return');backButton.hidden=true;document.body.append(backButton);
}
function title(parent,t,desc){const h=create('header','head');h.append(create('p','brand','🌱 Pono Learning Quest'),create('h1','title',t),create('p','intro',desc));parent.append(h)}
function showMessage(msg){notice=msg;render()}
function render(){ensure();const main=screen.firstElementChild;main.replaceChildren();
 if(view==='grades'){
  title(main,'どの学年から学ぶ？','学び直しのために別の学年を選んでも、在籍学年は変わりません。');
  const grid=create('div','grid');for(let n=1;n<=6;n++)grid.append(button(`小学${n}年${n===registered()?'（在籍）':''}`,()=>{grade=n;subject=null;view='subjects';notice='';render()},'grade'));
  main.append(grid,button('← 今の学年にもどる',()=>{grade=registered();subject=null;view='subjects';render()},'outline'));
 }else if(view==='subjects'){
  title(main,`小学${grade}年の教科をえらぼう`,'読みたい・学びたい教科を押してね。');
  const choices=grade<=2?['国語','算数','生活科']:['国語','算数','理科','社会','英語'];
  const grid=create('div','grid');for(const s of choices)grid.append(button(`${SUBJECTS[s].icon} ${s}`,()=>{subject=s;view='units';notice='';render()},'grade'));
  main.append(grid,button('🔄 ほかの学年を選ぶ',()=>{view='grades';render()},'outline'));
 }else{
  const units=courseList(grade,subject);
  title(main,`小学${grade}年・${subject}`,'単元を押すと、以前から作っている問題・説明の画面へ進みます。');
  main.append(create('p','count',units.length?`${units.length}単元`:'この教科の単元が見つかりませんでした。'));
  if(units.length){
   const list=create('div','units');units.forEach((name,i)=>{
    const card=create('article','unit');card.append(create('strong','unit-name',`${i+1}. ${name}`),button('この単元を学ぶ',()=>launch(grade,subject,name),'launch'));list.append(card)
   });main.append(list);
  }else{
   main.append(create('p','note','以前の教材は削除していません。下のボタンから旧教材一覧も確認できます。'));
   main.append(button('旧教材一覧を開く',oldIndex,'outline'));
  }
  main.append(button('← 教科を選び直す',()=>{view='subjects';subject=null;notice='';render()},'outline'));
  if(grade>1)main.append(button('🌱 前の学年の教材を見る',()=>{grade=grade-1;view='units';notice='';render()},'outline'));
  main.append(button('ほかの学年へ',()=>{view='grades';render()},'outline'));
 }
 if(notice)main.append(create('p','warning',notice));
 main.append(create('p','footer','学習の途中では、必要に応じて説明や読み上げを選べます。採点や記録は以前の教材の仕組みを使います。'));
}
function route(s,g,name){
 if(s==='国語'){
  if(typeof japaneseTextbookOpen249==='function')return japaneseTextbookOpen249(g,name);
  if(typeof subjectGradeTerms==='function')return subjectGradeTerms('国語',g);
 }else if(s==='算数'){
  if(typeof mathTextbookOpen249==='function')return mathTextbookOpen249(g,name);
  if(typeof subjectGradeTerms==='function')return subjectGradeTerms('算数',g);
 }else if(s==='英語'){
  if(typeof engData292==='function'&&typeof engHome292==='function'&&engData292(g,name))return engHome292(g,name);
  if(typeof startTextbookUnit==='function')return startTextbookUnit('外国語',g,name,'');
  if(typeof subjectGradeTerms==='function')return subjectGradeTerms('外国語',g);
 }else{
  if(typeof startTextbookUnit==='function')return startTextbookUnit(SUBJECTS[s].key,g,name,'');
  if(typeof subjectGradeTerms==='function')return subjectGradeTerms(SUBJECTS[s].key,g);
 }
 throw Error('旧教材への接続が見つかりません');
}
function launch(g,s,name){
 try{
  window.speechSynthesis?.cancel?.();
  learning=true;
  route(s,g,name);
  const h=ROOT.querySelector('.top h1');
  if(!h||onMain())throw Error('単元の画面へ進めませんでした');
  sync();
  try{window.scrollTo(0,0)}catch(_){}
 }catch(err){learning=false;showMessage('単元を開けませんでした。旧教材は残っています。別の単元を試すか、Ponoの先生に知らせてください。');sync()}
}
function leaveLearning(){
 if(!window.confirm('途中の学習を終えて、単元を選び直しますか？ 保存前の答えは残らないことがあります。'))return;
 try{window.speechSynthesis?.cancel?.()}catch(_){}
 learning=false;notice='';
 try{if(typeof home==='function')home()}catch(_){}
 sync();render();
}
function oldIndex(){
 try{
  learning=true;
  if(typeof textbookMap==='function')textbookMap();
  else if(typeof subjectGradeTerms==='function')subjectGradeTerms(SUBJECTS[subject].key,grade);
  else throw Error('Old curriculum missing');
  sync();
 }catch(_){learning=false;showMessage('以前の一覧を表示できませんでした。');sync()}
}
function sync(){ensure();const r=role();
 if(lastRole!==r){lastRole=r;learning=false;grade=registered();subject=null;view='subjects';notice='';render()}
 // 旧教材の「最初へ」操作は、新しいメニューに戻す
 if(r==='child'&&learning&&onMain())learning=false;
 const show=r==='child'&&!learning&&onMain();
 screen.hidden=!show;backButton.hidden=!(r==='child'&&learning);
 if(document.documentElement.classList.contains('v479-active')!==show)document.documentElement.classList.toggle('v479-active',show);
}
function schedule(){if(busy)return;busy=true;requestAnimationFrame(()=>{busy=false;sync()})}
new MutationObserver(schedule).observe(ROOT,{subtree:true,childList:true});
new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
window.ponoNav479={open:()=>{grade=registered();subject=null;view='subjects';learning=false;notice='';if(typeof home==='function')home();render();sync()},status:()=>({grade,subject,view,learning,count:subject?courseList(grade,subject).length:0}),getUnits:courseList};
grade=registered();render();sync();
})();