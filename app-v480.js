/* Pono Learning Quest v480 — 一つの子ども用入口 + 詳細教材への接続
 * 学習・採点・保存データを変更せず、各教材の既存エンジンを開きます。
 * v479 のメニューと入れ替えて読み込みます（併用しないこと）。
 */
(()=>{'use strict';
if(window.ponoNav480)return;
const ROOT=document.getElementById('app');if(!ROOT)return;
const SUBJECTS={国語:{emoji:'📖',key:'国語'},算数:{emoji:'🔢',key:'算数'},理科:{emoji:'🔬',key:'理科'},社会:{emoji:'🌏',key:'社会'},英語:{emoji:'🔤',key:'外国語'},生活科:{emoji:'🌱',key:'生活科'}};
const MODULES=[
 [1,'算数',391,'ponoGrade1Math391',''],[1,'国語',392,'ponoGrade1Japanese392',''],[1,'国語',393,'ponoGrade1Japanese393',''],[1,'国語',394,'ponoGrade1Review394',''],
 [1,'生活科',395,'ponoLife395',''],
 [2,'算数',396,'ponoGrade2Math396',''],[2,'国語',397,'ponoGrade2Japanese397',''],[2,'国語',398,'ponoGrade2Japanese398',''],[2,'国語',399,'ponoGrade2Review399',''],[2,'生活科',395,'ponoLife395',''],
 [3,'算数',400,'ponoGrade3Math400',''],[3,'算数',401,'ponoGrade3Math401',''],[3,'算数',402,'ponoGrade3MathReview402',''],
 [3,'国語',403,'ponoGrade3Japanese403',''],[3,'国語',404,'ponoGrade3Japanese404',''],[3,'国語',406,'ponoGrade3JapaneseReview406',''],
 [3,'理科',407,'ponoGrade3Science407',''],[3,'理科',408,'ponoGrade3Science408',''],[3,'理科',409,'ponoGrade3ScienceReview409',''],
 [3,'社会',417,'ponoGrade3Social417','ponoSocial417Data'],[3,'英語',420,'ponoGrade3English420','ponoEnglish420Data'],
 [4,'国語',431,'ponoGrade4Japanese431','ponoJapanese431Data'],[4,'算数',423,'ponoGrade4Math423','ponoMath423Data'],[4,'算数',424,'ponoGrade4Math424','ponoMath424Data'],[4,'算数',425,'ponoGrade4Math425','ponoMath425Data'],
 [4,'理科',410,'ponoGrade4Science410',''],[4,'理科',411,'ponoGrade4Science411',''],[4,'理科',412,'ponoGrade4Science412',''],[4,'理科',413,'ponoGrade4Science413',''],
 [4,'社会',418,'ponoGrade4Social418','ponoSocial418Data'],[4,'英語',421,'ponoGrade4English421','ponoEnglish421Data'],
 [5,'国語',432,'ponoGrade5Japanese432','ponoJapanese432Data'],[5,'算数',426,'ponoGrade5Math426','ponoMath426Data'],[5,'算数',427,'ponoGrade5Math427','ponoMath427Data'],[5,'算数',428,'ponoGrade5Math428','ponoMath428Data'],[5,'算数',429,'ponoGrade5Math429','ponoMath429Data'],
 [5,'理科',414,'ponoGrade5Science414',''],[5,'理科',415,'ponoGrade5Science415',''],[5,'理科',416,'ponoGrade5Science416',''],
 [5,'社会',419,'ponoGrade5Social419','ponoSocial419Data'],[5,'英語',422,'ponoGrade5English422','ponoEnglish422Data']
].map(([grade,subject,n,fn,data])=>({grade,subject,n,fn,data}));
const STEPS=[['📖','学ぶ'],['🤝','一緒に考える'],['✏️','練習'],['📝','確認テスト'],['🌱','ふりかえり']];
let grade=null,subject=null,view='subjects',active=null,screen=null,notice='',lastRole=null,scheduled=false,guideKey='';
const node=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className='v480-'+cls;if(txt!==undefined)n.textContent=String(txt);return n};
const button=(label,fn,cls='outline')=>{const b=node('button',cls,label);b.type='button';b.addEventListener('click',fn);return b};
function role(){return window.ponoRoles476?.role?.()||'choose'}
function registered(){
 try{const g=Number(profile?.grade);if(Number.isInteger(g)&&g>=1&&g<=6)return g}catch(_){}
 try{const p=JSON.parse(localStorage.getItem('ponoV9Student')||'{}');const g=Number(p.grade);if(Number.isInteger(g)&&g>=1&&g<=6)return g}catch(_){}
 return null;
}
function isMain(){const h=ROOT.querySelector('.top h1');return /^(?:🌱\s*)?Pono Learning Quest|^(?:🧒\s*)?今日の学習/.test(h?.textContent?.trim()||'')}
function setIntro(main,t,desc){const h=node('header','header');h.append(node('p','brand','🌱 Pono Learning Quest'),node('h1','title',t),node('p','desc',desc));main.append(h)}
function prepare(){if(screen)return;screen=node('section','hub');screen.setAttribute('role','region');screen.setAttribute('aria-label','学年と教科と単元を選ぶ');screen.append(node('main','inner'));document.body.append(screen)}
function getModules(g,s){return MODULES.filter(m=>m.grade===g&&m.subject===s&&typeof window[m.fn]==='function')}
function detailed(m){
 const d=window[m.data];if(!Array.isArray(d?.units)||!d.units.length)return null;
 const groups=Array.isArray(d.groups)?d.groups:[];
 return d.units.filter(u=>u&&typeof u.title==='string').map(u=>({u,group:groups[u.group]||null}));
}
function legacyUnits(g,s){try{const key=SUBJECTS[s]?.key;if(typeof TEXTBOOK_MAP!=='undefined'&&Array.isArray(TEXTBOOK_MAP[key]?.[g]))return TEXTBOOK_MAP[key][g].slice()}catch(_){}return []}
function moduleTitle(m){
 const d=window[m.data];const groups=d?.groups;
 if(Array.isArray(groups)&&groups.length){let a=groups.map(g=>Array.isArray(g)?g[0]:g?.name).filter(Boolean);if(a.length)return a.length<=2?a.join('・'):`${a[0]} ほか${a.length-1}分野`}
 const dict={391:'算数の基礎',392:'国語の基礎',393:'国語の発展',394:'国語の復習',395:'生活科の活動',396:'算数の基礎',397:'国語の基礎',398:'国語の発展',399:'国語の復習',400:'算数の単元①',401:'算数の単元②',402:'算数の復習',403:'国語の単元①',404:'国語の単元②',406:'国語の復習',407:'理科 前半5単元',408:'理科 後半の単元',409:'理科の復習',410:'理科 前半5単元',411:'理科 続きの単元①',412:'理科 続きの単元②',413:'理科の総復習',414:'理科 前半の単元',415:'理科 後半の単元',416:'理科の総復習'};
 return dict[m.n]||`${m.subject}の詳しい教材`;
}
function stageList(parent){const row=node('div','stages');STEPS.forEach(([emoji,label])=>row.append(node('span','stage',emoji+' '+label)));parent.append(row)}
function show(){prepare();const main=screen.firstElementChild;main.replaceChildren();
 if(view==='grades'||grade===null){setIntro(main,'どの学年から学ぶ？','最初は在籍学年から。必要なときは、ほかの学年も選べます。');const grid=node('div','grid');for(let g=1;g<=6;g++)grid.append(button(`小学${g}年${registered()===g?'（在籍）':''}`,()=>{grade=g;subject=null;view='subjects';notice='';show()},'grade'));main.append(grid)}
 else if(view==='subjects'){setIntro(main,`小学${grade}年の教科をえらぼう`,'教科を押して、学びたい単元へ進もう。');const grid=node('div','grid');(grade<=2?['国語','算数','生活科']:['国語','算数','理科','社会','英語']).forEach(s=>grid.append(button(`${SUBJECTS[s].emoji} ${s}`,()=>{subject=s;view='units';notice='';show()},'grade')));main.append(grid,button('ほかの学年で学ぶ',()=>{view='grades';show()}));}
 else if(view==='units'){
  setIntro(main,`小学${grade}年・${subject}`,'詳しい教材がある場合は、そちらから学習できます。必要なところから始めて大丈夫。');
  const mods=getModules(grade,subject),legacy=legacyUnits(grade,subject);
  if(mods.length){
   main.append(node('h2','heading','📚 詳しい教材を選ぼう'));
   const list=node('div','modules');mods.forEach(m=>{
    const c=node('section','card');const titleText=moduleTitle(m);c.append(node('h3','card-title',titleText));
    const items=detailed(m);
    if(items?.length){
     const groups=new Map();for(const it of items){const groupName=Array.isArray(it.group)?it.group[0]:it.group?.name||'小単元';if(!groups.has(groupName))groups.set(groupName,[]);groups.get(groupName).push(it.u)}
     for(const [group,units] of groups){const detail=node('details','group');detail.append(node('summary','group-name',`${group}（${units.length}小単元）`));const ul=node('div','subunits');units.forEach(u=>ul.append(button(u.title,()=>openModule(m,u),'subunit')));detail.append(ul);c.append(detail)}
    }else c.append(node('p','card-text','各単元の「学ぶ・練習・テスト」は、教材を開いた後に選べます。'));
    c.append(button(items?.length?'この教材の全単元を見る':'この教材を開く',()=>openModule(m),'primary'));list.append(c);
   });main.append(list);
  }
  if(legacy.length){const d=node('details','legacy');const title=node('summary','legacy-title',mods.length?'📚 以前の単元別教材も見る':'📚 この教科の単元を選ぶ');d.append(title);const ul=node('div','legacy-units');legacy.forEach((name,i)=>ul.append(button(`${i+1}. ${name}`,()=>openLegacy(grade,subject,name),'subunit')));d.append(ul);main.append(d)}
  if(!mods.length&&!legacy.length)main.append(node('p','note','この学年の教材が見つかりませんでした。以前の教材一覧から確認してください。'));
  main.append(button('← 教科を選び直す',()=>{view='subjects';subject=null;show()},'back'));
  if(grade>1)main.append(button('🌱 前の学年の同じ教科を探す',()=>{grade--;show()}));
  main.append(button('学年を選び直す',()=>{view='grades';show()}));
 }
 if(view==='units'){
  main.append(node('p','footnote','教材によって問題数や使える機能が異なります。先に説明を読むことも、練習から始めることもできます。'));
 }
 if(notice)main.append(node('p','warning',notice));
 main.append(button('⇄ 子ども・保護者・管理者の入口に戻る',()=>window.ponoRoles476?.open?.(),'exit'));
}
function trySelectUnit(title,group){
 // 既存モジュールの内部機能に踏み込まず、実際に表示されたボタンを操作する。
 let exact=[...ROOT.querySelectorAll('button')].find(b=>b.textContent.trim()===title||b.textContent.trim().replace(/^[🌱📖🔢🔬🌎🌏📚🎒✏️📝🌈🌍]+\s*/u,'')===title);
 if(exact){exact.click();return true}
 if(group!=null){const groupName=Array.isArray(group)?group[0]:group?.name||'';const headings=[...ROOT.querySelectorAll('h2,h3,strong')];const h=headings.find(h=>(h.textContent||'').includes(groupName));if(h){const c=h.closest('section,article,[class*="group"],[class*="card"]');const trigger=[...(c||ROOT).querySelectorAll('button')].find(b=>/小単元を見る|小単元を表示|小単元へ/.test(b.textContent));trigger?.click()}}
 const possible=[...ROOT.querySelectorAll('button')].filter(b=>(b.textContent||'').trim()===title||((b.textContent||'').includes(title)&&b.textContent.length<title.length+15));
 if(possible.length===1){possible[0].click();return true}
 // 社会・英語：グループを展開するとサブ単元ボタンが出る。タイトルの近くの「この小単元を学ぶ」を押す。
 const strong=[...ROOT.querySelectorAll('strong,h2,h3')].find(e=>(e.textContent||'').includes(title));if(strong){let c=strong.closest('[class*="subitem"],section,article');const b=[...(c||ROOT).querySelectorAll('button')].find(x=>/この小単元を学ぶ|この単元を学ぶ/.test(x.textContent));if(b){b.click();return true}}
 return false;
}
function openModule(m,u){
 const fn=window[m.fn];if(typeof fn!=='function'){notice='詳しい教材を読み込めませんでした。';show();return}
 try{window.speechSynthesis?.cancel?.();fn();active={type:'detail',grade,subject,module:m,unit:u?.title||null};sync();
  if(u){let group=window[m.data]?.groups?.[u.group];let ok=trySelectUnit(u.title,group);if(!ok){ // 単元に自動移動できない教材では、元の一覧を残す
      const tip=node('p','inline-tip',`「${u.title}」の小単元をこの画面から選んでください。`);ROOT.prepend(tip);
   }}
  window.scrollTo?.(0,0);
 }catch(e){active=null;notice='詳細教材を開けませんでした。以前の教材は削除されていません。';show();sync()}
}
function openLegacy(g,s,name){try{
 window.speechSynthesis?.cancel?.();active={type:'legacy',grade:g,subject:s,unit:name};
 if(s==='国語'&&typeof japaneseTextbookOpen249==='function')japaneseTextbookOpen249(g,name);
 else if(s==='算数'&&typeof mathTextbookOpen249==='function')mathTextbookOpen249(g,name);
 else if(s==='英語'&&typeof engData292==='function'&&engData292(g,name)&&typeof engHome292==='function')engHome292(g,name);
 else if(typeof startTextbookUnit==='function')startTextbookUnit(SUBJECTS[s].key,g,name,'');
 else if(typeof subjectGradeTerms==='function')subjectGradeTerms(SUBJECTS[s].key,g);
 else throw Error('No legacy route');
 sync();window.scrollTo?.(0,0);
 }catch(e){active=null;notice='教材を開けませんでした。別の単元を選んでください。';show();sync()}}
function heading(){return ROOT.querySelector('.top h1')?.textContent?.trim()||ROOT.querySelector('h1')?.textContent?.trim()||''}
function stepOf(t){if(/ふりかえり|結果|まとめ|成績|採点/.test(t))return 4;if(/単元テスト|確認テスト|総合テスト/.test(t))return 3;if(/練習|れんしゅう|練習問題|自分で|自分でやる/.test(t))return 2;if(/一緒|いっしょ|例題/.test(t))return 1;if(/まなぶ|学ぶ|説明/.test(t))return 0;return -1}
function guide(){
 if(!active||role()!=='child'||isMain()){ROOT.querySelector('.v480-learning-guide')?.remove();guideKey='';return}
 const t=heading(),step=stepOf(t),key=[active.type,active.grade,active.subject,active.unit,t].join('|');
 const prev=ROOT.querySelector('.v480-learning-guide');if(prev&&guideKey===key)return;
 prev?.remove();guideKey=key;
 const bar=node('nav','learning-guide');bar.setAttribute('aria-label','学習の進め方');
 bar.append(node('p','course','🌱 '+`小学${active.grade}年・${active.subject}`+(active.unit?'｜'+active.unit:'')));
 if(active.type==='detail'){
  const row=node('div','steps');STEPS.forEach(([emoji,label],i)=>{const chip=node('span','step'+(step===i?' current':''),emoji+' '+label);if(step===i)chip.setAttribute('aria-current','step');row.append(chip)});bar.append(row);
  bar.append(node('p','hint','表示は学習の道すじです。各段階のボタンは教材内で選んでください。'));
 }else bar.append(node('p','hint','この教材は従来の学習形式です。内容に合わせて「学ぶ」「問題」を選べます。'));
 const actions=node('div','guide-actions');actions.append(button('← 単元一覧へ',backToUnits,'guide-back'),button('⇄ 入口',()=>window.ponoRoles476?.open?.(),'guide-exit'));bar.append(actions);ROOT.prepend(bar);
}
function backToUnits(){if(!window.confirm('この学習を途中で終えて、単元一覧に戻りますか？ 保存前の答えは残らない場合があります。'))return; try{window.speechSynthesis?.cancel?.();if(typeof home==='function')home()}catch(_){ }active=null;notice='';guideKey='';ROOT.querySelector('.v480-learning-guide')?.remove();view='units';show();sync()}
function sync(){prepare();const r=role();if(r!==lastRole){lastRole=r;active=null;grade=registered();view=grade?'subjects':'grades';subject=null;notice='';show()}
 if(r==='child'&&active&&isMain())active=null;
 const visible=r==='child'&&!active&&isMain();screen.hidden=!visible;
 document.documentElement.classList.toggle('v480-active',visible);
 if(r==='child')guide();else ROOT.querySelector('.v480-learning-guide')?.remove();
}
function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;sync()})}
const observer=new MutationObserver(schedule);observer.observe(ROOT,{subtree:true,childList:true});observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
window.ponoNav480={open:()=>{active=null;grade=registered();view=grade?'subjects':'grades';subject=null;notice='';if(typeof home==='function')home();show();sync()},getModules,status:()=>({grade,subject,view,learning:!!active,available:getModules(grade,subject).length})};
prepare();grade=registered();view=grade?'subjects':'grades';show();sync();
})();
