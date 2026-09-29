/* v26.6 consolidated navigation
   v26.4/v26.4.1/v26.5の競合パッチを読み込まず、ここで入口を一本化する。 */
let nav266={math:{g:null,ti:null,title:null},jp:{g:null,ti:null,title:null}};

const termUnitsBefore266=subjectTermUnits;
subjectTermUnits=function(s,g,ti){
 g=Number(g); ti=Number(ti);
 if(s==="算数"){
   const arr=(TEXTBOOK_MAP["算数"]&&TEXTBOOK_MAP["算数"][g])||[],part=splitTerms(arr)[ti]||[],term=TERM_LABELS[ti];
   nav266.math={g,ti,title:null};
   head(`${term}｜小学${g}年 算数`,()=>subjectGradeTerms("算数",g));
   A.append(e("div","card",`<h2>${term}</h2><p>今学んでいる単元から選べます。</p>`));
   part.forEach((name,n)=>{
     const b=btn(`${n+1}. ${name}`,()=>{
       nav266.math={g,ti,title:name};
       const id=findMathNode249(g,name);
       if(id){ mathLearn(id); } else { mathBridgeHome260(g,name); }
     },"unit266");
     A.append(b);
   });
   return;
 }
 if(s==="国語"){
   const arr=(TEXTBOOK_MAP["国語"]&&TEXTBOOK_MAP["国語"][g])||[],part=splitTerms(arr)[ti]||[],term=TERM_LABELS[ti];
   nav266.jp={g,ti,title:null};
   head(`${term}｜小学${g}年 国語`,()=>subjectGradeTerms("国語",g));
   A.append(e("div","card",`<h2>${term}</h2><p>漢字・読む・ことば・書くを、その時期にそって確認できます。</p>`));
   part.forEach((name,n)=>A.append(btn(`${n+1}. ${name}`,()=>{nav266.jp={g,ti,title:name};japaneseTextbookOpen249(g,name)},"unit266")));
   return;
 }
 /* 英語はv23.7/v24.8で完成している専用ルートをそのまま使う */
 termUnitsBefore266(s,g,ti);
};

/* 国語の入口だけ学期別へ。算数はv26.1〜26.3の学期別入口を使用 */
japaneseStart=function(){subjectTextbookEntry("国語")};

/* 子ども画面に5教科を必ず表示し、既存英語を復旧 */
const childBefore266=child;
child=function(){
 childBefore266();
 const wanted=[
  ["国語",()=>subjectTextbookEntry("国語")],
  ["算数",()=>subjectTextbookEntry("算数")],
  ["理科",()=>subjectTextbookEntry("理科")],
  ["社会",()=>subjectTextbookEntry("社会")],
  ["外国語活動・外国語",()=>subjectTextbookEntry("外国語活動")]
 ];
 /* 既存教科ボタンのクリック先を整える */
 [...A.querySelectorAll("button")].forEach(b=>{
   const t=(b.textContent||"").trim();
   if(t==="国語")b.onclick=wanted[0][1];
   else if(t==="算数")b.onclick=wanted[1][1];
   else if(t==="理科")b.onclick=wanted[2][1];
   else if(t==="社会")b.onclick=wanted[3][1];
   else if(t==="外国語活動"||t==="外国語"||t==="英語")b.onclick=wanted[4][1];
 });
 const hasEnglish=[...A.querySelectorAll("button")].some(b=>/外国語|英語/.test((b.textContent||"").trim()));
 if(!hasEnglish){const box=e("div","grid");box.append(btn("外国語活動・外国語",wanted[4][1]));A.append(box)}
};

/* 詳細算数から戻る時は選んだ学期へ */
const mathLearnBefore266=mathLearn;
mathLearn=function(id){
 mathLearnBefore266(id);
 const n=MATHNODES[id],m=nav266.math;
 if(n&&m.g===n.grade){
   const back=[...A.querySelectorAll("button")].find(b=>/戻|←|‹/.test((b.textContent||"").trim()));
   if(back)back.onclick=()=>subjectTermUnits("算数",m.g,m.ti);
 }
};
