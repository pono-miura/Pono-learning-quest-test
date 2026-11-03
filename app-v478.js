/* Pono Learning Quest v478 — 教材データから直接つなぐ学年別ナビ。
 * v475/v477 のトップ画面カード探索とは独立して、既存TEXTBOOK_MAPの実データを使用。
 * 採点、学習履歴、子ども情報、保護者・管理者機能には変更しません。
 * 旧コンテンツの学習開始関数を呼び出します。個別単元の完成度を保証しません。
 */
(()=>{'use strict';
if(window.ponoStudy478)return;
const ROOT=document.getElementById('app');if(!ROOT)return;
const SUBJECTS={
  '国語':{icon:'📖',key:'国語'},'算数':{icon:'🔢',key:'算数'},
  '理科':{icon:'🔬',key:'理科'},'社会':{icon:'🌏',key:'社会'},
  '英語':{icon:'🔤',key:'外国語'},'生活科':{icon:'🌱',key:'生活科'}
};
let grade=null,subject=null,learning=false,panel=null,returnButton=null,notices='',scheduled=false,lastRole=null;
const E=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className='v478-'+cls;if(txt!=null)n.textContent=String(txt);return n};
const B=(label,fn,cls='button')=>{const b=E('button',cls,label);b.type='button';b.addEventListener('click',fn);return b};
function registered(){try{if(typeof profile!=='undefined'){const g=Number(profile?.grade);if(g>=1&&g<=6)return g}}catch(_){}try{const g=Number(JSON.parse(localStorage.getItem('ponoV9Student')||'{}').grade);if(g>=1&&g<=6)return g}catch(_){}return 6}
function role(){try{return window.ponoRoles476?.role?.()||'child'}catch(_){return 'child'}}
function onTop(){const h=ROOT.querySelector('.top h1');return !!h&&/^(🌱\s*)?Pono Learning Quest|^🧒\s*今日の学習/.test((h.textContent||'').trim())}
function realUnits(g,s){
  const key=SUBJECTS[s]?.key;if(!key)return [];
  try{if(typeof TEXTBOOK_MAP!=='undefined'&&Array.isArray(TEXTBOOK_MAP[key]?.[g]))return TEXTBOOK_MAP[key][g].slice()}catch(_){}
  if(s==='英語')try{if(typeof ENG36_292!=='undefined'&&ENG36_292[g])return Object.keys(ENG36_292[g])}catch(_){}
  return [];
}
function groupSubjects(g){return g<=2?['国語','算数','生活科']:['国語','算数','理科','社会','英語']}
function ensure(){if(panel)return;panel=E('div','hub');panel.setAttribute('role','region');panel.setAttribute('aria-label','学年・教科・単元から選ぶ');panel.append(E('main','inner'));document.body.append(panel);returnButton=B('← 学年と教科へ戻る',back,'return');returnButton.hidden=true;document.body.append(returnButton)}
function header(box,title,desc){const h=E('header','head');h.append(E('p','brand','🌱 Pono Learning Quest'),E('h1','title',title));if(desc)h.append(E('p','subtitle',desc));box.append(h)}
function msg(box,v){if(v)box.append(E('p','notice',v))}
function render(){ensure();const box=panel.firstElementChild;box.replaceChildren();
 if(subject===null){header(box,`小学${grade}年の教科をえらぼう`,'まずは在籍学年から。必要なときは前の学年へ戻れるよ。');
  const grid=E('div','grid');for(const s of groupSubjects(grade)){grid.append(B(`${SUBJECTS[s].icon} ${s}`,()=>{subject=s;notices='';render()},'subject'))}box.append(grid);
  box.append(B('ほかの学年も見てみる',()=>{subject='__grades';notices='';render()},'secondary'));
  box.append(E('p','foot','学年を選び直しても、在籍学年の登録は変わりません。'));
 }else if(subject==='__grades'){
  header(box,'ほかの学年から学ぶ','つまずいたところの前の学年も確認できるよ。');
  const grid=E('div','grid');for(let g=1;g<=6;g++)grid.append(B(`小学${g}年${g===registered()?' 〔在籍〕':''}`,()=>{grade=g;subject=null;render()},'grade'));box.append(grid);
  box.append(B('← 教科を選ぶ',()=>{subject=null;render()},'back'));
 }else{
  header(box,`小学${grade}年・${subject}`,'学びたい単元を押して、実際の教材を開こう。');
  const arr=realUnits(grade,subject);box.append(E('p','count',arr.length?`${arr.length}単元から選べます`:'単元の登録を確認中です'));
  if(arr.length){const list=E('div','list');arr.forEach((name,i)=>{const c=E('section','unit');c.append(E('strong','unit-name',`${i+1}. ${name}`));c.append(B('この単元で学ぶ →',()=>openUnit(subject,grade,name,i),'go'));list.append(c)});box.append(list)}
  else{
   msg(box,subject==='生活科'?'生活科は別の教材入口から確認できます。':'この学年・教科の単元データを読み取れませんでした。旧教材の一覧も利用できます。');
   box.append(B('以前の教材一覧を見る',openLegacy,'secondary'));
  }
  if(grade>1)box.append(B('🌱 関連する前の学年も確認',()=>{grade=Math.max(1,grade-1);render()},'secondary'));
  box.append(B('← 教科を選び直す',()=>{subject=null;notices='';render()},'back'));
  if(grade!==registered())box.append(B(`🏫 在籍の小学${registered()}年へ戻る`,()=>{grade=registered();subject=null;render()},'secondary'));
  box.append(B('ほかの学年に変える',()=>{subject='__grades';render()},'secondary'));
  box.append(E('p','foot','教材によっては、まず「まなぶ」「練習する」などを選んで問題に進みます。'));
 }
 if(notices)msg(box,notices);
}
function openLegacy(){learning=true;sync();try{if(typeof home==='function')home();window.ponoLearningNav475?.open?.();const hub=document.querySelector('.v475-hub');const b=hub?.querySelector('button.v475-secondary');if(b)b.click();}catch(_){}sync();}
function startContent(fn,s,g,name){
 try{window.ponoOptionalVoice473?.close?.();window.speechSynthesis?.cancel?.();fn();}
 catch(e){learning=false;notices='この単元を開けませんでした。学習内容は削除されていません。以前の教材一覧でも確認できます。';render();sync();return false}
 learning=true;sync();return true;
}
function openUnit(s,g,name,i){
 const sub=SUBJECTS[s].key;
 const routes={
 '国語':()=>{if(typeof japaneseTextbookOpen249==='function')return japaneseTextbookOpen249(g,name);if(typeof subjectGradeTerms==='function')return subjectGradeTerms(sub,g);throw Error('Japanese course missing')},
 '算数':()=>{if(typeof mathTextbookOpen249==='function')return mathTextbookOpen249(g,name);if(typeof subjectGradeTerms==='function')return subjectGradeTerms(sub,g);throw Error('Math course missing')},
 '理科':()=>{if(typeof startTextbookUnit==='function')return startTextbookUnit(sub,g,name,'');if(typeof subjectGradeTerms==='function')return subjectGradeTerms(sub,g);throw Error('Science course missing')},
 '社会':()=>{if(typeof startTextbookUnit==='function')return startTextbookUnit(sub,g,name,'');if(typeof subjectGradeTerms==='function')return subjectGradeTerms(sub,g);throw Error('Social studies missing')},
 '英語':()=>{if(typeof engHome292==='function'&&typeof engData292==='function'&&engData292(g,name))return engHome292(g,name);if(typeof startTextbookUnit==='function')return startTextbookUnit('外国語',g,name,'');if(typeof subjectGradeTerms==='function')return subjectGradeTerms('外国語',g);throw Error('English course missing')},
 '生活科':()=>{if(typeof subjectGradeTerms==='function')return subjectGradeTerms(sub,g);throw Error('Life course missing')}
 };
 const fn=routes[s];if(!fn){notices='この教科はまだ開けません。';render();return}
 startContent(fn,s,g,name);
}
function back(){if(!window.confirm('今の学習を途中で終えて、単元の一覧に戻りますか？ 保存前の途中経過は残らない場合があります。'))return;
 learning=false;notices='';try{window.speechSynthesis?.cancel?.()}catch(_){}
 try{if(typeof home==='function')home();else ROOT.innerHTML='<div class="top"><h1>🌱 Pono Learning Quest</h1></div>'}catch(_){}
 sync();render();}
function sync(){ensure();const r=role(),top=onTop();
 if(r!==lastRole){lastRole=r;learning=false;grade=registered();subject=null;notices='';}
 if(r==='child'&&top&&learning)learning=false;
 const show=r==='child'&&!learning&&top;
 panel.hidden=!show;returnButton.hidden=(r!=='child'||!learning);
 if(document.documentElement.classList.contains('v478-visible')!==show)document.documentElement.classList.toggle('v478-visible',show);
}
function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;sync()})}
new MutationObserver(schedule).observe(ROOT,{subtree:true,childList:true});
new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
window.ponoStudy478={open:()=>{learning=false;grade=registered();subject=null;notices='';try{if(typeof home==='function')home()}catch(_){}render();sync()},units:realUnits,status:()=>({grade,subject,learning,count:subject?realUnits(grade,subject).length:0})};
grade=registered();render();sync();
})();
