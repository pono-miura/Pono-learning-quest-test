/* Pono Learning Quest v475 — 在籍学年から学ぶ／必要時に関連する前学年を探す。
 * 既存の教材の入口を整理する追加機能。元の問題・採点・保存情報を書き換えません。
 * 「学び直し」の候補は単元名の関連語から提示。診断や自動の到達度判定ではありません。
 */
(()=>{'use strict';
if(window.ponoLearningNav475)return;
const ROOT=document.getElementById('app');if(!ROOT)return;
const SUBJECTS=[
 {id:'japanese',label:'国語',icon:'📖'}, {id:'math',label:'算数',icon:'🔢'},
 {id:'science',label:'理科',icon:'🔬'}, {id:'social',label:'社会',icon:'🌏'},
 {id:'english',label:'英語',icon:'🔤'}, {id:'life',label:'生活科',icon:'🌱'}
];
const SYLLABUS={
 math:[[/分数|約分|通分|分母|分子/,/分数|小数|計算/,'分数の基本'],[/割合|百分率|比|比例/,/割合|百分率|小数|わり算|平均/,'割合につながる学習'],[/わり算|除法|商/,/わり算|かけ算|九九|筆算/,'わり算の基本'],[/かけ算|乗法|九九/,/かけ算|九九|数|計算/,'かけ算の基本'],[/小数/,/小数|位取り|整数|計算/,'小数の基本'],[/図形|角度|面積|体積|円|立体/,/図形|角|長さ|広さ|面積|形/,'図形の基本'],[/速さ|単位量|平均/,/単位量|平均|割り算|わり算|小数/,'数量の考え方']],
 japanese:[[/漢字|熟語|字形|部品/,/漢字|熟語|語句|言葉|部品/,'漢字と言葉'],[/説明文|物語|読解|文章|要約/,/読解|文章|国語|説明文|物語|文/,'文章を読む'],[/作文|記述|表現/,/作文|記述|文|言葉/,'書いて伝える'],[/文法|主語|述語|接続/,/文法|文|言葉|国語/,'文のしくみ']],
 english:[[/英語|外国語|単語|アルファベット|English/,/英語|外国語|あいさつ|アルファベット/,'英語の基本']],
 science:[[/植物|生物|昆虫/,/植物|生き物|昆虫|理科/,'生き物の学習']],
 social:[[/地図|日本|歴史|社会/,/地図|地域|社会|歴史/,'社会の学習']]
};
let grade=null,subject=null,mode='subjects',legacy=false,screen=null,reopen=null,lastHome=false,scheduled=false,origin=null,returnAfterReview=false,customGrade=false;
const el=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className='v475-'+cls;if(txt!==undefined)n.textContent=String(txt);return n};
const btn=(label,fn,cls='button')=>{const x=el('button',cls,label);x.type='button';x.addEventListener('click',fn);return x};
function registered(){
 try{if(typeof profile!=='undefined'&&profile){const g=Number(profile.grade);if(Number.isInteger(g)&&g>=1&&g<=6)return g}}catch(_){}
 try{const p=JSON.parse(localStorage.getItem('ponoV9Student')||'null');const g=Number(p?.grade);if(Number.isInteger(g)&&g>=1&&g<=6)return g}catch(_){}
 return null;
}
function isHome(){
 const h=ROOT.querySelector('.top h1');if(!h)return false;
 const t=(h.textContent||'').replace(/\s+/g,' ').trim();
 return /Pono Learning Quest|今日の学習|全学年の教材を確認/.test(t)&&!/先生|保護者|記録|設定/.test(t);
}
const gname=g=>`小学${g}年`;
function subjectIds(str){const t=String(str||''),arr=[];const put=(id,re)=>{if(re.test(t))arr.push(id)};
 put('japanese',/国語|漢字|読解|作文|記述|文法|語句|ことば|言葉の学習|文章を読む|音読/);
 put('math',/算数|かけ算|わり算|分数|小数|割合|整数|数量|図形|九九|計算のきまり/);
 put('science',/理科/);put('social',/社会|日本の歴史|世界の歴史/);
 put('english',/英語|外国語|アルファベット|English/);put('life',/生活科/);return arr;
}
function grades(str){const s=String(str||'').replace(/[０-９]/g,c=>String(c.charCodeAt(0)-65296)),out=new Set();
 for(const m of s.matchAll(/(?:小学(?:校)?|小)\s*([1-6])\s*(?:[・､、\/〜~～ー\-]\s*(?:小)?\s*([1-6]))?\s*年(?:生)?/g)){out.add(Number(m[1]));if(m[2])out.add(Number(m[2]));}
 for(const m of s.matchAll(/([1-6])\s*[・､、\/〜~～ー\-]\s*([1-6])\s*年/g)){out.add(Number(m[1]));out.add(Number(m[2]));}
 return out;
}
function entries(){const found=[],seen=new Set();
 for(const node of ROOT.querySelectorAll('[class*="entry"],[data-pono391-entry]')){
  if(!(node instanceof HTMLElement))continue;
  const cn=typeof node.className==='string'?node.className:'';
  if(!(/(^|\s)[^\s]*entry(?:\s|$)/.test(cn)||node.hasAttribute('data-pono391-entry')))continue;
  if(node.closest('[class*="entry"]')!==node&&!node.hasAttribute('data-pono391-entry'))continue;
  const action=node.querySelector('button');if(!action)continue;
  const title=(node.querySelector('h2,h3,h4,strong')?.textContent||action.textContent||'').trim();
  const description=(node.textContent||'').slice(0,700);
  const gs=grades(title+' '+description),ss=subjectIds(title+' '+description);
  if(!title||!gs.size||!ss.length||seen.has(node))continue;
  seen.add(node);found.push({node,action,title,description,grades:gs,subjects:ss});
 }return found;
}
function findLessons(g,s){return entries().filter(x=>x.grades.has(g)&&x.subjects.includes(s));}
function titleOf(x){return x.title.replace(/\s*[|｜]?\s*v\d+(?:\.\d+)?\b/ig,'').replace(/^[\s\p{Extended_Pictographic}\uFE0F]+/gu,'').trim()||x.title;}
function topicOf(x,s){const rules=SYLLABUS[s]||[];return rules.find(([re])=>re.test(x.title+' '+x.description));}
function alternatives(x,g,s){const topic=topicOf(x,s),older=[];
 for(let n=g-1;n>=1;n--){for(const l of findLessons(n,s)){const hay=l.title+' '+l.description;
  const value=topic?(topic[1].test(hay)?3:0):1;
  if(value)older.push({lesson:l,grade:n,score:value+(n===g-1?2:0)});
 }}
 older.sort((a,b)=>b.score-a.score||b.grade-a.grade);
 // no confident related unit -> offer adjacent grade subject, clearly labeled as broad review
 if(!older.length){for(let n=g-1;n>=1;n--){for(const l of findLessons(n,s).slice(0,4))older.push({lesson:l,grade:n,score:0});if(older.length)break;}}
 const unique=[],seen=new Set();for(const item of older){const key=item.grade+'|'+item.lesson.title;if(!seen.has(key)){seen.add(key);unique.push(item);}if(unique.length>=5)break;}
 return {topic:topic?.[2]||null,items:unique};
}
function prepare(){if(screen)return;
 screen=el('div','hub');screen.setAttribute('role','region');screen.setAttribute('aria-label','学年・教科・単元を選ぶ');screen.append(el('main','inner'));
 reopen=btn('📚 学年・教科のメニューに戻る',()=>{legacy=false;grade=registered();subject=null;mode=grade?'subjects':'grades';render();sync();},'reopen');
 document.body.append(screen,reopen);
}
function header(box,heading,note){const h=el('header','header');h.append(el('p','brand','🌱 Pono Learning Quest'),el('h1','title',heading));if(note)h.append(el('p','subtitle',note));box.append(h);}
function goOld(){legacy=true;sync();try{window.scrollTo({top:0,behavior:'instant'})}catch(_){};}
function openGrade(){customGrade=true;mode='grades';render();}
function backToSubjects(){subject=null;mode='subjects';render();}
function launch(x,selectedGrade,selectedSubject,asReview=false){
 if(!asReview){origin={lesson:x,grade:selectedGrade,subject:selectedSubject};returnAfterReview=false;}
 else returnAfterReview=true;
 legacy=true;sync();try{x.action.click();}catch(_){legacy=false;sync();}
}
function oldCourseButton(box){if(!origin||!returnAfterReview)return;
 const note=el('section','resume');note.append(el('strong','','🌱 もとの学習に戻れるよ'),el('p','','前の学年を確認したら、もとの単元にもどれます。'));
 note.append(btn(`${gname(origin.grade)}・${titleOf(origin.lesson)}に戻る`,()=>launch(origin.lesson,origin.grade,origin.subject,false),'resume-action'));
 box.append(note);
}
function showReview(box,lesson,g,s){
 const output=alternatives(lesson,g,s);header(box,'🌱 学び直しを探す',`${gname(g)}の「${titleOf(lesson)}」につながる、前の学年の教材を探します。`);
 const note=el('p','caution','ここに出る教材は単元名から探した候補です。学力や理解度を自動で判定した結果ではありません。');box.append(note);
 if(output.topic)box.append(el('p','topic','つながりの目安：'+output.topic));
 if(output.items.length){for(const {lesson:l,grade:n,score} of output.items){const card=el('div','review-card');card.append(el('span','grade-chip',gname(n)),el('strong','review-name',titleOf(l)));
 card.append(el('p','review-meta',score>0?'この単元と関連する内容を確認できます。':'前の学年の教材から選べます。'));
 card.append(btn('この単元を学んでみる',()=>{origin={lesson,grade:g,subject:s};launch(l,n,s,true);},'review-start'));box.append(card);}}
 else{box.append(el('p','empty','関連する前の学年の教材を見つけられませんでした。別の学年や教科の一覧から探すこともできます。'));}
 box.append(btn('← 元の単元一覧へ',()=>{grade=g;subject=s;mode='lessons';render()},'back'));
 box.append(btn('ほかの学年を見る',openGrade,'secondary'));
}
function render(){prepare();const box=screen.firstElementChild;box.replaceChildren();
 if(mode==='grades'||!grade){
  header(box,'どの学年から学ぶ？','学年を変えても、在籍学年の登録情報は変わりません。');
  const row=el('div','grades');for(let n=1;n<=6;n++){const b=btn(`小学${n}年`,()=>{grade=n;subject=null;mode='subjects';render()},'grade');if(n===registered())b.append(el('small','grade-note','在籍学年'));row.append(b);}box.append(row);
  box.append(btn('← 在籍学年へ戻る',()=>{grade=registered();subject=null;mode=grade?'subjects':'grades';render()},'back'));
  box.append(btn('以前の教材一覧を見る',goOld,'secondary'));return;
 }
 if(mode==='subjects'){
  header(box,`${gname(grade)}の教科を選ぼう`,grade===registered()?'まずは在籍学年の教材から始めよう。分からないときは前の学年の単元も探せます。':'今は別の学年の教材を選んでいます。在籍学年の登録はそのままです。');
  oldCourseButton(box);
  const group=el('div','subjects');for(const s of SUBJECTS){const b=btn(`${s.icon} ${s.label}`,()=>{subject=s.id;mode='lessons';render();},'subject');const count=findLessons(grade,s.id).length;if(!count)b.append(el('small','grade-note','対応教材を確認'));group.append(b);}box.append(group);
  box.append(btn('🔄 ほかの学年を選ぶ',openGrade,'secondary'));
  box.append(btn('📚 以前の教材一覧を見る',goOld,'secondary'));
  return;
 }
 if(mode==='review'&&reviewContext){showReview(box,reviewContext.lesson,reviewContext.grade,reviewContext.subject);return;}
 const s=SUBJECTS.find(z=>z.id===subject);header(box,`${gname(grade)}・${s?.label||'教材'}`,'単元を選んで学習を始めよう。途中で学び直しを選んでも大丈夫。');
 oldCourseButton(box);
 const arr=findLessons(grade,subject);
 if(arr.length){box.append(el('p','count',`${arr.length}件の教材`));const list=el('div','lessons');for(const x of arr){const card=el('article','lesson');
  const name=titleOf(x);const p=(x.node.querySelector('p')?.textContent||'').trim().replace(/\s+/g,' ');
  card.append(el('strong','lesson-name',name));if(p)card.append(el('p','lesson-desc',p.slice(0,130)));
  card.append(btn('この単元を学ぶ',()=>launch(x,grade,subject,false),'lesson-start'));
  if(grade>1)card.append(btn('🌱 つまずいたら、前の学年を確認',()=>{reviewContext={lesson:x,grade,subject};mode='review';render();},'review-link'));
  list.append(card);}box.append(list);
 }else{box.append(el('p','empty','この組み合わせに一致する教材は見つかりませんでした。以前の一覧も確認できます。'));}
 box.append(btn('← 教科を選び直す',backToSubjects,'back'),btn('ほかの学年に変える',openGrade,'secondary'),btn('📚 以前の教材一覧を見る',goOld,'secondary'));
}
let reviewContext=null;
function sync(){const home=isHome();
 if(!home){if(lastHome){legacy=false;}lastHome=false;}
 else if(!lastHome){lastHome=true;legacy=false;grade=registered();subject=null;mode=grade?'subjects':'grades';render();}
 prepare();screen.hidden=(!home||legacy);reopen.hidden=(!home||!legacy);
 document.documentElement.classList.toggle('v475-locked',home&&!legacy);
}
function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;sync();})}
new MutationObserver(schedule).observe(ROOT,{childList:true,subtree:true});
window.ponoLearningNav475={open:()=>{legacy=false;grade=registered();subject=null;mode=grade?'subjects':'grades';render();sync();},status:()=>({registeredGrade:registered(),grade,subject,mode,legacy}),getLessons:()=>entries().map(x=>({title:x.title,grades:[...x.grades],subjects:x.subjects}))};
sync();
})();
