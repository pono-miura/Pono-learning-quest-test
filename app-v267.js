/* v26.7: 算数の学期別単元を既存の正式入口 beginMathUnit() に直結 */
const subjectTermUnitsBefore267=subjectTermUnits;
subjectTermUnits=function(s,g,ti){
 g=Number(g); ti=Number(ti);
 if(s!=="算数"){subjectTermUnitsBefore267(s,g,ti);return;}
 const arr=(TEXTBOOK_MAP["算数"]&&TEXTBOOK_MAP["算数"][g])||[];
 const part=splitTerms(arr)[ti]||[],term=TERM_LABELS[ti];
 head(`${term}｜小学${g}年 算数`,()=>subjectGradeTerms("算数",g));
 A.append(e("div","card",`<h2>${term}</h2><p>学校で今学んでいる単元から選べます。</p>`));
 part.forEach((name,n)=>{
   const id=findMathNode249(g,name);
   const b=btn(`${n+1}. ${name}`,()=>{
     if(id){ beginMathUnit(id); return; }
     if(typeof mathBridgeHome260==="function"){ mathBridgeHome260(g,name); return; }
     mathUnitSelect(g);
   },"unit267");
   A.append(b);
 });
};