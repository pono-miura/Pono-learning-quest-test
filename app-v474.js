/* Pono Learning Quest v474: 学年 → 教科 → 教材の入口。
 * 既存の教材カードが押すボタンを呼び出すだけで、教材の内容・採点・記録に手を加えません。
 * 旧一覧は「以前の一覧を見る」から利用できます。
 */
(()=>{'use strict';
 if(window.ponoGradeNav474)return;
 const ROOT=document.getElementById('app'); if(!ROOT)return;
 const SUBJECTS=[
  {id:'japanese',label:'国語',icon:'📖'},
  {id:'math',label:'算数',icon:'🔢'},
  {id:'science',label:'理科',icon:'🔬'},
  {id:'social',label:'社会',icon:'🌏'},
  {id:'english',label:'英語',icon:'🔤'},
  {id:'life',label:'生活科',icon:'🌱'}
 ];
 let grade=null,subject=null,legacy=false,open=false,scheduled=false,screen=null,showOld=null,lastHome=false;
 const el=(tag,cls,label)=>{const n=document.createElement(tag);if(cls)n.className='v474-'+cls;if(label!==undefined)n.textContent=label;return n};
 function btn(text,fn,cls='button'){
  const b=el('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;
 }
 function isHome(){
  const heading=ROOT.querySelector('.top h1');if(!heading)return false;
  const t=(heading.textContent||'').replace(/\s+/g,' ').trim();
  return /Pono Learning Quest|今日の学習|全学年の教材を確認/.test(t) && !/先生|保護者|記録|設定/.test(t);
 }
 function nameGrade(v){return `小学${v}年`}
 function classifySubject(str){
  const v=String(str||'');const ids=[];
  const add=(id,re)=>{if(re.test(v))ids.push(id)};
  add('japanese',/国語|漢字|読解|作文|記述|文法|語句|ことば|言葉の学習|文章を読む|音読/);
  add('math',/算数|かけ算|わり算|分数|小数|割合|整数|数量|図形|九九|計算のきまり/);
  add('science',/理科/);
  add('social',/社会|日本の歴史|世界の歴史/);
  add('english',/英語|外国語|アルファベット|English/);
  add('life',/生活科/);
  return ids;
 }
 function classifyGrades(text){
  const t=String(text||'').replace(/[０-９]/g,ch=>String(ch.charCodeAt(0)-65296));
  const gs=new Set();
  for(const m of t.matchAll(/(?:小学(?:校)?|小)\s*([1-6])\s*(?:[・､、\/〜~～ー\-]\s*(?:小)?\s*([1-6]))?\s*年(?:生)?/g)){
   gs.add(+m[1]);if(m[2])gs.add(+m[2]);
  }
  for(const m of t.matchAll(/([1-6])\s*[・､、\/〜~～ー\-]\s*([1-6])\s*年/g)){
   gs.add(+m[1]);gs.add(+m[2]);
  }
  return gs;
 }
 function lessons(){
  const found=[];const seen=new Set();
  for(const node of ROOT.querySelectorAll('[class*="entry"],[data-pono391-entry]')){
   if(!(node instanceof HTMLElement)||node.closest('.v474-hub'))continue;
   const cls=typeof node.className==='string'?node.className:'';
   if(!(/(^|\s)[^\s]*entry(?:\s|$)/.test(cls)||node.hasAttribute('data-pono391-entry')))continue;
   if(node.closest('[class*="entry"]')!==node && !node.hasAttribute('data-pono391-entry'))continue;
   const button=node.querySelector('button');if(!button)continue;
   const titleNode=node.querySelector('h2,h3,h4,strong');
   const title=(titleNode?.textContent||button.textContent||'').trim();
   const description=(node.textContent||'').slice(0,700);
   const gs=classifyGrades(title+' '+description);
   const subs=classifySubject(title+' '+description);
   if(!title||!gs.size||!subs.length||seen.has(node))continue;
   seen.add(node);
   found.push({node,button,title,description,grades:gs,subjects:subs});
  }
  return found;
 }
 function findLessons(g,s){return lessons().filter(x=>x.grades.has(g)&&x.subjects.includes(s));}
 function prepare(){
  if(screen)return;
  screen=el('div','hub');screen.setAttribute('role','region');screen.setAttribute('aria-label','学年・教科を選ぶ');
  const container=el('div','inner');screen.append(container);
  showOld=btn('📚 学年別メニューに戻る',()=>{legacy=false;grade=null;subject=null;render();sync();},'reopen');
  document.body.append(screen,showOld);
 }
 function menuHeader(box,title,note){
  const head=el('header','header');head.append(el('div','brand','🌱 Pono Learning Quest'),el('h1','title',title));
  if(note)head.append(el('p','subtitle',note));box.append(head);
 }
 function goOld(){legacy=true;render();sync();try{window.scrollTo({top:0,behavior:'instant'})}catch(_){} }
 function render(){
  prepare();const box=screen.firstElementChild;box.replaceChildren();
  if(grade===null){
   menuHeader(box,'どの学年を学ぶ？','自分の学年以外を選んでも大丈夫。いつでも変えられるよ。');
   const tiles=el('div','grade-grid');
   for(let g=1;g<=6;g++){
    const b=btn(`小学 ${g} 年`,()=>{grade=g;subject=null;render()},'grade');
    b.setAttribute('aria-label',nameGrade(g)+'の教材を見る');tiles.append(b);
   }box.append(tiles);
   const foot=el('div','footer');foot.append(btn('📚 以前の教材一覧を見る',goOld,'secondary'),btn('🧑‍🏫 先生・Pono用の機能',()=>{goOld();const old=[...ROOT.querySelectorAll('button')].find(b=>/先生・Pono|先生用ホーム/.test(b.textContent));if(old)old.click();},'secondary'));box.append(foot);
   return;
  }
  if(subject===null){
   menuHeader(box,`${nameGrade(grade)}の教科をえらぼう`,'学びたい教科を押してね。');
   const group=el('div','subject-grid');
   for(const s of SUBJECTS){
    const count=findLessons(grade,s.id).length;
    const b=btn(`${s.icon} ${s.label}`,()=>{subject=s.id;render();},'subject');
    if(!count){b.append(el('small','muted','掲載教材を確認'));}group.append(b);
   }
   box.append(group);
   box.append(btn('← 学年をえらび直す',()=>{grade=null;render()},'back'));
   return;
  }
  const s=SUBJECTS.find(x=>x.id===subject);
  menuHeader(box,`${nameGrade(grade)}・${s?.label||'教材'}`,'学びたい単元を選ぼう。');
  const l=findLessons(grade,subject);
  if(l.length){
   box.append(el('p','count',`見つかった教材 ${l.length} 件`));
   const items=el('div','lesson-list');
   l.forEach((x,i)=>{
    const item=el('button','lesson');item.type='button';
    const clean=x.title.replace(/\s*[|｜]?\s*v\d+(?:\.\d+)?\b/ig,'').replace(/^[\s\p{Extended_Pictographic}\uFE0F]+/gu,'').trim()||x.title;
    item.append(el('strong','lesson-title',clean));
    const desc=(x.node.querySelector('p')?.textContent||'').trim().replace(/\s+/g,' ');
    if(desc)item.append(el('span','lesson-desc',desc.slice(0,105)+(desc.length>105?'…':'')));
    const action=(x.button.textContent||'学習を開く').trim().replace(/\s*[→➜]\s*$/,'');
    item.append(el('span','lesson-subtitle',action));
    item.addEventListener('click',()=>{legacy=true;sync();try{x.button.click()}catch(_){legacy=false;sync()}});
    items.append(item);
   });box.append(items);
  }else{
   const note=el('div','empty');note.append(el('h2','','この組み合わせの教材は見つかりませんでした'),el('p','','以前の教材一覧には、学年共通の教材や別の名前で登録された教材もあります。'));
   note.append(btn('以前の一覧から探す',goOld,'secondary'));box.append(note);
  }
  const foot=el('div','footer');foot.append(btn('← 教科をえらび直す',()=>{subject=null;render()},'back'),btn('学年を変える',()=>{subject=null;grade=null;render()},'secondary'),btn('📚 以前の教材一覧を見る',goOld,'secondary'));box.append(foot);
 }
 function sync(){
  const home=isHome();if(!home){if(lastHome){legacy=false;grade=null;subject=null;}lastHome=false;}
  else if(!lastHome){lastHome=true;legacy=false;grade=null;subject=null;render();}
  if(!screen)prepare();
  screen.hidden=(!home||legacy);showOld.hidden=(!home||!legacy);
  document.documentElement.classList.toggle('v474-locked',home&&!legacy);
  if(home&&!legacy&&grade!==null&&subject!==null){const count=screen.querySelector('.v474-count');const n=findLessons(grade,subject).length; if(count&&Number((count.textContent.match(/\d+/)||[])[0])!==n)render();}
 }
 function tick(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;sync()})}
 new MutationObserver(tick).observe(ROOT,{childList:true,subtree:true});
 window.ponoGradeNav474={open:()=>{legacy=false;grade=null;subject=null;render();sync()},getLessons:()=>lessons().map(x=>({title:x.title,grades:[...x.grades],subjects:x.subjects})),status:()=>({home:isHome(),grade,subject,legacy})};
 sync();
})();
